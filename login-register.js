document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.login-button');
    const loginPanel = document.querySelector('.login-panel');
    const registerPanel = document.querySelector('.register-panel');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const quizButton = document.querySelector('.quiz-button');
    const container = document.querySelector('.container');
    const areaPersonale = document.querySelector('.area-personale');
    const logoutButton = document.querySelector('.logout-button');

    let isLoggedIn = false;

    // Mostra l'area personale se settato da localStorage
    if (localStorage.getItem("showPersonalArea") === "true") {
        container.classList.add("invisible");
        areaPersonale.classList.add("visible");
        localStorage.removeItem("showPersonalArea");
    }

    function showError(message) {
        const error = document.createElement("div");
        error.classList.add("login-error");
        error.style.color = "red";
        error.textContent = message || "Errore";
        loginForm.prepend(error);
    }

    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (!isLoggedIn) {
            loginPanel.classList.toggle("visible");
            registerPanel.classList.remove("visible");
        } else {
            container.classList.add("invisible");
            areaPersonale.classList.add("visible");
        }
    });

    registerLink.addEventListener("click", function (e) {
        e.preventDefault();
        loginPanel.classList.remove("visible");
        registerPanel.classList.add("visible");
    });

    loginLink.addEventListener("click", function (e) {
        e.preventDefault();
        registerPanel.classList.remove("visible");
        loginPanel.classList.add("visible");
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();
        document.querySelector(".login-error")?.remove();

        if (email && password) {
            fetch("login.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email, password })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    isLoggedIn = true;
                    localStorage.setItem("userEmail", email);
                    loginButton.classList.add("logged-in");
                    loginButton.innerHTML = '<div class="user-icon"></div>';
                    quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
                    loginPanel.classList.remove("visible");
                    container.classList.add("invisible");
                    areaPersonale.classList.add("visible");
                    loginForm.reset();
                } else {
                    showError(data.message);
                }
            });
        }
    });

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = registerForm.querySelector('input[type="email"]').value.trim();
        const password = registerForm.querySelector('input[type="password"]').value.trim();
        document.querySelector(".login-error")?.remove();

        if (email && password) {
            fetch("register.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email, password })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    isLoggedIn = true;
                    localStorage.setItem("userEmail", email);
                    loginButton.classList.add("logged-in");
                    loginButton.innerHTML = '<div class="user-icon"></div>';
                    quizButton.innerHTML = '<div class="quiz-icon">Inizia il quiz</div>';
                    registerPanel.classList.remove("visible");

                    // Timeout per mostrare l’area personale con transizione
                    setTimeout(() => {
                        container.classList.add("invisible");
                        areaPersonale.classList.add("visible");
                    }, 500);

                    registerForm.reset();
                } else {
                    showError(data.message);
                }
            });
        }
    });

    logoutButton.addEventListener("click", function (e) {
        e.preventDefault();
        isLoggedIn = false;
        localStorage.removeItem("userEmail");
        loginButton.classList.remove("logged-in");
        loginButton.innerHTML = "Login";
        quizButton.innerHTML = '<div class="quiz-icon">Scopri il tuo stile</div>';
        container.classList.remove("invisible");
        areaPersonale.classList.remove("visible");
    });
});
