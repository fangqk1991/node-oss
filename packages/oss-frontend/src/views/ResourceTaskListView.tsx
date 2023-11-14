import React, { useReducer } from 'react'
import { Divider } from 'antd'

export const ResourceTaskListView: React.FC = () => {
  const [_, reloadData] = useReducer((x) => x + 1, 0)

  return (
    <div>
      <h2>文件列表</h2>
      <Divider />
    </div>
  )
}
