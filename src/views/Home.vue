<template>
  <div class="home">
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import router from "../router";
import TodoList from "../components/TodoList";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  name: 'home',
  components: {
    TodoList
  },
  data() {
    return {
      todos: []
    };
  },
  methods: {
    checkLoggedIn() {
      this.$session.start();
      if (!this.$session.has("jwt")) {
        router.push("/login");
      }
    },
    getTodos() {
      this.$session.start();
      const token = this.$session.get("jwt");
      const decodedToken = jwtDecode(token);
      const { user_id } = decodedToken;
      const requestHeader = {
        headers: {
          Authorization: `JWT ${token}`
        }
      };
      axios
        .get(`http://localhost:8000/api/v1/users/${user_id}/`, requestHeader)
        .then(res => {
          const { todo_set } = res.data;
          this.todos = todo_set;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.checkLoggedIn();
    this.getTodos();
  }
}
</script>
