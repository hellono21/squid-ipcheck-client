/**
 * Created by ccc on 6/22/17.
 */
import React, {PropTypes} from 'react';
import { Layout, Row, Col, Menu, Breadcrumb, Icon, BackTop, Affix, Button} from 'antd';
import { Link } from 'dva/router';
import { config } from '../../utils';
import styles from './header.less';

const { SubMenu } = Menu;

function Header({ account, logout, location }) {
  const handleClickMenu = e => e.key === 'logout' && logout()
  return (
    <Affix>
      <div className={styles.header}>
        <Row>
          <Col xs={8} sm={8} md={5} lg={4}>
            <Link to="/" className={styles.logo}>
              <img alt={'logo'} src={config.logo} />
              {config.name}
            </Link>
          </Col>
          <Col xs={16} sm={16} md={19} lg={20}>
            { account.name ?
              <Menu mode="horizontal" defaultSelectedKeys={['ip']} className={styles.menu} onClick={handleClickMenu}>
                <Menu.Item key="ip">
                  <Link to="/">
                    <Icon type="home" />首页
                  </Link>
                </Menu.Item>
                { account.admin ?
                  <Menu.Item key="dashboard">
                    <Link to="/dashboard">
                      <Icon type="appstore-o" />管理
                    </Link>
                  </Menu.Item>
                  :
                  <Menu.Item key="help">
                    <Link to="/help">
                      <Icon type="question-circle-o" />帮助
                    </Link>
                  </Menu.Item>
                }
                <SubMenu title={<span><Icon type="user" />{account.name}</span>}>
                  <Menu.Item key="logout"><span><Icon type="logout" />注销</span></Menu.Item>
                </SubMenu>
              </Menu>
              :
              <Menu mode="horizontal" defaultSelectedKeys={['ip']} className={styles.menu}>
                <Menu.Item key="ip">
                  <Link to="/">
                    <Icon type="home" />首页
                  </Link>
                </Menu.Item>
                <Menu.Item key="login">
                  <Link to="/auth">
                    <Icon type="user" />登录|注册
                  </Link>
                </Menu.Item>
              </Menu>
            }
          </Col>
        </Row>
      </div>
    </Affix>
  );
}

export default Header;

