const storage = window.sessionStorage;
import Cookies from 'js-cookie';
class toolkit {
  // 字符串操作方法
  compileStr(code) {
    // 对字符串进行加密
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
  }
  uncompileStr(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return escape(c);
  }
  setCookie(name,val){
      Cookies.set(name,val)
  }
    getCookie(name){
        return Cookies.get(name)
    }
    removeCookie(name){
        return Cookies.remove(name)
    }
  // 本地存储
  save(key, value) {
    storage.setItem(key, value);
  }
  saveMulti(datas) {
    datas.forEach(data => this.save(data.key, data.value));
  }
  read(key) {
    return storage.getItem(key);
  }
  readMulti(keys) {
    return keys.map(key => this.read(key));
  }
  clear(key, clearAll = false) {
    if (clearAll) {
      storage.clear();
    } else {
      storage.removeItem(key);
    }
  }
  clearMulti(keys) {
    keys.forEach(key => this.clear(key));
  }
  toast(code, message, time) {
    // let duration = time || 1500;
    // if (code == 250) {
    //   return Toast.warning(message, duration);
    // }
    // if (code == 1000) {
    //   Toast.success(message, duration);
    // } else {
    //   Toast.error(message, duration);
    // }
  }
  formatTime(time,isAll=true){
      var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      const D = (date.getDate()<10? '0'+date.getDate():date.getDate()) + ' ';
      const h = (date.getHours()<10? '0'+date.getHours():date.getHours()) + ':';
      const m = (date.getMinutes()<10? '0'+date.getMinutes():date.getMinutes()) + ':';
      const s = (date.getSeconds()<10? '0'+date.getSeconds():date.getSeconds());
      if(isAll){
          return Y+M+D+h+m+s;
      }
      return Y+M+D
  }
    formatTimeTable(row){
        var date = new Date(row.createTime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        const D = (date.getDate()<10? '0'+date.getDate():date.getDate()) + ' ';
        const h = (date.getHours()<10? '0'+date.getHours():date.getHours()) + ':';
        const m = (date.getMinutes()<10? '0'+date.getMinutes():date.getMinutes()) + ':';
        const s = (date.getSeconds()<10? '0'+date.getSeconds():date.getSeconds());
        return Y+M+D+h+m+s;
    }
  getdouble(value){
      if(value < 10) {
          return '0' + value
      }
      return value
  }
}
export default new toolkit();
