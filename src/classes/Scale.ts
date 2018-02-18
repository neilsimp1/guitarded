import INoteSet from './INoteSet';
import Note from './Note';
import NoteSet from './NoteSet';
import scalesJson from '../data/scales.json';

export default class Scale extends NoteSet implements INoteSet {

	public name: string;
	public intervals: number[];
	public root: string;
	public notes: Note[];

	private static scales: Scale[];

	constructor(name: string, intervals: number[], root: string = '') {
		super(name, intervals, root);
	}

	public static lookupName(root: string, notes: Note[]): string {
		const intervals: number[] = this.computeIntervals(root, notes);
		const scale: any = scalesJson.find((s: any) => this.intervalsEqual(s.intervals, intervals));
		return scale ? scale.name : 'Custom';
	}

	public static getScales(): Scale[] {
		return scalesJson.map((s: any) => new Scale(s.name, s.intervals));
	}

	public static getScale(name: string, root: string | null = null): Scale {
		let scale: Scale = Scale.getScales().find(s => s.name === name)!;
		if(!root) return scale;
		return new Scale(scale.name, scale.intervals, root);
	}

}
