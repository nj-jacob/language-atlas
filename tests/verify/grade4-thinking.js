/* Grade 4 answer checks: thinking about texts (grade4/chapters/thinking.js). The checker keeps its own answer key, and checks
   what it can from the passage (clues and events must be in it, in order). */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const INFER = { 'How does Amara know where Jayden is?': ['He goes to the arena every Tuesday.', 'here every Tuesday'], 'How does Jayden feel when he sees Amara?': ['surprised', 'How did you know'],
    'How does the narrator feel at the start?': ['nervous', 'shaking hands'], 'How does the narrator feel at the end?': ['proud', 'head high'],
    'How do you feel at the top of the hill?': ['nervous', 'heart thumps'], 'How do you feel at the bottom?': ['happy', 'You grin'], 'Why did Crow hang a new sign?': ['She was hungry.', 'nothing to eat'] };
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); return p ? [...p.querySelectorAll('p')].map(x => text(x.innerHTML)).join(' ') : ''; };
  V['g4-local'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q) === k[0] && card(q).includes(k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g4-evidence'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q) === k[1] && card(q).includes(k[1]) ? '' : 'expected the clue ' + (k && k[1]); };
  V['g4-clue-match-text'] = q => q.pairs.every(p => (INFER[text(p[0])] || [])[1] === text(p[1]) && card(q).includes(text(p[1]))) ? '' : 'a question is matched to the wrong clue';
  const THEME = { 'Two Ways Home': 'look out for each other', 'My Volcano': 'more than winning', 'Crow Opens a Shop': 'What you need' };
  V['g4-global'] = (q, m) => mk(q).includes(THEME[m.t]) ? '' : 'expected the message about "' + THEME[m.t] + '"';
  /* two plots: who each event belongs to, and the order in the text */
  const PLOT = { 'looked up from her book': 'Amara', 'called home': 'Amara', 'rode it to the arena': 'Amara', 'finishing hockey practice': 'Jayden', 'roads were closing': 'Jayden', 'waiting by the door': 'Jayden' };
  V['g4-plot-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => PLOT[text(o)] === m.who ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the events of ' + m.who + "'s plot are not the ones marked";
  V['g4-plot-order'] = (q, m) => { const s = card(q), ev = q.items.map(i => text(i).replace(/[“”]/g, '')), at = ev.map(e => s.indexOf(e));
    return ev.every(e => PLOT[e] === m.who) && at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'not ' + m.who + "'s events in the order of the text"; };
  const CAUSE = { 'The snow got heavy.': 'The roads were closing.', 'No one answered at home.': 'Amara waited for the bus.', 'Milkweed tastes bitter.': 'Birds learn not to eat monarchs.',
    'Fewer milkweed plants grow.': 'There are fewer monarchs.', 'The corn grows tall.': 'The beans have something to climb.', 'The squash leaves shade the ground.': 'Fewer weeds grow.' };
  V['g4-cause'] = q => q.pairs.every(p => CAUSE[text(p[0])] === text(p[1])) ? '' : 'a cause is matched to the wrong effect';
  V['g4-effect'] = (q, m) => mk(q) === CAUSE[m.c] ? '' : 'expected ' + CAUSE[m.c];
  /* a supporting detail is a sentence from the text; the main idea sums up the whole text, so it is not one of its sentences */
  V['g4-main-detail'] = (q, m) => mk(q) === (card(q).includes(text(m.s)) ? 'supporting detail' : 'main idea') ? '' : 'wrong for ' + m.s;
  V['g4-thinks'] = q => mk(q) === 'Riverside Pool should stay open all summer.' && card(q).includes('Please keep Riverside Pool open') ? '' : 'expected what Omar asks for';
  /* missing: someone who has a say but is not heard in the letter (the letter speaks for kids and children) */
  V['g4-missing'] = q => { const ok = q.options.map(text).filter(o => !/kids|children/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected a voice the letter does not include'; };
  /* bias: claims nobody could check */
  const BIASED = /\b(best|everyone|terrible)\b/;
  V['g4-bias'] = q => { const ok = q.options.map(text).filter(o => BIASED.test(o)); return ok.length === 1 && mk(q) === ok[0] && card(q).includes(ok[0]) ? '' : 'expected the one-sided claim'; };
  V['g4-bias-pick'] = q => H.sameSet(q.options.map((o, i) => BIASED.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the biased sentences are not the ones marked';
  V['g4-influence'] = q => /everyone agrees/.test(mk(q)) ? '' : 'expected the effect of one-sided claims';
})();
