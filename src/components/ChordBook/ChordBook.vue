<template>
	<div :class="['chordbook', 'chordbook-' + orientation ]">

		<div class="chord-controls">
			<ChordControls />
			<GuitarControls />
		</div>

		<Guitar :noteSet="mode === 'browser' ? chord : notesPicked" />

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ChordControls from './ChordControls.vue';
import Guitar from '../Common/Guitar.vue';
import GuitarControls from '../Common/GuitarControls.vue';
import INoteSet from '../Common/INoteSet.vue';

@Component({
	name: 'chordbook',
	components: { ChordControls, Guitar, GuitarControls }
})
export default class ChordBook extends Vue {

	public get mode(): any { return this.$store.getters.mode }
	public get orientation(): any { return this.$store.getters.orientation }
	public get notesPicked(): INoteSet { return this.$store.getters.notesPicked }
	public get chord(): INoteSet { return this.$store.getters.chord }

}
</script>
