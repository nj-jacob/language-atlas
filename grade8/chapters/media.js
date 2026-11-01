/* Grade 8: media and digital literacy. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online, with permission; digital identity          A2.2 privacy, personal data, security and well-being
   A2.3 research: accuracy, credibility, misinformation, disinformation, curated information; legal and ethical use
   A2.4 forms, conventions and techniques of media texts, and their impact             A2.5 form, message, context, intended and unintended audience, purpose
   A2.6 digital and media tools in the design process; innovative solutions             A2.7 safe, respectful, inclusive collaboration; cultural awareness
   All messages, ads and people are made up for this site. Answer checks: tests/verify/grade8-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function lvQ(lv, three) { return three[Math.min(Math.max(lv || 1, 1), 3) - 1]; }
  function tf(q, fig, answer, why, more) {
    var o = { q: q, fig: fig, type: 'tf', answer: answer, why: { options: why, answer: 0 } };
    Object.keys(more).forEach(function (k) { o[k] = more[k]; });
    return o;
  }
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }

  /* posts that build a digital identity you would be proud of, and posts that do not */
  var PROUD = ['a video of your band' + AP + 's first concert', 'a photo of the mural your class painted', 'a thank-you post to your hockey coach', 'a link to your science fair project',
    'a photo of the community garden you helped plant', 'a post congratulating your team', 'a short film you made for a contest', 'a drawing you finished in art class',
    'a post about your fundraiser for the food bank', 'a photo from your cousin' + AP + 's graduation, with permission', 'a review of a book you loved', 'a clip of your poetry reading'];
  var REGRET = ['a mean joke about a classmate', 'a photo of a friend, posted without asking', 'a rumour about a teacher', 'an angry rant about your neighbour',
    'a video mocking someone' + AP + 's accent', 'your home address in a public post', 'an embarrassing photo of your brother', 'a screenshot of a private chat',
    'a rude comment on a stranger' + AP + 's video', 'a dare video that could get someone hurt', 'a fake account pretending to be a classmate', 'a post bragging about skipping school'];
  /* [a statement about rights online, true or not] */
  var RIGHTS = [['Before posting a group photo, ask everyone in it.', true], ['You have the right to ask a friend to take down a photo of you.', true],
    ['A screenshot can keep a post alive after it is deleted.', true], ['You can report a post that shares your private information.', true],
    ['Tagging someone should be done with their permission.', true], ['You can change who sees your posts in your privacy settings.', true],
    ['Employers and schools may search your name online.', true], ['You are responsible for what you share, even if someone else made it.', true],
    ['Deleting a post means no one can ever see it again.', false], ['If a photo is of you, you may post it without asking anyone else in it.', false],
    ['A private account means no one can ever share your posts.', false], ['Disappearing messages are gone forever.', false],
    ['Only your friends will ever see what you post.', false], ['It is fine to share a rumour if you did not start it.', false],
    ['Using a fake name means no one can trace your posts.', false], ['Once you are older, old posts no longer matter.', false]];

  /* scam messages, each three lines */
  var SCAMS = [['URGENT: Your account will be closed in 24 hours!', 'Click here and enter your password to keep it:', 'www.streambox-secure-login.biz'],
    ['Congratulations! You won a $500 gift card!', 'Reply with your home address and password to claim it:', 'www.free-prize-winner.win'],
    ['Your parcel could not be delivered.', 'Pay a $2 fee and enter your password within 1 hour:', 'www.parcel-delivery-help.info'],
    ['Security alert: someone logged in to your game account!', 'Confirm your password now or lose your items:', 'www.gamevault-verify.co'],
    ['Final notice: your phone bill is overdue.', 'Enter your card number and password today:', 'www.phone-billing-urgent.net']];
  var SIGNS = ['It rushes you to act now.', 'It asks for your password.', 'The link does not match the real website.', 'It threatens or scares you.'];
  var NOSIGNS = ['It is written in English.', 'It arrived in the afternoon.', 'It uses full sentences.', 'It has a capital letter at the start.'];
  var WEAK = ['password123', 'Amira2013', 'qwertyuiop', 'hockey', 'iloveyou', 'Toronto2024', 'abc123', 'letmein', 'Biscuit', 'sunshine!'];
  /* long passphrases, with a line-break point after each symbol so they fit a phone screen */
  var PHRASES = ['Maple-Canoe-Drizzle-47!', 'Purple#Otter#Snow#82', 'Lantern+Moose+Rain+19', 'Cedar!Kettle!Comet!56', 'Harbour-Tulip-Gravel-31', 'Thunder*Bagel*Fern*74',
    'Glacier=Pencil=Wolf=28', 'Copper/Ladder/Lake/63'].map(function (p) { return p.replace(/([^A-Za-z0-9])/g, '$1<wbr>'); });
  /* [a privacy situation, the safe choice, unsafe choices] */
  var PRIV = [['An app asks to track your location all the time.', 'Allow it only while you use the app, or not at all.', ['Allow it always; apps need it.', 'Share your location publicly.']],
    ['A quiz asks for your full name, school and birthday.', 'Skip it; it is collecting personal data.', ['Fill it in for fun.', 'Share it so your friends fill it in too.']],
    ['A friend asks for your password to help with a game.', 'Keep your password private, even from friends.', ['Share it; they are your friend.', 'Post it in the group chat.']],
    ['You use a computer at the library.', 'Log out of every account before you leave.', ['Stay logged in for next time.', 'Save your password in the browser.']],
    ['A new game asks to see your contacts.', 'Say no unless the game truly needs them.', ['Allow it; it is just a game.', 'Send your contacts to the game company.']],
    ['A stranger online asks to video chat privately.', 'Say no and tell a trusted adult.', ['Agree if they seem nice.', 'Send them a photo first.']],
    ['You have been on your phone for hours and feel tired.', 'Take a break and do something offline.', ['Keep scrolling until bedtime.', 'Turn up the brightness.']],
    ['A website offers free music if you turn off your antivirus.', 'Leave your security on and close the site.', ['Turn it off for a minute.', 'Download it on a friend' + AP + 's computer instead.']],
    ['Your account sends you a login code you did not ask for.', 'Do not share the code, and change your password.', ['Send the code to whoever asks.', 'Ignore it and keep the same password.']],
    ['You want to post a photo taken outside your home.', 'Check that nothing shows your address.', ['Post it with your street name tagged.', 'Add your school name too.']]];

  /* [what happened, the kind of information] */
  var INFO = [['Your aunt shares a post about schools closing for a storm, not knowing it is false.', 'misinformation'],
    ['A student repeats a wrong date from an old textbook, believing it is right.', 'misinformation'],
    ['A friend forwards a wrong bus schedule, believing it is the new one.', 'misinformation'],
    ['A blogger shares a health tip, not knowing the study was wrong.', 'misinformation'],
    ['Your uncle posts that a store is closing, believing a rumour.', 'misinformation'],
    ['A company writes fake reviews of its own blender to fool buyers.', 'disinformation'],
    ['Someone edits a flood photo on purpose to make people panic.', 'disinformation'],
    ['A group makes a fake news site to fool voters.', 'disinformation'],
    ['A seller posts a fake recall notice to hurt a rival.', 'disinformation'],
    ['Someone posts a fake quote from the premier to stir up anger.', 'disinformation'],
    ['A video app shows you more skateboarding videos because you watched one.', 'curated information'],
    ['Your news feed shows only stories that match what you already like.', 'curated information'],
    ['A music app shows you songs like the ones you played yesterday.', 'curated information'],
    ['A shopping site shows you ads for boots after you searched for them.', 'curated information'],
    ['A search engine shows you results based on where you live.', 'curated information']];
  var KINDS = ['misinformation', 'disinformation', 'curated information'];
  /* [a statement about feeds, true or not] */
  var FEED = [['An app' + AP + 's algorithm chooses what shows up in your feed.', true], ['Two people can search the same words and see different results.', true],
    ['Liking a post can change what you see next.', true], ['Feeds often show content that keeps you scrolling.', true], ['Looking beyond your feed helps you see other views.', true],
    ['Ads can be chosen based on what you searched.', true], ['Your feed shows everything that was posted, in order.', false], ['A video with many views must be true.', false],
    ['Everyone sees the same search results.', false], ['A post shared many times must be accurate.', false], ['Algorithms show you a balanced mix of views.', false], ['Apps never use what you click.', false]];

  var CHECK = ['Stop before you share it.', 'Find out who made it.', 'Look for the claim in other reliable sources.', 'Decide whether to trust it.'];
  /* [an online situation, the legal and fair choice, other choices] */
  var ETHICS = [['You want to use a photo you found online in your project.', 'Check that you may use it, and credit the photographer.', ['Use it; everything online is free.', 'Use it and crop out the photographer' + AP + 's name.']],
    ['You want a song in the background of your video.', 'Use music you have permission to use, and credit it.', ['Use any song; it is only a school video.', 'Use a popular song and hope no one notices.']],
    ['You found a perfect paragraph for your report.', 'Put the idea in your own words and cite the source.', ['Copy it; the teacher will not check.', 'Change a few words and leave out the source.']],
    ['You want to use a friend' + AP + 's drawing on your poster.', 'Ask your friend first, and credit them.', ['Use it; friends share.', 'Trace it and call it yours.']],
    ['You found a great chart for your slides.', 'Use it with a citation under the chart.', ['Paste it without a source.', 'Redraw it and say you made it.']],
    ['You want to share a news article with your class.', 'Share the link and credit the news source.', ['Copy the whole article into your post.', 'Share a screenshot without the source.']],
    ['You want to use a clip from a movie in your project.', 'Use a short clip for school and credit the film.', ['Upload the whole movie.', 'Use it and claim you filmed it.']],
    ['A classmate' + AP + 's idea made your project better.', 'Credit your classmate in your presentation.', ['Present it as your own idea.', 'Keep quiet about where it came from.']],
    ['You want to use a quote from an Elder you interviewed.', 'Ask permission to share it, and credit them by name.', ['Use it without asking.', 'Change the words and leave out their name.']],
    ['You want to put a sports team' + AP + 's logo on T-shirts to sell.', 'Do not use it without the team' + AP + 's permission.', ['Sell the shirts; the logo is everywhere.', 'Change one colour and sell them.']],
    ['You found a video game screenshot for your review.', 'Use it in your review and credit the game maker.', ['Say you made the game art.', 'Use it with no source.']],
    ['You want to read a poem from a website in your speech.', 'Read it and credit the poet.', ['Read it as your own poem.', 'Change a word and hide the poet' + AP + 's name.']]];

  /* [an ad line, the technique] */
  var TECH = [['Everyone at Lakeview School already has one. Don' + AP + 't be left out!', 'bandwagon'], ['Join the millions who switched to ZipMail.', 'bandwagon'],
    ['All your friends are going. Are you?', 'bandwagon'],
    ['Olympic swimmer Maya Clarke says: "I drink HydraFuel before every race."', 'testimonial'], ['Hockey star Jordan Pelletier says: "These skates changed my game."', 'testimonial'],
    ['Pop singer Ari Moon says: "I never travel without my GlowBuds."', 'testimonial'],
    ['Only 50 left. The sale ends tonight!', 'scarcity'], ['Only 3 tickets left for Saturday!', 'scarcity'], ['This deal ends at midnight. Do not miss it!', 'scarcity'],
    ['This winter, a lonely puppy is waiting for you to bring it home.', 'emotional appeal'], ['A child is waiting for a warm coat. Will you help?', 'emotional appeal'],
    ['Imagine your family safe and warm all winter.', 'emotional appeal'],
    ['9 out of 10 dentists recommend BrightBite toothpaste.', 'expert statistic'], ['8 out of 10 coaches choose ProGrip balls.', 'expert statistic'],
    ['7 out of 10 vets recommend Pawsome pet food.', 'expert statistic']];
  var TECHS = ['bandwagon', 'testimonial', 'scarcity', 'emotional appeal', 'expert statistic'];

  /* [a media text, its intended audience, a likely unintended audience] */
  var AUD = [['a joke about a teacher in a private group chat', 'the friends in the chat', 'the teacher, after someone shares a screenshot'],
    ['a dance video posted for your friends', 'your friends', 'a future employer who searches your name'],
    ['a student council campaign poster in the hallway', 'students who will vote', 'parents visiting for a concert'],
    ['a cereal ad during a Saturday cartoon', 'young children', 'parents who will be asked to buy it'],
    ['a complaint about the coach in a team chat', 'your teammates', 'the coach, after someone forwards it'],
    ['a birthday photo posted for your cousins', 'your cousins', 'strangers, if the account is public'],
    ['a toy commercial on a kids' + AP + ' channel', 'kids who watch the channel', 'grandparents shopping for gifts'],
    ['a lost-cat poster on a lamppost', 'neighbours who might see the cat', 'a reporter writing about lost pets'],
    ['a restaurant review on a public website', 'people choosing where to eat', 'the restaurant owner'],
    ['a school newsletter about the science fair', 'families at the school', 'a local newspaper editor']];
  /* [a media text, its main purpose] */
  var PURPOSE = [['a public service ad about wearing a bike helmet', 'to persuade'], ['a poster asking people to vote', 'to persuade'], ['an ad urging people to adopt a shelter dog', 'to persuade'],
    ['an evening weather report', 'to inform'], ['a museum audio guide', 'to inform'], ['a news story about a new bridge', 'to inform'],
    ['a comedy sketch on a family channel', 'to entertain'], ['an animated short film', 'to entertain'], ['a funny podcast about cats', 'to entertain'],
    ['a poster for a shoe store sale', 'to sell'], ['a flyer for a pizza deal', 'to sell'], ['a commercial for a new phone', 'to sell']];
  var PURPOSES = ['to persuade', 'to inform', 'to entertain', 'to sell'];

  var DESIGN = ['Understand the users and their problem.', 'Brainstorm many possible solutions.', 'Build a prototype, a first version.', 'Test it with real users.', 'Improve it using their feedback.'];
  var STEPS = ['understand the users', 'brainstorm', 'build a prototype', 'test', 'improve'];
  /* [something a designer does, the step of the design process] */
  var DSTEP = [['You ask students what bothers them about the lunch line.', 0], ['You watch how people use the library website.', 0],
    ['You list ten ideas without judging any of them.', 1], ['Your team sketches as many app ideas as it can in five minutes.', 1],
    ['You make a rough first version of the app screen.', 2], ['You build a paper model of the sign-up page.', 2],
    ['Two classmates try your app while you watch.', 3], ['You ask five users to find the bus times on your site.', 3],
    ['You change the buttons that confused your testers.', 4], ['You make the text bigger after users said it was hard to read.', 4]];
  /* [a job, the tool that suits it] */
  var TOOLS = [['show how bus ridership changed over a year', 'a chart made in a spreadsheet'], ['compare rainfall in five cities', 'a chart made in a spreadsheet'],
    ['tell a story with voices and sound effects', 'a podcast recording app'], ['share interviews with Elders about local history', 'a podcast recording app'],
    ['plan the layout of a website', 'a wireframe sketch'], ['sketch the screens of a new app', 'a wireframe sketch'],
    ['give a talk with pictures to the class', 'a slide presentation'], ['present your science fair results to judges', 'a slide presentation'],
    ['make a how-to video with titles', 'a video editor'], ['trim and join clips from a field trip', 'a video editor'],
    ['advertise a bake sale in the hallway', 'a poster design app'], ['make a sign for the school garden', 'a poster design app']];
  var TOOLSET = ['a chart made in a spreadsheet', 'a podcast recording app', 'a wireframe sketch', 'a slide presentation', 'a video editor', 'a poster design app'];

  /* [a group-work moment online, the respectful choice, other choices] */
  var RESPECT = [['A teammate' + AP + 's idea is different from yours.', 'Say what you like about it, then add your idea.', ['Ignore it and post your own.', 'Reply with an eye-roll emoji.']],
    ['One person in the group chat has not said anything.', 'Invite them to share their idea.', ['Carry on without them.', 'Tell the others they are lazy.']],
    ['A classmate who is learning English makes spelling mistakes.', 'Respond to their idea, not their spelling.', ['Post their mistakes for a laugh.', 'Correct every word in the chat.']],
    ['A video you were sent mocks a culture.', 'Do not share it, and say why it is hurtful.', ['Share it; it is only a joke.', 'Send it to one friend only.']],
    ['Someone makes a mistake in the shared document.', 'Fix it kindly, or leave a helpful comment.', ['Point it out to the whole class.', 'Delete their whole section.']],
    ['A classmate shares an idea about their family' + AP + 's tradition.', 'Ask a respectful question to learn more.', ['Say it sounds weird.', 'Change the subject.']],
    ['Your group disagrees about the project topic.', 'Hear each idea, then vote or combine them.', ['Choose your own idea without asking.', 'Leave the group chat.']],
    ['Someone posts a rude comment about a teammate.', 'Stand up for your teammate, and tell an adult if it continues.', ['Add a laughing emoji.', 'Join in so you fit in.']],
    ['A teammate did most of the research.', 'Credit their work in the presentation.', ['Present it as group work only.', 'Say you did it.']],
    ['You are angry about a comment in the chat.', 'Wait, then reply calmly.', ['Reply in capital letters right away.', 'Post a screenshot to mock them.']],
    ['A classmate uses a screen reader.', 'Add text descriptions to your images.', ['Use only images with no text.', 'Leave them out of the project.']],
    ['Your group is choosing photos for a poster about Canada.', 'Include people of many backgrounds and regions.', ['Use photos of only one kind of person.', 'Use a stereotype to make it funny.']]];
  var AWARE = ['Learn how to say a classmate' + AP + 's name correctly.', 'Ask before using a cultural symbol in your design.', 'Include people of different backgrounds in your examples.',
    'Learn the greetings of a classmate' + AP + 's language.', 'Check that your images show many kinds of families.', 'Learn about a holiday before you post about it.',
    'Ask an Elder before sharing a traditional story.', 'Use the names people choose for their own nations.'];
  var UNAWARE = ['Use a stereotype for a laugh.', 'Copy a sacred design for a team logo.', 'Give a classmate a nickname because their name is hard.', 'Make fun of an accent in a video.',
    'Wear a sacred headdress as a costume.', 'Share a traditional story without asking.', 'Guess what a holiday means and post it.', 'Use only one culture in a poster about Canada.'];

  /* ---------- digital identity and rights ---------- */
  function identity(lv) {
    return Q.one(lvQ(lv, ['Which post builds a digital identity you would be proud of?', 'Which post would you be glad to see in five years?', 'Which post is safe to keep online for good?']),
      R.pick(PROUD), R.some(REGRET, lv > 1 ? 3 : 2), { prompt: 'Who could see this later? Would you still be proud?', hint: 'Posts can last forever, and anyone may see them.',
      explain: 'Everything you post becomes part of your digital identity.', meta: { k: 'g8-identity' } });
  }
  function rightsTf(lv) {
    var r = R.pick(RIGHTS);
    return tf(lv > 1 ? 'Is this true?' : Q.name() + ' says:', W.sent(r[0]), r[1], ['People have a right to decide what is shared about them, and posts can be copied.', 'What you post is only your business.'],
      { hint: 'Think about the rights of others, and about screenshots.', explain: 'Ask permission, and remember screenshots last.', meta: { k: 'g8-rights-tf', said: r[0] } });
  }
  function postTf() {
    var p = R.int(0, 1) ? R.pick(PROUD) : R.pick(REGRET);
    return tf('Would you be proud of this post in five years?', W.means('screen', p), PROUD.indexOf(p) >= 0, ['Posts last, and anyone may see them later.', 'Old posts disappear on their own.'],
      { hint: 'Is it kind, safe and fair to everyone in it?', explain: 'Your posts build your digital identity.', meta: { k: 'g8-post-tf', s: p } });
  }
  function pickProud(lv) {
    return Q.all('Pick every post you would be <b>proud</b> of later.', R.some(PROUD, 2), R.some(REGRET, lv > 1 ? 3 : 2), { hint: 'Kind, safe, and fair to everyone in it.',
      explain: 'Ask before posting about other people.', meta: { k: 'g8-pick-proud' } });
  }

  /* ---------- privacy and security ---------- */
  function password(lv) {
    return Q.one(lvQ(lv, ['Which password is the <b>strongest</b>?', 'Which password would be hardest to guess?', 'Which password should you use?']), R.pick(PHRASES), R.some(WEAK, lv > 1 ? 3 : 2), {
      hint: 'Long, with words, numbers and symbols, and nothing about you.', explain: 'A long passphrase of random words, numbers and symbols is hardest to guess.', meta: { k: 'g8-password' } });
  }
  function strongTf() {
    var p = R.int(0, 1) ? R.pick(PHRASES) : R.pick(WEAK);
    return tf('Is this a <b>strong</b> password?', W.sent(p), PHRASES.indexOf(p) >= 0, ['Strong passwords are long and mix words, numbers and symbols.', 'Any password you can remember is strong.'],
      { hint: 'How long is it? Does it mix words, numbers and symbols?', explain: 'Long passphrases are hardest to guess.', meta: { k: 'g8-strong-tf' } });
  }
  function phishing() {
    return Q.all('Pick every <b>warning sign</b> that this message is a scam.', R.some(SIGNS, R.int(2, 3)), R.some(NOSIGNS, 2), { fig: W.passage('', R.pick(SCAMS)),
      hint: 'Scams rush you, scare you, and ask for private details.', explain: 'Real companies never ask for your password in a message.', meta: { k: 'g8-phishing' } });
  }
  function privacySafe(lv) {
    var p = R.pick(PRIV);
    return Q.one('What is the <b>safe</b> choice?', p[1], p[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('lock', p[0]), hint: 'Protect your data, your accounts and your well-being.',
      explain: p[1], meta: { k: 'g8-privacy-safe', s: p[0] } });
  }

  /* ---------- kinds of information ---------- */
  function infoKind(lv) {
    var x = R.pick(INFO);
    return Q.one(lvQ(lv, ['What kind of information is this?', 'Misinformation, disinformation or curated?', 'Which word describes this?']), x[1], others(KINDS, x[1]).slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(x[0]), prompt: 'Is it false? Did they mean to fool you? Or did an app choose it?', hint: 'Misinformation is a mistake. Disinformation is on purpose. Curated means chosen for you.',
      explain: 'This is <b>' + x[1] + '</b>.', meta: { k: 'g8-info-kind', s: x[0] } });
  }
  function matchInfo() {
    return { q: 'Match each example to the kind of information.', type: 'match', pairs: KINDS.map(function (k) { return [R.pick(INFO.filter(function (x) { return x[1] === k; }))[0], k]; }),
      hint: 'A mistake, a trick, or chosen by an app?', explain: 'Each kind needs a different kind of care.', meta: { k: 'g8-match-info' } };
  }
  function infoTf() {
    var x = R.pick(INFO), said = R.int(0, 1) ? x[1] : R.pick(others(KINDS, x[1]));
    return tf(Q.name() + ' says this is <b>' + said + '</b>.', W.sent(x[0]), said === x[1], ['Mistake, trick or chosen for you: each has its own name.', 'All false information is the same.'],
      { hint: 'Was it a mistake, on purpose, or chosen by an app?', explain: 'This is <b>' + x[1] + '</b>.', meta: { k: 'g8-info-tf', s: x[0], said: said } });
  }
  function feedTf(lv) {
    var f = R.pick(FEED);
    return tf(lv > 1 ? 'Is this true?' : 'True or false?', W.sent(f[0]), f[1], ['Algorithms choose what each person sees, based on what they clicked.', 'Everyone online sees the same things.'],
      { hint: 'Who decides what shows up on your screen?', explain: 'Apps curate what you see, so look beyond your feed.', meta: { k: 'g8-feed-tf', said: f[0] } });
  }

  /* ---------- checking and fair use ---------- */
  function ethics(lv) {
    var e = R.pick(ETHICS);
    return Q.one(lvQ(lv, ['What is the legal and fair thing to do?', 'What should you do?', 'Which choice respects the creator?']), e[1], e[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', e[0]),
      hint: 'Creators own their work. Ask, credit or cite.', explain: e[1], meta: { k: 'g8-ethics', s: e[0] } });
  }
  function ethicsTf() {
    var e = R.pick(ETHICS), shown = R.int(0, 1) ? e[1] : R.pick(e[2]);
    return tf('Is this the legal and fair thing to do?', W.means('screen', e[0]) + W.sent(shown), shown === e[1], ['Creators own their work, so ask, credit or cite.', 'Anything online is free to use.'],
      { hint: 'Does the creator get credit, or give permission?', explain: e[1], meta: { k: 'g8-ethics-tf', s: shown } });
  }
  function pickEthical(lv) {
    var es = R.some(ETHICS, 3);
    return Q.all('Pick every choice that is <b>fair</b> to the creator.', [es[0][1], es[1][1]], [R.pick(es[2][2])].concat(lv > 1 ? [es[0][2][0], es[1][2][1]] : [es[0][2][0]]), {
      hint: 'Ask, credit or cite.', explain: 'Fair use gives credit and asks permission.', meta: { k: 'g8-pick-ethical' } });
  }
  function checkOrder() {
    return { q: 'You see a shocking claim online. Put the steps in order.', type: 'order', items: CHECK.slice(), first: 'First', last: 'Last',
      hint: 'Pause first. Decide last.', explain: 'Stop, find who made it, look elsewhere, then decide.', meta: { k: 'g8-check-order' } };
  }

  /* ---------- persuasive techniques ---------- */
  function technique(lv) {
    var t = R.pick(TECH);
    return Q.one(lvQ(lv, ['Which technique does this ad use?', 'How is this ad trying to persuade you?', 'Name the technique.']), t[1], R.some(others(TECHS, t[1]), lv > 1 ? 3 : 2), { fig: W.sent(t[0]),
      prompt: 'A crowd, a star, a deadline, a feeling, or numbers?', hint: 'Ask: how is it trying to get me to act?', explain: 'This is <b>' + t[1] + '</b>.', meta: { k: 'g8-technique', s: t[0] } });
  }
  function matchTechnique() {
    var ks = R.some(TECHS, 3);
    return { q: 'Match each ad line to its technique.', type: 'match', pairs: ks.map(function (k) { return [R.pick(TECH.filter(function (t) { return t[1] === k; }))[0], k]; }),
      hint: 'Crowd, star, deadline, feeling, or numbers?', explain: 'Naming the technique takes away its power.', meta: { k: 'g8-match-technique' } };
  }
  function techTf() {
    var t = R.pick(TECH), said = R.int(0, 1) ? t[1] : R.pick(others(TECHS, t[1]));
    return tf(Q.name() + ' says this ad uses <b>' + said + '</b>.', W.sent(t[0]), said === t[1], ['Each technique pulls on you in its own way.', 'All ads use the same technique.'],
      { hint: 'A crowd, a star, a deadline, a feeling, or numbers?', explain: 'This is <b>' + t[1] + '</b>.', meta: { k: 'g8-technique-tf', s: t[0], said: said } });
  }
  function techWhich(lv) {
    var k = R.pick(TECHS), right = R.pick(TECH.filter(function (t) { return t[1] === k; }));
    return Q.one('Which ad line uses <b>' + k + '</b>?', right[0], R.some(TECH.filter(function (t) { return t[1] !== k; }), lv > 1 ? 3 : 2).map(function (t) { return t[0]; }), {
      hint: 'Picture how each line tries to persuade.', explain: W.sent(right[0]), meta: { k: 'g8-technique-which', want: k } });
  }

  /* ---------- audience and purpose ---------- */
  function audience(lv) {
    var a = R.pick(AUD), un = R.int(0, 1) === 1;
    return Q.one(lv > 1 ? (un ? 'Who might see it without being meant to?' : 'Who was it made for?') : 'Who is the <b>' + (un ? 'unintended' : 'intended') + '</b> audience?', un ? a[2] : a[1],
      [un ? a[1] : a[2]].concat(lv > 2 ? [R.pick(others(AUD, a))[un ? 2 : 1]] : []), { fig: W.means('people', a[0]),
      hint: 'Intended: who it was made for. Unintended: who might see it anyway.', explain: 'Made for ' + a[1] + '; might reach ' + a[2] + '.', meta: { k: 'g8-audience', s: a[0], un: un } });
  }
  function purpose() {
    var p = R.pick(PURPOSE);
    return Q.tiles('What is the main purpose of <b>' + p[0] + '</b>?', p[1], others(PURPOSES, p[1]), { hint: 'Is it trying to make you act, know, laugh or buy?',
      explain: p[0] + ': <b>' + p[1] + '</b>.', meta: { k: 'g8-media-purpose', s: p[0] } });
  }
  function purposeTf() {
    var p = R.pick(PURPOSE), said = R.int(0, 1) ? p[1] : R.pick(others(PURPOSES, p[1]));
    return tf('The main purpose of <b>' + p[0] + '</b> is <b>' + said + '</b>.', W.icon('screen'), said === p[1], ['Every media text is made for a purpose.', 'Media texts have no purpose.'],
      { hint: 'Act, know, laugh or buy?', explain: p[1] + '.', meta: { k: 'g8-media-purpose-tf', s: p[0], said: said } });
  }
  function audienceMatch() {
    return { q: 'Match each media text to the audience it was made for.', type: 'match', pairs: R.some(AUD, 3).map(function (a) { return [a[0], a[1]]; }),
      hint: 'Who was it made for?', explain: 'The intended audience shapes the form and the message.', meta: { k: 'g8-audience-match' } };
  }

  /* ---------- design ---------- */
  function designTool(lv) {
    var t = R.pick(TOOLS);
    return Q.one(lvQ(lv, ['Which tool suits this job?', 'You need to <b>' + t[0] + '</b>. Which tool?', 'Which digital tool would you choose?']), t[1], R.some(others(TOOLSET, t[1]), lv > 1 ? 3 : 2), {
      fig: lv === 2 ? '' : W.means('screen', t[0]), hint: 'Numbers, sound, layout, a talk, video, or a sign?', explain: t[1] + '.', meta: { k: 'g8-design-tool', job: t[0] } });
  }
  function matchTool() {
    var ts = R.some(TOOLSET, 3);
    return { q: 'Match each job to the tool that suits it.', type: 'match', pairs: ts.map(function (x) { return [R.pick(TOOLS.filter(function (t) { return t[1] === x; }))[0], x]; }),
      hint: 'Numbers, sound, layout, a talk, video, or a sign?', explain: 'Choose the tool that fits the message and the audience.', meta: { k: 'g8-match-tool' } };
  }
  function design() {
    return { q: 'Put the design process in order.', type: 'order', items: DESIGN.slice(), first: 'First', last: 'Last',
      hint: 'Understand first. Improve last.', explain: 'Understand, brainstorm, build, test, improve.', meta: { k: 'g8-design' } };
  }
  function designStep(lv) {
    var d = R.pick(DSTEP);
    return Q.tiles('Which step of the design process is this?', STEPS[d[1]], R.some(others(STEPS, STEPS[d[1]]), lv > 1 ? 3 : 2), { fig: W.means('star', d[0]),
      hint: 'Understand, brainstorm, build, test, improve.', explain: STEPS[d[1]] + '.', meta: { k: 'g8-design-step', s: d[0] } });
  }

  /* ---------- respect ---------- */
  function respect(lv) {
    var r = R.pick(RESPECT);
    return Q.one(lvQ(lv, ['What is the respectful thing to do?', 'What would a good teammate do?', 'Which reply keeps everyone included?']), r[1], r[2].slice(0, lv > 1 ? 2 : 1), {
      fig: W.means('people', r[0]), prompt: 'Is it kind? Is it fair? Does everyone belong?', hint: 'Treat people online the way you would face to face.', explain: r[1], meta: { k: 'g8-respect', s: r[0] } });
  }
  function respectTf() {
    var r = R.pick(RESPECT), shown = R.int(0, 1) ? r[1] : R.pick(r[2]);
    return tf('Is this a respectful choice?', W.means('people', r[0]) + W.sent(shown), shown === r[1], ['Respect online is the same as respect face to face.', 'Online, anything goes.'],
      { hint: 'Would everyone feel included?', explain: r[1], meta: { k: 'g8-respect-tf', s: shown } });
  }
  function aware(lv) {
    return Q.all('Pick every way to show <b>cultural awareness</b>.', R.some(AWARE, 2), R.some(UNAWARE, lv > 1 ? 3 : 2), {
      hint: 'Does it show respect for someone' + AP + 's culture and identity?', explain: 'Learn, ask, and include.', meta: { k: 'g8-aware' } });
  }
  function awareTf() {
    var a = R.int(0, 1) ? R.pick(AWARE) : R.pick(UNAWARE);
    return tf('Does this show <b>cultural awareness</b>?', W.sent(a), AWARE.indexOf(a) >= 0, ['Cultural awareness means learning, asking and including.', 'Any joke about a culture is fine online.'],
      { hint: 'Does it respect the culture?', explain: 'Learn, ask, and include.', meta: { k: 'g8-aware-tf', s: a } });
  }

  Atlas.register('media', {
    full: true,
    lessons: [{
      id: 'safe', title: 'Rights, privacy and safety', sub: 'Your digital identity, permission, scams and passwords.',
      concepts: [
        { slug: 'identity', title: 'Your posts build your digital identity', exp: ['A2.1'], skill: 'identity',
          model: [
            step(W.means('screen', PROUD[1]), 'Something you would be proud of in five years.'),
            step(W.means('screen', REGRET[1]), 'Their photo, their right: ask first.'),
            step(W.sent(RIGHTS[2][0]), 'Deleting is not enough.'),
            step(W.means('screen', PROUD[8]), 'It shows who you are.'),
            step(W.means('screen', REGRET[5]), 'Never share where you live.')
          ],
          guided: [function () { return identity(1); }, rightsTf, postTf],
          check: [function () { return identity(2); }, function () { return rightsTf(2); }, function () { return pickProud(2); }, postTf, function () { return identity(3); }],
          coach: '<p>Search the child' + AP + 's name together and talk about what comes up. Agree on a family rule for posting photos of other people.</p>',
          mistake: '<p>Believing a deleted post or a disappearing message is gone for good.</p>' },
        { slug: 'scams', title: 'Protect your accounts and data', exp: ['A2.2'], skill: 'privacy',
          model: [
            step(W.passage('', SCAMS[0]), 'A rush, a threat, a strange link: a scam.'),
            step(W.passage('', SCAMS[1]), 'A prize for your password? Another scam.'),
            step(W.sent(WEAK[1]) + ' ' + W.sent(PHRASES[0]), 'A long passphrase beats a name and a year.'),
            step(W.means('lock', PRIV[0][0]), 'Only while you use the app, or not at all.')
          ],
          guided: [function () { return password(1); }, phishing, function () { return privacySafe(1); }],
          check: [function () { return password(2); }, strongTf, phishing, function () { return privacySafe(2); }, function () { return password(3); }],
          coach: '<p>Check the privacy settings on one app together. Talk about taking breaks from screens when they affect mood or sleep.</p>',
          mistake: '<p>Using the same password everywhere, or one with a birthday or pet' + AP + 's name in it.</p>' }
      ]
    }, {
      id: 'info', title: 'True, false and chosen for you', sub: 'Misinformation, disinformation, feeds and fair use.',
      concepts: [
        { slug: 'kinds', title: 'Misinformation, disinformation, curated', exp: ['A2.3'], skill: 'info',
          model: [
            step(W.sent(INFO[0][0]), 'False by mistake: <b>misinformation</b>.'),
            step(W.sent(INFO[5][0]), 'False on purpose: <b>disinformation</b>.'),
            step(W.sent(INFO[10][0]), 'Chosen for you by an app: <b>curated</b>.'),
            step(W.sent(INFO[2][0]), 'A mistake again.'),
            step(W.sent(INFO[7][0]), 'A trick again.')
          ],
          guided: [function () { return infoKind(1); }, feedTf, infoTf],
          check: [function () { return infoKind(2); }, matchInfo, function () { return feedTf(2); }, infoTf, function () { return infoKind(3); }],
          coach: '<p>When a surprising claim comes up at home, say aloud: "Who made this? Where else can we check it?"</p>',
          mistake: '<p>Thinking a video with millions of views must be true.</p>' },
        { slug: 'check', title: 'Check before you share or use', exp: ['A2.3'], skill: 'fair-use',
          model: [
            step(W.icon('think'), 'Stop. Who made it?'),
            step(W.icon('read'), 'Look for the claim in other reliable sources.'),
            step(W.means('screen', ETHICS[0][0]), 'Get permission and credit the creator.'),
            step(W.means('screen', ETHICS[2][0]), 'Your own words, and cite the source.')
          ],
          guided: [checkOrder, function () { return ethics(1); }, ethicsTf],
          check: [function () { return ethics(2); }, checkOrder, ethicsTf, function () { return pickEthical(2); }, function () { return ethics(3); }],
          coach: '<p>Show the child how to find images with a free-to-use licence, and how to credit them.</p>',
          mistake: '<p>Thinking anything online is free to copy.</p>' }
      ]
    }, {
      id: 'techniques', title: 'How media works on you', sub: 'Persuasive techniques, audience and purpose.',
      concepts: [
        { slug: 'techniques', title: 'Name the persuasive technique', exp: ['A2.4'], skill: 'techniques',
          model: [
            step(W.sent(TECH[0][0]), '<b>Bandwagon</b>: everyone else does.'),
            step(W.sent(TECH[3][0]), '<b>Testimonial</b>: a star says so.'),
            step(W.sent(TECH[6][0]), '<b>Scarcity</b>: hurry before it is gone.'),
            step(W.sent(TECH[9][0]), '<b>Emotional appeal</b>: it tugs at feelings.'),
            step(W.sent(TECH[12][0]), '<b>Expert statistic</b>: numbers from experts.')
          ],
          guided: [function () { return technique(1); }, techTf, function () { return techWhich(1); }],
          check: [function () { return technique(2); }, matchTechnique, techTf, function () { return techWhich(2); }, function () { return technique(3); }],
          coach: '<p>Pause ads during a show and name the technique together. Ask: "Did it work on you? Why?"</p>',
          mistake: '<p>Believing ads do not affect you. Techniques work best when we do not notice them.</p>' },
        { slug: 'audience', title: 'Intended and unintended audiences', exp: ['A2.5'], skill: 'audience',
          model: [
            step(W.means('people', AUD[0][0]), 'Made for the friends in the chat.'),
            step(W.icon('screen'), 'One screenshot, and the teacher sees it.'),
            step(W.means('people', AUD[3][0]), 'Made for young children.'),
            step(W.icon('people'), 'Parents see it too, and get asked to buy.'),
            step(W.means('think', 'Who made it, for whom, and why?'), 'Purpose shapes the form and the message.')
          ],
          guided: [function () { return audience(1); }, purpose, purposeTf],
          check: [function () { return audience(2); }, audienceMatch, purpose, purposeTf, function () { return audience(3); }],
          coach: '<p>Before the child posts or sends anything, ask: "Who else could end up seeing this?"</p>',
          mistake: '<p>Thinking a private chat stays private.</p>' }
      ]
    }, {
      id: 'create', title: 'Create and collaborate', sub: 'Design with digital tools and work well with others.',
      concepts: [
        { slug: 'design', title: 'Design it for real users', exp: ['A2.6'], skill: 'design',
          model: [
            step(W.means('people', DSTEP[0][0]), 'Understand the users first.'),
            step(W.means('star', DSTEP[2][0]), 'Then brainstorm.'),
            step(W.means('screen', DSTEP[4][0]), 'Build a first version.'),
            step(W.means('people', DSTEP[6][0]), 'Test it with real users.'),
            step(W.icon('again'), DSTEP[8][0])
          ],
          guided: [function () { return designTool(1); }, function () { return designStep(1); }, design],
          check: [function () { return designTool(2); }, matchTool, function () { return designStep(2); }, design, function () { return designTool(3); }],
          coach: '<p>Try the "Design a digital solution" activity in this chapter. The testing step matters most.</p>',
          mistake: '<p>Choosing a tool first, before understanding the problem.</p>' },
        { slug: 'respect', title: 'Respectful and inclusive online', exp: ['A2.7'], skill: 'respect',
          model: [
            step(W.means('people', RESPECT[0][0]), 'Name what you like, then add yours.'),
            step(W.means('talk', RESPECT[1][0]), 'Invite them in.'),
            step(W.sent(AWARE[0]), 'Cultural awareness starts with names.'),
            step(W.means('people', RESPECT[3][0]), 'Do not pass it on.')
          ],
          guided: [function () { return respect(1); }, respectTf, aware],
          check: [function () { return respect(2); }, function () { return aware(2); }, respectTf, awareTf, function () { return respect(3); }],
          coach: '<p>Model it: in a family group chat, thank people for ideas before you disagree.</p>',
          mistake: '<p>Typing something you would never say in person.</p>' }
      ]
    }],
    practice: [
      { id: 'identity', name: 'Digital identity and rights', code: 'A2.1', gen: identity },
      { id: 'privacy', name: 'Privacy and security', code: 'A2.2', gen: password },
      { id: 'info', name: 'Misinformation, disinformation and feeds', code: 'A2.3', gen: infoKind },
      { id: 'fair-use', name: 'Checking and fair use', code: 'A2.3', gen: ethics },
      { id: 'techniques', name: 'Persuasive techniques', code: 'A2.4', gen: technique },
      { id: 'audience', name: 'Audience and purpose', code: 'A2.5', gen: audience },
      { id: 'design', name: 'The design process', code: 'A2.6', gen: designTool },
      { id: 'respect', name: 'Respectful collaboration', code: 'A2.7', gen: respect }
    ],
    tasks: [
      { id: 'footprint', title: 'My digital footprint', code: 'A2.1', pic: W.icon('screen'), say: 'Search your name with a grown-up. What does your digital identity say about you?', write: true,
        run: ['Together, search the child' + AP + 's name and look at one account' + AP + 's privacy settings.', 'The child writes what they found, what they would change, and one rule they will follow about posting others.'],
        rubric: ['Does not reflect yet.', 'Describes what they found.', 'Explains their rights and responsibilities and sets a rule.', 'Evaluates their identity thoughtfully and plans specific changes to settings and habits.'] },
      { id: 'fact-check', title: 'Fact-check a viral claim', code: 'A2.3', pic: W.icon('think'), say: 'Choose a claim going around online. Is it true? Show how you know.', write: true,
        run: ['Choose a claim together (a health tip, a "did you know" fact, an edited photo).', 'The child finds who made it, checks two reliable sources, and decides: true, misinformation or disinformation.'],
        rubric: ['Accepts the claim without checking.', 'Checks one source.', 'Checks who made it and two reliable sources, and decides.', 'Explains the evidence clearly, and how the claim spread.'] },
      { id: 'ad-analysis', title: 'Take an ad apart', code: 'A2.5', pic: W.icon('screen'), say: 'Choose a real ad. Name its techniques, audience and purpose.', write: true,
        run: ['Choose an ad (a flyer, an online ad, a commercial).', 'The child names the techniques, the intended and possible unintended audience, and the purpose, and explains how the form helps the message.'],
        rubric: ['Describes the ad only.', 'Names its purpose.', 'Names techniques, audience and purpose with examples.', 'Evaluates how well the form, techniques and message work for the audience.'] },
      { id: 'design-solution', title: 'Design a digital solution', code: 'A2.6', pic: W.icon('star'), say: 'Find a real problem. Design a digital solution, test it and improve it.', write: true,
        run: ['Pick a real problem (a club no one knows about, forgotten chores, a local event).', 'The child plans, chooses a tool (slides, video, poster app, website builder), builds a first version, tests it with two people and improves it.'],
        rubric: ['No plan; unfinished.', 'Builds something; skips testing.', 'Follows the design process and improves after testing.', 'An original, well-tested solution that suits its users.'],
        coach: '<p>Ask the testers what confused them, not just whether they liked it.</p>' },
      { id: 'group-project', title: 'Collaborate online', code: 'A2.7', pic: W.icon('people'), say: 'Work on a shared document with a classmate or relative. Be respectful and include everyone.',
        run: ['Set up a shared document for a small project.', 'Watch how the child comments, disagrees, credits ideas and includes others.'],
        rubric: ['Comments are unkind or missing.', 'Polite, but does not include others.', 'Respectful, inclusive comments; credits ideas.', 'Models respect and cultural awareness, and helps the group work well.'] }
    ]
  });

  Q.shapes('media', {
    identity: [[1, 'true-false', rightsTf], [1, 'proud', postTf], [2, 'pick', pickProud]],
    privacy: [[1, 'true-false', strongTf], [1, 'phishing', phishing], [1, 'safe-choice', privacySafe]],
    info: [[1, 'true-false', infoTf], [1, 'feed', feedTf], [2, 'match', matchInfo]],
    'fair-use': [[1, 'true-false', ethicsTf], [1, 'check', checkOrder], [2, 'pick', pickEthical]],
    techniques: [[1, 'true-false', techTf], [1, 'which-line', techWhich], [2, 'match', matchTechnique]],
    audience: [[1, 'purpose', purpose], [1, 'true-false', purposeTf], [2, 'match', audienceMatch]],
    design: [[1, 'step', designStep], [1, 'order', design], [2, 'match', matchTool]],
    respect: [[1, 'true-false', respectTf], [1, 'aware', aware], [1, 'aware-true-false', awareTf]]
  });
})();
