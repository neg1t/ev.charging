import { type FC } from 'react'

import { Spin } from 'antd'
import { type SpinProps } from 'antd/lib'

export const Loader: FC<SpinProps> = (props) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spin {...props} />
    </div>
  )
}
