import Header from '@/src/shared/components/header'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <Header />
    {children}
    </>
  )
}

export default layout