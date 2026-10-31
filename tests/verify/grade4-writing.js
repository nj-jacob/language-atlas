/* Grade 4 answer checks: writing (grade4/chapters/writing.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* the form -> words only the fitting line has */
  const TONE = [[/thank-you/, /^Thank you for teaching/], [/persuasive/, /^Please build/], [/report/, /through the crust/], [/get-well/, /Feel better/]];
  V['g4-tone'] = (q, m) => { const t = TONE.find(([re]) => re.test(m.form)); return t && t[1].test(mk(q)) ? '' : 'the line does not fit ' + m.form; };
  V['g4-to-third'] = q => /^(He|She|They|His|Her|Their)\b/.test(mk(q)) && !/\b(I|my|My|we|We|you|You|your|Your)\b/.test(mk(q)) ? '' : 'not third person: ' + mk(q);
  const ONESIDED = /\b(best|worst|everyone|only|hates)\b/i;
  V['g4-fairer'] = q => !ONESIDED.test(mk(q)) && !/!$/.test(mk(q)) ? '' : 'still one-sided: ' + mk(q);
  const first = s => /\b(I|My|my|We|we)\b/.test(text(s));
  V['g4-pov-tf'] = (q, m) => first(m.s) === q.answer && /I, my or we/.test(text(q.why.options[q.why.answer])) === first(m.s) ? '' : 'first person is marked wrong for ' + m.s;
  const OFF = /red bike|Pizza|dog likes/;
  V['g4-off-topic'] = q => OFF.test(mk(q)) ? '' : 'that sentence belongs';
  V['g4-belongs'] = (q, m) => !OFF.test(m.s) === q.answer ? '' : 'belongs is marked wrong for ' + m.s;
  V['g4-add-detail'] = q => /leaves|Thunder|drums/.test(mk(q)) ? '' : 'that sentence adds no detail';
  const EXACT = ['glowing', 'steaming', 'wriggly', 'hilarious'];
  V['g4-exact-word'] = q => EXACT.includes(mk(q)) ? '' : mk(q) + ' is a plain word';
  /* every mistake in the editing sentences */
  const WRONG = /\b(hopeing|boxs|has went|canadian|it's tail|They was|geese has|bestest)\b/;
  const WORDS = ['hopeing', 'boxs', 'went', 'canadian', "it's", 'was', 'has', 'bestest'];
  V['g4-tap-error'] = (q, m) => WORDS.includes(mk(q)) && WRONG.test(text(m.s)) ? '' : mk(q) + ' is not the mistake';
  V['g4-fix-it'] = q => !WRONG.test(mk(q)) && /\.$/.test(mk(q)) ? '' : 'still has a mistake: ' + mk(q);
  V['g4-edit-tf'] = (q, m) => !WRONG.test(text(m.s)) === q.answer ? '' : 'ready is marked wrong for ' + m.s;
  const TOOLS = { 'find spelling mistakes': 'spell check', 'take back a change': 'the undo button', 'move a sentence': 'cut and paste', 'find a word you used too often': 'find (Ctrl + F)' };
  V['g4-tools'] = q => q.pairs.every(p => TOOLS[text(p[0])] === text(p[1])) ? '' : 'a job is matched to the wrong tool';
})();
