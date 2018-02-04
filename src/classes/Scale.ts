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

	public static lookupScaleName(root: string, notes: [Note]): string {
		const intervals: [number] = Scale.computeIntervals(root, notes);
		const intervalsEqual = (a: [number], b: [number]): boolean => {
			if(a.length !== b.length) return false;
			for(let i = 0; i < a.length; i++){
				if(a[i] !== b[i]) return false;
			}
			return true;
		};

		const scale: any = scalesJson.find((s: any) => intervalsEqual(s.intervals, intervals));

		return scale ? scale.name : 'Custom';
	}

	public static getScales(): [Scale] {
		return scalesJson.map((s: any) => new Scale(s.name, s.intervals));
	}

	public static getScale(name: string, root: string | null = null): Scale {
		let scale = Scale.getScales().find(s => s.name === name) || new Scale('', [0]);
		if(!root) return scale;
		return new Scale(scale.name, scale.intervals, root);
	}

	// TODO: Put in base class NoteSet
	public static sort(root: string, notes: [Note]): [Note] {
		let alphaSorted: [Note] = notes.sort((n1: Note, n2: Note) => {
			if(n1.name < n2.name) return -1;
			if(n1.name === n2.name) return 0;
			return 1;
		});

		if(root === 'A') return alphaSorted;

		const removeUpTo: number = alphaSorted.findIndex((n: Note) => n.name === root);
		const sorted: [Note] = (alphaSorted.concat(alphaSorted.splice(0, removeUpTo)) as [Note]);

		return sorted;
	}

	// TODO: Put in base class NoteSet
	private static computeIntervals(root: string, notes: [Note]): [number] {
		let intervals: [number] = [0];
		for(let i = 1; i < notes.length; i++){
			intervals[i - 1] = Note.getInterval(notes[i - 1], notes[i]);
		}

		return intervals;
	}

	// TODO: maybe rename to build() and put in interface to use in Chord?
	// Same could even go for getScales(), getScale()
	private buildScale(): void {
		const rootNote: Note = Note.lookupNote(this.root);
		this.notes = [rootNote];
		for(const interval of this.intervals){
			this.notes.push(this.notes[this.notes.length - 1].getNextNote(interval));
		}
	}

}
