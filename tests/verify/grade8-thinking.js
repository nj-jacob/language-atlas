/* Grade 8 answer checks: critical reading (grade8/chapters/thinking.js). Devices, cultural elements, bias and positions are authored, so
   the checker keeps its own answer key; inferences and order are checked against the passage on screen. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const IRONIC = [/fire station burned/, /as hail smashed/, /misspelled her own name/, /flashed and beeped/, /lifeguard had to be rescued/];
  const ironic = s => IRONIC.some(r => r.test(s));
  V['g8-irony'] = q => ironic(mk(q)) && q.options.map(text).filter(ironic).length === 1 ? '' : 'expected the ironic sentence';
  V['g8-irony-captain'] = q => /reader can easily see why/.test(mk(q)) && H.has(q.fig, "imagine why") ? '' : 'expected dramatic irony';
  V['g8-satire'] = q => /technology and fees/.test(mk(q)) ? '' : 'expected what the satire mocks';
  const ALL = { "Pandora's box": 'releasing troubles', 'David facing Goliath': 'small fighter', 'Midas touch': 'turned everything', "Achilles' heel": 'one weak spot', 'Rip Van Winkle': 'twenty years' };
  const allusionIn = s => Object.keys(ALL).find(k => s.includes(k));
  V['g8-allusion'] = (q, m) => { const a = allusionIn(text(m.s)); return a && mk(q).includes(ALL[a]) ? '' : 'expected the meaning of ' + a; };
  V['g8-which-allusion'] = q => allusionIn(mk(q)) && q.options.map(text).filter(allusionIn).length === 1 ? '' : 'expected the sentence with the allusion';
  V['g8-match-device'] = q => q.pairs.every(p => { const s = text(p[0]), d = text(p[1]); return d === (allusionIn(s) ? 'allusion' : ironic(s) ? 'irony' : /chewing report/.test(s) ? 'satire' : ''); }) ? '' : 'an example is matched to the wrong device';
  const INFER = { 'Why did the ramp lower again?': ['asked for the ferry to wait', 'spoke into his radio'], 'How does Amira feel at the end?': ['relieved and grateful', 'pressed a hand to her heart'],
    'What has probably happened in other springs?': ['flooded before', 'would finally convince the town'], 'Is the narrator really calm?': ['No.', 'kicked the water bottle'],
    'Why did the coach keep the narrator on the bench?': ['the way the narrator acted', 'For some reason'] };
  V['g8-infer'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q).includes(k[0]) && H.has(q.fig, k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g8-evidence'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q).includes(k[1]) && q.options.map(text).filter(o => o.includes(k[1])).length === 1 ? '' : 'expected the sentence with "' + (k && k[1]) + '"'; };
  /* a conclusion that uses never, every or no longer goes further than the text */
  const tooFar = s => /\b(never|every|Every|no longer|banned|always|does not care)\b/.test(s);
  V['g8-conclude'] = q => !tooFar(mk(q)) && q.options.map(text).filter(o => !tooFar(o)).length === 1 ? '' : 'expected the supported conclusion';
  V['g8-sequence'] = q => { const all = text(q.fig), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  const CULT = [[/shoes at the door/, 'norm'], [/mattered more than/, 'value'], [/only nobles/, 'hierarchy'], [/Before telephones/, 'past time'], [/in Tagalog/, 'language'], [/considered disrespectful/, 'taboo']];
  V['g8-culture-el'] = (q, m) => { const c = CULT.find(x => x[0].test(text(m.s))); return c && mk(q).includes(c[1]) ? '' : 'expected ' + (c && c[1]); };
  V['g8-bias-line'] = q => /^Everyone knows/.test(mk(q)) ? '' : 'expected the sweeping claim about teens';
  /* a claim shows bias when it judges a whole group with words like only, everyone or cannot, and gives no numbers */
  const biased = s => !/\d/.test(s) && /\b(Only|Everyone|cannot)\b/.test(s);
  V['g8-pick-bias'] = q => H.sameSet(q.options.map((o, i) => biased(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the biased claims are not the ones marked';
  V['g8-fix-bias'] = q => /evidence/.test(mk(q)) ? '' : 'expected replacing the claim with evidence';
  V['g8-missing'] = q => /council members/.test(mk(q)) ? '' : 'expected the council' + "'s perspective";
  const POS = { "What is Amir's position?": 'everyone can get in', "What is Ms. Li's concern?": 'hearing aids', 'Whose idea answers both concerns?': "Tala's", 'What topic does everyone in the discussion address?': 'accessible' };
  V['g8-position'] = (q, m) => mk(q).includes(POS[text(m.q)]) && H.has(q.fig, 'Moving the Spring Dance') ? '' : 'expected ' + POS[text(m.q)];
})();
