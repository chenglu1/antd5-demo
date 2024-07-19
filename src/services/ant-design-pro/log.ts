// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';


export async function log(
  body: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.TableResult>('/cw/querylog/list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

