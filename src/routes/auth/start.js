/**
 * Created by ccc on 6/22/17.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Button, Input, Icon } from 'antd';
import AuthLayout from '../../components/AuthLayout';
import styles from './index.less';

const FormItem = Form.Item;

function Email({ auth,
                 loading,
                 dispatch,
                 form: { getFieldDecorator, validateFieldsAndScroll } }) {
  //const { loading } = auth;

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        dispatch({ type: 'auth/queryUser', payload: values });
      }
    });
  }

  function handleIgnore() {
    dispatch(routerRedux.push('/'));
  }

  return (
    <div className={styles.form}>
      <Form onSubmit={handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ type: 'email', message: 'Email地址不合法' }, { required: true, message: '请输入你的Email!' }],
          })(
            <Input size="large" prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">
          开始
        </Button>
        <Button type="primary" ghost size="large" onClick={handleIgnore} loading={loading.global}>跳过</Button>
      </Form>
    </div>
  );
}

export default connect(({ auth, loading }) => ({ auth, loading }))(Form.create()(Email));
