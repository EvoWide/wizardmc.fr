import Minecraft from './Minecraft'
import Env from '@ioc:Adonis/Core/Env'

export default class ServerService {
  private playersName: string[] = []
  private playerCount: number = 0

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

  public async update () {
    console.log(await this.minecraft.getPlayerCount())
  }
}
