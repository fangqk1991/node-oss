import assert from '@fangcha/assert'
import { SpecFactory } from '@fangcha/router'
import { Context } from 'koa'
import { _OSSResource, OSSService } from '../main'
import { OssApis } from '@fangcha/oss-models'
import { FangchaSession } from '@fangcha/session'

const prepareResource = async (ctx: Context) => {
  const resourceId = ctx.params.resourceId
  assert.ok(!!resourceId, 'Params Error: resourceId invalid.')

  const ossResource = (await _OSSResource.findWithUid(resourceId))!
  assert.ok(!!ossResource, `OSSResource not found`)
  return ossResource
}

const factory = new SpecFactory('上传文件')

factory.prepare(OssApis.OssResourcePrepare, async (ctx) => {
  const session = ctx.session as FangchaSession
  ctx.body = await OSSService.makeOssResourceMetadata(ctx.request.body, session.curUserStr())
})

factory.prepare(OssApis.OssResourceStatusMark, async (ctx) => {
  const resource = await prepareResource(ctx)
  const handler = OSSService.getResourceHandler(resource)
  await handler.markSucc()
  ctx.body = handler.modelForClient()
})

export const OssSpecs = factory.buildSpecs()
