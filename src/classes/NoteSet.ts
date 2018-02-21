import INoteSet from './INoteSet';
import Note from './Note';

export default class NoteSet implements INoteSet {

	public name: string;
	public intervals: number[];
	public root: string;
	public notes: Note[];

	constructor(name: string, intervals: number[], root: string) {
		this.name = name;
		this.intervals = intervals;
		this.root = root;

		if(root) this.build();
	}

	public static sort(root: string, notes: Note[]): Note[] {
		let alphaSorted: Note[] = notes.sort((n1: Note, n2: Note) => {
			if(n1.name < n2.name) return -1;
			if(n1.name === n2.name) return 0;
			return 1;
		});

		if(root === 'A') return alphaSorted;

		const removeUpTo: number = alphaSorted.findIndex((n: Note) => n.name === root);
		const sorted: Note[] = alphaSorted.concat(alphaSorted.splice(0, removeUpTo));

		return sorted;
	}

	protected static computeIntervals(root: string, notes: Note[]): number[] {
		let intervals: number[] = [];
		for(let i = 1; i < notes.length; i++){
			intervals[i - 1] = Note.getInterval(notes[i - 1], notes[i]);
		}

		return intervals!;
	}

	protected build(): void {
		const rootNote: Note = Note.lookupNote(this.root);
		this.notes = [rootNote];
		for(const interval of this.intervals){
			this.notes.push(this.notes[this.notes.length - 1].getNextNote(interval));
		}
	}

	protected static intervalsEqual (a: number[], b: number[]): boolean {
		if(a.length !== b.length) return false;
		for(let i = 0; i < a.length; i++){
			if(a[i] !== b[i]) return false;
		}
		return true;
	}

}
