/* Grade 2 answer checks: listening and speaking (grade2/chapters/talking.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const FITS = { 'I went camping last weekend.': 'Where did you sleep?', 'My grandma taught me to make dumplings.': 'What did you put inside them?', 'Our class has a new fish.': 'What colour is it?', 'I lost my first tooth!': 'Did it hurt?' };
  const BACK = { 'Put your boots by the door, then wash your hands.': 'Boots by the door, then wash my hands.', 'The library trip is on Thursday. Bring your book.': 'Thursday, and bring my book.', 'Feed the cat one scoop of food.': 'One scoop for the cat.' };
  const GOOD = /^(Nod|Say, "Wow|Ask a question|Wait until|Raise your hand|Let everyone)/;
  const ON = { 'our trip to the farm': 'We fed the goats.', 'how to plant a seed': 'Push the seed into the soil.', 'our favourite winter game': 'We love sledding down the big hill.' };
  const SHOWS = { 'a big smile': 'happy', 'a frown': 'upset', 'wide eyes': 'surprised', 'a shrug': 'not sure', 'a thumbs up': 'it is good' };
  const FOR = { 'your teacher': /^Excuse me/, 'a visitor to the class': /^Hello, thank you/, 'your best friend': /^Want to play/ };
  const EXACT = /heron|snow fort|green crayon|science centre/;
  const picks = (q, fits) => H.sameSet(q.options.map((o, i) => (fits(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);

  V['g2-good-question'] = (q, m) => mk(q) === FITS[m.said] ? '' : 'expected ' + FITS[m.said];
  V['g2-say-back'] = (q, m) => mk(q) === BACK[m.said] ? '' : 'expected ' + BACK[m.said];
  V['g2-interest'] = q => picks(q, o => GOOD.test(o)) ? '' : 'the interested moves are not the ones marked';
  V['g2-hard'] = q => /^(Ask them|Say what part)/.test(mk(q)) ? '' : 'expected asking for help';
  V['g2-listen-order'] = q => q.items.map(text).map(s => s.split(':')[0]).join(' ') === 'Before During After' ? '' : 'the steps are out of order';
  V['g2-on-topic'] = (q, m) => mk(q) === ON[m.topic] ? '' : 'expected ' + ON[m.topic];
  V['g2-turns'] = q => picks(q, o => GOOD.test(o)) ? '' : 'the turn-taking moves are not the ones marked';
  V['g2-body'] = (q, m) => mk(q) === SHOWS[m.move] ? '' : 'expected ' + SHOWS[m.move];
  V['g2-body-match'] = q => q.pairs.every(p => SHOWS[text(p[0])] === text(p[1])) ? '' : 'a move is matched to the wrong meaning';
  V['g2-who-for'] = (q, m) => FOR[m.who].test(mk(q)) ? '' : 'the words do not fit ' + m.who;
  V['g2-clearer'] = q => EXACT.test(mk(q)) ? '' : 'expected the exact sentence';
})();
