<template>
	<div :class="['chordbook', 'chordbook-' + orientation ]">

		<div class="chord-controls">
			<ChordControls />
			<GuitarControls />
		</div>

		<Guitar :noteSet="mode === 'browser' ? chord : notesPicked"
			 :module="'ChordBookModule/'" />

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

	public get mode(): any { return this.$store.getters['ChordBookModule/mode'] }
	public get orientation(): any { return this.$store.getters['GuitarModule/orientation'] }
	public get notesPicked(): INoteSet { return this.$store.getters['ChordBookModule/notesPicked'] }
	public get chord(): INoteSet { return this.$store.getters['ChordBookModule/chord'] }

}
</script>
