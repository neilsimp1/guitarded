import Vuex from 'vuex';
import Note from '../../classes/Note';
import Tuning from '../../classes/Tuning';

const state = {
	numStrings: <number> 6,
	numFrets: <number> 19,
	tunings: <any> {
		_3: new Tuning([
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D')
		]),
		_4: new Tuning([
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G')
		]),
		_5: new Tuning([
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('B', 'B')
		]),
		_6: new Tuning([
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('B', 'B'),
			new Note('E', 'E')
		]),
		_7: new Tuning([
			new Note('B', 'B'),
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('B', 'B'),
			new Note('E', 'E')
		]),
		_8: new Tuning([
			new Note('F#/Gb', 'F#'),
			new Note('B', 'B'),
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('B', 'B'),
			new Note('E', 'E')
		]),
		_9: new Tuning([
			new Note('C#/Db', 'C#'),
			new Note('F#/Gb', 'F#'),
			new Note('B', 'B'),
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('B', 'B'),
			new Note('E', 'E')
		]),
		_10: new Tuning([
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('B', 'B'),
			new Note('E', 'E')
		]),
		_11: new Tuning([
			new Note('B', 'B'),
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('B', 'B'),
			new Note('E', 'E')
		]),
		_12: new Tuning([
			new Note('E', 'E'),
			new Note('E', 'E'),
			new Note('A', 'A'),
			new Note('A', 'A'),
			new Note('D', 'D'),
			new Note('D', 'D'),
			new Note('G', 'G'),
			new Note('G', 'G'),
			new Note('B', 'B'),
			new Note('B', 'B'),
			new Note('E', 'E'),
			new Note('E', 'E')
		])
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
