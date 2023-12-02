import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({children} : PropsWithChildren) => {
    if(!children) return;

  return (
    <Text color='red' as="p" className='text-sm'>{children}</Text>
  )
}

export default ErrorMessage