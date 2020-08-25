<template>
  <div id="signupDiv">
    <form id="signupForm">
        <input type="email" name="email" id="signupEmail" placeholder="Email" v-model="email" required>
        <input type="text" name="username" id="signupUsername" placeholder="Pseudo" v-model="username" required>
        <input type="password" name="password" id="signupPassword" placeholder="Mot de passe" v-model="password" required>
        <input type="submit" name="submitSignup" id="signupSubmit" value="Inscription" @click.prevent="signup()">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      username: '',
      message: ''
    }
  },
  methods : {
    async signup() {
        let regexText = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        let regexEmail = /.+@.+\..+/;
        let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        let isValid = true;

        if (!regexEmail.test(this.email)) {
          this.$alert("Votre email doit respecter les standards");
          isValid = false;
        } else if (!regexText.test(this.username)) {
          this.$alert("Votre pseudo doit contenir uniquement des lettres");
          isValid = false;
        } else if (!regexPassword.test(this.password)) {
          this.$alert("Votre mot de passe doit faire minimum 8 caractères de long, doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial");
        } else if (isValid) {
          axios.post('http://localhost:8082/api/members/signup', {
            email: this.email,
            username: this.username,
            password: this.password
          })
            .then(response => {
                this.message = response.data
                window.alert("Compte créé avec succès, veuillez maintenant vous connecter !");
                window.open("/login", "_self");
            })
            .catch(error => {console.log(error)});
        }
    }
  }
}
</script>

<style lang="scss">
$primary-color: #FD2D01;
$secondary-color: #FFD7D7;

#signupDiv {
  width: 100%;
  display:flex;
  flex-direction: column;
  align-items: center;
}

#signupForm {
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
