<template lang="pug">
.module.google-form(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  form.contact-form(
    :action="`https://docs.google.com/forms/u/0/d/${itemData.value.action}/formResponse`",
    method="post",
    target="hidden_iframe",
    @submit="() => (status = 'submit')"
    :id="itemData.value.id"
  )

    input(
      v-for="item in itemData.value.items",
      type="hidden",
      :name="`entry.${item.id}`",
      :value="arg[`entry.${item.id}`]"
    )
    table.contact-form__fieldset
      tbody
        tr.contact-form__row(
          v-for="item in itemData.value.items",
          :class="{'contact-form---req': item.required}"
        )
          th.contact-form__head
            label.contact-form__label(v-html="item.label")
            legend.contact-form__note(
              v-if="item.note",
              v-html="item.note",
              :placeholder="item.placeholder"
            )
          td.contact-form__body(v-if="item.type === 0")
            // 記述式
            input.contact-form__item(
              type="text",
              v-model="arg[`entry.${item.id}`]",
              :name="item.name",
              :placeholder="item.placeholder",
              :required="item.required",
              :disabled="status !== 'yet'"
            )
          td.contact-form__body(v-else-if="item.type === 1")
            // 段落
            textarea.contact-form__item(
              v-model="arg[`entry.${item.id}`]",
              :name="item.name",
              :placeholder="item.placeholder",
              :required="item.required",
              :disabled="status !== 'yet'"
            )
          td.contact-form__body(v-else-if="item.type === 3")
            // プルダウン
            select.contact-form__item(
              v-model="arg[`entry.${item.id}`]",
              :name="item.name",
              :placeholder="item.placeholder",
              :required="item.required",
              :disabled="status !== 'yet'"
            )
              option(
                v-for="option in JSON.parse(item.typeOption)",
                v-html="option[0]",
                :value="option[0]"
              )
          td.contact-form__body(v-else)
            p {{item.type}}

    .contact__submit
      .contact__submit__text
        p 確認画面はございません。内容をお確かめの上、送信ボタンを押してください。
        button.button-primary(type="submit", :disabled="status !== 'yet'")
          span(v-if="status === 'yet'") 送信する
          span(v-else) 送信が完了しました！
  iframe#hidden_iframe(
    name="hidden_iframe",
    style="display: none",
    @load="() => (status === 'submit' ? (status = 'submitted') : '')"
  )
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import {Module} from "~/molle-cms/src/module/Module";

@Component({
  components: {},
})
export default class GoogleForm extends Module {
  static readonly CLASS_NAME = "GoogleForm";
  arg: any = {};
  status: string = "yet";

  // mounted() {
  //   console.log("GoogleForm", this, this.$el);
  // }
  //
  // @Prop() static__value?: string;
  // changeItem(e: any) {
  //   console.log("changeItem", e, this.status);
  //   let $form = e.target!;
  //   for (let i = 0; i < $form.length; i++) {
  //     let input = $form[i];
  //     if (input && input.id) {
  //       $form.querySelector(`[name="${input.id}"]`).value = input.value;
  //     }
  //   }
  // }
}
</script>

<style lang="scss">
.google-form {
  display: flex;
  flex-wrap: wrap;
}

.contact-form {
  margin-bottom: 4rem;
  width: 100%;

  &__fieldset {
    text-align: left;
    width: 100%;
    @include mediaquery-not-sm {
      margin-left: auto;
      margin-right: auto;
    }
    @include mediaquery-sm {
      display: block;
      width: 100%;
      tbody {
        display: block;
      }
    }
  }

  &__row {
    &:not(:last-child) {
      border-bottom: 1px solid $color-border-light;
    }

    @include mediaquery-sm {
      display: block;
    }
  }

  &__head {
    padding-right: 2rem;
    white-space: nowrap;
    font-weight: normal;
    @include mediaquery-not-sm {
    }
    @include mediaquery-sm {
      display: block;
      padding-top: 1rem;
    }
  }

  &__body {
    padding-bottom: 1rem;
    @include mediaquery-not-sm {
      padding-top: 1rem;
      padding-left: $gutter;
      width: 70%;
    }
    @include mediaquery-sm {
      padding-top: 0.5rem;
      display: block;
    }
  }

  &__label {
    margin-bottom: 0;
  }

  &__note {
    font-size: 14px;
    margin-bottom: 0;
    @include mediaquery-not-sm {
      margin-top: 1rem;
    }
    @include mediaquery-sm {
      margin-top: 0.5rem;
    }
  }

  &__item {
  }

  &---req &__head {
    padding-right: 5rem;
    position: relative;

    &:after {
      content: "必須";
      display: inline-block;
      background-color: $color-red;
      color: $color-text-white;
      padding: 0 1rem;
      position: absolute;
      font-size: 14px;
      border-radius: 12px;
      font-weight: normal;
      right: 0;
      @include mediaquery-not-sm {
        top: 50%;
        transform: translateY(-50%);
      }
      @include mediaquery-sm {
        top: 1rem;
      }
    }
  }
}
</style>
