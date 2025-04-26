document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-button');
    const loginPanel = document.querySelector('.login-panel');
    const registerPanel = document.querySelector('.register-panel');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const closeButtons = document.querySelectorAll('.close-button');
    const registerButton = document.querySelector('.register-button'); // Bottone per la registrazione
    const quizButton = document.querySelector('.quiz-button');
    const areaPersonale = document.querySelector('.area-personale');
    const container = document.querySelector('.container');
    const profileButton = document.querySelector('.profile-button');
    const menuButton = document.querySelector('.bottone');
    const menuTendina = document.querySelector('.menu-tendina');
    const logoutButton = document.querySelector('.logout-button');

    let isLoggedIn = false;

    // Funzione per nascondere i pannelli e mostrare il login
    function closeRegisterPanel() {
        registerPanel.classList.remove('visible');
        loginPanel.classList.add('visible');
    }

    // Gestisci il login
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn) {
            loginPanel.classList.toggle('visible');
            registerPanel.classList.remove('visible');
        }
    });

    // Gestisci la registrazione
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        loginPanel.classList.remove('visible');
        registerPanel.classList.add('visible');
    });

    // Torna al login
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        registerPanel.classList.remove('visible');
        loginPanel.classList.add('visible');
    });

    // Gestisci la registrazione dell'utente
    registerButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const email = registerPanel.querySelector('input[type="email"]').value.trim();
        const password = registerPanel.querySelector('input[type="password"]').value.trim();

        if (email && password) {
            fetch('register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ email, password })
            })
            .then(response => response.text())
            .then(data => {
                if (data.includes('Registrazione riuscita')) {
                    alert('Registrazione completata! Ora effettua il login.');
                    closeRegisterPanel(); // Chiudi il pannello di registrazione
                    
                    // Mostra l'icona dell'utente nel bottone di login
                    const userIcon = document.querySelector('.user-icon'); // Assicurati che esista l'elemento con questa classe
                    loginButton.innerHTML = ''; // Rimuoviamo eventuali contenuti precedenti
                    loginButton.appendChild(userIcon.cloneNode(true)); // Cloniamo l'icona e la aggiungiamo al bottone

                    loginButton.classList.add('logged-in'); // Impostiamo una classe per lo stile
                    isLoggedIn = true;

                    // Rendi visibile il bottone del quiz
                    quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
                }
            })
            .catch(error => console.error('Errore registrazione:', error));
        }
    });

    // Chiudi i pannelli
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const panel = this.closest('.login-panel, .register-panel');
            panel?.classList.remove('visible');
        });
    });

    // Eventi di logout
    function handleLogout() {
        isLoggedIn = false;
        loginButton.classList.remove('logged-in');
        loginButton.innerHTML = 'Login';
        loginButton.style.display = 'block';
        quizButton.innerHTML = '<div class="quiz-icon">Scopri il tuo stile</div>';
        loginButton.removeEventListener('click', handleUserIconClick);
        quizButton.removeEventListener('click', handleQuizButtonClick);
        container.classList.remove('invisible');
        areaPersonale.classList.remove('visible');
    }

    logoutButton.addEventListener('click', handleLogout);

    // Gestione della navigazione nel menu
    if (menuTendina) {
        const resetLink = menuTendina.querySelector('a[href="#"]:nth-child(2)');
        const homeLink = menuTendina.querySelector('a[href="index.html"]');

        resetLink?.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });

        homeLink?.addEventListener('click', function(e) {
            e.preventDefault();
            container.classList.remove('invisible');
            areaPersonale.classList.remove('visible');
        });
    }
});