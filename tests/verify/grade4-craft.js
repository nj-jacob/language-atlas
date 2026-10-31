/* Grade 4 answer checks: how texts work (grade4/chapters/craft.js). The checker reads the pictures back (label positions, bar
   heights, which tag a tapped part is) and keeps its own lists for style and devices. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const JOB = { 'bold type': 'important word', 'a hyperlink': 'another page online', 'a caption': 'about a picture', 'a heading': 'one part', 'a glossary': 'hard words', italics: 'stand out' };
  V['g4-feature'] = (q, m) => mk(q).includes(JOB[m.f]) && q.options.filter(o => text(o).includes(JOB[m.f])).length === 1 ? '' : 'expected the job of ' + m.f;
  V['g4-feature-match'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a feature is matched to the wrong job';
  const doc = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d; };
  /* which tag shows each feature on the page */
  const TAG = { bold: 'B', italics: 'I', link: 'U', caption: 'SMALL', heading: 'B' };
  V['g4-tap-page'] = (q, m) => { const el = doc(q.pic).querySelector('[data-hit="' + q.answer + '"]'); if (!el) return 'no such part';
    const ok = el.tagName === TAG[m.want] && (m.want !== 'heading' || el.classList.contains('psh')) && (m.want !== 'bold' || !el.classList.contains('psh'));
    return ok && q.answer === m.want ? '' : 'the part marked is not ' + m.want; };
  /* spatial order: read the label heights from the diagram */
  const labels = h => [...doc(h).querySelectorAll('text')].map(t => [t.textContent, +t.getAttribute('y')]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
  V['g4-layers'] = q => q.items.map(text).join('|') === labels(q.fig).join('|') ? '' : 'not in top-to-bottom order';
  V['g4-layer-tap'] = (q, m) => { const l = labels(q.pic); return q.answer === (m.where === 'top' ? l[0] : l[l.length - 1]) ? '' : 'expected the ' + m.where + ' layer'; };
  /* the bar graph: the tallest or shortest bar */
  V['g4-graph'] = q => { const bars = [...doc(q.fig).querySelectorAll('rect')].map(r => [r.getAttribute('data-day'), +r.getAttribute('height')]), most = /most/.test(text(q.q));
    const pick = bars.slice().sort((a, b) => most ? b[1] - a[1] : a[1] - b[1]); return pick[0][1] !== pick[1][1] && mk(q) === pick[0][0] ? '' : 'expected ' + pick[0][0]; };
  V['g4-graph-why'] = q => mk(q).includes('compare') ? '' : 'expected comparing at a glance';
  const DESIGN = { 'a big, bold title': 'catches your eye', 'a photo of the real animal': 'really looks like', 'arrows in a diagram': 'order or direction', 'a map': 'where things are', 'a bar graph': 'compares amounts', 'a timeline': 'when things happened' };
  V['g4-design'] = (q, m) => mk(q).includes(DESIGN[m.d]) ? '' : 'expected the job of ' + m.d;
  V['g4-design-match'] = q => q.pairs.every(p => text(p[1]).includes(DESIGN[text(p[0])])) ? '' : 'a design is matched to the wrong job';
  /* a chatty voice asks, exclaims or uses talk words */
  const chatty = s => /[!?]|\blike\b|sooo|okay|going wild/.test(s);
  V['g4-voice'] = (q, m) => { const ok = q.options.map(text).filter(o => chatty(o) !== m.formal); return ok.length === 1 && mk(q) === ok[0] ? '' : 'the voice marked does not fit'; };
  /* suspense: short sentences, on average under 4 words */
  const avg = s => { const ss = s.split(/[.!?]/).filter(x => x.trim()); return s.split(' ').length / ss.length; };
  V['g4-suspense'] = q => { const ok = q.options.map(text).filter(o => avg(o) < 4); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the short, choppy sentences'; };
  V['g4-why-short'] = q => avg(text(q.fig)) < 4 && mk(q) === 'to build suspense' ? '' : 'expected to build suspense';
  const STRONG = new Set('slammed gobbled dashed drifted crackled'.split(' '));
  V['g4-strong-verb'] = q => STRONG.has(mk(q)) && q.tiles.map(text).filter(t => STRONG.has(t)).length === 1 ? '' : 'expected the strong verb';
  /* devices: the subject decides. Things that cannot act on their own, and animals doing what only people do. */
  const THING = /^(The old maple|The wind|The sun|The kettle|The stars|Thunder)\b/;
  const HUMAN = /stretches its arms|whispered|smiled|sang|winked|grumbled|glasses|forks|suitcase|drive/;
  const ANIMAL = /^(Crow|The crow|The bear|Rabbit|The rabbit|Two raccoons)\b/;
  const device = s => !HUMAN.test(s) ? null : THING.test(s) ? 'personification' : ANIMAL.test(s) ? 'anthropomorphism' : null;
  V['g4-person'] = q => { const ok = q.options.map(text).filter(o => device(o) === 'personification'); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the personification'; };
  V['g4-animal'] = q => { const ok = q.options.map(text).filter(o => device(o) === 'anthropomorphism'); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the animal acting like a person'; };
  V['g4-which-device'] = (q, m) => mk(q) === device(m.s) ? '' : 'expected ' + device(m.s);
  V['g4-device-pick'] = q => H.sameSet(q.options.map((o, i) => device(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the devices marked are not right';
})();
