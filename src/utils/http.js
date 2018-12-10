/**
 * Created by jacyeli on 2018/12/8.
 */
import axios from 'axios'
import qs from 'qs'


let baseUrl = '';
//axios 拦截器
// axios.interceptors.request.use(config => {
//   // 显示loading
//   return config
// }, error => {
//   return Promise.reject(error)
// })
//
// axios.interceptors.response.use(response => {
//   return response
// }, error => {
//   return Promise.resolve(error.response)
// })

// 网络错误的回调
function errorState (opts,response) {
  console.log("http:500,url="+opts.url);
  console.log("http:response"+response);
  if(opts.error){
    opts.error();
  }
  // if(url.indexOf("facebook") > -1) return;
  // if(url.indexOf('signOn') > -1){
  //   console.log(url.indexOf('signOn'));
  //
  //   return  ;
  // };
  // store.state.comeSoonTag = true;
  // store.state.comeSoonText = "checkNetworkError";
}
// 网络正常服务器错误的回调
function successState (response,httpDefaultOpts) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    console.log('Ajax request fail');
    console.log("requestInfo = " + JSON.stringify(httpDefaultOpts));
  }
}

const httpServer = (opts) => {
  let Public = { // 公共参数
  };
  let httpDefaultOpts = { // http默认配置
    method: opts.type ? opts.type.toUpperCase() : 'GET',
    baseUrl,
    url: opts.url,
    timeout: 1000000,
    params: Object.assign(Public, opts.data),
    data: qs.stringify(Object.assign(Public, opts.data)),
    // headers: opts.type === 'GET' ? {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // } : {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // }
  };

  if (opts.method === 'GET') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  return new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res,httpDefaultOpts);
        resolve(res)
      }
    ).catch(
      (response) => {
        errorState(opts,response);
        reject(response)
      }
    )
  }).catch(function (reason) {
    //console.log(reason)
  });


};

export default httpServer




export const jsonp = {};
jsonp.get = function (url, data, callback) {
  this.createJsonp(url, data,callback);
};
jsonp.createJsonp = function(url, data, callback) {
  let radom = Math.random() * 100;
  let number = parseInt(radom); //随机数字
  let callBackRadom = "jsonpSuccess_" + number; //指定回调函数
  window[callBackRadom] = callback;
  let query = [];
  for (let key in data) {
    query.push(key + '=' + data[key]);
  }
  let param = (query.length ? '?' + query.join('&') : '');
  let script = document.createElement("script");
  script.type = "text/javascript";
  if (param !== null && param.length > 0) {
    script.src = url + "" + param + "&callback=" + callBackRadom;
  }
  else {
    script.src = url + "?callback=" + callBackRadom;
  }
  script.id = callBackRadom;
  document.getElementsByTagName('head')[0].appendChild(script);
  this.removeJsonp(callBackRadom);
};
jsonp.removeJsonp =function (id) {
  let head = document.getElementsByTagName('head')[0];
  let el = document.getElementById(id);
  if (head !== null && el !== null) {
    head.removeChild(el);
  }
};

//针对天气封装的jsonp请求，callBack = parse_response；
export const jsonp_weather = {};
jsonp_weather.get = function (url, data, callback) {
  this.createJsonp(url, data,callback);
};
jsonp_weather.createJsonp = function(url, data, callback) {
  // let radom = Math.random() * 100;
  // let number = parseInt(radom); //随机数字
  // let callBackRadom = "jsonpSuccess_" + number; //指定回调函数
  let callBackRadom = "parse_response"; //指定回调函数
  window[callBackRadom] = callback;
  let query = [];
  for (let key in data) {
    query.push(key + '=' + data[key]);
  }
  let param = (query.length ? '?' + query.join('&') : '');
  let script = document.createElement("script");
  script.type = "text/javascript";
  if (param !== null && param.length > 0) {
    script.src = url + "" + param + "&callback=" + callBackRadom;
  }
  else {
    script.src = url + "?callback=" + callBackRadom;
  }
  script.id = callBackRadom;
  document.getElementsByTagName('head')[0].appendChild(script);
  this.removeJsonp(callBackRadom);
};
jsonp_weather.removeJsonp =function (id) {
  let head = document.getElementsByTagName('head')[0];
  let el = document.getElementById(id);
  if (head !== null && el !== null) {
    head.removeChild(el);
  }
};



//调用的实例

// jsonp.get("http://apidoc.weathercn.com/developers/JVapidoc.php",{
//   'apicontenttype':'locations',
//   'apicontenttype1':'geoposition',
//   'apikey':'36d3d4e74fa14403a548ad36d65980f5',
//   'secret':'qZwotH3BLEm0i%2Bpu5sSBlQ%3D%3D',
//   'lat':26.0614,
//   'lon':119.3061,
//   'languagestr':'en'
// }, function (res) {
//
//   console.log(res);
//
// });
