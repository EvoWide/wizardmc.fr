import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const util = require('util')
// const exec = util.promisify(require('child_process').exec)
const execFile = util.promisify(require('child_process').execFile)

export default class CommandsController {
  public async deploy ({ params, response }: HttpContextContract) {
    const files = {
      'frontend': '../../../deploy-wizardmc.sh',
      'api': '../../../deploy-api.wizardmc.sh',
      'admin': '../../../deploy-admin.wizardmc.sh',
    }

    const file = files[params.app]

    if (!file) {
      return response.globalError('App spécifiée non existante.')
    }

    async function getVersion () {
      // const { stdout } = await execFile('node', ['--version'])
      // const { stdout } = await execFile(file)
      const { stdout } = await execFile('bash', [file])
      // const { stdout } = await exec('cd')
      return stdout
    }
    return response.json({output: await getVersion() })
  }
}
