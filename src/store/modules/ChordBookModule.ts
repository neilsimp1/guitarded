import Vuex from 'vuex';
import INoteSet from '../../classes/INoteSet';
import Chord from '../../classes/Chord';

const state = {
	mode: <string> 'browser',
	notesPicked: <INoteSet | null> null,
	chord: <Chord | null> null,
	chords: <Map<string, Chord> | null> null,
	root: <string> 'C'
};

const getters = {
	mode: (state: any) => state.mode,
	notesPicked: (state: any) => state.notesPicked,
	chord: (state: any) => state.chord,
	chords: (state: any) => state.chords,
	root: (state: any) => state.root
};

const mutations = {
	updateMode: (state: any, mode: string) => state.mode = mode,
	updateNotesPicked: (state: any, notesPicked: INoteSet) => state.notesPicked = notesPicked,
	updateChord: (state: any, chord: Chord) => state.chord = chord,
	updateChords: (state: any, chords: Map<string, Chord>) => state.chords = chords,
	updateRoot: (state: any, root: string) => state.root = root
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
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
