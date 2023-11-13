import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import { MainLayout } from '../core/MainLayout'
import { RouteErrorBoundary } from '@fangcha/react'
import { HomeView } from '../core/HomeView'
import { MyMenu } from './MyMenu'
import { TaskPages } from '@web/job-common/admin-api'
import { JobListView } from '../views/JobListView'

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
        path: TaskPages.JobListRoute,
        element: <JobListView />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
])
