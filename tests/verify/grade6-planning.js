/* Grade 6 answer checks: planning and research (grade6/chapters/planning.js). The checker keeps its own key for purposes, forms and strategies,
   and works out good notes, complete source records and where each part of a form goes for itself. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'true/false is wrong';
  const picked = (q, ok) => H.sameSet(q.options.map((o, i) => ok(text(o)) ? i : -1).filter(i => i >= 0), q.answer);
  const only = (q, ok) => { const fit = q.options.map(text).filter(ok); return fit.length === 1 && mk(q) === fit[0]; };

  /* purpose from what the piece does */
  const purposeOf = p => /asking|ad for|vote|urging/.test(p) ? 'to persuade' : /report|news|fact sheet|biography/.test(p) ? 'to inform' : /funny|comic|mystery|silly/.test(p) ? 'to entertain'
    : /steps|recipe|instructions|guide/.test(p) ? 'to explain how' : null;
  V['g6-purpose-of'] = (q, m) => mk(q) === purposeOf(m.piece) ? '' : 'expected ' + purposeOf(m.piece);
  V['g6-plan-purpose-tf'] = (q, m) => tf(q, purposeOf(m.piece) === m.said);
  V['g6-purpose-match'] = q => q.pairs.every(p => purposeOf(text(p[0])) === text(p[1])) ? '' : 'a piece is matched to the wrong purpose';
  V['g6-purpose-pick'] = (q, m) => picked(q, o => purposeOf(o) === m.purpose) ? '' : 'the pieces marked are not the ones ' + m.purpose;

  const FORM = { 'convince the town council to add bike lanes': 'a formal letter', 'teach Grade 1 students to wash their hands': 'an illustrated poster', 'share your class trip with families': 'a blog post with photos',
    'explain how to set up a tent': 'numbered steps with diagrams', 'tell younger kids a story about kindness': 'a picture book', 'remind classmates about the book fair date': 'a short notice on the bulletin board',
    'share what you found out about local wetlands': 'a research report', 'thank an Elder for visiting the class': 'a thank-you card', 'tell the principal about a broken water fountain': 'a short memo',
    'share your feelings about the first snowfall': 'a poem', 'persuade families to walk to school': 'an opinion piece in the newsletter', 'teach your class about a science experiment': 'a slide show with diagrams' };
  V['g6-best-form'] = (q, m) => mk(q) === FORM[m.want] ? '' : 'expected ' + FORM[m.want];
  V['g6-form-match'] = q => q.pairs.every(p => FORM[text(p[0])] === text(p[1])) ? '' : 'a goal is matched to the wrong form';
  V['g6-plan-form-tf'] = (q, m) => tf(q, FORM[m.want] === m.said);
  V['g6-form-for'] = (q, m) => only(q, o => FORM[o] === m.form) ? '' : 'expected the goal for ' + m.form;

  const STRAT = { 'You have lots of ideas, but they are a mess.': /idea web/, 'You want to know what school was like in the 1970s.': /Interview/, 'You want to write about feeling included at school.': /own experiences/,
    'You are stuck for a topic.': /Brainstorm/, 'You need facts about how wind turbines work.': /library database/, 'You want to describe a place, but cannot remember the details.': /photos/,
    'You cannot choose between two topics.': /quick list/, 'You want to write a story but have no plot.': /What if/, 'You want to know what people in your school think.': /survey/,
    'Your ideas feel flat and ordinary.': /partner/ };
  const solves = (p, s) => !!STRAT[p] && STRAT[p].test(s);
  V['g6-strategy'] = (q, m) => only(q, o => solves(m.s, o)) ? '' : 'expected the strategy for: ' + m.s;
  V['g6-strategy-tf'] = (q, m) => tf(q, solves(m.s, m.said));
  V['g6-strategy-match'] = q => q.pairs.every(p => solves(text(p[0]), text(p[1]))) ? '' : 'a problem is matched to the wrong strategy';
  V['g6-strategy-for'] = (q, m) => only(q, o => solves(o, m.said)) ? '' : 'expected the problem this strategy solves';

  /* a good note: shorter than the source, written as "topic: facts", and keeps a key word from it */
  const GOODNOTE = { Beavers: 'rodents', 'Rideau Canal': '1832', Monarchs: '4500', Canada: 'coastline', Inuksuk: 'Inuit', Honeybees: 'flowers', 'Trans Canada Trail': '28 000', Loons: '60 m',
    'Maple syrup': '40 L', Glaciers: 'Earth' };
  const goodNote = (src, n) => { const x = n.match(/^([^:]+): (.+)$/); return !!x && n.length < src.length * 0.8 && !!GOODNOTE[x[1]] && x[2].includes(GOODNOTE[x[1]]) && src.toLowerCase().includes(x[1].replace(/s$/, '').split(' ')[0].toLowerCase()); };
  V['g6-own-words'] = (q, m) => only(q, o => goodNote(text(m.src), o)) ? '' : 'expected the short note in own words';
  V['g6-note-tf'] = (q, m) => tf(q, goodNote(text(m.src), text(m.note)));
  V['g6-note-what'] = (q, m) => { const s = text(m.src), n = text(m.note), want = goodNote(s, n) ? 'Nothing. It is a good note.' : n === s ? 'It copies the source word for word.' : 'It is not about the source.';
    return mk(q) === want ? '' : 'expected ' + want; };
  V['g6-note-match'] = q => q.pairs.every(p => goodNote(text(p[0]), text(p[1]))) ? '' : 'a source is matched to the wrong note';
  V['g6-two-sources'] = q => /third reliable source/.test(mk(q)) ? '' : 'expected checking another source';

  const RECORD = /^the (author|title|date|website|page number|web address)/;
  V['g6-cite'] = q => picked(q, o => RECORD.test(o)) ? '' : 'the things to record are not the ones marked';
  V['g6-cite-tf'] = (q, m) => tf(q, RECORD.test(m.x));
  const FAIR = new Set(['Credit the creator of every photo or fact I use.', 'Write down where each fact came from.', 'Put words I copy exactly inside quotation marks.',
    "Ask before using a friend's drawing.", 'Check the date to see if the facts are current.']);
  V['g6-copied-tf'] = (q, m) => FAIR.has(text(m.said)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* a complete record: four parts (author, title, year, publisher), with the year a four-digit number */
  V['g6-full-record'] = q => only(q, o => { const p = o.split(', '); return p.length === 4 && /^\d{4}$/.test(p[2]) && /^[A-Z]\w+ [A-Z]\w+$/.test(p[0]); }) ? '' : 'expected the complete record';

  const HEAD = n => /eats|hunts|catches|digs/.test(n) ? 'Food' : /lives|roams|makes its home/.test(n) ? 'Habitat' : /winter|snow den|hibernates|wakes up/.test(n) ? 'Winter' : null;
  V['g6-sort'] = q => q.pairs.every(p => HEAD(text(p[0])) === text(p[1])) ? '' : 'a note is under the wrong heading';
  V['g6-heading-for'] = (q, m) => mk(q) === HEAD(m.note) ? '' : 'expected ' + HEAD(m.note);
  V['g6-sort-tf'] = (q, m) => tf(q, HEAD(m.note) === m.said);
  V['g6-sort-pick'] = (q, m) => picked(q, o => HEAD(o) === m.head) ? '' : 'the notes marked are not the ' + m.head + ' notes';

  /* outlines: the checker's own first words of each part, in order */
  const FIRST = { 'an opinion piece': ['Opinion', 'Reason 1', 'Reason 2', 'Call to action'], 'a report': ['Introduction', 'Section 1', 'Section 2', 'Conclusion'],
    'a story': ['Beginning', 'A problem', 'Things get harder', 'The problem is solved'], 'a how-to': ['Title', 'What you need', 'The steps', 'A tip'],
    'a news article': ['Headline', 'Lead', 'More details', 'What happens next'], 'a friendly letter': ['Date and greeting', 'Why you are writing', 'News and details', 'Closing'],
    'a biography': ['Who the person is', 'Early life', 'Main achievements', 'Why the person matters'] };
  const at = (form, part) => FIRST[form].findIndex(f => part.startsWith(f));
  const place = i => i === 0 ? 'At the start' : i === 3 ? 'At the end' : 'In the middle';
  V['g6-outline'] = (q, m) => q.items.map(text).every((t, i) => at(m.form, t) === i) ? '' : 'the plan is out of order';
  V['g6-part-where'] = (q, m) => { const i = at(m.form, text(q.fig)); return i >= 0 && mk(q) === place(i) ? '' : 'expected ' + place(i); };
  V['g6-outline-tf'] = (q, m) => tf(q, place(at(m.form, text(q.fig))) === m.said);
  V['g6-outline-first'] = (q, m) => text(q.tiles[q.answer]) && q.tiles.map(text).filter(o => at(m.form, o) === 0).length === 1 && at(m.form, text(q.tiles[q.answer])) === 0 ? '' : 'expected the first part';
})();
