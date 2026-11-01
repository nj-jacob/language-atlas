/* Grade 7 answer checks: listening and speaking (grade7/chapters/talking.js). Own keys, and its own test for passive voice (was/were ... by). */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const sents = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return [...d.querySelectorAll('.sent')].map(x => text(x.innerHTML)); };
  /* on-topic questions, by the words that tie them to the topic */
  const ON = { 'Should our school start later in the morning?': /bus times|sleep/, 'How can our town cut down on food waste?': /food banks|throw out/, 'Should cellphones be allowed in class?': /research|distractions/,
    'Should our school have a four-day week?': /longer days|fifth day/, 'How can we make the playground safer?': /injuries|at recess/, 'Should our town build a skate park?': /neighbours|cost to build/,
    'How can students help protect the local creek?': /cleanup|litter/, 'Should students choose some of their own projects?': /curriculum|choice make/ };
  const onTopic = s => Object.values(ON).some(re => re.test(s));
  V['g7-relevant'] = (q, m) => { const ok = q.options.map(text).filter(o => ON[m.topic].test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the on-topic question'; };
  V['g7-relevant-tf'] = (q, m) => { const right = m.said === onTopic(text(m.asked)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const GOOD = /^(I agree with|Could you explain|I see it differently, because|That is a good point|Building on what|I am not sure I agree\. Could you|Let us hear from|So you are saying)/;
  V['g7-reply'] = q => { const ok = q.options.map(text).filter(o => GOOD.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the respectful reply'; };
  V['g7-reply-pick'] = q => H.sameSet(q.options.map((o, i) => GOOD.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful replies are not the ones marked';
  const STAGE = s => /already know|Set a purpose|predict the topic|distractions/.test(s) ? 'before' : /Jot down|face and gestures|signal words|Picture what/.test(s) ? 'during'
    : /Summarize|clear up|Compare what you heard|biggest idea/.test(s) ? 'after' : null;
  V['g7-stage'] = (q, m) => mk(q) === STAGE(text(m.s)) + ' listening' ? '' : 'expected ' + STAGE(text(m.s));
  V['g7-stage-order'] = q => q.items.map(i => STAGE(text(i))).join() === 'before,during,after' ? '' : 'not in the order before, during, after';
  V['g7-stage-tf'] = (q, m) => { const right = STAGE(text(m.s)) === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const CLARIFY = ['About how much will it cost?', 'What do you mean by sustainable?', 'Which report are you talking about?', 'What date is the event?', 'Who made the decision?',
    'Could you repeat the second step?', 'Is that 20 metres or 20 kilometres?', 'Where is Pangnirtung?'];
  V['g7-clarify'] = q => { const ok = q.options.map(text).filter(o => CLARIFY.includes(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the clarifying question'; };
  /* formal: an official audience or occasion */
  const FORMAL = /council|Remembrance|principal|announcements|guest speaker|elder/;
  const formalOf = s => FORMAL.test(s) ? 'formal' : 'informal';
  V['g7-formality'] = (q, m) => mk(q) === formalOf(m.s) ? '' : 'expected ' + formalOf(m.s);
  V['g7-aud-which'] = (q, m) => { const ok = q.tiles.map(text).filter(t => formalOf(t) === m.want); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the ' + m.want + ' situation'; };
  const FIT = { 'presenting to the school council': 'Good afternoon. Today I will propose', 'telling a friend about your weekend': 'You will not believe', 'giving a speech at a Remembrance Day assembly': 'Today we gather',
    'explaining a game to your younger cousin': 'Okay, here is how it works', 'asking the principal for a meeting': 'Excuse me, Ms. Okafor', 'cheering on your team at a game': "Let's go, Hawks",
    'reading the morning announcements': 'Good morning, everyone.', 'calling your brother about dinner': "Dinner's at six.", 'thanking a guest speaker in front of the class': 'On behalf of our class',
    'chatting with teammates on the bus': 'That last goal was amazing', 'interviewing an elder for a class project': 'Thank you for meeting with me', 'planning a sleepover with your best friend': 'Want to bring your sleeping bag' };
  V['g7-audience'] = (q, m) => mk(q).startsWith(FIT[m.s]) ? '' : 'expected the opening that fits';
  V['g7-speak-tf'] = (q, m) => { const right = text(m.said).startsWith(FIT[m.s]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const BODY = { 'leans forward and nods': 'interest', 'crosses arms and looks away': 'not wanting to listen', 'speaks slowly and pauses after a key point': 'that the point matters', 'uses open hands while explaining': 'openness and honesty',
    'taps a foot and checks the clock': 'impatience', 'smiles and keeps an open posture': 'friendliness', 'stands tall and speaks clearly': 'confidence', 'looks at the floor and mumbles': 'nervousness',
    'frowns and shakes their head': 'disagreement', 'raises eyebrows and leans back': 'surprise' };
  V['g7-body'] = (q, m) => mk(q) === BODY[m.s] ? '' : 'expected ' + BODY[m.s];
  V['g7-body-which'] = (q, m) => BODY[mk(q)] === m.shows && q.tiles.map(text).filter(t => BODY[t] === m.shows).length === 1 ? '' : 'expected the action that shows ' + m.shows;
  V['g7-body-match'] = q => q.pairs.every(p => BODY[text(p[0])] === text(p[1])) ? '' : 'an action is matched wrong';
  const CULTURE_TRUE = ['Eye contact can mean respect in one culture and rudeness in another.', 'Some people show respect by looking down while listening.', 'Comfortable personal space differs between cultures.', 'A gesture that is friendly in one place can be rude in another.'];
  V['g7-culture-tf'] = (q, m) => CULTURE_TRUE.includes(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const passive = s => /\b(was|were|is|are)\s+\w+\b.*\bby\b/.test(s);
  V['g7-which-voice'] = (q, m) => q.answer === (passive(m.s) ? 1 : 0) ? '' : 'expected ' + (passive(m.s) ? 'passive' : 'active');
  /* active from passive: "The puck was stopped by the goalie." -> the goalie first */
  V['g7-to-active'] = (q, m) => { const a = mk(q), by = (m.s.match(/ by (.+)\.$/) || [])[1]; return by && !passive(a) && a.toLowerCase().startsWith(by.toLowerCase()) && q.options.map(text).filter(o => !passive(o) && o.toLowerCase().startsWith(by.toLowerCase())).length === 1 ? '' : 'expected the active sentence starting with ' + by; };
  /* passive from active: the doer moves to the end, after by */
  V['g7-to-passive'] = (q, m) => { const want = o => { const by = (o.match(/ by (.+)\.$/) || [])[1]; return passive(o) && !!by && m.s.toLowerCase().startsWith(by.toLowerCase() + ' '); };
    return want(mk(q)) && q.options.map(text).filter(want).length === 1 ? '' : 'expected the passive sentence ending with the doer'; };
  V['g7-when-passive'] = q => /does not matter|Nobody knows|not the point/.test(mk(q)) ? '' : 'expected the reason about the doer';
  const PRECISE = { 'The dog ate its food.': ['ate', 'gulped down'], 'She said, "Stop!"': ['said', 'shouted'], 'The view from the lookout was nice.': ['nice', 'breathtaking'],
    'He walked into the room after losing the game.': ['walked', 'trudged'], 'The soup was good.': ['good', 'rich and spicy'], 'They ran to catch the bus.': ['ran', 'sprinted'],
    'The wind blew through the trees.': ['blew', 'howled'], 'The baby cried.': ['cried', 'wailed'], 'The movie was bad.': ['bad', 'painfully dull'], 'He looked at the strange light.': ['looked', 'stared'],
    'The room was big.': ['big', 'enormous'], 'She ate the apple.': ['ate', 'crunched into'] };
  const key = s => PRECISE[text(s).replace(/[“”]/g, '"')];
  V['g7-precise'] = (q, m) => mk(q) === key(m.s)[1] ? '' : 'expected ' + key(m.s)[1];
  V['g7-precise-vague'] = (q, m) => mk(q) === key(m.s)[0] ? '' : 'expected ' + key(m.s)[0];
  V['g7-precise-which'] = (q, m) => { const [w, p] = key(m.s), want = text(m.s).replace(w, p); return mk(q) === want ? '' : 'expected ' + want; };
  V['g7-precise-tf'] = (q, m) => { const right = text(m.a) === key(m.s)[1]; return q.answer === right && tfWhy(q, right) && sents(q).length === 1 ? '' : 'expected ' + right; };
})();
