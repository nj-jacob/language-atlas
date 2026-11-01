/* Grade 8 answer checks: drafting, revising and publishing (grade8/chapters/writing.js). Own rules and key lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const one = (q, ok) => ok(mk(q)) && q.options.map(text).filter(ok).length === 1;
  const picks = (q, ok) => H.sameSet(q.options.map((o, i) => ok(text(o)) ? i : -1).filter(i => i >= 0), q.answer);
  const tfOk = (q, right) => q.answer === right && q.why.answer === 0;
  const lines = html => { const d = document.createElement('div'); d.innerHTML = html; return [...d.querySelectorAll('.ps')].map(p => text(p.innerHTML)); };

  /* style: the words that only the suiting sentence for each text has */
  const STYLE = { 'a lab report': /80 degrees/, 'a message to your best friend': /Can't believe/, 'a cover letter for a summer job': /reliable and eager/, 'a suspense story': /creaked/,
    'a speech to persuade the school council': /deserves/, 'a news report': /reached the scene/, 'a thank-you note to an Elder': /sharing your stories/, 'instructions for a science kit': /^Pour 50 mL/,
    'a funny story for younger kids': /honked so loudly/, 'a poem about winter': /hushes/, 'a book review for the school newsletter': /kept me guessing/, 'an email to your principal': /^Could we meet/,
    'a text to your sister': /save me a seat/, 'an encyclopedia entry': /lives in the Arctic tundra/, 'a personal narrative': /hands shook/ };
  const suits = (form, s) => STYLE[form].test(s);
  V['g8-style'] = (q, m) => one(q, o => suits(m.form, o)) ? '' : 'expected the sentence that suits ' + m.form;
  V['g8-match-style'] = q => q.pairs.every(p => STYLE[text(p[1])] && suits(text(p[1]), text(p[0]))) ? '' : 'a sentence is matched to the wrong text';
  V['g8-style-tf'] = (q, m) => tfOk(q, suits(m.form, text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-style-which'] = (q, m) => suits(mk(q), text(m.s)) ? '' : 'the text marked does not suit ' + m.s;

  /* fair to the other side: "Some ... worry / may" or "Others argue" */
  const fair = s => /^(Some|Others)\b.*\b(worry|argue|may)\b/.test(s);
  V['g8-counter'] = q => one(q, fair) ? '' : 'expected the sentence that acknowledges another view';
  V['g8-counter-tf'] = (q, m) => tfOk(q, fair(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-pick-counter'] = q => picks(q, fair) ? '' : 'the fair sentences are not the ones marked';
  V['g8-counter-react'] = (q, m) => mk(q).includes(fair(text(m.s)) ? 'feel heard' : 'stop listening') ? '' : 'wrong reaction for ' + m.s;

  /* loaded words */
  const LOADED = /\b(ridiculous|whiny|greedy|fool|lazy|reckless|pathetic|mob|heroic|so-called|disastrous|brilliant|selfish|useless|pointless)\b/i;
  V['g8-neutral'] = q => one(q, o => !LOADED.test(o)) ? '' : 'expected the neutral sentence';
  V['g8-loaded'] = q => LOADED.test(mk(q)) && q.tiles.map(text).filter(t => LOADED.test(t)).length === 1 ? '' : 'the loaded word is not the one marked';
  V['g8-loaded-tf'] = (q, m) => tfOk(q, !LOADED.test(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-pick-neutral'] = q => picks(q, o => !LOADED.test(o)) ? '' : 'the neutral sentences are not the ones marked';

  /* focus: the checker's own list of off-topic sentences and topic sentences */
  const OFF = ['My favourite food is pizza.', 'My cousin lives in Calgary.', 'The library has new carpets.', 'My brother is afraid of spiders.', 'Basketball tryouts are next week.',
    'Penguins live in the Southern Hemisphere.', 'I got a new backpack last week.', 'My sister just learned to drive.', 'My favourite movie came out in 2019.', 'Halifax has a busy airport.',
    'My cousin plays the trumpet.', 'Our hockey team won on Saturday.', 'Ice cream comes in many flavours.', 'The gym floor was just polished.', 'My aunt sells used cars.'];
  const TOPIC = ['Our town needs', 'Wetlands protect', 'Reading every day', 'Bees are vital', 'Our school should start', 'The Northwest Passage', 'Learning a second language', 'Winter camping',
    'Volunteering helps', 'The Bay of Fundy', 'Sleep matters', 'Maple syrup season', 'Canoes were vital', 'Our class garden', 'City parks'];
  const off = s => OFF.includes(s), topic = s => TOPIC.some(t => s.startsWith(t));
  V['g8-off-topic'] = q => one(q, off) && lines(q.fig).filter(off).length === 1 && topic(lines(q.fig)[0]) ? '' : 'expected the off-topic sentence';
  V['g8-off-tf'] = (q, m) => tfOk(q, !off(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-topic-sentence'] = q => one(q, topic) ? '' : 'expected the topic sentence';
  const FEED = [[/lost in the middle|repeat each other|body paragraphs/, 'the middle'], [/start is slow|first paragraph|until page two/, 'the opening'], [/ending felt sudden|conclusion just stops|last line/, 'the ending']];
  V['g8-feedback'] = (q, m) => { const f = FEED.find(x => x[0].test(text(m.said))); return f && mk(q) === f[1] ? '' : 'expected ' + (f && f[1]); };

  /* combining: the best keeps every content word of the choppy version and repeats none */
  const STOP = new Set('the was a and by at of'.split(' '));
  const content = s => s.toLowerCase().replace(/[.,]/g, '').split(' ').filter(w => !STOP.has(w));
  const repeats = s => content(s).some((w, i, all) => all.indexOf(w) !== i);
  const keepsAll = (choppy, s) => content(choppy).every(w => content(s).includes(w));
  const smooth = (choppy, s) => keepsAll(choppy, s) && !repeats(s) && (s.match(/\./g) || []).length === 1;
  V['g8-combine-rev'] = (q, m) => one(q, o => smooth(text(m.s), o)) ? '' : 'expected the smooth combination';
  V['g8-combine-tf'] = (q, m) => tfOk(q, smooth(text(m.s), text(m.shown))) ? '' : 'true/false is wrong for ' + m.shown;
  V['g8-pick-smooth'] = q => picks(q, o => !repeats(o)) ? '' : 'the smooth revisions are not the ones marked';
  const verdict = s => (s.match(/\. /g) || []).length >= 2 ? 'three short sentences' : repeats(s) ? 'repeats the subject' : 'smooth';
  V['g8-combine-verdict'] = (q, m) => mk(q).includes(verdict(text(m.s))) ? '' : 'expected "' + verdict(text(m.s)) + '"';

  /* order: the first words of each sentence in a logical order */
  const ORDER = [['Bike lanes make', 'They separate', 'In cities', 'Our town should'], ['Composting cuts', 'Food scraps', 'In a compost bin', 'Every family'],
    ['Our library should', 'Many families', 'A Sunday opening', 'The council should'], ['Snowshoe hares are', 'Their fur', 'Their big back feet', 'These features'],
    ['Planting trees', 'Leaves shade', 'Trees also', 'Every new street'], ['An inuksuk', 'Inuit built', 'Some marked', 'Today, many'],
    ['Our school needs', 'There are only two', 'Long lines', 'Two new fountains'], ['Electric buses could', 'They make no exhaust', 'They are also', 'The city should'],
    ['Loons are', 'Their solid bones', 'They can stay', 'This makes them'], ['Board games', 'Players talk', 'Children also', 'Try a game night'],
    ['The Trans-Canada', 'It runs', 'Trucks use it', 'Without it'], ['Our town should ban', 'Bags blow', 'Reusable bags', 'A ban would'],
    ['Volcanoes can', 'Lava cools', 'Over many years', 'Hawaii was'], ['Learning to cook', 'You can make', 'You also save', 'Start with'],
    ['The Prairies', 'The land is flat', 'Long summer days', 'That is why']];
  const inOrder = list => ORDER.some(o => list.length === 4 && list.every((s, i) => s.startsWith(o[i])));
  /* where a sentence goes: the position of the longest opening that matches it */
  const place = s => { let best = -1, len = 0; ORDER.forEach(o => o.forEach((x, i) => { if (s.startsWith(x) && x.length > len) { best = i; len = x.length; } })); return best; };
  V['g8-reorder'] = q => inOrder(q.items.map(text)) ? '' : 'the paragraph is not in a logical order';
  V['g8-first-sentence'] = q => one(q, o => place(o) === 0) ? '' : 'expected the main idea';
  V['g8-last-sentence'] = q => one(q, o => place(o) === 3) ? '' : 'expected the closing point';
  V['g8-order-tf'] = q => tfOk(q, inOrder(lines(q.fig))) ? '' : 'true/false is wrong';

  /* sound-alike words used wrongly: [rule, the wrong word, the right word] */
  const WRONG = [[/^Their going/, 'Their', "They're"], [/wagged it's/, "it's", 'its'], [/will effect/, 'effect', 'affect'], [/walked passed/, 'passed', 'past'], [/^Your welcome/, 'Your', "You're"],
    [/lost there/, 'there', 'their'], [/walk then take/, 'then', 'than'], [/is to hot/, 'to', 'too'], [/^Who's backpack/, "Who's", 'Whose'], [/could here/, 'here', 'hear'],
    [/except my/, 'except', 'accept'], [/loose our/, 'loose', 'lose'], [/^Its going/, 'Its', "It's"], [/and than/, 'than', 'then'], [/was write/, 'write', 'right']];
  const rule = s => WRONG.find(w => w[0].test(s));
  V['g8-homophone'] = (q, m) => rule(text(m.s)) && mk(q) === rule(text(m.s))[1] ? '' : 'the wrong word is ' + (rule(text(m.s)) || [])[1];
  V['g8-homo-fix'] = q => one(q, o => !rule(o)) ? '' : 'expected the correct sentence';
  V['g8-homo-tf'] = (q, m) => tfOk(q, !rule(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-homo-pick'] = (q, m) => rule(text(m.s)) && mk(q) === rule(text(m.s))[2] ? '' : 'expected ' + (rule(text(m.s)) || [])[2];

  /* kinds of error */
  const KIND = [[/students was|players have|^Me and Kai|don't like|apples are/, 'grammar'], [/going\.$|are, |Halifax Moncton|start\.$|^Wow that/, 'punctuation'],
    [/recieved|experement|beautifull|libary|goverment/, 'spelling']];
  const kind = s => (KIND.find(x => x[0].test(s)) || [])[1];
  V['g8-err-kind'] = (q, m) => mk(q) === kind(text(m.s)) ? '' : 'expected ' + kind(text(m.s));
  V['g8-err-fix'] = q => one(q, o => !kind(o)) ? '' : 'expected the correct sentence';
  V['g8-err-tf'] = (q, m) => tfOk(q, !kind(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-err-match'] = q => q.pairs.every(p => kind(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong kind of error';

  /* tools: what each job needs */
  const TOOL = [[/without erasing|notes beside/, 'track changes'], [/too many times|stronger word/, 'thesaurus'], [/look the same|stand out/, 'heading styles'], [/under 500 words|short enough/, 'word count'],
    [/typing mistakes|red underlines/, 'spell-check'], [/want it back|earlier draft/, 'version history'], [/right format|same format/, 'citation tool'], [/wrong 20 times/, 'find and replace']];
  const toolFor = s => (TOOL.find(x => x[0].test(s)) || [])[1];
  V['g8-tool'] = (q, m) => one(q, o => o.includes(toolFor(text(m.need)))) ? '' : 'expected ' + toolFor(text(m.need));
  V['g8-tool-tf'] = (q, m) => tfOk(q, text(m.said).includes(toolFor(text(m.need)))) ? '' : 'true/false is wrong for ' + m.said;
  V['g8-tool-match'] = q => q.pairs.every(p => text(p[1]).includes(toolFor(text(p[0])))) ? '' : 'a job is matched to the wrong tool';
  V['g8-tool-when'] = (q, m) => one(q, o => !!toolFor(o) && text(m.tool).includes(toolFor(o))) ? '' : 'the job marked does not need ' + m.tool;
})();
