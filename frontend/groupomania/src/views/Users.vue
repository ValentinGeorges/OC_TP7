<template>
    <div>
        <h1>Voici la liste des membres du site :</h1>
        <article v-for="member in members" :key="member.id">
            <router-link :to="`/users/${member.id}`">{{ member.username }}</router-link>
        </article>
    </div>
</template>

<script>
import axios from 'axios'

const token = JSON.parse(sessionStorage.getItem('key'));

export default {
    data () {
        return {
            members: []
        }
    },
    mounted () {
        axios.get('http://localhost:8082/api/members', {
           headers: {
            Authorization: `Bearer ${token}`
        }})
            .then(response => {
                this.members = response.data
            })
            .catch(error => {console.log(error)});
    }
}
</script>

<style lang="scss" scoped>
$primary-color: #FD2D01;
$secondary-color: #FFD7D7;
h1 {
    margin-bottom: 20px;
}

article {
    padding: 10px;
    text-align: center;

    &:last-child {
        margin-bottom: 70px;
    }
}

a {
    color: $primary-color;

    &:hover {
        text-decoration: underline;
    }
}
</style>