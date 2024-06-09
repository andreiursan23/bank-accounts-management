import { axe } from 'jest-axe'
import { rest } from 'msw'
import { describe, it } from 'vitest'
import { render, screen, waitForElementToBeRemoved } from '../../../test/utilities'
import { server } from '../../mocks/server'
import AccountsTable from './AccountsTable'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

describe('AccountsTable component', () => {
  it('should be accessible', async () => {
    const { container } = render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the accounts table with loader', async () => {
    render(<AccountsTable />)

    const loader = screen.getByTestId(/loader/i)

    expect(loader).toBeInTheDocument()
  })

  it('renders without action table fields', async () => {
    render(<AccountsTable limitedView />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    expect(screen.queryByText(/actions/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/search/i)).not.toBeInTheDocument()
    expect(screen.queryByTestId(/edit-1/i)).not.toBeInTheDocument()
  })

  it('shows no accounts message when there are no accounts', async () => {
    server.use(
      rest.get(`${BASE_URL}/accounts`, (_, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'No accounts found' }))
      })
    )

    render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const noAccountsMessage = await screen.findByText(/no accounts/i)

    expect(noAccountsMessage).toBeInTheDocument()
  })

  it('renders the accounts table with table head and data', async () => {
    render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const tableHeadOwnerId = await screen.findByText(/owner id/i)
    const tableHeadBalance = await screen.findByText(/balance/i)
    const tableHeadCurrency = await screen.findByText(/currency/i)

    expect(tableHeadOwnerId).toBeInTheDocument()
    expect(tableHeadBalance).toBeInTheDocument()
    expect(tableHeadCurrency).toBeInTheDocument()

    const tableDataOwnerId = await screen.findByText(/4/i)
    const tableDataBalance = await screen.findByText(/1000/i)
    const tableDataCurrency = await screen.findByText(/USD/i)

    expect(tableDataOwnerId).toBeInTheDocument()
    expect(tableDataBalance).toBeInTheDocument()
    expect(tableDataCurrency).toBeInTheDocument()
  })

  it('has a search input that filters results based on the search term', async () => {
    const { user } = render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const searchInput = screen.getByLabelText(/search/i)
    await user.type(searchInput, 'GBP')

    expect(searchInput).toHaveValue('GBP')

    try {
      await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))
    } catch (error) {
      console.log(error)
    }

    const tableDataOwnerId = screen.getByTestId(/ownerId-3/i)
    const tableDataBalance = screen.getByTestId(/balance-3/i)
    const tableDataCurrency = screen.getByTestId(/currency-3/i)

    expect(tableDataOwnerId).toContainHTML('6')
    expect(tableDataBalance).toContainHTML('3000')
    expect(tableDataCurrency).toContainHTML('GBP')

    const tableDataOwnerId2 = screen.queryByTestId(/ownerId-2/i)
    const tableDataBalance2 = screen.queryByTestId(/balance-2/i)
    const tableDataCurrency2 = screen.queryByTestId(/balance-2/i)

    expect(tableDataOwnerId2).not.toBeInTheDocument()
    expect(tableDataBalance2).not.toBeInTheDocument()
    expect(tableDataCurrency2).not.toBeInTheDocument()
  })

  it('deletes an account when the delete button is clicked', async () => {
    const { user } = render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const deleteButton = screen.getByTestId(/delete-1/i)

    await user.click(deleteButton)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    expect(screen.queryByTestId(/delete-1/i)).not.toBeInTheDocument()
  })

  it('shows an error message when one of the actions fails', async () => {
    server.use(
      rest.delete(`${BASE_URL}/accounts/:id`, (_, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'An error occurred' }))
      })
    )

    const { user } = render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const deleteButton = screen.getByTestId(/delete-3/i)

    await user.click(deleteButton)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i), { timeout: 2000 })

    const errorMessage = screen.getByText(/An unexpected error occurred/i)

    expect(errorMessage).toBeInTheDocument()
  })

  it('edits an account with new values, saves it and renders the new modified account', async () => {
    const { user } = render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const editButton = screen.getByTestId(/edit-3/i)

    await user.click(editButton)

    const otherEditButton = screen.queryByTestId(/edit-2/i)
    expect(otherEditButton).toBeDisabled()

    const ownerIdInput = screen.getByTestId(/ownerId-input-3/i)
    const balanceInput = screen.getByTestId(/balance-input-3/i)

    screen.debug()

    await user.clear(ownerIdInput)
    await user.type(ownerIdInput, '7')

    await user.clear(balanceInput)
    await user.type(balanceInput, '4000')

    const currencySelect = await screen.findByTestId(/select-currency/i)
    await user.click(currencySelect)
    const currencyOption = await screen.findByTestId(/select-currency-EUR/i)
    await user.click(currencyOption)

    const saveButton = screen.getByTestId(/save-3/i)

    await user.click(saveButton)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const tableDataOwnerId = screen.getByTestId(/ownerId-3/i)
    const tableDataBalance = screen.getByTestId(/balance-3/i)
    const tableDataCurrency = screen.getByTestId(/currency-3/i)

    expect(tableDataOwnerId).toContainHTML('7')
    expect(tableDataBalance).toContainHTML('4000')
    expect(tableDataCurrency).toContainHTML('EUR')
  })

  it('saves same values without loader when fields are not changed', async () => {
    const { user } = render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const editButton = screen.getByTestId(/edit-3/i)

    await user.click(editButton)

    const saveButton = screen.getByTestId(/save-3/i)

    await user.click(saveButton)

    const loader = screen.queryByTestId(/loader/i)

    expect(loader).not.toBeInTheDocument()
  })

  it('disables the save button when one of the fields is empty', async () => {
    const { user } = render(<AccountsTable />)

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const editButton = screen.getByTestId(/edit-3/i)

    await user.click(editButton)

    const ownerIdInput = screen.getByTestId(/ownerId-input-3/i)
    const balanceInput = screen.getByTestId(/balance-input-3/i)

    await user.clear(ownerIdInput)
    await user.clear(balanceInput)

    const saveButton = screen.getByTestId(/save-3/i)

    expect(saveButton).toBeDisabled()
  })
})
