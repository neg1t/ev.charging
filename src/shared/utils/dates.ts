import dayjs, { type Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { DATE_FORMAT_UI, TIMEZONES } from 'shared/lib/dates'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (
  date: string | Dayjs,
  format = DATE_FORMAT_UI,
): string => dayjs(date).format(format)

export const formatDateWithTimezone = (
  date: string | Dayjs,
  format: string = DATE_FORMAT_UI,
  tz: TIMEZONES = TIMEZONES.MOSCOW,
): string => {
  return dayjs.utc(date).tz(tz).format(format)
}

export const dateFromUtcToLocal = (date: string | Dayjs): Dayjs =>
  dayjs(date).utc().local()

/**
 * Преобразует год, месяц, день в отображаемую строку формата ДД.ММ.ГГГГ
 * @param year - год (обязательный)
 * @param month - месяц (1-12, опциональный)
 * @param day - день (1-31, опциональный)
 * @returns строка в формате ДД.ММ.YYYY или ГГГГ если компоненты отсутствуют
 */
export const formatDateParts = (
  year: number,
  month?: number | null,
  day?: number | null,
): string => {
  if (!year) return ''

  let date = dayjs().year(year)

  if (month !== null && month !== undefined) {
    date = date.month(month - 1)
  }

  if (day !== null && day !== undefined) {
    date = date.date(day)
  }

  if (!date.isValid()) return String(year)

  return date.format('DD.MM.YYYY')
}
