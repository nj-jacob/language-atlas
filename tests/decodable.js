/* Decodable readers: checks that every page can really be sounded out (run by run.js; or alone:  node decodable.js  ).
   This works the phonics out again, on its own, from the steps listed here (not from the engine's data):
   it splits each word into its spelling units (sh, ck, a_e, igh ...) and its endings (-s, -ed, -ing ...), and a word is
   decodable at a step when every unit and every rule it needs (a blend, a second syllable, an open syllable ...) has been
   taught at that step or before. Words that cannot be sounded out yet must be heart words taught by then.
   Each page must: be in the order below; use only decodable words and taught heart words in its title, passage and questions;
   have 8 or more warm-up words, each using that step's new unit or rule; and use 5 or more different words with it in the passage. */
const fs = require('fs'), path = require('path'), vm = require('vm');

const CONS = 'b c d f g h j k l m n p r s t v w x y z'.split(' ');
/* the steps, in teaching order, and what each one teaches */
const STEPS = [
  ['short-a', ['a'].concat(CONS)], ['short-i', ['i']], ['short-o', ['o']], ['short-u', ['u']], ['short-e', ['e']],
  ['short-mix', ['qu']], ['sh', ['sh']], ['ch', ['ch']], ['th', ['th']], ['wh', ['wh']], ['ck', ['ck']],
  ['floss', ['ff', 'll', 'ss', 'zz']], ['all', ['all']], ['ng', ['ang', 'ing', 'ong', 'ung']], ['nk', ['ank', 'ink', 'onk', 'unk']],
  ['plural-s', ['+s']], ['blend-start', ['blend-start']], ['blend-end', ['blend-end']], ['blend-three', ['blend-three']],
  ['suffix-ed', ['+ed']], ['suffix-ing', ['+ing']], ['suffix-es', ['+es']], ['tch', ['tch']], ['dge', ['dge']],
  ['two-closed', ['two-syllables']], ['a-e', ['a_e']], ['i-e', ['i_e']], ['o-e', ['o_e']], ['u-e', ['u_e', 'e_e']],
  ['open', ['open']], ['y-vowel', ['y-vowel']], ['soft-cg', ['soft-c', 'soft-g']],
  ['ar', ['ar']], ['or', ['or', 'ore']], ['er-ir-ur', ['er', 'ir', 'ur']],
  ['ai-ay', ['ai', 'ay']], ['ee-ea', ['ee', 'ea', 'ey']], ['oa-ow', ['oa', 'ow', 'oe']], ['igh-ie', ['igh', 'ie']],
  ['oo-moon', ['oo']], ['oo-book', ['oo-book']], ['ou-ow', ['ou']], ['oi-oy', ['oi', 'oy']], ['au-aw', ['au', 'aw']], ['ew-ue', ['ew', 'ue']],
  ['cle', ['-le']], ['kind-old', ['ind', 'ild', 'old', 'olt']], ['silent', ['kn', 'wr', 'gn', 'mb']],
  ['prefix', ['un+', 're+']], ['suffix-more', ['+er', '+est', '+ful', '+less', '+ly']]
];
/* steps that review earlier units (no new unit to find): their warm-up words must use the units they name */
const REVIEW = { 'short-mix': ['a', 'e', 'i', 'o', 'u'], 'oo-book': ['oo'] };
const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const UNITS = [].concat(...STEPS.map(s => s[1])).filter(u => /^[a-z]+$/.test(u) && !CONS.includes(u) && !VOWELS.includes(u));
/* units that sound a vowel (a syllable each) */
const VOWEL_UNITS = new Set(['a', 'e', 'i', 'o', 'u', 'all', 'ang', 'ing', 'ong', 'ung', 'ank', 'ink', 'onk', 'unk', 'ar', 'or', 'ore', 'er', 'ir', 'ur',
  'ai', 'ay', 'ee', 'ea', 'ey', 'oa', 'ow', 'oe', 'igh', 'ie', 'oo', 'ou', 'oi', 'oy', 'au', 'aw', 'ew', 'ue', 'ind', 'ild', 'old', 'olt']);
const CLE = /(b|c|d|f|g|k|p|t|z)le$/;

/* split a word (no endings) into units, longest first. Returns the units and the rules it needs, or null. */
function units(w) {
  const out = [], need = new Set();
  let s = w, tail = null;
  if (CLE.test(s) && s.length > 3) { tail = s.slice(-3); s = s.slice(0, -3); need.add('-le'); }
  let i = 0;
  while (i < s.length) {
    let u = null;
    for (const len of [3, 2]) {
      const c = s.slice(i, i + len);
      if (!UNITS.includes(c)) continue;
      if (c === 'gn' && i > 0) continue;
      if (c === 'mb' && i + 2 < s.length) continue;
      if ((c === 'kn' || c === 'wr') && i > 0) continue;
      if (c === 'ore' && i + 3 < s.length) continue;
      if (c === 'ie' && i + 2 < s.length) continue;
      if ((c === 'ff' || c === 'll' || c === 'ss' || c === 'zz') && i + 2 < s.length) continue;
      u = c; break;
    }
    u = u || s[i];
    if (!/^[a-z]+$/.test(u)) return null;
    out.push(u); i += u.length;
  }
  /* silent e: a_e (vowel, one consonant, e at the end); ce, ge at the end (soft c, g) */
  const n = out.length;
  if (n >= 3 && out[n - 1] === 'e' && VOWELS.includes(out[n - 3]) && !VOWEL_UNITS.has(out[n - 2]) && out[n - 2] !== 'e') {
    out[n - 3] = out[n - 3] + '_e'; out.pop();
    if (out[n - 2] === 'c') need.add('soft-c');
    if (out[n - 2] === 'g') need.add('soft-g');
  } else if (n >= 2 && out[n - 1] === 'e' && (out[n - 2] === 'c' || out[n - 2] === 'g') && out.slice(0, -2).some(x => VOWEL_UNITS.has(x) || /_e$/.test(x))) {
    out.pop(); need.add(out[n - 2] === 'c' ? 'soft-c' : 'soft-g');
  }
  /* an e after two consonants (solve, horse) is not a pattern taught here */
  const m = out.length;
  if (m >= 3 && out[m - 1] === 'e' && !VOWEL_UNITS.has(out[m - 2]) && out.slice(0, -2).some(x => VOWEL_UNITS.has(x) || /_e$/.test(x))) return null;
  const next = k => out[k + 1] || '', vowelNext = k => VOWEL_UNITS.has(next(k)) || /_e$/.test(next(k));
  for (let k = 0; k < out.length; k++) {
    const u = out[k];
    if (u === 'c' && /^[eiy]/.test(next(k))) need.add('soft-c');
    /* y is a consonant before a vowel (yes), a vowel after one (my, happy); w only before a vowel (wet, swim); gh and ph are not taught */
    if (u === 'y' && !vowelNext(k)) { if (k === 0) return null; out[k] = 'y-vowel'; }
    if (u === 'w' && !vowelNext(k)) return null;
    if ((u === 'g' || u === 'p') && next(k) === 'h') return null;
  }
  if (tail) out.push(tail);
  const isV = u => VOWEL_UNITS.has(u) || /_e$/.test(u) || u === 'y-vowel' || CLE.test(u);
  const vs = out.map(isV), count = vs.filter(Boolean).length;
  if (!count) return null;
  /* two vowel units side by side do not make sense here (lion, poem): leave such words out */
  for (let k = 1; k < out.length; k++) if (vs[k] && vs[k - 1] && !CLE.test(out[k]) && /[aeiouy]$/.test(out[k - 1].replace(/_e$/, 'e'))) return null;
  if (count > 1) need.add('two-syllables');
  /* a lone vowel letter ending a word or a syllable before -le: open syllable */
  if (VOWELS.includes(out[out.length - 1]) || (tail && VOWELS.includes(out[out.length - 2]))) need.add('open');
  /* consonants together at the start and at the end */
  const first = vs.indexOf(true), last = vs.lastIndexOf(true);
  /* a blend at the start: two consonant units (st, fr); three letters is a three-letter blend (str, spl, and thr, shr, squ) */
  const lead = out.slice(0, first).filter(u => !['kn', 'wr', 'gn'].includes(u)), leadLetters = lead.join('').length;
  if (lead.length >= 2) need.add(leadLetters >= 3 ? 'blend-three' : 'blend-start');
  if (!tail && out.length - 1 - last >= 2) need.add('blend-end');
  return { out, need };
}
/* every reading of a word: as it is, or a base with endings taken off (hopping: hop; baking: bake; boxes: box) */
const SUFFIX = ['s', 'es', 'ed', 'ing', 'er', 'est', 'ful', 'less', 'ly'];
function readings(w, depth) {
  const all = [];
  const u = units(w);
  if (u) all.push({ base: w, out: u.out, need: u.need });
  if (depth > 2) return all;
  for (const p of ['un', 're']) if (w.startsWith(p) && w.length > p.length + 2) readings(w.slice(p.length), depth + 1).forEach(r => all.push({ ...r, need: new Set([...r.need, p + '+']) }));
  if (w.endsWith("'s")) readings(w.slice(0, -2), depth + 1).forEach(r => all.push({ ...r, need: new Set([...r.need, '+s']) }));
  for (const sf of SUFFIX) {
    if (!w.endsWith(sf) || w.length < sf.length + 2) continue;
    const stem = w.slice(0, -sf.length), bases = [stem];
    if (/([bdgmnprt])\1$/.test(stem)) bases.push(stem.slice(0, -1));
    if (/^(ed|ing|er|est)$/.test(sf)) bases.push(stem + 'e');
    if (sf === 'es' && !/(s|x|z|ch|sh)$/.test(stem)) continue;
    if (sf === 's' && /(s|x|z|ch|sh)$/.test(stem)) continue;
    for (const b of bases) readings(b, depth + 1).forEach(r => all.push({ ...r, need: new Set([...r.need, '+' + sf]) }));
  }
  return all;
}
const STEP_OF = {};
STEPS.forEach((s, i) => s[1].forEach(u => { STEP_OF[u] = i; }));
/* the step at which a word becomes decodable (and the units and rules of that reading), or null */
/* words that look regular but are not sounded out the regular way: they must be taught as heart words */
const IRREGULAR = new Set(('a the i of to do two who into onto was put push pull full bull son ton won from come some done gone none one once give have live love glove ' +
  'dove shove move prove lose whose what where there here were are said says they their your you could would should friend does any many again against been ' +
  'both buy eye laugh great break steak bear pear wear head bread dead ready heart earth learn early search heard water want wash watch wasp swan swap squash ' +
  'war warm word work world worm walk talk chalk salt also always almost half calf door floor blood flood pretty busy women sugar sure people only other mother ' +
  'brother another nothing month money honey front wolf island listen often four pour young touch country cousin double trouble soup group through grey obey ' +
  'shoe goes says ski pizza father whole hour our oven open over most post ghost even every very').split(' '));
/* every way the word can be sounded out: the step it needs and the units and rules it uses */
function ways(word) {
  const w = word.toLowerCase();
  if (IRREGULAR.has(w)) return [];
  return readings(w, 0).map(r => r.out.map(u => (CLE.test(u) ? '-le' : u)).concat([...r.need]))
    .filter(used => used.every(u => STEP_OF[u] !== undefined)).map(used => ({ at: Math.max(...used.map(u => STEP_OF[u])), used }));
}
/* the first step at which a word can be sounded out, or null */
function when(word) { return ways(word).sort((x, y) => x.at - y.at)[0] || null; }
function words(text) {
  return String(text).replace(/<[^>]+>/g, ' ').replace(/[’]/g, "'").split(/[\s\-–—]+/).map(t => t.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '')).filter(Boolean);
}
/* words a question may use besides the page's own (a grown-up reads the question with the child) */
const ASK = new Set('circle draw write number yes no who what where why how did does do the a is was in to and it of on for picture words word true not first next last order sentence story'.split(' '));

/* the pages, from assets/engine/decodebank.js (or, while writing, from a folder of one file per page, in name order) */
function load(root, dir) {
  const list = [];
  const ctx = { Atlas: { decodable: { add: p => list.push(p) } } };
  const src = dir ? fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort().map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n')
    : fs.readFileSync(path.join(root, 'assets', 'engine', 'decodebank.js'), 'utf8');
  vm.runInNewContext(src, ctx);
  return list;
}
function check(list) {
  const problems = [], heart = new Set(), order = STEPS.map(s => s[0]);
  const ids = list.map(p => p.id);
  if (ids.join() !== order.join()) problems.push('decodable readers: the steps must be, in order: ' + order.join(', ') + ' (found ' + ids.join(', ') + ')');
  list.forEach(p => {
    const at = order.indexOf(p.id), where = 'decodable reader ' + p.id;
    if (at < 0) return;
    (p.heart || []).forEach(h => heart.add(h.toLowerCase()));
    if (!p.text) { problems.push(where + ': not written yet'); return; }
    if (!Array.isArray(p.qs) || p.qs.length !== 3) problems.push(where + ': needs 3 questions');
    (p.qs || []).forEach((q, i) => {
      if (!/^[BC]\d\.\d$/.test(q.code || '')) problems.push(where + ' question ' + (i + 1) + ': needs its Ontario code (for example C1.1)');
      if (q.k === 'choice' && !(q.opts && q.opts[q.a] !== undefined)) problems.push(where + ' question ' + (i + 1) + ': the answer must be one of the options');
      if (q.k === 'order' && !(q.items && q.show && q.show.slice().sort().join() === q.items.map((x, j) => j).join() && q.show.some((x, j) => x !== j))) problems.push(where + ' question ' + (i + 1) + ': show must list every item, mixed up');
      if (q.k === 'yn' && typeof q.a !== 'boolean') problems.push(where + ' question ' + (i + 1) + ': a yes or no question needs a: true or false');
      if ((q.k === 'draw' || q.k === 'write') && !q.a) problems.push(where + ' question ' + (i + 1) + ': needs a good answer (a) for the grown-up');
    });
    if (!p.tip || !p.title || !Array.isArray(p.pic) || !p.pic.length) problems.push(where + ': needs a title, a picture (pic) and a tip for the grown-up');
    const fresh = STEPS[at][1], review = REVIEW[p.id];
    const ok = (w, extra) => { const lw = w.toLowerCase(); if (heart.has(lw) || (extra && extra.has(lw))) return true; const r = when(w); return r && r.at <= at; };
    const target = w => ways(w).some(r => r.at <= at && r.used.some(u => (review || fresh).includes(u)));
    if (!Array.isArray(p.words) || p.words.length < 8) problems.push(where + ': needs 8 or more warm-up words');
    (p.words || []).forEach(w => { if (!target(w)) problems.push(where + ': warm-up word "' + w + '" ' + (ok(w) ? 'does not use this step\'s ' + (review ? 'sounds' : 'new spelling') : 'cannot be sounded out yet')); });
    const text = [p.title].concat(p.text).join(' ');
    const bad = [...new Set(words(text).filter(w => !ok(w)))];
    if (bad.length) problems.push(where + ': these words cannot be sounded out at this step and are not heart words: ' + bad.join(', '));
    const hits = new Set(words(p.text.join(' ')).filter(target).map(w => w.toLowerCase()));
    if (hits.size < 5) problems.push(where + ': the passage uses only ' + hits.size + ' different words with this step\'s spelling (needs 5 or more)');
    const qbad = [];
    (p.qs || []).forEach(q => [q.q].concat(q.opts || [], q.items || []).forEach(t => words(t).forEach(w => { if (!ok(w, ASK)) qbad.push(w); })));
    if (qbad.length) problems.push(where + ': its questions use words the child cannot read yet: ' + [...new Set(qbad)].join(', '));
  });
  return problems;
}
module.exports = { STEPS, when, check, load, words };
if (require.main === module) {
  const fi = process.argv.indexOf('--frags');
  const list = load(path.resolve(__dirname, '..'), fi > 0 ? process.argv[fi + 1] : null);
  const only = fi === 2 ? process.argv[4] : process.argv[2];
  if (only && process.argv[3] === '--word') { process.argv.slice(4).forEach(w => console.log(w, JSON.stringify(when(w)), when(w) ? STEPS[when(w).at][0] : '-')); process.exit(0); }
  /* node decodable.js [--frags DIR] [id,id,...]: only the problems of those pages */
  const ids = only ? only.split(',') : null;
  const pr = check(list).filter(p => !ids || ids.some(id => p.startsWith('decodable reader ' + id + ':') || p.startsWith('decodable reader ' + id + ' ')));
  pr.forEach(p => console.log(' - ' + p));
  console.log(list.length + ' pages, ' + pr.length + ' problem(s)');
  process.exitCode = pr.length ? 1 : 0;
}
