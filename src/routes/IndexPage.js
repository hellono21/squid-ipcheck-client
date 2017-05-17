import React from 'react';
import { connect } from 'dva';
import { Button, Card } from 'antd'
import styles from './IndexPage.css';

function IndexPage({ location, dispatch, app }) {
  const { client, commitButtonLoading } = app;
  function handleCommit() {
    dispatch({
      type: 'app/commitIP',
      payload: { ip: client.ip },
    });
  }
  return (
    <div className={styles.normal}>
      <h1>你的IP：{client.ip}</h1>
      <Button type="primary" size="large" onClick={handleCommit} loading={commitButtonLoading}>
        确认提交IP
      </Button>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({ app, loading }) => ({ app, loading }))(IndexPage);
