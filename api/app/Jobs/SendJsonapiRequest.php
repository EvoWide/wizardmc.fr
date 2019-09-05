<?php

namespace App\Jobs;

use App\Services\Server\ServerBridge;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Collection;

class SendJsonapiRequest implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    protected $commands;
    protected $placeholders;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Collection $commands, $placeholders = NULL)
    {
        $this->commands = $commands;
        $this->placeholders = $placeholders;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(ServerBridge $bridge)
    {
        $commands = $this->parse();
        if ($commands == NULL || empty($this->commands)) {
            return;
        }

        if (!$bridge->online()) {
            throw new Exception('Server is actually offline.');
        }

        $bridge->command($commands);
    }

    public function parse()
    {
        if ($this->placeholders == NULL || empty($this->placeholders)) {
            return $this->commands->toArray();
        }

        return $this->commands->map(function ($command) {
            $newCommand = $command;

            foreach ($this->placeholders as $key => $value) {
                $newCommand = str_replace($key, $value, $newCommand);
            }

            return $newCommand;
        })->toArray();
    }
}
