<template>
	<div>
		<ChordControls />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ChordControls from './ChordControls.vue';

@Component({
	name: 'chordbook',
	components: { ChordControls }
})
export default class ChordBook extends Vue {

	public mounted(): void {
		console.log(321);
	}

}
</script>
