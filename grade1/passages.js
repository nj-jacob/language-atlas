/* Grade 1 reading passages for the tool box (assets/engine/library.js). Written for this site.
   Short stories, poems and simple information texts, 50 to 140 words, with 3 choices in each circle-one question. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;

  P.add({
    id: 'g1-lost-mitt', subject: 'story', form: 'Short story',
    title: 'The Lost Mitt',
    deck: 'Sam has one red mitt. Where is the other one?',
    hero: {
      photo: 'g1-mittens.jpg', credit: 'Photo: Pink Sherbet Photography, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 300,
      cap: 'Mitts covered in fresh snow.'
    },
    body: [
      'Sam went out to play in the snow. He had a red hat and two red mitts.',
      'Sam made a big snow hill. He dug a deep hole. Then he went in for lunch.',
      'After lunch, Sam had just one mitt. “Mom, my mitt is lost!” he said.',
      'Sam and his dog, Pip, went back out. Sam looked by the snow hill. He looked in the hole. No mitt.',
      'Pip sniffed and sniffed. Then she began to dig. Snow went flying!',
      'Pip came back with something red in her mouth. She <b>wagged</b> her tail.',
      '“Good dog, Pip!” said Sam. He gave her a big hug.'
    ],
    guide: { before: 'Ask: have you ever lost something? How did you find it? Look at the photo and name what you see. Teach <b>wagged</b> (show it with your hand).',
      after: 'How did Pip help Sam? How can you help someone who has lost something?' },
    words: [['wagged', 'moved from side to side']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'What did Sam lose?',
        opts: ['his hat', 'his mitt', 'his dog'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'What did Sam do first?',
        opts: ['He made a snow hill.', 'He ate lunch.', 'He hugged Pip.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'What did Pip have in her mouth?',
        opts: ['a stick', 'a red hat', 'the lost mitt'], a: 2 },
      { k: 'choice', code: 'C3.2', q: 'How did Sam feel at the end?',
        opts: ['sad', 'happy', 'cold and mad'], a: 1 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Tell about a time you lost something. How did you find it?',
        a: 'Example: I lost my shoe. I found it under my bed.', look: 'a real lost thing and how it was found, in a full sentence' }
    ]
  });

  P.add({
    id: 'g1-frogs', subject: 'science', form: 'Information text',
    title: 'From Egg to Frog',
    deck: 'A frog does not start out as a frog.',
    hero: {
      photo: 'g1-green-frog.jpg', credit: 'Photo: Contrabaroness, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 45%',
      tall: 250,
      cap: 'A green frog sits on moss next to a pond.'
    },
    body: [
      'A frog starts as a tiny egg. The eggs float in a pond in a big, soft clump.',
      'A <b>tadpole</b> comes out of each egg. A tadpole has a long tail. It swims like a fish.',
      { fig: '<circle class="k" cx="40" cy="38" r="9"/><circle class="k" cx="58" cy="44" r="9"/><circle class="k" cx="46" cy="56" r="9"/><circle class="dot" cx="40" cy="38" r="2"/><circle class="dot" cx="58" cy="44" r="2"/><circle class="dot" cx="46" cy="56" r="2"/>' +
          '<ellipse class="k" cx="226" cy="46" rx="12" ry="9"/><path class="k" d="M214 46 Q196 36 186 50 Q198 50 214 50"/>' +
          '<ellipse class="k" cx="226" cy="150" rx="14" ry="10"/><path class="k" d="M212 150 Q198 144 192 154"/><path class="k" d="M220 159 L212 172 M232 159 L240 172"/>' +
          '<ellipse class="k" cx="60" cy="152" rx="22" ry="14"/><circle class="k" cx="50" cy="138" r="5"/><circle class="k" cx="70" cy="138" r="5"/><path class="k" d="M40 160 L26 176 L40 172 M80 160 L94 176 L80 172"/>' +
          D.arrow(90, 46, 176, 46, 'a') + D.arrow(226, 66, 226, 130, 'a') + D.arrow(200, 152, 98, 152, 'a') + D.arrow(56, 128, 50, 72, 'a') +
          '<text class="lb" x="50" y="18" text-anchor="middle">1. eggs</text><text class="lb" x="226" y="22" text-anchor="middle">2. tadpole</text>' +
          '<text class="lb" x="226" y="196" text-anchor="middle">3. tadpole with legs</text><text class="lb" x="60" y="196" text-anchor="middle">4. frog</text>',
        tall: 205, cap: 'A frog grows in four steps. Follow the arrows.' },
      'Soon the tadpole grows back legs. Then it grows front legs. Its tail gets short.',
      'At last, the tail is gone. Now it is a frog! The frog hops out of the pond to sit in the sun. It can <b>breathe</b> air now.'
    ],
    guide: { before: 'Ask what the child knows about frogs and ponds. Look at the diagram first and follow the arrows with a finger. Teach <b>tadpole</b> and <b>breathe</b>.',
      after: 'A tadpole looks very different from a frog. What else changes a lot as it grows?' },
    words: [['tadpole', 'a baby frog that lives in water'], ['breathe', 'take air in and out']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'What comes out of a frog egg?',
        opts: ['a frog', 'a tadpole', 'a fish'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. What is step 3?',
        opts: ['eggs', 'a frog', 'a tadpole with legs'], a: 2 },
      { k: 'order', code: 'C3.3', q: 'Number these in order, 1 to 3.',
        items: ['The tadpole swims with its tail.', 'The tadpole grows legs.', 'The frog hops out of the pond.'], show: [2, 0, 1] },
      { k: 'choice', code: 'C2.6', q: 'What is this text mostly about?',
        opts: ['how a frog grows', 'how to catch a frog', 'how fish swim'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why does a tadpole need a tail?',
        a: 'It needs its tail to swim in the pond, because it has no legs yet.', look: 'links the tail to swimming (it lives in water, no legs yet)' }
    ]
  });

  P.add({
    id: 'g1-rain', subject: 'story', form: 'Poem',
    title: 'Rain Song',
    deck: 'A poem to read out loud',
    hero: {
      photo: 'g1-puddle.jpg', credit: 'Photo: Jean-Marie Vugnon, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 280,
      cap: 'Raindrops make rings in a puddle.'
    },
    body: [
      { poem: ['Drip, drop,', 'on the roof top.', 'Pitter, patter,', 'what is the matter?', '',
        'Plip, plop,', 'the rain will not stop.', 'I put on my boots', 'and out I hop!', '',
        'Splish, splash,', 'in a <b>puddle</b> I dash.', 'Mud on my <b>knees</b>,', 'mud on my nose,', 'mud on my boots', 'and all of my clothes!'] }
    ],
    guide: { before: 'Read the poem aloud once, tapping the beat. Then read it together. Teach <b>puddle</b> and <b>knees</b> (point to them).',
      after: 'Which sound words would you add for snow? Make up two lines together.' },
    words: [['puddle', 'a small pool of rain on the ground'], ['knees', 'the middle of your legs, where they bend']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Which word rhymes with drop?',
        opts: ['top', 'drip', 'rain'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“Splish, splash” is the sound of',
        opts: ['a dog', 'feet in a puddle', 'a bell'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'How does the child in the poem feel about the rain?',
        opts: ['scared', 'happy and playful', 'sleepy'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'What does the photo show?',
        opts: ['rain in a puddle', 'mud on boots', 'a roof'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Do you like to play in the rain? Tell why.',
        a: 'Example: Yes, I like to jump in puddles. It is fun to splash.', look: 'a clear yes or no and a reason' }
    ]
  });
  P.add({
    id: 'g1-shadows', subject: 'science', form: 'Information text',
    title: 'My Shadow',
    deck: 'Why does a shadow grow and shrink?',
    hero: {
      art: '<circle class="a" cx="610" cy="60" r="34"/><path class="a" d="M610 12 V2 M610 108 V118 M562 60 H552 M658 60 H668 M576 26 L569 19 M644 94 L651 101 M644 26 L651 19 M576 94 L569 101"/>' +
        '<path class="k" d="M0 250 H700"/><circle class="k" cx="300" cy="120" r="16"/><path class="k" d="M300 136 V196 M300 152 L276 176 M300 152 L324 176 M300 196 L284 248 M300 196 L316 248"/>' +
        '<path class="h" d="M286 250 L314 250 L120 272 L96 272 Z"/><ellipse class="h" cx="76" cy="270" rx="22" ry="11"/>' +
        '<text class="lb" x="610" y="150" text-anchor="middle">sun</text><text class="lb" x="150" y="294">shadow</text>',
      tall: 300,
      cap: 'The sun is on one side. The shadow is on the other side.'
    },
    body: [
      'Stand in the sun. Look down. You will see your <b>shadow</b>.',
      'Your body blocks the light from the sun. The dark spot where the light can not get past is your shadow.',
      'In the morning, the sun is low. Your shadow is long. At lunch, the sun is high. Your shadow is short.',
      { fig: '<path class="k" d="M10 120 H140 M160 120 H290"/><circle class="a" cx="20" cy="70" r="10"/><circle class="a" cx="225" cy="16" r="10"/>' +
          '<path class="k" d="M100 76 V120 M100 88 L90 100 M100 88 L110 100"/><circle class="k" cx="100" cy="70" r="6"/><path class="h" d="M96 120 L104 120 L150 130 L128 130 Z"/><circle class="h" cx="142" cy="131" r="5"/>' +
          '<path class="k" d="M225 76 V120 M225 88 L215 100 M225 88 L235 100"/><circle class="k" cx="225" cy="70" r="6"/><path class="h" d="M221 120 L229 120 L236 126 L226 126 Z"/>' +
          '<text class="lb" x="75" y="150" text-anchor="middle">morning: long</text><text class="lb" x="225" y="150" text-anchor="middle">lunch: short</text>',
        tall: 160, cap: 'The same girl in the morning and at lunch.' },
      'Your shadow does what you do. Wave your arm. Your shadow waves too!'
    ],
    guide: { before: 'Go outside or use a lamp. Make a shadow with your hand. Teach <b>shadow</b>.',
      after: 'Can you make a shadow in a dark room? Why or why not?' },
    words: [['shadow', 'a dark shape made when something blocks light']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'What makes a shadow?',
        opts: ['your body blocking the sun', 'rain on the ground', 'a dark cloud'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the drawing. When is the shadow short?',
        opts: ['in the morning', 'at lunch', 'at night'], a: 1 },
      { k: 'choice', code: 'B2.7', q: 'The sun is “low.” Low means',
        opts: ['near the ground', 'very hot', 'far up high'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'You jump. What will your shadow do?',
        opts: ['sit still', 'jump too', 'go away'], a: 1 },
      { k: 'lines', code: 'C2.6', n: 2, q: 'What is one thing you learned about shadows?',
        a: 'A shadow is long in the morning and short at lunch.', look: 'a fact from the text in the child’s own words' }
    ]
  });

  P.add({
    id: 'g1-big-hill', subject: 'story', form: 'Short story',
    title: 'The Big Hill',
    deck: 'Ava wants to go down the big hill. Can she do it?',
    hero: {
      photo: 'g1-sled-hill.jpg', credit: 'Photo: Michał Frąckowiak, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 300,
      cap: 'A child slides down a snowy hill on a sled.'
    },
    body: [
      'Ava and Grandpa went to the park. The big hill was white with snow. Kids went down it fast.',
      'Ava held her <b>sled</b>. Her legs felt like jelly. “It is too big,” she said.',
      '“Let’s start on the little hill,” said Grandpa.',
      'Ava went down the little hill. Whoosh! It was fun. She went down it three times.',
      'Then Ava looked at the big hill. She took a deep breath. She sat on her sled and held on tight.',
      'Whoosh! Down, down, down she went. Snow flew in her face.',
      'At the bottom, Ava jumped up. “Grandpa! Can I go again?”'
    ],
    guide: { before: 'Ask: what is something that felt scary the first time? Look at the photo together and talk about sledding safely.',
      after: 'Grandpa did not tell Ava to just be brave. What did he do instead? Was it a good idea?' },
    words: [['sled', 'a flat board you ride on snow']],
    qs: [
      { k: 'choice', code: 'C3.2', q: '“Her legs felt like jelly.” This tells you Ava was',
        opts: ['hungry', 'scared', 'cold'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Where did Ava go down first?',
        opts: ['the big hill', 'the little hill', 'the slide'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'Which word is a sound word?',
        opts: ['Whoosh', 'park', 'tight'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Which sentence asks a question?',
        opts: ['“It is too big,” she said.', '“Can I go again?”', 'Kids went down it fast.'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'How did Ava feel at the end?',
        opts: ['proud and happy', 'sad', 'sleepy'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'How did Grandpa help Ava?',
        a: 'He let her try the little hill first, so she was not scared.', look: 'the little hill first (a small step), in the child’s words' }
    ]
  });

  P.add({
    id: 'g1-bird-count', subject: 'science', form: 'Information text',
    title: 'Birds at Our Feeder',
    deck: 'Room 3 counts the birds that come to eat.',
    hero: {
      photo: 'g4-chickadee.jpg', credit: 'Photo: Rhododendrites, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 270,
      cap: 'A chickadee at a bird feeder.'
    },
    body: [
      'Room 3 has a bird <b>feeder</b> by the window. Every day, the class fills it with seeds.',
      'On Monday, the class counted the birds that came to eat. They made a chart.',
      { fig: '<path class="k" d="M100 10 V140 M100 140 H290"/>' +
          '<text class="l" x="94" y="34" text-anchor="end">chickadee</text><text class="l" x="94" y="74" text-anchor="end">blue jay</text><text class="l" x="94" y="114" text-anchor="end">cardinal</text>' +
          [0, 1, 2, 3, 4, 5].map(function (i) { return '<circle class="a" cx="' + (120 + i * 28) + '" cy="30" r="10"/>'; }).join('') +
          [0, 1].map(function (i) { return '<circle class="a" cx="' + (120 + i * 28) + '" cy="70" r="10"/>'; }).join('') +
          [0, 1, 2].map(function (i) { return '<circle class="a" cx="' + (120 + i * 28) + '" cy="110" r="10"/>'; }).join('') +
          '<text class="n" x="195" y="160" text-anchor="middle">each circle = 1 bird</text>',
        tall: 165, cap: 'The birds that came on Monday.' },
      'The chickadees came the most. They are small and grey, with a black cap. They say their name: chick-a-dee-dee-dee!',
      'A blue jay came too. It was big and loud. It <b>scared</b> the little birds away for a bit.'
    ],
    guide: { before: 'Ask what birds the child sees in winter. Look at the chart and count each row together. Teach <b>feeder</b> and <b>scared</b>.',
      after: 'If you made a feeder, which bird would you most like to see? Why?' },
    words: [['feeder', 'a box or tube that holds food for birds'], ['scared', 'made to feel afraid']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the chart. How many chickadees came?',
        opts: ['2', '3', '6'], a: 2 },
      { k: 'choice', code: 'C1.4', q: 'Which bird came the least?',
        opts: ['chickadee', 'blue jay', 'cardinal'], a: 1 },
      { k: 'choice', code: 'C1.1', q: 'What does a chickadee have on its head?',
        opts: ['a black cap', 'a red top', 'a blue crest'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did the little birds fly away?',
        opts: ['They were full.', 'The big, loud blue jay scared them.', 'It was night.'], a: 1 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What bird have you seen near your home?',
        a: 'Example: I see robins on our grass.', look: 'a real bird and where it was seen' }
    ]
  });

  P.add({
    id: 'g1-bannock', subject: 'story', form: 'Short story',
    title: 'Bannock with Kokum',
    deck: 'Jesse and his kokum make bread at the fire.',
    hero: {
      photo: 'g6-bannock.jpg', credit: 'Photo: Sandra Cohen-Rose and Colin Rose, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 300,
      cap: 'Bannock dough cooks on sticks over a fire.'
    },
    body: [
      'Jesse and his <b>kokum</b> sat by the fire at camp. Kokum is the Cree word for grandma.',
      'Kokum mixed flour, water and a pinch of salt in a bowl. Jesse helped to pat the <b>dough</b>.',
      'Then Kokum showed Jesse how to wrap the dough on a stick. “Hold it up high,” she said. “Not too close to the fire.”',
      'Jesse turned his stick slowly. The bread got puffy and gold.',
      '“My kokum made bannock with me when I was small,” said Kokum. “Now I make it with you.”',
      'Jesse took a bite. It was warm and good. “Next time, I will make it with my little sister,” he said.'
    ],
    guide: { before: 'Explain that bannock is a bread made by many First Nations and Métis families, often over a fire. Teach <b>kokum</b> (a Cree word for grandmother) and <b>dough</b>.',
      after: 'What is something your family makes or does together that is passed down from older people to younger people?' },
    words: [['kokum', 'the Cree word for grandma'], ['dough', 'a soft mix of flour and water, before it is cooked']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'Where did Jesse and Kokum make bannock?',
        opts: ['at school', 'by a fire at camp', 'in a store'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'What did Kokum do first?',
        opts: ['She mixed flour, water and salt.', 'She put the dough on a stick.', 'She took a bite.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did Kokum say, “Not too close to the fire”?',
        opts: ['so the bread would not burn', 'so the bread would get cold', 'so the stick would get long'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'What is this story mostly about?',
        opts: ['how to build a fire', 'a family way of cooking passed from old to young', 'a trip to the store'], a: 1 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What does your family make or do together?',
        a: 'Example: My dad and I make pancakes on Sunday.', look: 'a real family activity, in a full sentence' }
    ]
  });

  P.add({
    id: 'g1-two-seeds', subject: 'story', form: 'Fable',
    title: 'Two Little Seeds',
    deck: 'One seed is in a hurry. One seed waits.',
    hero: {
      photo: 'g6-tomato-seedlings.jpg', credit: 'Photo: Dwight Sipler, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 290,
      cap: 'Small green plants pop up from the soil.'
    },
    body: [
      'Two little seeds sat in the dark, cold ground.',
      '“I want to be a big plant now!” said the first seed. It pushed up and up. It popped out of the ground on a cold, <b>frosty</b> day. Brrr! Its tiny leaf froze.',
      'The second seed said, “I will wait for the sun.” It sat and sat. It drank the rain. It grew long roots down deep.',
      'At last, the warm days came. The second seed pushed up into the sun. It grew tall and green. Soon it had a red flower.',
      '“You are so big!” said a bee. “How did you do it?”',
      '“I waited,” said the plant, “until the time was right.”'
    ],
    guide: { before: 'Explain that a fable is a short story with a lesson, where plants or animals talk. Teach <b>frosty</b>.',
      after: 'Tell about a time when waiting was the best thing to do.' },
    words: [['frosty', 'very cold, with ice on things']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This story is a fable. How can you tell?',
        opts: ['It has a lesson and the seeds talk.', 'It gives facts about seeds.', 'It is a list.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did the first seed’s leaf freeze?',
        opts: ['It came up too soon, on a cold day.', 'It got too much sun.', 'A bee sat on it.'], a: 0 },
      { k: 'choice', code: 'B3.2', q: 'In “It grew tall and green,” which word tells what it did?',
        opts: ['tall', 'grew', 'green'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'What is the lesson of this story?',
        opts: ['Big plants are best.', 'It can be good to wait until the time is right.', 'Bees like flowers.'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Which seed was more like you? Tell why.',
        a: 'Example: The first seed, because I like to do things fast.', look: 'a choice and a reason' }
    ]
  });

  P.add({
    id: 'g1-bus-poem', subject: 'story', form: 'Poem',
    title: 'The Bus at Eight',
    deck: 'A poem about the ride to school',
    hero: {
      photo: 'g4-school-bus.jpg', credit: 'Photo: Crisco 1492, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 280,
      cap: 'A yellow school bus in Windsor, Ontario.'
    },
    body: [
      { poem: ['The bus comes at eight,', 'so I must not be late.', 'I run down the street', 'on my two quick feet.', '',
        'Bump, bump, bump', 'on the big road hump.', 'Beep, beep, beep,', 'the bus horn <b>peeps</b>.', '',
        'I sit with my friend.', 'We talk to the end.', 'Then the big doors <b>squeak</b>.', 'See you, bus! Next week!'] }
    ],
    guide: { before: 'Read the poem aloud and clap the beat. Find the rhyming pairs together. Teach <b>peeps</b> and <b>squeak</b> by making the sounds.',
      after: 'How do you get to school? Make up two lines that rhyme about it.' },
    words: [['peeps', 'makes a short, high sound'], ['squeak', 'a short, high sound, like a door that needs oil']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Which word rhymes with eight?',
        opts: ['late', 'street', 'bus'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“Bump, bump, bump” tells the sound of',
        opts: ['the bus on a bumpy road', 'a dog', 'a drum'], a: 0 },
      { k: 'choice', code: 'C1.6', q: 'Who is telling this poem?',
        opts: ['the bus driver', 'a child who rides the bus', 'a teacher'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does the child run down the street?',
        opts: ['to play a game', 'so they will not miss the bus', 'to see a friend’s dog'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Which part of the poem do you like best? Tell why.',
        a: 'Example: I like “Beep, beep, beep” because it sounds like a real bus.', look: 'names a part and gives a reason' }
    ]
  });

  P.add({
    id: 'g1-beaver-home', subject: 'science', form: 'Information text',
    title: 'A Beaver’s Home',
    deck: 'Beavers build a home in the water.',
    hero: {
      photo: 'g4-beaver-lodge.jpg', credit: 'Photo: Benfwilliamson, CC0, Wikimedia Commons', focus: '50% 62%',
      tall: 260,
      cap: 'A beaver lodge in a pond.'
    },
    body: [
      'Beavers live in a home called a <b>lodge</b>. They build it with sticks and mud.',
      'Beavers cut down trees with their big front teeth. Then they drag the sticks to the pond.',
      { fig: '<path class="a" d="M0 70 H300"/>' + D.ripple(6, 60, 80) + D.ripple(240, 296, 80) +
          '<path class="h" d="M70 140 Q90 30 150 26 Q210 30 230 140"/><path class="k" d="M115 70 Q150 48 185 70 Z"/><path class="k" d="M10 140 H290"/>' +
          D.arrow(60, 128, 112, 108, 'a') +
          D.label(196, 20, 'dry room', 160, 62) + D.label(8, 160, 'door under the water', 92, 124),
        tall: 170, cap: 'Inside a lodge. The door is under the water.' },
      'The door of the lodge is under the water. A wolf or a fox can not get in!',
      'Inside, there is a dry room. The beavers sleep there. In winter, the pond is <b>frozen</b> on top, but the beavers stay snug inside.'
    ],
    guide: { before: 'Ask what the child knows about beavers. Look at the drawing and trace how a beaver swims in through the door. Teach <b>lodge</b> and <b>frozen</b>.',
      after: 'Why is a door under the water a smart idea for a beaver?' },
    words: [['lodge', 'a beaver’s home of sticks and mud'], ['frozen', 'turned to ice']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'What do beavers use to build a lodge?',
        opts: ['rocks and sand', 'sticks and mud', 'snow and ice'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'Look at the drawing. Where is the door?',
        opts: ['on the top', 'under the water', 'in a tree'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why can a wolf not get into the lodge?',
        opts: ['A wolf can not swim under the water to the door.', 'The lodge is too small.', 'The beavers are too big.'], a: 0 },
      { k: 'choice', code: 'C2.6', q: 'What is this text mostly about?',
        opts: ['how beavers build a safe home', 'how wolves hunt', 'how ice is made'], a: 0 },
      { k: 'lines', code: 'C1.1', n: 2, q: 'What do beavers use their big front teeth for?',
        a: 'They use them to cut down trees.', look: 'cutting trees (or sticks), from the text' }
    ]
  });

  P.add({
    id: 'g1-new-friend', subject: 'story', form: 'Short story',
    title: 'Hola, Leo',
    deck: 'Leo is new. He does not know any English words yet.',
    hero: {
      photo: 'g4-playground.jpg', credit: 'Photo: Hameltion, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 290,
      cap: 'A school playground with a climbing wall.'
    },
    body: [
      'Leo was new in Mia’s class. Leo spoke Spanish. He did not know many English words yet.',
      'At recess, Leo stood by the wall all alone. He looked at the ground.',
      'Mia ran over. She did not know Spanish. So she smiled and held out a ball.',
      'Leo smiled back. They kicked the ball back and forth. They did not need words for that!',
      'Then Leo pointed at the ball. “<b>Pelota</b>,” he said.',
      '“Ball,” said Mia.',
      'By the end of recess, Mia knew three Spanish words. Leo knew three English words. And they each had a new friend.'
    ],
    guide: { before: 'Ask: how would it feel to go to a school where you did not know the language? Teach <b>pelota</b> (Spanish for ball). If your family speaks another language, share a word.',
      after: 'What else could Mia do to help Leo feel welcome?' },
    words: [['pelota', 'the Spanish word for ball']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Leo stood alone and looked at the ground. He felt',
        opts: ['lonely', 'silly', 'angry'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'What did Mia give Leo?',
        opts: ['a book', 'a ball', 'a snack'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'What happened after they kicked the ball?',
        opts: ['Leo went home.', 'They taught each other words.', 'Mia fell down.'], a: 1 },
      { k: 'choice', code: 'B3.2', q: 'Which word in this sentence is a naming word (a noun)? “Mia ran over.”',
        opts: ['Mia', 'ran', 'over'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What did Mia do that was kind?',
        a: 'She smiled and played ball with Leo, so he was not alone.', look: 'a kind act from the story (smiled, shared the ball, learned his words)' }
    ]
  });

  P.add({
    id: 'g1-ladybug', subject: 'story', form: 'Poem',
    title: 'Ladybug, Ladybug',
    deck: 'A poem about a small red bug',
    hero: {
      photo: 'g4-ladybug.jpg', credit: 'Photo: Star61, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 300,
      cap: 'A ladybug on a green stem.'
    },
    body: [
      { poem: ['Ladybug, ladybug,', 'little and red,', 'black dots on your back', 'and a black on your head.', '',
        'You <b>crawl</b> up a stem,', 'so slow, slow, slow.', 'Then you open your wings', 'and off you go!', '',
        'Ladybug, ladybug,', 'where will you fly?', 'Up past the flowers,', 'up to the sky.'] }
    ],
    guide: { before: 'Look at the photo and count the dots. Read the poem aloud, then echo-read it line by line. Teach <b>crawl</b> by moving fingers up an arm.',
      after: 'Where do you think the ladybug goes? Draw it.' },
    words: [['crawl', 'move slowly, close to the ground']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Which word rhymes with red?',
        opts: ['head', 'back', 'slow'], a: 0 },
      { k: 'choice', code: 'C1.5', q: 'The poem says “slow, slow, slow.” Why say it three times?',
        opts: ['to show the bug moves very slowly', 'to show the bug is fast', 'to show the bug is big'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'What does the ladybug do after it crawls up the stem?',
        opts: ['It eats a leaf.', 'It opens its wings and flies.', 'It goes to sleep.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: '“Little” and “ladybug” start with the same sound. Which word also starts with that sound?',
        opts: ['lake', 'bug', 'red'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Close your eyes and picture the ladybug. What do you see?',
        a: 'Example: I see a tiny red bug with black dots on a green stem.', look: 'details that show visualizing (colour, size, place)' }
    ]
  });

  P.add({
    id: 'g1-apples', subject: 'science', form: 'Information text',
    title: 'How an Apple Grows',
    deck: 'From a flower to a crunchy apple',
    hero: {
      photo: 'g4-apple-orchard.jpg', credit: 'Photo: Dillan Payne, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 260,
      cap: 'Apple trees in an orchard in Clarington, Ontario.'
    },
    body: [
      'Apples grow on trees. A farm with lots of apple trees is called an <b>orchard</b>.',
      'In spring, the tree gets white and pink flowers. Bees fly from flower to flower.',
      { fig: '<circle class="k" cx="40" cy="44" r="10"/><circle class="k" cx="40" cy="26" r="9"/><circle class="k" cx="58" cy="40" r="9"/><circle class="k" cx="22" cy="40" r="9"/><circle class="k" cx="30" cy="60" r="9"/><circle class="k" cx="50" cy="60" r="9"/>' +
          '<circle class="k" cx="150" cy="46" r="8"/><path class="k" d="M150 38 V28"/>' +
          '<path class="k" d="M260 30 Q240 22 236 44 Q238 70 260 66 Q282 70 284 44 Q280 22 260 30 Z"/><path class="k" d="M260 30 V18"/><path class="a" d="M262 22 Q272 14 280 18"/>' +
          D.arrow(76, 44, 132, 44, 'a') + D.arrow(170, 44, 226, 44, 'a') +
          '<text class="lb" x="40" y="96" text-anchor="middle">1. flower</text><text class="lb" x="150" y="96" text-anchor="middle">2. tiny apple</text><text class="lb" x="260" y="96" text-anchor="middle">3. big apple</text>',
        tall: 105, cap: 'An apple grows from a flower.' },
      'The flower petals fall off. A tiny green apple starts to grow in that spot.',
      'All summer, the apple gets sun and rain. It grows big. In the fall, it is <b>ripe</b>. It is red and sweet. Now it is time to pick it!'
    ],
    guide: { before: 'Bring an apple if you can. Cut it across to see the seed star. Teach <b>orchard</b> and <b>ripe</b>.',
      after: 'What is your favourite way to eat apples?' },
    words: [['orchard', 'a farm with many fruit trees'], ['ripe', 'ready to eat']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'When does an apple tree get flowers?',
        opts: ['in spring', 'in summer', 'in winter'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. What comes just before the big apple?',
        opts: ['the flower', 'the tiny apple', 'the seed'], a: 1 },
      { k: 'choice', code: 'B2.7', q: 'The apple is ripe. What does ripe mean?',
        opts: ['ready to eat', 'very small', 'green and hard'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number these in order, 1 to 3.',
        items: ['The tree gets flowers.', 'A tiny green apple grows.', 'The apple is red and ripe.'], show: [1, 2, 0] },
      { k: 'lines', code: 'C2.6', n: 2, q: 'In your own words, tell how an apple grows.',
        a: 'First there is a flower. Then a tiny apple grows. Then it gets big and ripe.', look: 'the steps in order: flower, small apple, ripe apple' }
    ]
  });

  P.add({
    id: 'g1-fish-note', subject: 'social', form: 'Note', plain: true,
    title: 'A Note for Mr. Ali',
    deck: 'Zoe will be away. Who will feed her fish?',
    hero: {
      art: '<path class="k" d="M250 60 Q240 70 240 160 Q240 268 350 272 Q460 268 460 160 Q460 70 450 60 Z"/><path class="a" d="M244 110 H456"/>' + D.ripple(250, 450, 110) +
        '<path class="k" d="M320 180 Q350 150 390 180 Q350 210 320 180 Z M390 180 L414 164 L414 196 Z"/><circle class="dot" cx="336" cy="176" r="3"/>' +
        '<circle class="t" cx="300" cy="140" r="5"/><circle class="t" cx="292" cy="126" r="4"/><path class="k" d="M260 252 Q300 236 330 254 M372 254 Q410 236 440 252"/>',
      tall: 290,
      cap: 'Bubbles the goldfish in her bowl.'
    },
    body: [
      'Dear Mr. Ali,',
      'We are going to visit my aunt for three days. Can you please feed my fish? Her name is Bubbles.',
      'Here is what to do:',
      { fig: '<rect class="k" x="10" y="8" width="280" height="134" rx="8"/>' +
          '<text class="lb" x="26" y="36">1. Give a tiny pinch of food.</text><text class="lb" x="26" y="68">2. Do it one time a day.</text><text class="lb" x="26" y="100">3. Do not tap on the bowl.</text>' +
          '<text class="n" x="26" y="128">Too much food makes the water dirty.</text>',
        tall: 150, cap: 'The steps for feeding Bubbles.' },
      'The food is in the blue <b>jar</b> by the bowl. The key is under the mat.',
      'We will be back on Sunday. I will make you a card to say thank you!',
      'From your neighbour,',
      'Zoe (in 2B)'
    ],
    guide: { before: 'Show how a note starts with “Dear” and ends with who it is from. Teach <b>jar</b>.',
      after: 'Who is a neighbour you could ask for help? What would you write to them?' },
    words: [['jar', 'a glass or plastic pot with a lid']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'What kind of text is this?',
        opts: ['a note asking for help', 'a poem', 'a story about a shark'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Who is Bubbles?',
        opts: ['Zoe’s aunt', 'a goldfish', 'a dog'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'Why are the steps in a box with numbers?',
        opts: ['to make them easy to follow in order', 'to make the note long', 'to show the days'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why should Mr. Ali give just a tiny pinch of food?',
        opts: ['Too much food makes the water dirty.', 'Fish do not eat.', 'The jar is empty.'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Which word needs a capital letter?',
        opts: ['sunday', 'fish', 'bowl'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'How do you think Zoe feels about Bubbles? How can you tell?',
        a: 'She loves Bubbles. She wrote careful steps so Bubbles stays safe.', look: 'a feeling with a clue from the note' }
    ]
  });

  P.add({
    id: 'g1-fox-jump', subject: 'science', form: 'Information text',
    title: 'The Fox Who Listens',
    deck: 'How does a fox find food under the snow?',
    hero: {
      photo: 'g6-red-fox.jpg', credit: 'Photo: In india travel, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 280,
      cap: 'A red fox in the snow.'
    },
    body: [
      'In winter, mice run in tunnels under the snow. A red fox can not see them. But it can hear them!',
      'The fox stands very still. It turns its big ears. It listens for a tiny squeak.',
      { fig: '<path class="k" d="M0 70 H300"/><path class="d" d="M0 112 H300"/><path class="k" d="M150 112 Q140 96 150 92 Q160 96 150 112"/>' +
          '<path class="a" d="M40 66 Q95 -20 148 86"/>' + D.arrow(144, 74, 148, 86, 'a') +
          '<path class="k" d="M24 66 L30 48 L48 44 L56 34 L60 46 L52 56 L56 66"/>' +
          D.label(188, 30, 'the fox jumps up', 110, 20) + D.label(190, 100, 'mouse under the snow', 156, 104) + '<text class="n" x="4" y="130">snow</text>',
        tall: 140, cap: 'The fox jumps up and dives down into the snow.' },
      'Then, jump! The fox leaps high in the air. It dives nose first into the snow.',
      'It does not catch a mouse every time. So it tries again and again. A fox is very <b>patient</b>.'
    ],
    guide: { before: 'Ask: how can you find something you can not see? Try listening for a hidden ticking timer. Teach <b>patient</b>.',
      after: 'When do you need to be patient like the fox?' },
    words: [['patient', 'able to wait and keep trying without getting upset']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'How does the fox find mice under the snow?',
        opts: ['It smells the snow.', 'It listens for them.', 'It digs a big hole.'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'Look at the drawing. Where is the mouse?',
        opts: ['in a tree', 'under the snow', 'on the fox'], a: 1 },
      { k: 'choice', code: 'B2.7', q: 'The fox “leaps.” Leaps means',
        opts: ['jumps', 'sleeps', 'eats'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does the fox stand very still?',
        opts: ['so it can hear tiny sounds', 'because it is cold', 'because it is sleepy'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 2, q: 'What is the big idea of this text?',
        a: 'A fox listens and jumps to catch mice under the snow.', look: 'the main idea (listening and jumping to hunt), not one small detail' }
    ]
  });

  P.add({
    id: 'g1-city-sounds', subject: 'story', form: 'Poem',
    title: 'City Sounds',
    deck: 'A poem full of sound words',
    hero: {
      photo: 'g4-city-bus.jpg', credit: 'Photo: Mx0268, CC BY 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 280,
      cap: 'A city bus in Ottawa.'
    },
    body: [
      { poem: ['Honk! goes the car.', 'Hiss! goes the bus.', 'Ding! goes the bell', 'when it stops for us.', '',
        'Tap, tap, tap', 'go the shoes on the street.', 'Thump, thump, thump', 'goes the music beat.', '',
        'At night, I lie still', 'in my bed, in the dark.', 'I hear one last <b>bark</b>', 'from a dog in the park.', '',
        'Then the city is <b>hushed</b>.'] }
    ],
    guide: { before: 'Read the poem aloud and have the child make each sound. Teach <b>bark</b> and <b>hushed</b>.',
      after: 'What sounds can you hear right now? Write two sound words.' },
    words: [['bark', 'the sound a dog makes'], ['hushed', 'very quiet']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Which word is a sound word?',
        opts: ['Honk', 'street', 'night'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'What goes “Ding”?',
        opts: ['the car', 'the bell', 'the dog'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'How does the poem change at the end?',
        opts: ['It gets louder.', 'It gets quiet, at night.', 'It moves to a farm.'], a: 1 },
      { k: 'choice', code: 'C3.1', q: 'Which word rhymes with dark?',
        opts: ['park', 'bed', 'bus'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What is one sound you hear where you live?',
        a: 'Example: I hear birds in the morning.', look: 'a real sound, linked to the child’s home' }
    ]
  });

  P.add({
    id: 'g1-pumpkin', subject: 'story', form: 'Short story',
    title: 'The Small Pumpkin',
    deck: 'Nia can pick any pumpkin she wants.',
    hero: {
      art: '<path class="k" d="M0 270 H700"/>' +
        [[150, 214, 70, 52], [330, 236, 34, 28], [520, 218, 64, 48]].map(function (p) {
          var x = p[0], y = p[1], rx = p[2], ry = p[3];
          return '<ellipse class="k" cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '"/><path class="t" d="M' + x + ' ' + (y - ry) + ' Q' + (x - rx / 2) + ' ' + y + ' ' + x + ' ' + (y + ry) + ' M' + x + ' ' + (y - ry) + ' Q' + (x + rx / 2) + ' ' + y + ' ' + x + ' ' + (y + ry) + '"/><path class="a" d="M' + x + ' ' + (y - ry) + ' Q' + (x + 4) + ' ' + (y - ry - 16) + ' ' + (x + 12) + ' ' + (y - ry - 20) + '"/>';
        }).join('') + D.ripple(0, 700, 284, 't'),
      tall: 300,
      cap: 'Pumpkins in a field. One is much smaller than the others.'
    },
    body: [
      'Nia and Dad went to the pumpkin farm. There were big pumpkins everywhere.',
      '“You can pick any one,” said Dad.',
      'Nia looked at a huge pumpkin. It was as big as a tire! She looked at a tall one. Then she picked up a small pumpkin. It fit in her two hands.',
      '“That one?” asked Dad. “Are you sure?”',
      '“Yes,” said Nia. She held it close all the way to the car.',
      'The next day, Nia went to see Grandma. Grandma can not walk well now, and she can not go to the farm.',
      'Nia put the little pumpkin on Grandma’s lap. “I <b>chose</b> one you can hold,” she said.',
      'Grandma smiled and smiled.'
    ],
    guide: { before: 'Look at the drawing and compare the sizes. Ask the child to predict which pumpkin Nia will pick and why. Teach <b>chose</b>.',
      after: 'Nia thought about someone else when she chose. When have you done that?' },
    words: [['chose', 'picked (past of choose)']],
    qs: [
      { k: 'choice', code: 'C2.3', q: 'Before the end, what clue tells you the small pumpkin is for someone?',
        opts: ['She held it close all the way to the car.', 'There were big pumpkins everywhere.', 'It was as big as a tire.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did Nia pick a small pumpkin?',
        opts: ['She could not lift a big one.', 'She wanted Grandma to be able to hold it.', 'Small ones cost less.'], a: 1 },
      { k: 'choice', code: 'C1.5', q: '“It was as big as a tire!” This helps you',
        opts: ['picture how huge the pumpkin was', 'know the pumpkin was round', 'know the car was big'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'How did Grandma feel?',
        opts: ['happy', 'upset', 'tired'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Was Nia’s choice a good one? Tell why.',
        a: 'Yes, because Grandma could hold it and it made her happy.', look: 'an opinion with a reason from the story' }
    ]
  });

  P.add({
    id: 'g1-snowflakes', subject: 'science', form: 'Information text',
    title: 'Six Sides',
    deck: 'Look closely at a snowflake.',
    hero: {
      photo: 'g4-snowflakes.jpg', credit: 'Photo: Wilson Bentley, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 260,
      cap: 'Snowflakes seen up close, long ago, by Wilson Bentley.'
    },
    body: [
      'Snowflakes are made of ice. They form high up in cold clouds.',
      'Catch a snowflake on a dark mitt. Look at it with a <b>magnifying glass</b>. What do you see?',
      { fig: [0, 60, 120, 180, 240, 300].map(function (a) { return '<path class="a" d="M150 75 L' + (150 + 58 * Math.cos(a * Math.PI / 180)).toFixed(1) + ' ' + (75 + 58 * Math.sin(a * Math.PI / 180)).toFixed(1) + '"/>' +
          '<text class="lb" x="' + (150 + 72 * Math.cos(a * Math.PI / 180)).toFixed(1) + '" y="' + (80 + 72 * Math.sin(a * Math.PI / 180)).toFixed(1) + '" text-anchor="middle">' + (a / 60 + 1) + '</text>'; }).join('') +
          '<circle class="k" cx="150" cy="75" r="6"/>',
        tall: 155, cap: 'Count the arms: one, two, three, four, five, six.' },
      'Most snowflakes have six arms or six sides. Count them!',
      'Some snowflakes look like stars. Some look like tiny plates. No two snowflakes are just the same.',
      'When a snowflake lands on your warm hand, it <b>melts</b> fast.'
    ],
    guide: { before: 'Ask what the child knows about snow. On a snowy day, catch flakes on dark cloth. Teach <b>magnifying glass</b> and <b>melts</b>.',
      after: 'If you could make your own snowflake, what would it look like?' },
    words: [['magnifying glass', 'a lens that makes small things look big'], ['melts', 'turns from ice into water']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'How many arms do most snowflakes have?',
        opts: ['four', 'six', 'ten'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'Why are there numbers in the drawing?',
        opts: ['to help you count the arms', 'to tell the date', 'to show the size'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does the text say to use a dark mitt?',
        opts: ['A white snowflake is easy to see on a dark mitt.', 'Dark mitts are warm.', 'Snow likes dark things.'], a: 0 },
      { k: 'choice', code: 'B3.1', q: 'Which sentence tells you to do something?',
        opts: ['Snowflakes are made of ice.', 'Count them!', 'Some look like stars.'], a: 1 },
      { k: 'lines', code: 'C1.1', n: 2, q: 'What happens when a snowflake lands on your warm hand? Why?',
        a: 'It melts, because your hand is warm.', look: 'melts, with the reason (warm hand)' }
    ]
  });

  P.add({
    id: 'g1-wash-hands', subject: 'health', form: 'How-to text',
    title: 'Wash Your Hands',
    deck: 'Soap and water keep germs away.',
    hero: {
      photo: 'g4-hand-washing.jpg', credit: 'Photo: Beat Ruest, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 260,
      cap: 'Hands with soap bubbles under the tap.'
    },
    body: [
      '<b>Germs</b> are too small to see. They can make you sick. Washing your hands gets rid of them.',
      'Wash before you eat. Wash after you use the toilet. Here is how.',
      { fig: '<rect class="k" x="6" y="6" width="288" height="168" rx="8"/>' +
          '<text class="lb" x="22" y="34">1. Wet your hands.</text><text class="lb" x="22" y="62">2. Add soap.</text><text class="lb" x="22" y="90">3. Rub for 20 seconds.</text>' +
          '<text class="n" x="38" y="108">fronts, backs, thumbs, nails</text><text class="lb" x="22" y="136">4. Rinse with water.</text><text class="lb" x="22" y="164">5. Dry with a towel.</text>',
        tall: 180, cap: 'Five steps for clean hands.' },
      'Twenty seconds is a long time! Sing a short song two times while you rub. Then you will know you are done.',
      'Soap <b>bubbles</b> grab the germs. The water washes them down the drain.'
    ],
    guide: { before: 'Ask when the child washes their hands. Act out each step as you read it. Teach <b>bubbles</b>.',
      after: 'Why is it important for everyone, not just you, to wash their hands?' },
    words: [['germs', 'tiny living things that can make you sick'], ['bubbles', 'small round balls of soap and air']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'What kind of text is this?',
        opts: ['a story', 'a how-to text with steps', 'a poem'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'What is step 3?',
        opts: ['Add soap.', 'Rub for 20 seconds.', 'Dry with a towel.'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does the text say to sing a song?',
        opts: ['to know when 20 seconds are done', 'to make the soap smell good', 'to call a friend'], a: 0 },
      { k: 'choice', code: 'C2.2', q: 'Why would you read this text?',
        opts: ['to learn how to do something', 'to laugh at a joke', 'to read about a dog'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 2, q: 'When should you wash your hands? Give two times.',
        a: 'Before I eat and after I use the toilet.', look: 'two times from the text (or another sensible time)' }
    ]
  });

  P.add({
    id: 'g1-lunch-swap', subject: 'story', form: 'Short story',
    title: 'Roti and a Sandwich',
    deck: 'Raj and Ben look at each other’s lunch.',
    hero: {
      photo: 'g5-sandwich.jpg', credit: 'Photo: Revital Salomon, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 270,
      cap: 'A sandwich on a cutting board.'
    },
    body: [
      'Raj opened his lunch box. Inside were warm <b>roti</b> and potatoes. His mom made them that morning.',
      'Ben sat next to him. Ben had a cheese sandwich.',
      'A girl at the next table said, “Raj, your lunch smells funny.”',
      'Raj looked down. His face got hot.',
      'Ben leaned over. “It smells good to me,” he said. “What is it?”',
      '“Roti,” said Raj. “It is a soft, flat bread. You can try some.”',
      'Ben took a bite. “Yum! Want half of my sandwich?”',
      'The next day, the girl asked, “Can I try some roti too?”'
    ],
    guide: { before: 'Ask what foods the child’s family eats that others might not know. Explain that roti is a flat bread eaten in many South Asian and Caribbean homes. Teach <b>roti</b>.',
      after: 'How did Ben help Raj? What would you say to someone whose food is new to you?' },
    words: [['roti', 'a soft, flat, round bread']],
    qs: [
      { k: 'choice', code: 'C3.2', q: '“His face got hot.” Raj felt',
        opts: ['embarrassed', 'sleepy', 'cold'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'What is roti?',
        opts: ['a soup', 'a soft, flat bread', 'a cheese'], a: 1 },
      { k: 'choice', code: 'C3.5', q: 'At the end, how has the girl’s view changed?',
        opts: ['She wants to try roti now.', 'She still thinks it smells funny.', 'She wants Ben’s sandwich.'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'Why does Raj’s lunch matter to him?',
        opts: ['His mom made a food from his family’s culture.', 'It was the biggest lunch.', 'It came from a store.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What would you say to Raj if you sat with him?',
        a: 'Example: Your lunch looks good. Can you tell me about it?', look: 'a kind, curious response' }
    ]
  });

})();
