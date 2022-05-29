<template lang="pug">
  div
    h1 ConvertPage
    button.btn.btn-primary(@click="hoge")
      span submit

    div(v-html="html")
</template>

<script lang="ts">
import firebase from "firebase";
import {Component, Vue, Watch} from "nuxt-property-decorator";
import {IItemData} from "~/molle-cms/src/interface";

@Component({
  components: {},
})
export default class ConvertPage extends Vue {
  html = "";

  hoge() {
    console.log("ConvertPage");
    let url = "https://www.comthink.co.jp/news/2022/";
    var result: any = {pages: {}, items: {}};
    // fetch(`${process.env.functions}/getHtml?url=${encodeURIComponent(url)}`)
    fetch(`http://localhost:5001/nct-comthink/us-central1/getHtml?url=${encodeURIComponent(url)}`)
      .then((res: any) => {
        return (res.json());
      })
      .then((html: string) => {
        let promiseList: any = [];
        //
        let dom = document.createElement("div");
        dom.innerHTML = html;

        dom.querySelectorAll(".topicsListBox").forEach((tag) => {
          var text = tag.querySelector(".topicDigestText")!;
          if (!text.querySelector("a")) return;
          var body = text.querySelector("h2 + p");
          var img = tag.querySelector(".topicDigestPhoto");
          var obj: any = {
            title: text.querySelector("a")!.innerHTML.replaceAll("\n", "").replaceAll("\t", ""),
            // href: text.querySelector("a").getAttribute("href"),
            date: text.querySelector(".topicDate")!.innerHTML.replaceAll(".", "-"),
            noExport: false,
          };
          var id = "news%2F" + obj.date;
          obj.itemId = id;
          obj.path = "news/" + obj.date;

          // if (body) obj.body = body.innerHTML.replaceAll("\n", "").replaceAll("\t", "");
          if (img) {
            obj.thumb = "https://storage.googleapis.com/nct-comthink.appspot.com/corporate/old-site/" +
              img.querySelector("img")!.getAttribute("src")!
                .replace("../../../images/", "")
                .replace("../../images/", "")
                .replace("../images/", "")
                .replace("./images/", "")
                .replace("/images/", "");
            // obj.alt = img.querySelector("img").getAttribute("alt");
          }
          result.pages[id] = obj;

          //
          let entryPoint = this.$molleModules.Box.getItemData();
          result.items[id] = entryPoint;

          // セクション
          let _id = id + "_s";
          let section = this.$molleModules.Section.getItemData();
          result.items[_id] = section;
          entryPoint.value.push({"id": _id});

          //
          if(!text!.querySelector("a")){
            return;
          }
          let detail = text!.querySelector("a")!.getAttribute("href")!;
          if (detail.includes("../")) {
            // サイト内
            promiseList.push(
              fetch(`http://localhost:5001/nct-comthink/us-central1/getHtml?url=${encodeURIComponent(url + detail)}`)
                .then((res: any) => {
                  return (res.json());
                })
                .then((html: string) => {
                  let dom = document.createElement("div");
                  dom.innerHTML = html;
                  dom.querySelector(".topicDate")!.remove();
                  dom.querySelectorAll(".topicsArticleBox img, .topicsArticleBox p").forEach((tag) => {
                    _id = id + "_" + section.value.length;
                    section.value.push({"id": _id});
                    if (tag.tagName == "IMG") {
                      let src = tag.getAttribute("src")!
                        .replace("../../../images/", "")
                        .replace("../../images/", "")
                        .replace("../images/", "")
                        .replace("./images/", "")
                        .replace("/images/", "");
                      result.items[_id] = Object.assign(
                        this.$molleModules.Picture.getItemData()
                        , {
                          value: "https://storage.googleapis.com/nct-comthink.appspot.com/corporate/old-site/" + src,
                          option: {
                            alt: tag.getAttribute("alt"),
                          },
                          class: {
                            align: "text-center",
                          },
                        },
                      );
                    } else {
                      if (!tag.innerHTML) return;
                      result.items[_id] = Object.assign(
                        this.$molleModules.Paragraph.getItemData()
                        , {
                          value: tag.innerHTML,
                        });
                    }
                  });
                }),
            );
          } else {
            // サイト外
            let str = body!.innerHTML.replaceAll("\n", "").replaceAll("\t", "");
            if (str) {
              _id = id + "_" + section.value.length;
              section.value.push({"id": _id});
              result.items[_id] = Object.assign(
                this.$molleModules.Paragraph.getItemData()
                , {
                  value: str,
                });
            }
            //
            _id = id + "_" + section.value.length;
            section.value.push({"id": _id});
            result.items[_id] = Object.assign(this.$molleModules.ButtonList.getItemData(), {
              class: {
                align: "text-center",
              },
            });
            result.items[_id].value = [{id: _id + "b"}];
            result.items[_id + "b"] = Object.assign(this.$molleModules.Button.getItemData(), {
              value: "more",
              option: {
                href: detail,
                target: "_blank",
              },
              class: {
                color: "-primary",
              },
            });
          }
        });
        //
        Promise.all(promiseList)
          .then(() => {
            console.log(result);

            let a = document.createElement("a");
            a.href = URL.createObjectURL(
              new Blob([JSON.stringify({pages: result.pages})], {type: "text/plain"}),
            );
            a.download = `news-pages.json`;
            a.click();
            //
            a.href = URL.createObjectURL(
              new Blob([JSON.stringify({items: result.items})], {type: "text/plain"}),
            );
            a.download = `news-items.json`;
            a.click();
          });
      });
  }
};
</script>

<style lang="scss">

</style>
