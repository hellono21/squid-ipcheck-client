/**
 * Created by ccc on 5/16/17.
 */

// import request from '../utils/request';
import {request, config } from '../utils';

const { api } = config;
const { clientInfo, whiteips, invitations, users } = api;

const storageTokenKey = config.storageKey.token;

export async function getClientInfo() {
  return request({
    url: clientInfo,
    method: 'get',
  });
}

export async function fetchProfile() {
  const token = global.localStorage.getItem(storageTokenKey);
  const requestConfig = {
    url: `${users}/me`,
    method: 'get',
  };
  if (token) {
    requestConfig.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request(requestConfig);
}

export async function commitClientIP(params) {
  return request({
    url: whiteips,
    method: 'post',
    data: params,
  });
}

export async function queryInvitation(params) {
  return request({
    url: `${invitations}/${params.token}`,
    method: 'get',
  });
}

export async function register(params) {
  return request({
    url: users,
    method: 'post',
    data: params,
  });
}


