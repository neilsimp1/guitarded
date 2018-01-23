import Vuex from 'vuex';
import Note from '../../classes/Note';
import Tuning from '../../classes/Tuning';

const state = {
	numStrings: <number> 6,
	numFrets: <number> 19,
	tunings: <any> {
		
	}
};

const getters = {
	numStrings: (state: any) => state.numStrings,
	numFrets: (state: any) => state.numFrets,
	tuning: (state: any) => state.tuning,
};

const mutations = {
	updateNumStrings: (state: any, numStrings: number) => {
		state.numStrings = numStrings;
	},
	updateNumFrets: (state: any, numFrets: number) => {
		state.numFrets = numFrets;
	},
	updateTuning: (state: any, { stringNum, newNote }: any) => {
		state.tuning[stringNum] = newNote;
	}
};

const actions = {
	asyncDecrement: ({ commit }: any, asyncNum: any) => {
		setTimeout(() => {
			commit('decrement', asyncNum.by);
		}, asyncNum.duration);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
