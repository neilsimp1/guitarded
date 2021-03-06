export default class Renderer {

	protected canvas: HTMLCanvasElement;
	protected ctx: CanvasRenderingContext2D;
	protected scale: number = 1;
	protected map: any = {};

	protected BP_XS: number = 0;
	protected BP_SM: number = 576;
	protected BP_MD: number = 768;
	protected BP_LG: number = 992;
	protected BP_XL: number = 1200;
	protected BP_XXL: number = 1500;

	constructor(canvas: HTMLCanvasElement) {
		canvas.width = canvas.parentElement!.clientWidth;
		this.canvas = canvas;

		this.ctx = this.canvas.getContext('2d')!;
	}

	protected async loadImage(url: string): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>((resolve: Function) => {
			let img = new Image();
			img.onload = () =>{ resolve(img) };
			img.src = url;
		});
	}

}
