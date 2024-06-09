import { render, screen } from 'test/utilities'
import Accounts from './Accounts'

describe('Accounts page', () => {
  test('renders component', () => {
    render(<Accounts />)

    expect(screen.getByText(/Create a new account/i)).toBeInTheDocument()
  })
})
