import { createRouter, createWebHistory } from 'vue-router';

// pages
import CoachList from '@/views/coaches/CoachesList';
const UserAuth = () => import('@/views/auth/UserAuth');
const CoachDetails = () => import('@/views/coaches/CoachDetails');
const CoachRegistration = () => import('@/views/coaches/CoachRegistration');
const ContactCoach = () => import('@/views/requests/ContactCoach');
const RequestsReceived = () => import('@/views/requests/RequestsReceived');
const CoachUpdate = () => import('@/views/coaches/CoachUpdate');
const NotFound = () => import('@/views/NotFound');

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
      path: '/update',
      component: CoachUpdate,
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

  // console.log(store.getters[ 'coaches/isCoach' ]);
});

export default router;