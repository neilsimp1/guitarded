import Vue from 'vue';
import Router from 'vue-router';
import ScaleBook from './components/ScaleBook/ScaleBook.vue';
import Metronome from './components/Metronome/Metronome.vue';
import Tuner from './components/Tuner/Tuner.vue';

Vue.use(Router);

const routes: any[] = [
    {
        name: 'home',
		path: '/',
		component: null
    }, {
        name: 'scalebook',
        path: '/scalebook',
        component: ScaleBook
    }, {
        name: 'click',
        path: '/click',
        component: Metronome
    }, {
        name: 'tuner',
        path: '/tuner',
        component: Tuner
    }
];

export default new Router({ mode: 'history', routes });
