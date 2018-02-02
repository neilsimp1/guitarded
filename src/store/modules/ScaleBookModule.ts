import Vuex from 'vuex';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';
import Tuning from '../../classes/Tuning';

const state = {
	numStrings: <number> 6,
	numFrets: <number> 19,
	tunings: <any | null> null,
	tuning: <Tuning | null> null,
	scales: <Map<string, Scale> | null> null,
	scale: <Scale | null> null,
	key: <string> 'C'
};

const getters = {
	numStrings: (state: any) => state.numStrings,
	numFrets: (state: any) => state.numFrets,
	tunings: (state: any) => state.tunings,
	tuning: (state: any) => state.tuning,
	scales: (state: any) => state.scales,
	scale: (state: any) => state.scale,
	key: (state: any) => state.key
};

const mutations = {
	updateNumStrings: (state: any, numStrings: number) => state.numStrings = numStrings,
	updateNumFrets: (state: any, numFrets: number) => state.numFrets = numFrets,
	updateTunings: (state: any, tunings: any) => state.tunings = tunings,
	updateTuning: (state: any, tuning: Tuning) => state.tuning = tuning,
	updateScales: (state: any, scales: Map<string, Scale>) => state.scales = scales,
	updateScale: (state: any, scale: Scale) => state.scale = scale,
	updateKey: (state: any, key: string) => state.key = key
};

const actions = {
	// updateTunings(context: any, tunings: any) {
	// 	context.commit('updateTunings', tunings);
	// },
	// updateScales(context: any, scales: [Scale]) {
	// 	context.commit('updateScales', scales);
	// },
	// updateScale(context: any, scale: Scale) {
	// 	context.commit('updateScale', scale);
	// }
};

export default {
	state,
	getters,
	mutations,
	actions
};
