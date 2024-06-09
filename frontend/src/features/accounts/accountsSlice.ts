import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AccountsState, InitializeDisabledPayload, ToggleEditPayload } from './types'

const initialState: AccountsState = {
  edit: {},
  disabled: {},
  searchTerm: ''
}

const accountsSlice = createSlice({
  name: 'accountsSlice',
  initialState,
  reducers: {
    initializeDisabled(state, action: PayloadAction<InitializeDisabledPayload>) {
      action.payload.accounts.forEach(account => {
        state.disabled[account.id] = false
      })
    },
    toggleEdit(state, action: PayloadAction<ToggleEditPayload>) {
      const { id, accounts } = action.payload
      state.edit[id] = !state.edit[id]

      const isAnyEditing = Object.values(state.edit).some(state => state === true)

      state.disabled = accounts.reduce((acc, account) => {
        acc[account.id] = isAnyEditing && account.id !== id
        return acc
      }, {} as Record<number, boolean>)
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    }
  }
})

export const { initializeDisabled, toggleEdit, setSearchTerm } = accountsSlice.actions
export default accountsSlice.reducer
