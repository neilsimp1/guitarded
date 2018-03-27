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

	private static findChordsByRoot(noteSet: INoteSet): INoteSet[] {
		let matched: Chord[] = [];
		
		// matched = matched.concat(chordsJson
		// 	.filter((c: any) => NoteSet.intervalsEqualFuzzy(c.intervals, (noteSet as any).intervals))
		// 	.map((c: any) => new Chord(c.name, c.intervals, noteSet.root)
		// ));

		const innerFunc = (intervals: number[], matched: Chord[]): Chord[] => {
			if(intervals.length <= 2) return matched;
			return matched.concat(chordsJson
				.filter((c: any) => NoteSet.intervalsEqualFuzzy(c.intervals, (noteSet as any).intervals))
				.map((c: any) => new Chord(c.name, c.intervals, noteSet.root))
			);
		};

		const intervals: number[] = (noteSet as any).intervals;
		for(let i = 0; i < (noteSet as any).intervals.length; i++){

			//const newIntervals: number[] = [intervals[i] + intervals[i + 1]].concat(intervals.slice(i + 2));
			const newIntervals: number[] = intervals.map((interval, intervalIndex) => {
				if(intervalIndex === i) return interval + intervals[intervalIndex + 1];
				return interval;
			}).filter((interval, intervalIndex) => intervalIndex !== i + 1);
			
			matched = innerFunc(newIntervals, matched);
		}

		return [];
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

	public static lookupChordsInKey(noteSet: INoteSet): INoteSet[] {
		// const intervals: number[] = this.computeIntervals(noteSet.root, noteSet.notes);
		// const chords: Chord[] = chordsJson.filter((c: any) => this.intervalsEqualFuzzy(c.intervals, intervals)).map((c: any) => new Chord(c.name, c.intervals));
		// return chords.filter((c: Chord) => c.name !== noteSet.name);
		//return [];

		return Chord.findChordsByRoot(noteSet);
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
