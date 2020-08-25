<template>
    <div id="block_page_profile">
        <a id="deleteAccount" href="" @click.prevent="deleteAccount()" v-if="member.id === userId || isAdmin === true">Supprimer le compte</a>
        <h1>Dernières participations de {{ member.username }} :</h1>
        <article class="redditPostArticle" v-for="post in posts" :key="post.id">
            <div class="redditPost">
                <router-link :to="`/reddit/post/${post.id}`"><span>{{ post.title }}</span></router-link>
                <p>soumis par {{ post.Member.username }}</p>
            </div>
        </article>
    </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
    data() {
        return {
            posts: [],
            member: [],
            message: '',
            userId: '',
            isAdmin: ''
        }
    },
    mounted () {
        const token = JSON.parse(sessionStorage.getItem('key'));
        const decoded = jwt_decode(token[0]);
        this.userId = decoded.id;
        this.isAdmin = decoded.isAdmin;

        axios.get('http://localhost:8082/api/members/' + this.userId + '/posts', 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                this.posts = response.data
            })
            .catch(error => {console.log(error)});

        axios.get('http://localhost:8082/api/members/' + this.userId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                this.member = response.data
            })
            .catch(error => {console.log(error)});
    },
    methods: {
        deleteAccount() {
            const token = JSON.parse(sessionStorage.getItem('key'));
            const decoded = jwt_decode(token[0]);
            this.userId = decoded.id;
            this.isAdmin = decoded.isAdmin;
            this.$confirm("Cette action est irréversible, voulez-vous vraiment supprimer votre compte ?").then(() => {
                axios.delete('http://localhost:8082/api/members/' + this.userId, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    this.message = response.data
                    if(this.isAdmin) {
                        window.open("/users", "_self");
                    } else {
                        sessionStorage.clear();
                        window.open("/login", "_self");
                    }
                })
                .catch(error => {console.log(error)});
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$primary-color: #FD2D01;
$secondary-color: #FFD7D7;

#block_page_profile {
    margin: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.redditPost {
    text-align: left;
}

h1 {
    margin-bottom: 20px;
}

#deleteAccount {
    background-color: $primary-color;
    width: 220px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: white;
    font-weight: bold;
    width: 100%;
}
</style>