/* Grade 1 answer checks: planning writing (grade1/chapters/planning.js). The checker keeps its own answer key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const JOB = { 'a birthday card for Grandma': ['Grandma', 'to say happy birthday'], 'a thank-you note to your teacher': ['your teacher', 'to say thank you'],
    'a sign for your lemonade stand': ['people walking by', 'to get people to buy'], 'the steps to make a paper boat': ['a friend who wants to make one', 'to tell how to do something'],
    'a story about your dog': ['your class', 'to share a story'], 'a list of facts about owls': ['kids who want to learn', 'to share facts'],
    'an invitation to your party': ['your friends', 'to invite people'], 'a get-well card for your cousin': ['your cousin', 'to help someone feel better'],
    'a label for the class fish tank': ['visitors to your classroom', 'to tell what something is'], 'a poem about the first snow': ['your family', 'to share a feeling'],
    'a note to remind Dad to buy milk': ['Dad', 'to remind someone'], 'a grocery list': ['whoever does the shopping', 'to remember what to buy'] };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const FITS = { 'My weekend': /park|pancakes|cousin/, Owls: /^Owls/, Winter: /Snow|skating|short/, 'My family': /brothers|nurse|Punjabi/, Frogs: /Frogs lay|Tadpoles|tongues/,
    'My school': /teacher|recess|class has/, Summer: /swim|hot|outside/, 'Our garden': /beans|Worms|water the/ };
  const SOURCE = { owls: 'a library book about owls', 'the planets': 'a book about space', 'maple trees': 'a book about trees', 'how bees make honey': 'a video about bees from a nature centre',
    beavers: 'a book about Canadian animals', 'the weather': 'a weather report', frogs: 'a book about ponds', 'how canoes are made': 'an Elder who builds canoes' };
  const STEPS = { 'Brushing your teeth': ['toothpaste', 'Brush', 'Spit'], 'Making a snowman': ['big ball', 'smaller', 'eyes'], 'Planting a seed': ['Fill', 'Push', 'Water'], 'Washing your hands': ['Wet', 'soap', 'Rinse'],
    'Making toast': ['bread', 'lever', 'butter'], 'Getting ready for snow': ['pants', 'boots', 'mitts'], 'Feeding a cat': ['Get', 'Fill', 'floor'], 'Sending a letter': ['Write', 'envelope', 'mailbox'],
    'Making a sandwich': ['Lay', 'cheese', 'top'], 'Reading a book': ['cover', 'page', 'liked'] };
  const at = (h, t) => STEPS[h].findIndex(w => t.includes(w));
  V['g1-who-for'] = (q, m) => mk(q) === JOB[m.job][0] ? '' : 'expected ' + JOB[m.job][0];
  V['g1-why-write'] = (q, m) => mk(q) === JOB[m.job][1] ? '' : 'expected ' + JOB[m.job][1];
  V['g1-match-why'] = q => q.pairs.every(p => (JOB[text(p[0])] || [])[1] === text(p[1])) ? '' : 'a piece of writing is matched to the wrong purpose';
  V['g1-idea-fits'] = (q, m) => { const ok = q.options.map(text).filter(o => FITS[m.topic].test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the idea about ' + m.topic; };
  V['g1-pick-ideas'] = (q, m) => H.sameSet(q.options.map((o, i) => FITS[m.topic].test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ideas on the topic are not the ones marked';
  V['g1-topic-of'] = (q, m) => { const d = document.createElement('div'); d.innerHTML = q.fig; const ideas = [...d.querySelectorAll('.sent')].map(x => text(x.innerHTML));
    return ideas.every(i => FITS[mk(q)] && FITS[mk(q)].test(i)) && mk(q) === m.topic ? '' : 'expected ' + m.topic; };
  V['g1-source'] = (q, m) => mk(q) === SOURCE[m.topic] ? '' : 'expected ' + SOURCE[m.topic];
  V['g1-order-steps'] = (q, m) => q.items.map(text).every((t, i) => t.includes(STEPS[m.h][i])) ? '' : 'the steps are not in order';
  V['g1-write-why-tf'] = (q, m) => { const right = JOB[m.job][1] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-idea-tf'] = (q, m) => { const right = FITS[m.topic].test(m.idea); return text(q.fig) === m.idea && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-first-step'] = (q, m) => { const want = m.last ? 2 : 0, ok = q.options.map(text).filter(o => at(m.h, o) === want); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected step ' + (want + 1); };
  V['g1-next-step'] = (q, m) => { const want = at(m.h, m.after) + 1; return want > 0 && at(m.h, mk(q)) === want ? '' : 'expected step ' + (want + 1); };
  V['g1-order-tf'] = (q, m) => { const right = m.shown.split('|').every((t, i) => at(m.h, t) === i); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
