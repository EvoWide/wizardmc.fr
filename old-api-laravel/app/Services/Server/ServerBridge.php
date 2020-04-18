<?php

namespace App\Services\Server;

interface ServerBridge
{

    public function online();

    public function playerOnline($playerName);

    public function playersCount();

    public function query($method, $args);

    /**
     * @param array $commands
     * @return void
     */
    public function command($commands);
}
