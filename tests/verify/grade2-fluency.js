/* Grade 2 answer checks: reading smoothly (grade2/chapters/fluency.js). Worked out from the sentence's own marks and words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q);
  const SAY = { '.': 'Stop.', '?': 'Voice goes up.', '!': 'Strong voice.' };
  const ASK = /^(Can|Is|Who|Where|Do|Did|What)\b/, STRONG = /^(Wow|Our team won)/;
  /* a phrase break never comes right after these: they belong with the next word */
  const GLUE = new Set('the a my to in little brown tall pine'.split(' '));
  const FEEL = { happy: /puppy|beach|Grandma is here/, sad: /balloon|ruined|lost my/, sleepy: /eyes open|Time for bed|nap/ };
  const STEPS = ['Sound out the new word.', 'Say the word again, faster.', 'Read the whole sentence again, smoothly.'];

  V['g2-voice'] = (q, m) => mk(q) === SAY[m.s.slice(-1)] ? '' : 'expected ' + SAY[m.s.slice(-1)];
  V['g2-need-mark'] = (q, m) => mk(q) === (ASK.test(m.s) ? '?' : STRONG.test(m.s) ? '!' : '.') ? '' : 'the wrong end mark is marked for "' + m.s + '"';
  V['g2-pause'] = q => /,$/.test(mk(q) || '') ? '' : 'expected the word with the comma';
  V['g2-phrases'] = q => { const ok = q.options.map(text).filter(o => o.split(' / ').every(part => !GLUE.has(part.split(' ').pop().toLowerCase()))); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the only smooth way'; };
  V['g2-reread'] = q => q.items.map(text).join('|') === STEPS.join('|') ? '' : 'the steps are out of order';
  V['g2-reread-tf'] = (q, m) => (/read the sentence again/.test(m.said) === q.answer) && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g2-feeling'] = (q, m) => FEEL[mk(q)] && FEEL[mk(q)].test(m.s) ? '' : 'the feeling does not fit "' + m.s + '"';
})();
