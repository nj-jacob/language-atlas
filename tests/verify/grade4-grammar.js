/* Grade 4 answer checks: grammar (grade4/chapters/grammar.js). Own word lists, worked out from the sentence the child sees. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'");
  /* the checker's own list of words for people */
  const PEOPLE = /^(My neighbour|Our coach|The pilot|My aunt|The doctor)\b/;
  const relFor = s => PEOPLE.test(s) ? 'who' : 'which';
  V['g4-rel-fill'] = (q, m) => H.marked(q) === relFor(m.s) ? '' : 'expected ' + relFor(m.s);
  V['g4-rel-join'] = (q, m) => H.marked(q) === m.s.replace('___', relFor(m.s)) ? '' : 'expected the sentence with ' + relFor(m.s);
  V['g4-rel-tf'] = (q, m) => (m.used === relFor(m.s)) === q.answer && text(q.why.options[q.why.answer]).includes(relFor(m.s) === 'who' ? 'people' : 'things') ? '' : 'true/false or reason is wrong for ' + m.s;
  V['g4-rel-pick'] = q => H.sameSet(q.options.map((o, i) => PEOPLE.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the people are not the ones marked';
  /* one person or thing takes has; I, you and more than one take have */
  const ONE = /^(Mei|Our dog|Omar|The pilot)$/;
  const helper = who => ONE.test(who) ? 'has' : 'have';
  const PART = { eat: 'eaten', go: 'gone', see: 'seen', write: 'written', take: 'taken', swim: 'swum', fly: 'flown', draw: 'drawn', ride: 'ridden', begin: 'begun' };
  V['g4-has-have'] = (q, m) => H.marked(q) === helper(m.who) ? '' : 'expected ' + helper(m.who);
  V['g4-participle'] = (q, m) => H.marked(q) === PART[m.verb] ? '' : 'expected ' + PART[m.verb];
  V['g4-had'] = q => { const ok = q.options.map(text).filter(o => / had \w+/.test(o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the sentence with had'; };
  V['g4-perfect-tf'] = (q, m) => (m.used === PART[m.verb]) === q.answer && /helper form/.test(text(q.why.options[q.why.answer])) ? '' : 'true/false is wrong for ' + m.used;
  V['g4-perfect-match'] = q => q.pairs.every(p => text(p[1]) === 'has ' + PART[text(p[0])]) ? '' : 'a verb is matched to the wrong form';
  /* commands start with an action word (sometimes after please, now, always or carefully); questions end with a question mark */
  const ACTION = /^(Please |Now |Always |Carefully )?(Close|Put|Wait|Stir|Bring|close|stir|wear|pour|wash)\b/;
  const kind = s => s.endsWith('?') ? 'question' : ACTION.test(s) ? 'command' : 'statement';
  V['g4-kind'] = (q, m) => H.marked(q) === kind(m.s) ? '' : 'expected ' + kind(m.s);
  const HELP = /^(Is|Can|Will|Has|Are|Do|Did) /;
  V['g4-make-question'] = (q, m) => { const mk = H.marked(q) || '', words = s => s.toLowerCase().replace(/[.?]/g, '').split(' ').sort().join(' ');
    return HELP.test(mk) && mk.endsWith('?') && words(mk) === words(m.s) ? '' : 'expected the question with the helping verb at the front'; };
  V['g4-tap-command'] = (q, m) => { const w = H.marked(q) || ''; return /^(stir|close|wear|pour|wash)$/.test(w) && m.s.includes(w) ? '' : 'expected the command verb'; };
  V['g4-pick-commands'] = q => H.sameSet(q.options.map((o, i) => kind(text(o)) === 'command' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the commands are not the ones marked';
  /* whose: the owner before the gap decides */
  const OWNER = [[/^Mei|^Leila/, 'her'], [/^The twins|^The birds/, 'their'], [/^The dog|^The tree/, 'its'], [/^Owen/, 'his'], [/^We /, 'our'], [/^I /, 'my']];
  const ownFor = s => (OWNER.find(([re]) => re.test(s)) || [])[1];
  V['g4-own-fill'] = (q, m) => H.marked(q) === ownFor(m.s) ? '' : 'expected ' + ownFor(m.s);
  V['g4-its'] = (q, m) => { const itIs = /___ (going|almost|too)\b/.test(m.s); return text(q.tiles[q.answer]) === (itIs ? "it's" : 'its') ? '' : 'expected ' + (itIs ? "it's" : 'its'); };
  V['g4-tap-owner'] = (q, m) => H.marked(q) === ownFor(m.s) ? '' : 'expected ' + ownFor(m.s);
  const OWNS = { Owen: 'his', Leila: 'her', 'the two dogs': 'their', 'the bird': 'its' };
  V['g4-own-match'] = q => q.pairs.every(p => OWNS[text(p[0])] === text(p[1])) ? '' : 'an owner is matched to the wrong word';
})();
