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
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/ip'));
              cb(null, require('./routes/ip/'));
            }, 'ip');
          },
        },
      ],
    },
  ];

  return (<Router history={history} routes={routes} />);
}

export default RouterConfig;
