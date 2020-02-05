<template>
  <div>
    <signup-form></signup-form>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue';
export default {
  name: 'Login',
  components: {
    SignupForm
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push('/');
    }
  }
}
</script>

<style>
</style>