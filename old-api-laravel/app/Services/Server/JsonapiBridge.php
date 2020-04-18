<?php

namespace App\Services\Server;

use App\Libraries\JSONAPI;
use Illuminate\Support\Facades\Cache;

class JsonapiBridge implements ServerBridge
{

    /**
     * @var JSONAPI $jsonapi
     */
    private $jsonapi = NULL;

    // Cached Data
    private $playerCount;
    private $playerNames;

    public function __construct($config)
    {
        $this->jsonapi = new JSONAPI($config['host'], $config['port'], $config['user'], $config['password'], '', 5);
    }

    public function online()
    {
        return $this->playersCount() != -1;
    }

    public function playerOnline($playerName)
    {
        if ($this->playerNames === NULL) {
            $this->playerNames = Cache::remember('jsonapi-online', 15, function () {
                return $this->query('getPlayerNames') ?? [];
            });
        }

        return in_array($playerName, $this->playerNames, true);
    }

    public function playersCount()
    {
        if ($this->playerCount == NULL) {
            $this->playerNames = Cache::remember('jsonapi-count', 15, function () {
                return $this->query('getPlayerCount') ?? -1;
            });
        }
        return $this->playerCount;
    }


    public function command($command)
    {
        if (is_array($command)) {
            foreach ($command as $com) {
                $this->command($com);
            }
            return;
        }

        $this->jsonapi->call('runConsoleCommand', [$command]);
    }

    public function query($method, $args = [])
    {
        $response = $this->jsonapi->call($method, $args);

        if ($response === NULL || !$response[0]['is_success']) {
            return NULL;
        }
        return $response[0]['success'];
    }
}
