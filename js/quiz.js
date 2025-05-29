document.addEventListener('DOMContentLoaded', function () {    
    const quizContainer = document.querySelector('.quiz-container');
    const quizWindow = document.querySelector('.quiz-window');
    const closeButton = document.querySelector('.quiz-close-button');
    const questionElement = document.querySelector('.quiz-domanda');
    const navigationElement = document.querySelector('.quiz-navigation');
    const progressElement = document.querySelector('.quiz-progress');
    const prevButton = document.querySelector('.quiz-prev');
    const nextButton = document.querySelector('.quiz-next');
    const submitButton = document.querySelector('.quiz-submit');

    let currentSondaggio = [...window.sondaggioIniziale];
    let currentQuestion = 0;
    let answers = {};

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Close button clicked'); // Debug
            quizContainer.classList.remove('visible');
            quizWindow.classList.remove('visible');
        });
    }
    
    progressElement.style.display = 'block';

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
                
                    // Salva anche in modo esplicito il genere
                    answers["genere"] = answers[0].toLowerCase(); // diventa "uomo" o "donna"
                
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
        risultato.genere = answers["genere"];
    
        // Salva nel database
        fetch("php/save_style.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "stile=" + encodeURIComponent(risultato.stileVincente),
        })
        .then(response => response.text())
        .then(data => {
            console.log("Risposta dal server:", data);
        })
        .catch(error => {
            console.error("Errore nella fetch POST:", error);
        });
    
        // Mostra il risultato del quiz
        const resultContent = `
            <div class="quiz-result">
                <h2>Il tuo stile è: ${risultato.stileVincente}</h2>
                <div class="style-description">
                    ${getStyleDescription(risultato.stileVincente)}
                </div>
                <div class="style-scores">
                    <h3>Punteggi per ogni stile:</h3>
                    ${Object.entries(risultato.punteggi).map(([stile, punteggio]) => {
                        const percentuale = ((punteggio / 10.1) * 100).toFixed(2);
                        return `
                            <div class="style-score">
                                <span>${stile}:</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: ${percentuale}%"></div>
                                </div>
                                <span>${percentuale}%</span>
                            </div>`;
                    }).join('')}
                </div>
                <button id="scopriStileButton" class="scopri-stile-button">Scopri il tuo stile</button>
            </div>
        `;
    
        if (questionElement) {
            questionElement.innerHTML = resultContent;
            progressElement.style.display = 'none';
    
            setTimeout(() => {
                const scopriBtn = document.getElementById('scopriStileButton');
                scopriBtn?.addEventListener('click', () => {
                    const stile = risultato.stileVincente;
                    const isDonna = risultato.genere === "donna";

                    // Chiudi il quiz
                    quizContainer.classList.remove('visible');
                    quizWindow.classList.remove('visible');

                    // Nascondi tutti gli stili
                    document.querySelectorAll('.stile-container').forEach(el => {
                        el.style.display = 'none';
                    });

                    // Calcola l'id del container da mostrare
                    let targetId = stile === "sporty"
                        ? (isDonna ? `stile-sportyWomen` : `stile-sportyMen`)
                        : `stile-${stile}`;

                    const target = document.getElementById(targetId);
                    const areaRisultati = document.querySelector('.area-risultati');

                    areaRisultati.classList.add('visible');

                    target.style.display = 'block';

                    target.offsetHeight;

                    setTimeout(() => {
                        target.scrollIntoView();
                    }, 100);
                });

            }, 0);
        }
    
        // Nascondi navigazione
        if (navigationElement) {
            navigationElement.style.display = 'none';
        }

    }

    // Event listener per il pulsante del quiz
    // if (quizButton) {
    //     quizButton.addEventListener('click', function() {
    //         currentSondaggio = [...sondaggioIniziale];
    //         currentQuestion = 0;
    //         answers = {};
    //         // Mostra la barra di navigazione
    //     if (navigationElement) {
    //         navigationElement.style.display = 'flex';
    //     }

    //     progressElement.style.display = "block";
        
    //     // Mostra il quiz
    //     showQuestion(currentQuestion);
    //     quizContainer.classList.add('visible');
    //     quizWindow.classList.add('visible');
    //     });
    // }

    // Event listener per il pulsante precedente
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
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            if (validateCurrentQuestion()) {
                saveAnswer(currentQuestion);
                submitQuiz();
                navigationElement.style.display = 'none';
            }
        });
    }


    fetch("php/save_style.php", {
        method: "GET",
        credentials: "include"
    })
    .then((response) => response.json())
    .then((data) => {
        const stile = data.stile;
        if (stile) {
            document.querySelectorAll('.stile-container').forEach(el => {
                el.style.display = 'none';
            });
    
            const target = document.getElementById('stile-' + stile);
            if (target) {
                target.style.display = 'block';
            }
        }
    })
    .catch((error) => {
        console.error("Errore nella fetch GET:", error);
    });
    
    window.quizContainer = quizContainer;
    window.quizWindow = quizWindow;
    window.navigationElement = navigationElement;
    window.progressElement = progressElement;
    window.currentSondaggio = currentSondaggio;
    window.currentQuestion = currentQuestion;
    window.answers = answers;
    window.showQuestion = showQuestion;
    window.loginPanel = document.querySelector('.login-panel');

});
