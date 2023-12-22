import React from 'react'
import { ErrorBoundary } from '@ant-design/pro-components'
import { RouterProvider } from 'react-router-dom'
import { MyRouter } from './MyRouter'
import { useSessionConfig, VisitorProvider } from '@fangcha/auth-react'
import { OssSDK } from '@fangcha/oss-react'

export const App: React.FC = () => {
  const config = useSessionConfig() as any
  OssSDK.init(config.ossParams)

  return (
    <ErrorBoundary>
      <VisitorProvider>
        <RouterProvider router={MyRouter}></RouterProvider>
      </VisitorProvider>
    </ErrorBoundary>
  )
}
