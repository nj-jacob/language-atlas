/* Grade 7 answer checks: word parts (grade7/chapters/word-parts.js). Each one works the answer out again from what the child sees, without the site's code.
   The checker has its own root dictionary, its own list of word meanings and its own spelling rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const ROOT = { port: 'carry', dict: 'say', rupt: 'break', struct: 'build', spect: 'look', aud: 'hear', vis: 'see', ject: 'throw', tract: 'pull', mit: 'send', cred: 'believe', scrib: 'write',
    geo: 'earth', chron: 'time', graph: 'write or draw', bio: 'life', tele: 'far', phon: 'sound', therm: 'heat' };
  /* the checker's own list of words and the roots in them */
  const WORDS = ('transport portable export import predict dictate contradict verdict erupt interrupt disrupt rupture construct structure instruct destruction ' +
    'inspect spectator respect spectacle audience audible audio auditorium visible vision visual invisible project reject eject inject tractor attract subtract distract ' +
    'transmit submit emit credible incredible credit describe scribble inscribe geology geometry geologist chronological chronicle chronic autograph paragraph graphic photograph ' +
    'biology biome biosphere telescope telegram telecast microphone symphony phonics thermal thermometer thermostat').split(' ');
  const rootsIn = w => WORDS.includes(w) ? Object.keys(ROOT).filter(r => w.includes(r)) : null;
  const meansIn = w => (rootsIn(w) || []).map(r => ROOT[r]);
  const figWords = q => text(q.fig).split(' ');
  V['g7-root-meaning'] = (q, m) => mk(q) === ROOT[m.root] && text(q.q).includes(m.root) && figWords(q).every(w => rootsIn(w).includes(m.root)) ? '' : 'expected ' + ROOT[m.root];
  V['g7-root-which'] = (q, m) => { const ok = q.tiles.map(text).filter(t => meansIn(t).includes(m.mean)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one word with a root meaning ' + m.mean; };
  V['g7-root-match'] = q => q.pairs.every(p => ROOT[text(p[0])] === text(p[1])) ? '' : 'a root is matched to the wrong meaning';
  V['g7-root-tf'] = (q, m) => { const w = figWords(q)[0]; if (!rootsIn(w) || !rootsIn(w).includes(m.root)) return 'the word does not have the root';
    return (ROOT[m.root] === m.said) === q.answer && text(q.why.options[q.why.answer]) === m.root + ' means ' + ROOT[m.root] + '.' ? '' : 'true/false is wrong'; };
  V['g7-root-family'] = (q, m) => H.sameSet(q.options.map((o, i) => (rootsIn(text(o)) || []).includes(m.root) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the family words are not the ones marked';
  V['g7-family-odd'] = (q, m) => { const out = q.tiles.map(text).filter(t => !(rootsIn(t) || []).includes(m.root)); return out.length === 1 && mk(q) === out[0] && rootsIn(out[0]) ? '' : 'expected the word without ' + m.root; };
  V['g7-family-match'] = q => q.pairs.every(p => (rootsIn(text(p[0])) || []).includes(text(p[1]))) ? '' : 'a word is matched to the wrong root';
  V['g7-family-tf'] = (q, m) => { const right = (rootsIn(m.w) || []).includes(m.root); return rootsIn(m.w) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };

  /* Greek parts, and the meaning of each word built from them */
  const GPART = { geo: 'earth', bio: 'life', chrono: 'time', graph: 'write or draw', graphy: 'writing about', tele: 'far', scope: 'a tool to look', micro: 'small', phone: 'sound', thermo: 'heat',
    meter: 'a tool to measure', logy: 'the study of', photo: 'light', thermal: 'heat' };
  const GMEAN = { geology: 'the study of the earth', biology: 'the study of life', telescope: 'a tool to see far things', microscope: 'a tool to see tiny things', thermometer: 'a tool to measure heat',
    telephone: 'a tool to hear sound from far away', microphone: 'a tool that picks up small sounds', photograph: 'a picture made with light', biography: "writing about a person's life",
    geography: 'writing about the earth and its places', chronology: 'the order of events in time', geothermal: 'heat from the earth' };
  const gword = mean => Object.keys(GMEAN).find(w => GMEAN[w] === mean);
  const built = q => q.answer.map(i => text(q.parts[i])).join('');
  V['g7-greek-word'] = (q, m) => mk(q) === gword(text(m.mean)) ? '' : 'expected ' + gword(text(m.mean));
  V['g7-greek-build'] = (q, m) => built(q) === gword(text(m.mean)) ? '' : 'built ' + built(q) + ' for ' + m.mean;
  V['g7-greek-part'] = (q, m) => GPART[mk(q)] === m.mean && m.word.includes(mk(q)) && mk(q) !== m.word ? '' : 'the part marked does not mean ' + m.mean;
  V['g7-greek-tf'] = (q, m) => { const right = GMEAN[m.word] === text(m.said); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };

  /* prefixes the checker knows, and its own list of what each word means */
  const PRE = { trans: ['across'], ex: ['out'], im: ['into'], inter: ['between'], e: ['out'], dis: ['apart', 'away'], pre: ['before'], contra: ['against'], in: ['into', 'not'], re: ['back'], pro: ['forward'],
    con: ['together'], at: ['toward'], sub: ['under'] };
  const MEANING = { transport: 'carry across', export: 'carry out of a country', import: 'carry into a country', interrupt: 'break in between', erupt: 'break out', disrupt: 'break apart',
    predict: 'say before it happens', contradict: 'say the opposite', inspect: 'look into closely', reject: 'throw back, or turn down', project: 'throw forward', eject: 'throw out',
    construct: 'build by putting parts together', attract: 'pull toward', distract: 'pull attention away', subtract: 'take away from', transmit: 'send across', report: 'carry back news, or tell about' };
  const wordFor = mean => Object.keys(MEANING).find(w => MEANING[w] === mean);
  V['g7-word-meaning'] = (q, m) => mk(q) === MEANING[m.word] && text(q.q).includes(m.word) ? '' : 'expected ' + MEANING[m.word];
  V['g7-build'] = (q, m) => built(q) === wordFor(text(m.mean)) ? '' : 'built ' + built(q) + ' for ' + m.mean;
  V['g7-which-part'] = (q, m) => { const t = mk(q), byRoot = ROOT[t] === m.mean && m.word.includes(t), byPre = (PRE[t] || []).includes(m.mean) && m.word.startsWith(t) && t !== m.word;
    return byRoot || byPre ? '' : 'the part marked does not mean ' + m.mean; };
  V['g7-split-tf'] = (q, m) => { const right = MEANING[m.word] === text(m.said); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* suffixes and words built with them */
  const SUF = { ible: 'able to be', able: 'able to be', ator: 'a person who', or: 'a person who', logy: 'the study of', ion: 'the act or result of', less: 'without', ful: 'full of', ous: 'full of', ment: 'the act or state of' };
  const SMEAN = { audible: 'able to be heard', visible: 'able to be seen', portable: 'able to be carried', credible: 'able to be believed', spectator: 'a person who watches', instructor: 'a person who teaches',
    inspector: 'a person who checks things closely', geology: 'the study of the earth', biology: 'the study of life', construction: 'the act of building', prediction: 'something said before it happens',
    eruption: 'a bursting out', fearless: 'without fear', respectful: 'full of respect', dangerous: 'full of danger', enjoyment: 'the state of enjoying' };
  const sufOf = w => Object.keys(SUF).filter(s => w.endsWith(s)).sort((a, b) => b.length - a.length)[0];
  V['g7-suffix-word'] = (q, m) => mk(q) === SMEAN[m.word] ? '' : 'expected ' + SMEAN[m.word];
  V['g7-suffix-meaning'] = (q, m) => mk(q) === SUF[m.suf] && m.word.endsWith(m.suf) ? '' : 'expected ' + SUF[m.suf];
  V['g7-suffix-which'] = (q, m) => { const s = mk(q).replace(/^-/, ''); return m.word.endsWith(s) && s === sufOf(m.word) && text(q.q).includes(SMEAN[m.word]) ? '' : 'expected -' + sufOf(m.word); };
  V['g7-suffix-tf'] = (q, m) => { const right = SMEAN[m.word] === text(m.said); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* words in sentences */
  const CTX = { audible: 'able to be heard', visible: 'able to be seen', portable: 'able to be carried', interrupt: 'break in while someone is talking', inspect: 'look at closely',
    reject: 'turn down', spectators: 'people who watch', chronological: 'in time order', geothermal: 'heat from the earth', predict: 'say before it happens', credible: 'able to be believed',
    distract: 'pull your attention away', transmit: 'send across a distance', microscope: 'a tool to see tiny things', describe: 'tell or write what it is like', eruption: 'a bursting out' };
  V['g7-in-context'] = (q, m) => mk(q) === CTX[m.word] && text(q.fig).includes(m.word) ? '' : 'expected ' + CTX[m.word];
  V['g7-context-gap'] = (q, m) => mk(q) === m.word && CTX[m.word] && !text(q.fig).includes(m.word) ? '' : 'expected ' + m.word;
  V['g7-context-tf'] = (q, m) => { const right = CTX[m.word] === text(m.said); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-context-match'] = q => q.pairs.every(p => CTX[text(p[0])] === text(p[1])) ? '' : 'a word is matched to the wrong meaning';

  /* spelling: the checker's own rules. Stress on the last beat (so the consonant doubles) is its own list. */
  const STRESS_LAST = ['occur', 'begin', 'admit', 'regret', 'permit', 'refer', 'forget', 'control', 'commit'];
  const vowel = c => 'aeiou'.includes(c);
  function spell(b, s) {
    const last = b.slice(-1), before = b.slice(-2, -1);
    if (last === 'e' && vowel(s[0])) return b.slice(0, -1) + s;
    if (last === 'y' && !vowel(before) && s[0] !== 'i') return b.slice(0, -1) + 'i' + s;
    if (vowel(s[0]) && !vowel(last) && vowel(before) && !vowel(b.slice(-3, -2)) && STRESS_LAST.includes(b)) return b + last + s;
    return b + s;
  }
  const ruleOf = (b, s) => { const w = spell(b, s); return w === b + s ? (b.endsWith('e') ? 'Keep the e.' : b.endsWith('y') ? 'Keep the y.' : 'Just add the suffix.') : w.length > b.length + s.length ? 'Double the last consonant.' : b.endsWith('e') ? 'Drop the silent e.' : 'Change y to i.'; };
  V['g7-add-suffix'] = (q, m) => mk(q) === spell(m.base, m.suf) ? '' : 'expected ' + spell(m.base, m.suf);
  V['g7-spell-choose'] = (q, m) => mk(q) === spell(m.base, m.suf) ? '' : 'expected ' + spell(m.base, m.suf);
  V['g7-which-rule'] = (q, m) => mk(q) === ruleOf(m.base, m.suf) ? '' : 'expected "' + ruleOf(m.base, m.suf) + '"';
  V['g7-spell-tf'] = (q, m) => { const right = text(m.said) === spell(m.base, m.suf); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* every right spelling the chapter uses, worked out by the rules above */
  const PAIRS = [['create', 'ion'], ['value', 'able'], ['hope', 'ing'], ['amaze', 'ing'], ['believe', 'able'], ['write', 'ing'], ['combine', 'ation'], ['care', 'ing'], ['note', 'able'],
    ['manage', 'ment'], ['excite', 'ment'], ['complete', 'ly'], ['care', 'ful'], ['hope', 'less'], ['safe', 'ty'], ['use', 'ful'],
    ['occur', 'ed'], ['begin', 'ing'], ['admit', 'ed'], ['regret', 'able'], ['permit', 'ed'], ['refer', 'ed'], ['forget', 'ing'], ['control', 'ed'], ['commit', 'ed'],
    ['visit', 'ed'], ['open', 'ing'], ['limit', 'ed'], ['happen', 'ing'], ['offer', 'ed'], ['answer', 'ed'], ['enter', 'ing'],
    ['happy', 'ness'], ['rely', 'able'], ['carry', 'ed'], ['beauty', 'ful'], ['easy', 'ly'], ['try', 'ed'], ['lazy', 'ness'], ['deny', 'al'],
    ['carry', 'ing'], ['study', 'ing'], ['enjoy', 'ment'], ['play', 'ful'], ['destroy', 'ed'], ['try', 'ing'], ['employ', 'er']];
  const GOOD = new Set(PAIRS.map(p => spell(p[0], p[1])));
  V['g7-spell-pick'] = q => H.sameSet(q.options.map((o, i) => GOOD.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right spellings are not the ones marked';
})();
