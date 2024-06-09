import { BrowserRouter } from 'react-router-dom'
import { render, screen } from 'test/utilities'
import Transfers from './Transfers'

describe('Transfers page', () => {
  test('renders component', () => {
    render(
      <BrowserRouter>
        <Transfers />
      </BrowserRouter>
    )

    expect(screen.getByText(/Make a new transfer/i)).toBeInTheDocument()
  })
})
