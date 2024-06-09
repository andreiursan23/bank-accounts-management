import { render, screen } from 'test/utilities'
import App from './App'

describe('App component', () => {
  test('renders component', () => {
    render(<App />)

    expect(screen.getByText(/Welcome to Bank Accounts Management/i)).toBeInTheDocument()
  })
})
