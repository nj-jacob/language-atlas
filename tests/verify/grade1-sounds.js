/* Grade 1 answer checks: sounds in words (grade1/chapters/sounds.js).
   The checker keeps its own list of the sounds in each word, and works each answer out from it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const SOUNDS = {};
  ('up:u-p at:a-t in:i-n on:o-n it:i-t am:a-m egg:e-g sun:s-u-n map:m-a-p cat:k-a-t dog:d-o-g pig:p-i-g bed:b-e-d cup:k-u-p hat:h-a-t jet:j-e-t mop:m-o-p ' +
    'net:n-e-t rug:r-u-g van:v-a-n web:w-e-b zip:z-i-p lid:l-i-d ten:t-e-n bus:b-u-s fan:f-a-n ship:sh-i-p chin:ch-i-n fish:f-i-sh duck:d-u-k ' +
    'moon:m-oo-n kite:k-igh-t leaf:l-ee-f goose:g-oo-s fox:f-o-k-s box:b-o-k-s ' +
    'frog:f-r-o-g stop:s-t-o-p milk:m-i-l-k hand:h-a-n-d jump:j-u-m-p lamp:l-a-m-p crab:k-r-a-b flag:f-l-a-g sled:s-l-e-d nest:n-e-s-t snack:s-n-a-k ' +
    'drum:d-r-u-m split:s-p-l-i-t stamp:s-t-a-m-p plant:p-l-a-n-t crust:k-r-u-s-t bun:b-u-n red:r-e-d log:l-o-g hen:h-e-n pup:p-u-p lip:l-i-p pin:p-i-n ' +
    'hit:h-i-t nut:n-u-t boss:b-o-s wet:w-e-t hug:h-u-g shin:sh-i-n top:t-o-p pan:p-a-n led:l-e-d lag:l-a-g snap:s-n-a-p nap:n-a-p spot:s-p-o-t pot:p-o-t ' +
    'slip:s-l-i-p trip:t-r-i-p rip:r-i-p clap:k-l-a-p lap:l-a-p spin:s-p-i-n grip:g-r-i-p bland:b-l-a-n-d land:l-a-n-d').split(' ').forEach(x => { const [w, p] = x.split(':'); SOUNDS[w] = p.split('-'); });
  const sl = p => '/' + p + '/';
  const fromFig = q => (text(q.fig).match(/\/[a-z]+\//g) || []).map(s => s.slice(1, -1));
  const wordOf = ps => Object.keys(SOUNDS).filter(w => SOUNDS[w].join('-') === ps.join('-'));
  const at = (w, where) => { const p = SOUNDS[w] || []; return where === 'first' ? p[0] : where === 'last' ? p[p.length - 1] : p.length === 3 ? p[1] : undefined; };
  const picName = h => { const d = document.createElement('div'); d.innerHTML = h; const s = d.querySelector('svg.wpic'); return s && s.getAttribute('aria-label'); };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const changed = (from, out, into) => { const p = SOUNDS[from]; return p && p.indexOf(out) >= 0 ? wordOf(p.map(x => (x === out ? into : x))) : []; };

  V['g1-isolate'] = (q, m) => {
    const p = SOUNDS[m.word]; if (!p) return 'no sounds known for ' + m.word;
    if (m.where === 'middle' && p.length !== 3) return 'middle sound asked of a word without exactly 3 sounds';
    return mk(q) === sl(at(m.word, m.where)) && text(q.q).includes(m.word) ? '' : 'expected ' + sl(at(m.word, m.where)) + ' as the ' + m.where + ' sound of ' + m.word;
  };
  V['g1-same-sound'] = (q, m) => { const s = at(m.word, m.where), ok = q.options.map(text).filter(o => o !== m.word && at(o, m.where) === s);
    return s && ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one word with ' + sl(s) + ' as its ' + m.where + ' sound'; };
  V['g1-pic-sound'] = (q, m) => { const names = q.tiles.map(picName), ok = names.filter(n => at(n, m.where) === m.sound);
    return ok.length === 1 && names[q.answer] === ok[0] && text(q.q).includes(sl(m.sound)) ? '' : 'expected the one picture with ' + sl(m.sound); };
  V['g1-odd-sound'] = (q, m) => { const t = q.tiles.map(text), odd = t.filter(w => t.filter(x => at(x, m.where) === at(w, m.where)).length === 1);
    return t.every(w => at(w, m.where)) && odd.length === 1 && mk(q) === odd[0] ? '' : 'expected the one word with a different ' + m.where + ' sound'; };
  V['g1-sound-tf'] = (q, m) => { const right = at(m.word, m.where) === m.s; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-blend'] = q => { const w = wordOf(fromFig(q)); return w.length === 1 && mk(q) === w[0] ? '' : 'the sounds ' + fromFig(q).join(' ') + ' make ' + w.join('/'); };
  V['g1-blend-pic'] = q => { const w = wordOf(fromFig(q)); return w.length === 1 && picName(q.tiles[q.answer]) === w[0] ? '' : 'expected the picture of ' + w.join('/'); };
  V['g1-onset'] = (q, m) => { const w = mk(q); return SOUNDS[w] && SOUNDS[w][0] === m.s && w.slice(1) === m.rest && q.options.filter(o => text(o) === m.s + m.rest || text(o) === w).length === 1 ? '' : 'expected ' + m.s + m.rest; };
  V['g1-blend-tf'] = (q, m) => { const w = wordOf(fromFig(q)), right = w.length === 1 && w[0] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-count'] = (q, m) => SOUNDS[m.word] && mk(q) === String(SOUNDS[m.word].length) ? '' : 'expected ' + (SOUNDS[m.word] || []).length + ' sounds in ' + m.word;
  V['g1-count-which'] = (q, m) => { const ok = q.options.map(text).filter(o => SOUNDS[o] && SOUNDS[o].length === m.n); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one word with ' + m.n + ' sounds'; };
  V['g1-count-tf'] = (q, m) => { const right = (SOUNDS[m.word] || []).length === m.n; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-segment'] = (q, m) => q.items.map(text).join(' ') === (SOUNDS[m.word] || []).map(sl).join(' ') ? '' : 'the sounds of ' + m.word + ' are not in order';
  V['g1-change'] = (q, m) => { const w = changed(m.from, m.out, m.into); return w.length === 1 && mk(q) === w[0] ? '' : 'changing gives ' + w.join('/'); };
  V['g1-change-tf'] = (q, m) => { const w = changed(m.from, m.out, m.into), right = w.length === 1 && w[0] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-drop'] = (q, m) => { const p = SOUNDS[m.from], w = p && p[0] === m.out ? wordOf(p.slice(1)) : []; return w.length === 1 && mk(q) === w[0] ? '' : 'taking away ' + sl(m.out) + ' gives ' + w.join('/'); };
  V['g1-which-changed'] = (q, m) => { const a = SOUNDS[m.from], b = SOUNDS[m.to], diff = a && b && a.length === b.length ? a.filter((x, i) => x !== b[i]) : [];
    return diff.length === 1 && mk(q) === sl(diff[0]) ? '' : 'expected ' + diff.map(sl).join(' '); };
})();
