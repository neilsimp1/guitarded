import Pitch from './Pitch';

export default class AudioPlayer {

	private static ctx: AudioContext;
	private ctx: AudioContext;

	constructor() {
		if(!AudioPlayer.ctx){
			AudioPlayer.ctx = new AudioContext();
		}
		this.ctx = AudioPlayer.ctx;
	}

	public playPitch(pitch: Pitch, duration: number = 0.75): void {

	}

	public playPitches(pitches: Pitch[], duration: number = 750): void {
		const loop = (i: number) => {
			start(pitches[i]);
			setTimeout(() => {
				stop();
				i++;
				if(i < pitches.length) loop(i);
			}, duration);
		};
		const start = (pitch: Pitch) => {
			gainNode.connect(this.ctx.destination);
			oscNode = this.ctx.createOscillator();
			oscNode.connect(gainNode);
			oscNode.type = 'sine';
			oscNode.connect(this.ctx.destination);
			oscNode.frequency.value = pitch.frequency;
			oscNode.start();
		};
		const stop = () => {
			oscNode.stop();
			oscNode.disconnect(this.ctx.destination);
		};

		let oscNode: OscillatorNode;
		const gainNode: GainNode = this.ctx.createGain();

		loop(0);
	}

}
