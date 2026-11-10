/* Decodable readers: checks that every page can really be sounded out (run by run.js; or alone:  node decodable.js  ).
   This works the phonics out again, on its own, from the steps listed here (not from the engine's data):
   it splits each word into its spelling units (sh, ck, a_e, igh ...) and its endings (-s, -ed, -ing ...), and a word is
   decodable at a step when every unit and every rule it needs (a blend, a second syllable, an open syllable ...) has been
   taught at that step or before. Words that cannot be sounded out yet must be heart words taught by then.
   A step has up to 3 stories (more(id, story) adds one after the first); each story is checked the same way, with the step's
   words, heart words and tip unless it gives its own. A story with blend 'l', 'r' or 's' is about that kind of blend at the start:
   its warm-up and target words start with that kind, and it uses no blend of a kind taught after it (l, then r, then s).
   Each page must: be in the order below; use only decodable words and taught heart words in its title, passage and questions;
   have 8 or more warm-up words, each using that step's new unit or rule; and use 5 or more different words with it in the passage. */
const fs = require('fs'), path = require('path'), vm = require('vm');

const CONS = 'b c d f g h j k l m n p r s t v w x y z'.split(' ');
const VOWELS = ['a', 'e', 'i', 'o', 'u'];
/* the consonant sounds that get a page of their own (qu is on the short vowel review page) */
const CONSONANT_STEPS = 'b c d f g h j k l m n p r s t v w x y z'.split(' ').map(c => ['cons-' + c, []]);
/* the steps, in teaching order, and what each one teaches */
const STEPS = [
  ['short-a', ['a'].concat(CONS)], ['short-i', ['i']], ['short-o', ['o']], ['short-u', ['u']], ['short-e', ['e']],
  ['short-mix', ['qu']],
  /* one page for each consonant sound, once all five short vowels are known (they review sounds taught with short a) */
  ...CONSONANT_STEPS,
  ['sh', ['sh']], ['ch', ['ch']], ['th', ['th']], ['wh', ['wh']], ['ck', ['ck']],
  ['floss', ['ff', 'll', 'ss', 'zz']], ['all', ['all']], ['ng', ['ang', 'ing', 'ong', 'ung']], ['nk', ['ank', 'ink', 'onk', 'unk']],
  ['plural-s', ['+s']], ['blend-start', ['blend-start']], ['blend-end', ['blend-end']], ['blend-three', ['blend-three']],
  ['oll-ull', ['oll', 'ull']], ['suffix-ed', ['+ed']], ['suffix-ing', ['+ing']], ['suffix-es', ['+es']], ['tch', ['tch']], ['dge', ['dge']],
  ['two-closed', ['two-syllables']], ['a-e', ['a_e']], ['i-e', ['i_e']], ['o-e', ['o_e']], ['u-e', ['u_e', 'e_e']],
  ['open', ['open']], ['y-vowel', ['y-vowel']], ['soft-cg', ['soft-c', 'soft-g']], ['ph', ['ph']],
  ['ar', ['ar']], ['or', ['or', 'ore']], ['er-ir-ur', ['er', 'ir', 'ur']], ['air-are', ['air', 'are', 'ear-air']],
  ['ai-ay', ['ai', 'ay']], ['ee-ea', ['ee', 'ea', 'ey']], ['ea-bread', ['ea-short']], ['oa-ow', ['oa', 'ow', 'oe']], ['igh-ie', ['igh', 'ie']],
  ['oo-moon', ['oo']], ['oo-book', ['oo-book']], ['ou-ow', ['ou']], ['oi-oy', ['oi', 'oy']], ['au-aw', ['au', 'aw', 'augh']], ['ew-ue', ['ew', 'ue', 'ui']],
  ['cle', ['-le']], ['kind-old', ['ind', 'ild', 'old', 'olt', 'ost']], ['silent', ['kn', 'wr', 'gn', 'mb']],
  ['prefix', ['un+', 're+', 'dis+', 'in+']], ['suffix-more', ['+er', '+est', '+ful', '+less', '+ly']], ['y-to-i', ['y-i']],
  /* Grade 2: the less common spellings, and more prefixes and suffixes */
  ['er-spellings', ['ar-er', 'or-er', 'our-er']], ['ei-eigh', ['eigh', 'ei', 'ey-a']], ['ou-ough', ['ou-soup', 'ough']],
  ['ch-gh', ['ch-sh', 'ch-k', 'gh']], ['tion', ['tion', 'sion']], ['affix-more', ['mis+', 'pre+', '+ness', '+ish', '+able']],
  /* Grade 3: longer words, the schwa, and Grade 3 prefixes and suffixes */
  ['schwa', ['schwa']], ['long-words', ['long-words']],
  ['prefix-g3', ['over+', 'under+', 'sub+', 'mid+', 'non+', 'trans+', 'inter+', 'anti+', 'post+']], ['suffix-g3', ['+ic', '+al', '+ous', '+ive']]
];
/* words with a schwa (the unstressed "uh" in about, sofa, Canada): they can be read the regular way too, but count for the schwa step */
const SCHWA = new Set(('about ago alone along around away awake asleep ahead across afraid adult banana sofa panda extra Canada camera zebra tuba ' +
  'pasta soda comma gorilla vanilla koala agenda tundra canoe parka Alberta Manitoba Nova Ontario').toLowerCase().split(' '));
/* words whose spelling is read a less common way (bread, roll, school ...): they are read only that way, from the step that teaches it */
const SPECIAL = {};
Object.entries({
  oll: 'roll toll poll troll stroll scroll', ull: 'full pull bull',
  'ea-short': 'head bread dead ready heavy feather weather leather sweater breakfast instead spread thread health breath sweat deaf great break steak',
  ui: 'fruit suit juice bruise cruise suitcase', 'ear-air': 'bear pear wear swear', ost: 'most post host almost poster postcard',
  'ar-er': 'dollar collar cellar cedar polar solar lunar', 'or-er': 'doctor actor visitor tractor sailor motor mirror editor inventor',
  'our-er': 'colour harbour favour flavour labour rumour humour vapour armour odour',
  ei: 'vein rein reindeer veil beige', 'ey-a': 'grey prey they obey hey whey convey survey',
  'ou-soup': 'soup group youth coupon caribou toucan',
  'ch-sh': 'chef machine chalet parachute brochure chute', 'ch-k': 'school chorus echo stomach ache anchor character chemist chord scheme orchestra mechanic',
  gh: 'ghost ghoul spaghetti'
}).forEach(([u, ws]) => ws.split(' ').forEach(w => { SPECIAL[w] = u; }));
/* the spelling units a word is split into (the less common readings above come only from their own words) */
const SPECIAL_UNITS = new Set(Object.values(SPECIAL));
const UNITS = [].concat(...STEPS.map(s => s[1])).filter(u => /^[a-z]+$/.test(u) && !CONS.includes(u) && !VOWELS.includes(u) && !SPECIAL_UNITS.has(u) && u !== 'open');
/* steps that review earlier units (no new unit to find): their warm-up words must use the units they name */
const REVIEW = { 'short-mix': ['a', 'e', 'i', 'o', 'u'], 'oo-book': ['oo'] };
CONSONANT_STEPS.forEach(s => { REVIEW[s[0]] = [s[0].slice(5)]; });
/* a step about longer words: its target words have 3 or more syllables */
const SYLLABLES = { 'long-words': 3 };

/* units that sound a vowel (a syllable each) */
const VOWEL_UNITS = new Set(['a', 'e', 'i', 'o', 'u', 'all', 'ang', 'ing', 'ong', 'ung', 'ank', 'ink', 'onk', 'unk', 'ar', 'or', 'ore', 'er', 'ir', 'ur',
  'ai', 'ay', 'ee', 'ea', 'ey', 'oa', 'ow', 'oe', 'igh', 'ie', 'oo', 'ou', 'oi', 'oy', 'au', 'aw', 'ew', 'ue', 'ind', 'ild', 'old', 'olt',
  'augh', 'air', 'are', 'eigh', 'ough', 'tion', 'sion']);
const CLE = /(b|c|d|f|g|k|p|t|z)le$/;

/* split a word (no endings) into units, longest first. Returns the units and the rules it needs, or null. */
function units(w) {
  if (SPECIAL[w]) return { out: [SPECIAL[w]], need: new Set() };
  const out = [], need = new Set();
  let s = w, tail = null;
  if (CLE.test(s) && s.length > 3) { tail = s.slice(-3); s = s.slice(0, -3); need.add('-le'); }
  let i = 0;
  while (i < s.length) {
    let u = null;
    for (const len of [4, 3, 2]) {
      const c = s.slice(i, i + len);
      if (!UNITS.includes(c)) continue;
      if (c === 'gn' && i > 0) continue;
      if (c === 'mb' && i + 2 < s.length) continue;
      if ((c === 'kn' || c === 'wr') && i > 0) continue;
      if ((c === 'ore' || c === 'are') && i + 3 < s.length) continue;
      if (c === 'ough' && s[i + 4] !== 't') continue;
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
  /* a silent e after a vowel team or r-controlled vowel and one consonant (house, moose, cheese, horse, nurse) */
  const t = out.length;
  if (t >= 3 && out[t - 1] === 'e' && /^[a-z]$/.test(out[t - 2]) && !VOWELS.includes(out[t - 2]) && VOWEL_UNITS.has(out[t - 3]) && out[t - 3].length > 1) out.pop();
  /* an e after two consonants (solve) is not a pattern taught here */
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
  for (let k = 1; k < out.length; k++) if (vs[k] && vs[k - 1] && /^[aeiouy]/.test(out[k]) && /[aeiouy]$/.test(out[k - 1].replace(/_e$/, 'e'))) return null;
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
const SUFFIX = ['s', 'es', 'ed', 'ing', 'er', 'est', 'ful', 'less', 'ly', 'ness', 'ish', 'able', 'ic', 'al', 'ous', 'ive'];
function readings(w, depth) {
  const all = [];
  const u = units(w);
  if (u) all.push({ base: w, out: u.out, need: u.need });
  if (SCHWA.has(w)) all.push({ base: w, out: ['schwa'], need: new Set() });
  if (depth > 2) return all;
  for (const p of ['un', 're', 'dis', 'in', 'mis', 'pre', 'over', 'under', 'sub', 'mid', 'non', 'trans', 'inter', 'anti', 'post']) if (w.startsWith(p) && w.length > p.length + 2) readings(w.slice(p.length), depth + 1).forEach(r => all.push({ ...r, need: new Set([...r.need, p + '+']) }));
  if (w.endsWith("'s")) readings(w.slice(0, -2), depth + 1).forEach(r => all.push({ ...r, need: new Set([...r.need, '+s']) }));
  for (const sf of SUFFIX) {
    if (!w.endsWith(sf) || w.length < sf.length + 2) continue;
    const stem = w.slice(0, -sf.length), bases = [stem];
    /* y changes to i before an ending (cries, tried, happier, happily) */
    if (/i$/.test(stem) && sf !== 'ing' && sf !== 's') readings(stem.slice(0, -1) + 'y', depth + 1).forEach(r => all.push({ ...r, need: new Set([...r.need, '+' + sf, 'y-i']) }));
    if (/([bdgmnprt])\1$/.test(stem)) bases.push(stem.slice(0, -1));
    if (/^(ed|ing|er|est|able|ous|ive|al)$/.test(sf)) bases.push(stem + 'e');
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
const IRREGULAR = new Set(('a the i of to do two who into onto was put push son ton won from come some done gone none one once give have live love glove ' +
  'dove shove move prove lose whose what where there here were are said says their your you could would should friend does any many again against been ' +
  'both buy eye laugh heart earth learn early search heard water want wash watch wasp swan swap squash ' +
  'war warm word work world worm walk talk chalk salt also always almost half calf door floor blood flood pretty busy women sugar sure people only other mother ' +
  'brother another nothing month money honey front wolf island listen often four pour young touch country cousin double trouble through ' +
  'shoe goes says ski pizza father whole hour our oven open over even every very').split(' '));
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

/* about how many syllables a word has: groups of vowel letters, less a silent e at the end (cake 1, Canada 3, little 2) */
function syllables(w) {
  const lw = w.toLowerCase(), n = (lw.match(/[aeiouy]+/g) || []).length;
  return Math.max(1, n - (/[^aeiouyl]e$|[^aeiouy]es$/.test(lw) && !/le$/.test(lw) ? 1 : 0));
}
/* the pages, from assets/engine/decodebank.js (or, while writing, from a folder of one file per page, in name order) */
function load(root, dir) {
  const list = [];
  const more = (id, s) => {
    const step = list.find(p => p.id === id);
    if (!step) { list.push({ id: id + ' (more before its step)' }); return; }
    step.more = (step.more || []).concat([s]);
  };
  const ctx = { Atlas: { decodable: { add: p => list.push(p), more } } };
  const src = dir ? fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort().map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n')
    : fs.readFileSync(path.join(root, 'assets', 'engine', 'decodebank.js'), 'utf8');
  vm.runInNewContext(src, ctx);
  return list;
}
/* the kind of blend a word starts with: l (bl, cl, fl, gl, pl, sl), r (br, cr, dr, fr, gr, pr, tr), s (sc, sk, sm, sn, sp, st, sw), or '' */
function blendKind(w) {
  const lead = (w.toLowerCase().match(/^[^aeiouy]*/) || [''])[0];
  if (lead.length !== 2 || /^(sh|ch|th|wh|qu|kn|wr|gn)$/.test(lead)) return '';
  return lead[1] === 'l' ? 'l' : lead[1] === 'r' ? 'r' : lead[0] === 's' ? 's' : '';
}
const KINDS = ['l', 'r', 's'];
function check(list) {
  const problems = [], heart = new Set(), order = STEPS.map(s => s[0]);
  const ids = list.map(p => p.id);
  if (ids.join() !== order.join()) problems.push('decodable readers: the steps must be, in order: ' + order.join(', ') + ' (found ' + ids.join(', ') + ')');
  list.forEach(step => {
    const at = order.indexOf(step.id);
    if (at < 0) return;
    (step.heart || []).forEach(h => heart.add(h.toLowerCase()));
    const stories = [step].concat((step.more || []).map(s => Object.assign({}, step, s)));
    if (stories.length > 3) problems.push('decodable reader ' + step.id + ': 3 stories at most');
    const titles = stories.map(s => s.title);
    if (new Set(titles).size !== titles.length) problems.push('decodable reader ' + step.id + ': each story needs its own title');
    stories.forEach((p, si) => checkStory(p, si, at, heart, problems));
  });
  return problems;
}
function checkStory(p, si, at, heart, problems) {
  const where = 'decodable reader ' + p.id + (si ? ' story ' + (si + 1) : '');
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
  const kind = p.blend, later = kind ? KINDS.slice(KINDS.indexOf(kind) + 1) : [];
  if (kind && !KINDS.includes(kind)) problems.push(where + ': blend must be l, r or s');
  const long = SYLLABLES[p.id];
  const target = long ? w => ok(w) && syllables(w) >= long
    : w => ways(w).some(r => r.at <= at && r.used.some(u => (review || fresh).includes(u))) && (!kind || blendKind(w) === kind);
  if (!Array.isArray(p.words) || p.words.length < 8) problems.push(where + ': needs 8 or more warm-up words');
  (p.words || []).forEach(w => { if (!target(w)) problems.push(where + ': warm-up word "' + w + '" ' + (ok(w) ? 'does not use this step\'s ' + (review ? 'sounds' : 'new spelling') : 'cannot be sounded out yet')); });
  const text = [p.title].concat(p.text).join(' ');
  const bad = [...new Set(words(text).filter(w => !ok(w)))];
  if (bad.length) problems.push(where + ': these words cannot be sounded out at this step and are not heart words: ' + bad.join(', '));
  const early = [...new Set(words(text).filter(w => later.includes(blendKind(w)) && !heart.has(w.toLowerCase())))];
  if (early.length) problems.push(where + ': these words start with a kind of blend taught in a later story: ' + early.join(', '));
  const hits = new Set(words(p.text.join(' ')).filter(target).map(w => w.toLowerCase()));
  if (hits.size < 5) problems.push(where + ': the passage uses only ' + hits.size + ' different words with this step\'s spelling (needs 5 or more)');
  const qbad = [];
  (p.qs || []).forEach(q => [q.q].concat(q.opts || [], q.items || []).forEach(t => words(t).forEach(w => { if (!ok(w, ASK)) qbad.push(w); })));
  if (qbad.length) problems.push(where + ': its questions use words the child cannot read yet: ' + [...new Set(qbad)].join(', '));
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
  console.log(list.length + ' steps, ' + list.reduce((n, p) => n + 1 + (p.more || []).length, 0) + ' stories, ' + pr.length + ' problem(s)');
  process.exitCode = pr.length ? 1 : 0;
}
