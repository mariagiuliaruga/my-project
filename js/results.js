document.addEventListener('DOMContentLoaded', function () {
    window.resultsButton = document.querySelector('.results-button');
    window.galleria = document.getElementById('galleria');
    window.sezioneImmagini = document.querySelector('.immagini-outfit');
    window.areaRisultati = document.querySelector('.area-risultati');
    window.stiliContainer = document.getElementById('stili-container');

    resultsButton.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelectorAll('.stile-container').forEach(el => {
            el.style.display = 'none';
        });

        const isVisible = sezioneImmagini.style.display === 'block';

        sezioneImmagini.style.display = isVisible ? 'none' : 'block';
        stiliContainer.style.display = isVisible ? 'none' : 'block';
        areaRisultati.style.display = isVisible ? 'none' : 'block';
        resultsButton.textContent = isVisible ? 'Visualizza Risultati' : 'Nascondi Risultati';

        if (!isVisible) {
            // IMMAGINI
            fetch('php/get_immagini.php', { credentials: 'include' })
                .then(res => res.json())
                .then(data => {
                    if (data.errore) return alert(data.messaggio);

                    galleria.innerHTML = '';
                    data.immagini.forEach(src => {
                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = "Outfit salvato";
                        img.style.width = 'auto';
                        img.style.height = '500px';
                        img.style.margin = '10px';
                        galleria.appendChild(img);
                    });
                });

            // STILE
            fetch('php/get_stile.php', { credentials: 'include' })
                .then(res => res.json())
                .then(data => {
                    if (data.errore) return alert(data.messaggio);
                    
                    const stile = data.stile;
                     let targetId;

                    if (stile === "sporty") {
                        if (document.getElementById("stile-sportyMen")) {
                            targetId = "stile-sportyMen";
                        } else {
                            targetId = "stile-sportyWomen";
                        }
                    } else {
                        targetId = "stile-" + stile;
                    }

                    const target = document.getElementById(targetId);
                    if (target) target.style.display = 'block';

                });
        }
    });

});