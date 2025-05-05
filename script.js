document.addEventListener('DOMContentLoaded', function () {
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
    const quizButton = document.querySelector('.quiz-button');

    let isLoggedIn = !!localStorage.getItem('userEmail');

    // Mostra l'area personale dopo il login (se flag salvato da login-register.js)
    if (localStorage.getItem('showPersonalArea') === 'true') {
        container.classList.add('invisible');
        areaPersonale.classList.add('visible');
        localStorage.removeItem('showPersonalArea');
    }

    function handleLogout() {
        isLoggedIn = false;
        localStorage.removeItem('userEmail');
        const loginButton = document.querySelector('.login-button');
        loginButton.classList.remove('logged-in');
        loginButton.innerHTML = 'Login';
        loginButton.style.display = 'block';
        quizButton.innerHTML = '<div class="quiz-icon">Scopri il tuo stile</div>';
        container.classList.remove('invisible');
        areaPersonale.classList.remove('visible');
    }

    function handleQuizButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isLoggedIn) {
            const quizContainer = document.querySelector('.quiz-container');
            if (quizContainer) quizContainer.classList.add('visible');
        } else {
            const loginPanel = document.querySelector('.login-panel');
            loginPanel.classList.add('visible');
        }
    }

    quizButton?.addEventListener('click', handleQuizButtonClick);

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
