<template>
	<div>
		
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Note from '../../classes/Note';

@Component({
	name: 'chordtuner'
})
export default class ChordTuner extends Vue {

	public get tuning(): [Note] {
		return this.$store.getters.tuning;
	}
	// public set tuning(): void {

	// }
}
</script>
