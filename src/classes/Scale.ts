import AudioPlayer from './AudioPlayer';
import INoteSet from './INoteSet';
import Note from './Note';
import NoteSet from './NoteSet';
import Pitch from './Pitch';
import scalesJson from '../data/scales.json';

export default class Scale extends NoteSet implements INoteSet {

	private static scales: Scale[];

	constructor(name: string, intervals: number[], root: string = '') {
		super(name, intervals, root);
	}

	public static lookupName(root: string, notes: Note[]): string {
		const intervals: number[] = this.computeIntervals(root, notes);
		const scale: any = scalesJson.find((s: any) => this.intervalsEqual(s.intervals, intervals));
		return scale ? scale.name : 'Custom';
	}

	public static lookupNamesFuzzy(noteSet: INoteSet): INoteSet[] {
		const intervals: number[] = this.computeIntervals(noteSet.root, noteSet.notes);
		const scales: Scale[] = scalesJson.filter((s: any) => this.intervalsEqualFuzzy(s.intervals, intervals)).map((s: any) => new Scale(s.name, s.intervals));
		return scales.filter((s: Scale) => s.name !== noteSet.name);
	}

	public static getScales(): Scale[] {
		return scalesJson.map((s: any) => new Scale(s.name, s.intervals));
	}

	public static getScale(name: string, root: string | null = null): Scale {
		let scale: Scale = Scale.getScales().find(s => s.name === name)!;
		if(!root) return scale;
		return new Scale(scale.name, scale.intervals, root);
	}

	// public play(): void {
	// 	const player: AudioPlayer = new AudioPlayer();
	// 	player.playSequence(this.notesToPitches(true)).then(() => {
	// 		console.log('done');
	// 	});
	// }

	public async play(): Promise<void> {
		const player: AudioPlayer = new AudioPlayer();
		return new Promise<void>((resolve: Function) => {
			player.playSequence(this.notesToPitches(true)).then(() => {
				resolve();
			});
		});
	}

}
