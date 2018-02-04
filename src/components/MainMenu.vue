<template>
	<aside :class="['mainmenu', isMenuOpen ? 'open' : '']">
		<nav>
			<ul>
				<li v-on:click="$parent.isMenuOpen = false">
					<router-link to="scalebook#browser">Scale Book</router-link>
				</li>
				<li v-on:click="$parent.isMenuOpen = false">
					<router-link to="chordbook#browser">Chord Book</router-link>
				</li>
				<li v-on:click="$parent.isMenuOpen = false">
					<router-link to="tuner">Tuner</router-link>
				</li>
				<li v-on:click="$parent.isMenuOpen = false">
					<router-link to="click">Metronome</router-link>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Component({
	name: 'mainmenu'
})
export default class MainMenu extends Vue {

	@Prop()
	isMenuOpen: boolean;

}
</script>
