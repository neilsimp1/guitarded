<template>
	<nav>
		<ul>
			<li><a href="/scales">Scales</a></li>
			<li><a href="/tuner">Tuner</a></li>
			<li><a href="/metronome">Metronome</a></li>
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
