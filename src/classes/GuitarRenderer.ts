import GuitarString from './GuitarString';
import IDimensions from './IDimensions';
import IPoint from './IPoint';
import Renderer from './Renderer';

export default class GuitarRenderer extends Renderer {

	private fretboard: [GuitarString];
	//private neckDimensions: any;
	private numFrets: number;
	private numStrings: number;

	private imgs: any = {};

	private FRET_SPACE_H: number = 18; // 18px in each fret, 2 of which at bottom for metal
	private FRET_H: number = 2; // 2px for each metal fret
	private NUT_H: number = 4; // 4px for height of nut at top of neck, so only 14 would show above it for headstock
	private STRING_SPACE_W: number = 6; // 6px for string and space around it
	private STRING_W: number = 2; // 2px wide
	private STRING_OUTER_W: number = 2; // 2 + 2px on each side

	constructor(canvas: HTMLCanvasElement, numFrets: number, numStrings: number, fretboard: [GuitarString]) {
		super(canvas);
		
		this.loadAssets();

		this.numFrets = numFrets;
		this.numStrings = numStrings;
		this.fretboard = fretboard;
		this.scale = this.getScale(numStrings);

		// ABOVE IS CONSTRUCTOR, BELOW IS STUFF NEEDIGN TO BE ORGANIZED INTO METHODS

		//this.neckDimensions = this.getNeckDimensions();
	}

	private async loadAssets(): Promise<void> {
		this.imgs.neckBg = await this.loadImage('/assets/neck.jpg');
		return;
	}

	public doStuff(): void {
		// (async () => {
		// 	const neckBg: HTMLImageElement = await this.loadImage('/assets/neck.jpg');
		// 	const neckPattern: CanvasPattern = this.ctx.createPattern(neckBg, 'repeat');
		// 	this.ctx.fillStyle = neckPattern;

		// 	//const neckCoords: any = this.getNeckCoords();

		// 	//this.ctx.fillRect(neckCoords.x, neckCoords.y, this.neckDimensions.width * this.scale, this.neckDimensions.length * this.scale);
		// })();

		const fretboardPath: Path2D = this.getFretboardPath();

		(async () => {
			const neckBg: HTMLImageElement = await this.loadImage('/assets/neck.jpg');
			const neckPattern: CanvasPattern = this.ctx.createPattern(neckBg, 'repeat');

			//this.ctx.scale(this.scale, this.scale);
			this.ctx.fillStyle = neckPattern;

			this.ctx.fill(fretboardPath);
		})();
	}

	private getScale(numStrings: number): number {
		const neckWidth: number = (numStrings * this.STRING_SPACE_W) + (this.STRING_OUTER_W * 2);
		const containerWidth: number = this.canvas.parentElement!.clientWidth;

		let scale: number;
		if(containerWidth < this.BP_SM) scale = 1;
		else if(containerWidth < this.BP_MD) scale = 2;
		else if(containerWidth < this.BP_XXL) scale = 5;
		else scale = 4;

		return scale;
	}

	// private getNeckDimensions(): any {
	// 	const width: number = (this.numStrings * this.STRING_SPACE_W) + (this.STRING_OUTER_W * 2);
	// 	const length: number = (this.numFrets + 1) * this.FRET_SPACE_H;

	// 	return {
	// 		width: width,
	// 		length: length
	// 	};
	// }

	// private getNeckCoords(): any {
	// 	return {
	// 		x: Math.floor((this.canvas.parentElement!.clientWidth / 2) - ((this.neckDimensions.width * this.scale) / 2)),
	// 		y: 15
	// 	};
	// }

	private getFretboardPath(): Path2D {
		const dimensions: IDimensions = {
			width: (this.numStrings * this.STRING_SPACE_W) + (this.STRING_OUTER_W * 2),
			length: (this.numFrets + 1) * this.FRET_SPACE_H
		};
		const coords: IPoint = {
			x: Math.floor((this.canvas.parentElement!.clientWidth / 2) - ((dimensions.width * this.scale) / 2)),
			y: 15
		};

		let path: Path2D = new Path2D();
		path.rect(coords.x, coords.y, dimensions.width, dimensions.length);

		return path;
	}

	// private getFretsPath(): Path2D {

	// }

	// private getStringsPath(): Path2D {

	// }

	// private getNotesPath(): Path2D {

	// }
}
