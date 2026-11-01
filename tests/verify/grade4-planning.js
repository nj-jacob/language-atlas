/* Grade 4 answer checks: planning writing (grade4/chapters/planning.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* what you want to do -> [form, purpose, audience], worked out from its key words */
  const JOB = [[/how to make/, 'instructions', 'to explain how', 'your class'], [/convince/, 'a persuasive letter', 'to persuade', 'the principal'],
    [/monarch facts/, 'an information poster', 'to inform', 'a Grade 2 class'], [/laugh/, 'a story', 'to entertain', 'your cousin'],
    [/thank/, 'a thank-you card', 'to thank', 'a guest speaker'], [/snowfall/, 'a poem', 'to describe a feeling', 'anyone who reads it'],
    [/garden party/, 'an invitation', 'to invite', 'your neighbours'], [/pen pal/, 'a friendly letter', 'to share news', 'your pen pal'],
    [/class trip/, 'a recount', 'to retell what happened', 'your teacher'], [/pancake/, 'a menu', 'to list choices', 'your family']];
  const job = j => JOB.find(([re]) => re.test(j)) || [];
  V['g4-form-for'] = (q, m) => mk(q) === job(m.job)[1] ? '' : 'expected ' + job(m.job)[1];
  V['g4-purpose-of'] = (q, m) => mk(q) === job(m.job)[2] ? '' : 'expected ' + job(m.job)[2];
  V['g4-audience-of'] = (q, m) => mk(q) === job(m.job)[3] ? '' : 'expected ' + job(m.job)[3];
  V['g4-write-purpose-tf'] = (q, m) => (job(m.job)[2] === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.said;
  V['g4-job-for'] = (q, m) => job(mk(q).replace(/^to /, ''))[2] === m.purpose && q.options.filter(o => job(text(o))[2] === m.purpose).length === 1 ? '' : 'expected the job written ' + m.purpose;
  V['g4-plan-form-tf'] = (q, m) => (job(m.job)[1] === m.f) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.f;
  const PURPOSE = Object.fromEntries(JOB.map(j => [j[1], j[2]]));
  V['g4-form-match'] = q => q.pairs.every(p => PURPOSE[text(p[0])] === text(p[1])) ? '' : 'a form is matched to the wrong purpose';
  const MEDIUM = { 'tie a knot': 'a short video', recycle: 'a sign on the fridge', 'science fair': 'a slide show', grandparent: 'an email or a card in the mail',
    'bake sale': 'a poster in the hallway', bedtime: 'a picture book', weather: 'a chart or graph', 'quick reminder': 'a text message' };
  const medOf = g => MEDIUM[Object.keys(MEDIUM).find(k => g.includes(k))];
  V['g4-medium'] = (q, m) => mk(q) === medOf(m.goal) ? '' : 'the medium does not fit';
  V['g4-medium-tf'] = (q, m) => (medOf(m.goal) === m.med) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.med;
  const GOODWAY = /^(Make an idea web|Brainstorm|Talk it over|Think about your own|Read about|Draw a quick|Ask yourself)/;
  V['g4-idea-ways'] = q => H.sameSet(q.options.map((o, i) => GOODWAY.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good ways are not the ones marked';
  V['g4-idea-tf'] = (q, m) => GOODWAY.test(text(m.s)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s;
  const WEB = { 'Winter fun': /skating|sledding|snow fort|ice fishing/, 'My dog': /how she looks|tricks|what she eats|where she sleeps/, Fall: /leaves|apple|geese|Thanksgiving/,
    'Being a good friend': /^(sharing|listening|helping|being honest)$/, 'Our garden': /planting|watering|weeds|beans/ };
  V['g4-web-fit'] = (q, m) => WEB[m.topic].test(mk(q)) && q.tiles.filter(t => WEB[m.topic].test(text(t))).length === 1 && !H.has(q.fig, mk(q)) ? '' : 'expected the idea about ' + m.topic;
  V['g4-web-odd'] = (q, m) => !WEB[m.topic].test(mk(q)) && q.tiles.filter(t => !WEB[m.topic].test(text(t))).length === 1 ? '' : 'expected the idea that is not about ' + m.topic;
  const KEEP = /^the (title|author|date|page)/;
  V['g4-record'] = q => H.sameSet(q.options.map((o, i) => KEEP.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the details to record are not the ones marked';
  V['g4-source-tf'] = (q, m) => KEEP.test(m.s) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s;
  /* own words: not the same as the source, and the checker's key words of the fact are kept */
  const FACT = { 'Beavers have orange': /keep growing/, 'Monarch butterflies': /4000 km.*Mexico/, 'The Canadian Shield': /Almost half/, 'Maple sap': /boil maple sap/, 'Loons can dive': /60 m/ };
  V['g4-own-words'] = (q, m) => { const re = FACT[Object.keys(FACT).find(k => m.src.startsWith(k))], ok = q.options.map(text).filter(o => o !== text(m.src) && re.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the note in your own words'; };
  const TRUSTED = /zoo or science centre|historian|weather service|encyclopedia|official/;
  V['g4-trusted'] = q => TRUSTED.test(mk(q)) && q.tiles.filter(t => TRUSTED.test(text(t))).length === 1 ? '' : 'expected the source you can trust';
  /* sorting: home words, food words, body words */
  const head = f => /lodge|dam/.test(f) ? 'Home' : /eat|store/.test(f) ? 'Food' : /tail|teeth|feet|fur/.test(f) ? 'Body' : null;
  V['g4-sort-facts'] = q => q.pairs.every(p => head(text(p[0])) === text(p[1])) ? '' : 'a fact is under the wrong heading';
  V['g4-which-heading'] = (q, m) => mk(q) === head(m.f) ? '' : 'expected ' + head(m.f);
  V['g4-heading-tf'] = (q, m) => (head(m.f) === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.f;
  const PLAN = ['character and setting', 'problem starts', 'harder', 'solved', 'feels at the end'];
  V['g4-plan-order'] = q => q.items.every((it, i) => text(it).includes(PLAN[i])) ? '' : 'the story plan is not in order';
})();
