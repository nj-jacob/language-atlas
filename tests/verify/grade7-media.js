/* Grade 7 answer checks: media and online life (grade7/chapters/media.js). Own lists and keys, and its own password-strength rule. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const sents = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return [...d.querySelectorAll('.sent')].map(x => text(x.innerHTML)); };
  const pickOk = (q, test) => H.sameSet(q.options.map((o, i) => test(text(o)) ? i : -1).filter(i => i >= 0), q.answer);
  const RESP = /^(Do not share it without|Wait until you are calm|Ask a parent first|Report the comments|Do not answer, and tell|Log it out|Reply calmly with a reason|Ask everyone in it|Do not pass them on|Say no; never share)/;
  V['g7-responsible'] = q => { const ok = q.options.map(text).filter(o => RESP.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the responsible choice'; };
  V['g7-responsible-tf'] = (q, m) => { const right = RESP.test(text(m.plan)); return q.answer === right && tfWhy(q, right) && sents(q).includes(text(m.plan)) ? '' : 'expected ' + right; };
  const FOOT_TRUE = /can be copied|screenshot can keep|what others post about me|positive digital identity/;
  V['g7-footprint-tf'] = (q, m) => FOOT_TRUE.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* someone else is in it or made it: ask first */
  const OTHERS = /friends|private message|tag a classmate|group selfie|friend's voice note/;
  V['g7-permission'] = (q, m) => q.answer === (OTHERS.test(text(m.s)) ? 0 : 1) ? '' : 'expected ' + (OTHERS.test(text(m.s)) ? 'yes' : 'no');
  /* strong: 16 or more characters, or 12 or more with three kinds of characters */
  const strong = p => p.length >= 16 || (p.length >= 12 && [/[a-z]/, /[A-Z]/, /\d/, /[^\w]/].filter(r => r.test(p)).length >= 3);
  V['g7-password'] = q => { const ok = q.options.map(text).filter(strong); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one strong password'; };
  const PHISH = /close in one hour|enter your password|odd spelling|never entered|secret from your parents|does not match the company/;
  V['g7-phishing'] = q => pickOk(q, o => PHISH.test(o)) ? '' : 'the warning signs are not the ones marked';
  const SEC = { 'two-step verification': 'needs a code from your phone', 'app permissions': 'control what an app can see', 'privacy settings': 'control who can see your posts', 'software updates': 'fix security holes',
    'a password manager': 'stores a different strong password', 'a lock screen': 'stops others from opening' };
  V['g7-secure-match'] = q => q.pairs.every(p => text(p[1]).startsWith(SEC[text(p[0])])) ? '' : 'a tool is matched wrong';
  const SEC_TRUE = /different password for each|second lock|fix security holes|long passphrase/;
  V['g7-security-tf'] = (q, m) => SEC_TRUE.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* mistake (mis-), deliberate (dis-), or chosen for you (curated) */
  const kind = s => /believing it is true|thinking it is right|thinking it shows|that he believes/.test(s) ? 'misinformation' : /invents|fake account|pays accounts|edits a video/.test(s) ? 'disinformation'
    : /shows you more|editors picked|builds a playlist|ranks the results/.test(s) ? 'curated information' : null;
  V['g7-info-kind'] = (q, m) => mk(q) === kind(text(m.s)) ? '' : 'expected ' + kind(text(m.s));
  V['g7-info-tf'] = (q, m) => { const right = kind(text(m.s)) === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const INFO = { misinformation: 'by mistake', disinformation: 'on purpose', 'curated information': 'chosen and arranged' };
  V['g7-info-match'] = q => q.pairs.every(p => text(p[1]).includes(INFO[text(p[0])])) ? '' : 'a term is matched wrong';
  const CHECK = /^(Search for the claim|Find out who made it|Check the date|Look for the original|See what fact-checking|Ask whether the photo)/;
  V['g7-check-claim'] = q => pickOk(q, o => CHECK.test(o)) ? '' : 'the good checks are not the ones marked';
  const ETH = /permission or a Creative Commons|permission to use, and credit|quotation marks and cite|it is their work to do|Share the original post|made with AI, and follow|List the website in your sources|only if the rules allow it/;
  V['g7-ethics'] = q => { const ok = q.options.map(text).filter(o => ETH.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the legal, ethical choice'; };
  V['g7-ethics-pick'] = q => pickOk(q, o => ETH.test(o)) ? '' : 'the fair choices are not the ones marked';
  const ETH_TRUE = /Creators own|Creative Commons licences allow|need quotation marks|does not make it legal/;
  V['g7-ethics-tf'] = (q, m) => ETH_TRUE.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* free to reuse only when it says so */
  const FREE = /Creative Commons licence that allows reuse|marked free/;
  V['g7-reuse'] = (q, m) => q.answer === (FREE.test(text(m.s)) ? 0 : 1) ? '' : 'expected ' + (FREE.test(text(m.s)) ? 'use with credit' : 'ask first');
  const TECH = { 'a low camera angle looking up at an athlete': 'powerful', 'fast cuts and loud music': 'excitement', '"Everyone is switching to it!"': 'left out', 'a famous player holding the product': "player's trust",
    '"Only three days left!"': 'act quickly', 'soft music and slow motion': 'calm or sad', 'a close-up of a smiling family at dinner': 'warm and caring', 'bright colours and cheerful music': 'happy, fun',
    '"Scientists recommend it!"': 'authority of experts', 'a before-and-after picture': 'dramatic', 'a catchy jingle repeated three times': 'remember the brand', 'dark lighting and a slow drumbeat': 'suspense' };
  const effectOf = t => TECH[text(t)];
  V['g7-media-technique'] = (q, m) => mk(q).includes(effectOf(m.t)) ? '' : 'expected the effect "' + effectOf(m.t) + '"';
  V['g7-tech-match-media'] = q => q.pairs.every(p => text(p[1]).includes(effectOf(p[0]))) ? '' : 'a technique is matched wrong';
  V['g7-tech-which'] = (q, m) => text(m.e).includes(effectOf(mk(q))) && q.tiles.filter(t => text(m.e).includes(effectOf(t))).length === 1 ? '' : 'expected the technique with that effect';
  V['g7-tech-tf'] = (q, m) => { const right = text(m.said).includes(effectOf(m.t)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const AUD = { cereal: ['young children', 'parents who worry about sugar', 'to sell cereal'], "team's fans": ["the team's fans", 'rival fans who find it and mock it', 'to excite the fans'],
    'private joke': ['close friends', 'the person the joke is about', 'to make friends laugh'], fitness: ['older adults', 'teens walking past', 'to get older adults to join'],
    'dance video': ['other students who like dance', 'a future employer searching their name', 'to share a skill and have fun'], toddler: ['parents of toddlers', 'teens who find it in the mailbox', 'to sign up toddlers for swimming'],
    'campaign ad': ['voters in the city', 'tourists riding the bus', 'to win votes'], vegan: ['people who eat vegan', 'meat lovers who stumble on it', 'to teach a recipe'] };
  const audOf = t => AUD[Object.keys(AUD).find(k => text(t).includes(k))];
  V['g7-media-audience'] = (q, m) => { const a = audOf(m.t); return a && mk(q) === text(a[m.un ? 1 : 0]) ? '' : 'expected the ' + (m.un ? 'unintended' : 'intended') + ' audience'; };
  V['g7-media-purpose'] = (q, m) => mk(q) === audOf(m.t)[2] ? '' : 'expected ' + audOf(m.t)[2];
  V['g7-aud-match'] = q => q.pairs.every(p => audOf(p[0])[0] === text(p[1])) ? '' : 'a text is matched to the wrong audience';
  const AUD_TRUE = /never planned for|can reach strangers|suit their audience|mean different things/;
  V['g7-audience-tf'] = (q, m) => AUD_TRUE.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const STEPS = ['Define', 'Research', 'Brainstorm', 'Build', 'Test', 'Propose'];
  const at = s => STEPS.indexOf(text(s).split(' ')[0]);
  V['g7-design-order'] = q => q.items.map(at).every((p, i, a) => p >= 0 && (i === 0 || p > a[i - 1])) ? '' : 'the design steps are out of order';
  V['g7-design-next'] = (q, m) => at(mk(q)) === at(m.s) + 1 ? '' : 'expected the next design step';
  /* what each action is, from what the designer is doing */
  const DOING = s => /write down that/.test(s) ? 'Define' : /ask five classmates/.test(s) ? 'Research' : /sketch three/.test(s) ? 'Brainstorm' : /cardboard model/.test(s) ? 'Build' : /try the model/.test(s) ? 'Test' : /plan for the principal/.test(s) ? 'Propose' : null;
  V['g7-design-step'] = (q, m) => mk(q) === DOING(m.s) ? '' : 'expected ' + DOING(m.s);
  const RESPECT = /^(Comment: “Interesting idea|Learn who it belongs to|Welcome them|Say it is not okay|Ask what they would like|Add alt text|Ask calmly|Ask the student first|Find a time that works|Ask politely)/;
  V['g7-collab'] = q => { const ok = q.options.map(text).filter(o => RESPECT.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the respectful response'; };
  const CULT_TRUE = /ask permission|many cultures may read|Jokes can hurt|all can take part/;
  V['g7-culture-symbol-tf'] = (q, m) => CULT_TRUE.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
})();
