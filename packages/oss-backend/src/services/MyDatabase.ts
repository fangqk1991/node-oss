import { FCDatabase } from 'fc-sql'
import { DBOptionsBuilder } from '@fangcha/tools/lib/database'
import { OssConfig } from '../OssConfig'

FCDatabase.instanceWithName('ossDB').init(new DBOptionsBuilder(OssConfig.ossDB).build() as any)

export const MyDatabase = {
  ossDB: FCDatabase.instanceWithName('ossDB'),
}
