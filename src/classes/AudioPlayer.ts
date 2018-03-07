import Pitch from './Pitch';

interface IAmp {
	ctx: AudioContext;
	oscNode: OscillatorNode;
	gainNode: GainNode;
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

	constructor() {
		//const AudioContextDecl = window.AudioContext || window.webkitAudioContext;
		if(!AudioPlayer.ctx) AudioPlayer.ctx = new AudioContext();
		this.ctx = AudioPlayer.ctx;
	}

	// private createAmp(): IAmp {
	// 	const ctx: AudioContext = new AudioContext();
	// 	const oscNode: OscillatorNode = ctx.createOscillator();
	// 	const distNode: WaveShaperNode = ctx.createWaveShaper();
	// 	const gainNode: GainNode = ctx.createGain();

	// 	gainNode.connect(distNode);
	// 	gainNode.gain.value = 0.5;
	// 	distNode.connect(ctx.destination);
	// 	distNode.curve = this.makeDistortionCurve(1000);
	// 	oscNode.connect(gainNode);
	// 	oscNode.type = 'sine';
	// 	oscNode.connect(ctx.destination);

	// 	return { ctx, oscNode, gainNode };
	// }

	// private makeDistortionCurve(amount: number): Float32Array {
	// 	const numSamples: number = 44100,
	// 		deg: number = Math.PI / 180;
	// 	let curve = new Float32Array(numSamples),
	// 		x: number;
	// 	for (let i = 0; i < numSamples; ++i ) {
	// 		x = i * 2 / numSamples - 1;
	// 		curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
	// 	}

	// 	return curve;
	// }

	public playSequence(pitches: Pitch[], duration: number = 750): Promise<void> {
		const start = (i: number): Promise<void> => {
			return new Promise<void>((resolve: Function) => {
				oscNode.frequency.value = pitches[i].frequency;
				oscNode.start();
				(function loop(i) {
					if(i === pitches.length) return resolve();
					setTimeout(() => {
						i++;
						if(i < pitches.length) oscNode.frequency.value = pitches[i].frequency;
						loop(i);
					}, duration);
				})(0);
			});
		};

		const oscNode: OscillatorNode = this.ctx.createOscillator();
		oscNode.type = this.oscTypes[1];
		const gainNode: GainNode = this.ctx.createGain();
		oscNode.connect(gainNode);
		gainNode.connect(this.ctx.destination);

		return new Promise<void>((resolve: Function) => {
			start(0).then(() => {
				oscNode.stop();
				resolve();
			});
		});
	}

	public playTogether(pitches: Pitch[], duration: number = 750): Promise<void> {
		const getType = (i: number) => this.oscTypes[i % 4];

		let oscs: OscillatorNode[] = [];
		let gain: number = 1;
		for(let i = 0; i < pitches.length; i++){
			const oscNode: OscillatorNode = this.ctx.createOscillator();
			const gainNode: GainNode = this.ctx.createGain();
			oscNode.frequency.value = pitches[i].frequency;
			oscNode.type = getType(i);
			gainNode.gain.value = gain;
			oscNode.connect(gainNode);
			gainNode.connect(this.ctx.destination);
			oscs.push(oscNode);
			oscNode.start();
			if(gain >= 0.4) gain -= 0.1;
		}

		return new Promise<void>((resolve: Function) => {
			setTimeout(() => {
				for(const oscNode of oscs) oscNode.stop();
				resolve();
			}, duration);
		});
	}

}
