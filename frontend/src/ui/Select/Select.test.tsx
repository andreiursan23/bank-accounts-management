import { axe } from 'jest-axe'
import { render } from '../../../test/utilities'
import Select from './Select'

const options = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' }
]

describe('Select component', () => {
  it('renders the select input', () => {
    render(
      <Select id="test-input" label="Test Label" placeholder="Test Placeholder" options={options} />
    )
  })

  it('should be accessible', async () => {
    const { container } = render(
      <Select id="test-input" label="Test Label" placeholder="Test Placeholder" options={options} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
