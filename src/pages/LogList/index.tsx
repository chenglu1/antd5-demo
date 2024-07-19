
import { log } from '@/services/ant-design-pro/log';
import type { ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import React from 'react';


const TableList: React.FC = () => {

  const columns: ProColumns<API.TableListItem>[] = [
    {
      title: '用户ID',
      dataIndex: 'uid',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '访问页面',
      dataIndex: 'visitTypeView',

    },
    {
      title: '访问时间',
      dataIndex: 'visitTimeStr',

    },
    {
      title: '操作日志',
      dataIndex: 'queryMap',
      width: '40%',
      render: (text, record): any => {
        const { queryMap = [] } = record;
        return (<div>
          <div>
            <span>{`用户[${record.userName}]在[${record.visitTimeStr}] IP: `}</span>
            <strong style={{ textDecoration: 'underline' }}>{`[${record.ip}]`}</strong>
            <strong>{`数据节点：${record.visitTypeTitle}`}</strong>
          </div>
          <div>{record.logOprType === 1 ? '查询参数' : '导出参数'}:</div>
          <div>
            {queryMap.map((it) => (
              <div>
                {it.key}: {it.value}
              </div>
            ))}
          </div>
        </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.TableListItem, API.PageParams>
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  page ，这两个参数是 antd 的规范
          params: {
            pageSize: number;
            current: number;
          },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await log({
            page: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: msg?.data?.records || [],
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // // 不传会使用 data 的长度，如果是分页一定要传
            total: msg?.data?.total,
          };
        }}
        columns={columns}
      />

    </PageContainer>
  );
};

export default TableList;
