document.addEventListener('DOMContentLoaded', function() {
    // Recupera i dati dell'utente dal localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');
    
    // Popola il campo email con l'email dell'utente e lo rendi non modificabile
    if (userEmail) {
        const emailInput = document.getElementById('email');
        emailInput.value = userEmail;
        emailInput.readOnly = true;
        emailInput.title = "L'email non può essere modificata";
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
    
    // Funzione per mostrare una notifica toast
    function showToast(message, type = 'success') {
        // Crea il container del toast se non esiste
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Crea il toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Aggiungi l'icona
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        toast.appendChild(icon);
        
        // Aggiungi il messaggio
        const messageElement = document.createElement('span');
        messageElement.textContent = message;
        toast.appendChild(messageElement);
        
        // Aggiungi il toast al container
        toastContainer.appendChild(toast);
        
        // Animazione di entrata
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Rimuovi il toast dopo 3 secondi
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 3000);
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
        // Imposta il flag per mostrare l'area personale
        localStorage.setItem('showPersonalArea', 'true');
        
        // Mostra la notifica toast invece dell'alert
        showToast('Profilo aggiornato con successo!');
        
        // Mostra l'area personale dopo un breve delay per permettere di vedere la notifica
        setTimeout(() => {
            if (typeof window.handleUserIconClick === 'function') {
                window.handleUserIconClick(e);  // non serve 'e' qui
            }
        }, 2500);
        
    });
    
    // Gestione del pulsante Annulla
    cancelButton.addEventListener('click', function(e) {
        if (typeof window.handleUserIconClick === 'function') {
            window.handleUserIconClick(e);
        }
    });
}); 