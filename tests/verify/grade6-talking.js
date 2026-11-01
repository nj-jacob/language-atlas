/* Grade 6 answer checks: listening and speaking (grade6/chapters/talking.js). The checker keeps its own key, and checks what it can from the
   words themselves: a response that builds on an idea names the speaker or their idea, and a clarifying question uses the speaker's words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'true/false is wrong';
  const picked = (q, ok) => H.sameSet(q.options.map((o, i) => ok(text(o)) ? i : -1).filter(i => i >= 0), q.answer);

  /* building on: the reply names the speaker, or starts by pointing back to the idea */
  const builds = (said, reply) => reply.includes(said.split(':')[0]) || /^Building on/.test(reply);
  V['g6-build-on'] = (q, m) => { const fit = q.options.map(text).filter(o => builds(m.said, o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the response that builds on ' + m.said.split(':')[0]; };
  V['g6-build-tf'] = (q, m) => tf(q, builds(m.said, text(m.reply)));
  const GOOD = /^(Build on|Ask a question|Let others finish|Invite a quiet|Disagree with the idea|Sum up what was said|Give a reason|Stay on the topic)/;
  V['g6-good-moves'] = q => picked(q, o => GOOD.test(o)) ? '' : 'the good moves are not the ones marked';
  V['g6-move-tf'] = (q, m) => tf(q, GOOD.test(m.move));

  /* clarifying: the question shares the speaker's key words */
  const KEY = { 'The project is due in two weeks, and you can work in pairs.': /partners|two weeks/, 'Bring your permission form and a water bottle on Friday.': /form/,
    'The bus leaves at 8:15 sharp from the east doors.': /east doors|8:15/, 'For the debate, each team gets three minutes to speak.': /three minutes|team/,
    'The pool is closed Monday, so swim club moves to Wednesday.': /Wednesday|pool/, 'Read chapters four and five, and answer the first three questions.': /chapters|first three/,
    'The science fair boards must be no taller than 90 cm.': /90 cm/, 'Practice starts at 6:00, but the rink opens at 5:30.': /5:30|6:00/,
    'The guest speaker will talk about the Inuit art of soapstone carving.': /soapstone/, 'Hand in the poster by Thursday, with your name on the back.': /poster/ };
  const checks = (said, ask) => !!KEY[said] && KEY[said].test(ask);
  V['g6-clarify'] = (q, m) => { const fit = q.options.map(text).filter(o => checks(m.said, o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the question about what was said'; };
  V['g6-clarify-tf'] = (q, m) => tf(q, checks(m.said, m.ask));
  V['g6-clarify-pick'] = (q, m) => picked(q, o => checks(m.said, o)) ? '' : 'the clarifying questions are not the ones marked';
  V['g6-clarify-match'] = q => q.pairs.every(p => checks(text(p[0]), text(p[1]))) ? '' : 'a question is matched to the wrong instructions';

  /* a listening plan: the checker's own sort of each strategy */
  const WHEN = { 'Think about what you already know.': 'Before', 'Ask yourself why you are listening.': 'Before', 'Predict what the speaker will say.': 'Before', 'Write one question to listen for.': 'Before',
    'Picture what the speaker describes.': 'During', 'Jot down key words.': 'During', 'Listen for signal words like first and finally.': 'During', "Notice the speaker's tone of voice.": 'During',
    'Sum up the main idea.': 'After', 'Ask about anything unclear.': 'After', 'Check your prediction.': 'After', 'Share your opinion and give a reason.': 'After' };
  V['g6-when-strat'] = (q, m) => mk(q) === WHEN[text(m.s)] + ' listening' ? '' : 'expected ' + WHEN[text(m.s)];
  V['g6-listen-order'] = q => q.items.map(i => WHEN[text(i)]).join(' ') === 'Before During After' ? '' : 'the steps are out of order';
  V['g6-strat-tf'] = (q, m) => tf(q, WHEN[text(m.s)] === m.said);
  V['g6-strat-pick'] = (q, m) => picked(q, o => WHEN[o] === m.when) ? '' : 'the ' + m.when + ' steps are not the ones marked';

  /* formal speech: no slang, contractions or casual openers */
  const informal = s => /\b(Hey|Yo|totally|stuff|cool|Want to|Where's|Thanks|Can I|Nice pass|Guess what)\b/.test(s) || /^So\b|\blike,/.test(s);
  const FORMAL_AUD = /council|museum guide|Elder|judge|police|principal|radio host/;
  V['g6-register'] = (q, m) => { const want = FORMAL_AUD.test(m.aud), fit = q.options.map(text).filter(o => informal(o) !== want); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the ' + (want ? 'formal' : 'informal') + ' line'; };
  V['g6-formal-or-not'] = (q, m) => mk(q) === (informal(text(m.line)) ? 'informal' : 'formal') ? '' : 'the register is wrong for ' + m.line;
  V['g6-aud-kind'] = (q, m) => mk(q) === (FORMAL_AUD.test(m.aud) ? 'formally' : 'informally') ? '' : 'the register is wrong for ' + m.aud;
  V['g6-register-tf'] = (q, m) => tf(q, informal(text(m.line)) !== FORMAL_AUD.test(m.aud));

  const BODY = { 'leaning forward and nodding': 'I am interested.', 'arms crossed, eyes rolling': 'I do not care.', 'standing tall, open hands': 'I am confident.',
    'looking at a phone while someone speaks': 'I am not listening.', 'a pause before a big point': 'Get ready: this matters.', 'a warm smile while greeting someone': 'I am friendly.',
    'fidgeting and looking at the clock': 'I want to leave.', 'a shaky voice and looking at the floor': 'I am nervous.', 'raising a hand and waiting': 'I would like a turn.',
    'a slow nod with a thoughtful face': 'I am thinking it over.' };
  V['g6-body'] = (q, m) => mk(q) === BODY[m.b] ? '' : 'expected ' + BODY[m.b];
  V['g6-body-match'] = q => q.pairs.every(p => BODY[text(p[0])] === text(p[1])) ? '' : 'a gesture is matched wrong';
  V['g6-body-tf'] = (q, m) => tf(q, BODY[m.b] === m.said);
  /* statements that say a gesture means the same, or feels the same, to everyone are false */
  V['g6-culture'] = (q, m) => (!/same thing (in every|all over)|to everyone|polite everywhere/.test(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';

  /* the precise sentence has no vague words */
  const vague = s => /\b(went|good|big|thing|it loudly|fast|nice|place|a lot|got|stuff)\b/.test(s);
  V['g6-precise'] = q => { const fit = q.options.map(text).filter(o => !vague(o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the precise sentence'; };
  V['g6-precise-tf'] = (q, m) => tf(q, !vague(text(m.to)));
  V['g6-precise-pick'] = q => picked(q, o => !vague(o)) ? '' : 'the precise sentences are not the ones marked';
  const SAME = { 'The dog went across the yard.': 'terrier', 'She said it loudly.': 'announced', 'The food was good.': 'bannock', 'It was a big storm.': 'blizzard', 'He did the thing fast.': 'puzzle',
    'The bird was nice.': 'blue jay', 'We went to a place.': 'island', 'The movie was good.': 'audience', 'There was a lot of rain.': 'mm of rain', 'She got a prize.': 'first prize',
    'The building was big.': 'CN Tower', 'He ate some stuff.': 'apple pie' };
  V['g6-precise-match'] = q => q.pairs.every(p => text(p[1]).includes(SAME[text(p[0])])) ? '' : 'a vague sentence is matched to the wrong precise one';
})();
