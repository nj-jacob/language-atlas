/* Grade 4 answer checks: thinking about texts (grade4/chapters/thinking.js). The checker keeps its own answer key (like a second
   marker), and checks what it can from the passage: clues and events must be in it, and in order. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* inference question -> [answer, the clue that shows it] */
  const INFER = { 'How does Amara know where Jayden is?': ['He goes to the arena every Tuesday.', 'here every Tuesday'], 'How does Jayden feel when he sees Amara?': ['surprised', 'How did you know'],
    'How does the narrator feel at the start?': ['nervous', 'shaking hands'], 'How does the narrator feel at the end?': ['proud', 'head high'],
    'How do you feel at the top of the hill?': ['nervous', 'heart thumps'], 'How do you feel at the bottom?': ['happy', 'You grin'], 'Why did Crow hang a new sign?': ['She was hungry.', 'nothing to eat'],
    'How does Priya feel when she hears they must carry the canoe?': ['surprised', 'Priya stared'], 'How does Priya feel at the end?': ['proud', 'That was hard'],
    'How do you feel when you hear the snap?': ['scared', 'heart pounds'], 'Why did the raccoon come to the tent?': ['It smelled the food.', 'food bag'],
    'How does Mom feel when she sees the moose?': ['amazed', 'gasped'], 'Why does Mrs. Lavoie stay far back?': ['She knows a moose can be dangerous.', 'kick hard'],
    'How does Otter feel when the ice comes?': ['cold and worried', 'shivered'], 'Why is Otter the first one up in the spring?': ['He wants to be ready and to help this time.', 'Beaver was awake'],
    'How does Noah feel in the first period?': ['upset', 'slammed'], 'Why does Noah keep looking at the empty seat?': ['He misses Lola Rosa.', 'empty seat'], 'How does Noah feel when Lola Rosa arrives?': ['happy', 'grinned'] };
  const card = q => { const d = document.createElement('div'); d.innerHTML = (q.fig || '') + (q.pic || ''); const p = d.querySelector('.psg'); return p ? [...p.querySelectorAll('.ps')].map(x => ({ s: text(x.innerHTML), hit: x.getAttribute('data-hit') })) : []; };
  const all = q => card(q).map(x => x.s).join(' ');
  const tapped = q => (card(q).find(x => x.hit === String(q.answer)) || {}).s || '';
  const inf = m => INFER[text(m.q)];
  V['g4-local'] = (q, m) => { const k = inf(m); return k && mk(q) === k[0] && all(q).includes(k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g4-evidence'] = (q, m) => { const k = inf(m); return k && k[1].length && mk(q).includes(k[1]) && all(q).includes(mk(q)) ? '' : 'expected the clue ' + (k && k[1]); };
  V['g4-infer-tap'] = (q, m) => { const k = inf(m); return k && tapped(q).includes(k[1]) ? '' : 'the sentence tapped does not have the clue'; };
  V['g4-infer-tf'] = (q, m) => { const k = inf(m); return k && q.answer === (text(m.said) === k[0]) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said; };
  V['g4-clue-match-text'] = q => q.pairs.every(p => (INFER[text(p[0])] || [])[1] && text(p[1]).includes(INFER[text(p[0])][1]) && all(q).includes(text(p[1]))) ? '' : 'a question is matched to the wrong clue';

  /* the big message of each text, and words near the end that show it */
  const THEME = { 'Two Ways Home': ['look out for each other', 'pick us both up'], 'My Volcano': ['more than winning', 'head high'], 'Crow Opens a Shop': ['What you need', 'Food welcome'],
    'The Portage': ['Hard work', 'brought us'], 'Your First Night at Camp': ['not always what it seems', 'It is a raccoon'], 'The Moose on Main Street': ['need space', 'Never get close'],
    'Beaver and Otter': ['helping others', 'room for two'], 'The Final Game': ['believe in you', 'biggest save'] };
  const title = q => { const d = document.createElement('div'); d.innerHTML = (q.fig || '') + (q.pic || ''); const t = d.querySelector('.psg .pt'); return t ? text(t.innerHTML) : ''; };
  V['g4-global'] = q => { const k = THEME[title(q)]; return k && mk(q).includes(k[0]) ? '' : 'expected the message about "' + (k && k[0]) + '"'; };
  V['g4-theme-tf'] = (q, m) => { const k = THEME[title(q)]; return k && q.answer === text(m.said).includes(k[0]) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said; };
  V['g4-theme-tap'] = q => { const k = THEME[title(q)]; return k && tapped(q).includes(k[1]) ? '' : 'the sentence tapped does not show the message'; };
  V['g4-theme-match'] = q => q.pairs.every(p => THEME[text(p[0])] && text(p[1]).includes(THEME[text(p[0])][0])) ? '' : 'a text is matched to the wrong message';

  /* two plots: who each event belongs to, and the order in the text */
  const PLOT = { 'looked up from her book': 'Amara', 'called home': 'Amara', 'rode it to the arena': 'Amara', 'finishing hockey practice': 'Jayden', 'roads were closing': 'Jayden', 'waiting by the door': 'Jayden',
    'taped his stick': 'Noah', 'slammed his stick': 'Noah', 'stopped shot after shot': 'Noah', 'biggest save': 'Noah',
    'car would not start': 'Lola Rosa', 'walked to the bus stop': 'Lola Rosa', 'watched the clock': 'Lola Rosa', 'waving the banner': 'Lola Rosa' };
  const ev = s => text(s).replace(/[“”]/g, '');
  V['g4-plot-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => PLOT[ev(o)] === m.who ? i : -1).filter(i => i >= 0), q.answer) && q.options.every(o => all(q).includes(ev(o))) ? '' : 'the events of ' + m.who + "'s plot are not the ones marked";
  V['g4-plot-order'] = (q, m) => { const s = all(q), e = q.items.map(ev), at = e.map(x => s.indexOf(x));
    return e.every(x => PLOT[x] === m.who) && at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'not ' + m.who + "'s events in the order of the text"; };
  V['g4-whose-plot'] = (q, m) => mk(q) === PLOT[text(m.e)] && all(q).includes(text(m.e)) ? '' : 'expected ' + PLOT[text(m.e)];
  V['g4-plot-tf'] = (q, m) => q.answer === (PLOT[text(m.e)] === m.who) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.e;

  /* causes and their effects */
  const CAUSE = { 'The snow got heavy.': 'The roads were closing.', 'No one answered at home.': 'Amara waited for the bus.', 'Milkweed tastes bitter.': 'Birds learn not to eat monarchs.',
    'Fewer milkweed plants grow.': 'There are fewer monarchs.', 'The corn grows tall.': 'The beans have something to climb.', 'The squash leaves shade the ground.': 'Fewer weeds grow.',
    'The counsellor forgot to hang the food bag.': 'A raccoon came to the tent.', 'You heard a snap in the dark.': 'Your heart pounded.',
    'Bees fan their wings over the nectar.': 'The nectar dries into honey.', 'Bees carry pollen between flowers.': 'Plants can make fruit and seeds.',
    'A moose stood in the road.': 'Cars stopped in both directions.', 'Moose can kick hard.': 'People stayed far back.',
    'Otter did not get ready for winter.': 'He had nowhere warm to sleep.', 'Beaver shared her lodge.': 'Otter was warm and thankful.',
    'Ice crystals have six sides.': 'Most snowflakes grow six arms.', 'The air is close to 0°C.': 'Flakes stick together in clumps.',
    'The tundra has few trees or hills.': 'Travellers use inuksuit to find the way.', "Lola Rosa's car would not start.": 'She took the bus.', 'Lola Rosa arrived to cheer.': 'Noah grinned behind his mask.' };
  const EFFECT = Object.fromEntries(Object.entries(CAUSE).map(([c, e]) => [e, c]));
  V['g4-cause'] = q => q.pairs.every(p => CAUSE[text(p[0])] === text(p[1])) ? '' : 'a cause is matched to the wrong effect';
  V['g4-effect'] = (q, m) => mk(q) === CAUSE[text(m.c)] ? '' : 'expected ' + CAUSE[text(m.c)];
  V['g4-cause-of'] = (q, m) => mk(q) === EFFECT[text(m.e)] ? '' : 'expected ' + EFFECT[text(m.e)];
  V['g4-cause-tf'] = (q, m) => q.answer === (CAUSE[text(m.c)] === text(m.e)) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.c;

  /* points of view: what each writer asks for, who is not heard, and what they might say */
  const VIEW = { 'Keep Riverside Pool Open': ['Riverside Pool should stay open', 'Please keep Riverside', 'decide how the city spends', 'costs money'],
    'Bring Back Our School Garden': ['garden should come back', 'bring back the garden', 'spent on other things', 'books or a new roof'],
    'We Need a Skatepark': ['should build a skatepark', 'needs a skatepark', 'neighbours', 'noisy'],
    'Keep Dogs on Leashes': ['should stay on leashes', 'stay on leashes', 'dog owners', 'friendly and well trained'] };
  const vw = q => VIEW[title(q)] || [];
  V['g4-thinks'] = q => mk(q).includes(vw(q)[0]) && all(q).includes(vw(q)[1]) ? '' : 'expected what the writer asks for';
  V['g4-view-tap'] = q => tapped(q).includes(vw(q)[1]) ? '' : 'the sentence tapped does not show what the writer wants';
  V['g4-view-tf'] = (q, m) => q.answer === text(m.said).includes(vw(q)[0]) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said;
  /* missing: a voice the letter does not speak for (it is not named in the letter) */
  V['g4-missing'] = q => mk(q).includes(vw(q)[2]) ? '' : 'expected a voice the letter does not include';
  V['g4-against'] = q => mk(q).includes(vw(q)[3]) ? '' : 'expected what the missing voice might say';
  /* bias: big claims nobody could check */
  const BIASED = /\b(best|greatest|everyone|every student|every dog|terrible|nobody|only boring)\b/i;
  V['g4-bias'] = q => { const ok = q.options.map(text).filter(o => BIASED.test(o)); return ok.length === 1 && mk(q) === ok[0] && all(q).includes(ok[0]) ? '' : 'expected the one-sided claim'; };
  V['g4-fair-reason'] = q => { const ok = q.options.map(text).filter(o => !BIASED.test(o)); return ok.length === 1 && mk(q) === ok[0] && all(q).includes(ok[0]) ? '' : 'expected the reason that can be checked'; };
  V['g4-bias-pick'] = q => H.sameSet(q.options.map((o, i) => BIASED.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the biased sentences are not the ones marked';
  V['g4-bias-tf'] = (q, m) => q.answer === BIASED.test(text(m.s)) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.s;
  V['g4-influence'] = q => /everyone agrees/.test(mk(q)) ? '' : 'expected the effect of one-sided claims';
})();
