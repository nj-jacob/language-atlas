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

  var AP = '’';
  var PRIVATE = ['where I live', 'my password', 'my phone number', 'a photo of my house', 'the name of my school', 'my full name', 'when my family is away', 'my street name'];
  var OK = ['my favourite colour', 'a picture I drew of a cat', 'my favourite season', 'my favourite animal', 'a joke I made up', 'my favourite book', 'what I like to eat', 'my favourite sport'];
  /* [what happens, the best thing to do, other choices] */
  var SAFE = [['A pop-up says, "You won a prize! Click here!"', 'Do not click. Tell a grown-up.', ['Click it fast.', 'Type your name to get the prize.']],
    ['A player you do not know asks where you live.', 'Do not answer, and tell a grown-up.', ['Tell them your street.', 'Ask where they live.']],
    ['You want to use a new app.', 'Ask a grown-up first.', ['Download it yourself.', 'Ask a friend for their password.']],
    ['A video online makes you feel scared.', 'Stop it and tell a grown-up.', ['Keep watching to the end.', 'Show it to your little brother.']],
    ['Someone online asks for your password.', 'Do not share it. Tell a grown-up.', ['Share it so they can help.', 'Send it in a secret message.']],
    ['A message says, "Send me a photo of you."', 'Do not send it. Tell a grown-up.', ['Send one quickly.', 'Send a photo of your house instead.']],
    ['A game asks you to buy coins.', 'Ask a grown-up first.', ['Tap buy.', 'Use a card you found.']],
    ['Someone you do not know wants to video chat.', 'Say no, and tell a grown-up.', ['Say yes.', 'Turn on your camera.']]];
  /* [what you want to do, the respectful choice, the choice that is not, who to ask] */
  var ASKFIRST = [['You want to post a photo of your friend.', 'Ask your friend first.', 'Post it now.', 'your friend'], ['You want to use your sister' + AP + 's tablet.', 'Ask her first.', 'Just take it.', 'your sister'],
    ['You want to copy a drawing you found online for your poster.', 'Ask a grown-up if you may use it.', 'Copy it and say you drew it.', 'a grown-up'],
    ['You want to download a new game.', 'Ask a grown-up first.', 'Download it yourself.', 'a grown-up'], ['You want to share a video your cousin made.', 'Ask your cousin first.', 'Share it with everyone.', 'your cousin'],
    ['You want to use music from a website in your slideshow.', 'Ask a grown-up if you may use it.', 'Use it and say nothing.', 'a grown-up'],
    ['You want to read your brother' + AP + 's messages.', 'Ask him first.', 'Read them while he is out.', 'your brother'], ['You want to put your class photo online.', 'Ask your teacher first.', 'Post it now.', 'your teacher']];
  /* [asking for permission, not asking] */
  var ASKWORDS = [['Is it okay if I post this photo?', 'I am posting this photo.'], ['May I use your drawing?', 'I took your drawing.'], ['Can I borrow your tablet?', 'Give me your tablet.'],
    ['Could I share your video?', 'I shared your video.'], ['Is it okay if I use this song?', 'I am using this song.'], ['May I add you to the group chat?', 'I added you to the group chat.']];
  var KIND = ['Nice work on your volcano!', 'I like your idea.', 'Can I help you with that part?', 'You can play with us!', 'Great job on your drawing.', 'Thanks for sharing.',
    'That was a funny joke!', 'Let' + AP + 's take turns.', 'Your story made me smile.', 'Want to work together?'];
  var UNKIND = ['That is dumb.', 'You are not allowed to play with us.', 'Nobody likes your picture.', 'Go away.', 'Your idea is silly.', 'You are so slow.', 'That looks bad.',
    'We do not want you here.', 'Stop talking.', 'You always mess up.'];
  /* [unkind, a kind way to say it] */
  var FIX = [['That looks bad.', 'Maybe try a darker colour?'], ['Your idea is silly.', 'I have a different idea. Can I share it?'], ['Stop talking.', 'Can I have a turn to talk?'],
    ['You are so slow.', 'Take your time. I can wait.'], ['Go away.', 'I need a little space right now.'], ['You always mess up.', 'Mistakes are okay. Try again!']];
  /* [a source to trust, one not to trust] */
  var TRUST = [['a science centre website about bats', 'a comment from a stranger'], ['a library book about the moon', 'a cartoon about the moon'], ['your teacher', 'a guess from a friend'],
    ['a zoo website about polar bears', 'an ad for polar bear toys'], ['a museum website about dinosaurs', 'a funny video of a toy dinosaur'], ['a doctor', 'an ad for vitamins'],
    ['a park ranger', 'a post from someone you do not know'], ['an atlas of Canada', 'a made-up adventure story'], ['a weather website from the government', 'a guess from your cousin'],
    ['a book by a bee scientist', 'a cartoon about bees']];
  var CHECK = ['Who made it?', 'How do they know?', 'Is it trying to sell me something?'];
  var NOCHECK = ['What colour is it?', 'Is it long?', 'Does it have a funny picture?'];
  /* [kind of media, what it has, a sample] */
  var FORMS = [['a poster', 'a big title and a picture', 'YARD SALE! Saturday at 9:00.'], ['an ad', 'wants you to buy something', 'Buy Crunchy Bites! Kids love them!'],
    ['a video', 'moving pictures and sound', 'Press play to watch the beavers build.'], ['a menu', 'lists food and prices', 'Pancakes $6.00. Soup $4.50.'],
    ['a map', 'shows where places are', 'You are here: ★. The library is up this road.'], ['a podcast', 'voices and sound, no pictures', 'Welcome to Bird Talk. Today: loon calls.'],
    ['a comic', 'pictures in boxes and speech bubbles', 'Kai: "Look out!" Mei: "Too late!"'], ['a sign', 'a few words to read quickly', 'STOP']];
  /* ads: [lines, what it sells, the big promise] */
  var ADS = [[['NEW! Sparkle Sneakers!', 'They make you run SO fast!', 'Only $49.99. Ask for them today!'], 'the sneakers'],
    [['Choco Crunch Cereal!', 'Every bowl makes you a superstar!', 'Find it in your store now.'], 'the cereal'],
    [['Zoom Bike 3000', 'It will never get a flat tire!', 'Visit Pedal Shop today.'], 'the bike'],
    [['Fizzy Pop!', 'Drink it and you will never feel tired!', 'Only $2.00 a can.'], 'the drink'],
    [['Robo Pup Toy', 'The only friend you will ever need!', 'Ask your family for one.'], 'the toy'],
    [['Comfy Mitts', 'Your hands will NEVER get cold!', 'On sale this week.'], 'the mittens']];
  var DESIGN = ['Plan: what is the problem?', 'Make it.', 'Test it with someone.', 'Make it better.'];
  var PROJECTS = ['a poster for the bake sale', 'a sign for the class library', 'a slideshow about owls', 'a map of your schoolyard', 'a birthday card on a tablet', 'a video about recycling',
    'a comic about a lost mitten', 'a label for the recycling bin'];
  var STAGES = ['Plan', 'Make', 'Test', 'Improve'];
  /* [what someone does, the design step] */
  var ACT = [['Mei asks: what do people need to know?', 'Plan'], ['Kai sketches ideas for his poster.', 'Plan'], ['Ava draws the sign.', 'Make'], ['Omar types the words on a tablet.', 'Make'],
    ['Noor shows her sign to her dad.', 'Test'], ['Ben asks a friend to try his map.', 'Test'], ['Leila makes the letters bigger so people can read them.', 'Improve'], ['Theo fixes the arrow that pointed the wrong way.', 'Improve']];
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }
  function T(f, a) { return function () { return f(a); }; }
  function adOf(a) { return W.passage('', a[0]); }

  /* ---------- keep private things private ---------- */
  function privateInfo(lv) {
    return Q.all('Pick everything you should keep <b>private</b> online.', R.some(PRIVATE, 2), R.some(OK, lv > 1 ? 3 : 2), { hint: 'Could a stranger use it to find you?',
      explain: 'Keep private: where you live, your password, your phone number.', meta: { k: 'g2-private' } });
  }
  function whatToDo(lv) {
    var x = R.pick(SAFE);
    return Q.one('What should you do?', x[1], x[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', x[0]), prompt: 'Is it safe? Do you need a grown-up?',
      hint: 'When you are not sure, ask a grown-up.', explain: x[1], meta: { k: 'g2-what-to-do', s: x[0] } });
  }
  function privateOne(lv) {
    var right = R.pick(OK);
    return Q.one('Which one is safe to share online?', right, R.some(PRIVATE, lv > 1 ? 2 : 1), { hint: 'Could a stranger use it to find you?', explain: '<b>' + right + '</b> is safe to share.', meta: { k: 'g2-private-one' } });
  }
  function privateTf() {
    var yes = R.int(0, 1) === 1, x = R.pick(yes ? OK : PRIVATE), n = Q.name();
    return { q: n + ' wants to share <b>' + x + '</b> in a game chat. Is that safe?', type: 'tf', answer: yes,
      why: { options: ['A stranger could not use it to find ' + n + '.', 'A stranger could use it to find ' + n + '.'], answer: yes ? 0 : 1 },
      hint: 'Could a stranger use it to find you?', explain: yes ? 'Safe to share.' : 'Keep it private.', meta: { k: 'g2-private-tf', x: x } };
  }

  /* ---------- ask first ---------- */
  function askFirst(lv) {
    var a = R.pick(ASKFIRST), wrong = [a[2]].concat(lv > 1 ? [R.pick(others(ASKFIRST, a))[2]] : []).filter(function (w, i, all) { return all.indexOf(w) === i; });
    return Q.one('What should you do?', a[1], wrong, { fig: W.means('people', a[0]), hint: 'Is it yours? If not, ask first.', explain: 'Asking first is fair and respectful.', meta: { k: 'g2-ask-first', s: a[0] } });
  }
  function askWho(lv) {
    var a = R.pick(ASKFIRST), whos = ['your friend', 'your sister', 'a grown-up', 'your cousin', 'your brother', 'your teacher'];
    return Q.tiles('Who should you ask first?', a[3], R.some(others(whos, a[3]), lv > 1 ? 3 : 2), { fig: W.means('people', a[0]), hint: 'Whose is it? Who keeps you safe?', explain: 'Ask <b>' + a[3] + '</b>.', meta: { k: 'g2-ask-who', s: a[0] } });
  }
  function askWords() {
    var w = R.pick(ASKWORDS);
    return Q.one('Which one <b>asks</b> for permission?', w[0], [w[1]], { hint: 'Is it okay if...? May I...? Can I...?', explain: W.means('talk', w[0]), meta: { k: 'g2-ask-words' } });
  }
  function askTf() {
    var a = R.pick(ASKFIRST), yes = R.int(0, 1) === 1, did = yes ? a[1] : a[2];
    return { q: a[0] + ' ' + Q.name() + ' decides: <b>' + did + '</b> Is that respectful?', type: 'tf', answer: yes,
      why: { options: ['It asks before using what is not yours.', 'It uses something without asking.'], answer: yes ? 0 : 1 },
      hint: 'Is it yours? If not, ask first.', explain: a[1], meta: { k: 'g2-media-ask-tf', s: a[0], did: did } };
  }

  /* ---------- be kind online ---------- */
  function kindComment(lv) {
    return Q.one('Which comment is <b>kind</b>?', R.pick(KIND), R.some(UNKIND, lv > 1 ? 2 : 1), { hint: 'Would you like someone to say it to you?', explain: 'Be as kind online as you are in person.', meta: { k: 'g2-kind-comment' } });
  }
  function kindPick(lv) {
    return Q.all('Pick every way to be <b>kind and fair</b> when you work with others.', R.some(KIND, 2), R.some(UNKIND, lv > 1 ? 3 : 2), { hint: 'Does everyone feel welcome?', explain: 'Include everyone, and use kind words.', meta: { k: 'g2-kind-pick' } });
  }
  function kindTf() {
    var yes = R.int(0, 1) === 1, x = R.pick(yes ? KIND : UNKIND);
    return { q: Q.name() + ' wants to send this to a classmate. Is it kind?', fig: W.means('talk', x), type: 'tf', answer: yes,
      why: { options: ['It would make someone feel good.', 'It would hurt someone' + AP + 's feelings.'], answer: yes ? 0 : 1 },
      hint: 'Would you like someone to say it to you?', explain: yes ? 'Kind.' : 'Not kind.', meta: { k: 'g2-media-kind-tf', x: x } };
  }
  function kindFix(lv) {
    var f = R.pick(FIX), wrong = [f[0]].concat(lv > 1 ? [R.pick(UNKIND.filter(function (u) { return u !== f[0]; }))] : []);
    return Q.one('Which is a kinder way to say it?', f[1], wrong, { fig: W.means('talk', f[0]), hint: 'Say what you need without hurting.', explain: W.means('talk', f[1]), meta: { k: 'g2-kind-fix' } });
  }

  /* ---------- can I trust it? ---------- */
  function trust(lv) {
    var t = R.pick(TRUST), wrong = [t[1]].concat(lv > 1 ? [R.pick(others(TRUST, t))[1]] : []);
    return Q.one('You need facts. Which one would you <b>trust</b> more?', t[0], wrong, { hint: 'Who knows the facts? Who is just guessing or selling?', explain: '<b>' + t[0] + '</b> knows the facts.', meta: { k: 'g2-trust' } });
  }
  function trustTf() {
    var t = R.pick(TRUST), yes = R.int(0, 1) === 1, x = yes ? t[0] : t[1], n = Q.name();
    return { q: n + ' needs facts and uses <b>' + x + '</b>. Can ' + n + ' trust it?', type: 'tf', answer: yes,
      why: { options: ['It comes from someone who knows.', 'It may be a guess, made up, or selling something.'], answer: yes ? 0 : 1 },
      hint: 'Who made it? How do they know?', explain: yes ? 'You can trust it.' : 'Check somewhere else.', meta: { k: 'g2-trust-tf', x: x } };
  }
  function trustPick(lv) {
    var ts = R.some(TRUST, lv > 1 ? 3 : 2);
    return Q.all('Pick every source you could <b>trust</b> for facts.', ts.slice(0, 2).map(function (t) { return t[0]; }), ts.map(function (t) { return t[1]; }), { hint: 'Who knows the facts?',
      explain: 'Trust people and places that know.', meta: { k: 'g2-trust-pick' } });
  }
  function trustAsk(lv) {
    var right = R.pick(CHECK);
    return Q.one('You find a fact online. Which question helps you decide if you can trust it?', right, R.some(NOCHECK, lv > 1 ? 2 : 1), { hint: 'Think about who made it.', explain: '<b>' + right + '</b>', meta: { k: 'g2-trust-ask' } });
  }

  /* ---------- kinds of media ---------- */
  function matchMedia(lv) {
    var f = R.some(FORMS, lv > 1 ? 4 : 3);
    return { q: 'Match each kind of media to what it has.', type: 'match', pairs: f.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture each one.', explain: 'Each kind of media has its own look.', meta: { k: 'g2-match-media' } };
  }
  function formWhat(lv) {
    var f = R.pick(FORMS);
    return Q.tiles('Which kind of media has <b>' + f[1] + '</b>?', f[0], R.some(others(FORMS, f), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { hint: 'Picture each one.', explain: '<b>' + f[0] + '</b>', meta: { k: 'g2-form-what', has: f[1] } });
  }
  function formName(lv) {
    var f = R.pick(FORMS);
    return Q.tiles('What kind of media is this from?', f[0], R.some(others(FORMS, f), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { fig: W.sent(f[2]), hint: 'What would it look or sound like?',
      explain: 'It is from <b>' + f[0] + '</b>: ' + f[1] + '.', meta: { k: 'g2-form-name', s: f[2] } });
  }
  function formTf() {
    var f = R.pick(FORMS), yes = R.int(0, 1) === 1, has = yes ? f[1] : R.pick(others(FORMS, f))[1];
    return { q: Q.name() + ' says <b>' + f[0] + '</b> has ' + has + '.', type: 'tf', answer: yes,
      why: { options: ['That is what it has.', 'That is a different kind of media.'], answer: yes ? 0 : 1 },
      hint: 'Picture it.', explain: '<b>' + f[0] + '</b>: ' + f[1] + '.', meta: { k: 'g2-media-form-tf', f: f[0], has: has } };
  }

  /* ---------- what does an ad want? ---------- */
  function adWants(lv) {
    var a = R.pick(ADS), wrong = ['make a new friend', 'learn a fact'].slice(0, lv > 1 ? 2 : 1);
    return Q.one('What does this ad want you to do?', 'buy ' + a[1], wrong, { fig: adOf(a), hint: 'Look at the last line.', explain: 'Ads want you to buy something.', meta: { k: 'g2-ad-wants', top: a[0][0] } });
  }
  function adTrick() {
    var a = R.pick(ADS);
    return Q.one('Which line is a <b>big promise</b> that may not be true?', a[0][1], [a[0][0], a[0][2]], { fig: adOf(a), hint: 'Could it really do that?', explain: 'Ads can make big promises. Think: is it true?', meta: { k: 'g2-ad-trick', top: a[0][0] } });
  }
  function adWho() {
    var a = R.pick(ADS);
    return Q.one('Who most likely made this ad?', 'the company that sells ' + a[1], ['a scientist who tests ' + a[1], 'your teacher'], { fig: adOf(a), hint: 'Who wants you to buy it?', explain: 'The people selling it made it.', meta: { k: 'g2-ad-who' } });
  }
  function adTf() {
    var a = R.pick(ADS), i = R.int(0, 2), n = Q.name();
    return { q: n + ' reads this line: <b>' + a[0][i] + '</b> Is it a big promise that may not be true?', fig: adOf(a), type: 'tf', answer: i === 1,
      why: { options: ['Nothing can really do that.', 'It just names or prices the thing, or says where to get it.'], answer: i === 1 ? 0 : 1 },
      hint: 'Could it really do that?', explain: 'The big promise: <b>' + a[0][1] + '</b>', meta: { k: 'g2-ad-tf', line: a[0][i] } };
  }

  /* ---------- plan, make, test, improve ---------- */
  function design() {
    return { q: 'You are making <b>' + R.pick(PROJECTS) + '</b>. Put the steps in order.', type: 'order', items: DESIGN.slice(), first: 'First', last: 'Last', hint: 'You need a plan before you make it.', explain: 'Plan, make, test, make it better.', meta: { k: 'g2-design' } };
  }
  function designStep() {
    var a = R.pick(ACT);
    return { q: 'Which step is this?', fig: W.sent(a[0]), type: 'tap', tiles: STAGES, answer: STAGES.indexOf(a[1]), hint: 'Planning, making, testing, or making it better?', explain: '<b>' + a[1] + '</b>', meta: { k: 'g2-design-step', s: a[0] } };
  }
  function designNext() {
    var i = R.int(0, 2);
    return { q: 'You are making <b>' + R.pick(PROJECTS) + '</b>. You have done this: <b>' + STAGES[i] + '</b>. What comes next?', type: 'tap', tiles: STAGES, answer: i + 1, hint: 'Plan, make, test, improve.',
      explain: 'Next: <b>' + STAGES[i + 1] + '</b>.', meta: { k: 'g2-design-next', done: STAGES[i] } };
  }
  function designTf() {
    var p = R.pick(PROJECTS), yes = R.int(0, 1) === 1, n = Q.name();
    return { q: n + ' made ' + p + (yes ? ', showed it to a friend, and fixed one thing.' : ' and stopped after the first try.') + ' Did ' + n + ' use every design step?', type: 'tf', answer: yes,
      why: { options: ['It was tested and made better.', 'It was not tested or made better.'], answer: yes ? 0 : 1 },
      hint: 'Plan, make, test, improve.', explain: 'Test it, then make it better.', meta: { k: 'g2-design-tf', tested: yes } };
  }

  Atlas.register('media', {
    full: true,
    lessons: [{
      id: 'online', title: 'Safe and kind online', sub: 'Privacy, asking first, and kind words.',
      concepts: [
        { slug: 'private', title: 'Keep private things private', exp: ['A2.2'], skill: 'private',
          model: [
            step(W.icon('lock'), 'Where you live, your password, your phone number.'),
            step(W.sent('my favourite colour'), 'Safe to share.'),
            step(W.means('screen', 'You won a prize! Click here!'), 'Do not click.'),
            step(W.icon('people'), 'Not sure? Ask a grown-up.')
          ],
          guided: [T(privateInfo, 1), T(whatToDo, 1), T(privateOne, 1)],
          check: [T(privateInfo, 2), T(whatToDo, 2), privateTf, T(privateOne, 2), T(whatToDo, 2)],
          coach: '<p>Make a family rule together: "I ask before I type my name or click anything new." Put it beside the device.</p>',
          mistake: '<p>Thinking a friendly stranger is safe. Online, anyone you do not know in real life is a stranger.</p>' },
        { slug: 'ask-first', title: 'Ask first', exp: ['A2.1'], skill: 'ask-first',
          model: [
            step(W.means('people', 'A photo of a friend?'), 'Ask them first.'),
            step(W.means('talk', 'Is it okay if I post this photo?')),
            step(W.means('screen', 'A picture from online?'), 'Ask a grown-up if you may use it.'),
            step(W.means('talk', 'May I use this picture?'))
          ],
          guided: [T(askFirst, 1), askWords, T(askWho, 1)],
          check: [T(askFirst, 2), askTf, T(askWho, 2), askWords, T(askFirst, 2)],
          coach: '<p>Practise the words together: "Is it okay if I...?"</p>',
          mistake: '<p>Using someone else\'s photo or drawing as if it were yours.</p>' },
        { slug: 'kind', title: 'Be kind online', exp: ['A2.7'], skill: 'kind',
          model: [
            step(W.means('talk', 'Nice work on your volcano!'), 'Kind.'),
            step(W.means('talk', 'You can play with us!'), 'Everyone is welcome.'),
            step(W.means('talk', 'That looks bad.'), 'This hurts.'),
            step(W.means('talk', 'Maybe try a darker colour?'), 'Helpful, and kind.')
          ],
          guided: [T(kindComment, 1), T(kindPick, 1), T(kindFix, 1)],
          check: [T(kindComment, 2), kindTf, T(kindFix, 2), T(kindPick, 2), kindTf],
          coach: '<p>Before sending a message, ask: "Would I say this to their face?"</p>',
          mistake: '<p>Joining in when others are unkind. Tell a grown-up instead.</p>' }
      ]
    }, {
      id: 'media-smart', title: 'Media smart', sub: 'Trust, kinds of media, ads and design.',
      concepts: [
        { slug: 'trust', title: 'Can I trust it?', exp: ['A2.3'], skill: 'trust',
          model: [
            step(W.icon('read'), 'A library book: written by someone who knows.'),
            step(W.icon('screen'), 'A comment from a stranger: maybe a guess.'),
            step(W.means('think', 'Who made it?')),
            step(W.means('think', 'How do they know?'))
          ],
          guided: [T(trust, 1), T(trustAsk, 1), trustTf],
          check: [T(trust, 2), T(trustPick, 2), trustTf, T(trustAsk, 2), T(trust, 2)],
          coach: '<p>When you look something up together, ask: "Who made this? How do they know?"</p>',
          mistake: '<p>Believing something because it is online.</p>' },
        { slug: 'forms', title: 'Kinds of media', exp: ['A2.4'], skill: 'forms',
          model: [
            step(W.icon('screen'), 'A video: moving pictures and sound.'),
            step(W.icon('star'), 'A poster: a big title and a picture.'),
            step(W.sent('Pancakes $6.00. Soup $4.50.'), 'A menu: food and prices.'),
            step(W.sent('Kai: "Look out!" Mei: "Too late!"'), 'A comic: speech bubbles.')
          ],
          guided: [T(formWhat, 1), T(formName, 1), T(matchMedia, 1)],
          check: [T(matchMedia, 2), formTf, T(formName, 2), T(formWhat, 2), formTf],
          coach: '<p>Spot media on an outing: signs, posters, menus, screens.</p>',
          mistake: '<p>Not noticing ads among other media.</p>' },
        { slug: 'ads', title: 'What does an ad want?', exp: ['A2.5'], skill: 'ads',
          model: [
            step(adOf(ADS[0]), 'Someone made this to sell shoes.'),
            step(W.sent('They make you run SO fast!'), 'A big promise. Is it true?'),
            step(adOf(ADS[5]), 'Who made it? The people who sell mittens.'),
            step(W.sent('Your hands will NEVER get cold!'), 'Never? Think about it.')
          ],
          guided: [T(adWants, 1), adTrick, adWho],
          check: [T(adWants, 2), adTf, adTrick, adWho, adTf],
          coach: '<p>Look at a cereal box together. Ask: who made it, who is it for, and what does it want?</p>',
          mistake: '<p>Believing every promise in an ad.</p>' },
        { slug: 'design', title: 'Plan, make, test, improve', exp: ['A2.6'], skill: 'design',
          model: [
            step(W.icon('think'), 'Plan: what is the problem?'),
            step(W.icon('screen'), 'Make it on paper or a device.'),
            step(W.icon('people'), 'Test it: show someone.'),
            step(W.icon('again'), 'Improve it: fix one thing.')
          ],
          guided: [design, designStep, designNext],
          check: [designStep, design, designTf, designNext, designStep],
          coach: '<p>Make a simple sign for home on a tablet or on paper, show it to someone, and change one thing.</p>',
          mistake: '<p>Stopping after the first try. Testing shows what to fix.</p>' }
      ]
    }],
    practice: [
      { id: 'private', name: 'Keep it private', code: 'A2.2', gen: privateInfo },
      { id: 'ask-first', name: 'Ask first', code: 'A2.1', gen: askFirst },
      { id: 'kind', name: 'Be kind online', code: 'A2.7', gen: kindComment },
      { id: 'trust', name: 'Can I trust it?', code: 'A2.3', gen: trust },
      { id: 'forms', name: 'Kinds of media', code: 'A2.4', gen: matchMedia },
      { id: 'ads', name: 'What ads want', code: 'A2.5', gen: adWants },
      { id: 'design', name: 'Design steps', code: 'A2.6', gen: designStep }
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
    private: [[1, 'what-to-do', whatToDo], [1, 'one', privateOne], [1, 'tf', privateTf]],
    'ask-first': [[1, 'who', askWho], [1, 'words', askWords], [1, 'tf', askTf]],
    kind: [[1, 'pick', kindPick], [1, 'fix', kindFix], [1, 'tf', kindTf]],
    trust: [[1, 'ask', trustAsk], [1, 'tf', trustTf], [2, 'pick', trustPick]],
    forms: [[1, 'what', formWhat], [1, 'name', formName], [1, 'tf', formTf]],
    ads: [[1, 'trick', adTrick], [1, 'who', adWho], [1, 'tf', adTf]],
    design: [[1, 'order', design], [1, 'next', designNext], [1, 'tf', designTf]]
  });
})();
