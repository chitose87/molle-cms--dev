<template lang="pug">
.editor-option-comp
  .card.bg-light
    .card-body.p-3(v-if="flag")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";

@Component({
  components: {},
})
export default class EditorOptionComp extends Vue {
  flag = false;

  mounted() {
  }

}
</script>

<style lang="scss">
.page-property-comp {
}
</style>
