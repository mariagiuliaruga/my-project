document.addEventListener('DOMContentLoaded', function() {
    // campo email readonly e precompilato
    if (window.userEmail) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = window.userEmail;
            emailInput.readOnly = true;
            emailInput.title = "L'email non può essere modificata";
            window.emailInput = emailInput;  // memorizza un riferimento globale a emailInput per riutilizzarla
        } else {
            console.error("Input con id 'email' non trovato nel DOM");
        }
    } 

    window.profileForm = document.getElementById('profile-edit-form');
    window.cancelButton = document.querySelector('.cancel-button');
    window.currentPasswordInput = document.getElementById('current-password');
    window.newPasswordInput = document.getElementById('new-password');
    window.confirmPasswordInput = document.getElementById('confirm-password');

    // validazione password eseguita quando esco dal campo di input, cioè se il campo perde il focus
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

    // event listener al submit del form
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        window.email = (window.emailInput && window.emailInput.value) || window.userEmail; // usa userEmail se emailInput non è disponibile
        window.currentPassword = currentPasswordInput.value;
        window.newPassword = newPasswordInput.value;
        console.log(`mail ${window.email}`);
        console.log(`pwd ${newPassword}`);

        const confirmPassword = confirmPasswordInput.value;

        let isValid = true;

        // mostro errori se qualche campo non è valido
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

}); 
