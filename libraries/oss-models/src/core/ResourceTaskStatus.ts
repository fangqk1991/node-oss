import { Descriptor } from '@fangcha/tools'

export enum ResourceTaskStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Success = 'Success',
  Fail = 'Fail',
}

const values = [
  ResourceTaskStatus.Pending,
  ResourceTaskStatus.Processing,
  ResourceTaskStatus.Success,
  ResourceTaskStatus.Fail,
]

const describe = (code: ResourceTaskStatus) => {
  return code
}

export const ResourceTaskStatusDescriptor = new Descriptor(values, describe)
