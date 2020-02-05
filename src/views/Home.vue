<template>
  <div class="home">
    <h1>Todos</h1>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: 'home',
  components: {

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
