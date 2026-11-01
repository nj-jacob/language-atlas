/* Grade 5 answer checks: word parts and spelling (grade5/chapters/word-parts.js). Each one works the answer out again from what the child
   sees, with the checker's own word lists. Return '' when the marked answer is right, or a short message. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* prefixes: the checker's own bases and meanings */
  const BASE = { mis: 'spell read count hear judge print place behave lead use match step', pre: 'heat view pay cook wash set order test plan mix soak record',
    dis: 'agree like honest obey trust loyal connect approve please comfort' };
  const SAYS = { mis: 'wrongly', pre: 'before', dis: 'not' };
  const split = w => { const p = w.slice(0, 3), b = w.slice(3); return BASE[p] && BASE[p].split(' ').includes(b) ? { p, b } : null; };
  const meaningOf = w => { const s = split(w); return !s ? null : s.p === 'dis' ? 'not ' + s.b : s.b + ' ' + SAYS[s.p]; };
  const once = (list, want) => list.filter(x => x === want).length === 1;
  V['g5-pre-meaning'] = (q, m) => { const want = meaningOf(m.word), opts = q.options.map(text);
    return want && text(q.q).includes(m.word) && opts[q.answer] === want && once(opts, want) ? '' : 'expected "' + want + '"'; };
  V['g5-pre-which'] = (q, m) => { const tiles = q.tiles.map(text), ok = tiles.filter(t => meaningOf(t) === m.mean);
    return text(q.q).includes(m.mean) && ok.length === 1 && tiles[q.answer] === ok[0] ? '' : 'expected the word that means ' + m.mean; };
  V['g5-pre-build'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])).join(''); return meaningOf(b) === m.mean && text(q.q).includes(m.mean) ? '' : 'built ' + b + ' for ' + m.mean; };
  V['g5-pre-match'] = q => q.pairs.every(p => meaningOf(text(p[0])) === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  V['g5-pre-tf'] = (q, m) => { if ((meaningOf(m.word) === m.said) !== q.answer) return 'true/false is wrong for ' + m.word;
    const why = text(q.why.options[q.why.answer]), p = split(m.word).p; return why.startsWith(p + '-') && why.includes(SAYS[p]) ? '' : 'the reason does not fit'; };
  V['g5-pre-in-sent'] = q => { const w = text((q.fig.match(/<b>(.*?)<\/b>/) || [])[1] || '').toLowerCase(), p = Object.keys(SAYS).find(x => w.startsWith(x));
    return p && mk(q) === SAYS[p] ? '' : 'expected the meaning of the prefix in ' + w; };
  /* a real prefix leaves a base from the checker's list; every other tile must not */
  V['g5-pre-real'] = (q, m) => { const ok = q.tiles.map(text).filter(t => t.startsWith(m.p) && split(t)); return ok.length === 1 && mk(q) === ok[0] && text(q.q).includes(m.p + '-') ? '' : 'expected the one word with a real ' + m.p + '- prefix'; };
  /* drop the e before a vowel suffix: the checker's own list of correctly spelled words */
  const RIGHT = new Set(('adorable valuable notable excitable hoping riding smiling baking writing sharing skating paddling creation decoration nervous famous bravest wider ' +
    'excitement movement amazement hopeful careful graceful safety useful lonely nicely statement placement hopeless homeless timeless bravely').split(' '));
  const eRule = (base, suf) => (/^[aeiou]/.test(suf) ? base.slice(0, -1) : base) + suf;
  V['g5-e-word'] = (q, m) => { const w = mk(q); return RIGHT.has(w) && w === eRule(m.base, m.suf) && q.options.map(text).filter(o => RIGHT.has(o)).length === 1 ? '' : 'expected the right spelling of ' + m.base + ' + ' + m.suf; };
  V['g5-drop-keep'] = (q, m) => { const vowel = /^[aeiou]/.test(m.suf); return mk(q) === (vowel ? 'Drop the e' : 'Keep the e') ? '' : 'expected ' + (vowel ? 'drop' : 'keep'); };
  V['g5-pick-spelled'] = q => H.sameSet(q.options.map((o, i) => RIGHT.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right spellings are not the ones marked';
  V['g5-e-sent'] = (q, m) => { const w = mk(q); return RIGHT.has(w) && w === eRule(m.base, m.suf) ? '' : 'expected ' + eRule(m.base, m.suf); };
  V['g5-e-tf'] = (q, m) => { const right = m.said === eRule(m.base, m.suf) && RIGHT.has(m.said); return right === q.answer && text(q.fig) === m.said && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.said; };
  /* -able after a whole word, -ible after a part that is not a word */
  const WHOLE = new Set('read wash break comfort enjoy depend fix drink afford predict accept laugh agree fold remark'.split(' '));
  const NOT_WORD = new Set('vis poss terr horr ed incred aud leg sens respons invis tang'.split(' '));
  const ending = start => WHOLE.has(start) ? 'able' : NOT_WORD.has(start) ? 'ible' : null;
  const spell = start => start + ending(start);
  const SPELLED = new Set([...WHOLE, ...NOT_WORD].map(spell));
  V['g5-able-ible'] = (q, m) => mk(q) === ending(m.start) ? '' : 'expected -' + ending(m.start) + ' after ' + m.start;
  V['g5-able-spelled'] = (q, m) => mk(q) === spell(m.start) ? '' : 'expected ' + spell(m.start);
  V['g5-able-sent'] = (q, m) => mk(q) === spell(m.start) ? '' : 'expected ' + spell(m.start);
  V['g5-whole-word'] = (q, m) => { const s = [...WHOLE, ...NOT_WORD].find(x => spell(x) === m.word); return s && mk(q).includes('-' + ending(s)) ? '' : 'expected the ending of ' + m.word; };
  V['g5-pick-able'] = q => H.sameSet(q.options.map((o, i) => SPELLED.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right spellings are not the ones marked';
  /* roots: the checker's own meanings */
  const ROOT = { tele: 'far', phon: 'sound', graph: 'write', port: 'carry', spect: 'look', aud: 'hear', vis: 'see', bio: 'life', geo: 'earth', dict: 'say',
    scope: 'see', micro: 'small', therm: 'heat', meter: 'measure', photo: 'light', struct: 'build', rupt: 'break', tract: 'pull' };
  const WORD = { telephone: 'a tool that sends sound far away', autograph: 'a name you write yourself', portable: 'able to be carried', spectator: 'a person who looks on',
    audience: 'the people who hear a show', visible: 'able to be seen', biography: "writing about a person's life", geography: 'the study of the earth and its places',
    predict: 'to say what will happen before it does', transport: 'to carry from one place to another', inspect: 'to look at closely', audio: 'sound you can hear',
    dictionary: 'a book of words and what they say', vision: 'the power to see', microscope: 'a tool for seeing very small things', telescope: 'a tool for seeing things far away',
    thermometer: 'a tool that measures heat', photograph: 'a picture made with light', construct: 'to build something', structure: 'something that has been built',
    interrupt: 'to break in while someone is talking', erupt: 'to break out, like a volcano', tractor: 'a machine that pulls heavy loads', attract: 'to pull toward you',
    export: 'to carry goods out of a country', dictate: 'to say words for someone to write down' };
  const meansOf = w => Object.keys(WORD).find(x => w.toLowerCase().startsWith(x) || w.toLowerCase().replace(/s$/, '') === x);
  V['g5-root-meaning'] = (q, m) => mk(q) === ROOT[m.root] && once(q.options.map(text), ROOT[m.root]) ? '' : 'expected ' + ROOT[m.root];
  V['g5-root-match'] = q => q.pairs.every(p => ROOT[text(p[0])] === text(p[1])) ? '' : 'a root is matched to the wrong meaning';
  V['g5-root-word'] = (q, m) => { const ok = q.tiles.map(text).filter(t => WORD[t] === text(m.mean)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the word that means ' + m.mean; };
  V['g5-root-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => text(o).includes(m.root) ? i : -1).filter(i => i >= 0), q.answer) && text(q.q).includes(ROOT[m.root]) ? '' : 'the words with ' + m.root + ' are not the ones marked';
  V['g5-root-tf'] = (q, m) => (ROOT[m.root] === m.said) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.root + ' = ' + m.said;
  V['g5-root-tap'] = (q, m) => { const r = mk(q), want = text(q.q).match(/means (\w+)/)[1]; return ROOT[r] === want && m.word.includes(r) ? '' : 'expected the root in ' + m.word + ' that means ' + want; };
  V['g5-root-sent'] = q => { const w = meansOf(text((q.fig.match(/<b>(.*?)<\/b>/) || [])[1] || '')); return w && mk(q) === WORD[w] ? '' : 'expected the meaning of ' + w; };
  V['g5-root-word-tf'] = (q, m) => (WORD[m.word] === text(m.said)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.word;
  V['g5-root-word-match'] = q => q.pairs.every(p => WORD[text(p[0])] === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
})();
