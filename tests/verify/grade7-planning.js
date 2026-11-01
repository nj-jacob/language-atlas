/* Grade 7 answer checks: planning and research (grade7/chapters/planning.js). Own keys for forms, media, strategies, sources, credit, notes and outlines. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const FORM = { 'persuade city council': 'a formal letter', 'how a wind turbine works': 'an information report with a diagram', 'young children': 'a picture book', "family's story": 'a memoir',
    'slippery hallway': 'a poster', 'make pancakes': 'a procedure with numbered steps', 'community garden day': 'a flyer', 'guest speaker': 'a thank-you letter', 'sunset': 'a poem',
    'science fair': 'a newsletter article', 'recycling club': 'a persuasive speech', 'canoe trip': 'a journal' };
  const formFor = p => FORM[Object.keys(FORM).find(k => text(p).includes(k))];
  V['g7-form-fit'] = (q, m) => mk(q) === formFor(m.p) ? '' : 'expected ' + formFor(m.p);
  V['g7-fit-match'] = q => q.pairs.every(p => formFor(p[0]) === text(p[1])) ? '' : 'a purpose is matched to the wrong form';
  V['g7-plan-form-tf'] = (q, m) => { const right = formFor(m.p) === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const MED = { commute: 'a podcast', 'bulletin board': 'a poster', 'school gym': 'a speech with slides', 'search for details': 'a website with headings and links', scroll: 'a short video',
    'hold something to read': 'a printed booklet', 'drivers passing': 'a large sign' };
  V['g7-medium'] = (q, m) => mk(q) === MED[Object.keys(MED).find(k => m.a.includes(k))] ? '' : 'expected the medium that suits the audience';
  const IDEA = { 'seeing how ideas connect': 'a mind map', 'getting many ideas down fast': 'a quick list', 'writing nonstop to find what you think': 'freewriting', 'asking who, what, when, where and why': '5W questions',
    "learning from someone's lived experience": 'an interview', 'comparing two sides of an issue': 'a T-chart', 'putting events in order': 'a timeline', 'sparking memories and details': 'looking at old photos' };
  V['g7-idea-strategy'] = (q, m) => mk(q) === IDEA[text(m.use)] ? '' : 'expected ' + IDEA[text(m.use)];
  V['g7-idea-use'] = (q, m) => IDEA[mk(q)] === m.s ? '' : 'expected what ' + m.s + ' is for';
  V['g7-idea-match'] = q => q.pairs.every(p => IDEA[text(p[1])] === text(p[0])) ? '' : 'a strategy is matched wrong';
  V['g7-idea-tf'] = (q, m) => { const right = IDEA[text(m.said)] === m.s; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* a reliable source names experts or an organization that studies the topic, is current, and is not selling anything */
  const RELIABLE = /hospital|museum website with named historians|government wildlife survey|university study|paediatric society|weather service forecast from today|First Nation's own website|names its researchers/;
  V['g7-reliable'] = q => { const ok = q.options.map(text).filter(o => RELIABLE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the reliable source'; };
  V['g7-reliable-tf'] = (q, m) => { const right = m.said === RELIABLE.test(text(m.shown)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const WARN = /No author|trying to sell|out of date|say something very different|insults|no evidence/;
  V['g7-warnings'] = q => H.sameSet(q.options.map((o, i) => WARN.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the warning signs are not the ones marked';
  V['g7-sign-sort'] = (q, m) => q.answer === (WARN.test(m.s) ? 1 : 0) ? '' : 'expected ' + (WARN.test(m.s) ? 'a warning sign' : 'a good sign');
  const REC = /creator or author|the title|date it was published|website or publisher|link or page number/;
  V['g7-cite-what'] = q => H.sameSet(q.options.map((o, i) => REC.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the details to record are not the ones marked';
  const CITE_TRUE = /must give credit|needs quotation marks|still needs credit|source log/;
  V['g7-cite-tf'] = (q, m) => CITE_TRUE.test(text(m.said)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* someone else made it: credit. Your own work or common knowledge: no credit */
  const OWN = /^your own|own survey|you saw yourself|everyone knows/;
  V['g7-credit'] = (q, m) => q.answer === (OWN.test(text(m.s)) ? 1 : 0) ? '' : 'expected ' + (OWN.test(text(m.s)) ? 'no credit' : 'credit');
  V['g7-cite-line'] = q => { const full = o => ['Creator: ', 'Title: ', 'Date: ', 'From: '].every(p => o.includes(p)), ok = q.options.map(text).filter(full); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the note with creator, title, date and source'; };
  const HEAD = { 'Monarchs hatch from eggs as caterpillars.': 'Life cycle', 'A caterpillar forms a chrysalis.': 'Life cycle', 'An adult comes out after about two weeks.': 'Life cycle',
    'Monarchs fly to Mexico each fall.': 'Migration', 'The trip can be over 4000 km.': 'Migration', 'They use the sun to find their way.': 'Migration',
    'Milkweed is disappearing from fields.': 'Threats', 'Storms can kill thousands during migration.': 'Threats', 'Pesticides harm caterpillars.': 'Threats',
    'Beavers build lodges from sticks and mud.': 'Homes', 'A lodge has an underwater entrance.': 'Homes', 'Families of up to eight live in one lodge.': 'Homes',
    'Beavers eat bark, twigs and leaves.': 'Food', 'They store branches underwater for winter.': 'Food', 'Pond plants are a summer treat.': 'Food',
    'Dams make ponds deeper.': 'Dams', 'Beaver ponds give homes to fish and birds.': 'Dams', 'A dam can be longer than a hockey rink.': 'Dams' };
  V['g7-classify'] = q => q.pairs.every(p => HEAD[text(p[0])] === text(p[1])) ? '' : 'a note is under the wrong heading';
  V['g7-heading-for'] = (q, m) => mk(q) === HEAD[m.n] ? '' : 'expected ' + HEAD[m.n];
  V['g7-classify-tf'] = (q, m) => { const right = HEAD[m.n] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-off-topic'] = q => { const ok = q.options.map(text).filter(o => !HEAD[o]); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the note that does not belong'; };
  /* the checker's own outlines, in order */
  const OUTLINES = [['Introduction: why monarchs matter', 'Life cycle', 'Migration', 'Threats', 'Conclusion: how people can help'],
    ['Introduction: meet the beaver', 'Homes', 'Food', 'Dams', 'Conclusion: why beavers matter to wetlands'],
    ['Opening: state your position', 'Your strongest reason', 'Another reason with evidence', 'Answer the other side', 'Closing: what you want them to do'],
    ['Headline', 'Lead: who, what, when and where', 'Key details', 'Quotes from people involved', 'Background information'],
    ['Introduction: who the person is', 'Childhood', 'Later life and work', 'Conclusion: why they matter today']];
  const outlineOf = s => OUTLINES.find(o => o.includes(s));
  V['g7-outline'] = q => { const t = q.items.map(text), o = outlineOf(t[0]); return o && t.join('|') === o.join('|') ? '' : 'the outline is not in a logical order'; };
  V['g7-first-section'] = q => { const o = outlineOf(mk(q)); return o && o[0] === mk(q) && q.tiles.map(text).every(t => o.includes(t)) ? '' : 'expected the opening section'; };
  V['g7-section-after'] = (q, m) => { const o = outlineOf(m.after); return o && o[o.indexOf(m.after) + 1] === mk(q) ? '' : 'expected the section after ' + m.after; };
  V['g7-order-tf'] = (q, m) => { const o = outlineOf(m.a), right = o.indexOf(m.a) < o.indexOf(m.b); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
