/**
 * Created by ccc on 6/1/17.
 */
import React from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import { config } from '../utils';
import { Layout } from '../components';

const { styles } = Layout;

function App({ loading, children }) {
  return (
    <div>
      <Helmet>
        <title>{config.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className={styles.layout}>
        <div className={styles.main}>
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

export default connect(({ loading }) => ({ loading }))(App);
