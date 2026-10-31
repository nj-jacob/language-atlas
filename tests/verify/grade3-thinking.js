/* Grade 3 answer checks: thinking about texts (grade3/chapters/thinking.js). Own key lists, and checks worked out from the text. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/\u2019/g, "'"), mk = q => text(H.marked(q) || '');
  const JOB = { heading: 'one part', index: 'find the page', caption: 'about a picture', label: 'names a part', title: 'whole text', diagram: 'shows the parts' };
  const METAPHORS = new Set(['The moon is a lamp above the lake.', 'The wind is a whisper in the pines.', 'My brother is a rocket on his bike.', 'The snow is a white blanket on the field.', 'Her laugh is music.']);
  const ASSONANCE = new Set(['The stars glow slow over the snow.', 'I sleep deep and dream.', 'The cat sat at the back of the van.', 'Light the kite at night.']);
  const VIVID = /hungry dog gobbled|icy wind nipped|tiny robin|zoomed down|sparkled like glass/;
  /* what each topic's section must mention */
  const TOPIC = { lodges: 'lodges', 'chewing wood': 'Chewing wood', 'swimming under the ice': 'under the ice', 'who made syrup first': 'first to make', 'how sap starts to flow': 'sap flow', 'turning sap into syrup': 'boiled' };
  const INFER = { 'How does Leila feel at the end?': ['happy', 'grinned'], 'How does Leila feel when she stops at the corner?': ['upset', 'she cried'],
    'How does the narrator feel at the start?': ['nervous', 'paddle tight'], 'How does the narrator feel about canoeing now?': ['excited to go again', 'wait to go again'] };
  const CAUSE = { 'A beaver chews wood.': 'Its teeth stay short.', 'Beavers store branches in the fall.': 'They have food in winter.', 'Days are warm and nights are cold.': 'Sap flows inside maple trees.', 'Sap is boiled for a long time.': 'Sweet syrup is left.' };
  const cards = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return [...d.querySelectorAll('.psg')].map(p => [...p.childNodes].map(n => text(n.innerHTML || n.textContent))); };

  V['g3-feature'] = (q, m) => mk(q).includes(JOB[m.f]) && q.options.map(text).filter(o => o.includes(JOB[m.f])).length === 1 ? '' : 'expected the job of a ' + m.f;
  V['g3-match-features'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a feature is matched to the wrong job';
  V['g3-heading'] = (q, m) => { const c = cards(q)[0], h = c.indexOf(mk(q)); return h > 0 && (c[h + 1] || '').includes(TOPIC[m.topic]) ? '' : 'the part under "' + mk(q) + '" is not about ' + m.topic; };
  V['g3-cause'] = q => q.pairs.every(p => CAUSE[text(p[0])] === text(p[1])) ? '' : 'a cause is matched to the wrong effect';
  V['g3-metaphor'] = q => { const ok = q.options.map(text).filter(o => METAPHORS.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the metaphor'; };
  V['g3-assonance'] = q => { const ok = q.options.map(text).filter(o => ASSONANCE.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the line with assonance'; };
  V['g3-picture'] = q => VIVID.test(mk(q)) && q.options.map(text).filter(o => VIVID.test(o)).length === 1 ? '' : 'expected the sentence with strong words';
  V['g3-pattern'] = q => { const all = cards(q)[0].join(' ').toLowerCase().replace(/[,.!]/g, '').split(' '), n = w => all.filter(x => x === w).length, w = mk(q).toLowerCase(), most = Math.max(...q.tiles.map(t => n(text(t).toLowerCase())));
    return n(w) >= 3 && n(w) === most && q.tiles.map(text).filter(t => n(t.toLowerCase()) === most).length === 1 ? '' : 'the word that repeats most is not the one marked'; };
  V['g3-infer'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q) === k[0] && H.has(q.fig, k[1].replace("'", '’')) ? '' : 'expected ' + (k && k[0]); };
  V['g3-evidence'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q).includes(k[1]) ? '' : 'expected the words "' + (k && k[1]) + '"'; };
  V['g3-compare'] = q => { const c = cards(q), inBoth = s => c.length === 2 && c.every(x => x.includes(s)), ok = q.options.map(text).filter(inBoth); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence in both cards'; };
  V['g3-perspective'] = q => mk(q) === 'The park needs a skating rink.' && H.has(q.fig, 'Please build a skating rink') ? '' : 'expected what Priya asks for';
})();
