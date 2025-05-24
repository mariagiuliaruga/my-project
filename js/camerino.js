const areaUomo = document.querySelector('.area-uomo');
const areaDonna = document.querySelector('.area-donna');

areaUomo.style.display = 'none';
areaDonna.style.display = 'none';

document.getElementById('container-stili-donna').style.display = 'none';
document.getElementById('container-stili-uomo').style.display = 'none';

const cestino = document.getElementById('cestino');
const istruzioniScritta = document.getElementById('istruzioni');

let varGlobDonna = true;
let spostato = false;

const vestitiPerStile = {
oldMoney: [
    'camicia', 'camicetta', 'maglia', 'maglia-lanetta', 'mocassini', 'scarpe-bianche', 'stivaletti-marroni', 'pantaloni-lino',
     'felpa-ralph', 'orologio', 'cappello-polo', 'skinny', 'pantaloni-neri', 'giacca-elegante'
],
casual: [
    'maglia', 'jeans', 'maglia-lanetta', 'scarpe-bianche', 'cappello-polo', 'stivaletti-marroni', 'orologio', 'cargo', 'camicetta',
     'maglia-maglione-marrone', 'giacca-jeans', 'giacca-pelle', 'pantaloni-neri', 'jeans-grigi'
],
vintage: [
    'maglia-lanetta', 'maglia-marrone', 'giacca-jeans', 'jeans-grigi', 'campus', 'mocassini', 'mocassini-marroni', 
     'orologio', 'giacca-pelle', 'maglia-nera', 'maglione-marrone', 'giacca-colorata', 'maglia-maglione', 'maglia-maglione-marrone', 
     'jeans', 'jeans-grigi', 'pantaloncino-jeans-nero'
],
eBoy: [
    'maglia-nera',  'cappello-marrone', 'giacca-colorata', 'vans', 'cappello-marrone', 'felpa-ralph', 'giacca-pelle',
    'pantaloncino-jeans-nero', 'jeans-neri'
],
street: [
    'maglia-marrone', 'maglia-stussy', 'cargoBeige', 'giacca-carhartt', 'jordan', 'giacca-nike', 'timberland', 'cappello-marrone', 
    'giacca-jeans', 'pantaloncino-jeans', 'jeans-neri'
],
sportyMen: [
    'maglia-aderente', 'pantaloncino-tuta', 'giacca-nike', 'campus', 'felpa-ralph', 'jordan', 'cappello-polo',
     'maglia-stussy', 'maglia-blu', 'jeans', 'jeans-neri'
],
bohoChic: [
    'gonna-lunga', 'maglia-frange', 'maglia-boho', 'giubbotto-pelle', 'frange', 'top-bianco', 'uggs', 'cowboy', 
    'pantaloncini-marroni', 'pantaloncini-bianchi', 'canotta-bianca', 'top-marrone'
],
quietLuxury: [
    'giacca-pelle-donna', 'camicetta-bianca', 'jeans-grigi2-donna', 'gonna-lunga-luxury', 'top-marrone', 'tube-top', 'stivaletti', 'stivali-tacco', 
     'pantaloni-eleganti', 'pantaloni-palazzo', 'pantaloni-neri-donna', 'camicetta-nera', 'canotta-bianca'
],
preppy: [
    'camicetta-bianca', 'stivaletti', 'maglione-azzurro', 'camicetta-gilet', 'scarpe-bianche-donna', 'gonna-grigia',
     'pantaloni-palazzo', 'gonna-pieghe', 'gonna-lunga-preppy', 'camicetta-nera', 'maglia-boho'
],
messy: [
    'maglia-offshoulders', 'converse', 'maglia-grafica', 'giubbotto-pelle', 'stivali-neri', 'jeans-neri-donna', 
    'pantaloni-neri-donna', 'gonna-jeans'
],
scandi: [
    'maglione-beige', 'uggs', 'maglione-azzurro', 'top-bianco', 'campus-donna', 'jeans-grigi-donna', 'pantaloni-marroni', 
    'pantaloni-beige', 'jeans-donna', 'maglia-semplice', 'giubbotto-pelle'
],
sportyWomen: [
    'maglia-gialla', 'maglia-rossa', 'campus-donna', 'scarpe-bianche-donna', 'gonna-jeans-sporty', 'jeans-grigi-donna',
    'pantaloncini-blu', 'pantaloncini-jeans', 'jeans-donna', 'top-verde', 'pantaloncino-verde', 'giubbotto-pelle', 'pantalone-tuta'
]
};

function moveLeft() {
    const wrapper = document.querySelector('.wrapper');
    const scritta = document.querySelector('.scritta-camerino');
    const btnUomo = document.getElementById("btn-uomo");
    const btnDonna = document.getElementById("btn-donna");

    // Sposta molto più in alto e a sinistra, con scala
    btnDonna.style.transform = "translate(-50vw, -150px) scale(0.2)";
    btnUomo.style.transform = "translate(-30vw, -150px) scale(0.2)";

    btnUomo.style.transition = "transform 0.3s ease";
    btnDonna.style.transition = "transform 0.3s ease";

    btnDonna.classList.add("btn-mini");
    btnUomo.classList.add("btn-mini");

    wrapper.style.transform = "translateY(-15vh)";
    wrapper.style.transition = "transform 0.3s ease";

    scritta.style.transform = "translateX(-40vw) translateY(-5vh) scale(0.6)";
    scritta.style.transition = "transform 0.3s ease";

    document.querySelector(".container-camerino").style.transform = "translateY(-450px)";
    document.querySelector(".container-camerino").style.transition = "transform 0.3s ease";
}

function moveRight() {
    const wrapper = document.querySelector('.wrapper');
    const scritta = document.querySelector('.scritta-camerino');
    const btnUomo = document.getElementById("btn-uomo");
    const btnDonna = document.getElementById("btn-donna");

    btnDonna.style.transform = "translate(0, 0) scale(1)";
    btnUomo.style.transform = "translate(0, 0) scale(1)";

    btnUomo.style.transition = "transform 0.3s ease";
    btnDonna.style.transition = "transform 0.3s ease";

    btnDonna.classList.remove("btn-mini");
    btnUomo.classList.remove("btn-mini");

    wrapper.style.transform = "translateY(0)";
    wrapper.style.transition = "transform 0.3s ease";

    scritta.style.transform = "translateX(0) translateY(0) scale(1)";
    scritta.style.transition = "transform 0.3s ease";

    areaDonna.style.display = "none";
    areaUomo.style.display = "none";

    document.querySelector(".container-camerino").style.transform = "translateY(0)";
    document.querySelector(".container-camerino").style.transition = "transform 0.3s ease";
}

function showAllClothesUomo() {
    // Prendo tutti i vestiti nei 3 caroselli dell'area uomo
    const caroselli = document.querySelectorAll('.area-uomo .carousel');

    caroselli.forEach(carousel => {
        const vestiti = carousel.querySelectorAll('.vestito');
        vestiti.forEach(vestito => {
            vestito.style.display = 'inline-block';
        });
    });

    // Mostro tutta l'area uomo
    const areaUomo = document.querySelector('.area-uomo');
    if (areaUomo) areaUomo.style.display = 'flex';
}

function showAllClothesDonna() {
    const caroselliDonna = document.querySelectorAll('.area-donna .carousel');
    caroselliDonna.forEach(carousel => {
        const vestiti = carousel.querySelectorAll('.vestito');
        vestiti.forEach(vestito => {
            vestito.style.display = 'inline-block';
        });
    });
    const areaDonna = document.querySelector('.area-donna');
    if (areaDonna) areaDonna.style.display = 'flex';
}


function allowDrop(ev) {
    ev.preventDefault(); //per dire "qui è permesso fare il drop"
}

// quando faccio dragstart, viene salvato nell'oggetto dataTransfer l’id dell'elemento che sto trascinando
// e un flag "isClone": false perchè sto trascinando l'elemento originale, non il clone
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("isClone", "false");
    
}

function dragIndumento(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("isClone", "true");
}

function drop(ev) {
    ev.preventDefault(); //impedisce comportamento di default del browser, senza questo non potrei rilasciare l'elemento dove voglio
    const data = ev.dataTransfer.getData("text"); //ev.dataTransfer.getData("text") recupera i dati dell'elemento trascinato settati prima con setData("text", id)
    const isClone = ev.dataTransfer.getData("isClone") === "true";
    const draggedElement = document.getElementById(data); // elemento originale o clone

    let manichino = null;
    if (varGlobDonna) {
    manichino = document.getElementById("manichino-donna");
    } else {
    manichino = document.getElementById("manichino-uomo");
    }

    // quando rilascio l'elemento sul manichino
    // Se sto manipolando un clone, original sarà l'elemento originale da cui il clone è stato creato (rimuove il suffisso -clone dall'elemento clonato, ritornando l'originale)
    // Se sto manipolando un originale, original sarà l'elemento stesso che sto trascinando.

    const original = isClone ? document.getElementById(data.replace("-clone", "")) : draggedElement;
    const clone = draggedElement.cloneNode(true); // se non è ancora un clone, qui clona l'elemento originale
    clone.classList.add('indumento');
    clone.setAttribute("id", original.id + "-clone");
    clone.setAttribute("draggable", "true");
    clone.addEventListener("dragstart", dragIndumento);
    clone.style.cursor = "grab";
    
    const zonaNome = original.dataset.zona;
    let zona = null;

    if (zonaNome === "busto") {
    zona = varGlobDonna ? document.getElementById('zona-busto-donna') : document.getElementById('zona-busto');
    } else if (zonaNome === "testa") {
    zona = varGlobDonna ? document.getElementById('zona-testa-donna') : document.getElementById('zona-testa');
    } else if (zonaNome === "over-busto") {
    zona = varGlobDonna ? document.getElementById('zona-over-busto-donna') : document.getElementById('zona-over-busto');
    } else if (zonaNome === "gambe") {
    zona = varGlobDonna ? document.getElementById('zona-gambe-donna') : document.getElementById('zona-gambe');
    } else if (zonaNome === "piedi") {
    zona = varGlobDonna ? document.getElementById('zona-piedi-donna') : document.getElementById('zona-piedi');
    } else if (zonaNome === "orologio") {
    zona = document.getElementById('zona-orologio');
    } else if (zonaNome === "borsa"){
    zona = document.getElementById('zona-borsa-donna')
    } else if (zonaNome === "borsa-mano"){
    zona = document.getElementById('zona-borsa-mano-donna')
    } else if (zonaNome === "vestito"){
    zona = document.getElementById('zona-vestito')
    } 
    
    // per evitare sovrapposizioni e sostituire un indumento esistente nella stessa zona
    if (zonaNome) {
    const esistenti = manichino.querySelectorAll(`.indumento[data-zona="${zonaNome}"]`);
    esistenti.forEach(el => {
        el.remove();

        // Ripristina l'elemento originale nella lista vestiti
        const originalId = el.id.replace("-clone", "");
        const original = document.getElementById(originalId);
        if (original) {
        original.setAttribute("draggable", "true");
        original.style.opacity = "1";
        original.style.cursor = "grab";
        }
    });
    }

    if (zonaNome==="borsa") {
        const esistenti = manichino.querySelectorAll(`.indumento[data-zona="${"borsa-mano"}"]`);
        esistenti.forEach(el => {
            el.remove();

            // Ripristina l'elemento originale nella lista vestiti
            const originalId = el.id.replace("-clone", "");
            const original = document.getElementById(originalId);
            if (original) {
            original.setAttribute("draggable", "true");
            original.style.opacity = "1";
            original.style.cursor = "grab";
            }
        });
    }

    if (zonaNome==="borsa-mano") {
        const esistenti = manichino.querySelectorAll(`.indumento[data-zona="${"borsa"}"]`);
        esistenti.forEach(el => {
            el.remove();

            // Ripristina l'elemento originale nella lista vestiti
            const originalId = el.id.replace("-clone", "");
            const original = document.getElementById(originalId);
            if (original) {
            original.setAttribute("draggable", "true");
            original.style.opacity = "1";
            original.style.cursor = "grab";
            }
        });
    }

    clone.setAttribute("data-zona", zonaNome); //perchè anche il clone deve avere la stessa zona dell'originale, per futuri controlli

    let zIndex = 1;
    if (zonaNome === "over-busto") {
    zIndex = 3;
    } else if (zonaNome === "busto") {
    zIndex = 2;
    } else if (zonaNome === "gambe") {
    zIndex = 1;
    } else if (zonaNome === "piedi"){
    zIndex = 0;
    } else {
    zIndex = 4;
    }
    clone.style.zIndex = zIndex;

    if (zona) {
        const x = zona.offsetLeft + (zona.offsetWidth / 2) - (manichino.offsetWidth * 0.45);  // centrato orizzontalmente
        const y = zona.offsetTop;

        let percentX = (x / manichino.offsetWidth) * 100;
        let percentY = (y / manichino.offsetHeight) * 100;

        clone.style.position = 'absolute';
        clone.style.width = '90%';
        clone.style.height = 'auto';
        
        clone.style.top = `${percentY}%`;
        let offsetX = 0;

        if (varGlobDonna) {
        offsetX = -10;
        clone.style.left = `${percentX + offsetX}%`;
        
        } else {
        offsetX = 2;
        clone.style.left = `${percentX + offsetX}%`;
        
        }

        manichino.appendChild(clone);

    }  

    // l'elemento originale (il cui clone è stato rilasciato sul manichino), viene reso non più trascinabile e opaco
    if (!isClone) {
        original.setAttribute("draggable", "false");
        original.style.opacity = "0.4";
        original.style.cursor = "not-allowed";
    }

}

function throwInTheTrash(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const isClone = ev.dataTransfer.getData("isClone") === "true";

    if (isClone) {
    const clone = document.getElementById(data);
    const originalId = data.replace("-clone", "");
    const original = document.getElementById(originalId);

    // l'originale può essere di nuovo selezionato, dopo essere stato tolto dal manichino
    if (original) {
        original.setAttribute("draggable", "true");
        original.style.opacity = "1";
        original.style.cursor = "grab";
    }

    if (clone) {
        clone.remove();
    }
    }
}

function handleColorChange(color, elementId) {
    const originalElement = document.getElementById(elementId);
    const cloneElement = document.getElementById(elementId + '-clone');

    // Salva le dimensioni e la posizione del clone (se esiste)
    let cloneDimensions = null;
    if (cloneElement) {
    cloneDimensions = {
        width: cloneElement.style.width,
        position: cloneElement.style.position,
        left: cloneElement.style.left,
        top: cloneElement.style.top,
        zIndex: cloneElement.style.zIndex,
        dataZona: cloneElement.getAttribute('data-zona')
    };
    }

    // Salva l'immagine originale solo la prima volta per poter ripristinarne il colore con il tasto reset
    if (!originalElement.getAttribute('data-original-src')) {
    originalElement.setAttribute('data-original-src', originalElement.src);
    }

    const originalSrc = originalElement.getAttribute('data-original-src');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d'); //contesto 2d
    const img = new Image();

    // solo quando l'immagine è pronta, si attiva la funzione onload
    img.onload = function() {
        //imposta il canvas alle stesse dimensioni dell'immagine in modo da
        // porter prendere esattamente i dati pixel dell'immagine con ctx.getImageData dal canvas 
        //  ed inizia a disegnare dall'angolo in alto a sx
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // converte da esadecimale (#878787) il colore passato, in valori RGB normalizzati
        // parseInt(..., 16) converte da esadecimale a decimale (es. "FF" → 255)
        // /255 normalizza tutti i valori tra 0 e 1 
        const r = parseInt(color.substr(1, 2), 16) / 255; //(1,2) sono i due caratteri dopo il cancelletto # per il rosso
        const g = parseInt(color.substr(3, 2), 16) / 255; // per il giallo
        const b = parseInt(color.substr(5, 2), 16) / 255; // per il blu

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2; // luminosità : media tra max e min

        // calcolo di tonalità H e saturazione S
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            }
            h /= 6; // siccome quei valori sono in una scala da 0 a 6, lo devo normalizzare
        }

        // qui normalizza i pixel dell'immagine originale
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
            const originalR = data[i] / 255;
            const originalG = data[i + 1] / 255;
            const originalB = data[i + 2] / 255;

            const originalBrightness = (originalR + originalG + originalB) / 3;
            const brightnessFactor = originalBrightness / 0.5;

            let r1, g1, b1;

            if (s === 0) {
                r1 = g1 = b1 = l;
            } else {
                // per convertire tonalità HSL in RGB
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                    };

                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;

                r1 = hue2rgb(p, q, h + 1 / 3);
                g1 = hue2rgb(p, q, h);
                b1 = hue2rgb(p, q, h - 1 / 3);
            }

            data[i] = Math.min(1, r1 * brightnessFactor) * 255;
            data[i + 1] = Math.min(1, g1 * brightnessFactor) * 255;
            data[i + 2] = Math.min(1, b1 * brightnessFactor) * 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        const newImageUrl = canvas.toDataURL(); // converte il contenuto del canvas in una stringa base64 che rappresenta un'immagine in formato PNG

        originalElement.src = newImageUrl; // sostituisce la sorgente dell'immagine originale con l'url appena generato

        if (cloneElement && cloneDimensions) {
            cloneElement.src = newImageUrl;
            cloneElement.style.width = cloneDimensions.width;
            cloneElement.style.position = cloneDimensions.position;
            cloneElement.style.left = cloneDimensions.left;
            cloneElement.style.top = cloneDimensions.top;
            cloneElement.style.zIndex = cloneDimensions.zIndex;
            cloneElement.setAttribute('data-zona', cloneDimensions.dataZona);

            // Mantieni l'ID del clone
            cloneElement.setAttribute('id', elementId + '-clone');
        }

        originalElement.setAttribute('draggable', 'true');
        if (cloneElement) {
            cloneElement.setAttribute('draggable', 'true');
        }
    };

    img.src = originalSrc; // fa partire il caricamento dell’immagine originale, il che attiva l’evento onload
}

const carouselIndices = {};

function scrollCarousel(carouselId, direction) {
    const carouselContainer = document.getElementById(carouselId);
    const visibleItems = parseInt(carouselContainer.getAttribute('data-visible')) || 1;
    const carousel = carouselContainer.querySelector('.carousel');

    const itemWidth = 190; // larghezza + margine
    const totalItems = parseInt(carouselContainer.getAttribute('data-total'))
    const maxIndex = Math.max(0, totalItems - visibleItems);
    console.log(`maxIndex ${maxIndex}: totalItems ${totalItems}, visibleItems ${visibleItems}`);

    // l'indice tiene traccia di quale "pagina" del carosello sto mostrando
    if (!(carouselId in carouselIndices)) {
    carouselIndices[carouselId] = 0;
    }

    carouselIndices[carouselId] += direction; //aggiorna l'indice in base alla direzione

    // blocco l'indice per non far scorrere oltre i limiti
    if (carouselIndices[carouselId] < 0) {
    carouselIndices[carouselId] = 0;
    }
    if (carouselIndices[carouselId] > maxIndex) {
    carouselIndices[carouselId] = maxIndex;
    }

    const offset = carouselIndices[carouselId] * itemWidth;
    carousel.style.transform = `translateX(-${offset}px)`;

    console.log(`Carosello ${carouselId}: visibili ${visibleItems}, indice ${carouselIndices[carouselId]}`);
}

function changeMannequinColor(genere, colore) {
    const manichino = document.getElementById(`manichino-${genere}`);


    if(genere === 'uomo'){
    if (colore === 'rosa'){
        manichino.style.backgroundImage = "url('media/manichino/manichinoUomo/manichinoUomoRosa.png')";
    } else if (colore === 'marrone'){
        manichino.style.backgroundImage = "url('media/manichino/manichinoUomo/manichinoUomoMarrone.png')";
    } else if (colore === 'nero'){
        manichino.style.backgroundImage = "url('media/manichino/manichinoUomo/manichinoUomoNero.png')";
    }
    } else if(genere === 'donna'){
        if (colore === 'rosa'){
            manichino.style.backgroundImage = "url('media/manichino/manichinoDonna/manichinoDonnaRosa.png')";
        } else if (colore === 'marrone'){
            manichino.style.backgroundImage = "url('media/manichino/manichinoDonna/manichinoDonnaMarrone.png')";
        } else if (colore === 'nero'){
            manichino.style.backgroundImage = "url('media/manichino/manichinoDonna/manichinoDonnaNero.png')";
        }
    }
}

function showClothesByStyle(stile) {
    const tuttiVestiti = document.querySelectorAll('.vestito');
    const visibili = []; // lista di vestiti visibili per questo stile

    tuttiVestiti.forEach(vestito => {
        if (vestitiPerStile[stile].includes(vestito.id)) {
            vestito.style.display = 'inline-block';
            // appende ogni vestito alla lista
            visibili.push(vestito);
        } else {
            vestito.style.display = 'none';
        }
    });

    updateDataVisible(visibili);
}

function updateDataVisible(vestitiVisibili) {
    const caroselli = document.querySelectorAll('.carousel-container-sx-alto, .carousel-container-sx-basso, .carousel-container-dx');

    caroselli.forEach(carosello => {
        const id = carosello.id;
        const vestitiNelCarosello = carosello.querySelectorAll('.vestito');
        
        let count = 0;
        vestitiNelCarosello.forEach(v => {
            if (window.getComputedStyle(v).display !== 'none') {
                count++;
            }
        });

        // Aggiorna sia data-visible (quanti si vedono sullo schermo)
        // sia data-total (quanti vestiti ci sono per questo stile)
        carosello.setAttribute('data-total', count);
        carosello.setAttribute('data-visible', 4);

        // Reset dell’indice di scroll
        carouselIndices[id] = 0;
        scrollCarousel(id, 0);
    });
}

// listener per btnUomo e btnDonna
document.querySelectorAll(".genere-img").forEach(btn => {
    btn.addEventListener("click", function () {
        const cestino = document.getElementById("cestino");
        const isMini = this.classList.contains("btn-mini");

        if (isMini) {
            // Se è mini, torna alla schermata iniziale
            document.querySelector('.container-stili').style.display = "none";
            document.getElementById('container-stili-uomo').style.display = "none";
            document.getElementById('container-stili-donna').style.display = "none";
            istruzioniScritta.style.display = 'none';
            cestino.classList.add("hidden");
            moveRight();
        } else if (this.id === "btn-donna") {
            // Se è la donna in grande
            showAllClothesDonna();
            document.getElementById("istruzioni").style.display = "block";
            areaDonna.style.display = "flex";
            areaUomo.style.display = "none";
            areaDonna.classList.add('visible');
            areaUomo.classList.remove('visible');
            document.getElementById("manichino-donna").style.backgroundImage = "url('media/manichino/manichinoDonna/manichinoDonna.png')";
            varGlobDonna = true;
            moveLeft();
            document.getElementById('container-stili-donna').style.display = "flex";
            document.getElementById('container-stili-uomo').style.display = "none";
            cestino.classList.remove("hidden");
        } else if (this.id === "btn-uomo") {
            // Se è l'uomo in grande
            showAllClothesUomo();
            document.getElementById("istruzioni").style.display = "block";
            areaUomo.style.display = "flex";
            areaDonna.style.display = "none";
            areaUomo.classList.add('visible');
            areaDonna.classList.remove('visible');
            document.getElementById("manichino-uomo").style.backgroundImage = "url('media/manichino/manichinoUomo/manichinoUomo.png')";
            varGlobDonna = false;
            moveLeft();
            document.getElementById('container-stili-uomo').style.display = "flex";
            document.getElementById('container-stili-donna').style.display = "none";
            cestino.classList.remove("hidden");
        }
    });
});

document.querySelectorAll(".manichino").forEach(manichino => {
    // per togliere gli indumenti dal manichino SOLO al doppio click
    manichino.addEventListener("dblclick", function (event) {
        if (event.target.classList.contains('indumento')) {
            const cloneId = event.target.id;
            const originalId = cloneId.replace("-clone", "");
            const original = document.getElementById(originalId); //per tornare all'originale in modo da renderlo di nuovo selezionabile
            
            // l'originale può di nuovo essere selezionato, dopo essere stato tolto dal manichino
            if (original) {
                original.setAttribute("draggable", "true");
                original.style.opacity = "1";
                original.style.cursor = "grab";
                
            }

            event.target.remove();
        }
    });

    manichino.addEventListener("dragover", allowDrop);
    manichino.addEventListener("drop", drop);
});

// per ogni vestito
document.querySelectorAll('.vestito').forEach(item => {
    item.addEventListener('click', function(e) {
    e.stopPropagation(); // evita che il click venga "propagato" ad altri elementi
    const colorPalette = document.getElementById('colorPalette');
    colorPalette.style.display = 'block';
    colorPalette.dataset.currentElement = this.id;
    });

    // Quando inizio a trascinare un vestito originale
    item.addEventListener('dragstart', drag);

    // Quando termino il trascinamento
    item.addEventListener('dragend', function(event) {
        console.log(`Trascinamento terminato: ${item.id}`);
    });
});

// per ogni colore nella palette
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        const color = this.dataset.color;
        const elementId = document.getElementById('colorPalette').dataset.currentElement;
        if (color === "reset") {
        // Ripristina immagine originale
        const originalElement = document.getElementById(elementId);
        const originalSrc = originalElement.getAttribute('data-original-src');
        if (originalSrc) {
            originalElement.src = originalSrc;
            const cloneElement = document.getElementById(elementId + '-clone');
            if (cloneElement) cloneElement.src = originalSrc;
        }
        } else {
        handleColorChange(color, elementId);
        }
        document.getElementById('colorPalette').style.display = 'none';
    });
});

// per chiudere la palette se clicchi 'chiudi'
document.getElementById('closePalette').addEventListener('click', function() {
    document.getElementById('colorPalette').style.display = 'none';
});

// per chiudere la palette se clicchi fuori
document.addEventListener('click', function(e) {
    const colorPalette = document.getElementById('colorPalette');
    if (!colorPalette.contains(e.target) && e.target.classList.contains('vestito') === false) {
    colorPalette.style.display = 'none';
    }
});

// non posso mettere .arrow right perchè significherebbe che right è figlio di arrow
document.querySelectorAll('.arrow.right').forEach(btn => {
    btn.addEventListener('click', () => {
        const carouselId = btn.dataset.carouselId;
        scrollCarousel(carouselId, 1);
    });
});

document.querySelectorAll('.arrow.left').forEach(btn => {
    btn.addEventListener('click', () => {
        const carouselId = btn.dataset.carouselId;
        scrollCarousel(carouselId, -1);
    });
});

cestino.addEventListener('dragover', allowDrop);
cestino.addEventListener('drop', throwInTheTrash);

document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', () => {
        const genere = button.dataset.genere;
        const colore = button.dataset.colore;
        changeMannequinColor(genere, colore);
    });
});

document.querySelectorAll('.stile-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const stile = btn.dataset.stile;
        showClothesByStyle(stile);
    });
});

const stileButtons = document.querySelectorAll('.stile-btn');

stileButtons.forEach(button => {
    button.addEventListener('click', () => {
        const stile = button.getAttribute('data-stile');
        // rendo di nuovo draggable tutti i vestiti nel caso in cui passi da uno stile all'altro
        document.querySelectorAll('.vestito').forEach(el => {
            el.setAttribute('draggable', 'true');
            el.style.opacity = '1';
            el.style.cursor = "grab";
        });
    });
});

// Quando la pagina è pronta
window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const btnUomo = document.getElementById('btn-uomo');
    const btnDonna = document.getElementById('btn-donna');
    const closeBtn = document.querySelector('.close-btn');

    //voglio che si apra una sola volta 
    function openPopup() {
        // Controlla se il popup è già stato mostrato
        if (!sessionStorage.getItem('popupShown')) {
        popup.style.display = 'flex';
        sessionStorage.setItem('popupShown', 'true'); // Segna che il popup è stato mostrato
        }
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    btnUomo.addEventListener('click', openPopup);
    btnDonna.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);
});

document.querySelector("#scaricaOutfitUomo input[type='checkbox']").addEventListener("click", function(event) {
    event.preventDefault();

    const manichino = document.getElementById("manichino-uomo");
    const bookmark = document.getElementById("scaricaOutfitUomo");
    const checkbox = this;
    const path = bookmark.querySelector("svg path");

    // Colora di giallo il bookmark
    if (path) path.style.fill = "gold";

    checkbox.checked = true;
    bookmark.style.display = "none";

    html2canvas(manichino, { backgroundColor: null }).then(function(canvas) {
        const base64image = canvas.toDataURL("image/png"); // estrae l’immagine contenuta nel canvas e la converte in PNG data:image/png;base64,...

        fetch('php/salva_immagine.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, // dice al server che i dati nel body sono in JSON
            body: JSON.stringify({ immagine: base64image }) // invia i dati, trasformando l'immagine js in una stringa JSON tipo {"immagine": "data:image/png;base64,..."} .
        })
        .then(res => res.json()) // quando il server PHP risponde, ottieni un oggetto Response. Con res.json() trasformo il corpo della risposta in un oggetto JS
        .then(data => {
            if (!data.errore) {
                alert('Immagine salvata!');
            } else {
                alert('Errore: ' + data.messaggio);
            }
        });

        // Scarica l'immagine
        const link = document.createElement("a");
        link.href = base64image;
        link.download = "outfit-uomo.png"; // quando il link viene cliccato, scarica il file e lo chiama "outfit-uomo.png”, invece di aprirlo nel browser.
        document.body.appendChild(link);
        link.click(); //  simula un clic sul link, in modo da farpartire il download automatico
        document.body.removeChild(link);

        bookmark.style.display = "flex";

        // Dopo 3 secondi resetta checkbox e colore
        setTimeout(() => {
            checkbox.checked = false;
            if (path) path.style.fill = ""; // reset colore
        }, 3000);
    });
});


document.querySelector("#scaricaOutfitDonna input[type='checkbox']").addEventListener("click", function(event) {
    event.preventDefault();

    const manichino = document.getElementById("manichino-donna");
    const bookmark = document.getElementById("scaricaOutfitDonna");
    const checkbox = this;
    const path = bookmark.querySelector("svg path");

    // Colora di giallo il bookmark
    if (path) path.style.fill = "gold";

    checkbox.checked = true;
    bookmark.style.display = "none";

    html2canvas(manichino, { backgroundColor: null }).then(function(canvas) {
        const base64image = canvas.toDataURL("image/png");

        fetch('php/salva_immagine.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ immagine: base64image })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.errore) {
                alert('Immagine salvata!');
            } else {
                alert('Errore: ' + data.messaggio);
            }
        });

        // Scarica l'immagine
        const link = document.createElement("a");
        link.href = base64image;
        link.download = "outfit-donna.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        bookmark.style.display = "flex";

        // Dopo 3 secondi resetta checkbox e colore
        setTimeout(() => {
            checkbox.checked = false;
            if (path) path.style.fill = ""; // reset colore
        }, 3000);
    });
});