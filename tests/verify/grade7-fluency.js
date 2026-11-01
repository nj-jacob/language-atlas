/* Grade 7 answer checks: reading fluently (grade7/chapters/fluency.js). Own lists: words that never end a phrase, where each sentence's phrases end,
   what each mark asks, pace by purpose, and which word carries a meaning. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const sents = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return [...d.querySelectorAll('.sent')]; };
  /* a phrase that ends on a little joining word is choppy */
  const JOIN = /\b(the|a|my|our|his|their|from|past|to|on|in|of|over|under|about|across|before|behind|during|after|when|every|each|whole|old|frozen|red|winning|cold|first|narrow|fastest|school|would)$/i;
  const smooth = o => o.split(' / ').every((p, i, all) => i === all.length - 1 || !JOIN.test(p.trim()));
  V['g7-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one smooth phrasing'; };
  V['g7-phrase-tf'] = q => { const said = text(sents(q)[0].innerHTML), right = smooth(said) && said.split(' / ').length === 3; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* the last word of the first and second phrase of each sentence */
  const ENDS = { 'The canoe drifted slowly past the old dock.': ['canoe', 'slowly'], 'After the storm, the whole town came out to help.': ['storm,', 'town'],
    'My cousin from Moncton plays the fiddle every Saturday night.': ['Moncton', 'fiddle'], 'Under the frozen lake, the fish move very slowly.': ['lake,', 'fish'],
    'When the bell rang, the students rushed to the doors.': ['rang,', 'students'], 'The scientists on the ship measured the ice each morning.': ['ship', 'ice'],
    'Every spring, the geese fly north over Lake Ontario.': ['spring,', 'geese'], 'The girl in the red jacket scored the winning goal in overtime.': ['jacket', 'goal'],
    'Before the race, Arjun stretched his legs.': ['race,', 'Arjun'], 'A family of beavers built a dam across the creek.': ['beavers', 'dam'],
    'On a cold January morning, the school bus would not start.': ['morning,', 'bus'], 'The elder told a story about the first snowfall.': ['elder', 'story'],
    'Behind the cabin, a narrow trail led to the lake.': ['cabin,', 'trail'], 'My grandmother makes bannock on Sunday mornings.': ['grandmother', 'bannock'],
    'During the blackout, our neighbours shared their candles.': ['blackout,', 'neighbours'], 'The fastest runner on our team is my friend Kai.': ['runner', 'team'] };
  V['g7-phrase-break'] = (q, m) => mk(q) === ENDS[m.s][m.which - 1] ? '' : 'expected ' + ENDS[m.s][m.which - 1];
  const MARK = { ',': 'a short pause', '?': 'your voice rises', '—': 'a sudden break', '…': 'trail off, or pause', '!': 'strong feeling', ';': 'a pause, then a linked idea',
    ':': 'a pause before a list or an explanation', '“': "switch to the speaker's voice" };
  const hlOf = q => { const d = document.createElement('div'); d.innerHTML = q.fig; return d.querySelector('mark').textContent; };
  V['g7-mark-voice'] = (q, m) => hlOf(q) === m.mark && mk(q) === MARK[hlOf(q)] ? '' : 'expected ' + MARK[hlOf(q)];
  V['g7-mark-match'] = q => q.pairs.every(p => MARK[text(p[0])] === text(p[1])) ? '' : 'a mark is matched wrong';
  V['g7-mark-which'] = q => { const want = text(q.q).match(/: (.+)\?$/)[1]; return MARK[mk(q)] === want ? '' : 'expected the mark that means ' + want; };
  V['g7-voice-tf'] = (q, m) => { const right = MARK[hlOf(q)] === text(m.said); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const PACES = ['slowly and carefully', 'faster, with energy', 'at a steady, clear pace'];
  const paceOf = w => /science|facts|study|recipe|rules|word problem/.test(w) ? 0 : /chase|funny|hockey|tongue twister/.test(w) ? 1 : /announcements|speech|report|younger child/.test(w) ? 2 : -1;
  V['g7-pace'] = (q, m) => mk(q) === PACES[paceOf(m.what)] ? '' : 'expected ' + PACES[paceOf(m.what)];
  V['g7-pace-which'] = q => { const want = PACES.indexOf(text(q.q).match(/read (.+)\?$/)[1]), ok = q.tiles.map(text).filter(t => paceOf(t) === want); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the reading that suits that pace'; };
  V['g7-pace-match'] = q => q.pairs.every(p => PACES[paceOf(text(p[0]))] === text(p[1])) ? '' : 'a reading is matched to the wrong pace';
  const PACE_TRUE = ['Good readers slow down when the text gets hard.', 'You can reread a sentence that did not make sense.', 'An audience needs a steady, clear voice.', 'Fast reading only helps if you still understand.'];
  V['g7-pace-tf'] = (q, m) => { const right = PACE_TRUE.includes(m.said); return q.answer === right && tfWhy(q, right) ? '' : 'true/false is wrong'; };
  /* what you mean -> the word that carries it */
  const STRESS = { 'Someone else took it.': 'I', 'I only borrowed it.': 'take', "I took someone else's bike.": 'your', 'I took your skateboard.': 'bike.', 'Not him. She said it.': 'She',
    'Not tomorrow. Today.': 'today.', 'Not the quiz. The test.': 'test', 'Not two. Three.': 'three', 'We do not just want them. We need them.': 'need', 'Not life jackets. Paddles.': 'paddles.',
    'Not Ana. Kai did.': 'Kai', 'Not yours. Mine.': 'my', 'Not the first one. The last one.': 'last', 'Not my muffin. My cookie.': 'cookie.',
    'Not the train. The bus.': 'bus', 'Not eight. Seven.': 'seven.', 'It leaves then. It does not arrive then.': 'leaves',
    'Not them. You.': 'You', 'You may borrow it, not keep it.': 'borrow', 'Not my kayak. My canoe.': 'canoe.' };
  const loudIn = html => { const d = document.createElement('div'); d.innerHTML = html; return text(d.querySelector('b').textContent).toLowerCase(); };
  V['g7-stress'] = (q, m) => mk(q) === STRESS[text(m.mean)] ? '' : 'expected ' + STRESS[text(m.mean)];
  V['g7-stress-meaning'] = q => STRESS[mk(q)] && STRESS[mk(q)].toLowerCase() === loudIn(q.fig) ? '' : 'the meaning marked does not match the stressed word';
  V['g7-stress-which'] = (q, m) => { const want = STRESS[text(m.mean)].toLowerCase(), ok = q.options.filter(o => loudIn(o) === want);
    return ok.length === 1 && q.options[q.answer] === ok[0] ? '' : 'expected the reading that stresses ' + want; };
  V['g7-stress-tf'] = (q, m) => { const right = STRESS[text(m.mean)].toLowerCase() === loudIn(q.fig); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
