import { render as renderComponent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../src/redux/store'

type RenderOptions = Parameters<typeof renderComponent>[1]

export * from '@testing-library/react'

export const baseRender = (ui: ReactElement, options?: RenderOptions) => {
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup()
  }
}

const render = (Component: ReactElement, options: RenderOptions = {}) => {
  const store = createStore()

  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    ...baseRender(Component, { ...options, wrapper: Wrapper })
  }
}

export { render }
