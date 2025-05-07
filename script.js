document.addEventListener('DOMContentLoaded', function () {

    const loginButton = document.querySelector('.login-button');
    const quizButton = document.querySelector('.quiz-button');
    const loginPanel = document.querySelector('.login-panel');
    const registerPanel = document.querySelector('.register-panel');
    const closeButtons = document.querySelectorAll('.close-button');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const profileEditContainer = document.querySelector('.profile-edit-container');
    const areaPersonale = document.querySelector('.area-personale');
    const container = document.querySelector('.container');
    const cancButton = document.querySelector('.cancel-button');
    const logoutButton = document.querySelector('.logout-button');
    const exploreLink = document.querySelector('.explore-link');
    const areaStili = document.querySelector('.area-stili');
    const menuButton = document.querySelector('.bottone');
    const menuTendina = document.querySelector('.menu-tendina');
    const profileButton = document.querySelector('.profile-button');
    let isLoggedIn = localStorage.getItem('userEmail') && localStorage.getItem('showPersonalArea') === 'true';

    // Controllo se l'utente è loggato all'inizio
    function checkLoginStatus() {
        return localStorage.getItem('userEmail') && localStorage.getItem('userPassword');
    }

    // Mostra l'area personale dopo il login
    if (localStorage.getItem('showPersonalArea') === 'true') {
        container.classList.add('invisible');
        areaPersonale.classList.add('visible');
        localStorage.removeItem('showPersonalArea');
    }

    function handleUserIconClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            container.classList.add('invisible');
            areaPersonale.classList.add('visible');
            profileEditContainer.style.display = 'none';
            loginPanel.classList.remove('visible');
            registerPanel.classList.remove('visible');
        }
    }

    function handleBackToHome() {
        container.classList.remove('invisible');
        areaPersonale.classList.remove('visible');
        loginButton.style.display = 'block';
    }

    function handleLogout() {
        isLoggedIn = false;
        loginButton.classList.remove('logged-in');
        loginButton.innerHTML = 'Login';
        loginButton.style.display = 'block';
        quizButton.innerHTML = '<div class="quiz-icon">Scopri il tuo stile</div>';
        loginButton.removeEventListener('click', handleUserIconClick);
        quizButton.removeEventListener('click', handleQuizButtonClick);
        handleBackToHome();
    }
    function handleQuizButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const quizContainer = document.querySelector('.quiz-container'); // Spostato fuori
        
        if (isLoggedIn) {
            if (quizContainer) quizContainer.classList.add('visible');
        } else {
            const loginPanel = document.querySelector('.login-panel');
            loginPanel.classList.add('visible');
            if (quizContainer) quizContainer.classList.remove('visible');
        }
    }

    // Login con fetch
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
    
            const emailInput = this.querySelector('input[type="email"]');
            const passwordInput = this.querySelector('input[type="password"]');
            const email = emailInput.value;
            const password = passwordInput.value;
    
            // Rimuovi eventuali messaggi di errore precedenti
            const existingError = document.querySelector('.login-error');
            if (existingError) {
                existingError.remove();
            }

            if (email && password) {
                fetch('login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email, password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        
                        // Rendi visibile l'area personale o altre azioni
                    localStorage.setItem('userEmail', email);
                        
                    console.log('Email:', email);
                    console.log('Password:', password);
    
                    isLoggedIn = true;
    
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userPassword', password);
    
                    // Imposta l'icona dell'utente
                    loginButton.classList.add('logged-in');
                    loginButton.innerHTML = '<div class="user-icon"></div>';  // Aggiungi l'icona dell'utente
                    quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
    
                    loginPanel.classList.remove('visible');
                    registerPanel.classList.remove('visible');
                    profileEditContainer.classList.remove('visible');
    
                     // Resetta il form di login
                    emailInput.value = '';
                    passwordInput.value = ''; 
                    
                    loginButton.addEventListener('click', handleUserIconClick);
                    quizButton.addEventListener('click', handleQuizButtonClick);
                } else {
                    // Rimuovi eventuali messaggi di errore precedenti
                    const existingError = document.querySelector('.login-error');
                    if (existingError) {
                        existingError.remove();
                    }
            
                    // Crea e mostra il messaggio di errore
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('login-error');
                    errorMessage.style.color = 'red';
                    errorMessage.style.marginTop = '5px';
                    errorMessage.textContent = data.message || 'Errore durante il login';
                    emailInput.insertAdjacentElement('beforebegin', errorMessage);
            
                    // Nascondi l'area personale e mostra il contenitore principale
                    isLoggedIn = false;
                    areaPersonale.classList.remove('visible');
                    container.classList.remove('invisible');
                    loginButton.style.display = 'block';
            
                    // Rimuovi il messaggio di errore dopo 4 secondi
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 4000);
                }
            });
        }
    });
}

    // Registrazione con fetch
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const passwordInput = this.querySelector('input[type="password"]');
            const email = emailInput.value;
            const password = passwordInput.value;
    
            // Rimuovi eventuali messaggi di errore precedenti
            const existingError = document.querySelector('.email-error');
            if (existingError) {
                existingError.remove();
            }
            if (email && password) {
                fetch('register.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email, password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        emailInput.value = '';
                        passwordInput.value = ''; 
                        // Registrazione riuscita
                        alert('Registrazione completata!');
                        
                   
                        console.log('Registrato con Email:', email);
                        console.log('Password:', password);
            
                        isLoggedIn = true;
            
                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('userPassword', password);
            
                        // Imposta l'icona dell'utente
                        loginButton.classList.add('logged-in');
                        loginButton.innerHTML = '<div class="user-icon"></div>';  // Aggiungi l'icona dell'utente
                        quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
            
                        registerPanel.classList.remove('visible'); // Rimuovi il pannello di registrazione
                        profileEditContainer.classList.remove('visible');
            
                        loginButton.addEventListener('click', handleUserIconClick);
                        quizButton.addEventListener('click', handleQuizButtonClick);
                    } else {
                        // Email già registrata, mostriamo il messaggio d'errore sotto il campo email
                        const prevError = document.querySelector('.email-error');
                        if (prevError) prevError.remove();

                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('email-error');
                        errorMessage.style.color = 'red';
                        errorMessage.style.marginTop = '5px';
                        errorMessage.textContent = data.message || 'Errore durante la registrazione';
                        emailInput.insertAdjacentElement('beforebegin', errorMessage);
                    
                        registerPanel.classList.add('visible');

                        setTimeout(() => {
                            errorMessage.remove();
                        }, 4000);

                        setTimeout(() => {
                            registerPanel.classList.remove('visible');
                            loginPanel.classList.add('visible');
                        }, 3250);
                    }
                    
                    
                })
                .catch(error => console.error('Errore registrazione:', error));
            }
        });
        function showLoginError(message) {
        const error = document.createElement('div');
        error.classList.add('login-error');
        error.style.color = 'red';
        error.textContent = message || 'Errore';
        loginForm?.querySelector('input[type="email"]')?.insertAdjacentElement('beforebegin', error);
    }

    loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isLoggedIn) {
            loginPanel.classList.toggle('visible');
            registerPanel.classList.remove('visible');
        } else {
            handleUserIconClick(e);
        }
    });

    quizButton.addEventListener('click', handleQuizButtonClick);

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

    profileButton?.addEventListener('click', function (e) {
        e.preventDefault();
        profileEditContainer.style.display = 'block';
        areaPersonale.classList.remove('visible');
    });

    cancButton?.addEventListener('click', function (e) {
        e.preventDefault();
        profileEditContainer.style.display = 'none';
        areaPersonale.classList.add('visible');
    });

    logoutButton?.addEventListener('click', function (e) {
        e.preventDefault();
        handleLogout();
    });

    exploreLink.addEventListener('click', function (e) {
        e.preventDefault();
        container.style.display = 'none';
        areaStili.style.display = 'block';
    });

    const menuTendinaContainer = document.querySelector('.menu-tendina');
    if (menuTendinaContainer) {
        const resetLink = menuTendinaContainer.querySelector('a[href="#"]:nth-child(2)');
        if (resetLink) {
            resetLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleLogout();
            });
        }
        const homeLink = menuTendina.querySelector('a[href="index.html"]');
        if (homeLink) {
            homeLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleBackToHome();
            });
        }
    }
       
    

    const menuButton = document.querySelector('.bottone');
    if (menuButton) {
        menuButton.removeEventListener('click', function() {}); // Assicurati di rimuovere l'eventuale listener precedente
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const menuTendina = this.querySelector('.menu-tendina');
            if (menuTendina) {
                document.querySelectorAll('.menu-tendina').forEach(menu => {
                    if (menu !== menuTendina) {
                        menu.classList.remove('visible');
                    }
                });
                menuTendina.classList.toggle('visible');
            }
        });
    }

    document.addEventListener('click', function(e) {
        const menuTendina = document.querySelector('.menu-tendina');
        const menuButton = document.querySelector('.bottone');
        if (menuTendina && menuButton && !menuButton.contains(e.target) && !menuTendina.contains(e.target)) {
            menuTendina.classList.remove('visible');
        }
    });

    document.addEventListener('touchstart', function(e) {
        const menuTendina = document.querySelector('.menu-tendina');
        const menuButton = document.querySelector('.bottone');
        if (menuTendina && menuButton && !menuButton.contains(e.target) && !menuTendina.contains(e.target)) {
            menuTendina.classList.remove('visible');
        }
    });

    document.getElementById('profile-edit-form')?.addEventListener('submit', function (e) {
        e.preventDefault();
        profileEditContainer.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
});