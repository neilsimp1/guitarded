<template>
	<div id="app">
		<Navbar />
		<main>
            <router-view></router-view>
        </main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from './Navbar.vue';

@Component({
	name: 'app',
	components: { Navbar }
})
export default class App extends Vue {

	public exit(): void {
		window.close();
	}

	public mounted(): void {
		console.log(123);
	}
}
</script>
