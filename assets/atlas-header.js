/* Language Atlas shared header: the same bar on every page.
   Load it as the FIRST thing inside <body> (not deferred), so the engine finds the display buttons:
     <script src="../assets/atlas-header.js"></script>
   It reads three tags from the page's <head>:
     <meta name="atlas-root"  content="../">                       path back to the site's home page ("All grades")
     <meta name="atlas-brand" content="Grade 1 Language Atlas">    the name shown in the bar (leave out on the home page)
     <meta name="atlas-math"  content="grade1/">                   which Math Atlas page the sister link opens (optional)
   Grade pages get the chapter links and the display buttons (text size, grown-up view). On phones and tablets these sit behind
   one "Menu" button, so a learning screen starts with the lesson, not the settings. On a computer the header is one row,
   and text size and grown-up view sit behind a small "Settings" button. The home page gets only the brand and the Math Atlas link. */
(function () {
  'use strict';
  var MATH = 'https://ontario-math-atlas.web.app/';
  function meta(n) { var m = document.querySelector('meta[name="' + n + '"]'); return m ? m.content : null; }
  var brand = meta('atlas-brand'), root = meta('atlas-root') || './', math = MATH + (meta('atlas-math') || '');
  var bar = document.createElement('header');
  bar.className = 'bar' + (brand ? '' : ' home');
  var sister = '<a class="sister" href="' + math + '" aria-label="Math Atlas, our sister site for math">Math Atlas <span aria-hidden="true">&rsaquo;</span></a>';
  bar.innerHTML = '<div class="wrap">' + (brand
    ? '<a class="brand" href="#home"><i aria-hidden="true">L</i>' + brand + '</a>' +
      '<button type="button" class="menub" id="menub" aria-expanded="false" aria-controls="more">Menu</button>' +
      '<div class="more" id="more"><a class="athome" href="' + root + '" aria-label="All grades: back to the Language Atlas home page"><span aria-hidden="true">&lsaquo;</span> All grades</a>' +
      '<nav aria-label="Main"><a href="#home">Chapters</a><a href="#check-up">Check-up</a><a href="#progress">My progress</a></nav>' + sister +
      '<button type="button" class="setb" id="setb" aria-expanded="false" aria-controls="tools">Settings</button>' +
      '<div class="tools" id="tools" role="group" aria-label="Display settings"><button type="button" id="bigb" aria-pressed="false">Text: normal</button>' +
      '<button type="button" id="adultb" aria-pressed="false" title="Shows coaching notes, like common mistakes, for a parent or tutor">Grown-up view: off</button></div></div>'
    : '<a class="brand" href="' + root + '"><i aria-hidden="true">L</i>Language Atlas</a><nav aria-label="Main"></nav>' + sister) + '</div>';
  var skip = document.createElement('a');
  skip.className = 'skip'; skip.href = '#app'; skip.textContent = 'Skip to content';
  /* pages route on the # part of the address, so the skip link moves focus itself instead of changing it */
  skip.addEventListener('click', function (e) { var m = document.getElementById('app'); if (m) { e.preventDefault(); m.focus(); } });
  /* the Menu (phones and tablets) and Settings (computers) buttons each open a panel; moving to another screen closes both */
  function toggler(id, cls) {
    var b = bar.querySelector('#' + id);
    function set(on) { bar.classList.toggle(cls, on); if (b) b.setAttribute('aria-expanded', String(on)); }
    if (b) b.addEventListener('click', function () { set(!bar.classList.contains(cls)); });
    return set;
  }
  var menu = toggler('menub', 'open'), sets = toggler('setb', 'sets');
  window.addEventListener('hashchange', function () { menu(false); sets(false); });
  document.body.insertBefore(bar, document.body.firstChild);
  document.body.insertBefore(skip, bar);
})();
