/* Decodable readers: checks that the stories use every Dolch sight word (run by run.js; or alone:  node dolch.js  ).
   The Dolch lists (1948, public domain) are the 220 most common "service" words in children's books, by level, and 95 common nouns.
   A word counts when it is in the title or passage of any story. NOT_YET lists the words no story uses so far: the check fails if a
   word is missing and not listed there, or if a listed word is now used (take it off the list), so the list can only shrink. */
const DOLCH = {
  'pre-primer': 'a and away big blue can come down find for funny go help here I in is it jump little look make me my not one play red run said see the three to two up we where yellow you',
  primer: 'all am are at ate be black brown but came did do eat four get good have he into like must new no now on our out please pretty ran ride saw say she so soon that there they this too under want was well went what white who will with yes',
  'Grade 1': 'after again an any as ask by could every fly from give going had has her him his how just know let live may of old once open over put round some stop take thank them then think walk were when',
  'Grade 2': "always around because been before best both buy call cold does don't fast first five found gave goes green its made many off or pull read right sing sit sleep tell their these those upon us use very wash which why wish work would write your",
  'Grade 3': 'about better bring carry clean cut done draw drink eight fall far full got grow hold hot hurt if keep kind laugh light long much myself never only own pick seven shall show six small start ten today together try warm',
  nouns: 'apple baby back ball bear bed bell bird birthday boat box boy bread brother cake car cat chair chicken children Christmas coat corn cow day dog doll door duck egg eye farm farmer father feet fire fish floor flower game garden girl goodbye grass ground hand head hill home horse house kitty leg letter man men milk money morning mother name nest night paper party picture pig rabbit rain ring robin Santa school seed sheep shoe sister snow song squirrel stick street sun table thing time top toy tree watch water way wind window wood'
};
/* not in any story yet: new and rewritten stories bring these in */
const NOT_YET = new Set(('into always been don\'t write together ' +
  'children Christmas cow farmer goodbye Santa').toLowerCase().split(' '));

function check(list) {
  const used = new Set();
  list.forEach(step => [step].concat(step.more || []).forEach(s => {
    ([s.title || ''].concat(s.text || [])).join(' ').toLowerCase().replace(/’/g, "'").replace(/[^a-z']+/g, ' ').split(' ')
      .forEach(w => used.add(w.replace(/^'+|'+$/g, '')));
  }));
  const problems = [];
  Object.entries(DOLCH).forEach(([level, ws]) => ws.split(' ').forEach(w => {
    const lw = w.toLowerCase();
    if (!used.has(lw) && !NOT_YET.has(lw)) problems.push('decodable readers: no story uses the Dolch ' + level + ' word "' + w + '"');
    if (used.has(lw) && NOT_YET.has(lw)) problems.push('decodable readers: a story now uses the Dolch word "' + w + '": take it off NOT_YET in tests/dolch.js');
  }));
  return problems;
}
module.exports = { DOLCH, NOT_YET, check };
if (require.main === module) {
  const path = require('path');
  const pr = check(require('./decodable').load(path.resolve(__dirname, '..')));
  pr.forEach(p => console.log(' - ' + p));
  const all = Object.values(DOLCH).join(' ').split(' ').length;
  console.log('Dolch words: ' + (all - NOT_YET.size) + ' of ' + all + ' used, ' + pr.length + ' problem(s)');
  process.exitCode = pr.length ? 1 : 0;
}
