export default class Note {

	public name: string;
	public displayName: string;

	constructor(name: string, displayName: string) {
		this.name = name;
		this.displayName = displayName;
	}

	public static lookupNote(value: string, propName: string): Note {
		return Note.getAllNotes().find((note: Note) => (note as any)[propName] === value ) || new Note('', '');
	}

	public static getAllNotes(): [Note] { // TODO: maybe make this a static property instead of static method?
		return [
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

}
