// Données avec attributs de statistiques pour le Bonus
const karts = [
    { src: "images/karts/StandardKartBodyMK8.png", speed: 3, accel: 4 },
    { src: "images/karts/WildWigglerBodyMK8.png", speed: 2, accel: 6 },
    { src: "images/karts/ZeldaMK8Bdasher.png", speed: 6, accel: 2 }
];

const roues = [
    { src: "images/wheels/StandardTiresMK8.png", speed: 3, accel: 3 },
    { src: "images/wheels/MonsterTiresMK8.png", speed: 5, accel: 1 },
    { src: "images/wheels/RollerTiresMK8.png", speed: 1, accel: 6 }
];

const deltaplanes = [
    { src: "images/gliders/SuperGliderMK8.png", speed: 3, accel: 3 },
    { src: "images/gliders/ParachuteGliderMK8.png", speed: 2, accel: 4 },
    { src: "images/gliders/FlowerGliderMK8.png", speed: 1, accel: 5 }
];

// Matrice : Ligne = Karts (Standard, Wiggler, Zelda) | Colonne = Roues (Standard, Monster, Roller)
const previewMatrix = [
    ["images/previews/IMG_7604.png", "images/previews/IMG_7602.png", "images/previews/IMG_7603.png"],
    ["images/previews/IMG_7607.png", "images/previews/IMG_7605.png", "images/previews/IMG_7606.png"],
    ["images/previews/IMG_7610.png", "images/previews/IMG_7608.png", "images/previews/IMG_7609.png"]
];

class Carousel {
    constructor(data, onChange) {
        this.data = data;
        this.currentIndex = 0;
        this.onChange = onChange;
        this.initDOM();
        this.updateView();
    }

    initDOM() {
        const container = document.getElementById("carousels-container");

        this.wrapper = document.createElement("div");
        this.wrapper.className = "carousel";

        // Image estompée en haut
        this.topImg = document.createElement("img");
        this.topImg.className = "faded-img";

        // Bouton Haut
        this.btnUp = document.createElement("button");
        this.btnUp.className = "carousel-btn";
        const imgUp = document.createElement("img");
        imgUp.src = "images/arrow.png";
        this.btnUp.appendChild(imgUp);
        this.btnUp.addEventListener("click", () => this.prev());

        // Conteneur actif central
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

        // Image estompée en bas
        this.bottomImg = document.createElement("img");
        this.bottomImg.className = "faded-img";

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
    }

    next() {
        this.currentIndex = this.getNextIndex();
        this.updateView();
        // Appel du callback SEULEMENT après le clic, pas au chargement initial
        if (this.onChange) this.onChange(); 
    }

    prev() {
        this.currentIndex = this.getPrevIndex();
        this.updateView();
        // Appel du callback SEULEMENT après le clic, pas au chargement initial
        if (this.onChange) this.onChange(); 
    }
}

// Variable de sécurité pour s'assurer que les 3 carrousels sont créés avant d'afficher Mario
let isReady = false;

// Fonction appelée pour mettre à jour l'image finale ET le bonus
const updateMainPreview = () => {
    if (!isReady) return; // Si les 3 ne sont pas prêts, on bloque l'exécution

    const bodyIdx = kartCarousel.currentIndex;
    const tireIdx = wheelCarousel.currentIndex;
    const gliderIdx = gliderCarousel.currentIndex;
    
    // 1. Mise à jour de l'image de Mario
    document.getElementById("main-preview").src = previewMatrix[bodyIdx][tireIdx];

    // 2. Calcul du Bonus (Addition des stats)
    const totalSpeed = karts[bodyIdx].speed + roues[tireIdx].speed + deltaplanes[gliderIdx].speed;
    const totalAccel = karts[bodyIdx].accel + roues[tireIdx].accel + deltaplanes[gliderIdx].accel;

    // Mise à jour de la largeur des barres en CSS (sur une échelle arbitraire de 14 max)
    document.getElementById("stat-speed").style.width = (totalSpeed / 14 * 100) + "%";
    document.getElementById("stat-accel").style.width = (totalAccel / 14 * 100) + "%";
};

// Instanciation des 3 objets
const kartCarousel = new Carousel(karts, updateMainPreview);
const wheelCarousel = new Carousel(roues, updateMainPreview);
const gliderCarousel = new Carousel(deltaplanes, updateMainPreview);

// Maintenant que les 3 existent, on donne le feu vert et on affiche le rendu
isReady = true;
updateMainPreview();