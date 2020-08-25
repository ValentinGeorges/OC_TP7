<template>
    <form id="newRedditPost">
        <input type="text" name="title" id="title" placeholder="Votre titre..." v-model="title" required>
        <input type="text" name="content" id="content" placeholder="Tapez votre message ici..." v-model="content" required>
        <input type="submit" name="submitPost" id="submitPost" value="Poster votre message" @click.prevent="addPost()">
    </form>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const token = JSON.parse(sessionStorage.getItem('key'));

export default {
  data () {
    return {
      MemberId: JSON.parse(sessionStorage.getItem('key')),
      title: '',
      content: '',
      userId: '',
      message: ''
    }
  },
  mounted () {
    const token = JSON.parse(sessionStorage.getItem('key'));

    const decoded = jwt_decode(token[0]);

    this.userId = decoded.id; 
  },
  methods : {
    async addPost() {
        if (!this.title) {
          this.$alert("Votre post doit avoir un titre !");
        } else if (!this.content) {
          this.$alert("Votre post doit avoir un contenu !");
        } else {
          axios.post('http://localhost:8082/api/posts', 
          {
            MemberId: this.userId,
            title: this.title,
            content: this.content
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
                this.message = response.data;
                window.open("/reddit", "_self");
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

#newRedditPost {
    display: flex;
    flex-direction: column;
    align-content: center;
}

input {
    border: 1px solid $primary-color;
    margin-bottom: 20px;
    padding: 5px;

    &:last-child {
        background-color: $primary-color;
        color: white;
    }
}
</style>