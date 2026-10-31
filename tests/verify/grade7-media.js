/* Grade 7 answer checks: media and online life (grade7/chapters/media.js). Own lists and keys, and its own password-strength rule. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const RESP = /^(Do not share it without|Wait until you are calm|Ask a parent first|Report the comments)/;
  V['g7-responsible'] = q => { const ok = q.options.map(text).filter(o => RESP.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the responsible choice'; };
  V['g7-footprint-tf'] = (q, m) => /can be copied/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* strong: 16 or more characters, or 12 or more with three kinds of characters; never a common word */
  const strong = p => p.length >= 16 || (p.length >= 12 && [/[a-z]/, /[A-Z]/, /\d/, /[^\w]/].filter(r => r.test(p)).length >= 3);
  V['g7-password'] = q => { const ok = q.options.map(text).filter(strong); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one strong password'; };
  const PHISH = /close in one hour|enter your password|odd spelling/;
  V['g7-phishing'] = q => H.sameSet(q.options.map((o, i) => PHISH.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the warning signs are not the ones marked';
  const SEC = { 'two-step verification': 'needs a code from your phone', 'app permissions': 'control what an app can see', 'privacy settings': 'control who can see your posts', 'software updates': 'fix security holes' };
  V['g7-secure-match'] = q => q.pairs.every(p => text(p[1]).startsWith(SEC[text(p[0])])) ? '' : 'a tool is matched wrong';
  /* mistake (mis-), deliberate (dis-), or chosen for you (curated) */
  const kind = s => /believing it is true|thinking it is right/.test(s) ? 'misinformation' : /invents|fake account/.test(s) ? 'disinformation' : /shows you more|editors picked/.test(s) ? 'curated information' : null;
  V['g7-info-kind'] = (q, m) => mk(q) === kind(text(m.s)) ? '' : 'expected ' + kind(text(m.s));
  const INFO = { misinformation: 'by mistake', disinformation: 'on purpose', 'curated information': 'chosen and arranged' };
  V['g7-info-match'] = q => q.pairs.every(p => text(p[1]).includes(INFO[text(p[0])])) ? '' : 'a term is matched wrong';
  const CHECK = /^(Search for the claim|Find out who made it|Check the date|Look for the original)/;
  V['g7-check-claim'] = q => H.sameSet(q.options.map((o, i) => CHECK.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good checks are not the ones marked';
  const ETH = /permission or a Creative Commons|permission to use, and credit|quotation marks and cite/;
  V['g7-ethics'] = q => { const ok = q.options.map(text).filter(o => ETH.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the legal, ethical choice'; };
  const TECH = { 'a low camera angle looking up at an athlete': 'powerful', 'fast cuts and loud music': 'excitement', '"Everyone is switching to it!"': 'left out', 'a famous player holding the product': 'trust',
    '"Only three days left!"': 'act quickly', 'soft music and slow motion': 'calm or sad' };
  V['g7-media-technique'] = (q, m) => mk(q).includes(TECH[text(m.t)]) ? '' : 'expected the effect "' + TECH[text(m.t)] + '"';
  V['g7-tech-match-media'] = q => q.pairs.every(p => text(p[1]).includes(TECH[text(p[0])])) ? '' : 'a technique is matched wrong';
  const AUD = { cereal: ['young children', 'parents who worry about sugar'], "team's fans": ["the team's fans", 'rival fans who find it and mock it'], 'private joke': ['close friends', 'the person the joke is about'], fitness: ['older adults', 'teens walking past'] };
  V['g7-media-audience'] = (q, m) => { const a = AUD[Object.keys(AUD).find(k => text(m.t).includes(k))]; return a && mk(q) === a[m.un ? 1 : 0] ? '' : 'expected the ' + (m.un ? 'unintended' : 'intended') + ' audience'; };
  V['g7-audience-tf'] = (q, m) => /never planned for/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const STEPS = ['Define', 'Research', 'Brainstorm', 'Build', 'Test', 'Propose'];
  const at = s => STEPS.indexOf(text(s).split(' ')[0]);
  V['g7-design-order'] = q => q.items.map(at).every((p, i, a) => p >= 0 && (i === 0 || p > a[i - 1])) ? '' : 'the design steps are out of order';
  V['g7-design-next'] = (q, m) => at(mk(q)) === at(m.s) + 1 ? '' : 'expected the next design step';
  const RESPECT = /^(Comment: “Interesting idea|Learn who it belongs to|Welcome them|Say it is not okay)/;
  V['g7-collab'] = q => { const ok = q.options.map(text).filter(o => RESPECT.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the respectful response'; };
  V['g7-culture-symbol-tf'] = (q, m) => /ask permission/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
})();
