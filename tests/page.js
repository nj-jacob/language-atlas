/* Runs inside the page: checks on what is showing on screen. */
window.__page = {
  /* the first thing that runs off the side of a phone screen, or '' */
  runsOff(root) {
    root = root || document.body;
    const W = window.innerWidth + 1;
    const e = [...root.querySelectorAll('*')].find(e => {
      if (e.closest('.tbl, .fig, .bar nav')) return false; /* these scroll sideways on purpose */
      const b = e.getBoundingClientRect();
      return b.width && b.right > W && getComputedStyle(e).visibility !== 'hidden';
    });
    if (e) return e.tagName.toLowerCase() + (e.getAttribute('class') ? '.' + e.getAttribute('class').split(' ')[0] : '') + ' "' + (e.textContent || '').trim().slice(0, 40) + '"';
    return document.documentElement.scrollWidth > W ? 'the page' : '';
  },
  /* numbers of 5 or more digits must have a space (12 500), Canadian style */
  bigNumbers() { const m = document.body.innerText.match(/\b\d{5,}\b/g); return m ? m.slice(0, 3).join(', ') : ''; },
  /* sound buttons: the recorded sounds a page plays, and any sound button put inside an answer choice (a choice is a button already) */
  sounds() {
    const b = [...document.querySelectorAll('.wsnd')];
    const inside = b.find(e => e.parentElement.closest('button, .qk-card, .qk-tile'));
    return { names: [...new Set(b.map(e => e.getAttribute('data-snd')))], inside: inside ? (inside.textContent || '').trim() : '' };
  },
  /* coaching notes and common mistakes: every one must be grown-up only, and none may show unless grown-up view is on */
  adultLeak() {
    const notMarked = [...document.querySelectorAll('.mistake, .coach')].filter(e => !e.classList.contains('adult-only'));
    if (notMarked.length) return 'a coaching box without the adult-only class: "' + notMarked[0].textContent.trim().slice(0, 50) + '"';
    if (document.documentElement.classList.contains('adult')) return '';
    const shown = [...document.querySelectorAll('.adult-only')].filter(e => e.getClientRects().length);
    return shown.length ? 'a grown-up note shows to the child: "' + shown[0].textContent.trim().slice(0, 50) + '"' : '';
  }
};
