<template lang="pug">
.module.random-cards(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .random-cards__left
    button.random-cards__btn(
      type="button" @click="select()"
      :enabled="param.enabled"
    )
      img(v-if="!param.weit" src="/img/click.gif")
      img(v-else src="/img/stop.gif")

    .random-cards__ui
      span Level :
      input.form-control.form-control-sm(
        v-model="param.minLv"
        @change="()=>$emit('change')"
        type="number" min="1" :max="Math.min(10,param.maxLv)" step="1"
      )
      span.mr-1 ~
      input.form-control.form-control-sm(
        v-model="param.maxLv"
        @change="()=>$emit('change')"
        type="number" :min="Math.max(1,param.minLv)" max="10" step="1"
      )

  .random-cards__list.row
    .random-cards__item.col-4(
      v-for="(node,i) in itemData.value", :key="node.id"
      :data-current="i==param.current"
    )
      ModuleLoader(
        :ref="i"
        :node="node"
      )

    AddModuleComp.col-12(
      :label="``",
      :parentNode="loader.node"
      :style="{width: '100%'}"
    )
</template>

<script lang="ts">
import {Component} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";
import {IItemData, INodeObject} from "~/molle-cms/src/interface";

@Component({
  components: {},
})
export default class RandomCards extends Module {

  isMolleCms = process.env.isMolleCms;
  param = {
    current: -1,
    enabled: true,
    weit: false,
    minLv: 1,
    maxLv: 10,
  };

  //Unique Methods
  getClass(data: any) {
    let obj = super.getClass(this.itemData);
    if (!this.$route.query.edit) {
      obj["--playable"] = true;
    }
    return obj;
  }

  select() {
    if (!this.param.weit) {
      this.$set(this.param, "weit", true);
      this.weit(Math.floor(Math.random() * 10 + Math.random() * 10 + 5));
    } else {
      this.$set(this.param, "weit", false);
      this.$set(this.param, "enabled", false);
    }
  }

  private weit(count: number) {
    let index = Math.floor(Math.random() * this.itemData.value.length);
    this.$set(this.param, "current", index);
    setTimeout(() => {
      if (!this.param.weit) {
        count--;
      }
      if (count <= 0) {
        //end
        let index = this.lot();
        this.$set(this.param, "current", index);
        this.$set(this.param, "enabled", true);
      } else {
        this.weit(count);
      }
    }, 80);
  }

  private lot(): number {
    let index = Math.floor(Math.random() * this.itemData.value.length);
    // console.log(index, this.itemData.value.length);
    let v = (<any[]>this.$refs[index])[0];
    let itemData = <IItemData>v.itemData;
    let lv = Number.parseInt(itemData.option.lv);
    if (
      this.param.minLv <= lv
      && lv <= this.param.maxLv
      && Number.parseInt(itemData.option.rate) / 100 > Math.random()
    ) {
      return index;
    } else {
      return this.lot();
    }
  }
}
</script>

<style lang="scss">
.random-cards {

  &__btn{
    display: block;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
    img{
      display: block;
    }
  }

  &__list {

  }

  &__ui {
    display: flex;

    input {
      display: inline-block;
      width: auto;
    }
  }

  &__item {
    &[data-current] {
      //      outline: blue 2px solid;
    }
  }

  //
  &.--playable {
    display: flex;
    align-items: center;

    .random-cards {
      &__left {
        width: 30%;
        padding-right: 2rem;
      }

      &__list {
        flex: 1;
        display: block;
        margin: 0;
        position: relative;
      }

      &__item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0;
        max-width: 100%;
        visibility: hidden;
        transform: translateY(-50%);

        &[data-current] {
          visibility: visible;
        }
      }
    }
  }

}
</style>
