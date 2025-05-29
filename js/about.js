document.addEventListener('DOMContentLoaded', function () {
    window.aboutSection = document.getElementById('about-section');
    const aboutLink = document.getElementById('about-link');
    const aboutInner = document.getElementById('about-inner');
  
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
  