/* Grade 4 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;

  P.add({
    id: 'g4-beavers', subject: 'science', form: 'Report',
    title: 'The Beaver Engineers',
    deck: 'How one busy animal changes a whole wetland',
    hero: {
      photo: 'g4-beaver-lodge.jpg', credit: 'Photo: Benfwilliamson, CC0, Wikimedia Commons', focus: '50% 62%',
      tall: 210,
      cap: 'A beaver lodge in a pond near Hinton, Alberta. When the beavers dammed the stream, the rising water drowned the trees.'
    },
    body: [
      'Walk along a stream in Ontario and you might find a strange wall of sticks and mud stretched across the water. No person built it. A beaver did. Beavers are the largest rodents in Canada, and they are also some of the best builders in nature.',
      { h: 'Building the dam' },
      'A beaver starts a dam by pushing branches into the bottom of the stream. Then it packs mud, stones and plants into the gaps. Water backs up behind the wall, and a deep, quiet pond forms. The beaver checks its dam every night. If it hears running water, it hurries to fix the leak.',
      { h: 'A safe home' },
      'In the middle of the pond, the beaver family builds a <b>lodge</b>, a dome of sticks and mud. The doors are under the water, so wolves and bears cannot follow the beavers inside. Above the water is a dry room where the family eats, sleeps and raises its young, called kits. In winter, the mud freezes as hard as rock.',
      { fig: '<path class="a" d="M0 72 H300"/>' + D.ripple(4, 70, 84) + D.ripple(230, 296, 84) +
          '<path class="h" d="M70 128 Q88 30 150 26 Q212 30 230 128"/>' +
          '<path class="k" d="M110 72 Q150 50 190 72 Z"/><path class="k" d="M96 128 Q112 102 124 76 M204 128 Q190 102 176 76"/>' +
          '<path class="k" d="M10 128 H290"/><path class="d" d="M146 30 V18 M154 30 V16"/>' +
          D.arrow(70, 114, 102, 96, 'a') + D.arrow(232, 114, 200, 96, 'a') +
          D.label(186, 12, 'air vent', 156, 22) + D.label(8, 58, 'water line', 40, 72) + D.label(204, 50, 'dry room', 166, 64) +
          D.label(8, 146, 'underwater entrance', 92, 120) + D.label(226, 146, 'pond bottom', 262, 128),
        tall: 152, cap: 'Inside a beaver lodge. The entrances are below the water line.' },
      { box: 'Did you know?', text: 'A beaver’s front teeth never stop growing. Chewing wood keeps them from getting too long. The teeth are orange because they contain iron, which makes them strong.' },
      { h: 'A home for many' },
      'A beaver pond changes the land around it. Trees that stand in the deep water slowly die, and woodpeckers drill nests in their trunks. Frogs, ducks, fish and moose move into the new <b>wetland</b>. Because so many plants and animals depend on the work of beavers, scientists call the beaver a <b>keystone species</b>.',
      { h: 'Not everyone is happy' },
      'Beavers can cause problems, too. A pond can flood a road or a farmer’s field. Some communities now put a pipe through the dam. The pipe lets some water flow out, so the pond stays at a safe level and the beavers can stay as well.',
      'The next time you see a pond full of grey stumps, look for a dome of sticks. You may be looking at the work of a family of engineers.'
    ],
    guide: { before: 'Ask what the child already knows about beavers. Show the lodge diagram and point to the water line. Teach <b>dam</b>, <b>lodge</b> and <b>wetland</b>, and say each word together.',
      after: 'Beaver dams help some living things and cause problems for others. Should people remove a dam that floods a road, or find a way to live with it? Why?' },
    words: [['lodge', 'a beaver home made of sticks and mud'], ['wetland', 'land covered by shallow water for much of the year'], ['keystone species', 'a living thing that many others in a habitat depend on']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the whole text?',
        opts: ['Beavers have orange teeth.', 'Beavers build dams and lodges that change the land and help many living things.', 'Beaver ponds flood roads and fields.', 'Wolves and bears hunt beavers.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps to show how a beaver makes a pond.',
        items: ['It pushes branches into the stream bed.', 'It packs mud and stones into the gaps.', 'Water backs up and a pond forms.', 'It checks the dam every night.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why are some words in <b>bold</b> type?',
        opts: ['They are the most fun words.', 'They are in Words to know.', 'They are names of people.', 'They are said loudly.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['A beaver builds a dam across a stream.', null], [null, 'Woodpeckers drill nests in the trunks.'], ['A beaver pond floods a road.', null]],
        a: [[null, 'Water backs up and a pond forms.'], ['Trees standing in deep water die.', null], [null, 'People put a pipe through the dam.']] },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the diagram of the lodge. Why are the entrances under the water? Use the diagram and the text.',
        a: 'The entrances are under the water so wolves and bears cannot get in. The beavers swim in and climb up to the dry room.', look: 'a reason (safety from predators) and a detail from the diagram, such as the dry room above the water line' },
      { k: 'choice', code: 'C3.2', half: true, q: '“The mud freezes as hard as rock.” This tells you the lodge in winter is …',
        opts: ['cold and wet inside', 'strong and hard to break into', 'about to fall down', 'empty'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '“So many plants and animals <b>depend</b> on the work of beavers.” Here, <b>depend</b> means …',
        opts: ['need', 'build', 'fear', 'watch'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'A farmer whose field is flooded and a frog living in the pond might feel very differently about beavers. Explain both points of view. Use details from the text.',
        a: 'The farmer may be upset because the pond floods the field and the crops are lost. The frog benefits because the beaver made a new wetland where it can live.', look: 'both points of view, each with a detail from the text (flooded field; new wetland for frogs)' }
    ]
  });

  P.add({
    id: 'g4-sound', subject: 'science', form: 'Explanation',
    title: 'Good Vibrations',
    deck: 'How a sound is made, and how it travels to your ear',
    hero: {
      photo: 'g4-tuning-forks.jpg', credit: 'Photo: K. Venkataramana, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Tuning forks of different sizes. Strike one and its arms vibrate, giving one clear note. Shorter arms give a higher note.'
    },
    body: [
      'Pluck a guitar string and watch closely. The string blurs as it moves back and forth very fast. That quick back-and-forth motion is called a <b>vibration</b>, and every sound you hear begins with one.',
      { h: 'From the drum to your ear' },
      'A vibrating object pushes on the air beside it. That air bumps into the air next to it, which bumps into the next air, like a line of falling dominoes. The push spreads out in every direction as a sound wave. When the wave reaches you, it makes your eardrum vibrate, and your brain hears a sound.',
      { fig: '<path class="k" d="M20 58 V118 M70 58 V118"/><ellipse class="k" cx="45" cy="58" rx="25" ry="7"/><path class="k" d="M20 118 Q45 128 70 118"/>' +
          '<path class="a" d="M92 70 Q100 88 92 106 M112 62 Q124 88 112 114 M132 54 Q148 88 132 122 M152 48 Q172 88 152 128"/>' +
          '<path class="k" d="M236 60 Q266 50 274 78 Q280 102 258 112 Q250 118 252 128 M248 76 Q262 72 262 88 Q262 98 252 98"/><path class="t" d="M196 88 H236"/>' +
          D.label(10, 146, 'vibrating drum', 45, 120) + D.label(98, 30, 'sound waves', 132, 54) + D.label(190, 30, 'ear', 246, 66),
        tall: 152, cap: 'The drum’s vibrations travel through the air as sound waves.' },
      { h: 'High and low' },
      'Fast vibrations make high sounds, like a whistle or a chickadee’s call. Slow vibrations make low sounds, like a bass drum or a foghorn. How high or low a sound is, is called its <b>pitch</b>. A short, tight string vibrates quickly and has a high pitch. A long, loose string has a low pitch.',
      { box: 'Did you know?', text: 'Sound travels about four times faster through water than through air. Whales can hear one another’s songs from many kilometres away.' },
      { h: 'Loud and soft' },
      'A hard hit makes bigger vibrations, and bigger vibrations make a louder sound. Loudness is measured in decibels. A whisper is about 30 decibels. A lawn mower is about 90, loud enough to hurt your ears if you listen for a long time. That is why people who use loud machines wear ear protection.',
      { h: 'Sound needs a path' },
      'Sound can move through air, water, wood and even steel. Put your ear on a table and tap the other end, and the tap sounds louder. In outer space there is no air at all, so nothing carries the vibrations. Astronauts on a spacewalk talk to one another by radio.',
      { h: 'Listening for echoes' },
      'When sound hits a hard surface, such as a cliff, it bounces back. That returning sound is an echo. Bats make high clicks as they fly at night and listen for the echoes. The echoes tell them where insects and trees are, even in total darkness.'
    ],
    guide: { before: 'Let the child hum with a hand on their throat and feel the vibration. Teach <b>vibration</b> and <b>pitch</b>. Show the diagram and trace the path from the drum to the ear with a finger.',
      after: 'Which sounds in your home or school are loud enough to need ear protection? How could you test whether sound travels better through wood or through air?' },
    words: [['vibration', 'a quick back-and-forth movement'], ['pitch', 'how high or low a sound is']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the whole text?',
        opts: ['Astronauts use radios in space.', 'Sounds are made by vibrations that travel to our ears.', 'Guitars have long and short strings.', 'Whales can sing.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps to show how you hear a drum.',
        items: ['The drum skin vibrates.', 'It pushes on the air beside it.', 'A sound wave spreads through the air.', 'Your eardrum vibrates.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.3', half: true, q: 'You want to know why astronauts use radios. Which heading do you look under?',
        opts: ['High and low', 'Loud and soft', 'Sound needs a path', 'From the drum to your ear'], a: 2 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Sound', 'High or low pitch?', 'Fast or slow vibrations?'],
        rows: [['a whistle', null, 'fast'], ['a bass drum', 'low', null], ['a long, loose string', null, null]],
        a: [[null, 'high', null], [null, null, 'slow'], [null, 'low', 'slow']] },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the diagram. Why do the curved lines get bigger as they move away from the drum?',
        a: 'They show the sound wave spreading out in every direction as it travels through the air toward the ear.', look: 'the idea that the wave spreads outward from the drum, linked to the text' },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does a tap sound louder with your ear on the table?',
        opts: ['Sound travels well through wood.', 'The table is hollow.', 'Your hand is closer to your ear.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'A <b>re</b>play lets you hear a sound again. What does <b>re-</b> mean?',
        opts: ['not', 'again', 'before', 'under'], a: 1 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which part of the text was hardest to picture? What could you do to understand it better?',
        a: 'The part about air bumping into air was hard to picture. I could look at the diagram again, reread the paragraph slowly, or try it with a line of dominoes.', look: 'a named part of the text and a sensible fix-up strategy (reread, use the diagram, visualize, ask a question)' }
    ]
  });

  P.add({
    id: 'g4-pulleys', subject: 'science', form: 'Explanation',
    title: 'The Magic of Pulleys',
    deck: 'How a wheel and a rope make heavy things feel lighter',
    hero: {
      photo: 'g4-block-and-tackle.jpg', credit: 'Photo: Bjankuloski06, CC BY 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 190,
      cap: 'Pulleys and ropes on a tall sailing ship. Sailors use them to raise heavy sails and lower boats into the water.'
    },
    body: [
      'Have you ever watched a flag rise to the top of a flagpole? Someone pulls the rope down, and the flag goes up. The secret is a small wheel at the top of the pole. That wheel is a <b>pulley</b>, one of the oldest and most useful simple machines.',
      { h: 'Changing direction' },
      'A pulley is a wheel with a groove around its edge. A rope sits in the groove. When the pulley is fastened in one place, it is called a fixed pulley. Pulling down on one end of the rope lifts the <b>load</b> on the other end. A fixed pulley does not make the load lighter, but pulling down is easier than lifting up, because you can use your own weight to help.',
      { fig: '<path class="k" d="M10 14 H130 M70 14 V26 M190 14 H290 M240 14 V26 M240 92 V100"/><circle class="k" cx="70" cy="38" r="12"/><circle class="k" cx="240" cy="38" r="12"/><circle class="k" cx="240" cy="92" r="12"/>' +
          '<path class="a" d="M58 38 V106 M82 38 V124 M228 38 V92 M252 38 V92 M228 92 V40 M228 38 L252 92 M252 38 V128"/>' +
          '<rect class="h" x="44" y="106" width="28" height="22"/><rect class="h" x="224" y="100" width="32" height="26"/>' +
          D.arrow(82, 124, 82, 140, 'k') + D.arrow(252, 128, 252, 144, 'k') +
          '<text class="lb" x="70" y="164" text-anchor="middle">one pulley</text><text class="lb" x="240" y="164" text-anchor="middle">two pulleys</text>' +
          '<text class="n" x="94" y="138">pull</text><text class="n" x="264" y="142">pull</text><text class="n" x="12" y="122">load</text><text class="n" x="182" y="116">load</text>',
        tall: 172, cap: 'With two pulleys, two parts of the rope hold the load, so you pull with half the force.' },
      { h: 'Sharing the load' },
      'Something amazing happens when you add a second pulley that moves up with the load. Now two parts of the rope hold the load up, and each part carries half the weight. You only need to pull with about half the <b>force</b>. There is a catch, though. To lift the load one metre, you must pull two metres of rope.',
      { box: 'Try it', text: 'Loop a skipping rope over a broom handle that two friends hold. Tie a bag of books to one end, and pull. Then loop the rope back and forth around both handles, and pull again. Which feels easier?' },
      { h: 'Pulleys all around us' },
      'Cranes use many pulleys together to lift steel beams to the top of tall buildings. Elevators, window blinds and the ropes on sailboats all use pulleys. Even some exercise machines at the gym use them. Long ago, builders used pulleys to raise huge stones. A simple wheel and a rope can turn a job that seems impossible into one that people can do.'
    ],
    guide: { before: 'Show a flagpole or a window blind, or the photo, and ask how pulling down can make something go up. Teach <b>load</b> and <b>force</b>. Point to each pulley in the diagram and count the ropes holding the load.',
      after: 'Would you rather pull harder for a short distance or pull more gently for a long distance? When would each be better?' },
    words: [['pulley', 'a wheel with a groove for a rope'], ['load', 'the object being lifted or moved'], ['force', 'a push or a pull']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Flags are raised every morning.', 'Pulleys help people lift and move heavy loads.', 'Cranes are taller than buildings.', 'Sailors use ropes.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how many parts of the rope hold the load with two pulleys?',
        opts: ['one', 'two', 'three', 'four'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is pulling down easier than lifting up?',
        opts: ['The rope is longer.', 'You can use your own weight to help.', 'The load becomes lighter.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Compare one pulley and two pulleys. Fill in the chart.', cols: ['', 'One fixed pulley', 'Two pulleys'],
        rows: [['How hard you pull', 'the full weight', null], ['Rope pulled to lift the load 1 metre', null, null]],
        a: [[null, null, 'about half the weight'], [null, '1 metre', '2 metres']] },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the text in two or three sentences. Give the main idea and two details.',
        a: 'A pulley is a wheel and a rope that helps people move loads. A fixed pulley changes the direction of the pull, and adding a moving pulley halves the force. Cranes, elevators and blinds all use pulleys.', look: 'the main idea and two supporting details in the child’s own words' },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does this explanation include a “Try it” box?',
        opts: ['to tell a story', 'so the reader can test the idea', 'to give a list of words', 'to show a map'], a: 1 },
      { k: 'choice', code: 'B2.1', half: true, q: 'A pulley that cannot move is <b>fixed</b>. A pulley that moves is <b>un</b>fixed. What does <b>un-</b> mean?',
        opts: ['again', 'not', 'very', 'before'], a: 1 },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict what would happen with three pulleys holding the load. Use a detail from the text.',
        a: 'It would be even easier to pull, about a third of the force, but I would have to pull even more rope.', look: 'a prediction that follows the pattern (less force, more rope) and a detail from the text' }
    ]
  });

  P.add({
    id: 'g4-hoodoos', subject: 'science', form: 'Report',
    title: 'Stone Giants of the Badlands',
    deck: 'How wind, rain and ice carve the hoodoos of Alberta',
    hero: {
      photo: 'g4-hoodoos.jpg', credit: 'Photo: Arvindh Viswanathan, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'Hoodoos near Drumheller, Alberta. Each one is a soft stone pillar with a hard cap of rock on top.'
    },
    body: [
      'In the dry hills of the <b>badlands</b> near Drumheller, Alberta, strange stone pillars stand in groups, like giants wearing hats. They are called hoodoos. No one carved them. Wind, rain and ice did the work over thousands of years.',
      { h: 'Hard on top, soft below' },
      'The land around Drumheller is made of layers of soft rock, such as sandstone and mudstone. In some places, a layer of harder rock lies on top. When rain falls, it washes away bits of the soft rock. This wearing away of rock by water, wind and ice is called <b>erosion</b>. The hard cap rock wears away much more slowly, so it shields the soft rock right under it, like an umbrella. Over time, the soft rock around it is carried away, and a pillar is left standing.',
      { fig: '<path class="k" d="M10 150 H290"/><path class="h" d="M126 46 L176 46 L172 34 L130 34 Z"/><path class="k" d="M134 46 Q128 90 136 120 Q132 140 126 150 M168 46 Q174 90 166 120 Q170 140 176 150"/>' +
          '<path class="t" d="M136 70 H166 M134 96 H168 M136 122 H166"/>' +
          D.arrow(56, 30, 108, 54, 'a') + D.arrow(48, 70, 112, 88, 'a') + '<path class="d" d="M228 36 L218 58 M246 44 L236 66 M264 36 L254 58"/>' +
          D.label(186, 26, 'hard cap rock', 162, 38) + D.label(196, 108, 'soft sandstone', 168, 100) + D.label(8, 24, 'wind', 56, 30) + D.label(232, 82, 'rain', 240, 62),
        tall: 160, cap: 'The cap rock protects the soft rock under it from rain and wind.' },
      { h: 'Ice helps, too' },
      'In winter, water seeps into tiny cracks in the rock and freezes. Ice takes up more space than water, so it pushes the cracks wider. In spring, the loosened pieces fall away. Each year, the hoodoos get a little thinner.',
      { box: 'Did you know?', text: 'The Drumheller area is part of the badlands, and it is famous for dinosaur bones. Erosion that uncovers hoodoos also uncovers fossils that were buried for millions of years.' },
      { h: 'Handle with care' },
      'Some hoodoos are taller than a two-storey house. Still, they are <b>fragile</b>. If the cap falls off, the soft pillar wears away quickly, and the hoodoo is gone. For this reason, visitors are asked to stay on the paths and never climb on them. Scientists measure some hoodoos year after year to see how quickly the weather is wearing them down.',
      'Erosion is slow, but it never stops. The hoodoos we see today will be gone one day, and new ones will form as the hills keep wearing away.'
    ],
    guide: { before: 'Find Drumheller, Alberta on a map. Show the photo and ask how a pillar like this could form. Teach <b>erosion</b> and <b>fragile</b>. Pour water over a sugar cube with a coin on top to show the idea.',
      after: 'Should people try to stop erosion from wearing away the hoodoos, or let nature take its course? Give a reason.' },
    words: [['erosion', 'the wearing away of rock and soil by water, wind or ice'], ['fragile', 'easily broken or damaged'], ['badlands', 'dry land with steep hills and little plant life']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Drumheller is in Alberta.', 'Hoodoos are rock pillars shaped slowly by erosion.', 'Dinosaurs lived near Drumheller.', 'Visitors like to climb hoodoos.'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Like giants wearing hats” is a simile. What does it help you picture?',
        opts: ['people in the hills', 'tall pillars with caps on top', 'a hat shop', 'clouds'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps to show how a hoodoo forms.',
        items: ['Hard rock sits on top of soft rock.', 'Rain washes away the soft rock around it.', 'A pillar is left under the cap.', 'The cap falls and the pillar wears away.'], show: [3, 1, 0, 2] },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['Water freezes in a crack.', null], ['The cap rock falls off.', null], [null, 'Fossils are uncovered.']],
        a: [[null, 'The ice pushes the crack wider.'], [null, 'The pillar wears away quickly.'], ['Erosion wears away the rock.', null]] },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the diagram. How does the cap rock protect the pillar? Use the diagram and the text.',
        a: 'The hard cap rock is on top and wears away slowly. It shields the soft sandstone under it from the rain, like an umbrella, so a pillar is left standing.', look: 'the cap shields the soft rock from rain or wind, with a detail from the diagram' },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>fragile</b> mean in “they are fragile”?',
        opts: ['very old', 'easily damaged', 'very tall', 'hard as steel'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are visitors asked never to climb on hoodoos?',
        opts: ['The hoodoos are too hot.', 'Climbing could knock off the cap and destroy the hoodoo.', 'There are dinosaurs on top.'], a: 1 },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict what the hoodoos will look like in a thousand years. Use a detail from the text.',
        a: 'They will be thinner, and some will have lost their caps and worn away, because erosion never stops.', look: 'a prediction based on erosion continuing, with a detail from the text' }
    ]
  });

  P.add({
    id: 'g4-hare', subject: 'science', form: 'Report',
    title: 'The Hare and the Lynx',
    deck: 'A food chain in Canada’s northern forest',
    hero: {
      photo: 'g4-snowshoe-hare.jpg', credit: 'Photo: Fralambert, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A snowshoe hare in Blomidon Provincial Park, Nova Scotia, wearing its brown summer coat.'
    },
    body: [
      'Across Canada’s great northern forest, two animals share a story that has been repeating for hundreds of years. One is the snowshoe hare. The other is the Canada lynx, a wild cat that hunts it.',
      { h: 'Built for snow' },
      'The snowshoe hare gets its name from its huge back feet. They spread out like snowshoes, so the hare can race across deep snow without sinking. Its coat changes colour, too. In summer, the hare is brown, like the forest floor. In winter, it turns white to hide in the snow. This helps it hide from any <b>predator</b>. Hares rest during the day under low branches and come out to feed at dusk and at night, when they are harder to see.',
      { h: 'Who eats whom?' },
      'Every living thing needs energy. Plants get their energy from the sun. Hares eat twigs, buds and bark from willows and birches. Lynx eat hares. This line of who eats whom is called a <b>food chain</b>. Energy passes from the sun to the plants, then to the hare, then to the lynx.',
      { fig: '<circle class="a" cx="30" cy="46" r="14"/><path class="a" d="M30 22 V14 M30 70 V78 M6 46 H-2 M54 46 H62 M13 29 L8 24 M47 63 L52 68 M47 29 L52 24 M13 63 L8 68"/>' +
          D.arrow(68, 46, 96, 46, 'k') + '<path class="k" d="M122 70 V30 M122 50 L108 36 M122 42 L136 28 M122 58 L138 46 M122 64 L108 54"/>' +
          D.arrow(148, 46, 176, 46, 'k') + '<ellipse class="k" cx="204" cy="56" rx="18" ry="12"/><path class="k" d="M214 46 L222 22 M218 46 L230 26"/><circle class="dot" cx="214" cy="52" r="1.5"/>' +
          D.arrow(228, 46, 250, 46, 'k') + '<path class="k" d="M256 60 Q262 44 278 44 Q292 44 296 58 M262 44 L260 34 L268 42 M284 44 L290 34 L292 46"/>' +
          '<text class="lb" x="30" y="104" text-anchor="middle">sun</text><text class="lb" x="122" y="104" text-anchor="middle">willow</text><text class="lb" x="204" y="104" text-anchor="middle">hare</text><text class="lb" x="276" y="104" text-anchor="middle">lynx</text>' +
          '<text class="n" x="150" y="126" text-anchor="middle">The arrows show where the energy goes.</text>',
        tall: 134, cap: 'A food chain in the northern forest.' },
      { h: 'Up and down' },
      'When there are lots of willows, hares have plenty to eat, and their numbers grow. More hares mean more food for lynx, so lynx raise more kittens. Then there are so many hares that they eat most of the plants, and many lynx are hunting them. Hare numbers drop, and a year or two later, lynx numbers drop too. The plants grow back, and the cycle starts again, about every ten years.',
      'Other hunters are part of this story, too. Owls, foxes and coyotes also catch hares. When hares are scarce, these animals must hunt mice, squirrels and birds instead. A change to one animal in a food chain is felt by many others.',
      { box: 'Did you know?', text: 'Scientists learned about this ten-year cycle from old fur trade records. For more than a hundred years, trappers counted every lynx pelt they sold.' }
    ],
    guide: { before: 'Ask what the child knows about animals that live in snow. Teach <b>predator</b> and <b>food chain</b>. Read the diagram from left to right and say “gives energy to” at each arrow.',
      after: 'What might happen to the lynx if a disease killed most of the hares? What might happen to the willows?' },
    words: [['predator', 'an animal that hunts other animals for food'], ['food chain', 'the order in which living things eat one another, passing on energy']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Lynx are wild cats.', 'The hare and the lynx are linked in a food chain, and their numbers rise and fall together.', 'Hares eat willow twigs.', 'Fur traders counted pelts.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what do the arrows show?',
        opts: ['which animal is bigger', 'where the energy goes', 'which way the animals run'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the hare turn white in winter?',
        opts: ['to stay warm', 'to hide from predators in the snow', 'because it is old', 'to find food'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number the events of the ten-year cycle in order.',
        items: ['There are lots of willows, so hare numbers grow.', 'Lynx have more food and raise more kittens.', 'Hares eat most of the plants, and hare numbers drop.', 'Lynx numbers drop.'], show: [1, 3, 0, 2] },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart about the snowshoe hare.', cols: ['Feature', 'How it helps the hare'],
        rows: [['huge back feet', null], ['white winter coat', null], ['brown summer coat', null]],
        a: [[null, 'It can run on deep snow without sinking.'], [null, 'It hides in the snow.'], [null, 'It hides on the forest floor.']] },
      { k: 'choice', code: 'B2.1', half: true, q: 'A <b>cycle</b> is something that repeats. Which word also has the base <b>cycle</b> and means “use again”?',
        opts: ['recycle', 'bicycle', 'circle'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Reread “Up and down” slowly. In your own words, why do hare numbers drop?',
        a: 'There are so many hares that they eat most of the plants, and many lynx are hunting them.', look: 'both reasons (not enough food, many predators) in the child’s own words' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What might happen to the lynx if a disease killed most of the hares? Use details from the text.',
        a: 'The lynx would not have enough food, so fewer kittens would survive and lynx numbers would drop, because lynx eat hares.', look: 'an inference that lynx numbers fall, explained with the food chain' }
    ]
  });

  P.add({
    id: 'g4-rocks', subject: 'science', form: 'Report',
    title: 'Rocks Tell Stories',
    deck: 'Three kinds of rock, and how each one forms',
    hero: {
      photo: 'g4-canadian-shield.jpg', credit: 'Photo: Chris Light, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'Rock of the Canadian Shield along Rainy Lake, on the Ontario border. Some of it is billions of years old.'
    },
    body: [
      'Pick up any rock, and you are holding a story. Some rocks were once boiling hot liquid. Some were built from sand and shells at the bottom of a sea. Others were squeezed and baked deep under the ground. Geologists sort rocks into three main groups by the way they formed.',
      { h: 'Fire rocks' },
      '<b>Igneous</b> rock forms when melted rock, called magma, cools and hardens. Granite is an igneous rock. Look closely and you can see speckles of different minerals in it. Much of the Canadian Shield, which covers about half of Canada, is made of granite and other igneous rocks.',
      { h: 'Layer rocks' },
      '<b>Sedimentary</b> rock forms from layers of sand, mud and shells that settle at the bottom of lakes and seas. Over millions of years, the layers are pressed and cemented together. Limestone and sandstone are sedimentary rocks. They often contain fossils of plants and animals that were buried in the layers.',
      { fig: '<rect class="k" x="10" y="20" width="80" height="60" rx="4"/><path class="t" d="M22 34 l4 3 M44 50 l3 -4 M66 36 l3 3 M30 64 l4 -2 M56 66 l3 3 M74 56 l3 -3"/>' +
          '<rect class="k" x="110" y="20" width="80" height="60" rx="4"/><path class="t" d="M110 34 H190 M110 46 H190 M110 58 H190 M110 70 H190"/><path class="k" d="M142 50 q6 -8 12 0 q-6 6 -12 0"/>' +
          '<rect class="k" x="210" y="20" width="80" height="60" rx="4"/><path class="t" d="M210 40 Q230 30 250 42 T290 38 M210 54 Q230 44 250 56 T290 52 M210 68 Q230 58 250 70 T290 66"/>' +
          '<text class="lb" x="50" y="100" text-anchor="middle">igneous</text><text class="lb" x="150" y="100" text-anchor="middle">sedimentary</text><text class="lb" x="250" y="100" text-anchor="middle">metamorphic</text>' +
          '<text class="n" x="50" y="116" text-anchor="middle">cooled magma</text><text class="n" x="150" y="116" text-anchor="middle">pressed layers</text><text class="n" x="250" y="116" text-anchor="middle">heat and pressure</text>' +
          '<text class="n" x="50" y="130" text-anchor="middle">granite</text><text class="n" x="150" y="130" text-anchor="middle">limestone</text><text class="n" x="250" y="130" text-anchor="middle">marble</text>',
        tall: 138, cap: 'The three kinds of rock, how each forms, and an example.' },
      { h: 'Changed rocks' },
      '<b>Metamorphic</b> rock is rock that has been changed. Deep underground, heat and the weight of the rock above squeeze it until it becomes a new kind of rock. Limestone can change into marble. Its layers often bend into wavy stripes.',
      { h: 'Reading the rocks' },
      'Geologists read rocks like the pages of a book. The limestone of the Niagara Escarpment in southern Ontario holds fossils of corals and other sea creatures. That tells us a warm, shallow sea once covered the land where cities stand today. Each layer adds another chapter to the story.',
      { box: 'Did you know?', text: 'Rocks do not stay one kind forever. Over very long times, any rock can be worn down, melted or squeezed and become one of the other kinds. This is called the rock cycle.' }
    ],
    guide: { before: 'Collect three or four rocks from outside and look at them with a magnifying glass. Teach <b>igneous</b>, <b>sedimentary</b> and <b>metamorphic</b> by their meanings: fire, settled layers, changed.',
      after: 'If you found a rock with a shell fossil in it, which kind would it most likely be? How do you know?' },
    words: [['igneous', 'formed when melted rock cools'], ['sedimentary', 'formed from layers pressed together'], ['metamorphic', 'changed by heat and pressure']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'How is this report organized?',
        opts: ['as a story with a problem', 'in parts, one for each kind of rock', 'as a list of steps', 'as a letter'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Use the diagram and the text. Fill in the chart.', cols: ['Kind of rock', 'How it forms', 'Example'],
        rows: [['igneous', null, null], ['sedimentary', 'layers pressed together', null], [null, 'changed by heat and pressure', null]],
        a: [[null, 'melted rock cools and hardens', 'granite'], [null, null, 'limestone or sandstone'], ['metamorphic', null, 'marble']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, the wavy lines in the third rock show …',
        opts: ['water', 'bent layers', 'fossils'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Where would you most likely find a fossil?',
        opts: ['in granite', 'in limestone', 'in magma'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Meta</b>morphic rock is rock that has changed. What does <b>meta-</b> mean here?',
        opts: ['change', 'fire', 'small', 'old'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why are the headings “Fire rocks”, “Layer rocks” and “Changed rocks”?',
        opts: ['They are funny.', 'They give a short clue to each kind of rock.', 'They are the names of scientists.'], a: 1 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize what you learned about rocks in two or three sentences.',
        a: 'There are three kinds of rock. Igneous rock forms when magma cools, sedimentary rock forms from pressed layers, and metamorphic rock is changed by heat and pressure.', look: 'the main idea (three kinds by how they form) and how each forms' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Read the “Did you know?” box. How could a piece of granite one day become sedimentary rock?',
        a: 'The granite could be worn down by erosion into sand. The sand could settle in a lake, and over a long time the layers could be pressed into sandstone.', look: 'a logical chain: worn into bits, settles in layers, pressed into rock' }
    ]
  });

  P.add({
    id: 'g4-longhouse', subject: 'history', form: 'Report',
    title: 'Life in a Longhouse',
    deck: 'How Haudenosaunee and Wendat families lived together under one roof',
    hero: {
      photo: 'g4-longhouse.jpg', credit: 'Photo: Alex Laney, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'A rebuilt longhouse at Crawford Lake, near Milton, Ontario, where an Iroquoian village stood about 600 years ago.'
    },
    body: [
      'Six hundred years ago, villages of long, rounded houses stood in the forests of what is now southern Ontario and New York State. The people who built them included the Haudenosaunee and the Wendat. Their name for themselves, Haudenosaunee, means “people of the longhouse.”',
      { h: 'Building a longhouse' },
      'A <b>longhouse</b> was built from the forest around it. Builders set two rows of young trees in the ground, bent their tops toward each other and tied them together to make a curved roof. They covered the frame with large sheets of elm or cedar bark. Some longhouses were as long as a hockey rink.',
      { fig: '<rect class="k" x="10" y="30" width="280" height="80" rx="38"/><path class="t" d="M10 52 H290 M10 88 H290"/>' +
          [50, 100, 150, 200, 250].map(function (x) { return '<circle class="a" cx="' + x + '" cy="70" r="7"/>'; }).join('') +
          '<path class="d" d="M75 30 V110 M125 30 V110 M175 30 V110 M225 30 V110"/><path class="k" d="M10 62 V78 M290 62 V78"/>' +
          D.label(4, 18, 'door', 12, 70) + D.label(108, 130, 'shared fires', 100, 77) + D.label(196, 18, 'sleeping platforms', 210, 41) + D.label(240, 130, 'storage', 272, 70),
        tall: 138, cap: 'A longhouse seen from above. Two families shared each fire.' },
      { h: 'Many families, one home' },
      'Inside, a hallway ran down the middle with fires every few steps. Two families lived across from each other and shared a fire. Raised platforms along the walls were used for sleeping, and food and tools were stored above. Smoke rose through holes in the roof. All the families in a longhouse belonged to one <b>clan</b>, and they were related through the mothers. A senior woman, the clan mother, helped lead the clan.',
      { box: 'Did you know?', text: 'Around each village, women grew corn, beans and squash together. These crops are known as the Three Sisters, because they help one another grow.' },
      { h: 'Working together' },
      'Life in a longhouse depended on sharing. Families cooked, worked and cared for children side by side. When the soil near a village wore out after many years, the whole village moved and built new longhouses nearby.',
      'The longhouse is still important today. Haudenosaunee communities gather in longhouses for ceremonies and meetings, and the longhouse remains a symbol of people living together in peace.'
    ],
    guide: { before: 'Show the photo and ask how many people might live in a house this long. Teach <b>longhouse</b> and <b>clan</b>. Locate southern Ontario on a map. Explain that the Haudenosaunee and Wendat are nations that still live in Ontario and Quebec today.',
      after: 'What would be good about living with many relatives under one roof? What might be hard? How do people in your family share space?' },
    words: [['longhouse', 'a long home made of poles and bark, shared by many families'], ['clan', 'a group of families related to one another']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Longhouses were made of bark.', 'Many related families shared a longhouse and worked together.', 'Corn, beans and squash grow well together.', 'Villages moved often.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps for building a longhouse.',
        items: ['Set two rows of young trees in the ground.', 'Bend the tops toward each other.', 'Tie the tops together.', 'Cover the frame with bark.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what do the circles down the middle show?',
        opts: ['doors', 'shared fires', 'beds', 'windows'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Part of the longhouse', 'What it was used for'],
        rows: [['raised platforms', null], ['holes in the roof', null], [null, 'cooking and warmth for two families']],
        a: [[null, 'sleeping, with storage above'], [null, 'letting the smoke out'], ['the fires in the hallway', null]] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did a village move after many years?',
        opts: ['The longhouses fell down.', 'The soil near the village wore out.', 'The people wanted a new view.'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>related</b> mean in “they were related through the mothers”?',
        opts: ['part of the same family', 'living far away', 'talking together'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the text in two or three sentences. Give the main idea and two details.',
        a: 'Haudenosaunee and Wendat families of one clan lived together in longhouses made of poles and bark. Two families shared each fire, and everyone cooked, worked and cared for children together.', look: 'the main idea (shared life in a longhouse) and two details from the text' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The text ends by saying the longhouse is still important today. Why do you think the writer included this?',
        a: 'To show that Haudenosaunee people are not only part of the past. Their communities still use longhouses today.', look: 'an understanding that the writer wants readers to see Haudenosaunee culture as living today' }
    ]
  });

  P.add({
    id: 'g4-inuksuit', subject: 'social', form: 'Report',
    title: 'Stone Messengers of the Arctic',
    deck: 'How Inuit use piles of stone to share knowledge across the land',
    hero: {
      photo: 'g4-inuksuit.jpg', credit: 'Photo: Ansgar Walk, CC BY-SA 2.5, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'Inuksuit at Inuksugalait, on the Foxe Peninsula in Nunavut. The name means “where there are many inuksuit.”'
    },
    body: [
      'In the Arctic, the land can look the same for many kilometres: rock, snow and sky. There are no trees to mark a path. For thousands of years, Inuit have built stone figures that help people find their way. Each one is called an <b>inuksuk</b>. More than one are called inuksuit.',
      { h: 'A message in stone' },
      'The word inuksuk means “something that acts for a person.” An inuksuk does a person’s job when no one is there. It can show the way to a camp, point to a good fishing place or mark where food has been stored. Some inuksuit warn travellers about danger, such as thin ice. Long ago, lines of inuksuit helped hunters guide caribou toward the place where the hunters waited.',
      { fig: '<path class="k" d="M10 132 H290"/><path class="k" d="M40 132 L36 80 L56 76 L58 132 M36 80 L40 48 L54 48 L56 76"/>' +
          '<path class="k" d="M118 132 L120 100 L132 100 L134 132 M148 132 L146 100 L158 100 L160 132 M110 100 H168 V86 H110 Z M100 86 H178 V76 H100 Z M126 76 V60 H152 V76"/>' +
          '<path class="k" d="M226 132 L230 106 L250 106 L254 132 M220 106 H262 V94 H220 Z M240 94 V80 M234 80 H286 L280 70 H234 Z"/>' + D.arrow(270, 58, 292, 58, 'a') +
          '<text class="lb" x="48" y="152" text-anchor="middle">a marker</text><text class="lb" x="139" y="152" text-anchor="middle">like a person</text><text class="lb" x="252" y="152" text-anchor="middle">pointing</text>',
        tall: 160, cap: 'Some shapes of inuksuit. What each one means depends on where it stands and who built it.' },
      { h: 'Built with care' },
      'Builders choose stones that balance well together, without any glue or mortar. Some inuksuit are a single tall stone. Others are stacked high. An inuksuk shaped like a person, with legs and arms, has its own name: inunnguaq. Many inuksuit have stood for hundreds of years.',
      { box: 'Did you know?', text: 'An inuksuk appears on the flag of Nunavut, the territory created in 1999. It stands for the guidance of the land and the people who came before.' },
      { h: 'Respecting the land' },
      'Inuksuit are part of the knowledge that Inuit <b>elders</b> pass on to younger people. Because they carry real messages, people should never knock one down or build one where it might confuse a traveller. Today, you may see inuksuit in parks across Canada. The ones on the land in the Arctic still do the job they were built for. Some have been guiding people for longer than anyone can remember, and travellers still stop to read their messages.'
    ],
    guide: { before: 'Find Nunavut on a map of Canada. Explain that Inuit are the people of the Arctic. Teach <b>inuksuk</b> (plural inuksuit) and say the word together. Ask how you would find your way without signs or trees.',
      after: 'Why is it important not to build an inuksuk just for fun on the land in the North? What signs or markers help people find their way where you live?' },
    words: [['inuksuk', 'a stone figure built by Inuit to share a message'], ['elders', 'respected older people who pass on knowledge']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Nunavut has a flag.', 'Inuit build inuksuit to share important messages on the land.', 'The Arctic has no trees.', 'Caribou travel in lines.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are inuksuit especially useful in the Arctic?',
        opts: ['The land can look the same for kilometres.', 'There are many trees.', 'People like to build them in parks.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Look at the diagram. Which inuksuk could show which way to go?',
        opts: ['a marker', 'like a person', 'pointing'], a: 2 },
      { k: 'table', code: 'C3.3', q: 'List three jobs an inuksuk can do.', cols: ['Job', 'Why it helps people'],
        rows: [['shows the way to a camp', null], [null, 'people know where to catch fish'], [null, 'travellers stay safe']],
        a: [[null, 'travellers do not get lost'], ['points to a good fishing place', null], ['warns about danger, such as thin ice', null]] },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Inuksuit</b> is the word for more than one inuksuk. What English ending usually shows more than one?',
        opts: ['-s or -es', '-ing', '-ed', '-ly'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'The text explains what <b>inunnguaq</b> means right after the word. Why?',
        opts: ['to help readers understand a new word', 'to make the text longer', 'to tell a joke'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose knowledge does this text share? Why is it important to learn about inuksuit from Inuit?',
        a: 'It shares Inuit knowledge that elders pass on. Inuit built inuksuit and know what they mean, so learning from them gives the true meaning and shows respect.', look: 'recognizes Inuit perspective and gives a reason why the source matters' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why should people never knock down an inuksuk? Use a detail from the text.',
        a: 'Because inuksuit carry real messages. A traveller could get lost or be in danger without them.', look: 'a reason linked to the job inuksuit do' }
    ]
  });

  P.add({
    id: 'g4-nile', subject: 'history', form: 'Report',
    title: 'The Gift of the Nile',
    deck: 'How a river’s yearly flood fed ancient Egypt',
    hero: {
      photo: 'g4-nile.jpg', credit: 'Photo: NASA (MODIS), public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 190,
      cap: 'The Nile River seen from space. A thin strip of green farmland follows the river through the desert.'
    },
    body: [
      'Egypt is one of the driest places on Earth. Rain hardly ever falls there. Yet about 5000 years ago, one of the world’s greatest early societies grew up in Egypt. It could not have happened without the Nile River.',
      { h: 'The flood' },
      'Every summer, heavy rain fell in the mountains far to the south. The water rushed north and the Nile overflowed its banks. For weeks, the land beside the river was underwater. When the water went down, it left behind a layer of thick, black mud called <b>silt</b>. Silt is full of nutrients, so crops grow well in it.',
      { fig: '<rect class="k" x="10" y="30" width="93" height="40"/><rect class="h" x="103" y="30" width="94" height="40"/><rect class="k" x="197" y="30" width="93" height="40"/>' +
          '<text class="lb" x="56" y="55" text-anchor="middle">flood</text><text class="lb" x="150" y="55" text-anchor="middle">growing</text><text class="lb" x="244" y="55" text-anchor="middle">harvest</text>' +
          '<text class="n" x="56" y="86" text-anchor="middle">July to</text><text class="n" x="56" y="98" text-anchor="middle">October</text><text class="n" x="150" y="86" text-anchor="middle">November to</text><text class="n" x="150" y="98" text-anchor="middle">February</text><text class="n" x="244" y="86" text-anchor="middle">March to</text><text class="n" x="244" y="98" text-anchor="middle">June</text>' +
          D.ripple(16, 100, 22) + '<path class="k" d="M140 26 V12 M140 18 L132 12 M140 16 L148 10 M162 26 V14 M162 20 L154 14"/>',
        tall: 106, cap: 'The farming year in ancient Egypt had three seasons.' },
      { h: 'Three seasons' },
      'The Egyptians planned their year around the river. During the flood season, farmers could not work their fields, so many helped build temples and pyramids. As the water went down, they planted wheat, barley and flax in the wet silt. In the spring, they harvested the crops before the hot, dry summer. Then the flood came again.',
      { box: 'Did you know?', text: 'The Egyptians called their country Kemet, “the black land,” after the dark silt. They called the desert “the red land.”' },
      { h: 'Measuring the river' },
      'The size of the flood mattered. Too little water meant a poor harvest and hunger. Too much water could wash away villages. Egyptians built stone stairways into the river, called nilometers, with marks to measure how high the water rose. Officials used the marks to predict the harvest and decide how much <b>tax</b> each farmer would pay in grain.',
      'An ancient Greek writer called Egypt “the gift of the Nile.” Without the river, there would have been only desert.',
      'Today, a large dam at Aswan controls the Nile, so the river no longer floods each year. Farmers use fertilizer instead of silt, and canals carry water to their fields all year long.'
    ],
    guide: { before: 'Find Egypt and the Nile on a map or globe. Show the photo and point out the green strip in the desert. Teach <b>silt</b> and <b>tax</b>. Ask what plants need to grow.',
      after: 'How do farmers in Canada depend on the weather? Do we still depend on rivers today? Think of drinking water, electricity and travel.' },
    words: [['silt', 'fine, rich mud left behind by moving water'], ['tax', 'money or goods people must pay to their government']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Egypt is very dry.', 'The yearly flood of the Nile made farming, and life, possible in ancient Egypt.', 'Farmers built pyramids.', 'A Greek writer visited Egypt.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events of the Egyptian year in order.',
        items: ['The Nile floods the land.', 'The water goes down and leaves silt.', 'Farmers plant wheat and barley.', 'Farmers harvest the crops.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Look at the diagram. In which months did the crops grow?',
        opts: ['July to October', 'November to February', 'March to June'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['The Nile leaves silt on the land.', null], ['The flood is too small.', null], [null, 'Villages are washed away.']],
        a: [[null, 'Crops grow well.'], [null, 'There is a poor harvest and hunger.'], ['The flood is too big.', null]] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did many farmers help build temples during the flood?',
        opts: ['They could not work in their flooded fields.', 'They did not like farming.', 'It was too cold to farm.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>nilometer</b> measures the Nile. A thermometer measures heat. What does <b>-meter</b> mean?',
        opts: ['measure', 'water', 'stone', 'year'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'Why do you think the writer ends with the words “the gift of the Nile”?',
        a: 'It sums up the main idea in a strong phrase: everything Egypt had came from the river, like a gift.', look: 'links the phrase to the main idea of the text' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did officials want to know how high the water rose? Use details from the text.',
        a: 'The height of the flood told them how good the harvest would be, so they could decide how much grain each farmer should pay in tax.', look: 'connects the water level to the harvest and to taxes' }
    ]
  });

  P.add({
    id: 'g4-cuneiform', subject: 'history', form: 'Report',
    title: 'Writing on Clay',
    deck: 'The first writing, and why it was invented',
    hero: {
      photo: 'g4-clay-tablet.jpg', credit: 'Photo: Letterform Archive, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A clay tablet covered in cuneiform, the wedge-shaped writing of ancient Mesopotamia. It fits in the palm of a hand.'
    },
    body: [
      'Imagine running a busy market where no one could write. How would you remember who owed you three sheep or ten baskets of barley? About 5000 years ago, people in Mesopotamia faced this problem. Their answer changed the world. They invented writing.',
      { h: 'The land between the rivers' },
      'Mesopotamia means “the land between the rivers.” It lay between the Tigris and Euphrates rivers, in what is now Iraq. Farmers there grew so much grain that cities grew up, with temples, markets and thousands of people. Temple workers had to keep track of all the grain, animals and goods coming in and going out.',
      { h: 'Pressing, not painting' },
      'At first, people drew small pictures in clay: a sheep for a sheep, a stalk for barley. Over time, the pictures became simple patterns of lines. A writer, called a <b>scribe</b>, pressed the cut end of a reed into wet clay. Each press made a wedge-shaped mark. This writing is called <b>cuneiform</b>, from a Latin word that means “wedge-shaped.”',
      { fig: '<rect class="k" x="12" y="40" width="70" height="56" rx="8"/><path class="k" d="M128 18 L168 74 M134 14 L174 70 M168 74 L174 70 L170 80 Z"/><rect class="k" x="120" y="74" width="80" height="22" rx="4"/><path class="a" d="M166 80 l10 4 l-10 4 Z"/>' +
          '<rect class="k" x="222" y="40" width="70" height="56" rx="8"/><path class="a" d="M234 54 l10 4 l-10 4 Z M250 54 l10 4 l-10 4 Z M266 54 l10 4 l-10 4 Z M234 74 l10 4 l-10 4 Z M250 74 v12 l4 -6 Z"/><circle class="k" cx="270" cy="24" r="10"/><path class="t" d="M270 8 V4 M270 44 V40 M254 24 H250 M290 24 H286"/>' +
          '<text class="lb" x="47" y="118" text-anchor="middle">1 shape</text><text class="lb" x="160" y="118" text-anchor="middle">2 press</text><text class="lb" x="257" y="118" text-anchor="middle">3 dry</text>' +
          '<text class="n" x="47" y="132" text-anchor="middle">wet clay</text><text class="n" x="160" y="132" text-anchor="middle">a reed makes a wedge</text><text class="n" x="257" y="132" text-anchor="middle">in the sun</text>',
        tall: 140, cap: 'How a scribe made a tablet.' },
      { h: 'Going to scribe school' },
      'Learning cuneiform took years, because there were hundreds of signs to remember. Boys, and some girls, went to a school called the “tablet house.” They copied signs over and over. Teachers could be strict, and students who made mistakes might be punished.',
      { box: 'Did you know?', text: 'Clay tablets last a very long time. When a library burned, its clay tablets were baked hard, so they survived. Hundreds of thousands have been found.' },
      'Soon, scribes wrote more than lists. They wrote laws, letters, stories and the oldest poems we know. Writing let people remember the past and send ideas far away. Today, experts can read cuneiform, and the tablets tell us about the lives, jobs and even the jokes of people who lived 5000 years ago.'
    ],
    guide: { before: 'Find Iraq, the Tigris and the Euphrates on a map. Teach <b>scribe</b> and <b>cuneiform</b>. If you can, press the end of a popsicle stick into play dough to make wedges.',
      after: 'Writing began as a way to keep track of things people traded. What do you use writing for? What would be hard if no one could write?' },
    words: [['scribe', 'a person whose job was to write'], ['cuneiform', 'writing made of wedge-shaped marks']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'Why was writing invented in Mesopotamia?',
        opts: ['to write stories', 'to keep track of grain, animals and goods', 'to send letters to friends', 'to make art'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps for making a tablet.',
        items: ['Shape the wet clay.', 'Press a reed into it.', 'Dry the tablet in the sun.'], show: [2, 0, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>Mesopotamia</b> mean?',
        opts: ['land of the wedge', 'the land between the rivers', 'city of temples'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart to show how writing changed.', cols: ['First', 'Later', 'In the end'],
        rows: [[null, null, 'laws, letters, stories and poems']],
        a: [['small pictures drawn in clay', 'patterns of wedge-shaped lines', null]] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why have so many clay tablets survived?',
        opts: ['Clay lasts a long time, and fire bakes it hard.', 'People kept them in boxes.', 'They were made of stone.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why is “tablet house” in quotation marks?',
        opts: ['It is what someone shouted.', 'It is the name the school was called.', 'It is a joke.'], a: 1 },
      { k: 'lines', code: 'C2.3', n: 2, q: 'The text begins with a question: “How would you remember who owed you three sheep?” What did you predict the text would be about?',
        a: 'I predicted it would be about how people kept records before writing, and it was about how writing was invented.', look: 'a prediction linked to the opening question, and whether it was confirmed' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the text in two or three sentences.',
        a: 'People in Mesopotamia invented writing about 5000 years ago to keep track of goods. Scribes pressed reeds into wet clay to make wedge-shaped cuneiform. Later they used it for laws, letters and stories.', look: 'the main idea and key details in order' }
    ]
  });

  P.add({
    id: 'g4-great-lakes', subject: 'geography', form: 'Report',
    title: 'A Staircase of Lakes',
    deck: 'How water travels through the Great Lakes to the ocean',
    hero: {
      photo: 'g4-great-lakes.jpg', credit: 'Photo: SeaWiFS Project, NASA, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 210,
      cap: 'The Great Lakes seen from space. Ontario borders four of the five lakes.'
    },
    body: [
      'From space, the Great Lakes look like five blue puzzle pieces in the middle of North America. Together they hold about one fifth of all the <b>fresh water</b> in the lakes and rivers of the world. They are so big that you cannot see across most of them, and storms can whip up waves taller than a house.',
      { h: 'Five lakes, one system' },
      'The five lakes are Superior, Michigan, Huron, Erie and Ontario. They are joined by rivers and straits, so water flows from one to the next. Lake Superior is the largest, deepest and coldest. Lake Erie is the shallowest and the warmest. Lake Michigan is the only one that lies completely in the United States.',
      { h: 'Down the stairs' },
      'The lakes are not all at the same height. Lake Superior sits highest, about 183 metres above the sea. Water flows down from it to Lakes Michigan and Huron, then to Lake Erie. Between Lake Erie and Lake Ontario is the biggest step of all, at Niagara Falls. Finally, the St. Lawrence River carries the water past Montréal and Québec City to the Atlantic Ocean.',
      { fig: '<path class="k" d="M6 30 H70 V54 H150 V60 H196 V140 H250 Q270 150 296 150"/>' +
          D.ripple(10, 64, 26) + D.ripple(78, 146, 50) + D.ripple(152, 192, 56) + D.ripple(204, 246, 136) +
          '<path class="a" d="M196 64 Q190 100 198 136"/>' +
          '<text class="n" x="38" y="16" text-anchor="middle">Superior</text><text class="n" x="38" y="46" text-anchor="middle">183 m</text>' +
          '<text class="n" x="110" y="40" text-anchor="middle">Michigan and Huron</text><text class="n" x="110" y="72" text-anchor="middle">176 m</text>' +
          '<text class="n" x="174" y="78" text-anchor="middle">Erie</text><text class="n" x="174" y="90" text-anchor="middle">174 m</text>' +
          '<text class="n" x="226" y="124" text-anchor="middle">Ontario</text><text class="n" x="228" y="160" text-anchor="middle">75 m</text>' +
          D.label(130, 112, 'Niagara Falls', 192, 100) + '<text class="n" x="292" y="138" text-anchor="end">to the ocean</text>',
        tall: 168, cap: 'A side view of the lakes, showing their height above the sea. The steps are not drawn to scale.' },
      { box: 'Did you know?', text: 'Ships can travel from the Atlantic Ocean all the way to Lake Superior. Locks, like giant water elevators, raise and lower them past the steps.' },
      { h: 'Why they matter' },
      'More than 30 million people in Canada and the United States live near the Great Lakes. The lakes give them drinking water, fish, beaches and a way to ship goods. Because so many people share them, the two countries work together to keep the water clean. What goes into one lake can end up in all the others <b>downstream</b>.'
    ],
    guide: { before: 'Look at a map of the Great Lakes together and say the five names (HOMES: Huron, Ontario, Michigan, Erie, Superior). Teach <b>downstream</b> and <b>fresh water</b>. Show the side-view diagram and trace the water with a finger.',
      after: 'What could people do to keep the Great Lakes clean? Why does it matter to people who live far downstream?' },
    words: [['fresh water', 'water that is not salty, such as in lakes and rivers'], ['downstream', 'in the direction that water flows']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Lake Superior is cold.', 'The Great Lakes are a connected system of lakes that flows to the ocean and serves millions of people.', 'Ships use locks.', 'Lake Michigan is in the United States.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the lakes from highest to lowest.',
        items: ['Superior', 'Michigan and Huron', 'Erie', 'Ontario'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, where is the biggest drop?',
        opts: ['between Superior and Huron', 'at Niagara Falls', 'between Huron and Erie'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Lake', 'One fact from the text'],
        rows: [['Superior', null], ['Erie', null], ['Michigan', null]],
        a: [[null, 'the largest, deepest and coldest; the highest'], [null, 'the shallowest and the warmest'], [null, 'the only one completely in the United States']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Pollution goes into Lake Erie. Which lake could it reach next?',
        opts: ['Lake Superior', 'Lake Ontario', 'Lake Huron'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Down</b>stream means the way water flows. What would <b>up</b>stream mean?',
        opts: ['against the flow of the water', 'under the water', 'in a lake'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The writer compares the lakes to a staircase. Why is this a good comparison?',
        a: 'Each lake is lower than the one before, so water steps down from one to the next like going down stairs.', look: 'explains the comparison using the different heights of the lakes' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why must Canada and the United States work together to protect the lakes? Use details from the text.',
        a: 'Both countries share the lakes, and what goes into one lake flows downstream to the others, so neither country can keep the water clean alone.', look: 'a reason that uses the connected flow of water and the shared lakes' }
    ]
  });

  P.add({
    id: 'g4-sleep', subject: 'health', form: 'Explanation',
    title: 'Why Your Brain Needs Sleep',
    deck: 'What happens while you sleep, and how much sleep you need',
    hero: {
      photo: 'g4-sleeping-child.jpg', credit: 'Photo: Alessandro Zangrilli, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 190,
      cap: 'Sleep is not wasted time. While you rest, your body and brain are busy.'
    },
    body: [
      'You spend about one third of your life asleep. That might sound like a lot of time doing nothing. In fact, your body and brain do some of their most important work while you sleep.',
      { h: 'A busy night' },
      'While you sleep, your body repairs muscles and grows. Your brain sorts through everything you learned during the day and stores the important parts as <b>memories</b>. That is why a good night’s sleep after studying spelling words helps you remember them the next day. Sleep also helps your body fight germs, so you get sick less often.',
      { h: 'How much is enough?' },
      'People need different amounts of sleep at different ages. Canadian guidelines say that children from 5 to 13 years old need 9 to 11 hours of sleep every night. Teenagers need a little less, and adults need 7 to 9 hours.',
      { fig: '<path class="k" d="M70 14 V128 H292"/>' +
          [0, 2, 4, 6, 8, 10, 12, 14].map(function (h) { return '<path class="t" d="M' + (70 + h * 15) + ' 128 v4"/><text class="n" x="' + (70 + h * 15) + '" y="144" text-anchor="middle">' + h + '</text>'; }).join('') +
          '<rect class="h" x="220" y="22" width="45" height="16"/><rect class="h" x="205" y="50" width="30" height="16"/><rect class="h" x="190" y="78" width="30" height="16"/><rect class="h" x="175" y="106" width="30" height="16"/>' +
          '<text class="n" x="64" y="34" text-anchor="end">ages 3 to 4</text><text class="n" x="64" y="62" text-anchor="end">ages 5 to 13</text><text class="n" x="64" y="90" text-anchor="end">ages 14 to 17</text><text class="n" x="64" y="118" text-anchor="end">adults</text>' +
          '<text class="n" x="292" y="158" text-anchor="end">hours of sleep each night</text>',
        tall: 162, cap: 'How much sleep people need at different ages. The bars show the healthy range.' },
      { h: 'When sleep is short' },
      'Without enough sleep, it is harder to pay attention, solve problems and stay calm. Small things can feel very upsetting. Tired people also make more mistakes, from spelling to sports.',
      { box: 'Tips for a good sleep', text: 'Go to bed and wake up at about the same time every day. Put screens away an hour before bed, because their light tells your brain it is still daytime. Keep your room cool, dark and quiet.' },
      'A bedtime <b>routine</b> helps, too. Doing the same calm things each night, such as a bath, a book and lights out, tells your body that it is time to rest. Sleep is not a waste of time. It is how you get ready for tomorrow.'
    ],
    guide: { before: 'Ask the child what time they usually fall asleep and wake up, and work out together how many hours that is. Teach <b>memories</b> and <b>routine</b>. Show how to read the bar chart from the age to the bar.',
      after: 'What is one thing you could change to sleep better? Would a family screen-free hour before bed work in your home?' },
    words: [['memories', 'things your brain remembers'], ['routine', 'the same steps done in the same order every time']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Adults need 7 to 9 hours of sleep.', 'Sleep does important work for your body and brain, so you need enough of it.', 'Screens are bad.', 'Spelling is hard.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. How much sleep does a 10-year-old need?',
        opts: ['7 to 9 hours', '9 to 11 hours', '10 to 13 hours'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why should screens be put away before bed?',
        opts: ['Their light tells your brain it is still daytime.', 'They are too loud.', 'They use too much power.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['What sleep does', 'How it helps you'],
        rows: [['repairs muscles', null], ['sorts what you learned', null], [null, 'you get sick less often']],
        a: [[null, 'your body grows and stays strong'], [null, 'you remember the important parts'], ['helps your body fight germs', null]] },
      { k: 'choice', code: 'B2.1', half: true, q: 'Sleep helps you <b>re</b>member. Which word with <b>re-</b> means “build again”?',
        opts: ['rebuild', 'reason', 'ready'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why is “Tips for a good sleep” in a box?',
        opts: ['It gives advice the reader can use.', 'It is a story.', 'It is a joke.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the text in two or three sentences.',
        a: 'Your body and brain do important work while you sleep, like growing and storing memories. Children 5 to 13 need 9 to 11 hours a night, and a routine helps.', look: 'the main idea and two details, in the child’s own words' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Sam went to bed very late. The next day he forgot his lunch and got upset over a small thing. Use the text to explain why.',
        a: 'Without enough sleep it is harder to pay attention and stay calm, so Sam forgot things and small things felt upsetting.', look: 'connects Sam’s day to the effects of short sleep in the text' }
    ]
  });

  P.add({
    id: 'g4-helmet', subject: 'health', form: 'Explanation',
    title: 'Two, V, One',
    deck: 'How a bike helmet protects your brain, and how to check that it fits',
    hero: {
      photo: 'g4-bike-helmet.jpg', credit: 'Photo: Aaron Montoya, U.S. Air Force, public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 200,
      cap: 'A grown-up checks the fit of a child’s helmet at a bicycle safety day.'
    },
    body: [
      'Your brain controls everything you do: thinking, moving, seeing and feeling. A broken arm can heal in a few weeks, but a brain <b>injury</b> may take months to heal, and some injuries never fully heal. That is why a helmet is the most important thing you wear on a bike.',
      { h: 'How a helmet works' },
      'A bike helmet has a hard, smooth shell on the outside and thick foam on the inside. If you fall and hit your head, the foam crushes a little. Crushing soaks up the force of the <b>impact</b>, so less of it reaches your head. The smooth shell helps the helmet slide along the ground instead of twisting your neck.',
      { h: 'The 2V1 check' },
      'A helmet only protects you if it fits. Safety experts in Canada use a quick check called 2V1. Two: there should be two fingers’ width between your eyebrows and the helmet. V: the side straps should make a V shape just under each ear. One: you should fit only one finger between the chin strap and your chin.',
      { fig: '<path class="k" d="M90 70 Q90 18 150 18 Q210 18 210 70 Z"/><path class="t" d="M110 36 Q150 26 190 36"/>' +
          '<circle class="k" cx="150" cy="96" r="34"/><path class="k" d="M128 86 h10 M162 86 h10"/><path class="t" d="M142 112 Q150 116 158 112"/>' +
          '<path class="a" d="M118 70 L126 104 L134 70 M182 70 L174 104 L166 70 M126 104 Q150 140 174 104"/>' +
          '<path class="d" d="M120 72 V84 M126 72 V84"/>' +
          D.label(10, 70, '2 fingers', 122, 78) + D.label(10, 112, 'V under the ear', 126, 100) + D.label(226, 140, '1 finger', 160, 132) + D.label(10, 26, 'shell and foam', 104, 44),
        tall: 152, cap: 'The 2V1 check: two fingers, a V under each ear, and one finger under the strap.' },
      { box: 'Did you know?', text: 'In Ontario, cyclists under 18 must wear a bike helmet by law. A helmet that has been in a crash should be replaced, even if it looks fine, because its foam is already crushed.' },
      'Wear your helmet every time, even for a short ride. Most falls happen close to home, often at low speeds. It takes only a few seconds to buckle up.',
      { h: 'Choosing a helmet' },
      'Look for a sticker inside that shows the helmet meets a safety standard. Choose one that fits snugly without any pads squeezing. It should sit level on your head, not tipped back like a hat. Bike helmets are made for bikes. For skiing or hockey, you need a helmet made for that sport, because each one is tested for different kinds of falls.'
    ],
    guide: { before: 'If you have a helmet, try the 2V1 check together as you read. Teach <b>impact</b> and <b>injury</b>. Point to each part of the diagram.',
      after: 'Some people say helmets look silly or messy their hair. What would you say to a friend who will not wear one?' },
    words: [['impact', 'the force of one thing hitting another'], ['injury', 'harm or damage to the body']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Helmets are hard.', 'A helmet that fits well protects your brain when you fall.', 'Ontario has many laws.', 'Most falls happen near home.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram and the text. Fill in the 2V1 check.', cols: ['Part', 'What to check'],
        rows: [['2', null], ['V', null], ['1', null]],
        a: [[null, 'two fingers between your eyebrows and the helmet'], [null, 'the straps make a V just under each ear'], [null, 'one finger between the chin strap and your chin']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the foam crush a little?',
        opts: ['It is cheap.', 'Crushing soaks up the force of the impact.', 'It makes the helmet lighter.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'A helmet hit the road in a crash but looks fine. What should you do?',
        opts: ['keep using it', 'replace it', 'paint it'], a: 1 },
      { k: 'choice', code: 'B2.1', half: true, q: 'What does <b>un-</b> mean in <b>un</b>safe and <b>un</b>buckled?',
        opts: ['not, or the opposite of', 'again', 'before'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why is the title “Two, V, One”?',
        opts: ['It names the fit check the text teaches.', 'It is a race.', 'It counts the riders.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Who wrote this text, a helmet seller or a safety expert? What makes you think so?',
        a: 'A safety expert, because the writer wants you to stay safe and explains how to check the fit, not where to buy a helmet.', look: 'a reasonable view of the writer’s purpose with evidence from the text' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why a brain injury is more serious than a broken arm. Use the text.',
        a: 'A broken arm heals in a few weeks, but a brain injury can take months and may never fully heal. The brain controls everything we do.', look: 'the comparison of healing time and the role of the brain' }
    ]
  });

  P.add({
    id: 'g4-jack-pine', subject: 'arts', form: 'Report',
    title: 'The Jack Pine',
    deck: 'How Tom Thomson painted one of Canada’s best-known pictures',
    hero: {
      photo: 'g4-jack-pine.jpg', credit: 'Painting: Tom Thomson, public domain, National Gallery of Canada', focus: '50% 40%',
      side: { w: 370, view: '0 0 310 160' },
      tall: 250,
      cap: '<i>The Jack Pine</i>, painted by Tom Thomson in the winter of 1916 to 1917, and its design: flat bands across, with one tree reaching up through them.',
      art: '<rect class="k" x="40" y="10" width="220" height="140"/><path class="t" d="M40 56 H260 M40 74 Q120 66 180 74 T260 72 M40 96 H260"/>' +
        '<path class="a" d="M150 150 Q146 100 156 40 M154 60 L120 54 M155 80 L190 70 M152 100 L118 96 M156 44 L176 34"/>' +
        '<text class="n" x="268" y="36">sky</text><text class="n" x="268" y="68">hills</text><text class="n" x="268" y="88">lake</text><text class="n" x="268" y="124">shore</text>' +
        '<text class="n" x="4" y="100">tree</text><path class="t" d="M30 98 L146 98"/>'
    },
    body: [
      'A lonely pine tree leans over a lake. Behind it, bands of purple hills and a glowing yellow sky stretch away. This painting, <i>The Jack Pine</i>, is one of the best-known pictures in Canada. It hangs in the National Gallery of Canada in Ottawa.',
      { h: 'An artist of the North' },
      'Tom Thomson grew up on a farm near Owen Sound, Ontario. He worked as an artist who designed ads, but he loved the wild. Each spring, he paddled into Algonquin Park, where he worked as a fishing guide and a fire ranger. He painted the lakes, rivers and forests in every season.',
      { h: 'From sketch to canvas' },
      'Outdoors, Thomson often painted a quick, small picture, called a <b>sketch</b>, on a small wooden board. He made a sketch of this jack pine at Grand Lake in Algonquin Park. Later, in a shack behind an artists’ studio in Toronto, he used the sketch to paint a much larger picture on canvas.',
      { fig: '<rect class="h" x="160" y="14" width="126" height="115"/><rect class="k" x="40" y="110" width="24" height="19"/><path class="k" d="M10 129 H296"/>' +
          D.label(14, 96, 'sketch', 46, 110) + '<text class="n" x="52" y="146" text-anchor="middle">about 22 by 27 cm</text>' +
          '<text class="lb" x="223" y="74" text-anchor="middle">canvas</text><text class="n" x="223" y="146" text-anchor="middle">about 128 by 140 cm</text>',
        tall: 152, cap: 'The sketch and the finished painting, drawn to the same scale.' },
      { h: 'Looking closely' },
      'The painting is made of flat bands of colour stacked one above another: shore, lake, hills and sky. The tree cuts up through all of them. Thomson outlined the branches in dark paint and used short, thick strokes. The bright sky makes the dark tree stand out. The way an artist arranges the parts of a picture is called its <b>composition</b>. Some people think the tree looks lonely. Others think it looks brave, standing firm in the wind. Each viewer can decide.',
      { box: 'Did you know?', text: 'Thomson died in 1917, on Canoe Lake. A few years later, his artist friends formed the Group of Seven. They kept painting the Canadian wilderness in bold new ways.' }
    ],
    guide: { before: 'Look at the painting together for a full minute without talking, then share three things you noticed. Teach <b>sketch</b> and <b>composition</b>. Find Algonquin Park on a map of Ontario.',
      after: 'Thomson painted places that mattered to him. What place would you paint? What colours and shapes would you use?' },
    words: [['sketch', 'a quick, simple drawing or painting'], ['composition', 'the way the parts of a picture are arranged']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is this text mostly about?',
        opts: ['Algonquin Park', 'how Tom Thomson made <i>The Jack Pine</i> and what makes it special', 'the Group of Seven', 'how to paint a lake'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['Thomson grows up near Owen Sound.', 'He paddles into Algonquin Park.', 'He sketches the jack pine at Grand Lake.', 'He paints the large picture in Toronto.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what goes across the bands of colour?',
        opts: ['the lake', 'the tree', 'the sky'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Compare a sketch and the finished painting.', cols: ['', 'Sketch', 'Painting'],
        rows: [['Where it was made', null, 'in a shack in Toronto'], ['Size', null, null]],
        a: [[null, 'outdoors, at Grand Lake', null], [null, 'small, on a wooden board', 'much larger, on canvas']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Thomson make quick sketches outdoors?',
        opts: ['He had no studio.', 'He could catch what he saw before the light and weather changed.', 'He did not like painting.'], a: 1 },
      { k: 'choice', code: 'B2.1', half: true, q: 'A <b>ranger</b> looks after a park. What does the ending <b>-er</b> in ranger and painter mean?',
        opts: ['a person who does something', 'more than one', 'in the past'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The writer calls the tree “lonely.” What feeling does this word give the painting?',
        a: 'It makes the tree seem alone and a little sad or quiet, standing by itself by the lake.', look: 'a feeling (alone, quiet, sad) linked to the word lonely' },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the painting. Describe one thing you notice and how it makes you feel.',
        a: 'The sky glows yellow behind the dark tree. It makes me feel calm, like the end of a day.', look: 'a detail from the painting and a personal response connected to it' }
    ]
  });

  P.add({
    id: 'g4-orchestra', subject: 'arts', form: 'Explanation',
    title: 'Meet the Orchestra',
    deck: 'Four families of instruments, and the person who leads them',
    hero: {
      photo: 'g4-orchestra.jpg', credit: 'Photo: Reg Natarajan, CC BY 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 180,
      cap: 'The Toronto Symphony Orchestra on stage. Around 90 musicians play together.'
    },
    body: [
      'Imagine almost a hundred people playing music at the same time, with no one getting lost. That is a symphony orchestra. Its instruments are sorted into four groups, called families. Instruments in a family make their sound in a similar way.',
      { h: 'Strings' },
      'The string family is the largest. Violins, violas, cellos and double basses all make sound when a bow or a finger makes their strings vibrate. The smaller the instrument, the higher its sound. Strings sit at the front of the stage, closest to the audience.',
      { h: 'Woodwinds and brass' },
      'Woodwinds, such as flutes, clarinets, oboes and bassoons, are played by blowing air across a hole or through a thin reed. Brass instruments, such as trumpets, horns, trombones and the tuba, are played by buzzing the lips into a metal mouthpiece. Brass can play very loudly, so these players sit farther back.',
      { fig: '<path class="k" d="M10 140 Q150 -6 290 140"/><path class="t" d="M50 140 Q150 30 250 140 M84 140 Q150 66 216 140 M116 140 Q150 104 184 140"/>' +
          '<circle class="a" cx="150" cy="150" r="5"/><path class="k" d="M10 140 H290"/>' +
          '<text class="n" x="150" y="136" text-anchor="middle">strings</text><text class="n" x="150" y="117" text-anchor="middle">woodwinds</text><text class="n" x="150" y="98" text-anchor="middle">brass</text><text class="n" x="150" y="80" text-anchor="middle">percussion</text>' +
          D.label(196, 164, 'conductor', 155, 150) + '<text class="n" x="20" y="164">audience this way</text>',
        tall: 170, cap: 'A common seating plan. The louder families sit farther from the audience.' },
      { h: 'Percussion' },
      'The percussion family includes every instrument you hit, shake or scrape: drums, cymbals, the xylophone and even the triangle. Percussion players keep the beat and add excitement. One player may switch between several instruments in a single piece.',
      { box: 'Did you know?', text: 'Before a concert, the oboe plays one note, an A. Every other musician tunes to that note, so the whole orchestra plays in tune.' },
      { h: 'The conductor' },
      'In front of everyone stands the <b>conductor</b>. The conductor does not play an instrument. Instead, with a thin stick called a baton, the conductor shows the speed of the music, cues each <b>section</b> when to come in, and signals when to play louder or softer. Every musician watches the conductor, so that one hundred players sound like one.'
    ],
    guide: { before: 'If you can, play a short orchestra piece and listen for different instruments. Teach <b>conductor</b> and <b>section</b>. Read the seating plan from front to back.',
      after: 'Which instrument family would you like to play in, and why? How is an orchestra like a team?' },
    words: [['conductor', 'the leader who directs an orchestra'], ['section', 'a group of players with the same kind of instrument']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'How is this explanation organized?',
        opts: ['in time order, like a story', 'in parts, one for each instrument family and the conductor', 'as a list of steps', 'as questions and answers'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Family', 'How the sound is made', 'One instrument'],
        rows: [['strings', null, null], ['woodwinds', 'blowing across a hole or through a reed', null], [null, 'buzzing the lips into a mouthpiece', null], ['percussion', null, null]],
        a: [[null, 'a bow or finger makes the strings vibrate', 'violin, viola, cello or double bass'], [null, null, 'flute, clarinet, oboe or bassoon'], ['brass', null, 'trumpet, horn, trombone or tuba'], [null, 'hitting, shaking or scraping', 'drum, cymbal, xylophone or triangle']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the seating plan. Which family sits closest to the audience?',
        opts: ['percussion', 'brass', 'strings'], a: 2 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do the brass players sit farther back?',
        opts: ['They are tall.', 'They can play very loudly.', 'They arrive late.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Which would have the lowest sound?',
        opts: ['a violin', 'a cello', 'a double bass'], a: 2 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Percussion</b> instruments are hit. A <b>percussionist</b> is …',
        opts: ['a person who plays them', 'a kind of drum', 'a loud noise'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What are three jobs of the conductor?',
        a: 'The conductor shows the speed of the music, cues each section when to come in, and signals when to play louder or softer.', look: 'three jobs from the last paragraph' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The text ends: “one hundred players sound like one.” What does the writer mean?',
        a: 'All the players play together so well, following the conductor, that it sounds like one big instrument.', look: 'the idea of playing together as a single group' }
    ]
  });

  P.add({
    id: 'g4-bridges', subject: 'tech', form: 'Explanation',
    title: 'The Strength of Triangles',
    deck: 'Why engineers build bridges out of three-sided shapes',
    hero: {
      photo: 'g4-quebec-bridge.jpg', credit: 'Photo: Martin St-Amant, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'The Quebec Bridge over the St. Lawrence River. Its steel frame is made of thousands of triangles.'
    },
    body: [
      'Look closely at a crane, a tower or a big steel bridge, and you will see the same shape again and again: the triangle. Engineers use triangles because no other simple shape is as strong and stiff for its weight.',
      { h: 'Squares wobble, triangles hold' },
      'Make a square out of four straws joined at the corners with pins. Push on one corner, and the square leans over into a squashed diamond. Now make a triangle with three straws. Push on a corner, and it keeps its shape. The only way to change a triangle is to bend or break one of its sides. A shape that holds its form like this is called <b>rigid</b>.',
      { fig: '<path class="k" d="M20 120 H100 V40 H20 Z"/><path class="d" d="M20 120 H100 L120 40 H40 Z"/>' + D.arrow(4, 40, 30, 40, 'a') +
          '<path class="k" d="M180 120 H280 L230 40 Z"/>' + D.arrow(204, 26, 226, 40, 'a') +
          '<text class="lb" x="60" y="146" text-anchor="middle">square: leans</text><text class="lb" x="230" y="146" text-anchor="middle">triangle: holds</text>',
        tall: 152, cap: 'Push on the corner of each shape. The dashed square shows where it leans.' },
      { h: 'Building with triangles' },
      'A frame made of many triangles joined together is called a <b>truss</b>. When a heavy truck rolls across a truss bridge, its weight presses down on the triangles. Some parts of each triangle get squeezed, and some get pulled, but the shape does not change. The force is shared across the whole frame, so no single piece carries it all.',
      { box: 'Try it', text: 'Build a square and a triangle from straws and pipe cleaners. Push gently on each one. Then add one straw across the square from corner to corner. What happens, and why?' },
      { h: 'A Canadian giant' },
      'The Quebec Bridge crosses the St. Lawrence River near Québec City. Finished in 1917, it is a truss bridge built from steel triangles. Its middle span is 549 metres long, the longest of its kind in the world. More than a hundred years later, trains and cars still cross it every day.',
      'Next time you cross a bridge, look for the triangles. They are doing the heavy lifting.'
    ],
    guide: { before: 'Make a square and a triangle from straws or strips of paper with paper fasteners at the corners, and push on them together. Teach <b>rigid</b> and <b>truss</b>.',
      after: 'Where else do you see triangles in buildings, furniture or playgrounds? Why do you think they are there?' },
    words: [['rigid', 'stiff; keeps its shape'], ['truss', 'a frame made of triangles joined together']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Quebec Bridge is long.', 'Triangles are strong shapes, so engineers use them to build bridges and towers.', 'Squares are bad shapes.', 'Trucks are heavy.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what do the dashed lines show?',
        opts: ['where the square leans when pushed', 'a second triangle', 'a bridge'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'In the “Try it” box, what happens when you add a straw across the square?',
        opts: ['It makes two triangles, so the shape holds.', 'It falls apart.', 'It becomes a circle.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the two shapes.', cols: ['', 'Square', 'Triangle'],
        rows: [['When you push a corner', null, null], ['Rigid?', null, 'yes']],
        a: [[null, 'it leans into a diamond', 'it keeps its shape'], [null, 'no', null]] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Tri</b>angle has three sides. What else has three of something?',
        opts: ['a tricycle', 'a bicycle', 'a unicycle'], a: 0 },
      { k: 'choice', code: 'C2.4', half: true, q: 'You are not sure what <b>truss</b> means. What is the best thing to do?',
        opts: ['Check Words to know at the bottom of the page.', 'Skip the rest.', 'Guess any meaning.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why a truss bridge does not bend when a heavy truck crosses it.',
        a: 'The truck’s weight presses on the triangles, but triangles keep their shape. The force is shared across the whole frame, so no one piece carries it all.', look: 'triangles hold their shape and the force is shared' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'The last sentence says the triangles are “doing the heavy lifting.” Predict what would happen to a bridge built with squares instead.',
        a: 'It would lean and wobble when something heavy crossed, and it could collapse.', look: 'a prediction based on squares not being rigid' }
    ]
  });

  P.add({
    id: 'g4-maple', subject: 'math', form: 'Explanation',
    title: 'Forty to One',
    deck: 'The math of turning maple sap into syrup',
    hero: {
      photo: 'g4-sap-buckets.jpg', credit: 'Photo: public domain, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'Buckets collect sap from maple trees in early spring.'
    },
    body: [
      'Every spring, when the snow begins to melt, maple trees start to wake up. Sugar that the tree stored in its roots all winter rises up the trunk in a clear, watery liquid called <b>sap</b>. With a lot of work and a little math, sap becomes maple syrup.',
      { h: 'The sugar season' },
      'Sap flows best when nights are below freezing and days are above freezing. In much of Ontario and Quebec, that happens for about four to six weeks in March and April. Long before Europeans arrived, the Anishinaabe, the Haudenosaunee and other First Nations collected sap and boiled it down to make maple sugar. Many families still gather for the sugar season today.',
      { h: 'Boiling it down' },
      'Fresh sap tastes like water with a hint of sweetness. It is only about 2 parts sugar in every 100. To make syrup, sugar makers boil the sap for hours. As the sap boils, the water <b>evaporate</b>s and rises away as steam, but the sugar stays behind. They keep boiling until the liquid is thick, golden and sweet.',
      { fig: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (c) { return [0, 1, 2, 3].map(function (r) { return '<rect class="k" x="' + (10 + c * 17) + '" y="' + (16 + r * 26) + '" width="11" height="18" rx="2"/>'; }).join(''); }).join('') +
          D.arrow(186, 60, 222, 60, 'a') + '<rect class="h" x="240" y="44" width="22" height="34" rx="3"/>' +
          '<text class="lb" x="92" y="134" text-anchor="middle">40 litres of sap</text><text class="lb" x="251" y="134" text-anchor="middle">1 litre of syrup</text>' +
          '<text class="n" x="204" y="48" text-anchor="middle">boil</text>',
        tall: 142, cap: 'Each small jar is one litre. It takes about 40 litres of sap to make 1 litre of syrup.' },
      { h: 'The magic number' },
      'Sugar makers use a rule of thumb: about 40 litres of sap make 1 litre of syrup. So 2 litres of syrup need about 80 litres of sap, and 10 litres of syrup need about 400 litres. One tap on a large maple gives about 40 litres of sap in a season. That means one tree gives enough for about one litre of syrup.',
      { box: 'Did you know?', text: 'Canada makes about three quarters of all the maple syrup in the world. Most of it comes from Quebec.' },
      { h: 'Grades of syrup' },
      'Syrup made early in the season is usually light and golden, with a gentle taste. Syrup made later is darker, with a stronger taste. In Canada, syrup is sorted by colour into grades, from golden to very dark. All of it is made the same way, with patience, heat and about forty litres of sap.'
    ],
    guide: { before: 'Show a bottle of maple syrup and ask how it is made. Teach <b>sap</b> and <b>evaporate</b>. Count the jars in the diagram together, by tens.',
      after: 'Why do you think real maple syrup costs more than other syrups? Use the 40 to 1 rule in your answer.' },
    words: [['sap', 'the watery liquid that carries food inside a tree'], ['evaporate', 'to change from a liquid into a gas']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Trees wake up in spring.', 'Maple syrup is made by boiling down a lot of sap, about 40 litres for each litre of syrup.', 'Quebec makes syrup.', 'Sap tastes like water.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Use the 40 to 1 rule. Fill in the chart.', cols: ['Syrup', 'Sap needed'],
        rows: [['1 litre', '40 litres'], ['3 litres', null], [null, '200 litres']],
        a: [[null, null], [null, '120 litres'], ['5 litres', null]] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how many jars of sap are shown?',
        opts: ['10', '40', '100'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do sugar makers boil the sap for hours?',
        opts: ['to make the water evaporate, leaving the sugar', 'to cool it', 'to add colour'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps to show how sap becomes syrup.',
        items: ['Sugar rises up the trunk in the sap.', 'Sap is collected in buckets.', 'The sap is boiled and the water evaporates.', 'The syrup is thick, golden and sweet.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>E</b>vaporate means the water goes <b>out</b> as steam. Which word with <b>e-</b> or <b>ex-</b> means “go out”?',
        opts: ['exit', 'enter', 'under'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'A family has 4 maple trees with one tap each. About how much syrup can they make? Show how you know.',
        a: 'About 4 litres. Each tap gives about 40 litres of sap, which makes about 1 litre of syrup, so 4 trees make about 4 litres.', look: 'the answer 4 litres with the steps from the text' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'Why does the writer mention the Anishinaabe and Haudenosaunee?',
        a: 'To show that First Nations made maple sugar long before Europeans arrived, so readers know where this tradition comes from.', look: 'recognizes the writer is giving credit to First Nations for the tradition' }
    ]
  });

  P.add({
    id: 'g4-snow-fort', subject: 'story', form: 'Short story',
    title: 'The Fort on Maple Street',
    deck: 'Two builders, one pile of snow, and two very different plans',
    hero: {
      photo: 'g4-snow-fort.jpg', credit: 'Photo: Andrew Wiseman, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 70%',
      tall: 190,
      cap: 'After a big storm, the snowbanks are perfect for building.'
    },
    body: [
      'The storm dumped forty centimetres of snow on Maple Street overnight. By nine o’clock, my neighbour Mateo was standing at the end of my driveway with two shovels and a big grin.',
      '“Fort,” he said. That was all he needed to say.',
      { h: 'Two plans' },
      'We started digging right away, but it took about five minutes to have our first argument. I wanted a tall tower with a lookout window. Mateo wanted long, low walls so we could have the biggest fort on the street. “Towers fall over,” he said. “Walls are boring,” I said. We each built our own part, and we didn’t talk much.',
      { fig: '<rect class="k" x="20" y="30" width="180" height="90"/><path class="d" d="M100 120 V100 H120 V120"/><circle class="k" cx="240" cy="60" r="30"/><path class="t" d="M200 60 H210"/>' +
          '<path class="a" d="M236 34 h10"/>' + D.label(30, 20, 'long walls (Mateo)', 60, 30) + D.label(196, 112, 'tower (me)', 240, 90) + D.label(122, 142, 'door', 110, 120) + D.label(250, 14, 'lookout', 241, 32),
        tall: 150, cap: 'The plan I drew in my notebook that night.' },
      { h: 'The crash' },
      'By lunchtime, my tower was as tall as my shoulders. I was carving the window when the whole thing slumped sideways and crashed down on top of Mateo’s wall. Snow went everywhere. For a second we just stared at the mess. The wind whistled across the yard as if it were laughing at us.',
      'Then Mateo started to laugh, and so did I.',
      { h: 'Building together' },
      '“Your tower was too skinny,” Mateo said. “It needs thick walls at the bottom.” He was right. We decided to <b>compromise</b>. Mateo’s long walls would go around the outside, and a short, wide tower would stand in one corner. We packed snow into my sister’s recycling bin, flipped it over and made solid blocks. Block by block, the fort grew <b>sturdy</b> and strong.',
      'By the time the streetlights came on, we had a fort with long walls, a door and a tower with a lookout window. It was not my plan, and it was not Mateo’s plan. It was better than both.'
    ],
    guide: { before: 'Ask whether the child has ever had to share a building project with someone. Teach <b>compromise</b> and <b>sturdy</b>. Read the title and look at the plan, then predict what might go wrong.',
      after: 'When is it better to compromise, and when is it better to keep your own idea? Talk about a time you had to work something out with a friend.' },
    words: [['compromise', 'to settle a disagreement by each side giving up a little'], ['sturdy', 'strong and hard to knock down']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'Who tells this story?',
        opts: ['Mateo', 'a narrator who is one of the builders, using “I”', 'a narrator who is not in the story', 'the narrator’s sister'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the story map.', cols: ['Part of the story', 'What happens'],
        rows: [['Problem', null], ['Turning point', null], ['Solution', null]],
        a: [[null, 'The two friends want to build different forts and argue.'], [null, 'The tower crashes onto the wall, and they both laugh.'], [null, 'They compromise: long walls and a short, wide tower, built from solid blocks.']] },
      { k: 'choice', code: 'C3.1', half: true, q: '“The wind whistled … as if it were laughing at us.” This gives the wind …',
        opts: ['the actions of a person', 'a colour', 'a smell'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How do the friends feel while they build separate parts?',
        opts: ['cheerful', 'a little annoyed with each other', 'scared'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Look at the plan. Whose idea was the tower?',
        opts: ['the narrator’s', 'Mateo’s', 'the sister’s'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In “sturdy and strong,” which word means almost the same as <b>sturdy</b>?',
        opts: ['strong', 'tall', 'cold'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 2, q: 'After the tower crashed, what did you predict would happen? Was your prediction right?',
        a: 'I predicted they would have a big fight, but they laughed and then worked together.', look: 'a prediction based on the story and whether it was confirmed' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The narrator says the fort was “better than both” plans. What lesson does the story teach? Use details.',
        a: 'Working together can make something better than one person’s idea. Mateo’s walls and the narrator’s tower together made a great fort.', look: 'a lesson about cooperation or compromise, with a detail from the story' }
    ]
  });

  P.add({
    id: 'g4-terry-fox', subject: 'history', form: 'Biography',
    title: 'The Marathon of Hope',
    deck: 'How one young man ran across Canada for cancer research',
    hero: {
      photo: 'g4-terry-fox.jpg', credit: 'Photo: Robert Linsdell, CC BY 2.0, Wikimedia Commons', focus: '50% 30%',
      side: { w: 420, view: '0 0 420 200' },
      tall: 200,
      cap: 'The statue of Terry Fox in Ottawa, and the route he ran in 1980.',
      art: '<path class="a" d="M400 70 Q330 90 270 96 Q200 100 150 112"/><path class="d" d="M150 112 Q90 120 20 104"/>' +
        '<circle class="dot" cx="400" cy="70" r="4"/><circle class="dot" cx="150" cy="112" r="4"/><circle class="t" cx="20" cy="104" r="4"/>' +
        '<text class="lb" x="400" y="54" text-anchor="end">St. John’s</text><text class="n" x="400" y="40" text-anchor="end">April 12</text>' +
        '<text class="lb" x="150" y="140" text-anchor="middle">Thunder Bay</text><text class="n" x="150" y="154" text-anchor="middle">September 1</text>' +
        '<text class="n" x="20" y="124">Victoria</text><text class="n" x="280" y="128" text-anchor="middle">5373 km in 143 days</text>' +
        '<text class="n" x="70" y="92" text-anchor="middle">the rest of the plan</text>'
    },
    body: [
      'On April 12, 1980, a curly-haired young man dipped his artificial leg into the Atlantic Ocean at St. John’s, Newfoundland. Then he started to run west. His name was Terry Fox, and he planned to run all the way across Canada.',
      { h: 'Why he ran' },
      'Terry grew up in Port Coquitlam, British Columbia, and loved basketball. When he was 18, doctors found cancer in his right leg, and they had to remove the leg above the knee. In the hospital, he saw many people, including children, fighting cancer. He decided to raise money for <b>research</b> to find better treatments. He called his run the Marathon of Hope.',
      { h: 'A marathon every day' },
      'A marathon is a race of about 42 kilometres. Terry ran about that far almost every day, through rain, snow, heat and strong winds. Because of his artificial leg, he ran with a hop and a step, a style that became famous. At first, few people noticed. By the time he reached Ontario, crowds lined the roads to cheer him on.',
      { fig: '<path class="k" d="M40 14 V120 H290"/><rect class="h" x="70" y="96" width="50" height="24"/><rect class="h" x="170" y="20" width="50" height="100"/>' +
          '<text class="lb" x="95" y="90" text-anchor="middle">$1.7 million</text><text class="lb" x="195" y="14" text-anchor="middle">$24 million</text>' +
          '<text class="n" x="95" y="136" text-anchor="middle">September 1980</text><text class="n" x="195" y="136" text-anchor="middle">February 1981</text>',
        tall: 142, cap: 'Money raised for cancer research by the Marathon of Hope.' },
      { h: 'The run ends' },
      'On September 1, near Thunder Bay, Ontario, Terry had to stop. The cancer had spread to his lungs. He had run 5373 kilometres in 143 days. He died the next summer, at age 22. But his goal came true: Canadians gave more than $24 million, one dollar for every person in the country.',
      { box: 'Did you know?', text: 'Every September, people in Canada and around the world take part in the Terry Fox Run. It has raised more than $850 million for cancer research.' },
      'Terry never asked for money for himself. When people called him a hero, he said he was just doing what he could. He showed that one person’s <b>determination</b> can inspire a whole country. Today, schools, roads, a mountain and even a ship are named after him.'
    ],
    guide: { before: 'Find St. John’s and Thunder Bay on a map of Canada and talk about how far that is. Teach <b>research</b> and <b>determination</b>. Explain that this is a true story about a real person.',
      after: 'Terry Fox chose a goal that helped other people. What is a goal you could set to help others in your school or community?' },
    words: [['research', 'careful study to find out new things'], ['determination', 'not giving up, even when something is hard']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This text is a biography. What does a biography do?',
        opts: ['tells the true story of a real person’s life', 'gives steps to follow', 'tells a made-up story', 'tries to sell something'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['Doctors find cancer in Terry’s leg.', 'Terry starts running at St. John’s.', 'Crowds cheer him in Ontario.', 'He stops near Thunder Bay.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Look at the route. What does the dashed line show?',
        opts: ['the part Terry ran', 'the part he planned but could not run', 'a river'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart with numbers from the text.', cols: ['Fact', 'Number'],
        rows: [['kilometres Terry ran', null], ['days he ran', null], ['dollars raised by February 1981', null]],
        a: [[null, '5373'], [null, '143'], [null, 'more than $24 million']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the bar graph. When was more money raised?',
        opts: ['by September 1980', 'by February 1981', 'the same'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Determin</b>ation comes from <b>determine</b>. What does <b>-ation</b> do to the word?',
        opts: ['makes it a noun (a thing or quality)', 'makes it mean “not”', 'makes it past tense'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think crowds started cheering by the time Terry reached Ontario? Use clues from the text.',
        a: 'More people had heard about his run by then, and they admired how he kept running a marathon every day with an artificial leg.', look: 'an inference about growing news and admiration, with a text clue' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The last sentence says Terry “can inspire a whole country.” Do you agree? Give a reason from the text.',
        a: 'Yes. Canadians gave more than $24 million, and people still run every September, so his example still inspires people.', look: 'an opinion supported by a detail from the text' }
    ]
  });

  P.add({
    id: 'g4-bird-feeder', subject: 'science', form: 'Procedure',
    title: 'A Pine Cone Bird Feeder',
    deck: 'Help winter birds, and watch who comes to visit',
    hero: {
      photo: 'g4-chickadee-feeder.jpg', credit: 'Photo: Patty O’Hearn Kickham, CC BY 2.0, Wikimedia Commons', focus: '60% 40%',
      tall: 190,
      cap: 'A black-capped chickadee picks seeds from a feeder in Guelph, Ontario.'
    },
    body: [
      'In winter, food is hard for birds to find. Snow covers the seeds on the ground, and the insects are gone. Many birds, such as chickadees, nuthatches and juncos, stay in Ontario all winter. A simple feeder can help them, and it gives you a chance to watch them up close.',
      { h: 'Materials' },
      'Gather your <b>materials</b>. You need a large, open pine cone, a piece of string about 50 centimetres long, a spoon, a paper plate, about half a cup of vegetable shortening and one cup of birdseed. Shortening is better than peanut butter if anyone at your school has a nut <b>allergy</b>.',
      { h: 'Steps' },
      '1. Tie the string tightly around the top of the pine cone, under the top scales. Leave a long end for hanging.',
      '2. Use the spoon to spread shortening all over the cone. Push it deep between the scales.',
      '3. Pour the birdseed onto the plate. Roll the cone in the seeds until it is completely covered.',
      { fig: '<path class="k" d="M30 40 Q20 70 40 100 Q60 70 50 40 Z M40 40 V14"/><path class="t" d="M28 58 h22 M30 74 h20 M34 88 h12"/>' +
          '<path class="k" d="M130 40 Q120 70 140 100 Q160 70 150 40 Z"/><path class="a" d="M160 50 L184 34"/><ellipse class="k" cx="190" cy="30" rx="10" ry="5"/>' +
          '<ellipse class="k" cx="250" cy="96" rx="40" ry="10"/><path class="k" d="M240 84 Q232 60 250 44 Q268 60 260 84"/>' + '<path class="t" d="M226 96 h4 M240 100 h4 M262 94 h4 M274 98 h4"/>' +
          '<text class="lb" x="40" y="128" text-anchor="middle">1 tie</text><text class="lb" x="150" y="128" text-anchor="middle">2 spread</text><text class="lb" x="250" y="128" text-anchor="middle">3 roll</text>',
        tall: 136, cap: 'The first three steps.' },
      '4. Hang the feeder from a branch where you can see it from a window, but where squirrels and cats cannot easily reach it.',
      { box: 'Be a scientist', text: 'Keep a bird journal. Each day, write the date, the weather and the birds you see. Which bird visits most often? Do more birds come on cold days?' },
      'It may take a few days for the birds to find your feeder. Be patient. Once they do, they will come back again and again. Replace the cone when it is empty, and keep feeding until spring.',
      { h: 'Who might visit?' },
      'Black-capped chickadees are small and bold, with a black cap and bib. They often grab one seed and fly off to eat it on a branch. Red-breasted and white-breasted nuthatches walk headfirst down tree trunks. Dark-eyed juncos are grey with white bellies, and they like to pick up fallen seeds on the ground under the feeder. Blue jays are big, loud and bright blue. Try to learn one new bird each week.'
    ],
    guide: { before: 'Read the title and the headings first, and ask what kind of text this is. Teach <b>materials</b> and <b>allergy</b>. If you can, gather the materials and make the feeder after reading.',
      after: 'Which birds came to your feeder? What did your journal show? What could you change to attract more birds?' },
    words: [['materials', 'the things you need to make something'], ['allergy', 'when the body reacts badly to something, such as a food']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'What kind of text is this?',
        opts: ['a story', 'a procedure that tells how to make something', 'a poem', 'a letter'], a: 1 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why are the steps numbered?',
        opts: ['to show the order to do them', 'to count the birds', 'to make the page pretty'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the text suggest shortening instead of peanut butter?',
        opts: ['It is cheaper.', 'Some people have nut allergies.', 'Birds do not like peanuts.'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number the steps in order.',
        items: ['Tie the string around the cone.', 'Spread shortening on the cone.', 'Roll the cone in birdseed.', 'Hang the feeder from a branch.'], show: [3, 1, 0, 2] },
      { k: 'table', code: 'C3.3', q: 'List the materials.', cols: ['Material', 'What it is for'],
        rows: [['pine cone', null], ['shortening', null], [null, 'to hang the feeder']],
        a: [[null, 'to hold the food'], [null, 'to make the seeds stick'], ['string', null]] },
      { k: 'choice', code: 'B2.1', half: true, q: 'What does <b>re-</b> mean in “<b>re</b>place the cone”?',
        opts: ['again or back', 'not', 'before'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Which step is NOT shown in the diagram?',
        opts: ['tie', 'roll', 'hang'], a: 2 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why should the feeder be hung where squirrels and cats cannot easily reach it?',
        a: 'Squirrels would eat the birds’ food, and cats could catch the birds while they eat.', look: 'reasons for both squirrels (food) and cats (danger to birds)' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'In one or two sentences, tell why someone should make this feeder.',
        a: 'It helps birds find food in winter, and you can watch and learn about them.', look: 'the purpose of the procedure in the child’s own words' }
    ]
  });

  P.add({
    id: 'g4-gears', subject: 'science', form: 'Explanation',
    title: 'Teeth That Turn',
    deck: 'How gears change speed, force and direction',
    hero: {
      photo: 'g4-bike-gears.jpg', credit: 'Photo: 5 Cent Dollar, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'The gears and chain on a bicycle. The rider shifts the chain to a bigger or smaller gear.'
    },
    body: [
      'Look inside a bicycle, a clock or a hand-crank egg beater, and you will find wheels with teeth around their edges. These wheels are called <b>gears</b>. When the teeth of two gears fit together, turning one gear makes the other one turn too.',
      { h: 'Opposite directions' },
      'When two gears touch, they turn in opposite directions. If the first gear turns clockwise, the second turns counterclockwise. Add a third gear, and it turns the same way as the first. Engineers use this to make machine parts spin exactly the way they need.',
      { h: 'Big and small' },
      'Gears can also change speed. Picture a big gear with 40 teeth turning a small gear with 10 teeth. Each time the big gear turns once, 40 teeth pass by. The small gear must turn four times to match them. So a big gear turning a small gear makes it spin faster. It works the other way too. A small gear turning a big gear makes it turn more slowly, but with more <b>force</b>.',
      { fig: '<circle class="k" cx="90" cy="76" r="52"/><circle class="t" cx="90" cy="76" r="14"/><circle class="dot" cx="90" cy="76" r="4"/>' +
          '<circle class="k" cx="166" cy="76" r="15"/><circle class="dot" cx="166" cy="76" r="3"/>' +
          '<path class="k" d="' + Array.apply(null, Array(40)).map(function (_, i) { var a = i * Math.PI / 20; return 'M' + (90 + 52 * Math.cos(a)).toFixed(1) + ' ' + (76 + 52 * Math.sin(a)).toFixed(1) + ' L' + (90 + 58 * Math.cos(a)).toFixed(1) + ' ' + (76 + 58 * Math.sin(a)).toFixed(1); }).join(' ') +
            Array.apply(null, Array(10)).map(function (_, i) { var a = i * Math.PI / 5 + 0.3; return ' M' + (166 + 15 * Math.cos(a)).toFixed(1) + ' ' + (76 + 15 * Math.sin(a)).toFixed(1) + ' L' + (166 + 21 * Math.cos(a)).toFixed(1) + ' ' + (76 + 21 * Math.sin(a)).toFixed(1); }).join('') + '"/>' +
          '<path class="a" d="M52 22 A66 66 0 0 1 124 18"/>' + D.arrow(116, 14, 126, 20, 'a') + '<path class="a" d="M190 56 A30 30 0 0 0 146 54"/>' + D.arrow(152, 50, 144, 57, 'a') +
          '<text class="lb" x="90" y="152" text-anchor="middle">40 teeth</text><text class="lb" x="166" y="118" text-anchor="middle">10 teeth</text>' +
          '<text class="n" x="292" y="72" text-anchor="end">1 turn of the</text><text class="n" x="292" y="86" text-anchor="end">big gear = 4 turns</text><text class="n" x="292" y="100" text-anchor="end">of the small gear</text>',
        tall: 160, cap: 'The gears turn in opposite directions. The small gear spins four times faster.' },
      { h: 'Gears on a bike' },
      'On a bicycle, a chain connects the gear at the pedals to a set of gears on the back wheel. Riding up a steep hill, you shift to a big gear at the back. Each push on the pedals turns the wheel only a little, but it is easier. On a flat road, you shift to a small gear at the back. Pedalling is harder, but each turn carries you farther, so you go faster.',
      { box: 'Did you know?', text: 'Old clocks have dozens of gears inside. The gears are chosen so that the minute hand turns exactly 12 times while the hour hand turns once.' },
      'Gears let a machine trade speed for force, or force for speed. That is why they are in cars, drills, blenders and wind-up toys.'
    ],
    guide: { before: 'If you have a bike, turn it upside down and turn the pedals slowly while the child watches the gears. Teach <b>gear</b> and <b>force</b>. Count the teeth in the diagram together.',
      after: 'Which gear would you use to ride up a big hill, and why? Where else at home do you think gears are hiding?' },
    words: [['gears', 'wheels with teeth that fit together and turn each other'], ['force', 'a push or a pull']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Bikes have chains.', 'Gears are toothed wheels that change the speed, force and direction of movement.', 'Clocks are old.', 'Hills are steep.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how many times does the small gear turn when the big gear turns once?',
        opts: ['1', '4', '10', '40'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Gear A turns clockwise. Gear B touches it. Which way does B turn?',
        opts: ['clockwise', 'counterclockwise', 'it does not turn'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart about bike gears.', cols: ['Where you ride', 'Gear at the back', 'What it feels like'],
        rows: [['up a steep hill', null, null], ['on a flat road', 'a small gear', null]],
        a: [[null, 'a big gear', 'easier to pedal, but slower'], [null, null, 'harder to pedal, but faster']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Counter</b>clockwise means the opposite way to a clock. What does <b>counter-</b> mean?',
        opts: ['against or opposite', 'with', 'twice'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Where would you look to find out how gears are used on bikes?',
        opts: ['under “Gears on a bike”', 'under “Opposite directions”', 'in Words to know'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'A big gear with 30 teeth turns a small gear with 10 teeth. How many times does the small gear turn for one turn of the big one? Explain.',
        a: 'Three times. Thirty teeth pass by when the big gear turns once, and the small gear has 10 teeth, so it must turn 3 times.', look: 'the answer 3 with reasoning about matching teeth' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'Write one sentence that sums up what gears do.',
        a: 'Gears trade speed for force, or force for speed, and can change the direction something turns.', look: 'a single clear summary of the main idea' }
    ]
  });

  P.add({
    id: 'g4-rainbows', subject: 'science', form: 'Explanation',
    title: 'Hidden Colours',
    deck: 'How a prism, a raindrop and sunlight make a rainbow',
    hero: {
      photo: 'g4-prism.jpg', credit: 'Photo: Kelvinsong, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Light passes through a glass prism and spreads into a band of colours.'
    },
    body: [
      'Sunlight looks white, or almost no colour at all. But hidden inside it is every colour of the rainbow. In 1666, the scientist Isaac Newton showed this with a simple wedge of glass called a <b>prism</b>.',
      { h: 'Light bends' },
      'Light travels in straight lines, but when it passes from air into glass or water, it changes speed and bends. Each colour bends by a slightly different amount. Violet light bends the most, and red light bends the least. So when white light goes through a prism, the colours spread apart into a band called a <b>spectrum</b>: red, orange, yellow, green, blue and violet.',
      { fig: '<path class="k" d="M110 130 L160 30 L210 130 Z"/><path class="k" d="M10 92 L134 80"/>' +
          '<path class="a" d="M186 88 L290 64"/><path class="k" d="M186 92 L290 82"/><path class="t" d="M186 96 L290 100"/><path class="d" d="M186 100 L290 118"/>' +
          '<text class="n" x="10" y="76">white light</text><text class="n" x="292" y="60" text-anchor="end">red</text><text class="n" x="292" y="130" text-anchor="end">violet</text>' +
          '<text class="n" x="160" y="146" text-anchor="middle">prism</text>',
        tall: 150, cap: 'Each colour bends by a different amount, so white light spreads into a spectrum.' },
      { h: 'A sky full of prisms' },
      'A rainbow forms the same way, but with millions of raindrops instead of one prism. Sunlight enters each drop, bends, bounces off the back of the drop and bends again as it comes out. The colours spread apart, and we see them as a curved band across the sky.',
      { box: 'Rainbow tips', text: 'To see a rainbow, stand with the sun behind you and the rain in front of you. Rainbows are most common in the late afternoon after a summer shower, when the sun is low.' },
      { h: 'Make your own' },
      'You can make a rainbow on a sunny day. Fill a clear glass with water and set it on a sunny windowsill, with a sheet of white paper on the floor below. Move the paper until a small spectrum appears. You can also spray a fine mist from a garden hose with your back to the sun.',
      'Every rainbow you see is sunlight showing its hidden colours. If you are lucky, you may spot a second, fainter rainbow outside the first one. Look closely: its colours are in the opposite order.'
    ],
    guide: { before: 'If you have a glass of water or a CD, make a small spectrum on the wall before reading. Teach <b>prism</b> and <b>spectrum</b>. Trace the light through the prism diagram with a finger.',
      after: 'Why do you think rainbows always appear on the side of the sky away from the sun? Plan a test you could do with a hose.' },
    words: [['prism', 'a clear wedge of glass that bends light'], ['spectrum', 'the band of colours that white light spreads into']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Isaac Newton lived long ago.', 'White light holds all the colours, and bending it in a prism or raindrop spreads them out.', 'Rainbows happen in summer.', 'Glass is clear.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which colour bends the most?',
        opts: ['red', 'green', 'violet'], a: 2 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Where should the sun be when you look for a rainbow?',
        opts: ['in front of you', 'behind you', 'right above you'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number the steps to show how a raindrop makes a rainbow.',
        items: ['Sunlight enters the raindrop.', 'The light bends.', 'It bounces off the back of the drop.', 'It bends again as it comes out, and the colours spread.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.3', q: 'Compare a prism and a rainbow.', cols: ['', 'Prism', 'Rainbow'],
        rows: [['What bends the light', 'a wedge of glass', null], ['How many', null, 'millions']],
        a: [[null, null, 'raindrops'], [null, 'one', null]] },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>rain</b>bow is a bow in the rain. Which word is also made of two words?',
        opts: ['sunlight', 'violet', 'prism'], a: 0 },
      { k: 'lines', code: 'C1.2', n: 2, q: 'Why does the text include the part “Make your own”?',
        a: 'So readers can try the science themselves and see how water splits sunlight into colours.', look: 'the purpose of a hands-on section' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'A rainbow appears after a storm in the late afternoon. Use the text to explain why the time of day matters.',
        a: 'In the late afternoon the sun is low, so it can be behind you while the rain is in front of you, which is when you see a rainbow.', look: 'connects the low sun to the position needed to see a rainbow' }
    ]
  });

  P.add({
    id: 'g4-monarchs', subject: 'science', form: 'Report',
    title: 'The Great Monarch Journey',
    deck: 'How a butterfly the weight of a paper clip flies to Mexico',
    hero: {
      photo: 'g4-monarchs.jpg', credit: 'Photo: U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Monarch butterflies rest together in a tree during their fall migration.'
    },
    body: [
      'In late summer, orange and black butterflies gather along the north shore of Lake Erie, at places like Point Pelee. They are monarchs, and they are about to begin one of the longest journeys of any insect. Some will fly more than 4000 kilometres to the mountains of central Mexico.',
      { h: 'One plant, one caterpillar' },
      'A monarch starts life as a tiny egg on a milkweed plant. When the caterpillar hatches, it eats only milkweed leaves. Milkweed contains a poison that does not hurt the caterpillar, but it makes the caterpillar and the butterfly taste bad to birds. After about two weeks, the caterpillar forms a green case called a chrysalis. Inside, its body changes completely. This change is called <b>metamorphosis</b>.',
      { fig: '<circle class="t" cx="150" cy="80" r="56"/>' +
          '<circle class="k" cx="150" cy="22" r="5"/><path class="k" d="M196 70 q8 -10 16 0 q8 10 16 0 q8 -10 16 0" transform="translate(-6 8)"/>' +
          '<path class="k" d="M150 122 q-8 6 -8 16 q0 10 8 14 q8 -4 8 -14 q0 -10 -8 -16 Z"/><path class="k" d="M96 74 q-16 -18 -26 -4 q4 14 26 8 q-20 4 -22 18 q10 8 22 -10 Z M96 76 q16 -18 26 -4 q-4 14 -26 8"/>' +
          D.arrow(176, 30, 200, 52, 'a') + D.arrow(200, 112, 176, 132, 'a') + D.arrow(124, 132, 104, 108, 'a') + D.arrow(104, 50, 124, 28, 'a') +
          '<text class="n" x="162" y="16">egg</text><text class="n" x="248" y="66" text-anchor="end">caterpillar</text><text class="n" x="166" y="150">chrysalis</text><text class="n" x="20" y="116">butterfly</text>',
        tall: 156, cap: 'The life cycle of a monarch butterfly.' },
      { h: 'The super generation' },
      'Most monarchs live only two to six weeks. But the butterflies that hatch at the end of summer are different. They live for up to eight months. These are the ones that fly south. They ride the wind and stop to sip nectar from flowers. In Mexico, millions of them cling together in fir trees and wait out the winter. In spring, they fly north, lay eggs on milkweed and die. Their great-grandchildren return to Canada.',
      { box: 'Did you know?', text: 'No monarch that arrives in Mexico has ever been there before. Scientists are still studying how they find the same forests every year.' },
      'Monarchs are now an <b>endangered</b> species in Canada, because milkweed and wild flowers are disappearing. Planting milkweed in a garden or schoolyard gives them a place to lay their eggs. Scientists also ask volunteers to count monarchs and report what they see, so they can track how the butterflies are doing from year to year.'
    ],
    guide: { before: 'Find southern Ontario and central Mexico on a map and estimate the distance. Teach <b>metamorphosis</b> and <b>endangered</b>. Trace the life cycle diagram in order.',
      after: 'How could your school or family help monarchs? Would you plant milkweed? Where?' },
    words: [['metamorphosis', 'a complete change of body shape as an animal grows'], ['endangered', 'at risk of dying out']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is this text mostly about?',
        opts: ['Point Pelee', 'the life and long migration of monarch butterflies', 'how birds eat insects', 'fir trees in Mexico'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the stages of the life cycle.',
        items: ['egg', 'caterpillar', 'chrysalis', 'butterfly'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do birds avoid eating monarchs?',
        opts: ['Monarchs are too fast.', 'Milkweed makes monarchs taste bad.', 'Monarchs hide in trees.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Compare the two kinds of monarchs.', cols: ['', 'Most monarchs', 'The super generation'],
        rows: [['How long they live', null, null], ['What they do', 'live and lay eggs in summer', null]],
        a: [[null, 'two to six weeks', 'up to eight months'], [null, null, 'fly to Mexico for the winter']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Meta</b>morphosis means a change of shape. Which word means “to change into something else”?',
        opts: ['transform', 'transport', 'translate'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why does the text have a “Did you know?” box?',
        opts: ['to share a surprising extra fact', 'to give the main idea', 'to list the steps'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why are monarchs endangered? What can people do to help? Use the text.',
        a: 'Milkweed and wild flowers are disappearing, so monarchs have fewer places to lay eggs and feed. People can plant milkweed in gardens and schoolyards.', look: 'the cause (loss of milkweed) and a solution from the text' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'The text says the monarch is “the weight of a paper clip.” What does this help you understand about the journey?',
        a: 'It shows how tiny and light the monarch is, so flying 4000 kilometres is amazing.', look: 'links the small weight to how impressive the journey is' }
    ]
  });

  P.add({
    id: 'g4-zebra-mussels', subject: 'science', form: 'Report',
    title: 'Small Shells, Big Trouble',
    deck: 'How a tiny invader changed the Great Lakes',
    hero: {
      photo: 'g4-zebra-mussels.jpg', credit: 'Photo: U.S. Geological Survey, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A zebra mussel up close. Its striped shell is about the size of a fingernail.'
    },
    body: [
      'In 1988, scientists found a strange little shellfish in Lake St. Clair, between Lake Huron and Lake Erie. It had a striped shell, about the size of a fingernail. It was a zebra mussel, and it did not belong there.',
      { h: 'A stowaway' },
      'Zebra mussels come from lakes and rivers near the Black Sea and the Caspian Sea, far away in Europe and Asia. Scientists think they arrived in the water carried by large ships. A ship takes water into tanks to keep it steady, then pumps the water out at its next stop. Baby mussels, too small to see, rode across the ocean in that water.',
      { fig: '<path class="k" d="M20 70 H120 L110 92 H30 Z M60 70 V54 H84 V70"/><rect class="h" x="40" y="76" width="60" height="10"/>' + D.ripple(4, 136, 98) +
          D.arrow(140, 70, 196, 70, 'a') +
          '<path class="k" d="M190 70 H290 L280 92 H200 Z M230 70 V54 H254 V70"/>' + D.ripple(174, 296, 98) + D.arrow(240, 92, 240, 116, 'a') + '<path class="d" d="M232 120 h16"/>' +
          '<text class="n" x="70" y="122" text-anchor="middle">fills its tanks</text><text class="n" x="70" y="134" text-anchor="middle">in Europe</text>' +
          '<text class="n" x="246" y="136" text-anchor="middle">empties them in</text><text class="n" x="246" y="148" text-anchor="middle">the Great Lakes</text>',
        tall: 152, cap: 'Baby mussels can ride across the ocean in a ship’s tanks.' },
      { h: 'Spreading fast' },
      'With no natural enemies in the Great Lakes, zebra mussels spread quickly. One female can release up to a million eggs in a year. The mussels stick to anything hard: rocks, docks, boats and even other animals. They crowd so thickly inside water pipes that towns and power plants have to clean them out at great cost.',
      { h: 'Changing the lake' },
      'Each mussel can <b>filter</b> about a litre of water a day, eating the tiny living things in it. The water becomes clearer, but the fish that eat those tiny living things go hungry. A plant or animal that arrives in a new place and harms it is called an <b>invasive species</b>.',
      { box: 'Clean, drain, dry', text: 'Boaters can stop invaders from spreading. Clean plants and mud off the boat, drain all the water, and let everything dry before going to another lake.' },
      'Once an invasive species is settled, it is almost impossible to remove. The best plan is to stop it from arriving in the first place. Today, ships must change the water in their tanks out at sea, far from shore, before they enter the Great Lakes.'
    ],
    guide: { before: 'Find Lake St. Clair on a map of the Great Lakes. Teach <b>invasive species</b> and <b>stowaway</b>. Follow the ship diagram from left to right.',
      after: 'Clearer water sounds good. Why can it be a problem? What other invasive species have you heard of?' },
    words: [['invasive species', 'a plant or animal that spreads in a new place and harms it'], ['filter', 'to clean a liquid by passing it through something that traps bits']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Zebra mussels have stripes.', 'Zebra mussels arrived by accident and have harmed the Great Lakes.', 'Ships are large.', 'Boaters like to fish.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How did baby mussels cross the ocean?',
        opts: ['by swimming', 'in water inside a ship’s tanks', 'on birds'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>stowaway</b> hides on a ship to travel. Why is the heading “A stowaway”?',
        opts: ['The mussels travelled hidden in a ship.', 'The mussels are pirates.', 'The ship was lost.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['Mussels crowd inside water pipes.', null], ['Mussels filter tiny living things from the water.', null], [null, 'Mussels spread quickly.']],
        a: [[null, 'Towns and power plants must clean them out at great cost.'], [null, 'Fish that eat those tiny things go hungry.'], ['There are no natural enemies, and each female lays many eggs.', null]] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do boaters drain all the water from their boats?',
        opts: ['to make the boat lighter', 'so they do not carry baby mussels to another lake', 'to clean the motor'], a: 1 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why is “invasive species” in bold?',
        opts: ['It is in Words to know.', 'It is the title.', 'It is a name.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The water got clearer. A swimmer and a fish might feel differently about this. Explain both points of view.',
        a: 'A swimmer might like the clear water because it looks clean. A fish might be hungry because the tiny living things it eats are gone.', look: 'two points of view, each with a reason from the text' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'In one or two sentences, what is the best way to deal with invasive species?',
        a: 'Stop them from arriving in the first place, for example by cleaning, draining and drying boats.', look: 'prevention, with a detail from the text' }
    ]
  });

  P.add({
    id: 'g4-bees', subject: 'science', form: 'Report',
    title: 'Busy Bees, Full Plates',
    deck: 'Why so much of our food depends on pollinators',
    hero: {
      photo: 'g4-bumblebee.jpg', credit: 'Photo: Marco Nürnberger, CC BY 2.0, Wikimedia Commons', focus: '50% 45%',
      tall: 190,
      cap: 'A bumblebee covered in yellow pollen collects food from a flower.'
    },
    body: [
      'Think about your favourite fruits and vegetables: apples, blueberries, pumpkins, tomatoes. Most of them would not exist without a small, buzzing helper. About one out of every three bites of food we eat depends on animals called <b>pollinators</b>, and the most important pollinators are bees.',
      { h: 'Moving pollen' },
      'Before a plant can make fruit and seeds, a yellow powder called <b>pollen</b> must move from one flower to another of the same kind. Plants cannot walk, so they need help. Flowers offer sweet nectar to bees. While a bee drinks, pollen sticks to the hairs on its body. When the bee visits the next flower, some of that pollen rubs off. Now the flower can make seeds, and a fruit grows around them.',
      { fig: '<path class="k" d="M150 140 V70"/><path class="k" d="M150 70 Q110 66 96 34 Q130 40 150 70 Q190 66 204 34 Q170 40 150 70"/>' +
          '<path class="a" d="M140 64 V36 M160 64 V36"/><circle class="ac" cx="140" cy="34" r="3"/><circle class="ac" cx="160" cy="34" r="3"/><path class="k" d="M150 66 V26"/><circle class="k" cx="150" cy="24" r="4"/>' +
          '<ellipse class="k" cx="60" cy="40" rx="18" ry="11"/><path class="t" d="M54 30 v20 M62 30 v20"/><path class="k" d="M48 34 q-6 -14 6 -14 M66 32 q4 -14 12 -8"/>' +
          D.arrow(80, 40, 128, 32, 'd') +
          D.label(196, 100, 'pollen', 162, 36) + D.label(176, 12, 'where pollen lands', 154, 22) + D.label(10, 86, 'bee carries pollen', 58, 52),
        tall: 148, cap: 'A bee carries pollen from flower to flower.' },
      { h: 'Bumblebees are special' },
      'Bumblebees have a special trick. On some plants, such as tomatoes and blueberries, the pollen is locked inside. A bumblebee grabs the flower and buzzes its flight muscles very fast. The shaking shakes the pollen loose. Honeybees cannot do this.',
      { box: 'Did you know?', text: 'Canada has more than 800 kinds of wild bees. Most of them live alone, not in hives, and many nest in tiny holes in the ground.' },
      { h: 'Helping the helpers' },
      'Many bees are in trouble, because they are losing the wild flowers they need, and some sprays used on crops can harm them. You can help by planting flowers that bloom from spring to fall, leaving a patch of bare ground for ground-nesting bees, and never swatting a bee that is busy working. Most bees only sting if they are squeezed or their nest is attacked. If you stay calm and still, a bee will usually fly away on its own.'
    ],
    guide: { before: 'Look at a flower together and find the yellow pollen. Teach <b>pollen</b> and <b>pollinator</b>. Trace the bee’s path in the diagram.',
      after: 'Which foods in your kitchen might need bees? What could your family or class plant to help them?' },
    words: [['pollinators', 'animals that carry pollen from flower to flower'], ['pollen', 'a yellow powder made by flowers']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Bumblebees buzz.', 'Bees carry pollen that plants need to make much of our food.', 'Canada has many bees.', 'Tomatoes are red.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in order.',
        items: ['A bee drinks nectar from a flower.', 'Pollen sticks to its hairs.', 'The bee visits the next flower.', 'Pollen rubs off, and the flower can make seeds.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what does the dotted arrow show?',
        opts: ['the bee carrying pollen to the flower', 'the wind', 'rain falling'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do flowers make sweet nectar?',
        opts: ['to attract bees that carry their pollen', 'to feed people', 'to stay warm'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>-or</b> mean in <b>pollinator</b>, <b>actor</b> and <b>visitor</b>?',
        opts: ['a person or thing that does something', 'more than one', 'in the past'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'List three ways to help bees.', cols: ['Way to help', 'How it helps'],
        rows: [['plant flowers that bloom from spring to fall', null], ['leave a patch of bare ground', null], [null, 'the bee can keep working']],
        a: [[null, 'bees have food all season'], [null, 'ground-nesting bees have a place to nest'], ['never swat a busy bee', null]] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What makes bumblebees special? Use details from the text.',
        a: 'They can buzz their flight muscles to shake loose pollen that is locked inside flowers like tomatoes and blueberries. Honeybees cannot do this.', look: 'buzz pollination explained with an example' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'What might happen to our food if there were far fewer bees?',
        a: 'Many fruits and vegetables would not get pollinated, so there would be less food, and it would cost more.', look: 'an inference linking fewer bees to less food' }
    ]
  });

  P.add({
    id: 'g4-sudbury', subject: 'science', form: 'Report',
    title: 'Treasure from the Sky',
    deck: 'How a giant crash long ago made Sudbury a mining city',
    hero: {
      photo: 'g4-big-nickel.jpg', credit: 'Photo: Jason Zhang, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'The Big Nickel in Sudbury, Ontario, is a giant copy of a Canadian five-cent coin. It is about 9 metres tall.'
    },
    body: [
      'About 1.8 billion years ago, a rock from space, several kilometres wide, slammed into the land where Sudbury, Ontario, is today. The crash was so powerful that it melted rock deep under the ground and left a huge oval hollow called a basin. Over time, the melted rock cooled and hardened. It left behind something very valuable: <b>minerals</b> full of metal.',
      { h: 'Rocks and minerals' },
      'Minerals are the natural building blocks of rocks. Some minerals contain metals such as nickel, copper, gold and silver. When there is enough metal in a rock to be worth digging up, the rock is called <b>ore</b>. The Sudbury Basin holds some of the richest nickel ore in the world.',
      { fig: '<path class="k" d="M10 40 H290"/><path class="h" d="M60 40 Q150 140 240 40"/><path class="t" d="M80 40 Q150 120 220 40"/>' +
          '<path class="k" d="M150 40 V12 M140 12 H160"/><path class="d" d="M150 40 V100"/><rect class="k" x="144" y="100" width="12" height="10"/>' +
          D.label(196, 128, 'ore with nickel and copper', 200, 70) + D.label(4, 70, 'the basin', 72, 52) + D.label(170, 20, 'mine shaft', 152, 30),
        tall: 140, cap: 'A side view of the Sudbury Basin. Miners dig deep shafts to reach the ore.' },
      { h: 'Digging deep' },
      'Miners in Sudbury travel down shafts more than two kilometres deep to reach the ore. The rock is blasted, crushed and melted to separate the metal. Nickel is used to make stainless steel for things like spoons, sinks and parts for cars. It is also in the batteries of many electric cars.',
      { box: 'Did you know?', text: 'The Canadian nickel, our five-cent coin, was once made mostly of nickel. Today, it is made mostly of steel with a thin coating of nickel.' },
      { h: 'Healing the land' },
      'For many years, smoke from the smelters, the factories that melt the ore, killed the trees and plants around Sudbury. The hills were bare and black. Since the 1970s, people have worked to bring the land back to life. Volunteers, including thousands of students, have planted millions of trees. Today, green forests are growing again where the land was once bare.',
      { h: 'A school for astronauts' },
      'In 1971 and 1972, astronauts training to walk on the moon came to Sudbury. Geologists showed them rocks shattered by the ancient crash. On the moon, which is covered in craters, the astronauts used what they had learned to choose the most interesting rocks to bring home.'
    ],
    guide: { before: 'Find Sudbury on a map of Ontario. Teach <b>mineral</b> and <b>ore</b>. Look at a coin together and talk about what metals might be inside it.',
      after: 'Mining gives us useful metals but can harm the land. How did Sudbury try to fix the harm? What else could a mining town do?' },
    words: [['minerals', 'natural solids that make up rocks'], ['ore', 'rock with enough metal in it to be worth mining']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Big Nickel is tall.', 'A crash from space left rich ore, and Sudbury became a mining city that is now healing its land.', 'Nickel is in coins.', 'Students plant trees.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['A rock from space hits the land.', 'Melted rock cools and hardens into ore.', 'Miners dig the ore.', 'People plant millions of trees.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is the ore?',
        opts: ['deep in the basin', 'at the top of the shaft', 'in the sky'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['A space rock melts rock deep underground.', null], ['Smoke comes from the smelters.', null], [null, 'Forests grow again.']],
        a: [[null, 'Minerals full of metal form.'], [null, 'Trees and plants die, and the hills are bare.'], ['Volunteers plant millions of trees.', null]] },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>smelter</b> smelts ore. What does <b>-er</b> mean in smelter?',
        opts: ['a thing that does a job', 'more', 'in the past'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is the giant coin in Sudbury a nickel?',
        opts: ['Sudbury is famous for nickel mining.', 'Nickels are the biggest coins.', 'It was cheap to build.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the text in two or three sentences.',
        a: 'A rock from space crashed near Sudbury long ago and left ore rich in nickel. Miners dig it up to make useful things, and people are now planting trees to heal the land.', look: 'the main events and the idea of healing the land' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'A miner and a person who loves forests might feel differently about mining. Explain both points of view.',
        a: 'The miner might be proud of the useful metals and good jobs. The forest lover might worry about the smoke that killed the trees.', look: 'two points of view, each with a reason from the text' }
    ]
  });

  P.add({
    id: 'g4-great-wall', subject: 'history', form: 'Report',
    title: 'The Wall That Took Centuries',
    deck: 'How ancient China built the longest structure on Earth',
    hero: {
      photo: 'g4-great-wall.jpg', credit: 'Photo: CEphoto, Uwe Aranas, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The Great Wall at Badaling, near Beijing, winds along the tops of the mountains.'
    },
    body: [
      'The Great Wall of China is not one wall. It is many walls, built and rebuilt over about 2000 years. Put together, all its pieces stretch more than 20 000 kilometres, about the distance from Canada to Australia and halfway back. It is the longest structure people have ever built.',
      { h: 'Why build a wall?' },
      'Long ago, China was made up of separate states, and many had their own walls. In 221 BCE, a ruler named Qin Shi Huang united the states into one <b>empire</b>. He ordered workers to join some of the walls together to protect the north from attacks by horse riders. Later rulers kept building, repairing and adding to the wall for centuries.',
      { h: 'How it was built' },
      'Workers used whatever was close by. In the dry west, they pounded layers of earth until they were as hard as stone. In the mountains, they cut blocks of stone. Later walls were made of bricks held together with a mortar that, some scientists believe, contained sticky rice. Huge numbers of soldiers, farmers and prisoners did the heavy work, and the work was dangerous.',
      { fig: '<path class="k" d="M30 140 V60 H110 V140 M30 60 V48 H40 V60 M52 60 V48 H62 V60 M74 60 V48 H84 V60 M96 60 V48 H106 V60"/><path class="h" d="M30 100 H110 V140 H30 Z"/>' +
          '<path class="k" d="M180 140 V40 H260 V140 M196 40 V20 H244 V40 M214 140 V112 H226 V140"/><path class="t" d="M196 70 H206 V82 H196 Z M234 70 H244 V82 H234 Z"/><path class="d" d="M220 20 V4"/>' +
          D.label(120, 120, 'pounded earth', 108, 116) + D.label(130, 56, 'battlements', 100, 52) + D.label(130, 86, 'walkway', 100, 62) +
          '<text class="lb" x="70" y="158" text-anchor="middle">the wall</text><text class="lb" x="220" y="158" text-anchor="middle">a watchtower</text>',
        tall: 162, cap: 'Parts of the wall. Soldiers walked along the top and kept watch from the towers.' },
      { h: 'Messages of smoke' },
      'Along the wall stood thousands of watchtowers. When soldiers saw enemies coming, they lit fires on the towers. By day, the smoke could be seen from far away. By night, the flames could. Each tower passed the <b>signal</b> to the next, so a warning could travel hundreds of kilometres in a few hours.',
      { box: 'Did you know?', text: 'Many people believe you can see the Great Wall from space with your eyes alone. Astronauts say you cannot. It is very long, but it is too narrow.' },
      'Today, the Great Wall is a World Heritage Site, protected so that people can visit and learn from it for centuries to come.'
    ],
    guide: { before: 'Find China on a globe and point out how far it is from Canada. Teach <b>empire</b> and <b>signal</b>. Explain that BCE means years before the year 1.',
      after: 'The wall took huge effort and many lives to build. Do you think it was worth it? What other ways could people have kept their land safe?' },
    words: [['empire', 'a large area ruled by one ruler'], ['signal', 'a sign or message sent to warn or tell others something']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['China is far away.', 'The Great Wall was built over many centuries to protect China and is the longest structure ever built.', 'Astronauts visit China.', 'Rice is sticky.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the top of the wall used for?',
        opts: ['a walkway for soldiers', 'growing food', 'storing rice'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did workers use different materials in different places?',
        opts: ['They used whatever was close by.', 'They liked variety.', 'The emperor chose randomly.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps to show how a warning travelled along the wall.',
        items: ['Soldiers see enemies coming.', 'They light a fire on their tower.', 'The next tower sees the smoke or flames.', 'That tower lights its own fire.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Where', 'What the wall was made of'],
        rows: [['the dry west', null], ['the mountains', null], ['later walls', null]],
        a: [[null, 'pounded earth'], [null, 'blocks of stone'], [null, 'bricks and mortar']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Watch</b>tower is made of two words. What does it mean?',
        opts: ['a tower for keeping watch', 'a tower with a clock', 'a small tower'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'The text says 20 000 kilometres is “the distance from Canada to Australia and halfway back.” How does this comparison help you?',
        a: 'It helps me picture how long the wall is, because 20 000 kilometres is too big to imagine.', look: 'explains that the comparison makes a huge number easier to picture' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think the Great Wall is protected as a World Heritage Site today?',
        a: 'Because it is very old and important to history, and people want to keep it safe so others can visit and learn from it.', look: 'a reason linked to history and learning' }
    ]
  });

  P.add({
    id: 'g4-maya', subject: 'history', form: 'Report',
    title: 'Stairs to the Sky',
    deck: 'The Maya, their pyramid calendar, and a number for nothing',
    hero: {
      photo: 'g4-chichen-itza.jpg', credit: 'Photo: Daniel Schwen, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 60%',
      tall: 200,
      cap: 'El Castillo, a pyramid in the ancient Maya city of Chichén Itzá, in Mexico.'
    },
    body: [
      'Deep in the forests of southern Mexico and Central America, stone pyramids rise above the trees. They were built by the Maya, a people who have lived in this region for thousands of years. Their great cities were busiest from about 250 to 900 CE, and millions of Maya people still live there today.',
      { h: 'A pyramid that keeps time' },
      'One of the most famous Maya pyramids is El Castillo in the city of Chichén Itzá. It has four sides, and each side has a staircase of 91 steps. Add the four staircases together and include the platform on top, and you get 365, the number of days in a year. The pyramid was built as a temple, and its design is a kind of <b>calendar</b>.',
      { h: 'The serpent of light' },
      'Twice a year, in March and September, day and night are almost the same length. On these days, as the sun sets, the shadows of the pyramid’s steps make a wavy pattern of light down the side of the northern staircase. It looks like a giant snake slithering down to the stone snake head at the bottom.',
      { fig: '<circle class="dot" cx="20" cy="30" r="5"/><circle class="dot" cx="40" cy="30" r="5"/><circle class="dot" cx="60" cy="30" r="5"/>' +
          '<rect class="k" x="100" y="42" width="40" height="8" rx="3"/><circle class="dot" cx="112" cy="30" r="5"/><circle class="dot" cx="128" cy="30" r="5"/>' +
          '<rect class="k" x="180" y="22" width="40" height="8" rx="3"/><rect class="k" x="180" y="36" width="40" height="8" rx="3"/><circle class="dot" cx="200" cy="12" r="5"/>' +
          '<ellipse class="k" cx="262" cy="34" rx="22" ry="12"/><path class="t" d="M246 34 Q262 26 278 34 M246 38 Q262 30 278 38"/>' +
          '<text class="lb" x="40" y="74" text-anchor="middle">3</text><text class="lb" x="120" y="74" text-anchor="middle">7</text><text class="lb" x="200" y="74" text-anchor="middle">11</text><text class="lb" x="262" y="74" text-anchor="middle">0</text>' +
          '<text class="n" x="150" y="100" text-anchor="middle">A dot means 1. A bar means 5. A shell means zero.</text>',
        tall: 108, cap: 'Maya numbers were written with dots, bars and a shell.' },
      { h: 'Counting with zero' },
      'The Maya were skilled astronomers and mathematicians. They wrote numbers with dots for ones and bars for fives. They also had a symbol for <b>zero</b>, shaped like a shell. Using zero, they could write very large numbers and track the movements of the sun, the moon and the planet Venus over hundreds of years. Very few early peoples used zero.',
      { box: 'Did you know?', text: 'The Maya made a drink from the seeds of the cacao tree. Cacao is what chocolate is made from.' },
      { h: 'Farmers and players' },
      'Most Maya were farmers who grew corn, beans, squash and chili peppers. Corn was so important that an old Maya story says the first people were made from corn dough. Many cities also had a stone court for a ball game. Players kept a heavy rubber ball in the air using only their hips, knees and elbows. Chichén Itzá has one of the largest ball courts ever built.'
    ],
    guide: { before: 'Find Mexico and Central America on a map. Teach <b>calendar</b> and <b>astronomer</b>. Practise writing a few numbers with dots and bars before reading.',
      after: 'Why would a calendar be important to farmers? How do you keep track of the days of the year?' },
    words: [['calendar', 'a way of keeping track of days, months and years'], ['zero', 'the number that stands for nothing']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Maya drank cacao.', 'The ancient Maya were skilled builders, astronomers and mathematicians.', 'Pyramids have stairs.', 'Snakes live in Mexico.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How would the Maya write 6?',
        opts: ['one bar and one dot', 'six bars', 'one shell'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How is El Castillo like a calendar?',
        opts: ['Its steps add up to 365, the days in a year.', 'It has pictures of months.', 'It is very old.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Show how the steps add up to 365.', cols: ['Part', 'Number of steps'],
        rows: [['one staircase', '91'], ['four staircases', null], ['the platform on top', null], ['total', '365']],
        a: [[null, null], [null, '364'], [null, '1'], [null, null]] },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which heading tells you about the shadow snake?',
        opts: ['The serpent of light', 'Counting with zero', 'A pyramid that keeps time'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>astro</b>nomer studies stars. Which word with <b>astro-</b> names someone who travels to space?',
        opts: ['astronaut', 'asteroid', 'disaster'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why was having a zero so useful to the Maya? Use the text.',
        a: 'With zero they could write very large numbers, which helped them track the sun, the moon and Venus over hundreds of years.', look: 'large numbers and long-term tracking of the sky' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'The text says millions of Maya people still live there today. Why might the writer include this?',
        a: 'To show that the Maya are not only a people of the past. Their culture continues today.', look: 'recognizes the writer is showing the Maya as a living people' }
    ]
  });

  P.add({
    id: 'g4-norse', subject: 'history', form: 'Report',
    title: 'Visitors from the Sea',
    deck: 'The Norse settlement at L’Anse aux Meadows, a thousand years ago',
    hero: {
      photo: 'g4-norse-sculpture.jpg', credit: 'Photo: Gordon Leggett, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'A metal sculpture of Norse travellers stands on a hill above L’Anse aux Meadows, Newfoundland and Labrador.'
    },
    body: [
      'About a thousand years ago, wooden ships with square sails crossed the cold North Atlantic Ocean. On board were Norse people from Greenland and Iceland. They landed on the northern tip of Newfoundland and built a small <b>settlement</b>. It was almost 500 years before Columbus sailed.',
      { h: 'Found by chance' },
      'For centuries, the Norse sagas, old stories told aloud and later written down, described a land to the west called Vinland. Many people thought the stories were only legends. Then, in 1960, explorers Helge Ingstad and Anne Stine Ingstad followed a local man to a set of grassy bumps near the village of L’Anse aux Meadows. When they dug, they found the remains of Norse buildings.',
      { h: 'Life at the settlement' },
      '<b>Archaeologists</b> found eight buildings with thick walls made of strips of grass and earth, called sod, over a wooden frame. Sod kept the buildings warm in the wind. Inside were fire pits, a workshop for making iron nails, and places to repair ships. They also found a bronze pin for fastening a cloak and a spindle whorl, a stone weight used to spin wool into yarn.',
      { fig: '<path class="k" d="M20 120 Q20 60 150 56 Q280 60 280 120 Z"/><path class="h" d="M30 120 Q30 72 150 68 Q270 72 270 120"/><rect class="k" x="138" y="96" width="24" height="24"/><path class="d" d="M150 56 V36"/>' +
          D.label(196, 30, 'smoke hole', 152, 46) + D.label(10, 30, 'thick sod walls and roof', 60, 80) + D.label(170, 140, 'door', 152, 110),
        tall: 146, cap: 'A Norse sod house. Rebuilt houses at the site show how they looked.' },
      { h: 'A short stay' },
      'The Norse did not stay long, perhaps only a few years. The settlement was very far from home, and there were not many of them. The sagas also tell of meetings with the people who already lived in the land, which sometimes led to conflict. Scientists studying tree rings in wood cut by the Norse have shown that they were there in the year 1021.',
      { box: 'Did you know?', text: 'L’Anse aux Meadows was one of the first places in the world to be named a World Heritage Site, in 1978. It is the only known Norse site in North America.' },
      'Today, visitors can walk through rebuilt sod houses and imagine life at the edge of the known world.'
    ],
    guide: { before: 'Find Greenland, Iceland and Newfoundland on a map, and trace the route across the ocean. Teach <b>archaeologist</b> and <b>settlement</b>. Explain that a saga is a long story from long ago.',
      after: 'How do archaeologists learn about people who lived long ago? Which clue from the site do you find most interesting, and why?' },
    words: [['settlement', 'a place where people build homes to live'], ['archaeologists', 'scientists who dig up and study things left by people long ago']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Columbus sailed in 1492.', 'The Norse built a settlement in Newfoundland about a thousand years ago, and its remains were found in 1960.', 'Sod keeps houses warm.', 'Sagas are long stories.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['The Norse sail to Newfoundland.', 'Sagas tell of a land called Vinland.', 'The Ingstads find the remains.', 'The site becomes a World Heritage Site.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the house made of?',
        opts: ['stone blocks', 'thick sod over a frame', 'bricks'], a: 1 },
      { k: 'table', code: 'C3.2', q: 'Each object tells us something. Fill in the chart.', cols: ['Object found', 'What it tells us'],
        rows: [['a workshop for iron nails', null], ['a spindle whorl', null], ['places to repair ships', null]],
        a: [[null, 'They made iron nails, maybe for ships or buildings.'], [null, 'Someone spun wool into yarn.'], [null, 'They fixed their ships to sail home.']] },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did the Norse not stay long?',
        opts: ['It was far from home and there were few of them.', 'They did not like the weather.', 'Their ships sank.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Re</b>built houses show how they looked. What does <b>rebuilt</b> mean?',
        opts: ['built again', 'never built', 'built badly'], a: 0 },
      { k: 'lines', code: 'C1.2', n: 2, q: 'How is a saga different from a report like this one?',
        a: 'A saga is an old story told aloud and later written down, and it may include legend. A report gives facts that people have checked.', look: 'a clear difference in form and purpose' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The text mentions “the people who already lived in the land.” Whose point of view is missing from the sagas? Why does that matter?',
        a: 'The point of view of the Indigenous people who lived there is missing. The sagas only tell the Norse side, so we do not know how the meetings felt to them.', look: 'identifies the Indigenous perspective as missing and explains why it matters' }
    ]
  });

  P.add({
    id: 'g4-birchbark-canoe', subject: 'social', form: 'Explanation',
    title: 'Made from the Forest',
    deck: 'How First Nations builders make a birchbark canoe',
    hero: {
      photo: 'g4-birchbark-canoe.jpg', credit: 'Photo: Thomas Quine, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The bow, or front end, of a birchbark canoe, sewn with spruce root and sealed with gum.'
    },
    body: [
      'For thousands of years, First Nations such as the Anishinaabe, the Mi’kmaq and the Wolastoqiyik travelled the lakes and rivers of eastern Canada in canoes made of birchbark. These canoes were light, fast and strong, and every part came from the forest.',
      { h: 'Gifts of the trees' },
      'The skin of the canoe is bark from the paper birch tree. In early summer, the bark peels off in large, smooth sheets without killing the tree. The bark is waterproof and bends without cracking. Long, thin strips of white cedar make the ribs and the frame. Roots of the black spruce are split into strong cords, called <b>watap</b>, to sew the pieces together. Finally, the seams are sealed with gum from spruce or pine trees, mixed with fat and charcoal, so no water can leak in.',
      { fig: '<path class="k" d="M10 60 Q150 110 290 60 Q150 86 10 60 Z"/><path class="k" d="M10 60 Q4 44 16 40 M290 60 Q296 44 284 40"/>' +
          '<path class="t" d="M60 70 Q64 84 66 92 M100 76 Q104 92 104 100 M150 80 V104 M200 76 Q196 92 196 100 M240 70 Q236 84 234 92"/><path class="a" d="M150 64 Q150 74 150 80"/>' +
          D.label(60, 136, 'cedar ribs', 104, 98) + D.label(186, 136, 'birchbark skin', 200, 92) + D.label(10, 22, 'sewn with spruce root', 16, 42) + D.label(196, 22, 'seams sealed with gum', 284, 46),
        tall: 146, cap: 'Parts of a birchbark canoe.' },
      { h: 'Built for portages' },
      'A birchbark canoe could carry a family and their belongings, yet it was light enough for one or two people to carry on their shoulders. That mattered, because travellers often had to <b>portage</b>, carrying their canoes over land around rapids and waterfalls or from one lake to the next. Later, the fur traders learned to build and use these canoes too.',
      { box: 'Did you know?', text: 'Some Anishinaabe builders still make birchbark canoes today. They teach young people the skills, so the knowledge is passed on to the next generation.' },
      'Building a canoe can take a skilled builder many weeks. The bark and the cedar are soaked or splashed with hot water so they bend without breaking. The canoe is shaped on the ground inside a row of wooden stakes before the ribs are pushed into place.',
      'A birchbark canoe shows deep knowledge of the land: which trees to use, when to gather them, and how to shape them into something that can carry people safely across the water.'
    ],
    guide: { before: 'Look at the photo closely and find the stitches. Teach <b>portage</b> and <b>watap</b>. Talk about how people travelled before roads.',
      after: 'Why do you think it is important for builders to teach young people these skills today? What skill would you like to learn from an elder?' },
    words: [['watap', 'cords made from split spruce roots, used for sewing'], ['portage', 'carrying a canoe over land between waters']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Birch trees are white.', 'First Nations builders make strong, light canoes entirely from forest materials.', 'Fur traders used canoes.', 'Rapids are dangerous.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Part of the canoe', 'Made from'],
        rows: [['the skin', null], ['the ribs and frame', null], ['the cords for sewing', null], ['the seal on the seams', null]],
        a: [[null, 'birchbark'], [null, 'white cedar'], [null, 'black spruce roots (watap)'], [null, 'spruce or pine gum mixed with fat and charcoal']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where are the cedar ribs?',
        opts: ['inside the canoe', 'on the outside', 'at the ends only'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why was it important that the canoe was light?',
        opts: ['It had to be carried over portages.', 'It went faster in the wind.', 'It floated higher.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Water</b>proof means water cannot get through. What does <b>sound</b>proof mean?',
        opts: ['sound cannot get through', 'very loud', 'makes music'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'This text explains how something is made. Which word best names this kind of text?',
        opts: ['explanation', 'poem', 'diary'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The last paragraph says the canoe shows “deep knowledge of the land.” Give two examples of this knowledge from the text.',
        a: 'Builders know to peel birchbark in early summer without killing the tree, and that spruce roots make strong cords for sewing.', look: 'two specific examples from the text' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'Why do you think the writer included the “Did you know?” box?',
        a: 'To show that the tradition is still alive today and that First Nations builders are passing it on.', look: 'recognizes the writer is showing a living tradition' }
    ]
  });

  P.add({
    id: 'g4-iqaluit', subject: 'geography', form: 'Report',
    title: 'A Capital in the Arctic',
    deck: 'Life in Iqaluit, the capital city of Nunavut',
    hero: {
      photo: 'g4-iqaluit.jpg', credit: 'Photo: Quintin Soloviev, CC BY 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'Iqaluit, Nunavut, on the shore of Frobisher Bay. Many buildings stand on posts above the frozen ground.'
    },
    body: [
      'Iqaluit is the capital city of Nunavut, Canada’s newest territory. It sits on Baffin Island, at the end of a long bay. About 7400 people live there, and most of them are Inuit. In Inuktitut, the name Iqaluit means “place of many fish.”',
      { h: 'No road in' },
      'You cannot drive to Iqaluit from the rest of Canada. There are no roads that connect it to any other city. People arrive by plane. Most food, fuel, cars and building supplies come once a year by ship, during the few summer months when the sea ice melts. This is called the <b>sealift</b>. Because everything must be flown or shipped in, food in Iqaluit costs much more than in the south.',
      { h: 'Building on frozen ground' },
      'Just below the surface, the ground in Iqaluit stays frozen all year. This frozen ground is called <b>permafrost</b>. If a warm building sat right on top of it, the heat would melt the ice in the ground, and the building would sink and tilt. So many buildings stand on posts, with cold air flowing underneath.',
      { fig: '<path class="k" d="M10 130 H290"/>' +
          '<rect class="h" x="40" y="25" width="30" height="105"/><rect class="k" x="76" y="55" width="30" height="75"/>' +
          '<rect class="h" x="170" y="110" width="30" height="20"/><rect class="k" x="206" y="85" width="30" height="45"/>' +
          '<text class="n" x="55" y="20" text-anchor="middle">21 h</text><text class="n" x="91" y="50" text-anchor="middle">15 h</text><text class="n" x="185" y="105" text-anchor="middle">4 h</text><text class="n" x="221" y="80" text-anchor="middle">9 h</text>' +
          '<text class="lb" x="73" y="148" text-anchor="middle">June</text><text class="lb" x="203" y="148" text-anchor="middle">December</text>' +
          '<rect class="h" x="200" y="14" width="10" height="10"/><text class="n" x="216" y="23">Iqaluit</text><rect class="k" x="200" y="32" width="10" height="10"/><text class="n" x="216" y="41">Toronto</text>',
        tall: 154, cap: 'Hours of daylight on the longest and shortest days of the year.' },
      { h: 'Light and dark' },
      'Iqaluit is far north, so daylight changes a lot through the year. In June, the sun shines for about 21 hours a day, and it never gets fully dark. In December, there are only about 4 hours of daylight. People enjoy the long summer days for boating, fishing and camping on the land.',
      { box: 'Did you know?', text: 'Nunavut became a territory on April 1, 1999. Its name means “our land” in Inuktitut, one of its official languages.' },
      { h: 'Food from the land' },
      'Many families hunt seals and caribou and fish for Arctic char, as Inuit have done for thousands of years. This food is called country food. It is healthy, it costs less than food shipped from the south, and sharing it with family and neighbours is an important part of Inuit life.'
    ],
    guide: { before: 'Find Iqaluit, Baffin Island and Toronto on a map of Canada. Teach <b>permafrost</b> and <b>sealift</b>. Show how to read the two pairs of bars on the chart.',
      after: 'What would you like and dislike about living with 21 hours of daylight in summer and 4 in winter? How would your day change?' },
    words: [['permafrost', 'ground that stays frozen all year'], ['sealift', 'the yearly delivery of supplies by ship']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Iqaluit means “place of many fish.”', 'Iqaluit is an Arctic capital where the cold, the distance and the light shape daily life.', 'Food is expensive.', 'Ships arrive in summer.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. How many hours of daylight does Iqaluit have in December?',
        opts: ['about 4', 'about 9', 'about 21'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Which city has more daylight in June?',
        opts: ['Iqaluit', 'Toronto', 'They are the same.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['There are no roads to Iqaluit.', null], ['A warm building sits on permafrost.', null], [null, 'Food costs much more than in the south.']],
        a: [[null, 'People arrive by plane, and supplies come by ship.'], [null, 'The ground melts, and the building sinks and tilts.'], ['Everything must be flown or shipped in.', null]] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Perma</b>frost stays frozen. What does <b>perma-</b> (as in permanent) mean?',
        opts: ['lasting', 'melting', 'thin'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the sealift happen only in summer?',
        opts: ['The sea ice melts then.', 'Ships are on holiday.', 'People are home.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do buildings on posts stay steady on permafrost? Use the text.',
        a: 'Cold air flows under the building, so its heat does not melt the frozen ground, and the building does not sink or tilt.', look: 'cold air underneath keeps the permafrost frozen' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'The text says people enjoy summer “on the land.” Predict two things a family might do on a summer weekend in Iqaluit.',
        a: 'They might go boating and fishing, or camp out on the land in the long daylight.', look: 'two predictions supported by the text' }
    ]
  });

  P.add({
    id: 'g4-hand-washing', subject: 'health', form: 'Procedure',
    title: 'Twenty Seconds of Soap',
    deck: 'Why washing your hands works, and how to do it well',
    hero: {
      photo: 'g4-hand-washing.jpg', credit: 'Photo: Beat Ruest, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Soap and running water wash germs off your hands.'
    },
    body: [
      'Your hands touch hundreds of things every day: doorknobs, desks, pencils, phones and your own face. Each touch can pick up <b>germs</b>, tiny living things too small to see. Most germs are harmless, but some can make you sick with colds, the flu or an upset stomach.',
      { h: 'How soap works' },
      'Water alone rinses off dirt, but many germs stick to the oils on your skin. Soap is special. One end of each soap <b>particle</b> grabs onto oil and grease, and the other end grabs onto water. When you scrub, the soap pulls the oil, and the germs stuck in it, off your skin. Then the water carries them down the drain. Some germs are even broken apart by soap.',
      { h: 'Five steps' },
      'Wet your hands with clean water. Add soap. Scrub every part for at least 20 seconds: palms, backs, between your fingers, under your nails and your thumbs. Rinse well under running water. Dry your hands with a clean towel or let them air dry.',
      { fig: [['wet', 0], ['soap', 1], ['scrub 20 s', 2], ['rinse', 3], ['dry', 4]].map(function (s) { var x = 10 + s[1] * 58;
          return '<rect class="k" x="' + x + '" y="20" width="48" height="48" rx="8"/><text class="lb" x="' + (x + 24) + '" y="49" text-anchor="middle">' + (s[1] + 1) + '</text><text class="n" x="' + (x + 24) + '" y="86" text-anchor="middle">' + s[0] + '</text>'; }).join('') +
          D.arrow(58, 44, 68, 44, 'a') + D.arrow(116, 44, 126, 44, 'a') + D.arrow(174, 44, 184, 44, 'a') + D.arrow(232, 44, 242, 44, 'a'),
        tall: 96, cap: 'The five steps of hand washing.' },
      { box: 'Timer trick', text: 'Twenty seconds is longer than most people think. Hum “Happy Birthday” from beginning to end twice, and you are done.' },
      { h: 'When to wash' },
      'Wash your hands before you eat or help cook, after you use the washroom, after you blow your nose, cough or sneeze, after you play outside and after you touch animals. When soap and water are not nearby, hand sanitizer is a good backup, but washing is best when your hands are dirty.',
      'Clean hands are one of the simplest ways to keep yourself, your family and your classmates healthy. It costs almost nothing and takes only twenty seconds.',
      { box: 'From the past', text: 'In the 1840s, a doctor named Ignaz Semmelweis noticed that fewer patients got sick when doctors washed their hands. At first, many doctors did not believe him. Today, hand washing is one of the first rules in every hospital.' }
    ],
    guide: { before: 'Ask the child how long they usually wash their hands, then time it. Teach <b>germs</b> and <b>particle</b>. If you can, rub a little cooking oil on your hands and try washing it off with water alone, then with soap.',
      after: 'Make a short poster for your washroom showing the five steps. What would make people more likely to follow them?' },
    words: [['germs', 'tiny living things that can make you sick'], ['particle', 'a very small piece of something']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Germs are tiny.', 'Washing with soap for 20 seconds removes germs and keeps people healthy.', 'Sanitizer is a backup.', 'Hands touch many things.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in order.',
        items: ['Wet your hands.', 'Add soap.', 'Scrub for 20 seconds.', 'Rinse, then dry.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is water alone not enough?',
        opts: ['Many germs stick to the oils on your skin.', 'Water is too cold.', 'Water makes germs grow.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'List four times to wash your hands.', cols: ['When', 'Why'],
        rows: [['before you eat', null], ['after the washroom', null], [null, 'germs from your nose may be on your hands'], [null, 'animals can carry germs']],
        a: [[null, 'germs on your hands could get into your mouth'], [null, 'germs from the washroom could spread'], ['after you blow your nose, cough or sneeze', null], ['after you touch animals', null]] },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which part of the text is a procedure?',
        opts: ['Five steps', 'How soap works', 'the title'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Harm</b>less means without harm. What does <b>-less</b> mean?',
        opts: ['without', 'full of', 'again'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how soap removes germs. Use the text.',
        a: 'One end of the soap grabs oil and the other end grabs water. Scrubbing pulls the oil and the germs in it off your skin, and the water washes them away.', look: 'both ends of the soap particle and the rinse' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The last sentence says hand washing “costs almost nothing.” Why do you think the writer ends this way?',
        a: 'To convince readers that washing hands is easy and worth doing, because it is cheap and quick but keeps people healthy.', look: 'the writer’s purpose: to persuade readers it is easy and worthwhile' }
    ]
  });

  P.add({
    id: 'g4-shadow-puppets', subject: 'arts', form: 'Explanation',
    title: 'Stories in Shadow',
    deck: 'How shadow puppets turn light and darkness into theatre',
    hero: {
      photo: 'g4-shadow-puppet.jpg', credit: 'Photo: Steve Evans, CC BY 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 210,
      cap: 'A shadow puppet from Thailand, cut from leather. Light shines through its tiny holes to show the details.'
    },
    body: [
      'Long before movies, people in many parts of Asia told stories with light and shadow. Performers sat behind a white cloth screen with a lamp or fire behind them. They held up flat puppets, and the audience on the other side watched the puppets’ shadows dance across the screen.',
      { h: 'How a shadow forms' },
      'Light travels in straight lines. When something blocks the light, it leaves a dark shape behind it, called a <b>shadow</b>. Objects that block all light, such as wood or thick leather, are <b>opaque</b>. They make dark shadows. Objects that let some light through, such as thin coloured paper, make softer, coloured shadows.',
      { fig: '<circle class="a" cx="30" cy="80" r="12"/><path class="a" d="M30 62 V56 M30 98 V104 M12 80 H6 M48 80 H54"/>' +
          '<path class="t" d="M40 76 L270 20 M40 84 L270 140"/><rect class="h" x="110" y="64" width="10" height="34"/><rect class="k" x="270" y="10" width="8" height="140"/>' +
          '<path class="k" d="M262 46 V116"/><path class="t" d="M262 46 L120 64 M262 116 L120 98"/>' +
          D.label(80, 136, 'puppet', 115, 98) + D.label(180, 10, 'screen', 270, 20) + D.label(166, 136, 'shadow', 262, 100) + '<text class="n" x="14" y="124">lamp</text>',
        tall: 150, cap: 'Moving the puppet closer to the lamp makes its shadow bigger.' },
      { h: 'Bigger and smaller' },
      'Shadow puppeteers use a clever trick. When they move a puppet closer to the lamp, it blocks more of the light, and its shadow grows huge on the screen. When they move it closer to the screen, the shadow shrinks and becomes sharper. A puppeteer can make a giant appear to stomp toward the audience just by moving one hand.',
      { h: 'Made with care' },
      'Traditional puppets in Thailand and Indonesia are cut from animal hide that is scraped thin and dried. Artists punch tiny holes and patterns into the hide, so dots of light shine through to show eyes, jewellery and clothing. Some puppets have arms on sticks so they can move. One show can go on for hours, often with live music.',
      { box: 'Try it', text: 'Cut a character from black paper and tape it to a straw. Shine a flashlight on a wall in a dark room. Move your puppet closer to the light, then farther away. What happens to the shadow?' }
    ],
    guide: { before: 'Make a hand shadow on a wall with a lamp before reading. Teach <b>shadow</b> and <b>opaque</b>. Follow the light lines in the diagram from the lamp to the screen.',
      after: 'What story would you tell with shadow puppets? Which characters would be big and which small, and how would you make them that way?' },
    words: [['shadow', 'a dark shape made when something blocks light'], ['opaque', 'not letting any light through']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Puppets are made of leather.', 'Shadow puppet theatre uses light and shadow to tell stories.', 'Movies are new.', 'Lamps are bright.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where must the puppet be to make a big shadow?',
        opts: ['close to the lamp', 'close to the screen', 'behind the screen'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do artists punch holes in the puppets?',
        opts: ['so light shines through to show details', 'to make them lighter to hold', 'to hang them up'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Material', 'Kind of shadow'],
        rows: [['thick leather', null], ['thin coloured paper', null]],
        a: [[null, 'a dark shadow (it is opaque)'], [null, 'a softer, coloured shadow']] },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>puppeteer</b> works puppets. What does <b>-eer</b> mean, as in <b>engineer</b>?',
        opts: ['a person who works with something', 'a small thing', 'not'], a: 0 },
      { k: 'choice', code: 'C2.3', half: true, q: 'In the “Try it” box, what will happen when the paper puppet moves away from the light?',
        opts: ['The shadow gets smaller.', 'The shadow gets bigger.', 'The shadow turns red.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how a puppeteer can make a giant stomp toward the audience. Use the text.',
        a: 'The puppeteer moves the puppet closer to the lamp, so it blocks more light and the shadow grows bigger, as if the giant is coming closer.', look: 'moving toward the light makes the shadow grow' },
      { k: 'lines', code: 'C1.2', n: 2, q: 'How is a shadow puppet show like a movie? Give one way.',
        a: 'Both show moving pictures on a screen while an audience watches, often with music.', look: 'a reasonable similarity' }
    ]
  });

  P.add({
    id: 'g4-wind-turbines', subject: 'tech', form: 'Explanation',
    title: 'Catching the Wind',
    deck: 'How a wind turbine turns moving air into electricity',
    hero: {
      photo: 'g4-wind-turbines.jpg', credit: 'Photo: Magnolia677, CC BY 4.0, Wikimedia Commons', focus: '50% 22%',
      tall: 190,
      cap: 'Wind turbines stand among farm fields in Bruce County, Ontario.'
    },
    body: [
      'Drive along the shores of Lake Huron, and you may see giant white towers with three long blades turning slowly in the breeze. They are wind turbines. Each one is a machine that catches the wind and turns its energy into electricity for homes, schools and farms.',
      { h: 'From wind to wire' },
      'Moving air has energy. When the wind blows, it pushes on the turbine’s blades, which are shaped a little like airplane wings. The blades spin a shaft inside the box at the top, called the nacelle. Gears inside make the shaft turn much faster. The fast-spinning shaft turns a <b>generator</b>, which makes electricity. Cables carry the electricity down the tower and out to the power lines.',
      { fig: '<path class="k" d="M114 150 L118 66 H126 L130 150"/><rect class="k" x="116" y="52" width="40" height="14" rx="4"/><circle class="k" cx="116" cy="59" r="5"/>' +
          '<path class="k" d="M114 55 L108 4 L120 54 M112 62 L66 88 L114 66 M120 63 L152 104 L117 64"/><path class="d" d="M122 70 V150"/>' +
          D.label(168, 30, 'nacelle: gears', 150, 54) + '<text class="l" x="168" y="44">and generator</text>' + D.label(10, 40, 'blades', 104, 24) + D.label(170, 104, 'tower', 128, 110) + D.label(150, 146, 'cable', 124, 138),
        tall: 156, cap: 'The main parts of a wind turbine.' },
      { h: 'Tall for a reason' },
      'Wind turbines are tall because the wind blows faster and more steadily high above the ground, where there are no trees or buildings to slow it down. A large turbine tower can be as tall as a 30-storey building, and each blade can be longer than a hockey rink is wide.',
      { box: 'Did you know?', text: 'Wind is a <b>renewable</b> energy source, because it will never run out. Turbines also make electricity without burning fuel, so they do not release smoke into the air.' },
      { h: 'Good points and problems' },
      'Wind power has many benefits, but it is not perfect. The wind does not blow all the time, so other power sources are needed on calm days. Some people do not like how the turbines look or sound. Turbines also need to be placed carefully, away from places where many birds and bats fly. Engineers keep working to make them better.'
    ],
    guide: { before: 'Make a paper pinwheel and blow on it, or watch a fan, before reading. Teach <b>generator</b> and <b>renewable</b>. Point to each part of the turbine in the diagram.',
      after: 'Would you want a wind turbine near your home? Think about the good points and the problems before you decide.' },
    words: [['generator', 'a machine that turns movement into electricity'], ['renewable', 'able to be replaced naturally, so it does not run out']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Turbines are white.', 'Wind turbines turn the energy of moving air into electricity.', 'Lake Huron is windy.', 'Birds fly high.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in order.',
        items: ['The wind pushes the blades.', 'The blades spin a shaft.', 'Gears make the shaft spin faster.', 'The generator makes electricity.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is the generator?',
        opts: ['in the nacelle at the top', 'at the bottom of the tower', 'in the blades'], a: 0 },
      { k: 'table', code: 'C3.5', q: 'Fill in the chart.', cols: ['Good points of wind power', 'Problems with wind power'],
        rows: [[null, null], [null, null]],
        a: [['It will never run out.', 'The wind does not blow all the time.'], ['It does not make smoke.', 'Some people dislike the look or sound, and it can harm birds and bats.']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are turbines built so tall?',
        opts: ['The wind is faster and steadier higher up.', 'So people can see them.', 'To be near the clouds.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Re</b>newable energy can be made again and again. Which word also uses <b>re-</b> to mean “again”?',
        opts: ['recharge', 'real', 'ready'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Is the writer for or against wind power, or fair to both sides? How can you tell?',
        a: 'The writer is mostly fair. The text explains the benefits but also gives a section on problems, and says engineers keep working to make turbines better.', look: 'a judgement about balance with evidence from the text' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'What do you predict would happen to a turbine’s electricity on a calm day? Why?',
        a: 'It would make little or no electricity, because there would be no wind to push the blades.', look: 'a prediction linked to the need for wind' }
    ]
  });

  P.add({
    id: 'g4-counting-caribou', subject: 'math', form: 'Explanation',
    title: 'How Many Caribou?',
    deck: 'How scientists count a herd too big to count one by one',
    hero: {
      photo: 'g4-caribou.jpg', credit: 'Photo: U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Caribou migrate across the tundra. Some herds cross between Alaska and Yukon.'
    },
    body: [
      'Caribou travel across the northern <b>tundra</b> in huge herds. Some herds have more than a hundred thousand animals. Scientists, wildlife managers and Indigenous communities need to know how big each herd is, to see if it is healthy or shrinking. But how do you count animals that are always moving and spread over many kilometres?',
      { h: 'Counting from the air' },
      'In early summer, many caribou gather close together. Scientists fly over the herd in a small plane and take photographs straight down. Back in the office, they look at the photos carefully. They cannot count every animal in one go, so they use a smart math trick to make an <b>estimate</b>, an answer that is close but not exact.',
      { h: 'Using a grid' },
      'First, they lay a grid of equal squares over a photo. Next, they choose a square that looks typical, not the most crowded and not the emptiest, and count every caribou in it. Then they multiply that number by the number of squares that have caribou in them. If one square holds 12 caribou and there are 20 squares like it, the estimate is 12 times 20, or 240 caribou in that photo.',
      { fig: [0, 1, 2, 3, 4].map(function (c) { return [0, 1, 2, 3].map(function (r) { return '<rect class="' + (c === 1 && r === 1 ? 'a' : 't') + '" x="' + (40 + c * 44) + '" y="' + (10 + r * 30) + '" width="44" height="30"/>'; }).join(''); }).join('') +
          [[48, 18], [60, 26], [72, 16], [92, 32], [100, 20], [110, 30], [56, 48], [68, 58], [96, 52], [102, 62], [114, 46], [84, 46], [94, 58], [140, 22], [160, 30], [150, 50], [176, 60], [200, 24], [220, 40], [190, 76], [60, 86], [130, 92], [160, 104], [220, 100], [240, 70]].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="2.2"/>'; }).join('') +
          '<text class="n" x="150" y="146" text-anchor="middle">Count one square, then multiply by the number of squares.</text>',
        tall: 152, cap: 'A grid laid over a photo of caribou. The coloured square is the one being counted.' },
      { box: 'Did you know?', text: 'Inuit, Dene and Gwich’in hunters have watched caribou for thousands of years. Their knowledge of where herds travel helps scientists plan where to fly.' },
      { h: 'Why it matters' },
      'Counting the same herd every few years shows whether it is growing or shrinking. Some caribou herds in Canada have become much smaller. Knowing the numbers helps communities and governments decide how to protect the caribou, so herds will still cross the tundra for generations to come. For many Indigenous communities, caribou have always meant food, clothing and tools, so a healthy herd matters to their way of life.'
    ],
    guide: { before: 'Scatter a handful of dried beans on a sheet of paper divided into squares and try the estimate method together. Teach <b>estimate</b> and <b>tundra</b>.',
      after: 'When else might people need to estimate instead of counting exactly? Think about crowds, trees or jelly beans in a jar.' },
    words: [['estimate', 'an answer that is close but not exact'], ['tundra', 'cold, treeless land in the far north']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Caribou live in herds.', 'Scientists estimate the size of caribou herds using photos and a grid.', 'Planes fly over the tundra.', 'Hunters watch caribou.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps for estimating a herd.',
        items: ['Take photos from a plane.', 'Lay a grid over a photo.', 'Count the caribou in one typical square.', 'Multiply by the number of squares with caribou.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do scientists choose a square that is not the most crowded?',
        opts: ['to get a fair estimate', 'to make counting faster', 'because crowded squares are blurry'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Use the grid method. Fill in the chart.', cols: ['Caribou in one square', 'Squares with caribou', 'Estimate'],
        rows: [['12', '20', '240'], ['10', '30', null], ['15', null, '150']],
        a: [[null, null, null], [null, null, '300'], [null, '10', null]] },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>estimate</b> is close but not exact. Which word means “not exact”?',
        opts: ['inexact', 'exactly', 'exacting'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, the coloured square is …',
        opts: ['the square being counted', 'the most crowded square', 'an empty square'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is an estimate good enough for a caribou herd? Use details from the text.',
        a: 'The herd is huge and always moving, so counting every animal is almost impossible. A close answer still shows whether the herd is growing or shrinking.', look: 'the size and movement of the herd and the purpose of the count' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'Why does the writer include Inuit, Dene and Gwich’in knowledge in the text?',
        a: 'To show that Indigenous knowledge of caribou is important and helps scientists know where to look.', look: 'values Indigenous knowledge as part of the science' }
    ]
  });

  P.add({
    id: 'g4-prairies', subject: 'geography', form: 'Report',
    title: 'Canada’s Breadbasket',
    deck: 'How the flat, open Prairies grow food for the world',
    hero: {
      photo: 'g4-grain-elevator.jpg', credit: 'Photo: Janusz Sobolewski, CC BY 2.0, Wikimedia Commons', focus: '50% 60%',
      tall: 190,
      cap: 'A grain elevator in Saskatchewan at dusk. Grain is stored here before it travels by train.'
    },
    body: [
      'Picture land so flat that you can watch a storm coming from an hour away. Fields of wheat and canola stretch to the horizon, and the sky seems to go on forever. This is the Prairies, a <b>region</b> that covers much of Alberta, Saskatchewan and Manitoba.',
      { h: 'A land made for farming' },
      'Long ago, huge sheets of ice called glaciers covered this land. When they melted, they left behind flat ground and deep, dark soil. For thousands of years, prairie grasses grew and died, adding rich material to the soil each year. Today, that soil makes the Prairies one of the best places in the world to grow grain. The summers are warm and sunny, with just enough rain.',
      { fig: '<path class="k" d="M10 120 H290"/><rect class="k" x="40" y="40" width="40" height="80"/><path class="k" d="M36 40 L60 20 L84 40"/><rect class="k" x="50" y="100" width="20" height="20"/>' +
          D.arrow(90, 100, 140, 100, 'a') + '<path class="k" d="M150 90 H230 V110 H150 Z"/><circle class="k" cx="166" cy="114" r="6"/><circle class="k" cx="214" cy="114" r="6"/>' +
          D.arrow(240, 100, 286, 100, 'a') + '<path class="k" d="M260 70 L286 70 L280 82 H264 Z"/>' +
          '<text class="n" x="60" y="138" text-anchor="middle">elevator</text><text class="n" x="190" y="138" text-anchor="middle">train</text><text class="n" x="274" y="138" text-anchor="middle">ship</text>' +
          '<text class="n" x="20" y="20">farm</text>' + D.arrow(30, 26, 40, 40, 'k'),
        tall: 146, cap: 'Grain travels from the farm to the elevator, then by train and ship.' },
      { h: 'From field to table' },
      'Prairie farmers grow wheat, canola, oats, barley, lentils and more. At harvest time in late summer, giant machines called combines cut the plants and separate the grain. Trucks carry it to tall buildings called grain elevators, where it is stored. Trains then carry the grain to ports, where ships take it around the world. Canada is one of the world’s biggest <b>exporters</b> of wheat.',
      { box: 'Did you know?', text: 'The bread, pasta and breakfast cereal in your kitchen may well have started as wheat on a prairie farm.' },
      { h: 'Before the farms' },
      'The Prairies were not always farmland. For thousands of years, huge herds of bison grazed the grasslands. Plains Cree, Blackfoot, Métis and other peoples lived here and depended on the bison for food, clothing and shelter. When settlers arrived in the late 1800s, the bison had almost disappeared, and the grassland was ploughed into farms.'
    ],
    guide: { before: 'Find Alberta, Saskatchewan and Manitoba on a map of Canada. Teach <b>region</b> and <b>exporter</b>. Follow the grain’s journey in the diagram.',
      after: 'Think of three foods you ate today. Which might have come from the Prairies? What would happen if there was a drought there?' },
    words: [['region', 'a large area with features in common'], ['exporters', 'people or countries that sell goods to other countries']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Prairies are flat.', 'The Prairies’ rich soil and climate make them a great place to grow grain for Canada and the world.', 'Trains carry grain.', 'Glaciers melted.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the grain’s journey.',
        items: ['farm', 'elevator', 'train', 'ship'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is prairie soil so rich?',
        opts: ['Grasses grew and died there for thousands of years.', 'It is sandy.', 'It rains every day.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Long ago', 'Today'],
        rows: [['bison grazed the grasslands', null], [null, 'farmers grow food to sell']],
        a: [[null, 'farms grow wheat, canola and other crops'], ['peoples such as the Plains Cree and Blackfoot depended on the bison', null]] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Ex</b>porters send goods <b>out</b> of a country. What do <b>im</b>porters do?',
        opts: ['bring goods in', 'grow goods', 'store goods'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: '“You can watch a storm coming from an hour away.” This helps you picture …',
        opts: ['how flat and open the land is', 'how often it storms', 'how fast storms move'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize how the Prairies became good farmland.',
        a: 'Glaciers left flat land and deep soil. Prairie grasses grew and died for thousands of years, making the soil rich, and the warm summers help crops grow.', look: 'the glaciers, the grasses and the climate' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The last section tells about the land before farms. Why is it important to include this part?',
        a: 'It reminds readers that Indigenous peoples lived on the Prairies long before the farms, and the land was changed when settlers came.', look: 'recognizes the Indigenous history and the change to the land' }
    ]
  });

  P.add({
    id: 'g4-healthy-plate', subject: 'health', form: 'Explanation',
    title: 'Half a Plate of Colour',
    deck: 'How Canada’s food guide helps you build a healthy meal',
    hero: {
      photo: 'g4-fruit-vegetables.jpg', credit: 'Photo: TudorTulok, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Celery, cucumber, peppers and fruit make a colourful snack tray.'
    },
    body: [
      'What should be on your plate? Canada’s food guide gives a simple answer with a picture of a plate. It does not tell you exactly what to eat. Instead, it shows how much of your plate each kind of food should fill.',
      { h: 'Fill half with vegetables and fruit' },
      'Half of the plate is <b>vegetables</b> and fruit. They give your body vitamins, minerals and fibre, which helps you digest food. Different colours of vegetables and fruit have different nutrients, so try to eat many colours: orange carrots, green broccoli, red peppers, purple berries.',
      { fig: '<circle class="k" cx="110" cy="76" r="62"/><path class="k" d="M110 14 V138 M110 76 H172"/><path class="h" d="M110 14 A62 62 0 0 0 110 138 Z"/>' +
          '<circle class="k" cx="226" cy="40" r="14"/><path class="t" d="M216 30 h20 v20 h-20"/>' +
          '<text class="n" x="76" y="80" text-anchor="middle">vegetables</text><text class="n" x="76" y="92" text-anchor="middle">and fruit</text>' +
          '<text class="n" x="140" y="48" text-anchor="middle">whole</text><text class="n" x="140" y="60" text-anchor="middle">grains</text>' +
          '<text class="n" x="140" y="100" text-anchor="middle">protein</text><text class="n" x="140" y="112" text-anchor="middle">foods</text><text class="n" x="226" y="70" text-anchor="middle">water</text>',
        tall: 146, cap: 'The healthy plate: half vegetables and fruit, a quarter whole grains, a quarter protein foods, and water to drink.' },
      { h: 'A quarter of grains' },
      'One quarter of the plate is whole grains, such as brown rice, oatmeal or whole wheat bread. A whole grain still has all its parts, including the outer layer. Whole grains give you lasting energy and more fibre than white bread or white rice.',
      { h: 'A quarter of protein' },
      'The last quarter is <b>protein</b> foods, which help your muscles grow and repair. Protein comes from beans, lentils, nuts, tofu, eggs, fish, chicken, meat, milk and yogurt. The guide suggests eating plant proteins, such as beans and lentils, more often.',
      { box: 'Make water your drink', text: 'The best drink with a meal is water. Juice and pop have a lot of sugar. Milk and unsweetened fortified soy drinks are healthy choices too.' },
      'The food guide also says that how you eat matters. Eating with family or friends, cooking together and taking time to enjoy your food are all part of healthy eating. So is noticing when you are hungry and when you feel full, and stopping when you have had enough.'
    ],
    guide: { before: 'Look at a dinner plate together and divide it into halves and quarters with your finger. Teach <b>protein</b> and <b>nutrient</b>. Read the plate diagram together.',
      after: 'Plan a lunch that follows the plate. Which part of the plate is easiest for you to fill? Which is hardest?' },
    words: [['vegetables', 'plants or parts of plants that we eat'], ['protein', 'a nutrient that builds and repairs muscles']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Juice has sugar.', 'Canada’s food guide shows how to fill a healthy plate.', 'Carrots are orange.', 'Brown rice is a grain.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the plate diagram. Fill in the chart.', cols: ['Part of the plate', 'How much', 'One example'],
        rows: [['vegetables and fruit', null, null], ['whole grains', null, null], ['protein foods', null, null]],
        a: [[null, 'half', 'carrots, broccoli or berries'], [null, 'a quarter', 'brown rice, oatmeal or whole wheat bread'], [null, 'a quarter', 'beans, eggs, fish or yogurt']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why should you eat many colours of vegetables and fruit?',
        opts: ['Different colours have different nutrients.', 'They look nice.', 'They cost less.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Which drink does the guide suggest most?',
        opts: ['juice', 'pop', 'water'], a: 2 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Un</b>sweetened means …',
        opts: ['not sweetened', 'very sweet', 'sweetened again'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why are the headings “half”, “a quarter” and “a quarter”?',
        opts: ['They tell how much of the plate each food fills.', 'They are page numbers.', 'They are times of day.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Maya’s dinner is pasta with a little sauce and nothing else. What would you add to make it match the healthy plate? Explain.',
        a: 'I would add vegetables like a salad or broccoli to fill half the plate, and a protein like beans or chicken. I would also use whole wheat pasta.', look: 'adds vegetables/fruit and protein, using the plate proportions' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The title is “Half a Plate of Colour.” Why is this a good title?',
        a: 'Half the plate should be vegetables and fruit, which are many colours, so the title sums up the most important idea.', look: 'links the title to the main advice' }
    ]
  });

  P.add({
    id: 'g4-zoetrope', subject: 'arts', form: 'Explanation',
    title: 'Pictures That Move',
    deck: 'How a spinning drum from 1834 explains every cartoon you watch',
    hero: {
      photo: 'g4-zoetrope.jpg', credit: 'Photo: Auckland Museum, CC BY 4.0, Wikimedia Commons', focus: '50% 28%',
      side: { w: 440, view: '0 0 440 200' },
      tall: 200,
      cap: 'An old zoetrope in a museum, and how one works: you look through a slit at the drawings on the far side.',
      art: '<path class="k" d="M150 50 V150 M390 50 V150 M150 150 A120 22 0 0 0 390 150"/><ellipse class="k" cx="270" cy="50" rx="120" ry="22"/>' +
        [178, 222, 270, 318, 362].map(function (x) { return '<rect class="h" x="' + (x - 4) + '" y="62" width="8" height="30"/>'; }).join('') +
        '<circle class="a" cx="250" cy="44" r="5"/><circle class="a" cx="290" cy="40" r="5"/>' +
        '<path class="d" d="M48 78 L178 76 L280 44"/><path class="k" d="M30 78 Q44 66 58 78 Q44 90 30 78 Z"/><circle class="dot" cx="45" cy="78" r="3"/>' +
        D.arrow(220, 184, 320, 184) + D.label(10, 112, 'your eye', 40, 84) + D.label(300, 14, 'drawings inside', 290, 40) + D.label(180, 126, 'slits', 222, 92) + '<text class="n" x="270" y="198" text-anchor="middle">it spins</text>'
    },
    body: [
      'Every cartoon, video game and movie you have ever watched is really a trick. Nothing on the screen actually moves. You are seeing many still pictures, one after another, so quickly that your brain blends them into motion.',
      { h: 'A spinning drum' },
      'In 1834, a British inventor named William Horner made a toy that showed this trick. It was a round drum, open at the top, with thin slits cut in its sides. Inside, around the bottom of the drum, was a paper strip with a series of drawings, each one a little different from the last. It was later named the <b>zoetrope</b>, from Greek words meaning “wheel of life.”',
      { fig: [0, 1, 2, 3, 4, 5].map(function (i) { var x = 14 + i * 46, y = 60 - [0, 14, 22, 14, 0, -6][i];
          return '<rect class="t" x="' + (x - 4) + '" y="20" width="44" height="90"/><circle class="k" cx="' + (x + 18) + '" cy="' + y + '" r="9"/><path class="k" d="M' + (x + 6) + ' 108 Q' + (x + 18) + ' ' + (y + 16) + ' ' + (x + 30) + ' 108"/>'; }).join('') +
          '<text class="n" x="150" y="130" text-anchor="middle">Each drawing is a little different from the one before.</text>',
        tall: 138, cap: 'A strip of drawings of a bouncing ball, like the ones inside a zoetrope.' },
      { h: 'How it works' },
      'When you spin the drum and look through the slits, you see one drawing, then a flash of darkness, then the next drawing. The slits work like a camera’s shutter, showing each picture for a split second. Your eyes and brain hold on to each picture for a moment, so the pictures blend together. A ball seems to bounce, or a horse seems to gallop.',
      { box: 'Make a flip book', text: 'Draw a stick figure on the corner of a small notepad. On each next page, draw it again, moving its arm a tiny bit. Flip the pages quickly with your thumb and watch it wave.' },
      { h: 'From toys to movies' },
      'Movies use the same idea. A film shows 24 pictures, called frames, every second. A cartoon is made of thousands of drawings or computer images. <b>Animation</b> is the art of making still pictures seem to move, and it all started with simple spinning toys.'
    ],
    guide: { before: 'If you can, make a quick flip book with a sticky-note pad before reading. Teach <b>animation</b> and <b>frame</b>. Look at how the ball changes from drawing to drawing in the diagram.',
      after: 'If you made a short animation, what would it show? How many drawings would you need for one second of movie?' },
    words: [['zoetrope', 'a spinning drum that makes drawings seem to move'], ['animation', 'making still pictures seem to move']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['William Horner was British.', 'Moving pictures are really still pictures shown very quickly, an idea shown by the zoetrope.', 'Movies are long.', 'Flip books are fun.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what does the ball do from drawing to drawing?',
        opts: ['rises, then falls', 'gets bigger', 'stays still'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'What would happen if the zoetrope had no slits?',
        opts: ['The drawings would blur together.', 'It would spin faster.', 'It would be louder.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps to show how a zoetrope works.',
        items: ['You spin the drum.', 'You look through a slit and see one drawing.', 'Darkness flashes, then the next drawing appears.', 'Your brain blends the pictures into motion.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.3', q: 'Movies show 24 frames each second. Fill in the chart.', cols: ['Seconds of movie', 'Frames needed'],
        rows: [['1', '24'], ['2', null], ['10', null]],
        a: [[null, null], [null, '48'], [null, '240']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Zoetrope</b> comes from Greek words for “life” and “wheel.” Which word with <b>zoo-</b> or <b>zo-</b> is about animal life?',
        opts: ['zoology', 'zone', 'zero'], a: 0 },
      { k: 'lines', code: 'C1.2', n: 2, q: 'How are the steps in the “Make a flip book” box written? Why?',
        a: 'They are short instructions in order, telling the reader what to do, so the reader can follow them.', look: 'recognizes procedural form and its purpose' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The text says every movie is “really a trick.” Explain the trick in your own words.',
        a: 'Nothing on the screen moves. Many still pictures are shown so quickly that our brain blends them into motion.', look: 'still pictures shown quickly and blended by the brain' }
    ]
  });

  P.add({
    id: 'g4-science-fair', subject: 'story', form: 'Short story',
    title: 'The Sinking Boat',
    deck: 'Amira’s experiment fails the night before the science fair',
    hero: {
      photo: 'g4-science-fair.jpg', credit: 'Photo: U.S. Navy, public domain, Wikimedia Commons', focus: '50% 30%',
      side: { w: 420, view: '0 0 420 190' },
      tall: 190,
      cap: 'A student explains her project to a judge at a school science fair, and how to test a foil boat.',
      art: '<rect class="h" x="20" y="96" width="380" height="70"/><path class="a" d="M20 96 H400"/><path class="k" d="M20 40 V166 H400 V40"/>' +
        '<path class="k" d="M130 70 L150 110 H270 L290 70 Z"/>' +
        [[170, 96], [186, 96], [202, 96], [218, 96], [234, 96], [250, 96], [178, 86], [194, 86], [210, 86], [226, 86], [242, 86]].map(function (c) { return '<ellipse class="k" cx="' + c[0] + '" cy="' + c[1] + '" rx="7" ry="3"/>'; }).join('') +
        D.label(300, 30, 'pennies', 230, 84) + D.label(310, 70, 'foil boat', 284, 78) + D.label(30, 186, 'water in the sink', 60, 130) + D.arrow(210, 18, 210, 70) + '<text class="n" x="120" y="22">add one at a time</text>'
    },
    body: [
      'Amira had a plan for the science fair. She would build a boat out of aluminum foil and find out how many pennies it could hold before it sank. She called her project “How Much Can a Boat Carry?” and wrote her <b>hypothesis</b> in her neatest printing: A boat with high sides will hold the most pennies.',
      { h: 'The night before' },
      'The night before the fair, Amira tested her boat in the kitchen sink. She folded the foil into a tall, narrow boat with high sides, just like her drawing. Her little brother, Sami, dropped in the pennies one by one. Ten. Eleven. Twelve. On the thirteenth penny, the boat tipped over and sank.',
      '“It’s ruined,” Amira groaned. “My hypothesis was wrong.”',
      'Her dad looked up from the stove. “Is it ruined,” he asked, “or did you just learn something?”',
      { fig: '<path class="k" d="M20 60 L30 120 H80 L90 60"/><path class="a" d="M10 100 H100"/><text class="lb" x="55" y="140" text-anchor="middle">tall and narrow</text><text class="n" x="55" y="154" text-anchor="middle">sank at 13</text>' +
          '<path class="k" d="M150 96 L160 120 H270 L280 96"/><path class="a" d="M140 108 H290"/><text class="lb" x="215" y="140" text-anchor="middle">wide and flat</text><text class="n" x="215" y="154" text-anchor="middle">held 61</text>',
        tall: 160, cap: 'Amira’s two boats, seen from the side.' },
      { h: 'Trying again' },
      'Amira thought about it. The tall boat had tipped because all the pennies were stacked in a narrow space. What if the boat were wide and flat instead, so the weight could spread out? She tore off a fresh sheet of foil and folded a shallow boat as wide as a dinner plate. Sami counted again. Twenty. Forty. Sixty-one pennies before the water finally poured over the edge.',
      { h: 'The fair' },
      'At the science fair, Amira set both boats on her table, the crumpled tall one and the wide one. When the judge asked about her <b>results</b>, Amira did not hide her mistake. “My hypothesis was wrong,” she said, “and that is how I found the answer.”',
      'The judge smiled and wrote something on her clipboard. Amira did not win first prize, but she walked home feeling like a real scientist.'
    ],
    guide: { before: 'Fold a small foil boat and float it in a bowl before reading. Teach <b>hypothesis</b> and <b>results</b>. Ask: what do you think happens when an experiment does not go as planned?',
      after: 'Tell about a time something went wrong and you learned from it. Why do scientists say a wrong hypothesis is still useful?' },
    words: [['hypothesis', 'a guess that a scientist tests'], ['results', 'what you find out from an experiment']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'Who tells this story?',
        opts: ['Amira, using “I”', 'a narrator outside the story, using “she”', 'Sami', 'the judge'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the story map.', cols: ['Part of the story', 'What happens'],
        rows: [['Problem', null], ['Turning point', null], ['Solution', null]],
        a: [[null, 'Amira’s tall boat sinks the night before the fair, and her hypothesis is wrong.'], [null, 'Her dad asks if she learned something, and she thinks about why the boat tipped.'], [null, 'She builds a wide, flat boat that holds 61 pennies and shows both boats at the fair.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How many more pennies did the wide boat hold?',
        opts: ['13', '48', '61'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How does Amira feel when the first boat sinks?',
        opts: ['proud', 'upset', 'sleepy'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the wide boat hold more pennies?',
        opts: ['The weight could spread out.', 'It was made of stronger foil.', 'Sami counted faster.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Amira <b>re</b>tested her idea. What does <b>retested</b> mean?',
        opts: ['tested again', 'never tested', 'tested badly'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What lesson does this story teach? Use details from the story.',
        a: 'A mistake can help you learn. Amira’s first boat sank, but it helped her find the answer, and she felt like a real scientist.', look: 'a lesson about learning from mistakes, with a detail' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Amira did not win first prize. Predict what she might do at next year’s science fair.',
        a: 'She might try another experiment and not be afraid if her hypothesis is wrong, because she learned that mistakes help.', look: 'a prediction based on how Amira changed' }
    ]
  });

  P.add({
    id: 'g4-backyard-rink', subject: 'story', form: 'Diary',
    title: 'Flooding the Rink',
    deck: 'A week of building an outdoor rink with Grandpa',
    hero: {
      photo: 'g4-outdoor-rink.jpg', credit: 'Photo: Fort Simpson Chamber of Commerce, CC BY 2.0, Wikimedia Commons', focus: '50% 60%',
      tall: 190,
      cap: 'Fresh ice on a cold, sunny day in Fort Simpson, Northwest Territories.'
    },
    plain: true,
    body: [
      '<b>Saturday, December 2</b>',
      'Grandpa says it is finally cold enough. Today the temperature was minus 18, so we started our rink in the backyard. First we stamped down the snow with our boots until it was flat and hard. It took all morning. My legs feel like noodles.',
      '<b>Sunday, December 3</b>',
      'We built banks of snow around the edges, like a frame, to hold the water in. Then Grandpa showed me how to spray a thin layer of water over the packed snow. “Thin layers,” he said. “<b>Patience</b> makes good ice.” I wanted to dump a whole bucket, but he said thick water freezes slowly and gets bumpy.',
      { fig: '<path class="k" d="M10 120 H290"/><rect class="h" x="10" y="100" width="280" height="20"/><path class="k" d="M10 100 Q10 80 30 80 V100 M290 100 Q290 80 270 80 V100"/>' +
          '<path class="a" d="M30 94 H270"/><path class="t" d="M30 88 H270 M30 82 H270"/>' +
          D.label(110, 50, 'thin layers of ice', 150, 86) + D.label(10, 150, 'packed snow', 100, 110) + D.label(220, 50, 'snow bank', 280, 84),
        tall: 156, cap: 'A side view of the rink. Each night adds another thin layer of ice.' },
      '<b>Tuesday, December 5</b>',
      'Every night after supper, we go out with the hose and add another layer. The water steams in the cold air. Grandpa says each layer is about as thin as a coin. I counted, and we have done six layers so far. The ice is starting to look like glass.',
      '<b>Thursday, December 7</b>',
      'Disaster! A warm wind came this afternoon, and the ice got soft and slushy in one corner. I almost cried. Grandpa just shrugged. “The weather is the boss,” he said. Tonight it got cold again, so we scraped off the slush and flooded that corner three times.',
      '<b>Saturday, December 9</b>',
      'Today was the best day. The ice was smooth and hard, and I skated until my toes were frozen. My cousins came over, and we played <b>shinny</b> until the streetlights came on. Grandpa watched from the back step with his hot chocolate. He said, “Good ice takes a week. Good memories take a lifetime.” I think he is right.'
    ],
    guide: { before: 'Ask whether the child has skated outdoors. Teach <b>diary</b> and <b>patience</b>. Point out that each entry starts with a date in bold. Look at the side view of the rink.',
      after: 'Grandpa says “<b>Patience</b> makes good ice.” What else takes patience to do well? Tell about something you worked on over many days.' },
    words: [['patience', 'being able to wait calmly'], ['shinny', 'a friendly game of hockey with no teams set up ahead of time']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This text is a diary. How can you tell?',
        opts: ['It has dated entries written by one person about their days.', 'It has steps to follow.', 'It rhymes.', 'It has a map.'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['They stamp down the snow.', 'They build snow banks.', 'A warm wind makes slush.', 'They play shinny.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what holds the water in?',
        opts: ['snow banks', 'a wooden fence', 'the house'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“My legs feel like noodles.” What does this mean?',
        opts: ['The writer’s legs are very tired.', 'The writer ate noodles.', 'The writer’s legs are long.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Grandpa spray thin layers?',
        opts: ['Thin layers freeze fast and smooth.', 'The hose is small.', 'He wants to save water.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['A warm wind comes.', null], ['They add a layer every night.', null]],
        a: [[null, 'The ice gets soft and slushy in one corner.'], [null, 'The ice gets thicker and looks like glass.']] },
      { k: 'lines', code: 'C1.6', n: 3, q: 'The diary is written in the first person, with “I.” How does this help you understand the writer’s feelings? Give an example.',
        a: 'We hear the writer’s own thoughts, like “I almost cried” when the ice got slushy, so we know exactly how they felt.', look: 'an example of feelings shown through first person' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'What does Grandpa mean by “Good memories take a lifetime”?',
        a: 'The rink took a week to build, but the fun times with family will be remembered forever.', look: 'an interpretation about lasting memories' }
    ]
  });

  P.add({
    id: 'g4-burgess-shale', subject: 'science', form: 'Report',
    title: 'Animals in Stone',
    deck: 'The Burgess Shale and the strange sea creatures it kept for 500 million years',
    hero: {
      photo: 'g4-burgess-shale.jpg', credit: 'Photo: Edna Winti, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Trilobite fossils in a slab of Burgess Shale, Yoho National Park, British Columbia.'
    },
    body: [
      'High in the Rocky Mountains of British Columbia, in Yoho National Park, there is a layer of dark rock called the Burgess Shale. Inside it are some of the most amazing <b>fossils</b> on Earth. They show animals that lived in the sea more than 500 million years ago, long before there were dinosaurs, trees or even fish with jaws.',
      { h: 'How a fossil forms' },
      'Long ago, this part of the mountains was the bottom of a warm, shallow sea. Every so often, an underwater mudslide buried the animals living there. The mud was so fine and so low in oxygen that the soft bodies did not rot away. Over millions of years, more layers piled on top and pressed the mud into rock called <b>shale</b>. Much later, the land was pushed up to form mountains.',
      { fig: '<rect class="k" x="20" y="10" width="200" height="30"/><rect class="h" x="20" y="40" width="200" height="30"/><rect class="k" x="20" y="70" width="200" height="30"/><rect class="h" x="20" y="100" width="200" height="30"/>' +
          '<ellipse class="a" cx="120" cy="85" rx="18" ry="9"/><path class="a" d="M106 85 H134 M112 78 V92 M120 76 V94 M128 78 V92"/>' +
          D.label(234, 29, 'newest layer') + D.label(234, 119, 'oldest layer') + D.label(234, 74, 'fossil', 138, 84),
        tall: 140, cap: 'Layers of shale are like pages in a book. The deeper the layer, the older it is.' },
      'Most fossils show only hard parts, such as shells and bones. The Burgess Shale is special because it also kept soft parts, such as legs, gills and even guts. That is why scientists from around the world come to study it.',
      { h: 'Strange creatures' },
      'Some Burgess Shale animals look like nothing alive today. Opabinia had five eyes and a long nose with a claw at the end. Hallucigenia was a worm with spikes on its back and legs on its belly. When scientists first studied it, they drew it upside down! The most common fossils are trilobites, animals with hard shells divided into three parts.',
      { box: 'Did you know?', text: 'A geologist named Charles Walcott found the Burgess Shale in 1909. He collected more than 65 000 fossils there. Today, you can visit the fossil beds only with a guide, to keep them safe.' }
    ],
    guide: { before: 'Press a shell or leaf into play dough to make a “fossil.” Teach <b>fossil</b> and <b>shale</b>. Stack a few books and ask which one was put down first.',
      after: 'If an animal from today became a fossil, what parts would be kept? What could a scientist in the far future learn from it?' },
    words: [['fossils', 'the remains or marks of living things from long ago, kept in rock'], ['shale', 'a rock made from layers of fine mud pressed together']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Mountains are tall.', 'The Burgess Shale holds rare fossils of sea animals from more than 500 million years ago.', 'Trilobites have three parts.', 'Charles Walcott liked hiking.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in order.',
        items: ['Animals live in a shallow sea.', 'A mudslide buries them.', 'Layers press the mud into shale.', 'The land is pushed up into mountains.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is the oldest layer?',
        opts: ['at the bottom', 'at the top', 'in the middle'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the soft bodies not rot away?',
        opts: ['The mud was fine and had little oxygen.', 'The water was very cold.', 'Scientists froze them.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Geo</b>logist starts with geo-, which means “earth.” What does a geologist study?',
        opts: ['rocks and the earth', 'stars and planets', 'birds'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart about two strange animals.', cols: ['Animal', 'What was strange about it'],
        rows: [['Opabinia', null], ['Hallucigenia', null]],
        a: [[null, 'It had five eyes and a long nose with a claw at the end.'], [null, 'It had spikes on its back, and scientists first drew it upside down.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is the Burgess Shale more important to scientists than most fossil sites? Use details from the text.',
        a: 'It kept soft parts such as legs, gills and guts, not just shells and bones, so scientists can learn more about how the animals looked and lived.', look: 'soft parts were kept, with a detail' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'Why do you think visitors can go to the fossil beds only with a guide?',
        a: 'To protect the fossils, so people do not damage them or take them away.', look: 'protecting the site' }
    ]
  });

  P.add({
    id: 'g4-spring-peepers', subject: 'science', form: 'Explanation',
    title: 'The Loudest Little Frog',
    deck: 'How a frog the size of a paper clip fills a spring night with sound',
    hero: {
      photo: 'g4-spring-peeper.jpg', credit: 'Photo: U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'A male spring peeper calling. The bubble under his chin is his vocal sac.'
    },
    body: [
      'On a warm night in early spring, walk near a pond or marsh almost anywhere in eastern Canada and you may hear a chorus of high, sharp peeps. It sounds like hundreds of tiny whistles. The singers are spring peepers, frogs about as long as a paper clip.',
      { h: 'A wetland home' },
      'Spring peepers live in <b>wetlands</b>, such as marshes, swamps and ponds, and in the woods around them. A wetland gives them everything they need: water for laying eggs, plants to hide in, and plenty of insects to eat. Peepers have sticky pads on their toes, so they can climb grasses and shrubs. Look closely at one, and you might see a dark X on its back.',
      { h: 'How they peep' },
      'Only the males sing. A male gulps air and then pushes it out of his lungs into a <b>vocal sac</b>, a stretchy pouch under his chin. The sac blows up like a bubble gum balloon and makes the peep much louder. Each male is saying, “Here I am!” to the females. A chorus can be heard more than a kilometre away.',
      { fig: '<circle class="k" cx="54" cy="26" r="5"/><circle class="k" cx="66" cy="26" r="5"/><circle class="k" cx="60" cy="36" r="5"/>' +
          '<ellipse class="k" cx="236" cy="30" rx="8" ry="6"/><path class="k" d="M244 30 Q254 24 264 32"/>' +
          '<ellipse class="k" cx="244" cy="112" rx="9" ry="7"/><path class="k" d="M253 112 L262 114 M237 117 L230 124 M251 117 L258 124"/>' +
          '<ellipse class="a" cx="60" cy="112" rx="13" ry="9"/><path class="k" d="M49 118 L38 128 M71 118 L82 128 M51 106 L44 100 M69 106 L76 100"/>' +
          D.arrow(90, 30, 210, 30) + D.arrow(276, 44, 276, 100) + D.arrow(220, 112, 100, 112) + D.arrow(24, 100, 24, 40) +
          '<text class="n" x="60" y="58" text-anchor="middle">eggs</text><text class="n" x="240" y="58" text-anchor="middle">tadpole</text><text class="n" x="244" y="142" text-anchor="middle">froglet</text><text class="n" x="60" y="146" text-anchor="middle">adult</text>' +
          '<text class="l" x="150" y="22" text-anchor="middle">about a week</text><text class="l" x="160" y="104" text-anchor="middle">2 to 3 months</text>',
        tall: 150, cap: 'The life cycle of a spring peeper.' },
      'After mating, a female lays hundreds of eggs, one at a time, on underwater plants. In about a week, tadpoles hatch. They swim and eat algae for two or three months, then grow legs, lose their tails and hop onto land as tiny froglets.',
      { box: 'Frozen frogs', text: 'In winter, spring peepers hide under logs and leaves. Their bodies can partly freeze! A kind of sugar in their blood protects them, and in spring they thaw out and hop away.' },
      'When wetlands are drained to build roads or houses, peepers lose their homes. Protecting wetlands helps peepers and many other animals. You can help too: when you visit a wetland, stay on the trails, and never take frogs or eggs home.'
    ],
    guide: { before: 'If you can, listen to a recording of spring peepers, or visit a pond on a spring evening. Teach <b>wetland</b> and <b>vocal sac</b>. Follow the arrows of the life cycle together.',
      after: 'Is there a wetland near where you live? What animals might live there? What could people do to protect it?' },
    words: [['wetlands', 'land that is covered with shallow water for much of the year'], ['vocal sac', 'a stretchy pouch under a frog’s chin that makes its call louder']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Frogs are green.', 'Spring peepers are tiny wetland frogs with a loud call and an interesting life.', 'Ponds freeze in winter.', 'Tadpoles eat algae.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the stages in order.',
        items: ['eggs', 'tadpole', 'froglet', 'adult'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B3.2', half: true, q: 'In the sentence “Only the males sing,” which word is the verb?',
        opts: ['Only', 'males', 'sing'], a: 2 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The sac “blows up like a bubble gum balloon.” This comparison is a …',
        opts: ['simile', 'rhyme', 'question'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A frog<b>let</b> is a small frog. What is a pig<b>let</b>?',
        opts: ['a small pig', 'a large pig', 'a pig pen'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'How does a wetland meet the needs of spring peepers?', cols: ['Need', 'How the wetland meets it'],
        rows: [['a place to lay eggs', null], ['a place to hide', null], ['food', null]],
        a: [[null, 'water with underwater plants'], [null, 'plants, grasses and shrubs'], [null, 'plenty of insects']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How does a spring peeper survive a Canadian winter? Use details from the text.',
        a: 'It hides under logs and leaves, and its body can partly freeze. A sugar in its blood protects it until it thaws in spring.', look: 'the hiding place and the sugar that protects it' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'What does the writer want readers to think about wetlands? How can you tell?',
        a: 'The writer wants us to protect wetlands. The last paragraph says that draining them takes away the homes of peepers and other animals.', look: 'the writer’s message, with evidence' }
    ]
  });

  P.add({
    id: 'g4-bats', subject: 'science', form: 'Explanation',
    title: 'Seeing with Sound',
    deck: 'How bats use echoes to catch insects in the dark',
    hero: {
      photo: 'g4-little-brown-bat.jpg', credit: 'Photo: Don Pfritzer, U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 230,
      cap: 'A scientist gently spreads the wings of a little brown bat to study it.'
    },
    body: [
      'As the sun goes down on a summer evening, small dark shapes swoop and zigzag over lakes and backyards. They are not birds. They are bats, the only mammals that can truly fly. One of the most common bats in Canada is the little brown bat, which weighs about as much as two loonies.',
      { h: 'Hunting in the dark' },
      'Bats hunt flying insects at night, when it is too dark to see well. So how do they find a tiny mosquito in the air? They use sound. A bat makes very high squeaks, too high for people to hear. The sound travels out, hits an insect and bounces back as an <b>echo</b>. The bat’s big ears catch the echo. From how long the echo takes to come back, the bat can tell how far away the insect is and which way it is flying. Using echoes to find things is called <b>echolocation</b>.',
      { fig: '<path class="k" d="M20 70 Q30 56 40 66 Q50 56 60 70 Q50 64 40 76 Q30 64 20 70 Z"/>' +
          '<path class="a" d="M80 52 Q90 70 80 88 M110 42 Q124 70 110 98 M140 32 Q158 70 140 108"/>' +
          '<path class="d" d="M220 52 Q210 70 220 88 M196 58 Q188 70 196 82"/>' +
          '<path class="k" d="M250 70 L236 58 L238 82 Z M250 70 L264 58 L262 82 Z"/>' +
          D.label(10, 30, 'bat', 38, 64) + D.label(232, 30, 'insect', 250, 60) + D.label(60, 134, 'squeaks go out', 110, 98) + D.label(176, 134, 'echo comes back', 196, 82),
        tall: 140, cap: 'Echolocation: the squeak goes out, and the echo comes back.' },
      'As a bat closes in, it squeaks faster and faster, up to 200 times a second, until it snaps up its meal. One little brown bat can eat hundreds of insects in a single night, including many mosquitoes.',
      { box: 'Did you know?', text: 'Some moths can hear bat squeaks. When they do, they dive or tumble toward the ground to escape!' },
      { h: 'Bats in trouble' },
      'Many bats in Canada sleep through the winter in caves. In recent years, a disease called white-nose syndrome has killed millions of them. Scientists are working to stop it. People can help by never disturbing bats in caves and by putting up bat boxes where bats can rest in summer.',
      'Bats help plants too. In warm parts of the world, some bats drink nectar from flowers and carry pollen from one flower to the next, just as bees do. Without these bats, plants such as wild bananas and agave would have a hard time making seeds.',
      'Next time you see a bat at dusk, watch how it twists and turns in the air. It is not flying blind. It is listening to the night.'
    ],
    guide: { before: 'Play Marco Polo, or clap in a large empty room and listen for the echo. Teach <b>echo</b> and <b>echolocation</b>. Trace the sound out and back in the diagram.',
      after: 'Many people are afraid of bats. After reading, how do you feel about them? What would you tell a friend who thinks bats are scary?' },
    words: [['echo', 'a sound that bounces back off something'], ['echolocation', 'finding things by listening for echoes']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Bats are mammals.', 'Bats use echoes to find insects in the dark, and they need our help.', 'Moths can hear.', 'Mosquitoes bite.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps of echolocation in order.',
        items: ['The bat squeaks.', 'The sound hits an insect.', 'An echo bounces back.', 'The bat’s ears catch the echo.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what do the dashed lines show?',
        opts: ['the echo coming back', 'the bat’s path', 'the wind'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Read: “So how do they find a tiny mosquito in the air?” Who are <b>they</b>?',
        opts: ['bats', 'mosquitoes', 'people'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Echo</b>location joins two words. What does <b>location</b> mean?',
        opts: ['where something is', 'how loud something is', 'how fast something is'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['A moth hears a bat squeak.', null], ['White-nose syndrome spreads in caves.', null]],
        a: [[null, 'The moth dives or tumbles toward the ground to escape.'], [null, 'Millions of bats have died.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might a camper or a farmer be glad to have bats nearby? Use details from the text.',
        a: 'One bat can eat hundreds of insects in a night, including many mosquitoes, so there are fewer bugs to bite people or harm crops.', look: 'links bats eating insects to a benefit for people' },
      { k: 'lines', code: 'C1.3', n: 2, q: 'Why did the writer put the fact about moths in a box?',
        a: 'It is an extra, surprising fact that is not part of the main explanation, so the box makes it stand out.', look: 'the box holds an extra fact' }
    ]
  });

  P.add({
    id: 'g4-food-chain', subject: 'science', form: 'Explanation',
    title: 'Who Eats Whom?',
    deck: 'How energy passes from the sun to an owl, one meal at a time',
    hero: {
      photo: 'g4-great-horned-owl.jpg', credit: 'Photo: Paul Danese, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 230,
      cap: 'A great horned owl rests in a tree during the day. It hunts mostly at night.'
    },
    body: [
      'Every living thing needs energy to grow, move and stay alive. Plants get their energy from sunlight. Animals get theirs by eating plants or other animals. A <b>food chain</b> shows how energy passes from one living thing to the next.',
      { h: 'A forest food chain' },
      'Picture a forest in Ontario. Grasses and wildflowers grow in a sunny clearing and drop their seeds. A deer mouse nibbles the seeds. At night, a great horned owl swoops down silently and catches the mouse. So the food chain goes: sun, seeds, mouse, owl. Each arrow in a food chain means “is eaten by.”',
      { fig: '<circle class="a" cx="30" cy="50" r="14"/><path class="a" d="M30 28 V22 M30 72 V78 M8 50 H2 M52 50 H58"/>' +
          '<ellipse class="k" cx="98" cy="50" rx="4" ry="6"/><ellipse class="k" cx="108" cy="44" rx="4" ry="6"/><ellipse class="k" cx="112" cy="56" rx="4" ry="6"/>' +
          '<ellipse class="k" cx="178" cy="54" rx="16" ry="10"/><circle class="k" cx="192" cy="44" r="5"/><path class="k" d="M162 56 Q152 60 150 70"/>' +
          '<ellipse class="h" cx="262" cy="52" rx="16" ry="22"/><circle class="k" cx="256" cy="44" r="5"/><circle class="k" cx="268" cy="44" r="5"/><path class="k" d="M250 32 L253 22 L258 32 M274 32 L271 22 L266 32"/>' +
          D.arrow(62, 50, 86, 50) + D.arrow(124, 50, 146, 50) + D.arrow(208, 50, 238, 50) +
          '<text class="n" x="30" y="100" text-anchor="middle">sun</text><text class="n" x="105" y="100" text-anchor="middle">seeds</text><text class="n" x="178" y="100" text-anchor="middle">deer mouse</text><text class="n" x="262" y="100" text-anchor="middle">owl</text>' +
          '<text class="l" x="105" y="116" text-anchor="middle">producer</text><text class="l" x="178" y="116" text-anchor="middle">consumer</text><text class="l" x="262" y="116" text-anchor="middle">consumer</text>',
        tall: 126, cap: 'A forest food chain. Each arrow means “is eaten by.”' },
      'Plants are called <b>producers</b>, because they make their own food from sunlight. Animals are consumers, because they eat, or consume, other living things. The mouse eats plants, so it is a plant eater. The owl eats animals, so it is a meat eater, or predator.',
      { h: 'Silent hunters' },
      'Great horned owls are built for hunting. Their soft, fringed feathers let them fly without a sound. Their huge eyes see well in dim light, and their sharp ears can find a mouse moving under the snow. They swallow small prey whole. Later, they cough up a pellet of the bones and fur they could not digest.',
      'Scientists can open an owl pellet to find out what the owl has been eating. Tiny skulls, jaw bones and leg bones show which animals were part of its meals. It is a bit like solving a mystery, and it helps scientists learn about the whole food chain in a forest.',
      'Most living things are part of many food chains at once. A mouse is eaten by owls, foxes and snakes, and an owl eats mice, rabbits and even skunks! When food chains connect like this, they form a food web.',
      { box: 'Break the chain', text: 'If the mice in a forest disappeared, the owls would have less to eat. If the owls disappeared, there could be too many mice, and they might eat too many seeds. Every link in the chain matters.' }
    ],
    guide: { before: 'Make a paper chain with four links and write sun, seeds, mouse and owl on them. Teach <b>food chain</b> and <b>producer</b>. Explain that the arrow means “is eaten by.”',
      after: 'Make a food chain from something you ate today. Start with the sun. Which links are producers and which are consumers?' },
    words: [['food chain', 'the order in which living things eat each other, passing on energy'], ['producers', 'living things, such as plants, that make their own food']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Owls are birds.', 'A food chain shows how energy passes from one living thing to another.', 'Mice eat seeds.', 'The sun is hot.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the food chain in order.',
        items: ['sun', 'seeds', 'deer mouse', 'owl'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.3', half: true, q: 'In a food chain, what does each arrow mean?',
        opts: ['is eaten by', 'is bigger than', 'lives near'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are plants called producers?',
        opts: ['They make their own food from sunlight.', 'They eat animals.', 'They grow very tall.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Consume</b> means “eat.” A consum<b>er</b> is …',
        opts: ['one who eats', 'one who grows', 'one who sleeps'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'How is the owl built for hunting? Fill in the chart.', cols: ['Body part', 'How it helps'],
        rows: [['soft, fringed feathers', null], ['huge eyes', null], ['sharp ears', null]],
        a: [[null, 'It can fly without a sound.'], [null, 'It can see in dim light.'], [null, 'It can find a mouse moving under the snow.']] },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict what would happen to the forest if all the owls disappeared. Use the text.',
        a: 'There could be too many mice. They might eat too many seeds, so fewer new plants would grow.', look: 'a chain of effects taken from the text' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'In one or two sentences, summarize what a food chain is.',
        a: 'A food chain shows how energy moves from the sun to plants, and then to the animals that eat them.', look: 'a short summary with the sun, plants and animals' }
    ]
  });

  P.add({
    id: 'g4-spirit-bear', subject: 'geography', form: 'Report',
    title: 'The Spirit Bear',
    deck: 'A rare white bear and the rainforest it calls home',
    hero: {
      photo: 'g4-spirit-bear.jpg', credit: 'Photo: Jon Rawlinson, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A spirit bear in the Great Bear Rainforest. It is a black bear with white fur.'
    },
    body: [
      'On the rainy north coast of British Columbia lies one of the largest <b>temperate</b> rainforests left on Earth. It is called the Great Bear Rainforest. Here, giant red cedars and Sitka spruce grow taller than a 20-storey building, and moss covers almost everything. And here, if you are very lucky, you might see a white bear.',
      { h: 'A white black bear' },
      'The spirit bear, or Kermode bear, is not a polar bear. It is a black bear with white or cream fur. Both of its parents must carry a special <b>gene</b>, a tiny instruction inside the body, for white fur. Its brothers or sisters may be black. Only a few hundred spirit bears live in the world, almost all of them on a few islands in this rainforest.',
      { h: 'Salmon feed the forest' },
      'Every fall, salmon swim up the rainforest rivers. Bears catch the fish and often carry them into the woods to eat. The leftover bits rot and add nutrients to the soil, which helps the giant trees grow. In this way, the salmon, the bears and the forest are all connected.',
      { fig: '<rect class="h" x="0" y="112" width="300" height="22"/>' +
          '<path class="a" d="M50 123 Q62 115 74 123 Q62 131 50 123 Z M74 123 L82 117 V129 Z"/>' +
          '<ellipse class="k" cx="150" cy="78" rx="26" ry="14"/><circle class="k" cx="176" cy="66" r="8"/><path class="k" d="M132 90 V104 M144 92 V104 M158 92 V104 M168 90 V104"/>' +
          '<path class="k" d="M252 22 L230 72 H274 Z M252 72 V108"/>' +
          D.arrow(84, 112, 120, 90) + D.arrow(186, 70, 222, 60) +
          '<text class="n" x="66" y="150" text-anchor="middle">salmon swim upriver</text><text class="n" x="150" y="50" text-anchor="middle">bears catch them</text><text class="n" x="240" y="150" text-anchor="middle">leftovers feed the trees</text>',
        tall: 156, cap: 'Salmon, bears and trees are connected.' },
      { box: 'Keeping a secret', text: 'The Kitasoo/Xai’xais and Gitga’at First Nations have lived alongside spirit bears for thousands of years. For a long time, they did not tell outsiders about the white bears, to protect them from hunters.' },
      'In 2016, First Nations, the government of British Columbia and other groups agreed to protect most of the Great Bear Rainforest from logging. Today, people come from all over the world to see the spirit bear, and many local guides are First Nations people who know the land best.'
    ],
    guide: { before: 'Find the north coast of British Columbia on a map. Teach <b>temperate</b> and <b>gene</b>. Explain that a rainforest does not have to be hot; this one is cool and very wet.',
      after: 'Why do you think people work so hard to protect one rare bear? How does protecting the bear also protect the forest?' },
    words: [['temperate', 'not too hot and not too cold'], ['gene', 'a tiny instruction inside a living thing that decides features like fur colour']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Bears eat fish.', 'The spirit bear is a rare white black bear that lives in the Great Bear Rainforest.', 'Cedars are tall.', 'It rains a lot in British Columbia.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why can a spirit bear have black brothers and sisters?',
        opts: ['Not every cub gets the white-fur gene from both parents.', 'Black cubs are older.', 'The cubs live in different places.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what do the bears bring to the forest?',
        opts: ['salmon', 'water', 'seeds'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Show how salmon, bears and trees are connected.', cols: ['Step', 'What happens'],
        rows: [['1', null], ['2', null], ['3', null]],
        a: [[null, 'Salmon swim up the rivers.'], [null, 'Bears catch the salmon and carry them into the woods.'], [null, 'The leftovers rot and help the trees grow.']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Out</b>siders are people from …',
        opts: ['outside the group', 'inside the house', 'the far future'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'What does the heading “Salmon feed the forest” do?',
        opts: ['It tells what that part is about.', 'It gives a fun fact.', 'It names the photographer.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why did the First Nations keep the white bears a secret?',
        a: 'To protect the bears from hunters who might want to kill a rare white bear.', look: 'protection from hunters' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why does the writer say that many guides are First Nations people? What does this show?',
        a: 'It shows that First Nations people know the land best and still help take care of the bears and the forest today.', look: 'respect for First Nations knowledge and their role today' }
    ]
  });

  P.add({
    id: 'g4-fundy-tides', subject: 'geography', form: 'Report',
    title: 'The Highest Tides on Earth',
    deck: 'Why the Bay of Fundy fills and empties like a giant bathtub',
    hero: {
      photo: 'g4-hopewell-rocks.jpg', credit: 'Photo: Moneira Salic, CC BY 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'Visitors walk on the ocean floor at the Hopewell Rocks, New Brunswick, at low tide.'
    },
    body: [
      'Twice a day, the water in the Bay of Fundy, between New Brunswick and Nova Scotia, rises and falls more than anywhere else on Earth. In some places, the difference between low <b>tide</b> and high tide is about 16 metres. That is as tall as a four-storey building!',
      { h: 'Why the tides are so high' },
      'Tides are caused mostly by the pull of the Moon. As Earth spins, the ocean bulges toward the Moon, and the water level along the coast rises and falls. In most places, the change is only a metre or two. The Bay of Fundy is different because of its shape. It is long and narrow, and it gets shallower toward the end, like a funnel. When the tide comes in, about 100 billion tonnes of seawater are squeezed into the bay. The water has nowhere to go but up.',
      { fig: '<path class="k" d="M0 140 H300"/><path class="k" d="M126 140 L134 82 Q118 62 112 40 H188 Q182 62 166 82 L174 140 Z"/>' +
          '<path class="t" d="M120 40 L128 22 L136 40 M150 40 L158 18 L166 40 M172 40 L178 26 L184 40"/>' +
          '<path class="a" d="M10 66 H100 M200 66 H290"/><path class="d" d="M10 132 H100 M200 132 H290"/>' +
          '<text class="l" x="10" y="60">high tide</text><text class="l" x="10" y="126">low tide</text>' +
          D.arrow(250, 100, 250, 70) + D.arrow(250, 100, 250, 128) + '<text class="n" x="258" y="104">16 m</text>',
        tall: 146, cap: 'A sea stack at high tide and at low tide.' },
      { h: 'Walking on the ocean floor' },
      'At the Hopewell Rocks in New Brunswick, the tides have carved tall rock towers called <b>sea stacks</b>. Some have trees growing on top and look like giant flowerpots. At low tide, visitors climb down stairs and walk on the muddy ocean floor between the rocks. About six hours later, the same spot is under water, and people explore it by kayak instead.',
      { box: 'Stay safe', text: 'The tide comes in quickly. Visitors must check the tide times and leave the ocean floor well before the water returns.' },
      'The tides also shape life in the bay. The mud flats are full of tiny animals called mud shrimp. Each summer, hundreds of thousands of shorebirds stop here to feast on them before flying all the way to South America.',
      { h: 'Power from the tides' },
      'All that moving water carries a lot of energy. Engineers have tested ways to use the tides of the Bay of Fundy to make electricity. At Annapolis Royal in Nova Scotia, a tidal power station worked for more than 30 years. Scientists are still studying how to use tidal power without harming fish and other sea life.'
    ],
    guide: { before: 'Find the Bay of Fundy on a map and notice its funnel shape. Teach <b>tide</b> and <b>sea stack</b>. If you can, pour water into a funnel and watch it rise in the narrow part.',
      after: 'Would you rather visit the Hopewell Rocks at low tide or at high tide? What would you see and do?' },
    words: [['tide', 'the rising and falling of the sea, about twice a day'], ['sea stacks', 'tall towers of rock left standing in the sea']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['New Brunswick has rocks.', 'The Bay of Fundy has the highest tides on Earth because of its shape.', 'Shorebirds fly south.', 'Kayaks are fun.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How much higher is high tide than low tide?',
        opts: ['about 16 metres', 'about 2 metres', 'about 100 metres'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are the tides in the Bay of Fundy so high?',
        opts: ['The bay is long, narrow and shaped like a funnel.', 'The water is very cold.', 'It rains a lot there.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“The water has nowhere to go but up.” What does this mean?',
        opts: ['The water is squeezed, so it has to rise.', 'The water flies into the sky.', 'The water stops moving.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Sea</b>water is a compound word. Which word is also a compound word?',
        opts: ['shorebird', 'muddy', 'visitor'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the same spot at the Hopewell Rocks.', cols: ['', 'At low tide', 'At high tide'],
        rows: [['What covers the ground', null, null], ['How people explore', null, null]],
        a: [[null, 'mud', 'seawater'], [null, 'They walk on the ocean floor.', 'They paddle kayaks.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why must visitors check the tide times? Use details from the text.',
        a: 'The tide comes in quickly, and the ocean floor is under water about six hours later, so people could be trapped by the water.', look: 'speed of the tide and the danger of being trapped' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict what might happen to the shorebirds if the mud shrimp disappeared.',
        a: 'They would not have enough food to give them energy for the long flight to South America, so many might not make it.', look: 'a prediction that links food to the long flight' }
    ]
  });

  P.add({
    id: 'g4-canadian-shield', subject: 'geography', form: 'Explanation',
    title: 'Canada’s Rocky Shield',
    deck: 'How ancient rock and moving ice shaped half of Canada',
    hero: {
      photo: 'g4-canadian-shield.jpg', credit: 'Photo: Oaktree b, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 65%',
      tall: 230,
      cap: 'Bare rock, pine trees and clear water on Georgian Bay, Ontario: the Canadian Shield.'
    },
    body: [
      'Look at a map of Canada, and you will see a huge area shaped like a horseshoe wrapped around Hudson Bay. This is the Canadian Shield. It covers about half of the country, from northern Saskatchewan to Labrador, and it includes much of northern Ontario and Quebec.',
      { h: 'Very old rock' },
      'The Shield is made of some of the oldest rock on Earth. Some of it is about four billion years old. Long ago, there were tall mountains here, but wind, water and ice slowly wore them down. Then, during the last ice age, giant <b>glaciers</b>, thick sheets of ice, slid over the land. They scraped away the soil and scratched the bare rock. When the ice melted, it left behind thousands of lakes in the hollows it had dug.',
      { fig: '<path class="k" d="M0 120 Q35 112 70 120 T140 120"/><path class="h" d="M0 60 H110 Q136 80 128 114 H0 Z"/>' + D.arrow(20, 44, 110, 44) +
          '<text class="l" x="20" y="36">the glacier moves</text>' +
          '<path class="k" d="M160 120 H192 Q230 152 268 120 H300"/><path class="h" d="M196 124 Q230 146 264 124 Z"/>' +
          '<path class="k" d="M172 120 L178 94 L184 120 M278 120 L284 90 L290 120"/>' +
          '<text class="n" x="66" y="150" text-anchor="middle">1. Ice scrapes the rock.</text><text class="n" x="230" y="162" text-anchor="middle">2. A lake fills the hollow.</text>',
        tall: 166, cap: 'How glaciers left thousands of lakes on the Shield.' },
      { h: 'Living on the Shield' },
      'The Shield is not good for farming, because the soil is thin and rocky. But it is rich in other ways. Its forests provide wood, its fast rivers make electricity, and its rock holds <b>minerals</b> such as nickel, gold and copper. Towns like Sudbury and Timmins grew up around mines. Mining has brought jobs, but it has also caused problems. In the past, smoke from smelters harmed the land around some mining towns. Today, mines must follow rules to protect the water, air and wildlife, and some damaged areas have been replanted with trees.',
      { box: 'Did you know?', text: 'Many paintings by the Group of Seven, a famous group of Canadian artists, show the rocky lakes and windswept pines of the Shield.' },
      'For thousands of years, First Nations such as the Anishinaabe and the Cree have lived on the Shield. They travelled its lakes and rivers by canoe, and they still hunt, fish and gather there today. Many people from cities visit the Shield too, to canoe, camp and enjoy its wild beauty.'
    ],
    guide: { before: 'Find Hudson Bay on a map of Canada and trace the horseshoe shape around it. Teach <b>glacier</b> and <b>mineral</b>. Look at the photo: what do you notice about the ground?',
      after: 'Would you rather live on the Canadian Shield or on the flat Prairies? Give two reasons.' },
    words: [['glaciers', 'huge, thick sheets of ice that move slowly over land'], ['minerals', 'useful materials found in rock, such as gold or nickel']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Hudson Bay is cold.', 'The Canadian Shield is a huge area of ancient rock, shaped by glaciers and rich in resources.', 'Sudbury has a mine.', 'Pine trees grow on rock.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the events in order.',
        items: ['A glacier slides over the land.', 'It scrapes away soil and digs hollows.', 'The ice melts.', 'Lakes fill the hollows.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is the Shield not good for farming?',
        opts: ['The soil is thin and rocky.', 'It is too hot.', 'There is no water.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'How do people use the Shield? Fill in the chart.', cols: ['Resource', 'How people use it'],
        rows: [['forests', null], ['fast rivers', null], ['rock', null]],
        a: [[null, 'for wood'], [null, 'to make electricity'], [null, 'to mine minerals such as nickel, gold and copper']] },
      { k: 'choice', code: 'B2.2', half: true, q: 'Rock<b>y</b> means “full of rocks.” What does sand<b>y</b> mean?',
        opts: ['full of sand', 'without sand', 'a kind of sand'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'This text tells how the Shield formed and how people use it. What kind of text is it?',
        opts: ['an explanation', 'a diary', 'a poem'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why are there so many lakes on the Shield?',
        a: 'Glaciers dug hollows in the rock, and when the ice melted, water filled the hollows.', look: 'glaciers dug hollows that filled with water' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The text says the Shield is “not good for farming” but “rich in other ways.” Do you agree? Explain with details.',
        a: 'Yes. The soil is thin, but the Shield has forests for wood, rivers for electricity, minerals for mining and beautiful places to canoe and camp.', look: 'an opinion supported with two details' }
    ]
  });

  P.add({
    id: 'g4-timbuktu', subject: 'history', form: 'Report',
    title: 'The City of Gold and Books',
    deck: 'Timbuktu, a great city of the Mali Empire 700 years ago',
    hero: {
      photo: 'g4-timbuktu.jpg', credit: 'Photo: Ondřej Havelka, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 230,
      cap: 'The Djinguereber Mosque in Timbuktu, Mali. Its walls are made of mud bricks.'
    },
    body: [
      'About 700 years ago, one of the richest kingdoms in the world was in West Africa. It was the Mali Empire, and one of its greatest cities was Timbuktu, near the edge of the Sahara Desert.',
      { h: 'A city of trade' },
      'Timbuktu grew rich from trade. Camel <b>caravans</b>, long lines of camels carrying goods, crossed the desert from the north with salt, cloth and books. Boats came along the Niger River from the south with gold, ivory and grain. Traders met in Timbuktu to buy and sell. Salt was so valuable that it was sometimes traded for gold!',
      { fig: '<rect class="h" x="0" y="0" width="300" height="54"/><text class="lb" x="10" y="18">Sahara Desert</text>' +
          '<path class="a" d="M10 118 Q100 82 150 92 Q210 102 290 140"/><circle class="k" cx="150" cy="80" r="6"/>' +
          D.arrow(150, 26, 150, 70) + '<text class="n" x="158" y="40">salt, cloth, books</text>' +
          D.arrow(230, 136, 162, 88) + '<text class="n" x="170" y="150">gold, ivory, grain</text>' +
          '<text class="l" x="138" y="76" text-anchor="end">Timbuktu</text><text class="l" x="10" y="134">Niger River</text>',
        tall: 156, cap: 'Goods came to Timbuktu across the desert and along the river.' },
      { h: 'The richest king' },
      'Mali’s most famous ruler was Mansa Musa. In 1324, he made a long journey to the city of Mecca. He brought so much gold and gave so much away that people talked about him for hundreds of years. When he came home, he ordered a great mosque to be built in Timbuktu. The Djinguereber Mosque, made of mud bricks and wood, still stands today. Each year, people in the city help to cover its walls with fresh mud to keep it strong.',
      { h: 'A city of learning' },
      'Timbuktu was also a centre of learning. Scholars came from far away to study mathematics, medicine, astronomy and law. Families copied and collected thousands of handwritten books called <b>manuscripts</b>, and they have protected them for hundreds of years. The manuscripts are written mostly in Arabic. They include books about the stars, recipes for medicines, poems, letters and even advice on how to settle arguments fairly. They show that West Africa was home to great writers and thinkers long ago.',
      { box: 'Saving the books', text: 'In 2012, during a war, librarians in Timbuktu secretly packed hundreds of thousands of manuscripts into boxes and carried them to safety.' },
      'Today, Timbuktu is a small, quiet town at the edge of the desert. But its old mosques and its manuscripts still remind the world of the great empire that once traded gold and salt across the Sahara.'
    ],
    guide: { before: 'Find Mali, the Sahara Desert and the Niger River on a map or globe. Teach <b>caravan</b> and <b>manuscript</b>. Talk about why salt was so valuable before fridges.',
      after: 'The librarians risked their safety to save old books. What is something from the past that you think is worth protecting? Why?' },
    words: [['caravans', 'groups of traders travelling together with their animals'], ['manuscripts', 'books or papers written by hand']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Camels cross deserts.', 'Timbuktu was a rich trading city and a great centre of learning in the Mali Empire.', 'Salt is white.', 'Mansa Musa went to Mecca.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. What came to Timbuktu from the north?',
        opts: ['salt, cloth and books', 'gold, ivory and grain', 'fish'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Timbuktu become rich?',
        opts: ['Traders met there to buy and sell.', 'It had the biggest farms.', 'It was beside the ocean.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Timbuktu was a city of trade and a city of learning. Give two details for each.', cols: ['City of trade', 'City of learning'],
        rows: [[null, null], [null, null]],
        a: [['Camel caravans brought salt, cloth and books.', 'Scholars studied mathematics, medicine and law.'], ['Boats brought gold, ivory and grain.', 'Families collected thousands of manuscripts.']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Manu</b>script has a part that means “hand.” Which word also has <b>manu</b>, meaning “hand”?',
        opts: ['manual', 'many', 'menu'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do people put fresh mud on the mosque each year?',
        opts: ['to keep it strong', 'to change its colour', 'to make it taller'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why do you think the librarians took such a big risk to save the manuscripts?',
        a: 'The manuscripts are hundreds of years old and hold the history and knowledge of the people. If they were lost, that knowledge would be gone forever.', look: 'the value of the books as history and knowledge' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'In one or two sentences, summarize why Timbuktu was important.',
        a: 'Timbuktu was a rich trading city in the Mali Empire and a famous centre of learning, full of scholars and books.', look: 'both trade and learning' }
    ]
  });

  P.add({
    id: 'g4-olympia', subject: 'history', form: 'Report',
    title: 'The First Olympic Games',
    deck: 'Races, wrestling and olive crowns in ancient Greece',
    hero: {
      photo: 'g4-olympia.jpg', credit: 'Photo: dronepicr, CC BY 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 230,
      cap: 'The ancient stadium at Olympia, Greece, as it looks today. Fans sat on the grassy slopes.'
    },
    body: [
      'More than 2 700 years ago, athletes from all over ancient Greece travelled to a place called Olympia. They came to race, wrestle and throw in a festival to honour Zeus, the king of the Greek gods. These were the first Olympic Games. People say they began in 776 BCE, and they were held every four years for more than a thousand years.',
      { h: 'One race at first' },
      'At first, there was only one event: a sprint of about 192 metres, the length of the stadium. Later, the Games added longer races, wrestling, boxing, chariot races and the <b>pentathlon</b>, a contest of five events: running, jumping, wrestling, and throwing the discus and the javelin.',
      { fig: '<rect class="h" x="10" y="14" width="280" height="22"/><rect class="k" x="10" y="36" width="280" height="40"/><rect class="h" x="10" y="76" width="280" height="22"/>' +
          '<path class="a" d="M24 36 V76 M276 36 V76"/><text class="n" x="150" y="61" text-anchor="middle">track: about 192 metres</text>' +
          D.label(14, 124, 'start', 24, 70) + D.label(250, 124, 'finish', 276, 70) + D.label(100, 124, 'grassy slopes for fans', 150, 90),
        tall: 130, cap: 'A plan of the stadium at Olympia, seen from above.' },
      { h: 'A time of peace' },
      'The Greek city-states often fought one another. But before each Games, messengers announced a <b>truce</b>, a promise not to fight. This let athletes and fans travel safely to Olympia. Up to 45 000 people sat on the grassy slopes around the stadium to watch.',
      'Winners did not get medals. Instead, each winner received a crown made of olive leaves, cut from a sacred tree at Olympia. Back home, winners were treated as heroes. Only men who spoke Greek and were not enslaved could take part, and married women were not even allowed to watch.',
      'Athletes trained for months before the Games, and runners raced barefoot on the sandy track. Judges watched closely, and anyone caught cheating had to pay a fine. The money was used to make bronze statues of Zeus, which lined the path into the stadium, with the cheaters’ names carved on them for everyone to see.',
      { box: 'The Games return', text: 'The ancient Games ended about 1 600 years ago. In 1896, the modern Olympic Games began in Athens, Greece. Canada has hosted them three times: in Montréal, Calgary and Vancouver.' },
      'Before every Olympic Games, a flame is still lit at Olympia, using the sun’s rays and a curved mirror. Then runners carry it, torch to torch, all the way to the city where the Games will be held.'
    ],
    guide: { before: 'Ask what the child knows about the Olympic Games today. Teach <b>pentathlon</b> and <b>truce</b>. Find Greece on a map.',
      after: 'How are the ancient Games and today’s Games alike? How are they different? Which would you rather watch?' },
    words: [['pentathlon', 'a contest made up of five different events'], ['truce', 'an agreement to stop fighting for a time']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Zeus was a Greek god.', 'The first Olympic Games were held in ancient Greece, in honour of Zeus.', 'Olive trees grow in Greece.', 'Canada hosted the Games.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How long was the first race?',
        opts: ['about 192 metres', 'about 45 metres', 'about 2 700 metres'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Penta</b> means five. How many sides does a <b>penta</b>gon have?',
        opts: ['five', 'four', 'six'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why was the truce important?',
        opts: ['It let people travel safely to Olympia.', 'It made the races faster.', 'It gave winners a prize.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which heading tells you where to read about the truce?',
        opts: ['A time of peace', 'One race at first', 'The Games return'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the ancient Games with the Games today.', cols: ['', 'Ancient Games', 'Games today'],
        rows: [['Prize for winners', null, null], ['Who can take part', null, null]],
        a: [[null, 'a crown of olive leaves', 'medals'], [null, 'only Greek-speaking men who were not enslaved', 'women and men from countries all over the world']] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Who could not take part in the ancient Games? Do you think this was fair? Explain.',
        a: 'Women, enslaved people and people who did not speak Greek could not take part. It was not fair, because everyone should have a chance to compete.', look: 'names who was left out and gives a reasoned opinion' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why do you think an olive crown meant so much to the winners?',
        a: 'It came from a sacred tree at Olympia and showed everyone that they were a champion, so they were treated as heroes.', look: 'the meaning of the crown, not its value in money' }
    ]
  });

  P.add({
    id: 'g4-silk-road', subject: 'history', form: 'Report',
    title: 'Along the Silk Road',
    deck: 'How silk, paper and ideas travelled across Asia',
    hero: {
      photo: 'g4-tang-camel.jpg', credit: 'Photo: Wikipedia Loves Art participant Opal_Art_Seekers_4, CC BY 2.5, Wikimedia Commons', focus: '50% 40%',
      tall: 230,
      cap: 'A pottery camel and its handler from China, made about 1 300 years ago. Look at the bundles on its back.'
    },
    body: [
      'For more than a thousand years, a web of <b>trade</b> routes stretched across Asia, linking China to the Middle East and Europe. Today we call it the Silk Road. It was not one road but many paths over mountains, deserts and grasslands.',
      { h: 'Silk and more' },
      'China was famous for silk, a smooth, shiny cloth made from the cocoons of silkworms. For a long time, only the Chinese knew how to make it, and they kept the method a secret. People far to the west paid high prices for silk. Traders also carried tea, paper, spices, glass, horses and jewels along the routes.',
      { fig: '<path class="t" d="M120 58 L132 36 L144 58 L156 30 L168 58"/><rect class="h" x="196" y="80" width="64" height="24"/>' +
          '<path class="k" d="M30 90 Q80 60 130 76 T220 72 Q250 68 280 82"/>' +
          '<circle class="dot" cx="30" cy="90" r="4"/><circle class="dot" cx="130" cy="76" r="4"/><circle class="dot" cx="220" cy="72" r="4"/><circle class="dot" cx="280" cy="82" r="4"/>' +
          '<text class="n" x="10" y="112">the west</text><text class="n" x="290" y="104" text-anchor="end">China</text>' +
          '<text class="l" x="144" y="24" text-anchor="middle">mountains</text><text class="l" x="228" y="120" text-anchor="middle">desert</text>' +
          D.label(40, 140, 'stopping places', 130, 80),
        tall: 146, cap: 'One of the many Silk Road routes, from China to the west.' },
      { h: 'Ships of the desert' },
      'Few traders travelled the whole way. Instead, goods passed from trader to trader, city to city, like a long relay race. Many traders crossed the deserts with Bactrian camels, which have two humps. These camels can go many days without water, carry heavy loads and survive both hot days and freezing nights. Travellers rested at roadside inns called <b>caravanserais</b>, where people and animals could find water, food and shelter.',
      { h: 'Trading ideas' },
      'The Silk Road carried more than goods. Travellers shared ideas, languages, music, stories and religions. Papermaking spread from China to the west. New foods, such as grapes, travelled east. Sadly, diseases travelled too.',
      'One famous traveller was Xuanzang, a Buddhist monk from China who walked the Silk Road about 1 400 years ago. His journey to India and back took about 17 years. He carried home hundreds of books and wrote about the places and people he saw, which helped people in China learn about lands far away.',
      { box: 'Look closely', text: 'The pottery camel in the photo was made to be placed in a tomb. Artists in China made many camels like it, which shows how important camels were to trade.' }
    ],
    guide: { before: 'Find China, the Middle East and Europe on a globe and trace a path between them. Teach <b>trade</b> and <b>caravanserai</b>. If you have something made of silk, let the child feel it.',
      after: 'Today, how do goods from far away get to your home? How is that like the Silk Road? How is it different?' },
    words: [['trade', 'buying, selling or swapping goods'], ['caravanserais', 'roadside inns where traders and their animals rested']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Camels have two humps.', 'The Silk Road was a web of routes that carried goods and ideas across Asia.', 'Silk is shiny.', 'Grapes travelled east.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did people in the west pay high prices for silk?',
        opts: ['Only the Chinese knew how to make it.', 'It was very heavy.', 'It was made of gold.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. What did this route cross?',
        opts: ['mountains and a desert', 'an ocean', 'an ice field'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'What travelled along the Silk Road? Give two of each.', cols: ['Goods', 'Ideas'],
        rows: [[null, null], [null, null]],
        a: [['silk, tea, paper or spices', 'languages or music'], ['glass, horses or jewels', 'stories or religions']] },
      { k: 'choice', code: 'C3.1', half: true, q: 'Goods passed along “like a long relay race.” This means …',
        opts: ['each trader carried goods part of the way', 'traders raced each other', 'the camels ran fast'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Silkworm, papermaking and grasslands are all …',
        opts: ['compound words', 'words with prefixes', 'names of places'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why were Bactrian camels good for crossing the desert? Give two reasons from the text.',
        a: 'They can go many days without water and carry heavy loads. They can also survive hot days and freezing nights.', look: 'two reasons from the text' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'The writer says, “Sadly, diseases travelled too.” Why do you think the writer included this?',
        a: 'To show that the Silk Road brought bad things as well as good things, so readers get a fair picture.', look: 'a balanced picture of good and bad' }
    ]
  });

  P.add({
    id: 'g4-recycling', subject: 'tech', form: 'Explanation',
    title: 'Where Does Recycling Go?',
    deck: 'How a jumble from your blue bin is sorted and made into something new',
    hero: {
      photo: 'g4-recycling.jpg', credit: 'Photo: City of Greenville, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 240,
      cap: 'Bales of sorted recycling at a sorting plant, ready to be sold to factories.'
    },
    body: [
      'Every week, families across Canada put out blue bins full of cans, bottles, boxes and newspapers. A truck takes it all away. But where does it go, and how does a jumble of old containers become something new?',
      { h: 'At the sorting plant' },
      'The truck delivers the recycling to a <b>sorting</b> plant. Everything is dumped onto moving belts, and machines and workers separate it into groups. Spinning screens let flat paper slide off one way while bottles and cans roll another. A strong magnet lifts out steel cans. Another machine uses spinning magnets to push aluminum cans off the belt. Cameras and puffs of air pick out different kinds of plastic. Workers pull out things that do not belong, such as plastic bags, which tangle the machines.',
      { fig: '<rect class="k" x="6" y="44" width="46" height="40" rx="4"/><text class="n" x="29" y="100" text-anchor="middle">bin</text>' + D.arrow(54, 64, 74, 84) +
          '<path class="k" d="M70 90 H290 M70 104 H290"/>' + [80, 110, 140, 170, 200, 230, 260].map(function (x) { return '<circle class="t" cx="' + x + '" cy="97" r="5"/>'; }).join('') +
          '<path class="a" d="M128 34 V54 Q140 70 152 54 V34"/><text class="n" x="140" y="26" text-anchor="middle">magnet pulls steel</text>' +
          '<path class="d" d="M206 126 L210 108 M216 126 L218 108 M226 126 L226 108"/><text class="n" x="216" y="140" text-anchor="middle">air puffs sort plastic</text>' +
          '<rect class="h" x="262" y="54" width="32" height="30"/><text class="n" x="278" y="46" text-anchor="middle">bales</text>',
        tall: 146, cap: 'Inside a sorting plant. Each material is pulled out in a different way.' },
      { h: 'Bales and new things' },
      'Each sorted material is squashed into giant blocks called <b>bales</b>, like the ones in the photo. The bales are sold to factories that turn them into new products. Old paper becomes new boxes and egg cartons. Aluminum cans are melted and made into new cans, sometimes in as little as two months. Plastic bottles can become fleece jackets, carpets or new bottles. Glass jars are crushed and melted to make new jars.',
      { box: 'Clean and empty', text: 'Rinse containers before you put them in the bin. Food and liquids can spoil a whole bale of paper.' },
      'Recycling saves energy and resources. Making a can from recycled aluminum uses much less energy than making one from new metal dug out of the ground. But the best choice is to make less waste in the first place: reduce, reuse, then recycle.',
      'Not everything can be recycled in every town. Each city has its own list of what goes in the blue bin, because each sorting plant has different machines. Check your city’s list, and when you are not sure, ask. Putting the wrong things in the bin can make a whole load harder to recycle.'
    ],
    guide: { before: 'Look in your own recycling bin together and sort what you find into paper, metal and plastic. Teach <b>sort</b> and <b>bale</b>. Use a fridge magnet to test which cans are steel.',
      after: 'What is one way your family could make less waste? Think of something you could reuse instead of throwing away.' },
    words: [['sorting', 'putting things into groups that belong together'], ['bales', 'large blocks of material pressed tightly together']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Trucks are loud.', 'Recycling is sorted at a plant, pressed into bales and made into new things.', 'Magnets pick up steel.', 'Paper is flat.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in order.',
        items: ['Families fill their blue bins.', 'A truck takes the recycling to a sorting plant.', 'Machines and workers sort it.', 'Each material is pressed into bales.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what pulls out steel cans?',
        opts: ['a magnet', 'puffs of air', 'a worker'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'How is each thing pulled out? Fill in the chart.', cols: ['Thing', 'How it is pulled out'],
        rows: [['steel cans', null], ['aluminum cans', null], ['plastic bags', null]],
        a: [[null, 'A strong magnet lifts them out.'], [null, 'Spinning magnets push them off the belt.'], [null, 'Workers pull them out by hand.']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why should you rinse containers?',
        opts: ['Food and liquids can spoil a bale of paper.', 'To make them shiny.', 'So they weigh more.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Recycl<b>able</b> means “able to be recycled.” What does wash<b>able</b> mean?',
        opts: ['able to be washed', 'already washed', 'never washed'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The writer says the best choice is “to make less waste in the first place.” Why might this be better than recycling?',
        a: 'Recycling still uses trucks, machines and energy. If we make less waste, we save even more energy and resources.', look: 'recycling still uses energy, so making less waste saves more' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict what would happen at the plant if many people put plastic bags in their blue bins.',
        a: 'The bags would tangle the machines, so workers would have to stop and clear them, and sorting would slow down.', look: 'a prediction based on the bags tangling machines' }
    ]
  });

  P.add({
    id: 'g4-longer-recess', subject: 'health', form: 'Opinion',
    title: 'Give Us Ten More Minutes',
    deck: 'A Grade 4 student makes the case for a longer recess',
    hero: {
      photo: 'g4-playground.jpg', credit: 'Photo: Hameltion, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 240,
      cap: 'A climbing wall in a school playground, waiting for recess.'
    },
    body: [
      'By the time the recess bell rings, many students have been sitting for two hours. Then, after only fifteen minutes outside, the bell rings again. I think recess should be at least 25 minutes long. Our school day has five hours of lessons but only fifteen minutes of free play in the morning. Here are three reasons why that should change.',
      { h: 'Moving helps us learn' },
      'First, our bodies and brains need to move. Doctors say children should be active for at least 60 minutes every day. Running, climbing and jumping get blood and oxygen flowing to the brain. When students come back from active play, many find it easier to sit still and pay attention. Being outside helps too. Fresh air and daylight can lift our mood, and climbing and running build strong muscles and bones.',
      { fig: '<text class="n" x="0" y="30">now</text><rect class="t" x="70" y="18" width="38" height="16"/><text class="n" x="114" y="30">15 min</text>' +
          '<text class="n" x="0" y="62">my idea</text><rect class="h" x="70" y="50" width="62" height="16"/><text class="n" x="138" y="62">25 min</text>' +
          '<text class="n" x="0" y="94">daily goal</text><rect class="k" x="70" y="82" width="150" height="16"/><text class="n" x="226" y="94">60 min</text>' +
          '<path class="k" d="M70 10 V104"/>',
        tall: 110, cap: 'Minutes of recess now, the writer’s idea, and the daily activity goal for children.' },
      { h: 'Recess builds friendships' },
      'Second, recess is when we learn to get along. On the playground, we make up games, take turns, share equipment and solve arguments without a teacher telling us what to do. These are important life skills. Fifteen minutes is barely enough time to choose teams before the game is over. A longer recess would also give us time to invite someone new to join in.',
      { h: 'A break for our minds' },
      'Third, everyone needs a break. Adults take breaks at work to stretch, chat or get fresh air. Children need breaks too. A longer recess gives our minds time to rest, so we come back <b>refreshed</b> and ready to learn.',
      'Some people worry that a longer recess means less time for learning. But a few extra minutes outside could make the rest of the day more <b>productive</b>, because rested students get more done. Please give students ten more minutes to play. Our brains, our bodies and our friendships will thank you.',
      { box: 'Did you know?', text: 'Canada’s activity guidelines say that children and teens should get at least 60 minutes of heart-pumping activity every day.' }
    ],
    guide: { before: 'Ask: how long is recess at your school? Is it long enough? Teach <b>refreshed</b> and <b>productive</b>. Explain that an opinion piece tries to persuade the reader.',
      after: 'Do you agree with the writer? What is one more reason you could add, for or against a longer recess?' },
    words: [['refreshed', 'feeling rested and full of energy again'], ['productive', 'getting a lot of good work done']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This is an opinion piece. How can you tell?',
        opts: ['The writer gives an opinion and reasons to persuade the reader.', 'It tells a made-up story.', 'It gives steps to follow.', 'It rhymes.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the writer’s reasons.', cols: ['Reason', 'One detail that supports it'],
        rows: [['Moving helps us learn.', null], ['Recess builds friendships.', null], ['Everyone needs a break.', null]],
        a: [[null, 'Active play sends blood and oxygen to the brain, so students pay attention better.'], [null, 'We take turns, share and solve arguments ourselves.'], [null, 'Adults take breaks at work, and a break lets our minds rest.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the bar graph. How many more minutes does the writer want?',
        opts: ['10', '25', '60'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Words like “First,” “Second” and “Third” help the reader …',
        opts: ['follow the reasons in order', 'find the photo', 'learn new words'], a: 0 },
      { k: 'choice', code: 'C3.5', half: true, q: 'Who is the writer most likely trying to persuade?',
        opts: ['the people who decide how long recess is', 'doctors', 'little children'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Re</b>freshed means fresh again. Which prefix means “again”?',
        opts: ['re-', 'un-', 'dis-'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'How did you decide whether the writer’s reasons are strong? What did you check?',
        a: 'I checked whether each reason had a fact to back it up. The first reason uses what doctors say and the 60-minute guideline, so it is strong. The third reason has fewer facts.', look: 'a way of checking reasons (facts, examples, the graph) applied to this text' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The writer mentions what “some people worry” about. Why is it smart to include the other side?',
        a: 'It shows the writer has thought about the other side and can answer it. That makes the argument stronger and more fair.', look: 'answering the other side makes the argument stronger' }
    ]
  });

  P.add({
    id: 'g4-ice-safety', subject: 'health', form: 'Explanation',
    title: 'Is the Ice Safe?',
    deck: 'How to check the ice, and what to do if it breaks',
    hero: {
      photo: 'g4-thin-ice.jpg', credit: 'Photo: Nolabob, CC0, Wikimedia Commons', focus: '50% 60%',
      tall: 240,
      cap: 'A sign warns of thin ice at the edge of a partly frozen pond.'
    },
    body: [
      'In winter, frozen ponds, lakes and rivers can be wonderful places to skate, play hockey or go ice fishing. But every year in Canada, people fall through ice that looks solid. Knowing how to check the ice, and what to do if you fall in, can save a life.',
      { h: 'Check before you step' },
      'Ice is not the same <b>thickness</b> everywhere. It is thinner near the shore, over moving water, and near docks, rocks and plants. Never go onto ice alone. Always ask an adult to check it first, or skate on a rink that is tested and marked safe. Look at the colour, too. Clear blue ice is the strongest. White ice is weaker, and grey ice is unsafe because it has water in it. Even thick ice can be weak in early winter or in spring, when it starts to melt. If you see cracks, open water or slushy spots, stay off.',
      { fig: '<path class="k" d="M10 120 H290"/><rect class="h" x="30" y="60" width="50" height="60"/><rect class="h" x="125" y="40" width="50" height="80"/><rect class="h" x="220" y="20" width="50" height="100"/>' +
          '<text class="lb" x="55" y="54" text-anchor="middle">15 cm</text><text class="lb" x="150" y="34" text-anchor="middle">20 cm</text><text class="lb" x="245" y="14" text-anchor="middle">25 cm</text>' +
          '<text class="n" x="55" y="136" text-anchor="middle">one person</text><text class="n" x="150" y="136" text-anchor="middle">a group skating</text><text class="n" x="245" y="136" text-anchor="middle">a snowmobile</text>',
        tall: 142, cap: 'How thick clear, solid ice should be (Canadian Red Cross guide).' },
      { h: 'If you fall through' },
      'If you fall in, stay calm and keep your head above water. Turn back toward the direction you came from, because that ice held you before. Put your arms on the ice and kick your legs hard, like a swimmer, to slide yourself out onto your stomach. Then roll away from the hole, staying flat to spread out your weight. Do not stand up until you reach thick ice or land.',
      { box: 'Never run onto the ice', text: 'If someone else falls in, do not go near the hole. Call 911 and reach out with a long branch, rope or hockey stick from the shore.' },
      'Cold water cools your body much faster than cold air. If your body gets too cold, you can get <b>hypothermia</b>, a dangerous drop in body temperature. Get out quickly, then go somewhere warm and change into dry clothes. Remember: when in doubt, stay out!',
      'Before you go out on the ice, tell an adult where you are going and when you will be back. Wear a helmet when you skate, and dress in warm layers.'
    ],
    guide: { before: 'Ask where the child skates in winter, and who checks the ice. Teach <b>thickness</b> and <b>hypothermia</b>. Use a ruler to show 15 cm.',
      after: 'Practise the steps for getting out of the water, lying on the floor. Then talk about how to help someone else safely.' },
    words: [['thickness', 'how thick something is, from top to bottom'], ['hypothermia', 'a dangerous drop in body temperature']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Hockey is fun.', 'Knowing how to check ice and what to do if you fall in can keep you safe.', 'Ice is blue.', 'Ponds freeze in winter.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. How thick should the ice be for a group to skate?',
        opts: ['20 cm', '15 cm', '25 cm'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why should you turn back the way you came?',
        opts: ['That ice held you before.', 'It is closer to the net.', 'The water is warmer there.'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps for getting out.',
        items: ['Stay calm and turn back the way you came.', 'Put your arms on the ice and kick.', 'Slide out onto your stomach.', 'Roll away from the hole.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Un</b>safe means not safe. What does <b>un</b>tested mean?',
        opts: ['not tested', 'tested twice', 'tested well'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'What does the colour of ice tell you? Fill in the chart.', cols: ['Colour of ice', 'How safe it is'],
        rows: [['clear blue', null], ['white', null], ['grey', null]],
        a: [[null, 'the strongest'], [null, 'weaker'], [null, 'unsafe, because it has water in it']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why should you never run onto the ice to help someone who fell in?',
        a: 'The ice near the hole is already broken or thin, so you could fall in too. It is safer to call 911 and reach out with a stick or rope from the shore.', look: 'the danger of thin ice and the safer way to help' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Before you read, what did you already know about ice or cold water? How did it help you understand the text?',
        a: 'Example: I knew thin ice can crack, so I understood why the chart shows how thick the ice must be for one person or a group.', look: 'something they knew before reading, linked to a part of the text' }
    ]
  });

  P.add({
    id: 'g4-bus-schedule', subject: 'math', form: 'Explanation',
    title: 'Catching the Bus',
    deck: 'How to read a bus schedule and work out how long a trip takes',
    hero: {
      photo: 'g4-city-bus.jpg', credit: 'Photo: Mx0268, CC BY 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 240,
      cap: 'A city bus on route 13 in Ottawa.'
    },
    body: [
      'Maya and her grandmother want to take the bus from their apartment to the public library. Maya’s robot club starts there at 10:30 on Saturday morning, and she does not want to be late. How can they figure out which bus to catch? They use a bus <b>schedule</b>.',
      { h: 'Reading the schedule' },
      'A bus schedule is a table. Each column is a stop, and each row is one bus trip. You read across a row to see when that bus reaches each stop. Maya finds her stop, Elm Street, in the first column. The library stop is in the last column.',
      { fig: '<rect class="k" x="10" y="10" width="280" height="96"/><path class="k" d="M10 34 H290"/><path class="t" d="M10 58 H290 M10 82 H290 M103 10 V106 M196 10 V106"/>' +
          '<text class="lb" x="56" y="26" text-anchor="middle">Elm Street</text><text class="lb" x="150" y="26" text-anchor="middle">Market Square</text><text class="lb" x="243" y="26" text-anchor="middle">Library</text>' +
          [['9:40', '9:52', '10:05'], ['10:00', '10:12', '10:25'], ['10:20', '10:32', '10:45']].map(function (r, i) { return r.map(function (t, j) { return '<text class="n" x="' + [56, 150, 243][j] + '" y="' + (50 + i * 24) + '" text-anchor="middle">' + t + '</text>'; }).join(''); }).join(''),
        tall: 112, cap: 'The route 7 bus schedule for Saturday morning.' },
      'Maya looks down the Elm Street column. A bus leaves at 9:40, another at 10:00 and another at 10:20. The buses come every 20 minutes. How often a bus comes is called its <b>frequency</b>. Some routes have buses every 10 minutes on weekdays but only every 30 minutes on weekends, so it is important to read the schedule for the right day.',
      { h: 'Working out the time' },
      'If they catch the 10:00 bus, it reaches the library at 10:25. Maya counts on from 10:00: 10 minutes to 10:10, 10 more to 10:20, and 5 more to 10:25. The trip takes 25 minutes. That is the elapsed time, the time that passes from start to finish. Arriving at 10:25 would leave only 5 minutes to find the club room.',
      'The 10:20 bus would be too late, since it does not arrive until 10:45. The 9:40 bus would get them there at 10:05, with lots of time to spare.',
      { box: 'Plan for delays', text: 'Buses can be late because of traffic or snow. It is smart to catch a bus that gives you a few extra minutes.' },
      'Grandma smiles. “Let’s take the 9:40,” she says. “Then we can pick out some books before your club starts.”',
      'On the bus, Maya watches the stops go by: Elm Street, Market Square, then the library. They step off at 10:05, right on time.'
    ],
    guide: { before: 'Look at a real bus, train or TV schedule together. Teach <b>schedule</b> and <b>frequency</b>. Practise counting on in minutes from one time to another.',
      after: 'Plan a trip using the schedule: if the club started at 10:15, which bus should Maya take? Explain how you know.' },
    words: [['schedule', 'a table that shows when things will happen'], ['frequency', 'how often something happens']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Buses are big.', 'A bus schedule helps you plan a trip by showing when each bus reaches each stop.', 'The library opens at 10.', 'Grandma likes books.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the schedule. Fill in the chart.', cols: ['Bus leaves Elm Street', 'Arrives at the library', 'Trip time'],
        rows: [['9:40', null, null], ['10:20', null, null]],
        a: [[null, '10:05', '25 minutes'], [null, '10:45', '25 minutes']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the schedule. When does the 10:00 bus reach Market Square?',
        opts: ['10:12', '10:25', '9:52'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is the 10:20 bus a bad choice?',
        opts: ['It arrives after the club starts.', 'It is too crowded.', 'It does not stop at Elm Street.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Frequen</b>cy means how often. Which word means “happening often”?',
        opts: ['frequent', 'late', 'early'], a: 0 },
      { k: 'choice', code: 'C2.2', half: true, q: 'When would someone most need to read a text like this?',
        opts: ['when planning a trip by bus', 'when looking for a bedtime story', 'when learning how buses are built'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Grandma choose the 9:40 bus instead of the 10:00 bus? Use details from the text.',
        a: 'The 9:40 bus arrives at 10:05, so they have time to pick out books, and they will still be on time if the bus is late.', look: 'extra time for books and for delays' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'If Maya and Grandma miss the 9:40 bus, what should they do? Explain.',
        a: 'They should catch the 10:00 bus. It reaches the library at 10:25, which is still before the club starts at 10:30.', look: 'uses the schedule to choose the next bus' }
    ]
  });

  P.add({
    id: 'g4-school-garden', subject: 'math', form: 'Explanation',
    title: 'Planning a School Garden',
    deck: 'How one class used perimeter and area to grow a garden',
    hero: {
      photo: 'g4-school-garden.jpg', credit: 'Photo: Libby Kokes, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 78%',
      tall: 240,
      cap: 'Raised garden beds full of vegetables in front of a school.'
    },
    body: [
      'The Grade 4 class at Lakeview Public School wants to build a vegetable garden. The principal says they can use a sunny space by the front door. The class has to plan carefully. How big should the garden beds be? How much wood do they need for the sides? How many plants will fit?',
      { h: 'Going around: perimeter' },
      'The students decide to build two raised beds, each 3 metres long and 1 metre wide. To find how much wood they need for the sides of one bed, they measure all the way around it. That distance is the <b>perimeter</b>. They add the four sides: 3 + 1 + 3 + 1 = 8 metres. For two beds, they need 16 metres of boards.',
      { fig: '<rect class="k" x="60" y="40" width="180" height="60"/><path class="t" d="M120 40 V100 M180 40 V100"/>' +
          '<text class="l" x="90" y="75" text-anchor="middle">1 m²</text><text class="l" x="150" y="75" text-anchor="middle">1 m²</text><text class="l" x="210" y="75" text-anchor="middle">1 m²</text>' +
          '<text class="n" x="150" y="32" text-anchor="middle">3 m</text><text class="n" x="150" y="118" text-anchor="middle">3 m</text><text class="n" x="54" y="75" text-anchor="end">1 m</text><text class="n" x="246" y="75">1 m</text>',
        tall: 126, cap: 'One garden bed, drawn from above. Each square is 1 square metre.' },
      { h: 'Covering the inside: area' },
      'Next, they need to know how much space there is for planting. That is the <b>area</b>, the amount of surface inside a shape. They draw the bed on grid paper, with each square standing for 1 square metre. The bed covers 3 squares, so its area is 3 square metres. Both beds together have 6 square metres for planting. To fill the beds, the class also needs soil. Each bed is about one-third of a metre deep, so it holds about 1 cubic metre of soil.',
      'The seed packets help with the rest. One packet says to plant 9 lettuce plants in each square metre. If the class uses one whole bed for lettuce, they can grow 3 × 9 = 27 lettuce plants! In the second bed, they plant carrots and beans. Carrots grow close together, but beans need more room, so the class plants fewer bean plants in each square metre.',
      { box: 'Why raised beds?', text: 'Raised beds warm up faster in spring, drain well after rain and are easy to reach without stepping on the soil.' },
      'In June, the class picks its first salad. Some vegetables go home with families, and some go to a local food bank. Planning with math helped the garden grow. Next year, the class wants to add a third bed for strawberries, and they have already started measuring.'
    ],
    guide: { before: 'Walk around the edge of a rug or table together, then lay sheets of paper over it. Teach <b>perimeter</b> (around) and <b>area</b> (covering). Count the squares in the diagram.',
      after: 'Design your own garden bed on grid paper. What is its perimeter? What is its area? What would you plant?' },
    words: [['perimeter', 'the distance all the way around a shape'], ['area', 'the amount of surface a shape covers']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Lettuce is green.', 'A class used perimeter and area to plan a school garden.', 'Schools have principals.', 'Wood comes from trees.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What is the perimeter of one bed?',
        opts: ['8 metres', '3 metres', '4 metres'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What is the area of one bed?',
        opts: ['3 square metres', '8 square metres', '1 square metre'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Another bed is 2 metres long and 2 metres wide. Fill in the chart.', cols: ['Perimeter', 'Area', 'Lettuce plants (9 per square metre)'],
        rows: [[null, null, null]],
        a: [['8 metres', '4 square metres', '36']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do the students need to know the perimeter?',
        opts: ['to know how much wood to buy for the sides', 'to know how much water to use', 'to count the seeds'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Peri</b>meter has a part that means “around.” Which word also has <b>peri</b>-?',
        opts: ['periscope', 'perfect', 'person'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why are raised beds a good choice for a school garden? Give two reasons.',
        a: 'They warm up faster in spring and drain well after rain. They are also easy to reach without stepping on the soil.', look: 'two reasons from the box' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'Why does the writer end with “Planning with math helped the garden grow”?',
        a: 'To show that the math was useful: perimeter told them how much wood to buy, and area told them how much they could plant.', look: 'connects the ending to perimeter and area' }
    ]
  });

  P.add({
    id: 'g4-pottery', subject: 'arts', form: 'Explanation',
    title: 'From Mud to Mug',
    deck: 'How potters turn soft clay into something hard as stone',
    hero: {
      photo: 'g4-pottery-wheel.jpg', credit: 'Photo: Drbones1950, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 75%',
      tall: 230,
      cap: 'A potter shapes wet clay on a spinning wheel.'
    },
    body: [
      'Pottery is one of the oldest crafts in the world. People have been shaping clay into bowls, cups and jars for more than 20 000 years. Clay is a special kind of soft, fine earth. When it is wet, it can be squished, rolled and shaped. When it is heated in a fire, it turns hard as stone.',
      { h: 'Three ways to shape clay' },
      'There are three main ways to build a pot by hand. To make a pinch pot, you push your thumb into a ball of clay and pinch the sides thinner as you turn it. To make a coil pot, you roll long snakes of clay and stack them in circles, smoothing them together. To make a slab pot, you roll the clay flat, like cookie dough, cut out pieces and join them. Many Indigenous potters in North America built beautiful coil pots long before the potter’s wheel arrived.',
      { fig: '<path class="k" d="M24 70 Q24 112 50 112 Q76 112 76 70 Q50 80 24 70 Z"/>' +
          '<path class="k" d="M128 60 Q120 86 128 112 H172 Q180 86 172 60"/><path class="t" d="M127 102 H173 M125 92 H175 M125 82 H175 M126 72 H174"/>' +
          '<path class="k" d="M222 66 H278 V112 H222 Z M222 66 L232 56 H288 L278 66 M288 56 V102 L278 112"/>' +
          '<text class="n" x="50" y="134" text-anchor="middle">pinch pot</text><text class="n" x="150" y="134" text-anchor="middle">coil pot</text><text class="n" x="254" y="134" text-anchor="middle">slab pot</text>',
        tall: 140, cap: 'Three kinds of pots that are built by hand.' },
      { h: 'On the wheel' },
      'A potter’s wheel is a spinning plate. The potter places a lump of wet clay in the middle and pushes on it with wet hands until it is perfectly round and even. This is called <b>centring</b>. Then the potter presses down into the middle to open it up and slowly pulls the walls upward as the wheel spins. It takes a lot of practice, and many pots wobble and collapse at first.',
      { h: 'Into the fire' },
      'After a pot is shaped, it dries for several days. Then it goes into a <b>kiln</b>, a special oven that gets hotter than 1 000 °C. The heat changes the clay forever, so it can never turn soft again. Many potters then paint the pot with a glaze, a coating that melts into a smooth, shiny, glass-like layer in a second firing.',
      'Potters in different places have their own styles. Some make thin, delicate cups. Others make big, sturdy pots for cooking or storing food. Look at the dishes in your kitchen. Many of them were made the same way, with clay, heat and glaze, but by machines in a factory instead of by hand.',
      { box: 'Try it', text: 'Air-dry clay from a craft store lets you make a pinch pot at home. No kiln is needed: it hardens on its own in a day or two.' }
    ],
    guide: { before: 'If you can, give the child a ball of play dough or clay to pinch while you read. Teach <b>centring</b> and <b>kiln</b>. Look at the photo: what is the potter doing with her hands?',
      after: 'Make a pinch pot or a coil pot together. Which way of building do you like best? Why?' },
    words: [['centring', 'pushing clay on the wheel until it is round and even in the middle'], ['kiln', 'a very hot oven for hardening clay']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Clay is wet.', 'Potters shape soft clay by hand or on a wheel, then fire it until it is hard.', 'Kilns are hot.', 'Mugs hold drinks.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Three ways to build a pot by hand. Fill in the chart.', cols: ['Kind of pot', 'How to make it'],
        rows: [['pinch pot', null], ['coil pot', null], ['slab pot', null]],
        a: [[null, 'Push a thumb into a ball of clay and pinch the sides.'], [null, 'Stack long snakes of clay in circles and smooth them.'], [null, 'Roll the clay flat, cut out pieces and join them.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which pot is made of stacked snakes of clay?',
        opts: ['the coil pot', 'the pinch pot', 'the slab pot'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps for making a pot on the wheel.',
        items: ['Centre the clay.', 'Open up the middle.', 'Pull the walls up.', 'Dry and fire the pot.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the writer say clay is rolled “like cookie dough”?',
        opts: ['to help readers picture it', 'because clay is food', 'to make a rhyme'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Glass<b>-like</b> means “like glass.” What does child<b>-like</b> mean?',
        opts: ['like a child', 'a child’s toy', 'not a child'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think many pots wobble and collapse when a potter is learning? Use the text.',
        a: 'Using the wheel takes a lot of practice. If the clay is not centred, or the walls are pulled up too fast, the pot can wobble and fall.', look: 'centring and practice' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Pottery is part of many cultures. What does the text tell you about how people in different places make or use pots?',
        a: 'Many Indigenous potters in North America built coil pots long before the potter’s wheel arrived. Some potters make thin, delicate cups, and others make big, sturdy pots for cooking or storing food.', look: 'two details about pottery in different cultures or places' }
    ]
  });

  P.add({
    id: 'g4-paper-cranes', subject: 'arts', form: 'Explanation',
    title: 'A Thousand Paper Cranes',
    deck: 'The art of origami, from one square of paper',
    hero: {
      photo: 'g4-paper-cranes.jpg', credit: 'Photo: Laitche, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'Two origami cranes, each folded from one square of paper.'
    },
    body: [
      '<b>Origami</b> is the Japanese art of folding paper. With just one square sheet and no scissors or glue, an origami artist can make a frog, a flower, a box or a bird. The most famous origami model of all is the crane.',
      { h: 'A bird with meaning' },
      'In Japan, the crane is a <b>symbol</b> of long life and good luck. An old tradition says that a person who folds one thousand paper cranes may have a wish granted. Today, strings of a thousand cranes are given as gifts at weddings, to people who are sick, and as a sign of hope for peace. Schools around the world, including many in Canada, fold cranes together to send messages of peace.',
      { h: 'Folding is like math' },
      'Every fold in origami follows exact steps. You fold corners to corners and edges to edges, making triangles, squares and diamonds. Folding a square along its diagonal makes two triangles. Folding along the other diagonal makes four. Origami artists use patterns of folds, called crease patterns, to plan new models. Engineers even use origami ideas to fold huge solar panels small enough to fit in a rocket, so they can unfold in space.',
      { fig: '<rect class="k" x="20" y="16" width="70" height="70"/><path class="d" d="M20 16 L90 86"/>' +
          '<path class="k" d="M120 16 L190 86 H120 Z"/>' +
          '<rect class="k" x="220" y="16" width="70" height="70"/><path class="d" d="M220 16 L290 86 M290 16 L220 86"/>' +
          '<text class="n" x="55" y="106" text-anchor="middle">1. one diagonal</text><text class="n" x="155" y="106" text-anchor="middle">2. two triangles</text><text class="n" x="255" y="106" text-anchor="middle">3. four triangles</text>',
        tall: 114, cap: 'Folding a square along its diagonals. The dashed lines are folds.' },
      { h: 'Getting started' },
      'Before you try a crane, practise simple models, such as a cup or a jumping frog. Use thin, square paper, and make every crease sharp by running your fingernail along it. Go slowly and follow each step. If a fold goes wrong, unfold it and try again. Patience is part of the art. Your first crane might take half an hour. With practice, you may fold one in a few minutes.',
      { box: 'Did you know?', text: 'Paper was once rare and costly. Long ago, folded paper was used mostly in ceremonies, before origami became a pastime that anyone could enjoy.' },
      'Once you can fold one crane, try making a string of them. It may take a long time to reach a thousand, but every single crane is a small work of art.'
    ],
    guide: { before: 'Have a few squares of paper ready. Teach <b>origami</b> and <b>symbol</b>. Fold a square along both diagonals together, like the diagram.',
      after: 'Fold a simple model together, such as a cup. What was the hardest step? What would you like to fold next?' },
    words: [['origami', 'the Japanese art of folding paper into shapes'], ['symbol', 'something that stands for an idea, like a heart for love']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Paper is thin.', 'Origami is the art of folding paper, and the crane is its most famous model.', 'Cranes are birds.', 'Japan is in Asia.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do people give strings of a thousand cranes?',
        opts: ['as a sign of luck, long life or hope for peace', 'to sell them', 'to use as scrap paper'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Folding a square along both diagonals makes …',
        opts: ['4 triangles', '2 squares', '8 circles'], a: 0 },
      { k: 'table', code: 'C3.2', q: 'Fill in the chart of folding tips.', cols: ['Tip', 'Why it helps'],
        rows: [['Make every crease sharp.', null], ['Go slowly and follow each step.', null]],
        a: [[null, 'Sharp creases keep the model neat and exact.'], [null, 'You make fewer mistakes.']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Un</b>fold means to open a fold. What does <b>un</b>tie mean?',
        opts: ['open a knot', 'tie again', 'tie tightly'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which heading tells where to find advice for beginners?',
        opts: ['Getting started', 'A bird with meaning', 'Folding is like math'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How is origami like math? Give two details from the text.',
        a: 'Folds follow exact steps and make triangles, squares and diamonds. Artists also plan new models with crease patterns.', look: 'two details about shapes or planning' },
      { k: 'lines', code: 'C3.1', n: 2, q: 'The writer says, “Patience is part of the art.” What does this mean?',
        a: 'Origami takes time and care, and you have to keep trying when a fold goes wrong.', look: 'connects patience to taking time and trying again' }
    ]
  });

  P.add({
    id: 'g4-roberta-bondar', subject: 'science', form: 'Biography',
    title: 'A Doctor in Space',
    deck: 'Roberta Bondar, the first Canadian woman in space',
    hero: {
      photo: 'g4-roberta-bondar.jpg', credit: 'Photo: NASA, public domain, Wikimedia Commons', focus: '50% 25%',
      tall: 230,
      cap: 'Roberta Bondar in her orange flight suit before her mission in 1992.'
    },
    body: [
      'On January 22, 1992, the space shuttle Discovery roared into the sky from Florida. On board was Roberta Bondar, a doctor and scientist from Sault Ste. Marie, Ontario. She was about to become the first Canadian woman to travel to space.',
      { h: 'A curious kid' },
      'As a child, Roberta loved science. She built model rockets, collected bugs and did experiments in a small lab in her basement. She dreamed of exploring space, even though there were no Canadian astronauts yet. She studied hard and became a <b>neurologist</b>, a doctor who studies the brain and nerves. She also earned her pilot’s licence.',
      { fig: '<path class="k" d="M20 60 H285"/>' + [[30, '1945', 'born', 84], [170, '1983', 'chosen', 84], [215, '1992', 'space flight', 104], [265, 'later', 'nature photos', 84]].map(function (e) { return '<circle class="dot" cx="' + e[0] + '" cy="60" r="4"/><text class="lb" x="' + e[0] + '" y="48" text-anchor="middle">' + e[1] + '</text><text class="n" x="' + e[0] + '" y="' + e[3] + '" text-anchor="middle">' + e[2] + '</text>'; }).join(''),
        tall: 112, cap: 'A timeline of Roberta Bondar’s life.' },
      { h: 'Eight days in orbit' },
      'In 1983, Canada chose its first six astronauts, and Roberta Bondar was one of them. She trained for years. On her mission, she spent eight days in <b>orbit</b>, circling Earth again and again. She did more than 40 experiments. Many studied how the human body changes without gravity. In space, astronauts float, their faces puff up, and their muscles and bones get weaker because they do not have to work as hard. She also studied plants, fruit flies and frog eggs to see how they grew without gravity. Her work helped scientists plan for longer trips in space.',
      { h: 'Seeing Earth' },
      'Looking down at Earth changed how she thought about our planet. She could see how thin the layer of air is that keeps everything alive. After her flight, she became a nature photographer, taking pictures of Canada’s national parks to help people care for the environment.',
      { box: 'Did you know?', text: 'A school in Ottawa and a park in her hometown of Sault Ste. Marie are named after Roberta Bondar.' },
      'Roberta Bondar showed that a curious kid with big dreams can grow up to reach the stars, and then come home to care for the Earth.'
    ],
    guide: { before: 'Find Sault Ste. Marie on a map of Ontario. Teach <b>neurologist</b> and <b>orbit</b>. Ask: what would you want to study if you went to space?',
      after: 'Roberta Bondar built rockets and did experiments as a kid. What do you love doing now that could lead to a job one day?' },
    words: [['neurologist', 'a doctor who studies the brain and nerves'], ['orbit', 'the curved path of something going around a planet']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Florida has rockets.', 'Roberta Bondar, a doctor and scientist, became the first Canadian woman in space.', 'Space is cold.', 'Astronauts float.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the timeline. Number the events in order.',
        items: ['Roberta Bondar is born.', 'She is chosen as an astronaut.', 'She flies into space.', 'She photographs national parks.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.2', half: true, q: 'This text tells about a real person’s life. It is a …',
        opts: ['biography', 'fable', 'diary'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why does <b>Canadian</b> in “the first Canadian woman” start with a capital letter?',
        opts: ['It is a describing word made from the name Canada.', 'It is the first word of the sentence.', 'It is a long word.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'The ending <b>-ologist</b> means “one who studies.” What does a bi<b>ologist</b> study?',
        opts: ['living things', 'rocks', 'numbers'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'How did Roberta Bondar prepare for her dream?', cols: ['As a child', 'As an adult'],
        rows: [[null, null]],
        a: [['She built model rockets and did experiments.', 'She became a doctor, earned her pilot’s licence and trained as an astronaut.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How did going to space change Roberta Bondar? Use details from the text.',
        a: 'Seeing how thin Earth’s layer of air is made her care more about the planet, so she became a nature photographer to help people care for the environment.', look: 'what she saw and what she did afterward' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'Why do you think the writer included details about her childhood?',
        a: 'To show that her dream started when she was young, and that curious kids can grow up to do big things.', look: 'a message for young readers' }
    ]
  });

  P.add({
    id: 'g4-new-kid', subject: 'story', form: 'Short story',
    title: 'The Seat by the Window',
    deck: 'A new girl on the school bus, and the drawing that starts a friendship',
    hero: {
      photo: 'g4-school-bus.jpg', credit: 'Photo: Crisco 1492, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'A school bus in Windsor, Ontario.'
    },
    body: [
      'The new girl got on the bus on a Monday in October. She wore a purple jacket that was too big for her, and she held a sketchbook against her chest like a shield. She sat in the seat by the window, two rows in front of me, and stared out at the grey Windsor streets.',
      '“Her name is Oksana,” my sister whispered. “She’s a <b>newcomer</b> from Ukraine. She doesn’t speak much English yet.”',
      { h: 'Monday to Thursday' },
      'All week, Oksana sat alone. Kids talked and laughed around her, but nobody sat beside her. I wanted to, but what would I say? What if she did not understand me? What if everyone stared?',
      'On Thursday, the bus hit a bump, and her <b>sketchbook</b> slid into the aisle. It fell open at my feet. Inside was a drawing of a sunflower so real I almost expected it to smell. I picked it up and handed it back.',
      '“Wow,” I said, pointing at the flower. “Beautiful.” She smiled for the first time.',
      'That night at dinner, I asked my mom how to say hello in Ukrainian. She found it on her phone. “Pryvit,” I practised, over and over, until my sister told me to stop.',
      { fig: [[20, [[1, 'O', ''], [3, 'me', '']], 'Monday'], [170, [[1, 'O', 'me']], 'Friday']].map(function (p) {
            var x = p[0], s = '<rect class="k" x="' + x + '" y="18" width="110" height="116" rx="8"/><text class="l" x="' + (x + 55) + '" y="12" text-anchor="middle">front</text>';
            for (var r = 0; r < 5; r++) s += '<rect class="t" x="' + (x + 6) + '" y="' + (26 + r * 21) + '" width="44" height="15"/><rect class="t" x="' + (x + 60) + '" y="' + (26 + r * 21) + '" width="44" height="15"/>';
            p[1].forEach(function (q) { var y = 37 + q[0] * 21; s += '<text class="lb" x="' + (x + 17) + '" y="' + y + '" text-anchor="middle">' + q[1] + '</text>' + (q[2] ? '<text class="lb" x="' + (x + 39) + '" y="' + y + '" text-anchor="middle">' + q[2] + '</text>' : ''); });
            return s + '<text class="n" x="' + (x + 55) + '" y="150" text-anchor="middle">' + p[2] + '</text>';
          }).join(''),
        tall: 154, cap: 'Where they sat on the bus. O is Oksana.' },
      { h: 'Friday' },
      'That night, I drew the best hockey player I could. The next morning, I took a deep breath, walked down the aisle and sat in the seat beside her. “Pryvit,” I said. Her eyes went wide. Then I held out my drawing. Oksana laughed, not in a mean way, and pointed at the skates. Then she took my pencil and fixed them, so they looked like real skates.',
      'We did not talk much. We did not have to. By the time the bus reached school, we had drawn a whole team. As we got off, she tapped her chest, then mine. “Druh,” she said. Later, I looked it up. It means “friend.”'
    ],
    guide: { before: 'Ask: have you ever been new somewhere? How did it feel? Teach <b>newcomer</b> and <b>sketchbook</b>. Find Ukraine and Windsor on a map.',
      after: 'What could you do to help a new student feel welcome? Why do you think it took courage for the narrator to sit beside Oksana?' },
    words: [['newcomer', 'someone who has just arrived in a new place'], ['sketchbook', 'a book of blank pages for drawing']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'Who tells this story?',
        opts: ['Oksana', 'a student on the bus, using “I”', 'the bus driver', 'the narrator’s sister'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the story map.', cols: ['Part of the story', 'What happens'],
        rows: [['Problem', null], ['Turning point', null], ['Solution', null]],
        a: [[null, 'Oksana sits alone, and the narrator is afraid to talk to her.'], [null, 'Her sketchbook falls open, and the narrator sees her drawing.'], [null, 'The narrator sits with her, and they draw together and become friends.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where does the narrator sit on Friday?',
        opts: ['beside Oksana', 'at the back', 'two rows behind her'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'She held her sketchbook “like a shield.” This shows she felt …',
        opts: ['nervous', 'angry', 'sleepy'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the narrator wait until Friday to sit with her?',
        opts: ['He was worried about what to say and what others would think.', 'He was sick.', 'The bus was full.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Beauti<b>ful</b> means “full of beauty.” What does help<b>ful</b> mean?',
        opts: ['full of help', 'without help', 'helping again'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How did drawing help Oksana and the narrator become friends? Use details from the story.',
        a: 'They did not share a language, but they both liked to draw. The narrator showed her a hockey player, she fixed the skates, and they drew a whole team together.', look: 'drawing as a shared language, with details' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Oksana is a newcomer who does not speak much English yet. What does the story show about including someone new?',
        a: 'You do not need many words to make a friend. The narrator learned to say hello in Ukrainian and shared drawing, something they both loved, so Oksana did not have to sit alone.', look: 'a message about including others, backed by a detail from the story' }
    ]
  });

  P.add({
    id: 'g4-camp-letter', subject: 'story', form: 'Letter',
    title: 'Dear Nana',
    deck: 'A letter home from a first canoe trip',
    hero: {
      photo: 'g4-canoe-lake.jpg', credit: 'Photo: Paul LaRocque, CC BY 3.0, Wikimedia Commons', focus: '50% 60%',
      tall: 220,
      cap: 'A canoe pulled up on the shore of a quiet lake.'
    },
    plain: true,
    body: [
      '<b>July 14</b>',
      'Dear Nana,',
      'I have been at Camp Tall Pines for six days, and I have SO much to tell you. On the first night, I felt <b>homesick</b>. I lay in my bunk, listened to the frogs and missed your cooking. But my cabin counsellor, Aiyana, sat with me and told me stories until I fell asleep. Since then, I have been too busy to be sad!',
      'Yesterday we went on our first canoe trip. I sat in the stern, which is the back of the canoe, so I had to steer. At first, we went in circles, and my partner, Lucie, laughed so hard she nearly dropped her paddle. Then Aiyana taught me the <b>J-stroke</b>. You pull the paddle back and then turn it out at the end, like the letter J. It keeps the canoe going straight. By lunch, we were gliding across the lake.',
      { fig: '<path class="k" d="M40 70 Q150 40 260 70 Q150 100 40 70 Z"/><path class="a" d="M130 100 H76 Q60 100 60 114"/>' + D.arrow(62, 108, 60, 118, 'a') +
          D.arrow(190, 22, 270, 22) + '<text class="n" x="182" y="26" text-anchor="end">the canoe moves this way</text>' +
          D.label(10, 46, 'stern', 52, 68) + D.label(150, 136, 'the paddle makes a J', 92, 100),
        tall: 142, cap: 'The J-stroke, seen from above. The paddler sits at the stern.' },
      'In the afternoon, we had to portage. That means we carried everything over a trail to the next lake. Two counsellors carried the canoe, and we carried the packs. The mosquitoes were terrible, but at the end of the trail, there was a lake as smooth as glass.',
      'That night, we heard loons calling across the water. It sounded like someone laughing and crying at the same time. Aiyana says a loon can dive as deep as a 20-storey building is tall!',
      'Today we took our swim test. I passed, so now I can swim out to the raft with the older kids. Tomorrow we are learning to build a campfire and cook bannock on a stick.',
      'I can’t wait to show you the J-stroke when I get home. Maybe we can rent a canoe at the park!',
      'Love,<br>Jasmine',
      'P.S. Please give my cat a hug from me.'
    ],
    guide: { before: 'Look at the parts of a friendly letter: date, greeting, body, closing and P.S. Teach <b>homesick</b> and <b>J-stroke</b>. Ask whether the child has been away from home overnight.',
      after: 'Write a short letter to someone you miss. Tell them about something new you learned, and add a P.S.' },
    words: [['homesick', 'sad because you miss your home and family'], ['J-stroke', 'a paddle stroke shaped like the letter J that keeps a canoe going straight']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This text is a friendly letter. How can you tell?',
        opts: ['It has a date, a greeting, a closing and a P.S.', 'It has steps to follow.', 'It has a table.', 'It is a poem.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the canoe go in circles at first?',
        opts: ['Jasmine did not know how to steer yet.', 'The wind was strong.', 'Lucie paddled backward.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what shape does the paddle make?',
        opts: ['the letter J', 'a circle', 'a straight line'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'How did Jasmine’s feelings change? Fill in the chart.', cols: ['When', 'How she felt', 'Why'],
        rows: [['the first night', null, null], ['on the canoe trip', null, null]],
        a: [[null, 'homesick', 'She missed home and Nana’s cooking.'], [null, 'proud and happy', 'She learned the J-stroke and glided across the lake.']] },
      { k: 'choice', code: 'C3.1', half: true, q: '“A lake as smooth as glass” is a …',
        opts: ['simile', 'question', 'list'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A counsell<b>or</b> is someone who counsels. What is an act<b>or</b>?',
        opts: ['someone who acts', 'a kind of play', 'an action'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'How does Jasmine’s writing sound like she is talking to her grandmother? Give two examples.',
        a: 'She writes “SO much” in capital letters to show excitement, and she asks Nana to rent a canoe with her. She also adds a P.S. about hugging her cat.', look: 'two examples of a friendly, chatty voice' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Jasmine felt homesick on her first night. Have you ever felt that way, or read about someone who did? How does that help you understand Jasmine?',
        a: 'Example: I felt homesick at my first sleepover. I know it gets better when someone kind stays with you, the way Aiyana stayed with Jasmine.', look: 'a real connection to their own life or another text, linked back to Jasmine' }
    ]
  });

  P.add({
    id: 'g4-northern-lights', subject: 'science', form: 'Explanation',
    title: 'Curtains of Light',
    deck: 'What makes the northern lights glow and dance',
    hero: {
      photo: 'g4-northern-lights.jpg', credit: 'Photo: raymond22112376, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 230,
      cap: 'The northern lights glow green above a lit tent near Yellowknife, Northwest Territories.'
    },
    body: [
      'On a clear winter night in northern Canada, the sky can suddenly come alive. Ribbons of green, and sometimes pink or purple, ripple and dance above the trees. These are the northern lights, also called the aurora borealis. Yellowknife, in the Northwest Territories, is one of the best places on Earth to see them.',
      { h: 'A gift from the Sun' },
      'The northern lights begin 150 million kilometres away, at the Sun. The Sun is always sending out a stream of tiny, charged bits called the <b>solar wind</b>. When the solar wind reaches Earth, most of it is pushed away by Earth’s <b>magnetic field</b>, an invisible shield around our planet. But near the North and South Poles, the field dips down toward the ground, and some of the charged bits slip into the air.',
      'High in the sky, these bits crash into gases in the air. Each crash makes the gas glow, a bit like the glowing tube of a neon sign. Oxygen gives off green or red light. Nitrogen gives off blue or purple light.',
      { fig: '<circle class="a" cx="30" cy="76" r="22"/>' + D.arrow(60, 62, 150, 68) + D.arrow(60, 76, 150, 76) + D.arrow(60, 90, 150, 84) +
          '<circle class="k" cx="220" cy="76" r="30"/><path class="t" d="M220 46 Q150 76 220 106 M220 46 Q290 76 220 106"/>' +
          '<path class="h" d="M204 40 Q220 26 236 40 L231 47 Q220 38 209 47 Z"/>' + D.label(250, 28, 'glow', 234, 40) +
          '<text class="l" x="105" y="54" text-anchor="middle">solar wind</text><text class="n" x="30" y="118" text-anchor="middle">Sun</text><text class="n" x="220" y="124" text-anchor="middle">Earth</text>',
        tall: 132, cap: 'The solar wind reaches Earth, and the air glows near the pole. Not to scale.' },
      { h: 'Stories in the sky' },
      'People have told stories about the northern lights for thousands of years. Some Inuit stories say the lights are the spirits of people who have died, playing a game of ball across the sky. Many Cree people call the lights the dance of the spirits. Some stories warn children not to whistle at the lights.',
      { box: 'Did you know?', text: 'The same kind of lights shine near the South Pole too. There, they are called the aurora australis, or southern lights.' },
      'To see the northern lights, you need a dark, clear night far from city lights. Dress warmly, be patient and look north. Scientists can even predict when the lights will be strong, a bit like a weather forecast.'
    ],
    guide: { before: 'Show the child the North Pole and Yellowknife on a globe. Teach <b>solar wind</b> and <b>magnetic field</b>. If you have a magnet, sprinkle a little pepper or iron filings on paper above it to see a field.',
      after: 'Science explains how the lights happen, and stories tell what they mean to people. Why are both kinds of knowledge valuable?' },
    words: [['solar wind', 'a stream of tiny charged bits that flows out from the Sun'], ['magnetic field', 'an invisible area of force around a magnet or a planet']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Yellowknife is cold.', 'The northern lights glow when bits from the Sun crash into gases in the air near the poles.', 'Oxygen is a gas.', 'Stories are old.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in order.',
        items: ['The Sun sends out the solar wind.', 'The solar wind reaches Earth.', 'Charged bits slip in near the poles.', 'They crash into gases, which glow.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where does the air glow?',
        opts: ['near the pole', 'at the middle of Earth', 'on the Sun'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Gas', 'Colour of light'],
        rows: [['oxygen', null], ['nitrogen', null]],
        a: [[null, 'green or red'], [null, 'blue or purple']] },
      { k: 'choice', code: 'C3.1', half: true, q: 'The gas glows “a bit like the glowing tube of a neon sign.” This comparison helps you …',
        opts: ['picture how the gas glows', 'know the size of the Sun', 'hear the lights'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Solar</b> means “of the Sun.” What is a <b>solar</b> panel?',
        opts: ['a panel that uses sunlight', 'a panel for the Moon', 'a panel made of ice'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The text gives a science explanation and also Indigenous stories about the lights. Why do you think the writer included both?',
        a: 'To show that there are different ways of understanding the lights: science explains how they happen, and stories show what they mean to people.', look: 'values both science and Indigenous stories' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'What helped you most to understand how the lights form: the diagram, picturing it in your mind, or rereading? Explain how it helped.',
        a: 'Example: The diagram helped most. I could see where the air glows high above Earth, so the words made more sense.', look: 'names one strategy and tells how it helped with this text' }
    ]
  });

  P.add({
    id: 'g4-niagara-erosion', subject: 'science', form: 'Explanation',
    title: 'The Falls on the Move',
    deck: 'How water is slowly pushing Niagara Falls upstream',
    hero: {
      photo: 'g4-niagara-falls.jpg', credit: 'Photo: Helen Filatova, CC BY 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 230,
      cap: 'The Horseshoe Falls at Niagara Falls, Ontario, seen from above.'
    },
    body: [
      'Every second, more than an Olympic swimming pool of water pours over Niagara Falls. The water roars over the edge and crashes into the river below. But here is a surprise: Niagara Falls is moving. Over thousands of years, it has crept upstream, toward Lake Erie.',
      { h: 'How the falls wear away' },
      'The rock at Niagara Falls is in layers. On top is a hard rock called dolostone. Underneath are softer layers of shale and sandstone. The falling water swirls at the bottom and washes away the soft rock underneath. Without support, chunks of the hard top layer break off and fall. Then the edge of the falls is a little farther upstream. This wearing away of rock by water, wind or ice is called <b>erosion</b>.',
      { fig: '<rect class="h" x="0" y="40" width="180" height="20"/><path class="k" d="M0 60 H150 Q140 95 150 130 H0"/><path class="t" d="M0 84 H143 M0 108 H143"/><path class="k" d="M150 130 H300"/>' +
          '<path class="a" d="M100 36 H178 Q196 42 202 128 M184 46 Q198 70 196 128"/><path class="a" d="M166 120 q10 -14 20 0 q-10 10 -20 0"/>' +
          '<rect class="k" x="210" y="92" width="14" height="10" transform="rotate(20 217 97)"/>' +
          '<text class="l" x="10" y="32">hard rock</text><text class="l" x="10" y="100">soft rock</text>' + D.label(236, 60, 'water', 200, 62) + D.label(236, 86, 'falling chunk', 220, 94) + D.label(210, 150, 'swirling water', 176, 122),
        tall: 156, cap: 'A side view of the falls. The soft rock is washed away from under the hard rock.' },
      { h: 'A gorge is born' },
      'About 12 500 years ago, the falls were near what is now Queenston, Ontario. Since then, they have moved about 11 kilometres. They left behind a deep, narrow valley with steep sides, called a <b>gorge</b>. You can walk along the edge of the Niagara Gorge today and see the rock layers in its walls.',
      { h: 'Slowing it down' },
      'In the past, the Horseshoe Falls wore back about a metre every year. Today, people have slowed the erosion. Much of the river’s water is sent through huge tunnels to power stations that make electricity, especially at night, when fewer tourists are watching. With less water going over the edge, the falls now move only about 30 centimetres every ten years.',
      { box: 'Did you know?', text: 'Niagara Falls is really three waterfalls: the Horseshoe Falls, the American Falls and the small Bridal Veil Falls. The Horseshoe Falls is shared by Canada and the United States.' },
      'Erosion happens everywhere, not just at Niagara. Rivers carve valleys, waves wear down cliffs and wind shapes rock. Most of the time it is so slow that we cannot see it happen. Niagara Falls is one of the few places where people can measure erosion in their own lifetimes.'
    ],
    guide: { before: 'Find Lake Erie, Lake Ontario and the Niagara River on a map. Teach <b>erosion</b> and <b>gorge</b>. Build a sand hill on a tray and pour water down it to watch erosion.',
      after: 'Should people slow down the erosion at Niagara Falls, or let nature take its course? Give a reason.' },
    words: [['erosion', 'the slow wearing away of rock or soil by water, wind or ice'], ['gorge', 'a deep, narrow valley with steep rocky sides']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Niagara Falls is loud.', 'Erosion is slowly moving Niagara Falls upstream.', 'Lake Erie is big.', 'Tourists visit at night.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps of erosion.',
        items: ['Falling water swirls at the bottom.', 'It washes away the soft rock.', 'The hard top layer has no support.', 'A chunk breaks off.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the soft rock wear away first?',
        opts: ['Water washes it away more easily.', 'It is on top.', 'It is warmer.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the falls in the past and today.', cols: ['', 'In the past', 'Today'],
        rows: [['How fast the falls wear back', null, null], ['How much water goes over', null, null]],
        a: [[null, 'about a metre a year', 'about 30 cm every ten years'], [null, 'all of the river', 'less, because some goes to power stations']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Up</b>stream means toward where a river comes from. What does <b>down</b>stream mean?',
        opts: ['toward where the river goes', 'under the water', 'across the river'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'What is one effect of sending water through tunnels?',
        opts: ['The falls erode more slowly.', 'The falls get louder.', 'The gorge gets wider.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do power stations take more water at night? Use the text.',
        a: 'Fewer tourists are watching at night, so less water can go over the falls without disappointing visitors, and the stations can make more electricity.', look: 'fewer tourists at night, more electricity' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict what would happen if all the river’s water went over the falls again.',
        a: 'The falls would wear back faster again, maybe about a metre a year.', look: 'faster erosion, with a reason' }
    ]
  });

  P.add({
    id: 'g4-salmon', subject: 'science', form: 'Explanation',
    title: 'The Long Way Home',
    deck: 'How salmon travel from a stream to the ocean and back again',
    hero: {
      photo: 'g4-salmon.jpg', credit: 'Photo: Marvina Munch, U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'Sockeye salmon leap up a waterfall on their way upstream.'
    },
    body: [
      'Every fall, some rivers in British Columbia turn red. Millions of sockeye salmon, their bodies bright red and their heads green, are swimming upstream. They are going home to the very stream where they hatched, years before. It is one of the greatest journeys in the animal world.',
      { h: 'From egg to ocean' },
      'A salmon’s life begins as a pink egg, buried in the gravel of a cold, clear stream. In spring, a tiny fish hatches with a sac of yolk still attached to its belly for food. Soon it becomes a <b>fry</b> and swims out of the gravel. After a year or so, it swims downstream to the ocean. In the salty sea, it eats and grows for about two years.',
      { fig: '<path class="a" d="M10 40 Q80 50 120 80 T216 116"/><rect class="h" x="216" y="100" width="84" height="40"/>' +
          '<path class="d" d="M250 92 Q150 10 30 24"/>' + D.arrow(46, 22, 30, 24) +
          '<text class="n" x="12" y="62">1. eggs</text><text class="n" x="96" y="106">2. fry</text><text class="n" x="296" y="156" text-anchor="end">3. grows in the ocean</text><text class="l" x="150" y="40" text-anchor="middle">4. adults swim home</text>',
        tall: 160, cap: 'The life cycle of a sockeye salmon, from stream to ocean and back.' },
      { h: 'Finding the way home' },
      'Then something amazing happens. The adult salmon swim back toward the coast and find the mouth of their own river. Scientists think they use Earth’s magnetic field to find the right part of the coast. Then they follow the smell of their home stream, which they remembered when they were young.',
      'The trip upstream is hard. Salmon stop eating once they enter fresh water. They swim against strong currents and leap up rapids and small waterfalls. Bears, eagles and people try to catch them. Where dams block the way, people build <b>fish ladders</b>, sets of small pools like steps, so the salmon can climb past.',
      { box: 'Did you know?', text: 'Some salmon swim more than 1 000 kilometres upstream to get home.' },
      'When they finally reach their stream, the females dig nests in the gravel with their tails and lay their eggs. Then the adult salmon die, and the cycle begins again. Even after they die, salmon keep giving. Their bodies feed eagles, bears and tiny stream creatures, and add nutrients to the soil along the riverbanks.'
    ],
    guide: { before: 'Trace a river from the mountains to the ocean on a map of British Columbia. Teach <b>fry</b> and <b>fish ladder</b>. Follow the life cycle in the diagram with your finger.',
      after: 'Salmon find their way home by smell. What smells remind you of home? How do people protect rivers so salmon can come back?' },
    words: [['fry', 'a young fish that has just begun to swim on its own'], ['fish ladders', 'steps of small pools that help fish swim past a dam']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Salmon are red.', 'Salmon travel from their home stream to the ocean and back again to lay eggs.', 'Bears eat fish.', 'Rivers have dams.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the life cycle in order.',
        items: ['an egg in the gravel', 'a fry in the stream', 'an adult in the ocean', 'a salmon swimming upstream'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where does the salmon grow into an adult?',
        opts: ['in the ocean', 'in the gravel', 'in a lake'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How do salmon find their home stream?',
        opts: ['They follow its smell.', 'They follow other fish.', 'They follow the birds.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Fresh</b>water joins two words. What is freshwater?',
        opts: ['water that is not salty', 'water that is very cold', 'water from a tap'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart about the trip upstream.', cols: ['Problem', 'How salmon get past it'],
        rows: [['strong currents and rapids', null], ['dams', null]],
        a: [[null, 'They swim hard and leap up rapids and small waterfalls.'], [null, 'They climb fish ladders that people build.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is the journey home so hard for salmon? Give two details.',
        a: 'They stop eating in fresh water and swim against strong currents. Bears, eagles and people also try to catch them.', look: 'two details from the text' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'The writer calls it “one of the greatest journeys in the animal world.” Do you agree? Why?',
        a: 'Yes. Salmon travel from a stream to the ocean and back, sometimes more than 1 000 kilometres, and find their way by smell.', look: 'an opinion supported by details' }
    ]
  });

  P.add({
    id: 'g4-snowflakes', subject: 'math', form: 'Explanation',
    title: 'No Two Alike',
    deck: 'Snowflakes, a patient photographer and lines of symmetry',
    hero: {
      photo: 'g4-snowflakes.jpg', credit: 'Photo: Wilson Bentley, public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 230,
      cap: 'Snowflakes photographed by Wilson Bentley more than 100 years ago.'
    },
    body: [
      'In 1885, a young farmer in Vermont named Wilson Bentley did something no one had done before. He attached a camera to a microscope and took a photograph of a single snowflake. He caught each flake on black velvet and worked fast, in an unheated shed, before it could melt. Over the next 46 years, he photographed more than 5 000 of them. His photos, like the ones above, amazed the world.',
      { h: 'Six sides' },
      'Look closely at Bentley’s snowflakes. Every one has six arms or six sides. That is because of the way water freezes. When water turns to ice, its tiny particles link together in a pattern of six-sided rings, called hexagons. As a snowflake grows, more ice builds on, and the six-sided pattern grows with it. Some snowflakes look like stars with feathery arms. Others look like flat plates or tiny needles.',
      { h: 'Lines of symmetry' },
      'Snowflakes are a great way to learn about <b>symmetry</b>. A shape has a <b>line of symmetry</b> if you can fold it along a line and the two halves match exactly, like a mirror image. A perfect snowflake has six lines of symmetry. Three of them go through opposite arms, and three go between the arms.',
      { fig: '<path class="d" d="M150 10 V130 M98 40 L202 100 M98 100 L202 40 M84 70 H216 M115 10 L185 130 M185 10 L115 130"/>' +
          '<path class="k" d="M150 20 V120 M107 45 L193 95 M107 95 L193 45"/>' +
          '<path class="k" d="M150 36 L140 28 M150 36 L160 28 M150 104 L140 112 M150 104 L160 112 M121 53 L120 41 M121 53 L110 58 M179 87 L180 99 M179 87 L190 82 M121 87 L110 82 M121 87 L120 99 M179 53 L190 58 M179 53 L180 41"/>' +
          D.label(222, 34, 'through arms', 202, 40) + D.label(222, 74, 'between arms', 216, 70),
        tall: 140, cap: 'The six lines of symmetry of a perfect snowflake. The dashed lines are the lines of symmetry.' },
      'Real snowflakes are not always perfect. As a snowflake falls, it tumbles through air that is warmer, colder, wetter or drier, and each change makes it grow a little differently. That is why people say no two snowflakes are alike.',
      { box: 'Try it', text: 'Fold a circle of paper in half, then into thirds, like a cone. Cut small shapes along the edges and unfold it. Your paper snowflake will have lines of symmetry too.' },
      'Symmetry is everywhere in nature: in butterfly wings, leaves, flowers and even your own face. Once you start looking, you will find it all around you.'
    ],
    guide: { before: 'Fold a paper heart or butterfly shape in half and cut it to show one line of symmetry. Teach <b>symmetry</b> and <b>line of symmetry</b>. Hold a small mirror on the diagram’s lines.',
      after: 'Go on a symmetry hunt at home or outside. Find three things with one line of symmetry and one with more than one.' },
    words: [['symmetry', 'when one half of a shape matches the other half'], ['line of symmetry', 'a line that splits a shape into two matching halves']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Vermont has snow.', 'Snowflakes have six-sided symmetry, and each one grows a little differently.', 'Cameras are old.', 'Butterflies have wings.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How many lines of symmetry does a perfect snowflake have?',
        opts: ['6', '2', '12'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do snowflakes have six sides?',
        opts: ['Water freezes in six-sided rings.', 'The wind cuts them.', 'They fall from six clouds.'], a: 0 },
      { k: 'table', code: 'C3.2', q: 'How many lines of symmetry? Fill in the chart.', cols: ['Shape', 'Lines of symmetry'],
        rows: [['a perfect snowflake', null], ['a butterfly', null], ['a square', null]],
        a: [[null, '6'], [null, '1'], [null, '4']] },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why are no two snowflakes alike?',
        opts: ['Each one falls through different air as it grows.', 'They melt too fast.', 'Bentley drew them by hand.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Micro</b> means very small. A <b>micro</b>scope helps you see …',
        opts: ['very small things', 'faraway stars', 'sounds'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How did Wilson Bentley help people learn about snowflakes?',
        a: 'He was the first to photograph a single snowflake, and he took more than 5 000 photos, so people could see their shapes up close.', look: 'his first photo and his many photos' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'In one or two sentences, summarize why snowflakes are symmetrical.',
        a: 'Water freezes in six-sided rings, so snowflakes grow six arms with six lines of symmetry.', look: 'the six-sided pattern and symmetry' }
    ]
  });

  P.add({
    id: 'g4-seaway', subject: 'geography', form: 'Explanation',
    title: 'Stairs for Ships',
    deck: 'How the St. Lawrence Seaway lifts ships into the heart of the continent',
    hero: {
      photo: 'g4-seaway-lock.jpg', credit: 'Photo: U.S. Navy, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'A ship waits inside a lock on the St. Lawrence Seaway, between high concrete walls.'
    },
    body: [
      'Imagine trying to sail a ship from the Atlantic Ocean all the way to Thunder Bay, in the middle of the continent. Along the way, the water climbs higher and higher. Lake Superior is about 180 metres higher than the ocean, which is taller than a 50-storey building. And the Niagara River has a giant waterfall in the way! How can a ship climb a waterfall?',
      { h: 'A water staircase' },
      'The answer is the St. Lawrence Seaway, which opened in 1959. It is a system of rivers, lakes, canals and <b>locks</b> that lets large ships travel between the Atlantic Ocean and the Great Lakes. Canada and the United States built it and run it together. To get around Niagara Falls, ships use the Welland Canal in Ontario, which has eight locks of its own.',
      { h: 'How a lock works' },
      'A lock is like a giant concrete box with watertight gates at each end. When a ship going upstream sails into the lock, the gates behind it close. <b>Valves</b> open, and water from the higher part of the river flows into the lock. No pumps are needed, because water flows downhill on its own. As the water rises, the ship floats up with it. When the water in the lock is level with the river ahead, the front gates open, and the ship sails on. A ship going downstream does the same thing in reverse.',
      { fig: '<path class="k" d="M0 130 H200 V110 H300"/><path class="a" d="M0 100 H96 M204 60 H300"/><rect class="h" x="104" y="60" width="92" height="70"/>' +
          '<rect class="k" x="96" y="30" width="8" height="100"/><rect class="k" x="196" y="30" width="8" height="80"/>' +
          '<path class="k" d="M120 52 H180 L172 64 H128 Z M140 52 V40 H160 V52"/>' + D.arrow(112, 116, 112, 72) +
          '<text class="n" x="48" y="92" text-anchor="middle">lower river</text><text class="n" x="252" y="52" text-anchor="middle">upper river</text>' +
          D.label(10, 22, 'back gate', 98, 36) + D.label(220, 22, 'front gate', 202, 36),
        tall: 140, cap: 'A ship in a lock. The water has risen to the level of the upper river.' },
      { h: 'Ships of the lakes' },
      'The Seaway is busy from spring until the lakes freeze in winter. Long ships called lakers carry grain from the Prairies, iron ore for making steel, salt for winter roads and many other goods. The longest lakers are more than three hockey rinks long, and they fit into the locks with only a few metres to spare.',
      { box: 'Did you know?', text: 'Ships pay a fee, called a toll, to use the Seaway. The money helps pay to run and repair the locks.' },
      'Building the Seaway changed the land, too. To make the river deep enough, engineers built dams that flooded several villages along the St. Lawrence in Ontario. About 6 500 people had to move to new homes. Today, these places are remembered as the Lost Villages.'
    ],
    guide: { before: 'Trace the route from the Atlantic Ocean, up the St. Lawrence River, to Lake Superior on a map. Teach <b>lock</b> and <b>valve</b>. Float a toy boat in a sink and add water to watch it rise.',
      after: 'Why do you think it is cheaper to move grain or salt by ship than by truck? What would happen if the Seaway closed?' },
    words: [['locks', 'sections of a canal with gates, where the water level is raised or lowered to move boats'], ['valves', 'parts that open and close to control the flow of water']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Lake Superior is big.', 'The St. Lawrence Seaway uses locks to lift ships between the ocean and the Great Lakes.', 'Ships carry salt.', 'Niagara Falls is high.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps for a ship going up.',
        items: ['The ship sails into the lock.', 'The gates behind it close.', 'Water flows in, and the ship rises.', 'The front gates open.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are no pumps needed to fill a lock?',
        opts: ['Water flows downhill on its own.', 'The ship pushes the water.', 'Rain fills it.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'What do lakers carry? Fill in the chart.', cols: ['Goods', 'Used for'],
        rows: [['grain', null], ['iron ore', null], ['salt', null]],
        a: [[null, 'food, from the Prairies'], [null, 'making steel'], [null, 'winter roads']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Water</b>tight means water cannot get in. What does <b>air</b>tight mean?',
        opts: ['air cannot get in', 'full of air', 'light as air'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the writer call the Seaway “a water staircase”?',
        opts: ['Locks lift ships step by step, like stairs.', 'It has real stairs.', 'It is made of wood.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think Canada and the United States built the Seaway together?',
        a: 'The Great Lakes and the St. Lawrence are shared by both countries, and both use the Seaway to ship goods, so working together made sense.', look: 'shared waters and shared use' },
      { k: 'lines', code: 'C2.7', n: 2, q: 'A lock is hard to picture. What did you do to understand how a lock works? How did it help?',
        a: 'Example: I followed the diagram one step at a time and pictured a bathtub filling up, so I could see the ship rising.', look: 'a strategy (diagram, visualizing, rereading) and how it helped' }
    ]
  });

  P.add({
    id: 'g4-rideau-canal', subject: 'history', form: 'Report',
    title: 'Skating to Work',
    deck: 'How a canal built for war became the world’s longest skating path',
    hero: {
      photo: 'g4-rideau-skateway.jpg', credit: 'Photo: Ahunt, CC0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Skaters crowd the frozen Rideau Canal in downtown Ottawa.'
    },
    body: [
      'Every winter in Ottawa, a canal in the middle of the city freezes over and becomes a skating path almost 8 kilometres long. It is called the Rideau Canal Skateway. On a cold morning, you might see people skating to work with briefcases, students skating to school, and families gliding along with hot chocolate.',
      { h: 'A canal built for war' },
      'The Rideau Canal was not built for skating. After the War of 1812, Britain worried that the United States might attack again. The main supply route, the St. Lawrence River, ran right along the American border. So the British decided to build a safer <b>canal</b>, away from the border, from Kingston to the place that is now Ottawa.',
      'Lieutenant-Colonel John By was put in charge. From 1826 to 1832, thousands of workers, many of them Irish and French-Canadian, dug channels, built dams and constructed locks, mostly by hand, with shovels, picks and horses. The work was dangerous. Many workers became sick with malaria, a disease spread by mosquitoes in the swamps, and hundreds died.',
      { fig: '<circle class="dot" cx="150" cy="20" r="4"/><circle class="dot" cx="190" cy="124" r="4"/>' +
          '<path class="a" d="M150 22 Q118 52 140 72 T188 120"/><path class="k" d="M192 124 Q240 108 296 66"/><path class="d" d="M184 142 Q240 126 296 88"/>' +
          '<text class="lb" x="160" y="24">Ottawa</text><text class="lb" x="182" y="128" text-anchor="end">Kingston</text>' +
          D.label(20, 70, 'Rideau Canal', 128, 60) + '<text class="l" x="296" y="58" text-anchor="end">St. Lawrence River</text><text class="l" x="238" y="150">US border</text>',
        tall: 156, cap: 'The canal gave a safer route, away from the border.' },
      { h: 'From war route to winter fun' },
      'In the end, the attack never came. Instead, the canal was used for shipping lumber and goods, and later for pleasure boats. In 2007, the Rideau Canal became a <b>World Heritage Site</b>, a place protected because it is important to the whole world.',
      'The canal runs through the traditional lands of the Algonquin Anishinaabe people, who travelled these waters by canoe long before the canal was built.',
      { box: 'Skateway facts', text: 'The Skateway opened in 1971. Workers flood the ice at night to keep it smooth, and they check its thickness every day.' },
      'Today, the Skateway is a big part of Winterlude, Ottawa’s winter festival, held every February. Visitors skate past ice sculptures, snow slides and food stands, all on a canal that was once built to keep soldiers safe.'
    ],
    guide: { before: 'Find Ottawa, Kingston and the St. Lawrence River on a map of Ontario. Teach <b>canal</b> and <b>World Heritage Site</b>. Talk about why a border could be dangerous in a war.',
      after: 'The canal was built for war but is now used for fun. Can you think of something else that is now used in a different way than it was built for?' },
    words: [['canal', 'a waterway dug by people for boats to travel on'], ['World Heritage Site', 'a place protected because it is important to the whole world']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Ottawa is cold.', 'The Rideau Canal was built as a safe war route and is now a famous skating path.', 'John By was a soldier.', 'Mosquitoes spread disease.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Which city is at the south end of the canal?',
        opts: ['Kingston', 'Ottawa', 'Montréal'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Britain want a route away from the St. Lawrence?',
        opts: ['The river ran along the American border.', 'The river was too cold.', 'The river was too short.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the events in order.',
        items: ['The War of 1812 ends.', 'Workers build the canal.', 'The Skateway opens.', 'The canal becomes a World Heritage Site.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.3', q: 'How has the canal been used? Fill in the chart.', cols: ['In the past', 'Today'],
        rows: [[null, null]],
        a: [['as a safe supply route, then for shipping lumber and goods', 'for pleasure boats in summer and skating in winter']] },
      { k: 'choice', code: 'B2.2', half: true, q: 'A work<b>er</b> is someone who works. What is a skat<b>er</b>?',
        opts: ['someone who skates', 'a kind of skate', 'a skating rink'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'What caused many workers to die?',
        opts: ['malaria spread by mosquitoes', 'the cold winter', 'falling ice'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why do you think the writer mentions the Algonquin Anishinaabe people?',
        a: 'To remind readers that Indigenous people lived on and travelled these waters long before the canal was built.', look: 'recognizes Indigenous people as the first users of the land and water' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'The writer says, “the attack never came.” How was the canal useful anyway?',
        a: 'It was used to ship lumber and goods, then for pleasure boats, and now thousands of people skate on it in winter.', look: 'other uses from the text' }
    ]
  });

  P.add({
    id: 'g4-rocky-mountains', subject: 'geography', form: 'Report',
    title: 'Where Mountains Touch the Sky',
    deck: 'How the Rocky Mountains formed, and why their lakes are so blue',
    hero: {
      photo: 'g4-moraine-lake.jpg', credit: 'Photo: Scruffdog1, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'Moraine Lake in Banff National Park, Alberta, below the snowy peaks of the Rockies.'
    },
    body: [
      'In western Canada, the Rocky Mountains rise like a jagged wall along the border between Alberta and British Columbia. Their peaks are covered with snow even in summer. Below them lie forests, rushing rivers and lakes so blue they look painted.',
      { h: 'How the mountains formed' },
      'The Rockies began forming about 80 million years ago. The surface of the Earth is broken into giant pieces called plates, which move very slowly, about as fast as your fingernails grow. Off the west coast, two plates pushed against each other. Over millions of years, the pushing squeezed and folded the rock layers and piled them up into mountains, the way a rug wrinkles when you push it from one end.',
      { fig: '<path class="h" d="M10 80 H130 V96 H10 Z"/><path class="k" d="M10 64 H130 M10 80 H130 M10 96 H130"/>' +
          '<path class="k" d="M170 110 Q200 110 215 70 Q230 30 245 70 Q260 110 290 110 M170 126 Q200 126 215 86 Q230 46 245 86 Q260 126 290 126"/>' +
          D.arrow(150, 118, 168, 118) + D.arrow(300, 118, 292, 118) +
          '<text class="n" x="70" y="122" text-anchor="middle">1. flat rock layers</text><text class="n" x="230" y="150" text-anchor="middle">2. pushed and folded</text>',
        tall: 156, cap: 'When plates push together, flat rock layers fold up into mountains.' },
      { h: 'Why the lakes are so blue' },
      'Many lakes in the Rockies, like Moraine Lake in the photo, are a bright turquoise colour. The colour comes from glaciers. As a glacier slides, it grinds rock into a powder so fine that it is called <b>rock flour</b>. Meltwater carries the rock flour into the lakes, where it floats and reflects the blue and green parts of sunlight.',
      { h: 'A protected place' },
      'In 1885, Banff became Canada’s first <b>national park</b>, a place protected so that people can enjoy nature without harming it. Elk, bighorn sheep, grizzly bears and mountain goats live in the park. To keep animals safe, Banff built wide bridges covered in trees and grass over the highway. Animals cross on these wildlife bridges instead of running into traffic.',
      { box: 'Did you know?', text: 'The Stoney Nakoda, Blackfoot and Ktunaxa peoples have lived in and travelled through these mountains for thousands of years.' },
      'The glaciers that feed these lakes are shrinking as the climate warms. Scientists measure them every year to see how fast they are melting, and how that might change the rivers that flow from the mountains.'
    ],
    guide: { before: 'Find Alberta, British Columbia and Banff on a map. Teach <b>rock flour</b> and <b>national park</b>. Push a towel from both ends on a table to show how rock folds.',
      after: 'Have you visited a national or provincial park? What rules help protect animals there? Why do they matter?' },
    words: [['rock flour', 'rock ground into a very fine powder by a glacier'], ['national park', 'land the country protects so that nature stays wild']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Banff has elk.', 'The Rocky Mountains formed when plates pushed together, and their lakes and wildlife are protected.', 'Snow is white.', 'Glaciers are cold.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What happens to the rock layers when plates push?',
        opts: ['They fold and pile up.', 'They melt.', 'They turn blue.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Rock folds “the way a rug wrinkles.” This comparison helps you …',
        opts: ['picture how mountains formed', 'know how old a rug is', 'measure a mountain'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps that make a lake turquoise.',
        items: ['A glacier slides over rock.', 'It grinds the rock into rock flour.', 'Meltwater carries the flour into the lake.', 'The flour reflects blue and green light.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.2', q: 'How does the park keep animals safe?', cols: ['Problem', 'Solution'],
        rows: [['Animals could run into traffic on the highway.', null]],
        a: [[null, 'Wildlife bridges covered in trees and grass let them cross over the road.']] },
      { k: 'choice', code: 'C3.3', half: true, q: 'How fast do the Earth’s plates move?',
        opts: ['about as fast as fingernails grow', 'as fast as a car', 'not at all'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Melt</b>water is water from melting ice. What is <b>rain</b>water?',
        opts: ['water from rain', 'water that makes rain', 'water in a river'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why do you think Canada protects places like Banff as national parks?',
        a: 'So that nature and animals stay safe, and so people in the future can still enjoy the mountains, lakes and wildlife.', look: 'protection now and for the future' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why might an animal use a wildlife bridge instead of crossing the road?',
        a: 'The bridge is covered with trees and grass, so it feels like the forest, and there are no cars on it.', look: 'feels natural and is safe' }
    ]
  });

  P.add({
    id: 'g4-snow-house', subject: 'social', form: 'Explanation',
    title: 'Building with Snow',
    deck: 'How Inuit builders make a warm house out of snow',
    hero: {
      photo: 'g4-igloo.jpg', credit: 'Photo: Canadian Museum of History, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Inuinnait men build a snow house on the sea ice, early 1900s.'
    },
    body: [
      'For thousands of years, Inuit in the Arctic have built shelters out of the most common material around them: snow. In Inuktitut, the word iglu simply means house. A snow house for winter travel and hunting can be put up in an hour or two by skilled builders.',
      { h: 'The right snow' },
      'Not just any snow will do. Builders look for snow that the wind has packed hard, so it can be cut into firm blocks. To test it, they push a long, thin probe into the snow to feel its layers. Then, with a long snow knife, they cut blocks about the size of a big suitcase.',
      { h: 'A spiral of blocks' },
      'The builder stands inside a circle and places the first row of blocks around it. The tops of the blocks are trimmed on a slant, so the next row climbs upward in a spiral, leaning inward a little more with each row. Each block is shaped to rest against the ones beside it. Finally, a last block is lowered into the top like a key. The blocks freeze together, and the dome becomes strong enough for a person to stand on.',
      { fig: '<path class="k" d="M40 120 Q40 26 150 26 Q260 26 260 120"/><path class="k" d="M0 110 H40 M0 140 H60 V120 H260"/>' +
          '<rect class="h" x="170" y="96" width="86" height="24"/><path class="t" d="M146 18 V30 M154 18 V30"/>' +
          D.label(180, 14, 'air hole', 154, 24) + D.label(52, 14, 'snow blocks', 66, 58) +
          '<text class="n" x="213" y="88" text-anchor="middle">warm sleeping platform</text><text class="n" x="8" y="156">cold air stays low, in the tunnel</text>',
        tall: 162, cap: 'Inside a snow house. Warm air rises, and cold air sinks.' },
      { h: 'Warm inside' },
      'Snow is full of tiny air pockets, which make it a good <b>insulator</b>. It keeps heat in and cold out. The entrance is a low tunnel, dug lower than the floor. Cold air sinks and stays in the tunnel, while warm air rises to the sleeping platform. A stone lamp called a <b>qulliq</b>, which burns oil from seals, gives light and heat. A small hole near the top lets fresh air in. Even when it is minus 40 °C outside, it can be near freezing or warmer inside.',
      { box: 'Today', text: 'Most Inuit now live in wooden houses, but many still know how to build snow houses. Elders teach young people the skill, and snow houses are still built on long hunting trips.' }
    ],
    guide: { before: 'Find Nunavut and the Arctic on a map. Teach <b>insulator</b> and <b>qulliq</b>. Ask: why might a house made of snow keep you warm?',
      after: 'Elders teach young people how to build snow houses. What is a skill an older person in your life could teach you?' },
    words: [['insulator', 'a material that keeps heat from passing through'], ['qulliq', 'a stone lamp that burns seal oil for light and heat']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Snow is cold.', 'Inuit builders use hard-packed snow to build strong, warm houses.', 'Seals live in the Arctic.', 'Knives are sharp.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, why is the tunnel lower than the floor?',
        opts: ['Cold air sinks and stays in it.', 'It is easier to dig.', 'To hide from animals.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is snow a good insulator?',
        opts: ['It is full of tiny air pockets.', 'It is white.', 'It is heavy.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps for building a snow house.',
        items: ['Test the snow.', 'Cut the blocks.', 'Build the rows in a spiral.', 'Lower the last block into the top.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.3', q: 'How does each part help? Fill in the chart.', cols: ['Part', 'How it helps'],
        rows: [['raised sleeping platform', null], ['small hole near the top', null], ['qulliq', null]],
        a: [[null, 'Warm air rises, so it is the warmest place.'], [null, 'It lets fresh air in.'], [null, 'It gives light and heat.']] },
      { k: 'choice', code: 'B2.1', half: true, q: 'The ending <b>-or</b> can mean “a thing that does something.” An insulat<b>or</b> is …',
        opts: ['a thing that insulates', 'a kind of snow', 'a cold place'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The last block goes in “like a key.” This means it …',
        opts: ['locks the dome together', 'opens a door', 'is made of metal'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do builders need snow that the wind has packed hard?',
        a: 'Hard-packed snow can be cut into firm blocks that hold their shape and freeze together into a strong dome.', look: 'firm blocks that hold their shape' },
      { k: 'lines', code: 'C3.4', n: 2, q: 'Why is it important that Elders teach young people to build snow houses?',
        a: 'So the knowledge is not lost, young people can stay safe on hunting trips, and the culture stays strong.', look: 'safety and keeping knowledge and culture alive' }
    ]
  });

  P.add({
    id: 'g4-pyramids', subject: 'history', form: 'Report',
    title: 'Mountains Made by Hand',
    deck: 'Who built the pyramids of Egypt, and how',
    hero: {
      photo: 'g4-pyramids.jpg', credit: 'Photo: Ricardo Liberato, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'The pyramids of Giza, near Cairo, Egypt. The Great Pyramid is at the back.'
    },
    body: [
      'On the edge of the desert near Cairo, Egypt, three giant pyramids rise from the sand. The biggest, the Great Pyramid, was built about 4 500 years ago for a king, or <b>pharaoh</b>, named Khufu. When it was finished, it stood about 146 metres tall. For almost 4 000 years, it was the tallest building made by people anywhere on Earth.',
      { h: 'A home for the afterlife' },
      'The ancient Egyptians believed that life continued after death. A pharaoh’s body was carefully preserved as a <b>mummy</b> and placed in a tomb with food, furniture, jewels and other things he might need in the next life. The pyramids were giant tombs, built to protect the pharaohs’ bodies and treasures forever.',
      { h: 'How was it built?' },
      'The Great Pyramid is made of about 2.3 million stone blocks. Many weigh more than a car. Workers cut the blocks with copper tools and dragged them on wooden sleds. Pouring water on the sand in front of a sled made it easier to pull. Most experts think workers built long ramps of mud brick and rubble to drag the blocks higher and higher.',
      { fig: '<path class="h" d="M60 130 L150 30 L240 130 Z"/><path class="k" d="M60 130 L150 30 L240 130 Z M0 130 H300"/><path class="k" d="M300 130 L196 84"/>' +
          '<rect class="k" x="244" y="100" width="16" height="10" transform="rotate(-24 252 105)"/><circle class="k" cx="234" cy="96" r="3"/><circle class="k" cx="224" cy="92" r="3"/>' +
          '<path class="d" d="M30 30 H150"/>' + D.arrow(40, 80, 40, 34) + D.arrow(40, 80, 40, 126) + '<text class="n" x="4" y="84">146 m</text>' +
          D.label(268, 76, 'ramp', 276, 118) + D.label(150, 152, 'a stone block on a sled', 250, 108),
        tall: 158, cap: 'One idea of how blocks were dragged up a ramp. Not to scale.' },
      'For a long time, people thought the pyramids were built by enslaved people. But archaeologists have found the remains of the workers’ village nearby, with bakeries, houses and graves. Most workers were skilled builders and farmers who were paid in bread, beer and other goods. They worked in teams and took pride in their work.',
      'Inside the Great Pyramid, narrow passages lead to a room called the King’s Chamber, built of huge granite blocks. Robbers broke into the pyramids long ago and took most of the treasures.',
      { box: 'Did you know?', text: 'The sides of the Great Pyramid line up almost perfectly with north, south, east and west. The builders probably used the stars to find the directions.' }
    ],
    guide: { before: 'Find Egypt and the Nile on a map. Teach <b>pharaoh</b> and <b>mummy</b>. Try dragging a heavy book on a tray across a table, then across a wet tray.',
      after: 'Why do you think people today are still so amazed by the pyramids? What question would you ask an archaeologist?' },
    words: [['pharaoh', 'a king of ancient Egypt'], ['mummy', 'a body that has been dried and wrapped to keep it from decaying']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Egypt is hot.', 'The pyramids were giant tombs built by skilled workers about 4 500 years ago.', 'Copper is a metal.', 'Sleds slide on snow.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were the pyramids built?',
        opts: ['as tombs to protect the pharaohs', 'as houses for workers', 'as places to store grain'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what helped workers drag blocks higher?',
        opts: ['a ramp', 'a crane', 'a truck'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps for moving a block.',
        items: ['Cut the block with copper tools.', 'Load it onto a wooden sled.', 'Pour water on the sand.', 'Drag it up the ramp.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.2', q: 'What did archaeologists find? Fill in the chart.', cols: ['Clue', 'What it tells us'],
        rows: [['a village with bakeries and houses', null], ['workers’ graves near the pyramids', null]],
        a: [[null, 'The workers lived nearby and were fed.'], [null, 'The workers were respected and buried with care.']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did workers pour water on the sand?',
        opts: ['It made the sled easier to pull.', 'To cool their feet.', 'To clean the blocks.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Ancient</b> means very old. Which word means the opposite?',
        opts: ['modern', 'old', 'tall'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How did archaeologists change what people believed about who built the pyramids?',
        a: 'People thought enslaved people built them, but the workers’ village with bakeries, houses and graves showed that most workers were paid, skilled builders and farmers.', look: 'old belief, new evidence, new understanding' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why do you think the pyramids have lasted 4 500 years?',
        a: 'They are made of millions of huge, heavy stone blocks, and the dry desert does not wear them away quickly.', look: 'strong materials and dry climate' }
    ]
  });

  P.add({
    id: 'g4-tenochtitlan', subject: 'history', form: 'Report',
    title: 'A City on a Lake',
    deck: 'Tenochtitlan, the great island city of the Mexica',
    hero: {
      photo: 'g4-tenochtitlan.jpg', credit: 'Photo: Steve Cadman, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A museum model of the centre of Tenochtitlan, with the Great Temple at the back.'
    },
    body: [
      'About 700 years ago, a people called the Mexica, often known as the Aztecs, were looking for a new home in the Valley of Mexico. Their story says their god told them to settle where they saw an eagle sitting on a cactus, eating a snake. They found that sign on a small, swampy island in Lake Texcoco. There, in 1325, they began building a city called Tenochtitlan.',
      { h: 'Building on water' },
      'Building on a lake was not easy, but the Mexica were clever engineers. They connected the island to the shore with three long <b>causeways</b>, raised roads built across the water. Some causeways had bridges that could be removed to keep enemies out. A stone channel called an aqueduct carried fresh drinking water from springs on the mainland.',
      { fig: '<rect class="h" x="10" y="10" width="280" height="130" rx="30"/><circle class="k" cx="150" cy="76" r="30"/>' +
          '<path class="k" d="M120 76 H20 M150 46 V14 M150 106 V136"/><path class="d" d="M170 52 Q230 30 286 26"/>' +
          '<rect class="t" x="186" y="84" width="14" height="8"/><rect class="t" x="204" y="84" width="14" height="8"/><rect class="t" x="186" y="96" width="14" height="8"/><rect class="t" x="204" y="96" width="14" height="8"/>' +
          '<text class="lb" x="150" y="80" text-anchor="middle">city</text>' + D.label(20, 66, 'causeway', 60, 76) + D.label(226, 120, 'chinampas', 210, 100) + D.label(214, 52, 'aqueduct', 236, 38),
        tall: 150, cap: 'A simple map of Tenochtitlan on Lake Texcoco. Not to scale.' },
      { h: 'Floating gardens' },
      'To grow food, the Mexica built <b>chinampas</b>. These were long, narrow fields made by piling mud and plants from the lake bottom inside fences of woven sticks. Willow trees planted at the edges held the soil in place. Farmers grew corn, beans, squash, peppers and flowers on them. Canals between the chinampas worked like streets, and people travelled by canoe.',
      { h: 'A busy capital' },
      'Tenochtitlan grew into one of the largest cities in the world, with perhaps 200 000 people. At its centre stood the Great Temple, a pyramid with two shrines on top. Nearby was a huge market where tens of thousands of people came to trade cacao beans, cotton cloth, feathers, pottery and food. Children went to school to learn history, songs and skills for work. Mexica scholars kept records in folding books painted with pictures and symbols. When Spanish visitors first saw the city, they were amazed by how large, clean and well organized it was.',
      { box: 'Then and now', text: 'Spanish soldiers arrived in 1519 and conquered the city two years later. Today, Mexico City stands on the same spot. Most of the lake was drained long ago, but chinampas still grow flowers and vegetables in Xochimilco, at the south edge of the city.' }
    ],
    guide: { before: 'Find Mexico City on a map. Teach <b>causeway</b> and <b>chinampa</b>. Point out the eagle on the Mexican flag and connect it to the story.',
      after: 'Which idea of the Mexica engineers do you think was the cleverest? Why?' },
    words: [['causeways', 'raised roads built across water or wet land'], ['chinampas', 'farm fields built up from mud in a lake']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Eagles eat snakes.', 'The Mexica built a great city on a lake, with causeways and floating gardens.', 'Mexico is hot.', 'Corn is a plant.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. What brought fresh water to the city?',
        opts: ['an aqueduct', 'a causeway', 'a chinampa'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did some causeways have bridges that could be removed?',
        opts: ['to keep enemies out', 'to let boats sail under', 'to clean them'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'How did the Mexica solve each problem?', cols: ['Problem', 'Solution'],
        rows: [['getting from the island to the shore', null], ['finding drinking water', null], ['growing food', null]],
        a: [[null, 'They built causeways.'], [null, 'An aqueduct carried water from springs.'], [null, 'They built chinampas in the lake.']] },
      { k: 'order', code: 'C3.3', q: 'Number the events in order.',
        items: ['The Mexica see the eagle on a cactus.', 'They begin building Tenochtitlan.', 'Spanish soldiers arrive.', 'Mexico City stands on the same spot.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Main</b>land joins two words. It means …',
        opts: ['the main part of the land, not an island', 'a land of rain', 'a busy road'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Canals between the chinampas worked like streets.” This means people …',
        opts: ['travelled along the canals', 'walked on water', 'planted in the canals'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think the writer calls the Mexica “clever engineers”? Give two examples.',
        a: 'They built causeways across the lake to reach the shore, and they built chinampas so they could farm on water.', look: 'two examples of building solutions' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'Why does the writer tell us chinampas are still used today?',
        a: 'To show that the Mexica way of farming still works and is still part of life in Mexico City.', look: 'a link between the past and the present' }
    ]
  });

  P.add({
    id: 'g4-castles', subject: 'history', form: 'Report',
    title: 'Inside the Castle Walls',
    deck: 'How castles in the Middle Ages kept people safe',
    hero: {
      photo: 'g4-castle.jpg', credit: 'Photo: JKMMX, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Pembroke Castle in Wales, built more than 800 years ago, beside a river.'
    },
    body: [
      'About a thousand years ago, in the time we call the Middle Ages, kings and nobles in Europe built strong stone castles. A castle was both a home and a fortress. It protected the lord, his family, his soldiers and the people who worked for him, and it showed everyone how powerful he was.',
      { h: 'Built to keep enemies out' },
      'Many castles were surrounded by a <b>moat</b>, a deep ditch filled with water. To cross it, visitors used a drawbridge, which could be pulled up in an attack. Behind it was a heavy iron gate called a portcullis that slid down to block the entrance. Thick outer walls, called curtain walls, ran between tall towers. Soldiers on top could shoot arrows through narrow openings while staying safe behind the stone.',
      { fig: '<path class="h" d="M0 120 H60 V136 H0 Z"/><path class="k" d="M0 120 H60 M60 120 V136 H0"/>' +
          '<rect class="k" x="60" y="56" width="26" height="64"/><path class="k" d="M60 56 V48 H66 V56 M73 56 V48 H79 V56"/><path class="k" d="M86 72 H140 V120 M86 120 H300"/>' +
          '<rect class="h" x="160" y="36" width="70" height="84"/><path class="k" d="M160 36 V28 H170 V36 M180 36 V28 H190 V36 M200 36 V28 H210 V36 M220 36 V28 H230 V36"/>' +
          '<path class="t" d="M60 120 L30 108"/>' +
          D.label(8, 152, 'moat', 30, 128) + D.label(4, 26, 'drawbridge', 40, 112) + D.label(100, 26, 'tower', 74, 52) + D.label(96, 152, 'curtain wall', 112, 100) + D.label(236, 24, 'keep', 220, 40),
        tall: 158, cap: 'The main parts of a castle, seen from the side. Not to scale.' },
      'In the middle stood the <b>keep</b>, the strongest tower of all. If enemies broke through the outer walls, everyone could retreat into the keep. It stored food and water so people could survive a long attack.',
      { h: 'Daily life' },
      'Life in a castle was busy, and often cold, dark and smoky. Fires burned in big fireplaces, but stone walls held the chill. The lord and lady ate in the great hall, while cooks, blacksmiths, grooms, guards and servants worked all day. Children of nobles learned to ride, read and, for some boys, train to become knights.',
      { box: 'The end of castles', text: 'When armies began to use cannons in the 1400s, even thick stone walls could be smashed. Over time, castles became homes, museums and ruins instead of fortresses.' },
      'Pembroke Castle, in the photo, was built more than 800 years ago. A future king of England, Henry VII, was born there in 1457. Today, visitors climb its towers and imagine life inside the walls.'
    ],
    guide: { before: 'Ask what the child already knows about castles and knights. Teach <b>moat</b> and <b>keep</b>. Look at the diagram and trace the path an enemy would have to take.',
      after: 'If you were designing a castle, what would you add to keep it safe? What would you add to make it more comfortable?' },
    words: [['moat', 'a deep, wide ditch filled with water around a castle'], ['keep', 'the strongest tower in the middle of a castle']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Castles are old.', 'Castles in the Middle Ages were strong homes built to protect people from attack.', 'Knights rode horses.', 'Wales has rivers.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'How did each part protect the castle?', cols: ['Part', 'How it helped'],
        rows: [['moat', null], ['portcullis', null], ['keep', null]],
        a: [[null, 'Enemies had to cross deep water.'], [null, 'It slid down to block the entrance.'], [null, 'People could retreat there, with food and water.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is beside the moat?',
        opts: ['the drawbridge', 'the keep', 'the great hall'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“If enemies broke through the outer walls, everyone could retreat into the keep.” Which part could NOT stand alone as a sentence?',
        opts: ['If enemies broke through the outer walls', 'everyone could retreat into the keep', 'Both parts could stand alone.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Draw</b>bridge: draw can mean “pull.” A drawbridge is a bridge that …',
        opts: ['can be pulled up', 'has pictures on it', 'is very long'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'What is the box “The end of castles” about?',
        opts: ['how cannons changed castles', 'how to build a moat', 'a king’s birthday'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why was life in a castle often uncomfortable? Use details from the text.',
        a: 'Castles were cold, dark and smoky. The stone walls held the chill even with big fires burning.', look: 'cold, dark, smoky, with a detail' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'The text says a castle “showed everyone how powerful he was.” What does this tell you about lords?',
        a: 'Lords wanted people to see their wealth and power, so a big castle was a way to show off as well as to stay safe.', look: 'power and status, not just safety' }
    ]
  });

  P.add({
    id: 'g4-three-sisters', subject: 'social', form: 'Explanation',
    title: 'The Three Sisters',
    deck: 'Why corn, beans and squash grow best together',
    hero: {
      photo: 'g4-three-sisters.jpg', credit: 'Photo: U.S. National Park Service, public domain, Wikimedia Commons', focus: '50% 60%',
      tall: 220,
      cap: 'A Three Sisters garden of corn, beans and squash beside a log cabin.'
    },
    body: [
      'Long before Europeans arrived, many First Nations in what is now Ontario and Quebec, including the Haudenosaunee and the Wendat, were skilled farmers. Their most important crops were corn, beans and squash. They planted them together in the same small hills of soil and called them the Three Sisters, because the plants help each other grow, like sisters in a family.',
      { h: 'How the sisters help each other' },
      'Each sister has a job. Corn grows tall and straight, so it gives the beans a pole to climb. Beans wind around the corn stalks to reach the sunlight. They also do something amazing for the soil: they add <b>nutrients</b> that corn and squash need. Squash spreads its huge, prickly leaves across the ground. The leaves shade the soil so it stays damp, block weeds from growing, and make hungry animals think twice.',
      { fig: '<path class="k" d="M30 134 Q150 104 270 134"/><path class="k" d="M150 120 V20 M150 60 L128 44 M150 80 L172 64 M150 100 L130 86"/><path class="a" d="M146 116 Q160 104 146 92 Q134 80 150 68 Q164 56 150 44 Q138 34 150 24"/>' +
          '<path class="h" d="M60 128 Q80 108 104 124 Q84 136 60 128 Z M196 124 Q220 106 242 128 Q218 136 196 124 Z"/>' +
          D.label(186, 22, 'corn: a pole', 152, 30) + D.label(6, 60, 'beans: feed the soil', 146, 80) + D.label(196, 98, 'squash: shades', 218, 120),
        tall: 144, cap: 'The Three Sisters growing in one hill of soil.' },
      'This way of growing different plants side by side so they help each other is called <b>companion planting</b>. Farmers who planted the Three Sisters could grow more food in less space, year after year, without wearing out the soil.',
      { h: 'Good food together' },
      'The Three Sisters are healthy together on the plate, too. Corn gives energy, beans give protein, and squash gives vitamins. Corn soup and corn bread made with beans were important foods. The dried crops could be stored through the long winter.',
      { box: 'Still growing', text: 'Many Haudenosaunee families and schools still plant Three Sisters gardens today, and the seeds of old varieties are saved and shared from year to year.' },
      'The Three Sisters show how careful observation of nature can lead to smart solutions. Some farmers and gardeners today are learning from this Indigenous knowledge.'
    ],
    guide: { before: 'Look at a bean seed, a corn kernel and a squash seed if you have them. Teach <b>nutrients</b> and <b>companion planting</b>. Point to each sister in the diagram.',
      after: 'Who in your life helps you, and how do you help them? How are people in a family or a class like the Three Sisters?' },
    words: [['nutrients', 'things in soil or food that help living things grow'], ['companion planting', 'growing plants together so they help each other']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Corn is tall.', 'Corn, beans and squash help each other grow when planted together.', 'Squash is prickly.', 'Soup is good.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'What is each sister’s job? Fill in the chart.', cols: ['Sister', 'How it helps'],
        rows: [['corn', null], ['beans', null], ['squash', null]],
        a: [[null, 'It gives the beans a pole to climb.'], [null, 'It adds nutrients to the soil.'], [null, 'Its leaves shade the soil, keep it damp and block weeds.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which plant climbs the corn?',
        opts: ['beans', 'squash', 'weeds'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why are the plants called sisters?',
        opts: ['They help each other, like a family.', 'They look the same.', 'They are the same age.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might animals stay away from the garden?',
        opts: ['The squash leaves are prickly.', 'The corn is loud.', 'The beans are bitter.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>com</b>panion is a friend who goes with you. Planting <b>com</b>panions are plants that …',
        opts: ['grow together and help each other', 'grow alone', 'grow far apart'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How did the Three Sisters help First Nations farmers? Give two details.',
        a: 'They could grow more food in less space without wearing out the soil, and the dried crops could be stored all winter.', look: 'two benefits from the text' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'The last paragraph says people today are learning from this knowledge. What is the writer’s message?',
        a: 'Indigenous knowledge about farming is valuable and still useful today.', look: 'respect for Indigenous knowledge' }
    ]
  });

  P.add({
    id: 'g4-healthy-teeth', subject: 'health', form: 'Explanation',
    title: 'Strong Teeth for Life',
    deck: 'What causes cavities, and how to stop them',
    hero: {
      photo: 'g4-brushing-teeth.jpg', credit: 'Photo: Emmitt J. Hawks, U.S. Navy, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Children learn how to brush their teeth properly at a health clinic.'
    },
    body: [
      'Around the age of six, something big starts happening in your mouth. Your baby teeth begin to fall out, and your adult teeth push through. By the time you are a teenager, you will have up to 32 adult teeth. These are the only teeth you will ever get, so they need to last for the rest of your life.',
      { h: 'Inside a tooth' },
      'The outside of a tooth is covered in <b>enamel</b>, the hardest material in your whole body. It is even harder than bone. Under the enamel is a softer layer called dentin. In the centre is the pulp, which holds nerves and blood vessels. That is why a deep cavity can hurt so much.',
      { fig: '<path class="k" d="M110 20 Q150 6 190 20 Q206 50 194 76 L184 136 Q176 146 170 126 L160 90 H140 L130 126 Q124 146 116 136 L106 76 Q94 50 110 20 Z"/>' +
          '<path class="t" d="M118 30 Q150 20 182 30 Q192 52 182 70 L176 120 M124 120 L118 70 Q108 52 118 30"/><path class="h" d="M136 40 Q150 34 164 40 L160 86 H140 Z"/><path class="a" d="M80 80 Q150 70 220 80"/>' +
          D.label(214, 26, 'enamel', 192, 30) + D.label(214, 52, 'dentin', 180, 50) + D.label(10, 40, 'pulp', 140, 56) + D.label(230, 96, 'gum', 214, 80) + D.label(10, 130, 'root', 116, 126),
        tall: 148, cap: 'The parts of a tooth.' },
      { h: 'How cavities form' },
      'Your mouth is home to millions of tiny bacteria. Some of them form a sticky film on your teeth called <b>plaque</b>. When you eat or drink something sugary, the bacteria in plaque eat the sugar too, and they make acid. The acid slowly dissolves the enamel and makes a hole called a cavity. Sipping juice or pop all day is especially hard on teeth, because the acid attacks again and again.',
      { h: 'Keeping teeth healthy' },
      'You can stop most cavities before they start. Brush for two minutes, twice a day, with a small amount of fluoride toothpaste. Fluoride makes enamel stronger. Brush along the gums, where plaque hides. Floss once a day to clean between your teeth, where a brush cannot reach. Drink water between meals, and save sweets for mealtimes.',
      { box: 'Visit the dentist', text: 'A dentist or dental hygienist can find small problems before they get big, clean off hard plaque and check that your adult teeth are coming in well.' },
      'If you play hockey or other contact sports, wear a mouthguard to protect your teeth from hits.'
    ],
    guide: { before: 'Ask the child to count their teeth with their tongue. Teach <b>enamel</b> and <b>plaque</b>. Look at the parts of a tooth in the diagram.',
      after: 'Make a plan for your teeth: when will you brush, and how will you remember to floss? Time two minutes of brushing together.' },
    words: [['enamel', 'the hard, shiny outer layer of a tooth'], ['plaque', 'a sticky film of bacteria that forms on teeth']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Teeth are white.', 'Plaque and sugar cause cavities, but brushing, flossing and dentist visits keep teeth healthy.', 'Dentists are friendly.', 'Babies have teeth.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which part is in the centre of the tooth?',
        opts: ['the pulp', 'the enamel', 'the gum'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps of how a cavity forms.',
        items: ['Plaque forms on the teeth.', 'You eat something sugary.', 'Bacteria make acid.', 'The acid makes a hole in the enamel.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Habit', 'Why it helps'],
        rows: [['brushing with fluoride toothpaste', null], ['flossing', null], ['drinking water between meals', null]],
        a: [[null, 'It removes plaque, and fluoride makes enamel stronger.'], [null, 'It cleans between teeth, where a brush cannot reach.'], [null, 'It does not feed the bacteria with sugar.']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is sipping pop all day hard on teeth?',
        opts: ['The acid attacks again and again.', 'Pop is cold.', 'Pop has bubbles.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Mouth</b>guard joins two words. What does a mouthguard do?',
        opts: ['protects your mouth', 'cleans your mouth', 'opens your mouth'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the writer say your adult teeth “need to last for the rest of your life”?',
        a: 'Adult teeth are the only teeth you will ever get. If they are damaged or lost, they do not grow back.', look: 'adult teeth are not replaced' },
      { k: 'lines', code: 'C2.1', n: 2, q: 'What did you already know about caring for your teeth? Which fact in the text was new to you?',
        a: 'Example: I knew to brush twice a day. I did not know that sipping pop all day is hard on teeth.', look: 'one thing they knew and one new fact from the text' }
    ]
  });

  P.add({
    id: 'g4-mosaics', subject: 'arts', form: 'Explanation',
    title: 'Pictures from Pieces',
    deck: 'How artists make mosaics from thousands of tiny tiles',
    hero: {
      photo: 'g4-mosaic.jpg', credit: 'Photo: 14GTR, CC0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'Dolphins in an ancient mosaic from Halicarnassus, now in the British Museum in London.'
    },
    body: [
      'Look closely at the dolphins in the photo. They are not painted. They are made of thousands of tiny pieces of coloured stone, pressed into a floor almost 2 000 years ago. A picture or pattern made this way is called a mosaic.',
      { h: 'Tiny tiles' },
      'The small pieces in a mosaic are called <b>tesserae</b>. Each one is usually a cube about as big as the tip of your finger. Artists in ancient Greece and Rome cut tesserae from stone and marble in many natural colours: white, black, cream, red and grey. Later, artists added pieces of coloured glass, and some even used glass with a thin layer of real gold inside, so their mosaics would sparkle in candlelight.',
      { fig: (function () {
            var fish = ['0000000000', '0001100000', '0111111001', '1111111111', '0111111001', '0001100000', '0000000000'], s = '';
            fish.forEach(function (row, r) { row.split('').forEach(function (c, i) { s += '<rect class="' + (c === '1' ? 'h' : 't') + '" x="' + (60 + i * 18) + '" y="' + (6 + r * 18) + '" width="16" height="16"/>'; }); });
            return s + D.label(250, 30, 'tessera', 240, 60) + D.label(250, 110, 'grout lines', 241, 104);
          })(),
        tall: 132, cap: 'A simple fish made of square tesserae. The thin gaps are filled with grout.' },
      { h: 'How a mosaic is made' },
      'First, the artist draws the design. Next, a layer of wet mortar, a kind of cement, is spread on the floor or wall, one small part at a time. The artist presses the tesserae into the mortar, one by one, following the lines of the design. Pieces are often set in curving rows that follow the shape, which makes animals and people look like they are moving. When everything is dry, the gaps between the pieces are filled with <b>grout</b> to hold them tight and keep out water.',
      { h: 'Made to last' },
      'Because they are made of stone and glass, mosaics can last for thousands of years. Floors that were walked on by Romans can still be seen today. Many ancient mosaics show daily life, animals, sea creatures and stories, so they teach us how people lived long ago.',
      { box: 'Try it', text: 'Cut coloured paper into small squares and glue them onto a drawing to make your own paper mosaic. Leave a tiny gap between each piece.' },
      'Today, artists still make mosaics in parks, schools, subway stations and swimming pools around the world.'
    ],
    guide: { before: 'Look closely at the photo and find single tesserae. Teach <b>tesserae</b> and <b>grout</b>. Ask: why might someone choose stone instead of paint for a floor?',
      after: 'Design a small mosaic on grid paper by colouring squares. What picture will you make? Which colours will you choose?' },
    words: [['tesserae', 'the small pieces of stone or glass used in a mosaic'], ['grout', 'a paste that fills the gaps between tiles and hardens']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Dolphins swim fast.', 'Mosaics are long-lasting pictures made from many tiny pieces of stone or glass.', 'Romans had floors.', 'Glue is sticky.'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number the steps for making a mosaic.',
        items: ['Draw the design.', 'Spread wet mortar.', 'Press in the tesserae.', 'Fill the gaps with grout.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what fills the thin gaps?',
        opts: ['grout', 'paint', 'glue'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did some artists use glass with gold inside?',
        opts: ['so mosaics would sparkle in candlelight', 'to make them heavier', 'to make them cheaper'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Material', 'Used for'],
        rows: [['tesserae', null], ['mortar', null], ['grout', null]],
        a: [[null, 'making the picture'], [null, 'holding the pieces to the floor or wall'], [null, 'filling the gaps and keeping out water']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Sub</b>way means a way under the ground. <b>Sub</b> means “under.” A <b>sub</b>marine goes …',
        opts: ['under the sea', 'over the sea', 'beside the sea'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why can mosaics last so long?',
        opts: ['They are made of stone and glass.', 'They are kept in boxes.', 'They are painted every year.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How do ancient mosaics help us learn about the past? Use the text.',
        a: 'They show daily life, animals, sea creatures and stories, so we can see what people cared about and how they lived long ago.', look: 'what mosaics show and what that teaches' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The writer begins with “Look closely at the dolphins in the photo.” Why is this a good way to begin?',
        a: 'It gets the reader to look and wonder, and then surprises them by saying the dolphins are made of stone, not paint.', look: 'the opening draws the reader in' }
    ]
  });

  P.add({
    id: 'g4-guitar', subject: 'arts', form: 'Explanation',
    title: 'How a Guitar Sings',
    deck: 'Strings, frets and a hollow body: the science of a guitar’s sound',
    hero: {
      photo: 'g4-guitar.jpg', credit: 'Photo: Wilfredo Rafael Rodriguez Hernandez, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A musician plucks the strings of a guitar. The holes in its body let the sound out.'
    },
    body: [
      'Pluck a guitar string, and a sound rings out. Press your finger on the string in a different place and pluck again, and the sound changes. A guitar may look simple, but every part of it is designed to make and shape sound.',
      { h: 'Strings that shake' },
      'All sound is made by things that <b>vibrate</b>, or shake back and forth very quickly. When you pluck a guitar string, it vibrates hundreds of times every second. The string pushes on the air around it, and the air carries the vibrations to your ears as sound waves.',
      'Each string makes a different <b>pitch</b>, how high or low a sound is. Three things change the pitch. Thin strings vibrate faster and make higher notes than thick strings. Tight strings make higher notes than loose ones. And short strings make higher notes than long ones. A guitar player tightens or loosens the strings with the tuning pegs to get each one just right.',
      { fig: '<path class="k" d="M10 76 Q10 40 50 46 Q74 30 96 50 Q120 40 120 76 Q120 112 96 102 Q74 122 50 106 Q10 112 10 76 Z"/><circle class="h" cx="70" cy="76" r="14"/>' +
          '<rect class="k" x="120" y="68" width="140" height="16"/><path class="t" d="M150 68 V84 M176 68 V84 M200 68 V84 M222 68 V84 M242 68 V84"/><rect class="k" x="260" y="62" width="34" height="28" rx="4"/>' +
          '<path class="t" d="M30 72 H270 M30 80 H270"/>' +
          D.label(84, 28, 'sound hole', 74, 64) + D.label(150, 120, 'frets on the neck', 176, 84) + D.label(232, 30, 'tuning pegs', 276, 62) + D.label(10, 130, 'hollow body', 40, 100),
        tall: 136, cap: 'The main parts of an acoustic guitar.' },
      { h: 'Frets change the length' },
      'Along the neck of the guitar are thin metal bars called frets. When a player presses a string down just behind a fret, only part of the string can vibrate. The shorter part vibrates faster, so the note is higher. Moving from fret to fret is like climbing up a musical staircase.',
      { h: 'A hollow body' },
      'A string by itself is quiet. The guitar’s hollow wooden body makes it louder. The vibrating strings shake the thin top of the guitar, and the air inside the body starts vibrating too. The sound bounces around inside and comes out through the sound hole, much louder and richer.',
      { box: 'Try it', text: 'Stretch a rubber band around an open box. Pluck it. Then stretch it tighter and pluck again. Which sound is higher?' }
    ],
    guide: { before: 'If you have any stringed instrument, or a rubber band and a box, let the child pluck it. Teach <b>vibrate</b> and <b>pitch</b>. Touch your throat while humming to feel vibration.',
      after: 'Think of another instrument. How does it make sound vibrate? How does the player make the pitch higher or lower?' },
    words: [['vibrate', 'to shake back and forth very quickly'], ['pitch', 'how high or low a sound is']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Guitars are wooden.', 'A guitar makes sound with vibrating strings, and its parts change the pitch and make it louder.', 'Music is fun.', 'Rubber bands stretch.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'What makes a higher note? Fill in the chart.', cols: ['Higher note', 'Lower note'],
        rows: [['thin string', null], ['tight string', null], ['short string', null]],
        a: [[null, 'thick string'], [null, 'loose string'], [null, 'long string']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where are the frets?',
        opts: ['on the neck', 'on the body', 'inside the sound hole'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does pressing a string behind a fret make a higher note?',
        opts: ['The part that vibrates is shorter.', 'The string gets thicker.', 'The guitar gets louder.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Moving from fret to fret is “like climbing up a musical staircase.” This means the notes …',
        opts: ['go higher step by step', 'get quieter', 'stop'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Sound<b>s</b> and string<b>s</b> end in -s. What does the -s show?',
        opts: ['more than one', 'something that happened before', 'a person who does something'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does a guitar need a hollow body? Use details from the text.',
        a: 'A string alone is quiet. The strings shake the thin top, the air inside vibrates, and the sound comes out the sound hole much louder.', look: 'the hollow body makes the sound louder' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'In the “Try it” box, which sound will be higher? Explain why.',
        a: 'The tighter rubber band will make the higher sound, because tight strings vibrate faster.', look: 'a prediction linked to tightness' }
    ]
  });

  P.add({
    id: 'g4-lighthouses', subject: 'tech', form: 'Explanation',
    title: 'Light on the Rocks',
    deck: 'How lighthouses guide ships safely past dangerous coasts',
    hero: {
      photo: 'g4-lighthouse.jpg', credit: 'Photo: Michel Rathwell, CC BY 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'The lighthouse at Peggys Cove, Nova Scotia, stands on smooth granite rock beside the sea.'
    },
    body: [
      'Canada has the longest coastline in the world. Along it are rocks, reefs and sandbars that can rip open the bottom of a ship. Before modern electronics, a sailor at night or in fog had very little to warn them of danger. That is why hundreds of lighthouses were built along Canada’s coasts and the shores of the Great Lakes.',
      { h: 'A bright beam' },
      'At the top of a lighthouse is a powerful lamp. Around it is a giant glass <b>lens</b> made of many rings of curved glass. A lamp alone would spread its light in every direction, and most of it would be wasted. The lens bends the light into one strong, narrow beam that can be seen more than 30 kilometres out at sea. In many lighthouses, the lens turns, so the beam sweeps around like the hand of a clock.',
      { fig: '<path class="k" d="M40 140 L52 40 H76 L88 140 Z"/><rect class="k" x="48" y="22" width="32" height="18"/><path class="k" d="M44 22 L64 6 L84 22"/><circle class="a" cx="64" cy="31" r="5"/>' +
          '<path class="h" d="M80 24 L290 6 V56 L80 38 Z"/><path class="a" d="M80 31 H290"/>' +
          '<path class="k" d="M0 140 H130 Q150 128 170 140 H300"/>' +
          D.label(110, 84, 'the lens turns the light into a beam', 82, 36) + D.label(100, 112, 'tower', 80, 110) + D.label(10, 14, 'lamp', 58, 30),
        tall: 146, cap: 'A lighthouse sends out a narrow beam of light. Not to scale.' },
      { h: 'Every light is different' },
      'If every lighthouse flashed the same way, sailors could not tell which one they were looking at. So each lighthouse has its own pattern. One might flash once every five seconds, while another flashes twice, then stays dark. Sailors look up the pattern on their charts to know exactly where they are. In the daytime, the colour and stripes of the tower help too.',
      { h: 'Keepers and their families' },
      'For more than a hundred years, lighthouse keepers lived beside the lights, often on lonely islands. They kept the lamp burning all night, cleaned the lens and sounded a foghorn when fog rolled in. Today, almost all Canadian lighthouses are automatic, and ships use GPS and radar. But lighthouses are still a <b>beacon</b> of safety, and many have become museums.',
      { box: 'Did you know?', text: 'The lighthouse at Peggys Cove was built in 1915. It is one of the most photographed lighthouses in Canada.' }
    ],
    guide: { before: 'Shine a flashlight in a dark room, then through a magnifying glass, and compare the light. Teach <b>lens</b> and <b>beacon</b>. Find Nova Scotia on a map.',
      after: 'Would you like to be a lighthouse keeper? What would be the best and the hardest parts of the job?' },
    words: [['lens', 'a curved piece of glass that bends light'], ['beacon', 'a light or signal that warns or guides people']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Nova Scotia has rocks.', 'Lighthouses use bright beams and special patterns to guide ships safely.', 'Fog is grey.', 'GPS is new.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what turns the light into a beam?',
        opts: ['the lens', 'the tower', 'the rocks'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does each lighthouse have its own flash pattern?',
        opts: ['so sailors know which lighthouse they see', 'to look pretty', 'to save power'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Then', 'Now'],
        rows: [['Keepers lived beside the lights.', null], ['Sailors used lighthouses to find their way.', null]],
        a: [[null, 'Lighthouses are automatic.'], [null, 'Ships also use GPS and radar.']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Light</b>house joins two words. Which word also joins two words?',
        opts: ['coastline', 'sailor', 'flashes'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The beam sweeps around “like the hand of a clock.” This shows it …',
        opts: ['turns in a circle', 'tells the time', 'stays still'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did lighthouse keepers have such an important job? Use details from the text.',
        a: 'They kept the lamp burning all night and sounded the foghorn, so ships would not hit rocks in the dark or in fog.', look: 'their tasks and why they kept ships safe' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'Why do you think people still care for old lighthouses, even though ships have GPS?',
        a: 'They are part of Canada’s history, they are beautiful, and they still help as a backup beacon of safety.', look: 'history, beauty or safety' }
    ]
  });

  P.add({
    id: 'g4-road-salt', subject: 'tech', form: 'Explanation',
    title: 'Why Salt Melts Ice',
    deck: 'How winter road crews keep streets safe, and what it costs nature',
    hero: {
      photo: 'g4-salt-truck.jpg', credit: 'Photo: Michael Pereckas, CC BY 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'Workers load a truck with salt to spread on snowy streets.'
    },
    body: [
      'After a winter storm, trucks rumble through the streets of Canadian towns, spraying salt onto the roads. Within an hour, icy roads turn wet and slushy, and cars can drive safely again. But how does salt melt ice, when it is still below zero outside?',
      { h: 'Changing the freezing point' },
      'Pure water freezes at 0 °C. That temperature is called its <b>freezing point</b>. When salt mixes with water, the salt gets in the way of the water particles as they try to link together into ice. The salty water has to get much colder before it can freeze. So when salt lands on ice, it mixes with the thin layer of water on top and makes salt water. That salt water can stay liquid even when it is colder than 0 °C, so the ice melts.',
      { fig: '<path class="k" d="M30 70 H290"/>' + [-20, -15, -10, -5, 0, 5].map(function (t) { var x = 50 + (t + 20) * 9.6; return '<path class="k" d="M' + x + ' 64 V76"/><text class="n" x="' + x + '" y="92" text-anchor="middle">' + (t < 0 ? '−' + (-t) : t) + '</text>'; }).join('') +
          '<circle class="a" cx="242" cy="70" r="6"/><circle class="h" cx="146" cy="70" r="6"/>' +
          D.label(208, 30, 'pure water freezes', 242, 62) + D.label(40, 30, 'salty water freezes', 146, 62) + '<text class="l" x="170" y="114" text-anchor="middle">temperature in °C</text>',
        tall: 120, cap: 'Salt water freezes at a lower temperature than pure water.' },
      { h: 'When salt stops working' },
      'Road salt works well down to about minus 10 °C. When it is colder than that, salt melts ice very slowly. Then road crews spread sand or gravel instead, which does not melt the ice but gives tires something to grip. Before a storm, some cities spray roads with <b>brine</b>, a mix of salt and water, so ice cannot stick to the road in the first place.',
      { h: 'The cost of salt' },
      'Salt keeps people safe, but it causes problems too. It makes cars, bridges and parking garages rust. When the snow melts, salty water runs into streams, lakes and soil. Too much salt can harm fish, frogs and plants along the roadside, and it can sting dogs’ paws. Many cities are now trying to use only as much salt as they need, at exactly the right time.',
      { box: 'Did you know?', text: 'In some places, road crews add beet juice to their brine. It helps the salt work at colder temperatures, so they can use less of it.' }
    ],
    guide: { before: 'Put two ice cubes on two plates. Sprinkle salt on one and watch together while you read. Teach <b>freezing point</b> and <b>brine</b>.',
      after: 'Should cities use less salt? What could families do instead on their own driveways and sidewalks?' },
    words: [['freezing point', 'the temperature at which a liquid turns into a solid'], ['brine', 'water with a lot of salt mixed in']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Trucks are loud.', 'Salt melts ice by lowering water’s freezing point, but it can harm nature.', 'Winter is cold.', 'Sand is brown.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the number line. At what temperature does pure water freeze?',
        opts: ['0 °C', '−10 °C', '5 °C'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do crews use sand when it is very cold?',
        opts: ['Salt works too slowly, and sand gives tires grip.', 'Sand melts ice faster.', 'Sand is warmer.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Good things about road salt', 'Problems with road salt'],
        rows: [[null, null], [null, null]],
        a: [['It melts ice so cars can drive safely.', 'It makes cars and bridges rust.'], ['It works quickly, within an hour.', 'It harms fish, frogs, plants and dogs’ paws.']] },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps of how salt melts ice.',
        items: ['Salt lands on the ice.', 'It mixes with the thin layer of water.', 'Salty water forms.', 'The salty water stays liquid, and the ice melts.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: 'Road<b>side</b> means the side of the road. What does river<b>side</b> mean?',
        opts: ['the side of a river', 'a river that is wide', 'inside a river'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Is the writer for road salt, against it, or fair to both sides? How can you tell?',
        a: 'The writer is fair to both sides. The text explains how salt keeps people safe but also has a section on the problems it causes.', look: 'a judgement about balance with evidence' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Which thinking skill helped you most with this text: comparing good and bad points, checking the number line, or asking “why”? Explain how it helped.',
        a: 'Example: Comparing good and bad points helped most. I made a list in my head: salt keeps roads safe, but it rusts cars and harms fish and plants. Then I could see the whole picture.', look: 'names a thinking skill and tells how it helped them understand this text' }
    ]
  });

  P.add({
    id: 'g4-below-zero', subject: 'math', form: 'Explanation',
    title: 'Below Zero',
    deck: 'How to read a thermometer when it is colder than zero',
    hero: {
      photo: 'g4-thermometer.jpg', credit: 'Photo: August Geyler, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'An outdoor thermometer covered in frost. The needle points below zero.'
    },
    body: [
      'In much of Canada, winter mornings can be bitterly cold. The radio might say, “It is minus 15 this morning in Winnipeg.” What does minus 15 mean, and how is it different from 15?',
      { h: 'Reading a thermometer' },
      'In Canada, we measure temperature in degrees <b>Celsius</b>, written °C. On the Celsius scale, water freezes at 0 °C and boils at 100 °C. A thermometer is a bit like a number line standing on its end. Warmer temperatures are higher up. Colder temperatures are lower down.',
      'When the temperature drops below zero, we use <b>negative numbers</b>. They are written with a minus sign in front, like −15 °C, and we say “minus 15.” The bigger the number after the minus sign, the colder it is. So −20 °C is colder than −5 °C, even though 20 is bigger than 5.',
      { fig: '<rect class="k" x="40" y="10" width="20" height="120" rx="10"/><circle class="k" cx="50" cy="138" r="12"/><rect class="h" x="44" y="100" width="12" height="34"/>' +
          [10, 5, 0, -5, -10, -15, -20].map(function (t, i) { var y = 20 + i * 16; return '<path class="k" d="M60 ' + y + ' H70"/><text class="n" x="76" y="' + (y + 4) + '">' + (t < 0 ? '−' + (-t) : t) + ' °C</text>'; }).join('') +
          D.label(130, 56, 'Monday afternoon: 0 °C', 112, 52) + D.label(130, 104, 'Monday morning: −15 °C', 116, 100) + D.label(130, 122, 'Tuesday morning: −20 °C', 116, 118),
        tall: 152, cap: 'A Celsius thermometer, like a number line standing up.' },
      { h: 'How much did it change?' },
      'Suppose it is −15 °C on Monday morning and 0 °C by the afternoon. How much warmer did it get? Count up the thermometer from −15 to 0: that is 15 degrees. If it goes from −5 °C to 3 °C, count 5 degrees up to zero, then 3 more. That is a rise of 8 degrees. When you cross zero, it helps to stop at zero and count in two parts.',
      'Temperatures can drop, too. If it is 4 °C at noon and −6 °C at midnight, count down 4 degrees to zero, then 6 more. The temperature fell 10 degrees.',
      { box: 'Wind chill', text: 'On a windy day, it can feel much colder than the thermometer shows. Weather reports give a wind chill number, such as −30, to tell you how cold it will feel on your skin.' },
      'Knowing how to read the temperature helps you dress for the weather. Below −25, with wind, uncovered skin can freeze in minutes, so wear a hat, mittens and a scarf. The coldest temperature ever recorded in Canada was −63 °C, in Snag, Yukon, in 1947!'
    ],
    guide: { before: 'Look at a real thermometer or a weather app together. Teach <b>Celsius</b> and <b>negative number</b>. Draw a number line from −20 to 10 on paper.',
      after: 'Check the temperature each morning for a week and record it. Which day was the coldest? How much did it change from the coldest day to the warmest?' },
    words: [['Celsius', 'the scale we use in Canada to measure temperature'], ['negative numbers', 'numbers less than zero, written with a minus sign']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Winnipeg is cold.', 'Temperatures below zero are negative numbers, and you can count on a thermometer to find changes.', 'Water boils at 100 °C.', 'Wear a hat.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the thermometer. Which morning was colder?',
        opts: ['Tuesday', 'Monday', 'They were the same.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Which temperature is the warmest?',
        opts: ['−5 °C', '−10 °C', '−20 °C'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'How much did the temperature rise? Fill in the chart.', cols: ['Start', 'End', 'Rise'],
        rows: [['−15 °C', '0 °C', null], ['−5 °C', '3 °C', null], ['−10 °C', '2 °C', null]],
        a: [[null, null, '15 degrees'], [null, null, '8 degrees'], [null, null, '12 degrees']] },
      { k: 'choice', code: 'C1.3', half: true, q: 'What does the box “Wind chill” explain?',
        opts: ['how cold it feels on a windy day', 'how to read a thermometer', 'when water boils'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Un</b>covered skin is skin that is …',
        opts: ['not covered', 'covered twice', 'covered well'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is −20 °C colder than −5 °C, even though 20 is bigger than 5? Use the text.',
        a: 'Below zero, the bigger the number after the minus sign, the farther below zero it is, so it is colder. On a thermometer, −20 is lower down.', look: 'farther below zero means colder' },
      { k: 'lines', code: 'C2.4', n: 2, q: 'The text says to “stop at zero and count in two parts.” How does this strategy help you?',
        a: 'It breaks a hard question into two easy counts, one up to zero and one from zero, so I do not make mistakes.', look: 'explains the strategy in their own words' }
    ]
  });

  P.add({
    id: 'g4-corn-maze', subject: 'story', form: 'Short story',
    title: 'Lost in the Corn',
    deck: 'Two siblings, one corn maze, and a smart way out',
    hero: {
      photo: 'g4-corn-maze.jpg', credit: 'Photo: Hugho226, CC0, Wikimedia Commons', focus: '50% 60%',
      tall: 220,
      cap: 'A narrow path between tall walls of corn in a corn maze.'
    },
    body: [
      'The sign at the entrance said, “Average time: 30 minutes.” Ama looked at her little brother, Kofi, who was already running ahead. “Wait for me!” she called, and plunged into the corn after him.',
      'At first it was fun. The paths twisted left and right, and the corn rose high above their heads, rustling in the October wind. They laughed when they hit a dead end, turned around and laughed again at the next one.',
      { h: 'Going in circles' },
      'After a while, Kofi stopped laughing. “We passed that broken stalk before,” he said. “We’re going in circles.” Every path looked the same: green walls, a strip of blue sky, and dirt under their boots. Kofi’s lip began to shake. “What if we never get out?”',
      'Ama’s heart was pounding too, but she took a deep breath. She remembered something her uncle had told her about <b>mazes</b>. “Put your right hand on the wall,” he had said, “and never let go. Keep following the right side, and you will find the way out.”',
      { fig: '<rect class="k" x="40" y="10" width="220" height="130"/><path class="k" d="M40 60 H120 M160 10 V80 M200 50 H260 M90 100 H200 V140 M120 60 V100"/><path class="t" d="M40 120 H10 M260 30 H290"/>' +
          '<path class="d" d="M50 124 H70 V80 H140 V30 H180 V40 H230 V30 H280"/>' +
          '<text class="n" x="10" y="114">in</text><text class="n" x="266" y="22">out</text>',
        tall: 150, cap: 'A small maze. The dashed line follows the right-hand wall to the exit.' },
      { h: 'Right hand on the wall' },
      '“Hold my left hand,” Ama told Kofi. She reached out with her right hand and brushed the corn leaves beside her. They walked slowly, turning whenever the right wall turned. It felt like the long way, and twice it took them into dead ends, but she did not let go. Then Kofi pointed. Above the corn, a red barn roof peeked out. It was a <b>landmark</b> she remembered seeing near the exit.',
      'Three turns later, the corn opened up. There was the exit, the barn and their parents waving from a picnic table.',
      '“Forty-two minutes,” said Dad, checking his watch. “Only twelve minutes slower than average.”',
      'Kofi grinned. “Ama got us out. She’s a maze genius.” Ama just smiled. She did not tell him how scared she had been.'
    ],
    guide: { before: 'Draw a simple maze on paper and try it together. Teach <b>maze</b> and <b>landmark</b>. Ask: what would you do if you got lost?',
      after: 'Ama stayed calm even though she was scared. When is a time you stayed calm when things were hard? What helped you?' },
    words: [['mazes', 'puzzles made of twisting paths with only one way out'], ['landmark', 'something easy to see that helps you know where you are']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'Who tells this story?',
        opts: ['Ama, using “I”', 'a narrator outside the story, using “she” and “he”', 'Kofi', 'Dad'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the story map.', cols: ['Part of the story', 'What happens'],
        rows: [['Problem', null], ['Turning point', null], ['Solution', null]],
        a: [[null, 'Ama and Kofi get lost in the corn maze and go in circles.'], [null, 'Ama remembers her uncle’s advice about keeping her right hand on the wall.'], [null, 'They follow the right side, spot the barn roof and find the exit.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what does the dashed line show?',
        opts: ['the path along the right-hand wall', 'the shortest path', 'a dead end'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How did the red barn roof help?',
        opts: ['It was a landmark near the exit.', 'It showed the time.', 'It blocked the wind.'], a: 0 },
      { k: 'choice', code: 'C2.2', half: true, q: 'Which is a good reason to read a story like this?',
        opts: ['to enjoy an adventure and see how the characters solve a problem', 'to find out the times of buses', 'to learn how farmers grow corn'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Dead end</b> means a path that …',
        opts: ['does not go anywhere', 'is very long', 'leads outside'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How do you know Ama was scared, even though she acted calm? Use details from the story.',
        a: 'Her heart was pounding and she took a deep breath. At the end, she did not tell Kofi how scared she had been.', look: 'two clues about her hidden feelings' },
      { k: 'lines', code: 'C3.1', n: 2, q: 'Kofi calls Ama “a maze genius.” What does this show about how he feels about her?',
        a: 'He is proud of her and thankful that she got them out.', look: 'pride or gratitude' }
    ]
  });

  P.add({
    id: 'g4-ice-storm', subject: 'story', form: 'Short story',
    title: 'The Week the Ice Came',
    deck: 'A grandmother remembers the great ice storm of 1998',
    hero: {
      photo: 'g4-ice-storm.jpg', credit: 'Photo: J. Jensenius, NOAA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Trees and power lines bend under a thick coat of ice after the ice storm of January 1998.'
    },
    body: [
      'The power went out during supper, right in the middle of my spaghetti. The house went dark and quiet, and the fridge stopped humming. Outside, rain tapped on the windows. “Freezing rain,” said Grandma, lighting a candle. “It reminds me of the ice storm.”',
      '“What ice storm?” I asked.',
      'Grandma pulled her chair closer to the candle. “January 1998,” she said. “I lived on a farm near Cornwall then. It rained for five days, but it was so cold that every drop froze the moment it touched anything.”',
      { fig: '<rect class="t" x="10" y="10" width="280" height="36"/><rect class="h" x="10" y="46" width="280" height="40"/><rect class="t" x="10" y="86" width="280" height="40"/><path class="k" d="M10 132 H290"/>' +
          '<text class="n" x="24" y="32">cold air: snow falls</text><text class="lb" x="24" y="70">warm air: the snow melts into rain</text><text class="n" x="24" y="110">cold air near the ground</text>' +
          '<text class="l" x="150" y="148" text-anchor="middle">The rain freezes when it lands.</text>',
        tall: 152, cap: 'How freezing rain forms. Not to scale.' },
      { h: 'Glass everywhere' },
      '“In the morning, the whole world was made of glass,” she went on. “Every branch, every fence and every wire was coated in ice, thick as my wrist. Trees cracked like gunshots all night long as branches snapped under the weight. Then the big steel towers that carried the power lines crumpled like paper. Millions of people had no electricity, some of us for weeks.”',
      '“Weeks?” I said. “How did you stay warm?”',
      { h: 'Neighbours helping neighbours' },
      '“We had a wood stove, thank goodness. The neighbours down the road had none, so they came to stay with us. Eleven people and three dogs in one farmhouse!” Grandma laughed. “We cooked on the stove and played cards by lamplight. Your grandpa and the other farmers shared a <b>generator</b> to keep the cows milked. Soldiers came from all over Canada to help clear the roads and fix the lines.”',
      'She was quiet for a moment. “It was hard,” she said. “But I have never seen people take care of each other like that.”',
      'Just then, the lights flickered back on. The fridge hummed. I was almost sorry. I wanted to hear more about the week the world turned to glass, and about the <b>freezing rain</b> that brought everyone together.'
    ],
    guide: { before: 'Find Cornwall, Ontario, on a map. Teach <b>freezing rain</b> and <b>generator</b>. Look at the diagram and talk about how rain can freeze when it lands.',
      after: 'Ask an older person in your family to tell you about a big storm or event they remember. What questions would you ask them?' },
    words: [['freezing rain', 'rain that freezes as soon as it touches the cold ground or other surfaces'], ['generator', 'a machine that makes electricity from fuel']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'Who tells most of the story about the ice storm?',
        opts: ['Grandma, in her own words', 'a soldier', 'the farmer next door', 'a news reporter'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where does the snow melt into rain?',
        opts: ['in the warm air layer', 'on the ground', 'in the top cold layer'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“The whole world was made of glass.” What does Grandma mean?',
        opts: ['Everything was coated in shiny, clear ice.', 'Everything broke.', 'People built glass houses.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['Freezing rain fell for five days.', null], ['The power towers crumpled.', null], ['The neighbours had no wood stove.', null]],
        a: [[null, 'Everything was coated in thick ice.'], [null, 'Millions of people had no electricity.'], [null, 'They came to stay at Grandma’s farm.']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the farmers need a generator?',
        opts: ['to keep the cows milked without power', 'to melt the ice', 'to watch TV'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Lamp</b>light is light from a lamp. What is <b>candle</b>light?',
        opts: ['light from a candle', 'a kind of candle', 'a light that is off'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Grandma says, “I have never seen people take care of each other like that.” Give two examples from the story.',
        a: 'The neighbours came to stay at Grandma’s house, and the farmers shared a generator. Soldiers also came to clear roads and fix the lines.', look: 'two examples of people helping' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Grandma remembers people helping each other. How does this connect to your own community or to another story you know?',
        a: 'Example: When a storm knocked out our power, our neighbours shared their generator and food. Like in the ice storm, people took care of each other.', look: 'a connection to their community or another text, linked back to the story' }
    ]
  });
})();
