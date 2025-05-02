// Inizializza gli event listener quando il documento è caricato
document.addEventListener('DOMContentLoaded', function() {
    const loginPanel = document.querySelector('.login-panel');
    const quizButton = document.querySelector('.quiz-button');
    const quizContainer = document.querySelector('.quiz-container');
    const quizWindow = document.querySelector('.quiz-window');
    const quizButtonActive = document.querySelector('.quiz-button.active');
    const closeButton = document.querySelector('.quiz-close-button');
    const v = localhost + /api/random-items;

    //event listener per il pulsante di chiusura
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Close button clicked'); // Debug
            quizContainer.classList.remove('visible');
            quizWindow.classList.remove('visible');
        });
    }

    const questions = [
        {
            domanda: "Sei un uomo o una donna?",
            tipo: "select",
            opzioni: ["Uomo", "Donna"]
        },
        {
            domanda: "Quanti anni hai?",
            tipo: "number",
            placeholder: "Inserisci la tua età"
        },
        {
            domanda: "Quale tra queste parole ti descrive meglio?",
            tipo: "select",
            opzioni: ["Creativo", "Minimalista", "Elegante", "Sportivo"]
        },
        {
            domanda: "Quanto ti piace sperimentare con il tuo stile?",
            tipo: "select",
            opzioni: ["Per niente", "Poco", "Abbastanza", "Molto", "Moltissimo"]
        },
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
        {
            domanda: "Che tipo di gioielli preferisci?",
            tipo: "select",
            opzioni: ["Oro", "Argento", "Entrambi", "Nessuno"],
            immagini: {
                "Oro": "gioielli/oro.png",
                "Argento": "gioielli/argento.png"
            }
        },
        {
            domanda: "Quale di queste occasioni vivi più spesso?",
            tipo: "select",
            opzioni: ["Università / Lavoro", "Aperitivi / Eventi", "Viaggi e weekend", "Serate fuori"]
        },
        {
            domanda: "Quale tra questi brand o negozi senti più vicino al tuo stile?",
            tipo: "select",
            opzioni: ["Zara", "H&M", "Stradivarius", "DoppelGanger", "Nike", "Other"]
        },
        {
            domanda: "Quanto tempo dedichi a scegliere il tuo outfit",
            tipo: "select",
            opzioni: ["Pochi minuti", "Ci penso un po'", "Lo preparo il giorno prima", "Cambio idea mille volte"]
        },
        {
            domanda: "Qual è il tuo stile di vita?",
            tipo: "select",
            opzioni: ["Sportivo", "Elegante", "Minimalista", "Creativo"]
        }
    ];

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
        {
            domanda: "Qual è il tuo stile preferito?",
            tipo: "select",
            opzioni: ["Classico", "Sportivo", "Casual", "Elegante", "Streetwear"]
        },
        {
            domanda: "Quali accessori preferisci?",
            tipo: "select",
            opzioni: ["Orologi", "Cinture", "Cravatte", "Borse", "Nessuno"]
        },
        {
            domanda: "Quanto ti piace sperimentare con il tuo stile?",
            tipo: "select",
            opzioni: ["Per niente", "Poco", "Abbastanza", "Molto", "Moltissimo"]
        },
        {
            domanda: "Quali colori preferisci indossare?",
            tipo: "select",
            opzioni: ["Neutrali(nero, bianco, grigio)", "Scuri(nero, blu, marrone)", "Vivaci(verde, giallo, fucsia)", "Pastello", "Colorati"]
        },
        {
            domanda: "Quale tra questi brand o negozi senti più vicino al tuo stile?",
            tipo: "select",
            opzioni: ["Zara", "H&M", "Uniqlo", "DoppleGanger", "Other"]
        }
    ];

    //Sondaggio donna
    const sondaggioDonna = [
        {
            domanda: "Quale tra queste parole ti descrive meglio?",
            tipo: "select",
            opzioni: ["Creativo", "Minimalista", "Elegante", "Sportivo"]
        },
        {
            domanda: "Quanto ti piace sperimentare con il tuo stile?",
            tipo: "select",
            opzioni: ["Per niente", "Poco", "Abbastanza", "Molto", "Moltissimo"]
        },
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
        {
            domanda: "Che tipo di gioielli preferisci?",
            tipo: "select",
            opzioni: ["Oro", "Argento", "Entrambi", "Nessuno"],
            immagini: {
                "Oro": "gioielli/oro.png",
                "Argento": "gioielli/argento.png"
            }
        },
        {
            domanda: "Quale di queste occasioni vivi più spesso?",
            tipo: "select",
            opzioni: ["Università / Lavoro", "Aperitivi / Eventi", "Viaggi e weekend", "Serate fuori"]
        },
        {
            domanda: "Quale tra questi brand o negozi senti più vicino al tuo stile?",
            tipo: "select",
            opzioni: ["Zara", "H&M", "Stradivarius", "DoppelGanger", "Nike", "Other"]
        },
        {
            domanda: "Quanto tempo dedichi a scegliere il tuo outfit",
            tipo: "select",
            opzioni: ["Pochi minuti", "Ci penso un po'", "Lo preparo il giorno prima", "Cambio idea mille volte"]
        },
        {
            domanda: "Quando scegli un outfit, cosa consideri più importante?",
            tipo: "select",
            opzioni: ["Essere comoda", "Sentirmi alla moda", "Esprimere la mia personalità", "Vestirmi in modo curato e ordinato"]
        },
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
                    
                    const isShoeQuestion = question.domanda.includes("scarpe");
                    const isJewelryQuestion = question.domanda.includes("gioielli");
                    
                    html += `
                        <label class="color-option ${!imgSrc ? 'text-only' : ''} ${isJewelryQuestion && imgSrc ? 'jewelry-option' : ''} ${isShoeQuestion ? 'shoe-option' : ''}">
                            <input type="checkbox" class="quiz-checkbox" 
                                name="question-${index}" value="${opzione}" ${isChecked ? 'checked' : ''}>
                            <div class="color-option-content">
                                ${imgSrc ? `
                                    <img src="${imgSrc}" alt="${opzione}" 
                                        class="color-img ${isShoeQuestion ? 'shoe-img' : ''} ${isJewelryQuestion ? 'jewelry-img' : ''}">
                                ` : ''}
                                ${!isShoeQuestion ? `<span class="color-option-text">${opzione}</span>` : ''}
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

        // Aggiungi event listener per i checkbox e radio
        const checkboxes = questionElement.querySelectorAll('input[type="checkbox"]');
        const radios = questionElement.querySelectorAll('input[type="radio"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                saveAnswer(index);
            });
        });
        
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
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
    async function submitQuiz() { // Make the function async
        console.log('Risposte da inviare:', answers);

        // Send answers to the server
        try {
            const response = await fetch('http://localhost:3001/api/random-quiz', { // Assuming server runs on port 3001
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers), // Send the answers object
            });

            if (!response.ok) {
                // Handle server errors (e.g., 4xx, 5xx)
                const errorData = await response.json();
                console.error('Errore dal server:', response.status, errorData.message);
                alert(`Errore nell'invio delle risposte: ${errorData.message || response.statusText}`);
                // Optionally, keep the quiz open or provide feedback
                return; // Stop execution if server returned an error
            }

            const result = await response.json();
            console.log('Risposta dal server:', result);
            alert('Quiz inviato con successo!'); // Or show a more integrated success message

        } catch (error) {
            // Handle network errors or issues with the fetch itself
            console.error('Errore durante l\'invio del quiz:', error);
            alert('Si è verificato un problema di rete. Riprova più tardi.');
            // Optionally, keep the quiz open or provide feedback
            return; // Stop execution on network error
        }

        // Close the quiz window only after successful submission
        quizContainer.classList.remove('visible');
        quizWindow.classList.remove('visible');
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
});
