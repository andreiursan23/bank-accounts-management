import { axe } from 'jest-axe'
// import { rest } from 'msw'
import { expect, it } from 'vitest'
import { render, screen, waitForElementToBeRemoved } from '../../../test/utilities'
// import { server } from '../../mocks/server'
import CreateTransfer from './CreateTransfer'

describe('CreateTransfer component', () => {
  it('renders the create account form', () => {
    render(<CreateTransfer />)
  })

  it('should be accessible', async () => {
    const { container } = render(<CreateTransfer />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('has select input for debit account owner id', () => {
    render(<CreateTransfer />)

    screen.getByText(/debit account/i)
    screen.getByLabelText(/owner id/i)
  })

  it('shows a list of owner ids for debit account and selects one on click', async () => {
    const { user } = render(<CreateTransfer />)

    const ownerIdsSelect = await screen.findByTestId(/select-debitOwnerId/i)
    await user.click(ownerIdsSelect)

    const option1 = await screen.findByTestId(/select-debitOwnerId-4/i)
    const option2 = await screen.findByTestId(/select-debitOwnerId-5/i)
    const option3 = await screen.findByTestId(/select-debitOwnerId-6/i)

    expect(option1).toContainHTML('4')
    expect(option2).toContainHTML('5')
    expect(option3).toContainHTML('6')

    await user.click(option1)
    expect(ownerIdsSelect).toContainHTML('4')
  })

  it('shows a list of debit and credit accounts for selected owner id and selects one of each on click, then transfers the converted amount', async () => {
    const { user } = render(<CreateTransfer />)

    // Debit account
    const ownerIdsSelectDebit = await screen.findByTestId(/select-debitOwnerId/i)
    await user.click(ownerIdsSelectDebit)

    const option1Debit = await screen.findByTestId(/select-debitOwnerId-4/i)
    expect(option1Debit).toContainHTML('4')

    await user.click(option1Debit)
    expect(ownerIdsSelectDebit).toContainHTML('4')

    await waitForElementToBeRemoved(() => screen.getByTestId(/loader/i))

    const accountIdDebit = await screen.findByTestId(/id-debit-1/i)
    const balanceDebit = await screen.findByTestId(/balance-debit-1/i)
    const currencyDebit = await screen.findByTestId(/currency-debit-1/i)

    expect(accountIdDebit).toContainHTML('1')
    expect(balanceDebit).toContainHTML('1000')
    expect(currencyDebit).toContainHTML('USD')

    const tableRowDebit = await screen.findByTestId(/row-debit-1/i)
    await user.click(tableRowDebit)

    const checkboxDebit = await screen.findByTestId(/checkbox-debit-1/i)
    expect(checkboxDebit).toBeChecked()

    // Credit account
    const ownerIdsSelectCredit = await screen.findByTestId(/select-creditOwnerId/i)
    await user.click(ownerIdsSelectCredit)

    // Excludes debit account owner id because selected debit owner id only has one account
    expect(screen.queryByTestId(/select-creditOwnerId-4/i)).not.toBeInTheDocument()

    const option1Credit = await screen.findByTestId(/select-creditOwnerId-5/i)
    expect(option1Credit).toContainHTML('5')

    await user.click(option1Credit)
    expect(ownerIdsSelectCredit).toContainHTML('5')

    const accountIdCredit = await screen.findByTestId(/id-credit-2/i)
    const balanceCredit = await screen.findByTestId(/balance-credit-2/i)
    const currencyCredit = await screen.findByTestId(/currency-credit-2/i)

    expect(accountIdCredit).toContainHTML('2')
    expect(balanceCredit).toContainHTML('2000')
    expect(currencyCredit).toContainHTML('EUR')

    screen.debug()

    const tableRowCredit = await screen.findByTestId(/row-credit-2/i)
    await user.click(tableRowCredit)

    const checkboxCredit = await screen.findByTestId(/checkbox-credit-2/i)
    expect(checkboxCredit).toBeChecked()

    // Transfer
    const amountInput = screen.getByLabelText(/transfer amount/i)
    await user.type(amountInput, '200')

    const conversionAlert = await screen.findByText(/the two accounts have different currencies/i)
    expect(conversionAlert).toBeInTheDocument()

    const convertedAmount = await screen.findByTestId(/converted-amount/i)
    expect(convertedAmount).toContainHTML('185.19 EUR')

    const submitButton = screen.getByRole('button', { name: /create transfer/i })
    await user.click(submitButton)

    const successMessage = await screen.findByText(/transfer created successfully/i)
    expect(successMessage).toBeInTheDocument()

    // Reset form
    expect(amountInput).toHaveValue(null)
  })

  // @TODO: test for error message when transfer amount is greater than debit account balance

  // @TODO: test for error message if transfer fails
})
