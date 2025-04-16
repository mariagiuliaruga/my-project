document.addEventListener('DOMContentLoaded', function() {
    // Recupera i dati dell'utente dal localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');
    
    // Popola il campo email con l'email dell'utente
    if (userEmail) {
        document.getElementById('email').value = userEmail;
    }
    
    // Gestione del form di modifica profilo
    const profileForm = document.getElementById('profile-edit-form');
    const cancelButton = document.querySelector('.cancel-button');
    
    // Aggiungi validazione in tempo reale per la password
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    // Funzione per mostrare un messaggio di errore
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
    
    // Funzione per rimuovere un messaggio di errore
    function removeError(inputElement) {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        inputElement.classList.remove('error');
    }
    
    // Validazione della password attuale
    currentPasswordInput.addEventListener('blur', function() {
        if (!this.value) {
            showError(this, 'La password attuale è obbligatoria');
        } else if (this.value !== userPassword) {
            showError(this, 'La password attuale non è corretta');
        } else {
            removeError(this);
        }
    });
    
    // Validazione della nuova password
    newPasswordInput.addEventListener('blur', function() {
        if (!this.value) {
            showError(this, 'La nuova password è obbligatoria');
        } else if (this.value === currentPasswordInput.value) {
            showError(this, 'La nuova password deve essere diversa dalla password attuale');
        } else {
            removeError(this);
        }
    });
    
    // Validazione della conferma password
    confirmPasswordInput.addEventListener('blur', function() {
        if (!this.value) {
            showError(this, 'La conferma password è obbligatoria');
        } else if (this.value !== newPasswordInput.value) {
            showError(this, 'Le password non coincidono');
        } else {
            removeError(this);
        }
    });
    
    // Gestione del submit del form
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Validazione completa
        let isValid = true;
        
        if (!currentPassword) {
            showError(currentPasswordInput, 'La password attuale è obbligatoria');
            isValid = false;
        } else if (currentPassword !== userPassword) {
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
        
        if (!isValid) {
            return;
        }
        
        // Simulazione di aggiornamento profilo
        // In un'applicazione reale, qui ci sarebbe una chiamata API
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', newPassword);
        
        alert('Profilo aggiornato con successo!');
        window.location.href = 'index.html';
    });
    
    // Gestione del pulsante Annulla
    cancelButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}); 