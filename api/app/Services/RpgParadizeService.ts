/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { JSDOM } from 'jsdom'
import Env from '@ioc:Adonis/Core/Env'

class RpgParadizeService {
  private out = -1

  public getOut() {
    return this.out
  }

  public async update() {
    const url = `http://www.rpg-paradize.com/site-my-favorite-minecraft-server-${Env.get(
      'RPG_PARADIZE_ID'
    )}`
    try {
      const dom = await JSDOM.fromURL(url)
      let line: string = dom.window.document.querySelector(
        'body > div.div-content > div.div-page > div:nth-child(1) > div:nth-child(7)'
      ).lastChild.textContent
      const result = Number(line.split(' : ')[1].trim())
      this.out = isNaN(result) ? -1 : result
    } catch {}
  }
}

export default new RpgParadizeService()
