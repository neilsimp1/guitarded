<template>
	<div>
		<table v-if="fretboard">
			<tr v-for="numFret in numFrets + 1" :key="numFret">
				<td v-for="(gstring, index) in fretboard" :key="index">
					{{ gstring.frets[numFret - 1] ? 1 : 0 }}
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
	private noteSet: INoteSet;

	@Prop()
	noteSetSource: string;

	public get tuning(): Tuning {
		return this.$store.getters.tuning;
	}
	public get numFrets(): number {
		return this.$store.getters.numFrets;
	}
	// public get chord(): Chord {
	// 	return this.$store.getters.chord;
	// }
	public get scale(): Scale {
		return this.$store.getters.scale;
	}
	// public get key(): string {
	// 	return this.$store.getters.key;
	// }

	@Watch('tuning')
	public onTuningChanged() {
		this.buildFretboard();
	}
	@Watch('scale')
	public onScaleChanged(scale: Scale) {
		this.noteSet = scale;
		this.buildFretboard();
	}

	public created(): void {
		this.noteSet = (this as any)[this.noteSetSource];
		this.buildFretboard();
	}

	private buildFretboard(): void {
		this.fretboard = (this.tuning.notes.map((note: Note) => new GuitarString(note.name, this.noteSet)) as [GuitarString]);
	}

}
</script>
