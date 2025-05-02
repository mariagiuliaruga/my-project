document.addEventListener('DOMContentLoaded', function() {
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
        // --- Gestione del form di login ---
    const loginForm = document.querySelector('.login-form');
        
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

                this.reset(); // Resetta il form di login

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
        })
    }
});

    // --- Registrazione ora invia direttamente al server ---
    const registerForm = document.querySelector('.register-form');
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
                    // Registrazione riuscita
                    alert('Registrazione completata! Ora effettua il login.');
                    
                    loginPanel.classList.add('visible'); // Mostra il pannello di login
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
                    errorMessage.remove(); // Rimuovi eventuali messaggi di errore precedenti
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('email-error');
                    errorMessage.style.color = 'red';
                    errorMessage.style.marginTop = '5px';
                    errorMessage.textContent = data.message;  // "Email già registrata"
                    setTimeout(() => { 
                        errorMessage.remove();  // Rimuovi il messaggio dopo 3 secondi
                    }
                    , 4000);
                    // Aggiungiamo il messaggio sopra il campo email
                    emailInput.insertAdjacentElement('beforebegin', errorMessage);
                    registerPanel.classList.add('visible');
                    // Dopo 5 secondi, nascondiamo il pannello di registrazione e mostriamo il pannello di login
                    setTimeout(() => {
                        registerPanel.classList.remove('visible');
                    }, 3000);
                    setTimeout(() => {
                        loginPanel.classList.add('visible');
                    }, 3250);
                }
                
            })
            .catch(error => console.error('Errore registrazione:', error));
        }
    });
});