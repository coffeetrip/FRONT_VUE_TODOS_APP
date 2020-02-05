<template>
  <div>
    <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
  </div>
</template>

<script>
export default {
  name: "TodoList",
	props: {
    todos: {
      type: Array
		}
	}
};
</script>

<style>
</style>