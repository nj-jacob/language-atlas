/* Grade 2: media and online life.
   Ontario 2023 Language, Grades 1 to 3, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online, with permission          A2.2 navigating digital spaces safely, privacy and well-being
   A2.3 gathering, evaluating and using information                  A2.4 forms, conventions and techniques of media texts
   A2.5 the form, message, audience and creator of a media text      A2.6 digital and media tools in the stages of the design process
   A2.7 communicating and collaborating in safe, respectful and inclusive ways
   All examples (including the ad) are made up for this site. Answer checks: tests/verify/grade2-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var PRIVATE = ['where I live', 'my password', 'my phone number', 'a photo of my house'];
  var OK = ['my favourite colour', 'a picture I drew of a cat', 'my favourite season'];
  /* [what happens, the best thing to do, other choices] */
  var SAFE = [['A pop-up says, "You won a prize! Click here!"', 'Do not click. Tell a grown-up.', ['Click it fast.', 'Type your name to get the prize.']],
    ['A player you do not know asks where you live.', 'Do not answer, and tell a grown-up.', ['Tell them your street.', 'Ask where they live.']],
    ['You want to use a new app.', 'Ask a grown-up first.', ['Download it yourself.', 'Ask a friend for their password.']],
    ['A video online makes you feel scared.', 'Stop it and tell a grown-up.', ['Keep watching to the end.', 'Show it to your little brother.']]];
  var ASKFIRST = [['You want to post a photo of your friend.', 'Ask your friend first.', 'Post it now.'], ['You want to use your sister' + '’' + 's tablet.', 'Ask her first.', 'Just take it.'],
    ['You want to copy a drawing you found online for your poster.', 'Ask a grown-up if you may use it.', 'Copy it and say you drew it.']];
  var KIND = ['Nice work on your volcano!', 'I like your idea.', 'Can I help you with that part?'];
  var UNKIND = ['That is dumb.', 'You are not allowed to play with us.', 'Nobody likes your picture.'];
  /* [two places to find facts, the one to trust] */
  var TRUST = [['a science centre website about bats', 'a comment from a stranger'], ['a library book about the moon', 'a cartoon about the moon'], ['your teacher', 'a guess from a friend'],
    ['a zoo website about polar bears', 'an ad for polar bear toys']];
  var FORMS = [['a poster', 'a big title and a picture'], ['an ad', 'wants you to buy something'], ['a video', 'moving pictures and sound'], ['a menu', 'lists food and prices']];
  var AD = ['NEW! Sparkle Sneakers!', 'They make you run SO fast!', 'Only $49.99. Ask for them today!'];
  var DESIGN = ['Plan: what is the problem?', 'Make it.', 'Test it with someone.', 'Make it better.'];

  /* ---------- question makers ---------- */
  function privateInfo() {
    return Q.all('Pick everything you should keep <b>private</b> online.', R.some(PRIVATE, 2), R.some(OK, 2), { hint: 'Could a stranger use it to find you?',
      explain: 'Keep private: where you live, your password, your phone number.', meta: { k: 'g2-private' } });
  }
  function whatToDo(lv) {
    var s = R.pick(SAFE);
    return Q.one('What should you do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', s[0]), prompt: 'Is it safe? Do you need a grown-up?',
      hint: 'When you are not sure, ask a grown-up.', explain: s[1], meta: { k: 'g2-what-to-do', s: s[0] } });
  }
  function askFirst() {
    var a = R.pick(ASKFIRST);
    return Q.one('What should you do?', a[1], [a[2]], { fig: W.means('people', a[0]), hint: 'Is it yours? If not, ask first.', explain: 'Asking first is fair and respectful.', meta: { k: 'g2-ask-first', s: a[0] } });
  }
  function kindComment(lv) {
    return Q.one('Which comment is <b>kind</b>?', R.pick(KIND), R.some(UNKIND, lv > 1 ? 2 : 1), { hint: 'Would you like someone to say it to you?', explain: 'Be as kind online as you are in person.', meta: { k: 'g2-kind-comment' } });
  }
  function kindPick() {
    return Q.all('Pick every way to be <b>kind and fair</b> when you work with others.', R.some(KIND, 2), R.some(UNKIND, 2), { hint: 'Does everyone feel welcome?', explain: 'Include everyone, and use kind words.', meta: { k: 'g2-kind-pick' } });
  }
  function trust() {
    var t = R.pick(TRUST);
    return Q.one('You need facts. Which one would you <b>trust</b> more?', t[0], [t[1]], { hint: 'Who knows the facts? Who is just guessing or selling?', explain: '<b>' + t[0] + '</b> knows the facts.', meta: { k: 'g2-trust', good: t[0] } });
  }
  function matchMedia() {
    var f = R.some(FORMS, 3);
    return { q: 'Match each kind of media to what it has.', type: 'match', pairs: f.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture each one.', explain: 'Each kind of media has its own look.', meta: { k: 'g2-match-media' } };
  }
  function adWants() {
    return Q.one('What does this ad want you to do?', 'buy the sneakers', ['learn to run', 'give away your shoes'], { fig: W.passage('', AD), hint: 'Look at the last line.', explain: 'Ads want you to buy something.', meta: { k: 'g2-ad-wants' } });
  }
  function adTrick() {
    return Q.one('Which line is trying to <b>convince</b> you, and may not be true?', AD[1], [AD[0]], { fig: W.passage('', AD), hint: 'Can shoes really do that?', explain: 'Ads can make big promises. Think: is it true?', meta: { k: 'g2-ad-trick' } });
  }
  function design() {
    return { q: 'Put the design steps in order.', type: 'order', items: DESIGN.slice(), first: 'First', last: 'Last', hint: 'You need a plan before you make it.', explain: 'Plan, make, test, make it better.', meta: { k: 'g2-design' } };
  }

  Atlas.register('media', {
    lessons: [{
      id: 'online', title: 'Safe and kind online', sub: 'Privacy, asking first, and kind words.',
      concepts: [
        { slug: 'private', title: 'Keep private things private', exp: ['A2.2'], skill: 'online-safe',
          model: [
            step(W.icon('lock'), 'Where you live, your password, your phone number.'),
            step(W.icon('people'), 'Not sure? Ask a grown-up.')
          ],
          guided: [privateInfo, function () { return whatToDo(1); }],
          check: [privateInfo, function () { return whatToDo(2); }],
          coach: '<p>Make a family rule together: "I ask before I type my name or click anything new." Put it beside the device.</p>',
          mistake: '<p>Thinking a friendly stranger is safe. Online, anyone you do not know in real life is a stranger.</p>' },
        { slug: 'ask-first', title: 'Ask first', exp: ['A2.1'], skill: 'online-safe',
          model: [
            step(W.means('people', 'A photo of a friend?'), 'Ask them first.'),
            step(W.means('screen', 'A picture from online?'), 'Ask a grown-up if you may use it.')
          ],
          guided: [askFirst, askFirst],
          check: [askFirst, askFirst],
          coach: '<p>Practise the words together: "Is it okay if I...?"</p>',
          mistake: '<p>Using someone else\'s photo or drawing as if it were yours.</p>' },
        { slug: 'kind', title: 'Be kind online', exp: ['A2.7'], skill: 'online-safe',
          model: [
            step(W.means('talk', 'Nice work on your volcano!'), 'Kind.'),
            step(W.means('talk', 'Can I help you with that part?'), 'Kind and helpful.')
          ],
          guided: [function () { return kindComment(1); }, kindPick],
          check: [function () { return kindComment(2); }, kindPick],
          coach: '<p>Before sending a message, ask: "Would I say this to their face?"</p>',
          mistake: '<p>Joining in when others are unkind. Tell a grown-up instead.</p>' }
      ]
    }, {
      id: 'media-smart', title: 'Media smart', sub: 'Trust, kinds of media, ads and design.',
      concepts: [
        { slug: 'trust', title: 'Can I trust it?', exp: ['A2.3'], skill: 'media-smart',
          model: [
            step(W.icon('read'), 'A library book: written by someone who knows.'),
            step(W.icon('screen'), 'A comment from a stranger: maybe a guess.')
          ],
          guided: [trust, trust],
          check: [trust, trust],
          coach: '<p>When you look something up together, ask: "Who made this? How do they know?"</p>',
          mistake: '<p>Believing something because it is online.</p>' },
        { slug: 'forms', title: 'Kinds of media', exp: ['A2.4'], skill: 'media-smart',
          model: [
            step(W.icon('screen'), 'A video: moving pictures and sound.'),
            step(W.icon('star'), 'A poster: a big title and a picture.')
          ],
          guided: [matchMedia, matchMedia],
          check: [matchMedia, matchMedia],
          coach: '<p>Spot media on an outing: signs, posters, menus, screens.</p>',
          mistake: '<p>Not noticing ads among other media.</p>' },
        { slug: 'ads', title: 'What does an ad want?', exp: ['A2.5'], skill: 'media-smart',
          model: [
            step(W.passage('', AD), 'Someone made this to sell shoes.'),
            step(W.sent('They make you run SO fast!'), 'A big promise. Is it true?')
          ],
          guided: [adWants, adTrick],
          check: [adWants, adTrick],
          coach: '<p>Look at a cereal box together. Ask: who made it, who is it for, and what does it want?</p>',
          mistake: '<p>Believing every promise in an ad.</p>' },
        { slug: 'design', title: 'Plan, make, test, improve', exp: ['A2.6'], skill: 'media-smart',
          model: [
            step(W.icon('think'), 'Plan: what is the problem?'),
            step(W.icon('screen'), 'Make it on paper or a device. Test it. Make it better.')
          ],
          guided: [design, design],
          check: [design, design],
          coach: '<p>Make a simple sign for home on a tablet or on paper, show it to someone, and change one thing.</p>',
          mistake: '<p>Stopping after the first try. Testing shows what to fix.</p>' }
      ]
    }],
    practice: [
      { id: 'online-safe', name: 'Safe and kind online', code: 'A2.1, A2.2, A2.7', gen: privateInfo },
      { id: 'media-smart', name: 'Media smart', code: 'A2.3, A2.4, A2.5, A2.6', gen: trust }
    ],
    tasks: [
      { id: 'sign', title: 'Make a sign', code: 'A2.6', pic: W.icon('screen'), say: 'Make a sign that helps at home, like "Please shut the door".',
        run: ['Pick a real problem at home.', 'The child plans, makes a sign (on paper or a device), shows it to someone, and makes it better.'],
        rubric: ['No plan; unfinished.', 'Makes a sign; skips testing.', 'Plans, makes, tests and improves it.', 'A clear sign that really works.'] },
      { id: 'ad-detective', title: 'Ad detective', code: 'A2.5', pic: W.icon('screen'), say: 'Find an ad. Who made it? Who is it for? What does it want?',
        run: ['Look at a real ad together (a flyer, a box, a commercial).', 'Ask: who made it, who is it for, and what does it want you to do?'],
        rubric: ['Cannot say what the ad wants yet.', 'Says what it wants with help.', 'Says who it is for and what it wants.', 'Also points out a trick it uses (big words, bright colours, music).'] }
    ]
  });

  Q.shapes('media', {
    'online-safe': [[1, 'what-to-do', whatToDo], [1, 'ask-first', askFirst], [1, 'kind', kindComment], [1, 'kind-pick', kindPick]],
    'media-smart': [[1, 'match', matchMedia], [1, 'ad-wants', adWants], [1, 'ad-trick', adTrick], [1, 'design', design]]
  });
})();
