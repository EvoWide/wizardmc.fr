/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

class Skin {
  private readonly head: Part[] = [new Part(8, 0, 16, 8), new Part(0, 8, 32, 8)]

  private readonly body: Part[] = [new Part(0, 16, 55, 16)]

  public isInside(x: number, y: number, factor?: number): boolean {
    if (!factor) {
      factor = 1
    }

    x = x / factor
    y = y / factor

    for (const part of this.head) {
      if (part.isInside(x, y)) {
        return true
      }
    }

    for (const part of this.body) {
      if (part.isInside(x, y)) {
        return true
      }
    }

    return false
  }
}

class Part {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number
  ) {}

  public isInside(x: number, y: number) {
    return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height
  }
}

export default new Skin()
