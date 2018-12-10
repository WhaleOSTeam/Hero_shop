<template>
  <div>
    <!-- 登录 注册 购物车... -->
    <Nav></Nav>
    <div class="container"
         v-if="!isRegister"
         style="width: 100%; background: url('../../static/img/public/regist_bg.jpg');">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8"
             style="background: #fff; padding: 40px 80px; margin: 30px; border: 7px solid #ccc;">
          <font>会员注册</font>USER REGISTER
          <form id="register_form" class="form-horizontal" action="" method="" style="margin-top: 5px;">
            <div class="form-group">
              <label for="username" class="col-sm-2 control-label">用户名</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" id="username" name="username"
                       v-model="fromData.username"
                       placeholder="请输入用户名">
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="col-sm-2 control-label">密码</label>
              <div class="col-sm-6">
                <input type="password" class="form-control" id="password" name="password"
                       v-model="fromData.password"
                       placeholder="请输入密码">
              </div>
            </div>
            <div class="form-group">
              <label for="confirmpwd" class="col-sm-2 control-label">确认密码</label>
              <div class="col-sm-6">
                <input type="password" class="form-control" id="confirmpwd" name="repassword"
                       placeholder="请输入确认密码">
              </div>
            </div>
            <div class="form-group">
              <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
              <div class="col-sm-6">
                <input type="email" class="form-control" id="inputEmail3" name="email"
                       v-model="fromData.email"
                       placeholder="Email">
              </div>
            </div>
            <div class="form-group">
              <label for="usercaption" class="col-sm-2 control-label">姓名</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" id="usercaption" name="name"
                       v-model="fromData.name"
                       placeholder="请输入姓名">
              </div>
            </div>
            <div class="form-group opt">
              <label  class="col-sm-2 control-label">性别</label>
              <div class="col-sm-6">
                <label class="radio-inline">
                  <input type="radio" name="sex" id="sex1" value="male" v-model="fromData.sex">男
                </label>
                <label class="radio-inline">
                  <input type="radio" name="sex" id="sex2" value="female" v-model="fromData.sex">女
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="register_date" class="col-sm-2 control-label">出生日期</label>
              <div class="col-sm-6">
                <input type="date" id = "register_date"
                       class="form-control"
                       v-model="fromData.birthday"
                       name="birthday">
              </div>
            </div>

            <div class="form-group">
              <label for="code" class="col-sm-2 control-label">验证码</label>
              <div class="col-sm-3">
                <input type="text" id = "code" class="form-control"
                       v-model="fromData.code"
                       name="checkCode">
              </div>
              <div class="col-sm-2">
                <!--验证码-->
              </div>

            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <input type="button" width="100" value="注册" name="submit"
                       @click = "registerSubmit"
                       style="background: url('../../static/img/public/register.gif') no-repeat scroll 0 0 rgba(0, 0, 0, 0); height: 35px; width: 100px; color: white;">
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
    <div v-else>
      <h2>恭喜您注册成功，请赶快前往注册邮箱激活您的帐户</h2>
      <div>
        <span><a href="http://mail.163.com/">网易163邮箱</a></span>&nbsp;&nbsp;&nbsp;
        <span><a href="http://mail.126.com/">网易126邮箱</a></span>&nbsp;&nbsp;&nbsp;
        <span><a href="https://mail.qq.com/cgi-bin/loginpage">腾讯QQ邮箱</a></span>&nbsp;&nbsp;&nbsp;
      </div>
      <div>
        <router-link to="/login">登陆</router-link>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>
<script>
    import Nav from "../components/nav.vue"
    import Footer from "../components/footer"
    import Config from "../utils/Config"
    import {isRepeatName,regist} from '../service/requset'
    export default {
        name: "",
        data() {
            return {
                fromData:{
                   username:"",
                   passworld:"",
                   email:"",
                   name:"",
                   sex:"",
                   birthday:"",
                   code:""
                },
                isRegister:false
            }
        },
        created() {

        },
        computed: {},
        watch: {

        },
        methods: {
          registerSubmit(){//表单绑定的方法
            //表单序列化(自动拼接字符串)
            let formData = $("#register_form").serialize();
            console.log(formData);

            //触发验证
//            if(_this.fromData.username){
//              this.sendRegister();
//            }else{
//                //提示用户名为空
//            }

          },
          async sendRegister(){
             //先监测用户名是否重复
              let _this = this;
              let res = await isRepeatName(_this.fromData.username);
              if(res.data.isExist){//用户名以存在
                 //给予提示
              }else{
                 if($("#register_form").valid()){
                    this.registerUser();
                 }
              }
          },
          async registerUser(){
            let _this = this.fromData;
            let res = await regist({
              "username":_this.username,
              "password":_this.password,
              "name":_this.name,
              "email":_this.email,
              "birthday":_this.birthday,
              "sex":_this.sex,
            });
            if(res.data.error === 0){
               //注册成功
               this.isRegister = true;
            }
          },
          formValidate(){
            $("#register_form").validate({
              rules:{
                "username":{//表单项name值:{校验规则}
                  "required":true,
                  //"checkUsername":true
                },
                "password":{
                  "required":true,
                  "rangelength":[6,12]
                },
                "repassword":{
                  "required":true,
                  "rangelength":[6,12],
                  "equalTo":"#password"
                },
                "email":{
                  "required":true,
                  "email":true
                },
                "sex":{
                  "required":true
                }
              },
              messages:{
                "username":{
                  "required":"用户名不能为空",
                  "checkUsername":"用户名已存在"
                },
                "password":{
                  "required":"密码不能为空",
                  "rangelength":"密码长度6-12位"
                },
                "repassword":{
                  "required":"密码不能为空",
                  "rangelength":"密码长度6-12位",
                  "equalTo":"两次密码不一致"
                },
                "email":{
                  "required":"邮箱不能为空",
                  "email":"邮箱格式不正确"
                }
              },
              errorPlacement: function(error, element) {
                //错误信息位置设置方法
                if(element.attr("id") === "sex1"){
                  error.appendTo(element.parent().next()); //这里的element是录入数据的对象
                }else{
                  error.appendTo(element.parent());
                }
              },
            });

          },
          checkUsername(){
            $.validator.addMethod(
              //规则的名称
              "checkUsername",
              //校验的函数
              function(value,element,params){
                //定义一个标志
                let flag = false;
                //value:输入的内容
                //element:被校验的元素对象
                //params：规则对应的参数值
                //目的：对输入的username进行ajax校验
                $.ajax({
                  "async":false,
                  "url":Config.ENVIRONMENT.test+"/HeimaShop/checkUsername",
                  "data":{"username":value},
                  "type":"POST",
                  "dataType":"json",
                  "success":function(data){
                    console.log("data");
                    flag = data.isExist;
                  }
                });
                //返回false代表该校验器不通过
                return !flag;
              }
            );
          },
        },
        activated() {
        },
        mounted() {
            //this.checkUsername();
            this.formValidate();
        },
        components: {
            Footer,
            Nav
        },
    }
</script>
<style scoped>
</style>
