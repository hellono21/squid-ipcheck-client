/**
 * Created by ccc on 6/6/17.
 */

import { routerRedux } from 'dva/router';
import { fetchUser, login, invite } from '../services/auth';
import { config, delay } from '../utils';

const storageTokenKey = config.storageKey.token;

export default {

  namespace: 'auth',

  state: {
    email: '',
    invitation: {
      waiting: false,
      countDown: 60,
    },
    account: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'checkEmail' });
      /*
      history.listen((location) => {
        if (location.pathname === '/invitations') {
          dispatch({ type: 'checkEmail' });
        }
      });
      */
    },
  },

  effects: {
    *queryUser({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const { email } = payload;
        yield put({
          type: 'queryUserExists',
          payload: { email },
        });
        const { data } = yield call(fetchUser, { email });
        if (data) {
          yield put(routerRedux.push('/auth/login'));
        }
      } catch (err) {
        yield put(routerRedux.push('/auth/invitation'));
      }
    },
    *login({ payload }, { call, put }){
      const { email, password } = payload;

      const { data } = yield call(login, { username: email, password, grant_type: 'password' });
      const { access_token } = data;
      global.localStorage.setItem(storageTokenKey, access_token.token);
      yield put({ type: 'app/queryProfile' });
      yield put(routerRedux.replace('/'));
    },
    *invite({ payload }, { call, put }){
      const { email } = payload;

      const { data } = yield call(invite, { email });
      yield put({ type: 'countDown' });
    },
    *countDown({ payload }, { call, put }){
      for (let i = 0; i < 60; i++) {
        yield put({
          type: 'inviteSuccess',
          payload: {
            waiting: true,
            countDown: 60 - i,
          },
        });

        yield call(delay, 1000);
      }
      yield put({
        type: 'inviteSuccess',
        payload: {
          waiting: false,
          countDown: 60,
        },
      });
    },
    *checkEmail({ payload }, { put, select }) {
      const { email } = yield select((state) => (state.auth));
      if (email === '') {
        yield put(routerRedux.replace('/auth'));
      }
    },
  },

  reducers: {
    queryUserExists(state, action) {
      return { ...state, ...action.payload };
    },
    inviteSuccess(state, { payload: invitation }) {
      return { ...state, invitation };
    },
  },

};
