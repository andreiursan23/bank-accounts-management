import { z } from 'zod'
import { Currency } from './types'

export const CreateOrEditAccountSchema = z.object({
  ownerId: z.coerce
    .number()
    .positive('Owner ID must be a positive number')
    .nonnegative('Owner ID must be a positive number')
    .min(1, 'Owner ID must be greater than 0'),
  currency: z.nativeEnum(Currency, {
    message: `Currency must be one of ${Object.values(Currency)
      .map(currency => `${currency}`)
      .join(', ')}`
  }),
  balance: z.coerce
    .number()
    .positive('Balance must be a positive number')
    .nonnegative('Balance must be a positive number')
    .min(1, 'Balance must be greater than 0')
})
