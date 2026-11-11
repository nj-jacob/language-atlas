/* Heart words: checks every set (run by run.js; or alone:  node hearts.js  ).
   It reads assets/engine/heartbank.js on its own, without the engine, and checks that:
   - the sets go Kindergarten, then Grades 1, 2 and 3, with 1 to 10 words each, and no word comes twice;
   - each word is letters only, with its heart part marked in [ ] once or more, every bracket closed and none empty;
   - every heart word of the decodable readers is here (and is not a word a child can sound out by then, apart from its heart part),
     in a set no later than the reader's grade, so a child meets it in the readers and can learn it here. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const decodable = require('./decodable');

/* readers' heart words that are regular, so they need no heart: a child sounds them out */
const REGULAR = new Set(['and']);

function load(root) {
  const sets = [];
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets', 'engine', 'heartbank.js'), 'utf8'), { Atlas: { hearts: { add: (band, list) => sets.push({ band, list }) } } });
  return sets;
}
function check(sets, root) {
  const problems = [], seen = {}, order = ['K', '1', '2', '3'];
  let last = 0;
  sets.forEach((s, i) => {
    const where = 'heart words set ' + (i + 1), b = order.indexOf(s.band);
    if (b < 0) problems.push(where + ': band must be K, 1, 2 or 3');
    if (b < last) problems.push(where + ': comes after a later grade');
    last = Math.max(last, b);
    const words = String(s.list).split(' ');
    if (!words.length || words.length > 10) problems.push(where + ': needs 1 to 10 words');
    words.forEach(raw => {
      const w = raw.replace(/[[\]]/g, '');
      if (!/^[A-Za-z]+$/.test(w)) problems.push(where + ' "' + raw + '": letters only, with [ ] round the heart part');
      if (!/\[[a-z]+\]/i.test(raw) || /\[\]|\[[^\]]*\[|\][^[]*\]|^[^[]*\]|\[[^\]]*$/.test(raw)) problems.push(where + ' "' + raw + '": needs a heart part in [ ], every bracket closed');
      const lw = w.toLowerCase();
      if (seen[lw]) problems.push(where + ' "' + w + '": is already in set ' + seen[lw]);
      seen[lw] = seen[lw] || i + 1;
    });
  });
  decodable.load(root).forEach(r => (r.heart || []).forEach(h => {
    const lh = h.toLowerCase();
    if (REGULAR.has(lh)) return;
    const at = seen[lh];
    if (!at) problems.push('heart words: "' + h + '" (a heart word in the decodable reader ' + r.id + ') is in no set');
    else if (order.indexOf(sets[at - 1].band) > order.indexOf(r.band)) problems.push('heart words: "' + h + '" is in a set after Grade ' + r.band + ', where the readers use it');
  }));
  return problems;
}
module.exports = { load, check };
if (require.main === module) {
  const root = path.resolve(__dirname, '..'), sets = load(root), pr = check(sets, root);
  pr.forEach(p => console.log(' - ' + p));
  console.log(sets.length + ' sets, ' + sets.reduce((n, s) => n + s.list.split(' ').length, 0) + ' words, ' + pr.length + ' problem(s)');
  process.exitCode = pr.length ? 1 : 0;
}
