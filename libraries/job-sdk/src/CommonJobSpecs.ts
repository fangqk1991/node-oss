import { SpecFactory } from '@fangcha/router'
import { CommonJobApis } from '@fangcha/job-models'
import { JobServer } from '@fangcha/job'

const factory = new SpecFactory('Common Job')

factory.prepare(CommonJobApis.JobPageDataGet, async (ctx) => {
  const jobServer = ctx.jobServer as JobServer
  const CommonJob = jobServer.CommonJob
  ctx.body = await CommonJob.getPageResult(ctx.request.query)
})

export const CommonJobSpecs = factory.buildSpecs()
