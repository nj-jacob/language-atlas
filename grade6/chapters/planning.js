/* Grade 6: planning and research.
   Ontario 2023 Language, Grade 6, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and why a form, genre and medium suit them   D1.2 generating and developing ideas, using various strategies and resources
   D1.3 gathering information from multiple sources, summarizing, checking reliability, and recording the creator and source
   D1.4 classifying and sequencing ideas for the chosen form                       D1.5 (with a grown-up) how strategies and tools helped
   Answer checks: tests/verify/grade6-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var AP = '’';

  /* ---------- purpose, audience and form ---------- */
  var PURPOSE = [['a letter asking the mayor for a skate park', 'to persuade'], ['a report on how glaciers form', 'to inform'], ['a funny story about a lost hamster', 'to entertain'], ['steps for building a birdhouse', 'to explain how']];
  /* [what you want to do, and for whom; the best form; forms that suit it less] */
  var FORM = [['convince the town council to add bike lanes', 'a formal letter', ['a comic strip', 'a poem']], ['teach Grade 1 students to wash their hands', 'an illustrated poster', ['a formal letter', 'a research report']],
    ['share your class trip with families', 'a blog post with photos', ['a memo', 'a formal letter']], ['explain how to set up a tent', 'numbered steps with diagrams', ['a poem', 'an opinion piece']],
    ['tell younger kids a story about kindness', 'a picture book', ['a memo', 'a research report']]];
  /* [the problem, the idea strategy that fits] */
  var STRATEGY = [['You have lots of ideas, but they are a mess.', 'Make an idea web.'], ['You want to know what school was like in the 1970s.', 'Interview a grandparent or Elder.'],
    ['You want to write about feeling included at school.', 'Think about your own experiences, and ask classmates about theirs.'], ['You are stuck for a topic.', 'Brainstorm a list for five minutes without judging.']];

  function purposeOf(lv) {
    var p = R.pick(PURPOSE);
    return Q.one('What is the main <b>purpose</b> of ' + p[0] + '?', p[1], R.some(PURPOSE.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Persuade, inform, entertain, or explain how?', explain: 'Its purpose is <b>' + p[1] + '</b>.', meta: { k: 'g6-purpose-of', piece: p[0] } });
  }
  function bestForm(lv) {
    var f = R.pick(FORM);
    return Q.one('You want to <b>' + f[0] + '</b>. Which form fits best?', f[1], f[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Who is the audience? What is the purpose?',
      hint: 'Match the form to the reader and the job.', explain: '<b>' + f[1] + '</b> suits that audience and purpose.', meta: { k: 'g6-best-form', want: f[0] } });
  }
  function strategy(lv) {
    var s = R.pick(STRATEGY);
    return Q.one('Which strategy would help most?', s[1], R.some(STRATEGY.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.means('think', s[0]), hint: 'What is the problem: too many ideas, too few, or missing facts?', explain: s[1], meta: { k: 'g6-strategy', s: s[0] } });
  }
  function formMatch() {
    var f = R.some(FORM, 3);
    return { q: 'Match each goal to the form that fits best.', type: 'match', pairs: f.map(function (x) { return [x[0], x[1]]; }), hint: 'Think about the audience.', explain: 'The form should suit the purpose and the audience.', meta: { k: 'g6-form-match' } };
  }

  /* ---------- research ---------- */
  /* [a sentence from a source, a note in your own words, a copied note, an off-topic note] */
  var NOTES = [['Beavers are the largest rodents in North America, and their dams can be hundreds of metres long.', 'Beavers: biggest rodents in N. America; dams can be very long.',
    'Beavers are the largest rodents in North America, and their dams can be hundreds of metres long.', 'Beavers are cute.'],
    ['The Rideau Canal, opened in 1832, becomes the world' + AP + 's largest skating rink each winter.', 'Rideau Canal: opened 1832; huge skating rink in winter.',
      'The Rideau Canal, opened in 1832, becomes the world' + AP + 's largest skating rink each winter.', 'I like skating.'],
    ['Monarch butterflies travel up to 4500 km to spend the winter in Mexico.', 'Monarchs: fly up to 4500 km to Mexico for winter.',
      'Monarch butterflies travel up to 4500 km to spend the winter in Mexico.', 'Mexico is hot.']];
  var CITE = ['the author', 'the title', 'the date it was published', 'the website or publisher'];
  var NOCITE = ['the font it used', 'how many pictures it had', 'how you felt reading it', 'how long it took to read'];
  function ownWords(lv) {
    var n = R.pick(NOTES);
    return Q.one('Which is the best <b>note</b>?', n[1], [n[2]].concat(lv > 1 ? [n[3]] : []), { fig: W.sent(n[0]), prompt: 'Short, in your own words, and on topic.',
      hint: 'Copying the whole sentence is not a summary.', explain: n[1], meta: { k: 'g6-own-words', src: n[0] } });
  }
  function citePick() {
    return Q.all('Pick everything you should <b>record</b> about a source.', R.some(CITE, 2), R.some(NOCITE, 2), { hint: 'What would someone need to find it again, and to credit the creator?',
      explain: 'Record the author, title, date and website or publisher.', meta: { k: 'g6-cite' } });
  }
  function copiedTf() {
    var right = R.int(0, 1) === 1, said = right ? 'Credit the creator of every photo or fact I use.' : 'If it is online, I can use it without saying where it came from.';
    return { q: 'True or false?', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Creators deserve credit, and readers need to check sources.', 'Online content belongs to everyone.'], answer: 0 },
      hint: 'Who made it?', explain: 'Always record and credit the creator and the source.', meta: { k: 'g6-copied-tf', said: said } };
  }
  function twoSources() {
    return Q.one('Two sources disagree about a fact. What should you do?', 'Check a third reliable source.', ['Use the one you found first.', 'Leave the fact out of every draft.'], {
      hint: 'How can you find out which is right?', explain: 'Check more reliable sources before you use it.', meta: { k: 'g6-two-sources' } });
  }

  /* ---------- organizing ---------- */
  var SORT = [['eats berries and nuts', 'Food'], ['lives in forests', 'Habitat'], ['sleeps all winter in a den', 'Winter'], ['hunts seals on the ice', 'Food'], ['builds a snow den to have cubs', 'Winter'], ['roams the Arctic sea ice', 'Habitat']];
  var OUTLINE = { 'an opinion piece': ['Opinion: what I think', 'Reason 1, with evidence', 'Reason 2, with evidence', 'Call to action: what the reader should do'],
    'a report': ['Introduction: the topic', 'Section 1, with a subheading', 'Section 2, with a subheading', 'Conclusion: sum it up'],
    'a story': ['Beginning: characters and setting', 'A problem', 'Things get harder', 'The problem is solved'] };
  function sortNote() {
    var s = R.some(SORT, 3).filter(function (x, i, a) { return a.findIndex(function (y) { return y[1] === x[1]; }) === i; });
    if (s.length < 2) s = [SORT[0], SORT[1], SORT[2]];
    return { q: 'Match each note to its heading in a report on bears.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Is it about food, home, or winter?', explain: 'Sort notes into groups before you write.', meta: { k: 'g6-sort' } };
  }
  function outline() {
    var f = R.pick(Object.keys(OUTLINE));
    return { q: 'Put the plan for <b>' + f + '</b> in order.', type: 'order', items: OUTLINE[f], first: 'First', last: 'Last', hint: 'How does this form usually start and end?', explain: OUTLINE[f].join(' &rarr; '), meta: { k: 'g6-outline', form: f } };
  }
  function headingFor(lv) {
    var s = R.pick(SORT);
    return Q.tiles('Which heading does this note go under?', s[1], ['Food', 'Habitat', 'Winter'].filter(function (x) { return x !== s[1]; }).slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(s[0]), hint: 'Food, home, or winter?', explain: '<b>' + s[1] + '</b>', meta: { k: 'g6-heading-for', note: s[0] } });
  }
  function callToAction() {
    return Q.one('Where does a <b>call to action</b> go in an opinion piece?', 'At the end', ['At the very start', 'In the middle of a reason'], {
      hint: 'You tell the reader what to do after you have convinced them.', explain: 'At the end: what the reader should do now.', meta: { k: 'g6-call-to-action' } });
  }

  Atlas.register('planning', {
    lessons: [{
      id: 'purpose', title: 'Purpose, audience and form', sub: 'Decide why, for whom, and in what form.',
      concepts: [
        { slug: 'purpose', title: 'Why am I writing?', exp: ['D1.1'], skill: 'purpose-form',
          model: [
            step(W.means('write', 'a letter asking for a skate park'), 'To persuade.'),
            step(W.means('write', 'a report on glaciers'), 'To inform.'),
            step(W.means('write', 'steps for a birdhouse'), 'To explain how.')
          ],
          guided: [function () { return purposeOf(1); }, function () { return purposeOf(1); }],
          check: [function () { return purposeOf(2); }, function () { return purposeOf(2); }],
          coach: '<p>Before any writing, have the child say in one sentence: "I am writing to ___ so that ___ will ___."</p>',
          mistake: '<p>Starting to write before deciding the purpose. The purpose shapes everything else.</p>' },
        { slug: 'form', title: 'Choose a form that suits the reader', exp: ['D1.1'], skill: 'purpose-form',
          model: [
            step(W.means('people', 'the town council'), 'A formal letter.'),
            step(W.means('people', 'Grade 1 students'), 'An illustrated poster.'),
            step(W.means('people', 'families'), 'A blog post with photos.')
          ],
          guided: [function () { return bestForm(1); }, formMatch],
          check: [function () { return bestForm(2); }, formMatch],
          coach: '<p>Ask: "Who will read this, and how would they like to get it?" Paper, screen, spoken, pictures?</p>',
          mistake: '<p>Using the same form for every audience.</p>' },
        { slug: 'ideas', title: 'Ways to get ideas', exp: ['D1.2'], skill: 'purpose-form',
          model: [
            step(W.means('think', 'Too many ideas?'), 'An idea web.'),
            step(W.means('people', 'Need facts from the past?'), 'Interview someone who was there.'),
            step(W.means('star', 'Stuck?'), 'Brainstorm for five minutes.')
          ],
          guided: [function () { return strategy(1); }, function () { return strategy(1); }],
          check: [function () { return strategy(2); }, function () { return strategy(2); }],
          coach: '<p>The child’s own life is a rich source: family stories, languages spoken at home, places they know.</p>',
          mistake: '<p>Waiting for the perfect idea. Get many ideas first, then choose.</p>' }
      ]
    }, {
      id: 'research', title: 'Research', sub: 'Gather, sum up, check and credit.',
      concepts: [
        { slug: 'notes', title: 'Notes in your own words', exp: ['D1.3'], skill: 'research',
          model: [
            step(W.sent(NOTES[0][0]), 'The source.'),
            step(W.sent('Beavers: biggest rodents in N. America; dams can be very long.'), 'Short, in my own words.')
          ],
          guided: [function () { return ownWords(1); }, twoSources],
          check: [function () { return ownWords(2); }, twoSources],
          coach: '<p>Read a paragraph, close the book, then write the note. That makes copying impossible.</p>',
          mistake: '<p>Copying whole sentences. Notes are short and in your own words.</p>' },
        { slug: 'credit', title: 'Record the source', exp: ['D1.3'], skill: 'research',
          model: [
            step(W.means('read', 'author, title, date, website'), 'Write these down for every source.'),
            step(W.means('people', 'photo by Mei Chen'), 'Photos and images need credit too.')
          ],
          guided: [citePick, copiedTf],
          check: [citePick, copiedTf],
          coach: '<p>Keep a simple source list as you research: author, title, date, website.</p>',
          mistake: '<p>Forgetting where a fact came from. Write the source next to every note.</p>' }
      ]
    }, {
      id: 'organize', title: 'Organizing ideas', sub: 'Sort your notes, then put them in order.',
      concepts: [
        { slug: 'sort', title: 'Sort notes into groups', exp: ['D1.4'], skill: 'organize',
          model: [
            step(W.sent('eats berries and nuts') + W.sent('hunts seals on the ice'), 'Both about <b>Food</b>.'),
            step(W.sent('lives in forests'), '<b>Habitat</b>.')
          ],
          guided: [function () { return headingFor(1); }, sortNote],
          check: [function () { return headingFor(2); }, sortNote],
          coach: '<p>Write notes on separate slips of paper, then physically sort them into piles.</p>',
          mistake: '<p>Writing notes in the order they were found, instead of grouping them.</p>' },
        { slug: 'outline', title: 'Order ideas to fit the form', exp: ['D1.4'], skill: 'organize',
          model: [
            step(W.sent('Opinion &rarr; Reason 1 &rarr; Reason 2 &rarr; Call to action'), 'An opinion piece.'),
            step(W.sent('Introduction &rarr; Sections &rarr; Conclusion'), 'A report.')
          ],
          guided: [outline, callToAction],
          check: [outline, outline],
          coach: '<p>Make the outline together first. Writing goes faster when the order is decided.</p>',
          mistake: '<p>Putting the strongest reason first and running out of steam. Save one strong reason for the end.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose-form', name: 'Purpose, audience and form', code: 'D1.1, D1.2', gen: bestForm },
      { id: 'research', name: 'Research and notes', code: 'D1.3', gen: ownWords },
      { id: 'organize', name: 'Organizing ideas', code: 'D1.4', gen: headingFor }
    ],
    tasks: [
      { id: 'idea-web', title: 'An idea web', code: 'D1.2', pic: W.icon('think'), say: 'Make an idea web about a topic that matters to you, like fairness or inclusion.', write: true,
        run: ['Help the child pick a topic, perhaps about diversity, fairness or inclusion, or from science or social studies.', 'Put the topic in the middle of a page. Add branches: what I know, what I have lived, what I want to find out, who I could ask.'],
        rubric: ['A few ideas, not connected.', 'Several ideas with some branches.', 'A full web with ideas from experience and other sources.', 'A rich web, with ideas developed into details and questions.'] },
      { id: 'research-notes', title: 'Research notes with sources', code: 'D1.3', pic: W.icon('read'), say: 'Find three sources on your topic. Take notes and record each source.', write: true,
        run: ['Choose a topic linked to another subject. Find three sources, at least one a book.', 'For each: short notes in the child’s own words, and a record of author, title, date and website or publisher.', 'Check: do the sources agree? Are they reliable?'],
        rubric: ['Copied notes, no sources.', 'Some own-word notes, sources incomplete.', 'Own-word notes from three sources, all recorded.', 'Clear notes, sources recorded, and reliability checked and explained.'] },
      { id: 'planning-reflect', title: 'What helped me plan?', code: 'D1.5', pic: W.icon('star'), say: 'Which planning tool helped you most? How has it made you a better writer?',
        run: ['After planning two pieces (for example, an idea web for one and an outline for the other), ask which tool helped more and why.', 'Ask: "How has planning changed your writing?"'],
        rubric: ['Cannot say yet.', 'Names a tool with help.', 'Compares two tools and explains which helped.', 'Explains in detail how the tools improved their writing.'] }
    ]
  });

  Q.shapes('planning', {
    'purpose-form': [[1, 'purpose', purposeOf], [1, 'strategy', strategy], [2, 'match', formMatch]],
    research: [[1, 'cite', citePick], [1, 'true-false', copiedTf], [1, 'two-sources', twoSources]],
    organize: [[1, 'sort', sortNote], [1, 'outline', outline], [2, 'call-to-action', callToAction]]
  });
})();
