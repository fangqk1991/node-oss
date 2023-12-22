import { Route } from '@ant-design/pro-layout/es/typing'
import { TaskPages } from '@web/oss-common/admin-api'

export const MyMenu: Route = {
  path: '/',
  children: [
    {
      name: '文件管理',
      children: [
        {
          path: TaskPages.UploadTestRoute,
          name: '上传测试',
        },
        {
          path: TaskPages.ResourceTaskListRoute,
          name: '文件列表',
        },
      ],
    },
  ],
}
