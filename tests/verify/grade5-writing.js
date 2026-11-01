/* Grade 5 answer checks: writing and publishing (grade5/chapters/writing.js). The checker keeps its own key, like a second marker. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  /* tone: the line that fits each form */
  const TONE = { 'a letter to the mayor': /^I am writing to ask/, 'a funny story for your friends': /queen of the kitchen/, 'a report on wetlands': /^Wetlands filter/, 'a thank-you card to your coach': /^Thank you for cheering/,
    'an invitation to your class party': /^Please join us/, 'a scary story': /creaked open/, 'steps for a science experiment': /^Pour 100 mL/, 'a get-well card to your grandmother': /^I hope you feel better/,
    'a speech to the school council': /^Thank you for listening/, 'a poem about autumn': /quiet sparks/ };
  const formOf = line => Object.keys(TONE).find(f => TONE[f].test(line));
  V['g5-tone'] = (q, m) => TONE[m.form].test(mk(q)) ? '' : 'expected the line that fits ' + m.form;
  V['g5-tone-tf'] = (q, m) => { const right = TONE[m.form].test(text(m.line)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-match-tone'] = q => q.pairs.every(p => formOf(text(p[0])) === text(p[1])) ? '' : 'a line is matched to the wrong form';
  /* a personal voice shows the writer's feelings */
  V['g5-voice-w'] = q => { const ok = q.options.map(text).filter(o => /\b(favourite|hated|loved|grinning|brain felt|heart hammered|best thing|felt like|could not wait)\b/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one with a personal voice'; };
  /* one-sided words shut out other views */
  const ONESIDED = /\b(only|nobody|everyone|worst)\b/i;
  V['g5-fair'] = q => { const ok = q.options.map(text).filter(o => !ONESIDED.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the fairer sentence'; };
  V['g5-bias-tf'] = (q, m) => ONESIDED.test(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g5-reader-feel'] = (q, m) => mk(q).includes(ONESIDED.test(text(m.s)) ? 'left out' : 'respected') ? '' : 'expected how a reader would feel about ' + m.s;
  V['g5-pov-w'] = (q, m) => mk(q) === (/^(I|We|My|Our)\b/.test(m.s) ? 'First person' : 'Third person') ? '' : 'wrong point of view for ' + m.s;
  /* revising: the sentence that is off topic, and the detail to add, for each paragraph */
  const OFF = ['My school has a big gym.', 'My cousin likes video games.', 'I had pancakes for breakfast.', 'The library has new computers.', 'My uncle drives a truck.', 'My favourite colour is blue.'];
  V['g5-delete'] = q => OFF.includes(mk(q)) && text(q.fig).includes(mk(q)) ? '' : 'expected the off-topic sentence';
  V['g5-revise-tf'] = (q, m) => { const right = OFF.includes(text(m.cut)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const ADD = { "My grandmother's garden": 'pick tomatoes', 'Our trip to Algonquin Park': 'moose', 'Why we need a crosswalk': 'nearly hit', 'Our class pet, Biscuit the rabbit': 'thumps',
    'The first snow of winter': 'snowflakes', 'Why our school should have a garden': 'exercise' };
  V['g5-add'] = (q, m) => mk(q).includes(ADD[text(m.topic)]) ? '' : 'expected the detail about ' + m.topic;
  const STRONG = { good: 'delicious', big: 'enormous', said: 'shouted', bad: 'dreadful', walked: 'hurried', strong: 'fierce', ate: 'gobbled', dirty: 'filthy', looked: 'gazed', nice: 'scrumptious' };
  V['g5-strong-word'] = (q, m) => { const w = text((m.s.match(/<b>(.*?)<\/b>/) || [])[1] || ''); return mk(q) === STRONG[w] ? '' : 'expected ' + STRONG[w]; };
  /* editing: each mistake, its fix and its kind */
  const FIX = { visted: ['visited', 'spelling'], recieved: ['received', 'spelling'], freind: ['friend', 'spelling'], becuase: ['because', 'spelling'], runned: ['ran', 'verb form'], was: ['were', 'verb form'],
    seen: ['saw', 'verb form'], Their: ["They're", 'sound-alike'], "it's": ['its', 'sound-alike'], too: ['to', 'sound-alike'], me: ['I', 'pronoun'], Her: ['She', 'pronoun'] };
  const errorIn = s => Object.keys(FIX).find(w => s.split(' ').map(x => x.replace(/\.$/, '')).includes(w));
  V['g5-find-error'] = (q, m) => mk(q) === errorIn(text(m.s)) ? '' : 'expected ' + errorIn(text(m.s));
  V['g5-fixed'] = (q, m) => { const s = text(m.s), e = errorIn(s); return mk(q) === s.replace(e, FIX[e][0]) ? '' : 'expected the edited sentence'; };
  V['g5-error-kind'] = (q, m) => { const e = errorIn(text(m.s)); return mk(q).includes(FIX[e][1]) ? '' : 'expected ' + FIX[e][1]; };
  V['g5-edit-tf'] = (q, m) => { const right = !errorIn(text(m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
