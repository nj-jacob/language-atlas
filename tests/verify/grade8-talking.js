/* Grade 8 answer checks: listening and speaking (grade8/chapters/talking.js). Own key lists and rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const PARA = { 'We should hold the fundraiser': 'less busy', 'The new bike lanes': 'help cyclists but', 'I liked the novel': 'enjoyed it overall', 'Our group needs one more source': 'ideally a new one' };
  const paraOf = s => PARA[Object.keys(PARA).find(k => s.startsWith(k))];
  V['g8-paraphrase'] = (q, m) => mk(q).includes(paraOf(text(m.s))) && !mk(q).includes(text(m.s)) ? '' : 'expected the paraphrase';
  const open = s => /^(What|How|Why)\b/.test(s), closed = s => /^(Did|Is|Was|Do|Are|Can)\b/.test(s);
  V['g8-open'] = q => open(mk(q)) && q.options.map(text).filter(open).length === 1 ? '' : 'expected the open question';
  V['g8-pick-open'] = q => H.sameSet(q.options.map((o, i) => open(text(o)) ? i : -1).filter(i => i >= 0), q.answer) && q.options.every(o => open(text(o)) || closed(text(o))) ? '' : 'the open questions are not the ones marked';
  const ONTOPIC = { 'Should our school have a longer lunch?': /lunch/, 'How can we reduce waste in the cafeteria?': /reusable/, 'Was the main character right to leave home?': /left|right/ };
  V['g8-relevant'] = (q, m) => ONTOPIC[m.t].test(mk(q)) && q.options.map(text).filter(o => ONTOPIC[m.t].test(o)).length === 1 ? '' : 'expected the response on the topic';
  const asks = s => /^(Could you explain|Do you mean|What do you mean)/.test(s);
  V['g8-clarify'] = q => asks(mk(q)) && q.options.map(text).filter(asks).length === 1 ? '' : 'expected the clarifying question';
  const SUPPORT = { 'The library should stay open late.': /12 000 visits/, 'The garden helps the school.': /stay cooler/, 'Warmer winters are a problem for some northern communities.': /less can be delivered/ };
  V['g8-evidence-talk'] = (q, m) => SUPPORT[m.claim].test(mk(q)) && H.has(q.fig, mk(q)) ? '' : 'expected the supporting detail';
  const FORMALITY = { 'presenting to the school board': 'formal', 'chatting with a friend at lunch': 'informal', 'a job interview at a garden centre': 'formal', 'a group chat with your teammates': 'informal',
    'a speech at a Remembrance Day assembly': 'formal', 'telling your cousin about a movie': 'informal' };
  const casual = s => /\b(Hey|basically|gonna|Anyway|I guess)\b/.test(s);
  V['g8-register'] = (q, m) => { const want = FORMALITY[m.sit], ok = o => (want === 'formal') !== casual(o); return ok(mk(q)) && q.options.map(text).filter(ok).length === 1 ? '' : 'expected a ' + want + ' opening'; };
  V['g8-formal'] = (q, m) => mk(q) === FORMALITY[m.sit] ? '' : 'expected ' + FORMALITY[m.sit];
  const BODY = { 'leaning forward': 'interest', nodding: 'following', 'arms crossed tightly': 'disagreement', 'checking a phone': 'not paying', 'an open, relaxed stance': 'confidence' };
  V['g8-body'] = (q, m) => mk(q).includes(BODY[m.b]) ? '' : 'expected ' + BODY[m.b];
  V['g8-culture'] = (q, m) => (/every culture|everywhere/.test(text(m.s)) ? false : true) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  const vague = s => /\b(thing|stuff|a lot|guy)\b/.test(s);
  V['g8-precise'] = q => !vague(mk(q)) && q.options.map(text).filter(o => !vague(o)).length === 1 ? '' : 'expected the precise sentence';
  const LINK = { 'Recycling saves resources.': 'In addition', 'The plan is costly.': 'However', 'The pipes froze overnight.': 'As a result', 'Mix the dry ingredients.': 'Next' };
  V['g8-link'] = (q, m) => mk(q) === LINK[m.s] ? '' : 'expected ' + LINK[m.s];
})();
