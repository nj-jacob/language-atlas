/* Grade 7 reading passages, shared by the comprehension chapters (reading.js, texts.js chapter, thinking.js).
   Every passage is written for this site. Each one carries what its questions need, for example:
   facts [question, answer, wrong, wrong, words from the sentence that answers it], ties [the sentence, the tie word, what it refers to, wrong],
   main (right first), details (supporting details of the main idea), conclusion (right first), predict, infer, device.
   The answer checks keep their own answer key (tests/verify/grade7-reading.js), like a second marker. */
(function () {
  'use strict';
  var AP = '’', OQ = '“', CQ = '”';
  Atlas.texts = {
    iceRoad: { title: 'Roads Made of Ice', kind: 'information text', pov: null, pattern: 'cause and effect', purpose: 'to learn facts',
      lines: ['# What they are', 'Each winter, roads are built across frozen lakes and muskeg in northern Ontario. They link many remote First Nations communities to highways and towns.',
        '# Why they matter', 'Trucks use these roads to bring in fuel, food and building supplies. Without them, the goods must come by plane, which costs far more.',
        '# A shorter season', 'Warmer winters mean the ice forms later and melts sooner. As a result, in some years the roads stay open for only a few weeks.'],
      facts: [['What do trucks bring in on the ice roads?', 'fuel, food and building supplies', 'cars and boats', 'mail only', 'bring in fuel'],
        ['How must goods come when there is no ice road?', 'by plane', 'by train', 'by ship', 'come by plane'],
        ['Why is the ice road season getting shorter?', 'Winters are warmer.', 'Trucks are heavier.', 'Fewer people live there.', 'Warmer winters mean']],
      ties: [['They link many remote First Nations communities to highways and towns.', 'They', 'the winter roads', 'the frozen lakes'],
        ['Without them, the goods must come by plane, which costs far more.', 'them', 'the ice roads', 'the trucks'],
        ['As a result, in some years the roads stay open for only a few weeks.', 'As a result', 'the ice forming later and melting sooner', 'trucks bringing fuel']],
      main: ['Winter ice roads link remote communities, but warmer winters are shortening their season.', 'Trucks drive in northern Ontario.', 'Flying costs a lot of money.'],
      details: { right: ['Trucks bring in fuel, food and supplies.', 'The ice now forms later and melts sooner.'], wrong: ['Some people like to fish through the ice.', 'Highways in the south are busy in summer.'] },
      conclusion: ['As winters warm, these communities may pay more to get supplies.', 'Ice roads will be open longer every year.', 'Planes will soon be cheaper than trucks.'] },

    tryout: { title: 'The Tryout', kind: 'story', pov: 'first', purpose: 'to enjoy a story',
      lines: ['I tied my left shoe twice that morning, but the lace kept slipping loose.', 'At the gym, thirty players stretched along the wall. Only twelve would make the team.',
        'Coach Haddad blew the whistle, and we ran the first drill at full speed.', 'On my third sprint, the loose lace whipped against my ankle.',
        'I stumbled, caught myself and kept running, my face burning.', 'Afterward, Coach said, ' + OQ + 'Anyone can run fast. I watch who gets back up.' + CQ],
      facts: [['How many players would make the team?', 'twelve', 'thirty', 'three', 'Only twelve'], ['What hit the narrator' + AP + 's ankle?', 'the loose lace', 'a basketball', 'the gym wall', 'lace whipped']],
      predict: { upTo: 3, right: 'The loose lace will cause trouble.', wrong: ['The narrator will be named captain.', 'The gym will close early.'], clue: 'the lace kept slipping loose', proof: 'lace whipped' },
      foreshadow: { clue: 'the lace kept slipping loose', wrong: ['thirty players stretched along the wall', 'we ran the first drill'] },
      infer: [['How does the narrator feel after stumbling?', 'embarrassed', 'bored', 'my face burning'], ['What does Coach value most?', 'not giving up', 'running fast', 'I watch who gets back up']],
      main: ['A nervous player stumbles at a tryout but keeps running, which is what the coach is looking for.', 'The gym is full of players.', 'The narrator ties a shoe.'],
      theme: ['Getting back up after a mistake matters more than being perfect.', 'Basketball is the hardest sport.', 'Shoes should be tied twice.'] },

    compass: { title: 'Grandfather' + AP + 's Compass', kind: 'story', pov: 'third', purpose: 'to enjoy a story',
      lines: ['When Arjun' + AP + 's grandfather moved into a care home, he gave Arjun his old brass compass.', 'The glass was scratched, but the needle still swung north.',
        'That fall, Arjun started at a new school where he knew no one.', 'Each morning, he held the compass in his pocket before he walked through the doors.',
        'By winter, he had friends, a seat on the bus and a spot on the robotics team.', 'He still carried the compass, though he no longer needed to hold it.'],
      facts: [['Where did Arjun' + AP + 's grandfather move?', 'into a care home', 'to a new city', 'onto a farm', 'moved into a care home'], ['What team did Arjun join?', 'the robotics team', 'the hockey team', 'the debate team', 'robotics team']],
      ties: [['Each morning, he held the compass in his pocket before he walked through the doors.', 'he', 'Arjun', 'his grandfather'],
        ['He still carried the compass, though he no longer needed to hold it.', 'it', 'the compass', 'the bus']],
      symbol: { thing: 'the compass', means: 'his grandfather' + AP + 's support, helping him find his way', wrong: ['the cold weather in fall', 'how far the school was from home'] },
      infer: [['How does Arjun feel when he starts at the new school?', 'nervous', 'proud', 'held the compass'], ['How does Arjun feel by winter?', 'settled and confident', 'lonely', 'no longer needed']],
      theme: ['The people who love us can help us find our way in new places.', 'Old things should be thrown away.', 'Robotics is more fun than sports.'],
      alt: ['We would hear what the grandfather feels about giving the compass away.', 'Nothing would change at all.', 'The story would be about robots.'] },

    goalie: { title: 'Between the Posts', kind: 'story', pov: 'second', purpose: 'to enjoy a story',
      lines: ['You crouch low as the forward races up the ice.', 'Your gloves feel heavy, and the noise of the crowd fades.', 'You watch her eyes, not the puck, and you guess left.',
        'The puck slaps into your glove, and your bench explodes with cheers.'],
      facts: [['What does the goalie watch?', 'the forward' + AP + 's eyes', 'the crowd', 'the clock', 'watch her eyes']],
      style: { effect: 'It puts the reader in the goalie' + AP + 's skates.', wrong: ['It makes the story longer.', 'It hides who the goalie is from the reader.'] } },

    quietRoom: { title: 'Our School Needs a Quiet Room', kind: 'opinion piece', pov: 'first', purpose: 'to be persuaded',
      lines: ['Our school is loud: bells, crowded halls and a cafeteria that echoes.', 'For some students, including students with autism or anxiety, that noise makes it hard to focus or even to stay at school.',
        'A quiet room with soft lights and a few chairs would give anyone a place to reset for ten minutes.', 'Some people worry that students will skip class there. A simple sign-in sheet would solve that.',
        'A quiet room costs little, and it tells every student that they belong here.', 'by Leila, Grade 7'],
      facts: [['What would solve the worry about skipping class?', 'a sign-in sheet', 'locking the room', 'a teacher in the hall', 'sign-in sheet']],
      main: ['A quiet room would help students who struggle with noise, so the school should have one.', 'The cafeteria echoes.', 'Bells ring at school.'],
      ties: [['A simple sign-in sheet would solve that.', 'that', 'the worry that students will skip class', 'the noise in the cafeteria']],
      details: { right: ['Noise makes it hard for some students to focus.', 'A sign-in sheet would stop students from skipping class.'], wrong: ['The writer is in Grade 7.', 'Some schools have large libraries.'] },
      conclusion: ['The writer believes a small change can make a school more welcoming.', 'The writer wants the school to be louder.', 'The writer thinks most students skip class.'],
      view: { position: 'The school should open a quiet room.', other: 'Students might skip class in the room.', wrong: ['The school should get louder bells.', 'The cafeteria should close.'] },
      topic: 'accessibility and inclusion' },

    river: { title: 'The Wall on the River', kind: 'fable', pov: 'third', purpose: 'to enjoy a story',
      lines: ['Two villages shared one river. The upper village built a wall to keep the water for its own fields.', 'Soon the wells in the lower village ran dry, and its people stopped trading seed with the upper village.',
        'When a drought came, the upper village had water but no new seed, and its fields failed anyway.', 'The next spring, both villages pulled down the wall together.'],
      facts: [['What did the upper village build?', 'a wall across the river', 'a new well', 'a bridge', 'built a wall']],
      allegory: ['Sharing resources helps everyone; taking all of them hurts everyone in the end.', 'Rivers are dangerous in spring.', 'Walls are hard to build.'] },

    thaw: { title: 'Thaw', kind: 'poem', pov: 'first', purpose: 'to enjoy a poem',
      lines: ['Drip. Drip. The icicles tick like clocks.', 'The creek wakes, cracks, and clears its throat.', 'Mud grabs my boots. Spring is slow, then sudden.'],
      style: { effect: 'They make the thaw sound alive, like the creek is waking up.', wrong: ['They show the poem is about a city.', 'They explain how ice is made.'] } }
  };
  /* the passage on a card, the way questions show it */
  Atlas.texts.show = function (t, upTo) { return Atlas.W.passage(t.title, upTo ? t.lines.slice(0, upTo) : t.lines); };
  Atlas.texts.list = function (need) { return Object.keys(Atlas.texts).filter(function (k) { return Atlas.texts[k].lines && Atlas.texts[k][need]; }).map(function (k) { return Atlas.texts[k]; }); };
})();
