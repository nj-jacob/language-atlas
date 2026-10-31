/* Grade 4: media and online life.
   Ontario 2023 Language, Grades 4 to 6, A2 Digital Media Literacy:
   A2.1 rights, responsibilities and digital identity, with permission           A2.2 safety, privacy, personal data and well-being
   A2.3 gathering and evaluating information: validity, credibility, accuracy    A2.4 forms, conventions and techniques of media texts
   A2.5 form, message, context, audience and purpose                            A2.6 digital and media tools in the design process
   A2.7 communicating and collaborating online safely, respectfully and inclusively
   Every ad, post and source below is made up for this site. Answer checks: tests/verify/grade4-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- digital identity, privacy and respect ---------- */
  var PROUD = ['a photo of the birdhouse I built', 'a kind comment on a friend’s story', 'my poem on the class blog'];
  var REGRET = ['a mean joke about a classmate', 'a photo of a friend, without asking', 'an angry post when I was upset'];
  /* [what happens, the best thing to do, other choices] */
  var SAFE = [['A website asks you to make an account.', 'Ask a grown-up before you sign up.', ['Sign up with your full name and address.', 'Use a friend’s account.']],
    ['A pop-up says you won a free tablet.', 'Close it. It is a trick.', ['Click it to claim the prize.', 'Type in your address.']],
    ['You have been on a screen for two hours.', 'Take a break and move your body.', ['Keep going until bedtime.', 'Switch to a different screen.']],
    ['A classmate is being teased in a group chat.', 'Do not join in, and tell a trusted adult.', ['Add a laughing emoji.', 'Forward it to others.']],
    ['You want to use a photo you found online.', 'Check that you have permission to use it.', ['Use it and say you took it.', 'Use it, because online photos are free.']]];
  var STRONG = ['Maple!Trail-42', 'Blue#Canoe-19', 'Lake7Moose!Run'], WEAK = ['password', 'ava2015', 'qwerty'];
  var KIND = ['I like the colours. How did you make the sky?', 'Great idea! Could you add a title?', 'Thanks for sharing. The ending surprised me.'];
  var RUDE = ['THIS IS WRONG!!!', 'lol that is weird', 'Nobody asked.'];
  /* [a statement about acting online, true or false] */
  var RESPECT = [['Typing in ALL CAPS can read like shouting.', true], ['It is fine to share a screenshot of a private chat.', false],
    ['If someone writes in another language, you can kindly ask what it means.', true], ['Online, it is fine to say things you would not say in person.', false],
    ['A video call with a classmate needs a grown-up’s okay first.', true]];

  function footprint() {
    return Q.all('Pick every post you would be <b>proud of</b> later.', R.some(PROUD, 2), R.some(REGRET, 2), { prompt: 'Would you be happy if your teacher saw it in five years?',
      hint: 'Posts are hard to take back. Is it kind? Did everyone in it agree?', explain: 'What you post builds your digital identity.', meta: { k: 'g4-footprint' } });
  }
  function whatToDo(lv) {
    var s = R.pick(SAFE);
    return Q.one('What should you do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', s[0]), prompt: 'Is it safe? Is it kind? Do you need permission?',
      hint: 'When you are not sure, stop and ask a grown-up.', explain: s[1], meta: { k: 'g4-what-to-do', s: s[0] } });
  }
  function password(lv) {
    return Q.one('Which password is the <b>strongest</b>?', R.pick(STRONG), R.some(WEAK, lv > 1 ? 3 : 2), { hint: 'Strong passwords are long and mix letters, numbers and symbols.',
      explain: 'Long, with numbers and symbols, and not your name.', meta: { k: 'g4-password' } });
  }
  function reply(lv) {
    return Q.one(Q.name() + ' posts a drawing in the class space. Which reply is <b>respectful</b>?', R.pick(KIND), R.some(RUDE, lv > 1 ? 2 : 1), {
      hint: 'Would you say it face to face?', explain: 'Kind, specific, and maybe a question.', meta: { k: 'g4-reply' } });
  }
  function respectTf() {
    var r = R.pick(RESPECT);
    return { q: 'True or false?', fig: W.sent(r[0]), type: 'tf', answer: r[1], hint: 'Treat people online the way you would in person.',
      explain: r[1] ? 'True.' : 'False.', meta: { k: 'g4-respect-tf', s: r[0] } };
  }

  /* ---------- sources, techniques, message and design ---------- */
  /* [what you want to know, a credible source, a weaker one] */
  var TRUST = [['the weather this weekend', 'Environment Canada', 'a guess on a fan page'], ['the population of Ontario', 'Statistics Canada', 'a post from someone you do not know'],
    ['the history of the Métis Nation', 'the Métis Nation’s own website', 'a quiz app with no author'], ['how black bears hibernate', 'a provincial park website', 'an old blog with no author'],
    ['how to care for a turtle', 'a guide from a vet clinic', 'an ad from a pet toy company']];
  var GOODCHECK = ['Do other trusted sources say the same?', 'Who made it, and do they know the topic?', 'When was it written?'];
  var BADCHECK = ['Does it have bright colours?', 'Does it have lots of likes?', 'Was it the first result?'];
  var FACTS = ['Lake Superior is the largest of the Great Lakes.', 'Monarch butterflies fly to Mexico for the winter.', 'Ottawa is the capital of Canada.'];
  var OPINIONS = ['Hockey is the most exciting sport.', 'Winter is the best season.', 'Blue is the nicest colour.'];
  /* [the trick, in plain words; a line that uses it] */
  var TRICK = [['everyone has it', 'Everyone has one!'], ['an expert says so', 'Dentists choose it.'], ['saying it again', 'Crunch! Crunch! Crunch!'],
    ['hurry, it ends soon', 'Only today!'], ['a free gift', 'A free toy inside!']];
  /* made-up ads and posters: [lines, who it is for, what it is for] */
  var TEXTS = [[['ZOOM SCOOTER', 'The fastest ride to the park!', 'Ages 8 to 12'], 'kids', 'to sell something'],
    [['Slow down near schools', 'Children walk here.', 'Town of Riverside'], 'drivers', 'to keep people safe'],
    [['Book swap!', 'Bring a book, take a book.', 'Library, Saturday at 10 a.m.'], 'families in town', 'to invite people to an event'],
    [['Did you know?', 'A beaver can stay underwater for 15 minutes.', 'Ontario Nature Club'], 'people curious about nature', 'to teach a fact']];
  var DESIGN = ['Find the problem.', 'Brainstorm ideas.', 'Make a first version.', 'Test it with people.', 'Make it better.'];

  function trust(lv) {
    var t = R.pick(TRUST);
    return Q.one('You want facts about <b>' + t[0] + '</b>. Which source is more <b>credible</b>?', t[1], [t[2]].concat(lv > 1 ? [R.pick(TRUST.filter(function (x) { return x !== t; }))[2]] : []), {
      prompt: 'Who made it? Do they know the topic?', hint: 'Credible sources are made by people who study or live the topic.', explain: W.sent(t[1]), meta: { k: 'g4-trust', about: t[0] } });
  }
  function checks() {
    return Q.all('Pick every question that helps you check if information is <b>accurate</b>.', R.some(GOODCHECK, 2), R.some(BADCHECK, 2), {
      hint: 'Looks and likes do not make something true.', explain: 'Who made it, when, and do others agree?', meta: { k: 'g4-checks' } });
  }
  function factTf() {
    var fact = R.int(0, 1) === 1, s = fact ? R.pick(FACTS) : R.pick(OPINIONS);
    return { q: 'Is this a <b>fact</b> you could check?', fig: W.sent(s), type: 'tf', answer: fact,
      why: { options: ['You can look it up and prove it.', 'It is what someone thinks or feels.'], answer: fact ? 0 : 1 }, hint: 'Could you prove it?', explain: fact ? 'A fact.' : 'An opinion.', meta: { k: 'g4-fact-tf', s: s } };
  }
  function technique(lv) {
    var t = R.pick(TRICK);
    return Q.one('Which trick is this ad using?', t[0], R.some(TRICK.filter(function (x) { return x !== t; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), { fig: W.sent(t[1]),
      hint: 'How is it trying to get you to buy?', explain: W.sent(t[1]) + ' <b>' + t[0] + '</b>', meta: { k: 'g4-technique', line: t[1] } });
  }
  function trickMatch() {
    var t = R.some(TRICK, 3);
    return { q: 'Match each ad line to its trick.', type: 'match', pairs: t.map(function (x) { return [x[1], x[0]]; }), hint: 'Read each line like a buyer.', explain: 'Ads use tricks to make you want things.', meta: { k: 'g4-trick-match' } };
  }
  function audienceOf(lv) {
    var t = R.pick(TEXTS);
    return Q.one('Who is this for?', t[1], R.some(TEXTS.filter(function (x) { return x !== t; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), { fig: W.passage('', t[0]),
      hint: 'Who would stop and read it?', explain: 'For <b>' + t[1] + '</b>.', meta: { k: 'g4-ad-audience', first: t[0][0] } });
  }
  function purposeOf() {
    var t = R.pick(TEXTS), others = TEXTS.map(function (x) { return x[2]; }).filter(function (x, i, a) { return x !== t[2] && a.indexOf(x) === i; });
    return Q.one('What is it for?', t[2], R.some(others, 2), { fig: W.passage('', t[0]), hint: 'What does the maker want you to do or know?', explain: '<b>' + t[2] + '</b>', meta: { k: 'g4-ad-purpose', first: t[0][0] } });
  }
  function design() {
    return { q: 'Put the design steps in order.', type: 'order', items: DESIGN.slice(), first: 'First', last: 'Last', hint: 'You cannot test what you have not made.', explain: 'Find, brainstorm, make, test, improve.', meta: { k: 'g4-design-steps' } };
  }
  function nextStep() {
    var i = R.int(0, DESIGN.length - 2);
    return Q.one('You just did this. What comes next?', DESIGN[i + 1], R.some(DESIGN.filter(function (x, j) { return j !== i + 1 && j !== i; }), 2), { fig: W.sent(DESIGN[i]),
      hint: 'Find, brainstorm, make, test, improve.', explain: W.sent(DESIGN[i + 1]), meta: { k: 'g4-next-step', done: DESIGN[i] } });
  }

  Atlas.register('media', {
    lessons: [{
      id: 'online', title: 'Your online self', sub: 'Identity, privacy and respect.',
      concepts: [
        { slug: 'footprint', title: 'Post what you will be proud of', exp: ['A2.1'], skill: 'online',
          model: [
            step(W.icon('screen'), 'Every post leaves a trail.'),
            step(W.sent('a photo of the birdhouse I built'), 'Something to be proud of.'),
            step(W.sent('a mean joke about a classmate'), 'Hard to take back.'),
            step(W.icon('people'), 'About someone else? Ask them first.')
          ],
          guided: [footprint, function () { return whatToDo(1); }],
          check: [footprint, function () { return whatToDo(2); }],
          coach: '<p>Search your own name together (with care) and talk about what a stranger could learn. Model asking before you post a photo of the child.</p>',
          mistake: '<p>Thinking a deleted post is gone. Others may have saved or shared it.</p>' },
        { slug: 'privacy', title: 'Guard your privacy and well-being', exp: ['A2.2'], skill: 'online',
          model: [
            step(W.icon('lock') + W.sent('Maple!Trail-42'), 'Long, with numbers and symbols.'),
            step(W.sent('You won a free tablet!'), 'A trick to get your details. Close it.'),
            step(W.icon('screen'), 'Two hours? Take a break.')
          ],
          guided: [function () { return password(1); }, function () { return whatToDo(1); }],
          check: [function () { return password(2); }, function () { return whatToDo(2); }],
          coach: '<p>Set up privacy settings on one app together. Agree on family screen-time breaks.</p>',
          mistake: '<p>Using the same easy password everywhere, or sharing it with a friend.</p>' },
        { slug: 'respect', title: 'Be respectful in every online space', exp: ['A2.7'], skill: 'online',
          model: [
            step(W.sent('THIS IS WRONG!!!'), 'All caps reads like shouting.'),
            step(W.sent('I like the colours. How did you make the sky?'), 'Kind, with a question.'),
            step(W.icon('people'), 'Someone teased? Do not join in. Tell an adult.')
          ],
          guided: [function () { return reply(1); }, respectTf],
          check: [function () { return reply(2); }, respectTf],
          coach: '<p>Talk about how people from different cultures and languages share one online space. Curiosity and kindness come first.</p>',
          mistake: '<p>Forgetting there is a real person reading the message.</p>' }
      ]
    }, {
      id: 'media-smart', title: 'Media smart', sub: 'Sources, ad tricks, message and design.',
      concepts: [
        { slug: 'sources', title: 'Check before you trust', exp: ['A2.3'], skill: 'media-smart',
          model: [
            step(W.icon('think'), 'Who made it? Do they know the topic?'),
            step(W.icon('read'), 'When was it written?'),
            step(W.icon('again'), 'Do other sources agree?')
          ],
          guided: [function () { return trust(1); }, checks],
          check: [function () { return trust(2); }, factTf],
          coach: '<p>When you look something up together, find the same fact in two trusted places before using it.</p>',
          mistake: '<p>Trusting a page because it looks nice or has lots of likes.</p>' },
        { slug: 'tricks', title: 'Spot the tricks in ads', exp: ['A2.4'], skill: 'media-smart',
          model: [
            step(W.sent('Everyone has one!'), 'Join the crowd.'),
            step(W.sent('Only today!'), 'Hurry.'),
            step(W.sent('A free toy inside!'), 'A gift to pull you in.')
          ],
          guided: [function () { return technique(1); }, function () { return technique(1); }],
          check: [trickMatch, function () { return technique(2); }],
          coach: '<p>During a show, pause on an ad and name the trick together. Also notice the music, colours and close-ups.</p>',
          mistake: '<p>Believing "Everyone has one!" is a fact.</p>' },
        { slug: 'message', title: 'Who is it for, and why?', exp: ['A2.5'], skill: 'message-design',
          model: [
            step(W.passage('', TEXTS[0][0])),
            step(W.sent('Ages 8 to 12'), 'For kids.'),
            step(W.sent('The fastest ride to the park!'), 'To sell a scooter.')
          ],
          guided: [function () { return audienceOf(1); }, purposeOf],
          check: [function () { return audienceOf(2); }, purposeOf],
          coach: '<p>Compare a cereal box and a road sign: different audience, purpose and place, so a different form.</p>',
          mistake: '<p>Missing the audience clues: ages, places, pictures and words chosen for a group.</p>' },
        { slug: 'design', title: 'Design to solve a real problem', exp: ['A2.6'], skill: 'message-design',
          model: [
            step(W.icon('think'), 'Find the problem.'),
            step(W.icon('star'), 'Brainstorm, then make a first version.'),
            step(W.icon('people'), 'Test it with people.'),
            step(W.icon('again'), 'Make it better.')
          ],
          guided: [design, nextStep],
          check: [design, nextStep],
          coach: '<p>Try the design challenge in this chapter. Let the child choose the digital tool, and ask why it fits.</p>',
          mistake: '<p>Skipping the test. Real users always find something to improve.</p>' }
      ]
    }],
    practice: [
      { id: 'online', name: 'Your online self', code: 'A2.1, A2.2, A2.7', gen: footprint },
      { id: 'media-smart', name: 'Sources and ad tricks', code: 'A2.3, A2.4', gen: trust },
      { id: 'message-design', name: 'Message and design', code: 'A2.5, A2.6', gen: audienceOf }
    ],
    tasks: [
      { id: 'design-challenge', title: 'Design challenge', code: 'A2.6', pic: W.icon('screen'), say: 'Use a digital tool to solve a real problem at home or school.',
        run: ['Pick a real problem: a messy shoe area, forgetting the recycling, younger kids not knowing the bus rules.', 'The child chooses a tool (slides, a video, a poster app), makes a first version, tests it with a family member, and improves it.'],
        rubric: ['No plan; unfinished.', 'Makes something; skips testing.', 'Follows the design steps and improves it after testing.', 'A clear, well-tested solution, and explains why the tool fit.'] },
      { id: 'make-an-ad', title: 'Make an ad, then explain it', code: 'A2.5', pic: W.icon('screen'), say: 'Make an ad for something you love. Use one trick. Then explain who it is for.',
        run: ['The child picks a product or event (real or made up) and an audience.', 'They make a short ad on paper or a device using one trick, then explain the form, audience and purpose.'],
        rubric: ['No audience or trick yet.', 'An ad with an audience; cannot name the trick.', 'An ad that uses a trick on purpose and fits its audience.', 'A convincing ad, and explains how form, message and audience fit together.'] },
      { id: 'online-together', title: 'Work together online', code: 'A2.7', pic: W.icon('people'), say: 'With a grown-up’s okay, work on something with someone far away.',
        run: ['Choose a safe tool and a trusted partner: a cousin, grandparent or pen pal class.', 'Make something together (a shared story or a slide show). Talk about kind comments and respecting each other’s culture and language.'],
        rubric: ['Needs reminders to be safe or kind.', 'Takes part with help.', 'Shares ideas safely and respectfully.', 'Collaborates well, respects differences, and helps the other person join in.'] }
    ]
  });

  Q.shapes('media', {
    online: [[1, 'what-to-do', whatToDo], [1, 'password', password], [1, 'reply', reply], [1, 'true-false', respectTf]],
    'media-smart': [[1, 'checks', checks], [1, 'fact', factTf], [1, 'trick', technique], [1, 'trick-match', trickMatch]],
    'message-design': [[1, 'purpose', purposeOf], [1, 'design', design], [1, 'next-step', nextStep]]
  });
})();
