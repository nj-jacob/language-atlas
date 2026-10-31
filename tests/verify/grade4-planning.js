/* Grade 4 answer checks: planning writing (grade4/chapters/planning.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* what you want to do -> [form, purpose, audience], worked out from its key words */
  const JOB = [[/how to make/, 'instructions', 'to explain how', 'your class'], [/convince/, 'a persuasive letter', 'to persuade', 'the principal'],
    [/monarch facts/, 'an information poster', 'to inform', 'a Grade 2 class'], [/laugh/, 'a story', 'to entertain', 'your cousin'],
    [/thank/, 'a thank-you card', 'to thank', 'a guest speaker'], [/snowfall/, 'a poem', 'to describe a feeling', 'anyone who reads it']];
  const job = j => JOB.find(([re]) => re.test(j)) || [];
  V['g4-form-for'] = (q, m) => mk(q) === job(m.job)[1] ? '' : 'expected ' + job(m.job)[1];
  V['g4-purpose-of'] = (q, m) => mk(q) === job(m.job)[2] ? '' : 'expected ' + job(m.job)[2];
  V['g4-audience-of'] = (q, m) => mk(q) === job(m.job)[3] ? '' : 'expected ' + job(m.job)[3];
  const PURPOSE = Object.fromEntries(JOB.map(j => [j[1], j[2]]));
  V['g4-form-match'] = q => q.pairs.every(p => PURPOSE[text(p[0])] === text(p[1])) ? '' : 'a form is matched to the wrong purpose';
  const MEDIUM = { 'tie a knot': 'a short video', recycle: 'a sign on the fridge', 'science fair': 'a slide show', grandparent: 'an email or a card in the mail' };
  V['g4-medium'] = (q, m) => mk(q) === MEDIUM[Object.keys(MEDIUM).find(k => m.goal.includes(k))] ? '' : 'the medium does not fit';
  V['g4-idea-ways'] = q => H.sameSet(q.options.map((o, i) => /^(Make an idea web|Brainstorm|Talk it over|Think about your own)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good ways are not the ones marked';
  V['g4-record'] = q => H.sameSet(q.options.map((o, i) => /^the (title|author|date)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the details to record are not the ones marked';
  /* sorting: home words, food words, body words */
  const head = f => /lodge/.test(f) ? 'Home' : /eat|store/.test(f) ? 'Food' : /tail|teeth/.test(f) ? 'Body' : null;
  V['g4-sort-facts'] = q => q.pairs.every(p => head(text(p[0])) === text(p[1])) ? '' : 'a fact is under the wrong heading';
  V['g4-which-heading'] = (q, m) => mk(q) === head(m.f) ? '' : 'expected ' + head(m.f);
  const PLAN = ['character and setting', 'problem starts', 'harder', 'solved', 'feels at the end'];
  V['g4-plan-order'] = q => q.items.every((it, i) => text(it).includes(PLAN[i])) ? '' : 'the story plan is not in order';
})();
