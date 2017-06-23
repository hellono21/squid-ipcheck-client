/**
 * Created by ccc on 6/20/17.
 */


import { request, config } from '../utils';

const { api } = config;
const { users, token, invitations } = api;

export async function fetchUser(params) {
  return request({
    url: `${users}/${params.email}`,
  });
}

export async function login(params) {
  return request({
    auth: {
      username: 'local',
      password: 'local-ipcheck',
    },
    url: `${token}`,
    method: 'post',
    data: params,
  });
}

export async function invite(params) {
  console.log(invitations);
  return request({
    url: `${invitations}`,
    method: 'post',
    data: params,
  });
}
