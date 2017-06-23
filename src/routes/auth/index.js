/**
 * Created by ccc on 6/2/17.
 */

import React from 'react';
import { connect } from 'dva';
import AuthLayout from '../../components/AuthLayout';

function Auth({ children }) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}

export default connect()(Auth);
