import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import Home from './components/HelloWorld'
import LoginViewComponent from './views/LoginViewComponent'
import RegisterViewComponent from './views/RegisterViewComponent'
import ProjectViewComponent from './views/ProjectViewComponent'

import auth from "./middlewares/authMiddleware";

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast, {
  position: "bottom"
});

import VTooltip from 'v-tooltip'

Vue.use(VTooltip);

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '10px'
})

import './assets/styles/index.css';

Vue.config.productionTip = false
Vue.use(VueRouter);


const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'ProjectView',
      component: ProjectViewComponent,
      meta: {
        // Hint: try to switch those two around to see
        // how this affects execution of the callbacks.
        middleware: auth,
      },
    },    
    {
      path: '/login',
      name: 'LoginView',
      component: LoginViewComponent
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterViewComponent
    },
    // {
    //   path: '/',
    //   component: Home
    // },
  ]
})


// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});
  



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
