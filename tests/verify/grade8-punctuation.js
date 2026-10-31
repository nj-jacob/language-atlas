/* Grade 8 answer checks: punctuation (grade8/chapters/punctuation.js). Each check applies the rule itself to what the child sees. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* a semicolon is right when the words after it can stand alone: they do not start with a word that begins a phrase */
  const PHRASE = /^(during|with|for|because|after)\b/;
  const semiOk = s => { const i = s.indexOf('; '); return i > 0 && /\.$/.test(s) && !PHRASE.test(s.slice(i + 2)); };
  const one = (q, ok) => ok(mk(q)) && q.options.map(text).filter(ok).length === 1;
  V['g8-semicolon'] = q => one(q, semiOk) ? '' : 'the semicolon marked is not right';
  V['g8-semi-tf'] = (q, m) => semiOk(text(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const advOk = s => /[a-z]; (however|therefore|as a result|in addition|meanwhile), [a-zA-Z]/.test(s);
  V['g8-adv-form'] = q => one(q, advOk) ? '' : 'expected a semicolon before and a comma after the joining word';
  const LINK = { 'The trail was steep': 'however', 'It rained all week': 'as a result', 'The bus broke down': 'therefore', 'The raccoon tipped over the bin': 'in addition',
    'Kai set the table': 'meanwhile', 'The tickets sold out quickly': 'however' };
  V['g8-adv-fit'] = (q, m) => mk(q) === LINK[m.a] ? '' : 'expected ' + LINK[m.a];
  V['g8-pick-semi'] = q => H.sameSet(q.options.map((o, i) => semiOk(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right sentences are not the ones marked';
  const colonOk = s => { const i = s.indexOf(': '); return i > 0 && !/\b(needs|bring|were|are|see|include)$/.test(s.slice(0, i)); };
  V['g8-colon-list'] = q => one(q, colonOk) ? '' : 'the colon marked does not follow a complete sentence';
  const colonJob = s => /^[A-Z][a-z]+: [A-Z]/.test(s) ? 'speaker' : /:$/.test(s) ? 'greeting' : /: “/.test(s) ? 'quotation' : /: \w+, /.test(s) ? 'list' : '';
  V['g8-colon-use'] = (q, m) => colonJob(text(m.s)) && mk(q).includes(colonJob(text(m.s))) ? '' : 'expected the colon to introduce a ' + colonJob(text(m.s));
  V['g8-match-colon'] = q => q.pairs.every(p => colonJob(text(p[0])) && text(p[1]).includes(colonJob(text(p[0])))) ? '' : 'an example is matched wrong';
  const quoteOk = s => /^[A-Z][^:]+: “[^”]+”$/.test(s);
  V['g8-quote'] = q => one(q, quoteOk) ? '' : 'expected a colon and quotation marks around the exact words';
  V['g8-break'] = (q, m) => mk(q) === (m.want === 'hesitation' ? '…' : '—') ? '' : 'wrong mark for ' + m.want;
  const EXTRAS = ['our science teacher', 'the capital of Nunavut', 'who lives in Halifax', 'a famous schooner', 'a very old beagle'];
  const extraOk = s => EXTRAS.some(x => s.includes(', ' + x + ','));
  V['g8-extra'] = q => one(q, extraOk) ? '' : 'expected commas on both sides of the extra information';
  V['g8-tap-extra'] = (q, m) => EXTRAS.includes(mk(q)) && text(m.s).includes(mk(q)) ? '' : 'the extra information is not the one marked';
  V['g8-comma-tf'] = (q, m) => extraOk(text(m.s)) === q.answer ? '' : 'true/false is wrong';
  const TRANS = ['First', 'Finally', 'In conclusion', 'For example', 'Afterward', 'On the other hand'];
  const transOk = s => TRANS.some(t => s.startsWith(t + ', '));
  V['g8-transition'] = q => one(q, transOk) ? '' : 'expected a comma right after the transition';
  const ADJ = ['Japanese', 'Italian', 'Ukrainian', 'Jamaican', 'Inuit', 'French', 'Mexican'];
  const properOk = s => ADJ.some(a => new RegExp('\\b' + a + ' [a-z]+\\.$').test(s));
  V['g8-proper'] = q => one(q, properOk) ? '' : 'expected a capital for the proper adjective only';
})();
