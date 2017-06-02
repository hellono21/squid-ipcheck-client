/**
 * Created by ccc on 5/16/17.
 */

import { parse } from 'qs';
import { message } from 'antd';
import { getClientInfo, commitClientIP } from '../services/app';

export default {
  namespace: 'app',
  state: {
    client: {},
    commitButtonLoading: false,
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryClient' })
    },
  },
  effects: {
    *queryClient({ payload }, { call, put }) {
      const { data } = yield call(getClientInfo);
      yield put({
        type: 'queryClientSuccess',
        payload: data,
      });
    },
    *commitIP({ payload }, { call, put }){
      yield put({ type: 'showCommitIPLoading' });
      const data = yield call(commitClientIP, parse(payload));
      yield put({ type: 'hideCommitIPLoading' });
      message.success('提交成功');
    },
  },
  reducers:{
    queryClientSuccess(state, { payload: client }) {
      return {
        state,
        client,
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
