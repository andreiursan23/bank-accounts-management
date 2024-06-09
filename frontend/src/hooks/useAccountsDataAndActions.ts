import { useEffect } from 'react'
import {
  useDeleteAccountMutation,
  useEditAccountMutation,
  useGetAccountsQuery,
  useSearchAccountsQuery
} from '../features/accounts/accountsApiService'
import { RootState } from '../redux/store'
import { useAppSelector } from '../redux/useAppSelector'

const useAccountsDataAndActions = () => {
  const { searchTerm } = useAppSelector((state: RootState) => state.accounts)

  // Get accounts
  const {
    isLoading: isGetAccountsLoading,
    isError: isGetAccountsError,
    data: allAccounts
  } = useGetAccountsQuery()
  // Search accounts
  const {
    isLoading: isSearchLoading,
    isError: isSearchError,
    data: searchResultAccounts
  } = useSearchAccountsQuery(searchTerm, {
    skip: !searchTerm
  })
  // Edit account
  const [
    editAccount,
    { isLoading: isEditAccountLoading, isError: isEditAccountError, reset: resetEditAccount }
  ] = useEditAccountMutation()
  // Delete account
  const [
    deleteAccount,
    { isLoading: isDeleteAccountLoading, isError: isDeleteAccountError, reset: resetDeleteAccount }
  ] = useDeleteAccountMutation()

  // Data
  const accounts = (searchTerm ? searchResultAccounts : allAccounts) || []
  const isLoading =
    isGetAccountsLoading || isSearchLoading || isEditAccountLoading || isDeleteAccountLoading
  const isError = isGetAccountsError || isSearchError || isEditAccountError || isDeleteAccountError

  // Reset errors after 5 seconds
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        resetEditAccount()
        resetDeleteAccount()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isError, resetEditAccount, resetDeleteAccount])

  return {
    data: {
      accounts,
      isLoading,
      isError
    },
    actions: { editAccount, deleteAccount }
  }
}

export default useAccountsDataAndActions
