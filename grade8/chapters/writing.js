/* Grade 8: drafting, revising and publishing. A full chapter: every idea has two worked examples, three questions together and five
   on your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8, D2 Creating Texts and D3 Publishing, Presenting and Reflecting:
   D2.1 draft complex texts of various forms and genres, citing sources        D2.2 cursive writing and advanced word-processing skills
   D2.3 an identifiable voice; language and style that suit form, audience and purpose
   D2.4 points of view, perspectives and bias in their own texts; how audiences may respond; acknowledging other perspectives
   D2.5 revise content, style and sentences for clarity, focus and coherence, using feedback
   D2.6 edit for spelling, punctuation, grammar and format, including with spell- and grammar-checkers
   D3.1 produce final texts           D3.2 publish and present, and evaluate the choices     D3.3 reflect on the creative process
   Writing is never auto-marked: drafting, handwriting and publishing are activities the grown-up marks with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade8-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function lvQ(lv, three) { return three[Math.min(Math.max(lv || 1, 1), 3) - 1]; }
  function tf(q, fig, answer, why, more) {
    var o = { q: q, fig: fig, type: 'tf', answer: answer, why: { options: why, answer: 0 } };
    Object.keys(more).forEach(function (k) { o[k] = more[k]; });
    return o;
  }
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }
  function hl(s, w) { return s.replace(w, '<mark class="hl">' + w + '</mark>'); }

  /* [form and audience, a sentence that suits it, one that does not] */
  var STYLE = [['a lab report', 'The water was heated to 80 degrees Celsius.', 'So we cranked the heat way up.'],
    ['a message to your best friend', 'Can' + AP + 't believe how hard that test was!', 'The examination presented considerable difficulty.'],
    ['a cover letter for a summer job', 'I am reliable and eager to learn.', 'I' + AP + 'm pretty chill, honestly.'],
    ['a suspense story', 'The floorboards creaked behind me.', 'The house had wooden floors.'],
    ['a speech to persuade the school council', 'Every student deserves a safe place to play.', 'Whatever, it would be kind of nice.'],
    ['a news report', 'Firefighters reached the scene at 6:40 a.m.', 'OMG, the fire was insane!'],
    ['a thank-you note to an Elder', 'Thank you for sharing your stories with our class.', 'Thanks, I guess it was okay.'],
    ['instructions for a science kit', 'Pour 50 mL of vinegar into the cup.', 'Then, like, dump some vinegar in.'],
    ['a funny story for younger kids', 'The goose honked so loudly that the principal dropped her coffee.', 'Geese are migratory waterfowl.'],
    ['a poem about winter', 'Snow hushes the sleeping town.', 'It snowed 20 cm on Tuesday.'],
    ['a book review for the school newsletter', 'The plot twists kept me guessing until the last page.', 'Book good. Read it.'],
    ['an email to your principal', 'Could we meet to discuss the new club?', 'Yo, can we talk about the club thing?'],
    ['a text to your sister', 'Running late, save me a seat!', 'I regret to inform you that I will be delayed.'],
    ['an encyclopedia entry', 'The snowy owl lives in the Arctic tundra.', 'Snowy owls are just the cutest!'],
    ['a personal narrative', 'My hands shook as I stepped onto the stage.', 'The stage was 3 metres wide.']];

  /* a sentence that acknowledges another view, and two that dismiss it */
  var COUNTER = [['Some parents worry that a later start would make mornings harder for working families.', ['Everyone agrees that school should start later.', 'Starting later is obviously the only sensible choice.']],
    ['Others argue that the money would be better spent on new books.', ['No one could possibly disagree with this plan.', 'Anyone against the park is wrong.']],
    ['Some students may prefer the old schedule because it fits their bus times.', ['The old schedule was terrible for everyone.', 'Only lazy students like the old schedule.']],
    ['Some neighbours worry that a skate park would be noisy at night.', ['Noise is not a real problem.', 'People who complain about noise just hate kids.']],
    ['Others argue that uniforms would save families money.', ['Uniforms are a silly idea, period.', 'Anyone who likes uniforms is boring.']],
    ['Some farmers may lose land if the highway is built.', ['The highway helps everyone equally.', 'Farmers complain about everything.']],
    ['Some teachers worry that phones in class will distract students.', ['Phones never distract anyone.', 'Teachers just want to control us.']],
    ['Others argue that a four-day week would make each day too long for young children.', ['A four-day week is perfect for all ages.', 'Only grumpy people dislike the four-day week.']],
    ['Some residents may want the old arena kept for its history.', ['The old arena is useless junk.', 'Nobody cares about old buildings.']],
    ['Some fishers worry that the new rules will hurt their income.', ['The rules are obviously fair to all.', 'Fishers are just being greedy.']],
    ['Others argue that homework helps students practise skills.', ['Homework is pointless for every student.', 'Only teachers like homework.']],
    ['Some families may not be able to afford the trip.', ['Everyone can easily pay for the trip.', 'The cost does not matter at all.']],
    ['Some coaches worry that cutting practice time will hurt the team.', ['Practice time does not matter.', 'Coaches only care about winning.']],
    ['Others argue that a bike lane would slow down traffic.', ['Drivers are wrong about everything.', 'Bike lanes have no downsides.']],
    ['Some shop owners worry that closing the street to cars will mean fewer customers.', ['Shop owners will be fine, trust me.', 'A car-free street pleases everyone.']]];
  var REACT = ['They feel heard, so they keep reading.', 'They may feel insulted and stop listening.', 'They will not notice the sentence at all.'];

  /* [loaded, neutral, the loaded word] */
  var LOADED = [['The mayor' + AP + 's ridiculous plan costs 2 million dollars.', 'The mayor' + AP + 's plan would cost 2 million dollars.', 'ridiculous'],
    ['Those whiny students complained about lunch.', 'Some students raised concerns about lunch.', 'whiny'], ['The greedy company released waste into a river.', 'The company released waste into a river.', 'greedy'],
    ['Only a fool would vote no.', 'Some voters may vote no for other reasons.', 'fool'], ['The lazy council delayed repairs again.', 'The council delayed repairs again.', 'lazy'],
    ['Reckless teens crowded the skate park.', 'Many teens used the skate park.', 'Reckless'], ['The pathetic team lost by six goals.', 'The team lost by six goals.', 'pathetic'],
    ['A mob of shoppers rushed the store.', 'A crowd of shoppers entered the store.', 'mob'], ['Heroic volunteers saved the festival.', 'Volunteers helped run the festival.', 'Heroic'],
    ['The so-called expert gave a talk.', 'The scientist gave a talk.', 'so-called'], ['The disastrous new schedule starts Monday.', 'The new schedule starts Monday.', 'disastrous'],
    ['The brilliant principal fixed everything.', 'The principal made several changes.', 'brilliant'], ['Selfish drivers blocked the bike lane.', 'Some drivers parked in the bike lane.', 'Selfish'],
    ['The useless app crashed again.', 'The app stopped working again.', 'useless'], ['The pointless garden took up space.', 'The garden used part of the yard.', 'pointless']];

  /* [topic sentence, two that support it, one that is off topic] */
  var PARA = [['Our town needs a new skate park.', 'The old one has cracked ramps.', 'A new park would bring the community together.', 'My favourite food is pizza.'],
    ['Wetlands protect us from floods.', 'They soak up water like a sponge.', 'They also filter pollution from the water.', 'My cousin lives in Calgary.'],
    ['Reading every day builds vocabulary.', 'Readers meet words they rarely hear in speech.', 'Over time, those words appear in their own writing.', 'The library has new carpets.'],
    ['Bees are vital to farms.', 'They pollinate crops like apples and blueberries.', 'Without them, harvests would shrink.', 'My brother is afraid of spiders.'],
    ['Our school should start a recycling club.', 'Members could sort bottles at lunch.', 'The money from deposits could pay for trips.', 'Basketball tryouts are next week.'],
    ['The Northwest Passage was hard to find.', 'Thick sea ice blocked ships for most of the year.', 'Many explorers turned back or were lost.', 'Penguins live in the Southern Hemisphere.'],
    ['Learning a second language has many benefits.', 'It helps you connect with more people.', 'It can also sharpen your memory.', 'I got a new backpack last week.'],
    ['Winter camping takes careful planning.', 'You need a sleeping bag rated for the cold.', 'You also need a stove to melt snow for water.', 'My sister just learned to drive.'],
    ['Volunteering helps both the helper and the community.', 'Food banks rely on volunteers to sort donations.', 'Volunteers often gain skills and confidence.', 'My favourite movie came out in 2019.'],
    ['The Bay of Fundy has the highest tides in the world.', 'The water can rise more than 15 metres.', 'At low tide, people walk on the ocean floor.', 'Halifax has a busy airport.'],
    ['Sleep matters for learning.', 'The brain sorts memories while we sleep.', 'Tired students find it hard to focus.', 'My cousin plays the trumpet.'],
    ['Maple syrup season is short.', 'Sap only runs when nights freeze and days thaw.', 'Most farms collect sap for just a few weeks.', 'Our hockey team won on Saturday.'],
    ['Canoes were vital to the fur trade.', 'Traders paddled them across lakes and rivers.', 'Large canoes could carry tonnes of furs.', 'Ice cream comes in many flavours.'],
    ['Our class garden needs more sun.', 'The tomatoes are pale and small.', 'A spot by the south wall would get light all day.', 'The gym floor was just polished.'],
    ['City parks help people stay healthy.', 'Trails invite people to walk and cycle.', 'Green spaces also lower stress.', 'My aunt sells used cars.']];
  /* [what a reader said, the part to revise first] */
  var FEED = [['Your ending is great, but I got lost in the middle.', 'the middle'], ['The start is slow. I almost stopped reading.', 'the opening'],
    ['I loved the middle, but the ending felt sudden.', 'the ending'], ['The first paragraph did not grab me.', 'the opening'], ['Your conclusion just stops. It needs a final thought.', 'the ending'],
    ['Your second and third paragraphs repeat each other.', 'the middle'], ['I was not sure what your essay was about until page two.', 'the opening'],
    ['The last line left me confused.', 'the ending'], ['The body paragraphs need more evidence.', 'the middle']];
  var PARTS = ['the opening', 'the middle', 'the ending'];

  /* [three choppy sentences, a smooth combined sentence] */
  var CHOPPY = [['The canoe was red', 'The canoe was dented', 'The canoe floated by the dock', 'The red, dented canoe floated by the dock.'],
    ['Leila opened the door', 'Leila saw the moose', 'Leila froze', 'Leila opened the door, saw the moose and froze.'],
    ['The storm was strong', 'The storm knocked down trees', 'The storm hit at night', 'The strong storm hit at night and knocked down trees.'],
    ['The fox was hungry', 'The fox crept toward the henhouse', 'The fox stopped at the fence', 'The hungry fox crept toward the henhouse and stopped at the fence.'],
    ['Omar grabbed his skates', 'Omar ran to the rink', 'Omar laced up quickly', 'Omar grabbed his skates, ran to the rink and laced up quickly.'],
    ['The lake was calm', 'The lake was cold', 'The lake reflected the pines', 'The calm, cold lake reflected the pines.'],
    ['Grandma rolled the dough', 'Grandma cut the bannock', 'Grandma fried it in the pan', 'Grandma rolled the dough, cut the bannock and fried it in the pan.'],
    ['The bus was late', 'The bus was crowded', 'The bus smelled of wet boots', 'The late, crowded bus smelled of wet boots.'],
    ['Mei found a map', 'Mei studied the trail', 'Mei chose the shorter route', 'Mei found a map, studied the trail and chose the shorter route.'],
    ['The wind was icy', 'The wind howled', 'The wind rattled the windows', 'The icy wind howled and rattled the windows.'],
    ['The puppy was tiny', 'The puppy was muddy', 'The puppy chased the ball', 'The tiny, muddy puppy chased the ball.'],
    ['Diego wrote a draft', 'Diego read it aloud', 'Diego fixed three errors', 'Diego wrote a draft, read it aloud and fixed three errors.'],
    ['The ferry was old', 'The ferry was slow', 'The ferry crossed the strait', 'The old, slow ferry crossed the strait.'],
    ['Aiyana packed her bag', 'Aiyana checked the forecast', 'Aiyana left at dawn', 'Aiyana packed her bag, checked the forecast and left at dawn.'],
    ['The trail was steep', 'The trail was rocky', 'The trail led to the lookout', 'The steep, rocky trail led to the lookout.']];
  function choppy(c) { return c.slice(0, 3).join('. ') + '.'; }
  function low(s) { return s.replace(/^The /, 'the '); }
  function strung(c) { return c[0] + ' and ' + low(c[1]) + ' and ' + low(c[2]) + '.'; }
  var VERDICT = ['It is still three short sentences.', 'It repeats the subject again and again.', 'It is smooth: every idea, said once.'];

  /* paragraphs in a logical order: main idea, two supporting sentences, closing point */
  var ORDERED = [['Bike lanes make streets safer.', 'They separate cyclists from cars.', 'In cities that added them, crashes dropped.', 'Our town should build them on Main Street.'],
    ['Composting cuts the garbage we send away.', 'Food scraps make up much of household waste.', 'In a compost bin, they turn into rich soil.', 'Every family can start with one small bin.'],
    ['Our library should open on Sundays.', 'Many families are busy on weekdays.', 'A Sunday opening would let them borrow books together.', 'The council should fund Sunday hours this spring.'],
    ['Snowshoe hares are built for winter.', 'Their fur turns white to match the snow.', 'Their big back feet keep them from sinking.', 'These features help them survive until spring.'],
    ['Planting trees cools our streets.', 'Leaves shade the pavement from the sun.', 'Trees also release water that cools the air.', 'Every new street should include trees.'],
    ['An inuksuk is a powerful symbol.', 'Inuit built these stone figures to guide travellers.', 'Some marked good places to hunt or fish.', 'Today, many people see them as signs of welcome.'],
    ['Our school needs more water fountains.', 'There are only two for 600 students.', 'Long lines form after every gym class.', 'Two new fountains would solve the problem.'],
    ['Electric buses could help our city.', 'They make no exhaust on the street.', 'They are also much quieter than diesel buses.', 'The city should test one on a busy route.'],
    ['Loons are skilled divers.', 'Their solid bones help them sink below the surface.', 'They can stay underwater for about a minute.', 'This makes them excellent at catching fish.'],
    ['Board games bring families together.', 'Players talk and laugh across the table.', 'Children also practise taking turns and counting.', 'Try a game night once a week.'],
    ['The Trans-Canada Highway links the country.', 'It runs from Newfoundland to British Columbia.', 'Trucks use it to carry goods between provinces.', 'Without it, travel across Canada would be much harder.'],
    ['Our town should ban plastic bags.', 'Bags blow into rivers and harm wildlife.', 'Reusable bags are cheap and last for years.', 'A ban would keep our river clean.'],
    ['Volcanoes can build new land.', 'Lava cools and hardens into rock.', 'Over many years, layers of rock form islands.', 'Hawaii was formed this way.'],
    ['Learning to cook is a useful skill.', 'You can make healthy meals for yourself.', 'You also save money by eating out less.', 'Start with one simple recipe this week.'],
    ['The Prairies are ideal for growing wheat.', 'The land is flat and the soil is rich.', 'Long summer days give crops plenty of sun.', 'That is why Canada exports so much grain.']];

  /* [sentence with a sound-alike error a spell-checker misses, the wrong word, the right word, the fixed sentence] */
  var HOMO = [['Their going to the game after school.', 'Their', 'They' + AP + 're', 'They' + AP + 're going to the game after school.'],
    ['The dog wagged it' + AP + 's tail.', 'it' + AP + 's', 'its', 'The dog wagged its tail.'], ['The new rule will effect everyone.', 'effect', 'affect', 'The new rule will affect everyone.'],
    ['We walked passed the school.', 'passed', 'past', 'We walked past the school.'], ['Your welcome to join us.', 'Your', 'You' + AP + 're', 'You' + AP + 're welcome to join us.'],
    ['The team lost there best player.', 'there', 'their', 'The team lost their best player.'], ['I would rather walk then take the bus.', 'then', 'than', 'I would rather walk than take the bus.'],
    ['The soup is to hot.', 'to', 'too', 'The soup is too hot.'], ['Who' + AP + 's backpack is this?', 'Who' + AP + 's', 'Whose', 'Whose backpack is this?'],
    ['We could here the loons calling.', 'here', 'hear', 'We could hear the loons calling.'], ['Please except my apology.', 'except', 'accept', 'Please accept my apology.'],
    ['The principal said we can' + AP + 't loose our tickets.', 'loose', 'lose', 'The principal said we can' + AP + 't lose our tickets.'],
    ['Its going to snow tonight.', 'Its', 'It' + AP + 's', 'It' + AP + 's going to snow tonight.'], ['I scored and than we won.', 'than', 'then', 'I scored and then we won.'],
    ['The bear was write behind us.', 'write', 'right', 'The bear was right behind us.']];
  function bare(s) { return s.replace(/[.?!]$/, '').split(' '); }

  /* [sentence with an error, the kind of error, the corrected sentence] */
  var ERR = [['The students was late for class.', 'grammar', 'The students were late for class.'], ['Each of the players have a jersey.', 'grammar', 'Each of the players has a jersey.'],
    ['Me and Kai went to the store.', 'grammar', 'Kai and I went to the store.'], ['She don' + AP + 't like olives.', 'grammar', 'She doesn' + AP + 't like olives.'],
    ['The box of apples are heavy.', 'grammar', 'The box of apples is heavy.'], ['Where are you going.', 'punctuation', 'Where are you going?'],
    ['My favourite subjects are, math and art.', 'punctuation', 'My favourite subjects are math and art.'], ['We visited Halifax Moncton and Fredericton.', 'punctuation', 'We visited Halifax, Moncton and Fredericton.'],
    ['What time does the game start.', 'punctuation', 'What time does the game start?'], ['Wow that was close!', 'punctuation', 'Wow, that was close!'],
    ['We recieved the parcel today.', 'spelling', 'We received the parcel today.'], ['The experement worked on the first try.', 'spelling', 'The experiment worked on the first try.'],
    ['It was a beautifull morning.', 'spelling', 'It was a beautiful morning.'], ['We went to the libary after school.', 'spelling', 'We went to the library after school.'],
    ['The goverment announced a new park.', 'spelling', 'The government announced a new park.']];
  var KINDS = ['spelling', 'punctuation', 'grammar'];

  /* [what you need, the word-processing tool] */
  var TOOLS = [['A classmate will suggest changes without erasing your words.', 'track changes and comments'], ['Your teacher wants to leave notes beside your paragraphs.', 'track changes and comments'],
    ['You used one word too many times.', 'a thesaurus'], ['You need a stronger word than "good".', 'a thesaurus'],
    ['Every heading should look the same.', 'heading styles'], ['You want headings that stand out in a long report.', 'heading styles'],
    ['Your essay must be under 500 words.', 'word count'], ['You need to know if your summary is short enough.', 'word count'],
    ['You want to catch typing mistakes quickly.', 'spell-check'], ['Some words have red underlines.', 'spell-check'],
    ['You deleted a paragraph yesterday and want it back.', 'version history'], ['You want to see an earlier draft.', 'version history'],
    ['You need to list your sources in the right format.', 'the citation tool'], ['Your list of sources needs the same format for every book.', 'the citation tool'],
    ['You spelled a character' + AP + 's name wrong 20 times.', 'find and replace']];
  var TOOLSET = ['track changes and comments', 'a thesaurus', 'heading styles', 'word count', 'spell-check', 'version history', 'the citation tool', 'find and replace'];

  /* ---------- style ---------- */
  function style(lv) {
    var s = R.pick(STYLE);
    return Q.one(lvQ(lv, ['Which sentence suits <b>' + s[0] + '</b>?', 'You are writing <b>' + s[0] + '</b>. Which sentence fits?', 'Which sentence has the right style for <b>' + s[0] + '</b>?']),
      s[1], [s[2]].concat(lv > 1 ? R.some(others(STYLE, s), lv > 2 ? 2 : 1).map(function (x) { return x[2]; }) : []), { prompt: 'Who is reading it, and why?',
      hint: 'Match the words and tone to the form, the audience and the purpose.', explain: W.sent(s[1]), meta: { k: 'g8-style', form: s[0] } });
  }
  function matchStyle() {
    return { q: 'Match each sentence to the text it suits.', type: 'match', pairs: R.some(STYLE, 3).map(function (s) { return [s[1], s[0]]; }), hint: 'Listen to the tone of each sentence.',
      explain: 'Style changes with the form, audience and purpose.', meta: { k: 'g8-match-style' } };
  }
  function styleTf() {
    var s = R.pick(STYLE), shown = R.pick([s[1], s[2], R.pick(others(STYLE, s))[1]]);
    return tf('Does this sentence suit <b>' + s[0] + '</b>?', W.sent(shown), shown === s[1], ['The words and tone must fit the form and the reader.', 'Any sentence fits any text.'],
      { hint: 'Picture the reader.', explain: W.sent(s[1]), meta: { k: 'g8-style-tf', form: s[0], s: shown } });
  }
  function styleWhich() {
    var s = R.pick(STYLE);
    return Q.tiles('Which text does this sentence suit?', s[0], R.some(others(STYLE, s), 2).map(function (x) { return x[0]; }), { fig: W.sent(s[1]),
      hint: 'Formal or relaxed? Exact or vivid?', explain: s[0] + '.', meta: { k: 'g8-style-which', s: s[1] } });
  }

  /* ---------- other perspectives ---------- */
  function counter(lv) {
    var c = R.pick(COUNTER);
    return Q.one(lvQ(lv, ['Which sentence <b>acknowledges another perspective</b>?', 'Which sentence is fair to people who disagree?', 'Which sentence would make a reader who disagrees keep reading?']),
      c[0], c[1].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [R.pick(others(COUNTER, c))[1][0]] : []), { hint: 'It fairly describes what someone who disagrees might think.',
      explain: 'Acknowledging other views makes your argument fairer and more convincing.', meta: { k: 'g8-counter' } });
  }
  function counterTf() {
    var c = R.pick(COUNTER), shown = R.int(0, 1) ? c[0] : R.pick(c[1]);
    return tf('Does this sentence <b>acknowledge another view</b>?', W.sent(shown), shown === c[0], ['It must fairly describe what others think.', 'Any strong sentence acknowledges other views.'],
      { hint: 'Does it describe the other side fairly?', explain: W.sent(c[0]), meta: { k: 'g8-counter-tf', s: shown } });
  }
  function pickCounter(lv) {
    var cs = R.some(COUNTER, 4);
    return Q.all('Pick every sentence that is <b>fair</b> to the other side.', [cs[0][0], cs[1][0]], [R.pick(cs[2][1]), R.pick(cs[3][1])].slice(0, lv > 1 ? 2 : 1).concat(lv > 1 ? [cs[0][1][0]] : []), {
      hint: 'Fair: it names what others think without mocking.', explain: 'Words like "some" and "others argue" show respect for other views.', meta: { k: 'g8-pick-counter' } });
  }
  function counterReact() {
    var c = R.pick(COUNTER), shown = R.int(0, 1) ? c[0] : R.pick(c[1]);
    return Q.one('A reader who <b>disagrees</b> reads this. How might they react?', shown === c[0] ? REACT[0] : REACT[1], others(REACT, shown === c[0] ? REACT[0] : REACT[1]), {
      fig: W.sent(shown), hint: 'Is the other side treated fairly?', explain: 'Fair sentences keep readers who disagree listening.', meta: { k: 'g8-counter-react', s: shown } });
  }

  /* ---------- loaded words ---------- */
  function neutral(lv) {
    var l = R.pick(LOADED);
    return Q.one(lvQ(lv, ['Which is the more <b>neutral</b> way to say it?', 'Which sentence lets the reader judge for themselves?', 'Which sentence has no loaded words?']),
      l[1], [l[0]].concat(lv > 1 ? [R.pick(others(LOADED, l))[0]] : []), { hint: 'Look for words that insult or exaggerate.', explain: W.sent(l[1]), meta: { k: 'g8-neutral' } });
  }
  function loadedWord() {
    var l = R.pick(LOADED), ws = bare(l[0]);
    return { q: 'Tap the <b>loaded</b> word that shows bias.', fig: W.sent(l[0]), type: 'tap', tiles: ws, answer: ws.indexOf(l[2]), hint: 'Which word judges instead of describing?',
      explain: '<b>' + l[2] + '</b> is a loaded word.', meta: { k: 'g8-loaded' } };
  }
  function loadedTf() {
    var l = R.pick(LOADED), shown = R.int(0, 1) ? l[1] : l[0];
    return tf('Is this sentence <b>neutral</b>?', W.sent(shown), shown === l[1], ['Neutral sentences describe without judging.', 'Strong words always make writing neutral.'],
      { hint: 'Is there a word that judges?', explain: W.sent(l[1]), meta: { k: 'g8-loaded-tf', s: shown } });
  }
  function pickNeutral(lv) {
    var ls = R.some(LOADED, 4);
    return Q.all('Pick every <b>neutral</b> sentence.', [ls[0][1], ls[1][1]], [ls[2][0], ls[3][0]].slice(0, lv > 1 ? 2 : 1).concat(lv > 1 ? [ls[0][0]] : []), {
      hint: 'Neutral: no word that insults or praises too much.', explain: 'Neutral sentences let readers decide.', meta: { k: 'g8-pick-neutral' } });
  }

  /* ---------- focus ---------- */
  function paragraph(p) { var lines = p.slice(0, 3), at = R.int(1, 3); lines.splice(at, 0, p[3]); return lines; }
  function offTopic(lv) {
    var p = R.pick(PARA), lines = paragraph(p);
    return Q.one(lvQ(lv, ['Which sentence should be <b>deleted</b>?', 'Which sentence is off topic?', 'Which sentence does not support the topic sentence?']), p[3], [p[1], p[2]], {
      fig: W.passage('', lines), hint: 'Which sentence does not support the first one?', explain: W.sent(p[3]) + ' is off topic.', meta: { k: 'g8-off-topic' } });
  }
  function offTf() {
    var p = R.pick(PARA), shown = R.pick([p[1], p[2], p[3]]);
    return tf('Does the second sentence belong in this paragraph?', W.sent(p[0]) + W.means('write', shown), shown !== p[3], ['Every sentence must support the topic sentence.', 'Any interesting sentence can stay.'],
      { hint: 'Does it support the first sentence?', explain: shown === p[3] ? 'Off topic: delete it.' : 'It supports the topic.', meta: { k: 'g8-off-tf', s: shown } });
  }
  function topicPick() {
    var p = R.pick(PARA);
    return Q.one('Which is the <b>topic sentence</b>?', p[0], [p[1], p[2]], { hint: 'It states the main idea the others support.', explain: W.sent(p[0]), meta: { k: 'g8-topic-sentence' } });
  }
  function feedback() {
    var f = R.pick(FEED);
    return Q.tiles('A reader says: <b>' + f[0] + '</b> What should you revise first?', f[1], others(PARTS, f[1]), {
      hint: 'Use the feedback that points to a problem.', explain: 'Revise ' + f[1] + '. Keep what worked.', meta: { k: 'g8-feedback', said: f[0] } });
  }

  /* ---------- combining ---------- */
  function combine(lv) {
    var c = R.pick(CHOPPY), other = R.pick(others(CHOPPY, c));
    return Q.one(lvQ(lv, ['Which revision combines these sentences <b>best</b>?', 'Which version keeps every idea and says the subject once?', 'Which revision reads most smoothly?']),
      c[3], [strung(c)].concat(lv > 1 ? [other[3]] : []), { fig: W.sent(choppy(c)), hint: 'Keep every idea, but say the subject once.', explain: W.sent(c[3]), meta: { k: 'g8-combine-rev', s: choppy(c) } });
  }
  function combineTf() {
    var c = R.pick(CHOPPY), shown = R.int(0, 1) ? c[3] : strung(c);
    return tf('Is this a good revision?', W.sent(choppy(c)) + W.means('write', shown), shown === c[3], ['A good revision keeps every idea and says the subject once.', 'Joining with "and" always makes writing smooth.'],
      { hint: 'Count how often the subject appears.', explain: W.sent(c[3]), meta: { k: 'g8-combine-tf', s: choppy(c), shown: shown } });
  }
  function pickSmooth(lv) {
    var cs = R.some(CHOPPY, 4);
    return Q.all('Pick every revision that says the subject only <b>once</b>.', [cs[0][3], cs[1][3]], [strung(cs[2]), strung(cs[3])].slice(0, lv > 1 ? 2 : 1), {
      hint: 'Look for the same word again and again.', explain: 'Smooth sentences say the subject once.', meta: { k: 'g8-pick-smooth' } });
  }
  function combineVerdict() {
    var c = R.pick(CHOPPY), i = R.int(0, 2), shown = [choppy(c), strung(c), c[3]][i];
    return Q.one('What is true of this version?', VERDICT[i], others(VERDICT, VERDICT[i]), { fig: W.sent(shown), hint: 'Count the sentences. Count the subject.', explain: W.sent(c[3]), meta: { k: 'g8-combine-verdict', s: shown } });
  }

  /* ---------- order ---------- */
  function reorder(lv) {
    var o = R.pick(ORDERED);
    return { q: lv > 1 ? 'Put the sentences in a logical order.' : 'Reorganize this paragraph so it flows.', type: 'order', items: o, first: 'First', last: 'Last',
      hint: 'Main idea first, then support, then the closing point.', explain: o.join(' '), meta: { k: 'g8-reorder' } };
  }
  function firstSentence(lv) {
    var o = R.pick(ORDERED);
    return Q.one(lv > 1 ? 'Which sentence states the main idea, so it goes first?' : 'Which sentence should come <b>first</b>?', o[0], R.shuffle(o.slice(1)).slice(0, lv > 1 ? 3 : 2), {
      hint: 'The main idea comes first.', explain: W.sent(o[0]), meta: { k: 'g8-first-sentence' } });
  }
  function lastSentence(lv) {
    var o = R.pick(ORDERED);
    return Q.one(lv > 1 ? 'Which sentence makes the best closing?' : 'Which sentence should come <b>last</b>?', o[3], R.shuffle(o.slice(0, 3)).slice(0, lv > 1 ? 3 : 2), {
      hint: 'The closing point wraps up or calls for action.', explain: W.sent(o[3]), meta: { k: 'g8-last-sentence' } });
  }
  function orderTf() {
    var o = R.pick(ORDERED), right = R.int(0, 1) === 1, shown = right ? o : [o[1], o[0], o[3], o[2]];
    return tf('Is this paragraph in a logical order?', W.passage('', shown), right, ['Main idea first, support next, the closing point last.', 'Any order works if the sentences are good.'],
      { hint: 'Does it start with the main idea?', explain: W.passage('', o), meta: { k: 'g8-order-tf' } });
  }

  /* ---------- sound-alike words ---------- */
  function homophone(lv) {
    var h = R.pick(HOMO), ws = bare(h[0]);
    return { q: lvQ(lv, ['A spell-checker missed the error. Tap the wrong word.', 'Every word is spelled right, but one is the wrong word. Tap it.', 'Tap the word to fix.']), fig: W.sent(h[0]), type: 'tap', tiles: ws,
      answer: ws.indexOf(h[1]), prompt: 'Is each word the right word?', hint: 'Check words that sound alike: their, there, they' + AP + 're; its, it' + AP + 's; affect, effect.',
      explain: W.sent(h[3]), meta: { k: 'g8-homophone', s: h[0] } };
  }
  function homoFix(lv) {
    var h = R.pick(HOMO), other = R.pick(others(HOMO, h));
    return Q.one('Which sentence is correct?', h[3], [h[0]].concat(lv > 1 ? [other[0]] : []), { hint: 'Read it aloud and check each sound-alike word.', explain: W.sent(h[3]), meta: { k: 'g8-homo-fix' } });
  }
  function homoTf() {
    var h = R.pick(HOMO), shown = R.int(0, 1) ? h[3] : h[0];
    return tf('Is every word in this sentence the right word?', W.sent(shown), shown === h[3], ['Sound-alike words have different meanings.', 'If the spell-checker is happy, it is right.'],
      { hint: 'Check each sound-alike word.', explain: W.sent(h[3]), meta: { k: 'g8-homo-tf', s: shown } });
  }
  function homoPick() {
    var h = R.pick(HOMO);
    return Q.tiles('Which word fits?', h[2], [h[1]], { fig: W.sent(h[0].replace(h[1], W.gap())), hint: 'Say it long: they' + AP + 're = they are, it' + AP + 's = it is.', explain: W.sent(h[3]), meta: { k: 'g8-homo-pick', s: h[0] } });
  }

  /* ---------- kinds of errors ---------- */
  function errKind(lv) {
    var e = R.pick(ERR);
    return Q.tiles(lv > 1 ? 'Spelling, punctuation or grammar: which error is this?' : 'What kind of error is this?', e[1], others(KINDS, e[1]), { fig: W.sent(e[0]),
      hint: 'A misspelled word? A wrong mark? Words that do not agree?', explain: W.sent(e[2]), meta: { k: 'g8-err-kind', s: e[0] } });
  }
  function errFix(lv) {
    var e = R.pick(ERR);
    return Q.one('Which sentence is <b>correct</b>?', e[2], [e[0]].concat(lv > 1 ? [R.pick(others(ERR, e))[0]] : []), { hint: 'Check spelling, punctuation and grammar.', explain: W.sent(e[2]), meta: { k: 'g8-err-fix' } });
  }
  function errTf() {
    var e = R.pick(ERR), shown = R.int(0, 1) ? e[2] : e[0];
    return tf('Is this sentence correct?', W.sent(shown), shown === e[2], ['Check spelling, punctuation and grammar in separate reads.', 'A quick glance catches every error.'],
      { hint: 'One read for each kind of error.', explain: W.sent(e[2]), meta: { k: 'g8-err-tf', s: shown } });
  }
  function errMatch() {
    return { q: 'Match each sentence to its kind of error.', type: 'match', pairs: KINDS.map(function (k) { return [R.pick(ERR.filter(function (e) { return e[1] === k; }))[0], k]; }),
      hint: 'A misspelled word? A wrong mark? Words that do not agree?', explain: 'Edit in three passes: spelling, punctuation, grammar.', meta: { k: 'g8-err-match' } };
  }

  /* ---------- tools ---------- */
  function tool(lv) {
    var t = R.pick(TOOLS);
    return Q.one(lvQ(lv, ['Which word-processing tool helps?', 'Which tool would you use?', 'Which tool solves this problem fastest?']), t[1], R.some(others(TOOLSET, t[1]), lv > 1 ? 3 : 2), {
      fig: W.means('screen', t[0]), hint: 'Match the tool to the job.', explain: t[1] + '.', meta: { k: 'g8-tool', need: t[0] } });
  }
  function toolTf() {
    var t = R.pick(TOOLS), said = R.int(0, 1) ? t[1] : R.pick(others(TOOLSET, t[1]));
    return tf(Q.name() + ' says: use <b>' + said + '</b>.', W.means('screen', t[0]), said === t[1], ['Each tool does one job well.', 'Any tool fixes any problem.'],
      { hint: 'What is the job?', explain: t[1] + '.', meta: { k: 'g8-tool-tf', need: t[0], said: said } });
  }
  function toolMatch() {
    var ts = R.some(TOOLSET.slice(0, 7), 3);
    return { q: 'Match each job to the tool.', type: 'match', pairs: ts.map(function (x) { return [R.pick(TOOLS.filter(function (t) { return t[1] === x; }))[0], x]; }),
      hint: 'Match the tool to the job.', explain: 'Each tool does one job well.', meta: { k: 'g8-tool-match' } };
  }
  function toolWhen(lv) {
    var t = R.pick(TOOLS);
    return Q.one('When would you use <b>' + t[1] + '</b>?', t[0], R.some(TOOLS.filter(function (x) { return x[1] !== t[1]; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'What job does this tool do?', explain: W.sent(t[0]), meta: { k: 'g8-tool-when', tool: t[1] } });
  }

  var C0 = COUNTER[0], C3 = COUNTER[3], L0 = LOADED[0], L12 = LOADED[12], P0 = PARA[0], P1 = PARA[1], CH0 = CHOPPY[0], CH1 = CHOPPY[1], O0 = ORDERED[0], O1 = ORDERED[1];
  Atlas.register('writing', {
    full: true,
    lessons: [{
      id: 'voice', title: 'Voice and perspective', sub: 'Sound right for the reader, and be fair.',
      concepts: [
        { slug: 'style', title: 'Fit your style to the form and reader', exp: ['D2.3'], skill: 'style',
          model: [
            step(W.sent(STYLE[0][1]), 'A lab report: exact and impersonal.'),
            step(W.sent(STYLE[0][2]), 'Too casual for a report.'),
            step(W.sent(STYLE[1][1]), 'A message to a friend: relaxed.'),
            step(W.sent(STYLE[1][2]), 'Too stiff for a friend.'),
            step(W.sent(STYLE[3][1]), 'Suspense: sounds you can almost hear.')
          ],
          guided: [function () { return style(1); }, styleTf, styleWhich],
          check: [function () { return style(2); }, matchStyle, styleTf, styleWhich, function () { return style(3); }],
          coach: '<p>Your voice is still yours in every form: the words you choose, what you notice, how you see things. The style adjusts around it.</p>',
          mistake: '<p>Writing a formal piece in a texting style, or a story like a textbook.</p>' },
        { slug: 'perspective', title: 'Acknowledge other views', exp: ['D2.4'], skill: 'perspective',
          model: [
            step(W.sent(C0[1][0]), 'Ignores anyone who disagrees.'),
            step(W.sent(C0[0]), 'Names a real concern, fairly.'),
            step(W.sent(C3[1][1]), 'Mocks the other side.'),
            step(W.sent(C3[0]), 'Some… worry: respectful.')
          ],
          guided: [function () { return counter(1); }, counterTf, counterReact],
          check: [function () { return counter(2); }, function () { return pickCounter(2); }, counterTf, counterReact, function () { return counter(3); }],
          coach: '<p>Ask: "Who might read this and disagree? What would they say?" Then answer that in the writing.</p>',
          mistake: '<p>Mocking the other side. Readers who disagree stop listening.</p>' },
        { slug: 'neutral', title: 'Loaded words reveal bias', exp: ['D2.4'], skill: 'bias',
          model: [
            step(W.sent(hl(L0[0], L0[2])), 'It judges.'),
            step(W.sent(L0[1]), 'Neutral: a fact the reader can judge.'),
            step(W.sent(hl(L12[0], L12[2])), 'Another judging word.'),
            step(W.sent(L12[1]), 'Describes what happened.')
          ],
          guided: [function () { return neutral(1); }, loadedWord, loadedTf],
          check: [function () { return neutral(2); }, loadedWord, function () { return pickNeutral(2); }, loadedTf, function () { return neutral(3); }],
          coach: '<p>Reread a draft looking only for loaded words. Ask how a reader who disagrees would react to each.</p>',
          mistake: '<p>Thinking strong insults make an argument stronger.</p>' }
      ]
    }, {
      id: 'revise', title: 'Revising', sub: 'Delete, combine, reorganize, and use feedback.',
      concepts: [
        { slug: 'focus', title: 'Cut what is off topic', exp: ['D2.5'], skill: 'focus',
          model: [
            step(W.passage('', [P0[0], P0[1], P0[3], P0[2]]), 'Does each sentence support the first?'),
            step(W.sent('<s>' + P0[3] + '</s>'), 'No: delete it.'),
            step(W.passage('', [P1[0], P1[3], P1[1], P1[2]]), 'Check each one again.'),
            step(W.sent('<s>' + P1[3] + '</s>'), 'Nothing to do with wetlands.')
          ],
          guided: [function () { return offTopic(1); }, offTf, topicPick],
          check: [function () { return offTopic(2); }, feedback, offTf, topicPick, function () { return offTopic(3); }],
          coach: '<p>Revising is about ideas and order; editing is about errors. Revise first.</p>',
          mistake: '<p>Keeping a sentence because it took effort to write.</p>' },
        { slug: 'combine', title: 'Combine choppy sentences', exp: ['D2.5'], skill: 'combine',
          model: [
            step(W.sent(choppy(CH0)), 'The same subject three times.'),
            step(W.sent(strung(CH0)), 'Joined with "and": still repetitive.'),
            step(W.sent(CH0[3]), 'Every idea, said once.'),
            step(W.sent(choppy(CH1))),
            step(W.sent(CH1[3]), 'One subject, three actions.')
          ],
          guided: [function () { return combine(1); }, combineTf, combineVerdict],
          check: [function () { return combine(2); }, function () { return pickSmooth(2); }, combineTf, combineVerdict, function () { return combine(3); }],
          coach: '<p>Read the draft aloud. Choppy sections sound like a list; that is where to combine.</p>',
          mistake: '<p>Combining so much that one sentence carries too many ideas.</p>' },
        { slug: 'order', title: 'Reorganize so ideas flow', exp: ['D2.5'], skill: 'reorder',
          model: [
            step(W.sent(O0[0]), 'The main idea.'),
            step(W.sent(O0[1]) + W.sent(O0[2]), 'Support.'),
            step(W.sent(O0[3]), 'The closing point.'),
            step(W.sent(O1[0]), 'Main idea first again.'),
            step(W.sent(O1[3]), 'It ends with action.')
          ],
          guided: [function () { return firstSentence(1); }, function () { return lastSentence(1); }, function () { return reorder(1); }],
          check: [function () { return reorder(2); }, orderTf, function () { return firstSentence(2); }, function () { return lastSentence(2); }, function () { return reorder(2); }],
          coach: '<p>Cut a printed draft into strips, one sentence each, and rearrange them on the table.</p>',
          mistake: '<p>Putting the main idea at the end, where the reader meets it too late.</p>' }
      ]
    }, {
      id: 'edit', title: 'Editing', sub: 'Find what a spell-checker misses, and use your tools.',
      concepts: [
        { slug: 'homophones', title: 'A spell-checker cannot catch every error', exp: ['D2.6'], skill: 'homophones',
          model: [
            step(W.sent(hl(HOMO[0][0], 'Their')), 'Spelled right. Wrong word.'),
            step(W.sent(HOMO[0][3]), 'They' + AP + 're = they are.'),
            step(W.sent(hl(HOMO[1][0], 'it' + AP + 's')), 'it' + AP + 's = it is. Does "it is tail" make sense?'),
            step(W.sent(HOMO[1][3]), 'its = belonging to it.')
          ],
          guided: [function () { return homophone(1); }, homoPick, function () { return homoFix(1); }],
          check: [function () { return homophone(2); }, homoTf, function () { return homoFix(2); }, homoPick, function () { return homophone(3); }],
          coach: '<p>Teach the "say it long" test: read "they' + AP + 're" as "they are". If it does not fit, it is the wrong word.</p>',
          mistake: '<p>Trusting a spell-checker completely.</p>' },
        { slug: 'errors', title: 'Spelling, punctuation or grammar?', exp: ['D2.6'], skill: 'errors',
          model: [
            step(W.sent(ERR[10][0]), 'Spelling: received.'),
            step(W.sent(ERR[5][0]), 'Punctuation: it needs a question mark.'),
            step(W.sent(ERR[0][0]), 'Grammar: the students <b>were</b>.'),
            step(W.sent(ERR[7][2]), 'Punctuation: commas in a list.'),
            step(W.sent(ERR[2][2]), 'Grammar: Kai and I.')
          ],
          guided: [function () { return errKind(1); }, errTf, function () { return errFix(1); }],
          check: [function () { return errKind(2); }, errMatch, errTf, function () { return errFix(2); }, function () { return errKind(2); }],
          coach: '<p>Edit in separate passes: one read for spelling, one for punctuation, one for grammar. It catches more.</p>',
          mistake: '<p>Trying to catch everything in one read.</p>' },
        { slug: 'tools', title: 'Use word-processing tools well', exp: ['D2.2', 'D2.6'], skill: 'tools',
          model: [
            step(W.means('screen', 'track changes and comments'), 'Feedback without erasing your words.'),
            step(W.means('screen', 'heading styles'), 'A consistent format.'),
            step(W.means('screen', 'word count'), 'Stay within a limit.'),
            step(W.means('screen', 'version history'), 'Get back an earlier draft.')
          ],
          guided: [function () { return tool(1); }, toolTf, function () { return toolWhen(1); }],
          check: [function () { return tool(2); }, toolMatch, toolTf, function () { return toolWhen(2); }, function () { return tool(3); }],
          coach: '<p>Practise the tools on a real assignment: share a draft, turn on track changes, and accept or reject each suggestion together.</p>',
          mistake: '<p>Accepting every grammar-checker suggestion without thinking.</p>' }
      ]
    }],
    practice: [
      { id: 'style', name: 'Style for the form and reader', code: 'D2.3', gen: style },
      { id: 'perspective', name: 'Acknowledging other views', code: 'D2.4', gen: counter },
      { id: 'bias', name: 'Loaded and neutral words', code: 'D2.4', gen: neutral },
      { id: 'focus', name: 'Staying on topic', code: 'D2.5', gen: offTopic },
      { id: 'combine', name: 'Combining sentences', code: 'D2.5', gen: combine },
      { id: 'reorder', name: 'Ordering ideas', code: 'D2.5', gen: reorder },
      { id: 'homophones', name: 'Sound-alike words', code: 'D2.6', gen: homophone },
      { id: 'errors', name: 'Spelling, punctuation and grammar', code: 'D2.6', gen: errKind },
      { id: 'tools', name: 'Word-processing tools', code: 'D2.2, D2.6', gen: tool }
    ],
    tasks: [
      { id: 'draft', title: 'Draft a complex text', code: 'D2.1', pic: W.icon('write'), say: 'Write a draft: persuasive, informational or a story. Cite any sources you use.', write: true,
        run: ['The child chooses a form and a real audience, using their plan from the Planning chapter.', 'They write a full draft. Any facts or quotations from research are cited.', 'Remind them a draft is meant to be changed.'],
        rubric: ['A few unconnected sentences.', 'A draft with some structure; sources not cited.', 'A complete draft that suits its form, with sources cited.', 'A well-developed draft with a clear purpose, strong structure and cited sources.'] },
      { id: 'cursive', title: 'Cursive and word processing', code: 'D2.2', pic: W.icon('write'), say: 'Copy a paragraph in cursive. Then type it, and format it with headings.',
        run: ['The child writes a short paragraph in cursive, in their own style, legibly and fluently.', 'They type the same paragraph, add a heading style, check the word count, and use spell-check thoughtfully.'],
        rubric: ['Cursive is hard to read; little use of tools.', 'Mostly legible; uses some tools.', 'Fluent, legible cursive, and uses several word-processing tools well.', 'Fluent cursive with a personal style; uses tools to improve accuracy and effect.'] },
      { id: 'final-copy', title: 'Produce a final copy', code: 'D3.1', pic: W.icon('screen'), say: 'Make a final copy. Choose fonts, images and layout that suit your purpose.',
        run: ['The child turns their revised draft into a final copy, on paper or with a design tool.', 'Ask: "How does your layout, font and image choice help your purpose?"'],
        rubric: ['Unfinished or hard to read.', 'Finished, with little thought about design.', 'Polished, with design choices that suit the purpose.', 'Polished and striking; every design choice supports the intended effect.'] },
      { id: 'publish', title: 'Publish or present it', code: 'D3.2', pic: W.icon('people'), say: 'Share your work with a real audience. Then explain what worked.',
        run: ['Help the child share their work: post it on a class site, read it aloud, submit it to a school newsletter, or present it.', 'Afterward, ask: "Which choices helped your message come across?"'],
        rubric: ['Not shared yet.', 'Shared, with little reflection.', 'Shared with an audience, and explains which choices helped.', 'Shared confidently, and evaluates choices with specific examples.'] },
      { id: 'reflect', title: 'Looking back on my writing', code: 'D3.3', pic: W.icon('star'), say: 'What did you learn at each stage: planning, drafting, revising, publishing?', write: true,
        run: ['The child looks back at their plan, draft and final copy.', 'They write what they learned at each stage, which tools helped, and one step to improve next time.'],
        rubric: ['No reflection.', 'Comments on one stage.', 'Reflects on each stage and sets a next step.', 'Insightful reflection on each stage, tools and topics, with a specific plan to grow.'] }
    ]
  });

  Q.shapes('writing', {
    style: [[1, 'true-false', styleTf], [1, 'which-text', styleWhich], [2, 'match', matchStyle]],
    perspective: [[1, 'true-false', counterTf], [1, 'reaction', counterReact], [2, 'pick', pickCounter]],
    bias: [[1, 'loaded', loadedWord], [1, 'true-false', loadedTf], [2, 'pick', pickNeutral]],
    focus: [[1, 'true-false', offTf], [1, 'topic-sentence', topicPick], [1, 'feedback', feedback]],
    combine: [[1, 'true-false', combineTf], [1, 'verdict', combineVerdict], [2, 'pick', pickSmooth]],
    reorder: [[1, 'first', firstSentence], [1, 'last', lastSentence], [2, 'true-false', orderTf]],
    homophones: [[1, 'fix', homoFix], [1, 'true-false', homoTf], [1, 'which-word', homoPick]],
    errors: [[1, 'fix', errFix], [1, 'true-false', errTf], [2, 'match', errMatch]],
    tools: [[1, 'true-false', toolTf], [1, 'when', toolWhen], [2, 'match', toolMatch]]
  });
})();
