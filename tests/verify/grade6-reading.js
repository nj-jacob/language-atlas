/* Grade 6 answer checks: reading for meaning (grade6/chapters/reading.js). Comprehension answers come from a passage, so the checker keeps its
   own answer key (like a second marker), and works out what it can from the passage itself: where events come, the form, and who tells it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* per passage: its form, facts { question: [answer, words in the sentence that answers it] }, the summary and a detail (first words of each),
     conclusions { question: [conclusion, clue] }, a prediction and its clue, another narrator and what would change, and the point of view */
  const KEY = {
    'The Long Portage': {"kind":"story","facts":{"Who carried the canoe?":["Uncle Ray","lifted the canoe"],"How far away was the next lake?":["two kilometres","two-kilometre walk"],"What did Tala carry?":["both packs","carried both packs"]},"main":["Tala keeps going on a","Mosquitoes are a problem"],"infer":{"How does Tala feel halfway along the trail?":["tired and sore","straps dug into her shoulders"],"How does Tala feel at the end?":["relieved and proud","dropped the packs and laughed"]},"predict":["Tala will reach the next","she kept walking"],"alt":["Uncle Ray","We would not know that Tala"],"pov":"third"},
    'Tryouts': {"kind":"story","facts":{"What were the tryouts for?":["basketball","basketball tryouts"],"How many shots in a row did the narrator make?":["three","the next three"]},"main":["A nervous player pushes through","Basketball is a popular"],"infer":{"How does the narrator feel at the gym door?":["nervous","cold feet"],"What kind of person is Coach Ahmed?":["encouraging","Everyone starts somewhere"]},"predict":["The narrator will make the","I made the next three"],"alt":["Coach Ahmed","We would not know how nervous"],"pov":"first"},
    'Your First Night in the Tent': {"kind":"story","facts":{"What calls across the lake?":["a loon","loon calls"],"What made the rustle in the leaves?":["a chipmunk","only a chipmunk"]},"infer":{"How do you feel when you hear the rustle?":["scared","hold your breath"],"How do you feel once you see the chipmunk?":["relieved","you smile and close your eyes"]},"alt":["the chipmunk","We would not feel the camper's"],"pov":"second"},
    'A Ramp for Everyone': {"kind":"report","facts":{"How many signatures did the council collect?":["300","300 signatures"],"Where was the ramp built?":["at the front doors","built at the front doors"]},"main":["Students got a ramp built","The school has six"],"infer":{"Why did the council collect signatures?":["to show that many people wanted a ramp","presented a plan"]}},
    'Why Lake Ice Sings': {"kind":"report","facts":{"When does lake ice shrink?":["on very cold nights","ice shrinks"],"What does the ice do when the sun warms it?":["It expands.","ice expands"]},"main":["Changes in temperature make lake","Skating is a fun"]},
    'Two Canadian Bears': {"kind":"report","facts":{"What do polar bears mostly eat?":["seals","mostly seals"],"Where do black bears live?":["in forests","live in forests"]},"main":["Black bears and polar bears","Polar bears have white"]},
    'Snowmobiles Do Not Belong on Our Trails': {"kind":"opinion","pov":"first"},
    'First Snow': {"kind":"poem"},
    'At the Dock': {"kind":"script"},
    'How to Press a Leaf': {"kind":"instructions","facts":{"How long do you wait before lifting the leaf out?":["one week","Wait one week"]}},
    'The Winter Road': {"kind":"story","facts":{"How long is the winter road open each year?":["eight weeks","For eight weeks"],"What did Kokum see on the ice ahead?":["a pressure crack","A pressure crack"],"What did they bring home for Jonah's aunt?":["a new washing machine","new washing machine"],"How far south is the highway?":["three hundred kilometres","three hundred kilometres south"],"Who waved them across the ice?":["a worker","a worker waved"]},"main":["Jonah rides the winter road","The trailer was filled"],"infer":{"How does Jonah feel while they wait?":["impatient","Jonah wanted to keep going"],"What does Kokum think of Jonah by the end?":["that he is ready to learn more","you can learn to read the ice"],"Why do they wait for the crew?":["The ice near the crack might not be safe.","We wait for the crew to check it"]},"predict":["A worker will show them","We wait for the crew to check it"],"alt":["Kokum","We would learn what Kokum knows"],"pov":"third"},
    'The Lemon Battery': {"kind":"story","facts":{"What did the narrator push into each lemon?":["a copper coin and a zinc nail","copper coin and a zinc nail"],"Where did the narrator get the LED?":["from a sister's craft box","craft box"],"What colour did the LED glow?":["red","faint red dot"],"How many lemons did the narrator use?":["four","each of four lemons"],"What did the judge like best?":["the explanation of the mistake","best part of my project"]},"main":["A student's lemon battery fails","Dev is the narrator's"],"infer":{"How does the narrator feel when the bulb stays dark?":["worried and disappointed","my stomach sank"],"How has Dev changed by the end?":["He respects the narrator's work.","help with his next experiment"]},"predict":["The narrator will try again","one word I had skipped: LED"],"alt":["Dev","We would not know how the"],"pov":"first"},
    'The Night Market': {"kind":"story","facts":{"What did Mei's family sell?":["steamed buns","sold steamed buns"],"Why did Mei help run the stall alone with her mother?":["Her father had a fever.","had a fever"],"What did the man use to tie the tent down?":["a spare rope","spare rope"],"When did they sell the last bun?":["at ten","At ten"],"What did the man from the next stall sell?":["dumplings","I sell dumplings"]},"main":["Mei and her mother run","The line stretched past"],"infer":{"Who is the saved bun most likely for?":["her father","She knew exactly who it was for"],"How does Mei feel when the line is long?":["rushed and nervous","fingers felt clumsy"],"What kind of person is the man at the next stall?":["helpful and friendly","We help each other"]},"predict":["Someone will grab the tent","lifted the corner of the tent"],"alt":["Mei's father","We would only hear about the"],"pov":"third"},
    'The Climbing Wall': {"kind":"story","facts":{"What is the instructor's name?":["Ms. Okafor","Ms. Okafor calls"],"What do you tap at the top?":["a bell","tap the bell"],"What advice does the instructor call out?":["Use your legs, not just your arms.","Use your legs"],"How tall is the wall?":["taller than a two-storey house","two-storey house"],"What colour is the hold that is just out of reach?":["blue","blue hold"]},"main":["You climb a tall wall","The wall has green"],"infer":{"How do you feel halfway up?":["scared and tired","arms start to shake"],"How do you feel about climbing at the end?":["eager to do it again","asking when you can climb again"]},"predict":["You will push with your","Use your legs, not just your arms"],"alt":["Ms. Okafor","We would not feel the shaking"],"pov":"second"},
    'Towers for Chimney Swifts': {"kind":"report","facts":{"How do chimney swifts rest?":["by clinging to rough walls","clinging to rough walls"],"How much money did the class raise?":["$900","raised $900"],"When did the tower go up?":["in May","went up in a park"],"How many swifts did volunteers count by August?":["more than 200","more than 200"],"Who did the students write to?":["the town council","wrote to the town council"]},"main":["A class helped chimney swifts","Local builders gave the"],"infer":{"Why does the class share its counts with researchers?":["to help people learn if the swifts are recovering","shares the numbers with a bird research group"],"Why did the flock need a new place to roost?":["Its old chimney was gone.","lost its chimney"]}},
    'Why Monarchs Need Milkweed': {"kind":"report","facts":{"What is the only food monarch caterpillars eat?":["milkweed leaves","only food they will eat"],"Where do Ontario monarchs fly in late summer?":["to forests in Mexico","mountain forests in Mexico"],"How far do the monarchs fly?":["about 4000 kilometres","4000 kilometres"],"Where do monarchs lay their eggs?":["on milkweed","lay their eggs"]},"main":["Monarchs depend on milkweed, so","Monarchs fly to Mexico."],"infer":{"Why can only well-fed butterflies finish the trip?":["The trip is long and takes a lot of energy.","Only strong, well-fed butterflies"]}},
    'Canoe or Kayak?': {"kind":"report","facts":{"How many blades does a kayak paddle have?":["two","a blade at each end"],"What were the first kayaks made from?":["wood and sealskin","wood and sealskin"],"Why can canoes carry lots of gear?":["They are open on top.","open on top"],"Which boat do many paddlers choose for rough water?":["a kayak","For rough water"]},"main":["Canoes and kayaks are alike","Kayak paddles have two"]},
    'Lacrosse: The Creator\'s Game': {"kind":"report","facts":{"What wood are traditional sticks carved from?":["hickory","carved from hickory"],"When did Canada name lacrosse its national summer sport?":["in 1994","In 1994"],"What do many Haudenosaunee people call lacrosse?":["the Creator's Game","call lacrosse the Creator"],"How many players could some games have long ago?":["hundreds","hundreds of players"]},"main":["Lacrosse is a First Nations","Sticks are strung with"],"infer":{"Why is lacrosse called more than a sport?":["It is also played to give thanks and to heal.","to help people heal"]}},
    'How to Build a Bird Box': {"kind":"instructions","facts":{"How wide is the entrance hole?":["4 centimetres","4 centimetres wide"],"Why do you drill holes in the floor?":["so rain can drain out","rain can drain"],"How high should you hang the box?":["about two metres","two metres high"],"How many pieces do you cut?":["six","into six pieces"]},"main":["The steps to build and","The floor has small"],"infer":{"Why should the roof hang over the front?":["to keep rain out of the hole","keeps the hole dry"]}},
    'Give Us a Longer Lunch!': {"kind":"opinion","facts":{"How long is the lunch break now?":["forty minutes","only forty minutes"],"Where is the petition?":["in the library","petition in the library"],"What do some teachers say?":["The school day would end later.","Some teachers say"]},"main":["Riya argues that the lunch","Students put on their"],"pov":"first"},
    'Plant Trees, Not Parking': {"kind":"opinion","facts":{"How many free parking spaces did the team count?":["40","counted 40"],"What do trees do on hot days?":["cool our streets","cool our streets"]},"main":["The Green Team argues that","Trees give birds a"],"pov":"first"},
    'Keep the Arena Open Late': {"kind":"opinion","facts":{"When does the town want to close the arena?":["at 9 p.m.","wants to close"],"Until when do the families want the arena open?":["11 p.m.","open until 11"]},"main":["Hockey families argue that the","The town wants to"],"pov":"first"},
    'The Missing Tickets': {"kind":"script","facts":{"What did Amir buy at the snack bar?":["muffins","bought the muffins"],"Who is Zainab?":["Amir's aunt","his aunt, ZAINAB"],"Who finds the tickets?":["the cashier","cashier holds up"]},"infer":{"How does Zainab react to the lost tickets?":["calmly","(calmly)"],"Why does Amir say Zainab should keep the tickets next time?":["He knows he can lose things.","you keep the tickets"]},"predict":["They will find the tickets","At the snack bar"]}
  };
  const key = (m, f) => (KEY[text(m.t || '')] || {})[f];
  const want = m => (key(m, 'facts') || {})[text(m.q)];
  const inf = m => (key(m, 'infer') || {})[text(m.q)];
  /* read the passage card back out of the question's picture: its title, number of headings and sentences */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.pic || q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    const lines = [...p.querySelectorAll('.ps')].map(x => text(x.innerHTML));
    return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', heads: p.querySelectorAll('.psh').length, lines, all: lines.join(' ') }; };
  /* the form, from how the text is set out */
  const kindOf = c => c.lines.some(l => /^[A-Z]+: /.test(l)) ? 'script' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads ? 'report' : /^Posted by/.test(c.lines[0]) ? 'opinion'
    : c.lines.every(l => l.split(' ').length < 9) ? 'poem' : 'story';
  /* the person of a sentence or a story, from the words outside quotation marks */
  const personOf = s => { s = s.replace(/“[^”]*”/g, ''); return /\b(I|my|me)\b/.test(s) ? 'first' : /\b(you|your)\b/i.test(s) ? 'second' : /\b(he|she|his|her|they)\b/i.test(s) ? 'third' : ''; };
  const PURPOSE = { story: 'to enjoy a story', report: 'to learn facts', instructions: 'to learn how to do something', opinion: 'to hear an opinion', poem: 'to enjoy a poem', script: 'to enjoy a play' };
  const CLUE = { story: /Characters/, report: /Headings/, instructions: /numbered steps/, opinion: /convince/, poem: /Short lines/, script: /Speaker names/ };
  const HOW = { story: /Picture the events/, report: /headings/, instructions: /one step at a time/, opinion: /check the reasons/, poem: /aloud/, script: /who is speaking/ };
  const FIX = { 'You meet a word you do not know.': /glossary or dictionary/, 'You cannot picture what is happening.': /picture of it in your mind/, 'A paragraph is confusing.': /Read ahead/,
    'You are not sure a fact is right.': /another source/, 'You wonder why a character acted that way.': /Ask a question/, 'You realize you have not taken in the last page.': /reread/ };
  const fixes = s => Object.values(FIX).some(r => r.test(s));
  const STRATEGY = { 'drew a quick sketch': 'visualizing', 'kept reading': 'reading ahead', 'wrote a question': 'asking questions', 'looked up the word': 'using a reference', 'checked the fact': 'checking another source' };
  /* the sentence the child tapped, and how many sentences hold some words */
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const tapHas = (q, s) => { const t = tapped(q); return !!s && t.count(s) === 1 && t.hit.includes(s); };
  const sent = q => { const d = document.createElement('div'); d.innerHTML = q.fig; return text(d.querySelector('.sent').innerHTML); };
  const dot = s => s.replace(/\.$/, ''), after = (q, word) => dot((text(q.q).match(new RegExp(word + ':? (.+)$')) || [, ''])[1]);
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const tf = (q, right) => q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right;

  /* evidence */
  V['g6-fact'] = (q, m) => { const w = want(m); return w && mk(q) === w[0] && card(q).all.includes(w[1]) ? '' : 'expected ' + (w && w[0]); };
  V['g6-tap-fact'] = (q, m) => { const w = want(m); return w && tapHas(q, w[1]) ? '' : 'the tapped sentence does not answer it'; };
  V['g6-evidence'] = (q, m) => { const w = want(m), ok = w ? q.options.map(text).filter(o => o.includes(w[1])) : []; return ok.length === 1 && mk(q) === ok[0] ? '' : 'the evidence sentence is not the one marked'; };
  V['g6-fact-tf'] = (q, m) => { const w = want(m), said = text(q.q).match(/answers: (.+)$/)[1]; return w ? tf(q, said === w[0]) : 'no key for ' + m.q; };
  /* summaries */
  V['g6-summary'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).startsWith(k[0]) ? '' : 'expected the summary "' + (k && k[0]) + '..."'; };
  V['g6-detail'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).startsWith(k[1]) ? '' : 'expected the detail "' + (k && k[1]) + '..."'; };
  V['g6-support'] = (q, m) => { const k = key(m, 'main'), d = document.createElement('div'); d.innerHTML = q.fig; const top = text(d.querySelector('.ww-top').innerHTML);
    const src = Object.values(window.Atlas.texts).find(t => t && t.lines && text(t.title) === text(m.t)), mine = src ? src.lines.map(text) : [], ok = q.options.map(o => mine.includes(text(o)));
    return k && top.startsWith(k[0]) && ok.filter(Boolean).length === 1 && ok[q.answer] ? '' : 'expected the one detail from the same text'; };
  V['g6-summary-tf'] = (q, m) => { const k = key(m, 'main'); return k ? tf(q, sent(q).startsWith(k[0])) : 'no key'; };
  V['g6-order'] = q => { const c = card(q), at = q.items.map(i => c.all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  /* conclusions */
  V['g6-conclude'] = (q, m) => { const k = inf(m); return k && mk(q) === k[0] && card(q).all.includes(k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g6-reading-clue'] = (q, m) => { const k = inf(m); return k && mk(q) === k[1] && card(q).all.includes(k[1]) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  V['g6-conclude-tap'] = (q, m) => { const k = inf(m); return k && tapHas(q, k[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  V['g6-conclude-tf'] = (q, m) => { const k = inf(m); return k ? tf(q, after(q, 'concludes') === dot(k[0])) : 'no key for ' + m.q; };
  /* predictions */
  V['g6-predict'] = (q, m) => { const k = key(m, 'predict'); return k && mk(q).startsWith(k[0]) && card(q).all.includes(k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '..."'; };
  V['g6-predict-clue'] = (q, m) => { const k = key(m, 'predict'); return k && mk(q) === k[1] && card(q).all.includes(k[1]) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  V['g6-clue-tap'] = (q, m) => { const k = key(m, 'predict'); return k && tapHas(q, k[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  V['g6-predict-tf'] = (q, m) => { const k = key(m, 'predict'); return k && card(q).all.includes(k[1]) ? tf(q, after(q, 'predicts').startsWith(k[0])) : 'no key'; };
  V['g6-adjust'] = (q, m) => { const k = key(m, 'predict'); return k && /^Change my prediction/.test(mk(q)) && text(q.fig).includes(k[1]) && !text(m.guess).startsWith(k[0]) ? '' : 'expected to change a wrong prediction'; };
  /* monitoring */
  V['g6-monitor'] = q => { const p = text(q.fig), r = FIX[p]; return r && r.test(mk(q)) && q.options.filter(o => r.test(text(o))).length === 1 ? '' : 'expected the strategy for: ' + p; };
  V['g6-match-fix'] = q => q.pairs.every(p => FIX[text(p[0])] && FIX[text(p[0])].test(text(p[1]))) ? '' : 'a problem is matched to the wrong strategy';
  V['g6-fix-tf'] = (q, m) => { const r = FIX[m.s], said = text(q.fig); return r ? tf(q, r.test(said)) : 'no fix for ' + m.s; };
  V['g6-name-strategy'] = q => { const k = Object.keys(STRATEGY).find(s => text(q.q).includes(s)); return k && mk(q) === STRATEGY[k] ? '' : 'expected ' + (k && STRATEGY[k]); };
  V['g6-good-fixes'] = q => H.sameSet(q.options.map((o, i) => fixes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful strategies are not the ones marked';
  /* purpose */
  V['g6-purpose'] = q => mk(q) === PURPOSE[kindOf(card(q))] ? '' : 'expected ' + PURPOSE[kindOf(card(q))];
  V['g6-which-text'] = q => { const w = text(q.q).match(/You want (.+)\. Which/)[1], fits = q.tiles.map(t => PURPOSE[(KEY[text(t)] || {}).kind] === w);
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the text you read ' + w; };
  V['g6-how-read'] = q => { const r = HOW[kindOf(card(q))]; return r.test(mk(q)) && q.options.filter(o => r.test(text(o))).length === 1 ? '' : 'expected the way to read a ' + kindOf(card(q)); };
  V['g6-purpose-tf'] = q => tf(q, after(q, 'read this') === PURPOSE[kindOf(card(q))]);
  /* forms */
  V['g6-form'] = q => mk(q) === kindOf(card(q)) ? '' : 'expected ' + kindOf(card(q));
  V['g6-form-clue'] = q => { const r = CLUE[kindOf(card(q))]; return r.test(mk(q)) && q.options.filter(o => r.test(text(o))).length === 1 ? '' : 'expected the clue for ' + kindOf(card(q)); };
  V['g6-form-tf'] = q => { const k = kindOf(card(q)), said = text(q.q).match(/this is an? (\w+)\.$|this is (instructions)\.$/), right = !!said && (said[1] || said[2]) === k;
    return q.answer === right && CLUE[k].test(text(q.why.options[q.why.answer])) ? '' : 'expected ' + right + ' because of the clue for ' + k; };
  V['g6-match-form'] = q => q.pairs.every(p => CLUE[text(p[0])] && CLUE[text(p[0])].test(text(p[1]))) ? '' : 'a form is matched to the wrong feature';
  /* point of view */
  V['g6-narrator'] = q => { const p = personOf(card(q).all); return text(q.tiles[q.answer]).startsWith(p) ? '' : 'expected ' + p + ' person'; };
  V['g6-narrator-word'] = q => { const c = card(q), p = personOf(c.all), w = mk(q), out = c.all.replace(/“[^”]*”/g, '');
    return personOf(w) === p && new RegExp('\\b' + w + '\\b', 'i').test(out) ? '' : 'expected a ' + p + ' person word from the text'; };
  V['g6-narrator-tf'] = q => { const p = personOf(card(q).all), said = text(q.q).match(/told in the (\w+) person/)[1], right = said === p;
    return q.answer === right && personOf(text(q.why.options[q.why.answer]).replace(/^The narrator says /, '')) === p ? '' : 'expected ' + right + ' (' + p + ' person)'; };
  V['g6-pov-line'] = (q, m) => { const ps = q.options.map(o => personOf(text(o))); return ps.filter(p => p === m.want).length === 1 && ps[q.answer] === m.want ? '' : 'expected the one sentence in the ' + m.want + ' person'; };
  /* another narrator */
  V['g6-alt-pov'] = (q, m) => { const k = key(m, 'alt'); return k && text(q.q).includes(k[0]) && mk(q).startsWith(k[1]) ? '' : 'expected "' + (k && k[1]) + '..."'; };
  V['g6-alt-tf'] = (q, m) => { const k = key(m, 'alt'); return k && text(q.q).includes(k[0]) ? tf(q, sent(q).startsWith(k[1])) : 'no key'; };
  V['g6-retell'] = (q, m) => { const from = personOf(text(q.fig)), ps = q.options.map(o => personOf(text(o)));
    return from !== m.want && ps.filter(p => p === m.want).length === 1 && ps[q.answer] === m.want ? '' : 'expected the sentence in the ' + m.want + ' person'; };
  V['g6-who-knows'] = q => /first person/.test(mk(q)) ? '' : 'expected the first-person narrator';
})();
