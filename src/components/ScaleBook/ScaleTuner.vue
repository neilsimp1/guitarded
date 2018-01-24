<template>
	<div>
		<select v-for="stringNum in numStrings" :key="stringNum">
			<option v-if="tuning && tuning.notes[stringNum - 1]"
				v-for="note in allNotes"
				:value="tuning.notes[stringNum - 1].name"
				:key="note.name"
				:selected="tuning.notes[stringNum - 1].name == note.name">
				{{ note.displayName }}
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
	public get numStrings(): number {
		return this.$store.getters.numStrings;
	}
	public get allNotes(): [Note] {
		return Note.getAllNotes();
	}
	// public set tuning(): void {

	// }

	public beforeCreate(): void {
		if(!this.$store.getters.tuning){
			(async () => {
				const defaultTunings: any = await Tuning.getAllDefaultTunings();
				this.$store.dispatch('updateTunings', defaultTunings);
				const tuning: Tuning = await Tuning.getDefaultTuning(6);
				this.$store.dispatch('updateTuningAll', tuning);
			})();
		}
	}
}
</script>
