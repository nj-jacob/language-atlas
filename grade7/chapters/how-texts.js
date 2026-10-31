/* Grade 7: how texts work.
   Ontario 2023 Language, Grade 7, C1 Knowledge about Texts:
   C1.2 text forms and genres, including cultural text forms                 C1.3 text patterns (such as cause and effect) and text features (such as a bibliography and accessible fonts)
   C1.4 how images, graphics and visual design create meaning                C1.5 elements of style: voice, word choice, word patterns, sentence structure
   C1.6 the narrator's point of view (first, second or third person), with evidence, and how another point of view would change the story
   With a grown-up: C1.7 texts by diverse First Nations, Métis and Inuit creators, through Indigenous Storywork.
   Passages are in ../texts.js; snippets here are written for this site. Answer checks: tests/verify/grade7-how-texts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  /* ---------- forms and genres ---------- */
  var FORMS = [['fable', 'a short story with a lesson, often with simple, symbolic characters'], ['memoir', 'a true story from the writer’s own life'], ['opinion piece', 'argues for a position with reasons'],
    ['news report', 'tells who, what, when, where and why about a recent event'], ['oral story', 'passed down by telling and listening, often across generations'],
    ['graphic novel', 'tells a story in panels of pictures and words'], ['poem', 'uses lines, sound and images to say a lot in few words']];
  var KINDS = ['information text', 'story', 'opinion piece', 'fable', 'poem'];
  function form(lv) {
    var t = R.pick(T.list('kind'));
    return Q.tiles('What form of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at its shape and purpose: headings and facts, a story, an argument, a lesson, or lines of sound?', explain: 'It is <b>' + (t.kind === 'information text' || t.kind === 'opinion piece' ? 'an ' : 'a ') + t.kind + '</b>.', meta: { k: 'g7-form', t: t.title } });
  }
  function formMatch() {
    var fs = R.some(FORMS, 3);
    return { q: 'Match each form to what it does.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think of an example of each.', explain: 'Each form has features that help it do its job.', meta: { k: 'g7-form-match' } };
  }
  function formWhich(lv) {
    var f = R.pick(FORMS);
    return Q.one('Which form of text ' + f[1] + '?', f[0], R.some(FORMS.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Picture one you have read, heard or seen.', explain: 'A <b>' + f[0] + '</b> ' + f[1] + '.', meta: { k: 'g7-form-which', f: f[0] } });
  }
  /* text patterns: [snippet, pattern] */
  var PATTERNS = ['cause and effect', 'compare and contrast', 'time order', 'problem and solution'];
  var PAT = [['Because the factory closed, many families moved away. As a result, the school lost students.', 0], ['Warmer winters mean the ice melts sooner. As a result, the roads close early.', 0],
    ['Solar panels work best on sunny days. Wind turbines, however, work day and night.', 1], ['Both frogs and toads lay eggs in water, but toads have drier skin.', 1],
    ['First, the sap is collected. Next, it is boiled for hours. Finally, the syrup is bottled.', 2], ['In the morning, the team packed the canoes. By noon, they reached the portage.', 2],
    ['The problem: our school wastes paper. One solution is to share notes online.', 3], ['The trail kept flooding. The solution was a raised boardwalk.', 3]];
  function pattern(lv) {
    var p = R.pick(PAT);
    return Q.tiles('Which text pattern does this use?', PATTERNS[p[1]], R.some(PATTERNS.filter(function (x, i) { return i !== p[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(p[0]),
      prompt: 'Look for signal words like as a result, however, first, or solution.', hint: 'Signal words show the pattern.', explain: '<b>' + PATTERNS[p[1]] + '</b>', meta: { k: 'g7-pattern', s: p[0] } });
  }
  /* text features: [feature, what it does] */
  var FEAT = [['bibliography', 'lists the sources the writer used'], ['glossary', 'explains key words'], ['index', 'helps you find a topic by page'], ['sidebar', 'adds extra information beside the main text'],
    ['caption', 'explains a picture'], ['accessible font', 'is clear and easy for everyone to read']];
  function feature(lv) {
    var f = R.pick(FEAT);
    return Q.one('Which text feature <b>' + f[1] + '</b>?', f[0], R.some(FEAT.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Picture a non-fiction book. Where would you find it?', explain: 'A <b>' + f[0] + '</b> ' + f[1] + '.', meta: { k: 'g7-feature', f: f[0] } });
  }
  function featureMatch() {
    var fs = R.some(FEAT, 3);
    return { q: 'Match each feature to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Each feature helps the reader in one way.', explain: 'Features help readers find and understand information.', meta: { k: 'g7-feature-match' } };
  }

  /* ---------- visuals: [what you want to show, the best graphic] ---------- */
  var GRAPHICS = [['how a town' + '’' + 's population changed over 50 years', 'a line graph'], ['which of four lakes is the deepest', 'a bar graph'], ['the order of events in a long history', 'a timeline'],
    ['where the winter roads are', 'a map'], ['the parts of a canoe', 'a labelled diagram'], ['what a street looked like in 1920', 'a photograph']];
  function graphic(lv) {
    var g = R.pick(GRAPHICS);
    return Q.tiles('Which graphic best shows <b>' + g[0] + '</b>?', g[1], R.some(GRAPHICS.filter(function (x) { return x !== g; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Change over time? Comparing amounts? Order? Place? Parts? A real scene?', explain: '<b>' + g[1] + '</b>', meta: { k: 'g7-graphic', g: g[0] } });
  }
  function graphicTf() {
    var g = R.pick(GRAPHICS), right = R.int(0, 1) === 1, said = right ? g[1] : R.pick(GRAPHICS.filter(function (x) { return x !== g; }))[1];
    return { q: Q.name() + ' says ' + said + ' is the best way to show <b>' + g[0] + '</b>.', type: 'tf', answer: right,
      why: { options: ['That graphic fits this kind of information.', 'Another graphic would show it more clearly.'], answer: right ? 0 : 1 },
      hint: 'Change over time? Comparing amounts? Order? Place? Parts? A real scene?', explain: '<b>' + g[1] + '</b>', meta: { k: 'g7-graphic-tf', g: g[0], said: said } };
  }
  /* visual design: [design choice, its effect] */
  var DESIGN = [['a heading in large, bold type', 'shows what matters most'], ['a red box with a warning sign', 'grabs attention and signals danger'], ['lots of empty space around one photo', 'makes the photo stand out'],
    ['the same colour for every heading', 'shows which parts belong together'], ['a close-up photo of a worried face', 'makes the reader feel the emotion']];
  function design(lv) {
    var d = R.pick(DESIGN);
    return Q.one('Why would a designer use <b>' + d[0] + '</b>?', d[1], R.some(DESIGN.filter(function (x) { return x !== d; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'What does your eye do when it sees it?', explain: d[1] + '.', meta: { k: 'g7-design', d: d[0] } });
  }
  function designMatch() {
    var ds = R.some(DESIGN, 3);
    return { q: 'Match each design choice to its effect.', type: 'match', pairs: ds.map(function (d) { return [d[0], d[1]]; }), hint: 'Picture each one on a page.', explain: 'Design choices guide the reader' + '’' + 's eye and feelings.', meta: { k: 'g7-design-match' } };
  }

  /* ---------- style: [snippet, element of style, effect] ---------- */
  var STYLE = [['I ran. I fell. I got up.', 'short sentences', 'builds tension and speed'], ['Drip. Drip. The icicles tick like clocks.', 'sound words', 'lets you hear the scene'],
    ['We will not give up. We will not back down. We will not be silent.', 'repetition', 'makes the message stick and sound powerful'],
    ['The wind howled and clawed at the cabin.', 'vivid word choice', 'makes the wind seem alive and dangerous'],
    ['Honestly? I was terrified, and I am not ashamed to say it.', 'a strong personal voice', 'makes the narrator feel real and honest']];
  function styleElement(lv) {
    var s = R.pick(STYLE);
    return Q.tiles('Which element of style stands out here?', s[1], R.some(STYLE.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.sent(s[0]),
      hint: 'Look at the length of the sentences, the sounds, repeats, strong words, or the speaker' + '’' + 's personality.', explain: '<b>' + s[1] + '</b>: it ' + s[2] + '.', meta: { k: 'g7-style-element', s: s[0] } });
  }
  function styleEffect(lv) {
    var s = R.pick(STYLE);
    return Q.one('What does the writer' + '’' + 's style do here?', s[2], R.some(STYLE.filter(function (x) { return x !== s; }), lv > 1 ? 2 : 1).map(function (x) { return x[2]; }), { fig: W.sent(s[0]),
      hint: 'How does it make you feel as a reader?', explain: '<b>' + s[1] + '</b> ' + s[2] + '.', meta: { k: 'g7-style-effect', s: s[0] } });
  }

  /* ---------- narrator ---------- */
  var POV = { first: 'first person: the narrator says I', second: 'second person: the narrator says you', third: 'third person: the narrator says he, she or they' };
  var POVWORD = { first: 'I', second: 'You', third: 'He' };
  function narrator(lv) {
    var t = R.pick(T.list('pov').filter(function (x) { return x.kind !== 'information text' && x.kind !== 'opinion piece'; }));
    return Q.tiles('What point of view is this told from?', POV[t.pov], Object.keys(POV).filter(function (p) { return p !== t.pov; }).map(function (p) { return POV[p]; }).slice(0, lv > 1 ? 2 : 1), { fig: T.show(t),
      prompt: 'Look outside the speech marks for I, you, or he, she and they.', hint: 'I: first. You: second. He, she, they: third.', explain: POV[t.pov] + '.', meta: { k: 'g7-narrator', t: t.title } });
  }
  function evidence() {
    var t = R.pick(T.list('pov').filter(function (x) { return x.kind === 'story'; }));
    return Q.tiles('This story is told in the <b>' + t.pov + ' person</b>. Which word is the evidence?', POVWORD[t.pov], Object.keys(POVWORD).filter(function (p) { return p !== t.pov; }).map(function (p) { return POVWORD[p]; }), { fig: T.show(t),
      hint: 'Find the word the narrator uses for the main character.', explain: '<b>' + POVWORD[t.pov] + '</b> shows ' + t.pov + ' person.', meta: { k: 'g7-evidence', t: t.title } });
  }
  function altView() {
    var t = T.compass;
    return Q.one('If the grandfather told this story in the first person, what would change?', t.alt[0], t.alt.slice(1), { fig: T.show(t), hint: 'A different narrator knows and feels different things.',
      explain: t.alt[0], meta: { k: 'g7-alt-view' } });
  }

  var ice = T.iceRoad;
  Atlas.register('how-texts', {
    lessons: [{
      id: 'forms', title: 'Forms, patterns and features', sub: 'How a text is built helps you read it.',
      concepts: [
        { slug: 'forms', title: 'Each form has its own features', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(ice, 2), 'Headings and facts: an <b>information text</b>.'),
            step(T.show(T.river, 1), 'Simple characters, a lesson: a <b>fable</b>.'),
            step(W.means('talk', 'told by an Elder, passed down'), 'An <b>oral story</b>: a cultural form.')
          ],
          guided: [function () { return form(1); }, function () { return formWhich(1); }],
          check: [function () { return form(2); }, formMatch],
          coach: '<p>Gather texts from around the house (a news article, a recipe, a comic, a song) and sort them by form. Ask what each form is good at.</p>',
          mistake: '<p>Naming the topic instead of the form ("it is about ice"). Ask: what kind of text is it?</p>' },
        { slug: 'patterns', title: 'Signal words show the pattern', exp: ['C1.3'], skill: 'forms',
          model: [
            step(W.sent('<mark class="hl">As a result</mark>, the roads close early.'), 'Cause and effect.'),
            step(W.sent('Wind turbines, <mark class="hl">however</mark>, work day and night.'), 'Compare and contrast.'),
            step(W.sent('<mark class="hl">First</mark>... <mark class="hl">Next</mark>... <mark class="hl">Finally</mark>...'), 'Time order.'),
            step(W.sent('The <mark class="hl">solution</mark> was a raised boardwalk.'), 'Problem and solution.')
          ],
          guided: [function () { return pattern(1); }, function () { return pattern(1); }],
          check: [function () { return pattern(2); }, function () { return pattern(2); }],
          coach: '<p>When a paragraph is hard, name its pattern first. A cause-and-effect paragraph can be drawn as arrows; a comparison as two columns.</p>',
          mistake: '<p>Seeing "and" or "but" and calling every text a comparison. Look for the main signal words.</p>' },
        { slug: 'features', title: 'Text features help you find and understand', exp: ['C1.3'], skill: 'forms',
          model: [
            step(W.tile('bibliography'), 'The sources the writer used.'),
            step(W.tile('glossary'), 'Key words explained.'),
            step(W.tile('accessible font'), 'Clear for every reader.')
          ],
          guided: [function () { return feature(1); }, featureMatch],
          check: [function () { return feature(2); }, featureMatch],
          coach: '<p>Before reading a non-fiction book, tour its features together: contents, headings, glossary, index, bibliography.</p>',
          mistake: '<p>Skipping captions and sidebars. They often hold the most useful facts.</p>' }
      ]
    }, {
      id: 'visuals-style', title: 'Visuals and style', sub: 'Pictures, design and the writer' + '’' + 's choices.',
      concepts: [
        { slug: 'graphics', title: 'Choose the graphic that fits the information', exp: ['C1.4'], skill: 'visuals',
          model: [
            step(W.means('star', 'change over time'), 'A line graph.'),
            step(W.means('star', 'comparing amounts'), 'A bar graph.'),
            step(W.means('star', 'where things are'), 'A map.')
          ],
          guided: [function () { return graphic(1); }, function () { return graphic(1); }],
          check: [function () { return graphic(2); }, function () { return graphic(2); }],
          coach: '<p>Find a graph in a newspaper or website. Ask: "What does this show faster than words could?"</p>',
          mistake: '<p>Ignoring the graphic and reading only the words. The graphic often carries the main point.</p>' },
        { slug: 'design', title: 'Design guides the eye', exp: ['C1.4'], skill: 'visuals',
          model: [
            step(W.means('star', 'large, bold heading'), 'Look here first.'),
            step(W.means('not', 'red box, warning sign'), 'Danger.'),
            step(W.means('screen', 'empty space around one photo'), 'The photo stands out.')
          ],
          guided: [function () { return design(1); }, designMatch],
          check: [function () { return design(2); }, designMatch],
          coach: '<p>Compare two posters or web pages. Where did your eye go first? Why?</p>',
          mistake: '<p>Thinking design is only decoration. Size, colour and space all carry meaning.</p>' },
        { slug: 'style', title: 'Style shapes how a text feels', exp: ['C1.5'], skill: 'style',
          model: [
            step(W.sent('I ran. I fell. I got up.'), 'Short sentences: tension.'),
            step(W.sent('We will not give up. We will not back down.'), 'Repetition: power.'),
            step(W.sent('The wind howled and clawed at the cabin.'), 'Vivid words: the wind seems alive.')
          ],
          guided: [function () { return styleElement(1); }, function () { return styleEffect(1); }],
          check: [function () { return styleElement(2); }, function () { return styleEffect(2); }],
          coach: '<p>Read a favourite passage aloud and ask: "What did the writer do here that makes it work?"</p>',
          mistake: '<p>Naming a device without its effect. Always add: "...and that makes the reader feel..."</p>' },
        { slug: 'narrator', title: 'Who is telling the story?', exp: ['C1.6'], skill: 'style',
          model: [
            step(W.sent('<b>I</b> tied my left shoe twice.'), 'First person.'),
            step(W.sent('<b>You</b> crouch low as the forward races up the ice.'), 'Second person: you are in the story.'),
            step(W.sent('<b>He</b> held the compass in his pocket.'), 'Third person.')
          ],
          guided: [function () { return narrator(1); }, evidence],
          check: [function () { return narrator(2); }, altView],
          coach: '<p>Retell a page of a novel from another character' + '’' + 's point of view. Talk about what they would know, notice and feel.</p>',
          mistake: '<p>Being fooled by I or you inside speech marks. Only the narrator' + '’' + 's own words count.</p>' }
      ]
    }],
    practice: [
      { id: 'forms', name: 'Forms, patterns and features', code: 'C1.2, C1.3', gen: form },
      { id: 'visuals', name: 'Graphics and design', code: 'C1.4', gen: graphic },
      { id: 'style', name: 'Style and point of view', code: 'C1.5, C1.6', gen: styleElement }
    ],
    tasks: [
      { id: 'storywork', title: 'A text by a First Nations, Métis or Inuit creator', code: 'C1.7', pic: W.icon('read'), say: 'Read, listen to or watch a work by a First Nations, Métis or Inuit creator. What does it teach, and how?', write: true,
        run: ['With your librarian, choose a novel, graphic novel, film, podcast or song by a First Nations, Métis or Inuit creator. Use the creator' + '’' + 's own note or website to learn which nation or community they belong to.',
          'Talk about it: "Whose story is this? What does it teach about history, relationships, land or community? How does the way it is told (its form, its voice) help it teach?"',
          'The child writes a short response, naming the creator and their nation or community.'],
        rubric: ['Recalls little of the work yet.', 'Retells part of it with help.', 'Explains what the work teaches and names the creator and community.', 'Explains how the form and voice of the work carry its teaching, respectfully and with evidence.'],
        coach: '<p>Indigenous Storywork treats stories as teachings shared with care. Let the creator' + '’' + 's words lead, and avoid treating First Nations, Métis and Inuit cultures as one culture.</p>' }
    ]
  });

  Q.shapes('how-texts', {
    forms: [[1, 'which-form', formWhich], [1, 'pattern', pattern], [1, 'feature', feature], [2, 'match', featureMatch], [2, 'form-match', formMatch]],
    visuals: [[1, 'design', design], [2, 'design-match', designMatch], [2, 'true-false', graphicTf]],
    style: [[1, 'effect', styleEffect], [1, 'narrator', narrator], [1, 'evidence', evidence], [2, 'other-view', altView]]
  });
})();
