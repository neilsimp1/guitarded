<template>
	<div>

		<div class="guitar-tuner">
			<label>Tuning</label>
			<div class="panel-row">
				<select v-for="stringNum in numStrings" :key="stringNum" v-on:change="updateTuning(stringNum, $event)">
					<option v-if="tuning && tuning.notes[stringNum - 1]"
						 v-for="note in allNotes"
						 :value="note.name"
						 :key="note.name"
						 :selected="tuning.notes[stringNum - 1].name == note.name">
						{{ note.displayName }}
					</option>
				</select>
			</div>
		</div>

		<div class="panel-row">
			<span class="panel-display">{{ tuning && tuning.name || '' }}</span>
		</div>
		
		<div class="panel-row">
			<label for="tuningpreset">Choose Preset Tuning</label>
			<select id="tuningpreset" v-on:change="gotoTuning">
				<option value="">...</option>
				<option v-for="tuning in tuningsForNumStrings"
					 :key="tuning.name"
					 :value="tuning.name">
					{{ tuning.name }}
				</option>
			</select>
		</div>

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Note from '../../classes/Note';
import Tuning from '../../classes/Tuning';

@Component({
	name: 'guitartuner'
})
export default class GuitarTuner extends Vue {

	private tuningsForNumStrings: [Tuning];

	public get key(): Tuning {
		return this.$store.getters.key;
	}
	public get tuning(): Tuning {
		return this.$store.getters.tuning;
	}
	public get numStrings(): number {
		return this.$store.getters.numStrings;
	}
	public get allNotes(): [Note] {
		return Note.getAllNotes();
	}

	@Watch('numStrings')
	public onNumStringsChanged(numStrings: number): void {
		this.tuningsForNumStrings = Tuning.getTuningsForNumStrings(numStrings);
	}

	public updateTuning(stringNum: number, event: Event): void {
		const newNote: Note | null = Note.lookupNote((event.target as HTMLSelectElement).value, 'name');
		const newNotes: [Note] = (this.tuning.notes.map((n: Note, i: number) => i === stringNum - 1? newNote : n) as [Note]);
		const newTuning: Tuning = new Tuning(Tuning.lookupTuningName(this.numStrings, newNotes), newNotes);
		this.$store.commit('updateTuning', newTuning);
	}

	public beforeCreate(): void {
		const numStrings: number = this.$store.getters.numStrings;
		if(!this.$store.getters.tuning){
			this.$store.commit('updateTunings', Tuning.getDefaultTunings());
			this.$store.commit('updateTuning', Tuning.getDefaultTuning(numStrings));
		}
		if(!this.tuningsForNumStrings){
			this.tuningsForNumStrings = Tuning.getTuningsForNumStrings(numStrings);
		}
	}

	public gotoTuning(event: Event): void {
		const select: HTMLSelectElement = event.target as HTMLSelectElement;
		this.$store.commit('updateTuning', Tuning.lookupTuning(this.numStrings, select.value));
		select.selectedIndex = 0;
	}

}
</script>
