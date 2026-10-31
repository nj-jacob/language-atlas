/* Grade 3 answer checks: planning writing (grade3/chapters/planning.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const FORM = { 'to tell how to make something': 'instructions', 'to share your opinion with the mayor': 'a letter', 'to tell a made-up adventure': 'a story', 'to give facts about an animal': 'a report', 'to share a feeling in a few lines': 'a poem' };
  const AUD = { 'a kindergarten class': 'short sentences and big pictures', 'the principal': 'polite, careful sentences', 'your best friend': 'a friendly, chatty voice' };
  const FITS = { 'My favourite season: winter': /snow fort|skating|cocoa/, 'A report on beavers': /beavers/, 'A day at the farm': /goats|eggs|tractor/ };
  const GOODSRC = /^(a library book|a website from a nature centre|a park ranger|a video from a science museum)/;
  const HEAD = { 'eats leaves and bark': 'Food', 'chews on twigs': 'Food', 'lives in a lodge': 'Home', 'builds a dam on the creek': 'Home', 'has a flat tail': 'Body', 'has orange front teeth': 'Body' };
  const ORDERS = [['Pick a topic.', 'Write down ideas.', 'Put the ideas in order.', 'Write the first draft.'], ['Wash the apple.', 'Cut it into slices.', 'Put the slices on a plate.', 'Share them with a friend.']];
  const picks = (q, fits) => H.sameSet(q.options.map((o, i) => fits(text(o)) ? i : -1).filter(i => i >= 0), q.answer);

  V['g3-form-for'] = (q, m) => mk(q) === FORM[m.why] ? '' : 'expected ' + FORM[m.why];
  V['g3-match-purpose'] = q => q.pairs.every(p => FORM[text(p[0])] === text(p[1])) ? '' : 'a purpose is matched to the wrong form';
  V['g3-audience'] = (q, m) => mk(q) === AUD[m.who] ? '' : 'expected ' + AUD[m.who];
  V['g3-form-tf'] = (q, m) => (FORM[m.why] === m.said) === q.answer ? '' : 'true/false is wrong';
  V['g3-fit-topic'] = (q, m) => picks(q, o => FITS[m.topic].test(o)) ? '' : 'the ideas that fit are not the ones marked';
  V['g3-sources'] = q => picks(q, o => GOODSRC.test(o)) ? '' : 'the good sources are not the ones marked';
  V['g3-order-steps'] = q => { const s = q.items.map(text); return ORDERS.some(o => o.join('|') === s.join('|')) ? '' : 'the steps are not in a known right order'; };
  V['g3-sort-ideas'] = q => q.pairs.every(p => HEAD[text(p[0])] === text(p[1])) ? '' : 'an idea is under the wrong heading';
})();
