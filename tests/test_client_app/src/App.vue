<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="test"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { sCStorage } from 'schmucklicloud_storage';

var ref = new sCStorage("4d4ff55414917628252ebcd373ade72e38005294", "17364a09ed982edb4089d5362e496b13e85b8060d474655ec6b58f57ea18aa60");
ref.setDataset("abc");

ref.setBucket(11);

ref.getAll("posts");

export default {
  name: 'app',
  data(){
    return {
      test: ref.dataset
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
