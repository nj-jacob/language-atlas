/* Grade 2 answer checks: grammar (grade2/chapters/grammar.js). Pronouns, "to be" and -er/-est are worked out by rule; the rest from the checker's own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q);
  const GROUP = { geese: 'flock', whales: 'pod', caribou: 'herd', wolves: 'pack', fish: 'school', players: 'team', grapes: 'bunch', bees: 'swarm' };
  const IDEAS = new Set('joy kindness fear courage hope friendship love sadness'.split(' '));
  /* the pronoun for a noun, by rule */
  const pro = n => (/\band I$/.test(n) ? 'We' : /s$/.test(n) ? 'They' : /\b(aunt|sister|girl|mom|grandma)$/i.test(n) ? 'She' : /\b(grandpa|brother|boy|dad|uncle)$/i.test(n) ? 'He' : 'It');
  /* the form of "to be", by rule: who it is about, and whether it is in the past */
  const be = s => { const past = /^(Yesterday|Last)/.test(s), who = s.replace(/^(Yesterday|Last week|Last night), /, '').split(' _')[0];
    if (who === 'I') return 'am'; const many = /^(We|They)$|s$|twins/.test(who); return past ? (many ? 'were' : 'was') : (many ? 'are' : 'is'); };
  const cmp = (s, w) => (/ than /.test(s) ? /er$/.test(w) : /\bthe _/.test(s) ? /est$/.test(w) : false);
  const HOW = { slowly: 'walked', softly: 'sang', loudly: 'barked', quickly: 'ran', carefully: 'carried', quietly: 'slept' };

  V['g2-group'] = (q, m) => mk(q) === GROUP[m.of] ? '' : 'expected a ' + GROUP[m.of] + ' of ' + m.of;
  V['g2-group-match'] = q => q.pairs.every(p => GROUP[text(p[1])] === text(p[0])) ? '' : 'a group word is matched to the wrong group';
  V['g2-idea'] = q => H.sameSet(q.options.map((o, i) => (IDEAS.has(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the idea nouns are not the ones marked';
  V['g2-idea-tap'] = (q, m) => (mk(q) || '').startsWith(IDEAS.has(m.word) ? 'No' : 'Yes') ? '' : 'expected ' + (IDEAS.has(m.word) ? 'No' : 'Yes') + ' for ' + m.word;
  V['g2-pronoun'] = (q, m) => mk(q) === pro(m.noun) && H.has(q.fig, m.noun) ? '' : 'expected ' + pro(m.noun) + ' for ' + m.noun;
  V['g2-pronoun-match'] = q => q.pairs.every(p => pro(text(p[0])) === text(p[1])) ? '' : 'a noun is matched to the wrong pronoun';
  V['g2-be'] = (q, m) => mk(q) === be(m.s) ? '' : 'expected ' + be(m.s) + ' in "' + m.s + '"';
  V['g2-be-past'] = (q, m) => mk(q) === { is: 'was', are: 'were' }[m.now] ? '' : 'expected the past of ' + m.now;
  V['g2-compare'] = (q, m) => cmp(m.s, mk(q) || '') && q.tiles.map(text).filter(t => cmp(m.s, t)).length === 1 ? '' : 'the wrong form is marked for "' + m.s + '"';
  V['g2-compare-order'] = q => { const s = q.items.map(text); return s[1] === s[0] + 'er' && s[2] === s[0] + 'est' ? '' : 'not plain, -er, -est: ' + s.join(', '); };
  V['g2-adverb'] = (q, m) => { const a = Object.keys(HOW).find(w => m.s.includes(w)); return mk(q) === HOW[a] ? '' : 'expected ' + HOW[a]; };
  V['g2-adverb-find'] = (q, m) => HOW[mk(q)] && m.s.includes(mk(q)) ? '' : 'expected the -ly word that tells how';
})();
