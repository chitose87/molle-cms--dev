<template lang="pug">
.google-storage-modal-comp(v-if="isShow")
  .modal(:aria-expanded="isShow")
    .modal__fiexd
      .modal__close(@click="isShow=!isShow")
      .modal__body.bootstrap
        .h-100(
          @drop="onDrop"
          @dragover="(e)=>onDrag(e,true)"
          @dragleave="(e)=>onDrag(e,false)"
          :style="{opacity:isDragOver?0.5:1}"
        )
          .mb-3
            span.form-inline
              input.form-control-sm.form-control-file(
                type="file",
                name="files",
                accept="image/png,image/jpeg,image/gif,image/svg+xml",
                @change="onImport"
              )
          //
          b-tabs(v-if="src")
            // Original
            b-tab(title="Original")
              img.google-storage-modal-comp__img(:src="src" @load="sourceLoaded")
              .mt-2
                .form-inline
                  label
                    span.mr-1 ファイル名
                    input.form-control.form-control-sm(
                      type="text"
                      v-model="option.name"
                    )
                  span.ml-1 .{{option.sourceType}}
                  span.ml-3 {{option.sourceWidth}}px : {{option.sourceHeight}}px

                  button.btn.btn-primary.ml-auto(@click="uploadSource" :disabled="!source && isDragOver")
                    span {{$words.upload}}

            // Trimming
            b-tab(title="Trimming" @click="thumbLoaded")
              .row
                .col-8
                  img.google-storage-modal-comp__img(:src="src" ref="thumb" @load="thumbLoaded")
                .col-4
                  .form-inline
                    label {{$words.profile}}
                      select.form-control.form-control-sm(v-model="profiles.current" @change="cahngeProfile")
                        option(v-for="(profile,i) in profiles.option" :value="i") {{profile.label}}
                  hr
                  table.table
                    tbody
                      tr
                        th
                        th
                      tr
                        th 縦横比
                        td
                          select.form-control.form-control-sm(v-model="option.aspect" @change="cahngeAspect")
                            option(v-for="(ele,i) in [['16:9',16/9],['4:3',4/3],['1:1',1],['Free',0]]" :value="ele[1]") {{ele[0]}}
                      tr
                        th {{$words.mime}}
                        //td {{jimpImg._originalMime}}
                        td
                          select.form-control.form-control-sm(v-model="option.mime")
                            option(v-for="(value,key) in mime" :value="key") {{key}}
                      tr(v-if="option.mime == 'jpg'")
                        th {{$words.quality}}
                        //td
                        td
                          input.form-control.form-control-sm(
                            type="text"
                            v-model="option.quality"
                            :placeholder="profiles.option[profiles.current].quality"
                          )
                      tr
                        th {{$words.width}}
                        td
                          span.form-inline
                            input.form-control.form-control-sm(
                              type="text"
                              v-model="option.width"
                              :placeholder="profiles.option[profiles.current].width"
                              @change="")
                            span px or "{{$words.auto}}"
                      tr
                        th {{$words.height}}
                        td
                          span.form-inline
                            input.form-control.form-control-sm(
                              type="text"
                              v-model="option.height"
                              :placeholder="profiles.option[profiles.current].height"
                              @change="")
                            span px or "{{$words.auto}}"

                  div
                    span.ml-3 {{option.sourceWidth}}px : {{option.sourceHeight}}px
                  .form-inline
                    label
                      span.mr-1 ファイル名
                      input.form-control.form-control-sm(
                        type="text"
                        v-model="option.name"
                      )
                    span.ml-1 .{{option.mime}}

                    button.btn.btn-primary.ml-auto(@click="uploadTrim" :disabled="!source && isDragOver")
                      span {{$words.upload}}

</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import firebase from "firebase";
import Cropper from "cropperjs";

@Component({
  components: {},
})
export default class GoogleStorageModalComp extends Vue {
  isShow = false;
  source = "";
  src = "";
  callBack?: (url: string) => void;

  cropper?: Cropper;
  isDragOver = false;

  mime: any = {
    jpg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    // svg: "image/svg+xml",
  };

  profiles = {
    current: 0,
    option: [
      {
        label: "小 16:9 JPEG 80%",
        mime: "jpg",
        width: 640,
        aspect: 16 / 9,
        // height: 640 / (16 / 9),
        quality: 80,
      },
      {
        label: "中 16:9 JPEG 80%",
        mime: "jpg",
        width: 1280,
        aspect: 16 / 9,
        // height: 1280 / (16 / 9),
        quality: 80,
      },
      {
        label: "大 16:9 JPEG 80%",
        mime: "jpg",
        width: 1920,
        aspect: 16 / 9,
        // height: 1920 / (16 / 9),
        quality: 80,
      },
      {
        label: "SP大 1:1 JPEG 80%",
        mime: "jpg",
        width: 640,
        aspect: 1,
        // height: 640,
        quality: 80,
      },
    ],
  };

  option = {
    name: "",
    sourceType: "",
    sourceWidth: 0,
    sourceHeight: 0,
    aspect: 0,
    mime: this.profiles.option[this.profiles.current].mime,
    width: "",
    height: "",
  };

  jimpImg: any = {};
  file?: File;

  mounted() {
    this.$root.$on("google-storage-view", () => {
      window.open(
        `https://console.firebase.google.com/project/${
          process.env.projectId
        }/storage/${
          process.env.storageBucket
        }/files/~2F${
          process.env.molleProjectID
        }`,
        "google-storage-view",
      );
    });
    this.$root.$on("google-storage-upload", (callBack: (url: string) => void) => {
      this.callBack = callBack;
      this.isShow = true;
    });
  }

  cahngeProfile() {
    const profile = this.profiles.option[this.profiles.current];
    Object.assign(this.option, profile);
    this.cahngeAspect();
  }

  cahngeAspect() {
    if (this.cropper) {
      this.cropper.setAspectRatio(this.option.aspect);
    }
  }

  //D&D
  onDrag(e: any, flag: boolean) {
    e.stopPropagation();
    e.preventDefault();
    this.isDragOver = flag;
  }

  onDrop(e: any) {
    this.onDrag(e, false);

    var files = e.dataTransfer.files; //ドロップしたファイルを取得
    if (files.length > 1) return alert("アップロードできるファイルは1つだけです。");
    console.log(files[0]);
    this.readFile(files[0]);
  }

  onImport(e: Event) {
    //@ts-ignore
    this.readFile(e.target.files[0]);
  }

  /**
   *
   * @param file
   * @private
   */
  private readFile(file: File) {
    this.file = file;

    switch (this.file.type) {
      case "image/png":
        this.option.sourceType = "png";
        break;
      case "image/jpeg":
        this.option.sourceType = "jpg";
        break;
      case "image/gif":
        this.option.sourceType = "gif";
        break;
      case "image/svg+xml":
        this.option.sourceType = "svg";
        break;
      default:
        alert("画像形式のみです");
        return;
    }

    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.source = e.target.result;
      this.$set(this, "src", this.source);
    };
    reader.readAsDataURL(this.file);
    this.option.name = this.file.name.match(/([^/]+)\./)![1];
  }

  sourceLoaded(e: any) {
    let img = <HTMLImageElement>e.target;
    this.option.sourceWidth = img.naturalWidth;
    this.option.sourceHeight = img.naturalHeight;
  }

  thumbLoaded(e: any) {
    let img = <HTMLImageElement>this.$refs.thumb;
    this.option.sourceWidth = img.naturalWidth;
    this.option.sourceHeight = img.naturalHeight;

    if (this.cropper) this.cropper.destroy();
    this.cropper = new Cropper(img, {
      ready: () => {
        console.log("ready");
        this.cahngeProfile();
      },
      crop(event: any) {
      },
    });
  }

  uploadTrim() {
    let opt: any = {
      mime: this.option.mime,
    };
    if (this.option.width) opt.width = this.option.width;
    else if (this.option.height) opt.height = this.option.height;

    let ref = firebase.storage()
      .ref()
      .child(`${process.env.molleProjectID}/${this.option.name}.${this.option.mime}`);
    ref.putString(
      this.cropper!.getCroppedCanvas(opt)
        .toDataURL(this.mime[this.option.mime]), "data_url")
      .then((snap: any) => {
        this.callBack && this.callBack(`https://storage.googleapis.com/${process.env.storageBucket}/${ref.fullPath}`);
        this.isShow = false;
      });
  }

  uploadSource() {
    this.isDragOver = true;

    let ref = firebase.storage().ref()
      .child(`${process.env.molleProjectID}/${this.option.name}.${this.option.sourceType}`);
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
  pointer-events: auto;

  .modal {
    & + &__fiexd {

    }
  }

  &__img {
    max-height: 70vh;
  }
}
</style>
