import Note from './Note';

interface INoteSet {
	name: string;
	notes: Note[];
	root: string;
	intervals: number[];
}

export default INoteSet;
