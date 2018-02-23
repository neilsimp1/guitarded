import Pitch from './Pitch';

export default class AudioPlayer {

	private static ctx: AudioContext;

	constructor() {
		if(!AudioPlayer.ctx){
			AudioPlayer.ctx = new AudioContext();
		}
	}

	public playPitch(pitch: Pitch, time: number, duration: number = 0.75): void {
		const oscNode: OscillatorNode = AudioPlayer.ctx.createOscillator();
		const gainNode: GainNode = AudioPlayer.ctx.createGain();
		oscNode.connect(gainNode);
		gainNode.connect(AudioPlayer.ctx.destination);
		gainNode.gain.exponentialRampToValueAtTime(
			0.00001, AudioPlayer.ctx.currentTime + duration + time
		);
		oscNode.frequency.value = pitch.frequency;
		oscNode.start(time);
	}

	public playPitches(pitches: Pitch[]): void {
		for(let i = 0; i < pitches.length; i++) {
			this.playPitch(pitches[i], i * 2);
		}
	}

}
