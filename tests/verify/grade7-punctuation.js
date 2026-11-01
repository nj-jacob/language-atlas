/* Grade 7 answer checks: punctuation (grade7/chapters/punctuation.js). The checker decides for itself whether each side of a mark is a complete sentence,
   using its own list of complete clauses, and keeps its own key for what each dash and ellipsis does. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const CLAUSE = new Set(['the rain stopped', 'the game went on', 'kai studied all weekend', 'his hard work paid off', 'the museum was closed', 'we visited the park instead', 'mei loves to paint',
    'her brother prefers music', 'the ferry was late', 'nobody minded the wait', 'the lake froze early', 'the rinks opened in november', 'the trail was closed', 'the lookout was open',
    'the test was hard', 'most of the class passed', 'the bus broke down', 'we were late for school', 'the river rose quickly', 'the town built sandbag walls', 'leila set up the tent',
    'omar started the fire', 'the plan is cheap', 'it is easy to build', 'we could not find the map', 'we used the compass',
    'the power went out', 'we read by candlelight', 'amir trained every morning', 'he won the race', 'the snow was deep', 'the plough could not get through',
    'our class raised four hundred dollars', 'the shelter bought new blankets', 'the moose stood still', 'nobody dared to move', 'zoe forgot her lunch', 'her friend shared a sandwich',
    'the ice was thin', 'we stayed off the lake', 'ravi practised the piano', 'his sister did her homework', 'the garden needs water', 'it needs more sun', 'we did not take the bus', 'we rode our bikes',
    'the movie was long', 'nobody wanted it to end', 'the bridge was icy', 'the town closed it', 'the band set up the stage', 'the crowd lined up outside']);
  const full = s => CLAUSE.has(s.trim().toLowerCase());
  /* right: one semicolon with a complete clause on each side */
  const semiOk = s => { const p = s.replace(/\.$/, '').split(';'); return p.length === 2 && full(p[0]) && full(p[1]); };
  V['g7-semicolon'] = q => { const ok = q.options.map(text).filter(semiOk); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one correct semicolon'; };
  V['g7-semi-tf'] = (q, m) => semiOk(text(m.shown)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  V['g7-semi-mark'] = q => mk(q) === ';' ? '' : 'expected a semicolon';
  V['g7-semi-pick'] = q => H.sameSet(q.options.map((o, i) => semiOk(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the correct sentences are not the ones marked';
  const ADV = { however: 'contrast', therefore: 'result', meanwhile: 'at the same time', furthermore: 'adding more', instead: 'a different choice' };
  /* right: clause; adverb, clause */
  const conjOk = s => { const m = s.match(/^(.+); (however|therefore|meanwhile|furthermore|instead), (.+)\.$/); return !!m && full(m[1]) && full(m[3]); };
  V['g7-conj-tf'] = (q, m) => conjOk(text(m.shown)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  V['g7-conj-punct'] = q => { const ok = q.options.map(text).filter(conjOk); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected semicolon before and comma after the adverb'; };
  /* the checker's own sense of how each pair is related */
  const LINK = { 'The trail was closed': 'contrast', 'The test was hard': 'contrast', 'The bus broke down': 'result', 'The river rose quickly': 'result', 'Leila set up the tent': 'at the same time',
    'The plan is cheap': 'adding more', 'We could not find the map': 'a different choice', 'The ice was thin': 'result', 'Ravi practised the piano': 'at the same time',
    'The garden needs water': 'adding more', 'We did not take the bus': 'a different choice', 'The movie was long': 'contrast', 'The bridge was icy': 'result', 'The band set up the stage': 'at the same time' };
  V['g7-conj-word'] = (q, m) => ADV[mk(q)] === LINK[m.a] && q.tiles.map(text).filter(t => ADV[t] === LINK[m.a]).length === 1 ? '' : 'expected an adverb showing ' + LINK[m.a];
  V['g7-conj-match'] = q => q.pairs.every(p => ADV[text(p[0])] === text(p[1])) ? '' : 'an adverb is matched wrong';
  /* colons: complete openings, the checker's own list */
  const OPEN = ['The coach gave us one rule', 'My grandmother always says the same thing', 'The sign at the trailhead was clear', 'Our principal ended with a challenge', 'The poster had a simple message',
    'The elder shared a teaching', 'The note on the fridge was short', 'My coach repeats one line', 'The sign on the door was a warning', 'Dad gave me one piece of advice'];
  const colonOk = s => { const m = s.match(/^(.+): “([A-Z].*)”$/); return !!m && OPEN.includes(m[1]); };
  V['g7-colon-quote'] = q => { const ok = q.options.map(text).filter(colonOk); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the complete sentence, colon, then a capital'; };
  V['g7-colon-when'] = (q, m) => q.answer === (OPEN.includes(m.start) ? 0 : 1) ? '' : 'expected ' + (OPEN.includes(m.start) ? 'yes' : 'no');
  V['g7-colon-tf'] = (q, m) => colonOk(text(m.shown)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  V['g7-colon-pick'] = q => H.sameSet(q.options.map((o, i) => OPEN.includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the complete openings are not the ones marked';
  const JOB = { 'The report said the water … is safe for swimming.': 'words left out of a quotation', 'The guide called the trail “steep … but worth it.”': 'words left out of a quotation',
    'Well… I am not sure.': 'a pause or hesitation', 'We could go now… or we could wait.': 'a pause or hesitation', 'I was going to tell you—wait, is that our bus?': 'a sudden break in thought',
    'I opened the door and—nothing.': 'a sudden break in thought', 'My cousin—the one from Iqaluit—is visiting.': 'an added comment', 'Three things—a map, a whistle and water—go in every pack.': 'an added comment',
    'The answer is—no, let me check again.': 'a sudden break in thought', 'We reached the top and—what a view!': 'a sudden break in thought',
    'The ferry—the last one of the day—was full.': 'an added comment', 'Ms. Patel—our coach for six years—is retiring.': 'an added comment',
    'The mayor said the new park … will open in June.': 'words left out of a quotation', 'The sign read, “Visitors must … stay on the boardwalk.”': 'words left out of a quotation',
    'Um… can I go next?': 'a pause or hesitation', 'The lights flickered… then the hall went dark.': 'a pause or hesitation' };
  V['g7-mark-job'] = (q, m) => mk(q) === JOB[text(m.s)] ? '' : 'expected ' + JOB[text(m.s)];
  V['g7-which-mark'] = (q, m) => mk(q) === (text(m.s).includes('—') ? '—' : '…') ? '' : 'expected the mark used in the sentence';
  V['g7-job-match'] = q => q.pairs.every(p => JOB[text(p[0])] === text(p[1])) ? '' : 'a sentence is matched wrong';
  V['g7-mark-tf'] = (q, m) => (JOB[text(m.s)] === m.said) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
})();
