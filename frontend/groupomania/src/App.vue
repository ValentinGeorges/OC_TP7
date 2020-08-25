<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="logo groupomania">
    </header>
    <div id="nav">
      <router-link to="/login" v-if="!isLogged" v-bind="checkIfLogged()">Connexion | </router-link>
      <router-link to="/signup" v-if="!isLogged" v-bind="checkIfLogged()">S'inscrire</router-link>
      <router-link to="/reddit" v-if="isLogged" v-bind="checkIfLogged()">Reddit | </router-link>
      <router-link to="/9gag" v-if="isLogged" v-bind="checkIfLogged()">9GAG | </router-link>
      <router-link to="/profile" v-if="isLogged" v-bind="checkIfLogged()">Mon profil | </router-link>
      <router-link @click.native="logout()" to="/login" v-if="isLogged" v-bind="checkIfLogged()">Se déconnecter</router-link>
    </div>
    <router-view/>
    <footer>
      <router-link to="/legalMentions">Mentions légales</router-link>
      <a href="mailto:groupomania@gmail.com">Contactez-nous</a>
      <router-link to="/users" v-if="isLogged">Membres</router-link>
    </footer>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  data () {
    return {
      isLogged: '',
      userId: ''
    }
  },
  created() {
    const token = JSON.parse(sessionStorage.getItem('key'));
    const decode = jwt_decode(token[0]);
    this.userId = decode.id;
  },
  methods: {
    logout() {
      sessionStorage.clear();
      window.open("login", "_self");
    },
    checkIfLogged() {
      if (sessionStorage.getItem("key") === null) {
        this.isLogged = false;
      } else {
        this.isLogged = true;
      }
    }
  }
}
</script>

<style lang="scss">
$primary-color: #FD2D01;
$secondary-color: #FFD7D7;

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: black;
}

html {
  height: 100%;
}

body {
    min-height: 100%;
    font-family: 'Lucida Sans', sans-serif;
}

header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

img {
  max-width: 100%;
}

#nav {
  margin-bottom: 20px;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 100%;
    height: 50px;
    background-color: $primary-color;

    a {
        color: white;
    }
}
</style>