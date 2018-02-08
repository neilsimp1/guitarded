export default class Renderer {

	protected canvas: HTMLCanvasElement;
	protected ctx: CanvasRenderingContext2D;
	protected scale: number;
	protected map: any = {};

	protected BP_XS: number = 0;
	protected BP_SM: number = 576;
	protected BP_MD: number = 768;
	protected BP_LG: number = 992;
	protected BP_XL: number = 1200;
	protected BP_XXL: number = 1500;

	constructor(canvas: HTMLCanvasElement) {
		canvas.width = canvas.parentElement!.clientWidth;
		canvas.height = 1000;
		this.canvas = canvas;

		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
	}

	protected async loadImage(url: string): Promise<HTMLImageElement> {
		return new Promise((resolve: Function) => {
			let img = new Image();
			img.onload = () =>{ resolve(img) };
			img.src = url;
		}) as Promise<HTMLImageElement>;
	}

}
