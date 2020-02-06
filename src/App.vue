<template>
  <div id="app">
    <div id="nav">
      <div v-if="isAuthenticated">
        <router-link to="/">Home</router-link> |
        <router-link to="/mypage"> {{ userName }} Page</router-link> |
        <a href="#" @click.prevent="logout">logout</a>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Signup</router-link>
      </div>
    </div>
    <div class="container">
      <router-view/>
    </div>

    <footer class="footer">
      <div>@ MY TODO - YYE, {{ new Date().getFullYear() }}</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isAuthenticated: this.$store.getters.isAuthenticated
    };
  },
  computed: {
    userName() {
      return this.$store.getters.loggedInUser.username;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  },
  updated() {
    this.isAuthenticated = this.$store.getters.isAuthenticated;
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
}

.footer {
  padding: 1rem;
  background-color: black;
  display: flex;
  justify-content: center;
  width: 100%;
  position:absolute;
  bottom: 0;
}

.footer div {
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
