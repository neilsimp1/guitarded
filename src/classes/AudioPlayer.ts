import Pitch from './Pitch';

interface IEffectChain {
	distNode: WaveShaperNode;
	gainNode: GainNode;
	oscNode: OscillatorNode;
	oscNodes?: OscillatorNode[];
}

// interface Window {
// 	AudioContext: typeof AudioContext;
// 	webkitAudioContext: typeof AudioContext;
// }
// declare const window: Window;

export default class AudioPlayer {

	private static ctx: AudioContext;
	private ctx: AudioContext;
	private oscTypes: OscillatorType[] = ['sine', 'square', 'sawtooth', 'triangle'];
	private distCurve: Float32Array;

	constructor() {
		this.distCurve = this.makeDistortionCurve(1000);

		//const AudioContextDecl = window.AudioContext || window.webkitAudioContext;
		if(!AudioPlayer.ctx) AudioPlayer.ctx = new AudioContext();
		this.ctx = AudioPlayer.ctx;
	}

	private createEffectChain(oscType: OscillatorType = 'sine', gain: number = 1): IEffectChain {
		const oscNode: OscillatorNode = this.ctx.createOscillator();
		oscNode.type = oscType;

		const distNode: WaveShaperNode = this.ctx.createWaveShaper();
		distNode.curve = this.distCurve;

		const gainNode: GainNode = this.ctx.createGain();
		gainNode.gain.value = gain;

		oscNode.connect(distNode);
		distNode.connect(gainNode);
		gainNode.connect(this.ctx.destination);

		return { distNode, gainNode, oscNode };
	}

	private makeDistortionCurve(amount: number): Float32Array {
		const numSamples: number = 44100,
			deg: number = Math.PI / 180;
		let curve = new Float32Array(numSamples),
			x: number;
		for(let i = 0; i < numSamples; ++i ){
			x = i * 2 / numSamples - 1;
			curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
		}

		return curve;
	}

	public playSequence(pitches: Pitch[], duration: number = 750): Promise<void> {
		const play = (): Promise<void> => {
			return new Promise<void>((resolve: Function) => {
				effects.gainNode.gain.value = 0;
				effects.oscNode.start();

				(async function asyncLoop(i, _this) {
					if(i === pitches.length) return resolve();
					
					effects.oscNode.frequency.value = pitches[i].frequency;
					await _this.pick(effects, duration);
					asyncLoop(i + 1, _this);
				})(0, this);
			});
		};

		const effects: IEffectChain = this.createEffectChain();

		return new Promise<void>((resolve: Function) => {
			play().then(() => {
				effects.oscNode.stop();
				resolve();
			});
		});
	}

	public playTogether(pitches: Pitch[], duration: number = 750): Promise<void> {
		const getType = (i: number) => this.oscTypes[i % 4];

		const effects: IEffectChain = this.createEffectChain();
		effects.oscNodes = [];

		for(let i = 0; i < pitches.length; i++){
			const oscNode: OscillatorNode = this.ctx.createOscillator();
			oscNode.frequency.value = pitches[i].frequency;
			oscNode.type = getType(i);
			oscNode.connect(effects.distNode);
			effects.oscNodes.push(oscNode);
			oscNode.start();
		}

		return new Promise<void>((resolve: Function) => {
			setTimeout(() => {
				for(const oscNode of effects.oscNodes!) oscNode.stop();
				resolve();
			}, duration);
		});
	}

	private async pick(effects: IEffectChain, duration: number): Promise<void> {
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
