import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Reddit from '../views/Reddit.vue'
import NewRedditPost from '../views/NewRedditPost.vue'
import RedditPost from '../views/RedditPost.vue'
import NineGag from '../views/9GAG.vue'
import Profile from '../views/Profile.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import LegalMentions from '../views/LegalMentions.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/reddit',
    name: 'Reddit',
    component: Reddit
  },
  {
    path: '/reddit/new',
    name: 'NewRedditPost',
    component: NewRedditPost
  },
  {
    path: '/reddit/post/:id',
    name: 'Post',
    component: RedditPost
  },
  {
    path: '/9gag',
    name: '9GAG',
    component: NineGag
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User
  },
  {
    path: '/legalMentions',
    name: 'LegalMentions',
    component: LegalMentions
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
