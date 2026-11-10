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

})();
