/* Grade 4 answer checks: writing (grade4/chapters/writing.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* the form -> words only the fitting line has */
  const TONE = [[/guest speaker/, /^Thank you for teaching/], [/mayor/, /^Please build/], [/volcanoes/, /through the crust/], [/get-well/, /Feel better/], [/sweater/, /^Thank you for the cozy/],
    [/principal/, /^Please give us/], [/loons/, /^Loons dive under/], [/moving away/, /Please write to me/], [/bannock/, /^First, mix/], [/planting a seed/, /^Next, push/]];
  const fits = (form, line) => { const t = TONE.find(([re]) => re.test(form)); return !!t && t[1].test(line); };
  const KIND = f => /thank/.test(f) ? 'warm and thankful' : /persuasive/.test(f) ? 'polite and convincing' : /report/.test(f) ? 'calm and factual' : /get-well|moving/.test(f) ? 'kind and caring' : /instructions/.test(f) ? 'clear and step by step' : null;
  V['g4-tone'] = (q, m) => fits(m.form, mk(q)) ? '' : 'the line does not fit ' + m.form;
  V['g4-tone-tf'] = (q, m) => fits(m.form, text(m.line)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.line;
  V['g4-tone-kind'] = (q, m) => mk(q) === KIND(m.form) ? '' : 'expected ' + KIND(m.form);
  V['g4-tone-match'] = q => q.pairs.every(p => KIND(text(p[0])) === text(p[1])) ? '' : 'a form is matched to the wrong tone';
  V['g4-to-third'] = q => /^(He|She|They|His|Her|Their)\b/.test(mk(q)) && !/\b(I|my|My|we|We|you|You|your|Your)\b/.test(mk(q)) ? '' : 'not third person: ' + mk(q);
  const ONESIDED = /\b(best|worst|everyone|only|hates|nobody|always|never)\b/i;
  V['g4-fair-tf'] = (q, m) => !ONESIDED.test(m.s) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s;
  V['g4-fairer'] = q => !ONESIDED.test(mk(q)) && !/!$/.test(mk(q)) ? '' : 'still one-sided: ' + mk(q);
  const first = s => /\b(I|My|my|We|we)\b/.test(text(s));
  const povOf = s => first(s) ? 'first person' : /\b(You|you|Your|your)\b/.test(s) ? 'second person' : 'third person';
  V['g4-pov-which'] = (q, m) => mk(q) === povOf(m.s) ? '' : 'expected ' + povOf(m.s);
  V['g4-pov-tf'] = (q, m) => first(m.s) === q.answer && /I, my or we/.test(text(q.why.options[q.why.answer])) === first(m.s) ? '' : 'first person is marked wrong for ' + m.s;
  const OFF = /red bike|Pizza|dog likes|aunt bakes|Robots|lost my mitt|favourite colour|Hockey games/;
  V['g4-off-topic'] = q => OFF.test(mk(q)) ? '' : 'that sentence belongs';
  V['g4-belongs'] = (q, m) => !OFF.test(m.s) === q.answer ? '' : 'belongs is marked wrong for ' + m.s;
  V['g4-add-detail'] = q => /leaves|Thunder|drums|cinnamon|ripple|ten seconds/.test(mk(q)) ? '' : 'that sentence adds no detail';
  const EXACT = ['glowing', 'steaming', 'wriggly', 'hilarious', 'howling', 'towering', 'thunderous', 'fluffy'];
  V['g4-exact-word'] = q => EXACT.includes(mk(q)) ? '' : mk(q) + ' is a plain word';
  /* every mistake in the editing sentences */
  const WRONG = /\b(hopeing|boxs|has went|canadian|it's tail|They was|geese has|bestest|ottawa|cryed|and me went|cityes)\b/;
  const WORDS = ['hopeing', 'boxs', 'went', 'canadian', "it's", 'was', 'has', 'bestest', 'ottawa', 'cryed', 'me', 'cityes'];
  const KINDOF = w => /^(canadian|ottawa)$/.test(w) ? 'capital letter' : /^(went|was|has|bestest|me)$/.test(w) ? 'grammar' : 'spelling';
  V['g4-edit-kind'] = (q, m) => WORDS.includes(text(m.w)) && mk(q) === KINDOF(text(m.w)) ? '' : 'expected ' + KINDOF(text(m.w));
  V['g4-tap-error'] = (q, m) => WORDS.includes(mk(q)) && WRONG.test(text(m.s)) ? '' : mk(q) + ' is not the mistake';
  V['g4-fix-it'] = q => !WRONG.test(mk(q)) && /\.$/.test(mk(q)) ? '' : 'still has a mistake: ' + mk(q);
  V['g4-edit-tf'] = (q, m) => !WRONG.test(text(m.s)) === q.answer ? '' : 'ready is marked wrong for ' + m.s;
  const TOOLS = { 'find spelling mistakes': 'spell check', 'take back a change': 'the undo button', 'move a sentence': 'cut and paste', 'find a word you used too often': 'find (Ctrl + F)', 'see how many words you wrote': 'word count', 'find a better word': 'the thesaurus' };
  V['g4-tools'] = q => q.pairs.every(p => TOOLS[text(p[0])] === text(p[1])) ? '' : 'a job is matched to the wrong tool';
})();
