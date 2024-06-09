import { BrowserRouter } from 'react-router-dom'
import { render, screen } from 'test/utilities'
import Error404 from './Error404'

describe('Error404 page', () => {
  test('renders component', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    )

    expect(screen.getByText(/Sorry, this page does not exist/i)).toBeInTheDocument()
  })
})
