import { MetadataBuildProtocol } from '@fangcha/oss-models/lib'
import { OssHTTP } from './core/OssHTTP'

interface Params {
  defaultBucketName: string
  defaultOssZone: string
}

class _OssSDK {
  buildMetadata: MetadataBuildProtocol = OssHTTP.getOssResourceMetadata

  options: Params = {
    defaultBucketName: '',
    defaultOssZone: '',
  }

  public init(options: Params) {
    this.options = options || {}
    return this
  }
}

export const OssSDK = new _OssSDK()
