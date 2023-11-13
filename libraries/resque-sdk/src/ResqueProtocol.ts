import { IResqueObserver, RedisConfig } from '@fangcha/resque'
import { JobServer } from '@fangcha/job'

export interface ResqueProtocol {
  redisConfig: RedisConfig
  queues: string[]
  moduleMapData: {
    [p: string]: any
  }
  observer?: IResqueObserver
  jobServer?: JobServer
  muteTaskNames?: string[]
}
