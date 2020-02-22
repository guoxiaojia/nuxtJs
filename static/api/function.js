export function getKey(key) {

    var v = location.href.match(new RegExp("[\?|&]*" + key + "=([^&\?]+)&*"));
    if (!v || v.length !== 2) {
        return null;
    }

    return v[1];
}
export function qrcode_local(url, el, width, height, color, backgroundcolor, replace) {
    if (replace) {
        el.innerHTML = '';
    }
    new QRCode(el, {
        text: url,
        width: width,
        height: height,
        colorLight: backgroundcolor
    });
}
function formatdate(add) {
    var dd = new Date();
    dd.setDate(dd.getDate() + add);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}

export function setcookie(n, v, d) {
    var exp = new Date(formatdate(+d) + " 00:00:00");
    document.cookie=n + "=" + escape(v) + ";expires=" + exp.toGMTString() + ";path=/;";

}
export function getcookie(n) {
    var arr = document.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
export function localStoreSetItem(key,data,uid){
    var obj={}
    obj.timer=new Date().getTime()+3600000;
    obj.data=data;
    if(uid){
        obj.uid=uid
    }
    var val=JSON.stringify(obj)
    localStorage.setItem(key,val)
}

export function localStorageGetItem(key){
    var data=JSON.parse(localStorage.getItem(key))
    return data
}

export function localTimerDev(key){
    var data=JSON.parse(localStorage.getItem(key))
    if(data){
        var timer=data.timer;
        if(new Date().getTime()-timer>0){
            // return true; 过期
            localStorage.removeItem(key);
            return false;
        }else{
            // 未过期
            return true;
        }
    }else {
        return false;
    }
}

export function deepCopy(obj) {//深拷贝
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

