import Vuex from 'vuex';
import Note from '../../classes/Note';
import Tuning from '../../classes/Tuning';

const state = {
	numStrings: <number> 6,
	numFrets: <number> 19,
	tunings: <any | null> null,
	tuning: <Tuning | null> null
};

const getters = {
	numStrings: (state: any) => state.numStrings,
	numFrets: (state: any) => state.numFrets,
	tunings: (state: any) => state.tunings,
	tuning: (state: any) => state.tuning
};

const mutations = {
	updateNumStrings: (state: any, numStrings: number) => {
		state.numStrings = numStrings;
	},
	updateNumFrets: (state: any, numFrets: number) => {
		state.numFrets = numFrets;
	},
	updateTunings: (state: any, tunings: any) => {
		state.tunings = tunings;
	},
	updateTuningAll: (state: any, tuning: Tuning) => {
		state.tuning = tuning;
	},
	updateTuning: (state: any, { stringNum, newNote }: any) => {
		state.tuning[stringNum] = newNote;
	}
};

const actions = {
	updateTunings(context: any, tunings: any) {
		context.commit('updateTunings', tunings);
	},
	updateTuningAll(context: any, tuning: Tuning) {
		context.commit('updateTuningAll', tuning);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
