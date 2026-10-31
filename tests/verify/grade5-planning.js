/* Grade 5 answer checks: planning writing (grade5/chapters/planning.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const FORM = { 'convince the principal to start a school garden': 'a persuasive letter', 'teach Grade 2 students how to make a bird feeder': 'a how-to guide with pictures', 'share facts about wetlands with your class': 'a slide presentation',
    'tell a funny thing that happened at camp': 'a short story', 'invite neighbours to a park clean-up': 'a poster', 'explain how a canoe is built': 'a labelled diagram with notes' };
  /* the purpose from the verb of the job */
  const purpose = t => /^(convince|invite)/.test(t) ? 'to persuade' : /^teach/.test(t) ? 'to instruct' : /^tell/.test(t) ? 'to entertain' : 'to inform';
  V['g5-form-fit'] = (q, m) => mk(q) === FORM[m.task] ? '' : 'expected ' + FORM[m.task];
  V['g5-purpose'] = (q, m) => mk(q) === purpose(m.task) ? '' : 'expected ' + purpose(m.task);
  V['g5-match-purpose'] = q => q.pairs.every(p => purpose(text(p[0])) === text(p[1])) ? '' : 'a job is matched to the wrong purpose';
  const OFF = ['my favourite pizza', 'how volcanoes erupt', 'the history of hockey', 'how to bake bread', 'the rules of chess', 'facts about the moon'];
  V['g5-ideas'] = q => H.sameSet(q.options.map((o, i) => OFF.includes(text(o)) ? -1 : i).filter(i => i >= 0), q.answer) ? '' : 'the ideas that fit are not the ones marked';
  /* reliable: a known expert or organization */
  V['g5-reliable'] = q => { const ok = q.options.map(text).filter(o => /(government|scientist|museum)/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the expert source'; };
  V['g5-record'] = q => H.sameSet(q.options.map((o, i) => /^(who made it|the title|the website|the date)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the things to record are not the ones marked';
  const HEAD = { 'eats leaves and twigs': 'Food', 'stores branches for winter': 'Food', 'lives in a lodge': 'Home', 'builds dams of mud and sticks': 'Home', 'has orange front teeth': 'Body', 'has a flat, wide tail': 'Body' };
  V['g5-sort-notes'] = q => q.pairs.every(p => HEAD[text(p[0])] === text(p[1])) ? '' : 'a note is under the wrong heading';
  const FIRST = { 'Gather a pine cone, string and seeds.': 1, 'Tie the string to the cone.': 2, 'Spread sunflower butter on it.': 3, 'Roll it in the seeds.': 4, 'Choose a topic.': 1, 'Gather ideas.': 2, 'Check your sources.': 3, 'Sort your notes.': 4 };
  V['g5-order-steps'] = q => q.items.map(text).every((s, i, a) => FIRST[s] && (i === 0 || FIRST[s] > FIRST[a[i - 1]])) ? '' : 'the steps are not in order';
})();
