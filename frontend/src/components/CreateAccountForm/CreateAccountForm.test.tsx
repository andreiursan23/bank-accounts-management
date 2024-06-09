import { axe } from 'jest-axe'
import { rest } from 'msw'
import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '../../../test/utilities'
import { server } from '../../mocks/server'
import CreateAccountForm from './CreateAccountForm'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

describe('CreateAccountForm component', () => {
  it('renders the create account form', () => {
    render(<CreateAccountForm />)
  })

  it('should be accessible', async () => {
    const { container } = render(<CreateAccountForm />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('has all input fields for a ownerId, balance and currency', () => {
    render(<CreateAccountForm />)

    screen.getByLabelText(/owner id/i)
    screen.getByLabelText(/balance/i)
    screen.getByLabelText(/currency/i)
  })

  it('has a submit button', () => {
    render(<CreateAccountForm />)

    screen.getByRole('button', { name: /create account/i })
  })

  it('does not show an error message if there is no error', () => {
    render(<CreateAccountForm />)

    expect(screen.queryByText(/an error occurred/i)).toBeNull()
  })

  it('shows errors when inputs are empty', async () => {
    const { user } = render(<CreateAccountForm />)

    const submitButton = screen.getByRole('button', { name: /create account/i })

    await user.click(submitButton)

    const ownerIdError = await screen.findByText(/owner id must be a positive number/i)
    const balanceError = await screen.findByText(/balance must be a positive number/i)
    const currencyError = await screen.findByText(/currency must be one of USD, EUR, GBP/i)

    expect(ownerIdError).toBeInTheDocument()
    expect(balanceError).toBeInTheDocument()
    expect(currencyError).toBeInTheDocument()
  })

  it('creates new account and resets the form submitting it', async () => {
    const { user } = render(<CreateAccountForm />)

    const ownerIdInput = screen.getByLabelText(/owner id/i)
    const balanceInput = screen.getByLabelText(/balance/i)
    const currencyInput = screen.getByLabelText(/currency/i)

    await user.type(ownerIdInput, '2')
    await user.type(balanceInput, '1450')

    const currencySelect = await screen.findByTestId(/select-currency/i)
    await user.click(currencySelect)
    const currencyOption = await screen.findByTestId(/select-currency-USD/i)
    await user.click(currencyOption)

    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(ownerIdInput).toHaveValue(null)
      expect(balanceInput).toHaveValue(null)
      expect(currencyInput).toHaveValue('')
      expect(screen.getByText(/account created successfully/i)).toBeInTheDocument()
    })
  })

  it("shows an error message if there's an error creating the account", async () => {
    server.use(
      rest.post(`${BASE_URL}/accounts`, (_, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'Failed to create account' }))
      })
    )

    const { user } = render(<CreateAccountForm />)

    const ownerIdInput = screen.getByLabelText(/owner id/i)
    const balanceInput = screen.getByLabelText(/balance/i)

    await user.type(ownerIdInput, '2')
    await user.type(balanceInput, '1450')

    const currencySelect = await screen.findByTestId(/select-currency/i)
    await user.click(currencySelect)
    const currencyOption = await screen.findByTestId(/select-currency-USD/i)
    await user.click(currencyOption)

    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/failed to create account/i)).toBeInTheDocument()
    })
  })
})
