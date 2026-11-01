/* Grade 8 answer checks: critical reading (grade8/chapters/thinking.js). Devices, cultural elements, bias and positions are authored,
   so the checker keeps its own answer key; inferences, conclusions and order are checked against the passage on screen. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const div = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d; };
  const why = (q, good) => q.why && q.why.answer === (good ? 0 : 1);
  const fig = q => text(q.fig || q.pic || '');

  /* irony: words that only the ironic version of each moment has, and its kind */
  const IRONIC = [[/fire station burned/, 'situational', 'safest place from fire'], [/as hail smashed/, 'verbal', 'means it'], [/misspelled her own name/, 'situational', 'spell her own name'],
    [/flashed and beeped/, 'situational', 'should be quiet'], [/lifeguard had to be rescued/, 'situational', 'rescues others'], [/eaten all the cookies/, 'verbal', 'is grateful'],
    [/muttered, as the canoe tipped/, 'verbal', 'likes it'], [/lost under a pile/, 'situational', 'easy to find'], [/gift is broken, but Theo smiles/, 'dramatic', 'Theo would worry'],
    [/ice is thin, but the skaters/, 'dramatic', 'skaters would stop'], [/forgot her birthday/, 'dramatic', 'Zara would be happy']];
  const ironyOf = s => IRONIC.find(x => x[0].test(s));
  V['g8-irony'] = q => ironyOf(mk(q)) && q.options.map(text).filter(o => ironyOf(o)).length === 1 ? '' : 'expected the ironic sentence';
  V['g8-irony-kind'] = (q, m) => { const x = ironyOf(text(m.s)); return x && mk(q) === x[1] ? '' : 'expected ' + (x && x[1]); };
  V['g8-irony-expect'] = (q, m) => { const x = ironyOf(text(m.s)); return x && mk(q).includes(x[2]) ? '' : 'expected what you would expect'; };
  V['g8-irony-tf'] = (q, m) => { const right = !!ironyOf(text(m.s)); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };

  /* satire: each title and words from what it mocks */
  const SATIRE = { 'Introducing the SmartSpoon': 'technology and fees', 'New Law Bans Rain on Weekends': 'cannot deliver', "A Nature Lover's Guide to the Lake": 'posting photos',
    'Student Reads the Terms and Conditions': 'unreadable terms', 'The Meeting About Meetings': 'pointless meetings', 'Now With More Air!': 'looks bigger', 'Phone-Free Week Lasts Four Minutes': 'phones down' };
  V['g8-satire'] = (q, m) => mk(q).includes(SATIRE[text(m.t)]) ? '' : 'expected what the satire mocks';
  V['g8-satire-which'] = q => SATIRE[mk(q)] && q.tiles.map(text).filter(t => SATIRE[t]).length === 1 ? '' : 'expected the satire headline';
  V['g8-satire-tf'] = (q, m) => { const right = text(m.said).includes(SATIRE[text(m.t)]); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-satire-match'] = q => q.pairs.every(p => text(p[1]).includes(SATIRE[text(p[0])])) ? '' : 'a satire is matched to the wrong target';

  /* allusion: the allusion in each sentence and words from what it refers to */
  const ALL = { "Pandora's box": 'releasing troubles', 'David facing Goliath': 'small fighter', 'the Midas touch': 'turned everything', "Achilles' heel": 'one weak spot', 'Rip Van Winkle': 'twenty years',
    'crying wolf': 'lied so often', 'a Trojan horse': 'hidden inside a gift', Herculean: 'impossible labours', 'like the tortoise': 'slow, steady racer', 'its Waterloo': 'Napoleon' };
  const allusionIn = s => Object.keys(ALL).find(k => s.includes(k));
  V['g8-allusion'] = (q, m) => { const a = allusionIn(text(m.s)); return a && mk(q).includes(ALL[a]) ? '' : 'expected the meaning of ' + a; };
  V['g8-which-allusion'] = q => allusionIn(mk(q)) && q.options.map(text).filter(allusionIn).length === 1 ? '' : 'expected the sentence with the allusion';
  V['g8-allusion-words'] = (q, m) => mk(q) === allusionIn(text(m.s)) ? '' : 'expected ' + allusionIn(text(m.s));
  V['g8-allusion-tf'] = (q, m) => { const right = text(m.said).includes(ALL[allusionIn(text(m.s))]); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };

  /* inferences: question -> [words from the answer, words in the text that show it] */
  const INFER = { 'Why did the ramp lower again?': ['asked for the ferry to wait', 'spoke into his radio'], 'How does Amira feel at the end?': ['relieved and grateful', 'pressed a hand to her heart'],
    'What has probably happened in other springs?': ['flooded before', 'would finally convince the town'], 'Is the narrator really calm?': ['No.', 'kicked the water bottle'],
    'Why did the coach keep the narrator on the bench?': ['the way the narrator acted', 'For some reason'],
    'How does Elisapee feel when she starts the show?': ['nervous', 'hands shook'], 'How does Elisapee feel by the end of the show?': ['more confident', 'hands were steady'],
    'Why does the aunt call again at the end?': ['proud of them', 'heard every word'], 'How does the narrator feel at the start?': ['nervous', 'stomach still flipped'],
    'Why does the narrator try not to imagine what the coach wrote?': ['bad news', 'not to imagine'], 'Why might the narrator have a good chance of making the team?': ['never quit', 'never quit on a play'],
    'Why does Desmond start the wind machines?': ['protect the blossoms', 'warmer air down'], 'How does Desmond feel about being far from home?': ['misses his daughter', 'thinking of his daughter'],
    'Why do Claire and Desmond laugh at the end?': ['relieved and worn out', 'laughed from tiredness'] };
  const inf = m => INFER[text(m.q)];
  const tapped = q => { const d = div(q.pic); const n = d.querySelector('[data-hit="' + q.answer + '"]'); return { hit: n ? text(n.innerHTML) : '', count: s => [...d.querySelectorAll('[data-hit]')].filter(x => text(x.innerHTML).includes(s)).length }; };
  V['g8-infer'] = (q, m) => { const k = inf(m); return k && mk(q).includes(k[0]) && fig(q).includes(k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g8-evidence'] = (q, m) => { const k = inf(m); return k && mk(q).includes(k[1]) && q.options.map(text).filter(o => o.includes(k[1])).length === 1 ? '' : 'expected the sentence with "' + (k && k[1]) + '"'; };
  V['g8-infer-tap'] = (q, m) => { const k = inf(m), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence is not the clue'; };
  V['g8-infer-tf'] = (q, m) => { const k = inf(m), right = !!k && text(m.said).includes(k[0]); return k && q.answer === right && why(q, right) ? '' : 'expected ' + right; };

  /* a conclusion that uses never, always, every, all or the like goes further than any text could prove */
  const tooFar = s => /\b(never|always|every|Every|no longer|banned|Nobody|end all|does not care|no effect|all)\b/.test(s);
  V['g8-conclude'] = q => !tooFar(mk(q)) && q.options.map(text).filter(o => !tooFar(o)).length === 1 ? '' : 'expected the supported conclusion';
  V['g8-conclude-tf'] = (q, m) => { const right = !tooFar(text(m.said)); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-too-far'] = (q, m) => tooFar(mk(q)) && text(m.s).includes(mk(q)) && q.tiles.map(text).filter(tooFar).length === 1 ? '' : 'expected the word that goes too far';
  V['g8-sequence'] = q => { const all = fig(q), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };

  /* cultural elements: words from each excerpt and its element */
  const CULT = [[/shoes at the door|serves tea to the elders/, 'norm'], [/mattered more than|came before everything/, 'value'], [/only nobles|captain ate first/, 'hierarchy'],
    [/Before telephones|In 1923/, 'past time'], [/in Tagalog|Spanish and English/, 'language'], [/considered disrespectful|bring bad luck/, 'taboo']];
  const MEANS = { 'a norm': 'expected way to behave', 'a value': 'believe is important', 'social hierarchy': 'power or status', 'a past time': 'earlier era', language: 'words a community uses', 'a taboo': 'not done or said' };
  const el = s => (CULT.find(x => x[0].test(s)) || [])[1];
  V['g8-culture-el'] = (q, m) => { const c = el(text(m.s)); return c && mk(q).includes(c) ? '' : 'expected ' + c; };
  V['g8-culture-which'] = q => { const want = text(q.q).match(/shows (.+?) \(/)[1].replace(/^(a|an) /, '').replace('social ', ''); const ok = q.options.map(o => (el(text(o)) || '').includes(want));
    return ok.filter(Boolean).length === 1 && ok[q.answer] ? '' : 'expected the excerpt that shows ' + want; };
  V['g8-culture-tf'] = (q, m) => { const c = el(text(m.s)), said = text(q.q), right = said.includes('(') && said.split(' shows ')[1].includes(c); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-culture-match'] = q => q.pairs.every(p => text(p[1]).includes(MEANS[text(p[0])])) ? '' : 'an element is matched to the wrong meaning';

  /* bias: a claim is biased when it judges a whole group with no numbers */
  const biased = s => !/\d/.test(s) && /\b(Only|Everyone|cannot|are bad at|know nothing)\b/.test(s);
  V['g8-bias-which'] = q => biased(mk(q)) && q.options.map(text).filter(biased).length === 1 ? '' : 'expected the biased claim';
  V['g8-pick-bias'] = q => H.sameSet(q.options.map((o, i) => biased(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the biased claims are not the ones marked';
  V['g8-bias-tf'] = (q, m) => { const right = biased(text(m.s)) === m.says; return q.answer === right && q.why.answer === 0 && text(q.why.options[0]).includes(biased(text(m.s)) ? 'whole group' : 'counted') ? '' : 'expected ' + right; };
  /* a fairer version talks about some people, or gives evidence, and does not judge another group instead */
  const FAIRER = /\b(Some|some|many|could show|practice|wherever)\b/;
  V['g8-fix-bias'] = q => FAIRER.test(mk(q)) && !biased(mk(q)) && q.options.map(text).filter(o => FAIRER.test(o)).length === 1 ? '' : 'expected the fair version';

  /* positions: [question, words from the answer] per discussion, and each speaker's view */
  const POS = { "What is Amir's position?": 'everyone can get in', "What is Ms. Li's concern?": 'hearing aids', "What is Jin's position?": 'leave some students out', "What is Ms. Roy's concern?": 'does not have',
    "What is Hana's position?": 'miss the announcements', "What is Mr. Patel's concern?": 'not enough time', "What is Zoe's position?": 'diversity', "What is Ms. Grant's concern?": 'little money' };
  const BOTH = { 'Moving the Spring Dance': ["Tala's", 'accessible'], 'Paying for the Field Trip': ["Kemal's", 'affordable'], 'Captions for the Announcements': ["Leo's", 'accessible'], 'Books for the Class Library': ["Ibrahim's", 'reflect everyone'] };
  const VIEW = { 'everyone can get in': 'Amir', 'hearing aids': 'Ms. Li', 'sound panels': 'Tala', 'keep some students home': 'Jin', 'pay for the bus': 'Ms. Roy', 'Raise money': 'Kemal',
    'everyone can follow': 'Hana', 'too much time': 'Mr. Patel', 'automatic captions': 'Leo', 'reflect the whole class': 'Zoe', 'little money': 'Ms. Grant', 'public library': 'Ibrahim' };
  const answerTo = m => POS[text(m.q)] || (/both concerns/.test(m.q) ? BOTH[m.t][0] : BOTH[m.t][1]);
  const viewOf = v => VIEW[Object.keys(VIEW).find(k => v.includes(k))];
  V['g8-position'] = (q, m) => mk(q).includes(answerTo(m)) && fig(q).includes(m.t) ? '' : 'expected ' + answerTo(m);
  V['g8-position-tf'] = (q, m) => { const right = text(m.said).includes(answerTo(m)); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-who-says'] = (q, m) => mk(q) === viewOf(text(m.v)) && fig(q).includes(viewOf(text(m.v)) + ':') ? '' : 'expected ' + viewOf(text(m.v));
  V['g8-position-match'] = q => q.pairs.every(p => viewOf(text(p[1])) === text(p[0])) ? '' : 'a speaker is matched to the wrong view';
})();
