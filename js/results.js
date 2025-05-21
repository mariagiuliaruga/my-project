document.addEventListener('DOMContentLoaded', function () {
    window.resultsButton = document.querySelector('.results-button');
    window.galleria = document.getElementById('galleria');
    window.sezioneImmagini = document.querySelector('.immagini-outfit');

    resultsButton.addEventListener('click', function (e) {
        e.preventDefault();
        // Se la galleria è visibile, nascondila
        if (sezioneImmagini.style.display === 'block') {
            sezioneImmagini.style.display = 'none';
            galleria.innerHTML = ''; // Pulisce anche le immagini se vuoi
            resultsButton.textContent = 'Visualizza Risultati';
        } else {
            document.querySelector('.immagini-outfit').style.display = 'block';
            resultsButton.textContent = 'Nascondi Risultati';
            fetch('php/get_immagini.php', { credentials: 'include' })
                .then(res => res.json())
                .then(data => {
                    if (data.errore) {
                        alert(data.messaggio);
                        return;
                    }

                    const galleria = document.getElementById('galleria');
                    galleria.innerHTML = ''; // PULISCE PRIMA

                    data.immagini.forEach(src => {
                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = "Outfit salvato";
                        img.style.maxWidth = '200px';
                        img.style.margin = '10px';
                        galleria.appendChild(img);
                    });
                })
                .catch(err => {
                    console.error(err);
                    alert('Errore nel caricamento delle immagini');
                });
        }
    });

});