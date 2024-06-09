export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP'
}

export interface Account {
  id: number
  ownerId: number
  currency: Currency
  balance: number
}

export interface AccountsState {
  edit: Record<number, boolean>
  disabled: Record<number, boolean>
  searchTerm: string
}

export interface InitializeDisabledPayload {
  accounts: Account[]
}

export interface ToggleEditPayload {
  id: number
  accounts: Account[]
}
