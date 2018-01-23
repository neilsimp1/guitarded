import Note from './Note';

export default class Tuning {

	public notes: [Note];
	private static defaultTunings: any = null;

	constructor(notes: [Note]) {
		this.notes = notes;
	}

	public static async getDefaultTuning(numStrings: number): Promise<Tuning> {
		if(!Tuning.defaultTunings){
			Tuning.defaultTunings = {};
			const response: Response = await fetch('/assets/tunings.json');
			const tuningArrays: any = await response.json();
			for(const key in tuningArrays){
				const tuning = new Tuning(tuningArrays[key].map((noteName: string) => new Note(noteName, noteName.slice(0, 2))));
				Tuning.defaultTunings[key] = tuning;
			}
		}

		return Tuning.defaultTunings[numStrings];
	}

	public static async getAllDefaultTunings(): Promise<any> {
		return await {
			"3": Tuning.getDefaultTuning(3),
			"4": Tuning.getDefaultTuning(4),
			"5": Tuning.getDefaultTuning(5),
			"6": Tuning.getDefaultTuning(6),
			"7": Tuning.getDefaultTuning(7),
			"8": Tuning.getDefaultTuning(8),
			"9": Tuning.getDefaultTuning(9),
			"10": Tuning.getDefaultTuning(10),
			"11": Tuning.getDefaultTuning(11),
			"12": Tuning.getDefaultTuning(12)
		};
	}

}
