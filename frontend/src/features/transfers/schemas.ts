import { z } from 'zod'

export const getTransferSchema = (maxAmount: number) =>
  z.object({
    fromAccountId: z.coerce
      .number()
      .positive('From Account ID must be a positive number')
      .nonnegative('From Account ID must be a positive number')
      .int('From Account ID must be an integer number')
      .min(1, 'From Account ID must be greater than 0'),
    toAccountId: z.coerce
      .number()
      .positive('To Account ID must be a positive number')
      .nonnegative('To Account ID must be a positive number')
      .int('To Account ID must be an integer number')
      .min(1, 'To Account ID must be greater than 0'),
    amount: z.coerce
      .number()
      .positive('Amount must be a positive number')
      .nonnegative('Amount must be a positive number')
      .min(1, 'Amount must be greater than 0')
      .max(maxAmount, `Amount must be less than the balance of the debit account ${maxAmount}`)
  })
