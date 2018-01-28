<template>
	<aside :class="['mainmenu', isMenuOpen ? 'open' : '']">
		<nav>
			<ul>
				<li><router-link to="scalebook">Scale Book</router-link></li>
				<li><router-link to="chordbook">Chord Book</router-link></li>
				<li><router-link to="tuner">Tuner</router-link></li>
				<li><router-link to="click">Metronome</router-link></li>
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
