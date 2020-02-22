import Vue from 'vue';
import 'babel-polyfill';
import md5 from  'js-md5';
// const Cookie = process.client ? require('js-cookie') : undefined;

 import { postKudou, getKudou,} from '~/static/api/server.js';
import {
    qrcode_local,
    setcookie,
    getcookie,
    getKey,
    localStoreSetItem,
    localStorageGetItem,
    localTimerDev,
    deepCopy
} from '~/static/api/function.js'


// Vue.prototype.$Cookie = Cookie;
Vue.prototype.$md5 = md5;

Vue.prototype.$postKudou=postKudou;
Vue.prototype.$getKudou=getKudou;
Vue.prototype.qrcode_local = qrcode_local;
Vue.prototype.getcookie=getcookie;
Vue.prototype.setcookie=setcookie;
Vue.prototype.getKey=getKey;
Vue.prototype.localStoreSetItem=localStoreSetItem;
Vue.prototype.localStorageGetItem=localStorageGetItem;
Vue.prototype.localTimerDev=localTimerDev;
Vue.prototype.deepCopy=deepCopy;

import {
    MessageBox,
    Message,
} from 'element-ui';

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;