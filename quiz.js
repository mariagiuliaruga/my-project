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
                "Neutrali": "coloriNeutrali.png",
                "Scuri": "coloriScuri.png",
                "Vivaci": "coloriVivaci.png",
                "Pastello": "coloriPastello.png",
                "Colorati": "coloriColorati.png",
                "Navy": "coloriNavy.png"
            }
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

    let currentQuestion = 0;
    let answers = {};
    const totalQuestions = questions.length;

    // Funzione per mostrare la domanda corrente
    function showQuestion(index) {
        const questionElement = document.querySelector('.quiz-domanda');
        const question = questions[index];
        
        let html = `<h3>${question.domanda}</h3>`;
        
        if (question.tipo === "select") {
            // Gestione speciale per la domanda sui colori (indice 4)
            if (index === 4 && question.immagini) {
                html += `<div class="color-options-grid">`;
                
                // Genera tutte le opzioni in un unico ciclo
                question.opzioni.forEach(opzione => {
                    const imgSrc = question.immagini[opzione];
                    // Verifica se questa opzione è selezionata (per checkbox multipli)
                    let isChecked = false;
                    if (answers[index]) {
                        isChecked = Array.isArray(answers[index]) 
                            ? answers[index].includes(opzione) 
                            : answers[index] === opzione;
                    }
                    
                    html += `
                        <label class="color-option">
                            <input type="checkbox" class="quiz-checkbox" 
                                name="question-${index}" value="${opzione}" ${isChecked ? 'checked' : ''}>
                            <div class="color-option-content">
                                <img src="${imgSrc}" alt="${opzione}" class="color-img">
                                <span class="color-option-text">${opzione}</span>
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
            progressElement.textContent = `Domanda ${index + 1} di ${totalQuestions}`;
        }

        // Gestisci i pulsanti di navigazione
        const prevButton = document.querySelector('.quiz-prev');
        const nextButton = document.querySelector('.quiz-next');
        const submitButton = document.querySelector('.quiz-submit');

        if (prevButton) {
            prevButton.style.display = index > 0 ? 'inline-block' : 'none';
        }
        if (nextButton) {
            nextButton.style.display = index < totalQuestions - 1 ? 'inline-block' : 'none';
        }
        if (submitButton) {
            submitButton.style.display = index === totalQuestions - 1 ? 'inline-block' : 'none';
        }
    }

    // Funzione per salvare la risposta
    function saveAnswer(index) {
        const question = questions[index];
        const questionElement = document.querySelector('.quiz-domanda');
        
        if (question.tipo === "select") {
            // Caso speciale per la domanda sui colori (indice 4) che usa checkbox
            if (index === 4) {
                const selectedCheckboxes = questionElement.querySelectorAll('input[type="checkbox"]:checked');
                const selectedValues = Array.from(selectedCheckboxes).map(cb => cb.value);
                answers[index] = selectedValues.length > 0 ? selectedValues : null;
            } else {
                // Per le altre domande a scelta singola
                const selectedRadio = questionElement.querySelector('input[type="radio"]:checked');
                answers[index] = selectedRadio ? selectedRadio.value : null;
            }
        } else if (question.tipo === "number") {
            const input = questionElement.querySelector('input[type="number"]');
            answers[index] = input ? input.value : null;
        }
    }

    // Funzione per validare la risposta corrente
    function validateCurrentQuestion() {
        const question = questions[currentQuestion];
        const questionElement = document.querySelector('.quiz-domanda');
        
        if (question.tipo === "select") {
            // Caso speciale per la domanda sui colori (indice 4) che usa checkbox
            if (currentQuestion === 4) {
                const selectedCheckboxes = questionElement.querySelectorAll('input[type="checkbox"]:checked');
                if (selectedCheckboxes.length === 0) {
                    alert('Per favore seleziona almeno un colore');
                    return false;
                }
            } else {
                // Per le altre domande a scelta singola
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
        console.log('Risposte:', answers);
        // Qui puoi aggiungere la logica per inviare le risposte
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