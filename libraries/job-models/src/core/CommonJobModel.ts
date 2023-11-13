import { CommonJobState } from './CommonJobState'

export interface CommonJobModel<T = any> {
  jobId: string
  app: string
  queue: string
  taskName: string
  objectId: string
  paramsStr: string
  taskState: CommonJobState
  pendingElapsed: number
  performElapsed: number
  errorMessage: string
  createTime: string
  updateTime: string

  params: T
}
