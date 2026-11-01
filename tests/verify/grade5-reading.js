/* Grade 5 answer checks: reading for meaning, how texts work, and thinking critically (grade5/chapters/reading.js, features.js, thinking.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and works out what it can from the
   passage itself: where events come in the text, which sentence holds the words, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* facts: { question: [answer, words in the sentence that answers it] }; main: [the main idea, a detail]; summary: words in the good summary;
     conclude: [words in the supported conclusion, the words that support it]; predict: [words in the right prediction, the clue] */
  const KEY = {
    'When the Lights Went Out': { kind: 'story', facts: { 'Where was Rosa when the power went out?': ['at hockey practice', 'was at hockey practice'], 'What did Daniel find?': ['a flashlight', 'found a flashlight'],
      'When did the power come back?': ["by eight o'clock", 'the power was back'] }, main: ['both stay safe', 'likes to play cards'], summary: 'share stories, while', conclude: ['stays calm', 'helped his grandmother light two candles'],
      predict: ['need help to get out', 'the arena went black'] },
    'The Tryout': { kind: 'story', facts: { 'How many kids were in the gym?': ['twenty', 'Twenty kids'], 'How long did Jun practise?': ['every day for a month', 'practised every day'] },
      main: ['keeps trying', 'gym is full'], summary: 'remembers all the practice', conclude: ['not giving up', 'I kept going'], predict: ['try hard', 'practised every day for a month'] },
    'Your First Time on Skates': { kind: 'story', predict: ['lose your balance', 'Your ankles wobble'] },
    'Save the Late Bus': { kind: 'letter' },
    "Ontario's Wetlands": { kind: 'information', facts: { 'What do wetlands help stop?': ['floods', 'help stop floods'], 'Which animals live in wetlands?': ['frogs, ducks and turtles', 'give homes to'] }, main: ['protect us and wildlife', 'Frogs live'] },
    'Manoomin': { kind: 'information', facts: { 'Where does manoomin grow?': ['in shallow lakes and rivers', 'grows in shallow lakes'], 'What do harvesters use to knock the grains?': ['two wooden sticks', 'with two wooden sticks'] }, main: ['leaves seeds to grow again', 'long pole'] },
    'Storm Over the Lake': { kind: 'poem' },
    'The Great Pancake Disaster': { kind: 'story' },
    'A Playground for Everyone': { kind: 'information', facts: { 'What does the playground have instead of stairs?': ['smooth ramps', 'smooth ramps instead'], 'What do the signs show?': ['pictures and braille as well as words', 'Signs show'] }, main: ['every child can play', 'Leo uses'] },
    'The Ice Road': { kind: 'story', facts: { 'How fast did Uncle Ray drive?': ['never faster than 25 kilometres an hour', 'never faster than 25'], 'What lined each side of the ice road?': ['orange markers', 'with orange markers'],
      'What did they bring back for the school?': ['a box of books', 'box of books for the school'] }, main: ['learns how to travel on it safely', 'orange markers'], summary: 'so the ice will not crack',
      conclude: ['knows a lot about travelling on ice', 'That is the ice talking'], predict: ['scared for a moment', 'a long, low boom'] },
    'Inuksuit: Messages in Stone': { kind: 'information', facts: { 'What is an inuksuk made of?': ['stones piled on top of one another', 'made of stones'], 'Where does an inuksuk appear today?': ['on the flag of Nunavut', 'flag of Nunavut'],
      'Why do travellers need help finding their way on the tundra?': ['There are few trees or hills to guide them.', 'few trees or hills'] }, main: ['guide and help people on the land', 'made of stones'],
      summary: 'mark safe or important places', conclude: ['carry important knowledge', 'show the way home'] },
    'From Sap to Syrup': { kind: 'information', facts: { 'How much sap makes 1 litre of syrup?': ['about 40 litres', '40 litres of sap'], 'What makes the sap flow?': ['cold nights and warm days', 'Cold nights and warm days'],
      'What is the wide, flat pan called?': ['an evaporator', 'called an evaporator'] }, main: ['collecting sap and boiling it down', 'Quebec'], summary: 'boil it until it is thick',
      conclude: ['a lot of sap and a lot of time', '40 litres of sap'] },
    'The Volcano That Would Not Stop': { kind: 'story', facts: { 'How many times was the volcano tested at home?': ['three times', 'tested it three times'], "Whose project was next to the volcano?": ["Priya's solar oven", 'next to Priya'],
      'What colour was the foam?': ['pink', 'Pink foam shot up'] }, main: ['fails in front of the judge', 'solar oven'], summary: 'a lesson about measuring',
      conclude: ['Too much vinegar', 'then a little more for luck'], predict: ['finally erupt', 'then a little more for luck'] },
    'A Crosswalk for Elm Street': { kind: 'letter', facts: { 'How many students cross Elm Street each morning?': ['more than 200', 'more than 200 students'], 'What is the speed limit on Elm Street?': ['40 kilometres an hour', 'speed limit of 40'],
      'Who else would the crosswalk help?': ['seniors who walk to the community centre', 'help the seniors'] }, main: ['keep students and seniors safe', 'Brookfield'], summary: 'asking for a crosswalk by her school',
      conclude: ['safety matters more than the cost', 'nothing is more important than keeping people safe'] },
    'The Long Flight of the Monarch': { kind: 'information', facts: { 'How far do some monarchs travel?': ['more than 4000 kilometres', 'more than 4000'], 'What do monarch caterpillars eat?': ['only milkweed', 'eat only milkweed'],
      'Where do monarchs rest at night?': ['in trees', 'rest in trees at night'] }, main: ['over several generations', 'drink nectar'], summary: 'new generations finish the trip',
      conclude: ['Milkweed is important', 'eat only milkweed'] },
    'You Are the Goalie': { kind: 'story', facts: { 'How much time is left when the story starts?': ['two minutes', 'two minutes left'], 'Where does Number 9 shoot?': ['high', 'She shoots high'], 'Who scores the goal?': ['Maya', "land on Maya's stick"] },
      main: ['big save as goalie', 'Maya scores'], summary: 'you stop a hard shot', conclude: ['save helped the team win', 'the save made it possible'], predict: ['stop an important shot', 'two minutes left in the game'] },
    'The Night of the Storm': { kind: 'story', facts: { 'How many steps led up to the lamp?': ['ninety', 'the ninety steps'], "What happened to Ada's father?": ['He hurt his ankle.', 'hurt his ankle'], 'Which match lit the lamp?': ['the second match', 'The second match caught'] },
      main: ['lights the lamp to guide the boats home', 'ninety steps'], summary: 'lights it, and a fishing boat', conclude: ['brave when it matters', 'She grabbed the matches and began to climb'],
      predict: ['light the lamp herself', 'The fishing boats are still out'] }
  };
  const PURPOSE = { story: 'to enjoy a story', information: 'to learn facts', letter: 'to be persuaded', poem: 'to enjoy a poem' };
  const CLUES = { story: /characters/, information: /facts/, letter: /Dear/, poem: /short lines/ };
  const KINDWORD = { 'a story': 'story', 'an information text': 'information', 'a letter': 'letter', 'a poem': 'poem' };
  /* read the passage card back out of the question's picture */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.pic || q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    const ps = p.querySelectorAll('.ps'), lines = ps.length ? [...ps].map(x => text(x.innerHTML)) : [...p.querySelectorAll('p')].map(x => text(x.innerHTML));
    return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', lines, all: lines.join(' ') }; };
  /* the sentence the child tapped, and how many sentences hold some words */
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const quoted = s => (text(s).match(/“([^”]+)”/) || [, ''])[1];
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  /* the narrator: I or we outside speech marks is first person; you is second; otherwise third */
  const outside = s => s.replace(/[“"][^”"]*[”"]/g, '');
  const povOf = c => { const all = outside(c.lines.join(' ')); return /\b(I|my|me|we|us|our)\b/i.test(all) ? 'first' : /\b(you|your)\b/i.test(all) ? 'second' : 'third'; };
  const key = (m, f) => (KEY[text(m.t)] || {})[f];
  const want = m => (key(m, 'facts') || {})[text(m.q)];

  /* find it in the text */
  V['g5-fact'] = (q, m) => { const w = want(m); return w && mk(q) === w[0] ? '' : 'expected ' + (w && w[0]); };
  V['g5-tap-fact'] = (q, m) => { const w = want(m), t = tapped(q); return w && t.count(w[1]) === 1 && t.hit.includes(w[1]) ? '' : 'the tapped sentence does not answer it'; };
  V['g5-find-line'] = (q, m) => { const w = want(m), ok = w ? q.options.map(text).filter(o => o.includes(w[1])) : [];
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g5-fact-tf'] = (q, m) => { const w = want(m), said = text(q.q).match(/says: (.+)\.$/)[1].replace(/\.$/, ''), right = !!w && said === w[0].replace(/\.$/, '');
    return w && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* sum it up */
  const has = (f, i) => (q, m) => { let k = key(m, f); if (Array.isArray(k)) k = k[i || 0]; return k && mk(q).includes(k) && q.options.map(text).filter(o => o.includes(k)).length === 1 ? '' : 'expected the option with "' + k + '"'; };
  V['g5-main'] = has('main');
  V['g5-detail'] = has('main', 1);
  V['g5-summary'] = has('summary');
  /* a good summary has the key words; one with five or more sentences has too many details; any other is an opinion */
  V['g5-summary-why'] = (q, m) => { const d = document.createElement('div'); d.innerHTML = q.fig; const s = text(d.querySelector('.sent').innerHTML);
    const want = s.includes(key(m, 'summary')) ? 'good summary' : s.split(/[.!?] /).length >= 5 ? 'too many small details' : 'opinion'; return mk(q).includes(want) ? '' : 'expected "' + want + '"'; };
  V['g5-order'] = q => { const c = card(q), at = q.items.map(i => c.all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g5-after'] = q => { const c = card(q), p0 = c.all.indexOf(quoted(q.q)), pos = q.options.map(o => c.all.indexOf(text(o).replace(/[“”]/g, '')));
    const later = pos.filter(p => p > p0), next = later.length ? Math.min(...later) : -2; return p0 >= 0 && pos.every(p => p >= 0) && pos[q.answer] === next ? '' : 'expected the event that comes next'; };
  /* conclusions */
  V['g5-conclude'] = has('conclude');
  V['g5-conclude-tap'] = (q, m) => { const k = key(m, 'conclude'), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) && text(q.q).includes(k[0]) ? '' : 'the tapped sentence does not support it'; };
  V['g5-conclude-tf'] = (q, m) => { const k = key(m, 'conclude'), right = !!k && text(q.q).includes(k[0]); return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-conclude-words'] = (q, m) => { const k = key(m, 'conclude'); return k && mk(q) === k[1] && card(q).all.includes(k[1]) && text(q.q).includes(k[0]) ? '' : 'expected "' + (k && k[1]) + '"'; };
  /* predict, then check */
  V['g5-predict'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[0]) && c.all.includes(k[1]) ? '' : 'expected the prediction about "' + (k && k[0]) + '"'; };
  V['g5-predict-clue'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q) === k[1] && c.all.includes(mk(q)) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  V['g5-clue-tap'] = (q, m) => { const k = key(m, 'predict'), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  V['g5-predict-tf'] = (q, m) => { const k = key(m, 'predict'), right = !!k && text(q.q).includes(k[0]); return k && card(q).all.includes(k[1]) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-predict-check'] = (q, m) => { const k = key(m, 'predict'), right = !!k && text(q.q).includes(k[0]); return k && q.answer === right ? '' : 'expected ' + right; };
  /* fix it when you are lost: each problem and the words of the strategy that fixes it */
  const FIX = { 'The facts are coming fast and you are lost.': 'reread', 'You read a whole page and cannot remember any of it.': 'reread', 'You cannot picture what is happening.': 'picture',
    'A description of a place is hard to follow.': 'picture', 'A sentence confuses you, but the next part might explain it.': 'Read ahead', 'The writer says an idea will be explained later.': 'Read ahead',
    'You wonder why a character acted that way.': 'Ask a question', 'You are not sure what the writer is trying to tell you.': 'Ask a question',
    'You do not know what a word means, and the sentence does not help.': 'glossary', 'A word in bold is new to you.': 'glossary' };
  const GOOD = s => Object.values(FIX).some(w => s.includes(w));
  V['g5-monitor'] = (q, m) => mk(q).includes(FIX[text(m.problem)]) && q.options.filter(o => text(o).includes(FIX[text(m.problem)])).length === 1 ? '' : 'expected the strategy with "' + FIX[text(m.problem)] + '"';
  V['g5-fix-for'] = q => { const s = text(q.fig), ok = q.options.map(text).filter(o => FIX[o] && s.includes(FIX[o])); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the problem this strategy fixes'; };
  V['g5-fix-all'] = q => H.sameSet(q.options.map((o, i) => GOOD(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful ideas are not the ones marked';
  V['g5-match-fix'] = q => q.pairs.every(p => text(p[1]).includes(FIX[text(p[0])])) ? '' : 'a problem is matched to the wrong fix';
  V['g5-monitor-tf'] = (q, m) => { const right = text(m.said).includes(FIX[text(m.problem)]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* choose a text: what you want, and words from the text that suits it */
  const SUITS = { 'to learn how to build a birdhouse': 'how-to guide', 'to find out about life in Nunavut': 'Inuit author', 'to enjoy a funny story before bed': 'humorous', 'to decide which bike to buy': 'review',
    'to learn what a word means': 'dictionary', 'to find where Lake Superior is': 'atlas', 'to cook bannock for a family dinner': 'recipe', 'to know if it will rain tomorrow': 'forecast',
    'to learn about the life of Terry Fox': 'biography', 'to enjoy the sound and rhythm of words': 'poems' };
  V['g5-choose'] = (q, m) => mk(q).includes(SUITS[m.want]) ? '' : 'expected the text with "' + SUITS[m.want] + '"';
  V['g5-choose-tf'] = (q, m) => { const right = m.pick.includes(SUITS[m.want]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-read-purpose'] = (q, m) => { const k = key(m, 'kind'); return mk(q) === PURPOSE[k] ? '' : 'expected ' + PURPOSE[k]; };
  V['g5-which-text'] = q => { const w = text(q.q).match(/You want (.+)\. Which/)[1], fits = q.tiles.map(t => PURPOSE[(KEY[text(t)] || {}).kind] === w);
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the text you read ' + w; };
  V['g5-match-read'] = q => q.pairs.every(p => PURPOSE[(KEY[text(p[0])] || {}).kind] === text(p[1])) ? '' : 'a text is matched to the wrong reason';
  /* forms */
  const kindOf = q => (KEY[card(q).title] || {}).kind;
  V['g5-form'] = q => mk(q) === kindOf(q) ? '' : 'expected ' + kindOf(q);
  V['g5-form-clue'] = q => { const k = kindOf(q); return CLUES[k].test(mk(q)) && q.options.filter(o => CLUES[k].test(text(o))).length === 1 ? '' : 'expected the clue for ' + k; };
  V['g5-form-tf'] = q => { const k = kindOf(q), said = KINDWORD[text(q.q).match(/this is (.+)\.$/)[1]], right = said === k; return q.answer === right && CLUES[k].test(text(q.why.options[q.why.answer])) ? '' : 'expected ' + right; };
  const JOB = { 'a narrative': 'characters', 'an information text': 'headings and facts', 'a persuasive letter': 'opinion and reasons', 'a poem': 'short lines', 'a biography': 'true story', 'an oral story': 'passed on by telling',
    'a graphic novel': 'speech bubbles', 'a how-to guide': 'numbered steps' };
  V['g5-form-job'] = (q, m) => mk(q).includes(JOB[m.form]) ? '' : 'expected the job of ' + m.form;
  V['g5-match-forms'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a form is matched wrong';
  /* who is telling it */
  const WORDS = { first: /^(I|We|Our)$/, second: /^You$/, third: /^(He|She|They)$/ };
  V['g5-narrator'] = q => { const p = povOf(card(q)); return mk(q).toLowerCase().startsWith(p) ? '' : 'expected ' + p + ' person'; };
  V['g5-pov-word'] = q => { const c = card(q), p = povOf(c), w = mk(q); return WORDS[p].test(w) && new RegExp('\\b' + w + '\\b', 'i').test(outside(c.all)) ? '' : 'expected a ' + p + '-person word'; };
  V['g5-narrator-tf'] = q => { const said = text(q.q).match(/(first|second|third) person/)[1], right = said === povOf(card(q)); return q.answer === right ? '' : 'expected ' + right; };
  V['g5-pov-line'] = (q, m) => { const w = m.pov === 'first' ? /\b(I|my|we|our)\b/i : /\b(you|your)\b/i, ok = q.options.map(o => w.test(outside(text(o))));
    return ok.filter(Boolean).length === 1 && ok[q.answer] ? '' : 'expected the one ' + m.pov + '-person sentence'; };
  /* what each narrator can know: first knows only their own mind; second puts you in it; third can be in more than one place */
  const WHY = { first: { plus: 'thinks and feels', minus: 'only know what the narrator knows' }, second: { plus: 'happening to you', minus: 'not like your own life' }, third: { plus: 'more than one place', minus: "every character's thoughts" } };
  V['g5-pov-why'] = (q, m) => mk(q).includes(WHY[m.pov][m.plus ? 'plus' : 'minus']) ? '' : 'expected the ' + (m.plus ? 'advantage' : 'disadvantage') + ' of ' + m.pov + ' person';
})();
