import Vue from 'vue';
import Router from 'vue-router';
import AppScales from './components/AppScales.vue';
import AppMetronome from './components/AppMetronome.vue';
import AppTuner from './components/AppTuner.vue';

Vue.use(Router);

const routes: any[] = [
    {
        name: 'home',
		path: '/',
		component: null
    }, {
        name: 'scalez',
        path: '/scalez',
        component: AppScales
    }, {
        name: 'clickz',
        path: '/clickz',
        component: AppMetronome
    }, {
        name: 'tunerz',
        path: '/tunerz',
        component: AppTuner
    }
];

export default new Router({ mode: 'history', routes });
