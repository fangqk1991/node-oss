import { FCDatabase } from 'fc-sql'
import { DBOptionsBuilder } from '@fangcha/tools/lib/database'
import { JobConfig } from '../JobConfig'

FCDatabase.instanceWithName('jobDB').init(new DBOptionsBuilder(JobConfig.jobDB).build() as any)

export const MyDatabase = {
  jobDB: FCDatabase.instanceWithName('jobDB'),
}
