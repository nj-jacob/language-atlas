/* Grade 6 answer checks: reading fluently (grade6/chapters/fluency.js). The checker keeps its own key of phrase breaks and readings,
   and works out the voice for a mark from the last mark in the sentence. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'true/false is wrong';
  /* the checker's own phrase breaks */
  const GOOD = ['The old canoe / drifted slowly / across the lake.', 'After the storm, / the whole town / helped clean up.', 'My cousin from Iqaluit / sent us a photo / of the northern lights.',
    'When the bell rang, / the students / lined up quietly.', 'Beside the river, / a great blue heron / stood perfectly still.', 'If you finish early, / read a chapter / of your book.',
    'On Saturday morning, / Priya and her dad / biked to the market.', 'The hungry raccoon / tipped over / our green bin.', 'Before the game started, / the coach / gave a short speech.',
    'Under the frozen pond, / the turtles / sleep all winter.', 'At the powwow, / the jingle dancers / moved in a circle.', 'During the long drive, / we counted / red barns and cows.',
    'The tall maple tree / turned bright red / in October.', 'Without a word, / Mateo handed me / the missing puzzle piece.', 'Every spring, / the geese fly north / in a V shape.',
    'Near the end of the trail, / we spotted / a family of deer.'];
  const PHRASE = new Set(GOOD.flatMap(g => g.split(' / ')));
  const goodFor = s => GOOD.find(g => g.replace(/ \/ /g, ' ') === s);
  V['g6-phrasing'] = q => { const fit = q.options.map(text).filter(o => GOOD.includes(o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the split into meaningful phrases'; };
  V['g6-phrase-tf'] = q => tf(q, GOOD.includes(text(q.fig)));
  V['g6-phrase-break'] = (q, m) => { const g = goodFor(q.tiles.map(text).join(' ')), end = g && g.split(' / ').slice(0, m.which + 1).join(' ').split(' ').length - 1;
    return g && q.answer === end ? '' : 'expected the last word of that phrase'; };
  V['g6-phrase-pick'] = q => H.sameSet(q.options.map((o, i) => PHRASE.has(text(o)) && text(q.fig).includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the phrases marked are not the meaningful ones';

  const lastMark = s => /\.\.\.$/.test(s) ? '...' : /\?$/.test(s) ? '?' : /!$/.test(s) ? '!' : /,/.test(s) ? ',' : '.';
  const VOICE = { '?': 'rises at the end', ',': 'pauses briefly', '!': 'sounds strong and excited', '...': 'trails off, as if more is coming', '.': 'drops and stops' };
  const voiceOf = s => VOICE[lastMark(text(s))];
  V['g6-voice'] = (q, m) => lastMark(text(q.fig)) === m.mark && mk(q) === voiceOf(q.fig) ? '' : 'expected ' + voiceOf(q.fig);
  V['g6-voice-match'] = q => q.pairs.every(p => voiceOf(p[0]) === text(p[1])) ? '' : 'a sentence is matched to the wrong voice';
  V['g6-voice-tf'] = (q, m) => tf(q, voiceOf(q.fig) === m.said);
  V['g6-voice-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => voiceOf(o) === m.does ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the sentences marked are not the ones where your voice ' + m.does;

  const PACE = { 'the steps of a science experiment': 'slowly and carefully', 'a recipe you are cooking from': 'slowly and carefully', 'the rules of a new board game': 'slowly and carefully',
    'a favourite comic, just for fun': 'at a quick, easy pace', 'a funny story you have read before': 'at a quick, easy pace',
    'a tense, scary part of a story aloud': 'slower, with pauses for effect', 'a sad ending to the class': 'slower, with pauses for effect',
    'a website, to find one fact': 'quickly, then slow down at the fact', 'a bus schedule, to find your bus time': 'quickly, then slow down at the fact', 'an index, to find one page': 'quickly, then slow down at the fact',
    'a poem to the class': 'steadily, with the rhythm of the lines', 'song lyrics, while you sing along': 'steadily, with the rhythm of the lines' };
  V['g6-pace'] = (q, m) => mk(q) === PACE[m.why] && text(q.q).includes(m.why) && q.options.filter(o => text(o) === PACE[m.why]).length === 1 ? '' : 'expected ' + PACE[m.why];
  V['g6-pace-tf'] = (q, m) => tf(q, PACE[m.why] === m.said);
  V['g6-pace-match'] = q => q.pairs.every(p => PACE[text(p[0])] === text(p[1])) ? '' : 'a reading is matched to the wrong pace';
  V['g6-pace-which'] = (q, m) => { const fit = q.options.map(text).filter(o => PACE[o] === m.pace); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the reading that needs ' + m.pace; };

  /* how to say a line, from its speaking word */
  const HOW = { shouted: 'loud and urgent', whispered: 'soft and sad', cheered: 'loud and joyful', groaned: 'tired and unwilling', nervously: 'quiet and nervous', warmly: 'calm and warm',
    snapped: 'sharp and angry', gasped: 'surprised and amazed', sighed: 'bored and flat', mumbled: 'quiet and sorry', boasted: 'proud and showy', begged: 'pleading and hopeful', announced: 'clear and firm' };
  const sayWord = s => Object.keys(HOW).find(w => new RegExp('\\b' + w + '\\b').test(s));
  const howOf = s => HOW[sayWord(text(s))];
  V['g6-express'] = q => mk(q) === howOf(q.fig) ? '' : 'expected ' + howOf(q.fig);
  V['g6-express-match'] = q => q.pairs.every(p => howOf(p[0]) === text(p[1])) ? '' : 'a line is matched to the wrong way of saying it';
  V['g6-express-tap'] = q => { const hits = q.tiles.map((t, i) => HOW[text(t).replace(/[^A-Za-z]/g, '')] ? i : -1).filter(i => i >= 0); return hits.length === 1 && q.answer === hits[0] ? '' : 'expected the speaking word'; };
  V['g6-express-tf'] = (q, m) => tf(q, howOf(q.fig) === m.said);

  /* the checker's own stress key: sentence, stressed word, meaning */
  const STRESS = [['I did not eat the last muffin.', { I: 'Someone else ate it.', eat: 'I did something else with it.', last: 'I ate a different muffin.' }],
    ['Ava said the test is on Friday.', { Ava: 'Ava said it, not someone else.', Friday: 'Friday, not another day.', test: 'A test, not a quiz.' }],
    ['We walked to the park.', { We: 'Us, not other people.', walked: 'We did not drive.', park: 'The park, not somewhere else.' }],
    ['She lent me her blue jacket.', { She: 'She lent it, not her brother.', lent: 'I have to give it back.', blue: 'The blue one, not the green one.' }],
    ['Can you carry the big box?', { you: 'You, not your friend.', carry: 'Lift it, do not drag it.', big: 'The big one, not the small one.' }],
    ['Dad made pancakes this morning.', { Dad: 'Dad made them, not Grandpa.', pancakes: 'Pancakes, not waffles.', morning: 'This morning, not last night.' }],
    ['I said the game starts at noon.', { said: 'I told you already.', game: 'The game, not the practice.', noon: 'At noon, not at one.' }],
    ['Our team scored two goals.', { Our: 'Our team, not theirs.', two: 'Two, not three.', scored: 'We scored them, we did not let them in.' }]];
  const word = s => s.replace(/[.?]$/, '');
  const meaning = (sentence, w) => { const s = STRESS.find(x => x[0] === sentence); return s && s[1][word(w)]; };
  const boldIn = fig => { const b = /<b>([^<]+)<\/b>/.exec(fig); return b && b[1]; };
  V['g6-stress'] = (q, m) => meaning(q.tiles.map(text).join(' '), text(q.tiles[q.answer])) === m.means ? '' : 'stressed the wrong word for: ' + m.means;
  V['g6-stress-mean'] = q => { const want = meaning(text(q.fig), boldIn(q.fig)); return want && mk(q) === want ? '' : 'expected ' + want; };
  V['g6-stress-tf'] = (q, m) => tf(q, meaning(text(q.fig), boldIn(q.fig)) === m.said);
  V['g6-stress-match'] = q => q.pairs.every(p => meaning(text(q.fig), text(p[0])) === text(p[1])) ? '' : 'a stressed word is matched to the wrong meaning';
})();
