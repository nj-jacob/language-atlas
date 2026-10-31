/* Grade 5: thinking critically.
   Ontario 2023 Language, Grade 5, Strand C (Comprehension):
   C3.2 local and global inferences, using explicit and implicit evidence
   C3.3 analyze texts: main and supporting ideas, the events of multiple plots, relevant information, cause and effect
   C3.5 explicit and implicit perspectives, how they are conveyed, evidence of bias, and how bias could influence an audience
   C3.6 how topics such as diversity, inclusion and accessibility are addressed in texts, and the messages conveyed
   With a grown-up: C3.4 cultural elements in texts, C3.7 texts by First Nations, Metis and Inuit creators and the times and events that shaped them,
   C3.8 the critical thinking skills used.
   Passages are in ../texts.js. Answer checks: tests/verify/grade5-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  /* [main idea, a detail that supports it, two that do not] */
  var SUPPORT = [['Wetlands are important.', 'Wetlands help stop floods.', ['Some people like to walk in the rain.', 'Ducks have webbed feet.']],
    ['Jun worked hard for the tryout.', 'Jun practised every day for a month.', ['The gym had twenty kids in it.', 'The coach wore a whistle.']],
    ['The new playground welcomes everyone.', 'It has ramps for kids who use wheelchairs.', ['The town is called Maple Ridge.', 'It opened in the spring.']],
    ['Manoomin is harvested with care.', 'The grains are knocked gently into the canoe.', ['Manitoba is west of Ontario.', 'Canoes can be made of wood.']]];
  var out = T.outage, bus = T.bus, park = T.park;

  /* ---------- question makers ---------- */
  function infer(lv) {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer), wrong = [f[2]].concat(lv > 1 ? t.infer.filter(function (x) { return x !== f; }).map(function (x) { return x[1]; }) : []);
    return Q.one(f[0], f[1], wrong, { fig: T.show(t), prompt: 'The text does not say it. Look for a clue: <b>' + f[3] + '</b>.',
      hint: 'Use the clue and what you know.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g5-infer', t: t.title, q: f[0] } });
  }
  function evidence() {
    var t = R.pick(T.list('infer').filter(function (x) { return x.infer.length > 1; })), f = R.pick(t.infer), other = t.infer.filter(function (x) { return x !== f; })[0];
    return Q.one('The answer is <b>' + f[1] + '</b> Which words in the text show it? <b>' + f[0] + '</b>', f[3], [other[3]], { fig: T.show(t),
      hint: 'Which words fit the answer?', explain: '<mark class="hl">' + f[3] + '</mark> shows it.', meta: { k: 'g5-evidence', t: t.title, q: f[0] } });
  }
  function global() {
    var t = R.pick(T.list('global')), g = t.global;
    return Q.one(g[0], g[1], [g[2]], { fig: T.show(t), prompt: 'Think about the whole text, not one line.', hint: 'What do all the parts add up to?', explain: 'Evidence: <mark class="hl">' + g[3] + '</mark>.', meta: { k: 'g5-global', t: t.title } });
  }
  function globalClue() {
    var t = R.pick(T.list('global')), g = t.global, other = t.lines.filter(function (l) { return l.indexOf(g[3]) < 0; })[1];
    return Q.one('<b>' + g[1] + '</b> Which words support this?', g[3], [other.split(' ').slice(0, 4).join(' ')], { fig: T.show(t), hint: 'Which words show it?', explain: '<mark class="hl">' + g[3] + '</mark>', meta: { k: 'g5-global-clue', t: t.title } });
  }

  function plotOf() {
    var p = R.pick(out.plots), e = R.pick(p[1]);
    return Q.tiles('Where does this happen?', p[0], out.plots.filter(function (x) { return x !== p; }).map(function (x) { return x[0]; }), { fig: W.sent('“' + e + '”'),
      prompt: 'This story follows two places at once.', hint: 'Find it in the story. Who is there?', explain: 'It happens <b>' + p[0].toLowerCase() + '</b>.', meta: { k: 'g5-plot', e: e } });
  }
  function matchPlots() {
    var pairs = out.plots.map(function (p) { return [p[0], R.pick(p[1])]; });
    return { q: 'Match each place to something that happens there.', fig: T.show(out), type: 'match', pairs: pairs, hint: 'Two plots: home and the arena.', explain: 'Keep the two plots apart in your head.', meta: { k: 'g5-match-plots' } };
  }
  function plotOrder() {
    var p = R.pick(out.plots);
    return { q: 'Put the <b>' + p[0].toLowerCase() + '</b> events in order.', fig: T.show(out), type: 'order', items: p[1].map(function (e) { return '“' + e + '”'; }).concat(['“' + 'came home with a story' + '”']), first: 'First', last: 'Last',
      hint: 'Follow just one plot.', explain: 'Both plots end when Rosa comes home.', meta: { k: 'g5-plot-order', place: p[0] } };
  }
  function support(lv) {
    var s = R.pick(SUPPORT);
    return Q.one('Main idea: <b>' + s[0] + '</b> Which detail <b>supports</b> it?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Which detail proves the main idea?', explain: W.sent(s[1]), meta: { k: 'g5-support', main: s[0] } });
  }

  function view(lv) {
    var v = bus.view;
    return Q.one('What does <b>' + v.who + '</b> think?', v.thinks, v.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(bus), prompt: 'Who wrote it? What does she ask for?',
      hint: 'Look at what she asks for at the end.', explain: v.thinks, meta: { k: 'g5-view' } });
  }
  function bias() {
    var v = bus.view, others = bus.lines.filter(function (l) { return l !== v.bias && /^(Last|Please|If)/.test(l); });
    return Q.one('Which sentence shows <b>bias</b>: a claim with no proof, to sway you?', v.bias, R.some(others, 2), { fig: T.show(bus), prompt: 'Does everyone really agree?',
      hint: 'Look for words like everyone, always, never, best.', explain: '<mark class="hl">' + v.bias + '</mark> No proof is given.', meta: { k: 'g5-bias' } });
  }
  function factOpinion() {
    var v = bus.view, opinion = bus.lines[1];
    return Q.one('Which sentence is a <b>fact</b> that could be checked?', v.fact, [opinion, v.bias], { fig: T.show(bus), hint: 'Could you count it or look it up?', explain: v.fact, meta: { k: 'g5-fact-opinion' } });
  }
  function missing() {
    var v = bus.view;
    return Q.one('Whose side is <b>missing</b>? What does the letter not tell you?', v.missing, ['what Ananya thinks', 'how many students rode the bus'], { fig: T.show(bus),
      hint: 'What would the school board want to say?', explain: 'It does not say ' + v.missing + '. A fair reader asks.', meta: { k: 'g5-missing' } });
  }
  function message(lv) {
    var m = park.message;
    return Q.one('What <b>message</b> does this text give?', m[0], m.slice(1, lv > 1 ? 3 : 2), { fig: T.show(park), prompt: 'Why do you think the writer chose this story?',
      hint: 'Think about what Leo says at the end.', explain: m[0], meta: { k: 'g5-message' } });
  }
  function access() {
    var right = ['smooth ramps instead of stairs', 'pictures and braille on signs', 'a quiet corner'], wrong = ['a tall slide', 'bright red paint', 'a big parking lot'];
    return Q.all('Pick every feature that helps <b>more kids</b> use the playground.', R.some(right, 2), R.some(wrong, 2), { fig: T.show(park), hint: 'Which ones are in the text, and help someone take part?',
      explain: 'Ramps, braille and a quiet space make it accessible.', meta: { k: 'g5-access' } });
  }

  Atlas.register('thinking', {
    lessons: [{
      id: 'between', title: 'Reading between the lines', sub: 'Inferences from one clue, and from the whole text.',
      concepts: [
        { slug: 'local', title: 'Infer from a clue', exp: ['C3.2'], skill: 'infer',
          model: [
            step(W.sent('My hands were shaking.'), 'The text never says "nervous".'),
            step(W.sent('shaking hands + what I know'), 'Clue plus what I know.'),
            step(W.tile('Jun is nervous.'), 'An inference.')
          ],
          guided: [function () { return infer(1); }, evidence],
          check: [function () { return infer(2); }, evidence],
          coach: '<p>Ask "How do you know?" after every inference. The child should point to words in the text.</p>',
          mistake: '<p>Guessing without a clue. An inference always comes from evidence.</p>' },
        { slug: 'global', title: 'Infer from the whole text', exp: ['C3.2'], skill: 'infer',
          model: [
            step(T.show(T.tryout), 'Read it all.'),
            step(W.sent('practised every day ... missed ... kept going'), 'Clues from start to end.'),
            step(W.tile('Jun does not give up.'), 'A big idea about Jun.')
          ],
          guided: [global, globalClue],
          check: [global, globalClue],
          coach: '<p>After a chapter, ask: "What kind of person is this character? What did they do that shows it?"</p>',
          mistake: '<p>Basing a big inference on one line. Look across the whole text.</p>' }
      ]
    }, {
      id: 'analyze', title: 'Analyzing texts', sub: 'Main and supporting ideas, and two plots at once.',
      concepts: [
        { slug: 'support', title: 'Details support the main idea', exp: ['C3.3'], skill: 'analyze',
          model: [
            step(W.sent('Wetlands are important.'), 'The big point.'),
            step(W.sent('Wetlands help stop floods.'), 'This proves it.'),
            step(W.sent('Ducks have webbed feet.'), 'True, but it does not prove it.')
          ],
          guided: [function () { return support(1); }, function () { return support(1); }],
          check: [function () { return support(2); }, function () { return support(2); }],
          coach: '<p>Draw a table: the main idea on top, supporting details as the legs. A detail that does not hold it up is not a leg.</p>',
          mistake: '<p>Choosing any true detail. A supporting detail must back up the main idea.</p>' },
        { slug: 'plots', title: 'Following two plots', exp: ['C3.3'], skill: 'analyze',
          model: [
            step(T.show(out), 'Two places at once.'),
            step(W.sent('At home: flashlight, then cards by candlelight.'), 'Plot 1.'),
            step(W.sent('At the arena: lights out, then the walk to the exit.'), 'Plot 2.')
          ],
          guided: [plotOf, matchPlots],
          check: [plotOf, plotOrder],
          coach: '<p>Use two colours of highlighter (or sticky notes) for the two plots, then retell each one on its own.</p>',
          mistake: '<p>Mixing the plots into one timeline. Track each one separately, then see where they meet.</p>' }
      ]
    }, {
      id: 'views', title: 'Perspectives and messages', sub: 'Whose view, what is left out, and what the text teaches.',
      concepts: [
        { slug: 'perspective', title: 'Every text has a point of view', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(T.show(bus), 'A letter from a student.'),
            step(W.sent('Please keep the late bus running.'), 'Her view: keep the bus.'),
            step(W.sent('more than 80 students rode it'), 'A fact she uses to support it.')
          ],
          guided: [function () { return view(1); }, factOpinion],
          check: [function () { return view(2); }, factOpinion],
          coach: '<p>Ask: "Who wrote this? What do they want me to think? What do they gain if I agree?"</p>',
          mistake: '<p>Treating an opinion as a fact because it is written down.</p>' },
        { slug: 'bias', title: 'Spot bias and missing voices', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(W.sent('<mark class="hl">Everyone</mark> agrees that clubs make school better.'), 'Everyone? No proof.'),
            step(W.sent('a terrible mistake'), 'Strong words to sway you.'),
            step(W.icon('people'), 'Missing: the school board' + '’' + 's view.')
          ],
          guided: [bias, missing],
          check: [bias, missing],
          coach: '<p>Bias is not always bad: Ananya cares about her school. The point is to notice it, so readers can decide for themselves.</p>',
          mistake: '<p>Being swayed by "everyone" and "always". Ask: "How do they know?"</p>' },
        { slug: 'message', title: 'The message about inclusion', exp: ['C3.6'], skill: 'perspective',
          model: [
            step(T.show(park), 'A new playground.'),
            step(W.sent('ramps &middot; braille &middot; a quiet corner'), 'How it includes more kids.'),
            step(W.sent('Now my whole class can play together.'), 'The message, in Leo' + '’' + 's words.')
          ],
          guided: [function () { return message(1); }, access],
          check: [function () { return message(2); }, access],
          coach: '<p>Look around your neighbourhood together: which places are easy for everyone to use? Which are not?</p>',
          mistake: '<p>Thinking accessibility only means wheelchairs. It also means signs, sound, calm spaces and more.</p>' }
      ]
    }],
    practice: [
      { id: 'infer', name: 'Reading between the lines', code: 'C3.2', gen: infer },
      { id: 'analyze', name: 'Analyzing texts', code: 'C3.3', gen: support },
      { id: 'perspective', name: 'Perspectives and messages', code: 'C3.5, C3.6', gen: view }
    ],
    tasks: [
      { id: 'culture', title: 'Culture in a text', code: 'C3.4', pic: W.icon('read'), say: 'Find foods, music, sports, objects or values from a culture in a story.',
        run: ['Read a story set in a culture, ideally one connected to your family or community.', 'The child finds cultural elements: foods, music, sports, objects, celebrations, values.', 'Look up one together, and talk about how it connects to the child' + '’' + 's own life and culture.'],
        rubric: ['Finds none yet.', 'Finds one with help.', 'Finds several and explains what one means.', 'Explains their meaning and makes thoughtful links to their own culture.'] },
      { id: 'fnmi-history', title: 'A First Nations, Métis or Inuit text and its times', code: 'C3.7', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator. How did history shape it?',
        run: ['With your librarian, choose a text by a First Nations, Métis or Inuit creator about history or lived experience.', 'Read the author note to learn the creator' + '’' + 's nation or community and when it was written.',
          'Talk about the events or times that shaped the text, and how its ideas connect to people' + '’' + 's lives today.'],
        rubric: ['Recalls little of the text yet.', 'Retells it; links to history with help.', 'Explains how events or experiences shaped the text.', 'Explains this respectfully and connects it to lived experience today.'],
        coach: '<p>Let the creator' + '’' + 's words lead. Avoid treating First Nations, Métis and Inuit peoples as one group; each nation and community is distinct.</p>' },
      { id: 'thinking-skills', title: 'How did I think about this text?', code: 'C3.8', pic: W.icon('think'), say: 'Which thinking skills did you use? How did they help?',
        run: ['After reading a text with an opinion in it, ask: "Did you check facts? Look for bias? Compare views? Ask who is missing?"', 'The child names two thinking skills and explains how each helped them understand.'],
        rubric: ['Cannot name a skill yet.', 'Names one with help.', 'Names two and how they helped.', 'Explains clearly how the skills changed their understanding.'] }
    ]
  });

  Q.shapes('thinking', {
    infer: [[1, 'evidence', evidence], [1, 'global', global], [2, 'global-clue', globalClue]],
    analyze: [[1, 'plot', plotOf], [1, 'match-plots', matchPlots], [2, 'plot-order', plotOrder]],
    perspective: [[1, 'fact-opinion', factOpinion], [1, 'bias', bias], [1, 'missing', missing], [1, 'message', message], [2, 'access', access]]
  });
})();
