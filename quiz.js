const loginPanel = document.querySelector('.login-panel');
const quizButton = document.querySelector('.quiz-button');
const quizContainer = document.querySelector('.quiz-container');
const quizWindow = document.querySelector('.quiz-window');
const quizButtonActive = document.querySelector('.quiz-button.active');

const sondaggio = [{
    domanda: "Sei un uomo o una donna?",
    tipo: "select",
    opzioni: ["Uomo", "Donna"],
},
{
    domanda: "Quanti anni hai?",
    tipo: "number",
    placeholder: "Inserisci la tua età"
},
{
    domanda: "Quale tra queste parole ti descrive meglio?",
    tipo: "select",
    opzioni: ["Creativo", "Minimalista", "Elegante", "Sportivo"],
},
{
    domanda: "Quanto ti piace sperimentare con il tuo stile?",
    tipo: "select",
    opzioni: ["Per niente", "Poco", "Abbastanza", "Molto", "Moltissimo"],
},
{
    domanda: "Quali colori preferisci indossare?",
    tipo: "select",
    opzioni: ["Neutrali(nero, bianco, grigio)", "Scuri(nero, blu, marrone)", "Vivaci(verde, giallo, fucsia)","Pastello","Colorati"],
},
{
    domanda: "Quale tra questi brand o negozi senti più vicino al tuo stile?",
    tipo: "select",
    opzioni: ["Zara", "H&M", "Uniqlo", "DoppleGanger", "Other"],
},
{
    domanda: "Quanto tempo dedichi a scegliere il tuo outfit",
    tipo: "select",
    opzioni: ["Pochi minuti", "Ci penso un po'", "Lo preparo il giorno prima", "Cambio idea mille volte"],
},
{
    domanda: "Qual è il tuo stile di vita?",
    tipo: "select",
    opzioni: ["Sportivo", "Elegante", "Minimalista", "Creativo"],
},

]

let currentQuestion = 0;
let answers = {};

// Aggiungi gli stili CSS
const style = document.createElement('style');
style.textContent = `
    .quiz-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
        z-index: 1000;
    }

    .quiz-container.visible {
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    }

    .quiz-window {
        display: none;
        background:rgb(255, 255, 255);
        padding: 35px;
        border-radius: 20px;
        max-width: 900px;
        width: 90%;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
        height: 70%;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .quiz-window.visible {
        display: block;
        animation: slideIn 0.3s ease;
    }

    .quiz-window::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg,rgb(255, 77, 190),rgb(255, 107, 216),rgb(255, 142, 236));
    }

    .quiz-progress {
        text-align: center;
        margin-bottom: 25px;
        font-size: 14px;
        color:rgb(251, 4, 173);
        font-weight: 500;
        letter-spacing: 1px;
    }

    .quiz-domanda {
        margin-bottom: 30px;
    }

    .quiz-domanda h3 {
        font-size: 22px;
        color:rgb(0, 0, 0);
        margin-bottom: 25px;
        font-weight: 600;
        letter-spacing: 0.5px;
    }

    .quiz-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .quiz-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.05);
    }

    .quiz-option:hover {
        background: rgba(255, 107, 107, 0.1);
        border-color:rgb(255, 77, 190);
        transform: translateX(5px);
    }

    .quiz-checkbox {
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color:rgb(255, 77, 190);
    }

    .quiz-option-text {
        font-size: 16px;
        color:rgb(0, 0, 0);
    }

    .quiz-input {
        width: 100%;
        padding: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        font-size: 16px;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.05);
        color: #ffffff;
    }

    .quiz-input:focus {
        outline: none;
        border-color:rgb(255, 77, 190);
        background: rgba(255, 107, 107, 0.1);
    }

    .quiz-input::placeholder {
        color: black;
    }

    .quiz-navigation {
        display: flex;
        justify-content: space-between;
        margin-top: 35px;
        gap: 15px;
    }

    .quiz-prev, .quiz-next, .quiz-submit {
        padding: 15px 30px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;
        letter-spacing: 1px;
    }

    .quiz-prev {
        background-color: rgb(255, 77, 190);
        color: white;
    }

    .quiz-next, .quiz-submit {
        background-color: rgb(255, 77, 190);
        color: white;
    }

    .quiz-prev:hover {
        background-color: rgb(210, 4, 134);
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgb(255, 77, 190);
    }

    .quiz-next:hover, .quiz-submit:hover {
        background-color: rgb(210, 4, 134);
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgb(255, 77, 190);
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Funzione per creare e mostrare una singola domanda
function showQuestion(index) {
    if (!quizWindow || index < 0 || index >= sondaggio.length) return;
    
    const domanda = sondaggio[index];
    let html = `<div class="quiz-progress">Domanda ${index + 1} di ${sondaggio.length}</div>`;
    html += `<div class="quiz-domanda">
        <h3>${domanda.domanda}</h3>`;
        
    if (domanda.tipo === "select") {
        html += `<div class="quiz-options">`;
        domanda.opzioni.forEach(opzione => {
            const isChecked = answers[index] && answers[index].includes(opzione);
            html += `<label class="quiz-option">
                <input type="checkbox" class="quiz-checkbox" 
                    value="${opzione}" ${isChecked ? 'checked' : ''}>
                <span class="quiz-option-text">${opzione}</span>
            </label>`;
        });
        html += `</div>`;
    } else if (domanda.tipo === "number") {
        html += `<input type="text" class="quiz-input" placeholder="${domanda.placeholder || ''}" 
            value="${answers[index] || ''}" pattern="[1-9][0-9]*" title="Inserisci un numero intero maggiore di 0" required>`;
    } else {
        html += `<input type="${domanda.tipo}" class="quiz-input" placeholder="${domanda.placeholder || ''}" 
            value="${answers[index] || ''}" required>`;
    }
    
    html += `</div>`;
    
    // Aggiungi i pulsanti di navigazione
    html += `<div class="quiz-navigation">`;
    if (index > 0) {
        html += `<button class="quiz-prev">← Precedente</button>`;
    }
    if (index < sondaggio.length - 1) {
        html += `<button class="quiz-next">Successiva →</button>`;
    } else {
        html += `<button class="quiz-submit">Invia Risposte</button>`;
    }
    html += `</div>`;
    
    quizWindow.innerHTML = html;
    
    // Aggiungi gli event listener per le checkbox
    const checkboxes = quizWindow.querySelectorAll('.quiz-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Inizializza l'array delle risposte se non esiste
            if (!answers[index]) {
                answers[index] = [];
            }
            
            if (checkbox.checked) {
                // Aggiungi la risposta se selezionata
                if (!answers[index].includes(checkbox.value)) {
                    answers[index].push(checkbox.value);
                }
            } else {
                // Rimuovi la risposta se deselezionata
                answers[index] = answers[index].filter(value => value !== checkbox.value);
            }
        });
    });
    
    // Aggiungi gli event listener per i pulsanti di navigazione
    const prevButton = quizWindow.querySelector('.quiz-prev');
    const nextButton = quizWindow.querySelector('.quiz-next');
    const submitButton = quizWindow.querySelector('.quiz-submit');
    const input = quizWindow.querySelector('.quiz-input');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            showQuestion(index - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (domanda.tipo === "select") {
                if (answers[index] && answers[index].length > 0) {
                    showQuestion(index + 1);
                } else {
                    alert('Per favore seleziona almeno una risposta');
                }
            } else if (input && input.checkValidity()) {
                answers[index] = input.value;
                showQuestion(index + 1);
            } else {
                alert('Per favore inserisci un numero valido');
            }
        });
    }
    
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            if (domanda.tipo === "select") {
                if (answers[index] && answers[index].length > 0) {
                    submitQuiz();
                } else {
                    alert('Per favore seleziona almeno una risposta');
                }
            } else if (input && input.checkValidity()) {
                answers[index] = input.value;
                submitQuiz();
            } else {
                alert('Per favore inserisci un numero valido');
            }
        });
    }
}

// Funzione per salvare la risposta
function saveAnswer(index) {
    const input = quizWindow.querySelector('.quiz-input');
    if (input) {
        answers[index] = input.value;
    }
}

// Funzione per inviare il quiz
function submitQuiz() {
    console.log('Risposte:', answers);
    // Qui puoi aggiungere la logica per inviare le risposte
    quizContainer.classList.remove('visible');
    quizWindow.classList.remove('visible');
}

quizButton.addEventListener('click', function() {
    loginPanel.classList.toggle('visible');
});

// Inizializza gli event listener quando il documento è caricato
document.addEventListener('DOMContentLoaded', function() {
    // Event listener per il pulsante del quiz
    if (quizButton) {
        quizButton.addEventListener('click', function() {
            currentQuestion = 0;
            answers = {};
            quizContainer.classList.toggle('visible');
            quizWindow.classList.toggle('visible');
            showQuestion(currentQuestion);
        });
    }

    // Event listener per chiudere il quiz cliccando fuori
    if (quizContainer) {
        quizContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('visible');
                quizWindow.classList.remove('visible');
            }
        });
    }
});