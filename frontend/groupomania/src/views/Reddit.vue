<template>
    <div id="block_page_reddit">
        <router-link id="newRedditPostButton" to="/reddit/new">Soumettre un nouveau post</router-link>
        <article class="redditPostArticle" v-for="post in posts" :key="post.id">
            <div class="redditPost">
                <router-link :to="`/reddit/post/${post.id}`"><span>{{ post.title }}</span></router-link>
                <p>soumis par <router-link :to="`/users/${post.MemberId}`">{{ post.Member.username }}</router-link></p>
            </div>
        </article>
        <router-view/>
    </div>
</template>

<script>
import axios from 'axios'

const token = JSON.parse(sessionStorage.getItem('key'));

export default {
    data() {
        return {
            posts: []
        }
    },
    mounted () {
        axios.get('http://localhost:8082/api/posts', {
           headers: {
            Authorization: `Bearer ${token}`
        }})
            .then(response => {
                this.posts = response.data
            })
            .catch(error => {console.log(error)});
    }
}
</script>

<style lang="scss">
$primary-color: #FD2D01;
$secondary-color: #FFD7D7;

#block_page_reddit {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
}

#newRedditPostButton {
    background-color: $primary-color;
    width: 220px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: white;
    font-weight: bold;
}

.redditPostArticle{
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    min-width: 100%;

    &:last-child {
        margin-bottom: 70px;
    }
}

.redditPost {
    min-width: 100%;
    background-color: $primary-color;
    color: white;
    padding: 5px;
    overflow-wrap: break-word;

    a {
        color: white;
    }

    a:hover {
        text-decoration: underline;
    }
}

span {
    font-weight: bolder;
}

p {
    margin-top: 5px;
}
</style>