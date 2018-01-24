<template>
	<div>
		<select v-for="stringNum in numStrings" :key="stringNum">
			<option v-if="tuning[stringNum]"
				v-for="note in allNotes"
				:value="tuning.notes[stringNum].name"
				:key="note.name">
				{{ tuning.notes[stringNum].displayName }}
			</option>
		</select>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Note from '../../classes/Note';
import Tuning from '../../classes/Tuning';

@Component({
	name: 'scaletuner'
})
export default class ScaleTuner extends Vue {

	public get tuning(): Tuning {
		return this.$store.getters.tuning;
	}
	public get numStrings(): Tuning {
		return this.$store.getters.numStrings;
	}
	public get allNotes(): [Note] {
		return Note.getAllNotes();
	}
	// public set tuning(): void {

	// }
}
</script>
