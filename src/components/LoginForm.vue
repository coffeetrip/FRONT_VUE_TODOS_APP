<template>
	<div>
		<div v-if="loading" class="spinner-border" role="status">
			<span class="sr-only">Loading...</span>
		</div>
		<div v-else class="login-div col-6 offset-3">
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
      loading: false
    };
  },
  methods: {
    login() {
      console.log("로그인시도");
      axios
        .post("http://localhost:8000/accounts/login/", this.credential)
        .then(response => {
					// 토큰 저장
          const { token } = response.data;
          this.$session.start(); // vue-session때문에 생김
          this.$session.set("jwt", token); // 첫번째 매개변수 이름으로 token을 저장.
          // 리다이렉트
          router.push("/");
        })
				.catch(error => {
					console.log(error)
					this.loading = true; 
					});				
    }
  }
};
</script>

<style>
</style>