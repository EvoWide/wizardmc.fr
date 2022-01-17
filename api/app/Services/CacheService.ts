/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { Duration } from 'luxon'
import ms from 'ms'

class CacheService {
  private cache = new Map<string, CacheValue>()

  public put(key: string, value: any, duration?: Duration | string) {
    if (!duration) {
      this.cache.set(key, { data: value })
      return
    }

    let expireAt: number
    if (typeof duration === 'string') {
      expireAt = ms(duration)
    } else {
      expireAt = duration.as('millisecond')
    }

    const data: ExpiringCacheValue = {
      data: value,
      expireAt: new Date().getTime() + expireAt,
    }
    this.cache.set(key, data)
  }

  public remove(key: string): boolean {
    return this.cache.delete(key)
  }

  public async remember(key: string, method: () => any, duration: Duration | string) {
    const currentValue = this.get(key)
    if (currentValue) {
      return currentValue
    }

    const data = await method()

    this.put(key, data, duration)
    return data
  }

  public get(key: string, defValue?: any): any {
    const currentValue = this.cache.get(key)
    if (!currentValue || this.isExpired(currentValue)) {
      return defValue ?? null
    }
    return currentValue.data
  }

  private isExpired(value: CacheValue) {
    if ('expireAt' in value) {
      return (value as ExpiringCacheValue).expireAt <= new Date().getTime()
    }
    return false
  }
}

interface CacheValue {
  data: any
}

interface ExpiringCacheValue extends CacheValue {
  expireAt: number
}

export default new CacheService()
