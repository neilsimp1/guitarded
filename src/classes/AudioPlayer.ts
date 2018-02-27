import Pitch from './Pitch';

interface IAmp {
	ctx: AudioContext;
	oscNode: OscillatorNode | undefined;
	gainNode: GainNode;
}

export default class AudioPlayer {

	// constructor() {

	// }

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
			amp.gainNode.connect(amp.ctx.destination);
			amp.oscNode = amp.ctx.createOscillator();
			amp.oscNode.connect(amp.gainNode);
			amp.oscNode.type = 'sine';
			amp.oscNode.connect(amp.ctx.destination);
			amp.oscNode.frequency.value = pitch.frequency;
			amp.oscNode.start();
		};
		const stop = () => {
			amp.oscNode!.stop();
			amp.oscNode!.disconnect(amp.ctx.destination);
		};

		const ctx: AudioContext =  new AudioContext();
		let oscNode;
		const gainNode: GainNode = ctx.createGain();

		const amp: IAmp = { ctx, oscNode, gainNode };

		return new Promise<void>((resolve: Function) => { loop(0).then(() => resolve()) });
	}

	public playTogether(pitches: Pitch[], duration: number = 750): Promise<void> {
		let amps: IAmp[] = [];
		for(const pitch of pitches){
			const ctx = new AudioContext();
			const oscNode = ctx.createOscillator();
			const gainNode: GainNode = ctx.createGain();
			const amp: IAmp = { ctx, oscNode, gainNode };

			//amp.gainNode.gain.value = 0.25;
			amp.gainNode.connect(ctx.destination);
			amp.oscNode!.connect(gainNode);
			amp.oscNode!.type = 'sine';
			amp.oscNode!.connect(amp.ctx.destination);
			amp.oscNode!.frequency.value = pitch.frequency;

			amps.push(amp);

			amp.oscNode!.start();
		}

		return new Promise<void>((resolve: Function) => {
			setTimeout(() => {
				for(const amp of amps){
					amp.oscNode!.stop();
					amp.oscNode!.disconnect(amp.ctx.destination);
				}
				resolve();
			}, duration);
		});
	}

}
