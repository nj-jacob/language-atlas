/* Grade 8: drafting, revising and publishing.
   Ontario 2023 Language, Grade 8, D2 Creating Texts and D3 Publishing, Presenting and Reflecting:
   D2.1 draft complex texts of various forms and genres, citing sources        D2.2 cursive writing and advanced word-processing skills
   D2.3 an identifiable voice; language and style that suit form, audience and purpose
   D2.4 points of view, perspectives and bias in their own texts; how audiences may respond; acknowledging other perspectives
   D2.5 revise content, style and sentences for clarity, focus and coherence, using feedback
   D2.6 edit for spelling, punctuation, grammar and format, including with spell- and grammar-checkers
   D3.1 produce final texts           D3.2 publish and present, and evaluate the choices     D3.3 reflect on the creative process
   Writing is never auto-marked: drafting, handwriting and publishing are activities the grown-up marks with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade8-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [form and audience, a sentence that suits it, one that does not] */
  var STYLE = [['a lab report', 'The water was heated to 80 degrees Celsius.', 'So we cranked the heat way up.'], ['a message to your best friend', 'Can' + AP + 't believe how hard that test was!', 'The examination presented considerable difficulty.'],
    ['a cover letter for a summer job', 'I am reliable and eager to learn.', 'I' + AP + 'm pretty chill, honestly.'], ['a suspense story', 'The floorboards creaked behind me.', 'The house had wooden floors.'],
    ['a speech to persuade the school council', 'Every student deserves a safe place to play.', 'Whatever, it would be kind of nice.']];
  /* a sentence that acknowledges another view, and two that do not */
  var COUNTER = [['Some parents worry that a later start would make mornings harder for working families.', ['Everyone agrees that school should start later.', 'Starting later is obviously the only sensible choice.']],
    ['Others argue that the money would be better spent on new books.', ['No one could possibly disagree with this plan.', 'Anyone against the park is wrong.']],
    ['Some students may prefer the old schedule because it fits their bus times.', ['The old schedule was terrible for everyone.', 'Only lazy students like the old schedule.']]];
  /* [loaded, neutral] */
  var LOADED = [['The mayor' + AP + 's ridiculous plan wastes money.', 'The mayor' + AP + 's plan would cost 2 million dollars.'], ['Those whiny students complained about lunch.', 'Some students raised concerns about lunch.'],
    ['The greedy company dumped its waste.', 'The company released waste into the river.'], ['Only a fool would vote no.', 'Some voters may vote no for other reasons.']];
  /* a paragraph, with one sentence that is off topic */
  var PARA = [['Our town needs a new skate park.', 'The old one has cracked ramps.', 'My favourite food is pizza.', 'A new park would bring the community together.'],
    ['Wetlands protect us from floods.', 'They soak up water like a sponge.', 'My cousin lives in Calgary.', 'They also filter pollution from the water.'],
    ['Reading every day builds vocabulary.', 'Readers meet words they rarely hear in speech.', 'The library has new carpets.', 'Over time, those words appear in their own writing.']];
  var OFF = [2, 2, 2];
  /* [choppy sentences, a smooth combined version, a version that repeats] */
  var CHOPPY = [['The canoe was red. The canoe was dented. The canoe floated by the dock.', 'The red, dented canoe floated by the dock.', 'The canoe was red and the canoe was dented and the canoe floated by the dock.'],
    ['Leila opened the door. Leila saw the moose. Leila froze.', 'Leila opened the door, saw the moose and froze.', 'Leila opened the door and Leila saw the moose and Leila froze.'],
    ['The storm was strong. The storm knocked down trees. The storm hit at night.', 'The strong storm hit at night and knocked down trees.', 'The storm was strong and the storm knocked down trees and the storm hit at night.']];
  var ORDERED = [['Bike lanes make streets safer.', 'They separate cyclists from cars.', 'In cities that added them, crashes dropped.', 'Our town should build them on Main Street.'],
    ['Composting cuts the garbage we send away.', 'Food scraps make up much of household waste.', 'In a compost bin, they turn into rich soil.', 'Every family can start with one small bin.']];
  /* feedback: [what a reader said, the part to revise first] */
  var FEED = [['Your ending is great, but I got lost in the middle.', 'the middle'], ['The start is slow. I almost stopped reading.', 'the opening'], ['I loved the middle, but the ending felt sudden.', 'the ending']];
  /* [sentence with one error a spell-checker misses, the wrong word, the fixed sentence] */
  var HOMO = [['Their going to the game after school.', 'Their', 'They' + AP + 're going to the game after school.'], ['The dog wagged it' + AP + 's tail.', 'it' + AP + 's', 'The dog wagged its tail.'],
    ['The new rule will effect everyone.', 'effect', 'The new rule will affect everyone.'], ['We walked passed the school.', 'passed', 'We walked past the school.'],
    ['Your welcome to join us.', 'Your', 'You' + AP + 're welcome to join us.'], ['The team lost there best player.', 'there', 'The team lost their best player.']];
  /* [sentence with an error, the kind of error] */
  var ERR = [['The students was late for class.', 'grammar'], ['Where are you going.', 'punctuation'], ['We recieved the parcel today.', 'spelling'], ['Each of the players have a jersey.', 'grammar'],
    ['My favourite subjects are, math and art.', 'punctuation'], ['The experement worked on the first try.', 'spelling']];
  /* [what you need, the word-processing tool] */
  var TOOLS = [['A classmate will suggest changes without erasing your words.', 'track changes and comments'], ['You used one word too many times.', 'find, then a thesaurus'],
    ['Every heading should look the same.', 'heading styles'], ['Your essay must be under 500 words.', 'word count']];

  /* ---------- question makers: voice and perspective ---------- */
  function style(lv) {
    var s = R.pick(STYLE), other = R.pick(STYLE.filter(function (x) { return x !== s; }));
    return Q.one('Which sentence suits <b>' + s[0] + '</b>?', s[1], [s[2]].concat(lv > 1 ? [other[2]] : []), { prompt: 'Who is reading it, and why?',
      hint: 'Match the words and tone to the form, the audience and the purpose.', explain: W.sent(s[1]), meta: { k: 'g8-style', form: s[0] } });
  }
  function matchStyle() {
    var ss = R.some(STYLE, 3);
    return { q: 'Match each sentence to the text it suits.', type: 'match', pairs: ss.map(function (s) { return [s[1], s[0]]; }), hint: 'Listen to the tone of each sentence.', explain: 'Style changes with the form, audience and purpose.', meta: { k: 'g8-match-style' } };
  }
  function counter(lv) {
    var c = R.pick(COUNTER);
    return Q.one('Which sentence <b>acknowledges another perspective</b>?', c[0], c[1].slice(0, lv > 1 ? 2 : 1), { hint: 'It fairly describes what someone who disagrees might think.',
      explain: 'Acknowledging other views makes your argument fairer and more convincing.', meta: { k: 'g8-counter' } });
  }
  function neutral() {
    var l = R.pick(LOADED);
    return Q.one('Which is the more <b>neutral</b> way to say it?', l[1], [l[0]], { hint: 'Look for words that insult or exaggerate.', explain: W.sent(l[1]), meta: { k: 'g8-neutral' } });
  }
  function loadedWord() {
    var l = R.pick(LOADED), words = l[0].replace(/[.]/g, '').split(' '), bad = words.filter(function (w) { return /^(ridiculous|whiny|greedy|fool)$/.test(w); })[0];
    return { q: 'Tap the <b>loaded</b> word that shows bias.', fig: W.sent(l[0]), type: 'tap', tiles: words, answer: words.indexOf(bad), hint: 'Which word judges instead of describing?', explain: '<b>' + bad + '</b> is a loaded word.', meta: { k: 'g8-loaded' } };
  }

  /* ---------- revising ---------- */
  function offTopic() {
    var i = R.int(0, PARA.length - 1), p = PARA[i];
    return Q.one('Which sentence should be <b>deleted</b>? It is off topic.', p[OFF[i]], p.filter(function (x, j) { return j !== OFF[i] && j > 0; }), { fig: W.passage('', p),
      hint: 'Which sentence does not support the first one?', explain: W.sent(p[OFF[i]]) + ' is off topic.', meta: { k: 'g8-off-topic' } });
  }
  function combine(lv) {
    var c = R.pick(CHOPPY), other = R.pick(CHOPPY.filter(function (x) { return x !== c; }));
    return Q.one('Which revision combines these sentences <b>best</b>?', c[1], [c[2]].concat(lv > 1 ? [other[1]] : []), { fig: W.sent(c[0]), hint: 'Keep every idea, but say the subject once.', explain: W.sent(c[1]), meta: { k: 'g8-combine-rev', s: c[0] } });
  }
  function reorder() {
    var o = R.pick(ORDERED);
    return { q: 'Reorganize this paragraph so it flows.', type: 'order', items: o, first: 'First', last: 'Last', hint: 'Main idea first, then support, then the closing point.', explain: o.join(' '), meta: { k: 'g8-reorder' } };
  }
  function feedback() {
    var f = R.pick(FEED);
    return Q.tiles('A reader says: <b>' + f[0] + '</b> What should you revise first?', f[1], FEED.filter(function (x) { return x !== f; }).map(function (x) { return x[1]; }), {
      hint: 'Use the feedback that points to a problem.', explain: 'Revise ' + f[1] + '. Keep what worked.', meta: { k: 'g8-feedback', said: f[0] } });
  }

  /* ---------- editing ---------- */
  function homophone() {
    var h = R.pick(HOMO), words = h[0].replace(/[.]$/, '').split(' ');
    return { q: 'A spell-checker missed the error. Tap the wrong word.', fig: W.sent(h[0]), type: 'tap', tiles: words, answer: words.indexOf(h[1]), prompt: 'Every word is spelled right. Is each one the right word?',
      hint: 'Check words that sound alike: their, there, they' + AP + 're; its, it' + AP + 's; affect, effect.', explain: W.sent(h[2]), meta: { k: 'g8-homophone', s: h[0] } };
  }
  function homoFix(lv) {
    var h = R.pick(HOMO), other = R.pick(HOMO.filter(function (x) { return x !== h; }));
    return Q.one('Which sentence is correct?', h[2], [h[0]].concat(lv > 1 ? [other[0]] : []), { hint: 'Read it aloud and check each sound-alike word.', explain: W.sent(h[2]), meta: { k: 'g8-homo-fix' } });
  }
  function errKind(lv) {
    var e = R.pick(ERR);
    return Q.tiles('What kind of error is this?', e[1], ['spelling', 'punctuation', 'grammar'].filter(function (x) { return x !== e[1]; }), { fig: W.sent(e[0]),
      hint: 'A misspelled word? A wrong mark? Words that do not agree?', explain: 'A ' + e[1] + ' error.', meta: { k: 'g8-err-kind', s: e[0] } });
  }
  function tool() {
    var t = R.pick(TOOLS);
    return Q.one('Which word-processing tool helps?', t[1], TOOLS.filter(function (x) { return x !== t; }).map(function (x) { return x[1]; }).slice(0, 2), { fig: W.means('screen', t[0]),
      hint: 'Match the tool to the job.', explain: t[1] + '.', meta: { k: 'g8-tool', need: t[0] } });
  }

  Atlas.register('writing', {
    lessons: [{
      id: 'voice', title: 'Voice and perspective', sub: 'Sound right for the reader, and be fair.',
      concepts: [
        { slug: 'style', title: 'Fit your style to the form and reader', exp: ['D2.3'], skill: 'voice',
          model: [
            step(W.sent(STYLE[0][1]), 'A lab report: exact and impersonal.'),
            step(W.sent(STYLE[1][1]), 'A message to a friend: relaxed.'),
            step(W.sent(STYLE[3][1]), 'Suspense: sounds you can almost hear.')
          ],
          guided: [function () { return style(1); }, matchStyle],
          check: [function () { return style(2); }, matchStyle],
          coach: '<p>Your voice is still yours in every form: the words you choose, what you notice, how you see things. The style adjusts around it.</p>',
          mistake: '<p>Writing a formal piece in a texting style, or a story like a textbook.</p>' },
        { slug: 'perspective', title: 'Acknowledge other views', exp: ['D2.4'], skill: 'voice',
          model: [
            step(W.sent(COUNTER[0][1][0]), 'Ignores anyone who disagrees.'),
            step(W.sent(COUNTER[0][0]), 'Names a real concern, fairly.')
          ],
          guided: [function () { return counter(1); }, function () { return counter(1); }],
          check: [function () { return counter(2); }, function () { return counter(2); }],
          coach: '<p>Ask: "Who might read this and disagree? What would they say?" Then answer that in the writing.</p>',
          mistake: '<p>Mocking the other side. Readers who disagree stop listening.</p>' },
        { slug: 'neutral', title: 'Loaded words reveal bias', exp: ['D2.4'], skill: 'voice',
          model: [
            step(W.sent(LOADED[0][0].replace('ridiculous', '<mark class="hl">ridiculous</mark>')), 'A loaded word: it judges.'),
            step(W.sent(LOADED[0][1]), 'Neutral: a fact the reader can judge.')
          ],
          guided: [neutral, loadedWord],
          check: [neutral, loadedWord],
          coach: '<p>Reread a draft looking only for loaded words. Ask how a reader who disagrees would react to each.</p>',
          mistake: '<p>Thinking strong insults make an argument stronger.</p>' }
      ]
    }, {
      id: 'revise', title: 'Revising', sub: 'Delete, combine, reorganize, and use feedback.',
      concepts: [
        { slug: 'focus', title: 'Cut what is off topic', exp: ['D2.5'], skill: 'revise',
          model: [
            step(W.passage('', PARA[0]), 'Does each sentence support the first?'),
            step(W.sent('<s>' + PARA[0][2] + '</s>'), 'Off topic: delete it.')
          ],
          guided: [offTopic, offTopic],
          check: [offTopic, feedback],
          coach: '<p>Revising is about ideas and order; editing is about errors. Revise first.</p>',
          mistake: '<p>Keeping a sentence because it took effort to write.</p>' },
        { slug: 'combine', title: 'Combine choppy sentences', exp: ['D2.5'], skill: 'revise',
          model: [
            step(W.sent(CHOPPY[0][0]), 'The same subject three times.'),
            step(W.sent(CHOPPY[0][2]), 'Joined with "and": still repetitive.'),
            step(W.sent(CHOPPY[0][1]), 'Every idea, said once.')
          ],
          guided: [function () { return combine(1); }, function () { return combine(1); }],
          check: [function () { return combine(2); }, reorder],
          coach: '<p>Read the draft aloud. Choppy sections sound like a list; that is where to combine.</p>',
          mistake: '<p>Combining so much that one sentence carries too many ideas.</p>' },
        { slug: 'order', title: 'Reorganize so ideas flow', exp: ['D2.5'], skill: 'revise',
          model: [
            step(W.sent(ORDERED[0][0]), 'The main idea.'),
            step(W.sent(ORDERED[0][1]) + W.sent(ORDERED[0][2]), 'Support.'),
            step(W.sent(ORDERED[0][3]), 'The closing point.')
          ],
          guided: [reorder, feedback],
          check: [reorder, feedback],
          coach: '<p>Cut a printed draft into strips, one sentence each, and rearrange them on the table.</p>',
          mistake: '<p>Putting the main idea at the end, where the reader meets it too late.</p>' }
      ]
    }, {
      id: 'edit', title: 'Editing', sub: 'Find what a spell-checker misses, and use your tools.',
      concepts: [
        { slug: 'homophones', title: 'A spell-checker cannot catch every error', exp: ['D2.6'], skill: 'edit',
          model: [
            step(W.sent(HOMO[0][0].replace('Their', '<mark class="hl">Their</mark>')), 'Spelled right. Wrong word.'),
            step(W.sent(HOMO[0][2]), 'They' + AP + 're = they are.'),
            step(W.tile('its') + ' ' + W.tile('it' + AP + 's'), 'it' + AP + 's = it is. its = belonging to it.')
          ],
          guided: [homophone, homoFix],
          check: [homophone, function () { return homoFix(2); }],
          coach: '<p>Teach the "say it long" test: read "they' + AP + 're" as "they are". If it does not fit, it is the wrong word.</p>',
          mistake: '<p>Trusting a spell-checker completely.</p>' },
        { slug: 'errors', title: 'Spelling, punctuation or grammar?', exp: ['D2.6'], skill: 'edit',
          model: [
            step(W.sent(ERR[2][0]), 'Spelling: received.'),
            step(W.sent(ERR[1][0]), 'Punctuation: it needs a question mark.'),
            step(W.sent(ERR[0][0]), 'Grammar: the students <b>were</b>.')
          ],
          guided: [function () { return errKind(1); }, function () { return errKind(1); }],
          check: [function () { return errKind(2); }, tool],
          coach: '<p>Edit in separate passes: one read for spelling, one for punctuation, one for grammar. It catches more.</p>',
          mistake: '<p>Trying to catch everything in one read.</p>' },
        { slug: 'tools', title: 'Use word-processing tools well', exp: ['D2.2', 'D2.6'], skill: 'edit',
          model: [
            step(W.means('screen', 'track changes and comments'), 'Feedback without erasing your words.'),
            step(W.means('screen', 'heading styles'), 'A consistent format.'),
            step(W.means('screen', 'word count'), 'Stay within a limit.')
          ],
          guided: [tool, tool],
          check: [tool, tool],
          coach: '<p>Practise the tools on a real assignment: share a draft, turn on track changes, and accept or reject each suggestion together.</p>',
          mistake: '<p>Accepting every grammar-checker suggestion without thinking.</p>' }
      ]
    }],
    practice: [
      { id: 'voice', name: 'Voice, style and perspective', code: 'D2.3, D2.4', gen: style },
      { id: 'revise', name: 'Revising for clarity and flow', code: 'D2.5', gen: offTopic },
      { id: 'edit', name: 'Editing and tools', code: 'D2.2, D2.6', gen: homophone }
    ],
    tasks: [
      { id: 'draft', title: 'Draft a complex text', code: 'D2.1', pic: W.icon('write'), say: 'Write a draft: persuasive, informational or a story. Cite any sources you use.', write: true,
        run: ['The child chooses a form and a real audience, using their plan from the Planning chapter.', 'They write a full draft. Any facts or quotations from research are cited.', 'Remind them a draft is meant to be changed.'],
        rubric: ['A few unconnected sentences.', 'A draft with some structure; sources not cited.', 'A complete draft that suits its form, with sources cited.', 'A well-developed draft with a clear purpose, strong structure and cited sources.'] },
      { id: 'cursive', title: 'Cursive and word processing', code: 'D2.2', pic: W.icon('write'), say: 'Copy a paragraph in cursive. Then type it, and format it with headings.',
        run: ['The child writes a short paragraph in cursive, in their own style, legibly and fluently.', 'They type the same paragraph, add a heading style, check the word count, and use spell-check thoughtfully.'],
        rubric: ['Cursive is hard to read; little use of tools.', 'Mostly legible; uses some tools.', 'Fluent, legible cursive, and uses several word-processing tools well.', 'Fluent cursive with a personal style; uses tools to improve accuracy and effect.'] },
      { id: 'final-copy', title: 'Produce a final copy', code: 'D3.1', pic: W.icon('screen'), say: 'Make a final copy. Choose fonts, images and layout that suit your purpose.',
        run: ['The child turns their revised draft into a final copy, on paper or with a design tool.', 'Ask: "How does your layout, font and image choice help your purpose?"'],
        rubric: ['Unfinished or hard to read.', 'Finished, with little thought about design.', 'Polished, with design choices that suit the purpose.', 'Polished and striking; every design choice supports the intended effect.'] },
      { id: 'publish', title: 'Publish or present it', code: 'D3.2', pic: W.icon('people'), say: 'Share your work with a real audience. Then explain what worked.',
        run: ['Help the child share their work: post it on a class site, read it aloud, submit it to a school newsletter, or present it.', 'Afterward, ask: "Which choices helped your message come across?"'],
        rubric: ['Not shared yet.', 'Shared, with little reflection.', 'Shared with an audience, and explains which choices helped.', 'Shared confidently, and evaluates choices with specific examples.'] },
      { id: 'reflect', title: 'Looking back on my writing', code: 'D3.3', pic: W.icon('star'), say: 'What did you learn at each stage: planning, drafting, revising, publishing?', write: true,
        run: ['The child looks back at their plan, draft and final copy.', 'They write what they learned at each stage, which tools helped, and one step to improve next time.'],
        rubric: ['No reflection.', 'Comments on one stage.', 'Reflects on each stage and sets a next step.', 'Insightful reflection on each stage, tools and topics, with a specific plan to grow.'] }
    ]
  });

  Q.shapes('writing', {
    voice: [[1, 'counter', counter], [1, 'neutral', neutral], [1, 'loaded', loadedWord], [2, 'match', matchStyle]],
    revise: [[1, 'combine', combine], [1, 'feedback', feedback], [2, 'reorder', reorder]],
    edit: [[1, 'fix', homoFix], [1, 'error-kind', errKind], [1, 'tool', tool]]
  });
})();
