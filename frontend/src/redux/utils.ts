import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export interface CustomError {
  status?: number
  message: string
}

export interface QueryParams {
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
}

export interface BaseQueryConfig {
  baseUrl: string
}

interface ErrorResponseData {
  statusCode: number
  message: string
}

export const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred.'

export const axiosBaseQuery =
  (
    { baseUrl }: BaseQueryConfig = { baseUrl: '' }
  ): BaseQueryFn<QueryParams, unknown, CustomError> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers
      })

      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError<ErrorResponseData>

      const { statusCode, message } = err.response?.data || {}

      return {
        error: {
          status: statusCode,
          message: message || DEFAULT_ERROR_MESSAGE
        }
      }
    }
  }
