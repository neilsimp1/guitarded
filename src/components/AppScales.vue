<template>
	<div>
		TEST 123
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	name: 'appscales'//,
	//components: { Navbar }
})
export default class AppScales extends Vue {

	public mounted(): void {
		console.log(321);
	}

}
</script>
