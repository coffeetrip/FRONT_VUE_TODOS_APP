<template>
	<div>
		<div v-if="loading" class="spinner-border" role="status">
			<span class="sr-only">Loading...</span>
		</div>
		<div v-else class="login-div col-6 offset-3">
			<div v-if="errors.length" class="error-list alert alert-danger">
        <div v-for="(error,idx) in errors" :key="idx">{{error}}</div>
      </div>
			<div class="form-group">
				<label for="id">ID</label>
				<input class="form-control" type="text" id="id" v-model="credential.username" />
			</div>
			<div class="form-group">
				<label for="pwd">PASSWORD</label>
				<input class="form-control" type="password" id="pwd" v-model="credential.password" />
			</div>
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
			errors: []
    };
  },
  methods: {
    login() {
			if (this.checkForm()) {
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
						console.log(error)
						});			
			}	
		},
		checkForm() {
			this.errors = [];
      if (this.credential.password.length < 8) {
        this.errors.push("비밀번호는 8글자가 넘어야 합니다.");
      }
      if (!this.credential.username) {
        this.errors.push("아이디를 입력 해주세요");
      }
      if (this.errors.length === 0) {
        return true;
			}
    }
  }
};
</script>

<style>
</style>