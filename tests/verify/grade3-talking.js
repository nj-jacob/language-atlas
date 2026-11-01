/* Grade 3 answer checks: listening and speaking (grade3/chapters/talking.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const GOOD = /^(Look at the speaker|Keep my body still|Think about what they say|Wait for my turn|Ask a question if|Nod to show|Picture what they|Say back what I heard)/;
  const CHECKS = { 'We meet at the front doors at nine.': 'Did you say the front doors?', 'Bring two things for the bake sale.': 'Two things each, or two for the whole family?',
    'The library is closed on Monday.': 'Is it open again on Tuesday?', 'Draw a map of your street.': 'Should I label the houses?',
    'Practice is moved to Thursday.': 'Is it at the same time on Thursday?', 'Put your boots on the mat.': 'The mat by the front door or the back door?',
    'Read chapter two tonight.': 'Do we read all of chapter two?', 'The trip costs five dollars.': 'Do we bring the five dollars tomorrow?',
    'Feed the fish one pinch of food.': 'Once in the morning, or twice a day?', 'We will plant beans next week.': 'Do we need to bring a pot?',
    'Write three facts about owls.': 'Can the facts come from a website?', 'Grandma arrives on the late bus.': 'What time does the late bus come?',
    'Your team will play in the gym.': 'Which gym, the big one or the small one?', 'Bring a water bottle for the hike.': 'How long is the hike?' };
  const WHEN = { 'Think about what I already know.': 'Before', 'Guess what it will be about.': 'Before', 'Turn to face the speaker.': 'Before',
    'Picture it in my head.': 'During', 'Listen for the main idea.': 'During', "Watch the speaker's face and hands.": 'During',
    'Say back the main idea.': 'After', 'Ask about a part I missed.': 'After', 'Tell how it connects to me.': 'After' };
  const ORDER = ['Before', 'During', 'After'];
  const HELPS = /^(Ask the speaker to say it again|Ask what a word means|Say back what I heard)/;
  const POLITE = /^(Good morning, Ms\.|Hello, everyone\.|Excuse me, could you|Thank you for coming|My ear has been sore|Hello, my name is|Excuse me, how much|Good morning, everyone\.|Thank you for teaching|Good morning\. Thank you)/;
  const FORMAL_WHO = /^(the principal|the whole school|a librarian|an Elder|a doctor|a parent helper|a store clerk|your class at|a guest speaker|the bus driver)/;
  const MEANS = { 'a nod': 'yes', 'a head shake': 'no', 'a thumbs up': 'good job', 'a shrug': 'I do not know', 'a wave': 'hello', 'a finger on your lips': 'please be quiet',
    'a raised hand': 'I want to speak', pointing: 'look over there', 'a frown': 'I am not happy', 'a big smile': 'I am glad' };
  const VOICE = { 'reading to a partner': 'a talking voice', 'in the library': 'a quiet voice', 'giving a talk to the class': 'a loud, clear voice', 'while the baby sleeps': 'a quiet voice',
    'chatting with a friend at lunch': 'a talking voice', 'calling your team on a big field': 'a loud, clear voice', 'on stage at an assembly': 'a loud, clear voice', 'playing a board game with family': 'a talking voice' };
  const VAGUE = new Set(['thing', 'stuff', 'that', 'good', 'it', 'something']);
  const vague = s => s.toLowerCase().replace(/[.?!,]/g, '').split(' ').some(w => VAGUE.has(w));
  const one = (q, ok) => { const l = q.options.map(text).filter(ok); return l.length === 1 && mk(q) === l[0]; };

  V['g3-listen-good'] = q => H.sameSet(q.options.map((o, i) => GOOD.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good listening moves are not the ones marked';
  V['g3-clarify'] = (q, m) => mk(q) === CHECKS[m.said] && one(q, o => o === CHECKS[m.said]) ? '' : 'expected ' + CHECKS[m.said];
  V['g3-listen-tf'] = (q, m) => GOOD.test(m.move) === q.answer ? '' : 'true/false is wrong for ' + m.move;
  V['g3-not-listening'] = q => { const t = q.tiles.map(text), bad = t.filter(x => !GOOD.test(x)); return bad.length === 1 && mk(q) === bad[0] ? '' : 'the one that is not good listening is not marked'; };
  V['g3-clarify-tf'] = (q, m) => (CHECKS[m.said] === m.asked) === q.answer ? '' : 'true/false is wrong for ' + m.asked;
  V['g3-when-step'] = (q, m) => mk(q) === WHEN[text(m.a)] + ' listening' ? '' : 'expected ' + WHEN[text(m.a)];
  V['g3-listen-order'] = q => q.items.map(text).every((t, i) => WHEN[t] === ORDER[i]) ? '' : 'the steps are not before, during, after';
  V['g3-match-step'] = q => q.pairs.every(p => WHEN[text(p[0])] === text(p[1])) ? '' : 'a step is matched to the wrong time';
  V['g3-hard-message'] = q => one(q, o => HELPS.test(o)) ? '' : 'expected the step that helps';
  V['g3-not-sure'] = (q, m) => (/I (ask|say back)/.test(m.said) === q.answer) && text(q.why.options[q.why.answer]).startsWith('Asking') ? '' : 'true/false is wrong';
  V['g3-formal'] = q => one(q, o => POLITE.test(o)) ? '' : 'expected the polite, formal way';
  V['g3-formal-tf'] = (q, m) => POLITE.test(text(m.said)) === q.answer ? '' : 'true/false is wrong for ' + m.said;
  V['g3-formal-kind'] = (q, m) => mk(q).startsWith(FORMAL_WHO.test(m.who) ? 'Formal' : 'Informal') ? '' : 'wrong for ' + m.who;
  V['g3-voice-level'] = (q, m) => mk(q) === VOICE[m.where] ? '' : 'expected ' + VOICE[m.where];
  V['g3-body'] = (q, m) => mk(q) === MEANS[m.move] ? '' : 'expected ' + MEANS[m.move];
  V['g3-match-body'] = q => q.pairs.every(p => MEANS[text(p[0])] === text(p[1])) ? '' : 'a move is matched wrong';
  V['g3-show-it'] = (q, m) => MEANS[mk(q)] === m.means && q.tiles.map(text).filter(t => MEANS[t] === m.means).length === 1 ? '' : 'expected the move that means ' + m.means;
  V['g3-body-tf'] = (q, m) => (MEANS[m.move] === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.move;
  V['g3-clearer'] = q => one(q, o => !vague(o)) ? '' : 'expected the exact one';
  V['g3-vague-word'] = q => { const t = q.tiles.map(x => text(x).replace(/[.?!]$/, '').toLowerCase()), v = t.filter(w => VAGUE.has(w)); return v.length === 1 && t[q.answer] === v[0] ? '' : 'the vague word is not marked'; };
  V['g3-replace-vague'] = q => { const t = q.tiles.map(text), ok = t.filter(x => !vague(x)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the exact words'; };
  V['g3-clear-tf'] = (q, m) => text(q.fig) === m.said && !vague(m.said) === q.answer ? '' : 'true/false is wrong for ' + m.said;
})();
