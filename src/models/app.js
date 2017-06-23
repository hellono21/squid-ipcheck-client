/**
 * Created by ccc on 5/16/17.
 */

import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getClientInfo, commitClientIP, queryInvitation, register, fetchProfile } from '../services/app';
import { config, delay } from '../utils';

const storageTokenKey = config.storageKey.token;

export default {
  namespace: 'app',
  state: {
    client: {},
    invitation: {},
    account: {},
    commitButtonLoading: false,
  },
  subscriptions: {
    setup({ dispatch, history}) {
      dispatch({ type: 'queryClient' });
      dispatch({ type: 'queryProfile' });
      history.listen((location) => {
        if (location.pathname === '/register') {
          dispatch({
            type: 'queryInvitation',
            payload: location.query,
          });
        }
      });
    },
  },
  effects: {
    *queryProfile({ payload }, { call, put }) {
      const { data } = yield call(fetchProfile);
      yield put({
        type: 'queryProfileSuccess',
        payload: data,
      });
    },
    *queryClient({ payload }, { call, put }) {
      const { data } = yield call(getClientInfo);
      yield put({
        type: 'queryClientSuccess',
        payload: data,
      });
    },
    *logout({ payload }, { call, put }) {
      yield put({
        type: 'queryProfileSuccess',
        payload: {},
      });
      global.localStorage.removeItem(storageTokenKey);
    },
    *queryInvitation({ payload }, { call, put }) {
      try {
        const { token } = payload;
        const { data } = yield call(queryInvitation, { token });

        yield put({
          type: 'queryInvitationSuccess',
          payload: { ...data, token },
        });
      } catch (err) {
        message.error('认证失败');
        yield put(routerRedux.replace('/auth'));
      }
    },
    *register({ payload }, { call, put }) {
      try {
        const { name, email, password, confirm_password, token } = payload;
        const { data } = yield call(register, { name, email, password, confirm_password, token });
        message.success('注册成功');
      } catch (err) {
        message.error('注册失败');
      }
      yield put(routerRedux.replace('/auth'));
    },
    *commitIP({ payload }, { call, put }) {
      yield put({ type: 'showCommitIPLoading' });
      const data = yield call(commitClientIP, parse(payload));
      yield put({ type: 'hideCommitIPLoading' });
      message.success('提交成功');
    },
  },
  reducers:{
    queryProfileSuccess(state, { payload: account }) {
      return {
        ...state,
        account,
      };
    },
    queryClientSuccess(state, { payload: client }) {
      return {
        ...state,
        client,
      };
    },
    queryInvitationSuccess(state, { payload: invitation }) {
      return {
        ...state,
        invitation,
      };
    },
    showCommitIPLoading(state) {
      return {
        ...state,
        commitButtonLoading: true,
      };
    },
    hideCommitIPLoading(state) {
      return {
        ...state,
        commitButtonLoading: false,
      };
    },
  },
};
