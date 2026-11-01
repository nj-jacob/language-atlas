/* Grade 2 answer checks: grammar (grade2/chapters/grammar.js).
   Pronouns, "to be" and -er/-est are worked out by rule; group words, idea nouns and words that tell how from the checker's own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const GROUP = { geese: 'flock', whales: 'pod', caribou: 'herd', wolves: 'pack', fish: 'school', players: 'team', grapes: 'bunch', bees: 'swarm', puppies: 'litter', lions: 'pride', cards: 'deck', singers: 'choir' };
  const IDEAS = new Set('joy kindness fear courage hope friendship love sadness anger pride patience honesty'.split(' '));
  const isIdea = w => IDEAS.has(w.toLowerCase());
  /* the pronoun for a noun, by rule */
  const pro = n => (/\band I$/.test(n) ? 'We' : /s$/.test(n) ? 'They' : /\b(aunt|sister|girl|mom|grandma)$/i.test(n) ? 'She' : /\b(grandpa|brother|boy|dad|uncle)$/i.test(n) ? 'He' : 'It');
  /* the form of "to be", by rule: who it is about, and whether it is in the past */
  const be = s => { const past = /^(Yesterday|Last)/.test(s), who = s.replace(/^(Yesterday|Last week|Last night), /, '').split(' _')[0];
    if (who === 'I') return 'am'; const many = /^(we|they)$|s$|twins/i.test(who); return past ? (many ? 'were' : 'was') : (many ? 'are' : 'is'); };
  const past = f => ({ am: 'was', is: 'was', are: 'were' }[f]);
  /* -er with than (two things), -est with the (three or more) */
  const two = s => / than /.test(s);
  const cmp = (s, w) => (two(s) ? /er$/.test(w) : /\bthe _/.test(s) ? /est$/.test(w) : false);
  /* each sentence: its word that tells how, and the action word it tells about */
  const HOW = { 'The turtle walked slowly.': ['slowly', 'walked'], 'Mei sang softly.': ['softly', 'sang'], 'The dog barked loudly.': ['loudly', 'barked'], 'Owen ran quickly to the bus.': ['quickly', 'ran'],
    'Tala carefully carried the eggs.': ['carefully', 'carried'], 'The baby slept quietly.': ['quietly', 'slept'], 'The snow fell gently.': ['gently', 'fell'], 'Grandma smiled warmly at us.': ['warmly', 'smiled'],
    'Ben quietly opened the gift.': ['quietly', 'opened'], 'The wind blew wildly.': ['wildly', 'blew'], 'Ava neatly folded her shirt.': ['neatly', 'folded'], 'The bus slowly climbed the hill.': ['slowly', 'climbed'] };
  const tfOk = (q, yes) => q.answer === yes && q.why.answer === (yes ? 0 : 1);

  /* group nouns */
  V['g2-group'] = (q, m) => mk(q) === GROUP[m.of] ? '' : 'expected a ' + GROUP[m.of] + ' of ' + m.of;
  V['g2-group-match'] = q => q.pairs.every(p => GROUP[text(p[1])] === text(p[0])) ? '' : 'a group word is matched to the wrong group';
  V['g2-group-what'] = (q, m) => GROUP[mk(q)] === m.g ? '' : 'a ' + m.g + ' is not a group of ' + mk(q);
  V['g2-group-tf'] = (q, m) => tfOk(q, GROUP[m.of] === m.w) ? '' : 'expected ' + (GROUP[m.of] === m.w);
  /* idea nouns */
  V['g2-idea'] = q => H.sameSet(q.options.map((o, i) => (isIdea(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the idea nouns are not the ones marked';
  V['g2-idea-tap'] = (q, m) => mk(q).startsWith(isIdea(m.word) ? 'No' : 'Yes') ? '' : 'expected ' + (isIdea(m.word) ? 'No' : 'Yes') + ' for ' + m.word;
  V['g2-idea-touch'] = q => { const ok = q.options.map(text).filter(o => !isIdea(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one thing you can touch'; };
  V['g2-idea-find'] = (q, m) => { const ok = q.tiles.map(text).filter(isIdea); return ok.length === 1 && mk(q) === ok[0] && m.s.includes(ok[0]) ? '' : 'expected the one idea noun'; };
  /* pronouns */
  V['g2-pronoun'] = (q, m) => mk(q) === pro(m.noun) && H.has(q.fig, m.noun) ? '' : 'expected ' + pro(m.noun) + ' for ' + m.noun;
  V['g2-pronoun-match'] = q => q.pairs.every(p => pro(text(p[0])) === text(p[1])) ? '' : 'a noun is matched to the wrong pronoun';
  V['g2-pronoun-who'] = (q, m) => mk(q) === m.noun && pro(m.noun) === m.pr && q.options.map(text).filter(o => pro(o) === m.pr).length === 1 ? '' : 'expected ' + m.noun;
  V['g2-pronoun-tf'] = (q, m) => tfOk(q, pro(m.noun) === m.pr) ? '' : 'expected ' + (pro(m.noun) === m.pr);
  /* am, is, are, was, were */
  V['g2-be'] = (q, m) => mk(q) === be(m.s) ? '' : 'expected ' + be(m.s) + ' in "' + m.s + '"';
  V['g2-be-past'] = (q, m) => mk(q) === m.s.replace('_', past(be(m.s))) ? '' : 'expected the past of "' + m.s + '"';
  V['g2-be-tf'] = (q, m) => tfOk(q, be(m.s) === m.w) ? '' : 'expected ' + (be(m.s) === m.w);
  V['g2-be-match'] = q => q.pairs.every(p => be(text(p[0]) + ' _') === text(p[1])) ? '' : 'a word is matched to the wrong form';
  /* -er and -est */
  V['g2-compare'] = (q, m) => cmp(m.s, mk(q)) && q.tiles.map(text).filter(t => cmp(m.s, t)).length === 1 ? '' : 'the wrong form is marked for "' + m.s + '"';
  V['g2-compare-order'] = q => { const s = q.items.map(text); return s[1] === s[0] + 'er' && s[2] === s[0] + 'est' ? '' : 'not plain, -er, -est: ' + s.join(', '); };
  V['g2-compare-count'] = (q, m) => cmp(m.s, m.w) && mk(q) === (two(m.s) ? 'Two things' : 'Three or more') ? '' : 'expected ' + (two(m.s) ? 'two' : 'three or more');
  V['g2-compare-tf'] = (q, m) => tfOk(q, cmp(m.s, m.w)) ? '' : 'expected ' + cmp(m.s, m.w);
  /* words that tell how */
  V['g2-adverb'] = (q, m) => mk(q) === HOW[m.s][1] ? '' : 'expected ' + HOW[m.s][1];
  V['g2-adverb-find'] = (q, m) => mk(q) === HOW[m.s][0] ? '' : 'expected ' + HOW[m.s][0];
  V['g2-adverb-make'] = (q, m) => mk(q) === HOW[m.s][0] && q.tiles.map(text).filter(t => /ly$/.test(t)).length === 1 ? '' : 'expected ' + HOW[m.s][0];
  V['g2-adverb-tf'] = (q, m) => tfOk(q, HOW[m.s][1] === m.said) ? '' : 'expected ' + (HOW[m.s][1] === m.said);
})();
