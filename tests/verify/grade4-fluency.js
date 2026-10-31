/* Grade 4 answer checks: reading smoothly (grade4/chapters/fluency.js). Own rules and keys, worked out from what the child sees. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  /* steps, numbers and science words need a slow pace; a story moment can be read at a talking pace */
  const slow = fig => /1\. |\d+ (m|kg)\b|sunlight, water and air/.test(text(fig));
  V['g4-pace'] = q => H.marked(q) === (slow(q.fig) ? 'slowly and carefully' : 'at a talking pace') ? '' : 'the pace marked does not fit the text';
  const GOOD = /slow down|reread/i, BAD = /as fast as|like a robot|even when nothing/i;
  V['g4-pace-habit'] = (q, m) => { const good = GOOD.test(m.s) && !BAD.test(m.s); return good === q.answer && /change their pace/.test(text(q.why.options[q.why.answer])) ? '' : 'true/false is wrong for "' + m.s + '"'; };
  const GLUE = new Set('the a my our to of in when after before if tall we you'.split(' '));
  const smooth = o => o.split(' / ').every((ph, i, all) => i === all.length - 1 || !GLUE.has(ph.split(' ').pop().toLowerCase()));
  V['g4-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'smooth options: ' + ok.join(' | '); };
  V['g4-pause'] = q => { const t = q.tiles.map(text), c = t.filter(w => w.endsWith(',')); return c.length === 1 && t[q.answer] === c[0] ? '' : 'the word before the comma is not the one marked'; };
  const VOICE = { 'a news report': 'clear and steady', 'a scary story': 'slow and quiet', 'a poem': 'rhythm', 'a speech asking for a change': 'strong and sure', 'steps for an experiment': 'pause after each step', 'a joke': 'funny part' };
  V['g4-voice-for'] = (q, m) => (H.marked(q) || '').includes(VOICE[m.p]) && q.options.filter(o => text(o).includes(VOICE[m.p])).length === 1 ? '' : 'expected the voice for ' + m.p;
  V['g4-match-voice'] = q => q.pairs.every(p => text(p[1]).includes(VOICE[text(p[0])])) ? '' : 'a text is matched to the wrong voice';
  /* stress the word that the "not ..." is about: not the red ones -> a colour; not the hat -> the thing; not your brother -> the person */
  const STRESS = { 'not the red ones': 'blue', 'not the hat': 'mitts', 'not your brother': 'you', 'not at eight': 'seven', 'not tomorrow': 'tonight', 'not three': 'two', 'not dogs': 'cats', 'not Omar': 'Mei' };
  V['g4-stress'] = (q, m) => H.marked(q) === STRESS[m.mean] && m.s.split(' ').map(w => w.replace(/[.?]/, '')).includes(STRESS[m.mean]) ? '' : 'expected ' + STRESS[m.mean];
  V['g4-rise'] = (q, m) => H.marked(q) === (m.s.endsWith('?') && /^(Are|Is|Did|Do|Can)\b/.test(m.s) ? 'up' : 'down') ? '' : 'the voice direction is wrong for "' + m.s + '"';
})();
