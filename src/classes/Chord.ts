import IChordSet from './IChordSet';
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

	private static findChordsByRoot(root: string, notes: Note[]): Chord[] {
		let matchedChords: Chord[] = [];

		for(const chordJson of chordsJson){
			const chord: Chord = new Chord(chordJson.name, chordJson.intervals, root);
			if(chord.notes.every(chordNote => !!notes.find(noteSetNote => noteSetNote.name === chordNote.name))){
				matchedChords.push(chord);
			}
		}

		return matchedChords;
	}

	public static lookupName(root: string, notes: Note[]): string {
		const intervals: number[] = NoteSet.computeIntervals(root, notes);
		const chord: any = chordsJson.find((c: any) => NoteSet.intervalsEqual(c.intervals, intervals));
		return chord ? chord.name : 'Custom';
	}

	public static lookupNamesFuzzy(noteSet: INoteSet): INoteSet[] {
		const intervals: number[] = NoteSet.computeIntervals(noteSet.root, noteSet.notes);
		const chords: Chord[] = chordsJson
			.filter((c: any) => NoteSet.intervalsEqualFuzzy(c.intervals, intervals))
			.map((c: any) => new Chord(c.name, c.intervals));

		return chords.filter((c: Chord) => c.name !== noteSet.name);
	}

	public static lookupChordsInKey(noteSet: INoteSet): IChordSet[] {
		let notes: Note[] = noteSet.notes;
		let chordSets: IChordSet[] = [];

		for(let i = 0; i < notes.length; i++){
			let root: string = notes[i].name;
			let matchedChords: Chord[] = Chord.findChordsByRoot(root, notes);
			if(matchedChords.length) chordSets.push({ root, chords: matchedChords });
		}

		return chordSets;
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
