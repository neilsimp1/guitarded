import GuitarString from './GuitarString';
import IPoint from './IPoint';
import Renderer from './Renderer';

export default class GuitarRenderer extends Renderer {

	private fretboard: [GuitarString];
	private neckDimensions: any;
	private numFrets: number;
	private numStrings: number;

	constructor(canvas: HTMLCanvasElement, numFrets: number, numStrings: number, fretboard: [GuitarString]) {
		super(canvas);

		this.numFrets = numFrets;
		this.numStrings = numStrings;
		this.fretboard = fretboard;

		this.neckDimensions = this.getNeckDimensions();
		let ads = 123;

		this.ctx.fillRect(50, 50, this.neckDimensions.width, this.neckDimensions.length);
	}

	private getNeckDimensions(): any {
		const neckWidth: number = (this.numStrings * 8) + 4; // 8px wide for each string, plus 2 + 2 on each side of outer strings
		const neckLength: number = (this.numFrets + 1) * 24; // 24 =px per fret, + 1 for the space above the nut on the neck

		return {
			width: neckWidth,
			length: neckLength
		};
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
