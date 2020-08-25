<template>
  <div id="loginDiv">
    <form id="loginForm">
        <input type="text" name="username" id="loginUsername" placeholder="Pseudo" required v-model="username">
        <input type="password" name="password" id="loginPassword" placeholder="Mot de passe" required v-model="password">
        <input type="submit" name="submitLogin" id="loginSubmit" value="Connexion" @click.prevent="login()">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods : {
    async login() {
        axios.post('http://localhost:8082/api/members/login', {
          username: this.username,
          password: this.password,
        })
            .then(response => {
                sessionStorage.clear();
                const key = JSON.parse(sessionStorage.getItem('key')) || [];
                key.push(response.data.token);
                sessionStorage.setItem('key', JSON.stringify(key));
                window.open("reddit", "_self");
            })
            .catch(error => {
              this.$alert("Mauvais combinaison pseudo/mot de passe, veuillez réessayer")
              console.log(error)});
    }
  }
}
</script>

<style lang="scss">
$primary-color: #FD2D01;
$secondary-color: #FFD7D7;

#loginDiv {
  width: 100%;
  display:flex;
  flex-direction: column;
  align-items: center;
}

#loginForm {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: $secondary-color;
  width: 90%;
  max-width: 550px;
  height: 400px;
  padding-top: 20px;
  padding-bottom: 20px;

  input {
      width: 80%;
      height: 20px;
      border: none;
      border-radius: 5px;
  }

  & input:last-child {
      border: none;
      margin-top: 0px;
      background-color:$primary-color;
      color: white;
      width: 50%;
      height: 30px;
      font-size: 1em;
      font-weight: bold;
  }
}
</style>