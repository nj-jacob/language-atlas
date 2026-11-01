/* Grade 4 answer checks: reading for meaning (grade4/chapters/reading.js). Comprehension answers come from a passage, so the
   checker keeps its own answer key (like a second marker), and works out what it can from the passage itself: where events come
   in the text, what kind of text it is, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/[’]/g, "'"), mk = q => text(H.marked(q) || '');
  /* per passage: facts { question: [answer, words in the sentence that answers it] }, words from the main idea, the conclusion
     and the words that back it up, the prediction, its clue and the question that checks it */
  const KEY = {
    'Two Ways Home': { facts: { 'Where was Amara when the snow started?': ['at the library', 'At the library, Amara'], 'Where was Jayden?': ['at hockey practice', 'finishing hockey'], 'How did Amara get to the arena?': ['by bus', 'Amara rode it'] },
      main: 'finds her brother', conclusion: ['routine', 'every Tuesday'] },
    'Monarch Butterflies': { facts: { 'Where do monarchs fly in the fall?': ['to Mexico', 'mountains of Mexico'], 'What do monarch caterpillars eat?': ['milkweed leaves', 'eat only milkweed'], 'How can people help monarchs?': ['plant milkweed', 'help by planting'] },
      main: 'travel far and need milkweed', conclusion: ['help more monarchs survive', 'People can help'] },
    'My Volcano': { facts: { 'What did the narrator pour?': ['vinegar', 'bottle of vinegar'], 'What colour was the foam?': ['red', 'Red foam'] }, main: 'nervous at the science fair',
      predict: ['pour the vinegar', 'picked up the bottle', 'Did the narrator pour the vinegar?'] },
    'Your First Ski Trail': { facts: { 'What sound does the snow make?': ['it squeaks', 'snow squeaks'], 'What grows beside the trail?': ['tall pines', 'through tall pines'] },
      predict: ['ski down the hill', 'top of a small hill', 'Did you go down the hill?'] },
    'The Old Maple': { facts: { 'What hums in the maple in spring?': ['busy bees', 'In spring'], 'What does the maple drop in fall?': ['its coat of red and gold', 'In fall'] } },
    'Crow Opens a Shop': { facts: { 'What did Squirrel bring?': ['an acorn', 'Squirrel came by'], 'Where was the shop?': ['by the river', 'little shop by'] }, main: 'cannot feed her',
      predict: ['trading for food', 'nothing to eat', 'Did Crow start trading for food?'] },
    'Keep Riverside Pool Open': { facts: { 'Who wrote the letter?': ['Omar Haddad', 'Sincerely'], 'What do swimming lessons teach?': ['to be safe near water', 'Swimming lessons there'] } },
    'The Three Sisters': { facts: { 'Which three plants are the Three Sisters?': ['corn, beans and squash', 'have grown corn'], 'What do the beans climb?': ['the corn', 'pole to climb'], 'What do the squash leaves shade?': ['the ground', 'wide squash leaves'] },
      main: 'help each other grow', conclusion: ['Plants can help each other', 'add nutrients'] },
    'How to Make a Paper Lantern': { facts: { 'Where do you stop cutting?': ['2 cm from the edge', 'Cut slits'], 'What do you tape to the top?': ['a paper strip', 'for a handle'] }, main: 'make a paper lantern' },
    'The Portage': { facts: { 'What does a portage join?': ['two lakes', 'to the next one'], 'What did Priya carry?': ['the paddles and the food pack', 'Priya carried'], "What buzzed around Priya's ears?": ['mosquitoes', 'steep and muddy'],
      'How long did the portage take?': ['about twenty minutes', 'twenty minutes'] }, main: 'hard portage can lead', conclusion: ['glad she kept going', 'brought us'],
      predict: ['carry the canoe through the forest', 'Now we carry', 'Did they carry the canoe to another lake?'] },
    'Inuksuit: Messengers of Stone': { facts: { 'What is an inuksuk built from?': ['stones', 'stones stacked'], 'Which language does the word come from?': ['Inuktitut', 'The word comes'], 'Which flag shows an inuksuk?': ['the flag of Nunavut', 'appears on the flag'],
      'What can an inuksuk show travellers?': ['which way to go', 'safe to cross'] }, main: 'guide travellers', conclusion: ['treated with respect', 'knocked down'] },
    'Your First Night at Camp': { facts: { 'What do you use to look outside?': ['a flashlight', 'click it on'], 'What animal is outside the tent?': ['a raccoon', 'striped tail'], 'What is the raccoon sniffing?': ['the food bag', 'It sniffs'],
      'What sound do you hear first?': ['a snap, like a stick breaking', 'Then you hear it'] }, main: 'turns out to be a raccoon', conclusion: ['should have been hung', 'forgot to hang'],
      predict: ['look outside', 'closer and closer', 'Did you look outside to see what was there?'] },
    'From Flower to Honey': { facts: { 'What is nectar?': ['a sweet liquid in flowers', 'drinking a sweet'], 'How do bees dry the nectar?': ['They fan their wings.', 'dry the nectar out'], 'What do bees seal the cells with?': ['a lid of wax', 'seal each cell'],
      'Which foods would there be fewer of without bees?': ['apples and blueberries', 'Without bees'] }, main: 'turn nectar into honey', conclusion: ['Protecting bees', 'fewer apples'] },
    'The Moose on Main Street': { facts: { 'Where was the moose standing?': ['in the middle of Main Street', 'moose was standing'], 'What did the moose eat?': ['red geraniums', 'took a huge bite'], 'Who blocked the road?': ['a police officer', 'police officer arrived'],
      'Where did the moose go at the end?': ['toward the river', 'trotted slowly'] }, main: 'wanders into town', conclusion: ['keep away from the moose', 'stayed far back'],
      predict: ['keep their distance', 'Never get close', 'Did people stay away from the moose?'] },
    'How to Make a Rain Gauge': { facts: { 'Why do you put pebbles in the bottom?': ['so the bottle will not tip over', 'handful of pebbles'], 'Where should you put the gauge?': ['in an open place, away from trees', 'away from trees'],
      'What does a rain gauge measure?': ['how much rain falls', 'A rain gauge measures'], 'Who should cut the bottle?': ['a grown-up', 'cut the top off'] }, main: 'build a rain gauge' },
    'Bring Back Our School Garden': { facts: { 'Who is the letter to?': ['Principal Okafor', 'Dear'], 'What did the class grow last spring?': ['beans, squash and sunflowers', 'Last spring'], 'Where did the vegetables go?': ['to the community food bank', 'In June'],
      'How could the class pay for seeds?': ['hold a plant sale', 'pay for seeds'] }, main: 'bring back the school garden', conclusion: ['money problem', 'plant sale'] },
    'We Need a Skatepark': { facts: { 'Who is the letter to?': ['the editor', 'Dear Editor'], 'Where do kids skate now?': ['in a parking lot', 'Right now'], 'Where could the skatepark go?': ['in Lakeview Park', 'could go'] },
      main: 'build a skatepark', conclusion: ['worried about kids getting hurt', 'Last month'] },
    'Keep Dogs on Leashes': { facts: { 'Who does Grace walk with?': ['her grandson', 'every morning'], 'What happened near the slide?': ['A dog knocked over a small child.', 'Last week'], 'What does the sign at the gate say?': ['Dogs must be on a leash.', 'already says'] },
      main: 'stay on leashes', conclusion: ['not being followed', 'ignore it'] },
    'Geese Going South': { facts: { 'What shape do the geese make?': ['a V', 'cuts the sky'], 'What is the speaker holding?': ['a rake', 'I stand still'], 'What do the geese follow?': ['rivers', 'rivers down'] }, main: 'watches geese fly south' },
    'Beaver and Otter': { facts: { 'What did Beaver pile by her lodge?': ['branches', 'Beaver worked all autumn'], 'What did Otter do while Beaver worked?': ['slid and splashed in the pond', 'muddy bank'], 'What did Otter do in the spring?': ['dragged branches to the lodge', 'In the spring'] },
      main: 'get ready for hard times', conclusion: ['Otter has changed', 'first one up'], predict: ['sorry when winter comes', 'Winter is coming', 'Was Otter sorry when winter came?'] },
    'How a Snowflake Grows': { facts: { 'What does a snowflake start on?': ['a tiny speck of dust', 'A snowflake begins'], 'How many arms do most snowflakes have?': ['six', 'six sides'], 'Which snow is best for snowmen?': ['wet snow', 'snowmen'],
      'When do flakes stay small and dry?': ['when the air is very cold', 'very cold'] }, main: 'form in clouds', conclusion: ['unlikely to look exactly the same', 'its own way'] },
    'The Final Game': { facts: { 'What position did Noah play?': ['goalie', 'final game'], 'Why could Lola Rosa not drive?': ['Her car would not start.', 'promised to bring'], 'How did Lola Rosa get to the arena?': ['by bus', 'bus stop'],
      'What was the score after the third period?': ['2 to 2', 'In the third period'] }, main: 'grandmother arrives', conclusion: ['confidence', 'grinned'],
      predict: ['get to the game with the banner', 'grabbed the banner', 'Did Lola Rosa make it to the game?'] },
    "Lacrosse: The Creator's Game": { facts: { 'Who first played lacrosse?': ['First Nations, including the Haudenosaunee', 'first played'], 'What do many Haudenosaunee call lacrosse?': ["the Creator's Game", "call it the Creator's"],
      'What were sticks once carved from?': ['hickory wood', 'Sticks were'], 'What is lacrosse in Canada today?': ['the national summer sport', 'national summer'] }, main: 'old First Nations game', conclusion: ['important part of Haudenosaunee culture', 'give thanks'] }
  };
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || q.pic || ''; const p = d.querySelector('.psg'); if (!p) return null;
    return { title: text(p.querySelector('.pt').innerHTML), heads: p.querySelectorAll('.psh').length, paras: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)),
      sents: [...p.querySelectorAll('.ps')].map(x => ({ s: text(x.innerHTML), hit: x.getAttribute('data-hit') })) }; };
  const key = q => KEY[card(q).title] || {};
  const all = q => card(q).sents.map(x => x.s).join(' ');
  const inText = (q, s) => card(q).sents.some(x => x.s === s);
  const sentWith = (q, w) => card(q).sents.filter(x => x.s.includes(w));
  /* the tapped sentence of a tap-the-sentence question */
  const tapped = q => (card(q).sents.find(x => x.hit === String(q.answer)) || {}).s || '';
  const fact = (q, m) => key(q).facts && key(q).facts[text(m.q)];

  /* ---------- find it ---------- */
  V['g4-fact'] = (q, m) => { const f = fact(q, m); return f && mk(q) === f[0] && sentWith(q, f[1]).length ? '' : 'expected ' + (f && f[0]); };
  V['g4-tap-fact'] = (q, m) => { const f = fact(q, m); return f && tapped(q).includes(f[1]) ? '' : 'the sentence tapped does not answer it'; };
  V['g4-find-line'] = (q, m) => { const f = fact(q, m), ok = q.options.map(text).filter(o => o.includes(f[1])); return ok.length === 1 && mk(q) === ok[0] && inText(q, ok[0]) ? '' : 'the sentence that answers it is not the one marked'; };
  V['g4-read-fact-tf'] = (q, m) => { const f = fact(q, m); return f && q.answer === (text(m.said) === f[0]) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said; };

  /* ---------- the main idea and its details ---------- */
  V['g4-main'] = q => mk(q).includes(key(q).main) ? '' : 'expected the option about "' + key(q).main + '"';
  V['g4-main-tf'] = (q, m) => q.answer === text(m.said).includes(key(q).main) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong';
  /* supporting details are sentences from the passage; the others are not in it */
  V['g4-support'] = q => { const ok = q.options.map(text).filter(o => inText(q, o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the detail that is in the text'; };
  V['g4-support-pick'] = q => H.sameSet(q.options.map((o, i) => inText(q, text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the details from the text are not the ones marked';
  V['g4-detail-odd'] = q => { const ok = q.options.map(text).filter(o => !inText(q, o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one that is not in the text'; };

  /* ---------- in order: the events come in the text in this order ---------- */
  const place = (q, e) => all(q).indexOf(text(e).replace(/[“”]/g, ''));
  V['g4-order'] = q => { const at = q.items.map(i => place(q, i)); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g4-first-last'] = (q, m) => { const at = q.tiles.map(t => place(q, t)), want = m.first ? Math.min(...at) : Math.max(...at); return at.every(p => p >= 0) && at[q.answer] === want ? '' : 'that is not the ' + (m.first ? 'first' : 'last'); };
  V['g4-after'] = (q, m) => { const from = all(q).indexOf(m.ev), at = q.options.map(o => place(q, o)).map(p => p > from ? p : Infinity), best = Math.min(...at);
    return from >= 0 && best < Infinity && at[q.answer] === best ? '' : 'the marked event is not the next one'; };
  V['g4-map'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const box = [...d.querySelectorAll('.wchain li')].map(li => text(li.innerHTML));
    const a = place(q, box[0]), b = place(q, box[2]), p = place(q, H.marked(q)); return a >= 0 && b > a && p > a && p < b ? '' : 'the marked event does not come between the two boxes'; };

  /* ---------- conclusions: the right one, and the sentence that backs it up ---------- */
  V['g4-conclude'] = q => { const c = key(q).conclusion; return c && mk(q).includes(c[0]) && sentWith(q, c[1]).length ? '' : 'expected the conclusion about "' + (c && c[0]) + '"'; };
  V['g4-conclude-tap'] = q => { const c = key(q).conclusion; return c && tapped(q).includes(c[1]) ? '' : 'the sentence tapped does not back up the conclusion'; };
  V['g4-conclude-why'] = q => { const c = key(q).conclusion; return c && mk(q).includes(c[1]) && inText(q, mk(q)) ? '' : 'the sentence marked does not back up the conclusion'; };
  V['g4-conclude-tf'] = (q, m) => { const c = key(q).conclusion; return c && q.answer === text(m.said).includes(c[0]) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said; };

  /* ---------- predictions: the clue is in the part shown, and the rest of the story is not shown ---------- */
  const pred = q => key(q).predict;
  V['g4-predict'] = q => { const p = pred(q); return p && mk(q).includes(p[0]) && all(q).includes(p[1]) ? '' : 'expected the prediction "' + (p && p[0]) + '"'; };
  V['g4-clue-tap'] = q => { const p = pred(q); return p && tapped(q).includes(p[1]) ? '' : 'the sentence tapped does not have the clue'; };
  V['g4-predict-tf'] = (q, m) => { const p = pred(q); return p && q.answer === text(m.said).includes(p[0]) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said; };
  V['g4-check-predict'] = q => { const p = pred(q); return p && mk(q) === p[2] ? '' : 'expected the question ' + (p && p[2]); };

  /* ---------- fix-up strategies ---------- */
  const FIX = { migrate: 'Look it up', 'new facts': 'Slow down and reread', 'cannot picture': 'Make a picture', 'next sentence': 'Read ahead', 'know more than': 'Check another',
    'why a character': 'Ask a question', 'cannot remember': 'Stop and tell yourself', chart: 'Read its title and labels' };
  const fixFor = s => FIX[Object.keys(FIX).find(k => text(s).toLowerCase().includes(k.toLowerCase()))];
  V['g4-monitor'] = (q, m) => mk(q).startsWith(fixFor(m.s)) ? '' : 'expected ' + fixFor(m.s);
  V['g4-monitor-tf'] = (q, m) => q.answer === text(m.said).startsWith(fixFor(m.s)) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said;
  V['g4-which-problem'] = (q, m) => fixFor(mk(q)) && text(m.fix).startsWith(fixFor(mk(q))) ? '' : 'the problem marked is not the one ' + m.fix + ' fixes';
  const SHORT = { 'A word the text never explains': 'Look it up', 'Lots of new facts': 'Slow down, reread', 'Cannot picture it': 'Make a mind picture', 'Explained later?': 'Read ahead',
    'Want to know more': 'Check another source', 'Confused about why': 'Ask a question', 'Cannot remember it': 'Retell it to yourself', 'A confusing chart': 'Read the labels' };
  V['g4-monitor-match'] = q => q.pairs.every(p => SHORT[text(p[0])] === text(p[1])) ? '' : 'a problem is matched to the wrong strategy';
  /* the good ideas each fix a problem; skipping, rushing, guessing or giving up do not */
  V['g4-fix-up'] = q => H.sameSet(q.options.map((o, i) => Object.values(FIX).some(f => text(o).startsWith(f)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good ideas are not the ones marked';

  /* ---------- kinds of texts: worked out from the passage ---------- */
  const KIND = { 'Two Ways Home': 'story', 'My Volcano': 'story', 'Your First Ski Trail': 'story', 'The Portage': 'story', 'Your First Night at Camp': 'story', 'The Moose on Main Street': 'story', 'The Final Game': 'story',
    'Crow Opens a Shop': 'fable', 'Beaver and Otter': 'fable', 'The Old Maple': 'poem', 'Geese Going South': 'poem' };
  /* "Dear" is a letter, numbered steps are instructions, headings are information; stories, fables and poems from the key */
  const kindOf = c => /^Dear /.test(c.sents[0].s) ? 'letter' : c.sents.some(x => /^\d\. /.test(x.s)) ? 'instructions' : c.heads ? 'information' : KIND[c.title];
  const kindOfTitle = t => { const k = KIND[t]; return k || (/^How to/.test(t) ? 'instructions' : null); };
  const PURPOSE = { story: 'to enjoy a story', fable: 'to learn a lesson from a story', information: 'to learn facts', poem: 'to enjoy a poem', instructions: 'to learn how to do something', letter: 'to hear an opinion' };
  V['g4-form'] = q => mk(q) === kindOf(card(q)) ? '' : 'expected ' + kindOf(card(q));
  V['g4-form-tf'] = (q, m) => { const k = kindOf(card(q)); return q.answer === (text(m.said) === k) && text(q.why.options[q.why.answer]).includes({ story: 'characters', fable: 'animals', information: 'headings', poem: 'short lines', instructions: 'numbered steps', letter: 'greeting' }[k]) ? '' : 'wrong for a ' + k; };
  const HELPS = { story: 'problem', fable: 'lesson', information: 'Headings', poem: 'Short lines', instructions: 'numbers', letter: 'greeting' };
  V['g4-form-help'] = q => mk(q).includes(HELPS[kindOf(card(q))]) ? '' : 'expected how a ' + kindOf(card(q)) + ' helps';
  const FEAT = { story: 'characters', fable: 'animals', information: 'headings', poem: 'short lines', instructions: 'numbered steps', letter: 'greeting' };
  V['g4-form-feature'] = q => q.pairs.every(p => text(p[1]).includes(FEAT[text(p[0])])) ? '' : 'a kind is matched to the wrong feature';
  V['g4-purpose'] = q => mk(q) === PURPOSE[kindOf(card(q))] ? '' : 'expected ' + PURPOSE[kindOf(card(q))];
  V['g4-purpose-tf'] = (q, m) => q.answer === (text(m.said) === PURPOSE[kindOf(card(q))]) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said;
  /* the title alone: letters ask for something ("Keep...", "Bring Back..."); information texts are named in the key below */
  const INFO = { 'monarch butterflies': 'Monarch Butterflies', 'the Three Sisters': 'The Three Sisters', inuksuit: 'Inuksuit: Messengers of Stone', 'how bees make honey': 'From Flower to Honey', snowflakes: 'How a Snowflake Grows', lacrosse: "Lacrosse: The Creator's Game" };
  const LETTERS = ['Keep Riverside Pool Open', 'Bring Back Our School Garden', 'We Need a Skatepark', 'Keep Dogs on Leashes'];
  const titleKind = t => LETTERS.includes(t) ? 'letter' : Object.values(INFO).includes(t) ? 'information' : kindOfTitle(t);
  V['g4-choose'] = (q, m) => PURPOSE[titleKind(mk(q))] === text(m.want) && q.tiles.filter(t => PURPOSE[titleKind(text(t))] === text(m.want)).length === 1 ? '' : 'the text marked does not fit "' + m.want + '"';
  V['g4-choose-topic'] = (q, m) => mk(q) === INFO[text(m.want)] ? '' : 'expected ' + INFO[text(m.want)];
  V['g4-match-purpose'] = q => q.pairs.every(p => PURPOSE[titleKind(text(p[0]))] === 'to ' + text(p[1])) ? '' : 'a text is matched to the wrong purpose';

  /* ---------- who is telling it: you or your outside speech marks is second, I or my is first, otherwise third ---------- */
  const povOf = c => { const s = c.sents.map(x => x.s).join(' ').replace(/“[^”]*”/g, ''); return /\b(You|you|your)\b/.test(s) ? 'second' : /\b(I|my|me)\b/.test(s) ? 'first' : 'third'; };
  V['g4-narrator'] = q => mk(q).startsWith(povOf(card(q))) ? '' : 'expected ' + povOf(card(q)) + ' person';
  V['g4-narrator-word'] = q => { const s = card(q).sents.map(x => x.s).join(' ').replace(/“[^”]*”/g, ''), w = mk(q), p = povOf(card(q));
    return new RegExp('\\b' + w + '\\b', 'i').test(s) && ({ I: 'first', You: 'second' }[w] || 'third') === p ? '' : 'the word marked does not show ' + p + ' person'; };
  V['g4-narrator-tf'] = (q, m) => q.answer === (m.said === povOf(card(q))) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true or false is wrong for ' + m.said;
  const GOOD = { 'first person': 'thinks and feels', 'second person': 'puts you', 'third person': 'several characters' };
  const BAD = { 'first person': 'only know what the narrator knows', 'second person': 'strange', 'third person': 'what each character thinks' };
  V['g4-pov-good'] = (q, m) => mk(q).includes(GOOD[m.pov]) ? '' : 'expected the advantage of ' + m.pov;
  V['g4-pov-bad'] = (q, m) => mk(q).includes(BAD[m.pov]) ? '' : 'expected the drawback of ' + m.pov;
  V['g4-pov-match'] = q => q.pairs.every(p => text(p[1]).includes(GOOD[text(p[0])]) || text(p[1]).includes(BAD[text(p[0])])) &&
    (q.pairs.every(p => text(p[1]).includes(GOOD[text(p[0])])) || q.pairs.every(p => text(p[1]).includes(BAD[text(p[0])]))) ? '' : 'a point of view is matched wrongly';
})();
