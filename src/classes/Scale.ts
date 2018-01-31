import Note from './Note';
import scalesJson from '../data/scales.json';

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

	public static getScales(): [Scale] {
		return scalesJson.map((s: any) => new Scale(s.name, s.intervals));
	}

	public static async getScale(name: string): Promise<Scale|undefined> {
		return Scale.getScales().find(s => s.name === name);
	}

}
