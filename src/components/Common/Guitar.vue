<template>
	<div class="guitar">
		<table v-if="fretboard">
			<tr v-for="numFret in numFrets + 1" :key="numFret">
				<td v-for="(gstring, index) in fretboard" :key="index">
					{{ gstring.frets[numFret - 1] ? 'O' : '|' }}
				</td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
//import Chord from '../../classes/Chord';
import GuitarString from '../../classes/GuitarString';
import INoteSet from '../../classes/INoteSet';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';
import Tuning from '../../classes/Tuning';

@Component({
	name: 'guitar'
})
export default class Guitar extends Vue {

	private fretboard: [GuitarString] | null = null;

	@Prop()
	noteSet: INoteSet;

	public get handedness(): string { return this.$store.getters.handedness }
	public get key(): string { return this.$store.getters.key }
	public get tuning(): Tuning { return this.$store.getters.tuning }
	public get notesPicked(): INoteSet { return this.$store.getters.notesPicked }
	public get numFrets(): number { return this.$store.getters.numFrets }
	public get scale(): INoteSet { return this.$store.getters.scale }

	@Watch('handedness')
	public onHandednessChanged() {
		this.buildFretboard();
	}
	@Watch('noteSet')
	public onNoteSetChanged() {
		this.buildFretboard();
	}
	@Watch('notesPicked')
	public onNotesPickedChanged(notesPicked: INoteSet) {
		this.buildFretboard();
	}
	@Watch('scale')
	public onScaleChanged(scale: INoteSet) {
		this.buildFretboard();
	}
	@Watch('tuning')
	public onTuningChanged() {
		this.buildFretboard();
	}

	public mounted(): void {
		this.buildFretboard();
	}

	private buildFretboard(): void {
		if(!this.noteSet) return;
		
		let tuning: Tuning = JSON.parse(JSON.stringify(this.tuning));
		if(this.handedness === 'left') tuning.notes.reverse();

		this.fretboard = (tuning.notes.map((note: Note) => new GuitarString(note.name, this.noteSet)) as [GuitarString]);
	}

}
</script>
