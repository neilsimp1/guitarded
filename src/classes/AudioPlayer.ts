import IEffectsChain from './IEffectsChain';
import IPlayable from './Instruments/IPlayable';
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
	private instrument: IPlayable;
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
		//oscNode.type = oscType;

		const gainNode: GainNode = this.ctx.createGain();

		const distNode: WaveShaperNode = this.ctx.createWaveShaper();
		distNode.curve = this.distCurve;

		oscNode.connect(distNode);
		distNode.connect(gainNode);
		gainNode.connect(this.ctx.destination);

		return { distNode, gainNode, oscNode, oscNodes: [] };
	}

	private makeDistortionCurve(amount: number): Float32Array {
		const numSamples: number = 44100,
			deg: number = Math.PI / 180;
		let curve = new Float32Array(numSamples),
			x: number;
		for(let i = 0; i < numSamples; ++i){
			x = i * 2 / numSamples - 1;
			curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
		}

		return curve;
	}

	public playSequence(pitches: Pitch[], duration: number = 750): Promise<void> {
		const play = (): Promise<void> => {
			return new Promise<void>((resolve: Function) => {
				effects.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
				effects.oscNode.start();

				(async function asyncLoop(i, _this) {
					if(i === pitches.length) return resolve();

					effects.oscNode.frequency.setValueAtTime(pitches[i].frequency, _this.ctx.currentTime);
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
		const effects: IEffectsChain = this.createEffectChain();

		for(let i = 0; i < pitches.length; i++){
			const oscNode: OscillatorNode = this.ctx.createOscillator();
			oscNode.frequency.setValueAtTime(pitches[i].frequency, this.ctx.currentTime);
			oscNode.connect(effects.distNode);
			effects.oscNodes.push(oscNode);
		}

		return this.instrument.playMultiple(effects, duration);
	}

}
