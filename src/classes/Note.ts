export default class Note {

	public name: string;
	public displayName: string;
	private static notes: Note[];
	private static loopedNotes: any[];

	constructor(name: string, displayName: string) {
		this.name = name;
		this.displayName = displayName;
	}

	public static lookupNote(value: string, propName: string = 'name'): Note {
		return Note.getAllNotes().find((note: Note) => (note as any)[propName] === value)!;
	}

	public static getAllNotes(): Note[] {
		if(!Note.notes){
			Note.notes = [
				new Note('A', 'A'),
				new Note('A#/Bb', 'A#'),
				new Note('B', 'B'),
				new Note('C', 'C'),
				new Note('C#/Db', 'C#'),
				new Note('D', 'D'),
				new Note('D#/Eb', 'D#'),
				new Note('E', 'E'),
				new Note('F', 'F'),
				new Note('F#/Gb', 'F#'),
				new Note('G', 'G'),
				new Note('G#/Ab', 'G#'),
			];
		}

		return Note.notes;
	}

	public static getLoopedNotes(): any[] {
		if(!Note.loopedNotes){
			Note.loopedNotes = Note.notes.map((n: Note, i: number) => {
				return {
					prev: i - 1 < 0 ? Note.notes[Note.notes.length - 1] : Note.notes[i - 1],
					next: i + 1 >= Note.notes.length ? Note.notes[0] : Note.notes[i + 1],
					note: n
				};
			});
		}

		return Note.loopedNotes;
	}

	public static getInterval(note1: Note, note2: Note): number {
		const loopedNotes: any[] = Note.getLoopedNotes();

		let index: number = loopedNotes.findIndex(loopedNote => loopedNote.note.name === note1.name);
		let interval: number = 0;
		while(loopedNotes[index].note.name !== note2.name){
			index = loopedNotes.findIndex(loopedNote => loopedNote.note.name === loopedNotes[index].next.name);
			interval++;
		}

		return interval;
	}

	public getNextNote(interval: number): Note {
		const loopedNotes: any[] = Note.getLoopedNotes();
		const dir: string = interval > 0 ? 'next' : 'prev';

		let startIndex: number;
		let nextNote: Note = this;
		interval = Math.abs(interval);
		while(interval--){
			startIndex = loopedNotes.findIndex(loopedNote => loopedNote.note.name === nextNote.name);
			nextNote = loopedNotes[startIndex][dir];
		}

		return nextNote;
	}

}
