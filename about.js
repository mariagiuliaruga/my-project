document.addEventListener('DOMContentLoaded', function() {
    // Elementi della finestra About
    const aboutLink = document.querySelector('#about-link');
    const aboutContainer = document.querySelector('.about-container');
    const aboutOverlay = document.querySelector('.about-overlay');
    const closeButton = document.querySelector('.about-content .close-button');

    // Mostra la finestra About
    function showAbout(e) {
        e.preventDefault();
        aboutContainer.classList.add('visible');
    }

    // Nascondi la finestra About
    function hideAbout() {
        aboutContainer.classList.remove('visible');
    }

    // Gestione del click sul link About
    if (aboutLink) {
        aboutLink.addEventListener('click', showAbout);
    }

    // Gestione del click sul pulsante Chiudi
    if (closeButton) {
        closeButton.addEventListener('click', hideAbout);
    }

    // Chiudi la finestra quando si clicca sull'overlay
    aboutOverlay.addEventListener('click', function() {
        hideAbout();
    });

    // Chiudi la finestra quando si preme ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aboutContainer.classList.contains('visible')) {
            hideAbout();
        }
    });
}); 