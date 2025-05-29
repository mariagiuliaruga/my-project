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

    onDressDroppedOnMannequin(draggedElement);
    
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
    
    function rimuoviIndumenti(zona) {
        const esistenti = manichino.querySelectorAll(`.indumento[data-zona="${zona}"]`);
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

    // rimuovo indumenti dalla zona corrente
    if (zonaNome) {
        rimuoviIndumenti(zonaNome);
    }

    // casi speciali
    if (zonaNome === "vestito") {
        rimuoviIndumenti("gambe");
        rimuoviIndumenti("busto");
    }

    if (zonaNome === "gambe" || zonaNome === "busto") {
        rimuoviIndumenti("vestito");
    }

    if (zonaNome === "borsa") {
        rimuoviIndumenti("borsa-mano");
    }

    if (zonaNome === "borsa-mano") {
        rimuoviIndumenti("borsa");
    }

    clone.setAttribute("data-zona", zonaNome); //perchè anche il clone deve avere la stessa zona dell'originale, per futuri controlli

    let zIndex = 1;
    if (zonaNome === "over-busto") {
    zIndex = 3;
    } else if (zonaNome === "busto" || zonaNome === "vestito") {
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

cestino.addEventListener('dragover', allowDrop);
cestino.addEventListener('drop', throwInTheTrash);