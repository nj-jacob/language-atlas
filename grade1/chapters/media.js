/* Grade 1: media and online life.
   Ontario 2023 Language, Grades 1 to 3, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online, with permission        A2.2 online safety, privacy and well-being, seeking permission
   A2.3 gathering and checking information                           A2.4 forms, conventions and techniques of media texts
   A2.5 form, message, audience and creator                          A2.6 digital and media tools in the design process
   A2.7 communicating and collaborating in a safe, respectful way
   All examples (including the ad and the poster) are made up for this site. Answer checks: tests/verify/grade1-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var PRIVATE = ['where I live', 'my password', 'my phone number', 'the name of my school'];
  var OK = ['my favourite colour', 'a drawing of a cat', 'my favourite animal'];
  /* [what happens, the best thing to do, other choices] */
  var SAFE = [['A game asks for your address.', 'Ask a grown-up first.', ['Type it in.', 'Keep playing and guess.']], ['Someone you do not know sends you a message.', 'Do not answer. Tell a grown-up.', ['Answer them.', 'Send them a picture.']],
    ['You want to take a photo of your friend.', 'Ask your friend first.', ['Just take it.', 'Take it and hide it.']], ['Something on the screen makes you feel scared.', 'Stop and tell a grown-up.', ['Keep watching.', 'Show it to a little sister.']],
    ['You want to use the tablet.', 'Ask a grown-up first.', ['Take it and hide.', 'Use it without asking.']]];
  var KIND = ['Great drawing!', 'Thanks for sharing.', 'I like your story.'];
  var UNKIND = ['That is bad.', 'Nobody likes it.', 'Stop posting.'];
  /* [a place to find facts you can trust, a place you cannot] */
  var TRUST = [['a library book about bears', 'a joke video about bears'], ['a museum website about dinosaurs', 'a comment from a stranger'], ['your teacher', 'an ad for toys'], ['a nature centre page about birds', 'a cartoon about birds']];
  var FORMS = [['a poster', 'a big title and a picture'], ['an ad', 'wants you to buy something'], ['a video', 'moving pictures and sound'], ['a sign', 'a few words to tell you something fast']];
  var AD = ['NEW! Berry Blast Juice!', 'Kids love it!', 'Ask for it today!'];
  var POSTER = ['# Book Fair', 'Friday in the gym', 'Come and find a new book!', 'Made by Room 4'];
  var DESIGN = ['Plan: what do I want to make?', 'Make it.', 'Show someone and ask what they think.', 'Fix it to make it better.'];

  /* ---------- question makers: being online ---------- */
  function privatePick() {
    return Q.all('Pick everything you should keep <b>private</b> online.', R.some(PRIVATE, 2), R.some(OK, 2), { hint: 'Could a stranger use it to find you?', explain: 'Keep private: where you live, passwords, phone numbers and your school.', meta: { k: 'g1-private' } });
  }
  function whatDo(lv) {
    var s = R.pick(SAFE);
    return Q.one('What should you do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', s[0]), prompt: 'Is it safe? Do you need a grown-up?',
      hint: 'When you are not sure, ask a grown-up.', explain: s[1], meta: { k: 'g1-what-do', s: s[0] } });
  }
  function kind(lv) {
    return Q.one('Which comment is <b>kind</b>?', R.pick(KIND), R.some(UNKIND, lv > 1 ? 2 : 1), { hint: 'Would you like someone to say it to you?', explain: 'Be kind online, just like in person.', meta: { k: 'g1-kind' } });
  }
  function askTf() {
    var right = R.int(0, 1) === 1, said = right ? 'I ask a grown-up before I go online.' : 'I can go online without asking.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['A grown-up helps keep you safe online.', 'Grown-ups do not need to know.'], answer: 0 },
      hint: 'Who helps keep you safe?', explain: 'Ask a grown-up first.', meta: { k: 'g1-ask-tf', said: said } };
  }

  /* ---------- question makers: media ---------- */
  function trust(lv) {
    var t = R.pick(TRUST);
    return Q.one('Where would you find facts you can <b>trust</b>?', t[0], [t[1]].concat(lv > 1 ? [R.pick(TRUST.filter(function (x) { return x !== t; }))[1]] : []), {
      prompt: 'Who made it? Do they know about the topic?', hint: 'Trust people and places that know about the topic.', explain: t[0] + ' comes from people who know.', meta: { k: 'g1-trust' } });
  }
  function matchMedia() {
    var f = R.some(FORMS, 3);
    return { q: 'Match each kind of media to what it has or does.', type: 'match', pairs: f.map(function (x) { return [x[0], x[1]]; }), hint: 'Think of one you have seen.', explain: 'Each kind of media works in its own way.', meta: { k: 'g1-match-media' } };
  }
  function adWants() {
    return Q.one('What does this ad want you to do?', 'get the juice', ['drink water', 'pick berries'], { fig: W.passage('', AD), hint: 'Look at the last line.', explain: 'Ads want you to buy something.', meta: { k: 'g1-ad-wants' } });
  }
  function adFor() {
    return Q.one('Who is this ad for?', 'kids', ['grandparents', 'babies'], { fig: W.passage('', AD), hint: 'Who does it talk about?', explain: '"Kids love it!" The ad is for kids.', meta: { k: 'g1-ad-for' } });
  }
  function poster(lv) {
    var qs = [['Who made this poster?', 'Room 4', ['the gym teacher', 'a bookstore']], ['What is the poster about?', 'a book fair', ['a hockey game', 'a bake sale']], ['When is it?', 'Friday', ['Monday', 'Sunday']]], p = R.pick(qs);
    return Q.one(p[0], p[1], p[2].slice(0, lv > 1 ? 2 : 1), { fig: W.passage('', POSTER), hint: 'Look at each line of the poster.', explain: 'The poster says it.', meta: { k: 'g1-poster', q: p[0] } });
  }
  function design() {
    return { q: 'Put the steps for making a poster in order.', type: 'order', items: DESIGN.slice(), first: 'First', last: 'Last', hint: 'Plan, make, show, fix.', explain: 'Plan it, make it, show it, then make it better.', meta: { k: 'g1-design' } };
  }

  Atlas.register('media', {
    lessons: [{
      id: 'online', title: 'Safe and kind online', sub: 'Ask first, keep private things private, be kind.',
      concepts: [
        { slug: 'ask', title: 'Ask a grown-up first', exp: ['A2.1', 'A2.2'], skill: 'online',
          model: [
            step(W.icon('screen'), 'Before you go online: ask.'),
            step(W.icon('lock'), 'Keep private: where you live, your password, your phone number.'),
            step(W.icon('people'), 'Not sure, or upset? Tell a grown-up.')
          ],
          guided: [function () { return whatDo(1); }, privatePick],
          check: [function () { return whatDo(2); }, askTf],
          coach: '<p>Make family screen rules together: where devices are used, for how long, and who to tell if something feels wrong.</p>',
          mistake: '<p>Thinking a friendly message means a safe person. Anyone you do not know in real life is a stranger online.</p>' },
        { slug: 'kind', title: 'Be kind online', exp: ['A2.7'], skill: 'online',
          model: [
            step(W.sent('Great drawing!'), 'Kind.'),
            step(W.sent('That is bad.'), 'Hurtful. Do not post it.'),
            step(W.icon('people'), 'A real person reads every comment.')
          ],
          guided: [function () { return kind(1); }, function () { return kind(1); }],
          check: [function () { return kind(2); }, function () { return whatDo(1); }],
          coach: '<p>When sending a family message together, ask: "Would you say this to their face?"</p>',
          mistake: '<p>Joking in a way that hurts. Ask: "How would they feel reading it?"</p>' }
      ]
    }, {
      id: 'media', title: 'How media works', sub: 'Trust, kinds of media, and what an ad wants.',
      concepts: [
        { slug: 'trust', title: 'Facts you can trust', exp: ['A2.3'], skill: 'media',
          model: [
            step(W.icon('read'), 'A library book about bears: written by people who know.'),
            step(W.icon('screen'), 'A joke video: made for fun, not for facts.')
          ],
          guided: [function () { return trust(1); }, function () { return trust(1); }],
          check: [function () { return trust(2); }, function () { return trust(2); }],
          coach: '<p>When looking something up together, ask: "Who made this? Do they know about it?"</p>',
          mistake: '<p>Believing something because it is on a screen. Check who made it.</p>' },
        { slug: 'kinds', title: 'Kinds of media', exp: ['A2.4', 'A2.5'], skill: 'media',
          model: [
            step(W.passage('', POSTER), 'A poster: a big title, and who made it.'),
            step(W.passage('', AD), 'An ad wants you to buy.'),
            step(W.icon('people'), 'Ask: who made it, and who is it for?')
          ],
          guided: [adWants, function () { return poster(1); }],
          check: [adFor, matchMedia],
          coach: '<p>Spot ads together on a cereal box or a bus. Ask: "What do they want? Who is it for?"</p>',
          mistake: '<p>Thinking an ad is just telling facts. Ask: "What does it want you to do?"</p>' },
        { slug: 'design', title: 'Plan, make, show, fix', exp: ['A2.6'], skill: 'media',
          model: [
            step(W.icon('think'), 'Plan.'),
            step(W.icon('write'), 'Make it.'),
            step(W.icon('people'), 'Show someone.'),
            step(W.icon('again'), 'Fix it to make it better.')
          ],
          guided: [design, design],
          check: [design, design],
          coach: '<p>Making a poster, a card or a short slide show? Use these four steps, with paper or a device.</p>',
          mistake: '<p>Stopping after "make it". Showing someone and fixing it is what makes it good.</p>' }
      ]
    }],
    practice: [
      { id: 'online', name: 'Safe and kind online', code: 'A2.1, A2.2, A2.7', gen: whatDo },
      { id: 'media', name: 'How media works', code: 'A2.3, A2.4, A2.5, A2.6', gen: trust }
    ],
    tasks: [
      { id: 'screen-rules', title: 'Our screen rules', code: 'A2.1', pic: W.icon('screen'), say: 'Make screen rules with your family. Draw or write them.', write: true,
        run: ['Talk together: when can we use screens? What do we keep private? Who do we tell if something feels wrong?', 'The child draws or writes three rules. Put them near the device.'],
        rubric: ['No rules yet.', 'One rule with help.', 'Three rules, including asking first.', 'Three rules, and can explain why each one matters.'] },
      { id: 'make-poster', title: 'Make a poster', code: 'A2.6', pic: W.icon('write'), say: 'Make a poster for something at home or school. Plan, make, show, fix.',
        run: ['Choose a reason for a poster: a family games night, "please wash your hands", a lost toy.', 'Plan it, make it (on paper or a device), show it to someone, and make one change to make it better.'],
        rubric: ['Not finished.', 'Made a poster with help; no changes.', 'Planned, made, showed and fixed it.', 'Clear poster for its audience, with a good change after feedback.'] }
    ]
  });

  Q.shapes('media', {
    online: [[1, 'private', privatePick], [1, 'kind', kind], [1, 'ask', askTf]],
    media: [[1, 'match', matchMedia], [1, 'ad-wants', adWants], [1, 'ad-for', adFor], [1, 'poster', poster], [2, 'design', design]]
  });
})();
