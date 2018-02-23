import Note from './Note';
import pitchesJson from '../data/pitches.json';

export default class Pitch {

	public name: string;
	public displayName: string;
	public octave: number;
	public wavelength: number;
	public frequency: number;

	constructor(name: string, displayName: string, octave: number, wavelength: number, frequency: number) {
		this.name = name;
		this.displayName = displayName;
		this.octave = octave;
		this.wavelength = wavelength;
		this.frequency = frequency;
	}

	public static getPitchesFromNotes(notes: Note[], octave: number): Pitch[] {
		let pitches: Pitch[] = [];
		let foundFirst: boolean = false;
		for(let i = 0; i < pitchesJson.length; i++){
			let asd = pitchesJson[i];
			if(!foundFirst && pitchesJson[i].octave === octave && pitchesJson[i].displayName === notes[0].name) foundFirst = true;
			if(foundFirst){
				if(notes.some((n: Note) => n.name === pitchesJson[i].displayName)){
					if(pitches.length > 1 && pitchesJson[i].displayName === notes[0].name) break;
					pitches.push(new Pitch(pitchesJson[i].name, pitchesJson[i].displayName, pitchesJson[i].octave, pitchesJson[i].wavelength, pitchesJson[i].frequency));
				}
			}
		}

		return pitches;
	}

}
