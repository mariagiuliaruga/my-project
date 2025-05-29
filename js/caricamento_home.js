document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
});

// messaggi di alert personalizzati
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