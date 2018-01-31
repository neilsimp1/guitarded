import Note from './Note';

export default class Scale {

	public name: string;
	public intervals: [number];
	public root: string | null;

	private static scales: [Scale];

	constructor(name: string, intervals: [number], root: string | null = null) {
		this.name = name;
		this.intervals = intervals;
		this.root = root;
	}

	public static async loadScales(): Promise<[Scale]> {
		const response: Response = await fetch('/assets/scales.json');
		const scalesJson: [any] = await response.json();

		(Scale.scales as any) = scalesJson.map((s: any) => new Scale(s.name, s.intervals));

		return Scale.scales;
	}

	public static async getAllScales(): Promise<[Scale]> {
		if(!Scale.scales) await Scale.loadScales();
		return Scale.scales;
	}

	public static async getScale(name: string): Promise<Scale> {
		if(!Scale.scales) Scale.loadScales();
		return Scale.scales.find(s => s.name === name) || new Scale('', [0]);
	}

}
