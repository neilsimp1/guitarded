<template>
	<div v-if="isVisible" class="link-list">
		<label>{{ label }}</label>
		<ul>
			<template v-if="!isNested">
				<li v-for="item in items" :key="item[keyProp]">
					<a href="#" v-on:click="onClick(item)">{{ item[displayProp] }}</a>
				</li>
			</template>
			<template v-else>
				<li v-for="item in items" :key="item[itemsLabelProp]">
					<span class="inline-label">{{ item[itemsLabelProp] }}</span>
					<ul class="inline-comma">
						<li v-for="nestedItem in item[itemsProp]" :key="nestedItem[keyProp]">
							<a href="#" v-on:click="onClick(nestedItem)">{{ nestedItem[displayProp] }}</a>
						</li>
					</ul>
				</li>
			</template>
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
	isNested: boolean;
	@Prop()
	isVisible: boolean;
	@Prop()
	label: string;
	@Prop()
	items: any[];
	@Prop()
	itemsProp: string;
	@Prop()
	itemsLabelProp: string;
	@Prop()
	keyProp: string;
	@Prop()
	displayProp: string;
	@Prop()
	onClick: Function;

}
</script>
