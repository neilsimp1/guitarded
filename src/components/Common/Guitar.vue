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
	private resizeHandle: number;
	private windowDimensions: IDimensions = {
		width: document.body.clientWidth,
		length: document.body.clientHeight
	};

	@Prop()
	module: string;
	@Prop()
	noteSet: INoteSet;

	public get handedness(): string { return this.$store.getters['GuitarModule/handedness'] }
	public get tuning(): Tuning { return this.$store.getters['GuitarModule/tuning'] }
	public get notesPicked(): INoteSet { return this.$store.getters[this.module + 'notesPicked'] }
	public get numFrets(): number { return this.$store.getters['GuitarModule/numFrets'] }
	public get numStrings(): number { return this.$store.getters['GuitarModule/numStrings'] }
	public get orientation(): string { return this.forceVertical ? 'vertical' : this.$store.getters['GuitarModule/orientation'] }

	@Watch('forceVertical')
	public onForceVerticalChanged(forceVertical: boolean) {
		this.$root.$emit('forceVerticalChanged', forceVertical);
	}
	@Watch('handedness')
	public onHandednessChanged() {
		this.buildFretboard();
		this.renderGuitar();
	}
	@Watch('numFrets')
	public onNumFretsChanged() {
		this.buildFretboard();
		this.renderGuitar();
	}
	@Watch('noteSet')
	public onNoteSetChanged() {
		this.buildFretboard();
		this.renderGuitar();
	}
	@Watch('orientation')
	public onOrientationChanged(notesPicked: INoteSet) {
		this.buildFretboard();
		this.renderGuitar();
	}
	@Watch('notesPicked')
	public onNotesPickedChanged(notesPicked: INoteSet) {
		this.buildFretboard();
		this.renderGuitar();
	}
	@Watch('scale')
	public onScaleChanged(scale: INoteSet) {
		this.buildFretboard();
		this.renderGuitar();
	}
	@Watch('tuning')
	public onTuningChanged() {
		this.buildFretboard();
		this.renderGuitar();
	}
	@Watch('windowDimensions')
	public onResize() {
		this.setForceVertical();
		this.renderGuitar();
	}

	public created(): void {
		window.addEventListener('resize', this.waitForResizeEnd);
	}

	public mounted(): void {
		this.buildFretboard();
		this.renderer = new GuitarRenderer(this.$refs.canvas as HTMLCanvasElement);
		if(this.noteSet && this.fretboard) this.renderGuitar();
	}

	public destroyed(): void {
		window.removeEventListener('resize', this.waitForResizeEnd);
	}

	private waitForResizeEnd(): void {
		clearTimeout(this.resizeHandle);
		this.resizeHandle = setTimeout(this.setWindowDimensions, 200);
	}

	private buildFretboard(): void {
		if(!this.noteSet) return;

		let tuning: Tuning = JSON.parse(JSON.stringify(this.tuning));
		if(this.handedness === 'left') tuning.notes.reverse();

		this.fretboard = tuning.notes.map((note: Note) => new GuitarString(note.name, this.noteSet));
	}

	private renderGuitar(): void {
		this.renderer.render(this.noteSet.root, this.numFrets, this.numStrings, this.fretboard, this.orientation);
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
