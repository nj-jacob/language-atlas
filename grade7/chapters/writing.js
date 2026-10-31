/* Grade 7: writing and publishing.
   Ontario 2023 Language, Grade 7, D2 Creating Texts and D3 Publishing, Presenting and Reflecting:
   D2.1 drafting complex texts of various forms       D2.2 cursive writing and word-processing skills          D2.3 a personal voice and a tone that suits the form
   D2.4 point of view, perspectives and bias in their own texts                     D2.5 revising: add, delete and re-sequence sentences for clarity and coherence
   D2.6 editing for spelling, punctuation, grammar and format, including with spell- and grammar-checkers
   D3.1 producing final texts with suitable techniques and tools      D3.2 publishing and presenting, and how choices helped      D3.3 comparing strategies and tools, and next steps
   Drafting, handwriting, presenting and reflecting are activities with a grown-up, marked with a rubric. Writing is never auto-marked.
   All examples are written for this site. Answer checks: tests/verify/grade7-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- paragraphs: topic sentence, two supporting details, a concluding sentence ---------- */
  var PARA = [['Our town should build a skateboard park.', 'Right now, skaters use parking lots, which is unsafe.', 'A park would give them a safe place to practise.', 'A skateboard park would make our town safer for everyone.'],
    ['Winter ice roads are a lifeline for many northern communities.', 'Trucks use them to bring in fuel and food.', 'Without them, supplies must be flown in at a high cost.', 'Protecting these roads matters to thousands of people.'],
    ['Volunteering helps teens as much as it helps others.', 'Teens learn skills like teamwork and planning.', 'They also meet people from different backgrounds.', 'Giving time is one of the best ways to grow.']];
  /* a sentence that does not belong in each paragraph */
  var OFFP = ['My favourite colour is green.', 'Some people like to bake bread.', 'The Leafs played last night.'];
  function paraOrder() {
    var p = R.pick(PARA);
    return { q: 'Put the sentences in order to make a strong paragraph.', type: 'order', items: p.slice(), first: 'First', last: 'Last',
      hint: 'Topic sentence first, then details, then a sentence that wraps it up.', explain: 'Topic sentence, details, conclusion.', meta: { k: 'g7-para-order' } };
  }
  function topicSentence(lv) {
    var p = R.pick(PARA);
    return Q.one('Which is the <b>topic sentence</b>?', p[0], (lv > 1 ? p.slice(1, 4) : p.slice(1, 3)), { hint: 'The topic sentence tells what the whole paragraph is about.', explain: W.sent(p[0]), meta: { k: 'g7-topic-sentence' } });
  }
  /* tone: [form, a sentence with a fitting tone, sentences that do not fit] */
  var TONE = [['a science report', 'The water boiled after six minutes at full heat.', ['The water boiled SO fast, it was wild!', 'Honestly, I was bored waiting for the water.']],
    ['a personal blog about a camping trip', 'Honestly, the first night in the tent was the coldest of my life.', ['The temperature inside the tent was recorded as low.', 'Tents are shelters made of fabric.']],
    ['a thank-you letter to a coach', 'Thank you for believing in me all season.', ['Your coaching occurred during the season.', 'Coaches are adults who run teams.']],
    ['a persuasive speech', 'Imagine a school where every student feels welcome.', ['There is a school.', 'Schools have many rooms.']]];
  function tone(lv) {
    var t = R.pick(TONE);
    return Q.one('Which sentence has the right <b>tone</b> for <b>' + t[0] + '</b>?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Formal and factual, or personal and lively?',
      hint: 'Match the tone to the form and the reader.', explain: W.sent(t[1]), meta: { k: 'g7-tone', f: t[0] } });
  }
  var VOICED = [['Honestly? I was terrified, and I am not ashamed to say it.', 'I was scared.'], ['Our park is not just grass; it is where my whole neighbourhood comes alive.', 'Our park is nice.'],
    ['I will never forget the smell of my grandmother' + '’' + 's kitchen on Sunday mornings.', 'My grandmother cooks on Sundays.']];
  function voice() {
    var v = R.pick(VOICED);
    return Q.one('Which sentence has a stronger <b>personal voice</b>?', v[0], [v[1]], { hint: 'Which one sounds like a real person with feelings and opinions?', explain: W.sent(v[0]), meta: { k: 'g7-voice', s: v[0] } });
  }

  /* ---------- revising ---------- */
  /* [a sentence from a draft that may seem unfair to some readers, a fairer version] */
  var OWN = [['Everyone knows skateboarders are reckless.', 'Some drivers worry that skateboarders are not always careful.'], ['Only selfish people drive to school.', 'Driving to school adds to traffic near the building.'],
    ['Old people never understand technology.', 'Some people learn new technology at a different pace.'], ['Kids from the city know nothing about nature.', 'Some city kids have fewer chances to spend time in nature.']];
  function ownBias(lv) {
    var o = R.pick(OWN);
    return Q.one('You are revising your draft. Which sentence is fairer to readers with different perspectives?', o[1], [o[0]].concat(lv > 1 ? [R.pick(OWN.filter(function (x) { return x !== o; }))[0]] : []), {
      prompt: 'How would someone in that group feel reading it?', hint: 'Avoid words like everyone, only, never and always about a group of people.', explain: W.sent(o[1]), meta: { k: 'g7-own-bias', fair: o[1] } });
  }
  function readerFeel() {
    var o = R.pick(OWN);
    return Q.one('How might a reader from that group take this sentence?', 'They might feel unfairly judged and stop trusting the writer.', ['They would agree with it right away.', 'They would not notice it.'],
      { fig: W.sent(o[0]), hint: 'Picture someone in that group reading it.', explain: 'Unfair generalizations push readers away.', meta: { k: 'g7-reader-feel' } });
  }
  function cut() {
    var i = R.int(0, PARA.length - 1), p = PARA[i], off = OFFP[i], lines = p.slice(0, 2).concat([off]).concat(p.slice(2));
    return Q.one('Which sentence should be <b>deleted</b> to keep the paragraph focused?', off, R.some(p.slice(1, 3), 2), { fig: W.passage('', lines),
      hint: 'Which one is not about the topic sentence?', explain: 'Delete <b>' + off + '</b>: it is off topic.', meta: { k: 'g7-cut', off: off } });
  }
  /* transitions: [first sentence, second sentence, the transition that fits] */
  var TRANS = [['Skaters use parking lots.', 'cars and skaters are often too close.', 'As a result,'], ['Many teens volunteer.', 'some help at food banks every week.', 'For example,'],
    ['Ice roads are useful.', 'they are open for only a few weeks now.', 'However,'], ['We collected the data and made a graph.', 'we wrote our conclusion.', 'Finally,']];
  var TRANSWHY = { 'As a result,': 'a result', 'For example,': 'an example', 'However,': 'a contrast', 'Finally,': 'the last step' };
  function transition(lv) {
    var t = R.pick(TRANS);
    return Q.tiles('Which transition makes the link clear?', t[2], R.some(TRANS.filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; }), { fig: W.sent(t[0] + ' ' + W.gap() + ' ' + t[1]),
      hint: 'Is the second sentence a result, an example, a contrast or the last step?', explain: W.sent(t[0] + ' <b>' + t[2] + '</b> ' + t[1]), meta: { k: 'g7-transition', a: t[0] } });
  }

  /* ---------- editing: [correct sentence, the same sentence with one error, the kind of error] ---------- */
  var EDIT = [['Their team won the final game.', 'There team won the final game.', 'spelling'], ['The coach said, “Great work, everyone.”', 'The coach said “Great work, everyone.”', 'punctuation'],
    ['Each of the players has a new jersey.', 'Each of the players have a new jersey.', 'grammar'], ['We travelled to Ottawa in February.', 'We travelled to ottawa in February.', 'capitalization'],
    ['The museum was too crowded to see much.', 'The museum was to crowded to see much.', 'spelling'], ['Leila and I finished the project.', 'Leila and me finished the project.', 'grammar']];
  var KINDS = ['spelling', 'punctuation', 'grammar', 'capitalization'];
  function noError(lv) {
    var e = R.pick(EDIT), others = R.some(EDIT.filter(function (x) { return x !== e; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; });
    return Q.one('Which sentence has <b>no errors</b>?', e[0], [e[1]].concat(others), { hint: 'Check spelling, capitals, punctuation and grammar in each.', explain: W.sent(e[0]), meta: { k: 'g7-no-error' } });
  }
  function errorKind(lv) {
    var e = R.pick(EDIT);
    return Q.tiles('What kind of error is in this sentence?', e[2], R.some(KINDS.filter(function (k) { return k !== e[2]; }), lv > 1 ? 3 : 2), { fig: W.sent(e[1]),
      hint: 'Compare each word with what it should be.', explain: 'Fixed: ' + W.sent(e[0]), meta: { k: 'g7-error-kind', s: e[1] } });
  }
  function checkerTf() {
    var right = R.int(0, 1) === 1, said = right ? 'A spell-checker can miss words like their and there.' : 'A spell-checker catches every mistake.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Real words used in the wrong place are not flagged.', 'Spell-checkers read for meaning.'], answer: 0 },
      hint: 'Is "there" a real word? Would the checker flag it?', explain: 'Use the checker, then read it yourself too.', meta: { k: 'g7-checker-tf', said: said } };
  }

  function errorPick() {
    var es = R.some(EDIT, 4);
    return Q.all('Pick every sentence that has an <b>error</b>.', es.slice(0, 2).map(function (e) { return e[1]; }), es.slice(2).map(function (e) { return e[0]; }), {
      hint: 'Check spelling, capitals, punctuation and grammar.', explain: 'Fixed: ' + es.slice(0, 2).map(function (e) { return e[0]; }).join(' '), meta: { k: 'g7-error-pick' } });
  }

  /* ---------- publishing: [goal, a technique that achieves it, others] ---------- */
  var PUB = [['help readers find each section of a report', 'clear headings', ['a fancy font', 'more exclamation marks']], ['explain what a photo shows', 'a caption under the photo', ['a bigger border', 'a brighter colour']],
    ['make slides easy to follow during a talk', 'a few words and one picture per slide', ['every word of the speech on each slide', 'lots of moving animations']],
    ['make a poster readable from across the room', 'large, high-contrast text', ['small, light grey text', 'many long paragraphs']]];
  function technique(lv) {
    var p = R.pick(PUB);
    return Q.one('You want to <b>' + p[0] + '</b>. Which choice helps most?', p[1], p[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Which choice helps the audience, not just decorates?', explain: p[1] + '.', meta: { k: 'g7-technique', g: p[0] } });
  }
  function techMatch() {
    var ps = R.some(PUB, 3);
    return { q: 'Match each goal to the choice that achieves it.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Picture the audience using each one.', explain: 'Design choices should serve the message.', meta: { k: 'g7-tech-match' } };
  }

  function pubPick() {
    var ps = R.some(PUB, 4);
    return Q.all('Pick every choice that <b>helps the audience</b>.', ps.slice(0, 2).map(function (p) { return p[1]; }), ps.slice(2).map(function (p) { return R.pick(p[2]); }), {
      hint: 'Does it make the message clearer or easier to read?', explain: 'Good design serves the reader.', meta: { k: 'g7-pub-pick' } });
  }
  function pubTf() {
    var right = R.int(0, 1) === 1, said = right ? 'My slides should have a few words and let me do the talking.' : 'I should put every word of my speech on my slides.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['The audience cannot read and listen at the same time.', 'More words on slides always help.'], answer: 0 },
      hint: 'What does the audience do when a slide is full of words?', explain: 'Few words per slide keeps the audience with the speaker.', meta: { k: 'g7-pub-tf', said: said } };
  }

  Atlas.register('writing', {
    lessons: [{
      id: 'drafting', title: 'Drafting', sub: 'Build strong paragraphs and find your voice.',
      concepts: [
        { slug: 'paragraph', title: 'A paragraph has a clear shape', exp: ['D2.1'], skill: 'drafting',
          model: [
            step(W.sent('Our town should build a skateboard park.'), 'Topic sentence: the main point.'),
            step(W.sent('Right now, skaters use parking lots.') + W.sent('A park would give them a safe place.'), 'Details that support it.'),
            step(W.sent('A skateboard park would make our town safer.'), 'Concluding sentence.')
          ],
          guided: [paraOrder, function () { return topicSentence(1); }],
          check: [paraOrder, function () { return topicSentence(2); }],
          coach: '<p>Use a hamburger picture: top bun (topic), fillings (details), bottom bun (conclusion).</p>',
          mistake: '<p>A topic sentence that is a detail ("Skaters use parking lots."). It should cover the whole paragraph.</p>' },
        { slug: 'voice', title: 'Tone and voice fit the form', exp: ['D2.3'], skill: 'drafting',
          model: [
            step(W.means('read', 'a science report'), 'Factual and calm.'),
            step(W.means('talk', 'a personal blog'), 'Your own voice, feelings and opinions.'),
            step(W.sent('I was scared.') + ' &rarr; ' + W.sent('Honestly? I was terrified.'), 'More personal.')
          ],
          guided: [function () { return tone(1); }, voice],
          check: [function () { return tone(2); }, voice],
          coach: '<p>Read the child' + '’' + 's writing aloud and ask: "Does this sound like you? Does it sound right for the reader?"</p>',
          mistake: '<p>Writing every piece in the same voice. A lab report and a personal story need different tones.</p>' }
      ]
    }, {
      id: 'revising', title: 'Revising', sub: 'Fairer, clearer, more focused.',
      concepts: [
        { slug: 'own-bias', title: 'Check your own writing for bias', exp: ['D2.4'], skill: 'revising',
          model: [
            step(W.sent('<mark class="hl">Everyone knows</mark> skateboarders are reckless.'), 'Judges a whole group.'),
            step(W.means('people', 'a reader who skateboards'), 'How would they feel?'),
            step(W.sent('Some drivers worry that skateboarders are not always careful.'), 'Fairer, and still makes the point.')
          ],
          guided: [function () { return ownBias(1); }, readerFeel],
          check: [function () { return ownBias(2); }, readerFeel],
          coach: '<p>Before finishing, ask the child to read their draft as someone who disagrees. What would that reader object to?</p>',
          mistake: '<p>Thinking bias only exists in other people' + '’' + 's writing. Everyone has a point of view.</p>' },
        { slug: 'cut-add', title: 'Delete, add and reorder for clarity', exp: ['D2.5'], skill: 'revising',
          model: [
            step(W.sent('<s>My favourite colour is green.</s>'), 'Off topic: delete.'),
            step(W.sent('Ice roads are useful. <b>However,</b> they are open for only a few weeks.'), 'Add a transition.'),
            step(W.means('again', 'Move a sentence'), 'So the ideas build in order.')
          ],
          guided: [cut, function () { return transition(1); }],
          check: [cut, function () { return transition(2); }],
          coach: '<p>Revise in two passes: first for ideas (cut, add, move), then for words. Editing comes later.</p>',
          mistake: '<p>Revising by fixing only spelling. Revision is about ideas and order.</p>' }
      ]
    }, {
      id: 'finishing', title: 'Editing and publishing', sub: 'Fix errors, then design the final copy.',
      concepts: [
        { slug: 'edit', title: 'Edit for errors, line by line', exp: ['D2.6'], skill: 'editing',
          model: [
            step(W.sent('<mark class="hl">There</mark> team won.'), 'Spelling: their.'),
            step(W.sent('We travelled to <mark class="hl">ottawa</mark>.'), 'Capitalization: Ottawa.'),
            step(W.means('screen', 'spell-checker'), 'It helps, but it misses real words in the wrong place.')
          ],
          guided: [function () { return errorKind(1); }, checkerTf],
          check: [function () { return noError(2); }, function () { return errorKind(2); }],
          coach: '<p>Read the final draft aloud slowly, or backwards sentence by sentence. Errors jump out.</p>',
          mistake: '<p>Trusting the grammar checker completely. It can suggest wrong changes; the writer decides.</p>' },
        { slug: 'publish', title: 'Design choices serve the message', exp: ['D3.1', 'D3.2'], skill: 'publishing',
          model: [
            step(W.means('read', 'clear headings'), 'Readers find each part.'),
            step(W.means('screen', 'a few words per slide'), 'The audience listens to you.'),
            step(W.means('star', 'large, high-contrast text'), 'Readable from across the room.')
          ],
          guided: [function () { return technique(1); }, techMatch],
          check: [function () { return technique(2); }, techMatch],
          coach: '<p>Before publishing, ask: "Who will see this, where, and for how long?" Then choose the design.</p>',
          mistake: '<p>Decorating instead of designing: fancy fonts and effects that make it harder to read.</p>' }
      ]
    }],
    practice: [
      { id: 'drafting', name: 'Paragraphs, tone and voice', code: 'D2.1, D2.3', gen: function (lv) { return topicSentence(lv); } },
      { id: 'revising', name: 'Revising for fairness and focus', code: 'D2.4, D2.5', gen: ownBias },
      { id: 'editing', name: 'Editing', code: 'D2.6', gen: errorKind },
      { id: 'publishing', name: 'Design and publishing', code: 'D3.1, D3.2', gen: technique }
    ],
    tasks: [
      { id: 'draft', title: 'Draft a piece of writing', code: 'D2.1', pic: W.icon('write'), say: 'Write a draft: an opinion piece, a short story or an information report. Use your plan.', write: true,
        run: ['Use the plan from Planning and Research if there is one.', 'The child drafts at least three paragraphs. Do not correct spelling yet: this is a draft.', 'Afterward, ask them to point to their topic sentence in each paragraph.'],
        rubric: ['A few sentences, no clear form.', 'Some paragraphs; ideas not yet organized.', 'Clear form with organized paragraphs.', 'Well organized, detailed, and suited to the purpose and audience.'] },
      { id: 'cursive-typing', title: 'Cursive and keyboarding', code: 'D2.2', pic: W.icon('write'), say: 'Copy your best paragraph in cursive. Then type it and use the tools to improve it.',
        run: ['The child writes one paragraph in cursive, aiming for even, joined letters in their own style.', 'They type the same paragraph and use word-processing tools: spell-check, cut and paste, and formatting.', 'Talk about what the tools helped with and what they missed.'],
        rubric: ['Cursive hard to read; typing slow and uncorrected.', 'Mostly readable cursive; uses one tool.', 'Fluent cursive; uses several tools to improve accuracy.', 'Fluent, personal cursive, and confident use of tools to improve both accuracy and effect.'] },
      { id: 'present', title: 'Publish or present it', code: 'D3.2', pic: W.icon('people'), say: 'Share your final piece: post it, print it, or present it. Explain one choice you made.',
        run: ['The child produces a final copy (printed, as slides, as a web page, or read aloud as a talk).', 'After sharing, ask: "Which choice (a heading, a picture, a font, a pause) helped your message most?"'],
        rubric: ['Final copy not finished.', 'Shared, but choices do not help the message.', 'Shared, with choices that support the message.', 'Polished, and the child explains clearly how their choices helped the audience.'] },
      { id: 'reflect', title: 'Looking back as a writer', code: 'D3.3', pic: W.icon('star'), say: 'Compare two tools or strategies that helped you this time. What will you do differently next time?', write: true,
        run: ['Together, look at the plan, the draft and the final copy.', 'The child compares two strategies or tools (for example an outline and peer feedback) and names one goal for next time.', 'Ask what topic the piece explored and whose perspective it showed.'],
        rubric: ['No reflection yet.', 'Names one thing that helped.', 'Compares two strategies and sets a goal.', 'Insightful comparison, and a specific plan to grow as a writer.'] }
    ]
  });

  Q.shapes('writing', {
    drafting: [[1, 'order', paraOrder], [1, 'tone', tone], [1, 'voice', voice]],
    revising: [[1, 'reader', readerFeel], [1, 'cut', cut], [1, 'transition', transition]],
    editing: [[1, 'no-error', noError], [1, 'checker', checkerTf], [2, 'pick', errorPick]],
    publishing: [[1, 'match', techMatch], [1, 'true-false', pubTf], [2, 'pick', pubPick]]
  });
})();
