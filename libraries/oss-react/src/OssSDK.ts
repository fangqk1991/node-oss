interface Params {
  defaultBucketName: string
  defaultOssZone: string
}

class _OssSDK {
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
