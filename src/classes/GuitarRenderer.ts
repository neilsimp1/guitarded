import GuitarString from './GuitarString';
import IPoint from './IPoint';
import Renderer from './Renderer';

export default class GuitarRenderer extends Renderer {

	private fretboard: [GuitarString];
	private neckDimensions: any;
	private numFrets: number;
	private numStrings: number;

	private FRET_SPACE_H: number = 24; // 24px in each fret, 2 of which at bottom for metal
	private FRET_H: number = 2; // 2px for each metal fret
	private NUT_H: number = 6; // 6px for height of nut at top of neck, so only 18 would show above it for headstock
	private STRING_SPACE_W: number = 8; // 8px for string and space around it
	private STRING_W: number = 2; // 2px wide
	private STRING_OUTER_W: number = 2; // 2 + 2px on each side

	constructor(canvas: HTMLCanvasElement, numFrets: number, numStrings: number, fretboard: [GuitarString]) {
		super(canvas);

		this.numFrets = numFrets;
		this.numStrings = numStrings;
		this.fretboard = fretboard;
		this.scale = this.getScale(numStrings);


		// ABOVE IS CONSTRUCTOR, BELOW IS STUFF NEEDIGN TO BE ORGANIZED INTO METHODS

		this.neckDimensions = this.getNeckDimensions();

		(async () => {
			const neckBg: HTMLImageElement = await this.loadImage('/assets/neck.jpg');
			const neckPattern: CanvasPattern = this.ctx.createPattern(neckBg, 'repeat');

			this.ctx.fillStyle = neckPattern;
			this.ctx.fillRect(50 * this.scale, 50 * this.scale, this.neckDimensions.width * this.scale, this.neckDimensions.length * this.scale);
		})();
	}

	private getScale(numStrings: number): number {
		const neckWidth: number = (numStrings * this.STRING_SPACE_W) + (this.STRING_OUTER_W * 2);


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
	// 	let path: Path2D = new Path2D();
	// 	path.rect(50, 50, this.neckDimensions.width * this.scale, this.neckDimensions.length * this.scale);
	// }

	// private getFretsPath(): Path2D {

	// }

	// private getStringsPath(): Path2D {

	// }

	// private getNotesPath(): Path2D {

	// }
}
