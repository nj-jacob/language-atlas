/* Grade 2 answer checks: planning writing (grade2/chapters/planning.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const FORM = { 'to tell about something that happened to you': 'a true story about me', 'to get someone to agree with you': 'an opinion piece', 'to tell someone how to do something': 'how-to steps',
    'to give facts about frogs': 'a fact book', 'to thank Grandma for a gift': 'a thank-you card' };
  const AUD = { 'your little cousin, who is four': 'short words and big pictures', 'your teacher': 'neat writing and full sentences', 'your best friend': 'a friendly, chatty voice' };
  const TOPIC_OF = { goats: 'a day at the farm', 'push in a seed': 'how to plant a seed', 'best pets': 'why dogs make the best pets' };
  const FITS = { 'My birthday party': /cake|games|gift/, 'All about frogs': /frogs eat|tadpoles|frogs live/, 'Winter fun': /sledding|snow fort|skating/ };
  const GOOD = /^(a library book|a website from a nature centre|a scientist|a video from a science museum)/;
  const ORDERS = ['We drove to the lake.|We set up our tent.|We swam until supper.|We roasted marshmallows.', 'Get two slices of bread.|Spread on the sunflower butter.|Put the slices together.|Cut it in half.'];
  const HEAD = { 'eats flies': 'Food', 'eats worms': 'Food', 'lives near a pond': 'Home', 'hides under logs': 'Home', 'has long back legs': 'Body', 'has wet, smooth skin': 'Body' };
  const picks = (q, fits) => H.sameSet(q.options.map((o, i) => (fits(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);

  V['g2-form-for'] = (q, m) => mk(q) === FORM[m.why] ? '' : 'expected ' + FORM[m.why];
  V['g2-match-form'] = q => q.pairs.every(p => FORM[text(p[0])] === text(p[1])) ? '' : 'a purpose is matched to the wrong form';
  V['g2-audience'] = (q, m) => mk(q) === AUD[m.who] ? '' : 'expected ' + AUD[m.who];
  V['g2-topic-of'] = (q, m) => { const k = Object.keys(TOPIC_OF).find(w => m.s.includes(w)); return mk(q) === TOPIC_OF[k] ? '' : 'expected ' + TOPIC_OF[k]; };
  V['g2-fit-topic'] = (q, m) => picks(q, o => FITS[m.topic].test(o)) ? '' : 'the ideas that fit are not the ones marked';
  V['g2-sources'] = q => picks(q, o => GOOD.test(o)) ? '' : 'the good sources are not the ones marked';
  V['g2-order-plan'] = q => ORDERS.includes(q.items.map(text).join('|')) ? '' : 'the plan is not in a known right order';
  V['g2-sort-ideas'] = q => q.pairs.every(p => HEAD[text(p[0])] === text(p[1])) ? '' : 'an idea is under the wrong heading';
})();
