import { render } from '../../../test/utilities'
import Loader from './Loader'

describe('Loader component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<Loader />)

    expect(asFragment()).toMatchSnapshot()
  })
})
