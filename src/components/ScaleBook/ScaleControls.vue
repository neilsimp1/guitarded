<template>
	<div class="panel panel-scale-controls">

		<h1>Scales</h1>

		<div class="panel-row panel-viewtoggle">
			<a href="#browser"
				 v-on:click="updateMode('browser')"
				 :class="[mode === 'browser' ? 'active' : '']">
				Browse Scales
			</a>
			<a href="#builder"
				 v-on:click="updateMode('builder')"
				 :class="[mode === 'builder' ? 'active' : '']">
				Build Scale
			</a>
		</div>

		<div class="panel-row">
			<label for="key">Key</label>
			<select id="key" v-on:change="updateKey">
				<option v-for="note in allNotes"
					 :value="note.name"
					 :key="note.name"
					 :selected="key === note.name">
					{{ note.displayName }}
				</option>
			</select>
		</div>

		<template v-if="mode === 'browser'">
			<div class="panel-row">
				<label for="scale">Scale</label>
				<select id="scale" v-on:change="updateScale">
					<option v-if="scales"
						 v-for="_scale in scales"
						 :key="_scale.name"
						 :value="_scale.name"
						 :selected="_scale.name === scale.name">
						{{ _scale.name }}
					</option>
				</select>
			</div>
			<NoteShower :noteSet="scale" />
		</template>

		<template v-else-if="mode === 'builder'">
			<NotePicker :module="'ScaleBookModule/'" />
		</template>

		<div class="panel-row">
			<LinkList :isVisible="!!chordsInKey && !!chordsInKey.length"
				 :label="'Chords in this key'"
				 :items="chordsInKey"
				 :keyProp="'name'"
				 :displayProp="'name'"
				 :onClick="() => {}" />
		</div>

		<div class="panel-row panel-row-right">
			<div class="button-grp-toggle">
				<button type="button"
					 v-on:click="playScale"
					 :disabled="isPlaying"
					 :class="[isPlaying ? 'active' : '', 'btn-toggle']">&#9658; Play</button>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import LinkList from '../Common/LinkList.vue';
import NotePicker from '../Common/NotePicker.vue';
import NoteShower from '../Common/NoteShower.vue';
import Chord from '../../classes/Chord';
import INoteSet from '../../classes/INoteSet';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';

@Component({
	name: 'scalecontrols',
	components: { LinkList, NotePicker, NoteShower }
})
export default class ScaleControls extends Vue {

	public isPlaying: boolean = false;
	private chordsInKey: INoteSet[] = [];

	public get allNotes(): Note[] { return Note.getAllNotes() }
	public get key(): string { return this.$store.getters['ScaleBookModule/key'] }
	public get mode(): any { return this.$store.getters['ScaleBookModule/mode'] }
	public get notesPicked(): INoteSet { return this.$store.getters['ScaleBookModule/notesPicked'] }
	public get scale(): Scale { return this.$store.getters['ScaleBookModule/scale'] }
	public get scales(): any { return this.$store.getters['ScaleBookModule/scales'] }

	@Watch('notesPicked')
	public onNotesPickedChanged(notesPicked: INoteSet): void {
		this.findChordsInScale(notesPicked);
	}
	@Watch('scale')
	public onScaleChanged(scale: INoteSet): void {
		this.findChordsInScale(scale);
	}

	public beforeCreate(): void {
		if(!this.$store.getters['ScaleBookModule/scales']){
			const scales: any = Scale.getScales();
			this.$store.commit('ScaleBookModule/updateScales', scales);
			const scale: Scale = new Scale(scales[0].name, scales[0].intervals, this.$store.getters['ScaleBookModule/key']);
			this.$store.commit('ScaleBookModule/updateScale', scale);
		}
	}

	public updateKey(event: Event): void {
		this.$store.commit('ScaleBookModule/updateKey', (event.target as HTMLSelectElement).value);
		const newScale = new Scale(this.scale.name, this.scale.intervals, (event.target as HTMLSelectElement).value);
		this.$store.commit('ScaleBookModule/updateScale', newScale);
	}

	public updateScale(event: Event): void {
		const newScale: Scale = Scale.getScale((event.target as HTMLSelectElement).value, this.key);
		this.$store.commit('ScaleBookModule/updateScale', newScale);
	}

	private updateMode(mode: string): void {
		this.$store.commit('ScaleBookModule/updateMode', mode);
	}

	private findChordsInScale(noteSet: INoteSet): void {
		if(noteSet.name === 'Diatonic'){
			this.chordsInKey = [];
			return;
		}

		Vue.nextTick().then(_ => this.chordsInKey = Chord.lookupChordsInKey(noteSet));
	}

	private async playScale(): Promise<void> {
		const scale: Scale = this.mode === 'browser'
			? new Scale(this.scale.name, this.scale.intervals, this.key)
			: new Scale(this.notesPicked.name, Scale.computeIntervals(this.key, this.notesPicked.notes), this.key);

		this.isPlaying = true;
		await scale.playSequence(true);
		this.isPlaying = false;
	}

}
</script>
