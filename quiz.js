// Inizializza gli event listener quando il documento è caricato
document.addEventListener('DOMContentLoaded', function() {
    const loginPanel = document.querySelector('.login-panel');
    const quizButton = document.querySelector('.quiz-button');
    const quizContainer = document.querySelector('.quiz-container');
    const quizWindow = document.querySelector('.quiz-window');
    const quizButtonActive = document.querySelector('.quiz-button.active');
    const closeButton = document.querySelector('.quiz-close-button');

    // Aggiungi l'event listener per il pulsante di chiusura
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
            opzioni: ["Per niente", "Poco", "Abbastanza", "Molto", "Moltissimo", "Tutto", "Non so"]
        },
        {
            domanda: "Quali colori preferisci indossare?",
            tipo: "select",
            opzioni: ["Neutrali(nero, bianco, grigio)", "Scuri(nero, blu, marrone)", "Vivaci(verde, giallo, fucsia)", "Pastello", "Colorati"],
            colori: {
                "Neutrali(nero, bianco, grigio)": ["#000000", "#FFFFFF", "#888888"],
                "Scuri(nero, blu, marrone)": ["#000000", "#0A2463", "#553939"],
                "Vivaci(verde, giallo, fucsia)": ["#00FF00", "#FFFF00", "#FF00FF"],
                "Pastello": ["#FFB6C1", "#C1FFB6", "#B6C1FF"],
                "Colorati": ["#FF0000", "#00BFFF", "#FFDB58", "#8A2BE2", "#50C878"]
            }
        },
        {
            domanda: "Quale tra questi brand o negozi senti più vicino al tuo stile?",
            tipo: "select",
            opzioni: ["Zara", "H&M", "Uniqlo", "DoppleGanger", "Other"]
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
            html += `<div class="quiz-options">`;
            question.opzioni.forEach(opzione => {
                const isChecked = answers[index] === opzione;
                
                // Aggiungi palette di colori per la domanda 5 (indice 4)
                if (index === 4 && question.colori && question.colori[opzione]) {
                    const coloriHtml = question.colori[opzione].map(colore => 
                        `<span class="color-swatch" style="background-color: ${colore}"></span>`
                    ).join('');
                    
                    html += `
                        <label class="quiz-option">
                            <input type="radio" class="quiz-radio" 
                                name="question-${index}" value="${opzione}" ${isChecked ? 'checked' : ''}>
                            <div class="quiz-option-container">
                                <span class="quiz-option-text">${opzione}</span>
                                <div class="color-palette">${coloriHtml}</div>
                            </div>
                        </label>`;
                } else {
                    html += `
                        <label class="quiz-option">
                            <input type="radio" class="quiz-radio" 
                                name="question-${index}" value="${opzione}" ${isChecked ? 'checked' : ''}>
                            <span class="quiz-option-text">${opzione}</span>
                        </label>`;
                }
            });
            html += `</div>`;
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
            const selectedRadio = questionElement.querySelector('input[type="radio"]:checked');
            answers[index] = selectedRadio ? selectedRadio.value : null;
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
            const selectedRadio = questionElement.querySelector('input[type="radio"]:checked');
            if (!selectedRadio) {
                alert('Per favore seleziona una risposta');
                return false;
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