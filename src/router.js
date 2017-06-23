import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/app';

function registerModel(app, model) {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          // registerModel(app, require('./models/ip'));
          cb(null, { component: require('./routes/ip/') });
        }, 'ip');
      },
      childRoutes: [
        {
          path: 'ip',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/ip'));
              cb(null, require('./routes/ip/'));
            }, 'ip');
          },
        },
        {
          path: 'help',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/ip'));
              cb(null, require('./routes/help/'));
            }, 'help');
          },
        },
        {
          path: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/ip'));
              cb(null, require('./routes/dashboard/'));
            }, 'dashboard');
          },
        },
      ],
    },
    {
      path: '/auth',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          //registerModel(app, require('./models/auth'));
          cb(null, require('./routes/auth/'));
        }, 'auth');
      },
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/auth'));
          cb(null, { component: require('./routes/auth/start') });
        }, 'start');
      },
      childRoutes: [
        {
          path: 'start',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              //registerModel(app, require('./models/auth'));
              cb(null, require('./routes/auth/start'));
            }, 'start');
          },
        },
        {
          path: 'invitation',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/auth'));
              cb(null, require('./routes/auth/invitation'));
            }, 'invitation');
          },
        },
        {
          path: 'login',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/auth'));
              cb(null, require('./routes/auth/login'));
            }, 'login');
          },
        },

      ],
    },
    {
      path: 'register',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/auth/register'));
        }, 'register');
      },
    },
    {
      path: '*',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/error/'));
        }, 'error');
      },
    },
  ];

  return (<Router history={history} routes={routes} />);
}

export default RouterConfig;
