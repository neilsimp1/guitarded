import Vue from 'vue';
import router from './router';
import App from './components/App.vue';
import store from './store/store';
import './sass/app.scss';

Vue.config.devtools = true;

window.onload = () => {
	(<any>window).app = new Vue({
		el: '#app',
		router,
		store,
		components: { App },
		render: h => h(App)
	});
	(() => {'serviceWorker' in navigator&&navigator.serviceWorker.register('/sw.js',{scope:'/'})})();
};
