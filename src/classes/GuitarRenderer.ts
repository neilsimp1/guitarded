import GuitarString from './GuitarString';
import IDimensions from './IDimensions';
import IPoint from './IPoint';
import Renderer from './Renderer';

export default class GuitarRenderer extends Renderer {

	private fretboard: GuitarString[];
	public isLoaded: boolean = false;
	private key: string;
	private numFrets: number;
	private numStrings: number;
	private orientation: string;

	private imgs: any = {};

	private FRET_COLOR: string = '#adadad';
	private INLAY_COLOR: string = '#3d301a';
	private NOTE_COLOR: string = '#2949ff';
	private NOTE_ROOT_COLOR: string = '#37db00';
	private NUT_COLOR: string = '#f2edce';
	private STRING_COLOR: string = '#666';

	private INLAY_RADIUS: number = 2;
	private FRET_SPACE_H: number = 9; // Fret height, including the space for the fret itself
	private FRET_H: number = 1; // Height of metal fret bar
	private NOTE_RADIUS: number = 1.2;
	private NUT_H: number = 2;
	private PADDING: number = 15;
	private STRING_SPACE_W: number = 3; // Space for string, including the space until the next string
	private STRING_W: number = 1;
	private STRING_OUTER_W: number = 1; // Space outside the outer strings before edge of fretboard

	constructor(canvas: HTMLCanvasElement, key: string, numFrets: number, numStrings: number, fretboard: GuitarString[], orientation: string) {
		super(canvas);
		this.loadAssets().then((isSuccess: boolean) => this.isLoaded = isSuccess);
		this.fretboard = fretboard;
		this.key = key;
		this.numFrets = numFrets;
		this.numStrings = numStrings;
		this.orientation = orientation;
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

	public render(): void {
		const doRender = () => {
			this.scale = this.getScale(this.numStrings);
			this.map.fretboard = this.getFretboardPoints();
			this.canvas.height = (this.map.fretboard.dimensions.length * this.scale) + (this.PADDING * 2);
			this.drawFretboard();
			this.drawNut();
			this.drawInlays();
			this.drawFrets();
			this.drawStrings();
			this.drawNotes();
		};

		if(this.isLoaded){
			doRender();
		}
		else{
			const handle: number = setInterval(() => {
				if(this.isLoaded){
					clearInterval(handle);
					doRender();
				}
			}, 25);
		}
	}

	public update(key: string, numFrets: number, numStrings: number, fretboard: GuitarString[], orientation: string): void {
		this.canvas.width = this.canvas.parentElement!.clientWidth;
		this.fretboard = fretboard;
		this.key = key;
		this.numFrets = numFrets;
		this.numStrings = numStrings;
		this.orientation = orientation;
		this.render();
	}

	private getScale(numStrings: number): number {
		let scale: number = 0;

		const maxSize: number = this.orientation === 'vertical' ? window.innerHeight : window.innerWidth;
		let _scale: number = 1;
		while(true){
			const fretboardSize = ((this.numFrets + 1) * this.FRET_SPACE_H * _scale) + (this.PADDING * 2);
			if(fretboardSize <= maxSize) _scale++;
			else{
				scale = _scale - 1;
				break;
			}
		}

		return scale;
	}

	private getFretboardPoints(): any {
		let dimensions: IDimensions;
		let coords: IPoint;
		if(this.orientation === 'vertical'){
			dimensions = {
				width: ((this.numStrings - 1) * this.STRING_SPACE_W) + (this.STRING_OUTER_W * 2),
				length: (this.numFrets + 1) * this.FRET_SPACE_H
			};
			coords = {
				x: Math.floor((this.canvas.width / 2) - ((dimensions.width * this.scale) / 2)),
				y: this.PADDING
			};
		}
		else{
			dimensions = {
				width: (this.numFrets + 1) * this.FRET_SPACE_H,
				length: ((this.numStrings - 1) * this.STRING_SPACE_W) + (this.STRING_OUTER_W * 2)
			};
			coords = {
				x: Math.floor((window.innerWidth / 2) - ((dimensions.width * this.scale) / 2)),
				y: this.PADDING
			};
		}

		return { dimensions, coords };
	}

	private drawFretboard(): void {
		this.ctx.fillStyle = this.ctx.createPattern(this.imgs.neckBg, 'repeat');
		this.ctx.fillRect(
			this.map.fretboard.coords.x,
			this.map.fretboard.coords.y,
			this.map.fretboard.dimensions.width * this.scale,
			this.map.fretboard.dimensions.length * this.scale
		);
	}

	private drawNut(): void {
		this.ctx.fillStyle = this.NUT_COLOR;
		if(this.orientation === 'vertical'){
			this.ctx.fillRect(
				this.map.fretboard.coords.x,
				this.map.fretboard.coords.y + (this.FRET_SPACE_H * this.scale) - (this.NUT_H * this.scale),
				this.map.fretboard.dimensions.width * this.scale,
				this.NUT_H * this.scale
			);
		}
		else{
			this.ctx.fillRect(
				this.map.fretboard.coords.x + (this.FRET_SPACE_H * this.scale),
				this.map.fretboard.coords.y,
				this.NUT_H * this.scale,
				this.map.fretboard.dimensions.length * this.scale
			);
		}
	}

	private drawInlays(): void {
		const inlayRadius: number = this.INLAY_RADIUS * this.scale;
		const endAngle: number = 2 * Math.PI;

		this.ctx.fillStyle = this.INLAY_COLOR;

		if(this.orientation === 'vertical'){
			const fretWidth: number = this.map.fretboard.dimensions.width * this.scale;
			const inlayXLeft = this.map.fretboard.coords.x + Math.floor(fretWidth * 0.25)
			const inlayXCenter = this.map.fretboard.coords.x + Math.floor(fretWidth / 2);
			const inlayXRight = this.map.fretboard.coords.x + Math.floor(fretWidth * 0.75);

			for(let i = 3; i <= this.numFrets; i++){
				const inlayY = (i: number) => this.map.fretboard.coords.y + (i * this.FRET_SPACE_H * this.scale) + ((this.FRET_SPACE_H * this.scale) / 2);

				switch(i){
					case 12: case 24:
						this.ctx.beginPath();
						this.ctx.arc(inlayXLeft, inlayY(i), inlayRadius, 0, endAngle);
						this.ctx.fill();
						this.ctx.closePath();
						this.ctx.beginPath();
						this.ctx.arc(inlayXRight, inlayY(i), inlayRadius, 0, endAngle);
						this.ctx.fill();
						this.ctx.closePath();
						break;
					case 3: case 5: case 7: case 9: case 15: case 17: case 19: case 21:
						this.ctx.beginPath();
						this.ctx.arc(inlayXCenter, inlayY(i), inlayRadius, 0, endAngle);
						this.ctx.fill();
						this.ctx.closePath();
						break;
				}
			}
		}
		else{
			const fretLength: number = this.map.fretboard.dimensions.length * this.scale;
			const inlayYTop = this.map.fretboard.coords.y + Math.floor(fretLength * 0.25)
			const inlayYCenter = this.map.fretboard.coords.y + Math.floor(fretLength / 2);
			const inlayYBottom = this.map.fretboard.coords.y + Math.floor(fretLength * 0.75);

			for(let i = 3; i <= this.numFrets; i++){
				const inlayX = (i: number) => this.map.fretboard.coords.x + (i * this.FRET_SPACE_H * this.scale) + ((this.FRET_SPACE_H * this.scale) / 2);

				switch(i){
					case 12: case 24:
						this.ctx.beginPath();
						this.ctx.arc(inlayX(i), inlayYTop, inlayRadius, 0, endAngle);
						this.ctx.fill();
						this.ctx.closePath();
						this.ctx.beginPath();
						this.ctx.arc(inlayX(i), inlayYBottom, inlayRadius, 0, endAngle);
						this.ctx.fill();
						this.ctx.closePath();
						break;
					case 3: case 5: case 7: case 9: case 15: case 17: case 19: case 21:
						this.ctx.beginPath();
						this.ctx.arc(inlayX(i), inlayYCenter, inlayRadius, 0, endAngle);
						this.ctx.fill();
						this.ctx.closePath();
						break;
				}
			}
		}
	}

	private drawFrets(): void {
		this.ctx.fillStyle = this.FRET_COLOR;

		if(this.orientation === 'vertical'){
			const fretWidth: number = this.map.fretboard.dimensions.width * this.scale;
			const fretLength: number = this.FRET_H * this.scale;
			for(let i = 2; i <= this.numFrets + 1; i++){
				this.ctx.fillRect(
					this.map.fretboard.coords.x,
					this.map.fretboard.coords.y + (i * this.FRET_SPACE_H * this.scale) - (this.FRET_H * this.scale),
					fretWidth,
					fretLength
				);
			}
		}
		else{
			for(let i = 2; i <= this.numFrets + 1; i++){
				const fretWidth: number = this.FRET_H * this.scale;
				const fretLength: number = this.map.fretboard.dimensions.length * this.scale;
				this.ctx.fillRect(
					this.map.fretboard.coords.x + (i * this.FRET_SPACE_H * this.scale) - (this.FRET_H * this.scale),
					this.map.fretboard.coords.y,
					fretWidth,
					fretLength
				);
			}
		}
	}

	private drawStrings(): void {
		this.ctx.fillStyle = this.STRING_COLOR;

		if(this.orientation === 'vertical'){
			for(let i = 0; i < this.numStrings; i++){
				const stringX: number = this.map.fretboard.coords.x + (i * this.STRING_SPACE_W * this.scale) + (this.STRING_OUTER_W * this.scale);
				this.ctx.fillRect(
					stringX,
					this.map.fretboard.coords.y,
					this.STRING_W,
					this.map.fretboard.dimensions.length * this.scale
				);
			}
		}
		else{
			for(let i = 0; i < this.numStrings; i++){
				const stringY: number = this.map.fretboard.coords.y + (i * this.STRING_SPACE_W * this.scale) + (this.STRING_OUTER_W * this.scale);
				this.ctx.fillRect(
					this.map.fretboard.coords.x,
					stringY,
					this.map.fretboard.dimensions.width * this.scale,
					this.STRING_W
				);
			}
		}
	}

	private drawNotes(): void {
		const endAngle: number = 2 * Math.PI;
		const getFillStyle = (gs: GuitarString, fretNum: number) => this.key === gs.frets[fretNum].note.name ? this.NOTE_ROOT_COLOR : this.NOTE_COLOR;

		if(this.orientation === 'vertical'){
			for(let i = 0; i < this.fretboard.length; i++){
				const noteX: number = this.map.fretboard.coords.x + (i * this.STRING_SPACE_W * this.scale) + (this.STRING_OUTER_W * this.scale);
				for(let j = 0; j <= this.numFrets; j++){
					if(!this.fretboard[i].frets[j].on) continue;
					const noteY = (i: number) => this.map.fretboard.coords.y + (i * this.FRET_SPACE_H * this.scale) + ((this.FRET_SPACE_H * this.scale) / 2);

					this.ctx.fillStyle = getFillStyle(this.fretboard[i], j);

					this.ctx.beginPath();
					this.ctx.arc(noteX, noteY(j), this.NOTE_RADIUS * this.scale, 0, endAngle);
					this.ctx.fill();
					this.ctx.closePath();
				}
			}
		}
		else{
			for(let i = 0; i < this.fretboard.length; i++){
				const noteY: number = this.map.fretboard.coords.y + ((this.numStrings - 1 - i) * this.STRING_SPACE_W * this.scale) + (this.STRING_OUTER_W * this.scale);
				for(let j = 0; j <= this.numFrets; j++){
					if(!this.fretboard[i].frets[j].on) continue;
					const noteX = (i: number) => this.map.fretboard.coords.x + (i * this.FRET_SPACE_H * this.scale) + ((this.FRET_SPACE_H * this.scale) / 2);

					this.ctx.fillStyle = getFillStyle(this.fretboard[i], j);

					this.ctx.beginPath();
					this.ctx.arc(noteX(j), noteY, this.NOTE_RADIUS * this.scale, 0, endAngle);
					this.ctx.fill();
					this.ctx.closePath();
				}
			}
		}
	}

}
