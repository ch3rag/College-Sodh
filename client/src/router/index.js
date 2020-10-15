import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store/index';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUpInstitution from '../views/SignUp/SignUpInstitution.vue';
import SignUpStudent from '../views/SignUp/SignUpStudent.vue';
import DashboardInstitution from '../views/Institution/DashboardInstitution.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      Store.dispatch('auth/authenticate')
        .then(() => next())
        .catch(() => next());
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      Store.dispatch('auth/authenticate')
        .then(() => {
          next('/');
        })
        .catch(() => {
          next();
        });
    },
  },
  {
    path: '/signupinstitution',
    name: 'SignUpInstitution',
    component: SignUpInstitution,
    beforeEnter(to, from, next) {
      Store.dispatch('auth/authenticate')
        .then(() => {
          next('/');
        })
        .catch(() => {
          next();
        });
    },
  },
  {
    path: '/signupstudent',
    name: 'SignUpStudent',
    component: SignUpStudent,
    beforeEnter(to, from, next) {
      Store.dispatch('auth/authenticate')
        .then(() => {
          next('/');
        })
        .catch(() => {
          next();
        });
    },
  },
  {
    path: '/dashboardInstitution',
    name: 'DashboardInstitution',
    component: DashboardInstitution,
    beforeEnter(to, from, next) {
      Store.dispatch('auth/authenticate')
        .then(() => {
          next();
        })
        .catch(() => {
          next('/login');
        });
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
