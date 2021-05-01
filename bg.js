const body = document.querySelector("body");

const IMG_CATEGORY = ["flower", "coffe", "love", "smile", "sky", "nature"];

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `https://source.unsplash.com/featured/1600x900/?${IMG_CATEGORY[imgNumber]}`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_CATEGORY.length);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();