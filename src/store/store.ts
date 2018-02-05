import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import ScaleBookModule from './modules/ScaleBookModule';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		ScaleBookModule
	},
	getters,
	mutations,
	actions,
	plugins: [
		createPersistedState({ key: 'guitarkit' })
	]
});
