/* Grade 1 answer checks: sounds in words (grade1/chapters/sounds.js).
   The checker keeps its own list of the sounds in each word, and works each answer out from it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const SOUNDS = {};
  ('up:u-p at:a-t in:i-n on:o-n it:i-t am:a-m sun:s-u-n map:m-a-p cat:k-a-t dog:d-o-g pig:p-i-g bed:b-e-d cup:k-u-p hat:h-a-t jet:j-e-t mop:m-o-p ' +
    'net:n-e-t rug:r-u-g van:v-a-n web:w-e-b zip:z-i-p lid:l-i-d ten:t-e-n bus:b-u-s fan:f-a-n ship:sh-i-p chin:ch-i-n fish:f-i-sh duck:d-u-k ' +
    'frog:f-r-o-g stop:s-t-o-p milk:m-i-l-k hand:h-a-n-d jump:j-u-m-p lamp:l-a-m-p crab:k-r-a-b flag:f-l-a-g sled:s-l-e-d nest:n-e-s-t snack:s-n-a-k ' +
    'drum:d-r-u-m split:s-p-l-i-t stamp:s-t-a-m-p plant:p-l-a-n-t crust:k-r-u-s-t bun:b-u-n red:r-e-d log:l-o-g hen:h-e-n pup:p-u-p lip:l-i-p pin:p-i-n ' +
    'hit:h-i-t nut:n-u-t').split(' ').forEach(x => { const [w, p] = x.split(':'); SOUNDS[w] = p.split('-'); });
  const sl = p => '/' + p + '/';
  const fromFig = q => (text(q.fig).match(/\/[a-z]+\//g) || []).map(s => s.slice(1, -1));
  const wordOf = ps => Object.keys(SOUNDS).filter(w => SOUNDS[w].join('-') === ps.join('-'));

  V['g1-isolate'] = (q, m) => {
    const p = SOUNDS[m.word]; if (!p) return 'no sounds known for ' + m.word;
    const want = sl(m.where === 'first' ? p[0] : m.where === 'last' ? p[p.length - 1] : p[1]);
    if (m.where === 'middle' && p.length !== 3) return 'middle sound asked of a word without exactly 3 sounds';
    return H.marked(q) === want && text(q.q).includes(m.word) ? '' : 'expected ' + want + ' as the ' + m.where + ' sound of ' + m.word;
  };
  V['g1-same-first'] = (q, m) => {
    const f = SOUNDS[m.word][0], ok = q.options.map(text).filter(o => SOUNDS[o] && SOUNDS[o][0] === f && o !== m.word);
    return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the one word starting with ' + sl(f);
  };
  V['g1-blend'] = q => { const w = wordOf(fromFig(q)); return w.length === 1 && H.marked(q) === w[0] ? '' : 'the sounds ' + fromFig(q).join(' ') + ' make ' + w.join('/'); };
  V['g1-count'] = (q, m) => SOUNDS[m.word] && H.marked(q) === String(SOUNDS[m.word].length) ? '' : 'expected ' + (SOUNDS[m.word] || []).length + ' sounds in ' + m.word;
  V['g1-segment'] = (q, m) => q.items.map(text).join(' ') === (SOUNDS[m.word] || []).map(sl).join(' ') ? '' : 'the sounds of ' + m.word + ' are not in order';
  V['g1-change'] = (q, m) => {
    const p = SOUNDS[m.from]; if (!p || p.indexOf(m.out) < 0) return m.from + ' has no sound ' + m.out;
    const w = wordOf(p.map(x => (x === m.out ? m.into : x)));
    return w.length === 1 && H.marked(q) === w[0] ? '' : 'changing gives ' + w.join('/');
  };
})();
