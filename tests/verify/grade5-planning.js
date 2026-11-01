/* Grade 5 answer checks: planning writing (grade5/chapters/planning.js). The checker keeps its own key, like a second marker. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  /* the purpose from the verb of the job; the form that suits each job */
  const purpose = t => /^(convince|invite|ask)/.test(t) ? 'to persuade' : /^teach/.test(t) ? 'to instruct' : /^tell/.test(t) ? 'to entertain' : 'to inform';
  const FORM = { 'convince the principal to start a school garden': 'a persuasive letter', 'teach Grade 2 students how to make a bird feeder': 'a how-to guide with pictures', 'share facts about wetlands with your class': 'a slide presentation',
    'tell a funny thing that happened at camp': 'a short story', 'invite neighbours to a park clean-up': 'a poster', 'explain how a canoe is built': 'a labelled diagram with notes',
    'ask the town to fix the bumpy bike path': 'a letter to the town council', 'teach your cousin a new card game': 'a list of numbered steps', 'tell a spooky story around a campfire': 'an oral story',
    'report what you learned about monarchs': 'an information report with headings', 'convince your family to recycle more': 'a short speech', 'teach a friend how to tie a knot': 'a short how-to video',
    'tell about the day you learned to skate': 'a personal narrative', 'share the results of your class survey': 'a bar graph with a caption' };
  const formPurpose = f => purpose(Object.keys(FORM).find(t => FORM[t] === f));
  V['g5-form-fit'] = (q, m) => mk(q) === FORM[m.task] && q.options.map(text).filter(o => formPurpose(o) === purpose(m.task)).length === 1 ? '' : 'expected ' + FORM[m.task];
  V['g5-purpose'] = (q, m) => mk(q) === purpose(m.task) ? '' : 'expected ' + purpose(m.task);
  V['g5-match-purpose'] = q => q.pairs.every(p => purpose(text(p[0])) === text(p[1])) ? '' : 'a job is matched to the wrong purpose';
  V['g5-form-fit-tf'] = (q, m) => { const right = formPurpose(m.form) === purpose(m.task); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* ideas: the ones that wander off each topic */
  const OFF = ['my favourite pizza', 'how volcanoes erupt', 'the history of hockey', 'how to bake bread', 'the rules of chess', 'facts about the moon', 'the tallest mountain in the world', 'my favourite video game',
    'how to train a dog', 'the best pizza toppings', 'the rules of soccer', 'how to make pancakes', 'how cars are made', 'the price of skates', 'how bridges are built', 'the planets in order'];
  V['g5-ideas'] = q => H.sameSet(q.options.map((o, i) => OFF.includes(text(o)) ? -1 : i).filter(i => i >= 0), q.answer) ? '' : 'the ideas that fit are not the ones marked';
  V['g5-off-topic'] = q => { const ok = q.options.map(text).filter(o => OFF.includes(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the idea that is off topic'; };
  V['g5-idea-tf'] = (q, m) => { const right = !OFF.includes(text(m.idea)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-idea-source'] = q => H.sameSet(q.options.map((o, i) => /^(talk|think about|draw|read|look)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good ways are not the ones marked';
  /* reliable: a known expert or organization, or a named writer with a date */
  const TRUST = /(government|scientist|museum|encyclopedia|writer's name and the date|university)/;
  V['g5-reliable'] = q => { const ok = q.options.map(text).filter(o => TRUST.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the expert source'; };
  V['g5-source-tf'] = (q, m) => { const good = TRUST.test(text(m.s)), right = (m.says === 'reliable') === good; return q.answer === right && q.why.answer === (good ? 0 : 1) ? '' : 'expected ' + right; };
  V['g5-source-check'] = q => H.sameSet(q.options.map((o, i) => /^(Who made|When was|Do other|Does the creator)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the checks are not the ones marked';
  V['g5-record'] = q => H.sameSet(q.options.map((o, i) => /^(who made it|the title|the website|the date)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the things to record are not the ones marked';
  /* a source note: the creator, then a title, then a publisher or website, then a four-digit year */
  const TITLES = ['Wetlands of Ontario', 'Monarchs on the Move', 'The Ice Road Truckers', 'Life in a Beaver Pond', 'From Sap to Syrup', 'Canoes of Canada'];
  V['g5-source-note'] = q => { const a = q.items.map(text); return TITLES.includes(a[1]) && /(Press|Books|\.ca)$/.test(a[2]) && /^\d{4}$/.test(a[3]) && !TITLES.includes(a[0]) ? '' : 'the source note is not in order'; };
  /* notes and their headings */
  const HEAD = { 'eats leaves and twigs': 'Food', 'stores branches for winter': 'Food', 'lives in a lodge': 'Home', 'builds dams of mud and sticks': 'Home', 'has orange front teeth': 'Body', 'has a flat, wide tail': 'Body',
    'caterpillars eat milkweed': 'Food', 'adults drink nectar': 'Food', 'flies to Mexico': 'Journey', 'rests in trees at night': 'Journey', 'has orange and black wings': 'Body', 'weighs less than a paper clip': 'Body',
    'eats water plants': 'Food', 'chews twigs in winter': 'Food', 'lives in forests near lakes': 'Home', 'rests in thick bush': 'Home', 'has long legs': 'Body', 'grows wide antlers': 'Body' };
  V['g5-sort-notes'] = q => q.pairs.every(p => HEAD[text(p[0])] === text(p[1])) ? '' : 'a note is under the wrong heading';
  V['g5-heading-for'] = (q, m) => { const want = HEAD[m.notes.split(' / ')[0]]; return m.notes.split(' / ').every(n => HEAD[n] === want) && mk(q) === want ? '' : 'expected ' + want; };
  V['g5-note-tf'] = (q, m) => { const right = HEAD[m.n] === m.put; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* steps: the checker's own numbering */
  const STEP = ['Gather a pine cone, string and seeds.', 'Tie the string to the cone.', 'Spread sunflower butter on it.', 'Roll it in the seeds.', 'Hang it outside.',
    'Choose a topic.', 'Gather ideas.', 'Check your sources.', 'Sort your notes.', 'Write a draft.', 'Fill a pot with soil.', 'Push a bean seed into the soil.', 'Water it gently.', 'Set it in a sunny window.', 'Watch for a sprout.',
    'Put on your life jacket.', 'Carry the canoe to the water.', 'Climb in at the middle.', 'Push off from the shore.', 'Paddle together.', 'Mix the flour and milk.', 'Heat the pan.', 'Pour in the batter.', 'Flip the pancake.', 'Serve it warm.'];
  V['g5-order-steps'] = q => { const at = q.items.map(i => STEP.indexOf(text(i))); return at.every((p, i) => p >= 0 && (i === 0 || p === at[i - 1] + 1)) ? '' : 'the steps are not in order'; };
  const ORDER = { 'a story': 'problem', 'a how-to guide': 'steps in order', 'a persuasive letter': 'reasons', 'an information report': 'heading' };
  V['g5-form-order'] = (q, m) => mk(q).includes(ORDER[m.form]) ? '' : 'expected the order for ' + m.form;
})();
