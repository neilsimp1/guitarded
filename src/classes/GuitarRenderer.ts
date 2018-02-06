import GuitarString from './GuitarString';
import IPoint from './IPoint';
import Renderer from './Renderer';

export default class GuitarRenderer extends Renderer {

	private fretboard: [GuitarString];
	private neckDimensions: any;
	private numFrets: number;
	private numStrings: number;
	private scale: number = 3;

	private FRET_SPACE_H = 24; // 24px in each fret, 2 of which at bottom for metal
	private FRET_H = 2; // 2px for each metal fret
	private NUT_H = 6; // 6px for height of nut at top of neck, so only 18 would show above it for headstock
	private STRING_SPACE_W = 8; // 8px for string and space around it
	private STRING_W = 2; // 2px wide
	private STRING_OUTER_W = 2; // 2 + 2px on each side

	constructor(canvas: HTMLCanvasElement, numFrets: number, numStrings: number, fretboard: [GuitarString]) {
		super(canvas);

		this.numFrets = numFrets;
		this.numStrings = numStrings;
		this.fretboard = fretboard;

		this.neckDimensions = this.getNeckDimensions();





		const neckBg: HTMLImageElement = new Image();
		neckBg.src = '/assets/neck.jpg';
		neckBg.onload = () => {
			const neckPattern: CanvasPattern = this.ctx.createPattern(neckBg, 'repeat');

			this.ctx.fillStyle = neckPattern;
			this.ctx.fillRect(50 * this.scale, 50 * this.scale, this.neckDimensions.width * this.scale, this.neckDimensions.length * this.scale);
		};
	}

	private getNeckDimensions(): any {
		const neckWidth: number = (this.numStrings * this.STRING_SPACE_W) + (this.STRING_OUTER_W * 2);
		const neckLength: number = (this.numFrets + 1) * this.FRET_SPACE_H;

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
