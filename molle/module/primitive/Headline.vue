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
		font-weight: bold;
		text-align: center;
		line-height: 1.5;
		@include mediaquery-not-sm {
			font-size: 30px;
			margin-top: 2rem;
			margin-bottom: 3.5rem;
		}
		@include mediaquery-sm {
			font-size: 24px;
			margin-top: 2rem; //?
			margin-bottom: 3.5rem; //?
		}

		&:before {
			content: "";
			position: absolute;
			width: 107px;
			height: 107px;
			background-image: url("/imgs/title-bg.svg");
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
			opacity: 0.15;
			top: 50%;
			left: 50%;
			margin-left: -53px;
			margin-top: -53px;
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
		line-height: 1.5;
		border-bottom: solid 1px $color-gray-400;
		padding-left: 2.5rem;
		padding-bottom: 7px;
		margin-top: 2.5rem;
		margin-bottom: 2rem;
		margin-left: 12px;
		position: relative;

		&:before {
			content: "";
			display: inline-block;
			width: 35px;
			height: 35px;
			background-image: url("/imgs/howto-tree.svg");
			background-size: cover;
			background-position: left bottom;
			background-repeat: no-repeat;
			position: absolute;
			left: -12px;
			bottom: -2px;
		}
	}
}
</style>
