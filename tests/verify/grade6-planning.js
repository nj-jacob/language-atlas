/* Grade 6 answer checks: planning and research (grade6/chapters/planning.js). The checker keeps its own key for purposes, forms and strategies,
   and works out the good note (shorter than the source, not copied, sharing its key facts) for itself. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* purpose from what the piece does */
  const purposeOf = p => /asking|convince/.test(p) ? 'to persuade' : /report/.test(p) ? 'to inform' : /funny story/.test(p) ? 'to entertain' : /steps/.test(p) ? 'to explain how' : null;
  V['g6-purpose-of'] = (q, m) => mk(q) === purposeOf(m.piece) ? '' : 'expected ' + purposeOf(m.piece);
  const FORM = { 'convince the town council to add bike lanes': 'a formal letter', 'teach Grade 1 students to wash their hands': 'an illustrated poster', 'share your class trip with families': 'a blog post with photos',
    'explain how to set up a tent': 'numbered steps with diagrams', 'tell younger kids a story about kindness': 'a picture book' };
  V['g6-best-form'] = (q, m) => mk(q) === FORM[m.want] ? '' : 'expected ' + FORM[m.want];
  V['g6-form-match'] = q => q.pairs.every(p => FORM[text(p[0])] === text(p[1])) ? '' : 'a goal is matched to the wrong form';
  const STRAT = { 'You have lots of ideas, but they are a mess.': /idea web/, 'You want to know what school was like in the 1970s.': /Interview/, 'You want to write about feeling included at school.': /own experiences/, 'You are stuck for a topic.': /Brainstorm/ };
  V['g6-strategy'] = (q, m) => STRAT[m.s].test(mk(q)) ? '' : 'expected the strategy for: ' + m.s;
  /* a good note: shorter than the source, not a copy, and keeps a number or key word from it */
  V['g6-own-words'] = (q, m) => { const src = text(m.src), fit = q.options.map(text).filter(o => o !== src && o.length < src.length * 0.8 && /\d|rodent|Monarch/.test(o) && o.includes(':'));
    return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the short note in own words'; };
  V['g6-cite'] = q => H.sameSet(q.options.map((o, i) => (/^the (author|title|date|website)/.test(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the things to record are not the ones marked';
  V['g6-copied-tf'] = (q, m) => /^Credit/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g6-two-sources'] = q => /third reliable source/.test(mk(q)) ? '' : 'expected checking another source';
  const HEAD = n => /eats|hunts/.test(n) ? 'Food' : /lives|roams/.test(n) ? 'Habitat' : /winter|snow den/.test(n) ? 'Winter' : null;
  V['g6-sort'] = q => q.pairs.every(p => HEAD(text(p[0])) === text(p[1])) ? '' : 'a note is under the wrong heading';
  V['g6-heading-for'] = (q, m) => mk(q) === HEAD(m.note) ? '' : 'expected ' + HEAD(m.note);
  const FIRST = { 'an opinion piece': ['Opinion', 'Reason 1', 'Reason 2', 'Call to action'], 'a report': ['Introduction', 'Section 1', 'Section 2', 'Conclusion'], 'a story': ['Beginning', 'A problem', 'Things get harder', 'The problem is solved'] };
  V['g6-outline'] = (q, m) => q.items.map(text).every((t, i) => t.startsWith(FIRST[m.form][i])) ? '' : 'the plan is out of order';
  V['g6-call-to-action'] = q => mk(q) === 'At the end' ? '' : 'expected at the end';
})();
