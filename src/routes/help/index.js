/**
 * Created by ccc on 6/23/17.
 */

import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

function Help(){
  return (
    <div className={styles.content}>
      <article className={styles['markdown-body']}>
        <h1>使用帮助</h1>
        <h2>自动配置文件地址</h2>
        <p>https://m.bengbeng.lol/pacs</p>
        <h2>认证上网IP地址</h2>
        <p>https://m.bengbeng.lol</p>
        <h2>iOS配置</h2>
        <p>安装Wingy,线路配置如下：</p>
        <table>
          <tr>
            <td>https:</td>
            <td>勾选</td>
          </tr>
          <tr>
            <td>服务器:</td>
            <td>m.bengbeng.lol</td>
          </tr>
          <tr>
            <td>端口:</td>
            <td>54333</td>
          </tr>
          <tr>
            <td>代理模式:</td>
            <td>自动代理模式</td>
          </tr>
        </table>
      </article>
    </div>
  );
}

export default Help;
