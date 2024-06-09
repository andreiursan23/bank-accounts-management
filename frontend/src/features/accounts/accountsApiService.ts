import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../redux/utils'
import { Account } from './types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Accounts', 'OwnerIds', 'CreditAccounts', 'DebitAccounts'],
  endpoints: builder => ({
    getAccounts: builder.query<Account[], void>({
      query: () => ({ url: '/accounts', method: 'GET' }),
      providesTags: ['Accounts'],
      keepUnusedDataFor: 60
    }),
    createAccount: builder.mutation<Account, Omit<Account, 'id'>>({
      query: account => ({ url: '/accounts', method: 'POST', data: account }),
      invalidatesTags: ['Accounts', 'OwnerIds', 'CreditAccounts', 'DebitAccounts']
    }),
    deleteAccount: builder.mutation<void, number>({
      query: id => ({ url: `/accounts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Accounts', 'OwnerIds', 'CreditAccounts', 'DebitAccounts'],
      // Optimistic update to the cache
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          accountsApi.util.updateQueryData('getAccounts', undefined, draft => {
            const index = draft.findIndex(account => account.id === id)

            if (index !== -1) {
              draft.splice(index, 1)
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    editAccount: builder.mutation<Account, { id: number; account: Omit<Account, 'id'> }>({
      query: ({ id, account }) => ({ url: `/accounts/${id}`, method: 'PATCH', data: account }),
      invalidatesTags: ['Accounts', 'OwnerIds', 'CreditAccounts', 'DebitAccounts'],
      // Optimistic update to the cache
      async onQueryStarted({ id, account }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          accountsApi.util.updateQueryData('getAccounts', undefined, draft => {
            const index = draft.findIndex(account => account.id === id)

            if (index !== -1) {
              draft[index] = { ...draft[index], ...account }
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    searchAccounts: builder.query<Account[], string>({
      query: term => ({ url: `/accounts/search?term=${term}`, method: 'GET' }),
      providesTags: ['Accounts']
    }),
    getAllOwnerIds: builder.query<number[], void>({
      query: () => ({ url: '/accounts/allOwnerIds', method: 'GET' }),
      providesTags: ['OwnerIds']
    }),
    getDebitAccountsByOwnerId: builder.query<Account[], string | undefined>({
      query: (ownerId: string | undefined) => ({ url: `/accounts/${ownerId}`, method: 'GET' }),
      providesTags: ['DebitAccounts']
    }),
    getCreditAccountsByOwnerId: builder.query<Account[], string | undefined>({
      query: (ownerId: string | undefined) => ({ url: `/accounts/${ownerId}`, method: 'GET' }),
      providesTags: ['CreditAccounts']
    })
  })
})

export const {
  useGetAccountsQuery,
  useCreateAccountMutation,
  useDeleteAccountMutation,
  useEditAccountMutation,
  useSearchAccountsQuery,
  useGetAllOwnerIdsQuery,
  useGetDebitAccountsByOwnerIdQuery,
  useGetCreditAccountsByOwnerIdQuery
} = accountsApi
