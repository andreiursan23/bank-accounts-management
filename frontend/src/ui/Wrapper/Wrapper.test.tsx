import { axe } from 'jest-axe'
import { render } from '../../../test/utilities'
import Wrapper from './Wrapper'

describe('Wrapper component', () => {
  it('renders the wrapper', () => {
    render(
      <Wrapper>
        <p>Test</p>
      </Wrapper>
    )
  })

  it('should be accessible', async () => {
    const { container } = render(
      <Wrapper>
        <p>Test</p>
      </Wrapper>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('has correct tailwind classes', () => {
    const { container } = render(
      <Wrapper>
        <p>Test</p>
      </Wrapper>
    )

    expect(container.firstChild).toHaveClass('mx-auto max-w-6xl py-20 px-10')
  })

  it('can accept custom classNames', () => {
    const { container } = render(
      <Wrapper classNames="bg-red-500">
        <p>Test</p>
      </Wrapper>
    )

    expect(container.firstChild).toHaveClass('bg-red-500')
  })
})
