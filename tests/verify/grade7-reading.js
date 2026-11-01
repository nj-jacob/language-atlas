/* Grade 7 answer checks: reading for meaning (grade7/chapters/reading.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and checks that the
   evidence it expects is really in the passage shown: the sentence that answers a fact, the earlier sentence a tie word points
   back to, the clue for a prediction and the sentence that proves a conclusion. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* per passage: facts { question: [answer, words in the sentence that answers it] },
     ties { tie word|words from its sentence: [what it points back to, words from the earlier sentence] },
     main [words from the main idea, words from the detail], details [words from each supporting detail],
     conclusion [supported, goes too far, against the text, words from the proof sentence], predict [prediction, clue, proof] */
  const KEY = {
    'Between the Posts': { facts: { 'What does the goalie watch?': ["the forward's eyes", 'watch her eyes'], 'Which way does the goalie guess?': ['left', 'guess left'], 'Where does the puck end up?': ["in the goalie's glove", 'into your glove'] },
      ties: { 'her|watch her eyes': ['the forward', 'forward races'] }, predict: ['move left', 'guess left', 'into your glove'] },
    'Inuksuit: Stone Messengers': { facts: { 'Who builds inuksuit?': ['Inuit', 'Inuit have built'], 'What can an inuksuk mark?': ['a safe route', 'safe route'], 'Why should travellers never knock one down?': ['It may be guiding someone later.', 'may be guiding'] },
      ties: { 'It|may be guiding': ['an inuksuk', 'knock one down'], 'Others|good fishing spots': ['other inuksuit', 'Some inuksuit mark'] },
      main: ['stone figures that Inuit build', 'good fishing spots'], details: ['safe route', 'food was stored'], conclusion: ['few roads or signs', 'whole Arctic', 'only for decoration', 'safe route'] },
    'The Wall on the River': { facts: { 'What did the upper village build?': ['a wall across the river', 'built a wall'], 'What did the lower village stop trading?': ['seed', 'stopped trading seed'], "What happened to the upper village's fields in the drought?": ['They failed.', 'failed anyway'] },
      ties: { 'Its|stopped trading seed': ['the lower village', 'wells in the lower'], 'That summer|seed traded hands': ['after the wall came down', 'pulled down the wall'] },
      main: ['hurting both', 'corn grew tall'], conclusion: ['need each other', 'Every wall in the world', 'did better without', 'failed anyway'], predict: ['without new seed', 'stopped trading seed', 'no new seed'] },
    'Roads Made of Ice': { facts: { 'What do trucks bring in on the winter roads?': ['fuel, food and building supplies', 'bring in fuel'], 'How must goods come when there is no winter road?': ['by plane', 'come by plane'],
      'Why is the winter road season getting shorter?': ['Winters are warmer.', 'Warmer winters'], 'How do crews help the ice get thicker?': ['They clear the snow off it.', 'clearing snow'], 'Why must crews test the ice often?': ['Thin ice can crack under a heavy truck.', 'thin ice can crack'] },
      ties: { 'They|clearing snow': ['the winter roads', 'These winter roads'], 'them|Without them': ['the winter roads', 'Trucks use the roads'], 'As a result|only a few weeks': ['forming later and melting sooner', 'Warmer winters mean'], 'That|make travel safer': ['all-season roads', 'all-season roads'] },
      main: ['warmer winters are shortening', 'twice as much'], details: ['fuel, food', 'forms later'], conclusion: ['pay more to get supplies', 'disappear forever', 'last longer', 'costs far more'] },
    'Gardens on the Roof': { facts: { 'What can happen to storm drains after a heavy storm?': ['They can overflow.', 'can overflow'], 'What is a green roof?': ['a layer of soil and low plants on a building', 'soil and low plants'],
      'When did Toronto begin to require green roofs?': ['in 2009', 'In 2009'], 'How long can a green roof last?': ['twice as long as a plain roof', 'twice as long'] },
      ties: { 'They|also shade the roof': ['the plants', 'The plants soak'], 'Since then|hundreds have been built': ['since 2009', 'In 2009'], 'it|drain away slowly': ['the rain'], 'They|cost more to build': ['green roofs'] },
      main: ['flooding and heat', 'rule in 2009'], details: ['drain slowly', 'keep the building cooler'], conclusion: ['fewer flooded streets', 'stop every storm', 'hotter in summer', 'drain away slowly'] },
    'Two Ways to Heat a Home': { facts: { 'What do many Ontario furnaces burn?': ['natural gas', 'burns natural gas'], 'What does a heat pump do in summer?': ['It cools the house.', 'cools the house'],
      'What do both systems need each year?': ['a check-up', 'check-up'], 'Why do some families keep a small furnace?': ['as a backup in very cold places', 'as a backup'] },
      ties: { 'Instead|moves heat': ['instead of burning something', 'does not burn anything'], 'However|runs on electricity': ['a contrast with burning gas', 'Both systems'], 'it|through vents': ['the heated air'], 'they|cost less to run': ['heat pumps'] },
      main: ['different ways and at different costs', 'through vents'], details: ['a heat pump moves heat', 'less to run'], conclusion: ['cleaner choice', 'removed tomorrow', 'more carbon dioxide', 'do not burn fuel'] },
    'Manoomin: Wild Rice': { facts: { 'When does the harvest happen?': ['in late summer', 'late summer'], 'What does one person use to push the canoe?': ['a long pole', 'long pole'],
      'What are the sticks for tapping the grains made of?': ['cedar', 'cedar sticks'], 'Why is the rice danced on?': ['to loosen the husks', 'loosen the husks'], 'What does manoomin need to grow?': ['clean water at a steady level', 'steady level'] },
      ties: { 'They|seed the bed': ['the grains that fall into the water', 'Many grains fall'], 'it|danced on': ['the dried and roasted rice', 'roasted over a fire'], 'that|part of the plan': ['grains falling into the water'] },
      main: ['harvest with care', 'tap the grains loose'], details: ['seed next year', 'pollution and dams'], conclusion: ['last for years', 'grow anywhere', 'every single grain', 'seed the bed'] },
    'Students Bring a Creek Back to Life': { facts: { 'How many trees did the students plant?': ['300', '300 trees'], 'How warm did the water get in July?': ['27 degrees Celsius', '27 degrees'],
      'What do brook trout need?': ['water below 20 degrees', 'below 20 degrees'], 'Who will check the water each summer?': ['a local conservation group', 'conservation group'] },
      ties: { 'Their|roots will also hold': ['the new trees', 'new trees will shade'], 'their results|shared their results': ['the weekly water tests', 'tested the water'], 'its|lined with concrete': ['the creek'] },
      main: ['cool enough for fish', 'in the 1960s'], details: ['27 degrees', 'shade and cool'], conclusion: ['convince the city', 'every creek in Ontario', 'refused', 'agreed to remove'] },
    'Our School Needs a Quiet Room': { facts: { 'What would solve the worry about skipping class?': ['a sign-in sheet', 'sign-in sheet'], 'How loud was the cafeteria?': ['as loud as a busy street', 'busy street'],
      'Which room could become the quiet room?': ['the old book storage room', 'book storage room'], 'Where does the writer want people to support the idea?': ['at the next school council meeting', 'council meeting'] },
      ties: { 'that|would solve that': ['skip class', 'skip class there'], 'that noise|hard to focus': ['bells, halls', 'school is loud'], 'there|skip class there': ['in the quiet room', 'soft lights'] },
      main: ['should have one', 'busy street'], details: ['hard for some students to focus', 'sign-in sheet'], conclusion: ['more welcoming', 'close its cafeteria', 'cost a lot', 'costs little'] },
    'Our School Needs a Late Bus': { facts: { 'What time do the buses leave now?': ['3:15', 'at 3:15'], 'How many students said they would stay with a ride?': ['64', '64 said'],
      'How much would one late bus cost?': ['about $9000 a year', '$9000 a year'], 'Where does the parent council raise money?': ['at the fall fair', 'fall fair'] },
      ties: { 'that|would change that': ['missing clubs', 'cannot stay for'], 'that much|parent council raises': ['about $9000', 'about $9000'], 'However|bus company': ['costs too much', 'costs too much'] },
      main: ['costs less than people think', 'Choir'], details: ['64 of 120', '$9000'], conclusion: ['small price for fairness', 'every day', 'easily get home', 'same chance'] },
    'The Tryout': { facts: { 'How many players would make the team?': ['twelve', 'Only twelve'], "What hit the narrator's ankle?": ['the loose lace', 'lace whipped'], 'Who handed the narrator a bottle?': ['Ines', 'Ines handed'], 'What did the narrator do during the break?': ['tied a double knot', 'double knot'] },
      ties: { 'She|looked straight at me': ['Coach Haddad'], 'her|match her stride': ['the player ahead'] },
      main: ['what the coach is looking for', 'water bottle'], details: ['keeps running', 'gets back up'], conclusion: ['good chance of making the team', 'best player in the league', 'did not notice', 'looked straight at me'],
      predict: ['lace will cause trouble', 'slipping loose', 'lace whipped'] },
    "Grandfather's Compass": { facts: { "Where did Arjun's grandfather move?": ['into a care home', 'care home'], 'What team did Arjun join by winter?': ['the robotics team', 'robotics team'], 'Who told Arjun about the orienteering club?': ['Maya', 'she told him'], 'When did Arjun visit his grandfather?': ['on Sundays', 'On Sundays'] },
      ties: { 'her|He showed her': ['Maya', 'girl named Maya'], 'That week|lead his team': ['Maya told him about the club', 'orienteering club'], 'he|Each morning': ['Arjun'], 'it|no longer needed': ['the compass'] },
      main: ['find his way at a new school', 'scratched'], details: ['before school each morning', 'orienteering team'], conclusion: ['more confident', 'famous explorer', 'no friends', 'no longer needed'],
      predict: ['notice the compass', 'turning it over and over', 'asked what he was holding'] },
    'The Night Before Diwali': { facts: { 'Why was Priya in charge of the ladoos?': ['Her mother had a cast on her wrist.', 'cast on her wrist'], 'How many pieces did the Gill family order?': ['two hundred', 'Two hundred'],
      'Who did Priya call for help?': ['her cousins Raj and Simran', 'called her cousins'], 'When was the last box taped shut?': ['at a quarter to midnight', 'quarter to midnight'] },
      ties: { 'they|Twenty minutes later': ['Raj and Simran', 'called her cousins'], 'he|We forgot the order': ['her uncle', 'her uncle came in'], 'She|measured the flour': ['Priya'] },
      main: ['finishes a forgotten order', 'old songs'], details: ['calls her cousins', 'before midnight'], conclusion: ['count on', 'by herself next year', 'gave up', 'saved Diwali'],
      predict: ['finish the extra order', 'called her cousins', 'taped shut'] },
    'The Long Portage': { facts: { 'How long was the portage?': ['1.8 km', '1.8 km'], 'What did Kenji carry at first?': ['the packs', 'carried the packs'], 'Where did they shelter from the storm?': ['under the canoe', 'crawled under'], 'What called across the water?': ['a loon', 'loon called'] },
      ties: { 'he|Clouds are building': ['Kenji', 'older brother, Kenji'], 'it|took the bow': ['the canoe'] },
      main: ['stay safe through a storm', 'loon'], details: ['one end of the canoe', 'shelter under the canoe'], conclusion: ['proud', 'canoe guide', 'did badly', 'Not bad for your first'],
      predict: ['storm will reach them', 'Clouds are building', 'Thunder rolled'] },
    'The Red River Jig': { facts: { 'Who taught the narrator the jig?': ['Aunt Louise', 'my aunt Louise'], 'Where did they practise?': ["in Aunt Louise's kitchen", 'in her kitchen'], 'What was the signal to start?': ['two taps of a heel', 'heel twice'], 'What did the Elder wear?': ['a woven sash', 'woven sash'] },
      ties: { 'That|our signal': ['tapping her heel twice', 'heel twice'], 'he|Your feet remember': ['the Elder', 'An Elder in'] },
      main: ['connected to family history', 'table was pushed'], details: ['every Saturday', 'feet remember'], conclusion: ['practice paid off', 'every dance contest', 'forgot all the steps', 'without thinking'],
      predict: ['find the rhythm', 'music carry you', 'without thinking'] }
  };
  /* read the passage card back out of the question's picture: its title and sentences */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.pic || q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    const lines = [...p.querySelectorAll('.ps')].map(x => text(x.innerHTML)); return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', lines, all: lines.join(' ') }; };
  const key = (m, f) => (KEY[text(m.t)] || {})[f];
  const want = m => (key(m, 'facts') || {})[text(m.q)];
  /* the tie: its key entry, found by the tie word and words from its sentence */
  const tieKey = m => { const ties = key(m, 'ties') || (Object.values(KEY).find(k => k.ties && Object.keys(k.ties).some(x => x.split('|')[0] === m.w && text(m.s).includes(x.split('|')[1]))) || {}).ties || {};
    const k = Object.keys(ties).find(x => { const [w, s] = x.split('|'); return w === m.w && text(m.s).includes(s); }); return k && ties[k]; };
  /* the sentence the child tapped, and how many sentences hold some words */
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], at: s => all.findIndex(a => a[1].includes(s)), count: s => all.filter(a => a[1].includes(s)).length }; };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const said = q => { const d = document.createElement('div'); d.innerHTML = q.fig; return text((d.querySelector('.sent') || {}).innerHTML || ''); };

  /* find the evidence */
  V['g7-fact'] = (q, m) => { const w = want(m), c = card(q); return w && mk(q) === w[0] && c.all.includes(w[1]) ? '' : 'expected ' + (w && w[0]); };
  V['g7-tap-fact'] = (q, m) => { const w = want(m), t = tapped(q); return w && t.count(w[1]) === 1 && t.hit.includes(w[1]) ? '' : 'the tapped sentence does not answer it'; };
  V['g7-find-line'] = (q, m) => { const w = want(m), ok = w ? q.options.map(text).filter(o => o.includes(w[1])) : []; return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g7-fact-tf'] = (q, m) => { const w = want(m), right = !!w && text(m.said) === w[0]; return w && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* words that point back */
  V['g7-tie'] = (q, m) => { const k = tieKey(m); return k && mk(q).includes(k[0]) && card(q).all.includes(text(m.s)) ? '' : 'expected ' + (k && k[0]); };
  V['g7-tie-tap'] = (q, m) => { const k = tieKey(m), t = tapped(q); return k && k[1] && t.count(k[1]) === 1 && t.hit.includes(k[1]) && t.at(k[1]) < t.at(text(m.s).slice(0, 25)) ? '' : 'the tapped sentence is not the one the tie points back to'; };
  V['g7-tie-word'] = (q, m) => { const k = tieKey(m); return k && mk(q) === m.w && text(q.q).includes(k[0]) && said(q).includes(m.w) ? '' : 'expected the tie word ' + m.w; };
  V['g7-tie-tf'] = (q, m) => { const k = tieKey(m), right = !!k && text(m.said).includes(k[0]); return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* the main idea */
  V['g7-main'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k[0]) ? '' : 'expected the main idea about "' + (k && k[0]) + '"'; };
  V['g7-detail'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k[1]) ? '' : 'expected the detail "' + (k && k[1]) + '"'; };
  V['g7-best-title'] = q => { const c = card(q), fits = Object.keys(KEY).filter(t => KEY[t].facts && Object.values(KEY[t].facts).every(f => c.all.includes(f[1])));
    return fits.length === 1 && mk(q) === fits[0] ? '' : 'expected the title ' + fits.join(' or '); };
  V['g7-main-tf'] = (q, m) => { const k = key(m, 'main'), right = !!k && said(q).includes(k[0]); return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-supports'] = (q, m) => { const k = key(m, 'details'), right = q.options.map((o, i) => k && k.some(d => text(o).includes(d)) ? i : -1).filter(i => i >= 0);
    return k && right.length === k.length && H.sameSet(right, q.answer) ? '' : 'the supporting details are not the ones marked'; };
  /* conclusions */
  V['g7-conclude'] = (q, m) => { const k = key(m, 'conclusion'); return k && mk(q).includes(k[0]) && card(q).all.includes(k[3]) ? '' : 'expected the supported conclusion'; };
  V['g7-conclude-tf'] = (q, m) => { const k = key(m, 'conclusion'), s = text(m.said), right = !!k && s.includes(k[0]), why = text(q.why.options[1]);
    const whyOk = right || (s.includes(k[1]) ? /further/.test(why) : /opposite/.test(why)); return k && q.answer === right && tfWhy(q, right) && whyOk ? '' : 'expected ' + right; };
  V['g7-proof-tap'] = (q, m) => { const k = key(m, 'conclusion'), t = tapped(q); return k && text(q.q).includes(k[0]) && t.count(k[3]) === 1 && t.hit.includes(k[3]) ? '' : 'the tapped sentence does not support it'; };
  V['g7-too-far'] = (q, m) => { const k = key(m, 'conclusion'); return k && mk(q).includes(k[1]) ? '' : 'expected the conclusion that goes too far'; };
  /* predict, then check: the clue is shown, the proof is not (until the check) */
  V['g7-predict'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[0]) && c.all.includes(k[1]) && !c.all.includes(k[2]) ? '' : 'expected the prediction from the clue'; };
  V['g7-predict-clue'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[1]) && c.all.includes(mk(q)) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  V['g7-clue-tap'] = (q, m) => { const k = key(m, 'predict'), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) && t.count(k[2]) === 0 ? '' : 'the tapped sentence does not hold the clue'; };
  V['g7-predict-tf'] = (q, m) => { const k = key(m, 'predict'), right = !!k && text(m.said).includes(k[0]); return k && card(q).all.includes(k[1]) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-check-prediction'] = (q, m) => { const k = key(m, 'predict'); return k && text(q.q).includes(k[0]) && mk(q).includes(k[2]) ? '' : 'expected the sentence where the prediction comes true'; };
  /* fix confusion: each problem and the strategy that fixes it */
  const FIX = { muskeg: 'Look it up', photosynthesis: 'Look it up', 'description of a forest': 'Picture it', 'where each character': 'Picture it', 'chapter is not over': 'Read ahead',
    'puzzling question': 'Read ahead', 'cannot say what it was about': 'Ask yourself', 'main point': 'Ask yourself', 'know nothing about': 'Check another source', 'never heard of': 'Check another source' };
  const fixFor = s => FIX[Object.keys(FIX).find(k => text(s).includes(k))];
  V['g7-monitor'] = (q, m) => mk(q).startsWith(fixFor(m.s)) ? '' : 'expected ' + fixFor(m.s);
  V['g7-monitor-match'] = q => q.pairs.every(p => text(p[1]).startsWith(fixFor(p[0]))) ? '' : 'a problem is matched to the wrong strategy';
  V['g7-monitor-tf'] = (q, m) => { const right = text(m.said).startsWith(fixFor(m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-which-problem'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const s = text(d.textContent), fits = q.options.map(o => s.startsWith(fixFor(o)));
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the problem this strategy fixes'; };
  /* texts for a purpose: words from the purpose, the suitable text and why */
  const PURPOSE = { Iqaluit: ['memoir', 'from the inside'], 'bike tire': ['step-by-step', 'each step'], 'both sides': ['each side', 'more than one perspective'], 'funny story': ['humorous', 'entertain'],
    'Treaty 9': ['by First Nations creators', 'own community'], 'canoe trip': ['Environment Canada', 'up to date'], laptops: ['tests both', 'compares both'], Diwali: ['interviews', 'own traditions'],
    monarch: ['lists its sources', 'where its facts'], inspired: ['Paralympic', 'real story'] };
  const pk = s => PURPOSE[Object.keys(PURPOSE).find(k => text(s).includes(k))];
  V['g7-purpose'] = (q, m) => mk(q).includes(pk(m.p)[0]) ? '' : 'expected the ' + pk(m.p)[0] + ' text';
  V['g7-purpose-tf'] = (q, m) => { const right = text(m.said).includes(pk(m.p)[0]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-purpose-why'] = (q, m) => mk(q).includes(pk(m.p)[1]) && text(q.q).includes(pk(m.p)[0]) ? '' : 'expected the reason it suits';
  V['g7-purpose-match'] = q => q.pairs.every(p => text(p[1]).includes(pk(p[0])[0])) ? '' : 'a purpose is matched to the wrong text';
})();
