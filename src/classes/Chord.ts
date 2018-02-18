import INoteSet from './INoteSet';
import Note from './Note';
import NoteSet from './NoteSet';
import chordsJson from '../data/chords.json';

export default class Chord extends NoteSet implements INoteSet {

	public name: string;
	public intervals: number[];
	public root: string;
	public notes: Note[];

	private static chords: Chord[];

	constructor(name: string, intervals: number[], root: string = '') {
		super(name, intervals, root);
	}

	public static lookupName(root: string, notes: Note[]): string {
		const intervals: number[] = this.computeIntervals(root, notes);
		const chord: any = chordsJson.find((s: any) => this.intervalsEqual(s.intervals, intervals));
		return chord ? chord.name : 'Custom';
	}

	public static getChords(): Chord[] {
		return chordsJson.map((s: any) => new Chord(s.name, s.intervals));
	}

	public static getChord(name: string, root: string | null = null): Chord {
		let chord: Chord = Chord.getChords().find(c => c.name === name)!;
		if(!root) return chord;
		return new Chord(chord.name, chord.intervals, root);
	}

}
