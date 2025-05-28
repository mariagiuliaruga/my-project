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

    // Mostra l'area personale dopo il login
    if (localStorage.getItem('showPersonalArea') === 'true') {
        container.classList.add('invisible');
        areaPersonale.classList.add('visible');
        localStorage.removeItem('showPersonalArea');
    }

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
    window.profileForm = document.getElementById('profile-edit-form');
    window.cancelButton = document.querySelector('.cancel-button');
    window.currentPasswordInput = document.getElementById('current-password');
    window.newPasswordInput = document.getElementById('new-password');
    window.confirmPasswordInput = document.getElementById('confirm-password');

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
                    if (typeof handleUserIconClick === 'function') {
                        handleUserIconClick();
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
            if (typeof handleUserIconClick === 'function') {
                handleUserIconClick();
            }
        }, 2500);
    });

    cancelButton.addEventListener('click', function(e) {
        if (typeof handleUserIconClick === 'function') {
            handleUserIconClick();
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