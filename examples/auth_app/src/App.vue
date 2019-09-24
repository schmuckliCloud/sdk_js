<template>
  <div id="app">
    <h2>Register</h2>
    <input type="text" placeholder="Email" v-model="r_email"><br>
    <input type="password" placeholder="Password" v-model="r_password"><br>
    <button @click="register">Register</button>
    <hr>
    <h2>Login</h2>
    <input type="text" placeholder="Email" v-model="l_email"><br>
    <input type="password" placeholder="Password" v-model="l_password"><br>
    <button @click="login">Login</button>
    <hr>
    <h2>Reset password</h2>
    <input type="text" placeholder="Email" v-model="reset_email"><br>
    <button @click="resetPassword">Reset password</button>
    <hr>
    <h2>Update password with token</h2>
    <input type="text" placeholder="Token" v-model="token"><br>
    <input type="password" placeholder="New password" v-model="ru_password"><br>
    <button @click="updateResetPassword">Update password</button>
  </div>
</template>

<script>
import { sCAuth } from "schmucklicloud_auth";

var auth = new sCAuth("d8feb2cff54efd2bc9d6273541ec35aafb89f28f", "c685efaa5560134a0dd8dea5ba39f1b13f28c1a2d890b85942748f6386cbdd7a");

export default {
  name: 'app',
  data(){
    return {
      r_email: "",
      r_password: "",
      l_email: "",
      l_password: "",
      reset_email: "",

      token: "",
      ru_password: ""
    }
  },
  methods: {
    register(){
      auth.registerEmailPassword(this.r_email, this.r_password).then(function(response){
        console.log(response);
      });
    },
    login(){
      auth.authorizeEmailPassword(this.l_email, this.l_password).then(function(response){
        console.log(response);
      });
    },
    resetPassword(){
      auth.requestResetPassword(this.reset_email).then(function(response){
        console.log(response);
      });
    },
    updateResetPassword(){
      auth.updateResetPassword(this.token, this.ru_password).then(function(response){
        console.log(response);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
