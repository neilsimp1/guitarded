import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import ChordBookModule from './modules/ChordBookModule';
import GuitarModule from './modules/GuitarModule';
import ScaleBookModule from './modules/ScaleBookModule';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		ChordBookModule,
		GuitarModule,
		ScaleBookModule
	},
	getters,
	mutations,
	actions,
	plugins: [
		createPersistedState({ key: 'guitarkit' })
	]
});
