import type { PropsWithChildren } from 'react'

import { Typography } from 'antd'
import clsx from 'clsx'

type OptionalFormLabelProps = PropsWithChildren<{
  optional?: boolean
  className?: string
}>

export const OptionalFormLabel = ({
  children,
  optional = true,
  className,
}: OptionalFormLabelProps) => {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <Typography.Text>{children}</Typography.Text>
      {optional && (
        <Typography.Text type='secondary'>(необязательно)</Typography.Text>
      )}
    </div>
  )
}
