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
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>re</b>play lets you hear a sound again. What does <b>re-</b> mean?',
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
      { k: 'choice', code: 'B2.2', half: true, q: 'A pulley that cannot move is <b>fixed</b>. A pulley that moves is <b>un</b>fixed. What does <b>un-</b> mean?',
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
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>cycle</b> is something that repeats. Which word also has the base <b>cycle</b> and means “use again”?',
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
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Inuksuit</b> is the word for more than one inuksuk. What English ending usually shows more than one?',
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
      { k: 'choice', code: 'B2.2', half: true, q: 'Sleep helps you <b>re</b>member. Which word with <b>re-</b> means “build again”?',
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
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>un-</b> mean in <b>un</b>safe and <b>un</b>buckled?',
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
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>ranger</b> looks after a park. What does the ending <b>-er</b> in ranger and painter mean?',
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
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>re-</b> mean in “<b>re</b>place the cone”?',
        opts: ['again or back', 'not', 'before'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Which step is NOT shown in the diagram?',
        opts: ['tie', 'roll', 'hang'], a: 2 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why should the feeder be hung where squirrels and cats cannot easily reach it?',
        a: 'Squirrels would eat the birds’ food, and cats could catch the birds while they eat.', look: 'reasons for both squirrels (food) and cats (danger to birds)' },
      { k: 'lines', code: 'C2.6', n: 2, q: 'In one or two sentences, tell why someone should make this feeder.',
        a: 'It helps birds find food in winter, and you can watch and learn about them.', look: 'the purpose of the procedure in the child’s own words' }
    ]
  });
})();
