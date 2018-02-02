<template>
	<div>
		<GuitarControls />

		<label>Key</label>
		<select v-on:change="updateKey">
			<option v-for="note in allNotes"
				:value="note.name"
				:key="note.name"
				:selected="key === note.name">
				{{ note.displayName }}
			</option>
		</select>

		<label>Scale</label>
		<select v-on:change="updateScale">
			<option v-if="scales"
				v-for="_scale in scales"
				:key="_scale.name"
				:value="_scale.name"
				:selected="_scale.name === scale.name">
				{{ _scale.name }}
			</option>
		</select>
		<Guitar />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Guitar from '../Common/Guitar.vue';
import GuitarControls from '../Common/GuitarControls.vue';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';

@Component({
	name: 'scalebook',
	components: { Guitar, GuitarControls }
})
export default class ScaleBook extends Vue {

	public get scales(): any {
		return this.$store.getters.scales;
	}
	public get scale(): Scale {
		return this.$store.getters.scale;
	}
	public get key(): string {
		return this.$store.getters.key;
	}
	public get allNotes(): [Note] {
		return Note.getAllNotes();
	}

	public beforeCreate(): void {
		if(!this.$store.getters.scales){
			const scales: any = Scale.getScales();
			this.$store.commit('updateScales', scales);
			const scale = new Scale(scales[0].name, scales[0].intervals, this.key);
			this.$store.commit('updateScale', scales[0]);
		}
	}

	public updateKey(event: Event): void {
		this.$store.commit('updateKey', (event.target as HTMLSelectElement).value);
		const newScale = new Scale(this.scale.name, this.scale.intervals, (event.target as HTMLSelectElement).value);
		this.$store.commit('updateScale', newScale);
	}

	public updateScale(event: Event): void {
		const newScale: Scale = Scale.getScale((event.target as HTMLSelectElement).value, this.key);
		this.$store.commit('updateScale', newScale);
	}

}
</script>
