/* Grade 8 answer checks: forms, features and style (grade8/chapters/forms.js).
   Genres, patterns and narrators are worked out from the passage on screen with the checker's own rules; graphs are read from their
   numbers. Voice and other points of view are authored, so the checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const div = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d; };
  const card = q => { const p = div(q.fig).querySelector('.psg'); return { title: text(p.querySelector('.pt').innerHTML), heads: p.querySelectorAll('.psh').length, lines: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)) }; };
  const SATIRE = ['Introducing the SmartSpoon'], POEMS = ['Portage'];
  const genreOf = c => /^Dear /.test(c.lines[0]) ? 'letter to the editor' : c.heads ? 'information text' : SATIRE.includes(c.title) ? 'satire' : POEMS.includes(c.title) ? 'poem' : 'short story';
  const FEAT = { 'short story': 'characters', 'information text': 'headings', 'letter to the editor': 'greeting', satire: 'exaggeration', poem: 'short lines' };
  V['g8-genre'] = q => mk(q) === genreOf(card(q)) ? '' : 'it is a ' + genreOf(card(q));
  V['g8-genre-match'] = q => q.pairs.every(p => text(p[1]).includes(FEAT[text(p[0])])) ? '' : 'a form is matched to the wrong features';
  V['g8-genre-clue'] = q => mk(q).includes(FEAT[genreOf(card(q))]) ? '' : 'expected the features of a ' + genreOf(card(q));
  V['g8-genre-tf'] = (q, m) => (genreOf(card(q)) === m.said) === q.answer ? '' : 'true/false is wrong';
  const patternOf = s => /solution|To fix this|should/.test(s) ? 'problem and solution' : /Because|As a result/.test(s) ? 'cause and effect' : /on the other hand|However|Both/.test(s) ? 'compare and contrast' : /First|Later|Next/.test(s) ? 'time order' : '';
  V['g8-pattern'] = (q, m) => mk(q) === patternOf(text(m.s)) ? '' : 'expected ' + patternOf(text(m.s));
  V['g8-passage-pattern'] = q => { const c = card(q), all = c.lines.join(' ') + (div(q.fig).textContent); return mk(q) === patternOf(/A solution|should/.test(all) ? 'solution' : all) ? '' : 'wrong pattern'; };
  const JOB = { glossary: 'key words', infographic: 'pictures and numbers', sidebar: 'beside', caption: 'image', timeline: 'time order', heading: 'section' };
  V['g8-feature'] = (q, m) => mk(q).includes(JOB[m.f]) ? '' : 'expected the job of a ' + m.f;
  V['g8-glossary'] = q => mk(q) === 'in the glossary' && /: /.test(text(q.fig)) ? '' : 'a word and its meaning belong in the glossary';
  const bars = q => { const s = div(q.fig); return [...s.querySelectorAll('.val')].map((v, i) => [s.querySelectorAll('.lab')[i].textContent, +v.textContent]); };
  V['g8-graph-most'] = q => { const b = bars(q), top = b.reduce((a, x) => x[1] > a[1] ? x : a); return mk(q) === top[0] ? '' : 'the tallest value is ' + top[0]; };
  V['g8-misleading'] = q => { const lo = Math.min(...[...div(q.fig).querySelectorAll('.axis')].map(a => +a.textContent)); return mk(q).startsWith(lo === 0 ? 'No' : 'Yes') ? '' : 'the scale starts at ' + lo; };
  const VOICE = { 'The Calmest Player on the Team': 'boastful', 'Introducing the SmartSpoon': 'mock-serious', 'Letter to the Editor: Keep the Library Open': 'formal' };
  V['g8-voice-style'] = (q, m) => mk(q).startsWith(VOICE[m.t]) ? '' : 'expected ' + VOICE[m.t];
  /* sentence shape from the sentences themselves: many short ones, one long one, or the same start repeated */
  const shapeOf = s => { const ss = s.split(/(?<=\.) /), starts = ss.map(x => x.split(' ')[0]);
    return new Set(starts).size < ss.length ? 'repeated' : ss.length === 1 ? 'long sentence' : ss.every(x => x.split(' ').length <= 5) ? 'short sentences' : ''; };
  V['g8-shape'] = (q, m) => { const k = shapeOf(text(m.s)); return k && mk(q).includes(k) ? '' : 'expected the effect of ' + k; };
  V['g8-repeat'] = q => { const all = card(q).lines.join(' '), n = s => all.split(s).length - 1; return n(mk(q)) >= 2 && q.tiles.map(text).filter(t => n(t) >= 2).length === 1 ? '' : 'the words that repeat are not the ones marked'; };
  const povOf = c => { const all = c.lines.join(' '); return /Neither of them knew/.test(all) ? 'omniscient' : /\bI\b/.test(all.replace(/“[^”]*”/g, '')) ? 'unreliable' : 'limited'; };
  V['g8-narrator'] = q => mk(q) === povOf(card(q)) ? '' : 'expected ' + povOf(card(q));
  const SHOWS = { limited: 'pictured', omniscient: 'Neither of them', unreliable: 'imagine why' };
  V['g8-narrator-line'] = q => mk(q).includes(SHOWS[povOf(card(q))]) ? '' : 'expected the line with "' + SHOWS[povOf(card(q))] + '"';
  const ALT = { 'The Last Ferry': 'why he decided', 'The Calmest Player on the Team': 'why the narrator was benched', Breakup: 'only her thoughts' };
  V['g8-alt-pov'] = (q, m) => mk(q).includes(ALT[m.t]) ? '' : 'expected what the new narrator would add';
})();
