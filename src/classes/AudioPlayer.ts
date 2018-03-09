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
		distNode.curve = this.distCurve

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
		const start = (i: number): Promise<void> => {
			return new Promise<void>((resolve: Function) => {
				effects.oscNode.frequency.value = pitches[i].frequency;
				effects.oscNode.start();
				(function loop(i) {
					if(i === pitches.length) return resolve();
					setTimeout(() => {
						i++;
						if(i < pitches.length){
							effects.oscNode.frequency.value = pitches[i].frequency;
						}
						loop(i);
					}, duration);
				})(0);
			});
		};

		const effects: IEffectChain = this.createEffectChain();

		return new Promise<void>((resolve: Function) => {
			start(0).then(() => {
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

}
