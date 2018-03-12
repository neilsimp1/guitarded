import IEffectsChain from './IEffectsChain';
import Guitar from './Instruments/Guitar';
import Pitch from './Pitch';

// interface Window {
// 	AudioContext: typeof AudioContext;
// 	webkitAudioContext: typeof AudioContext;
// }
// declare const window: Window;

export default class AudioPlayer {

	private static ctx: AudioContext;
	private ctx: AudioContext;
	private instrument: Guitar;
	private oscTypes: OscillatorType[] = ['sine', 'square', 'sawtooth', 'triangle'];
	private distCurve: Float32Array;

	constructor() {
		this.distCurve = this.makeDistortionCurve(1000);

		//const AudioContextDecl = window.AudioContext || window.webkitAudioContext;
		if(!AudioPlayer.ctx) AudioPlayer.ctx = new AudioContext();
		this.ctx = AudioPlayer.ctx;

		this.instrument = new Guitar(this.ctx);
	}

	private createEffectChain(oscType: OscillatorType = 'sine', gain: number = 1): IEffectsChain {
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
					await _this.instrument.playSingle(effects, duration);
					asyncLoop(i + 1, _this);
				})(0, this);
			});
		};

		const effects: IEffectsChain = this.createEffectChain();

		return new Promise<void>((resolve: Function) => {
			play().then(() => {
				effects.oscNode.stop();
				resolve();
			});
		});
	}

	public playTogether(pitches: Pitch[], duration: number = 750): Promise<void> {
		const getType = (i: number) => this.oscTypes[i % 4];

		const effects: IEffectsChain = this.createEffectChain();
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

}
