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
      'Inuksuit are part of the knowledge that Inuit <b>elders</b> pass on to younger people. Because they carry real messages, people should never knock one down or build one where it might confuse a traveller. Today, you may see inuksuit in parks across Canada. The ones on the land in the Arctic still do the job they were built for.'
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
          '<text class="n" x="56" y="88" text-anchor="middle">July to October</text><text class="n" x="150" y="88" text-anchor="middle">November to February</text><text class="n" x="244" y="88" text-anchor="middle">March to June</text>' +
          D.ripple(16, 100, 22) + '<path class="k" d="M140 26 V12 M140 18 L132 12 M140 16 L148 10 M162 26 V14 M162 20 L154 14"/>',
        tall: 100, cap: 'The farming year in ancient Egypt had three seasons.' },
      { h: 'Three seasons' },
      'The Egyptians planned their year around the river. During the flood season, farmers could not work their fields, so many helped build temples and pyramids. As the water went down, they planted wheat, barley and flax in the wet silt. In the spring, they harvested the crops before the hot, dry summer. Then the flood came again.',
      { box: 'Did you know?', text: 'The Egyptians called their country Kemet, “the black land,” after the dark silt. They called the desert “the red land.”' },
      { h: 'Measuring the river' },
      'The size of the flood mattered. Too little water meant a poor harvest and hunger. Too much water could wash away villages. Egyptians built stone stairways into the river, called nilometers, with marks to measure how high the water rose. Officials used the marks to predict the harvest and decide how much <b>tax</b> each farmer would pay in grain.',
      'An ancient Greek writer called Egypt “the gift of the Nile.” Without the river, there would have been only desert.'
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
      'Soon, scribes wrote more than lists. They wrote laws, letters, stories and the oldest poems we know. Writing let people remember the past and send ideas far away.'
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
          '<text class="n" x="172" y="46" text-anchor="middle">Erie</text><text class="n" x="172" y="76" text-anchor="middle">174 m</text>' +
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
})();
