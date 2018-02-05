import GuitarString from './GuitarString';
import Renderer from './Renderer';

export default class GuitarRenderer extends Renderer {

	private fretboard: [GuitarString];
	private numFrets: number;
	private numStrings: number;

	constructor(canvas: HTMLCanvasElement, fretboard: [GuitarString]) {
		super(canvas);

		this.numFrets = fretboard[0].frets.length;
		this.numStrings = fretboard.length;
		this.fretboard = fretboard;
	}
	
	// private getFretboardPath(): Path2D {

	// }
	
	// private getFretsPath(): Path2D {
		
	// }

	// private getStringsPath(): Path2D {
		
	// }

	// private getNotesPath(): Path2D {
		
	// }
}
