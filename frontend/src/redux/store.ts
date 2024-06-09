import { configureStore } from '@reduxjs/toolkit'
import { accountsApi } from '../features/accounts/accountsApiService'
import { transfersApi } from '../features/transfers/transfersApiService'
import rootReducer from './rootReducer'

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(accountsApi.middleware).concat(transfersApi.middleware)
  })
}

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
