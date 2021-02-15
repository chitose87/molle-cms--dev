<template lang="pug">
.module.google-map(
  :id="itemData.tagId",
  :class="getClass(itemData)",
  :style="getStyle(itemData)"
)
  .google-map__body
    .google-map__embed(ref="embed")


</template>

<script lang="ts">
import {Component, Prop} from "~/node_modules/nuxt-property-decorator";
import {Module} from "~/molle/module/Module";
declare const google: any;

@Component({
  components: {},
})
export default class GoogleMap extends Module {
  static pluginStatus: string = "none";
  center = {
    lat: 0,
    lng: 0,
  };

  mounted() {
    this.center.lat = Number.parseFloat(this.itemData.value.lat);
    this.center.lng = Number.parseFloat(this.itemData.value.lng);

    switch (GoogleMap.pluginStatus) {
      case "none":
        GoogleMap.pluginStatus = "loading";

        let tag = document.createElement('script');
        tag.src = "https://maps.googleapis.com/maps/api/js?key=" + process.env.apiKey + "&callback=initMap";
        let firstScriptTag: HTMLScriptElement = document.getElementsByTagName('script')[0];
        firstScriptTag!.parentNode!.insertBefore(tag, firstScriptTag);
        // @ts-ignore
        window.initMap = () => {
          GoogleMap.pluginStatus = "complete";
          this.init();
          window.dispatchEvent(new Event("googlemapAPIReady"));
          // @ts-ignore
          delete window.initMap;
        };
        break;
      case "loading":
        window.addEventListener("googlemapAPIReady", () => this.init());
        break;
      case "complete":
        this.init();
        break;
    }
  }

  init() {
    window.removeEventListener("googlemapAPIReady", () => this.init());
    let map = new google.maps.Map(this.$refs["embed"], this.center);
    let lat1km = calc1kmDegreeinLatitude(this.center.lat);
    let lng1km = calc1kmDegreeinLong();
    // console.log(lat1km,lng1km);
    map.fitBounds(new google.maps.LatLngBounds(
      new google.maps.LatLng(this.center.lat + lat1km, this.center.lng - lng1km),
      new google.maps.LatLng(this.center.lat - lat1km, this.center.lng + lng1km)
    ), 0);

    let marker = new google.maps.Marker({
      position: this.center,
      map: map
    });

    // label
    let label = "";
    if (this.itemData.option.title) label += `<p class="google-map__info-window__title">${this.itemData.option.title}</p>`;
    if (this.itemData.option.text) label += `<p class="google-map__info-window__text">${this.itemData.option.text}</p>`;

    if (label) {
      let infoWindow = new google.maps.InfoWindow({
        content: `<div class="google-map__info-window">${label}</div>`
      });
      infoWindow.open(map, marker);
    }

    function calc1kmDegreeinLatitude(lat: number) {
      let eRadius = 6378.137;
      let r = eRadius * (Math.cos(lat * Math.PI / 180))
      let cm = 2 * Math.PI * r
      let kd = 360 / cm
      return kd
    }

    function calc1kmDegreeinLong() {
      let eRadius = 6378.137
      let pc = 2 * Math.PI * eRadius
      let dLat = 360 / pc
      return dLat
    }
  }


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
.google-map {
  &__body {
    padding-top: 60%;
    position: relative;
  }

  &__embed {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &__info-window{

  }
}
</style>
