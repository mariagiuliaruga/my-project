document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
});

document.querySelector('.explore-link').addEventListener('click', function(e){
    e.preventDefault();

    const targetId = this.getAttribute('data-target');
    const targetContainer = document.getElementById(targetId);

    if(targetContainer){
        targetContainer.classList.add('visible');
    }

    window.scrollTo({ top: 0, behavior: 'smooth'});
});

// serve per far caricare l'area stili dall'alto

//window.funzione la rende globale
function showAlert(message) {
    const alertBox = document.getElementById('alert-box');
    alertBox.textContent = message;
    alertBox.classList.remove('hidden');
    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 3000);
};

document.addEventListener("keydown", function (e) {
    if (!window.isLoggedIn) return; // esce subito se non sei loggato

    // Ctrl+R o F5
    if ((e.key === "r" && e.ctrlKey) || e.key === "F5") {
        e.preventDefault(); // blocca il comportamento predefinito
        document.getElementById("reload-modal").style.display = "block";
    }
});

document.getElementById("confirm-reload").addEventListener("click", function () {
    location.reload(); // ricarica la pagina
});

document.getElementById("cancel-reload").addEventListener("click", function () {
    document.getElementById("reload-modal").style.display = "none";
});