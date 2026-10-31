/* Grade 1 answer checks: planning writing (grade1/chapters/planning.js). The checker keeps its own answer key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const JOB = { 'a birthday card for Grandma': ['Grandma', 'to say happy birthday'], 'a thank-you note to your teacher': ['your teacher', 'to say thank you'],
    'a sign for your lemonade stand': ['people walking by', 'to get people to buy'], 'the steps to make a paper boat': ['a friend who wants to make one', 'to tell how to do something'],
    'a story about your dog': ['your class', 'to share a story'], 'a list of facts about owls': ['kids who want to learn', 'to share facts'] };
  const FITS = { 'My weekend': /park|pancakes|cousin/, Owls: /^Owls/, Winter: /Snow|skating|short/, 'My family': /brothers|nurse|Punjabi/ };
  const SOURCE = { owls: 'a library book about owls', 'the planets': 'a book about space', 'maple trees': 'a book about trees', 'how bees make honey': 'a video about bees from a nature centre' };
  const STEPS = { 'Brushing your teeth': ['toothpaste', 'Brush', 'Spit'], 'Making a snowman': ['big ball', 'smaller', 'eyes'], 'Planting a seed': ['Fill', 'Push', 'Water'], 'Washing your hands': ['Wet', 'soap', 'Rinse'] };
  V['g1-who-for'] = (q, m) => mk(q) === JOB[m.job][0] ? '' : 'expected ' + JOB[m.job][0];
  V['g1-why-write'] = (q, m) => mk(q) === JOB[m.job][1] ? '' : 'expected ' + JOB[m.job][1];
  V['g1-match-why'] = q => q.pairs.every(p => (JOB[text(p[0])] || [])[1] === text(p[1])) ? '' : 'a piece of writing is matched to the wrong purpose';
  V['g1-idea-fits'] = (q, m) => { const ok = q.options.map(text).filter(o => FITS[m.topic].test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the idea about ' + m.topic; };
  V['g1-pick-ideas'] = (q, m) => H.sameSet(q.options.map((o, i) => FITS[m.topic].test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ideas on the topic are not the ones marked';
  V['g1-topic-of'] = (q, m) => { const d = document.createElement('div'); d.innerHTML = q.fig; const ideas = [...d.querySelectorAll('.sent')].map(x => text(x.innerHTML));
    return ideas.every(i => FITS[mk(q)] && FITS[mk(q)].test(i)) && mk(q) === m.topic ? '' : 'expected ' + m.topic; };
  V['g1-source'] = (q, m) => mk(q) === SOURCE[m.topic] ? '' : 'expected ' + SOURCE[m.topic];
  V['g1-order-steps'] = (q, m) => q.items.map(text).every((t, i) => t.includes(STEPS[m.h][i])) ? '' : 'the steps are not in order';
})();
