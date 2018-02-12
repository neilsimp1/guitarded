// import Chord from './Chord';
import INoteSet from './INoteSet';
import Note from './Note';
import Scale from './Scale';

export default class GuitarString {

	public root: string;
	public frets: boolean[];

	constructor(root: string, noteSet: INoteSet) {
		this.root = root;
		this.frets = this.getFrets(noteSet);
	}

	private getFrets(noteSet: INoteSet): [boolean] {
		const loopedNotes: any[] = Note.getLoopedNotes();
		let frets: [boolean] = [true];
		let fretPitch: string = this.root;
		for(let i = 0; i < 26; i++){
			let index: number = loopedNotes.findIndex((ln: any) => ln.note.name === fretPitch);
			frets[i] = !!noteSet.notes.find((n: Note) => n.name === fretPitch);
			fretPitch = loopedNotes[index].next.name;
		}

		return frets;
	}

}
