/* Grade 5 answer checks: writing and publishing (grade5/chapters/writing.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const TONE = { 'a letter to the mayor': /^I am writing to ask/, 'a funny story for your friends': /queen of the kitchen/, 'a report on wetlands': /^Wetlands filter/, 'a thank-you card to your coach': /^Thank you for cheering/ };
  V['g5-tone'] = (q, m) => TONE[m.form].test(mk(q)) ? '' : 'expected the line that fits ' + m.form;
  /* a personal voice shows the writer's feelings */
  V['g5-voice-w'] = q => { const ok = q.options.map(text).filter(o => /\b(favourite|hated|loved|grinning|brain felt)\b/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one with a personal voice'; };
  const ONESIDED = /\b(Only|nobody|everyone|only|worst)\b/;
  V['g5-fair'] = q => { const ok = q.options.map(text).filter(o => !ONESIDED.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the fairer sentence'; };
  V['g5-bias-tf'] = (q, m) => ONESIDED.test(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g5-pov-w'] = (q, m) => mk(q) === (/^(I|We|My|Our)\b/.test(m.s) ? 'First person' : 'Third person') ? '' : 'wrong point of view for ' + m.s;
  const OFF = ['My school has a big gym.', 'My cousin likes video games.', 'I had pancakes for breakfast.'];
  V['g5-delete'] = q => OFF.includes(mk(q)) && text(q.fig).includes(mk(q)) ? '' : 'expected the off-topic sentence';
  const ADD = { "My grandmother's garden": 'pick tomatoes', 'Our trip to Algonquin Park': 'moose', 'Why we need a crosswalk': 'nearly hit' };
  V['g5-add'] = (q, m) => mk(q).includes(ADD[text(m.topic)]) ? '' : 'expected the detail about ' + m.topic;
  const STRONG = { good: 'delicious', big: 'enormous', said: 'shouted', bad: 'dreadful', walked: 'hurried' };
  V['g5-strong-word'] = (q, m) => { const w = text((m.s.match(/<b>(.*?)<\/b>/) || [])[1] || ''); return mk(q) === STRONG[w] ? '' : 'expected ' + STRONG[w]; };
  const FIX = { visted: 'visited', Their: "They're", "it's": 'its', me: 'I', runned: 'ran', recieved: 'received' };
  const errorIn = s => Object.keys(FIX).find(w => s.split(' ').map(x => x.replace(/\.$/, '')).includes(w));
  V['g5-find-error'] = (q, m) => mk(q) === errorIn(text(m.s)) ? '' : 'expected ' + errorIn(text(m.s));
  V['g5-fixed'] = (q, m) => { const s = text(m.s), e = errorIn(s); return mk(q) === s.replace(e, FIX[e]) ? '' : 'expected the edited sentence'; };
})();
