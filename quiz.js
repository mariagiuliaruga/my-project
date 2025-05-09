// Inizializza gli event listener quando il documento è caricato
document.addEventListener('DOMContentLoaded', function() {
    const loginPanel = document.querySelector('.login-panel');
    const quizButton = document.querySelector('.quiz-button');
    const quizContainer = document.querySelector('.quiz-container');
    const quizWindow = document.querySelector('.quiz-window');
    const quizButtonActive = document.querySelector('.quiz-button.active');
        const closeButton = document.querySelector('.quiz-close-button');
    
        //event listener per il pulsante di chiusura
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                console.log('Close button clicked'); // Debug
                quizContainer.classList.remove('visible');
                quizWindow.classList.remove('visible');
            });
        }
    
    
        //Domande iniziali 
        const sondaggioIniziale = [
            {
                domanda: "Sei un uomo o una donna?",
                tipo: "select",
                opzioni: ["Uomo", "Donna"]
            },
            {
                domanda: "Quanti anni hai?",
                tipo: "number",
                placeholder: "Inserisci la tua età"
            }
        ];
    
        //Sondaggio uomo
        const sondaggioUomo = [
            //domanda 1
            {
                domanda: "Quale tra queste parole ti descrive meglio?",
                tipo: "select",
                opzioni: ["Creativo", "Minimalista", "Elegante", "Sportivo"
    
                ]
            },
            //domanda 2
            {   
                domanda: "Quanto ti piace sperimentare con il tuo stile?",
                tipo: "select",
                opzioni: ["Per niente", "Poco", "Abbastanza", "Molto", "Moltissimo"]
            },
            //domanda 3
            {
                domanda: "Quali colori preferisci indossare?",
                tipo: "select",
                opzioni: ["Neutrali", "Scuri", "Vivaci", "Pastello", "Colorati", "Navy"],
                immagini: {
                    "Neutrali": "colori/coloriNeutrali.png",
                    "Scuri": "colori/coloriScuri.png",
                    "Vivaci": "colori/coloriVivaci.png",
                    "Pastello": "colori/coloriPastello.png",
                    "Colorati": "colori/coloriColorati.png",
                    "Navy": "colori/coloriNavy.png"
                }
            },
            //domanda 4
            {
                domanda: "Quali accessori preferisci?",
                tipo: "select",
                opzioni: ["Orologio", "Cintura", "Cravatta", "Cappello", "Occhiali da sole" ,"Borsello"],
                immagini: {
                    "Orologio": "accessori/orologio.png",
                    "Cintura": "accessori/cintura.png",
                    "Cravatta": "accessori/cravatta.png",
                    "Cappello": "accessori/cappello.png",
                    "Occhiali da sole": "accessori/occhiali.png",
                    "Borsello": "accessori/borsello.png"
    
                }
            },
            //domanda 5
            {
                domanda: "Quale di queste occasioni vivi più spesso?",
                tipo: "select",
                opzioni: ["Università / Lavoro", "Aperitivi / Eventi", "Viaggi e weekend", "Serate fuori"]
            },
            //domanda 6
            {
                domanda: "Dove trovi ispirazione per i tuoi outfit?",
                tipo: "select",
                opzioni: ["Instagram", "TikTok", "Street style", "Amici o conoscenti", "Celebrità / Modelli", "Non ci penso troppo"]
            },
            //domanda 7
            {
                domanda: "Cosa cerchi principalmente nel tuo stile?",
                tipo: "select",
                opzioni: ["Comodità", "Stile personale", "Ordine e pulizia", "Distinzione", "Funzionalità"]
            },
            //domanda 8
    
            //domanda 9
            {
                domanda: "Quali tra queste scarpe indosseresti?",
                tipo: "select",
                opzioni: ["Mocassini", "StanSmith", "Chelsea", "AirForce", "Jordan" ,"Elegante"],
                immagini: {
                    "Mocassini": "scarpe/Mocassini.png",
                    "StanSmith": "scarpe/StanSmith.png",
                    "Chelsea": "scarpe/Chelsea.png",
                    "AirForce": "scarpe/AirForce.png",
                    "Jordan": "scarpe/Jordan.png",
                    "Elegante": "scarpe/Elegante.png"
                }
            }
        ];
    
        //Sondaggio donna
        const sondaggioDonna = [
            //domanda 1
            {
                domanda: "Quale tra queste parole ti descrive meglio?",
                tipo: "select",
                opzioni: ["Creativa", "Minimalista", "Elegante", "Sportiva"]
            },
            //domanda 2
            {
                domanda: "Quanto ti piace sperimentare con il tuo stile?",
                tipo: "select",
                opzioni: ["Per niente", "Poco", "Abbastanza", "Molto", "Moltissimo"]
            },
            //domanda 3
            {
                domanda: "Quali colori preferisci indossare?",
                tipo: "select",
                opzioni: ["Neutrali", "Scuri", "Vivaci", "Pastello", "Colorati", "Navy"],
                immagini: {
                    "Neutrali": "colori/coloriNeutrali.png",
                    "Scuri": "colori/coloriScuri.png",
                    "Vivaci": "colori/coloriVivaci.png",
                    "Pastello": "colori/coloriPastello.png",
                    "Colorati": "colori/coloriColorati.png",
                    "Navy": "colori/coloriNavy.png"
                }
            },
            //domanda 4
            {
                domanda: "Che tipo di gioielli preferisci?",
                tipo: "select",
                opzioni: ["Oro", "Argento", "Entrambi", "Nessuno"],
                immagini: {
                    "Oro": "gioielli/oro.png",
                    "Argento": "gioielli/argento.png"
                }
            },
            //domanda 5
            {
                domanda: "Quale di queste occasioni vivi più spesso?",
                tipo: "select",
                opzioni: ["Università / Lavoro", "Aperitivi / Eventi", "Viaggi e weekend", "Serate fuori"]
            },
            //domanda 6
            {
                domanda: "Dove trovi ispirazione per i tuoi outfit?",
                tipo: "select",
                opzioni: ["Pinterest", "Instagram", "Video su YouTube/TikTok", "Le persone per strada", "Riviste o blog", "Creo da sola"]
            },
            //domanda 7
            {
                domanda: "Quanto tempo dedichi a scegliere il tuo outfit",
                tipo: "select",
                opzioni: ["Pochi minuti", "Ci penso un po'", "Lo preparo il giorno prima", "Cambio idea mille volte"]
            },
            //domanda 8
            {
                domanda: "Quando scegli un outfit, cosa consideri più importante?",
                tipo: "select",
                opzioni: ["Essere comoda", "Sentirmi alla moda", "Esprimere la mia personalità", "Vestirmi in modo curato e ordinato"]
            },
            //domanda 9
            {
                domanda: "Quali tra queste scarpe indosseresti?",
                tipo: "select",
                opzioni: ["Ballerine", "Birkenstock", "UGGS", "Converse", "Samba", "Stivali"],
                immagini: {
                    "Ballerine": "scarpe/Ballerina.png",
                    "Birkenstock": "scarpe/Birkenstock.png",
                    "UGGS": "scarpe/UGGS.png",
                    "Converse": "scarpe/Converse.png",
                    "Samba": "scarpe/Samba.png",
                    "Stivali": "scarpe/Stivali.png"
                }
            }
        ];
    
    
        let currentQuestion = 0;
        let answers = {};
        let currentSondaggio = [...sondaggioIniziale, ...sondaggioDonna]; // Inizialmente usa le domande per donne
    
        // Funzione per mostrare la domanda corrente
        function showQuestion(index) {
            const questionElement = document.querySelector('.quiz-domanda');
            const question = currentSondaggio[index];
            
            let html = `<h3>${question.domanda}</h3>`;
            
            if (question.tipo === "select") {
                if (question.immagini) {
                    html += `<div class="color-options-grid">`;
                    
                    question.opzioni.forEach(opzione => {
                        const imgSrc = question.immagini[opzione];
                        let isChecked = false;
                        if (answers[index]) {
                            isChecked = Array.isArray(answers[index]) 
                                ? answers[index].includes(opzione) 
                                : answers[index] === opzione;
                        }
                        
                        const isJewelryQuestion = question.domanda.includes("gioielli");
                        const isShoeQuestion = question.domanda.includes("scarpe");
                        const isAccessoryQuestion = question.domanda.includes("accessori");
                        
                        html += `
                            <label class="color-option ${!imgSrc ? 'text-only' : ''} ${isJewelryQuestion && imgSrc ? 'jewelry-option' : ''} ${isShoeQuestion ? 'shoe-option' : ''} ${isAccessoryQuestion ? 'accessory-option' : ''}">
                                <input type="checkbox" class="quiz-checkbox" 
                                    name="question-${index}" value="${opzione}" ${isChecked ? 'checked' : ''}>
                                <div class="color-option-content">
                                    ${imgSrc ? `
                                        <img src="${imgSrc}" alt="${opzione}" 
                                            class="color-img ${isShoeQuestion ? 'shoe-img' : ''} ${isJewelryQuestion ? 'jewelry-img' : ''} ${isAccessoryQuestion ? 'accessory-img' : ''}">
                                    ` : ''}
                                    ${!isShoeQuestion && !isAccessoryQuestion ? `<span class="color-option-text">${opzione}</span>` : ''}
                                </div>
                            </label>`;
                    });
                    
                    html += `</div>`;
                } else {
                    html += `<div class="quiz-options">`;
                    question.opzioni.forEach(opzione => {
                        const isChecked = answers[index] === opzione;
                        html += `
                            <label class="quiz-option">
                                <input type="radio" class="quiz-radio" 
                                    name="question-${index}" value="${opzione}" ${isChecked ? 'checked' : ''}>
                                <span class="quiz-option-text">${opzione}</span>
                            </label>`;
                    });
                    html += `</div>`;
                }
            } else if (question.tipo === "number") {
                html += `<input type="number" class="quiz-input" 
                    placeholder="${question.placeholder || ''}" 
                    value="${answers[index] || ''}" 
                    min="1" max="100" required>`;
            }
            
            questionElement.innerHTML = html;
    
            // Aggiorna il progresso
            const progressElement = document.querySelector('.quiz-progress');
            if (progressElement) {
                progressElement.textContent = `Domanda ${index + 1} di ${currentSondaggio.length}`;
            }
    
            // Gestisci i pulsanti di navigazione
            const prevButton = document.querySelector('.quiz-prev');
            const nextButton = document.querySelector('.quiz-next');
            const submitButton = document.querySelector('.quiz-submit');
    
            if (prevButton) {
                prevButton.style.display = index > 0 ? 'inline-block' : 'none';
            }
            if (nextButton) {
                nextButton.style.display = index < currentSondaggio.length - 1 ? 'inline-block' : 'none';
            }
            if (submitButton) {
                submitButton.style.display = index === currentSondaggio.length - 1 ? 'inline-block' : 'none';
            }
    
            // Aggiungi event listener per i checkbox per renderli mutuamente esclusivi
            const checkboxes = questionElement.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        // Deseleziona tutti gli altri checkbox
                        checkboxes.forEach(cb => {
                            if (cb !== this) {
                                cb.checked = false;
                            }
                        });
                    }
                    saveAnswer(index);
                });
            });
    
            // Aggiungi event listener per l'input numerico
            const numberInput = questionElement.querySelector('input[type="number"]');
            if (numberInput) {
                numberInput.addEventListener('input', function() {
                    saveAnswer(index);
                });
            }
        }
    
        // Funzione per salvare la risposta
        function saveAnswer(index) {
            const question = currentSondaggio[index];
            const questionElement = document.querySelector('.quiz-domanda');
            
            if (question.tipo === "select") {
                // Caso speciale per la domanda sui colori che usa checkbox
                if (question.immagini) {
                    const selectedCheckboxes = questionElement.querySelectorAll('input[type="checkbox"]:checked');
                    const selectedValues = Array.from(selectedCheckboxes).map(cb => cb.value);
                    answers[index] = selectedValues.length > 0 ? selectedValues : null;
                } else {
                    // Per le altre domande a scelta singola
                    const selectedRadio = questionElement.querySelector('input[type="radio"]:checked');
                    answers[index] = selectedRadio ? selectedRadio.value : null;
                    
                    // Se è la prima domanda (genere), carica il sondaggio appropriato
                    if (index === 0) {
                        if (answers[0] === "Uomo") {
                            currentSondaggio = [...sondaggioIniziale, ...sondaggioUomo];
                        } else if (answers[0] === "Donna") {
                            currentSondaggio = [...sondaggioIniziale, ...sondaggioDonna];
                        }
                        // Resetta le risposte successive alla prima domanda
                        Object.keys(answers).forEach(key => {
                            if (parseInt(key) > 0) {
                                delete answers[key];
                            }
                        });
                    }
                }
            } else if (question.tipo === "number") {
                const input = questionElement.querySelector('input[type="number"]');
                answers[index] = input ? input.value : null;
            }
        }
    
        // Funzione per validare la risposta corrente
        function validateCurrentQuestion() {
            const question = currentSondaggio[currentQuestion];
            const questionElement = document.querySelector('.quiz-domanda');
            
            if (question.tipo === "select") {
                if (question.immagini) {
                    // Per domande con checkbox (immagini)
                    const selectedCheckboxes = questionElement.querySelectorAll('input[type="checkbox"]:checked');
                    if (selectedCheckboxes.length === 0) {
                        alert('Per favore seleziona almeno un\'opzione');
                        return false;
                    }
                } else {
                    // Per domande con radio button
                    const selectedRadio = questionElement.querySelector('input[type="radio"]:checked');
                    if (!selectedRadio) {
                        alert('Per favore seleziona una risposta');
                        return false;
                    }
                }
            } else if (question.tipo === "number") {
                const input = questionElement.querySelector('input[type="number"]');
                const age = parseInt(input.value);
                if (isNaN(age) || age < 1 || age > 100) {
                    alert('Per favore inserisci un\'età valida tra 1 e 100 anni');
                    return false;
                }
            }
            
            return true;
        }
    
        // Funzione per inviare il quiz
        function submitQuiz() {
            // Salva l'ultima risposta
            saveAnswer(currentQuestion);

            // Filtra le risposte per rimuovere le domande iniziali (genere ed età)
            const risposteStile = Object.entries(answers)
                .filter(([index]) => parseInt(index) > 1) // Esclude le prime due domande
                .reduce((acc, [index, value]) => {
                    acc[index] = value;
                    return acc;
                }, {});

            // Calcola lo stile
            const risultato = calcolaStile(risposteStile);
            
            // Crea il contenuto del risultato
            const resultContent = `
                <div class="quiz-result">
                    <h2>Il tuo stile è: ${risultato.stileVincente}</h2>
                    <div class="style-description">
                        ${getStyleDescription(risultato.stileVincente)}
                    </div>
                    <div class="style-scores">
                        <h3>Punteggi per ogni stile:</h3>
                        ${Object.entries(risultato.punteggi)
                            .map(([stile, punteggio]) => `
                                <div class="style-score">
                                    <span>${stile}:</span>
                                    <div class="score-bar">
                                        <div class="score-fill" style="width: ${(punteggio / risultato.punteggioMassimo) * 100}%"></div>
                                    </div>
                                    <span>${punteggio}</span>
                                </div>
                            `).join('')}
                    </div>
                </div>
            `;

            // Mostra il risultato
            const questionElement = document.querySelector('.quiz-domanda');
            if (questionElement) {
                questionElement.innerHTML = resultContent;
            } else {
                console.error('Elemento .quiz-domanda non trovato');
            }
            
            // Nascondi i pulsanti di navigazione
            const navigationElement = document.querySelector('.quiz-navigation');
            if (navigationElement) {
                navigationElement.style.display = 'none';
            }

            // Mantieni il container del quiz visibile
            if (quizContainer) {
                quizContainer.classList.add('visible');
            }
            if (quizWindow) {
                quizWindow.classList.add('visible');
            }

            // Aggiungi un pulsante per chiudere i risultati
            const closeButton = document.createElement('button');
            closeButton.className = 'quiz-close-button';
            closeButton.innerHTML = '×';
            closeButton.onclick = function() {
                quizContainer.classList.remove('visible');
                quizWindow.classList.remove('visible');
            };
            quizWindow.appendChild(closeButton);
        }
    
        // Funzione per ottenere la descrizione dello stile
        function getStyleDescription(stile) {
            const descrizioni = {
                bohoChic: "Sei una persona creativa e libera, che ama esprimersi attraverso uno stile unico e artistico. Il tuo look è caratterizzato da colori vivaci, texture naturali e accessori originali.",
                fisherman: "Hai uno stile pratico e funzionale, che privilegia il comfort senza rinunciare all'eleganza. Il tuo guardaroba è composto da capi versatili e duraturi.",
                messy: "Sei una persona spontanea e anticonformista. Il tuo stile è unico e personale, che combina elementi diversi in modo creativo e originale.",
                preppy: "Hai uno stile curato e raffinato, che riflette la tua attenzione ai dettagli. Il tuo look è caratterizzato da linee pulite e colori classici.",
                quietLuxury: "Sei una persona sofisticata che apprezza la qualità e l'eleganza discreta. Il tuo stile è caratterizzato da capi di alta qualità e design minimalista.",
                scandi: "Hai uno stile minimalista e funzionale, influenzato dal design scandinavo. Il tuo look è caratterizzato da linee pulite, colori neutri e un'estetica moderna."
            };
            return descrizioni[stile] || "Nessuna descrizione disponibile per questo stile.";
        }
    
        // Event listener per il pulsante del quiz
        if (quizButton) {
            quizButton.addEventListener('click', function() {
                currentQuestion = 0;
                answers = {};
                quizContainer.classList.add('visible');
                quizWindow.classList.add('visible');
                showQuestion(currentQuestion);
            });
        }
    
        // Event listener per il pulsante precedente
        const prevButton = document.querySelector('.quiz-prev');
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                if (currentQuestion > 0) {
                    saveAnswer(currentQuestion);
                    currentQuestion--;
                    showQuestion(currentQuestion);
                }
            });
        }
    
        // Event listener per il pulsante successivo
        const nextButton = document.querySelector('.quiz-next');
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                if (validateCurrentQuestion()) {
                    saveAnswer(currentQuestion);
                    currentQuestion++;
                    showQuestion(currentQuestion);
                }
            });
        }
    
        // Event listener per il pulsante di invio
        const submitButton = document.querySelector('.quiz-submit');
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                if (validateCurrentQuestion()) {
                    saveAnswer(currentQuestion);
                    submitQuiz();
                }
            });
        }

        // Oggetto per tenere traccia dei punteggi degli stili
        const stiliDonna = {
            bohoChic: 0,
            fisherman: 0,
            messy: 0,
            preppy: 0,
            quietLuxury: 0,
            scandi: 0
        };

        // Mappa delle risposte agli stili
        const mappaStiliDonna = {
            // Domanda 1: Quale tra queste parole ti descrive meglio?
            "Creativa": "bohoChic",
            "Minimalista": "scandi",
            "Elegante": "quietLuxury",
            "Sportiva": "fisherman",

            // Domanda 2: Quanto ti piace sperimentare con il tuo stile?
            "Per niente": "quietLuxury",
            "Poco": "preppy",
            "Abbastanza": "fisherman",
            "Molto": "messy",
            "Moltissimo": "bohoChic",

            // Domanda 3: Quali colori preferisci indossare?
            "Neutrali": "quietLuxury",
            "Scuri": "quietLuxury",
            "Vivaci": "bohoChic",
            "Pastello": "preppy",
            "Colorati": "messy",
            "Navy": "preppy",

            // Domanda 4: Che tipo di gioielli preferisci?
            "Oro": "quietLuxury",
            "Argento": "scandi",
            "Entrambi": "bohoChic",
            "Nessuno": "fisherman",

            // Domanda 5: Quale di queste occasioni vivi più spesso?
            "Università / Lavoro": "preppy",
            "Aperitivi / Eventi": "quietLuxury",
            "Viaggi e weekend": "bohoChic",
            "Serate fuori": "messy",

            // Domanda 6: Dove trovi ispirazione per i tuoi outfit?
            "Pinterest": "bohoChic",
            "Instagram": "messy",
            "Video su YouTube/TikTok": "messy",
            "Le persone per strada": "fisherman",
            "Riviste o blog": "quietLuxury",
            "Creo da sola": "bohoChic",

            // Domanda 7: Quanto tempo dedichi a scegliere il tuo outfit
            "Pochi minuti": "bohoChic",
            "Ci penso un po'": "scandi",
            "Lo preparo il giorno prima": "preppy",
            "Cambio idea mille volte": "messy",

            // Domanda 8: Quando scegli un outfit, cosa consideri più importante?
            "Essere comoda": "fisherman",
            "Sentirmi alla moda": "messy",
            "Esprimere la mia personalità": "bohoChic",
            "Vestirmi in modo curato e ordinato": "quietLuxury",

            // Domanda 9: Quali tra queste scarpe indosseresti?
            "Ballerine": "preppy",
            "Birkenstock": "bohoChic",
            "UGGS": "messy",
            "Converse": "messy",
            "Samba": "scandi",
            "Stivali": "quietLuxury"
        };

        // Funzione per ottenere la descrizione dello stile
        function getStyleDescription(stile) {
            const descrizioni = {
                bohoChic: "Sei una persona creativa e libera, che ama esprimersi attraverso uno stile unico e artistico. Il tuo look è caratterizzato da colori vivaci, texture naturali e accessori originali.",
                fisherman: "Hai uno stile pratico e funzionale, che privilegia il comfort senza rinunciare all'eleganza. Il tuo guardaroba è composto da capi versatili e duraturi.",
                messy: "Sei una persona spontanea e anticonformista. Il tuo stile è unico e personale, che combina elementi diversi in modo creativo e originale.",
                preppy: "Hai uno stile curato e raffinato, che riflette la tua attenzione ai dettagli. Il tuo look è caratterizzato da linee pulite e colori classici.",
                quietLuxury: "Sei una persona sofisticata che apprezza la qualità e l'eleganza discreta. Il tuo stile è caratterizzato da capi di alta qualità e design minimalista.",
                scandi: "Hai uno stile minimalista e funzionale, influenzato dal design scandinavo. Il tuo look è caratterizzato da linee pulite, colori neutri e un'estetica moderna."
            };
            return descrizioni[stile] || "Nessuna descrizione disponibile per questo stile.";
        }

        // Funzione per calcolare lo stile
        function calcolaStile(answers) {
            // Resetta i punteggi
            Object.keys(stiliDonna).forEach(stile => {
                stiliDonna[stile] = 0;
            });

            // Calcola i punteggi per ogni stile
            Object.keys(answers).forEach(questionIndex => {
                const answer = answers[questionIndex];
                if (mappaStiliDonna[answer]) {
                    const stile = mappaStiliDonna[answer];
                    stiliDonna[stile]++;
                }
            });

            // Trova lo stile con il punteggio più alto
            let stileVincente = '';
            let punteggioMassimo = -1;

            Object.entries(stiliDonna).forEach(([stile, punteggio]) => {
                if (punteggio > punteggioMassimo) {
                    punteggioMassimo = punteggio;
                    stileVincente = stile;
                }
            });

            return {
                stileVincente,
                punteggioMassimo,
                punteggi: { ...stiliDonna }
            };
        }

        // Funzione per generare l'HTML del risultato
        function generaRisultatoHTML(risultato) {
            const { stileVincente, punteggioMassimo, punteggi } = risultato;

            return `
                <div class="quiz-result">
                    <h2>Il tuo stile è: ${stileVincente}</h2>
                    <div class="style-description">
                        ${getStyleDescription(stileVincente)}
                    </div>
                    <div class="style-scores">
                        <h3>Punteggi per ogni stile:</h3>
                        ${Object.entries(punteggi)
                            .map(([stile, punteggio]) => `
                                <div class="style-score">
                                    <span>${stile}:</span>
                                    <div class="score-bar">
                                        <div class="score-fill" style="width: ${(punteggio / punteggioMassimo) * 100}%"></div>
                                    </div>
                                    <span>${punteggio}</span>
                                </div>
                            `).join('')}
                    </div>
                </div>
            `;
        }



    });