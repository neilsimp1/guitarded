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

	public playSequence(pitches: Pitch[], duration: number = 750): Promise<void> {
		const loop = (i: number): Promise<void> => {
			return new Promise<void>((resolve: Function) => {
				start(pitches[i]);
				(function _loop(i) {
					if(i === pitches.length) return resolve();
					setTimeout(() => {
						stop();
						i++;
						if(i < pitches.length) start(pitches[i]);
						_loop(i);
					}, duration);
				})(0);
			});
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

		return new Promise<void>((resolve: Function) => { loop(0).then(() => resolve()) });
	}

	public playTogether(pitches: Pitch[], duration: number = 750): Promise<void> {
		const gainNode: GainNode = this.ctx.createGain();
		gainNode.gain.value = 0.25;
		gainNode.connect(this.ctx.destination);

		let oscNodes: OscillatorNode[] = [];
		for(const pitch of pitches){
			const oscNode = this.ctx.createOscillator();
			oscNode.connect(gainNode);
			oscNode.type = 'sine';
			oscNode.connect(this.ctx.destination);
			oscNode.frequency.value = pitch.frequency;
			oscNodes.push(oscNode);
			oscNode.start();
		}

		return new Promise<void>((resolve: Function) => {
			setTimeout(() => {
				for(const oscNode of oscNodes){
					oscNode.stop();
					oscNode.disconnect(this.ctx.destination);
				}
				resolve();
			}, duration);
		});
	}

}
