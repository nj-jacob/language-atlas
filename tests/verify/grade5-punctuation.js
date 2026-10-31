/* Grade 5 answer checks: capitals and punctuation (grade5/chapters/punctuation.js). The checker keeps its own lists of the extra words in
   each sentence, of complete sentences that may come before a colon, and of names that need capitals. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const APPOS = ['a pilot', 'our coach', 'the largest of the Great Lakes', 'our old dog', 'the town vet', 'a city by the ocean', 'my older sister'];
  const PART = ['Smiling', 'Laughing at the joke', 'Holding the map', 'Shivering in the wind', 'Carrying a heavy box', 'Paddling hard'];
  /* right: the renaming words have a comma on each side, or the -ing phrase is followed by a comma, and there are no other commas */
  const appOk = s => { const a = APPOS.find(x => s.includes(x)); return !!a && s.includes(', ' + a + ', ') && (s.match(/,/g) || []).length === 2; };
  const partOk = s => { const p = PART.find(x => s.startsWith(x)); return !!p && s.startsWith(p + ', ') && (s.match(/,/g) || []).length === 1 && !/,\.$/.test(s); };
  const commaOk = s => appOk(s) || partOk(s);
  V['g5-appositive'] = q => { const ok = q.options.map(text).filter(appOk); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with commas around the renaming words'; };
  V['g5-find-app'] = q => APPOS.includes(mk(q)) ? '' : 'expected the renaming words';
  V['g5-participle'] = q => { const ok = q.options.map(text).filter(partOk); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the comma after the -ing phrase'; };
  V['g5-comma-tf'] = (q, m) => commaOk(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g5-pick-commas'] = q => H.sameSet(q.options.map((o, i) => commaOk(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right sentences are not the ones marked';
  const COMPLETE = ['Pack three things for the hike', 'We saw four animals at the pond', 'Our team needs these players', 'Grandma grows three herbs', 'The flag has two colours'];
  const colOk = s => s.includes(':') && COMPLETE.includes(s.split(':')[0]);
  V['g5-colon'] = q => { const ok = q.options.map(text).filter(colOk); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the colon after a complete sentence'; };
  V['g5-colon-tf'] = (q, m) => colOk(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  const NAMES = ['Lake', 'Nipissing', 'Ojibwe', 'English', 'Ottawa', 'River', 'Maple', 'Street', 'Nova', 'Scotia', 'Canadian', 'Museum', 'History', 'July'];
  /* a word needs a capital when its capitalized form is a name the checker knows and it is written small */
  const needs = w => /^[a-z]/.test(w) && NAMES.includes(w.charAt(0).toUpperCase() + w.slice(1));
  V['g5-cap-word'] = q => { const ok = q.tiles.map(text).filter(needs); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the name written small'; };
  V['g5-cap-fixed'] = q => { const ok = q.options.map(text).filter(o => !o.replace(/\.$/, '').split(' ').some(needs)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with every name capitalized'; };
})();
