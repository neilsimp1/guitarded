import INoteSet from './INoteSet';
import Note from './Note';
import scalesJson from '../data/scales.json';

export default class Scale implements INoteSet {

	public name: string;
	public intervals: [number];
	public root: string;
	public notes: [Note];

	private static scales: [Scale];

	constructor(name: string, intervals: [number], root: string = '') {
		this.name = name;
		this.intervals = intervals;
		this.root = root;

		if(root) this.buildScale();
	}

	public static getScales(): [Scale] {
		return scalesJson.map((s: any) => new Scale(s.name, s.intervals));
	}

	public static getScale(name: string, root: string | null = null): Scale {
		let scale = Scale.getScales().find(s => s.name === name) || new Scale('', [0]);
		if(!root) return scale;
		return new Scale(scale.name, scale.intervals, root);
	}

	private buildScale(): void {
		const rootNote: Note = Note.lookupNote(this.root);
		this.notes = [rootNote];
		for(const interval of this.intervals){
			this.notes.push(this.notes[this.notes.length - 1].getNextNote(interval));
		}
	}

}
