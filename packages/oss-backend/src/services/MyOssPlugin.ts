import { MyDatabase } from './MyDatabase'
import { OssSdkPlugin } from '@fangcha/oss-service/src/sdk'
import { OssConfig } from '../OssConfig'

export const MyOssPlugin = OssSdkPlugin({
  database: MyDatabase.ossDB,
  defaultOssOptions: OssConfig.ossOptions.Default,
  optionsMapper: {
    'fc-web-oss': OssConfig.ossOptions.Default,
  },
  taskMapper: {
    // DataAppRecordsXlsExportTask: DataAppRecordsXlsExportTask,
  },
  downloadRootDir: OssConfig.ossDownloadDir,
})
