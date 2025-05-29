document.addEventListener('DOMContentLoaded', () => {
    window.menuButton = document.querySelector('.bottone');
    window.menuTendina = document.querySelector('.menu-tendina');
    window.homeLink = document.getElementById('home-link');
    window.resetLink = document.getElementById('reset-link');
    window.camerinoLink = document.getElementById('camerino-link');

    // solo se il menu a tendina ed i bottoni esistono nella pagina 
    if (window.menuButton && window.menuTendina) {
        window.menuButton.addEventListener('click', function (e) {
            e.preventDefault(); // evita comportamenti di default
            e.stopPropagation(); // impedisce che il click si propaghi al documento

            // mostra il menu attuale
            window.menuTendina.classList.toggle('visible');
        });

        // per chiudere il menu se si clicca fuori
        document.addEventListener('click', function (e) {
            setTimeout(() => {
                if (!window.menuButton.contains(e.target) && !window.menuTendina.contains(e.target)) {
                    window.menuTendina.classList.remove('visible');
                }
            }, 10); // ritardo per evitare conflitto con apertura
        });

        // per il touch del telefono
        document.addEventListener('touchstart', function (e) {
            if (!window.menuButton.contains(e.target) && !window.menuTendina.contains(e.target)) {
                window.menuTendina.classList.remove('visible');
            }
        });
    }

    // event listener dei link del menu tendina
    if (window.resetLink) {
        window.resetLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof handleLogout === 'function') { // se esiste una funzione chiamata handleLogout
                handleLogout();
            } else {
                console.warn('handleLogout non definita');
            }
        });
    }

    if (window.homeLink) {
        window.homeLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof handleBackToHome === 'function') {
                handleBackToHome();
            } else {
                console.warn('handleBackToHome non definita');
            }
        });
    }

    // reindirizza a camerino.html
    if (window.camerinoLink) {
        window.camerinoLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'camerino.html';
        });
    }
});
