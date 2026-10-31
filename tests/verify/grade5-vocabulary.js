/* Grade 5 answer checks: word meanings (grade5/chapters/vocabulary.js). The checker keeps its own answer key for each sentence,
   and works out the kind of clue from its signal words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const MEANS = { parka: 'a warm coat with a hood', archipelago: 'a group of islands', summit: 'the very top of a mountain', amphibians: 'animals like frogs that live on land and in water',
    nutritious: 'good for your body', rodents: 'small animals with strong front teeth', exhausted: 'very tired', timid: 'shy', fragile: 'easy to break' };
  /* the clue: the part of the sentence that starts with a signal word */
  const SIGNAL = /(a warm coat|a group of|very top|such as|like apples|including|but his|spoke up loudly|not strong)/;
  const kindOf = s => /\b(such as|like apples|including)\b/.test(s) ? 'examples' : /\b(but|Unlike|not strong)\b/.test(s) ? 'a contrast' : 'a definition';
  V['g5-context'] = (q, m) => mk(q) === MEANS[m.word] && text(q.fig).includes(m.word) ? '' : 'expected ' + MEANS[m.word];
  V['g5-clue-words'] = q => { const ok = q.tiles.map(text).filter(t => SIGNAL.test(t)); return ok.length === 1 && mk(q) === ok[0] && text(q.fig).includes(ok[0]) ? '' : 'expected the clue words'; };
  V['g5-clue-kind'] = q => mk(q) === kindOf(text(q.fig)) ? '' : 'expected ' + kindOf(text(q.fig));
  V['g5-context-tf'] = (q, m) => (m.said === MEANS[m.word]) === q.answer ? '' : 'true/false is wrong for ' + m.word;
  const HERE = { bank: 'the land beside a river', current: 'moving water', scale: 'a tool for weighing', pitch: 'set up', table: 'facts set out in rows and columns',
    bark: 'the outer covering of a tree', light: 'not heavy', ruler: 'a leader' };
  V['g5-multi'] = (q, m) => mk(q) === HERE[m.word] ? '' : 'expected ' + HERE[m.word];
  V['g5-multi-tf'] = (q, m) => (text(m.said) === HERE[m.word]) === q.answer ? '' : 'true/false is wrong for ' + m.word;
  /* how strong each word is, 1 to 3 */
  const STRENGTH = {}; ['warm hot scorching', 'cool cold freezing', 'glad happy thrilled', 'whisper talk shout', 'walk jog sprint', 'nibble eat devour', 'damp wet soaked', 'dislike hate despise']
    .forEach(s => s.split(' ').forEach((w, i) => { STRENGTH[w] = i + 1; }));
  V['g5-shades'] = q => q.items.map(text).every((w, i, a) => STRENGTH[w] && (i === 0 || STRENGTH[w] > STRENGTH[a[i - 1]])) ? '' : 'the words are not weakest to strongest';
  V['g5-strongest'] = (q, m) => { const s = q.tiles.map(text).map(w => STRENGTH[w]), want = m.weak ? Math.min(...s) : Math.max(...s); return STRENGTH[mk(q)] === want ? '' : 'expected the ' + (m.weak ? 'weakest' : 'strongest'); };
  const SUBJECT = { perimeter: 'Math', fraction: 'Math', habitat: 'Science', erosion: 'Science', treaty: 'Social Studies', government: 'Social Studies', tempo: 'Music', canvas: 'Art' };
  const WMEAN = { perimeter: 'the distance around a shape', fraction: 'a part of a whole', habitat: 'the place where an animal lives', erosion: 'land worn away by water or wind',
    treaty: 'a formal agreement between nations', government: 'the people who lead and make laws', tempo: 'how fast music is played', canvas: 'a cloth that artists paint on' };
  V['g5-subject-word'] = (q, m) => mk(q) === SUBJECT[m.word] ? '' : 'expected ' + SUBJECT[m.word];
  V['g5-subject-match'] = q => q.pairs.every(p => WMEAN[text(p[0])] === text(p[1])) ? '' : 'a word is matched wrong';
})();
