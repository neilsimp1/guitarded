import Note from './Note';

export default class Tuning {

	public name: string;;
	public notes: [Note];
	private static defaultTunings: any = null;

	constructor(name: string, notes: [Note]) {
		this.name = name;
		this.notes = notes;
	}

	public static async getDefaultTuning(numStrings: number): Promise<Tuning> {
		if(!Tuning.defaultTunings){
			Tuning.defaultTunings = {};
			const response: Response = await fetch('/assets/tunings.json');
			const tuningSets: any = await response.json();
			for(const numStrings in tuningSets){
				for(const tuningArray in tuningSets[numStrings]){
					if((tuningArray as string).indexOf('Standard') === 0){
						const tuning = new Tuning(tuningArray, tuningSets[numStrings][tuningArray].map(
							(noteName: string) => new Note(noteName, noteName.slice(0, 2))
						));
						Tuning.defaultTunings[numStrings] = tuning;
						continue;
					}
				}
			}
		}

		return Tuning.defaultTunings[numStrings];
	}

	public static async getAllDefaultTunings(): Promise<any> {
		return {
			"3": await Tuning.getDefaultTuning(3),
			"4": await Tuning.getDefaultTuning(4),
			"5": await Tuning.getDefaultTuning(5),
			"6": await Tuning.getDefaultTuning(6),
			"7": await Tuning.getDefaultTuning(7),
			"8": await Tuning.getDefaultTuning(8),
			"9": await Tuning.getDefaultTuning(9),
			"10": await Tuning.getDefaultTuning(10),
			"11": await Tuning.getDefaultTuning(11),
			"12": await Tuning.getDefaultTuning(12)
		};
	}

}
