/* Grade 3 answer checks: word meanings (grade3/chapters/meanings.js). The checker has its own word groups, clue list and subject
   word list. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const groups = s => s.split(' ').map(p => p.split('/'));
  const SAME = groups('big/large/huge small/tiny/little happy/glad/cheerful fast/quick/speedy begin/start smart/clever/wise cold/chilly/frosty shout/yell/holler ' +
    'scared/afraid/frightened leap/jump rock/stone gift/present tired/sleepy/weary angry/mad/cross sad/unhappy/gloomy easy/simple pretty/lovely/beautiful shut/close ' +
    'quiet/silent rich/wealthy end/finish grab/snatch street/road kind/nice/gentle');
  const OPP = groups('hot/cold full/empty early/late wet/dry loud/quiet light/heavy push/pull win/lose first/last top/bottom float/sink asleep/awake strong/weak ' +
    'rough/smooth old/young sharp/dull tall/short above/below arrive/leave buy/sell laugh/cry remember/forget inside/outside thick/thin shallow/deep never/always');
  const syn = (a, b) => a !== b && SAME.some(g => g.includes(a) && g.includes(b));
  const opp = (a, b) => OPP.some(g => g.includes(a) && g.includes(b) && a !== b);
  /* new word: [meaning, the clue] */
  const CLUE = { drowsy: ['sleepy', 'fell asleep'], famished: ['starving', 'ate two bowls'], narrow: ['thin', 'one at a time'], furious: ['angry', 'tipped the bin over again'],
    calm: ['still', 'looked like glass'], gather: ['collect', 'from all over the yard'], timid: ['shy', 'stayed close to his dad'], scalding: ['boiling', 'waited for it to cool'],
    sturdy: ['strong', 'did not tip'], brief: ['short', 'only one minute'], anxious: ['worried', 'hands shook'], soggy: ['wet', 'in the milk'],
    enormous: ['huge', 'taller than our car'], damp: ['a little wet', 'morning dew'], exhausted: ['very tired', 'lay down right away'], delighted: ['very happy', 'hugged him tight'],
    fragile: ['easy to break', 'carry it with care'], peered: ['looked closely', 'to see the fish below'], vanished: ['disappeared', 'could not see it anymore'],
    frigid: ['very cold', 'breath turned to ice'], clumsy: ['bumping into things', 'tripped over its own paws'], hollow: ['empty inside', 'hide inside it'],
    soar: ['fly high', 'high above the trees'], grumpy: ['in a bad mood', 'frowned at everyone'], spotless: ['very clean', 'after we scrubbed it'], stroll: ['slow walk', 'walking slowly'],
    ancient: ['very old', 'five hundred years'], plummeted: ['fell fast', 'when the wind stopped'], nibble: ['take small bites', 'one tiny bite at a time'], dim: ['not bright', 'turned on a lamp'],
    soaked: ['very wet', 'fell into the creek'], swift: ['fast', 'in a flash'], cautious: ['careful', 'or you might slip'], glance: ['a quick look', 'just for a second'],
    devour: ['eat quickly', 'in two minutes flat'], shiver: ['shake from cold', 'without our mittens'] };
  /* subject words: [meaning, words from the sentence that only that word fits] */
  const SUBJ = { habitat: ['the place where a plant or animal lives', 'frogs and turtles'], predator: ['an animal that hunts other animals', 'that hunts mice'],
    prey: ['an animal that is hunted for food', 'for owls and foxes'], recycle: ['to make used things into something new', 'become new paper'],
    migrate: ['to move to another place when the season changes', 'south before winter'], hibernate: ['to sleep through the winter', 'until spring'],
    liquid: ['something that flows, like water', 'you can pour it'], solid: ['something that keeps its shape, like ice', 'keeps its shape'],
    magnet: ['a thing that pulls iron and steel', 'paper clips'], soil: ['the earth that plants grow in', 'rich, dark'], force: ['a push or a pull', 'moves the ball'],
    estimate: ['a careful guess', 'there were 22'], measure: ['to find out how long or heavy something is', 'Use a ruler'], total: ['the amount when you add it all up', 'of seven'],
    pattern: ['something that repeats in the same way', 'red, blue is'], equal: ['the same amount', 'into two'], centimetre: ['a small unit for measuring length', 'about one'],
    symmetry: ['when both halves match', 'wings match'], community: ['a group of people who live in the same place', 'a library, a park'],
    mayor: ['the leader of a town or city', 'open the new park'], ancestor: ['someone in your family who lived long ago', '100 years ago'],
    tradition: ['something a group has done for a long time', 'maple taffy'], Elder: ['a respected older person who shares knowledge', 'shared a teaching'],
    province: ['a part of Canada, like Ontario', 'Ontario is the'], citizen: ['a person who belongs to a country', 'became a Canadian'],
    treaty: ['an agreement between nations', 'to share the land'], compass: ['a tool that shows which way is north', 'which way is north'],
    rhythm: ['a pattern of beats', 'of the song'], nutrient: ['something in food that helps your body grow', 'strong bones'], weather: ['what the air outside is like each day', 'windy and cold'] };
  const onlyOne = (q, fits) => (q.options || q.tiles).map(text).filter(fits).length === 1;
  const pair = q => text(q.fig).split(/\s*↔\s*|\s+/).filter(Boolean);

  V['g3-same'] = (q, m) => { const a = H.marked(q); return syn(m.word, a) && onlyOne(q, t => syn(m.word, t)) ? '' : 'expected a word that means ' + m.word; };
  V['g3-match-same'] = q => q.pairs.every(p => syn(text(p[0]), text(p[1]))) ? '' : 'a pair does not mean the same';
  V['g3-odd-out'] = q => { const t = q.tiles.map(text), odd = t[q.answer], rest = t.filter(x => x !== odd); return rest.every(a => rest.every(b => a === b || syn(a, b))) && rest.every(a => !syn(a, odd)) ? '' : 'the odd one out is not marked'; };
  V['g3-same-tf'] = (q, m) => H.has(q.fig, m.a) && H.has(q.fig, m.b) && syn(m.a, m.b) === q.answer ? '' : 'true/false is wrong for ' + m.a + ' and ' + m.b;
  V['g3-opposite'] = (q, m) => { const a = H.marked(q); return opp(m.word, a) && onlyOne(q, t => opp(m.word, t)) ? '' : 'expected the opposite of ' + m.word; };
  V['g3-same-or-opp'] = (q, m) => { const s = syn(m.a, m.b), o = opp(m.a, m.b); return s !== o && H.marked(q) === (s ? 'Same' : 'Opposite') && H.has(q.fig, m.b) ? '' : 'wrong for ' + m.a + ' and ' + m.b; };
  V['g3-match-opp'] = q => q.pairs.every(p => opp(text(p[0]), text(p[1]))) ? '' : 'a pair is not opposite';
  V['g3-opp-tf'] = (q, m) => { const w = pair(q); return w.includes(m.word) && w.includes(m.said) && opp(m.word, m.said) === q.answer ? '' : 'true/false is wrong for ' + m.word + ' and ' + m.said; };
  const clue = (q, m, i) => { const c = CLUE[m.word]; if (!c) return 'unknown word ' + m.word; if (!H.has(q.fig, m.word) || !H.has(q.fig, c[1])) return 'the sentence does not show the word and its clue'; return H.marked(q) === c[i] && onlyOne(q, t => t === c[i]) ? '' : 'expected ' + c[i]; };
  V['g3-clue-meaning'] = (q, m) => clue(q, m, 0);
  V['g3-clue-swap'] = (q, m) => clue(q, m, 0);
  V['g3-clue-find'] = (q, m) => clue(q, m, 1);
  V['g3-clue-tf'] = (q, m) => {
    const c = CLUE[m.word];
    if ((m.said === c[0]) !== q.answer) return 'true/false is wrong';
    return text(q.why.options[q.why.answer]).includes(c[1]) ? '' : 'the reason is not the clue';
  };
  V['g3-subject-meaning'] = (q, m) => SUBJ[m.word] && H.has(q.q, m.word) && H.marked(q) === SUBJ[m.word][0] && onlyOne(q, t => t === SUBJ[m.word][0]) ? '' : 'expected the meaning of ' + m.word;
  V['g3-subject-gap'] = (q, m) => { const fits = q.tiles.map(text).filter(t => SUBJ[t] && H.has(q.fig, SUBJ[t][1])); return fits.length === 1 && H.marked(q) === fits[0] && fits[0] === m.word ? '' : 'the word that fits the sentence is not marked'; };
  V['g3-subject-match'] = q => q.pairs.every(p => SUBJ[text(p[0])] && SUBJ[text(p[0])][0] === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  V['g3-subject-tf'] = (q, m) => SUBJ[m.word] && H.has(q.q, m.word) && (SUBJ[m.word][0] === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.word;
})();
