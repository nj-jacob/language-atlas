/* Grade 7: media and online life.
   Ontario 2023 Language, Grades 7 and 8, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online, and a positive digital identity      A2.2 safety, privacy, personal data and security, and well-being
   A2.3 research with a focus on misinformation, disinformation and curated information, respecting legal and ethical considerations
   A2.4 forms, conventions and techniques of media texts and their impact        A2.5 form, message and context, intended and unintended audiences, and purpose
   A2.6 digital tools in the design process, proposing solutions                  A2.7 communicating and collaborating safely, respectfully and inclusively, with cultural awareness
   All examples (accounts, posts and ads) are made up for this site. Answer checks: tests/verify/grade7-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- digital identity and security ---------- */
  /* [situation, the responsible choice, other choices] */
  var CHOICE = [['A friend sends you a funny photo of another classmate.', 'Do not share it without the classmate' + '’' + 's permission.', ['Post it in the group chat.', 'Share it, since it is only a joke.']],
    ['You are angry about a game and want to post about it.', 'Wait until you are calm, then decide if it is worth posting.', ['Post right away while you still feel it.', 'Post it, then delete it later.']],
    ['A website asks for your birthday, address and school to enter a contest.', 'Ask a parent first; it may be collecting personal data.', ['Fill it in to win.', 'Use a friend' + '’' + 's details instead.']],
    ['You see someone being mocked in the comments of a video.', 'Report the comments, and support the person if it is safe.', ['Add a laughing emoji.', 'Join in so you fit in.']]];
  function responsible(lv) {
    var c = R.pick(CHOICE);
    return Q.one('What is the most responsible choice?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', c[0]), prompt: 'Who could this affect, now and later?',
      hint: 'Think about permission, kindness and your digital footprint.', explain: c[1], meta: { k: 'g7-responsible', s: c[0] } });
  }
  function footprintTf() {
    var right = R.int(0, 1) === 1, said = right ? 'Something I post can be copied and seen years from now.' : 'If I delete a post, it is gone forever.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Others can screenshot, save or share it.', 'Deleting removes every copy.'], answer: 0 },
      hint: 'Can someone save a post before you delete it?', explain: 'Your digital footprint can last. Post as if anyone could see it.', meta: { k: 'g7-footprint-tf', said: said } };
  }
  var STRONG = ['maple-canoe-7-river-lantern', 'Purple-Moose!Skates-42', 'quiet-cedar-blue-kettle-19'];
  var WEAK = ['password123', 'liam2013', 'qwerty', 'hockey'];
  function password(lv) {
    return Q.one('Which password is the <b>strongest</b>?', R.pick(STRONG), R.some(WEAK, lv > 1 ? 3 : 2), { hint: 'Long, hard to guess, and not your name or birthday.',
      explain: 'Long passphrases with mixed parts are hardest to crack.', meta: { k: 'g7-password' } });
  }
  var PHISH = ['The message says your account will close in one hour.', 'It asks you to click a link and enter your password.', 'The sender' + '’' + 's address has odd spelling, like "suport-team".'];
  var SAFE = ['It is from a teacher you know, about tomorrow' + '’' + 's class.', 'It does not ask for any personal details.', 'It is in your usual school portal, with no links.'];
  function phishing() {
    return Q.all('Pick every warning sign of a <b>phishing</b> message (a trick to steal your details).', R.some(PHISH, 2), R.some(SAFE, 2), {
      hint: 'Rushing you, asking for passwords, and odd senders are warning signs.', explain: 'Do not click. Tell a trusted adult and report it.', meta: { k: 'g7-phishing' } });
  }
  var SECURE = [['two-step verification', 'needs a code from your phone as well as your password'], ['app permissions', 'control what an app can see, such as your location'], ['privacy settings', 'control who can see your posts'], ['software updates', 'fix security holes']];
  function secureMatch() {
    var s = R.some(SECURE, 3);
    return { q: 'Match each tool to what it does.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Each one protects you in a different way.', explain: 'Layers of security protect your data.', meta: { k: 'g7-secure-match' } };
  }

  /* ---------- information ---------- */
  var INFO = [['misinformation', 'false information shared by mistake'], ['disinformation', 'false information spread on purpose to mislead'], ['curated information', 'information chosen and arranged for you by a person or an app']];
  var INFOEX = [['Your aunt shares a fake health tip, believing it is true.', 'misinformation'], ['A group invents a fake news story to make people distrust an election.', 'disinformation'],
    ['Your video app shows you more of what you already watch.', 'curated information'], ['A classmate repeats a wrong fact they heard, thinking it is right.', 'misinformation'],
    ['A fake account posts edited photos to stir up anger.', 'disinformation'], ['A news site' + '’' + 's front page shows the stories its editors picked.', 'curated information']];
  function infoKind() {
    var e = R.pick(INFOEX);
    return Q.tiles('Which is this?', e[1], INFO.map(function (x) { return x[0]; }).filter(function (x) { return x !== e[1]; }), { fig: W.means('screen', e[0]),
      hint: 'Mistake, on purpose, or chosen for you?', explain: '<b>' + e[1] + '</b>: ' + INFO.filter(function (x) { return x[0] === e[1]; })[0][1] + '.', meta: { k: 'g7-info-kind', s: e[0] } });
  }
  function infoMatch() {
    return { q: 'Match each term to what it means.', type: 'match', pairs: INFO.map(function (x) { return [x[0], x[1]]; }), hint: 'Mis- is a mistake. Dis- is deliberate.', explain: 'Know what you are looking at.', meta: { k: 'g7-info-match' } };
  }
  var CHECK = ['Search for the claim on other trusted sites.', 'Find out who made it and why.', 'Check the date.', 'Look for the original source of a photo.'];
  var NOCHECK = ['Share it first, check later.', 'Trust it because it has many likes.', 'Believe it because it matches what you think.'];
  function checkClaim() {
    return Q.all('A post makes a surprising claim. Pick every good way to <b>check</b> it.', R.some(CHECK, 2), R.some(NOCHECK, 2), { hint: 'Leave the post and look elsewhere.',
      explain: 'Read laterally: check other sources, the creator, the date and the original.', meta: { k: 'g7-check-claim' } });
  }
  /* legal and ethical use: [situation, the right choice, other choices] */
  var ETHICS = [['You want to use a photo you found online in your project.', 'Use one with permission or a Creative Commons licence, and credit it.', ['Use any photo, since it is online.', 'Crop out the photographer' + '’' + 's name.']],
    ['You want to use a song in your video.', 'Use music you have permission to use, and credit the artist.', ['Use any song if the video is short.', 'Say "no copyright intended".']],
    ['You copy a paragraph from an article into your report.', 'Put it in quotation marks and cite the source.', ['Change one or two words.', 'Leave it, since the teacher will not check.']]];
  function ethics(lv) {
    var e = R.pick(ETHICS);
    return Q.one('What is the legal and ethical choice?', e[1], e[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('lock', e[0]), hint: 'Creators own their work.', explain: e[1], meta: { k: 'g7-ethics', s: e[0] } });
  }

  /* ---------- media texts ---------- */
  var TECH = [['a low camera angle looking up at an athlete', 'makes them look powerful'], ['fast cuts and loud music', 'creates excitement'], ['"Everyone is switching to it!"', 'makes you feel left out (the bandwagon effect)'],
    ['a famous player holding the product', 'borrows the player' + '’' + 's trust (a testimonial)'], ['"Only three days left!"', 'pushes you to act quickly'], ['soft music and slow motion', 'creates a calm or sad mood']];
  function technique(lv) {
    var t = R.pick(TECH);
    return Q.one('What is the effect of <b>' + t[0] + '</b>?', t[1], R.some(TECH.filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'How does it make the audience feel or act?', explain: t[1] + '.', meta: { k: 'g7-media-technique', t: t[0] } });
  }
  function techMatch() {
    var ts = R.some(TECH, 3);
    return { q: 'Match each technique to its effect.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[1]]; }), hint: 'Picture an ad that uses each one.', explain: 'Every technique is a choice aimed at the audience.', meta: { k: 'g7-tech-match-media' } };
  }
  /* [a media text, its intended audience, an unintended audience] */
  var AUD = [['an ad for a sugary cereal shown during cartoons', 'young children', 'parents who worry about sugar'], ['a video made for a team' + '’' + 's fans', 'the team' + '’' + 's fans', 'rival fans who find it and mock it'],
    ['a private joke posted in a class group chat', 'close friends', 'the person the joke is about'], ['a poster for a seniors' + '’' + ' fitness class', 'older adults', 'teens walking past']];
  function audience(lv) {
    var a = R.pick(AUD), unintended = R.int(0, 1) === 1;
    return Q.tiles('For <b>' + a[0] + '</b>, who is the <b>' + (unintended ? 'unintended' : 'intended') + '</b> audience?', unintended ? a[2] : a[1], [unintended ? a[1] : a[2]], {
      hint: 'Intended: who the creator made it for. Unintended: who else might see it.', explain: 'Intended: ' + a[1] + '. Unintended: ' + a[2] + '.', meta: { k: 'g7-media-audience', t: a[0], un: unintended } });
  }

  function audienceTf() {
    var right = R.int(0, 1) === 1, said = right ? 'People the creator never planned for can still see a post.' : 'Only the people a post was made for will ever see it.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Posts can be shared far beyond the intended audience.', 'Apps only show posts to the right people.'], answer: 0 },
      hint: 'Can a post be forwarded or screenshotted?', explain: 'Every text has an intended audience, and often an unintended one too.', meta: { k: 'g7-audience-tf', said: said } };
  }

  /* ---------- design and collaboration ---------- */
  var DESIGN = ['Define the problem and who it affects.', 'Research what users need.', 'Brainstorm possible solutions.', 'Build a prototype.', 'Test it and gather feedback.', 'Propose the improved solution.'];
  function designOrder(lv) {
    var steps = lv > 1 ? DESIGN.slice() : [DESIGN[0], DESIGN[2], DESIGN[3], DESIGN[4]];
    return { q: 'Put the design process in order.', type: 'order', items: steps, first: 'First', last: 'Last', hint: 'Understand the problem before solving it; test before proposing.', explain: DESIGN.join(' &rarr; '), meta: { k: 'g7-design-order' } };
  }
  /* [situation online, respectful and inclusive response, others] */
  var COLLAB = [['Your group' + '’' + 's shared document: a teammate' + '’' + 's idea is different from yours.', 'Comment: “Interesting idea. Could we combine it with mine?”', ['Delete their paragraph.', 'Ignore it and keep writing.']],
    ['You want to use a First Nations design you saw online in your project.', 'Learn who it belongs to and ask permission, or choose something else.', ['Use it, since it looks nice.', 'Change the colours so it is yours.']],
    ['A new member of an online club writes in a mix of English and Tagalog.', 'Welcome them and ask how they would like to share.', ['Tell them to use English only.', 'Leave them out of the chat.']],
    ['In a video call, someone makes a joke about a classmate' + '’' + 's culture.', 'Say it is not okay, and check in with the classmate.', ['Laugh along.', 'Turn off your camera and say nothing.']]];
  function collab(lv) {
    var c = R.pick(COLLAB);
    return Q.one('What is the most respectful response?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', c[0]), hint: 'Safe, respectful, responsible and inclusive.', explain: c[1], meta: { k: 'g7-collab', s: c[0] } });
  }

  function designNext() {
    var i = R.int(0, DESIGN.length - 2);
    return Q.tiles('In the design process, what comes right after this step?', DESIGN[i + 1], R.some(DESIGN.filter(function (d, j) { return j !== i && j !== i + 1; }), 2), { fig: W.sent(DESIGN[i]),
      hint: 'Define, research, brainstorm, build, test, propose.', explain: DESIGN[i] + ' &rarr; <b>' + DESIGN[i + 1] + '</b>', meta: { k: 'g7-design-next', s: DESIGN[i] } });
  }
  function cultureTf() {
    var right = R.int(0, 1) === 1, said = right ? 'Before using a cultural symbol from another community, I should learn about it and ask permission.' : 'I can use any cultural symbol I find online if I change its colours.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Cultural symbols belong to their communities and carry meaning.', 'Anything online is free to use.'], answer: 0 },
      hint: 'Who does the symbol belong to?', explain: 'Show cultural awareness: learn, ask, and credit, or choose something else.', meta: { k: 'g7-culture-symbol-tf', said: said } };
  }

  Atlas.register('media', {
    lessons: [{
      id: 'identity', title: 'Your digital life', sub: 'Your footprint, permission and security.',
      concepts: [
        { slug: 'footprint', title: 'What you post can last', exp: ['A2.1'], skill: 'citizenship',
          model: [
            step(W.icon('screen'), 'A post, a comment, a photo.'),
            step(W.icon('again'), 'Others can save and share it.'),
            step(W.icon('people'), 'Others' + '’' + ' photos need their permission.')
          ],
          guided: [function () { return responsible(1); }, footprintTf],
          check: [function () { return responsible(2); }, footprintTf],
          coach: '<p>Search the child' + '’' + 's name together (with care) and talk about what a future coach or employer might see.</p>',
          mistake: '<p>Thinking private accounts are fully private. Followers can screenshot anything.</p>' },
        { slug: 'security', title: 'Protect your accounts and data', exp: ['A2.2'], skill: 'citizenship',
          model: [
            step(W.icon('lock'), 'A long passphrase: <b>quiet-cedar-blue-kettle-19</b>.'),
            step(W.means('screen', 'two-step verification'), 'A code from your phone too.'),
            step(W.means('not', '"Your account closes in one hour! Click here."'), 'A trick: do not click.')
          ],
          guided: [function () { return password(1); }, phishing],
          check: [secureMatch, phishing],
          coach: '<p>Review privacy settings and app permissions together on the child' + '’' + 's devices. Turn on two-step verification where possible.</p>',
          mistake: '<p>Using the same password everywhere. If one site leaks it, every account is open.</p>' }
      ]
    }, {
      id: 'information', title: 'Information you can trust', sub: 'Misinformation, disinformation and fair use.',
      concepts: [
        { slug: 'mis-dis', title: 'Mistake, trick, or chosen for you?', exp: ['A2.3'], skill: 'info',
          model: [
            step(W.tile('misinformation'), 'False, shared by mistake.'),
            step(W.tile('disinformation'), 'False, spread on purpose.'),
            step(W.tile('curated information'), 'Picked for you by a person or an app.')
          ],
          guided: [function () { return infoKind(1); }, infoMatch],
          check: [function () { return infoKind(2); }, checkClaim],
          coach: '<p>Look at the child' + '’' + 's video feed together and ask: "Why is the app showing you this? What is it not showing you?"</p>',
          mistake: '<p>Assuming people who share false information always mean to. Most misinformation is spread by mistake.</p>' },
        { slug: 'ethics', title: 'Use others' + '’' + ' work legally and fairly', exp: ['A2.3'], skill: 'info',
          model: [
            step(W.icon('lock'), 'Creators own their photos, songs and words.'),
            step(W.means('star', 'Creative Commons'), 'Some allow reuse with credit.'),
            step(W.means('write', 'quotation marks and a citation'), 'For words you copy.')
          ],
          guided: [function () { return ethics(1); }, checkClaim],
          check: [function () { return ethics(2); }, function () { return ethics(2); }],
          coach: '<p>Find a Creative Commons image together and practise writing its credit line.</p>',
          mistake: '<p>Believing "no copyright intended" makes it legal. It does not.</p>' }
      ]
    }, {
      id: 'media-texts', title: 'How media works on you', sub: 'Techniques, audiences and design.',
      concepts: [
        { slug: 'techniques', title: 'Every technique is aimed at the audience', exp: ['A2.4'], skill: 'media-texts',
          model: [
            step(W.means('screen', 'a low camera angle'), 'Looks powerful.'),
            step(W.means('people', '"Everyone is switching!"'), 'The bandwagon.'),
            step(W.means('star', '"Only three days left!"'), 'Pressure to act now.')
          ],
          guided: [function () { return technique(1); }, techMatch],
          check: [function () { return technique(2); }, techMatch],
          coach: '<p>Watch ads together and pause to name each technique and who it targets.</p>',
          mistake: '<p>Thinking "ads do not work on me". Techniques work best when you do not notice them.</p>' },
        { slug: 'audience', title: 'Intended and unintended audiences', exp: ['A2.5'], skill: 'media-texts',
          model: [
            step(W.means('people', 'a private joke in a group chat'), 'Made for close friends.'),
            step(W.means('not', 'the person the joke is about'), 'Who else might see it.')
          ],
          guided: [function () { return audience(1); }, function () { return audience(1); }],
          check: [function () { return audience(2); }, function () { return audience(2); }],
          coach: '<p>Before posting anything, ask: "Who is this for? Who else could see it, and how would they feel?"</p>',
          mistake: '<p>Forgetting that online audiences are much bigger than intended.</p>' },
        { slug: 'design', title: 'Design, test, then propose', exp: ['A2.6', 'A2.7'], skill: 'design-collab',
          model: [
            step(W.means('think', 'Define the problem'), 'Who does it affect?'),
            step(W.means('write', 'Build a prototype'), 'A first version.'),
            step(W.means('people', 'Test it and gather feedback'), 'Respectfully, with everyone included.')
          ],
          guided: [function () { return designOrder(1); }, function () { return collab(1); }],
          check: [function () { return designOrder(2); }, function () { return collab(2); }],
          coach: '<p>Pick a real problem at home or school and walk through the design steps using a free slide or drawing tool.</p>',
          mistake: '<p>Skipping the research and testing steps, so the solution fits the designer but not the users.</p>' }
      ]
    }],
    practice: [
      { id: 'citizenship', name: 'Digital identity and security', code: 'A2.1, A2.2', gen: responsible },
      { id: 'info', name: 'Information you can trust', code: 'A2.3', gen: infoKind },
      { id: 'media-texts', name: 'Media techniques and audiences', code: 'A2.4, A2.5', gen: technique },
      { id: 'design-collab', name: 'Design and collaboration', code: 'A2.6, A2.7', gen: collab }
    ],
    tasks: [
      { id: 'propose', title: 'Design a solution', code: 'A2.6', pic: W.icon('screen'), say: 'Pick a real problem at school or in your community. Use a digital tool to design and propose a solution.', write: true,
        run: ['The child defines a problem (for example, a crowded bike rack) and who it affects.', 'They research users, sketch or build a prototype with a digital tool (slides, a drawing app, a simple model), and test it with one person.', 'They write or present a short proposal.'],
        rubric: ['The problem is unclear.', 'A solution, but no research or testing.', 'Follows the design steps and proposes a clear solution.', 'A tested, improved solution, presented persuasively with the right tools.'] },
      { id: 'make-media', title: 'Make a media text', code: 'A2.4', pic: W.icon('star'), say: 'Make a short poster, ad or video for a cause you care about. Use two techniques on purpose.',
        run: ['The child chooses an audience and a message.', 'They use two techniques on purpose (for example, a close-up and a call to action).', 'Ask: "Who else might see it? How might they read it?"'],
        rubric: ['Message unclear.', 'Clear message, techniques accidental.', 'Two techniques used on purpose for the audience.', 'Techniques chosen and explained, including effects on unintended audiences.'] }
    ]
  });

  Q.shapes('media', {
    citizenship: [[1, 'footprint', footprintTf], [1, 'password', password], [2, 'phishing', phishing], [2, 'match', secureMatch]],
    info: [[1, 'match', infoMatch], [1, 'check', checkClaim], [2, 'ethics', ethics]],
    'media-texts': [[1, 'audience', audience], [1, 'true-false', audienceTf], [2, 'match', techMatch]],
    'design-collab': [[1, 'order', designOrder], [1, 'next-step', designNext], [2, 'true-false', cultureTf]]
  });
})();
