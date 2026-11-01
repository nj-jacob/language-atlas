/* Grade 8 answer checks: listening and speaking (grade8/chapters/talking.js). Own key lists and rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const one = (q, ok) => ok(mk(q)) && q.options.map(text).filter(ok).length === 1;
  const picks = (q, ok) => H.sameSet(q.options.map((o, i) => ok(text(o)) ? i : -1).filter(i => i >= 0), q.answer);
  const tfOk = (q, right) => q.answer === right && q.why.answer === 0;

  /* paraphrase: the words that only the fair paraphrase of each statement uses */
  const PARA = { 'We should hold the fundraiser': 'less busy', 'The new bike lanes': 'help cyclists but', 'I liked the novel': 'enjoyed it overall', 'Our group needs one more source': 'ideally a new one',
    'The arena should open earlier': 'ice time first', 'I would join the robotics club': 'timing clashes', 'The documentary was interesting': 'one-sided', 'If we split the poster': 'dividing the work',
    'My grandfather says': 'ice forming later', 'The bus is usually on time': 'reliable unless', 'I think the school should plant trees': 'give shade', 'The volunteers sorted': 'more student helpers',
    'Learning Cree from my aunt': 'learned some basics', 'Our soccer team lost': 'improved after halftime', 'The museum is free': 'draw the most families' };
  const paraOf = s => PARA[Object.keys(PARA).find(k => s.startsWith(k))];
  const fair = (said, p) => p.includes(paraOf(said)) && !p.includes(said);
  V['g8-paraphrase'] = (q, m) => one(q, o => fair(text(m.s), o)) ? '' : 'expected the paraphrase';
  V['g8-para-tf'] = (q, m) => tfOk(q, fair(text(m.s), text(m.shown))) ? '' : 'true/false is wrong for ' + m.shown;
  const verdict = (said, p) => p.includes(said) ? 'copies' : fair(said, p) ? 'fair' : 'changes';
  V['g8-para-problem'] = (q, m) => mk(q).includes(verdict(text(m.s), text(m.shown))) ? '' : 'expected "' + verdict(text(m.s), text(m.shown)) + '"';
  V['g8-para-match'] = q => q.pairs.every(p => fair(text(p[0]), text(p[1]))) ? '' : 'a statement is matched to the wrong paraphrase';

  /* open questions start with what, how or why; closed ones with a helping verb */
  const open = s => /^(What|How|Why)\b/.test(s), closed = s => /^(Did|Is|Was|Do|Are|Can)\b/.test(s);
  V['g8-open'] = q => one(q, open) && q.options.map(text).every(o => open(o) || closed(o)) ? '' : 'expected the open question';
  V['g8-pick-open'] = q => picks(q, open) && q.options.every(o => open(text(o)) || closed(text(o))) ? '' : 'the open questions are not the ones marked';
  V['g8-open-tf'] = (q, m) => tfOk(q, open(text(m.s))) && (open(text(m.s)) || closed(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  /* the topic word each closed question is about */
  const TOPIC = { 'Did you like the book?': 'book', 'Is the plan finished?': 'plan', 'Was the trip long?': 'trip', 'Do you agree with Sam?': 'Sam', 'Are you done with the experiment?': 'experiment',
    'Did the character lie?': 'character', 'Is the new park good?': 'park', 'Was the game exciting?': 'game', 'Do you want to change the ending?': 'ending', 'Did you enjoy the powwow?': 'powwow',
    'Is recycling important?': 'recycling', 'Was the test hard?': 'test', 'Do you like the new schedule?': 'schedule', 'Can we finish by Friday?': 'Friday', 'Did the speaker convince you?': 'convinc' };
  V['g8-open-turn'] = (q, m) => one(q, o => open(o) && o.includes(TOPIC[m.s])) && text(q.fig) === m.s ? '' : 'expected the open question about the ' + TOPIC[m.s];

  /* clarifying questions ask about the unclear part */
  const asks = s => /^(Could you explain|Could you tell|Do you mean|What do you mean|When you say|Can you give an example)/.test(s);
  V['g8-clarify'] = q => one(q, asks) ? '' : 'expected the clarifying question';
  V['g8-clarify-tf'] = (q, m) => tfOk(q, asks(text(m.shown))) ? '' : 'true/false is wrong for ' + m.shown;
  /* the fact that backs up each claim */
  const SUPPORT = { 'The library should stay open late.': '12 000 visits', 'The rooftop garden helps the school.': '3 degrees cooler', 'Winter roads are open for fewer weeks.': 'down from 10',
    'Our school should start later.': '9 000 students', 'Cycling to school is growing.': 'up from 1', 'The food drive was a success.': 'twice our goal', 'Recess should be longer.': '8 out of 10',
    'The new crosswalk made the street safer.': 'no collisions', 'Reading every day builds vocabulary.': '1 800 000 words', 'The river is cleaner than it was.': 'Salmon now spawn',
    'Our team needs a second goalie.': 'all 14 games', 'The community garden brings neighbours together.': 'Forty families', 'Phones distract students in class.': '15 percent',
    'The play was a hit.': 'sold out', 'The tree planting helped the park.': 'shade the playground' };
  const backs = (claim, d) => d.includes(SUPPORT[claim]);
  V['g8-evidence-talk'] = (q, m) => one(q, o => backs(m.claim, o)) ? '' : 'expected the supporting detail';
  V['g8-evidence-tf'] = (q, m) => tfOk(q, backs(m.claim, text(m.shown))) ? '' : 'true/false is wrong for ' + m.shown;

  /* formal or informal */
  const FORMALITY = { 'presenting to the school board': 'formal', 'a job interview at a garden centre': 'formal', 'a speech at a Remembrance Day assembly': 'formal', 'asking the principal for a new club': 'formal',
    'welcoming guests at a graduation': 'formal', 'a debate in front of judges': 'formal', 'thanking an Elder who visited your class': 'formal', 'reading the morning announcements': 'formal',
    'chatting with a friend at lunch': 'informal', 'a group chat with your teammates': 'informal', 'telling your cousin about a movie': 'informal', 'planning a sleepover with friends': 'informal',
    'joking with your brother at dinner': 'informal', 'texting a friend about homework': 'informal', 'talking with teammates on the bus': 'informal', 'telling a friend about your weekend': 'informal' };
  const casual = s => /\b(Hey|basically|gonna|Anyway|I guess|Dude|yeah|kinda|Wanna|so like|Ugh|Lol)\b/.test(s);
  const fits = (sit, s) => (FORMALITY[sit] === 'formal') !== casual(s);
  V['g8-register'] = (q, m) => one(q, o => fits(m.sit, o)) ? '' : 'expected a ' + FORMALITY[m.sit] + ' opening';
  V['g8-formal'] = (q, m) => mk(q) === FORMALITY[m.sit] ? '' : 'expected ' + FORMALITY[m.sit];
  V['g8-register-tf'] = (q, m) => tfOk(q, fits(m.sit, text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-pick-formal'] = q => picks(q, o => !casual(o)) ? '' : 'the formal lines are not the ones marked';

  /* body language: a word from what each signal often shows */
  const BODY = { 'leaning forward': 'interest', nodding: 'following along', 'arms crossed tightly': 'disagreement', 'checking a phone': 'not paying', 'an open, relaxed stance': 'confidence',
    frowning: 'confusion', 'tapping a foot': 'impatience', 'raising a hand': 'a turn', 'pausing before a key point': 'emphasis', 'counting points on fingers': 'in order',
    'looking away often': 'shyness', 'a warm smile': 'friendliness' };
  V['g8-body'] = (q, m) => one(q, o => o.includes(BODY[m.b])) ? '' : 'expected ' + BODY[m.b];
  V['g8-body-signal'] = (q, m) => one(q, o => BODY[o] && text(m.mean).includes(BODY[o])) ? '' : 'the signal marked does not show ' + m.mean;
  V['g8-body-match'] = q => q.pairs.every(p => text(p[1]).includes(BODY[text(p[0])])) ? '' : 'a signal is matched wrong';
  /* a claim that one signal means the same thing for everyone is false */
  V['g8-culture'] = (q, m) => tfOk(q, !/every culture|everywhere|always|all people/i.test(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;

  /* precise words: no vague words */
  const VAGUE = /\b(thing|things|stuff|guy|something|bunch)\b/;
  V['g8-precise'] = q => one(q, o => !VAGUE.test(o)) ? '' : 'expected the precise sentence';
  V['g8-precise-tf'] = (q, m) => tfOk(q, !VAGUE.test(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-tap-vague'] = q => VAGUE.test(mk(q)) && q.tiles.map(text).filter(t => VAGUE.test(t)).length === 1 ? '' : 'the vague word is not the one marked';
  const LINK = { 'Recycling saves resources.': 'In addition', 'The plan is costly.': 'However', 'The pipes froze overnight.': 'As a result', 'Mix the dry ingredients.': 'Next',
    'Many animals adapt to winter.': 'For example', 'The trail is short.': 'However', 'Heavy rain fell for days.': 'As a result', 'First, measure the board.': 'Next',
    'Volunteers cleaned the shoreline.': 'In addition', 'Some birds migrate long distances.': 'For example', 'The bridge was old.': 'As a result', 'Phones can be useful in class.': 'However',
    'Our club raises money for the shelter.': 'In addition', 'Boil the water.': 'Next', 'Canada has many official symbols.': 'For example' };
  V['g8-link'] = (q, m) => mk(q) === LINK[m.s] ? '' : 'expected ' + LINK[m.s];
})();
