import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import { MainLayout } from '../core/MainLayout'
import { RouteErrorBoundary } from '@fangcha/react'
import { HomeView } from '../core/HomeView'
import { MyMenu } from './MyMenu'
import { OssSdkRoutes } from '@fangcha/oss-react'

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
      ...OssSdkRoutes,
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
])
