import GuitarString from './GuitarString';
import IDimensions from './IDimensions';
import IPoint from './IPoint';
import Renderer from './Renderer';

export default class GuitarRenderer extends Renderer {

	private fretboard: [GuitarString];
	//private neckDimensions: any;
	private numFrets: number;
	private numStrings: number;
	public isLoaded: boolean = false;

	private imgs: any = {};

	private FRET_SPACE_H: number = 18; // 18px in each fret, 2 of which at bottom for metal
	private FRET_H: number = 2; // 2px for each metal fret
	private NUT_H: number = 4; // 4px for height of nut at top of neck, so only 14 would show above it for headstock
	private STRING_SPACE_W: number = 6; // 6px for string and space around it
	private STRING_W: number = 2; // 2px wide
	private STRING_OUTER_W: number = 2; // 2 + 2px on each side

	constructor(canvas: HTMLCanvasElement, numFrets: number, numStrings: number, fretboard: [GuitarString]) {
		super(canvas);
		this.loadAssets().then((isSuccess: boolean) => this.isLoaded = isSuccess);
		this.numFrets = numFrets;
		this.numStrings = numStrings;
		this.fretboard = fretboard;
		this.scale = this.getScale(numStrings);
		this.map.fretboard = this.getFretboardPoints();
	}

	private async loadAssets(): Promise<boolean> {
		try{
			this.imgs.neckBg = await this.loadImage('/assets/neck.jpg');
		}
		catch(e){
			console.error(e);
			return false;
		}

		return true;
	}

	public doStuff(): void {
		const fretboardPath: Path2D = this.getFretboardPath();
		const neckPattern: CanvasPattern = this.ctx.createPattern(this.imgs.neckBg, 'repeat');

		this.ctx.fillStyle = neckPattern;
		//this.ctx.stroke(fretboardPath);
		(this.ctx as any).fill(fretboardPath);
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

	private getFretboardPoints(): any {
		const dimensions: IDimensions = {
			width: (this.numStrings * this.STRING_SPACE_W) + (this.STRING_OUTER_W * 2),
			length: (this.numFrets + 1) * this.FRET_SPACE_H
		};
		const coords: IPoint = {
			x: Math.floor((this.canvas.parentElement!.clientWidth / 2) - ((dimensions.width * this.scale) / 2)),
			y: 15
		};

		return { dimensions, coords};
	}

	private getFretboardPath(): Path2D {
		let path: Path2D = new Path2D();
		path.rect(
			this.map.fretboard.coords.x,
			this.map.fretboard.coords.y,
			this.map.fretboard.dimensions.width * this.scale,
			this.map.fretboard.dimensions.length * this.scale
		);

		return path;
	}

	private getFretsPath(): Path2D {
		let path: Path2D = new Path2D();
		// path.rect(
		// 	this.map.fretboard.coords.x,
		// 	this.map.fretboard.coords.y,
		// 	this.map.fretboard.dimensions.width * this.scale,
		// 	this.map.fretboard.dimensions.length * this.scale
		// );

		return path;
	}

	// private getStringsPath(): Path2D {

	// }

	// private getNotesPath(): Path2D {

	// }
}
