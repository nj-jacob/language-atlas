/* Grade 6: media and online life.
   Ontario 2023 Language, Grades 4 to 6, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online, with permission; digital identity     A2.2 online safety, privacy and personal data, well-being
   A2.3 gathering and evaluating information: validity, credibility, accuracy, perspectives
   A2.4 forms, conventions and techniques of digital and media texts, and their impact on the audience
   A2.5 form, message, context, audience and purpose                             A2.6 digital and media tools in the design process
   A2.7 communicating and collaborating online in a safe, respectful, inclusive way, with cultural awareness
   All examples (including the ads and posts) are made up for this site. Answer checks: tests/verify/grade6-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var AP = '’';

  function others(list, item) { return list.filter(function (x) { return x !== item; }); }
  function tfWhy(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }
  function coin() { return R.int(0, 1) === 1; }

  /* ---------- privacy and safety ---------- */
  var PRIVATE = ['your home address', 'your password', 'your exact location', 'your birth date and full name', 'your phone number', 'the name of your school', 'your health card number', 'a photo of your house number'];
  var SHAREABLE = ['your favourite book', 'a drawing of a landscape', 'your opinion about a movie', 'a recipe you tried', 'a photo of a sunset', 'your favourite sports team', 'a poem you wrote', 'a tip for caring for a plant'];
  /* [what happens, the best thing to do, other choices] */
  var SAFE = [['A free game asks to see your location and contacts.', 'Say no, or check with a grown-up first.', ['Allow everything so the game works.', 'Allow it now and change it later.']],
    ['A message says you won a phone. Click the link to claim it!', 'Do not click. Delete it, and tell a grown-up.', ['Click fast before it expires.', 'Send it to friends so they can win too.']],
    ['You need a new password.', 'Use a long passphrase that only you and your grown-ups know.', ['Use your pet' + AP + 's name.', 'Use 1234 so you will not forget it.']],
    ['A website asks for your full name and address to enter a contest.', 'Ask a grown-up before typing anything.', ['Fill it in. You might win.', 'Use a friend' + AP + 's address instead.']],
    ['Someone you met in a game asks to meet in person.', 'Say no, and tell a trusted adult right away.', ['Go, but bring a friend.', 'Agree, but keep it a secret.']],
    ['A pop-up says your device has a virus. Call this number now!', 'Close it, and tell a grown-up.', ['Call the number right away.', 'Type in your password to fix it.']],
    ['A friend asks for your password to help you level up.', 'Keep it private, even from friends.', ['Share it. Friends can be trusted.', 'Share it, then change it next year.']],
    ['An app asks to use the microphone all the time.', 'Say no unless the app really needs it.', ['Say yes to everything.', 'Say yes. It does not matter.']]];
  function privateData() {
    return Q.all('Pick every piece of <b>personal data</b> to keep private online.', R.some(PRIVATE, 2), R.some(SHAREABLE, 2), { hint: 'Could someone use it to find you or pretend to be you?',
      explain: 'Keep private anything that could find you or be used to pretend to be you.', meta: { k: 'g6-private' } });
  }
  function privTf() {
    var right = coin(), x = R.pick(right ? SHAREABLE : PRIVATE);
    return { q: 'Is it safe to post <b>' + x + '</b> publicly?', type: 'tf', answer: right, why: tfWhy(right, 'Nobody could use it to find you.', 'Someone could use it to find you or pretend to be you.'),
      hint: 'Could a stranger use it to find you?', explain: right ? 'It is safe to share.' : 'Keep it private.', meta: { k: 'g6-priv-tf', x: x } };
  }
  function whatToDo(lv) {
    var s = R.pick(SAFE);
    return Q.one('What is the best thing to do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', s[0]), prompt: 'Is it safe? Is there a grown-up to ask?',
      hint: 'Protect yourself. Ask a grown-up when unsure.', explain: s[1], meta: { k: 'g6-what-to-do', s: s[0] } });
  }
  function safeTf() {
    var s = R.pick(SAFE), right = coin(), did = right ? s[1] : R.pick(s[2]);
    return { q: Q.name() + ' chooses: <b>' + did + '</b> Is that safe?', fig: W.means('screen', s[0]), type: 'tf', answer: right, why: tfWhy(right, 'It protects them and their data.', 'It puts them or their data at risk.'),
      hint: 'Would a careful grown-up agree?', explain: s[1], meta: { k: 'g6-safe-tf', s: s[0], did: did } };
  }

  /* ---------- digital identity and permission ---------- */
  var HELPS = ['A video of you explaining your science fair project', 'A kind comment congratulating a classmate', 'A photo of a mural you painted, posted with permission',
    'A post thanking volunteers at the food bank', 'A short story you wrote, shared on the class site', 'A team photo, posted with everyone' + AP + 's OK',
    'A polite comment with helpful feedback', 'A video showing how to fold a paper crane'];
  var HARMS = ['A post making fun of someone' + AP + 's clothes', 'An angry rant about your teacher', 'A photo of a friend posted without asking', 'A comment calling someone a loser',
    'A post sharing a friend' + AP + 's secret', 'A video of you being unkind to a younger kid', 'A post spreading a rumour', 'A screenshot of a private chat'];
  /* [what happens, the respectful choice, other choices] */
  var PERMIT = [['A classmate asks you to share a funny photo of another student.', 'Do not share it without that student' + AP + 's permission.', ['Share it. It is only a joke.', 'Post it, then delete it later.']],
    ['You want to post a photo of your hockey team.', 'Ask everyone in the photo first.', ['Post it. They will not mind.', 'Post it, and tag everyone.']],
    ['You find a great picture online for your project.', 'Use it only if you are allowed, and credit the creator.', ['Use it. It is online, so it is free.', 'Use it and say you made it.']],
    ['A friend posts a video of you that you do not like.', 'Ask them kindly to take it down.', ['Post an embarrassing video of them.', 'Never speak to them again.']],
    ['Your cousin wants to post your drawing on their page.', 'You can say yes or no. It is your work.', ['You have to let them.', 'They do not need to ask.']]];
  /* [statement, true or false] */
  var IDCLAIM = [['Deleted posts can still be saved by others.', true], ['What you post now can be seen years later.', true], ['People have a right to say no to a photo of them being posted.', true],
    ['Your digital identity is built from what you and others post about you.', true], ['A post disappears forever once you delete it.', false], ['Only famous people have a digital identity.', false],
    ['It is fine to post a photo of a friend without asking.', false], ['Private messages can never be shared.', false]];
  function footprint() {
    var helps = coin(), p = R.pick(helps ? HELPS : HARMS);
    return { q: 'Does this post help or harm your <b>digital identity</b>?', fig: W.means('screen', p), type: 'tap', tiles: ['helps', 'harms'], answer: helps ? 0 : 1,
      prompt: 'Would you be proud of it in five years?', hint: 'Would you be proud if a future coach or employer saw it?', explain: helps ? 'It shows you in a good light.' : 'It could hurt someone and follow you for years.', meta: { k: 'g6-footprint', p: p } };
  }
  function footPick() {
    return Q.all('Pick every post that <b>helps</b> your digital identity.', R.some(HELPS, 2), R.some(HARMS, 2), { hint: 'Would you be proud of it later?', explain: 'Kind, creative and helpful posts build a good identity.', meta: { k: 'g6-foot-pick' } });
  }
  function permission(lv) {
    var p = R.pick(PERMIT);
    return Q.one('What is the right thing to do?', p[1], p[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', p[0]), prompt: 'Whose photo or work is it?',
      hint: 'People own their image and their work.', explain: p[1], meta: { k: 'g6-permission', s: p[0] } });
  }
  function idTf() {
    var c = R.pick(IDCLAIM);
    return { q: 'True or false?', fig: W.sent(c[0]), type: 'tf', answer: c[1], why: tfWhy(c[1], 'Posts last, and people have a say in what is shared about them.', 'That is not how posts and permission work.'),
      hint: 'Can a post really disappear?', explain: 'What is posted can last, and people have a right to say no.', meta: { k: 'g6-id-tf', s: c[0] } };
  }

  /* ---------- respectful and inclusive: [what happens, the respectful response, other choices] ---------- */
  var RESPECT = [['In a class video call, someone shares a tradition from their culture.', 'Thank them, and ask a respectful question.', ['Say it sounds weird.', 'Turn off your camera and ignore it.']],
    ['Your group chat makes a plan but leaves out a new student.', 'Invite the new student to join.', ['Keep them out. It is easier.', 'Start a second chat about them.']],
    ['Someone in the chat is still learning English.', 'Be patient, and use simple, clear words.', ['Tell them to stop writing.', 'Ignore their messages.']],
    ['A classmate posts art you do not like.', 'Say something specific you notice, or say nothing.', ['Comment that it is ugly.', 'Share it to laugh at it.']],
    ['Someone posts in French, and you only read English.', 'Use a translator, or ask politely what it means.', ['Tell them to write in English.', 'Ignore everyone who writes in French.']],
    ['A teammate makes a mistake in an online game.', 'Say: no worries, we will get the next one.', ['Call them useless.', 'Kick them off the team.']],
    ['People in a chat are teasing someone about their accent.', 'Stand up for them, and tell an adult if it continues.', ['Join in so you fit in.', 'Laugh but say nothing.']],
    ['You disagree with a friend' + AP + 's post about a movie.', 'Share your view politely and give a reason.', ['Call their opinion stupid.', 'Post a mean meme about them.']]];
  var KIND = ['Great colours in your painting!', 'Thanks for sharing your tradition.', 'I see it differently, but I like your point.', 'Want to join our group?', 'Nice try, you almost had it!', 'Congratulations on your win!'];
  var UNKIND = ['That is so dumb.', 'Nobody asked you.', 'You always mess up.', 'Go away, loser.', 'Your accent is funny.', 'Only weird people like that.'];
  function respectful(lv) {
    var r = R.pick(RESPECT);
    return Q.one('What is the most respectful thing to do?', r[1], r[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', r[0]), prompt: 'How would you want to be treated?', hint: 'How would you want to be treated?',
      explain: r[1], meta: { k: 'g6-respectful', s: r[0] } });
  }
  function respectTf() {
    var r = R.pick(RESPECT), right = coin(), did = right ? r[1] : R.pick(r[2]);
    return { q: Q.name() + ' responds: <b>' + did + '</b> Is that respectful?', fig: W.means('people', r[0]), type: 'tf', answer: right, why: tfWhy(right, 'It includes and respects everyone.', 'It hurts or leaves someone out.'),
      hint: 'How would the other person feel?', explain: r[1], meta: { k: 'g6-respect-tf', s: r[0], did: did } };
  }
  function kindPick() {
    return Q.all('Pick every <b>respectful</b> comment.', R.some(KIND, 2), R.some(UNKIND, 2), { hint: 'Would you be glad to read it?', explain: 'Respectful comments are kind, specific and inclusive.', meta: { k: 'g6-kind-pick' } });
  }
  function respectMatch() {
    var rs = R.some(RESPECT, 3);
    return { q: 'Match each situation to a respectful response.', type: 'match', pairs: rs.map(function (r) { return [r[0], r[1]]; }), hint: 'What would help each person feel included?', explain: 'Be kind, patient and inclusive online.', meta: { k: 'g6-respect-match' } };
  }

  /* ---------- checking information ---------- */
  var WARN = ['no author or date', 'lots of pop-up ads', 'many spelling mistakes', 'headlines in ALL CAPS', 'no way to reach the people who made it', 'a web address that looks odd'];
  var TRUST = ['an author who is an expert', 'sources listed for its facts', 'updated recently', 'a clear way to contact the creator', 'run by a known museum or university', 'facts that match other trusted sites'];
  /* [what you see online, the best first check, other choices] */
  var CLAIM = [['A post says: "Scientists say eating snow makes you smarter!"', 'Check if trusted sources report the same thing.', ['Share it. It sounds scientific.', 'Believe it because it has many likes.']],
    ['A photo shows a moose riding a city bus.', 'Search for the photo to see where it first appeared.', ['Share it with everyone right away.', 'Believe it because photos cannot be changed.']],
    ['A video claims a new law bans homework in Ontario.', 'Look for the news on the Ontario government site or a trusted news source.', ['Believe it because it is a video.', 'Post that you will skip homework.']],
    ['A website says bananas grow wild in Canadian forests.', 'Check a trusted science site or an encyclopedia.', ['Believe it. Websites are checked.', 'Add it to your project right away.']],
    ['A friend shares a "fact" that the CN Tower is 1 km tall.', 'Look it up on a trusted source.', ['Believe it because a friend sent it.', 'Share it with your class.']],
    ['An ad says a cream will make you taller in a week.', 'See what trusted health sources say.', ['Buy it before it sells out.', 'Believe it because the ad says so.']],
    ['A post shows a shark swimming down a flooded Toronto street.', 'Search for the photo to see where it first appeared.', ['Share it. It looks real.', 'Believe it because it has a caption.']],
    ['A video says every school in Canada will close next week.', 'Check the school board or government site.', ['Start packing for a holiday.', 'Believe it because many people shared it.']]];
  /* [statement, true or false] */
  var FACTS = [['A post can have a million likes and still be false.', true], ['Photos can be edited to show things that never happened.', true], ['Checking two or three trusted sources is a good habit.', true],
    ['A website can look professional and still be wrong.', true], ['If a post has lots of likes, it must be true.', false], ['Videos cannot be faked.', false],
    ['Everything on the first page of search results is true.', false], ['If a friend shares it, it must be accurate.', false]];
  function checkClaim(lv) {
    var c = R.pick(CLAIM);
    return Q.one('What should you do first?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', c[0]), prompt: 'Do other trusted sources say the same?',
      hint: 'Leave the page and check elsewhere.', explain: c[1], meta: { k: 'g6-check-claim', s: c[0] } });
  }
  function warnSigns() {
    return Q.all('Pick every sign that a website might <b>not</b> be reliable.', R.some(WARN, 2), R.some(TRUST, 2), { hint: 'What would a careful expert never do?',
      explain: 'Warning signs: no author or date, pop-ups, spelling mistakes, shouting headlines.', meta: { k: 'g6-warn' } });
  }
  function trustPick() {
    return Q.all('Pick every sign that a website is <b>more likely</b> to be reliable.', R.some(TRUST, 2), R.some(WARN, 2), { hint: 'What would a careful expert do?',
      explain: 'Good signs: an expert author, sources listed, recently updated.', meta: { k: 'g6-trust' } });
  }
  function likesTf() {
    var f = R.pick(FACTS);
    return { q: 'True or false?', fig: W.sent(f[0]), type: 'tf', answer: f[1], why: { options: ['Likes, looks and shares do not prove something is true.', 'Popular posts are checked by experts.'], answer: 0 },
      hint: 'Does it prove anything is true?', explain: 'Check facts with trusted sources.', meta: { k: 'g6-likes', said: f[0] } };
  }

  /* ---------- media techniques: [technique, two examples, what it does to the audience] ---------- */
  var TECH = [['bandwagon', ['Everyone is getting one!', 'Join the millions of kids who love it!'], 'makes you want to fit in'],
    ['a celebrity', ['A famous hockey player holds the drink.', 'A pop star smiles and wears the shoes.'], 'makes you trust it because you like the star'],
    ['a limited-time offer', ['Only 2 days left!', 'Sale ends at midnight!'], 'makes you hurry before you think'],
    ['a close-up shot', ['The camera zooms in on a crying face.', 'The camera moves in close to a dripping ice cream cone.'], 'makes you feel strong emotion'],
    ['upbeat music', ['Happy music plays over the ad.', 'A catchy, cheerful song plays the whole time.'], 'makes the product feel fun'],
    ['repetition', ['Fresh! Fresh! Always fresh!', 'The brand name is said five times in the ad.'], 'makes you remember the name'],
    ['bright colours', ['Bright neon colours flash across the screen.', 'The box is covered in rainbow colours.'], 'grabs your attention'],
    ['before and after', ['A messy room is spotless after one spray.', 'Dull hair turns shiny in the next shot.'], 'makes the product seem to work like magic']];
  function technique(lv) {
    var t = R.pick(TECH);
    return Q.one('Which technique is this?', t[0], R.some(others(TECH, t), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      fig: W.means('screen', R.pick(t[1])), prompt: 'What is the ad doing to you?', hint: 'What trick is the ad using?', explain: '<b>' + t[0] + '</b>: it ' + t[2] + '.', meta: { k: 'g6-technique' } });
  }
  function techMatch() {
    var t = R.some(TECH, 3);
    return { q: 'Match each technique to its effect on the audience.', type: 'match', pairs: t.map(function (x) { return [x[0], x[2]]; }), hint: 'How does each one make you feel?', explain: 'Media creators choose techniques on purpose.', meta: { k: 'g6-tech-match' } };
  }
  function techTf() {
    var t = R.pick(TECH), right = coin(), said = right ? t[0] : R.pick(others(TECH, t))[0];
    return { q: Q.name() + ' says this ad uses <b>' + said + '</b>.', fig: W.means('screen', R.pick(t[1])), type: 'tf', answer: right, why: tfWhy(right, 'That is the trick it uses.', 'It uses a different trick.'),
      hint: 'What trick is the ad using?', explain: '<b>' + t[0] + '</b>: it ' + t[2] + '.', meta: { k: 'g6-tech-tf', said: said } };
  }
  function techPick() {
    var t = R.pick(TECH);
    return Q.all('Pick every ad that uses <b>' + t[0] + '</b>.', t[1], R.some(others(TECH, t), 2).map(function (x) { return R.pick(x[1]); }), {
      hint: 'It ' + t[2] + '.', explain: '<b>' + t[0] + '</b>: it ' + t[2] + '.', meta: { k: 'g6-tech-pick', tech: t[0] } });
  }

  /* ---------- audience and purpose: [media text, its audience, its purpose] ---------- */
  var AUD = [['a cartoon cereal ad during weekend morning shows', 'children', 'to sell cereal'], ['a video about wearing seat belts', 'drivers and passengers', 'to keep people safe'],
    ['a flyer for a seniors' + AP + ' yoga class', 'older adults', 'to get people to join'], ['a trailer for an animated movie', 'families with children', 'to get people to see the movie'],
    ['a poster for a teen coding club', 'teenagers', 'to get people to join'], ['an ad for baby diapers', 'parents of babies', 'to sell diapers'],
    ['a sign about bears at the start of a hiking trail', 'hikers', 'to keep people safe'], ['a video for a university open house', 'high school students', 'to get people to apply'],
    ['a radio ad for a garden centre' + AP + 's spring sale', 'gardeners', 'to sell plants'], ['a pamphlet about a new bus route', 'bus riders', 'to inform people of a change']];
  function audience(lv) {
    var a = R.pick(AUD);
    return Q.one('Who is the main audience for <b>' + a[0] + '</b>?', a[1], R.some(others(AUD, a), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Where does it appear? Who is shown?', hint: 'Where and when does it appear? Who is shown in it?', explain: '<b>' + a[1] + '</b>, ' + a[2] + '.', meta: { k: 'g6-audience', text: a[0] } });
  }
  function audTf() {
    var a = R.pick(AUD), right = coin(), said = right ? a[1] : R.pick(others(AUD, a))[1];
    return { q: Q.name() + ' says the main audience for ' + a[0] + ' is <b>' + said + '</b>.', type: 'tf', answer: right, why: tfWhy(right, 'It is made for them.', 'It is made for someone else.'),
      hint: 'Who would see it, and who is it trying to reach?', explain: '<b>' + a[1] + '</b>, ' + a[2] + '.', meta: { k: 'g6-aud-tf', text: a[0], said: said } };
  }
  function audMatch() {
    var as = R.some(AUD, 3);
    return { q: 'Match each media text to its audience.', type: 'match', pairs: as.map(function (a) { return [a[0], a[1]]; }), hint: 'Who is each one for?', explain: 'Every media text is made for an audience.', meta: { k: 'g6-aud-match' } };
  }
  function mediaPurpose(lv) {
    var a = R.pick(AUD), wrong = AUD.map(function (x) { return x[2]; }).filter(function (p, i, all) { return p !== a[2] && all.indexOf(p) === i; });
    return Q.one('What is the main <b>purpose</b> of ' + a[0] + '?', a[2], R.some(wrong, lv > 1 ? 3 : 2), {
      hint: 'What does it want the audience to do?', explain: '<b>' + a[2] + '</b>', meta: { k: 'g6-media-purpose', text: a[0] } });
  }

  /* ---------- the design process ---------- */
  var DESIGN = ['Define the problem and who it is for.', 'Brainstorm and sketch ideas.', 'Build a first version.', 'Test it and get feedback.', 'Improve it.'];
  var STEPS = ['Define', 'Brainstorm', 'Build', 'Test', 'Improve'];
  /* [step, something a designer does in it] */
  var ACTS = [[0, 'Decide who the poster is for and what it must do.'], [0, 'Write down the problem the app should solve.'], [1, 'Sketch five quick ideas for the logo.'], [1, 'List every way the video could start.'],
    [2, 'Make the first version of the slide show.'], [2, 'Film the first cut of the video.'], [3, 'Show the poster to three classmates and ask what they notice.'],
    [3, 'Watch a friend try the game and note where they get stuck.'], [4, 'Make the title bigger after feedback.'], [4, 'Cut the slow middle part of the video.']];
  var TOOLS = [['make slides for a talk', 'presentation software'], ['record an interview', 'a voice recorder app'], ['plan a video shot by shot', 'a storyboard'], ['collect survey answers from classmates', 'an online form'],
    ['edit a photo for a poster', 'a photo editor'], ['write a report with a partner at the same time', 'a shared document'], ['show where places are in your neighbourhood', 'a mapping tool'],
    ['make a chart of survey results', 'a spreadsheet'], ['draw a comic', 'a drawing app']];
  function designOrder() {
    return { q: 'Put the steps of the design process in order.', type: 'order', items: DESIGN, first: 'First', last: 'Last', hint: 'You cannot test something before you build it.', explain: DESIGN.join(' &rarr; '), meta: { k: 'g6-design-order' } };
  }
  function designStep() {
    var a = R.pick(ACTS);
    return { q: 'Which step of the design process is this?', fig: W.means('think', a[1]), type: 'tap', tiles: STEPS, answer: a[0], prompt: 'Planning, making, or checking?',
      hint: 'Planning, making, checking, or fixing?', explain: '<b>' + STEPS[a[0]] + '</b>', meta: { k: 'g6-design-step', s: a[1] } };
  }
  function stepTf() {
    var a = R.pick(ACTS), right = coin(), said = right ? a[0] : R.pick([0, 1, 2, 3, 4].filter(function (i) { return i !== a[0]; }));
    return { q: Q.name() + ' says this is the <b>' + STEPS[said] + '</b> step.', fig: W.means('think', a[1]), type: 'tf', answer: right, why: tfWhy(right, 'That is what happens in that step.', 'It belongs to a different step.'),
      hint: 'Planning, making, checking, or fixing?', explain: '<b>' + STEPS[a[0]] + '</b>', meta: { k: 'g6-step-tf', s: a[1], said: STEPS[said] } };
  }
  function toolFor(lv) {
    var t = R.pick(TOOLS);
    return Q.one('Which tool fits best to <b>' + t[0] + '</b>?', t[1], R.some(others(TOOLS, t), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'What is each tool made for?', explain: '<b>' + t[1] + '</b>', meta: { k: 'g6-tool-for', task: t[0] } });
  }

  Atlas.register('media', {
    full: true,
    lessons: [{
      id: 'citizen', title: 'Digital citizenship', sub: 'Rights, responsibilities, privacy and respect online.',
      concepts: [
        { slug: 'privacy', title: 'Protect your personal data', exp: ['A2.2'], skill: 'privacy',
          model: [
            step(W.means('lock', 'address, password, location, birth date'), 'Private.'),
            step(W.means('star', 'a favourite book, a drawing'), 'Fine to share.'),
            step(W.means('screen', 'An app wants your contacts.'), 'Say no, or ask a grown-up.'),
            step(W.means('screen', 'You won a phone! Click here!'), 'A trick. Do not click.')
          ],
          guided: [privateData, function () { return whatToDo(1); }, privTf],
          check: [privateData, safeTf, function () { return whatToDo(2); }, privTf, function () { return whatToDo(2); }],
          coach: '<p>Look at the privacy settings on a device or app together. Talk about what each setting shares.</p>',
          mistake: '<p>Thinking only strangers matter. Apps and companies collect data too.</p>' },
        { slug: 'identity', title: 'Your digital identity', exp: ['A2.1'], skill: 'identity',
          model: [
            step(W.means('star', 'a video about your science project'), 'Helps.'),
            step(W.means('not', 'a post making fun of someone'), 'Harms, and it can last for years.'),
            step(W.means('people', 'a photo of a friend'), 'Ask first. They have a right to say no.'),
            step(W.means('write', 'a picture from a website'), 'Use it only if allowed. Credit the creator.')
          ],
          guided: [footprint, function () { return permission(1); }, idTf],
          check: [footprint, footPick, function () { return permission(2); }, idTf, footprint],
          coach: '<p>Search the child’s name together (with care). Talk about what you would want people to find.</p>',
          mistake: '<p>Believing deleted posts disappear. Others may have saved them.</p>' },
        { slug: 'respect', title: 'Respectful and inclusive online', exp: ['A2.7'], skill: 'respect',
          model: [
            step(W.means('people', 'someone shares a tradition'), 'Thank them. Ask a respectful question.'),
            step(W.means('people', 'a new student is left out'), 'Invite them in.'),
            step(W.means('people', 'someone writes in French'), 'Use a translator, or ask politely.'),
            step(W.means('not', 'teasing about an accent'), 'Stand up for them. Tell an adult.')
          ],
          guided: [function () { return respectful(1); }, kindPick, respectTf],
          check: [function () { return respectful(2); }, respectMatch, respectTf, kindPick, function () { return respectful(2); }],
          coach: '<p>Before sending a message, read it as if you were the one receiving it.</p>',
          mistake: '<p>Typing things you would never say face to face.</p>' }
      ]
    }, {
      id: 'info', title: 'Checking information', sub: 'Is it accurate, and who made it?',
      concepts: [
        { slug: 'check', title: 'Check before you share', exp: ['A2.3'], skill: 'info',
          model: [
            step(W.means('screen', 'Eating snow makes you smarter!'), 'A surprising claim.'),
            step(W.means('read', 'Do trusted sources say so?'), 'Leave the page. Look elsewhere.'),
            step(W.means('not', 'No trusted source agrees.'), 'Do not share it.'),
            step(W.means('screen', 'a moose riding a city bus'), 'Search for where the photo first appeared.')
          ],
          guided: [function () { return checkClaim(1); }, warnSigns, likesTf],
          check: [function () { return checkClaim(2); }, trustPick, likesTf, warnSigns, function () { return checkClaim(2); }],
          coach: '<p>Practise "lateral reading": open a new tab and see what others say about the source.</p>',
          mistake: '<p>Judging a site by how professional it looks.</p>' }
      ]
    }, {
      id: 'messages', title: 'Media messages', sub: 'Techniques, audiences, and making your own.',
      concepts: [
        { slug: 'techniques', title: 'Techniques that persuade', exp: ['A2.4'], skill: 'techniques',
          model: [
            step(W.means('screen', 'Everyone is getting one!'), '<b>Bandwagon</b>: you want to fit in.'),
            step(W.means('screen', 'Only 2 days left!'), 'A <b>limited-time offer</b>: you hurry.'),
            step(W.means('screen', 'The camera zooms in on a face.'), 'A <b>close-up</b>: you feel it.'),
            step(W.means('screen', 'Fresh! Fresh! Always fresh!'), '<b>Repetition</b>: you remember the name.')
          ],
          guided: [function () { return technique(1); }, techMatch, techTf],
          check: [function () { return technique(2); }, techPick, techTf, techMatch, function () { return technique(2); }],
          coach: '<p>Watch ads together and play "spot the technique".</p>',
          mistake: '<p>Thinking you are not influenced by ads. Everyone is; noticing the technique helps.</p>' },
        { slug: 'audience', title: 'Audience and purpose', exp: ['A2.5'], skill: 'audience',
          model: [
            step(W.means('screen', 'a cartoon cereal ad on weekend mornings'), 'Audience: children. Purpose: to sell.'),
            step(W.means('screen', 'a seat belt video'), 'Audience: drivers. Purpose: to keep people safe.'),
            step(W.means('screen', 'a sign about bears on a trail'), 'Audience: hikers. Purpose: safety.'),
            step(W.means('screen', 'a teen coding club poster'), 'Audience: teenagers. Purpose: to get them to join.')
          ],
          guided: [function () { return audience(1); }, audTf, function () { return mediaPurpose(1); }],
          check: [function () { return audience(2); }, audMatch, audTf, function () { return mediaPurpose(2); }, function () { return audience(2); }],
          coach: '<p>Ask three questions about any media text: Who made it? Who is it for? What does it want?</p>',
          mistake: '<p>Assuming every media text is for everyone.</p>' },
        { slug: 'design', title: 'The design process', exp: ['A2.6'], skill: 'design',
          model: [
            step(W.means('think', 'Define the problem'), 'Who is it for?'),
            step(W.means('write', 'Sketch, then build'), 'A first version.'),
            step(W.means('again', 'Test, then improve'), 'Again and again.'),
            step(W.means('screen', 'a storyboard'), 'Pick a tool that fits the job.')
          ],
          guided: [designStep, designOrder, function () { return toolFor(1); }],
          check: [designStep, stepTf, designOrder, function () { return toolFor(2); }, designStep],
          coach: '<p>Small projects work best: a poster for a family event, or a short how-to video.</p>',
          mistake: '<p>Skipping testing. Feedback is how designs get better.</p>' }
      ]
    }],
    practice: [
      { id: 'privacy', name: 'Privacy and safety', code: 'A2.2', gen: whatToDo },
      { id: 'identity', name: 'Digital identity', code: 'A2.1', gen: footprint },
      { id: 'respect', name: 'Respect online', code: 'A2.7', gen: respectful },
      { id: 'info', name: 'Checking information', code: 'A2.3', gen: checkClaim },
      { id: 'techniques', name: 'Media techniques', code: 'A2.4', gen: technique },
      { id: 'audience', name: 'Audience and purpose', code: 'A2.5', gen: audience },
      { id: 'design', name: 'The design process', code: 'A2.6', gen: designStep }
    ],
    tasks: [
      { id: 'make-psa', title: 'Make a public service message', code: 'A2.6', pic: W.icon('screen'), say: 'Design a short poster or video that helps people stay safe online.',
        run: ['Follow the design process: define who it is for, sketch, build, test it with a family member, improve it.', 'Use a simple tool: paper, slides, or a phone video.', 'Ask: "Which technique did you use, and how will it affect your audience?"'],
        rubric: ['Unfinished, no clear audience.', 'A product, with little testing.', 'A clear product, tested and improved.', 'A well-designed product that suits its audience, with choices explained.'] },
      { id: 'ad-analysis', title: 'Take apart an ad', code: 'A2.4', pic: W.icon('screen'), say: 'Choose a real ad. Name its audience, its purpose, and two techniques.', write: true,
        run: ['Choose an ad from TV, a website, or a magazine.', 'The child writes: who it is for, what it wants, two techniques, and how each one might affect the audience.'],
        rubric: ['Describes the ad only.', 'Names the audience or purpose.', 'Names audience, purpose and two techniques.', 'Explains how the techniques affect the audience, with evidence.'] }
    ]
  });

  Q.shapes('media', {
    privacy: [[1, 'private', privateData], [1, 'true-false', safeTf], [1, 'post-it', privTf]],
    identity: [[1, 'pick', footPick], [1, 'permission', permission], [1, 'true-false', idTf]],
    respect: [[1, 'true-false', respectTf], [1, 'pick', kindPick], [2, 'match', respectMatch]],
    info: [[1, 'warn', warnSigns], [1, 'likes', likesTf], [2, 'trust', trustPick]],
    techniques: [[1, 'match', techMatch], [1, 'true-false', techTf], [2, 'pick', techPick]],
    audience: [[1, 'true-false', audTf], [1, 'purpose', mediaPurpose], [2, 'match', audMatch]],
    design: [[1, 'order', designOrder], [1, 'true-false', stepTf], [1, 'tool', toolFor]]
  });
})();
