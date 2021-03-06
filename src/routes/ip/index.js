import React from 'react';
import { connect } from 'dva';
import { Row, Alert, Col, Card, Button, Icon } from 'antd';
import styles from './index.less';

function IndexPage({ location, dispatch, app, loading }) {
  const { client, account, commitButtonLoading } = app;
  const color = '#49A9EE';
  function handleCommit() {
    dispatch({
      type: 'app/commitIP',
      payload: { ip: client.ip },
    });
  }
  return (
    <Row gutter={24} type="flex" justify="center">
      <Col lg={8} md={10} sm={16} xs={16}>
        <Card className={styles.ipCard} bordered={false} >
          {account.name ? '' : <Alert
            message="提示"
            description="请注册加入获取更好服务"
            type="info"
            showIcon
          />}
          <Icon className={styles.icon} style={{ color }} type="environment-o" />
          <div className={styles.content}>
            <p className={styles.title}>你的IP地址</p>
            <p className={styles.ip}>{client.ip}</p>

            <Button type="primary" ghost size="large" onClick={handleCommit} loading={loading.global}>提交</Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

IndexPage.propTypes = {
};

export default connect(({ app, loading }) => ({ app, loading }))(IndexPage);
