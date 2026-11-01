/* Grade 4 answer checks: how texts work (grade4/chapters/craft.js). The checker reads the pictures back (label positions, bar
   heights, which tag a tapped part is) and keeps its own lists for style and devices. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'true or false is wrong';

  /* ---------- features ---------- */
  const JOB = { 'bold type': 'important word', 'a hyperlink': 'another page online', 'a caption': 'about a picture', 'a heading': 'one part', 'a glossary': 'hard words', italics: 'stand out',
    'a table of contents': 'each part starts', 'a label': 'part of a picture' };
  const jobOf = s => Object.keys(JOB).find(f => text(s).includes(JOB[f]));
  V['g4-feature'] = (q, m) => mk(q).includes(JOB[m.f]) && q.options.filter(o => text(o).includes(JOB[m.f])).length === 1 ? '' : 'expected the job of ' + m.f;
  V['g4-feature-for'] = (q, m) => mk(q) === jobOf(m.job) ? '' : 'expected ' + jobOf(m.job);
  V['g4-feature-match'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a feature is matched to the wrong job';
  V['g4-feature-tf'] = (q, m) => tf(q, text(m.job).includes(JOB[m.f]));
  const doc = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d; };
  /* which tag shows each feature on the page */
  const TAG = { bold: 'B', italics: 'I', link: 'U', caption: 'SMALL', heading: 'B' };
  V['g4-tap-page'] = (q, m) => { const el = doc(q.pic).querySelector('[data-hit="' + q.answer + '"]'); if (!el) return 'no such part';
    const ok = el.tagName === TAG[m.want] && (m.want !== 'heading' || el.classList.contains('psh')) && (m.want !== 'bold' || !el.classList.contains('psh'));
    return ok && q.answer === m.want ? '' : 'the part marked is not ' + m.want; };

  /* ---------- diagrams: read the label positions; labels in a column are read top to bottom, in a row left to right ---------- */
  const labels = h => { const t = [...doc(h).querySelectorAll('text')].map(x => [x.textContent, +x.getAttribute('x'), +x.getAttribute('y')]);
    const down = t.every(x => x[1] === t[0][1]); return { down, parts: t.sort((a, b) => down ? a[2] - b[2] : a[1] - b[1]).map(x => x[0]) }; };
  V['g4-parts-order'] = q => { const l = labels(q.fig).parts, at = q.items.map(i => l.indexOf(text(i))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'not in the order of the diagram'; };
  V['g4-part-tap'] = (q, m) => { const l = labels(q.pic).parts; return q.answer === (m.start ? l[0] : l[l.length - 1]) ? '' : 'expected the ' + (m.start ? 'first' : 'last') + ' part'; };
  V['g4-which-way'] = q => mk(q) === (labels(q.fig).down ? 'top to bottom' : 'left to right') ? '' : 'the way marked does not fit the diagram';
  V['g4-part-next'] = (q, m) => { const l = labels(q.fig).parts; return mk(q) === l[l.indexOf(m.after) + 1] ? '' : 'expected ' + l[l.indexOf(m.after) + 1]; };

  /* ---------- graphs: bar heights (14 units of height for each 1 on the scale) ---------- */
  const bars = q => [...doc(q.fig).querySelectorAll('rect')].map(r => [r.getAttribute('data-day'), +r.getAttribute('height') / 14]);
  V['g4-graph'] = q => { const most = /highest/.test(text(q.q)), b = bars(q).sort((x, y) => most ? y[1] - x[1] : x[1] - y[1]); return b[0][1] !== b[1][1] && mk(q) === b[0][0] ? '' : 'expected ' + b[0][0]; };
  V['g4-graph-count'] = (q, m) => { const b = bars(q).find(x => x[0] === m.day); return b && +mk(q) === b[1] ? '' : 'expected ' + (b && b[1]); };
  V['g4-graph-why'] = q => mk(q).includes('compare') ? '' : 'expected comparing at a glance';
  const DESIGN = { 'a big, bold title': 'catches your eye', 'a photo of the real animal': 'really looks like', 'arrows in a diagram': 'order or direction', 'a map': 'where things are', 'a bar graph': 'compares amounts',
    'a timeline': 'when things happened', 'a close-up picture': 'small details', 'bright colours on a poster': 'far away' };
  V['g4-design'] = (q, m) => mk(q).includes(DESIGN[m.d]) ? '' : 'expected the job of ' + m.d;
  V['g4-design-match'] = q => q.pairs.every(p => text(p[1]).includes(DESIGN[text(p[0])])) ? '' : 'a design is matched to the wrong job';

  /* ---------- voice and word choice: a chatty voice asks, exclaims or uses talk words ---------- */
  const chatty = s => /[!?]|\b(like|hey|whoa|super|hurry|okay|so much)\b|sooo|going wild/i.test(s);
  V['g4-voice'] = (q, m) => { const ok = q.options.map(text).filter(o => chatty(o) !== m.formal); return ok.length === 1 && mk(q) === ok[0] ? '' : 'the voice marked does not fit'; };
  V['g4-voice-where'] = (q, m) => mk(q) === (chatty(text(m.s)) ? 'a text message to a friend' : 'an information book') ? '' : 'the place marked does not fit the voice';
  const STRONG = new Set('slammed gobbled dashed drifted crackled shrieked glided rumbled snatched trudged'.split(' '));
  V['g4-strong-verb'] = q => STRONG.has(mk(q)) && q.tiles.map(text).filter(t => STRONG.has(t)).length === 1 ? '' : 'expected the strong verb';
  V['g4-verb-tf'] = (q, m) => tf(q, STRONG.has(text(m.w)));

  /* ---------- sentence length: short, choppy sentences are under 4 words on average ---------- */
  const avg = s => { const ss = s.split(/[.!?]/).filter(x => x.trim()); return s.split(' ').length / ss.length; };
  V['g4-suspense'] = q => { const ok = q.options.map(text).filter(o => avg(o) < 4); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the short, choppy sentences'; };
  V['g4-calm'] = q => { const ok = q.options.map(text).filter(o => avg(o) > 8); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the long, flowing sentence'; };
  V['g4-why-short'] = q => avg(text(q.fig)) < 4 && mk(q) === 'to build suspense' ? '' : 'expected to build suspense';
  V['g4-style-tf'] = (q, m) => { const tense = avg(text(m.s)) < 4; return q.answer === ((m.said === 'tense') === tense) && q.why.answer === (tense ? 0 : 1) ? '' : 'true or false is wrong'; };
  /* a word pattern: a word said twice in a row or more, or four or more words starting with the same letter */
  const patterned = s => { const w = s.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(Boolean), first = {};
    w.forEach(x => { first[x[0]] = (first[x[0]] || 0) + 1; }); return w.some((x, i) => w.indexOf(x) !== i && x.length > 3) || Object.values(first).some(n => n >= 4); };
  V['g4-pattern'] = q => { const ok = q.options.map(text).filter(patterned); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with a word pattern'; };

  /* ---------- devices: the subject decides. Things that cannot act on their own, and animals doing what only people do ---------- */
  const THING = /^(The old maple|The wind|The sun|The kettle|The stars|Thunder|The old car|The waves|My alarm clock|The flowers)\b/;
  const HUMAN = /\b(stretches|whispered|smiled|sang|winked|grumbled|coughed|danced|yelled|nodded|glasses|forks|suitcase|drive|said|wrote|read a map|opened a bank)\b/;
  const ANIMAL = /^(Crow|The crow|The bear|Rabbit|The rabbit|Two raccoons|Otter|The otter|Moose|The moose|Goose|The goose|Squirrel|The squirrel)\b/;
  const device = s => !HUMAN.test(s) ? null : THING.test(s) ? 'personification' : ANIMAL.test(s) ? 'anthropomorphism' : null;
  V['g4-person'] = q => { const ok = q.options.map(text).filter(o => device(o) === 'personification'); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the personification'; };
  V['g4-person-word'] = q => HUMAN.test(mk(q)) && q.tiles.map(text).filter(t => HUMAN.test(t)).length === 1 && text(q.fig).includes(mk(q)) ? '' : 'expected the human action';
  V['g4-person-tf'] = (q, m) => tf(q, device(text(m.s)) === 'personification');
  V['g4-person-why'] = q => /alive/.test(mk(q)) ? '' : 'expected: it makes the thing feel alive';
  V['g4-animal'] = q => { const ok = q.options.map(text).filter(o => device(o) === 'anthropomorphism'); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the animal acting like a person'; };
  V['g4-which-device'] = (q, m) => mk(q) === device(text(m.s)) ? '' : 'expected ' + device(text(m.s));
  V['g4-animal-part'] = (q, m) => HUMAN.test(mk(q)) && text(m.s).includes(mk(q)) && device(text(m.s)) === 'anthropomorphism' ? '' : 'expected the part a real animal could not do';
  V['g4-animal-tf'] = (q, m) => tf(q, device(text(m.s)) === 'anthropomorphism');
  V['g4-animal-why'] = q => /lesson/.test(mk(q)) ? '' : 'expected: animals make the lesson easy to see';
})();
