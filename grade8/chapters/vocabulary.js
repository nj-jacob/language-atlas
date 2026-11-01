/* Grade 8: words in context. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8:
   B2.2 "demonstrate an understanding of a wide variety of words, acquire and use explicitly taught vocabulary flexibly in various
   contexts, including other subject areas, and use consolidated morphological knowledge to analyze and understand new words in context"
   Context clues (definition, contrast, example), word parts in context, academic and subject words, words with more than one meaning,
   and connotation. All sentences are written for this site. Answer checks: tests/verify/grade8-vocabulary.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [sentence, the word, what it means, two wrong meanings, the clue words]: twelve of each kind of clue */
  var CLUE = [
    ['The old bridge was <b>precarious</b>, so unsafe that no one dared to cross it.', 'precarious', 'likely to fall or fail', ['very beautiful', 'newly built'], 'so unsafe that no one dared to cross it'],
    ['Our class worked to <b>mitigate</b>, or lessen, the damage from the flood.', 'mitigate', 'make less severe', ['make worse', 'measure carefully'], 'or lessen'],
    ['After hours of rain, the field was <b>saturated</b>: it could not hold another drop.', 'saturated', 'completely soaked', ['dry and dusty', 'freshly mowed'], 'it could not hold another drop'],
    ['Owls are <b>nocturnal</b>, which means they sleep by day and hunt at night.', 'nocturnal', 'active at night', ['active in the daytime', 'living near water'], 'which means they sleep by day and hunt at night'],
    ['The hikers were <b>famished</b>; in other words, they were extremely hungry after the long climb.', 'famished', 'extremely hungry', ['very tired', 'lost'], 'in other words, they were extremely hungry'],
    ['The town built a <b>levee</b>, that is, a high wall of earth to keep the river back.', 'levee', 'a wall of earth that holds back a river', ['a small boat', 'a type of fish'], 'that is, a high wall of earth to keep the river back'],
    ['Maple syrup is <b>viscous</b>, which means it is thick and pours slowly.', 'viscous', 'thick and slow to pour', ['thin and watery', 'very sweet'], 'which means it is thick and pours slowly'],
    ['The dog was <b>lethargic</b>: it lay on the porch all day and barely moved.', 'lethargic', 'tired and slow; without energy', ['full of energy', 'very hungry'], 'it lay on the porch all day and barely moved'],
    ['Please be <b>concise</b>, or brief, when you give your report.', 'concise', 'short and clear', ['loud and slow', 'long and detailed'], 'or brief'],
    ['The two teams reached a <b>compromise</b>; that is, each side gave up a little.', 'compromise', 'an agreement where each side gives up something', ['a loud argument', 'a final score'], 'that is, each side gave up a little'],
    ['The cabin was <b>remote</b>, so far from town that the mail came once a week.', 'remote', 'far away from other places', ['brand new', 'very crowded'], 'so far from town that the mail came once a week'],
    ['The test results were <b>inconclusive</b>, which means they did not settle the question.', 'inconclusive', 'not leading to a firm answer', ['completely clear', 'very late'], 'which means they did not settle the question'],
    ['Unlike her <b>gregarious</b> brother, Hana is quiet and likes to be alone.', 'gregarious', 'enjoying the company of others', ['shy and quiet', 'tall and strong'], 'Unlike'],
    ['The first speech was <b>verbose</b>; however, the second was short and to the point.', 'verbose', 'using more words than needed', ['short and clear', 'very loud'], 'however'],
    ['Leo was <b>reluctant</b> to jump into the cold lake, but his sister dove right in.', 'reluctant', 'not willing; hesitant', ['excited', 'proud'], 'but'],
    ['Although the map looked <b>accurate</b>, several roads were in the wrong place.', 'accurate', 'correct in every detail', ['colourful', 'very old'], 'Although'],
    ['Although the soup looked <b>bland</b>, it was full of spice.', 'bland', 'without much flavour', ['very hot', 'too salty'], 'Although'],
    ['Mira was <b>frugal</b> with her allowance, but her brother spent every dollar the day he got it.', 'frugal', 'careful not to waste money', ['generous', 'forgetful'], 'but'],
    ['Unlike the <b>turbulent</b> river, the pond was smooth and still.', 'turbulent', 'rough and churning', ['calm and clear', 'shallow'], 'Unlike'],
    ['The old phone was <b>obsolete</b>; however, the new one had every feature we needed.', 'obsolete', 'out of date; no longer used', ['brand new', 'very expensive'], 'however'],
    ['Theo felt <b>apprehensive</b> before the race, but once it started he felt calm.', 'apprehensive', 'worried about what will happen', ['bored', 'confident'], 'but'],
    ['Unlike her <b>meticulous</b> notes, mine were messy and full of gaps.', 'meticulous', 'extremely careful and thorough', ['quick and messy', 'very short'], 'Unlike'],
    ['Although the path looked <b>treacherous</b>, it turned out to be safe and easy.', 'treacherous', 'full of hidden danger', ['wide and flat', 'well marked'], 'Although'],
    ['The first loaf of bread was <b>dense</b>; however, the second was light and airy.', 'dense', 'heavy and tightly packed', ['soft and fluffy', 'burnt'], 'however'],
    ['The museum displays <b>artifacts</b>, such as tools, pottery and beaded clothing.', 'artifacts', 'objects made by people long ago', ['paintings of landscapes', 'tickets for an event'], 'such as'],
    ['Many <b>amphibians</b>, including frogs, toads and salamanders, live near the pond.', 'amphibians', 'animals that live both in water and on land', ['birds that migrate', 'fish with no scales'], 'including'],
    ['Pack <b>nonperishable</b> food for the trip, for example canned beans and dried fruit.', 'nonperishable', 'food that will not spoil quickly', ['fresh food from a market', 'food that must be frozen'], 'for example'],
    ['The garden is full of <b>perennials</b>, such as tulips, peonies and hostas.', 'perennials', 'plants that grow back every year', ['weeds that spread fast', 'plants that grow in water'], 'such as'],
    ['Forms of <b>precipitation</b>, such as rain, sleet and snow, fall from clouds.', 'precipitation', 'water that falls from the sky', ['wind from the north', 'heat from the sun'], 'such as'],
    ['Many <b>rodents</b>, including beavers, squirrels and mice, have front teeth that never stop growing.', 'rodents', 'small gnawing mammals', ['birds of prey', 'fish that live in rivers'], 'including'],
    ['Bring your <b>toiletries</b>, for example a toothbrush, soap and shampoo.', 'toiletries', 'things for washing and grooming', ['warm clothes', 'snacks for the trip'], 'for example'],
    ['The band played <b>percussion</b> instruments, such as drums, cymbals and a tambourine.', 'percussion', 'instruments you strike or shake', ['instruments you blow into', 'instruments with strings'], 'such as'],
    ['The diner sets out <b>condiments</b>, including mustard, relish and ketchup.', 'condiments', 'sauces you add to food', ['plates and cups', 'desserts'], 'including'],
    ['<b>Crustaceans</b>, such as lobsters, crabs and shrimp, are caught off the coast of Nova Scotia.', 'crustaceans', 'sea animals with hard shells and jointed legs', ['fish with fins', 'seabirds'], 'such as'],
    ['Some <b>deciduous</b> trees, for example maples and birches, turn bare each November.', 'deciduous', 'losing leaves every year', ['green all year', 'very tall'], 'for example'],
    ['The camp kitchen had all the <b>utensils</b> we needed, including forks, spoons and a ladle.', 'utensils', 'tools for cooking or eating', ['tools for building', 'tents and tarps'], 'including']];
  var KIND = { definition: 'The sentence explains the word.', contrast: 'The sentence gives the opposite.', example: 'The sentence gives examples.' };
  var SIGNALS = { definition: ['or', 'which means', 'that is', 'in other words', 'a colon'], contrast: ['unlike', 'but', 'however', 'although'], example: ['such as', 'including', 'for example'] };
  function kindOf(c) { return /\b(Unlike|however|but|Although)\b/.test(c[0]) ? 'contrast' : /such as|including|for example/.test(c[0]) ? 'example' : 'definition'; }
  function byKind(k) { return CLUE.filter(function (c) { return kindOf(c) === k; }); }
  function byWord(w) { return CLUE.filter(function (c) { return c[1] === w; })[0]; }
  function mark(s, clue) { return W.sent(s.replace(clue, '<mark class="hl">' + clue + '</mark>')); }

  /* ---------- context clues: one maker per kind ---------- */
  /* level 1 marks the clue for the child; level 2 does not; level 3 asks which word fits the gap */
  function clueMeaning(kind) {
    return function (lv) {
      var list = byKind(kind), c = R.pick(list);
      if (lv > 2) {
        var two = R.some(list.filter(function (x) { return x !== c; }), 2), label = function (x) { return x[1] + ': ' + x[2]; };
        return Q.one('Which word fits the gap?', label(c), two.map(label), { fig: W.sent(c[0].replace('<b>' + c[1] + '</b>', W.gap())), prompt: 'Use the clue in the sentence.',
          hint: KIND[kind], explain: mark(c[0], c[4]), meta: { k: 'g8-clue-gap' } });
      }
      return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3], { fig: lv > 1 ? W.sent(c[0]) : mark(c[0], c[4]), prompt: 'Find the clue in the sentence.',
        hint: KIND[kind], explain: mark(c[0], c[4]), meta: { k: 'g8-clue-meaning', word: c[1] } });
    };
  }
  function clueWords(kind) {
    return function () {
      var c = R.pick(byKind(kind)), ws = c[0].replace(/<[^>]+>/g, '').replace(/[.,;:]/g, '').split(' ');
      var chunks = [ws.slice(0, 3).join(' '), ws.slice(-3).join(' ')].filter(function (ch) { return ch.indexOf(c[4]) < 0 && c[4].indexOf(ch) < 0 && ch.indexOf(c[1]) < 0; });
      return Q.one('Which words are the clue to <b>' + c[1] + '</b>?', c[4], chunks.slice(0, 1).concat([c[1]]), { fig: W.sent(c[0]), prompt: 'Look for ' + SIGNALS[kind].slice(0, 3).join(', ') + '.',
        hint: 'The clue is not the word itself. It is the words that help you understand it.', explain: mark(c[0], c[4]), meta: { k: 'g8-clue-words', word: c[1] } });
    };
  }
  function clueTf(kind) {
    return function () {
      var c = R.pick(byKind(kind)), right = R.int(0, 1) === 1, said = right ? c[2] : R.pick(c[3]);
      return { q: Q.name() + ' says <b>' + c[1] + '</b> means <b>' + said + '</b>.', fig: W.sent(c[0]), type: 'tf', answer: right,
        why: { options: ['The clue fits this meaning.', 'The clue points to another meaning.'], answer: right ? 0 : 1 }, hint: KIND[kind],
        explain: mark(c[0], c[4]) + '<b>' + c[1] + '</b>: ' + c[2] + '.', meta: { k: 'g8-clue-tf', word: c[1], said: said } };
    };
  }
  function clueMatch(kind) {
    return function () {
      var cs = R.some(byKind(kind), 3);
      return { q: 'Match each word to its meaning.', type: 'match', pairs: cs.map(function (c) { return [c[1], c[2]]; }), hint: 'Think back to the clue in each sentence.',
        explain: cs.map(function (c) { return mark(c[0], c[4]); }).join(''), meta: { k: 'g8-clue-match' } };
    };
  }
  function clueKind() {
    var c = R.pick(CLUE), k = kindOf(c);
    return Q.tiles('What kind of clue helps you with <b>' + c[1] + '</b>?', k, Object.keys(KIND).filter(function (x) { return x !== k; }), {
      fig: W.sent(c[0]), hint: 'Look for <b>or</b> and <b>which means</b>, <b>unlike</b> and <b>but</b>, or <b>such as</b>.', explain: KIND[k], meta: { k: 'g8-clue-kind', word: c[1] } });
  }

  /* ---------- word parts in context ---------- */
  /* [sentence, the word, its parts, what it means, two wrong meanings] */
  var PARTS = [
    ['After the storm, the trail was <b>impassable</b>, so we turned back.', 'impassable', [['im', 'prefix'], ['pass', 'base'], ['able', 'suffix']], 'not able to be passed through', ['easy to walk on', 'very short']],
    ['The coach gave <b>constructive</b> advice that helped us improve.', 'constructive', [['con', 'prefix'], ['struct', 'base'], ['ive', 'suffix']], 'helpful; meant to build up', ['rude and unkind', 'very long']],
    ['The fire alarm caused a short <b>disruption</b> to the test.', 'disruption', [['dis', 'prefix'], ['rupt', 'base'], ['ion', 'suffix']], 'a break in what was happening', ['a reward', 'a quiet moment']],
    ['Her writing was so tiny that it was barely <b>legible</b>.', 'legible', [['leg', 'base'], ['ible', 'suffix']], 'able to be read', ['able to be heard', 'easy to carry']],
    ['The two towns are <b>interdependent</b>: each one needs the other.', 'interdependent', [['inter', 'prefix'], ['depend', 'base'], ['ent', 'suffix']], 'depending on each other', ['totally separate', 'always competing']],
    ['The <b>invisible</b> ink only appeared under a special light.', 'invisible', [['in', 'prefix'], ['vis', 'base'], ['ible', 'suffix']], 'not able to be seen', ['very bright', 'easy to erase']],
    ['The speaker' + AP + 's voice was <b>inaudible</b> over the wind, so no one laughed at the joke.', 'inaudible', [['in', 'prefix'], ['aud', 'base'], ['ible', 'suffix']], 'not able to be heard', ['very loud', 'easy to read']],
    ['Buses and ferries are the main <b>transportation</b> on the island.', 'transportation', [['trans', 'prefix'], ['port', 'base'], ['ation', 'suffix']], 'ways of carrying people or goods from place to place', ['places to sleep', 'kinds of weather']],
    ['The weather in April is <b>unpredictable</b>: it may snow or be sunny.', 'unpredictable', [['un', 'prefix'], ['pre', 'prefix'], ['dict', 'base'], ['able', 'suffix']], 'not able to be known ahead of time', ['always the same', 'very cold']],
    ['Grandma' + AP + 's quilt is <b>irreplaceable</b>; nothing else could take its place.', 'irreplaceable', [['ir', 'prefix'], ['re', 'prefix'], ['place', 'base'], ['able', 'suffix']], 'not able to be replaced', ['easy to find', 'torn and old']],
    ['Without a clear map, it is easy to <b>misinterpret</b> the directions.', 'misinterpret', [['mis', 'prefix'], ['interpret', 'base']], 'understand wrongly', ['follow exactly', 'write down']],
    ['The pen has a <b>retractable</b> tip that slides back inside.', 'retractable', [['re', 'prefix'], ['tract', 'base'], ['able', 'suffix']], 'able to be pulled back in', ['able to be erased', 'very sharp']],
    ['Coal is a <b>nonrenewable</b> resource: once it is burned, it is gone.', 'nonrenewable', [['non', 'prefix'], ['re', 'prefix'], ['new', 'base'], ['able', 'suffix']], 'not able to be made new again', ['found everywhere', 'safe to use']],
    ['A <b>malfunction</b> in the scoreboard stopped the game.', 'malfunction', [['mal', 'prefix'], ['function', 'base']], 'a failure to work properly', ['a new rule', 'a loud cheer']],
    ['Pack your lunch in <b>biodegradable</b> bags that break down in soil.', 'biodegradable', [['bio', 'base'], ['degrade', 'base'], ['able', 'suffix']], 'able to be broken down by living things', ['able to hold water', 'made of metal']]];
  var PMEAN = { im: 'not', in: 'not', un: 'not', ir: 'not', non: 'not', con: 'together', dis: 'apart', inter: 'between', trans: 'across', pre: 'before', re: 'back or again', mis: 'wrongly',
    mal: 'badly', pass: 'pass', struct: 'build', rupt: 'break', leg: 'read', depend: 'depend', vis: 'see', aud: 'hear', port: 'carry', dict: 'say', place: 'put in position',
    interpret: 'explain', tract: 'pull', new: 'new', function: 'work', bio: 'life', degrade: 'break down', able: 'able to be', ible: 'able to be', ive: 'tends to', ion: 'act of',
    ation: 'act of', ent: 'being' };
  function partHints(p) { return p[2].map(function (x) { return '<b>' + x[0] + '</b> = ' + PMEAN[x[0]]; }).join('. ') + '.'; }
  function partsMeaning(lv) {
    var p = R.pick(PARTS);
    return Q.one('What does <b>' + p[1] + '</b> mean?', p[3], p[4].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(p[0]) + (lv > 1 ? '' : W.sum(p[2])),
      prompt: 'Use the word parts and the sentence together.', hint: partHints(p), explain: W.sum(p[2]), meta: { k: 'g8-parts-meaning', word: p[1] } });
  }
  function partsPart() {
    var p = R.pick(PARTS.filter(function (x) { return x[2].length > 2; })), part = R.pick(p[2].filter(function (x) { return x[1] !== 'suffix'; }))[0];
    return Q.tiles('In <b>' + p[1] + '</b>, which part means <b>' + PMEAN[part] + '</b>?', part, p[2].map(function (x) { return x[0]; }).filter(function (x) { return x !== part; }), {
      fig: W.sent(p[0]), prompt: 'Split the word into parts.', hint: partHints(p), explain: W.sum(p[2]), meta: { k: 'g8-parts-part', mean: PMEAN[part] } });
  }
  function partsTf() {
    var p = R.pick(PARTS), right = R.int(0, 1) === 1, said = right ? p[3] : R.pick(p[4]);
    return { q: Q.name() + ' says <b>' + p[1] + '</b> means <b>' + said + '</b>.', fig: W.sent(p[0]), type: 'tf', answer: right,
      why: { options: ['The parts and the sentence both fit this meaning.', 'The parts or the sentence point to another meaning.'], answer: right ? 0 : 1 }, hint: partHints(p),
      explain: W.sum(p[2]), meta: { k: 'g8-parts-tf', word: p[1], said: said } };
  }
  function partsMatch() {
    var ps = R.some(PARTS, 3);
    return { q: 'Match each word to its meaning.', type: 'match', pairs: ps.map(function (p) { return [p[1], p[3]]; }), hint: 'Split each word into its parts.',
      explain: ps.map(function (p) { return W.sum(p[2]); }).join(''), meta: { k: 'g8-parts-match' } };
  }

  /* ---------- thinking words ---------- */
  var TIER = { analyze: 'break into parts to study closely', evaluate: 'judge how good or useful something is', infer: 'work out from clues', synthesize: 'combine ideas from several places',
    justify: 'give reasons for', summarize: 'give the main points briefly', compare: 'show how things are alike and different', classify: 'sort into groups',
    predict: 'say what will happen next', explain: 'make clear how or why' };
  /* [sentence, the word it needs, three words that do not fit] */
  var TASK = [
    ['To ___ the poem, look at each stanza and its images.', 'analyze', ['predict', 'justify', 'synthesize']],
    ['To ___ the graph, study each bar and what it shows.', 'analyze', ['predict', 'justify', 'synthesize']],
    ['Take the ad apart: ___ its words, colours and pictures one by one.', 'analyze', ['predict', 'synthesize', 'justify']],
    ['Before you choose, ___ both sources to see which is more reliable.', 'evaluate', ['summarize', 'predict', 'classify']],
    ['Use the rubric to ___ how well your draft meets each goal.', 'evaluate', ['predict', 'synthesize', 'classify']],
    ['Read the review, then ___ whether the movie is worth seeing.', 'evaluate', ['summarize', 'classify', 'synthesize']],
    ['Use the clues to ___ how the character feels.', 'infer', ['summarize', 'classify', 'synthesize']],
    ['The text never says why she left, so you must ___ the reason.', 'infer', ['summarize', 'classify', 'compare']],
    ['From his muddy boots, we can ___ that he walked through the field.', 'infer', ['classify', 'summarize', 'compare']],
    ['Read both articles, then ___ them into one report.', 'synthesize', ['predict', 'infer', 'justify']],
    ['Bring together ideas from three sources and ___ them into one new answer.', 'synthesize', ['predict', 'infer', 'justify']],
    ['Merge notes from the video and the book, and ___ them into a single plan.', 'synthesize', ['predict', 'infer', 'evaluate']],
    ['Be ready to ___ your answer with two reasons from the text.', 'justify', ['summarize', 'classify', 'predict']],
    ['If you disagree, ___ your opinion with evidence.', 'justify', ['summarize', 'classify', 'predict']],
    ['Choose the best plan and ___ your choice with facts.', 'justify', ['classify', 'predict', 'infer']],
    ['In three sentences, ___ the main points of the chapter.', 'summarize', ['predict', 'classify', 'infer']],
    ['Leave out the details and ___ the article in one short paragraph.', 'summarize', ['predict', 'classify', 'infer']],
    ['For the report, ___ the plot of the novel in five lines.', 'summarize', ['predict', 'classify', 'justify']],
    ['Use a Venn diagram to ___ the two characters: how are they alike and different?', 'compare', ['predict', 'summarize', 'justify']],
    ['Look at both maps and ___ them: what is the same, and what is different?', 'compare', ['predict', 'justify', 'infer']],
    ['Set the two poems side by side and ___ their moods.', 'compare', ['predict', 'justify', 'synthesize']],
    ['Sort the animals and ___ each one as a mammal, bird or fish.', 'classify', ['predict', 'summarize', 'justify']],
    ['Look at each rock and ___ it as igneous, sedimentary or metamorphic.', 'classify', ['predict', 'summarize', 'synthesize']],
    ['Put each word in a group: ___ it as a noun, verb or adjective.', 'classify', ['predict', 'summarize', 'synthesize']],
    ['Before you turn the page, ___ what will happen next.', 'predict', ['summarize', 'classify', 'justify']],
    ['Look at the clouds and ___ tomorrow' + AP + 's weather.', 'predict', ['summarize', 'justify', 'synthesize']],
    ['Read the title and ___ what the article will be about.', 'predict', ['summarize', 'classify', 'justify']],
    ['In your own words, ___ how a bill becomes a law.', 'explain', ['classify', 'justify', 'compare']],
    ['Use a diagram to ___ how the water cycle works.', 'explain', ['classify', 'justify', 'compare']],
    ['Step by step, ___ how you solved the problem.', 'explain', ['classify', 'predict', 'compare']]];
  var THINK = Object.keys(TIER);
  function tierFit(lv) {
    var t = R.pick(TASK);
    return Q.one('Which word fits?', t[1], t[2].slice(0, lv > 1 ? 3 : 2), { fig: W.sent(t[0].replace('___', W.gap())), prompt: 'What is the reader being asked to do?',
      hint: '<b>' + t[1] + '</b> means ' + TIER[t[1]] + '.', explain: W.sent(t[0].replace('___', '<b>' + t[1] + '</b>')), meta: { k: 'g8-tier-fit', frame: t[0] } });
  }
  function tierMatch() {
    var ts = R.some(THINK, 3);
    return { q: 'Match each thinking word to what it asks you to do.', type: 'match', pairs: ts.map(function (t) { return [t, TIER[t]]; }), hint: 'These words appear in every subject' + AP + 's questions.', explain: 'Knowing these words tells you exactly what a question wants.', meta: { k: 'g8-tier-match' } };
  }
  function tierMeaning(lv) {
    var t = R.pick(THINK);
    return Q.one('What does <b>' + t + '</b> ask you to do?', TIER[t], R.some(THINK.filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2).map(function (x) { return TIER[x]; }), {
      fig: W.tile(t), prompt: 'Picture a question that starts with this word.', hint: 'Think of a time a teacher asked you to ' + t + '.', explain: '<b>' + t + '</b>: ' + TIER[t] + '.', meta: { k: 'g8-tier-meaning', word: t } });
  }
  function tierTf() {
    var t = R.pick(THINK), right = R.int(0, 1) === 1, said = right ? t : R.pick(THINK.filter(function (x) { return x !== t; }));
    return { q: Q.name() + ' says:', fig: W.sent('To <b>' + TIER[t] + '</b> is to <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['That is what <b>' + t + '</b> means.', 'All thinking words mean the same thing.'], answer: 0 }, hint: 'Which thinking word means this?',
      explain: '<b>' + t + '</b>: ' + TIER[t] + '.', meta: { k: 'g8-tier-tf', mean: TIER[t], said: said } };
  }

  /* ---------- subject words: [word, the subject it belongs to] ---------- */
  var SUBJ = [['photosynthesis', 'Science'], ['ecosystem', 'Science'], ['molecule', 'Science'], ['condensation', 'Science'], ['chlorophyll', 'Science'], ['friction', 'Science'],
    ['denominator', 'Math'], ['hypotenuse', 'Math'], ['perimeter', 'Math'], ['integer', 'Math'], ['quadrilateral', 'Math'], ['exponent', 'Math'],
    ['treaty', 'History'], ['confederation', 'History'], ['fur trade', 'History'], ['voyageur', 'History'], ['monarchy', 'History'],
    ['latitude', 'Geography'], ['longitude', 'Geography'], ['urbanization', 'Geography'], ['tundra', 'Geography'], ['archipelago', 'Geography'],
    ['tempo', 'Music'], ['crescendo', 'Music'], ['staccato', 'Music'], ['melody', 'Music'],
    ['palette', 'Visual Arts'], ['sculpture', 'Visual Arts'], ['collage', 'Visual Arts'], ['brushstroke', 'Visual Arts']];
  var SUBJECTS = ['Science', 'Math', 'History', 'Geography', 'Music', 'Visual Arts'];
  function of(subj) { return SUBJ.filter(function (x) { return x[1] === subj; }); }
  function subject(lv) {
    var s = R.pick(SUBJ);
    return Q.tiles('In which subject would you most likely use <b>' + s[0] + '</b>?', s[1], R.some(SUBJECTS.filter(function (x) { return x !== s[1]; }), lv > 1 ? 3 : 2), {
      prompt: 'Picture the textbook it would appear in.', hint: 'Picture the textbook it would appear in.', explain: '<b>' + s[0] + '</b>: ' + s[1] + '.', meta: { k: 'g8-subject', word: s[0] } });
  }
  function subjectOdd() {
    var subj = R.pick(SUBJECTS), three = R.some(of(subj), 3), odd = R.pick(SUBJ.filter(function (x) { return x[1] !== subj; }));
    return Q.one('Which word does <b>not</b> belong with the others?', odd[0], three.map(function (x) { return x[0]; }), { prompt: 'Which subject do three of them share?',
      hint: 'Three are ' + subj + ' words.', explain: three.map(function (x) { return x[0]; }).join(', ') + ': ' + subj + '. <b>' + odd[0] + '</b>: ' + odd[1] + '.', meta: { k: 'g8-subject-odd' } });
  }
  function subjectPick(lv) {
    var subj = R.pick(SUBJECTS), ins = R.some(of(subj), 2), outs = R.some(SUBJ.filter(function (x) { return x[1] !== subj; }), lv > 1 ? 3 : 2);
    return Q.all('Pick every <b>' + subj + '</b> word.', ins.map(function (x) { return x[0]; }), outs.map(function (x) { return x[0]; }), { hint: 'Picture a ' + subj + ' textbook.',
      explain: ins.map(function (x) { return x[0]; }).join(', ') + '.', meta: { k: 'g8-subject-pick', subj: subj } });
  }
  function subjectMatch() {
    var subs = R.some(SUBJECTS, 3);
    return { q: 'Match each word to its subject.', type: 'match', pairs: subs.map(function (s) { return [R.pick(of(s))[0], s]; }), hint: 'Picture the textbook each one would appear in.',
      explain: 'Every subject has its own words.', meta: { k: 'g8-subject-match' } };
  }

  /* ---------- words with two meanings: [word, subject, subject sentence, subject meaning, everyday sentence, everyday meaning] ---------- */
  var MULTI = [
    ['product', 'Math', 'The <b>product</b> of 6 and 7 is 42.', 'the answer to a multiplication', 'This <b>product</b> is made in Quebec.', 'something made to be sold'],
    ['mean', 'Math', 'The <b>mean</b> of 2, 4 and 6 is 4.', 'the average', 'It was <b>mean</b> to laugh at his mistake.', 'unkind'],
    ['volume', 'Math', 'The <b>volume</b> of the box is 24 cubic centimetres.', 'the space something takes up', 'Please turn down the <b>volume</b> on the radio.', 'how loud a sound is'],
    ['cell', 'Science', 'Every living thing is made of at least one <b>cell</b>.', 'the smallest unit of life', 'Her <b>cell</b> rang during the movie.', 'a mobile phone'],
    ['current', 'Science', 'The <b>current</b> in the river pulled the canoe downstream.', 'a flow of water in one direction', 'Read the news to learn about <b>current</b> events.', 'happening now'],
    ['revolution', 'History', 'The <b>revolution</b> ended the rule of the king.', 'a sudden change of government', 'The wheel made one <b>revolution</b> every second.', 'one full turn'],
    ['scale', 'Geography', 'The map' + AP + 's <b>scale</b> shows that 1 cm stands for 10 km.', 'how map distance compares to real distance', 'The trout lost a <b>scale</b> when it hit the rock.', 'a thin plate on a fish'],
    ['matter', 'Science', 'Solids, liquids and gases are all forms of <b>matter</b>.', 'anything that has mass and takes up space', 'What is the <b>matter</b>? You look upset.', 'a problem or trouble'],
    ['degree', 'Math', 'A right angle measures 90 <b>degrees</b>.', 'a unit for measuring angles', 'My aunt earned a <b>degree</b> in nursing.', 'an award for finishing college or university'],
    ['solution', 'Science', 'Salt stirred into water makes a <b>solution</b>.', 'a mixture where one thing dissolves in another', 'We found a <b>solution</b> to the parking problem.', 'an answer to a problem'],
    ['bill', 'History', 'Parliament debated the <b>bill</b> for three days.', 'a proposed law', 'The server brought the <b>bill</b> after dinner.', 'a list of what you owe'],
    ['cabinet', 'History', 'The prime minister chose a new <b>cabinet</b>.', 'the ministers who lead the government', 'The plates are in the <b>cabinet</b> above the sink.', 'a cupboard with shelves'],
    ['ruler', 'History', 'The <b>ruler</b> of the kingdom made every law.', 'a person who governs a country', 'Draw a straight line with a <b>ruler</b>.', 'a strip for measuring and drawing lines'],
    ['key', 'Geography', 'The <b>key</b> on the map shows a tent for each campsite.', 'a list explaining a map' + AP + 's symbols', 'I lost the <b>key</b> to the front door.', 'a tool that opens a lock'],
    ['medium', 'Visual Arts', 'Her favourite <b>medium</b> is watercolour.', 'the material an artist uses', 'I ordered a <b>medium</b> hot chocolate.', 'middle-sized']];
  /* one use of a word: [word, sentence, meaning there, the other meaning] */
  function use(m, school) { return school ? [m[0], m[2], m[3], m[5]] : [m[0], m[4], m[5], m[3]]; }
  /* two meanings overlap when they share a long word, like "government" or "answer" */
  function overlap(a, b) { var long = function (s) { return s.split(/\W+/).filter(function (w) { return w.length > 4; }); }; return long(a).some(function (w) { return long(b).indexOf(w) >= 0; }); }
  function multi(lv) {
    var m = R.pick(MULTI), u = use(m, R.int(0, 1) === 1);
    var extra = MULTI.filter(function (x) { return x !== m; }).map(function (x) { return x[R.pick([3, 5])]; }).filter(function (x) { return !overlap(x, u[2]); });
    return Q.one('What does <b>' + u[0] + '</b> mean <b>here</b>?', u[2], [u[3]].concat(lv > 1 ? [R.pick(extra)] : []), {
      fig: W.sent(u[1]), prompt: 'Which meaning makes sense in this sentence?', hint: 'The word has two meanings: ' + m[3] + ', and ' + m[5] + '.',
      explain: W.sent(u[1]) + '<b>' + u[0] + '</b>: ' + u[2] + '.', meta: { k: 'g8-multi', word: u[0] } });
  }
  function multiWhich() {
    var m = R.pick(MULTI), school = R.int(0, 1) === 1, u = use(m, school), v = use(m, !school);
    return Q.one('In which sentence does <b>' + m[0] + '</b> mean <b>' + u[2] + '</b>?', u[1], [v[1]], { prompt: 'Try the meaning in each sentence.',
      hint: 'Only one sentence makes sense with that meaning.', explain: W.sent(u[1]) + '<b>' + m[0] + '</b>: ' + u[2] + '.', meta: { k: 'g8-multi-which', word: m[0], mean: u[2] } });
  }
  function multiTf() {
    var m = R.pick(MULTI), u = use(m, R.int(0, 1) === 1), right = R.int(0, 1) === 1, said = right ? u[2] : u[3];
    return { q: Q.name() + ' says <b>' + u[0] + '</b> means <b>' + said + '</b> here.', fig: W.sent(u[1]), type: 'tf', answer: right,
      why: { options: ['That meaning makes sense in this sentence.', 'That is the word' + AP + 's other meaning.'], answer: right ? 0 : 1 }, hint: 'Try the meaning in the sentence.',
      explain: '<b>' + u[0] + '</b> here: ' + u[2] + '.', meta: { k: 'g8-multi-tf', word: u[0], said: said } };
  }
  function multiMatch() {
    var us = R.some(MULTI, 3).map(function (m) { return use(m, R.int(0, 1) === 1); });
    return { q: 'Match each sentence to what the bold word means.', type: 'match', pairs: us.map(function (u) { return [u[1], u[2]]; }), hint: 'Try each meaning in the sentence.',
      explain: 'The sentence decides which meaning is right.', meta: { k: 'g8-multi-match' } };
  }

  /* ---------- connotation: [positive word, negative word with a similar meaning] ---------- */
  var TONE = [['thrifty', 'cheap'], ['confident', 'arrogant'], ['curious', 'nosy'], ['determined', 'stubborn'], ['relaxed', 'lazy'], ['slender', 'scrawny'],
    ['youthful', 'childish'], ['unique', 'weird'], ['assertive', 'pushy'], ['cautious', 'cowardly'], ['proud', 'conceited'], ['bold', 'reckless'], ['firm', 'harsh'],
    ['casual', 'sloppy'], ['generous', 'wasteful']];
  function tonePos() {
    var t = R.pick(TONE), pos = R.int(0, 1) === 1;
    return Q.tiles('Which word sounds more <b>' + (pos ? 'positive' : 'negative') + '</b>?', t[pos ? 0 : 1], [t[pos ? 1 : 0]], { prompt: 'Would you like to be called this?',
      hint: 'The words mean nearly the same thing. Listen to the feeling.', explain: '<b>' + t[0] + '</b> sounds positive. <b>' + t[1] + '</b> sounds negative.', meta: { k: 'g8-tone', want: pos ? 'pos' : 'neg' } });
  }
  function toneFit() {
    var t = R.pick(TONE), praise = R.int(0, 1) === 1;
    return Q.one('You are writing to <b>' + (praise ? 'praise' : 'criticize') + '</b> someone. Which word fits?', t[praise ? 0 : 1], [t[praise ? 1 : 0]], {
      fig: W.sent(Q.name() + ' is ' + W.gap() + '.'), hint: 'Choose the word whose feeling matches your purpose.', explain: 'To ' + (praise ? 'praise' : 'criticize') + ', use <b>' + t[praise ? 0 : 1] + '</b>.', meta: { k: 'g8-tone-fit', want: praise ? 'pos' : 'neg' } });
  }
  function toneMatch() {
    var ts = R.some(TONE, 3);
    return { q: 'Match each positive word to the negative word that means nearly the same.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[1]]; }), hint: 'Each pair names the same quality, seen in a good or a bad light.', explain: 'This feeling is called a word' + AP + 's <b>connotation</b>.', meta: { k: 'g8-tone-match' } };
  }
  function toneTf() {
    var t = R.pick(TONE), w = R.pick(t), right = R.int(0, 1) === 1, said = right === (w === t[0]) ? 'a compliment' : 'an insult';
    return { q: Q.name() + ' says:', fig: W.sent('Calling someone <b>' + w + '</b> is ' + said + '.'), type: 'tf', answer: right,
      why: { options: ['<b>' + t[0] + '</b> sounds positive; <b>' + t[1] + '</b> sounds negative.', 'Words with the same meaning always feel the same.'], answer: 0 },
      hint: 'Would you be pleased to hear it?', explain: '<b>' + t[0] + '</b> is a compliment. <b>' + t[1] + '</b> is an insult.', meta: { k: 'g8-tone-tf', word: w, said: said } };
  }

  var MIT = byWord('mitigate'), NOC = byWord('nocturnal'), GRE = byWord('gregarious'), REL = byWord('reluctant'), ART = byWord('artifacts'), AMP = byWord('amphibians');
  Atlas.register('vocabulary', {
    full: true,
    lessons: [{
      id: 'clues', title: 'Context clues', sub: 'The sentence around a word often explains it.',
      concepts: [
        { slug: 'definition', title: 'The sentence may explain the word', exp: ['B2.2'], skill: 'definition',
          model: [
            step(W.sent(MIT[0]), 'A new word: <b>mitigate</b>.'),
            step(mark(MIT[0], 'or lessen'), '<b>or</b> signals a definition.'),
            step(mark(NOC[0], 'which means'), '<b>which means</b> signals one too.'),
            step(W.means('think', '<b>nocturnal</b>: active at night'))
          ],
          guided: [function () { return clueMeaning('definition')(1); }, clueWords('definition'), clueTf('definition')],
          check: [function () { return clueMeaning('definition')(2); }, clueWords('definition'), clueTf('definition'), clueMatch('definition'), function () { return clueMeaning('definition')(3); }],
          coach: '<p>Teach the signals: commas around a phrase, "or", "which means", "that is", "in other words", a dash or a colon.</p>',
          mistake: '<p>Skipping the word and reading on. Train the habit: stop, look left and right for a clue, then decide.</p>' },
        { slug: 'contrast', title: 'A contrast clue gives the opposite', exp: ['B2.2'], skill: 'contrast',
          model: [
            step(mark(GRE[0], 'Unlike'), '<b>Unlike</b>: the brother is the opposite of Hana.'),
            step(W.means('think', 'Hana: quiet. Brother: <b>gregarious</b>, social.')),
            step(mark(REL[0], 'but'), 'His sister dove in. Leo held back.'),
            step(W.tile('but') + ' ' + W.tile('however') + ' ' + W.tile('although'), 'More contrast signals.')
          ],
          guided: [function () { return clueMeaning('contrast')(1); }, clueKind, clueTf('contrast')],
          check: [function () { return clueMeaning('contrast')(2); }, clueKind, clueTf('contrast'), clueMatch('contrast'), function () { return clueMeaning('contrast')(3); }],
          coach: '<p>Ask: "Who is being compared? What is the other person like? So the word means the opposite."</p>',
          mistake: '<p>Choosing the meaning that describes the wrong person (Hana is shy, so "gregarious" must mean shy). Find who the word describes.</p>' },
        { slug: 'example', title: 'Examples point to the meaning', exp: ['B2.2'], skill: 'example',
          model: [
            step(mark(ART[0], 'such as'), 'Tools, pottery, clothing: what do they share?'),
            step(W.means('think', 'old objects people made')),
            step(mark(AMP[0], 'including'), 'Frogs, toads, salamanders: what do they share?'),
            step(W.means('think', 'animals of water and land'))
          ],
          guided: [function () { return clueMeaning('example')(1); }, clueWords('example'), clueTf('example')],
          check: [function () { return clueMeaning('example')(2); }, clueKind, clueTf('example'), clueMatch('example'), function () { return clueMeaning('example')(3); }],
          coach: '<p>List the examples on paper and ask what they have in common. That common thread is the meaning.</p>',
          mistake: '<p>Thinking the word means just one example ("artifacts means pottery").</p>' },
        { slug: 'parts', title: 'Use word parts and the sentence together', exp: ['B2.2'], skill: 'parts',
          model: [
            step(W.sent(PARTS[0][0])),
            step(W.sum(PARTS[0][2]), 'Not + pass + able.'),
            step(W.means('think', 'could not be passed through'), 'The sentence agrees: we turned back.'),
            step(W.sent(PARTS[2][0])),
            step(W.sum(PARTS[2][2]), 'Apart + break: a break in what was happening.')
          ],
          guided: [function () { return partsMeaning(1); }, partsPart, partsTf],
          check: [function () { return partsMeaning(2); }, partsPart, partsTf, partsMatch, function () { return partsMeaning(3); }],
          coach: '<p>Two checks are better than one: the parts suggest a meaning, and the sentence confirms it.</p>',
          mistake: '<p>Trusting the parts when the sentence disagrees. If they clash, look it up.</p>' }
      ]
    }, {
      id: 'academic', title: 'Words across subjects', sub: 'Thinking words, subject words, and words that change meaning.',
      concepts: [
        { slug: 'thinking-words', title: 'Thinking words tell you what to do', exp: ['B2.2'], skill: 'academic',
          model: [
            step(W.tile('analyze'), 'Break it into parts and study each one.'),
            step(W.sent(TASK[0][0].replace('___', '<b>analyze</b>')), 'Each stanza, one at a time.'),
            step(W.tile('evaluate'), 'Judge how good or useful it is.'),
            step(W.sent(TASK[3][0].replace('___', '<b>evaluate</b>')), 'Which source is better?')
          ],
          guided: [function () { return tierFit(1); }, function () { return tierMeaning(1); }, tierMatch],
          check: [function () { return tierFit(2); }, tierTf, function () { return tierMeaning(2); }, tierMatch, function () { return tierFit(2); }],
          coach: '<p>Circle the thinking word in every test question across subjects. Ask: "What exactly does it want me to do?"</p>',
          mistake: '<p>Summarizing when asked to analyze or evaluate. The thinking word sets the task.</p>' },
        { slug: 'subject-words', title: 'Each subject has its own words', exp: ['B2.2'], skill: 'subjects',
          model: [
            step(W.tile('photosynthesis') + ' ' + W.tile('ecosystem'), 'Science.'),
            step(W.tile('treaty') + ' ' + W.tile('confederation'), 'History.'),
            step(W.tile('denominator') + ' ' + W.tile('hypotenuse'), 'Math.'),
            step(W.tile('latitude') + ' ' + W.tile('tundra'), 'Geography.')
          ],
          guided: [function () { return subject(1); }, subjectOdd, function () { return subjectPick(1); }],
          check: [function () { return subject(2); }, subjectOdd, function () { return subjectPick(2); }, subjectMatch, function () { return subject(2); }],
          coach: '<p>Keep one page per subject for new words, with a picture or example for each.</p>',
          mistake: '<p>Using a subject word loosely in writing. Check the glossary of the textbook.</p>' },
        { slug: 'multiple', title: 'Some words change meaning by subject', exp: ['B2.2'], skill: 'two-meanings',
          model: [
            step(W.sent(MULTI[0][4]), 'Every day: something made to sell.'),
            step(W.sent(MULTI[0][2]), 'In Math: the answer to a multiplication.'),
            step(W.sent(MULTI[3][4]), 'Every day: a phone.'),
            step(W.sent(MULTI[3][2]), 'In Science: the smallest unit of life.')
          ],
          guided: [function () { return multi(1); }, multiWhich, multiTf],
          check: [function () { return multi(2); }, multiWhich, multiTf, multiMatch, function () { return multi(2); }],
          coach: '<p>Collect "double agent" words: mean, volume, current, scale, cell. Write each one in two sentences.</p>',
          mistake: '<p>Reading a Math question with the everyday meaning ("mean" as unkind).</p>' },
        { slug: 'connotation', title: 'Words can feel positive or negative', exp: ['B2.2'], skill: 'connotation',
          model: [
            step(W.tile('thrifty') + ' ' + W.tile('cheap'), 'Both spend little money.'),
            step(W.means('star', '<b>thrifty</b>: wise with money')),
            step(W.means('not', '<b>cheap</b>: mean with money')),
            step(W.tile('curious') + ' ' + W.tile('nosy'), 'Both want to know. Which would you rather be called?')
          ],
          guided: [tonePos, toneFit, toneTf],
          check: [tonePos, toneFit, toneTf, toneMatch, tonePos],
          coach: '<p>Play "same but different": the grown-up says a word, and the child finds a twin with the opposite feeling.</p>',
          mistake: '<p>Choosing a negative word by accident in persuasive writing. Read the sentence aloud and ask how the person would feel.</p>' }
      ]
    }],
    practice: [
      { id: 'definition', name: 'Definition clues', code: 'B2.2', gen: clueMeaning('definition') },
      { id: 'contrast', name: 'Contrast clues', code: 'B2.2', gen: clueMeaning('contrast') },
      { id: 'example', name: 'Example clues', code: 'B2.2', gen: clueMeaning('example') },
      { id: 'parts', name: 'Word parts in a sentence', code: 'B2.2', gen: partsMeaning },
      { id: 'academic', name: 'Thinking words', code: 'B2.2', gen: tierFit },
      { id: 'subjects', name: 'Subject words', code: 'B2.2', gen: subject },
      { id: 'two-meanings', name: 'Words with two meanings', code: 'B2.2', gen: multi },
      { id: 'connotation', name: 'Positive and negative words', code: 'B2.2', gen: tonePos }
    ]
  });

  Q.shapes('vocabulary', {
    definition: [[1, 'clue-words', clueWords('definition')], [1, 'true-false', clueTf('definition')], [2, 'match', clueMatch('definition')]],
    contrast: [[1, 'clue-words', clueWords('contrast')], [1, 'true-false', clueTf('contrast')], [2, 'match', clueMatch('contrast')]],
    example: [[1, 'clue-words', clueWords('example')], [1, 'true-false', clueTf('example')], [2, 'match', clueMatch('example')]],
    parts: [[1, 'which-part', partsPart], [1, 'true-false', partsTf], [2, 'match', partsMatch]],
    academic: [[1, 'meaning', tierMeaning], [1, 'true-false', tierTf], [2, 'match', tierMatch]],
    subjects: [[1, 'odd-one-out', subjectOdd], [1, 'pick-all', subjectPick], [2, 'match', subjectMatch]],
    'two-meanings': [[1, 'which-sentence', multiWhich], [1, 'true-false', multiTf], [2, 'match', multiMatch]],
    connotation: [[1, 'fit', toneFit], [2, 'match', toneMatch], [2, 'true-false', toneTf]]
  });
})();
