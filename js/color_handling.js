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

document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', () => {
        const genere = button.dataset.genere;
        const colore = button.dataset.colore;
        changeMannequinColor(genere, colore);
    });
});