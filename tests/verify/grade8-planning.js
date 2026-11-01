/* Grade 8 answer checks: planning and research (grade8/chapters/planning.js). Own key lists, and rules for dates and citations. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const one = (q, ok) => ok(mk(q)) && q.options.map(text).filter(ok).length === 1;
  const tfOk = (q, right) => q.answer === right && q.why.answer === 0;

  /* purpose and audience: a word from the right form, and the main purpose */
  const FORM = { 'persuade town council to fund a skate park': ['formal letter', 'persuade'], 'teach Grade 4 students to build a birdhouse': ['instructions', 'inform'],
    'share a family story with your relatives': ['narrative', 'share'], 'entertain teens with a spooky tale': ['short story', 'entertain'],
    'report the results of a science experiment': ['lab report', 'inform'], 'get the whole school to come to a bake sale': ['poster', 'persuade'],
    'convince listeners to join a shoreline cleanup': ['radio', 'persuade'], 'explain how a bill becomes law to younger students': ['infographic', 'inform'],
    'thank an Elder for teaching your class': ['thank-you', 'share'], 'tell the public your view on a news story': ['editor', 'persuade'],
    'remember a summer trip, just for yourself': ['journal', 'share'], 'make younger students laugh at an assembly': ['skit', 'entertain'],
    'capture the feeling of the first snowfall': ['poem', 'share'], 'show how your town changed over 100 years': ['photo timeline', 'inform'],
    'apply for a summer job at the library': ['cover letter', 'persuade'] };
  V['g8-form'] = (q, m) => one(q, o => o.includes(FORM[m.p][0])) ? '' : 'expected the ' + FORM[m.p][0];
  V['g8-match-form'] = q => q.pairs.every(p => text(p[1]).includes(FORM[text(p[0])][0])) ? '' : 'a purpose is matched to the wrong form';
  V['g8-form-tf'] = (q, m) => tfOk(q, text(m.said).includes(FORM[m.p][0])) ? '' : 'true/false is wrong';
  V['g8-form-purpose'] = (q, m) => mk(q).includes(FORM[m.p][1]) ? '' : 'expected ' + FORM[m.p][1];

  /* finding ideas: the problem words and the strategy that fits them */
  const IDEAS = [[/see how they connect|big picture|branch out/, 'mind map'], [/affects your community|never done|newcomer/, 'Interview'], [/cannot start|crossing out|goes blank/, 'Freewrite'],
    [/own life|felt left out|childhood/, 'memories'], [/one side|disagree|what others think/, 'points of view']];
  const fits = (p, s) => { const i = IDEAS.find(x => x[0].test(p)); return !!i && s.includes(i[1]); };
  V['g8-ideas'] = (q, m) => one(q, o => fits(text(m.p), o)) ? '' : 'the strategy marked does not fit';
  V['g8-ideas-tf'] = (q, m) => tfOk(q, fits(text(m.p), text(m.said))) ? '' : 'true/false is wrong for ' + m.said;
  V['g8-ideas-match'] = q => q.pairs.every(p => fits(text(p[0]), text(p[1]))) ? '' : 'a problem is matched to the wrong strategy';
  V['g8-ideas-when'] = (q, m) => one(q, o => fits(o, text(m.s))) ? '' : 'the problem marked is not one this strategy solves';

  /* sources */
  const RELIABLE = /official Ontario Parks|Health Canada|historian, with sources|Environment Canada|Statistics Canada|Public Health Agency|university history|Parliament of Canada|wildlife scientists|written with Elders|Natural Resources Canada|Food Guide|official OC Transpo|official election results|environment ministry/;
  V['g8-reliable'] = q => one(q, o => RELIABLE.test(o)) ? '' : 'expected the reliable source';
  V['g8-source-tf'] = (q, m) => tfOk(q, RELIABLE.test(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  const year = s => +(s.match(/\d{4}/) || [0])[0];
  V['g8-current'] = q => year(mk(q)) === Math.max(...q.options.map(o => year(text(o)))) ? '' : 'expected the newest source';
  V['g8-bias-source'] = q => /biased/.test(mk(q)) && q.options.filter(o => /biased/.test(text(o))).length === 1 ? '' : 'expected the bias problem';

  /* citing */
  const needsCite = s => /exact words|facts or numbers|image you found|idea from an article|chart from a website|summarize a video|statistic from a report|song lyric/.test(s);
  V['g8-when-cite'] = q => H.sameSet(q.options.map((o, i) => needsCite(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the times to cite are not the ones marked';
  V['g8-cite-tf'] = (q, m) => tfOk(q, needsCite(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  /* a complete citation: Surname, Initial. Title. Publisher, year. */
  const missing = s => {
    const parts = s.split('. ');
    if (!/^[A-Z][a-zé]+, [A-Z]$/.test(parts[0])) return 'author';
    const last = parts[parts.length - 1];
    if (!/\d{4}\.$/.test(last)) return 'year';
    if (!/^[^,]+, \d{4}\.$/.test(last)) return 'publisher';
    return parts.length < 3 ? 'title' : '';
  };
  V['g8-citation'] = q => one(q, o => missing(o) === '') ? '' : 'expected the complete citation';
  V['g8-cite-missing'] = q => mk(q) === missing(text(q.fig)) ? '' : 'expected ' + missing(text(q.fig));

  /* grouping notes: the checker's own sort */
  const HEAD = { Habitat: /ponds|lodges|dams/, Diet: /bark|branches|aspen/, Behaviour: /tails|night|family groups/, History: /1832|labourers|army/, 'Uses today': /boats|skating|tourists/,
    Nature: /links lakes|turtles|wetlands/, Climate: /winters|°C|summers/, Wildlife: /polar bears|caribou|foxes/, People: /Inuit|Inuktitut|by plane/ };
  const headOf = n => Object.keys(HEAD).find(h => HEAD[h].test(n));
  V['g8-heading'] = (q, m) => mk(q) === headOf(text(m.n)) ? '' : 'expected ' + headOf(text(m.n));
  V['g8-classify'] = q => q.pairs.every(p => headOf(text(p[0])) === text(p[1])) ? '' : 'a note is under the wrong heading';
  V['g8-odd-note'] = (q, m) => one(q, o => headOf(o) !== m.h) ? '' : 'the note marked belongs under ' + m.h;
  V['g8-heading-tf'] = (q, m) => tfOk(q, headOf(text(m.n)) === m.said) ? '' : 'true/false is wrong';

  /* organizers and order */
  const ORG = [[/^compare/, 'Venn'], [/caused|what happens when|why food prices/, 'cause-and-effect'], [/short story|mystery|legend/, 'story arc'], [/history report|building the railway|life of/, 'timeline'],
    [/dangerous crossing|cafeteria waste|stop bullying/, 'problem-and-solution']];
  const orgFits = (p, o) => { const x = ORG.find(r => r[0].test(p)); return !!x && o.includes(x[1]); };
  V['g8-organizer'] = (q, m) => orgFits(text(m.p), mk(q)) ? '' : 'the organizer marked does not fit';
  V['g8-match-org'] = q => q.pairs.every(p => orgFits(text(p[0]), text(p[1]))) ? '' : 'a plan is matched to the wrong organizer';
  V['g8-org-tf'] = (q, m) => tfOk(q, orgFits(text(m.p), text(m.said))) ? '' : 'true/false is wrong for ' + m.said;
  const ORDER = { 'a persuasive essay': ['Hook', 'First reason', 'Second reason', 'Answer to the other side', 'Conclusion'], 'a story': ['Characters', 'Rising', 'Climax', 'Falling', 'Resolution'],
    'a report': ['Introduction', 'First', 'Second', 'Third', 'Conclusion'], 'a news article': ['Headline', 'Lead', 'The most important', 'Quotes', 'Background'] };
  V['g8-outline'] = (q, m) => { const want = ORDER[m.kind], at = q.items.map(i => want.findIndex(o => text(i).startsWith(o))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the parts are not in order'; };
})();
