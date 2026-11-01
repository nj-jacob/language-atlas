/* Grade 6 answer checks: complex sentences (grade6/chapters/sentences.js). The checker finds clauses by their joining words,
   decides who/which/whose from its own list of people and things, and keeps its own key for the joining words and combined sentences. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SUB = /^(Although|Even though|Because|Unless|Until|When|If|After|Since|While)\b/i;
  const SUBIN = /\b(although|even though|because|unless|until|when|if|after)\b/i;
  const SHOWS = { although: 'a surprise or contrast', 'even though': 'a surprise or contrast', because: 'a reason', unless: 'a condition (what must happen)', if: 'a condition (what must happen)', until: 'when it happens', when: 'when it happens', after: 'when it happens' };
  const RIGHT = { 'we played outside': 'although', 'the game was cancelled': 'because', 'you cannot go to the lake': 'unless', 'we waited at the dock': 'until', 'the crowd cheered': 'when',
    'Priya kept practising': 'even though', 'the library closed early': 'because', 'we will plant the garden': 'if',
    'we stayed inside': 'because', 'Mila finished the puzzle': 'although', 'the bus will leave': 'when', 'we can see the comet': 'if', 'the river rose quickly': 'after',
    'Jonah wore shorts': 'even though', 'the puppy will not sleep': 'unless', 'the class planted trees': 'because' };
  /* a main clause: no joining word at the start, and it is one of the sentence's own clauses */
  V['g6-stand-alone'] = (q, m) => { const t = q.tiles.map(text), main = t.filter(x => !SUB.test(x) && text(m.s).toLowerCase().includes(x.replace(/\.$/, '').toLowerCase()) && x.split(' ').length > 2);
    return main.length === 1 && mk(q) === main[0] ? '' : 'expected the main clause'; };
  V['g6-join-word'] = (q, m) => mk(q) === RIGHT[m.main] ? '' : 'expected ' + RIGHT[m.main];
  V['g6-shows'] = (q, m) => H.has(q.fig, m.word) || H.has(q.fig, m.word.charAt(0).toUpperCase() + m.word.slice(1)) ? (mk(q) === SHOWS[m.word] ? '' : 'expected ' + SHOWS[m.word]) : 'the sentence does not use ' + m.word;
  V['g6-fragment'] = (q, m) => { const frag = SUB.test(m.shown); return q.answer === !frag && q.why.answer === (frag ? 1 : 0) ? '' : 'true/false is wrong for ' + m.shown; };
  V['g6-pick-complex'] = q => H.sameSet(q.options.map((o, i) => (SUBIN.test(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the complex sentences are not the ones marked';

  V['g6-tap-dep'] = q => { const d = q.tiles.map((t, i) => SUB.test(text(t)) ? i : -1).filter(i => i >= 0); return d.length === 1 && q.answer === d[0] ? '' : 'expected the part that starts with a joining word'; };
  /* a fix has a main clause from the checker's key, joined by its own joining word */
  const fixed = o => Object.keys(RIGHT).some(main => o.toLowerCase().includes(main.toLowerCase()) && new RegExp('\\b' + RIGHT[main] + '\\b', 'i').test(o));
  V['g6-fix-fragment'] = q => { const good = q.options.map(text).filter(fixed); return good.length === 1 && mk(q) === good[0] ? '' : 'expected the one with a main clause added'; };
  V['g6-join-tf'] = (q, m) => (SHOWS[m.word] === m.said) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.word;

  /* relative words: people take who, things take which or that, and a noun followed by what belongs to it takes whose */
  const PEOPLE = /^(The girl|The boy|My grandmother|The author|The students|Mr\. Okafor|The coach|The neighbour|The pilot|The artist|Ms\. Lavoie|Our neighbour|Elder Joseph)\b/,
    THINGS = /^(The canoe|The trail|The lake|The museum|The tent|Our school|The bridge|The bannock|The ferry|The library)\b/;
  const OWNED = /^(bike|book|dog|mural)\b/;
  const relFor = (before, after) => OWNED.test(after) ? 'whose' : PEOPLE.test(before) ? 'who' : THINGS.test(before) ? (/,$/.test(before) ? 'which' : 'that|which') : null;
  const fits = (want, w) => !!want && new RegExp('^(' + want + ')$').test(w);
  V['g6-rel-word'] = (q, m) => { const x = m.s.match(/^(.*?)\s(who|which|that|whose)\s(.*)$/), want = x && relFor(x[1], x[3]);
    return H.has(q.fig, x[3].split(' ')[0]) && fits(want, mk(q)) && q.options.map(text).filter(o => fits(want, o)).length === 1 ? '' : 'expected ' + want; };
  V['g6-find-clause'] = q => /^(who|which|that|whose)\b/.test(mk(q)) && q.tiles.map(text).filter(t => /^(who|which|that|whose)\b/.test(t)).length === 1 ? '' : 'expected the part that starts with who, which, that or whose';
  V['g6-rel-match'] = q => q.pairs.every(p => { const [b, a] = text(p[0]).split(' ___ '); return fits(relFor(b, a), text(p[1])); }) ? '' : 'a sentence is matched to the wrong word';
  V['g6-rel-tf'] = q => { const x = text(q.fig).match(/^(.*?)\s(who|which|that|whose)\s(.*)$/), right = !!x && fits(relFor(x[1], x[3]), x[2]);
    return x && q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'true/false is wrong'; };
  /* a correct join: the right relative word for the noun, the extra idea inside commas, and no comma splice */
  const goodJoin = o => { const x = o.match(/^(.+?), (who|which) [^,]+, /); return !!x && !/, (she|he|it) /.test(o) && x[2] === (PEOPLE.test(x[1]) ? 'who' : THINGS.test(x[1]) ? 'which' : ''); };
  V['g6-combine'] = q => { const good = q.options.map(text).filter(goodJoin); return good.length === 1 && mk(q) === good[0] ? '' : 'expected the correct join'; };
  V['g6-combine-tf'] = q => q.answer === goodJoin(text(q.fig)) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  V['g6-combine-order'] = q => { const it = q.items.map(text), s = it[0] + ', ' + it[1] + ', ' + it[2]; return goodJoin(s) && s.replace(/,/g, '').split(' ').length === text(q.fig).replace(/[,.]/g, '').split(' ').length ? '' : 'the cards do not build a correct sentence'; };
  V['g6-fix-splice'] = V['g6-combine'];
})();
