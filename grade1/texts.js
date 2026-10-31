/* Grade 1 reading passages, shared by the two comprehension chapters (reading.js and thinking.js).
   Every passage is written for this site: short sentences and decodable words where possible. Each one carries what its
   questions need: facts ([question, answer, two wrong answers, words from the sentence that answers it]), events in order,
   the main idea, who could tell it another way, what you might already know, a connection, a feeling with the words that
   show it, and a prediction with its clue. The answer checks keep their own answer key (tests/verify/grade1-reading.js). */
(function () {
  'use strict';
  var OQ = '“', CQ = '”';
  Atlas.texts = {
    kite: { title: 'Tala and the Kite', kind: 'story', pov: 'third', purpose: 'to enjoy a story',
      lines: ['Tala had a new kite.', 'It was red and yellow.', 'She ran across the big field.', 'The wind lifted the kite up high.', OQ + 'Look, Grandpa!' + CQ + ' she called.', 'Grandpa clapped and smiled.'],
      facts: [['What colours was the kite?', 'red and yellow', 'blue and green', 'black and white', 'red and yellow'], ['Who clapped?', 'Grandpa', 'Tala', 'Mom', 'clapped and smiled'], ['Where did Tala run?', 'across the big field', 'to school', 'into the lake', 'across the big field']],
      order: ['had a new kite', 'ran across the big field', 'lifted the kite up high', 'clapped and smiled'],
      main: ['Tala flies her new kite, and Grandpa watches.', 'The field is big.', 'Grandpa likes to clap.'],
      other: ['Grandpa', ['a fish in the sea', 'a bus driver in the city']],
      know: ['Wind can lift things into the air.', ['Fish live in water.', 'Snow is cold.']],
      connect: ['I flew a kite at the park with my aunt.', ['I like to eat noodles.', 'My shoes are blue.']],
      infer: [['How does Tala feel when the kite goes up?', 'excited', 'sad', 'Look, Grandpa']],
      predict: { upTo: 3, right: 'The kite will fly up into the sky.', wrong: ['Tala will go to sleep.', 'The kite will turn into a bird.'], clue: 'ran across the big field' } },
    frogs: { title: 'From Egg to Frog', kind: 'information', pov: null, purpose: 'to learn facts',
      lines: ['# Eggs', 'A frog starts as a tiny egg in a pond.', '# Tadpoles', 'The egg hatches. Out comes a tadpole.', 'A tadpole has a tail and swims like a fish.', '# Frogs', 'The tadpole grows legs. Its tail gets smaller.', 'Now it is a frog. It can hop!'],
      facts: [['Where does a frog egg start?', 'in a pond', 'in a tree', 'in a nest', 'tiny egg in a pond'], ['What does a tadpole have?', 'a tail', 'wings', 'fur', 'has a tail']],
      order: ['tiny egg in a pond', 'Out comes a tadpole', 'grows legs', 'It can hop'],
      main: ['A frog grows from an egg, to a tadpole, to a frog.', 'Ponds have water.', 'Frogs can hop.'],
      know: ['Frogs live near ponds.', ['Cars need gas.', 'Birthdays have cake.']],
      connect: ['I saw tadpoles in the creek last spring.', ['I have a red coat.', 'My cousin plays the drum.']],
      cause: [['The tadpole grows legs.', 'It can hop.']] },
    snow: { title: 'My Snowy Day', kind: 'story', pov: 'first', purpose: 'to enjoy a story',
      lines: ['I put on my boots and my warm hat.', 'I went outside to play in the snow.', 'I made a snow angel.', 'My cheeks got cold and pink.', 'Then I went inside for hot soup.'],
      facts: [['What did the narrator make?', 'a snow angel', 'a snowman', 'a snow fort', 'made a snow angel'], ['What did the narrator eat?', 'hot soup', 'a sandwich', 'ice cream', 'hot soup']],
      order: ['put on my boots', 'went outside', 'made a snow angel', 'went inside'],
      main: ['A child plays in the snow, then warms up inside.', 'Boots keep feet dry.', 'Soup can be hot.'],
      other: ['a friend who came to play', ['a whale', 'a pilot in a plane']],
      know: ['You wear warm clothes in winter.', ['Frogs lay eggs.', 'Trains run on tracks.']],
      connect: ['I made a snow angel in my yard.', ['I can count to ten.', 'My dog is brown.']],
      infer: [['How did the narrator feel outside at the end?', 'cold', 'too hot', 'cheeks got cold']],
      predict: { upTo: 4, right: 'The narrator will go inside to get warm.', wrong: ['The narrator will go swimming.', 'The narrator will plant a garden.'], clue: 'cheeks got cold' } },
    seed: { title: 'How to Plant a Seed', kind: 'instructions', pov: null, purpose: 'to learn how to do something',
      lines: ['You need: a pot, soil, a seed and water.', '1. Fill the pot with soil.', '2. Push the seed into the soil.', '3. Give it a little water.', '4. Put the pot in the sun.'],
      facts: [['What do you put in the pot first?', 'soil', 'water', 'a rock', 'Fill the pot']],
      order: ['Fill the pot', 'Push the seed', 'Give it a little water', 'Put the pot in the sun'],
      know: ['Plants need water and sun.', ['Dogs bark.', 'Rain comes from clouds.']] },
    rain: { title: 'Rain', kind: 'poem', pov: null, purpose: 'to enjoy a poem',
      lines: ['Drip, drop, rain on the top.', 'Splash in the puddle, plop, plop, plop.', 'The rain is fun, but now it is done.', 'Out comes the warm and yellow sun.'],
      rhyme: [['top', 'drop'], ['done', 'sun'], ['top', 'plop']], sound: ['Drip', 'drop', 'Splash', 'plop'] },
    note: { title: 'A Note to Grandma', kind: 'letter', pov: 'first', purpose: 'to hear what someone thinks',
      lines: ['Dear Grandma,', 'Thank you for the green scarf.', 'I wear it every day.', 'It keeps my neck warm, and green is my favourite colour!', 'Love, Arjun'],
      facts: [['What colour is the scarf?', 'green', 'red', 'blue', 'green scarf']],
      view: { who: 'Arjun', thinks: 'He loves the scarf.', wrong: ['He does not like the scarf.', 'He lost the scarf.'], clue: 'I wear it every day' } }
  };
  /* the passage on a card, the way questions show it */
  Atlas.texts.show = function (t, upTo) { return Atlas.W.passage(t.title, upTo ? t.lines.slice(0, upTo) : t.lines); };
  Atlas.texts.list = function (need) { return Object.keys(Atlas.texts).filter(function (k) { return Atlas.texts[k].lines && Atlas.texts[k][need]; }).map(function (k) { return Atlas.texts[k]; }); };
})();
