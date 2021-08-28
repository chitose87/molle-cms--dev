import {Vue} from "nuxt-property-decorator";

Vue.directive('isscroll', {
  inserted: function (el: HTMLElement, binding, vnode: any) {
    //const padding = 100;
    let range = 1;
    let target: any = [el];
    let className = "";
    let attr: any;
    let status = "outview";

    if (typeof binding.value == "string") {
      className = binding.value;
    } else if (binding.value) {
      className = binding.value.class;
      attr = Object.assign({}, binding.value);
      delete attr.class;
      if (attr.range) range = attr.range;
      if (attr.target) target = el.querySelectorAll(attr.target);
    }

    let handler = () => {
      if (el.dataset.isscrollUnbind) {
        window.removeEventListener('scroll', handler);
        return;
      }

      let rect = window.scrollY;
      let padding = window.innerHeight;
      console.log("rect",rect)
      console.log("padding",padding)

      if (rect < padding) {
        // hidden 上
        status = "outview";
        remove();
      } else {
        // visible
        status = "inview";
        if (className) {
          el.classList.add(className);
        }
        if (attr) {
          for (let key in attr) {
            el.setAttribute(key, attr[key]);
          }
        }
        if (binding.modifiers.once) {
          window.removeEventListener('scroll', handler);
        }
        if (binding.modifiers["animation-delay"]) {
          if (!isLoop) {
            isLoop = true;
            loop();
          }
        }
        el.setAttribute("data-isscroll", status);
        if (vnode.componentInstance) vnode.componentInstance.$emit("inview");
        else el.dispatchEvent(new Event("inview"))
      }
      // console.log(binding.value, binding.modifiers)
    };
    // loop
    let isLoop = false;
    let loop = () => {
      let rate = (el.getBoundingClientRect().top + el.offsetHeight / 2) / (window.outerHeight / 2);
      rate=Math.min(rate,2);
      rate=Math.max(rate,0)*-1;
      target.forEach((item: HTMLElement) => {
        item.setAttribute("style", `animation-delay:${rate}s`);
      });
      if (isLoop) requestAnimationFrame(loop);
    };
    // remove
    let remove = () => {
      isLoop = false;
      if (className) {
        el.classList.remove(className);
      }
      if (attr) {
        for (let key in attr) {
          el.removeAttribute(key);
        }
      }
      if (vnode.componentInstance) vnode.componentInstance.$emit("outview");
      else el.dispatchEvent(new Event("outview"))
      el.setAttribute("data-isscroll", status);
    };
    window.addEventListener('scroll', handler);
    handler();
  },
  unbind: function (el: any) {
    el.dataset.isscrollUnbind = true;
  }
});
