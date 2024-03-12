import assert from '@fangcha/assert'
import { SpecFactory } from '@fangcha/router'
import { Context } from 'koa'
import { _OSSResource, OSSService } from '../main'
import { OssApis } from '@fangcha/oss-models'
import { RemoteFile } from '@fangcha/ali-oss'
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
  const { fileHash, fileExt, fileSize, mimeType, bucketName, ossZone } = ctx.request.body
  // assert.ok(OssZoneDescriptor.checkValueValid(ossZone), `ossZone invalid`)
  // assert.ok(OssBucketDescriptor.checkValueValid(bucketName), `bucketName invalid`)

  assert.ok(!!fileHash && fileHash.length === 32, 'Params Error: fileHash invalid')
  const remoteFile = RemoteFile.fileWithHash(ossZone || OSSService.defaultOssZone(), fileHash, fileExt)
  const remotePath = remoteFile.remotePath()

  const session = ctx.session as FangchaSession

  const params = OSSService.makePureParams({
    bucketName: bucketName || OSSService.defaultBucketName(),
    ossKey: remotePath,
    uploader: session.curUserStr(),
    size: fileSize,
    mimeType: mimeType,
  })
  const resource = await _OSSResource.generateOSSResource(params)
  ctx.body = OSSService.getResourceHandler(resource).getResourceUploadMetadata()
})

factory.prepare(OssApis.OssResourceStatusMark, async (ctx) => {
  const resource = await prepareResource(ctx)
  const handler = OSSService.getResourceHandler(resource)
  await handler.markSucc()
  ctx.body = handler.modelForClient()
})

export const OssSpecs = factory.buildSpecs()
