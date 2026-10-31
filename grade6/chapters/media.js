/* Grade 6: media and online life.
   Ontario 2023 Language, Grades 4 to 6, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online, with permission; digital identity     A2.2 online safety, privacy and personal data, well-being
   A2.3 gathering and evaluating information: validity, credibility, accuracy, perspectives
   A2.4 forms, conventions and techniques of digital and media texts, and their impact on the audience
   A2.5 form, message, context, audience and purpose                             A2.6 digital and media tools in the design process
   A2.7 communicating and collaborating online in a safe, respectful, inclusive way, with cultural awareness
   All examples (including the ads and posts) are made up for this site. Answer checks: tests/verify/grade6-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var AP = '’';

  /* ---------- digital citizenship and safety ---------- */
  var PRIVATE = ['your home address', 'your password', 'your exact location', 'your birth date and full name'];
  var SHAREABLE = ['your favourite book', 'a drawing of a landscape', 'your opinion about a movie'];
  /* [what happens, the best thing to do, other choices] */
  var SAFE = [['A free game asks to see your location and contacts.', 'Say no, or check with a grown-up first.', ['Allow everything so the game works.', 'Allow it now and change it later.']],
    ['A message says you won a phone. Click the link to claim it!', 'Do not click. Delete it, and tell a grown-up.', ['Click fast before it expires.', 'Send it to friends so they can win too.']],
    ['A classmate asks you to share a funny photo of another student.', 'Do not share it without that student' + AP + 's permission.', ['Share it. It is only a joke.', 'Post it, then delete it later.']],
    ['Someone in a game chat keeps sending you mean messages.', 'Block them, save the messages, and tell a trusted adult.', ['Send mean messages back.', 'Keep reading them.']],
    ['You need a new password.', 'Use a long passphrase that only you and your grown-ups know.', ['Use your pet' + AP + 's name.', 'Use 1234 so you will not forget it.']]];
  /* posts that help or harm your digital identity */
  var HELPS = ['A video of you explaining your science fair project', 'A kind comment congratulating a classmate', 'A photo of a mural you painted, posted with permission'];
  var HARMS = ['A post making fun of someone' + AP + 's clothes', 'An angry rant about your teacher', 'A photo of a friend posted without asking'];
  /* [what happens, the respectful and inclusive response, other choices] */
  var RESPECT = [['In a class video call, someone shares a tradition from their culture.', 'Thank them, and ask a respectful question.', ['Say it sounds weird.', 'Turn off your camera and ignore it.']],
    ['Your group chat makes a plan but leaves out a new student.', 'Invite the new student to join.', ['Keep them out. It is easier.', 'Start a second chat about them.']],
    ['Someone in the chat is still learning English.', 'Be patient, and use simple, clear words.', ['Tell them to stop writing.', 'Ignore their messages.']]];

  function privateData() {
    return Q.all('Pick every piece of <b>personal data</b> to keep private online.', R.some(PRIVATE, 2), R.some(SHAREABLE, 2), { hint: 'Could someone use it to find you or pretend to be you?',
      explain: 'Keep private: your address, password, location, and birth date with your full name.', meta: { k: 'g6-private' } });
  }
  function whatToDo(lv) {
    var s = R.pick(SAFE);
    return Q.one('What is the best thing to do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', s[0]), prompt: 'Is it safe? Is it fair? Is there permission?',
      hint: 'Protect yourself and others. Ask a grown-up when unsure.', explain: s[1], meta: { k: 'g6-what-to-do', s: s[0] } });
  }
  function footprint() {
    var helps = R.int(0, 1) === 1, p = R.pick(helps ? HELPS : HARMS);
    return { q: 'Does this post help or harm your <b>digital identity</b>?', fig: W.means('screen', p), type: 'tap', tiles: ['helps', 'harms'], answer: helps ? 0 : 1,
      hint: 'Would you be proud if a future coach or employer saw it?', explain: helps ? 'It shows you in a good light.' : 'It could hurt someone and follow you for years.', meta: { k: 'g6-footprint', p: p } };
  }
  function respectful(lv) {
    var r = R.pick(RESPECT);
    return Q.one('What is the most respectful thing to do?', r[1], r[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', r[0]), hint: 'How would you want to be treated?',
      explain: r[1], meta: { k: 'g6-respectful', s: r[0] } });
  }

  /* ---------- checking information ---------- */
  var WARN = ['no author or date', 'lots of pop-up ads', 'many spelling mistakes', 'headlines in ALL CAPS'];
  var TRUST = ['an author who is an expert', 'sources listed for its facts', 'updated recently'];
  /* [what you see online, the best first check, other choices] */
  var CLAIM = [['A post says: "Scientists say eating snow makes you smarter!"', 'Check if trusted sources report the same thing.', ['Share it. It sounds scientific.', 'Believe it because it has many likes.']],
    ['A photo shows a moose riding a city bus.', 'Search for the photo to see where it first appeared.', ['Share it with everyone right away.', 'Believe it because photos cannot be changed.']],
    ['A video claims a new law bans homework in Ontario.', 'Look for the news on the Ontario government site or a trusted news source.', ['Believe it because it is a video.', 'Post that you will skip homework.']]];
  function warnSigns() {
    return Q.all('Pick every sign that a website might <b>not</b> be reliable.', R.some(WARN, 2), R.some(TRUST, 2), { hint: 'What would a careful expert never do?',
      explain: 'Warning signs: no author or date, pop-ups, spelling mistakes, shouting headlines.', meta: { k: 'g6-warn' } });
  }
  function checkClaim(lv) {
    var c = R.pick(CLAIM);
    return Q.one('What should you do first?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', c[0]), prompt: 'Do other trusted sources say the same?',
      hint: 'Leave the page and check elsewhere.', explain: c[1], meta: { k: 'g6-check-claim', s: c[0] } });
  }
  function likesTf() {
    var right = R.int(0, 1) === 1, said = right ? 'A post can have a million likes and still be false.' : 'If a post has lots of likes, it must be true.';
    return { q: 'True or false?', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Likes show what is popular, not what is accurate.', 'Popular posts are checked by experts.'], answer: 0 },
      hint: 'Do likes prove anything is true?', explain: 'Likes measure popularity, not truth.', meta: { k: 'g6-likes', said: said } };
  }

  function trustPick() {
    return Q.all('Pick every sign that a website is <b>more likely</b> to be reliable.', R.some(TRUST, 2), R.some(WARN, 2), { hint: 'What would a careful expert do?',
      explain: 'Good signs: an expert author, sources listed, recently updated.', meta: { k: 'g6-trust' } });
  }

  /* ---------- media techniques, audience and design ---------- */
  /* [technique, an example, what it does to the audience] */
  var TECH = [['bandwagon', 'Everyone is getting one!', 'makes you want to fit in'], ['a celebrity', 'A famous hockey player holds the drink.', 'makes you trust it because you like the star'],
    ['a limited-time offer', 'Only 2 days left!', 'makes you hurry before you think'], ['a close-up shot', 'The camera zooms in on a crying face.', 'makes you feel strong emotion'],
    ['upbeat music', 'Happy music plays over the ad.', 'makes the product feel fun']];
  /* [media text, its audience, its purpose] */
  var AUD = [['a cartoon cereal ad during weekend morning shows', 'children', 'to sell cereal'], ['a video about wearing seat belts', 'drivers and passengers', 'to keep people safe'],
    ['a flyer for a seniors' + AP + ' yoga class', 'older adults', 'to get people to join'], ['a trailer for an animated movie', 'families with children', 'to get people to see the movie']];
  var DESIGN = ['Define the problem and who it is for.', 'Brainstorm and sketch ideas.', 'Build a first version.', 'Test it and get feedback.', 'Improve it.'];
  var TOOLS = [['make slides for a talk', 'presentation software'], ['record an interview', 'a voice recorder app'], ['plan a video shot by shot', 'a storyboard'], ['collect survey answers from classmates', 'an online form']];
  function technique(lv) {
    var t = R.pick(TECH);
    return Q.one('Which technique is this?', t[0], R.some(TECH.filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      fig: W.means('screen', t[1]), hint: 'What trick is the ad using?', explain: '<b>' + t[0] + '</b>: it ' + t[2] + '.', meta: { k: 'g6-technique', ex: t[1] } });
  }
  function techMatch() {
    var t = R.some(TECH, 3);
    return { q: 'Match each technique to its effect on the audience.', type: 'match', pairs: t.map(function (x) { return [x[0], x[2]]; }), hint: 'How does each one make you feel?', explain: 'Media creators choose techniques on purpose.', meta: { k: 'g6-tech-match' } };
  }
  function audience(lv) {
    var a = R.pick(AUD);
    return Q.one('Who is the main audience for <b>' + a[0] + '</b>?', a[1], R.some(AUD.filter(function (x) { return x !== a; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Where and when does it appear? Who is shown in it?', explain: '<b>' + a[1] + '</b>, ' + a[2] + '.', meta: { k: 'g6-audience', text: a[0] } });
  }
  function designOrder() {
    return { q: 'Put the steps of the design process in order.', type: 'order', items: DESIGN, first: 'First', last: 'Last', hint: 'You cannot test something before you build it.', explain: DESIGN.join(' &rarr; '), meta: { k: 'g6-design-order' } };
  }
  function toolFor() {
    var t = R.pick(TOOLS);
    return Q.one('Which tool fits best to <b>' + t[0] + '</b>?', t[1], R.some(TOOLS.filter(function (x) { return x !== t; }), 2).map(function (x) { return x[1]; }), {
      hint: 'What is each tool made for?', explain: '<b>' + t[1] + '</b>', meta: { k: 'g6-tool-for', task: t[0] } });
  }

  Atlas.register('media', {
    lessons: [{
      id: 'citizen', title: 'Digital citizenship', sub: 'Rights, responsibilities, privacy and respect online.',
      concepts: [
        { slug: 'privacy', title: 'Protect your personal data', exp: ['A2.2'], skill: 'citizenship',
          model: [
            step(W.means('lock', 'address, password, location, birth date'), 'Private.'),
            step(W.means('screen', 'An app wants your contacts.'), 'Say no, or ask a grown-up.'),
            step(W.means('screen', 'You won a phone! Click here!'), 'A trick. Do not click.')
          ],
          guided: [privateData, function () { return whatToDo(1); }],
          check: [privateData, function () { return whatToDo(2); }],
          coach: '<p>Look at the privacy settings on a device or app together. Talk about what each setting shares.</p>',
          mistake: '<p>Thinking only strangers matter. Apps and companies collect data too.</p>' },
        { slug: 'identity', title: 'Your digital identity', exp: ['A2.1'], skill: 'citizenship',
          model: [
            step(W.means('star', 'a video about your science project'), 'Helps.'),
            step(W.means('not', 'a post making fun of someone'), 'Harms, and it can last for years.'),
            step(W.means('people', 'a photo of a friend'), 'Ask first. They have a right to say no.')
          ],
          guided: [footprint, footprint],
          check: [footprint, function () { return whatToDo(2); }],
          coach: '<p>Search the child’s name together (with care). Talk about what you would want people to find.</p>',
          mistake: '<p>Believing deleted posts disappear. Others may have saved them.</p>' },
        { slug: 'respect', title: 'Respectful and inclusive online', exp: ['A2.7'], skill: 'citizenship',
          model: [
            step(W.means('people', 'someone shares a tradition'), 'Thank them. Ask a respectful question.'),
            step(W.means('people', 'a new student is left out'), 'Invite them in.')
          ],
          guided: [function () { return respectful(1); }, function () { return respectful(1); }],
          check: [function () { return respectful(2); }, function () { return respectful(2); }],
          coach: '<p>Before sending a message, read it as if you were the one receiving it.</p>',
          mistake: '<p>Typing things you would never say face to face.</p>' }
      ]
    }, {
      id: 'info', title: 'Checking information', sub: 'Is it accurate, and who made it?',
      concepts: [
        { slug: 'check', title: 'Check before you share', exp: ['A2.3'], skill: 'info',
          model: [
            step(W.means('screen', 'Eating snow makes you smarter!'), 'A surprising claim.'),
            step(W.means('read', 'Do trusted sources say so?'), 'Leave the page. Look elsewhere.'),
            step(W.means('not', 'No trusted source agrees.'), 'Do not share it.')
          ],
          guided: [function () { return checkClaim(1); }, warnSigns],
          check: [function () { return checkClaim(2); }, likesTf],
          coach: '<p>Practise "lateral reading": open a new tab and see what others say about the source.</p>',
          mistake: '<p>Judging a site by how professional it looks.</p>' }
      ]
    }, {
      id: 'messages', title: 'Media messages', sub: 'Techniques, audiences, and making your own.',
      concepts: [
        { slug: 'techniques', title: 'Techniques that persuade', exp: ['A2.4'], skill: 'media-messages',
          model: [
            step(W.means('screen', 'Everyone is getting one!'), '<b>Bandwagon</b>: you want to fit in.'),
            step(W.means('screen', 'Only 2 days left!'), 'A <b>limited-time offer</b>: you hurry.'),
            step(W.means('screen', 'The camera zooms in on a face.'), 'A <b>close-up</b>: you feel it.')
          ],
          guided: [function () { return technique(1); }, techMatch],
          check: [function () { return technique(2); }, techMatch],
          coach: '<p>Watch ads together and play "spot the technique".</p>',
          mistake: '<p>Thinking you are not influenced by ads. Everyone is; noticing the technique helps.</p>' },
        { slug: 'audience', title: 'Audience and purpose', exp: ['A2.5'], skill: 'media-messages',
          model: [
            step(W.means('screen', 'a cartoon cereal ad on weekend mornings'), 'Audience: children. Purpose: to sell.'),
            step(W.means('screen', 'a seat belt video'), 'Audience: drivers. Purpose: to keep people safe.')
          ],
          guided: [function () { return audience(1); }, function () { return audience(1); }],
          check: [function () { return audience(2); }, function () { return audience(2); }],
          coach: '<p>Ask three questions about any media text: Who made it? Who is it for? What does it want?</p>',
          mistake: '<p>Assuming every media text is for everyone.</p>' },
        { slug: 'design', title: 'The design process', exp: ['A2.6'], skill: 'media-messages',
          model: [
            step(W.means('think', 'Define the problem'), 'Who is it for?'),
            step(W.means('write', 'Sketch, then build'), 'A first version.'),
            step(W.means('again', 'Test, then improve'), 'Again and again.')
          ],
          guided: [designOrder, toolFor],
          check: [designOrder, toolFor],
          coach: '<p>Small projects work best: a poster for a family event, or a short how-to video.</p>',
          mistake: '<p>Skipping testing. Feedback is how designs get better.</p>' }
      ]
    }],
    practice: [
      { id: 'citizenship', name: 'Digital citizenship', code: 'A2.1, A2.2, A2.7', gen: whatToDo },
      { id: 'info', name: 'Checking information', code: 'A2.3', gen: checkClaim },
      { id: 'media-messages', name: 'Media messages', code: 'A2.4, A2.5, A2.6', gen: technique }
    ],
    tasks: [
      { id: 'make-psa', title: 'Make a public service message', code: 'A2.6', pic: W.icon('screen'), say: 'Design a short poster or video that helps people stay safe online.',
        run: ['Follow the design process: define who it is for, sketch, build, test it with a family member, improve it.', 'Use a simple tool: paper, slides, or a phone video.', 'Ask: "Which technique did you use, and how will it affect your audience?"'],
        rubric: ['Unfinished, no clear audience.', 'A product, with little testing.', 'A clear product, tested and improved.', 'A well-designed product that suits its audience, with choices explained.'] },
      { id: 'ad-analysis', title: 'Take apart an ad', code: 'A2.4', pic: W.icon('screen'), say: 'Choose a real ad. Name its audience, its purpose, and two techniques.', write: true,
        run: ['Choose an ad from TV, a website, or a magazine.', 'The child writes: who it is for, what it wants, two techniques, and how each one might affect the audience.'],
        rubric: ['Describes the ad only.', 'Names the audience or purpose.', 'Names audience, purpose and two techniques.', 'Explains how the techniques affect the audience, with evidence.'] }
    ]
  });

  Q.shapes('media', {
    citizenship: [[1, 'private', privateData], [1, 'footprint', footprint], [1, 'respect', respectful]],
    info: [[1, 'warn', warnSigns], [1, 'likes', likesTf], [2, 'trust', trustPick]],
    'media-messages': [[1, 'match', techMatch], [1, 'audience', audience], [1, 'design', designOrder], [2, 'tool', toolFor]]
  });
})();
