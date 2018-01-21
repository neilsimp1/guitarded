import Vue from 'vue';
import Vuex from 'vuex';
import Note from './classes/Note';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		scaleMode: {
			// numStrings: <number> 6,
			// numFrets: <number> 19,
			// tuning: <[Note]> [
			// 	new Note('E', 'E'),
			// 	new Note('A', 'A'),
			// 	new Note('D', 'D'),
			// 	new Note('G', 'G'),
			// 	new Note('B', 'B'),
			// 	new Note('E', 'E')
			// ]
			numStrings: <number | null> null,
			numFrets: <number | null> null,
			tuning: <[Note] | null> null
		}
	},

	getters: {
		numStrings: state => state.scaleMode.numStrings,
		numFrets: state => state.scaleMode.numFrets,
		tuning: state => state.scaleMode.tuning,
	},

	mutations: {
		updateNumStrings: (state: any, numStrings: number) => {
			state.scaleMode.numStrings = numStrings;
		},
		updateNumFrets: (state: any, numFrets: number) => {
			state.scaleMode.numFrets = numFrets;
		},
		updateTuning: (state: any, { stringNum, newPitch }) => {
			state.scaleMode.tuning[stringNum] = newPitch;
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
