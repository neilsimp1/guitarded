<template>
	<div id="app">
		<button type="button"
			:class="['mainmenu-toggle', isMenuOpen ? 'open' : '']"
			v-on:click="toggleMainMenu">
			<span></span>
		</button>
		<MainMenu :isMenuOpen="isMenuOpen" />
		<main v-on:click="isMenuOpen && closeMenu()">
            <router-view></router-view>
        </main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MainMenu from './MainMenu.vue';

@Component({
	name: 'app',
	components: { MainMenu }
})
export default class App extends Vue {

	public isMenuOpen: boolean = false;

	public exit(): void {
		window.close();
	}

	public toggleMainMenu(event: Event): void {
		event.preventDefault();
		this.isMenuOpen = !this.isMenuOpen;
	}

	public closeMenu(): void {
		this.isMenuOpen = false;
	}

}
</script>
