/* Grade 3 reading passages for the tool box (assets/engine/library.js). Written for this site.
   Stories, poems, letters, an interview and information texts, 150 to 280 words, with 3 choices in each circle-one question.
   Some have line numbers, as reading tests do. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;

  P.add({
    id: 'g3-kite-day', subject: 'story', form: 'Personal narrative', lines: true,
    title: 'The Day the Kite Flew',
    deck: 'It took three tries and a lot of running.',
    hero: {
      photo: 'g3-kite.jpg', credit: 'Photo: Rafsan Rasin, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'A kite high in the sky.'
    },
    body: [
      'Last spring, my dad and I built a kite. We used two thin sticks, a green garbage bag and a whole roll of tape. I drew a big eye on it with a marker, so it could watch the town from the sky.',
      'On Saturday, we took it to the hill behind the arena. The wind was strong and <b>gusty</b>. My hair kept blowing into my mouth.',
      'On the first try, I ran as fast as I could. The kite bounced along the grass behind me like a tired puppy. It never left the ground.',
      'On the second try, it rose up for a moment. Then it twirled around and crashed nose first into a bush. I wanted to give up. I sat down on the cold grass and crossed my arms.',
      '“Every kite crashes a few times,” Dad said. “Let’s add a longer tail. It will help it stay steady.” We tore a strip off the bag and taped it on.',
      'On the third try, Dad held the kite up high. I ran into the wind. Suddenly the string went tight and began <b>tugging</b> at my hands. I looked back. The kite was climbing, higher and higher, until the eye I had drawn was just a tiny dot.',
      'We stayed until our noses were red. I did not want to go home. That night, I put the kite at the end of my bed, so I would see it as soon as I woke up.'
    ],
    guide: { before: 'Ask if the child has flown a kite. Point out the line numbers and practise finding line 10. Teach <b>gusty</b> and <b>tugging</b>.',
      after: 'The writer wanted to give up. What made them keep going? When has that happened to you?' },
    words: [['gusty', 'blowing in strong, sudden bursts'], ['tugging', 'pulling hard, again and again']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'Who is telling this story?',
        opts: ['the dad', 'a child who flew the kite', 'someone watching from far away'], a: 1 },
      { k: 'choice', code: 'B2.4', half: true, q: 'The string began “tugging” ({line:tugging}). Tugging means',
        opts: ['pulling', 'breaking', 'shining'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The kite “bounced along the grass behind me like a tired puppy” ({line:puppy}). This comparison shows that the kite',
        opts: ['flew very high', 'dragged along the ground and did not fly', 'ran away'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'The writer “crossed my arms” ({line:crossed}). This shows the writer felt',
        opts: ['proud', 'frustrated', 'sleepy'], a: 1 },
      { k: 'choice', code: 'C1.1', q: 'What helped the kite fly on the third try?',
        opts: ['a longer tail', 'a bigger eye', 'less wind'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number these events in order.',
        items: ['They built the kite.', 'The kite crashed into a bush.', 'Dad and the writer added a longer tail.', 'The kite climbed high in the sky.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did the writer put the kite at the end of the bed? What does this tell you?',
        a: 'To see it first thing in the morning. It shows the writer is proud of the kite and loved the day.', look: 'the reason and an inference about feelings' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What is the most important thing the writer learned? Use a detail from the story.',
        a: 'Do not give up after a mistake. The kite crashed twice, but it flew on the third try after they fixed it.', look: 'a lesson linked to a detail (two crashes, longer tail, third try)' }
    ]
  });

  P.add({
    id: 'g3-before-sunrise', subject: 'social', form: 'Information story',
    title: 'Before the Sun Comes Up',
    deck: 'Marco’s mom drives a recycling truck.',
    hero: {
      photo: 'g3-garbage-truck.jpg', credit: 'Photo: Dllu, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'A side-loading truck picks up bins with a robot arm.'
    },
    body: [
      'Most people in Marco’s town are still asleep when his mom goes to work. Her alarm rings at 4:30 in the morning. She drives a recycling truck.',
      'Every day, she follows the same route. A <b>route</b> is the list of streets she must visit, in order. On Mondays, it is the north side of town. On Tuesdays, it is the south side.',
      'Her truck has a long arm, like a robot. She does not have to get out at every house. She pushes a lever, and the arm reaches out, grabs a blue bin and tips it into the truck. Then it puts the bin back down, gently, where it found it.',
      { fig: '<rect class="k" x="40" y="40" width="160" height="70" rx="4"/><rect class="k" x="200" y="64" width="60" height="46" rx="4"/><circle class="k" cx="80" cy="116" r="12"/><circle class="k" cx="230" cy="116" r="12"/>' +
          '<path class="a" d="M60 40 L40 14 L16 30"/><rect class="k" x="4" y="30" width="24" height="34" rx="2"/>' + D.arrow(44, 22, 70, 44, 'd') +
          D.label(110, 24, 'arm lifts the bin', 40, 14) + D.label(96, 82, 'recycling goes in here') + D.label(206, 56, 'driver', 230, 80),
        tall: 135, cap: 'How the truck’s arm empties a bin.' },
      'Some mornings are hard. In January, the bins freeze to the ground. In April, rain blows sideways. But Marco’s mom says the hardest part is bins that are put out too late.',
      '“If the bin is not at the <b>curb</b> by seven, I can not go back for it,” she says. “I have 900 homes to get to.”',
      'Marco used to think recycling just disappeared. Now he puts his family’s bin out the night before. Sometimes he even leaves a thank-you note taped to the lid.'
    ],
    guide: { before: 'Ask who picks up recycling where you live and when. Look at the diagram first. Teach <b>route</b> and <b>curb</b>.',
      after: 'Many people do jobs we do not see. Who else works early or late to help your town?' },
    words: [['route', 'the set path someone follows'], ['curb', 'the edge of the street, by the sidewalk']],
    qs: [
      { k: 'choice', code: 'B2.4', q: 'In this text, a route is',
        opts: ['a list of streets to visit in order', 'a kind of truck', 'a blue bin'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'What does the diagram help you understand?',
        opts: ['how the arm lifts and empties a bin', 'where Marco lives', 'what time the alarm rings'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does Marco’s mom say late bins are the hardest part?',
        opts: ['She has too many homes to go back for one.', 'Late bins are heavy.', 'She does not like recycling.'], a: 0 },
      { k: 'choice', code: 'C2.6', q: 'What is the main idea of this text?',
        opts: ['A recycling truck driver works hard to keep the town clean.', 'Trucks have arms.', 'January is cold.'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'How has Marco’s view of recycling changed?',
        opts: ['He now sees the work it takes and helps out.', 'He thinks it is a waste of time.', 'He wants to drive a truck tomorrow.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Marco leave a thank-you note? What does it show about him?',
        a: 'He wants his mom and the other drivers to know their work matters. It shows he is thankful and thoughtful.', look: 'the reason and a trait (thankful, thoughtful)' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'What is one job that helps your community? How does it help?',
        a: 'Example: Crossing guards help children cross the street safely.', look: 'a real job and how it helps' }
    ]
  });

  P.add({
    id: 'g3-one-of-those-mornings', subject: 'story', form: 'Poem', lines: true,
    title: 'One of Those Mornings',
    deck: 'A poem in four verses about a day that starts all wrong',
    hero: {
      photo: 'g7-alarm-clock.jpg', credit: 'Photo: Santeri Viinamäki, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An alarm clock.'
    },
    body: [
      { poem: ['<b>1</b>', 'My alarm forgot to ring,', 'my sock forgot its twin,', 'my toast jumped from the toaster', 'and landed jam side in.', '',
        '<b>2</b>', 'My brother took the last of', 'the cereal I like best.', 'My shoelace snapped. My zipper stuck.', 'I gave up on the rest.', '',
        '<b>3</b>', 'The bus pulled off without me,', 'a yellow <b>blur</b> of noise.', 'I felt my whole day <b>shrinking</b>,', 'and with it all my joys.', '',
        '<b>4</b>', 'Then Dad said, “I can drive you,”', 'and we sang the whole way there,', 'and the sun came out from nowhere', 'and a robin filled the air.'] }
    ],
    guide: { before: 'Read the poem aloud with expression. Show how the verses are numbered, like on a test. Teach <b>shrinking</b>.',
      after: 'What turned the speaker’s day around? What helps you when a morning goes wrong?' },
    words: [['shrinking', 'getting smaller'], ['blur', 'something moving so fast you can not see it clearly']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'The poem is mostly about',
        opts: ['a morning when everything goes wrong, until it gets better', 'how to make toast', 'a trip to the beach'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“My sock forgot its twin.” The poet writes as if the sock',
        opts: ['were a person who could forget', 'were very old', 'were a twin baby'], a: 0 },
      { k: 'choice', code: 'B2.4', q: 'In verse 3, the speaker feels the day is “shrinking.” Shrinking means',
        opts: ['getting smaller and worse', 'getting warmer', 'getting longer'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'In which verse does the mood change?',
        opts: ['verse 2', 'verse 3', 'verse 4'], a: 2 },
      { k: 'choice', code: 'B3.3', q: 'Why are there quotation marks in verse 4?',
        opts: ['to show the words Dad said', 'to show a title', 'to show a question'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Find two problems from verses 1 and 2. Why do you think the poet lists so many?',
        a: 'The alarm did not ring and the shoelace snapped. Listing so many shows how everything kept going wrong, one thing after another.', look: 'two problems from the poem and the effect of the list' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Tell about one of your “those mornings.” What made it better?',
        a: 'Example: I spilled my milk and was late, but my friend saved me a seat on the bus.', look: 'a personal connection with something that helped' }
    ]
  });

  P.add({
    id: 'g3-hand-signals', subject: 'health', form: 'Information text',
    title: 'Talk with Your Hands',
    deck: 'Cyclists use signals to stay safe on the road.',
    hero: {
      photo: 'g4-bike-helmet.jpg', credit: 'Photo: Aaron Montoya, U.S. Air Force, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 210,
      cap: 'A grown-up checks that a child’s helmet fits.'
    },
    body: [
      'A car has lights that blink when it is going to turn. A bike has no lights like that. So <b>cyclists</b> use their arms to tell drivers what they will do. These are called <b>hand signals</b>.',
      'Hand signals only work if drivers can see them, and if you give them early. Signal before you turn, not while you are turning. Then put both hands back on the handlebars.',
      { fig: [0, 1, 2].map(function (i) {
            var x = 10 + i * 98;
            return '<rect class="k" x="' + x + '" y="6" width="88" height="112" rx="6"/><text class="lb" x="' + (x + 8) + '" y="22">' + (i + 1) + '</text>' +
              '<circle class="k" cx="' + (x + 44) + '" cy="38" r="8"/><path class="k" d="M' + (x + 44) + ' 46 V84 M' + (x + 44) + ' 84 L' + (x + 34) + ' 108 M' + (x + 44) + ' 84 L' + (x + 54) + ' 108"/>';
          }).join('') +
          '<path class="a" d="M54 56 H14"/><path class="a" d="M152 56 H172 V34"/><path class="a" d="M250 56 H266 V76"/>' +
          '<text class="n" x="54" y="134" text-anchor="middle">left turn</text><text class="n" x="152" y="134" text-anchor="middle">right turn</text><text class="n" x="250" y="134" text-anchor="middle">stop</text>',
        tall: 140, cap: 'Three hand signals, seen from behind the cyclist. The arm is the left arm.' },
      { h: 'Three signals to know' },
      'To turn left, stretch your left arm straight out to the side. To turn right, hold your left arm out and bend it up at the elbow, like an L. You may also point your right arm straight out. To stop or slow down, hold your left arm out and bend it down.',
      'Before you ride, check your helmet. It should sit level on your head, two fingers above your eyebrows. The straps should make a V under each ear.',
      { box: 'Remember', text: 'Look behind you before you signal. A signal tells drivers what you will do, but it does not make it safe. Only go when the way is clear.' }
    ],
    guide: { before: 'Stand up and practise each signal together. Look at the numbered panels first. Teach <b>hand signals</b> and <b>cyclists</b>.',
      after: 'Why does a signal not make a turn safe by itself? What else must a cyclist do?' },
    words: [['hand signals', 'arm movements that show what a cyclist will do'], ['cyclists', 'people riding bikes']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'Why do cyclists need hand signals?',
        opts: ['Bikes do not have turn lights like cars.', 'It is good exercise.', 'It is a game.'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at panel 3. What is the cyclist doing?',
        opts: ['turning left', 'turning right', 'stopping or slowing down'], a: 2 },
      { k: 'choice', code: 'C1.3', q: 'Why does the text use a heading, “Three signals to know”?',
        opts: ['to show that the next part explains the signals', 'to start a story', 'to name the author'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why should you signal before you turn, not while turning?',
        opts: ['You need both hands to steer while turning.', 'Drivers can not see you while turning.', 'It is faster.'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Where should a helmet sit?',
        opts: ['level, two fingers above the eyebrows', 'pushed back on the head', 'over the eyes'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'What is the safest thing to do before you signal?',
        opts: ['Look behind you.', 'Ride faster.', 'Close your eyes.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Explain the left-turn signal in your own words, so a younger child could do it.',
        a: 'Hold your left arm straight out to the side, so drivers know you will go left.', look: 'a clear, correct explanation in own words' },
      { k: 'lines', code: 'C2.7', n: 2, q: 'What helped you understand the signals more: the words or the pictures? Why?',
        a: 'Example: The pictures, because I could see exactly where the arm goes.', look: 'names a strategy or feature and why it helped' }
    ]
  });

  P.add({
    id: 'g3-vet-visit', subject: 'science', form: 'Information story',
    title: 'Pumpkin Goes to the Vet',
    deck: 'Our cat’s yearly check-up did not go as planned.',
    hero: {
      photo: 'g3-cat-vet.jpg', credit: 'Photo: Veterinarian Pet Alliance, CC BY 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'A veterinarian listens to an orange cat’s heart.'
    },
    body: [
      'Our cat, Pumpkin, is orange, fluffy and very smart. She knows exactly what her carrier means. The moment I took it out of the closet, she vanished under my bed.',
      'It took two of us and a can of tuna to get her out. By the time we arrived at the clinic, Pumpkin was <b>yowling</b> like a fire alarm.',
      'Dr. Okonkwo is a <b>veterinarian</b>, a doctor for animals. She opened the carrier and waited. She did not grab Pumpkin. She let her sniff her hand first.',
      { h: 'What happens at a check-up' },
      'First, Dr. Okonkwo weighed Pumpkin on a small scale. Pumpkin weighs 5 kg, which is healthy for a cat her size. Next, she listened to Pumpkin’s heart and lungs with a stethoscope. Then she looked in her ears, eyes and mouth. She even checked her teeth for tartar.',
      { fig: '<rect class="k" x="10" y="6" width="280" height="132" rx="6"/><text class="lb" x="24" y="28">Check-up list</text>' +
          ['weight: 5 kg', 'heart and lungs', 'ears, eyes and mouth', 'teeth', 'needle (vaccine)'].map(function (t, i) { return '<rect class="k" x="24" y="' + (40 + i * 19) + '" width="12" height="12"/><path class="a" d="M26 ' + (46 + i * 19) + ' l3 4 l6 -8"/><text class="l" x="46" y="' + (50 + i * 19) + '">' + t + '</text>'; }).join(''),
        tall: 145, cap: 'The vet’s list for Pumpkin, all checked.' },
      'At the end, Pumpkin got a needle to keep her from getting sick. She did not even notice, because she was busy licking a treat off a tube.',
      'When we got home, I opened the carrier. Pumpkin strolled out, flicked her tail at me and walked straight back under my bed. I think she was letting me know who was really in charge.'
    ],
    guide: { before: 'Ask whether the child has a pet or has been to a vet. Teach <b>veterinarian</b> (clap its 5 syllables) and <b>yowling</b>.',
      after: 'How did Dr. Okonkwo help Pumpkin feel calm? Could those ideas help a person who is nervous too?' },
    words: [['veterinarian', 'a doctor for animals'], ['yowling', 'crying loudly, the way an upset cat does']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Why did Pumpkin hide under the bed?',
        opts: ['She knew the carrier meant a trip to the vet.', 'She was cold.', 'She wanted tuna.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Pumpkin was “yowling like a fire alarm.” This comparison tells you she was',
        opts: ['very loud', 'very hot', 'very quiet'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'What did Dr. Okonkwo do first at the check-up?',
        opts: ['listened to her heart', 'weighed her', 'gave her a needle'], a: 1 },
      { k: 'choice', code: 'B2.3', q: 'Veterinarian, librarian and Canadian all end in -ian. In these words, -ian means',
        opts: ['a person who is or does something', 'more than one', 'in the past'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'The ending is funny because',
        opts: ['Pumpkin acts like she is the boss of the family', 'Pumpkin falls asleep', 'the vet comes home with them'], a: 0 },
      { k: 'choice', code: 'C1.2', q: 'This text tells a true-to-life story and also',
        opts: ['gives facts about what happens at a check-up', 'is a poem', 'is a list of rules'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Name three things the vet checked, in order.',
        a: 'She weighed Pumpkin, then listened to her heart and lungs, then looked in her ears, eyes and mouth.', look: 'three checks from the text, in the right order' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did Dr. Okonkwo let Pumpkin sniff her hand first?',
        a: 'To help Pumpkin feel safe and calm, so she would not be scared of a stranger.', look: 'an inference about calming the cat' }
    ]
  });

  P.add({
    id: 'g3-what-the-snow-keeps', subject: 'story', form: 'Free verse poem', lines: true,
    title: 'What the Snow Keeps',
    deck: 'A poem about the morning after a snowfall',
    hero: {
      photo: 'g3-snow-tracks.jpg', credit: 'Photo: Peter Cooper Jr., CC0, Wikimedia Commons', focus: '50% 60%',
      tall: 190,
      cap: 'Animal tracks in fresh snow on a forest trail.'
    },
    body: [
      { poem: ['Last night, while I slept,', 'the snow came down', 'like a clean page.', '',
        'This morning, it is full of writing.', '',
        'Small stitches by the fence:', 'a mouse, hurrying.', 'Two long feet, two small feet,', 'over and over:', 'a rabbit, in no hurry at all.', '',
        'A line of neat holes', 'pressed in a perfect row.', 'Mom says a fox walks like that,', 'each back paw in its front paw’s print.', '',
        'And by the bird feeder,', 'one wide brushing,', 'the <b>print</b> of two wings,', 'and nothing else.', '',
        'I do not know who flew away', 'or who stayed hungry.', 'The snow will not tell me.', 'It only keeps the <b>clues</b>.'] }
    ],
    guide: { before: 'Explain that free verse is a poem that does not rhyme. Read it aloud slowly. Teach <b>clues</b> and <b>print</b>.',
      after: 'What do you think happened by the bird feeder? Tell the story in your own words.' },
    words: [['clues', 'signs that help you work something out'], ['print', 'a mark pressed into something']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'How is this poem different from many poems?',
        opts: ['It does not rhyme.', 'It has no lines.', 'It is a list of facts.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The snow is “a clean page” ({line:clean}). This metaphor means the snow',
        opts: ['was smooth with no marks yet', 'was made of paper', 'was dirty'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'What is the “writing” in the snow?',
        opts: ['animal tracks', 'a note from Mom', 'letters drawn with a stick'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'By the bird feeder ({line:feeder}), the speaker sees wing prints and nothing else. What most likely happened?',
        opts: ['A large bird swooped down and flew away, maybe with a small animal.', 'A rabbit hopped by.', 'Nothing happened.'], a: 0 },
      { k: 'choice', code: 'B2.4', q: 'The rabbit is “in no hurry at all.” This means it was',
        opts: ['moving slowly', 'running fast', 'asleep'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What does the speaker mostly feel?',
        opts: ['curious about what happened in the night', 'angry about the snow', 'bored'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What does “The snow will not tell me. / It only keeps the clues” mean?',
        a: 'The snow shows tracks, but not the whole story. The speaker has to guess what happened from the clues.', look: 'an explanation that the tracks are evidence, not the full answer' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which line was easiest to picture in your mind? Draw or describe it.',
        a: 'Example: “Small stitches by the fence.” I could see tiny mouse tracks like sewing.', look: 'a line and a clear description of what was visualized' }
    ]
  });

  P.add({
    id: 'g3-three-sisters', subject: 'science', form: 'Information text',
    title: 'The Three Sisters',
    deck: 'Corn, beans and squash grow best together.',
    hero: {
      photo: 'g4-three-sisters.jpg', credit: 'Photo: U.S. National Park Service, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A Three Sisters garden of corn, beans and squash.'
    },
    body: [
      'For hundreds of years, the Haudenosaunee and other First Nations people have planted corn, beans and squash together. They call these plants the <b>Three Sisters</b>. Each sister helps the others grow.',
      { fig: '<path class="k" d="M20 120 Q150 90 280 120"/><path class="a" d="M150 104 V20"/><path class="t" d="M150 70 L130 54 M150 56 L170 40 M150 84 L172 70"/>' +
          '<path class="k" d="M150 98 C140 86 160 76 150 64 C140 52 160 44 150 30"/>' +
          '<ellipse class="h" cx="76" cy="112" rx="34" ry="12"/><ellipse class="h" cx="226" cy="112" rx="34" ry="12"/>' +
          D.label(186, 18, 'corn: tall stalk', 152, 24) + D.label(186, 60, 'beans climb the corn', 156, 60) + D.label(4, 82, 'squash leaves', 70, 104) + '<text class="n" x="150" y="138" text-anchor="middle">one mound</text>',
        tall: 145, cap: 'The Three Sisters in one mound of soil.' },
      'The corn grows tall and straight. Its stalk is like a pole for the beans to climb. Corn needs lots of sun, so it is planted first, in the middle of a small mound of soil.',
      'The bean vines wind up the corn. Beans also put something good into the soil, called <b>nitrogen</b>, which feeds the corn and squash. That is why the beans are planted a little later, once the corn is up.',
      'The squash grows low, with huge, prickly leaves. The leaves shade the ground, so it stays damp and weeds can not grow. The prickles keep hungry animals away.',
      'Together, these three foods make a healthy meal. In many Haudenosaunee stories, the Three Sisters are honoured as gifts that keep the people strong.',
      'Today, many school and family gardens in Ontario grow the Three Sisters. It is a way of farming that people are still learning from.'
    ],
    guide: { before: 'Explain that the Haudenosaunee are First Nations peoples whose lands include parts of what is now Ontario and Quebec. Look at the diagram first. Teach <b>Three Sisters</b> and <b>nitrogen</b>.',
      after: 'How are the Three Sisters like a team? What is your job in a team you belong to?' },
    words: [['Three Sisters', 'corn, beans and squash planted together'], ['nitrogen', 'something in soil that helps plants grow']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. What do the beans climb?',
        opts: ['the corn', 'the squash', 'a fence'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'How do squash leaves help the garden?',
        opts: ['They shade the ground and stop weeds.', 'They climb the corn.', 'They make the corn taller.'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'The text explains each sister in its own paragraph. This pattern helps you',
        opts: ['see how each plant helps', 'learn a poem', 'follow a recipe'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'Why are the plants called sisters?',
        opts: ['They are like a family that helps one another.', 'They are all the same plant.', 'They are planted by sisters.'], a: 0 },
      { k: 'choice', code: 'C2.6', q: 'What is the main idea?',
        opts: ['Corn, beans and squash help each other grow when planted together.', 'Squash is prickly.', 'Corn is tall.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in how each sister helps.',
        cols: ['Sister', 'How it helps'], rows: [['Corn', null], ['Beans', null], ['Squash', null]],
        a: [[null, 'a tall pole for beans to climb'], [null, 'puts nitrogen in the soil to feed the others'], [null, 'shades the soil, stops weeds, keeps animals away']] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'The text says people are “still learning from” this way of farming. What can we learn from it?',
        a: 'That plants (and people) can do better when they help each other, and that First Nations farmers knew this long ago.', look: 'an idea about cooperation or Indigenous knowledge, with a detail' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Have you seen a garden like this, or eaten corn, beans or squash? Tell about it.',
        a: 'Example: My grandma grows squash, and we make soup with it in the fall.', look: 'a personal connection to the text' }
    ]
  });

  P.add({
    id: 'g3-tallest-tower', subject: 'story', form: 'Short story',
    title: 'The Tallest Tower',
    deck: 'Sofia wants to win the block contest on her own.',
    hero: {
      art: '<path class="k" d="M0 280 H700"/>' + [0, 1, 2, 3, 4, 5, 6].map(function (i) { return '<rect class="k" x="' + (120 + (i % 2) * 10) + '" y="' + (250 - i * 32) + '" width="70" height="30" rx="2"/>'; }).join('') +
        [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return '<rect class="' + (i % 3 ? 'k' : 'h') + '" x="' + (470 + (i % 2 ? 0 : 20)) + '" y="' + (250 - i * 28) + '" width="' + (i % 2 ? 100 : 60) + '" height="26" rx="2"/>'; }).join(''),
      tall: 280,
      cap: 'Two block towers: a narrow one that wobbles, and one with a wide base.'
    },
    body: [
      'Every Friday, Room 9 had a block contest. This week, the job was to build the tallest tower that could stand on its own for ten seconds.',
      '“I can do it by myself,” said Sofia. She did not want a partner. Partners always wanted to do things their way.',
      'She stacked the blocks one on top of the other, as fast as she could. Her tower grew taller and taller. Then it began to <b>sway</b>. With a crash, it fell across the rug.',
      'Next to her, Ethan and Priya were building slowly. They had made a wide, flat base first. Their tower was shorter than hers had been, but it stood still.',
      'Sofia tried again. Crash. And again. Crash. Her cheeks felt hot.',
      'Ethan looked over. “Want to join us?” he asked. “We need someone who builds fast.”',
      'Sofia almost said no. Then she looked at her pile of blocks. “Okay,” she said.',
      'Priya kept the base strong. Ethan checked that every block was straight. Sofia brought blocks, quick as a squirrel. Their tower grew higher than any tower in the room. The class counted: one, two, three ... ten. It did not even <b>wobble</b>.',
      'Sofia grinned. Maybe a partner was not such a bad idea after all.'
    ],
    guide: { before: 'Ask: do you like working alone or with a partner? Why? Look at the two towers in the drawing and predict which is stronger. Teach <b>sway</b> and <b>wobble</b>.',
      after: 'What did each person bring to the team? What do you bring to a team?' },
    words: [['sway', 'move slowly from side to side'], ['wobble', 'shake as if about to fall']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Why did Sofia want to work alone at first?',
        opts: ['She thought partners always wanted their own way.', 'She was new.', 'She did not like blocks.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did Sofia’s first towers fall?',
        opts: ['She built too fast with no wide base.', 'Ethan pushed them.', 'The blocks were broken.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Sofia brought blocks “quick as a squirrel.” This is a simile that shows she was',
        opts: ['fast', 'hungry', 'small'], a: 0 },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is a question?',
        opts: ['“I can do it by myself,” said Sofia.', '“Want to join us?” he asked.', 'Sofia grinned.'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'What is the main lesson of the story?',
        opts: ['Working together can do more than working alone.', 'Fast is always best.', 'Towers are hard to build.'], a: 0 },
      { k: 'choice', code: 'C2.3', q: 'Look at the drawing. Which tower is more like Ethan and Priya’s?',
        opts: ['the one with a wide base', 'the narrow one', 'neither'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How did Sofia change from the beginning to the end? Use a detail from each part.',
        a: 'At first she said she could do it by herself. At the end she joined Ethan and Priya and grinned, because teamwork worked.', look: 'a start detail, an end detail, and the change' },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Do you like to work alone or with a partner? Explain why.',
        a: 'Example: With a partner, because we can share ideas and fix mistakes faster.', look: 'a preference with a reason' }
    ]
  });

  P.add({
    id: 'g3-monarch-trip', subject: 'science', form: 'Information text',
    title: 'The Long Flight South',
    deck: 'Monarch butterflies fly from Ontario to Mexico.',
    hero: {
      photo: 'g4-monarchs.jpg', credit: 'Photo: U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'Monarch butterflies rest together on a branch during their trip south.'
    },
    body: [
      'Every fall, millions of monarch butterflies leave Canada and fly south. Some of them start in Ontario and fly all the way to the mountains of Mexico. That is a trip of more than 3000 kilometres!',
      'A long trip like this, made by animals each year, is called a <b>migration</b>.',
      { fig: '<path class="k" d="M60 20 Q110 30 150 24 Q200 18 240 30"/><path class="k" d="M110 150 Q150 170 190 156"/>' +
          '<path class="d" d="M150 34 Q130 90 150 150"/>' + D.arrow(140, 120, 150, 150, 'a') +
          '<circle class="a" cx="150" cy="34" r="5"/><circle class="a" cx="150" cy="154" r="5"/>' +
          '<text class="lb" x="160" y="50">Ontario</text><text class="lb" x="160" y="172">Mexico</text><text class="n" x="20" y="94">more than 3000 km</text><text class="n" x="200" y="104">flies south in fall</text>',
        tall: 180, cap: 'The monarchs’ trip from Ontario to Mexico.' },
      'Monarchs fly in the daytime, riding warm winds. At night, they rest together in trees. Hundreds of butterflies may cover one branch, like orange leaves.',
      'In Mexico, they spend the winter in tall fir forests, high in the mountains. It is cool there, but not freezing.',
      'In spring, they start back north. But no single butterfly makes the whole trip home. They lay eggs on <b>milkweed</b> plants along the way. Their children and grandchildren finish the journey.',
      'Monarchs need milkweed, because it is the only plant their caterpillars eat. Planting milkweed in your garden, or asking your school to plant some, is one of the best ways to help them.'
    ],
    guide: { before: 'Find Ontario and Mexico on a map or globe and trace the route. Teach <b>migration</b> and <b>milkweed</b>.',
      after: 'Why is it amazing that the great-grandchildren find their way back? What questions do you still have?' },
    words: [['migration', 'a long trip some animals make each year'], ['milkweed', 'a plant that monarch caterpillars eat']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the map. In which direction do monarchs fly in the fall?',
        opts: ['north', 'south', 'east'], a: 1 },
      { k: 'choice', code: 'C1.1', q: 'How far is the trip from Ontario to Mexico?',
        opts: ['more than 3000 km', 'about 30 km', 'about 300 m'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Butterflies cover a branch “like orange leaves.” This helps you picture',
        opts: ['how many butterflies there are', 'what they eat', 'how they sleep in Mexico'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why do the monarchs go to Mexico for winter?',
        opts: ['It is cool but not freezing there.', 'There is milkweed there.', 'They like mountains.'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Who finishes the trip back north in spring?',
        opts: ['the same butterflies', 'their children and grandchildren', 'other insects'], a: 1 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Write a sentence that tells the main idea of this text.',
        a: 'Monarch butterflies make a long migration from Canada to Mexico and back, over many generations.', look: 'one sentence with the main idea, not a small detail' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'How could you or your class help monarchs? Use a fact from the text.',
        a: 'We could plant milkweed, because it is the only plant their caterpillars eat.', look: 'an action linked to the milkweed fact' }
    ]
  });

  P.add({
    id: 'g3-pond-book', subject: 'science', form: 'Table of contents',
    title: 'Life in a Pond',
    deck: 'The opening page and table of contents of a field guide',
    hero: {
      photo: 'g5-marsh.jpg', credit: 'Photo: Matt MacGillivray, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'Cattails at the edge of Second Marsh in Oshawa, Ontario. You can read about cattails on page 4.'
    },
    body: [
      'A pond looks quiet from the shore. But under the water and along the edges, it is busy with life. This book will help you find and name the plants and animals you see in a pond in Ontario.',
      'Each chapter covers one group of living things. Use the table of contents to find the chapter you need. If you know the exact name of a living thing, look it up in the <b>index</b> at the back of the book. If you meet a word you do not know, check the <b>glossary</b>. It explains the special words that scientists use.',
      { fig: '<text class="lb" x="10" y="18">Contents</text><path class="k" d="M10 26 H290"/>' +
          [['1', 'Plants at the edge', '4'], ['2', 'Tiny animals', '9'], ['3', 'Frogs and toads', '14'], ['4', 'Turtles', '20'], ['5', 'Birds near the pond', '26'], ['6', 'Keeping ponds healthy', '31'], ['', 'Glossary', '36'], ['', 'Index', '38']].map(function (r, i) {
            var y = 48 + i * 22;
            return '<text class="l" x="10" y="' + y + '">' + r[0] + '</text><text class="l" x="30" y="' + y + '">' + r[1] + '</text><path class="d" d="M' + (40 + r[1].length * 6.4) + ' ' + (y - 4) + ' H262"/><text class="l" x="290" y="' + y + '" text-anchor="end">' + r[2] + '</text>';
          }).join(''),
        tall: 222, cap: 'The table of contents.' },
      'Remember to be gentle. Look closely, take notes, and leave every animal where you found it. A pond is a home, not a store. If you lift a rock to look under it, put it back the way it was. Stay on the path, so you do not crush plants at the edge. And always bring a grown-up, because ponds can be deeper than they look.'
    ],
    guide: { before: 'Bring a real non-fiction book. Find its table of contents, glossary and index together. Teach <b>index</b> and <b>glossary</b>.',
      after: 'When would you use the table of contents, and when would you use the index?' },
    words: [['index', 'an ABC list at the back of a book, with page numbers'], ['glossary', 'a small dictionary at the back of a book']],
    qs: [
      { k: 'choice', code: 'C1.3', q: 'On what page does the chapter about turtles start?',
        opts: ['14', '20', '26'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'You want to read about a dragonfly nymph, a tiny animal. Which chapter should you look in?',
        opts: ['Chapter 2', 'Chapter 4', 'Chapter 6'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'You want to know what the word “tadpole” means. Where should you look?',
        opts: ['the glossary', 'Chapter 5', 'page 4'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'Which pages are about frogs and toads?',
        opts: ['pages 9 to 13', 'pages 14 to 19', 'pages 20 to 25'], a: 1 },
      { k: 'choice', code: 'C2.2', q: 'Why would someone read this book?',
        opts: ['to find and name living things in a pond', 'to learn to swim', 'to read a funny story'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'The writer says “A pond is a home, not a store.” The writer wants readers to',
        opts: ['leave animals where they find them', 'buy pond animals', 'build a pond'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Chapter 6 is called “Keeping ponds healthy.” Predict two things it might tell you.',
        a: 'Example: Do not throw garbage in ponds. Keep soap and chemicals away from the water.', look: 'two sensible predictions linked to the chapter title' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'The writer says a pond is “a home, not a store.” What does the writer mean?',
        a: 'Animals live in the pond, so we should not take them away like things from a store.', look: 'explains the comparison: living home vs taking things' }
    ]
  });
  P.add({
    id: 'g3-plough-interview', subject: 'social', form: 'Interview', plain: true,
    title: 'Clearing the Streets',
    deck: 'Jayden interviews a snowplough driver.',
    hero: {
      photo: 'g6-snow-removal.jpg', credit: 'Photo: Miguel Angel Omaña Rojas, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Snow removal on a city street in Montréal.'
    },
    body: [
      '<i>For a class project on community helpers, Jayden interviewed Ms. Bernier, who drives a snowplough in Sudbury.</i>',
      '<b class="ps-who">Jayden:</b> When do you start work after a big storm?',
      '<b class="ps-who">Ms. Bernier:</b> Sometimes at two in the morning. We try to clear the main roads before people drive to work. Ambulances and fire trucks need those roads most of all.',
      '<b class="ps-who">Jayden:</b> Which streets do you <b>plough</b> first?',
      '<b class="ps-who">Ms. Bernier:</b> Big, busy roads come first. Then bus routes. Quiet side streets, like yours, come last. I know that is hard when you are waiting!',
      '<b class="ps-who">Jayden:</b> What is the hardest part of your job?',
      '<b class="ps-who">Ms. Bernier:</b> Cars parked on the street. I can not plough around them, so the street stays snowy. And sometimes kids build snow forts in the <b>snowbank</b>. I always watch for them. Please never play in a snowbank near the road.',
      '<b class="ps-who">Jayden:</b> What is the best part?',
      '<b class="ps-who">Ms. Bernier:</b> Early in the morning, everything is quiet and white. Some people wave from their windows with a cup of coffee. That makes my whole night.',
      { fig: '<rect class="k" x="10" y="10" width="280" height="110" rx="6"/>' +
          '<text class="lb" x="24" y="34">Which roads are ploughed first?</text>' +
          '<text class="l" x="24" y="58">1. Main roads (ambulances, fire trucks)</text><text class="l" x="24" y="80">2. Bus routes</text><text class="l" x="24" y="102">3. Quiet side streets</text>',
        tall: 128, cap: 'The order the city follows after a storm.' }
    ],
    guide: { before: 'Ask who clears the snow on your street. Show how an interview shows each speaker’s name. Teach <b>plough</b> (Canadian spelling) and <b>snowbank</b>.',
      after: 'If you could ask Ms. Bernier one more question, what would it be?' },
    words: [['plough', 'to push snow off a road with a big blade'], ['snowbank', 'a high pile of snow at the side of a road']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'How can you tell this text is an interview?',
        opts: ['It shows questions and answers with names.', 'It rhymes.', 'It has steps with numbers.'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the chart. What gets ploughed second?',
        opts: ['main roads', 'bus routes', 'side streets'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why are main roads ploughed first?',
        opts: ['Ambulances and fire trucks need them most.', 'They are the shortest.', 'Ms. Bernier lives there.'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'Which of these is an opinion, not a fact?',
        opts: ['“Big, busy roads come first.”', '“That makes my whole night.”', '“I can not plough around them.”'], a: 1 },
      { k: 'choice', code: 'B2.4', q: '“That makes my whole night” means',
        opts: ['it makes her very happy', 'it makes the night longer', 'it wakes her up'], a: 0 },
      { k: 'choice', code: 'C2.2', q: 'What was Jayden mainly trying to find out?',
        opts: ['what a snowplough driver’s job is like', 'how to build a fort', 'how snow is made'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Ms. Bernier say never to play in a snowbank near the road?',
        a: 'Her plough might not see a child in the snowbank, and the child could get hurt.', look: 'the safety reason, inferred from “I always watch for them”' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How could your family make Ms. Bernier’s job easier? Use a detail from the interview.',
        a: 'We could park in the driveway, not on the street, so she can plough the whole road.', look: 'an action linked to a problem she named' }
    ]
  });

  P.add({
    id: 'g3-lighthouse-night', subject: 'story', form: 'Historical story', lines: true,
    title: 'The Light on the Rock',
    deck: 'One stormy night in 1890, Annie keeps the lamp burning.',
    hero: {
      photo: 'g4-lighthouse.jpg', credit: 'Photo: Michel Rathwell, CC BY 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'A lighthouse on the rocks of Nova Scotia.'
    },
    body: [
      'In 1890, Annie lived in a lighthouse on a rocky point in Nova Scotia. Her father was the <b>keeper</b>. Every night, he climbed the narrow stairs to light the big oil lamp at the top. Its beam swept across the dark water, warning ships away from the rocks.',
      'One October evening, a storm blew in. Rain drummed on the windows. Waves smashed against the rocks and threw white spray into the air.',
      'That night, Father came down the stairs with his hand wrapped in a cloth. He had burned it on the lamp. “The <b>wick</b> must be trimmed every few hours,” he said, “or the light will smoke and fade.”',
      'Annie had watched him trim the wick a hundred times. “I can do it,” she said.',
      'Father looked at her for a long moment. Then he nodded.',
      'All night, Annie climbed the cold, winding stairs. She cut the burnt edge off the wick, polished the glass, and added oil. Her legs ached. Her eyes were heavy. But each time, the light blazed bright again.',
      'Near dawn, she saw something through the rain: the lights of a fishing boat, turning away from the rocks just in time.',
      'In the morning, the captain rowed to shore. He shook Father’s good hand. Then he turned to Annie. “I hear it was you who kept the <b>beam</b> burning,” he said. “Twelve men are going home to their families today.”'
    ],
    guide: { before: 'Explain what a lighthouse is for and that, long ago, a family lived in it and lit an oil lamp by hand. Teach <b>keeper</b>, <b>wick</b> and <b>beam</b>.',
      after: 'Annie was trusted with an important job. Tell about a time someone trusted you with something important.' },
    words: [['keeper', 'the person who looks after a lighthouse'], ['wick', 'the string in a lamp that burns'], ['beam', 'a long line of light']],
    qs: [
      { k: 'choice', code: 'C1.1', half: true, q: 'When does the story take place?',
        opts: ['in 1890', 'today', 'in the future'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did Annie have to trim the wick?',
        opts: ['Father had burned his hand.', 'Father was away.', 'The lamp was broken.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“Rain drummed on the windows” ({line:drummed}). This helps you',
        opts: ['hear how hard the rain was falling', 'see a drum', 'feel how warm it was'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Father “looked at her for a long moment” ({line:moment}). He was most likely',
        opts: ['deciding if she could do the job safely', 'angry at her', 'too tired to talk'], a: 0 },
      { k: 'choice', code: 'B2.4', q: 'The light “blazed” bright ({line:blazed}). Blazed means',
        opts: ['burned brightly', 'went out', 'turned blue'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Which sentence best tells what the story is mostly about?',
        opts: ['A girl keeps a lighthouse lamp burning in a storm and saves a boat.', 'A captain goes fishing.', 'A father hurts his hand.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What kind of person is Annie? Give two clues from the story.',
        a: 'She is brave and responsible. She offered to do the job and climbed the stairs all night even though she was tired.', look: 'a trait and two supporting clues' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'Imagine the captain told this story. What would he say about the night?',
        a: 'Example: We were lost in the storm. Then we saw the lighthouse beam and turned away from the rocks just in time.', look: 'retells from the captain’s point of view, using “I” or “we”' }
    ]
  });

  P.add({
    id: 'g3-garden-poster', subject: 'social', form: 'Poster', plain: true,
    title: 'Community Garden Day',
    deck: 'A poster on the library notice board',
    hero: {
      photo: 'g4-school-garden.jpg', credit: 'Photo: Libby Kokes, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Raised garden beds, ready for planting.'
    },
    body: [
      { h: 'Help Us Grow!' },
      'The Maple Street Community Garden needs you! Come and help us get the garden ready for spring. No <b>experience</b> is needed. We will show you everything. Children are welcome when they come with a grown-up. The garden has wide paths, so it is easy to get around with a wheelchair or a stroller.',
      { h: 'When and where' },
      'Saturday, May 16, from 9:00 a.m. to noon, at the garden beside the Maple Street Library.',
      { h: 'Please bring' },
      'gloves, a water bottle, a hat, and a friend!',
      { h: 'What we will do' },
      'fill the <b>raised beds</b> with fresh soil, plant beans, lettuce and sunflowers, and paint new signs for each bed.',
      { fig: '<path class="k" d="M10 20 H290 M10 120 H290 M150 20 V120"/><rect class="h" x="40" y="44" width="70" height="52"/><rect class="k" x="190" y="40" width="80" height="60"/>' +
          '<text class="lb" x="75" y="38" text-anchor="middle">Garden</text><text class="lb" x="230" y="36" text-anchor="middle">Library</text>' +
          '<text class="l" x="150" y="140" text-anchor="middle">Maple Street</text><text class="n" x="230" y="74" text-anchor="middle">front door</text>',
        tall: 150, cap: 'Where to find the garden.' },
      { box: 'Free!', text: 'Snacks and juice for all helpers. Every family who helps can take home a tomato plant. Rain or shine!' },
      'Last year, our garden grew more than 200 kg of vegetables. We shared them with the food bank on Elm Street. This year, we hope to grow even more!',
      'Questions? Ask at the library desk.'
    ],
    guide: { before: 'Look at real posters in your neighbourhood and talk about why they use headings and short lists. Teach <b>experience</b> and <b>raised beds</b>.',
      after: 'Make a quick poster for an event at your home or school. What headings will you use?' },
    words: [['experience', 'having done something before'], ['raised beds', 'garden boxes built up above the ground']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'Who most likely put up this poster?',
        opts: ['the people who run the community garden', 'a sports team', 'a school bus driver'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'Why does the poster use headings such as “When and where”?',
        opts: ['so readers can find each piece of information quickly', 'to tell a story', 'to make the poster rhyme'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the map. Where is the garden?',
        opts: ['beside the library', 'behind the school', 'across town'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'Why does the poster say “No experience is needed”?',
        opts: ['so everyone feels welcome to come', 'because gardening is boring', 'to keep people away'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Which is written correctly?',
        opts: ['saturday, may 16', 'Saturday, May 16', 'Saturday, may 16'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'What does “Rain or shine!” tell readers?',
        opts: ['The event will happen even if it rains.', 'It will be sunny.', 'Bring an umbrella to sell.'], a: 0 },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Name two things a helper should bring, and tell why each one is useful.',
        a: 'Gloves, to keep hands clean in the soil. A water bottle, so they do not get thirsty.', look: 'two items from the poster, each with a sensible reason' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Would this poster make you want to go? Explain why or why not.',
        a: 'Example: Yes, because it sounds friendly and I would get to plant sunflowers and take home a tomato plant.', look: 'an opinion with a reason linked to the poster' }
    ]
  });

  P.add({
    id: 'g3-inuksuk', subject: 'social', form: 'Information text',
    title: 'Stone Messengers',
    deck: 'Inuksuit have helped people in the Arctic for a very long time.',
    hero: {
      photo: 'g4-inuksuit.jpg', credit: 'Photo: Ansgar Walk, CC BY-SA 2.5, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'Inuksuit on the Foxe Peninsula, Nunavut.'
    },
    body: [
      'In the Arctic, the land can look the same for many kilometres: flat, rocky and white with snow. For thousands of years, Inuit have built stone figures to help people find their way. One is called an <b>inuksuk</b>. More than one are called inuksuit.',
      'The word inuksuk comes from Inuktitut, the language of many Inuit. It means “to act in the capacity of a human.” In other words, an inuksuk stands in for a person.',
      { fig: '<path class="k" d="M10 140 H290"/><rect class="k" x="112" y="104" width="22" height="36"/><rect class="k" x="166" y="104" width="22" height="36"/><rect class="h" x="100" y="80" width="100" height="24"/>' +
          '<rect class="k" x="126" y="54" width="48" height="26"/><rect class="k" x="70" y="40" width="160" height="14"/><rect class="k" x="134" y="16" width="32" height="24"/>' +
          D.label(230, 30, 'head', 166, 26) + D.label(236, 60, 'arms', 226, 48) + D.label(4, 92, 'body', 104, 92) + D.label(4, 130, 'legs', 114, 124),
        tall: 150, cap: 'One shape of inuksuk, which looks like a person.' },
      'Inuksuit have many jobs. Some point the way to a good fishing place or a safe crossing. Some mark a place where food is stored. Some show the way home.',
      'Not every inuksuk looks like a person. Many are a simple pile of stones. Each one was built for a reason, and people who know the land can read its meaning.',
      'Today, the inuksuk is on the flag of Nunavut. Visitors sometimes build small ones for fun, but Inuit <b>Elders</b> ask people not to knock down old ones or build fake ones on the land, because a traveller could be led the wrong way.'
    ],
    guide: { before: 'Find Nunavut on a map of Canada. Explain that Inuit are the Indigenous people of the Arctic. Teach <b>inuksuk</b> and <b>Elders</b>.',
      after: 'Why could a fake inuksuk be dangerous? What signs help you find your way where you live?' },
    words: [['inuksuk', 'a stone figure built by Inuit, often as a guide'], ['Elders', 'respected older people who share knowledge']],
    qs: [
      { k: 'choice', code: 'C1.1', q: 'Why did Inuit build inuksuit?',
        opts: ['to help people find their way and mark places', 'to decorate their homes', 'to play a game'], a: 0 },
      { k: 'choice', code: 'B2.3', q: 'Inuksuk means one. Which word means more than one?',
        opts: ['inuksuit', 'Inuktitut', 'Inuit'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'In the diagram, what is the long, flat stone near the top?',
        opts: ['the arms', 'the legs', 'the head'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'What does it mean that an inuksuk “stands in for a person”?',
        opts: ['It does a job a person could do, like show the way.', 'It is a statue of a famous person.', 'It can walk.'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'What do Inuit Elders ask visitors to do?',
        opts: ['Not knock down old inuksuit or build fake ones.', 'Build as many as they can.', 'Paint them.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might the land “look the same for many kilometres” make inuksuit so important?',
        a: 'With no trees or buildings to guide you, it is easy to get lost. An inuksuk gives a landmark to follow.', look: 'links flat, same-looking land to needing a landmark' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Write the main idea of this text in one or two sentences.',
        a: 'Inuit build inuksuit as stone guides on the land, and they should be treated with respect.', look: 'main idea (guides, many jobs, respect), not a small detail' }
    ]
  });

  P.add({
    id: 'g3-wrong-bus', subject: 'story', form: 'Short story', lines: true,
    title: 'The Wrong Bus',
    deck: 'Jamal looks up and does not know where he is.',
    hero: {
      photo: 'g4-city-bus.jpg', credit: 'Photo: Mx0268, CC BY 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'A city bus in Ottawa.'
    },
    body: [
      'Jamal took the Number 7 bus home from his swimming lesson every Wednesday. He always sat in the third seat on the left and watched for the red mailbox on Elm Street. That was his stop.',
      'This Wednesday, he was reading his new comic. When he looked up, there was no red mailbox. There was a river he had never seen. His stomach dropped.',
      'He looked at the sign above the driver. It said Number 17. He had been in such a hurry that he had not checked the number.',
      'Jamal wanted to cry. Instead, he took a deep breath and remembered what Mom always said: “If you are lost, find a helper.”',
      'He walked to the front. “Excuse me,” he said to the driver. “I think I took the wrong bus. I need to get to Elm Street.”',
      'The driver nodded <b>calmly</b>, as if this happened every day. “No problem. Get off at the next stop and wait under the <b>shelter</b>. The Number 7 comes in ten minutes. Tell that driver you need Elm Street.”',
      'Jamal did exactly that. He also borrowed the driver’s phone to call his mom, who had started to worry.',
      'When he finally saw the red mailbox, he felt like cheering. That night, he wrote a big 7 on the inside cover of his comic. Next time, he would check before he climbed on.'
    ],
    guide: { before: 'Talk about what to do if you are lost (find a helper such as a bus driver, a store clerk or a parent with children). Teach <b>shelter</b>.',
      after: 'What smart choices did Jamal make? Make a family plan for what to do if you get lost.' },
    words: [['shelter', 'a small covered place to wait out of the weather'], ['calmly', 'in a quiet, relaxed way']],
    qs: [
      { k: 'choice', code: 'C3.2', q: '“His stomach dropped” ({line:stomach}). This tells you Jamal suddenly felt',
        opts: ['afraid', 'hungry', 'sleepy'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why did Jamal get on the wrong bus?',
        opts: ['He did not check the number.', 'The driver told him to.', 'The Number 7 was late.'], a: 0 },
      { k: 'choice', code: 'B2.3', q: 'The driver nodded “calmly.” The ending -ly tells you the word describes',
        opts: ['how the driver nodded', 'where the driver was', 'when the bus came'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What did Jamal do right after he took a deep breath?',
        opts: ['He remembered his mom’s advice.', 'He got off the bus.', 'He called his mom.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did Jamal write a 7 on his comic?',
        opts: ['to remind himself to check the bus number', 'because 7 is his favourite number', 'to start a new comic'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What is the main lesson of the story?',
        opts: ['Stay calm and ask a helper when you are lost.', 'Never read on the bus.', 'Buses are confusing.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Name two smart choices Jamal made to solve his problem.',
        a: 'He asked the driver for help, and he called his mom so she would not worry.', look: 'two problem-solving actions from the story' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Has something like this ever happened to you or someone you know? What did you do?',
        a: 'Example: I lost my dad at the store. I went to the cashier and she called him on the speaker.', look: 'a real connection with an action taken' }
    ]
  });

  P.add({
    id: 'g3-hockey-poem', subject: 'story', form: 'Poem',
    title: 'Saturday Hockey',
    deck: 'A poem about an early game at the arena',
    hero: {
      photo: 'g6-youth-hockey.jpg', credit: 'Photo: Christophe95, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 210,
      cap: 'Young players race for the puck.'
    },
    body: [
      { poem: ['Six o’clock on Saturday,', 'the arena smells of cold,', 'of popcorn from last evening', 'and rubber mats and mould.', '',
        'I lace my skates too tightly,', 'my fingers stiff and slow.', 'The <b>Zamboni</b> leaves a mirror', 'and then it’s time to go.', '',
        'Scrape, scrape, swish! I’m flying.', 'The puck is on my stick.', 'I see a gap, I take my shot ...', 'it bounces off a brick?', '',
        'No, off the goalie’s pad, of course,', 'and back out to my <b>wing</b>.', 'She tips it in! The bench erupts.', 'Our parents stand and sing.', '',
        'We lose, eleven to three that day.', 'I barely even care.', 'The best part was the pass I made', 'and the cold, bright morning air.'] }
    ],
    guide: { before: 'Ask what the child knows about hockey or another team sport. Read the poem aloud, enjoying the sound words. Teach <b>Zamboni</b> and <b>wing</b>.',
      after: 'The team lost, but the speaker does not mind. Why? What is your favourite part of a game, win or lose?' },
    words: [['Zamboni', 'a machine that smooths the ice'], ['wing', 'a player who plays along the side']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Which words are onomatopoeia (sound words)?',
        opts: ['Scrape, scrape, swish!', 'Six o’clock', 'cold, bright morning'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The Zamboni “leaves a mirror.” This is a metaphor that means the ice is',
        opts: ['smooth and shiny', 'broken', 'covered in snow'], a: 0 },
      { k: 'choice', code: 'C1.5', q: 'Why does the speaker ask, “it bounces off a brick?”',
        opts: ['to show they were confused for a second, which is funny', 'because the arena is made of brick', 'to start a new verse'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Who scored the goal?',
        opts: ['the speaker', 'the speaker’s wing', 'the goalie'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'How does the speaker feel about losing?',
        opts: ['They do not mind much.', 'They are very angry.', 'They want to quit.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Which word rhymes with stick?',
        opts: ['brick', 'slow', 'shot'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the speaker say the best part was the pass? What does this show about them?',
        a: 'Their pass helped a teammate score. It shows they care about the team more than about winning.', look: 'an inference about valuing teamwork' },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Which line helps you picture the arena best? Write it and tell what you see.',
        a: 'Example: “the arena smells of cold.” I picture a chilly rink early in the morning.', look: 'a line from the poem and what it helps them picture or sense' }
    ]
  });

  P.add({
    id: 'g3-rain-gauge', subject: 'science', form: 'Procedure',
    title: 'Make a Rain Gauge',
    deck: 'Measure how much rain falls in a week.',
    hero: {
      art: '<path class="k" d="M0 280 H700"/><path class="k" d="M300 80 V260 Q300 276 316 276 H384 Q400 276 400 260 V80"/><path class="k" d="M276 80 H424 L380 112 H320 Z"/>' +
        D.ripple(304, 396, 220, 'a') + [0, 1, 2, 3, 4, 5].map(function (i) { return '<path class="t" d="M400 ' + (260 - i * 30) + ' h14"/><text class="n" x="420" y="' + (264 - i * 30) + '">' + i + ' cm</text>'; }).join('') +
        [120, 180, 520, 590, 650].map(function (x, i) { return '<path class="t" d="M' + x + ' ' + (40 + i * 26) + ' l-6 18"/>'; }).join(''),
      tall: 290,
      cap: 'A homemade rain gauge: a bottle with a ruler marked on the side.'
    },
    body: [
      'Weather scientists measure rain with a tool called a <b>rain gauge</b>. You can make your own and keep track of the rain for a week.',
      { h: 'Materials' },
      'a clear plastic bottle with straight sides, scissors, a ruler, a permanent marker, tape and a few small stones.',
      { h: 'Steps' },
      '1. Ask a grown-up to cut the top off the bottle, about two thirds of the way up.',
      '2. Put the stones in the bottom. They keep the bottle from tipping over. Pour in water until it just covers the stones. This is your zero line.',
      '3. Tape the ruler to the outside, with 0 at the water line. Mark each centimetre with the marker.',
      '4. Turn the cut-off top upside down and set it in the bottle, like a funnel.',
      '5. Put your gauge outside in an open space, away from trees and roofs.',
      '6. Check it at the same time every day. Write down how high the water is. Then pour it out down to the zero line.',
      { box: 'Why a funnel?', text: 'The funnel catches rain and keeps leaves out. It also slows down <b>evaporation</b>, which is water drying up into the air.' },
      { fig: '<path class="k" d="M40 130 H290 M40 10 V130"/>' + [['M', 1], ['T', 0], ['W', 3], ['T', 2], ['F', 0]].map(function (d, i) { return '<rect class="h" x="' + (60 + i * 46) + '" y="' + (130 - d[1] * 30) + '" width="28" height="' + (d[1] * 30) + '"/><text class="l" x="' + (74 + i * 46) + '" y="146" text-anchor="middle">' + d[0] + '</text>'; }).join('') +
          [0, 1, 2, 3].map(function (v) { return '<text class="n" x="34" y="' + (134 - v * 30) + '" text-anchor="end">' + v + '</text>'; }).join(''),
        tall: 150, cap: 'Our rain, in cm, Monday to Friday.' }
    ],
    guide: { before: 'Gather the materials. Explain that a procedure lists materials, then numbered steps. Teach <b>rain gauge</b> and <b>evaporation</b>.',
      after: 'Why must the gauge be away from trees and roofs? What could go wrong otherwise?' },
    words: [['rain gauge', 'a tool that measures how much rain falls'], ['evaporation', 'water drying up into the air']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'What kind of text is this?',
        opts: ['a procedure that tells how to make something', 'a story', 'a letter'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'Why are the steps numbered?',
        opts: ['so you do them in the right order', 'to count the stones', 'to show the days'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why should the gauge be away from trees and roofs?',
        opts: ['They could block rain or drip extra water into it.', 'Trees are too tall.', 'Roofs are hot.'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the graph. On which day did the most rain fall?',
        opts: ['Monday', 'Wednesday', 'Friday'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'How much rain fell in all from Monday to Friday?',
        opts: ['3 cm', '6 cm', '9 cm'], a: 1 },
      { k: 'choice', code: 'B2.4', q: 'In step 4, the top acts “like a funnel.” A funnel',
        opts: ['guides liquid into a small opening', 'measures length', 'keeps things warm'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you pour the water out to the zero line every day?',
        a: 'So each day starts fresh and you measure only that day’s rain.', look: 'understands each reading is one day, starting from zero' },
      { k: 'lines', code: 'C2.7', n: 2, q: 'What did you do to understand the steps? (For example: reread, look at the picture, picture it in your mind.)',
        a: 'Example: I looked at the drawing at the top to see how the funnel fits in the bottle.', look: 'names a strategy and how it helped' }
    ]
  });

  P.add({
    id: 'g3-crosswalk-letter', subject: 'social', form: 'Persuasive letter', plain: true,
    title: 'A Letter to the Mayor',
    deck: 'Room 14 asks for a safer way to cross the street.',
    hero: {
      photo: 'g3-crossing-guard.jpg', credit: 'Photo: Austin Transportation and Public Works, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 190,
      cap: 'A crossing guard holds up a stop sign at a crosswalk near a school.'
    },
    body: [
      '<span style="float:right">March 3, 2026</span>',
      'Dear Mayor Thompson,',
      'We are the students in Room 14 at Hillcrest Public School. We are writing to ask for a <b>crosswalk</b> on Lakeview Road, in front of our school.',
      'First, Lakeview Road is very busy. In the morning, we counted 112 cars in just 20 minutes. Many of them were going fast.',
      'Second, there is no safe place to cross. The nearest traffic light is 400 metres away. Most students do not walk that far, so they run across between cars.',
      { fig: '<path class="k" d="M10 40 H290 M10 100 H290"/><path class="d" d="M10 70 H290"/>' +
          '<rect class="k" x="100" y="110" width="100" height="40"/><text class="lb" x="150" y="134" text-anchor="middle">school</text>' +
          '<circle class="a" cx="270" cy="30" r="6"/><text class="n" x="270" y="20" text-anchor="middle">light</text>' +
          D.arrow(150, 108, 150, 46, 'a') + '<text class="n" x="160" y="86">where we want a crosswalk</text><text class="n" x="200" y="64">400 m</text>' +
          '<text class="l" x="20" y="60">Lakeview Road</text>',
        tall: 155, cap: 'Our school and the nearest light.' },
      'Third, a crosswalk with a crossing guard would help everyone, not just students. Families with strollers and older people in our neighbourhood need to cross too.',
      'We hope these reasons <b>persuade</b> you. We think a crosswalk is the best way to keep people safe. We hope you will come and see Lakeview Road for yourself. You are welcome to visit our class.',
      'Sincerely,',
      'The students of Room 14'
    ],
    guide: { before: 'Explain that a persuasive letter tries to convince someone, using reasons and facts. Teach <b>crosswalk</b> and <b>persuade</b>.',
      after: 'Which reason do you think will persuade the mayor most? What is something you would write to a mayor about?' },
    words: [['crosswalk', 'a marked place on a road for people to cross'], ['persuade', 'to get someone to agree with you']],
    qs: [
      { k: 'choice', code: 'C2.2', q: 'What is the main purpose of this letter?',
        opts: ['to persuade the mayor to add a crosswalk', 'to thank the mayor', 'to tell a funny story'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'Why do the paragraphs start with First, Second and Third?',
        opts: ['to show each new reason in order', 'to count the cars', 'to show the date'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'Which is a fact, not an opinion?',
        opts: ['“We counted 112 cars in just 20 minutes.”', '“A crosswalk is the best way.”', '“We hope you will come.”'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'What does the map show?',
        opts: ['how far the light is from the school', 'how fast the cars go', 'who the mayor is'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Which closing is written correctly?',
        opts: ['Sincerely,', 'sincerely', 'Sincerely.'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'Why do the students say the crosswalk would help families with strollers and older people?',
        opts: ['to show it would help the whole community', 'because they have strollers', 'to make the letter longer'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think the students invited the mayor to visit?',
        a: 'If the mayor sees the busy road and children running across, the mayor will understand the problem better.', look: 'an inference about seeing the problem firsthand' },
      { k: 'lines', code: 'D1.1', n: 3, q: 'Write a good closing sentence that the students could add before “Sincerely.”',
        a: 'Example: Please help us cross Lakeview Road safely every day.', look: 'a sentence that sums up the request politely' }
    ]
  });

  P.add({
    id: 'g3-squirrel-fable', subject: 'story', form: 'Fable',
    title: 'The Squirrel Who Counted',
    deck: 'Red Squirrel had more than enough. Was it enough?',
    hero: {
      photo: 'g4-red-squirrel.jpg', credit: 'Photo: Rhododendrites, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'A red squirrel eating a mushroom.'
    },
    body: [
      'All fall, Red Squirrel gathered food. Pine cones, acorns, seeds and dried mushrooms filled every hollow of her tree. Each evening she counted them: “One hundred and twelve, one hundred and thirteen ...”',
      'The other animals were busy too. Chickadee stored seeds in cracks of bark. Rabbit nibbled the last green clover. Mouse lined her nest with soft grass.',
      'Then winter came early. A deep snow fell overnight and buried everything.',
      'In the morning, Chickadee could not find her seeds. Rabbit could not find a single leaf. They came to Red Squirrel’s tree, shivering.',
      '“Please,” said Chickadee, “could you <b>spare</b> a few seeds?”',
      'Red Squirrel looked at her <b>hoard</b>. She had counted every piece. “If I share,” she thought, “I will have less.” She shook her head and went inside.',
      'That night, the wind howled. Red Squirrel lay awake. Her stores were full, but the tree felt very empty. She could hear the others shivering below.',
      'In the morning, she climbed down with her cheeks full of seeds and a pine cone in her paws. “I counted wrong,” she said. “I have more than I need.”',
      'That winter, the animals took turns keeping watch and sharing what they found. In spring, Red Squirrel gathered food again. But she stopped counting. There was a <b>better</b> way to measure what she had.'
    ],
    guide: { before: 'Remind the child that a fable has animal characters and a lesson. Teach <b>hoard</b> and <b>spare</b>.',
      after: 'What did Red Squirrel mean by “a better way to measure what she had”?' },
    words: [['hoard', 'a big store of things, saved and hidden'], ['spare', 'give away something you can do without']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'How do you know this story is a fable?',
        opts: ['The animals talk and there is a lesson.', 'It has facts about squirrels.', 'It is a list.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did Red Squirrel say no at first?',
        opts: ['She was afraid of having less.', 'She had no food.', 'She did not hear them.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: '“Her stores were full, but the tree felt very empty.” This means she',
        opts: ['felt lonely and sorry, even with lots of food', 'had lost her food', 'had moved'], a: 0 },
      { k: 'choice', code: 'B2.4', q: '“Could you spare a few seeds?” Spare means',
        opts: ['give some that you do not need', 'count', 'hide'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'When Red Squirrel says “I counted wrong,” she really means',
        opts: ['she has decided to share', 'she made a math mistake', 'she lost some seeds'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What is the main lesson of the fable?',
        opts: ['Sharing is worth more than having the most.', 'Always count your food.', 'Winter comes early.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What was the “better way” for Red Squirrel to measure what she had?',
        a: 'By her friends and the sharing they did together, not by how much food she owned.', look: 'an inference: friendship or sharing, not number of things' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Do you think Red Squirrel did the right thing in the end? Explain.',
        a: 'Yes. She had more than she needed, and sharing kept her friends alive and made her happier.', look: 'an opinion with a reason from the story' }
    ]
  });

  P.add({
    id: 'g3-spring-peepers', subject: 'science', form: 'Information text',
    title: 'The Loudest Little Frog',
    deck: 'Spring peepers are tiny, but you can hear them from far away.',
    hero: {
      photo: 'g4-spring-peeper.jpg', credit: 'Photo: U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A spring peeper calling, its throat puffed out like a balloon.'
    },
    body: [
      'On warm evenings in April, the ponds and wetlands of Ontario fill with a high, bright sound: peep, peep, peep! It sounds like hundreds of tiny bells. It is the call of the spring peeper.',
      'A spring peeper is a small tree frog. It is about as long as a paper clip. It is brown or tan, with a dark X on its back.',
      'Only the males call. Each one puffs up the thin skin under its chin like a bubble, then lets the air out to make its peep. The bubble makes the sound louder. On a quiet night, a big group can be heard more than a kilometre away.',
      { fig: '<path class="k" d="M40 130 H290 M40 10 V130"/>' + [['Mar', 10], ['Apr', 90], ['May', 70], ['Jun', 20], ['Jul', 0]].map(function (d, i) { return '<rect class="h" x="' + (56 + i * 46) + '" y="' + (130 - d[1]) + '" width="28" height="' + d[1] + '"/><text class="l" x="' + (70 + i * 46) + '" y="146" text-anchor="middle">' + d[0] + '</text>'; }).join('') +
          '<text class="n" x="34" y="44" text-anchor="end">many</text><text class="n" x="34" y="130" text-anchor="end">few</text>',
        tall: 150, cap: 'How many peepers call each month.' },
      'Why do they call? To find a mate. The females follow the sound to the pond, where they lay their eggs in the water.',
      'In winter, spring peepers hide under logs and leaves. Their bodies can partly <b>freeze</b>, and they still wake up in spring. Scientists call this an <b>adaptation</b>.'
    ],
    guide: { before: 'If you can, play a recording of spring peepers. Look at the graph and find the loudest month. Teach <b>adaptation</b>.',
      after: 'Spring peepers can partly freeze and survive. What other animal adaptations for winter do you know?' },
    words: [['adaptation', 'a body part or action that helps a living thing survive'], ['freeze', 'turn to ice']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'The call “sounds like hundreds of tiny bells.” This simile helps you',
        opts: ['hear what the call is like', 'see the colour of the frog', 'know where it lives'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'About how long is a spring peeper?',
        opts: ['as long as a paper clip', 'as long as a ruler', 'as long as a pencil'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the graph. In which month do the most peepers call?',
        opts: ['March', 'April', 'June'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does the bubble under the frog’s chin matter?',
        opts: ['It makes the call louder.', 'It keeps the frog warm.', 'It holds food.'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why do male spring peepers call?',
        opts: ['to find a mate', 'to scare birds', 'to wake up other frogs'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Which sentence would be the best closing for this text?',
        opts: ['So the next time you hear peep, peep, peep, you will know who is singing.', 'I like dogs.', 'Frogs are green.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Write two facts about how spring peepers survive the winter.',
        a: 'They hide under logs and leaves. Their bodies can partly freeze and still wake up in spring.', look: 'two facts from the last paragraph' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why do you think spring peepers lay their eggs in a pond, not on land?',
        a: 'The tadpoles that hatch need water to swim and grow.', look: 'links eggs or tadpoles to needing water' }
    ]
  });

})();
