<template>
	<div class="panel panel-guitar-controls">

		<h1>Guitar Setup</h1>

		<div class="panel-row">
			<label for="numstrings"># Strings</label>
			<select id="numstrings"
				 :value="numStrings"
				 v-on:change="updateNumStrings">
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
			</select>

			<label for="numfrets"># Frets</label>
			<select id="numfrets"
				 :value="numFrets"
				 v-on:change="updateNumFrets">
				<option value="19">19</option>
				<option value="20">20</option>
				<option value="21">21</option>
				<option value="22">22</option>
				<option value="23">23</option>
				<option value="24">24</option>
				<option value="25">25</option>
			</select>

			<div class="handedness-buttons button-grp-toggle">
				<button type="button"
					 v-on:click="updateHandedness('left')"
					 :disabled="handedness === 'left'"
					 :class="[handedness === 'left' ? 'active' : '', 'btn-toggle']">LH</button>
				<button type="button"
					 v-on:click="updateHandedness('right')"
					 :disabled="handedness === 'right'"
					 :class="[handedness === 'right' ? 'active' : '', 'btn-toggle']">RH</button>
			</div>
		</div>

		<GuitarTuner />

		<div class="panel-row">
			<div class="handedness-buttons button-grp-toggle">
				<button type="button"
					 v-on:click="updateOrientation('horizontal')"
					 :disabled="orientation === 'horizontal'"
					 :class="[orientation === 'horizontal' ? 'active' : '', 'btn-toggle']">Horizontal</button>
				<button type="button"
					 v-on:click="updateOrientation('vertical')"
					 :disabled="orientation === 'vertical'"
					 :class="[orientation === 'vertical' ? 'active' : '', 'btn-toggle']">Vertical</button>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import GuitarTuner from './GuitarTuner.vue';

@Component({
	name: 'guitarcontrols',
	components: { GuitarTuner }
})
export default class GuitarControls extends Vue {

	public get handedness(): string { return this.$store.getters.handedness }
	public get numStrings(): number { return this.$store.getters.numStrings }
	public get numFrets(): number { return this.$store.getters.numFrets }
	public get orientation(): number { return this.$store.getters.orientation }
	public get tunings(): any { return this.$store.getters.tunings }

	@Watch('numStrings')
	public onPropertyChanged(numStrings: number) {
		this.$store.commit('updateTuning', this.tunings[numStrings]);
	}

	public updateHandedness(handedness: string): void {
		this.$store.commit('updateHandedness', handedness);
	}

	public updateOrientation(orientation: string): void {
		this.$store.commit('updateOrientation', orientation);
	}

	public updateNumStrings(event: Event): void {
		this.$store.commit('updateNumStrings', parseInt((event.target as HTMLInputElement).value));
	}

	public updateNumFrets(event: Event): void {
		this.$store.commit('updateNumFrets', parseInt((event.target as HTMLInputElement).value));
	}
}
</script>
