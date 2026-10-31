/* Grade 7 answer checks: planning and research (grade7/chapters/planning.js). Own keys for forms, media, strategies, sources and the monarch notes. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const FORM = { 'persuade city council': 'a formal letter', 'how a wind turbine works': 'an information report with a diagram', 'young children': 'a picture book', "family's story": 'a memoir', 'slippery hallway': 'a poster', 'make pancakes': 'a procedure with numbered steps' };
  const formFor = p => FORM[Object.keys(FORM).find(k => text(p).includes(k))];
  V['g7-form-fit'] = (q, m) => mk(q) === formFor(m.p) ? '' : 'expected ' + formFor(m.p);
  V['g7-fit-match'] = q => q.pairs.every(p => formFor(p[0]) === text(p[1])) ? '' : 'a purpose is matched to the wrong form';
  const MED = { commute: 'a podcast', 'bulletin board': 'a poster', 'school gym': 'a speech with slides', 'search for details': 'a website with headings and links' };
  V['g7-medium'] = (q, m) => mk(q) === MED[Object.keys(MED).find(k => m.a.includes(k))] ? '' : 'expected the medium that suits the audience';
  const IDEA = { 'seeing how ideas connect': 'a mind map', 'getting many ideas down fast': 'a quick list', 'writing nonstop to find what you think': 'freewriting', 'asking who, what, when, where and why': '5W questions', "learning from someone's lived experience": 'an interview' };
  V['g7-idea-strategy'] = (q, m) => mk(q) === IDEA[text(m.use)] ? '' : 'expected ' + IDEA[text(m.use)];
  V['g7-idea-match'] = q => q.pairs.every(p => IDEA[text(p[1])] === text(p[0])) ? '' : 'a strategy is matched wrong';
  /* a reliable source names experts or an organization that studies the topic, and is not selling anything */
  const RELIABLE = /hospital|museum website with named historians|government wildlife survey|university study/;
  V['g7-reliable'] = q => { const ok = q.options.map(text).filter(o => RELIABLE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the reliable source'; };
  const WARN = /No author|trying to sell|out of date|say something very different/;
  V['g7-warnings'] = q => H.sameSet(q.options.map((o, i) => WARN.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the warning signs are not the ones marked';
  const REC = /creator or author|the title|date it was published|website or publisher/;
  V['g7-cite-what'] = q => H.sameSet(q.options.map((o, i) => REC.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the details to record are not the ones marked';
  V['g7-cite-tf'] = (q, m) => /must give credit/.test(text(m.said)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const HEAD = { 'Monarchs hatch from eggs as caterpillars.': 'Life cycle', 'A caterpillar forms a chrysalis.': 'Life cycle', 'Monarchs fly to Mexico each fall.': 'Migration', 'The trip can be over 4000 km.': 'Migration',
    'Milkweed is disappearing from fields.': 'Threats', 'Storms can kill thousands during migration.': 'Threats' };
  V['g7-classify'] = q => q.pairs.every(p => HEAD[text(p[0])] === text(p[1])) ? '' : 'a note is under the wrong heading';
  V['g7-heading-for'] = (q, m) => mk(q) === HEAD[m.n] ? '' : 'expected ' + HEAD[m.n];
  V['g7-off-topic'] = q => { const ok = q.options.map(text).filter(o => !HEAD[o]); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the note that is not about monarchs'; };
  V['g7-outline'] = q => { const t = q.items.map(text); return /^Introduction/.test(t[0]) && /^Conclusion/.test(t[t.length - 1]) && t.indexOf('Life cycle') < t.indexOf('Migration') && t.indexOf('Migration') < t.indexOf('Threats') ? '' : 'the outline is not in a logical order'; };
})();
