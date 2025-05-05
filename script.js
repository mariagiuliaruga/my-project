document.addEventListener('DOMContentLoaded', function () {
    let isLoggedIn = false;

    const loginButton = document.querySelector('.login-button');
    const quizButton = document.querySelector('.quiz-button');
    const loginPanel = document.querySelector('.login-panel');
    const registerPanel = document.querySelector('.register-panel');
    const closeButtons = document.querySelectorAll('.close-button');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const profileEditContainer = document.querySelector('.profile-edit-container');
    const areaPersonale = document.querySelector('.area-personale');
    const container = document.querySelector('.container');
    const cancButton = document.querySelector('.cancel-button');
    const logoutButton = document.querySelector('.logout-button');
    const exploreLink = document.querySelector('.explore-link');
    const areaStili = document.querySelector('.area-stili');
    const menuButton = document.querySelector('.bottone');
    const menuTendina = document.querySelector('.menu-tendina');
    const profileButton = document.querySelector('.profile-button');

    // Mostra l'area personale dopo il login
    if (localStorage.getItem('showPersonalArea') === 'true') {
        container.classList.add('invisible');
        areaPersonale.classList.add('visible');
        localStorage.removeItem('showPersonalArea');
    }

    function handleUserIconClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            container.classList.add('invisible');
            areaPersonale.classList.add('visible');
            profileEditContainer.style.display = 'none';
            loginPanel.classList.remove('visible');
            registerPanel.classList.remove('visible');
        }
    }

    function handleBackToHome() {
        container.classList.remove('invisible');
        areaPersonale.classList.remove('visible');
        loginButton.style.display = 'block';
    }

    function handleLogout() {
        isLoggedIn = false;
        loginButton.classList.remove('logged-in');
        loginButton.innerHTML = 'Login';
        loginButton.style.display = 'block';
        quizButton.innerHTML = '<div class="quiz-icon">Scopri il tuo stile</div>';
        handleBackToHome();
    }

    function handleQuizButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            const quizContainer = document.querySelector('.quiz-container');
            if (quizContainer) quizContainer.classList.add('visible');
        } else {
            loginPanel.classList.add('visible');
        }
    }

    // Login con fetch
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            const password = this.querySelector('input[type="password"]').value.trim();
            document.querySelector('.login-error')?.remove();

            if (email && password) {
                fetch('login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email, password })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        isLoggedIn = true;
                        localStorage.setItem('userEmail', email);
                        loginButton.classList.add('logged-in');
                        loginButton.innerHTML = '<div class="user-icon"></div>';
                        quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
                        loginPanel.classList.remove('visible');
                        registerPanel.classList.remove('visible');
                        areaPersonale.classList.add('visible');
                        container.classList.add('invisible');
                        loginForm.reset();
                    } else {
                        showLoginError(data.message);
                    }
                });
            }
        });
    }

    // Registrazione con fetch
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            const password = this.querySelector('input[type="password"]').value.trim();

            if (email && password) {
                fetch('register.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email, password })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        isLoggedIn = true;
                        localStorage.setItem('userEmail', email);
                        loginButton.classList.add('logged-in');
                        loginButton.innerHTML = '<div class="user-icon"></div>';
                        quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
                        registerPanel.classList.remove('visible');
                        areaPersonale.classList.add('visible');
                        container.classList.add('invisible');
                        registerForm.reset();
                    } else {
                        showLoginError(data.message);
                    }
                });
            }
        });
    }

    function showLoginError(message) {
        const error = document.createElement('div');
        error.classList.add('login-error');
        error.style.color = 'red';
        error.textContent = message || 'Errore';
        loginForm?.querySelector('input[type="email"]')?.insertAdjacentElement('beforebegin', error);
    }

    loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isLoggedIn) {
            loginPanel.classList.toggle('visible');
            registerPanel.classList.remove('visible');
        } else {
            handleUserIconClick(e);
        }
    });

    quizButton.addEventListener('click', handleQuizButtonClick);

    closeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            this.closest('.login-panel, .register-panel, .forgot-password-panel')?.classList.remove('visible');
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

    profileButton?.addEventListener('click', function (e) {
        e.preventDefault();
        profileEditContainer.style.display = 'block';
        areaPersonale.classList.remove('visible');
    });

    cancButton?.addEventListener('click', function (e) {
        e.preventDefault();
        profileEditContainer.style.display = 'none';
        areaPersonale.classList.add('visible');
    });

    logoutButton?.addEventListener('click', function (e) {
        e.preventDefault();
        handleLogout();
    });

    exploreLink?.addEventListener('click', function (e) {
        e.preventDefault();
        container.style.display = 'none';
        areaStili.style.display = 'block';
    });

    // Menù a tendina
    menuButton?.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        menuTendina?.classList.toggle('visible');
    });

    document.addEventListener('click', function (e) {
        if (!menuButton.contains(e.target) && !menuTendina.contains(e.target)) {
            menuTendina?.classList.remove('visible');
        }
    });

    document.getElementById('profile-edit-form')?.addEventListener('submit', function (e) {
        e.preventDefault();
        profileEditContainer.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
