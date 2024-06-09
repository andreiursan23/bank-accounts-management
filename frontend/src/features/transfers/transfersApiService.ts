import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../redux/utils'
import { accountsApi } from '../accounts/accountsApiService'
import { Transfer, TransferResponse } from './types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const transfersApi = createApi({
  reducerPath: 'transfersApi',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Transfers'],
  endpoints: builder => ({
    getAccounts: builder.query<Transfer[], void>({
      query: () => ({ url: '/transfers', method: 'GET' }),
      providesTags: ['Transfers'],
      keepUnusedDataFor: 60
    }),
    createTransfer: builder.mutation<TransferResponse, Transfer>({
      query: transfer => ({ url: '/transfers', method: 'POST', data: transfer }),
      invalidatesTags: ['Transfers'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(
          accountsApi.util.invalidateTags([
            'Accounts',
            'OwnerIds',
            'CreditAccounts',
            'DebitAccounts'
          ])
        )
      }
    })
  })
})

export const { useCreateTransferMutation } = transfersApi
