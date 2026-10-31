/* Grade 8 answer checks: reading strategies (grade8/chapters/reading.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker) and checks against the
   passage itself where it can: the answer's evidence must be in the passage on screen. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* question -> [answer, words from the passage that prove it] */
  const FACTS = { 'Who is waiting on the island?': ['her grandmother', 'grandmother waiting'], 'What was happening when Amira reached the bottom of the hill?': ['the ramp was rising', 'ramp was already rising'],
    'What is Mr. Tremblay worried about?': ['his barn', 'worried about his barn'], 'Where has the ice jammed?': ['under the old bridge', 'jammed under the old bridge'],
    'What did the narrator kick?': ['a water bottle', 'kicked the water bottle'], 'Where did the narrator spend the second half?': ['on the bench', 'on the bench'],
    'How big is the garden?': ['about 400 square metres', 'about 400 square metres'], 'Who gets the vegetables?': ['a local food bank', 'local food bank'],
    'How many evening visits did the library have last year?': ['more than 12 000', 'more than 12 000 visits'],
    'What do trucks bring in on winter roads?': ['fuel, food and building supplies', 'fuel, food and building supplies'], 'What happens when winters are warmer?': ['The ice forms later and melts sooner.', 'forms later and melts sooner'] };
  const fact = m => FACTS[text(m.q)];
  V['g8-fact'] = (q, m) => { const f = fact(m); return f && mk(q) === f[0] && H.has(q.fig, f[1]) ? '' : 'expected ' + (f && f[0]); };
  V['g8-find-line'] = (q, m) => { const f = fact(m), ok = q.options.map(text).filter(o => o.includes(f[1])); return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g8-fact-tf'] = (q, m) => { const f = fact(m); return (text(m.said) === f[0]) === q.answer && H.has(q.fig, f[1]) ? '' : 'true/false is wrong'; };
  const TIES = { She: 'Amira', his: 'the deckhand', them: 'Mr. Tremblay and Josée', which: 'the vegetables', This: 'closing the library' };
  V['g8-tie'] = (q, m) => mk(q).startsWith(TIES[m.w]) ? '' : 'expected ' + TIES[m.w];
  const PRED = { 'The Last Ferry': 'meet her grandmother', Breakup: 'flood the land' };
  V['g8-predict'] = (q, m) => mk(q).includes(PRED[m.t]) ? '' : 'expected the prediction about "' + PRED[m.t] + '"';
  const CONF = { 'Amira will miss the ferry.': 'refuted', 'The river will flood.': 'confirmed', 'The narrator will stay calm all game.': 'refuted', 'The text will describe a solution to the problem.': 'confirmed', 'Warmer winters will cause problems for the roads.': 'confirmed' };
  V['g8-confirm'] = (q, m) => mk(q) === CONF[text(m.p)] ? '' : 'expected ' + CONF[text(m.p)];
  const FIX = { glossary: /know it/, Reread: /who is speaking/, reference: /know nothing/, question: /main point/ };
  const fixFor = p => Object.keys(FIX).find(k => FIX[k].test(p));
  V['g8-fix'] = (q, m) => mk(q).includes(fixFor(text(m.p))) ? '' : 'expected the strategy with "' + fixFor(text(m.p)) + '"';
  V['g8-match-fix'] = q => q.pairs.every(p => text(p[1]).includes(fixFor(text(p[0])))) ? '' : 'a problem is matched to the wrong strategy';
  const CHOOSE = { 'to learn how northern communities get supplies': 'Winter Roads', 'to enjoy a suspenseful story': 'Breakup', 'to understand an argument about a town decision': 'Letter to the Editor: Keep the Library Open',
    'to laugh at the way gadgets are sold': 'Introducing the SmartSpoon', 'to learn how one school solved a problem': 'A Garden on the Roof' };
  V['g8-choose-text'] = (q, m) => mk(q) === CHOOSE[m.purpose] ? '' : 'expected ' + CHOOSE[m.purpose];
  const SUMMARY = { 'The Last Ferry': 'races to catch', Breakup: 'hidden ice jam', 'The Calmest Player on the Team': 'without seeing it', 'A Garden on the Roof': 'solved the problem', 'Winter Roads': 'shortening the season' };
  V['g8-summary'] = (q, m) => mk(q).includes(SUMMARY[m.t]) ? '' : 'expected the summary of the whole text';
  V['g8-summary-tf'] = (q, m) => ((text(m.s).includes(SUMMARY[m.t]) ? 'a good summary' : 'not a good summary') === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const SYNTH = { 'A Garden on the Roof': 'changing climate', 'The Last Ferry': 'water to build tension', 'Letter to the Editor: Keep the Library Open': 'Young people can help' };
  V['g8-synth'] = (q, m) => mk(q).includes(SYNTH[m.a]) ? '' : 'expected the shared idea';
  const BOTH = { 'A Garden on the Roof': 'a problem and a response', 'The Last Ferry': 'third person' };
  V['g8-both'] = (q, m) => mk(q).includes(BOTH[m.a]) && q.options.map(text).filter(o => o.includes(BOTH[m.a])).length === 1 ? '' : 'expected what is true of both';
})();
