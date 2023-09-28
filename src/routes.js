import { createRouter, createWebHistory } from 'vue-router';

// pages
import CoachList from './views/coaches/CoachesList';
const UserAuth = () => import('./views/auth/UserAuth');
const CoachDetails = () => import('./views/coaches/CoachDetails');
const CoachRegistration = () => import('./views/coaches/CoachRegistration');
const ContactCoach = () => import('./views/requests/ContactCoach');
const RequestsReceived = () => import('./views/requests/RequestsReceived');
const NotFound = () => import('./views/NotFound');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      meta: { zaba: true },
      children: [
        {
          path: 'contact',
          component: ContactCoach,
          meta: { requireStudent: true },
          name: "contactBtn",
        } // coaches/id/contact
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requireAuth: true }
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requireCoach: true }
    },
    {
      path: "/auth",
      component: UserAuth,
      meta: { requireUnauth: true }
    },
    {
      path: '/:not(.*)',
      name: "NotFound",
      component: NotFound,
    }
  ],
});

// store
import store from "./modules/index";

router.beforeEach((to, _, next) => {
  if(to.meta.requireAuth && !store.getters.isAuth) {
    next("/auth");
  } else if(to.meta.requireUnauth && store.getters.isAuth) {
    next("/coaches");
  } else if(to.meta.requireCoach && !store.getters[ 'coaches/isCoach' ]) {
    next("/coaches");
  } else if(to.meta.requireStudent && !store.getters.isAuth) {
    next(`/coaches/${ to.params.id }`);
  } else {
    next();
  }

  // const URL_contatc = `http://localhost:8080/coaches/${ to.params.id }/contact/`;
  // const URL_contatc2 = `http://localhost:8080/coaches/${ to.params.id }/contact`;

  // if(to.meta.zaba && store.getters[ 'coaches/isCoach' ]) return;
  // if(window.location.href == URL_contatc) {
  //   location.href = URL_contatc.replace('/contact/', '');
  // } else if(window.location.href == URL_contatc2) {
  //   location.href = URL_contatc2.replace('/contact', '');
  // }

  console.log(store.getters[ 'coaches/isCoach' ]);
});

export default router;