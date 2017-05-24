/**
 * Created by ccc on 5/16/17.
 */

import request from '../utils/request';

const baseUrl = ''

export async function getClientInfo() {
  return request(`${baseUrl}/api/ip`);
}

export async function commitClientIP(params) {
  return request(`${baseUrl}/api/ip`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}
