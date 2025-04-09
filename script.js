// Gestione del login
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
   

    // Mostra/nascondi il pannello di login
    loginButton.addEventListener('click', function() {
        loginPanel.classList.toggle('visible');
        registerPanel.classList.remove('visible');
    });

    // Chiudi i pannelli quando si clicca sulla X
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panel = this.closest('.login-panel, .register-panel');
            panel.classList.remove('visible');
        });
    });

    // Gestione del link di registrazione
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginPanel.classList.remove('visible');
        registerPanel.classList.add('visible');
    });

    // Gestione del link per tornare al login
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerPanel.classList.remove('visible');
        loginPanel.classList.add('visible');
    });

    // Gestione del form di login
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        if (email && password) {
            console.log('Email:', email);
            console.log('Password:', password);
            
            // Qui puoi aggiungere la logica per l'invio al server
            
            // Trasforma il bottone in icona utente
            loginButton.classList.add('logged-in');
            loginButton.innerHTML = '<div class="user-icon"></div>';
            quizButton.classList.add('active');
            quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
            
            // Chiudi il pannello
            loginPanel.classList.remove('visible');
            
            // Svuota il form
            this.reset();

            // Aggiungi l'event listener all'icona utente dopo che è stata creata
            const userIcon = document.querySelector('.user-icon');
            userIcon.addEventListener('click', function() {
                container.classList.add('invisible');
                areaPersonale.classList.add('visible');
                loginPanel.style.display = 'none';
                registerPanel.style.display = 'none';
                loginPanel.classList.remove('visible');
                registerPanel.classList.remove('visible');
            });

            // Modifica il comportamento del quiz button quando l'utente è loggato
            quizButton.addEventListener('click', function() {
                const quizContainer = document.querySelector('.quiz-container');
                quizContainer.classList.add('visible');
                
            });
        }
    });

    // Gestione del form di registrazione
    const registerForm = document.querySelector('.register-form');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        if (email && password) {
            console.log('Email:', email);
            console.log('Password:', password);
            
            // Qui puoi aggiungere la logica per l'invio al server
            
            // Trasforma il bottone in icona utente
            loginButton.classList.add('logged-in');
            loginButton.innerHTML = '<div class="user-icon"></div>';
            quizButton.classList.add('active');
            quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
            
            // Chiudi il pannello
            registerPanel.classList.remove('visible');
            
            // Svuota il form
            this.reset();

            // Aggiungi l'event listener all'icona utente dopo che è stata creata
            const userIcon = document.querySelector('.user-icon');
            userIcon.addEventListener('click', function() {
                container.classList.add('invisible');
                areaPersonale.classList.add('visible');
                loginPanel.style.display = 'none';
                registerPanel.style.display = 'none';
                loginPanel.classList.remove('visible');
                registerPanel.classList.remove('visible');
            });

            // Modifica il comportamento del quiz button quando l'utente è loggato
            quizButton.addEventListener('click', function() {
                const quizContainer = document.querySelector('.quiz-container');
                quizContainer.classList.add('visible');
            });
        }
    });

    // Comportamento iniziale del quiz button (quando l'utente non è loggato)
    quizButton.addEventListener('click', function() {
        if (!quizButton.classList.contains('active')) {
            loginPanel.classList.add('visible');
        }
    });
});


