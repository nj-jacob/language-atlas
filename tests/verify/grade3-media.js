/* Grade 3 answer checks: media and online life (grade3/chapters/media.js). Own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const PRIVATE = /address|password|phone number|full name and school/;
  const BEST = { 'A game asks for your home address.': 'Ask a grown-up first.', 'Someone you do not know sends you a message.': 'Do not answer, and tell a grown-up.',
    'You want to post a photo of your friend.': 'Ask your friend first.', 'Something online makes you feel upset.': 'Close it and tell a grown-up.' };
  const KIND = /^(Great job|I like how|Thanks for sharing)/;
  const TRUSTED = /^(a museum website|a library book|a government weather|a nature centre page)/;
  const MEDIA = { 'a poster': 'a big title and a picture', 'an ad': 'tries to get you to buy something', 'a news report': 'tells what happened', 'a video': 'moving pictures and sound' };
  const one = (q, re) => { const ok = q.options.map(text).filter(o => re.test(o)); return ok.length === 1 && mk(q) === ok[0]; };
  V['g3-private'] = q => H.sameSet(q.options.map((o, i) => PRIVATE.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the private things are not the ones marked';
  V['g3-what-to-do'] = (q, m) => mk(q) === BEST[m.s] ? '' : 'expected ' + BEST[m.s];
  V['g3-kind-comment'] = q => one(q, KIND) ? '' : 'expected the kind comment';
  V['g3-password'] = (q, m) => /keep my password secret/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g3-trust'] = q => one(q, TRUSTED) ? '' : 'expected the trusted source';
  V['g3-match-media'] = q => q.pairs.every(p => MEDIA[text(p[0])] === text(p[1])) ? '' : 'a kind of media is matched wrong';
  V['g3-ad-wants'] = q => /Get yours today/.test(text(q.fig)) && mk(q) === 'buy the cereal' ? '' : 'expected buy the cereal';
  V['g3-ad-for'] = q => /Kids love/.test(text(q.fig)) && mk(q) === 'kids' ? '' : 'expected kids';
  V['g3-design'] = q => q.items.map(text).map(t => t.split(/[: ]/)[0]).join(' ') === 'Plan Make Test Make' ? '' : 'the design steps are out of order';
})();
