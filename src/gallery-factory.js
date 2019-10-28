import "tiny-slider/dist/tiny-slider.css";

import { tns } from "tiny-slider/src/tiny-slider.module";

const template = scope => {
  return `
    <div class="slider-wrapper">
      <div ref="slider">
        ${scope.images
          .map(
            (img, index) => `
          <div class="item tns-item">
            <div class="image-item">
              <img
                class="slide tns-lazy-img"
                data-index="${index}"
                src="${img.src}"
                >
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <div ref="controls" class="controls">
        <span class=""><</span>
        <span class="">></span>
      </div>
    </div>
`;
};

const REFS = {
  SLIDER: '[ref="slider"]',
  CONTROLS: '[ref="controls"]'
};

const SLIDER_OPTIONS = {
  items: 1,
  lazyload: true,
  mouseDrag: true,
  nav: false,
  responsive: {
    768: {
      gutter: 0,
      edgePadding: 0
    }
  },
  speed: 400
};

export class Gallery {
  slider = null;
  _images = [];
  options = {};
  mountPoint = null;

  constructor(images = [], sliderOptions = SLIDER_OPTIONS, mountPoint) {
    this.images = images;
    this.options = Object.assign({}, this.options, sliderOptions);
    this.mountPoint = mountPoint;
    this.render();
  }

  render() {
    this.mountPoint = this.mountPoint || document.createElement("div");
    const gallery = template({
      images: this.images
    });

    this.mountPoint.innerHTML = gallery;
    this.collectRefs();
  }

  collectRefs() {
    this.refs = {
      slider: this.mountPoint.querySelector(REFS.SLIDER),
      controls: this.mountPoint.querySelector(REFS.CONTROLS)
    };

    this.initGallery();
  }

  initGallery() {
    if (!this.refs.slider) {
      return;
    }
    const customOptions = {
      container: this.refs.slider,
      controlsContainer: this.refs.controls
    };
    try {
      this.slider = tns(Object.assign({}, this.options, customOptions));
    } catch (e) {
      console.error(e);
    }
  }

  set images(value = []) {
    this._images = value;
    this.render();
  }

  get images() {
    return this._images || [];
  }
}

const generateGallery = (images, opts, mountPoint) => {
  const gallery = new Gallery(images, opts, mountPoint);

  return gallery;
};

export default generateGallery;
