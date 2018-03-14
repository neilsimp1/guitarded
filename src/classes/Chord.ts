import INoteSet from './INoteSet';
import Note from './Note';
import NoteSet from './NoteSet';
import Pitch from './Pitch';
import chordsJson from '../data/chords.json';

export default class Chord extends NoteSet implements INoteSet {

	private static chords: Chord[];

	constructor(name: string, intervals: number[], root: string = '') {
		super(name, intervals, root);
	}

	public static lookupName(root: string, notes: Note[]): string {
		const intervals: number[] = this.computeIntervals(root, notes);
		const chord: any = chordsJson.find((s: any) => this.intervalsEqual(s.intervals, intervals));
		return chord ? chord.name : 'Custom';
	}

	public static lookupNamesFuzzy(noteSet: INoteSet): INoteSet[] {
		const intervals: number[] = this.computeIntervals(noteSet.root, noteSet.notes);
		const chords: Chord[] = chordsJson.filter((c: any) => this.intervalsEqualFuzzy(c.intervals, intervals)).map((c: any) => new Chord(c.name, c.intervals));
		return chords.filter((c: Chord) => c.name !== noteSet.name);
	}

	public static lookupChordsInKey(noteSet: INoteSet): INoteSet[] {
		// const intervals: number[] = this.computeIntervals(noteSet.root, noteSet.notes);
		// const chords: Chord[] = chordsJson.filter((c: any) => this.intervalsEqualFuzzy(c.intervals, intervals)).map((c: any) => new Chord(c.name, c.intervals));
		// return chords.filter((c: Chord) => c.name !== noteSet.name);
		return [];
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
