export default class Note {

	public name: string;
	public displayName: string;

	constructor(name: string, displayName: string) {
		this.name = name;
		this.displayName = displayName;
	}

	public static getAllNotes(): [Note] {
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
