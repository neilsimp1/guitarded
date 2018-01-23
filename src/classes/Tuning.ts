import Note from './Note';

export default class Tuning {

	public notes: [Note];
	private static defaultTunings: any = null;

	constructor(notes: [Note]) {
		this.notes = notes;
	}

	// public static getDefaultTuning(numStrings: number): Tuning {
	// 	if(!Tuning.defaultTunings){
	// 		fetch('/assets/tunings.json').then(response => {
	// 			debugger
	// 		}).catch(err => {
	// 			console.error(err);
	// 		});
	// 	}
	// }

}
