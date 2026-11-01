/* Grade 2 answer checks: reading smoothly (grade2/chapters/fluency.js). Worked out from the sentence's own marks and words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q);
  const SAY = { '.': 'Stop.', '?': 'Voice goes up.', '!': 'Strong voice.' };
  const ASK = /^(Can|Is|Who|Where|Do|Did|What)\b/, STRONG = /^(Wow|Hooray|Our team won)/;
  /* a phrase break never comes right after these: they belong with the next word */
  const GLUE = new Set('the a my to in little brown tall pine red big old'.split(' '));
  const FEEL = { happy: /puppy|Grandma is here|sunny days|won the game/, sad: /balloon|ruined|lost my|moved away/, sleepy: /eyes open|Time for bed|nap|cosy/,
    scared: /noise|so dark|thunder|under my bed/, excited: /beach|parade|birthday|first snow/ };
  const VOICE = { happy: 'bright and bouncy', sad: 'slow and soft', sleepy: 'slow, with a yawn', scared: 'quiet and shaky', excited: 'fast and loud' };
  const feelOf = s => Object.keys(FEEL).find(f => FEEL[f].test(s));
  const GOOD = new Set(['Read the sentence again after a hard word.', 'Read in phrases, not word by word.', 'Pause at a comma.', 'Let your voice go up at a question mark.']);
  const smooth = s => s.split(' / ').every(part => !GLUE.has(part.split(' ').pop().toLowerCase()));
  const STEPS = ['Sound out the new word.', 'Say the word again, faster.', 'Read the whole sentence again, smoothly.'];

  V['g2-voice'] = (q, m) => mk(q) === SAY[m.s.slice(-1)] ? '' : 'expected ' + SAY[m.s.slice(-1)];
  V['g2-need-mark'] = (q, m) => mk(q) === (ASK.test(m.s) ? '?' : STRONG.test(m.s) ? '!' : '.') ? '' : 'the wrong end mark is marked for "' + m.s + '"';
  V['g2-pause'] = q => /,$/.test(mk(q) || '') ? '' : 'expected the word with the comma';
  V['g2-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the only smooth way'; };
  V['g2-reread'] = q => q.items.map(text).join('|') === STEPS.join('|') ? '' : 'the steps are out of order';
  V['g2-reread-tf'] = (q, m) => (/read the sentence again/.test(m.said) === q.answer) && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g2-feeling'] = (q, m) => FEEL[mk(q)] && FEEL[mk(q)].test(m.s) ? '' : 'the feeling does not fit "' + m.s + '"';
  V['g2-mark-tf'] = (q, m) => { const yes = SAY[m.s.slice(-1)] === m.said; return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-which-voice'] = (q, m) => { const ok = q.options.map(text).filter(o => o.slice(-1) === m.want); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence ending with ' + m.want; };
  V['g2-match-voice'] = q => q.pairs.every(p => SAY[text(p[0]).slice(-1)] === text(p[1])) ? '' : 'a sentence is matched to the wrong voice';
  V['g2-phrase-order'] = q => { const s = q.items.map(text); return /^[A-Z]/.test(s[0]) && /\.$/.test(s[s.length - 1]) && s.slice(0, -1).every(x => !/\.$/.test(x)) && s.slice(1).every(x => !/,$/.test(x)) ? '' : 'the phrases are not in order'; };
  V['g2-phrase-tf'] = (q, m) => { const yes = smooth(text(m.said)); return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-next-step'] = (q, m) => mk(q) === STEPS[m.i + 1] ? '' : 'expected ' + STEPS[m.i + 1];
  V['g2-habits'] = q => H.sameSet(q.options.map((o, i) => (GOOD.has(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the smooth-reader habits are not the ones marked';
  V['g2-voice-for'] = (q, m) => mk(q) === VOICE[feelOf(m.s)] ? '' : 'expected ' + VOICE[feelOf(m.s)];
  V['g2-feel-tf'] = (q, m) => { const yes = feelOf(m.s) === m.said; return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-match-feel'] = q => q.pairs.every(p => feelOf(text(p[0])) === text(p[1])) ? '' : 'a line is matched to the wrong feeling';
})();
