import axios from 'axios'
import qs from 'qs'
/*if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://192.168.21.108:8001/vic-gov-pc'
} else {
  axios.defaults.baseURL = 'https://vic-gov-pc.api.mgzf.com'
}*/

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.method === 'get') {
    config.params = config.params || {}
    Object.assign(config.params)
    config.data = qs.stringify(config.params)
  } else {
    config.data = config.data || {}
    Object.assign(config.data)
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  return Promise.reject(error);
});
