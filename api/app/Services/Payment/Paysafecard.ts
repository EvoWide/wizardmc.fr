/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import Env from '@ioc:Adonis/Core/Env'
import got from 'got'
import CacheService from '../CacheService'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

class Paysafecard {
  private readonly production_url = 'https://api.paysafecard.com/v1/payments/'
  private readonly sandbox_url = 'https://apitest.paysafecard.com/v1/payments/'

  private readonly fees = [
    {
      max: 999,
      fees: 15,
    },
    {
      max: 9999,
      fees: 14,
    },
    {
      max: 100000,
      fees: 13,
    },
  ]

  constructor(
    private marchantId = Env.get('PAYMENT_PAYSAFECARD_ID') as string,
    private sandbox = Env.get('PAYMENT_PAYSAFECARD_SANDBOX') as boolean
  ) {}

  public async initiate(amount: number, customer: {}) {
    const baseUrl = Env.get('FRONTEND_URL') as string
    const response = await got
      .post(this.getUrl(), {
        json: {
          type: 'PAYSAFECARD',
          amount: amount,
          currency: 'EUR',
          redirect: {
            success_url: `${baseUrl}/credits/success/paysafecard?payment_id={payment_id}`,
            failure_url: `${baseUrl}/credits/failure/paysafecard`,
          },
          notification_url: 'https://api.wizardmc.fr/payment/notification/paysafecard/{payment_id}',
          customer: customer,
          shop_id: '1',
        },
        headers: {
          Authorization: 'Basic ' + Buffer.from(this.marchantId).toString('base64'),
        },
        responseType: 'json',
      })
      .catch()

    return response.body ?? false
  }

  public async capture(paymentId: string): Promise<any> {
    let response = await got
      .post(`${this.getUrl()}${paymentId}/capture`, {
        json: {
          id: paymentId,
        },
        headers: {
          Authorization: 'Basic ' + Buffer.from(this.marchantId).toString('base64'),
        },
        responseType: 'json',
      })
      .catch()

    return response.body
  }

  public async retrieve(paymentId: string): Promise<any> {
    let response = await got
      .get(`${this.getUrl()}${paymentId}`, {
        headers: {
          Authorization: 'Basic ' + Buffer.from(this.marchantId).toString('base64'),
        },
        responseType: 'json',
      })
      .catch()
    return response.body
  }

  public async validate(paymentId: string): Promise<boolean> {
    const paymentRetrieve = await this.retrieve(paymentId)
    if (!paymentRetrieve || paymentRetrieve.status !== 'AUTHORIZED') {
      return paymentRetrieve && paymentRetrieve.status === 'SUCCESS'
    }

    const paymentCapture = await this.capture(paymentId)
    if (!paymentCapture || paymentCapture.status !== 'SUCCESS') {
      return false
    }

    const paymentRow = await Database.from('payment_paysafecards')
      .where('token', paymentId)
      .where('credited', false)
      .first()

    if (!paymentRow) {
      return false
    }

    const priceRow = await Database.from('payment_prices')
      .where('method', 'paysafecard')
      .where('price', paymentRow.price)
      .first()

    if (!priceRow || priceRow.credits <= 0) {
      return false
    }

    const user = await User.findOrFail(paymentRow.user_id)
    user.credits += priceRow.credits
    await user.save()

    await Database.from('payment_paysafecards').where('id', paymentRow.id).update({
      credited: true,
    })

    const payout = paymentRow.price * ((100 - (await this.getPaysafecardFees())) / 100)
    await Database.insertQuery().table('user_payments').insert({
      user_id: user.id,
      method: 'paysafecard',
      price: paymentRow.price,
      payout: payout,
      credits: priceRow.credits,
    })
    return true
  }

  public async getPaysafecardFees(): Promise<number> {
    return await CacheService.remember(
      'paysafecard-fee',
      async () => {
        let datetime = DateTime.local().set({ day: 1, hour: 0, minute: 0, second: 0 })
        const result = await Database.from('user_payments')
          .where('created_at', '>=', datetime.toSQL())
          .where('method', 'paysafecard')
          .sum('price as sum')

        const sum = result[0]['sum'] ?? 0
        return this.fees.find((value) => value.max >= sum)?.fees
      },
      '1h'
    )
  }

  private getUrl() {
    return this.sandbox ? this.sandbox_url : this.production_url
  }
}

export default new Paysafecard()
