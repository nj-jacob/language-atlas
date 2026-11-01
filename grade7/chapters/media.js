/* Grade 7: media and online life.
   Ontario 2023 Language, Grades 7 and 8, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online, and a positive digital identity      A2.2 safety, privacy, personal data and security, and well-being
   A2.3 research with a focus on misinformation, disinformation and curated information, respecting legal and ethical considerations
   A2.4 forms, conventions and techniques of media texts and their impact        A2.5 form, message and context, intended and unintended audiences, and purpose
   A2.6 digital tools in the design process, proposing solutions                  A2.7 communicating and collaborating safely, respectfully and inclusively, with cultural awareness
   All examples (accounts, posts and ads) are made up for this site. Answer checks: tests/verify/grade7-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  /* a statement and whether it is true, as a true-or-false question with a reason */
  function says(list, key, why) {
    return function () {
      var s = R.pick(list);
      return { q: Q.name() + ' says:', fig: W.sent(s[0]), type: 'tf', answer: s[1], why: { options: why, answer: 0 },
        hint: 'Is that always true?', explain: why[0], meta: { k: key, said: s[0] } };
    };
  }

  /* ---------- digital identity: [situation, the responsible choice, other choices] ---------- */
  var CHOICE = [['A friend sends you a funny photo of another classmate.', 'Do not share it without the classmate' + AP + 's permission.', ['Post it in the group chat.', 'Share it, since it is only a joke.']],
    ['You are angry about a game and want to post about it.', 'Wait until you are calm, then decide if it is worth posting.', ['Post right away while you still feel it.', 'Post it, then delete it later.']],
    ['A website asks for your birthday, address and school to enter a contest.', 'Ask a parent first; it may be collecting personal data.', ['Fill it in to win.', 'Use a friend' + AP + 's details instead.']],
    ['You see someone being mocked in the comments of a video.', 'Report the comments, and support the person if it is safe.', ['Add a laughing emoji.', 'Join in so you fit in.']],
    ['A stranger in a game chat asks which school you go to.', 'Do not answer, and tell a trusted adult.', ['Tell them, since you are friends in the game.', 'Give them a hint instead.']],
    ['Your friend' + AP + 's account is left logged in on a school computer.', 'Log it out and let your friend know.', ['Post something funny as them.', 'Read their messages.']],
    ['You disagree with a comment on a news video.', 'Reply calmly with a reason, or move on.', ['Insult the person.', 'Make a fake account to argue.']],
    ['You want to post a video from your class trip.', 'Ask everyone in it before you post.', ['Post it, since it was a public place.', 'Post it and tag everyone.']],
    ['A group chat starts sharing rumours about a teacher.', 'Do not pass them on; speak up or leave the chat.', ['Add what you heard.', 'Screenshot it for later.']],
    ['A game offers free coins if you type in your password.', 'Say no; never share your password.', ['Share it just once.', 'Give your brother' + AP + 's password instead.']]];
  function responsible(lv) {
    var c = R.pick(CHOICE);
    return Q.one('What is the most responsible choice?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', c[0]), prompt: 'Who could this affect, now and later?',
      hint: 'Think about permission, kindness and your digital footprint.', explain: c[1], meta: { k: 'g7-responsible', s: c[0] } });
  }
  function responsibleTf() {
    var c = R.pick(CHOICE), right = R.int(0, 1) === 1, plan = right ? c[1] : R.pick(c[2]);
    return { q: Q.name() + ' plans to do this. Is it responsible?', fig: W.means('screen', c[0]) + W.sent(plan), type: 'tf', answer: right,
      why: { options: ['It respects others and protects everyone' + AP + 's footprint.', 'It could hurt someone or put someone at risk.'], answer: right ? 0 : 1 },
      hint: 'Who could this affect, now and later?', explain: 'Responsible: ' + c[1], meta: { k: 'g7-responsible-tf', plan: plan } };
  }
  var FOOT = [['Something I post can be copied and seen years from now.', true], ['A screenshot can keep a post after I delete it.', true], ['My digital footprint includes what others post about me.', true],
    ['Kind, thoughtful posts build a positive digital identity.', true], ['If I delete a post, it is gone forever.', false], ['Private accounts are completely private.', false],
    ['Only famous people have a digital footprint.', false], ['What I post today will not matter later.', false]];
  var footprintTf = says(FOOT, 'g7-footprint-tf', ['Others can save, screenshot and share what is posted.', 'Deleting removes every copy.']);
  /* [what you want to post or share, does it need someone else's permission?] */
  var PERMIT = [['a photo of your friends at the beach', true], ['a screenshot of a private message', true], ['a video where you tag a classmate', true], ['your own drawing', false],
    ['a photo of your own pet', false], ['a group selfie from the class trip', true], ['a landscape photo you took', false], ['a friend' + AP + 's voice note', true]];
  function permission() {
    var p = R.pick(PERMIT);
    return { q: 'You want to post <b>' + p[0] + '</b>. Do you need someone' + AP + 's permission?', fig: W.means('people', p[0]), type: 'tap', tiles: ['Yes: other people are in it or made it', 'No: it is only yours'], answer: p[1] ? 0 : 1,
      hint: 'Is anyone else in it, or did someone else make it?', explain: p[1] ? 'Ask first.' : 'It is yours to share.', meta: { k: 'g7-permission', s: p[0] } };
  }

  /* ---------- security ---------- */
  var STRONG = ['maple-canoe-7-river-lantern', 'Purple-Moose!Skates-42', 'quiet-cedar-blue-kettle-19', 'Northern-Lights!Paddle-88', 'toboggan-river-quiet-2026', 'blue-heron-snow-fort-31'];
  var WEAK = ['password123', 'liam2013', 'qwerty', 'hockey', 'sunshine', 'abc12345', '11111111', 'maple'];
  function password(lv) {
    return Q.one('Which password is the <b>strongest</b>?', R.pick(STRONG), R.some(WEAK, lv > 1 ? 3 : 2), { hint: 'Long, hard to guess, and not your name or birthday.',
      explain: 'Long passphrases with mixed parts are hardest to crack.', meta: { k: 'g7-password' } });
  }
  var PHISH = ['The message says your account will close in one hour.', 'It asks you to click a link and enter your password.', 'The sender' + AP + 's address has odd spelling, like "suport-team".',
    'It says you won a prize for a contest you never entered.', 'It asks you to keep it secret from your parents.', 'The link does not match the company' + AP + 's real website.'];
  var SAFE = ['It is from a teacher you know, about tomorrow' + AP + 's class.', 'It does not ask for any personal details.', 'It is in your usual school portal, with no links.',
    'It is a reminder you signed up for.', 'Your coach sent it from the team' + AP + 's usual address.'];
  function phishing() {
    return Q.all('Pick every warning sign of a <b>phishing</b> message (a trick to steal your details).', R.some(PHISH, 2), R.some(SAFE, 2), {
      hint: 'Rushing you, asking for passwords, secrets and odd senders are warning signs.', explain: 'Do not click. Tell a trusted adult and report it.', meta: { k: 'g7-phishing' } });
  }
  var SECURE = [['two-step verification', 'needs a code from your phone as well as your password'], ['app permissions', 'control what an app can see, such as your location'], ['privacy settings', 'control who can see your posts'],
    ['software updates', 'fix security holes'], ['a password manager', 'stores a different strong password for each account'], ['a lock screen', 'stops others from opening your device']];
  function secureMatch(lv) {
    var s = R.some(SECURE, lv > 2 ? 4 : 3);
    return { q: 'Match each tool to what it does.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Each one protects you in a different way.', explain: 'Layers of security protect your data.', meta: { k: 'g7-secure-match' } };
  }
  var SECURITY = [['Using a different password for each account is safer.', true], ['Two-step verification adds a second lock.', true], ['Updates often fix security holes.', true],
    ['A long passphrase is hard to crack.', true], ['One password everywhere is fine if it is strong.', false], ['Apps only collect what you type in.', false],
    ['It is safe to share a password with a best friend.', false], ['Public Wi-Fi is always private.', false]];
  var securityTf = says(SECURITY, 'g7-security-tf', ['More locks and fewer shared secrets keep your data safe.', 'Convenience matters more than safety.']);

  /* ---------- information ---------- */
  var INFO = [['misinformation', 'false information shared by mistake'], ['disinformation', 'false information spread on purpose to mislead'], ['curated information', 'information chosen and arranged for you by a person or an app']];
  var INAMES = INFO.map(function (x) { return x[0]; });
  var INFOEX = [['Your aunt shares a fake health tip, believing it is true.', 'misinformation'], ['A group invents a fake news story to make people distrust an election.', 'disinformation'],
    ['Your video app shows you more of what you already watch.', 'curated information'], ['A classmate repeats a wrong fact they heard, thinking it is right.', 'misinformation'],
    ['A fake account posts edited photos to stir up anger.', 'disinformation'], ['A news site' + AP + 's front page shows the stories its editors picked.', 'curated information'],
    ['A teen reposts an old storm photo, thinking it shows today' + AP + 's storm.', 'misinformation'], ['A company pays accounts to post fake reviews of a rival.', 'disinformation'],
    ['A music app builds a playlist from songs you liked.', 'curated information'], ['Your grandfather forwards a wrong recipe tip that he believes.', 'misinformation'],
    ['A website edits a video so a speaker seems to say something they never said.', 'disinformation'], ['A search engine ranks the results it predicts you want.', 'curated information']];
  function infoKind(lv) {
    var e = R.pick(INFOEX);
    return Q.tiles('Which is this?', e[1], INAMES.filter(function (x) { return x !== e[1]; }).slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', e[0]),
      hint: 'Mistake, on purpose, or chosen for you?', explain: '<b>' + e[1] + '</b>: ' + INFO.filter(function (x) { return x[0] === e[1]; })[0][1] + '.', meta: { k: 'g7-info-kind', s: e[0] } });
  }
  function infoMatch() {
    return { q: 'Match each term to what it means.', type: 'match', pairs: INFO.map(function (x) { return [x[0], x[1]]; }), hint: 'Mis- is a mistake. Dis- is deliberate.', explain: 'Know what you are looking at.', meta: { k: 'g7-info-match' } };
  }
  function infoTf() {
    var e = R.pick(INFOEX), right = R.int(0, 1) === 1, said = right ? e[1] : R.pick(INAMES.filter(function (x) { return x !== e[1]; }));
    return { q: Q.name() + ' says this is <b>' + said + '</b>.', fig: W.means('screen', e[0]), type: 'tf', answer: right,
      why: { options: ['That matches whether it was a mistake, on purpose, or chosen for you.', 'It is a different kind.'], answer: right ? 0 : 1 },
      hint: 'Mistake, on purpose, or chosen for you?', explain: '<b>' + e[1] + '</b>.', meta: { k: 'g7-info-tf', s: e[0], said: said } };
  }
  var CHECK = ['Search for the claim on other trusted sites.', 'Find out who made it and why.', 'Check the date.', 'Look for the original source of a photo.', 'See what fact-checking sites say.', 'Ask whether the photo could be old or edited.'];
  var NOCHECK = ['Share it first, check later.', 'Trust it because it has many likes.', 'Believe it because it matches what you think.', 'Trust it because a friend shared it.', 'Believe it because it looks professional.'];
  function checkClaim() {
    return Q.all('A post makes a surprising claim. Pick every good way to <b>check</b> it.', R.some(CHECK, 2), R.some(NOCHECK, 2), { hint: 'Leave the post and look elsewhere.',
      explain: 'Read laterally: check other sources, the creator, the date and the original.', meta: { k: 'g7-check-claim' } });
  }

  /* ---------- legal and ethical use: [situation, the right choice, other choices] ---------- */
  var ETHICS = [['You want to use a photo you found online in your project.', 'Use one with permission or a Creative Commons licence, and credit it.', ['Use any photo, since it is online.', 'Crop out the photographer' + AP + 's name.']],
    ['You want to use a song in your video.', 'Use music you have permission to use, and credit the artist.', ['Use any song if the video is short.', 'Say "no copyright intended".']],
    ['You copy a paragraph from an article into your report.', 'Put it in quotation marks and cite the source.', ['Change one or two words.', 'Leave it, since the teacher will not check.']],
    ['A friend asks you to do their online quiz for them.', 'Say no; it is their work to do.', ['Do it quickly.', 'Do half of it.']],
    ['You find a video you like and want to repost it.', 'Share the original post, which credits the creator.', ['Download it and post it as yours.', 'Remove the watermark first.']],
    ['You want to use an AI-made picture in your project.', 'Say that it was made with AI, and follow the tool' + AP + 's rules.', ['Say you drew it.', 'Use it without mentioning it.']],
    ['You use facts from a website in your report.', 'List the website in your sources.', ['Leave it out, since facts are free.', 'Say you knew it already.']],
    ['You want to show a clip from a movie in your video.', 'Use a short clip only if the rules allow it, and credit the movie.', ['Use the whole movie.', 'Use it and say "no copyright intended".']]];
  function ethics(lv) {
    var e = R.pick(ETHICS);
    return Q.one('What is the legal and ethical choice?', e[1], e[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('lock', e[0]), hint: 'Creators own their work.', explain: e[1], meta: { k: 'g7-ethics', s: e[0] } });
  }
  function ethicsPick() {
    var es = R.some(ETHICS, 4);
    return Q.all('Pick every <b>legal and fair</b> choice.', [es[0][1], es[1][1]], [R.pick(es[2][2]), R.pick(es[3][2])], { hint: 'Does the creator get credit, and are their rules followed?',
      explain: 'Fair use follows the creator' + AP + 's rules and gives credit.', meta: { k: 'g7-ethics-pick' } });
  }
  var ETHIC_SAYS = [['Creators own their photos, songs and words.', true], ['Some Creative Commons licences allow reuse with credit.', true], ['Copied words need quotation marks and a citation.', true],
    ['Saying "no copyright intended" does not make it legal.', true], ['Anything online is free to use.', false], ['Changing a few words makes it my own work.', false],
    ['Credit is only needed for books.', false], ['A watermark can be removed if the video is short.', false]];
  var ethicsTf = says(ETHIC_SAYS, 'g7-ethics-tf', ['Creators deserve credit, and their rules decide how their work is used.', 'Online work belongs to everyone.']);
  var USES = ['Use it, with credit', 'Ask permission first, or choose something else'];
  /* [something you want to use, can it be used with credit?] */
  var REUSE = [['a photo with a Creative Commons licence that allows reuse', true], ['a photo from a news website', false], ['a song by a popular band', false], ['a classmate' + AP + 's drawing', false],
    ['a track from a free music library marked free to use', true], ['a chart from a government open-data site marked free to share', true], ['a cartoon character from a movie', false],
    ['an image from a museum' + AP + 's open collection marked free to reuse', true]];
  function reuse() {
    var r = R.pick(REUSE);
    return { q: 'You want to use <b>' + r[0] + '</b>. What should you do?', fig: W.means('lock', r[0]), type: 'tap', tiles: USES.slice(), answer: r[1] ? 0 : 1,
      hint: 'Does it say it is free to reuse?', explain: r[1] ? USES[0] + '.' : USES[1] + '.', meta: { k: 'g7-reuse', s: r[0] } };
  }

  /* ---------- media techniques: [technique, its effect] ---------- */
  var TECH = [['a low camera angle looking up at an athlete', 'makes them look powerful'], ['fast cuts and loud music', 'creates excitement'], ['"Everyone is switching to it!"', 'makes you feel left out (the bandwagon effect)'],
    ['a famous player holding the product', 'borrows the player' + AP + 's trust (a testimonial)'], ['"Only three days left!"', 'pushes you to act quickly'], ['soft music and slow motion', 'creates a calm or sad mood'],
    ['a close-up of a smiling family at dinner', 'makes the product feel warm and caring'], ['bright colours and cheerful music', 'creates a happy, fun mood'],
    ['"Scientists recommend it!"', 'borrows the authority of experts'], ['a before-and-after picture', 'makes the change look dramatic'],
    ['a catchy jingle repeated three times', 'helps you remember the brand'], ['dark lighting and a slow drumbeat', 'builds suspense']];
  function technique(lv) {
    var t = R.pick(TECH);
    return Q.one('What is the effect of <b>' + t[0] + '</b>?', t[1], R.some(TECH.filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'How does it make the audience feel or act?', explain: t[1] + '.', meta: { k: 'g7-media-technique', t: t[0] } });
  }
  function techWhich(lv) {
    var t = R.pick(TECH);
    return Q.tiles('Which technique <b>' + t[1] + '</b>?', t[0], R.some(TECH.filter(function (x) { return x !== t; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), {
      hint: 'Picture an ad that uses each one.', explain: t[0] + ': ' + t[1] + '.', meta: { k: 'g7-tech-which', e: t[1] } });
  }
  function techMatch(lv) {
    var ts = R.some(TECH, lv > 2 ? 4 : 3);
    return { q: 'Match each technique to its effect.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[1]]; }), hint: 'Picture an ad that uses each one.', explain: 'Every technique is a choice aimed at the audience.', meta: { k: 'g7-tech-match-media' } };
  }
  function techTf() {
    var t = R.pick(TECH), right = R.int(0, 1) === 1, said = right ? t[1] : R.pick(TECH.filter(function (x) { return x !== t; }))[1];
    return { q: Q.name() + ' says this technique <b>' + said + '</b>.', fig: W.means('screen', t[0]), type: 'tf', answer: right,
      why: { options: ['That is the effect it is designed to have.', 'It is designed for a different effect.'], answer: right ? 0 : 1 },
      hint: 'How would it make you feel or act?', explain: t[1] + '.', meta: { k: 'g7-tech-tf', t: t[0], said: said } };
  }

  /* ---------- audiences: [a media text, its intended audience, an unintended audience, its purpose] ---------- */
  var AUD = [['an ad for a sugary cereal shown during cartoons', 'young children', 'parents who worry about sugar', 'to sell cereal'],
    ['a video made for a team' + AP + 's fans', 'the team' + AP + 's fans', 'rival fans who find it and mock it', 'to excite the fans'],
    ['a private joke posted in a class group chat', 'close friends', 'the person the joke is about', 'to make friends laugh'],
    ['a poster for a seniors' + AP + ' fitness class', 'older adults', 'teens walking past', 'to get older adults to join'],
    ['a public dance video posted by a student', 'other students who like dance', 'a future employer searching their name', 'to share a skill and have fun'],
    ['a flyer for a toddler swim class', 'parents of toddlers', 'teens who find it in the mailbox', 'to sign up toddlers for swimming'],
    ['a campaign ad on a city bus', 'voters in the city', 'tourists riding the bus', 'to win votes'],
    ['a recipe video for vegan cooking', 'people who eat vegan', 'meat lovers who stumble on it', 'to teach a recipe']];
  function audience(lv) {
    var a = R.pick(AUD), unintended = R.int(0, 1) === 1;
    return Q.tiles('For <b>' + a[0] + '</b>, who is the <b>' + (unintended ? 'unintended' : 'intended') + '</b> audience?', unintended ? a[2] : a[1], [unintended ? a[1] : a[2]], {
      hint: 'Intended: who the creator made it for. Unintended: who else might see it.', explain: 'Intended: ' + a[1] + '. Unintended: ' + a[2] + '.', meta: { k: 'g7-media-audience', t: a[0], un: unintended } });
  }
  function purpose(lv) {
    var a = R.pick(AUD);
    return Q.one('What is the main <b>purpose</b> of <b>' + a[0] + '</b>?', a[3], R.some(AUD.filter(function (x) { return x !== a; }), lv > 1 ? 3 : 2).map(function (x) { return x[3]; }), {
      hint: 'What does the creator want the audience to do or feel?', explain: a[3] + '.', meta: { k: 'g7-media-purpose', t: a[0] } });
  }
  function audMatch(lv) {
    var as = R.some(AUD, lv > 2 ? 4 : 3);
    return { q: 'Match each media text to its intended audience.', type: 'match', pairs: as.map(function (a) { return [a[0], a[1]]; }), hint: 'Who did the creator make it for?', explain: 'Every text is made for someone.', meta: { k: 'g7-aud-match' } };
  }
  var AUD_SAYS = [['People the creator never planned for can still see a post.', true], ['A post for friends can reach strangers.', true], ['Creators choose techniques to suit their audience.', true],
    ['The same message can mean different things to different audiences.', true], ['Only the people a post was made for will ever see it.', false], ['Every audience reads a media text the same way.', false],
    ['Ads are made for everyone equally.', false], ['A private chat can never be shared.', false]];
  var audienceTf = says(AUD_SAYS, 'g7-audience-tf', ['Posts travel beyond their intended audience, and each audience reads them its own way.', 'Apps only show posts to the right people.']);

  /* ---------- design and collaboration ---------- */
  var DESIGN = ['Define the problem and who it affects.', 'Research what users need.', 'Brainstorm possible solutions.', 'Build a prototype.', 'Test it and gather feedback.', 'Propose the improved solution.'];
  var STEPNAME = ['Define', 'Research', 'Brainstorm', 'Build', 'Test', 'Propose'];
  function designOrder(lv) {
    var steps = lv > 1 ? DESIGN.slice() : [DESIGN[0], DESIGN[2], DESIGN[3], DESIGN[4]];
    return { q: 'Put the design process in order.', type: 'order', items: steps, first: 'First', last: 'Last', hint: 'Understand the problem before solving it; test before proposing.', explain: DESIGN.join(' &rarr; '), meta: { k: 'g7-design-order' } };
  }
  function designNext(lv) {
    var i = R.int(0, DESIGN.length - 2);
    return Q.tiles('In the design process, what comes right after this step?', DESIGN[i + 1], R.some(DESIGN.filter(function (d, j) { return j !== i && j !== i + 1; }), lv > 1 ? 3 : 2), { fig: W.sent(DESIGN[i]),
      hint: 'Define, research, brainstorm, build, test, propose.', explain: DESIGN[i] + ' &rarr; <b>' + DESIGN[i + 1] + '</b>', meta: { k: 'g7-design-next', s: DESIGN[i] } });
  }
  /* [what you are doing to fix a crowded bike rack, the design step] */
  var DOING = [['You write down that bikes fall over and block the door.', 0], ['You ask five classmates what bothers them about the bike rack.', 1], ['You sketch three different rack ideas.', 2],
    ['You make a cardboard model of one rack.', 3], ['Two classmates try the model and tell you what is hard.', 4], ['You write a one-page plan for the principal.', 5]];
  function designWhich(lv) {
    var d = R.pick(DOING);
    return Q.tiles('Which design step is this?', STEPNAME[d[1]], R.some(STEPNAME.filter(function (x, j) { return j !== d[1]; }), lv > 1 ? 3 : 2), { fig: W.means('think', d[0]),
      hint: 'Define, research, brainstorm, build, test, propose.', explain: '<b>' + STEPNAME[d[1]] + '</b>: ' + DESIGN[d[1]], meta: { k: 'g7-design-step', s: d[0] } });
  }
  /* [situation online, respectful and inclusive response, others] */
  var COLLAB = [['Your group' + AP + 's shared document: a teammate' + AP + 's idea is different from yours.', 'Comment: “Interesting idea. Could we combine it with mine?”', ['Delete their paragraph.', 'Ignore it and keep writing.']],
    ['You want to use a First Nations design you saw online in your project.', 'Learn who it belongs to and ask permission, or choose something else.', ['Use it, since it looks nice.', 'Change the colours so it is yours.']],
    ['A new member of an online club writes in a mix of English and Tagalog.', 'Welcome them and ask how they would like to share.', ['Tell them to use English only.', 'Leave them out of the chat.']],
    ['In a video call, someone makes a joke about a classmate' + AP + 's culture.', 'Say it is not okay, and check in with the classmate.', ['Laugh along.', 'Turn off your camera and say nothing.']],
    ['In a group project, one member has not been given a task.', 'Ask what they would like to do and share the work.', ['Do their part without asking.', 'Leave them out.']],
    ['A classmate uses a screen reader, and your slides are all images.', 'Add alt text and real text to the slides.', ['Tell them to ask someone else.', 'Skip those slides.']],
    ['Someone in your group chat posts in all capital letters, upset.', 'Ask calmly what is wrong.', ['Reply in capitals too.', 'Remove them from the chat.']],
    ['Your group wants to share another student' + AP + 's poem in a video.', 'Ask the student first, and credit them.', ['Share it without asking.', 'Say your group wrote it.']],
    ['A group call is planned for a time when one member is at prayer.', 'Find a time that works for everyone.', ['Hold it anyway.', 'Tell them to skip prayer.']],
    ['A teammate from another country uses a word you do not know.', 'Ask politely what it means.', ['Laugh at the word.', 'Ignore their message.']]];
  function collab(lv) {
    var c = R.pick(COLLAB);
    return Q.one('What is the most respectful response?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', c[0]), hint: 'Safe, respectful, responsible and inclusive.', explain: c[1], meta: { k: 'g7-collab', s: c[0] } });
  }
  var CULTURE = [['Before using a cultural symbol from another community, I should learn about it and ask permission.', true], ['Online, people from many cultures may read my words.', true],
    ['Jokes can hurt people from other cultures, even online.', true], ['Including everyone means making sure all can take part.', true],
    ['I can use any cultural symbol I find online if I change its colours.', false], ['Online, culture does not matter.', false],
    ['If no one complains, a joke about a culture is fine.', false], ['Only people in my own group need to feel welcome.', false]];
  var cultureTf = says(CULTURE, 'g7-culture-symbol-tf', ['Online spaces are shared by many cultures; respect and inclusion matter there too.', 'Anything online is free to use and joke about.']);

  Atlas.register('media', {
    full: true,
    lessons: [{
      id: 'identity', title: 'Your digital life', sub: 'Your footprint, permission and security.',
      concepts: [
        { slug: 'footprint', title: 'What you post can last', exp: ['A2.1'], skill: 'footprint',
          model: [
            step(W.icon('screen'), 'A post, a comment, a photo.'),
            step(W.icon('again'), 'Others can save and share it.'),
            step(W.icon('people'), 'Others' + AP + ' photos need their permission.'),
            step(W.means('not', 'Angry? Post now.'), 'Wait until you are calm.'),
            step(W.means('star', 'A kind, thoughtful comment'), 'Builds a positive digital identity.')
          ],
          guided: [function () { return responsible(1); }, footprintTf, permission],
          check: [function () { return responsible(2); }, responsibleTf, permission, footprintTf, function () { return responsible(3); }],
          coach: '<p>Search the child' + AP + 's name together (with care) and talk about what a future coach or employer might see.</p>',
          mistake: '<p>Thinking private accounts are fully private. Followers can screenshot anything.</p>' },
        { slug: 'security', title: 'Protect your accounts and data', exp: ['A2.2'], skill: 'security',
          model: [
            step(W.icon('lock'), 'A long passphrase: <b>quiet-cedar-blue-kettle-19</b>.'),
            step(W.means('screen', 'two-step verification'), 'A code from your phone too.'),
            step(W.means('not', '"Your account closes in one hour! Click here."'), 'A trick: do not click.'),
            step(W.means('not', '"You won! Keep it secret from your parents."'), 'Another trick: tell an adult.')
          ],
          guided: [function () { return password(1); }, phishing, securityTf],
          check: [function () { return secureMatch(2); }, phishing, securityTf, function () { return password(2); }, function () { return secureMatch(3); }],
          coach: '<p>Review privacy settings and app permissions together on the child' + AP + 's devices. Turn on two-step verification where possible.</p>',
          mistake: '<p>Using the same password everywhere. If one site leaks it, every account is open.</p>' }
      ]
    }, {
      id: 'information', title: 'Information you can trust', sub: 'Misinformation, disinformation and fair use.',
      concepts: [
        { slug: 'mis-dis', title: 'Mistake, trick, or chosen for you?', exp: ['A2.3'], skill: 'info',
          model: [
            step(W.tile('misinformation'), 'False, shared by mistake.'),
            step(W.tile('disinformation'), 'False, spread on purpose.'),
            step(W.tile('curated information'), 'Picked for you by a person or an app.'),
            step(W.means('screen', 'An old storm photo, shared as today' + AP + 's'), 'Check the date and the original.')
          ],
          guided: [function () { return infoKind(1); }, infoMatch, infoTf],
          check: [function () { return infoKind(2); }, checkClaim, infoTf, infoMatch, function () { return infoKind(3); }],
          coach: '<p>Look at the child' + AP + 's video feed together and ask: "Why is the app showing you this? What is it not showing you?"</p>',
          mistake: '<p>Assuming people who share false information always mean to. Most misinformation is spread by mistake.</p>' },
        { slug: 'ethics', title: 'Use others' + AP + ' work legally and fairly', exp: ['A2.3'], skill: 'ethics',
          model: [
            step(W.icon('lock'), 'Creators own their photos, songs and words.'),
            step(W.means('star', 'Creative Commons'), 'Some allow reuse with credit.'),
            step(W.means('write', 'quotation marks and a citation'), 'For words you copy.'),
            step(W.means('screen', 'an AI-made picture'), 'Say how it was made.')
          ],
          guided: [function () { return ethics(1); }, reuse, ethicsTf],
          check: [function () { return ethics(2); }, reuse, ethicsTf, ethicsPick, function () { return ethics(3); }],
          coach: '<p>Find a Creative Commons image together and practise writing its credit line.</p>',
          mistake: '<p>Believing "no copyright intended" makes it legal. It does not.</p>' }
      ]
    }, {
      id: 'media-texts', title: 'How media works on you', sub: 'Techniques, audiences and design.',
      concepts: [
        { slug: 'techniques', title: 'Every technique is aimed at the audience', exp: ['A2.4'], skill: 'techniques',
          model: [
            step(W.means('screen', 'a low camera angle'), 'Looks powerful.'),
            step(W.means('people', '"Everyone is switching!"'), 'The bandwagon.'),
            step(W.means('star', '"Only three days left!"'), 'Pressure to act now.'),
            step(W.means('think', '"Scientists recommend it!"'), 'Borrows the experts' + AP + ' authority.')
          ],
          guided: [function () { return technique(1); }, function () { return techWhich(1); }, techTf],
          check: [function () { return technique(2); }, function () { return techMatch(2); }, techTf, function () { return techWhich(2); }, function () { return technique(3); }],
          coach: '<p>Watch ads together and pause to name each technique and who it targets.</p>',
          mistake: '<p>Thinking "ads do not work on me". Techniques work best when you do not notice them.</p>' },
        { slug: 'audience', title: 'Intended and unintended audiences', exp: ['A2.5'], skill: 'audience',
          model: [
            step(W.means('people', 'a private joke in a group chat'), 'Made for close friends.'),
            step(W.means('not', 'the person the joke is about'), 'Who else might see it.'),
            step(W.means('screen', 'a public dance video'), 'Made for other dancers.'),
            step(W.means('think', 'a future employer'), 'Who might find it later.')
          ],
          guided: [function () { return audience(1); }, function () { return purpose(1); }, audienceTf],
          check: [function () { return audience(2); }, function () { return audMatch(2); }, audienceTf, function () { return purpose(2); }, function () { return audience(3); }],
          coach: '<p>Before posting anything, ask: "Who is this for? Who else could see it, and how would they feel?"</p>',
          mistake: '<p>Forgetting that online audiences are much bigger than intended.</p>' },
        { slug: 'design', title: 'Design, test, then propose', exp: ['A2.6', 'A2.7'], skill: 'design',
          model: [
            step(W.means('think', 'Define the problem'), 'Who does it affect?'),
            step(W.means('people', 'Research what users need'), 'Ask them.'),
            step(W.means('write', 'Build a prototype'), 'A first version.'),
            step(W.means('people', 'Test it and gather feedback'), 'Respectfully, with everyone included.')
          ],
          guided: [function () { return designOrder(1); }, function () { return collab(1); }, function () { return designWhich(1); }],
          check: [function () { return designOrder(2); }, function () { return collab(2); }, cultureTf, function () { return designNext(2); }, function () { return designWhich(2); }],
          coach: '<p>Pick a real problem at home or school and walk through the design steps using a free slide or drawing tool.</p>',
          mistake: '<p>Skipping the research and testing steps, so the solution fits the designer but not the users.</p>' }
      ]
    }],
    practice: [
      { id: 'footprint', name: 'Your digital footprint', code: 'A2.1', gen: responsible },
      { id: 'security', name: 'Security and privacy', code: 'A2.2', gen: phishing },
      { id: 'info', name: 'Misinformation and disinformation', code: 'A2.3', gen: infoKind },
      { id: 'ethics', name: 'Using others' + AP + ' work', code: 'A2.3', gen: ethics },
      { id: 'techniques', name: 'Media techniques', code: 'A2.4', gen: technique },
      { id: 'audience', name: 'Audiences and purpose', code: 'A2.5', gen: audience },
      { id: 'design', name: 'Design and collaboration', code: 'A2.6, A2.7', gen: collab }
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
    footprint: [[1, 'permission', permission], [1, 'true-false', footprintTf], [2, 'plan', responsibleTf]],
    security: [[1, 'password', password], [1, 'true-false', securityTf], [2, 'match', secureMatch]],
    info: [[1, 'match', infoMatch], [1, 'true-false', infoTf], [2, 'check', checkClaim]],
    ethics: [[1, 'reuse', reuse], [1, 'true-false', ethicsTf], [2, 'pick', ethicsPick]],
    techniques: [[1, 'which', techWhich], [1, 'true-false', techTf], [2, 'match', techMatch]],
    audience: [[1, 'purpose', purpose], [1, 'true-false', audienceTf], [2, 'match', audMatch]],
    design: [[1, 'order', designOrder], [1, 'which-step', designWhich], [1, 'next-step', designNext], [2, 'true-false', cultureTf]]
  });
})();
