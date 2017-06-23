/**
 * Created by ccc on 6/21/17.
 */

import React from 'react';
import { connect } from 'dva';
import R from 'ramda';
import { Row, Col, Form, Button, Input, Icon } from 'antd';
import AuthLayout from '../../components/AuthLayout';
import styles from './index.less';

const FormItem = Form.Item;

function Register({
                 app,
                 dispatch,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                   getFieldValue,
                   validateFields } }) {
  const { invitation } = app;

  function generateName(email) {
    if (email) {
      return R.split('@')(email)[0];
    }
  }

  function checkPassword(rule, value, callback){
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  function checkConfirm(rule, value, callback){
    if (value) {
      validateFields(['confirm_password'], { force: true });
    }
    callback();
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        dispatch({ type: 'app/register', payload: { ...values, token: invitation.token } });
      }
    });
  }

  return (
    <AuthLayout>
      <div className={styles.form}>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              initialValue: invitation.email,
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
            {getFieldDecorator('name', {
              initialValue: generateName(invitation.email),
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  validator: checkConfirm,
                },
              ],
            })(
              <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm_password', {
              rules: [
                {
                  required: true,
                  message: '请确认密码',
                },
                {
                  validator: checkPassword,
                },
              ],
            })(
              <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm Passwordd" />,
            )}
          </FormItem>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default connect(({ app }) => ({ app }))(Form.create()(Register));

