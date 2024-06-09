import { rest } from 'msw'
import { setupServer } from 'msw/node'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

let accounts = [
  { id: 1, ownerId: 4, currency: 'USD', balance: 1000 },
  { id: 2, ownerId: 5, currency: 'EUR', balance: 2000 },
  { id: 3, ownerId: 6, currency: 'GBP', balance: 3000 }
]

export const handlers = [
  rest.get(`${BASE_URL}/accounts`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(accounts))
  }),

  rest.get(`${BASE_URL}/accounts/search`, (req: any, res, ctx) => {
    const searchTerm = req.url.searchParams.get('term')

    const filteredAccounts = accounts.filter(account => account.currency.includes(searchTerm || ''))

    return res(ctx.status(200), ctx.json(filteredAccounts))
  }),

  rest.post(`${BASE_URL}/accounts`, (req: any, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        ownerId: req.body.ownerId,
        currency: req.body.currency,
        balance: req.body.balance
      })
    )
  }),

  rest.delete(`${BASE_URL}/accounts/:id`, (req: any, res, ctx) => {
    const { id } = req.params
    accounts = accounts.filter(account => account.id !== parseInt(id))
    return res(ctx.status(200))
  }),

  rest.patch(`${BASE_URL}/accounts/:id`, (req: any, res, ctx) => {
    const { id } = req.params
    const { ownerId, currency, balance } = req.body
    const accountIndex = accounts.findIndex(account => account.id === parseInt(id))

    if (accountIndex !== -1) {
      accounts[accountIndex] = { ...accounts[accountIndex], ownerId, currency, balance }
    }

    return res(ctx.status(200), ctx.json(accounts[accountIndex]))
  }),

  rest.get(`${BASE_URL}/accounts/allOwnerIds`, (_, res, ctx) => {
    const ownerIds = accounts.map(account => account.ownerId)
    return res(ctx.status(200), ctx.json(ownerIds))
  }),

  rest.get(`${BASE_URL}/accounts/:id`, (req: any, res, ctx) => {
    const { id } = req.params
    const account = accounts.filter(account => account.ownerId === parseInt(id))
    return res(ctx.status(200), ctx.json(account))
  }),

  rest.post(`${BASE_URL}/transfers`, (req: any, res, ctx) => {
    const { amount, fromAccountId, toAccountId } = req.body

    const fromAccountIndex = accounts.findIndex(account => account.id === fromAccountId)
    const toAccountIndex = accounts.findIndex(account => account.id === toAccountId)

    accounts[toAccountIndex].balance += amount
    accounts[fromAccountIndex].balance -= amount

    return res(
      ctx.status(200),
      ctx.json({
        fromAccountId,
        toAccountId,
        amount
      })
    )
  })
]

export const server = setupServer(...handlers)
