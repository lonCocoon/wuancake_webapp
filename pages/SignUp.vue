<template>
  <div class="signup-page">

    <!-- 椭圆表单 begin -->
    <div class="form-items">
      <!-- 输入用户名 -->
      <div class="form-radius form-item">
        <w-input :value="user.username" :verification="isVerification.UserName"
        class="radius-input" @on-blur="userInput"   placeholder="输入用户名"></w-input>
      </div>
      <!-- 输入电子邮箱 -->
      <div class="form-item">
        <w-input :value="user.email" :verification="isVerification.Email" :style="verification.Email ? setMargin : ''" class="radius-input"  @on-blur="emailInput" placeholder="输入电子邮箱"></w-input>
        <p v-if="verification.Email === 1">邮箱地址是必填项</p>
        <p v-if="verification.Email === 2">邮箱地址格式错误</p>
      </div>

      <!-- 输入QQ -->
      <div class="form-item">
        <w-input :value="user.qq" :verification="isVerification.QQ"   class="radius-input" @on-blur="qqInput" placeholder="输入QQ"></w-input>
      </div>

      <!-- 输入密码 -->
      <div class="form-item">
        <w-input :value="user.password" type="password" :verification="isVerification.Password" :style="verification.Password ? setMargin : ''"  class="radius-input" @on-blur="passwordInput" placeholder="输入密码"></w-input>
        <p v-if="verification.Password === 1">密码是必填项</p>
      </div>

      <!-- 确认密码 -->
      <div class="form-item">
        <w-input :value="user.passwordT" type="password" :verification="isVerification.PasswordT" :style="verification.PasswordT ? setMargin : ''"  class="radius-input" @on-blur="passwordTInput" placeholder="确认密码"></w-input>
        <p v-if="verification.PasswordT === 1">确认密码是必填项</p>
        <p v-if="verification.PasswordT === 2">确认密码与密码不一致</p>
      </div>
    </div>
    <!-- 椭圆表单 end -->

    <div class="login-btns">
      <button @click="getSignUp" class="login-btn login-btn-item">注册</button>
    </div>
    <button class="login-btn login-btn-footer" @click="goLogin">已有账号？点击登录</button>
  </div>
</template>

<script>
import WInput from '../components/WInput'
import { signup } from '../api/index.js'
import { mapMutations } from 'vuex';

export default {
  components:{
    'w-input': WInput
  },
  data () {
    return {
      user:{
        username:'',
        email:'',
        qq:'',
        password:'',
        passwordT:'',
      },
        isVerification:{
        UserName:true,
        Email:true,
        QQ:true,
        Password:true,
        PasswordT:true,
      },
      verification:{
        Email:0,
        Password:0,
        PasswordT:0,
      },
      deal:{ 
        Email: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
        
      },
      setMargin: {
        'margin-bottom': 0
      },
    }
  },
  methods:{
    getSignUp() {
      if(this.user.email === "" || this.user.email === null){
        this.verification.Email = 1;
        this.isVerification.Email = false;
      }
      if(this.user.password === "" || this.user.password === null){
        this.verification.Password = 1;
        this.isVerification.Password = false;
      }
      if(this.user.passwordT === "" || this.user.passwordT === null ){
        this.verification.PasswordT = 1;
        this.isVerification.PasswordT = false;
      }
      if(this.user.passwordT != this.user.password){
        this.verification.PasswordT = 2;
        this.isVerification.PasswordT = false;
      }
      else if(this.isVerification.Email && this.isVerification.Password &&  this.isVerification.PasswordT){
        this.isVerification.Email = true;
        this.isVerification.Password = true;
        this.isVerification.PasswordT = true;
        this.verification.Eamil = 0;
        this.verification.Password = 0;
        this.verification.PasswordT = 0;
        // 注册
        signup({
          userName: this.user.username,
          email: this.user.email,
          qq:this.user.qq,
          password:this.user.password
        }).then(res =>{
          console.log(res.data)
          if(res.data.infoCode != 200){
            this.$toast(res.data.infoText);
             console.log(22222)
          }
          else{
            this.$toast(res.data.infoText);
            console.log(111)
            this.$router.push({
              path: '/login'
            })
          }
        })  
      }
      else{

     }
    },
    //用户名
    userInput(event){
      this.user.username = event.target.value;
    },
    // 电子邮箱验证
    emailInput(event) {
      let a = new RegExp(this.deal.Email);
      this.user.email = event.target.value;
      if(event.target.value) {
    
        if(a.test(this.user.email)) {
          this.verification.Email = 0;
          this.isVerification.Email = true;
          console.log(this.user.email,this.verification.Email,111)
        }
        else{
          this.verification.Email = 2;
          this.isVerification.Email = false;
          console.log(this.user.email,this.verification.Email,222)
        }
      }
      else{
        console.log(this.user.email,this.verification.Email,'邮箱的')
      }
    },
    // QQ验证
    qqInput(event){
      if(event.target.value) {
        this.user.qq = event.target.value;
      }
    },
    //密码验证
    passwordInput(event) {
      if (event.target.value) {
        this.user.password = event.target.value;
        this.verification.Password = 0;
        this.isVerification.Password = true;
      }
    },
    // 确认密码验证
    passwordTInput(event) {
      if (event.target.value) {
        this.user.passwordT = event.target.value;
        this.verification.PasswordT = 0;
        this.isVerification.PasswordT = true;
      }
    },
    goLogin(){
      this.$router.push({
        path:'/login'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

.signup-page
  pageFlexCenter()
  pageTopGap()

.login-btn
  width: 540px
  height 84px
  text-align center
  line-height 84px
  box-sizing border-box
  font-size 34px
  border 0

.login-btn-item
  border-radius 42px
  &:last-child
    background  $input-primaryLightBLue
    color #ffffff

.login-btn-footer
  background transparent
  color $input-primaryDeepSkyBlue
  font-size 32px
  position absolute
  bottom 10px
  right 0

.form-radius
  // radiusInput()

.form-item
  position relative
  margin-bottom ($input-bottomGap * 1.5)
  &:last-child
    margin-bottom ($input-bottomGap*3)
  p
    margin 0
    width: 540px;
    font-size 20px
    color red
    height ($input-bottomGap * 1.5)
    line-height ($input-bottomGap * 1.5)
    box-sizing border-box
    padding-left 40px
    display inline-block
    text-align left 
</style>

