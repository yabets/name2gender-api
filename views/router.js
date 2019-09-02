(function () {
  const main = document.querySelector('main');
  const nav = document.querySelector('nav-bar');
  const changeContent = () => {
    if (location.hash === '#home') {
      main.innerHTML = '<home-search></home-search>';
    } else if (location.hash === '#favorites') {
      main.innerHTML = '<fav-orite></fav-orite>';
    } else if (location.hash === '#login') {
      main.innerHTML = '<log-in></log-in>';
    } else {
      main.innerHTML = '<home-search></home-search>';
    }
    const active = location.hash === '' ? '#home' : location.hash;
    nav.setAttribute('active', active);
  };
  
  window.onhashchange = () => {
    changeContent();
  };
  window.onload = () => {
    changeContent();
  };
}());
