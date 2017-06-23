/**
 * Created by ccc on 6/21/17.
 */

import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, Input, Icon } from 'antd';
import AuthLayout from '../../components/AuthLayout';
import styles from './index.less';

const FormItem = Form.Item;

function Login({
                 auth,
                 dispatch,
                 form: { getFieldDecorator, validateFieldsAndScroll }}) {

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        dispatch({ type: 'auth/login', payload: values });
      }
    });
  }

  return (
    <div className={styles.form}>
      <Form onSubmit={handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
            initialValue: auth.email,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Input size="large" prefix={<Icon type="mail" style={{ fontSize: 13 }} />} readOnly />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
          })(
            <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Passwordd" />,
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form>
    </div>
  );
}

export default connect(({ auth }) => ({ auth }))(Form.create()(Login));
