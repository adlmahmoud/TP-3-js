const karts = [
    { id: 1, src: "images/karts/StandardKartBodyMK8.png" },
    { id: 2, src: "images/karts/WildWigglerBodyMK8.png" },
    { id: 3, src: "images/karts/ZeldaMK8Bdasher.png" }
];

const roues = [
    { id: 1, src: "images/wheels/StandardTiresMK8.png" },
    { id: 2, src: "images/wheels/MonsterTiresMK8.png" },
    { id: 3, src: "images/wheels/RollerTiresMK8.png" }
];

const deltaplanes = [
    { id: 1, src: "images/gliders/FlowerGliderMK8.png" },
    { id: 2, src: "images/gliders/ParachuteGliderMK8.png" },
    { id: 3, src: "images/gliders/SuperGliderMK8.png" }
];

class Carousel {
    constructor(data, previewId) {
        this.data = data;
        this.currentIndex = 0;
        this.previewId = previewId;
        this.initDOM();
        this.updateView();
    }

    initDOM() {
        const container = document.getElementById("carousels-container");

        this.wrapper = document.createElement("div");
        this.wrapper.className = "carousel";

        this.btnUp = document.createElement("button");
        this.btnUp.className = "carousel-btn";
        const imgUp = document.createElement("img");
        imgUp.src = "images/arrow.png"; 
        this.btnUp.appendChild(imgUp);
        this.btnUp.addEventListener("click", () => this.prev());

        this.imgElement = document.createElement("img");
        this.imgElement.className = "carousel-img";

        this.btnDown = document.createElement("button");
        this.btnDown.className = "carousel-btn btn-down";
        const imgDown = document.createElement("img");
        imgDown.src = "images/arrow.png"; 
        this.btnDown.appendChild(imgDown);
        this.btnDown.addEventListener("click", () => this.next());

        this.wrapper.appendChild(this.btnUp);
        this.wrapper.appendChild(this.imgElement);
        this.wrapper.appendChild(this.btnDown);

        container.appendChild(this.wrapper);
    }

    updateView() {
        const currentItem = this.data[this.currentIndex];
        this.imgElement.src = currentItem.src;
        document.getElementById(this.previewId).src = currentItem.src;
    }

    next() {
        this.currentIndex++;
        if (this.currentIndex >= this.data.length) {
            this.currentIndex = 0;
        }
        this.updateView();
    }

    prev() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.data.length - 1;
        }
        this.updateView();
    }
}

new Carousel(karts, "preview-body");
new Carousel(roues, "preview-tires");
new Carousel(deltaplanes, "preview-glider");