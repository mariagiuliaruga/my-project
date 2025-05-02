document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-button');
    const loginPanel = document.querySelector('.login-panel');
    const registerPanel = document.querySelector('.register-panel');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const closeButtons = document.querySelectorAll('.close-button');
    const quizButton = document.querySelector('.quiz-button');
    const container = document.querySelector('.container');
    const profileEditButton = document.querySelector('.profile-edit-button');
    const profileCancButton = document.querySelector('.cancel-button');
    
    const areaPersonale = document.querySelector('.area-personale');
    const profileEditContainer = document.querySelector('.profile-edit-container');

    let isLoggedIn = false;

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
            loginButton.style.display = 'none';
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
        
        loginButton.removeEventListener('click', handleUserIconClick);
        quizButton.removeEventListener('click', handleQuizButtonClick);
        
        handleBackToHome();
    }

    function handleQuizButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            const quizContainer = document.querySelector('.quiz-container');
            quizContainer.classList.add('visible');
            loginPanel.classList.remove('visible');
        } else {
            loginPanel.classList.add('visible');
        }
    }

    function handleProfileButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (areaPersonale.classList.contains('visible')) {
            areaPersonale.classList.remove('visible');
            profileEditContainer.classList.add('visible');
        }
    }


    function handleProfileCancButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (profileEditContainer.classList.contains('visible')) {
            areaPersonale.classList.add('visible');
            profileEditContainer.classList.remove('visible');
        }
    }

    if (profileEditButton) {
        profileEditButton.addEventListener('click', handleProfileButtonClick);
    }

    if (profileCancButton){
        profileCancButton.addEventListener('click', handleProfileCancButtonClick);
    }

    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn) {
            loginPanel.classList.toggle('visible');
            registerPanel.classList.remove('visible');
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const panel = this.closest('.login-panel, .register-panel');
            panel.classList.remove('visible');
        });
    });

    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        loginPanel.classList.remove('visible');
        registerPanel.classList.add('visible');
    });

    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        registerPanel.classList.remove('visible');
        loginPanel.classList.add('visible');
    });

   

    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    const menuTendinaContainer = document.querySelector('.menu-tendina');
    if (menuTendinaContainer) {
        const resetLink = menuTendinaContainer.querySelector('a[href="#"]:nth-child(2)');
        if (resetLink) {
            resetLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleLogout();
            });
        }
    }

    const menuTendina = document.querySelector('.menu-tendina');
    if (menuTendina) {
        const homeLink = menuTendina.querySelector('a[href="index.html"]');
        if (homeLink) {
            homeLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleBackToHome();
            });
        }
    }

    const menuButton = document.querySelector('.bottone');
    if (menuButton) {
        menuButton.removeEventListener('click', function() {}); // Assicurati di rimuovere l'eventuale listener precedente
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const menuTendina = this.querySelector('.menu-tendina');
            if (menuTendina) {
                document.querySelectorAll('.menu-tendina').forEach(menu => {
                    if (menu !== menuTendina) {
                        menu.classList.remove('visible');
                    }
                });
                menuTendina.classList.toggle('visible');
            }
        });
    }

    document.addEventListener('click', function(e) {
        const menuTendina = document.querySelector('.menu-tendina');
        const menuButton = document.querySelector('.bottone');
        if (menuTendina && menuButton && !menuButton.contains(e.target) && !menuTendina.contains(e.target)) {
            menuTendina.classList.remove('visible');
        }
    });

    document.addEventListener('touchstart', function(e) {
        const menuTendina = document.querySelector('.menu-tendina');
        const menuButton = document.querySelector('.bottone');
        if (menuTendina && menuButton && !menuButton.contains(e.target) && !menuTendina.contains(e.target)) {
            menuTendina.classList.remove('visible');
        }
    });
});
