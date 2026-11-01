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

  var PRIVATE = ['where I live', 'my password', 'my phone number', 'the name of my school', 'my last name', 'a photo of my house'];
  var OK = ['my favourite colour', 'a drawing of a cat', 'my favourite animal', 'a joke about a moose', 'my favourite food', 'a picture of a snowflake'];
  /* [what happens, the best thing to do, other choices] */
  var SAFE = [['A game asks for your address.', 'Ask a grown-up first.', ['Type it in.', 'Keep playing and guess.']], ['Someone you do not know sends you a message.', 'Do not answer. Tell a grown-up.', ['Answer them.', 'Send them a picture.']],
    ['You want to take a photo of your friend.', 'Ask your friend first.', ['Just take it.', 'Take it and hide it.']], ['Something on the screen makes you feel scared.', 'Stop and tell a grown-up.', ['Keep watching.', 'Show it to a little sister.']],
    ['You want to use the tablet.', 'Ask a grown-up first.', ['Take it and hide.', 'Use it without asking.']], ['A pop-up says you won a prize. Click here!', 'Do not click. Tell a grown-up.', ['Click it fast.', 'Type your name in.']],
    ['A website asks for your password.', 'Do not type it. Ask a grown-up.', ['Type it in.', 'Tell it to a friend.']], ['You want to post a picture of your sister.', 'Ask your sister and a grown-up first.', ['Post it now.', 'Post it and tell no one.']],
    ['A video starts playing that is not for kids.', 'Stop it and tell a grown-up.', ['Keep watching.', 'Turn the sound up.']], ['Someone online asks to meet you.', 'Say no and tell a grown-up.', ['Say yes.', 'Keep it a secret.']]];
  var ASKS = [['I ask a grown-up before I go online.', true], ['I tell a grown-up if something online upsets me.', true], ['I keep my password to myself.', true],
    ['I can go online without asking.', false], ['I can share where I live with anyone.', false], ['I keep scary things online a secret.', false]];
  var KIND = ['Great drawing!', 'Thanks for sharing.', 'I like your story.', 'Your snowman is so tall!', 'Nice job on the song.', 'I learned something new from you.', 'That made me smile.', 'Well done!'];
  var UNKIND = ['That is bad.', 'Nobody likes it.', 'Stop posting.', 'That is so boring.', 'You cannot draw.', 'Ugh, not again.', 'Everyone thinks you are silly.', 'That is the worst.'];
  /* [what happens online, the kind and safe thing to do, other choices] */
  var MEAN = [['Someone posts a mean comment about your friend.', 'Tell a grown-up and do not join in.', ['Post a mean comment back.', 'Share it with everyone.']],
    ['Your friend shares a drawing in the class app.', 'Write something kind about it.', ['Ignore the rules and tease them.', 'Write that it is bad.']],
    ['You feel angry at a message.', 'Take a break. Talk to a grown-up.', ['Write back in all capitals.', 'Say something mean.']],
    ['A classmate is left out of the group chat.', 'Ask a grown-up if they can join.', ['Laugh about it.', 'Tell others to leave them out.']],
    ['You made a mistake and hurt someone online.', 'Say sorry.', ['Pretend it did not happen.', 'Blame someone else.']]];
  /* [a place to find facts you can trust, a place you cannot] */
  var TRUST = [['a library book about bears', 'a joke video about bears'], ['a museum website about dinosaurs', 'a comment from a stranger'], ['your teacher', 'an ad for toys'], ['a nature centre page about birds', 'a cartoon about birds'],
    ['a park ranger', 'a funny meme'], ['a doctor', 'a cereal box'], ['an Elder who knows the land', 'a pop-up game'], ['a book about the weather', 'a made-up story about a storm'],
    ['a farmer who grows apples', 'an ad for apple juice'], ['a zoo website about lions', 'a cartoon lion']];
  var TRUSTY = TRUST.map(function (t) { return t[0]; }), NOTTRUSTY = TRUST.map(function (t) { return t[1]; });
  var WHY_TRUST = ['People who know about it made it.', 'It has bright colours.', 'It is very funny.', 'It popped up on its own.'];
  var FORMS = [['a poster', 'a big title and a picture'], ['an ad', 'wants you to buy something'], ['a video', 'moving pictures and sound'], ['a sign', 'a few words to tell you something fast'],
    ['a book cover', 'a title, a picture and who wrote it'], ['a song', 'music and words you sing']];
  /* made-up ads: lines, what it wants, the wrong wants, who it is for, the wrong readers */
  var ADS = [{ lines: ['NEW! Berry Blast Juice!', 'Kids love it!', 'Ask for it today!'], wants: 'get the juice', not: ['drink water', 'pick berries'], who: 'kids', notWho: ['grandparents', 'babies'] },
    { lines: ['Zoom Sneakers!', 'Run faster at recess!', 'Get yours at Shoe Town.'], wants: 'buy the sneakers', not: ['walk slowly', 'go to bed'], who: 'kids', notWho: ['babies', 'cats'] },
    { lines: ['Comfy Chairs for Grandparents', 'Soft and easy to sit in.', 'Visit our store today.'], wants: 'buy a chair', not: ['go skating', 'read a book'], who: 'grandparents', notWho: ['kids', 'dogs'] },
    { lines: ['Crunchy Pup Treats!', 'Dogs go wild for them!', 'Buy a bag for your dog.'], wants: 'buy dog treats', not: ['walk to school', 'paint a picture'], who: 'dog owners', notWho: ['babies', 'teachers'] }];
  var POSTERS = [{ lines: ['# Book Fair', 'Friday in the gym', 'Come and find a new book!', 'Made by Room 4'], qs: [['Who made this poster?', 'Room 4', ['the gym teacher', 'a bookstore']], ['What is the poster about?', 'a book fair', ['a hockey game', 'a bake sale']], ['When is it?', 'Friday', ['Monday', 'Sunday']]] },
    { lines: ['# Bake Sale', 'Tuesday after school', 'Muffins and bannock!', 'Made by the Grade 1 class'], qs: [['Who made this poster?', 'the Grade 1 class', ['a bakery', 'the principal']], ['What is the poster about?', 'a bake sale', ['a book fair', 'a swim meet']], ['When is it?', 'Tuesday', ['Friday', 'Saturday']]] },
    { lines: ['# Lost Cat', 'Grey with a white tail', 'Call the Patels if you see her.', 'Made by Asha'], qs: [['Who made this poster?', 'Asha', ['a vet', 'a pet store']], ['What is the poster about?', 'a lost cat', ['a bake sale', 'a new puppy']], ['What colour is the cat?', 'grey', ['orange', 'black']]] }];
  /* making something: [what you make] and moments in the design steps */
  var MAKES = ['poster', 'birthday card', 'slide show', 'sign for a lemonade stand', 'thank-you card', 'map of my room'];
  var DSTEPS = ['plan', 'make', 'show', 'fix'];
  var DLINE = { plan: 'Plan: what do I want to make?', make: 'Make it.', show: 'Show someone and ask what they think.', fix: 'Fix it to make it better.' };
  var MOMENTS = [['Kai draws a quick plan for his poster.', 'plan'], ['Ava thinks about what her card will say.', 'plan'], ['Omar lists the slides he wants.', 'plan'],
    ['Mei colours in her sign.', 'make'], ['Theo types the words on his slides.', 'make'], ['Noor glues pictures on her card.', 'make'],
    ['Liam shows his map to Dad.', 'show'], ['Sofia asks her class what they think.', 'show'], ['Hana reads her card to Grandma.', 'show'],
    ['Ravi makes his title bigger so it is easy to read.', 'fix'], ['Ella adds a picture her friend asked for.', 'fix'], ['Jun fixes a spelling on his sign.', 'fix']];

  function cap(x) { return x.charAt(0).toUpperCase() + x.slice(1); }
  function tf(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }

  /* ---------- question makers: safe online ---------- */
  function privatePick() {
    var n = R.int(1, 3);
    return Q.all('Pick everything you should keep <b>private</b> online.', R.some(PRIVATE, n), R.some(OK, 4 - n), { hint: 'Could a stranger use it to find you?', explain: 'Keep private: where you live, passwords, phone numbers and your school.', meta: { k: 'g1-private' } });
  }
  function whatDo(lv) {
    var s = R.pick(SAFE);
    return Q.one('What should you do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', s[0]), prompt: 'Is it safe? Do you need a grown-up?',
      hint: 'When you are not sure, ask a grown-up.', explain: s[1], meta: { k: 'g1-what-do', s: s[0] } });
  }
  function askTf() {
    var a = R.pick(ASKS);
    return { q: Q.name() + ' says:', fig: W.sent(a[0]), type: 'tf', answer: a[1], why: tf(a[1], 'It keeps you safe online.', 'It is not safe.'),
      hint: 'Who helps keep you safe?', explain: a[1] ? 'Yes: that keeps you safe.' : 'No: ask a grown-up, and keep private things private.', meta: { k: 'g1-ask-tf', said: a[0] } };
  }
  function privateTf() {
    var right = R.int(0, 1) === 1, w = R.pick(right ? OK : PRIVATE);
    return { q: 'Is it OK to share this online?', fig: W.means('lock', cap(w)), type: 'tf', answer: right, why: tf(right, 'A stranger could not use it to find you.', 'It is private. Keep it to yourself.'),
      hint: 'Could a stranger use it to find you?', explain: right ? 'Yes, that is fine to share.' : 'No, keep it private.', meta: { k: 'g1-private-tf', w: w } };
  }

  /* ---------- question makers: kind online ---------- */
  function kind(lv) {
    return Q.one('Which comment is <b>kind</b>?', R.pick(KIND), R.some(UNKIND, lv > 1 ? 2 : 1), { hint: 'Would you like someone to say it to you?', explain: 'Be kind online, just like in person.', meta: { k: 'g1-kind' } });
  }
  function kindTf() {
    var right = R.int(0, 1) === 1, c = R.pick(right ? KIND : UNKIND);
    return { q: 'Is this a kind comment to post?', fig: W.means('screen', c), type: 'tf', answer: right, why: tf(right, 'It would make someone feel good.', 'It could hurt someone.'),
      hint: 'How would you feel reading it?', explain: right ? 'Yes: kind.' : 'No: it could hurt.', meta: { k: 'g1-kind-comment-tf', c: c } };
  }
  function pickKind() {
    var n = R.int(1, 3);
    return Q.all('Pick every <b>kind</b> comment.', R.some(KIND, n), R.some(UNKIND, 4 - n), { hint: 'Would you like someone to say it to you?', explain: 'Kind words help everyone online.', meta: { k: 'g1-pick-kind-comment' } });
  }
  function meanDo(lv) {
    var m = R.pick(MEAN);
    return Q.one('What is the kind thing to do?', m[1], m[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', m[0]), hint: 'What would help everyone feel safe?', explain: m[1], meta: { k: 'g1-mean-do', s: m[0] } });
  }

  /* ---------- question makers: trust ---------- */
  function trust(lv) {
    var t = R.pick(TRUST);
    return Q.one('Where would you find facts you can <b>trust</b>?', t[0], [t[1]].concat(lv > 1 ? [R.pick(TRUST.filter(function (x) { return x !== t; }))[1]] : []), {
      prompt: 'Who made it? Do they know about the topic?', hint: 'Trust people and places that know about the topic.', explain: t[0] + ' comes from people who know.', meta: { k: 'g1-trust' } });
  }
  function trustTf() {
    var right = R.int(0, 1) === 1, w = R.pick(right ? TRUSTY : NOTTRUSTY);
    return { q: 'Can you trust the facts from <b>' + w + '</b>?', type: 'tf', answer: right, why: tf(right, 'People who know about it made it.', 'It was made for fun, or to sell something.'),
      hint: 'Who made it? Do they know about it?', explain: right ? 'Yes: they know about it.' : 'No: check a book or a grown-up who knows.', meta: { k: 'g1-trust-tf', w: w } };
  }
  function trustWhy(lv) {
    var w = R.pick(TRUSTY);
    return Q.one('Why can you trust <b>' + w + '</b>?', WHY_TRUST[0], R.some(WHY_TRUST.slice(1), lv > 1 ? 3 : 2), { hint: 'Who made it?', explain: WHY_TRUST[0], meta: { k: 'g1-trust-why', w: w } });
  }
  function pickTrust() {
    var n = R.int(1, 3);
    return Q.all('Pick every place to find facts you can <b>trust</b>.', R.some(TRUSTY, n), R.some(NOTTRUSTY, 4 - n), { hint: 'Who made it? Do they know about it?', explain: 'Trust people and places that know.', meta: { k: 'g1-pick-trust' } });
  }

  /* ---------- question makers: kinds of media ---------- */
  function formOf(lv) {
    var f = R.pick(FORMS);
    return Q.tiles('Which kind of media has <b>' + f[1] + '</b>?', f[0], R.some(FORMS.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think of one you have seen.', explain: cap(f[0]) + ': ' + f[1] + '.', meta: { k: 'g1-form-of', what: f[1] } });
  }
  function matchMedia() {
    var f = R.some(FORMS, 3);
    return { q: 'Match each kind of media to what it has or does.', type: 'match', pairs: f.map(function (x) { return [x[0], x[1]]; }), hint: 'Think of one you have seen.', explain: 'Each kind of media works in its own way.', meta: { k: 'g1-match-media' } };
  }
  function adWants(lv) {
    var a = R.pick(ADS);
    return Q.one('What does this ad want you to do?', a.wants, a.not.slice(0, lv > 1 ? 2 : 1), { fig: W.passage('', a.lines), hint: 'Look at the last line.', explain: 'Ads want you to buy something.', meta: { k: 'g1-ad-wants', ad: a.lines[0] } });
  }
  function adFor(lv) {
    var a = R.pick(ADS);
    return Q.one('Who is this ad for?', a.who, a.notWho.slice(0, lv > 1 ? 2 : 1), { fig: W.passage('', a.lines), hint: 'Who does it talk about?', explain: 'The ad is for <b>' + a.who + '</b>.', meta: { k: 'g1-ad-for', ad: a.lines[0] } });
  }
  function poster(lv) {
    var p = R.pick(POSTERS), x = R.pick(p.qs);
    return Q.one(x[0], x[1], x[2].slice(0, lv > 1 ? 2 : 1), { fig: W.passage('', p.lines), hint: 'Look at each line of the poster.', explain: 'The poster says it.', meta: { k: 'g1-poster', title: p.lines[0], q: x[0] } });
  }

  /* ---------- question makers: plan, make, show, fix ---------- */
  function design() {
    var m = R.pick(MAKES);
    return { q: 'Put the steps for making a <b>' + m + '</b> in order.', type: 'order', items: DSTEPS.map(function (d) { return DLINE[d]; }), first: 'First', last: 'Last', hint: 'Plan, make, show, fix.',
      explain: 'Plan it, make it, show it, then make it better.', meta: { k: 'g1-design', make: m } };
  }
  function designStep(lv) {
    var mo = R.pick(MOMENTS);
    return Q.tiles('Which step is this?', mo[1], R.some(DSTEPS.filter(function (d) { return d !== mo[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(mo[0]), hint: 'Plan, make, show, fix.', explain: DLINE[mo[1]], meta: { k: 'g1-design-step', s: mo[0] } });
  }
  function designNext(lv) {
    var i = R.int(0, 2), m = R.pick(MAKES), done = ['planned', 'made', 'showed someone'][i];
    return Q.one('You ' + done + ' your ' + m + '. What comes next?', DLINE[DSTEPS[i + 1]], DSTEPS.filter(function (d, n) { return n !== i + 1; }).map(function (d) { return DLINE[d]; }).slice(0, lv > 1 ? 3 : 2), {
      hint: 'Plan, make, show, fix.', explain: DLINE[DSTEPS[i + 1]], meta: { k: 'g1-design-next', done: done } });
  }
  function designTf() {
    var mo = R.pick(MOMENTS), said = R.pick([mo[1], R.pick(DSTEPS)]), right = said === mo[1];
    return { q: 'True or false? This is the <b>' + said + '</b> step.', fig: W.sent(mo[0]), type: 'tf', answer: right, why: tf(right, 'That is what happens in that step.', 'It is a different step.'),
      hint: 'Plan, make, show, fix.', explain: 'It is the <b>' + mo[1] + '</b> step.', meta: { k: 'g1-design-tf', s: mo[0], said: said } };
  }

  Atlas.register('media', {
    full: true,
    lessons: [{
      id: 'online', title: 'Safe and kind online', sub: 'Ask first, keep private things private, be kind.',
      concepts: [
        { slug: 'ask', title: 'Ask a grown-up first', exp: ['A2.1', 'A2.2'], skill: 'online',
          model: [
            step(W.icon('screen'), 'Before you go online: ask.'),
            step(W.icon('lock'), 'Keep private: where you live, your password, your phone number.'),
            step(W.means('screen', 'A game asks for your address.'), 'Private! Stop.'),
            step(W.icon('people'), 'Not sure, or upset? Tell a grown-up.')
          ],
          guided: [function () { return whatDo(1); }, privatePick, privateTf],
          check: [function () { return whatDo(2); }, askTf, privatePick, privateTf, function () { return whatDo(2); }],
          coach: '<p>Make family screen rules together: where devices are used, for how long, and who to tell if something feels wrong.</p>',
          mistake: '<p>Thinking a friendly message means a safe person. Anyone you do not know in real life is a stranger online.</p>' },
        { slug: 'kind', title: 'Be kind online', exp: ['A2.7'], skill: 'kind-online',
          model: [
            step(W.means('screen', 'Great drawing!'), 'Kind.'),
            step(W.means('screen', 'That is bad.'), 'Hurtful. Do not post it.'),
            step(W.icon('people'), 'A real person reads every comment.'),
            step(W.means('people', 'Someone posts a mean comment.'), 'Do not join in. Tell a grown-up.')
          ],
          guided: [function () { return kind(1); }, kindTf, function () { return meanDo(1); }],
          check: [function () { return kind(2); }, pickKind, function () { return meanDo(2); }, kindTf, function () { return kind(2); }],
          coach: '<p>When sending a family message together, ask: "Would you say this to their face?"</p>',
          mistake: '<p>Joking in a way that hurts. Ask: "How would they feel reading it?"</p>' }
      ]
    }, {
      id: 'media', title: 'How media works', sub: 'Trust, kinds of media, and what an ad wants.',
      concepts: [
        { slug: 'trust', title: 'Facts you can trust', exp: ['A2.3'], skill: 'trust',
          model: [
            step(W.icon('read'), 'A library book about bears: written by people who know.'),
            step(W.icon('screen'), 'A joke video: made for fun, not for facts.'),
            step(W.icon('people'), 'A park ranger knows about the forest.'),
            step(W.icon('wrong'), 'A funny meme does not.')
          ],
          guided: [function () { return trust(1); }, trustTf, function () { return trustWhy(1); }],
          check: [function () { return trust(2); }, pickTrust, trustTf, function () { return trustWhy(2); }, function () { return trust(2); }],
          coach: '<p>When looking something up together, ask: "Who made this? Do they know about it?"</p>',
          mistake: '<p>Believing something because it is on a screen. Check who made it.</p>' },
        { slug: 'kinds', title: 'Kinds of media', exp: ['A2.4', 'A2.5'], skill: 'media-kinds',
          model: [
            step(W.passage('', POSTERS[0].lines), 'A poster: a big title, and who made it.'),
            step(W.passage('', ADS[0].lines), 'An ad wants you to buy.'),
            step(W.passage('', ADS[2].lines), 'Who is it for? Grandparents.'),
            step(W.icon('people'), 'Ask: who made it, and who is it for?')
          ],
          guided: [function () { return adWants(1); }, function () { return poster(1); }, function () { return formOf(1); }],
          check: [function () { return adFor(2); }, matchMedia, function () { return poster(2); }, function () { return adWants(2); }, function () { return formOf(2); }],
          coach: '<p>Spot ads together on a cereal box or a bus. Ask: "What do they want? Who is it for?"</p>',
          mistake: '<p>Thinking an ad is just telling facts. Ask: "What does it want you to do?"</p>' },
        { slug: 'design', title: 'Plan, make, show, fix', exp: ['A2.6'], skill: 'design',
          model: [
            step(W.icon('think'), 'Plan.'),
            step(W.icon('write'), 'Make it.'),
            step(W.icon('people'), 'Show someone.'),
            step(W.icon('again'), 'Fix it to make it better.'),
            step(W.sent('Ravi makes his title bigger so it is easy to read.'), 'That is a fix.')
          ],
          guided: [design, function () { return designStep(1); }, designTf],
          check: [design, function () { return designNext(2); }, function () { return designStep(2); }, designTf, design],
          coach: '<p>Making a poster, a card or a short slide show? Use these four steps, with paper or a device.</p>',
          mistake: '<p>Stopping after "make it". Showing someone and fixing it is what makes it good.</p>' }
      ]
    }],
    practice: [
      { id: 'online', name: 'Safe online', code: 'A2.1, A2.2', gen: whatDo },
      { id: 'kind-online', name: 'Kind online', code: 'A2.7', gen: kind },
      { id: 'trust', name: 'Facts you can trust', code: 'A2.3', gen: trust },
      { id: 'media-kinds', name: 'Kinds of media', code: 'A2.4, A2.5', gen: formOf },
      { id: 'design', name: 'Plan, make, show, fix', code: 'A2.6', gen: designStep }
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
    online: [[1, 'private', privatePick], [1, 'ask', askTf], [1, 'true or false', privateTf]],
    'kind-online': [[1, 'true or false', kindTf], [1, 'pick', pickKind], [1, 'what to do', meanDo]],
    trust: [[1, 'true or false', trustTf], [1, 'why', trustWhy], [1, 'pick', pickTrust]],
    'media-kinds': [[1, 'match', matchMedia], [1, 'ad wants', adWants], [1, 'ad for', adFor], [1, 'poster', poster]],
    design: [[1, 'order', design], [1, 'next', designNext], [1, 'true or false', designTf]]
  });
})();
