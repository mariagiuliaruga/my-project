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
    window.aboutSection = document.getElementById('about-section');
    window.sezioneImmagini = document.querySelector('.immagini-outfit');
    isLoggedIn = false;

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
        aboutSection.style.display = 'none';
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

        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        localStorage.removeItem('showPersonalArea');
        
        isLoggedIn = false;

        // infine ricarica la pagina
        location.reload();

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

    // Prendi l'email da localStorage o null se non presente
    window.userEmail = localStorage.getItem('userEmail') || null;

    // Funzione per precompilare il campo email nel profile-edit-container (readonly)
    function prefillProfileEmail() {
        const emailInput = document.getElementById('email');
        if (window.userEmail && emailInput) {
            emailInput.value = window.userEmail;
            emailInput.readOnly = true;
            emailInput.title = "L'email non può essere modificata";
        }
    }

    prefillProfileEmail();

    // Login con fetch
    window.loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
    
            window.emailInput = this.querySelector('input[type="email"]');
            window.passwordInput = this.querySelector('input[type="password"]');
            window.email = emailInput.value;
            window.password = passwordInput.value;
    
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
    
                    window.isLoggedIn = true;
                    
                    window.userEmail = email;
                    window.userPassword = password;
                    
                    localStorage.setItem('userEmail', email);

                    prefillProfileEmail();
                    localStorage.setItem('userPassword', password);
    
                    // Imposta l'icona dell'utente
                    window.loginButton.classList.add('logged-in');
                    window.loginButton.innerHTML = '<div class="user-icon"></div>';  // Aggiungi l'icona dell'utente
                    window.quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
    
                    window.loginPanel.classList.remove('visible');
                    window.registerPanel.classList.remove('visible');
                    window.profileEditContainer.classList.remove('visible');
    
                     // Resetta il form di login
                    emailInput.value = '';
                    passwordInput.value = ''; 
                    
                    // loginButton.addEventListener('click', handleUserIconClick);
                    window.quizButton.addEventListener('click', window.handleQuizButtonClick);
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
                    window.userEmail = null;
                    window.userPassword = null;
                    window.isLoggedIn = false;

                    window.areaPersonale.classList.remove('visible');
                    window.container.classList.remove('invisible');
                    window.loginButton.style.display = 'block';

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
    window.registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Correggi i nomi dei campi (name => nome, surname => cognome)
            window.nameInput = this.querySelector('input[name="nome"]');
            window.surnameInput = this.querySelector('input[name="cognome"]');
            window.emailInput = this.querySelector('input[name="email"]');
            window.passwordInput = this.querySelector('input[name="password"]');

            window.nome = nameInput.value.trim();
            window.cognome = surnameInput.value.trim();
            window.email = emailInput.value.trim();
            window.password = passwordInput.value;

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

                        window.isLoggedIn = true;

                        window.userEmail = email;
                        window.userPassword = password;

                        localStorage.setItem('userEmail', email);
                        prefillProfileEmail();
                        localStorage.setItem('userPassword', password);

                        // Mostra icona utente e pulsante quiz
                        window.loginButton.classList.add('logged-in');
                        window.loginButton.innerHTML = '<div class="user-icon"></div>';
                        window.quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';

                        window.registerPanel.classList.remove('visible');
                        window.profileEditContainer.classList.remove('visible');

                        window.quizButton.addEventListener('click', window.handleQuizButtonClick);
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

                        window.registerPanel.classList.add('visible');

                        window.userEmail = null;
                        window.userPassword = null;
                        window.isLoggedIn = false;

                        setTimeout(() => {
                            errorMessage.remove();
                        }, 4000);

                        setTimeout(() => {
                            window.registerPanel.classList.remove('visible');
                            window.loginPanel.classList.add('visible');
                        }, 2000);
                    }
                })
                .catch(error => console.error('Errore registrazione:', error));
            }
        });
    }

    window.loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isLoggedIn) {
            window.loginPanel.classList.toggle('visible');
            window.registerPanel.classList.remove('visible');
        } else {
            window.handleUserIconClick(e);
        }
    });

    // -------- Campo email readonly e precompilato ----------
    if (window.userEmail) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = window.userEmail;
            emailInput.readOnly = true;
            emailInput.title = "L'email non può essere modificata";
            window.emailInput = emailInput;  // salva globalmente per riuso
        } else {
            console.error("Input con id 'email' non trovato nel DOM");
        }
    } 

    // ---------- Variabili form profilo -----------
    const profileForm = document.getElementById('profile-edit-form');
    const cancelButton = document.querySelector('.cancel-button');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // ---------- Funzioni errori e toast --------------
    function showError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        inputElement.classList.add('error');
    }

    function removeError(inputElement) {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        inputElement.classList.remove('error');
    }

    function showToast(message, type = 'success') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        toast.appendChild(icon);
        const messageElement = document.createElement('span');
        messageElement.textContent = message;
        toast.appendChild(messageElement);
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // ----------- Validazioni password ---------------
    currentPasswordInput.addEventListener('blur', function() {
        if (!this.value) {
            showError(this, 'La password attuale è obbligatoria');
        } else if (this.value !== window.userPassword) {
            showError(this, 'La password attuale non è corretta');
        } else {
            removeError(this);
        }
    });

    newPasswordInput.addEventListener('blur', function() {
        if (!this.value) {
            showError(this, 'La nuova password è obbligatoria');
        } else if (this.value === currentPasswordInput.value) {
            showError(this, 'La nuova password deve essere diversa dalla password attuale');
        } else {
            removeError(this);
        }
    });

    confirmPasswordInput.addEventListener('blur', function() {
        if (!this.value) {
            showError(this, 'La conferma password è obbligatoria');
        } else if (this.value !== newPasswordInput.value) {
            showError(this, 'Le password non coincidono');
        } else {
            removeError(this);
        }
    });

    // ----------- Submit form profilo ----------------
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        window.email = (window.emailInput && window.emailInput.value) || window.userEmail; //non so perchè ma non la aggiorna
        window.currentPassword = currentPasswordInput.value;
        window.newPassword = newPasswordInput.value;
        console.log(`mail ${window.email}`);
        console.log(`pwd ${newPassword}`);

        const confirmPassword = confirmPasswordInput.value;

        let isValid = true;

        if (!currentPassword) {
            showError(currentPasswordInput, 'La password attuale è obbligatoria');
            isValid = false;
        } else if (currentPassword !== window.userPassword) {
            showError(currentPasswordInput, 'La password attuale non è corretta');
            isValid = false;
        }

        if (!newPassword) {
            showError(newPasswordInput, 'La nuova password è obbligatoria');
            isValid = false;
        } else if (newPassword === currentPassword) {
            showError(newPasswordInput, 'La nuova password deve essere diversa dalla password attuale');
            isValid = false;
        }

        if (!confirmPassword) {
            showError(confirmPasswordInput, 'La conferma password è obbligatoria');
            isValid = false;
        } else if (confirmPassword !== newPassword) {
            showError(confirmPasswordInput, 'Le password non coincidono');
            isValid = false;
        }

        if (!isValid) return;
        
        fetch('php/update_password.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                email: window.email,
                newPassword: window.newPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', newPassword);
                localStorage.setItem('showPersonalArea', 'true');

                showToast('Password aggiornata con successo!');

                setTimeout(() => {
                    if (typeof window.handleUserIconClick === 'function') {
                        window.handleUserIconClick();
                    }
                }, 2500);
            } else {
                showToast(data.message || 'Errore aggiornamento password', 'error');
            }
        })
        .catch(async error => {
            console.error('Errore nella richiesta:', error);
            try {
                const text = await error.response.text();
                console.error('Risposta dal server:', text);
            } catch {}
            showToast('Errore nella richiesta al server', 'error');
        });



        setTimeout(() => {
            if (typeof window.handleUserIconClick === 'function') {
                window.handleUserIconClick();
            }
        }, 2500);
    });

    cancelButton.addEventListener('click', function(e) {
        if (typeof window.handleUserIconClick === 'function') {
            window.handleUserIconClick();
        }
    });
    
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
        sezioneImmagini.style.display = 'none';
        window.resultsButton.textContent = 'Visualizza Risultati';
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