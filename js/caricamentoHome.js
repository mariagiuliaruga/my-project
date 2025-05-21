document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);    
});

document.querySelector('.explore-link').addEventListener('click', function(e){
    e.preventDefault();

    const targetId = this.getAttribute('data-target');
    const targetContainer = document.getElementById(targetId);

    if(targetContainer){
        targetContainer.classList.add('visible');
    }

    window.scrollTo({ top: 0, behavior: 'smooth'});
});

// funziona solo se scritto in questo punto. serve per far caricare l'area stili dall'alto

//window.funzione la rende globale
window.showAlert = function(message) {
    const alertBox = document.getElementById('alert-box');
    alertBox.textContent = message;
    alertBox.classList.remove('hidden');
    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 3000);
};

window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('newsletterPopup');
    const closeBtn = document.getElementById('closeBtn');

    
    // Chiude il popup al click del bottone
    closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    });
});
