import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import { MainLayout } from '../core/MainLayout'
import { RouteErrorBoundary } from '@fangcha/react'
import { HomeView } from '../core/HomeView'
import { MyMenu } from './MyMenu'
import { OssSdkRoutes } from '@fangcha/oss-react'
import { UploadTestView } from '../views/UploadTestView'
import { TaskPages } from '@web/oss-common/admin-api'

export const MyRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout menu={MyMenu} />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/',
        element: <HomeView />,
      },
      {
        path: TaskPages.UploadTestRoute,
        element: <UploadTestView />,
      },
      ...OssSdkRoutes,
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
])
