import Vue from 'vue';
import router from './router';
import App from './components/App.vue';

Vue.config.devtools = true;

window.onload = () => {
	(<any>window).app = new Vue({
        router,
		el: '#app',
		components: { App },
		render: h => h(App)
	});
};
