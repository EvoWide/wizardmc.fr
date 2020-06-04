import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const execFile = util.promisify(require('child_process').execFile)
import Env from '@ioc:Adonis/Core/Env'
const stripAnsi = require('strip-ansi')

export default class CommandsController {
  public async deploy ({ params, response }: HttpContextContract) {
    const files = {
      'frontend': 'deploy-wizardmc.sh',
      'admin': 'deploy-admin.wizardmc.sh',
    }
    const file = files[params.app]
    const scriptsFolder = Env.get('SCRIPTS_FOLDER') as string

    if (!file) {
      return response.globalError('App spécifiée non existante.')
    }

    async function getVersion () {
      // const { stdout } = await execFile('node', ['--version'])
      // const { stdout } = await execFile(file)
      const { stdout, stderr } = await execFile('bash', [file], { cwd: scriptsFolder })
      // const { stdout } = await exec('cd')
      return { stdout, stderr }
    }

    try {
      const { stdout, stderr } = await getVersion()
      const code = stderr ? 'error' : 'success'
      const output = stderr ? stripAnsi(stderr) : stripAnsi(stdout)
      return response.json({ code, output })
    } catch (e) {
      return response.json({ code: 'error', output: e })
    }
  }

  public async generate ({ response }: HttpContextContract) {
    const frontendFolder = Env.get('FRONTEND_FOLDER') as string

    async function generateNuxt () {
      const { stdout, stderr } = await exec('npm run generate', { cwd: frontendFolder })
      return { stdout, stderr }
    }

    try {
      const { stdout, stderr } = await generateNuxt()
      const output = {
        stdout: stripAnsi(stdout),
        stderr: stripAnsi(stderr),
      }
      return response.json({ output })
    } catch (e) {
      return response.json({ output: e })
    }
  }
}
