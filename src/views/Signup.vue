<template>
  <div>
    <h1>회원가입 페이지 입니다.</h1>
    <signup-form></signup-form>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue';
export default {
  name: 'Login',
  components: {
    SignupForm
  }
}
</script>

<style>
</style>