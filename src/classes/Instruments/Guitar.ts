import IEffectsChain from '../IEffectsChain';

export default class Guitar {

	private ctx: AudioContext;

	constructor(ctx: AudioContext) {
		this.ctx = ctx;
	}
	// public set ctx(ctx: AudioContext) {
	// 	this.ctx = ctx;
	// }

	public async playSingle(effects: IEffectsChain, duration: number): Promise<void> {
		await this.pick(effects, duration);
	}

	private async pick(effects: IEffectsChain, duration: number): Promise<void> {
		const MAX_VOLUME: number = 0.6;
		const MAX_VOLUME_OVERTONE: number = 0.05;
		const seconds: number = duration / 1000;

		const overtoneGain = this.ctx.createGain();
		overtoneGain.gain.value = 0;

		const overtone1 = this.ctx.createOscillator();
		overtone1.type = 'triangle';
		overtone1.frequency.value = effects.oscNode.frequency.value;
		overtone1.detune.value = 330;

		const overtone2 = this.ctx.createOscillator();
		overtone2.type = 'triangle';
		overtone2.frequency.value = effects.oscNode.frequency.value;
		overtone2.detune.value = 550;

		overtone1.connect(overtoneGain);
		overtone2.connect(overtoneGain);
		overtoneGain.connect(this.ctx.destination);
		//overtone1.start();
		overtone2.start();

		effects.oscNode.type = 'triangle';

		effects.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

		effects.gainNode.gain.setValueAtTime(MAX_VOLUME, this.ctx.currentTime);
		overtoneGain.gain.setValueAtTime(MAX_VOLUME_OVERTONE, this.ctx.currentTime);

		effects.gainNode.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + (seconds * 0.75));
		overtoneGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + (seconds * 0.75));

		return new Promise<void>((resolve) => {
			setTimeout(_ => {
				//overtone1.stop();
				overtone2.stop();
				resolve();
			}, duration);
		});
	}
}
