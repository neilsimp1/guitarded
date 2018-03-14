import IEffectsChain from '../IEffectsChain';
import IPlayable from './IPlayable';

export default class Guitar implements IPlayable {

	private ctx: AudioContext;
	private oscTypes: OscillatorType[] = ['sine', 'square', 'sawtooth', 'triangle'];

	constructor(ctx: AudioContext) {
		this.ctx = ctx;
	}
	// public set ctx(ctx: AudioContext) {
	// 	this.ctx = ctx;
	// }

	public async playSingle(effects: IEffectsChain, duration: number): Promise<void> {
		const MAX_VOLUME: number = 0.6;
		//const MAX_VOLUME_OVERTONE: number = 0.05;
		const seconds: number = duration / 1000;

		// const overtoneGain = this.ctx.createGain();
		// overtoneGain.gain.setValueAtTime(0, this.ctx.currentTime);

		// const overtone1 = this.ctx.createOscillator();
		// overtone1.type = 'triangle';
		// overtone1.frequency.setValueAtTime(effects.oscNode.frequency.value, this.ctx.currentTime);
		// overtone1.detune.setValueAtTime(330, this.ctx.currentTime);

		// const overtone2 = this.ctx.createOscillator();
		// overtone2.type = 'triangle';
		// overtone2.frequency.setValueAtTime(effects.oscNode.frequency.value, this.ctx.currentTime);
		// overtone1.detune.setValueAtTime(550, this.ctx.currentTime);

		//overtone1.connect(overtoneGain);
		//overtone2.connect(overtoneGain);
		//overtoneGain.connect(this.ctx.destination);
		//overtone1.start();
		//overtone2.start();

		effects.oscNode.type = 'triangle';

		effects.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

		effects.gainNode.gain.setValueAtTime(MAX_VOLUME, this.ctx.currentTime);
		//overtoneGain.gain.setValueAtTime(MAX_VOLUME_OVERTONE, this.ctx.currentTime);

		effects.gainNode.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + (seconds * 0.75));
		//overtoneGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + (seconds * 0.75));

		return new Promise<void>((resolve) => {
			setTimeout(_ => {
				//overtone1.stop();
				//overtone2.stop();
				resolve();
			}, duration);
		});
	}

	public async playMultiple(effects: IEffectsChain, duration: number): Promise<void> {
		//const currentTime: number = this.ctx.currentTime;
		const getType = (i: number) => this.oscTypes[i % 4];
		const seconds: number = duration / 1000;

		effects.gainNode.gain.setValueAtTime(0.6, this.ctx.currentTime);
		effects.oscNodes!.forEach((oscNode, i) => {
			//oscNode.type = getType(i);
			oscNode.start();
			oscNode.stop(this.ctx.currentTime + seconds);
		});

		return new Promise<void>((resolve: Function) => {
			setTimeout(() => {
				resolve();
			}, duration);
		});
	}

}
