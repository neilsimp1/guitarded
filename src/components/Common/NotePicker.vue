<template>
	<div class="note-picker">
		<div v-for="(note, i) in allNotes"
			 :key="note.name"
			 :class="[key === note.name ? 'root' : '']">
			
			<input type="checkbox"
				 :id="'note-pick-' + i"
				 v-on:click="updateNotesPicked(lookupNote($event.target.value))"
				 :value="note.name"
				 :checked="notesPicked.notes.find(n => n.name === note.name)"
				 :disabled="key === note.name" />
			<label :for="'note-pick-' + i">{{ note.displayName }}</label>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Note from '../../classes/Note';
import INoteSet from '../../classes/INoteSet';

@Component({
	name: 'notepicker'
})
export default class NotePicker extends Vue {

	private lookupNote = Note.lookupNote;

	public get key(): string {
		return this.$store.getters.key;
	}
	public get allNotes(): [Note] {
		return Note.getAllNotes();
	}
	public get notesPicked(): INoteSet {
		return this.$store.getters.notesPicked;
	}

	@Watch('key')
	public onKeyChanged(key: string): void {
		this.updateNotesPicked(Note.lookupNote(key), true);
	}
	
	public beforeCreate(): void {
		if(!this.$store.getters.notesPicked){
			const notesPicked: INoteSet = {
				name: 'Custom',
				notes: [Note.lookupNote(this.$store.getters.key)],
				root: this.$store.getters.key
			};
			this.$store.commit('updateNotesPicked', notesPicked);
		}
	}

	private updateNotesPicked(note: Note, forceKeep: boolean = false): void {
		const contains: boolean = !!this.notesPicked.notes.find((n: Note) => n.name === note.name);
		if(contains && forceKeep) return;

		const newNotes: [Note] = contains
			? (this.notesPicked.notes.filter((n: Note) => n.name !== note.name) as [Note])
			: (this.notesPicked.notes.concat([note]) as [Note]);
		
		const newNotesPicked: INoteSet = {
			name: this.notesPicked.name,
			notes: newNotes,
			root: this.notesPicked.root
		};

		this.$store.commit('updateNotesPicked', newNotesPicked);
	}

}
</script>
