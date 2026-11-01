/* Grade 2 answer checks: listening and speaking (grade2/chapters/talking.js). The checker keeps its own lists of what fits. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const FITS = { 'I went camping last weekend.': 'Where did you sleep?', 'My grandma taught me to make dumplings.': 'What did you put inside them?', 'Our class has a new fish.': 'What colour is it?',
    'I lost my first tooth!': 'Did it hurt?', 'We built a snow fort.': 'How big was it?', 'My cousin came to visit from Saskatoon.': 'How long is your cousin staying?',
    'I saw a moose on our road trip.': 'Was it close to the car?', 'We planted beans in the garden.': 'How tall are they now?', 'I started swimming lessons.': 'What did you learn first?',
    'My dad and I made bannock.': 'How did it taste?', 'Our family got a new puppy.': 'What is its name?', 'I finished a big puzzle.': 'How many pieces did it have?' };
  const BACK = { 'Put your boots by the door, then wash your hands.': 'Boots by the door, then wash my hands.', 'The library trip is on Thursday. Bring your book.': 'Thursday, and bring my book.',
    'Feed the cat one scoop of food.': 'One scoop for the cat.', 'Hang up your coat, then sit on the carpet.': 'Coat on the hook, then sit on the carpet.', 'Bring your mittens. We are going sledding.': 'Bring my mittens for sledding.',
    'Read for ten minutes, then turn off the light.': 'Read ten minutes, then lights off.', 'The bus comes at eight. Wait by the gate.': 'Bus at eight, wait by the gate.',
    'Water the plant on Monday and Friday.': 'Water it Monday and Friday.', 'Put the forks on the left and the cups on the right.': 'Forks left, cups right.', 'Draw a tree, then colour the sky blue.': 'Draw a tree, then a blue sky.' };
  const INTERESTED = new Set(['Nod and look at them.', 'Say, "Wow, tell me more!"', 'Ask a question about it.', 'Smile and face them.', 'Say, "Then what happened?"', 'Keep your eyes on the speaker.']);
  const FAIR = new Set(['Wait until the speaker stops.', 'Raise your hand in a group.', 'Let everyone have a turn.', 'Say, "Your turn."', 'Listen, then add your idea.']);
  const HELP = /^(Ask them to|Say what part|Ask what a new word)/;
  const WHEN = { 'Think about what you already know.': 'Before', 'Sit still and face the speaker.': 'Before', 'Guess what it will be about.': 'Before', 'Picture it in your head.': 'During',
    'Notice words you do not know.': 'During', 'Keep your eyes on the speaker.': 'During', 'Say back what you heard.': 'After', 'Tell someone what it was about.': 'After', 'Ask about a part that was hard.': 'After' };
  const ON = { 'our trip to the farm': 'We fed the goats.', 'how to plant a seed': 'Push the seed into the soil.', 'our favourite winter game': 'We love sledding down the big hill.',
    'our class pet': 'Our hamster runs on its wheel at night.', 'a trip to the beach': 'We dug a big hole in the sand.', 'how to make a sandwich': 'First, spread butter on the bread.',
    'the first snow': 'Big flakes landed on my mittens.', 'my favourite book': 'The story is about a lost loon.', 'a visit to the dentist': 'The dentist counted my teeth.', 'our garden': 'The tomatoes are turning red.' };
  const FOR = { 'your teacher': 'Excuse me, may I get a drink of water?', 'a visitor to the class': 'Hello, thank you for coming.', 'your best friend': 'Want to play tag?',
    'the principal': 'Good morning. May I bring this note to the office?', 'your little cousin': 'Want to build a block tower with me?', 'a store clerk': 'Excuse me, where are the apples, please?',
    'your grandpa on the phone': 'Hi, Grandpa! I learned to skate today.', 'the whole class': 'Good morning, everyone. Today I will tell you about my pet.' };
  const SHOWS = { 'a big smile': 'happy', 'a frown': 'upset', 'wide eyes': 'surprised', 'a shrug': 'not sure', 'a thumbs up': 'it is good', 'a nod': 'yes', 'shaking your head': 'no',
    'a wave': 'hello or goodbye', 'a finger to your lips': 'be quiet', 'a yawn': 'tired' };
  const VOICE = { 'telling a spooky part of a story': 'soft and slow', 'sharing exciting news': 'fast and bright', 'talking in the library': 'quiet', 'speaking to the whole class': 'loud and clear',
    'saying sorry to a friend': 'gentle', 'calling a friend across the field': 'loud and clear' };
  /* the exact sentences, and the vague word in each vague sentence with what to use instead */
  const EXACT = new Set(['I saw a big grey heron by the pond.', 'Building the snow fort was so much fun.', 'Please pass me the green crayon.', 'We went to the science centre.', 'Ava scored a goal.',
    'Look at the eagle on the tall pine.', 'I want the blue paint.', 'We ate warm bannock with jam.', 'The moose was taller than a door.', 'Grandma and Grandpa came for supper.', 'I got a new library card.', 'The tip of my pencil broke.']);
  const VAGUE = { 'I found a thing by the lake.': ['thing', 'feather'], 'Pass me that stuff please.': ['stuff', 'glue'], 'We went to the place after school.': ['place', 'library'], 'A bird sat on the thing.': ['thing', 'fence'],
    'My dog ate some stuff.': ['stuff', 'carrots'], 'I saw an animal at the pond.': ['animal', 'frog'], 'Grandpa made food for supper.': ['food', 'stew'], 'Mei got a toy for her birthday.': ['toy', 'kite'],
    'The weather was bad today.': ['bad', 'stormy'], 'Kai drew a nice picture.': ['nice', 'colourful'], 'We heard a sound in the tree.': ['sound', 'woodpecker'] };
  const picks = (q, fits) => H.sameSet(q.options.map((o, i) => (fits(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);
  const tfOk = (q, yes) => q.answer === yes && q.why.answer === (yes ? 0 : 1);

  V['g2-good-question'] = (q, m) => mk(q) === FITS[m.said] ? '' : 'expected ' + FITS[m.said];
  V['g2-interest'] = q => picks(q, o => INTERESTED.has(o)) ? '' : 'the interested moves are not the ones marked';
  V['g2-interest-tf'] = (q, m) => tfOk(q, INTERESTED.has(m.move)) ? '' : 'expected ' + INTERESTED.has(m.move);
  V['g2-question-tf'] = (q, m) => tfOk(q, FITS[m.said] === m.ask) ? '' : 'expected ' + (FITS[m.said] === m.ask);
  V['g2-say-back'] = (q, m) => mk(q) === BACK[m.said] ? '' : 'expected ' + BACK[m.said];
  V['g2-say-back-tf'] = (q, m) => tfOk(q, BACK[m.said] === m.back) ? '' : 'expected ' + (BACK[m.said] === m.back);
  V['g2-hard'] = q => HELP.test(mk(q)) && q.options.map(text).filter(o => HELP.test(o)).length === 1 ? '' : 'expected the one way to ask for help';
  V['g2-listen-order'] = q => q.items.map(text).map(s => s.split(':')[0]).join(' ') === 'Before During After' ? '' : 'the steps are out of order';
  V['g2-listen-when'] = (q, m) => mk(q) === WHEN[m.s] ? '' : 'expected ' + WHEN[m.s];
  V['g2-on-topic'] = (q, m) => mk(q) === ON[m.topic] ? '' : 'expected ' + ON[m.topic];
  V['g2-off-topic'] = (q, m) => mk(q) !== ON[m.topic] && q.options.map(text).includes(ON[m.topic]) ? '' : 'expected the idea that is not about ' + m.topic;
  V['g2-turns'] = q => picks(q, o => FAIR.has(o)) ? '' : 'the turn-taking moves are not the ones marked';
  V['g2-who-for'] = (q, m) => mk(q) === FOR[m.who] ? '' : 'the words do not fit ' + m.who;
  V['g2-body'] = (q, m) => mk(q) === SHOWS[m.move] ? '' : 'expected ' + SHOWS[m.move];
  V['g2-body-match'] = q => q.pairs.every(p => SHOWS[text(p[0])] === text(p[1])) ? '' : 'a move is matched to the wrong meaning';
  V['g2-body-show'] = (q, m) => SHOWS[mk(q)] === m.shows ? '' : 'that does not show ' + m.shows;
  V['g2-talk-voice'] = (q, m) => mk(q) === VOICE[m.when] ? '' : 'expected ' + VOICE[m.when];
  V['g2-clearer'] = q => { const ok = q.options.map(text).filter(o => EXACT.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the exact sentence'; };
  V['g2-clear-tf'] = (q, m) => tfOk(q, EXACT.has(m.said)) ? '' : 'expected ' + EXACT.has(m.said);
  V['g2-vague-tap'] = (q, m) => mk(q) === VAGUE[m.s][0] ? '' : 'expected ' + VAGUE[m.s][0];
  V['g2-exact-swap'] = (q, m) => mk(q) === VAGUE[m.s][1] ? '' : 'expected ' + VAGUE[m.s][1];
})();
