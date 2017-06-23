/**
 * Created by ccc on 6/23/17.
 */

import React from 'react';
import { connect } from 'dva';
import { Row, Col, Menu, Card, Button, Icon } from 'antd';
import styles from './index.less';

function Dashboard() {
  return (
    <div className={styles.container}>
      <Row>
        <Col xs={24} sm={24} md={6} lg={4}>
          <Menu
            mode="inline"
          >
            <Menu.Item key="1">
              <Icon type="mail" />
              邀请管理
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              用户管理
            </Menu.Item>
          </Menu>
        </Col>
        <Col xs={24} sm={24} md={18} lg={20} className={styles.content}>
          asdfasdf
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard);
