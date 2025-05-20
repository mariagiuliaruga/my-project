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

// funziona solo se scritto in questo punto. serve per far caricare l'area stili dall'alto
