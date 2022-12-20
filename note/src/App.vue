<template>
  <div id="app">
    <div class="building">
    <div class="notemain">
        <Header @receive="receive"/>
        <List :todos="todos"/>
        <Footer :todos="todos"
        @checkAllTodo="checkAllTodo"
        @clearAllTodo="clearAllTodo"/>
    </div>
    </div>
  </div>
</template>
<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import List from './components/List.vue'
import { getAllTodo, addTodo, deleteTodo, updateTodo, checkTodo,checkAllTodo, clearAllTodo } from "../api/index";
export default {
    name: 'app',
    components: { 
      Header,
      List,
      Footer },
    data() {
        return {
            todos:[]
        };
    },

    mounted() {
        this.$bus.$on("checkTodo", this.checkTodo);
        this.$bus.$on("updateTodo", this.updateTodo);
        this.$bus.$on("deleteTodo", this.deleteTodo);
        this.getAllTodo();
    },
    beforeCreate(){
        this.$bus.$off("checkTodo");
        this.$bus.$off("updateTodo");
        this.$bus.$off("deleteTodo");
    },
    methods: {
        //以下都是ES6的解析赋值，是将服务器逻辑更改后的数据更新在页面上。
        // 读取todos
         getAllTodo() {
            getAllTodo().then(({ data }) => {
                this.todos = data.data.todo;
            });
        },
        //添加一个todo
        receive(todoObj) {
            addTodo({ todo: todoObj }).then(({ data }) => {
                this.todos = data.data.todo;
            });
        },
        //勾选or取消勾选一个todo
        checkTodo(id) {
            checkTodo({ id }).then(({ data }) => {
                this.todos = data.data.todo;
            });
        },
        //更新一个todo
        updateTodo(id, title) {
            updateTodo({ id, title }).then(({ data }) => {
                this.todos = data.data.todo;
            });
        },
        //删除一个todo
        deleteTodo(id) {
            deleteTodo({ id }).then(({ data }) => {
                this.todos = data.data.todo;
            });
        },
        //全选or取消全选
        checkAllTodo(done) {
            checkAllTodo({ done }).then(({ data }) => {
                this.todos = data.data.todo;
            });
        },
        //清除所有已经完成的todo
        clearAllTodo() {
            
            clearAllTodo().then(({ data }) => {
                this.todos = data.data.todo;
            });
        },
    },
};
</script>

<style lang="less">
    @import'./assets/css/font.css';
   *{
    color: #fff;
    font-family: "fontme";
    padding: 0;
    margin: 0;
   }
   body{
    box-sizing: border-box;
   }
   .building{
  background-image:url("./assets/img/1671530043958.jpg");
  width:100%;
//   height:100%;
  position:fixed;
//   background-size:100% 100%;
}
   .notemain{
    width: 500px;
    padding: 0;
    margin: 0 auto;
    border: 1px solid;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
   }
   .btn {
    display: inline-block;
    padding: 4px 9px;
    margin-bottom: 0;
    font-size: 8px;
    line-height: 14px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}
.btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
}
.btn-edit {
    color: #fff;
    background-color: skyblue;
    border: 1px solid rgb(103, 159, 180);
    margin-right: 5px;
}
.btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
}
.btn:focus {
    outline: none;
}
</style>