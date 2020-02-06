<template>
  <div>
    <h5>유저 페이지</h5>
    <p>username :{{user[0]['username']}}</p>
    <p>userage : {{user[0]['age']}}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: []
    };
  },
  computed: {
    userId() {
      return this.$store.getters.loggedInUser.user_id;
    },
    requestHeader() {
      return this.$store.getters.requestHeader;
    }
  },
  mounted() {
    const requestUrl = "http://localhost:8000";
    axios
      .get(`${requestUrl}/api/v1/users/${this.userId}/`, this.requestHeader)
      .then(res => {
        console.log(res.data);
        this.user.push(res.data)
      })
      .catch(err => console.log(err));
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/login");
    }
  }
};
</script>
<style>
</style> 