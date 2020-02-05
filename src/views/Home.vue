<template>
  <div class="home">
    <TodoList />
  </div>
</template>

<script>
import router from "../router";
import TodoList from "../components/TodoList";

export default {
  name: 'home',
  components: {
    TodoList
  },
  methods: {
    checkLoggedIn() {
      this.$session.start();
      if (!this.$session.has("jwt")) {
        router.push("/login");
      }
    }
  },
  mounted() {
    this.checkLoggedIn();
  }
}
</script>
