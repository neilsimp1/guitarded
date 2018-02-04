<template>
	<div>

		<div class="scale-controls">
			<ScaleControls />
			<GuitarControls />
		</div>

		<Guitar :noteSet="mode === 'browser' ? this.scale : this.notesPicked" />

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Guitar from '../Common/Guitar.vue';
import GuitarControls from '../Common/GuitarControls.vue';
import INoteSet from '../Common/INoteSet.vue';
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
	public get notesPicked(): INoteSet {
		return this.$store.getters.notesPicked;
	}
	public get scale(): INoteSet {
		return this.$store.getters.scale;
	}

}
</script>
