import { type FC } from 'react'

import { Spin } from 'antd'
import { clsx } from 'clsx'

interface PageContentProps {
  children: React.ReactNode
  loading?: boolean
  blockOnLoading?: boolean
}

export const PageContent: FC<PageContentProps> = (props) => {
  const { children, loading, blockOnLoading } = props

  return (
    <div className='relative bg-white p-4 rounded-2xl'>
      {loading && (
        <Spin
          size='large'
          className='absolute! top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'
        />
      )}
      <div
        className={clsx(
          loading && 'opacity-50',
          'transition-opacity duration-500',
          loading && blockOnLoading && 'pointer-events-none select-none',
        )}
      >
        {children}
      </div>
    </div>
  )
}
