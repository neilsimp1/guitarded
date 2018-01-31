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
	scale: <Scale | null> null
};

const getters = {
	numStrings: (state: any) => state.numStrings,
	numFrets: (state: any) => state.numFrets,
	tunings: (state: any) => state.tunings,
	tuning: (state: any) => state.tuning,
	scales: (state: any) => state.scales,
	scale: (state: any) => state.scale
};

const mutations = {
	updateNumStrings: (state: any, numStrings: number) => state.numStrings = numStrings,
	updateNumFrets: (state: any, numFrets: number) => state.numFrets = numFrets,
	updateTunings: (state: any, tunings: any) => state.tunings = tunings,
	updateTuningAll: (state: any, tuning: Tuning) => state.tuning = tuning,
	updateTuningName: (state: any, name: string) => state.tuning.name = name,
	updateTuning: (state: any, { stringNum, newNote }: any) => state.tuning.notes[stringNum - 1] = newNote,
	updateScales: (state: any, scales: Map<string, Scale>) => state.scales = scales,
	updateScale: (state: any, scale: Scale) => state.scale = scale
};

const actions = {
	// updateTunings(context: any, tunings: any) {
	// 	context.commit('updateTunings', tunings);
	// },
	// updateTuningAll(context: any, tuning: Tuning) {
	// 	context.commit('updateTuningAll', tuning);
	// },
	// updateTuningName(context: any, name: string) {
	// 	context.commit('updateTuningName', name);
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
