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
			<label for="key">Key</label>
			<select id="key" v-on:change="updateKey">
				<option v-for="note in allNotes"
					 :value="note.name"
					 :key="note.name"
					 :selected="key === note.name">
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
		</template>

		<template v-else-if="mode === 'builder'">
			<NotePicker />
		</template>

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NotePicker from '../Common/NotePicker.vue';

@Component({
	name: 'chordcontrols',
	components: { NotePicker }
})
export default class ChordControls extends Vue {

	public get numStrings(): number {
		return this.$store.getters.numStrings;
	}

	public get numFrets(): number {
		return this.$store.getters.numFrets;
	}
}
</script>
