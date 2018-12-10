/**
 * Created by jacyeli on 2018/12/8.
 */
import Config from '../utils/Config.js'
import http from '../utils/http.js'

//获取分类的数据
export const ProductServlet = (method) => http({
  url:Config.ENVIRONMENT.test + "/HeimaShop/product",
  type:"post",
  data:{
    method:method,
  }
});
//获取首页数据
/*
* prdTpye = hot new
* */
export const IndexData = (type) => http({
  url:Config.ENVIRONMENT.test + "/HeimaShop/productApi",
  type:"post",
  data:{
    method:"index",
    prdTpye:type
  }
});

//检查用户名是否重复

export const isRepeatName = (username) => http({
  url:Config.ENVIRONMENT.test+"/HeimaShop/checkUsername",
  type:"post",
  data:{
    "username":username,
  }
});

//注册的接口

export const regist = (obj) => http({
  url:Config.ENVIRONMENT.test+"/HeimaShop/registerApi",
  type:"post",
  data:{
    "username":obj.username,
    "password":obj.password,
    "name":obj.name,
    "email":obj.email,
    "birthday":obj.birthday,
    "sex":obj.sex,
  }
});
