<template>
  <div class="todo-input mb-2">
    <div class="input-group">
      <input class="form-control" type="text" v-model="title" @keydown.enter="createTodo" />
      <span class="input-group-btn">
        <button class="btn btn-primary" @click="createTodo">+</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoInput",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    createTodo() {
      this.$emit("createTodo", this.title);
      this.title = "";
    }
  }
};
</script>

<style>
</style> 