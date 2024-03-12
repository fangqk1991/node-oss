import { OssApis, OSSResourceModel, OssTypicalParams, ResourceMetadata } from '@fangcha/oss-models'
import { CommonAPI } from '@fangcha/app-request'
import { MyRequest } from '@fangcha/auth-react'

interface Params {
  defaultBucketName: string
  defaultOssZone: string
}

class _OssSDK {
  apis = {
    OssResourcePrepare: OssApis.OssResourcePrepare,
    OssResourceStatusMark: OssApis.OssResourceStatusMark,
  }

  options: Params = {
    defaultBucketName: '',
    defaultOssZone: '',
  }

  public init(options: Params) {
    this.options = options || {}
    return this
  }

  public async getOssResourceMetadata(params: OssTypicalParams): Promise<ResourceMetadata> {
    const request = MyRequest(new CommonAPI(this.apis.OssResourcePrepare))
    request.setBodyData(params)
    return request.quickSend()
  }

  public async markOssResourceSuccess(resourceId: string): Promise<OSSResourceModel> {
    const request = MyRequest(new CommonAPI(this.apis.OssResourceStatusMark, resourceId))
    return await request.quickSend()
  }
}

export const OssSDK = new _OssSDK()
