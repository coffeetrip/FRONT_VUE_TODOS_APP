<template>
	<div>
		<div v-if="loading" class="spinner-border" role="status">
			<span class="sr-only">Loading...</span>
		</div>
		<div v-else class="login-div col-6 offset-3">

			<div class="form-group">
				<label for="username">ID</label>
				<input id="username" class="form-control" type="text"  @keyup="onUsername" placeholder="사용자 이름">
			</div>
			<div class="form-group">
				<label for="password">PASSWORD</label>
				<input id="password" class="form-control" type="password" @keyup="onPassword" placeholder="비밀번호">
			</div>
			<p v-if="errorMessage.length > 0" class="text-center" style="color:red">{{ errorMessage }}</p>
			<button class="btn btn-primary" @click="login">login</button>
		</div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "LoginForm",
  data() {
    return {
      credential: {
        username: "",
        password: ""
      },
			loading: false,
			errorMessage: ""
    };
  },
  methods: {
    login() {
			console.log("로그인시도");
			axios
				.post("http://localhost:8000/accounts/login/", this.credential)
				.then(response => {
					this.loading = true;
					// 토큰 저장
					const { token } = response.data;
					// this.$session.start(); // vue-session때문에 생김
					this.$store.dispatch("login", token); 
					// 리다이렉트
					router.push("/");
				})
				.catch(error => {
					this.loginAlert();
					console.log(error)
					});		
		},	
		loginAlert() {
      this.errorMessage =
        "아이디 또는 비밀번호가 올바르지 않습니다.";
    },
    onUsername(e) {
      this.credential.username = e.target.value;
    },
    onPassword(e) {
      this.credential.password = e.target.value;
    }
  }
};
</script>

<style>
</style>