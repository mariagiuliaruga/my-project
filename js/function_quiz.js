window.calcolaStile = function(answers) {
    const genere = answers["0"];

    const stili = genere === "Uomo" ? { ...window.stiliUomo } : { ...window.stiliDonna };
    const mappa = genere === "Uomo" ? window.mappaStiliUomo : window.mappaStiliDonna;

    for (const [index, risposta] of Object.entries(answers)) {
        if (parseInt(index) <= 1) continue;
        const peso = window.pesiDomande[index] || 1;

        if (Array.isArray(risposta)) {
            risposta.forEach(val => {
                if (mappa[val]) stili[mappa[val]] += peso;
            });
        } else {
            if (mappa[risposta]) stili[mappa[risposta]] += peso;
        }
    }

    let stileVincente = '';
    let max = -1;
    for (const [stile, punteggio] of Object.entries(stili)) {
        if (punteggio > max) {
            max = punteggio;
            stileVincente = stile;
        }
    }

    return {
        stileVincente,
        punteggioMassimo: max,
        punteggi: stili
    };
};

window.getStyleDescription = function(stile) {
    const descrizioni = {
        bohoChic: "Sei una persona creativa e libera, che ama esprimersi attraverso uno stile unico e artistico. Il tuo look è caratterizzato da colori vivaci, texture naturali e accessori originali.",
        sporty: "Energia e dinamicità si riflettono nel tuo modo di vestire. Adori lo stile athleisure, fatto di tute, sneakers di tendenza, cappellini e loghi sportivi. Che tu stia andando in palestra o al bar con gli amici, il tuo look comunica sempre movimento, forza e praticità.",
        sportyMen: null,
        sportyWomen: null,
        messy: "Sei una persona spontanea e anticonformista. Il tuo stile è unico e personale, che combina elementi diversi in modo creativo e originale.",
        preppy: "Hai uno stile curato e raffinato, che riflette la tua attenzione ai dettagli. Il tuo look è caratterizzato da linee pulite e colori classici.",
        quietLuxury: "Sei una persona sofisticata che apprezza la qualità e l'eleganza discreta. Il tuo stile è caratterizzato da capi di alta qualità e design minimalista.",
        scandi: "Hai uno stile minimalista e funzionale, influenzato dal design scandinavo. Il tuo look è caratterizzato da linee pulite, colori neutri e un'estetica moderna.",
        
        vintage: "Hai l’anima di un collezionista e il gusto per il passato. Il tuo stile pesca a piene mani dagli anni ‘70, ‘80 e ‘90, con giacche retrò, camicie a stampa, jeans sbiaditi e accessori d’epoca. Ogni tuo outfit racconta una storia e dimostra un occhio attento alla moda senza tempo.",
        eBoy: "Nero, catene, eyeliner e un tocco di mistero: sei l’anima ribelle e digitale della moda. Il tuo stile è influenzato dalla cultura internet, dallo skate e dalla musica alternativa. Ti piace sperimentare e giocare con i contrasti, tra oversize e dettagli punk, creando un look unico e d’impatto.",
        casual: "Eleganza sobria, fascino senza tempo. Il tuo stile richiama l’estetica dei college americani, con capi classici come blazer, camicie, pantaloni chino e mocassini. Ami la qualità e la discrezione: sembri uscito da una rivista vintage di alta classe, senza mai risultare ostentato.",
        oldMoney: "Il tuo stile parla di classe e discrezione. Prediligi capi eleganti ma mai appariscenti: blazer ben tagliati, pantaloni sartoriali, camicie impeccabili e maglioni in tessuti pregiati. I colori sono neutri, i materiali di qualità. Hai un’eleganza innata che non ha bisogno di loghi o eccessi per farsi notare: bastano la cura dei dettagli e la sicurezza nei tuoi gesti.",
        street: "Urban vibes e tanta personalità. Ami lo stile streetwear fatto di felpe oversize, pantaloni cargo, cappellini e sneakers limited edition. Prendi ispirazione dai trend delle metropoli e ti piace distinguerti con dettagli audaci e pezzi statement."
    };

    descrizioni.sportyMen = descrizioni.sporty;
    descrizioni.sportyWomen = descrizioni.sporty;

    return descrizioni[stile] || "Descrizione non disponibile.";
};
