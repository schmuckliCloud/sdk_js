<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="test"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { sCStorage } from 'schmucklicloud_storage';

var ref = new sCStorage("test", "foo");

export default {
  name: 'app',
  data(){
    return {
      test: ref.api_secret
    }
  },
  components: {
    HelloWorld
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
