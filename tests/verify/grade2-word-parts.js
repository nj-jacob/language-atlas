/* Grade 2 answer checks: word parts (grade2/chapters/word-parts.js).
   The checker reads the prefix or suffix off the word itself and keeps its own meanings. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q);
  const NUMBER = { uni: 'one', bi: 'two', tri: 'three' }, DIGIT = { one: '1', two: '2', three: '3' };
  const numOf = w => Object.keys(NUMBER).find(p => w.startsWith(p) && ['cycle', 'corn', 'lingual', 'plane', 'angle', 'pod', 'ceratops'].includes(w.slice(p.length)));
  const MEANS = { mis: 'wrongly', pre: 'before' };
  const preOf = w => Object.keys(MEANS).find(p => w.startsWith(p));
  /* the suffix and what it means, read off the end of the word */
  const SUF = [['ness', 'being '], ['er', 'a person who '], ['or', 'a person who '], ['y', 'with lots of ']];
  const sufOf = w => SUF.find(s => w.endsWith(s[0]));
  const REAL = new Set(('teacher painter farmer singer helper builder reader player sailor actor inventor visitor conductor kindness sadness darkness softness fairness loudness brightness goodness ' +
    'rainy windy sandy snowy rocky cloudy dusty bumpy').split(' '));
  /* sentences, and the word that belongs in each */
  const FILL = { 'Check your work so you do not ___ a word.': 'misspell', 'I ___ the sign and went the wrong way.': 'misread', 'Count again so you do not ___ the eggs.': 'miscount',
    'Put your key in the bowl so you do not ___ it.': 'misplace', 'Do not ___ the scissors.': 'misuse', 'The puppy will ___ if it is bored.': 'misbehave', 'Speak clearly so I do not ___ you.': 'mishear',
    'We ___ the oven, then we bake.': 'preheat', 'Let us ___ the book before we read it.': 'preview', 'You can ___ for your ticket online.': 'prepay', 'Dad will ___ the rice before the party.': 'precook',
    'We take a ___ before we learn the new words.': 'pretest', '___ the beans in water overnight.': 'presoak', 'We will ___ the book, so we get it on the first day.': 'preorder',
    'Our ___ reads us a story.': 'teacher', 'The ___ painted our fence.': 'painter', 'The ___ grows corn.': 'farmer', 'The ___ sang a song.': 'singer', 'I was the class ___ today.': 'helper',
    'The ___ made a new house.': 'builder', 'My brother is a fast ___.': 'reader', 'Each ___ gets a turn.': 'player', 'The ___ steered the boat.': 'sailor', 'The ___ was in a play.': 'actor',
    'The ___ made a new machine.': 'inventor', 'We had a ___ at school today.': 'visitor', 'The ___ led the band.': 'conductor', 'Thank you for your ___.': 'kindness',
    'Her ___ went away when her friend came.': 'sadness', 'The owl hunts in the ___.': 'darkness', 'I love the ___ of my blanket.': 'softness', 'Taking turns shows ___.': 'fairness',
    'The ___ of the drum hurt my ears.': 'loudness', 'The ___ of the sun made me squint.': 'brightness', 'She helped out of the ___ of her heart.': 'goodness', 'Take an umbrella on a ___ day.': 'rainy',
    'It is ___, so fly your kite.': 'windy', 'My feet were ___ after the beach.': 'sandy', 'We built a fort on a ___ day.': 'snowy', 'The path up the hill was ___.': 'rocky',
    'It is ___, so we cannot see the sun.': 'cloudy', 'The old box was ___.': 'dusty', 'The dirt road was ___.': 'bumpy' };
  /* the base word inside a meaning: "a person who teaches" -> teach, "with lots of rocks" -> rock, "being kind" -> kind */
  const baseIn = mean => { const b = mean.replace(/^(a person who|being|with lots of) /, ''); return /^being /.test(mean) ? b : b.replace(/(ch|sh)es$/, '$1').replace(/s$/, ''); };
  const meanOk = (w, mean) => { const s = sufOf(w); return !!s && REAL.has(w) && mean.startsWith(s[1]) && w.slice(0, -s[0].length) === baseIn(mean); };

  V['g2-num-meaning'] = (q, m) => { const p = numOf(m.word); return p && mk(q) && mk(q).startsWith(NUMBER[p] + ' ') ? '' : 'expected ' + (p && NUMBER[p]); };
  V['g2-num-which'] = (q, m) => { const w = mk(q) || ''; return NUMBER[numOf(w)] === m.n && w.endsWith('cycle') ? '' : 'expected the word for ' + m.n; };
  V['g2-num-count'] = (q, m) => mk(q) === DIGIT[NUMBER[numOf(m.word)]] ? '' : 'expected ' + DIGIT[NUMBER[numOf(m.word)]];
  V['g2-num-match'] = q => q.pairs.every(p => text(p[1]).startsWith(NUMBER[numOf(text(p[0]))] + ' ')) ? '' : 'a word is matched to the wrong number';
  V['g2-num-build'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])).join(''); return NUMBER[numOf(b)] === m.n && b.endsWith('cycle') ? '' : 'built ' + b; };

  V['g2-pre-meaning'] = (q, m) => { const p = preOf(m.word), base = m.word.slice(p.length); return mk(q) === base + ' ' + MEANS[p] ? '' : 'expected ' + base + ' ' + MEANS[p]; };
  const preFits = (w, mean) => { const p = preOf(w); return !!p && w.slice(p.length) + ' ' + MEANS[p] === mean; };
  V['g2-pre-which'] = (q, m) => preFits(mk(q) || '', m.mean) ? '' : 'expected the word that means ' + m.mean;
  V['g2-pre-add'] = (q, m) => { const p = text(q.tiles[q.answer]); return m.mean.endsWith(' ' + MEANS[p]) ? '' : p + '- does not mean ' + m.mean; };
  V['g2-pre-build'] = (q, m) => preFits(q.answer.map(i => text(q.parts[i])).join(''), m.mean) && /^(mis|pre)$/.test(text(q.parts[q.answer[0]])) ? '' : 'built the wrong word';
  V['g2-pre-match'] = q => q.pairs.every(p => preFits(text(p[0]), text(p[1]))) ? '' : 'a word is matched to the wrong meaning';
  V['g2-pre-real'] = (q, m) => { const BASES = /^(spell|read|count|place|use|match|behave|hear|judge|lead|heat|view|pay|wash|cook|test|order|soak|set)$/; const want = q.options.map((o, i) => (text(o).startsWith(m.pre) && BASES.test(text(o).slice(m.pre.length)) ? i : -1)).filter(i => i >= 0);
    return want.length && H.sameSet(want, q.answer) ? '' : 'the words with the prefix are not the ones marked'; };

  V['g2-suf-meaning'] = (q, m) => meanOk(m.word, mk(q) || '') ? '' : 'the marked meaning does not fit ' + m.word;
  V['g2-suf-ending'] = (q, m) => { const e = (mk(q) || '').slice(1), base = text(q.fig).replace('?', '').trim(); return meanOk(base + e, m.mean) ? '' : '-' + e + ' does not make ' + m.mean; };
  V['g2-suf-build'] = (q, m) => meanOk(q.answer.map(i => text(q.parts[i])).join(''), m.mean) ? '' : 'built the wrong word';
  V['g2-suf-match'] = q => q.pairs.every(p => meanOk(text(p[0]), text(p[1]))) ? '' : 'a word is matched to the wrong meaning';
  V['g2-suf-tf'] = (q, m) => { const rule = { er: 'a person who', ness: 'being', y: 'with lots of' }; const why = text(q.why.options[q.why.answer]);
    return (rule[m.suf] === m.said) === q.answer && why === '-' + m.suf + ' means ' + rule[m.suf] + '.' ? '' : 'true/false or the reason is wrong'; };
  V['g2-num-tf'] = (q, m) => { const yes = String(m.said) === DIGIT[NUMBER[numOf(m.word)]]; return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-pre-fill'] = (q, m) => mk(q) === FILL[m.s] ? '' : 'expected ' + FILL[m.s];
  V['g2-pre-tf'] = (q, m) => { const yes = preFits(m.word, m.said); return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-pre-sort'] = (q, m) => { const want = q.options.map((o, i) => (MEANS[preOf(text(o))] === m.mean ? i : -1)).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'expected the words that mean ' + m.mean; };
  V['g2-suf-fill'] = (q, m) => mk(q) === FILL[m.s] ? '' : 'expected ' + FILL[m.s];
  V['g2-suf-word-tf'] = (q, m) => { const yes = meanOk(m.word, m.said); return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
})();
