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
    const profileButton = document.querySelector('.profile-button');

    let isLoggedIn = false;

    // Controlla se dobbiamo mostrare l'area personale
    if (localStorage.getItem('showPersonalArea') === 'true') {
        container.classList.add('invisible');
        areaPersonale.classList.add('visible');
        loginButton.style.display = 'none'; // Nascondi il pulsante di login
        localStorage.removeItem('showPersonalArea'); // Rimuovi il flag dopo averlo usato
    }

    // Funzione per gestire il click sull'icona utente
    function handleUserIconClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            container.classList.add('invisible');
            areaPersonale.classList.add('visible');
            loginButton.style.display = 'none'; // Nascondi il pulsante di login
            loginPanel.classList.remove('visible');
            registerPanel.classList.remove('visible');
        }
    }

    // Funzione per tornare alla home page
    function handleBackToHome() {
        container.classList.remove('invisible');
        areaPersonale.classList.remove('visible');
        loginButton.style.display = 'block'; // Mostra di nuovo il pulsante di login
    }


    // Funzione per gestire il logout
    function handleLogout() {
        isLoggedIn = false;
        loginButton.classList.remove('logged-in');
        loginButton.innerHTML = 'Login';
        loginButton.style.display = 'block'; // Mostra di nuovo il pulsante di login
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

    // Funzione per gestire il click sul pulsante modifica profilo
    function handleProfileButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = 'profile-edit.html';
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
            
            // Salva i dati dell'utente nel localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            
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
            
            // Salva i dati dell'utente nel localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            
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

    // Aggiungi event listener per il link Reset nel menu a tendina
    const menuTendinaContainer = document.querySelector('.menu-tendina');
    if (menuTendinaContainer) {
        const resetLink = menuTendinaContainer.querySelector('a[href="#"]:nth-child(2)');
        if (resetLink) {
            resetLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleLogout();
            });
        }
    }

    // Aggiungi event listener per il pulsante di modifica profilo
    if (profileButton) {
        profileButton.addEventListener('click', handleProfileButtonClick);
    }

    // Aggiungi event listener per tornare alla home page
    const menuTendina = document.querySelector('.menu-tendina');
    if (menuTendina) {
        const homeLink = menuTendina.querySelector('a[href="index.html"]');
        if (homeLink) {
            homeLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleBackToHome();
            });
        }
    }

    // Aggiungi event listener per il bottone del menu
    const menuButton = document.querySelector('.bottone');
    if (menuButton) {
        // Rimuovi l'event listener esistente
        menuButton.removeEventListener('click', function() {});
        
        // Aggiungi il nuovo event listener
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const menuTendina = this.querySelector('.menu-tendina');
            if (menuTendina) {
                // Chiudi tutti gli altri menu a tendina
                document.querySelectorAll('.menu-tendina').forEach(menu => {
                    if (menu !== menuTendina) {
                        menu.classList.remove('visible');
                    }
                });
                // Apri/chiudi il menu corrente
                menuTendina.classList.toggle('visible');
            }
        });
    }

    // Chiudi il menu quando si clicca fuori da esso
    document.addEventListener('click', function(e) {
        const menuTendina = document.querySelector('.menu-tendina');
        const menuButton = document.querySelector('.bottone');
        if (menuTendina && menuButton && !menuButton.contains(e.target) && !menuTendina.contains(e.target)) {
            menuTendina.classList.remove('visible');
        }
    });

    // Aggiungi event listener per touchstart
    document.addEventListener('touchstart', function(e) {
        const menuTendina = document.querySelector('.menu-tendina');
        const menuButton = document.querySelector('.bottone');
        if (menuTendina && menuButton && !menuButton.contains(e.target) && !menuTendina.contains(e.target)) {
            menuTendina.classList.remove('visible');
        }
    });
});