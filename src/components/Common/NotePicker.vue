<template>
	<div class="note-picker">
		<div v-for="(note, i) in allNotes" :key="note.name">
			
			<input type="checkbox"
				 :id="'note-pick-' + i"
				 v-on:click="toggleNote"
				 :value="note.name"
				 :checked="key === note.name"
				 :disabled="key === note.name" />
			<label :for="'note-pick-' + i">{{ note.displayName }}</label>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Note from '../../classes/Note';

@Component({
	name: 'notepicker'
})
export default class NotePicker extends Vue {

	public get key(): string {
		return this.$store.getters.key;
	}
	public get allNotes(): [Note] {
		return Note.getAllNotes();
	}
	public get notesPicked()/*: [Note]*/ {
		return;
	}

	public toggleNote(): void {
		return;
	}

}
</script>
