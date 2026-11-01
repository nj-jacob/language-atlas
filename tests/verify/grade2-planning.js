/* Grade 2 answer checks: planning writing (grade2/chapters/planning.js). The checker keeps its own lists of what fits. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  /* each piece of writing and its topic */
  const WRITING = { 'We fed the goats. A lamb was born. I collected eggs.': 'a day at the farm', 'First, fill the cup with soil. Next, push in a seed. Last, water it.': 'how to plant a seed',
    'Dogs make the best pets. They are loyal. They love to play.': 'why dogs make the best pets', 'Beavers have flat tails. They chew trees. They build lodges.': 'all about beavers',
    'The snow was deep. We rolled three balls. Our snowman got a carrot nose.': 'building a snowman', 'Grandma came by bus. She brought bannock. We played cards all night.': 'a visit from Grandma',
    'Recess should be longer. We need to move. We learn better after we play.': 'why recess should be longer', 'Owls hunt at night. They can turn their heads far. They eat mice.': 'all about owls',
    'First, get a bowl. Next, add oats and milk. Last, stir and eat.': 'how to make oatmeal', 'We paddled to the island. A loon called. We ate lunch on a rock.': 'a canoe trip' };
  const topicOfSentence = x => { const w = Object.keys(WRITING).find(k => k.split(/(?<=\.) /).includes(x)); return w && WRITING[w]; };
  const SMALL = new Set(['my dog Biscuit', 'our trip to the lake', 'how to make a snack', 'the day I lost my tooth', 'my favourite hockey game', 'how monarch caterpillars grow', 'our school garden', 'my first ride on a ferry']);
  const FORM = { 'to tell about something that happened to you': 'a true story about me', 'to get someone to agree with you': 'an opinion piece', 'to tell someone how to do something': 'how-to steps',
    'to give facts about frogs': 'a fact book', 'to thank Grandma for a gift': 'a thank-you card', 'to ask friends to come to your party': 'an invitation', 'to remember what to buy at the store': 'a list',
    'to share a feeling with rhythm and sound': 'a poem' };
  /* how each form starts, by what it looks like */
  const looks = x => (/^Dear .*Thank you/.test(x) ? 'a thank-you card' : /^First,/.test(x) ? 'how-to steps' : /^I think/.test(x) ? 'an opinion piece' : /^Come to/.test(x) ? 'an invitation' :
    !/[.!?]$/.test(x) ? 'a list' : /, .* slow, /.test(x) ? 'a poem' : /^Last summer, I/.test(x) ? 'a true story about me' : 'a fact book');
  const AUD = { 'your little cousin, who is four': 'short words and big pictures', 'your teacher': 'neat writing and full sentences', 'your best friend': 'a friendly, chatty voice',
    'a visitor who has never been to your school': 'a map and clear directions', 'people walking past your poster': 'big, bold words they can read from far away', 'your grandma, who lives far away': 'news about what you have been doing' };
  const FOR = { 'Hi Mo! Guess what? I got a puppy!': 'your best friend', 'Dear Ms. Patel, I finished my reading log.': 'your teacher', 'Big dog. Red ball. Dog runs!': 'your little cousin, who is four',
    'LOST CAT! Grey with white paws.': 'people walking past your poster', 'Turn left at the gym. Our class is Room 4.': 'a visitor who has never been to your school',
    'Dear Grandma, We went skating on the canal. I miss you!': 'your grandma, who lives far away' };
  const FITS = { 'My birthday party': /cake|games|gift/, 'All about frogs': /frogs eat|tadpoles|frogs live/, 'Winter fun': /sledding|snow fort|skating/, 'A day at the beach': /sand|shells|waves/,
    'All about moose': /moose/, 'How to care for a cat': /feeding it|litter|its fur/, 'Our class trip to the farm': /goats|barn|wagon/, 'Why reading is fun': /stories|new facts|share books/ };
  const GOOD = /^(a library book about|a website from a science centre|an expert who studies|a video from a science museum)/;
  const PLANS = ['We drove to the lake.|We set up our tent.|We swam until supper.|We roasted marshmallows.', 'Get two slices of bread.|Spread on the sunflower butter.|Put the slices together.|Cut it in half.',
    'Snow fell all night.|We put on our snow pants.|We built a snowman.|We drank hot chocolate inside.', 'Fill a cup with soil.|Push a seed into the soil.|Water the seed.|Put the cup in the sun.',
    'Wet your toothbrush.|Add a little toothpaste.|Brush every tooth.|Rinse your mouth.', 'I woke up early.|We drove to the arena.|I put on my skates.|I scored my first goal.'].map(p => p.split('|'));
  const firsts = new Set(PLANS.map(p => p[0]));
  const HEAD = { 'eats flies': 'Food', 'eats worms': 'Food', 'lives near a pond': 'Home', 'hides under logs': 'Home', 'has long back legs': 'Body', 'has wet, smooth skin': 'Body',
    'eats bark': 'Food', 'eats water plants': 'Food', 'builds a lodge': 'Home', 'lives in a pond': 'Home', 'has a flat tail': 'Body', 'has big front teeth': 'Body' };
  const HOW = { 'a true story about me': 'the order it happened', 'how-to steps': 'the order of the steps', 'a fact book': 'in groups, with headings' };
  const picks = (q, fits) => H.sameSet(q.options.map((o, i) => (fits(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);
  const one = (q, fits) => { const ok = q.options.map(text).filter(fits); return ok.length === 1 && mk(q) === ok[0]; };
  const tfOk = (q, yes) => q.answer === yes && q.why.answer === (yes ? 0 : 1);

  /* topic */
  V['g2-topic-of'] = (q, m) => mk(q) === WRITING[m.s] ? '' : 'expected ' + WRITING[m.s];
  V['g2-topic-tf'] = (q, m) => tfOk(q, WRITING[m.s] === m.said) ? '' : 'expected ' + (WRITING[m.s] === m.said);
  V['g2-topic-off'] = (q, m) => one(q, o => topicOfSentence(o) !== m.topic) && q.options.map(text).every(o => topicOfSentence(o)) ? '' : 'expected the one sentence about something else';
  V['g2-topic-size'] = q => SMALL.has(mk(q)) ? '' : 'expected the smaller topic';
  /* purpose */
  V['g2-form-for'] = (q, m) => mk(q) === FORM[m.why] ? '' : 'expected ' + FORM[m.why];
  V['g2-match-purpose'] = q => q.pairs.every(p => FORM[text(p[0])] === text(p[1])) ? '' : 'a purpose is matched to the wrong form';
  V['g2-form-tf'] = (q, m) => tfOk(q, FORM[m.why] === m.said) ? '' : 'expected ' + (FORM[m.why] === m.said);
  V['g2-form-looks'] = (q, m) => mk(q) === looks(m.s) ? '' : 'expected ' + looks(m.s);
  /* audience */
  V['g2-audience'] = (q, m) => mk(q) === AUD[m.who] ? '' : 'expected ' + AUD[m.who];
  V['g2-aud-match'] = q => q.pairs.every(p => AUD[text(p[0])] === text(p[1])) ? '' : 'a reader is matched to the wrong help';
  V['g2-aud-who'] = (q, m) => mk(q) === FOR[m.s] ? '' : 'expected ' + FOR[m.s];
  V['g2-aud-tf'] = (q, m) => tfOk(q, AUD[m.who] === m.said) ? '' : 'expected ' + (AUD[m.who] === m.said);
  /* ideas */
  V['g2-fit-topic'] = (q, m) => picks(q, o => FITS[m.topic].test(o)) ? '' : 'the ideas that fit are not the ones marked';
  V['g2-idea-out'] = (q, m) => { const off = q.tiles.map(text).filter(t => !FITS[m.topic].test(t)); return off.length === 1 && mk(q) === off[0] ? '' : 'expected the one idea off the topic'; };
  V['g2-idea-tf'] = (q, m) => tfOk(q, FITS[m.topic].test(m.idea)) ? '' : 'expected ' + FITS[m.topic].test(m.idea);
  V['g2-idea-more'] = (q, m) => one(q, o => FITS[m.topic].test(o)) ? '' : 'expected the one idea that fits';
  /* sources */
  V['g2-sources'] = q => picks(q, o => GOOD.test(o)) ? '' : 'the good sources are not the ones marked';
  V['g2-src-best'] = q => one(q, o => GOOD.test(o)) ? '' : 'expected the one good source';
  V['g2-src-tf'] = (q, m) => tfOk(q, GOOD.test(m.src)) ? '' : 'expected ' + GOOD.test(m.src);
  V['g2-src-count'] = q => mk(q) === 'three or more' ? '' : 'expected three or more';
  /* order */
  V['g2-order-plan'] = q => { const s = q.items.map(text); return PLANS.some(p => p.join('|') === s.join('|')) ? '' : 'the plan is not in a known right order'; };
  V['g2-sort-ideas'] = q => q.pairs.every(p => HEAD[text(p[0])] === text(p[1])) ? '' : 'an idea is under the wrong heading';
  V['g2-first-idea'] = q => one(q, o => firsts.has(o)) ? '' : 'expected the first idea';
  V['g2-order-how'] = (q, m) => mk(q) === HOW[m.form] ? '' : 'expected ' + HOW[m.form];
})();
