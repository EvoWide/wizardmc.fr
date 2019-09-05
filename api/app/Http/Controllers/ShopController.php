<?php

namespace App\Http\Controllers;

use App\Jobs\SendJsonapiRequest;
use App\Services\Server\ServerBridge;
use App\ShopArticle;
use App\ShopCategory;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{

    const SHOP_TTL = 120;

    public function list()
    {
        $result = Cache::remember('shop-all', self::SHOP_TTL, function () {
            $items = ShopArticle::where('hidden', 0)->get()->groupBy('category_id');
            $categories = ShopCategory::all();

            return collect(['categories' => $categories->toArray(), 'items' => $items->toArray()])->toJson();
        });

        return response($result);
    }


    public function view()
    {
        $fields = request()->validate(['id' => 'bail|required|numeric']);
        $result = Cache::remember('shop-one-' . $fields['id'], self::SHOP_TTL, function () use ($fields) {
            return ShopArticle::where('id', $fields['id'])->first();
        });

        if (!$result) {
            return response('', 404);
        }

        return $result;
    }

    public function buy(ServerBridge $bridge)
    {
        $fields = request()->validate(['id' => 'bail|required|numeric']);

        $article = ShopArticle::where('id', $fields['id'])->first();
        if (!$article) {
            return response(['error' => 'L\'article indiqué n\'a pas été trouvé !'], 404);
        }

        $user = Auth::user();
        if ($user->credits < $article->price) {
            return response(['error' => 'Vous n\'avez pas les crédits nécessaire pour effectuer cet achat.']);
        }

        if ($article->max !== -1 && DB::table('history_shop')->where('user_id', $user->id)->where('offer_id', $user->id)->count() >= $article->max) {
            return response(['error' => 'Vous ne pouvez plus acheter cet article.']);
        }

        if (!$bridge->playerOnline($user->username)) {
            return response(['error' => 'Vous devez être connecté en jeu pour effectuer un achat.']);
        }

        $user->refresh(); // On refresh l'utilisateur histoire d'être sur d'avoir les PB actuel (au cas ou le serveur mette du temps à répondre)

        try {
            $user->withdraw($article->price);
        } catch (Exception $exception) {
            return response(['error' => $exception->getMessage()]);
        }

        DB::insert('insert into history_shop (user_id, offer_id, created_at) values (?, ?, ?)', [$user->id, $article->id, new Carbon()]);

        if (!empty($article->commands)) {
            SendJsonapiRequest::dispatch(collect(json_decode($article->commands)), ['{player}' => $user->username]);
        }

        return response(['success' => true]);
    }
}
