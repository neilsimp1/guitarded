<template>
	<div>
		<label># Strings</label>
		<select :value="numStrings"
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

		<label># Frets</label>
		<select :value="numFrets"
			v-on:change="updateNumFrets">
			<option value="19">19</option>
			<option value="20">20</option>
			<option value="21">21</option>
			<option value="22">22</option>
			<option value="23">23</option>
			<option value="24">24</option>
			<option value="25">25</option>
		</select>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ScaleTuner from './ScaleTuner.vue';

@Component({
	name: 'scalecontrols',
	components: { ScaleTuner }
})
export default class ScaleControls extends Vue {

	public get numStrings(): number { return this.$store.getters.numStrings }
	public get numFrets(): number { return this.$store.getters.numFrets }
	public get tuning(): number { return this.$store.getters.tuning }

	public updateNumStrings(event: Event): void {
		this.$store.commit('updateNumStrings', (event.target as HTMLInputElement).value);
	}

	public updateNumFrets(event: Event): void {
		this.$store.commit('updateNumFrets', (event.target as HTMLInputElement).value);
	}
}
</script>
