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

	public playPitches(pitches: Pitch[], duration: number = 0.75): void {
		const start = (pitch: Pitch) => {
			//oscNode.connect(gainNode);
			//gainNode.connect(this.ctx.destination);
			oscNode.type = 'sine';
			oscNode.connect(this.ctx.destination);
			oscNode.frequency.value = pitch.frequency;
			oscNode.start();
		};
		const stop = () => {
			oscNode.stop();
			oscNode.disconnect(this.ctx.destination);
		};

		const oscNode: OscillatorNode = this.ctx.createOscillator();
		//const gainNode: GainNode = this.ctx.createGain();

		let i: number = 0;

		start(pitches[i]);
		setTimeout(() => {
			stop();
			i++;
			if(i < pitches.length) start(pitches[i]);
		}, duration);
	}

}
