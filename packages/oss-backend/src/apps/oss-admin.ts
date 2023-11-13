import { OssConfig } from '../OssConfig'
import { GlobalAppConfig } from 'fc-config'
import { WebApp } from '@fangcha/backend-kit/lib/router'
import { SsoSdkPlugin } from '@fangcha/web-auth-sdk'
import { UserSdkPlugin } from '@fangcha/user-sdk'
import { MyDatabase } from '../services/MyDatabase'

const app = new WebApp({
  env: GlobalAppConfig.Env,
  tags: GlobalAppConfig.Tags,
  appName: 'oss-admin',
  wecomBotKey: OssConfig.wecomBotKey,
  frontendConfig: OssConfig.adminFrontendConfig,
  routerOptions: {
    baseURL: OssConfig.adminBaseURL,
    backendPort: OssConfig.adminPort,
    jwtProtocol: {
      jwtKey: 'task_token_jwt',
      jwtSecret: OssConfig.adminJwtSecret,
    },
  },
  plugins: [
    SsoSdkPlugin({
      ssoAuth: OssConfig.adminSSO,
      jwtOptions: {
        jwtKey: 'task_token_jwt',
        jwtSecret: OssConfig.adminJwtSecret,
      },
    }),
    UserSdkPlugin(OssConfig.userService),
  ],

  checkHealth: async () => {
    await MyDatabase.ossDB.ping()
  },
})
app.launch()
