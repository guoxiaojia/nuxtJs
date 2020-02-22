import axios from 'axios';
import qs from 'qs'

// import store from '../store/index'
// let tokenKudou=store.getters.tokenKudou

const ApiHostKudou = 'http://api.ikudou.com';
// const ApiHostKudou = 'http://192.168.1.50/kudou/public';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.processData=false;
axios.defaults.contentType=false;
axios.defaults.baseURL = '';

//http request 拦截器
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postKudou(url, object = {}) {
    return new Promise((resolve, reject) => {
        axios.post(ApiHostKudou+url, object)
        .then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

export function getKudou(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.get(ApiHostKudou+url,{
            params:params
        }).then(response=>{
            resolve(response.data);
        }).catch(err=>{
            reject(err);
        })
    })
}
