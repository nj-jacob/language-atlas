/* Grade 1 answer checks: listening and speaking (grade1/chapters/talking.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const GOOD = /^(Look at the person talking|Keep my hands still|Think about the words|Wait until they finish|Nod to show I understand|Picture what they say)/;
  const BAD = /^(Talk to my friend|Play with my shoelaces|Look out the window|Hum a song|Draw on my hand|Turn around in my seat)/;
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const STEP = { 'Think about what I know.': 'before', 'Look at the title and pictures.': 'before', 'Guess what it will be about.': 'before', 'Picture it in my head.': 'during', 'Look at the speaker.': 'during',
    'Listen for the big idea.': 'during', 'Tell it back in order.': 'after', 'Say my favourite part.': 'after', 'Say what I learned.': 'after' };
  const stepOf = t => STEP[t] || STEP[t.charAt(0).toUpperCase() + t.slice(1)];
  const HELPS = /ask a question|say that again|ask what it means/, STUCK = /stay quiet|stop listening|make something up/;
  const FAIR = { 'Wait until the speaker stops.': true, 'Take turns talking.': true, 'Answer the question, then stop.': true, 'Talk over someone to be heard.': false,
    'Tell a long story when asked a short question.': false, 'Say whatever pops into my head, any time.': false };
  const VAGUE_WORD = new Set(['that', 'there', 'thing', 'this', 'stuff']);
  const vagueSent = s => /^(Give me that|Put it there|I saw a thing|Can I have that|Look at this|The stuff fell|Put them over there|I want the thing|Where is that|Hand me some stuff)[.?!]$/.test(s);
  const ASK = { 'I got a new puppy.': 'What is its name?', 'We went camping on the weekend.': 'Where did you camp?', 'My grandma is visiting from Winnipeg.': 'How long is she staying?',
    'I made a card for my teacher.': 'What did you draw on it?', 'I lost my first tooth.': 'Did it hurt?', 'We saw a moose on the road.': 'Was it big?',
    'My cousin taught me to make bannock.': 'How did you make it?', 'I scored a goal at soccer.': 'How did you kick it in?', 'We planted beans in our garden.': 'How tall are they now?', 'My dad fixed my bike.': 'What was broken?' };
  const SIZE = { 'What colour is your coat?': 'It is blue.', 'What did you have for lunch?': 'I had a sandwich and an apple.', 'What is your favourite animal?': 'I like owls best.', 'How did you get to school?': 'I walked with my mom.',
    'What did you build?': 'I built a tall block tower.', "What is your sister's name?": 'Her name is Priya.' };
  const TURN = /^when (the speaker stops|it is my turn|I put up my hand|someone asks me a question|the talking stick comes to me)/;
  const FEEL = { 'a big smile and arms up high': 'excited', 'a frown and crossed arms': 'angry', 'head down and tears': 'sad', 'wide eyes and hands over the mouth': 'surprised', 'a yawn and droopy eyes': 'tired',
    'a soft smile and relaxed shoulders': 'calm', 'shaking hands and a small voice': 'scared', 'a grin and a thumbs up': 'proud' };
  const MOVE = { 'a nod': 'yes', 'shaking your head': 'no', 'a wave': 'hello', 'a shrug': 'I do not know', 'a thumbs up': 'good', 'a finger on your lips': 'be quiet', 'a hand held up flat': 'stop' };
  const VOICE = { 'in the library': 'a quiet voice', 'on the playground': 'a loud voice', 'talking to a friend at the table': 'a talking voice', 'when the baby is asleep': 'a quiet voice',
    'calling a friend across the field': 'a loud voice', 'telling Grandpa about your day': 'a talking voice', 'in a hospital waiting room': 'a quiet voice', 'cheering at a hockey game': 'a loud voice',
    'asking the librarian for a book': 'a quiet voice' };
  const VAGUE = /\b(that|thing|there|this|stuff)\b/;
  V['g1-good-listen'] = q => H.sameSet(q.options.map((o, i) => GOOD.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good listening moves are not the ones marked';
  V['g1-ask-about'] = (q, m) => mk(q) === ASK[m.said] ? '' : 'expected ' + ASK[m.said];
  V['g1-listen-order'] = q => q.items.map(text).every((t, i) => { const w = ['before', 'during', 'after'][i], p = t.split(': '); return p[0].toLowerCase() === w && stepOf(p[1]) === w; }) ? '' : 'the steps are not before, during, after';
  V['g1-lost-tf'] = (q, m) => { const s = text(m.said), right = HELPS.test(s); return (right || STUCK.test(s)) && q.answer === right && tfWhy(q, right) ? '' : 'true/false is wrong'; };
  V['g1-listen-tf'] = (q, m) => { const right = GOOD.test(m.w); return (right || BAD.test(m.w)) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-odd-listen'] = q => { const ok = q.options.map(text).filter(o => BAD.test(o)); return ok.length === 1 && mk(q) === ok[0] && q.options.map(text).every(o => BAD.test(o) || GOOD.test(o)) ? '' : 'expected the one that is not good listening'; };
  V['g1-step-when'] = (q, m) => mk(q) === STEP[m.st] ? '' : 'expected ' + STEP[m.st];
  V['g1-match-step'] = q => q.pairs.every(p => STEP[text(p[0])] === text(p[1])) ? '' : 'a step is matched to the wrong time';
  V['g1-turn-tf'] = (q, m) => { const right = FAIR[m.t]; return right !== undefined && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-size-tf'] = (q, m) => { const right = SIZE[text(m.ask)] === text(m.said); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-body-tf'] = (q, m) => { const right = FEEL[m.body] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-vague-tap'] = (q, m) => { const t = q.tiles.map(text), ok = t.filter(w => VAGUE_WORD.has(w)); return vagueSent(m.s) && ok.length === 1 && t[q.answer] === ok[0] ? '' : 'expected the unclear word'; };
  V['g1-clear-tf'] = (q, m) => { const right = !VAGUE.test(m.said); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-when-talk'] = q => { const ok = q.options.map(text).filter(o => TURN.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the time that takes turns'; };
  V['g1-how-much'] = (q, m) => mk(q) === SIZE[text(m.ask)] ? '' : 'expected ' + SIZE[text(m.ask)];
  V['g1-feels-from'] = (q, m) => mk(q) === FEEL[m.body] ? '' : 'expected ' + FEEL[m.body];
  V['g1-move-means'] = (q, m) => mk(q) === MOVE[m.move] ? '' : 'expected ' + MOVE[m.move];
  V['g1-match-move'] = q => q.pairs.every(p => MOVE[text(p[0])] === text(p[1])) ? '' : 'a move is matched wrong';
  V['g1-voice-fits'] = (q, m) => mk(q) === VOICE[m.where] ? '' : 'expected ' + VOICE[m.where];
  V['g1-clearer'] = q => { const ok = q.options.map(text).filter(o => !VAGUE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the exact one'; };
})();
