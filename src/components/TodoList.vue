<template>
  <div>
    <div class="card mb-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body d-flex justify-content-between">
        <span :class="{completed:todo.completed}" @click="updateTodo(todo)">{{todo.title}}</span>
        <span @click="deleteTodo(todo)">🗑️</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TodoList",
	props: {
    todos: {
      type: Array
		}
	},
	computed: {
    requestHeader() {
      return this.$store.getters.requestHeader;
    },
    userId() {
      return this.$store.getters.userId;
    }
  },
	methods: {
    deleteTodo(todo) {
      axios
        .delete(`http://localhost:8000/api/v1/todos/${todo.id}/`, this.requestHeader)
        .then(res => {
          console.log(res);
          const targetTodo = this.todos.find(el => el === todo);
          const idx = this.todos.indexOf(targetTodo);
          if (idx > -1) this.todos.splice(idx, 1);
        })
        .catch(err => console.log(err));
    },
    updateTodo(todo) {
			const data = {
        user: this.userId,
        title: todo.title,
        completed: !todo.completed
      };
      axios
        .put(
          `http://localhost:8000/api/v1/todos/${todo.id}/`,
          data,
          this.requestHeader
        )
        .then(res => {
          console.log(res);
          todo.completed = !todo.completed;
        })
        .catch(err => console.log(err));
		}
	}
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: dimgray;
}
</style>