/* Grade 3 reading passages, shared by the two comprehension chapters (reading.js and thinking.js).
   Every passage is written for this site. Each one carries what its questions need: facts ([question, answer, two wrong answers,
   words from the sentence that answers it]), events in order, the main idea,
   the narrator, feelings to infer with the words that show them, and a prediction with its clue.
   The answer checks keep their own answer key (tests/verify/grade3-reading.js), like a second marker. */
(function () {
  'use strict';
  var AP = '’', OQ = '“', CQ = '”';
  Atlas.texts = {
    mitten: { title: 'The Lost Mitten', kind: 'story', pov: 'third', purpose: 'to enjoy a story',
      lines: ['Mateo and his sister Leila walked home from school in the snow.', 'At the corner, Leila stopped. ' + OQ + 'My mitten is gone!' + CQ + ' she cried.',
        'Mateo looked back. Their footprints made a long trail behind them.', 'They followed the footprints all the way back to the park.',
        'There, on top of the slide, sat a small red mitten.', 'Leila pulled it on and grinned. Her fingers were warm again.'],
      facts: [['Where did they find the mitten?', 'on top of the slide', 'at the corner', 'at school', 'on top of the slide'], ['Who lost a mitten?', 'Leila', 'Mateo', 'their mom', 'My mitten is gone'], ['What colour was the mitten?', 'red', 'blue', 'white', 'small red mitten']],
      order: ['walked home from school', 'My mitten is gone', 'followed the footprints', 'on top of the slide', 'pulled it on'],
      main: ['Leila loses her mitten, and they find it by following their footprints.', 'Mateo and Leila like the snow.', 'The park has a tall slide.'],
      infer: [['How does Leila feel at the end?', 'happy', 'scared', 'grinned'], ['How does Leila feel when she stops at the corner?', 'upset', 'proud', 'she cried']],
      predict: { upTo: 3, right: 'They will follow the footprints to find the mitten.', wrong: ['They will buy new mittens.', 'They will build a snowman.'], clue: 'Their footprints made a long trail' } },
    beavers: { title: 'Busy Beavers', kind: 'information', pov: null, purpose: 'to learn facts',
      lines: ['# Home', 'Beavers build homes called lodges. A lodge is made of sticks and mud.', '# Teeth', 'A beaver' + AP + 's front teeth never stop growing. Chewing wood keeps them short.',
        '# Winter', 'In the fall, beavers store branches under the water. In winter, they swim out under the ice to eat them.'],
      facts: [['What is a beaver' + AP + 's home called?', 'a lodge', 'a den', 'a nest', 'called lodges'], ['What keeps a beaver' + AP + 's teeth short?', 'chewing wood', 'eating fish', 'swimming', 'Chewing wood'], ['Where do beavers store branches?', 'under the water', 'in the lodge roof', 'up in a tree', 'store branches']],
      order: ['store branches', 'swim out under the ice'],
      main: ['Beavers have special ways to build, eat and get ready for winter.', 'Beavers have teeth.', 'Ice covers ponds in winter.'],
      cause: [['A beaver chews wood.', 'Its teeth stay short.'], ['Beavers store branches in the fall.', 'They have food in winter.']] },
    canoe: { title: 'My First Canoe Trip', kind: 'story', pov: 'first', purpose: 'to enjoy a story',
      lines: ['Last summer, I went on my first canoe trip with my aunt.', 'I sat at the front and held my paddle tight.', 'The water was so still that I could see clouds in it.',
        'My aunt showed me how to dip the paddle and pull.', 'By the end of the day, my arms were tired, but I felt proud.', 'I can' + AP + 't wait to go again next summer.'],
      facts: [['Who went on the trip with the narrator?', 'an aunt', 'a teacher', 'a cousin', 'with my aunt'], ['Where did the narrator sit?', 'at the front', 'at the back', 'on the dock', 'sat at the front']],
      order: ['held my paddle tight', 'could see clouds in it', 'showed me how to dip', 'my arms were tired'],
      main: ['The narrator learns to paddle on a first canoe trip and feels proud.', 'Canoes float on water.', 'Clouds can be seen in still water.'],
      infer: [['How does the narrator feel at the start?', 'nervous', 'bored', 'held my paddle tight'], ['How does the narrator feel about canoeing now?', 'excited to go again', 'glad it is over', 'can' + AP + 't wait to go again']],
      predict: { upTo: 6, right: 'The narrator will go canoeing again.', wrong: ['The narrator will never paddle again.', 'The narrator will move away from the lake.'], clue: 'wait to go again' } },
    night: { title: 'Night at the Lake', kind: 'poem', pov: 'first', purpose: 'to enjoy a poem',
      lines: ['The moon is a lamp above the lake.', 'The stars glow slow over the snow.', 'The wind is a whisper in the pines.', 'I sleep deep, and dream until day.'],
      metaphor: ['The moon is a lamp above the lake.', 'The wind is a whisper in the pines.'],
      assonance: [['The stars glow slow over the snow.', 'o'], ['I sleep deep, and dream until day.', 'ee']] },
    feeder: { title: 'How to Make a Pine Cone Bird Feeder', kind: 'instructions', pov: null, purpose: 'to learn how to do something',
      lines: ['You need: a pine cone, string, sunflower butter and birdseed.', '1. Tie the string around the top of the pine cone.', '2. Spread sunflower butter all over the cone.',
        '3. Roll the cone in birdseed.', '4. Hang it on a branch where you can see it.'],
      order: ['Tie the string', 'Spread sunflower butter', 'Roll the cone in birdseed', 'Hang it on a branch'],
      facts: [['What do you roll the cone in?', 'birdseed', 'string', 'sugar', 'Roll the cone']] },
    rink: { title: 'A Letter to the Mayor', kind: 'letter', pov: 'first', purpose: 'to hear an opinion',
      lines: ['Dear Mayor Singh,', 'Please build a skating rink in Elm Park.', 'Kids in our neighbourhood need a safe place to skate in winter.', 'Skating keeps us healthy, and it helps us make friends.',
        'Many families would use it every day.', 'From, Priya'],
      view: { who: 'Priya', thinks: 'The park needs a skating rink.', wrong: ['The park should close in winter.', 'Skating is not safe.'], wants: 'to get the mayor to build a rink' } },
    maple: { title: 'Maple Syrup', kind: 'information', pov: null, purpose: 'to learn facts',
      lines: ['# A long history', 'First Nations people were the first to make maple syrup. They taught others how to do it.', '# Sap', 'In early spring, the days are warm and the nights are cold. This makes sap flow inside maple trees.',
        '# Boiling', 'The sap is boiled for a long time. The water goes into the air as steam, and sweet syrup is left.'],
      facts: [['Who were the first to make maple syrup?', 'First Nations people', 'farmers from Europe', 'city bakers', 'were the first'], ['What makes the sap flow?', 'warm days and cold nights', 'heavy rain', 'strong wind', 'makes sap flow']],
      order: ['sap flow', 'boiled for a long time', 'syrup is left'],
      main: ['Maple syrup is made by boiling sap, and First Nations people were the first to make it.', 'Trees grow in spring.', 'Steam goes into the air.'],
      cause: [['Days are warm and nights are cold.', 'Sap flows inside maple trees.'], ['Sap is boiled for a long time.', 'Sweet syrup is left.']] }
  };
  /* the passage on a card, the way questions show it */
  Atlas.texts.show = function (t, upTo) { return Atlas.W.passage(t.title, upTo ? t.lines.slice(0, upTo) : t.lines); };
  Atlas.texts.list = function (need) { return Object.keys(Atlas.texts).filter(function (k) { return Atlas.texts[k].lines && Atlas.texts[k][need]; }).map(function (k) { return Atlas.texts[k]; }); };
})();
