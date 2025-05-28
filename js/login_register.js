document.addEventListener('DOMContentLoaded', function () {
    window.loginButton = document.querySelector('.login-button');
    window.loginPanel = document.querySelector('.login-panel');
    window.registerPanel = document.querySelector('.register-panel');
    
    // Prendi l'email da localStorage o null se non presente
    window.userEmail = localStorage.getItem('userEmail') || null;

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
                    credentials: 'include'    // FA SALVARE IL COOKIE DI SESSIONE
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
                    
                    window.quizButton.addEventListener('click', handleQuizButtonClick);
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
                        window.sezioneImmagini.classList.remove('visible');
                        window.areaRisultati.classList.remove('visible');
                        window.quizButton.addEventListener('click', handleQuizButtonClick);
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
        if (!window.isLoggedIn) {
            window.loginPanel.classList.toggle('visible');
            window.registerPanel.classList.remove('visible');
        } else {
            handleUserIconClick(e);
        }
    });
});