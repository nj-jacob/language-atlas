/* Grade 5: planning writing.
   Ontario 2023 Language, Grade 5, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and why the chosen form, genre and medium suit them      D1.2 generate and develop ideas, drawing on various resources and lived experience
   D1.3 gather information from multiple sources, verify reliability with simple criteria, and record the creator and source
   D1.4 select and classify ideas and information, and sequence content for the chosen form
   With a grown-up: D1.5 the strategies and tools that helped. All topics and notes are written for this site.
   Answer checks: tests/verify/grade5-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [what you want to do, its purpose, the form that suits it] */
  var TASKS = [['convince the principal to start a school garden', 'to persuade', 'a persuasive letter'], ['teach Grade 2 students how to make a bird feeder', 'to instruct', 'a how-to guide with pictures'],
    ['share facts about wetlands with your class', 'to inform', 'a slide presentation'], ['tell a funny thing that happened at camp', 'to entertain', 'a short story'],
    ['invite neighbours to a park clean-up', 'to persuade', 'a poster'], ['explain how a canoe is built', 'to inform', 'a labelled diagram with notes']];
  var PURPOSES = ['to persuade', 'to instruct', 'to inform', 'to entertain'];
  /* [topic, ideas that fit, ideas that do not] */
  var TOPICS = [['Why our town needs a library', ['a quiet place to study', 'free books for every family', 'computers for people without one'], ['my favourite pizza', 'how volcanoes erupt']],
    ['How to care for a puppy', ['feed it at the same times each day', 'take it outside often', 'give it safe toys to chew'], ['the history of hockey', 'how to bake bread']],
    ['A day I will never forget', ['where I was', 'what happened first', 'how I felt at the end'], ['the rules of chess', 'facts about the moon']]];
  /* [a source, how reliable it is: 2 good, 1 check it, 0 not reliable] */
  var SOURCES = [['a government parks website, updated this year', 2], ['a book about wetlands by a scientist', 2], ['a museum' + '’' + 's website', 2],
    ['a post by someone with no name', 0], ['an ad for a frog toy', 0], ['a comment under a video', 0]];
  var RECORD = ['who made it', 'the title', 'the website or publisher', 'the date'], NORECORD = ['your favourite part', 'how long you read', 'the colour of the cover'];
  /* notes to sort under headings */
  var NOTES = { Food: ['eats leaves and twigs', 'stores branches for winter'], Home: ['lives in a lodge', 'builds dams of mud and sticks'], Body: ['has orange front teeth', 'has a flat, wide tail'] };
  var STEPS = [['Gather a pine cone, string and seeds.', 'Tie the string to the cone.', 'Spread sunflower butter on it.', 'Roll it in the seeds.', 'Hang it outside.'],
    ['Choose a topic.', 'Gather ideas.', 'Check your sources.', 'Sort your notes.', 'Write a draft.']];

  /* ---------- question makers ---------- */
  function formFit(lv) {
    var t = R.pick(TASKS), wrong = R.some(TASKS.filter(function (x) { return x[2] !== t[2] && x[1] !== t[1]; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; });
    return Q.one('You want to <b>' + t[0] + '</b>. Which form suits it best?', t[2], wrong, { prompt: 'What is the purpose? Who is the audience?',
      hint: 'Match the form to what you want the reader to do.', explain: '<b>' + t[2] + '</b> suits it.', meta: { k: 'g5-form-fit', task: t[0] } });
  }
  function purposeOf() {
    var t = R.pick(TASKS);
    return Q.tiles('You want to <b>' + t[0] + '</b>. What is your purpose?', t[1], PURPOSES.filter(function (p) { return p !== t[1]; }), { hint: 'Persuade, instruct, inform or entertain?',
      explain: 'Your purpose: <b>' + t[1] + '</b>.', meta: { k: 'g5-purpose', task: t[0] } });
  }
  function ideas() {
    var t = R.pick(TOPICS);
    return Q.all('Your topic: <b>' + t[0] + '</b>. Pick every idea that fits.', R.some(t[1], 2), t[2], { hint: 'Does it belong with the topic?', explain: 'Keep only ideas about the topic.', meta: { k: 'g5-ideas', topic: t[0] } });
  }
  function matchPurpose() {
    var seen = {}, list = R.shuffle(TASKS).filter(function (t) { if (seen[t[1]]) return false; seen[t[1]] = 1; return true; }).slice(0, 3);
    return { q: 'Match each writing job to its purpose.', type: 'match', pairs: list.map(function (t) { return [t[0], t[1]]; }), hint: 'What should the reader do or feel?', explain: 'Purpose first, then form.', meta: { k: 'g5-match-purpose' } };
  }

  function reliable(lv) {
    var good = R.pick(SOURCES.filter(function (s) { return s[1] === 2; })), bad = R.some(SOURCES.filter(function (s) { return s[1] === 0; }), lv > 1 ? 3 : 2);
    return Q.one('Which source is most <b>reliable</b> for facts about Ontario wetlands?', good[0], bad.map(function (s) { return s[0]; }), { prompt: 'Who made it? Do they know the topic? Is it recent?',
      hint: 'Trust sources with a known, expert creator and a date.', explain: good[0] + ': a known creator who knows the topic.', meta: { k: 'g5-reliable' } });
  }
  function record() {
    return Q.all('You use facts from a website. Pick every thing you should <b>record</b> about it.', R.some(RECORD, 3), R.some(NORECORD, 1), { hint: 'So someone else could find it again, and so you credit its creator.',
      explain: 'Record who made it, the title, where it is, and the date.', meta: { k: 'g5-record' } });
  }
  function sortNotes() {
    var heads = Object.keys(NOTES);
    return { q: 'Sort each note under the right heading.', type: 'match', pairs: heads.map(function (h) { return [R.pick(NOTES[h]), h]; }), hint: 'Is it about what it eats, where it lives, or how it looks?',
      explain: 'Grouping notes makes paragraphs.', meta: { k: 'g5-sort-notes' } };
  }
  function orderSteps() {
    var s = R.pick(STEPS);
    return { q: 'Put the steps in order.', type: 'order', items: s.slice(0, 4), first: 'First', last: 'Last', hint: 'What has to happen before the next step can?', explain: 'A how-to text goes in the order you do it.', meta: { k: 'g5-order-steps' } };
  }

  Atlas.register('planning', {
    lessons: [{
      id: 'purpose', title: 'Purpose, audience and form', sub: 'Decide why, for whom, and how.',
      concepts: [
        { slug: 'purpose', title: 'Purpose and audience decide the form', exp: ['D1.1'], skill: 'plan',
          model: [
            step(W.sent('Convince the principal to start a garden.'), 'Why? <b>To persuade</b>. Who? The principal.'),
            step(W.tile('a persuasive letter'), 'A form that gives reasons, politely.'),
            step(W.sent('Teach Grade 2s to make a bird feeder.'), 'To instruct young readers: a how-to guide with pictures.')
          ],
          guided: [function () { return formFit(1); }, purposeOf],
          check: [function () { return formFit(2); }, matchPurpose],
          coach: '<p>Before any writing, ask three questions: Why am I writing? Who will read it? What form will work best?</p>',
          mistake: '<p>Picking a form first because it is fun. Start with the purpose and the reader.</p>' },
        { slug: 'ideas', title: 'Gather ideas that fit the topic', exp: ['D1.2'], skill: 'plan',
          model: [
            step(W.sent('Why our town needs a library'), 'The topic in the middle.'),
            step(W.sent('a quiet place &middot; free books &middot; computers'), 'Ideas that branch out.'),
            step(W.icon('people'), 'Ask family. Think about your own life.')
          ],
          guided: [ideas, ideas],
          check: [ideas, ideas],
          coach: '<p>Make an idea web on paper. Ask the child to talk to one family member and add their ideas too.</p>',
          mistake: '<p>Keeping every idea. Cross out the ones that wander off the topic.</p>' }
      ]
    }, {
      id: 'research', title: 'Research and organizing', sub: 'Good sources, credit, and sorted notes.',
      concepts: [
        { slug: 'reliable', title: 'Check that a source is reliable', exp: ['D1.3'], skill: 'research',
          model: [
            step(W.sent('a book about wetlands by a scientist'), 'An expert. Trust it.'),
            step(W.sent('a post by someone with no name'), 'Who wrote it? Unknown.'),
            step(W.icon('think'), 'Check: who, when, and do other sources agree?')
          ],
          guided: [function () { return reliable(1); }, record],
          check: [function () { return reliable(2); }, record],
          coach: '<p>Use three simple tests: Who made it? When? Do two other sources say the same?</p>',
          mistake: '<p>Copying facts without writing down where they came from. Always record the creator and source.</p>' },
        { slug: 'organize', title: 'Sort notes, then put them in order', exp: ['D1.4'], skill: 'research',
          model: [
            step(W.sent('Food &middot; Home &middot; Body'), 'Headings for the notes.'),
            step(W.sent('lives in a lodge') + ' &rarr; ' + W.tile('Home'), 'Each note under its heading.'),
            step(W.icon('write'), 'Each heading becomes a paragraph.')
          ],
          guided: [sortNotes, orderSteps],
          check: [sortNotes, orderSteps],
          coach: '<p>Write each note on a sticky note and sort them into piles on the table. Then put the piles in order.</p>',
          mistake: '<p>Writing facts in the order they were found. Group them first.</p>' }
      ]
    }],
    practice: [
      { id: 'plan', name: 'Purpose, audience and ideas', code: 'D1.1, D1.2', gen: formFit },
      { id: 'research', name: 'Research and organizing', code: 'D1.3, D1.4', gen: reliable }
    ],
    tasks: [
      { id: 'my-tools', title: 'What helped me plan?', code: 'D1.5', pic: W.icon('star'), say: 'Which planning tool helped you most? Why?',
        run: ['After planning a piece of writing, lay out the tools used: idea web, notes, headings, outline, talking it through.', 'The child explains which ones helped most, and how they made the writing better.'],
        rubric: ['Cannot name a tool yet.', 'Names a tool with help.', 'Names two tools and how they helped.', 'Explains how the tools helped and what they will use next time.'] }
    ]
  });

  Q.shapes('planning', {
    plan: [[1, 'purpose', purposeOf], [1, 'ideas', ideas], [2, 'match', matchPurpose]],
    research: [[1, 'record', record], [1, 'sort', sortNotes], [1, 'order', orderSteps]]
  });
})();
