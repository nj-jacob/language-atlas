/* Grade 7 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  function node(x, y, t) { return '<text class="l" x="' + x + '" y="' + y + '" text-anchor="middle">' + t + '</text>'; }
  /* a longer poem, one block per verse ('' starts a new verse), so the verses can flow into both columns */
  function verses(lines) { return lines.join('\n').split('\n\n').map(function (v) { return { poem: v.split('\n') }; }); }
  function place(x, y, name, dx, dy, end) { return '<circle class="dot" cx="' + x + '" cy="' + y + '" r="2.6"/><text class="n" x="' + (x + dx) + '" y="' + (y + dy) + '"' + (end ? ' text-anchor="end"' : '') + '>' + name + '</text>'; }

  P.add({
    id: 'g7-voyageur', subject: 'history', form: 'Diary',
    title: 'The Paddle and the Portage',
    deck: 'From the diary of Étienne Brisebois, voyageur, 1794 (a made-up diary based on real journeys)',
    hero: {
      photo: 'g7-voyageurs-hopkins.jpg', credit: 'Painting: Frances Anne Hopkins, 1869, public domain, Library and Archives Canada', focus: '50% 55%',
      tall: 190,
      cap: '<i>Canoe Manned by Voyageurs Passing a Waterfall</i>, painted by Frances Anne Hopkins, who travelled with the canoes.'
    },
    body: [
      { h: 'May 8 · Lachine' },
      'Today I signed my contract with the fur company: three years, for wages that will help Maman and my four sisters. Now I am a <b>voyageur</b>. Our canoe is more than ten metres long, made of birchbark sewn with spruce root and sealed with spruce gum. Old Thomas, our steersman, says the Anishinaabe and other First Nations built canoes like this long before any French ship crossed the ocean. Without their knowledge, he says, none of us would ever reach the <b>pays d’en haut</b>.',
      { h: 'May 21 · Ottawa River' },
      'My shoulders burn. We paddle from before sunrise until dark, about forty strokes a minute, singing to keep time. At the Chaudière Falls we made our first <b>portage</b>. I carried two packs of trade goods, each about forty kilograms, on a leather strap across my forehead. I fell twice. Nobody laughed. Everyone falls the first time, Thomas says.',
      { fig: '<path class="t" d="M8 44 Q50 10 104 22 Q132 30 128 50 Q110 70 60 66 Q20 66 8 44 Z"/>' +
          '<path class="t" d="M146 76 Q184 70 200 100 Q206 136 184 154 Q160 160 150 132 Q140 104 146 76 Z"/><ellipse class="t" cx="226" cy="98" rx="9" ry="5"/>' +
          '<path class="t" d="M235 96 Q248 94 254 110 Q260 128 268 140 Q280 152 298 160"/>' +
          '<path class="a" stroke-dasharray="5 4" d="M292 158 L268 140 Q254 112 246 98 L226 98 L206 104 Q196 84 178 74 Q156 64 132 64 Q120 22 70 22 Q30 26 18 46"/>' +
          place(292, 158, '1', -12, 4) + place(268, 140, '2', -12, 4) + place(226, 98, '3', -4, -9) + place(132, 64, '4', 4, 14) + place(18, 46, '5', -4, 16) +
          '<text class="n" x="40" y="54">Lake Superior</text><text class="n" x="156" y="118">Lake</text><text class="n" x="156" y="130">Huron</text>' +
          ['1 Lachine', '2 Chaudière Falls', '3 Lake Nipissing', '4 Sault', '5 Grand Portage'].map(function (t, i) { return '<text class="l" x="214" y="' + (12 + i * 13) + '">' + t + '</text>'; }).join('') +
          D.arrow(20, 156, 20, 128, 'k') + '<text class="lb" x="28" y="150">N</text>',
        tall: 168, cap: 'The route from Lachine, near Montréal, to Grand Portage. The dashed line shows the canoe route.' },
      { h: 'June 2 · Lake Nipissing' },
      'Wind kept us on shore all day. An Anishinaabe family camped near us and traded fresh fish for tea and flour. Their daughter, who is perhaps ten, laughed at the way I held my paddle, then showed me how to turn the blade at the end of each stroke. It works. I am faster already.',
      { h: 'June 10 · Sault' },
      'We passed the rapids at the Sault today, where the water of the great lake rushes down toward Lake Huron. Fishers stood up in their canoes in the white water and scooped whitefish with long nets. I would have tipped over in a moment.',
      { h: 'June 19 · Lake Superior' },
      'This lake is not a lake. It is a sea. Waves taller than our canoe roll in from the west, so we hug the rocky shore and wait out the storms. Thomas reads the sky the way the priest reads his book.',
      { h: 'July 4 · Grand Portage' },
      'We have arrived. Tonight there is music, dancing and more food than I have seen since home. Tomorrow we load the bales of beaver pelts and turn back toward Montréal. My hands are hard now, and my shoulders no longer burn. I am not the same boy who left Lachine.',
      { box: 'The real voyageurs', text: 'From the late 1600s to the mid-1800s, thousands of voyageurs moved furs and trade goods across North America. Most were French Canadian or Métis, and many travelled with First Nations guides who knew the rivers and portages.' }
    ],
    guide: { before: 'Find Montréal, the Ottawa River and Lake Superior on a map of Canada. Explain the fur trade in two sentences. Teach <b>voyageur</b>, <b>portage</b> and <b>pays d’en haut</b> (the “upper country” to the north and west).',
      after: 'Étienne’s diary shows only his point of view. Whose voices are missing from this story, and what might they say about the fur trade?' },
    words: [['voyageur', 'a paddler who carried goods for the fur trade'], ['portage', 'carrying canoes and goods over land, around rapids'], ['pays d’en haut', '“the upper country”: the lands to the north and west']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows that this text is a diary?',
        opts: ['a glossary', 'dated entries in the first person', 'a table of contents', 'both sides of an argument'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Which lake did the canoe cross last, just before Grand Portage?',
        opts: ['Lake Huron', 'Lake Nipissing', 'Lake Superior', 'Lake Ontario'], a: 2 },
      { k: 'choice', code: 'C1.6', q: 'The diary is told in the first person. What is one disadvantage of this point of view?',
        opts: ['We know what every character thinks.', 'We learn only what Étienne sees, thinks and feels.', 'There is no dialogue at all.', 'The story is told out of order.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How does Étienne change between May 21 and July 4? Use two details from the diary.',
        a: 'At first he is new and weak: his shoulders burn and he falls on the portage. By July his hands are hard, he is faster, and he says he is not the same boy.', look: 'a change (weak or new to strong or confident) with two details from different entries' },
      { k: 'choice', code: 'C3.1', half: true, q: '“Thomas reads the sky the way the priest reads his book.” This means Thomas …',
        opts: ['prays during storms', 'can predict the weather', 'cannot read', 'is a priest'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: '“This lake is not a lake. It is a sea.” Why does Étienne use short sentences here?',
        opts: ['to sound confused', 'to show how huge and wild it feels', 'because he is tired of writing', 'to explain salt water'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Thomas says the voyageurs depend on First Nations knowledge. Find two pieces of evidence in the diary that support him.',
        a: 'The birchbark canoe was a First Nations design. The Anishinaabe girl taught Étienne a better paddle stroke. The box says many voyageurs travelled with First Nations guides.', look: 'two pieces of evidence from the text, such as the canoe design, the paddling lesson or the guides' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'How might the story of June 2 be different if the Anishinaabe girl told it? Give one example.',
        a: 'She might describe the clumsy stranger who held his paddle the wrong way, and how her family decided to trade with the voyageurs. Her view would show her own knowledge and her family’s life.', look: 'a clear alternative point of view and an example of a detail that would change' }
    ]
  });

  P.add({
    id: 'g7-food-web', subject: 'science', form: 'Explanation',
    title: 'Who Eats Whom in the Marsh',
    deck: 'How energy flows through a Great Lakes coastal wetland, one meal at a time',
    hero: {
      photo: 'g7-heron.jpg', credit: 'Photo: Lgbt7274, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'A great blue heron at Point Pelee National Park, Ontario. It hunts near the top of the wetland food web.'
    },
    body: [
      'At dawn in a coastal marsh on Lake Erie, a great blue heron stands perfectly still in shallow water. Suddenly its beak stabs down and comes up holding a minnow. That one moment is a single link in a huge network of feeding relationships called a <b>food web</b>.',
      { h: 'Producers start it all' },
      'Every food web begins with the sun. Cattails, water lilies and tiny floating algae capture sunlight and use it to make sugar through photosynthesis. Because they make their own food, they are called <b>producers</b>. Everything else in the marsh depends on them, directly or indirectly.',
      { fig: node(60, 160, 'algae') + node(220, 160, 'cattails') + node(60, 112, 'water fleas') + node(150, 112, 'insects') + node(250, 112, 'muskrat') +
          node(70, 64, 'minnow') + node(175, 64, 'snapping turtle') + node(110, 18, 'great blue heron') + node(255, 18, 'mink') +
          D.arrow(60, 152, 60, 120, 'a') + D.arrow(206, 152, 162, 120, 'a') + D.arrow(230, 152, 248, 120, 'a') + D.arrow(62, 104, 68, 72, 'a') +
          D.arrow(150, 104, 170, 72, 'a') + D.arrow(92, 62, 126, 62, 'a') + D.arrow(76, 56, 100, 26, 'a') + D.arrow(252, 104, 255, 26, 'a'),
        tall: 172, cap: 'Part of a marsh food web. Each arrow points from the food to the animal that eats it, the way the energy flows.' },
      { h: 'Consumers pass it on' },
      'Animals cannot make their own food, so they are consumers. Muskrats munch cattail roots, and water fleas graze on algae. These plant-eaters are primary consumers. Minnows that eat water fleas are secondary consumers, and the heron that eats a minnow is a tertiary consumer. At each step, energy moves up a level.',
      'Only about 10 per cent of the energy at one level reaches the next. The rest is used for moving, breathing and staying warm, or is lost as heat. This is why a marsh can feed millions of water fleas but only a few herons.',
      { h: 'Cleaning up' },
      'When plants and animals die, <b>decomposers</b> such as bacteria and fungi break them down. They return nutrients to the mud and water, where producers use them again. Without decomposers, the marsh would fill with dead material, and its nutrients would be locked away.',
      { box: 'A web, not a chain', text: 'Most animals eat more than one thing. A snapping turtle eats fish, frogs, insects and plants, so if one food becomes scarce, it can switch to another.' },
      { h: 'Pulling one thread' },
      'Because everything is connected, a change to one living thing affects many others. When too much fertilizer washes into a marsh, algae grow out of control. As they die and rot, decomposers use up the oxygen in the water, and fish suffocate. Then the herons go hungry. Protecting a wetland means protecting the whole web, not only the animals we like to watch.'
    ],
    guide: { before: 'Ask what the child ate for breakfast and trace it back to a plant and the sun. Teach <b>producer</b>, <b>consumer</b> and <b>decomposer</b>. Show how to read the arrows in the diagram: they point the way the energy goes.',
      after: 'Farms near the lake need fertilizer, and the marsh needs clean water. How could farmers and people who care about the marsh work together?' },
    words: [['producers', 'living things that make their own food from sunlight'], ['decomposers', 'living things that break down dead plants and animals'], ['food web', 'all the feeding links in an ecosystem, joined together']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what does each arrow show?',
        opts: ['which animal is bigger', 'the way energy flows, from food to eater', 'where each animal lives', 'which animal is in danger'], a: 1 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>De</b>compose means to break down. Which word uses <b>de-</b> in the same way?',
        opts: ['delight', 'defrost', 'decide', 'deliver'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Sort these living things from the text. Write each one in the right row: heron, cattails, fungi, muskrat, minnow.', cols: ['Role in the food web', 'Example from the text'],
        rows: [['producer', null], ['primary consumer', null], ['secondary consumer', null], ['tertiary consumer', null], ['decomposer', null]],
        a: [[null, 'cattails'], [null, 'muskrat'], [null, 'minnow'], [null, 'heron'], [null, 'fungi']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why can a marsh feed millions of water fleas but only a few herons? Use the information about energy.',
        a: 'Only about 10 per cent of the energy at each level reaches the next level. By the time energy reaches the heron, there is very little left, so only a few herons can be fed.', look: 'the 10 per cent idea and the link to energy running out higher up the web' },
      { k: 'choice', code: 'C1.3', half: true, q: 'How is the last section, “Pulling one thread,” organized?',
        opts: ['compare and contrast', 'a chain of causes and effects', 'question and answer', 'a list of definitions'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The heading “Pulling one thread” compares the marsh to …',
        opts: ['a piece of clothing', 'a woven web, where one pull moves everything', 'a fishing line', 'a sewing lesson'], a: 1 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict what would happen to the minnows if all the herons left the marsh. What might happen next?',
        a: 'With no herons eating them, the minnows would increase at first. Then they might eat too many water fleas, and later run short of food themselves.', look: 'a prediction that follows the links in the web, with at least two steps' },
      { k: 'choice', code: 'C1.1', q: '“As <b>they</b> die and rot, decomposers use up the oxygen.” What does <b>they</b> refer to?',
        opts: ['the fish', 'the herons', 'the algae', 'the decomposers'], a: 2 }
    ]
  });

  P.add({
    id: 'g7-zebra-mussels', subject: 'science', form: 'Report',
    title: 'The Uninvited Guests',
    deck: 'How a mussel the size of a fingernail changed the Great Lakes',
    hero: {
      photo: 'g7-zebra-mussels.jpg', credit: 'Photo: NOAA Great Lakes Environmental Research Laboratory, public domain', focus: '50% 50%',
      tall: 200,
      cap: 'Zebra mussels crowd together on a hard surface. Each shell has dark, zigzag stripes.'
    },
    body: [
      'In 1988, scientists sampling Lake St. Clair, between Ontario and Michigan, found something that did not belong: a striped mussel no bigger than a fingernail. It was a zebra mussel, native to lakes and rivers in eastern Europe and western Asia. Within a few years, billions of them covered rocks, docks and boats across the Great Lakes.',
      { h: 'A ride in the ballast' },
      'Scientists believe the mussels arrived in <b>ballast</b> water. Large ships fill tanks with water to stay steady at sea, then pump it out when they take on cargo. A ship that filled its tanks in a European port probably released young mussels when it reached the Great Lakes. A living thing that is carried to a new place and spreads quickly, harming the ecosystem, is called an <b>invasive species</b>.',
      { fig: '<path class="k" d="M110 70 Q150 30 200 60 Q215 72 200 92 Q150 118 110 92 Q100 81 110 70 Z"/><path class="t" d="M130 60 L140 80 L150 52 L162 86 L174 56 L184 84"/>' +
          D.arrow(20, 78, 98, 78, 'a') + D.arrow(212, 78, 290, 78, 'a') + '<path class="t" d="M114 92 Q108 112 96 124 M118 94 Q118 116 112 130"/>' +
          '<circle class="dot" cx="30" cy="64" r="2"/><circle class="dot" cx="48" cy="92" r="2"/><circle class="dot" cx="64" cy="66" r="2"/><circle class="dot" cx="80" cy="90" r="2"/><circle class="dot" cx="40" cy="80" r="2"/>' +
          '<text class="l" x="10" y="40">water with plankton</text><text class="l" x="222" y="40">clearer water</text>' +
          D.label(130, 146, 'threads that grip a rock', 112, 130) + '<text class="n" x="150" y="20" text-anchor="middle">about 1 litre a day</text>',
        tall: 156, cap: 'A zebra mussel pulls water in, strains out the plankton and pushes clearer water back out.' },
      { h: 'Why they spread so fast' },
      'At home, zebra mussels are eaten by certain fish and kept in check by disease. In the Great Lakes, they had few natural predators. A single female can release up to a million eggs in a year. The young drift with the currents, then attach themselves to any hard surface with strong threads.',
      { h: 'Clearer water, hungrier fish' },
      'Each mussel filters about a litre of water a day, straining out <b>plankton</b>. With billions at work, parts of Lake Erie became much clearer. That sounds like good news, but plankton is food for young fish and many other animals. Clearer water also lets sunlight reach deeper, so weeds grow where they never grew before.',
      'The mussels cause costly problems for people, too. They clog the pipes that bring water to cities and power plants, so crews must scrape them out.',
      { box: 'Clean, drain, dry', text: 'Before moving a boat to another lake, clean off plants and mud, drain all water, and let everything dry completely.' },
      { h: 'Living with the mussels' },
      'Once zebra mussels are established, it is almost impossible to remove them. Instead, Canada and the United States now require ships to exchange or treat their ballast water before entering the Great Lakes. The lesson is clear: preventing an invasion is far easier than ending one.'
    ],
    guide: { before: 'Find Lake St. Clair and Lake Erie on a map. Explain what ballast is with a toy boat in a sink. Teach <b>invasive species</b> and <b>plankton</b>.',
      after: 'Should every boat be inspected before it enters a new lake, even if that costs time and money? Who would agree, and who might not?' },
    words: [['invasive species', 'a living thing brought to a new place that spreads and causes harm'], ['ballast', 'heavy material or water that keeps a ship steady'], ['plankton', 'tiny plants and animals that drift in water']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'Which sentence best states the conclusion of the report?',
        opts: ['Zebra mussels have dark stripes.', 'Preventing an invasive species from arriving is far easier than removing it.', 'Lake Erie is now clearer, which is good.', 'Ships should stop carrying cargo.'], a: 1 },
      { k: 'table', code: 'C1.3', q: 'The report is built on causes and effects. Fill in the chart.', cols: ['Cause', 'Effect'],
        rows: [['Ships pumped out ballast water from Europe.', null], ['Zebra mussels had few predators.', null], [null, 'Weeds grow in deeper water.'], ['Mussels grow inside water pipes.', null]],
        a: [[null, 'Zebra mussels arrived in the Great Lakes.'], [null, 'They spread very quickly.'], ['Clearer water lets sunlight reach deeper.', null], [null, 'Pipes clog and crews must scrape them out.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The author says clearer water “sounds like good news.” Why is it not good news? Give two reasons.',
        a: 'The mussels have eaten the plankton that young fish need, so fish go hungry. Sunlight also reaches deeper, so weeds grow in new places.', look: 'two effects from the text: less food for fish, and weeds growing deeper' },
      { k: 'choice', code: 'B2.2', half: true, q: 'The word <b>invasive</b> comes from <b>invade</b>. What does an invasive species do?',
        opts: ['moves in and takes over', 'hides from predators', 'travels only by ship', 'cleans the water'], a: 0 },
      { k: 'choice', code: 'C3.5', half: true, q: 'Which person would most likely see zebra mussels mainly as an expensive problem?',
        opts: ['a scuba diver who likes clear water', 'the manager of a power plant', 'a heron', 'a tourist'], a: 1 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why does the first sentence use a colon ( : )?',
        opts: ['to join two lists', 'to introduce what the scientists found', 'to show a quotation', 'to end the paragraph'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram add to the text?',
        opts: ['It shows how a mussel filters water.', 'It shows the route the ships took.', 'It shows how many mussels there are.', 'It shows a power plant.'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Connect this report to something you know: another invasive species, or a time you saw a “clean, drain, dry” sign. How is it like the zebra mussel story?',
        a: 'Emerald ash borers came to Ontario in wooden crates and killed ash trees, which had no defence against them. Like the mussels, they arrived by accident and spread with few predators.', look: 'a real connection (another invasive species or an experience) and a clear way it is similar' }
    ]
  });

  P.add({
    id: 'g7-truss-bridge', subject: 'science', form: 'Explanation',
    title: 'The Shape That Holds Up Bridges',
    deck: 'Why bridges, towers and roofs are built from triangles',
    hero: {
      photo: 'g7-truss-bridge.jpg', credit: 'Photo: Quintin Soloviev, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A steel truss railway bridge in Winnipeg, Manitoba. Its frame is made of many triangles joined together.'
    },
    body: [
      'Look closely at a steel railway bridge, a hydro tower or the roof frame of a new house, and you will see the same shape again and again: the triangle. Engineers have relied on it for centuries, because it solves a problem every structure faces. It has to carry a <b>load</b> without changing shape.',
      { h: 'Squares give way' },
      'Make a square from four craft sticks pinned at the corners, and push on one corner. The square leans over and folds flat into a diamond. Its sides have not changed length, but its angles have. Now pin three sticks into a triangle and push. Nothing moves. The only way to change a triangle’s angles is to stretch or squash one of its sides, so it holds its shape. Engineers call a shape like this <b>rigid</b>.',
      { fig: '<path class="k" d="M20 60 H80 V120 H20 Z"/><path class="d" d="M40 60 L100 60 L80 120 L20 120"/>' + D.arrow(4, 60, 18, 60, 'a') +
          '<path class="k" d="M130 120 L160 60 L190 120 Z"/>' + D.arrow(160, 36, 160, 56, 'a') +
          '<path class="k" d="M210 110 H294 M210 80 H294 M210 110 L224 80 L238 110 L252 80 L266 110 L280 80 L294 110"/>' +
          '<text class="lb" x="50" y="140" text-anchor="middle">square folds</text><text class="lb" x="160" y="140" text-anchor="middle">triangle holds</text>' +
          '<text class="lb" x="252" y="140" text-anchor="middle">truss</text><text class="n" x="252" y="72" text-anchor="middle">top: squeezed</text><text class="n" x="252" y="126" text-anchor="middle">bottom: stretched</text>',
        tall: 150, cap: 'A push folds a square but not a triangle. A truss joins many triangles into one stiff frame.' },
      { h: 'Pushing and pulling' },
      'Every part of a structure is either pushed or pulled. A force that squeezes a part is called <b>compression</b>. A force that stretches it is called <b>tension</b>. When a train rolls across a bridge, the beams along the top of the frame are squeezed, while the beams along the bottom are stretched. The slanted pieces between them pass the forces down to the supports.',
      { h: 'Building with trusses' },
      'A frame made of triangles joined together is called a truss. Because each triangle stays rigid, the whole truss stays rigid, even though it is mostly empty space. That makes it strong and light at the same time, which saves steel and money.',
      { box: 'Did you know?', text: 'Since 1925, many Canadian engineers have worn an iron ring on the little finger of their working hand. It reminds them that a mistake in their work can put people’s lives at risk.' },
      { h: 'When a truss fails' },
      'Getting the forces right is serious work. In 1907, the Quebec Bridge collapsed while it was being built, killing 75 workers, including many Mohawk ironworkers from Kahnawà:ke. Investigators found that a part under heavy compression had been made too weak, and it buckled. The bridge was redesigned, and it still carries trains across the St. Lawrence today.'
    ],
    guide: { before: 'Build a square and a triangle from straws and pins, and let the child push on each. Teach <b>compression</b> and <b>tension</b> by squeezing and stretching a sponge.',
      after: 'Where can you see triangles in buildings near you? Why do you think the builders used them there?' },
    words: [['rigid', 'stiff; does not bend or change shape'], ['compression', 'a force that squeezes or pushes together'], ['tension', 'a force that stretches or pulls apart']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'Which statement best explains why trusses are built from triangles?',
        opts: ['Triangles are easy to paint.', 'A triangle cannot change shape unless a side breaks or stretches.', 'Triangles use more steel.', 'Squares are too heavy.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Compare the two forces. Fill in the chart.', cols: ['', 'Compression', 'Tension'],
        rows: [['What it does to a part', null, null], ['Where it acts in a truss bridge', null, 'the bottom beams']],
        a: [[null, 'squeezes it', 'stretches it'], [null, 'the top beams', null]] },
      { k: 'choice', code: 'C2.4', half: true, q: 'The paragraph about craft sticks is hard to follow. What is the best way to check your understanding?',
        opts: ['skip it', 'picture it or try it, then look at the diagram', 'read only the headings', 'look up “square” in a dictionary'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The beam <b>buckled</b> under the load. Use the text to work out what <b>buckled</b> means.',
        opts: ['fastened with a buckle', 'bent and gave way', 'grew stronger', 'was painted'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author end with the story of the Quebec Bridge? What does it add to the explanation?',
        a: 'It shows that the forces are real and serious: one weak part under compression made the whole bridge collapse and killed 75 workers. It explains why engineers must get the forces exactly right.', look: 'the purpose (a real example that shows why the science matters) linked to compression' },
      { k: 'choice', code: 'B3.2', half: true, q: '“A part under heavy compression had been made too <b>weak</b>.” What is <b>weak</b> in this sentence?',
        opts: ['a noun', 'a predicate adjective describing the part', 'a verb', 'an adverb'], a: 1 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature tells you this is an explanation?',
        opts: ['It tells how and why something works, step by step.', 'It has a villain.', 'It gives the writer’s feelings about bridges.', 'It is written as a diary.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Mohawk ironworkers from Kahnawà:ke helped build bridges and skyscrapers across North America. What does the text suggest about the value of their work and the risks they took?',
        a: 'Their work was skilled and important: they built the frames of huge structures. It was also dangerous, as the Quebec Bridge collapse shows, and many lost their lives there.', look: 'both the skill and importance of the work and the danger, with a detail from the text' }
    ]
  });

  P.add({
    id: 'g7-acadians', subject: 'history', form: 'Report',
    title: 'The Great Upheaval',
    deck: 'Why thousands of Acadians were forced from their homes, beginning in 1755',
    hero: {
      photo: 'g7-grand-pre.jpg', credit: 'Photo: CP Hoffman, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'The memorial church at Grand-Pré, Nova Scotia, built where the Acadian village once stood.'
    },
    body: [
      'In the 1600s, French settlers made a home along the Bay of Fundy, in a land they called Acadie. They built earth walls called dykes, with wooden gates named <b>aboiteaux</b>, that let river water drain out at low tide but kept the salty sea out at high tide. Behind the dykes, the rich marshland became farmland. The Acadians lived alongside the Mi’kmaq, who traded with them and taught them how to live in the region.',
      { fig: '<path class="t" d="M150 10 Q132 34 146 54 Q160 70 196 66 Q236 60 250 78"/><path class="t" d="M112 168 Q100 120 118 90 Q128 70 150 66"/>' +
          place(196, 66, '', 0, 0) + '<text class="lb" x="204" y="60">Acadie</text>' +
          D.arrow(186, 72, 134, 112, 'a') + D.arrow(186, 74, 116, 156, 'a') + D.arrow(204, 72, 290, 112, 'a') + D.arrow(176, 64, 40, 40, 'a') + D.arrow(180, 70, 30, 140, 'a') +
          '<text class="n" x="136" y="124">Massachusetts</text><text class="n" x="104" y="170">Virginia, Carolinas</text><text class="n" x="236" y="128">France, England</text>' +
          '<text class="n" x="20" y="34">Québec</text><text class="n" x="4" y="154">later: Louisiana</text>',
        tall: 176, cap: 'Where Acadians were sent or fled after 1755. The map is a sketch, not drawn to scale.' },
      { h: 'Caught between two empires' },
      'In 1713, France handed Acadie to Britain, which renamed it Nova Scotia. For forty years, the Acadians tried to stay <b>neutral</b>. They would promise loyalty to the British king, but they would not swear to fight against France or the Mi’kmaq. As war between the two empires came closer, British officials grew suspicious of the French-speaking Catholic farmers.',
      { h: 'The order' },
      'In 1755, Governor Charles Lawrence decided to remove them. Soldiers gathered the men of Grand-Pré in their church and read the order: their land, houses and animals now belonged to the Crown. Families were loaded onto ships, and some were separated for years. Villages were burned so no one could return. Over the next eight years, more than 10 000 Acadians were sent away.',
      'Some escaped into the forests, where Mi’kmaq families sheltered them, and others fled north to Québec. Those who were deported often landed in colonies that did not want them, where they were treated as enemies. In 1847, the poet Henry Wadsworth Longfellow published <i>Evangeline</i>, a long poem about two Acadian lovers separated by the deportation, and it made their story known around the world.',
      { box: 'A people who returned', text: 'Many Acadians made their way back to the Maritimes. Today, many thousands of people in the Maritimes and beyond share Acadian roots. On August 15, Acadians march with drums, pots and horns in a noisy parade called the Tintamarre.' },
      { h: 'Remembering' },
      'The Acadians call these events le Grand Dérangement, the Great Upheaval. In 2003, a royal proclamation officially recognized the suffering it caused. Grand-Pré is now a World Heritage Site, where visitors walk through the dyked fields that Acadian families farmed more than 300 years ago.'
    ],
    guide: { before: 'Find the Bay of Fundy and Nova Scotia on a map. Explain that Britain and France were at war for control of North America. Teach <b>neutral</b> and <b>deported</b>.',
      after: 'The Acadians refused to take sides. Was staying neutral a wise choice? What else could they have done?' },
    words: [['aboiteaux', 'wooden gates in a dyke that let fresh water out but keep the sea out'], ['neutral', 'not taking either side in a conflict']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number these events in the order they happened.',
        items: ['Acadians farm the marshes behind their dykes.', 'France hands Acadie to Britain.', 'Acadians refuse to swear to fight against France.', 'Families are loaded onto ships.', 'A royal proclamation recognizes their suffering.'], show: [3, 0, 4, 2, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the map show that the text does not say directly?',
        opts: ['the date of the order', 'that Acadians ended up in many different places', 'the name of the governor', 'how dykes work'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were the villages burned?',
        opts: ['to clear land for new farms', 'so the Acadians could not come back', 'by accident during a storm', 'to keep the soldiers warm'], a: 1 },
      { k: 'lines', code: 'C3.5', n: 4, q: 'This report is told mostly from the Acadians’ point of view. How might a British official in 1755 have explained the order? Is anything missing from his explanation?',
        a: 'He might say that the Acadians would not promise to fight for Britain, so in a war they could help the French. His explanation leaves out the families who were innocent and lost everything.', look: 'a believable British reason (security, loyalty in wartime) and an honest note of what that view leaves out' },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Upheaval</b> is made of <b>up</b> + <b>heave</b> (to lift with effort). What does it mean here?',
        opts: ['a big, sudden disruption', 'a calm celebration', 'a type of boat', 'a farming tool'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Soldiers … read the order: their land, houses and animals now belonged to the Crown.” What does the colon do?',
        opts: ['It introduces what the order said.', 'It joins two lists.', 'It shows a pause for breath.', 'It begins a quotation from a book.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does the Tintamarre parade suggest about how Acadians feel about their culture today?',
        a: 'It suggests they are proud and want to be heard. After being scattered, they celebrate loudly to show that their culture survived.', look: 'an interpretation (pride, survival, being heard) linked to the noisy parade' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the Great Upheaval in two or three sentences.',
        a: 'After Britain took over Acadie, the Acadians tried to stay neutral. In 1755 the British forced more than 10 000 of them from their land and burned their villages. Many later returned, and their culture continues today.', look: 'the cause, the main event and the outcome, in the child’s own words' }
    ]
  });

  P.add({
    id: 'g7-plates', subject: 'geography', form: 'Explanation',
    title: 'Where the Earth Splits Open',
    deck: 'How moving plates build mountains, open oceans and shake the ground',
    hero: {
      photo: 'g7-thingvellir.jpg', credit: 'Photo: Pi3.124, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'Þingvellir, Iceland. This valley is opening where two of Earth’s plates are pulling apart.'
    },
    body: [
      'In Þingvellir National Park in Iceland, you can walk through a rocky valley with a cliff on each side. On one side is the North American Plate. On the other is the Eurasian Plate. The valley gets about two centimetres wider every year, roughly as fast as your fingernails grow.',
      { h: 'A cracked shell' },
      'Earth’s outer layer, the crust and the rock just below it, is not one solid piece. It is broken into about a dozen huge slabs called <b>tectonic plates</b>, which carry the continents and the ocean floors. The plates float on hot, slowly flowing rock underneath, and they are always moving. The places where they meet are called plate boundaries. Heat from deep inside Earth drives the motion. Hot rock rises slowly, spreads out under the plates, cools and sinks again, like thick soup simmering in a pot, and the plates ride on these slow currents.',
      { fig: '<path class="k" d="M10 40 H90 M10 56 H90"/>' + D.arrow(46, 30, 20, 30, 'a') + D.arrow(54, 30, 80, 30, 'a') + '<path class="d" d="M50 56 V90"/>' +
          '<path class="k" d="M110 40 H190 M110 56 H190 M150 40 L136 20 L150 30 L164 18 L150 40"/>' + D.arrow(112, 70, 140, 70, 'a') + D.arrow(188, 70, 160, 70, 'a') +
          '<path class="k" d="M210 26 H290 V76 H210 Z M250 26 V76"/>' + D.arrow(230, 36, 230, 66, 'a') + D.arrow(270, 66, 270, 36, 'a') +
          '<text class="lb" x="50" y="112" text-anchor="middle">pulling apart</text><text class="lb" x="150" y="112" text-anchor="middle">pushing together</text><text class="lb" x="250" y="112" text-anchor="middle">sliding past</text>' +
          '<text class="n" x="50" y="128" text-anchor="middle">Iceland</text><text class="n" x="150" y="128" text-anchor="middle">Himalayas</text><text class="n" x="250" y="128" text-anchor="middle">California</text>',
        tall: 136, cap: 'The three kinds of plate boundary, with an example of each.' },
      { h: 'Three ways to meet' },
      'At some boundaries, plates pull apart. Hot rock rises to fill the gap, which is why Iceland has so many volcanoes. At others, plates push together. When two continents collide, the crust crumples upward. India has been pushing into Asia for about 50 million years, raising the Himalayas, where Mount Everest still grows a few millimetres a year. At a third kind, plates slide past each other. They stick, then slip suddenly, and the ground shakes in an <b>earthquake</b>.',
      { box: 'Laughed at, then proven right', text: 'In 1912, Alfred Wegener said the continents had once been joined and had drifted apart. Many scientists laughed. In the 1960s, maps of the ocean floor proved he was right that the continents move, though he was wrong about what pushes them.' },
      { h: 'Why it matters' },
      'Plate movement is too slow to see, but it shapes where people can safely live. Engineers in Vancouver design buildings to sway without falling, because the coast of British Columbia sits near a boundary where one plate dives under another. Scientists track the plates with GPS stations that can sense a shift of a few millimetres. Understanding plates helps people prepare for the next big shake.'
    ],
    guide: { before: 'Show a cracked hard-boiled egg as a model of Earth’s plates. Find Iceland, the Himalayas and Vancouver on a world map. Teach <b>tectonic plate</b> and <b>boundary</b>.',
      after: 'Would you live in a city near a plate boundary? What would you want to know or prepare first?' },
    words: [['tectonic plates', 'the huge, slowly moving slabs of Earth’s outer layer'], ['earthquake', 'a sudden shaking of the ground when rock slips']],
    qs: [
      { k: 'table', code: 'C1.3', q: 'The text compares three kinds of boundary. Fill in the chart.', cols: ['How plates move', 'What can happen', 'Example'],
        rows: [['pulling apart', null, 'Iceland'], ['pushing together', 'mountains form', null], [null, 'earthquakes', 'California']],
        a: [[null, 'volcanoes form as hot rock rises', null], [null, null, 'the Himalayas'], ['sliding past each other', null, null]] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what do the arrows show?',
        opts: ['wind direction', 'which way each plate moves', 'where rivers flow', 'the height of mountains'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Earth’s outer layer” is compared to …',
        opts: ['a cracked shell', 'a fingernail', 'a valley', 'a map'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> stick, then slip suddenly.” What does <b>They</b> refer to?',
        opts: ['the volcanoes', 'the plates sliding past each other', 'the scientists', 'the continents of India and Asia'], a: 1 },
      { k: 'choice', code: 'B2.1', half: true, q: 'A <b>tecton</b> was a builder in ancient Greek. Which word shares this root?',
        opts: ['architect', 'textbook', 'detect', 'protect'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did scientists change their minds about Wegener? What does this suggest about how science works?',
        a: 'New evidence from maps of the ocean floor showed he was right. It suggests that scientists change their ideas when there is better evidence.', look: 'the new evidence, and a sensible conclusion about evidence changing ideas' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about volcanoes or earthquakes before reading? How did it help you understand this text?',
        a: 'I knew that earthquakes happen in Japan and California. That helped me understand that they happen where plates slide past each other.', look: 'a real piece of prior knowledge and how it connected to the text' },
      { k: 'choice', code: 'C2.2', q: 'Which reader would find this text most useful?',
        opts: ['someone who wants a story about a hero', 'a student researching why mountains and earthquakes happen', 'someone who wants a recipe', 'a person choosing a pet'], a: 1 }
    ]
  });

  P.add({
    id: 'g7-concussion', subject: 'health', form: 'Explanation',
    title: 'The Invisible Injury',
    deck: 'What happens inside your head during a concussion, and why rest matters',
    hero: {
      photo: 'g7-hockey.jpg', credit: 'Photo: Robert Taylor, CC BY 2.0, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'Minor hockey players in Stirling, Ontario. A helmet protects the skull, but it cannot stop the brain from moving inside it.'
    },
    body: [
      'A player gets checked into the boards, gets up and keeps skating. She has no cut and no bruise. An hour later, she has a headache, feels dizzy and cannot remember the score. She may have a <b>concussion</b>, a brain injury that nobody can see.',
      { h: 'What happens' },
      'Your brain is soft, a bit like firm jelly, and it floats in fluid inside your skull. When your head or body is hit hard, or your head snaps quickly, the brain can slide and strike the inside of the skull. The impact stretches and stresses brain cells, and for a while they cannot work normally. The cells also use extra energy as they try to repair themselves, which is one reason a concussed person feels so tired.',
      { fig: '<ellipse class="k" cx="90" cy="70" rx="56" ry="48"/><ellipse class="t" cx="98" cy="70" rx="44" ry="37"/>' + D.arrow(4, 70, 30, 70, 'a') +
          '<ellipse class="k" cx="226" cy="70" rx="56" ry="48"/><ellipse class="t" cx="246" cy="70" rx="40" ry="37"/><path class="a" d="M284 52 L292 46 M286 70 L296 70 M284 88 L292 94"/>' +
          D.label(102, 140, 'brain floats in fluid', 98, 106, 'middle') + D.label(226, 140, 'brain hits the skull', 270, 98, 'middle') +
          '<text class="lb" x="90" y="16" text-anchor="middle">1 the hit</text><text class="lb" x="226" y="16" text-anchor="middle">2 the brain keeps moving</text>',
        tall: 150, cap: 'When the head stops suddenly, the brain keeps moving and strikes the inside of the skull.' },
      { h: 'The signs' },
      'Signs of a concussion can appear right away or hours later. They include headache, dizziness, blurry vision, feeling sick, trouble remembering or concentrating, and being unusually emotional or tired. Most people with a concussion never black out, so “I wasn’t knocked out” does not mean “I’m fine.” Signs can last for days or weeks. A student may find bright classroom lights painful, or struggle with a test that would normally be easy. Teachers can help with breaks, extra time and a quieter place to work.',
      { box: 'If you think it’s a concussion', text: 'Stop playing right away and tell a coach, teacher or parent. Never go back in the same game, even if you start to feel better. See a doctor.' },
      { h: 'Healing takes time' },
      'A concussed brain needs <b>recovery</b> time. Doctors usually advise a day or two of rest, with less screen time, then a slow return to school and activity, step by step. Going back too soon is risky, because a second hit before the brain has healed can cause a much more serious injury. Most young people recover within about four weeks, but everyone heals at a different pace, and only a doctor should decide when it is safe to play again. In 2018, Ontario passed Rowan’s Law, named after a teenage rugby player who died after a second hit. Now schools and sports teams must teach concussion safety and have a plan for every player.'
    ],
    guide: { before: 'Shake a closed jar with a soft grape in water to show how the brain moves inside the skull. Teach <b>concussion</b> and <b>recovery</b>.',
      after: 'Why might a player hide concussion signs from the coach? What could teammates do to make it easier to speak up?' },
    words: [['concussion', 'a brain injury caused by a hit or a sudden jolt'], ['recovery', 'the time and process of getting well again']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the most important message of this text?',
        opts: ['Hockey is too dangerous to play.', 'A concussion is a real brain injury that needs rest, even when it cannot be seen.', 'Helmets prevent all concussions.', 'Most players black out after a hit.'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author write the first paragraph as a short scene?',
        opts: ['to show the injury is hidden at first', 'to describe a hockey game', 'to name the player', 'to give a score'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Like firm jelly” is a simile. What does it help you understand?',
        opts: ['the brain’s colour', 'how soft the brain is', 'what the brain eats', 'how big the brain is'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps for returning after a concussion.',
        items: ['Stop playing and tell an adult.', 'See a doctor.', 'Rest for a day or two.', 'Return to school and activity slowly.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B3.3', half: true, q: '“I wasn’t knocked out” does not mean “I’m fine.” Why are quotation marks used?',
        opts: ['to show words someone might say', 'to show a book title', 'to show a mistake', 'to make words louder'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why can a helmet not prevent every concussion? Use the text and the diagram.',
        a: 'A helmet protects the skull, but the brain floats inside. When the head stops suddenly, the brain keeps moving and hits the skull anyway.', look: 'the idea that the brain moves inside the skull, using the text or diagram' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Rowan’s Law makes every school and team have a concussion plan. Why is it important that the rule covers every player, not only the best players?',
        a: 'Every player’s brain matters equally. If the rule only covered some players, others could be hurt badly because nobody checked on them.', look: 'a reason based on fairness and safety for all players' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which helped you more with this text, the diagram or the scene at the start? Explain why.',
        a: 'The diagram helped more, because I could see the brain moving inside the skull, which was hard to picture from words alone.', look: 'a choice of strategy or feature and a clear reason it helped' }
    ]
  });

  P.add({
    id: 'g7-unit-price', subject: 'math', form: 'Explanation',
    title: 'The Bigger Box Trap',
    deck: 'How unit rates help you find the real best buy at the grocery store',
    hero: {
      photo: 'g7-grocery.jpg', credit: 'Photo: Vauxford, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Boxes of cereal in many sizes. Which one is the best buy?'
    },
    body: [
      'Amara is shopping for her family’s favourite cereal. A 350 g box costs $4.20. A giant 750 g box costs $9.75. “The big box is always cheaper,” her brother says. Is he right? To find out, Amara needs to compare the boxes fairly, and the sizes are different. She needs a <b>unit rate</b>.',
      { h: 'Comparing the same amount' },
      'A rate compares two quantities with different units, such as dollars and grams. A unit rate tells you how much there is for one unit, or for a standard amount like 100 g. To find it, divide the price by the amount. Then every product is measured with the same ruler.',
      { fig: '<path class="k" d="M40 140 H290 M40 140 V20"/>' +
          '<rect class="h" x="80" y="56" width="60" height="84"/><rect class="h" x="190" y="49" width="60" height="91"/>' +
          '<text class="lb" x="110" y="48" text-anchor="middle">$1.20</text><text class="lb" x="220" y="41" text-anchor="middle">$1.30</text>' +
          '<text class="l" x="110" y="156" text-anchor="middle">350 g box</text><text class="l" x="220" y="156" text-anchor="middle">750 g box</text>' +
          '<text class="n" x="34" y="24" text-anchor="end">$</text><text class="n" x="44" y="14">price for 100 g</text>',
        tall: 162, cap: 'The price of 100 g of cereal in each box. Here, the smaller box is the better buy.' },
      { h: 'Doing the math' },
      'For the small box, $4.20 ÷ 350 g = $0.012 per gram, or $1.20 for 100 g. For the big box, $9.75 ÷ 750 g = $0.013 per gram, or $1.30 for 100 g. Rounding both answers the same way makes the difference easy to see. Surprise: the smaller box is the better deal. Amara would save 10 cents on every 100 g by buying two small boxes instead.',
      { box: 'Read the shelf tag', text: 'Many Canadian stores print the unit price on the shelf tag, in small type, for example “$1.20 / 100 g.” Look for it before you reach for the biggest package.' },
      { h: 'Why the trap works' },
      'Shoppers often assume that bigger means cheaper, and sometimes it does. Stores know this, though. A large package may be placed at eye level, with a bright sign, even when its unit price is higher. Sales can change the answer, too. A <b>discount</b> on the small box this week might not apply next week. Package sizes can change quietly, too. A company may shrink a bag of chips by a few grams but keep the same price and a package that looks the same. Only the unit price reveals that you are now paying more for less.',
      { h: 'Not only about price' },
      'The best buy is not always the cheapest one per gram. If a giant bag of spinach goes bad before you can eat it, it was not a bargain. A family with little storage space may not have room for bulk packages. Smart shoppers use unit rates to compare, then think about what they actually need.'
    ],
    guide: { before: 'Bring two sizes of the same product, or flyers. Review dividing a price by an amount. Teach <b>rate</b> and <b>unit rate</b>. Show where a unit price appears on a shelf tag.',
      after: 'Find two sizes of one product at home or in a flyer. Which is the better buy? Is it also the better choice for your family?' },
    words: [['unit rate', 'how much for one unit, such as the price for 1 g or 100 g'], ['discount', 'an amount taken off the usual price']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the bar graph show most clearly?',
        opts: ['the big box holds more cereal', 'the small box costs less for each 100 g', 'the boxes cost the same', 'cereal prices rise every year'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In this text, what does <b>rate</b> mean?',
        opts: ['how fast someone runs', 'a comparison of two quantities with different units', 'a score out of ten', 'a type of discount'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Use the method in the text. Fill in the chart.', cols: ['Juice', 'Price', 'Price for 100 mL'],
        rows: [['1 L carton (1000 mL)', '$3.50', null], ['2 L jug (2000 mL)', '$6.40', null], ['Better buy?', null, null]],
        a: [[null, null, '$0.35'], [null, null, '$0.32'], [null, 'the 2 L jug', 'it is 3 cents cheaper for every 100 mL']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might a store put a large package with a higher unit price at eye level?',
        a: 'Shoppers think bigger is cheaper, so they grab the big package they see first. The store earns more money when people buy it without checking the unit price.', look: 'the shopper’s assumption and the store’s goal (more sales or profit)' },
      { k: 'choice', code: 'C1.3', half: true, q: 'How does the text begin?',
        opts: ['with a problem to solve', 'with a definition', 'with a list of prices', 'with a warning'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: 'Which sentence is a complex sentence (it has a dependent clause)?',
        opts: ['Is he right?', 'Sales can change the answer, too.', 'If a giant bag of spinach goes bad before you can eat it, it was not a bargain.', 'Surprise: the smaller box is the better deal.'], a: 2 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion does the author draw in the last section? Give one detail that supports it.',
        a: 'The cheapest price per gram is not always the best choice. For example, a big bag of spinach is wasted if it goes bad before you eat it.', look: 'the conclusion (think about real needs, not only the unit price) with a supporting detail' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Describe a time you or your family had to choose between sizes or brands. How could a unit rate have helped?',
        a: 'We had to choose between two packs of granola bars. Working out the price for one bar would have shown which pack was cheaper.', look: 'a real situation and a clear link to using a unit rate' }
    ]
  });

  P.add({
    id: 'g7-emily-carr', subject: 'arts', form: 'Biography',
    title: 'Painting the Living Forest',
    deck: 'Emily Carr refused to paint the West Coast the way other people expected',
    hero: {
      photo: 'g7-carr.jpg', credit: 'Painting: Emily Carr, 1939, public domain', focus: '50% 40%',
      tall: 200,
      cap: '<i>Odds and Ends</i>, painted by Emily Carr in 1939. Stumps left by loggers stand below a swirling forest and sky.'
    },
    body: [
      'Emily Carr was born in Victoria, British Columbia, in 1871. Most girls of her time were expected to marry and paint, if at all, as a pleasant hobby. Carr wanted to be a serious artist, and she was <b>determined</b> to paint the wild coast and forests of British Columbia in her own way.',
      { h: 'Learning to see' },
      'Carr studied art in San Francisco, England and France. In Paris, she saw paintings in a bold new <b>style</b>, with bright colours and strong outlines. She brought those ideas home, but many people in Victoria thought her new work was strange and ugly. Few paintings sold. For years, she earned a living by running a boarding house, raising sheepdogs and making pottery. In 1912, she travelled up the coast to paint Haida, Gitxsan and Kwakwaka’wakw villages. Then, discouraged, she painted very little for about fifteen years.',
      { fig: '<path class="k" d="M10 120 H290"/>' + ['1871', '1910', '1927', '1945'].map(function (y, i) { var x = [20, 100, 190, 280][i]; return '<circle class="dot" cx="' + x + '" cy="120" r="3"/><text class="lb" x="' + x + '" y="108" text-anchor="middle">' + y + '</text>'; }).join('') +
          '<text class="n" x="20" y="138" text-anchor="middle">born</text><text class="n" x="100" y="138" text-anchor="middle">studies</text><text class="n" x="100" y="150" text-anchor="middle">in France</text>' +
          '<text class="n" x="190" y="138" text-anchor="middle">joins a show</text><text class="n" x="190" y="150" text-anchor="middle">in Ottawa</text><text class="n" x="280" y="138" text-anchor="middle">dies</text>' +
          D.spruce(150, 84, 70) + D.spruce(176, 84, 52) + D.spruce(126, 84, 46),
        tall: 156, cap: 'A timeline of Emily Carr’s life.' },
      { h: 'Turning point' },
      'In 1927, when Carr was 56, the National Gallery of Canada included her paintings in a major show. There she met members of the Group of Seven, painters who also wanted to show Canada’s land in a new way. Lawren Harris told her, “You are one of us.” Encouraged, Carr began the greatest work of her life.',
      { h: 'The forest as a living thing' },
      'In her later paintings, the forest is not a calm background. Trees twist upward, the sky churns, and the whole canvas seems to breathe. Carr painted outdoors whenever she could, travelling in an old caravan she called the Elephant. To work quickly outdoors, she thinned her oil paint so it flowed across paper in long, loose strokes. She also wrote books about her life, and one of them won a Governor General’s Award in 1941.',
      { box: 'Looking back fairly', text: 'Carr also painted the villages and carved poles of First Nations communities on the coast. She admired them, but she painted them as if these cultures were disappearing, when the communities were very much alive. Today, First Nations artists and historians help people see her work more completely.' },
      'Carr died in 1945. Her work now hangs in galleries across Canada, and a university in Vancouver is named after her.'
    ],
    guide: { before: 'Show a Carr painting and a calm, realistic forest photo side by side, and ask what is different. Teach <b>determined</b> and <b>style</b>. Mention the Group of Seven.',
      after: 'Carr kept painting when almost no one bought her work. What keeps a person going when others do not understand what they are doing?' },
    words: [['determined', 'firmly decided; not giving up'], ['style', 'an artist’s own way of making art']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows that this text is a biography?',
        opts: ['It tells the important events of a real person’s life in order.', 'It gives instructions.', 'It argues for an opinion.', 'It is told by Emily Carr herself.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the timeline. How old was Carr when she studied in France?',
        opts: ['about 19', 'about 39', 'about 56', 'about 74'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What words would you use to describe Carr’s character? Give evidence from the text for one of them.',
        a: 'Determined and brave. She kept painting in her own style for years even though people called it strange and her work did not sell.', look: 'a fitting trait with evidence from the text' },
      { k: 'choice', code: 'C1.5', half: true, q: '“The sky churns, and the whole canvas seems to breathe.” Why does the author use these words?',
        opts: ['to show how alive the paintings feel', 'to say the paintings are damaged', 'to describe the weather', 'to explain how paint is made'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Lawren Harris told her, “You are one of us.” Why is there a comma before the quotation?',
        opts: ['It introduces the words he said.', 'It separates a list.', 'It ends the sentence.', 'It joins two sentences.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 4, q: 'Read the box “Looking back fairly.” What bias is there in some of Carr’s paintings? How are people working to correct it?',
        a: 'She painted First Nations villages as if their cultures were dying out, but the communities were alive. First Nations artists and historians now help explain the work more completely.', look: 'the bias (showing cultures as disappearing) and how it is being addressed' },
      { k: 'choice', code: 'C3.6', half: true, q: 'What did Carr face because she was a woman in her time?',
        opts: ['She was expected to paint only as a hobby.', 'She could not travel.', 'She was not allowed to write books.', 'She had to join the Group of Seven.'], a: 0 },
      { k: 'choice', code: 'C2.2', half: true, q: 'You want to choose a painting of Carr’s for a school report. Which source would be best?',
        opts: ['a gallery website with her paintings and dates', 'a cartoon about trees', 'a weather forecast for Victoria', 'a post that says “Carr was the best”'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-gps', subject: 'tech', form: 'Explanation',
    title: 'How Your Phone Knows Where You Are',
    deck: 'Satellites, clocks and a little geometry: the science behind GPS',
    hero: {
      photo: 'g7-gps-satellite.jpg', credit: 'Image: NASA, public domain', focus: '50% 50%',
      tall: 200,
      cap: 'An artist’s view of a GPS satellite in orbit, about 20 000 km above Earth.'
    },
    body: [
      'Open a map app, and a blue dot shows exactly where you are standing, sometimes within a few metres. Your phone is not guessing. It is listening to signals from satellites high in space, and it is doing some clever math very quickly.',
      { h: 'A ring of satellites' },
      'The Global Positioning System, or <b>GPS</b>, uses about 30 satellites that circle Earth twice a day. They are arranged so that at least four are above the horizon almost anywhere on the planet. Each satellite carries an extremely accurate atomic clock. Over and over, it broadcasts a radio message that says, in effect, “This is where I am, and this is the exact time.”',
      { fig: '<circle class="d" cx="90" cy="96" r="70"/><circle class="d" cx="210" cy="90" r="64"/><circle class="d" cx="150" cy="20" r="72"/>' +
          '<circle class="dot" cx="90" cy="96" r="3"/><circle class="dot" cx="210" cy="90" r="3"/><circle class="dot" cx="150" cy="20" r="3"/>' +
          '<circle class="k" cx="152" cy="88" r="6"/>' + D.label(220, 150, 'you are here', 156, 94) +
          '<text class="n" x="60" y="110">satellite 1</text><text class="n" x="214" y="104">satellite 2</text><text class="n" x="156" y="16">satellite 3</text>',
        tall: 160, cap: 'Each circle shows every point at one distance from a satellite. Only one point lies on all three circles.' },
      { h: 'Timing is everything' },
      'Radio signals travel at the speed of light, about 300 000 km every second. Your phone notes when each message arrives and compares it with the time the satellite sent it. The tiny delay tells it the distance to that satellite. Knowing one distance is not enough, because you could be anywhere on a huge circle around the satellite. With three distances, there is only one place where all the circles cross. A fourth satellite checks the timing. Tall buildings, deep valleys and thick forest can block or bounce the signals, so the blue dot sometimes jumps around downtown. Your phone sharpens its answer by also checking nearby Wi-Fi networks and cell towers. This method of finding a position from distances is called <b>trilateration</b>.',
      { box: 'A millionth of a second', text: 'If a satellite’s clock were wrong by just one millionth of a second, your position could be off by about 300 metres. That is why the clocks must be so precise.' },
      { h: 'More than maps' },
      'GPS does far more than guide drivers. Farmers use it to steer tractors in straight rows. Many hikers carry emergency beacons that send their GPS position to rescue centres by satellite. Banks and power companies use the satellites’ timing signals to keep their computers in step. Your phone also knows your location when you post a photo, which is worth thinking about before you share.'
    ],
    guide: { before: 'Ask how a map app could know where you are. Teach <b>satellite</b> and <b>signal</b>. Use three strings of different lengths pinned to a map to show how three distances meet at one point.',
      after: 'Location data can help rescuers, but it can also show strangers where you live. When should you turn location sharing off?' },
    words: [['GPS', 'Global Positioning System: satellites that help find a location'], ['trilateration', 'finding a position by measuring distances from three points']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'Which sentence best summarizes how GPS works?',
        opts: ['Your phone guesses your location from the map.', 'Your phone measures its distance from several satellites using signal timing and finds the one point that fits.', 'Satellites take photos of you from space.', 'Each satellite follows one phone.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Why does the diagram need three circles?',
        opts: ['Two circles can cross at two points; three meet at only one.', 'There are only three satellites.', 'Circles look nicer.', 'Each circle is a country.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Tri</b>lateration uses three distances. Which word also contains <b>tri-</b> meaning three?',
        opts: ['trip', 'triangle', 'trick', 'trim'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number the steps your phone follows.',
        items: ['A satellite sends its position and the time.', 'The phone notes when the signal arrives.', 'The delay tells the phone the distance.', 'The phone finds where three distances meet.'], show: [1, 3, 0, 2] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why must the satellites’ clocks be so accurate? Use the box to explain.',
        a: 'The phone measures distance from tiny time delays. If a clock was off by one millionth of a second, the position would be wrong by about 300 metres.', look: 'the link between time and distance, with the 300 m example' },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “Farmers use it to steer tractors,” what is <b>it</b>?',
        opts: ['a verb', 'a pronoun that stands for GPS', 'an adjective', 'a preposition'], a: 1 },
      { k: 'choice', code: 'C1.1', half: true, q: 'In the last paragraph, what does <b>which</b> in “which is worth thinking about” refer to?',
        opts: ['banks', 'your phone knowing your location when you post a photo', 'search-and-rescue teams', 'tractors'], a: 1 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The paragraph “Timing is everything” has many ideas. What strategy would help you understand it? Explain how.',
        a: 'I would visualize it using the diagram: picture a circle around each satellite, then see where they cross. Rereading one sentence at a time would also help.', look: 'a named strategy (visualize, reread, use the diagram, ask questions) and how it helps' }
    ]
  });

  P.add({
    id: 'g7-ice-road', subject: 'story', form: 'Short story',
    title: 'Reading the Ice',
    deck: 'Tanis rides the winter road for the first time, and learns to listen',
    hero: {
      photo: 'g7-winter-road.jpg', credit: 'Photo: Hyougushi, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'An ice road across Great Slave Lake, Northwest Territories. Winter roads like this connect northern communities for a few weeks each year.'
    },
    body: [
      'The truck’s headlights lit a narrow white road that ran straight out across the lake and disappeared into the dark. Tanis pressed her forehead against the cold window. For three months of the year, this road did not exist. Then the lake froze thick, the crews ploughed a path, and her community was joined to the rest of Manitoba until the spring <b>thaw</b>.',
      '“Listen,” said Uncle Ray, and he turned off the radio.',
      'At first Tanis heard only the engine. Then it came: a long, low groan, like a whale singing somewhere far below them, followed by a sharp crack that made her grab the door handle.',
      '“That’s the lake talking,” Uncle Ray said. “Groaning is good. It means the ice is thick and settling. It’s the silence you watch for in March, when the ice turns grey and soft.”',
      { fig: '<path class="k" d="M40 150 H290"/>' + [['15 cm', 'one person', 15], ['20 cm', 'group skating', 20], ['25 cm', 'snowmobile', 25], ['about 100 cm', 'loaded truck', 100]].map(function (r, i) {
            var x = 60 + i * 62, h = r[2] * 1.2; return '<rect class="h" x="' + x + '" y="' + (150 - h) + '" width="34" height="' + h + '"/><text class="lb" x="' + (x + 17) + '" y="' + (144 - h) + '" text-anchor="middle">' + r[0] + '</text><text class="n" x="' + (x + 17) + '" y="164" text-anchor="middle">' + r[1] + '</text>'; }).join(''),
        tall: 170, cap: 'About how thick new, clear ice must be to hold different loads. Grey or slushy ice is much weaker.' },
      'They stopped near a sign that read SLOW 25. Uncle Ray took an <b>auger</b> from the truck bed, drilled a hole beside the road and pushed a measuring stick down into the black water. “A hundred and six centimetres,” he said, satisfied. “My father checked the ice the same way, only with an axe.”',
      'Tanis knelt and peered into the hole. Near the top, the ice was as clear as glass. Lower down, it was full of tiny white bubbles, layer on layer, like the rings of a tree. Each cold night had added another one.',
      'Tanis looked at the line of red lights ahead: fuel trucks, a flatbed with lumber for the new school, a van full of hockey players heading south for a tournament. Everything her town needed for a year had to travel this road in a few short weeks.',
      '“Grandma says the road used to open in December,” she said.',
      '“It did.” Uncle Ray climbed back in. “Now it’s January, if we’re lucky. Some years it closes in February.” He was quiet for a moment. “The lake is telling us something about that too.”',
      'They drove on. The ice groaned again beneath them, and this time Tanis did not grab the door. She leaned close to the glass and listened, the way you listen to someone you are just beginning to understand.'
    ],
    guide: { before: 'Explain winter roads: many northern First Nations communities can only be reached by road when lakes and muskeg freeze. Teach <b>auger</b> and <b>thaw</b>. Read the first paragraph aloud together.',
      after: 'Uncle Ray says the lake is “telling us something.” What might it be telling people, and who should listen?' },
    words: [['auger', 'a tool that drills a round hole, such as through ice'], ['thaw', 'a time when ice and snow melt']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'From whose point of view is the story told?',
        opts: ['first person, by Tanis', 'third person, mostly following Tanis', 'first person, by Uncle Ray', 'second person'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: '“That’s the lake talking.” What literary device is this?',
        opts: ['personification', 'a list', 'a flashback', 'a rhetorical question'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is the winter road so important to Tanis’s community? Give two details.',
        a: 'For most of the year there is no road, so fuel, building supplies and other things the town needs for a whole year must come in during a few weeks. People also use it to travel, like the hockey team.', look: 'the idea that the road is the only land link for part of the year, with two details' },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Could a loaded truck safely cross the ice Uncle Ray measured?',
        opts: ['yes, the ice was thicker than about 100 cm', 'no, it needed 15 cm', 'no, trucks can never cross ice', 'the chart does not say'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author end with a simile about listening to a person?',
        opts: ['to show Tanis now respects the lake and wants to understand it', 'to show Tanis is bored', 'to introduce a new character', 'to explain how ice forms'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What is Uncle Ray hinting at when he says the road opens later and closes earlier? What is “the lake telling us”?',
        a: 'He is hinting that winters are getting warmer because of climate change. The ice forms later and melts sooner, so the road is open for less time.', look: 'an inference about warming winters, supported by the dates in the story' },
      { k: 'choice', code: 'C3.4', half: true, q: 'What does the detail about Uncle Ray’s father checking the ice with an axe show?',
        opts: ['Knowledge of the ice is passed down through the family.', 'Axes are better than augers.', 'His father did not trust him.', 'The road is new.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The ice is <b>settling</b>. In this story, <b>settling</b> means …',
        opts: ['moving into a steady position', 'making a home in a new place', 'ending an argument', 'paying a bill'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict what Tanis will do differently the next time she rides the winter road. Why?',
        a: 'She will listen to the ice instead of being scared, and maybe ask to help measure it, because she has started to understand what the sounds mean.', look: 'a prediction that follows from Tanis’s change at the end' }
    ]
  });

  P.add({
    id: 'g7-cod', subject: 'geography', form: 'Report',
    title: 'The Day the Fishing Stopped',
    deck: 'How the northern cod off Newfoundland and Labrador nearly disappeared',
    hero: {
      photo: 'g7-cod.jpg', credit: 'Photo: Wilhelm Thomas Fiege, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An Atlantic cod. For almost 500 years, this fish shaped the lives of people in Newfoundland and Labrador.'
    },
    body: [
      'When European explorers reached the Grand Banks off Newfoundland in the 1490s, they reported cod so thick that sailors could scoop them up in baskets. For centuries, the fish seemed endless. Families in hundreds of small outports fished from small boats, salted and dried their catch on wooden racks, and passed the skills from parent to child.',
      { h: 'Bigger boats, bigger catches' },
      'In the 1950s, giant factory trawlers arrived from many countries. These ships dragged huge nets along the sea floor day and night and froze the catch on board. Sonar helped crews find even the deepest schools of fish, and small boats could not compete. By 1968, more than 800 000 tonnes of northern cod were being caught in a single year. Canada pushed foreign fleets farther offshore in 1977, but then Canadian fleets grew larger too.',
      { fig: '<path class="k" d="M30 140 H290 M30 140 V14"/><path class="a" d="M36 126 L76 112 L110 92 L140 24 L170 82 L200 104 L230 96 L262 136 L284 139"/>' +
          '<text class="n" x="36" y="154" text-anchor="middle">1950</text><text class="n" x="140" y="154" text-anchor="middle">1968</text><text class="n" x="262" y="154" text-anchor="middle">1992</text>' +
          '<text class="lb" x="148" y="20">peak</text><text class="lb" x="236" y="128" text-anchor="end">collapse</text>' +
          '<text class="n" x="34" y="12">tonnes caught each year</text>',
        tall: 162, cap: 'The pattern of the northern cod catch, 1950 to 1992 (a sketch of the trend, not exact numbers).' },
      { h: 'Warnings ignored' },
      'Inshore fishers noticed something was wrong first. Their catches were smaller, and the fish were younger. Some scientists warned that the stock was being <b>overfished</b>, but the limits on catches stayed high. Every year, more fish were taken than could be replaced by young ones growing up.',
      { h: 'The moratorium' },
      'On July 2, 1992, the federal government announced a <b>moratorium</b>: a complete stop to fishing northern cod. About 30 000 people lost their jobs overnight, in the largest layoff in Canadian history. Whole towns emptied as young people moved west to find work. For many families, the loss was about more than money. Fishing was who they were.',
      { box: 'Where are they now?', text: 'The moratorium was meant to last two years. More than thirty years later, the northern cod have recovered only partly, and scientists still debate how many can safely be caught.' },
      'The cod collapse taught a hard lesson about natural resources. A resource that renews itself can still run out if people take it faster than it can grow back. Today, fisheries around the world study the story of the northern cod to avoid making the same mistake.'
    ],
    guide: { before: 'Find the Grand Banks on a map of Newfoundland and Labrador. Teach <b>renewable resource</b>, <b>overfished</b> and <b>moratorium</b>. Explain what an outport is.',
      after: 'Who should decide how many fish can be caught: scientists, fishers, the government, or all of them together? Why?' },
    words: [['overfished', 'fished so much that the fish cannot replace themselves'], ['moratorium', 'an official stop to an activity for a time']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the line graph show?',
        opts: ['The catch rose to a peak around 1968, then fell sharply by 1992.', 'The catch rose every year.', 'The catch stayed the same.', 'There were no cod before 1950.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Over</b>fished means fished too much. Which word uses <b>over-</b> the same way?',
        opts: ['overcoat', 'overcooked', 'overpass', 'overhead'], a: 1 },
      { k: 'table', code: 'C1.3', q: 'The report explains causes and effects. Fill in the chart.', cols: ['Cause', 'Effect'],
        rows: [['Factory trawlers dragged huge nets day and night.', null], ['More fish were taken than could be replaced.', null], [null, 'About 30 000 people lost their jobs.']],
        a: [[null, 'Catches grew to more than 800 000 tonnes a year.'], [null, 'The cod stock collapsed.'], ['The government stopped the cod fishery in 1992.', null]] },
      { k: 'lines', code: 'C3.5', n: 4, q: 'Inshore fishers and some scientists saw the warning signs. Why do you think catch limits stayed high anyway? Think about different points of view.',
        a: 'Companies and fishers wanted to keep earning money and jobs, and some officials believed the fish would last. Short-term jobs were put ahead of the long-term health of the cod.', look: 'more than one point of view (jobs, money, belief the stock was fine) and a reasoned explanation' },
      { k: 'choice', code: 'C3.3', q: 'What is the main lesson of the report?',
        opts: ['Cod is a delicious fish.', 'A renewable resource can still run out if it is used faster than it grows back.', 'Factory trawlers are too large.', 'Everyone should move west.'], a: 1 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why does the writer use a colon after “a <b>moratorium</b>”?',
        opts: ['to explain what the word means', 'to begin a list of dates', 'to show a quotation', 'to end the paragraph'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were the fish “younger” in the catches before the collapse?',
        opts: ['Older fish had already been caught.', 'Young fish swim faster.', 'The water was warmer.', 'Fishers preferred small fish.'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Name another natural resource that people could use up faster than it grows back. How is it like the cod?',
        a: 'Old-growth forests. If trees are cut faster than new ones can grow, the forest disappears, just as the cod did when they were caught faster than they could breed.', look: 'a fitting resource and a clear comparison to the cod' }
    ]
  });

  P.add({
    id: 'g7-quinzhee', subject: 'science', form: 'Explanation',
    title: 'Warm Inside a Pile of Snow',
    deck: 'How a snow shelter uses heat transfer to keep people alive in the cold',
    hero: {
      photo: 'g7-quinzhee.jpg', credit: 'Photo: NASA ICE, public domain', focus: '50% 55%',
      tall: 200,
      cap: 'A quinzhee, a shelter made by hollowing out a large pile of packed snow.'
    },
    body: [
      'It is −25 °C in a northern Ontario forest, and night is coming. A cold camper has no tent, but she has a shovel and plenty of snow. In a couple of hours, she can build a <b>quinzhee</b>, a dome-shaped shelter where the air may stay near 0 °C all night. How can a pile of cold snow keep anyone warm?',
      { h: 'Snow traps air' },
      'Fresh snow is mostly air. Tiny pockets of air are caught between the ice crystals, and still air is a poor conductor of heat. That makes snow an excellent <b>insulator</b>: it slows the flow of heat from a warm place to a cold place. A wall of snow 30 cm thick keeps much of the heat from people’s bodies inside the shelter.',
      { fig: '<path class="k" d="M20 140 Q30 30 150 26 Q270 30 280 140 Z"/><path class="t" d="M50 140 Q58 62 150 58 Q242 62 250 140"/>' +
          '<path class="k" d="M130 140 V122 Q150 108 170 122 V140"/><path class="t" d="M80 100 H220"/>' +
          D.arrow(150, 92, 150, 66, 'a') + D.arrow(176, 132, 200, 132, 'a') + '<path class="k" d="M148 28 V14 M152 28 V14"/>' +
          D.label(196, 18, 'air vent', 152, 20) + D.label(226, 92, 'raised sleeping bench', 210, 100) + D.label(232, 156, 'low door: cold air sinks out', 186, 136) + D.label(30, 64, 'warm air rises', 146, 80),
        tall: 166, cap: 'Inside a quinzhee. Warm air collects near the roof, above the bench, while cold air sinks toward the low door.' },
      { h: 'Three ways heat moves' },
      'Heat moves in three ways. In <b>conduction</b>, heat passes through materials that touch, which is why sitting on bare snow chills you quickly and campers sit on branches or a foam pad. In convection, warm air or water rises while cooler air sinks. In radiation, heat travels as invisible waves, the way you feel the warmth of a fire from across the room. Each person in a quinzhee gives off about as much heat as a 100-watt bulb.',
      { box: 'Built on smart design', text: 'The word quinzhee comes from Dene languages. Inuit build igloos from blocks of wind-packed snow using the same science.' },
      { h: 'Designed for warmth' },
      'Every part of a quinzhee works with these ideas. The door is dug low, so heavy cold air flows out and stays out. The sleeping bench is built higher than the door, where the warmest air collects. A small hole in the roof lets fresh air in and stale air out, which is essential for safety. Builders also let the pile of snow settle for an hour or two before hollowing it, so the crystals bond into a stronger roof.',
      'Knowing how heat moves can save lives. Hypothermia, a dangerous drop in body temperature, often begins with wind and wet clothing. Wind sweeps warm air away from the skin by convection, and wet cloth conducts heat away from the body far faster than dry cloth does. A snow shelter blocks the wind, and a dry layer of clothing keeps conduction low.'
    ],
    guide: { before: 'Feel a wool mitten and a metal spoon from the freezer and talk about which feels colder and why. Teach <b>insulator</b>, <b>conduction</b> and <b>convection</b>. Never build a snow shelter without an adult.',
      after: 'Where else do people use trapped air to stay warm? Think about clothing, windows and houses.' },
    words: [['quinzhee', 'a shelter made by hollowing out a pile of snow'], ['insulator', 'a material that slows the flow of heat'], ['conduction', 'heat moving through materials that touch']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Fill in the chart about the three ways heat moves.', cols: ['Way heat moves', 'How it works', 'Example from the text'],
        rows: [['conduction', null, null], ['convection', 'warm air rises, cool air sinks', null], ['radiation', null, 'warmth from a fire across the room']],
        a: [[null, 'heat passes through materials that touch', 'sitting on bare snow chills you'], [null, null, 'cold air flows out of the low door'], [null, 'heat travels as invisible waves', null]] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, why is the bench higher than the door?',
        opts: ['Warm air rises and collects up high.', 'It is easier to dig.', 'Snow is softer near the top.', 'The door must be hidden.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'How does the text begin?',
        opts: ['with a puzzle: how can cold snow keep you warm?', 'with a list of tools', 'with the history of igloos', 'with a definition of heat'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'Which word shares a word part with <b>insulator</b> and <b>conductor</b>, meaning “a person or thing that does something”?',
        opts: ['calculator', 'later', 'water', 'butter'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Still air is a <b>poor conductor</b> of heat.” What is <b>a poor conductor</b> in this sentence?',
        opts: ['a predicate noun that renames “still air”', 'the subject', 'a verb', 'an adverb'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why would a quinzhee without a roof vent be dangerous?',
        a: 'Without a vent, fresh air could not get in and stale air could not get out. The people inside could run short of oxygen.', look: 'the idea of fresh air and stale air, linked to safety' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'The box says quinzhee comes from Dene languages and that Inuit build igloos. What does this tell you about the knowledge behind snow shelters?',
        a: 'Indigenous peoples of the North developed this science long ago through careful observation and passed it down. Campers today still use that knowledge.', look: 'recognition that the design comes from Indigenous knowledge, developed and shared over time' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about staying warm in winter that helped you understand this text?',
        a: 'I knew that wearing layers keeps me warm because air is trapped between them. That helped me see why fluffy snow, which is full of air, is a good insulator.', look: 'a real piece of prior knowledge linked to an idea in the text' }
    ]
  });

  P.add({
    id: 'g7-black-loyalists', subject: 'history', form: 'Report',
    title: 'A Promise of Freedom',
    deck: 'The Black Loyalists who came to Nova Scotia in 1783, and what they found there',
    hero: {
      photo: 'g7-birchtown.jpg', credit: 'Photo: Madereugeneandrew, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A sign on the Heritage Trail at Birchtown, Nova Scotia, where Black Loyalists founded a settlement in 1783.'
    },
    body: [
      'During the American Revolution, from 1775 to 1783, the Thirteen Colonies fought to break away from Britain. Desperate for soldiers, British commanders made an offer to enslaved people held by the rebels: escape, join the British side, and you will be free. Thousands took the enormous risk. They worked as soldiers, guides, carpenters, cooks and nurses. They became known as the Black <b>Loyalists</b>, because they stayed loyal to the British Crown.',
      { h: 'A new beginning' },
      'When Britain lost the war, about 3 000 Black Loyalists sailed from New York to Nova Scotia. British officials wrote each person’s name, age and story in a ledger, as proof that they were free. Near the town of Shelburne, they founded Birchtown, which became the largest settlement of free Black people in North America at the time. They cleared forest, built small cabins and even dug shelters into the ground to survive the first winter. Their skills as carpenters and labourers also helped build the town of Shelburne itself.',
      { fig: '<path class="k" d="M10 80 H290"/>' + [[24, '1775', 'promise of', 'freedom'], [104, '1783', 'arrival in', 'Nova Scotia'], [184, '1784', 'Shelburne', 'riot'], [264, '1792', 'about 1 200', 'leave']].map(function (r) {
            return '<circle class="dot" cx="' + r[0] + '" cy="80" r="3"/><text class="lb" x="' + r[0] + '" y="68" text-anchor="middle">' + r[1] + '</text><text class="n" x="' + r[0] + '" y="98" text-anchor="middle">' + r[2] + '</text><text class="n" x="' + r[0] + '" y="110" text-anchor="middle">' + r[3] + '</text>'; }).join('') +
          D.arrow(264, 40, 290, 24, 'a') + '<text class="n" x="236" y="36" text-anchor="end">to Sierra Leone</text>',
        tall: 120, cap: 'Key dates in the story of the Black Loyalists in Nova Scotia.' },
      { h: 'Promises broken' },
      'Freedom did not mean equal treatment. White Loyalists received their land first, and most Black families waited years for small, rocky plots or received none at all. Many had to work for low wages to survive. In 1784, white soldiers who had lost their jobs attacked Black settlers in Shelburne, blaming them for working for less. It was one of the first race riots in North America. Many Black Loyalists faced <b>discrimination</b> for the rest of their lives.',
      { box: 'Speaking up', text: 'Thomas Peters, a Black Loyalist and former soldier, travelled to London in 1790 to complain to the British government about the broken promises. His trip led to an offer of free passage to Africa.' },
      { h: 'Leaving and staying' },
      'In 1792, nearly 1 200 Black Loyalists left Halifax in fifteen ships and sailed to Sierra Leone, in West Africa, where they helped found the city of Freetown. Among them was Boston King, a carpenter and preacher who later wrote the story of his life. Those who stayed built churches, schools and communities that lasted. Their descendants are part of Nova Scotia’s Black communities today, among the oldest in Canada.',
      'For a long time, this history was left out of textbooks. Now the heritage centre at Birchtown, opened in 2015, helps visitors understand the courage of people who risked everything for freedom.'
    ],
    guide: { before: 'Explain the American Revolution in two sentences and find Nova Scotia and Sierra Leone on a world map. Teach <b>Loyalist</b> and <b>discrimination</b>.',
      after: 'Why do you think this history was left out of textbooks for so long? What difference does it make to include it?' },
    words: [['Loyalists', 'people who stayed loyal to Britain during the American Revolution'], ['discrimination', 'unfair treatment because of who someone is']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'Which sentence best states the main idea?',
        opts: ['Birchtown is near Shelburne.', 'Black Loyalists won freedom by risking everything, but in Nova Scotia they faced broken promises and discrimination.', 'The British won the American Revolution.', 'Everyone received land quickly.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the timeline. How many years passed between the arrival in Nova Scotia and the trip to Sierra Leone?',
        opts: ['5', '9', '17', '1'], a: 1 },
      { k: 'choice', code: 'C1.1', half: true, q: '“…blaming <b>them</b> for working for less.” Who does <b>them</b> refer to?',
        opts: ['the white soldiers', 'the Black settlers', 'the British officials', 'the rebels'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did British officials record each person’s name and story in a ledger? Why would this matter so much to the settlers?',
        a: 'The ledger was proof that each person was free. Without it, they could be claimed and enslaved again by their former owners.', look: 'the idea that the record proved their freedom and protected them' },
      { k: 'table', code: 'C1.3', q: 'The report contrasts what was promised with what happened. Fill in the chart.', cols: ['What was promised or hoped for', 'What actually happened'],
        rows: [['freedom for joining the British', null], ['land to farm', null], [null, 'They faced a violent riot and discrimination.']],
        a: [[null, 'They were free, but not treated as equals.'], [null, 'Most waited years for small, rocky plots or got none.'], ['a fair, safe new life', null]] },
      { k: 'choice', code: 'B2.2', half: true, q: 'Their <b>descendants</b> live in Nova Scotia today. Who are descendants?',
        opts: ['their children, grandchildren and later family', 'their neighbours', 'their ancestors', 'their enemies'], a: 0 },
      { k: 'choice', code: 'C3.6', half: true, q: 'What does the author suggest about why the heritage centre is important?',
        opts: ['It brings a left-out part of Canada’s history into view.', 'It sells souvenirs.', 'It replaces Halifax as a city.', 'It explains how ships work.'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'What question did you ask yourself while reading this report? How did asking it help you think about the history?',
        a: 'I asked, “Why did they get worse land if they were free?” It made me notice the difference between being free and being treated equally.', look: 'a genuine question about the text and how it deepened the child’s thinking' }
    ]
  });

  P.add({
    id: 'g7-vaping', subject: 'health', form: 'Letter to the editor', plain: true,
    title: 'Vaping Is Not a Harmless Habit',
    deck: 'A Grade 7 student writes to the local newspaper',
    hero: {
      photo: 'g7-vape.jpg', credit: 'Photo: Lindsay Fox, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A vape pen, one kind of e-cigarette. Most vapes contain nicotine, a highly addictive drug.'
    },
    body: [
      'To the Editor:',
      'Last week, your paper printed a story about the new vape shop on Main Street. The owner said vaping is “a safer choice for adults.” That may be true for adults who are trying to quit smoking. But I am in Grade 7, and I want to tell your readers what vaping looks like from where I sit.',
      { h: 'It is everywhere' },
      'At my school, students vape in the washrooms between classes. Some started in Grade 6. The devices are small enough to hide in a sleeve, and they come in flavours like mango and cotton candy. Nobody my age thinks those flavours are designed for 50-year-old smokers. Online, I see videos of people blowing huge clouds and doing tricks. Nobody in those videos coughs or talks about how hard it is to stop.',
      { fig: '<path class="k" d="M60 120 Q40 70 80 40 Q120 10 170 22 Q230 30 246 76 Q256 118 214 132 Q200 150 170 146 L150 162 L146 142 Q90 146 60 120 Z"/>' +
          '<path class="h" d="M72 104 Q60 72 86 52 Q104 40 120 42 L120 110 Q96 118 72 104 Z"/>' +
          D.label(16, 30, 'front of the brain:', 90, 70) + '<text class="n" x="16" y="16">still developing until about age 25</text>' +
          D.label(212, 170, 'nicotine can affect', 200, 110) + '<text class="n" x="212" y="182">memory and focus</text>',
        tall: 186, cap: 'The front part of the brain, which helps with planning, focus and self-control, is still developing in the teen years.' },
      { h: 'The facts' },
      'Most vapes contain <b>nicotine</b>. Health Canada warns that some vape pods hold as much nicotine as a whole pack of cigarettes. Nicotine is <b>addictive</b>, and teenagers can become hooked faster than adults, because the brain is still developing until about age 25. Nicotine can affect memory, attention and mood. A friend of mine tried to quit last spring. She lasted three days and said she could not stop thinking about it. Vapes also release tiny particles and chemicals that people breathe deep into their lungs.',
      { h: 'What I am asking for' },
      'In Ontario, it is already illegal to sell vapes to anyone under 19, yet my classmates have no trouble getting them, often online or from older friends. I am asking three things. First, store owners should check ID every time, without exception. Second, our town should fund a program in schools where young people who already vape can get help to quit. Third, your newspaper should report this as a health issue, not only as a business story.',
      'Some people will say this is just another thing adults worry about. I disagree. I see it every day, and I am worried about my friends.',
      'Sincerely,<br>Maya Chen, Grade 7, Riverside Public School'
    ],
    guide: { before: 'Look at a letter to the editor in a local newspaper and point out the greeting, the opinion, the reasons and the request. Teach <b>addictive</b> and <b>nicotine</b>.',
      after: 'Is Maya’s letter convincing? Which of her three requests do you think would make the biggest difference?' },
    words: [['nicotine', 'a drug found in tobacco and most vapes'], ['addictive', 'making people feel they cannot stop using something']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which features show this is a letter to the editor?',
        opts: ['a greeting, an opinion, reasons, a request and a signature', 'chapters and a glossary', 'rhyme and rhythm', 'a cast list and stage directions'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'What is Maya’s main argument?',
        opts: ['Vape shops should all close.', 'Vaping is a serious health problem for young people, and the town must act.', 'Adults should not quit smoking.', 'Flavours should be cheaper.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Find Maya’s evidence. Fill in the chart.', cols: ['Kind of evidence', 'Example from the letter'],
        rows: [['personal experience', null], ['a fact from an expert source', null], ['a reason about how flavours are used', null]],
        a: [[null, 'Students at her school vape in the washrooms between classes.'], [null, 'Health Canada says one pod can hold as much nicotine as a pack of cigarettes.'], [null, 'Flavours like mango and cotton candy appeal to young people, not 50-year-old smokers.']] },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does Maya use the words <b>First</b>, <b>Second</b> and <b>Third</b>?',
        opts: ['to make her requests clear and easy to follow', 'to tell a story in order', 'to count her friends', 'to show the dates'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is there a colon after “To the Editor”?',
        opts: ['It is the greeting of a formal letter.', 'It begins a list.', 'It shows a quotation.', 'It ends the letter.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The vape shop owner and Maya see vaping differently. Explain each point of view in one sentence.',
        a: 'The owner sees vaping as a safer choice for adults who want to quit smoking. Maya sees it as an addictive danger that is reaching kids her age.', look: 'both perspectives stated fairly' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Is Maya’s conclusion well supported? Explain, using evidence from the letter.',
        a: 'Yes. She uses what she sees at school, a fact from Health Canada and facts about the teenage brain, so her request for action makes sense.', look: 'a judgment with at least two pieces of evidence' },
      { k: 'choice', code: 'B2.1', q: '<b>Addictive</b> is <b>addict</b> + <b>-ive</b>. What does the suffix <b>-ive</b> add to the meaning?',
        opts: ['having the quality of, or tending to', 'not', 'before', 'a person who'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-fake-photos', subject: 'tech', form: 'Explanation',
    title: 'Seeing Is Not Believing',
    deck: 'From paper fairies to deepfakes: how to check a picture before you share it',
    hero: {
      photo: 'g7-bayard.jpg', credit: 'Photo: Hippolyte Bayard, 1840, public domain', focus: '50% 30%',
      tall: 200,
      cap: '<i>Self-Portrait as a Drowned Man</i>, 1840, one of the first faked photographs. Hippolyte Bayard was alive and well.'
    },
    body: [
      'In 1917, two cousins in the village of Cottingley, England, borrowed a camera. Elsie was 16 and Frances was 9. They came back with photographs of Frances surrounded by tiny dancing fairies. The pictures fooled thousands of people, including Sir Arthur Conan Doyle, the author of the Sherlock Holmes stories. Not until 1983, when they were old women, did the cousins admit the truth: the fairies were drawings cut from a book and held up with hatpins.',
      { h: 'Easier than ever' },
      'Faking a photo once took skill and patience. Today, editing apps can erase people, change the sky or move a crowd with a few taps. Artificial intelligence can create a <b>deepfake</b>, a realistic image, video or voice of a real person doing or saying something they never did. Some fakes are made as jokes or art. Others are <b>disinformation</b>, false content created on purpose to trick people, sell something or make them angry.',
      { fig: [['S', 'Stop', 'Pause before you react or share.'], ['I', 'Investigate', 'Who made it? Can they be trusted?'], ['F', 'Find', 'Do reliable sources report it too?'], ['T', 'Trace', 'Where did the picture first appear?']].map(function (r, i) {
            var y = 18 + i * 38; return '<circle class="k" cx="22" cy="' + y + '" r="14"/><text class="lb" x="22" y="' + (y + 5) + '" text-anchor="middle">' + r[0] + '</text><text class="lb" x="46" y="' + (y - 2) + '">' + r[1] + '</text><text class="n" x="46" y="' + (y + 12) + '">' + r[2] + '</text>'; }).join(''),
        tall: 160, cap: 'SIFT: four quick moves for checking a picture or post.' },
      { h: 'Why fakes spread' },
      'False pictures travel fast because they are designed to grab feelings. A shocking image makes people want to share it before they think. Each share makes it look more believable, because it seems that “everyone” has seen it. Sometimes people share fakes without meaning harm. That is called misinformation: false information passed on by mistake. Social media apps also show people more of whatever gets the most reactions, so an angry or amazing fake can reach millions of screens within hours. Corrections, which are usually less exciting, travel much more slowly.',
      { h: 'Checking before sharing' },
      'Fact-checkers use simple habits that anyone can learn. They look for clues: odd hands, blurry edges, shadows that fall the wrong way, or text that does not make sense. They run a reverse image search to see where else the picture has appeared, and when. Most importantly, they leave the post and read what other reliable sources say. If no trustworthy news outlet has reported something astonishing, that is a warning sign. Even experts can be fooled, which is why checking is a habit, not a talent.',
      { box: 'Your turn', text: 'You do not have to decide whether every picture is real. You only have to decide whether to share it. When in doubt, don’t. Reporting a fake to the app or website can also help slow it down.' }
    ],
    guide: { before: 'Show an obviously edited photo (a cat on the Moon) and ask how you can tell. Teach <b>misinformation</b>, <b>disinformation</b> and <b>deepfake</b>. Point out the difference: on purpose or by mistake.',
      after: 'Have you ever seen a picture online that turned out to be fake? How did you find out?' },
    words: [['deepfake', 'a fake image, video or voice made with artificial intelligence'], ['disinformation', 'false information spread on purpose to mislead']],
    qs: [
      { k: 'choice', code: 'A2.3', half: true, q: 'What is the difference between misinformation and disinformation?',
        opts: ['Disinformation is shared on purpose to mislead; misinformation is shared by mistake.', 'They mean exactly the same thing.', 'Misinformation is always a photo.', 'Disinformation is always true.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'The prefixes <b>mis-</b> and <b>dis-</b> both appear in this text. What do they add to a word?',
        opts: ['a wrong or opposite meaning', 'a meaning of “again”', 'a meaning of “before”', 'a meaning of “many”'], a: 0 },
      { k: 'order', code: 'C1.4', half: true, q: 'Number the SIFT steps in order, using the chart.',
        items: ['Stop', 'Investigate the source', 'Find other coverage', 'Trace the original'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the Cottingley photographs fool so many people in 1917?',
        opts: ['Most people believed photos could not lie, and a famous author trusted them.', 'The fairies were real.', 'The cousins were famous.', 'The photos were in colour.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how the Cottingley story connects to deepfakes today. What has changed, and what has stayed the same?',
        a: 'Faking pictures is now much easier and more realistic because of apps and AI. What stays the same is that people want to believe surprising pictures and share them.', look: 'one change (ease, realism, speed) and one thing that stays the same (people are fooled, feelings)' },
      { k: 'choice', code: 'C1.1', half: true, q: '“That is called misinformation.” What does <b>That</b> refer to?',
        opts: ['sharing a fake without meaning harm', 'a reverse image search', 'a shocking image', 'a fact-checker'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is “everyone” in quotation marks?',
        opts: ['to show it only seems like everyone, not really everyone', 'to show someone said it', 'to show a title', 'to show a spelling mistake'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Which checking habit from the text do you think is most useful? Explain why it works better than just looking closely at the picture.',
        a: 'Reading what other reliable sources say. A deepfake can look perfect, but if no trusted news outlet reports it, that is a strong sign it is fake.', look: 'a chosen habit and a reasoned explanation of why it is effective' }
    ]
  });

  P.add({
    id: 'g7-seawater', subject: 'science', form: 'Explanation',
    title: 'What Is Really in Seawater?',
    deck: 'Pure substances, mixtures and the salt that comes from the sea',
    hero: {
      photo: 'g7-salt-pans.jpg', credit: 'Photo: Sandip Dey, CC BY 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Salt pans at Marakkanam, India. As the sun dries the seawater, salt crystals are left behind.'
    },
    body: [
      'A glass of seawater looks almost exactly like a glass of tap water. Taste it, though, and you know at once that something else is in there. Seawater is not one substance. It is a <b>mixture</b>, made of different substances mixed together, and most of them are invisible.',
      { h: 'Pure or mixed?' },
      'A pure substance contains only one kind of particle. Distilled water is pure: every particle in it is a water particle. Table salt is a pure substance too. When salt is stirred into water, the salt particles spread out evenly among the water particles. Now there are two kinds of particles, so the result is a mixture. Because it looks the same all the way through, it is a special kind of mixture called a <b>solution</b>. Sand stirred into water is a mixture too, but the sand settles to the bottom, and you can see the different parts. That is called a mechanical mixture.',
      { fig: '<rect class="k" x="20" y="20" width="110" height="110"/><rect class="k" x="170" y="20" width="110" height="110"/>' +
          [[40, 40], [72, 44], [104, 38], [50, 74], [86, 70], [112, 82], [36, 108], [70, 104], [104, 112]].map(function (p) { return '<circle class="t" cx="' + p[0] + '" cy="' + p[1] + '" r="7"/><circle class="t" cx="' + (p[0] + 150) + '" cy="' + p[1] + '" r="7"/>'; }).join('') +
          [[204, 56], [244, 92], [266, 50], [196, 92]].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="4"/>'; }).join('') +
          '<text class="lb" x="75" y="148" text-anchor="middle">pure water</text><text class="lb" x="225" y="148" text-anchor="middle">salt water</text>' +
          '<text class="n" x="225" y="160" text-anchor="middle">dots: salt particles</text>',
        tall: 166, cap: 'A particle view. Pure water has one kind of particle. Salt water is a solution of two kinds.' },
      { h: 'Solute and solvent' },
      'In a solution, the substance that dissolves is the solute, and the substance it dissolves in is the solvent. In seawater, salt is the solute and water is the solvent. On average, each litre of seawater holds about 35 g of dissolved salts, along with smaller amounts of magnesium, calcium and other substances. That amount is called its <b>concentration</b>. In the Dead Sea, between Israel and Jordan, the concentration is nearly ten times higher, so people float easily on its surface.',
      { box: 'Can it hold more?', text: 'Water can dissolve only so much salt. When no more will dissolve, the solution is saturated, and extra salt sinks to the bottom.' },
      { h: 'Getting the salt out' },
      'Mixtures can be separated because their parts have different properties. Water evaporates at a much lower temperature than salt, so people have harvested sea salt for thousands of years by letting the sun dry shallow ponds. Canada mines salt instead: deep under Goderich, Ontario, lies one of the largest underground salt mines in the world, left behind by an ancient sea that dried up. To get fresh drinking water instead, desalination plants heat seawater and collect the water vapour, or push it through very fine filters that let water through but stop the salt. Both methods use a lot of energy, which is one reason fresh water is so precious.'
    ],
    guide: { before: 'Stir salt into a glass of water until it disappears, and ask where it went. Teach <b>pure substance</b>, <b>mixture</b> and <b>solution</b>. Leave a saucer of salt water on a sunny windowsill to watch it dry.',
      after: 'Some dry countries depend on desalination for drinking water. What are the benefits and the costs?' },
    words: [['mixture', 'two or more substances mixed together'], ['solution', 'a mixture that looks the same all the way through'], ['concentration', 'how much of a substance is dissolved in a set amount of liquid']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Sort the substances. Write pure substance or mixture.', cols: ['Substance', 'Pure substance or mixture?'],
        rows: [['distilled water', null], ['seawater', null], ['table salt', null], ['salad dressing', null]],
        a: [[null, 'pure substance'], [null, 'mixture (a solution)'], [null, 'pure substance'], [null, 'mixture']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how can you tell that salt water is a mixture?',
        opts: ['It has two kinds of particles.', 'The box is bigger.', 'It has fewer particles.', 'The particles are moving.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Salt is the solute and water is the solvent.” What job do <b>the solute</b> and <b>the solvent</b> do here?',
        opts: ['They are predicate nouns that rename the subjects.', 'They are verbs.', 'They are adverbs.', 'They are the subjects.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do people float so easily in the Dead Sea?',
        opts: ['The water has a very high concentration of salt.', 'The water is warm.', 'There are no waves.', 'It is very deep.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which pattern organizes the section “Getting the salt out”?',
        opts: ['problem and solution', 'a story in time order', 'question and answer', 'a list of definitions'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The words <b>solute</b> and <b>solvent</b> are easy to mix up. What could you do to keep them straight?',
        a: 'I could look back at the example: salt is the solute because it dissolves, and water is the solvent. I could also notice that solvent ends with “vent,” like the bigger container.', look: 'a practical strategy such as rereading an example, making a memory trick or drawing a diagram' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author say fresh water is “precious”? Use evidence from the last paragraph.',
        a: 'Getting salt out of seawater takes a lot of energy, whether you heat it or push it through filters. Because fresh water is hard and costly to make, it is valuable.', look: 'the energy cost of desalination as the reason fresh water is valuable' },
      { k: 'choice', code: 'B2.2', q: 'A <b>saturated</b> solution …',
        opts: ['cannot dissolve any more salt', 'has no salt at all', 'is very cold', 'is always pure'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-jingle-dress', subject: 'arts', form: 'Report',
    title: 'A Dance for Healing',
    deck: 'The story and sound of the jingle dress',
    hero: {
      photo: 'g7-jingle-dress.jpg', credit: 'Photo: JMacPherson, CC BY 2.0, Wikimedia Commons', focus: '50% 35%',
      tall: 200,
      cap: 'A jingle dress dancer on Canada Day in Calgary. Rows of metal cones sound with every step.'
    },
    body: [
      'Before you see a jingle dress dancer enter the <b>powwow</b> circle, you hear her. Hundreds of small metal cones, sewn in rows on her dress, brush against one another with each step, making a sound like gentle rain. For many Anishinaabe people, that sound is a prayer.',
      { h: 'Where the dress came from' },
      'The jingle dress began among the Ojibwe, one of the Anishinaabe nations, around the end of the First World War. The details differ from community to community, and each story belongs to the people who tell it. In many versions, a girl was very sick, and her father or grandfather received a dream. The dream showed a dress covered in metal cones and taught how the dance should be done. When the girl wore the dress and danced, she grew strong again.',
      { fig: '<path class="k" d="M120 20 L180 20 L196 60 L210 150 L90 150 L104 60 Z M120 20 Q150 36 180 20"/>' +
          [70, 92, 114, 136].map(function (y) { var s = ''; for (var x = 104 + (y - 60) * 0.12; x < 200 - (y - 60) * 0.12; x += 12) s += '<path class="a" d="M' + x.toFixed(0) + ' ' + y + ' l-3 9 h6 Z"/>'; return s; }).join('') +
          D.label(220, 80, 'cones in rows', 186, 92) + D.label(220, 120, 'hand-rolled tin lids', 190, 118) + D.label(10, 44, 'the cones touch as', 108, 70) + '<text class="n" x="10" y="58">the dancer steps</text>',
        tall: 160, cap: 'A jingle dress. The number and pattern of the cones are chosen by the dancer and her family.' },
      { h: 'Making the sound' },
      'Early dancers made the cones, called jingles, by rolling up the lids of small tobacco tins. Today, many dancers still roll their own. Making a dress can take months, and families often help. The dancer’s steps are light and close to the ground, and her movements follow the drum, so the jingles ring in time with the song. Dancers wear moccasins and often carry a feather fan. Many choose colours, ribbons or beadwork with special meaning for their family.',
      { box: 'Many dancers, one purpose', text: 'In 2020, during the COVID-19 pandemic, jingle dress dancers across North America danced at home and shared videos online, offering healing to communities that could not gather.' },
      { h: 'Strong and growing' },
      'For years, Canadian laws restricted many Indigenous <b>ceremonies</b> and gatherings. Families kept their traditions alive anyway. Today the jingle dress category is one of the most popular at powwows across Canada and the United States. Young dancers learn from older ones, and the dance continues to carry its original purpose: to help people heal. Dancers also take on a responsibility: to treat the dress with respect and to dance in a good way. Many dancers say that when they dance, they are not dancing only for themselves, but for anyone who needs strength.'
    ],
    guide: { before: 'If possible, watch a short video of a jingle dress dance shared by a First Nations organization. Teach <b>powwow</b> and <b>ceremony</b>. Explain that origin stories differ between communities and are theirs to tell.',
      after: 'The dance is for healing others, not only the dancer. What other traditions do you know that bring people together to support someone?' },
    words: [['powwow', 'a gathering of First Nations people with dancing, singing and drumming'], ['ceremonies', 'formal acts or events with special meaning']],
    qs: [
      { k: 'choice', code: 'C3.4', half: true, q: 'What is the main purpose of the jingle dress dance, according to the text?',
        opts: ['to win prizes', 'to help people heal', 'to tell jokes', 'to sell dresses'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The sound of the jingles is compared to …',
        opts: ['gentle rain', 'thunder', 'a bell tower', 'birdsong'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The author writes that “each story belongs to the people who tell it.” Why do you think the author includes this sentence?',
        a: 'To show respect. The author is not from the community, so they explain that the details differ and that the Ojibwe communities own their stories.', look: 'the idea of respect and that the communities own their own stories' },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show that the text does not?',
        opts: ['how the cones are arranged in rows on the dress', 'the date the dress began', 'the name of the first dancer', 'the song the drum plays'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Laws <b>restricted</b> ceremonies. What does <b>restricted</b> mean?',
        opts: ['limited or controlled', 'paid for', 'celebrated', 'recorded'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What does the last section suggest about how the jingle dress tradition survived? What message does this give?',
        a: 'Families kept the tradition alive even when laws restricted ceremonies, and now it is growing. The message is that culture can stay strong when people pass it on.', look: 'the survival despite restrictions, and a stated message about strength or resilience' },
      { k: 'choice', code: 'C1.1', half: true, q: '“Today, many dancers still roll <b>their own</b>.” Their own what?',
        opts: ['jingles (cones)', 'drums', 'dresses', 'songs'], a: 0 },
      { k: 'choice', code: 'C2.2', half: true, q: 'You want to learn more. Which source would be most respectful and reliable?',
        opts: ['a video shared by an Ojibwe community organization', 'a costume shop ad', 'a random comment online', 'a cartoon'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'The 2020 dancers shared their dance online to offer healing. What connection can you make to a time when people found new ways to support one another?',
        a: 'During the pandemic my school held online assemblies so we could still feel together. Like the dancers, people used technology to support others when they could not meet.', look: 'a real connection and a clear link to the dancers’ purpose' }
    ]
  });

  P.add({
    id: 'g7-lanterns', subject: 'story', form: 'Allegory',
    title: 'The Village of Lanterns',
    deck: 'A tale about one small light, and what happens when it goes out',
    hero: {
      photo: 'g7-lanterns.jpg', credit: 'Photo: epSos.de, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Lanterns glowing at night. In this story, each family’s lantern lights part of a path.'
    },
    body: [
      'High in the hills stood a village with one road down to the valley. The road was narrow and steep, with a cliff on one side, and it wound past every house. Long ago, the villagers had made a promise: each family would hang a lantern at its door every night, so that anyone walking the road after dark could see the way.',
      'For a hundred years, the lanterns burned. Travellers in the valley looked up at the line of lights winding through the hills and called it the Golden Thread.',
      { h: 'The first lantern' },
      'One winter, oil grew expensive. Old Brannoc, who lived at the top of the road, looked at his lantern and <b>grumbled</b>. “Mine is only one light among sixty,” he said. “Who will notice if it goes out?” He blew it out and went to bed. The next night, he left it dark again, and he slept very well. Nobody noticed. The road was still bright enough.',
      { fig: '<path class="k" d="M10 150 Q60 140 80 110 Q100 80 150 74 Q210 68 230 40 Q246 20 290 14"/><path class="t" d="M10 160 Q70 152 90 122 Q110 92 160 86 Q220 80 240 52 Q256 30 290 26"/>' +
          [[40, 146, 1], [76, 116, 1], [110, 88, 0], [150, 78, 0], [190, 72, 0], [226, 46, 0], [262, 22, 0]].map(function (p) { return p[2] ? '<circle class="k" cx="' + p[0] + '" cy="' + (p[1] - 8) + '" r="5"/><path class="a" d="M' + (p[0] - 9) + ' ' + (p[1] - 17) + ' l-4 -4 M' + (p[0] + 9) + ' ' + (p[1] - 17) + ' l4 -4 M' + p[0] + ' ' + (p[1] - 19) + ' v-6"/>' : '<circle class="t" cx="' + p[0] + '" cy="' + (p[1] - 8) + '" r="5"/>'; }).join('') +
          D.label(150, 140, 'only a few lanterns still lit', 76, 112) + '<text class="n" x="200" y="104">valley</text><text class="n" x="246" y="12">village</text>',
        tall: 162, cap: 'By the end of the winter, only a few lanterns still burned along the road.' },
      'The next week, his neighbour saw the dark doorway. “If Brannoc won’t, why should I?” she said, and she blew hers out too. Still, the road seemed bright enough. One by one, more lanterns went dark, each family certain that its single light could not matter.',
      { h: 'The dark road' },
      'On the longest night of the year, a doctor from the valley climbed the road to reach a sick child. The Golden Thread had become a few <b>scattered</b> sparks. Halfway up, the doctor lost the path, slipped on the ice near the cliff and could go no farther. The child’s fever rose all night. Inside the house, Wren sat beside her sister and watched the window. She counted the lights she could still see on the hill. There were four.',
      'In the morning, the villagers found the doctor shivering beside the road, alive but hurt. They stood together in silence, and no one looked at anyone else.',
      { h: 'The thread again' },
      'That evening, the sick child’s younger sister, Wren, carried a candle out to her door. It was a small, wavering light. Across the road, a door opened, and another light appeared. By nightfall, every lantern on the hill was burning, and Brannoc’s, at the very top, burned brightest of all. No one made a speech. No one had to.'
    ],
    guide: { before: 'Explain that an <b>allegory</b> is a story whose characters and events stand for bigger ideas. Ask the child to watch for what the lanterns might stand for. Teach <b>allegory</b> and <b>symbol</b>.',
      after: 'What in real life is like the lanterns, where each person’s small part seems not to matter but together it does? (Think about voting, recycling, kindness or water use.)' },
    words: [['grumbled', 'complained in a low, unhappy voice'], ['scattered', 'spread far apart']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'This story is an allegory. What do the lanterns most likely stand for?',
        opts: ['each person’s small part in caring for the community', 'the price of oil', 'winter weather', 'the doctor’s skill'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who tells this story?',
        opts: ['a third-person narrator outside the story', 'Brannoc, in the first person', 'Wren, in the first person', 'the doctor'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author repeat the idea that the road was “still bright enough”?',
        opts: ['to show how each family fooled itself as the light slowly faded', 'to describe the moon', 'to make the story funny', 'to explain how lanterns work'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does “no one look at anyone else” in the morning? What are the villagers feeling?',
        a: 'They feel ashamed and guilty. Each of them blew out a lantern, so they all share the blame for the doctor’s fall and the child’s night of fever.', look: 'an emotion (shame, guilt) and the reason (they all helped cause it)' },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['only a few lanterns still lit along the winding road', 'the village from above', 'the doctor’s house', 'a map of the valley'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Mine is only one light among sixty,” he said. Why is there a comma inside the quotation marks?',
        opts: ['It separates the spoken words from “he said.”', 'It shows a list.', 'It shows the speaker is unsure.', 'It ends the story.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think Brannoc’s lantern burns “brightest of all” at the end?',
        a: 'He feels the most responsible because he blew out the first light. He wants to make up for it and show that his light matters.', look: 'an inference about Brannoc’s guilt or change of heart' },
      { k: 'lines', code: 'C2.5', n: 4, q: 'Explain the message of the story in your own words. Then connect it to a real situation.',
        a: 'Every person’s small action matters, even when it seems not to. For example, if everyone thinks their vote does not count and stays home, the result does not show what people really want.', look: 'a clear message about shared responsibility and a fitting real-world connection' }
    ]
  });

  P.add({
    id: 'g7-tecumseh', subject: 'history', form: 'Biography',
    title: 'Tecumseh’s Dream',
    deck: 'The Shawnee leader who fought to protect Indigenous lands in the War of 1812',
    hero: {
      photo: 'g7-tecumseh.jpg', credit: 'Photo: Adam Bishop, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 30%',
      tall: 200,
      cap: 'The Tecumseh memorial near Thamesville, Ontario, where he died in the Battle of the Thames in 1813.'
    },
    body: [
      'Tecumseh was born around 1768 in the Ohio Valley, the homeland of his people, the Shawnee. As a boy, he watched American settlers push farther and farther west, taking land that First Nations had lived on for generations. His father was killed fighting Virginian soldiers when Tecumseh was about six. He grew up determined to stop the loss of his people’s land.',
      { fig: '<path class="t" d="M20 30 Q80 20 120 40 Q150 60 190 54 Q230 46 290 60"/><path class="t" d="M160 100 Q200 90 250 100 Q280 108 290 120"/>' +
          place(120, 80, 'Detroit', -10, -8, true) + place(250, 118, 'Queenston Heights', -4, 16, true) + place(178, 94, 'Moraviantown', 6, -8) +
          '<text class="n" x="40" y="44">Lake Huron</text><text class="n" x="196" y="114">Lake Erie</text><text class="n" x="210" y="20">UPPER CANADA</text><text class="n" x="20" y="150">UNITED STATES</text>' +
          D.arrow(20, 120, 20, 94, 'k') + '<text class="lb" x="26" y="114">N</text>',
        tall: 160, cap: 'Places in the story, near the border between Upper Canada and the United States. The map is a sketch, not to scale.' },
      { h: 'A bold idea' },
      'Tecumseh believed that the land belonged to all Indigenous nations together, so no single nation had the right to sell it. He travelled thousands of kilometres, from the Great Lakes to the Gulf of Mexico, speaking to nation after nation. His goal was a <b>confederacy</b>, a union of many nations standing together against American expansion. He was a powerful speaker, and thousands of warriors joined him. His brother Tenskwatawa, known as the Prophet, urged people to return to traditional ways, and together the brothers founded a village called Prophetstown, where people from many nations lived.',
      { h: 'An alliance with Britain' },
      'When the War of 1812 began between the United States and Britain, Tecumseh saw a chance. He formed an <b>alliance</b> with the British, who promised to support an Indigenous homeland. In August 1812, Tecumseh and the British general Isaac Brock captured Fort Detroit without a long battle. Brock admired Tecumseh deeply. Two months later, Brock was killed at Queenston Heights.',
      { h: 'The last battle' },
      'In 1813, the Americans won control of Lake Erie, and the British commander decided to retreat. Tecumseh argued against it, but he stayed loyal to the alliance. On October 5, 1813, near Moraviantown in Upper Canada, the Americans attacked. Many British soldiers fled, but Tecumseh and his warriors kept fighting. He was killed in the battle. His body was never identified for certain, and no one knows where he is buried.',
      { box: 'Promises not kept', text: 'When the war ended in 1814, the peace treaty did not create the Indigenous homeland Tecumseh had fought for. Many historians believe that without his warriors, Upper Canada might have become part of the United States.' }
    ],
    guide: { before: 'Find the Great Lakes, Detroit and Niagara on a map. Explain the War of 1812 in two sentences. Teach <b>alliance</b> and <b>confederacy</b>.',
      after: 'The British did not keep their promise to Tecumseh’s people. How should Canadians remember Tecumseh and the nations who fought beside him today?' },
    words: [['confederacy', 'a union of groups or nations that work together'], ['alliance', 'an agreement to work together, often in a war']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What was Tecumseh’s main goal?',
        opts: ['to become a British general', 'to unite Indigenous nations to protect their lands', 'to capture Lake Erie', 'to move to Upper Canada'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['Tecumseh travels to build a confederacy.', 'Tecumseh and Brock capture Fort Detroit.', 'Brock is killed at Queenston Heights.', 'Tecumseh is killed near Moraviantown.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Where was Tecumseh’s last battle?',
        opts: ['Detroit', 'Queenston Heights', 'Moraviantown', 'Lake Huron'], a: 2 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did Tecumseh believe no single nation could sell land? How does this explain his plan?',
        a: 'He believed the land belonged to all Indigenous nations together. So he tried to unite them into one confederacy that would protect the land as a group.', look: 'the belief about shared land, linked to the plan for a confederacy' },
      { k: 'choice', code: 'B3.2', half: true, q: '“He was a powerful speaker.” What is <b>a powerful speaker</b>?',
        opts: ['a predicate noun describing Tecumseh', 'the subject', 'an adverb', 'a verb'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“Many historians believe that without <b>his</b> warriors…” Whose warriors?',
        opts: ['Tecumseh’s', 'Brock’s', 'the American general’s', 'the British commander’s'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 4, q: 'This biography is told mostly from the point of view of Tecumseh and his people. How might an American settler in 1810 have described him differently? What would that view leave out?',
        a: 'A settler might call him a dangerous enemy who blocked new farms. That view would leave out that Tecumseh was defending his people’s homeland from being taken.', look: 'a believable settler perspective and what it leaves out' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize Tecumseh’s life in two or three sentences.',
        a: 'Tecumseh was a Shawnee leader who tried to unite Indigenous nations to stop American settlers from taking their land. He allied with Britain in the War of 1812, helped capture Detroit and was killed in battle in 1813.', look: 'his goal, his role in the war and his death, in the child’s own words' }
    ]
  });

  P.add({
    id: 'g7-succession', subject: 'science', form: 'Explanation',
    title: 'After the Fire',
    deck: 'How a burned boreal forest grows back, step by step',
    hero: {
      photo: 'g7-fireweed-burn.jpg', credit: 'Photo: U.S. National Park Service, public domain', focus: '50% 70%',
      tall: 200,
      cap: 'Purple fireweed among burned trees, one year after a forest fire in the Rocky Mountains.'
    },
    body: [
      'A forest fire leaves a strange, silent landscape: black trunks, grey ash and a smell of smoke that lingers for weeks. It looks like the end of the forest. In the boreal forest that stretches across northern Canada, though, fire is part of a natural cycle. Within weeks, life begins to return in a predictable series of changes called <b>ecological succession</b>.',
      { h: 'Built for fire' },
      'Some boreal trees are ready for fire before it ever arrives. A jack pine’s cones are sealed shut with a sticky resin. They can hang on a tree for years without opening. When a fire’s heat melts the resin, the cones open and drop their seeds onto the freshly cleared ground, which is rich in minerals from the ash. Without fire, many jack pine forests would slowly disappear.',
      { fig: '<path class="k" d="M10 150 H290"/>' +
          '<path class="a" d="M30 150 v-14 m-6 6 l6 -6 l6 6 M48 150 v-10 m-5 4 l5 -4 l5 4"/>' +
          '<path class="k" d="M100 150 v-40 M92 120 q8 -16 16 0 M94 132 q6 -12 12 0 M124 150 v-30 M118 128 q6 -12 12 0"/>' +
          D.spruce(200, 150, 70) + D.spruce(176, 150, 50) + '<path class="k" d="M168 150 v-34 m-8 10 q8 -16 16 0"/>' +
          D.spruce(258, 150, 104) + D.spruce(282, 150, 84) + D.spruce(236, 150, 90) +
          '<text class="lb" x="40" y="168" text-anchor="middle">1 year</text><text class="lb" x="112" y="168" text-anchor="middle">10 years</text><text class="lb" x="188" y="168" text-anchor="middle">40 years</text><text class="lb" x="260" y="168" text-anchor="middle">100 years</text>' +
          '<text class="n" x="40" y="182" text-anchor="middle">fireweed</text><text class="n" x="112" y="182" text-anchor="middle">aspen, birch</text><text class="n" x="188" y="182" text-anchor="middle">young pine</text><text class="n" x="260" y="182" text-anchor="middle">spruce forest</text>',
        tall: 188, cap: 'Stages of succession after a boreal forest fire. The times are rough and differ from place to place.' },
      { h: 'The pioneers' },
      'The first plants to move in are called <b>pioneer species</b>. Fireweed, with its tall pink flowers, often covers a burn in its first summer. Its tiny seeds float in on the wind by the millions. Mosses and grasses spread quickly too. Their roots hold the soil in place, and when they die, they add to it.',
      { h: 'Taking turns' },
      'Next come fast-growing trees such as trembling aspen and paper birch, which love open sunlight. Moose and snowshoe hares arrive to feed on the young shoots, and predators such as lynx follow them. Slowly, the pines and spruces grow taller than the leafy trees and shade them out. After a century or more, the forest may look much like it did before the fire, until the next fire starts the cycle again.',
      { box: 'Fire as a tool', text: 'For thousands of years, many First Nations have set small, controlled fires in the right season to clear brush, renew berry patches and prevent huge wildfires. Some fire crews now work with these communities to bring back cultural burning.' },
      'Not every burn recovers the same way. Fires that are very hot, very large or happen too often can destroy the seeds and soil that succession needs. As summers grow hotter and drier, scientists are watching closely to see whether the boreal forest can keep up.'
    ],
    guide: { before: 'Show a pine cone and talk about what is inside. Teach <b>succession</b> and <b>pioneer species</b>. Point out that the diagram is a sequence: read it from left to right.',
      after: 'Should every forest fire be put out as quickly as possible? What does this text suggest?' },
    words: [['ecological succession', 'the series of changes as living things return to an area'], ['pioneer species', 'the first living things to grow in a cleared area']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the stages of succession in order.',
        items: ['Fire clears the forest.', 'Fireweed and grasses spread.', 'Aspen and birch grow.', 'Pines and spruces shade out the leafy trees.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show about how long succession takes?',
        opts: ['about a century or more', 'one summer', 'ten years', 'it never finishes'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do jack pine cones need fire?',
        opts: ['Heat melts the resin so the cones open.', 'Fire kills insects.', 'Smoke helps them grow.', 'Ash makes them heavier.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Why are the first plants called <b>pioneers</b>?',
        opts: ['Like the first settlers in a new place, they arrive first and prepare the way.', 'They grow in rows.', 'They are the tallest.', 'They come from far away.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'What text pattern does the author mostly use?',
        opts: ['sequence (stages over time)', 'problem and solution', 'compare and contrast only', 'description of one moment'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The author says a burned forest looks “like the end of the forest.” Does the text support or challenge this idea? Explain.',
        a: 'It challenges it. The text shows that fire starts a cycle of new growth: fireweed, then aspen and birch, then pines and spruces grow back.', look: 'a clear position (challenges) supported by stages from the text' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion can you draw from the last paragraph about climate and forest fires?',
        a: 'If summers keep getting hotter and drier, fires may become too hot or too frequent, and some forests may not grow back the same way.', look: 'a conclusion about hotter, drier summers making recovery harder' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does the box tell you about First Nations knowledge of fire? Why might fire crews want to learn from it?',
        a: 'First Nations have used small, controlled fires for thousands of years to care for the land. Fire crews can learn when and how to burn to prevent huge wildfires.', look: 'the long-standing knowledge and a reason it is useful today' }
    ]
  });

  P.add({
    id: 'g7-peregrine', subject: 'science', form: 'Report',
    title: 'The Falcon That Came Back',
    deck: 'How a pesticide nearly wiped out the peregrine falcon, and how people saved it',
    hero: {
      photo: 'g7-peregrine.jpg', credit: 'Photo: Carlos Delgado, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'A peregrine falcon. In a hunting dive, it can reach more than 300 km/h.'
    },
    body: [
      'The peregrine falcon is the fastest animal on Earth. It circles high above its prey, folds its wings and drops into a dive called a stoop, reaching more than 300 km/h, and snatches other birds in mid-air. Yet by the 1970s, this powerful hunter had almost vanished from eastern North America. The cause was not a predator. It was a chemical.',
      { h: 'A poison that builds up' },
      'After the Second World War, farmers and towns sprayed a <b>pesticide</b> called DDT to kill insects. It worked, but DDT does not break down easily, and animals cannot get rid of it. A small bird that eats many sprayed insects stores the DDT from all of them in its fat. A falcon that eats many small birds stores the DDT from all of those birds. With each step up the food chain, the amount grows larger. This build-up is called <b>bioaccumulation</b>.',
      { fig: [[150, 150, 120, 'sprayed plants and insects', 3], [150, 110, 90, 'small birds', 8], [150, 70, 60, 'peregrine falcon', 16]].map(function (r) {
            var s = '<rect class="k" x="' + (r[0] - r[2]) + '" y="' + (r[1] - 34) + '" width="' + (r[2] * 2) + '" height="34"/>';
            for (var i = 0; i < r[4]; i++) s += '<circle class="dot" cx="' + (r[0] - r[2] + 10 + (i * 37) % (r[2] * 2 - 16)) + '" cy="' + (r[1] - 24 + (i % 3) * 8) + '" r="2.4"/>';
            return s + '<text class="n" x="' + r[0] + '" y="' + (r[1] + 12) + '" text-anchor="middle">' + r[3] + '</text>'; }).join('') +
          '<text class="n" x="10" y="20">dots: DDT</text>',
        tall: 164, cap: 'Bioaccumulation. Each level of the food chain stores more DDT than the level below it.' },
      { h: 'Eggs that broke' },
      'The DDT did not usually kill adult falcons. Instead, it made their eggshells so thin that they cracked when the parents sat on them to keep them warm. Year after year, few chicks hatched, and at first nobody understood why. Ospreys, bald eagles and other birds of prey suffered in the same way. By 1975, scientists could find only a handful of peregrine pairs in all of southern Canada.',
      { box: 'A book that changed things', text: 'In 1962, the scientist Rachel Carson published <i>Silent Spring</i>, warning that pesticides were harming birds and other wildlife. Her book helped lead to bans on DDT.' },
      { h: 'The comeback' },
      'Canada banned most uses of DDT in the 1970s. Scientists also raised young peregrines in captivity and released them in the wild, from cliffs and from the roofs of tall buildings. City skyscrapers turned out to be excellent cliffs, with plenty of pigeons to eat. Today, peregrines nest in Toronto, Ottawa, Winnipeg and many other cities, and volunteers watch some nests on webcams and count the chicks each spring. In 2017, Canada’s scientific committee on species at risk judged that it was no longer at risk.',
      'The peregrine’s story shows how a chemical can move through a food web, and how quickly a species can recover when people remove the threat.'
    ],
    guide: { before: 'Review food chains. Teach <b>pesticide</b> and <b>bioaccumulation</b> with a simple model: one cup of water with a drop of food colouring per step, poured into a smaller and smaller cup.',
      after: 'Pesticides help farmers grow food. How can we use chemicals in ways that do not harm wildlife?' },
    words: [['bioaccumulation', 'the build-up of a substance in living things up the food chain'], ['pesticide', 'a chemical used to kill insects or other pests']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main cause of the peregrine’s decline, according to the report?',
        opts: ['DDT built up in falcons and made their eggshells too thin.', 'Hunters shot them.', 'Cities destroyed their cliffs.', 'They ran out of pigeons.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Why does the top box of the diagram have the most dots?',
        opts: ['DDT builds up at each step, so the top predator has the most.', 'Falcons are bigger.', 'Falcons eat plants.', 'The diagram is upside down.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Bio</b>accumulation contains <b>bio-</b>. Which word has the same part, meaning life?',
        opts: ['biology', 'binoculars', 'bicycle', 'bitter'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'The report follows a problem-and-solution pattern. Fill in the chart.', cols: ['Problem', 'Solution'],
        rows: [['DDT built up in food chains.', null], ['Very few chicks were hatching.', null], [null, 'Falcons nest on skyscrapers and hunt pigeons.']],
        a: [[null, 'Canada banned most uses of DDT.'], [null, 'Scientists raised young falcons and released them.'], ['Falcons needed safe, high places to nest.', null]] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did DDT harm falcons more than the insects’ other predators lower in the food chain?',
        a: 'Falcons are at the top of the food chain. Each falcon eats many birds, and each bird has eaten many insects, so the DDT from all of them builds up in the falcon.', look: 'the idea of build-up at each level, ending with the falcon at the top' },
      { k: 'choice', code: 'B3.1', half: true, q: 'Which is a complex sentence?',
        opts: ['It was a chemical.', 'It worked, but DDT does not break down easily.', 'When a falcon eats many small birds, it stores their DDT.', 'The peregrine falcon is fast.'], a: 2 },
      { k: 'choice', code: 'C2.2', half: true, q: 'Which reason for reading this report fits it best?',
        opts: ['to learn how a chemical affected wildlife and how people helped', 'to follow instructions for building a nest', 'to enjoy a funny story', 'to compare prices'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'This report is about bioaccumulation. Connect it to another text you have read about a food web or an invasive species. What is similar?',
        a: 'Like the marsh food web passage, it shows that a change at the bottom of a food web affects the animals at the top. In both, protecting one species means protecting the whole web.', look: 'a connection to another text and a clear similarity' }
    ]
  });

  P.add({
    id: 'g7-cn-tower', subject: 'science', form: 'Explanation',
    title: 'Built to Bend',
    deck: 'How the shape of the CN Tower helps it stand tall in wind, storms and lightning',
    hero: {
      photo: 'g7-toronto-skyline.jpg', credit: 'Photo: Jchmrt, CC BY-SA 4.0, Wikimedia Commons', focus: '70% 50%',
      tall: 200,
      cap: 'Toronto at sunset. The CN Tower, 553 m tall, rises far above every other building. For more than 30 years it was the tallest free-standing structure in the world.'
    },
    body: [
      'In the 1960s, Toronto had a problem. New skyscrapers downtown were blocking radio and television signals. The solution was to build an antenna so tall that its signals could pass over every building in the city. The result, finished in 1976, was the CN Tower. Its name comes from Canadian National, the railway company that built it. Its <b>form</b>, or shape, was designed above all for its <b>function</b>: to stand tall and steady while carrying signals far across the region.',
      { h: 'A three-legged base' },
      'Look at the tower from above, and its base is shaped like the letter Y. Three wide concrete legs spread out from a hollow, six-sided core. A tripod with three legs is hard to tip over, because there is always a leg braced against a push from any direction. The legs also become narrower as they rise, so the tower is heaviest and widest at the bottom, keeping its <b>centre of gravity</b> low.',
      { fig: '<path class="k" d="M70 160 L84 40 L90 40 L104 160 M87 40 V6"/><ellipse class="k" cx="87" cy="58" rx="18" ry="6"/><ellipse class="k" cx="87" cy="72" rx="14" ry="4"/>' +
          D.label(120, 14, 'antenna', 88, 12) + D.label(120, 62, 'pods: restaurant, lookouts', 105, 60) + D.label(120, 140, 'wide, heavy base', 102, 150) +
          '<path class="k" d="M230 90 L230 60 M230 90 L204 106 M230 90 L256 106"/><circle class="t" cx="230" cy="90" r="9"/>' +
          '<text class="lb" x="230" y="134" text-anchor="middle">base from above</text><text class="n" x="230" y="146" text-anchor="middle">three legs and a core</text>',
        tall: 166, cap: 'The tower narrows as it rises. From above, its three legs and six-sided core form a Y.' },
      { h: 'Swaying, not breaking' },
      'Inside the concrete, steel cables were pulled tight to squeeze the concrete together and make it stronger. Even so, the tower is designed to bend a little. In very strong winds, the top can sway about a metre from side to side. A structure that could not bend at all would be more likely to crack. Below the ground, the foundation reaches about 15 m down to solid rock.',
      { box: 'Did you know?', text: 'Lightning strikes the CN Tower about 75 times a year. Copper strips running down the tower carry the electricity safely into the ground.' },
      { h: 'Building it' },
      'The tower took about 40 months to build, and more than 1 500 people worked on it. Workers poured the concrete day and night, slowly raising a moving mould up the tower. The 102 m steel antenna on top was lifted into place in dozens of pieces by a giant helicopter. Today, visitors can stand on a glass floor 342 m above the ground or, on the EdgeWalk, circle the outside of the main pod wearing a harness. On a clear day, they can see across Lake Ontario toward Niagara Falls. Every part of the experience depends on the shape engineers chose more than fifty years ago.'
    ],
    guide: { before: 'Show a photo of the tower and a tripod camera stand. Teach <b>form</b>, <b>function</b> and <b>centre of gravity</b>. Have the child stand with feet together, then apart, while you gently push.',
      after: 'Why do you think people visit the tower for fun, even though it was built to carry signals? Can a structure have more than one function?' },
    words: [['form', 'the shape of a structure'], ['function', 'the job a structure is designed to do'], ['centre of gravity', 'the point where an object’s weight is balanced']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What was the original function of the CN Tower?',
        opts: ['to be a restaurant', 'to send radio and TV signals over tall buildings', 'to measure the wind', 'to be a lighthouse'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Connect each feature of the form to its function.', cols: ['Form (feature)', 'Function (how it helps)'],
        rows: [['Y-shaped base with three legs', null], ['narrower as it rises', null], ['copper strips down the tower', null], [null, 'carry signals far across the region']],
        a: [[null, 'braces against pushes from any direction'], [null, 'keeps the centre of gravity low'], [null, 'carry lightning safely to the ground'], ['a very tall antenna on top', null]] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the drawing of the base “from above” help you understand?',
        opts: ['the Y shape of the three legs and core', 'how tall the antenna is', 'where the restaurant is', 'how lightning works'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is a tower that bends a little safer than one that cannot bend?',
        opts: ['A stiff tower is more likely to crack in strong wind.', 'Bending makes it taller.', 'Visitors enjoy the movement.', 'It uses less concrete.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is <b>form</b> followed by a comma and “or shape,” and another comma?',
        opts: ['The commas set off a short explanation of the word.', 'They begin a list.', 'They show a quotation.', 'They end the sentence.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Free-standing</b> means …',
        opts: ['standing on its own, without cables holding it up', 'costing nothing', 'standing outside', 'able to move freely'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think engineers chose a helicopter to put the antenna on top?',
        a: 'The tower was already very tall and narrow, so a crane could not easily reach. A helicopter could lift each heavy piece straight up and place it on top.', look: 'a logical reason linked to the height and shape of the tower' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'What strategy helped you most to understand how the base works: the diagram, trying the push test, or rereading? Why?',
        a: 'Picturing a camera tripod helped most, because I already know a tripod does not tip over, so I could see why three legs are steady.', look: 'a named strategy and a clear reason it helped' }
    ]
  });

  P.add({
    id: 'g7-plains-abraham', subject: 'history', form: 'Report',
    title: 'Fifteen Minutes That Changed a Continent',
    deck: 'The Battle of the Plains of Abraham, Québec, 1759',
    hero: {
      photo: 'g7-plains-abraham.jpg', credit: 'Photo: Gabriel Picard, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The Plains of Abraham today, a large park in Québec City. In 1759, this field was a battlefield.'
    },
    body: [
      'In 1759, France and Britain were fighting the Seven Years’ War on several continents. In North America, the prize was New France, and the key to New France was the walled city of Québec, high on cliffs above the St. Lawrence River. All summer, a British fleet under General James Wolfe bombarded the city, but the French army, led by the Marquis de Montcalm, refused to come out and fight.',
      { h: 'A climb in the dark' },
      'Wolfe grew desperate. Winter was coming, and his fleet would soon have to leave before the river froze. Before dawn on September 13, he sent about 4 500 soldiers in small boats to a narrow path at the foot of the cliffs, a cove called the Anse au Foulon. They scrambled up the steep slope and, by morning, stood in battle lines on a farmer’s field called the Plains of Abraham, just outside the city walls.',
      { fig: '<path class="t" d="M10 120 Q100 110 160 128 Q220 146 290 136"/><path class="k" d="M10 100 Q90 92 150 106 Q210 118 290 110"/>' +
          '<path class="h" d="M210 40 h44 v34 h-44 Z"/>' + '<path class="a" stroke-dasharray="5 4" d="M60 132 L74 104 L96 82"/>' +
          D.arrow(96, 82, 112, 70, 'a') + '<path class="k" d="M110 60 h50 M110 66 h50"/><path class="t" d="M176 60 h26 M176 66 h26"/>' +
          D.label(196, 30, 'Québec (walled city)', 232, 40) + D.label(14, 40, 'Plains of Abraham', 130, 58) + D.label(10, 158, 'Anse au Foulon', 62, 130) +
          '<text class="n" x="200" y="150">St. Lawrence River</text><text class="n" x="112" y="80">British</text><text class="n" x="168" y="80">French</text>',
        tall: 166, cap: 'A sketch of the battle. The dashed arrow shows the British climb from the cove to the Plains.' },
      { h: 'The battle' },
      'Montcalm was surprised. Instead of waiting for more troops, he decided to attack at once. His army included French regular soldiers, Canadien <b>militia</b> and First Nations allies. The British held their fire until the French were very close, then fired together. In about fifteen minutes, the French lines broke. Canadien militia and First Nations warriors kept firing from the woods at the edge of the field, covering the retreat. Both commanders were badly wounded. Wolfe died on the field. Montcalm died the next morning.',
      { box: 'Not only two armies', text: 'Many First Nations, including the Wendat, Mi’kmaq and Abenaki, fought as allies of the French. They had their own interests: protecting their lands and their trade.' },
      { h: 'What came next' },
      'Québec <b>surrendered</b> a few days later. Montréal fell the next year, and in 1763 the Treaty of Paris handed New France to Britain. About 70 000 French-speaking Canadiens suddenly found themselves living under a British king, with a different language and religion. The British promised that they could keep their homes, property and Catholic faith. How Britain would govern them became one of the great questions of Canada’s history. Today, the Plains are a peaceful park where people walk, skate and listen to concerts.'
    ],
    guide: { before: 'Find Québec City and the St. Lawrence River on a map. Explain that Britain and France were rivals for North America. Teach <b>militia</b> and <b>surrender</b>.',
      after: 'How might a Canadien family in Québec have felt in 1763? What would they worry about, and what might stay the same?' },
    words: [['militia', 'ordinary citizens trained to fight when needed'], ['surrendered', 'stopped fighting and gave up to the enemy']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the events in order.',
        items: ['The British fleet bombards Québec all summer.', 'British soldiers climb the cliff in the dark.', 'The French lines break after about fifteen minutes.', 'The Treaty of Paris hands New France to Britain.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the sketch. Where did the British land?',
        opts: ['at the Anse au Foulon, below the cliffs', 'inside the walled city', 'on the far side of the river', 'at Montréal'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Wolfe feel he had to act before winter?',
        opts: ['The river would freeze and his fleet would have to leave.', 'He wanted to go skating.', 'Montcalm invited him to fight.', 'The treaty was signed in winter.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Was Montcalm’s decision to attack at once a good one? Use evidence from the text to explain.',
        a: 'Probably not. He did not wait for more troops, and the British, who were ready in lines, broke his army in about fifteen minutes.', look: 'a judgment supported by details (no waiting for troops, quick defeat)' },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> had their own interests.” Who are <b>They</b>?',
        opts: ['the First Nations allies', 'the British', 'the generals', 'the Canadiens in Montréal'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“They <b>scrambled</b> up the steep slope.” What does the adverbial phrase <b>up the steep slope</b> tell you?',
        opts: ['where they scrambled', 'when they scrambled', 'why they scrambled', 'who scrambled'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 4, q: 'Many history books tell this story as a contest between two generals. What does the box add? Why is it important to include?',
        a: 'It shows that First Nations fought too, for their own reasons: their lands and trade. Leaving them out would give an incomplete and biased story.', look: 'the First Nations perspective and why leaving it out creates bias' },
      { k: 'choice', code: 'C2.3', q: 'Before reading, you might predict the battle lasted weeks. Which detail shows you should adjust that prediction?',
        opts: ['“In about fifteen minutes, the French lines broke.”', '“All summer, a British fleet bombarded the city.”', '“Montréal fell the next year.”', '“Today, the Plains are a park.”'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-iceland', subject: 'geography', form: 'Report',
    title: 'A Country Built on Fire',
    deck: 'How the people of Iceland live with volcanoes, and use their heat',
    hero: {
      photo: 'g7-iceland-eruption.jpg', credit: 'Photo: DCheretovich, CC0, Wikimedia Commons', focus: '50% 60%',
      tall: 200,
      cap: 'Lava pours from a crack in the ground during an eruption on Iceland’s Reykjanes Peninsula in 2023.'
    },
    body: [
      'Iceland sits right on top of the Mid-Atlantic Ridge, where the North American and Eurasian plates are pulling apart. Beneath the island, a plume of extra-hot rock also rises from deep inside Earth. The result is one of the most volcanic places on the planet. An eruption happens somewhere in Iceland every few years.',
      { h: 'Cracks that open' },
      'Many Icelandic eruptions are not cone-shaped mountains that explode. Instead, the ground splits open in a long crack called a fissure, and runny <b>lava</b> fountains out along it. In 2021, a fissure opened near Fagradalsfjall, a mountain less than 40 km from the capital, Reykjavík. It was the first eruption on that peninsula in about 800 years, and thousands of people hiked out to watch the glowing rivers of rock.',
      { fig: '<path class="k" d="M10 70 H120 M180 70 H290"/><path class="k" d="M120 70 L134 120 M180 70 L166 120"/><path class="t" d="M10 92 H130 M170 92 H290"/>' +
          '<path class="a" d="M150 150 Q146 120 150 96 Q154 80 150 62 M150 62 q-10 -16 -16 -30 M150 62 q10 -16 16 -30"/>' +
          D.arrow(110, 50, 60, 50, 'k') + D.arrow(190, 50, 240, 50, 'k') +
          '<text class="n" x="20" y="40">North American Plate</text><text class="n" x="196" y="40">Eurasian Plate</text>' +
          D.label(196, 150, 'magma rises into the gap', 152, 124) + D.label(196, 18, 'lava fountains', 164, 32),
        tall: 160, cap: 'As the plates pull apart, magma rises and erupts through long cracks.' },
      { h: 'When it gets dangerous' },
      'Not all eruptions are a show. In 2010, the volcano Eyjafjallajökull erupted under a glacier. Meltwater and lava created huge clouds of fine ash that drifted over Europe. Because ash can damage jet engines, about 100 000 flights were cancelled over several days. In 2023, the town of Grindavík, home to about 3 700 people, was evacuated as the ground cracked and magma moved underneath. Workers built huge earth walls to steer lava away from homes and a power plant.',
      { box: 'Hot water for free', text: 'Water heated deep underground by volcanic rock is pumped up to heat about nine out of ten homes in Iceland. Many towns also have warm outdoor swimming pools all year round.' },
      { h: 'Using the heat' },
      'Icelanders have turned the danger into a resource. <b>Geothermal</b> power plants use underground steam to spin turbines and make electricity. Greenhouses heated by hot springs grow tomatoes and bananas just below the Arctic Circle. Scientists also place GPS stations and earthquake sensors across the country to watch for magma on the move. Before an eruption, thousands of small earthquakes may shake the ground in just a few days. Living on a volcano is risky, but careful monitoring, good planning and clean energy make it possible to thrive there.'
    ],
    guide: { before: 'Review the three kinds of plate boundary. Find Iceland on a world map and point out the ridge running through it. Teach <b>fissure</b>, <b>lava</b> and <b>geothermal</b>.',
      after: 'Would you choose to live in Grindavík? What would you need to feel safe there?' },
    words: [['lava', 'melted rock that comes out of the ground'], ['geothermal', 'using heat from deep inside Earth']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'Which sentence best states the main idea?',
        opts: ['Iceland is cold.', 'Icelanders live with the dangers of volcanoes and also use their heat.', 'Volcanoes always explode.', 'All flights in Europe stopped forever.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['magma rising where two plates pull apart', 'a glacier melting', 'a power plant', 'an aircraft engine'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Geo</b>thermal has <b>geo-</b> (earth) and <b>therm</b> (heat). Which word also means earth + something?',
        opts: ['geography', 'thermos', 'gesture', 'theme'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Compare the two eruptions. Fill in the chart.', cols: ['', 'Fagradalsfjall, 2021', 'Eyjafjallajökull, 2010'],
        rows: [['What happened', null, 'erupted under a glacier, making clouds of ash'], ['Effect on people', null, null]],
        a: [[null, 'a fissure opened and lava fountained out', null], [null, 'thousands hiked out to watch', 'about 100 000 flights were cancelled']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did the 2010 eruption affect people far away in Europe, while the 2021 eruption did not?',
        a: 'The 2010 eruption was under a glacier, so it made huge clouds of ash that drifted over Europe and grounded planes. The 2021 eruption had runny lava without much ash.', look: 'the role of the glacier and ash compared with runny lava' },
      { k: 'choice', code: 'B3.3', half: true, q: '“…a mountain less than 40 km from the capital, Reykjavík.” Why is there a comma before <b>Reykjavík</b>?',
        opts: ['It sets off the name of the capital.', 'It ends a list.', 'It shows a pause before a quotation.', 'It joins two sentences.'], a: 0 },
      { k: 'choice', code: 'C2.2', half: true, q: 'Which purpose would this report suit best?',
        opts: ['a project on how people adapt to natural hazards', 'a recipe for bananas', 'a story about dragons', 'a guide to buying a car'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Connect this report to what you know about plate boundaries from another text. How does that knowledge help explain Iceland’s volcanoes?',
        a: 'I read that at some boundaries plates pull apart and hot rock rises to fill the gap. Iceland sits on such a boundary, which is why magma keeps erupting there.', look: 'a link to prior learning about divergent boundaries, applied to Iceland' }
    ]
  });

  P.add({
    id: 'g7-teen-sleep', subject: 'health', form: 'Explanation',
    title: 'Why Teens Can’t Fall Asleep',
    deck: 'Your body clock shifts as you grow, and that changes everything about sleep',
    hero: {
      photo: 'g7-alarm-clock.jpg', credit: 'Photo: Santeri Viinamäki, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An alarm clock. Many teenagers need more sleep than they get on school nights.'
    },
    body: [
      'When you were younger, you probably felt sleepy at 8 or 9 at night. Now you may lie awake until 11, then struggle to wake up for school. Adults sometimes think teenagers are just being lazy or staying up on purpose. Scientists have found that something real is going on inside the body.',
      { h: 'The body clock' },
      'Your body runs on a roughly 24-hour cycle called a <b>circadian rhythm</b>. It controls when you feel alert and when you feel sleepy. As evening comes, your brain releases a hormone called <b>melatonin</b>, which tells your body it is time to rest. During the teen years, the brain starts releasing melatonin later, often about two hours later than before. So a 13-year-old may not feel sleepy until 10:30 or 11, even if they are tired.',
      { fig: '<path class="k" d="M20 130 H290"/>' + ['6 p.m.', '8 p.m.', '10 p.m.', 'midnight', '2 a.m.'].map(function (t, i) { var x = 30 + i * 62; return '<path class="t" d="M' + x + ' 126 v8"/><text class="n" x="' + x + '" y="148" text-anchor="middle">' + t + '</text>'; }).join('') +
          '<rect class="t" x="92" y="76" width="198" height="20"/><rect class="h" x="154" y="36" width="136" height="20"/>' +
          '<text class="lb" x="20" y="90">child</text><text class="lb" x="20" y="50">teen</text>' +
          '<text class="n" x="96" y="110">melatonin starts</text><text class="n" x="158" y="70">starts about 2 hours later</text>',
        tall: 156, cap: 'Melatonin, the sleep signal, starts later in the evening in the teen years.' },
      { h: 'How much is enough?' },
      'Canadian guidelines say that young people aged 5 to 13 need 9 to 11 hours of sleep a night, and teens aged 14 to 17 need 8 to 10. If you fall asleep at 11 and wake at 6:30, you get only seven and a half hours. Over a week, the lost hours add up to a <b>sleep debt</b>. It can make it harder to pay attention, remember what you learn, control your mood and stay healthy. It can even affect safety: tired people react more slowly, which matters on a bike, on the ice or, later, behind the wheel of a car.',
      { box: 'Screens and sleep', text: 'The light from phones and tablets can delay melatonin even more. Putting screens away an hour before bed, and keeping them out of the bedroom, can help you fall asleep sooner.' },
      { h: 'What helps' },
      'You cannot change your biology, but you can work with it. Going to bed and waking up at about the same time every day, even on weekends, keeps the body clock steady. Morning light, exercise during the day and a calm bedtime routine all help. Caffeine in the afternoon, from cola, iced tea or energy drinks, can keep you awake for hours. Some school boards in North America have also moved high school start times later. Studies of those schools found that students slept longer, were less tired in class and were late less often.'
    ],
    guide: { before: 'Ask what time the child usually feels sleepy, and whether that has changed. Teach <b>circadian rhythm</b> and <b>melatonin</b>. Show how to read the time bars in the diagram.',
      after: 'Should schools start later for older students? What would be the benefits and the problems?' },
    words: [['circadian rhythm', 'the body’s 24-hour cycle of sleeping and waking'], ['melatonin', 'a hormone that makes you feel sleepy'], ['sleep debt', 'the total sleep you have missed over several nights']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Teenagers are lazy.', 'Changes in the teen body clock make it harder to fall asleep early, so teens need good sleep habits.', 'Alarm clocks should be banned.', 'Children need less sleep than teens.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. About when does melatonin start for the teen?',
        opts: ['about 10 p.m.', 'about 6 p.m.', 'about 8 p.m.', 'about 2 a.m.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'The first paragraph sets up a contrast. Between what?',
        opts: ['what adults think and what scientists have found', 'cats and dogs', 'school and home', 'morning and night only'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Work out the sleep. Fill in the chart.', cols: ['Bedtime', 'Wake-up time', 'Hours of sleep', 'Enough for a 13-year-old?'],
        rows: [['11 p.m.', '6:30 a.m.', '7.5', null], ['9:30 p.m.', '7 a.m.', null, null]],
        a: [[null, null, null, 'no (needs 9 to 11)'], [null, null, '9.5', 'yes']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author say teens may not feel sleepy “even if they are tired”? Use the text to explain.',
        a: 'Their bodies release melatonin about two hours later, so the sleep signal comes late. They can be tired from the day but still not get the signal to fall asleep.', look: 'the link between delayed melatonin and not feeling sleepy' },
      { k: 'choice', code: 'B2.2', half: true, q: 'What is a <b>sleep debt</b>, using the meaning of debt?',
        opts: ['sleep you owe your body because you missed it', 'money spent on beds', 'a dream about money', 'extra sleep you have saved'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: 'Which is a complex sentence?',
        opts: ['Morning light helps.', 'If you fall asleep at 11 and wake at 6:30, you get only seven and a half hours.', 'You cannot change your biology.', 'Your body runs on a cycle.'], a: 1 },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Did you make a personal connection while reading? Explain how connecting the text to your own sleep helped you understand it.',
        a: 'Yes. I noticed I cannot fall asleep before 10:30 now, even though I used to at 9. Connecting to that made the idea of melatonin starting later make sense.', look: 'a personal connection and how it helped understanding' }
    ]
  });

  P.add({
    id: 'g7-percent-sale', subject: 'math', form: 'Explanation',
    title: 'What Does 40% Off Really Mean?',
    deck: 'Percents, discounts and sales tax: doing the math before you pay',
    hero: {
      photo: 'g7-sale-sign.jpg', credit: 'Photo: TheDigitel Beaufort, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A store sign promising 75% off. Percent signs are everywhere when stores want you to buy.'
    },
    body: [
      'Jonah has saved $60 for a pair of running shoes. In the store window, a sign says EVERYTHING 40% OFF. The shoes he wants have a price tag of $90. Can he afford them? To answer, he needs to understand what a <b>percent</b> is and how stores use it.',
      { h: 'Out of one hundred' },
      'Percent means “out of 100.” So 40% means 40 out of every 100, or 40 hundredths. A 40% discount means that for every $100 of the price, you save $40. To find the discount on $90, multiply 90 by 0.40. The discount is $36, so the sale price is $90 − $36 = $54. A quicker way is to notice that if you save 40%, you still pay 60%. And 60% of $90 is $54.',
      { fig: '<rect class="k" x="20" y="40" width="260" height="40"/><rect class="h" x="20" y="40" width="156" height="40"/>' +
          '<path class="t" d="M176 36 V84"/><text class="lb" x="98" y="30" text-anchor="middle">you pay 60%: $54</text><text class="lb" x="228" y="30" text-anchor="middle">you save 40%: $36</text>' +
          '<text class="n" x="20" y="100">$0</text><text class="n" x="280" y="100" text-anchor="end">$90</text>' +
          '<rect class="k" x="20" y="120" width="260" height="22"/><rect class="h" x="20" y="120" width="176" height="22"/><text class="n" x="200" y="136">+ 13% HST = about $61</text>',
        tall: 150, cap: 'A percent bar. The whole bar is the original price, $90. The lower bar adds sales tax to the sale price.' },
      { h: 'Do not forget the tax' },
      'Jonah does the math and smiles. Then he remembers something. In Ontario, most purchases have a 13% <b>sales tax</b>, called the HST, added at the cash register. Children’s clothing and footwear are exempt from part of it, but these are adult-size shoes. So 13% of $54 is about $7.02, and the total comes to about $61.02. Jonah is just over a dollar short.',
      { box: 'Watch the words', text: '“Up to 70% off” means that at least one item has 70% off. Most items may have much less. Read the small print before you get excited. Prices ending in .99 work the same way: $19.99 feels closer to $19 than to $20.' },
      { h: 'Discounts on discounts' },
      'Next week, the store advertises an extra 20% off sale prices. Does 40% plus 20% make 60% off? No. The second discount is taken from the new, lower price, not the original one. Twenty per cent of $54 is $10.80, so the price drops to $43.20. Compared with the original $90, that is a total discount of 52%, not 60%. Stores rely on shoppers adding percents in their heads and getting the wrong answer.',
      { h: 'Thinking like a shopper' },
      'Percents are useful, but they can hide the actual dollars. A 50% discount on a $10 shirt saves you $5, while 10% off a $200 bike saves $20. Before you buy, change the percent into dollars, add the tax and ask the most important question of all: do I actually need this? The same skills will help you for life, because interest on savings and loans is measured in percents too.'
    ],
    guide: { before: 'Review changing a percent to a decimal (40% = 0.40). Teach <b>percent</b>, <b>discount</b> and <b>sales tax</b>. Use a store flyer to find a few discounts together.',
      after: 'Find a sale price in a flyer. Work out the price with tax. Is it really a good deal?' },
    words: [['percent', 'a number out of 100'], ['sales tax', 'money added to a price that goes to the government']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Use the methods in the text. Fill in the chart.', cols: ['Original price', 'Discount', 'Sale price'],
        rows: [['$90', '40%', null], ['$50', '20%', null], ['$200', null, '$150']],
        a: [[null, null, '$54'], [null, null, '$40'], [null, '25%', null]] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the top bar, why is the shaded part longer than the white part?',
        opts: ['Jonah pays 60%, which is more than the 40% he saves.', 'The tax is large.', 'The shoes cost $60.', 'It shows two pairs of shoes.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is 40% off followed by 20% off not the same as 60% off?',
        opts: ['The second discount is taken from the lower sale price.', 'The store adds tax twice.', 'Percents cannot be added.', 'The sign was wrong.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Per cent</b> comes from Latin words meaning “for each hundred.” Which word also has <b>cent</b> meaning hundred?',
        opts: ['century', 'centre', 'scent', 'accent'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'What does the dash in “$90 − $36 = $54” show?',
        opts: ['It is a minus sign, meaning subtract.', 'It shows a pause.', 'It joins two words.', 'It shows a missing word.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The text says, “Stores rely on shoppers adding percents in their heads and getting the wrong answer.” Is this fair to stores? Explain both sides.',
        a: 'It may be fair, because some signs are designed to make deals look bigger than they are. But stores also give real discounts, and it is the shopper’s job to check the math.', look: 'two sides considered, with a reason for each' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What advice does the author give in the last paragraph? Why is it good advice?',
        a: 'Change the percent into dollars, add the tax and ask if you really need it. It is good advice because percents can hide how much you really pay or save.', look: 'the steps of the advice and a reason it helps' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Which thinking skill helped you most to check the “extra 20% off” claim: estimating, calculating step by step, or comparing with the original price? Explain.',
        a: 'Calculating step by step, because I worked out $54 minus $10.80 and saw the real total discount was 52%, not 60%.', look: 'a chosen thinking skill and how it revealed the truth' }
    ]
  });

  P.add({
    id: 'g7-throat-singing', subject: 'arts', form: 'Report',
    title: 'A Song Made of Breath',
    deck: 'Katajjaq, the Inuit tradition of throat singing',
    hero: {
      photo: 'g7-throat-singers.jpg', credit: 'Photo: Ansgar Walk, CC BY-SA 2.5, Wikimedia Commons', focus: '50% 35%',
      tall: 200,
      cap: 'Two Inuit throat singers face each other, close enough to feel each other’s breath.'
    },
    body: [
      'Two women stand face to face, so close that they can almost touch. One begins a short, rhythmic sound, deep in her throat. The other answers with a different sound, fitting it into the gaps. Their voices weave together faster and faster, until one of them runs out of breath or bursts out laughing, and the game is over. This is <b>katajjaq</b>, Inuit throat singing.',
      { h: 'A game and a song' },
      'Throat singing is traditionally done by women. In the past, while men were away hunting, women and girls sang together in the iglu or the tent to pass the long hours, entertain children and challenge one another. Each pattern of sounds has a name, and many imitate the world around them: geese, the wind, a river, a saw cutting wood. The sounds are made both while breathing in and while breathing out, which takes great skill and control. Singers often hold each other’s arms and sway gently as they sing.',
      { fig: '<path class="k" d="M10 70 H290"/>' +
          '<path class="a" d="M10 50 q8 -24 16 0 t16 0 M74 50 q8 -24 16 0 t16 0 M138 50 q8 -24 16 0 t16 0 M202 50 q8 -24 16 0 t16 0 M266 50 q8 -24 16 0"/>' +
          '<path class="k" d="M42 96 q8 20 16 0 t16 0 M106 96 q8 20 16 0 t16 0 M170 96 q8 20 16 0 t16 0 M234 96 q8 20 16 0 t16 0"/>' +
          '<text class="lb" x="10" y="20">singer 1</text><text class="lb" x="10" y="136">singer 2</text>' +
          '<text class="n" x="150" y="150" text-anchor="middle">time →</text>',
        tall: 156, cap: 'Each singer fills the gaps in the other’s rhythm, so the sound never stops.' },
      { h: 'Nearly silenced' },
      'In the early 1900s, Christian missionaries in the Arctic discouraged throat singing and other Inuit traditions, and many families stopped teaching it. By the 1980s, only a few elders in some communities still knew the songs. Inuit women worked hard to bring them back. They recorded elders, taught young people and performed at festivals and in schools. Many of those recordings are now kept safely in archives, so future singers can learn from them.',
      { box: 'Protected heritage', text: 'In 2014, the Government of Québec recognized katajjaq as part of the province’s official cultural <b>heritage</b>, the first time it had given that status to an intangible tradition: something that lives in people rather than in an object.' },
      { h: 'A living tradition' },
      'Today, throat singing is strong and changing. Young Inuit women perform in pairs at community events and on stages around the world, and some artists combine katajjaq with rock, electronic music or orchestras. Some perform solo, a new way of using an old sound. Many say that throat singing connects them to their grandmothers, their language and the land. It is also still a game: when two singers meet, the challenge to keep going without laughing is as hard as ever.'
    ],
    guide: { before: 'If possible, listen to a short throat-singing recording shared by an Inuit organization. Teach <b>tradition</b> and <b>heritage</b>. Find Nunavut and Nunavik (northern Québec) on a map.',
      after: 'Why does it matter that the songs were recorded from elders? What traditions in your family would you want to keep?' },
    words: [['katajjaq', 'Inuit throat singing, often a game for two'], ['heritage', 'traditions and culture passed down from earlier generations']],
    qs: [
      { k: 'choice', code: 'C3.4', half: true, q: 'What does throat singing connect many singers to, according to the text?',
        opts: ['their grandmothers, language and the land', 'a sports team', 'a company', 'a school subject only'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['two singers filling the gaps in each other’s rhythm', 'a map of the Arctic', 'how loud each singer is', 'the words of the song'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number these events in order.',
        items: ['Women sing katajjaq while men are away hunting.', 'Missionaries discourage the tradition.', 'Inuit women record elders and teach young people.', 'Québec recognizes katajjaq as cultural heritage.'], show: [1, 3, 0, 2] },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How did the actions of missionaries in the early 1900s affect throat singing? How do Inuit artists today respond to that history?',
        a: 'Missionaries discouraged the tradition, so families stopped teaching it and it nearly disappeared. Today Inuit women have revived it, teaching it and performing it proudly around the world.', look: 'the effect of the historical event and the present-day revival' },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>intangible</b> tradition is one that …',
        opts: ['lives in people and cannot be touched like an object', 'is very old', 'is written in a book', 'costs money'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'In the box, why is there a colon after “intangible tradition”?',
        opts: ['It introduces an explanation of the term.', 'It starts a list of names.', 'It shows a quotation.', 'It ends the paragraph.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The text says throat singing is “strong and changing.” Give two pieces of evidence that support this.',
        a: 'Young women perform in pairs at events and on world stages. Some artists combine it with rock or electronic music, and some perform solo.', look: 'two details showing strength and change' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about singing, games or the Arctic that helped you picture katajjaq?',
        a: 'I know clapping games where you have to keep the rhythm without making a mistake. That helped me picture two singers trying to keep going without laughing.', look: 'a real piece of prior knowledge connected to the text' }
    ]
  });

  P.add({
    id: 'g7-3d-printing', subject: 'tech', form: 'Explanation',
    title: 'Building Things One Layer at a Time',
    deck: 'How 3D printers work, and why they are changing how things are made',
    hero: {
      photo: 'g7-3d-printer.jpg', credit: 'Photo: Subhashish Panigrahi, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A 3D printer at work. A hot nozzle lays down thin lines of melted plastic, layer by layer.'
    },
    body: [
      'For most of history, people made objects by starting with a block of material and taking some away. A carver chips at wood. A machine drills and cuts metal. This is called <b>subtractive manufacturing</b>, and it often leaves a pile of waste on the floor. A 3D printer works the opposite way. It starts with nothing and adds material only where it is needed, one thin layer at a time.',
      { fig: '<rect class="k" x="110" y="14" width="40" height="22"/><path class="k" d="M124 36 L130 50 L136 36"/><path class="t" d="M60 20 Q90 6 110 22"/>' +
          '<path class="k" d="M40 140 H220"/>' + [130, 122, 114, 106, 98, 90, 82, 74, 66].map(function (y, i) { var w = 60 - Math.abs(4 - i) * 4; return '<path class="t" d="M' + (130 - w) + ' ' + y + ' H' + (130 + w) + '"/>'; }).join('') +
          D.label(170, 26, 'hot nozzle', 150, 26) + D.label(4, 40, 'filament', 74, 14) + D.label(196, 98, 'layers', 182, 98) + D.label(186, 158, 'printer bed', 160, 140) +
          D.arrow(244, 70, 244, 120, 'a') + '<text class="n" x="250" y="90">bed</text><text class="n" x="250" y="102">drops</text>',
        tall: 166, cap: 'The nozzle draws each layer; the bed drops a little so the next layer can go on top.' },
      { h: 'From screen to object' },
      'It begins with a digital design, drawn in a 3D modelling program or downloaded from a library of designs. Special software slices the design into hundreds of flat layers, each thinner than a sheet of cardboard. Then the printer gets to work. In the most common kind, a spool of plastic thread called filament feeds into a hot nozzle, where it melts. The nozzle moves back and forth, drawing the first layer onto a flat bed. When the layer cools and hardens, the bed drops slightly, and the nozzle draws the next layer on top.',
      { h: 'Why it matters' },
      'Because a printer adds material only where it is needed, <b>additive manufacturing</b> wastes very little. It can make shapes that would be impossible to cut from a block, such as a ball inside a cage. It is also fast to change: a designer can fix a mistake on screen and print a new version the same day.',
      'These advantages are changing many fields. Volunteers around the world print low-cost prosthetic hands for children, which can be resized as the child grows. Dentists print models of teeth. Engineers print rocket parts, and builders have printed small concrete houses. In 2014, astronauts on the International Space Station printed a wrench from a design emailed up from Earth.',
      { box: 'Not perfect yet', text: 'Most home printers are slow: a small object can take hours. Many plastic prints are not strong enough for heavy loads, and failed prints still create waste.' },
      { h: 'Made from plants' },
      'One popular filament, PLA, is made from plant starch, such as corn. It can be composted in industrial facilities, though not in a backyard bin. Researchers are now testing printers that use recycled plastic bottles as their raw material.'
    ],
    guide: { before: 'Build a small tower from flat layers of play dough or paper to show how layers add up. Teach <b>additive</b> and <b>subtractive</b> by contrasting building with blocks and carving soap.',
      after: 'If your school had a 3D printer, what problem would you design something to solve?' },
    words: [['subtractive manufacturing', 'making an object by cutting material away'], ['additive manufacturing', 'making an object by adding material layer by layer']],
    qs: [
      { k: 'table', code: 'C1.3', q: 'The text compares two ways of making things. Fill in the chart.', cols: ['', 'Subtractive', 'Additive (3D printing)'],
        rows: [['How it works', null, 'adds material layer by layer'], ['Waste', null, null], ['Example', 'a carver chipping wood', null]],
        a: [[null, 'takes material away from a block', null], [null, 'often a pile of waste', 'very little'], [null, null, 'a printed prosthetic hand']] },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps of 3D printing.',
        items: ['Make or download a design.', 'Software slices it into layers.', 'The nozzle draws the first layer.', 'The bed drops and the next layer is added.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, why does the bed drop?',
        opts: ['to make room for the next layer', 'to cool the nozzle', 'to remove waste', 'to change colours'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Sub</b>tractive has <b>sub-</b>, meaning under or away. Which word also uses this prefix?',
        opts: ['submarine', 'subject', 'sudden', 'supper'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“…which can be resized as the child grows.” What does <b>which</b> refer to?',
        opts: ['the prosthetic hands', 'the volunteers', 'the dentists', 'the rocket parts'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is a printed prosthetic hand especially useful for a child?',
        a: 'Children grow quickly, so they need new hands often. Printing is low-cost and the design can be resized, so a new hand can be made easily.', look: 'the link between growth, resizing and low cost' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Is 3D printing better for the environment than subtractive manufacturing? Use evidence from the whole text, including the box.',
        a: 'Partly. It wastes less material and some filament is made from plants or recycled bottles. But failed prints still make waste, and PLA cannot be composted at home.', look: 'a balanced conclusion with evidence for and against' },
      { k: 'choice', code: 'C2.2', q: 'You want to print a phone stand at a library. Which part of the text would help you most?',
        opts: ['“From screen to object”', '“Made from plants”', 'the box “Not perfect yet”', 'the first paragraph about carving'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-hallway', subject: 'story', form: 'Short story',
    title: 'The Long Hallway',
    deck: 'A story told in the second person: you are the new student',
    hero: {
      photo: 'g7-hallway.jpg', credit: 'Photo: ChinaFlag, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A school hallway in Ontario. On a first day, every hallway looks longer than it is.'
    },
    body: [
      'You arrive in February, which is the wrong time to start anything. Everyone else has had five months to learn where the washrooms are, which teachers are strict and who sits with whom at lunch. You have had one weekend in Winnipeg, and most of it was spent looking at snow.',
      'The office gives you a <b>timetable</b> and a map. Room 214, it says, for Science. The map shows a long hallway with a staircase at each end. You hold the map in front of you like a compass and start walking.',
      { fig: '<rect class="k" x="10" y="20" width="280" height="130"/><path class="k" d="M10 76 H290 M10 96 H290"/>' +
          [50, 110, 170, 230].map(function (x, i) { return '<path class="t" d="M' + x + ' 20 V76 M' + x + ' 96 V150"/><text class="n" x="' + (x - 20) + '" y="50" text-anchor="middle">' + (i === 3 ? 'library' : 202 + i * 4) + '</text><text class="n" x="' + (x - 20) + '" y="126" text-anchor="middle">' + (204 + i * 4) + '</text>'; }).join('') +
          '<text class="n" x="270" y="50" text-anchor="middle">218</text><text class="n" x="270" y="126" text-anchor="middle">220</text>' +
          '<path class="a" stroke-dasharray="5 4" d="M20 86 H268 Q280 86 280 100 V112 M268 86"/>' + D.arrow(150, 86, 186, 86, 'a') +
          '<text class="lb" x="24" y="14">stairs</text><text class="lb" x="246" y="14">stairs</text>' + D.label(150, 172, '214 is inside the library', 190, 56),
        tall: 178, cap: 'The map from the office. Room 214 is hidden inside the library.' },
      'The hallway is loud. Lockers slam. Someone laughs, and for a second you think it is at you, but it is not. You read the numbers on the doors: 202, 206, 210. The next door says 218. You walk back. You walk forward again. There is no 214. The bell rings, and the hallway empties, the way water drains from a bathtub, and you are the only thing left in it.',
      'You think about your old school in Asmara, where you knew every crack in the courtyard. You think about the smell of coffee roasting on Sunday mornings and your cousins arguing about football. You think about your grandmother, who said, when you left, “A new place is just an old place you have not met yet.” At the time, you thought it was the kind of thing grandmothers say. Now you are not so sure.',
      'You check the map again. The paper is getting soft from your hands. A door opens behind you. A girl with a <b>hall pass</b> and a green hijab looks at you, then at your map, then back at you.',
      '“Two-fourteen?” she asks. You nod. “Everybody gets lost. It’s across the hall, inside the library. Nobody tells you that.” She walks you there, and on the way she tells you her name is Hodan, that she came from Somalia in Grade 4, and that the cafeteria pizza is a lie on Wednesdays.',
      'At the door of 214, she stops. “Lunch,” she says. “Third table from the window. Come find us.”',
      'You go in. The teacher points to an empty desk. The hallway behind you is still long, but it is not empty any more. Somewhere in it is a third table from the window, and someone waiting there who has already met this place, and is willing to introduce you.'
    ],
    guide: { before: 'Explain point of view: first person (I), second person (you), third person (he, she, they). Ask what it feels like to be addressed as “you” in a story. Find Winnipeg and Eritrea (Asmara is its capital) on a map.',
      after: 'What small things can students do to help a newcomer feel they belong? Which ones does Hodan do?' },
    words: [['timetable', 'a schedule showing when and where classes happen'], ['hall pass', 'a note that lets a student be in the hallway during class']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'The story is told in the second person. Which words show this?',
        opts: ['“you” and “your”', '“I” and “me”', '“he” and “she”', '“we” and “us”'], a: 0 },
      { k: 'lines', code: 'C1.6', n: 3, q: 'How would the story change if Hodan told it in the first person? Give one example.',
        a: 'We would see the new student from the outside, maybe looking lost in the hallway, and learn why Hodan decided to help. We would not know about the grandmother or Asmara.', look: 'a clear change in what the reader knows or feels, with an example' },
      { k: 'choice', code: 'C3.1', half: true, q: '“…the hallway empties, the way water drains from a bathtub.” What does this simile help you feel?',
        opts: ['how suddenly and completely you are left alone', 'that the floor is wet', 'that the school is old', 'that you are clean'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the map help explain?',
        opts: ['why room 214 was hard to find', 'where the cafeteria is', 'who Hodan is', 'what time it is'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What does the grandmother’s saying mean? How does the end of the story show it may be true?',
        a: 'It means a new place will become familiar once you get to know it. At the end, Hodan helps and invites the student to lunch, so the school is starting to feel known.', look: 'an interpretation of the saying and a link to Hodan’s help' },
      { k: 'choice', code: 'B3.3', half: true, q: '“Lunch,” she says. “Third table from the window. Come find us.” Why are these words in separate short sentences?',
        opts: ['to sound like natural, quick speech', 'because she is angry', 'to list foods', 'to show a mistake'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The first sentence says February is “the wrong time to start anything.” What does this word choice show?',
        opts: ['the narrator’s worry about arriving late in the year', 'that winter is cold', 'that the school is closed', 'that the narrator is late for class'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What message does the story give about belonging? Use a detail from the end.',
        a: 'Belonging can start with one small act of welcome. Hodan, who was once new herself, invites the student to her table, so the hallway is “not empty any more.”', look: 'a message about belonging or inclusion, supported by an ending detail' }
    ]
  });

  P.add({
    id: 'g7-oil-sands', subject: 'geography', form: 'Two opinions',
    title: 'Should the Oil Sands Grow?',
    deck: 'Two students take opposite sides on one of Canada’s biggest resource debates',
    hero: {
      photo: 'g7-oil-sands.jpg', credit: 'Photo: Dicklyon, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An oil sands mine and plant at Mildred Lake, north of Fort McMurray, Alberta.'
    },
    body: [
      'Under the boreal forest of northern Alberta lies one of the largest oil deposits in the world. The oil is not a liquid pool. It is <b>bitumen</b>, a thick, sticky oil mixed with sand, clay and water. Near the surface, it is dug up in huge open-pit mines. Deeper down, steam is pumped underground to melt the bitumen so it can flow up wells. Our class held a debate: should Canada let the oil sands grow? Here are two students’ closing statements.',
      { fig: '<path class="k" d="M10 50 H290"/><path class="k" d="M20 50 Q50 96 100 96 Q130 96 140 50"/><path class="h" d="M30 70 Q60 92 100 92 Q122 92 132 68"/>' +
          '<path class="h" d="M170 118 H290 V140 H170 Z"/><path class="k" d="M200 50 V128 M240 50 V128"/>' + D.arrow(200, 60, 200, 116, 'a') + D.arrow(240, 116, 240, 60, 'a') +
          '<text class="lb" x="80" y="20" text-anchor="middle">near the surface</text><text class="n" x="80" y="34" text-anchor="middle">open-pit mine</text>' +
          '<text class="lb" x="220" y="20" text-anchor="middle">deep underground</text><text class="n" x="220" y="34" text-anchor="middle">steam down, bitumen up</text>' +
          '<text class="n" x="150" y="156" text-anchor="middle">shaded areas: oil sand</text>',
        tall: 162, cap: 'Two ways of getting bitumen out of the ground.' },
      { h: 'Yes: “It keeps our country running”' },
      'The oil sands employ tens of thousands of people, not only in Alberta but across Canada, in factories that build equipment and in offices that run the companies. Fort McMurray grew from a small town into a city of about 70 000 people because of them. Taxes and royalties from oil pay for schools, hospitals and roads. Some First Nations and Métis communities own businesses that work in the oil sands and use the profits to support their people. The world still needs oil while we switch to clean energy, and Canada has strong environmental rules. If we do not produce it, other countries with weaker rules will. — Liam',
      { h: 'No: “The real cost is too high”' },
      'Producing oil from the oil sands releases more <b>greenhouse gases</b> than producing most other oil, because it takes so much energy to separate the bitumen. Mining strips away forest and wetlands. Companies must restore mined land, but so far only a small part has been certified as fully reclaimed. The leftover water and sand, called tailings, are stored in giant ponds that can harm birds and may leak into rivers. People in Fort Chipewyan, downstream on Lake Athabasca, have raised concerns about their water, fish and health. Instead of growing the oil sands, we should invest in solar, wind and the jobs they create. — Priya',
      { box: 'Thinking about the debate', text: 'Both speakers use facts, but each chooses the facts that support their side. To judge an argument, ask what the speaker left out.' },
      'After the debate, our teacher asked us to vote twice: once before we heard the statements and once after. Eight students changed their minds. Some moved toward Liam, and some toward Priya. Most of us agreed on one thing: the decision affects jobs, the land and the climate all at once, so there is no simple answer.'
    ],
    guide: { before: 'Find Fort McMurray, Fort Chipewyan and Lake Athabasca on a map. Teach <b>bitumen</b> and <b>greenhouse gas</b>. Explain that a debate presents two sides on purpose.',
      after: 'Which statement was more convincing to you, and why? What facts would you want to check before you decided?' },
    words: [['bitumen', 'a thick, sticky form of oil mixed with sand'], ['greenhouse gases', 'gases that trap heat in the atmosphere and warm the planet']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Sum up each side. Fill in the chart.', cols: ['', 'Liam (yes)', 'Priya (no)'],
        rows: [['Main argument', null, null], ['One piece of evidence', null, null]],
        a: [[null, 'The oil sands support jobs and pay for services.', 'The environmental cost is too high.'], [null, 'Taxes and royalties pay for schools and hospitals.', 'Producing it releases more greenhouse gases than most oil.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram explain?',
        opts: ['the two ways bitumen is removed from the ground', 'how much oil costs', 'where Fort Chipewyan is', 'how a car engine works'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does the text include two closing statements?',
        opts: ['to present both sides of a debate', 'to tell a story', 'to give instructions', 'to describe a science experiment'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 4, q: 'Find one fact that each speaker leaves out that would help the other side. Why might they leave it out?',
        a: 'Liam does not mention tailings ponds or greenhouse gases. Priya does not mention that some First Nations and Métis businesses benefit. Each leaves out facts that weaken their own argument.', look: 'an omitted fact for each speaker and the reason (bias toward their side)' },
      { k: 'choice', code: 'B2.2', half: true, q: 'Oil companies pay <b>royalties</b> to the province. What are royalties here?',
        opts: ['payments for the right to use a resource', 'members of a royal family', 'a kind of tailings', 'prizes'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Priya mention Fort Chipewyan in particular?',
        opts: ['It is downstream, so the people there may be affected by the oil sands.', 'It is the capital of Alberta.', 'It has the most mines.', 'It is where Liam lives.'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'What does the dash before each name do?',
        opts: ['It shows who wrote the statement.', 'It shows subtraction.', 'It begins a list.', 'It shows a missing word.'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Eight students changed their minds. What thinking skill helps a person change their mind for a good reason?',
        a: 'Weighing evidence: listening to the facts on both sides, checking which are reliable and asking what was left out, instead of just going with your first feeling.', look: 'a named critical-thinking skill and why it leads to a good decision' }
    ]
  });

  P.add({
    id: 'g7-urban-heat', subject: 'science', form: 'Explanation',
    title: 'Why Cities Are Hotter',
    deck: 'Asphalt, rooftops and the urban heat island',
    hero: {
      photo: 'g7-green-roof.jpg', credit: 'Photo: GreenRoofGardener, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The green roof on Toronto City Hall. Plants on a roof can keep a building and its neighbourhood cooler.'
    },
    body: [
      'On a hot July afternoon, step from a city park onto a parking lot, and you will feel the difference at once. Downtown streets can be several degrees warmer than the countryside around the city, and at night the difference can be even greater. Scientists call this an <b>urban heat island</b>: a city that is warmer than the area around it.',
      { h: 'Dark surfaces soak up heat' },
      'Sunlight carries energy. When it hits a surface, some of it bounces off and some is absorbed and turns into heat. Light-coloured surfaces, like snow or a white roof, reflect most of the sunlight. Dark surfaces, like asphalt and black roofs, absorb most of it. How much light a surface reflects is called its albedo. On a sunny summer day, a dark roof can reach over 70 °C. The heat then radiates back into the air, warming the whole neighbourhood.',
      { fig: '<path class="k" d="M10 150 H290"/><path class="a" d="M10 110 Q60 106 90 96 Q120 70 150 60 Q180 70 200 92 L220 112 Q240 110 290 112"/>' +
          '<path class="t" d="M20 150 v-10 M40 150 v-12 M60 150 v-10"/><rect class="t" x="120" y="110" width="16" height="40"/><rect class="t" x="140" y="96" width="18" height="54"/><rect class="t" x="162" y="104" width="14" height="46"/>' +
          D.spruce(222, 150, 30) + D.spruce(236, 150, 26) + '<path class="t" d="M260 150 v-10 M280 150 v-12"/>' +
          '<text class="n" x="40" y="168" text-anchor="middle">farms</text><text class="n" x="148" y="168" text-anchor="middle">downtown</text><text class="n" x="228" y="168" text-anchor="middle">park</text><text class="n" x="272" y="168" text-anchor="middle">suburbs</text>' +
          '<text class="lb" x="150" y="50" text-anchor="middle">warmest</text><text class="n" x="10" y="100">temperature</text>',
        tall: 174, cap: 'Temperatures across a city on a summer afternoon. The line rises downtown and dips over the park.' },
      { h: 'Other causes' },
      'Cities have fewer trees and plants. Plants cool the air by releasing water through their leaves, much as sweat cools your skin. Tall buildings trap heat between them and block cooling breezes. Cars, air conditioners and factories add even more heat. Concrete and brick store heat all day and release it slowly at night, so the city never fully cools down. In winter, that extra warmth can melt snow faster downtown, but in summer it can become a serious problem.',
      { box: 'Why it matters', text: 'Heat waves are dangerous, especially for older people, babies and people without air conditioning. In 2021, an extreme heat wave in British Columbia caused hundreds of deaths.' },
      { h: 'Cooling the city' },
      'Cities can fight back. Planting trees adds shade and cooling. Light-coloured or reflective roofs bounce sunlight away. A <b>green roof</b>, covered in soil and plants, keeps a building cooler, soaks up rainwater and gives bees and birds a place to feed. In 2009, Toronto became the first city in North America to require green roofs on many large new buildings. Some cities are also testing lighter pavements and turning parking lots into parks. Every cooler surface helps the whole neighbourhood.'
    ],
    guide: { before: 'On a sunny day, have the child touch a dark car and a light one, or a black and a white T-shirt left in the sun. Teach <b>absorb</b>, <b>reflect</b> and <b>urban</b>.',
      after: 'Where are the hottest and coolest places near your home or school? What could make the hot ones cooler?' },
    words: [['urban heat island', 'a city that is warmer than the land around it'], ['green roof', 'a roof covered with soil and plants']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the line graph show?',
        opts: ['Downtown is warmest, and the park is cooler.', 'The suburbs are warmest.', 'Farms are hotter than downtown.', 'Temperature is the same everywhere.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Re</b>flect and <b>re</b>lease both begin with <b>re-</b>, meaning back. Which word also uses <b>re-</b> this way?',
        opts: ['return', 'ready', 'real', 'region'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'The text explains causes and solutions. Fill in the chart.', cols: ['Cause of heat', 'A way to fix it'],
        rows: [['dark roofs absorb sunlight', null], ['few trees and plants', null], [null, 'turn parking lots into parks']],
        a: [[null, 'light-coloured or green roofs'], [null, 'plant trees'], ['asphalt and concrete store heat', null]] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does a city stay warm even after the sun goes down?',
        a: 'Concrete and brick store heat all day and release it slowly at night, so the city never fully cools down.', look: 'the idea that materials store heat and release it at night' },
      { k: 'choice', code: 'C3.1', half: true, q: 'Plants cool the air “much as sweat cools your skin.” What does this comparison explain?',
        opts: ['that releasing water causes cooling', 'that plants are alive', 'that sweat is green', 'that trees need water'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Cities can fight back.” What is the verb phrase?',
        opts: ['can fight', 'Cities', 'back', 'fight back'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The box says heat waves are most dangerous for some people. Who are they, and what does this suggest cities should think about when they plan cooling?',
        a: 'Older people, babies and people without air conditioning. Cities should make sure cooling, like trees and cooling centres, reaches the neighbourhoods where those people live.', look: 'the groups named and a fair, inclusive planning idea' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'What could you do to check that you understand why dark surfaces get hotter?',
        a: 'I could do a test: put a black and a white piece of paper in the sun and feel which gets hotter, then reread the paragraph to see if my result matches.', look: 'a practical strategy (test, reread, explain to someone, use the diagram)' }
    ]
  });

  P.add({
    id: 'g7-brant', subject: 'history', form: 'Biography',
    title: 'Between Two Worlds',
    deck: 'Joseph Brant, Thayendanegea, and the Six Nations’ land on the Grand River',
    hero: {
      photo: 'g7-brant.jpg', credit: 'Painting: George Romney, 1776, public domain, National Gallery of Canada', focus: '50% 25%',
      tall: 200,
      cap: 'Joseph Brant, painted in London by George Romney in 1776, when Brant was in his early thirties.'
    },
    body: [
      'Thayendanegea, known in English as Joseph Brant, was born in 1743 in the Ohio country, into the Mohawk Nation. The Mohawk are one of the Six Nations of the Haudenosaunee Confederacy. As a teenager, Brant went to a school in Connecticut, where he learned to read and write English. He became a skilled <b>interpreter</b>, moving easily between Mohawk and British communities. His sister, Molly Brant, was also an influential leader.',
      { h: 'Choosing a side' },
      'When the American Revolution began in 1775, the Haudenosaunee had to decide what to do. Brant travelled to London, met King George III and was painted by a famous artist. He believed the British were more likely than the American colonists to respect Haudenosaunee land. He led Mohawk and Loyalist fighters on the British side throughout the war.',
      { fig: '<path class="t" d="M20 30 Q90 18 160 34 Q230 50 290 40"/><path class="t" d="M20 150 Q100 140 180 152 Q240 160 290 150"/>' +
          '<path class="k" d="M90 34 Q110 60 120 90 Q130 120 160 150"/><path class="d" d="M60 34 Q80 62 92 94 Q104 126 130 150 M120 34 Q140 58 148 86 Q158 116 190 150"/>' +
          '<path class="h" d="M128 120 L146 116 L154 134 L134 138 Z"/>' +
          D.label(196, 88, 'Grand River', 124, 96) + D.label(196, 114, 'land promised in 1784', 146, 74) + D.label(196, 140, 'Six Nations today', 150, 128) +
          '<text class="n" x="20" y="22">north</text><text class="n" x="200" y="172">Lake Erie</text>',
        tall: 176, cap: 'A sketch of the Haldimand Tract. The dashed lines show the land promised along the Grand River; the shaded area shows roughly how much remains with Six Nations today.' },
      { h: 'A new home on the Grand River' },
      'The British lost the war, and the peace treaty did not even mention their Haudenosaunee allies. Brant pressed the British for land. In 1784, Governor Frederick Haldimand promised the Six Nations the land for about ten kilometres on each side of the Grand River, from its source to Lake Erie. Brant led about 1 800 people there. The town of Brantford is named after the place where he crossed the river.',
      { h: 'A hard choice' },
      'Brant believed his people needed money and farming neighbours to survive in a changing world, so he sold and leased large parts of the land to settlers. Other chiefs disagreed, and the British government argued that the Six Nations had no right to sell it. Over time, through sales, leases and government decisions, most of the land passed out of Six Nations hands.',
      { box: 'Still unresolved', text: 'Six Nations of the Grand River is today the largest First Nations community in Canada by population. Its people hold less than five per cent of the land promised in 1784, and many <b>land claims</b> are still being negotiated.' },
      'Brant died in 1807. He also translated parts of the Bible into Mohawk. Historians still debate his choices, but few doubt that he spent his life trying to secure a future for his people.'
    ],
    guide: { before: 'Find the Grand River, Brantford and Lake Erie on a map of southern Ontario. Teach <b>interpreter</b>, <b>Loyalist</b> and <b>land claim</b>.',
      after: 'Brant made hard choices that people still disagree about. Was selling land a reasonable choice in his situation? What else could he have done?' },
    words: [['interpreter', 'a person who translates spoken words between languages'], ['land claims', 'legal cases about who has rights to an area of land']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What was Brant’s main goal throughout his life, according to the text?',
        opts: ['to become British', 'to secure land and a future for his people', 'to become a painter', 'to start a school in Connecticut'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the shaded area on the map show?',
        opts: ['roughly how much land Six Nations holds today', 'the land promised in 1784', 'Lake Erie', 'Brantford'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Brant side with the British?',
        opts: ['He thought they would better respect Haudenosaunee land.', 'He was born in Britain.', 'He was paid to.', 'The king ordered him to.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 4, q: 'The text says, “Historians still debate his choices.” Give one reason someone might admire Brant’s choice to sell land, and one reason someone might criticize it.',
        a: 'Admire: he was trying to get money and farming neighbours so his people could survive. Criticize: selling land meant most of it passed out of Six Nations hands forever.', look: 'one fair reason on each side' },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is <b>Thayendanegea</b> followed by a comma and “known in English as Joseph Brant”?',
        opts: ['The commas set off another name for the same person.', 'They show a list of people.', 'They show a quotation.', 'They end the sentence.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Molly Brant was an <b>influential</b> leader. This means she …',
        opts: ['had a strong effect on others’ decisions', 'was very young', 'lived far away', 'was often sick'], a: 0 },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How do events from 1784 still affect the Six Nations community today? Use the box.',
        a: 'The land promised in 1784 was mostly lost, so Six Nations now holds less than five per cent of it. Many land claims about it are still being negotiated today.', look: 'a link between the historical promise and present-day land claims' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize Brant’s life in two or three sentences.',
        a: 'Joseph Brant was a Mohawk leader and interpreter who fought for the British in the American Revolution. Afterward, he led his people to land on the Grand River, but selling parts of it led to a long dispute.', look: 'who he was, his role in the war and the land on the Grand River' }
    ]
  });

  P.add({
    id: 'g7-energy-drinks', subject: 'health', form: 'Explanation',
    title: 'What’s in That Can?',
    deck: 'Energy drinks, caffeine and why they are not made for young people',
    hero: {
      photo: 'g7-energy-drinks.jpg', credit: 'Photo: Oto Zapletal, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Energy drinks on a shelf. The bright cans are designed to catch your eye.'
    },
    body: [
      'The cans are tall and shiny, with names like Blast, Rocket or Monster. The ads show skateboarders, gamers and athletes doing amazing things. The message is clear: drink this, and you will have more energy. But what is actually in the can, and what does it do to a growing body?',
      { h: 'The main ingredient' },
      'The ingredient that makes energy drinks feel energizing is <b>caffeine</b>, the same drug found in coffee, tea and cola. Caffeine is a <b>stimulant</b>: it speeds up the nervous system, making you feel more alert for a while. A single large energy drink can contain more caffeine than a cup of coffee, and some people drink two or three in a day. Many also contain a lot of sugar, sometimes more than ten teaspoons in one can.',
      { fig: '<path class="k" d="M40 150 H290 M40 150 V20"/>' + [['cola', 36], ['tea', 50], ['coffee', 120], ['energy drink', 160]].map(function (r, i) {
            var x = 60 + i * 58, h = r[1] * 0.75; return '<rect class="h" x="' + x + '" y="' + (150 - h) + '" width="34" height="' + h + '"/><text class="n" x="' + (x + 17) + '" y="164" text-anchor="middle">' + r[0] + '</text><text class="lb" x="' + (x + 17) + '" y="' + (144 - h) + '" text-anchor="middle">' + r[1] + '</text>'; }).join('') +
          '<path class="d" d="M40 86 H290"/><text class="n" x="44" y="80">85 mg: daily limit for ages 10 to 12</text>' +
          '<text class="n" x="36" y="16" text-anchor="end">mg</text>',
        tall: 172, cap: 'About how much caffeine is in one serving. Amounts vary by brand and size.' },
      { h: 'What it does' },
      'Health Canada advises that children aged 10 to 12 have no more than 85 mg of caffeine a day, less than one large energy drink. For teens, the limit depends on body weight: about 2.5 mg for each kilogram, or about 125 mg for a 50 kg teen. Too much caffeine can cause a racing heart, shaky hands, headaches, stomach aches and trouble sleeping. It can also make people feel anxious. When the caffeine wears off, many people feel even more tired than before, which makes them want another can.',
      { box: 'Not a sports drink', text: 'Energy drinks are not the same as sports drinks, which replace water and salts lost in sweat. Health Canada requires energy drink cans to say that they are not recommended for children.' },
      { h: 'Real energy' },
      'Real, lasting energy comes from sleep, regular meals and water. A good night’s sleep does more for focus than any drink. Breakfast with protein, such as eggs, yogurt or peanut butter, gives steady energy through the morning. Water is the best choice for staying hydrated during sports. When you see an ad for an energy drink, ask yourself: who is the company trying to sell to, and why do they show young, active people? The answer can tell you a lot about the message behind the bright can.'
    ],
    guide: { before: 'Look at the label on a cola or tea and find the caffeine and sugar. Teach <b>caffeine</b> and <b>stimulant</b>. Show how to read the bar graph and the dashed limit line.',
      after: 'Why do you think energy drink ads use skateboarders and gamers? What would an honest ad for an energy drink show?' },
    words: [['caffeine', 'a drug in coffee, tea, cola and energy drinks that makes people feel alert'], ['stimulant', 'something that speeds up the body’s systems']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. Which drink is above the dashed line?',
        opts: ['coffee and the energy drink', 'cola only', 'tea only', 'none of them'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>stimulant</b> speeds up the body. Which word is related?',
        opts: ['stimulate', 'stimulus-free', 'still', 'stomach'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart using the text.', cols: ['Effect of too much caffeine', 'Part of the body or mind affected'],
        rows: [['racing heart', null], [null, 'sleep'], ['feeling anxious', null]],
        a: [[null, 'the heart'], ['trouble sleeping', null], [null, 'the mind and mood']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might drinking one energy drink lead to wanting another?',
        a: 'When the caffeine wears off, people often feel even more tired than before, so they want another can to feel alert again.', look: 'the crash after caffeine wears off, leading to wanting more' },
      { k: 'lines', code: 'A2.4', n: 3, q: 'Energy drink ads often show athletes and gamers doing amazing things. What technique is this, and what effect is it meant to have on young viewers?',
        a: 'It links the drink with excitement, skill and being cool, so young people feel the drink will make them like those athletes, even though the drink does not do that.', look: 'the technique (association with cool or skilled people) and its intended effect' },
      { k: 'choice', code: 'B3.3', half: true, q: '“Caffeine is a stimulant: it speeds up the nervous system.” What does the colon do?',
        opts: ['It introduces an explanation of the word stimulant.', 'It starts a list.', 'It shows a quotation.', 'It shows time.'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“…which makes them want another can.” What does <b>which</b> refer to?',
        opts: ['feeling more tired when the caffeine wears off', 'a racing heart', 'Health Canada', 'the can'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion does the author want readers to reach? Give two details that support it.',
        a: 'Energy drinks are not a good choice for young people. One can has more caffeine than the daily limit for 10- to 12-year-olds, and too much causes a racing heart and poor sleep.', look: 'the conclusion and two supporting details' }
    ]
  });

  P.add({
    id: 'g7-passwords', subject: 'tech', form: 'Explanation',
    title: 'The Key to Your Online Life',
    deck: 'How passwords get cracked, and how to make yours strong',
    hero: {
      photo: 'g7-password.jpg', credit: 'Photo: Santeri Viinamäki, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A login screen. Your username says who you are; your password proves it.'
    },
    body: [
      'Your password is like the key to a house where you keep your messages, photos, games and school work. If someone copies your key, they can walk in, look around, pretend to be you and lock you out. Yet many people still use passwords like 123456, password or their pet’s name. Every year, lists of the most common passwords are published, and these are always at the top.',
      { fig: '<path class="k" d="M110 150 H290 M110 150 V14"/>' + [['6 letters', 8], ['8 letters', 30], ['12 letters', 86], ['4 random words', 130]].map(function (r, i) {
            var y = 24 + i * 34; return '<text class="l" x="104" y="' + (y + 13) + '" text-anchor="end">' + r[0] + '</text><rect class="h" x="110" y="' + y + '" width="' + r[1] + '" height="18"/>'; }).join('') +
          '<text class="n" x="124" y="37">seconds</text><text class="n" x="146" y="71">hours</text><text class="n" x="202" y="105">many years</text><text class="n" x="246" y="139">centuries</text>',
        tall: 156, cap: 'Roughly how long a computer might take to crack passwords of different lengths. Longer is much stronger.' },
      { h: 'How passwords are cracked' },
      'Criminals rarely guess passwords one at a time. They use computer programs that can try billions of guesses very quickly. First the program tries the most common passwords and every word in a dictionary. Then it tries words with numbers and symbols added, such as Hockey2013!. Finally, it tries every possible combination, which is called a <b>brute-force attack</b>. Criminals also trick people into typing their passwords into fake emails or websites that look real, a trick called phishing. A short password falls quickly, but every extra character multiplies the number of possible combinations.',
      { h: 'Make it long' },
      'The most important thing is <b>length</b>. A strong method is the passphrase: four or more random words strung together, such as maple-otter-trumpet-gravel. It is easy for you to remember but very hard for a program to guess. Adding capital letters or symbols helps a little, but adding more words helps far more. Avoid anything that can be found online, such as your birthday, your school or your favourite team, because attackers search social media for clues.',
      { box: 'Two steps are better than one', text: 'Two-step verification asks for a second proof, such as a code sent to a phone, after your password. Even if someone steals the password, they still cannot get in.' },
      { h: 'One key per door' },
      'Never use the same password everywhere. When one website is hacked, criminals try the stolen passwords on many other sites. If you reuse a password, one break-in can open all your accounts. A password manager, an app that safely stores a different strong password for each account, can help, with a parent’s permission. Finally, keep your passwords private, even from friends. A friend today might not be a friend next month, and a shared password can be passed on without you ever knowing.'
    ],
    guide: { before: 'Ask how many accounts the child has and whether any share a password. Teach <b>brute-force attack</b> and <b>passphrase</b>. Make up a silly four-word passphrase together, but do not use it for a real account.',
      after: 'What would you do if you thought someone had your password? Make a plan together.' },
    words: [['brute-force attack', 'trying every possible combination until one works'], ['length', 'how many characters a password has']],
    qs: [
      { k: 'choice', code: 'A2.2', half: true, q: 'Which is the strongest password?',
        opts: ['Hockey2013!', 'password', 'river-lantern-pickle-north', 'sam2011'], a: 2 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the bar graph show?',
        opts: ['Longer passwords take far longer to crack.', 'Short passwords are best.', 'All passwords take hours.', 'Random words are easy to guess.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The author compares a password to a key. What does the comparison help you understand?',
        opts: ['A password protects private things, and a copy lets others in.', 'Passwords are made of metal.', 'You should hide passwords under a mat.', 'Keys are better than passwords.'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“…because attackers search social media for <b>clues</b>.” Clues to what?',
        opts: ['the personal information people use in passwords', 'treasure', 'school work', 'the weather'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps a cracking program usually takes.',
        items: ['Try the most common passwords.', 'Try every word in a dictionary.', 'Add numbers and symbols to words.', 'Try every possible combination.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'A2.1', n: 3, q: 'Why should you keep your password private even from a good friend? Use the text.',
        a: 'A friend today might not be a friend later, and a shared password can be passed on without you knowing. Then someone could get into your accounts or pretend to be you.', look: 'the idea that sharing can lead to others getting access, with a reason from the text' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is reusing one password so risky?',
        a: 'If one website is hacked, criminals try the stolen password on other sites. If it is the same everywhere, they can get into all your accounts.', look: 'the chain from one hacked site to many accounts' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence combines two ideas with a dependent clause?',
        opts: ['Make it long.', 'If you reuse a password, one break-in can open all your accounts.', 'Never use the same password everywhere.', 'Two steps are better than one.'], a: 1 }
    ]
  });

  P.add({
    id: 'g7-water-treatment', subject: 'science', form: 'Explanation',
    title: 'From Lake to Tap',
    deck: 'How a treatment plant separates the mixture in lake water to make it safe to drink',
    hero: {
      photo: 'g7-water-plant.jpg', credit: 'Photo: Richard Kang, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The R. C. Harris Water Treatment Plant in Toronto, built in the 1930s. It still cleans much of the city’s drinking water.'
    },
    body: [
      'Lake Ontario looks clean on a calm day, but a glass of water straight from the lake is a <b>mixture</b> of many things. There is sand and silt, tiny bits of plants, algae, bacteria and sometimes chemicals washed off streets and farms. Before it reaches your tap, a water treatment plant separates out the parts you should not drink. Each step uses a different property of the mixture.',
      { h: 'Screening and settling' },
      'Water enters the plant through pipes that reach far out into the lake, where the water is deeper, colder and cleaner than near the shore. First it passes through screens that catch fish, weeds and garbage. Next, a chemical called a coagulant is added. It makes tiny particles stick together into clumps called floc. In large, calm tanks, the heavy floc slowly sinks to the bottom, a process called <b>sedimentation</b>.',
      { fig: [['screen', 'catches large objects'], ['settling tank', 'clumps sink'], ['filter', 'sand traps small bits'], ['disinfect', 'chlorine kills germs'], ['to your tap', '']].map(function (r, i) {
            var x = 8 + i * 58; return '<rect class="k" x="' + x + '" y="40" width="50" height="44"/><text class="lb" x="' + (x + 25) + '" y="30" text-anchor="middle">' + (i + 1) + '</text>' +
              '<text class="n" x="' + (x + 25) + '" y="100" text-anchor="middle">' + r[0] + '</text><text class="n" x="' + (x + 25) + '" y="112" text-anchor="middle">' + r[1].split(' ').slice(0, 2).join(' ') + '</text><text class="n" x="' + (x + 25) + '" y="124" text-anchor="middle">' + r[1].split(' ').slice(2).join(' ') + '</text>' +
              (i < 4 ? D.arrow(x + 50, 62, x + 58, 62, 'a') : ''); }).join('') +
          '<path class="d" d="M74 74 H116"/><path class="t" d="M130 70 h40 M130 76 h40 M130 82 h40"/>',
        tall: 132, cap: 'The main steps in a water treatment plant.' },
      { h: 'Filtering' },
      'The clearer water then trickles down through deep beds of sand, gravel and sometimes charcoal. This <b>filtration</b> traps smaller particles that did not settle, much like a coffee filter catches grounds. Every so often, the filters are cleaned by pumping water backward through them.',
      { h: 'Killing germs' },
      'Even crystal-clear water can carry bacteria and viruses too small to filter out. So the plant adds a small, carefully measured amount of chlorine, which kills harmful germs. Some plants also shine ultraviolet light through the water. A little chlorine stays in the water as it travels through kilometres of pipes, protecting it all the way to your home. Workers test the water many times a day. Many cities also add a small amount of fluoride to protect people’s teeth.',
      { box: 'Not everyone has it', text: 'For years, dozens of First Nations communities in Canada have lived under long-term drinking water advisories, meaning their tap water was not safe to drink. Many advisories have been lifted, but some remain.' },
      'The R. C. Harris plant, with its marble halls and brass railings, is sometimes called the Palace of Purification. Its builders believed clean water deserved a beautiful building. Today, people understand that clean water is not only beautiful but a basic right.'
    ],
    guide: { before: 'Mix sand, soil and leaves in a jar of water, let it settle, then pour the top through a coffee filter. Teach <b>sedimentation</b> and <b>filtration</b>.',
      after: 'Why is clean drinking water called a basic right? What should happen when a community does not have it?' },
    words: [['sedimentation', 'letting heavy particles sink to the bottom of a liquid'], ['filtration', 'passing a liquid through a material that traps solids']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps of water treatment in order.',
        items: ['Screens catch fish and garbage.', 'Floc sinks in calm tanks.', 'Sand and gravel filter the water.', 'Chlorine is added to kill germs.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.3', q: 'Each step uses a different property. Fill in the chart.', cols: ['Step', 'What it removes', 'Property it uses'],
        rows: [['screening', 'fish, weeds and garbage', null], ['sedimentation', null, 'heavy things sink'], ['filtration', null, null]],
        a: [[null, null, 'large size'], [null, 'clumps of particles (floc)', null], [null, 'small particles', 'size: small bits get trapped']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['the steps in order from lake to tap', 'a map of Toronto', 'the inside of a pipe', 'how chlorine is made'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Like a coffee filter catches grounds.” Why does the author use this comparison?',
        opts: ['to connect filtration to something familiar', 'to suggest drinking coffee', 'to describe the colour of water', 'to explain chlorine'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does some chlorine stay in the water after it leaves the plant?',
        opts: ['to keep it safe as it travels through the pipes', 'to make it taste better', 'by accident', 'to make it blue'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Purify</b> and <b>purification</b> share the base <b>pure</b>. What does the suffix <b>-ify</b> mean?',
        opts: ['to make', 'not', 'full of', 'a person who'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why do you think the author includes the box about First Nations communities? What does it add to the text?',
        a: 'It shows that safe water is not equal for everyone in Canada. It reminds readers that the right to clean water is not yet met for all communities.', look: 'the idea of unequal access and why including it matters' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of the last glass of water you drank. Describe its journey, using what you learned.',
        a: 'It probably came from a lake or well, passed through screens, settled in tanks, was filtered through sand and treated with chlorine, then travelled through pipes to my tap.', look: 'a personal connection that uses the steps from the text' }
    ]
  });

  P.add({
    id: 'g7-habitat67', subject: 'arts', form: 'Report',
    title: 'A Village of Boxes',
    deck: 'Habitat 67, the Montréal building that began as a student’s dream',
    hero: {
      photo: 'g7-habitat67.jpg', credit: 'Photo: Citlallirios, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'Habitat 67 seen from the St. Lawrence River. Hundreds of concrete boxes are stacked like giant building blocks.'
    },
    body: [
      'In the early 1960s, Moshe Safdie, a student training to be an <b>architect</b> at McGill University, was worried about cities. Apartment towers were going up everywhere, packing families into identical boxes with no gardens and no sunlight on the sides. Houses with yards spread far into the countryside, using up farmland. Safdie wondered: could a building give city people the space, light and privacy of a house, without taking up so much land?',
      { fig: '<path class="k" d="M10 150 H290"/>' + [[30, 120], [90, 120], [150, 120], [210, 120], [60, 90], [140, 90], [200, 90], [100, 60], [170, 60], [130, 30]].map(function (b) { return '<rect class="k" x="' + b[0] + '" y="' + b[1] + '" width="60" height="30"/>'; }).join('') +
          '<path class="a" d="M64 88 q4 -8 8 0 M74 88 q4 -8 8 0 M174 58 q4 -8 8 0 M184 58 q4 -8 8 0"/>' +
          D.label(4, 40, 'a roof becomes', 72, 86) + '<text class="n" x="4" y="54">a garden above</text>' + D.label(230, 30, 'one module', 190, 40),
        tall: 156, cap: 'Offset boxes: the roof of one home becomes the garden of the home above it.' },
      { h: 'Stacking the boxes' },
      'For his final project, Safdie designed a building made of concrete boxes, called <b>modules</b>, stacked on top of one another at different angles, like a pile of children’s blocks. Each home was made of one to four modules. Because the boxes were offset, the roof of one home became the garden terrace of the home above it. Every family had fresh air, sunlight from several sides and a garden of its own.',
      { h: 'From school project to world’s fair' },
      'In 1967, Montréal hosted a world’s fair, Expo 67, to celebrate Canada’s 100th birthday. Organizers asked Safdie, then only 24 years old, to build his idea for real. Workers built 354 modules in a factory set up on the site, then lifted them into place with a huge crane. The result held 146 homes. Millions of visitors toured it, and photos of Habitat 67 appeared around the world.',
      { box: 'Form and function', text: 'The building’s strange shape is not decoration. Each angle was chosen so that every home would get light, views and a terrace, and so that the stack would stay strong.' },
      { h: 'A dream that cost too much' },
      'Safdie hoped buildings like Habitat would provide good, affordable homes for ordinary families. But building and fitting the heavy concrete boxes turned out to be expensive, and no one built a second one in Canada. Today, the apartments are owned by their residents and are highly sought after. In 2009, Québec declared Habitat 67 a heritage site. Architects still study it as a bold answer to an old question: how can people live close together and still feel at home?'
    ],
    guide: { before: 'Build a small stack of boxes or blocks, offsetting each layer, and look for the “gardens.” Teach <b>architect</b> and <b>module</b>. Explain that Expo 67 was a world’s fair in Montréal.',
      after: 'Would you like to live in Habitat 67? What would you like and not like about it?' },
    words: [['modules', 'separate units that fit together to make something larger'], ['architect', 'a person who designs buildings']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What problem was Safdie trying to solve?',
        opts: ['how to give city families space, light and gardens without using much land', 'how to build faster cars', 'how to make towers taller', 'how to win a prize at school'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram explain?',
        opts: ['how offset boxes give each home a roof garden', 'how concrete is made', 'how a crane works', 'the map of Montréal'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The boxes were <b>offset</b>. What does <b>offset</b> mean here?',
        opts: ['set at different positions, not lined up', 'turned off', 'paid for', 'painted'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why was no second Habitat built in Canada?',
        opts: ['It turned out to be too expensive.', 'Nobody liked it.', 'It fell down.', 'Safdie refused.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Read the box. How does the shape of Habitat 67 show the architect’s values?',
        a: 'Every angle was chosen so each family got light, views and a garden. It shows that Safdie valued fairness, nature and good homes for everyone, not just looks.', look: 'a link between the design choices and the values they show' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Was Habitat 67 a success? Draw a conclusion and support it with evidence from the text.',
        a: 'It was a success as an idea and a building: it became famous and is a heritage site. It was not a success as affordable housing, because it cost too much and was never repeated.', look: 'a balanced conclusion supported by evidence' },
      { k: 'choice', code: 'B3.2', q: '“Organizers asked Safdie, <b>then only 24 years old</b>, to build his idea.” What does the bold phrase do?',
        opts: ['It adds information about Safdie.', 'It is the main verb.', 'It names the organizers.', 'It is a question.'], a: 0 },
      { k: 'lines', code: 'C2.2', n: 2, q: 'Name one reason someone might choose to read this text, and one other source they could use to learn more.',
        a: 'To learn how architects design homes for cities. They could also look at the architect’s own website or a museum page about Expo 67.', look: 'a fitting purpose and a reasonable additional source' }
    ]
  });

  P.add({
    id: 'g7-rideau', subject: 'history', form: 'Report',
    title: 'Digging a Way Through the Wilderness',
    deck: 'Why the Rideau Canal was built, and the people who paid the price',
    hero: {
      photo: 'g7-rideau.jpg', credit: 'Photo: Robert Linsdell, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The flight of locks where the Rideau Canal meets the Ottawa River. Many of the original stone walls still stand.'
    },
    body: [
      'After the War of 1812, British officials in Upper Canada were nervous. The main route for soldiers and supplies between Montréal and Kingston ran up the St. Lawrence River, right along the American border. In another war, American soldiers could easily cut it off. The British needed a safer route farther inland.',
      { h: 'The plan' },
      'The answer was a <b>canal</b> linking the Ottawa River to Lake Ontario, using the Rideau and Cataraqui rivers and the lakes between them. In 1826, Lieutenant-Colonel John By of the Royal Engineers arrived to build it. Instead of digging a long ditch, By decided to build dams that raised the water level, flooding rapids and swamps to create long stretches of calm water. Where the land rose or fell, workers built <b>locks</b> to lift and lower boats.',
      { fig: [[20, 'boat enters'], [110, 'gates close, water flows in'], [200, 'boat rises, upper gates open']].map(function (r, i) {
            var x = r[0], w = 80, lvl = [110, 90, 70][i]; return '<path class="k" d="M' + x + ' 50 V130 H' + (x + w) + ' V50"/><path class="t" d="M' + x + ' 70 H' + (x - 6) + '"/>' +
              D.ripple(x + 4, x + w - 4, lvl, 't') + '<rect class="h" x="' + (x + 24) + '" y="' + (lvl - 12) + '" width="32" height="10"/>' +
              '<text class="n" x="' + (x + w / 2) + '" y="148" text-anchor="middle">' + r[1] + '</text>' + (i === 1 ? D.arrow(x + 70, 40, x + 70, 64, 'a') : ''); }).join(''),
        tall: 154, cap: 'How a lock lifts a boat. Water flows in until the boat is level with the higher water.' },
      { h: 'Who built it' },
      'About 6 000 labourers did the work, many of them newly arrived Irish immigrants and French Canadians. They cut through forests and rock with hand tools, black powder and horses, in swamps full of mosquitoes. Wages were low, and many lived with their families in crowded shanties near the work sites. Malaria, a disease spread by mosquitoes, swept through the camps every summer. Historians estimate that about 1 000 workers died during construction, from disease and accidents. Many were buried in unmarked graves near the locks.',
      { box: 'Did you know?', text: 'The town that grew up around By’s headquarters was called Bytown. In 1855 it was renamed Ottawa, and soon after, it became the capital of Canada.' },
      { h: 'A canal never used for war' },
      'The canal, about 200 km long, opened in 1832 after six years of work. John By was soon called back to England and blamed for spending far more than planned. It never had to carry troops to a war, but it carried settlers, timber and goods for decades and helped Upper Canada grow. Today it is a UNESCO World Heritage Site. In summer, boaters still pass through the locks, many of them opened by hand. In winter, part of the canal in Ottawa freezes into a skating rink nearly 8 km long, where people skate to work, school and the market.'
    ],
    guide: { before: 'Find Ottawa, Kingston and the St. Lawrence River on a map and trace the route of the canal. Teach <b>canal</b> and <b>lock</b>. Show the three-step lock diagram slowly.',
      after: 'The canal is now a place for fun, but it was built at a great human cost. How should places like this remember the workers who built them?' },
    words: [['canal', 'a waterway built by people for boats'], ['locks', 'sections of a canal with gates, used to raise and lower boats']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'Why was the Rideau Canal built?',
        opts: ['to give the British a safer military route away from the American border', 'to create a skating rink', 'to bring water to farms', 'to connect Ottawa to the Atlantic Ocean'], a: 0 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps of a lock in order.',
        items: ['The boat enters the lock.', 'The gates close.', 'Water flows in and the boat rises.', 'The upper gates open.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did By build dams instead of digging one long ditch?',
        opts: ['Raising the water created long stretches of calm water to travel on.', 'Dams were cheaper than boats.', 'He wanted to make lakes for fishing.', 'Digging was not allowed.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 4, q: 'Whose story is easy to forget when people talk about the canal’s builder, John By? Why does it matter to include them?',
        a: 'The thousands of labourers, many Irish and French Canadian, who did the dangerous work and the roughly 1 000 who died. Including them gives an honest picture of what the canal cost.', look: 'the workers named and a reason their story matters' },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Construction</b> comes from <b>construct</b>. What does the suffix <b>-ion</b> do?',
        opts: ['turns a verb into a noun', 'makes a word plural', 'means “not”', 'means “again”'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“…where people skate to work, school and the market.” What does <b>where</b> refer to?',
        opts: ['the frozen canal in Ottawa', 'Kingston', 'the locks', 'the market'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize how the purpose of the canal has changed from 1832 to today.',
        a: 'It was built for the military but never used in a war. It then carried settlers and goods, and today it is used for boating, skating and as a heritage site.', look: 'the change from military route to trade to recreation and heritage' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which strategy helped you more with the lock diagram: reading it step by step, or picturing yourself in a boat? Why?',
        a: 'Picturing myself in the boat helped, because I could imagine the water rising under me as each gate opened.', look: 'a chosen strategy and a reason it helped' }
    ]
  });

  P.add({
    id: 'g7-monsoon', subject: 'geography', form: 'Explanation',
    title: 'The Season of Rain',
    deck: 'What causes the South Asian monsoon, and why a billion people watch for it',
    hero: {
      photo: 'g7-monsoon.jpg', credit: 'Photo: McKay Savage, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A street in Chennai, India, during the monsoon. In a few months, most of the year’s rain falls.'
    },
    body: [
      'Every year in early June, millions of people in southern India look up at the sky and check the news. Farmers, city planners and weather scientists are all waiting for the same event: the arrival of the summer <b>monsoon</b>. When it comes, heavy rain sweeps north across the country over several weeks. In much of India, it brings about three quarters of the whole year’s rainfall in just four months.',
      { h: 'A wind that changes direction' },
      'The word monsoon comes from an Arabic word for season, and it really means a seasonal change in the wind. The cause is the different ways land and water heat up. In spring, the land of South Asia heats up much faster than the Indian Ocean. Hot air over the land rises, creating an area of low <b>air pressure</b>. Cooler, moist air from over the ocean flows in to replace it. As that wet air is pushed up over hills and mountains, it cools, and its water vapour turns into rain.',
      { fig: '<path class="k" d="M10 120 H150"/><path class="t" d="M150 120 H290"/>' + D.ripple(154, 286, 120, 't') +
          '<text class="lb" x="80" y="146" text-anchor="middle">hot land</text><text class="lb" x="220" y="146" text-anchor="middle">cooler ocean</text>' +
          D.arrow(80, 110, 80, 50, 'a') + D.arrow(270, 60, 270, 104, 'k') + D.arrow(260, 110, 110, 110, 'a') + D.arrow(100, 40, 260, 40, 'k') +
          '<path class="d" d="M50 58 L44 72 M62 58 L56 72 M74 58 L68 72"/>' +
          '<text class="n" x="88" y="74">warm air rises</text><text class="n" x="150" y="104">moist ocean air flows in</text><text class="n" x="10" y="54">rain</text>',
        tall: 156, cap: 'Summer monsoon: the hot land draws in moist air from the ocean, which rises, cools and falls as rain.' },
      'In winter, the pattern reverses. The land cools faster than the ocean, so dry winds blow from the land out to sea, and the months are mostly dry. Sailors and traders have known these winds for thousands of years: ships sailed from Arabia to India on the summer winds and home again on the winter ones.',
      { box: 'One of the wettest places on Earth', text: 'The village of Mawsynram, in the hills of northeast India, receives nearly 12 000 mm of rain a year, almost all during the monsoon. Toronto receives about 830 mm.' },
      { h: 'A blessing and a danger' },
      'The monsoon is vital. Rice, cotton, sugar cane and many other crops depend on it, and so do the reservoirs that supply cities with drinking water. A weak monsoon can mean drought, poor harvests and higher food prices. But too much rain too quickly causes floods and landslides that can destroy homes and roads. Cities like Mumbai can come to a standstill when streets turn into rivers. On one day in July 2005, Mumbai received about 944 mm of rain.',
      { h: 'Watching the sky' },
      'Because so much depends on it, India’s weather service tracks the monsoon closely and announces its arrival in each region. Scientists are also studying how a warming climate is changing it. Many have found that the total rain is becoming less predictable, with more days of extreme downpours and longer dry spells in between.'
    ],
    guide: { before: 'Find India and the Indian Ocean on a world map. Teach <b>monsoon</b> and <b>air pressure</b>. Remind the child that warm air rises, as with a hot-air balloon.',
      after: 'Canada does not have a monsoon. What weather event do people in your area watch for and prepare for each year?' },
    words: [['monsoon', 'a seasonal wind that brings a rainy season'], ['air pressure', 'the weight of air pressing down on Earth’s surface']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What causes the summer monsoon, according to the text?',
        opts: ['Hot land draws in moist air from the cooler ocean.', 'Mountains make their own rain.', 'The ocean heats up faster than the land.', 'Winter winds blow out to sea.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which way does the moist air flow?',
        opts: ['from the ocean toward the land', 'from the land to the ocean', 'straight down', 'it does not move'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Compare the seasons. Fill in the chart.', cols: ['', 'Summer', 'Winter'],
        rows: [['Wind direction', null, null], ['Weather', null, 'mostly dry']],
        a: [[null, 'from the ocean to the land', 'from the land out to sea'], [null, 'heavy rain', null]] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author call the monsoon “a blessing and a danger”?',
        a: 'It brings rain that crops and cities need, which is a blessing. But too much rain at once causes floods and landslides, which is a danger.', look: 'one benefit and one danger, linked to the phrase' },
      { k: 'choice', code: 'B2.2', half: true, q: 'Cities can come to a <b>standstill</b>. What does this mean?',
        opts: ['Everything stops moving.', 'Everyone stands up.', 'Buildings get taller.', 'The rain stops.'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“As that wet air is pushed up over hills, it cools.” What does the clause starting with <b>As</b> tell you?',
        opts: ['when the air cools', 'where the ocean is', 'why it is called a monsoon', 'who measures the rain'], a: 0 },
      { k: 'choice', code: 'C1.1', q: '“Many have found that the total rain is becoming less predictable.” Who are <b>Many</b>?',
        opts: ['many scientists', 'many farmers', 'many cities', 'many monsoons'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'What weather event do people where you live watch and prepare for each year? How is it like the monsoon?',
        a: 'In my area, people watch for the first big snowstorm. Like the monsoon, it affects travel, schools and businesses, so people prepare ahead of time.', look: 'a local weather event and a clear similarity' }
    ]
  });

  P.add({
    id: 'g7-bridge-committee', subject: 'story', form: 'Play script', plain: true,
    title: 'The Bridge Committee',
    deck: 'A short play in one scene. Four members of a youth council must decide how to spend $40 000.',
    hero: {
      photo: 'g7-footbridge.jpg', credit: 'Photo: Xnatedawgx, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A footbridge in a park. In the play, an old bridge like this one is at the centre of a debate.'
    },
    body: [
      'Names in bold show who is speaking. Words in italics are <b>stage directions</b>.',
      '<i>A meeting room at the town hall. Four members of the youth council sit around a table covered in papers. A screen shows a photo of an old wooden footbridge with a sign: CLOSED.</i>',
      '<b>Chair (Amira):</b> Okay. We have $40 000 from the town to spend on one project. Two ideas made the final vote: fixing the Mill Creek footbridge, or building a skate park. Devon, you first.',
      '<b>Devon:</b> <i>(standing up)</i> The skate park. Hands down. There are more than two hundred skaters in this town and nowhere to skate except the library parking lot. We keep getting kicked out.',
      '<b>Mei:</b> The bridge has been closed for two years. My grandmother used to walk across it every day to get to the pharmacy. Now it takes her forty minutes to go around by the road.',
      { fig: '<path class="t" d="M138 46 Q148 74 138 100 Q130 124 140 146 M162 46 Q172 74 162 100 Q154 124 164 146"/>' +
          '<rect class="k" x="16" y="88" width="44" height="30"/><rect class="k" x="240" y="88" width="44" height="30"/>' +
          '<path class="a" stroke-dasharray="5 4" d="M60 104 H240"/><path class="k" d="M136 98 V110 M166 98 V110"/>' +
          '<path class="d" d="M38 88 V36 H262 V88"/>' +
          '<text class="n" x="38" y="132" text-anchor="middle">seniors’ homes</text><text class="n" x="262" y="132" text-anchor="middle">pharmacy</text>' +
          '<text class="lb" x="150" y="28" text-anchor="middle">road: 40 minutes</text><text class="lb" x="202" y="130" text-anchor="middle">bridge: 8 min</text>' +
          D.label(176, 70, 'old footbridge (closed)', 152, 100),
        tall: 140, cap: 'Mei’s map: the walk to the pharmacy by the bridge and by the road.' },
      '<b>Devon:</b> I get that, but a bridge is for, what, twenty people? The skate park would be used every day by kids who have nothing else.',
      '<b>Theo:</b> <i>(quietly, from his wheelchair)</i> Can I say something? Neither of those plans works for me. The old bridge had steps at both ends. And most skate parks have no paths I can use. If we fix the bridge, it has to have ramps. Otherwise we’re spending the money on something half of us can’t cross.',
      '<i>A pause. Devon sits down slowly.</i>',
      '<b>Amira:</b> That’s… a really good point. Theo, what would make the bridge work?',
      '<b>Theo:</b> Ramps instead of steps. Railings at the right height. And it’s not only me: parents with strollers, people with walkers, Mei’s grandmother.',
      '<b>Mei:</b> She uses a cane now. Ramps would help her too.',
      '<b>Devon:</b> <i>(looking at the photo on the screen)</i> I never thought about that. I skate right past that bridge every day.',
      '<b>Devon:</b> <i>(thinking)</i> What if we fixed the bridge with ramps this year and asked the town for the skate park next year? And we design the skate park so there are paths and a viewing area everyone can get to.',
      '<b>Amira:</b> A <b>compromise</b>. Then let’s vote. All in favour?',
      '<i>Four hands go up. Theo and Devon shake hands. Mei is already sketching a ramp on the back of her agenda. Lights fade.</i>'
    ],
    guide: { before: 'Explain how a play script works: character names in bold, stage directions in italics. Teach <b>stage directions</b> and <b>compromise</b>. Read it aloud together, each person taking parts.',
      after: 'Devon changes his mind. What made him change it? Have you ever changed your mind after listening to someone?' },
    words: [['stage directions', 'instructions in a play that tell actors what to do'], ['compromise', 'an agreement where each side gives up something']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'How can you tell this is a play script?',
        opts: ['It has character names before each speech and stage directions.', 'It has a glossary and headings.', 'It rhymes.', 'It is a diary.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why are some words in italics, like <i>(quietly, from his wheelchair)</i>?',
        opts: ['They are stage directions telling actors how to act.', 'They are spoken loudly.', 'They are mistakes.', 'They are book titles.'], a: 0 },
      { k: 'table', code: 'C3.5', q: 'Each character sees the problem from a different point of view. Fill in the chart.', cols: ['Character', 'What they want', 'Why'],
        rows: [['Devon', 'a skate park', null], ['Mei', null, 'her grandmother needs it to reach the pharmacy'], ['Theo', null, null]],
        a: [[null, null, 'skaters have nowhere to go'], [null, 'to fix the bridge', null], [null, 'a bridge with ramps', 'so everyone, including wheelchair users, can cross']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does Mei’s map show?',
        opts: ['The bridge route is much shorter than the road.', 'The skate park is far away.', 'The pharmacy is closed.', 'The road is broken.'], a: 0 },
      { k: 'choice', code: 'B1.1', half: true, q: 'Which shows good listening in a group discussion?',
        opts: ['Amira asks Theo what would make the bridge work.', 'Devon says “Hands down.”', 'Everyone talks at once.', 'Mei leaves the room.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does Theo change the discussion? What message does the play give about accessibility?',
        a: 'He points out that neither plan works for wheelchair users, so the group adds ramps and accessible paths. The message is that plans should include everyone from the start.', look: 'Theo’s effect on the debate and a message about including everyone' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Devon “sit down slowly” after Theo speaks? What is he thinking?',
        a: 'He realizes that his plan did not consider people like Theo either. He is rethinking his position, which leads to his compromise.', look: 'an inference about Devon’s realization, linked to his later suggestion' },
      { k: 'choice', code: 'B3.3', q: '“That’s… a really good point.” What does the ellipsis (…) show?',
        opts: ['a pause while Amira thinks', 'missing words from a quotation', 'the end of the play', 'a list'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-pollinators', subject: 'science', form: 'Report',
    title: 'The Workers Who Feed Us',
    deck: 'Why bees and other pollinators matter, and why many are in trouble',
    hero: {
      photo: 'g7-bumblebee.jpg', credit: 'Photo: Waitblock, CC BY-SA 4.0, Wikimedia Commons', focus: '25% 60%',
      tall: 200,
      cap: 'A bumblebee gathering pollen. As it moves from flower to flower, it carries pollen with it.'
    },
    body: [
      'Take a bite of an apple, a strawberry or a blueberry muffin, and you are eating something that depended on an animal. Many plants cannot make fruit or seeds unless pollen is moved from one flower to another. Wind does this job for some plants, such as corn and wheat. For many others, the job is done by animals called <b>pollinators</b>: bees, butterflies, moths, flies, beetles and even hummingbirds.',
      { h: 'How pollination works' },
      'A flower makes a sweet liquid called nectar to attract visitors. When a bee lands to drink, grains of pollen from the flower’s anthers stick to the hairs on its body. At the next flower, some of those grains rub off onto the stigma. This is <b>pollination</b>. It allows the plant to make seeds, and often the fruit around them. The bee gets food, and the plant gets help to reproduce. Both benefit, a relationship called mutualism.',
      { fig: '<path class="k" d="M60 150 V90"/><path class="k" d="M60 90 Q30 60 40 40 Q60 56 60 90 Q90 60 80 40 Q60 56 60 90"/><path class="t" d="M52 64 V44 M68 64 V44"/><circle class="dot" cx="52" cy="42" r="3"/><circle class="dot" cx="68" cy="42" r="3"/>' +
          '<path class="k" d="M240 150 V90"/><path class="k" d="M240 90 Q210 60 220 40 Q240 56 240 90 Q270 60 260 40 Q240 56 240 90"/><path class="t" d="M240 70 V42"/><circle class="t" cx="240" cy="40" r="4"/>' +
          '<ellipse class="k" cx="150" cy="40" rx="14" ry="9"/><path class="t" d="M142 32 q-8 -14 4 -12 M156 32 q8 -14 -4 -12"/>' + D.arrow(80, 50, 130, 42, 'a') + D.arrow(166, 42, 228, 42, 'a') +
          '<circle class="dot" cx="146" cy="48" r="2"/><circle class="dot" cx="154" cy="48" r="2"/>' +
          D.label(4, 170, 'anthers make pollen', 52, 46) + D.label(184, 170, 'stigma receives pollen', 240, 44) + '<text class="n" x="150" y="70" text-anchor="middle">pollen on the bee</text>',
        tall: 176, cap: 'A bee carries pollen from the anthers of one flower to the stigma of another.' },
      { h: 'Small animals, big job' },
      'Around the world, about three quarters of the main kinds of food crops depend at least partly on pollinators. Canada has more than 800 species of native bees. Most live alone, not in hives, and many nest in tiny holes in the ground or in hollow plant stems. Bumblebees can even shake pollen loose by vibrating their flight muscles, which helps tomatoes and blueberries. Honeybees, brought to North America from Europe, live in hives kept by beekeepers, but native bees are often better at pollinating local plants.',
      { box: 'Missing in Ontario', text: 'The rusty-patched bumble bee was once common in southern Ontario. It has not been seen in Canada since 2009 and is listed as endangered.' },
      { h: 'Why they are declining' },
      'Many pollinators are disappearing. Fields of a single crop and paved-over land leave fewer wildflowers to feed on. Some pesticides harm bees even in small amounts. Diseases spread from managed honeybees, and a changing climate can make flowers bloom before the insects that need them are active.',
      'Everyone can help. Planting native wildflowers, leaving some dead stems and bare ground for nests, and avoiding pesticides in gardens all make a difference. A balcony with a few pots of native plants can become a stop on a pollinator’s journey.'
    ],
    guide: { before: 'Look closely at a real flower and find the pollen. Teach <b>pollinator</b>, <b>pollination</b> and <b>mutualism</b>. Name three foods from breakfast that need pollinators.',
      after: 'What could your family or school do in one season to help pollinators? Make a small plan.' },
    words: [['pollinators', 'animals that carry pollen from flower to flower'], ['pollination', 'moving pollen to a flower’s stigma so it can make seeds']],
    qs: [
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps of pollination.',
        items: ['A bee drinks nectar from a flower.', 'Pollen sticks to the bee’s hairs.', 'The bee flies to another flower.', 'Pollen rubs off onto the stigma.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'B2.2', half: true, q: 'In <b>mutualism</b>, …',
        opts: ['both living things benefit', 'one harms the other', 'neither benefits', 'only the plant benefits'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'The report explains causes of decline and ways to help. Fill in the chart.', cols: ['Cause of decline', 'One way to help'],
        rows: [['fewer wildflowers', null], ['pesticides', null], ['no places to nest', null]],
        a: [[null, 'plant native wildflowers'], [null, 'avoid pesticides in gardens'], [null, 'leave dead stems and bare ground']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why could a change in climate cause problems even if flowers and bees are both still around?',
        a: 'Flowers might bloom earlier, before the insects are active. Then the bees miss the food, and the flowers miss being pollinated.', look: 'the idea of timing being out of step' },
      { k: 'choice', code: 'C2.1', half: true, q: 'Which prior knowledge would help you most with this report?',
        opts: ['knowing the parts of a flower', 'knowing how to swim', 'knowing hockey rules', 'knowing a recipe for soup'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: 'Which sentence is compound (two independent clauses)?',
        opts: ['The bee gets food, and the plant gets help to reproduce.', 'Everyone can help.', 'Many pollinators are disappearing.', 'Take a bite of an apple.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the report in two or three sentences.',
        a: 'Pollinators like bees carry pollen between flowers so plants can make seeds and fruit, including much of our food. Many are declining because of habitat loss, pesticides, disease and climate change, but people can help by planting native flowers.', look: 'the role of pollinators, why they are declining and how to help' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict what might happen to a blueberry farm if there were very few bees nearby. Explain your thinking.',
        a: 'Fewer flowers would be pollinated, so the bushes would make fewer berries. The farmer might have to rent hives of bees to get a good crop.', look: 'a prediction based on the text (less pollination, fewer berries)' }
    ]
  });

  P.add({
    id: 'g7-algonquin-wolf', subject: 'science', form: 'Explanation',
    title: 'Howls in the Night',
    deck: 'The Algonquin wolf, its prey and the balance of a forest ecosystem',
    hero: {
      photo: 'g7-eastern-wolf.jpg', credit: 'Photo: Quinten Wiegersma, CC BY 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'An eastern wolf, also called the Algonquin wolf, in Algonquin Provincial Park. It is smaller than a grey wolf and larger than a coyote.'
    },
    body: [
      'On August evenings in Algonquin Park, crowds of people stand silently by the side of a highway. A park naturalist cups their hands and lets out a long, wavering howl. Everyone holds their breath. Then, from somewhere deep in the dark forest, the wolves answer. These public wolf howls have taken place since 1963, and over 100 000 people have joined them.',
      { h: 'A wolf of its own' },
      'The wolves of Algonquin are not grey wolves or coyotes, though they are related to both. Scientists call them eastern wolves, or Algonquin wolves. They live mainly in and around Algonquin Park and a few other parts of central Ontario and Quebec. Only a few hundred adults remain, and the species is listed as threatened in Canada.',
      { fig: '<path class="k" d="M30 150 H290 M30 150 V20"/><path class="a" d="M30 60 Q70 30 110 60 Q150 100 190 60 Q230 30 270 60"/><path class="k" stroke-dasharray="5 4" d="M30 120 Q70 120 110 96 Q150 70 190 96 Q230 124 270 100"/>' +
          '<text class="lb" x="280" y="56">deer</text><text class="lb" x="280" y="104">wolves</text><text class="n" x="160" y="166" text-anchor="middle">years →</text><text class="n" x="26" y="16" text-anchor="end">number</text>',
        tall: 172, cap: 'A simplified pattern of predator and prey numbers over time. When deer are many, wolves increase; then deer fall, and so do wolves.' },
      { h: 'Predator and prey' },
      'Algonquin wolves hunt white-tailed deer, moose and, in summer, beavers. A wolf is a <b>predator</b>, an animal that hunts others for food, and the animals it hunts are its <b>prey</b>. The numbers of predators and prey are linked. When deer are plentiful, wolf packs raise more pups. As more wolves hunt, deer numbers fall. With less food, fewer wolf pups survive, and deer begin to recover. The populations rise and fall in a slow, linked pattern.',
      { box: 'Why predators matter', text: 'Without predators, deer and moose can grow so numerous that they eat young trees faster than the forest can replace them. Predators help keep the whole ecosystem in balance.' },
      { h: 'Protecting the wolves' },
      'For years, wolves that stepped outside the park boundary in winter, following deer, could be legally hunted or trapped. Researchers found that this was a major cause of death. In 2001, Ontario banned hunting and trapping wolves in the townships around the park. Today, the province also protects the eastern wolf in other parts of its range. Biologists track packs with radio collars to learn where they travel and what they need to survive.',
      'Wolves have often been feared and misunderstood. The Algonquin wolf howls are a chance to hear one of Ontario’s rarest animals and to understand its place in the forest.'
    ],
    guide: { before: 'Find Algonquin Park on a map of Ontario. Teach <b>predator</b>, <b>prey</b> and <b>population</b>. Show how to follow each line on the graph separately, then together.',
      after: 'Some people fear wolves, and others want to protect them. How could a farmer near the park and a wolf biologist find common ground?' },
    words: [['predator', 'an animal that hunts other animals for food'], ['prey', 'an animal that is hunted for food']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'On the graph, what usually happens after deer numbers rise?',
        opts: ['Wolf numbers rise.', 'Wolf numbers fall.', 'Both stay the same.', 'Deer disappear.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'The paragraph under “Predator and prey” is mostly organized as …',
        opts: ['a cycle of causes and effects', 'a list of facts in no order', 'a story with a villain', 'a comparison of two parks'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did wolves leave the safety of the park in winter, and why was that dangerous for them?',
        a: 'They followed the deer, which moved outside the park in winter. Outside the boundary, wolves could be legally hunted or trapped.', look: 'the link between following prey and being hunted outside the park' },
      { k: 'choice', code: 'C3.3', half: true, q: 'What is the main idea of the box “Why predators matter”?',
        opts: ['Predators help keep the forest ecosystem in balance.', 'Deer are dangerous.', 'Young trees grow fast.', 'Moose are predators.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“A wolf is a <b>predator</b>.” What is <b>a predator</b> in this sentence?',
        opts: ['a predicate noun renaming “a wolf”', 'the verb', 'an adjective', 'the subject'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The graph has two lines that rise and fall. What strategy would help you read it correctly?',
        a: 'I would follow one line with my finger at a time, then compare where each one peaks. Reading the caption first also helps.', look: 'a sensible graph-reading strategy' },
      { k: 'choice', code: 'C2.2', half: true, q: 'Which purpose would this text suit best?',
        opts: ['a science project on predator-prey relationships', 'a guide to camping recipes', 'a mystery story', 'a hockey report'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author begin with crowds waiting in silence?',
        opts: ['to build suspense and draw the reader in', 'to explain the rules of the park', 'to describe the highway', 'to list the animals'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The last paragraph says wolves are often “feared and misunderstood.” How does this text try to change that view?',
        a: 'It explains that wolves are a rare, threatened species that keeps the forest healthy, and it shows people enjoying their howls instead of fearing them.', look: 'how the text presents wolves positively, with a detail' }
    ]
  });

  P.add({
    id: 'g7-bicycle-frame', subject: 'science', form: 'Explanation',
    title: 'Two Triangles and a Rider',
    deck: 'How the shape and materials of a bicycle frame help it carry a load',
    hero: {
      photo: 'g7-bike-frame.jpg', credit: 'Photo: 4300streetcar, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A steel bicycle frame being built, held in a jig. Look closely and you can find two triangles joined together.'
    },
    body: [
      'A bicycle frame has a tough job. It must hold up a rider who may weigh many times more than the bike, survive bumps, potholes and curbs, and still be light enough to pedal up a hill. Since the 1890s, most bicycles have used the same basic solution: the diamond frame. Its shape is no accident.',
      { h: 'Built from triangles' },
      'The diamond frame is really two triangles joined along one side. The front triangle is made by the top tube, the down tube and the seat tube. The rear triangle is made by the seat tube, the seat stays and the chain stays. Triangles are <b>rigid</b>: they cannot change shape unless a side bends or breaks. So when the rider sits down and pushes on the pedals, the frame keeps its shape.',
      { fig: '<circle class="t" cx="60" cy="120" r="40"/><circle class="t" cx="240" cy="120" r="40"/>' +
          '<path class="k" d="M60 120 L120 120 L104 50 Z M104 50 L204 50 L120 120 M204 50 L240 120 M204 50 L198 34 M104 50 L100 36 M92 36 H112"/>' +
          D.label(130, 20, 'top tube', 160, 50) + D.label(206, 98, 'down tube', 162, 86) + D.label(10, 20, 'seat tube', 110, 84) +
          D.label(10, 172, 'chain stay', 90, 120) + D.label(150, 172, 'seat stay', 82, 86) +
          '<text class="lb" x="78" y="104">rear</text><text class="lb" x="152" y="72">front</text>',
        tall: 176, cap: 'A diamond frame: a front triangle and a rear triangle share the seat tube.' },
      { h: 'Pushes and pulls' },
      'As the rider sits, their weight pushes down on the seat tube, squeezing it. This force is called compression. At the same time, other tubes are being pulled and stretched, a force called tension. When the rider pedals hard, the forces change many times each second. A good frame spreads these forces through all its tubes so no single part takes too much.',
      { h: 'Hollow and strong' },
      'Why are the tubes hollow? A hollow tube is almost as stiff as a solid rod of the same width, but it is much lighter. That is why the frame can be strong without being heavy. Designers choose the <b>material</b> to match the purpose. Steel is strong, cheap and easy to repair, which suits commuter and touring bikes. Aluminum is lighter. Carbon fibre is lighter still and very stiff, so racers use it, but it is expensive and can crack if it is hit hard.',
      { box: 'Try it', text: 'Roll a sheet of paper into a tube and stand a light book on it. Then fold another sheet flat and try again. Which holds the weight?' },
      'Some frames break the rules for a reason. A step-through frame drops the top tube so riders can get on easily. A cargo bike stretches its frame to carry children or groceries. Each design trades a little strength or lightness for something else the rider needs. Form, as engineers say, follows function.'
    ],
    guide: { before: 'Look at a real bicycle and find the two triangles. Review <b>compression</b> and <b>tension</b> (squeezing and stretching). Do the paper-tube test in the box together.',
      after: 'If you designed a bike for a city with many hills, what material and frame shape would you choose? Why?' },
    words: [['rigid', 'stiff; keeps its shape'], ['material', 'what something is made of']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Which tube is part of both triangles?',
        opts: ['the seat tube', 'the top tube', 'the down tube', 'the chain stay'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are bicycle tubes hollow?',
        opts: ['They are almost as stiff as solid rods but much lighter.', 'To hold water.', 'They are cheaper to paint.', 'To make noise.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Match each material to its strengths and its best use. Fill in the chart.', cols: ['Material', 'Strength', 'Best use'],
        rows: [['steel', 'strong, cheap, easy to repair', null], ['carbon fibre', null, 'racing bikes'], ['aluminum', null, 'bikes that need to be lighter than steel']],
        a: [[null, null, 'commuter and touring bikes'], [null, 'very light and stiff', null], [null, 'lighter than steel', null]] },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this is an explanation?',
        opts: ['It explains how and why a frame works.', 'It tells a story with characters.', 'It gives the writer’s opinion only.', 'It has rhyming lines.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Form follows function” means …',
        opts: ['the shape is chosen to suit the job', 'a form must be filled in', 'all bikes look the same', 'function is not important'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'A step-through frame has no high top tube. What does it gain, and what might it give up?',
        a: 'It gains being easy to get on and off. Without the full front triangle, it may give up a little stiffness or need heavier tubes to stay strong.', look: 'one gain and one likely trade-off, based on triangles' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which part of the text did you need to reread or check with the diagram? What did you understand afterward?',
        a: 'I reread the part naming the tubes in each triangle and traced them on the diagram. Afterward I understood that the seat tube belongs to both.', look: 'a specific part, the strategy used and what became clear' },
      { k: 'choice', code: 'C2.7', q: 'Which strategy would best help you understand the “Try it” box?',
        opts: ['actually doing the paper test and seeing the result', 'skipping it', 'memorizing it word for word', 'reading only the first sentence'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-rebellions', subject: 'history', form: 'Report',
    title: 'Rebels in the Snow',
    deck: 'The Rebellions of 1837 and 1838, and the fight for a government that answers to the people',
    hero: {
      photo: 'g7-montgomery.jpg', credit: 'Image: unknown artist, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An old engraving of the clash at Montgomery’s Tavern, north of Toronto, in December 1837.'
    },
    body: [
      'In the 1830s, Upper Canada and Lower Canada each had an elected assembly, but the assemblies had little real power. The governor, sent from Britain, made the important decisions, guided by small groups of wealthy, well-connected advisers. In Upper Canada, critics called this group the Family Compact. In Lower Canada, it was the Château Clique. Many ordinary people felt shut out of decisions about roads, land, schools and taxes. Farmers complained that the best land went to friends of the powerful, while their own roads stayed muddy and impassable.',
      { fig: '<path class="k" d="M150 10 V160"/>' +
          '<text class="lb" x="75" y="20" text-anchor="middle">Lower Canada</text><text class="lb" x="225" y="20" text-anchor="middle">Upper Canada</text>' +
          [['Nov 1837', 'Patriotes win', 'at Saint-Denis', 48], ['Nov–Dec 1837', 'defeats at Saint-Charles', 'and Saint-Eustache', 98], ['1838', 'second uprising', 'crushed', 140]].map(function (r) { return '<text class="n" x="75" y="' + r[3] + '" text-anchor="middle">' + r[0] + '</text><text class="l" x="75" y="' + (r[3] + 12) + '" text-anchor="middle">' + r[1] + '</text><text class="l" x="75" y="' + (r[3] + 24) + '" text-anchor="middle">' + r[2] + '</text>'; }).join('') +
          [['Dec 1837', 'rebels march', 'to Montgomery’s Tavern', 48], ['Dec 1837', 'scattered in', 'less than an hour', 98], ['1838', 'raids from the', 'United States fail', 140]].map(function (r) { return '<text class="n" x="225" y="' + r[3] + '" text-anchor="middle">' + r[0] + '</text><text class="l" x="225" y="' + (r[3] + 12) + '" text-anchor="middle">' + r[1] + '</text><text class="l" x="225" y="' + (r[3] + 24) + '" text-anchor="middle">' + r[2] + '</text>'; }).join(''),
        tall: 170, cap: 'The rebellions in the two colonies, side by side.' },
      { h: 'Calls for change' },
      'Reformers wanted a government that had to answer to the elected assembly, a system called <b>responsible government</b>. In Lower Canada, Louis-Joseph Papineau led the Patriotes, who also wanted to protect the rights of French-speaking Canadiens. In Upper Canada, the fiery newspaper editor William Lyon Mackenzie attacked the Family Compact in print. When peaceful protest seemed to fail, some reformers turned to <b>rebellion</b>.',
      { h: 'The uprisings' },
      'In November 1837, fighting broke out near Montréal. The Patriotes won a battle at Saint-Denis, but British troops defeated them at Saint-Charles and Saint-Eustache. In December, Mackenzie led several hundred poorly armed farmers down Yonge Street toward Toronto. Loyal militia scattered them near Montgomery’s Tavern in less than an hour. Mackenzie escaped to the United States. Two rebel leaders, Samuel Lount and Peter Matthews, were hanged in Toronto.',
      { box: 'Did you know?', text: 'Some of the rebels in Upper Canada were later sent as prisoners to Australia, on the other side of the world.' },
      { h: 'Lost battles, won argument' },
      'The rebels lost, but Britain could not ignore what had happened. It sent Lord Durham to find out why. His 1839 report recommended responsible government and joining the two colonies into one. The second idea was meant partly to make French Canadians a minority, which angered many. In 1841, the colonies were united as the Province of Canada. In 1848, reformers Robert Baldwin and Louis-Hippolyte LaFontaine, an English and a French Canadian working together, finally won responsible government, peacefully.'
    ],
    guide: { before: 'Find Toronto and Montréal on a map and explain Upper and Lower Canada. Teach <b>responsible government</b> and <b>rebellion</b>. Compare it to a class where the teacher must listen to the class council.',
      after: 'The rebels lost the fighting, but their main goal was achieved later without violence. What does this suggest about different ways of making change?' },
    words: [['responsible government', 'a government that must have the support of the elected assembly'], ['rebellion', 'an armed fight against the people in power']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What did reformers in both colonies want most?',
        opts: ['a government that had to answer to the elected assembly', 'to join the United States', 'to remove all taxes', 'a new governor from France'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'The report compares the two colonies. Fill in the chart.', cols: ['', 'Lower Canada', 'Upper Canada'],
        rows: [['Name for the ruling group', 'Château Clique', null], ['Reform leader', null, 'William Lyon Mackenzie'], ['Result of the 1837 uprising', null, null]],
        a: [[null, null, 'Family Compact'], [null, 'Louis-Joseph Papineau', null], [null, 'a win at Saint-Denis, then defeat', 'scattered in less than an hour']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'How is the chart of the uprisings organized?',
        opts: ['two columns, one for each colony, in time order', 'by the number of soldiers', 'in alphabetical order', 'by distance from Britain'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Re</b>former and <b>re</b>bellion both start with re-. Which word uses <b>re-</b> to mean “again”?',
        opts: ['rebuild', 'reason', 'ready', 'reptile'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 4, q: 'Lord Durham wanted to make French Canadians a minority. How might a Canadien in Lower Canada have felt about his report? Why?',
        a: 'Angry and worried. Even though the report suggested responsible government, it also aimed to weaken French Canadians’ language and culture by making them a minority.', look: 'a feeling with a reason tied to the plan to make them a minority' },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who is the narrator of this report?',
        opts: ['an outside narrator using the third person', 'Mackenzie, in the first person', 'Papineau, in the first person', 'a rebel prisoner'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is there a comma after “Robert Baldwin and Louis-Hippolyte LaFontaine”?',
        opts: ['to set off extra information about them', 'to end a list of dates', 'to show a quotation', 'to show a pause in a poem'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the heading “Lost battles, won argument.” Use evidence from the text.',
        a: 'The rebels lost the fighting in 1837 and 1838. But their main argument for responsible government won: Durham recommended it, and it was achieved in 1848.', look: 'both parts of the heading explained with evidence' }
    ]
  });

  P.add({
    id: 'g7-cascadia', subject: 'geography', form: 'Report',
    title: 'The Night the Coast Dropped',
    deck: 'How First Nations stories, dead trees and Japanese records solved the mystery of a giant earthquake',
    hero: {
      photo: 'g7-tsunami-sign.jpg', credit: 'Photo: Mimigu, CC BY 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A tsunami hazard zone sign in Bamfield, on the west coast of Vancouver Island, close to Pachena Bay.'
    },
    body: [
      'On a winter night in January 1700, the ground along the Pacific coast of North America shook violently for several minutes. Whole stretches of shoreline dropped by a metre or more. Within half an hour, a huge wave swept over the beaches. No one wrote it down in a book at the time, but it was not forgotten. For three centuries, scientists did not know it had happened. Then, piece by piece, the evidence came together.',
      { h: 'A plate slips under' },
      'Off the coast of British Columbia, a small <b>tectonic plate</b>, the Juan de Fuca Plate, is slowly sliding beneath the North American Plate. This is called a <b>subduction zone</b>. The plates do not slide smoothly. They lock together, and pressure builds for hundreds of years. When the lock finally breaks, the edge of the continent snaps back, lifting the sea floor and setting off a tsunami.',
      { fig: '<path class="t" d="M10 52 H130"/>' + D.ripple(14, 126, 46, 't') +
          '<path class="k" d="M10 70 L180 102 L290 150"/><path class="k" d="M130 52 Q170 40 210 44 T290 40"/><path class="k" d="M130 52 L180 102"/>' +
          D.arrow(60, 84, 110, 94, 'a') + D.arrow(250, 70, 215, 72, 'a') +
          '<path class="d" d="M168 82 l8 6 l-6 4 l8 6"/>' +
          '<text class="l" x="20" y="96">Juan de Fuca Plate</text><text class="l" x="210" y="62">North American Plate</text>' +
          '<text class="n" x="40" y="36">Pacific Ocean</text><text class="n" x="190" y="126">plates lock here</text>',
        tall: 150, cap: 'A subduction zone. The ocean plate slides under the continent and the two plates catch, then suddenly slip.' },
      { h: 'Three kinds of evidence' },
      'The first clue came from the land. Along rivers in Washington State and British Columbia, scientists found <b>ghost forests</b>: dead red cedars standing in salt marshes. The land had dropped suddenly, and salt water had killed the trees. Their tree rings showed they all died between 1699 and 1700.',
      'The second clue came from across the ocean. Japanese villages kept careful records, and they described a tsunami that arrived in January 1700 with no earthquake felt in Japan. Scientists used the wave’s timing to work backward. The quake must have struck the Cascadia coast on the evening of January 26, 1700.',
      { box: 'Oral history as evidence', text: 'Stories passed down by the Huu-ay-aht and other Nuu-chah-nulth peoples tell of a winter night when the ground shook and the sea swept away a village at Pachena Bay. The stories matched the scientific evidence closely.' },
      { h: 'Getting ready' },
      'Scientists now know that Cascadia has had giant earthquakes many times, roughly every 500 years on average. Another will happen, though no one can say when. Coastal towns in British Columbia now post tsunami route signs, practise drills and teach students what to do: drop, cover and hold on until the shaking stops, then move to high ground right away.'
    ],
    guide: { before: 'Push two books together on a table until one slips under the other to show <b>subduction</b>. Teach <b>tectonic plate</b> and <b>ghost forest</b>. Find Vancouver Island and Japan on a map.',
      after: 'Scientists used stories, trees and old records. Why is it stronger to have three kinds of evidence instead of one?' },
    words: [['tectonic plate', 'one of the giant slabs of rock that make up Earth’s outer layer'], ['subduction zone', 'a place where one plate slides beneath another'], ['ghost forests', 'dead trees still standing where the land suddenly dropped']],
    qs: [
      { k: 'table', code: 'C1.3', q: 'The report gives three kinds of evidence. Fill in the chart.', cols: ['Evidence', 'Where it came from', 'What it showed'],
        rows: [['ghost forests', null, 'the land dropped between 1699 and 1700'], ['Japanese records', 'villages in Japan', null], ['oral history', null, null]],
        a: [[null, 'rivers in Washington and B.C.', null], [null, null, 'a tsunami arrived in January 1700 with no quake felt'], [null, 'Huu-ay-aht and other Nuu-chah-nulth peoples', 'the ground shook and the sea swept away a village']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram help you understand?',
        opts: ['how one plate slides under another and gets stuck', 'how tsunamis reach Japan', 'how trees grow rings', 'where Pachena Bay is'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the red cedars die?',
        opts: ['The land dropped and salt water flooded their roots.', 'They were cut down.', 'A fire burned them.', 'They were too old.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In a <b>ghost forest</b>, what does the word <b>ghost</b> suggest?',
        opts: ['The trees are dead but still standing, like a reminder of the past.', 'The forest is haunted.', 'The trees are white.', 'Nobody can see the forest.'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'The report says “No one wrote it down in a book at the time, but it was not forgotten.” Whose point of view does this sentence make room for?',
        opts: ['First Nations people who remembered it through oral history', 'Japanese scientists', 'tourists on Vancouver Island', 'the trees'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The paragraph about Japanese records says scientists “worked backward.” If this idea confused you, what could you do to understand it? Explain.',
        a: 'I could reread the paragraph slowly and picture it: the wave took a certain number of hours to cross the ocean, so subtracting that time from when it reached Japan tells you when the quake happened.', look: 'a fix-up strategy and a correct explanation of working backward' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why do you think the author put the oral history in a separate box? What message does it send about Indigenous knowledge?',
        a: 'It makes it stand out so readers do not miss it. It shows that Indigenous oral history is real evidence that agreed with the science.', look: 'a reason for the box and the message about Indigenous knowledge' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict what a student in a coastal B.C. town should do if strong shaking starts at school. Use the text.',
        a: 'Drop, cover and hold on until the shaking stops, then follow the tsunami route signs to high ground right away, without waiting for a warning.', look: 'both steps from the text: protect during shaking, then go to high ground' }
    ]
  });

  P.add({
    id: 'g7-stress-brain', subject: 'health', form: 'Explanation',
    title: 'Your Brain on Alarm',
    deck: 'What stress does to your body, and how to turn the alarm down',
    hero: {
      photo: 'g7-brain-model.jpg', credit: 'Photo: YVC Biology Department, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A model of the human brain. Deep inside, small regions work like an alarm system.'
    },
    body: [
      'Imagine you are about to give a speech to your class. Your heart pounds, your hands get sweaty and your mouth feels dry. Your thoughts race, or your mind goes completely blank. Nothing is actually attacking you, yet your body is acting as if it is in danger. That is <b>stress</b>, and it starts in your brain.',
      { h: 'The alarm' },
      'Deep in the brain is a small, almond-shaped part called the <b>amygdala</b>. Its job is to notice danger. When it senses a threat, it sends a signal that tells your adrenal glands, which sit on top of your kidneys, to release <b>hormones</b> such as adrenaline. These chemical messengers travel through your blood and get your body ready to act.',
      { fig: [['brain senses danger', 'amygdala'], ['hormones released', 'adrenaline'], ['body gets ready', 'heart, lungs, muscles']].map(function (r, i) {
            var x = 14 + i * 98; return '<rect class="k" x="' + x + '" y="40" width="80" height="50"/><text class="n" x="' + (x + 40) + '" y="60" text-anchor="middle">' + r[0] + '</text><text class="l" x="' + (x + 40) + '" y="78" text-anchor="middle">' + r[1] + '</text>' +
              (i < 2 ? D.arrow(x + 82, 65, x + 96, 65, 'a') : ''); }).join('') +
          '<text class="lb" x="150" y="26" text-anchor="middle">The stress response</text>' +
          '<text class="n" x="150" y="118" text-anchor="middle">faster heartbeat · quicker breathing · tense muscles</text>',
        tall: 130, cap: 'The stress response happens in a few seconds.' },
      'Your heart beats faster to pump more blood to your muscles. You breathe more quickly to take in oxygen. Your muscles tense. This is called the fight, flight or freeze response. Thousands of years ago, it helped people escape predators. A little stress can still help you today, by giving you energy before a race or focus before a test.',
      { h: 'When the alarm will not switch off' },
      'Problems start when stress lasts for weeks. The front part of your brain, which plans and makes careful choices, works less well when the alarm is ringing. Long-term stress can disturb sleep, cause headaches and stomach aches, and make it easier to catch colds. It can also make people feel tired, grumpy or worried all the time, even when nothing is wrong.',
      { box: 'Try this', text: 'Breathe in slowly through your nose for a count of four. Breathe out through your mouth for a count of six. A long, slow breath out tells your body the danger has passed.' },
      { h: 'Turning it down' },
      'You cannot remove all stress, but you can help your body reset. Slow breathing calms the heart. Exercise uses up the extra energy. Enough sleep helps the thinking part of your brain stay in charge. Breaking a big job into small steps makes it feel less threatening. Most important of all, talk to someone you trust. Saying a worry out loud often shrinks it. A parent, teacher, coach or counsellor can help you find a plan, and needing help is never a sign of weakness. Everyone’s alarm rings sometimes.'
    ],
    guide: { before: 'Ask when the child last felt their heart pound. Teach <b>amygdala</b> and <b>hormones</b>. Try the breathing box together before reading.',
      after: 'Which strategy for turning down stress would work best for you? When could you use it this week?' },
    words: [['amygdala', 'a small part of the brain that notices danger'], ['hormones', 'chemical messengers carried in the blood']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps of the stress response in order.',
        items: ['The amygdala senses a threat.', 'It signals the adrenal glands.', 'Hormones such as adrenaline are released.', 'The heart beats faster and muscles tense.'], show: [3, 0, 2, 1] },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is an explanation?',
        opts: ['It tells how and why something happens, step by step.', 'It has characters and a plot.', 'It tries to sell a product.', 'It rhymes.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What do the arrows in the diagram show?',
        opts: ['that one step causes the next', 'the direction of the blood', 'how big each part is', 'where the brain is'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the author start by describing a class speech?',
        opts: ['to connect stress to a situation readers know', 'to teach how to give a speech', 'to prove speeches are dangerous', 'to describe the amygdala'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Your thoughts race, or your mind goes completely blank.” What does the word <b>or</b> tell you?',
        opts: ['Either one thing or the other can happen.', 'Both always happen.', 'The second idea causes the first.', 'The sentence is a question.'], a: 0 },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Think of a time you felt stressed. Which body changes from the text did you notice? How does your experience help you understand the text?',
        a: 'Before a hockey tryout my heart pounded and my hands shook. Now I know the adrenaline was getting my muscles ready, which helps me understand the stress response.', look: 'a personal example linked to the body changes in the text' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'The author says a little stress can help, but long-term stress causes harm. Explain both sides using the text.',
        a: 'A little stress gives energy before a race or focus for a test. Stress that lasts for weeks disturbs sleep, causes aches, makes it easier to get sick and makes it harder to think carefully.', look: 'one benefit and one harm, each from the text' },
      { k: 'lines', code: 'B1.1', n: 3, q: 'A friend tells you they are stressed about a test. Name two things a good listener does, and explain why they help.',
        a: 'Look at them and let them finish without interrupting, then repeat back what you heard. It shows you care and helps them feel understood, which can shrink the worry.', look: 'two listening behaviours with a reason' }
    ]
  });

  P.add({
    id: 'g7-budget', subject: 'math', form: 'Explanation',
    title: 'Where Does the Money Go?',
    deck: 'How Mateo used a budget to reach his goal faster',
    hero: {
      photo: 'g7-coins.jpg', credit: 'Photo: Katherine Ridgley, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Stacks of Canadian coins. Small amounts add up quickly, both when you spend and when you save.'
    },
    body: [
      'Mateo, who lives in Thunder Bay, wanted a used mountain bike that cost $180 and a helmet that cost $45. That was $225 in total. He earned money walking his neighbours’ dogs and helping at his aunt’s bakery on Saturdays, about $80 a month altogether. Somehow, though, the money always seemed to disappear. At the end of each month he could never say where it had gone.',
      { fig: '<text class="lb" x="10" y="22">Plan A: $80 a month</text>' +
          '<rect class="h" x="10" y="30" width="140" height="24"/><rect class="k" x="150" y="30" width="98" height="24"/><rect class="t" x="248" y="30" width="42" height="24"/>' +
          '<text class="n" x="80" y="68" text-anchor="middle">save $40</text><text class="n" x="199" y="68" text-anchor="middle">spend $28</text><text class="n" x="269" y="68" text-anchor="middle">give $12</text>' +
          '<text class="lb" x="10" y="98">Plan B: $80 a month</text>' +
          '<rect class="h" x="10" y="106" width="210" height="24"/><rect class="k" x="220" y="106" width="28" height="24"/><rect class="t" x="248" y="106" width="42" height="24"/>' +
          '<text class="n" x="115" y="144" text-anchor="middle">save $60</text><text class="n" x="244" y="144" text-anchor="end">spend $8</text><text class="n" x="252" y="144">give $12</text>',
        tall: 152, cap: 'Two ways Mateo could divide his $80 a month. Each bar is drawn to scale.' },
      { h: 'Making a plan' },
      'Mateo’s aunt showed him how to make a <b>budget</b>, a plan for how money will be earned, spent and saved. First he listed his <b>income</b>, the money coming in. Then he tracked every dollar he spent for one month, writing each one in a notebook, from a $3 hot chocolate to a $15 video game. He was surprised: $22 had gone on snacks and $10 on in-game purchases he barely remembered.',
      { h: 'Needs and wants' },
      'Next, Mateo sorted his spending into <b>needs</b> and wants. A need is something you must have, like a bus pass to get to school. A want is something nice but not necessary, like a third bag of chips in a week. Mateo’s parents covered his needs, so most of his spending was on wants.',
      'His first plan, Plan A, divided his $80 into saving $40, spending $28 and giving $12 to the food bank. At $40 a month, the bike would take 6 months, since 5 months would only bring him to $200. He did not want to wait that long. By then the snow would be falling, and the best riding weather would be over.',
      { box: 'Pay yourself first', text: 'Many people move their savings out of their account as soon as they are paid, before they spend anything. Money that is already put aside is harder to waste.' },
      { h: 'Plan B' },
      'So Mateo cut his snacks and stopped the in-game purchases. In Plan B he saved $60 a month and kept giving $12. Now he would reach $225 in only 4 months. He kept a chart on his bedroom wall and filled it in each month. In late spring, he rode his new bike to the bakery. His aunt asked if the plan had been hard. Mateo shrugged. He missed the snacks for about a week, he said, but seeing the chart fill up felt better than any bag of chips.'
    ],
    guide: { before: 'Teach <b>budget</b>, <b>income</b> and <b>needs</b>. Ask the child to list three needs and three wants. Have a calculator ready.',
      after: 'If you had $80 a month, how would you divide it? Make a quick plan together with saving, spending and giving.' },
    words: [['budget', 'a plan for earning, spending and saving money'], ['income', 'money that comes in'], ['needs', 'things a person must have']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the bars, which part grew from Plan A to Plan B?',
        opts: ['saving', 'spending', 'giving', 'none of them'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Mateo track his spending for a month?',
        opts: ['to find out where his money was going', 'to impress his aunt', 'to pay the food bank', 'to buy the bike right away'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Show what part of $80 each amount is, as a percent.', cols: ['Plan', 'Save', 'Spend', 'Give'],
        rows: [['Plan A', '$40 = 50%', null, null], ['Plan B', null, '$8 = 10%', null]],
        a: [[null, null, '$28 = 35%', '$12 = 15%'], [null, '$60 = 75%', null, '$12 = 15%']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Saving $40 a month, why does the bike take 6 months and not 5?',
        opts: ['After 5 months he has only $200, which is less than $225.', 'The bakery closes for a month.', 'The price goes up.', 'He gives $40 away.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“The money always seemed to <b>disappear</b>.” What does the author mean?',
        opts: ['It was spent without Mateo noticing.', 'It was stolen.', 'It turned invisible.', 'It was lost in the snow.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Sort these into needs and wants: a bus pass to school, in-game purchases, winter boots, a third bag of chips. Explain one choice.',
        a: 'Needs: bus pass, winter boots. Wants: in-game purchases, a third bag of chips. Winter boots are a need because you must stay warm and safe outside.', look: 'a correct sort and a reason for one item' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Explain the “pay yourself first” idea in your own words, and why it works.',
        a: 'Put your savings aside as soon as you get paid, before you spend. It works because money you cannot see is harder to waste on wants.', look: 'a paraphrase and the reason it works' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict how long the bike would take if Mateo saved only $25 a month. Show your thinking.',
        a: '9 months. After 8 months he would have $200, which is not enough, and after 9 months he would have $225.', look: '9 months, with multiplication or repeated addition shown' }
    ]
  });

  P.add({
    id: 'g7-lawren-harris', subject: 'arts', form: 'Biography',
    title: 'Painting the Light',
    deck: 'Lawren Harris and his journey from city streets to icy mountains',
    hero: {
      photo: 'g7-harris-superior.jpg', credit: 'Painting: Lawren Harris, 1926, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'North Shore, Lake Superior, painted by Lawren Harris in 1926. A broken tree stump stands in a beam of light.'
    },
    body: [
      'Lawren Harris was born in Brantford, Ontario, in 1885, into one of the richest families in the country. He did not need to earn a living, so he could have done anything. He chose to paint. As a young man he studied art in Germany, then came home determined to create a new kind of Canadian art that looked nothing like the gentle European landscapes in Toronto’s galleries.',
      { h: 'The Group of Seven' },
      'Harris used his wealth to help other painters. In 1914, he paid for a building in Toronto with studios for artists, including his friend Tom Thomson. After the First World War, Harris and six other painters formed the Group of Seven. In 1920 they held their first <b>exhibition</b>. Critics called some of their bold, bright paintings rough and ugly. Within a few years, though, many Canadians saw them as the look of their country.',
      { fig: '<text class="lb" x="70" y="18" text-anchor="middle">detailed</text><text class="lb" x="225" y="18" text-anchor="middle">simplified</text>' +
          '<path class="k" d="M70 140 V60 M70 80 l-18 -14 M70 74 l16 -16 M70 96 l-22 -8 M70 104 l20 -10 M52 66 l-6 -10 M86 58 l4 -12 M48 88 l-8 4"/>' +
          '<path class="t" d="M20 140 q20 -6 40 0 t40 0 t30 0"/><path class="d" d="M30 130 l6 -4 M100 132 l8 -3 M90 126 l4 -4"/>' +
          '<path class="k" d="M225 140 V66 L210 46 M225 80 L248 60"/><path class="k" d="M175 140 H285"/>' +
          '<path class="d" d="M260 26 L230 70 M276 30 L238 74"/>' +
          D.label(110, 160, 'small shapes, many lines', 70, 120) + D.label(190, 60, 'a beam of light', 248, 40),
        tall: 168, cap: 'Harris learned to leave out detail. Fewer, bolder shapes make the light and the mood stronger.' },
      { h: 'Simpler and simpler' },
      'In the 1920s, Harris painted the bare, rocky north shore of Lake Superior. He left out small details and painted smooth hills, flat water and huge skies. Light often streams in from above, as if the land were glowing. Later he painted the Rocky Mountains and, in 1930, the Arctic, after travelling north on a supply ship. Each painting was simpler than the one before. By the end of his life in Vancouver, Harris was painting <b>abstract</b> art, with no landscape at all. Some viewers were puzzled, but Harris saw it as the natural next step on a long journey.',
      { box: 'Another view', text: 'The Group of Seven often painted the North as an empty wilderness. Today, many people point out that this land was, and is, home to Anishinaabe, Cree and Inuit peoples, who are missing from the paintings.' },
      { h: 'Why it still matters' },
      'Harris believed painting could show more than what the eye sees. He wanted his art to make people feel peace and wonder. Today his paintings hang in the National Gallery and the Art Gallery of Ontario, and they remain some of the most famous images of Canada. Visitors often stand in front of them for a long time, quietly. That is exactly what Harris hoped for. He wanted people to slow down, look closely and feel something larger than themselves.'
    ],
    guide: { before: 'Look at the hero painting together for one full minute before reading. Teach <b>abstract</b> and <b>exhibition</b>.',
      after: 'How does the painting make you feel? Which detail creates that feeling?' },
    words: [['abstract', 'art that uses shapes and colours instead of showing real things'], ['exhibition', 'a public show of art']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'How did Harris help other artists?',
        opts: ['He paid for a building with studios for them.', 'He sold their paintings in Germany.', 'He taught at a school in Brantford.', 'He bought them supply ships.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram compare?',
        opts: ['a detailed drawing and a simplified one', 'two different trees', 'summer and winter', 'Harris and Thomson'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number these events in Harris’s life in order.',
        items: ['He studies art in Germany.', 'He pays for a studio building in Toronto.', 'The Group of Seven holds its first exhibition.', 'He travels to the Arctic.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is a biography?',
        opts: ['It tells the important events of a real person’s life in order.', 'It gives instructions.', 'It is told by the painter himself.', 'It has a made-up ending.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Lawren Harris was born in Brantford, Ontario, in 1885.” Why is there a comma after <b>Ontario</b>?',
        opts: ['to separate the place from the year', 'to end the sentence', 'to show a list of cities', 'to join two sentences'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Read “Another view.” Whose perspective is missing from many Group of Seven paintings? Why does it matter?',
        a: 'The Anishinaabe, Cree and Inuit peoples who lived on the land. It matters because the paintings make the North look empty, which leaves out the people whose home it is.', look: 'the missing peoples and why leaving them out matters' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Look at the painting at the top of the page. Describe one thing you notice and connect it to what the text says about Harris’s style.',
        a: 'The stump is lit by a beam of light from the sky. That matches the text: light streams in from above and he left out small details.', look: 'a detail from the painting linked to the text' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Early critics called the paintings rough and ugly, but later they became famous. What does this suggest about how people judge new art?',
        a: 'People often dislike new things at first because they are different. Over time they get used to the new style and can see its value.', look: 'a thoughtful generalization about first reactions to new art' }
    ]
  });

  P.add({
    id: 'g7-feeds', subject: 'tech', form: 'Explanation',
    title: 'Who Chooses What You See?',
    deck: 'How recommendation algorithms build your feed, and how to stay in charge',
    hero: {
      photo: 'g7-smartphone.jpg', credit: 'Photo: Océanos y dados, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Scrolling through a phone. Each post on the screen was chosen by a computer program.'
    },
    body: [
      'Open a video app, and a stream of clips begins: a skateboard trick, a cooking hack, a funny cat. It feels random, but it is not. Every video was picked for you by an <b>algorithm</b>, a set of step-by-step instructions that a computer follows. Its main goal is simple: keep you watching for as long as possible, because more watching means more ads seen and more money for the company.',
      { h: 'How the algorithm learns' },
      'The algorithm watches what you do. It notices which videos you finish, which ones you skip within a second, which ones you like, share or comment on, and even which ones you watch twice. It compares you with millions of other users who behaved the same way, then guesses what will hold your attention next. Every swipe is a piece of data that teaches it more about you.',
      { fig: '' +
          [[150, 22, 'you watch'], [228, 86, 'it records'], [150, 156, 'it predicts'], [72, 86, 'it shows more']].map(function (r) { return '<rect class="t" x="' + (r[0] - 42) + '" y="' + (r[1] - 12) + '" width="84" height="22"/><text class="n" x="' + r[0] + '" y="' + (r[1] + 3) + '" text-anchor="middle">' + r[2] + '</text>'; }).join('') +
          D.arrow(196, 26, 232, 70, 'a') + D.arrow(232, 100, 196, 146, 'a') + D.arrow(104, 146, 68, 100, 'a') + D.arrow(68, 72, 104, 26, 'a'),
        tall: 172, cap: 'The feedback loop. Each time around, the feed fits your past choices more closely.' },
      { h: 'The bubble' },
      'This loop can be helpful. If you love guitar, you will find great lessons. But it can also trap you in a <b>filter bubble</b>, where you mostly see things that match what you already watch and believe. Different views slowly disappear from your screen, and it can start to seem as if everyone thinks the way you do. Because angry or shocking videos often keep people watching, algorithms may also push more of them, even when they are not true.',
      { box: 'Check yourself', text: 'After scrolling, ask: How do I feel right now? How long was I on? Did I choose what I watched, or did the feed choose for me?' },
      { h: 'Taking back control' },
      'You cannot see inside the algorithm, but you can steer it. Search for what you actually want instead of only scrolling. Use the “not interested” button on videos that make you feel bad. Follow people with different views and interests. Many apps let you see why a video was shown, or even reset your recommendations. Your feed should work for you, not the other way around. Most of all, remember that the feed is designed to be hard to put down. Setting a timer or keeping your phone out of your bedroom at night are choices that put you, not the program, in charge.'
    ],
    guide: { before: 'If the child uses video apps, open one together and talk about why each video might have appeared. Teach <b>algorithm</b> and <b>filter bubble</b>.',
      after: 'Is your feed a good reflection of who you are? What would you change about it?' },
    words: [['algorithm', 'a set of step-by-step instructions a computer follows'], ['filter bubble', 'a situation where you mostly see things that match what you already like and believe']],
    qs: [
      { k: 'choice', code: 'A2.2', half: true, q: 'What is the main goal of a video app’s algorithm?',
        opts: ['to keep you watching as long as possible', 'to teach you new skills', 'to show only true videos', 'to save your battery'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Why is the diagram drawn as a circle?',
        opts: ['The steps repeat over and over in a loop.', 'Phones are round.', 'It shows a timer.', 'It shows the ad money.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might algorithms push angry or shocking videos?',
        opts: ['Those videos often keep people watching.', 'They are always true.', 'Users ask for them.', 'They are shorter.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does the word <b>steer</b> mean in “you can steer it”?',
        opts: ['guide it in the direction you want', 'break it', 'turn it off', 'hide from it'], a: 0 },
      { k: 'lines', code: 'A2.4', n: 3, q: 'How can a filter bubble change what a person believes? Explain using the text.',
        a: 'If you only see videos that match what you already think, different views disappear, so you may think everyone agrees with you and your beliefs get stronger without being questioned.', look: 'how seeing only matching content shapes beliefs' },
      { k: 'lines', code: 'A2.1', n: 3, q: 'Choose two tips from “Taking back control.” Explain how each one puts you in charge.',
        a: 'Searching for what I want means I choose, not the feed. Keeping my phone out of my bedroom at night means the feed cannot keep me up scrolling.', look: 'two tips and how each gives the user control' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'The author says the loop “can be helpful.” Do you think the helpful side is bigger than the harmful side? Give a reason.',
        a: 'No. Finding guitar lessons is nice, but losing different views and seeing more shocking videos can change how people think, which is more serious.', look: 'a clear opinion weighing help against harm, with a reason' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence gives a command?',
        opts: ['Search for what you actually want instead of only scrolling.', 'The algorithm watches what you do.', 'This loop can be helpful.', 'It feels random, but it is not.'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-missing-map', subject: 'story', form: 'Mystery', plain: true,
    title: 'The Missing Map',
    deck: 'A short mystery. Read carefully: every clue you need is in the story.',
    hero: {
      photo: 'g7-old-map.jpg', credit: 'Map: Johnson and Ward, 1862, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An old map of Ontario and Quebec from 1862. Paper this old is fragile and must be protected from damp and light.'
    },
    body: [
      'The glass case was empty. Yesterday it had held the pride of the little museum in Perth, Ontario: a map of the town drawn by hand in 1834, the ink faded to brown. Now there was only a pale rectangle on the green cloth where it had lain.',
      '“The case wasn’t broken,” said Ms. Mensah, the <b>curator</b>, who had just returned from a trip to Ottawa. “It was locked. Only Mr. Doucet and I have keys.”',
      'I had come with my class for a field trip, but the tour had stopped. While the adults talked, I looked around. That is what my grandmother calls being nosy, and what I call being a good observer.',
      { fig: '<path class="k" d="M180 60 V20 H20 V140 H180 V96 M180 60 H290 M180 96 H290"/>' +
          '<rect class="h" x="80" y="64" width="44" height="28"/><text class="n" x="102" y="56" text-anchor="middle">empty case</text>' +
          '<circle class="dot" cx="26" cy="40" r="4"/>' + D.label(40, 34, 'dial: 72%', 30, 40, 'start') +
          '<path class="a" d="M132 96 q4 4 8 0"/>' + D.label(96, 128, 'white thread', 134, 100, 'start') +
          '<path class="k" d="M262 60 V96 M270 60 V96 M278 60 V96"/><text class="n" x="270" y="112" text-anchor="middle">stairs</text>' +
          D.ripple(222, 254, 84, 't') + '<text class="n" x="238" y="112" text-anchor="middle">wet</text>' +
          '<circle class="k" cx="200" cy="78" r="8"/><text class="n" x="200" y="52" text-anchor="middle">fan</text>' +
          '<text class="lb" x="236" y="140" text-anchor="middle">hall</text>',
        tall: 160, cap: 'The narrator’s sketch of the museum room and hall, showing where each clue was found.' },
      { h: 'The clues' },
      'The air in the room felt heavy and damp, like a basement. Beside the case, a small dial on the wall read 72%. A card under it said, in neat handwriting: <i>Humidity above 60%: move paper items to the vault at once.</i> On the floor near the case lay a tiny white thread, the kind that comes from a cotton glove. Down the hall I could hear a fan roaring, and the floor near the stairs was wet.',
      'Then there was Kyle, a visitor from the day before. Mr. Doucet said Kyle had asked three times how much the map was worth. Everyone turned to look at the guest book where Kyle had signed his name.',
      { box: 'Stop and think', text: 'Before you read on, decide who you think took the map, and why. Which clues support your idea?' },
      { h: 'The answer' },
      '“Mr. Doucet,” I said, “was there a leak last night?”',
      'He blinked. “A pipe burst in the basement. I was up half the night with buckets.”',
      '“So the <b>humidity</b> went way up,” I said, pointing at the dial. “And someone followed the rule on that card, wearing cotton gloves so the oils from their hands wouldn’t harm the paper.” I held up the thread.',
      'Mr. Doucet’s face went red, then he laughed. “I moved it to the vault myself! I meant to leave a note, but then the water started pouring in.” He hurried downstairs and came back holding a flat grey box. Inside, safe and dry, lay the map.',
      'Kyle, it turned out, was just curious. Not every question is a clue.'
    ],
    guide: { before: 'Explain that a mystery gives clues so the reader can solve it. Teach <b>curator</b> and <b>humidity</b>. Stop at the box and have the child make a prediction before reading the ending.',
      after: 'Which clue mattered most? Which detail was put there to mislead you?' },
    words: [['curator', 'the person in charge of a museum’s collection'], ['humidity', 'the amount of water vapour in the air']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What feature of a mystery does the “Stop and think” box use?',
        opts: ['It invites the reader to solve the puzzle before the answer.', 'It gives the moral of the story.', 'It lists the characters.', 'It explains a science fact.'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who tells this story?',
        opts: ['a student on a field trip, using “I”', 'Ms. Mensah', 'Mr. Doucet', 'an outside narrator who knows everything'], a: 0 },
      { k: 'table', code: 'C3.4', q: 'Explain what each clue meant.', cols: ['Clue', 'What it meant'],
        rows: [['the dial read 72%', null], ['a white cotton thread', null], ['the wet floor and the roaring fan', null], ['the case was locked, not broken', null]],
        a: [[null, 'The air was too damp, so the rule said to move the map.'], [null, 'Someone wore cotton gloves to handle the map carefully.'], [null, 'There was a leak, which made the air damp.'], [null, 'Someone with a key took it.']] },
      { k: 'choice', code: 'C1.5', half: true, q: 'Kyle’s questions about the map’s value are a <b>red herring</b>. What is a red herring?',
        opts: ['a clue that leads readers to the wrong answer', 'the most important clue', 'the solution', 'a kind of map'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is the sentence on the card written in italics?',
        opts: ['to show the exact words written on the card', 'to show someone is shouting', 'to show it is the title', 'to show it is a foreign language'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Stop at the box. What was your prediction before reading the ending? Was it correct? Which clue changed your thinking, if any?',
        a: 'At first I thought Kyle took it, because he asked about the value. Then I noticed the thread and the card, so I predicted someone moved it to the vault.', look: 'a stated prediction and a clue that confirmed or changed it' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which sentence did you need to reread to solve the mystery? What did rereading help you notice?',
        a: 'I reread the card under the dial. It helped me notice that the map was supposed to be moved when the humidity was high.', look: 'a specific sentence and what rereading revealed' },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What is the message of the last line, “Not every question is a clue”?',
        a: 'We should not judge someone as guilty just because they seem curious or suspicious. We need real evidence.', look: 'the idea of not jumping to conclusions about people' }
    ]
  });

  P.add({
    id: 'g7-boreal-forestry', subject: 'geography', form: 'Report',
    title: 'Harvesting the Northern Forest',
    deck: 'How Ontario’s boreal forest can supply wood and stay healthy',
    hero: {
      photo: 'g7-taiga.jpg', credit: 'Photo: peupleloup, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The boreal forest stretches across northern Canada in a broad band of spruce, pine, poplar, lakes and wetlands.'
    },
    body: [
      'A broad band of forest stretches across Canada, from Yukon to Newfoundland and Labrador. This is the <b>boreal forest</b>, and it covers more than half of Ontario. Black spruce, jack pine, poplar and birch grow among countless lakes, rivers and bogs. Moose, lynx, wolves and woodland caribou live here, and billions of birds nest here each summer.',
      { h: 'A working forest' },
      'The boreal forest is also a source of jobs. Trees are harvested to make lumber for houses, paper, cardboard boxes and even clothing fibres. Many northern towns, such as Hearst and Kapuskasing, grew up around sawmills and paper mills. The challenge is to cut trees without destroying the forest that people, animals and the climate depend on. This is called <b>sustainable</b> forestry.',
      { fig: [['year 0', 0], ['year 5', 1], ['year 30', 2], ['year 70', 3]].map(function (r, i) {
            var x = 20 + i * 72, h = [0, 12, 34, 60][i]; return '<path class="k" d="M' + x + ' 130 H' + (x + 56) + '"/>' +
              (h ? [0, 1, 2].map(function (j) { return D.spruce(x + 12 + j * 16, 130, h); }).join('') : '<path class="d" d="M' + (x + 8) + ' 126 h8 M' + (x + 26) + ' 127 h10 M' + (x + 42) + ' 125 h6"/>') +
              '<text class="n" x="' + (x + 28) + '" y="148" text-anchor="middle">' + r[0] + '</text>'; }).join('') +
          D.arrow(30, 22, 270, 22, 'a') + '<text class="l" x="150" y="40" text-anchor="middle">a harvested area grows back</text>',
        tall: 156, cap: 'After harvest, new trees are planted or allowed to seed. It takes many decades for a forest to grow back.' },
      { h: 'Rules for cutting' },
      'In Ontario, companies may cut trees on public land only with an approved forest management plan. The plan says where and how much can be harvested, and how the forest will grow back. After a harvest, workers plant seedlings or leave trees that will drop seeds. Every year, tree planters in Ontario put tens of millions of seedlings in the ground. Areas near rivers and lakes are left uncut to protect fish and water. Forest scientists check the cut areas years later to make sure young trees are growing back well.',
      { box: 'Caribou need space', text: 'Woodland caribou avoid roads and recently cut areas, where wolves can hunt more easily. Protecting large, unbroken stretches of older forest is key to their survival.' },
      { h: 'Who decides?' },
      'Most of the boreal forest is also the homeland of First Nations, including Cree, Oji-Cree and Anishinaabe communities. For a long time, decisions about logging were made far away, without them. Today, some First Nations, such as Pikangikum in northwestern Ontario, lead the planning for their own lands, deciding which areas to protect, which to harvest and how. Many people believe this partnership is the best path to a forest that lasts, because the people who live on the land see the forest every day and plan for their grandchildren.'
    ],
    guide: { before: 'Find Hearst, Kapuskasing and Pikangikum on a map of Ontario. Teach <b>boreal forest</b> and <b>sustainable</b>. Look around the room for things made from wood or paper.',
      after: 'Why should the people who live in a forest have a say in how it is used?' },
    words: [['boreal forest', 'the northern forest of spruce, pine and other trees that circles the top of the world'], ['sustainable', 'able to continue for a long time without causing lasting harm']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What is sustainable forestry?',
        opts: ['cutting trees without destroying the forest people and animals depend on', 'cutting every tree at once', 'never cutting any trees', 'planting only one kind of tree'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['how a harvested area slowly grows back over decades', 'how fast caribou grow', 'how paper is made', 'the map of Ontario'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are areas near rivers and lakes left uncut?',
        opts: ['to protect fish and water', 'because trees there are too small', 'because the trucks cannot reach them', 'for tourists'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Sustainable</b> is made from <b>sustain</b> + <b>-able</b>. What does <b>-able</b> mean?',
        opts: ['can be done', 'not', 'full of', 'before'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why is it hard for woodland caribou to survive in areas with many roads and cut forests?',
        a: 'Caribou avoid roads and cut areas, and wolves can hunt them more easily there, so they need large stretches of older forest to stay safe.', look: 'both reasons: caribou avoid these areas and wolves hunt more easily' },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How has the way decisions are made about the forest changed over time?',
        a: 'Decisions were once made far away without First Nations. Now some First Nations, such as Pikangikum, lead the planning for their own lands.', look: 'the change from outside control to First Nations leadership' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the report in two or three sentences.',
        a: 'Ontario’s boreal forest is home to many animals and provides jobs. Sustainable forestry uses rules and replanting so the forest lasts. First Nations increasingly lead decisions about their lands.', look: 'the forest’s value, sustainable rules and First Nations leadership' },
      { k: 'choice', code: 'C2.2', q: 'Which reader would find this report most useful?',
        opts: ['a student researching how forests are managed in Ontario', 'someone looking for a recipe', 'a person learning to swim', 'a tourist looking for hotels in Toronto'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-greenhouse-effect', subject: 'science', form: 'Explanation',
    title: 'A Blanket Around the Planet',
    deck: 'How the greenhouse effect keeps Earth warm, and why it is getting stronger',
    hero: {
      photo: 'g7-atmosphere.jpg', credit: 'Photo: NASA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Earth’s atmosphere and the Moon, seen from the International Space Station. The thin blue layer keeps our planet warm.'
    },
    body: [
      'Seen from space, the <b>atmosphere</b> looks as thin as the skin on an apple. Yet this layer of gases does something remarkable. Without it, Earth’s average temperature would be about −18 °C, colder than a January night in Winnipeg, all year round. Instead, the average is about 15 °C. The difference comes from the greenhouse effect.',
      { h: 'Light in, heat out' },
      'Sunlight passes easily through the atmosphere and warms the land and oceans. The warm Earth then gives off energy of its own, as invisible infrared radiation, or heat. Some of this heat escapes to space. But certain gases in the air, called <b>greenhouse gases</b>, absorb much of it and send it back in all directions, including back toward the ground. Water vapour, carbon dioxide and methane are the most important ones.',
      { fig: '<path class="k" d="M10 140 H290"/><path class="t" d="M10 62 H290"/><text class="n" x="14" y="56">greenhouse gases</text>' +
          '<circle class="k" cx="270" cy="24" r="12"/>' + D.arrow(258, 34, 215, 136, 'a') +
          '<path class="d" d="M100 136 L115 62"/>' + D.arrow(115, 62, 125, 18, 'a') + '<text class="l" x="132" y="24">some heat escapes</text>' +
          '<path class="d" d="M150 136 L165 66"/>' + D.arrow(165, 66, 185, 134, 'a') +
          '<text class="lb" x="40" y="160" text-anchor="middle">Earth</text><text class="l" x="160" y="160" text-anchor="middle">heat sent back</text><text class="l" x="258" y="160" text-anchor="middle">sunlight in</text>',
        tall: 168, cap: 'Sunlight passes in. Greenhouse gases trap some of the heat Earth gives off and send it back down.' },
      'This works a little like a blanket on a cold night. A blanket does not make heat, but it slows down how fast your body’s heat escapes, so you stay warm.',
      { h: 'Turning up the effect' },
      'For thousands of years, the amount of carbon dioxide in the air stayed fairly steady. Then, starting in the 1800s, people began burning huge amounts of coal, oil and gas to run factories, heat homes and power cars. Burning these fossil fuels releases carbon dioxide. Since then, carbon dioxide in the air has risen by about 50%. Cutting down forests adds even more, because trees take carbon dioxide out of the air.',
      { box: 'A thicker blanket', text: 'More greenhouse gas means more heat is held in. Earth’s average temperature has already risen by more than 1 °C since the late 1800s. Canada’s North is warming about three times faster.' },
      'A degree may not sound like much, but it changes a lot. Ice melts, sea levels rise, and heat waves, droughts and wildfires grow more common. Scientists agree that cutting greenhouse gas pollution, through cleaner energy, efficient buildings and protecting forests, can slow the warming. Many Canadian cities and towns already have plans to cut their pollution, and young people across the country are pushing for faster action.'
    ],
    guide: { before: 'Sit in a sunny car or by a window and notice how warm it gets. Teach <b>atmosphere</b> and <b>greenhouse gases</b>. Explain that infrared is a kind of light we cannot see.',
      after: 'What is one change your family or school could make to burn less fossil fuel?' },
    words: [['atmosphere', 'the layer of gases around Earth'], ['greenhouse gases', 'gases that trap heat in the atmosphere']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps of the greenhouse effect in order.',
        items: ['Sunlight passes through the atmosphere.', 'The land and oceans warm up.', 'Earth gives off heat.', 'Greenhouse gases send some heat back down.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what happens to some of the heat Earth gives off?',
        opts: ['It escapes to space.', 'It turns into sunlight.', 'It becomes a cloud.', 'It goes underground.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the author compare the atmosphere to a blanket?',
        opts: ['A blanket slows heat from escaping, like greenhouse gases do.', 'Both are made of cotton.', 'Both are blue.', 'A blanket makes its own heat.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does cutting down forests add to the problem?',
        opts: ['Trees take carbon dioxide out of the air.', 'Trees make sunlight.', 'Trees are greenhouse gases.', 'Forests are cold.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Without the atmosphere, the average would be about −18 °C. What does <b>average</b> mean here?',
        opts: ['a typical value found by combining many temperatures', 'the highest temperature', 'the coldest night', 'a guess'], a: 0 },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about climate change before reading? What new idea did this text add?',
        a: 'I knew the world is getting warmer. I learned that the greenhouse effect is natural and keeps Earth livable, but burning fossil fuels makes it stronger.', look: 'prior knowledge and one new idea from the text' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Is the greenhouse effect good or bad? Explain why the answer is “both.”',
        a: 'It is good because without it Earth would be about −18 °C. It becomes a problem when extra greenhouse gases make it stronger, causing warming, melting ice and more wildfires.', look: 'the natural benefit and the harm of a stronger effect' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which part of this text was hardest to understand? What did you do to make sense of it?',
        a: 'The part about infrared heat was hard. I looked at the arrows in the diagram and thought about the blanket comparison, and then it made sense.', look: 'a hard part named and a strategy that helped' }
    ]
  });

  P.add({
    id: 'g7-red-river', subject: 'history', form: 'Report',
    title: 'Pemmican and Power',
    deck: 'How a fight over food at Red River led to the Battle of Seven Oaks in 1816',
    hero: {
      photo: 'g7-red-river-cart.jpg', credit: 'Photo: Viola-Ness, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 60%',
      tall: 200,
      cap: 'A Red River cart. Made entirely of wood and rawhide, carts like this carried goods for hundreds of kilometres across the prairie.'
    },
    body: [
      'In the early 1800s, where the Red and Assiniboine rivers meet, in what is now Winnipeg, a new people had grown strong. The <b>Métis</b>, descendants of First Nations women and European fur traders, had their own language, Michif, their own customs and their own way of life. Each summer and fall they rode out on great bison hunts, organized with strict rules and elected captains.',
      { h: 'Food for the fur trade' },
      'From the bison, Métis women made <b>pemmican</b>: dried meat pounded into powder and mixed with melted fat, sometimes with berries. It was light, full of energy and kept for years. The North West Company, a fur-trading company based in Montréal, depended on it. Its canoe crews ate pemmican as they paddled thousands of kilometres to the far northwest. Without it, the fur trade could not run.',
      { fig: '<path class="k" d="M20 60 H280"/>' + [[34, '1812', 'settlers', 'arrive'], [116, '1814', 'Pemmican', 'Proclamation'], [198, '1816', 'Battle of', 'Seven Oaks'], [268, '1821', 'companies', 'join']].map(function (r) { return '<circle class="dot" cx="' + r[0] + '" cy="60" r="5"/><text class="lb" x="' + r[0] + '" y="44" text-anchor="middle">' + r[1] + '</text><text class="l" x="' + r[0] + '" y="82" text-anchor="middle">' + r[2] + '</text><text class="l" x="' + r[0] + '" y="96" text-anchor="middle">' + r[3] + '</text>'; }).join(''),
        tall: 110, cap: 'Key events at Red River.' },
      { h: 'A colony in the way' },
      'In 1812, Lord Selkirk, a Scottish noble with a large share in the rival Hudson’s Bay Company, sent poor Scottish farmers to start a farming colony at Red River. The settlers struggled through hard winters. In 1814, their governor, Miles Macdonell, issued the Pemmican Proclamation, which banned anyone from taking pemmican out of the colony. To the Métis and the North West Company, it was an attack on their livelihood and on Métis rights to the land and its resources.',
      { box: 'The Red River cart', text: 'Métis carts were built entirely from wood and rawhide, so they could be fixed on the trail. Their ungreased wooden axles screeched so loudly they could be heard kilometres away.' },
      { h: 'Seven Oaks' },
      'Tensions grew. On June 19, 1816, a group of Métis led by the young Cuthbert Grant was moving pemmican past the colony. The new governor, Robert Semple, came out with about 25 armed men to stop them. No one knows for sure who fired first. In a few minutes, Semple and about 20 of his men were dead, along with one Métis man. For the Métis, Seven Oaks became a symbol of their strength as a nation. A Métis singer, Pierre Falcon, wrote a song about it that is still sung. In 1821, the two fur companies joined into one, ending the violent rivalry. Today, many Métis people remember Seven Oaks each June, and the story is told from both sides at the site, now a park in Winnipeg.'
    ],
    guide: { before: 'Find Winnipeg and the Red and Assiniboine rivers on a map. Teach <b>Métis</b> and <b>pemmican</b>. Explain that the two fur companies were rivals.',
      after: 'The two sides saw Seven Oaks very differently. How could the same event mean such different things to different people?' },
    words: [['Métis', 'a distinct Indigenous people descended from First Nations and European ancestors'], ['pemmican', 'dried meat pounded and mixed with fat']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why was pemmican so important to the North West Company?',
        opts: ['Its canoe crews needed it as food on long journeys.', 'It was sold in Scotland.', 'It was used to grease carts.', 'It was traded for bison.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the timeline help you see?',
        opts: ['the order of events, from the colony to the companies joining', 'how far Red River is from Montréal', 'how pemmican is made', 'who fired first'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why did the Métis see the Pemmican Proclamation as an attack?',
        a: 'Making and selling pemmican was their livelihood, and the ban tried to control the land and resources they had rights to.', look: 'livelihood and rights to land and resources' },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why could Red River carts be fixed on the trail?',
        opts: ['They were made only of wood and rawhide.', 'They carried spare metal parts.', 'They had rubber tires.', 'They were very small.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>livelihood</b> mean?',
        opts: ['the way a person earns a living', 'a long life', 'a kind of food', 'a lively song'], a: 0 },
      { k: 'lines', code: 'C1.6', n: 3, q: '“No one knows for sure who fired first.” Why do you think the author included this sentence?',
        a: 'To be fair to both sides. Each side told a different story, and the author does not want to blame one side without proof.', look: 'the idea of fairness and uncertain evidence' },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How does the Battle of Seven Oaks still matter to Métis people today? Use the text.',
        a: 'It became a symbol of their strength as a nation, and Pierre Falcon’s song about it is still sung.', look: 'the symbol of nationhood and the song' },
      { k: 'choice', code: 'B3.2', q: 'In “The settlers struggled through hard winters,” what is the subject?',
        opts: ['The settlers', 'struggled', 'hard winters', 'through'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-food-labels', subject: 'health', form: 'Explanation',
    title: 'Reading the Box',
    deck: 'How to use a Nutrition Facts table to compare foods',
    hero: {
      photo: 'g7-cereal-aisle.jpg', credit: 'Photo: Vauxford, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A cereal aisle. Two boxes can look alike on the front and be very different inside.'
    },
    body: [
      'The front of a cereal box is designed to sell. It might show a smiling athlete, bright colours and words like “natural” or “made with whole grains.” The side of the box is different. There, by law, every packaged food in Canada must print a <b>Nutrition Facts table</b> and a list of ingredients. These tell you what is really inside. Learning to read them is a skill you will use for the rest of your life, every time you shop, pack a lunch or choose a snack.',
      { h: 'Start at the top' },
      'The first line gives the <b>serving size</b>, such as “¾ cup (30 g).” Every number below is for that amount only. If you pour a bowl twice as big, you need to double everything. Below that are the calories, the amount of energy in one serving, and then nutrients such as fat, sodium, fibre, sugars and protein. Look closely: some small packages, like a bag of chips or a bottle of juice, contain two or even three servings, even though most people finish them in one sitting.',
      { fig: '<rect class="k" x="70" y="8" width="160" height="148"/>' +
          '<text class="lb" x="78" y="26">Nutrition Facts</text><text class="n" x="78" y="40">Per ¾ cup (30 g)</text><path class="k" d="M78 46 H222"/>' +
          [['Calories 120', '', 60], ['Fat 2 g', '3 %', 76], ['Sodium 200 mg', '9 %', 92], ['Fibre 4 g', '14 %', 108], ['Sugars 9 g', '9 %', 124], ['Protein 3 g', '', 140]].map(function (r) { return '<text class="n" x="78" y="' + r[2] + '">' + r[0] + '</text><text class="n" x="222" y="' + r[2] + '" text-anchor="end">' + r[1] + '</text>'; }).join('') +
          D.label(4, 30, 'serving size', 74, 38, 'start') + D.label(236, 52, '% Daily Value', 214, 64, 'start'),
        tall: 160, cap: 'A simplified Nutrition Facts table. Every number is for one serving.' },
      { h: 'The 5–15 rule' },
      'On the right side is the <b>% Daily Value</b>. It tells you whether a serving has a little or a lot of a nutrient, compared with what a person needs in a whole day. A quick rule: 5% or less is a little, and 15% or more is a lot. You want a lot of helpful nutrients, like fibre, calcium and iron. You want only a little sodium, sugars and saturated fat, because too much of them over time can harm your heart and teeth. Use the rule to compare two foods side by side. If one cereal has 2% fibre and another has 15%, the second is the better choice for fibre, even if the boxes look alike.',
      { box: 'A new symbol', text: 'Many packaged foods in Canada now carry a black-and-white magnifying-glass symbol on the front. It warns when a food is high in saturated fat, sugars or sodium.' },
      { h: 'Check the ingredients' },
      'The ingredient list is written in order by weight, from most to least. If sugar is near the start, there is a lot of it. Watch for its other names too: glucose, honey, syrup and many words ending in -ose. Reading labels takes only a minute, and it lets you, not the picture on the front, decide what goes in your bowl. No single food is “good” or “bad.” What matters most is the pattern of what you eat over days and weeks.'
    ],
    guide: { before: 'Bring two cereal or granola bar boxes to the table. Teach <b>serving size</b> and <b>% Daily Value</b>. Find the table on each box before reading.',
      after: 'Compare your two boxes using the 5–15 rule. Which would you choose, and why?' },
    words: [['serving size', 'the amount of food that the numbers on the label describe'], ['% Daily Value', 'how much of a day’s nutrient needs one serving gives']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why should you check the serving size first?',
        opts: ['All the other numbers are for that amount only.', 'It is the biggest number.', 'It shows the price.', 'It tells you the calories.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Look at the table in the diagram. Which nutrient has a lot, using the 5–15 rule?',
        opts: ['fibre (14 %)', 'fat (3 %)', 'sodium (9 %)', 'none of them'], a: 3 },
      { k: 'choice', code: 'C3.2', half: true, q: 'If you eat two servings of the cereal in the diagram, how much sugar do you get?',
        opts: ['18 g', '9 g', '4.5 g', '30 g'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'How is the section “Start at the top” organized?',
        opts: ['in the order you read the table, from top to bottom', 'from most to least healthy', 'as a story', 'as questions and answers'], a: 0 },
      { k: 'lines', code: 'A2.4', n: 3, q: 'The front of a box shows “a smiling athlete” and the word “natural.” How are these meant to influence you? Why check the side?',
        a: 'They make the food seem healthy and active so you want to buy it. The side shows the real facts, so you can see if it is actually healthy.', look: 'the persuasive purpose and the value of the facts table' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Fibre is 14 %. Is that a little or a lot? Explain how you checked your thinking using the text.',
        a: 'It is close to a lot but not quite, because 15 % or more is a lot. I went back to the 5–15 rule to check.', look: 'a correct judgment and returning to the rule to check' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Sugar is the third ingredient in one granola bar and the eighth in another. What can you conclude? Use the text.',
        a: 'The first bar has more sugar, because ingredients are listed from most to least by weight.', look: 'the first bar has more sugar, with the order-by-weight reason' },
      { k: 'choice', code: 'B2.1', q: 'Glucose, fructose and sucrose are all sugars. What clue in the words tells you so?',
        opts: ['They end in -ose.', 'They start with s.', 'They are long words.', 'They have the letter c.'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-pi', subject: 'math', form: 'Explanation',
    title: 'The Number That Never Ends',
    deck: 'How people discovered π, the secret inside every circle',
    hero: {
      photo: 'g7-pi-day.jpg', credit: 'Photo: Marnie Briggs, NSF, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A Pi Day celebration. Every year on March 14 (3/14), people celebrate the number π.'
    },
    body: [
      'Find something round: a can, a plate, a bicycle wheel. Wrap a string around it to measure the distance around, called the <b>circumference</b>. Then measure straight across the middle, through the centre. This is the <b>diameter</b>. Now divide the circumference by the diameter. Whatever circle you choose, from a coin to a Ferris wheel, you will get a number just a little more than 3.',
      { fig: '<circle class="k" cx="60" cy="56" r="44"/><path class="a" d="M16 56 H104"/><text class="l" x="60" y="50" text-anchor="middle">diameter</text>' +
          '<path class="h" d="M10 150 H286"/>' + [10, 98, 186, 274].map(function (x) { return '<path class="k" d="M' + x + ' 142 V158"/>'; }).join('') +
          '<text class="n" x="54" y="172" text-anchor="middle">1 diameter</text><text class="n" x="142" y="172" text-anchor="middle">2</text><text class="n" x="230" y="172" text-anchor="middle">3</text><text class="n" x="290" y="136" text-anchor="end">a bit more</text>' +
          '<text class="l" x="10" y="132">the circumference, unrolled</text>',
        tall: 178, cap: 'Unrolled, a circle’s circumference is just over 3 diameters long.' },
      { h: 'The same every time' },
      'That number is called pi, written with the Greek letter π. It is about 3.14. This means the distance around any circle is always about 3.14 times the distance across it. People noticed this thousands of years ago. Builders in ancient Egypt and Babylon used values close to 3, and a Babylonian clay tablet gives a value of about 3.125. Their measurements were careful, but measuring with string and rulers can only take you so far. To find π more exactly, someone needed a better method.',
      { h: 'Squeezing the circle' },
      'About 2 250 years ago, the Greek mathematician Archimedes found a clever way to get closer. He drew a six-sided shape inside a circle and another outside it. The circle’s circumference had to be somewhere between their perimeters, which were easy to calculate. Then he doubled the number of sides, again and again, up to 96. The shapes hugged the circle more tightly each time. He proved that π was between 3 10/71 and 3 1/7, or about 3.14.',
      { box: 'Did you know?', text: 'Using computers, people have calculated π to more than 100 trillion digits. For almost any real calculation, though, a few digits are plenty.' },
      { h: 'A number with no end' },
      'In the 1700s, mathematicians proved something surprising. The digits of π go on forever, and they never fall into a repeating pattern. Numbers like this are called <b>irrational</b>. You can never write π exactly as a fraction or decimal, so we round it: 3.14 or 22/7 for most work. Even so, π is everywhere: in wheels and pipes, in the orbits of planets, and in the ripples spreading across a pond. Engineers use it to design tunnels and water pipes, and scientists use it to measure the size of distant planets. One simple ratio turns up all over the universe.'
    ],
    guide: { before: 'Gather three round objects, a string and a ruler. Measure and divide together before reading. Teach <b>circumference</b>, <b>diameter</b> and <b>irrational</b>.',
      after: 'Your measurements probably did not give exactly 3.14. Why not?' },
    words: [['circumference', 'the distance around a circle'], ['diameter', 'the distance across a circle through its centre'], ['irrational', 'a number whose digits go on forever without repeating']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['The circumference is just over 3 diameters long.', 'A circle has 3 sides.', 'The diameter is longer than the circumference.', 'π is exactly 3.'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'A wheel has a diameter of 50 cm. About how far does it roll in one turn?',
        opts: ['157 cm', '50 cm', '100 cm', '25 cm'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number these events in the story of π in order.',
        items: ['Builders in Babylon use values close to 3.', 'Archimedes uses shapes with 96 sides.', 'Mathematicians prove the digits never repeat.', 'Computers calculate trillions of digits.'], show: [2, 3, 0, 1] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain how Archimedes “squeezed” the circle to find π.',
        a: 'He drew shapes inside and outside the circle. The circumference had to be between their perimeters. Doubling the sides made the shapes hug the circle, so the range got smaller.', look: 'inside and outside shapes, and more sides narrowing the range' },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Irrational</b> means “not a ratio.” What does the prefix <b>ir-</b> mean?',
        opts: ['not', 'again', 'before', 'very'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In the heading “Squeezing the circle,” what does <b>squeezing</b> suggest?',
        opts: ['closing in on the answer from both sides', 'crushing a circle', 'making the circle smaller', 'drawing a square'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Name two places outside of math class where you have seen circles. Why might someone there need π?',
        a: 'A bike wheel and a round pizza. A bike maker needs π to know how far the wheel rolls, and a pizza shop needs it to work out the size of a pizza box.', look: 'two real places and a sensible use of π' },
      { k: 'lines', code: 'C2.7', n: 2, q: 'Did measuring a real object first help you understand π? Explain.',
        a: 'Yes. When I wrapped a string around a can and divided, I got about 3, so I could see the rule was true.', look: 'a reflection linked to the hands-on activity' }
    ]
  });

  P.add({
    id: 'g7-stratford', subject: 'arts', form: 'Report',
    title: 'A Stage in a Tent',
    deck: 'How a small railway town became home to one of the world’s great theatres',
    hero: {
      photo: 'g7-stratford.jpg', credit: 'Photo: Chris Woodrich, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The Festival Theatre in Stratford, Ontario. Its round roof recalls the tent where the festival began.'
    },
    body: [
      'In the early 1950s, Stratford, Ontario, was a quiet railway town whose jobs were disappearing. The town shared its name with Stratford-upon-Avon in England, the birthplace of William Shakespeare. A local journalist, Tom Patterson, had a bold dream: a Shakespeare festival in a town with no theatre company, no theatre and very little money.',
      { h: 'Building a dream' },
      'Many people laughed, but Patterson kept going. He convinced the famous British director Tyrone Guthrie to come, and Guthrie brought the star actor Alec Guinness. Volunteers raised money door to door. With no time or money for a building, the festival opened in July 1953 under a giant canvas tent. Rain drummed on the roof, and trains sometimes whistled during the plays, but the first season was a huge success.',
      { fig: '<text class="lb" x="70" y="18" text-anchor="middle">proscenium stage</text><text class="lb" x="225" y="18" text-anchor="middle">thrust stage</text>' +
          '<rect class="h" x="30" y="32" width="80" height="40"/><path class="k" d="M24 72 H116"/>' +
          [0, 1, 2].map(function (r) { return '<path class="t" d="M' + (24 + r * 0) + ' ' + (92 + r * 18) + ' H116"/>'; }).join('') +
          '<rect class="h" x="200" y="32" width="50" height="20"/><path class="h" d="M195 52 H255 L245 96 H205 Z"/>' +
          [0, 1, 2].map(function (r) { return '<path class="t" d="M' + (180 - r * 14) + ' ' + (44 + r * 6) + ' L' + (192 - r * 14) + ' ' + (104 + r * 14) + ' H' + (258 + r * 14) + ' L' + (270 + r * 14) + ' ' + (44 + r * 6) + '"/>'; }).join('') +
          '<text class="n" x="70" y="160" text-anchor="middle">audience on one side</text><text class="n" x="225" y="160" text-anchor="middle">audience on three sides</text>',
        tall: 170, cap: 'Seen from above. On a thrust stage, the audience wraps around the actors.' },
      { h: 'A new kind of stage' },
      'Guthrie and the designer Tanya Moiseiwitsch created a <b>thrust stage</b>. In most theatres, the audience sits in front of a stage framed like a picture, called a <b>proscenium</b>. A thrust stage instead juts out into the audience, which sits around it on three sides. Actors are surrounded by people, and no seat is far from the action. There is almost no scenery, so the audience must use their imagination, guided by the words, costumes and movement.',
      { box: 'Did you know?', text: 'In the Festival Theatre, no seat is more than about 20 m from the stage, even though it holds about 1 800 people.' },
      { h: 'From tent to festival' },
      'In 1957 the tent was replaced by the permanent Festival Theatre, its roof shaped to remember the tent. Today the festival runs from spring to fall in four theatres, with musicals and new Canadian plays as well as Shakespeare. Hundreds of thousands of visitors come each year, and the town’s shops, restaurants and hotels depend on them. A dream that many people laughed at changed the future of an entire town. Many famous Canadian actors got their start on the Stratford stage, and school groups from across Ontario still travel there to see Shakespeare come alive.'
    ],
    guide: { before: 'Explain who Shakespeare was. Teach <b>thrust stage</b> and <b>proscenium</b>. Arrange chairs on three sides of a rug to make a thrust stage.',
      after: 'Would you rather watch a play on a thrust stage or a proscenium stage? Why?' },
    words: [['thrust stage', 'a stage that juts out so the audience sits on three sides'], ['proscenium', 'a stage framed like a picture, with the audience in front']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did Tom Patterson want a festival in Stratford?',
        opts: ['The town needed new life, and it shared a name with Shakespeare’s birthplace.', 'He owned a theatre there.', 'The town was very rich.', 'Shakespeare lived there.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram compare?',
        opts: ['where the audience sits for two kinds of stages', 'the size of two towns', 'two kinds of tents', 'actors and directors'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A thrust stage <b>juts out</b> into the audience. What does <b>juts out</b> mean?',
        opts: ['sticks out', 'falls down', 'is hidden', 'moves around'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does a thrust stage use almost no scenery?',
        opts: ['The audience sits on three sides, so big scenery would block views.', 'There was no money for scenery.', 'Shakespeare banned it.', 'It was raining.'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Compare the two kinds of stages.', cols: ['', 'Proscenium', 'Thrust'],
        rows: [['Where the audience sits', 'in front', null], ['Scenery', null, 'almost none']],
        a: [[null, null, 'on three sides'], [null, 'framed like a picture, with scenery', null]] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How did the festival change the town of Stratford? Use evidence from the text.',
        a: 'It turned a quiet town with disappearing jobs into a place visited by hundreds of thousands of people each year, and shops, restaurants and hotels depend on them.', look: 'before and after, with evidence' },
      { k: 'lines', code: 'C3.8', n: 3, q: '“Many people laughed, but Patterson kept going.” What lesson about big ideas does this story teach? Do you agree?',
        a: 'Big ideas can work if you keep going even when others doubt you. I agree, but it also took help from many volunteers.', look: 'a lesson and a personal response with a reason' },
      { k: 'lines', code: 'B1.1', n: 2, q: 'Watching a play with no scenery, what must the audience listen for to imagine the setting?',
        a: 'The words the actors say about where they are, and clues in their voices and movements.', look: 'listening to the words and voices for setting clues' }
    ]
  });

  P.add({
    id: 'g7-canadarm', subject: 'tech', form: 'Report',
    title: 'Canada’s Arm in Space',
    deck: 'How Canadian engineers built the robot arms that help astronauts work in orbit',
    hero: {
      photo: 'g7-canadarm2.jpg', credit: 'Photo: NASA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Canadarm2 on the International Space Station, with Earth far below.'
    },
    body: [
      'In 1981, the space shuttle Columbia opened its cargo bay doors in orbit, and a long white arm unfolded. It was the first Canadarm, built by engineers in Toronto and Montréal. Over 30 years, it flew on 90 missions. It launched satellites, caught broken ones so astronauts could fix them, and helped build the International Space Station. A Canadian invention had become one of the most famous tools in space.',
      { h: 'Moving in weightlessness' },
      'Moving things in space is harder than it sounds. A satellite may weigh nothing, but it still has <b>mass</b>, so once it starts moving, it keeps going. A robot arm must start and stop very gently, or the object could crash into the spacecraft. The arm was controlled by an astronaut at a window, using two hand controllers and watching through cameras.',
      { fig: '<rect class="h" x="14" y="128" width="272" height="16"/>' +
          '<path class="k" d="M40 128 L80 64 L170 44 L230 92"/>' +
          [[40, 128], [80, 64], [170, 44], [230, 92]].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="5"/>'; }).join('') +
          '<rect class="k" x="222" y="92" width="16" height="12"/><rect class="t" x="214" y="104" width="32" height="24"/>' +
          D.label(110, 22, 'joints let it bend', 80, 64) + D.label(256, 62, 'hand', 236, 96, 'start') +
          '<text class="n" x="150" y="160" text-anchor="middle">station truss</text>',
        tall: 166, cap: 'Canadarm2 has a hand at each end. It can grip a fixture, let go with the other end and move along the station.' },
      { h: 'Canadarm2' },
      'In 2001, Canadarm2 arrived at the space station. Canadian astronaut Chris Hadfield went on a spacewalk to help install it. It is 17.6 m long and has seven <b>joints</b>, like a human shoulder, elbow and wrist. Unlike its older sibling, it has a hand at each end. It can grip a fixture on the station, let go with its other end and flip itself along, like an inchworm.',
      'Canadarm2 does some of the station’s most delicate jobs. When an uncrewed cargo ship arrives with food, water and experiments, the arm reaches out and grabs it, then guides it to a docking port. This is called a “cosmic catch.” Since 2008, it has had help from Dextre, a two-armed robot that can do small repairs, such as changing batteries, so astronauts do not have to risk a spacewalk.',
      { box: 'Remote control', text: 'Many of Canadarm2’s moves are now controlled by teams on the ground, including at the Canadian Space Agency near Montréal. This frees astronauts for science.' },
      { h: 'Next stop: the Moon' },
      'Canada is now building Canadarm3, a smart robot arm for a small space station that will circle the Moon. It will be able to carry out some tasks on its own, without a human at the controls, because messages to and from the Moon take time. The Canadarm even appears on Canada’s $5 bill, a reminder of how much a mid-sized country can add to exploring space.'
    ],
    guide: { before: 'Use a grabber tool or tongs to pick up a light ball slowly. Teach <b>mass</b> and <b>joints</b>. Bend your arm and count your own joints from shoulder to wrist.',
      after: 'Why do you think Canada chose to build robot arms, instead of rockets, to take part in space exploration?' },
    words: [['mass', 'the amount of matter in an object'], ['joints', 'places where two parts meet and can bend or turn']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Name one job the first Canadarm did.',
        opts: ['It launched and caught satellites.', 'It launched the shuttle.', 'It grew plants in space.', 'It cooked for astronauts.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why must a robot arm in space move gently?',
        opts: ['Objects have mass and keep moving, so they could crash.', 'Space is very cold.', 'The arm is made of glass.', 'Astronauts are sleeping.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram help you understand?',
        opts: ['how joints and a gripping end let the arm move and hold on', 'how the shuttle lands', 'how big the Moon is', 'how a $5 bill is made'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The author says Canadarm2 moves “like an inchworm.” What does this comparison show?',
        opts: ['It moves by gripping with one end, then the other.', 'It is green.', 'It is very slow and small.', 'It eats leaves.'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Compare the two arms.', cols: ['', 'Canadarm', 'Canadarm2'],
        rows: [['Where it worked', 'on the space shuttle', null], ['Hands', null, 'one at each end'], ['Years', null, null]],
        a: [[null, null, 'on the International Space Station'], [null, 'one end only', null], [null, 'from 1981, for about 30 years', 'since 2001']] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why will Canadarm3 need to do some tasks on its own?',
        a: 'Messages to and from the Moon take time, so a person on Earth cannot react instantly. The arm must sometimes decide for itself.', look: 'the delay in messages and the need to act without a human' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize how Canada’s robot arms have changed from 1981 to today.',
        a: 'The first arm worked on the shuttle. Canadarm2 can move along the station and catch cargo ships, with help from Dextre. Canadarm3 will work near the Moon and do some tasks by itself.', look: 'the three arms and how each improved' },
      { k: 'lines', code: 'C2.2', n: 2, q: 'Who would want to read this report, and why?',
        a: 'A student interested in space or robots, to learn how Canada helps explore space.', look: 'a reasonable reader and purpose' }
    ]
  });

  P.add({
    id: 'g7-athabasca-glacier', subject: 'geography', form: 'Report',
    title: 'A River of Ice in Retreat',
    deck: 'What the Athabasca Glacier can teach us about a warming world',
    hero: {
      photo: 'g7-athabasca.jpg', credit: 'Photo: Ethan Sahagun, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The Athabasca Glacier flows down from the Columbia Icefield in Jasper National Park, Alberta.'
    },
    body: [
      'Along the Icefields Parkway in the Rocky Mountains of Alberta, visitors can walk right up to a <b>glacier</b>. The Athabasca Glacier is a tongue of ice about 6 km long, flowing slowly down from the Columbia Icefield, one of the largest areas of ice in the Rockies. In places the ice is as thick as a 90-storey building is tall.',
      { h: 'How a glacier forms' },
      'A glacier begins as snow. In high, cold places, more snow falls each winter than melts each summer. Year after year, the layers pile up. The weight of the snow above squeezes the snow below, pressing out the air, until it turns into dense, blue ice. When the ice is thick enough, gravity makes it flow downhill, very slowly, like extremely thick syrup. The Athabasca Glacier moves a few metres each year.',
      { fig: '<path class="k" d="M10 40 L290 130"/><path class="t" d="M10 40 L130 79 Q70 40 10 24 Z"/><path class="d" d="M10 24 Q140 50 265 122"/>' +
          [[130, 79, 'today'], [170, 91, '2000'], [215, 106, '1950'], [265, 122, '1890']].map(function (r) { return '<circle class="dot" cx="' + r[0] + '" cy="' + r[1] + '" r="3"/><text class="n" x="' + r[0] + '" y="' + (r[1] + 18) + '" text-anchor="middle">' + r[2] + '</text>'; }).join('') +
          D.arrow(240, 84, 150, 58, 'a') + '<text class="l" x="210" y="50" text-anchor="middle">the toe moves back</text>' +
          '<text class="l" x="14" y="14">ice from the icefield</text>',
        tall: 150, cap: 'Simplified view of how the toe, the end of the glacier, has moved back up the valley. Not to scale.' },
      { h: 'Losing ground' },
      'Even though the ice still flows downhill, the end of the glacier, called the <b>toe</b>, is moving back up the valley. That is because the ice is melting faster than it can flow forward. Since about 1890, the toe has retreated about 1.5 km. Along the walking trail, signs mark where the ice reached in different years. The signs from long ago stand in empty, rocky ground, a long walk from today’s ice. The glacier is also getting thinner, losing several metres of thickness in some years.',
      { box: 'Water for three oceans', text: 'Meltwater from the Columbia Icefield flows into rivers that reach the Pacific, the Arctic and, through Hudson Bay, the Atlantic.' },
      { h: 'Why it matters' },
      'Glaciers are like frozen water banks. In hot, dry summers, their slow melt keeps rivers flowing for fish, farms and towns downstream. As glaciers shrink, there will be a short-term rush of meltwater, but then less water in late summer. Scientists study glaciers like the Athabasca closely because they respond to temperature changes in a way everyone can see. At the current rate, scientists warn that much of the glacier could disappear within this century. For now, visitors can still stand on its edge, feel the cold air flowing off the ice and hear meltwater trickling beneath their feet.'
    ],
    guide: { before: 'Make a snowball and squeeze it into ice to show how a <b>glacier</b> forms. Teach <b>toe</b> and <b>retreated</b>. Find the Columbia Icefield on a map.',
      after: 'How might shrinking glaciers affect people who live far away from the mountains?' },
    words: [['glacier', 'a large mass of ice that moves slowly over land'], ['toe', 'the lower end of a glacier']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps of how a glacier forms.',
        items: ['More snow falls than melts.', 'Layers pile up year after year.', 'The weight squeezes the snow into ice.', 'Gravity makes the thick ice flow downhill.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What do the year labels in the diagram show?',
        opts: ['where the toe was at different times', 'how thick the ice was', 'how many visitors came', 'when it snowed'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is the toe moving back even though the ice flows downhill?',
        opts: ['The ice is melting faster than it can flow forward.', 'The glacier is flowing uphill.', 'Tourists take ice away.', 'The trail is moving.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the author call glaciers “frozen water banks”?',
        opts: ['They store water and release it slowly when it is needed.', 'They keep money.', 'They are near riverbanks.', 'They are made of snow.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The toe has <b>retreated</b> about 1.5 km. What does <b>retreated</b> mean?',
        opts: ['moved back', 'grown', 'frozen', 'broken'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain why shrinking glaciers could mean less water in late summer for towns downstream.',
        a: 'Glaciers melt slowly all summer and keep rivers flowing. When they are smaller, there is less ice left to melt, so rivers get lower in late summer.', look: 'the steady melt and less ice later' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict what a visitor might see at the Athabasca Glacier in 50 years. Use the text to support your prediction.',
        a: 'The toe will be even farther up the valley and the ice much thinner, because it is retreating and losing thickness each year. Much of it may be gone.', look: 'a prediction supported by retreat and thinning' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'The trail signs show where the ice used to be. Why might seeing them in person be more convincing than reading numbers?',
        a: 'Walking from the old signs to the ice lets you feel the distance yourself. It turns a number into something real you can see.', look: 'how direct experience makes evidence more convincing' }
    ]
  });

  P.add({
    id: 'g7-henson', subject: 'history', form: 'Biography',
    title: 'From Chains to Dawn',
    deck: 'Josiah Henson escaped slavery and helped build a free community in Upper Canada',
    hero: {
      photo: 'g7-henson.jpg', credit: 'Photo: unknown photographer, public domain, Wikimedia Commons', focus: '50% 25%',
      tall: 200,
      cap: 'Josiah Henson in later life. His story was read around the world.'
    },
    body: [
      'Josiah Henson was born into slavery in Maryland, in the United States, in 1789. As a small child, he watched his family being sold to different owners. As a young man, he worked so hard that his owner made him overseer of the farm, but his labour never earned him his freedom. When he saved money to buy himself, his owner cheated him and planned to sell him far away to the South.',
      { fig: '<path class="k" d="M20 150 C70 120 100 140 140 100 S220 60 280 30"/>' +
          '<circle class="dot" cx="20" cy="150" r="5"/><circle class="dot" cx="200" cy="72" r="5"/><circle class="dot" cx="280" cy="30" r="5"/>' +
          '<path class="d" d="M170 20 V160"/><text class="n" x="176" y="150">border</text>' +
          '<text class="l" x="24" y="138">Maryland</text><text class="l" x="200" y="92" text-anchor="middle">Niagara River</text><text class="l" x="276" y="52" text-anchor="end">Dawn Settlement</text>' +
          '<text class="lb" x="80" y="30" text-anchor="middle">United States</text><text class="lb" x="236" y="130" text-anchor="middle">Upper Canada</text>',
        tall: 166, cap: 'A simplified sketch of Henson’s journey. It is a diagram, not a map.' },
      { h: 'The escape' },
      'In 1830, Henson decided to run. With his wife, Nancy, and their four children, he travelled north through forests at night, hiding by day. He carried the two youngest children on his back in a sack. They were helped by people along the <b>Underground Railroad</b>, a secret network of people and safe houses that helped freedom seekers. After about six weeks, they crossed the Niagara River into Upper Canada, where the law would not send people who had escaped slavery back to their owners. Henson later said he threw himself on the ground and kissed it.',
      { h: 'Building a community' },
      'In Upper Canada, Henson worked on farms and became a preacher. He believed that freedom also needed land, jobs and schools. In 1841, he and others founded the <b>Dawn Settlement</b> near Dresden, Ontario. It had a school, the British American Institute, where Black children and adults learned to read, write and work a trade. Settlers farmed, and a sawmill cut black walnut lumber that was sold as far away as England.',
      { box: 'A famous book', text: 'Henson published the story of his life in 1849. Harriet Beecher Stowe read it, and it helped inspire her novel <i>Uncle Tom’s Cabin</i>, one of the most widely read books of the 1800s.' },
      { h: 'A lasting legacy' },
      'Henson returned to the United States several times, risking capture, to guide others to freedom. Historians believe he helped well over a hundred people escape. In 1877, he met Queen Victoria. He died in Dresden in 1883. Today his home is part of the Josiah Henson Museum of African-Canadian History, where visitors learn about Black Canadians who built new lives in freedom.'
    ],
    guide: { before: 'Explain that slavery was legal in the United States until 1865, while people who reached Upper Canada could not be returned to slavery. Teach <b>Underground Railroad</b>. Find Dresden, Ontario, on a map.',
      after: 'Henson could have kept his own freedom safe. Why do you think he kept going back to help others?' },
    words: [['Underground Railroad', 'a secret network that helped enslaved people escape to freedom'], ['Dawn Settlement', 'a community for freedom seekers founded near Dresden, Ontario']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did Henson decide to escape in 1830?',
        opts: ['His owner cheated him and planned to sell him to the South.', 'He wanted to see Niagara Falls.', 'He was given his freedom.', 'He was invited to Canada.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Why does the caption say the sketch is “a diagram, not a map”?',
        opts: ['It shows the journey in a simple way, not exact places and distances.', 'It has no labels.', 'It is drawn wrong.', 'It shows the future.'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number these events in Henson’s life in order.',
        items: ['He escapes with his family.', 'He founds the Dawn Settlement.', 'He publishes the story of his life.', 'He meets Queen Victoria.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'B2.2', half: true, q: 'Henson’s owner made him <b>overseer</b> of the farm. What does <b>overseer</b> mean?',
        opts: ['a person who directs the work of others', 'a person who owns a farm', 'a sailor', 'a teacher'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is a biography?',
        opts: ['It tells the life of a real person in time order.', 'It gives steps for a task.', 'It is written as a poem.', 'It argues for an opinion.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Henson believed freedom needed “land, jobs and schools.” How did the Dawn Settlement provide each one?',
        a: 'Settlers farmed land, the sawmill gave jobs, and the British American Institute was a school where people learned to read, write and work a trade.', look: 'all three linked to the settlement' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What qualities did Henson show? Give two, with evidence from the text.',
        a: 'Courage: he escaped and went back to help others, risking capture. Leadership: he founded a settlement and school.', look: 'two qualities, each with evidence' },
      { k: 'lines', code: 'C3.7', n: 2, q: 'How does Henson’s story still reach people today?',
        a: 'Visitors to the museum in Dresden learn about him and other Black Canadians, and his life story inspired a famous novel.', look: 'the museum or the book as a lasting influence' }
    ]
  });

  P.add({
    id: 'g7-station-nine', subject: 'story', form: 'Science fiction', plain: true,
    title: 'Station Nine',
    deck: 'A story set on the Moon. Watch for the small details that hint at what is coming.',
    hero: {
      photo: 'g7-moon-surface.jpg', credit: 'Photo: Eugene A. Cernan, NASA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A huge boulder on the Moon, photographed by Apollo 17 astronauts in 1972. The sky is black even in daytime.'
    },
    body: [
      'On the morning of the storm, the lights in the greenhouse flickered twice. Ama noticed, the way she noticed everything on Station Nine, but she was busy picking lettuce for breakfast and thought nothing of it.',
      'She had lived on the Moon for eight months, since her mother had taken a job as an engineer at the research base. There were forty-one people, three greenhouses and one rule that every child learned on the first day: when the siren sounds, go to the Shelter. The Shelter was a small room at the centre of the base, buried under three metres of Moon dust. It was the only place safe from a <b>solar storm</b>, when the Sun hurls out dangerous radiation.',
      { fig: '<rect class="k" x="10" y="20" width="70" height="40"/><text class="n" x="45" y="44" text-anchor="middle">greenhouses</text>' +
          '<rect class="h" x="120" y="50" width="60" height="40"/><text class="lb" x="150" y="106" text-anchor="middle">Shelter</text>' +
          '<rect class="k" x="218" y="96" width="78" height="40"/><text class="n" x="257" y="120" text-anchor="middle">robotics lab</text>' +
          '<path class="k" d="M80 40 H150 V50 M218 116 H200 V70 H180"/>' + D.arrow(216, 128, 204, 128, 'a') + D.arrow(204, 128, 204, 76, 'a') + D.arrow(204, 76, 184, 76, 'a') +
          '<text class="n" x="150" y="150" text-anchor="middle">green arrows mark the way</text>',
        tall: 156, cap: 'Part of Station Nine. The Shelter is at the centre of the base.' },
      { h: 'Warnings' },
      'At school that morning, the class was supposed to practise the Shelter drill. Ama had done it so many times that she knew it was boring, and she asked to stay behind to finish her robotics project. Ms. Okafor sighed but said yes.',
      'At lunch, old Mr. Bérubé, who ran the radio, sat staring at his screen. “The Sun has a big dark spot today,” he said to no one in particular. “Big as twenty Earths.” He did not touch his soup.',
      { box: 'Stop and think', text: 'The author has placed several clues. What do you predict will happen? Which details make you think so?' },
      { h: 'The siren' },
      'The siren started at 14:06. Ama was alone in the robotics lab at the far end of the base. For a moment she froze. She had never walked the route on her own, and the corridors all looked the same. Then she remembered the green arrows painted near the floor, the ones Ms. Okafor always pointed out during drills. Ama had rolled her eyes at them every time.',
      'She ran, following the arrows left, then right, then down a ramp. The <b>airlock</b> door to the Shelter was closing. A hand reached out and pulled her in. It was Mr. Bérubé.',
      '“The flare came early,” he said. “You have exactly four minutes to spare.” Ama sat down on the floor, breathing hard, while the screens showed waves of radiation washing over the empty grey plain outside.',
      'Ten hours later, the all-clear sounded. The next week, when the class practised the drill, Ama was the first one at the door.'
    ],
    guide: { before: 'Explain that <b>foreshadowing</b> means hints about what will happen later. Teach <b>solar storm</b> and <b>airlock</b>. Stop at the box and make a prediction together.',
      after: 'Why do you think the author had Ama skip the drill? What would the story lose without that detail?' },
    words: [['solar storm', 'a burst of energy and dangerous radiation from the Sun'], ['airlock', 'a sealed room with doors that keeps air in']],
    qs: [
      { k: 'table', code: 'C1.5', q: 'Foreshadowing gives hints about what will happen. Explain what each hint suggests.', cols: ['Hint', 'What it suggests'],
        rows: [['The greenhouse lights flicker twice.', null], ['Ama skips the drill.', null], ['Mr. Bérubé does not touch his soup.', null]],
        a: [[null, 'Something is wrong with the Sun or the power.'], [null, 'She may not know the route when it matters.'], [null, 'He is worried about the sunspot and a storm.']] },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature makes this story science fiction?',
        opts: ['It is set in the future on a base on the Moon.', 'It has a talking animal.', 'It happened long ago.', 'It is a true report.'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'From whose point of view do we mostly see the story?',
        opts: ['Ama’s', 'Mr. Bérubé’s', 'Ms. Okafor’s', 'Ama’s mother’s'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Stop at the box. What did you predict? Which clues led to your prediction?',
        a: 'I predicted a solar storm would hit while Ama was alone, because the lights flickered, she skipped the drill and Mr. Bérubé was worried about the sunspot.', look: 'a prediction tied to at least two clues' },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the green arrows matter so much?',
        opts: ['They showed Ama the way to the Shelter when she was alone.', 'They were her robotics project.', 'They pointed to the greenhouse.', 'They turned off the siren.'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“She ran, following the arrows left, then right, then down a ramp.” Why does the author use a list of short phrases here?',
        opts: ['to make the action feel fast and urgent', 'to slow the story down', 'to describe the Moon', 'to introduce a new character'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does Ama change from the beginning to the end of the story? What causes the change?',
        a: 'At first she thinks drills are boring and skips one. After nearly being caught in the storm, she understands why they matter and is first at the door.', look: 'the change in attitude and the event that caused it' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of a drill you have practised at school. How does this story change how you think about it?',
        a: 'We do fire drills, and they can feel silly. The story reminds me that practising means you know what to do without thinking when it is real.', look: 'a personal connection to a real drill' }
    ]
  });

  P.add({
    id: 'g7-wetlands', subject: 'science', form: 'Report',
    title: 'The Land That Holds Water',
    deck: 'Why Ontario’s wetlands matter more than most people realize',
    hero: {
      photo: 'g7-marsh-trail.jpg', credit: 'Photo: OTTCHAMPS2016, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A marsh trail in Silver Lake Provincial Park, Ontario. Cattails grow in shallow water that teems with life.'
    },
    body: [
      'For a long time, people saw wetlands as wasted land: soggy, buggy places to be drained and turned into farms, roads or shopping centres. In southern Ontario, more than two thirds of the original wetlands have disappeared. Today, scientists know that these wet places do jobs that would cost billions of dollars to replace.',
      { h: 'Four kinds of wetland' },
      'A <b>wetland</b> is land that is covered by shallow water or soaked with water for at least part of the year. Ontario has four main kinds. Marshes have cattails, reeds and grasses. Swamps have trees, such as silver maple or cedar, growing in standing water. Bogs and fens are covered in thick mats of moss over deep layers of peat, made from plants that have rotted very slowly for thousands of years.',
      { fig: '<path class="k" d="M10 100 Q60 96 90 110 T170 112 T290 100"/>' +
          D.ripple(14, 286, 92, 't') +
          '<path class="h" d="M10 150 H290 V124 Q220 118 150 128 T10 124 Z"/>' +
          '<path class="a" d="M40 92 V60 M46 92 V56 M52 92 V64 M230 92 V62 M236 92 V58"/><path class="k" d="M40 60 v-8 M46 56 v-8 M230 62 v-8"/>' +
          D.arrow(150, 30, 150, 82, 'a') + '<text class="l" x="158" y="44">rain and floodwater</text>' +
          '<text class="n" x="150" y="166" text-anchor="middle">peat and soil store water and carbon</text>' +
          '<text class="n" x="20" y="44">cattails</text>',
        tall: 172, cap: 'A wetland works like a sponge. It soaks up water during floods and lets it out slowly in dry times.' },
      { h: 'Nature’s sponge and filter' },
      'During heavy rain or spring melt, wetlands soak up water like a sponge, then release it slowly. This reduces flooding in towns downstream and keeps streams flowing in dry summers. As water moves slowly through the plants, mud settles out and roots absorb extra nutrients from farm fertilizers. The water that leaves a wetland is often much cleaner than the water that entered it.',
      { box: 'Carbon in storage', text: 'Peat in bogs and fens holds huge amounts of carbon. When these wetlands are drained, the peat dries and releases carbon dioxide into the air.' },
      { h: 'Full of life' },
      'Wetlands are among the richest <b>habitats</b> on Earth. Frogs, turtles, muskrats, herons and many kinds of fish depend on them. Ducks and geese stop to rest and feed on their long migrations. Many of Ontario’s species at risk, such as the Blanding’s turtle, live in wetlands. For Indigenous communities, wetlands have long been places to harvest wild rice, medicines and food.',
      'Ontario now has rules to protect its most important wetlands, and groups work to restore drained ones. A restored marsh can fill with frogs and birds again within a few years, proof that what was lost can sometimes be brought back.'
    ],
    guide: { before: 'Pour water onto a dry sponge and a plate to compare how each holds water. Teach <b>wetland</b> and <b>habitats</b>. Ask what the child already knows about marshes or swamps.',
      after: 'If a developer wanted to drain a wetland near your town to build houses, what questions would you want answered first?' },
    words: [['wetland', 'land covered by shallow water or soaked with water for part of the year'], ['habitats', 'natural homes of plants and animals']],
    qs: [
      { k: 'table', code: 'C1.3', q: 'Compare the kinds of wetland.', cols: ['Wetland', 'What grows there'],
        rows: [['marsh', null], ['swamp', null], ['bog or fen', null]],
        a: [[null, 'cattails, reeds and grasses'], [null, 'trees in standing water, such as silver maple or cedar'], [null, 'thick mats of moss over peat']] },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the author compare a wetland to a sponge?',
        opts: ['It soaks up water and releases it slowly.', 'It is yellow and soft.', 'It is used for cleaning dishes.', 'It is full of holes.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is carbon stored?',
        opts: ['in the peat and soil', 'in the rain', 'in the cattails’ flowers', 'in the air'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How do wetlands clean water?',
        opts: ['Mud settles out and roots absorb extra nutrients.', 'Fish drink the dirty water.', 'The sun boils the water.', 'Ducks filter it.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Wetlands are among the <b>richest</b> habitats on Earth.” What kind of word is <b>richest</b>?',
        opts: ['an adjective that compares many things', 'a verb', 'a noun', 'an adverb'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How has the way people see wetlands changed? Use the first and last paragraphs.',
        a: 'People once saw them as wasted land to drain. Now people know they prevent floods, clean water and support wildlife, so Ontario protects and restores them.', look: 'the old view and the new view, with reasons' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Have you seen a marsh, swamp or pond? Describe it, and connect it to one idea from the text.',
        a: 'I saw a pond with cattails and frogs at a park. It connects to the idea that wetlands are full of life, because I heard frogs everywhere.', look: 'a personal experience linked to the text' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'List three jobs wetlands do, in your own words.',
        a: 'They soak up floodwater, they clean water, and they give homes to animals like turtles and herons. They also store carbon.', look: 'three jobs paraphrased' }
    ]
  });

  P.add({
    id: 'g7-ice-floats', subject: 'science', form: 'Explanation',
    title: 'Why Ice Floats',
    deck: 'A strange property of water that lets lakes stay alive all winter',
    hero: {
      photo: 'g7-lake-ice.jpg', credit: 'Photo: Donald Olszewski, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 250,
      cap: 'Ice floating on a lake. Underneath, the water stays liquid.'
    },
    body: [
      'Drop an ice cube in a glass of water and it floats. This seems so ordinary that most people never wonder about it. But it is actually very unusual. For almost every other substance, the solid form is heavier for its size than the liquid, so it sinks. Solid wax sinks in melted wax. Solid iron sinks in melted iron. Water is a rare exception, and life on Earth depends on it.',
      { h: 'Packed and spread out' },
      'Whether something floats depends on its <b>density</b>: how much mass is packed into a certain amount of space. In liquid water, the particles move around and slide close together. As water freezes, the particles lock into a pattern with lots of open space, like a honeycomb. The same amount of water takes up about 9% more space as ice. Because ice is less dense than liquid water, it floats.',
      { fig: '<text class="lb" x="75" y="18" text-anchor="middle">liquid water</text><text class="lb" x="225" y="18" text-anchor="middle">ice</text>' +
          '<rect class="k" x="25" y="28" width="100" height="100"/><rect class="k" x="175" y="28" width="100" height="100"/>' +
          [[38, 44], [60, 40], [84, 46], [108, 42], [44, 64], [70, 62], [96, 66], [114, 70], [36, 86], [58, 84], [84, 88], [106, 92], [46, 108], [72, 112], [98, 106], [116, 114]].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="5"/>'; }).join('') +
          [[195, 48], [225, 48], [255, 48], [210, 78], [240, 78], [195, 108], [225, 108], [255, 108]].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="5"/>'; }).join('') +
          '<path class="t" d="M195 48 L210 78 L225 48 L240 78 L255 48 M210 78 L195 108 M210 78 L225 108 L240 78 L255 108"/>' +
          '<text class="n" x="75" y="146" text-anchor="middle">close together</text><text class="n" x="225" y="146" text-anchor="middle">spread out in a pattern</text>',
        tall: 152, cap: 'The same space holds fewer particles of ice than of liquid water, so ice is less dense.' },
      { h: 'A lake in winter' },
      'Water has another odd property. As it cools, it gets denser, until it reaches about 4 °C. Below that, it starts to expand again. In the fall, cold surface water sinks until the whole lake is about 4 °C. Then the surface water keeps cooling and stays on top, until it freezes. The ice forms a lid that <b>insulates</b> the water below from the freezing air.',
      { box: 'Imagine the opposite', text: 'If ice sank, lakes would freeze from the bottom up. Each winter more ice would pile up, and many lakes might freeze solid, killing the fish and plants.' },
      { h: 'Life under the ice' },
      'Because of this, the bottom of a deep Canadian lake stays near 4 °C all winter, even when the air is −30 °C. Fish slow down and rest near the bottom. Frogs and turtles bury themselves in the mud. Under the ice, life waits for spring. The same property explains why water pipes can burst in winter: freezing water expands with great force. Over many winters, water that seeps into cracks in rock freezes and expands again and again, slowly splitting boulders apart. The same thing happens to roads, which is one reason Canadian streets are full of potholes every spring. So the next time you drop an ice cube into a drink, remember that you are looking at one of the most important oddities in nature.'
    ],
    guide: { before: 'Freeze a plastic cup filled exactly to a line, then check the ice level the next day. Teach <b>density</b> and <b>insulates</b>.',
      after: 'Can you think of other times when water freezing and expanding causes problems, or helps?' },
    words: [['density', 'how much mass is packed into a certain amount of space'], ['insulates', 'slows down the movement of heat']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why does ice float on water?',
        opts: ['Ice is less dense than liquid water.', 'Ice is heavier than water.', 'Ice has air bubbles only.', 'Ice is colder than the air.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show about ice?',
        opts: ['Its particles are spread out in a pattern.', 'Its particles move faster.', 'It has more particles.', 'It is a gas.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps of how a lake freezes in winter.',
        items: ['Cold surface water sinks.', 'The whole lake reaches about 4 °C.', 'Colder surface water stays on top.', 'The surface freezes into a lid of ice.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'C1.5', half: true, q: 'What does the box “Imagine the opposite” do?',
        opts: ['It shows why the property matters by imagining what would happen without it.', 'It gives a new fact about fish.', 'It tells a story.', 'It defines density.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Insulate</b> and <b>insulation</b> belong to the same word family. Which is a noun?',
        opts: ['insulation', 'insulate', 'insulates', 'insulated'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain how fish survive the winter in a frozen lake.',
        a: 'The ice floats and forms a lid that insulates the water, so the bottom stays near 4 °C. Fish slow down and rest near the bottom where the water is liquid.', look: 'the insulating ice and the 4 °C water at the bottom' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why can water pipes burst in winter? Use the text.',
        a: 'When water freezes it takes up about 9% more space, and it expands with great force, pushing on the pipe until it cracks.', look: 'expansion when freezing' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The idea that water gets denser until 4 °C and then expands is tricky. What did you do to make sense of it?',
        a: 'I reread the paragraph and drew a lake with labels for the cold water at the top and the 4 °C water at the bottom.', look: 'a monitoring strategy and how it helped' }
    ]
  });

  P.add({
    id: 'g7-insulation', subject: 'science', form: 'Explanation',
    title: 'Keeping the Heat In',
    deck: 'How heat escapes from a house in winter, and how insulation stops it',
    hero: {
      photo: 'g7-attic.jpg', credit: 'Photo: USFWS Mountain-Prairie, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Insulation being added to an attic. Fluffy materials trap air, which slows the flow of heat.'
    },
    body: [
      'On a January night in Sudbury, it might be −25 °C outside and 20 °C inside. Heat always flows from warmer places to cooler ones, so the warmth inside a house is always trying to escape. A furnace burns fuel or uses electricity to replace the heat that is lost. The better a house holds its heat, the less energy it needs and the less money and fuel it costs.',
      { h: 'Three ways heat moves' },
      'Heat escapes in three ways. In <b>conduction</b>, heat passes directly through a solid material, from particle to particle. That is why a metal spoon in hot soup gets hot. In <b>convection</b>, warm air or water rises and carries heat with it, while cooler air sinks to take its place. In <b>radiation</b>, heat travels as invisible rays, the way you feel the warmth of a campfire from across the circle.',
      { fig: '<path class="k" d="M40 150 V70 L150 20 L260 70 V150 Z"/><path class="h" d="M60 66 L150 26 L240 66"/><path class="k" d="M40 70 H260"/>' +
          D.arrow(150, 110, 150, 78, 'a') + D.arrow(150, 40, 150, 6, 'a') + '<text class="n" x="158" y="100">warm air rises</text><text class="n" x="158" y="14">heat lost through the roof</text>' +
          D.arrow(240, 118, 290, 118, 'a') + '<text class="n" x="200" y="140" text-anchor="middle">through walls</text>' +
          '<rect class="t" x="60" y="94" width="34" height="30"/>' + D.arrow(60, 108, 12, 108, 'a') + '<text class="n" x="70" y="140" text-anchor="middle">windows</text>' +
          D.label(4, 40, 'insulation', 70, 60, 'start'),
        tall: 156, cap: 'Where a house loses heat in winter. Warm air rises, so a lot escapes through the roof.' },
      { h: 'Trapping air' },
      'Materials that slow the flow of heat are called <b>insulators</b>. Still air is a very good insulator, as long as it cannot move around and carry heat by convection. That is the secret of most insulation. Fibreglass, foam and cellulose, made from recycled newspaper, are full of tiny pockets that trap air. A winter coat, a down sleeping bag and a bird’s fluffed-up feathers all work the same way.',
      'Builders put thick layers of insulation in attics, because warm air rises and a lot of heat would otherwise escape through the roof. Walls are filled with insulation too. Windows are a weak spot, so modern windows have two or three layers of glass with a sealed gap between them.',
      { box: 'Find the leaks', text: 'On a cold, windy day, hold a strip of tissue near a window frame or outlet. If it flutters, cold air is leaking in. Weatherstripping and caulking can seal those gaps.' },
      { h: 'Why it matters' },
      'Heating homes uses a large share of the energy Canadians use. Adding insulation and sealing leaks is one of the cheapest ways to save energy and reduce the greenhouse gases released by burning fuel. In summer, the same insulation slows heat from getting in and keeps the house cooler.'
    ],
    guide: { before: 'Wrap one jar of warm water in a towel and leave another bare, then compare after 20 minutes. Teach <b>conduction</b>, <b>convection</b>, <b>radiation</b> and <b>insulators</b>.',
      after: 'Do the tissue test on a window or door at home. Where does your home lose heat?' },
    words: [['conduction', 'heat moving directly through a material'], ['convection', 'heat carried by moving air or water'], ['insulators', 'materials that slow the flow of heat']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Fill in the chart about how heat moves.', cols: ['Way heat moves', 'How it works', 'Example'],
        rows: [['conduction', null, 'a spoon in hot soup'], ['convection', 'warm air or water rises and carries heat', null], ['radiation', null, null]],
        a: [[null, 'heat passes through a solid from particle to particle', null], [null, null, 'warm air rising to the roof'], [null, 'heat travels as invisible rays', 'feeling a campfire’s warmth']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, why does so much heat escape through the roof?',
        opts: ['Warm air rises.', 'Roofs are made of glass.', 'Snow is warm.', 'Cold air rises.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is fibreglass a good insulator?',
        opts: ['It traps air in tiny pockets.', 'It is made of metal.', 'It is heavy.', 'It makes its own heat.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the author mention a winter coat and a bird’s feathers?',
        opts: ['to connect insulation to familiar examples that also trap air', 'to talk about fashion', 'to describe birds', 'to sell coats'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“…and cellulose, made from recycled newspaper, are full of tiny pockets…” What do the commas around <b>made from recycled newspaper</b> do?',
        opts: ['They set off extra information about cellulose.', 'They separate a list.', 'They show a pause in speech only.', 'They join two sentences.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why does insulation help in summer as well as winter?',
        a: 'Insulation slows heat flowing in either direction. In summer it slows heat coming in from outside, so the house stays cooler.', look: 'heat flow in both directions' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Give an example from your own life of conduction, convection or radiation. Explain which one it is.',
        a: 'Holding a mug of hot chocolate warms my hands. That is conduction, because the heat moves through the mug into my hands.', look: 'a correct personal example with the right type named' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'The author says insulation is “one of the cheapest ways to save energy.” What else would you want to know before deciding to insulate a house?',
        a: 'How much it costs, how much money it would save each year, and how long it would take to pay for itself.', look: 'relevant questions about cost and benefit' }
    ]
  });

  P.add({
    id: 'g7-grosse-ile', subject: 'history', form: 'Report',
    title: 'The Island of Sorrow',
    deck: 'Grosse Île and the Irish famine ships of 1847',
    hero: {
      photo: 'g7-grosse-ile.jpg', credit: 'Photo: Cephas, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A hospital building on Grosse Île, in the St. Lawrence River below Québec City. The island is now a national historic site.'
    },
    body: [
      'In the 1840s, a disease destroyed the potato crops of Ireland year after year. For millions of poor Irish families, potatoes were almost their only food. About a million people died of hunger and disease in what became known as the Great Famine. Over a million more left Ireland, hoping to survive somewhere else. In 1847 alone, around 100 000 sailed for British North America.',
      { h: 'Coffin ships' },
      'Many crossed the Atlantic in crowded, filthy cargo ships that had carried timber from Canada. Passengers were packed below deck for six weeks or more, with little food or clean water. A disease called <b>typhus</b>, spread by lice, swept through the ships. So many people died at sea that the ships became known as “coffin ships.”',
      { fig: '<path class="t" d="M10 120 C80 110 140 130 290 90"/>' + D.ripple(20, 280, 132, 't') +
          '<circle class="dot" cx="24" cy="118" r="5"/><circle class="dot" cx="236" cy="104" r="5"/><circle class="dot" cx="276" cy="94" r="5"/>' +
          '<text class="l" x="24" y="106" text-anchor="middle">Ireland</text><text class="l" x="224" y="86" text-anchor="middle">Grosse Île</text>' +
          '<text class="l" x="276" y="150" text-anchor="end">Québec City</text>' +
          '<text class="lb" x="110" y="40" text-anchor="middle">about six weeks at sea</text>' + D.arrow(60, 56, 170, 56, 'a'),
        tall: 156, cap: 'A simplified sketch of the route. Ships had to stop at Grosse Île before going on to Québec City.' },
      { h: 'The quarantine station' },
      'To keep disease from spreading into the colonies, every ship heading up the St. Lawrence had to stop at Grosse Île, an island below Québec City. It was a <b>quarantine</b> station, a place where sick or possibly sick travellers were kept apart. The station was built for a few hundred patients. In the summer of 1847, dozens of ships waited in a line kilometres long. Thousands of sick people lay in tents and sheds, and many healthy people caught typhus while waiting.',
      'Doctors, nurses, priests and soldiers worked day and night. Many caught typhus themselves, and some died. By the end of the year, more than 5 000 people had been buried on the island, most of them in mass graves.',
      { box: 'Families for the orphans', text: 'Hundreds of children lost their parents. Many were adopted by French-speaking families in Québec. Some kept their Irish last names, and their descendants still carry them today.' },
      { h: 'Remembering' },
      'In 1909, Irish Canadians raised a tall stone Celtic cross on the island. Today Grosse Île is a national historic site. Visitors walk among the old buildings and read the thousands of names on the memorial. The story is a reminder of how desperate people can be to find safety, and of the kindness of strangers who took them in.'
    ],
    guide: { before: 'Find Ireland, the Atlantic Ocean and Québec City on a map. Teach <b>typhus</b> and <b>quarantine</b>. Explain that a famine is a time when there is not enough food.',
      after: 'Many people today still leave their home countries to escape danger or hunger. What can communities learn from Grosse Île?' },
    words: [['typhus', 'a deadly disease spread by lice'], ['quarantine', 'keeping people apart to stop a disease from spreading']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did so many Irish people leave Ireland in the 1840s?',
        opts: ['A disease destroyed the potato crops, causing famine.', 'They were invited to Canada.', 'There was a gold rush.', 'Ireland was too crowded with farms.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did ships have to stop at Grosse Île?',
        opts: ['to keep disease from spreading into the colonies', 'to pick up timber', 'to pay a tax', 'to change captains'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The ships were called “coffin ships.” What does this name suggest?',
        opts: ['So many people died on them that they were like floating coffins.', 'They were shaped like boxes.', 'They carried coffins for sale.', 'They were painted black.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the sketch show?',
        opts: ['the route from Ireland to Québec City, with a stop at Grosse Île', 'the shape of the island', 'how typhus spreads', 'the memorial cross'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why did so many people catch typhus at Grosse Île, even though it was meant to stop disease?',
        a: 'The station was built for a few hundred patients but thousands came. Sick and healthy people were crowded together, so many healthy people caught typhus while waiting.', look: 'overcrowding and healthy people catching it' },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How is the story of Grosse Île still part of life in Québec today?',
        a: 'Descendants of the orphans adopted by French-speaking families still carry Irish last names, and the island is a historic site people visit.', look: 'the Irish last names or the historic site' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What message does the author share in the last sentence? Do you think it still matters today? Why?',
        a: 'That desperate people seek safety and that strangers’ kindness matters. Yes, because people still flee hunger and war today and need welcome.', look: 'the message and a reasoned link to today' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence begins with a phrase that tells when?',
        opts: ['In 1909, Irish Canadians raised a tall stone Celtic cross on the island.', 'Doctors, nurses, priests and soldiers worked day and night.', 'Many caught typhus themselves.', 'The story is a reminder.'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-aral-sea', subject: 'geography', form: 'Report',
    title: 'The Sea That Disappeared',
    deck: 'How the Aral Sea shrank in one lifetime, and how part of it is coming back',
    hero: {
      photo: 'g7-aral-ships.jpg', credit: 'Photo: Adam Harangozó, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Rusting fishing boats in Mo‘ynoq, Uzbekistan. The town was once a busy port. Today the water is far away.'
    },
    body: [
      'Sixty years ago, the Aral Sea in Central Asia was one of the four largest lakes in the world. Fishing boats sailed from busy ports, and canneries packed tonnes of fish every year. Today, rusting ships sit on a dusty desert where water used to be. The Aral Sea is one of the worst environmental disasters caused by people.',
      { fig: '<text class="lb" x="70" y="18" text-anchor="middle">1960</text><text class="lb" x="225" y="18" text-anchor="middle">today</text>' +
          '<path class="h" d="M24 40 Q40 26 80 30 Q120 34 122 70 Q124 120 86 136 Q40 146 28 110 Q16 74 24 40 Z"/>' +
          '<path class="k" d="M178 40 Q194 26 234 30 Q274 34 276 70 Q278 120 240 136 Q194 146 182 110 Q170 74 178 40 Z"/>' +
          '<path class="h" d="M190 40 Q204 34 222 42 Q226 56 206 60 Q188 56 190 40 Z"/><path class="h" d="M236 84 Q248 80 252 100 Q250 124 238 120 Q228 104 236 84 Z"/>' +
          '<text class="n" x="230" y="160" text-anchor="middle">outline shows the old shore</text><text class="n" x="70" y="160" text-anchor="middle">one large lake</text>',
        tall: 166, cap: 'A simplified drawing of the Aral Sea in 1960 and today. Most of it has dried up and split apart. Not to scale.' },
      { h: 'Taking the rivers' },
      'The Aral Sea had no outlet to the ocean. It was fed by two great rivers, the Amu Darya and the Syr Darya, which carry melted snow from distant mountains. In the 1960s, the government of the Soviet Union decided to turn the dry land around the sea into huge cotton farms. Engineers dug thousands of kilometres of canals to carry river water to the fields. This is called <b>irrigation</b>. Many canals leaked, and much of the water soaked into the sand or <b>evaporated</b> in the desert heat. At first, the plan seemed to work. Cotton harvests grew, and the region earned a great deal of money selling it to other countries. Few people paid attention to what was happening downstream.',
      { h: 'A shrinking sea' },
      'With less river water flowing in, the sea began to shrink. By the 2000s, it had lost about nine tenths of its water and split into separate lakes. The remaining water became so salty that most fish died. The fishing industry collapsed, and thousands of people lost their jobs. In the port of Mo‘ynoq, the shore is now far away. Visitors walk for hours past old boats and dry shells without reaching the water. Summers there have become hotter and winters colder, because there is no longer a huge body of water to soften the climate.',
      { box: 'Poisoned dust', text: 'The dried seabed is covered with salt and with chemicals that once washed off the cotton fields. Strong winds lift this dust and blow it across the region, where people have suffered from breathing problems.' },
      { h: 'A small comeback' },
      'In 2005, Kazakhstan built a long dam to hold water in the northern part of the sea, called the Small Aral. The water level rose, the water became less salty, and fish returned. Fishers in the area are working again. The large southern part is still mostly desert, but the Small Aral shows that even serious damage can sometimes be partly repaired when people work to fix it.'
    ],
    guide: { before: 'Find Kazakhstan and Uzbekistan on a world map. Teach <b>irrigation</b> and <b>evaporated</b>. Leave a shallow dish of salt water in the sun and look at it the next day.',
      after: 'The cotton farms brought jobs and money too. How should a country balance farming and protecting nature?' },
    words: [['irrigation', 'bringing water to crops through pipes or canals'], ['evaporated', 'changed from a liquid into a gas']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What was the main cause of the Aral Sea shrinking?',
        opts: ['River water was taken for cotton farms.', 'An earthquake drained it.', 'Too many fish were caught.', 'It rained too much.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the drawing show?',
        opts: ['how much smaller the sea is today than in 1960', 'where cotton grows', 'the path of the rivers', 'the ships in Mo‘ynoq'], a: 0 },
      { k: 'order', code: 'C1.5', q: 'The report explains a chain of causes and effects. Number them in order.',
        items: ['Canals take water from the rivers.', 'Less water flows into the sea.', 'The sea shrinks and gets saltier.', 'Fish die and the fishing industry collapses.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Evaporate</b> contains the Latin root <b>vapor</b>. What does <b>vapor</b> mean?',
        opts: ['steam or gas', 'water', 'desert', 'salt'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did fish return to the Small Aral?',
        opts: ['A dam raised the water and made it less salty.', 'Fish were brought in trucks.', 'The cotton farms closed.', 'It rained every day.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How did the shrinking sea affect people’s health and jobs? Give one example of each.',
        a: 'Health: dust with salt and chemicals from the seabed caused breathing problems. Jobs: the fishing industry collapsed and thousands lost their work.', look: 'one health effect and one job effect from the text' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'The author calls the Aral Sea “one of the worst environmental disasters caused by people.” Do you agree after reading? Explain.',
        a: 'Yes. A huge lake almost vanished in one lifetime, fish died, people lost jobs and got sick, and it was caused by human decisions.', look: 'an opinion supported by several effects from the text' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'Summarize the last section in one sentence.',
        a: 'A dam built in 2005 brought water and fish back to the northern Small Aral, showing damage can be partly repaired.', look: 'the dam, the recovery and the lesson' }
    ]
  });

  P.add({
    id: 'g7-aed-cpr', subject: 'health', form: 'Procedure',
    title: 'Hands That Save a Life',
    deck: 'What to do if someone’s heart suddenly stops',
    hero: {
      photo: 'g7-aed.jpg', credit: 'Photo: 쉰지식인, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An automated external defibrillator, or AED. Many schools, arenas and malls have one.'
    },
    body: [
      'A man watching a hockey game in a community arena suddenly collapses. He is not breathing normally. His heart has stopped pumping blood, a medical emergency called <b>cardiac arrest</b>. Without help, his brain will begin to die within minutes. An ambulance might take ten minutes to arrive. What the people around him do in those first minutes will decide whether he lives.',
      { h: 'Not the same as a heart attack' },
      'A heart attack happens when blood cannot reach part of the heart muscle. The person is usually awake and may have chest pain. In cardiac arrest, the heart’s electrical signals go wrong. It quivers instead of pumping, and the person becomes unresponsive. A heart attack can lead to cardiac arrest, but they are different.',
      { h: 'Three steps' },
      'First, check and call. Tap the person and shout, “Are you okay?” If there is no response and they are not breathing normally, call 911 and send someone to get an AED. Put the phone on speaker; the dispatcher will guide you.',
      'Second, push. Place the heel of one hand in the centre of the chest, with your other hand on top. Push hard and fast, about 5 cm deep, at about 100 to 120 times a minute. Let the chest come all the way back up between pushes. This is <b>CPR</b>. It moves blood to the brain until help arrives. It is tiring, so switch with another person every two minutes if you can.',
      { fig: '<path class="k" d="M30 120 Q80 100 150 104 Q220 108 270 120"/><circle class="k" cx="40" cy="104" r="16"/>' +
          '<rect class="h" x="140" y="70" width="34" height="18"/><path class="k" d="M150 70 L132 30 M164 70 L182 30"/>' +
          D.arrow(157, 40, 157, 64, 'a') + '<text class="l" x="196" y="44">push hard and fast</text><text class="n" x="196" y="58">about 5 cm deep</text>' +
          '<rect class="t" x="100" y="96" width="14" height="18"/><rect class="t" x="206" y="104" width="14" height="18"/>' +
          D.label(60, 150, 'AED pads', 108, 114) + D.label(290, 150, '100 to 120 a minute', 160, 92, 'end'),
        tall: 160, cap: 'Hands go in the centre of the chest. The AED pads go where the pictures on them show.' },
      'Third, use the AED as soon as it arrives. Open it and it starts talking, telling you exactly what to do. Stick the pads on the bare chest where the pictures show. The machine checks the heart’s rhythm and decides whether a <b>shock</b> is needed. If it is, it tells everyone to stand clear. The shock can reset the heart’s rhythm. Then keep doing CPR until the AED or paramedics tell you to stop.',
      { box: 'You cannot make it worse', text: 'An AED will not shock a heart that does not need it. Ontario law protects people who help in an emergency in good faith.' },
      'Learning CPR takes only a few hours, and many courses accept students. Someday, your hands might keep someone alive.'
    ],
    guide: { before: 'Teach <b>cardiac arrest</b>, <b>CPR</b> and <b>shock</b>. Find the AED at your school, arena or community centre. Practise the rhythm by pushing on a firm cushion to the beat of a fast song. This text does not replace a certified course.',
      after: 'Look up a CPR course near you. Would you like to take one together?' },
    words: [['cardiac arrest', 'when the heart suddenly stops pumping blood'], ['CPR', 'pushing on the chest to keep blood moving when the heart has stopped'], ['shock', 'a burst of electricity that can reset the heart’s rhythm']],
    qs: [
      { k: 'order', code: 'C1.5', q: 'Number the steps to help someone in cardiac arrest.',
        items: ['Check if the person responds and is breathing normally.', 'Call 911 and send someone for an AED.', 'Push hard and fast on the centre of the chest.', 'Use the AED as soon as it arrives.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C1.3', q: 'Compare a heart attack and cardiac arrest.', cols: ['', 'Heart attack', 'Cardiac arrest'],
        rows: [['What goes wrong', 'blood cannot reach part of the heart', null], ['Is the person awake?', null, null]],
        a: [[null, null, 'the heart’s electrical signals go wrong and it stops pumping'], [null, 'usually, and may have chest pain', 'no, they become unresponsive']] },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this is a procedure?',
        opts: ['It gives numbered steps in order.', 'It tells a made-up story.', 'It argues an opinion.', 'It is a poem.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, where do your hands go?',
        opts: ['in the centre of the chest', 'on the stomach', 'on the neck', 'on the shoulders'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why should rescuers switch every two minutes?',
        opts: ['CPR is tiring, and tired pushes are weaker.', 'The AED needs to rest.', 'It is a rule of hockey.', 'The patient needs a break.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the author begin with a scene in an arena?',
        opts: ['to show that cardiac arrest can happen anywhere, to anyone', 'to talk about hockey', 'to describe the ambulance', 'to explain the rules of CPR courses'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why do the first few minutes matter so much? Use the text.',
        a: 'Without blood, the brain begins to die within minutes, and an ambulance might take ten minutes. CPR and an AED keep blood moving and can restart the heart before help arrives.', look: 'the time limit for the brain and how bystanders fill the gap' },
      { k: 'lines', code: 'B1.1', n: 3, q: 'On a 911 call, the dispatcher gives instructions. Why is listening carefully so important, and how can you show you understood?',
        a: 'The dispatcher knows what to do and can guide you step by step. I can repeat back what they said or answer their questions clearly.', look: 'the importance of listening and a way to confirm understanding' }
    ]
  });

  P.add({
    id: 'g7-misleading-graphs', subject: 'math', form: 'Explanation',
    title: 'Graphs That Lie',
    deck: 'How true numbers can be drawn to fool you',
    hero: {
      photo: 'g7-charts.jpg', credit: 'Image: unknown author, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Charts on a screen. Graphs make numbers easy to see, which also makes them easy to twist.'
    },
    body: [
      'Graphs are powerful. One glance can show a trend that would take paragraphs to explain. That is exactly why advertisers, politicians and websites use them. But a graph can use completely accurate numbers and still leave a false impression. Learning to spot the tricks is part of being a careful reader of <b>data</b>.',
      { h: 'Trick 1: the cut-off axis' },
      'Imagine two brands of juice. Brand A has 24 g of sugar per bottle, and Brand B has 22 g. That is a small difference. But if a graph’s vertical axis starts at 21 instead of 0, Brand A’s bar will look three times taller than Brand B’s. The numbers are true, but the picture is misleading. Always check where the <b>axis</b> begins. Also check the labels and units. A graph without a title, scale or units is a warning sign, because you cannot tell what is really being compared.',
      { fig: '<text class="lb" x="75" y="16" text-anchor="middle">axis starts at 21</text><text class="lb" x="225" y="16" text-anchor="middle">axis starts at 0</text>' +
          '<path class="k" d="M30 24 V140 H130 M180 24 V140 H280"/>' +
          '<rect class="h" x="44" y="36" width="30" height="104"/><rect class="t" x="86" y="106" width="30" height="34"/>' +
          '<rect class="h" x="194" y="44" width="30" height="96"/><rect class="t" x="236" y="52" width="30" height="88"/>' +
          '<text class="n" x="26" y="144" text-anchor="end">21</text><text class="n" x="26" y="40" text-anchor="end">24</text><text class="n" x="176" y="144" text-anchor="end">0</text><text class="n" x="176" y="48" text-anchor="end">24</text>' +
          '<text class="n" x="59" y="156" text-anchor="middle">A</text><text class="n" x="101" y="156" text-anchor="middle">B</text><text class="n" x="209" y="156" text-anchor="middle">A</text><text class="n" x="251" y="156" text-anchor="middle">B</text>',
        tall: 162, cap: 'The same data, grams of sugar in two juices, drawn two ways.' },
      { h: 'Trick 2: the growing picture' },
      'Some graphs use pictures instead of bars. If sales doubled, the artist might draw a second juice bottle twice as tall. But making it twice as tall also makes it twice as wide, so it covers four times the area. Our eyes judge the size of the whole picture, so the increase looks far bigger than it really was. Three-dimensional pie charts play a similar trick: the slice at the front looks bigger than an equal slice at the back, simply because it is closer to you.',
      { h: 'Trick 3: the hand-picked time' },
      'A company might show its sales rising from March to June, but leave out the years before, when sales fell steadily. By choosing only part of the data, a graph can tell almost any story. Ask yourself: what came before and after?',
      { box: 'Graph detective checklist', text: 'Where does each axis start? Are the intervals equal? Is the whole time period shown? Who made the graph, and what do they want me to think?' },
      'Not every graph that starts above zero is trying to trick you. Scientists sometimes zoom in to show small but important changes, like a rise in average temperature. The key is to notice the choices the graph maker made, and to decide for yourself what the numbers really mean. A good habit is to read the actual numbers, not just the shapes.'
    ],
    guide: { before: 'Find a graph in a flyer, website or news story. Teach <b>data</b> and <b>axis</b>. Ask: does this graph start at zero?',
      after: 'Make a graph that tells the truth and one that exaggerates, using the same numbers. Which was harder to make?' },
    words: [['data', 'facts and numbers collected to answer a question'], ['axis', 'a line on a graph with a scale of numbers']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Look at the two graphs. Why does Brand A look three times bigger on the left?',
        opts: ['The vertical axis starts at 21, not 0.', 'Brand A has three times more sugar.', 'The bars are different colours.', 'The right graph is wrong.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does a picture that is twice as tall look much bigger?',
        opts: ['It is also twice as wide, so it covers four times the area.', 'It uses brighter colours.', 'Pictures are always bigger than bars.', 'It is drawn closer to the reader.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A graph can leave a false <b>impression</b>. What does <b>impression</b> mean here?',
        opts: ['an idea or feeling that something gives you', 'a mark pressed into something', 'an imitation of a person', 'a printed copy'], a: 0 },
      { k: 'choice', code: 'A2.2', half: true, q: 'Which question from the checklist helps you think about the graph maker’s purpose?',
        opts: ['Who made the graph, and what do they want me to think?', 'Where does each axis start?', 'Are the intervals equal?', 'Is the whole time period shown?'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the hand-picked time trick in your own words, with an example.',
        a: 'You show only the part of the data that supports your story. A team could show only its last five wins and leave out the twenty losses before.', look: 'a paraphrase and a fitting example' },
      { k: 'lines', code: 'A2.4', n: 3, q: 'Why might an advertiser use a cut-off axis? What effect does it have on viewers?',
        a: 'To make a small difference look huge, so their product seems much better. Viewers who do not check the axis believe the difference is big.', look: 'the advertiser’s purpose and the effect on viewers' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The last paragraph says not every zoomed-in graph is a trick. Why do you think the author added this?',
        a: 'To be fair and balanced, so readers do not reject every graph. Sometimes zooming in shows real, important changes.', look: 'the idea of balance and a legitimate use' },
      { k: 'choice', code: 'B3.2', q: '“Always check where the axis begins.” What kind of sentence is this?',
        opts: ['an imperative, giving an instruction', 'a question', 'an exclamation', 'a statement of opinion'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-hip-hop', subject: 'arts', form: 'Report',
    title: 'Born at a Block Party',
    deck: 'How hip hop grew from one neighbourhood into a worldwide art form',
    hero: {
      photo: 'g7-hip-hop.jpg', credit: 'Photo: Muhammed amine benloulou, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Hip hop dancers. Breaking, one of the original elements, is now danced around the world.'
    },
    body: [
      'In the early 1970s, the Bronx, a neighbourhood in New York City, was struggling. Buildings were abandoned, jobs were scarce and there was little money for youth programs. But in this tough place, young people created something new. In August 1973, a teenager called DJ Kool Herc played records at a back-to-school party in his building’s recreation room. That party is often called the birth of hip hop.',
      { h: 'The break' },
      'Kool Herc noticed that dancers went wild during the <b>break</b>, the short part of a song where the singing stops and only the drums play. So he used two record players with two copies of the same record. As one break ended, he started it on the other turntable, stretching a few seconds of drums into minutes. Dancers, called b-boys and b-girls, invented spinning, freezing and footwork moves to fill those beats. This became breaking.',
      { fig: [['DJing', 'mixing records'], ['MCing', 'rhyming to the beat'], ['breaking', 'dancing'], ['graffiti', 'painting']].map(function (r, i) {
            var x = 20 + (i % 2) * 140, y = 20 + Math.floor(i / 2) * 64; return '<rect class="k" x="' + x + '" y="' + y + '" width="120" height="48"/><text class="lb" x="' + (x + 60) + '" y="' + (y + 22) + '" text-anchor="middle">' + r[0] + '</text><text class="n" x="' + (x + 60) + '" y="' + (y + 38) + '" text-anchor="middle">' + r[1] + '</text>'; }).join('') +
          '<text class="l" x="150" y="160" text-anchor="middle">the four original elements</text>',
        tall: 168, cap: 'Hip hop began as four art forms that grew up together.' },
      { h: 'Voices on the mic' },
      'At parties, DJs had helpers who spoke over the music, hyping the crowd. These masters of ceremonies, or MCs, began to rhyme in rhythm with the beat. This is rapping. Early raps were fun party rhymes, but soon artists used them to tell stories about their lives and neighbourhoods. Hip hop gave young people who were often ignored a way to be heard.',
      { box: 'Hip hop in Canada', text: 'In 1989, Maestro Fresh Wes’s “Let Your Backbone Slide” became the first Canadian rap song to reach the national top 40. At the 2024 Olympics in Paris, Phil Wizard, a b-boy from Vancouver, won the first Olympic gold medal ever awarded in breaking.' },
      { h: 'Around the world' },
      'Hip hop is now one of the most popular forms of music on Earth. Artists rap in hundreds of languages. Many Indigenous artists in Canada use hip hop to share stories, protest injustice and keep their languages alive, sometimes rhyming in Cree, Anishinaabemowin or Inuktitut. What began in one recreation room became a global <b>culture</b>: a shared way of making art, dressing, speaking and seeing the world. In community centres across Canada, young people learn breaking, DJing and writing rhymes, carrying on traditions that began at one party more than fifty years ago.'
    ],
    guide: { before: 'Find the Bronx on a map of New York City. Teach <b>break</b> and <b>culture</b>. Listen together to the drum break of an old funk song if you can.',
      after: 'Why do you think hip hop spread to so many countries and languages?' },
    words: [['break', 'the part of a song where only the drums play'], ['culture', 'the shared art, language, customs and beliefs of a group']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What did Kool Herc do with two record players?',
        opts: ['He played the break on one, then the other, to make it last longer.', 'He played two songs at once.', 'He recorded his own voice.', 'He played them faster.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['the four original elements of hip hop', 'a map of the Bronx', 'how a record player works', 'the steps of a dance'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'MCs began to <b>hype</b> the crowd. What does <b>hype</b> mean here?',
        opts: ['get people excited', 'make people leave', 'calm people down', 'ask for money'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'How is this report mostly organized?',
        opts: ['in time order, from the 1970s to today', 'from least to most important', 'as a list of songs', 'as a set of instructions'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How did hip hop give “young people who were often ignored a way to be heard”? Use the text.',
        a: 'MCs used raps to tell stories about their lives and neighbourhoods, so people outside the Bronx heard about their struggles.', look: 'rapping as storytelling about their lives' },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How do some Indigenous artists in Canada use hip hop today?',
        a: 'They share stories, protest injustice and keep their languages alive, sometimes rapping in Cree, Anishinaabemowin or Inuktitut.', look: 'two uses from the text' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about hip hop before reading? What surprised you?',
        a: 'I knew about rap songs. I was surprised it started at one party and that breaking is now an Olympic sport.', look: 'prior knowledge and one surprising fact' },
      { k: 'choice', code: 'B3.3', q: 'Why is “Let Your Backbone Slide” in quotation marks?',
        opts: ['It is the title of a song.', 'Someone is speaking.', 'It is a foreign phrase.', 'It is the most important idea.'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-ev-batteries', subject: 'tech', form: 'Explanation',
    title: 'Inside an Electric Car',
    deck: 'How a battery stores energy, and the hard questions about where its materials come from',
    hero: {
      photo: 'g7-ev-charging.jpg', credit: 'Photo: Michael Movchin and Felix Müller, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An electric car plugged in to recharge. Its battery stores the energy that a gas tank would hold in fuel.'
    },
    body: [
      'An electric car has no gas tank, no tailpipe and no engine that roars. Under its floor is a flat, heavy box: the <b>battery</b>. It holds thousands of small cells, each a little like the battery in a phone. Together, they store enough energy to drive a car hundreds of kilometres.',
      { h: 'Ions on the move' },
      'Most electric cars use lithium-ion batteries. Each cell has two sides, called <b>electrodes</b>, with a liquid or gel between them. When you plug the car in, electricity pushes tiny charged particles, called lithium ions, from one electrode to the other, where they are stored. When you drive, the ions flow back. As they move, they send electrons through wires to the motor, which turns the wheels.',
      { fig: '<rect class="k" x="40" y="30" width="60" height="100"/><rect class="k" x="200" y="30" width="60" height="100"/><rect class="t" x="100" y="30" width="100" height="100"/>' +
          '<text class="lb" x="70" y="148" text-anchor="middle">electrode</text><text class="lb" x="230" y="148" text-anchor="middle">electrode</text><text class="n" x="150" y="148" text-anchor="middle">gel</text>' +
          [60, 80, 100].map(function (y) { return '<circle class="dot" cx="' + (120 + (y - 60)) + '" cy="' + y + '" r="4"/>'; }).join('') +
          D.arrow(110, 50, 190, 50, 'a') + '<text class="n" x="150" y="44" text-anchor="middle">charging</text>' +
          D.arrow(190, 116, 110, 116, 'a') + '<text class="n" x="150" y="126" text-anchor="middle">driving</text>' +
          '<path class="k" d="M70 30 V12 H230 V30"/><circle class="k" cx="150" cy="12" r="8"/><text class="n" x="166" y="10">motor</text>',
        tall: 156, cap: 'One cell, simplified. Lithium ions move one way when the battery charges and back again when the car runs.' },
      { h: 'Cold and range' },
      'Canadian drivers quickly learn that batteries do not like the cold. The chemical reactions inside slow down, and the car may also use energy to heat the cabin. On a −20 °C day, a car may travel noticeably fewer kilometres on a full charge than in summer. Many drivers plug in at home overnight, and fast chargers along highways can refill much of a battery in under an hour.',
      { box: 'Cleaner, but not perfect', text: 'Electric cars give off no exhaust while driving. How clean they are overall depends on how the electricity is made and how the battery’s materials are mined.' },
      { h: 'From the ground' },
      'A battery is made from <b>minerals</b> such as lithium, nickel, cobalt and graphite. Canada has deposits of many of them, and new battery factories have been built in Ontario and Quebec. But mining can harm land and water, and some deposits lie on the traditional territories of First Nations. Many people believe mines should go ahead only with the consent of the communities affected and strict protection for the environment.',
      'When a car battery wears out, after many years, its metals do not have to be thrown away. Recycling plants can recover much of the lithium, nickel and cobalt to make new batteries. Engineers are also testing new kinds of batteries that need fewer rare materials, charge faster and work better in the cold.'
    ],
    guide: { before: 'Look at the battery label on a phone or laptop. Teach <b>battery</b>, <b>electrodes</b> and <b>minerals</b>. Ask what the child already knows about electric cars.',
      after: 'If your family were choosing a car, what questions would you ask about an electric one?' },
    words: [['electrodes', 'the two ends of a battery cell, where ions are stored'], ['minerals', 'natural solid substances found in the ground']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number what happens when an electric car is driven after charging.',
        items: ['Electricity pushes lithium ions to one electrode.', 'The ions are stored there.', 'When you drive, the ions flow back.', 'Electrons travel through wires to the motor.'], show: [2, 3, 0, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what do the two arrows show?',
        opts: ['Ions move one way when charging and the other way when driving.', 'Air flows through the battery.', 'The car moves forward and back.', 'Electricity goes into the ground.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does an electric car go a shorter distance in winter?',
        opts: ['Cold slows the reactions, and heating the cabin uses energy.', 'Snow blocks the wheels.', 'The battery freezes solid.', 'The motor is smaller in winter.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'What is the purpose of the box “Cleaner, but not perfect”?',
        opts: ['to show that the benefits of electric cars depend on other things', 'to sell electric cars', 'to explain how ions move', 'to list the minerals'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Mines should go ahead only with the <b>consent</b> of the communities. What does <b>consent</b> mean?',
        opts: ['permission or agreement', 'payment', 'a warning', 'a map'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why do some people believe mines need the consent of First Nations? Use the text.',
        a: 'Some deposits lie on First Nations’ traditional territories, and mining can harm their land and water, so they should have a say.', look: 'traditional territory and possible harm' },
      { k: 'lines', code: 'C3.8', n: 4, q: 'Are electric cars a good solution for the environment? Give one point for and one point against, then your opinion.',
        a: 'For: they give off no exhaust while driving. Against: mining for battery minerals can harm land and water. I think they are better overall, especially if batteries are recycled.', look: 'one point each way and a reasoned opinion' },
      { k: 'lines', code: 'C2.2', n: 2, q: 'Who might want to read this text before making a decision? What would they learn?',
        a: 'A family thinking about buying an electric car. They would learn about winter range, charging and where the materials come from.', look: 'a reader with a purpose and what they would gain' }
    ]
  });

  P.add({
    id: 'g7-georgian-bay', subject: 'story', form: 'Poems', plain: true,
    title: 'Two Poems from the Bay',
    deck: 'Two original poems about Georgian Bay: one in calm weather, one in a storm',
    hero: {
      photo: 'g7-killbear.jpg', credit: 'Photo: GBBR, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Sunset at Killbear Provincial Park on Georgian Bay, where pines cling to bare pink granite.'
    },
    body: [
      { h: 'The Pine on the Point' },
      '<i>She leans away from the west wind<br>as if she has been listening<br>to it for a hundred years<br>and has finally learned the argument.<br><br>Her roots grip the pink granite<br>like a climber’s fingers<br>in a crack too thin for hope.<br>She has no soil to speak of. She grows anyway.<br><br>Her branches all reach east,<br>a flag that never comes down,<br>a compass with only one direction:<br>away from the storm, toward the morning.</i>',
      { fig: '<path class="k" d="M10 150 Q80 120 150 128 T290 140"/>' +
          '<path class="k" d="M120 128 Q118 90 130 60 Q140 40 150 30"/>' +
          '<path class="a" d="M128 70 Q160 66 196 72 M132 56 Q164 50 200 56 M140 44 Q166 38 190 40 M124 88 Q156 86 186 94"/>' +
          D.arrow(60, 40, 100, 50, 'a') + '<text class="n" x="20" y="34">west wind</text>' +
          D.label(200, 116, 'roots in a crack', 126, 126) + D.label(210, 30, 'branches reach east', 196, 56),
        tall: 156, cap: 'A windswept pine. Its shape records years of wind from one direction.' },
      { h: 'Storm Warning' },
      '<i>By noon the sky had changed its mind.<br>The water, glass at breakfast,<br>began to grumble, then to shout,<br>throwing white fists at the rocks.<br><br>Gulls gave up and rode the wind backward.<br>Our canoe waited on the shore,<br>upside down, patient as a turtle.<br><br>We watched from the cabin window:<br>the bay was a wild animal pacing,<br>and we were glad,<br>very glad,<br>to be on the right side of the glass.</i>',
      { h: 'About the poems' },
      'Georgian Bay, the eastern arm of Lake Huron, is famous for its thirty thousand islands, its rocky shores and its storms. These two poems show the same place in very different weather. Both poems use <b>figurative language</b>, words that mean more than their exact dictionary meaning. The first uses <b>personification</b>, giving the pine human qualities: she listens, she learns, she grows anyway. The second compares the stormy water to shouting fists and a pacing animal. Neither poem rhymes. Instead, the poets rely on strong images and the rhythm of everyday speech. Read each poem twice, once silently and once aloud. Notice where the lines break, because a poet uses line breaks to make you pause. Ask yourself what each comparison helps you see or feel that a plain description could not. Poets choose every word on purpose, so a single surprising word, like “argument” or “patient,” is often worth a second look.'
    ],
    guide: { before: 'Look at the photo together and describe the rocks and trees. Teach <b>figurative language</b> and <b>personification</b>. Read each poem aloud slowly.',
      after: 'Which poem did you like better? Choose one image from it and draw it.' },
    words: [['figurative language', 'words that mean more than their exact dictionary meaning'], ['personification', 'giving human qualities to something that is not human']],
    qs: [
      { k: 'choice', code: 'C1.5', half: true, q: '“Her roots grip the pink granite like a climber’s fingers.” What is this?',
        opts: ['a simile', 'a rhyme', 'a fact', 'a question'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'How does the diagram help you understand the first poem?',
        opts: ['It shows why the branches all reach east.', 'It shows a storm.', 'It shows a canoe.', 'It shows the cabin window.'], a: 0 },
      { k: 'table', code: 'C3.1', q: 'Explain what each image suggests.', cols: ['Image', 'What it suggests'],
        rows: [['“a flag that never comes down”', null], ['“throwing white fists at the rocks”', null], ['“patient as a turtle”', null]],
        a: [[null, 'The branches stay pointing one way, proud and steady.'], [null, 'The waves crash hard and angrily against the shore.'], [null, 'The canoe waits quietly and safely for the storm to pass.']] },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why does the second poem repeat “very glad” on its own line?',
        opts: ['to slow the reader down and stress the feeling', 'because the poet made a mistake', 'to start a new stanza', 'to make it rhyme'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who is the speaker in “Storm Warning”?',
        opts: ['someone watching the storm from a cabin, using “we” and “our”', 'the pine tree', 'a gull', 'the wind'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'In “The Pine on the Point,” what qualities does the pine have? What might the poet want us to admire?',
        a: 'She is stubborn and strong, growing with no soil and facing the wind. The poet wants us to admire never giving up in hard conditions.', look: 'the pine’s qualities and a message about resilience' },
      { k: 'lines', code: 'C1.3', n: 3, q: 'Compare the mood of the two poems. Use one word or line from each.',
        a: 'The first is calm and proud, like “she grows anyway.” The second is wild and tense, like “the bay was a wild animal pacing,” but it ends feeling safe.', look: 'a mood for each, supported by a quotation' },
      { k: 'lines', code: 'B2.3', n: 2, q: 'Read “Storm Warning” aloud. Where did you pause, and why?',
        a: 'I paused at the end of each line and after “very glad,” because the line breaks tell you to slow down.', look: 'pauses linked to line breaks or punctuation' }
    ]
  });

  P.add({
    id: 'g7-cholera-map', subject: 'science', form: 'Report',
    title: 'The Map That Stopped a Disease',
    deck: 'How Dr. John Snow used dots on a map to find the source of an outbreak',
    hero: {
      photo: 'g7-cholera-map.jpg', credit: 'Map: John Snow, 1854, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Part of John Snow’s 1854 map of London. Each small black bar stands for one person who died of cholera.'
    },
    body: [
      'In the summer of 1854, a terrifying disease swept through Soho, a crowded neighbourhood in London, England. People who were healthy in the morning could be dead by night. In about ten days, more than 500 people died. The disease was <b>cholera</b>, which causes severe diarrhea and dehydration. Cholera had also killed thousands in Canada, including in Québec City and Montréal in 1832.',
      { h: 'Bad air or bad water?' },
      'At the time, most doctors believed cholera spread through “bad air,” a foul-smelling mist rising from garbage and sewage. A London doctor named John Snow disagreed. He had noticed that cholera attacked the stomach, not the lungs. He suspected that people caught it by swallowing something, probably dirty water.',
      { fig: '<path class="t" d="M10 60 H290 M10 120 H290 M90 10 V160 M200 10 V160"/>' +
          '<circle class="k" cx="150" cy="90" r="8"/>' + D.label(96, 152, 'Broad Street pump', 146, 96) + '' +
          [[140, 74], [160, 76], [130, 92], [168, 98], [142, 108], [156, 110], [124, 80], [176, 84], [136, 66], [118, 100], [182, 106], [150, 126], [110, 74], [190, 72], [168, 132], [128, 136], [230, 40], [60, 140], [250, 140]].map(function (p) { return '<rect class="h" x="' + (p[0] - 3) + '" y="' + (p[1] - 2) + '" width="6" height="4"/>'; }).join('') +
          '<rect class="k" x="226" y="70" width="44" height="34"/><text class="n" x="248" y="118" text-anchor="middle">brewery</text>' +
          '<rect class="k" x="20" y="72" width="50" height="34"/><text class="n" x="45" y="118" text-anchor="middle">workhouse</text>',
        tall: 166, cap: 'A simplified version of the map. Deaths cluster around one pump. Few died in the brewery or the workhouse.' },
      { h: 'Following the evidence' },
      'Snow went door to door, asking where each victim had lived and where they got their water. Then he marked every death on a map. A pattern jumped out: the deaths were clustered around a single public water pump on Broad Street. Most of the victims lived closer to that pump than to any other.',
      'Snow also studied the exceptions. A nearby workhouse with hundreds of residents had very few deaths. It had its own well. Workers at a brewery on the same street were almost untouched. They were given free beer and rarely drank pump water. Each exception supported his idea instead of weakening it.',
      { box: 'The handle comes off', text: 'On September 8, 1854, Snow convinced local officials to remove the handle of the Broad Street pump. The outbreak was already slowing, but new cases dropped.' },
      { h: 'A new science' },
      'Later, investigators found that a cesspool beside the pump had been leaking sewage into the well. Many experts still doubted Snow, but over time the evidence for germs in water won. Today, Snow is called a founder of <b>epidemiology</b>, the study of how diseases spread through groups of people. His idea of mapping cases is still used to track outbreaks around the world.'
    ],
    guide: { before: 'Mark where everyone in the family drinks water on a quick sketch of your home. Teach <b>cholera</b> and <b>epidemiology</b>. Explain that in 1854 people did not yet know about germs.',
      after: 'How do scientists track diseases today? How is it like what Snow did?' },
    words: [['cholera', 'a dangerous disease spread through dirty water'], ['epidemiology', 'the study of how diseases spread through groups of people']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What did most doctors in 1854 believe caused cholera?',
        opts: ['bad air from garbage and sewage', 'dirty water', 'germs on hands', 'cold weather'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What pattern does the map show?',
        opts: ['Deaths cluster around one water pump.', 'Deaths are spread evenly.', 'Most deaths were in the brewery.', 'No one died near the pump.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did few brewery workers get sick?',
        opts: ['They drank beer and rarely drank pump water.', 'They were stronger.', 'They lived far away.', 'The brewery had clean air.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Epidemiology</b> ends in <b>-ology</b>. What does <b>-ology</b> mean?',
        opts: ['the study of', 'a fear of', 'without', 'a person who'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain how the workhouse and the brewery supported Snow’s idea.',
        a: 'Both were near the pump but had few deaths. The workhouse had its own well and the brewery workers drank beer, so they did not drink the pump water.', look: 'both places linked to not drinking the pump water' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the steps Snow took to find the source of the outbreak.',
        a: 'He went door to door asking about victims and their water, marked each death on a map, saw the cluster around the Broad Street pump and studied the exceptions.', look: 'the steps in order' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Many experts still doubted Snow. Why do you think it can take a long time for people to accept a new idea?',
        a: 'People trust what they already believe, and Snow could not see the germs. It takes a lot of evidence to change many people’s minds.', look: 'a reasoned answer about changing beliefs' },
      { k: 'choice', code: 'C1.1', q: '“It had its own well.” What does <b>It</b> refer to?',
        opts: ['the workhouse', 'the brewery', 'the pump', 'the map'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-fiona', subject: 'geography', form: 'News report',
    title: 'Fiona’s Night',
    deck: 'How one storm in 2022 changed Atlantic Canada, and what it warns about the future',
    hero: {
      photo: 'g7-fiona.jpg', credit: 'Photo: Larry (microbe), CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Cleaning up fallen trees in Charlottetown, Prince Edward Island, after Fiona in September 2022.'
    },
    body: [
      'Overnight on September 23 and 24, 2022, the remains of Hurricane Fiona slammed into Atlantic Canada. By morning, roofs had been torn off, huge trees lay across streets and hundreds of thousands of homes had no power. It was one of the most destructive storms in Canadian history. For many people in the region, it became the storm they measure all others against, the way earlier generations remembered Hurricane Juan in 2003.',
      { h: 'A record-breaking storm' },
      'Fiona formed in the warm waters of the Atlantic, near the Caribbean, where it caused deadly flooding. As it moved north, it lost some of its tropical features and became a <b>post-tropical storm</b>, but it also grew larger. When it reached Nova Scotia, its air pressure was the lowest ever measured on land in Canada. Low pressure means stronger winds, and gusts reached more than 170 km/h.',
      { fig: '<path class="k" d="M30 150 Q70 120 110 110 Q160 98 190 80 Q230 56 270 20"/>' +
          [[40, 144, 'Caribbean'], [150, 100, 'Atlantic Ocean'], [214, 64, 'Nova Scotia'], [262, 28, 'Newfoundland']].map(function (r, i) { return '<circle class="dot" cx="' + r[0] + '" cy="' + r[1] + '" r="5"/><text class="n" x="' + (r[0] + (i === 3 ? -12 : 10)) + '" y="' + (r[1] + (i === 3 ? 4 : i === 2 ? 14 : 4)) + '"' + (i === 3 ? ' text-anchor="end"' : '') + '>' + r[2] + '</text>'; }).join('') +
          D.arrow(110, 110, 150, 100, 'a') + D.arrow(190, 80, 230, 56, 'a'),
        tall: 160, cap: 'A simplified sketch of Fiona’s path north. Not a map.' },
      { h: 'The damage' },
      'In Nova Scotia, Prince Edward Island and Cape Breton, winds snapped power poles and flattened forests. In Charlottetown, many of the city’s tall old trees came down. Waves and a <b>storm surge</b>, a rise in sea level pushed ashore by the wind, washed away parts of the coastline. In Port aux Basques, Newfoundland, the sea swept whole houses into the water, and one woman lost her life. Some families waited weeks for their power to come back.',
      { box: 'Neighbours helping', text: 'Crews came from other provinces to repair power lines. Volunteers cleared roads, opened warming centres and cooked meals for people without electricity.' },
      { h: 'A warning' },
      'Scientists say that warmer oceans give storms more energy, so strong storms are likely to reach farther north more often. After Fiona, communities are thinking about how to prepare: burying more power lines, protecting shorelines with natural barriers like dunes and salt marshes, and moving some homes away from the most exposed coasts. In some places, people are now asking whether rebuilding in the same spot is safe. These are hard choices, because many families have lived beside the sea for generations, and the coast is part of who they are.'
    ],
    guide: { before: 'Find Nova Scotia, Prince Edward Island and Port aux Basques on a map. Teach <b>post-tropical storm</b> and <b>storm surge</b>. Ask what the child knows about hurricanes.',
      after: 'What would your family need if the power went out for a week? Make an emergency kit list together.' },
    words: [['post-tropical storm', 'a storm that began as a hurricane but changed as it moved into cooler areas'], ['storm surge', 'a rise in sea level pushed ashore by a storm’s winds']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this is a news report?',
        opts: ['It gives dates, places and facts about a real event.', 'It rhymes.', 'It gives steps to follow.', 'It is made up.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the sketch show?',
        opts: ['the path Fiona took from the Caribbean north to Canada', 'the size of the waves', 'where power lines are', 'the pressure readings'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Fiona have such strong winds in Nova Scotia?',
        opts: ['Its air pressure was extremely low.', 'It was still a small storm.', 'The ocean was frozen.', 'It moved very slowly.'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“…where it caused deadly flooding.” What does <b>where</b> refer to?',
        opts: ['near the Caribbean', 'Nova Scotia', 'Charlottetown', 'Port aux Basques'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain how a storm surge can destroy houses near the shore.',
        a: 'The wind pushes the sea higher onto the land, so waves reach places they usually do not and can wash away the ground and houses.', look: 'higher water pushed ashore and its effect on houses' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Based on the last section, predict one change a coastal town might make in the next ten years. Why?',
        a: 'It might bury its power lines so winds cannot knock them down, because warmer oceans may bring more strong storms.', look: 'a prediction linked to the text’s reasons' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why do you think the author included the box about neighbours helping?',
        a: 'To show that the story is not only about damage. People came together and helped, which gives hope.', look: 'the purpose of showing community response' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is a complex sentence?',
        opts: ['Low pressure means stronger winds, and gusts reached more than 170 km/h.', 'In Charlottetown, many of the city’s tall old trees came down.', 'As it moved north, it lost some of its tropical features.', 'It was one of the most destructive storms in Canadian history.'], a: 2 }
    ]
  });

  P.add({
    id: 'g7-james-bay', subject: 'history', form: 'Report',
    title: 'Power from the North',
    deck: 'The James Bay power project and Canada’s first modern treaty',
    hero: {
      photo: 'g7-spillway.jpg', credit: 'Photo: fargomeD, CC BY 2.5, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The spillway of the Robert-Bourassa generating station. Its huge steps are called the Giant’s Staircase.'
    },
    body: [
      'In 1971, the premier of Quebec, Robert Bourassa, announced what he called the project of the century. Quebec would dam the great rivers that flow into James Bay and build enormous power stations to make <b>hydroelectricity</b>. The electricity would power Quebec’s homes and factories and be sold to the United States. There was one problem. The land was not empty. About 6 000 Cree and Inuit lived there, hunting, fishing and trapping as their ancestors had for thousands of years. No one had asked them.',
      { fig: '<path class="k" d="M10 120 Q60 116 100 110"/><rect class="h" x="100" y="70" width="20" height="60"/><path class="t" d="M120 80 Q200 70 290 84 V130 H120 Z"/>' +
          D.ripple(130, 286, 92, 't') + '<path class="k" d="M10 130 H290"/>' +
          '<text class="l" x="210" y="62" text-anchor="middle">reservoir: flooded land</text><text class="n" x="110" y="146" text-anchor="middle">dam</text>' +
          '<text class="n" x="50" y="104" text-anchor="middle">river below</text>' + D.arrow(100, 118, 60, 118, 'a') +
          '<circle class="k" cx="110" cy="56" r="10"/><path class="k" d="M110 46 V66 M100 56 H120"/><text class="n" x="110" y="34" text-anchor="middle">power station</text>',
        tall: 156, cap: 'A dam holds back a river and floods the land behind it. Falling water turns turbines in the power station.' },
      { h: 'Going to court' },
      'Cree and Inuit leaders learned about the plans from the news. Rivers they depended on would be flooded, and hunting grounds would disappear under huge <b>reservoirs</b>. They went to court. In 1973, a judge ordered construction to stop, agreeing that their rights had been ignored. A higher court overturned the order within a week, and work started again. But the case showed that the government had to deal with the Cree and Inuit.',
      { h: 'A new kind of agreement' },
      'In 1975, after long negotiations, the Cree, the Inuit, Quebec and Canada signed the James Bay and Northern Québec Agreement. It is often called the first modern <b>treaty</b> in Canada. The Cree and Inuit received money, guaranteed hunting and fishing rights, and control over their own schools, health care and local governments. In return, the project could go ahead.',
      { box: 'A canoe to New York', text: 'In 1990, Cree and Inuit paddled a special canoe-kayak from James Bay to New York City to protest a second project on the Great Whale River. Quebec cancelled that project in 1994.' },
      { h: 'Benefits and costs' },
      'Today the James Bay power stations make a large share of Quebec’s electricity, which is clean compared with burning coal or gas. But the flooding changed the land forever. Some trap lines and burial grounds were lost, and mercury released from flooded soil built up in fish, so people had to eat less of a key food. Many Cree say the agreement gave them tools to protect their way of life, while others say it came at too high a price.'
    ],
    guide: { before: 'Find James Bay, Quebec, on a map. Teach <b>hydroelectricity</b>, <b>reservoirs</b> and <b>treaty</b>. Ask: who should decide what happens to land?',
      after: 'If you were a Cree leader in 1975, would you have signed the agreement? What would you have asked for?' },
    words: [['hydroelectricity', 'electricity made by the force of falling or flowing water'], ['reservoirs', 'large lakes made by building a dam'], ['treaty', 'a formal agreement between nations or governments']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What was the “one problem” with the project in 1971?',
        opts: ['The Cree and Inuit who lived there had not been asked.', 'There was not enough water.', 'It was too cold to build.', 'No one wanted electricity.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, what is a reservoir?',
        opts: ['land flooded behind a dam', 'a power station', 'a river below a dam', 'a turbine'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why was the 1973 court case important even though the order was overturned?',
        opts: ['It showed the government had to deal with the Cree and Inuit.', 'It stopped the project forever.', 'It gave Quebec more money.', 'It moved the dam.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Hydroelectricity</b> begins with <b>hydro-</b>. What does <b>hydro-</b> mean?',
        opts: ['water', 'fire', 'earth', 'power'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'List benefits and costs of the James Bay project.', cols: ['Benefits', 'Costs'],
        rows: [[null, null], [null, null]],
        a: [['clean electricity for Quebec', 'flooded hunting grounds, trap lines and burial grounds'], ['schools, health care and rights for the Cree and Inuit', 'mercury in fish, a key food']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose voices were left out at the start of the project? How did they make themselves heard?',
        a: 'The Cree and Inuit. They went to court, negotiated the 1975 agreement and later paddled to New York to protest.', look: 'the Cree and Inuit and at least one action' },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How does the 1975 agreement still affect Cree and Inuit communities today?',
        a: 'They still control their own schools, health care and local governments and have hunting and fishing rights from the agreement.', look: 'lasting rights or self-government' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'The last sentence gives two views of the agreement. Why is it important that the author includes both?',
        a: 'So readers can see that people disagree and think for themselves, instead of hearing only one side.', look: 'balance and independent thinking' }
    ]
  });

  P.add({
    id: 'g7-edited-images', subject: 'tech', form: 'Explanation',
    title: 'Too Perfect to Be Real',
    deck: 'How photos of people are edited, and why it matters how we feel about ourselves',
    hero: {
      photo: 'g7-selfie.jpg', credit: 'Photo: Maëlick, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Taking a selfie. Many phone cameras can smooth skin and change faces before a photo is even saved.'
    },
    body: [
      'Scroll through social media or flip through a magazine, and you will see people with flawless skin, perfect teeth and not a single stray hair. It is easy to believe these images show how people really look. Often, they do not. Most photos of people that we see in ads and online have been changed in some way.',
      { h: 'How images are edited' },
      'Professional photographers have always used lighting and makeup to make people look their best. Today, photo-editing software makes it easy to go much further. An editor can smooth skin, remove freckles and pimples, whiten teeth, make eyes bigger and change the shape of a person’s body. This is called <b>retouching</b>. Many phone apps offer <b>filters</b> that do some of these changes automatically, with one tap, and some cameras smooth faces by default.',
      { fig: '<rect class="k" x="20" y="20" width="110" height="120"/><rect class="k" x="170" y="20" width="110" height="120"/>' +
          '<circle class="k" cx="75" cy="64" r="26"/><circle class="k" cx="225" cy="62" r="24"/><path class="k" d="M45 140 Q75 96 105 140 M200 140 Q225 102 250 140"/>' +
          '<circle class="dot" cx="64" cy="70" r="1.5"/><circle class="dot" cx="88" cy="58" r="1.5"/><circle class="dot" cx="70" cy="76" r="1.5"/>' +
          '<circle class="k" cx="66" cy="60" r="3"/><circle class="k" cx="84" cy="60" r="3"/><circle class="k" cx="216" cy="58" r="5"/><circle class="k" cx="234" cy="58" r="5"/>' +
          D.arrow(134, 80, 166, 80, 'a') +
          '<text class="n" x="75" y="156" text-anchor="middle">original</text><text class="n" x="225" y="156" text-anchor="middle">edited</text>' +
          D.label(160, 12, 'bigger eyes, no freckles', 216, 52, 'start'),
        tall: 162, cap: 'A simple drawing of common edits. Small changes add up to a face that no real person has.' },
      { h: 'Why it matters' },
      'When almost every image we see has been edited, our idea of “normal” shifts. Real skin has pores and marks. Real bodies come in every shape and size. Studies have found that comparing ourselves with edited images can make many young people feel worse about how they look. Some people even try to look like their own filtered photos.',
      { box: 'Labels for edits', text: 'Some countries now have laws requiring a label on ads when a person’s body has been edited. Some companies have promised to stop retouching the people in their ads.' },
      { h: 'Seeing clearly' },
      'You can protect yourself by asking a few questions when you look at an image. Has this been edited? Who made it, and what do they want me to feel or buy? Notice how you feel after scrolling, and follow accounts that show real, unedited people. When you post photos yourself, think about whether you need a filter at all. Your face does not need fixing to be worth seeing. The same goes for your friends. Real faces, with freckles, scars, braces and uneven smiles, are what people actually look like, and they are what make each person recognizable and interesting.'
    ],
    guide: { before: 'Look at a magazine ad or online post together and guess what was edited. Teach <b>retouching</b> and <b>filters</b>. Keep the talk positive about the child’s own appearance.',
      after: 'How do you feel after scrolling for a while? What could you change about what you follow?' },
    words: [['retouching', 'changing a photo to remove or alter details'], ['filters', 'effects in an app that change how a photo looks']],
    qs: [
      { k: 'choice', code: 'A2.3', half: true, q: 'Which is the best clue that an image may have been edited?',
        opts: ['The skin has no pores or marks at all.', 'The photo is in colour.', 'The person is smiling.', 'It was posted online.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the drawing show?',
        opts: ['common edits that make a face look unreal', 'how cameras work', 'two different people', 'how to apply makeup'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why can edited images make people feel worse about how they look?',
        opts: ['They compare themselves with images that are not real.', 'The images are blurry.', 'They cannot afford cameras.', 'Edited photos are too small.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The author says our idea of “normal” <b>shifts</b>. What does <b>shifts</b> mean?',
        opts: ['changes', 'disappears', 'improves', 'stays the same'], a: 0 },
      { k: 'lines', code: 'A2.4', n: 3, q: 'Why might a company retouch the people in its ads? What effect might this have on buyers?',
        a: 'To make the product seem to make people perfect, so buyers want it. Buyers might feel they need it to look like the ad.', look: 'the company’s purpose and the effect on viewers' },
      { k: 'lines', code: 'A2.1', n: 3, q: 'When you post a photo of yourself or a friend, what is one responsible choice you could make? Why?',
        a: 'Post it without a filter, or ask my friend before posting. It shows real faces and respects their right to decide.', look: 'a responsible posting choice with a reason' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What message does the last sentence send? Do you agree?',
        a: 'That you are worth seeing just as you are. I agree, because everyone has marks and differences and that is normal.', look: 'the message and a personal response' },
      { k: 'choice', code: 'B3.2', q: '“Has this been edited?” What kind of sentence is this?',
        opts: ['a question', 'a command', 'an exclamation', 'a statement'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-integers-cold', subject: 'math', form: 'Explanation',
    title: 'Below Zero',
    deck: 'Using integers to make sense of Canadian winter temperatures',
    hero: {
      photo: 'g7-edmonton-cold.jpg', credit: 'Photo: hobvias sudoneighm, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A snowy winter day in Edmonton. Prairie cities can swing from mild to bitter cold in a single day.'
    },
    body: [
      'Few countries know cold the way Canada does. On February 3, 1947, the village of Snag, in Yukon, recorded −63 °C, the coldest temperature ever officially measured in North America. Even in southern cities, winter temperatures often drop far below zero. To talk about these temperatures, and to calculate with them, we need <b>integers</b>: whole numbers that can be positive, negative or zero.',
      { h: 'The number line' },
      'A thermometer is really a vertical number line. Zero is where water freezes. Temperatures above zero are positive, and temperatures below zero are negative. Each negative number is the <b>opposite</b> of a positive number: −8 and +8 are the same distance from zero, but on different sides. The farther a negative number is from zero, the colder it is, so −20 °C is colder than −5 °C, even though 20 is bigger than 5.',
      { fig: '<path class="k" d="M20 70 H280"/>' + [-20, -15, -10, -5, 0, 5, 10].map(function (n, i) { var x = 30 + i * 40; return '<path class="k" d="M' + x + ' 64 V76"/><text class="n" x="' + x + '" y="94" text-anchor="middle">' + (n < 0 ? '−' + (-n) : n) + '</text>'; }).join('') +
          '<path class="a" d="M94 60 Q162 20 224 56"/>' + D.arrow(220, 52, 229, 62, 'a') +
          '<circle class="dot" cx="94" cy="70" r="5"/><circle class="dot" cx="230" cy="70" r="5"/>' +
          '<text class="l" x="162" y="22" text-anchor="middle">a rise of 17 degrees</text>' +
          '<text class="n" x="94" y="114" text-anchor="middle">7 a.m.: −12</text><text class="n" x="230" y="114" text-anchor="middle">3 p.m.: +5</text>' +
          '<text class="n" x="150" y="140" text-anchor="middle">12 to reach zero, then 5 more</text>',
        tall: 148, cap: 'Finding a change in temperature on a number line. Each mark is 5 degrees; the dots are at −12 and +5.' },
      { h: 'Finding the change' },
      'Suppose it is −12 °C at 7 a.m. in Edmonton and +5 °C by 3 p.m. How much did it warm up? On a number line, count from −12 to 0: that is 12 degrees. Then count from 0 to +5: 5 more. The temperature rose 12 + 5 = 17 degrees. You can also subtract: (+5) − (−12) = +17. Subtracting a negative number is the same as adding its opposite.',
      { box: 'Wind chill', text: 'Weather reports often give a wind chill, such as −30, on a −20 °C windy day. It is not a real temperature. It tells you how cold the wind will feel on bare skin.' },
      { h: 'Going down' },
      'Temperatures can fall quickly too. If it is +3 °C at noon and a cold front drops the temperature by 11 degrees, the new temperature is 3 − 11 = −8 °C. On the number line, you move 3 to reach zero and 8 more below it.',
      'Integers are not just for weather. They describe bank balances, heights above and below sea level, and goals for and against in hockey. Any time there is a zero point with two directions, integers are the tool. A submarine 40 m below the surface is at −40 m. A bank account that is $15 overdrawn has a balance of −$15. And when your favourite hockey team has scored 3 goals and let in 5, its goal difference is −2.'
    ],
    guide: { before: 'Look at today’s forecast together. Teach <b>integers</b> and <b>opposite</b>. Draw a vertical number line from −20 to +20.',
      after: 'Find the difference between today’s high and low. Show it on a number line.' },
    words: [['integers', 'whole numbers that can be positive, negative or zero'], ['opposite', 'a number the same distance from zero on the other side']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Which temperature is colder?',
        opts: ['−20 °C', '−5 °C', 'They are the same.', '0 °C'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how does the arrow show the change from −12 to +5?',
        opts: ['It jumps from one dot to the other, a rise of 17.', 'It shows a fall of 7.', 'It shows a rise of 5.', 'It shows the wind chill.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'It is −4 °C and warms up 9 degrees. What is the new temperature?',
        opts: ['+5 °C', '−13 °C', '+13 °C', '−5 °C'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does the word <b>opposite</b> mean in this text?',
        opts: ['a number the same distance from zero on the other side', 'a number that is bigger', 'a number next to zero', 'a number that is cold'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain why −20 °C is colder than −5 °C, even though 20 is bigger than 5.',
        a: 'For negative numbers, the farther from zero, the colder. −20 is 20 below zero, and −5 is only 5 below, so −20 is colder.', look: 'distance below zero' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'The text shows two ways to find a change in temperature. Explain one way in your own words.',
        a: 'Count on the number line from the first temperature up to zero, then from zero to the second temperature, and add the two amounts.', look: 'one correct method paraphrased' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Describe a time you experienced a big change in temperature in one day. Write it as an integer problem.',
        a: 'On a ski day it was −15 °C in the morning and −2 °C in the afternoon. The temperature rose 13 degrees.', look: 'a personal example with a correct integer change' },
      { k: 'choice', code: 'B3.3', q: 'Why is there a comma after “Yukon” in “the village of Snag, in Yukon, recorded −63 °C”?',
        opts: ['to set off extra information about where Snag is', 'to separate a list', 'to end a sentence', 'to show a question'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-animation', subject: 'arts', form: 'Explanation',
    title: 'Pictures That Move',
    deck: 'How animation tricks your eyes, from spinning drums to Canada’s National Film Board',
    hero: {
      photo: 'g7-zoetrope.jpg', credit: 'Photo: Runner1616, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A zoetrope, a spinning drum invented in the 1800s. Through its slits, a strip of drawings seems to move.'
    },
    body: [
      'No movie, cartoon or video game actually moves. Every one is a series of still pictures shown very quickly, one after another. Your brain fills in the gaps and sees smooth motion. Animation is the art of using that trick on purpose.',
      { h: 'Spinning drums' },
      'In the 1830s, inventors created toys that showed this effect. The most famous was the <b>zoetrope</b>, an open drum with thin slits around its side. Inside, a paper strip held a series of drawings, such as a horse galloping, each one slightly different from the last. When you spun the drum and looked through the slits, you saw each picture for an instant. The slits acted like tiny shutters, so the pictures did not blur. The horse seemed to run.',
      { fig: [0, 1, 2, 3, 4].map(function (i) { var x = 18 + i * 56, lift = [0, 10, 18, 10, 0][i]; return '<rect class="k" x="' + x + '" y="20" width="48" height="74"/><circle class="k" cx="' + (x + 24) + '" cy="' + (60 - lift) + '" r="10"/><path class="t" d="M' + (x + 4) + ' 84 H' + (x + 44) + '"/>' +
            '<text class="n" x="' + (x + 24) + '" y="110" text-anchor="middle">' + (i + 1) + '</text>'; }).join('') +
          '<text class="l" x="150" y="134" text-anchor="middle">five frames of a ball bouncing</text>',
        tall: 140, cap: 'Each frame changes only a little. Shown quickly in order, the ball seems to bounce.' },
      { h: 'Frames per second' },
      'Each single picture in an animation is called a <b>frame</b>. Films are usually shown at 24 frames every second. Hand-drawn cartoons often use 12 different drawings each second, showing each one twice. That means a one-minute cartoon could need about 720 drawings. Animators plan the important poses first, called keyframes, then draw the in-between frames.',
      { box: 'Make your own', text: 'Draw a stick figure in the corner of each page of a notepad, moving it a tiny bit each time. Flip the pages quickly, and you have made a flipbook.' },
      { h: 'Canada’s animators' },
      'Canada has a famous history in animation. In 1941, the Scottish-born artist Norman McLaren joined the new National Film Board of Canada in Ottawa. He scratched and painted directly onto film, and he animated real actors one frame at a time, a technique called pixilation. His short film <i>Neighbours</i> won an Academy Award in 1953. Since then, NFB animators have won many international prizes, and Canadian studios today create cartoons and video game animation watched around the world. Many Canadian animators began just as you can: with a pencil, a stack of paper and the patience to change each drawing only a little. Today, computers can draw the in-between frames, but artists still decide every important pose, the timing of every movement and the feeling each character shows.'
    ],
    guide: { before: 'Make a two-page flipbook or use a phone’s burst photo mode to see frames. Teach <b>zoetrope</b> and <b>frame</b>.',
      after: 'Make a flipbook with at least 10 pages. What did you notice about how small each change needs to be?' },
    words: [['zoetrope', 'a spinning drum with slits that makes drawings seem to move'], ['frame', 'one single picture in an animation or film']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did the slits in a zoetrope matter?',
        opts: ['They acted like shutters so the pictures did not blur.', 'They let air in.', 'They held the paper.', 'They made a sound.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Look at the five frames. What changes from frame to frame?',
        opts: ['the height of the ball', 'the size of the box', 'the colour', 'the ground'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'A one-minute cartoon with 12 drawings per second needs about how many drawings?',
        opts: ['720', '60', '24', '1 440'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Keyframes</b> is made of two words. Which pair?',
        opts: ['key + frames', 'kef + rames', 'keyf + rames', 'key + fr + ames'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number these events in order.',
        items: ['Inventors create the zoetrope.', 'Norman McLaren joins the National Film Board.', 'Neighbours wins an Academy Award.', 'Canadian studios make video game animation.'], show: [1, 3, 0, 2] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain the trick that makes still pictures seem to move.',
        a: 'Pictures that change a little are shown quickly one after another, and your brain fills in the gaps, so you see smooth motion.', look: 'quick sequence and the brain filling in' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Did the diagram or the flipbook box help you understand frames more? Explain.',
        a: 'The diagram, because I could see how the ball moves a bit in each frame. Then I could imagine flipping through them.', look: 'a chosen feature and why it helped' },
      { k: 'lines', code: 'C3.7', n: 2, q: 'How did Norman McLaren’s work affect Canadian animation?',
        a: 'He won an Academy Award and helped make the NFB famous, so Canadian animators kept winning prizes.', look: 'his influence on Canada’s reputation in animation' }
    ]
  });

  P.add({
    id: 'g7-prosthetics', subject: 'science', form: 'Explanation',
    title: 'Engineering a New Limb',
    deck: 'How prosthetic legs and arms work, and how they keep getting better',
    hero: {
      photo: 'g7-running-blade.jpg', credit: 'Photo: Cpl. Chelsea Anderson, U.S. Marine Corps, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'An athlete with a prosthetic leg skips rope during training. Modern prostheses let people run, jump and play sports.'
    },
    body: [
      'People lose limbs for many reasons: an accident, an illness, or being born without part of an arm or leg. For thousands of years, people have made replacements, from carved wooden legs to iron hands. Today, a replacement limb, called a <b>prosthesis</b>, can let a person walk, run, swim, play an instrument or pick up an egg without breaking it.',
      { h: 'The parts of a leg' },
      'A prosthetic leg has several parts. The <b>socket</b> fits over the remaining part of the limb, called the residual limb. It must fit perfectly, because every step pushes the person’s weight through it. A poor fit can cause painful sores. Below the socket, a strong tube called a pylon does the job of the bone. For a person missing a leg above the knee, a mechanical knee joint bends and locks. At the bottom is the foot.',
      { fig: '<path class="k" d="M60 20 Q50 60 60 80 H100 Q110 60 100 20"/><rect class="h" x="54" y="70" width="52" height="34"/><rect class="k" x="74" y="104" width="12" height="44"/><path class="k" d="M66 148 H110 Q112 156 66 156 Z"/>' +
          '<path class="k" d="M200 20 Q190 60 200 80 H240 Q250 60 240 20"/><rect class="h" x="194" y="70" width="52" height="34"/><path class="a" d="M220 104 V124 Q220 150 250 150 Q270 150 270 140"/>' +
          D.label(130, 84, 'socket', 104, 86, 'start') + D.label(130, 128, 'pylon', 86, 126, 'start') + D.label(130, 152, 'foot', 108, 152, 'start') +
          '<text class="n" x="80" y="172" text-anchor="middle">walking leg</text><text class="n" x="232" y="172" text-anchor="middle">running blade</text>',
        tall: 178, cap: 'Two prosthetic legs below the knee. The running blade stores energy like a spring.' },
      { h: 'Springs and sensors' },
      'Running blades, made of layers of carbon fibre, have no heel at all. When the runner lands, the curved blade squashes and stores energy, then springs back and pushes the runner forward. New prosthetic arms can be controlled by the person’s own muscles. Sensors on the skin pick up tiny electrical signals when the person tightens a muscle, and a small motor opens or closes the hand. Some prosthetic knees and ankles have computer chips that adjust hundreds of times a second for stairs and slopes.',
      { box: 'Canada’s War Amps', text: 'After the First World War, Canadian veterans who had lost limbs formed The War Amps. Today its CHAMP program helps children who are missing limbs pay for artificial limbs and meet other kids like them.' },
      { h: 'Made to fit' },
      'Children outgrow a prosthesis every year or two, and high-tech limbs can cost tens of thousands of dollars. Engineers are now using 3D scanning and printing to make sockets that fit better and cost less. The goal is not only a limb that works, but one that lets each person do what matters to them. Terry Fox ran thousands of kilometres across Canada on a simple artificial leg in 1980. His run is still a reminder of what determination can do.'
    ],
    guide: { before: 'Teach <b>prosthesis</b> and <b>socket</b>. Ask what the child already knows about Terry Fox. Press on a ruler held over a table edge to feel how it springs back.',
      after: 'If you were an engineer, what would you improve about a prosthetic limb? Why?' },
    words: [['prosthesis', 'an artificial body part'], ['socket', 'the part of a prosthesis that fits over the residual limb']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why must the socket fit perfectly?',
        opts: ['Every step pushes the person’s weight through it, and a poor fit causes sores.', 'It looks better.', 'It holds the computer chip.', 'It is the most expensive part.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the running blade missing that the walking leg has?',
        opts: ['a heel and a separate foot', 'a socket', 'a curve', 'a top'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number how a muscle-controlled arm works.',
        items: ['The person tightens a muscle.', 'Sensors pick up a tiny electrical signal.', 'A small motor is switched on.', 'The hand opens or closes.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C3.1', half: true, q: 'The author says the blade works “like a spring.” What does this help you understand?',
        opts: ['It squashes, stores energy and pushes back.', 'It is made of metal coils.', 'It is used only in spring.', 'It is very soft.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What is a <b>residual limb</b>?',
        opts: ['the part of the limb that remains', 'a brand-new limb', 'a robot arm', 'the foot of a prosthesis'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why are 3D scanning and printing helpful for children who need a prosthesis?',
        a: 'Children outgrow a prosthesis every year or two, and 3D printing can make sockets that fit better and cost less, so new ones are easier to get.', look: 'growing children and lower cost or better fit' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The author says the goal is a limb that “lets each person do what matters to them.” What does this show about the author’s view of people with limb loss?',
        a: 'The author sees them as individuals with their own goals and abilities, not just as patients who need to be fixed.', look: 'respect for individual goals' },
      { k: 'lines', code: 'C2.1', n: 2, q: 'What did you already know about Terry Fox? How did it help you understand the last paragraph?',
        a: 'I knew he ran across Canada to raise money for cancer research. It helped me understand how much a simple artificial leg let him do.', look: 'prior knowledge linked to the text' }
    ]
  });

  P.add({
    id: 'g7-louisbourg', subject: 'history', form: 'Report',
    title: 'The Fortress by the Sea',
    deck: 'Louisbourg, the French stronghold on Cape Breton Island that was captured twice',
    hero: {
      photo: 'g7-louisbourg.jpg', credit: 'Photo: KenCLeBlanc, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The rebuilt Fortress of Louisbourg on Cape Breton Island, Nova Scotia. About a quarter of the town has been reconstructed.'
    },
    body: [
      'In 1713, France signed the Treaty of Utrecht and gave up most of Acadia and Newfoundland to Britain. But France kept Île Royale, now Cape Breton Island. There, on a foggy harbour facing the Atlantic, the French began building Louisbourg in 1719. It would become one of the busiest ports in North America and one of the strongest <b>fortifications</b> the French ever built in the Americas.',
      { fig: '<path class="t" d="M10 150 Q70 120 110 140 T200 120 T290 130"/>' + D.ripple(20, 280, 156, 't') +
          '<path class="k" d="M40 120 L60 40 L150 30 L240 46 L260 120"/><path class="h" d="M60 40 L48 30 L72 26 Z M150 30 L140 18 L162 18 Z M240 46 L230 34 L254 34 Z"/>' +
          D.label(196, 14, 'bastions', 160, 22) + '<text class="l" x="150" y="80" text-anchor="middle">town</text>' +
          '<text class="n" x="150" y="138" text-anchor="middle">harbour</text><text class="n" x="20" y="24">land side</text>',
        tall: 162, cap: 'A simplified plan. Pointed bastions let soldiers fire along the walls, but the land side could be attacked from nearby hills.' },
      { h: 'A town of fish and trade' },
      'Louisbourg grew rich from cod. The waters nearby were full of fish, which were dried on the beaches and shipped to France, the Caribbean and New England. Ships arrived with wine, cloth and tools, and sometimes with enslaved Africans brought from the Caribbean. Several thousand people lived inside and around the walls: soldiers, fishers, merchants, craftspeople and their families. The Mi’kmaq, whose homeland this was, were allies and trading partners of the French.',
      { h: 'Captured twice' },
      'Louisbourg looked strong, but it had weaknesses. Hills overlooked parts of the walls, and the fortress depended on ships for food. In 1745, an army of New England colonists, with help from the British navy, laid <b>siege</b> to the town. After seven weeks of bombardment, Louisbourg surrendered. To the colonists’ anger, Britain gave it back to France in a peace treaty three years later.',
      { box: 'The final siege', text: 'In 1758, a much larger British force captured Louisbourg again. A year later, British engineers blew up the walls so the fortress could never be used against them.' },
      { h: 'Rebuilt' },
      'For two hundred years, the ruins sat in the grass. In the 1960s, the government of Canada began rebuilding part of the town, partly to create work for coal miners who had lost their jobs. Archaeologists dug up millions of objects, and historians studied old French plans. Today, in summer, interpreters in costume bake bread, fire muskets and show visitors what life was like in 1744. It is one of the largest historical reconstructions in North America.'
    ],
    guide: { before: 'Find Cape Breton Island on a map and point out how close it is to the Atlantic shipping routes. Teach <b>fortifications</b> and <b>siege</b>.',
      after: 'Why do you think people spend so much effort rebuilding places from the past?' },
    words: [['fortifications', 'walls and defences built to protect a place'], ['siege', 'surrounding a place and attacking it to force it to give up']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did France build Louisbourg on Île Royale?',
        opts: ['France had kept the island after giving up most of Acadia and Newfoundland.', 'It was the warmest place in Canada.', 'The British asked them to.', 'There were gold mines.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the plan, why was the land side a weakness?',
        opts: ['It could be attacked from nearby hills.', 'It had no walls.', 'It was underwater.', 'It had too many bastions.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were the New England colonists angry in 1748?',
        opts: ['Britain gave Louisbourg back to France.', 'They lost the siege.', 'The fish were gone.', 'They had to rebuild it.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Reconstruction</b> has the prefix <b>re-</b>. What does it mean here?',
        opts: ['again', 'not', 'before', 'under'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Which groups lived in or traded with Louisbourg? Why is it important that the report names all of them?',
        a: 'French soldiers, fishers, merchants and families, enslaved Africans and the Mi’kmaq. Naming them shows a fuller, more honest picture of who lived there.', look: 'several groups and the value of including them' },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How has the meaning of Louisbourg changed from 1745 to today?',
        a: 'It was once a fortress for war and trade. Today it is a reconstructed historic site where visitors learn about the past.', look: 'its past purpose and its present one' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the history of Louisbourg in three sentences.',
        a: 'France built it in 1719 as a fishing port and fortress. It was captured in 1745, returned, and captured again in 1758, then destroyed. In the 1960s, Canada rebuilt part of it as a historic site.', look: 'building, captures and rebuilding' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence uses a dependent clause beginning with <b>whose</b>?',
        opts: ['The Mi’kmaq, whose homeland this was, were allies and trading partners of the French.', 'Louisbourg grew rich from cod.', 'For two hundred years, the ruins sat in the grass.', 'Louisbourg looked strong, but it had weaknesses.'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-permafrost', subject: 'geography', form: 'Report',
    title: 'When Frozen Ground Thaws',
    deck: 'How warming is changing the permafrost under Canada’s North',
    hero: {
      photo: 'g7-permafrost.jpg', credit: 'Photo: Boris Radosavljevic, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Thawing permafrost on Herschel Island, Yukon. As the ice in the ground melts, the land slumps and slides into the sea.'
    },
    body: [
      'In much of northern Canada, if you dig down a little way, even in July, you hit ground that is frozen as hard as concrete. This is <b>permafrost</b>, ground that stays at or below 0 °C for at least two years in a row. Some of it has been frozen for thousands of years. Permafrost lies under roughly half of Canada’s land, from Yukon and the Northwest Territories to Nunavut and the far north of Quebec, Ontario and the Prairie provinces.',
      { fig: '<rect class="t" x="20" y="40" width="260" height="22"/><rect class="h" x="20" y="62" width="260" height="88"/>' +
          '<path class="a" d="M40 40 v-12 M44 40 v-16 M100 40 v-10 M210 40 v-14 M214 40 v-10"/>' +
          '<text class="l" x="150" y="55" text-anchor="middle">active layer: thaws each summer</text>' +
          '<text class="l" x="150" y="108" text-anchor="middle">permafrost: frozen all year</text>' +
          D.arrow(290, 40, 290, 70, 'a') + '<text class="n" x="286" y="86" text-anchor="end">warming</text>' +
          '<text class="n" x="150" y="166" text-anchor="middle">as the climate warms, the active layer gets deeper</text>',
        tall: 172, cap: 'The active layer sits on top of the permafrost. Warmer summers thaw deeper into the frozen ground.' },
      { h: 'Layers of ground' },
      'Above the permafrost is a thin <b>active layer</b> that thaws each summer and freezes again each winter. Plants grow in it, and in summer it can be soft and soggy, because the frozen ground below stops water from draining away. The permafrost itself is a mix of soil, rock and ice. In some places, the ground is more ice than soil. Scientists drill holes and lower thermometers deep into the ground to measure how warm the permafrost is, year after year. Their records show it is warming in many places across the North.',
      { h: 'A foundation that moves' },
      'Northern buildings, roads and airstrips are built on permafrost, and they depend on it staying frozen. Canada’s North is warming about three times faster than the world as a whole. As the active layer deepens, ice in the ground melts, and the land sinks unevenly. Houses tilt, roads buckle and pipelines can bend. In some places, whole hillsides slump, as on Herschel Island.',
      { box: 'Building on ice', text: 'Many northern buildings stand on steel posts drilled deep into the permafrost, with an air gap underneath, so the heat from the building cannot melt the ground.' },
      { h: 'A global problem' },
      'Permafrost holds the frozen remains of plants that lived long ago. When it thaws, microbes break this material down and release carbon dioxide and methane, greenhouse gases that cause more warming, which thaws more permafrost. Scientists call this a <b>feedback loop</b>. Northern communities, including many Inuit, Dene and Gwich’in, are working with scientists to measure the changes, adapt their buildings and protect the land they depend on for travel, hunting and food.'
    ],
    guide: { before: 'Freeze a tray of wet soil, then let the top thaw while the bottom stays frozen. Teach <b>permafrost</b>, <b>active layer</b> and <b>feedback loop</b>. Find Herschel Island on a map.',
      after: 'How would life in your community change if the ground under it started to sink?' },
    words: [['permafrost', 'ground that stays frozen for at least two years in a row'], ['active layer', 'the top layer of ground that thaws in summer'], ['feedback loop', 'a chain where a result causes more of its own cause']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why is the active layer soggy in summer?',
        opts: ['The frozen ground below stops water from draining away.', 'It rains every day.', 'Snow falls on it.', 'The plants make water.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the arrow in the diagram show?',
        opts: ['Warming makes the active layer reach deeper.', 'Water flows uphill.', 'Plants grow downward.', 'The permafrost gets thicker.'], a: 0 },
      { k: 'order', code: 'C1.5', q: 'Number the steps of the permafrost feedback loop.',
        items: ['The climate warms.', 'Permafrost thaws.', 'Microbes release carbon dioxide and methane.', 'These gases cause more warming.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do some northern buildings stand on posts with an air gap?',
        opts: ['so the building’s heat cannot melt the ground', 'to keep out animals', 'to see the view', 'to store snow'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Roads <b>buckle</b> when permafrost thaws. What does <b>buckle</b> mean here?',
        opts: ['bend and crack out of shape', 'fasten', 'get longer', 'freeze'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why is thawing permafrost a problem for the whole world, not only for the North?',
        a: 'Thawing releases carbon dioxide and methane, which add to global warming everywhere and cause even more thawing.', look: 'greenhouse gases and the worldwide effect' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose knowledge and work does the report mention in the last sentence? Why does it matter?',
        a: 'Inuit, Dene and Gwich’in communities working with scientists. They know the land well and depend on it, so their knowledge helps measure and respond to the changes.', look: 'the communities named and why their role matters' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The idea of a feedback loop can be confusing. What did you do to check your understanding?',
        a: 'I drew the steps in a circle with arrows and saw that the last step leads back to the first.', look: 'a monitoring strategy and how it helped' }
    ]
  });

  P.add({
    id: 'g7-upper-canada-letter', subject: 'story', form: 'Letter', plain: true,
    title: 'A Letter from the Bush',
    deck: 'An invented letter from a girl in Upper Canada to her grandmother in Scotland, 1834',
    hero: {
      photo: 'g7-log-house.jpg', credit: 'Photo: Adam Bishop, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A log house at Fanshawe Pioneer Village in London, Ontario, like those built by settlers in the 1830s.'
    },
    body: [
      '<i>Near Peterborough, Upper Canada<br>the 2nd of October, 1834</i>',
      'Dearest Grandmother,',
      'We are alive and well, though it has been a long road since Greenock. The crossing took seven weeks. Wee Tam was sick nearly the whole way, and two passengers died of fever, but God spared us. From Montréal we went by bateau up the river, then by wagon over roads that are mostly stumps and mud. Father says the word “road” here is a kind of joke.',
      { h: 'Our new home' },
      'Our land is one hundred acres, and when we arrived it was all trees, bigger than any in Scotland. You cannot imagine the size of them. Father and Uncle Rab cut a small <b>clearing</b> and built a shanty of logs, with a bark roof that leaks when it rains. In August our neighbours came to help raise a proper log house. They call it a <b>bee</b>. There were twenty men and boys, and the women cooked from dawn to dark. I carried water until my arms ached. By nightfall the walls were up, and there was fiddle music and dancing.',
      { h: 'New neighbours' },
      'There are Mississauga families who camp by the lake in summer. A woman came to our door with fish and maple sugar, and Mother gave her a wool shawl. We cannot speak to one another, but she showed me how to set a snare for rabbits. I have learned to say <i>miigwech</i>, which means thank you. Father says this was all their country before ours, and I think about that often.',
      { fig: '<rect class="k" x="20" y="20" width="260" height="130"/>' +
          '<rect class="h" x="40" y="40" width="70" height="50"/><text class="n" x="75" y="104" text-anchor="middle">clearing</text>' +
          '<rect class="k" x="64" y="56" width="22" height="16"/><text class="n" x="75" y="34" text-anchor="middle">log house</text>' +
          [130, 160, 190, 220, 250, 140, 175, 210, 245, 60, 95, 125].map(function (x, i) { return D.spruce(x, i < 5 ? 70 : i < 9 ? 112 : 140, 18); }).join('') +
          '<text class="l" x="200" y="48" text-anchor="middle">forest still to clear</text><text class="n" x="150" y="166" text-anchor="middle">one hundred acres</text>',
        tall: 172, cap: 'The narrator’s sketch of the family’s land after the first summer.' },
      { box: 'Reading a letter from the past', text: 'This letter is invented, but it is based on real settlers’ letters and diaries. As you read, notice what the writer worries about, what she is proud of, and what she does not fully understand.' },
      'The winter is coming, and they say it is colder than anything in Scotland. Please send wool, and a little tea if you can. I miss you every day, and I miss the sea. Mother says that in a few years we will have fields of wheat where the trees stand now, and a real house with glass windows. I hope she is right.',
      'Your loving granddaughter,<br>Isobel'
    ],
    guide: { before: 'Find Scotland and Peterborough, Ontario, on a map. Teach <b>clearing</b> and <b>bee</b>. Explain that Upper Canada is now Ontario, and that the Mississauga are an Anishinaabe nation.',
      after: 'Isobel writes that “this was all their country before ours.” What questions would you ask her about that?' },
    words: [['clearing', 'an area of land where the trees have been cut down'], ['bee', 'a gathering where neighbours work together on a big job']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is a letter?',
        opts: ['It has a place, a date, a greeting and a closing.', 'It has headings and a glossary.', 'It rhymes.', 'It has numbered steps.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the sketch show about the family’s land?',
        opts: ['Only a small part has been cleared.', 'All the land is cleared.', 'It is beside the sea.', 'It has many houses.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Father says the word “road” is “a kind of joke.” What does he mean?',
        opts: ['The roads are so bad they hardly deserve the name.', 'The roads are funny to look at.', 'There are no roads at all.', 'He is telling a riddle.'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'From whose point of view is the letter written?',
        opts: ['Isobel, a settler girl, in the first person', 'the Mississauga woman', 'Grandmother', 'an outside narrator'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What hardships did Isobel’s family face? Give three.',
        a: 'A long sick voyage, terrible roads, a leaking shanty, hard work clearing trees, and a cold winter coming.', look: 'three hardships from the letter' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How might the Mississauga woman describe the same events? Think about her point of view.',
        a: 'She might say new families were cutting down the forest where her people had always lived and camped, but that she tried to be kind and helpful to them.', look: 'a perspective that reflects the Mississauga experience' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Isobel misses the sea and her grandmother. Have you ever moved or been far from someone you love? Connect your experience to hers.',
        a: 'When I moved schools I missed my friends. Like Isobel, I felt excited about new things but also homesick.', look: 'a personal connection to her feelings' },
      { k: 'choice', code: 'B3.3', q: 'Why is <i>miigwech</i> written in italics?',
        opts: ['It is a word from another language.', 'It is the title of a book.', 'Someone is shouting it.', 'It is spelled wrong.'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-microplastics', subject: 'science', form: 'Report',
    title: 'Plastic You Cannot See',
    deck: 'Where microplastics come from, and why scientists are finding them everywhere',
    hero: {
      photo: 'g7-microplastic.jpg', credit: 'Photo: OceanBlueProject, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Tiny pieces of plastic collected from a beach. Many are smaller than a grain of rice.'
    },
    body: [
      'Plastic is strong, cheap and long-lasting. Those are the very reasons it causes trouble once it is thrown away. Plastic does not rot like wood or paper. Instead, sunlight, waves and wear break it into smaller and smaller pieces. Pieces smaller than 5 mm are called <b>microplastics</b>. Scientists have found them in the Arctic snow, at the bottom of the deepest ocean trenches, in the Great Lakes, in fish and in drinking water. A single plastic bottle can break into millions of pieces over many years. Because plastic is so light, wind and water carry these pieces thousands of kilometres from where they started.',
      { fig: [['bottle', 60], ['pieces', 30], ['fragments', 14], ['microplastic', 5]].map(function (r, i) {
            var x = 30 + i * 74; return '<rect class="h" x="' + (x - r[1] / 2 + 20) + '" y="' + (90 - r[1]) + '" width="' + r[1] + '" height="' + r[1] + '"/>' +
              '<text class="n" x="' + (x + 20) + '" y="110" text-anchor="middle">' + r[0] + '</text>' + (i < 3 ? D.arrow(x + 50, 76, x + 80, 76, 'a') : ''); }).join('') +
          '<text class="l" x="150" y="140" text-anchor="middle">sun, waves and wear break plastic into smaller pieces</text>',
        tall: 148, cap: 'Plastic does not disappear. It breaks into smaller and smaller pieces.' },
      { h: 'Where they come from' },
      'Some microplastics were made small on purpose. Until a few years ago, many face scrubs and toothpastes contained tiny plastic beads that washed down the drain. Canada banned microbeads in these products in 2018. Most microplastics, though, come from bigger things breaking apart: bottles, bags, food wrappers, car tires and fishing nets. One surprising source is your laundry. Clothes made of polyester, nylon and fleece shed thousands of tiny <b>synthetic fibres</b> every time they are washed.',
      { h: 'Why it matters' },
      'Tiny animals at the bottom of the food chain, such as plankton and small fish, can mistake microplastics for food. Bigger fish eat the smaller ones, and the plastic moves up the food chain. Microplastics can also carry harmful chemicals that stick to their surfaces. Scientists are still studying what microplastics do inside the human body. What is clear is that they are now part of almost every environment on Earth.',
      { box: 'A filter for your laundry', text: 'Some washing machines and add-on filters can trap many of the fibres before they go down the drain. Washing clothes in cold water and less often also helps.' },
      { h: 'What can be done' },
      'Because microplastics are so small and so widespread, cleaning them up is almost impossible. The best solution is to stop plastic from becoming waste in the first place. Canada has banned some single-use plastics, such as checkout bags and straws. People can choose reusable bottles and bags, pick natural fabrics such as cotton or wool, and join shoreline cleanups to catch plastic before it breaks down.'
    ],
    guide: { before: 'Look at the labels on a few pieces of clothing to see which are made of plastic fibres. Teach <b>microplastics</b> and <b>synthetic fibres</b>.',
      after: 'Which plastic item does your family use most? What could replace it?' },
    words: [['microplastics', 'pieces of plastic smaller than 5 mm'], ['synthetic fibres', 'threads made by people, often from plastic']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why does plastic break into smaller pieces instead of rotting?',
        opts: ['It does not rot; sunlight, waves and wear break it apart.', 'Microbes eat it quickly.', 'It melts in water.', 'It turns into sand.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['a bottle breaking into smaller and smaller pieces', 'how a bottle is made', 'how fish eat plastic', 'a washing machine'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How does plastic move up the food chain?',
        opts: ['Small animals eat it, then bigger fish eat them.', 'It floats upward.', 'People feed it to fish.', 'Birds carry it.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Micro-</b> in <b>microplastics</b> means “very small.” Which word also uses this prefix?',
        opts: ['microscope', 'mirror', 'middle', 'minute'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why does the author say the best solution is to stop plastic from becoming waste?',
        a: 'Microplastics are so small and widespread that cleaning them up is almost impossible, so preventing waste is the only practical way.', look: 'the difficulty of cleanup and prevention' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Name two things in your home that could add microplastics to the environment. Explain how.',
        a: 'My fleece jacket sheds fibres in the wash. Plastic bags can break into pieces if they end up outside.', look: 'two realistic sources with how' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Scientists are “still studying” what microplastics do in the human body. Should we act now or wait for more research? Explain.',
        a: 'Act now, because microplastics are already everywhere and hard to remove. Waiting would let even more build up.', look: 'a position with a reason' },
      { k: 'choice', code: 'C1.1', q: '“Those are the very reasons it causes trouble.” What does <b>Those</b> refer to?',
        opts: ['plastic being strong, cheap and long-lasting', 'waves and sunlight', 'wood and paper', 'the Great Lakes'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-white-nose', subject: 'science', form: 'Report',
    title: 'Silent Caves',
    deck: 'A fungus that is killing Canada’s bats, and the scientists trying to stop it',
    hero: {
      photo: 'g7-brown-bat.jpg', credit: 'Photo: U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A little brown bat. One of these bats can eat thousands of insects in a summer night.'
    },
    body: [
      'Every fall, millions of bats across eastern Canada fly into caves and old mines to <b>hibernate</b>. They hang in the cool, damp darkness all winter, their heartbeats slowing from hundreds of beats a minute to just a few. Their bodies burn stored fat very slowly, and they live on it until spring. But since 2006, many of those caves have gone silent.',
      { h: 'A white fungus' },
      'That year, cavers in New York State found dead bats with a strange white fuzz on their noses and wings. It was a <b>fungus</b> that grows best in cold, damp places like caves. Scientists named the disease white-nose syndrome. The fungus probably arrived from Europe, perhaps on the boots or gear of a visitor. European bats have lived with it for a long time, but North American bats had no defence. By 2010, it had spread to caves in Ontario and Quebec.',
      { fig: '<path class="k" d="M20 130 H280"/>' +
          [['normal winter', [12, 14, 12, 14, 12, 14, 12, 14]], ['with the fungus', [12, 50, 12, 50, 12, 50, 12, 50]]].map(function (r, i) { var y = 60 + i * 60, d = 'M110 ' + y; r[1].forEach(function (h, j) { d += ' L' + (132 + j * 22) + ' ' + (y - h + 12); }); return '<path class="' + (i ? 'a' : 't') + '" d="' + d + '"/><text class="n" x="20" y="' + (y + 4) + '">' + r[0] + '</text>'; }).join('') +
          '<text class="n" x="150" y="146" text-anchor="middle">each spike is a time the bat wakes up and burns fat</text>',
        tall: 154, cap: 'A simplified view of how often a hibernating bat wakes up. Bats with the fungus wake far more often.' },
      { h: 'Why bats die' },
      'The fungus irritates the bats’ skin and wakes them up again and again during winter. Each time a bat wakes, its body warms up, and it burns a large amount of its stored fat. Some bats fly out into the snow searching for insects that are not there. By late winter, many have used up all their fat and starve. In some caves, more than 90% of the bats have died.',
      { box: 'Endangered', text: 'In 2014, the little brown bat and two other bat species were listed as endangered in Canada because of white-nose syndrome.' },
      { h: 'Fighting back' },
      'Losing bats matters. Bats eat huge numbers of insects, including mosquitoes and pests that damage farm crops and forests. To slow the disease, many caves are closed to visitors, and cavers must clean their boots and gear. Scientists are testing treatments, such as harmless bacteria and ultraviolet light, that might weaken the fungus. In a few places, some bats seem to be surviving, giving hope that populations could slowly recover. You can help by never disturbing bats in winter, and by putting up a bat box in summer. Scientists also ask people to report bats seen flying in winter, because that can be an early sign that the fungus has reached a new cave. Every report helps them track where the disease is spreading.'
    ],
    guide: { before: 'Teach <b>hibernate</b> and <b>fungus</b>. Ask what the child already knows about bats. Find Ontario and Quebec and New York State on a map.',
      after: 'Why do you think people often care less about bats than about cuter animals? Should that change?' },
    words: [['hibernate', 'to spend the winter in a deep sleep with a slowed body'], ['fungus', 'a living thing, such as a mould or mushroom, that feeds on other material']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps that lead to a bat dying of white-nose syndrome.',
        items: ['The fungus grows on the bat’s skin.', 'The bat keeps waking up.', 'Each time, it burns a lot of fat.', 'It runs out of fat and starves.'], show: [3, 0, 2, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the graph show?',
        opts: ['Bats with the fungus wake up much more often.', 'Bats sleep more with the fungus.', 'Bats eat more in winter.', 'The fungus grows in summer.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were North American bats hit so hard?',
        opts: ['They had no defence against a fungus new to them.', 'They were already sick.', 'There were too few caves.', 'They do not hibernate.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the author describe caves as having “gone silent”?',
        opts: ['to show that so many bats have died', 'because caves are quiet', 'because people stopped visiting', 'to describe the fungus'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The fungus <b>irritates</b> the bats’ skin. What does <b>irritates</b> mean?',
        opts: ['bothers or makes sore', 'heals', 'cleans', 'warms'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why should people who do not like bats still care about this disease?',
        a: 'Bats eat huge numbers of insects, including mosquitoes and crop pests. Without them, there could be more pests harming forests and farms.', look: 'bats’ role in controlling insects' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict what might happen to the bat population in the next 20 years. Use evidence.',
        a: 'Some bats seem to be surviving and treatments are being tested, so populations might slowly recover, but it will take a long time because so many died.', look: 'a prediction tied to evidence from the last section' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'List three things people are doing to fight white-nose syndrome.',
        a: 'Closing caves, cleaning boots and gear, and testing treatments like harmless bacteria and ultraviolet light.', look: 'three actions from the text' }
    ]
  });

  P.add({
    id: 'g7-arches', subject: 'tech', form: 'Explanation',
    title: 'The Strength of an Arch',
    deck: 'Why a curve of stones can stand for two thousand years',
    hero: {
      photo: 'g7-stone-arch.jpg', credit: 'Photo: Christian Ferrer, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An old stone arch bridge. No glue or steel holds the stones together. The shape does the work.'
    },
    body: [
      'Some Roman bridges built two thousand years ago are still standing, and people still walk across them. They have no steel beams and, in many cases, no mortar holding the stones together. Their secret is a simple shape: the <b>arch</b>. Understanding how it works means understanding two forces that act on every structure.',
      { h: 'Pushing and pulling' },
      'A force that squeezes or pushes something together is called <b>compression</b>. A force that pulls or stretches something apart is called <b>tension</b>. Stone is very strong in compression. You can stack enormous weight on top of a stone block without crushing it. But stone is weak in tension, so a long, flat stone beam will crack across its bottom if you put weight in the middle.',
      { fig: '<path class="k" d="M30 150 V100 Q150 -20 270 100 V150"/><path class="k" d="M60 150 V104 Q150 20 240 104 V150"/>' +
          [[62, 96], [84, 70], [112, 52], [150, 44], [188, 52], [216, 70], [238, 96]].map(function (p, i) { return '<path class="t" d="M' + p[0] + ' ' + p[1] + ' l' + (i < 3 ? -14 : i > 3 ? 14 : 0) + ' -14"/>'; }).join('') +
          '<rect class="h" x="138" y="30" width="24" height="22"/>' + D.label(196, 18, 'keystone', 156, 32) +
          D.arrow(150, 2, 150, 28, 'a') + D.arrow(36, 120, 14, 140, 'a') + D.arrow(264, 120, 286, 140, 'a') +
          '<text class="n" x="150" y="166" text-anchor="middle">weight is pushed around the curve and down into the ground</text>',
        tall: 172, cap: 'In an arch, each stone presses against its neighbours. The weight travels around the curve and down to the ends.' },
      { h: 'How an arch spreads the load' },
      'An arch turns the weight above it into compression. When a load presses down on the top, each wedge-shaped stone pushes against the stones beside it. The force travels around the curve, from stone to stone, and down into the ground at both ends. Every stone is squeezed, and none is stretched, so the stone stays strong. The wedge at the very top, called the <b>keystone</b>, locks the others in place.',
      { box: 'Building in the air', text: 'An arch cannot stand until the keystone is in. Builders first make a wooden frame in the shape of the arch, lay the stones on it, then remove the frame once the keystone is set.' },
      { h: 'Arches everywhere' },
      'Arches also push outward at their ends, so they need strong supports, such as solid rock or heavy walls, to keep from spreading apart. Builders have used arches in bridges, doorways, cathedral windows and tunnels for thousands of years. Modern engineers build arches from steel and concrete, such as the Rainbow Bridge over the Niagara River, which crosses the gorge in a single steel arch. You can see arch shapes in the curved tops of dams, in domes and even in the shape of an eggshell, which is surprisingly hard to crush when you squeeze it from end to end.'
    ],
    guide: { before: 'Make an arch from a strip of cardboard between two books and test how many coins it holds compared with a flat strip. Teach <b>compression</b>, <b>tension</b> and <b>keystone</b>.',
      after: 'Find three arches in your neighbourhood or home. What does each one hold up?' },
    words: [['compression', 'a force that squeezes or pushes together'], ['tension', 'a force that pulls or stretches apart'], ['keystone', 'the wedge-shaped stone at the top of an arch that locks it']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why is stone good for building arches?',
        opts: ['It is very strong in compression.', 'It is strong in tension.', 'It is light.', 'It bends easily.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, where does the weight go?',
        opts: ['around the curve and down into the ground', 'straight through the keystone into the air', 'into the middle stone only', 'up into the sky'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Compare the two forces.', cols: ['Force', 'What it does', 'Is stone strong against it?'],
        rows: [['compression', null, null], ['tension', null, null]],
        a: [[null, 'squeezes or pushes together', 'yes'], [null, 'pulls or stretches apart', 'no']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do arches need strong supports at their ends?',
        opts: ['Arches push outward at their ends.', 'The keystone is heavy.', 'They are made of steel.', 'They are very tall.'], a: 0 },
      { k: 'choice', code: 'C2.4', half: true, q: 'If the paragraph “How an arch spreads the load” is confusing, which strategy would help most?',
        opts: ['Reread it while tracing the arrows in the diagram.', 'Skip to the end.', 'Read only the box.', 'Count the words.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why would a flat stone beam crack but a stone arch would not?',
        a: 'A flat beam is stretched on its bottom when weight presses the middle, and stone is weak in tension. In an arch every stone is squeezed, and stone is strong in compression.', look: 'tension in the beam versus compression in the arch' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Describe an arch you have seen. What do you think it was holding up?',
        a: 'The doorway at our church is an arch. It holds up the heavy stone wall above the door.', look: 'a real arch and its load' },
      { k: 'choice', code: 'B3.2', q: '“You can stack enormous weight on top of a stone block without crushing it.” Which word is an adjective?',
        opts: ['enormous', 'stack', 'without', 'crushing'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-shanawdithit', subject: 'history', form: 'Biography',
    title: 'Shanawdithit’s Drawings',
    deck: 'The life of a Beothuk woman whose pictures and words preserved her people’s story',
    hero: {
      photo: 'g7-nl-coast.jpg', credit: 'Photo: Michel Rathwell, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The coast of Newfoundland, homeland of the Beothuk for hundreds of years before Europeans arrived.'
    },
    body: [
      'For centuries, the Beothuk lived on the island now called Newfoundland. In summer they travelled to the coast to fish, hunt seals and gather eggs. In fall, they moved inland to the rivers, where they hunted caribou. They travelled in birchbark canoes with high, curved sides and covered their bodies and belongings with red <b>ochre</b>, a red earth paint. This custom may be why Europeans called Indigenous peoples “Red Indians,” a name now considered offensive.',
      { fig: '<path class="k" d="M40 140 Q20 100 40 60 Q60 20 120 20 Q180 16 230 40 Q280 70 260 120 Q240 150 180 150 Q110 160 40 140 Z"/>' +
          '<path class="t" d="M60 60 Q100 90 150 80 Q200 70 230 100"/><text class="n" x="150" y="100" text-anchor="middle">Exploits River</text>' +
          '<path class="d" d="M40 60 Q30 100 40 140 M230 40 Q270 70 260 120"/><text class="l" x="20" y="22">coast</text>' +
          '<circle class="dot" cx="150" cy="66" r="4"/><text class="n" x="150" y="56" text-anchor="middle">Red Indian Lake</text>' +
          D.arrow(70, 130, 110, 110, 'a') + '<text class="n" x="74" y="150">pushed inland</text>',
        tall: 162, cap: 'A simplified sketch of Newfoundland. As settlers took the coast, the Beothuk moved inland along rivers and lakes. Not a map.' },
      { h: 'Pushed from the coast' },
      'When European fishers and settlers arrived, they built along the coast and rivers where the Beothuk had always found food. The Beothuk avoided contact and were driven inland, where food was harder to find. There was violence between settlers and Beothuk, and settlers often went unpunished for killing them. Diseases such as tuberculosis, brought by Europeans, spread through their camps. Over many years, the Beothuk population fell sharply.',
      { h: 'A young woman alone' },
      'Shanawdithit was born around 1801. In 1823, starving and sick, she, her mother and her sister were taken by settlers. Her mother and sister soon died. Shanawdithit lived for several years as a servant in a settler family’s home. In 1828 she was brought to St. John’s, where a man named William Cormack, who was trying to learn about the Beothuk, asked her about her people.',
      { box: 'Her record', text: 'Shanawdithit made drawings of Beothuk camps, canoes, tools and food, and of events she had lived through. She also shared Beothuk words. Her pictures are among the only first-hand records of Beothuk life.' },
      { h: 'Remembering' },
      'Shanawdithit died of tuberculosis in 1829. She is often described as the last known Beothuk. Today, historians and Indigenous communities in Newfoundland and Labrador work to honour the Beothuk and to tell their story truthfully, including the injustice they suffered. In 2020, the remains of two Beothuk people, taken to Scotland in the 1800s, were returned home to Newfoundland. Shanawdithit’s drawings remind us that every people’s history deserves to be <b>preserved</b>, and that it matters who gets to tell it.'
    ],
    guide: { before: 'Find Newfoundland, the Exploits River and St. John’s on a map. Teach <b>preserved</b>. Explain that this is a sad story and that it is fine to feel upset by it.',
      after: 'How can we make sure the histories of Indigenous peoples are told truthfully and respectfully?' },
    words: [['ochre', 'a natural earth used as red or yellow paint'], ['preserved', 'kept safe so it is not lost']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did the Beothuk find it harder to get food over time?',
        opts: ['Settlers took the coast and rivers where they found food.', 'The caribou disappeared.', 'They stopped fishing by choice.', 'The rivers froze forever.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the sketch show?',
        opts: ['the Beothuk being pushed inland from the coast', 'the route of a ship', 'where Cormack lived', 'the shape of a canoe'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The name “Red Indians” is now considered <b>offensive</b>. What does <b>offensive</b> mean?',
        opts: ['hurtful or disrespectful', 'old-fashioned but fine', 'used in sports', 'very accurate'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is a biography?',
        opts: ['It tells the life of a real person in order.', 'It gives instructions.', 'It is a poem.', 'It is a made-up story.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why are Shanawdithit’s drawings so important to historians today?',
        a: 'They are among the only first-hand records of Beothuk life, showing camps, canoes, tools, food and events she lived through.', look: 'first-hand record of Beothuk life' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Most early records about the Beothuk were written by settlers. Why does it matter that Shanawdithit’s own drawings exist?',
        a: 'They show the Beothuk way of life from a Beothuk point of view, not only through the eyes of the settlers who harmed them.', look: 'an insider perspective versus settler records' },
      { k: 'lines', code: 'C3.7', n: 3, q: 'What does the return of Beothuk remains in 2020 show about how people today view this history?',
        a: 'It shows that people now see the past injustice and want to treat the Beothuk with respect by bringing their ancestors home.', look: 'respect and correcting past wrongs' },
      { k: 'choice', code: 'B3.3', q: 'Why is “Red Indians” in quotation marks?',
        opts: ['It is a name others used, not the author’s own words.', 'Someone is shouting.', 'It is a book title.', 'It is a question.'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-wildfire-smoke', subject: 'health', form: 'Explanation',
    title: 'When the Sky Turns Orange',
    deck: 'What wildfire smoke does to your body, and how to protect yourself',
    hero: {
      photo: 'g7-smoke-haze.jpg', credit: 'Photo: Rod Raglin, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Wildfire smoke hangs over Vancouver in 2021. Smoke can travel thousands of kilometres from the fires.'
    },
    body: [
      'In the summer of 2023, Canada had its worst wildfire season on record. Fires burned in almost every province and territory. Smoke drifted over cities from Yellowknife to Montréal and as far as New York and Europe. In some places, the sun glowed like a red coin and the sky turned orange at noon. Even people hundreds of kilometres from any flames were breathing smoke.',
      { h: 'What is in smoke?' },
      'Wildfire smoke is a mix of gases and tiny particles from burning trees, plants and buildings. The most harmful part is <b>fine particulate matter</b>, often called PM2.5. These particles are less than 2.5 micrometres across, about thirty times thinner than a human hair. They are so small that they slip past the nose and throat and travel deep into the lungs. Some even pass into the bloodstream.',
      { fig: [['hair', 70, '70'], ['dust', 25, '25'], ['PM2.5', 2.5, '2.5']].map(function (r, i) { var x = 60 + i * 90; return '<circle class="' + (i === 2 ? 'a' : 'h') + '" cx="' + x + '" cy="62" r="' + (r[1] / 2) + '"/><text class="lb" x="' + x + '" y="118" text-anchor="middle">' + r[0] + '</text><text class="n" x="' + x + '" y="136" text-anchor="middle">' + r[2] + ' micrometres</text>'; }).join('') +
          D.label(290, 22, 'smoke particle', 240, 62, 'end'),
        tall: 144, cap: 'The width of a human hair, a speck of dust and a fine smoke particle. PM2.5 is small enough to reach deep into the lungs.' },
      { h: 'Effects on the body' },
      'Smoke can make your eyes sting, your throat scratchy and your head ache. It can cause coughing and make breathing feel hard. People with asthma, heart problems, babies, older adults and pregnant people are most at risk, but anyone can be affected, especially when exercising outdoors and breathing deeply.',
      { box: 'Check the number', text: 'Environment Canada’s Air Quality Health Index, or AQHI, rates air from 1 to 10+. A rating of 7 or more means high risk: cut back on outdoor activity.' },
      { h: 'Protecting yourself' },
      'On smoky days, the best place to be is indoors with windows and doors closed. A portable air cleaner with a HEPA <b>filter</b> traps fine particles. Some families build their own by taping a furnace filter to a box fan. If you must go outside, a well-fitted N95 mask blocks most particles, while cloth masks block very few. Plan indoor activities instead of sports, drink plenty of water, and check on neighbours who may be at risk. Scientists expect smoky summers to become more common as the climate warms, so knowing these steps is becoming a life skill. When the air clears, open the windows to let fresh air back in.'
    ],
    guide: { before: 'Look up today’s AQHI for your area together. Teach <b>fine particulate matter</b> and <b>filter</b>. Ask if the child remembers a smoky day.',
      after: 'Make a smoky-day plan for your home: where to stay, what to do, and who to check on.' },
    words: [['fine particulate matter', 'tiny bits of solid or liquid in the air, small enough to breathe deep into the lungs'], ['filter', 'a material that traps particles while letting air or water through']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why is PM2.5 especially harmful?',
        opts: ['It is small enough to get deep into the lungs and blood.', 'It smells bad.', 'It is orange.', 'It makes noise.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the drawing show?',
        opts: ['how much smaller a smoke particle is than a hair or dust', 'how fires start', 'how a mask works', 'how wind carries smoke'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is exercising outside on a smoky day riskier?',
        opts: ['You breathe more deeply and take in more smoke.', 'You get too hot.', 'The smoke is heavier near the ground only in the morning.', 'Running spreads the fire.'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“These particles are less than 2.5 micrometres across.” What does <b>These particles</b> refer to?',
        opts: ['fine particulate matter, or PM2.5', 'gases from trees', 'cloth masks', 'clouds'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Which groups are most at risk from smoke? Why do you think they are at greater risk?',
        a: 'People with asthma or heart problems, babies, older adults and pregnant people. Their bodies may already have trouble with breathing or are more fragile.', look: 'groups from the text and a sensible reason' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize three ways to protect yourself on a smoky day.',
        a: 'Stay indoors with windows closed, use an air cleaner with a HEPA filter, and wear an N95 mask if you must go out.', look: 'three protective steps' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'The AQHI is 8 tomorrow and you have a soccer game outdoors. Predict what should happen and explain why.',
        a: 'The game should be moved indoors or cancelled, because 7 or more is high risk and running makes you breathe in more smoke.', look: 'a decision tied to the AQHI and breathing' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence contrasts two ideas using <b>while</b>?',
        opts: ['A well-fitted N95 mask blocks most particles, while cloth masks block very few.', 'Smoke can make your eyes sting.', 'Fires burned in almost every province.', 'Check the number.'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-great-green-wall', subject: 'geography', form: 'Report',
    title: 'A Wall Made of Trees',
    deck: 'Africa’s plan to stop the desert by growing a green belt across a continent',
    hero: {
      photo: 'g7-sahel.jpg', credit: 'Image: NASA (MODIS), public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A satellite view of Mali, in the Sahel. The dry Sahara lies to the north, and greener land lies to the south.'
    },
    body: [
      'South of the Sahara Desert, a long strip of dry grassland and scattered trees stretches across Africa from the Atlantic Ocean to the Red Sea. This region is called the <b>Sahel</b>. More than a hundred million people live there, most of them farmers and herders who depend on the land. In the last century, long droughts, a growing population, overgrazing and cutting trees for firewood left much of the soil bare. Wind blew it away, and the land turned to dust.',
      { h: 'Land turning to desert' },
      'When healthy land loses its plants and topsoil and becomes desert-like, the process is called <b>desertification</b>. Without roots to hold it, soil washes or blows away. Without shade, the ground bakes. Rain runs off instead of soaking in. Crops fail, and families may have to leave their villages.',
      { fig: '<rect class="t" x="10" y="20" width="280" height="40"/><text class="l" x="150" y="44" text-anchor="middle">Sahara Desert</text>' +
          '<path class="h" d="M10 70 Q80 64 150 70 T290 70 V100 Q220 106 150 100 T10 100 Z"/><text class="lb" x="150" y="90" text-anchor="middle">Sahel: the Great Green Wall</text>' +
          '<rect class="k" x="10" y="110" width="280" height="30"/><text class="l" x="150" y="130" text-anchor="middle">wetter savanna and forest</text>' +
          '<text class="n" x="14" y="156">Senegal</text><text class="n" x="286" y="156" text-anchor="end">Djibouti</text>' + D.arrow(70, 152, 230, 152, 'a'),
        tall: 162, cap: 'A simplified sketch of the band across Africa where the Great Green Wall is planned. Not to scale.' },
      { h: 'The big idea' },
      'In 2007, African countries launched the Great Green Wall. The first plan was to plant a belt of trees about 8 000 km long, from Senegal in the west to Djibouti in the east. Over time, the idea grew. Instead of a single line of trees, it became a patchwork of restored land: farms, forests and grasslands, managed by the people who live there.',
      { box: 'Old ways that work', text: 'In Burkina Faso, farmers dig small pits called zaï and fill them with compost. The pits catch rain and help seeds grow in hard, dry soil. In Niger, farmers let tree stumps on their fields regrow instead of clearing them.' },
      { h: 'Progress and problems' },
      'Millions of trees have been planted, and in some areas crops and grass are returning. But progress has been much slower than hoped. Many planted seedlings died because no one watered or protected them. Conflict and poverty have made work difficult in some countries. Experts have learned that the projects that last are the ones local farmers choose and care for themselves. The Great Green Wall is unfinished, but it has changed how the world thinks about fighting deserts: not with one giant project, but with millions of small ones.'
    ],
    guide: { before: 'Find the Sahara, the Sahel, Senegal and Djibouti on a world map. Teach <b>Sahel</b> and <b>desertification</b>. Pour water on a tray of bare soil and a tray with grass and compare.',
      after: 'Why do you think projects work better when local people choose and care for them?' },
    words: [['Sahel', 'the dry region just south of the Sahara Desert'], ['desertification', 'when healthy land becomes dry and desert-like']],
    qs: [
      { k: 'order', code: 'C1.5', q: 'Number the steps of desertification as the report explains them.',
        items: ['Plants and trees are lost.', 'Soil washes or blows away.', 'Rain runs off instead of soaking in.', 'Crops fail and families may leave.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Where is the Great Green Wall in the sketch?',
        opts: ['in the band between the desert and the wetter land', 'in the middle of the Sahara', 'along the ocean', 'in the forest'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did many planted seedlings die?',
        opts: ['No one watered or protected them.', 'It rained too much.', 'The trees were the wrong colour.', 'They were planted in Canada.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Desertification</b> contains <b>desert</b> + <b>-ify</b> + <b>-tion</b>. What does the word mean?',
        opts: ['the process of becoming a desert', 'a person who lives in a desert', 'a desert plant', 'leaving a desert'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the author call it a “wall” made of trees?',
        opts: ['It was meant to hold back the desert, like a wall.', 'The trees are made of stone.', 'It surrounds a city.', 'It is very tall.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How did the Great Green Wall idea change over time?',
        a: 'It began as one long line of trees. It became a patchwork of restored farms, forests and grasslands managed by local people.', look: 'from a line of trees to local patchwork' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why do you think the author included the box about zaï pits and regrowing stumps?',
        a: 'To show that local people’s traditional methods work well and are cheap, and that solutions do not always need new technology.', look: 'the value of local and traditional knowledge' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'The last sentence says deserts are fought “with millions of small ones.” Do you agree that small projects can be better than one huge one? Explain.',
        a: 'Yes, because small projects are cared for by the people who use them, so they last, while a giant project can fail if no one looks after it.', look: 'a position with a reason from the text' }
    ]
  });

  P.add({
    id: 'g7-peer-pressure', subject: 'health', form: 'Interview', plain: true,
    title: 'Saying No, Keeping Friends',
    deck: 'An interview with a school counsellor about peer pressure',
    hero: {
      photo: 'g7-study-group.jpg', credit: 'Photo: Barry Pousman, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Students working together. Friends influence each other every day, often in good ways.'
    },
    body: [
      '<i>Our student reporter, Kamal, spoke with Ms. Josée Lavoie, a counsellor at a middle school in Sudbury. This interview has been shortened. The people are invented for this text, but the advice is real.</i>',
      '<b>Kamal:</b> What exactly is peer pressure?',
      '<b>Ms. Lavoie:</b> It is the influence that people your age have on what you do. Sometimes it is spoken out loud, like “Come on, everyone’s doing it.” Often it is silent. You just notice what others wear or say and feel you should match them.',
      '<b>Kamal:</b> Is it always bad?',
      '<b>Ms. Lavoie:</b> Not at all. Friends can push you to try out for a team, study harder or stand up for someone. That is positive peer pressure. The problem is when it pushes you toward something that is unsafe, unkind or against your values.',
      { fig: '<rect class="k" x="70" y="10" width="160" height="30"/><text class="n" x="150" y="30" text-anchor="middle">someone pressures you</text>' +
          D.arrow(150, 40, 150, 58, 'a') + '<rect class="h" x="80" y="58" width="140" height="30"/><text class="lb" x="150" y="78" text-anchor="middle">pause and check</text>' +
          D.arrow(120, 88, 60, 112, 'a') + D.arrow(180, 88, 240, 112, 'a') +
          '<rect class="k" x="10" y="112" width="110" height="36"/><text class="n" x="65" y="128" text-anchor="middle">safe and kind?</text><text class="n" x="65" y="142" text-anchor="middle">your choice</text>' +
          '<rect class="k" x="180" y="112" width="110" height="36"/><text class="n" x="235" y="128" text-anchor="middle">unsafe or unkind?</text><text class="n" x="235" y="142" text-anchor="middle">no, then a plan</text>',
        tall: 156, cap: 'A quick way to think before you act.' },
      '<b>Kamal:</b> Why is it so hard to say no?',
      '<b>Ms. Lavoie:</b> Part of it is how the teenage brain works. The area that loves rewards and excitement is very active during the teen years, especially around friends. The front part of the brain, which weighs risks and plans ahead, keeps developing until your mid-twenties. So the “gas pedal” is strong, but the “brakes” are still being built. That is not an excuse, just something to know.',
      '<b>Kamal:</b> So what can someone actually do?',
      '<b>Ms. Lavoie:</b> First, pause. Even three seconds helps. Then use a clear, short no: “No thanks, I’m good.” You do not owe a long reason. Suggest something else to do. And plan ahead. Some families agree on a code word you can text, and a parent calls to “make” you come home. That gives you an <b>exit</b> without losing face.',
      { box: 'Real friends', text: 'A good friend accepts your no. If someone keeps pushing after you say no, that tells you something about the friendship.' },
      '<b>Kamal:</b> What if I already said yes and regret it?',
      '<b>Ms. Lavoie:</b> You can change your mind at any point. Leave, call home, or talk to a trusted adult afterwards. One mistake does not mean you have to keep going.',
      '<b>Kamal:</b> Any last advice?',
      '<b>Ms. Lavoie:</b> Know your own <b>values</b> before you are in the moment. And remember, if one person says no, it often gives others the courage to say no too.'
    ],
    guide: { before: 'Explain that an interview is written as a conversation between two people. Teach <b>values</b> and <b>exit</b>. Agree on a family code word together.',
      after: 'Role-play a situation where someone pressures you. Practise a short, clear no.' },
    words: [['values', 'the beliefs and ideas that are most important to a person'], ['exit', 'a way out of a situation']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is an interview?',
        opts: ['The speakers’ names come before what each one says.', 'It has a rhyme.', 'It has numbered steps only.', 'It is told by a narrator.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the first step when someone pressures you?',
        opts: ['pause and check', 'say yes', 'run away', 'call the police'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Ms. Lavoie compares the teen brain to a “gas pedal” and “brakes.” What does this show?',
        opts: ['The urge for excitement is strong, while the ability to stop and plan is still developing.', 'Teens like cars.', 'Brains have engines.', 'Teens should drive.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A code word lets you leave “without losing face.” What does <b>losing face</b> mean?',
        opts: ['being embarrassed in front of others', 'getting a scar', 'forgetting someone’s face', 'losing a game'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Give one example of positive peer pressure and one of negative peer pressure.',
        a: 'Positive: a friend encourages you to try out for the basketball team. Negative: friends push you to vape at a party.', look: 'one of each type' },
      { k: 'lines', code: 'B1.1', n: 3, q: 'Kamal asks short, clear questions and lets Ms. Lavoie answer. Why is this good listening in an interview?',
        a: 'It lets the expert explain fully without being interrupted, and his next question builds on what she said.', look: 'giving space and building on answers' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Which strategy from the interview would be easiest for you to use? Describe a time you could use it.',
        a: 'Saying “No thanks, I’m good” is easiest. I could use it if someone offered me an energy drink at a sleepover.', look: 'a strategy and a realistic situation' },
      { k: 'choice', code: 'C1.6', q: 'Why does the interview start with a note in italics?',
        opts: ['to explain who is speaking and that the people are invented', 'to tell a joke', 'to give the answers', 'to list the questions'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-scale-maps', subject: 'math', form: 'Explanation',
    title: 'How Far Is It Really?',
    deck: 'Using scale and ratios to measure distances on a map',
    hero: {
      photo: 'g7-map-compass.jpg', credit: 'Photo: Wodgester, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A compass on a hiking map. Every map shrinks the real world by a fixed amount, called the scale.'
    },
    body: [
      'Imagine you are planning a canoe trip in Algonquin Park. You spread a paper map on the kitchen table. The route to your first campsite crosses two lakes and a portage. It looks short on paper, only 9 cm. But how far will you actually paddle and carry the canoe? To find out, you need the map’s <b>scale</b>.',
      { h: 'A ratio on every map' },
      'A map’s scale tells you how much the real world was shrunk to fit on the page. Many Canadian topographic maps have a scale of 1:50 000. This is a <b>ratio</b>. It means that 1 unit on the map stands for 50 000 of the same units in real life. So 1 cm on the map represents 50 000 cm on the ground. Since there are 100 cm in a metre, that is 500 m. Since there are 1 000 m in a kilometre, 1 cm on the map is half a kilometre.',
      { fig: '<path class="k" d="M20 50 H260"/>' + [0, 1, 2, 3, 4].map(function (i) { var x = 20 + i * 60; return '<path class="k" d="M' + x + ' 42 V58"/><text class="n" x="' + x + '" y="76" text-anchor="middle">' + (i * 0.5) + ' km</text>'; }).join('') +
          '<rect class="h" x="20" y="44" width="60" height="12"/><rect class="h" x="140" y="44" width="60" height="12"/>' +
          '<text class="lb" x="20" y="28">Scale 1:50 000</text><text class="n" x="20" y="100">each section = 1 cm on the map = 0.5 km on the ground</text>' +
          '<path class="t" d="M20 130 Q80 110 140 132 T260 126"/><text class="n" x="20" y="150">a curvy route: measure it with string</text>',
        tall: 156, cap: 'A scale bar. Maps show the scale as a ratio, as a bar, or both.' },
      { h: 'Working it out' },
      'Back to the canoe route. Lay a piece of string along the curving route, then straighten it and measure: 9 cm. Each centimetre is 0.5 km, so the route is 9 × 0.5 = 4.5 km. If you paddle about 3 km in an hour, the trip will take about an hour and a half, not counting the portage.',
      'You can also use the scale bar. Instead of calculating, lay the string next to the bar and read off the distance. This is handy when you do not have a ruler, and it still works if the map has been printed larger or smaller.',
      { box: 'Larger or smaller scale?', text: 'A 1:50 000 map shows more detail than a 1:250 000 map, because the land is shrunk less. Hikers use large-scale maps. A map of all of Canada needs a much smaller scale.' },
      { h: 'Scale everywhere' },
      'Scale is not only for maps. Architects draw floor plans at scales such as 1:100. Model trains and toy cars are made at scales such as 1:87 or 1:64. Each time, the same idea applies: a ratio connects the drawing or model to the real thing.',
      'Scale also works backwards. To draw a 2 km trail on a 1:50 000 map, change 2 km to 200 000 cm, then divide: 200 000 ÷ 50 000 = 4 cm on the paper. So before you trust any distance, check the scale first. Two maps of the same park can be the same size on the table but use very different scales.'
    ],
    guide: { before: 'Find a map with a scale bar (a park map or road map). Teach <b>scale</b> and <b>ratio</b>. Have a ruler and string ready.',
      after: 'Measure a route between two places on a real map and find the actual distance.' },
    words: [['scale', 'how much smaller a map or model is than the real thing'], ['ratio', 'a comparison of two amounts, such as 1:50 000']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'On a 1:50 000 map, what does 1 cm stand for?',
        opts: ['500 m', '50 m', '5 km', '50 000 km'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'On the scale bar, how far is it from 0 to the end?',
        opts: ['2 km', '4 km', '1 km', '0.5 km'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'A route on a 1:50 000 map measures 6 cm. How long is it in real life?',
        opts: ['3 km', '6 km', '30 km', '300 m'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the scale bar still work if a map is printed larger?',
        opts: ['The bar grows or shrinks with the map.', 'The ratio changes.', 'Bars are always 1 cm.', 'Rulers change size.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain, step by step, how 1:50 000 becomes “1 cm = 0.5 km.”',
        a: '1 cm on the map is 50 000 cm on the ground. 50 000 cm ÷ 100 = 500 m. 500 m ÷ 1 000 = 0.5 km.', look: 'both unit conversions' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'If you got a different answer for the canoe route, how could you check your work?',
        a: 'I could lay the string along the scale bar and read the distance, then compare it to my calculation.', look: 'a second method to check' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Where else have you seen scale used, besides maps? Explain the scale in your example.',
        a: 'A model car that says 1:64. The real car is 64 times longer than the model.', look: 'an example and a correct explanation of its ratio' },
      { k: 'choice', code: 'B2.2', q: 'In “a large-scale map,” what does <b>large-scale</b> mean?',
        opts: ['the land is shrunk less, so more detail shows', 'the paper is very big', 'it shows a large country', 'it is very old'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-kathak', subject: 'arts', form: 'Explanation',
    title: 'Dancing a Story',
    deck: 'Kathak, a classical dance of India, where the feet make music',
    hero: {
      photo: 'g7-kathak.jpg', credit: 'Photo: Rhythm India, CC0, Wikimedia Commons', focus: '50% 30%',
      tall: 200,
      cap: 'A Kathak dancer in Varanasi, India. The wide skirt flares out during fast spins.'
    },
    body: [
      'Kathak is one of the classical dance forms of India. Its name comes from <i>katha</i>, a word for story. Long ago, storytellers travelled between temples and villages in northern India, acting out old tales with gestures and movement. Over centuries, the dance moved into royal courts, where it became faster, showier and full of brilliant footwork. Different schools, named after cities such as Lucknow and Jaipur, each developed a style of their own. Today Kathak is taught in studios around the world, including many in Canadian cities.',
      { h: 'Feet that make music' },
      'A Kathak dancer wears ghungroo, strings of small brass bells tied around each ankle. Some dancers wear more than a hundred bells on each foot. By striking the floor with the flat foot, the heel and the toes, the dancer turns the feet into a drum. A skilled dancer can make the bells ring loudly, softly or not at all, even while the feet keep moving.',
      { h: 'Counting in circles' },
      'Kathak follows a <b>rhythm cycle</b> called a taal. The most common one, teentaal, has sixteen beats grouped in four sets of four. The cycle repeats again and again. The musicians, often a tabla drummer and a singer, keep the cycle going while the dancer weaves patterns over it. The most exciting moment comes when dancer and drummer land together on beat one, called sam.',
      { fig: (function () {
          var s = '';
          for (var i = 0; i < 16; i++) {
            var t = (-90 + i * 22.5) * Math.PI / 180, b = i + 1, x = (150 + 60 * Math.cos(t)).toFixed(1), y = (85 + 60 * Math.sin(t)).toFixed(1);
            s += b === 1 || b === 5 || b === 13 ? '<circle class="h" cx="' + x + '" cy="' + y + '" r="8"/>' : b === 9 ? '<circle class="k" cx="' + x + '" cy="' + y + '" r="8"/>' : '<circle class="dot" cx="' + x + '" cy="' + y + '" r="3"/>';
            if (b % 4 === 1) s += '<text class="n" x="' + (150 + 82 * Math.cos(t)).toFixed(1) + '" y="' + (89 + 82 * Math.sin(t)).toFixed(1) + '" text-anchor="middle">' + (b === 1 ? '1 (sam)' : b) + '</text>';
          }
          return s + '<text class="lb" x="150" y="84" text-anchor="middle">teentaal</text><text class="n" x="150" y="100" text-anchor="middle">16 beats</text>' +
            '<circle class="h" cx="246" cy="150" r="6"/><text class="n" x="256" y="154">clap</text><circle class="k" cx="246" cy="168" r="6"/><text class="n" x="256" y="172">wave</text>';
        })(),
        tall: 176, cap: 'The sixteen beats of teentaal go around like a clock. Musicians clap on three beats and wave on one to keep their place.' },
      { box: 'Spins', text: 'Kathak dancers are famous for chakkars, fast spins on the heel. A dancer may spin dozens of times in a row, then stop exactly on sam, perfectly still.' },
      { h: 'Telling stories' },
      'Not all Kathak is fast. In slower sections, the dancer uses the face and hands to tell a story or show a feeling. With a tilt of the head, a glance and a curve of the wrist, one dancer might play a mother, a child and a river, all in a minute. Dancers also <b>improvise</b>, making up new rhythm patterns on the spot and trading them with the drummer, like a conversation. Many dancers first recite a pattern out loud in spoken syllables, such as “ta thei thei tat”, and then dance it with their feet. A single performance can move from quiet storytelling to footwork so fast that the bells blur into one sound.'
    ],
    guide: { before: 'Watch a short Kathak performance together if you can. Teach <b>rhythm cycle</b> and <b>improvise</b>. Clap a steady count of 16 and stress beat 1.',
      after: 'Clap teentaal together: clap on 1, 5 and 13, wave on 9, and land firmly on beat 1 each time around.' },
    words: [['rhythm cycle', 'a set number of beats that repeats over and over'], ['improvise', 'to make something up on the spot, without planning it']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Where does the name Kathak come from?',
        opts: ['a word for story', 'a word for bells', 'the name of a drum', 'the name of a city'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which beat is marked with a wave?',
        opts: ['beat 9', 'beat 1', 'beat 5', 'beat 13'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The author says dancer and drummer trade patterns “like a conversation.” What does this suggest?',
        opts: ['They take turns and answer each other.', 'They talk during the dance.', 'They argue about the rhythm.', 'They stop to rest.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might landing on sam together excite an audience?',
        opts: ['After complicated patterns, the two meet exactly on the same beat.', 'The music gets louder for no reason.', 'The dance is over.', 'The bells fall off.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How did Kathak change when it moved from villages into royal courts? Why might that have happened?',
        a: 'It became faster and showier, with brilliant footwork. Court audiences may have wanted dazzling entertainment.', look: 'the change, plus a sensible reason' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the two sides of Kathak described in the text.',
        a: 'Fast, rhythmic footwork with bells and spins, and slow storytelling with the face, head and hands.', look: 'both footwork and storytelling' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about music, dance or counting beats that helped you understand teentaal?',
        a: 'Answers will vary, for example counting beats in a song, clapping games or music class.', look: 'a real connection to the idea of a repeating beat' },
      { k: 'choice', code: 'B2.2', q: 'A dancer’s feet are said to be “brilliant.” What does <b>brilliant</b> mean here?',
        opts: ['very skilled and impressive', 'shining with light', 'very smart at school', 'brightly coloured'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-farm-drones', subject: 'tech', form: 'Report',
    title: 'Eyes Above the Field',
    deck: 'How drones help farmers find problems and use less spray',
    hero: {
      photo: 'g7-farm-drone.jpg', credit: 'Photo: Shreesha Sharma, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A farm drone sprays a rice field. Drones can treat just the parts of a field that need it.'
    },
    body: [
      'On a large farm in Saskatchewan, a field of canola can stretch farther than you can see. Walking every metre to check for pests, dry patches or disease would take days. So more and more farmers are sending up drones. In less than an hour, a drone can fly over a whole field and send back pictures that show trouble long before a person would spot it.',
      { h: 'Seeing what eyes cannot' },
      'Many farm drones carry a special camera, or <b>sensor</b>, that measures light our eyes cannot see. Healthy leaves reflect a lot of near-infrared light. Leaves that are thirsty, sick or eaten by insects reflect less. A computer turns these readings into a colour-coded map of the field. Green patches are thriving. Yellow and red patches need a closer look. The farmer can then go straight to those spots instead of searching the whole field.',
      { fig: (function () {
          var s = '', weak = { '1,1': 1, '2,1': 1, '4,2': 1, '4,3': 1 };
          for (var r = 0; r < 4; r++) for (var c = 0; c < 6; c++) s += '<rect class="' + (weak[c + ',' + r] ? 'h' : 't') + '" x="' + (30 + c * 30) + '" y="' + (16 + r * 30) + '" width="30" height="30"/>';
          return s + '<rect class="h" x="226" y="58" width="16" height="16"/><text class="n" x="248" y="66">weak patch:</text><text class="n" x="248" y="79">spray here</text>' + '<text class="n" x="120" y="152" text-anchor="middle">one field, divided into 24 squares</text>';
        })(),
        tall: 158, cap: 'A sketch of a drone map. The hatched squares reflect less near-infrared light, so the plants there may be in trouble.' },
      { h: 'Using less, not more' },
      'This is called <b>precision agriculture</b>: giving each part of a field exactly what it needs, and no more. Instead of spraying a whole field with fertilizer or pesticide, a farmer can treat only the weak patches. That saves money and fuel, and it means fewer chemicals reach nearby streams, bees and birds. Some drones can even do the spraying themselves, flying low over the problem spots. On some farms, spraying only where weeds grow has cut the amount of weed killer used by half or more.',
      { box: 'Rules in the sky', text: 'In Canada, most drones heavier than 250 g must be registered, and the pilot needs a Transport Canada certificate. The pilot usually has to keep the drone in sight at all times.' },
      { h: 'Not a magic fix' },
      'Drones have limits. Their batteries last less than an hour, so big farms need many flights. Wind and rain can ground them. The equipment and software are expensive, which makes them hard for small farms to afford. And a map is only useful if someone knows how to read it. Many farmers say the best results come from mixing new tools with old knowledge: a drone points to a problem, and then the farmer walks out to see it with their own eyes.'
    ],
    guide: { before: 'Teach <b>sensor</b> and <b>precision agriculture</b>. Ask: how would you check a field bigger than 100 soccer fields?',
      after: 'Look at the map sketch and work out the fraction of the field that needs spraying, then the fraction that does not.' },
    words: [['sensor', 'a device that detects and measures something, such as light, heat or movement'], ['precision agriculture', 'farming that gives each part of a field exactly what it needs']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'How can a drone tell that plants are unhealthy?',
        opts: ['Unhealthy leaves reflect less near-infrared light.', 'Unhealthy plants are taller.', 'The drone can smell disease.', 'Farmers paint the sick plants.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the sketch, what fraction of the field needs spraying?',
        opts: ['one sixth', 'one half', 'one quarter', 'all of it'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Wind and rain can <b>ground</b> them.” What does <b>ground</b> mean here?',
        opts: ['keep from flying', 'crush into powder', 'bury in soil', 'punish'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does spraying only the weak patches help bees and streams?',
        opts: ['Fewer chemicals end up in the environment.', 'Bees like drones.', 'Streams need fertilizer.', 'The drone scares bees away.'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Sort the information from the report.', cols: ['Benefits of farm drones', 'Limits of farm drones'],
        rows: [[null, null], [null, null]],
        a: [['spot problems early', 'short battery life, grounded by wind and rain'], ['use less spray and save money', 'expensive, and someone must know how to read the map']] },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Should a small family farm buy a drone? Use facts from the report to support your answer.',
        a: 'Answers will vary. Yes: finds problems early and saves spray. No: costly, short battery life, needs skill.', look: 'an opinion backed by facts from the text' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'Why do you think the author ends with the farmer walking out to see the problem?',
        a: 'To show that technology works best with human knowledge and checking things in person.', look: 'the idea of combining new tools with old knowledge' },
      { k: 'choice', code: 'B3.3', q: 'Why are there commas in “thirsty, sick or eaten by insects”?',
        opts: ['to separate items in a list', 'to show a quotation', 'to join two sentences', 'to show a pause before a name'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-angelique', subject: 'history', form: 'Report',
    title: 'The Fire of 1734',
    deck: 'Marie-Joseph Angélique, an enslaved woman in New France, and the trial that still raises questions',
    hero: {
      photo: 'g7-rue-saint-paul.jpg', credit: 'Photo: shankar s., CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Rue Saint-Paul in Old Montréal today. The fire of 1734 began on this street.'
    },
    body: [
      'On the evening of 10 April 1734, a fire broke out on rue Saint-Paul in Montréal, then a small town in New France. Wind pushed the flames from roof to roof. By morning, 46 buildings were gone, including the Hôtel-Dieu, the town’s hospital. Frightened and angry, people wanted someone to blame. Within hours, many were pointing at one woman: Marie-Joseph Angélique.',
      { h: 'Who was Angélique?' },
      'Angélique was a Black woman born on Madeira, an island ruled by Portugal. As a young woman, she was sold and brought to Montréal, where she was <b>enslaved</b> by a wealthy merchant family. Slavery was legal in New France. Over the years, several thousand people, most of them Indigenous and some of them Black, were held as property there. Angélique was known for speaking her mind. Shortly before the fire, she learned she was going to be sold again. She tried to escape with a man named Claude Thibault, but they were caught.',
      { fig: [['about 1705', 'born on Madeira'], ['1725', 'brought to Montréal'], ['Feb. 1734', 'tries to escape'], ['10 Apr. 1734', 'fire on rue Saint-Paul'], ['21 June 1734', 'executed']].map(function (e, i) { var y = 14 + i * 27; return '<circle class="' + (i === 3 ? 'h' : 'dot') + '" cx="96" cy="' + y + '" r="' + (i === 3 ? 6 : 3) + '"/><text class="n" x="84" y="' + (y + 4) + '" text-anchor="end">' + e[0] + '</text><text class="l" x="110" y="' + (y + 4) + '">' + e[1] + '</text>'; }).join('') + '<path class="t" d="M96 14 V122"/>',
        tall: 130, cap: 'Key dates in Angélique’s life. The spaces between dates are not to scale.' },
      { h: 'The trial' },
      'Angélique was arrested and put on trial. Under the law at the time, she was not allowed a lawyer. No one had seen her start the fire. The court heard <b>testimony</b> from neighbours, much of it rumour. Weeks into the trial, a young child said she had seen Angélique go up to the attic that day. Angélique said again and again that she was innocent. In June, she was tortured until she confessed, and then she was executed.',
      { box: 'A rare voice', text: 'The written records of the trial still survive. They are one of the few places where words spoken by an enslaved woman in New France were written down.' },
      { h: 'What do historians think?' },
      'Historians still disagree. Some think Angélique set the fire to cover her escape. Others point out that fires were common in towns built of wood, that the evidence was weak, and that a confession made under torture cannot be trusted. Almost all agree on one thing: her story shows that slavery was part of Canada’s past, a fact left out of many history books for a long time. Today her name appears in plays, books and lessons, and many people see her as a symbol of resistance. Historians also ask a harder question: why was the person with the least power in town the first one blamed?'
    ],
    guide: { before: 'Explain that slavery existed in New France and later in British North America. Teach <b>enslaved</b> and <b>testimony</b>. The text mentions torture and execution briefly.',
      after: 'Discuss: why might a person’s words be missing from history? Whose records usually survive?' },
    words: [['enslaved', 'forced to work for others without pay or freedom, and treated as property'], ['testimony', 'what a witness says in court, under a promise to tell the truth']],
    qs: [
      { k: 'order', code: 'C1.3', q: 'Number these events in the order they happened.',
        items: ['Angélique tries to escape.', 'Fire breaks out on rue Saint-Paul.', 'Angélique is put on trial.', 'Angélique is executed.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: 'Many see her as a symbol of <b>resistance</b>. What does <b>resistance</b> mean here?',
        opts: ['refusing to accept unfair treatment', 'electricity moving through a wire', 'a kind of exercise', 'staying quiet'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might the town have been quick to blame Angélique?',
        opts: ['She was enslaved and had tried to flee.', 'Many people saw her start it.', 'She lived far away.', 'She admitted it at once.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the timeline. About how long after the fire was Angélique executed?',
        opts: ['about ten weeks', 'one day', 'two years', 'one week'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Why does the author include the sentence “No one had seen her start the fire”?',
        opts: ['to show that the evidence against her was weak', 'to prove she was guilty', 'to describe the weather', 'to name the witnesses'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose voices were left out of many history books? Why do the trial records matter?',
        a: 'Enslaved people, Black and Indigenous people. The records keep Angélique’s own words, which are rarely written down.', look: 'whose voices, and why the records are rare' },
      { k: 'lines', code: 'C3.8', n: 4, q: 'Did Angélique set the fire? Which view do you find more convincing? Use evidence.',
        a: 'Answers will vary. Many point to weak evidence and a confession under torture; others to her motive to escape.', look: 'a view supported by evidence from the text' },
      { k: 'choice', code: 'B3.3', q: 'Why is there a colon in “many were pointing at one woman: Marie-Joseph Angélique”?',
        opts: ['to introduce and name the woman', 'to start a list of many items', 'to show the time', 'to end a question'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-wind-farms', subject: 'social', form: 'Report',
    title: 'Turbines in the Cornfield',
    deck: 'Wind power in rural Ontario, and who gets to decide',
    hero: {
      photo: 'g7-wind-farm.jpg', credit: 'Photo: Ken Lund, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Wind turbines in Chatham-Kent, Ontario. Crops can grow right up to the base of each tower.'
    },
    body: [
      'Drive through Chatham-Kent in southwestern Ontario and you will see them: rows of white wind turbines turning slowly above flat fields of corn and soybeans. The area has hundreds of them. For some people they are a sign of a cleaner future. For others they are an unwelcome change to the land they love.',
      { h: 'How a turbine works' },
      'Wind pushes on the long blades and makes them spin. The blades turn a shaft inside the box at the top, called the nacelle, where a generator changes the motion into electricity. Cables carry the power down the tower and out to the grid. Wind is a <b>renewable</b> source: it will not run out, and turbines release no smoke while they work. A single large turbine can supply electricity for several hundred homes.',
      { fig: '<path class="t" d="M20 160 H280"/><path class="k" d="M104 160 L108 60 L112 60 L116 160"/><rect class="h" x="104" y="48" width="30" height="14"/>' +
          '<path class="k" d="M104 55 L104 8 M104 55 L145 79 M104 55 L63 79"/><circle class="dot" cx="104" cy="55" r="4"/>' +
          D.label(172, 24, 'blade', 105, 22) + D.label(172, 58, 'nacelle with generator', 134, 55) + D.label(172, 116, 'tower', 114, 116) +
          '<path class="d" d="M30 160 V55"/><text class="n" x="36" y="108">about</text><text class="n" x="36" y="121">100 m</text>',
        tall: 166, cap: 'The parts of a wind turbine. Spinning blades turn a generator high above the ground.' },
      { h: 'The case for' },
      'Supporters say wind power helps Canada cut the pollution that drives climate change. Farmers who <b>lease</b> land for a turbine earn a payment every year, and the turbine takes up only a small corner of a field. Projects also bring jobs during construction and tax money for the town.',
      { h: 'The case against' },
      'Some neighbours complain about the steady whooshing sound and the flicker of shadows when the sun sets behind spinning blades. Others worry about birds and bats that hit the blades, or about falling property values. Others simply miss the view of open farmland under a wide sky. In 2009, an Ontario law sped up wind projects and limited what local councils could do to block them. Many rural residents felt the decision had been made for them by people far away. That law was later cancelled.',
      { box: 'A question of voice', text: 'Today, many energy projects in Ontario need local support before they can go ahead. Who should decide what gets built: the people who live nearby, or the whole province that uses the power?' },
      'There is no simple answer. Chatham-Kent shows that the same project can look very different depending on where you stand: beside a farmer counting a lease payment, on a neighbour’s back porch, or in a city far away.'
    ],
    guide: { before: 'Teach <b>renewable</b> and <b>lease</b>. Ask: what would you think if a turbine were built near your home?',
      after: 'Hold a short debate: one person argues for a new wind farm, one against, using facts from the report.' },
    words: [['renewable', 'able to be replaced naturally, so it will not run out'], ['lease', 'an agreement to rent land or property for a set time and price']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is the generator?',
        opts: ['in the nacelle at the top of the tower', 'under the ground', 'at the tip of a blade', 'beside the road'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why can crops still grow in a field with a turbine?',
        opts: ['The turbine takes up only a small corner.', 'Turbines water the crops.', 'Crops grow on the blades.', 'The turbine is moved every spring.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'How is the report organized?',
        opts: ['It explains how turbines work, then gives arguments for and against.', 'It tells a story in order of time only.', 'It lists steps to build a turbine.', 'It compares wind and solar power.'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Why does the author include both “The case for” and “The case against”?',
        opts: ['to give a balanced view so readers can decide', 'to prove turbines are bad', 'to sell turbines', 'to fill space'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Fill in the chart with two points from each side.', cols: ['For wind farms', 'Against wind farms'],
        rows: [[null, null], [null, null]],
        a: [['cuts pollution that causes climate change', 'noise and shadow flicker'], ['payments for farmers, jobs and taxes', 'harm to birds and bats, lower property values']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why did many rural residents feel left out of the 2009 decision? Whose voice was missing?',
        a: 'The law limited what local councils could do, so people living near turbines had little say. Their voice was missing.', look: 'the law limited local say; local residents left out' },
      { k: 'lines', code: 'C3.8', n: 4, q: 'Answer the question in the box. Give two reasons for your opinion.',
        a: 'Answers will vary, for example: nearby people, because they live with the noise; or the province, because everyone uses the power.', look: 'a clear opinion and two reasons' },
      { k: 'choice', code: 'B2.1', q: '<b>Renewable</b> has the prefix <b>re-</b> and the suffix <b>-able</b>. What does it mean?',
        opts: ['able to be made new again', 'not able to be used', 'very new', 'used only once'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-seasons', subject: 'science', form: 'Explanation',
    title: 'Why We Have Winter',
    deck: 'The real reason for the seasons is a tilt, not a distance',
    hero: {
      photo: 'g7-seasons.jpg', credit: 'Image: NASA Earth Observatory, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Earth photographed from space at different times of the year. How much of each pole is lit changes with the seasons.'
    },
    body: [
      'Ask people why summer is warm and many will say it is because Earth is closer to the Sun. It is a good guess, but it is wrong. Earth is actually closest to the Sun in early January, in the middle of a Canadian winter. Seasons have a different cause: Earth is tilted.',
      { h: 'A tilted planet' },
      'Earth spins around an imaginary line through the North and South Poles, called its <b>axis</b>. The axis is not straight up and down. It leans about 23 degrees, and it always points the same way in space as Earth travels around the Sun. For part of the year, the Northern Hemisphere leans toward the Sun. Six months later, it leans away. Many scientists think Earth got its tilt billions of years ago, when another young planet crashed into it.',
      { fig: '<path class="k" d="M10 110 H290"/>' +
          '<rect class="k" x="63" y="6" width="24" height="14"/><path class="a" d="M66 20 L55 108 M84 20 L95 108"/><ellipse class="h" cx="75" cy="110" rx="20" ry="5"/>' +
          '<path class="k" d="M154.7 40.5 L165.3 31.5 L151 14.8 L140.4 23.8 Z"/><path class="a" d="M154.7 40.5 L182 108 M165.3 31.5 L272 108"/><ellipse class="h" cx="227" cy="110" rx="45" ry="5"/>' +
          '<text class="lb" x="75" y="136" text-anchor="middle">direct</text><text class="n" x="75" y="151" text-anchor="middle">small, bright spot</text>' +
          '<text class="lb" x="227" y="136" text-anchor="middle">slanted</text><text class="n" x="227" y="151" text-anchor="middle">large, dim spot</text>',
        tall: 158, cap: 'The same light spread over a small area or a large one. Slanted sunlight warms each square metre less.' },
      { h: 'Direct and slanted light' },
      'When your part of Earth leans toward the Sun, sunlight hits the ground more directly. The same amount of energy lands on a smaller area, so the ground heats up more. When your hemisphere leans away, sunlight arrives at a low slant and spreads over a larger area, like a flashlight beam shone at an angle. Each square metre gets less energy.',
      { box: 'Try it', text: 'Shine a flashlight straight down on a sheet of paper, then tilt it. Trace both spots of light. The tilted spot is bigger and dimmer.' },
      { h: 'Longer days, shorter nights' },
      'The tilt also changes how long the Sun stays in the sky. In Ottawa, the longest day of the year, the June <b>solstice</b>, has nearly 15 and a half hours of daylight. The December solstice, the shortest day, has fewer than 9. More hours of sunshine mean more time to warm up and less time to cool down. Farther north, in Inuvik, the Sun does not set at all for weeks in summer and does not rise for weeks in winter. Seasons are flipped in the Southern Hemisphere: when Canadians are shovelling snow, people in Argentina are heading to the beach. So the next time someone blames winter on distance, you can explain the tilt instead.'
    ],
    guide: { before: 'Ask why the child thinks summer is warm, and accept any answer. Teach <b>axis</b> and <b>solstice</b>. Have a flashlight ready.',
      after: 'Do the “Try it” activity together, then explain the seasons using a ball and a lamp, keeping the tilt pointed the same way.' },
    words: [['axis', 'an imaginary line that something spins around'], ['solstice', 'the day with the most or the fewest hours of daylight in the year']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What is the main cause of the seasons?',
        opts: ['the tilt of Earth’s axis', 'Earth’s distance from the Sun', 'clouds blocking the Sun', 'the Moon'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Why does the author begin with a common wrong idea?',
        opts: ['to catch the reader’s interest and then correct it', 'to trick the reader', 'to show the author was wrong', 'to describe January'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, why is the slanted spot dimmer?',
        opts: ['The same light is spread over a bigger area.', 'The flashlight is farther away.', 'The batteries are weaker.', 'The light is a different colour.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'When it is summer in Canada, what season is it in Argentina?',
        opts: ['winter', 'summer', 'spring', 'there are no seasons there'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Compare the two solstices in Ottawa.', cols: ['', 'June solstice', 'December solstice'],
        rows: [['Hours of daylight', null, null], ['Angle of sunlight', null, null]],
        a: [[null, 'nearly 15 and a half', 'fewer than 9'], [null, 'more direct', 'low and slanted']] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'In your own words, explain why Canada is cold in January even though Earth is closest to the Sun then.',
        a: 'The Northern Hemisphere is tilted away, so sunlight is slanted and spread out, and days are short.', look: 'tilt, slanted light and shorter days' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which idea in this text was hardest to understand? What helped you make sense of it?',
        a: 'Answers will vary, for example the slanted light; the diagram or the flashlight activity helped.', look: 'names a hard idea and a strategy or feature that helped' },
      { k: 'choice', code: 'B2.1', q: '<b>Hemisphere</b> begins with <b>hemi-</b>, meaning half. What is the Northern Hemisphere?',
        opts: ['the half of Earth north of the equator', 'the North Pole only', 'all of Canada', 'the sky at night'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-bike-lanes', subject: 'social', form: 'News report',
    title: 'Council Votes Yes to Bike Lanes',
    deck: 'A busy street, a close vote and a one-year trial',
    hero: {
      photo: 'g7-bike-lane.jpg', credit: 'Photo: Nate Wessel, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A protected bike lane in Toronto. A low barrier separates people on bikes from moving cars.'
    },
    body: [
      'MAPLE FALLS, ONT. After a three-hour debate on Tuesday night, city council voted 6 to 3 to add protected bike lanes to a 2 km stretch of Queen Street. The lanes will be a <b>pilot project</b>, a one-year trial that council will review next fall before deciding whether to keep them.',
      { h: 'What will change' },
      'Queen Street now has four lanes for cars, two in each direction. Under the plan, it will have one car lane each way, a turning lane in the middle and a bike lane on each side. A row of low concrete curbs will form a <b>buffer</b> between bikes and moving cars. About 40 of the street’s 120 parking spots will be removed.',
      { fig: (function () {
          function row(y, parts) { var x = 10, s = ''; parts.forEach(function (p) { s += '<rect class="' + p[2] + '" x="' + x + '" y="' + y + '" width="' + p[1] + '" height="30"/>' + (p[0] ? '<text class="n" x="' + (x + p[1] / 2) + '" y="' + (y + 19) + '" text-anchor="middle">' + p[0] + '</text>' : ''); x += p[1]; }); return s; }
          return '<text class="lb" x="10" y="18">Before</text>' + row(24, [['walk', 30, 't'], ['car', 55, 'k'], ['car', 55, 'k'], ['car', 55, 'k'], ['car', 55, 'k'], ['walk', 30, 't']]) +
            '<text class="lb" x="10" y="84">After</text>' + row(90, [['walk', 30, 't'], ['bike', 34, 'h'], ['', 8, 'a'], ['car', 50, 'k'], ['turn', 36, 'd'], ['car', 50, 'k'], ['', 8, 'a'], ['bike', 34, 'h'], ['walk', 30, 't']]) +
            D.label(150, 144, 'concrete curbs', 78, 120);
        })(),
        tall: 150, cap: 'Queen Street from side to side, before and after the change.' },
      { h: 'Voices from the street' },
      'Supporters filled the council chamber. “My daughter is twelve. I want her to ride to school without fearing for her life,” said parent Ana Ferreira. City staff reported that 14 cyclists had been injured on Queen Street in the past five years.',
      'Not everyone is pleased. Dev Mehta, who owns a hardware store on Queen, worries about losing parking. “My older customers drive. If they can’t park, they’ll shop somewhere else,” he said. Councillor Ruth Ostrowski, who voted against the plan, said fewer car lanes would slow traffic and push cars onto side streets.',
      { box: 'What other cities found', text: 'Studies in several Canadian cities found that after protected lanes were added, more people cycled and injuries fell. Sales at nearby shops often stayed the same or rose.' },
      { h: 'What happens next' },
      'Construction begins in May. During the trial, the city will count cyclists, cars and shoppers and report back to council. Mayor Joseph Whitecloud says the vote is not the end of the conversation. “If it doesn’t work, we’ll change it,” he said. “That’s what a pilot is for.”',
      'A local cycling group says it will push to extend the lanes across the river if the trial succeeds. Several shop owners plan to track their sales month by month to see whether Mr. Mehta’s fears come true.',
      '<i>Maple Falls and the people in this report are invented.</i>'
    ],
    guide: { before: 'Look at the parts of a news report: dateline, lead, quotations. Teach <b>pilot project</b> and <b>buffer</b>.',
      after: 'Write two more quotations: one from a person who would welcome the lanes and one from a person who would not.' },
    words: [['pilot project', 'a small trial run to test an idea before deciding whether to keep it'], ['buffer', 'something placed between two things to keep them apart and protect them']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which features show this text is a news report?',
        opts: ['a dateline, a lead and quotations', 'rhyme and rhythm', 'a list of steps', 'chapters and a glossary'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'What does the first paragraph do?',
        opts: ['It tells what happened, where and when.', 'It gives the mayor’s opinion.', 'It describes the weather.', 'It lists every speaker.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how many lanes for cars going straight will there be after the change?',
        opts: ['2', '4', '3', '1'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might council choose a one-year trial instead of a permanent change?',
        opts: ['to test the idea with real counts before deciding', 'because bikes are only used for one year', 'to save the curbs for later', 'because the mayor dislikes bikes'], a: 0 },
      { k: 'table', code: 'C3.5', q: 'Fill in the chart about two people in the report.', cols: ['Person', 'For or against?', 'Their reason'],
        rows: [['Ana Ferreira', null, null], ['Dev Mehta', null, null]],
        a: [[null, 'for', 'her daughter’s safety on the way to school'], [null, 'against, or worried', 'his customers may lose parking']] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Whose point of view is missing from this report? Why would it be useful to hear from them?',
        a: 'Answers will vary, for example children who ride, delivery drivers, bus riders or people who use wheelchairs.', look: 'a missing group and why their view matters' },
      { k: 'lines', code: 'C3.8', n: 4, q: 'If you were on council, would you have voted yes or no? Give two reasons from the report.',
        a: 'Answers will vary, supported by facts such as the 14 injuries, the lost parking or results from other cities.', look: 'a vote and two reasons from the text' },
      { k: 'choice', code: 'B3.3', q: 'Why are quotation marks used in this report?',
        opts: ['to show the exact words people said', 'to show the title of a book', 'to make words look important', 'to show a question'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-zero', subject: 'math', form: 'Explanation',
    title: 'The Idea of Nothing',
    deck: 'How people around the world invented zero',
    hero: {
      photo: 'g7-maya-numerals.jpg', credit: 'Drawing: Sylvanus Griswold Morley, 1915, public domain, Wikimedia Commons', focus: '50% 100%',
      tall: 200,
      cap: 'Maya signs for the numbers fourteen to nineteen and for zero, drawn in a 1915 book.'
    },
    body: [
      'Try writing the number two hundred five without a zero. You might write 2 5 with a gap, but a reader could easily mistake it for 25. For thousands of years, people around the world had exactly this problem. The answer seems obvious now, but it took some of history’s greatest thinkers to invent it: a symbol for nothing.',
      { h: 'A space that means something' },
      'Our number system uses <b>place value</b>: the position of a digit tells its value. In 205, the 2 means two hundreds because it sits in the third place from the right. The 0 tells you there are no tens. Without it, every digit would slide into the wrong place. A zero used this way is a <b>placeholder</b>. About 2 300 years ago, scholars in Babylon, in what is now Iraq, began marking empty places with a small sign. But they did not treat it as a number of its own.',
      { h: 'The Maya shell' },
      'Far away, in what is now Mexico and Central America, the Maya built a number system on groups of twenty. They wrote numbers with dots for ones and bars for fives, and by about 2 000 years ago they were using a shell-shaped sign for zero. Maya astronomers used it in calendars that tracked thousands of years and predicted eclipses. They invented zero on their own, with no contact with Asia or Europe.',
      { fig: [0, 1, 5, 7, 13, 19].map(function (n, i) {
          var x = 30 + i * 48, s = '', b = Math.floor(n / 5), d = n % 5, k;
          if (!n) s = '<ellipse class="k" cx="' + x + '" cy="82" rx="15" ry="9"/><path class="t" d="M' + (x - 9) + ' 82 Q' + x + ' 74 ' + (x + 9) + ' 82 M' + (x - 9) + ' 86 Q' + x + ' 79 ' + (x + 9) + ' 86"/>';
          for (k = 0; k < b; k++) s += '<rect class="h" x="' + (x - 16) + '" y="' + (86 - k * 11) + '" width="32" height="7"/>';
          for (k = 0; k < d; k++) s += '<circle class="dot" cx="' + (x - (d - 1) * 4.5 + k * 9) + '" cy="' + (80 - b * 11) + '" r="3"/>';
          return s + '<text class="lb" x="' + x + '" y="118" text-anchor="middle">' + n + '</text>';
        }).join('') + '<text class="n" x="150" y="22" text-anchor="middle">dot = 1 · bar = 5 · shell = 0</text>',
        tall: 126, cap: 'Some Maya numbers. Dots sit above bars, and a shell stands for zero.' },
      { h: 'Zero becomes a number' },
      'In India, in the year 628, the mathematician Brahmagupta wrote rules for working with zero as a real number. He explained that a number minus itself equals zero, and that any number multiplied by zero equals zero. Indian digits, including zero, spread to Arab scholars in Baghdad, and from there to Europe. That is why the digits we use today are called Hindu-Arabic <b>numerals</b>. Some Europeans distrusted the strange new symbol at first, but it made calculating far faster. Today zero is everywhere, from price tags to computers, which store everything as patterns of 0s and 1s.',
      { box: 'A rule he got wrong', text: 'Brahmagupta also tried to explain dividing by zero, but his answer did not work. Today mathematicians say that dividing by zero has no answer at all.' }
    ],
    guide: { before: 'Write 205 and 25 side by side and ask what the 0 is doing. Teach <b>place value</b> and <b>placeholder</b>.',
      after: 'Write a few numbers the Maya way, such as 8, 12 and 17, using dots and bars.' },
    words: [['place value', 'the value a digit has because of its position in a number'], ['placeholder', 'a symbol that holds an empty place so other digits stay in the right spot']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'Why does the author begin by asking you to write 205 without a zero?',
        opts: ['to show the problem that zero solves', 'to test your handwriting', 'to explain the Maya calendar', 'to show that 25 is bigger'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'How was the Babylonian sign different from our zero?',
        opts: ['It only marked an empty place and was not a number.', 'It was shaped like a shell.', 'It meant five.', 'It was used only for money.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Using the diagram, how would the Maya write 8?',
        opts: ['one bar with three dots above it', 'eight dots', 'two bars', 'one shell and eight dots'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is it remarkable that the Maya had a zero?',
        opts: ['They invented it on their own, without help from other continents.', 'They copied it from Europe.', 'They used it only once.', 'They did not need numbers.'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number these events in the order they happened.',
        items: ['Babylonian scholars mark empty places with a sign.', 'The Maya use a shell sign for zero.', 'Brahmagupta writes rules for zero.', 'Hindu-Arabic numerals reach Europe.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize how zero changed from an empty space into a real number.',
        a: 'First it was a placeholder for empty places, as in Babylon. The Maya also used it. In India, Brahmagupta gave it rules as a number.', look: 'placeholder first, then a number with rules' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Name two places outside math class where zero is used as a placeholder. What would go wrong without it?',
        a: 'Answers will vary, for example prices like $10.05, phone numbers or addresses such as 1020. The amount would be misread.', look: 'two real examples and the problem without zero' },
      { k: 'choice', code: 'B2.2', q: 'What does <b>numerals</b> mean in “Hindu-Arabic numerals”?',
        opts: ['symbols used to write numbers', 'people who count', 'ancient books', 'kinds of maps'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-murals', subject: 'arts', form: 'Explanation',
    title: 'Walls That Talk',
    deck: 'How murals are made, and who decides what goes on the wall',
    hero: {
      photo: 'g7-murals.jpg', credit: 'Photo: Bernard Spragg, CC0, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'Murals cover the walls of an alley in Kensington Market, Toronto.'
    },
    body: [
      'Walk down an alley in Toronto’s Kensington Market and the walls seem to talk. Faces, animals, flowers and words cover brick that was once plain and grey. Each of these is a <b>mural</b>, a large painting made right on a wall. Unlike a painting in a gallery, a mural belongs to everyone who passes by. You do not need a ticket to see it, and you might walk past it every day for years.',
      { h: 'A very old art' },
      'People have painted on walls for tens of thousands of years, from caves to the walls of temples and palaces. In the 1920s, artists in Mexico, such as Diego Rivera, painted huge murals on public buildings that told the stories of ordinary workers and farmers. They believed art should not be locked away for the rich. Their ideas spread across the Americas, including to Canada. Today, Indigenous artists paint murals in cities from Winnipeg to Vancouver, often showing their nations’ stories, languages and clan animals.',
      { h: 'From sketch to wall' },
      'Painting a wall three storeys high is a puzzle of scale. Many muralists use the grid method. They draw a small sketch and cover it with a grid of squares. Then they mark a matching grid on the wall, with each square much larger. Square by square, they copy what is in each small box into the big one. Some artists project the image onto the wall at night instead.',
      { fig: '<rect class="t" x="20" y="40" width="54" height="36"/><path class="t" d="M38 40 V76 M56 40 V76 M20 58 H74"/><path class="a" d="M20 70 Q47 40 74 62"/><circle class="k" cx="60" cy="49" r="4"/>' +
          '<rect class="k" x="130" y="10" width="150" height="100"/><path class="t" d="M180 10 V110 M230 10 V110 M130 60 H280"/><path class="a" d="M130 93 Q205 10 280 71"/><circle class="k" cx="241" cy="35" r="11"/>' +
          D.arrow(84, 58, 120, 58, 'k') + '<text class="n" x="47" y="94" text-anchor="middle">small sketch</text><text class="n" x="205" y="126" text-anchor="middle">wall</text>',
        tall: 132, cap: 'The grid method. Each small square of the sketch is copied into the matching large square on the wall.' },
      { h: 'Who decides?' },
      'A mural changes a neighbourhood, so who chooses what goes on the wall? Cities often <b>commission</b> murals, and many, including Toronto, have programs that pay artists and match them with walls. The best projects first ask neighbours what matters to them: their history, their languages, their hopes. Building owners must agree before any work begins. A good mural can make an underpass feel safer, honour a community leader, or remind people whose land they are standing on. And because a mural is out in the weather, it will not last forever. Many cities now repaint or replace old murals, giving a new artist a turn.',
      { box: 'Built to last', text: 'Outdoor murals face sun, rain and frost. Artists use paints made for the outdoors and often add a clear coat that protects the colours and lets spray-paint tags wash off easily.' }
    ],
    guide: { before: 'Look at the photo together and talk about what you notice first. Teach <b>mural</b> and <b>commission</b>.',
      after: 'Try the grid method: draw a 3 by 2 grid over a small picture and copy it into a larger 3 by 2 grid.' },
    words: [['mural', 'a large painting made directly on a wall'], ['commission', 'to ask and pay an artist to make a particular work']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'How is a mural different from a painting in a gallery?',
        opts: ['Anyone passing by can see it for free.', 'It is always smaller.', 'It is painted on paper.', 'Only the artist can see it.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what changes between the sketch and the wall?',
        opts: ['the size of each square', 'the number of squares', 'the shape of the picture', 'the colours'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A wall is “three <b>storeys</b> high.” What are <b>storeys</b>?',
        opts: ['floors or levels of a building', 'tales or legends', 'shops', 'bricks'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might a mural make an underpass feel safer?',
        opts: ['A bright, cared-for space feels watched over and welcoming.', 'Paint makes walls stronger.', 'Murals block traffic.', 'Murals light up at night.'], a: 0 },
      { k: 'order', code: 'C1.5', q: 'Number the steps of the grid method in order.',
        items: ['Draw a small sketch.', 'Cover the sketch with a grid.', 'Mark a matching larger grid on the wall.', 'Copy the sketch square by square.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Who should decide what goes on a public wall? Whose voices does the author say matter?',
        a: 'Neighbours should be asked about their history, languages and hopes; building owners must agree.', look: 'neighbours and owners, with a reason' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Describe a mural or piece of public art you have seen. What did it say about the place?',
        a: 'Answers will vary.', look: 'a specific artwork and what it shows about its community' },
      { k: 'choice', code: 'B3.2', q: 'In “Unlike a painting in a gallery, a mural belongs to everyone,” what does <b>Unlike</b> signal?',
        opts: ['a contrast', 'a cause', 'a time order', 'an example'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-open-doors', subject: 'social', form: 'Speech', plain: true,
    title: 'Open Doors for Everyone',
    deck: 'A student’s speech to the school council about barriers',
    hero: {
      photo: 'g7-ramp.jpg', credit: 'Photo: AlphaBeta135, CC BY 4.0, Wikimedia Commons', focus: '50% 60%',
      tall: 200,
      cap: 'A long, gentle ramp at a train station, built so that everyone can get to the platform.'
    },
    body: [
      '<i>Malik gave this speech to his school’s student council. The speaker and the school are invented.</i>',
      'Good afternoon. My name is Malik, and I am in Grade 7. Last month, my cousin Sara came to our school concert. Sara uses a wheelchair. She got into the building by the ramp at the side door, which was great. But when the concert ended and she wanted to come backstage to see me, she could not. There were six steps and no other way up. She waited in the hallway. I want to talk about why that matters, and what we can do.',
      { h: 'What is a barrier?' },
      'A <b>barrier</b> is anything that stops someone from taking part. Some barriers are physical, like steps, heavy doors or a water fountain that is too high. Some are about information, like an announcement that is only spoken, which a student who is Deaf will miss. Some are about attitude, like deciding someone cannot do something before asking them. About one in four Canadians aged 15 and older has a disability. Barriers affect a lot of people, including people at this school.',
      { h: 'Good for everyone' },
      'Here is something surprising. When cities cut ramps into curbs for wheelchair users, they found that almost everyone used them: parents with strollers, travellers with suitcases, kids on bikes, workers with delivery carts. People call this the curb-cut effect. When we remove a barrier for some people, we usually make things better for all of us. Captions on videos help people who are Deaf, but they also help anyone in a noisy cafeteria.',
      { fig: '<path class="k" d="M10 76 H70 V48 H130"/><path class="a" d="M160 76 H196 L236 48 H290"/>' +
          '<text class="lb" x="70" y="16" text-anchor="middle">curb</text><text class="n" x="70" y="32" text-anchor="middle">a step</text>' +
          '<text class="lb" x="225" y="16" text-anchor="middle">curb cut</text><text class="n" x="225" y="32" text-anchor="middle">a gentle slope</text>' +
          '<text class="n" x="150" y="104" text-anchor="middle">used by wheelchairs, strollers, suitcases, bikes and carts</text>',
        tall: 112, cap: 'A curb seen from the side, before and after a curb cut.' },
      { h: 'My proposal' },
      'In 2005, Ontario passed a law that set a goal: an <b>accessible</b> province by 2025. That year has come and gone, and the goal has not been met. We do not have to wait for someone else. I am asking the council to do three things. First, walk through our school with students who have disabilities and list every barrier you find. Second, ask the principal to fix the stage first. Third, make sure every event we plan has a way in for everyone. This does not have to cost much to start. A walk-through takes one lunch hour, and listening is free. Sara should be able to come backstage next year. Thank you.',
      { box: 'Ask, do not assume', text: 'If you are not sure whether someone wants help, ask. Then listen to the answer.' }
    ],
    guide: { before: 'Talk about a place where getting in or around was hard for someone. Teach <b>barrier</b> and <b>accessible</b>.',
      after: 'Walk through your home or school together and list three barriers and how each could be fixed.' },
    words: [['barrier', 'something that blocks a person from getting in or taking part'], ['accessible', 'easy for everyone to reach, enter, use or understand']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which features show that this text is a speech?',
        opts: ['The speaker greets and thanks the audience and speaks to them directly.', 'It has a dateline.', 'It rhymes.', 'It lists ingredients.'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Why does Malik begin with the story about Sara?',
        opts: ['to make the problem real and personal for listeners', 'to show that Sara likes concerts', 'to complain about his cousin', 'to describe the ramp'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Which three kinds of barriers does Malik name?',
        opts: ['physical, information and attitude', 'money, weather and time', 'doors, stairs and ramps', 'school, home and work'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, who uses a curb cut?',
        opts: ['many people, including those with strollers and bikes', 'only people in wheelchairs', 'only drivers', 'no one'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'List the three things Malik asks the council to do.', cols: ['', 'Malik’s request'],
        rows: [['First', null], ['Second', null], ['Third', null]],
        a: [[null, 'walk through the school with students who have disabilities and list barriers'], [null, 'ask the principal to fix the stage first'], [null, 'make every event open to everyone']] },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Is Malik’s speech convincing? Which part persuaded you most, and why?',
        a: 'Answers will vary, for example the story about Sara or the curb-cut effect.', look: 'an opinion tied to a specific part of the speech' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Name one barrier in a place you know. How could it be fixed?',
        a: 'Answers will vary, for example a heavy door that could get an automatic button.', look: 'a real barrier and a sensible fix' },
      { k: 'choice', code: 'B3.2', q: 'In the box, what kind of sentence is “Then listen to the answer”?',
        opts: ['a command', 'a question', 'an exclamation', 'a statement of fact'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-two-row', subject: 'history', form: 'Report',
    title: 'Two Boats, One River',
    deck: 'The Two Row Wampum, a Haudenosaunee record of an agreement between equals',
    hero: {
      photo: 'g7-wampum.jpg', credit: 'Photo: Nosferattus, CC0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'Strands of wampum in a museum. The beads are made from white and purple shells.'
    },
    body: [
      'For the Haudenosaunee, the six nations of the Iroquois Confederacy, an agreement is not just words. It is something you can hold. Important promises were woven into belts of small shell beads called <b>wampum</b>. White beads come from whelk shells; purple beads come from the shell of the quahog clam. Each belt’s pattern stands for an agreement. Trained keepers learned to read the belts aloud and passed their meaning from one generation to the next.',
      { h: 'Two rows on a river' },
      'One of the most famous belts is the Two Row Wampum. According to Haudenosaunee history, it records an agreement made with Dutch traders in 1613, near what is now Albany, New York. The belt has two rows of purple beads running side by side on a white background. One row is a Haudenosaunee canoe. The other is a European ship. The two boats travel down the same river of life. Each carries its own people, laws and ways of life, and neither tries to steer the other.',
      { fig: '<rect class="k" x="80" y="20" width="200" height="74"/><rect class="h" x="80" y="34" width="200" height="10"/><rect class="h" x="80" y="70" width="200" height="10"/>' +
          '<text class="lb" x="72" y="43" text-anchor="end">canoe</text><text class="lb" x="72" y="79" text-anchor="end">ship</text>' +
          '<text class="n" x="180" y="61" text-anchor="middle">white: peace, friendship, respect</text>',
        tall: 104, cap: 'A sketch of the Two Row pattern. Two purple rows travel side by side, separated by white.' },
      { h: 'Equals on the water' },
      'The rows of white beads stand for peace, friendship and respect. The idea is that the two peoples will share the land and the river as equals for as long as the grass grows and the rivers flow. Many Haudenosaunee leaders see the Two Row as the basis of every <b>treaty</b> that came after, including agreements with Britain and later with Canada. The belt also carries a warning: no one can stand with one foot in the canoe and one in the ship. If the boats drift apart, that person falls into the river.',
      { box: 'History in a belt', text: 'Some historians have asked for written proof of the 1613 agreement. Haudenosaunee people point out that the belt itself is the record, and that history kept by trained keepers is real evidence.' },
      { h: 'Paddling together' },
      'In 2013, to mark 400 years, hundreds of Haudenosaunee and non-Indigenous paddlers travelled down the Hudson River together in two lines, side by side, all the way to New York City. They wanted to remind people that the promise still matters. Today, when people argue about land, water or resources, the Two Row asks a simple question: are both boats being treated as equals?'
    ],
    guide: { before: 'Locate Haudenosaunee territory and the Hudson River on a map. Teach <b>wampum</b> and <b>treaty</b>.',
      after: 'Talk about a promise between two groups you know. How could it be recorded so it lasts 400 years?' },
    words: [['wampum', 'beads made from shells, woven into belts or strings to record agreements and events'], ['treaty', 'a formal agreement between nations']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What are wampum belts made of?',
        opts: ['small beads made from shells', 'carved wood', 'painted leather', 'woven grass'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the sketch, what do the two purple rows stand for?',
        opts: ['a canoe and a ship', 'two rivers', 'two wars', 'two chiefs'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Each boat travels on its own and “neither tries to steer the other.” What does this mean for the two peoples?',
        opts: ['Each keeps its own laws and ways of life.', 'They must race each other.', 'One must follow the other.', 'They will never meet.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the paddlers in 2013 travel in two lines, side by side?',
        opts: ['to act out the message of the belt', 'because the river was narrow', 'to win a race', 'to carry more people'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain the message of the Two Row Wampum in your own words.',
        a: 'Two peoples share the land as equals, each following its own ways, in peace, friendship and respect.', look: 'equals, own ways, peace and respect' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Read the box. Why do you think the author included it? What does it show about whose records count as evidence?',
        a: 'To show that oral history and belts are real records, not only written documents.', look: 'oral history and the belt count as evidence' },
      { k: 'choice', code: 'C1.5', q: 'How is the report organized?',
        opts: ['It explains wampum, describes one belt and its meaning, then shows why it matters today.', 'It gives steps for making a belt.', 'It compares two museums.', 'It tells a made-up story.'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Why is there a semicolon in “White beads come from whelk shells; purple beads come from…”?',
        opts: ['to join two closely related sentences', 'to start a list', 'to show a quotation', 'to end a question'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-fundy', subject: 'geography', form: 'Report',
    title: 'The Bay That Breathes',
    deck: 'Why the Bay of Fundy has the highest tides in the world',
    hero: {
      photo: 'g7-fundy.jpg', credit: 'Photo: Share Bear, public domain, Wikimedia Commons', focus: '50% 60%',
      tall: 200,
      cap: 'Low tide at the Bay of Fundy. In about six hours, water will cover this beach and climb high up the rocks.'
    },
    body: [
      'Twice a day, the Bay of Fundy, between New Brunswick and Nova Scotia, empties and fills like a giant bathtub. At the Hopewell Rocks, visitors can walk on the sea floor at low tide, among tall rock pillars topped with trees. About six hours later, the same spot is under water deep enough for kayaks. Many visitors come back twice in one day to see both. The bay has the highest tides in the world.',
      { h: 'How high?' },
      'The difference in height between high and low tide is called the <b>tidal range</b>. On most ocean coasts it is a metre or two. In the Minas Basin, at the top end of the bay, it can reach about 16 m, as tall as a four-storey building. Each tide moves about 100 billion tonnes of water in and out of the bay, more than the flow of all the world’s rivers combined.',
      { fig: [['Bay of Fundy', 16, '16 m'], ['Vancouver', 5, '5 m'], ['Halifax', 2, '2 m'], ['Lake Ontario', 0.1, 'a few cm']].map(function (r, i) { var y = 14 + i * 28; return '<text class="l" x="94" y="' + (y + 13) + '" text-anchor="end">' + r[0] + '</text><rect class="' + (i ? 'k' : 'h') + '" x="100" y="' + y + '" width="' + r[1] * 10 + '" height="18"/><text class="n" x="' + (106 + r[1] * 10) + '" y="' + (y + 13) + '">' + r[2] + '</text>'; }).join('') +
          '<text class="n" x="100" y="130">largest tidal range, in metres</text>',
        tall: 136, cap: 'The largest tidal range at four places. Lake Ontario has almost no tide at all.' },
      { h: 'Why here?' },
      'Tides are caused mostly by the Moon’s gravity, which pulls the ocean into a bulge that moves around Earth. Every coast feels it, so why is Fundy special? Part of the answer is shape. The bay is wide at its mouth and gets narrower and shallower toward its head, like a funnel. Water pushed in has nowhere to go but up. The bigger part is timing. Water in the bay naturally sloshes back and forth about once every 13 hours, very close to the 12 hours and 25 minutes between high tides. Each new tide arrives just in time to add to the slosh, the way well-timed pushes make a swing go higher. Scientists call this <b>resonance</b>.',
      { box: 'Check the tide table', text: 'The tide can rise quickly over Fundy’s mud flats. People who explore the sea floor check a tide table first and leave with plenty of time to spare.' },
      { h: 'Living with the tides' },
      'The tides shape life around the bay. Mud flats left bare at low tide feed huge flocks of migrating shorebirds each summer. The Mi’kmaq have fished and gathered food along these shores for thousands of years. Engineers have long dreamed of using the tides to make electricity, but the same strong currents that make the idea attractive also break equipment and can harm fish.'
    ],
    guide: { before: 'Find the Bay of Fundy on a map. Teach <b>tidal range</b> and <b>resonance</b>. Push a swing or sway in a chair to feel well-timed pushes.',
      after: 'Use the chart to compare tidal ranges, then measure 16 m outside to see how high the water rises.' },
    words: [['tidal range', 'the difference in height between high tide and low tide'], ['resonance', 'when pushes come at just the right rhythm and make a movement grow bigger']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. How many times greater is the tidal range at the Bay of Fundy than at Halifax?',
        opts: ['8 times', '2 times', '14 times', '16 times'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'What mostly causes tides?',
        opts: ['the Moon’s gravity', 'strong winds', 'melting ice', 'rivers flowing into the sea'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The author compares the tides to pushing a swing. What does this help you understand?',
        opts: ['Pushes at the right moment build a bigger movement.', 'Swings are found near the bay.', 'Water moves in circles.', 'Tides are a kind of game.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The bay is wide at its <b>mouth</b>. What is the mouth of a bay?',
        opts: ['the opening where it meets the open sea', 'its deepest point', 'a cave in the cliffs', 'a river that feeds it'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Explain the two reasons the Fundy tides are so high.', cols: ['Reason', 'How it makes the tide higher'],
        rows: [['shape', null], ['timing', null]],
        a: [[null, 'the bay narrows and gets shallower, so the water has to rise'], [null, 'the bay’s natural slosh matches the tides, so each tide adds to it']] },
      { k: 'lines', code: 'C2.3', n: 3, q: 'A family arrives at the Hopewell Rocks at low tide and plans to stay on the sea floor all afternoon. Predict what will happen, and give them advice.',
        a: 'The tide will come back in within hours and cover the beach. They should check a tide table and leave early.', look: 'the returning tide and sensible advice' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Resonance is a tricky idea. What did you do to understand it?',
        a: 'Answers will vary, for example rereading, thinking about the swing comparison, or looking at the 13-hour and 12-hour times.', look: 'a named strategy' },
      { k: 'choice', code: 'C1.5', q: 'Which question does the section “Why here?” answer?',
        opts: ['Why are Fundy’s tides so much higher than elsewhere?', 'Where do the shorebirds go?', 'Who lives near the bay?', 'How do kayaks float?'], a: 0 }
    ]
  });

  P.add({
    id: 'g7-interpreter', subject: 'story', form: 'Short story',
    title: 'Don’t Make It Nice',
    deck: 'A girl speaks for her mother at the doctor’s office',
    hero: {
      photo: 'g7-waiting-room.jpg', credit: 'Photo: Kurt Kaiser, CC0, Wikimedia Commons', focus: '50% 60%',
      tall: 200,
      cap: 'A quiet waiting room at a doctor’s office.'
    },
    body: [
      'Thảo had already missed math class twice this month. She did not mind missing math. She minded the waiting room: the hum of the lights, the smell of hand sanitizer, the chairs in a stiff row, and the clock that never seemed to move. Her mother sat beside her, holding her purse on her lap with both hands, the way she always did when she was nervous.',
      '“Tell me everything the doctor says,” her mother said in Vietnamese. “Everything. Don’t make it nice.”',
      '“I know, Mẹ.”',
      { h: 'Big words' },
      'Dr. Okafor was kind, and she spoke quickly. She looked at the numbers on her screen and frowned a little. “Your mother’s blood pressure is still high,” she said. “This is <b>hypertension</b>. I want to change the dosage of her medication and see her again in four weeks. If she gets chest pain or a very bad headache, she needs to go to emergency right away.”',
      'Thảo opened her mouth, and nothing came out. She knew the Vietnamese words for <i>rice</i>, <i>grandmother</i> and <i>hurry up</i>. She did not know a word for hypertension. She was not even sure what <i>dosage</i> meant in English. For a second, she thought about just saying, “The doctor says you are fine.” Her mother would smile. They could leave.',
      'Then she remembered. <i>Don’t make it nice.</i>',
      { fig: [['Dr. Okafor', 50], ['Thảo', 150], ['Mẹ (Mom)', 250]].map(function (p) { return '<rect class="' + (p[0] === 'Thảo' ? 'h' : 'k') + '" x="' + (p[1] - 42) + '" y="14" width="84" height="30" rx="6"/><text class="lb" x="' + p[1] + '" y="34" text-anchor="middle">' + p[0] + '</text>'; }).join('') +
          D.arrow(94, 29, 106, 29, 'a') + D.arrow(194, 29, 206, 29, 'a') +
          '<text class="n" x="50" y="66" text-anchor="middle">“hypertension”</text><text class="n" x="150" y="66" text-anchor="middle">“high blood pressure”</text><text class="n" x="250" y="66" text-anchor="middle">huyết áp cao</text>' +
          '<text class="n" x="100" y="86" text-anchor="middle">English</text><text class="n" x="200" y="86" text-anchor="middle">Vietnamese</text>',
        tall: 94, cap: 'A hard word has to become plain words before Thảo can turn it into Vietnamese.' },
      { h: 'Asking' },
      '“Sorry,” Thảo said, and her face went hot. “Can you say that in easier words? I don’t know how to say some of it.”',
      'Dr. Okafor stopped typing. “Of course. That’s my fault.” She explained slowly: high blood pressure, a stronger pill, one each morning, come back next month. She wrote the warning signs on a card in big letters. Thảo turned each sentence into Vietnamese, carefully, and her mother nodded and asked two questions of her own.',
      { h: 'Next time' },
      'At the front desk, the receptionist leaned over. “Next visit, we can book an <b>interpreter</b> on the phone,” she said. “Someone trained in medical words. You could stay in school.”',
      'On the bus home, her mother squeezed her hand. “You did well,” she said. Thảo looked out the window at the snow. She felt proud, and tired, and a little relieved that next time she might get to sit in math class after all.'
    ],
    guide: { before: 'Ask if the child has ever had to explain something for someone else. Teach <b>hypertension</b> and <b>interpreter</b>. Mẹ (say “meh”) means Mom in Vietnamese.',
      after: 'Role-play: one person says a hard sentence, the other asks for easier words and then explains it.' },
    words: [['hypertension', 'the medical word for high blood pressure'], ['interpreter', 'a person who turns spoken words from one language into another']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'From whose point of view do we mostly see the story?',
        opts: ['Thảo’s', 'Dr. Okafor’s', 'her mother’s', 'the receptionist’s'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Thảo’s mother say “Don’t make it nice”?',
        opts: ['She wants the whole truth, even if it is bad news.', 'She wants Thảo to be rude.', 'She does not trust the doctor.', 'She wants to leave quickly.'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why is Thảo tempted to say “The doctor says you are fine”?',
        opts: ['She does not know the words and wants it to be over.', 'The doctor said so.', 'Her mother asked her to.', 'She is late for math.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, what must happen to “hypertension” before Thảo can translate it?',
        opts: ['It must become plain English words.', 'It must be written down.', 'It must be shouted.', 'It must be spelled backward.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How does Thảo change from the start of the visit to the end? What helps her change?',
        a: 'She goes from frozen and tempted to hide the truth to brave enough to ask for easier words. Remembering her mother’s words helps.', look: 'a change and what causes it' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Have you ever had to explain something for someone else, or not known a word you needed? How did that help you understand Thảo?',
        a: 'Answers will vary.', look: 'a real experience linked to Thảo’s feelings' },
      { k: 'choice', code: 'C1.5', q: 'What is the turning point of the story?',
        opts: ['Thảo remembers “Don’t make it nice” and asks for easier words.', 'They get on the bus.', 'The receptionist leans over.', 'Thảo misses math class.'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Why are <i>rice</i>, <i>grandmother</i> and <i>hurry up</i> in italics?',
        opts: ['They are being talked about as words.', 'They are shouted.', 'They are titles of books.', 'They are spelled wrong.'], a: 0 }
    ]
  });

  /* ---------- reading-test style: stories, poems, humour, interviews, journals, posters and letters, with line numbers ---------- */

  P.add({
    id: 'g7-pressure-ridge', subject: 'story', form: 'Short story', lines: true,
    title: 'The Pressure Ridge',
    deck: 'Dev is sure the ice is safe. His grandmother is not so sure.',
    hero: {
      photo: 'g7-ice-huts.jpg', credit: 'Photo: RobbieFrench, CC BY 2.0, Wikimedia Commons', focus: '50% 60%',
      tall: 200,
      cap: 'Ice-fishing huts on a frozen lake. Some lakes in Ontario have hundreds of huts each winter.'
    },
    body: [
      'By the third week of January, the bay in front of the lodge had become a temporary village. Fishing huts painted red, blue and faded green stood in crooked rows, and pickup trucks crept between them as cautiously as if they were driving on glass. Dev had waited impatiently all winter for his grandmother to declare the ice ready. Now, finally, they were hauling her plywood hut toward the point, where the pickerel gathered in deep, dark water.',
      'Nani walked ahead of the sled with an <b>auger</b> balanced over her shoulder. Every twenty steps she stopped, drilled a hole and lowered a measuring tape into the water. Dev considered this an enormous waste of time. Half the county was already out here, and if the ice could support a truck, it could certainly support a grandmother, a thirteen-year-old and a hut that smelled faintly of propane and elderly sandwiches.',
      '“Thirty centimetres,” Nani announced at the first hole, and “twenty-eight” at the second. Near the point, however, she crouched over the measurement for a long, silent moment before she said, “Fifteen.”',
      '“Fifteen is still fine,” Dev argued. “The sign at the boat launch says ten centimetres is enough for walking.”',
      '“The sign doesn’t live here,” Nani replied, and pointed with her mitt. A few metres ahead, the snow rose into a long, irregular hump that stretched across the bay like the spine of a sleeping animal. Where the hump had split open, the slush underneath was the colour of wet cement.',
      'Dev recognized it immediately, because she had explained it every winter since he was six. As lake ice expands and contracts with changes in temperature, neighbouring sheets push against each other until they buckle. The result is a <b>pressure ridge</b>, and the ice surrounding one can be dangerously thin, fractured or concealing open water. Fishers who ignored the ridges were the reason the local radio station read out names every March.',
      '“The pickerel are on the other side,” he muttered anyway.',
      '“Then the pickerel are fortunate today.”',
      'They set up two hundred metres back, in water too shallow for anything except perch. Dev drilled the holes without speaking, letting the auger complain on his behalf. For an hour, nothing bit. Through the hut’s small window he watched a blue truck idling along the ridge while its driver searched for a crossing.',
      'Then came a sound Dev had never heard before: a long, low groan, as though the entire lake had shifted uneasily in its sleep. The blue truck stopped. Its driver climbed out, stood motionless for several seconds and then, very deliberately, began reversing along his own tracks.',
      'Nani did not look up from her line. She said absolutely nothing, which Dev decided was considerably worse than “I told you so.”',
      'At four o’clock, with nine perch in the bucket and the sky turning the colour of a bruise, they packed up. On the long walk to shore, Dev carried the auger without being asked. At every twentieth step, he stopped and drilled.'
    ],
    guide: { before: 'Ask: have you ever been told to be careful when you were sure there was no danger? Show how ice thickness is checked (a hole and a tape measure). Point out the line numbers and practise finding line 15. Teach <b>auger</b> and <b>pressure ridge</b>.',
      after: 'Nani never explains why she said nothing. Why do you think silence worked better than a lecture?' },
    words: [['auger', 'a large hand drill for boring holes in ice'], ['pressure ridge', 'a raised line of broken ice where two sheets of lake ice push together']],
    qs: [
      { k: 'choice', code: 'C3.2', q: '“The sign doesn’t live here” ({line:live}). Nani means that',
        opts: ['the sign at the boat launch is old and faded', 'a general rule may not fit this exact spot on the lake', 'she cannot read the sign from so far away', 'someone has moved the sign'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'The ridge runs across the bay “like the spine of a sleeping animal” ({line:spine}). This simile suggests that the ridge',
        opts: ['is soft and warm', 'is long and raised, and could “wake” and move', 'is the safest place to cross', 'is covered in fur-like frost'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:buckle}, “buckle” means',
        opts: ['bend and push upward', 'fasten with a clip', 'melt quickly', 'freeze solid'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who tells this story?',
        opts: ['Dev, using “I”', 'Nani, using “I”', 'a narrator outside the story who follows Dev’s thoughts', 'the driver of the blue truck'], a: 2 },
      { k: 'choice', code: 'C3.2', q: 'The radio station “read out names every March” ({line:radio}). This detail suggests that',
        opts: ['people won prizes for the biggest fish', 'people have gone through the ice near ridges', 'the radio station sponsors the lodge', 'March is the best month for fishing'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'In the last line, Dev stops and drills at every twentieth step. What does this show about how he has changed? Use evidence from the beginning of the story.',
        a: 'At the start Dev thought Nani’s checking was a waste of time. After the groan and the truck backing up, he takes the auger and checks the ice himself. He now respects her caution.', look: 'the change (impatient to careful or respectful), with one detail from the beginning and one from the end' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'How would the story be different if Nani told it? Give one example of something we would learn.',
        a: 'We would learn what she was thinking when she measured fifteen centimetres, and why she chose to stay silent instead of saying “I told you so.”', look: 'a clear change in point of view and a specific detail that would be added or lost' }
    ]
  });

  P.add({
    id: 'g7-freeze-up', subject: 'story', form: 'Poem', lines: true,
    title: 'Freeze-Up',
    deck: 'A poem about a lake from October to midwinter',
    hero: {
      photo: 'g7-lake-huron-ice.jpg', credit: 'Photo: Ryan Hodnett, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'Ice forming along the shore of Lake Huron at Sarnia, Ontario.'
    },
    body: [{ box: 'Singing ice', text: 'New, thin ice that has formed on a calm, cold night can “sing” when a stone or a skate slides across it. The sound travels through the ice sheet, so it seems to come from far away.' }].concat(verses(['In October the lake still talks all night,', 'slapping the dock, rattling the <b>moored</b> boats,', 'arguing with the wind about nothing.', '',
        'In November it grows quieter.', 'Mornings bring a skin of ice,', 'lace-thin along the shore,', 'that breaks into tinkling plates', 'when the loons push through,', 'late to leave, as always.', '',
        'Then comes one windless night,', 'the stars so sharp they seem to crackle,', 'and the lake holds its breath', 'from the point to the far bay.', '',
        'At sunrise my father walks down', 'and tosses a stone, the old test.', 'It <b>skitters</b>, singing,', 'a high, strange note', 'like a wire plucked in another room.', '',
        'All winter the lake will keep its secrets', 'under a lid of white:', 'the slow fish, the sunken log,', 'the paddle I lost in August.', '',
        'But at night, when the cold deepens,', 'it booms and cracks and groans,', 'as if it were remembering out loud', 'that it was once water', 'and will be again.'])),
    guide: { before: 'If you can, play a recording of “singing ice” (a stone skidding on new ice). Read the poem aloud once while the child follows, then have them read it. Remind them that line numbers count only the lines of the poem. Teach <b>moored</b> and <b>skitters</b>.',
      after: 'Which season does your area change most in? What would you write about it?' },
    words: [['moored', 'tied up so it will not drift away'], ['skitters', 'skids and bounces quickly across a surface']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'In the first verse, the lake “talks,” and argues “with the wind.” The poet is using',
        opts: ['personification', 'a list', 'rhyme', 'a question'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'How are the verses of the poem organized?',
        opts: ['from the most important idea to the least', 'in time order, from autumn into winter', 'as a problem and its solution', 'as a set of questions and answers'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Lace-thin” ({line:lace}) describes ice that is',
        opts: ['very thin and full of holes', 'thick and strong', 'dirty and grey', 'smooth like glass'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does the father toss a stone onto the lake ({line:tosses})?',
        opts: ['to scare the loons away', 'to test whether the new ice is solid', 'to break the ice for the boats', 'to hear an echo from the far bay'], a: 1 },
      { k: 'choice', code: 'C1.5', q: 'The lake “holds its breath” ({line:breath}). This phrase helps the reader picture',
        opts: ['a lake that is angry', 'the moment the whole lake goes still and freezes', 'a loon diving under water', 'waves crashing on the dock'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'This poem is mainly about',
        opts: ['how to go ice fishing safely', 'a lake changing as it freezes, and the speaker watching it', 'a paddle that was lost in August', 'loons getting ready to fly south'], a: 1 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Read the last verse. What idea do the final two lines suggest about the lake, and about change?',
        a: 'The ice is not forever: the lake remembers it was water and will melt again in spring. Change goes in a cycle, and things that seem frozen will come back.', look: 'the idea of a cycle or return (spring, melting), tied to “once water” and “will be again”' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which image in the poem was easiest for you to picture? Explain how picturing it helped you understand the poem.',
        a: 'Example: I pictured the stone skidding and singing on the new ice. It helped me understand that the ice was thin and new and that the father was testing it.', look: 'a specific image named, and how visualizing helped the reader understand' }
    ]
  });

  P.add({
    id: 'g7-second-chair', subject: 'story', form: 'Short story', lines: true,
    title: 'Second Chair',
    deck: 'Lucía practised for five months. Her best friend practised on the bus.',
    hero: {
      photo: 'g4-orchestra.jpg', credit: 'Photo: Reg Natarajan, CC BY 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 190,
      cap: 'An orchestra on stage. In each violin section, two players share a music stand.'
    },
    body: [
      'The list went up on the music room door at 3:15 on a Friday, which Lucía later decided was the cruellest possible time, because it gave her an entire weekend to think about it. First violin, first chair: Grace Adeyemi. First violin, second chair: Lucía Morales.',
      'Lucía read the words three times, as if they might rearrange themselves out of sympathy. She had practised for five months, ninety minutes every evening, until her mother joked that the neighbours could probably hum the audition piece from memory. Grace, as far as Lucía knew, had practised on the bus.',
      'It was not that Grace was lazy. It was worse than that: she was gifted. Music came out of her the way breath comes out of other people, without effort or permission. Lucía had once watched her sight-read a piece that had taken Lucía three exhausting weeks to learn, and perform it better on the first attempt.',
      'On Monday the two of them sat side by side at the front of the youth orchestra, sharing a single music stand, as the first and second chairs traditionally do. Lucía turned the pages, because that is the second chair’s responsibility. She turned them precisely, a little too sharply, so that the paper snapped.',
      'Halfway through rehearsal, Mr. Benoit tapped his baton against the podium. “Let’s hear the solo at bar forty. First chair, please.”',
      'Lucía waited for the first note. It did not come.',
      'She glanced sideways. Grace was holding her bow motionless above the strings, and her face had gone the colour of the music stand. Her bow hand was trembling so violently that Lucía could see the horsehair <b>quiver</b>. Sixty musicians were waiting in an uncomfortable silence. Somebody in the cello section coughed.',
      'For one ugly second, Lucía felt something resembling satisfaction. Then she remembered the auditions in October, when Grace had performed with her eyes tightly closed and then hurried out of the room without speaking to anyone. Grace had been sick in the washroom afterward. Lucía had assumed, at the time, that it was the flu.',
      'Without lifting her own violin, Lucía leaned slightly toward her friend and hummed the first two notes of the solo, very quietly, the way you might remind someone of a phone number they had momentarily forgotten.',
      'Grace blinked. Her bow came down. The solo began a little unsteadily and then, within four bars, became the sound Lucía remembered from the auditions: clear, effortless and generous, filling the hall to its corners.',
      'Afterward, while they were packing up, Grace spoke without looking at her. “I can play when nobody’s listening,” she said. “You can play when everyone is. I’ve always been <b>envious</b> of that.”',
      'Lucía had never once imagined herself as someone worth envying. She closed her case, gently this time. “Bar forty,” she said. “Same time Thursday?”'
    ],
    guide: { before: 'Explain “first chair” and “second chair” in an orchestra (the leader and the helper who shares the stand). Ask: have you ever been jealous of a friend? Teach <b>quiver</b> and <b>envious</b>.',
      after: 'Grace and Lucía have different strengths. What is a strength of yours that someone else might not notice?' },
    words: [['quiver', 'shake with small, quick movements'], ['envious', 'wishing you had what someone else has']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Why does Lucía think 3:15 on a Friday is “the cruellest possible time” ({line:cruellest})?',
        opts: ['The music room closes early on Fridays.', 'She has the whole weekend to dwell on the result.', 'She misses her bus because of the list.', 'Grace sees the list first.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'Music came out of Grace “the way breath comes out of other people” ({line:breath}). This simile shows that Grace plays',
        opts: ['loudly', 'naturally, without trying hard', 'only when she is out of breath', 'wind instruments as well as violin'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Lucía turns the pages “a little too sharply” ({line:sharply}). This shows she is',
        opts: ['careless', 'resentful', 'in a hurry', 'nervous'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Sight-read” ({line:sight}) means to play music',
        opts: ['from memory', 'the first time you see it', 'while looking at the audience', 'very slowly'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Lucía’s feelings toward Grace change during the story. Which best describes the change?',
        opts: ['from resentment to understanding', 'from friendship to anger', 'from fear to boredom', 'from pride to shame'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'When Lucía asks, “Same time Thursday?” ({line:Thursday}), she is most likely',
        opts: ['asking Grace to practise the solo with her', 'offering to help Grace again at the next rehearsal', 'telling Grace she wants first chair', 'checking the rehearsal schedule'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Lucía remember the auditions in October at the moment Grace freezes? What does she realize?',
        a: 'She remembers Grace being sick after playing. She realizes Grace was not ill but terrified of performing: Grace has stage fright.', look: 'the memory (sick after auditions) linked to the realization (stage fright, not flu)' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What message about talent and hard work does the story give? Use one detail about each girl.',
        a: 'Different people have different strengths. Grace has natural talent but freezes in front of others; Lucía works hard and stays calm under pressure. Each can help the other.', look: 'a message that weighs both girls, with a detail about Grace and one about Lucía' }
    ]
  });

  P.add({
    id: 'g7-goose-memos', subject: 'story', form: 'Humour (memos)', lines: true, plain: true,
    title: 'Re: The Goose',
    deck: 'Five memos from a principal to the staff of Riverside Public School',
    hero: {
      photo: 'g7-goose-nest.jpg', credit: 'Photo: Paul F. Kisak, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'A Canada goose on her nest. A goose usually lays four to seven eggs and sits on them for about four weeks.'
    },
    body: [
      '<b class="ps-who">April 3 · To: All staff · Subject: Front entrance</b>',
      'A Canada goose has constructed a nest in the garden bed beside the front entrance. Canada geese are protected under federal legislation, so the nest may not be relocated or disturbed in any way. Please use the side doors until further notice. I apologize for the inconvenience.',
      '<b class="ps-who">April 5 · To: All staff · Subject: Re: Front entrance</b>',
      'Several staff members have asked whether the goose has a name. It does not. Please stop referring to it as “Gertrude” in front of students. We are a professional organization.',
      '<b class="ps-who">April 9 · To: All staff · Subject: Re: Re: Front entrance</b>',
      'Mr. Pham reports that Gertrude hissed at him for eleven consecutive minutes on Tuesday after he attempted to retrieve a basketball from the garden. Staff are reminded that a nesting goose will defend her eggs against anyone who approaches within approximately three metres. Do not attempt to reason with her. I have tried. Furthermore, the side doors are now attracting a considerable crowd of students at 8:40 each morning. I am informed that this is because the side doors provide the best view of the nest.',
      '<b class="ps-who">April 16 · To: All staff · Subject: Goose (update)</b>',
      'The Grade 7 science class has installed a motion-activated camera on the library windowsill and is maintaining a nesting log, complete with temperature readings, labelled sketches and a graph showing how frequently Gertrude rotates her eggs. I have reviewed the log. It is the most <b>meticulous</b> piece of work I have encountered this year. Attendance has increased. Late slips have decreased. I am not suggesting that the goose is responsible. I am simply reporting the data.',
      '<b class="ps-who">May 2 · To: All staff · Subject: Gertrude</b>',
      'At 6:52 this morning, according to the Grade 7 camera, five goslings hatched. By 9:15, Gertrude and her mate had escorted them in a single, unhurried line across the staff parking lot, down the embankment and into Willow Creek. Twelve staff members, two bus drivers and one principal stopped traffic to let them pass.',
      'The front doors are open again, and students may discontinue the expression “goose shift” for the side-door crowd. I would like to thank the Grade 7 class for their careful research, Mr. Pham for his patience, and Gertrude for a <b>remarkable</b> April.',
      'P.S. I have kept one grey feather on my desk. I am told that this is not professional. I have kept it anyway.'
    ],
    guide: { before: 'Show what a memo is (date, who it is to, subject line, short and formal). Explain that the humour comes from serious, formal words used about something silly. Teach <b>meticulous</b> and <b>remarkable</b>.',
      after: 'Rewrite one memo as a text message from the principal to a friend. What changes when the tone changes?' },
    words: [['meticulous', 'very careful about every small detail'], ['remarkable', 'worth noticing; unusual in a good way']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows that these are memos?',
        opts: ['rhyming lines', 'a date, who they are to and a subject line', 'a list of characters', 'chapter titles'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Retrieve” ({line:retrieve}) means',
        opts: ['throw', 'get back', 'hide', 'kick'], a: 1 },
      { k: 'choice', code: 'C1.5', q: 'Much of the humour in the memos comes from',
        opts: ['jokes told by the students', 'serious, formal language used about a goose', 'silly rhymes and made-up words', 'the principal falling down'], a: 1 },
      { k: 'choice', code: 'C3.2', q: '“Do not attempt to reason with her. I have tried.” ({line:reason}) What can you infer about the principal?',
        opts: ['The principal once tried to talk the goose into leaving, and failed.', 'The principal speaks goose.', 'The principal is afraid of Mr. Pham.', 'The principal has never seen the goose.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'In the April 16 memo, the principal says, “I am not saying the goose is responsible” ({line:responsible}). The principal really means',
        opts: ['the goose has nothing to do with it', 'the goose probably is the reason students come on time, but a principal cannot say so', 'attendance is a problem', 'the data is wrong'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'How does the principal’s attitude toward the goose change from April 3 to May 2?',
        opts: ['from fondness to annoyance', 'from formal annoyance to real affection', 'from fear to anger', 'it does not change'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'On April 5 the principal tells staff not to call the goose “Gertrude.” What is funny about the memo of April 9? Use evidence.',
        a: 'Only four days later, the principal is calling the goose Gertrude too: “Gertrude hissed at him.” The rule did not even last for the principal.', look: 'the contrast between the April 5 rule and the principal using the name on April 9, with the quotation' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Why do you think the writer chose to tell this story as memos instead of as a regular story?',
        a: 'Memos are supposed to be serious and short, so the funny events stand out against the formal style. We also see the principal change only through small clues, which makes the reader work out the joke.', look: 'a reason linked to the memo form (formal tone, dates, short updates) and its effect on humour' }
    ]
  });

  P.add({
    id: 'g7-beluga-interview', subject: 'science', form: 'Interview', lines: true, plain: true,
    title: 'Canaries of the Sea',
    deck: 'A student podcast interviews a scientist who studies belugas in Churchill, Manitoba',
    hero: {
      photo: 'g7-belugas.jpg', credit: 'Photo: TravelingOtter, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 170,
      cap: 'Belugas in the Churchill River, Manitoba, where thousands gather each summer.'
    },
    body: [
      '<i>Each summer, more than 50 000 belugas gather in the estuaries where rivers empty into western Hudson Bay. Owen Cardinal, a Grade 7 student in Thompson, Manitoba, interviewed marine biologist Dr. Mariam Qureshi for his class podcast.</i>',
      '<b class="ps-who">Owen:</b> Why are belugas called “canaries of the sea”?',
      '<b class="ps-who">Dr. Qureshi:</b> Because they are remarkably noisy! Generations ago, sailors could hear them right through the wooden hulls of their ships. Belugas whistle, chirp, click and squeal. Some sounds are for communicating with each other, and others are for navigation.',
      '<b class="ps-who">Owen:</b> How do sounds help them navigate?',
      '<b class="ps-who">Dr. Qureshi:</b> Belugas use <b>echolocation</b>. A beluga sends out rapid clicks through the rounded, fatty bump on its forehead, which is called the melon. The clicks bounce off a fish, a rock or the river bottom, and the echoes return to the whale. By interpreting those echoes, the whale builds a kind of sound picture of its surroundings. That ability is essential in a murky river, and even more important under sea ice, where a whale must locate a crack in order to breathe.',
      '<b class="ps-who">Owen:</b> Why do they return to Churchill every summer?',
      '<b class="ps-who">Dr. Qureshi:</b> The river water is warmer and shallower, which makes it safer for calves, and killer whales seldom follow them in. Belugas also <b>moult</b> here: they rub against the gravel on the river bottom to scrape off old, yellowed skin. Imagine removing a winter coat by rolling around on a beach.',
      '<b class="ps-who">Owen:</b> What does your work look like on an ordinary day?',
      '<b class="ps-who">Dr. Qureshi:</b> We lower underwater microphones called hydrophones from a small boat and record for hours. Then I spend weeks at a computer, identifying and sorting the sounds. Honestly, my job is mostly listening. People imagine scientists in wetsuits chasing whales, but on most days I am wearing headphones and drinking cold coffee.',
      '<b class="ps-who">Owen:</b> Are belugas in danger?',
      '<b class="ps-who">Dr. Qureshi:</b> The western Hudson Bay population is healthy for now. However, the sea ice is breaking up earlier every decade, and more ships travel through the bay. Ship engines are extremely loud underwater. If the water is full of noise, a whale’s echolocation clicks can be drowned out, a bit like trying to hear a friend whisper at a hockey game. My recordings help us determine how much noise is too much, so that shipping routes and speeds can be planned more carefully.',
      '<b class="ps-who">Owen:</b> Last question. What is your favourite beluga sound?',
      '<b class="ps-who">Dr. Qureshi:</b> A mother and calf calling back and forth after they have been separated. It sounds like a creaky door being opened very politely. I have heard it a thousand times, and it still makes me smile.',
      { img: 'g7-echolocation.jpg', credit: 'Drawing: Uko Gorter, NOAA, public domain, Wikimedia Commons', tall: 150, cap: 'Echolocation in a toothed whale. Clicks travel out from the head (red) and echoes bounce back from a fish (blue). Belugas hunt the same way.' }
    ],
    guide: { before: 'Find Churchill and Hudson Bay on a map of Canada. Look at the echolocation drawing together and trace the clicks out and the echoes back. Teach <b>echolocation</b> (echo + location) and <b>moult</b>.',
      after: 'Dr. Qureshi says science is “mostly listening.” What else do you know that is mostly patient watching or listening?' },
    words: [['echolocation', 'finding things by sending out sounds and listening for the echoes'], ['moult', 'to shed old skin, fur or feathers']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why were belugas called “canaries of the sea”?',
        opts: ['They are yellow.', 'Sailors could hear their many sounds through ships’ hulls.', 'They fly out of the water.', 'They eat small birds.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the drawing, what do the blue lines show?',
        opts: ['the whale’s clicks going out', 'the echoes coming back from the fish', 'the ice above the whale', 'the river current'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'According to Dr. Qureshi, which is NOT a reason belugas come to the river each summer?',
        opts: ['The water is warmer.', 'It is safer for calves.', 'They can rub off old skin on the gravel.', 'They come to find sea ice.'], a: 3 },
      { k: 'choice', code: 'C3.5', q: 'Which statement from the interview is an opinion?',
        opts: ['“Belugas use echolocation.” ({line:echolocation})', '“Ship engines are loud.” ({line:engines})', '“It still makes me smile.” ({line:smile})', '“We lower underwater microphones called hydrophones.” ({line:hydrophones})'], a: 2 },
      { k: 'choice', code: 'C3.1', q: 'Dr. Qureshi compares ship noise to “trying to hear a friend whisper at a hockey game” ({line:whisper}). The comparison helps listeners understand that',
        opts: ['belugas like hockey', 'loud noise can hide the quiet sounds whales need to hear', 'ships are as loud as whales', 'whales whisper to each other'], a: 1 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'In two or three sentences, summarize how echolocation works.',
        a: 'A beluga sends clicks through its melon. The clicks bounce off objects and come back as echoes. The whale uses the echoes to “see” what is around it.', look: 'the three steps (send clicks, echoes bounce back, whale interprets them) in the reader’s own words' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Dr. Qureshi says most of her job is listening, not chasing whales. Connect this to another job or activity you know about where the real work is different from what people imagine.',
        a: 'Example: People imagine firefighters always fight fires, but much of their work is inspections, training and medical calls.', look: 'a clear connection to another job or activity, comparing what people imagine with the real work' }
    ]
  });

  P.add({
    id: 'g7-tamarack', subject: 'story', form: 'Poem', lines: true,
    title: 'The Tamarack',
    deck: 'A poem about the evergreen that lets go',
    hero: {
      photo: 'g7-tamarack.jpg', credit: 'Photo: Anne Marie Peterson, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 250,
      cap: 'A tamarack in autumn. It is the only conifer in Canada whose needles turn gold and fall each year.'
    },
    body: [{ box: 'About tamaracks', text: 'The tamarack, or eastern larch, grows across Canada, from Newfoundland and Labrador to Yukon. It is a conifer, like a spruce or pine, but it is deciduous: it drops its needles every autumn and grows new ones in spring.' }].concat(verses(['Every fall, in the <b>bog</b> behind the school,', 'the tamarack does the thing', 'no other evergreen will do.', '',
        'Its needles turn the yellow of a candle flame,', 'and then, one windy week, they let go,', 'a whole tree’s worth, sifting down', 'onto the moss like slow gold rain.', '',
        'The spruces stay green, of course.', 'They stand around it, dark and certain,', 'like a crowd that has always known', 'exactly who it is.', '',
        'All winter the tamarack stands bare,', 'a skeleton among the coats,', 'and anyone walking past might think', 'that something has gone wrong.', '',
        'I know how that feels.', 'I have been the new kid three times,', 'in three provinces, with three accents', 'I had to shed like needles.', '',
        'But here is what the spruces don’t know:', 'in April the tamarack comes back first,', 'soft green <b>tufts</b> along every twig,', 'brighter than anything else in the bog.', '',
        'Letting go is not the same as losing.', 'Ask the tamarack.', 'It has done this every year', 'for a hundred years,', 'and it is still here.'])),
    guide: { before: 'Show a photo of a tamarack in autumn and in spring, or a spruce beside it. Explain that most conifers keep their needles all winter, but the tamarack drops them. Teach <b>bog</b> and <b>tufts</b>. Read the poem aloud once, then have the child read it.',
      after: 'Have you ever had to let go of something (a place, a habit, a way of speaking)? What came back, or what grew instead?' },
    words: [['bog', 'wet, spongy ground made of moss and old plants'], ['tufts', 'small, soft bunches of needles, hair or grass']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'Who is the speaker of the poem?',
        opts: ['a tamarack tree', 'a student who has moved many times', 'a teacher at the school', 'a spruce tree'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:sifting}, “sifting down” means',
        opts: ['falling gently and lightly', 'crashing to the ground', 'blowing upward', 'staying stuck to the branches'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The spruces are “dark and certain, / like a crowd that has always known / exactly who it is” ({line:certain}). The spruces stand for',
        opts: ['teachers', 'people who have always belonged and never had to change', 'the new kid’s family', 'trees that are sick'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does the speaker say they “had to shed” their accents ({line:accents})?',
        opts: ['They lost their voice.', 'They changed how they spoke to fit in each new place.', 'They learned three new languages for fun.', 'Their teacher asked them to speak quietly.'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Which line best states the message of the poem?',
        opts: ['“The spruces stay green, of course.” ({line:course})', '“I have been the new kid three times” ({line:kid})', '“Letting go is not the same as losing.” ({line:Letting})', '“onto the moss like slow gold rain” ({line:moss})'], a: 2 },
      { k: 'lines', code: 'C3.1', n: 4, q: 'The whole poem compares the speaker to the tamarack. Explain two ways they are alike, using lines from the poem.',
        a: 'Both have to let go of something: the tree drops its needles and the speaker sheds accents. Both seem strange or “wrong” to others for a while, but both come back strong, like the green tufts in April.', look: 'two clear similarities (letting go, looking different, coming back), each supported by a line' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'How might this poem help a student who has just moved to a new school? Explain.',
        a: 'It shows that changing to fit in is not the same as losing yourself, and that the hard, bare time does not last. In time you grow back stronger.', look: 'a connection to the experience of moving, linked to the poem’s message' }
    ]
  });

  P.add({
    id: 'g7-klondike-diary', subject: 'history', form: 'Diary', lines: true, plain: true,
    title: 'Over the Pass',
    deck: 'From the diary of Annie Lindqvist, who joined the Klondike Gold Rush in 1898 (a made-up diary based on real events)',
    hero: {
      photo: 'g8-chilkoot.jpg', credit: 'Photo: 1898, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 150,
      cap: 'Stampeders and their supplies below the summit of the Chilkoot Pass in 1898. The line of climbers is the “Golden Stairs.”'
    },
    body: [
      '<b class="ps-who">February 14, 1898 · Dyea</b>',
      'Erik and I have landed on the beach at Dyea with forty boatloads of other travellers, every one of them shouting about gold. Since the news from Bonanza Creek reached Seattle last summer, half the world seems to have caught gold fever. Erik has it worst. I came because he is my only brother, and because somebody in this family ought to have sense.',
      '<b class="ps-who">March 2 · The Scales</b>',
      'Above us rise the Golden Stairs, roughly 1 500 steps carved into the snow, so steep that climbers lean forward until their noses nearly touch the ice. The North-West Mounted Police will not permit anyone to enter Canada without about a tonne of goods, enough provisions to survive a year. Nobody can carry that much at once, so we climb with one load, slide down and climb again. Today was our eleventh trip. Tlingit packers pass us easily, carrying loads for wealthier stampeders and charging by the pound. They are the only people on this mountain who appear to know exactly what they are doing.',
      '<b class="ps-who">March 20 · The summit</b>',
      'Our final load is at the top. A Mountie inspected our flour, bacon, beans and tools against his list, then collected the customs duty. A British flag snapped above his tent. Erik danced. I sat on a sack of rice and could not feel my feet.',
      '<b class="ps-who">May 29 · Lake Bennett</b>',
      'For two months we have camped beside the lake, sawing logs into planks and constructing a boat, while every tree for kilometres disappeared. This morning the ice finally broke, and thousands of vessels set off together, an astonishing <b>flotilla</b> of rafts, scows and leaking boxes with sails.',
      '<b class="ps-who">June 8 · Miles Canyon</b>',
      'The Mounties have ordered that women and children must walk around the rapids, and that only experienced pilots may steer boats through. Erik grumbled, but I watched two boats splinter against the rocks and did not grumble at all.',
      '<b class="ps-who">June 21 · Dawson City</b>',
      'We have arrived. Every creek for kilometres was <b>staked</b> long before we left Seattle. Men who sold everything they owned to come here are now selling their boots to afford the journey home. Erik sat on the riverbank all afternoon without speaking.',
      'Yet this evening a woman paid me two dollars for a loaf of bread, and a miner offered five for a pie. I have flour enough for a year. Tomorrow I will build an oven.',
      { fig: '<path class="d" d="M110 182 L280 102"/>' +
          '<path class="a" stroke-dasharray="5 4" d="M200 166 L190 140 L178 114 L150 80 Q118 48 70 20"/>' +
          place(200, 166, 'Dyea', 8, 4) + place(190, 140, 'Chilkoot Pass', 9, 4) + place(178, 114, 'Lake Bennett', 9, 4) + place(150, 80, 'Miles Canyon', 9, 4) + place(70, 20, 'Dawson City', 9, 4) +
          '<text class="n" x="22" y="62">Yukon River</text><text class="n" x="20" y="184">Pacific Ocean</text>' +
          '<text class="lb" x="236" y="96">Canada</text><text class="lb" x="236" y="160">Alaska</text>' +
          D.arrow(282, 58, 282, 26, 'k') + '<text class="lb" x="276" y="72">N</text>',
        tall: 188, cap: 'The Chilkoot route: from Dyea over the pass into Canada, then by boat down the Yukon River to Dawson City, about 900 kilometres in all.' }
    ],
    guide: { before: 'Find the Yukon and Dawson City on a map of Canada. Explain the Klondike Gold Rush in two sentences (gold found in 1896, about 100 000 people set out, few got rich). Teach <b>flotilla</b> and <b>staked</b> (claimed a piece of land for mining by marking it with posts).',
      after: 'Annie came “because somebody in this family ought to have sense.” Was she right to come? Who really “struck gold” in her diary?' },
    words: [['flotilla', 'a large group of boats travelling together'], ['staked', 'claimed for mining by marking with wooden posts']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Where did Annie and Erik cross into Canada?',
        opts: ['at Dyea', 'at the Chilkoot Pass', 'at Dawson City', 'at Miles Canyon'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Gold fever” ({line:fever}) is',
        opts: ['an illness from cold water', 'a strong, excited wish to get rich from gold', 'a kind of medicine', 'the colour of gold'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Why did stampeders have to climb the Golden Stairs many times?',
        opts: ['The police required about a tonne of supplies, which could not be carried at once.', 'The stairs kept melting.', 'They were training for the trip.', 'The Tlingit packers would not help anyone.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Annie writes that the Tlingit packers “are the only people here who seem to know what they are doing” ({line:packers}). This suggests that',
        opts: ['the packers had long experience of the trail, unlike the newcomers', 'the packers were looking for gold too', 'Annie did not trust the packers', 'the packers were Mounties'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Which detail early in the diary hints that Annie, not Erik, will find a way to succeed?',
        opts: ['“all of us shouting about gold”', '“somebody in this family ought to have sense”', '“Erik danced”', '“thousands of boats set off together”'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What will Annie most likely do in Dawson City? Use two details from the last entry to explain.',
        a: 'She will open a bakery. People paid her two dollars for bread and five for a pie, she has a year of flour, and she plans to build an oven.', look: 'the inference (selling baking) with two supporting details (prices paid, flour, oven)' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'This diary shows the gold rush from a stampeder’s point of view. Whose point of view is missing, and what might they say?',
        a: 'The Tlingit and other First Nations whose land the trail crossed. They might say thousands of strangers cut the trees, hunted the animals and changed their land, while the packers earned money from the rush.', look: 'a missing perspective (First Nations, Mounties, miners who went home) and a reasonable view they might hold' }
    ]
  });

  P.add({
    id: 'g7-bluffs-poster', subject: 'geography', form: 'Poster', lines: true, plain: true,
    title: 'Hold the Bluffs!',
    deck: 'A poster on the community board at Bluffer’s Park, Toronto',
    hero: {
      photo: 'g7-bluffs.jpg', credit: 'Photo: The Cosmonaut, CC BY-SA 2.5 CA, Wikimedia Commons', focus: '50% 50%',
      tall: 170,
      cap: 'The Scarborough Bluffs rise above Lake Ontario on the east side of Toronto.'
    },
    body: [
      '<b class="ps-who">Spring Planting Day · Saturday, May 16 · 9 a.m. to 1 p.m. · Meet at the east parking lot</b>',
      { h: 'What is happening to the Bluffs?' },
      'The Scarborough Bluffs stretch for approximately 15 kilometres along Lake Ontario and rise as high as 90 metres. Their pale layers of sand and clay were deposited by ancient lakes, rivers and glaciers over tens of thousands of years. They took an extraordinarily long time to build. They can disappear surprisingly quickly.',
      'During every storm, waves pound the base of the cliffs and carry sand away. Rain soaks into the top, and groundwater seeping out of the cliff face loosens the layers from inside. Gradually, the slope is <b>undercut</b> until an entire section of the top collapses onto the beach. After an especially wet spring, the edge can retreat by more than a metre in a single year. Some backyards that once had a magnificent view of the lake now have a fence and a warning sign instead.',
      { h: 'How can planting help?' },
      'Engineers protect certain parts of the shoreline with walls of heavy rock. Higher up on the slopes, however, the most effective defence is alive. The roots of native plants such as little bluestem grass, wild strawberry and red osier dogwood spread through the soil like a net. They anchor it in place, absorb rainwater and slow the <b>runoff</b> that washes the slope away. A slope covered in roots erodes far more slowly than a bare one.',
      { h: 'What to bring' },
      'Work gloves, a water bottle, sturdy shoes and a hat. We provide the plants, shovels and refreshments. No experience is necessary: our experienced volunteers will demonstrate exactly what to do. Families are welcome, and secondary students can earn community volunteer hours.',
      { h: 'Stay safe' },
      'Never climb the Bluffs or walk near the edge at the top. Never stand at the base after heavy rain. Fenced areas are closed because they could collapse at any moment. All of our planting takes place on the gentle, stable slopes behind the park.',
      'Please join us. The Bluffs have stood here for thousands of years. With a few thousand roots, we can help them remain a little longer.',
      '<i>Organized by the East Shore Neighbours Stewardship Group. Questions? Ask at the park office.</i>',
      { fig: '<path class="k" d="M10 30 H120 Q140 30 150 60 L170 110 Q176 128 196 132 H290"/>' +
          '<path class="t" d="M10 52 H128 M10 74 H140 M10 96 H160"/><path class="d" d="M120 30 Q134 70 150 92"/>' +
          D.ripple(206, 290, 146, 'a') + D.arrow(250, 124, 204, 124, 'a') +
          '<path class="t" d="M172 118 q6 -10 12 0 t12 0"/>' +
          D.label(200, 22, 'rain soaks in', 100, 34) + D.label(250, 100, 'waves undercut', 196, 126) + '<text class="n" x="14" y="46">sand</text><text class="n" x="14" y="68">clay</text><text class="n" x="14" y="90">sand</text>' +
          '<text class="n" x="152" y="44">slump</text><text class="n" x="226" y="164">Lake Ontario</text>',
        tall: 172, cap: 'How the Bluffs erode. Waves undercut the base, and water from rain loosens the layers until a section of the top slumps (dashed line).' }
    ],
    guide: { before: 'Look at the diagram together first: follow the rain from the top and the waves at the bottom. Ask what a poster is for (to get people to do something). Teach <b>undercut</b> and <b>runoff</b>.',
      after: 'Is there a place near you that is changing or wearing away? What could your community do?' },
    words: [['undercut', 'worn away underneath, so the part above has no support'], ['runoff', 'rainwater that flows over the ground instead of soaking in']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What is the main purpose of this poster?',
        opts: ['to sell plants', 'to get people to volunteer at a planting day', 'to tell the history of Toronto', 'to warn people to stay away from the park'], a: 1 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Who put up the poster?',
        opts: ['the City of Toronto', 'a neighbourhood group that cares for the Bluffs', 'a garden store', 'a school'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'The poster is divided by headings in the form of questions and short phrases. How does this help readers?',
        opts: ['It makes the poster longer.', 'Readers can quickly find what they need, such as what to bring.', 'It shows the events in time order.', 'It hides the safety rules.'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'According to the diagram, what happens just after the base of the cliff is undercut?',
        opts: ['A section of the top slumps down.', 'Plants grow on the beach.', 'The lake freezes.', 'The layers of clay turn to sand.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Roots spread “like a net” ({line:net}). This comparison shows that roots',
        opts: ['catch fish in the lake', 'hold the soil together', 'grow very fast', 'are easy to pull up'], a: 1 },
      { k: 'choice', code: 'C1.5', q: '“They took an extraordinarily long time to build. They can disappear surprisingly quickly.” ({line:surprisingly}) The writer puts these two short sentences together to',
        opts: ['confuse the reader', 'stress the contrast and make the problem feel urgent', 'explain how glaciers work', 'make the poster funny'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how planting can help slow erosion. Use two details from the poster.',
        a: 'Roots hold the soil together like a net. They also soak up rainwater and slow the runoff that washes the slope away.', look: 'two details: roots holding soil, and soaking up or slowing water' },
      { k: 'lines', code: 'C1.2', n: 3, q: 'Why do you think the “Stay safe” section is on a poster that is asking people to come to the Bluffs?',
        a: 'The organizers want people to help, but the cliffs can collapse. They must make sure volunteers and visitors know to stay away from the edge and the base, and that planting happens only on safe slopes.', look: 'the tension between inviting people and keeping them safe, with a detail from the section' }
    ]
  });

  P.add({
    id: 'g7-teen-room-letter', subject: 'social', form: 'Letter', lines: true, plain: true,
    title: 'Open Until Eight',
    deck: 'A Grade 7 student writes to the library board',
    hero: {
      photo: 'g5-library.jpg', credit: 'Photo: Gogerr, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 160,
      cap: 'Inside a public library in Welland, Ontario. Public libraries are run by boards that answer to the town.'
    },
    body: [
      '<span class="ps-who">14 Cedar Lane, Fergus, Ontario · October 20</span>',
      'Dear Members of the Library Board,',
      'My name is Priya Nair, and I am a Grade 7 student at Centre Wellington Public School. I am writing to request that the library’s teen room remain open until 8 p.m. on weekdays, instead of closing at 5 p.m.',
      'The teen room is one of the busiest areas in the library. The library uses a door counter to <b>track</b> visits, and the chart below shows how many teenagers came each hour last month. Between 4 and 5 p.m., the room is so crowded that people sit on the floor. Then, at 5 o’clock, everyone has to leave. Many of us have nowhere quiet to go afterward. Some students share a bedroom with two or three younger siblings. Others have no reliable internet connection at home, even though many assignments are now completed online.',
      'Our class surveyed 80 students. Sixty-four said they would use the teen room after 5 p.m. at least once a week, and twenty said they would come almost every day. I think these numbers speak for themselves.',
      'I understand that extending the hours would cost money, because the library would need additional evening staff. However, I have three suggestions. First, the room could stay open late on three evenings instead of five. Second, secondary students who need community volunteer hours could assist at the desk. Third, the Friends of the Library already raises money every year through its book sale, and this would be a <b>worthwhile</b> way to spend some of it.',
      'Some adults worry that a room full of teenagers would be noisy. The teen room already has rules, and we respect them. In fact, students who have somewhere safe and quiet to study are less likely to be hanging around the parking lot, which is the situation people actually complain about.',
      'The library’s own sign declares, “Everyone belongs here.” At the moment, after 5 o’clock, that statement is not quite accurate for teenagers. Please give us the opportunity to demonstrate how much we would use this space. I would be glad to speak at your next meeting.',
      'Sincerely,',
      'Priya Nair',
      { fig: [['3 to 4', 46], ['4 to 5', 74], ['5 to 6', 0]].map(function (r, i) {
          var y = 18 + i * 36;
          return '<text class="l" x="44" y="' + (y + 16) + '" text-anchor="end">' + r[0] + '</text>' + (r[1] ? '<rect class="k" x="52" y="' + y + '" width="' + r[1] * 3 + '" height="22"/><text class="n" x="' + (58 + r[1] * 3) + '" y="' + (y + 15) + '">' + r[1] + '</text>' : '<text class="n" x="56" y="' + (y + 15) + '">closed</text>');
        }).join('') + '<text class="n" x="52" y="132">average visits each weekday, by hour (p.m.)</text>',
        tall: 140, cap: 'Teen room visits last month, from the library’s door counter.' }
    ],
    guide: { before: 'Ask: if you wanted to change a rule in your town, who would you write to? Point out the parts of a formal letter (address and date, greeting, body, closing, signature). Teach <b>worthwhile</b> and <b>track</b>.',
      after: 'Do you think the board should say yes? What would you add to Priya’s letter to make it stronger?' },
    words: [['worthwhile', 'worth the time, effort or money'], ['track', 'keep a record of']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What kind of text is this?',
        opts: ['a friendly letter to a cousin', 'a formal letter asking for a change', 'a news report', 'a diary entry'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the chart show about the hour from 4 to 5 p.m.?',
        opts: ['It is the quietest hour.', 'It is the busiest hour.', 'The room is closed.', 'Only adults visit.'], a: 1 },
      { k: 'choice', code: 'C3.5', q: 'Which sentence from the letter is an opinion, not a fact?',
        opts: ['“Our class surveyed 80 students.” ({line:surveyed})', '“I think these numbers speak for themselves.” ({line:speak})', '“Sixty-four said they would use the teen room after 5 p.m.” ({line:Sixty})', '“The teen room already has rules.” ({line:already})'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'In the paragraph beginning “I understand that staying open longer would cost money” ({line:understand}), Priya',
        opts: ['gives up on her request', 'admits a problem and offers solutions to it', 'blames the library board', 'tells a story about her family'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Priya says students are less likely to be “hanging around the parking lot” ({line:parking}). She mentions this to',
        opts: ['turn an adult worry into a reason to agree with her', 'admit that teenagers cause trouble', 'ask for a bigger parking lot', 'describe where she lives'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Priya’s survey asked only students. How could this make her evidence one-sided? What other information could make it stronger?',
        a: 'Students want the room open, so they would say yes. The board might also want to know the cost of evening staff, what librarians think, and whether students actually came when the room was open late before.', look: 'the possible bias (only students asked) and one other source of evidence' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Is Priya’s letter convincing? Give your opinion and two reasons from the letter.',
        a: 'Yes. She uses real numbers from a survey and the chart, and she answers the board’s worries about cost and noise with practical ideas.', look: 'a clear opinion supported by two features of the letter (evidence, solutions, polite tone, answering objections)' }
    ]
  });

  P.add({
    id: 'g7-ice-storm-story', subject: 'story', form: 'Short story', lines: true,
    title: 'The Week the Lights Went Out',
    deck: 'In January 1998, ice brought down the power lines. It brought in the neighbours.',
    hero: {
      photo: 'g4-ice-storm.jpg', credit: 'Photo: J. Jensenius, NOAA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Trees and power lines bent under a thick coat of ice after the ice storm of January 1998.'
    },
    body: [
      'The ice began on a Monday, as freezing rain that glazed everything it touched: cars, mailboxes, the basketball hoop above our garage. By Tuesday night, the trees on our street were bowing like old men, and every few minutes a branch snapped with a crack as loud as a rifle. At 11:40 the lights went out. They remained out for seven days.',
      'We owned the only wood stove on Lavigne Street, which is how our living room became the neighbourhood.',
      'The Bouchards arrived first, with their twins and a cooler of food that was defrosting anyway. Then came Mrs. Odhiambo from across the road, wrapped in three sweaters and carrying her grandmother’s teapot as though it might shatter if she breathed. By Wednesday, eleven people were sleeping in our house, and I had learned more about my neighbours than in the six years we had lived there.',
      'The last to arrive was Mr. Lachance.',
      'Mr. Lachance lived alone at the end of the street, in a house with immaculately trimmed hedges. He was famous for exactly one thing: complaining about my basketball. Twice that autumn he had returned it to our door, holding it at arm’s length, and informed my mother that the constant thumping was “a form of <b>aggression</b>.”',
      'On Wednesday evening he knocked on our door holding a sack of potatoes. “I understand you have heat,” he said stiffly. “I can pay in vegetables.”',
      'For the first day, he sat in the corner chair and addressed his remarks only to the stove. On the second day, the Bouchard twins discovered that he could perform card tricks, and for the remainder of the week he could not escape them. On the third day, he prepared a potato soup that Mrs. Odhiambo declared superior to her own, which was the highest compliment available on our street.',
      'On the final night, after the twins had fallen asleep, I found him standing at the window, gazing at the dark street glittering under its armour of ice.',
      '“My wife used to say I was a difficult man,” he said, without turning around. “She was correct.” He was silent for a while. “I have not talked this much since she died.”',
      'I did not know what to say, so I said nothing, which turned out to be exactly the right response.',
      'The power returned on Tuesday morning, and one by one our neighbours went home. The house felt enormous and <b>hollow</b>. That evening I heard a thud against the garage door. When I looked outside, my basketball was rolling down the driveway, and Mr. Lachance was walking away with his hands in his pockets.',
      'I went out and threw it back to him. He caught it. He was surprisingly good.'
    ],
    guide: { before: 'Explain the 1998 ice storm (freezing rain for days in eastern Ontario and Quebec; more than a million homes lost power, some for weeks). Ask: what would you do with no power in January? Teach <b>aggression</b> and <b>hollow</b>.',
      after: 'Why do you think it took a disaster for the neighbours to get to know each other? How could a street do it without one?' },
    words: [['aggression', 'angry or forceful behaviour toward others'], ['hollow', 'empty inside']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'The story is told in the first person. Who is the narrator?',
        opts: ['Mr. Lachance', 'a young person whose family has a wood stove', 'Mrs. Odhiambo', 'one of the Bouchard twins'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Trees were “bowing like old men” ({line:bowing}). This simile shows that the trees',
        opts: ['were bent under heavy ice', 'were very old', 'were being cut down', 'were dancing in the wind'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does Mr. Lachance offer to “pay in vegetables” ({line:vegetables})?',
        opts: ['He is too proud to simply ask for help.', 'He grows potatoes for a living.', 'The family asked him for food.', 'He wants to sell his potatoes.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The basketball appears at the beginning and at the end of the story. At the end, it is a symbol of',
        opts: ['the noise Mr. Lachance hates', 'a new friendship between the narrator and Mr. Lachance', 'the storm damage', 'the narrator’s talent for sports'], a: 1 },
      { k: 'choice', code: 'B3.3', q: '“He was famous for exactly one thing: complaining about my basketball.” ({line:famous}) Why does the writer use a colon here?',
        opts: ['to introduce the “one thing” the sentence promises', 'to join two questions', 'to show someone is speaking', 'to end a list'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Mr. Lachance says, “I have not talked this much since she died” ({line:died}). How does this line change the way the narrator, and the reader, see him?',
        a: 'It shows he was not just grumpy but lonely. His complaining may have come from living alone with no one to talk to. We start to feel sympathy instead of annoyance.', look: 'the shift from seeing him as difficult to seeing him as lonely, explained with the quote' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The storm takes away the power but gives the street something. What does it give? Use two details.',
        a: 'It gives them a community. Eleven neighbours share one house, the narrator learns more about them in a week than in six years, and Mr. Lachance makes friends with the twins and the narrator.', look: 'the idea (connection, community) supported by two details from the story' }
    ]
  });

  P.add({
    id: 'g7-garden-bandit', subject: 'story', form: 'Short story', lines: true,
    title: 'The Garden Bandit',
    deck: 'Someone is stealing Zoe’s strawberries. She has a camera and a plan.',
    hero: {
      photo: 'g6-red-fox.jpg', credit: 'Photo: In india travel, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'A red fox. Foxes eat mice, birds and insects, but they also eat berries in summer.'
    },
    body: [
      'For three consecutive mornings, someone stole my strawberries. Not all of them, which would have been <b>blatant</b>, but the ripest five or six, removed neatly from the middle of the patch as if by a thief with excellent taste and considerable patience.',
      'My family had theories. Mom blamed the raccoons. My brother, Felix, blamed the Hendersons’ dog, a theory he applies to practically every problem in the neighbourhood. Grandpa, who had moved in with us that spring, offered no theory at all. He simply buttered his toast very carefully and asked whether anyone wanted more coffee.',
      'I am not a person who accepts theories. I am a person who gathers evidence. On Thursday I borrowed a trail camera from Ms. Okonkwo, my science teacher, and strapped it to the fence post facing the patch. The camera takes a photograph whenever something warm moves in front of its sensor.',
      'On Friday morning, the memory card held forty-one new images. Thirty-six of them showed a moth. One showed Felix, at 11:15 p.m., eating a popsicle he was definitely not supposed to have. And four, taken between 5:08 and 5:14 a.m., revealed the real bandit.',
      'In the first photograph, a red fox sat at the edge of the patch with its tail curled around its feet, like a customer waiting politely to be served. In the second, a hand reached into the frame holding a strawberry. In the third, the fox was eating it. In the fourth, the hand, along with the rest of Grandpa in his plaid bathrobe, was reaching for another.',
      'I showed him the evidence at breakfast. He studied the pictures for a long time.',
      '“She appeared the first week I was here,” he said eventually. “On the farm in Saskatchewan, a fox lived under our granary. Every spring I used to watch her raise her <b>kits</b>.” He tapped the screen gently. “This one has the same white tip on her tail.”',
      'I had prepared a speech about justice. Instead, I repeated what Ms. Okonkwo had taught us during our unit on habitats: feeding wild animals causes them to lose their natural fear of people and to depend on food that is not healthy for them. A fox that trusts humans can end up in serious trouble.',
      'Grandpa nodded slowly. “So I have been a bad neighbour to her.”',
      '“You’ve been a good neighbour,” I said. “Just the wrong kind.”',
      'We negotiated an agreement. The strawberries stay on the plants. The camera stays on the post. And every evening after supper, Grandpa and I scroll through the photographs together: the fox hunting mice in the long grass, the fox asleep beneath the cedar hedge, and, one memorable morning in July, the fox trotting past with three small kits trailing behind her.',
      'Grandpa says I caught two bandits that week. He says the second one is grateful.'
    ],
    guide: { before: 'Explain what a trail camera is (a camera that takes a photo when something warm moves). Ask: why do parks tell people not to feed wild animals? Teach <b>blatant</b> and <b>kits</b> (baby foxes).',
      after: 'Zoe planned a “speech about justice” but said something else. Was that the right choice? Why?' },
    words: [['blatant', 'very obvious, done openly'], ['kits', 'baby foxes']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Grandpa “buttered his toast very carefully” ({line:buttered}) while the family guessed. This detail hints that Grandpa',
        opts: ['was very hungry', 'knew something he was not saying', 'did not like strawberries', 'was angry with Felix'], a: 1 },
      { k: 'choice', code: 'C1.5', q: 'The narrator says, “I am not a person who accepts theories. I am a person who gathers evidence.” ({line:evidence}) What does this show about her?',
        opts: ['She is careful and scientific, and a little proud of it.', 'She does not trust her family.', 'She dislikes school.', 'She is lazy.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The fox sat “like a customer waiting politely to be served” ({line:customer}). The simile shows that the fox',
        opts: ['was hungry and angry', 'was used to being fed and expected it', 'was afraid of the camera', 'was hunting mice'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does Grandpa feed the fox?',
        opts: ['He wants to tame it as a pet.', 'It reminds him of his farm and helps him feel at home.', 'He wants to keep the fox away from the garden.', 'He does not like strawberries.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Grandpa says Zoe caught “two bandits” and that “the second one is grateful” ({line:grateful}). Who is the second bandit, and why is he grateful?',
        a: 'The second bandit is Grandpa. He is grateful because Zoe did not shame him, and now they share a new routine of watching the fox together.', look: 'Grandpa identified, and a reason for being grateful (kindness, the new routine, company)' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Have you, or someone you know, ever found comfort in something that reminded you of an old home or place? Connect it to Grandpa.',
        a: 'Example: When my aunt moved here, she planted the same flowers her mother grew. Like Grandpa with the fox, it helped her feel at home.', look: 'a personal connection that clearly links to Grandpa’s reason for feeding the fox' }
    ]
  });

  P.add({
    id: 'g7-keepers-daughter', subject: 'story', form: 'Narrative poem', lines: true,
    title: 'The Keeper’s Daughter',
    deck: 'A story told in a poem, set on the coast of Nova Scotia',
    hero: {
      photo: 'g4-lighthouse.jpg', credit: 'Photo: Michel Rathwell, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'The lighthouse at Peggys Cove, Nova Scotia. Lighthouses warned ships away from rocks long before radar and GPS.'
    },
    body: [{ box: 'Before you read', text: 'A narrative poem tells a story, with characters, a problem and an ending, using rhythm and rhyme. Until the 1900s, a family often lived at a lighthouse and kept its lamp burning every night by hand.' }].concat(verses([
      'Her father rowed out with the herring nets', 'one bright September noon.', 'He said, “I’ll be home by the lighting-time,', 'by the rising of the moon.”', '',
      'But the wind swung round to the east by three', 'and the sea turned the colour of slate,', 'and the gulls came in from the open bay', 'and the moon rose, and it was late.', '',
      'She was twelve years old and she knew the lamp,', 'though she’d never been trusted alone;', 'she climbed the stairs, all ninety-two,', 'in the dark, by the feel of the stone.', '',
      'She trimmed the wick and she filled the oil', 'and she struck the match, and it caught,', 'and the beam swung out on the heaving sea', 'like a hand held out, or a thought.', '',
      'All night she stayed while the <b>tempest</b> howled', 'and the windows shook in their frames;', 'she polished the glass when it smoked and dimmed', 'and she called the rocks by their names.', '',
      'At dawn a shape came out of the grey,', 'a dory, low and slow,', 'and her father stood in the shallows and looked', 'at the tower’s fading glow.', '',
      'He said not a word as he climbed the stairs;', 'he took the cold lamp from her hand.', 'Then he set his cap on her tangled hair,', 'and that was how she was <b>manned</b>.'
    ])),
    guide: { before: 'Read the “Before you read” box together. Clap the beat of the first verse to feel the rhythm, and find the rhyming words (noon / moon). Teach <b>tempest</b> and <b>manned</b> (here: given the job and trust of a keeper).',
      after: 'The father never says “thank you.” What does he do instead, and is it enough?' },
    words: [['tempest', 'a violent storm'], ['manned', 'here: made a keeper, trusted with the job']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this is a narrative poem?',
        opts: ['It has no rhyme.', 'It tells a story with a problem and an ending.', 'It gives facts about lighthouses.', 'It has headings.'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'In each verse, which lines rhyme?',
        opts: ['lines 1 and 2', 'lines 2 and 4', 'lines 1 and 3', 'none of them'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'Which lines foreshadow that the father will be in danger?',
        opts: ['“Her father rowed out with the herring nets” ({line:herring})', '“But the wind swung round to the east by three” ({line:swung})', '“she climbed the stairs, all ninety-two” ({line:ninety})', '“At dawn a shape came out of the grey” ({line:dawn})'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'The beam swung out “like a hand held out” ({line:hand}). This simile suggests the light is',
        opts: ['dangerous', 'offering help and safety', 'too weak to see', 'waving goodbye'], a: 1 },
      { k: 'choice', code: 'C3.2', q: '“She called the rocks by their names” ({line:names}) suggests that she',
        opts: ['was afraid of the dark', 'knew the dangerous coast well and was keeping watch for her father', 'was talking to herself out of boredom', 'had named the rocks that night'], a: 1 },
      { k: 'choice', code: 'B2.2', q: 'A “dory” ({line:dory}) is most likely',
        opts: ['a small fishing boat', 'a large ship', 'a seabird', 'a kind of storm'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'At the end, the father puts his cap on his daughter’s head. What does this action mean? Explain using the poem.',
        a: 'It shows he is proud of her and now trusts her as a real keeper. Before, she had “never been trusted alone”; now his cap, a symbol of the job, is hers.', look: 'the meaning (pride, trust, a new role), linked to “never been trusted alone” or the word manned' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which strategy helped you most to follow the story in this poem: picturing the scenes, rereading, or noticing the rhyme and rhythm? Explain.',
        a: 'Example: Picturing the scenes helped most. I imagined the dark stairs and the beam on the waves, and that helped me feel how scared and brave she was.', look: 'one strategy named, with a clear example of how it helped understanding' }
    ]
  });

  P.add({
    id: 'g7-debug', subject: 'story', form: 'Short story', lines: true,
    title: 'Debug',
    deck: 'The robot works perfectly at home. At the competition, it does not.',
    hero: {
      photo: 'g5-coding.jpg', credit: 'Photo: Mary Davis, U.S. Army, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 190,
      cap: 'A student at a robotics competition. Teams build and program robots to complete tasks on a game table.'
    },
    body: [
      'At 10:52 on the morning of the regional robotics competition, the Hornets’ robot drove confidently off the edge of the game table, struck the floor and lay on its back with its wheels spinning, like a beetle that had given up on life.',
      'Malik, the team captain, picked it up and turned it over. Nothing was broken, which was almost worse. If something had broken, they could have repaired it. Instead, the robot that had completed every mission flawlessly for three weeks in Ines’s basement had simply decided, in front of two hundred spectators, to behave like a stranger.',
      'Their next round was scheduled for 11:30.',
      'Ines was the team’s programmer. She had written every line of the code, and she understood the robot the way some people understand a familiar song. But the competition tables stood on tall wooden platforms, and from her wheelchair, Ines could see only the edge of the playing surface. During the run, she had followed the robot’s performance mainly by watching her teammates’ faces.',
      '“Run it again,” she instructed. “Put it on the practice table and run the first mission.” The practice table was equally high.',
      'They ran it. The robot rolled forward, turned and drove off the edge again. This time Malik caught it.',
      'Ines did not look at the robot. She had closed her eyes.',
      '“Again,” she said. “Everybody be quiet.”',
      'This time the team watched her instead of the machine. Halfway through the turn, her eyes snapped open. “There,” she said. “Did you hear that? The left motor is slower than the right one. It sounds lower.” At home, the robot had travelled on smooth concrete. Here, the competition mat was soft and slightly textured, and the left wheel was dragging. Her program assumed that both wheels would travel identical distances. They no longer did.',
      'It took her nine minutes to write a <b>correction</b> that measured each wheel separately and adjusted its speed. It took Malik thirty seconds to realize that none of them could have diagnosed the problem simply by looking.',
      'At 11:30 the robot completed four missions without a single error.',
      'Afterward, Ines rolled over to the head judge. Malik expected her to discuss programming. Instead, she gestured at the platforms. “Next year,” she said, “could one table be lower? I should be able to see my own robot.”',
      'The judge looked at the table, then at Ines, as if noticing both for the first time. She wrote something on her clipboard.',
      'The following year, the competition provided two low tables. A small sign on each read <b>Accessible</b> Table. Malik noticed that teams of every kind used them, because a table you can see from a wheelchair is also a table that a short Grade 6 student can see, and one that a judge can observe while sitting down. Ines said that was usually how it worked.'
    ],
    guide: { before: 'Explain a robotics competition: teams program a robot to do tasks (“missions”) on a table. Ask: how would you notice a problem if you could not see it? Teach <b>correction</b> and <b>accessible</b>.',
      after: 'Ines says that changes made for one person often help many. Can you think of another example (ramps, captions, automatic doors)?' },
    words: [['correction', 'a change that fixes a mistake'], ['accessible', 'easy for everyone to reach, enter or use, including people with disabilities']],
    qs: [
      { k: 'choice', code: 'C3.1', half: true, q: 'The robot lay “like a beetle that had given up on life” ({line:beetle}). The tone of this simile is',
        opts: ['tragic', 'humorous', 'angry', 'frightening'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:confidently}, “confidently” means',
        opts: ['slowly', 'with certainty', 'secretly', 'sadly'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'What caused the robot to fail at the competition?',
        opts: ['A wire was broken.', 'The soft, rough mat made the left wheel drag.', 'Ines wrote the code incorrectly at home.', 'The battery was dead.'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does Ines close her eyes ({line:closed})?',
        opts: ['She is too upset to watch.', 'She cannot see the table, so she listens to the motors instead.', 'She is tired from the drive.', 'She wants her team to stop talking.'], a: 1 },
      { k: 'choice', code: 'C3.6', q: 'What is the story’s message about accessibility?',
        opts: ['Only people who use wheelchairs need lower tables.', 'Making a space accessible for one person often helps many others too.', 'Competitions should not have tables.', 'Programming is easier than building.'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Ines was the programmer, yet she could not see the robot during the competition. Explain how this was unfair, and how she solved both problems in the story.',
        a: 'The high tables meant she could not watch her own robot, so she had to rely on others. She solved the robot problem by listening to the motors, and the table problem by asking the judge for a lower table.', look: 'the unfairness (could not see) and both solutions (listening; asking for change)' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'The story is told by a narrator who follows Malik. How might it be different if Ines told it?',
        a: 'Ines would tell us what it felt like to watch faces instead of her robot, and what she heard when the motor sounded wrong. We would understand her frustration from the inside.', look: 'a specific detail or feeling that would change with Ines as narrator' }
    ]
  });

  P.add({
    id: 'g7-road-trip-guide', subject: 'story', form: 'Humour (how-to guide)', lines: true, plain: true,
    title: 'How to Survive a Family Road Trip',
    deck: 'A guide in seven steps, by someone who has spent 2 000 kilometres in the back seat',
    hero: {
      photo: 'g7-wawa-goose.jpg', credit: 'Photo: AgreeableTigerMoth, CC BY 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 180,
      cap: 'The giant goose statue in Wawa, Ontario, beside the Trans-Canada Highway.'
    },
    body: [
      '<i>Last summer my family drove from Ottawa to Thunder Bay and back to visit my aunt, a journey of roughly 3 000 kilometres. I survived. Here is how you can too.</i>',
      { h: 'Step 1: Accept that you will not choose the music.' },
      'The driver chooses the music. This is an ancient law, older than automobiles. Your father will play the same album of songs from his university years, and he will sing the parts he remembers and hum enthusiastically through the parts he does not, which is most of them.',
      { h: 'Step 2: Pack your own snacks.' },
      'Your parents will pack “nutritious snacks.” These consist of carrot sticks that become limp by Pembroke and a bag of trail mix that is mostly raisins. Bring a private supply and guard it carefully. Your younger sister will attempt to <b>negotiate</b>. Remain strong.',
      { h: 'Step 3: Never ask “Are we there yet?”' },
      'It never works. Instead, ask, “How many kilometres until the next town?” Grown-ups appreciate this question because it sounds educational. You will discover that the answer anywhere north of Lake Superior is always “a lot.”',
      { h: 'Step 4: Stop at every giant statue.' },
      'Northern Ontario has a giant goose, a giant nickel and a giant canoe. Your parents will claim they are too busy to stop. They are not. Nobody in recorded history has driven past a nine-metre goose without stopping. Take a photograph. You will treasure it for years.',
      { h: 'Step 5: Stay out of the navigation argument.' },
      'Eventually your mother will announce that the GPS is wrong, and your father will insist that the GPS is never wrong, and both of them will turn out to be partly correct. Look out the window instead. The view of the lake is <b>spectacular</b>, and it will never ask you to take a side.',
      { h: 'Step 6: Learn to sleep anywhere.' },
      'Fold your hoodie into a pillow. Lean against the window, not against your sister. If you wake up with seatbelt marks across your face, congratulations: you have done it correctly.',
      { h: 'Step 7: Do not admit you enjoyed it.' },
      'On the last evening, somewhere past Sudbury, the sun will sink slowly behind the granite and the pines, the whole car will fall quiet, and you will realize, to your considerable surprise, that you are not bored at all. You may even feel that you would like to do it again. Do not say this out loud. That is how next summer’s trip gets planned.'
    ],
    guide: { before: 'Show the route from Ottawa to Thunder Bay on a map (it follows Lake Superior). Explain that this guide is a parody: it looks like real instructions but is written to make readers laugh. Teach <b>negotiate</b> and <b>spectacular</b>.',
      after: 'Which step is the most true, and which is the most exaggerated? Write an eighth step of your own.' },
    words: [['negotiate', 'talk with someone to reach a deal'], ['spectacular', 'amazing to see']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What is the writer’s main purpose?',
        opts: ['to give real safety rules for car trips', 'to entertain by making fun of family trips', 'to persuade people to visit Wawa', 'to explain how GPS works'], a: 1 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which feature does this text borrow from real how-to guides?',
        opts: ['numbered steps with headings', 'a glossary', 'rhyming lines', 'a table of contents'], a: 0 },
      { k: 'choice', code: 'C1.5', q: '“This is an ancient law, older than automobiles.” ({line:ancient}) The writer is using',
        opts: ['exaggeration for humour', 'a fact from history', 'a simile', 'a warning'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why will both parents “turn out to be partly correct” ({line:partly}) about the GPS?',
        opts: ['The writer wants to avoid blaming either of them, which is part of staying out of it.', 'The GPS is broken.', 'The parents are lost.', 'The writer is driving.'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'In Step 7, the writer’s attitude toward the trip changes. Which best describes the change?',
        opts: ['from enjoying it to hating it', 'from complaining to secretly enjoying it', 'from bored to scared', 'it stays the same'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Step 7 says, “Do not say this out loud. It is how next summer’s trip gets planned.” What is the joke? Explain.',
        a: 'The writer pretends not to want another trip, but really did enjoy it. If they admit it, their parents will plan another long drive, so they keep it secret, even though part of them wants to go.', look: 'the hidden meaning: enjoying the trip but not wanting to admit it, and the consequence' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Most of the guide is joking, but Step 7 changes tone. How does the writer’s word choice change in the first sentence of Step 7?',
        a: 'The language becomes calm and descriptive: “the sun will sink slowly behind the granite and the pines, the whole car will fall quiet.” The long, gentle sentence shows a real, peaceful moment instead of a joke.', look: 'a change from joking to calm or sincere, with quoted words as evidence' }
    ]
  });

  P.add({
    id: 'g7-repair-cafe', subject: 'tech', form: 'Interview', lines: true, plain: true,
    title: 'Don’t Toss It, Fix It',
    deck: 'A student reporter talks with a 13-year-old volunteer at a repair café',
    hero: {
      photo: 'g7-repair-cafe.jpg', credit: 'Photo: Ilvy Njiokiktjien, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 160,
      cap: 'Volunteers and visitors at a repair café. Visitors bring broken things and learn to fix them.'
    },
    body: [
      '<i>Once a month, a church hall in Guelph fills with broken lamps, toasters, bikes and jeans. It is a repair café, where volunteers help people fix things for free instead of throwing them away. Leila Haddad of the</i> Westwood Gazette <i>spoke with Jonah Brant, a Grade 8 student who has volunteered there for two years.</i>',
      '<b class="ps-who">Leila:</b> What exactly is a repair café?',
      '<b class="ps-who">Jonah:</b> It is like a party where the guests are broken. People bring in something that no longer works, and a volunteer sits down with them so they can repair it together. The idea began in the Netherlands in 2009, and today there are thousands of repair cafés around the world. The most important word is <i>together</i>. We do not simply fix it for you. You hold the screwdriver.',
      '<b class="ps-who">Leila:</b> How did you get involved?',
      '<b class="ps-who">Jonah:</b> My grandmother’s radio stopped working, and the electronics store said a repair would cost more than a replacement. She was genuinely upset, because she had listened to that radio every morning for thirty years. A neighbour told us about the café. A volunteer named Mr. Osei showed me how to open the case, and the entire problem turned out to be one loose wire. It took ten minutes. I was hooked.',
      '<b class="ps-who">Leila:</b> What do people bring most often?',
      '<b class="ps-who">Jonah:</b> Lamps, by far. Then kettles and toasters, then clothing, then bicycles. Electronics such as phones are more difficult, because many are glued shut and replacement parts are hard to obtain. Some manufacturers design products that are almost impossible to repair. I think that is wrong. If you buy something, you should be able to fix it.',
      '<b class="ps-who">Leila:</b> Why does repairing things matter?',
      '<b class="ps-who">Jonah:</b> Canadians discard an enormous quantity of electronic waste every year, more than twenty kilograms for each person. Much of it ends up in <b>landfills</b>, where metals and chemicals can leak into the surrounding soil and water. Every lamp we repair is one less lamp in the dump, and one less new lamp that must be manufactured from fresh materials.',
      '<b class="ps-who">Leila:</b> What has volunteering taught you?',
      '<b class="ps-who">Jonah:</b> Patience, definitely. Also, that most objects are not as <b>complicated</b> as they appear. Once you open something up, it is just a collection of parts, and parts can be understood. And older people know an astonishing amount. Mr. Osei can fix anything with a motor. Mrs. Lindgren can replace a zipper in four minutes. I timed her.',
      '<b class="ps-who">Leila:</b> What would you say to someone who wants to try?',
      '<b class="ps-who">Jonah:</b> Bring something broken. The worst that can happen is that it stays broken, and you learn how it works.',
      { fig: [['Lamps', 48], ['Kettles and toasters', 31], ['Clothing', 26], ['Bikes', 18], ['Phones and tablets', 9]].map(function (r, i) {
          var y = 8 + i * 26;
          return '<text class="l" x="118" y="' + (y + 14) + '" text-anchor="end">' + r[0] + '</text><rect class="k" x="124" y="' + y + '" width="' + r[1] * 3 + '" height="18"/><text class="n" x="' + (130 + r[1] * 3) + '" y="' + (y + 13) + '">' + r[1] + '</text>';
        }).join('') + '<text class="n" x="124" y="146">items brought in during one year</text>',
        tall: 152, cap: 'What people brought to the Guelph repair café in one year, from the café’s own records.' }
    ],
    guide: { before: 'Ask: what do you do when something breaks? Explain e-waste (old electronics thrown away). Point out how an interview shows who is speaking. Teach <b>landfills</b> and <b>complicated</b>.',
      after: 'Jonah says companies should make things easy to repair. Do you agree? What is something you own that you wish you could fix?' },
    words: [['landfills', 'places where garbage is buried in the ground'], ['complicated', 'having many parts; hard to understand']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'What was Leila mainly trying to find out?',
        opts: ['how to fix a radio', 'what a repair café is and why Jonah volunteers', 'where to buy a new lamp', 'how the Netherlands started recycling'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the chart, which item was brought in least often?',
        opts: ['lamps', 'bikes', 'clothing', 'phones and tablets'], a: 3 },
      { k: 'choice', code: 'C3.5', q: 'Which statement from Jonah is an opinion?',
        opts: ['“The idea began in the Netherlands in 2009.” ({line:Netherlands})', '“If you buy something, you should be able to fix it.” ({line:buy})', '“It took ten minutes.” ({line:ten})', '“Lamps, by far.” ({line:far})'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'How does the chart support what Jonah says about phones?',
        opts: ['It shows phones are the most common item.', 'It shows few phones are brought in, which fits his point that they are hard to repair.', 'It shows phones are easy to fix.', 'It does not mention phones.'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Jonah says, “I timed her” ({line:timed}). This detail shows that he',
        opts: ['does not trust Mrs. Lindgren', 'is impressed by her skill', 'is bored at the café', 'wants to beat her record'], a: 1 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize Jonah’s two main reasons that repairing things matters.',
        a: 'Repairing keeps things out of landfills, where chemicals can leak into the soil. It also means fewer new things have to be made from new materials.', look: 'both reasons (less waste in landfills; fewer new materials used) in the reader’s own words' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Jonah learned that older people “know an amazing amount.” Connect this idea to your own life, or to another text you have read.',
        a: 'Example: My grandfather taught me to sharpen a knife and fix a bike chain. Like Jonah, I learned that older people have skills that are not in videos.', look: 'a clear connection (personal or to another text) linked to Jonah’s idea' }
    ]
  });

  P.add({
    id: 'g7-wolf-howl-journal', subject: 'science', form: 'Field journal', lines: true, plain: true,
    title: 'The Night the Forest Answered',
    deck: 'A Grade 7 student’s field journal from a public wolf howl in Algonquin Park',
    hero: {
      photo: 'g6-canoe-lake.jpg', credit: 'Photo: Markabq, public domain, Wikimedia Commons', focus: '50% 55%',
      tall: 160,
      cap: 'Canoe Lake in Algonquin Provincial Park, Ontario, near the highway where public wolf howls are held.'
    },
    body: [
      '<i>For our science unit on interactions in the environment, we had to keep a field journal of one wildlife observation. Here are my notes from August 14.</i>',
      '<b class="ps-who">7:15 p.m. · Outdoor theatre</b>',
      'Huge crowd, at least a thousand people. A park naturalist explained that Algonquin has run public wolf howls since 1963, but only on August evenings when staff have located a pack close to the highway. Last night they found one, so tonight is on. The wolves here are eastern wolves, also called Algonquin wolves. They are smaller than grey wolves and <b>threatened</b> in Ontario, which means they could become endangered if their numbers drop further.',
      '<b class="ps-who">8:40 p.m. · Highway 60</b>',
      'We drove east in a long convoy, hundreds of cars with their headlights on, then parked along both shoulders. The naturalist asked everyone to switch off their engines and remain completely silent. It is remarkable how quiet a thousand people can become when they are given a good reason.',
      '<b class="ps-who">9:05 p.m.</b>',
      'The naturalist cupped her hands and howled: a long, rising note that sounded almost exactly like a real wolf. Silence. She waited about two minutes, then howled again. Silence again. A baby somewhere behind us began to cry, and three hundred people simultaneously turned around to glare at its parents.',
      '<b class="ps-who">9:12 p.m.</b>',
      'On the third howl, the forest answered. First came a deep, wavering howl from far to the north, then a second voice joined it, and suddenly there was a chorus of high, excited yips and squeals that rose and tumbled over each other. The naturalist whispered that the yipping came from this year’s pups, born in April, which are now old enough to wait at a <b>rendezvous site</b> while the adults hunt. The chorus lasted about forty seconds. Then it stopped, all at once, as if someone had closed a door.',
      '<b class="ps-who">9:30 p.m. · Notes and questions</b>',
      'Number of separate voices heard: at least five, maybe more. Direction: north, roughly one to two kilometres away, according to the naturalist. Weather: clear, no wind, about 14 degrees. My hands were shaking when I wrote this, and not because of the cold.',
      'Questions to research: Why do wolves answer a human howl at all? Do they think we are another pack? Could events like this disturb them? The naturalist said howls are held only once a week, and only when wolves are already responding, so that the pack is not bothered too often.',
      { fig: '<rect class="k" x="4" y="10" width="64" height="62" rx="6"/><rect class="k" x="80" y="10" width="64" height="62" rx="6"/><rect class="k" x="156" y="10" width="64" height="62" rx="6"/><rect class="k" x="232" y="10" width="64" height="62" rx="6"/>' +
          D.arrow(68, 41, 78, 41, 'a') + D.arrow(144, 41, 154, 41, 'a') + D.arrow(220, 41, 230, 41, 'a') +
          node(36, 30, '1. Find') + node(36, 46, 'a pack near') + node(36, 60, 'the road') + node(112, 30, '2. Gather') + node(112, 46, 'and stay') + node(112, 60, 'silent') +
          node(188, 30, '3. Howl') + node(188, 46, 'and wait') + node(188, 60, '2 minutes') + node(264, 30, '4. Listen') + node(264, 46, 'and record') + node(264, 60, 'the answer') +
          '<path class="d" d="M188 74 V92 H112 V76"/><text class="n" x="150" y="106" text-anchor="middle">no answer? howl again (up to 3 times)</text>',
        tall: 112, cap: 'How a public wolf howl works.' }
    ],
    guide: { before: 'Find Algonquin Park on a map of Ontario. Play a recording of wolves howling if you can. Explain what a field journal is (dated, timed notes made while observing). Teach <b>threatened</b> and <b>rendezvous site</b> (a meeting place where pups wait while adults hunt).',
      after: 'The student ends with questions. Which question would you research first, and where would you look?' },
    words: [['threatened', 'at risk of becoming endangered'], ['rendezvous site', 'a meeting place where wolf pups wait while the adults hunt']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'How is this field journal organized?',
        opts: ['by order of importance', 'by time, with each entry labelled', 'as a problem and solution', 'as a comparison of two animals'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, what happens if the wolves do not answer?',
        opts: ['Everyone goes home.', 'The naturalist howls again.', 'The cars drive closer.', 'The pups are counted.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'The chorus stopped “as if someone had closed a door” ({line:door}). This simile shows that the howling ended',
        opts: ['slowly and gradually', 'suddenly and completely', 'with a loud bang', 'when the crowd left'], a: 1 },
      { k: 'choice', code: 'C3.2', q: '“My hands were shaking when I wrote this, and not because of the cold” ({line:shaking}). The writer means they were',
        opts: ['ill', 'thrilled and amazed', 'frightened of being attacked', 'angry about the noise'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Why are public howls held only once a week, and only when wolves are already answering?',
        opts: ['to sell more tickets', 'so the pack is not disturbed too often', 'because the naturalist is busy', 'because it rains on other nights'], a: 1 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'The student asks, “Do they think we are another pack?” Make a prediction about the answer, and explain how you could check it.',
        a: 'Example: I predict wolves answer to defend their territory or to locate the “other pack.” I could check by reading a park or university article about why wolves howl.', look: 'a reasonable prediction with a reason, and a way to check it (a reliable source)' },
      { k: 'lines', code: 'C1.2', n: 3, q: 'Find two features of a field journal in this text and explain how each helps a scientist.',
        a: 'Times and places at each entry show exactly when and where things happened. Measurements such as the number of voices, direction and temperature record the facts so others can compare them.', look: 'two features (times, headings, measurements, questions) and the purpose of each' }
    ]
  });

  P.add({
    id: 'g7-bluebird-letter', subject: 'history', form: 'Letter', lines: true, plain: true,
    title: 'Somewhere in France',
    deck: 'A letter from a Canadian nursing sister to her younger sister, December 1917 (a made-up letter based on real events)',
    hero: {
      photo: 'g7-nurses-vote.jpg', credit: 'Photo: William Rider-Rider, 1917, public domain, Library and Archives Canada', focus: '50% 35%',
      tall: 150,
      cap: 'Canadian nursing sisters at a hospital in France vote in the federal election of December 1917, among the first women in Canada to vote in a national election.'
    },
    body: [
      '<span class="ps-who">No. 2 Canadian Hospital, Somewhere in France · December 18, 1917</span>',
      'Dearest Bea,',
      'Your parcel arrived on Tuesday, and I cannot describe how marvellous it was to open a box that smelled like home. The fudge is gone, I am afraid: I shared it with the other sisters on my ward, and it lasted approximately four minutes. The socks are on my feet as I write. You have improved enormously at knitting. Only one heel is slightly larger than the other.',
      'You asked what my days are like. I am not permitted to tell you where we are, because every letter is read by a <b>censor</b>, but I can tell you that the work never truly stops. When the convoys of wounded arrive, usually at night, we work until every patient is washed, bandaged and settled. Some of the boys are younger than Thomas. Many of them ask me to write to their mothers, and I always do.',
      'The soldiers call us the Bluebirds, because of our blue dresses and white veils. I pretended to find it silly, but privately I like it very much.',
      'Now for my news, and it is extraordinary news. Yesterday, I voted in the federal election. Because we serve with the army, Parliament has given nursing sisters the vote. We lined up in our capes outside the ward hut, marked our <b>ballots</b> one by one and dropped them into a wooden box guarded by a very serious officer. I thought of Aunt Edith, who has spent twenty years arguing that women should vote and has never once been permitted to cast a ballot in a federal election, and I am not ashamed to tell you that I cried a little.',
      'Some of the sisters argued that it is unfair for us to vote while most women at home cannot. They are right. I suspect it will not remain unfair for long, and I hope that when your turn comes, Bea, you will never take it for granted.',
      'It is nearly midnight and the stove has gone out, so I will stop here. Please tell Father I am eating properly, which is mostly true, and tell Thomas I have not forgotten that he owes me a game of checkers.',
      'Your loving sister,',
      'Margaret',
      { box: 'The real Bluebirds', text: 'About 2 500 Canadian nursing sisters served overseas during the First World War. In 1917, new laws allowed them, and women with close relatives in the forces, to vote in the federal election. Most other Canadian women won the right to vote in federal elections in 1918, although many First Nations women and men, and some other Canadians, were kept from voting for decades longer.' },
      { fig: [['1917', 'nursing sisters, and women with', 'relatives in the forces'], ['1918', 'most women', ''], ['1947–48', 'Chinese, South Asian and', 'Japanese Canadians'], ['1950', 'Inuit', ''], ['1960', 'First Nations people', '']].map(function (r, i) {
          var y = 12 + i * 30;
          return '<circle class="dot" cx="20" cy="' + y + '" r="3.5"/><text class="lb" x="32" y="' + (y + 4) + '">' + r[0] + '</text><text class="l" x="94" y="' + (y + 4) + '">' + r[1] + '</text>' + (r[2] ? '<text class="l" x="94" y="' + (y + 18) + '">' + r[2] + '</text>' : '');
        }).join('') + '<path class="t" d="M20 12 V132"/>',
        tall: 146, cap: 'Some of the years when groups of Canadians first won the right to vote in federal elections.' }
    ],
    guide: { before: 'Explain the First World War in two sentences, and that Canadian women could not vote in national elections until 1917 and 1918. Look at the photo together: what are the women doing? Teach <b>censor</b> and <b>ballots</b> (the papers on which people mark their vote).',
      after: 'Margaret says, “I hope … you will never take it for granted.” What rights do you have that people once fought for?' },
    words: [['censor', 'an official who reads letters and removes secret information'], ['ballots', 'the papers on which people mark their vote']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why does Margaret not say where her hospital is?',
        opts: ['She has forgotten.', 'Letters were read by a censor, and the location was secret.', 'She wants to surprise Bea.', 'The hospital had no name.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the timeline. In which year could First Nations people first vote in federal elections?',
        opts: ['1917', '1918', '1950', '1960'], a: 3 },
      { k: 'choice', code: 'C3.2', q: 'Margaret thinks of Aunt Edith while voting ({line:Edith}). Why does this make her cry?',
        opts: ['She misses home and is homesick.', 'Her aunt has worked for women’s votes but never been allowed to vote, so the moment feels important and unfair.', 'Her mother told her how to vote.', 'She is tired from work.'], a: 1 },
      { k: 'choice', code: 'C3.6', q: 'Some sisters argue it is unfair that they can vote while most women at home cannot. What does Margaret believe?',
        opts: ['Only nurses should vote.', 'They are right, and the unfairness will soon change.', 'Voting does not matter.', 'Women at home do not want to vote.'], a: 1 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Read the box and the timeline. Whose right to vote was still denied after 1918? What does this show about who was included in Canadian democracy?',
        a: 'Many First Nations people, and some other Canadians, were kept from voting for decades longer. It shows that the right to vote was not given to everyone equally; some groups were left out for a long time.', look: 'the group named from the box and a clear statement about unequal inclusion' },
      { k: 'lines', code: 'C1.2', n: 3, q: 'Margaret writes about hard work and wounded soldiers, but also about fudge, socks and checkers. Why might she include these small, cheerful details in a letter home?',
        a: 'She wants to reassure her family and keep her letter warm and personal. Small, homely details show she is coping and remind her of normal life.', look: 'a purpose linked to the audience (family at home): reassurance, connection, keeping things normal' }
    ]
  });

  P.add({
    id: 'g7-ode-skates', subject: 'story', form: 'Poem (ode)', lines: true,
    title: 'Ode to My Old Skates',
    deck: 'A humorous poem in praise of something worn out',
    hero: {
      photo: 'g4-rideau-skateway.jpg', credit: 'Photo: Ahunt, CC0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Skaters on the frozen Rideau Canal in Ottawa, the largest outdoor skating rink in Canada.'
    },
    body: [{ box: 'What is an ode?', text: 'An ode is a poem written in praise of a person, a place or an object. The poet often speaks directly to the thing being praised, as if it could hear.' }].concat(verses([
      'O skates, you scuffed and <b>battered</b> pair,', 'with laces knotted past repair,', 'your leather cracked, your blades gone dull,', 'you smell like something left to mull', 'too long inside a hockey bag.', 'You are, I must admit, a rag.', '',
      'My cousin wore you first, then Jen,', 'and then my brother, and then, when', 'my brother’s feet grew far too wide,', 'you came to me, a hand-me-down bride', 'to every winter I have known.', 'Your blisters, now, are mine alone.', '',
      'You carried me the day I learned', 'that ice is hard, and how it burned', 'my chin, my knees, my pride, my cheek,', 'and how I skated by that week', 'with one arm flapping like a gull,', 'determined, wobbly, wonderful.', '',
      'The new skates in the window glow', 'like sports cars in a winter show.', 'My parents say it’s time. I nod.', 'I tell them yes. And yet, how odd:', 'each night I lace you on again,', 'just once more. Just until then.', '',
      'So here’s to you, old <b>loyal</b> pair,', 'who never once complained, or cared', 'how many feet you had to fit.', 'You’re falling, slowly, bit by bit.', 'But every stride I’ve learned to make,', 'I learned on you. Lace up. Let’s skate.'
    ])),
    guide: { before: 'Read the box about odes together. Find the rhyming pairs in the first verse (pair / repair). Point out that the poet talks to the skates, calling them “you.” Teach <b>battered</b> and <b>loyal</b>.',
      after: 'What old, worn-out object would you write an ode to? What memories does it hold?' },
    words: [['battered', 'damaged by being hit or used many times'], ['loyal', 'faithful; staying with someone through good and bad times']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this poem is an ode?',
        opts: ['It tells a scary story.', 'It praises an object and speaks to it directly.', 'It has no rhyme.', 'It gives instructions.'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Which lines rhyme in each verse?',
        opts: ['lines in pairs (1 and 2, 3 and 4, 5 and 6)', 'only the last two lines', 'lines 1 and 4', 'none of the lines'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Read from {line:cousin} to {line:alone}. What do these lines tell you about the skates?',
        opts: ['They were bought new for the speaker.', 'They were passed down through several people.', 'They were found in a store window.', 'They belonged to a hockey team.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: '“With one arm flapping like a gull” ({line:gull}) creates a picture of the speaker',
        opts: ['flying', 'skating gracefully', 'trying hard to keep balance', 'waving to friends'], a: 2 },
      { k: 'choice', code: 'C3.2', q: 'The speaker agrees to new skates but laces up the old ones “just once more” ({line:once}). This shows that the speaker',
        opts: ['does not like the new skates’ colour', 'is attached to the old skates and not ready to give them up', 'forgot about the new skates', 'is saving money'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'The tone of the poem changes from',
        opts: ['angry to calm', 'joking about the skates’ condition to warm affection for them', 'sad to frightened', 'excited to bored'], a: 1 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The poem lists many flaws of the skates in the first verse. Why does the poet start this way in a poem meant to praise them?',
        a: 'It makes the reader laugh and sets up a surprise: the skates are a mess, yet the speaker loves them. The praise later means more because the skates are obviously not perfect.', look: 'the humour or contrast created by starting with the flaws, and its effect on the praise' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'The last lines say every stride was learned on these skates. Connect this to something you learned with an old, well-used object.',
        a: 'Example: I learned to ride on my sister’s old bike with a squeaky bell. Even after I got a new one, I kept the bell.', look: 'a personal connection to learning with a worn, shared or meaningful object' }
    ]
  });

  P.add({
    id: 'g7-first-light', subject: 'story', form: 'Short story', lines: true,
    title: 'First Light',
    deck: 'Nia’s mother has shown her the night sky all her life. Tonight, something is different.',
    hero: {
      photo: 'g6-dark-sky.jpg', credit: 'Photo: Mustang Joe, CC0, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'The night sky over Torrance Barrens Dark-Sky Preserve, near Gravenhurst, Ontario.'
    },
    body: [
      'Every August, for as long as Nia could remember, her mother had driven them north to the Torrance Barrens, where the sky is dark enough to see the Milky Way spilled across it like flour on a black countertop. Her mother was an astronomer at the university, and she could find any star, planet or galaxy faster than most people could find their keys.',
      'This year, she spent twenty minutes searching for Andromeda.',
      'Nia sat on the cooler and watched her mother bend over the telescope, adjust the dial, lift her head, squint at the sky and bend down again. The galaxy was not difficult to locate. Nia had found it herself, without a telescope, when she was nine, because her mother had taught her the route: start at the square of Pegasus, hop two stars to the left, then look for the faint smudge just above.',
      '“The eyepiece must be fogging up,” her mother said eventually. She wiped it with the corner of her sleeve, an action she had once told Nia never, ever to do.',
      'Nia remembered other small things then, things she had noticed over the summer and filed away without examining. Her mother holding the menu at arm’s length at the restaurant in June. Her mother asking Nia to read the highway signs aloud, “because it is good practice.” The new appointment cards on the fridge from an eye specialist, which her mother had tucked behind a magnet shaped like Saturn.',
      'Nia stood up and walked to the telescope. Without saying anything, she leaned past her mother, nudged the tube a fraction to the left and brought Andromeda into the centre of the eyepiece, as easily as her mother had once done for her.',
      '“There,” she said quietly.',
      'Her mother looked for a long moment. Nia could not see her face in the darkness, but she heard her breathe out slowly, the way people do when they finally put down something heavy.',
      '“My vision is changing,” her mother said. “The centre is going blurry. They call it <b>macular degeneration</b>. The specialist says it will get worse, gradually.” She paused. “I was going to tell you in the car on the way home. I suppose I was hoping for one more year of doing this the old way.”',
      'Nia did not know the right thing to say, so she said the true thing. “You taught me the route. I can be the one who finds things now.”',
      'They stayed until two in the morning. Nia pointed the telescope, and her mother told her what she was looking at: how old the light was, how far it had travelled, which stars had already died while their light was still on its way. Her mother could no longer see the details clearly, but she remembered all of them.',
      'On the drive home, as the sky began to <b>pale</b> over the trees, Nia read every highway sign aloud. Neither of them pretended it was for practice.'
    ],
    guide: { before: 'Explain that a telescope helps you see faint objects, and that Andromeda is a galaxy you can see as a faint smudge on a very dark night. Ask: what would it be like if a parent needed your help with something they used to teach you? Teach <b>macular degeneration</b> (an eye condition that blurs the centre of what you see) and <b>pale</b>.',
      after: 'At the end, “neither of them pretended it was for practice.” What has changed between Nia and her mother?' },
    words: [['macular degeneration', 'an eye condition that slowly blurs the centre of what a person sees'], ['pale', 'here: to grow lighter as dawn comes']],
    qs: [
      { k: 'choice', code: 'C3.1', half: true, q: 'The Milky Way is “spilled across it like flour on a black countertop” ({line:flour}). This simile describes the Milky Way as',
        opts: ['a pale, scattered band of light', 'a bright, single star', 'a dark cloud', 'a thin red line'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:examining}, “examining” means',
        opts: ['looking at closely', 'forgetting', 'hiding', 'throwing out'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Which detail foreshadows the mother’s problem with her eyes?',
        opts: ['“she could find any star … faster than most people could find their keys”', '“This year, she spent twenty minutes searching for Andromeda.”', '“Nia sat on the cooler”', '“They stayed until two in the morning.”'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'The mother wipes the eyepiece with her sleeve, “an action she had once told Nia never, ever to do” ({line:sleeve}). This shows the mother is',
        opts: ['careless with her equipment', 'flustered and trying to explain away the problem', 'teaching Nia a new trick', 'cold'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'How has the relationship between Nia and her mother changed by the end?',
        opts: ['Nia now helps her mother see, while her mother still shares what she knows.', 'Nia no longer likes astronomy.', 'The mother refuses Nia’s help.', 'Nothing has changed.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Nia’s mother breathes out “the way people do when they finally put down something heavy” ({line:heavy}). What “heavy” thing is she putting down? Explain.',
        a: 'She is putting down the secret about her eyesight. Hiding it was a burden, and once Nia helps her, she feels relieved that she no longer has to pretend.', look: 'the secret or worry identified as the heavy thing, and the feeling of relief' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'The story is told by a narrator who follows Nia’s thoughts. What would we learn if the mother told the story instead?',
        a: 'We would learn how frightening it was for her to lose her vision, why she kept it secret, and how she felt when Nia found Andromeda for her.', look: 'a specific thought or feeling of the mother that the reader does not get now' }
    ]
  });

  P.add({
    id: 'g7-bus-window', subject: 'story', form: 'Poem', lines: true,
    title: 'Bus Window, November',
    deck: 'A poem about strangers seen through rain',
    hero: {
      photo: 'g5-city-bus.jpg', credit: 'Photo: Transportfan70, CC0, Wikimedia Commons', focus: '50% 55%',
      tall: 230,
      cap: 'A city bus in Toronto. Hundreds of thousands of people ride the city’s buses every day.'
    },
    body: [{ box: 'Before you read', text: 'This poem is written in free verse: it has no regular rhyme or rhythm. The poet uses images, line breaks and repetition to build meaning instead.' }].concat(verses([
      'The 29 bus smells of wet wool', 'and somebody’s oranges.', 'Rain draws <b>diagonal</b> lines', 'across the window,', 'and through them the city goes by', 'in pieces.', '',
      'A man in a suit runs for a streetcar', 'with a newspaper held over his head', 'like a small, useless roof.', '',
      'A girl my age stands at the corner', 'in a yellow raincoat,', 'not running, not hurrying,', 'face turned up to the rain', 'as if it were a gift', 'that someone had finally sent her.', '',
      'An old woman feeds pigeons', 'from a paper bag', 'under the bank’s stone awning.', 'She is talking to them.', 'I cannot hear what she says,', 'but they seem to agree.', '',
      'I will never know their names.', 'They will never know mine.', 'We are passing each other', 'at forty kilometres an hour,', 'each of us the centre', 'of our own wet, crowded day.', '',
      'Then the bus goes under the bridge,', 'and the window darkens,', 'and suddenly there is a face in it,', 'watching, a little <b>startled</b>,', 'and it takes me a moment', 'to recognize it', 'as mine.'
    ])),
    guide: { before: 'Read the box about free verse. Ask: have you ever watched strangers from a bus or car window and wondered about them? Teach <b>diagonal</b> and <b>startled</b>. Read the poem aloud once, slowly, then have the child read it.',
      after: 'Pick one stranger in the poem and write three lines about their day from their point of view.' },
    words: [['diagonal', 'slanting, going on an angle'], ['startled', 'suddenly surprised']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'How can you tell this poem is free verse?',
        opts: ['It has a regular rhyme.', 'It has no regular rhyme or rhythm.', 'It is very short.', 'It tells a story.'], a: 1 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Where is the speaker?',
        opts: ['standing at the corner', 'on a bus', 'under the bridge', 'in a bank'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'The newspaper is “like a small, useless roof” ({line:roof}). This simile suggests the man',
        opts: ['is well protected', 'is getting wet anyway', 'is building something', 'is reading the news'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'The girl in the yellow raincoat ({line:yellow}) is different from the man because she',
        opts: ['is running faster', 'seems to enjoy the rain instead of escaping it', 'is waiting for the same bus', 'is feeding pigeons'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Which line best states the main idea of the poem?',
        opts: ['“The 29 bus smells of wet wool” ({line:wool})', '“each of us the centre / of our own wet, crowded day” ({line:centre})', '“under the bank’s stone awning” ({line:awning})', '“and the window darkens” ({line:darkens})'], a: 1 },
      { k: 'lines', code: 'C3.1', n: 4, q: 'At the end, the speaker sees their own face in the dark window and takes a moment to recognize it. Why might the poet end this way? Connect the ending to the rest of the poem.',
        a: 'The speaker has been watching strangers, and suddenly sees themself as a stranger too. It shows that to everyone outside, the speaker is just another face, the centre of their own day, like everyone else.', look: 'the link between watching strangers and seeing oneself as a stranger, with reference to “each of us the centre”' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The city goes by “in pieces” ({line:pieces}). Visualize one piece of the poem. Describe what you see, and explain how picturing it helped you understand.',
        a: 'Example: I see the old woman under the stone awning, the bag rustling and the pigeons crowding her feet. Picturing it made me realize she might be lonely, and the pigeons are her company.', look: 'a clear visualized scene with details, and what it helped the reader understand' }
    ]
  });

  P.add({
    id: 'g7-map-attic', subject: 'story', form: 'Novel excerpt', lines: true,
    title: 'The Map in the Attic',
    deck: 'From a novel written for this site. Rosie and her brother find a map of a town that no longer exists.',
    hero: {
      photo: 'g7-outport.jpg', credit: 'Photo: miguelb, CC BY 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'Fishing boats in a small Newfoundland outport. Many outports could be reached only by sea.'
    },
    body: [
      'The map was folded into eighths and tucked inside a tin that had once held peppermints, at the very bottom of a trunk in Nan’s attic. Rosie almost missed it. She had been searching for Christmas decorations, not history, and the attic in the old house in St. John’s was dim, dusty and crowded with the furniture of three generations.',
      'Cal held the flashlight while she unfolded it on top of a cardboard box. The paper was soft as cloth, and the pencil lines had faded to the colour of weak tea, but the drawing was still clear: a curved harbour, a narrow point of land with a tiny lighthouse, and perhaps thirty small squares scattered along the shore like dice. Beside each square, in careful, slanted handwriting, someone had written a name. <i>Walshes. Kennedys. Uncle Pat’s. The Fowlows. School. Church. Our house.</i>',
      'At the top, underlined twice, were the words <i>Little Harbour, 1966</i>.',
      '“I’ve never heard of Little Harbour,” Cal said.',
      '“That’s because it isn’t there anymore.”',
      'They both jumped. Nan was standing at the top of the ladder, holding the railing with one hand. She did not seem angry. She looked, Rosie thought, like someone who had heard an old song unexpectedly on the radio.',
      'She came over slowly and touched the square labelled <i>Our house</i>. “I drew this the summer before we left,” she said. “I was twelve. The government was paying families to move out of the little outports and into bigger towns, where there were roads and hospitals and high schools. They called it <b>resettlement</b>. Everybody in a community had to agree, or nobody could get the money. Some people wanted to go. Some people would have stayed forever.”',
      '“Which were you?” Rosie asked.',
      'Nan smiled without really smiling. “I was twelve. I wanted to go to a school with a gymnasium.” She traced the shoreline with her finger. “My father wanted to stay. He had fished out of that harbour all his life, and so had his father. But the vote went the other way.”',
      'She told them, then, about the strangest morning of her childhood: the day the men floated the Fowlows’ house across the bay. They lifted it off its foundation, rolled it on logs down to the water, sealed the windows and towed it behind two boats, slowly, for six hours, with the family’s cat still asleep upstairs. The Fowlows refused to leave their house behind, so they simply took it with them.',
      '“And your house?” Cal asked.',
      '“Too big to float.” Nan folded the map carefully along its old creases, eighths and eighths again, and placed it in Rosie’s hands. “It’s still there, I suppose, what’s left of it. The <b>meadow</b> will have grown right up to the door by now.”',
      'Rosie looked at the tiny square, at the two words beside it, written by a girl her own age who had not yet known how much she would miss them.',
      '“Nan,” she said, “can we go and see it?”'
    ],
    guide: { before: 'Find Newfoundland on a map and explain “outport” (a small fishing village, often reachable only by boat). Explain that between 1954 and 1975, about 300 outports were resettled. Teach <b>resettlement</b> and <b>meadow</b>.',
      after: 'Nan wanted to leave when she was twelve, but her father wanted to stay. Who was right? Can both be right?' },
    words: [['resettlement', 'moving people from their homes to live in a new place'], ['meadow', 'a field of grass and wildflowers']],
    qs: [
      { k: 'choice', code: 'C3.1', half: true, q: 'The houses were scattered “like dice” ({line:dice}). This simile suggests the houses were',
        opts: ['small and spread out unevenly', 'brightly coloured', 'built in neat rows', 'very tall'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:foundation}, a “foundation” is',
        opts: ['a charity', 'the base a house stands on', 'a kind of boat', 'a map'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Nan looked “like someone who had heard an old song unexpectedly on the radio” ({line:song}). This suggests she felt',
        opts: ['angry that the children were in the attic', 'suddenly full of old memories', 'confused about where she was', 'excited to dance'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Why did the Fowlows float their house across the bay?',
        opts: ['It was cheaper than building a road.', 'They refused to leave their house behind.', 'The government ordered them to.', 'Their cat would not leave.'], a: 1 },
      { k: 'choice', code: 'C3.5', q: 'Which statement best describes how the people of Little Harbour felt about resettlement?',
        opts: ['Everyone was happy to leave.', 'Everyone wanted to stay.', 'People had different views, and some moved against their wishes.', 'Nobody cared.'], a: 2 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'What does the map symbolize for Nan? Use two details from the excerpt.',
        a: 'The map stands for her lost home and childhood. She kept it for decades in a tin, she touches “Our house,” and she folds it carefully along its old creases before giving it to Rosie.', look: 'a symbolic meaning (memory, lost home, childhood) supported by two details' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'The excerpt ends with Rosie asking to see Little Harbour. Predict what happens next, and give a reason from the text.',
        a: 'Example: I predict they travel by boat to Little Harbour and find the ruins of Nan’s house in the meadow. Nan said it is “still there, I suppose,” and Rosie now feels connected to the place.', look: 'a reasonable prediction supported by a clue from the text' }
    ]
  });

  P.add({
    id: 'g7-substitute', subject: 'story', form: 'Mystery', lines: true,
    title: 'The Substitute',
    deck: 'Ms. Ferreira has never taught at Hillcrest before. So how does she know so much?',
    hero: {
      photo: 'g8-lockers.jpg', credit: 'Photo: ChinaFlag, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 180,
      cap: 'A hallway of school lockers in Markham, Ontario.'
    },
    body: [
      'The substitute arrived at 8:45 on Monday, introduced herself as Ms. Ferreira and wrote her name on the whiteboard in tidy capital letters. She told us Mr. Patel would be away for two weeks, that she expected us to work hard, and that she did not tolerate gum. Ordinary substitute behaviour. Nobody suspected anything.',
      'The first clue came at 9:10. Alexei stood up to sharpen his pencil, and Ms. Ferreira said, without looking up from the attendance list, “Step around the third floorboard from the door. It squeaks.” It did. Everyone in Room 14 knew about that board, but Mr. Patel had never once mentioned it, and he had been teaching in this room for eleven years.',
      'At lunch I described the floorboard incident to Priyanka, who reads more mystery novels than anyone I know. She narrowed her eyes. “One clue is a coincidence,” she said. “Two clues are a pattern. Watch her.”',
      'So we watched.',
      'On Tuesday the radiator under the window began to clank, the way it does every November, and Ms. Ferreira walked over and kicked it, precisely, once, in the lower left corner. The clanking stopped. On Wednesday she referred to the gym as “the new gym,” although the gym had been built before any of us were born. On Thursday, during a fire drill, she led us to the correct meeting spot behind the portables without consulting the map taped beside the door.',
      '“She’s a spy,” said Alexei.',
      '“She’s a former principal in disguise,” said Jordan.',
      '“She’s a time traveller,” said Mei, who was only partly joking.',
      'Priyanka said nothing. She had begun spending her lunch hours in the library, where the school keeps a shelf of old yearbooks that nobody ever opens. On Friday morning she arrived early, slid a heavy blue book across my desk and opened it to a page marked with a sticky note.',
      'The yearbook was from 1989. The photograph showed a Grade 7 class lined up in front of a brick wall that looked exactly like the one outside our window, only less covered in ivy. In the front row, wearing enormous glasses and an <b>exasperated</b> expression, was a girl whose name, according to the caption, was Ana Ferreira.',
      'Underneath her photograph, beside “Most likely to,” someone had written: <i>come back and fix the radiator.</i>',
      'When the bell rang, we waited until the others had gone. Priyanka placed the yearbook on Ms. Ferreira’s desk without saying a word.',
      'Ms. Ferreira looked at it for a long moment. Then she laughed, a real laugh, completely different from her substitute voice. “I sat right there,” she said, pointing at my desk. “The third floorboard squeaked in 1989, too. Some things at Hillcrest are <b>permanent</b>.”'
    ],
    guide: { before: 'Ask: what makes a good mystery (clues, suspects, a solution)? As you read, keep a list of every clue about Ms. Ferreira. Teach <b>exasperated</b> and <b>permanent</b>.',
      after: 'Which clue was the most convincing? Which was the weakest? Why?' },
    words: [['exasperated', 'very annoyed and impatient'], ['permanent', 'lasting forever, or for a very long time']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this story is a mystery?',
        opts: ['It has a poem.', 'Clues are given and the reader tries to solve a puzzle.', 'It gives facts about schools.', 'It has a moral at the end.'], a: 1 },
      { k: 'choice', code: 'C1.6', half: true, q: 'The narrator is',
        opts: ['Ms. Ferreira', 'Priyanka', 'a student in Room 14, using “I”', 'Mr. Patel'], a: 2 },
      { k: 'choice', code: 'C3.2', q: 'Which clue most strongly suggests Ms. Ferreira knew the school long ago?',
        opts: ['She did not allow gum.', 'She called the gym “the new gym.”', 'She wrote her name on the whiteboard.', 'She took attendance.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'Priyanka says, “One clue is a coincidence. Two clues are a pattern” ({line:coincidence}). This line foreshadows that',
        opts: ['more clues will appear', 'the mystery will never be solved', 'Priyanka will become a teacher', 'Ms. Ferreira will leave'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'How did Priyanka solve the mystery?',
        opts: ['She asked Mr. Patel.', 'She found Ms. Ferreira in an old school yearbook.', 'She followed Ms. Ferreira home.', 'She read a mystery novel.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Under her photo, someone wrote that young Ana was “most likely to come back and fix the radiator” ({line:likely}). What does this tell you about the radiator, and about Ana as a student?',
        a: 'The radiator has been noisy since at least 1989, and Ana was known for dealing with it, perhaps by kicking it. Her classmates saw her as practical and a bit of a fixer.', look: 'an inference about the radiator (an old problem) and about Ana (known for fixing it)' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Which thinking skill helped you most to solve this mystery before the end: noticing details, connecting clues, or making predictions? Explain.',
        a: 'Example: Connecting clues helped most. The floorboard alone meant nothing, but with the radiator and “the new gym,” I guessed she had been here long ago.', look: 'one skill named and a clear example of how it helped' }
    ]
  });

  P.add({
    id: 'g7-salt-and-sweet', subject: 'story', form: 'Short story', lines: true,
    title: 'Salt and Sweet',
    deck: 'Layla’s family bakery has a new neighbour. He is not impressed.',
    hero: {
      photo: 'g7-baklava.jpg', credit: 'Photo: Benreis, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Trays of baklava and other pastries made with thin layers of dough, nuts and syrup.'
    },
    body: [
      'Layla’s family opened the Jasmine Bakery on Quinpool Road in Halifax three years after they arrived from Aleppo, and on the first morning Mr. Gallant from the hardware store next door came in, examined the trays of baklava through the glass and announced that it would never last.',
      '“Nobody around here eats that,” he said. “You need doughnuts. Date squares. Something people <b>recognize</b>.”',
      'Layla’s father thanked him politely, the way he thanked everyone, and offered him a piece of ma’amoul, a small round cookie filled with dates. Mr. Gallant declined. He was, he said, a plain-food man.',
      'For the next six months, Mr. Gallant passed the bakery window twice a day and never came in again. Layla, who worked the counter after school, began to think of him as the enemy. When the bakery was busy, she imagined him noticing the line out the door and feeling foolish. When it was quiet, she imagined him noticing that, too.',
      '“He is not our enemy,” her grandmother told her, rolling out pastry dough so thin you could read a newspaper through it. “He is our neighbour who has not yet been fed.”',
      'In February, a storm buried the city under sixty centimetres of snow, and the plows did not reach Quinpool Road until late afternoon. Most shops stayed closed. The Jasmine Bakery opened at six, as always, because Layla’s father believed that people needed bread most on the days when it was hardest to get.',
      'At about ten, Layla looked out the window and saw Mr. Gallant on the sidewalk, attempting to shovel a path to his door with what appeared to be a dustpan. His real shovel, it emerged later, was locked inside the store, and his keys were in his other coat, at home, across the city.',
      'Layla’s father put on his boots, took the bakery’s shovel and went outside without a word. Together the two men cleared both doorways and the sidewalk between them. It took an hour. When they finished, Layla’s grandmother was waiting in the doorway with two cups of sweet mint tea and a plate.',
      'Mr. Gallant hesitated. Then he took a ma’amoul, because it would have been rude not to, and bit into it.',
      'Layla watched his face change. It was the expression of a man discovering that something he had decided about a long time ago might not be true.',
      '“Date squares,” he said slowly, “are basically the same idea.”',
      '“Exactly the same idea,” agreed Layla’s grandmother, who had never tasted a date square in her life.',
      'The next Saturday, Mr. Gallant bought a dozen. By spring, he was bringing his customers over, pointing at the trays through the glass and explaining, with the confidence of an <b>expert</b>, which ones were best with coffee.'
    ],
    guide: { before: 'Find Halifax, Nova Scotia, and Syria on a map. Explain that baklava and ma’amoul are traditional pastries in Syria and many other countries. Teach <b>recognize</b> and <b>expert</b>.',
      after: 'Grandmother says Mr. Gallant is “our neighbour who has not yet been fed.” What does she mean? Is there someone in your life like Mr. Gallant?' },
    words: [['recognize', 'know something because you have seen it before'], ['expert', 'a person who knows a lot about something']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Mr. Gallant says he is “a plain-food man” ({line:plain}). He means he',
        opts: ['likes only familiar, simple food', 'cooks for a living', 'is allergic to dates', 'eats very little'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:declined}, “declined” means',
        opts: ['said no', 'agreed', 'paid', 'complained'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'What does the story suggest about the family’s values?',
        opts: ['They value hospitality and serving the community, even on hard days.', 'They care only about money.', 'They want to change their recipes to fit in.', 'They do not trust their neighbours.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The pastry dough is “so thin you could read a newspaper through it” ({line:newspaper}). This is an example of',
        opts: ['exaggeration (hyperbole)', 'a fact', 'personification', 'rhyme'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does Grandmother agree that the cookies are “exactly the same idea” as date squares, although she has never tasted one?',
        opts: ['She is confused.', 'She wants to help Mr. Gallant accept something new without losing face.', 'She wants to sell date squares.', 'She is making fun of him.'], a: 1 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How does Mr. Gallant’s attitude toward the bakery change? What causes the change?',
        a: 'At first he dismisses the bakery and says nobody will eat its food. After Layla’s father helps him shovel and he tastes the ma’amoul, he becomes a loyal customer and even recommends the pastries. Kindness and a shared experience change his mind.', look: 'the change from dismissive to supportive and the cause (help in the storm, tasting the food)' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What message does the story give about newcomers and belonging? Use one detail as evidence.',
        a: 'Belonging grows through kindness and patience, not by changing who you are. The family keeps making their own pastries and helps Mr. Gallant, and in time he welcomes them.', look: 'a message about belonging or inclusion supported by a detail' }
    ]
  });

  P.add({
    id: 'g7-twenty-five-metres', subject: 'story', form: 'Short story', lines: true,
    title: 'Twenty-Five Metres',
    deck: 'Theo can swim 400 metres without stopping. He cannot bring up the brick.',
    hero: {
      photo: 'g7-pool-lanes.jpg', credit: 'Photo: KeepActive Australia, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Lanes and starting blocks in a swimming pool. Lifesaving tests are often held in pools like this one.'
    },
    body: [
      'The brick lay on the bottom of the deep end, four metres down, a dark rectangle wobbling under the water like a word Theo could not quite read.',
      'It weighed about four and a half kilograms. To pass the final test of his lifesaving course, Theo had to swim fifteen metres underwater, pick it up, carry it back to the surface and tow it to the wall, all within forty seconds. The brick stood in for a person who had sunk. The whole point of the course, as their instructor, Mr. Arsenault, reminded them every Saturday, was that someday the brick might not be a brick.',
      'Theo could swim four hundred metres without stopping. He could tread water for ten minutes. He could tow a classmate the length of the pool in a cross-chest carry. But every time he reached the brick, his ears began to ache, his chest tightened, and some <b>primitive</b> part of his brain announced that the surface was very far away. He would grab at the brick, lose his grip and shoot upward, gasping, empty-handed.',
      'He failed the brick seven times in four weeks.',
      'On the last Saturday before the final test, Mr. Arsenault called him over. Theo expected advice about technique: tuck your chin, kick from the hips, equalize your ears. Instead, the instructor asked him a question.',
      '“When you are going down, what are you thinking about?”',
      '“Coming back up,” Theo said.',
      '“Exactly. You are swimming toward the brick while thinking about the air. Half of you is already leaving.” Mr. Arsenault crouched beside the pool. “Next time, think only about the brick. Look at it. Count its corners. Decide which hand will touch it first. Your body knows how to come back up. It has done that its entire life. You don’t need to remind it.”',
      'It sounded too simple to work. Theo pushed off the wall anyway.',
      'This time he kept his eyes on the brick. He noticed things he had never noticed: a chip in one corner, a faded number painted on its side, the way the light from the ceiling made it ripple. He reached it with his right hand, then his left, and lifted. It was heavier than he expected, and somehow also lighter, because he was not afraid of it.',
      'The surface arrived on its own, exactly as promised.',
      'He towed the brick to the wall in thirty-four seconds. Mr. Arsenault did not cheer. He simply nodded once and wrote something on his clipboard, which Theo later decided was the most <b>gratifying</b> nod of his life.',
      'Two years later, working his first summer as a lifeguard at the town beach, Theo would remember that moment on an afternoon when the brick was not a brick. But that is a different story.'
    ],
    guide: { before: 'Explain what a lifesaving course is, and why lifeguards practise lifting a weight from the bottom of a pool. Ask: have you ever been afraid of something that you knew you could do? Teach <b>primitive</b> and <b>gratifying</b>.',
      after: 'Mr. Arsenault’s advice was about thinking, not swimming. When could his advice help you?' },
    words: [['primitive', 'very basic and ancient, working without thought'], ['gratifying', 'giving a feeling of satisfaction and pride']],
    qs: [
      { k: 'choice', code: 'C3.1', half: true, q: 'The brick wobbles “like a word Theo could not quite read” ({line:wobbling}). This simile suggests the brick seems',
        opts: ['blurry and hard to reach', 'colourful', 'very small', 'easy to lift'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:equalize}, “equalize your ears” most likely means',
        opts: ['make the pressure in your ears match the water around you', 'cover your ears', 'listen carefully', 'clean your ears'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What was really stopping Theo from passing?',
        opts: ['He was not a strong swimmer.', 'His fear of being far from the surface.', 'The brick was too heavy.', 'He did not know the rules.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: '“Someday the brick might not be a brick” ({line:someday}). The brick is a symbol of',
        opts: ['a real person who needs rescuing', 'a building', 'a heavy school bag', 'a test score'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Which sentence uses foreshadowing?',
        opts: ['“He failed the brick seven times in four weeks.”', '“Theo would remember that moment on an afternoon when the brick was not a brick.”', '“It sounded too simple to work.”', '“It weighed about four and a half kilograms.”'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Explain Mr. Arsenault’s advice in your own words. Why did it work for Theo?',
        a: 'He told Theo to focus only on the brick, not on getting back up, and to trust his body to return to the surface. Focusing on details kept Theo’s mind busy, so his fear went away.', look: 'the advice paraphrased (focus on the task, trust your body) and why it reduced fear' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The story ends, “But that is a different story.” Why might the writer end this way?',
        a: 'It creates suspense and makes the reader wonder what happened at the beach. It also shows that Theo’s training mattered in real life, without telling the whole rescue.', look: 'an effect on the reader (suspense, curiosity) and how it links back to the theme' }
    ]
  });

  P.add({
    id: 'g7-first-snow', subject: 'story', form: 'Novel excerpt', lines: true,
    title: 'The First Snow',
    deck: 'From a novel written for this site. Yonas has been in Winnipeg for nine days.',
    hero: {
      photo: 'g6-winnipeg-forks.jpg', credit: 'Photo: Robert Linsdell, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'The Forks, in Winnipeg, Manitoba, where the Red and Assiniboine Rivers meet.'
    },
    body: [
      'On his ninth day in Winnipeg, Yonas woke up and thought, for one confused moment, that someone had painted the world while he slept.',
      'Everything outside his window had been erased and redrawn in white: the parked cars, the fence, the scraggly tree in front of the apartment building, the bicycle someone had abandoned against it. The sky was the colour of a pearl. Large, slow flakes drifted past the glass, not falling so much as wandering, as though they had not decided where to land.',
      'In Asmara, where Yonas had lived until he was ten, the mountains sometimes wore a little frost on winter mornings, and his grandmother had told him stories about snow in faraway countries. In the refugee camp in Ethiopia, where he had lived for the next two years, there had been heat, dust and waiting. He had seen snow in films. He had not understood that it would be silent.',
      'His mother was already dressed for her English class. She stood at the window beside him, holding her tea in both hands. “It looks soft,” she said in Tigrinya. “Like flour.”',
      '“It looks cold,” said his little sister, Saba, from under three blankets.',
      'At school, the other students treated the snow as an <b>inconvenience</b>. They stamped it off their boots and complained about the buses. Only Ms. Kowalski, the teacher who helped Yonas with English every morning, seemed to understand what was happening. When she saw him standing motionless at the classroom window during silent reading, she did not tell him to sit down. She came and stood beside him.',
      '“First snow?” she asked quietly.',
      'He nodded. He did not have the English words for what he felt, and he was not sure he had the Tigrinya words either.',
      'At recess, he went outside in the jacket the <b>settlement agency</b> had given him, which was too thin, and the running shoes he had brought from the camp, which were worse. Within five minutes his hands had stopped belonging to him. He held them under his armpits and watched the other boys play a game that seemed to involve throwing themselves face-first into the snowbanks.',
      'A girl from his class, Hannah, walked over. She did not say anything at first. She pulled off her own mittens, thick red ones with a pattern of white snowflakes, and held them out to him.',
      '“I have extra,” she said. “In my bag.” This was not true, as Yonas discovered later, when he saw her with her hands jammed deep in her pockets for the rest of recess.',
      'He put the mittens on. They were still warm from her hands.',
      'It was the first thing in Canada that felt like it had been made for him, and he would keep those mittens long after his hands had grown too large for them, in a drawer, folded together, like a promise somebody had kept.'
    ],
    guide: { before: 'Find Eritrea (Asmara), Ethiopia and Winnipeg on a world map. Explain that refugees are people forced to leave their country to stay safe, and that Canada welcomes many each year. Teach <b>inconvenience</b> and <b>settlement agency</b> (a group that helps newcomers find homes, schools and supplies).',
      after: 'Hannah told a small lie. Was it a kind lie? Why do small acts of kindness matter so much to newcomers?' },
    words: [['inconvenience', 'something that causes small problems or annoyance'], ['settlement agency', 'a group that helps newcomers settle in Canada']],
    qs: [
      { k: 'choice', code: 'C3.1', half: true, q: 'The snowflakes were “wandering, as though they had not decided where to land” ({line:wandering}). This is an example of',
        opts: ['personification', 'rhyme', 'a fact', 'a list'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:scraggly}, “scraggly” means',
        opts: ['thin and untidy', 'tall and healthy', 'brightly lit', 'brand new'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Yonas “had not understood that it would be silent” ({line:silent}). What does this suggest?',
        opts: ['Snow in real life surprised him in ways films could not show.', 'He could not hear well.', 'He disliked snow.', 'The city was empty.'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'Which detail shows the family is keeping its own language and culture?',
        opts: ['His mother speaks to him in Tigrinya.', 'He wears running shoes.', 'He goes outside at recess.', 'He reads during silent reading.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does Hannah say she has extra mittens?',
        opts: ['She really has three pairs.', 'She wants Yonas to accept them without feeling bad.', 'She does not like red mittens.', 'Her teacher told her to.'], a: 1 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'At the end, the mittens are kept “like a promise somebody had kept.” What do the mittens symbolize for Yonas?',
        a: 'They stand for being welcomed and cared for in his new country. They were the first thing in Canada that felt made for him, a sign that he could belong here.', look: 'a symbolic meaning (welcome, belonging, kindness) linked to a detail from the ending' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'This excerpt is told in the third person, following Yonas. How might the mitten scene be different if Hannah told it?',
        a: 'Hannah could tell us why she decided to help, and how cold her own hands were afterward. We would see Yonas from the outside, shivering in a thin jacket.', look: 'a change in what the reader knows (Hannah’s reasons or feelings; Yonas seen from outside)' }
    ]
  });

  P.add({
    id: 'g7-sash', subject: 'story', form: 'Short story', lines: true,
    title: 'The Sash',
    deck: 'Jolene’s grandfather is coming to her school. She is not sure that is a good idea.',
    hero: {
      photo: 'g6-red-river-cart.jpg', credit: 'Photo: Viola-Ness, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 60%',
      tall: 180,
      cap: 'A full-size model of a Red River cart. Métis families used carts like this to carry goods across the Prairies.'
    },
    body: [
      'When Ms. Laroque announced that each student in 7B would invite a family member to speak about their heritage, Jolene felt her stomach drop several floors. Her classmates were inviting parents who would talk for five minutes and pass around a photo. Jolene had only one option, and he did not do anything in five minutes.',
      'Her grandfather, Norman Beaulieu, was seventy-eight, Métis, and the keenest storyteller in St. Norbert. He had once spent forty minutes explaining to a cashier why Red River carts squealed so loudly that people heard them kilometres away. (Wood rubbed on wood, and grease would have caught dust and ground down the axles, so drivers left them dry. The cashier had not asked.)',
      'On the morning of his visit, Grandpa arrived early, wearing his good jacket and, over it, his sash: a long band of wool woven by hand into arrows of red, blue, green and white, with fringes at both ends. He had brought his fiddle, too, which Jolene had specifically asked him not to bring.',
      'He began, as she had feared, with the carts. But something unexpected happened. Nobody looked bored. When he imitated the screeching wheels, Marcus laughed out loud. When Grandpa explained that a Red River cart could float across a river if you took the wheels off and wrapped the body in buffalo hide, three hands went up at once.',
      'Then he unwound the sash and held it up so the class could see it properly. He told them that his grandmother had woven it without a loom, using only her fingers, in a pattern called <b>fléché</b>, which means “arrowed.” He explained that the sash had been practical: it kept out the wind, carried tools and even served as a rope in an emergency. And he told them that, for many Métis people, its colours now carried meaning: red, he said, for the people who had struggled for Métis rights; blue for the depth of the Métis spirit.',
      '“For a long time,” he said, “some people hid their sashes. They were told being Métis was something to be ashamed of. My own father would not wear his in town.” He paused. “I wear mine everywhere.”',
      'The classroom was very quiet. Jolene was staring at her desk, and her face was hot, and it was not, after all, from embarrassment.',
      'At the end, Grandpa asked if anyone wanted to try a few steps of the Red River jig while he played. Jolene braced herself. But Priya stood up, then Marcus, then half the class, and for four minutes Room 112 was full of stamping feet, laughter and a fiddle tune a century old.',
      'Afterward, as Grandpa packed up, Jolene helped him fold the sash. Then she stopped, held out her hands and asked him to show her how to tie it.',
      'He said nothing. He wrapped it around her waist, knotted it on the left side, the way he had been taught, and let the fringes fall. Then he stepped back and looked at her the way people look at something they have been waiting a long time to <b>witness</b>.'
    ],
    guide: { before: 'Explain that the Métis are one of the three Indigenous peoples recognized in Canada’s Constitution, with a distinct culture that grew from First Nations and European roots, especially around the Red River (Winnipeg). If you can, show a picture of a Métis sash. Teach <b>fléché</b> and <b>witness</b>. Note for the grown-up: this story is written for the site; for C1.7, also read stories by Métis creators.',
      after: 'Why do you think Grandpa’s father would not wear his sash in town, but Grandpa wears his everywhere? What changed?' },
    words: [['fléché', 'French for “arrowed”: the arrow pattern woven into a Métis sash'], ['witness', 'see something happen with your own eyes']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Jolene’s stomach “drop several floors” ({line:stomach})?',
        opts: ['She is hungry.', 'She is worried about how her grandfather’s visit will go.', 'She is excited to present.', 'She feels sick.'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why is the sentence about the cart wheels in brackets ({line:axles})?',
        opts: ['It is a side comment that adds humour and background.', 'It is the most important idea.', 'It is a quotation from a book.', 'It shows Grandpa is angry.'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'According to Grandpa, what was the sash used for in the past?',
        opts: ['only for dancing', 'keeping out the wind, carrying tools and as a rope', 'as a flag', 'as a blanket for babies'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Jolene’s face was hot, “and that it was not, after all, from embarrassment” ({line:embarrassment}). She most likely felt',
        opts: ['angry', 'proud and moved', 'bored', 'afraid'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'At the end, Grandpa ties the sash around Jolene. This action symbolizes',
        opts: ['that the sash is too long for him', 'Jolene accepting and taking pride in her Métis heritage', 'that the presentation is over', 'that Jolene will become a fiddler'], a: 1 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two cultural elements that Grandpa shares with the class, and explain what one of them means to him.',
        a: 'He shares the finger-woven sash and the fiddle music for the Red River jig. The sash means pride: he wears it everywhere because people were once made to feel ashamed of being Métis.', look: 'two elements (sash, fiddle, jig, Red River cart) and the meaning of one, with a detail' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How do Jolene’s feelings about her grandfather’s visit change from the beginning to the end? Use evidence.',
        a: 'At first she is worried and embarrassed; she asked him not to bring the fiddle. By the end she is proud and asks him to teach her how to tie the sash.', look: 'feelings at the beginning and at the end, each supported by a detail' }
    ]
  });

  P.add({
    id: 'g7-unplugged', subject: 'story', form: 'Humour (short story)', lines: true,
    title: 'Unplugged Week',
    deck: 'Dad has a plan to bring the family together. The family has other plans.',
    hero: {
      photo: 'g6-phone-cameras.jpg', credit: 'Photo: U.S. Fish and Wildlife Service Headquarters, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 180,
      cap: 'Two people taking photos with their phones. Many families have more screens than people.'
    },
    body: [
      'It began, as most family disasters do, with my father reading an article.',
      'The article claimed that the average Canadian teenager spends more than seven hours a day looking at screens. My father read it aloud at dinner, slowly, pausing after each statistic to look meaningfully at me, my sister Aria and, for some reason, the dog. Then he announced Unplugged Week: seven days without phones, tablets, video games or television for the entire family. Laptops for homework only. Violators would wash the dishes.',
      'My mother said it was an excellent idea. My grandmother, who lives with us and has never owned a smartphone, said it was the best idea she had heard in years. Aria and I said nothing, because we were already composing our objections in our heads.',
      'Day one went surprisingly well, mostly because everyone was asleep for much of it.',
      'On day two, my mother was discovered in the laundry room checking her work email. She claimed this was an <b>exception</b>, because work is not entertainment. My father pointed out that she had been smiling. She washed the dishes.',
      'On day three, Aria attempted to phone her friend Zoe from the landline, a device none of us had touched in years. Unfortunately, she could not remember Zoe’s number, because it had always lived inside her phone. She sat beside the landline for a long time, looking at it the way you look at a dog that will not fetch.',
      'On day four, I went to the library and borrowed a book. The librarian seemed so pleased that I almost felt guilty.',
      'On day five, my father, the founder and chief enforcer of Unplugged Week, was found in the car in the driveway, engine off, watching the second half of a hockey game on his phone. When my grandmother tapped on the window, he dropped the phone, banged his head on the roof and claimed he had been “checking the weather.” Nobody believed him. The game was in overtime. He washed the dishes for the rest of the week.',
      'By day six, something strange had happened. With nothing else to do in the evenings, we had begun playing cribbage, a card game my grandmother had learned on a fishing boat in Nova Scotia and played with an <b>intensity</b> usually seen in professional athletes. She beat each of us eleven times. She counted points so quickly that we suspected her of inventing them. She would not explain how she did it, and she would not let us quit.',
      'On day seven, we all got our phones back. We checked our messages, which turned out to be less urgent than we had imagined. Then, at around eight o’clock, without anyone saying anything, my father went and got the cribbage board.',
      'We have not officially continued Unplugged Week. But my grandmother is now undefeated in one hundred and four games, and Aria has memorized Zoe’s phone number.'
    ],
    guide: { before: 'Ask: could your family go a week without screens? Who would give up first? Explain that this is a humorous story: watch for exaggeration and surprising twists. Teach <b>exception</b> and <b>intensity</b>.',
      after: 'The family did not keep Unplugged Week, but something changed. What changed, and is that a better result?' },
    words: [['exception', 'something that does not follow the usual rule'], ['intensity', 'great strength, energy or seriousness']],
    qs: [
      { k: 'choice', code: 'C1.5', half: true, q: '“It began, as most family disasters do, with my father reading an article.” ({line:disasters}) The tone of this opening is',
        opts: ['humorous', 'tragic', 'angry', 'scientific'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:Violators}, “violators” are people who',
        opts: ['break the rules', 'play the violin', 'make the rules', 'win a game'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why could Aria not call Zoe from the landline?',
        opts: ['The landline was broken.', 'She had never learned Zoe’s number, because her phone remembered it for her.', 'Zoe was not home.', 'Her father stopped her.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'What is ironic about day five?',
        opts: ['The person who made the rule is caught breaking it.', 'The weather was bad.', 'The hockey game was cancelled.', 'Grandmother broke the rule.'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Which statement best describes the result of Unplugged Week?',
        opts: ['The family gave up screens forever.', 'The rules failed, but the family found a new activity to share.', 'Everyone was angry with Dad.', 'Nothing changed at all.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'At eight o’clock on day seven, Dad gets the cribbage board “without anyone saying anything” ({line:eight}). What does this suggest about the family?',
        a: 'They enjoyed playing together more than they expected. Even with phones back, they chose the game, so the week brought them closer.', look: 'an inference (they enjoyed time together, a new habit) supported by the detail' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Find one example of exaggeration in the story and explain how it adds humour.',
        a: 'Example: Grandmother plays cribbage “with an intensity usually seen in professional athletes.” Comparing a card game to pro sports makes her seriousness funny.', look: 'a quoted example of exaggeration and its humorous effect' }
    ]
  });

  P.add({
    id: 'g7-zucchini', subject: 'story', form: 'Humour (short story)', lines: true,
    title: 'The Zucchini Situation',
    deck: 'Mr. Novak planted twelve zucchini plants. Nobody on Elm Court will forget it.',
    hero: {
      photo: 'g7-zucchini.jpg', credit: 'Photo: George Chernilevsky, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Zucchini and dill in a basket. A single healthy zucchini plant can produce more than twenty zucchini in a summer.'
    },
    body: [
      'Experienced gardeners will tell you that one zucchini plant is plenty for a family. Two is generous. Mr. Novak, who had recently retired from the post office and moved to Elm Court with tremendous energy and very little gardening experience, planted twelve.',
      'For the first few weeks of July, this seemed harmless. The plants grew large, leafy and handsome, with bright yellow flowers the size of teacups. Mr. Novak photographed them daily. Then, in the second week of August, every plant began producing zucchini at the same time, at a rate that seemed to defy the laws of nature.',
      'A zucchini, if you do not pick it, does not politely wait. It keeps growing. By the time Mr. Novak noticed the first one hiding under the leaves, it was roughly the size of my little brother’s arm. By the end of the week, his kitchen counter held thirty-one zucchini, and the garden was producing more every night.',
      'He began, reasonably enough, by giving them away. Everyone on Elm Court received three. The Mendozas made zucchini fritters. The Okafors made soup. My mother, who is a <b>resourceful</b> cook, shredded ours into a chocolate cake, which my brother ate before he learned what was inside.',
      'The following week, Mr. Novak gave everyone three more.',
      'By the third week, the neighbours had stopped answering the door when he knocked. So Mr. Novak changed his strategy. He started leaving zucchini on people’s porches in the early morning, before anyone was awake, sometimes with a cheerful note: <i>Enjoy!</i> or <i>Fresh today!</i> or, once, ominously, <i>More tomorrow.</i>',
      'This is when the situation escalated.',
      'Mrs. Mendoza, who already had nine zucchini in her refrigerator, quietly placed four of them on the Okafors’ porch. The Okafors, discovering them, moved six to the Dubois family. The Dubois family, being clever, waited until dark and left a large paper bag of zucchini on Mr. Novak’s own front step. He found it the next morning and assumed, with great delight, that he had a secret admirer who also grew zucchini.',
      'For ten days, the same vegetables travelled around Elm Court in a slow, secret circle, like a game of hot potato played in slow motion. Some of them visited every house at least twice. My brother claimed to recognize one by a scar on its side and named it Kevin.',
      'Finally, my mother, who believes that every problem can be solved with a gathering, sent a note to every house. On the last Saturday of August, Elm Court held its first Zucchini Festival. There were muffins, fritters, soup, relish, a zucchini-boat race in the Dubois family’s kiddie pool, and a prize for the largest specimen, which Mr. Novak won by a wide margin.',
      'In his speech, he thanked his neighbours for their <b>generosity</b> in sharing their own zucchini with him. Nobody had the heart to tell him.',
      'Next spring, he says, he is planting pumpkins. Fourteen of them.'
    ],
    guide: { before: 'Show a picture of a zucchini plant, or a very large zucchini. Ask: what do you do when you have too much of something? Teach <b>resourceful</b> and <b>generosity</b>.',
      after: 'Is the ending kind or unkind to Mr. Novak? Why did nobody “have the heart to tell him”?' },
    words: [['resourceful', 'good at finding clever ways to solve problems'], ['generosity', 'the quality of giving freely to others']],
    qs: [
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:escalated}, “escalated” means',
        opts: ['became more serious', 'ended', 'went upstairs', 'got smaller'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the neighbours stop answering the door?',
        opts: ['They were on holiday.', 'They did not want more zucchini.', 'They were angry at each other.', 'They were asleep.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'The zucchini travelled around “like a game of hot potato played in slow motion” ({line:potato}). The comparison shows that',
        opts: ['everyone kept passing the zucchini on as quickly as they politely could', 'the zucchini were very hot', 'nobody wanted to play games', 'the zucchini were cooked'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Mr. Novak thinks he has “a secret admirer who also grew zucchini” ({line:admirer}). What is the joke?',
        opts: ['The zucchini in the bag were his own, returned to him.', 'He really has an admirer.', 'He does not like zucchini.', 'The bag was empty.'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Which sentence best states the theme?',
        opts: ['Gardening is difficult.', 'A shared problem can bring a neighbourhood together.', 'Zucchini are healthy.', 'Retirement is boring.'], a: 1 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The last line is, “Fourteen of them.” Why is this a funny way to end the story?',
        a: 'Mr. Novak has learned nothing: after twelve zucchini plants caused chaos, he plans to plant even more pumpkins, which are even bigger. The short sentence lands the joke.', look: 'the humour (he has not learned; more and bigger) and the effect of the short final line' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the story in three sentences: the problem, what the neighbours did, and how it ended.',
        a: 'Mr. Novak planted twelve zucchini plants and grew far too many. His neighbours secretly passed the extras around, even back to him. Finally they held a Zucchini Festival, and he planned to plant fourteen pumpkins next year.', look: 'problem, key events and resolution in the reader’s own words, in about three sentences' }
    ]
  });

  P.add({
    id: 'g7-two-languages', subject: 'story', form: 'Poem', lines: true,
    title: 'Bridge',
    deck: 'A poem about speaking one language at home and another at school',
    hero: {
      photo: 'g6-school-bus.jpg', credit: 'Photo: QUOI Media Group, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'A yellow school bus. For many students, the ride to school is a trip between two worlds.'
    },
    body: [{ box: 'Before you read', text: 'The speaker’s family speaks Tagalog, a language of the Philippines. <i>Anak</i> means “my child,” and <i>Kain na</i> means “Let’s eat.” More than 450 000 people in Canada speak Tagalog.' }].concat(verses([
      'At home I am <i>anak</i>.', 'At home the kitchen talks in Tagalog,', 'the rice cooker clicks,', 'my lola laughs from her whole body', 'at a joke I only half understand,', 'and I laugh too, a beat behind.', '',
      'At school I am Jason,', 'which my mother chose', 'because it sounded strong in English', 'and easy for teachers to say.', 'At school I put my hand up,', 'I spell <b>fluently</b>,', 'I know which jokes are funny', 'and exactly when to laugh.', '',
      'Every morning the bus is a bridge,', 'and somewhere around Albion Road', 'I switch,', 'the way you switch on a light', 'in a room you know well', 'without looking for the wall.', '',
      'Some days I worry', 'that the bridge only goes one way,', 'that each year my Tagalog', 'gets a little smaller,', 'like a sweater', 'washed too many times.', '',
      'So at night I sit with Lola', 'and ask her for the words', 'for things I already know in English:', 'moon, hurry, homesick, proud.', 'She says them slowly,', 'the way you hand someone', 'something <b>fragile</b>.', '',
      'Then she says, <i>Kain na</i>,', 'and I answer her,', 'and for a moment both of my names', 'are sitting at the same table.'
    ])),
    guide: { before: 'Read the box together, and practise saying <i>anak</i> (AH-nak) and <i>Kain na</i> (kah-EEN nah). Ask: do you, or does someone you know, speak one language at home and another at school? Teach <b>fluently</b> and <b>fragile</b>. <i>Lola</i> means grandmother.',
      after: 'What is a word or saying from your family that you would never want to lose?' },
    words: [['fluently', 'smoothly and easily, without mistakes'], ['fragile', 'easily broken; needing care']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'The speaker of the poem is',
        opts: ['Lola', 'the speaker’s mother', 'a student called Jason at school', 'a teacher'], a: 2 },
      { k: 'choice', code: 'C3.2', half: true, q: 'The speaker laughs “a beat behind” ({line:beat}) because',
        opts: ['they did not hear the joke', 'they understand the Tagalog joke only partly', 'the joke was not funny', 'they were eating'], a: 1 },
      { k: 'choice', code: 'C3.1', q: '“The bus is a bridge” ({line:bridge}) is a metaphor. The bridge connects',
        opts: ['two roads', 'the speaker’s home language and world with their school language and world', 'the bus driver and the students', 'the Philippines and Canada by sea'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'The speaker’s Tagalog gets smaller “like a sweater / washed too many times” ({line:sweater}). This simile shows a fear of',
        opts: ['ruining clothes', 'slowly losing the home language', 'growing too fast', 'cold weather'], a: 1 },
      { k: 'choice', code: 'C3.4', q: 'Why does the speaker ask Lola for words they already know in English?',
        opts: ['to test her English', 'to keep their Tagalog alive and stay close to her', 'because they forgot the English words', 'for a school spelling test'], a: 1 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Explain the last two lines: “both of my names / are sitting at the same table.” What has changed for the speaker in this moment?',
        a: 'For once, the speaker does not have to switch. Their Tagalog self (anak) and their English self (Jason) are together, at home with Lola, so they feel whole.', look: 'the idea that the two identities come together, linked to the names anak and Jason' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Connect the poem to your own life, another text or the world. When do people “switch” the way the speaker does?',
        a: 'Example: My cousin speaks Punjabi with our grandparents and English with friends. She says she even feels like a slightly different person in each language.', look: 'a clear connection to switching languages, roles or ways of speaking' }
    ]
  });

  P.add({
    id: 'g7-inventory', subject: 'story', form: 'Poem (list poem)', lines: true,
    title: 'Inventory of My Grandmother’s Kitchen',
    deck: 'A list poem, written on the day the house was sold',
    hero: {
      photo: 'g8-bread-dough.jpg', credit: 'Photo: Ruth Hartnup, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'Bread dough rising in a bowl.'
    },
    body: [{ box: 'What is a list poem?', text: 'A list poem, or catalogue poem, is built from a list of things. An <b>inventory</b> is a complete list of everything in a place. The details on the list, and their order, tell a story without explaining it.' }].concat(verses([
      'One wooden spoon, burnt black at the tip', 'from fifty years of stirring.', '',
      'One mixing bowl, cream-coloured, cracked,', 'held together with a strip of tape', 'that is older than my mother.', '',
      'Six mismatched teacups.', 'Seven, if you count the one with no handle', 'that held the pencils by the phone.', '',
      'One recipe box, the cards soft as cloth,', 'stained with butter and vanilla,', 'written in three languages', 'and one secret code', 'that only she could read.', '',
      'One calendar from last March,', 'still turned to last March.', '',
      'One apron on the hook behind the door,', 'the pocket full of things:', 'a bobby pin, a seed packet, a grocery list', 'that says only <i>flour, eggs, call Ana</i>.', '',
      'One kitchen chair by the window,', 'the cushion pressed into her shape.', 'I do not sit in it.', '',
      'I take the spoon.', 'My mother takes the recipe box.', 'Nobody takes the chair.', '',
      'The new owners will paint the walls.', 'They will not know', 'that the <b>lingering</b> smell of bread', 'is not coming from the bakery', 'down the street.'
    ])),
    guide: { before: 'Read the box. Ask: if you made a list of ten objects in your home, what story would it tell about your family? Teach <b>inventory</b> and <b>lingering</b>. Read the poem aloud once slowly; this poem deals with loss, so leave time to talk.',
      after: 'Which object on the list would you have taken, and why?' },
    words: [['inventory', 'a complete list of everything in a place'], ['lingering', 'staying on, slow to go away']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'How is this poem built?',
        opts: ['as a list of objects in the kitchen', 'as a conversation', 'as a set of rhyming verses', 'as a news report'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'The calendar is “still turned to last March” ({line:still}). This suggests that',
        opts: ['the grandmother liked March', 'the grandmother has been gone since last March', 'the calendar is broken', 'it is March now'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does the speaker say “I do not sit in it” about the chair ({line:sit})?',
        opts: ['The chair is broken.', 'The chair still feels like it belongs to the grandmother.', 'The speaker does not like the window.', 'The new owners own it.'], a: 1 },
      { k: 'choice', code: 'C1.5', q: 'Most verses begin with “One …”. This repetition makes the poem feel like',
        opts: ['a careful, item-by-item record of a life', 'a song for dancing', 'a set of instructions', 'an argument'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'What does the burnt wooden spoon most likely symbolize?',
        opts: ['a cooking accident', 'the grandmother’s many years of cooking and caring for her family', 'something to throw away', 'the new owners'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The poem never says directly what happened to the grandmother. What do you think happened? Give two clues from the poem.',
        a: 'She has most likely died. The calendar stopped last March, the house is being sold, the family divides her things, and nobody will sit in her chair.', look: 'a reasonable inference supported by two clues from the poem' },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Explain the last five lines. Where is the “smell of bread” really coming from, and why won’t the new owners know?',
        a: 'The smell is the memory of the grandmother’s baking that seems to stay in the house. The new owners never knew her, so they will think it is the bakery.', look: 'the smell as memory or a lasting presence, and why only the family would recognize it' }
    ]
  });

  P.add({
    id: 'g7-beaver-allegory', subject: 'story', form: 'Allegory', lines: true,
    title: 'The Beaver Who Built Too Much',
    deck: 'A story about a pond, a dam and a beaver who could not stop',
    hero: {
      photo: 'g4-beaver-lodge.jpg', credit: 'Photo: Benfwilliamson, CC0, Wikimedia Commons', focus: '50% 62%',
      tall: 200,
      cap: 'A beaver lodge in a beaver pond. The dead trees stand where the water rose.'
    },
    body: [
      'In a valley where three streams met, there lived a beaver named Broadtail, who was the finest builder the valley had ever known. When she was young, she built a dam across the middle stream, and a small, clear pond spread behind it. The pond was good for everyone. Fish rested in its deep water. Ducks raised their young among the reeds. The moose came to wade and drink at dusk, and the otters slid down its muddy banks for no reason except joy.',
      'The animals thanked Broadtail, and Broadtail was pleased. But she noticed something about herself that she did not examine closely. She enjoyed being thanked, and she enjoyed building even more.',
      'So the next summer, she raised the dam by half a metre. The pond grew wider, and the animals said, “How generous! There is more water for all of us.” The following summer, she raised it again. The pond swallowed the meadow where the deer grazed, but the deer, being polite, simply moved up the hill.',
      'Broadtail kept building. She told herself that every new layer of sticks and mud was for the good of the valley. A bigger pond meant a safer pond, she said. A safer pond meant more fish, more ducks, more of everything. And each time she said it, she believed it a little more, because she had stopped asking anyone else.',
      'By the fifth summer, the pond had become a lake. It drowned the birch grove where the porcupines lived. It flooded the burrows of the muskrats. It crept around the roots of the old pines until they stood grey and dead in the water, like the masts of sunken ships. Downstream, below the dam, the creek had shrunk to a trickle, and the trout that lived there gasped in warm, shallow pools.',
      'At last the animals came together on the shore. The old heron, who had seen many summers, spoke for them. “Broadtail,” she said, “your first dam gave us a home. Your last five have taken our homes away.”',
      'Broadtail was offended. “I built all of this for you,” she said. “Without me, there would be no pond at all.”',
      '“That is true,” said the heron <b>serenely</b>. “And without the rest of us, there would be no one to build it for.”',
      'That night, a storm came down the valley. The swollen lake pushed against the great dam, and the dam, which had grown too high and too heavy for its old foundations, gave way with a sound like thunder. By morning, the water had drained to the size of the first, small pond, and the stumps of the drowned trees stood in the mud like the bones of a mistake.',
      'Broadtail looked at the ruins for a long time. Then, very slowly, she began to repair the dam: not to its last, great height, but to its first. When she had finished, she did something she had not done in years. She asked the others whether it was enough.',
      'The <b>moral</b>, if you want one: a gift that keeps growing without asking can become a flood.'
    ],
    guide: { before: 'Explain what an allegory is: a story in which characters and events stand for bigger ideas in real life. Ask: can a good thing become harmful if there is too much of it? Teach <b>serenely</b> and <b>moral</b>.',
      after: 'What might Broadtail stand for in our world? A person, a company, a city, a country? Explain your choice.' },
    words: [['serenely', 'calmly and peacefully'], ['moral', 'the lesson a story teaches']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this is an allegory?',
        opts: ['It gives facts about beavers.', 'The animals and events stand for bigger ideas about people.', 'It is told in rhyme.', 'It has a map.'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In {line:grazed}, “grazed” means',
        opts: ['ate grass', 'scraped their knees', 'slept', 'ran quickly'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Broadtail believed her own reasons more “because she had stopped asking anyone else” ({line:stopped}). This shows that',
        opts: ['she was very wise', 'not listening to others let her convince herself she was right', 'the other animals agreed with her', 'she was too busy to talk'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'The dead pines stood “like the masts of sunken ships” ({line:masts}). This simile creates a mood of',
        opts: ['joy', 'loss and ruin', 'excitement', 'peace'], a: 1 },
      { k: 'choice', code: 'C3.5', q: 'Whose point of view does Broadtail ignore for most of the story?',
        opts: ['her own', 'the animals who lost their homes, and the trout downstream', 'the storm', 'the reader'], a: 1 },
      { k: 'lines', code: 'C3.1', n: 4, q: 'This story is an allegory. What real-world situation could it stand for? Explain how two details from the story match that situation.',
        a: 'It could stand for a company or city that keeps growing and says growth helps everyone, but takes over land and harms others. The meadow, birch grove and burrows being flooded are like habitats destroyed by development; the trout downstream are like communities harmed far away.', look: 'a reasonable real-world meaning and two details matched to it' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'At the end, Broadtail “asked the others whether it was enough.” Why is this the most important change in the story?',
        a: 'For years she decided alone and stopped listening. Asking shows she has learned to share decisions with the others her building affects, which is the opposite of how she caused the flood.', look: 'the change (from deciding alone to asking) linked to the cause of the problem' }
    ]
  });

  P.add({
    id: 'g7-opening-night', subject: 'story', form: 'Play script', lines: true, plain: true,
    title: 'Opening Night',
    deck: 'A scene from a play written for this site. Twenty minutes before curtain, the lead actor has lost her voice.',
    hero: {
      photo: 'g7-stage.jpg', credit: 'Photo: Harrison Keely, CC BY 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 170,
      cap: 'Two actors rehearse a scene on stage. In a play, stage directions tell actors how to move and speak.'
    },
    body: [
      '<i>Backstage at a school auditorium. A rack of costumes, a mirror lined with bulbs, a table covered in makeup. MAYA, the stage manager, wears a headset and holds a clipboard. JUNE, the lead actor, sits in costume with a scarf around her throat. BEA, her understudy, sits in the corner reading a script she has clearly read many times.</i>',
      '<b class="ps-who">MAYA:</b> <i>(checking her watch)</i> Twenty minutes. June, say something.',
      '<b class="ps-who">JUNE:</b> <i>(opens her mouth; only a dry squeak comes out)</i>',
      '<b class="ps-who">MAYA:</b> That is not a voice. That is a door hinge.',
      '<b class="ps-who">JUNE:</b> <i>(writes on a notepad and holds it up)</i> I CAN DO IT. TEA AND HONEY.',
      '<b class="ps-who">MAYA:</b> You have drunk four cups of tea and half a jar of honey. Your throat is <b>sticky</b>, not better. <i>(She turns slowly toward the corner.)</i> Bea.',
      '<b class="ps-who">BEA:</b> <i>(looking up, alarmed)</i> No.',
      '<b class="ps-who">MAYA:</b> You are the understudy. This is what understudies are for.',
      '<b class="ps-who">BEA:</b> Understudies are for rehearsals. Understudies are for emergencies that never happen. I have been the understudy for six weeks precisely because nothing was ever going to happen.',
      '<b class="ps-who">MAYA:</b> Something has happened.',
      '<b class="ps-who">BEA:</b> <i>(standing, pacing)</i> Three hundred people are out there. My grandmother is out there. My grandmother does not even know I am in this play, because I did not think I would ever be in this play.',
      '<b class="ps-who">JUNE:</b> <i>(writes quickly, holds up the notepad)</i> YOU KNOW EVERY LINE.',
      '<b class="ps-who">BEA:</b> Knowing the lines is different from saying them in front of people.',
      '<i>JUNE stands, walks over to BEA and, without a word, takes off the costume’s long red coat and holds it out. A pause. BEA does not move.</i>',
      '<b class="ps-who">MAYA:</b> <i>(gently, putting down the clipboard)</i> Can I tell you something? At every rehearsal, when June was saying the lines on stage, I watched you in the <b>wings</b>. Your lips were moving. You were saying every word with her. Sometimes you were saying it better.',
      '<b class="ps-who">BEA:</b> <i>(quietly)</i> You noticed that?',
      '<b class="ps-who">MAYA:</b> I am the stage manager. I notice everything. It is a curse.',
      '<i>BEA looks at the coat for a long moment. Then she takes it and puts it on. It fits. JUNE adjusts the collar, steps back and gives two thumbs up.</i>',
      '<b class="ps-who">MAYA:</b> <i>(into her headset)</i> Lights, this is Maya. We have a change in the cast. <i>(She looks at BEA.)</i> Fifteen minutes. Places in ten.',
      '<b class="ps-who">BEA:</b> <i>(to the mirror, taking a deep breath, in a voice that is suddenly clear and steady)</i> “I have travelled a very long way to stand in this room.”',
      '<i>MAYA and JUNE look at each other. Lights fade.</i>'
    ],
    guide: { before: 'Explain the parts of a play script: the character’s name before each line, and stage directions in italics and brackets, which are not spoken aloud. Explain “understudy” (an actor who learns a role in case the main actor cannot perform). Teach <b>sticky</b> and <b>wings</b> (the hidden sides of a stage). Read it aloud together, taking parts.',
      after: 'Bea’s last line is from the play she is about to perform. Why might the writer end the scene with that line?' },
    words: [['sticky', 'here: thick and gluey, from too much honey'], ['wings', 'the hidden areas at the sides of a stage']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'What do the words in italics and brackets show?',
        opts: ['lines to be spoken loudly', 'stage directions for actions and setting', 'the audience’s thoughts', 'words in another language'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: '“That is not a voice. That is a door hinge.” ({line:hinge}) This line is an example of',
        opts: ['a metaphor used for humour', 'a simile', 'rhyme', 'foreshadowing'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does June write on a notepad instead of speaking?',
        opts: ['She is shy.', 'She has lost her voice.', 'She is practising her lines.', 'She is angry with Maya.'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'June offers Bea the red coat “without a word” ({line:coat}). What is June telling Bea?',
        opts: ['that the coat is too hot', 'that she trusts Bea to take her place', 'that she wants a different costume', 'that the play is cancelled'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'What finally convinces Bea to go on stage?',
        opts: ['Her grandmother asks her to.', 'Maya tells her she has watched Bea say every line with June, sometimes better.', 'June gets her voice back.', 'The audience leaves.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Bea’s voice is “suddenly clear and steady” at the end ({line:steady}). What has changed inside her? Use evidence from the scene.',
        a: 'She has found confidence. Earlier she paced and said she could not perform, but after Maya’s words and June’s trust, she puts on the coat and speaks the line calmly.', look: 'the change from fear to confidence, with evidence from before and after' },
      { k: 'lines', code: 'C1.2', n: 3, q: 'A play is meant to be performed. Choose one stage direction and explain how it helps an actor or the audience understand a character’s feelings.',
        a: 'Example: “(standing, pacing)” shows Bea is nervous and cannot sit still. An actor would walk back and forth to show the audience her panic.', look: 'a quoted stage direction and the feeling it shows through action' }
    ]
  });

  P.add({
    id: 'g7-interpreter-interview', subject: 'social', form: 'Interview', lines: true, plain: true,
    title: 'Between Two Languages',
    deck: 'A student newspaper interviews a sign language interpreter',
    hero: {
      photo: 'g7-asl-alphabet.png', credit: 'Diagram: Marnanel, after Dancor and Ds13, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 218,
      cap: 'The ASL finger-spelling alphabet. Signers spell names and some words letter by letter.'
    },
    body: [
      '<i>When Westdale Public School held its Remembrance Day assembly, two interpreters stood beside the stage, translating every word into American Sign Language (ASL) for Deaf students and families. Grade 7 reporter Amira Hassan spoke with one of them, Danielle Côté, a <b>certified</b> ASL-English interpreter from Ottawa.</i>',
      '<b class="ps-who">Amira:</b> Many people think sign language is just English made with your hands. Is that true?',
      '<b class="ps-who">Danielle:</b> It is the most common misunderstanding about my work. ASL is a complete language, with its own vocabulary and grammar, and it is quite different from English. Facial expressions are part of the grammar: raising your eyebrows can turn a statement into a question. In Canada there are two main sign languages, ASL and Langue des signes québécoise, or LSQ, which is used mostly in Quebec. Just as English and French are separate languages, so are ASL and LSQ.',
      '<b class="ps-who">Amira:</b> Why were there two of you at the assembly?',
      '<b class="ps-who">Danielle:</b> Interpreting is mentally exhausting. You are listening to one language, understanding it, rearranging it into the structure of another language and producing it, all at the same moment and without falling behind. After about twenty minutes, accuracy begins to drop, so interpreters usually work in pairs and switch. The one who is resting is not really resting, though. She is watching, ready to feed her partner a word or a number that was missed.',
      '<b class="ps-who">Amira:</b> What is the hardest thing to interpret?',
      '<b class="ps-who">Danielle:</b> Jokes, without question. A joke built on two English words that sound alike usually has no equivalent in ASL, so I have to decide in a split second whether to explain it, replace it with something that works in ASL, or simply let the audience know a joke was made. Poems and songs are difficult too. At the assembly, the choir sang, and I had to convey not only the words but the rhythm and the feeling.',
      '<b class="ps-who">Amira:</b> You wrote “Deaf” with a capital D in your email. Why?',
      '<b class="ps-who">Danielle:</b> Lowercase “deaf” describes not being able to hear. Capital-D “Deaf” describes a cultural community, with its own language, history, art and humour. Many Deaf people do not see themselves as missing something. They see themselves as members of a linguistic minority, like francophones in Alberta.',
      '<b class="ps-who">Amira:</b> What can hearing students do to be more <b>inclusive</b>?',
      '<b class="ps-who">Danielle:</b> Learn a few signs, starting with the finger-spelling alphabet. Face a Deaf person when you speak, and do not cover your mouth. And never say “never mind” if someone misses something. To a Deaf person, those two words mean, “You are not worth repeating it for.”',
      { img: 'g7-interpreter.jpg', credit: 'Photo: Stephan Röhl, Heinrich-Böll-Stiftung, CC BY-SA 2.0, Wikimedia Commons', tall: 90, cap: 'An interpreter at work.' }
    ],
    guide: { before: 'Ask what the child knows about sign language. Look at the finger-spelling alphabet together and try spelling your first names. Teach <b>certified</b> (officially trained and tested) and <b>inclusive</b>.',
      after: 'Danielle says “never mind” can hurt. What other small habits might leave people out without our noticing?' },
    words: [['certified', 'officially trained and tested to do a job'], ['inclusive', 'making sure everyone can take part and belong']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'According to Danielle, what is the most common misunderstanding about sign language?',
        opts: ['that it is hard to learn', 'that it is just English made with the hands', 'that it is used only in Quebec', 'that it has no alphabet'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['how to sign whole sentences', 'one handshape for each letter of the alphabet', 'the grammar of ASL', 'how to read lips'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Why do interpreters usually work in pairs?',
        opts: ['It looks better on stage.', 'Interpreting is so tiring that accuracy drops after about twenty minutes.', 'One signs ASL and the other signs LSQ.', 'One interprets jokes and the other interprets songs.'], a: 1 },
      { k: 'choice', code: 'B2.2', q: 'A joke “has no equivalent in ASL” ({line:equivalent}). Equivalent means',
        opts: ['something that means the same thing', 'a translation error', 'a funny sign', 'a written word'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'Why does Danielle compare Deaf people to “francophones in Alberta” ({line:Alberta})?',
        opts: ['Most Deaf people live in Alberta.', 'Both are communities that share a language that is not the majority’s.', 'Both use LSQ.', 'Both need interpreters at school.'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Name two things hearing students can do to be more inclusive of Deaf people, according to the interview, and explain why one of them matters.',
        a: 'Learn some signs, such as finger-spelling, and face a Deaf person when speaking. Facing them matters because many Deaf people read lips and facial expressions, which carry meaning.', look: 'two actions from the text, and a reason for one' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Danielle says the resting interpreter “is not really resting” ({line:resting}). What does this show about the job?',
        a: 'The job needs constant attention and teamwork. Even while not signing, the partner watches closely to catch and supply missed words or numbers.', look: 'an inference about the job (teamwork, concentration) supported by the quote' }
    ]
  });

  P.add({
    id: 'g7-ice-safety-notice', subject: 'health', form: 'Safety notice', lines: true, plain: true,
    title: 'Before You Step on the Ice',
    deck: 'A safety notice posted at the entrance to a conservation area',
    hero: {
      photo: 'g4-thin-ice.jpg', credit: 'Photo: Nolabob, CC0, Wikimedia Commons', focus: '50% 60%',
      tall: 170,
      cap: 'A thin ice warning sign beside a frozen pond.'
    },
    body: [
      '<b class="ps-who">Mill Creek Conservation Area · Winter Safety Notice</b>',
      'Every winter, people across Canada fall through ice that looked perfectly safe from the shore. Many of these accidents happen in early winter or late in the season, when the ice is changing quickly, and many involve people who had walked on the same pond or river safely the week before. Ice is never completely safe. However, you can greatly reduce the risk by checking it carefully and by understanding what you are looking at.',
      { h: 'Check the thickness' },
      'Before anyone goes out, an adult should drill or chip a test hole near the shore and measure the ice. Then check again every few metres, because ice thickness can change dramatically across a single pond. Use the chart below as a guide for clear, solid ice. These are minimums, not guarantees.',
      { h: 'Check the colour' },
      'Clear blue or black ice is the strongest. White, cloudy ice forms when snow or slush freezes on top, and because it is full of trapped air, it is only about half as strong. Grey ice is the most dangerous of all: the grey colour means there is water inside it, and it should never be trusted.',
      { h: 'Know where ice is thinner' },
      'Ice is usually weaker near <b>inflows</b> and outflows, where moving water wears it away from below. It is also thinner around docks, rocks and fallen trees, which <b>absorb</b> heat from the sun, and beneath snowbanks, which act like a blanket and slow freezing.',
      { h: 'If you go through' },
      'Stay calm and try to control your breathing; the cold shock will make you gasp for about a minute. Turn back toward the direction you came from, because that ice held you before. Put your arms on the surface, kick your legs to raise your body flat, and pull yourself out like a seal. Then roll away from the hole instead of standing. Never go out on the ice alone, and tell someone where you are going.',
      'Questions about conditions? Ask at the visitor centre. Our staff test the ice on the main pond every morning and post the results by 10 a.m.',
      { fig: [['15 cm', 'one person walking or skating', 70], ['20 cm', 'a group skating or playing games', 100], ['25 cm', 'a snowmobile', 130]].map(function (r, i) {
          var y = 10 + i * 40;
          return '<rect class="k" x="10" y="' + y + '" width="' + r[2] + '" height="26"/><text class="lb" x="' + (r[2] + 18) + '" y="' + (y + 12) + '">' + r[0] + '</text><text class="n" x="' + (r[2] + 18) + '" y="' + (y + 24) + '">' + r[1] + '</text>';
        }).join('') + '<text class="n" x="10" y="138">no cars or trucks on any lake without local advice</text>',
        tall: 144, cap: 'Smallest safe thickness of clear, solid ice, based on Canadian Red Cross advice.' }
    ],
    guide: { before: 'Ask: have you ever walked or skated on a frozen pond or lake? How did you know it was safe? Look at the chart first. Teach <b>inflows</b> (where water enters a lake) and <b>absorb</b>.',
      after: 'Make a three-step checklist that you would use before stepping onto ice.' },
    words: [['inflows', 'places where a stream or river flows into a lake or pond'], ['absorb', 'soak up or take in']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What is the main purpose of this notice?',
        opts: ['to advertise skating lessons', 'to help visitors judge ice safety and avoid accidents', 'to explain how ponds form', 'to sell ice-fishing gear'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the chart, how thick should clear ice be for a group of people skating?',
        opts: ['10 cm', '15 cm', '20 cm', '25 cm'], a: 2 },
      { k: 'choice', code: 'C1.3', q: 'How do the headings help a reader?',
        opts: ['They tell a story in order.', 'They divide the advice into topics that are easy to find quickly.', 'They show which rules are most fun.', 'They list the staff.'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Why is white, cloudy ice weaker than clear ice?',
        opts: ['It is warmer.', 'It is full of trapped air.', 'It is thinner.', 'It has salt in it.'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'The notice says to turn back “because that ice held you before” ({line:held}). The reasoning is that',
        opts: ['the ice behind you has already proven strong enough', 'it is closer to the shore', 'it is darker', 'it is easier to swim that way'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain two reasons that ice can be thin near docks, rocks or fallen trees and near inflows.',
        a: 'Docks, rocks and trees absorb heat from the sun and warm the ice around them. At inflows and outflows, moving water wears away the ice from below.', look: 'both reasons: heat absorbed by objects, and moving water underneath' },
      { k: 'lines', code: 'C2.6', n: 4, q: 'In your own words, summarize what to do if you fall through the ice, in the correct order.',
        a: 'Stay calm and control your breathing. Turn back the way you came. Put your arms on the ice and kick to lie flat. Pull yourself out like a seal, then roll away from the hole.', look: 'the main steps in order, in the reader’s own words' }
    ]
  });

  P.add({
    id: 'g7-dark-sky-poster', subject: 'science', form: 'Poster', lines: true, plain: true,
    title: 'Turn Off the Lights, Turn On the Stars',
    deck: 'A poster for a public star-watching night',
    hero: {
      photo: 'g6-aurora.jpg', credit: 'Photo: raymond22112376, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 170,
      cap: 'The northern lights over Yellowknife. Far from city lights, the night sky can be astonishing.'
    },
    body: [
      '<b class="ps-who">Dark Sky Night · Friday, October 9 · 8 p.m. to midnight · Hilltop Field, Silver Lake Conservation Area · Free</b>',
      { h: 'What is happening?' },
      'Join the Silver Lake Astronomy Club for an evening under one of the darkest skies within two hours of the city. Club members will set up six telescopes pointed at Saturn, the Moon, star clusters and the Andromeda Galaxy, the most distant object you can see without a telescope. At 9 p.m., a short talk will explain how to find the North Star using the Big Dipper. If the sky cooperates, we may even see the northern lights.',
      { h: 'Why darkness matters' },
      'In a big city, artificial light glowing into the sky hides all but a few dozen of the brightest stars. This <b>light pollution</b> affects more than astronomers. Migrating birds, which navigate partly by the stars, become confused and collide with lit buildings. Sea turtles, insects and even trees are affected by night that never becomes truly dark. Most light pollution comes from fixtures that shine upward or sideways, where no one needs the light. Shielding lights so that they point down can recover a surprising amount of the night sky.',
      { h: 'What to bring' },
      'Warm layers, even if the afternoon is mild; a lawn chair or blanket; a thermos of something hot; and binoculars if you have them. Bring a flashlight covered with red cellophane. Red light does not ruin your night vision, which takes about twenty to thirty minutes to fully <b>adapt</b> to the dark.',
      { h: 'Please remember' },
      'Turn off your car headlights as you enter the field, and park facing away from the telescopes. No white flashlights or phone screens on the hill: one bright screen can spoil the view for everyone nearby. Children are welcome and must stay with an adult. The event will be cancelled if the sky is cloudy; check the club’s website by 5 p.m. on the day.',
      { fig: '<circle class="dot" cx="40" cy="96" r="3"/><circle class="dot" cx="80" cy="110" r="3"/><circle class="dot" cx="120" cy="108" r="3"/><circle class="dot" cx="156" cy="100" r="3"/>' +
          '<circle class="dot" cx="168" cy="132" r="3"/><circle class="dot" cx="216" cy="138" r="3"/><circle class="dot" cx="226" cy="104" r="3"/>' +
          '<path class="t" d="M40 96 L80 110 L120 108 L156 100 L168 132 L216 138 L226 104 L156 100"/>' +
          '<path class="d" d="M216 138 L226 104 L254 14"/><circle class="dot" cx="254" cy="14" r="4.5"/>' +
          '<text class="lb" x="262" y="18">North Star</text><text class="n" x="236" y="64">follow the pointer</text><text class="n" x="236" y="76">stars about 5 times</text><text class="n" x="236" y="88">their distance apart</text>' +
          '<text class="n" x="60" y="152">Big Dipper</text><text class="n" x="218" y="156">pointer stars</text>',
        tall: 162, cap: 'How to find the North Star: follow the two “pointer stars” at the end of the Big Dipper’s bowl.' }
    ],
    guide: { before: 'Go outside on a clear night if you can, or look at a star chart. Find the Big Dipper and the North Star using the diagram. Teach <b>light pollution</b> and <b>adapt</b>.',
      after: 'Where near you is the darkest sky? What lights near your home could be shielded or turned off?' },
    words: [['light pollution', 'too much artificial light at night, which hides the stars'], ['adapt', 'change to suit new conditions']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Who is putting on this event?',
        opts: ['a school', 'the Silver Lake Astronomy Club', 'a city council', 'a telescope store'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, how do you find the North Star?',
        opts: ['Follow the Big Dipper’s handle.', 'Follow the two pointer stars at the end of the bowl.', 'Look straight up.', 'Look for the brightest star.'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Why should visitors cover their flashlights with red cellophane?',
        opts: ['Red light looks festive.', 'Red light does not ruin night vision.', 'Red light is brighter.', 'It is a club tradition.'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'The section “Why darkness matters” is organized mainly as',
        opts: ['a story', 'a problem, its effects and a solution', 'a list of times', 'a comparison of two planets'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'The poster says, “If the sky cooperates” ({line:cooperates}). This means',
        opts: ['if the weather is clear', 'if the club allows it', 'if the stars move', 'if people arrive on time'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Light pollution affects more than astronomers. Give two examples from the poster.',
        a: 'Migrating birds become confused and fly into lit buildings. Sea turtles, insects and trees are also affected when night never becomes truly dark.', look: 'two effects on living things from the text' },
      { k: 'lines', code: 'C1.2', n: 3, q: 'Why do you think the poster includes rules about headlights and phone screens, as well as information about the stars?',
        a: 'The event only works if it stays dark. One bright light can spoil everyone’s view and night vision, so the organizers must explain how to keep the field dark.', look: 'the link between the rules and the purpose of the event (keeping it dark for everyone)' }
    ]
  });

  P.add({
    id: 'g7-salt-lab-log', subject: 'science', form: 'Lab notebook', lines: true, plain: true,
    title: 'Which Melts Ice Fastest?',
    deck: 'Pages from a Grade 7 science fair notebook',
    hero: {
      photo: 'g4-science-fair.jpg', credit: 'Photo: U.S. Navy, public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 160,
      cap: 'Students explain their projects at a science fair.'
    },
    body: [
      '<b class="ps-who">Question · January 8</b>',
      'Every winter, our town spreads salt on the roads and sidewalks. My uncle, who owns a garden centre, says some customers buy sand instead, and some buy sugar beet mixtures that are supposed to be gentler on plants and pets. I want to know: which of these melts ice fastest?',
      '<b class="ps-who">Hypothesis · January 8</b>',
      'I predict that table salt will melt the ice fastest, because salt lowers the temperature at which water freezes. I predict that sand will not melt the ice at all, because sand does not dissolve.',
      '<b class="ps-who">Method · January 10</b>',
      'I froze 20 identical ice cubes of 30 grams each. I placed four cubes in each of five dishes and kept the dishes in our garage, where the temperature was minus 2 degrees Celsius. To each dish I added 5 grams of one material: table salt, coarse road salt, sugar or sand. The fifth dish got nothing. This was my <b>control</b>, so I could compare the others against ice with no treatment. After 45 minutes, I poured off the meltwater from each dish and weighed it.',
      'To make it a fair test, I kept every <b>variable</b> the same except the material: same size cubes, same dishes, same amount of material, same location and same time. I ran the whole experiment three times on three different days and averaged the results.',
      '<b class="ps-who">Results · January 14</b>',
      'Table salt melted the most ice, followed closely by road salt. Sugar melted some ice, but much less. Sand and the control melted almost nothing. The table salt dishes were noticeably colder to the touch than the others, which surprised me.',
      '<b class="ps-who">Conclusion · January 15</b>',
      'My hypothesis was correct about table salt and sand. Road salt worked nearly as well as table salt; its larger crystals may dissolve more slowly. Sugar also lowers the freezing point, but a gram of sugar contains far fewer particles than a gram of salt, which probably explains why it melted less. Sand did not melt anything, but it may still be useful, because it adds grip.',
      'Next steps: I would like to test what salt does to soil and plants, because my uncle says lawns beside salted sidewalks often turn brown in spring. Melting ice is only half the question. The other half is what the meltwater does afterward.',
      { fig: [['table salt', 41], ['road salt', 36], ['sugar', 14], ['sand', 2], ['nothing', 1]].map(function (r, i) {
          var y = 6 + i * 26;
          return '<text class="l" x="74" y="' + (y + 14) + '" text-anchor="end">' + r[0] + '</text><rect class="k" x="80" y="' + y + '" width="' + Math.max(2, r[1] * 4.6) + '" height="18"/><text class="n" x="' + (86 + r[1] * 4.6) + '" y="' + (y + 13) + '">' + r[1] + ' g</text>';
        }).join('') + '<text class="n" x="80" y="146">average meltwater after 45 minutes (3 trials)</text>',
        tall: 152, cap: 'My results: grams of meltwater from 120 g of ice in each dish.' }
    ],
    guide: { before: 'Review the parts of an experiment: question, hypothesis, method, results, conclusion. Explain a fair test (change one thing only). Teach <b>control</b> and <b>variable</b> (anything that can change in an experiment).',
      after: 'What would you test next? Design a fair test in three sentences.' },
    words: [['control', 'the part of an experiment with no treatment, used for comparison'], ['variable', 'anything that can change in an experiment']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'How is this notebook organized?',
        opts: ['by the steps of a science experiment', 'from least to most important', 'as a list of materials', 'as a story with dialogue'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, about how much ice did sugar melt?',
        opts: ['1 g', '14 g', '36 g', '41 g'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Why did the student include a dish with nothing added?',
        opts: ['to have a spare dish', 'to compare the treated ice against untreated ice', 'to test sand', 'to save money'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why did the student run the experiment three times?',
        opts: ['The first two failed.', 'Repeating trials makes the results more reliable.', 'The teacher required three dishes.', 'To use up the salt.'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Which statement does the student’s data support?',
        opts: ['Sand melts ice as well as salt.', 'Road salt melted nearly as much ice as table salt.', 'Sugar melted the most ice.', 'The control melted 14 g.'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The student says sand “may still be useful” ({line:grip}). Explain why, even though it did not melt ice.',
        a: 'Sand does not melt ice, but it makes the surface rough, so people and cars get more grip and are less likely to slip.', look: 'the idea of traction or grip as a different purpose from melting' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'The student wants to test what salt does to soil and plants. Predict the result, and explain your prediction using a detail from the text.',
        a: 'I predict the plants near the salted soil will grow less or turn brown. The uncle says lawns beside salted sidewalks often turn brown in spring.', look: 'a prediction supported by the uncle’s observation or other reasoning' }
    ]
  });

  P.add({
    id: 'g7-three-oceans-book', subject: 'geography', form: 'Book front pages', lines: true, plain: true,
    title: 'Three Oceans: The Coasts of Canada',
    deck: 'The title page, contents and introduction of an information book',
    hero: {
      photo: 'g8-iceberg.jpg', credit: 'Photo: Eduard47, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 150,
      cap: 'An iceberg near Twillingate, Newfoundland and Labrador. This photo appears on the book’s cover.'
    },
    body: [
      '<b class="ps-who">Title page</b>',
      '<i>Three Oceans: The Coasts of Canada.</i> Written by Teresa Okpik. Illustrated by Daniel Mah. Maps by Sofia Rinaldi. Northern Shore Press, Halifax, 2026.',
      { h: 'Contents' },
      'Introduction: A Country Shaped by Water ……… 1',
      'Chapter 1: The Atlantic: Fog, Fisheries and Tides ……… 4',
      'Chapter 2: The Bay of Fundy, Where the Sea Breathes ……… 18',
      'Chapter 3: The Pacific: Rainforests at the Water’s Edge ……… 26',
      'Chapter 4: Salmon, Orcas and Kelp Forests ……… 40',
      'Chapter 5: The Arctic: A Coast of Ice ……… 52',
      'Chapter 6: Living on the Arctic Coast: Inuit Knowledge ……… 66',
      'Chapter 7: Changing Coasts: Storms, Erosion and Warming Seas ……… 80',
      'Glossary ……… 94 · Index ……… 98 · Further reading ……… 102',
      { h: 'Introduction: A Country Shaped by Water' },
      'Canada has the longest coastline of any country in the world: about 243 000 kilometres, if you include the shores of all its islands. That is long enough to wrap around the equator six times. Three oceans touch Canada, and each one has shaped the land, the climate, the wildlife and the lives of the people who live beside it.',
      'On the Atlantic coast, cold currents and warm currents meet, creating thick fog and some of the richest fishing grounds on Earth. On the Pacific coast, moist ocean air drops enormous amounts of rain, feeding temperate rainforests where trees can live for more than a thousand years. Along the Arctic coast, which makes up most of Canada’s shoreline, the sea is frozen for much of the year, and Inuit have lived, travelled and hunted on the sea ice for thousands of years.',
      'This book visits all three coasts. You can read it from beginning to end, or you can begin with whichever ocean interests you most. Words in <b>bold</b> type are explained in the glossary at the back, and the index will help you find any topic quickly. Each chapter ends with a short <b>profile</b> of a person who lives or works on that coast.',
      { fig: '<text class="lb" x="8" y="16">Index (sample)</text>' +
          ['Bay of Fundy, 18–25', 'beluga, 56, 62', 'fog, 6–7', 'kelp forests, 44–47', 'sea ice, 52–58, 70, 86', 'tides, 20–23'].map(function (t, i) { return '<text class="l" x="12" y="' + (38 + i * 18) + '">' + t + '</text>'; }).join('') +
          '<path class="t" d="M4 24 H296"/>',
        tall: 150, cap: 'Part of the book’s index. Page numbers show where each topic appears.' }
    ],
    guide: { before: 'Hold up a real non-fiction book and find its title page, contents, glossary and index together. Explain that tests sometimes ask where in a book to find information. Teach <b>profile</b> (a short piece about one person) and point out that <b>bold</b> is both a word to know and an example.',
      after: 'Which chapter would you read first? Why? Where would you look to find the meaning of a word you did not know?' },
    words: [['bold', 'thick, dark type used to make words stand out'], ['profile', 'a short piece of writing about one person']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'Who drew the illustrations in this book?',
        opts: ['Teresa Okpik', 'Daniel Mah', 'Sofia Rinaldi', 'Northern Shore Press'], a: 1 },
      { k: 'choice', code: 'C1.3', half: true, q: 'On which page does the chapter about the Arctic coast begin?',
        opts: ['4', '26', '52', '80'], a: 2 },
      { k: 'choice', code: 'C2.4', q: 'A reader wants to find out how high the tides are in the Bay of Fundy. Which pages should they read?',
        opts: ['4 to 17', '18 to 25', '40 to 51', '94 to 97'], a: 1 },
      { k: 'choice', code: 'C2.4', q: 'A reader finds the word “temperate” and does not know what it means. Where is the best place to look?',
        opts: ['the title page', 'the contents', 'the glossary', 'Chapter 7'], a: 2 },
      { k: 'choice', code: 'C1.4', q: 'Use the sample index. On which pages would you find information about kelp forests?',
        opts: ['6 to 7', '18 to 25', '44 to 47', '52 to 58'], a: 2 },
      { k: 'lines', code: 'C1.3', n: 3, q: 'The introduction says you can read the book from beginning to end or start with any ocean. Which features of the book make it easy to start anywhere?',
        a: 'The contents shows where each ocean’s chapters begin, the index lists topics with page numbers, and the glossary explains bold words, so a reader does not need earlier chapters.', look: 'two features (contents, index, glossary, chapter organization by ocean) and how they help' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Choose one chapter you would read for a project, and explain why that chapter suits your purpose.',
        a: 'Example: For a project on climate change, I would read Chapter 7, because it is about storms, erosion and warming seas on all three coasts.', look: 'a chapter chosen and a clear link between its title and a purpose' }
    ]
  });

  P.add({
    id: 'g7-quiet-room-speech', subject: 'health', form: 'Speech', lines: true, plain: true,
    title: 'A Room to Breathe',
    deck: 'A speech by a Grade 7 student at a student council meeting',
    hero: {
      photo: 'g8-stress.jpg', credit: 'Photo: University of Illinois Library, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 160,
      cap: 'A student working alone in a quiet library.'
    },
    body: [
      'Good afternoon, members of the student council, Ms. Desrosiers, and everyone who came to listen.',
      'Close your eyes for a moment. Imagine the cafeteria at 12:05 on a Friday. Four hundred voices. Chairs scraping. Someone dropping a tray. The bell, the announcements, the smell of fries. Now imagine that every one of those sounds feels as loud to you as a fire alarm, and that there is nowhere in this building you are allowed to go to make it stop.',
      'For some students at Lakeview, that is not imaginary. That is lunch.',
      'My name is Kiran Bhatt, and I am here to propose that our school create a quiet room: one small, calm space where any student can go for ten or fifteen minutes when they feel overwhelmed, with soft lighting, a few comfortable chairs and one rule, which is silence.',
      'Some of you might be thinking that this is only for a few people. It is not. Health experts estimate that about one in five young people in Canada will face a mental health challenge such as anxiety. Many others, including students who are autistic or who have <b>sensory</b> sensitivities, find noise and crowds genuinely painful. And honestly, all of us have days when the hallway feels like too much. Last month, our class surveyed 150 students. The results are on the chart beside me. More than half said they would use a quiet room at least sometimes.',
      'Some of you might be worried that students would use the room to skip class. That is a fair concern, so here is our plan. The room would be open only at lunch and before school. Students would sign in, and a staff volunteer, Mr. Ellis has already offered, would be nearby. Schools in other boards, including two in our own city, already have rooms like this, and their principals report that students who use them are more focused afterward, not less.',
      'And some of you might be wondering where we would put it. The old book room on the second floor has been empty since September. It needs paint, two lamps and some chairs. Our class has already raised 340 dollars from a bake sale to pay for them.',
      'We talk a lot at this school about <b>inclusion</b>. We put up posters about it. We have an assembly about it every year. But inclusion is not just a poster. Sometimes it is a door that you can close.',
      'I am asking you to vote yes. Thank you.',
      { fig: [['often', 28], ['sometimes', 52], ['rarely', 38], ['never', 32]].map(function (r, i) {
          var y = 8 + i * 30;
          return '<text class="l" x="70" y="' + (y + 15) + '" text-anchor="end">' + r[0] + '</text><rect class="k" x="78" y="' + y + '" width="' + r[1] * 3.6 + '" height="20"/><text class="n" x="' + (84 + r[1] * 3.6) + '" y="' + (y + 14) + '">' + r[1] + '</text>';
        }).join('') + '<text class="n" x="78" y="136">students (out of 150)</text>',
        tall: 142, cap: 'Survey of 150 Lakeview students: “Would you use a quiet room at lunch?”' }
    ],
    guide: { before: 'Ask: is there a time of day at school that feels too loud or crowded? Explain that a speech is written to be heard, so it uses techniques such as speaking directly to the audience and repeating key phrases. Teach <b>sensory</b> and <b>inclusion</b>.',
      after: 'Would you vote yes or no? What is one more argument Kiran could have used?' },
    words: [['sensory', 'to do with the senses: hearing, sight, touch, smell and taste'], ['inclusion', 'making sure everyone can take part and belong']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What is the purpose of this speech?',
        opts: ['to entertain with a story', 'to persuade the council to create a quiet room', 'to explain how the cafeteria works', 'to thank a teacher'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the chart, how many students said they would use the room “sometimes”?',
        opts: ['28', '32', '38', '52'], a: 3 },
      { k: 'choice', code: 'C1.5', q: 'Kiran begins with “Close your eyes for a moment. Imagine …” ({line:Imagine}). Why?',
        opts: ['to make the audience sleepy', 'to help listeners feel what an overwhelmed student experiences', 'to fill time', 'to describe the menu'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'Three paragraphs begin “Some of you might be …”. What is Kiran doing in these paragraphs?',
        opts: ['telling jokes', 'answering possible objections before the audience can raise them', 'listing friends', 'changing the topic'], a: 1 },
      { k: 'choice', code: 'C3.5', q: 'Which statement is an opinion rather than a fact?',
        opts: ['“Last month, our class surveyed 150 students.” ({line:surveyed})', '“The old book room on the second floor has been empty since September.” ({line:September})', '“Inclusion is not just a poster.” ({line:poster})', '“Our class has already raised 340 dollars.” ({line:raised})'], a: 2 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Kiran says, “Sometimes it is a door that you can close.” What does he mean about inclusion?',
        a: 'Inclusion is not only words and posters; it means real changes that meet people’s needs. For some students, being included means having a quiet place to go when the school is too much.', look: 'the contrast between talking about inclusion and taking practical action, explained in own words' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Is Kiran’s speech convincing? Give your opinion and two reasons based on the speech.',
        a: 'Yes. He gives evidence from the survey and other schools, and he answers worries about skipping class, location and cost with a real plan.', look: 'a clear opinion with two reasons from the speech (evidence, answering objections, emotional appeal)' }
    ]
  });

  P.add({
    id: 'g7-snow-crystals-review', subject: 'arts', form: 'Review', lines: true, plain: true,
    title: 'Small Wonders',
    deck: 'A student reviews a museum exhibit about the farmer who photographed snowflakes',
    hero: {
      photo: 'g4-snowflakes.jpg', credit: 'Photo: Wilson Bentley, public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 180,
      cap: 'Snowflakes photographed by Wilson Bentley more than 100 years ago.'
    },
    body: [
      '<b class="ps-who">Exhibit review · Small Wonders: The Snow Crystals of Wilson Bentley · Lakeshore Science Centre, until March 31 · Rating: four stars out of five</b>',
      'I expected an exhibit about snowflakes to take ten minutes. I stayed for an hour and a half, and I would have stayed longer if the science centre had not started turning off the lights.',
      'Small Wonders tells the story of Wilson Bentley, a farmer from Vermont who, in January 1885, became the first person known to photograph a single snow crystal. He was nineteen. His parents thought the expensive camera was a waste of money, and his neighbours thought he was a little strange for standing in the cold all winter catching snowflakes on a black tray. Over the next forty-six years, he photographed more than 5 000 of them, working fast, before each crystal could melt or <b>evaporate</b>.',
      'The exhibit’s greatest strength is that it lets the photographs speak for themselves. Two hundred of Bentley’s images are printed large and lit from behind, so that each crystal glows like a stained-glass window. Walking down that long, dim gallery felt almost like being inside a snowstorm. Small cards beside the photographs explain the science simply: every crystal has six sides because of the way water <b>molecules</b> fit together as they freeze, but each one grows differently because it passes through slightly different temperatures and humidity on its way down.',
      'The best section, in my opinion, is the hands-on lab at the end, where visitors use a cold plate and a microscope to catch and photograph real frost crystals. My little brother was not interested in anything else the entire visit, and then refused to leave the lab.',
      'The exhibit is not perfect. The section about Bentley’s life is mostly long panels of small text, and many visitors, including me, skimmed them. A few short videos or an audio guide would have made his story come alive, because it is a genuinely interesting story: he sold his photographs for five cents each to schools and universities and earned very little, and he died of pneumonia in 1931 after walking home through a blizzard. I also wished the exhibit had explained more clearly whether it is really true that no two snowflakes are alike, since that is the question everyone asks.',
      'Overall, Small Wonders is beautiful, calm and surprisingly moving. I recommend it for anyone over the age of about eight, and especially for anyone who has ever stood still in falling snow and wondered what they were looking at. Wear mittens to the lab.',
      { fig: '<path class="k" d="M150 20 V160 M89 55 L211 125 M89 125 L211 55"/>' +
          [[150, 20], [150, 160], [89, 55], [211, 125], [89, 125], [211, 55]].map(function (p) {
            var dx = (p[0] - 150) * 0.25, dy = (p[1] - 90) * 0.25;
            return '<path class="t" d="M' + (150 + dx * 2.4) + ' ' + (90 + dy * 2.4) + ' l' + (dy * 0.6) + ' ' + (-dx * 0.6) + ' M' + (150 + dx * 2.4) + ' ' + (90 + dy * 2.4) + ' l' + (-dy * 0.6) + ' ' + (dx * 0.6) + '"/>';
          }).join('') +
          D.label(250, 40, 'six arms', 205, 58) + D.label(250, 150, 'side branches', 186, 110) + '<text class="n" x="8" y="176">each crystal grows in a hexagon pattern</text>',
        tall: 182, cap: 'The basic shape of a snow crystal: six arms, with side branches that grow as it falls.' }
    ],
    guide: { before: 'Explain that a review gives an opinion about something (a book, film, exhibit or restaurant) and gives reasons, both good and bad. Look at the snowflake photographs together. Teach <b>evaporate</b> and <b>molecules</b>.',
      after: 'Write a short review of something you have visited, read or watched recently. Give it a rating, one strength and one weakness.' },
    words: [['evaporate', 'turn from a liquid or solid into a gas and disappear into the air'], ['molecules', 'the tiny particles that a substance is made of']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is a review?',
        opts: ['a rating and the writer’s opinions with reasons', 'a list of steps', 'rhyming lines', 'a cast of characters'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, how many arms does a snow crystal have?',
        opts: ['four', 'five', 'six', 'eight'], a: 2 },
      { k: 'choice', code: 'C3.3', q: 'Why does every snow crystal look slightly different?',
        opts: ['Each one is photographed differently.', 'Each passes through slightly different temperatures and humidity as it falls.', 'Some are made of salt water.', 'They melt into different shapes.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'Each crystal “glows like a stained-glass window” ({line:stained}). The simile suggests the photographs are',
        opts: ['dark and gloomy', 'bright, detailed and beautiful', 'broken', 'old-fashioned'], a: 1 },
      { k: 'choice', code: 'C3.5', q: 'What is the reviewer’s main criticism of the exhibit?',
        opts: ['The photographs are too small.', 'The section on Bentley’s life is mostly long text, which many visitors skim.', 'The lab is boring.', 'It is too expensive.'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The reviewer gives four stars, not five. Using the review, explain what kept the exhibit from a perfect score.',
        a: 'The section about Bentley’s life was mostly long text panels that people skimmed, and the exhibit did not clearly explain whether no two snowflakes are really alike.', look: 'the two weaknesses named in the review' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Bentley’s neighbours thought he was strange for photographing snowflakes. Connect this to another person, in real life or in a text, whose passion others did not understand at first.',
        a: 'Example: In a book I read, a girl collected rocks and others laughed, but she later became a geologist. Like Bentley, she kept going because she loved it.', look: 'a clear connection to a person whose passion was misunderstood, with a link to Bentley' }
    ]
  });

  P.add({
    id: 'g7-email-exchange', subject: 'tech', form: 'Emails', lines: true, plain: true,
    title: 'Re: Order 4821',
    deck: 'A customer’s complaint and the company’s reply',
    hero: {
      photo: 'g8-smartphone.jpg', credit: 'Photo: Beth Kanter, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 150,
      cap: 'A smartphone. Many customer complaints are now sent and answered by email.'
    },
    body: [
      '<b class="ps-who">From: Leo Marchetti · To: Customer Service, Northpeak Outdoor Gear · October 9 · Subject: Damaged tent, order 4821</b>',
      'Hello,',
      'On October 2, I ordered a two-person backpacking tent from your website for $189.99, as a birthday present for my older brother. It arrived today, October 9, three days later than the delivery date your website promised.',
      'Unfortunately, when we opened the box, one of the aluminum tent poles was bent almost in half, and the rain fly had a tear about ten centimetres long. The cardboard box was also crushed on one corner, so I believe the damage happened during shipping. I have attached three photographs of the pole, the tear and the box.',
      'My brother’s camping trip is on October 18, so I would appreciate a replacement tent as soon as possible. If a replacement cannot arrive by October 16, I would prefer a full <b>refund</b> instead.',
      'I have bought from Northpeak four times before and have always been very satisfied, which is why I was so disappointed by this order.',
      'Thank you for your help.',
      'Leo Marchetti',
      '<b class="ps-who">From: Customer Service, Northpeak Outdoor Gear · To: Leo Marchetti · October 10 · Subject: Re: Damaged tent, order 4821</b>',
      'Dear Leo,',
      'Thank you for contacting us, and for the clear photographs. I am very sorry that your brother’s tent arrived damaged, and late. That is not the experience we want any customer to have, especially with a gift.',
      'Based on your photos, the damage clearly happened in transit. We have shipped a replacement tent today by express delivery, at no cost to you. It should arrive by October 14. Your tracking number is below. You do not need to return the damaged tent; please recycle the box and keep the undamaged parts, such as the stakes, as spares.',
      'We have also added a credit of $25 to your account as an <b>apology</b> for the delay, and we have reported the crushed box to our shipping company so that we can prevent this from happening again.',
      'Happy birthday to your brother. We hope the trip is a great one, and dry.',
      'Sincerely,',
      'Hana Yoshida, Customer Care Team',
      { fig: [['Oct 2', 'ordered'], ['Oct 9', 'arrived damaged; Leo emails'], ['Oct 10', 'company replies'], ['Oct 14', 'replacement due'], ['Oct 18', 'camping trip']].map(function (r, i) {
          var y = 14 + i * 26;
          return '<circle class="dot" cx="24" cy="' + y + '" r="3.5"/><text class="lb" x="38" y="' + (y + 4) + '">' + r[0] + '</text><text class="l" x="92" y="' + (y + 4) + '">' + r[1] + '</text>';
        }).join('') + '<path class="t" d="M24 14 V118"/>',
        tall: 130, cap: 'Timeline of order 4821.' }
    ],
    guide: { before: 'Ask: have you or your family ever had to complain about something you bought? Point out the parts of an email: from, to, date and subject line. Teach <b>refund</b> (money given back) and <b>apology</b>.',
      after: 'What made Leo’s email effective? Write a short, polite complaint about a real or imagined problem.' },
    words: [['refund', 'money given back to a customer'], ['apology', 'words or actions that say you are sorry']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What is the purpose of Leo’s email?',
        opts: ['to praise the company', 'to report a problem and ask for a solution', 'to order a second tent', 'to invite Hana camping'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the timeline, how many days before the camping trip should the replacement arrive?',
        opts: ['two', 'four', 'eight', 'ten'], a: 1 },
      { k: 'choice', code: 'C1.5', q: 'Which word best describes the tone of Leo’s email?',
        opts: ['angry and rude', 'polite but firm', 'joking', 'confused'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does Leo mention that the box was crushed on one corner ({line:crushed})?',
        opts: ['to show the damage was caused by shipping, not by him', 'to complain about cardboard', 'to ask for a new box', 'to describe the colour'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does Leo say he has bought from Northpeak four times before ({line:four})?',
        opts: ['to brag', 'to show he is a loyal customer who deserves good service', 'to ask for a discount on all orders', 'to change the subject'], a: 1 },
      { k: 'choice', code: 'B3.3', q: 'In the reply, “You do not need to return the damaged tent; please recycle the box” ({line:recycle}). The semicolon joins',
        opts: ['two closely related complete sentences', 'a list of items', 'a question and an answer', 'a quotation'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Name two things the company does in its reply to make up for the problem.',
        a: 'It sends a free replacement by express delivery and adds a $25 credit to Leo’s account. It also lets him keep the undamaged parts and reports the problem to the shipper.', look: 'two actions from the reply' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Hana ends with “We hope the trip is a great one, and dry.” Why might she end with a friendly, slightly humorous line?',
        a: 'It shows she read the email carefully (the torn rain fly) and makes the company seem caring and human, which helps keep Leo as a happy customer.', look: 'a reason linked to tone and customer relationship, ideally noticing the link to the torn rain fly' }
    ]
  });
})();
