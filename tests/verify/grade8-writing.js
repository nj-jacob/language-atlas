/* Grade 8 answer checks: drafting, revising and publishing (grade8/chapters/writing.js). Own rules and key lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const STYLE = { 'a lab report': /80 degrees/, 'a message to your best friend': /Can't believe/, 'a cover letter for a summer job': /reliable and eager/, 'a suspense story': /creaked/, 'a speech to persuade the school council': /deserves/ };
  V['g8-style'] = (q, m) => STYLE[m.form].test(mk(q)) && q.options.map(text).filter(o => STYLE[m.form].test(o)).length === 1 ? '' : 'expected the sentence that suits ' + m.form;
  V['g8-match-style'] = q => q.pairs.every(p => STYLE[text(p[1])] && STYLE[text(p[1])].test(text(p[0]))) ? '' : 'a sentence is matched to the wrong text';
  const fair = s => /^(Some|Others)\b.*\b(worry|argue|may)\b/.test(s);
  V['g8-counter'] = q => fair(mk(q)) && q.options.map(text).filter(fair).length === 1 ? '' : 'expected the sentence that acknowledges another view';
  const LOADED = /\b(ridiculous|whiny|greedy|fool|dumped)\b/;
  V['g8-neutral'] = q => !LOADED.test(mk(q)) && q.options.map(text).filter(o => !LOADED.test(o)).length === 1 ? '' : 'expected the neutral sentence';
  V['g8-loaded'] = q => LOADED.test(mk(q)) ? '' : 'the loaded word is not the one marked';
  /* off topic: the sentence that shares no key word with the first sentence's topic */
  const TOPIC = [/skate|park|ramps/, /[Ww]etland|water|floods/, /[Rr]ead|words|vocabulary/];
  V['g8-off-topic'] = q => { const lines = [...(() => { const d = document.createElement('div'); d.innerHTML = q.fig; return d.querySelectorAll('p'); })()].map(p => text(p.innerHTML)), t = TOPIC.find(r => r.test(lines[0]));
    const off = lines.slice(1).filter(l => !t.test(l) && !/^(They|Over time|Readers)\b/.test(l)); return off.length === 1 && mk(q) === off[0] ? '' : 'the off-topic sentence is ' + off.join(' | '); };
  /* the best combination keeps every content word of the choppy version and names the subject once */
  const STOP = new Set('the was a and by at of'.split(' '));
  const content = s => s.toLowerCase().replace(/[.,]/g, '').split(' ').filter(w => !STOP.has(w));
  V['g8-combine-rev'] = (q, m) => { const need = new Set(content(text(m.s))), subj = text(m.s).split(' ').slice(0, 2).join(' ').replace(/^The /, '').toLowerCase().split(' ')[0];
    const ok = o => [...need].every(w => content(o).includes(w)) && content(o).filter(w => w === subj).length === 1; return ok(mk(q)) && q.options.map(text).filter(ok).length === 1 ? '' : 'expected the smooth combination'; };
  const ORDER = [['Bike lanes make', 'They separate', 'In cities', 'Our town should'], ['Composting cuts', 'Food scraps', 'In a compost bin', 'Every family']];
  V['g8-reorder'] = q => { const o = ORDER.find(x => text(q.items[0]).startsWith(x[0]) || q.items.some(i => text(i).startsWith(x[0]))); return o && q.items.every((it, i) => text(it).startsWith(o[i])) ? '' : 'the paragraph is not in a logical order'; };
  const FEED = [[/lost in the middle/, 'the middle'], [/start is slow/, 'the opening'], [/ending felt sudden/, 'the ending']];
  V['g8-feedback'] = (q, m) => { const f = FEED.find(x => x[0].test(text(m.said))); return f && mk(q) === f[1] ? '' : 'expected ' + (f && f[1]); };
  /* sound-alike words used wrongly: the checker's own rules */
  const WRONG = [[/^Their going/, 'Their'], [/wagged it's/, "it's"], [/will effect/, 'effect'], [/walked passed/, 'passed'], [/^Your welcome/, 'Your'], [/lost there/, 'there']];
  const wrongWord = s => (WRONG.find(w => w[0].test(s)) || [])[1];
  V['g8-homophone'] = (q, m) => mk(q) === wrongWord(text(m.s)) ? '' : 'the wrong word is ' + wrongWord(text(m.s));
  V['g8-homo-fix'] = q => !wrongWord(mk(q)) && q.options.map(text).filter(o => !wrongWord(o)).length === 1 ? '' : 'expected the correct sentence';
  const KIND = [[/students was|players have/, 'grammar'], [/going\.$|are, /, 'punctuation'], [/recieved|experement/, 'spelling']];
  V['g8-err-kind'] = (q, m) => { const k = KIND.find(x => x[0].test(text(m.s))); return k && mk(q) === k[1] ? '' : 'expected ' + (k && k[1]); };
  const TOOL = [[/without erasing/, 'track changes'], [/too many times/, 'thesaurus'], [/look the same/, 'heading styles'], [/under 500 words/, 'word count']];
  V['g8-tool'] = (q, m) => { const t = TOOL.find(x => x[0].test(text(m.need))); return t && mk(q).includes(t[1]) ? '' : 'expected ' + (t && t[1]); };
})();
