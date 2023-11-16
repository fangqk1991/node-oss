import { RouteObject } from 'react-router'
import { OssPages } from '@fangcha/oss-models'
import { ResourceTaskListView } from './ResourceTaskListView'

export const OssSdkRoutes: RouteObject[] = [
  {
    path: OssPages.ResourceTaskListRoute,
    element: <ResourceTaskListView />,
  },
]
