import { ResqueJob } from '@fangcha/resque'
import { DBProtocolV2, FCDatabase, Transaction } from 'fc-sql'
import * as moment from 'moment'
import { DBObserver, FeedBase, FilterOptions } from 'fc-feed'
import { CommonJobModel, CommonJobState } from '@fangcha/job-models'

const dbOptions = {
  table: 'common_job',
  primaryKey: ['job_id'],
  cols: [
    'job_id',
    'app',
    'queue',
    'task_name',
    'object_id',
    'params_str',
    'task_state',
    'pending_elapsed',
    'perform_elapsed',
    'error_message',
    'create_time',
    'update_time',
  ],
  insertableCols: [
    'job_id',
    'app',
    'queue',
    'task_name',
    'object_id',
    'params_str',
    'task_state',
    'pending_elapsed',
    'perform_elapsed',
    'error_message',
  ],
  modifiableCols: ['object_id', 'task_state', 'pending_elapsed', 'perform_elapsed', 'error_message'],
}

class __CommonJob extends FeedBase {
  /**
   * @description [varchar(63)] 任务 ID，具备唯一性
   */
  public jobId!: string
  /**
   * @description [varchar(127)] 应用
   */
  public app!: string
  /**
   * @description [varchar(127)] 所处队列
   */
  public queue!: string
  /**
   * @description [varchar(127)] 任务名
   */
  public taskName!: string
  /**
   * @description [varchar(63)] 对象主键 ID
   */
  public objectId!: string
  /**
   * @description [text] 相关参数
   */
  public paramsStr!: string
  /**
   * @description [varchar(127)] 任务状态
   */
  public taskState!: string
  /**
   * @description [bigint] 任务等待耗时，单位：毫秒
   */
  public pendingElapsed!: number
  /**
   * @description [bigint] 任务执行耗时，单位：毫秒
   */
  public performElapsed!: number
  /**
   * @description [text] 错误信息
   */
  public errorMessage!: string
  /**
   * @description [timestamp] 创建时间: ISO8601 字符串
   */
  public createTime!: string
  /**
   * @description [timestamp] 更新时间: ISO8601 字符串
   */
  public updateTime!: string

  protected static _staticDBOptions: DBProtocolV2
  protected static _staticDBObserver?: DBObserver

  public static setDatabase(database: FCDatabase, dbObserver?: DBObserver) {
    this.addStaticOptions({ database: database }, dbObserver)
  }

  public static setStaticProtocol(protocol: Partial<DBProtocolV2>, dbObserver?: DBObserver) {
    this._staticDBOptions = Object.assign({}, dbOptions, protocol) as DBProtocolV2
    this._staticDBObserver = dbObserver
    this._onStaticDBOptionsUpdate(this._staticDBOptions)
  }

  public static addStaticOptions(protocol: Partial<DBProtocolV2>, dbObserver?: DBObserver) {
    this._staticDBOptions = Object.assign({}, dbOptions, this._staticDBOptions, protocol) as DBProtocolV2
    this._staticDBObserver = dbObserver
    this._onStaticDBOptionsUpdate(this._staticDBOptions)
  }

  public static _onStaticDBOptionsUpdate(_protocol: DBProtocolV2) {}

  public constructor() {
    super()
    this.setDBProtocolV2(this.constructor['_staticDBOptions'])
    if (this.constructor['_staticDBObserver']) {
      this.dbObserver = this.constructor['_staticDBObserver']
    }
  }

  public fc_defaultInit() {
    // This function is invoked by constructor of FCModel
    this.app = ''
    this.queue = ''
    this.taskName = ''
    this.objectId = ''
    this.paramsStr = ''
    this.taskState = ''
    this.pendingElapsed = 0
    this.performElapsed = 0
    this.errorMessage = ''
  }

  public fc_propertyMapper() {
    return {
      jobId: 'job_id',
      app: 'app',
      queue: 'queue',
      taskName: 'task_name',
      objectId: 'object_id',
      paramsStr: 'params_str',
      taskState: 'task_state',
      pendingElapsed: 'pending_elapsed',
      performElapsed: 'perform_elapsed',
      errorMessage: 'error_message',
      createTime: 'create_time',
      updateTime: 'update_time',
    }
  }
}

export class _CommonJob extends __CommonJob {
  public static AppName = 'App'

  public constructor() {
    super()
  }

  /**
   * @param resqueJob
   * @param objectId [用于后期检索]
   */
  public static async saveResqueJobAndEnqueue<T extends _CommonJob>(
    this: { new (): T },
    resqueJob: ResqueJob,
    objectId?: string
  ) {
    const clazz = this as any as typeof _CommonJob
    const job = new this()
    job.jobId = resqueJob.getJobID()
    job.app = clazz.AppName
    job.queue = resqueJob.queue
    job.taskName = resqueJob.getClassName()
    job.taskState = CommonJobState.Pending
    job.paramsStr = JSON.stringify(resqueJob.getArguments())
    if (objectId) {
      job.objectId = objectId
    }
    await job.addToDB()
    await resqueJob.addToQueue()
    return job
  }

  private static async findJob<T extends _CommonJob>(this: { new (): T }, resqueJob: ResqueJob) {
    const clazz = this as any as typeof _CommonJob
    return (await clazz.findWithUid(resqueJob.getJobID())) as T
  }

  public static async onResqueJobFound(resqueJob: ResqueJob) {
    const job = await this.findJob(resqueJob)
    if (job) {
      job.fc_edit()
      job.taskState = CommonJobState.Running
      job.pendingElapsed = Date.now() - resqueJob.getEnqueueTime()
      await job.updateToDB()
    }
  }

  public static async onResqueJobDone(resqueJob: ResqueJob) {
    const job = await this.findJob(resqueJob)
    if (job) {
      job.fc_edit()
      job.taskState = CommonJobState.Done
      job.performElapsed = Date.now() - resqueJob.getEnqueueTime() - job.pendingElapsed
      await job.updateToDB()
    }
  }

  public static async onResqueJobFailed(resqueJob: ResqueJob, error: Error) {
    const job = await this.findJob(resqueJob)
    if (job) {
      job.fc_edit()
      job.taskState = CommonJobState.Fail
      job.performElapsed = Date.now() - resqueJob.getEnqueueTime() - job.pendingElapsed
      job.errorMessage = error.message
      await job.updateToDB()
    }
  }

  public onJobPerform(_: ResqueJob) {}

  public async onMarkTimeout(transaction?: Transaction) {
    this.fc_edit()
    this.taskState = CommonJobState.Fail
    if (!this.pendingElapsed) {
      this.pendingElapsed = Date.now() - moment(this.createTime).valueOf()
    } else if (!this.performElapsed) {
      this.performElapsed = Date.now() - moment(this.updateTime).valueOf()
    }
    this.errorMessage = 'Timeout'
    await this.updateToDB(transaction)
  }

  public async markObjectId(objectId: string) {
    this.fc_edit()
    this.objectId = objectId
    await this.updateToDB()
  }

  public fc_searcher(params: FilterOptions = {}) {
    const searcher = super.fc_searcher(params)
    searcher.processor().addOrderRule('_rid', 'DESC')
    return searcher
  }

  public params(): any {
    const defaultData = {}
    try {
      return JSON.parse(this.paramsStr) || defaultData
    } catch (e) {}
    return defaultData
  }

  public toJSON() {
    return this.modelForClient()
  }

  public modelForClient() {
    const data = this.fc_pureModel() as CommonJobModel
    data.params = this.params()
    return data
  }
}
