/**
 * Created by ccc on 6/1/17.
 */

import config from './config';
import request from './request';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export {
  config,
  request,
  delay,
};
