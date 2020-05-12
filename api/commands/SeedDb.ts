import { BaseCommand } from '@adonisjs/ace'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SeedDb extends BaseCommand {
  public static commandName = 'seed:db'
  public static description = 'Command to seed the database while Adonis 5 does not provide seeds/factories'

  public static settings = {
    loadApp: true,
  }

  /**
  * Executes a shell command and return it as a Promise.
  */
  private execShellCommand (cmd: string): Promise<string> {
    const exec = require('child_process').exec

    return new Promise((resolve) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.warn(error)
        }
        resolve(stdout ? stdout : stderr)
      })
    })
  }

  public async handle () {
    const User = (await import('App/Models/User')).default
    const ShopCategory = (await import('App/Models/Shop/Category')).default
    const ShopOffer = (await import('App/Models/Shop/Offer')).default
    const Post = (await import('App/Models/Post')).default

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
      credits: 20000,
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
        version: true,
      },
      {
        name: 'Archimage',
        category_id: 1,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 800,
        deps: 1,
        version: true,
      },
      {
        name: 'Mage',
        category_id: 1,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 1000,
        deps: 2,
        version: true,
      },
      {
        name: 'Sorcier',
        category_id: 1,
        description: '',
        image: 'https://i.imgur.com/nxLRdsx.png',
        price: 1250,
        deps: 3,
        version: true,
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

    // Purchasing
    const offersCreated = await ShopOffer.all()
    const offersToBuy = ['Kit minerais', 'Enchanteur', 'Booster XP']

    for (const offerName of offersToBuy) {
      const offer = offersCreated.find(o => o.name === offerName)
      await Database.insertQuery()
        .table('shop_histories')
        .insert({
          user_id: 1,
          offer_id: offer?.id,
          price: offer?.price,
          version: (offer?.version ? 1 : -1),
        })
    }

    // News
    for (let i = 0; i < 20; i++) {
      await Post.create({
        authorId: (Math.floor(Math.random() * 2) + 1) as number,
        title: `News n ${i}`,
        content: `Lorem ipsum ${i} dolor sit amet, consectetur adipiscing elit.
        Duis ac nulla nulla. Class aptent taciti sociosqu ad litora torquent per.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
        vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
        image: 'https://i.imgur.com/2Hg56TL.jpg',
        hidden: Math.random() >= 0.8,
      })
    }

    await Database.manager.closeAll()

    this.logger.success('Seed finished.')
  }
}
