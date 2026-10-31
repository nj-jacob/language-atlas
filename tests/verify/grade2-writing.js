/* Grade 2 answer checks: writing and publishing (grade2/chapters/writing.js). Point of view is worked out from the words; the rest from the checker's own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const first = s => /\b(I|we|We|my|My|our|Our)\b/.test(s);
  const VOICED = /fluffy dog|warm sand|spicy soup|fat snowflakes/;
  const DESC = new Set(['fluffy', 'crunchy', 'huge', 'bright']);
  const OFF = { 'My dog Biscuit': 'My aunt lives in Regina.', 'Making a snowman': 'Summer is my favourite season.', 'Our class garden': 'My brother plays the drums.' };
  const ADD = { 'My dog Biscuit': 'He sleeps at the end of my bed.', 'Making a snowman': 'Last, we gave him a carrot nose.', 'Our class garden': 'In September we picked the beans.' };
  const FIX = { 'my cat is black.': ['my', 'My cat is black.', 'capital'], 'We drove to london.': ['london.', 'We drove to London.', 'capital'], 'Where is my hat.': ['hat.', 'Where is my hat?', 'end mark'],
    'I like to swim': ['swim', 'I like to swim.', 'end mark'], 'We had fun at the parck.': ['parck.', 'We had fun at the park.', 'spelling'], 'I sed thank you.': ['sed', 'I said thank you.', 'spelling'],
    'ava has a red bike.': ['ava', 'Ava has a red bike.', 'capital'] };

  V['g2-pov'] = (q, m) => q.answer === (first(m.s) ? 0 : 1) ? '' : 'expected ' + (first(m.s) ? 'first person' : 'someone else');
  V['g2-pov-pick'] = q => H.sameSet(q.options.map((o, i) => (first(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the first-person sentences are not the ones marked';
  V['g2-voice-w'] = q => VOICED.test(mk(q)) ? '' : 'expected the sentence with voice';
  V['g2-describe'] = (q, m) => DESC.has(mk(q)) && mk(q) === m.w ? '' : 'expected the describing word';
  V['g2-no-belong'] = (q, m) => mk(q) === OFF[m.topic] ? '' : 'expected ' + OFF[m.topic];
  V['g2-add-one'] = (q, m) => mk(q) === ADD[m.topic] ? '' : 'expected ' + ADD[m.topic];
  V['g2-find-err'] = (q, m) => mk(q) === FIX[m.s][0] ? '' : 'expected ' + FIX[m.s][0];
  V['g2-fix-err'] = (q, m) => mk(q) === FIX[m.s][1] ? '' : 'expected ' + FIX[m.s][1];
  V['g2-err-kind'] = (q, m) => mk(q) === FIX[m.s][2] ? '' : 'expected ' + FIX[m.s][2];
})();
