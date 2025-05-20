document.addEventListener('DOMContentLoaded', function () {
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    const aboutInner = document.getElementById('about-inner');
    const closeButton = document.querySelector('.close-button');
  
    aboutLink.addEventListener('click', function (e) {
      e.preventDefault();
      aboutSection.style.display = 'flex';
      document.querySelector('.genere-navigation').style.display = 'none';
    });

  
    aboutSection.addEventListener('click', function (e) {
      if (!aboutInner.contains(e.target)) {
        aboutSection.style.display = 'none';
        document.querySelector('.genere-navigation').style.display = 'flex';
      }
    });
  });
  