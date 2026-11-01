/* Grade 7 answer checks: thinking critically (grade7/chapters/thinking.js). The checker keeps its own answer key for every example
   and passage, like a second marker, and checks the evidence it expects is in the passage shown. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.pic || q.fig || ''; return text(d.textContent); };
  const sent = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return text((d.querySelector('.sent') || d).textContent); };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const find = (KEY, s) => KEY[Object.keys(KEY).find(k => text(s).includes(k))];

  /* foreshadowing in the passages: title -> [the early hint, words from what happens later] */
  const FORE_T = { 'The Tryout': ['the lace kept slipping loose', 'stumbles'], 'The Long Portage': ['Clouds are building in the west', 'storm'], 'The Wall on the River': ['laughed at their clever wall', 'trouble'] };
  V['g7-foreshadow'] = (q, m) => { const f = FORE_T[m.t]; return f && mk(q) === f[0] && text(q.q).includes(f[1]) && card(q).includes(f[0]) ? '' : 'expected the early hint'; };
  V['g7-fore-tap'] = (q, m) => { const f = FORE_T[m.t], t = tapped(q); return f && t.count(f[0]) === 1 && t.hit.includes(f[0]) ? '' : 'the tapped sentence is not the hint'; };
  /* short examples: words from the early detail -> words from what it hints at */
  const FORE = { 'crack in his bike': 'bike breaks', 'Nothing could ever go wrong': 'goes wrong', 'extra flashlight': 'light fails', 'grey and slushy': 'ice near the point cracks', 'glancing at the piano': 'plays piano',
    'latch slips open': 'gets out of the shed', 'freezing rain': 'roads turn icy', 'losing her place': 'second card', 'stray dog follows': 'keeping the dog', 'few more trips left': 'canoe leaks' };
  V['g7-fore-later'] = (q, m) => mk(q).includes(find(FORE, m.s)) ? '' : 'expected what the hint sets up';
  V['g7-fore-which'] = (q, m) => { const fits = q.options.map(o => text(m.s).includes(find(FORE, o) || '@')); return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the detail that hints at it'; };
  V['g7-fore-tf'] = (q, m) => { const right = text(m.said).includes(find(FORE, m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* symbols: words from the detail -> [the object, words from what it stands for] */
  const SYMB = { 'pine seedling': ['the seedling', 'fresh start'], 'broken watch': ['the broken watch', 'time running out'], 'wilting plant': ['the plant', 'healing'], 'porch light': ['the porch light', 'will return'],
    'bridge between': ['the bridge', 'friendship'], toolbox: ['the toolbox', 'guidance'], 'caged bird': ['the caged bird', 'free'], 'beaded earrings': ['the earrings', 'where she comes from'],
    'storm finally clears': ['the clearing storm', 'conflict'], 'cracked mirror': ['the cracked mirror', 'broken apart'] };
  V['g7-symbol'] = (q, m) => { const s = find(SYMB, m.s); return s && mk(q).includes(s[1]) ? '' : 'expected ' + (s && s[1]); };
  V['g7-symbol-which'] = (q, m) => { const s = find(SYMB, m.s); return s && mk(q) === s[0] && text(q.q).includes(s[1]) ? '' : 'expected ' + (s && s[0]); };
  V['g7-symbol-tf'] = (q, m) => { const s = find(SYMB, m.s), right = text(m.said).includes(s[1]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-symbol-match'] = q => q.pairs.every(p => { const s = Object.values(SYMB).find(x => x[0] === text(p[0])); return s && text(p[1]).includes(s[1]); }) ? '' : 'a symbol is matched to the wrong idea';
  const SYMB_T = { "Grandfather's Compass": ["grandfather's support", 'compass'], 'The Red River Jig': ['Métis identity', 'woven sash'] };
  V['g7-symbol-story'] = (q, m) => { const s = SYMB_T[text(m.t)]; return s && mk(q).includes(s[0]) && card(q).includes(s[1]) ? '' : 'expected what the object stands for'; };
  /* allegories: words from the story -> words from its lesson */
  const ALLEG = { songbirds: 'small joys', 'tallest tree': 'stand alone', 'shiny things': 'Wanting more', 'Ants from two colonies': 'Working together', 'every clock': 'stop change',
    'fox lies': 'Dishonesty', 'new mural': 'new ideas', 'wolf pack': 'Every member' };
  V['g7-allegory'] = (q, m) => mk(q).includes(find(ALLEG, m.s)) ? '' : 'expected the lesson';
  V['g7-allegory-tf'] = (q, m) => { const right = text(m.said).includes(find(ALLEG, m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-allegory-river'] = q => /^Sharing resources helps everyone/.test(mk(q)) && card(q).includes('pulled down the wall') ? '' : 'expected the lesson about sharing';
  /* the device in any example: foreshadowing, symbol, or allegory */
  const DEVICE = s => find(FORE, s) ? 'foreshadowing' : find(SYMB, s) ? 'symbolism' : find(ALLEG, s) ? 'allegory' : '';
  V['g7-device-name'] = (q, m) => mk(q) === DEVICE(m.s) ? '' : 'expected ' + DEVICE(m.s);
  const WHAT = { foreshadowing: 'an early hint', symbolism: 'an object or image', allegory: 'a whole story' };
  V['g7-device-match'] = q => q.pairs.every(p => text(p[1]).startsWith(WHAT[text(p[0])])) ? '' : 'a device is matched wrong';

  /* inferences: question -> [answer, the clue words in the passage] */
  const INFER = { 'How does the goalie feel as the forward comes?': ['focused', 'crowd fades'], 'How does the narrator feel after stumbling?': ['embarrassed', 'my face burning'],
    'What does Coach value most?': ['not giving up', 'who gets back up'], 'How does Ines show she cares?': ['She quietly hands over water.', 'without a word'],
    'How does Arjun feel when he starts at the new school?': ['nervous', 'held the compass in his pocket'], 'How does Arjun feel by winter?': ['settled and confident', 'no longer needed'],
    'How does Priya feel when she looks at the clock?': ['worried but determined', 'sore hands'], "How does Priya's mother feel at the end?": ['proud and grateful', 'hugged her'],
    'How does the narrator feel halfway across?': ['exhausted', 'drop the canoe'], 'What kind of brother is Kenji?': ['helpful and watchful', 'took the bow'],
    'How does the narrator feel when the fiddle starts?': ['nervous', 'feet froze'], 'What does the Elder mean?': ['connects the narrator to family history', 'great-grandmother knew'] };
  const inf = m => INFER[text(m.q)];
  V['g7-local'] = (q, m) => { const f = inf(m); return f && mk(q).includes(f[0]) && card(q).includes(f[1]) ? '' : 'expected ' + (f && f[0]); };
  V['g7-infer-line'] = (q, m) => { const f = inf(m), ok = f ? q.options.map(text).filter(o => o.includes(f[1])) : []; return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence with the clue is not the one marked'; };
  V['g7-infer-tap'] = (q, m) => { const f = inf(m), t = tapped(q); return f && t.count(f[1]) === 1 && t.hit.includes(f[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  V['g7-infer-tf'] = (q, m) => { const f = inf(m), right = !!f && text(m.said).includes(f[0]); return f && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* themes: title or words from the brief story -> words from the theme */
  const THEME_T = { 'The Tryout': 'Getting back up', "Grandfather's Compass": 'help us find our way', 'The Night Before Diwali': 'Pulling together', 'The Long Portage': 'share the load', 'The Red River Jig': 'Traditions connect' };
  const DETAIL_T = { 'The Tryout': 'water bottle', "Grandfather's Compass": 'scratched', 'The Night Before Diwali': 'old songs', 'The Long Portage': 'loon', 'The Red River Jig': 'table was pushed' };
  V['g7-theme'] = (q, m) => mk(q).includes(THEME_T[text(m.t)]) ? '' : 'expected the theme about "' + THEME_T[text(m.t)] + '"';
  V['g7-theme-or-plot'] = (q, m) => mk(q).includes(THEME_T[text(m.t)]) && q.options.some(o => text(o).includes(DETAIL_T[text(m.t)])) ? '' : 'expected the theme, not the detail';
  const THEMES = { 'afraid to sing': 'Courage', "new boy's lunch": 'way you want to be treated', 'copying her sister': 'without honesty', 'argue about a fence': 'shared problem', 'fish through the ice': 'passed down',
    'newest phone': 'lasting happiness', 'best player is injured': 'Everyone has strengths', 'pretends to love hockey': 'true to yourself' };
  V['g7-theme-brief'] = (q, m) => mk(q).includes(find(THEMES, m.s)) ? '' : 'expected the theme';
  V['g7-theme-tf'] = (q, m) => { const right = text(m.said).includes(find(THEMES, m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* synthesis: words from source A -> [words from source B, words from the conclusion both support] */
  const SYN = { 'A school survey': ['quiet breaks', 'quiet space could help'], 'Winter roads now stay open': ['Flying supplies', 'raising the cost'], 'Monarch butterflies lay': ['Milkweed is disappearing', 'fewer monarchs'],
    "library's after-school club": ['closed on Thursdays', 'Opening on Thursdays'], 'Lake trout need': ['getting warmer', 'may be at risk'], 'sleep 9 hours': ['about 7 hours', 'More sleep'],
    'Bike lanes on Queen Street': ['doubled', 'encouraged more people'], 'used once and thrown away': ['hundreds of years', 'lasts a very long time'] };
  V['g7-synthesize'] = (q, m) => { const s = find(SYN, m.a); return s && mk(q).includes(s[1]) && card(q).includes(s[0]) ? '' : 'expected the conclusion that uses both sources'; };
  V['g7-syn-tf'] = (q, m) => { const s = find(SYN, m.a), right = text(m.said).includes(s[1]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-syn-needs'] = (q, m) => { const s = find(SYN, m.a); return s && mk(q).includes(s[0]) && text(q.q).includes(s[1]) ? '' : 'expected the source that joins up'; };
  const REL = /temperatures|Thinner ice|melts weeks sooner|soak up rainwater|keep buildings cooler|storm drains|Milkweed|spend the winter|pesticides/;
  V['g7-relevant-info'] = q => H.sameSet(q.options.map((o, i) => REL.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the relevant facts are not the ones marked';
  /* positions: words from the text -> [the writer's position, the other side] */
  const VIEW = { 'Our School Needs a Quiet Room': ['open a quiet room', 'skip class'], 'Our School Needs a Late Bus': ['add a late bus', 'costs too much'], skatepark: ['build a skatepark', 'noisy'],
    captions: ['should have captions', 'distract'], 'Phones should be put away': ['put away during class', 'help with research'], halal: ['offer halal', 'cost more'], ramp: ['build a ramp', 'helped up the steps'],
    'Indigenous languages': ['teach Indigenous languages', 'enough teachers'], 'Recess should be longer': ['Recess should be longer', 'time from lessons'], 'old trees': ['keep the old trees', 'parking lot'] };
  const view = m => VIEW[m.id] || find(VIEW, m.id);
  V['g7-position'] = (q, m) => { const v = view(m); return v && mk(q).includes(v[0]) ? '' : 'expected the writer\'s position'; };
  V['g7-other-side'] = (q, m) => { const v = view(m); return v && mk(q).includes(v[1]) && card(q).includes(v[1].split(' ')[0]) ? '' : 'expected the other position'; };
  V['g7-view-tf'] = (q, m) => { const v = view(m), right = !!v && text(m.said).includes(v[0]); return v && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const MSG = { 'Our School Needs a Quiet Room': ['feel they belong', 'they belong here'], 'Our School Needs a Late Bus': ['wherever they live', 'same chance to join in'] };
  V['g7-message'] = (q, m) => { const g = MSG[m.t]; return g && mk(q).includes(g[0]) && card(q).includes(g[1]) ? '' : 'expected the message about belonging'; };
  /* loaded words the checker looks for; a neutral sentence has none */
  const LOADED = /\b(greedy|destroy|beautiful|Lazy|waste|brilliant|finally|terrible|fool|ridiculous|ruins|Heroic|helpless|filthy|so-called|useless|Reckless|race|amazing|crushed|hopeless|outrageous|rip-off)\b/i;
  V['g7-neutral'] = q => { const ok = q.options.map(text).filter(o => !LOADED.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with no loaded words'; };
  V['g7-loaded'] = (q, m) => { const words = mk(q).split(/, /); return words.every(w => text(m.s).includes(w)) && words.every(w => LOADED.test(w)) ? '' : 'the words marked are not the loaded words in the sentence'; };
  V['g7-bias-tf'] = (q, m) => { const right = !LOADED.test(text(m.s)); return q.answer === right && tfWhy(q, right) && sent(q) === text(m.s) ? '' : 'expected ' + right; };
  const FAIR = /^(Present more than one side|Use neutral words|Include the voices|Check facts in more than one|Say clearly when)/;
  V['g7-avoid-bias'] = q => H.sameSet(q.options.map((o, i) => FAIR.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the fair ways are not the ones marked';
})();
