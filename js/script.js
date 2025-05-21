document.addEventListener('DOMContentLoaded', function () {

    window.titolo = document.querySelector('.titolo-link');
    window.loginButton = document.querySelector('.login-button');
    window.quizButton = document.querySelector('.quiz-button');
    window.quizContainer = document.querySelector('.quiz-container');
    window.loginPanel = document.querySelector('.login-panel');
    window.registerPanel = document.querySelector('.register-panel');
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
    window.menuButton = document.querySelector('.bottone');
    window.menuTendina = document.querySelector('.menu-tendina');
    window.profileButton = document.querySelector('.profile-button');
    window.forgotPasswordLink = document.querySelector('.forgot-password');
    window.forgotPasswordPanel = document.querySelector('.forgot-password-panel');
    window.areaRisultati = document.querySelector('.area-risultati');
    window.homeLink = document.getElementById('home-link');
    window.resetLink = document.getElementById('reset-link');
    window.camerinoLink = document.getElementById('camerino-link');
    window.contactFooter = document.querySelector('.contact-footer');
    let isLoggedIn = localStorage.getItem('userEmail') && localStorage.getItem('showPersonalArea') === 'true';

    // Mostra l'area personale dopo il login
    if (localStorage.getItem('showPersonalArea') === 'true') {
        container.classList.add('invisible');
        areaPersonale.classList.add('visible');
        localStorage.removeItem('showPersonalArea');
    }
    
    window.handleUserIconClick = function (e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        profileEditContainer.style.display = 'none';

        container.classList.add('invisible');
        areaPersonale.classList.add('visible');
        contactFooter.style.display = 'none';

        loginPanel.classList.remove('visible');
        registerPanel.classList.remove('visible');
        areaStili.classList.remove('visible');

        
        localStorage.setItem('showPersonalArea', 'false');
    };

    window.handleBackToHome = function () {
        container.classList.remove('invisible');
        areaPersonale.classList.remove('visible');
        areaStili.classList.remove('visible');
        loginButton.style.display = 'block';
    };

    window.handleLogout = function () {
        container.classList.remove('invisible');
        areaPersonale.classList.remove('visible');
        areaStili.classList.remove('visible');
        profileEditContainer.style.display = 'none';
        quizContainer.classList.remove('visible');
        loginPanel.classList.remove('visible');
        registerPanel.classList.remove('visible');
        contactFooter.style.display = 'block';

        loginButton.style.display = 'block';
        loginButton.classList.remove('logged-in');
        loginButton.innerHTML = 'Login';

        quizButton.innerHTML = '<span class="quiz-icon">Inizia il Quiz</span>';

        exploreLink.style.display = 'block';

        isLoggedIn = false;
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        localStorage.removeItem('showPersonalArea');
        localStorage.removeItem(document.querySelector('.immagini-outfit'));

        // loginButton.removeEventListener('click', window.handleUserIconClick);
        quizButton.addEventListener('click', window.handleQuizButtonClick);

        pulisciGalleria();

        const loginForm=document.querySelector('.login-form');
        if(loginForm){
            loginForm.querySelectorAll('input').forEach(input=> input.value='');
        }
        const registerForm=document.querySelector('.register-form');
        if(registerForm){
            registerForm.querySelectorAll('input').forEach(input=> input.value='');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.pulisciGalleria = function() {
        const sezioneImmagini = document.querySelector('.immagini-outfit');
        if (galleria) galleria.innerHTML = ''; // Svuota le immagini
        if (sezioneImmagini) sezioneImmagini.style.display = 'none'; // Nasconde la sezione immagini
        resultsButton.textContent = 'Visualizza Risultati';
    };

    window.handleQuizButtonClick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const quizContainer = document.querySelector('.quiz-container'); // Spostato fuori
        
        if (isLoggedIn) {
            if (quizContainer) quizContainer.classList.add('visible');
        } else {
            const loginPanel = document.querySelector('.login-panel');
            loginPanel.classList.add('visible');
            if (quizContainer) quizContainer.classList.remove('visible');
            showAlert("⚠️" + "Prima ti devi loggare!");
        }
    };
    
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

    document.addEventListener("keydown", function (e) {
        if (!isLoggedIn) return; // esce subito se non sei loggato

        // Ctrl+R o F5
        if ((e.key === "r" && e.ctrlKey) || e.key === "F5") {
            e.preventDefault(); // blocca il comportamento predefinito
            document.getElementById("reload-modal").style.display = "block";
        }
    });

    document.getElementById("confirm-reload").addEventListener("click", function () {
        location.reload(); // ricarica la pagina
    });

    document.getElementById("cancel-reload").addEventListener("click", function () {
        document.getElementById("reload-modal").style.display = "none";
    });

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
                fetch('php/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email, password }),
                    credentials: 'include'    // QUESTO FA SALVARE IL COOKIE DI SESSIONE
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {                        
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
                    
                    // loginButton.addEventListener('click', handleUserIconClick);
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

            // Correggi i nomi dei campi (name => nome, surname => cognome)
            const nameInput = this.querySelector('input[name="nome"]');
            const surnameInput = this.querySelector('input[name="cognome"]');
            const emailInput = this.querySelector('input[name="email"]');
            const passwordInput = this.querySelector('input[name="password"]');

            const nome = nameInput.value.trim();
            const cognome = surnameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // Rimuovi eventuali messaggi di errore precedenti
            const existingError = document.querySelector('.email-error');
            if (existingError) {
                existingError.remove();
            }

            if (email && password) {
                fetch('php/register.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email, password })  // nome/cognome non inviati
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Salva il nome completo nel localStorage
                        const nomeCompleto = `${nome} ${cognome}`;
                        localStorage.setItem('userName', nomeCompleto);

                        // Resetta i campi del form
                        nameInput.value = '';
                        surnameInput.value = '';
                        emailInput.value = '';
                        passwordInput.value = '';

                        alert('Registrazione completata!');
                        console.log('Registrato con Email:', email);
                        console.log('Password:', password);

                        isLoggedIn = true;

                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('userPassword', password);

                        // Mostra icona utente e pulsante quiz
                        loginButton.classList.add('logged-in');
                        loginButton.innerHTML = '<div class="user-icon"></div>';
                        quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';

                        registerPanel.classList.remove('visible');
                        profileEditContainer.classList.remove('visible');

                        quizButton.addEventListener('click', handleQuizButtonClick);
                    } else {
                        // Email già registrata, mostra errore
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
                        }, 2000);
                    }
                })
                .catch(error => console.error('Errore registrazione:', error));
            }
        });
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
    });

    logoutButton.addEventListener('click', function (e) {
        e.preventDefault();
        handleLogout();
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