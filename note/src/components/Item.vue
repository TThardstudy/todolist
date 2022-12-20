<template>
     <li>
        <label>
            <input type="checkbox" :checked="todo.done" @change="handleChick(todo.id)"/>
            <span v-show="!todo.isEdit">{{todo.title}}</span>
            <input v-show="todo.isEdit" type="text" :value="todo.title" @blur="handleBlur(todo,$event)" ref="inputTitle">
        </label>
        <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
        <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
    </li>
</template>

<script>
export default {
    name:"Item",
    props:['todo'],
    methods: {
      handleChick(id){
        this.$bus.$emit('checkTodo',id)

      },
      handleDelete(id){
        if (confirm('要删除吗')) {
        this.$bus.$emit('deleteTodo',id)
        }
      },
      handleEdit(todo){
        if(todo.hasOwnProperty('isEdit')){
          todo.isEdit=true
        }else{
          this.$set(todo,'isEdit',true)
        }
        this.$nextTick(function(){
          this.$refs.inputTitle.focus()
        })
      },
      handleBlur(todo,e){
        todo.isEdit = false
        if (!e.target.value.trim()) return alert('输入空了')
        this.$bus.$emit('updateTodo',todo.id,e.target.value)
      }
    },
}
</script>

<style>
  li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 7px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover{
  border:1px solid #fff ;
}
li:hover button{
  display: block;
} 
</style>