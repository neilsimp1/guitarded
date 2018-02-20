import IFret from './IFret';
import INoteSet from './INoteSet';
import Note from './Note';
import Scale from './Scale';

export default class GuitarString {

	public root: string;
	public frets: IFret[];

	constructor(root: string, noteSet: INoteSet) {
		this.root = root;
		this.frets = this.getFrets(noteSet);
	}

	private getFrets(noteSet: INoteSet): IFret[] {
		const loopedNotes: any[] = Note.getLoopedNotes();
		let frets: IFret[] = [];
		let fretNoteName: string = this.root;
		for(let i = 0; i < 26; i++){
			let index: number = loopedNotes.findIndex((ln: any) => ln.note.name === fretNoteName);
			const on: boolean = !!noteSet.notes.find((n: Note) => n.name === fretNoteName);
			const note: Note = Note.lookupNote(fretNoteName);
			frets[i] = { on, note };

			fretNoteName = loopedNotes[index].next.name;
		}

		return frets;
	}

}
