import { Route } from '@ant-design/pro-layout/es/typing'
import { TaskPages } from '@web/job-common/admin-api'

export const MyMenu: Route = {
  path: '/',
  children: [
    {
      name: '任务管理',
      children: [
        {
          path: TaskPages.JobListRoute,
          name: '任务列表',
        },
      ],
    },
  ],
}
