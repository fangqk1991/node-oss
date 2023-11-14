import React, { useReducer } from 'react'
import { Divider } from 'antd'
import { TableView, TableViewColumn } from '@fangcha/react'
import { DownloadApis, ResourceTaskModel } from '@fangcha/oss-models'
import { FT, PageResult } from '@fangcha/tools'
import { MyRequest } from '@fangcha/auth-react'

export const ResourceTaskListView: React.FC = () => {
  const [_, reloadData] = useReducer((x) => x + 1, 0)

  return (
    <div>
      <h2>文件列表</h2>
      <Divider />
      <TableView
        rowKey={(item: ResourceTaskModel) => {
          return item.taskKey
        }}
        columns={TableViewColumn.makeColumns<ResourceTaskModel>([
          {
            title: '导出时间',
            render: (item) => FT(item.createTime),
          },
        ])}
        defaultSettings={{
          pageSize: 10,
          sortKey: 'createTime',
          sortDirection: 'descending',
        }}
        loadData={async (retainParams) => {
          const request = MyRequest(DownloadApis.ResourceTaskPageDataGet)
          request.setQueryParams(retainParams)
          return request.quickSend<PageResult<ResourceTaskModel>>()
        }}
      />
    </div>
  )
}
