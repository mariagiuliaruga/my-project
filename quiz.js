// Inizializza gli event listener quando il documento è caricato
document.addEventListener('DOMContentLoaded', function() {
    const loginPanel = document.querySelector('.login-panel');
    const quizButton = document.querySelector('.quiz-button');
    const quizContainer = document.querySelector('.quiz-container');
    const quizWindow = document.querySelector('.quiz-window');
    const quizButtonActive = document.querySelector('.quiz-button.active');
    const closeButton = document.querySelector('.close-button');

    // Aggiungi l'event listener per il pulsante di chiusura
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Close button clicked'); // Debug
            quizContainer.style.display = 'none';
            quizWindow.style.display = 'none';
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
            opzioni: ["Neutrali(nero, bianco, grigio)", "Scuri(nero, blu, marrone)", "Vivaci(verde, giallo, fucsia)", "Pastello", "Colorati"]
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
                html += `
                    <label class="quiz-option">
                        <input type="radio" class="quiz-radio" 
                            name="question-${index}" value="${opzione}" ${isChecked ? 'checked' : ''}>
                        <span class="quiz-option-text">${opzione}</span>
                    </label>`;
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
        quizContainer.style.display = 'none';
        quizWindow.style.display = 'none';
    }

    // Event listener per il pulsante del quiz
    if (quizButton) {
        quizButton.addEventListener('click', function() {
            currentQuestion = 0;
            answers = {};
            quizContainer.style.display = 'flex';
            quizWindow.style.display = 'block';
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