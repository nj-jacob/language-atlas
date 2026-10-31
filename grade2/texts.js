/* Grade 2 reading passages, shared by the two comprehension chapters (reading.js and thinking.js).
   Every passage is written for this site. Short sentences and everyday words, for Grade 2 readers.
   Each one carries what its questions need: facts ([question, answer, two wrong answers, words from the sentence that answers it]),
   events in order, the main idea, the narrator, feelings to infer with the words that show them, and a prediction with its clue.
   The answer checks keep their own answer key (tests/verify/grade2-reading.js), like a second marker. */
(function () {
  'use strict';
  var AP = '’', OQ = '“', CQ = '”';
  Atlas.texts = {
    kite: { title: 'Kai' + AP + 's Kite', kind: 'story', pov: 'third', purpose: 'to enjoy a story',
      lines: ['Kai ran across the field with his new kite.', 'The wind lifted it high into the sky.', 'Then the string slipped out of his hand!',
        'The kite landed in the top of a tall pine tree.', 'Kai' + AP + 's grandpa got a long rake from the shed.', 'He tugged the kite down, and Kai hugged it.'],
      facts: [['Where did the kite land?', 'in a tall pine tree', 'on the roof', 'in the pond', 'tall pine tree'], ['Who helped Kai?', 'his grandpa', 'his sister', 'a teacher', 'grandpa got a long rake'],
        ['What did Grandpa use?', 'a long rake', 'a ladder', 'a rope', 'a long rake']],
      order: ['ran across the field', 'string slipped out', 'landed in the top', 'got a long rake', 'tugged the kite down'],
      main: ['Kai' + AP + 's kite gets stuck in a tree, and his grandpa helps get it down.', 'Pine trees are tall.', 'Kai has a grandpa.'],
      infer: [['How does Kai feel at the end?', 'happy', 'angry', 'Kai hugged it'], ['How does Kai feel when the string slips?', 'worried', 'sleepy', 'slipped out of his hand!']],
      predict: { upTo: 4, right: 'Someone will help Kai get the kite down.', wrong: ['Kai will fly to the moon.', 'The tree will fall over.'], clue: 'landed in the top of a tall pine tree' } },
    beans: { title: 'My Bean Plant', kind: 'journal entry', pov: 'first', purpose: 'to enjoy a story',
      lines: ['# Monday', 'Today I planted a bean seed in a cup of soil. I gave it a little water.', '# Thursday', 'A tiny green shoot poked out of the soil! I put the cup by the window.',
        '# Saturday', 'My plant has two leaves now. I measured it. It is 5 centimetres tall.', '# Next Monday', 'It grew so much that I moved it to a big pot. I can' + AP + 't wait to see a bean.'],
      facts: [['Where did the narrator put the cup?', 'by the window', 'in the fridge', 'under the bed', 'by the window'], ['How tall was the plant on Saturday?', '5 centimetres', '5 metres', '50 centimetres', 'centimetres tall'],
        ['What did the narrator plant?', 'a bean seed', 'an apple seed', 'a flower', 'planted a bean seed']],
      order: ['planted a bean seed', 'shoot poked out', 'two leaves now', 'moved it to a big pot'],
      main: ['The narrator plants a bean seed and watches it grow day by day.', 'Soil goes in a cup.', 'Windows let in light.'],
      infer: [['How does the narrator feel on Thursday?', 'excited', 'bored', 'poked out of the soil!'], ['How does the narrator feel about the plant at the end?', 'proud and curious', 'sad and tired', 'wait to see a bean']],
      predict: { upTo: 6, right: 'The plant will keep growing.', wrong: ['The plant will turn into a tree overnight.', 'The narrator will throw the plant away.'], clue: 'two leaves now' } },
    loons: { title: 'Loons', kind: 'information', pov: null, purpose: 'to learn facts',
      lines: ['# Where loons live', 'Loons live on lakes in Ontario in the summer. In the fall, they fly south to warmer water.', '# Food', 'Loons dive under the water to catch fish. They can stay under for about a minute.',
        '# Babies', 'Baby loons ride on their parents' + AP + ' backs. This keeps them safe and warm.'],
      facts: [['What do loons eat?', 'fish', 'seeds', 'leaves', 'to catch fish'], ['Where do baby loons ride?', 'on their parents' + AP + ' backs', 'in a nest in a tree', 'on the shore', 'ride on their parents'],
        ['Where do loons go in the fall?', 'south to warmer water', 'into a cave', 'under the ice', 'fly south']],
      order: ['live on lakes in Ontario in the summer', 'fly south to warmer water'],
      main: ['Loons are lake birds that dive for fish and carry their babies.', 'Lakes have water.', 'Fall comes after summer.'],
      cause: [['Baby loons ride on their parents' + AP + ' backs.', 'They stay safe and warm.'], ['The lake gets cold in the fall.', 'Loons fly south.']] },
    seed: { title: 'How to Plant a Seed', kind: 'instructions', pov: null, purpose: 'to learn how to do something',
      lines: ['You need: a cup, soil, a seed and water.', '1. Fill the cup with soil.', '2. Push the seed into the soil with your finger.', '3. Cover the seed with soil.', '4. Water it a little every day.'],
      order: ['Fill the cup', 'Push the seed', 'Cover the seed', 'Water it'],
      facts: [['What do you push the seed in with?', 'your finger', 'a spoon', 'a stick', 'with your finger']] },
    rain: { title: 'Rain on the Roof', kind: 'poem', pov: 'first', purpose: 'to enjoy a poem',
      lines: ['Rain on the roof is like tiny drums.', 'Tap, tip, tap, it taps and drips.', 'The puddles shine like silver plates.', 'I listen, snug, in my soft bed.'],
      simile: ['Rain on the roof is like tiny drums.', 'The puddles shine like silver plates.'],
      consonance: [['Tap, tip, tap, it taps and drips.', 't']] },
    bench: { title: 'A Bench for Our Yard', kind: 'letter', pov: 'first', purpose: 'to hear an opinion',
      lines: ['Dear Principal Okafor,', 'Please put a bench in our schoolyard.', 'Some students get tired at recess and need to rest.', 'A bench would help Grandpa Joe sit down when he picks us up.',
        'Everyone would have a place to sit and talk.', 'From, Amara'],
      view: { who: 'Amara', thinks: 'The schoolyard needs a bench.', wrong: ['Recess should be shorter.', 'Benches are not safe.'], wants: 'to get the principal to add a bench' } },
    sap: { title: 'Sugar Bush Day', kind: 'story', pov: 'first', purpose: 'to enjoy a story',
      lines: ['In early spring, my family went to the sugar bush.', 'My uncle showed me a bucket on a maple tree.', 'Clear sap went drip, drip, drip into the bucket.',
        'He said our family has made maple syrup for a long time.', 'We boiled the sap until it turned golden and sweet.', 'I tasted it on snow. It was the best treat ever!'],
      facts: [['What dripped into the bucket?', 'sap', 'milk', 'rain', 'Clear sap'], ['Who showed the narrator the bucket?', 'an uncle', 'a teacher', 'a friend', 'My uncle showed me'],
        ['What did they do to the sap?', 'boiled it', 'froze it', 'poured it out', 'We boiled the sap']],
      order: ['went to the sugar bush', 'showed me a bucket', 'boiled the sap', 'tasted it on snow'],
      main: ['A family makes maple syrup together in the spring.', 'Buckets can hold water.', 'Snow is cold.'],
      infer: [['How does the narrator feel about the treat?', 'delighted', 'disappointed', 'the best treat ever!'], ['How does the uncle feel about making syrup?', 'proud of the family way', 'bored by it', 'made maple syrup for a long time']],
      predict: { upTo: 3, right: 'They will make syrup from the sap.', wrong: ['They will go swimming.', 'They will paint the bucket.'], clue: 'Clear sap went drip, drip, drip' } }
  };
  /* the passage on a card, the way questions show it */
  Atlas.texts.show = function (t, upTo) { return Atlas.W.passage(t.title, upTo ? t.lines.slice(0, upTo) : t.lines); };
  Atlas.texts.list = function (need) { return Object.keys(Atlas.texts).filter(function (k) { return Atlas.texts[k].lines && Atlas.texts[k][need]; }).map(function (k) { return Atlas.texts[k]; }); };
})();
