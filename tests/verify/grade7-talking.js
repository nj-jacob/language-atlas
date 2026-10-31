/* Grade 7 answer checks: listening and speaking (grade7/chapters/talking.js). Own keys, and its own test for passive voice (was/were + a past participle + by). */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const ON = { 'Should our school start later in the morning?': /bus times|sleep/, 'How can our town cut down on food waste?': /food banks|throw out/, 'Should cellphones be allowed in class?': /research|distractions/ };
  V['g7-relevant'] = (q, m) => { const ok = q.options.map(text).filter(o => ON[m.topic].test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the on-topic question'; };
  const GOOD = /^(I agree with|Could you explain|I see it differently, because)/;
  V['g7-reply'] = q => { const ok = q.options.map(text).filter(o => GOOD.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the respectful reply'; };
  V['g7-reply-pick'] = q => H.sameSet(q.options.map((o, i) => GOOD.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful replies are not the ones marked';
  const STAGE = s => /already know|Set a purpose/.test(s) ? 'before' : /Jot down|face and gestures/.test(s) ? 'during' : /Summarize|clear up/.test(s) ? 'after' : null;
  V['g7-stage'] = (q, m) => mk(q) === STAGE(text(m.s)) + ' listening' ? '' : 'expected ' + STAGE(text(m.s));
  V['g7-stage-order'] = q => q.items.map(i => STAGE(text(i))).join() === 'before,during,after' ? '' : 'not in the order before, during, after';
  V['g7-clarify'] = q => /^(About how much|What do you mean|Which report)/.test(mk(q)) ? '' : 'expected the clarifying question';
  const FORMAL = /council|Remembrance|principal/;
  V['g7-formality'] = (q, m) => mk(q) === (FORMAL.test(m.s) ? 'formal' : 'informal') ? '' : 'expected ' + (FORMAL.test(m.s) ? 'formal' : 'informal');
  const FIT = { 'presenting to the school council': 'Good afternoon. Today I will propose', 'telling a friend about your weekend': 'You will not believe', 'giving a speech at a Remembrance Day assembly': 'Today we gather',
    'explaining a game to your younger cousin': 'Okay, here is how it works', 'asking the principal for a meeting': 'Excuse me, Ms. Okafor', 'cheering on your team at a game': "Let's go, Hawks" };
  V['g7-audience'] = (q, m) => mk(q).startsWith(FIT[m.s]) ? '' : 'expected the opening that fits';
  const BODY = { 'leans forward and nods': 'interest', 'crosses arms and looks away': 'not wanting to listen', 'speaks slowly and pauses after a key point': 'that the point matters', 'uses open hands while explaining': 'openness and honesty', 'taps a foot and checks the clock': 'impatience' };
  V['g7-body'] = (q, m) => mk(q) === BODY[m.s] ? '' : 'expected ' + BODY[m.s];
  V['g7-culture-tf'] = (q, m) => /can mean respect/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const passive = s => /\b(was|were|is|are)\s+\w+(ed|en|tten)\b.*\bby\b/.test(s);
  V['g7-which-voice'] = (q, m) => q.answer === (passive(m.s) ? 1 : 0) ? '' : 'expected ' + (passive(m.s) ? 'passive' : 'active');
  /* active from passive: "The puck was stopped by the goalie." -> the goalie first */
  V['g7-to-active'] = (q, m) => { const a = mk(q), by = (m.s.match(/ by (.+)\.$/) || [])[1]; return by && !passive(a) && a.toLowerCase().startsWith(by.toLowerCase()) && q.options.map(text).filter(o => !passive(o) && o.toLowerCase().startsWith(by.toLowerCase())).length === 1 ? '' : 'expected the active sentence starting with ' + by; };
  V['g7-when-passive'] = q => /does not matter|Nobody knows|not the point/.test(mk(q)) ? '' : 'expected the reason about the doer';
  const PRECISE = { 'The dog ate its food.': 'gulped down', 'She said, “Stop!”': 'shouted', 'The view from the lookout was nice.': 'breathtaking', 'He walked into the room after losing the game.': 'trudged', 'The soup was good.': 'rich and spicy', 'They ran to catch the bus.': 'sprinted' };
  V['g7-precise'] = (q, m) => mk(q) === PRECISE[text(m.s)] ? '' : 'expected ' + PRECISE[text(m.s)];
})();
