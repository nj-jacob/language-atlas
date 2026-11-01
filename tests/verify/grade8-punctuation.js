/* Grade 8 answer checks: punctuation (grade8/chapters/punctuation.js). Each check applies the rule itself to what the child sees. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const one = (q, ok) => ok(mk(q)) && q.options.map(text).filter(ok).length === 1;
  const picks = (q, ok) => H.sameSet(q.options.map((o, i) => ok(text(o)) ? i : -1).filter(i => i >= 0), q.answer);

  /* a semicolon is right when the words after it can stand alone: they do not start with a word that begins a phrase */
  const PHRASE = /^(during|with|for|because|after)\b/;
  const semiOk = s => { const i = s.indexOf('; '); return i > 0 && /\.$/.test(s) && !PHRASE.test(s.slice(i + 2)); };
  V['g8-semicolon'] = q => one(q, semiOk) ? '' : 'the semicolon marked is not right';
  V['g8-semi-tf'] = (q, m) => semiOk(text(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g8-pick-semi'] = q => picks(q, semiOk) ? '' : 'the right sentences are not the ones marked';
  V['g8-semi-fix'] = (q, m) => mk(q) === ';' && semiOk(text(m.s).replace(', ', '; ')) ? '' : 'a semicolon fixes a comma between two sentences';

  /* however and friends: a semicolon before, a comma after */
  const advOk = s => /[a-z]; (however|therefore|as a result|in addition|meanwhile), [a-zA-Z]/.test(s);
  V['g8-adv-form'] = q => one(q, advOk) ? '' : 'expected a semicolon before and a comma after the joining word';
  V['g8-adv-tf'] = (q, m) => advOk(text(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  /* the joining word each pair needs: the checker's own key */
  const LINK = { 'The trail was steep': 'however', 'It rained all week': 'as a result', 'The bus broke down': 'therefore', 'The raccoon tipped over the bin': 'in addition',
    'Kai set the table': 'meanwhile', 'The tickets sold out quickly': 'however', 'The test was hard': 'however', 'Zara practised every day': 'as a result', 'The road was icy': 'therefore',
    'We cleaned the beach': 'in addition', 'Dad grilled the fish': 'meanwhile', 'The movie was long': 'however', 'The pipe burst': 'as a result', 'Omar lost his ticket': 'therefore',
    'The museum offers tours': 'in addition' };
  const JOB = { however: 'contrast', therefore: 'result', 'as a result': 'result', 'in addition': 'adds', meanwhile: 'same time' };
  V['g8-adv-fit'] = (q, m) => mk(q) === LINK[m.a] ? '' : 'expected ' + LINK[m.a];
  V['g8-adv-job'] = (q, m) => mk(q).includes(JOB[m.w]) ? '' : 'expected the job "' + JOB[m.w] + '"';

  /* colons: never right after a verb or "include" */
  const colonOk = s => { const i = s.indexOf(': '); return i > 0 && !/\b(needs|bring|were|are|see|include|pack|visited|holds|plays|passes)$/.test(s.slice(0, i)); };
  V['g8-colon-list'] = q => one(q, colonOk) ? '' : 'the colon marked does not follow a complete sentence';
  V['g8-colon-tf'] = (q, m) => { const right = colonOk(text(m.s)); return q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'expected ' + right; };
  const colonJob = s => /^[A-Z][a-z]+: [A-Z]/.test(s) ? 'speaker' : /:$/.test(s) ? 'greeting' : /: “/.test(s) ? 'quotation' : /: [\w ]+, /.test(s) ? 'list' : '';
  V['g8-colon-use'] = (q, m) => colonJob(text(m.s)) && mk(q).includes(colonJob(text(m.s))) ? '' : 'expected the colon to introduce a ' + colonJob(text(m.s));
  V['g8-match-colon'] = q => q.pairs.every(p => colonJob(text(p[0])) && text(p[1]).includes(colonJob(text(p[0])))) ? '' : 'an example is matched wrong';

  /* quotations: a complete sentence, a colon, the exact words in quotation marks */
  const quoteOk = s => /^[A-Z][^:“]+: “[^”]+”$/.test(s);
  const missing = s => quoteOk(s) ? 'nothing' : /“/.test(s) ? 'a colon' : 'quotation marks';
  V['g8-quote'] = q => one(q, quoteOk) ? '' : 'expected a colon and quotation marks around the exact words';
  V['g8-quote-tf'] = (q, m) => quoteOk(text(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  V['g8-quote-missing'] = (q, m) => mk(q) === missing(text(m.s)) ? '' : 'expected ' + missing(text(m.s));
  V['g8-pick-quote'] = q => picks(q, quoteOk) ? '' : 'the right quotations are not the ones marked';

  /* dashes and ellipses */
  const shows = s => /…/.test(s) ? 'hesitation' : /—/.test(s) ? 'a sudden break' : /:/.test(s) ? 'a list is coming' : '';
  V['g8-break'] = (q, m) => mk(q) === (m.want === 'hesitation' ? '…' : '—') ? '' : 'wrong mark for ' + m.want;
  V['g8-break-shows'] = (q, m) => mk(q) === shows(text(m.s)) ? '' : 'expected ' + shows(text(m.s));
  V['g8-break-tf'] = (q, m) => q.answer === (shows(text(m.s)) === m.said) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  V['g8-break-which'] = (q, m) => one(q, o => shows(o) === m.want) ? '' : 'the sentence marked does not show ' + m.want;
  V['g8-break-match'] = q => q.pairs.every(p => shows(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched wrong';

  /* commas around extra information: the checker's own list of the extra words */
  const EXTRAS = ['our science teacher', 'the capital of Nunavut', 'who lives in Halifax', 'a famous schooner', 'a very old beagle', 'the bus driver', 'a glacier lake in Alberta',
    'a retired fisher', 'which opened in 1976', 'Ms. Tremblay', 'part of Parliament', 'my best friend', 'a seabird with a bright beak', 'an old cedar strip', "the world's longest skating rink"];
  const extraOk = s => EXTRAS.some(x => s.includes(', ' + x + ','));
  V['g8-extra'] = q => one(q, extraOk) ? '' : 'expected commas on both sides of the extra information';
  V['g8-tap-extra'] = (q, m) => EXTRAS.includes(mk(q)) && text(m.s).includes(mk(q)) ? '' : 'the extra information is not the one marked';
  V['g8-comma-tf'] = (q, m) => extraOk(text(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g8-pick-extra'] = q => picks(q, extraOk) ? '' : 'the right sentences are not the ones marked';

  /* transitions: the checker's own list */
  const TRANS = ['First', 'Finally', 'In conclusion', 'For example', 'Afterward', 'On the other hand', 'However', 'Next', 'As a result', 'In the meantime', 'Surprisingly',
    'Later that night', 'In addition', 'Meanwhile', 'Overall'];
  const transOk = s => TRANS.some(t => s.startsWith(t + ', '));
  V['g8-transition'] = q => one(q, transOk) ? '' : 'expected a comma right after the transition';
  V['g8-transition-tf'] = (q, m) => transOk(text(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  V['g8-tap-transition'] = (q, m) => TRANS.includes(mk(q)) && text(m.s).startsWith(mk(q) + ', ') ? '' : 'the transition is not the words marked';
  V['g8-pick-transition'] = q => picks(q, transOk) ? '' : 'the right sentences are not the ones marked';

  /* proper adjectives: capital for the adjective, small letter for the noun after it */
  const ADJ = ['Japanese', 'Italian', 'Ukrainian', 'Jamaican', 'Inuit', 'French', 'Mexican', 'Korean', 'Greek', 'Cree', 'Canadian', 'Haitian', 'Filipino', 'Ojibwe', 'Portuguese'];
  const properOk = s => ADJ.some(a => new RegExp('\\b' + a + ' [a-z]+\\b').test(s));
  V['g8-proper'] = q => one(q, properOk) ? '' : 'expected a capital for the proper adjective only';
  V['g8-proper-tf'] = (q, m) => properOk(text(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  V['g8-proper-tap'] = q => ADJ.some(a => a.toLowerCase() === mk(q)) ? '' : 'the word that needs a capital is not the one marked';
  V['g8-pick-proper'] = q => picks(q, properOk) ? '' : 'the right sentences are not the ones marked';
})();
