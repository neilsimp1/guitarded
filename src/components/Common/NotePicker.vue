<template>
	<div>
		<div class="panel-row">
			<span class="panel-display">{{ notesPicked.name }}</span>
		</div>

		<div class="note-picker">
			<div v-for="(note, i) in allNotes"
				:key="note.name"
				:class="[root === note.name ? 'root' : '']">

				<input type="checkbox"
					:id="'note-pick-' + i"
					v-on:click="updateNotesPicked(lookupNote($event.target.value))"
					:value="note.name"
					:checked="notesPicked.notes.find(n => n.name === note.name)"
					:disabled="root === note.name" />
				<label :for="'note-pick-' + i">{{ note.displayName }}</label>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Chord from '../../classes/Chord';
import INoteSet from '../../classes/INoteSet';
import Note from '../../classes/Note';
import NoteSet from '../../classes/NoteSet';
import Scale from '../../classes/Scale';

@Component({
	name: 'notepicker'
})
export default class NotePicker extends Vue {

	private lookupNote = Note.lookupNote;

	@Prop()
	module: string;

	public get allNotes(): Note[] { return Note.getAllNotes() }
	public get root(): string { return this.module === 'ScaleBookModule/' ? this.$store.getters['ScaleBookModule/key'] : this.$store.getters['ChordBookModule/root']}
	public get notesPicked(): INoteSet { return this.$store.getters[this.module + 'notesPicked'] }

	@Watch('root')
	public onRootChanged(root: string): void {
		this.updateNotesPicked(Note.lookupNote(root), true);
	}

	public created(): void {
		if(!this.$store.getters[this.module + 'notesPicked']){
			const notesPicked: INoteSet = {
				name: 'Custom',
				notes: [Note.lookupNote(this.root)],
				root: this.root
			};
			this.$store.commit(this.module + 'updateNotesPicked', notesPicked);
		}
	}

	private updateNotesPicked(note: Note, forceKeep: boolean = false): void {
		const contains: boolean = !!this.notesPicked.notes.find((n: Note) => n.name === note.name);

		let newNotes: Note[] = [];
		if(contains){
			newNotes = forceKeep ? this.notesPicked.notes
				: this.notesPicked.notes.filter((n: Note) => n.name !== note.name);
		}
		else newNotes = this.notesPicked.notes.concat([note]);
		newNotes = NoteSet.sort(this.root, newNotes);

		let newScaleChordName = 'Custom';
		if(newNotes.length > 2){
			if(this.$route.path.includes('scale')){
				newScaleChordName = Scale.lookupName(this.root, newNotes);
			}
			else if(this.$route.path.includes('chord')){
				newScaleChordName = Chord.lookupName(this.root, newNotes);
			}
		}

		const newNotesPicked: INoteSet = {
			name: newScaleChordName,
			notes: newNotes,
			root: this.root
		};

		this.$store.commit(this.module + 'updateNotesPicked', newNotesPicked);
	}

}
</script>
