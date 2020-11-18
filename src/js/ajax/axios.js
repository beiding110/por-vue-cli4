import qs from 'qs';
import $axios from 'axios';
import axiosSupply from './axios.supply';


axiosSupply.mixin($axios);

$axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
$axios.defaults.withCredentials = true;

//request拦截器
$axios.interceptors.request.use(config => {
    return new Promise((resolve) => {
        resolve(config);
    });
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// response拦截器
$axios.interceptors.response.use(({data, config, headers}) => {
    return axiosSupply.resInterceptors(data, config, headers);
});
