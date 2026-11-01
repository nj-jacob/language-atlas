/* Grade 2 answer checks: writing and publishing (grade2/chapters/writing.js). Point of view is worked out from the words; the rest from the checker's own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const first = s => /\b(I|we|We|my|My|our|Our)\b/.test(s);
  /* plain sentences have no describing word or feeling from these lists */
  const PLAIN = new Set(['I have a dog.', 'We went to the beach.', 'I ate soup.', 'It snowed.', 'We went skating.', 'I saw a bird.', 'We had a picnic.', 'I got a book.', 'It rained.', 'We went to the farm.']);
  const voiced = s => !PLAIN.has(s) && /fluffy|warm|spicy|fat|shiny|tiny|crunchy|brand-new|drummed|cozy|giggled|cheered|laugh|fly/.test(s);
  const DESC = new Set('fluffy crunchy huge bright sticky loud shiny icy tiny warm soft muddy'.split(' '));
  const FEEL = new Set('proud nervous excited calm thankful scared surprised happy'.split(' '));
  const OFF = { 'My dog Biscuit': 'My aunt lives in Regina.', 'Making a snowman': 'Summer is my favourite season.', 'Our class garden': 'My brother plays the drums.', 'Our trip to the lake': 'My shoes are too small.',
    'My grandma': 'Buses are yellow.', 'Hockey practice': 'My cat likes boxes.', 'All about bees': 'I have a blue bike.', 'A rainy day': 'Pizza is my favourite food.' };
  const ADD = { 'My dog Biscuit': 'He sleeps at the end of my bed.', 'Making a snowman': 'Last, we gave him a carrot nose.', 'Our class garden': 'In September we picked the beans.',
    'Our trip to the lake': 'We ate sandwiches on the dock.', 'My grandma': 'She taught me to bead.', 'Hockey practice': 'I scored on the last drill.', 'All about bees': 'They live in a hive.', 'A rainy day': 'We read books by the window.' };
  /* a sentence is ready when it starts with a capital, names have capitals, it ends with the right mark, and no word is misspelled */
  const MISSPELT = /\b(parck|sed|frend|skool)\b/, NAMES = /\b(london|canada|ava|omar)\b/, ASKS = /^(Where|Can|Is)\b/;
  const kindOf = s => (!/^[A-Z]/.test(s) || NAMES.test(s) ? 'capital' : !/[.?!]$/.test(s) || (ASKS.test(s) !== /\?$/.test(s)) ? 'end mark' : MISSPELT.test(s) ? 'spelling' : '');
  const wrongWord = s => s.split(' ').find((w, i) => (i === 0 && /^[a-z]/.test(w)) || NAMES.test(w) || MISSPELT.test(w)) || s.split(' ').pop();
  const tfOk = (q, yes) => q.answer === yes && q.why.answer === (yes ? 0 : 1);
  const one = (q, fits) => { const ok = q.options.map(text).filter(fits); return ok.length === 1 && mk(q) === ok[0]; };

  /* voice */
  V['g2-voice-w'] = q => one(q, voiced) ? '' : 'expected the one sentence with voice';
  V['g2-describe'] = (q, m) => DESC.has(mk(q)) && q.tiles.map(text).filter(t => DESC.has(t)).length === 1 ? '' : 'expected the describing word in "' + m.s + '"';
  V['g2-feel-word'] = (q, m) => FEEL.has(mk(q)) && q.tiles.map(text).filter(t => FEEL.has(t)).length === 1 ? '' : 'expected the feeling word in "' + m.s + '"';
  V['g2-voice-tf'] = (q, m) => tfOk(q, voiced(m.s)) ? '' : 'expected ' + voiced(m.s);
  /* point of view */
  V['g2-pov'] = (q, m) => q.answer === (first(m.s) ? 0 : 1) ? '' : 'expected ' + (first(m.s) ? 'first person' : 'someone else');
  V['g2-pov-pick'] = q => H.sameSet(q.options.map((o, i) => (first(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the first-person sentences are not the ones marked';
  V['g2-pov-change'] = q => one(q, first) && !first(text(q.fig)) ? '' : 'expected the one first-person sentence';
  V['g2-pov-tf'] = (q, m) => q.answer === (first(m.s) === m.says) && q.why.answer === (first(m.s) ? 0 : 1) ? '' : 'true/false or the reason is wrong for ' + m.s;
  /* revising */
  V['g2-no-belong'] = (q, m) => mk(q) === OFF[m.topic] ? '' : 'expected ' + OFF[m.topic];
  V['g2-add-one'] = (q, m) => mk(q) === ADD[m.topic] ? '' : 'expected ' + ADD[m.topic];
  V['g2-revise-tf'] = (q, m) => tfOk(q, OFF[m.topic] === m.out) ? '' : 'expected ' + (OFF[m.topic] === m.out);
  V['g2-revise-which'] = (q, m) => mk(q) === (m.after.length > m.before.length ? 'added a sentence' : 'took out a sentence') ? '' : 'the count of sentences says otherwise';
  /* editing */
  V['g2-find-err'] = (q, m) => mk(q) === wrongWord(m.s) && kindOf(m.s) ? '' : 'expected ' + wrongWord(m.s);
  V['g2-fix-err'] = q => one(q, o => kindOf(o) === '') ? '' : 'expected the one sentence with no mistakes';
  V['g2-err-kind'] = (q, m) => mk(q) === kindOf(m.s) ? '' : 'expected ' + kindOf(m.s);
  V['g2-edit-tf'] = (q, m) => tfOk(q, kindOf(m.s) === '') ? '' : 'expected ' + (kindOf(m.s) === '');
})();
