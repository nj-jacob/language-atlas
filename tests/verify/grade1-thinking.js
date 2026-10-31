/* Grade 1 answer checks: thinking about texts (grade1/chapters/thinking.js). The checker keeps its own answer key and word lists,
   and works out rhymes, matching first sounds and the order of events from the words themselves. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const TITLE = { 'Bears in Winter': 'how bears live in the cold months', 'My First Day of School': 'a child starting school', 'How to Build a Snowman': 'the steps to make a snowman', 'The Lost Puppy': 'a puppy that gets lost' };
  const SYMBOL = { '+': 'add', '→': 'go this way', '♥': 'love', '?': 'a question', '=': 'the same as' };
  const PIC = { 'The bee buzzed near the flowers.': 'bee', 'We ate an apple at snack time.': 'apple', 'The moon is bright tonight.': 'moon', 'I kicked the ball to Sam.': 'ball', 'The fox ran into the woods.': 'fox',
    'Dad opened the door with a key.': 'key', 'A bird sat on its nest.': 'nest', 'The bus stopped at the school.': 'bus', 'I put my hat on my head.': 'hat', 'A fish swam in the lake.': 'fish' };
  const VIVID = /fluffy white|hot, sunny|hungry orange|tall pine|zoomed down/;
  const SOUND = new Set('buzz splash moo pop crash boom hiss quack'.split(' '));
  /* rhyme: the same letters from the last vowel to the end */
  const rime = w => (w.match(/[aeiou]+[^aeiou]*e?$/) || [''])[0];
  const allSame = s => { const w = text(s).replace(/[.!?]/g, '').split(' '); return w.length >= 3 && w.every(x => x[0].toLowerCase() === w[0][0].toLowerCase()); };
  const FEEL = { 'sad': 'fell on the ground', 'excited': 'jumped up and down', 'scared': 'hid under her blanket', 'proud': 'smiled and showed', 'tired': 'eyes kept closing' };
  const TEXT_FEEL = { 'How does Tala feel when the kite goes up?': 'excited', 'How did the narrator feel outside at the end?': 'cold' };
  const VIEW = { Omar: 'Winter is great.', Hana: 'Quiet places are best.', Mateo: 'Dogs make great pets.' };
  const picName = h => { const d = document.createElement('div'); d.innerHTML = h; const s = d.querySelector('svg'); return s && s.getAttribute('aria-label'); };

  V['g1-title-tells'] = (q, m) => mk(q) === TITLE[m.t] ? '' : 'expected ' + TITLE[m.t];
  V['g1-symbol'] = q => mk(q) === SYMBOL[text(q.fig)] ? '' : 'expected ' + SYMBOL[text(q.fig)];
  V['g1-steps-why'] = q => /order of the steps/.test(mk(q)) ? '' : 'expected the order of the steps';
  V['g1-pic-match'] = (q, m) => { const names = q.tiles.map(picName), want = PIC[m.s]; return want && names[q.answer] === want && names.filter(n => n === want).length === 1 && text(q.fig) === m.s ? '' : 'expected the picture of ' + want; };
  V['g1-word-choice'] = q => { const ok = q.options.map(text).filter(o => VIVID.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with picture words'; };
  V['g1-rhyme'] = (q, m) => { const ok = q.options.map(text).filter(o => o !== m.w && rime(o) === rime(m.w)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one word that rhymes with ' + m.w; };
  V['g1-rhyme-poem'] = (q, m) => { const ok = q.options.map(text).filter(o => rime(o) === rime(m.w) || (m.w === 'drop' && o === 'top') || (m.w === 'sun' && o === 'done')); return ok.length === 1 && mk(q) === ok[0] && text(q.fig).includes(ok[0]) ? '' : 'expected the rhyme for ' + m.w; };
  V['g1-sound-word'] = q => { const ok = q.options.map(text).filter(o => SOUND.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sound word'; };
  V['g1-pick-sound'] = q => H.sameSet(q.options.map((o, i) => SOUND.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the sound words are not the ones marked';
  V['g1-same-start'] = q => { const ok = q.options.filter(allSame).map(text); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence where every word starts the same'; };
  V['g1-feeling'] = (q, m) => { const f = mk(q); return FEEL[f] && m.text.includes(FEEL[f]) && text(q.fig) === text(m.text) ? '' : 'the feeling does not fit the clue'; };
  V['g1-text-feel'] = (q, m) => mk(q) === TEXT_FEEL[m.q] ? '' : 'expected ' + TEXT_FEEL[m.q];
  V['g1-order'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const all = [...d.querySelectorAll('.psg p')].map(p => text(p.innerHTML)).join(' '), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, '')));
    return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g1-view'] = (q, m) => mk(q) === VIEW[m.who] ? '' : 'expected ' + VIEW[m.who];
  V['g1-letter-view'] = q => mk(q) === 'He loves the scarf.' && /I wear it every day/.test(text(q.fig)) ? '' : 'expected that Arjun loves the scarf';
})();
