import Minecraft from 'App/Services/Server/Minecraft'
import Env from '@ioc:Adonis/Core/Env'
import Database from '@ioc:Adonis/Lucid/Database'

class ServerService {
  private playersName: string[] = []
  private playerCount: number = 0

  private maxPlayerCount: number = -1

  private readonly minecraft: Minecraft = new Minecraft({
    host: Env.get('JSONAPI_HOST') as string,
    port: Number(Env.get('JSONAPI_PORT')),
    user: Env.get('JSONAPI_USER') as string,
    password: Env.get('JSONAPI_PASSWORD') as string,
  })

  public getPlayersCount () {
    return this.playerCount
  }

  public isOnline (playerName: string) {
    return this.playersName.includes(playerName)
  }

  public async execute (command: string) {
    return this.minecraft.executeCommand(command.split('|'))
  }

  public async update () {
    if (this.maxPlayerCount === -1) {
      const result = await Database.from('statistics')
        .where('name', 'max_players')
        .select('count')
        .first()

      this.maxPlayerCount = result ? result['count'] : 0
    }

    this.playerCount = await this.minecraft.getPlayerCount()
    this.playersName = await this.minecraft.getPlayerNames()

    if (this.playerCount > this.maxPlayerCount) {
      this.maxPlayerCount = this.playerCount
      await Database.from('statistics')
        .where('name', 'max_players')
        .update({
          count: this.maxPlayerCount,
        })
    }
  }
}

export default new ServerService()
