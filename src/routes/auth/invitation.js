/**
 * Created by ccc on 6/20/17.
 */

import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, Input, Icon, Alert } from 'antd';
import AuthLayout from '../../components/AuthLayout';
import styles from './index.less';

function Invitation({ auth, loading, dispatch }) {
  const { email, invitation } = auth;
  function handleOk(){
    dispatch({ type: 'auth/invite', payload: { email } });
  }
  return (
    <div className={styles.form}>
      <p>您（{auth.email}）尚未注册。</p>
      {invitation.waiting ? <Alert
        message="提交成功"
        description="您的申请已经接收，通过审核后会发送邀请到您邮箱。"
        type="success"
        showIcon
      /> : ''}
      <Button type="primary" onClick={handleOk} loading={ loading.global || invitation.waiting}>
        {invitation.waiting ? `重新申请(${invitation.countDown}s)` : '申请邀请码'}
      </Button>
    </div>
  );
}

export default connect(({ auth, loading }) => ({ auth, loading }))(Invitation);
