<template>
	<div>

		<div class="scale-controls">
			<ScaleControls />
			<GuitarControls />
		</div>

		<Guitar :noteSetSource="'scale'" :scaleNoteSetSource="mode" />

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Guitar from '../Common/Guitar.vue';
import GuitarControls from '../Common/GuitarControls.vue';
import ScaleControls from './ScaleControls.vue';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';

@Component({
	name: 'scalebook',
	components: { Guitar, GuitarControls, ScaleControls }
})
export default class ScaleBook extends Vue {

	public get mode(): any {
		return this.$store.getters.mode;
	}

}
</script>
