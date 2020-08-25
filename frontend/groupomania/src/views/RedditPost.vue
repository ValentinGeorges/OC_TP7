<template>
    <div id="block_page_redditPost" v-if="loadedPost">
        <article class="redditPostArticle">
            <div class="redditPost">
                <h1>{{ posts.title }}</h1>
                <p>soumis par <router-link :to="`/users/${posts.MemberId}`">{{ posts.Member.username }}</router-link></p>
                <p id="postContent">{{ posts.content }}</p>
                <a id="buttonDelete" href="" @click.prevent="deletePost()" v-if="posts.MemberId === userId || isAdmin === true">Supprimer</a>
            </div>
        </article>
        <a href="" @click.prevent="isShowing ^= true" id="addComment">Ajouter un commentaire</a>
        <input type="text" name="comment" id="comment" placeholder="Votre commentaire..." v-if="isShowing" v-model="content" required>
        <a href="" id="submitComment" v-if="isShowing" @click.prevent="addComment()">Enregistrer le commentaire</a>
        <article class="redditPostComments" v-for="comment in comments" :key="comment.id" :data-commentId="`${comment.id}`">
            <p id="username"><router-link :to="`/users/${comment.MemberId}`">{{ comment.Member.username }}</router-link></p>
            <p>{{ comment.content }}</p>
            <a class="buttons" href="" @click.prevent="deleteComment" v-if="comment.MemberId === userId || isAdmin === true">Supprimer</a>
        </article>
    </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const token = JSON.parse(sessionStorage.getItem('key'));

export default {
    data() {
        return {
            posts: [],
            comments: [],
            isShowing: false,
            MemberId: JSON.parse(sessionStorage.getItem('key')),
            userId: '',
            isAdmin: '',
            content: '',
            message: '',
            loadedPost: false,
            loadedComments: false
        }
    },
    created() {
        let postId = window.location.pathname.substr(13);

        const token = JSON.parse(sessionStorage.getItem('key'));

        const decoded = jwt_decode(token[0]);

        this.userId = decoded.id;
        this.isAdmin = decoded.isAdmin; 

        axios.get('http://localhost:8082/api/posts/' + postId ,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                this.posts = response.data
                this.loadedPost = true
            })
            .catch(error => {console.log(error)});

        axios.get('http://localhost:8082/api/posts/' + postId + '/comments', 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                this.comments = response.data
                this.loadedComments = true
            })
            .catch(error => {console.log(error)});
    },
    methods: {
        addComment() {
            if (!this.content) {
                this.$alert("Votre commentaire ne peut pas être vide !")
            } else {
                axios.post('http://localhost:8082/api/comments', 
                {
                    content: this.content,
                    MemberId: this.userId,
                    PostId: this.posts.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                 .then(response => {
                    this.message = response.data;
                    window.history.go();
                })
                 .catch(error => {console.log(error)});
            }
        },
        deletePost() {
            let urlPost = window.location.pathname.substr(13);
            this.$confirm("Cette action est irréversible, voulez-vous vraiment supprimer ce post ?").then(() => {
                axios.delete('http://localhost:8082/api/posts/' + urlPost, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    this.message = response.data
                    window.open("/reddit", "_self");
                })
                .catch(error => {console.log(error)});
            })
        },
        deleteComment(e) {
            let commentArticle = e.srcElement.parentNode;
            let commentId = commentArticle.getAttribute('data-commentid');
            axios.delete('http://localhost:8082/api/comments/' + commentId, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                this.message = response.data
                window.alert("Ce commentaire a bien été supprimé !");
                window.history.go();
            })
            .catch(error => {console.log(error)});
        }
    }
}
</script>

<style lang="scss" scoped>
$primary-color: #FD2D01;
$secondary-color: #FFD7D7;

#block_page_redditPost {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
}
.redditPostArticle {
    width: 100%;
}

#postContent {
    background-color: $secondary-color;
    color: black;
    padding: 5px;
}

p {
    margin-top: 10px;
}

#addComment {
    color: $primary-color;
    margin-bottom: 20px;

    &:hover {
        text-decoration: underline;
    }
}

#submitComment {
    color: $primary-color;
    margin-bottom: 20px;

    &:hover {
        text-decoration: underline;
    }
}

#comment {
    border: 1px solid $primary-color;
    padding: 5px;
}

span {
    font-weight: bolder;
}

.redditPostComments {
    border: 1px solid $primary-color;
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 70px;
    }
}

#username {
    font-weight: bolder;
    &:hover {
        text-decoration: underline;
    }
}

.buttons {
    font-size: 0.7em;
    color: $primary-color;

    &:hover {
        text-decoration: underline;
    }
}

#buttonDelete {
    font-size: 0.7em;
    color: white;

    &:hover {
        text-decoration: underline;
    }
}
</style>