<template>
	<div>
		<select v-for="stringNum in numStrings" :key="stringNum" v-on:change="updateTuning(stringNum, $event)">
			<option v-if="tuning && tuning.notes[stringNum - 1]"
				v-for="note in allNotes"
				:value="note.name"
				:key="note.name"
				:selected="tuning.notes[stringNum - 1].name == note.name">
				{{ note.displayName }}
			</option>
		</select>
		<span>{{ tuning && tuning.name || '' }}</span>
		<button type="button" v-on:click="gotoStandardTuning">Standard Tuning</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Note from '../../classes/Note';
import Tuning from '../../classes/Tuning';

@Component({
	name: 'guitartuner'
})
export default class GuitarTuner extends Vue {

	public get tuning(): Tuning {
		return this.$store.getters.tuning;
	}
	public get numStrings(): number {
		return this.$store.getters.numStrings;
	}
	public get allNotes(): [Note] {
		return Note.getAllNotes();
	}

	public updateTuning(stringNum: number, event: Event): void {
		const newNote: Note | null = Note.lookupNote((event.target as HTMLSelectElement).value, 'name');
		const newNotes: [Note] = (this.tuning.notes.map((n: Note, i: number) => i === stringNum - 1? newNote : n) as [Note]);
		const newTuning: Tuning = new Tuning(Tuning.lookupTuningName(this.numStrings, newNotes), newNotes);
		this.$store.commit('updateTuning', newTuning);
	}

	public beforeCreate(): void {
		if(!this.$store.getters.tuning){
			this.$store.commit('updateTunings', Tuning.getDefaultTunings());
			this.$store.commit('updateTuning', Tuning.getDefaultTuning(6));
		}
	}

	public gotoStandardTuning(): void {
		this.$store.commit('updateTuning', Tuning.getDefaultTuning(this.numStrings));
	}

}
</script>
