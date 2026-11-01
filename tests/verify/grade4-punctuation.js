/* Grade 4 answer checks: capitals and punctuation (grade4/chapters/punctuation.js). Own word lists, worked out from what the child sees. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const PROPER = new Set('canadian italian inuit ontario japanese ethiopian french punjabi mexican greek jamaican chinese cree'.split(' '));
  const needsCap = w => PROPER.has(w.toLowerCase());
  /* right when every word from a name is capitalized, and nothing else in the middle is */
  const capsOk = s => s.replace(/[.!?]$/, '').split(' ').every((w, i) => i === 0 || /^[A-Z]/.test(w) === (needsCap(w) || /^(Friday)$/.test(w)));
  V['g4-tap-cap'] = q => needsCap(H.marked(q) || '') && q.tiles.map(text).filter(needsCap).length === 1 ? '' : 'expected the word made from a name';
  V['g4-cap-right'] = q => { const ok = q.options.map(text).filter(capsOk); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the sentence with only the right capitals'; };
  V['g4-cap-pick'] = q => H.sameSet(q.options.map((o, i) => needsCap(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words from names are not the ones marked';
  const FROM = { Canada: 'Canadian', Italy: 'Italian', Japan: 'Japanese', Mexico: 'Mexican', Ethiopia: 'Ethiopian', Greece: 'Greek', Jamaica: 'Jamaican', China: 'Chinese' };
  V['g4-cap-tf'] = (q, m) => capsOk(text(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  V['g4-cap-match'] = q => q.pairs.every(p => FROM[text(p[0])] === text(p[1])) ? '' : 'a place is matched to the wrong word';
  /* direct address: the name is set off by a comma, before it at the end or after it at the start */
  const NAMES = ['Kai', 'Ms. Lee', 'Omar', 'Grandma', 'Mateo', 'Zara', 'Mr. Singh'];
  const SPOKEN = /^(Kai please|Thank you Ms|Can you help me Omar|Grandma look at|Mateo your|Hurry up Zara|Do you know the way Mr|Ayesha are you|Good morning Coach|Liam don't|Look out Noah)/;
  const addrOk = (s, n) => s.startsWith(n + ', ') || s.replace(/[.!?]$/, '').endsWith(', ' + n);
  V['g4-addr-right'] = (q, m) => { const ok = q.options.map(text).filter(o => addrOk(o, m.name) && (o.match(/,/g) || []).length === 1); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the comma next to ' + m.name; };
  V['g4-addr-tap'] = (q, m) => { const t = q.tiles.map(text), i = t.indexOf(m.name); const want = i === 0 ? i : i - 1; return q.answer === want && addrOk(m.s, m.name) ? '' : 'the comma goes after ' + t[want]; };
  V['g4-addr-tf'] = (q, m) => SPOKEN.test(m.s) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g4-addr-who'] = (q, m) => { const s = text(m.s), spoken = SPOKEN.test(s.replace(', ', ' ')); return mk(q) === (spoken ? NAMES.concat(['Ayesha', 'Coach', 'Liam', 'Noah']).find(n => s.includes(n)) : 'nobody') ? '' : 'expected ' + (spoken ? 'the name' : 'nobody'); };
  V['g4-addr-pick'] = q => H.sameSet(q.options.map((o, i) => SPOKEN.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the sentences with someone spoken to are not the ones marked';
  /* titles: the checker's own list of short-work titles */
  const TITLES = ['Paddle Song', 'Snow Day', 'How Bees Make Honey', 'The Lost Mitten', 'A Long Walk Home', "My Grandpa's Boat", 'Northern Lights', 'Saving the Monarchs', 'The Night Owl', 'Into the Woods'];
  const KIND = { 'Paddle Song': 'song', 'Snow Day': 'poem', 'How Bees Make Honey': 'article', 'The Lost Mitten': 'short story', 'A Long Walk Home': 'chapter', "My Grandpa's Boat": 'poem',
    'Northern Lights': 'song', 'Saving the Monarchs': 'article', 'The Night Owl': 'short story', 'Into the Woods': 'chapter' };
  const titleIn = s => TITLES.find(t => s.includes(t));
  const quotedOk = s => { const t = titleIn(s); return !!t && s.includes('“' + t + '”') && (s.match(/“/g) || []).length === 1; };
  V['g4-title-right'] = q => { const ok = q.options.map(text).filter(quotedOk); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the title in quotation marks'; };
  V['g4-title-tap'] = q => TITLES.includes(mk(q)) ? '' : 'expected the title';
  V['g4-title-tf'] = (q, m) => quotedOk(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g4-title-kind'] = (q, m) => mk(q) === KIND[text(m.title)] ? '' : 'expected ' + KIND[text(m.title)];
  V['g4-title-pick'] = q => H.sameSet(q.options.map((o, i) => titleIn(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the sentences with titles are not the ones marked';
})();
