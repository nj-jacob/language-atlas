/* Grade 8: media and digital literacy.
   Ontario 2023 Language, Grade 8, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online, with permission; digital identity          A2.2 privacy, personal data, security and well-being
   A2.3 research: accuracy, credibility, misinformation, disinformation, curated information; legal and ethical use
   A2.4 forms, conventions and techniques of media texts, and their impact             A2.5 form, message, context, intended and unintended audience, purpose
   A2.6 digital and media tools in the design process; innovative solutions             A2.7 safe, respectful, inclusive collaboration; cultural awareness
   All messages, ads and people are made up for this site. Answer checks: tests/verify/grade8-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* posts that build a digital identity you would be proud of, and posts that do not */
  var PROUD = ['a video of your band' + AP + 's first concert', 'a photo of the mural your class painted', 'a thank-you post to your hockey coach', 'a link to your science fair project'];
  var REGRET = ['a mean joke about a classmate', 'a photo of a friend, posted without asking', 'a rumour about a teacher', 'an angry rant about your neighbour'];
  /* [a statement, true or not] */
  var RIGHTS = [['Before posting a group photo, ask everyone in it.', true], ['Deleting a post means no one can ever see it again.', false],
    ['You have the right to ask a friend to take down a photo of you.', true], ['If a photo is of you, you may post it without asking anyone else in it.', false]];
  var SCAM = ['URGENT: Your account will be closed in 24 hours!', 'Click here and enter your password to keep it:', 'www.streambox-secure-login.biz'];
  var SIGNS = ['It rushes you to act now.', 'It asks for your password.', 'The link does not match the real website.', 'It threatens to close your account.'];
  var NOSIGNS = ['It is written in English.', 'It arrived in the afternoon.', 'It uses full sentences.'];
  var PASSWORDS = ['password123', 'Amira2013', 'qwertyuiop', 'hockey', 'iloveyou'];
  /* long passphrases, with a line-break point after each symbol so they fit a phone screen */
  var PHRASES = ['Maple-Canoe-Drizzle-47!', 'Purple#Otter#Snow#82', 'Lantern+Moose+Rain+19'].map(function (p) { return p.replace(/([^A-Za-z0-9])/g, '$1<wbr>'); });

  /* [what happened, the kind of information] */
  var INFO = [['Your aunt shares a post about schools closing for a storm, not knowing it is false.', 'misinformation'],
    ['A company writes fake reviews of its own blender to fool buyers.', 'disinformation'],
    ['A video app shows you more skateboarding videos because you watched one.', 'curated information'],
    ['A student repeats a wrong date from an old textbook, believing it is right.', 'misinformation'],
    ['Someone edits a flood photo on purpose to make people panic.', 'disinformation'],
    ['Your news feed shows only stories that match what you already like.', 'curated information']];
  var KINDS = ['misinformation', 'disinformation', 'curated information'];
  var CHECK = ['Stop before you share it.', 'Find out who made it.', 'Look for the claim in other reliable sources.', 'Decide whether to trust it.'];
  /* [an online situation, the legal and ethical choice, other choices] */
  var ETHICS = [['You want to use a photo you found online in your project.', 'Check that you may use it, and credit the photographer.', ['Use it; everything online is free.', 'Use it and crop out the photographer' + AP + 's name.']],
    ['You want a song in the background of your video.', 'Use music you have permission to use, and credit it.', ['Use any song; it is only a school video.', 'Use a popular song and hope no one notices.']],
    ['You found a perfect paragraph for your report.', 'Put the idea in your own words and cite the source.', ['Copy it; the teacher will not check.', 'Change a few words and leave out the source.']]];
  var FEED = [['An app' + AP + 's algorithm chooses what shows up in your feed.', true], ['Your feed shows everything that was posted, in order.', false],
    ['Two people can search the same words and see different results.', true], ['A video with many views must be true.', false]];

  /* [an ad line, the technique] */
  var TECH = [['Everyone at Lakeview School already has one. Don' + AP + 't be left out!', 'bandwagon'],
    ['Olympic swimmer Maya Clarke says: "I drink HydraFuel before every race."', 'testimonial'],
    ['Only 50 left. The sale ends tonight!', 'scarcity'],
    ['This winter, a lonely puppy is waiting for you to bring it home.', 'emotional appeal'],
    ['9 out of 10 dentists recommend BrightBite toothpaste.', 'expert statistic']];
  var TECHS = ['bandwagon', 'testimonial', 'scarcity', 'emotional appeal', 'expert statistic'];
  /* [a media text, its intended audience, a likely unintended audience] */
  var AUD = [['a joke about a teacher in a private group chat', 'the friends in the chat', 'the teacher, after someone shares a screenshot'],
    ['a dance video posted for your friends', 'your friends', 'a future employer who searches your name'],
    ['a student council campaign poster in the hallway', 'students who will vote', 'parents visiting for a concert'],
    ['a cereal ad during a Saturday cartoon', 'young children', 'parents who will be asked to buy it']];
  /* [a media text, its main purpose] */
  var PURPOSE = [['a public service ad about wearing a bike helmet', 'to persuade'], ['an evening weather report', 'to inform'],
    ['a comedy sketch on a family channel', 'to entertain'], ['a poster for a shoe store sale', 'to sell']];

  var DESIGN = ['Understand the users and their problem.', 'Brainstorm many possible solutions.', 'Build a prototype, a first version.', 'Test it with real users.', 'Improve it using their feedback.'];
  /* [a job, the tool that suits it] */
  var TOOLS = [['show how bus ridership changed over a year', 'a chart made in a spreadsheet'], ['tell a story with voices and sound effects', 'a podcast recording app'],
    ['plan the layout of a website', 'a wireframe sketch'], ['give a talk with pictures to the class', 'a slide presentation']];
  /* [a group-work moment online, the respectful choice, other choices] */
  var RESPECT = [['A teammate' + AP + 's idea is different from yours.', 'Say what you like about it, then add your idea.', ['Ignore it and post your own.', 'Reply with an eye-roll emoji.']],
    ['One person in the group chat has not said anything.', 'Invite them to share their idea.', ['Carry on without them.', 'Tell the others they are lazy.']],
    ['A classmate who is learning English makes spelling mistakes.', 'Respond to their idea, not their spelling.', ['Post their mistakes for a laugh.', 'Correct every word in the chat.']],
    ['A video you were sent mocks a culture.', 'Do not share it, and say why it is hurtful.', ['Share it; it is only a joke.', 'Send it to one friend only.']]];
  var AWARE = ['Learn how to say a classmate' + AP + 's name correctly.', 'Ask before using a cultural symbol in your design.', 'Include people of different backgrounds in your examples.'];
  var UNAWARE = ['Use a stereotype for a laugh.', 'Copy a sacred design for a team logo.', 'Give a classmate a nickname because their name is hard.'];

  /* ---------- question makers: rights and safety ---------- */
  function identity(lv) {
    return Q.one('Which post builds a digital identity you would be proud of in five years?', R.pick(PROUD), R.some(REGRET, lv > 1 ? 3 : 2), {
      prompt: 'Who could see this later? Would you still be proud?', hint: 'Posts can last forever, and anyone may see them.', explain: 'Everything you post becomes part of your digital identity.', meta: { k: 'g8-identity' } });
  }
  function rightsTf() {
    var r = R.pick(RIGHTS);
    return { q: Q.name() + ' says:', fig: W.sent(r[0]), type: 'tf', answer: r[1],
      why: { options: ['People have a right to decide what is shared about them, and posts can be copied.', 'What you post is only your business.'], answer: 0 },
      hint: 'Think about the rights of other people in the photo, and about screenshots.', explain: 'Ask permission, and remember screenshots last.', meta: { k: 'g8-rights-tf', said: r[0] } };
  }
  function phishing() {
    return Q.all('Pick every <b>warning sign</b> that this message is a scam.', R.some(SIGNS, R.int(2, 3)), R.some(NOSIGNS, 2), { fig: W.passage('', SCAM),
      hint: 'Scams rush you, scare you, and ask for private details.', explain: 'Real companies never ask for your password in a message.', meta: { k: 'g8-phishing' } });
  }
  function password(lv) {
    return Q.one('Which password is the <b>strongest</b>?', R.pick(PHRASES), R.some(PASSWORDS, lv > 1 ? 3 : 2), {
      hint: 'Long, with words, numbers and symbols, and nothing about you.', explain: 'A long passphrase of random words, numbers and symbols is hardest to guess.', meta: { k: 'g8-password' } });
  }

  /* ---------- question makers: information ---------- */
  function infoKind(lv) {
    var x = R.pick(INFO);
    return Q.one('What kind of information is this?', x[1], KINDS.filter(function (k) { return k !== x[1]; }).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(x[0]),
      prompt: 'Is it false? Did they mean to fool you? Or did an app choose it?', hint: 'Misinformation is a mistake. Disinformation is on purpose. Curated means chosen for you.',
      explain: 'This is <b>' + x[1] + '</b>.', meta: { k: 'g8-info-kind', s: x[0] } });
  }
  function matchInfo() {
    var picks = KINDS.map(function (k) { return R.pick(INFO.filter(function (x) { return x[1] === k; })); });
    return { q: 'Match each example to the kind of information.', type: 'match', pairs: picks.map(function (x) { return [x[0], x[1]]; }),
      hint: 'A mistake, a trick, or chosen by an app?', explain: 'Each kind needs a different kind of care.', meta: { k: 'g8-match-info' } };
  }
  function checkOrder() {
    return { q: 'You see a shocking claim online. Put the steps in order.', type: 'order', items: CHECK.slice(), first: 'First', last: 'Last',
      hint: 'Pause first. Decide last.', explain: 'Stop, find who made it, look elsewhere, then decide.', meta: { k: 'g8-check-order' } };
  }
  function ethics(lv) {
    var e = R.pick(ETHICS);
    return Q.one('What is the legal and fair thing to do?', e[1], e[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', e[0]),
      hint: 'Creators own their work. Ask, credit or cite.', explain: e[1], meta: { k: 'g8-ethics', s: e[0] } });
  }
  function feedTf() {
    var f = R.pick(FEED);
    return { q: 'True or false?', fig: W.sent(f[0]), type: 'tf', answer: f[1],
      why: { options: ['Algorithms choose what each person sees, based on what they clicked.', 'Everyone online sees the same things.'], answer: 0 },
      hint: 'Who decides what shows up on your screen?', explain: 'Apps curate what you see, so look beyond your feed.', meta: { k: 'g8-feed-tf', said: f[0] } };
  }

  /* ---------- question makers: techniques and audience ---------- */
  function technique(lv) {
    var t = R.pick(TECH);
    return Q.one('Which technique does this ad use?', t[1], R.some(TECHS.filter(function (x) { return x !== t[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(t[0]),
      prompt: 'Does it use a crowd, a star, a deadline, a feeling, or numbers?', hint: 'Ask: how is it trying to get me to act?', explain: 'This is <b>' + t[1] + '</b>.', meta: { k: 'g8-technique', s: t[0] } });
  }
  function matchTechnique() {
    var t = R.some(TECH, 3);
    return { q: 'Match each ad line to its technique.', type: 'match', pairs: t.map(function (x) { return [x[0], x[1]]; }), hint: 'Crowd, star, deadline, feeling, or numbers?',
      explain: 'Naming the technique takes away its power.', meta: { k: 'g8-match-technique' } };
  }
  function audience() {
    var a = R.pick(AUD), unintended = R.int(0, 1) === 1;
    return Q.one('Who is the <b>' + (unintended ? 'unintended' : 'intended') + '</b> audience?', unintended ? a[2] : a[1], [unintended ? a[1] : a[2]], { fig: W.means('people', a[0]),
      hint: 'Intended: who it was made for. Unintended: who might see it anyway.', explain: 'Made for ' + a[1] + '; might reach ' + a[2] + '.', meta: { k: 'g8-audience', s: a[0], un: unintended } });
  }
  function purpose() {
    var p = R.pick(PURPOSE);
    return Q.tiles('What is the main purpose of <b>' + p[0] + '</b>?', p[1], PURPOSE.filter(function (x) { return x !== p; }).map(function (x) { return x[1]; }), {
      hint: 'Is it trying to make you think, know, laugh or buy?', explain: p[0] + ': <b>' + p[1] + '</b>.', meta: { k: 'g8-media-purpose', s: p[0] } });
  }

  /* ---------- question makers: create and collaborate ---------- */
  function design() {
    return { q: 'Put the design process in order.', type: 'order', items: DESIGN.slice(), first: 'First', last: 'Last',
      hint: 'Understand first. Improve last.', explain: 'Understand, brainstorm, build, test, improve.', meta: { k: 'g8-design' } };
  }
  function matchTool() {
    var t = R.some(TOOLS, 3);
    return { q: 'Match each job to the tool that suits it.', type: 'match', pairs: t.map(function (x) { return [x[0], x[1]]; }), hint: 'Numbers, sound, layout, or a talk?',
      explain: 'Choose the tool that fits the message and the audience.', meta: { k: 'g8-match-tool' } };
  }
  function respect(lv) {
    var r = R.pick(RESPECT);
    return Q.one('What is the respectful thing to do?', r[1], r[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', r[0]),
      prompt: 'Is it kind? Is it fair? Does everyone belong?', hint: 'Treat people online the way you would face to face.', explain: r[1], meta: { k: 'g8-respect', s: r[0] } });
  }
  function aware() {
    return Q.all('Pick every way to show <b>cultural awareness</b> online.', R.some(AWARE, 2), R.some(UNAWARE, 2), {
      hint: 'Does it show respect for someone' + AP + 's culture and identity?', explain: 'Learn, ask, and include.', meta: { k: 'g8-aware' } });
  }

  Atlas.register('media', {
    lessons: [{
      id: 'safe', title: 'Rights, privacy and safety', sub: 'Your digital identity, permission, scams and passwords.',
      concepts: [
        { slug: 'identity', title: 'Your posts build your digital identity', exp: ['A2.1'], skill: 'online',
          model: [
            step(W.sent(PROUD[1]), 'Something you would be proud of in five years.'),
            step(W.sent(REGRET[1]), 'Their photo, their right: ask first.'),
            step(W.icon('screen'), 'Screenshots last, even after you delete.')
          ],
          guided: [function () { return identity(1); }, rightsTf],
          check: [function () { return identity(2); }, rightsTf],
          coach: '<p>Search the child' + AP + 's name together and talk about what comes up. Agree on a family rule for posting photos of other people.</p>',
          mistake: '<p>Believing a deleted post or a disappearing message is gone for good.</p>' },
        { slug: 'scams', title: 'Protect your accounts and data', exp: ['A2.2'], skill: 'online',
          model: [
            step(W.passage('', SCAM), 'A rush, a threat, a strange link: a scam.'),
            step(W.sent(PHRASES[0]), 'A long passphrase is hard to crack.'),
            step(W.icon('lock'), 'Add a second step, like a code by text message.')
          ],
          guided: [phishing, function () { return password(1); }],
          check: [phishing, function () { return password(2); }],
          coach: '<p>Check the privacy settings on one app together. Talk about taking breaks from screens when they affect mood or sleep.</p>',
          mistake: '<p>Using the same password everywhere, or one with a birthday or pet' + AP + 's name in it.</p>' }
      ]
    }, {
      id: 'info', title: 'True, false and chosen for you', sub: 'Misinformation, disinformation, feeds and fair use.',
      concepts: [
        { slug: 'kinds', title: 'Misinformation, disinformation, curated', exp: ['A2.3'], skill: 'info',
          model: [
            step(W.sent(INFO[0][0]), 'False by mistake: <b>misinformation</b>.'),
            step(W.sent(INFO[1][0]), 'False on purpose: <b>disinformation</b>.'),
            step(W.sent(INFO[2][0]), 'Chosen for you by an app: <b>curated</b>.')
          ],
          guided: [function () { return infoKind(1); }, feedTf],
          check: [function () { return infoKind(2); }, matchInfo],
          coach: '<p>When a surprising claim comes up at home, say aloud: "Who made this? Where else can we check it?"</p>',
          mistake: '<p>Thinking a video with millions of views must be true.</p>' },
        { slug: 'check', title: 'Check before you share or use', exp: ['A2.3'], skill: 'info',
          model: [
            step(W.icon('think'), 'Stop. Who made it?'),
            step(W.icon('read'), 'Look for the claim in other reliable sources.'),
            step(W.means('screen', 'a photo for your project'), 'Get permission and credit the creator.')
          ],
          guided: [checkOrder, function () { return ethics(1); }],
          check: [checkOrder, function () { return ethics(2); }],
          coach: '<p>Show the child how to find images with a free-to-use licence, and how to credit them.</p>',
          mistake: '<p>Thinking anything online is free to copy.</p>' }
      ]
    }, {
      id: 'techniques', title: 'How media works on you', sub: 'Persuasive techniques, audience and purpose.',
      concepts: [
        { slug: 'techniques', title: 'Name the persuasive technique', exp: ['A2.4'], skill: 'techniques',
          model: [
            step(W.sent(TECH[0][0]), '<b>Bandwagon</b>: everyone else does.'),
            step(W.sent(TECH[1][0]), '<b>Testimonial</b>: a star says so.'),
            step(W.sent(TECH[2][0]), '<b>Scarcity</b>: hurry before it is gone.')
          ],
          guided: [function () { return technique(1); }, function () { return technique(1); }],
          check: [function () { return technique(2); }, matchTechnique],
          coach: '<p>Pause ads during a show and name the technique together. Ask: "Did it work on you? Why?"</p>',
          mistake: '<p>Believing ads do not affect you. Techniques work best when we do not notice them.</p>' },
        { slug: 'audience', title: 'Intended and unintended audiences', exp: ['A2.5'], skill: 'techniques',
          model: [
            step(W.means('people', AUD[0][0]), 'Made for the friends in the chat.'),
            step(W.icon('screen'), 'One screenshot, and the teacher sees it.'),
            step(W.means('think', 'Who made it, for whom, and why?'), 'Purpose shapes the form and the message.')
          ],
          guided: [audience, purpose],
          check: [audience, purpose],
          coach: '<p>Before the child posts or sends anything, ask: "Who else could end up seeing this?"</p>',
          mistake: '<p>Thinking a private chat stays private.</p>' }
      ]
    }, {
      id: 'create', title: 'Create and collaborate', sub: 'Design with digital tools and work well with others.',
      concepts: [
        { slug: 'design', title: 'Design it for real users', exp: ['A2.6'], skill: 'create',
          model: [
            step(W.icon('people'), 'Understand the users and their problem.'),
            step(W.icon('star'), 'Brainstorm, then build a first version.'),
            step(W.icon('again'), 'Test it, then improve it.')
          ],
          guided: [design, matchTool],
          check: [design, matchTool],
          coach: '<p>Try the "Design a digital solution" activity in this chapter. The testing step matters most.</p>',
          mistake: '<p>Choosing a tool first, before understanding the problem.</p>' },
        { slug: 'respect', title: 'Respectful and inclusive online', exp: ['A2.7'], skill: 'create',
          model: [
            step(W.means('people', RESPECT[0][0]), 'Name what you like, then add yours.'),
            step(W.means('talk', RESPECT[1][0]), 'Invite them in.'),
            step(W.sent(AWARE[0]), 'Cultural awareness starts with names.')
          ],
          guided: [function () { return respect(1); }, aware],
          check: [function () { return respect(2); }, aware],
          coach: '<p>Model it: in a family group chat, thank people for ideas before you disagree.</p>',
          mistake: '<p>Typing something you would never say in person.</p>' }
      ]
    }],
    practice: [
      { id: 'online', name: 'Rights, privacy and safety', code: 'A2.1, A2.2', gen: identity },
      { id: 'info', name: 'Misinformation and fair use', code: 'A2.3', gen: infoKind },
      { id: 'techniques', name: 'Techniques, audience and purpose', code: 'A2.4, A2.5', gen: technique },
      { id: 'create', name: 'Design and collaboration', code: 'A2.6, A2.7', gen: respect }
    ],
    tasks: [
      { id: 'footprint', title: 'My digital footprint', code: 'A2.1', pic: W.icon('screen'), say: 'Search your name with a grown-up. What does your digital identity say about you?', write: true,
        run: ['Together, search the child' + AP + 's name and look at one account' + AP + 's privacy settings.', 'The child writes what they found, what they would change, and one rule they will follow about posting others.'],
        rubric: ['Does not reflect yet.', 'Describes what they found.', 'Explains their rights and responsibilities and sets a rule.', 'Evaluates their identity thoughtfully and plans specific changes to settings and habits.'] },
      { id: 'fact-check', title: 'Fact-check a viral claim', code: 'A2.3', pic: W.icon('think'), say: 'Choose a claim going around online. Is it true? Show how you know.', write: true,
        run: ['Choose a claim together (a health tip, a "did you know" fact, an edited photo).', 'The child finds who made it, checks two reliable sources, and decides: true, misinformation or disinformation.'],
        rubric: ['Accepts the claim without checking.', 'Checks one source.', 'Checks who made it and two reliable sources, and decides.', 'Explains the evidence clearly, and how the claim spread.'] },
      { id: 'ad-analysis', title: 'Take an ad apart', code: 'A2.5', pic: W.icon('screen'), say: 'Choose a real ad. Name its techniques, audience and purpose.', write: true,
        run: ['Choose an ad (a flyer, an online ad, a commercial).', 'The child names the techniques, the intended and possible unintended audience, and the purpose, and explains how the form helps the message.'],
        rubric: ['Describes the ad only.', 'Names its purpose.', 'Names techniques, audience and purpose with examples.', 'Evaluates how well the form, techniques and message work for the audience.'] },
      { id: 'design-solution', title: 'Design a digital solution', code: 'A2.6', pic: W.icon('star'), say: 'Find a real problem. Design a digital solution, test it and improve it.', write: true,
        run: ['Pick a real problem (a club no one knows about, forgotten chores, a local event).', 'The child plans, chooses a tool (slides, video, poster app, website builder), builds a first version, tests it with two people and improves it.'],
        rubric: ['No plan; unfinished.', 'Builds something; skips testing.', 'Follows the design process and improves after testing.', 'An original, well-tested solution that suits its users.'],
        coach: '<p>Ask the testers what confused them, not just whether they liked it.</p>' },
      { id: 'group-project', title: 'Collaborate online', code: 'A2.7', pic: W.icon('people'), say: 'Work on a shared document with a classmate or relative. Be respectful and include everyone.',
        run: ['Set up a shared document for a small project.', 'Watch how the child comments, disagrees, credits ideas and includes others.'],
        rubric: ['Comments are unkind or missing.', 'Polite, but does not include others.', 'Respectful, inclusive comments; credits ideas.', 'Models respect and cultural awareness, and helps the group work well.'] }
    ]
  });

  Q.shapes('media', {
    online: [[1, 'rights', rightsTf], [1, 'phishing', phishing], [1, 'password', password]],
    info: [[1, 'match', matchInfo], [1, 'check', checkOrder], [1, 'ethics', ethics], [1, 'feed', feedTf]],
    techniques: [[1, 'match', matchTechnique], [1, 'audience', audience], [1, 'purpose', purpose]],
    create: [[1, 'design', design], [1, 'tools', matchTool], [1, 'aware', aware]]
  });
})();
