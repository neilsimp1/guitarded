<template>
	<div :class="['scalebook', 'scalebook-' + orientation ]">

		<div class="scale-controls">
			<ScaleControls />
			<GuitarControls />
		</div>

		<Guitar :noteSet="mode === 'browser' ? scale : notesPicked"
			  :module="'ScaleBookModule/'" />

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

	public get mode(): any { return this.$store.getters['ScaleBookModule/mode'] }
	public get orientation(): any { return this.$store.getters['GuitarModule/orientation'] }
	public get notesPicked(): INoteSet { return this.$store.getters['ScaleBookModule/notesPicked'] }
	public get scale(): INoteSet { return this.$store.getters['ScaleBookModule/scale'] }

}
</script>
