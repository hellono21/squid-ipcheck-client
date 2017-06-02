/**
 * Created by ccc on 5/16/17.
 */

// import request from '../utils/request';
import {request, config} from '../utils';

const { api } = config;
const { clientInfo } = api;

export async function getClientInfo() {
  return request({
    url: clientInfo,
    method: 'get',
  });
}

export async function commitClientIP(params) {
  return request({
    url: clientInfo,
    method: 'post',
    data: params,
  });
}
