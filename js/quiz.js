// Inizializza gli event listener quando il documento è caricato
document.addEventListener('DOMContentLoaded', function() {
    const loginPanel = document.querySelector('.login-panel');
    const quizButton = document.querySelector('.quiz-button');
    const quizContainer = document.querySelector('.quiz-container');
    const quizWindow = document.querySelector('.quiz-window');
    const quizButtonActive = document.querySelector('.quiz-button.active');
    const closeButton = document.querySelector('.quiz-close-button');
    const quizResult = document.querySelector('.quiz-result');
    const questionElement = document.querySelector('.quiz-domanda');
    const navigationElement = document.querySelector('.quiz-navigation');
    
    
        //event listener per il pulsante di chiusura
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                console.log('Close button clicked'); // Debug
                quizContainer.classList.remove('visible');
                quizWindow.classList.remove('visible');
            });
        }
    
    
        //Domande iniziali (genere e età)
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
                opzioni: ["Creativo", "Minimalista", "Spontaneo", "Elegante", "Sportivo", "Sofisticato"]
            },
            //domanda 2
            {   
                domanda: "Quanto ti piace sperimentare con il tuo stile?",
                tipo: "select",
                opzioni: ["Per niente", "Poco", "Abbastanza", "Notevolmente", "Molto", "Moltissimo"]
            },
            //domanda 3
            {
                domanda: "Quali colori preferisci indossare?",
                tipo: "select",
                opzioni: ["Neutrali", "Scuri", "Vivaci", "Pastello", "Colorati", "Navy"],
                immagini: {
                    "Neutrali": "media/colori/coloriNeutrali.png",
                    "Scuri": "media/colori/coloriScuri.png",
                    "Vivaci": "media/colori/coloriVivaci.png",
                    "Pastello": "media/colori/coloriPastello.png",
                    "Colorati": "media/colori/coloriColorati.png",
                    "Navy": "media/colori/coloriNavy.png"
                }
            },
            //domanda 4
            {
                domanda: "Quali accessori preferisci?",
                tipo: "select",
                opzioni: ["Orologio", "Cintura", "Cravatta", "Cappello", "Occhiali da sole" ,"Borsello"],
                immagini: {
                    "Orologio": "media/accessori/orologio.png",
                    "Cintura": "media/accessori/cintura.png",
                    "Cravatta": "media/accessori/cravatta.png",
                    "Cappello": "media/accessori/cappello.png",
                    "Occhiali da sole": "media/accessori/occhiali.png",
                    "Borsello": "media/accessori/borsello.png"
    
                }
            },
            //domanda 5
            {
                domanda: "Quale di queste occasioni vivi più spesso?",
                tipo: "select",
                opzioni: ["Università / Lavoro", "Cerimonie", "Aperitivi / Eventi", "Viaggi e weekend", "Palestra", "Discoteca"]
            },
            //domanda 6
            {
                domanda: "Dove trovi ispirazione per i tuoi outfit?",
                tipo: "select",
                opzioni: ["Pinterest", "Instagram", "Video su YouTube/TikTok", "Dalle persone per strada", "Riviste o blog", "Creo da solo"]
            },
            //domanda 7
            {
                domanda: "Come porti i capelli?",
                tipo: "select",
                opzioni: ["Lunghi o taglio scalato", "Corti e/o sfumati", "Ciuffo / Ricci curati", "Pettinati all'indietro", "Taglio spettinato", "Corti o rasati"]
            },
            //domanda 8
            {
                domanda: "Cosa cerchi principalmente nel tuo stile?",
                tipo: "select",
                opzioni: ["Essere comodo", "Sentirmi alla moda", "Esprimere la mia personalità", "Vestirmi in modo curato e ordinato", "La semplicità", "La funzionalità"]
            },
            //domanda 9
            {
                domanda: "Quali tra queste scarpe indosseresti?",
                tipo: "select",
                opzioni: ["Mocassini", "Vans", "Chelsea", "AirForce", "Jordan" ,"Elegante"],
                immagini: {
                    "Mocassini": "media/scarpe/Mocassini.png",
                    "Vans": "media/scarpe/Vans.jpg",
                    "Chelsea": "media/scarpe/Chelsea.png",
                    "AirForce": "media/scarpe/AirForce.png",
                    "Jordan": "media/scarpe/Jordan.png",
                    "Elegante": "media/scarpe/Elegante.png"
                }
            }
        ];
    
        //Sondaggio donna
        const sondaggioDonna = [
            //domanda 1
            {
                domanda: "Quale tra queste parole ti descrive meglio?",
                tipo: "select",
                opzioni: ["Creativa", "Minimalista", "Spontanea", "Elegante","Sportiva", "Sofisticata"]
            },
            //domanda 2
            {
                domanda: "Quanto ti piace sperimentare con il tuo stile?",
                tipo: "select",
                opzioni: ["Per niente", "Poco", "Abbastanza", "Notevolmente", "Molto", "Moltissimo"]
            },
            //domanda 3
            {
                domanda: "Quali colori preferisci indossare?",
                tipo: "select",
                opzioni: ["Neutrali", "Scuri", "Vivaci", "Pastello", "Colorati", "Navy"],
                immagini: {
                    "Neutrali": "media/colori/coloriNeutrali.png",
                    "Scuri": "media/colori/coloriScuri.png",
                    "Vivaci": "media/colori/coloriVivaci.png",
                    "Pastello": "media/colori/coloriPastello.png",
                    "Colorati": "media/colori/coloriColorati.png",
                    "Navy": "media/colori/coloriNavy.png"
                }
            },
            //domanda 4
            {
                domanda: "Che tipo di gioielli preferisci?",
                tipo: "select",
                opzioni: ["Oro", "Argento", "Oro e Argento", "Fatti a mano", "Bigiotteria", "Nessuno"],
                immagini: {
                    "Oro": "media/gioielli/oro.jpeg",
                    "Argento": "media/gioielli/argento.jpeg",
                    "Oro e Argento": "media/gioielli/mix.jpeg",
                    "Fatti a mano": "media/gioielli/artigianali.jpeg",
                    "Bigiotteria": "media/gioielli/bigiotteria.jpeg",
                    "Nessuno": "media/gioielli/senzaGioielli.jpeg"
                }
            },
            //domanda 5
            {
                domanda: "Quale di queste occasioni vivi più spesso?",
                tipo: "select",
                opzioni: ["Università / Lavoro", "Cerimonie", "Aperitivi / Eventi", "Viaggi e weekend", "Palestra", "Discoteca"]
            },
            //domanda 6
            {
                domanda: "Dove trovi ispirazione per i tuoi outfit?",
                tipo: "select",
                opzioni: ["Pinterest", "Instagram", "Video su YouTube/TikTok", "Dalle persone per strada", "Riviste o blog", "Creo da sola"]
            },
            //domanda 7
            {
                domanda: "Quanto tempo dedichi a scegliere il tuo outfit",
                tipo: "select",
                opzioni: ["Pochi minuti", "Ci penso un po'", "Lo preparo il giorno prima", "Cambio idea mille volte", "Lo preparo settimane prima", "Non ci penso mai"]
            },
            //domanda 8
            {
                domanda: "Quando scegli un outfit, cosa consideri più importante?",
                tipo: "select",
                opzioni: ["Essere comoda", "Sentirmi alla moda", "Esprimere la mia personalità", "Vestirmi in modo curato e ordinato", "La semplicità", "Essere differente"]
            },
            //domanda 9
            {
                domanda: "Quali tra queste scarpe indosseresti?",
                tipo: "select",
                opzioni: ["Ballerine", "Birkenstock", "UGGS", "Converse", "Samba", "Stivali"],
                immagini: {
                    "Ballerine": "media/scarpe/Ballerina.png",
                    "Birkenstock": "media/scarpe/Birkenstock.png",
                    "UGGS": "media/scarpe/UGGS.png",
                    "Converse": "media/scarpe/Converse.png",
                    "Samba": "media/scarpe/Samba.png",
                    "Stivali": "media/scarpe/Stivali.png"
                }
            }
        ];
    
    
        let currentQuestion = 0;
        let answers = {};
        let currentSondaggio = [...sondaggioIniziale, ...sondaggioDonna];
    
        // Funzione per mostrare la domanda corrente
        function showQuestion(index) {
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
                    showAlert('Inserisci un\'età valida tra 1 e 100 anni!');
                    return false;
                }
            }
            
            return true;
        }
    
        // Funzione per inviare il quiz
        function submitQuiz() {
            saveAnswer(currentQuestion);
            console.log('Tutte le risposte:', answers);
        
            const risultato = calcolaStile(answers);
            console.log('Risultato calcolo:', risultato);
        
            const resultContent = `
            <div class="quiz-result">
                <h2>Il tuo stile è: ${risultato.stileVincente}</h2>
                <div class="style-description">
                    ${getStyleDescription(risultato.stileVincente)}
                </div>
                <div class="style-scores">                    <h3>Punteggi per ogni stile:</h3>
                    ${Object.entries(risultato.punteggi).map(([stile, punteggio]) => {
                        const percentuale = ((punteggio / 10.1) * 100).toFixed(2);
                        return `
                            <div class="style-score">
                                <span>${stile}:</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: ${percentuale}%"></div>
                                </div>
                                <span>${percentuale}%</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <button id="scopriStileButton" class="scopri-stile-button">Scopri il tuo stile</button>
            </div>
        `;
        
            if (questionElement) {
                questionElement.innerHTML = resultContent;
        
                // Attiva pulsante "Scopri il tuo stile"
                setTimeout(() => {
                    const scopriBtn = document.getElementById('scopriStileButton');
                    scopriBtn?.addEventListener('click', () => {
                        const stile = risultato.stileVincente;
        
                        // Chiudi il quiz
                        quizContainer.classList.remove('visible');
                        quizWindow.classList.remove('visible');
        
                        // Nascondi tutti i risultati
                        document.querySelectorAll('.stile-container').forEach(el => {
                            el.style.display = 'none';
                        });
        
                        // Mostra solo quello giusto
                        const target = document.getElementById('stile-' + stile);
                        if (target) {
                            target.style.display = 'block';
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
        
                        // Mostra sezione risultati
                        const areaRisultati = document.querySelector('.area-risultati');
                        if (areaRisultati) {
                            areaRisultati.classList.add('visible');
                        }
                    });
                }, 0);
            }
        
            // Nascondi i pulsanti navigazione
            if (quizResult) {
                navigationElement.style.display = 'none';
            }
        
            quizContainer.classList.add('visible');
            quizWindow.classList.add('visible');
        
            const closeButton = document.createElement('button');
            closeButton.className = 'quiz-close-button';
            closeButton.innerHTML = '×';
            closeButton.onclick = function () {
                quizContainer.classList.remove('visible');
                quizWindow.classList.remove('visible');
            };
            quizWindow.appendChild(closeButton);
        }
        
    
        // Funzione per ottenere la descrizione dello stile
        function getStyleDescription(stile) {
            const descrizioni = {
                bohoChic: "Sei una persona creativa e libera, che ama esprimersi attraverso uno stile unico e artistico. Il tuo look è caratterizzato da colori vivaci, texture naturali e accessori originali.",
                sporty: "Energia e dinamicità si riflettono nel tuo modo di vestire. Adori lo stile athleisure, fatto di tute, sneakers di tendenza, cappellini e loghi sportivi. Che tu stia andando in palestra o al bar con gli amici, il tuo look comunica sempre movimento, forza e praticità.",
                messy: "Sei una persona spontanea e anticonformista. Il tuo stile è unico e personale, che combina elementi diversi in modo creativo e originale.",
                preppy: "Hai uno stile curato e raffinato, che riflette la tua attenzione ai dettagli. Il tuo look è caratterizzato da linee pulite e colori classici.",
                quietLuxury: "Sei una persona sofisticata che apprezza la qualità e l'eleganza discreta. Il tuo stile è caratterizzato da capi di alta qualità e design minimalista.",
                scandi: "Hai uno stile minimalista e funzionale, influenzato dal design scandinavo. Il tuo look è caratterizzato da linee pulite, colori neutri e un'estetica moderna.",
                
                vintage: "Hai l’anima di un collezionista e il gusto per il passato. Il tuo stile pesca a piene mani dagli anni ‘70, ‘80 e ‘90, con giacche retrò, camicie a stampa, jeans sbiaditi e accessori d’epoca. Ogni tuo outfit racconta una storia e dimostra un occhio attento alla moda senza tempo.",
                eBoy: "Nero, catene, eyeliner e un tocco di mistero: sei l’anima ribelle e digitale della moda. Il tuo stile è influenzato dalla cultura internet, dallo skate e dalla musica alternativa. Ti piace sperimentare e giocare con i contrasti, tra oversize e dettagli punk, creando un look unico e d’impatto.",
                casual: "Eleganza sobria, fascino senza tempo. Il tuo stile richiama l’estetica dei college americani, con capi classici come blazer, camicie, pantaloni chino e mocassini. Ami la qualità e la discrezione: sembri uscito da una rivista vintage di alta classe, senza mai risultare ostentato.",
                oldMoney: "Il tuo stile parla di classe e discrezione. Prediligi capi eleganti ma mai appariscenti: blazer ben tagliati, pantaloni sartoriali, camicie impeccabili e maglioni in tessuti pregiati. I colori sono neutri, i materiali di qualità. Hai un’eleganza innata che non ha bisogno di loghi o eccessi per farsi notare: bastano la cura dei dettagli e la sicurezza nei tuoi gesti.",
                street: "Urban vibes e tanta personalità. Ami lo stile streetwear fatto di felpe oversize, pantaloni cargo, cappellini e sneakers limited edition. Prendi ispirazione dai trend delle metropoli e ti piace distinguerti con dettagli audaci e pezzi statement.",


            };
            return descrizioni[stile] || "Nessuna descrizione disponibile per questo stile.";
        }
    
        // Event listener per il pulsante del quiz
        if (quizButton) {
            quizButton.addEventListener('click', function() {
                currentSondaggio = [...sondaggioIniziale];
                currentQuestion = 0;
                answers = {};
                // Mostra la barra di navigazione
            if (navigationElement) {
                navigationElement.style.display = 'flex';
            }
            
            // Mostra il quiz
            showQuestion(currentQuestion);
            quizContainer.classList.add('visible');
            quizWindow.classList.add('visible');
            quizResult.style.display = 'none';
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
                    navigationElement.style.display = 'none';
                }
            });
        }

        //Oggetto per tenere traccia dei punteggi degli stili donna
        const stiliDonna = {
            bohoChic: 0,
            sporty: 0,
            messy: 0,
            preppy: 0,
            quietLuxury: 0,
            scandi: 0
        };

        // Mappa delle risposte agli stili delle donne
        const mappaStiliDonna = {
            // Domanda 1: "Quanto ti piace sperimentare con il tuo stile?"
            "Creativa": "bohoChic",
            "Minimalista": "scandi",
            "Spontanea": "messy",
            "Elegante": "quietLuxury",
            "Sportiva": "sporty",
            "Sofisticata": "preppy",

            // Domanda 2: Quanto ti piace sperimentare con il tuo stile?
            "Per niente": "quietLuxury",
            "Poco": "scandi",
            "Abbastanza": "sporty",
            "Notevolmente": "messy",
            "Molto": "preppy",
            "Moltissimo": "bohoChic",

            // Domanda 3: Quali colori preferisci indossare?
            "Neutrali": "bohoChic",
            "Scuri": "quietLuxury",
            "Vivaci": "messy",
            "Pastello": "preppy",
            "Colorati": "sporty",
            "Navy": "scandi",

            // Domanda 4: Che tipo di gioielli preferisci?
            "Oro": "quietLuxury",
            "Argento": "bohoChic",
            "Oro e Argento": "preppy",
            "Fatti a mano": "messy",
            "Bigiotteria": "scandi",
            "Nessuno": "sporty",

            // Domanda 5: Quale di queste occasioni vivi più spesso?
            "Università / Lavoro": "preppy",
            "Cerimonie": "quietLuxury",
            "Aperitivi / Eventi": "bohoChic",
            "Viaggi e weekend": "scandi",
            "Palestra": "sporty",
            "Discoteca": "messy",

            // Domanda 6: Dove trovi ispirazione per i tuoi outfit?
            "Pinterest": "scandi",
            "Instagram": "preppy",
            "Video su YouTube/TikTok": "bohoChic",
            "Dalle persone per strada": "sporty",
            "Riviste o blog": "quietLuxury",
            "Creo da sola": "messy",

            // Domanda 7: Quanto tempo dedichi a scegliere il tuo outfit
            "Pochi minuti": "sporty",
            "Ci penso un po'": "scandi",
            "Lo preparo il giorno prima": "preppy",
            "Cambio idea mille volte": "bohoChic",
            "Lo preparo settimane prima": "quietLuxury",
            "Non ci penso mai": "messy",

            // Domanda 8: Quando scegli un outfit, cosa consideri più importante?
            "Essere comoda": "sporty",
            "Sentirmi alla moda": "preppy",
            "Esprimere la mia personalità": "bohoChic",
            "Vestirmi in modo curato e ordinato": "quietLuxury",
            "La semplicità": "scandi",
            "Essere differente": "messy",

            // Domanda 9: Quali tra queste scarpe indosseresti?
            "Ballerine": "bohoChic",
            "Birkenstock": "messy",
            "UGGS": "scandi",
            "Converse": "sporty",
            "Samba": "preppy",
            "Stivali": "quietLuxury"
        };

        
        // Oggetto per tenere traccia dei punteggi degli stili uomo
        const stiliUomo = {
            casual: 0,
            eBoy: 0,
            oldMoney: 0,
            sporty: 0,
            street: 0,
            vintage: 0
        };

        // Mappa delle risposte agli stili degli uomini
        const mappaStiliUomo = {
            // Domanda 1: "Quale tra queste parole ti descrive meglio?"
            "Creativo": "eBoy",
            "Minimalista": "casual",
            "Spontaneo": "street",
            "Elegante": "oldMoney",
            "Sportivo": "sporty",
            "Sofisticato": "vintage",

            // Domanda 2: Quanto ti piace sperimentare con il tuo stile?
            "Per niente": "casual",
            "Poco": "oldMoney",
            "Abbastanza": "sporty",
            "Notevolmente": "street",
            "Molto": "eBoy",
            "Moltissimo": "vintage",

            // Domanda 3: Quali colori preferisci indossare?
            "Neutrali": "vintage",
            "Scuri": "eBoy",
            "Vivaci": "casual",
            "Pastello": "oldMoney",
            "Colorati": "sporty",
            "Navy": "street",

            // Domanda 4: Quali accessori preferisci?
            "Orologio": "vintage",
            "Cintura": "eBoy",
            "Cravatta": "oldMoney",
            "Cappello": "street",
            "Occhiali da sole": "casual",
            "Borsello": "sporty",

            // Domanda 5: Quale di queste occasioni vivi più spesso?
            "Università / Lavoro": "casual",
            "Cerimonie": "oldMoney",
            "Aperitivi / Eventi": "vintage",
            "Viaggi e weekend": "street",
            "Palestra": "sporty",
            "Discoteca": "eBoy",

            // Domanda 6: Dove trovi ispirazione per i tuoi outfit?
            "Pinterest": "eBoy",
            "Instagram": "casual",
            "Video su YouTube/TikTok": "street",
            "Dalle persone per strada": "sporty",
            "Riviste o blog": "oldMoney",
            "Creo da solo": "vintage",

            // Domanda 7: Come porti i capelli?
            "Lunghi o taglio scalato": "vintage",
            "Corti e/o sfumati": "street",
            "Ciuffo / Ricci curati": "casual",
            "Pettinati all'indietro": "oldMoney",
            "Taglio spettinato": "eBoy",
            "Corti o rasati": "sporty",

            // Domanda 8: Cosa cerchi principalmente nel tuo stile?
            "Essere comodo": "sporty",
            "Sentirmi alla moda": "street",
            "Esprimere la mia personalità": "eBoy",
            "Vestirmi in modo curato e ordinato": "oldMoney",
            "La semplicità": "casual",
            "La funzionalità": "vintage",

            // Domanda 9: Quali tra queste scarpe indosseresti?
            "Mocassini": "vintage",
            "Vans": "eBoy",
            "Chelsea": "casual",
            "AirForce": "sporty",
            "Jordan": "street",
            "Elegante": "oldMoney"
        };
        

        const pesiDomande = {
            2: 1.6,   // Domanda 1 (indice 2)
            9: 1.5   // Domanda 8 (indice 9)
        };
        
        // Funzione per calcolare lo stile
        function calcolaStile(answers) {
            console.log('Risposte ricevute:', answers);
            
            // Trova il genere dalla prima domanda (indice 0)
            const genere = answers["0"];
            console.log('Genere selezionato:', genere);

            // Resetta i punteggi
            Object.keys(stiliDonna).forEach(stile => {
                stiliDonna[stile] = 0;
            });
            Object.keys(stiliUomo).forEach(stile => {
                stiliUomo[stile] = 0;
            });

            console.log('Punteggi resettati - Donna:', stiliDonna);
            console.log('Punteggi resettati - Uomo:', stiliUomo);

            // Calcola i punteggi per ogni stile
            Object.entries(answers).forEach(([questionIndex, answer]) => {
                // Salta le prime due domande (genere ed età)
                if (parseInt(questionIndex) <= 1) return;

                console.log(`Processando risposta ${questionIndex}:`, answer);

                const peso = pesiDomande[questionIndex] || 1;

                if (genere === "Uomo" && mappaStiliUomo[answer]) {
                    const stile = mappaStiliUomo[answer];
                    stiliUomo[stile] += peso;
                    console.log(`Aggiunti ${peso} punti per stile ${stile} (Uomo)`);
                } else if (genere === "Donna" && mappaStiliDonna[answer]) {
                    const stile = mappaStiliDonna[answer];
                    stiliDonna[stile] += peso;
                    console.log(`Aggiunti ${peso} punti per stile ${stile} (Donna)`);
                }

            });

            console.log('Punteggi finali - Donna:', stiliDonna);
            console.log('Punteggi finali - Uomo:', stiliUomo);

            // Trova lo stile con il punteggio più alto
            let stileVincente = '';
            let punteggioMassimo = -1;
            const stiliCorrenti = genere === "Uomo" ? stiliUomo : stiliDonna;

            Object.entries(stiliCorrenti).forEach(([stile, punteggio]) => {
                if (punteggio > punteggioMassimo) {
                    punteggioMassimo = punteggio;
                    stileVincente = stile;
                }
            });

            console.log('Stile vincente:', stileVincente);
            console.log('Punteggio massimo:', punteggioMassimo);

            fetch('php/save_style.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'stile=' + encodeURIComponent(stileVincente),
            });

            return {
                stileVincente,
                punteggioMassimo,
                punteggi: { ...stiliCorrenti }
            };

        }

        const risultato = calcolaStile(answers);

        fetch("php/save_style.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "stile=" + encodeURIComponent(risultato.stileVincente),
        })
        .then((response) => response.text())
        .then((data) => {
            console.log("Risposta dal server:", data);
        })
        .catch((error) => {
            console.error("Errore nella fetch:", error);
        });

    });