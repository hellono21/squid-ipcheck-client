import dva from 'dva';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import { message } from 'antd';
import './index.css';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error, dispatch) {
    const { status, data } = error.response;
    switch ( status ) {
      case 401:
        message.error('未登录');
        break;
      case 403:
        message.error('用户名密码不正确');
        break;
      default:
        message.error(data.message);
    }
  },
});

// 2. Plugins
// app.use({});
app.use(createLoading({ effects: true }));

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
