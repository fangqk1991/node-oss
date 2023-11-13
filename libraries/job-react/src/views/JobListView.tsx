import React, { useReducer } from 'react'
import { MyRequest } from '@fangcha/auth-react'
import { Divider } from 'antd'
import { ColumnFilterType, JsonPre, TableView, TableViewColumn, useQueryParams } from '@fangcha/react'
import { PageResult } from '@fangcha/tools'
import * as moment from 'moment'
import { CommonJobApis, CommonJobModel, CommonJobStateDescriptor } from '@fangcha/job-models'

const formatTime = (timeStr: string, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(timeStr).format(formatStr)
}

export const JobListView: React.FC = () => {
  const [_, reloadData] = useReducer((x) => x + 1, 0)
  const { queryParams, updateQueryParams } = useQueryParams<
    CommonJobModel & {
      'taskState.$inStr': string
    }
  >()

  return (
    <div>
      <h2>任务列表</h2>
      <Divider />
      <TableView
        rowKey={(item: CommonJobModel) => {
          return item.jobId
        }}
        columns={TableViewColumn.makeColumns<CommonJobModel>([
          {
            title: 'App · Queue / ID',
            render: (item) => (
              <>
                {item.app} · {item.queue}
                <br />
                {item.jobId}
              </>
            ),
          },
          {
            title: '任务名称',
            render: (item) => item.taskName,
          },
          {
            title: '任务参数',
            render: (item) => <JsonPre value={item.params}></JsonPre>,
          },
          {
            title: '状态',
            filterType: ColumnFilterType.StrMultiSelector,
            options: CommonJobStateDescriptor.options(),
            value: queryParams['taskState.$inStr'] || '',
            onValueChanged: (newVal) => {
              updateQueryParams({
                'taskState.$inStr': newVal,
              })
            },
            render: (item) => item.taskState,
          },
          {
            title: '等待时间',
            render: (item) => (
              <span>
                <b>{item.pendingElapsed}</b>ms
              </span>
            ),
          },
          {
            title: '执行耗时',
            render: (item) => (
              <span>
                <b>{item.performElapsed}</b>ms
              </span>
            ),
          },
          // errorMessage: string
          {
            title: '创建时间 / 更新时间',
            render: (item) => (
              <>
                {formatTime(item.createTime)}
                <br />
                {formatTime(item.updateTime)}
              </>
            ),
          },
        ])}
        defaultSettings={{
          pageSize: 10,
          sortKey: 'createdAt',
          sortDirection: 'descending',
        }}
        loadData={async (retainParams) => {
          const request = MyRequest(CommonJobApis.JobPageDataGet)
          request.setQueryParams({
            ...retainParams,
            ...queryParams,
            'taskState.$inStr': queryParams['taskState.$inStr'] || undefined,
          })
          return request.quickSend<PageResult<CommonJobModel>>()
        }}
      />
    </div>
  )
}
