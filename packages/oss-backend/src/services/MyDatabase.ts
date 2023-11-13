import { FCDatabase } from 'fc-sql'
import { DBOptionsBuilder } from '@fangcha/tools/lib/database'
import { OssConfig } from '../OssConfig'

FCDatabase.instanceWithName('jobDB').init(new DBOptionsBuilder(OssConfig.jobDB).build() as any)

export const MyDatabase = {
  jobDB: FCDatabase.instanceWithName('jobDB'),
}
