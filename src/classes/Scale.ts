import Note from './Note';

export default class Scale {

	public name: string;
	public notes: [Note];

	constructor(name: string, notes: [Note]) {
		this.name = name;
		this.notes = notes;
	}

}
