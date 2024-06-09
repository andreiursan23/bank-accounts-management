import { Account, Currency } from '../accounts/types'

export interface TransferAccount {
  ownerId: string | undefined
  accountId: number | undefined
  currency: Currency | undefined
}

export interface TransfersState {
  debit: TransferAccount
  credit: TransferAccount
  maxAmount: number
}

export interface Transfer {
  fromAccountId: number
  toAccountId: number
  amount: number
}

export interface TransferResponse {
  amount: number
  fromAccount: Account
  toAccount: Account
  id: number
}
