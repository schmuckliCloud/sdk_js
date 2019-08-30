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

      var ref = new sCStorage("d8feb2cff54efd2bc9d6273541ec35aafb89f28f", "c685efaa5560134a0dd8dea5ba39f1b13f28c1a2d890b85942748f6386cbdd7a");
      ref.setDataset("test3");

      ref.setBucket(12);

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

      ref.getAll("todos", "asc", 11, 1).then(function(result){
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
