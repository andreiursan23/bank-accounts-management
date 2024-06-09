import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransferAccount, TransfersState } from './types'

const initialState: TransfersState = {
  debit: {
    ownerId: undefined,
    accountId: undefined,
    currency: undefined
  },
  credit: {
    ownerId: undefined,
    accountId: undefined,
    currency: undefined
  },
  maxAmount: 0
}

const transfersSlice = createSlice({
  name: 'transfersSlice',
  initialState,
  reducers: {
    setDebitInfo: (state, action: PayloadAction<TransferAccount>) => {
      state.debit = action.payload
    },
    setCreditInfo: (state, action: PayloadAction<TransferAccount>) => {
      state.credit = action.payload
    },
    setMaxAmount: (state, action: PayloadAction<number>) => {
      state.maxAmount = action.payload
    }
  }
})

export const { setDebitInfo, setCreditInfo, setMaxAmount } = transfersSlice.actions
export default transfersSlice.reducer
