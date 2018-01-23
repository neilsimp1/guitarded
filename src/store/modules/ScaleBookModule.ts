import Vuex from 'vuex';
import Note from '../../classes/Note';
import Tuning from '../../classes/Tuning';

const state = {
	numStrings: <number> 6,
	numFrets: <number> 19,
	tunings: <any | null> null,
	tuning: <Tuning | null> null
};

(async () => { // NEED TO DO THESE UPDATES VIA ACTIONS???
	const defaultTunings: any = await Tuning.getAllDefaultTunings();
	state.tunings = defaultTunings;
	const tuning: Tuning = await Tuning.getDefaultTuning(6);
	state.tuning = tuning;
})();

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

};

export default {
	state,
	getters,
	mutations,
	actions
};
