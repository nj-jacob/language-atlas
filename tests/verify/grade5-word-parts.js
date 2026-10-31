/* Grade 5 answer checks: word parts and spelling (grade5/chapters/word-parts.js). Each one works the answer out again from what the child
   sees, with the checker's own word lists. Return '' when the marked answer is right, or a short message. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* prefixes: the checker's own bases and meanings */
  const BASE = { mis: 'spell read count hear judge print place', pre: 'heat view pay cook wash set', dis: 'agree like honest obey trust loyal' };
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
  /* spelling: the checker's own list of correctly spelled words */
  const RIGHT = new Set('lovable valuable usable adorable hoping riding smiling baking notable excitement movement amazement hopeful careful graceful safety'.split(' '));
  V['g5-e-word'] = (q, m) => { const w = mk(q); return RIGHT.has(w) && w.startsWith(m.base.slice(0, -1)) && q.options.map(text).filter(o => RIGHT.has(o)).length === 1 ? '' : 'expected the right spelling of ' + m.base + ' + ' + m.suf; };
  V['g5-drop-keep'] = (q, m) => { const vowel = /^[aeiou]/.test(m.suf); return mk(q) === (vowel ? 'Drop the e' : 'Keep the e') ? '' : 'expected ' + (vowel ? 'drop' : 'keep'); };
  V['g5-pick-spelled'] = q => H.sameSet(q.options.map((o, i) => RIGHT.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right spellings are not the ones marked';
  const ABLE_IBLE = new Set('readable washable breakable comfortable enjoyable dependable fixable visible possible terrible horrible edible incredible'.split(' '));
  V['g5-able-ible'] = (q, m) => { const ok = q.tiles.map(text).filter(t => ABLE_IBLE.has(m.start + t)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the ending that makes a real word from ' + m.start; };
  /* roots: the checker's own meanings */
  const ROOT = { tele: 'far', phon: 'sound', graph: 'write', port: 'carry', spect: 'look', aud: 'hear', vis: 'see', bio: 'life', geo: 'earth', dict: 'say' };
  const WORD = { telephone: 'a tool that sends sound far away', autograph: 'a name you write yourself', portable: 'able to be carried', spectator: 'a person who looks on',
    audience: 'the people who hear a show', visible: 'able to be seen', biography: "writing about a person's life", geography: 'the study of the earth and its places',
    predict: 'to say what will happen before it does', transport: 'to carry from one place to another', inspect: 'to look at closely', audio: 'sound you can hear',
    dictionary: 'a book of words and what they say', vision: 'the power to see' };
  V['g5-root-meaning'] = (q, m) => mk(q) === ROOT[m.root] && once(q.options.map(text), ROOT[m.root]) ? '' : 'expected ' + ROOT[m.root];
  V['g5-root-match'] = q => q.pairs.every(p => ROOT[text(p[0])] === text(p[1])) ? '' : 'a root is matched to the wrong meaning';
  V['g5-root-word'] = (q, m) => { const ok = q.tiles.map(text).filter(t => WORD[t] === text(m.mean).replace(/’/g, "'")); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the word that means ' + m.mean; };
  V['g5-root-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => text(o).includes(m.root) ? i : -1).filter(i => i >= 0), q.answer) && text(q.q).includes(ROOT[m.root]) ? '' : 'the words with ' + m.root + ' are not the ones marked';
})();
