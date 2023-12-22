import React from 'react'
import { Button, message } from 'antd'
import { OssUploadDialog } from '@fangcha/oss-react'

export const UploadTestView: React.FC = () => {
  return (
    <div>
      <Button
        onClick={() => {
          OssUploadDialog.uploadFile(async (resource) => {
            message.success(JSON.stringify(resource))
          })
        }}
      >
        上传文件
      </Button>
    </div>
  )
}
