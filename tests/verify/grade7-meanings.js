/* Grade 7 answer checks: word meanings (grade7/chapters/meanings.js). The checker keeps its own word meanings and works out
   the kind of context clue from the signal words in the sentence. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const MEANS = { dormant: 'resting deeply', hypothesis: 'a careful guess to test', migrate: 'move to another place for the season', portage: 'carrying a canoe over land',
    superficial: 'only on the surface', nocturnal: 'active at night', archipelago: 'a group of islands', impartial: 'fair to both sides',
    Precipitation: 'water that falls from the sky', meticulous: 'very careful about details', Renewable: 'able to be replaced by nature', Amphibians: 'animals that live in water and on land',
    Percussion: 'instruments you hit to play', punctual: 'on time', Legumes: 'plants with seeds in pods',
    gregarious: 'outgoing and sociable', concise: 'short and clear', frugal: 'careful with money', arid: 'very dry', reluctant: 'not willing', riveting: 'so interesting you cannot stop', docile: 'calm and easy to handle',
    treacherous: 'dangerous', isolated: 'far away from others', obsolete: 'no longer used', stagnant: 'still and not moving', parched: 'very dry', vigilant: 'watchful and alert', elated: 'very happy' };
  /* the kind of clue, from the signal words in the sentence */
  const SIG = { definition: /^or |which means|that is,|^meaning /, example: /such as|For example|including/, contrast: /Unlike|^not |, but|^but /, 'cause and effect': /because|, so$|^After /i };
  const kindOf = s => /, or |which means|, that is,|, meaning /.test(s) ? 'definition' : /such as|For example|including/.test(s) ? 'example'
    : /Unlike|, not |, but /.test(s) ? 'contrast' : /because|, so |^After /.test(s) ? 'cause and effect' : null;
  const sentence = q => { const d = document.createElement('div'); d.innerHTML = q.fig; return text(d.querySelector('.sent').innerHTML); };
  V['g7-clue-meaning'] = (q, m) => mk(q) === MEANS[m.word] && sentence(q).includes(m.word) ? '' : 'expected ' + MEANS[m.word];
  /* the clue words are the part of the sentence that carries the signal for its kind of clue */
  V['g7-clue-words'] = (q, m) => {
    const s = sentence(q), re = SIG[kindOf(s)], ok = q.tiles.map(text).filter(t => s.includes(t) && !t.includes(m.word) && re.test(t));
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the clue words are not the ones marked';
  };
  V['g7-clue-kind'] = q => mk(q) === kindOf(sentence(q)) ? '' : 'expected a ' + kindOf(sentence(q)) + ' clue';
  V['g7-clue-tf'] = (q, m) => (MEANS[m.word] === m.said) === q.answer && tfWhy(q, q.answer) ? '' : 'true/false is wrong for ' + m.word;

  const POS = ['thrifty', 'confident', 'curious', 'determined', 'slender', 'aroma', 'relaxed', 'youthful', 'unique', 'cautious', 'assertive', 'economical', 'bold', 'firm', 'fragrance'];
  const NEG = ['cheap', 'arrogant', 'nosy', 'stubborn', 'scrawny', 'stench', 'lazy', 'childish', 'weird', 'timid', 'pushy', 'stingy', 'reckless', 'harsh', 'odour'];
  V['g7-connotation'] = (q, m) => { const L = m.pos ? POS : NEG; return L.includes(mk(q)) && q.tiles.map(text).filter(t => L.includes(t)).length === 1 ? '' : 'expected the ' + (m.pos ? 'positive' : 'negative') + ' word'; };
  V['g7-conn-sentence'] = (q, m) => { const L = /<b>kind<\/b>/.test(q.q) ? POS : NEG, ok = q.options.map(text).filter(o => L.includes(o)); return ok.length === 1 && mk(q) === ok[0] && (L === POS) === m.pos ? '' : 'expected the word with the right feeling'; };
  V['g7-conn-match'] = q => q.pairs.every(p => POS.indexOf(text(p[0])) >= 0 && POS.indexOf(text(p[0])) === NEG.indexOf(text(p[1]))) ? '' : 'a pair is matched wrong';
  V['g7-conn-tf'] = (q, m) => { const right = POS.includes(m.a) && NEG.indexOf(m.b) === POS.indexOf(m.a); return q.answer === right && tfWhy(q, right) && text(q.fig).includes(m.a + ' sounds more positive than ' + m.b) ? '' : 'expected ' + right; };
  /* how strong each word is, 1 (mild) to 3 (strong) */
  const LEVEL = {};
  ['annoyed angry furious', 'like love adore', 'tired weary exhausted', 'cool cold frigid', 'big huge enormous', 'murmur speak shout', 'glad happy thrilled', 'warm hot scorching',
    'small tiny microscopic', 'nervous scared terrified', 'walk jog sprint', 'good great outstanding'].forEach(s => s.split(' ').forEach((w, i) => { LEVEL[w] = i + 1; }));
  V['g7-scale-order'] = q => q.items.map(i => LEVEL[text(i)]).join() === '1,2,3' ? '' : 'the words are not from weakest to strongest';
  V['g7-scale-strong'] = q => LEVEL[mk(q)] === 3 && q.tiles.map(t => LEVEL[text(t)]).filter(l => l === 3).length === 1 ? '' : 'expected the strongest word';
  V['g7-scale-weak'] = q => LEVEL[mk(q)] === 1 && q.tiles.map(t => LEVEL[text(t)]).filter(l => l === 1).length === 1 ? '' : 'expected the mildest word';
  V['g7-scale-tf'] = (q, m) => { const right = LEVEL[m.a] > LEVEL[m.b]; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };

  const SUBJ = { photosynthesis: ['Science', 'how plants make food from sunlight'], erosion: ['Science', 'land being worn away by water or wind'], habitat: ['Science', 'the natural home of a plant or animal'],
    ecosystem: ['Science', 'all the living and non-living things in an area'], ratio: ['Math', 'a comparison of two amounts'], variable: ['Math', 'a letter that stands for an unknown number'],
    integer: ['Math', 'a whole number or its opposite'], perimeter: ['Math', 'the distance around a shape'], equation: ['Math', 'a math sentence with an equal sign'],
    treaty: ['History', 'a formal agreement between nations'], Confederation: ['History', 'the joining of colonies to form Canada in 1867'], monarchy: ['History', 'a country ruled by a king or queen'],
    latitude: ['Geography', 'distance north or south of the equator'], tundra: ['Geography', 'a cold, treeless region in the far north'], watershed: ['Geography', 'the land that drains into one river or lake'],
    tempo: ['Music', 'the speed of the music'], rhythm: ['Music', 'the pattern of long and short sounds'], dynamics: ['Music', 'how loud or soft the music is'] };
  V['g7-subject-meaning'] = (q, m) => mk(q) === SUBJ[m.word][1] ? '' : 'expected ' + SUBJ[m.word][1];
  V['g7-which-subject'] = (q, m) => mk(q) === SUBJ[m.word][0] ? '' : 'expected ' + SUBJ[m.word][0];
  V['g7-subject-match'] = q => q.pairs.every(p => (SUBJ[text(p[0])] || [])[1] === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  V['g7-subject-tf'] = (q, m) => { const right = SUBJ[m.word][1] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* multiple meanings: the checker's own key, sentence by sentence */
  const MULTI = { 'The current flows through the copper wire.': 'a flow of electricity', 'Read the current news on the website.': 'happening now',
    'The table shows the rainfall for each month.': 'a chart of rows and columns', 'We ate supper at the kitchen table.': 'a piece of furniture',
    'Every living thing is made of cells.': 'the smallest unit of life', 'Call me on my cell after practice.': 'a mobile phone',
    'The product of 6 and 7 is 42.': 'the answer when you multiply', 'The store sells a new cleaning product.': 'something made to be sold',
    'The rock has a mass of 2 kg.': 'how much matter something has', 'A mass of people filled the square.': 'a large crowd',
    'The range of the data is 15.': 'the difference between the highest and lowest values', 'We hiked in a mountain range in Alberta.': 'a line of mountains',
    'Parliament voted on the new bill.': 'a proposed law', 'The server brought the bill after lunch.': 'a paper that shows what you owe',
    'Find the volume of the box in cubic centimetres.': 'the space something takes up', 'Please turn down the volume on the radio.': 'how loud a sound is',
    'The plot of the novel has a surprising twist.': 'the events of a story', 'We grow beans in our garden plot.': 'a small piece of land',
    'Check the key to see what each colour on the map means.': 'a list that explains map symbols', 'I lost the key to the front door.': 'a tool that opens a lock',
    "The map's scale shows that 1 cm equals 10 km.": 'how map distance compares to real distance', 'Put the apples on the scale to weigh them.': 'a machine for weighing',
    'Salt water is a solution.': 'a mixture where one thing dissolves in another', 'We found a solution to the noisy hallway.': 'the answer to a problem' };
  V['g7-multi'] = (q, m) => mk(q) === MULTI[text(m.s)] && sentence(q) === text(m.s) ? '' : 'expected ' + MULTI[text(m.s)];
  V['g7-multi-everyday'] = (q, m) => mk(q) === MULTI[text(m.s)] && sentence(q) === text(m.s) ? '' : 'expected ' + MULTI[text(m.s)];
  V['g7-multi-subject'] = q => { const meaning = text(q.q).match(/ mean (.+)\?$/)[1], ok = q.options.map(text).filter(o => MULTI[o] === meaning); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with that meaning'; };
  V['g7-multi-tf'] = (q, m) => { const right = MULTI[sentence(q)] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
