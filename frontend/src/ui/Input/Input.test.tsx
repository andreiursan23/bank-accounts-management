import { axe } from 'jest-axe'
import { render, screen } from '../../../test/utilities'
import Input from './Input'

describe('Input component', () => {
  it('should be accessible', async () => {
    const { container } = render(
      <Input id="test-input" label="Test Label" placeholder="Test Placeholder" />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the input with the correct label and placeholder', () => {
    render(<Input id="test-input" label="Test Label" placeholder="Test Placeholder" />)

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
  })

  it('applies the correct border style when there is an error message', () => {
    render(
      <Input
        id="test-input"
        label="Test Label"
        errorMessage="Test Error"
        placeholder="Test Placeholder"
      />
    )

    const inputElement = screen.getByLabelText('Test Label')

    expect(inputElement).toHaveClass('border-red-400')
    expect(screen.getByText('Test Error')).toBeInTheDocument()
  })

  it('applies the correct border style when there is no error message', () => {
    render(<Input id="test-input" label="Test Label" placeholder="Test Placeholder" />)

    const inputElement = screen.getByLabelText('Test Label')

    expect(inputElement).toHaveClass('border-gray-200')
  })

  it('renders without label when not provided', () => {
    render(<Input id="test-input" placeholder="Test Placeholder" />)

    expect(screen.queryByLabelText('Test Label')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
  })

  it('handles input value changes', async () => {
    const { user } = render(
      <Input id="test-input" label="Test Label" placeholder="Test Placeholder" />
    )

    const inputElement = screen.getByLabelText('Test Label')

    await user.type(inputElement, 'new value')

    expect(inputElement).toHaveValue('new value')
  })
})
