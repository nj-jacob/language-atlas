/* Grade 7: how texts work. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 7, C1 Knowledge about Texts:
   C1.2 text forms and genres, including cultural text forms                 C1.3 text patterns (such as cause and effect) and text features (such as a bibliography and accessible fonts)
   C1.4 how images, graphics and visual design create meaning                C1.5 elements of style: voice, word choice, word patterns, sentence structure
   C1.6 the narrator's point of view (first, second or third person), with evidence, and how another point of view would change the story
   With a grown-up: C1.7 texts by diverse First Nations, Métis and Inuit creators, through Indigenous Storywork.
   Passages are in ../texts.js; snippets here are written for this site. Answer checks: tests/verify/grade7-how-texts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var AP = '’', Q1 = '“', Q2 = '”';
  function others(list, item, n) { return R.some(list.filter(function (x) { return x !== item; }), n); }
  function an(w) { return (/^[aeiou]/.test(w) ? 'an ' : 'a ') + w; }

  /* ---------- forms and genres (C1.2) ---------- */
  var KINDS = ['information text', 'story', 'opinion piece', 'fable', 'poem', 'news report'];
  var CLUE = { 'information text': 'It has headings that organize facts.', story: 'It has characters and events, told by a narrator.', 'opinion piece': 'It argues for a position and asks the reader to act.',
    fable: 'It has simple characters and teaches a lesson.', poem: 'It uses short lines, sound and images.', 'news report': 'It tells who, what, when and where about a recent event.' };
  var FORMS = [['fable', 'a short story with a lesson, often with simple, symbolic characters'], ['memoir', 'a true story from the writer' + AP + 's own life'], ['opinion piece', 'argues for a position with reasons'],
    ['news report', 'tells who, what, when, where and why about a recent event'], ['oral story', 'passed down by telling and listening, often across generations'],
    ['graphic novel', 'tells a story in panels of pictures and words'], ['poem', 'uses lines, sound and images to say a lot in few words'], ['biography', 'tells the true story of another person' + AP + 's life'],
    ['interview', 'gives one person' + AP + 's answers to someone' + AP + 's questions'], ['procedure', 'gives numbered steps to follow']];
  function kindOf(lv) { return R.pick(T.list('kind', lv)); }
  function form(lv) {
    var t = kindOf(lv);
    return Q.tiles('What form of text is this?', t.kind, others(KINDS, t.kind, lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at its shape and purpose: headings, characters, an argument, a lesson, short lines, or a recent event?', explain: '<b>' + an(t.kind) + '</b>. ' + CLUE[t.kind], meta: { k: 'g7-form', t: t.title } });
  }
  function formClue(lv) {
    var t = kindOf(lv);
    return Q.one('This is ' + an(t.kind) + '. What shows it?', CLUE[t.kind], others(KINDS, t.kind, lv > 1 ? 2 : 1).map(function (k) { return CLUE[k]; }), { fig: T.show(t),
      hint: 'Look at how the text is built.', explain: CLUE[t.kind], meta: { k: 'g7-form-clue', t: t.title } });
  }
  function formTf() {
    var t = kindOf(2), right = R.int(0, 1) === 1, said = right ? t.kind : R.pick(others(KINDS, t.kind, 1));
    return { q: Q.name() + ' says this is <b>' + an(said) + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['Its features fit that form.', 'Its features fit another form.'], answer: right ? 0 : 1 }, hint: 'Look at how it is built and what it is for.',
      explain: '<b>' + an(t.kind) + '</b>. ' + CLUE[t.kind], meta: { k: 'g7-form-tf', t: t.title, said: said } };
  }
  function formWhich(lv) {
    var f = R.pick(FORMS);
    return Q.one('Which form of text ' + f[1] + '?', f[0], others(FORMS, f, lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Picture one you have read, heard or seen.', explain: '<b>' + an(f[0]) + '</b> ' + f[1] + '.', meta: { k: 'g7-form-which', f: f[0] } });
  }
  function formMatch() {
    var fs = R.some(FORMS, 3);
    return { q: 'Match each form to what it does.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think of an example of each.', explain: 'Each form has features that help it do its job.', meta: { k: 'g7-form-match' } };
  }

  /* ---------- text patterns (C1.3): [snippet, pattern, its signal word] ---------- */
  var PATTERNS = ['cause and effect', 'compare and contrast', 'time order', 'problem and solution'];
  var PAT = [['Because the factory closed, many families moved away.', 0, 'Because'], ['Warmer winters mean the ice melts sooner. As a result, the roads close early.', 0, 'As a result'],
    ['Heavy rain fell all night. Therefore, the game was cancelled.', 0, 'Therefore'], ['The dam raised the water level. Consequently, the rice beds drowned.', 0, 'Consequently'],
    ['Solar panels work best on sunny days. Wind turbines, however, work day and night.', 1, 'however'], ['Both frogs and toads lay eggs in water, but toads have drier skin.', 1, 'Both'],
    ['Unlike a furnace, a heat pump burns nothing.', 1, 'Unlike'], ['Canoes are light to carry. Similarly, kayaks are easy to lift.', 1, 'Similarly'],
    ['First, the sap is collected. Next, it is boiled for hours.', 2, 'First'], ['In the morning, the team packed the canoes. By noon, they reached the portage.', 2, 'By noon'],
    ['After the harvest, the rice is dried in the sun.', 2, 'After'], ['In 1867, four provinces joined to form Canada. Later, others joined too.', 2, 'Later'],
    ['The problem: our school wastes paper. One solution is to share notes online.', 3, 'solution'], ['The trail kept flooding. To fix this, the town built a raised boardwalk.', 3, 'To fix this'],
    ['Geese kept landing on the field. The town solved it by planting tall grass.', 3, 'solved'], ['Students could not hear the speaker. The answer was a set of microphones.', 3, 'The answer was']];
  function pattern(lv) {
    var p = R.pick(PAT);
    return Q.tiles('Which text pattern does this use?', PATTERNS[p[1]], others(PATTERNS, PATTERNS[p[1]], lv > 1 ? 3 : 2), { fig: W.sent(p[0].replace(p[2], '<mark class="hl">' + p[2] + '</mark>')),
      prompt: 'Look at the marked signal word.', hint: 'Signal words show the pattern.', explain: '<b>' + p[2] + '</b> signals <b>' + PATTERNS[p[1]] + '</b>.', meta: { k: 'g7-pattern', s: p[0] } });
  }
  function signal(lv) {
    var p = R.pick(PAT), words = p[0].replace(/[,.:]/g, '').split(' ').filter(function (w) { return w.length > 3 && p[2].indexOf(w) < 0; });
    return Q.tiles('Which signal word shows <b>' + PATTERNS[p[1]] + '</b>?', p[2], R.some(words, lv > 1 ? 3 : 2), { fig: W.sent(p[0]),
      hint: 'Signal words join ideas: because, however, first, solution.', explain: W.sent(p[0].replace(p[2], '<mark class="hl">' + p[2] + '</mark>')), meta: { k: 'g7-signal', s: p[0] } });
  }
  function patternTf() {
    var p = R.pick(PAT), right = R.int(0, 1) === 1, said = right ? PATTERNS[p[1]] : R.pick(others(PATTERNS, PATTERNS[p[1]], 1));
    return { q: Q.name() + ' says this uses <b>' + said + '</b>.', fig: W.sent(p[0]), type: 'tf', answer: right,
      why: { options: ['The signal words show that pattern.', 'The signal words show a different pattern.'], answer: right ? 0 : 1 }, hint: 'Find the signal word first.',
      explain: '<b>' + p[2] + '</b> signals <b>' + PATTERNS[p[1]] + '</b>.', meta: { k: 'g7-pattern-tf', s: p[0], said: said } };
  }
  function patternText(lv) {
    var t = R.pick(T.list('pattern', lv).filter(function (x) { return PATTERNS.indexOf(x.pattern) >= 0; }));
    return Q.tiles('Which pattern organizes this whole text?', t.pattern, others(PATTERNS, t.pattern, lv > 1 ? 3 : 2), { fig: T.show(t), hint: 'Look at the headings and the signal words.',
      explain: 'It is organized by <b>' + t.pattern + '</b>.', meta: { k: 'g7-pattern-text', t: t.title } });
  }

  /* ---------- text features (C1.3): [feature, what it does, a small example] ---------- */
  var FEAT = [['bibliography', 'lists the sources the writer used', 'Chen, L. (2024). <i>Winter Roads</i>. North Press.'], ['glossary', 'explains key words', '<b>muskeg</b>: wet, spongy ground in the north'],
    ['index', 'helps you find a topic by page', 'canoes, 12, 45 &middot; caribou, 30'], ['sidebar', 'adds extra information beside the main text', '<b>Did you know?</b> Some winter roads are over 100 km long.'],
    ['caption', 'explains a picture', 'Photo: A truck crosses a frozen lake near Moosonee.'], ['accessible font', 'is clear and easy for everyone to read'],
    ['table of contents', 'lists the chapters and where they start', '1. What they are ... 2 &middot; 2. Why they matter ... 5'], ['heading', 'names what a section is about', '<b>A shorter season</b>'],
    ['footnote', 'adds a note at the bottom of the page', '<sup>1</sup> Numbers from 2024.'], ['alt text', 'describes an image for people who cannot see it', 'Image description: a red truck on a snowy road']];
  function feature(lv) {
    var f = R.pick(FEAT);
    return Q.one('Which text feature <b>' + f[1] + '</b>?', f[0], others(FEAT, f, lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Picture a non-fiction book or web page. Where would you find it?', explain: 'A <b>' + f[0] + '</b> ' + f[1] + '.', meta: { k: 'g7-feature', f: f[0] } });
  }
  function featureSample(lv) {
    var f = R.pick(FEAT.filter(function (x) { return x[2]; }));
    return Q.tiles('Which text feature is this?', f[0], others(FEAT, f, lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { fig: W.sent(f[2]),
      hint: 'What job does it do on the page?', explain: 'A <b>' + f[0] + '</b> ' + f[1] + '.', meta: { k: 'g7-feature-sample', f: f[0] } });
  }
  function featureTf() {
    var f = R.pick(FEAT), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(others(FEAT, f, 1))[1];
    return { q: Q.name() + ' says a <b>' + f[0] + '</b> ' + said + '.', type: 'tf', answer: right, fig: W.tile(f[0]),
      why: { options: ['That is the job of this feature.', 'That is the job of another feature.'], answer: right ? 0 : 1 }, hint: 'Picture where it sits on the page.',
      explain: 'A <b>' + f[0] + '</b> ' + f[1] + '.', meta: { k: 'g7-feature-tf', f: f[0], said: said } };
  }
  function featureMatch() {
    var fs = R.some(FEAT, 3);
    return { q: 'Match each feature to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Each feature helps the reader in one way.', explain: 'Features help readers find and understand information.', meta: { k: 'g7-feature-match' } };
  }

  /* ---------- graphics (C1.4): [what you want to show, the best graphic] ---------- */
  var GRAPHICS = [['how a town' + AP + 's population changed over 50 years', 'a line graph'], ['how the creek' + AP + 's temperature changed week by week', 'a line graph'],
    ['which of four lakes is the deepest', 'a bar graph'], ['how many students chose each club', 'a bar graph'], ['the order of events in a long history', 'a timeline'], ['the years each province joined Canada', 'a timeline'],
    ['where the winter roads are', 'a map'], ['the route of a canoe trip', 'a map'], ['the parts of a canoe', 'a labelled diagram'], ['the parts of a heat pump', 'a labelled diagram'],
    ['what a street looked like in 1920', 'a photograph'], ['what a real inuksuk looks like', 'a photograph'], ['how the club budget is split up', 'a pie chart'], ['what share of students walk, bus or are driven', 'a pie chart']];
  var GWHY = { 'a line graph': 'It shows change over time.', 'a bar graph': 'It compares amounts side by side.', 'a timeline': 'It shows events in order.', 'a map': 'It shows where things are.',
    'a labelled diagram': 'It names the parts of something.', 'a photograph': 'It shows what something really looks like.', 'a pie chart': 'It shows parts of a whole.' };
  var GKINDS = Object.keys(GWHY);
  function graphic(lv) {
    var g = R.pick(GRAPHICS);
    return Q.tiles('Which graphic best shows <b>' + g[0] + '</b>?', g[1], others(GKINDS, g[1], lv > 1 ? 3 : 2), {
      hint: 'Change over time? Comparing amounts? Order? Place? Parts? A real scene? Parts of a whole?', explain: '<b>' + g[1] + '</b>: ' + GWHY[g[1]], meta: { k: 'g7-graphic', g: g[0] } });
  }
  function graphicTf() {
    var g = R.pick(GRAPHICS), right = R.int(0, 1) === 1, said = right ? g[1] : R.pick(others(GKINDS, g[1], 1));
    return { q: Q.name() + ' says ' + said + ' is the best way to show <b>' + g[0] + '</b>.', type: 'tf', answer: right,
      why: { options: ['That graphic fits this kind of information.', 'Another graphic would show it more clearly.'], answer: right ? 0 : 1 },
      hint: 'What kind of information is it?', explain: '<b>' + g[1] + '</b>: ' + GWHY[g[1]], meta: { k: 'g7-graphic-tf', g: g[0], said: said } };
  }
  function graphicWhy(lv) {
    var k = R.pick(GKINDS);
    return Q.one('Why would a writer choose <b>' + k + '</b>?', GWHY[k], others(GKINDS, k, lv > 1 ? 3 : 2).map(function (x) { return GWHY[x]; }), { hint: 'What is it best at showing?',
      explain: '<b>' + k + '</b>: ' + GWHY[k], meta: { k: 'g7-graphic-why', g: k } });
  }
  function graphicMatch() {
    var ks = R.some(GKINDS, 3);
    return { q: 'Match each kind of information to its graphic.', type: 'match', pairs: ks.map(function (k) { return [R.pick(GRAPHICS.filter(function (g) { return g[1] === k; }))[0], k]; }),
      hint: 'Change, amounts, order, place, parts or a whole?', explain: 'The best graphic shows its information at a glance.', meta: { k: 'g7-graphic-match' } };
  }

  /* ---------- visual design (C1.4): [design choice, its effect] ---------- */
  var DESIGN = [['a heading in large, bold type', 'shows what matters most'], ['a red box with a warning sign', 'grabs attention and signals danger'], ['lots of empty space around one photo', 'makes the photo stand out'],
    ['the same colour for every heading', 'shows which parts belong together'], ['a close-up photo of a worried face', 'makes the reader feel the emotion'], ['bullet points instead of a long paragraph', 'makes the information quick to scan'],
    ['an arrow pointing to part of a diagram', 'shows exactly where to look'], ['a large, clear font with space between the lines', 'makes the text easier for everyone to read'],
    ['a photo of smiling students beside a club poster', 'makes the club look friendly and welcoming'], ['a small picture beside each step', 'helps readers follow the steps with fewer words']];
  function design(lv) {
    var d = R.pick(DESIGN);
    return Q.one('Why would a designer use <b>' + d[0] + '</b>?', d[1], others(DESIGN, d, lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'What does your eye do when it sees it?', explain: d[1] + '.', meta: { k: 'g7-design', d: d[0] } });
  }
  function designWhich(lv) {
    var d = R.pick(DESIGN);
    return Q.one('A designer wants something that <b>' + d[1] + '</b>. Which choice fits?', d[0], others(DESIGN, d, lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), {
      hint: 'Picture each choice on a page.', explain: '<b>' + d[0] + '</b> ' + d[1] + '.', meta: { k: 'g7-design-which', d: d[0] } });
  }
  function designTf() {
    var d = R.pick(DESIGN), right = R.int(0, 1) === 1, said = right ? d[1] : R.pick(others(DESIGN, d, 1))[1];
    return { q: Q.name() + ' says <b>' + d[0] + '</b> ' + said + '.', type: 'tf', answer: right,
      why: { options: ['That is what this choice does.', 'Another choice does that.'], answer: right ? 0 : 1 }, hint: 'Picture it on a page.', explain: '<b>' + d[0] + '</b> ' + d[1] + '.', meta: { k: 'g7-design-tf', d: d[0], said: said } };
  }
  function designMatch() {
    var ds = R.some(DESIGN, 3);
    return { q: 'Match each design choice to its effect.', type: 'match', pairs: ds.map(function (d) { return [d[0], d[1]]; }), hint: 'Picture each one on a page.', explain: 'Design choices guide the reader' + AP + 's eye and feelings.', meta: { k: 'g7-design-match' } };
  }

  /* ---------- style (C1.5): [snippet, element of style, effect] ---------- */
  var STYLE = [['I ran. I fell. I got up.', 'short sentences', 'builds tension and speed'], ['Drip. Drip. Crack. The creek wakes up.', 'sound words', 'lets you hear the scene'],
    ['We will not give up. We will not back down. We will not be silent.', 'repetition', 'makes the message stick and sound powerful'],
    ['The wind howled and clawed at the cabin.', 'vivid word choice', 'makes the wind seem alive and dangerous'], ['Honestly? I was terrified, and I am not ashamed to say it.', 'a strong personal voice', 'makes the narrator feel real and honest'],
    ['Have you ever stood on a frozen lake and heard it boom beneath you?', 'a question to the reader', 'pulls the reader into the text'],
    ['The canoe slid past the reeds, past the sleeping loons, past the grey rocks of the point, and out into the open lake.', 'a long, flowing sentence', 'slows the reader down to take in the scene'],
    ['The council will consider the proposal at its next meeting.', 'formal word choice', 'sounds serious and official'], ['The northern lights rippled like a green curtain.', 'a simile', 'helps the reader picture it by comparing'],
    ['lol that test was SO easy, no joke', 'casual, chatty words', 'sounds relaxed, like friends talking']];
  var FIT = [['a letter to the city council', 'formal word choice'], ['a text message to a friend', 'casual, chatty words'], ['a speech to rally people for a cause', 'repetition'], ['a tense moment in an adventure story', 'short sentences']];
  function styleElement(lv) {
    var s = R.pick(STYLE);
    return Q.tiles('Which element of style stands out here?', s[1], others(STYLE, s, lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.sent(s[0]),
      hint: 'Look at sentence length, sounds, repeats, strong words, the speaker' + AP + 's personality, or comparisons.', explain: '<b>' + s[1] + '</b>: it ' + s[2] + '.', meta: { k: 'g7-style-element', s: s[0] } });
  }
  function styleEffect(lv) {
    var s = R.pick(STYLE);
    return Q.one('What does the writer' + AP + 's style do here?', s[2], others(STYLE, s, lv > 1 ? 2 : 1).map(function (x) { return x[2]; }), { fig: W.sent(s[0]),
      hint: 'How does it make you feel as a reader?', explain: '<b>' + s[1] + '</b> ' + s[2] + '.', meta: { k: 'g7-style-effect', s: s[0] } });
  }
  function styleTf() {
    var s = R.pick(STYLE), right = R.int(0, 1) === 1, said = right ? s[1] : R.pick(others(STYLE, s, 1))[1];
    return { q: Q.name() + ' says the style here is <b>' + said + '</b>.', fig: W.sent(s[0]), type: 'tf', answer: right,
      why: { options: ['That is what stands out.', 'Something else stands out.'], answer: right ? 0 : 1 }, hint: 'What do you notice first?', explain: '<b>' + s[1] + '</b>: it ' + s[2] + '.', meta: { k: 'g7-style-tf', s: s[0], said: said } };
  }
  function styleFit() {
    var f = R.pick(FIT);
    return Q.one('Which style suits <b>' + f[0] + '</b>?', f[1], others(FIT, f, 2).map(function (x) { return x[1]; }), { hint: 'Who is it for, and what should it make them feel or do?',
      explain: '<b>' + f[1] + '</b> fits ' + f[0] + '.', meta: { k: 'g7-style-fit', f: f[0] } });
  }

  /* ---------- the narrator (C1.6) ---------- */
  var POV = { first: 'first person: the narrator says I', second: 'second person: the narrator says you', third: 'third person: the narrator says he, she or they' };
  var POVWORD = { first: 'I', second: 'You', third: 'He' };
  /* short snippets and their point of view (speech in quotation marks does not count) */
  var POVS = [['I watched as she skated off the ice.', 'first'], [Q1 + 'I am tired,' + Q2 + ' she said, and she sat down.', 'third'], ['You open the door and step into the cold.', 'second'],
    [Q1 + 'You did it!' + Q2 + ' Coach told him.', 'third'], ['My hands shook as I opened the letter.', 'first'], ['They paddled until the sun went down.', 'third'],
    ['You feel the canoe tip, and you grab the sides.', 'second'], ['He knew the answer, but he kept quiet.', 'third'], [Q1 + 'We should go,' + Q2 + ' Mei whispered to her brother.', 'third'],
    ['We packed the car before I could change my mind.', 'first'], ['Your heart pounds as the curtain rises.', 'second'], ['Hana laughed. ' + Q1 + 'You always say that!' + Q2, 'third']];
  /* if another narrator told it: [the story, the new narrator, what would change, what would not] */
  var ALT = [['The Tryout', 'Coach Haddad', 'We would learn what the coach looks for and thinks of each player.', 'We would know less about the coach' + AP + 's thoughts.'],
    ['Grandfather' + AP + 's Compass', 'the grandfather, in the first person', 'We would hear how the grandfather feels about giving the compass away.', 'Nothing would change at all.'],
    ['The Night Before Diwali', 'Priya, in the first person', 'We would hear Priya' + AP + 's own worries and thoughts as she works.', 'We would learn less about how Priya feels.'],
    ['The Long Portage', 'Kenji', 'We would hear how Kenji worries about the storm and his younger sibling.', 'We would know more about the narrator' + AP + 's sore shoulders.'],
    ['The Wall on the River', 'someone from the lower village', 'We would feel what it was like when the wells ran dry.', 'We would learn the upper village' + AP + 's plans in more detail.'],
    ['Between the Posts', 'a narrator in the third person', 'The reader would watch the goalie instead of feeling like the goalie.', 'The reader would feel even more like the goalie.']];
  function stories(lv) { return T.list('pov', lv).filter(function (x) { return x.kind === 'story' || x.kind === 'fable'; }); }
  function narrator(lv) {
    var t = R.pick(stories(lv));
    return Q.tiles('What point of view is this told from?', POV[t.pov], Object.keys(POV).filter(function (p) { return p !== t.pov; }).map(function (p) { return POV[p]; }).slice(0, lv > 1 ? 2 : 1), { fig: T.show(t),
      prompt: 'Look outside the speech marks for I, you, or he, she and they.', hint: 'I: first. You: second. He, she, they: third.', explain: POV[t.pov] + '.', meta: { k: 'g7-narrator', t: t.title } });
  }
  /* the word that shows the point of view, from the narrator's own words (not inside speech marks) */
  function povWord(t) {
    var said = T.body(t).join(' ').replace(/“[^”]*”/g, '');
    if (t.pov !== 'third') return POVWORD[t.pov];
    return ['He', 'She', 'They'].filter(function (w) { return new RegExp('\\b' + w + '\\b', 'i').test(said); })[0];
  }
  function evidence(lv) {
    var t = R.pick(stories(lv).filter(function (x) { return x.kind === 'story'; })), w = povWord(t);
    return Q.tiles('This story is told in the <b>' + t.pov + ' person</b>. Which word is the evidence?', w, Object.keys(POVWORD).filter(function (p) { return p !== t.pov; }).map(function (p) { return POVWORD[p]; }), { fig: T.show(t),
      hint: 'Find the word the narrator uses for the main character.', explain: '<b>' + w + '</b> shows ' + t.pov + ' person.', meta: { k: 'g7-evidence', t: t.title } });
  }
  function povLine(lv) {
    var s = R.pick(POVS);
    return Q.tiles('What point of view is this sentence told from?', POV[s[1]], Object.keys(POV).filter(function (p) { return p !== s[1]; }).map(function (p) { return POV[p]; }).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(s[0]),
      prompt: 'Cover the words inside speech marks first.', hint: 'Words in speech marks belong to a character, not the narrator.', explain: POV[s[1]] + '.', meta: { k: 'g7-pov-line', s: s[0] } });
  }
  function povTf() {
    var s = R.pick(POVS), right = R.int(0, 1) === 1, said = right ? s[1] : R.pick(Object.keys(POV).filter(function (p) { return p !== s[1]; }));
    return { q: Q.name() + ' says this is told in the <b>' + said + ' person</b>.', fig: W.sent(s[0]), type: 'tf', answer: right,
      why: { options: ['The narrator' + AP + 's own words show it.', 'The narrator' + AP + 's own words show another point of view.'], answer: right ? 0 : 1 }, hint: 'Look outside the speech marks.',
      explain: POV[s[1]] + '.', meta: { k: 'g7-pov-tf', s: s[0], said: said } };
  }
  function altView(lv) {
    var a = R.pick(ALT);
    return Q.one('If <b>' + a[1] + '</b> told <b>' + a[0] + '</b>, what would change?', a[2], [a[3]].concat(lv > 1 ? [others(ALT, a, 1)[0][2]] : []), {
      hint: 'A different narrator knows, notices and feels different things.', explain: a[2], meta: { k: 'g7-alt-view', t: a[0] } });
  }

  var ice = T.iceRoad, river = T.river, creek = T.creek;
  Atlas.register('how-texts', {
    full: true,
    lessons: [{
      id: 'forms', title: 'Forms, patterns and features', sub: 'How a text is built helps you read it.',
      concepts: [
        { slug: 'forms', title: 'Each form has its own features', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(ice, 'Without them'), 'Headings that organize facts.'),
            step(W.means('read', 'an information text')),
            step(T.show(river, 'laughed at their clever wall'), 'Simple characters, and a lesson coming.'),
            step(W.means('star', 'a fable')),
            step(T.show(creek, 'too warm for fish'), 'Who, what, when, where: a recent event.'),
            step(W.means('screen', 'a news report'), 'Cultural forms, like an oral story told by an Elder, have their own features too.')
          ],
          guided: [function () { return form(1); }, function () { return formWhich(1); }, function () { return formClue(1); }],
          check: [function () { return form(2); }, formMatch, formTf, function () { return formClue(2); }, function () { return formWhich(3); }],
          coach: '<p>Gather texts from around the house (a news article, a recipe, a comic, a song) and sort them by form. Ask what each form is good at.</p>',
          mistake: '<p>Naming the topic instead of the form ("it is about ice"). Ask: what kind of text is it?</p>' },
        { slug: 'patterns', title: 'Signal words show the pattern', exp: ['C1.3'], skill: 'patterns',
          model: [
            step(W.sent('Warmer winters mean the ice melts sooner. <mark class="hl">As a result</mark>, the roads close early.')),
            step(W.chain(['Warmer winters', 'The roads close early.'], ['Cause', 'Effect']), 'Draw it as an arrow.'),
            step(W.sent('Solar panels work best on sunny days. Wind turbines, <mark class="hl">however</mark>, work day and night.')),
            step(W.web('Two ways to make power', ['solar: sunny days', 'wind: day and night']), 'Two columns: compare and contrast.'),
            step(W.chain(['First', 'Next', 'Finally'], ['Time order']), 'Order words make a timeline.'),
            step(W.chain(['The trail kept flooding.', 'a raised boardwalk'], ['Problem', 'Solution']), 'A problem, then its fix.')
          ],
          guided: [function () { return pattern(1); }, function () { return signal(1); }, function () { return patternText(1); }],
          check: [function () { return pattern(2); }, function () { return signal(2); }, patternTf, function () { return patternText(2); }, function () { return pattern(3); }],
          coach: '<p>When a paragraph is hard, name its pattern first. A cause-and-effect paragraph can be drawn as arrows; a comparison as two columns.</p>',
          mistake: '<p>Seeing "and" or "but" and calling every text a comparison. Look for the main signal words.</p>' },
        { slug: 'features', title: 'Text features help you find and understand', exp: ['C1.3'], skill: 'features',
          model: [
            step(W.sent(FEAT[0][2])),
            step(W.tile('bibliography'), 'The sources the writer used, so you can check them.'),
            step(W.sent(FEAT[1][2])),
            step(W.tile('glossary'), 'Key words explained, at the back.'),
            step(W.sent(FEAT[9][2])),
            step(W.tile('alt text'), 'Features like this and an accessible font let every reader in.')
          ],
          guided: [function () { return feature(1); }, function () { return featureSample(1); }, featureMatch],
          check: [function () { return feature(2); }, function () { return featureSample(2); }, featureTf, featureMatch, function () { return featureSample(3); }],
          coach: '<p>Before reading a non-fiction book, tour its features together: contents, headings, glossary, index, bibliography.</p>',
          mistake: '<p>Skipping captions and sidebars. They often hold the most useful facts.</p>' }
      ]
    }, {
      id: 'visuals-style', title: 'Visuals and style', sub: 'Pictures, design and the writer' + AP + 's choices.',
      concepts: [
        { slug: 'graphics', title: 'Choose the graphic that fits the information', exp: ['C1.4'], skill: 'graphics',
          model: [
            step(W.means('think', GRAPHICS[1][0]), 'Change over time.'),
            step(W.means('star', 'a line graph')),
            step(W.means('think', GRAPHICS[3][0]), 'Comparing amounts.'),
            step(W.means('star', 'a bar graph')),
            step(W.means('think', GRAPHICS[7][0]), 'Where things are.'),
            step(W.means('star', 'a map'), 'Ask what kind of information it is first.')
          ],
          guided: [function () { return graphic(1); }, function () { return graphicWhy(1); }, graphicMatch],
          check: [function () { return graphic(2); }, graphicTf, function () { return graphicWhy(2); }, graphicMatch, function () { return graphic(3); }],
          coach: '<p>Find a graph in a newspaper or website. Ask: "What does this show faster than words could?"</p>',
          mistake: '<p>Ignoring the graphic and reading only the words. The graphic often carries the main point.</p>' },
        { slug: 'design', title: 'Design guides the eye', exp: ['C1.4'], skill: 'design',
          model: [
            step(W.means('star', 'large, bold heading'), 'Look here first.'),
            step(W.means('not', 'red box, warning sign'), 'Danger.'),
            step(W.means('screen', 'empty space around one photo'), 'The photo stands out.'),
            step(W.means('read', 'bullet points'), 'A new page: quick to scan.'),
            step(W.means('people', 'large, clear font'), 'Easier for everyone to read.')
          ],
          guided: [function () { return design(1); }, function () { return designWhich(1); }, designMatch],
          check: [function () { return design(2); }, designMatch, designTf, function () { return designWhich(2); }, function () { return design(3); }],
          coach: '<p>Compare two posters or web pages. Where did your eye go first? Why?</p>',
          mistake: '<p>Thinking design is only decoration. Size, colour and space all carry meaning.</p>' },
        { slug: 'style', title: 'Style shapes how a text feels', exp: ['C1.5'], skill: 'style',
          model: [
            step(W.sent('I ran. I fell. I got up.'), 'Short sentences: tension.'),
            step(W.sent(STYLE[6][0]), 'One long sentence: slow and calm.'),
            step(W.sent('We will not give up. We will not back down.'), 'Repetition: power.'),
            step(W.sent('The council will consider the proposal.'), 'Formal words for an official text.'),
            step(W.sent('lol that test was SO easy'), 'Casual words for a friend. Style fits the form.')
          ],
          guided: [function () { return styleElement(1); }, function () { return styleEffect(1); }, styleFit],
          check: [function () { return styleElement(2); }, function () { return styleEffect(2); }, styleTf, styleFit, function () { return styleElement(3); }],
          coach: '<p>Read a favourite passage aloud and ask: "What did the writer do here that makes it work?"</p>',
          mistake: '<p>Naming a device without its effect. Always add: "...and that makes the reader feel..."</p>' },
        { slug: 'narrator', title: 'Who is telling the story?', exp: ['C1.6'], skill: 'narrator',
          model: [
            step(W.sent('<b>I</b> tied my left shoe twice.'), 'First person.'),
            step(W.sent('<b>You</b> crouch low as the forward races up the ice.'), 'Second person: you are in the story.'),
            step(W.sent('<b>He</b> held the compass in his pocket.'), 'Third person.'),
            step(W.sent(Q1 + '<b>I</b> am tired,' + Q2 + ' <b>she</b> said.'), 'A trap: the I is inside speech marks. Third person.'),
            step(W.means('people', ALT[0][2]), 'If Coach told The Tryout.')
          ],
          guided: [function () { return narrator(1); }, function () { return povLine(1); }, function () { return evidence(1); }],
          check: [function () { return narrator(2); }, povTf, function () { return altView(2); }, function () { return povLine(2); }, function () { return altView(3); }],
          coach: '<p>Retell a page of a novel from another character' + AP + 's point of view. Talk about what they would know, notice and feel.</p>',
          mistake: '<p>Being fooled by I or you inside speech marks. Only the narrator' + AP + 's own words count.</p>' }
      ]
    }],
    practice: [
      { id: 'forms', name: 'Forms and genres', code: 'C1.2', gen: form },
      { id: 'patterns', name: 'Text patterns', code: 'C1.3', gen: pattern },
      { id: 'features', name: 'Text features', code: 'C1.3', gen: feature },
      { id: 'graphics', name: 'Graphics', code: 'C1.4', gen: graphic },
      { id: 'design', name: 'Visual design', code: 'C1.4', gen: design },
      { id: 'style', name: 'Style', code: 'C1.5', gen: styleElement },
      { id: 'narrator', name: 'Point of view', code: 'C1.6', gen: narrator }
    ],
    tasks: [
      { id: 'storywork', title: 'A text by a First Nations, Métis or Inuit creator', code: 'C1.7', pic: W.icon('read'), say: 'Read, listen to or watch a work by a First Nations, Métis or Inuit creator. What does it teach, and how?', write: true,
        run: ['With your librarian, choose a novel, graphic novel, film, podcast or song by a First Nations, Métis or Inuit creator. Use the creator' + AP + 's own note or website to learn which nation or community they belong to.',
          'Talk about it: "Whose story is this? What does it teach about history, relationships, land or community? How does the way it is told (its form, its voice) help it teach?"',
          'The child writes a short response, naming the creator and their nation or community.'],
        rubric: ['Recalls little of the work yet.', 'Retells part of it with help.', 'Explains what the work teaches and names the creator and community.', 'Explains how the form and voice of the work carry its teaching, respectfully and with evidence.'],
        coach: '<p>Indigenous Storywork treats stories as teachings shared with care. Let the creator' + AP + 's words lead, and avoid treating First Nations, Métis and Inuit cultures as one culture.</p>' }
    ]
  });

  Q.shapes('how-texts', {
    forms: [[1, 'which-form', formWhich], [1, 'clue', formClue], [2, 'match', formMatch], [2, 'tf', formTf]],
    patterns: [[1, 'signal', signal], [1, 'whole-text', patternText], [2, 'tf', patternTf]],
    features: [[1, 'sample', featureSample], [2, 'match', featureMatch], [1, 'tf', featureTf]],
    graphics: [[1, 'why', graphicWhy], [2, 'match', graphicMatch], [1, 'tf', graphicTf]],
    design: [[1, 'which', designWhich], [2, 'match', designMatch], [1, 'tf', designTf]],
    style: [[1, 'effect', styleEffect], [1, 'fit', styleFit], [2, 'tf', styleTf]],
    narrator: [[1, 'sentence', povLine], [1, 'evidence', evidence], [2, 'other-view', altView], [2, 'tf', povTf]]
  });
})();
