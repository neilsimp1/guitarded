<template>
	<div>
		<GuitarControls />
		<select>
			<option v-if="scales"
				v-for="_scale in scales"
				:key="_scale.name"
				:value="_scale.name"
				:selected="_scale.name === scale.name">
				{{ _scale.name }}
			</option>
		</select>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import GuitarControls from '../Common/GuitarControls.vue';
import Scale from '../../classes/Scale';

@Component({
	name: 'scalebook',
	components: { GuitarControls }
})
export default class ScaleBook extends Vue {

	public get scales(): any {
		return this.$store.getters.scales;
	}
	public get scale(): Scale {
		return this.$store.getters.scale;
	}

	public beforeCreate(): void {
		if(!this.$store.getters.scales){
			(async () => {
				const scales: any = await Scale.getAllScales();
				this.$store.dispatch('updateScales', scales);
				this.$store.dispatch('updateScale', scales[0]);
			})();
		}
	}

}
</script>
