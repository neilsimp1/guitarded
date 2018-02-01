// import Chord from './Chord';
import Note from './Note';
import Scale from './Scale';

export default class GuitarString {

	public root: string;
	public numFrets: number;
	public frets: [boolean];

	constructor(root: string, numFrets: number, noteSet: Scale/* | Chord*/) {
		this.root = root;
		this.numFrets = numFrets;
		this.frets = getFrets(noteSet);
	}

	private getFrets(noteSet: Scale/* | Chord*/): [boolean] {

	}

}
