/**
 * Created by ccc on 6/1/17.
 */
import React from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import { config } from '../utils';
import { Layout } from '../components';

const { styles, Header } = Layout;

function App({ app, loading, children, dispatch, location }) {
  const { account } = app;
  const headerProps = {
    account,
    location,
    logout: () => { dispatch({ type: 'app/logout' }); },
  };
  return (
    <div>
      <Helmet>
        <title>{config.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className={styles.layout}>
        <div className={styles.main}>
          <Header {...headerProps} />
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(({ app, loading }) => ({ app, loading }))(App);
