<template>
  <div class="home">
    <TodoInput @createTodo="createTodo" />
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import router from "../router";
import TodoList from "../components/TodoList";
import TodoInput from "@/components/TodoInput"; // @는 src를 말한다.
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  name: 'home',
  components: {
    TodoList,
    TodoInput
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
    },
    createTodo(title) {
      this.$session.start();
      const token = this.$session.get("jwt");
      const decodedToken = jwtDecode(token);
      const { user_id } = decodedToken;
      const requestHeader = {
        headers: {
          Authorization: `JWT ${token}`
        }
      };
      const requestForm = new FormData();
      requestForm.append("user", user_id);
      requestForm.append("title", title);
      axios
        .post("http://localhost:8000/api/v1/todos/", requestForm, requestHeader)
        .then(res => {
          const { data } = res;
          this.todos.push(data);
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
