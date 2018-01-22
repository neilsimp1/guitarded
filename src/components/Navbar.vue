<template>
	<nav>
		<ul>
			<li><router-link to="scalebook">Scale Book</router-link></li>
			<li><router-link to="chordbook">Chord Book</router-link></li>
			<li><router-link to="tuner">Tuner</router-link></li>
			<li><router-link to="click">Metronome</router-link></li>
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
