import Pitch from './Pitch';

interface IAmp {
	ctx: AudioContext;
	oscNode: OscillatorNode;
	gainNode: GainNode;
}

export default class AudioPlayer {

	private createAmp(): IAmp {
		const ctx: AudioContext = new AudioContext();
		const oscNode: OscillatorNode = ctx.createOscillator();
		const gainNode: GainNode = ctx.createGain();

		gainNode.connect(ctx.destination);
		oscNode.connect(gainNode);
		oscNode.type = 'sine';
		oscNode.connect(ctx.destination);

		return { ctx, oscNode, gainNode };
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
			amp.oscNode = amp.ctx.createOscillator();
			amp.oscNode.connect(amp.gainNode);
			//amp.oscNode.type = 'sine';
			amp.oscNode.connect(amp.ctx.destination);
			amp.oscNode.frequency.value = pitch.frequency;
			amp.oscNode.start();
		};
		const stop = () => {
			amp.oscNode.stop();
			amp.oscNode.disconnect(amp.ctx.destination);
		};

		const amp: IAmp = this.createAmp();

		return new Promise<void>((resolve: Function) => {
			loop(0).then(() => {
				amp.ctx.close();
				resolve();
			});
		});
	}

	public playTogether(pitches: Pitch[], duration: number = 750): Promise<void> {
		let amps: IAmp[] = [];
		for(const pitch of pitches){
			const amp: IAmp = this.createAmp();
			//amp.gainNode.gain.value = 0.25;
			amp.oscNode.frequency.value = pitch.frequency;
			amps.push(amp);
			amp.oscNode.start();
		}

		return new Promise<void>((resolve: Function) => {
			setTimeout(() => {
				for(const amp of amps){
					amp.oscNode.stop();
					amp.oscNode.disconnect(amp.ctx.destination);
					amp.ctx.close();
				}
				resolve();
			}, duration);
		});
	}

}
