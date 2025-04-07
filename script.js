// Gestione del login
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-button');
    const loginPanel = document.querySelector('.login-panel');

    // Mostra/nascondi il pannello di login
    loginButton.addEventListener('click', function() {
        loginPanel.classList.toggle('visible');
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
            
            // Chiudi il pannello
            loginPanel.classList.remove('visible');
            
            // Svuota il form
            this.reset();
        }
    });
}); 