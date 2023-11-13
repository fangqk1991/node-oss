import { Route } from '@ant-design/pro-layout/es/typing'
import { TaskPages } from '@web/oss-common/admin-api'

export const MyMenu: Route = {
  path: '/',
  children: [
    {
      name: '文件管理',
      children: [
        {
          path: TaskPages.JobListRoute,
          name: '文件列表',
        },
      ],
    },
  ],
}
