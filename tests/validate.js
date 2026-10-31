/* Runs inside the page. Checks that every question must pass, whatever its type.
   Returns a list of problems (empty when the question is fine).
   Every auto-marked question must set meta.k, and tests/verify/gradeN.js must have an answer check with that key
   that works the answer out again in its own way. */
window.__validate = function (q) {
  const bad = [], strip = window.__H.strip;
  if (!q || typeof q !== 'object') return ['not a question object'];
  if (typeof q.q !== 'string' || !strip(q.q)) bad.push('no question text');
  const texts = [q.q, q.fig, q.hint, q.explain, q.prompt, q.answerText].concat(q.options || [], q.items || [], q.parts || [], q.steps || [], q.tiles || []).concat((q.pairs || []).flat()).concat(q.why ? q.why.options : []);
  texts.forEach(t => { if (t != null && /\bundefined\b|\bNaN\b|\[object Object\]|\bnull\b/.test(strip(t))) bad.push('text shows undefined/NaN/null: ' + strip(t).slice(0, 60)); });
  const uniq = a => new Set(a.map(x => /<svg|<img/.test(String(x)) ? String(x) : strip(x))).size === a.length;
  const idx = (j, n) => Number.isInteger(j) && j >= 0 && j < n;
  switch (q.type) {
    case 'mc': if (!Array.isArray(q.options) || q.options.length < 2) bad.push('mc needs 2+ options'); else { if (!idx(q.answer, q.options.length)) bad.push('mc answer index out of range'); if (!uniq(q.options)) bad.push('mc options repeat'); } break;
    case 'tap': {
      if (q.tiles) { if (q.tiles.length < 2) bad.push('tap needs 2+ tiles'); if (!idx(q.answer, q.tiles.length)) bad.push('tap tile answer out of range'); if (!uniq(q.tiles)) bad.push('tap tiles repeat'); }
      else { const d = document.createElement('div'); d.innerHTML = q.pic || ''; const keys = [...d.querySelectorAll('[data-hit]')].map(n => n.getAttribute('data-hit')); if (keys.length < 2) bad.push('tap picture needs 2+ data-hit parts'); [].concat(q.answer).forEach(a => { if (!keys.includes(String(a))) bad.push('tap answer ' + a + ' is not a part of the picture'); }); }
      break; }
    case 'pick': if (!Array.isArray(q.options) || !Array.isArray(q.answer) || !q.answer.length) bad.push('pick needs options and a non-empty answer list'); else { if (q.answer.some(j => !idx(j, q.options.length))) bad.push('pick answer out of range'); if (q.answer.length === q.options.length) bad.push('pick: every option is right'); if (!uniq(q.options)) bad.push('pick options repeat'); } break;
    case 'order': if (!Array.isArray(q.items) || q.items.length < 2) bad.push('order needs 2+ items'); else if (!uniq(q.items)) bad.push('order items repeat'); break;
    case 'build': if (!Array.isArray(q.parts) || !Array.isArray(q.answer) || q.answer.length < 2) bad.push('build needs parts and an answer of 2+ parts'); else { if (q.answer.some(j => !idx(j, q.parts.length)) || new Set(q.answer).size !== q.answer.length) bad.push('build answer is broken'); if (q.parts.length <= q.answer.length) bad.push('build needs at least one part that is not used'); if (!uniq(q.parts)) bad.push('build parts repeat'); } break;
    case 'match': if (!Array.isArray(q.pairs) || q.pairs.length < 2) bad.push('match needs 2+ pairs'); else if (!uniq(q.pairs.map(p => p[0])) || !uniq(q.pairs.map(p => p[1]))) bad.push('match cards repeat'); break;
    case 'tf': if (typeof q.answer !== 'boolean') bad.push('tf answer must be true or false'); if (q.why && !(Array.isArray(q.why.options) && idx(q.why.answer, q.why.options.length) && uniq(q.why.options))) bad.push('tf why is broken'); break;
    default: bad.push('unknown question type ' + q.type);
  }
  const k = q.meta && q.meta.k;
  if (!k) bad.push('no meta.k, so nothing checks its answer (every auto-marked question needs one)');
  else if (window.__verifyTwice[k]) bad.push('two answer checks share the key "' + k + '" (give each its own key)');
  else if (!window.__verify[k]) bad.push('no answer check written for meta.k "' + k + '"');
  else { try { const e = window.__verify[k](q, q.meta, window.__H); if (e) bad.push('wrong answer (' + k + '): ' + e); } catch (e) { bad.push('answer check crashed (' + k + '): ' + e.message); } }
  return bad;
};

/* helpers for answer checks: written separately from the site's code on purpose */
window.__H = {
  strip: h => { const d = document.createElement('div'); d.innerHTML = String(h); return d.textContent.replace(/\s+/g, ' ').trim(); },
  /* a sentence is written the right way when it starts with a capital letter and ends with . ? or ! */
  sentenceOk: s => /^[A-Z]/.test(s) && /[.?!]$/.test(s),
  /* words that start an asking sentence */
  askWords: ['Can', 'Is', 'Did', 'Do', 'Does', 'Where', 'Who', 'What', 'When', 'Why', 'How', 'Are', 'Will', 'May'],
  sameSet: (a, b) => a.length === b.length && a.slice().sort().join(',') === b.slice().sort().join(',')
};

/* every grade's answer checks share one list (all of tests/verify/ loads on every page), so a key used twice would
   silently replace another check. Keys used twice are remembered and fail the questions that use them. */
window.__verifyTwice = window.__verifyTwice || {};
window.__verify = window.__verify || new Proxy({}, { set(t, k, v) { if (k in t) window.__verifyTwice[k] = 1; t[k] = v; return true; } });
