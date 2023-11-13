import { FangchaApp } from '@fangcha/backend-kit'
import { ScheduleSdkPlugin } from '@fangcha/backend-kit/lib/schedule'
import { GlobalAppConfig } from 'fc-config'
import { JobConfig } from '../JobConfig'
import { JobResque } from '../services/JobResque'

const app = new FangchaApp({
  env: GlobalAppConfig.Env,
  tags: GlobalAppConfig.Tags,
  appName: 'job-schedule',
  wecomBotKey: JobConfig.wecomBotKey,

  plugins: [
    ScheduleSdkPlugin([
      {
        name: 'Some Task',
        // 每 10 分钟一次
        cronRule: '*/10 * * * *',
        handler: async () => {
          await JobResque.enqueue_SomeTask()
        },
      },
    ]),
  ],
})
app.launch()
