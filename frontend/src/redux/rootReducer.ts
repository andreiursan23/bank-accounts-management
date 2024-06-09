import { combineReducers } from '@reduxjs/toolkit'
import { accountsApi } from '../features/accounts/accountsApiService'
import accountReducer from '../features/accounts/accountsSlice'
import { transfersApi } from '../features/transfers/transfersApiService'
import transfersReducer from '../features/transfers/transfersSlice'

const rootReducer = combineReducers({
  accounts: accountReducer,
  transfers: transfersReducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [transfersApi.reducerPath]: transfersApi.reducer
})

export default rootReducer
