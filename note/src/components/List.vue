<template>
    <ul class="todo-main">
        <transition-group name="todo" appear>
            <Item v-for= "todo in todos" 
            :key = "todo.id" 
            :todo= "todo" />
        </transition-group>
    </ul>
</template>

<script>
import Item from './Item.vue'
export default {
    name:'List',
    components:{
        Item
    },
    data() {
        return {
           
        };
    },
    props:['todos']
}
</script>

<style lang="less" scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-enter-active{
	animation: todoya 0.2s linear;
}

.todo-leave-active{
	animation: todoya 0.2s linear reverse;
}

@keyframes todoya {
	from{
		transform: translateX(100%);
	}
	to{
		transform: translateX(0px);
	}
}
</style>