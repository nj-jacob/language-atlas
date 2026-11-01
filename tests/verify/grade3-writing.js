/* Grade 3 answer checks: writing and publishing (grade3/chapters/writing.js). Own rules and lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const isFirst = s => /\b(I|we|my|our|me|We|My|Our)\b/.test(s);
  const VOICED = /best day of my whole|silliest, sweetest|drummed on the roof|swish of my skates|right down to my toes|did flips|I froze|I cheered|drives me bananas|could not put that book down|sand squishes|so proud of the card/;
  const STRONG = { 'very big': 'huge', 'very small': 'tiny', 'very happy': 'thrilled', 'very tired': 'exhausted', 'very cold': 'freezing', 'very hot': 'scorching', 'very scared': 'terrified',
    'very hungry': 'starving', 'very funny': 'hilarious', 'very wet': 'soaked', 'very quiet': 'silent', 'very good': 'excellent', 'very angry': 'furious' };
  const BELONG = {
    'My dog Biscuit': ['Biscuit has soft brown fur.', 'He loves to chase balls.', 'He sleeps at the end of my bed.', 'Biscuit barks at the mail carrier.'],
    'Winter fun': ['We build snow forts.', 'We skate on the pond.', 'We drink hot cocoa after.', 'We slide down the big hill.'],
    'Our garden': ['We plant beans and squash.', 'I water the plants every morning.', 'In August we pick the tomatoes.', 'Bees visit the flowers.'],
    Moose: ['Moose are the biggest kind of deer.', 'They eat leaves and water plants.', 'Male moose grow wide antlers.', 'A baby moose is called a calf.'],
    'My first sleepover': ['I packed my sleeping bag.', 'We told stories with a flashlight.', 'We ate popcorn at midnight.', 'In the morning, we had pancakes.'],
    'Recycling at school': ['We sort paper into the blue bin.', 'Cans and bottles go in another bin.', 'Our class checks the bins every Friday.', 'Less garbage goes to the dump.'],
    'The Three Sisters garden': ['Corn grows tall and straight.', 'Beans climb up the corn.', 'Squash leaves shade the soil.', 'The plants help each other grow.'],
    'Skating at the rink': ['I lace my skates up tight.', 'I glide around the rink.', 'Sometimes I fall, but I get back up.', 'After skating, my toes are cold.'] };
  const CLEARER = { 'The cake was good.': 'delicious', 'The dog was big.': 'enormous', 'The movie was fun.': 'exciting', 'It was cold outside.': 'freezing', 'The puppy was little.': 'tiny',
    'The music was loud.': 'booming', 'Mia was happy.': 'thrilled', 'The room was messy.': 'cluttered', 'The soup was hot.': 'steaming', 'The hill was high.': 'towering' };
  /* each sentence with a mistake: [the word that is wrong, the fixed sentence, the kind of mistake] */
  const FIX = {
    'my friend Zara came over.': ['my', 'My friend Zara came over.', 'capital'], 'We visited sudbury last summer.': ['sudbury', 'We visited Sudbury last summer.', 'capital'],
    'I sed hello to the bus driver.': ['sed', 'I said hello to the bus driver.', 'spelled'], 'We played outside becuz it was sunny.': ['becuz', 'We played outside because it was sunny.', 'spelled'],
    'Leila and omar went skating.': ['omar', 'Leila and Omar went skating.', 'capital'], 'My frend lives next door.': ['frend', 'My friend lives next door.', 'spelled'],
    'The geese is flying south.': ['is', 'The geese are flying south.', 'sound right'], 'We goed to the library.': ['goed', 'We went to the library.', 'sound right'],
    'i like to read comics.': ['i', 'I like to read comics.', 'capital'], 'The dogs runs in our yard.': ['runs', 'The dogs run in our yard.', 'sound right'],
    'We swam in Lake huron.': ['huron', 'We swam in Lake Huron.', 'capital'], 'My birthday is in june.': ['june', 'My birthday is in June.', 'capital'],
    'They was late for school.': ['was', 'They were late for school.', 'sound right'], 'The bus was rilly full.': ['rilly', 'The bus was really full.', 'spelled'],
    'We have gym on munday.': ['munday', 'We have gym on Monday.', 'spelled'], 'She has too cats.': ['too', 'She has two cats.', 'spelled'],
    'I can see there house from here.': ['there', 'I can see their house from here.', 'spelled'], 'We had sum apples.': ['sum', 'We had some apples.', 'spelled'],
    'Hana writed a poem.': ['writed', 'Hana wrote a poem.', 'sound right'], 'Red leafs fell from our tree.': ['leafs', 'Red leaves fell from our tree.', 'sound right'] };
  const CORRECT = new Set(Object.values(FIX).map(f => f[1]));
  const one = (q, ok) => { const good = q.options.map(text).filter(ok); return good.length === 1 && mk(q) === good[0]; };
  const lastWord = s => s.replace(/[.!]$/, '').split(' ').pop();

  V['g3-writer-voice'] = q => one(q, o => VOICED.test(o)) ? '' : 'expected the sentence with voice';
  V['g3-stronger'] = (q, m) => one(q, o => o === STRONG[m.plain]) ? '' : 'expected ' + STRONG[m.plain];
  V['g3-match-stronger'] = q => q.pairs.every(p => STRONG[text(p[0])] === text(p[1])) ? '' : 'a pair is matched to the wrong strong word';
  V['g3-voice-tf'] = (q, m) => text(q.fig) === text(m.s) && VOICED.test(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-pov'] = (q, m) => q.answer === (isFirst(m.s) ? 0 : 1) && H.has(q.fig, m.s) ? '' : 'wrong person for "' + m.s + '"';
  V['g3-pov-switch'] = (q, m) => { const want = m.to === 'first'; return one(q, o => isFirst(o) === want && /\.$/.test(o) && lastWord(o) === lastWord(text(m.s))) ? '' : 'expected the ' + m.to + '-person version'; };
  V['g3-pick-first'] = q => H.sameSet(q.options.map((o, i) => isFirst(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the first-person sentences are not the ones marked';
  V['g3-pov-fits'] = (q, m) => { const want = isFirst(text(m.s)); return one(q, o => isFirst(o) === want) ? '' : 'expected the sentence in the same point of view'; };
  V['g3-no-belong'] = (q, m) => one(q, o => !BELONG[m.topic].includes(o)) ? '' : 'expected the sentence that is off topic';
  V['g3-add-detail'] = (q, m) => one(q, o => BELONG[m.topic].includes(o)) ? '' : 'expected the sentence about ' + m.topic;
  V['g3-replace-word'] = (q, m) => one(q, o => o === CLEARER[text(m.s)]) ? '' : 'expected ' + CLEARER[text(m.s)];
  V['g3-revise-tf'] = (q, m) => BELONG[m.topic].includes(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-find-error'] = (q, m) => { const f = FIX[text(m.s)]; return f && text(q.tiles[q.answer]) === f[0] && q.tiles.map(text).filter(t => t === f[0]).length === 1 ? '' : 'expected ' + (f && f[0]); };
  V['g3-fixed'] = q => one(q, o => CORRECT.has(o)) && FIX[text(q.fig)] && mk(q) === FIX[text(q.fig)][1] ? '' : 'expected the fixed sentence';
  V['g3-edit-kind'] = (q, m) => { const f = FIX[text(m.s)]; return f && one(q, o => o.includes(f[2])) ? '' : 'expected the mistake to be about ' + (f && f[2]); };
  V['g3-edit-tf'] = (q, m) => CORRECT.has(text(m.s)) === q.answer && (CORRECT.has(text(m.s)) || FIX[text(m.s)]) ? '' : 'true/false is wrong for ' + m.s;
})();
