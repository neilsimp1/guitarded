<template>
	<div>
		<GuitarControls />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import GuitarControls from '../Common/GuitarControls.vue';

@Component({
	name: 'scalebook',
	components: { GuitarControls }
})
export default class ScaleBook extends Vue {

	public mounted(): void {

	}

}
</script>
