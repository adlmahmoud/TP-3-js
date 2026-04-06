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

// Matrice des prévisualisations : Ligne = Carrosserie, Colonne = Roues
const previewMatrix = [
    ["images/previews/IMG_7604.png", "images/previews/IMG_7602.png", "images/previews/IMG_7603.png"],
    ["images/previews/IMG_7607.png", "images/previews/IMG_7605.png", "images/previews/IMG_7606.png"],
    ["images/previews/IMG_7610.png", "images/previews/IMG_7608.png", "images/previews/IMG_7609.png"]
];

class Carousel {
    constructor(data, onChange) {
        this.data = data;
        this.currentIndex = 0;
        this.onChange = onChange; // Fonction appelée à chaque changement
        this.initDOM();
        this.updateView();
    }

    initDOM() {
        const container = document.getElementById("carousels-container");

        this.wrapper = document.createElement("div");
        this.wrapper.className = "carousel";

        // Image estompée (haut)
        this.topImg = document.createElement("img");
        this.topImg.className = "faded-img";

        // Bouton Haut
        this.btnUp = document.createElement("button");
        this.btnUp.className = "carousel-btn";
        const imgUp = document.createElement("img");
        imgUp.src = "images/arrow.png";
        this.btnUp.appendChild(imgUp);
        this.btnUp.addEventListener("click", () => this.prev());

        // Conteneur Actif (Bordure jaune)
        this.activeBox = document.createElement("div");
        this.activeBox.className = "active-box";
        this.activeImg = document.createElement("img");
        this.activeImg.className = "carousel-img";
        this.activeBox.appendChild(this.activeImg);

        // Bouton Bas
        this.btnDown = document.createElement("button");
        this.btnDown.className = "carousel-btn btn-down";
        const imgDown = document.createElement("img");
        imgDown.src = "images/arrow.png";
        this.btnDown.appendChild(imgDown);
        this.btnDown.addEventListener("click", () => this.next());

        // Image estompée (bas)
        this.bottomImg = document.createElement("img");
        this.bottomImg.className = "faded-img";

        // Assemblage
        this.wrapper.appendChild(this.topImg);
        this.wrapper.appendChild(this.btnUp);
        this.wrapper.appendChild(this.activeBox);
        this.wrapper.appendChild(this.btnDown);
        this.wrapper.appendChild(this.bottomImg);

        container.appendChild(this.wrapper);
    }

    getPrevIndex() {
        return (this.currentIndex - 1 + this.data.length) % this.data.length;
    }

    getNextIndex() {
        return (this.currentIndex + 1) % this.data.length;
    }

    updateView() {
        this.activeImg.src = this.data[this.currentIndex].src;
        this.topImg.src = this.data[this.getPrevIndex()].src;
        this.bottomImg.src = this.data[this.getNextIndex()].src;
        
        // On avertit le système global qu'un changement a eu lieu
        if (this.onChange) {
            this.onChange();
        }
    }

    next() {
        this.currentIndex = this.getNextIndex();
        this.updateView();
    }

    prev() {
        this.currentIndex = this.getPrevIndex();
        this.updateView();
    }
}

// Fonction globale pour mettre à jour l'image de Mario
const updateMainPreview = () => {
    const bodyIdx = kartCarousel.currentIndex;
    const tireIdx = wheelCarousel.currentIndex;
    
    // On va chercher l'image correspondante dans la matrice 2D
    document.getElementById("main-preview").src = previewMatrix[bodyIdx][tireIdx];
};

// Création des 3 instances
const kartCarousel = new Carousel(karts, updateMainPreview);
const wheelCarousel = new Carousel(roues, updateMainPreview);
const gliderCarousel = new Carousel(deltaplanes, updateMainPreview);

// Premier affichage
updateMainPreview();