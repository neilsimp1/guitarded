export default class Renderer {

	protected canvas: HTMLCanvasElement;
	protected ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		canvas.width = canvas.parentElement!.clientWidth;
		canvas.height = 1000;
		this.canvas = canvas;

		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
	}

}
