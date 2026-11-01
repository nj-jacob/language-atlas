/* Grade 5 answer checks: thinking critically (grade5/chapters/thinking.js). The checker keeps its own answer key, like a second marker,
   and reads the passage card in the question to check that the words it relies on are really there. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const passage = q => text(q.fig || q.pic || '');
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  /* inferences: [words in the right answer, the words in the text that show it, words in a wrong answer] */
  const INFER = { 'Why did the coach tell the team to hold hands?': ['no one would get lost', 'walk slowly to the exit', 'play a game'], 'How does Daniel help his grandmother?': ['finds a light', 'helped his grandmother', 'makes dinner'],
    'How does Jun feel at the start?': ['nervous', 'My hands were shaking', 'bored'], 'How does Jun feel at the end?': ['proud', 'grinned all the way home', 'upset'],
    'How do you feel when you first step on the ice?': ['nervous', 'your heart thumps', 'sleepy'], 'Was making pancakes easy?': ['No, it went badly', 'In the end, we had cereal', 'Yes'],
    'How does Kenji feel when he hears the boom?': ['scared', 'gripped the seat', 'bored'], 'Why does Uncle Ray smile?': ['the ice is strong', 'It is cold and strong today', 'funny'],
    'Why might a family build an inuksuk?': ['to mark a place', 'important to a family', 'block a road'], 'How does the narrator feel when nothing happens?': ['embarrassed', 'my face turned hot', 'proud'],
    'Why did the volcano erupt so much?': ['Too much vinegar', 'then a little more for luck', 'judge touched'], 'How do you feel at the start?': ['nervous', 'Your heart pounds', 'bored'],
    'How do your teammates feel after the save?': ['proud and excited', 'bang their sticks', 'angry'], 'Why does Ada look at the stairs?': ['deciding to climb', 'then at the long, winding stairs', 'counting'],
    'How does Ada feel at the top?': ['nervous', 'her hands shook', 'sleepy'] };
  V['g5-infer'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q).includes(k[0]) && passage(q).includes(k[1]) ? '' : 'expected "' + (k && k[0]) + '"'; };
  V['g5-evidence'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q) === k[1] && passage(q).includes(k[1]) ? '' : 'expected the words "' + (k && k[1]) + '"'; };
  V['g5-infer-tap'] = (q, m) => { const k = INFER[text(m.q)], t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  V['g5-infer-tf'] = (q, m) => { const k = INFER[text(m.q)], right = !!k && text(m.said).includes(k[0]) && !text(m.said).includes(k[2]); return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* inferences about the whole text: [words in the answer, words that show it] */
  const GLOBAL = { 'The Tryout': ['does not give up', 'I kept going'], 'When the Lights Went Out': ['look after each other', 'helped his grandmother'],
    'The Ice Road': ['careful and knows the land', 'never faster than 25'], 'The Volcano That Would Not Stop': ['measure', 'Always measure your vinegar'],
    'You Are the Goalie': ['without scoring', 'the save made it possible'], 'The Night of the Storm': ['brave and responsible', 'began to climb'] };
  V['g5-global'] = (q, m) => mk(q).includes(GLOBAL[m.t][0]) ? '' : 'expected ' + GLOBAL[m.t][0];
  V['g5-global-clue'] = (q, m) => mk(q) === GLOBAL[m.t][1] && passage(q).includes(mk(q)) ? '' : 'expected ' + GLOBAL[m.t][1];
  V['g5-global-tap'] = (q, m) => { const t = tapped(q); return t.count(GLOBAL[m.t][1]) === 1 && t.hit.includes(GLOBAL[m.t][1]) ? '' : 'the tapped sentence does not show it'; };
  V['g5-global-tf'] = (q, m) => { const right = text(m.said).includes(GLOBAL[m.t][0]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* main ideas and the words of the details that support them */
  const SUPPORT = { 'Wetlands are important.': ['stop floods', 'clean the water'], 'Jun worked hard for the tryout.': ['practised every day', 'kept going'], 'The new playground welcomes everyone.': ['ramps', 'braille'],
    'Manoomin is harvested with care.': ['gently', 'left to grow'], 'The ice road takes special care.': ['faster than 25', 'safe path'], 'Inuksuit help people on the land.': ['way home', 'safe place'],
    'Making maple syrup takes time.': ['for hours', '40 litres'], 'Monarchs make an amazing journey.': ['4000 kilometres', 'without a map'], 'Elm Street is not safe to cross.': ['faster than the speed limit', 'no crossing guard'],
    'Ada is brave.': ['climbed the tower', 'shaking hands'], 'The volcano did not go as planned.': ['Nothing happened', "filled Priya's"], 'The goalie helped the team win.': ['caught the hard shot', 'kept the score tied'] };
  const supports = (main, d) => SUPPORT[main].some(w => d.includes(w));
  V['g5-support'] = (q, m) => { const ok = q.options.map(text).filter(o => supports(m.main, o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the detail that supports it'; };
  V['g5-not-support'] = (q, m) => { const ok = q.options.map(text).filter(o => !supports(m.main, o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the detail that does not support it'; };
  V['g5-support-tf'] = (q, m) => { const right = supports(m.main, text(m.d)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-main-for'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const legs = [...d.querySelectorAll('.ww-legs span')].map(x => text(x.innerHTML));
    const ok = q.options.map(text).filter(o => SUPPORT[o] && legs.every(l => supports(o, l))); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the main idea these details prove'; };
  /* two plots: each event and the place it happens */
  const PLOT = { 'found a flashlight': 'At home', 'played cards by candlelight': 'At home', 'the arena went black': 'At the arena', 'walk slowly to the exit': 'At the arena',
    'climbed the ninety steps': 'In the lighthouse', 'slipped on the wet stairs': 'In the lighthouse', 'began to climb': 'In the lighthouse', 'the great lamp blazed': 'In the lighthouse',
    'a fishing captain saw the beam': 'Out at sea', 'turned his boat away from the rocks': 'Out at sea', 'steered safely into the harbour': 'Out at sea' };
  V['g5-plot'] = (q, m) => mk(q) === PLOT[m.e] ? '' : 'expected ' + PLOT[m.e];
  V['g5-match-plots'] = q => q.pairs.every(p => PLOT[text(p[1])] === text(p[0])) ? '' : 'an event is matched to the wrong place';
  V['g5-plot-order'] = (q, m) => { const all = passage(q), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, '')));
    return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) && q.items.every(i => PLOT[text(i).replace(/[“”]/g, '')] === m.place) ? '' : 'the events are not in order for that plot'; };
  V['g5-plot-tf'] = (q, m) => { const right = PLOT[m.e] === m.place; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* points of view: what the writer wants, the facts (things you could check), the biased claim and its word, and the missing side */
  const VIEW = { 'Save the Late Bus': { thinks: 'keep the late bus', facts: ['more than 80 students'], bias: 'Everyone agrees', word: 'Everyone', missing: 'costs the board' },
    'A Crosswalk for Elm Street': { thinks: 'add a crosswalk', facts: ['more than 200 students', 'no crossing guard'] },
    'Zoom Sneakers': { thinks: 'buy Zoom Sneakers', facts: ['rubber sole', '$120'], bias: 'Every kid in Canada', word: 'Every', missing: 'who bought them' },
    'Our New Library': { thinks: 'great place to go', facts: ['3000 books', "8 o'clock"], bias: 'nobody ever went', word: 'nobody', missing: 'liked the old library' },
    'Build Us a Skatepark': { thinks: 'build a skatepark', facts: ['four parks', '60 people signed'], bias: 'most responsible', word: 'most', missing: 'something else' },
    'Camp Wapiti': { thinks: 'sign up for Camp Wapiti', facts: ['canoe, hike', 'Lake Nipissing'], bias: 'All campers love it', word: 'All', missing: 'did not enjoy it' } };
  const isFact = (t, s) => VIEW[t].facts.some(f => s.includes(f));
  V['g5-view'] = (q, m) => mk(q).includes(VIEW[m.t].thinks) ? '' : 'expected "' + VIEW[m.t].thinks + '"';
  V['g5-fact-opinion'] = (q, m) => { const ok = q.options.map(text).filter(o => isFact(m.t, o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the fact'; };
  V['g5-fact-or-opinion'] = (q, m) => { const f = isFact(m.t, text(m.s)), right = (m.says === 'a fact') === f; return q.answer === right && q.why.answer === (f ? 0 : 1) ? '' : 'expected ' + right; };
  V['g5-pick-facts'] = (q, m) => H.sameSet(q.options.map((o, i) => isFact(m.t, text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the facts are not the ones marked';
  V['g5-bias'] = (q, m) => mk(q).includes(VIEW[m.t].bias) && passage(q).includes(VIEW[m.t].bias) ? '' : 'expected the sentence with "' + VIEW[m.t].bias + '"';
  V['g5-bias-word'] = (q, m) => mk(q) === VIEW[m.t].word && passage(q).includes(mk(q)) ? '' : 'expected ' + VIEW[m.t].word;
  V['g5-missing'] = (q, m) => mk(q).includes(VIEW[m.t].missing) ? '' : 'expected the side about "' + VIEW[m.t].missing + '"';
  V['g5-spot-bias-tf'] = (q, m) => { const right = text(m.s).includes(VIEW[m.t].bias); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* inclusion: the message, the changes that help more people take part, and who each change helps */
  const MSG = { 'A Playground for Everyone': 'play together', "Mei's First Week": 'belong', 'Everyone on the Ice': 'take part in sport', 'Stories for Everyone': 'many languages', 'A Festival for All': 'Planning ahead' };
  const GOOD = { 'A Playground for Everyone': ['ramps', 'braille', 'quiet corner'], "Mei's First Week": ['map with pictures', 'hello in Mandarin'], 'Everyone on the Ice': ['sledges', 'low benches', 'open to everyone'],
    'Stories for Everyone': ['English and French', 'Cree', 'large-print'], 'A Festival for All': ['quiet tent', 'signs with pictures', 'sign language'] };
  const HELPS = { 'smooth ramps': 'wheelchairs', 'braille on signs': 'blind', 'a quiet corner': 'calm place', 'a map with pictures': 'learning English', sledges: 'wheelchairs',
    'large-print books': 'small print', 'stories in Cree': 'speak Cree', audiobooks: 'listening', 'a quiet tent': 'noise', 'sign language': 'Deaf' };
  V['g5-message'] = (q, m) => mk(q).includes(MSG[text(m.t)]) ? '' : 'expected the message with "' + MSG[text(m.t)] + '"';
  V['g5-message-tf'] = (q, m) => { const right = text(m.said).includes(MSG[text(m.t)]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-access'] = (q, m) => H.sameSet(q.options.map((o, i) => GOOD[text(m.t)].some(g => text(o).includes(g)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful changes are not the ones marked';
  V['g5-match-helps'] = q => q.pairs.every(p => text(p[1]).includes(HELPS[text(p[0])])) ? '' : 'a change is matched to the wrong people';
})();
