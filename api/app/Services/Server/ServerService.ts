/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import Minecraft from 'App/Services/Server/Minecraft'
import Env from '@ioc:Adonis/Core/Env'

class ServerService {
  private playersName: string[] = []
  private playerCount: number = 0

  private maxPlayerCount: number = 0

  private readonly minecraft: Minecraft = new Minecraft({
    host: Env.get('JSONAPI_HOST') as string,
    port: Number(Env.get('JSONAPI_PORT')),
    user: Env.get('JSONAPI_USER') as string,
    password: Env.get('JSONAPI_PASSWORD') as string,
  })

  public getPlayersCount() {
    return this.playerCount
  }

  public isOnline(playerName: string) {
    return this.playersName.includes(playerName)
  }

  public async execute(command: string) {
    return this.minecraft.executeCommand(command)
  }

  public async update() {
    this.playersName = await this.minecraft.getPlayerNames()

    if (this.playerCount > this.maxPlayerCount) {
      this.maxPlayerCount = this.playerCount
    }
  }

  public async setMaxPlayerCount(playerCount: number) {
    this.playerCount = playerCount
  }

  public getAndResetMaxPlayers() {
    const tmp = this.maxPlayerCount
    this.maxPlayerCount = 0
    return tmp
  }

  public getMaxPlayers() {
    return this.maxPlayerCount
  }
}

export default new ServerService()
