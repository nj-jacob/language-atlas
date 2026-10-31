/* Grade 4 reading passages, shared by the comprehension chapters (reading.js, craft.js and thinking.js).
   Every passage is written for this site. Each one carries what its questions need:
     facts      [question, answer, wrong, wrong, words from the sentence that answers it]
     order      words from each event, in the order of the text
     main       [the main idea, two answers that are only a detail or off topic]
     details    supporting details (sentences from the text) and off-topic sentences that do not support the main idea
     conclusion [a fair conclusion, two that the text does not support]
     infer      local inferences: [question, answer, wrong, the words that show it]
     theme      a global inference about the whole text: [right, wrong, wrong]
     predict    { upTo: lines shown, right, wrong: [..], clue, check: a question to ask to check the prediction }
     cause      [cause, effect] pairs
     plots      two characters, each with the events of their own plot in order
   The answer checks keep their own answer key (tests/verify/grade4-reading.js, grade4-thinking.js), like a second marker. */
(function () {
  'use strict';
  var AP = '’', OQ = '“', CQ = '”';
  Atlas.texts = {
    storm: { title: 'Two Ways Home', kind: 'story', pov: 'third', purpose: 'to enjoy a story',
      lines: ['The snow started just after three o' + AP + 'clock.', 'At the library, Amara looked up from her book. The windows had turned white.',
        'Across town, her brother Jayden was finishing hockey practice at the arena.', 'Amara called home, but no one answered. She waited for the bus inside.',
        'At the arena, the coach said the roads were closing. ' + OQ + 'Everyone stays here until a grown-up comes,' + CQ + ' she said.',
        'When the bus finally came, Amara rode it to the arena, the stop closest to home.', 'Jayden was waiting by the door with his hockey bag. ' + OQ + 'How did you know I was here?' + CQ + ' he asked.',
        'Amara smiled. ' + OQ + 'You are here every Tuesday. Mom can pick us both up.' + CQ],
      facts: [['Where was Amara when the snow started?', 'at the library', 'at the arena', 'at home', 'At the library'], ['Where was Jayden?', 'at hockey practice', 'at the library', 'on the bus', 'finishing hockey practice'],
        ['How did Amara get to the arena?', 'by bus', 'on foot', 'by car', 'rode it to the arena']],
      order: ['snow started', 'called home', 'roads were closing', 'rode it to the arena', 'waiting by the door'],
      main: ['In a snowstorm, Amara finds her brother so they can get home together.', 'Amara likes to read at the library.', 'The arena is across town.'],
      infer: [['How does Amara know where Jayden is?', 'He goes to the arena every Tuesday.', 'The coach phoned her.', 'here every Tuesday'], ['How does Jayden feel when he sees Amara?', 'surprised', 'angry', 'How did you know']],
      theme: ['Family members look out for each other.', 'Snow is fun to play in.', 'Libraries close early in winter.'],
      plots: { Amara: ['looked up from her book', 'called home', 'rode it to the arena'], Jayden: ['finishing hockey practice', 'roads were closing', 'waiting by the door'] },
      cause: [['The snow got heavy.', 'The roads were closing.'], ['No one answered at home.', 'Amara waited for the bus.']] },
    monarchs: { title: 'Monarch Butterflies', kind: 'information', pov: null, purpose: 'to learn facts',
      lines: ['# A long trip', 'Every fall, monarch butterflies fly from Ontario to the mountains of Mexico. Some fly more than 4000 km.',
        '# Milkweed', 'Monarch caterpillars eat only milkweed leaves. Milkweed tastes bitter, so birds learn not to eat monarchs.',
        '# Helping monarchs', 'Fewer milkweed plants grow today, so there are fewer monarchs. People can help by planting milkweed in gardens and schoolyards.'],
      facts: [['Where do monarchs fly in the fall?', 'to Mexico', 'to the Arctic', 'to Europe', 'to the mountains of Mexico'], ['What do monarch caterpillars eat?', 'milkweed leaves', 'grass', 'tree bark', 'eat only milkweed'],
        ['How can people help monarchs?', 'plant milkweed', 'catch them in nets', 'feed them sugar', 'help by planting']],
      main: ['Monarchs travel far and need milkweed, and people can help them.', 'Monarchs have orange wings.', 'Mexico has tall mountains.'],
      details: { yes: ['Some fly more than 4000 km.', 'Monarch caterpillars eat only milkweed leaves.', 'People can help by planting milkweed in gardens and schoolyards.'],
        no: ['Bees also visit gardens.', 'Mexico is a large country.', 'Some schoolyards have soccer fields.'] },
      conclusion: ['Planting milkweed can help more monarchs survive.', 'Monarchs do not need any help.', 'Birds like to eat monarchs.'],
      cause: [['Milkweed tastes bitter.', 'Birds learn not to eat monarchs.'], ['Fewer milkweed plants grow.', 'There are fewer monarchs.']] },
    fair: { title: 'My Volcano', kind: 'story', pov: 'first', purpose: 'to enjoy a story',
      lines: ['I carried my volcano into the gym with shaking hands.', 'Rows of tables filled the room, and every project looked better than mine.',
        'When the judge came to my table, my mouth went dry.', 'I took a deep breath and picked up the bottle of vinegar.',
        'I poured it in. Red foam bubbled up and spilled over the sides, just like it had at home.', 'The judge laughed and wrote something on her clipboard.',
        'I did not win a ribbon, but I walked home with my head high.'],
      facts: [['What did the narrator pour?', 'vinegar', 'water', 'milk', 'bottle of vinegar'], ['What colour was the foam?', 'red', 'white', 'green', 'Red foam']],
      order: ['into the gym', 'mouth went dry', 'Red foam bubbled up', 'wrote something on her clipboard', 'walked home'],
      main: ['The narrator is nervous at the science fair but feels proud after the volcano works.', 'The gym has rows of tables.', 'The judge has a clipboard.'],
      infer: [['How does the narrator feel at the start?', 'nervous', 'bored', 'shaking hands'], ['How does the narrator feel at the end?', 'proud', 'upset', 'head high']],
      theme: ['Doing your best can matter more than winning.', 'Volcanoes are dangerous.', 'Judges like red foam.'],
      predict: { upTo: 4, right: 'The narrator will pour the vinegar into the volcano.', wrong: ['The narrator will run out of the gym.', 'The narrator will win first prize.'], clue: 'picked up the bottle of vinegar', check: 'Did the narrator pour the vinegar?' } },
    trail: { title: 'Your First Ski Trail', kind: 'story', pov: 'second', purpose: 'to enjoy a story',
      lines: ['You click your boots into the skis and push off.', 'The trail curves through tall pines, and the snow squeaks under you.',
        'At the top of a small hill, you stop. Your heart thumps.', 'You bend your knees and glide down.', 'At the bottom, you are still standing. You grin and push on.'],
      facts: [['What sound does the snow make?', 'it squeaks', 'it crunches', 'it hisses', 'snow squeaks'], ['What grows beside the trail?', 'tall pines', 'maple trees', 'tall grass', 'tall pines']],
      order: ['push off', 'curves through tall pines', 'top of a small hill', 'glide down', 'still standing'],
      infer: [['How do you feel at the top of the hill?', 'nervous', 'bored', 'heart thumps'], ['How do you feel at the bottom?', 'happy', 'scared', 'You grin']],
      predict: { upTo: 3, right: 'You will ski down the hill.', wrong: ['You will take off your skis and go home.', 'You will climb a tree.'], clue: 'top of a small hill', check: 'Did you go down the hill?' } },
    maple: { title: 'The Old Maple', kind: 'poem', pov: null, purpose: 'to enjoy a poem',
      lines: ['The old maple stretches its arms to the sky.', 'In spring, it hums with busy bees.', 'In fall, it drops its coat of red and gold.', 'In winter, it sleeps and dreams of green.'] },
    crow: { title: 'Crow Opens a Shop', kind: 'fable', pov: 'third', purpose: 'to learn a lesson from a story',
      lines: ['Crow put on her reading glasses and opened a little shop by the river.', OQ + 'Shiny things for sale!' + CQ + ' she called.',
        'Squirrel came by with an acorn. ' + OQ + 'Will you trade a button for this?' + CQ + ' he asked.', 'Crow shook her head. ' + OQ + 'I only trade for shiny things.' + CQ,
        'By evening, Crow had a pile of buttons but nothing to eat.', 'The next morning, she hung a new sign: Food welcome.'],
      facts: [['What did Squirrel bring?', 'an acorn', 'a button', 'a spoon', 'with an acorn'], ['Where was the shop?', 'by the river', 'in a tree', 'in town', 'shop by the river']],
      order: ['opened a little shop', 'came by with an acorn', 'I only trade', 'nothing to eat', 'hung a new sign'],
      main: ['Crow learns that shiny things cannot feed her.', 'Crow wears reading glasses.', 'Squirrel has an acorn.'],
      infer: [['Why did Crow hang a new sign?', 'She was hungry.', 'She wanted more buttons.', 'nothing to eat']],
      theme: ['What you need matters more than what looks nice.', 'Rivers are good places for shops.', 'Squirrels like buttons.'],
      predict: { upTo: 5, right: 'Crow will start trading for food.', wrong: ['Crow will collect more buttons.', 'Crow will fly away from the river forever.'], clue: 'nothing to eat', check: 'Did Crow start trading for food?' } },
    pool: { title: 'Keep Riverside Pool Open', kind: 'letter', pov: 'first', purpose: 'to hear an opinion',
      lines: ['Dear Members of Council,', 'Please keep Riverside Pool open all summer.', 'It is the best pool in the whole city, and everyone loves it.',
        'Kids need a cool place to swim on hot days.', 'Swimming lessons there teach children to be safe near water.', 'Closing it would be a terrible mistake.', 'Sincerely, Omar Haddad, age 9'],
      view: { who: 'Omar', thinks: 'Riverside Pool should stay open all summer.', wrong: ['Riverside Pool should close.', 'Swimming lessons are not useful.'],
        missing: 'the people who decide how the city spends its money', notMissing: ['kids who swim', 'children in swimming lessons'],
        bias: ['It is the best pool in the whole city, and everyone loves it.', 'Closing it would be a terrible mistake.'],
        fair: ['Kids need a cool place to swim on hot days.', 'Swimming lessons there teach children to be safe near water.'] } },
    sisters: { title: 'The Three Sisters', kind: 'information', pov: null, purpose: 'to learn facts',
      lines: ['# Three plants, one garden', 'For hundreds of years, Haudenosaunee farmers and other First Nations have grown corn, beans and squash together. Many call these plants the Three Sisters.',
        '# Each sister helps', 'The tall corn gives the beans a pole to climb. The beans add nutrients to the soil that help the other plants grow. The wide squash leaves shade the ground, so fewer weeds grow.',
        '# Still growing', 'Today, many families and schools plant Three Sisters gardens to learn from this way of farming.'],
      facts: [['Which three plants are the Three Sisters?', 'corn, beans and squash', 'wheat, oats and rice', 'apples, pears and plums', 'corn, beans and squash'],
        ['What do the beans climb?', 'the corn', 'a fence', 'the squash', 'pole to climb']],
      main: ['Corn, beans and squash help each other grow when they are planted together.', 'Squash has wide leaves.', 'Schools have gardens.'],
      details: { yes: ['The tall corn gives the beans a pole to climb.', 'The beans add nutrients to the soil that help the other plants grow.', 'The wide squash leaves shade the ground, so fewer weeds grow.'],
        no: ['Pumpkins are orange.', 'Some gardens have a fence.', 'Farmers wake up early.'] },
      conclusion: ['Plants can help each other grow.', 'Corn grows best alone.', 'Weeds help squash grow.'],
      cause: [['The corn grows tall.', 'The beans have something to climb.'], ['The squash leaves shade the ground.', 'Fewer weeds grow.']] },
    lantern: { title: 'How to Make a Paper Lantern', kind: 'instructions', pov: null, purpose: 'to learn how to do something',
      lines: ['You need: a sheet of paper, scissors, tape and a ruler.', '1. Fold the paper in half the long way.', '2. Cut slits from the fold, stopping 2 cm from the edge.',
        '3. Unfold the paper and roll it into a tube.', '4. Tape the edges together.', '5. Tape a paper strip to the top for a handle.'],
      order: ['Fold the paper', 'Cut slits', 'roll it into a tube', 'Tape the edges', 'paper strip'],
      facts: [['Where do you stop cutting?', '2 cm from the edge', 'at the fold', 'in the middle', 'stopping 2 cm']] }
  };
  /* the passage on a card, the way questions show it */
  Atlas.texts.show = function (t, upTo) { return Atlas.W.passage(t.title, upTo ? t.lines.slice(0, upTo) : t.lines); };
  Atlas.texts.list = function (need) { return Object.keys(Atlas.texts).filter(function (k) { return Atlas.texts[k].lines && Atlas.texts[k][need]; }).map(function (k) { return Atlas.texts[k]; }); };
})();
