/* Grade 2 answer checks: media and online life (grade2/chapters/media.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const PRIVATE = /where I live|password|phone number|photo of my house/;
  const SAFE = /tell a grown-up|Ask a grown-up first/i;
  const ASK = /^Ask /;
  const KIND = new Set(['Nice work on your volcano!', 'I like your idea.', 'Can I help you with that part?']);
  const TRUSTED = /^(a science centre|a library book|your teacher|a zoo website)/;
  const HAS = { 'a poster': 'a big title and a picture', 'an ad': 'wants you to buy something', 'a video': 'moving pictures and sound', 'a menu': 'lists food and prices' };
  const DESIGN = 'Plan: what is the problem?|Make it.|Test it with someone.|Make it better.';
  const picks = (q, fits) => H.sameSet(q.options.map((o, i) => (fits(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);

  V['g2-private'] = q => picks(q, o => PRIVATE.test(o)) ? '' : 'the private things are not the ones marked';
  V['g2-what-to-do'] = q => SAFE.test(mk(q)) && q.options.map(text).filter(o => SAFE.test(o)).length === 1 ? '' : 'expected the safe choice';
  V['g2-ask-first'] = q => ASK.test(mk(q)) ? '' : 'expected asking first';
  V['g2-kind-comment'] = q => KIND.has(mk(q)) && q.options.map(text).filter(o => KIND.has(o)).length === 1 ? '' : 'expected the kind comment';
  V['g2-kind-pick'] = q => picks(q, o => KIND.has(o)) ? '' : 'the kind choices are not the ones marked';
  V['g2-trust'] = q => TRUSTED.test(mk(q)) ? '' : 'expected the trusted source';
  V['g2-match-media'] = q => q.pairs.every(p => HAS[text(p[0])] === text(p[1])) ? '' : 'a kind of media is matched to the wrong thing';
  V['g2-ad-wants'] = q => mk(q) === 'buy the sneakers' && H.has(q.fig, 'Ask for them') ? '' : 'expected buying';
  V['g2-ad-trick'] = q => /SO fast/.test(mk(q)) ? '' : 'expected the big promise';
  V['g2-design'] = q => q.items.map(text).join('|') === DESIGN ? '' : 'the design steps are out of order';
})();
