<template>
  <div>
    <div class="signup-div col-6 offset-3">

      <div class="form-group">
				<label for="username">ID</label>
        <input id="username" class="form-control" type="text" @keyup="onUsername">
				<small v-if="error.username">{{ error.username }}</small>
      </div>
      <div class="form-group">
        <label for="password">PASSWORD</label>
        <input id="password" class="form-control" type="password" @keyup="onPassword">
				<small v-if="error.password">{{ error.password }}</small>
      </div>
      <div class="form-group">
				<label for="password2">PASSWORD확인</label>
        <input id="password2" class="form-control" type="password" @keyup="onPassword2">
				<small v-if="error.password2">{{ error.password2 }}</small>
      </div>
      <!-- <div class="form-group">
        <label for="email">email</label>
        <input id="email" class="form-control" type="email" v-model="credential.email">
				<small v-if="error.email">{{ error.email }}</small>
      </div> -->
			<div class="form-group">
        <label for="age">age</label>
				<input id="age" class="form-control" type="number" v-model="credential.age" @keyup.enter="signup" min="1" max="150">
				<small v-if="error.age">{{ error.age }}</small>
			</div>
      <button class="btn btn-primary" @click="signup" @keyup.enter="signup">회원가입</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  data: function(){
    return {
      credential: {
        username: '',
        password: '',
        password2: '',
        // email: '',
        age: '',
      },
      loading: false,
      error: {
				username: '',
				password: '',
				password2: '',
				email: '',
				age: ''
			}
    }
  },
  methods: {
    signup(){
      if (this.checkForm()){
				console.log('회원가입 시도!!!')
        axios.post('http://localhost:8000/accounts/signup/', this.credential)
        .then(res => {
					const { token } = res.data;
					this.$store.dispatch("setTokenAction", token);
          router.push('/login')
        })
        .catch(e => {
          this.loading = true
          console.log(e)
        })
      }
    },
    checkForm(){
			if (this.credential.username == '') {
					this.error.username = "아이디를 입력해주세요."
				} else if (this.credential.password !== this.credential.password2) {
					this.error.password2 = "비밀번호가 동일하지 않습니다."
					return false;
				} else if (this.credential.password.length < 8) {
          this.error.password = "비밀번호는 8글자가 넘어야합니다."
        } else if (this.credential.age < 0 || this.credential.age > 151 || this.credential.age == '') {
          this.error.age = "나이는 0 ~ 150 사이로 입력해주세요."
				// } else if (!this.credential.email.includes("@")) {
				// 	this.error.email = "올바르지않은 이메일 형식입니다."
				} else {
					return true;
				}
		},
		onUsername(e) {
			this.credential.username = e.target.value;
		},
		onPassword(e) {
      this.credential.password = e.target.value;
    },
    onPassword2(e) {
      this.credential.password2 = e.target.value;
    }
  }
}
</script>

<style>
</style> 