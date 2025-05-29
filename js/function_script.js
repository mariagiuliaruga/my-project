function handleUserIconClick(e) {
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
    stiliContainer.style.display = 'none';
}

function handleBackToHome() {
    container.classList.remove('invisible');
    areaPersonale.classList.remove('visible');
    areaStili.classList.remove('visible');
    aboutSection.style.display = 'none';
    profileEditContainer.style.display = 'none';
    contactFooter.style.display = 'block';
    sezioneImmagini.style.display = 'none';
    areaRisultati.style.display = 'none';
    resultsButton.textContent = 'Visualizza Risultati';
}

function handleLogout() {
    container.classList.remove('invisible');
    areaPersonale.classList.remove('visible');
    areaStili.classList.remove('visible');
    profileEditContainer.style.display = 'none';
    quizContainer.classList.remove('visible');
    loginPanel.classList.remove('visible');
    registerPanel.classList.remove('visible');
    contactFooter.style.display = 'block';
    sezioneImmagini.style.display = 'none';
    areaRisultati.style.display = 'none';
    loginButton.style.display = 'block';
    loginButton.classList.remove('logged-in');
    loginButton.innerHTML = 'Login';
    quizButton.innerHTML = '<span class="quiz-icon">Inizia il Quiz</span>';
    exploreLink.style.display = 'block';
    localStorage.clear();
    window.isLoggedIn = false;
    location.reload();
    pulisciGalleria();
    pulisciStile();
    
    if(loginForm){
        loginForm.querySelectorAll('input').forEach(input=> input.value='');
    }
    const registerForm=document.querySelector('.register-form');
    if(registerForm){
        registerForm.querySelectorAll('input').forEach(input=> input.value='');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function pulisciGalleria() {
    if (galleria) galleria.innerHTML = '';
    if (sezioneImmagini) sezioneImmagini.style.display = 'none';
    resultsButton.textContent = 'Visualizza Risultati';
}

function pulisciStile() {
    document.querySelectorAll('.stile-container').forEach(el => {
        el.style.display = 'none';
    });
    resultsButton.textContent = 'Visualizza Risultati';
}

function handleQuizButtonClick() {
    if (isLoggedIn) {
        if (quizContainer) quizContainer.classList.add('visible');
    } else {
        loginPanel.classList.add('visible');
        if (quizContainer) quizContainer.classList.remove('visible');
        showAlert("⚠️" + "Prima ti devi loggare!");
    }
}

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

// per precompilare il campo email nel profile-edit-container (readonly)
function prefillProfileEmail() {
    const emailInput = document.getElementById('email');
    if (window.userEmail && emailInput) {
        emailInput.value = window.userEmail;
        emailInput.readOnly = true;
        emailInput.title = "L'email non può essere modificata";
    }
}