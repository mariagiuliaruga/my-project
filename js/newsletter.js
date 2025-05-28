window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('newsletterPopup');
    const closeBtn = document.getElementById('closeBtn');

    // Mostra il popup dopo 8 secondi se non già mostrato in questa sessione
    if (!sessionStorage.getItem('newsletterShown')) {
    setTimeout(() => {
        popup.classList.remove('hidden');
        sessionStorage.setItem('newsletterShown', 'true');
    }, 3000); 
    }     
    // Chiude il popup al click
    closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    });
});