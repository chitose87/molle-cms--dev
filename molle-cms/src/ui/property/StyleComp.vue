<template lang="pug">
.style-comp
  hr
  label.form-inline(v-if="permission.theme!==undefined")
    span.mr-1 {{$words.theme}}:
    select.form-control.form-control-sm(v-model="itemData.class.theme" @change="()=>$emit('change')")
      option(v-for="item in permission.theme.select" :value="item" v-html="item.split(' ')[0]")

  label.form-inline(v-if="permission.color!==undefined")
    span.mr-1 {{$words.color}}:
    select.form-control.form-control-sm(v-model="itemData.class.color" @change="()=>$emit('change')")
      option(v-for="item in permission.color.select" :value="item" v-html="item.split(' ')[0]")

  //TextHorizontal
  label.form-inline(v-if="permission.align!==undefined")
    span.mr-1 {{$words.align}}:
    select.form-control.form-control-sm(v-model="itemData.class.align" @change="()=>$emit('change')")
      option(v-for="item in styleAlign" :value="item.value" v-html="$words[item.label]")

  label.form-inline(v-if="permission.align!==undefined")
    span.mr-1 └{{$words.sp}}:
    select.form-control.form-control-sm(v-model="itemData.class.alignSp" @change="()=>$emit('change')")
      option(v-for="item in styleAlign" :value="item.value" v-html="$words[item.label]")

  //space
  label.form-inline(v-if="permission.space!==undefined")
    span.mr-1 Space:
    select.form-control.form-control-sm(v-model="itemData.class.space" @change="()=>$emit('change')")
      option(v-for="item in permission.space.select" :value="item" v-html="item")

    details.molle-guide
      summary
      .molle-guide__body.caption
        p 余白

  //.css
  details(v-if="permission.css")
    summary CSS入力欄
    div
      textarea.form-control.form-control-sm.small(
        v-model="itemData.css"
        @change="()=>$emit('change')"
      )

</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";
import {IItemData} from "../../interface";
import {StyleAlign} from "../../Singleton";

@Component({
  components: {},
})
export default class StyleComp extends Vue {
  styleAlign = StyleAlign;

  @Prop() itemData!: IItemData;
  permission: any = {};

  static spaceSelect = ["", "0", "sm", "md", "lg"];

  created() {
  }

  mounted() {
    //@ts-ignore
    this.permission = this.$parent.constructor.stylePermission;
  }
}
</script>

<style lang="scss">
.style-comp {
}
</style>
