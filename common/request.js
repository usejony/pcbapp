import queryString from 'query-string';
import _ from 'lodash';
import config from './config'
import Mock from 'mockjs';
const Request = {};

Request.Get = (url,params) => {
  if(params) {
    url += '?' + queryString.stringify(params)
  }
  return fetch(url)
          .then(res => res.json())
          .then(res => Mock.mock(res))
}

Request.Post = (url,body) => {
  const options = _.assign(config.header,{
    body:JSON.stringify(body)
  });
  return fetch(url,options)
          .then(res => res.json())
          .then(res => Mock.mock(res))
}

export default Request;