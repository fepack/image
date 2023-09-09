import { describe, expect, test } from 'vitest'
import { isSupportWebP } from '..'

describe('WebP Format Support', () => {
  test('isSupportWebP should return a boolean', async () => {
    const isSupport = await isSupportWebP()
    expect(typeof isSupport).toBe('boolean')
  })
})
