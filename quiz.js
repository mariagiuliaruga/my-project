const loginPanel = document.querySelector('.login-panel');
const quizButton = document.querySelector('.quiz-button');
const loginPopup = document.querySelector('.login-popup');
const overlay = document.querySelector('.overlay');
document.querySelector('.quiz-button').addEventListener('click', function() {
    loginPanel.classList.toggle('visible');
    
});


    

    quizButton.addEventListener('click', () => {
        loginPopup.classList.add('visible');
        overlay.classList.add('visible');
    });

    overlay.addEventListener('click', () => {
        loginPopup.classList.remove('visible');
        overlay.classList.remove('visible');
    });


// Opzionale: chiudi il quiz cliccando fuori dalla finestra
document.querySelector('.quiz-container').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('visible');
    }
});