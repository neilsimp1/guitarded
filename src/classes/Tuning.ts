import Note from './Note';
import tuningsJson from '../data/tunings.json';

export default class Tuning {

	public name: string;;
	public notes: [Note];

	constructor(name: string, notes: [Note]) {
		this.name = name;
		this.notes = notes;
	}

	public static getDefaultTunings(): any {
		let tunings: any = {};
		for(const numStrings in tuningsJson){
			for(const tuningArray in tuningsJson[numStrings]){
				if((tuningArray as string).indexOf('Standard') === 0){
					tunings[numStrings] = new Tuning(tuningArray, tuningsJson[numStrings][tuningArray].map(
						(noteName: string) => new Note(noteName, noteName.slice(0, 2))
					));
					break;
				}
			}
		}

		return tunings;
	}

	public static getDefaultTuning(numStrings: number): Tuning | null {
		for(const tuningArray in tuningsJson[numStrings]){
			if((tuningArray as string).indexOf('Standard') === 0){
				return new Tuning(tuningArray, tuningsJson[numStrings][tuningArray].map(
					(noteName: string) => new Note(noteName, noteName.slice(0, 2))
				));
			}
		}

		return null;
	}

	public static lookupTuningName(numStrings: number, notes: [Note]): string {
		const tuningsMatch = (notes: [Note], tuningArray: [string]): boolean => {
			return notes.every((note: Note, i: number) => notes[i].name === tuningArray[i]);
		};

		for(const tuningName in tuningsJson[numStrings]){
			if(tuningsMatch(notes, tuningsJson[numStrings][tuningName])) return tuningName;
		}

		return 'Custom tuning';
	}

}
