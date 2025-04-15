/*gestione di login, registrazione, logout, quiz e area personale*/

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-button');
    const loginPanel = document.querySelector('.login-panel');
    const registerPanel = document.querySelector('.register-panel');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const closeButtons = document.querySelectorAll('.close-button');
    const quizButton = document.querySelector('.quiz-button');
    const areaPersonale = document.querySelector('.area-personale');
    const container = document.querySelector('.container');

    let isLoggedIn = false;

    // Funzione per gestire il click sull'icona utente
    function handleUserIconClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            container.classList.add('invisible');
            areaPersonale.classList.add('visible');
            loginPanel.classList.remove('visible');
            registerPanel.classList.remove('visible');
        }
    }

    // Funzione per tornare alla home page
    function handleBackToHome() {
        container.classList.remove('invisible');
        areaPersonale.classList.remove('visible');
    }

    // Funzione per gestire il logout
    function handleLogout() {
        isLoggedIn = false;
        loginButton.classList.remove('logged-in');
        loginButton.innerHTML = 'Login';
        quizButton.innerHTML = '<div class="quiz-icon">Scopri il tuo stile</div>';
        
        // Rimuovi gli event listener
        loginButton.removeEventListener('click', handleUserIconClick);
        quizButton.removeEventListener('click', handleQuizButtonClick);
        
        // Torna alla home page
        handleBackToHome();
    }

    // Funzione per gestire il click sul quiz button
    function handleQuizButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            const quizContainer = document.querySelector('.quiz-container');
            quizContainer.classList.add('visible');
            loginPanel.classList.remove('visible');
        } else {
            loginPanel.classList.add('visible');
        }
    }

    // mostra il pannello di login e nascondi il pannello di registrazione
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn) {
            loginPanel.classList.toggle('visible');
            registerPanel.classList.remove('visible');
        }
    });

    // chiudi i pannelli quando si clicca sulla X
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const panel = this.closest('.login-panel, .register-panel');
            panel.classList.remove('visible');
        });
    });

    // vai al pannello di registrazione e nascondi il pannello di login
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        loginPanel.classList.remove('visible');
        registerPanel.classList.add('visible');
    });

    // torna al pannello di login e nascondi il pannello di registrazione
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        registerPanel.classList.remove('visible');
        loginPanel.classList.add('visible');
    });

    // Gestione del form di login
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        if (email && password) {
            console.log('Email:', email);
            console.log('Password:', password);
            
            isLoggedIn = true;
            
            // Trasforma il bottone in icona utente
            loginButton.classList.add('logged-in');
            loginButton.innerHTML = '<div class="user-icon"></div>';
            quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
            
            // Chiudi il pannello
            loginPanel.classList.remove('visible');
            
            // Svuota il form
            this.reset();

            // Aggiungi i nuovi event listener
            loginButton.addEventListener('click', handleUserIconClick);
            quizButton.addEventListener('click', handleQuizButtonClick);
        }
    });

    // Gestione del form di registrazione
    const registerForm = document.querySelector('.register-form');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        if (email && password) {
            console.log('Email:', email);
            console.log('Password:', password);
            
            isLoggedIn = true;
            
            // Trasforma il bottone in icona utente
            loginButton.classList.add('logged-in');
            loginButton.innerHTML = '<div class="user-icon"></div>';
            quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
            
            // Chiudi il pannello
            registerPanel.classList.remove('visible');
            
            // Svuota il form
            this.reset();

            // Aggiungi i nuovi event listener
            loginButton.addEventListener('click', handleUserIconClick);
            quizButton.addEventListener('click', handleQuizButtonClick);
        }
    });

    // Aggiungi event listener per il pulsante di logout
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // Aggiungi event listener per tornare alla home page
    const menuTendina = document.querySelector('.menu-tendina');
    if (menuTendina) {
        const homeLink = menuTendina.querySelector('a[href="test.html"]');
        if (homeLink) {
            homeLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleBackToHome();
            });
        }
    }
});



