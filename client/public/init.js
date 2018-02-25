if (navigator.userAgent.search("Chrome") > -1) {
  const e = document.createElement('link');
  e.href = '/androidChrome.css';
  e.rel = 'stylesheet';
  document.body.appendChild(e);
}
