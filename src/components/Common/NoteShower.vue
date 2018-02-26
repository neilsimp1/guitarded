<template>
	<div>
		<div class="panel-row note-shower">
			<div v-for="note in noteSet.notes" :key="note.name">
				<span>{{ note.degree }}</span>
				<span>{{ note.displayName }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import INoteSet from '../../classes/INoteSet';
import Note from '../../classes/Note';
import Scale from '../../classes/Scale';

@Component({
	name: 'noteshower'
})
export default class NoteShower extends Vue {

	@Prop()
	noteSet: INoteSet;

}
</script>
