import Vuex from 'vuex';
import INoteSet from '../../classes/INoteSet';
import Note from '../../classes/Note';
import Tuning from '../../classes/Tuning';

const state = {
	handedness: <string> 'right',
	numFrets: <number> 19,
	numStrings: <number> 6,
	orientation: <string> 'horizontal',
	tuning: <Tuning | null> null,
	tunings: <any | null> null
};

const getters = {
	handedness: (state: any) => state.handedness,
	numFrets: (state: any) => state.numFrets,
	numStrings: (state: any) => state.numStrings,
	orientation: (state: any) => state.orientation,
	tuning: (state: any) => state.tuning,
	tunings: (state: any) => state.tunings
};

const mutations = {
	updateHandedness: (state: any, handedness: string) => state.handedness = handedness,
	updateNumFrets: (state: any, numFrets: number) => state.numFrets = numFrets,
	updateNumStrings: (state: any, numStrings: number) => state.numStrings = numStrings,
	updateOrientation: (state: any, orientation: string) => state.orientation = orientation,
	updateTuning: (state: any, tuning: Tuning) => state.tuning = tuning,
	updateTunings: (state: any, tunings: any) => state.tunings = tunings
};

const actions = {

};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
