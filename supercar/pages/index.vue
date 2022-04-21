<template lang="pug">
.l-body.top
  //GlobalHeaderComp
  //MolleEditerComp
  //main
  //  article.l-content
  //    ModuleLoader(:node="{id:'--no-export%2Ftop'}" :isRoot="true")
  //
  //GlobalFooterComp
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {},
})

export default class Index extends Vue {
}
</script>

<style lang="scss">
.top {

}
</style>
