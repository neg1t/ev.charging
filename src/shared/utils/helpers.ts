/* eslint-disable @typescript-eslint/no-unnecessary-template-expression */
import { type TablePaginationConfig, type TableProps, message } from 'antd'
import type { FormItemProps } from 'antd/lib'
import type { FormikErrors, FormikTouched } from 'formik/dist/types'

import { S3_BUCKET_URL } from 'shared/config'
import { PAGINATION_PAGE_SIZE } from 'shared/lib/filter'

type ObjectPaths<T> = {
  [K in keyof T]-?: T[K] extends object
    ? T[K] extends Array<any>
      ? `${string & K}` // Если массив, то не углубляемся
      : `${string & K}` | `${string & K}.${ObjectPaths<T[K]>}`
    : `${string & K}`
}[keyof T]

export const getApiOffset = (
  pagination: TablePaginationConfig,
  filter: { Offset: number },
): number => {
  if (pagination.current && pagination.pageSize) {
    const currentOffset = (pagination.current - 1) * pagination.pageSize
    return currentOffset !== filter.Offset ? currentOffset : 0
  }

  return 0
}

export const getApiPaginationObject = (
  filter: { Offset?: number; Limit?: number },
  total: number,
  rest?: TableProps['pagination'],
): TableProps['pagination'] => ({
  current: (filter?.Offset || 0) / (filter?.Limit || 10) + 1,
  pageSize: filter.Limit,
  total: total,
  showSizeChanger: false,
  pageSizeOptions: PAGINATION_PAGE_SIZE,
  ...rest,
})

export const getValidationStatus = <T extends Record<string, any>>(
  touched: FormikTouched<T>,
  errors: FormikErrors<T>,
  field: keyof T | ObjectPaths<T>,
  index?: number,
  indexField?: string,
): FormItemProps['validateStatus'] => {
  if (typeof field === 'string' && field.split('.').length > 0) {
    const fieldTouched = field
      .split('.')
      .reduce((acc, part) => acc && (acc[part] as FormikTouched<T>), touched)
    let fieldError = false
    if (!fieldTouched) {
      return undefined
    }
    fieldError = !!field
      .split('.')
      .reduce((acc, part) => acc && (acc[part] as FormikErrors<T>), errors)
    return fieldTouched && fieldError ? 'error' : undefined
  }

  if (typeof index === 'number' && indexField) {
    const touchedArray = touched[field] as FormikTouched<T>[]
    const errorsArray = errors[field] as FormikErrors<T>[]

    if (
      touchedArray &&
      touchedArray[index] &&
      errorsArray &&
      errorsArray[index]
    ) {
      // return  errorsArray[index][indexField] && 'error'
      return (
        indexField
          .split('.')
          .reduce(
            (acc, part) => acc && (acc[part] as FormikErrors<T>),
            errorsArray[index],
          ) && 'error'
      )
    }
  } else {
    if (touched[field] && errors[field]) {
      return 'error'
    }
  }
  return undefined
}

export const getErrorText = <T extends Record<string, any>>(
  touched: FormikTouched<T>,
  errors: FormikErrors<T>,
  field: keyof T | ObjectPaths<T>,
  index?: number,
  indexField?: string,
): React.ReactNode => {
  if (typeof field === 'string' && field.split('.').length > 0) {
    const fieldTouched = field
      .split('.')
      .reduce((acc, part) => acc && (acc[part] as FormikTouched<T>), touched)
    let fieldError = ''
    if (!fieldTouched) {
      return undefined
    }
    fieldError = field
      .split('.')
      .reduce(
        (acc, part) => acc && (acc[part] as FormikErrors<T>),
        errors,
      ) as string
    return fieldTouched && fieldError
  }

  if (typeof index === 'number' && indexField) {
    const touchedArray = touched[field] as FormikTouched<T>[]
    const errorsArray = errors[field] as FormikErrors<T>[]

    if (
      touchedArray &&
      touchedArray[index] &&
      errorsArray &&
      errorsArray[index]
    ) {
      return errorsArray[index][indexField] as React.ReactNode
    }
  } else {
    if (touched[field] && errors[field]) {
      return errors[field] as React.ReactNode
    }
  }
  return undefined
}

export const showSuccessAPIMessage = (content = 'Сохранено успешно') => {
  message.success({
    content,
    style: { marginTop: '86vh' },
  })
}

export const getFullName = (
  surname?: string,
  name?: string,
  patronymic?: string | null,
): string =>
  `${surname || ''} ${name || ''}${patronymic ? ` ${patronymic}` : ''}`.trim()

export const getS3ImageUrl = (id: string) => S3_BUCKET_URL + id
