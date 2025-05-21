document.addEventListener('DOMContentLoaded', () => {
    // Gestione apertura/chiusura menu
    if (window.menuButton && window.menuTendina) {
        window.menuButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Chiudi eventuali altri menu aperti (se ce ne sono)
            document.querySelectorAll('.menu-tendina').forEach(menu => {
                if (menu !== window.menuTendina) {
                    menu.classList.remove('visible');
                }
            });

            // Toggle del menu attuale
            window.menuTendina.classList.toggle('visible');
        });

        // Chiudi il menu cliccando fuori
        document.addEventListener('click', function (e) {
        setTimeout(() => {
            if (!window.menuButton.contains(e.target) && !window.menuTendina.contains(e.target)) {
                window.menuTendina.classList.remove('visible');
            }
        }, 10); // Piccolo ritardo per evitare conflitto con apertura
        });

        // Per dispositivi touch
        document.addEventListener('touchstart', function (e) {
            if (!window.menuButton.contains(e.target) && !window.menuTendina.contains(e.target)) {
                window.menuTendina.classList.remove('visible');
            }
        });
    }

    // Eventi dei link
    if (window.resetLink) {
        window.resetLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof window.handleLogout === 'function') {
                window.handleLogout();
            } else {
                console.warn('handleLogout non definita');
            }
        });
    }

    if (window.homeLink) {
        window.homeLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof window.handleBackToHome === 'function') {
                window.handleBackToHome();
            } else {
                console.warn('handleBackToHome non definita');
            }
        });
    }

    // Camerino - reindirizza a camerino.html
    if (window.camerinoLink) {
        window.camerinoLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'camerino.html';
        });
    }
});
