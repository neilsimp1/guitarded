<template>
	<div v-if="isVisible" class="note-picker-similar">
		<label>{{ label }}</label>
		<ul>
			<li v-for="item in items" :key="item[keyProp]">
				<a href="#" v-on:click="onClick(item)">{{ item[displayProp] }}</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
	name: 'linklist'
})
export default class LinkList extends Vue {

	@Prop()
	isVisible: boolean;
	@Prop()
	label: string;
	@Prop()
	items: any[];
	@Prop()
	keyProp: string;
	@Prop()
	displayProp: string;
	@Prop()
	onClick: Function;

}
</script>
