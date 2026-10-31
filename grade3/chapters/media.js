/* Grade 3: media and online life.
   Ontario 2023 Language, Grades 1 to 3, A2 Digital Media Literacy:
   A2.1 digital citizenship: rights and responsibilities online, with permission     A2.2 online safety, privacy and well-being
   A2.3 gathering and evaluating information                                         A2.4 forms, conventions and techniques of media texts
   A2.5 form, message, audience and creator                                          A2.6 using digital and media tools in the design process
   A2.7 communicating and collaborating online in a safe, respectful, inclusive way
   All examples (including the ad) are made up for this site. Answer checks: tests/verify/grade3-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var PRIVATE = ['my home address', 'my password', 'my phone number', 'my full name and school'];
  var OK = ['my favourite animal', 'a drawing of a tree', 'the name of my favourite book'];
  var KIND = ['Great job on your drawing!', 'I like how you used colour.', 'Thanks for sharing your idea.'];
  var UNKIND = ['That is so bad.', 'Nobody likes this.', 'You should stop posting.'];
  /* [what happens, the best thing to do, other choices] */
  var SAFE = [['A game asks for your home address.', 'Ask a grown-up first.', ['Type it in.', 'Make one up and keep playing.']],
    ['Someone you do not know sends you a message.', 'Do not answer, and tell a grown-up.', ['Answer them politely.', 'Send them a photo.']],
    ['You want to post a photo of your friend.', 'Ask your friend first.', ['Post it right away.', 'Post it and tell them later.']],
    ['Something online makes you feel upset.', 'Close it and tell a grown-up.', ['Keep watching.', 'Share it with a friend.']]];
  /* [two places to find facts, the one to trust] */
  var TRUST = [['a museum website about dinosaurs', 'a comment from someone you do not know'], ['a library book about planets', 'a joke video about planets'],
    ['a government weather website', 'a guess from a friend'], ['a nature centre page about owls', 'an ad for owl toys']];
  var FORMS = [['a poster', 'a big title and a picture'], ['an ad', 'tries to get you to buy something'], ['a news report', 'tells what happened'], ['a video', 'moving pictures and sound']];
  var AD = ['NEW! Crunchy Maple Puffs!', 'Kids love them!', 'Get yours today!'];
  var DESIGN = ['Plan: what problem am I solving?', 'Make a first try.', 'Test it with someone.', 'Make it better.'];

  /* ---------- question makers ---------- */
  function privateInfo() {
    return Q.all('Pick everything you should keep <b>private</b> online.', R.some(PRIVATE, 2), R.some(OK, 2), { hint: 'Could a stranger use it to find you, or get into your account?', explain: 'Keep private: where you live, your password, your phone number, your full name and school.', meta: { k: 'g3-private' } });
  }
  function whatToDo(lv) {
    var s = R.pick(SAFE);
    return Q.one('What should you do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', s[0]), prompt: 'Is it safe? Is it kind? Do you need a grown-up?',
      hint: 'When you are not sure, ask a grown-up first.', explain: s[1], meta: { k: 'g3-what-to-do', s: s[0] } });
  }
  function kindComment(lv) {
    return Q.one('Which comment is <b>kind</b> and <b>respectful</b>?', R.pick(KIND), R.some(UNKIND, lv > 1 ? 2 : 1), { hint: 'Would you like someone to say it to you?', explain: 'Be as kind online as you are in person.', meta: { k: 'g3-kind-comment' } });
  }
  function passwordTf() {
    var right = R.int(0, 1) === 1, said = right ? 'I keep my password secret, even from friends.' : 'It is fine to tell my best friend my password.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Passwords are only for you and your grown-ups.', 'Friends should know your password.'], answer: 0 },
      hint: 'Who should know your password?', explain: 'Only you and your grown-ups should know it.', meta: { k: 'g3-password', said: said } };
  }

  function trust(lv) {
    var t = R.pick(TRUST);
    return Q.one('Which would you <b>trust</b> more for facts?', t[0], [t[1]].concat(lv > 1 ? [R.pick(TRUST.filter(function (x) { return x !== t; }))[1]] : []), {
      prompt: 'Who made it? Do they know the facts?', hint: 'Trust places that study the topic.', explain: t[0] + ' comes from people who know.', meta: { k: 'g3-trust' } });
  }
  function matchMedia() {
    var f = R.some(FORMS, 3);
    return { q: 'Match each kind of media to what it does or has.', type: 'match', pairs: f.map(function (x) { return [x[0], x[1]]; }), hint: 'Think of one you have seen.', explain: 'Each kind of media has its own tricks.', meta: { k: 'g3-match-media' } };
  }
  function adWants() {
    return Q.one('What does this ad want you to do?', 'buy the cereal', ['eat less cereal', 'learn about maple trees'], { fig: W.passage('', AD), hint: 'Look at the last line.', explain: 'Ads want you to buy something.', meta: { k: 'g3-ad-wants' } });
  }
  function adFor() {
    return Q.one('Who is this ad trying to reach?', 'kids', ['grandparents', 'farmers'], { fig: W.passage('', AD), hint: 'Who does it talk about?', explain: '"Kids love them!" The ad is aimed at kids.', meta: { k: 'g3-ad-for' } });
  }
  function design() {
    return { q: 'Put the design steps in order.', type: 'order', items: DESIGN.slice(), first: 'First', last: 'Last', hint: 'Plan, make, test, improve.', explain: 'Plan, make, test, then make it better.', meta: { k: 'g3-design' } };
  }

  Atlas.register('media', {
    lessons: [{
      id: 'online', title: 'Safe and kind online', sub: 'Privacy, permission and respect.',
      concepts: [
        { slug: 'private', title: 'Keep private things private', exp: ['A2.2'], skill: 'online-safe',
          model: [
            step(W.icon('lock'), 'Some things stay private.'),
            step(W.sent('my home address') + W.sent('my password'), 'Never share these online.'),
            step(W.icon('people'), 'Not sure? Ask a grown-up first.')
          ],
          key: '<p>Private: address, password, phone number, full name and school.</p>',
          guided: [privateInfo, function () { return whatToDo(1); }],
          check: [privateInfo, passwordTf],
          coach: '<p>Make a family list together of what is private and what is fine to share. Put it near the computer.</p>',
          mistake: '<p>Thinking a friendly game or website is always safe. Any request for personal details is a "ask a grown-up" moment.</p>' },
        { slug: 'permission', title: 'Ask first', exp: ['A2.1'], skill: 'online-safe',
          model: [
            step(W.icon('screen'), 'You want to post a photo of a friend.'),
            step(W.icon('talk'), 'Ask: "Is it okay if I share this?"'),
            step(W.icon('people'), 'Everything you post becomes part of who you are online.')
          ],
          key: '<p>Ask permission before you share about anyone.</p>',
          guided: [function () { return whatToDo(1); }, function () { return whatToDo(1); }],
          check: [function () { return whatToDo(2); }, function () { return whatToDo(2); }],
          coach: '<p>Model it: ask the child before you share a photo of them. Explain that once something is online, it is hard to take back.</p>',
          mistake: '<p>Posting first and asking later.</p>' },
        { slug: 'kind', title: 'Be kind online', exp: ['A2.7'], skill: 'online-safe',
          model: [
            step(W.sent('That is so bad.'), 'Hurtful. It would hurt in person too.'),
            step(W.sent('I like how you used colour.'), 'Kind and helpful.'),
            step(W.icon('people'), 'Treat everyone with respect, whoever they are.')
          ],
          key: '<p>Online, be as kind as you are face to face.</p>',
          guided: [function () { return kindComment(1); }, function () { return kindComment(1); }],
          check: [function () { return kindComment(2); }, function () { return kindComment(2); }],
          coach: '<p>Practise writing a kind comment on a family member’s drawing or story.</p>',
          mistake: '<p>Writing something you would not say to someone’s face.</p>' }
      ]
    }, {
      id: 'media-smart', title: 'Media smart', sub: 'Trust, kinds of media, ads and design.',
      concepts: [
        { slug: 'trust', title: 'Can I trust it?', exp: ['A2.3'], skill: 'media-smart',
          model: [
            step(W.icon('screen'), 'Two places with facts about dinosaurs.'),
            step(W.sent('a museum website'), 'Made by people who study dinosaurs.'),
            step(W.sent('a comment from a stranger'), 'Who knows? Check it somewhere else.')
          ],
          key: '<p>Ask: who made it, and do they know?</p>',
          guided: [function () { return trust(1); }, function () { return trust(1); }],
          check: [function () { return trust(2); }, function () { return trust(2); }],
          coach: '<p>When you look something up together, say aloud: "Who made this page? Can we trust it?"</p>',
          mistake: '<p>Believing the first result. Check a second trusted source.</p>' },
        { slug: 'forms', title: 'Kinds of media', exp: ['A2.4'], skill: 'media-smart',
          model: [
            step(W.icon('screen'), 'A video: moving pictures and sound.'),
            step(W.passage('', ['BAKE SALE', 'Friday at noon']), 'A poster: a big title, short words.'),
            step(W.passage('', AD), 'An ad: it wants you to buy.')
          ],
          key: '<p>Each kind of media has its own look and its own job.</p>',
          guided: [matchMedia, matchMedia],
          check: [matchMedia, matchMedia],
          coach: '<p>Count the kinds of media you see on a walk or a car ride: signs, posters, ads, screens.</p>',
          mistake: '<p>Thinking ads are just information. Ads are made to sell.</p>' },
        { slug: 'ads', title: 'Who made it, and for whom?', exp: ['A2.5'], skill: 'media-smart',
          model: [
            step(W.passage('', AD), 'An ad.'),
            step(W.sent('Kids love them!'), 'It is aimed at <b>kids</b>.'),
            step(W.sent('Get yours today!'), 'It wants you to <b>buy</b>.')
          ],
          key: '<p>Ask: who made it, who is it for, and what does it want?</p>',
          guided: [adWants, adFor],
          check: [adWants, adFor],
          coach: '<p>Pause on an ad during a show and ask the three questions together.</p>',
          mistake: '<p>Believing "Kids love them!" is a fact. It is a selling trick.</p>' },
        { slug: 'design', title: 'Design it: plan, make, test, improve', exp: ['A2.6'], skill: 'media-smart',
          model: [
            step(W.icon('think'), 'Plan: what problem am I solving?'),
            step(W.icon('write'), 'Make a first try.'),
            step(W.icon('people'), 'Test it with someone.'),
            step(W.icon('again'), 'Make it better.')
          ],
          guided: [design, design],
          check: [design, design],
          coach: '<p>Try the "Design a poster" activity in this chapter. The test step matters: ask a family member what they understood.</p>',
          mistake: '<p>Stopping after the first try. Testing and improving is where it gets good.</p>' }
      ]
    }],
    practice: [
      { id: 'online-safe', name: 'Safe and kind online', code: 'A2.1, A2.2, A2.7', gen: privateInfo },
      { id: 'media-smart', name: 'Media smart', code: 'A2.3, A2.4, A2.5, A2.6', gen: trust }
    ],
    tasks: [
      { id: 'poster', title: 'Design a poster', code: 'A2.6', pic: W.icon('screen'), say: 'Make a poster that solves a problem at home.',
        run: ['Pick a real problem: lights left on, boots by the door, saving water.', 'The child plans, makes a poster (on paper or a device), tests it with a family member, and improves it.'],
        rubric: ['No plan; unfinished.', 'Makes a poster; skips testing.', 'Plans, makes, tests and improves it.', 'A clear, eye-catching poster that really changes what people do.'] },
      { id: 'ad-detective', title: 'Ad detective', code: 'A2.5', pic: W.icon('screen'), say: 'Find an ad. Who made it? Who is it for? What does it want?',
        run: ['Look at a real ad together (a flyer, a box, a commercial).', 'Ask: who made it, who is it for, what does it want you to do, and which words or pictures try to convince you?'],
        rubric: ['Cannot say what the ad wants yet.', 'Says what it wants with help.', 'Says who it is for and what it wants.', 'Also points out the tricks it uses (words, colours, music).'] }
    ]
  });

  Q.shapes('media', {
    'online-safe': [[1, 'what-to-do', whatToDo], [1, 'kind', kindComment], [1, 'password', passwordTf]],
    'media-smart': [[1, 'match', matchMedia], [1, 'ad-wants', adWants], [1, 'ad-for', adFor], [1, 'design', design]]
  });
})();
