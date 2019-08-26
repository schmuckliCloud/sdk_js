<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script>
import { sCStorage } from 'schmucklicloud_storage';

export default {
  name: 'app',
  data(){
    return {
      message: ""
    }
  },
  mounted(){
    this.test_one();
  },
  methods: {
    test_one(){
      var global_this = this;

      var ref = new sCStorage("4d4ff55414917628252ebcd373ade72e38005294", "17364a09ed982edb4089d5362e496b13e85b8060d474655ec6b58f57ea18aa60");
      ref.setDataset("abc");

      ref.setBucket(11);

      /*ref.insert("posts", {
        title: "Test"
      });*/

      ref.update("posts", 9, {
        title: "Hallo",
        author: "Test"
      });

      /*ref.delete("posts", 11, "title").then(function(data){
        console.log(data);
      });*/

      ref.getAll("posts").then(function(result){
        global_this.message = result;
      }).catch(function(e) {
        global_this.message = e;
      });

      /*ref.get("posts", [
        {
          "column": "title",
          "operator": "==",
          "value": "test"
        }
      ]).then(function(result){
        global_this.message = result;
      }).catch(function(e) {
        global_this.message = e;
      });*/
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
