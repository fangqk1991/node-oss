import { SpecFactory } from '@fangcha/router'
import { OSSService } from '../main'
import { OssApis } from '@fangcha/oss-models'
import { FangchaSession } from '@fangcha/session'

const factory = new SpecFactory('上传文件')

factory.prepare(OssApis.OssResourcePrepare, async (ctx) => {
  const session = ctx.session as FangchaSession
  ctx.body = await OSSService.makeOssResourceMetadata(ctx.request.body, session.curUserStr())
})

factory.prepare(OssApis.OssResourceStatusMark, async (ctx) => {
  ctx.body = await OSSService.markResourceSucc(ctx.params.resourceId)
})

export const OssSpecs = factory.buildSpecs()
