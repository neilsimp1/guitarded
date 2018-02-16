<template>
	<div class="guitar">
		<!-- <table v-if="fretboard">
			<tr v-for="numFret in numFrets + 1" :key="numFret">
				<td v-for="(gstring, index) in fretboard" :key="index">
					{{ gstring.frets[numFret - 1] ? 'O' : '|' }}
				</td>
			</tr>
		</table> -->
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
//import Chord from '../../classes/Chord';
import GuitarRenderer from '../../classes/GuitarRenderer';
import GuitarString from '../../classes/GuitarString';
import IDimensions from '../../classes/IDimensions';
import INoteSet from '../../classes/INoteSet';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';
import Tuning from '../../classes/Tuning';

@Component({
	name: 'guitar'
})
export default class Guitar extends Vue {

	private forceVertical: boolean = false;
	private fretboard: GuitarString[];
	private renderer: GuitarRenderer;
	private windowDimensions: IDimensions = { width: 0, length: 0 };

	@Prop()
	noteSet: INoteSet;

	public get handedness(): string { return this.$store.getters.handedness }
	public get key(): string { return this.$store.getters.key }
	public get tuning(): Tuning { return this.$store.getters.tuning }
	public get notesPicked(): INoteSet { return this.$store.getters.notesPicked }
	public get numFrets(): number { return this.$store.getters.numFrets }
	public get numStrings(): number { return this.$store.getters.numStrings }
	public get orientation(): string { return this.forceVertical ? 'vertical' : this.$store.getters.orientation }
	public get scale(): INoteSet { return this.$store.getters.scale }

	@Watch('forceVertical')
	public onForceVerticalChanged(forceVertical: boolean) {
		this.$root.$emit('forceVerticalChanged', forceVertical);
	}
	@Watch('handedness')
	public onHandednessChanged() {
		this.buildFretboard();
		this.updateGuitar();
	}
	@Watch('numFrets')
	public onNumFretsChanged() {
		this.buildFretboard();
		this.updateGuitar();
	}
	@Watch('noteSet')
	public onNoteSetChanged() {
		this.buildFretboard();
		this.updateGuitar();
	}
	@Watch('orientation')
	public onOrientationChanged(notesPicked: INoteSet) {
		this.buildFretboard();
		this.updateGuitar();
	}
	@Watch('notesPicked')
	public onNotesPickedChanged(notesPicked: INoteSet) {
		this.buildFretboard();
		this.updateGuitar();
	}
	@Watch('scale')
	public onScaleChanged(scale: INoteSet) {
		this.buildFretboard();
		this.updateGuitar();
	}
	@Watch('tuning')
	public onTuningChanged() {
		this.buildFretboard();
		this.updateGuitar();
	}
	@Watch('windowDimensions')
	public onResize() {
		this.setForceVertical();
		this.updateGuitar();
	}

	public created(): void {
		let handle: number;
		window.addEventListener('resize', () => {
			clearTimeout(handle);
			handle = setTimeout(this.setWindowDimensions, 200);
		});

		this.setWindowDimensions();
		this.setForceVertical();
	}

	public mounted(): void {
		this.buildFretboard();
		this.renderer = new GuitarRenderer(
			this.$refs.canvas as HTMLCanvasElement,
			this.numFrets,
			this.numStrings,
			this.fretboard,
			this.orientation
		);

		this.renderer.render();
	}

	// public destroyed(): void {
	// 	window.removeEventListener('resize');
	// }

	private buildFretboard(): void {
		if(!this.noteSet) return;

		let tuning: Tuning = JSON.parse(JSON.stringify(this.tuning));
		if(this.handedness === 'left') tuning.notes.reverse();

		this.fretboard = tuning.notes.map((note: Note) => new GuitarString(note.name, this.noteSet));
	}

	private updateGuitar(): void {
		this.renderer.update(this.numFrets, this.numStrings, this.fretboard, this.orientation);
	}

	private setForceVertical(): void {
		this.forceVertical = this.windowDimensions.width < 576;
	}

	private setWindowDimensions(): void {
		this.windowDimensions = {
			width: document.body.clientWidth,
			length: document.body.clientHeight
		};
	}

}
</script>
