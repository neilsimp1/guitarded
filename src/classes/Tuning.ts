import Note from './Note';
import tuningsJson from '../data/tunings.json';

export default class Tuning {

	public name: string;;
	public notes: [Note];
	public isStandard: boolean;

	constructor(name: string, notes: [Note], isStandard = false) {
		this.name = name;
		this.notes = notes;
		this.isStandard = isStandard;
	}

	public static getDefaultTunings(): any {
		let tunings: any = {};
		for(const numStrings in tuningsJson){
			for(const tuningName in tuningsJson[numStrings]){
				if(tuningsJson[numStrings][tuningName].isStandard){
					tunings[numStrings] = new Tuning(tuningName, tuningsJson[numStrings][tuningName]['tuning'].map(
						(noteName: string) => new Note(noteName, noteName.slice(0, 2))
					), true);
					break;
				}
			}
		}

		return tunings;
	}

	public static getDefaultTuning(numStrings: number): Tuning | null {
		for(const tuningName in tuningsJson[numStrings]){
			if(tuningsJson[numStrings][tuningName]['isStandard']){
				return new Tuning(tuningName, tuningsJson[numStrings][tuningName]['tuning'].map(
					(noteName: string) => new Note(noteName, noteName.slice(0, 2))
				), true);
			}
		}

		return null;
	}

	public static lookupTuningName(numStrings: number, notes: [Note]): string {
		const tuningsMatch = (notes: [Note], tuningArray: [string]): boolean => {
			return notes.every((note: Note, i: number) => notes[i].name === tuningArray[i]);
		};

		for(const tuningName in tuningsJson[numStrings]){
			if(tuningsMatch(notes, tuningsJson[numStrings][tuningName].tuning)) return tuningName;
		}

		return 'Custom tuning';
	}

	public static lookupTuning(numStrings: number, name: string): Tuning {
		const tuningJson = tuningsJson[numStrings][name];
		
		return new Tuning(
			name,
			tuningJson.tuning.map((noteName: string) => new Note(noteName, noteName.slice(0, 2))),
			tuningJson.isStandard || false
		)
	}

	public static getTuningsForNumStrings(numStrings: number): [Tuning] {
		let tunings = [];

		for(const tuningName in tuningsJson[numStrings]){
			tunings.push(new Tuning(
				tuningName,
				tuningsJson[numStrings][tuningName].tuning.map((noteName: string) => new Note(noteName, noteName.slice(0, 2))),
				tuningsJson[numStrings][tuningName].isStandard || false
			));
		}

		return tunings as [Tuning];
	}

}
