document.querySelector('.quiz-button').addEventListener('click', function() {
    document.querySelector('.quiz-container').classList.add('visible');
});

// Opzionale: chiudi il quiz cliccando fuori dalla finestra
document.querySelector('.quiz-container').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('visible');
    }
});