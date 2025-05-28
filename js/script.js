document.addEventListener('DOMContentLoaded', function () {

    window.titolo = document.querySelector('.titolo-link');
    window.quizButton = document.querySelector('.quiz-button');
    window.quizButton.addEventListener('click', handleQuizButtonClick);
    
    window.closeButtons = document.querySelectorAll('.close-button');
    window.registerLink = document.querySelector('.register-link');
    window.loginLink = document.querySelector('.login-link');
    window.profileEditContainer = document.querySelector('.profile-edit-container');
    window.areaPersonale = document.querySelector('.area-personale');
    window.container = document.querySelector('.container');
    window.cancButton = document.querySelector('.cancel-button');
    window.logoutButton = document.querySelector('.logout-button');
    window.exploreLink = document.querySelector('.explore-link');
    window.areaStili = document.querySelector('.area-stili');
   
    window.profileButton = document.querySelector('.profile-button');
    window.forgotPasswordLink = document.querySelector('.forgot-password');
    window.forgotPasswordPanel = document.querySelector('.forgot-password-panel');
    window.areaRisultati = document.querySelector('.area-risultati');
    window.contactFooter = document.querySelector('.contact-footer');
    
    window.sezioneImmagini = document.querySelector('.immagini-outfit');
    window.stiliContainer = document.getElementById('stili-container');
    window.isLoggedIn = false;

    titolo.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        handleBackToHome();
    });

    forgotPasswordLink.addEventListener('click', function (e) {
        e.preventDefault();
        forgotPasswordPanel.classList.add('visible');
        loginPanel.classList.remove('visible');

        const closeForgotPasswordButton = forgotPasswordPanel.querySelector('.forgot-password-panel .close-button');
        if (closeForgotPasswordButton) {
            closeForgotPasswordButton.addEventListener('click', function (e) {
                e.preventDefault();
                forgotPasswordPanel.classList.remove('visible');
                loginPanel.classList.add('visible');
            });
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
    
            // Chiude pannello login se visibile
            if (loginPanel.classList.contains('visible')) {
                loginPanel.classList.remove('visible');
                loginPanel.querySelectorAll('input').forEach(input => input.value = '');
            }
    
            // Chiude pannello registrazione se visibile
            if (registerPanel.classList.contains('visible')) {
                registerPanel.classList.remove('visible');
                registerPanel.querySelectorAll('input').forEach(input => input.value = '');
            }
        });
    });

    registerLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginPanel.classList.remove('visible');
        registerPanel.classList.add('visible');
    });

    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        registerPanel.classList.remove('visible');
        loginPanel.classList.add('visible');
    });

    profileButton.addEventListener('click', function (e) {
        e.preventDefault();
        profileEditContainer.style.display = 'block';
        areaPersonale.classList.remove('visible');
        sezioneImmagini.style.display = 'none';
        areaRisultati.style.display = 'none';
        window.resultsButton.textContent = 'Visualizza Risultati';
    });

    logoutButton.addEventListener('click', function (e) {
        e.preventDefault();
        handleLogout();
    });

    // per far caricare l'area stili dall'alto
    document.querySelector('.explore-link').addEventListener('click', function(e){
        e.preventDefault();

        const targetId = this.getAttribute('data-target');
        const targetContainer = document.getElementById(targetId);

        if(targetContainer){
            targetContainer.classList.add('visible');
        }

        window.scrollTo({ top: 0, behavior: 'smooth'});
    });

    if (window.exploreLink && window.areaStili && window.container) {
        window.exploreLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation(); // blocca la propagazione che farebbe chiudere il menu

            // Nascondi il contenuto principale e mostra l'area stili
            window.areaStili.classList.add('visible');
            window.container.classList.add('invisible');

            // (opzionale) Chiudi anche il menu tendina, se aperto
            if (window.menuTendina.classList.contains('visible')) {
                window.menuTendina.classList.remove('visible');
            }
        });
    }

    const linkDonna = document.getElementById("link-donna");
    const linkUomo = document.getElementById("link-uomo");

    linkDonna.addEventListener("click", () => {
        linkDonna.classList.add("active");
        linkUomo.classList.remove("active");
    });

    linkUomo.addEventListener("click", () => {
        linkUomo.classList.add("active");
        linkDonna.classList.remove("active");
    });
    
    //rendere visibile il moodboard corrispondente allo stile dell'utente
    const stili = document.querySelectorAll('.stile');
    stili.forEach(stile => stile.style.display = 'block');

    // Gestisci i link che portano al camerino
    const links = document.querySelectorAll('a[href*="camerino.html"]');
    links.forEach(link => {
        // Rimuovi il preventDefault per permettere la navigazione
        link.addEventListener('click', function() {
            // Il link funzionerà normalmente, portando a camerino.html con il parametro stile
        });
    });

    const stileSelezionato = localStorage.getItem('stileSelezionato');

    if (stileSelezionato) {
        // Nasconde tutti i container di stile
        document.querySelectorAll('.stile-container').forEach(container => {
        container.style.display = 'none';
        });

        // Mostra solo il container dello stile selezionato
        const containerVisibile = document.getElementById(stileSelezionato);
        if (containerVisibile) {
        containerVisibile.style.display = 'block';
        }
    }

    document.querySelectorAll('.stile-container').forEach(el => {
        el.style.display = 'none';
    });

});