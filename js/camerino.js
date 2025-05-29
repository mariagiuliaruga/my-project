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
    'camicia-verde', 'gilet-azzurro', 'camicetta', 'maglia', 'maglia-lanetta', 'mocassini', 'scarpe-bianche', 'stivaletti-marroni', 'pantaloni-lino',
    'felpa-ralph', 'orologio', 'cappello-polo', 'skinny', 'pantaloni-neri', 'giacca-elegante', 'air-force', 'felpone-grigia'
],
casual: [
    'maglia', 'camicia-verde', 'maglia-lanetta', 'scarpe-bianche', 'cappello-polo', 'stivaletti-marroni', 'orologio', 
    'cargo', 'camicetta', 'maglia-maglione-marrone', 'giacca-jeans', 'giacca-pelle', 'pantaloni-neri', 'jeans-grigi', 'scarpe-samba',
     'new-balance', 'dunk-nere', 'skinny', 'pantaloncino-jeans-nero', 'felpone-grigia', 'jeans-chiari'
],
vintage: [
    'maglia-lanetta', 'maglia-marrone', 'giacca-jeans', 'jeans-grigi', 'campus', 'mocassini', 'mocassini-marroni', 
     'orologio', 'giacca-pelle', 'maglia-nera', 'maglione-marrone', 'giacca-colorata', 'maglia-maglione', 'maglia-maglione-marrone', 
     'jeans', 'jeans-grigi', 'pantaloncino-jeans-nero', 'pantaloni-lino', 'pantaloncini-jeans',  'felpa-nera-uomo'
],
eBoy: [
    'maglia-nera',  'cappello-marrone', 'giacca-colorata', 'vans', 'cappello-marrone', 'felpa-ralph', 'giacca-pelle',
    'pantaloncino-jeans-nero', 'jeans-neri', 'new-balance', 'skinny', 'felpa-nera-uomo', 'jeans-chiari'
],
street: [
    'maglia-marrone', 'maglia-stussy', 'giacca-carhartt', 'giacca-nike', 'timberland', 'cappello-marrone', 
    'giacca-jeans', 'pantaloncino-jeans', 'jeans-neri', 'asics', 'dunk-nere', 'new-balance', 'jeans-grigi', 'cargo',  'felpa-nera-uomo'
],
sportyMen: [
    'maglia-aderente', 'pantaloncino-tuta', 'giacca-nike', 'campus', 'felpa-ralph', 'cappello-polo',
     'maglia-stussy', 'maglia-blu', 'jeans', 'pantaloncino-jeans-nero', 'asics', 'scarpe-jordan', 'new-balance', 'pantaloncino-jeans'
],
bohoChic: [
    'gonna-lunga', 'maglia-frange', 'maglia-boho', 'giubbotto-pelle', 'frange', 'top-bianco', 'uggs', 'cowboy', 
    'pantaloncini-marroni', 'pantaloncini-bianchi', 'canotta-bianca', 'top-marrone', 'top-righe', 'top-stampa',
    'jeans-zampa', 'pantaloni-beige', 'borsa-marrone', 'borsetta-frange', 'borsetta-marrone'
],
quietLuxury: [
    'giacca-pelle-donna', 'camicetta-bianca', 'jeans-grigi2-donna', 'gonna-lunga-luxury', 'top-marrone', 'tube-top', 'stivaletti', 'stivali-tacco', 
     'pantaloni-eleganti', 'pantaloni-palazzo', 'pantaloni-neri-donna', 'camicetta-nera', 'canotta-bianca', 'gilet-righe', 'vestito-tiffany',
     'borsa-nera', 'borsetta-marrone'
],
preppy: [
    'camicetta-bianca', 'stivaletti', 'maglione-azzurro', 'camicetta-gilet', 'scarpe-bianche-donna', 'gonna-grigia',
     'pantaloni-palazzo', 'gonna-pieghe', 'gonna-lunga-preppy', 'camicetta-nera', 'maglia-boho', 'gilet-righe', 'top-azzurro', 
     'vestito-tiffany', 'gazzelle', 'samba', 'pantaloni-rosa', 'borsetta-rosa', 'borsa-nera'
],
messy: [
    'maglia-offshoulders', 'converse', 'maglia-grafica', 'giubbotto-pelle', 'stivali-neri', 'jeans-neri-donna', 
    'pantaloni-neri-donna', 'gonna-jeans', 'top-azzurro', 'top-righe', 'gazzelle', 'jeans-zampa', 'borsa-nera', 'borsa-marrone'
],
scandi: [
    'maglione-beige', 'uggs', 'maglione-azzurro', 'top-bianco', 'campus-donna', 'jeans-grigi-donna', 'pantaloni-marroni', 
    'pantaloni-beige', 'jeans-donna', 'maglia-semplice', 'giubbotto-pelle', 'tuta-nera', 'gazzelle',
    'borsa-marrone', 'borsetta-marrone', 'borsetta-rosa'
],
sportyWomen: [
    'maglia-gialla', 'maglia-rossa', 'campus-donna', 'scarpe-bianche-donna', 'gonna-jeans-sporty', 'jeans-grigi-donna',
    'pantaloncini-blu', 'pantaloncini-jeans', 'jeans-donna', 'top-verde', 'pantaloncino-verde', 'giubbotto-pelle', 'pantalone-tuta',
    'felpa-nera', 'tuta-nera', 'borsa-nera'
]
};

function moveLeft() {
    const wrapper = document.querySelector('.wrapper');
    const scritta = document.querySelector('.scritta-camerino');
    const btnUomo = document.getElementById("btn-uomo");
    const btnDonna = document.getElementById("btn-donna");

    // Sposta molto più in alto e a sinistra, con scala
    btnDonna.style.transform = "translate(-50vw, -180px) scale(0.2)";
    btnUomo.style.transform = "translate(-30vw, -180px) scale(0.2)";

    btnUomo.style.transition = "transform 0.3s ease";
    btnDonna.style.transition = "transform 0.3s ease";

    btnDonna.classList.add("btn-mini");
    btnUomo.classList.add("btn-mini");

    wrapper.style.transform = "translateY(-5px)";
    wrapper.style.transition = "transform 0.3s ease";

    scritta.style.transform = "translateX(-40vw) translateY(-5vh) scale(0.6)";
    scritta.style.transition = "transform 0.3s ease";

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
            vestito.style.display = 'inline-block'; // o flex se serve, in base al CSS
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

        // Reset dell’indice di scroll
        carouselIndices[id] = 0;
        scrollCarousel(id, 0);
    });
}

let firstDressDropped = false;

function onDressDroppedOnMannequin(dressElement) {
    if (firstDressDropped) return;
    firstDressDropped = true;

    const overlay = document.getElementById("overlayDim");
    const hint3 = document.getElementById("hint3");
    const hint2 = document.getElementById("hint2");
    const hint1 = document.getElementById("hint1");
    const hint4 = document.getElementById("hint4");

    // nasconde eventuale hint2
    hint2.classList.add("hidden");

    // mostra overlay e hint3
    overlay.classList.remove("hidden");
    hint3.textContent = "Fai doppio clic sul vestito per rimuoverlo!";
    hint3.classList.remove("hidden");
    hint3.style.top = '-2vh';
    hint3.style.left = '-15vw';

    // porta sopra il vestito
    dressElement.style.zIndex = '1000';
    dressElement.style.position = 'relative';

    // gestore per click esterni
    function handleOutsideClick(event) {
        const clickFuori = !hint3.contains(event.target) && !dressElement.contains(event.target);
        const hint1Visible = !hint1.classList.contains("hidden");

        if (clickFuori && !hint1Visible) {
            overlay.classList.add("hidden");
            hint3.classList.add("hidden");
            hint4.classList.add("hidden");
            document.removeEventListener("click", handleOutsideClick);
        }
    }

    setTimeout(() => {
        document.addEventListener("dblclick", handleOutsideClick);
    }, 100);
}

function activateColorBtn(genere) {
    const overlay = document.getElementById("overlayDim");
    const hint1 = document.getElementById("hint1");
    const hint2 = document.getElementById("hint2");
    const hint3 = document.getElementById("hint3");
    const hint4 = document.getElementById("hint4");

    const manichino = document.getElementById(
        genere === 'donna' ? "manichino-donna" : "manichino-uomo"
    );

    const colorButtons = manichino.querySelectorAll('.color-btn');

    // mostra overlay e porta in primo piano il manichino
    overlay.classList.remove("hidden");
    manichino.style.zIndex = '1001';
    manichino.style.backgroundColor = 'white';
    manichino.style.borderRadius = '20px';

    // attiva i bottoni per la selezione della carnagione
    colorButtons.forEach(btn => {
        btn.style.zIndex = '1000';

        // il clic su color btn chiude hint1 (quindi abilita possibilità di chiusura overlay)
        btn.addEventListener('click', () => {
            hint1.classList.add("hidden");
            manichino.style.backgroundColor = 'transparent';
        });
    });

    // hint1 (selezione carnagione)
    hint1.textContent = 'Seleziona la carnagione';
    hint1.classList.remove("hidden");
    hint1.style.top = '-5vh';
    hint1.style.left = '-3vw';

    colorButtons.forEach(btn => {
        btn.style.zIndex = '1000';

        btn.addEventListener('click', () => {
            // chiude hint1 e resetta sfondo manichino
            hint1.classList.add("hidden");
            manichino.style.backgroundColor = 'transparent';

            // hint2 (istruzioni carosello)
            hint2.textContent = 'Scorri i caroselli, scegli il vestito che preferisci e trascinalo sul manichino!';
            hint2.classList.remove("hidden");
            hint2.style.top = '10vh';
            hint2.style.left = '25vw';
            hint2.style.width = '18vw';

            // hint4 (palette colori)
            hint4.textContent = 'Prova a cliccare su un vestito per cambiare colore!';
            hint4.classList.remove("hidden");
            hint4.textContent = 'Prova a cliccare su un vestito per cambiare colore!';
            hint4.classList.remove("hidden");
            hint4.style.top = '-20vh';
            hint4.style.left = '35vw';

            // Listener per chiudere hint4 cliccando fuori da hint4
            function closeHint4OnClickOutside(event) {
                if (!hint4.contains(event.target)) {
                    hint4.classList.add("hidden");
                    document.removeEventListener("click", closeHint4OnClickOutside);
                }
            }

            // aggiungo il listener globale con un timeout per evitare conflitti con lo stesso click che ha aperto hint4
            setTimeout(() => {
                document.addEventListener("click", closeHint4OnClickOutside);
            }, 0);

        });
    });


    // clic altrove: chiude hint2 e hint1, poi mostra hint3 (solo se hint1 è già stato chiuso)
    function handleClickToShowHint3(event) {
        const isClickOnColorBtn = [...colorButtons].some(btn => btn.contains(event.target));
        const isClickOnHints = hint1.contains(event.target) || hint2.contains(event.target);
        const isClickOnMannequin = manichino.contains(event.target);

        // se clicco fuori da tutto ma hint1 è ancora visibile, blocco il flusso
        if (!isClickOnColorBtn && !isClickOnHints && !isClickOnMannequin) {
            const hint1Visible = !hint1.classList.contains("hidden");
            if (hint1Visible) return; // non procede finché non si seleziona la carnagione

            // altrimenti chiudo anche hint2 e procedo a mostrare hint3, al drop del vestito sul manichino
            hint2.classList.add("hidden");
            hint4.classList.add("hidden");

            onDressDroppedOnMannequin(manichino);

            document.removeEventListener("click", handleClickToShowHint3);
        }
    }

    setTimeout(() => {
        document.addEventListener("drop", handleClickToShowHint3);
    }, 100);

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
            window.location.href = 'camerino.html';
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
            activateColorBtn('donna');
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
            activateColorBtn('uomo');            
        }
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
        const currentColor = button.style.backgroundColor;

        // se è già selezionato richiama showAllClothes
        if (currentColor === '#333') {
            button.style.backgroundColor = 'grey';
            const areaUomo = document.querySelector('.area-uomo');
            const areaDonna = document.querySelector('.area-donna');

            if (areaUomo && areaUomo.style.display !== 'none') {
                showAllClothesUomo();
            } else if (areaDonna && areaDonna.style.display !== 'none') {
                showAllClothesDonna();
            }
            return;
        }
        
        //se non è selezionato, resetta tutti e colora solo questo
        stileButtons.forEach(btn => btn.style.backgroundColor = 'grey');
        button.style.backgroundColor = '#333';

        const stile = button.getAttribute('data-stile');
        // rendo di nuovo draggable tutti i vestiti nel caso in cui passi da uno stile all'altro
        document.querySelectorAll('.vestito').forEach(el => {
        el.setAttribute('draggable', 'true');
        el.style.opacity = '1';
        el.style.cursor = "grab";
        });
    });
});

function setupDownloadOutfit(genere) {
    const bookmarkId = genere === 'uomo' ? 'scaricaOutfitUomo' : 'scaricaOutfitDonna';
    const manichinoId = genere === 'uomo' ? 'manichino-uomo' : 'manichino-donna';

    const bookmark = document.getElementById(bookmarkId);
    const checkbox = bookmark.querySelector("input[type='checkbox']");
    const manichino = document.getElementById(manichinoId);
    const path = bookmark.querySelector("svg path");

    checkbox.addEventListener("click", function(event) {
        event.preventDefault();

        // colora di giallo il bookmark
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

            // scarica l'immagine
            const link = document.createElement("a");
            link.href = base64image;
            link.download = `outfit-${genere}.png`;
            document.body.appendChild(link);
            link.click(); // simula il click per scasaricare automaticamente 
            document.body.removeChild(link);

            bookmark.style.display = "flex";

            // dopo 3 secondi resetta checkbox e colore
            setTimeout(() => {
                checkbox.checked = false;
                if (path) path.style.fill = "";
            }, 3000);
        });
    });
}

// inizializza per uomo e donna
setupDownloadOutfit('uomo');
setupDownloadOutfit('donna');