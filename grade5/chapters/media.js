/* Grade 5: media and online life.
   Ontario 2023 Language, Grades 4 to 6, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online with permission, and a positive digital identity     A2.2 navigating safely, managing privacy and personal data
   A2.3 gathering and evaluating information for validity, credibility, accuracy and perspective   A2.4 forms, conventions and techniques of media texts, and their impact on the audience
   A2.5 how form, message, audience and purpose fit together       A2.7 communicating and collaborating online safely, respectfully and inclusively
   With a grown-up: A2.6 using digital tools in a design process to solve a real problem.
   All examples are written for this site. Answer checks: tests/verify/grade5-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [what is happening online, the responsible choice, choices that are not] */
  var PERMIT = [['You took a funny photo of your friend.', 'Ask your friend before you post it.', ['Post it right away.', 'Post it, and tag everyone.']],
    ['You want to use a song in your class video.', 'Use music you have permission to use.', ['Use any song you find.', 'Copy a song and say you made it.']],
    ['A game asks you to make an account.', 'Ask a grown-up first.', ['Sign up with your full name.', 'Use your friend' + AP + 's account.']],
    ['You want to share a classmate' + AP + 's drawing online.', 'Ask them, and name them as the artist.', ['Share it as your own.', 'Share it without asking.']]];
  var PRIVATE = ['your home address', 'your password', 'your birthday', 'your phone number', 'your school' + AP + 's name'];
  var OKSHARE = ['your favourite book', 'what you think of a movie', 'a drawing of a dragon'];
  /* [what someone posted, a respectful reply, replies that are not] */
  var REPLY = [['I made bannock for the first time!', 'That looks delicious. How did you make it?', ['Ew, gross.', 'Mine is way better.']],
    ['Here is my science fair project.', 'Cool idea! What was the hardest part?', ['Boring.', 'Who cares?']],
    ['I am learning to speak Tagalog.', 'That is great. Can you teach me a word?', ['Why would you learn that?', 'That language is weird.']],
    ['Our team lost the final.', 'You played hard. Next time!', ['You are all terrible.', 'Ha ha, losers.']]];
  /* [an ad line, the technique it uses] */
  var TECH = [['Everyone at school has one. Do not be left out!', 'everyone is doing it'], ['Hockey star Jada Moore drinks Zoom Juice!', 'a famous person'],
    ['Only $9.99, but only for today!', 'hurry, it will run out'], ['Crunchy, munchy, Choco-Bunchy!', 'a catchy rhyme'], ['9 out of 10 kids love it!', 'a number that sounds impressive']];
  var TECHS = ['everyone is doing it', 'a famous person', 'hurry, it will run out', 'a catchy rhyme', 'a number that sounds impressive'];
  /* [a media text, who it is made for, why it was made] */
  var MEDIA = [['a cereal ad during a cartoon', 'children', 'to sell cereal'], ['a poster about a flu shot clinic', 'families', 'to inform about health'],
    ['a trailer for a new movie', 'people who might watch it', 'to get people to see the movie'], ['a town sign about a park clean-up', 'neighbours', 'to get people to help']];
  /* [a claim you read online, the best way to check it] */
  var CHECK = ['See if trusted sources say the same thing.', 'Check who wrote it and when.', 'Look for facts, not just opinions.'];
  var NOCHECK = ['Believe it because it has many likes.', 'Share it right away.', 'Trust it because the picture looks real.'];

  /* ---------- question makers ---------- */
  function permission(lv) {
    var p = R.pick(PERMIT);
    return Q.one('What is the responsible choice?', p[1], p[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', p[0]), prompt: 'Whose permission do you need?',
      hint: 'Ask before you share what belongs to someone else.', explain: p[1], meta: { k: 'g5-permission', s: p[0] } });
  }
  function privateData() {
    return Q.all('Pick every piece of <b>personal data</b> to keep private online.', R.some(PRIVATE, 2), R.some(OKSHARE, 2), { hint: 'Could a stranger use it to find you or get into your account?',
      explain: 'Keep addresses, passwords, birthdays, phone numbers and school names private.', meta: { k: 'g5-private' } });
  }
  function reply(lv) {
    var r = R.pick(REPLY);
    return Q.one('Which reply is respectful?', r[1], r[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', r[0]), prompt: 'Would you say it to their face?',
      hint: 'Respectful replies are kind and curious, even when you disagree.', explain: r[1], meta: { k: 'g5-reply', post: r[0] } });
  }
  function footprint() {
    var right = R.int(0, 1) === 1, said = right ? 'What I post online can stay there for a long time.' : 'Anything I post online disappears forever when I delete it.';
    return { q: 'True or false?', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Posts can be copied and saved by others.', 'Deleting always removes every copy.'], answer: 0 },
      hint: 'Can someone take a screenshot?', explain: 'Your posts build your digital identity. Think before you post.', meta: { k: 'g5-footprint', said: said } };
  }

  function technique(lv) {
    var t = R.pick(TECH);
    return Q.tiles('What technique does this ad use?', t[1], R.some(TECHS.filter(function (x) { return x !== t[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(t[0]), hint: 'How is it trying to get you to buy?',
      explain: 'It uses <b>' + t[1] + '</b>.', meta: { k: 'g5-technique', ad: t[0] } });
  }
  function audience() {
    var m = R.pick(MEDIA);
    return Q.tiles('Who is <b>' + m[0] + '</b> made for?', m[1], MEDIA.filter(function (x) { return x !== m; }).map(function (x) { return x[1]; }).slice(0, 2), {
      hint: 'Who would see it? Who is it trying to reach?', explain: 'It is made for <b>' + m[1] + '</b>.', meta: { k: 'g5-media-audience', m: m[0] } });
  }
  function purpose() {
    var m = R.pick(MEDIA);
    return Q.one('Why was <b>' + m[0] + '</b> made?', m[2], MEDIA.filter(function (x) { return x !== m; }).map(function (x) { return x[2]; }).slice(0, 2), {
      hint: 'What does the maker want you to do?', explain: m[2], meta: { k: 'g5-media-purpose', m: m[0] } });
  }
  function checkClaim() {
    return Q.all('You read something surprising online. Pick every good way to <b>check</b> it.', R.some(CHECK, 2), R.some(NOCHECK, 2), { hint: 'Likes and shares do not make something true.',
      explain: 'Check the source, the date and other trusted sources.', meta: { k: 'g5-check' } });
  }

  Atlas.register('media', {
    lessons: [{
      id: 'online', title: 'Being safe and responsible online', sub: 'Permission, privacy and respect.',
      concepts: [
        { slug: 'permission', title: 'Ask before you share', exp: ['A2.1'], skill: 'online',
          model: [
            step(W.means('screen', 'A funny photo of a friend'), 'It is about them.'),
            step(W.means('people', 'Can I post this?'), 'So ask first.'),
            step(W.icon('star'), 'Each post adds to your <b>digital identity</b>.')
          ],
          guided: [function () { return permission(1); }, footprint],
          check: [function () { return permission(2); }, footprint],
          coach: '<p>Make a family rule: we ask before we post a photo of anyone, including each other.</p>',
          mistake: '<p>Thinking a photo is yours to share because you took it. If someone is in it, ask them.</p>' },
        { slug: 'privacy', title: 'Keep personal data private', exp: ['A2.2'], skill: 'online',
          model: [
            step(W.icon('lock'), 'Address, password, birthday, phone number.'),
            step(W.means('screen', 'An app asks for your location.'), 'Ask a grown-up. Say no if it does not need it.'),
            step(W.sent('your favourite book'), 'Fine to share.')
          ],
          guided: [privateData, privateData],
          check: [privateData, privateData],
          coach: '<p>Go through the privacy settings on a family device together. Turn off location for apps that do not need it.</p>',
          mistake: '<p>Using the same easy password everywhere. Use a long one, and never share it with friends.</p>' },
        { slug: 'respect', title: 'Be respectful online', exp: ['A2.7'], skill: 'online',
          model: [
            step(W.means('screen', 'I am learning to speak Tagalog.'), 'Someone shares.'),
            step(W.sent('That language is weird.'), 'Hurtful. It shames their culture.'),
            step(W.sent('That is great. Can you teach me a word?'), 'Kind and curious.')
          ],
          guided: [function () { return reply(1); }, function () { return reply(1); }],
          check: [function () { return reply(2); }, function () { return reply(2); }],
          coach: '<p>Use the "face test": would you say it to the person' + AP + 's face, with their grandparent beside them?</p>',
          mistake: '<p>Joining in when others pile on. Stay out, or say something kind.</p>' }
      ]
    }, {
      id: 'media-sense', title: 'Thinking about media', sub: 'Checking information, and how media tries to persuade.',
      concepts: [
        { slug: 'check', title: 'Check before you believe', exp: ['A2.3'], skill: 'media-sense',
          model: [
            step(W.means('screen', 'Moose can fly! 10 000 likes!'), 'Likes do not make it true.'),
            step(W.icon('think'), 'Who wrote it? When?'),
            step(W.icon('read'), 'Do trusted sources say the same?')
          ],
          guided: [checkClaim, checkClaim],
          check: [checkClaim, checkClaim],
          coach: '<p>When a surprising "fact" comes up, look it up together on two trusted sites, such as a museum or a government site.</p>',
          mistake: '<p>Trusting a photo because it looks real. Pictures can be edited or made by computers.</p>' },
        { slug: 'techniques', title: 'Ads use tricks to persuade', exp: ['A2.4'], skill: 'media-sense',
          model: [
            step(W.sent('Everyone has one. Do not be left out!'), 'Everyone is doing it.'),
            step(W.sent('Hockey star Jada Moore drinks Zoom Juice!'), 'A famous person.'),
            step(W.sent('Only for today!'), 'Hurry, it will run out.')
          ],
          guided: [function () { return technique(1); }, function () { return technique(1); }],
          check: [function () { return technique(2); }, function () { return technique(2); }],
          coach: '<p>During a commercial break, play "spot the trick". Name the technique, then ask: "Does it make you want it?"</p>',
          mistake: '<p>Believing a famous person really uses the product. They are often paid to say so.</p>' },
        { slug: 'audience', title: 'Every media text has an audience and a purpose', exp: ['A2.5'], skill: 'media-sense',
          model: [
            step(W.sent('a cereal ad during a cartoon'), 'Made for children.'),
            step(W.sent('to sell cereal'), 'Made to sell.'),
            step(W.icon('think'), 'The form fits them: bright, fast, fun.')
          ],
          guided: [audience, purpose],
          check: [audience, purpose],
          coach: '<p>Pick any ad, sign or video and ask three questions: Who made it? Who is it for? What do they want?</p>',
          mistake: '<p>Thinking media is just there for fun. Almost every media text wants something from its audience.</p>' }
      ]
    }],
    practice: [
      { id: 'online', name: 'Safe and responsible online', code: 'A2.1, A2.2, A2.7', gen: permission },
      { id: 'media-sense', name: 'Thinking about media', code: 'A2.3, A2.4, A2.5', gen: technique }
    ],
    tasks: [
      { id: 'design', title: 'Design a solution', code: 'A2.6', pic: W.icon('screen'), say: 'Use a digital tool to solve a real problem at home or school.',
        run: ['Choose a real problem together: a messy shoe area, a busy crosswalk, too much food waste at lunch.',
          'The child plans a solution, then uses a digital tool (slides, a drawing app, a video, a poster maker) to design and share it.', 'Ask for feedback, improve the design once, and share it again.'],
        rubric: ['No plan yet.', 'A plan with help; the tool is not used well yet.', 'A clear solution, designed and shared with a fitting digital tool.', 'A creative solution, improved after feedback, with a tool chosen for a reason.'] }
    ]
  });

  Q.shapes('media', {
    online: [[1, 'private', privateData], [1, 'reply', reply], [1, 'footprint', footprint]],
    'media-sense': [[1, 'audience', audience], [1, 'purpose', purpose], [1, 'check', checkClaim]]
  });
})();
