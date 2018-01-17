import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes: any[] = [
    {
        name: 'Home',
        path: '/'
    }//,
    // {
    //     name: 'scalezzzzz',
    //     path: '/scalezzzzz',
    //     component: zzzzzzzzzz
    // }
];

const router: Router = new Router({
    mode: 'history',
    routes
});

export default router;
