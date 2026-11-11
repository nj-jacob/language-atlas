/* Grade 2 reading passages for the tool box (assets/engine/library.js). Written for this site.
   Short stories, poems, diaries, letters and simple information texts, 100 to 200 words, with 3 choices in each circle-one question. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;

  P.add({
    id: 'g2-bean-diary', subject: 'science', form: 'Diary',
    title: 'My Bean Diary', plain: true,
    deck: 'Amira plants a bean in a jar and writes down what she sees.',
    hero: {
      photo: 'g2-bean-steps.jpg', credit: 'Photo: B. Domangue, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 240,
      cap: 'A bean from seed to seedling, step by step: first a root, then a stem, then leaves.'
    },
    body: [
      '<b class="ps-who">April 3</b> Today I put a bean in a glass jar. I put a wet paper towel around it, so I can see the bean. I set the jar by the window.',
      '<b class="ps-who">April 6</b> The bean got fat! The skin is wrinkly. I gave it a little more water.',
      '<b class="ps-who">April 8</b> A white <b>root</b> came out of the bean. It is pointing down. I measured it. It is 1 cm long.',
      { fig: '<path class="k" d="M110 20 V150 Q110 160 120 160 H180 Q190 160 190 150 V20"/>' +
          '<ellipse class="k" cx="150" cy="80" rx="16" ry="11"/><path class="a" d="M150 91 Q146 116 152 140"/><path class="a" d="M150 69 Q152 50 146 34"/><path class="k" d="M146 34 Q134 26 128 34 Q138 40 146 34 M146 34 Q158 24 166 30 Q156 38 146 34"/>' +
          D.label(210, 34, 'leaves', 160, 32) + D.label(210, 82, 'bean seed', 166, 80) + D.label(210, 132, 'root', 151, 128) + D.label(10, 60, 'stem', 150, 56),
        tall: 170, cap: 'Amira’s bean on April 14.' },
      '<b class="ps-who">April 11</b> Now a green <b>stem</b> is growing up. The root is 4 cm long. It has tiny hairs on it.',
      '<b class="ps-who">April 14</b> Two leaves opened at the top of the stem! My bean is a real plant now. Tomorrow I will plant it in a pot of soil, so it has room to grow.'
    ],
    guide: { before: 'Explain that a diary has dates, and each part tells what happened that day. If you can, grow a bean in a jar too. Teach <b>root</b> and <b>stem</b>.',
      after: 'Why do you think Amira used a glass jar and not a pot for the first days?' },
    words: [['root', 'the part of a plant that grows down and drinks water'], ['stem', 'the part of a plant that holds it up']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'How can you tell this is a diary?',
        opts: ['Each part starts with a date.', 'It rhymes.', 'It has a lesson at the end.'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'What came out of the bean first?',
        opts: ['the leaves', 'the root', 'the stem'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. Which way does the root grow?',
        opts: ['up', 'down', 'sideways'], a: 1 },
      { k: 'choice', code: 'C1.1', q: 'How long was the root on April 11?',
        opts: ['1 cm', '4 cm', '10 cm'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why will Amira plant the bean in a pot?',
        opts: ['so the plant has room to grow', 'so it gets less light', 'so she can eat it'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Tell how the bean changed from April 3 to April 14. Use the words first, then and last.',
        a: 'First the bean got fat. Then a root and a stem grew. Last, two leaves opened.', look: 'three changes in the right order, with sequence words' }
    ]
  });

  P.add({
    id: 'g2-skating', subject: 'story', form: 'Short story',
    title: 'Priya Wants to Spin',
    deck: 'Priya wants to learn the hard trick first.',
    hero: {
      photo: 'g4-rideau-skateway.jpg', credit: 'Photo: Ahunt, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 240,
      cap: 'Skaters on the Rideau Canal Skateway in Ottawa.'
    },
    body: [
      'Priya watched a big girl spin on the ice. She went around and around like a top.',
      '“I want to do that,” Priya told Coach Dan. “Right now.”',
      '“First, let’s <b>glide</b> on one foot,” said Coach Dan.',
      'Priya frowned. “That is too easy. I want to spin!”',
      'She tried to spin. Her skates got tangled. Thump! She sat down hard on the cold ice.',
      'Coach Dan helped her up. “A spin is built from little skills,” he said. “Like a house is built from bricks.”',
      'So Priya practised gliding on one foot. She wobbled. She <b>practised</b> again. Every Saturday, she got a little steadier.',
      'By March, Priya could glide all the way across the rink on one foot. Then Coach Dan smiled. “Now,” he said, “you are ready to learn to spin.”'
    ],
    guide: { before: 'Ask: what is something that took you a lot of practice? Teach <b>practised</b> (Canadian spelling: practise is the verb).',
      after: 'Coach Dan said a spin is built from little skills. What little skills build up to reading a book?' },
    words: [['glide', 'move smoothly without stopping'], ['practised', 'did something again and again to get better']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'At the start, what is Priya like?',
        opts: ['She wants to do hard things right away.', 'She is scared of the ice.', 'She does not like skating.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“She went around and around like a top.” This helps you picture',
        opts: ['a fast spin', 'a tall hat', 'a slow walk'], a: 0 },
      { k: 'choice', code: 'B2.4', q: 'Her skates got “tangled.” Tangled means',
        opts: ['mixed up and caught together', 'very sharp', 'shiny and new'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does Coach Dan talk about bricks?',
        opts: ['He wants to build a house.', 'He means hard skills are made of small skills.', 'He is talking about the rink wall.'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'What is the lesson of this story?',
        opts: ['Learn small steps before big ones.', 'Ice is cold.', 'Spinning is easy.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How did Priya change from the start to the end of the story?',
        a: 'At the start she wanted to spin right away. At the end she had practised gliding for months and was ready.', look: 'a start detail, an end detail and the change (patience, practice)' }
    ]
  });

  P.add({
    id: 'g2-moon-poem', subject: 'story', form: 'Poem',
    title: 'The Moon Follows Me',
    deck: 'A poem about a car ride at night',
    hero: {
      photo: 'g6-moon-crescent.jpg', credit: 'Photo: Bruno Rijsman, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 260,
      cap: 'A thin crescent moon in a dark sky.'
    },
    body: [
      { poem: ['When we drive home late at night,', 'the moon rides with us, round and bright.', 'It peeks above the barn and trees,', 'it skips across the lake with <b>ease</b>.', '',
        'We turn left, it turns left too.', 'We stop at lights. It waits. It’s true!', 'I wave to it. I think it knows.', 'It follows everywhere I go.', '',
        'Dad says the moon is very far,', 'much farther than our little car.', 'But when I’m tucked in bed so tight,', 'it’s at my <b>window</b>, saying goodnight.'] }
    ],
    guide: { before: 'Ask: have you ever noticed the moon seems to follow the car? Read the poem aloud with a steady beat. Point out rhyming pairs at the ends of lines.',
      after: 'Why does the moon seem to follow us? Talk about how very far things seem to move slowly.' },
    words: [['window', 'a glass opening in a wall'], ['ease', 'no trouble at all']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Which word rhymes with night?',
        opts: ['bright', 'trees', 'car'], a: 0 },
      { k: 'choice', code: 'C1.6', q: 'Who is telling the poem?',
        opts: ['Dad', 'a child in the car', 'the moon'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'The child says the moon “waits” at the lights. Is the moon really waiting?',
        opts: ['Yes, the moon stops for cars.', 'No, it only seems that way because it is so far.', 'No, the moon is asleep.'], a: 1 },
      { k: 'choice', code: 'C1.5', q: 'The moon “skips across the lake.” The poet writes about the moon as if it',
        opts: ['were a person or a child playing', 'were a fish', 'were the sun'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Where is the moon at the end of the poem?',
        opts: ['over the barn', 'at the bedroom window', 'on the lake'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'How does the child feel about the moon? Tell why you think so.',
        a: 'The child likes the moon and feels it is a friend, because they wave to it and it says goodnight.', look: 'a feeling with a clue from the poem' }
    ]
  });

  P.add({
    id: 'g2-maple-syrup', subject: 'science', form: 'Information text',
    title: 'From Tree to Syrup',
    deck: 'How sap from a maple tree becomes sweet syrup',
    hero: {
      photo: 'g4-sap-buckets.jpg', credit: 'Photo: U.S. government, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Buckets hang on maple trees to catch the sap.'
    },
    body: [
      'In early spring, the days get warm, but the nights are still cold. That is when <b>sap</b> starts to flow inside maple trees.',
      'Long ago, First Nations people found out how to collect maple sap and boil it into sugar. They taught the settlers who came later. Today, people still make maple syrup in Ontario and Quebec every spring.',
      { fig: '<rect class="k" x="6" y="10" width="86" height="56" rx="6"/><rect class="k" x="107" y="10" width="86" height="56" rx="6"/><rect class="k" x="208" y="10" width="86" height="56" rx="6"/>' +
          D.arrow(92, 38, 105, 38, 'a') + D.arrow(193, 38, 206, 38, 'a') +
          '<text class="lb" x="49" y="34" text-anchor="middle">1. Tap</text><text class="n" x="49" y="52" text-anchor="middle">a small hole</text>' +
          '<text class="lb" x="150" y="34" text-anchor="middle">2. Collect</text><text class="n" x="150" y="52" text-anchor="middle">sap drips out</text>' +
          '<text class="lb" x="251" y="34" text-anchor="middle">3. Boil</text><text class="n" x="251" y="52" text-anchor="middle">until thick</text>',
        tall: 76, cap: 'Three steps from tree to syrup.' },
      'First, a farmer drills a small hole in the tree and puts in a spout. This is called tapping.',
      'Next, the sap drips into a bucket or a long tube. Sap looks like water. It is only a little bit sweet.',
      'Then the sap is <b>boiled</b> for hours. The water turns to steam and floats away. What is left is thick, golden syrup.',
      'It takes about 40 buckets of sap to make one bucket of syrup!'
    ],
    guide: { before: 'Ask if the child has tasted maple syrup or been to a sugar bush. Look at the steps in the diagram first. Teach <b>sap</b> and <b>boiled</b>.',
      after: 'Why do you think maple syrup costs more than many other sweet things?' },
    words: [['sap', 'the watery juice inside a tree'], ['boiled', 'heated until it bubbled']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'When does sap start to flow?',
        opts: ['in early spring', 'in summer', 'in the middle of winter'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'What is the second step?',
        opts: ['Boil the sap.', 'Collect the sap.', 'Tap the tree.'], a: 1 },
      { k: 'choice', code: 'C3.4', q: 'Who first found out how to make maple sugar?',
        opts: ['First Nations people', 'the settlers', 'a store'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does boiling make the syrup thick?',
        opts: ['The water goes away as steam.', 'Sugar is added.', 'The sap freezes.'], a: 0 },
      { k: 'choice', code: 'B2.4', q: 'What does “golden” tell you about the syrup?',
        opts: ['its colour', 'its smell', 'its size'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Use the diagram to tell the three steps in your own words.',
        a: 'First you make a hole in the tree. Then you catch the sap. Then you boil it until it is thick.', look: 'tap, collect, boil, in order' }
    ]
  });

  P.add({
    id: 'g2-tooth-soup', subject: 'story', form: 'Funny story',
    title: 'The Tooth in the Soup',
    deck: 'Noah has a wiggly tooth. Then it goes missing.',
    hero: {
      art: '<path class="k" d="M220 150 Q230 270 350 270 Q470 270 480 150 Z"/><path class="k" d="M200 150 H500"/>' + D.ripple(232, 470, 168, 'a') +
        '<path class="k" d="M480 110 L620 40 L632 54 L496 126"/><path class="t" d="M300 100 Q290 80 300 60 M350 96 Q340 74 352 52 M400 100 Q390 80 400 62"/>' +
        '<path class="k" d="M340 212 Q340 196 350 196 Q360 196 360 212 L356 228 L350 220 L344 228 Z"/>',
      tall: 280,
      cap: 'A bowl of hot soup, with a surprise inside.'
    },
    body: [
      'Noah had a wiggly tooth. He wiggled it with his tongue. He wiggled it with his finger. It would not come out.',
      'At dinner, Grandpa served hot vegetable soup. Noah took a big spoonful. Then another. Then he stopped.',
      'He put his tongue where his tooth should be. There was a gap!',
      '“My tooth!” cried Noah. “It’s gone!”',
      'Everybody looked under the table. Mom looked on his chair. The cat looked very <b>innocent</b>.',
      'Then Grandpa peered into Noah’s bowl. He fished around with a spoon and lifted up something small and white.',
      '“I think,” Grandpa said, “this soup has a new <b>ingredient</b>.”',
      'Everyone laughed, even Noah. That night, he put the tooth in an envelope. On it he wrote: <i>Washed. Sorry it was in soup.</i>'
    ],
    guide: { before: 'Ask if the child has lost a tooth. This is a funny story: look for parts that make you laugh. Teach <b>innocent</b> and <b>ingredient</b>.',
      after: 'Which part of the story was the funniest? Why?' },
    words: [['innocent', 'not guilty, did nothing wrong'], ['ingredient', 'one of the things that goes into food']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'Where was Noah’s tooth?',
        opts: ['under the table', 'in his soup', 'on his chair'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why is it funny that “the cat looked very innocent”?',
        opts: ['A cat can not help look for a tooth, but it acts like it did nothing.', 'The cat ate the soup.', 'The cat was asleep.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Grandpa says the soup has a new ingredient. He is',
        opts: ['angry', 'joking', 'worried'], a: 1 },
      { k: 'choice', code: 'B3.3', q: 'Why is there an exclamation mark in “My tooth!”?',
        opts: ['Noah is asking a question.', 'Noah is surprised and says it strongly.', 'It ends a quiet sentence.'], a: 1 },
      { k: 'choice', code: 'B2.3', q: 'Wiggly is wiggle + y. Which word is made the same way?',
        opts: ['bumpy', 'jumped', 'unhappy'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did Noah write “Washed. Sorry it was in soup.” on the envelope?',
        a: 'He wanted the tooth fairy to know the tooth was clean, and he felt it was a bit silly that it fell in soup.', look: 'an inference about Noah’s reason or feeling, linked to the soup' }
    ]
  });

  P.add({
    id: 'g2-bumblebees', subject: 'science', form: 'Information text',
    title: 'Busy Bumblebees',
    deck: 'Big, fuzzy bees help plants grow.',
    hero: {
      photo: 'g4-bumblebee.jpg', credit: 'Photo: Marco Nürnberger, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'A bumblebee gathers pollen from a flower.'
    },
    body: [
      'A bumblebee is big, round and fuzzy. It has black and yellow stripes. Its fuzz keeps it warm, so it can fly on cool mornings.',
      'Bumblebees visit flowers to drink sweet <b>nectar</b>. While they drink, yellow <b>pollen</b> sticks to their fuzzy bodies. When a bee flies to the next flower, some pollen falls off. This helps the plant make seeds and fruit.',
      { fig: '<ellipse class="k" cx="150" cy="80" rx="60" ry="38"/><circle class="k" cx="78" cy="78" r="20"/><path class="h" d="M128 44 Q122 80 128 116 L150 118 Q144 80 150 42 Z"/><path class="h" d="M172 46 Q166 80 172 114 L190 106 Q184 80 190 54 Z"/>' +
          '<path class="t" d="M120 42 Q140 6 176 14 Q170 36 150 44 M150 42 Q184 10 214 30 Q196 48 172 46"/><path class="k" d="M64 64 Q52 44 46 40 M74 60 Q70 40 66 34"/>' +
          D.label(16, 120, 'head', 74, 92) + D.label(210, 140, 'striped body', 170, 112) + D.label(232, 30, 'wings', 200, 30) + D.label(8, 24, 'feelers', 50, 42),
        tall: 150, cap: 'The parts of a bumblebee.' },
      'Bumblebees live in small groups in the ground, often in an old mouse hole. The queen bee starts the nest in spring.',
      'Bumblebees are gentle. They will not sting unless they feel scared. If one lands near you, stay calm and let it fly away.'
    ],
    guide: { before: 'Ask what the child knows about bees. Look at the diagram and name the parts. Teach <b>nectar</b> and <b>pollen</b>.',
      after: 'What could your family plant to help bees?' },
    words: [['nectar', 'a sweet juice inside flowers'], ['pollen', 'a yellow powder that flowers make']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'Why is a bumblebee fuzzy?',
        opts: ['to keep warm', 'to look pretty', 'to swim'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. What are the feelers on?',
        opts: ['the wings', 'the head', 'the body'], a: 1 },
      { k: 'choice', code: 'C2.6', q: 'What is the main idea of the second paragraph?',
        opts: ['Bees carry pollen that helps plants make seeds.', 'Bees live in mouse holes.', 'Bees have stripes.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'What should you do if a bumblebee lands near you?',
        opts: ['swat it', 'stay calm', 'yell'], a: 1 },
      { k: 'choice', code: 'C2.3', q: 'If there were no bees, what might happen to some plants?',
        opts: ['They would make fewer seeds and fruit.', 'They would grow taller.', 'They would turn blue.'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Have you seen a bee? Where was it and what was it doing?',
        a: 'Example: I saw a bee on a dandelion in the park. It was drinking.', look: 'a real experience with a place and an action' }
    ]
  });

  P.add({
    id: 'g2-letter-halifax', subject: 'social', form: 'Friendly letter', plain: true,
    title: 'Hello from Halifax',
    deck: 'Mateo writes to his grandpa from a trip to the ocean.',
    hero: {
      photo: 'g4-lighthouse.jpg', credit: 'Photo: Michel Rathwell, CC BY 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'The lighthouse at Peggys Cove, Nova Scotia.'
    },
    body: [
      '<span style="float:right">July 9, 2026</span>',
      'Dear Grandpa,',
      'We drove all the way from Ottawa to Halifax. It took two days! We slept at a hotel in New Brunswick on the way.',
      'Yesterday we went to Peggys Cove. There is a white <b>lighthouse</b> on big grey rocks. The waves crashed and sprayed us. Mom said not to go near the black rocks, because they are wet and slippery.',
      { fig: '<path class="k" d="M10 120 Q60 90 90 100 Q140 70 190 80 Q240 60 290 70"/><circle class="a" cx="40" cy="108" r="6"/><circle class="a" cx="160" cy="82" r="6"/><circle class="a" cx="262" cy="72" r="6"/>' +
          '<path class="d" d="M46 106 Q100 70 154 82 M166 80 Q210 60 256 72"/>' +
          '<text class="lb" x="40" y="136" text-anchor="middle">Ottawa</text><text class="lb" x="160" y="106" text-anchor="middle">New Brunswick</text><text class="lb" x="262" y="96" text-anchor="middle">Halifax</text>' +
          '<text class="n" x="262" y="40" text-anchor="middle">ocean</text>' + D.ripple(220, 296, 50, 't'),
        tall: 145, cap: 'Our trip, with one stop on the way.' },
      'Today I ate fish and chips by the <b>harbour</b>. A seagull tried to steal a chip right out of my hand!',
      'I found a smooth blue stone on the beach. I am saving it for you.',
      'Love,',
      'Mateo'
    ],
    guide: { before: 'Show Ottawa and Halifax on a map of Canada. Point out the parts of a letter: date, greeting, body, closing and name. Teach <b>lighthouse</b> and <b>harbour</b>.',
      after: 'If you wrote a letter about a trip, who would you send it to? What would you tell them?' },
    words: [['lighthouse', 'a tower with a bright light that guides ships'], ['harbour', 'a safe place on the coast where boats stay']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'Which part of the letter is the greeting?',
        opts: ['Dear Grandpa,', 'Love,', 'July 9, 2026'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the map. Where did the family stop on the way?',
        opts: ['Ottawa', 'New Brunswick', 'the ocean'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why did Mom say to stay away from the black rocks?',
        opts: ['They are wet and slippery.', 'They are hot.', 'They belong to someone.'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Which is written the right way?',
        opts: ['peggys cove', 'Peggys Cove', 'peggys Cove'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why is Mateo saving the blue stone?',
        opts: ['to give it to Grandpa, because he misses him', 'to throw at the seagull', 'to sell it'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Which part of Mateo’s trip would you most like to do? Why?',
        a: 'Example: See the lighthouse, because I have never seen the ocean.', look: 'a part of the trip and a reason' }
    ]
  });

  P.add({
    id: 'g2-ant-watch', subject: 'science', form: 'Observation journal', plain: true,
    title: 'Ant Watch',
    deck: 'Room 5 watches the ants by the school door.',
    hero: {
      photo: 'g2-carpenter-ant.jpg', credit: 'Photo: Ryan Hodnett, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A black carpenter ant in Guelph, Ontario.'
    },
    body: [
      '<i>Room 5 found ants by the school door. They watched the ants each day and wrote down what they saw.</i>',
      '<b class="ps-who">Monday:</b> We dropped a crumb of bread near the ants. One ant found it. Then it ran back to its hole.',
      '<b class="ps-who">Tuesday:</b> We dropped another crumb. This time, lots of ants came! They walked in a line. Ms. Park says the first ant leaves a smell <b>trail</b> for the others to follow.',
      { fig: '<ellipse class="k" cx="70" cy="60" rx="20" ry="16"/><ellipse class="k" cx="130" cy="60" rx="24" ry="14"/><ellipse class="k" cx="210" cy="60" rx="42" ry="26"/>' +
          '<path class="k" d="M56 48 Q40 20 24 18 M64 46 Q60 18 46 10"/><path class="k" d="M120 72 L104 104 M130 74 L130 108 M140 72 L156 104 M120 48 L104 18 M130 46 L130 14 M140 48 L156 18"/>' +
          '<text class="lb" x="70" y="108" text-anchor="middle">head</text><text class="lb" x="138" y="128" text-anchor="middle">middle</text><text class="lb" x="210" y="108" text-anchor="middle">back part</text>' +
          D.label(4, 34, 'feelers', 30, 20) + '<text class="n" x="168" y="18">6 legs, all on the middle</text>',
        tall: 135, cap: 'An ant has three body parts and six legs.' },
      '<b class="ps-who">Wednesday:</b> We looked at an ant with a hand lens. It has three body parts and six legs. Its feelers tap, tap, tap the ground.',
      '<b class="ps-who">Thursday:</b> Two ants carried one big crumb together. It was much bigger than they were! Ants are very strong for their size.',
      '<b class="ps-who">Friday:</b> It rained. We did not see any ants. We think they stayed inside their <b>nest</b> to keep dry.'
    ],
    guide: { before: 'Look for ants outside if you can. Look at the diagram and count the legs together. Teach <b>trail</b>.',
      after: 'What else could Room 5 try, to learn more about ants?' },
    words: [['trail', 'a path or line to follow'], ['nest', 'the home that ants build']],
    qs: [
      { k: 'choice', code: 'C1.3', q: 'How is this text put in order?',
        opts: ['by the days of the week', 'from biggest to smallest', 'in ABC order'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why did lots of ants come on Tuesday?',
        opts: ['They followed a smell trail.', 'The bell rang.', 'It was raining.'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. Where are the legs?',
        opts: ['on the head', 'on the middle part', 'on the back part'], a: 1 },
      { k: 'choice', code: 'B2.4', q: 'The ants “carried” a crumb. Which word means the same as carried?',
        opts: ['dropped', 'held and moved', 'ate'], a: 1 },
      { k: 'choice', code: 'C2.2', q: 'Why did the class write this journal?',
        opts: ['to tell a funny story', 'to keep a record of what they saw', 'to sell ants'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did the class think the ants stayed inside on Friday? Do you agree?',
        a: 'It was raining, so they thought the ants stayed in the nest to keep dry. I agree, because rain could wash them away.', look: 'the reason from the text and the child’s own opinion' }
    ]
  });

  P.add({
    id: 'g2-drum-beat', subject: 'story', form: 'Short story',
    title: 'Keeping the Beat',
    deck: 'Mason’s sister dances. Mason wants a job too.',
    hero: {
      photo: 'g5-jingle-dress.jpg', credit: 'Photo: Thayne Tuason, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 240,
      cap: 'Young jingle dress dancers at a powwow.'
    },
    body: [
      'Every summer, Mason’s family goes to the powwow. His big sister, Kayla, dances in her jingle dress. The metal cones on her dress shimmer and chime with every step.',
      'This year, Mason sat by his Uncle Ray at the drum. Uncle Ray is a <b>singer</b>. The singers sit in a circle around one big drum.',
      '“Can I play?” asked Mason.',
      '“First, you listen,” said Uncle Ray. “The drum is the heartbeat. The dancers follow it, so the beat must stay <b>steady</b>.”',
      'Mason listened all afternoon. He tapped the beat softly on his knee. Boom, boom, boom, boom. He did not speed up. He did not slow down.',
      'At the end of the day, Uncle Ray handed him a small hand drum. “You kept the beat with your knee all day,” he said. “Now keep it with this.”',
      'Mason held the drum close. Next summer, maybe Kayla would dance to his beat.'
    ],
    guide: { before: 'Explain that a powwow is a gathering where First Nations people dance, sing, drum and visit, and many people are welcome to watch. Teach <b>singer</b> (at a powwow, the drummers are also the singers) and <b>steady</b>.',
      after: 'Uncle Ray said to listen first. When is listening the best way to start learning?' },
    words: [['singer', 'at a powwow, a person who drums and sings at the big drum'], ['steady', 'not too fast and not too slow; always the same']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'The cones “shimmer and chime.” These words help you',
        opts: ['see and hear the dress', 'smell the food', 'feel the cold'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'Uncle Ray says, “The drum is the heartbeat.” What does this tell you?',
        opts: ['The drum is very important at the powwow.', 'The drum is sick.', 'The drum is quiet.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did Uncle Ray give Mason a hand drum?',
        opts: ['Mason showed he could keep a steady beat.', 'Mason cried.', 'Kayla asked him to.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Which words are sound words?',
        opts: ['Boom, boom', 'Next summer', 'all afternoon'], a: 0 },
      { k: 'choice', code: 'B2.4', q: 'Mason “tapped the beat softly.” Softly means',
        opts: ['quietly', 'loudly', 'quickly'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How do you think Mason feels at the end? Use a clue from the story.',
        a: 'He feels proud and happy, because he held the drum close and thought about Kayla dancing to his beat.', look: 'a feeling and a clue (held the drum close, next summer)' }
    ]
  });

  P.add({
    id: 'g2-where-does-it-go', subject: 'science', form: 'Information text',
    title: 'Where Does It Go?',
    deck: 'Sorting our garbage helps the Earth.',
    hero: {
      photo: 'g4-recycling.jpg', credit: 'Photo: City of Greenville, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Recycling, sorted and squeezed into big blocks.'
    },
    body: [
      'Every week, your family puts out garbage. But not everything is garbage! Many things can have a second life.',
      'In many towns in Ontario, there are three bins.',
      { fig: '<rect class="k" x="10" y="30" width="80" height="90" rx="6"/><rect class="k" x="110" y="30" width="80" height="90" rx="6"/><rect class="k" x="210" y="30" width="80" height="90" rx="6"/>' +
          '<path class="k" d="M6 30 H94 M106 30 H194 M206 30 H294"/>' +
          '<text class="lb" x="50" y="22" text-anchor="middle">Blue bin</text><text class="lb" x="150" y="22" text-anchor="middle">Green bin</text><text class="lb" x="250" y="22" text-anchor="middle">Garbage</text>' +
          '<text class="n" x="50" y="58" text-anchor="middle">cans</text><text class="n" x="50" y="76" text-anchor="middle">bottles</text><text class="n" x="50" y="94" text-anchor="middle">boxes</text>' +
          '<text class="n" x="150" y="58" text-anchor="middle">peels</text><text class="n" x="150" y="76" text-anchor="middle">eggshells</text><text class="n" x="150" y="94" text-anchor="middle">tea bags</text>' +
          '<text class="n" x="250" y="58" text-anchor="middle">chip bags</text><text class="n" x="250" y="76" text-anchor="middle">broken toys</text>',
        tall: 125, cap: 'What goes in each bin.' },
      'The blue bin is for things that can be <b>recycled</b>, like cans, bottles and boxes. They are melted or mashed and made into new things.',
      'The green bin is for food scraps. They rot and turn into rich soil called <b>compost</b>.',
      'Garbage goes to a landfill, a huge hole in the ground. It stays there for a very long time.',
      'So before you throw something out, stop and think: where does it go?'
    ],
    guide: { before: 'Look at your own bins at home. Sort five things together using the chart. Teach <b>recycled</b> and <b>compost</b>.',
      after: 'What is one thing your family could do to make less garbage?' },
    words: [['recycled', 'made into something new'], ['compost', 'soil made from old food and plants']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the chart. Where do eggshells go?',
        opts: ['blue bin', 'green bin', 'garbage'], a: 1 },
      { k: 'choice', code: 'C1.1', q: 'What happens to food scraps?',
        opts: ['They become compost.', 'They become new cans.', 'They stay the same forever.'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'What does the writer want you to do?',
        opts: ['throw everything in the garbage', 'think before you throw things out', 'buy more boxes'], a: 1 },
      { k: 'choice', code: 'C2.6', q: 'What is the main idea?',
        opts: ['Sorting garbage gives many things a second life.', 'Landfills are big.', 'Bins are blue.'], a: 0 },
      { k: 'choice', code: 'B2.3', q: 'Recycle has the part re-, which means again. Which word also means do again?',
        opts: ['redo', 'red', 'ready'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Name one thing from your home and tell which bin it goes in.',
        a: 'Example: A banana peel goes in the green bin, because it is food.', look: 'a real item matched to the right bin, with a reason' }
    ]
  });
  P.add({
    id: 'g2-paper-boats', subject: 'story', form: 'Short story',
    title: 'The Paper Boat Race',
    deck: 'Two friends race paper boats in the rain.',
    hero: {
      art: D.ripple(0, 700, 230, 't') + D.ripple(0, 700, 250, 'a') + D.ripple(0, 700, 270, 't') +
        '<path class="k" d="M210 214 L330 214 L310 236 L230 236 Z"/><path class="k" d="M240 214 L270 150 L300 214"/>' +
        '<path class="k" d="M430 222 L520 222 L506 240 L444 240 Z"/><path class="k" d="M452 222 L475 176 L498 222"/>' +
        [80, 160, 380, 600, 650, 540].map(function (x, i) { return '<path class="t" d="M' + x + ' ' + (30 + i * 20) + ' l-6 16"/>'; }).join(''),
      tall: 280,
      cap: 'Two paper boats sail down a stream of rainwater.'
    },
    body: [
      'It rained all morning. Water ran down the side of the street in a little river.',
      'Lily and Omar folded paper boats at the kitchen table. Lily’s boat was big. Omar’s boat was small, with sharp, tight folds.',
      '“Mine will win,” said Lily. “Big boats are faster.”',
      'They ran outside in their raincoats. “Ready, set, go!” They dropped the boats into the water at the same time.',
      'Lily’s big boat raced ahead. Then it bumped into a stick and spun around. Its sides got soggy. Slowly, it sank.',
      'Omar’s small boat kept going. It bobbed past the stick and sailed all the way to the <b>drain</b>.',
      '“How did you do that?” asked Lily.',
      '“I made my folds tight, so the water could not get in,” said Omar. “Want me to show you?”',
      'They ran back inside to <b>fold</b> two more.'
    ],
    guide: { before: 'Fold a simple paper boat together if you can. Ask the child to predict which boat will win, then check. Teach <b>drain</b>.',
      after: 'Was Lily right that big boats are faster? What did she learn?' },
    words: [['drain', 'a hole in the street where water goes down'], ['fold', 'bend paper over on itself']],
    qs: [
      { k: 'choice', code: 'C2.3', q: 'Lily says, “Big boats are faster.” Was her prediction right?',
        opts: ['Yes, her boat won.', 'No, her boat sank.', 'They tied.'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why did Lily’s boat sink?',
        opts: ['Water got in and it got soggy.', 'Omar pushed it.', 'It was too small.'], a: 0 },
      { k: 'choice', code: 'B2.4', q: 'The boat “bobbed.” Bobbed means',
        opts: ['moved up and down on the water', 'stopped', 'flew'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Which words have the same first sound, like in a tongue twister?',
        opts: ['big boat', 'little river', 'kitchen table'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What happened right after Lily’s boat hit the stick?',
        opts: ['It spun around.', 'It reached the drain.', 'Omar folded it.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Omar offers to show Lily how. What does that tell you about Omar?',
        a: 'He is kind and helpful. He does not brag about winning; he wants to share.', look: 'a trait (kind, helpful, a good friend) with the clue' }
    ]
  });

  P.add({
    id: 'g2-fog-poem', subject: 'story', form: 'Poem',
    title: 'Fog',
    deck: 'A poem about a grey, quiet morning',
    hero: {
      photo: 'g2-fog.jpg', credit: 'Photo: Kgbo, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 260,
      cap: 'Morning fog over a lake.'
    },
    body: [
      { poem: ['The fog rolled in last night', 'on soft, grey feet.', 'It sat on the lake.', 'It lay on the street.', '',
        'It hid the tall pines.', 'It hid the red barn.', 'It wrapped up the town', 'like a scarf made of yarn.', '',
        'I could not see the dock.', 'I could not see the hill.', 'The whole world was <b>blurry</b>', 'and quiet and still.', '',
        'Then the sun came up', 'and gave a big yawn,', 'and the fog tiptoed off.', 'By lunch, it was <b>gone</b>.'] }
    ],
    guide: { before: 'Ask if the child has seen fog. Read the poem aloud slowly and softly. Point out how the fog acts like a person or animal. Teach <b>blurry</b>.',
      after: 'What else in the weather could you write about as if it were alive? How would wind move?' },
    words: [['blurry', 'hard to see clearly'], ['gone', 'not there any more']],
    qs: [
      { k: 'choice', code: 'C1.5', q: 'The fog comes “on soft, grey feet.” The poet writes about fog as if it were',
        opts: ['an animal or person walking quietly', 'a loud truck', 'a fish'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Which word rhymes with barn?',
        opts: ['yarn', 'town', 'hill'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'What made the fog go away?',
        opts: ['the rain', 'the sun', 'the wind'], a: 1 },
      { k: 'choice', code: 'C1.5', q: 'Why does the poem say “It hid” two times?',
        opts: ['to show how much the fog covered', 'because the poet forgot', 'to make it rhyme'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'How does the morning feel in the poem?',
        opts: ['loud and busy', 'quiet and soft', 'hot and sunny'], a: 1 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Close your eyes and picture the fog. Write what you see and hear.',
        a: 'Example: I see grey air over the lake. I can not see the dock. It is very quiet.', look: 'details from visualizing, linked to the poem' }
    ]
  });

  P.add({
    id: 'g2-polar-bears', subject: 'science', form: 'Information text',
    title: 'Polar Bears of the North',
    deck: 'How the biggest bear lives on the ice',
    hero: {
      photo: 'g4-polar-bear.jpg', credit: 'Photo: TravelingOtter, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'A polar bear near Churchill, Manitoba.'
    },
    body: [
      'Polar bears live in the far north of Canada, where it is cold for most of the year. Churchill, Manitoba, is sometimes called the Polar Bear Capital of the World.',
      'A polar bear has thick fur and a layer of fat called <b>blubber</b>. These keep it warm in icy water and snow. Its big paws work like snowshoes, so it does not sink.',
      { fig: '<path class="k" d="M10 150 H290"/>' +
          '<rect class="h" x="40" y="20" width="60" height="130"/><rect class="k" x="180" y="96" width="60" height="54"/>' +
          '<text class="lb" x="70" y="12" text-anchor="middle">polar bear</text><text class="lb" x="210" y="88" text-anchor="middle">child</text>' +
          '<text class="n" x="70" y="168" text-anchor="middle">up to 3 m standing</text><text class="n" x="210" y="168" text-anchor="middle">about 1.2 m</text>',
        tall: 175, cap: 'A big polar bear standing up, next to a Grade 2 child.' },
      'Polar bears hunt seals. They wait by holes in the <b>sea ice</b>, where seals come up to breathe.',
      'In summer, the ice melts. Then the bears must wait on land until the water freezes again. As the Earth gets warmer, the ice melts sooner. That makes it harder for polar bears to find food.'
    ],
    guide: { before: 'Find Churchill, Manitoba, on a map. Teach <b>blubber</b> and <b>sea ice</b>. Compare the bear’s height with a doorway at home.',
      after: 'What can people do to help animals that need cold places?' },
    words: [['blubber', 'a thick layer of fat that keeps an animal warm'], ['sea ice', 'frozen ocean water']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'What keeps a polar bear warm?',
        opts: ['thick fur and blubber', 'a den of leaves', 'warm water'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the chart. About how tall is a polar bear standing up?',
        opts: ['1 m', 'up to 3 m', '10 m'], a: 1 },
      { k: 'choice', code: 'C3.1', q: '“Its big paws work like snowshoes.” This tells you the paws',
        opts: ['help it walk on snow', 'are made of wood', 'are cold'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why is melting ice a problem for polar bears?',
        opts: ['They hunt seals from the ice.', 'They can not swim.', 'They eat ice.'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'The last paragraph tells about',
        opts: ['a problem and its cause', 'how to draw a bear', 'a funny story'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Write two facts you learned about polar bears.',
        a: 'Polar bears have blubber to keep warm. They hunt seals on the sea ice.', look: 'two correct facts in the child’s own words' }
    ]
  });

  P.add({
    id: 'g2-pinecone-feeder', subject: 'science', form: 'Instructions', plain: true,
    title: 'Make a Pine Cone Feeder',
    deck: 'Help winter birds with a simple feeder.',
    hero: {
      photo: 'g4-chickadee-feeder.jpg', credit: 'Photo: Patty O’Hearn Kickham, CC BY 2.0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'A chickadee at a feeder in Guelph, Ontario.'
    },
    body: [
      'In winter, it is hard for birds to find food. You can help them with a pine cone feeder.',
      { h: 'You will need' },
      'a big pine cone, a piece of string, vegetable <b>shortening</b>, birdseed and a plate.',
      { fig: '<path class="k" d="M150 10 V40"/><path class="k" d="M120 50 Q150 30 180 50 Q196 90 150 140 Q104 90 120 50 Z"/>' +
          '<path class="t" d="M126 66 H174 M122 86 H178 M130 106 H170 M140 124 H160"/>' +
          [[132, 60], [160, 76], [140, 96], [166, 100], [150, 116], [130, 80]].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="2.5"/>'; }).join('') +
          D.label(200, 24, 'string', 152, 22) + D.label(206, 76, 'shortening', 180, 70) + D.label(206, 112, 'seeds', 166, 100),
        tall: 150, cap: 'A finished pine cone feeder.' },
      { h: 'Steps' },
      '1. Tie the string around the top of the pine cone.',
      '2. Use a spoon to spread shortening all over the cone. Push it into the spaces.',
      '3. Pour birdseed onto the plate. Roll the cone in the seeds until it is <b>coated</b>.',
      '4. Hang your feeder on a branch where you can see it from a window.',
      { box: 'Tip', text: 'Do not use peanut butter if your school or home is peanut-free. Shortening works just as well.' },
      'Watch for chickadees, nuthatches and juncos. Write down which birds you see!'
    ],
    guide: { before: 'Read the list of things you need first, and gather them. Point out the numbers on the steps. Teach <b>coated</b>.',
      after: 'Why do the steps have numbers? What would happen if you did step 4 first?' },
    words: [['coated', 'covered all over'], ['shortening', 'a soft, white fat used in baking']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'What kind of text is this?',
        opts: ['instructions', 'a poem', 'a letter'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'What do you do right after you spread the shortening?',
        opts: ['Tie the string.', 'Roll the cone in seeds.', 'Hang it up.'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'Why does the text have the heading “You will need”?',
        opts: ['to show what to gather before you start', 'to tell a story', 'to name the birds'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'Why does the tip say not to use peanut butter in some places?',
        opts: ['Some people have a peanut allergy.', 'Birds hate peanuts.', 'It is too sticky.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why hang the feeder where you can see it from a window?',
        opts: ['so you can watch the birds', 'so it stays warm', 'so cats can reach it'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Tell a friend how to make the feeder. Use the words first, next and last.',
        a: 'First tie a string on the cone. Next spread shortening and roll it in seeds. Last hang it on a branch.', look: 'the steps in order with sequence words' }
    ]
  });

  P.add({
    id: 'g2-library-card', subject: 'story', form: 'Short story',
    title: 'Amira’s First Library Card',
    deck: 'A card with her very own name on it',
    hero: {
      photo: 'g5-library.jpg', credit: 'Photo: Gogerr, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'Inside a public library in Welland, Ontario.'
    },
    body: [
      'Amira had waited all week. On Saturday, Mama took her to the library to get her very own card.',
      'The <b>librarian</b>, Mr. Chen, typed her name into the computer. Then he handed her a blue card. It said AMIRA HASSAN in black letters.',
      '“You can borrow ten books at a time,” he said. “Bring them back in three weeks.”',
      'Ten books! Amira walked up and down the rows. She found a book about sharks and a book of jokes. She found a story about a girl who lived on a boat. She found a book in Arabic, just like the books at Teta’s house.',
      'Soon her arms were full. Her chin held the top book in place.',
      '“Maybe five today,” Mama said, laughing.',
      'Amira put five books back carefully. She would <b>return</b> next week for more. After all, she had her own card now.'
    ],
    guide: { before: 'Ask what the child knows about libraries. If you can, visit your local library together. Teach <b>librarian</b> and <b>return</b>.',
      after: 'If you had a library card today, which three books would you look for?' },
    words: [['librarian', 'a person who works in a library and helps you find books'], ['return', 'come back, or give back']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'How many books can Amira borrow at a time?',
        opts: ['three', 'five', 'ten'], a: 2 },
      { k: 'choice', code: 'C3.2', q: '“Her chin held the top book in place.” This shows that',
        opts: ['she had too many books to carry', 'she was tired', 'she was cold'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'Why did Amira choose a book in Arabic?',
        opts: ['It reminded her of the books at her grandmother’s house.', 'It was the biggest book.', 'Mr. Chen told her to.'], a: 0 },
      { k: 'choice', code: 'B3.2', q: 'In “Amira walked up and down the rows,” which word is the action word (verb)?',
        opts: ['Amira', 'walked', 'rows'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does Amira put the books back “carefully”?',
        opts: ['She respects the library and its books.', 'The books were broken.', 'Mama was angry.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How does Amira feel about her library card? Give a clue from the story.',
        a: 'She is excited and proud. She waited all week and says she has her own card now.', look: 'a feeling and a clue (waited all week, her own name, full arms)' }
    ]
  });

  P.add({
    id: 'g2-snowshoe-hare', subject: 'science', form: 'Information text',
    title: 'A Coat for Every Season',
    deck: 'The snowshoe hare changes colour.',
    hero: {
      photo: 'g4-snowshoe-hare.jpg', credit: 'Photo: Fralambert, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'A snowshoe hare in its brown summer coat, Nova Scotia.'
    },
    body: [
      'The snowshoe hare lives in the forests of Canada. It has long ears and very big back feet.',
      'In summer, its fur is brown, like the dirt and dead leaves on the forest floor. In fall, it starts to grow new fur. By winter, its coat is white, like the snow.',
      { fig: '<path class="k" d="M10 120 H140"/><path class="k" d="M160 120 H290"/>' +
          '<ellipse class="h" cx="75" cy="96" rx="30" ry="20"/><ellipse class="h" cx="104" cy="80" rx="12" ry="10"/><path class="k" d="M100 70 Q96 40 104 36 Q110 44 108 70"/>' +
          '<ellipse class="k" cx="225" cy="96" rx="30" ry="20"/><ellipse class="k" cx="254" cy="80" rx="12" ry="10"/><path class="k" d="M250 70 Q246 40 254 36 Q260 44 258 70"/>' +
          '<text class="lb" x="75" y="144" text-anchor="middle">summer: brown</text><text class="lb" x="225" y="144" text-anchor="middle">winter: white</text>',
        tall: 150, cap: 'The same hare in summer and in winter.' },
      'This helps the hare hide from foxes, lynx and owls. When an animal blends in with what is around it, we call it <b>camouflage</b>.',
      'Its big back feet are covered in thick fur. They spread out on top of the snow, just like snowshoes. That is how the hare got its name!'
    ],
    guide: { before: 'Look at the two drawings and say what is different. Teach <b>camouflage</b>; play a quick game of spotting a toy hidden on a matching colour.',
      after: 'What might happen to a white hare if there were no snow one winter?' },
    words: [['camouflage', 'colours or shapes that help an animal hide']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'What colour is the hare in winter?',
        opts: ['brown', 'white', 'grey'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'What do the two drawings help you see?',
        opts: ['how the hare’s coat changes', 'how fast the hare runs', 'where the hare sleeps'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why is a white coat good in winter?',
        opts: ['It helps the hare hide in the snow.', 'It is warmer than brown.', 'It looks nice.'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'How did the snowshoe hare get its name?',
        opts: ['Its feet work like snowshoes.', 'It wears shoes.', 'It lives in shoes.'], a: 0 },
      { k: 'choice', code: 'C2.6', q: 'What is the main idea?',
        opts: ['The hare’s coat and feet help it live in the forest.', 'Owls hunt at night.', 'Snow is white.'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'A white hare sits on brown ground in early spring. What might happen? Why?',
        a: 'A fox might see it, because white does not blend in with brown ground.', look: 'a prediction using what camouflage means' }
    ]
  });

  P.add({
    id: 'g2-skipping-rhyme', subject: 'story', form: 'Poem',
    title: 'Skipping Song',
    deck: 'A rhyme to chant while you skip',
    hero: {
      photo: 'g4-skipping.jpg', credit: 'Photo: Maksym Kozlenko, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 260,
      cap: 'Two girls skipping rope.'
    },
    body: [
      { poem: ['Turn the rope and in I go,', 'over, under, high and low.', 'One for the robin, two for the bee,', 'three for the maple, four for me!', '',
        'Faster, faster, swing it round,', 'my feet <b>barely</b> touch the ground.', 'Five for the river, six for the sky,', 'seven for the geese that honk goodbye!', '',
        'Slower, slower, now we stop.', 'Count the jumps from bottom to top.', 'Eight, nine, ten, my turn is done.', 'In you jump, it’s your turn to have fun!'] }
    ],
    guide: { before: 'Chant the poem together with a clapping beat. If you can, try it with a skipping rope outside. Point out how the counting builds.',
      after: 'Make up your own line: “Eleven for the ___.” What rhymes?' },
    words: [['barely', 'only just, almost not']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Which word rhymes with bee?',
        opts: ['me', 'rope', 'go'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'How are the numbers in the poem arranged?',
        opts: ['They count up from one to ten.', 'They count down.', 'They are mixed up.'], a: 0 },
      { k: 'choice', code: 'C1.5', q: 'Why does the poem say “Faster, faster” and later “Slower, slower”?',
        opts: ['to match the speed of the rope', 'to tell about a car', 'to make the poem quiet'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“Geese that honk.” Honk is a word that',
        opts: ['sounds like the noise it names', 'names a colour', 'names a number'], a: 0 },
      { k: 'choice', code: 'C2.2', q: 'Why would a child read this poem?',
        opts: ['to chant it while skipping and have fun', 'to learn how geese fly', 'to find a phone number'], a: 0 },
      { k: 'lines', code: 'B3.3', n: 2, q: 'Copy the last line of the poem. Circle the end mark. Why is it there?',
        a: 'In you jump, it’s your turn to have fun! The exclamation mark shows excitement.', look: 'the line copied correctly and the exclamation mark explained (strong feeling)' }
    ]
  });

  P.add({
    id: 'g2-food-drive', subject: 'social', form: 'Class report',
    title: 'Our Food Drive',
    deck: 'Room 8 collects food for families in their town.',
    hero: {
      photo: 'g5-food-bank.jpg', credit: 'Photo: U.S. Department of Agriculture, public domain, Wikimedia Commons', focus: '50% 80%',
      tall: 250,
      cap: 'Shelves of food at a food bank.'
    },
    body: [
      'In November, Room 8 held a food drive for the Brampton food bank. A <b>food bank</b> gives food to families who need some help.',
      'Each week, students brought in cans and boxes of food. Mr. Okafor put a big box by the door. We counted the cans every Friday and made a graph.',
      { fig: '<path class="k" d="M40 10 V130 H290"/>' + [0, 10, 20, 30].map(function (v) { return '<text class="n" x="34" y="' + (134 - v * 3.6) + '" text-anchor="end">' + v + '</text><path class="t" d="M40 ' + (130 - v * 3.6) + ' H290"/>'; }).join('') +
          [[1, 8], [2, 15], [3, 12], [4, 30]].map(function (b) { return '<rect class="h" x="' + (b[0] * 58 + 10) + '" y="' + (130 - b[1] * 3.6) + '" width="34" height="' + (b[1] * 3.6) + '"/><text class="l" x="' + (b[0] * 58 + 27) + '" y="148" text-anchor="middle">Week ' + b[0] + '</text>'; }).join(''),
        tall: 155, cap: 'Cans collected each week.' },
      'In week 4, our principal said she would wear a silly hat if we beat 25 cans. We brought in 30!',
      '<b>Altogether</b>, we collected 65 cans. That can help many families have dinner.',
      'We learned that a lot of small gifts add up to something big. We want to do it again in the spring.'
    ],
    guide: { before: 'Explain what a food bank is and that many families use one at some time. Read the graph together: find the tallest bar. Teach <b>food bank</b>.',
      after: 'Why did the class say “small gifts add up to something big”? What else could a class do to help?' },
    words: [['food bank', 'a place that gives free food to people who need it'], ['altogether', 'all added up']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the graph. In which week did the class collect the most cans?',
        opts: ['Week 1', 'Week 2', 'Week 4'], a: 2 },
      { k: 'choice', code: 'C1.4', q: 'How many cans did they collect in Week 2?',
        opts: ['8', '15', '30'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why do you think the class brought so many cans in Week 4?',
        opts: ['They wanted to see the principal wear a silly hat.', 'It was the last day of school.', 'The box was bigger.'], a: 0 },
      { k: 'choice', code: 'C1.6', q: 'Who is telling about the food drive?',
        opts: ['a student in Room 8, using “we”', 'the principal', 'a family at the food bank'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What is the lesson the class learned?',
        opts: ['Many small gifts add up to something big.', 'Cans are heavy.', 'Graphs are hard.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How do you think the families felt when they got the food? Why?',
        a: 'They felt thankful and relieved, because they had food for dinner.', look: 'a feeling and a reason, showing empathy' }
    ]
  });

  P.add({
    id: 'g2-crow-spoon', subject: 'story', form: 'Fable',
    title: 'The Crow and the Shiny Spoon',
    deck: 'A crow who always wants more',
    hero: {
      photo: 'g2-crow.jpg', credit: 'Photo: Paul Danese, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 35%',
      tall: 250,
      cap: 'An American crow.'
    },
    body: [
      'Crow loved shiny things. Her nest was full of foil, bottle caps and a bent paper clip.',
      'One day, she saw a silver spoon on a picnic table. It flashed in the sun. “That spoon should be mine,” Crow said.',
      'She grabbed it and flew home. But the spoon was heavy and long. It would not fit in her nest. When she pushed it in, the foil fell out. When she pushed harder, a bottle cap fell out. Then the paper clip.',
      'At last, the spoon was in the nest. But now there was no room for Crow!',
      'She sat on a cold branch all night, <b>grumbling</b>.',
      'In the morning, a wise old owl looked down. “You have a fine spoon,” said Owl, “and nowhere to sleep. Was it worth it?”',
      'Crow looked at her empty, crowded nest. She dropped the spoon back on the picnic table.'
    ],
    guide: { before: 'Remind the child that a fable has talking animals and a lesson. Ask them to look for the lesson as they read. Teach <b>grumbling</b>.',
      after: 'Have you ever wanted something so much that it caused a problem? What happened?' },
    words: [['grumbling', 'complaining in a low, cross voice']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'What kind of character is Crow at the start?',
        opts: ['She expects to get whatever she wants.', 'She is shy.', 'She shares everything.'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'What happened when Crow pushed the spoon into the nest?',
        opts: ['Her other treasures fell out.', 'The nest got bigger.', 'The spoon broke.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did Crow sit on a cold branch all night?',
        opts: ['There was no room in her nest.', 'She was watching the owl.', 'She liked the cold.'], a: 0 },
      { k: 'choice', code: 'B2.4', q: 'The spoon “flashed” in the sun. Flashed means',
        opts: ['shone brightly for a moment', 'fell down', 'got hot'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What is the lesson of the fable?',
        opts: ['Wanting more can leave you with less.', 'Spoons are useful.', 'Owls are wise.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why did Crow give the spoon back? What did she learn?',
        a: 'She saw that the spoon took all the room and she lost her other things. She learned that grabbing more did not make her happy.', look: 'the reason (no room, lost things) and the lesson in own words' }
    ]
  });

  P.add({
    id: 'g2-dragon-boat', subject: 'social', form: 'Recount',
    title: 'Paddle Together',
    deck: 'Jun’s family goes to the dragon boat festival.',
    hero: {
      photo: 'g4-dragon-boat.jpg', credit: 'Photo: John Vetterli, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A dragon boat crew paddling in Toronto.'
    },
    body: [
      'Last June, my family went to the dragon boat <b>festival</b> in Toronto. My aunt was on a team.',
      'A dragon boat is long and thin. It has a dragon head at the front and a tail at the back. Dragon boat racing started in China more than 2000 years ago.',
      { fig: '<path class="k" d="M30 70 L270 70 L254 92 L46 92 Z"/><path class="k" d="M270 70 Q290 54 282 40 Q274 50 266 56"/><path class="k" d="M30 70 Q14 60 18 46"/>' +
          [70, 100, 130, 160, 190, 220].map(function (x) { return '<path class="a" d="M' + x + ' 66 L' + (x - 14) + ' 104"/>'; }).join('') +
          '<circle class="k" cx="250" cy="56" r="7"/><circle class="k" cx="44" cy="58" r="7"/>' +
          D.label(234, 24, 'drummer', 250, 48) + D.label(4, 24, 'steerer', 44, 50) + D.label(110, 130, 'paddlers', 130, 100),
        tall: 140, cap: 'Who sits where in a dragon boat.' },
      'There are about twenty <b>paddlers</b>. A drummer sits at the front and beats a big drum. The paddlers must all pull at the same time, to the beat. A steerer stands at the back and keeps the boat straight.',
      'When my aunt’s race started, the drum went BOOM, BOOM, BOOM. All the paddles went in the water together. Splash! Splash! Their boat came second.',
      'Auntie said the best part is not winning. “It is twenty people moving as one,” she said.'
    ],
    guide: { before: 'Find China and Toronto on a map. Explain the dragon boat festival. Look at the diagram and name each job. Teach <b>paddlers</b>.',
      after: 'When have you worked with a group, all at the same time? What helped you stay together?' },
    words: [['paddlers', 'people who move a boat with paddles'], ['festival', 'a big, happy event, often with music and food']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. Where does the drummer sit?',
        opts: ['at the front', 'in the middle', 'at the back'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why does the drummer beat the drum?',
        opts: ['so everyone pulls at the same time', 'to scare fish', 'to start the music show'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'Where did dragon boat racing begin?',
        opts: ['in China', 'in Toronto', 'in Mexico'], a: 0 },
      { k: 'choice', code: 'C1.6', q: 'The story says “my family” and “my aunt.” Who is telling it?',
        opts: ['a child in the family', 'the drummer', 'a reporter'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'What does Auntie think is the best part?',
        opts: ['winning the race', 'everyone moving as one team', 'the food'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Which job in the boat would you want? Tell why.',
        a: 'Example: The drummer, because I like to keep the beat and help everyone stay together.', look: 'a job from the text and a reason' }
    ]
  });

})();
