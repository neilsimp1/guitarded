<template>
	<div>
		<ScaleControls />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ScaleControls from './ScaleControls.vue';

@Component({
	name: 'scalebook',
	components: { ScaleControls }
})
export default class ScaleBook extends Vue {

	public mounted(): void {
		
	}

}
</script>
