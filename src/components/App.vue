<template>
	<p>TEST</p>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	name: 'app'
})
export default class App extends Vue {

	public exit(): void {
		window.close();
	}

	mounted(): void {
		console.log(123);
	}
}
</script>
