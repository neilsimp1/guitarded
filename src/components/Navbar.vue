<template>
	<nav>
		<ul>
			<li><router-link to="scalez">Scales</router-link></li>
			<li><router-link to="tunerz">Tuner</router-link></li>
			<li><router-link to="clickz">Metronome</router-link></li>
		</ul>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	name: 'navbar'
})
export default class Navbar extends Vue {

}
</script>
