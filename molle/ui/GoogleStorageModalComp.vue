<template lang="pug">
.google-storage-modal-comp(v-if="isShow")
  .modal(:aria-expanded="isShow")
    .modal__fiexd
      .modal__close(@click="isShow=!isShow")
      .modal__body.bootstrap
        .row
          .col-6
            img(:src="src")
            span.form-inline
              input.form-control-sm.form-control-file(
                type="file",
                name="files",
                accept="image/png,image/jpeg,image/gif",
                @change="onImport"
              )
              button.btn.btn-primary.ml-auto(@click="upload" :disabled="!source")
                span アップロード
            p.caption.text-right *未加工でアップされます

          .col-6
            .form-inline
              label プロファイル
                select.form-control.form-control-sm(v-model="profiles.current" @change="cahngeProfile")
                  option(v-for="(profile,i) in profiles.option" :value="i") {{profile.label}}

            table.table(v-if="jimpImg.bitmap")
              tbody
                tr
                  th
                  th Source
                  th Result
                tr
                  th file
                  td {{files[0].name}}
                  td
                    span.form-inline
                      input.form-control.form-control-sm(type="text" v-model="option.name")
                      span .{{option.mime}}
                tr
                  th MIME
                  td {{jimpImg._originalMime}}
                  td
                    select.form-control.form-control-sm(v-model="option.mime")
                      option(v-for="(value,key) in mime.option" :value="key") {{key}}
                tr(v-if="option.mime == 'jpg'")
                  th Quality
                  td
                  td
                    input.form-control.form-control-sm(
                      type="text"
                      v-model="option.quality"
                      :placeholder="profiles.option[profiles.current].quality"
                      @change="onJimp")
                //tr
                //  th Scale
                //  td
                //  td
                //    span.form-inline
                //      input.form-control.form-control-sm(
                //        type="number"
                //        v-model="option.scale"
                //        :placeholder="1.0"
                //        @change="onJimp")
                tr
                  th Width
                  td {{jimpImg.bitmap.width}}px
                  td
                    span.form-inline
                      input.form-control.form-control-sm(
                        type="text"
                        v-model="option.width"
                        :placeholder="profiles.option[profiles.current].width"
                        @change="onJimp")
                      span px or "auto"
                tr
                  th Height
                  td {{jimpImg.bitmap.height}}px
                  td
                    span.form-inline
                      input.form-control.form-control-sm(
                        type="text"
                        v-model="option.height"
                        :placeholder="profiles.option[profiles.current].height"
                        @change="onJimp")
                      span px or "auto"

            .form-inline
              span 中心点：
              label 横
                select.form-control.form-control-sm(v-model="hAlign.current" @change="onJimp")
                  option(v-for="(value,key) in hAlign.option" :value="key") {{key}}
              label 縦
                select.form-control.form-control-sm(v-model="vAlign.current" @change="onJimp")
                  option(v-for="(value,key) in vAlign.option" :value="key") {{key}}

            p.text-right
              button.btn.btn-primary(@click="save" :disabled="!src")
                span 書き出し&アップロード

</template>

<script lang="ts">
import {Component, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import firebase from "firebase";

declare const Jimp: any;

@Component({
  components: {},
})
export default class GoogleStorageModalComp extends Vue {
  isShow = false;
  source = "";
  src = "";
  callBack?: (url: string) => void;

  hAlign = {
    current: "center",
    option: <{ [key: string]: any }>{
      left: Jimp.HORIZONTAL_ALIGN_LEFT,
      center: Jimp.HORIZONTAL_ALIGN_CENTER,
      right: Jimp.HORIZONTAL_ALIGN_RIGHT,
    }
  }
  vAlign = {
    current: "middle",
    option: <{ [key: string]: any }>{
      top: Jimp.VERTICAL_ALIGN_TOP,
      middle: Jimp.VERTICAL_ALIGN_MIDDLE,
      bottom: Jimp.VERTICAL_ALIGN_BOTTOM,
    }
  }

  mime = {
    // current: "jpg",
    option: <{ [key: string]: any }>{
      jpg: Jimp.MIME_JPEG,
      png: Jimp.MIME_PNG,
    }
  }

  profiles = {
    current: 0,
    option: [
      {
        label: "1:1 JPEG 80%",
        mime: "jpg",
        width: 800,
        height: 800,
        quality: 80
      },
      {
        label: "3:2 JPEG 80%",
        mime: "jpg",
        width: 1200,
        height: 800,
        quality: 80
      },
      {
        label: "800:auto JPEG 80%",
        mime: "jpg",
        width: 800,
        height: "auto",
        quality: 80
      }
    ]
  }

  option = {
    name: "",
    mime: this.profiles.option[this.profiles.current].mime,
    width: "",
    height: "",
  };

  jimpImg: any = {};
  files?: FileList;

  mounted() {
    this.$root.$on("google-storage-view", () => {
      window.open(
        `https://console.firebase.google.com/project/${
          process.env.projectId
        }/storage/${
          process.env.storageBucket
        }/files~2F${
          process.env.molleProjectID
        }`,
        "google-storage-view"
      );
    });
    this.$root.$on("google-storage-upload", (callBack: (url: string) => void) => {
      this.callBack = callBack;
      this.isShow = true;
    });
  }

  cahngeProfile() {
    const profile = this.profiles.option[this.profiles.current];
    this.$set(this.option, "mime", profile.mime);
    this.onJimp();
  }

  onJimp() {
    if (this.jimpImg.bitmap) {
      const profile = this.profiles.option[this.profiles.current];
      console.log(profile);

      try {
        const valueW = this.option.width || profile.width;
        const valueH = this.option.height || profile.height;
        const img = this.jimpImg.clone();

        if (valueW == "auto") {
          img.resize(Jimp.AUTO, Number.parseInt(valueH + ""))
        } else if (valueH == "auto") {
          img.resize(Number.parseInt(valueW + ""), Jimp.AUTO)
        } else {
          img.cover(
            Number.parseInt(valueW + ""),
            Number.parseInt(valueH + ""),
            this.hAlign.option[this.hAlign.current] | this.vAlign.option[this.vAlign.current],
          )
        }

        // if (this.option.scale) {
        //   let scale = Number.parseFloat(this.option.scale);
        //   if (scale && scale != 1) {
        //     console.log(scale)
        //     img.scale(scale);
        //   }
        // }
        img.quality(profile.quality || 80)
          .getBase64(this.mime.option[profile.mime], (err: any, src: any) => {
            this.src = src;
          })
      } catch (e) {
        console.log(e);
        this.src = "";
      }
    }
  }

  onImport(e: Event) {
    //@ts-ignore
    this.files = e.target.files;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.source = e.target.result;
      Jimp.read(e.target.result)
        .then((img: any) => {
            this.$set(this, "jimpImg", img);
            // console.log(this.jimpImg)
            this.onJimp();
          }
        );
    }
    // console.log(this.files![0])
    reader.readAsDataURL(this.files![0]);
    this.option.name = this.files![0].name.match(/([^/]+)\./)![1];
  }

  save() {
    let ref = firebase.storage().ref()
      .child(`${process.env.molleProjectID}/${this.option.name}.${this.option.mime}`);
    ref.putString(this.src, "data_url")
      .then((snap: any) => {
        this.callBack && this.callBack(`https://storage.googleapis.com/${process.env.storageBucket}/${ref.fullPath}`);
        this.isShow = false;
      });
  }

  upload() {
    let ref = firebase.storage().ref()
      .child(`${process.env.molleProjectID}/${this.files![0].name}`);
    ref.putString(this.source, "data_url")
      .then((snap: any) => {
        this.callBack && this.callBack(`https://storage.googleapis.com/${process.env.storageBucket}/${ref.fullPath}`);
        this.isShow = false;
      });
  }
}
</script>

<style lang="scss">
.google-storage-modal-comp {
  .modal {
    & + &__fiexd {

    }
  }

  .table {
    td {
      word-break: break-all;
    }
  }
}
</style>
