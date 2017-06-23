/**
 * Created by ccc on 6/21/17.
 */

import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import { config } from '../../utils';

const { Content} = Layout;

function AuthLayout({ children }) {
  return (
    <Layout className={styles.normal}>
      <Content className={styles.content}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
          <span>{config.name}</span>
        </div>
        {children}
      </Content>
    </Layout>
  );
}

export default AuthLayout;
