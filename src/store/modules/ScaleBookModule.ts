import Vuex from 'vuex';
import INoteSet from '../../classes/INoteSet';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';
import Tuning from '../../classes/Tuning';

const state = {
	key: <string> 'C',
	mode: <string> 'browser',
	notesPicked: <INoteSet | null> null,
	numFrets: <number> 19,
	numStrings: <number> 6,
	scale: <Scale | null> null,
	scales: <Map<string, Scale> | null> null,
	tuning: <Tuning | null> null,
	tunings: <any | null> null
};

const getters = {
	key: (state: any) => state.key,
	mode: (state: any) => state.mode,
	notesPicked: (state: any) => state.notesPicked,
	numFrets: (state: any) => state.numFrets,
	numStrings: (state: any) => state.numStrings,
	scale: (state: any) => state.scale,
	scales: (state: any) => state.scales,
	tuning: (state: any) => state.tuning,
	tunings: (state: any) => state.tunings
};

const mutations = {
	updateKey: (state: any, key: string) => state.key = key,
	updateMode: (state: any, mode: string) => state.mode = mode,
	updateNotesPicked: (state: any, notesPicked: INoteSet) => state.notesPicked = notesPicked,
	updateNumFrets: (state: any, numFrets: number) => state.numFrets = numFrets,
	updateNumStrings: (state: any, numStrings: number) => state.numStrings = numStrings,
	updateScale: (state: any, scale: Scale) => state.scale = scale,
	updateScales: (state: any, scales: Map<string, Scale>) => state.scales = scales,
	updateTuning: (state: any, tuning: Tuning) => state.tuning = tuning,
	updateTunings: (state: any, tunings: any) => state.tunings = tunings
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
