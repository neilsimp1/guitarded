import Vuex from 'vuex';
import ScaleBookStateLoader from './ScaleBookStateLoader';
import Note from '../../classes/Note';

const stateLoader = new ScaleBookStateLoader();

const state = {
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
};

const getters = {
	numStrings: (state: any) => state.scaleMode.numStrings,
	numFrets: (state: any) => state.scaleMode.numFrets,
	tuning: (state: any) => state.scaleMode.tuning,
};

const mutations = {
	updateNumStrings: (state: any, numStrings: number) => {
		state.scaleMode.numStrings = numStrings;
	},
	updateNumFrets: (state: any, numFrets: number) => {
		state.scaleMode.numFrets = numFrets;
	},
	updateTuning: (state: any, { stringNum, newNote }: any) => {
		state.scaleMode.tuning[stringNum] = newNote;
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
