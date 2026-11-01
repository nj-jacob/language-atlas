/* Grade 2 answer checks: capitals and punctuation (grade2/chapters/punctuation.js).
   The checker keeps its own list of names, days and months, and works out commas, apostrophes and speech marks from the words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const NAMES = new Set(('Leila Halifax Winnipeg Iqaluit Royal Ontario Museum Theo Mei Lake Huron Jonah Vancouver Aiyana Thunder Bay Noor Montreal Street Ben Victoria Zara ' +
    'Canada Toronto Kai Superior Priya Omar Yukon Hana').split(' '));
  /* whole names of people and places, written small */
  const PLACES = new Set(['canada', 'toronto', 'kai', 'lake superior', 'thunder bay', 'priya', 'halifax', 'omar', 'yukon', 'hana']);
  const DAYS = new Set('Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February March April May June July August September October November December'.split(' '));
  const big = w => w.charAt(0).toUpperCase() + w.slice(1);
  const isName = w => NAMES.has(big(w)) || DAYS.has(big(w));
  /* capitals are right when the first word and every name, day and month has one, and no other word does */
  const capsRight = s => s.replace(/[.,]/g, '').split(' ').every((w, i) => (i === 0 || isName(w)) === /^[A-Z]/.test(w));
  /* the checker's own copy of each list, written out the right way */
  const LISTS = { 'We packed': 'apples crackers cheese', 'I saw': 'a_fox a_deer a_hawk', 'Mei needs': 'glue paper scissors', 'Our kite is': 'red yellow green', 'We planted': 'beans peas carrots squash',
    'Kai likes': 'hockey swimming chess', 'Dad bought': 'milk eggs bread', 'I wore': 'mittens a_toque a_scarf', 'We saw': 'loons ducks geese herons', 'Ava can play': 'soccer tag checkers',
    'The soup has': 'carrots onions beans corn peas', 'My bag holds': 'books pencils a_lunch a_water_bottle' };
  const items = start => LISTS[start].split(' ').map(x => x.replace(/_/g, ' '));
  const RIGHT = new Set(Object.keys(LISTS).map(start => { const it = items(start); return start + ' ' + it.slice(0, -1).join(', ') + ' and ' + it[it.length - 1] + '.'; }));
  const OQ = '“', CQ = '”', AP = '’';
  const speechRight = (s, who) => new RegExp('^' + who + ' said, ' + OQ + '[A-Z][^' + OQ + CQ + ']*[.?!]' + CQ + '$').test(s);
  const tfOk = (q, yes) => q.answer === yes && q.why.answer === (yes ? 0 : 1);
  const picked = (q, f) => H.sameSet(q.options.map((o, i) => (f(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);

  /* capitals */
  V['g2-need-cap'] = (q, m) => picked(q, o => isName(o)) && capsRight(m.s) ? '' : 'the names are not the ones marked';
  V['g2-right-cap'] = q => { const ok = q.options.map(text).filter(capsRight); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one sentence with the right capitals'; };
  V['g2-proper-pick'] = q => picked(q, o => PLACES.has(o)) ? '' : 'the names are not the ones marked';
  V['g2-day-pick'] = q => picked(q, o => DAYS.has(big(o))) ? '' : 'the days and months are not the ones marked';
  V['g2-cap-tf'] = (q, m) => tfOk(q, capsRight(m.shown)) && capsRight(m.s) ? '' : 'true/false or the reason is wrong';
  /* commas in lists */
  V['g2-list'] = q => { const ok = q.options.map(text).filter(o => RIGHT.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one list with the right commas'; };
  V['g2-comma-after'] = (q, m) => mk(q) === items(m.start)[0] ? '' : 'expected the comma after ' + items(m.start)[0];
  V['g2-list-tf'] = (q, m) => tfOk(q, RIGHT.has(m.shown)) ? '' : 'expected ' + RIGHT.has(m.shown);
  V['g2-list-count'] = (q, m) => mk(q) === String(items(m.start).length - 2) ? '' : 'expected ' + (items(m.start).length - 2) + ' commas';
  /* owners */
  V['g2-owner'] = (q, m) => mk(q) === m.o + AP + 's ' + m.t ? '' : 'expected ' + m.o + AP + 's ' + m.t;
  V['g2-owner-means'] = (q, m) => { const [o, t] = m.w.split(AP + 's '); return mk(q) === 'the ' + t + ' that belongs to ' + o ? '' : 'expected the ' + t + ' of ' + o; };
  V['g2-owner-who'] = (q, m) => { const w = m.s.split(AP + 's')[0].split(' '), owner = /^(the|my)$/i.test(w[w.length - 2] || '') ? w.slice(-2).join(' ').replace(/^The/, 'the') : w[w.length - 1];
    return mk(q) === owner ? '' : 'expected ' + owner; };
  V['g2-owner-tf'] = (q, m) => tfOk(q, m.shown.includes(AP + 's ')) ? '' : 'expected ' + m.shown.includes(AP + 's ');
  /* speech marks */
  V['g2-speech'] = (q, m) => { const ok = q.options.map(text).filter(o => speechRight(o, m.who)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one right sentence'; };
  V['g2-says-what'] = q => { const inside = text(q.fig).split(OQ)[1].replace(CQ, ''); return mk(q) === inside ? '' : 'expected ' + inside; };
  V['g2-mark-place'] = (q, m) => { const w = q.tiles.map(text), i = w.indexOf('said,'); return w[i - 1] === m.who && mk(q) === w[i + 1] ? '' : 'expected the word after "said,"'; };
  V['g2-speech-tf'] = (q, m) => tfOk(q, speechRight(m.shown, m.who)) ? '' : 'true/false or the reason is wrong';
})();
