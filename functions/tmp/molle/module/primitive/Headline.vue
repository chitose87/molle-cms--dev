<template lang="pug">
component.module.headline(
	:id="itemData.tagId",
	:is="itemData.option.lv || 'h3'",
	:class="getClass(itemData)",
	:style="getStyle(itemData)",
	v-html="itemData.value || itemData.superValue || ''"
)
</template>

<script lang="ts">
import {Component, Prop} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";

@Component({
	components: {},
})
export default class Headline extends Module {
	@Prop() static__value?: string;
}
</script>

<style lang="scss">
.headline {
	&.text-white {
		color: $color-text-white;
	}
}

h3.headline {
	&.decorate {
		position: relative;
		margin: 0;
    border-bottom: solid 1px $color-text;
		@include mediaquery-not-sm {
      font-size: 25px;
			margin-top: 2rem;
			margin-bottom: 3.5rem;
		}
		@include mediaquery-sm {
			font-size: 24px;
			margin-top: 2rem; //?
			margin-bottom: 3.5rem; //?
		}

		&.text-white {
			&:before {
				filter: brightness(2);
			}
		}
	}
}

h4.headline {
	&.decorate {
    font-size: 21px;
		border-bottom: solid 1px $color-text;
	}
}
</style>
