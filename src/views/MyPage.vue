<template>
  <div>
    <my-page></my-page>
  </div>
</template>

<script>
import MyPage from '../components/MyPage.vue';
export default {
  components: {
    MyPage
  },
  created() {
    // 비 로그인시 차단
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>  