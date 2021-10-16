<template lang="pug">
.editor-option-comp
  .card.bg-light
    .card-header.pt-1.pb-1.pl-3.pr-3(@click="flag=!flag") {{$words.editer}} {{$words.settings}}
      b-icon(:icon="flag?'chevron-up':'chevron-down'")
    .card-body.p-3(v-if="flag")
      div
        button.btn.btn-sm.btn-outline-secondary(@click="undo")
          b-icon(icon="arrow-return-left")
        button.btn.btn-sm.btn-outline-secondary(@click="redo" :disabled="ls.currentHistory==0")
          b-icon(icon="arrow-return-right")

      span(v-html="ls.currentHistory")
      .list-group.list-group-flush
        .list-group-item.small(v-for="(item,i) in ls.history" :class="{'list-group-item-primary':i==ls.currentHistory}")
          //p(v-html="item.cmd")
          span.mr-2(v-html="i")
          span(v-html="item.before.moduleId")

</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "nuxt-property-decorator";
import {Utils} from "../Utils";

@Component({
  components: {},
})
export default class EditorOptionComp extends Vue {
  flag = false;
  ls = Utils.ls;

  mounted() {

  }

  undo() {
    Utils.undoHistory();
  }

  redo() {
    Utils.redoHistory();
  }

}
</script>

<style lang="scss">
.page-property-comp {
}
</style>
