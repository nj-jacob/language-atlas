/* Grade 7 answer checks: word meanings (grade7/chapters/meanings.js). The checker keeps its own word meanings and works out
   the kind of context clue from the signal words in the sentence. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const MEANS = { dormant: 'resting deeply', hypothesis: 'a careful guess to test', migrate: 'move to another place for the season', Precipitation: 'water that falls from the sky',
    meticulous: 'very careful about details', Renewable: 'able to be replaced by nature', gregarious: 'outgoing and sociable', concise: 'short and clear', frugal: 'careful with money',
    treacherous: 'dangerous', isolated: 'far away from others', obsolete: 'no longer used' };
  /* the kind of clue, from the signal words in the sentence */
  const kindOf = s => /, or |which means/.test(s) ? 'definition' : /such as|For example|including/.test(s) ? 'example' : /Unlike|, not |Instead of/.test(s) ? 'contrast' : /because/.test(s) ? 'cause and effect' : null;
  const sentence = q => { const d = document.createElement('div'); d.innerHTML = q.fig; return text(d.querySelector('.sent').innerHTML); };
  V['g7-clue-meaning'] = (q, m) => mk(q) === MEANS[m.word] && sentence(q).includes(m.word) ? '' : 'expected ' + MEANS[m.word];
  /* the clue words are the part of the sentence that carries the signal (or, for a result, the reason) */
  V['g7-clue-words'] = (q, m) => {
    const s = sentence(q), k = kindOf(s), ok = q.tiles.map(text).filter(t => s.includes(t) && !t.includes(m.word) && (k === 'contrast' ? /Unlike|not |spent it all/.test(t) : k === 'definition' ? /^or |which means/.test(t) : k === 'example' ? /such as|including|checks every/.test(t) : /because/.test(t)));
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the clue words are not the ones marked';
  };
  V['g7-clue-kind'] = q => mk(q) === kindOf(sentence(q)) ? '' : 'expected a ' + kindOf(sentence(q)) + ' clue';
  V['g7-clue-tf'] = (q, m) => (MEANS[m.word] === m.said) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.word;

  const POS = ['thrifty', 'confident', 'curious', 'determined', 'slender', 'aroma', 'relaxed', 'youthful', 'unique', 'cautious'];
  const NEG = ['cheap', 'arrogant', 'nosy', 'stubborn', 'scrawny', 'stench', 'lazy', 'childish', 'weird', 'timid'];
  V['g7-connotation'] = (q, m) => { const w = mk(q); return (m.pos ? POS : NEG).includes(w) && q.tiles.map(text).filter(t => (m.pos ? POS : NEG).includes(t)).length === 1 ? '' : 'expected the ' + (m.pos ? 'positive' : 'negative') + ' word'; };
  V['g7-conn-sentence'] = q => { const ok = q.options.map(text).filter(o => POS.includes(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the positive word'; };
  V['g7-conn-match'] = q => q.pairs.every(p => POS.indexOf(text(p[0])) >= 0 && POS.indexOf(text(p[0])) === NEG.indexOf(text(p[1]))) ? '' : 'a pair is matched wrong';
  /* how strong each word is, 1 (mild) to 3 (strong) */
  const LEVEL = { annoyed: 1, angry: 2, furious: 3, like: 1, love: 2, adore: 3, tired: 1, weary: 2, exhausted: 3, cool: 1, cold: 2, frigid: 3, big: 1, huge: 2, enormous: 3, murmur: 1, speak: 2, shout: 3, glad: 1, happy: 2, thrilled: 3 };
  V['g7-scale-order'] = q => q.items.map(i => LEVEL[text(i)]).join() === '1,2,3' ? '' : 'the words are not from weakest to strongest';
  V['g7-scale-strong'] = q => LEVEL[mk(q)] === 3 && q.tiles.map(t => LEVEL[text(t)]).filter(l => l === 3).length === 1 ? '' : 'expected the strongest word';

  const SUBJ = { photosynthesis: ['Science', 'how plants make food from sunlight'], erosion: ['Science', 'land being worn away by water or wind'], habitat: ['Science', 'the natural home of a plant or animal'],
    ratio: ['Math', 'a comparison of two amounts'], variable: ['Math', 'a letter that stands for an unknown number'], treaty: ['History', 'a formal agreement between nations'],
    Confederation: ['History', 'the joining of colonies to form Canada in 1867'], latitude: ['Geography', 'distance north or south of the equator'], tundra: ['Geography', 'a cold, treeless region in the far north'], tempo: ['Music', 'the speed of the music'] };
  V['g7-subject-meaning'] = (q, m) => mk(q) === SUBJ[m.word][1] ? '' : 'expected ' + SUBJ[m.word][1];
  V['g7-which-subject'] = (q, m) => mk(q) === SUBJ[m.word][0] ? '' : 'expected ' + SUBJ[m.word][0];
  V['g7-subject-match'] = q => q.pairs.every(p => (SUBJ[text(p[0])] || [])[1] === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  /* multiple meanings: the checker's own key, by the subject the sentence comes from */
  const MULTI = { 'The current flows through the copper wire.': 'a flow of electricity', 'The table shows the rainfall for each month.': 'a chart of rows and columns',
    'Every living thing is made of cells.': 'the smallest unit of life', 'The product of 6 and 7 is 42.': 'the answer when you multiply', 'The rock has a mass of 2 kg.': 'how much matter something has',
    'The range of the data is 15.': 'the difference between the highest and lowest values', 'Parliament voted on the new bill.': 'a proposed law' };
  V['g7-multi'] = (q, m) => mk(q) === MULTI[text(m.s)] && text(q.fig) === text(m.s) ? '' : 'expected ' + MULTI[text(m.s)];
})();
