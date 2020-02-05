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
import axios from "axios";
import { mapGetters } from "vuex";

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
  computed: {
    // 직접 키-밸류 쌍으로 줄 수도 있고, =>
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    // 리턴값이 키-밸류쌍. 분해해서 줘도 가능하다.
    ...mapGetters(["requestHeader", "userId"])
  },
  methods: {
    checkLoggedIn() {
      if (!this.isAuthenticated) {
        router.push("/login");
      }
    },
    getTodos() {
      axios
        .get(`http://localhost:8000/api/v1/users/${this.userId}/`, this.requestHeader)
        .then(res => {
          const { todo_set } = res.data;
          this.todos = todo_set;
        })
        .catch(err => console.log(err));
    },
    createTodo(title) {
      const requestForm = new FormData();
      requestForm.append("user", this.userId);
      requestForm.append("title", title);
      axios
        .post("http://localhost:8000/api/v1/todos/", requestForm, this.requestHeader)
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
