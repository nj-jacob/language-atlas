/* Grade 7 answer checks: writing and publishing (grade7/chapters/writing.js). Own keys: which sentence opens and closes each paragraph,
   the tone each form needs, fair and unfair generalizations, the checker's own error list, and which design choices help. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const sents = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return [...d.querySelectorAll('.sent')].map(x => text(x.innerHTML)); };
  const TOPIC = ['Our town should build a skateboard park.', 'Winter ice roads are a lifeline for many northern communities.', 'Volunteering helps teens as much as it helps others.',
    "Canoeing is the best way to explore Ontario's lakes.", 'Our school needs more water fountains.', 'Libraries offer far more than books.', 'Every cyclist should wear a helmet.', 'Learning a second language opens many doors.'];
  const CLOSE = ['A skateboard park would make our town safer for everyone.', 'Protecting these roads matters to thousands of people.', 'Giving time is one of the best ways to grow.',
    'For anyone who loves the outdoors, a canoe opens up the province.', 'More fountains would keep everyone healthy and ready to learn.', 'A library card may be the most useful card you own.',
    'A few seconds to buckle a helmet can save a life.', 'A new language is a gift that lasts a lifetime.'];
  const DETAIL = ['Right now, skaters use parking lots, which is unsafe.', 'A park would give them a safe place to practise.', 'Trucks use them to bring in fuel and food.',
    'Without them, supplies must be flown in at a high cost.', 'Teens learn skills like teamwork and planning.', 'They also meet people from different backgrounds.',
    'A canoe can slip into quiet bays that motorboats cannot reach.', 'Paddlers can also carry their canoe between lakes on portages.', 'Students wait a long time at the only working fountain.',
    'Many skip drinking water because of the line.', 'Many lend out laptops, board games and even tools.', 'They also run free programs, from coding clubs to homework help.',
    'Helmets protect the brain in a fall.', 'Even a slow crash can cause a serious head injury.', 'It lets you talk with more people in your community.', 'It can also lead to jobs in other parts of Canada.'];
  const roleOf = s => TOPIC.includes(s) ? 'topic sentence' : CLOSE.includes(s) ? 'concluding sentence' : DETAIL.includes(s) ? 'supporting detail' : null;
  V['g7-para-order'] = q => { const t = q.items.map(text); return TOPIC.includes(t[0]) && CLOSE.includes(t[t.length - 1]) && TOPIC.indexOf(t[0]) === CLOSE.indexOf(t[t.length - 1]) ? '' : 'topic sentence first and conclusion last'; };
  V['g7-topic-sentence'] = q => TOPIC.includes(mk(q)) && q.options.map(text).filter(o => TOPIC.includes(o)).length === 1 ? '' : 'expected the topic sentence';
  V['g7-concluding'] = q => CLOSE.includes(mk(q)) && q.options.map(text).filter(o => CLOSE.includes(o)).length === 1 ? '' : 'expected the concluding sentence';
  V['g7-para-tf'] = (q, m) => { const right = roleOf(text(m.s)) === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const TONE = { 'a science report': 'The water boiled after six minutes', 'a personal blog about a camping trip': 'Honestly, the first night', 'a thank-you letter to a coach': 'Thank you for believing',
    'a persuasive speech': 'Imagine a school', 'a news report': 'The bridge will close for repairs', 'a text message to a friend': 'Running late, save me a seat',
    'a letter to the mayor': 'I am writing to ask you to keep', 'a scary story': 'The hallway was silent' };
  const formOf = s => Object.keys(TONE).find(f => s.startsWith(TONE[f]));
  V['g7-tone'] = (q, m) => mk(q).startsWith(TONE[m.f]) ? '' : 'expected the sentence with the right tone';
  V['g7-tone-form'] = (q, m) => mk(q) === formOf(text(m.s)) ? '' : 'expected ' + formOf(text(m.s));
  V['g7-tone-tf'] = (q, m) => { const right = text(m.s).startsWith(TONE[m.f]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const VOICED = /terrified|comes alive|never forget|Nothing beats|still laugh|chase hard problems|favourite place on earth|could not stop grinning/;
  V['g7-voice'] = q => VOICED.test(mk(q)) && q.options.map(text).filter(o => VOICED.test(o)).length === 1 ? '' : 'expected the sentence with a personal voice';
  /* unfair generalizations about a group use these sweeping words */
  const SWEEP = /\b(Everyone|everyone|Only|only|never|nothing|always|Nobody|All)\b/;
  const unfair = s => SWEEP.test(s);
  V['g7-own-bias'] = q => { const ok = q.options.map(text).filter(o => !unfair(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the fairer sentence'; };
  V['g7-reader-feel'] = q => /unfairly judged/.test(mk(q)) && unfair(sents(q)[0]) ? '' : 'expected that the reader may feel judged';
  V['g7-sweep-word'] = q => SWEEP.test(mk(q)) && q.tiles.map(text).filter(t => SWEEP.test(t)).length === 1 ? '' : 'expected the sweeping word';
  V['g7-fair-tf'] = (q, m) => { const right = m.said === !unfair(text(m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* a sentence that is not a topic, detail or concluding sentence is off topic */
  const ALL = [].concat(TOPIC, CLOSE, DETAIL);
  V['g7-cut'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const lines = [...d.querySelectorAll('p')].map(p => text(p.innerHTML)), off = lines.filter(l => !ALL.includes(l));
    return off.length === 1 && mk(q) === off[0] ? '' : 'expected the off-topic sentence'; };
  V['g7-revise-tf'] = (q, m) => { const right = m.said === !ALL.includes(text(m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const LINK = { 'Skaters use parking lots.': 'As a result,', 'Many teens volunteer.': 'For example,', 'Ice roads are useful.': 'However,', 'We collected the data and made a graph.': 'Finally,',
    'The storm knocked out the power.': 'As a result,', 'Libraries lend more than books.': 'For example,', 'The hike was long and steep.': 'However,', 'Ravi set the table.': 'Meanwhile,',
    'Helmets protect your head.': 'In addition,', 'We tested the boat and fixed the leak.': 'Finally,' };
  const SHOWS = { 'As a result,': 'a result', 'For example,': 'an example', 'However,': 'a contrast', 'Finally,': 'the last step', 'Meanwhile,': 'at the same time', 'In addition,': 'one more point' };
  V['g7-transition'] = (q, m) => mk(q) === LINK[m.a] ? '' : 'expected ' + LINK[m.a];
  V['g7-transition-why'] = (q, m) => mk(q) === SHOWS[m.w] ? '' : 'expected ' + SHOWS[m.w];
  /* the checker's own error list: wrong sentence -> kind of error */
  const ERR = { 'There team won the final game.': 'spelling', 'The coach said “Great work, everyone.”': 'punctuation', 'Each of the players have a new jersey.': 'grammar', 'We travelled to ottawa in February.': 'capitalization',
    'The museum was to crowded to see much.': 'spelling', 'Leila and me finished the project.': 'grammar', 'We saw the CN Tower in toronto.': 'capitalization', 'The dogs wagged there tails.': 'spelling',
    'We bought bread milk and eggs.': 'punctuation', 'Her and her brother walk to school.': 'grammar', 'My favourite month is october.': 'capitalization', 'The geese was flying south.': 'grammar',
    'I could not beleive my eyes.': 'spelling', 'Where are you going.': 'punctuation' };
  V['g7-no-error'] = q => { const ok = q.options.map(text).filter(o => !ERR[o]); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with no errors'; };
  V['g7-error-kind'] = (q, m) => mk(q) === ERR[text(m.s)] ? '' : 'expected ' + ERR[text(m.s)];
  V['g7-error-pick'] = q => H.sameSet(q.options.map((o, i) => ERR[text(o)] ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the sentences with errors are not the ones marked';
  const CHECK_TRUE = /can miss|can suggest a change that is wrong|Reading aloud helps|the writer decides/;
  V['g7-checker-tf'] = (q, m) => CHECK_TRUE.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const HELP = { 'help readers find each section of a report': 'clear headings', 'explain what a photo shows': 'a caption under the photo', 'make slides easy to follow during a talk': 'a few words and one picture per slide',
    'make a poster readable from across the room': 'large, high-contrast text', 'show how the population changed over ten years': 'a line graph',
    'make a web page work for someone using a screen reader': 'alt text for every image', 'keep an audience listening during a talk': 'pausing and looking up at the audience',
    'make a printed report look finished': 'a title page and page numbers', 'help readers remember a key fact': 'a sidebar with the fact in bold', 'help a younger reader follow a story': 'one picture for each part of the story' };
  const HELPS = Object.values(HELP);
  V['g7-technique'] = (q, m) => mk(q) === HELP[m.g] ? '' : 'expected ' + HELP[m.g];
  V['g7-tech-match'] = q => q.pairs.every(p => HELP[text(p[0])] === text(p[1])) ? '' : 'a goal is matched wrong';
  V['g7-pub-pick'] = q => H.sameSet(q.options.map((o, i) => HELPS.includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful choices are not the ones marked';
  const PUB_TRUE = /a few words and let me|Headings help|needs alt text|help the message, not just decorate/;
  V['g7-pub-tf'] = (q, m) => PUB_TRUE.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
})();
