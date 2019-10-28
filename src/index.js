import "./styles.css";

import generateGallery from "./gallery-factory";

const images = new Array(10).fill({
  src: "https://placeimg.com/640/480/nature/grayscale"
});

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
<div class="first-gallery">Put first gallery here</div>
<div class="second-gallery">Put second gallery here</div>
`;

const galleryPlaceholders = {
  first: document.querySelector(".first-gallery"),
  second: document.querySelector(".second-gallery")
};

const clone = galleryPlaceholders.first.cloneNode();

console.log(generateGallery(images));

const gallery = generateGallery(images, null, clone);
console.log(gallery);

const gallery1 = generateGallery(images, null, galleryPlaceholders.second);
console.log(gallery1);
