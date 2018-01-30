import Note from './Note';

export default class Scale {

	public name: string;
	public intervals: [number];
	public root: string | null;

	private static scaleDict: Map<string, Scale>;

	constructor(name: string, intervals: [number], root: string | null = null) {
		this.name = name;
		this.intervals = intervals;
		this.root = root;
	}

	public static async loadScaleDict(): Promise<Map<string, Scale>> {
		Scale.scaleDict	= new Map<string, Scale>();
		const response: Response = await fetch('/assets/scales.json');
		const scales: any = await response.json();

		for(const scaleName in scales){
			Scale.scaleDict.set(scaleName, new Scale(scaleName, scales[scaleName].intervals));
		}

		return Scale.scaleDict;
	}

	public static async getAllScales(): Promise<Map<string, Scale>> {
		if(!Scale.scaleDict) Scale.loadScaleDict();
		return Scale.scaleDict;
	}

	public static async getScale(name: string): Promise<Scale> {
		if(!Scale.scaleDict) Scale.loadScaleDict();
		return Scale.scaleDict.get(name) || new Scale('', [0]);
	}

}
