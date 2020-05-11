import { BaseCommand } from '@adonisjs/ace'

export default class SeedDb extends BaseCommand {
  public static commandName = 'seed:db'
  public static description = 'Command to seed the database while Adonis 5 does not provide seeds/factories'

  public static settings = {
    loadApp: true,
  }

  /**
  * Executes a shell command and return it as a Promise.
  * @param cmd {string}
  * @return {Promise<string>}
  */
  private execShellCommand (cmd) {
    const exec = require('child_process').exec

    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.warn(error)
        }
        resolve(stdout? stdout : stderr)
      })
    })
  }

  public async handle () {
    const User = (await import('App/Models/User')).default
    const ShopCategory = (await import('App/Models/Shop/Category')).default
    const ShopOffer = (await import('App/Models/Shop/Offer')).default
    this.logger.info('Seed started.')

    // Reset Database
    await this.execShellCommand('node ace migration:rollback')
    await this.execShellCommand('node ace migration:run')

    // Users
    await User.create({
      username: 'Kalane',
      password: '12345',
      email: 'kalanehd@gmail.com',
    })
    await User.create({
      username: 'Forsties08',
      password: '12345',
      email: 'forsties08@gmail.com',
    })

    // Shop Categories
    const shopCategories = ['Grades', 'Kits', 'Spawners', 'Clés', 'Autres']
    for (const category of shopCategories) {
      await ShopCategory.create({ name: category })
    }

    // Shop Offers
    const offers = [
      {
        name: 'Enchanteur',
        category_id: 1,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 500,
        unique: true,
      },
      {
        name: 'Archimage',
        category_id: 1,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 800,
        deps: 1,
        unique: true,
      },
      {
        name: 'Mage',
        category_id: 1,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 1000,
        deps: 2,
        unique: true,
      },
      {
        name: 'Sorcier',
        category_id: 1,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 1250,
        deps: 3,
        unique: true,
      },
      {
        name: 'Kit alchimiste',
        category_id: 2,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 850,
        unique: true,
      },
      {
        name: 'Kit potions',
        category_id: 2,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 1200,
        unique: true,
      },
      {
        name: 'Kit minerais',
        category_id: 2,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 1500,
        unique: true,
      },
      {
        name: 'Kit construction',
        category_id: 2,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 500,
        unique: true,
      },
      {
        name: 'Spawner à vaches',
        category_id: 3,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 200,
      },
      {
        name: 'Spawner à zombies',
        category_id: 3,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 400,
      },
      {
        name: 'Clé VIP',
        category_id: 4,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 250,
      },
      {
        name: 'Booster XP',
        category_id: 5,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 400,
      },
    ]
    for (const offer of offers) {
      await ShopOffer.create(offer)
    }

    this.logger.success('Seed finished.')
  }
}
