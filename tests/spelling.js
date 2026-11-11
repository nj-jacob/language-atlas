/* Spelling path: checks every step's words, sorts, endings and dictation (run by run.js; or alone:  node spelling.js  ).
   It works the answers out again on its own, without the engine:
   - each word's sounds spell the word, each sound is a known spelling, and the word uses the step's new spelling
     (a step with beats: true splits its words into beats, each with a vowel, instead of sounds; on the long words step, 3 or more);
   - every word, sort word, review word and dictation sentence can be sounded out by that step (the decodable readers'
     own checker, decodable.js, which splits words into spellings by itself), or is a heart word taught by then;
   - each sort word goes in the bin the checker finds in it (its spelling; open or closed; y as /eye/ in one beat, /ee/ in two;
     soft or hard c; the prefix it starts with or the suffix it ends with);
   - each ending makes the word that the spelling rules below give (written here, apart from tools.js).
   Grades 4 to 8 (parts: true) are not decodable reader steps. Their words split into word parts that join to make the word, one of
   them a focus part; every word in a word family is a front, the root and an end from its lists; every proofreading mistake is fixed
   with a word from this step or an earlier one; review words come from earlier steps. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const decodable = require('./decodable');

/* the steps, from assets/engine/spellbank.js */
function load(root) {
  const list = [];
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets', 'engine', 'spellbank.js'), 'utf8'), { Atlas: { spelling: { add: p => list.push(p) } } });
  return list;
}
/* adding an ending (or a prefix, written un-): y to i after a consonant (not before i), drop a silent e before a vowel, double one last consonant after one short vowel in one beat,
   or in a longer word whose last beat is stressed (stress: 1). The prefix in- becomes im- before b, m and p, il- before l, ir- before r. */
function addEnding(base, suf, stress) {
  if (suf === 'in-') return ({ b: 'im', m: 'im', p: 'im', l: 'il', r: 'ir' }[base[0]] || 'in') + base;
  if (/-$/.test(suf)) return suf.slice(0, -1) + base;
  const vowelFirst = /^[aeiouy]/.test(suf);
  if (stress && vowelFirst && /[^aeiou][aeiou][bcdfgklmnprstvz]$/.test(base)) return base + base.slice(-1) + suf;
  if (/[^aeiou]y$/.test(base) && suf[0] !== 'i') return base.slice(0, -1) + 'i' + suf;
  if (vowelFirst && /[^aeiou]e$/.test(base)) return base.slice(0, -1) + suf;
  if (vowelFirst && /^[^aeiou]*[aeiou][bcdfgklmnprstvz]$/.test(base)) return base + base.slice(-1) + suf;
  return base + suf;
}
/* known pairs, so the rules above are checked too */
const KNOWN = { 'un-+lock': 'unlock', 'dis-+like': 'dislike', 'hope+ful': 'hopeful', 'happy+ness': 'happiness', 'fame+ous': 'famous', 'hop+ing': 'hopping', 'hope+ing': 'hoping', 'cry+ed': 'cried', 'cry+ing': 'crying', 'play+ed': 'played', 'snow+y': 'snowy', 'tap+ing': 'tapping', 'tape+ing': 'taping', 'happy+er': 'happier', 'fight+ing': 'fighting',
  'in-+possible': 'impossible', 'in-+legal': 'illegal', 'in-+regular': 'irregular', 'in-+visible': 'invisible', 'begin+ing+1': 'beginning', 'visit+ing': 'visiting', 'prefer+ed+1': 'preferred', 'refer+ence': 'reference' };
/* the spellings a sound box may hold */
const UNITS = new Set(('b c d f g h j k l m n p r s t v w x y z a e i o u sh ch th wh ck ng qu ai ay ee ea ey oa ow oe ie igh a_e e_e i_e o_e u_e ' +
  'pp nn ll ss ff zz tt dd gg mm bb rr tch dge all ang ing ong ung ank ink onk unk oll ull ph ar or ore er ir ur air are ear our ' +
  'oo ou oi oy au aw augh ough ew ue ui eigh ei ind ild old olt ost kn wr gn mb gh tion sion ' +
  'ed es un re dis mis pre ful less ly est ness ish able').split(' '));
/* the units spelled out: a silent-e unit puts its e after the next unit */
function spell(u) {
  let out = '', e = false;
  u.forEach((x, i) => {
    const m = /^(\w)_e$/.exec(x);
    if (m) { out += m[1]; e = true; return; }
    out += x;
    if (e && /_e$/.test(u[i - 1])) { out += 'e'; e = false; }
  });
  return out + (e ? 'e' : '');
}
function syllables(w) { return (w.match(/[aeiouy]+/g) || []).length - (/[^aeiouy]e$/.test(w) ? 1 : 0); }

const BANDS = ['K', '1', '2', '3', '4', '5', '6', '7', '8'];
function check(list, root) {
  const problems = [], order = decodable.STEPS.map(s => s[0]);
  const hearts = new Set(), readers = decodable.load(root), ids = new Set();
  let last = -1, first = true, band = 0;
  list.forEach((p, i) => {
    const where = 'spelling step ' + p.id, at = order.indexOf(p.id);
    if (ids.has(p.id)) problems.push(where + ': is listed twice');
    ids.add(p.id);
    if (BANDS.indexOf(p.band) < band) problems.push(where + ': its grade (band) comes before the step above it');
    band = Math.max(band, BANDS.indexOf(p.band));
    if (+p.band >= 4) { later(p, list.slice(0, i), problems); return; }
    if (at < 0) { problems.push(where + ': is not a decodable reader step (tests/decodable.js lists them)'); return; }
    if (at <= last) problems.push(where + ': is out of order (the steps follow the decodable readers)');
    last = at;
    readers.slice(0, at + 1).forEach(r => (r.heart || []).forEach(h => hearts.add(h.toLowerCase())));
    (p.heart || []).forEach(h => hearts.add(h.toLowerCase()));
    const fresh = decodable.REVIEW[p.id] || decodable.STEPS[at][1];
    /* the word can be sounded out by this step in a way that uses the step's new spelling */
    const uses = (w, u) => fresh.includes('long-words') ? u.length >= 3 : decodable.ways(w).some(r => r.at <= at && r.used.some(x => fresh.includes(x)));
    const ok = w => { const lw = w.toLowerCase(); if (hearts.has(lw)) return true; const r = decodable.when(lw); return r && r.at <= at; };
    ['name', 'group', 'rule', 'tip', 'mistake', 'sentence'].forEach(f => { if (!p[f]) problems.push(where + ': needs ' + f); });
    if (!Array.isArray(p.focus) || !p.focus.length) problems.push(where + ': needs its focus spellings');
    if (!Array.isArray(p.heart) || !p.heart.length) problems.push(where + ': needs a heart word');
    if (!Array.isArray(p.words) || p.words.length < 8 || p.words.length > 10) problems.push(where + ': needs 8 to 10 words');
    (p.words || []).forEach(([w, units, clue]) => {
      const u = String(units).split(' '), lw = w.toLowerCase();
      if (p.beats) {
        if (u.length < 2 || u.some(x => !/^[a-z]+$/.test(x) || !/[aeiouy]/.test(x))) problems.push(where + ' "' + w + '": needs 2 or more beats, each with a vowel');
        if (u.join('') !== lw) problems.push(where + ' "' + w + '": its beats spell ' + u.join('') + ', not ' + w);
      } else {
        u.filter(x => !UNITS.has(x.toLowerCase())).forEach(x => problems.push(where + ' "' + w + '": "' + x + '" is not a spelling a sound box can hold'));
        if (spell(u).toLowerCase() !== lw) problems.push(where + ' "' + w + '": its sounds spell ' + spell(u) + ', not ' + w);
      }
      const r = decodable.when(lw);
      if (!r || r.at > at) problems.push(where + ' "' + w + '": cannot be sounded out by this step');
      else if (!uses(lw, u)) problems.push(where + ' "' + w + '": does not use this step\'s new spelling');
      if (!/^[^_]*___[^_]*$/.test(clue || '')) problems.push(where + ' "' + w + '": its clue needs one blank (___)');
      else if (new RegExp('\\b' + w + '\\b', 'i').test(clue)) problems.push(where + ' "' + w + '": its clue gives the word away');
    });
    if (p.sort) {
      const bins = p.sort.bins.map(b => b[0]), items = p.sort.items.split(' ').map(x => x.split('/'));
      if (!p.sort.q || bins.length < 2) problems.push(where + ': a sort needs a question and 2 or more bins');
      p.sort.bins.forEach(b => { if (b[2] && !['start', 'middle', 'end'].includes(b[2])) problems.push(where + ': a bin goes at the start, middle or end'); });
      items.forEach(([w, b]) => {
        const r = decodable.when(w);
        if (!ok(w)) { problems.push(where + ' sort "' + w + '": cannot be sounded out by this step'); return; }
        let right;
        if (bins.every(x => /-$/.test(x))) right = bins.filter(x => w.startsWith(x.slice(0, -1))).sort((x, y) => y.length - x.length)[0] || null;
        else if (bins.every(x => /^-/.test(x))) right = bins.filter(x => w.endsWith(x.slice(1))).sort((x, y) => y.length - x.length)[0] || null;
        else if (bins.includes('soft-c')) right = r.used.includes('soft-c') ? 'soft-c' : 'hard-c';
        else if (bins.includes('open')) right = r.used.includes('open') ? 'open' : 'closed';
        else if (bins.includes('y-eye')) right = syllables(w) === 1 ? 'y-eye' : 'y-ee';
        else { const hit = bins.filter(x => r.used.includes(x)); right = hit.length === 1 ? hit[0] : null; }
        if (right === null) problems.push(where + ' sort "' + w + '": uses none or more than one of the bins\' spellings');
        else if (bins[+b] !== right) problems.push(where + ' sort "' + w + '": goes in ' + right + ', not ' + bins[+b]);
      });
    }
    (p.endings || []).forEach(([b, s]) => {
      if (!ok(b)) problems.push(where + ' ending "' + b + '": cannot be sounded out by this step');
      const want = KNOWN[b + '+' + s];
      if (want && addEnding(b, s) !== want) problems.push('the spelling check itself: ' + b + ' + ' + s + ' should be ' + want);
    });
    if (!Array.isArray(p.review) || p.review.length !== (first ? 0 : 2)) problems.push(where + ': needs ' + (first ? 'no review words (it is the first step)' : '2 review words for the dictation'));
    first = false;
    (p.review || []).forEach(w => { const r = decodable.when(w); if (!r || r.at >= at) problems.push(where + ' review "' + w + '": must be a word from an earlier step'); });
    (p.sounds || []).forEach(s => { if (!UNITS.has(s)) problems.push(where + ': "' + s + '" is not a spelling for the dictation warm-up'); });
    const bad = decodable.words(p.sentence || '').filter(w => !ok(w));
    if (bad.length) problems.push(where + ': its dictation sentence uses words the child cannot spell yet: ' + bad.join(', '));
  });
  return problems;
}
/* a Grades 4 to 8 step */
const bare = x => x.toLowerCase().replace(/[^a-z']/g, '');
function later(p, before, problems) {
  const where = 'spelling step ' + p.id, earlier = new Set(before.map(s => s.words.map(w => w[0].toLowerCase())).flat());
  const mine = new Set((p.words || []).map(w => w[0].toLowerCase())), focus = (p.focus || []).map(bare);
  ['name', 'group', 'rule', 'tip', 'mistake', 'sentence'].forEach(f => { if (!p[f]) problems.push(where + ': needs ' + f); });
  if (!p.parts) problems.push(where + ': a Grades 4 to 8 step splits its words into word parts (parts: true)');
  if (!Array.isArray(p.focus) || !p.focus.length) problems.push(where + ': needs its focus parts');
  if (!Array.isArray(p.heart) || !p.heart.length) problems.push(where + ': needs a heart word');
  if (!Array.isArray(p.extra) || p.extra.length < 3) problems.push(where + ': needs 3 or more extra tiles for the tray');
  if (!Array.isArray(p.words) || p.words.length < 8 || p.words.length > 10) problems.push(where + ': needs 8 to 10 words');
  (p.words || []).forEach(([w, units, clue]) => {
    const u = String(units).split(' '), lw = w.toLowerCase();
    if (u.length < 2 || u.some(x => !/^[a-z']+$/.test(x))) problems.push(where + ' "' + w + '": needs 2 or more parts, in small letters');
    if (u.join('') !== lw) problems.push(where + ' "' + w + '": its parts spell ' + u.join('') + ', not ' + w);
    if (!u.some(x => focus.includes(x))) problems.push(where + ' "' + w + '": none of its parts is one of the step\'s focus parts (' + focus.join(', ') + ')');
    if (!/^[^_]*___[^_]*$/.test(clue || '')) problems.push(where + ' "' + w + '": its clue needs one blank (___)');
    else if (new RegExp('\\b' + w + '\\b', 'i').test(clue)) problems.push(where + ' "' + w + '": its clue gives the word away');
  });
  if (p.sort) {
    const bins = p.sort.bins.map(b => b[0]), items = p.sort.items.split(' ').map(x => x.split('/'));
    if (!p.sort.q || bins.length < 2) problems.push(where + ': a sort needs a question and 2 or more bins');
    items.forEach(([w, b]) => {
      let hit;
      if (bins.every(x => /-$/.test(x))) hit = bins.filter(x => w.startsWith(x.slice(0, -1)));
      else if (bins.every(x => /^-/.test(x))) hit = bins.filter(x => w.endsWith(x.slice(1)));
      else hit = bins.filter(x => w.includes(x));
      hit = hit.filter(x => !hit.some(y => y !== x && y.includes(x.replace(/-/g, ''))));
      if (hit.length !== 1) problems.push(where + ' sort "' + w + '": has none or more than one of the bins\' spellings');
      else if (bins[+b] !== hit[0]) problems.push(where + ' sort "' + w + '": goes in ' + hit[0] + ', not ' + bins[+b]);
    });
  }
  if (p.family) {
    const f = p.family, pre = f.pre.split(' '), suf = f.suf.split(' '), words = f.words.split(' '), used = new Set();
    if (!f.root || !f.means || words.length < 5) problems.push(where + ': a word family needs a root, its meaning and 5 or more words');
    words.forEach(w => {
      const ways = ['', ...pre].map(a => ['', ...suf].map(z => [a, z])).flat().filter(([a, z]) => a + f.root + z === w);
      if (!ways.length) problems.push(where + ' family "' + w + '": is not a front, ' + f.root + ' and an end from the lists');
      ways.forEach(([a, z]) => { used.add('pre:' + a); used.add('suf:' + z); });
    });
    pre.forEach(a => { if (!used.has('pre:' + a)) problems.push(where + ': the front ' + a + '- is in no family word'); });
    suf.forEach(z => { if (!used.has('suf:' + z)) problems.push(where + ': the end -' + z + ' is in no family word'); });
  }
  if (p.proof) {
    const fixes = [...p.proof.matchAll(/\{([^|}]+)\|([^}]+)\}/g)];
    if (fixes.length < 3) problems.push(where + ': proofreading needs 3 or more mistakes');
    if (/[{}|]/.test(p.proof.replace(/\{[^|}]+\|[^}]+\}/g, ''))) problems.push(where + ': proofreading has a broken {wrong|right} mark');
    fixes.forEach(([, a, b]) => {
      if (bare(a) === bare(b)) problems.push(where + ' proofreading "' + a + '": is not a mistake');
      if (!mine.has(bare(b)) && !earlier.has(bare(b)) && !(p.heart || []).map(bare).includes(bare(b))) problems.push(where + ' proofreading "' + b + '": the fix is not a word from this step or an earlier one');
    });
  }
  (p.endings || []).forEach(([b, s, st]) => {
    const want = KNOWN[b + '+' + s + (st ? '+1' : '')];
    if (want && addEnding(b, s, st) !== want) problems.push('the spelling check itself: ' + b + ' + ' + s + ' should be ' + want);
  });
  if (!Array.isArray(p.review) || p.review.length !== 2) problems.push(where + ': needs 2 review words for the dictation');
  (p.review || []).forEach(w => { if (!earlier.has(w.toLowerCase())) problems.push(where + ' review "' + w + '": must be a word from an earlier step'); });
  if (p.sounds) problems.push(where + ': a Grades 4 to 8 step has no warm-up sounds');
}
/* every ending's word, for the browser check to compare with the engine */
function endings(list) { return list.map(p => (p.endings || []).map(([b, s, st]) => [p.id, b, s, addEnding(b, s, st), st])).flat(); }

module.exports = { load, check, endings, addEnding };
if (require.main === module) {
  const root = path.resolve(__dirname, '..'), list = load(root), pr = check(list, root);
  pr.forEach(p => console.log(' - ' + p));
  console.log(list.length + ' steps, ' + pr.length + ' problem(s)');
  process.exitCode = pr.length ? 1 : 0;
}
