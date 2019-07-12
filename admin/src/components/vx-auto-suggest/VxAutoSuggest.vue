<template>
	<div class="vx-auto-suggest">
		<div class="flex items-center relative">
			<vs-input :placeholder="placeholder" ref="input" :class="inputClassses" class="z-50" icon-pack='feather' icon='icon-search' icon-no-border v-model="searchQuery" @keyup.esc="escPressed" @keyup.up="increaseIndex(false)" @keyup.down="increaseIndex" @keyup.enter="suggestionSelected" @focus="updateInputFocus" @blur="updateInputFocus(false)"></vs-input>
		</div>
		<ul ref="scrollContainer" class="auto-suggest-suggestions-list z-50 rounded-lg mt-2 shadow-lg overflow-hidden" :class="{'hidden': !inputFocused}" @mouseenter="insideSuggestions = true" @mouseleave="insideSuggestions = false" @focus="updateInputFocus" @blur="updateInputFocus(false)" tabindex="-1">
			<li
				ref="option"
				class="auto-suggest__suggestion flex items-center justify-between py-3 cursor-pointer"
				v-for="(suggestion, index) in filteredData"
				:key="index"
				:class="{'vx-auto-suggest__current-selected': currentSelected == index, 'pointer-events-none': suggestion.index < 0}"
				@mouseenter="currentSelected = index"
				@click="suggestionSelected">

				<div class="flex items-center">
					<feather-icon :icon="suggestion.labelIcon" svgClasses="h-5 w-5" class="mr-4"></feather-icon>
					<span>{{ suggestion.label }}</span>
				</div>
				<feather-icon v-if="showAction" :icon="data.actionIcon" :svgClasses="[actionClasses(suggestion.highlightAction), 'h-5 w-5']" @click.stop="actionClicked"></feather-icon>
			</li>
		</ul>
	</div>
</template>

<script>
export default{
	props: {
		placeholder: {
			type: String,
			default: 'Search..'
		},
		data: {
			type: Object,
			required: true,
		},
		showAction: {
			type: Boolean,
			default: false,
		},
		inputClassses: {
			type: [String, Object, Array],
		},
		autoFocus: {
			type: Boolean,
			default: false,
		},
		showPinned: {
			type: Boolean,
			default: false
		},
		backgroundOverlay: {
			type: Boolean,
			default: false
		},
		searchLimit: {
			type: Number,
			default: 10
		}
	},
	data() {
		return {
			searchQuery: '',
			filteredData: [],
			currentSelected: -1,
			inputFocused: false,
			insideSuggestions: false,
		}
	},
	watch: {
		// UPDATE SUGGESTIONS LIST
		searchQuery(val) {
			if(val == '') {
				this.inputInit();
				if(this.bodyOverlay) this.$store.commit('TOGGLE_CONTENT_OVERLAY', false);
			}else {
				if(this.backgroundOverlay && !this.bodyOverlay) this.$store.commit('TOGGLE_CONTENT_OVERLAY', true);
				let exactEle = this.data.data.filter((item) => {
					return item.label.toLowerCase().startsWith(this.searchQuery.toLowerCase())
				});
				let containEle = this.data.data.filter((item) => {
					return !item.label.toLowerCase().startsWith(this.searchQuery.toLowerCase()) && item.label.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
				});
				this.filteredData = exactEle.concat(containEle).slice(0,this.searchLimit)
				if(!this.filteredData[0]) this.currentSelected = -1
			}

			// ADD: No result found
			if(!this.filteredData.length && this.searchQuery) {
				this.filteredData = [{
					highlightAction: false,
					index: -1,
					label: 'No results found.',
					labelIcon: 'AlertCircleIcon',
					url: null,
				}]
			}
		},
		autoFocus(val) {
			if(val) this.focusInput();
			else this.searchQuery = '';
		},
		filteredData() {
      this.currentSelected = 0;

			// Prevent selecting if first item in list dont have url e.g. 'No Reult'
			if(this.filteredData[0]){
				if(!this.filteredData[0].url) {
					this.currentSelected = -1
				}
			}
		}
	},
	computed: {
		bodyOverlay() {
			return this.$store.state.bodyOverlay;
		},
		actionClasses() {
			return (isHighlighted) => {
				if(isHighlighted) return `stroke-current text-${this.data.highlightColor}`
			}
		}
	},
	methods: {
		escPressed() {
			this.$emit('closeSearchbar')
			this.searchQuery = '';
			this.filteredData = [];
		},
		inputInit() {
			if(this.showPinned) {
				const starredData = this.data.data.filter((item) => item.highlightAction)
				this.filteredData = starredData;
			}else {
				this.filteredData = [];
			}
		},
		updateInputFocus(val = true) {
			if(val) {
				if(this.searchQuery == '') this.inputInit();
				setTimeout(() => {
					this.inputFocused = true;
				}, 100)
			}
			else {
				if(this.insideSuggestions) return
				setTimeout(() => {
					this.inputFocused = false;
				}, 100)
				this.escPressed();
			}
		},
		suggestionSelected() {
			if(this.bodyOverlay && this.filteredData[0].url) this.$store.commit('TOGGLE_CONTENT_OVERLAY', false);
			if(this.filteredData.length) {
				if(this.filteredData[0].url){
					this.searchQuery = '';
					if(this.currentSelected >= 0 ) this.$emit('selected', this.filteredData[this.currentSelected])
					else this.$emit('selected', this.filteredData[0])
					this.filteredData = [];
				}
			}
		},
		actionClicked() {
			this.$emit('actionClicked', this.filteredData[this.currentSelected])
			if(!this.filteredData[this.currentSelected].highlightAction) this.filteredData.splice(this.currentSelected, 1)
		},
		increaseIndex(val = false) {
			if(!val && this.currentSelected > 0) this.currentSelected--
			else if(val && (this.currentSelected < this.filteredData.length-1) && (this.filteredData[this.currentSelected+1].index > -1)) this.currentSelected++
			this.fixScrolling();
		},
		focusInput() {
			this.$refs.input.$el.querySelector('input').focus();
		},
		fixScrolling() {
			if(this.currentSelected > 0) {
				const liH = this.$refs.option[this.currentSelected].clientHeight;
				const ulH = this.$refs.scrollContainer.clientHeight;
				if(ulH - (liH * this.currentSelected) < liH){
					this.$refs.scrollContainer.scrollTop = Math.round(((this.currentSelected+1) - (ulH / liH)+1) * liH);
				}
			}
		}
	},
	mounted() {
		if(this.autoFocus) this.focusInput();
	}
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxAutoSuggest.scss";
</style>
