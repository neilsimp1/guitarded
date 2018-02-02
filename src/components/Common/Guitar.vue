<template>
	<div>
		<button v-on:click="buildFretboard">a</button>
		
		<table v-if="fretboard">
			<tr v-for="numFret in numFrets" :key="numFret">
				<td v-for="(gstring, index) in fretboard" :key="index">
					{{ gstring.frets[i] ? 1 : 0 }}
				</td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
//import Chord from '../../classes/Chord';
import GuitarString from '../../classes/GuitarString';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';
import Tuning from '../../classes/Tuning';

@Component({
	name: 'guitar'
})
export default class Guitar extends Vue {

	private fretboard: [GuitarString];
	private noteSet: Scale /*| Chord*/;

	public get tuning(): Tuning {
		return this.$store.getters.tuning;
	}
	public get numFrets(): number {
		return this.$store.getters.numFrets;
	}

	public beforeCreate(): void {
		this.noteSet = this.$store.getters.scale;///////////////
	}

	private buildFretboard(): void {
		this.fretboard = (this.tuning.notes.map((note: Note) => new GuitarString(note.name, this.noteSet)) as [GuitarString]);
	}

}
</script>
