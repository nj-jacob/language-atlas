/* Grade 5 answer checks: media and online life (grade5/chapters/media.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* the responsible choice asks permission, or uses what you have permission to use */
  V['g5-permission'] = q => { const ok = q.options.map(text).filter(o => /\b(Ask|permission)\b/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the choice that asks permission'; };
  V['g5-private'] = q => H.sameSet(q.options.map((o, i) => /(address|password|birthday|phone number|school's name)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the private data are not the ones marked';
  const KIND = { 'I made bannock for the first time!': 'How did you make it', 'Here is my science fair project.': 'hardest part', 'I am learning to speak Tagalog.': 'teach me a word', 'Our team lost the final.': 'played hard' };
  V['g5-reply'] = (q, m) => mk(q).includes(KIND[m.post]) ? '' : 'expected the respectful reply';
  V['g5-footprint'] = (q, m) => /stay there/.test(m.said) === q.answer && text(q.why.options[q.why.answer]).startsWith('Posts can be copied') ? '' : 'true/false is wrong';
  const TECH = { 'Everyone at school has one. Do not be left out!': 'everyone is doing it', 'Hockey star Jada Moore drinks Zoom Juice!': 'a famous person', 'Only $9.99, but only for today!': 'hurry, it will run out',
    'Crunchy, munchy, Choco-Bunchy!': 'a catchy rhyme', '9 out of 10 kids love it!': 'a number that sounds impressive' };
  V['g5-technique'] = (q, m) => mk(q) === TECH[m.ad] ? '' : 'expected ' + TECH[m.ad];
  const AUD = { 'a cereal ad during a cartoon': ['children', 'to sell cereal'], 'a poster about a flu shot clinic': ['families', 'to inform about health'], 'a trailer for a new movie': ['people who might watch it', 'to get people to see the movie'],
    'a town sign about a park clean-up': ['neighbours', 'to get people to help'] };
  V['g5-media-audience'] = (q, m) => mk(q) === AUD[m.m][0] ? '' : 'expected ' + AUD[m.m][0];
  V['g5-media-purpose'] = (q, m) => mk(q) === AUD[m.m][1] ? '' : 'expected ' + AUD[m.m][1];
  V['g5-check'] = q => H.sameSet(q.options.map((o, i) => /^(See if trusted|Check who wrote|Look for facts)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good checks are not the ones marked';
})();
