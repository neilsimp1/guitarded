import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		counter: 0
	},

	getters: {
		tripleCounter: state => {
			return state.counter * 3;
		}
	},

	mutations: {
		increment: (state, num) => {
			state.counter += num;
		}
	},

	actions: {
		asyncDecrement: ({ commit }, asyncNum) => {
			setTimeout(() => {
				commit('decrement', asyncNum.by);
			}, asyncNum.duration);
		}
	}
});
