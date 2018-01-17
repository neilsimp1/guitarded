export default class Pitch {

	public name: string;
	public displayName: string;
	public octave: number;
	public wavelength: number;
	public frequency: number;

	constructor(name: string, pitches: any) {
		this.name = name;
		this.displayName = pitches[name].displayName;
		this.octave = pitches[name].octave;
		this.wavelength = pitches[name].wavelength;
		this.frequency = pitches[name].frequency;
	}

}
