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
	name: 'appscales',
	components: { ScaleControls }
})
export default class AppScales extends Vue {

	public mounted(): void {
		console.log(321);
	}

}
</script>
