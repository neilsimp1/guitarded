import IEffectsChain from '../IEffectsChain';

interface IPlayable {
	playSingle(effects: IEffectsChain, duration: number): Promise<void>;
	playMultiple(effects: IEffectsChain, duration: number): Promise<void>;
}

export default IPlayable;
