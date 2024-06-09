import * as matchers from '@testing-library/jest-dom/matchers'
import 'cross-fetch/polyfill'
import { toHaveNoViolations } from 'jest-axe'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { server } from '../src/mocks/server'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

expect.extend(toHaveNoViolations)

expect.extend(matchers)
