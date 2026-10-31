/* Grade 5 answer checks: reading for meaning, how texts work, and thinking critically (grade5/chapters/reading.js, features.js, thinking.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and works out what it can from the
   passage itself: where events come in the text, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const KEY = {
    'When the Lights Went Out': { kind: 'story', facts: { 'Where was Rosa when the power went out?': ['at hockey practice', 'was at hockey practice'], 'What did Daniel find?': ['a flashlight', 'found a flashlight'],
      'When did the power come back?': ["by eight o'clock", 'the power was back'] }, main: 'both stay safe', summary: 'share stories, while', conclude: 'stays calm',
      predict: ['need help to get out', 'the arena went black'] },
    'The Tryout': { kind: 'story', facts: { 'How many kids were in the gym?': ['twenty', 'Twenty kids'], 'How long did Jun practise?': ['every day for a month', 'practised every day'] },
      main: 'keeps trying', summary: 'remembers all the practice', conclude: 'not giving up', predict: ['try hard', 'practised every day for a month'] },
    'Your First Time on Skates': { kind: 'story', predict: ['lose your balance', 'Your ankles wobble'] },
    'Save the Late Bus': { kind: 'letter' },
    "Ontario's Wetlands": { kind: 'information', facts: { 'What do wetlands help stop?': ['floods', 'help stop floods'], 'Which animals live in wetlands?': ['frogs, ducks and turtles', 'give homes to'] }, main: 'protect us and wildlife' },
    'Manoomin': { kind: 'information', facts: { 'Where does manoomin grow?': ['in shallow lakes and rivers', 'grows in shallow lakes'], 'What do harvesters use to knock the grains?': ['two wooden sticks', 'with two wooden sticks'] }, main: 'leaves seeds to grow again' },
    'Storm Over the Lake': { kind: 'poem' },
    'The Great Pancake Disaster': { kind: 'story' },
    'A Playground for Everyone': { kind: 'information', facts: { 'What does the playground have instead of stairs?': ['smooth ramps', 'smooth ramps instead'], 'What do the signs show?': ['pictures and braille as well as words', 'Signs show'] }, main: 'every child can play' }
  };
  /* read the passage card back out of the question's picture */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    return { title: text(p.querySelector('.pt').innerHTML), lines: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)) }; };
  /* the narrator: I or we outside speech marks is first person; you is second; otherwise third */
  const povOf = c => { const all = c.lines.join(' ').replace(/[“"][^”"]*[”"]/g, ''); return /\b(I|my|me|we|us|our)\b/i.test(all) ? 'first' : /\b(you|your)\b/i.test(all) ? 'second' : 'third'; };
  const key = (m, f) => (KEY[text(m.t)] || {})[f];
  V['g5-fact'] = (q, m) => { const want = (key(m, 'facts') || {})[text(m.q)]; return want && mk(q) === want[0] ? '' : 'expected ' + (want && want[0]); };
  V['g5-find-line'] = (q, m) => { const want = (key(m, 'facts') || {})[text(m.q)], ok = want ? q.options.map(text).filter(o => o.includes(want[1])) : [];
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  const has = f => (q, m) => { const k = key(m, f); return k && mk(q).includes(k) && q.options.map(text).filter(o => o.includes(k)).length === 1 ? '' : 'expected the option with "' + k + '"'; };
  V['g5-main'] = has('main');
  V['g5-summary'] = has('summary');
  V['g5-conclude'] = has('conclude');
  V['g5-order'] = q => { const c = card(q), all = c.lines.join(' '), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g5-predict'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[0]) && c.lines.join(' ').includes(k[1]) ? '' : 'expected the prediction about "' + (k && k[0]) + '"'; };
  V['g5-predict-clue'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q) === k[1] && c.lines.join(' ').includes(mk(q)) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  const FIX = { 'You do not know what a word means, and the sentence does not help.': 'glossary', 'The facts are coming fast and you are lost.': 'Slow down', 'You cannot picture what is happening.': 'picture in your head',
    'A sentence confuses you, but the next part might explain it.': 'Read ahead', 'You wonder why a character acted that way.': 'Ask a question' };
  V['g5-monitor'] = (q, m) => mk(q).includes(FIX[text(m.problem)]) ? '' : 'expected the strategy with "' + FIX[text(m.problem)] + '"';
  const SUITS = { 'to learn how to build a birdhouse': 'how-to guide', 'to find out about life in Nunavut': 'Inuit author', 'to enjoy a funny story before bed': 'humorous', 'to decide which bike to buy': 'review', 'to learn what a word means': 'dictionary' };
  V['g5-choose'] = (q, m) => mk(q).includes(SUITS[m.want]) ? '' : 'expected the text with "' + SUITS[m.want] + '"';
  V['g5-form'] = q => { const c = card(q), want = (KEY[c.title] || {}).kind; return mk(q) === want ? '' : 'expected ' + want; };
  const JOB = { 'a narrative': 'characters', 'an information text': 'headings and facts', 'a persuasive letter': 'opinion and reasons', 'a poem': 'short lines', 'a biography': 'true story', 'an oral story': 'passed on by telling' };
  V['g5-form-job'] = (q, m) => mk(q).includes(JOB[m.form]) ? '' : 'expected the job of ' + m.form;
  V['g5-match-forms'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a form is matched wrong';
  V['g5-narrator'] = q => { const p = povOf(card(q)); return mk(q).toLowerCase().startsWith(p) ? '' : 'expected ' + p + ' person'; };
  /* what each narrator can know: first knows only their own mind; second puts you in it; third can be in more than one place */
  const WHY = { first: { plus: 'thinks and feels', minus: 'only know what the narrator knows' }, second: { plus: 'happening to you', minus: 'not like your own life' }, third: { plus: 'more than one place', minus: "every character's thoughts" } };
  V['g5-pov-why'] = (q, m) => mk(q).includes(WHY[m.pov][m.plus ? 'plus' : 'minus']) ? '' : 'expected the ' + (m.plus ? 'advantage' : 'disadvantage') + ' of ' + m.pov + ' person';
})();
