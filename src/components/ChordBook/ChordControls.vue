<template>
	<div class="panel panel-chord-controls">

		<h1>Chords</h1>

		<div class="panel-row panel-viewtoggle">
			<a href="#browser"
				 v-on:click="updateMode('browser')"
				 :class="[mode === 'browser' ? 'active' : '']">
				Browse Chords
			</a>
			<a href="#builder"
				 v-on:click="updateMode('builder')"
				 :class="[mode === 'builder' ? 'active' : '']">
				Build Chord
			</a>
		</div>

		<div class="panel-row">
			<label for="root">Root</label>
			<select id="root" v-on:change="updateRoot">
				<option v-for="note in allNotes"
					 :value="note.name"
					 :key="note.name"
					 :selected="root === note.name">
					{{ note.displayName }}
				</option>
			</select>
		</div>

		<template v-if="mode === 'browser'">
			<div class="panel-row">
				<label for="chord">Chord</label>
				<select id="chord" v-on:change="updateChord">
					<option v-if="chords"
						 v-for="_chord in chords"
						 :key="_chord.name"
						 :value="_chord.name"
						 :selected="_chord.name === chord.name">
						{{ _chord.name }}
					</option>
				</select>
			</div>
			<NoteShower :noteSet="chord" />
		</template>

		<template v-else-if="mode === 'builder'">
			<NotePicker :module="'ChordBookModule/'" />
		</template>

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NotePicker from '../Common/NotePicker.vue';
import NoteShower from '../Common/NoteShower.vue';
import Chord from '../../classes/Chord';
import Note from '../../classes/Note';

@Component({
	name: 'chordcontrols',
	components: { NotePicker, NoteShower }
})
export default class ChordControls extends Vue {

	public get allNotes(): Note[] { return Note.getAllNotes() }
	public get chord(): Chord { return this.$store.getters['ChordBookModule/chord'] }
	public get chords(): any { return this.$store.getters['ChordBookModule/chords'] }
	public get mode(): any { return this.$store.getters['ChordBookModule/mode'] }
	public get root(): string { return this.$store.getters['ChordBookModule/root'] }

	public beforeCreate(): void {
		if(!this.$store.getters['ChordBookModule/chords']){
			const chords: any = Chord.getChords();
			this.$store.commit('ChordBookModule/updateChords', chords);
			const chord: Chord = new Chord(chords[0].name, chords[0].intervals, this.$store.getters['ChordBookModule/root']);
			this.$store.commit('ChordBookModule/updateChord', chord);
		}
	}

	public updateRoot(event: Event): void {
		this.$store.commit('ChordBookModule/updateRoot', (event.target as HTMLSelectElement).value);
		const newChord = new Chord(this.chord.name, this.chord.intervals, (event.target as HTMLSelectElement).value);
		this.$store.commit('ChordBookModule/updateChord', newChord);
	}

	public updateChord(event: Event): void {
		const newChord: Chord = Chord.getChord((event.target as HTMLSelectElement).value, this.root);
		this.$store.commit('ChordBookModule/updateChord', newChord);
	}

	private updateMode(mode: string): void {
		this.$store.commit('ChordBookModule/updateMode', mode);
	}

}
</script>
