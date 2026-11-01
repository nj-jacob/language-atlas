/* Grade 4 answer checks: reading smoothly (grade4/chapters/fluency.js). Own rules and keys, worked out from what the child sees. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  /* steps, numbers and science words need a slow pace; a story moment can be read at a talking pace */
  const steps = fig => /1\. [A-Z]/.test(text(fig)), facts = fig => /\d+ (m|kg|minutes|provinces)\b|sunlight, water and air/.test(text(fig)), slow = fig => steps(fig) || facts(fig);
  const PACE = f => slow(f) ? 'slowly and carefully' : 'at a talking pace';
  V['g4-pace'] = q => H.marked(q) === PACE(q.fig) ? '' : 'the pace marked does not fit the text';
  V['g4-pace-tf'] = (q, m) => (PACE(q.fig) === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for this text';
  V['g4-pace-why'] = q => { const mk = H.marked(q) || ''; return (steps(q.fig) ? /steps/.test(mk) : facts(q.fig) && /facts/.test(mk)) ? '' : 'the reason marked does not fit the text'; };
  V['g4-pace-sort'] = q => H.sameSet(q.options.map((o, i) => slow(o) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the slow texts are not the ones marked';
  const GOOD = /slow down|reread/i, BAD = /as fast as|like a robot|even when nothing|same speed|skip the hard/i;
  V['g4-pace-habit'] = (q, m) => { const good = GOOD.test(m.s) && !BAD.test(m.s); return good === q.answer && /change their pace/.test(text(q.why.options[q.why.answer])) ? '' : 'true/false is wrong for "' + m.s + '"'; };
  const GLUE = new Set('the a my our to of in when after before if tall we you'.split(' '));
  const smooth = o => o.split(' / ').every((ph, i, all) => i === all.length - 1 || !GLUE.has(ph.split(' ').pop().toLowerCase()));
  V['g4-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'smooth options: ' + ok.join(' | '); };
  V['g4-phrase-tf'] = (q, m) => smooth(m.shown) === q.answer && text(q.fig) === m.shown && q.why.answer === 0 ? '' : 'true/false is wrong for "' + m.shown + '"';
  const SENTS = ['After the storm, branches covered our trail.', 'My cousin in Iqaluit sent us a photo of the northern lights.', 'The tall corn gives the beans a pole to climb.', 'If you finish early, read a book quietly.',
    'On the first day of spring, the geese flew home.', 'Under the old dock, a family of ducks made a nest.', 'The moose stepped slowly into the cold lake.', 'My friend Sofia plays the violin in the school band.',
    'As the sun went down, the loons began to call.'];
  V['g4-phrase-order'] = q => SENTS.includes(q.items.map(text).join(' ')) ? '' : 'the phrases do not make the sentence in this order';
  V['g4-pause'] = q => { const t = q.tiles.map(text), c = t.filter(w => w.endsWith(',')); return c.length === 1 && t[q.answer] === c[0] ? '' : 'the word before the comma is not the one marked'; };
  const VOICE = { 'a news report': 'clear and steady', 'a scary story': 'slow and quiet', 'a poem': 'rhythm', 'a speech asking for a change': 'strong and sure', 'steps for an experiment': 'pause after each step', 'a joke': 'funny part',
    'a letter from a friend': 'warm and friendly', 'a sports announcement': 'loud and excited' };
  /* the kind of text, from what it says */
  const kind = s => /^1\. /.test(s) ? 'steps for an experiment' : / \/ /.test(s) ? 'a poem' : /^(Dear|Hi) /.test(s) ? 'a letter from a friend' : /\?.*!$/.test(s) && /^(Why|What)/.test(s) ? 'a joke'
    : /scores|crosses the line/.test(s) ? 'a sports announcement' : /Please help|Let.s plant/.test(s) ? 'a speech asking for a change' : /creaked|in the dark/.test(s) ? 'a scary story' : /today|on Monday/.test(s) ? 'a news report' : null;
  V['g4-voice-for'] = (q, m) => (H.marked(q) || '').includes(VOICE[m.p]) && q.options.filter(o => text(o).includes(VOICE[m.p])).length === 1 ? '' : 'expected the voice for ' + m.p;
  V['g4-voice-tf'] = (q, m) => text(m.said).includes(VOICE[m.p]) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.p;
  V['g4-voice-text'] = (q, m) => { const k = kind(text(m.s)); return k && (H.marked(q) || '').includes(VOICE[k]) && H.has(q.fig, text(m.s).slice(0, 10)) ? '' : 'expected the voice for ' + k; };
  V['g4-match-voice'] = q => q.pairs.every(p => text(p[1]).includes(VOICE[text(p[0])])) ? '' : 'a text is matched to the wrong voice';
  /* stress the word that the "not ..." is about: not the red ones -> a colour; not the hat -> the thing; not your brother -> the person */
  const STRESS = { 'not the red ones': 'blue', 'not the hat': 'mitts', 'not your brother': 'you', 'not at eight': 'seven', 'not tomorrow': 'tonight', 'not three': 'two', 'not dogs': 'cats', 'not Omar': 'Mei', 'not the small one': 'big', 'not Ana': 'Jun', 'not the skates': 'sled' };
  V['g4-stress'] = (q, m) => H.marked(q) === STRESS[m.mean] && m.s.split(' ').map(w => w.replace(/[.?]/, '')).includes(STRESS[m.mean]) ? '' : 'expected ' + STRESS[m.mean];
  const up = s => s.endsWith('?') && /^(Are|Is|Did|Do|Can)\b/.test(s);
  V['g4-rise'] = (q, m) => H.marked(q) === (up(m.s) ? 'up' : 'down') ? '' : 'the voice direction is wrong for "' + m.s + '"';
  V['g4-rise-sort'] = q => H.sameSet(q.options.map((o, i) => up(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the rising sentences are not the ones marked';
  V['g4-stress-mean'] = (q, m) => STRESS[H.marked(q)] === m.w && H.has(q.fig, m.w.toUpperCase()) ? '' : 'expected the meaning that goes with ' + m.w;
})();
