import AudioPlayer from './AudioPlayer';
import INoteSet from './INoteSet';
import Note from './Note';
import Pitch from './Pitch';

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

	protected static intervalsEqual (a: number[], b: number[]): boolean {
		if(a.length !== b.length) return false;
		for(let i = 0; i < a.length; i++){
			if(a[i] !== b[i]) return false;
		}

		return true;
	}

	protected static intervalsEqualFuzzy (a: number[], b: number[]): boolean {
		let matchCount: number = 0;
		for(let i = 0; i < a.length; i++){
			if(a[i] === b[i]) matchCount++;
			else break;
		}

		return matchCount > b.length / 2;
	}

	public static computeIntervals(root: string, notes: Note[]): number[] {
		let intervals: number[] = [];
		for(let i = 1; i < notes.length; i++){
			intervals[i - 1] = Note.getInterval(notes[i - 1], notes[i]);
		}

		return intervals;
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

	protected build(): void {
		const getIntervalName = (semitonesFromRoot: number) => {
			switch(semitonesFromRoot){
				case 0: return 'P1';
				case 1: return 'm2';
				case 2: return 'M2';
				case 3: return 'm3';
				case 4: return 'M3';
				case 5: return 'P4';
				case 6: return 'A4/d5';
				case 7: return 'P5';
				case 8: return 'm6';
				case 9: return 'M6';
				case 10: return 'm7';
				case 11: return 'M7';
				case 12: return 'P8';
			}
			return '';
		};

		const rootNote: Note = Note.lookupNote(this.root);
		rootNote.degree = 'P1';
		this.notes = [rootNote];

		let semitonesFromRoot: number = 0;
		for(let i = 0; i < this.intervals.length; i++){
			semitonesFromRoot += this.intervals[i];
			const note = this.notes[this.notes.length - 1].getNextNote(this.intervals[i]);
			note.degree = getIntervalName(semitonesFromRoot);
			this.notes.push(note);
		}
	}

	protected notesToPitches(getNextOctave: boolean = false, octave: number = 4): Pitch[] {
		return Pitch.getPitchesFromNotes(this.notes, octave, getNextOctave);
	}

	public async playSequence(getNextOctave: boolean = false): Promise<void> {
		const player: AudioPlayer = new AudioPlayer();

		return new Promise<void>((resolve: Function) => {
			player.playSequence(this.notesToPitches(getNextOctave)).then(() => {
				resolve();
			});
		});
	}

	public async playTogether(): Promise<void> {
		const player: AudioPlayer = new AudioPlayer();

		return new Promise<void>((resolve: Function) => {
			player.playTogether(this.notesToPitches()).then(() => {
				resolve();
			});
		});
	}

}
