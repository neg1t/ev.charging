import { message, notification } from 'antd'
import {
  type AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
  scopeBind,
} from 'effector'

import { API_ROOT } from 'shared/config/env-consts'

import { createApiClient } from '../../lib/create-api-client'
import { ApiError, AuthError, NotFoundError } from '../errors'
import { $accessToken } from './token'

export const $apiClient = createStore<AxiosInstance>(createApiClient(API_ROOT))
export const apiApiRequestError = createEvent<Error>()

const requestHandlerFx = attach({
  source: $accessToken,
  effect: (token, config: InternalAxiosRequestConfig) => ({
    ...config,
    // withCredentials: true,
    headers: new AxiosHeaders({
      Authorization: `Bearer ${token}`,
    }),
  }),
})

const responseHandler = (response: AxiosResponse) => {
  return response
}

const errorHandlerFx = createEffect(
  (error: AxiosError<{ Message: string }>) => {
    const { response } = error
    if (response) {
      const isUnauthorized = response.status === 401
      if (isUnauthorized) {
        throw new AuthError(response.statusText)
      }
      const isNotFound = response.status === 404
      if (isNotFound) {
        throw new NotFoundError(response.statusText)
      }

      if (response.data.Message) {
        const errorMessage: string = error.response?.data?.Message || ''

        notification.open({
          placement: 'bottomRight',
          type: 'error',
          message: 'Ошибка запроса',
          duration: 2,
          description:
            errorMessage.length > 150
              ? errorMessage.slice(0, 150) + '...'
              : errorMessage,
          key: 'axiosError',
          onClick: () => {
            void navigator.clipboard.writeText('```' + errorMessage + '```')

            message.open({
              type: 'success',
              content: 'Текст ошибки скопирован',
              duration: 1,
            })
          },
        })
      }

      throw new ApiError({
        code: response.status,
        message: response.statusText,
        data: response.data,
      })
    }

    throw error
  },
)

export const initApiClientFx = attach({
  source: $apiClient,
  effect: (instance) => {
    instance.interceptors.request.use(scopeBind(requestHandlerFx))
    instance.interceptors.response.use(
      responseHandler,
      scopeBind(errorHandlerFx),
    )
  },
})

sample({
  clock: errorHandlerFx.failData,
  target: apiApiRequestError,
})

export type RequestConfig<R = unknown> = AxiosRequestConfig<R>
export type ResponseErrorConfig<E> = AxiosError<E>

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function apiClient<TData, _unknown, TVariables = never>(
  config: RequestConfig<TVariables>,
): Promise<AxiosResponse<TData>> {
  const fetchData = attach({
    source: $apiClient,
    effect: async (instance) => {
      const response = await instance(config)
      return response
    },
  })

  return fetchData() as Promise<AxiosResponse<TData>>
}

export default apiClient
