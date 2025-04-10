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
    opzioni: ["Per niente", "Poco", "Abbastanza", "Molto", "Moltissimo", "Tutto", "Non so"],
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

let currentQuestion = 0; //let è per dichiarare una variabile che può essere modificata
let answers = {};


// Funzione per creare e mostrare una singola domanda
function showQuestion(index) {
    if (!quizWindow || index < 0 || index >= sondaggio.length) return;
    
    const domandaStruct = sondaggio[index];

    //creo il codice html direttamente dentro JavaScript dentro la variabile html
    let html = `<div class="quiz-progress">Domanda ${index + 1} di ${sondaggio.length}</div>`;
    html += `<div class="quiz-domanda">
        <h3>${domandaStruct.domanda}</h3>`;
        
    if (domandaStruct.tipo === "select") {
        html += `<div class="quiz-options">`;
        domandaStruct.opzioni.forEach(opzione => { //itera su ogni opzione di risposta
            const isChecked = answers[index] && answers[index].includes(opzione);
            html += `<label class="quiz-option">
                <input type="radio" class="quiz-radio" 
                    name="question-${index}" value="${opzione}" ${isChecked ? 'checked' : ''}>
                <span class="quiz-option-text">${opzione}</span>
            </label>`;
        });
        html += `</div>`;
    } else if (domandaStruct.tipo === "number") {
        html += `<input type="number" class="quiz-input" placeholder="${domandaStruct.placeholder || ''}" 
            value="${answers[index] || ''}" min="1" max="100" title="Inserisci un numero tra 1 e 100" required>`;
    } else {
        html += `<input type="${domandaStruct.tipo}" class="quiz-input" placeholder="${domandaStruct.placeholder || ''}" 
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
    
    html += `<div class="close-button">&times;</div>`;

    quizWindow.innerHTML = html; //inserisce il codice html nel quizWindow
    
    // Aggiungi gli event listener per i radio button
    const radioButtons = quizWindow.querySelectorAll('.quiz-radio');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            // Inizializza l'array delle risposte se non esiste
            if (!answers[index]) {
                answers[index] = [];
            }
            
            // Per i radio button, possiamo avere solo una risposta selezionata
            // Quindi svuotiamo l'array e aggiungiamo solo la risposta selezionata
            answers[index] = [radio.value];
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
            if (domandaStruct.tipo === "select") {
                if (answers[index] && answers[index].length > 0) {
                    showQuestion(index + 1);
                } else {
                    alert('Per favore seleziona una risposta');
                }
            } else if (input && input.checkValidity()) {
                if (domandaStruct.domanda.includes("età") && parseInt(input.value) > 100) {
                    alert('L\'età non può essere maggiore di 100 anni');
                    return;
                }
                answers[index] = input.value;
                showQuestion(index + 1);
            } else {
                alert('Per favore inserisci un numero valido tra 1 e 100');
            }
        });
    }
    
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            if (domandaStruct.tipo === "select") {
                if (answers[index] && answers[index].length > 0) {
                    submitQuiz();
                } else {
                    alert('Per favore seleziona una risposta');
                }
            } else if (input && input.checkValidity()) {
                answers[index] = input.value;
                submitQuiz();
            } else {
                alert('Per favore inserisci un numero valido');
            }
        });
    }

    const closeButton = quizWindow.querySelector('.close-button');
    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        quizContainer.classList.remove('visible');
        quizWindow.classList.remove('visible');
    });
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

});