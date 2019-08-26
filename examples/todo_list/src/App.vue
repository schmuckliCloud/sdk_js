<template>
  <div id="app">
    <form @submit="addTodo">
      <input type="text" placeholder="Name" v-model="name">
      <input type="submit" value="Add">
    </form>

    {{ todo_list }}
  </div>
</template>

<script>
import { sCStorage } from 'schmucklicloud_storage';

var ref = new sCStorage('d8feb2cff54efd2bc9d6273541ec35aafb89f28f', 'b01b1edd64301f469c79e99950c0fe068996b1db2ca71672b73b7fb7ec9feccd');
ref.setBucket(12);
ref.setDataset("test3");

export default {
  name: 'app',
  data() {
    return {
      name: "",
      todo_list: ""
    }
  },
  mounted(){
    this.loadData();
  },
  methods: {
    addTodo(e){
      e.preventDefault();
      var global_this = this;
      ref.insert("todos", {
        name: this.name
      }).then(function(){
        global_this.loadData();
      });
    },
    loadData(){
      var global_this = this;
      ref.getAll("todos").then(function(response){
        global_this.todo_list = response.data;
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
