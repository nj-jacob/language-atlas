/* Grade 7 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  function node(x, y, t) { return '<text class="l" x="' + x + '" y="' + y + '" text-anchor="middle">' + t + '</text>'; }
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

})();
