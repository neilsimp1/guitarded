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

	private tuningsForNumStrings: Tuning[];

	public get tuning(): Tuning { return this.$store.getters['GuitarModule/tuning'] }
	public get numStrings(): number { return this.$store.getters['GuitarModule/numStrings'] }
	public get allNotes(): Note[] { return Note.getAllNotes() }

	@Watch('numStrings')
	public onNumStringsChanged(numStrings: number): void {
		this.tuningsForNumStrings = Tuning.getTuningsForNumStrings(numStrings);
	}

	public updateTuning(stringNum: number, event: Event): void {
		const newNote: Note = Note.lookupNote((event.target as HTMLSelectElement).value, 'name');
		const newNotes: Note[] = this.tuning.notes.map((n: Note, i: number) => i === stringNum - 1? newNote : n);
		const newTuning: Tuning = new Tuning(Tuning.lookupTuningName(this.numStrings, newNotes), newNotes);
		this.$store.commit('GuitarModule/updateTuning', newTuning);
	}

	public beforeCreate(): void {
		const numStrings: number = this.$store.getters['GuitarModule/numStrings'];
		if(!this.$store.getters['GuitarModule/tuning']){
			this.$store.commit('GuitarModule/updateTunings', Tuning.getDefaultTunings());
			this.$store.commit('GuitarModule/updateTuning', Tuning.getDefaultTuning(numStrings));
		}
		if(!this.tuningsForNumStrings){
			this.tuningsForNumStrings = Tuning.getTuningsForNumStrings(numStrings);
		}
	}

	public gotoTuning(event: Event): void {
		const select: HTMLSelectElement = event.target as HTMLSelectElement;
		this.$store.commit('GuitarModule/updateTuning', Tuning.lookupTuning(this.numStrings, select.value));
		select.selectedIndex = 0;
	}

}
</script>
