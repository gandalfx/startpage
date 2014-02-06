
// start loading missing config right away
if (!localStorage.length) {
  var configScript = document.createElement('script');
  configScript.src = 'config.js';
  document.head.appendChild(configScript);
}

// init
var core;

window.addEventListener('load', function init() {
  core = new Core();
  new SearchBox();
  new PictureBox();
  new Menu('links');
}, false);
