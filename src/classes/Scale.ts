import Note from './Note';
import scalesJson from '../data/scales.json';

export default class Scale {

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
		(window as any).Scale = Scale;
		return scalesJson.map((s: any) => new Scale(s.name, s.intervals));
	}

	public static getScale(name: string): Scale | undefined {
		return Scale.getScales().find(s => s.name === name);
	}

	private buildScale(): void {
		const rootNote: Note = Note.lookupNote(this.root);
		this.notes = [rootNote];
		for(const interval of this.intervals){
			this.notes.push(this.notes[this.notes.length - 1].getNextNote(interval));
		}
	}

}
