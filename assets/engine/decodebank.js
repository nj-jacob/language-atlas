/* Language Atlas tool box: the Decodable readers' pages (decodable.js loads this when the tool opens), one for each phonics step, in teaching order.
   Every story, title and question uses only the spellings taught up to its step, plus heart words: tests/decodable.js works this out
   again for every word. All text is written for this site. Canadian spelling. See decodable.js for what each part is. */
Atlas.decodable.add({
  id: 'short-a', band: 'K', name: 'Short a', focus: ['a'], key: 'apple', mark: 'a',
  heart: ['the', 'a', 'I', 'is', 'and', 'to'],
  words: ['cat', 'hat', 'sat', 'mat', 'nap', 'map', 'tan', 'fan', 'van', 'bag', 'tag', 'jam', 'dad', 'rag', 'wax'],
  title: 'Max and the Hat',
  text: ['Sam has a cat. The cat is Max. Max is fat and tan.',
    'Dad has a hat. Dad sat and had a nap. Max ran to the hat!',
    'Max sat at the hat. Max had a nap. Sam and Dad pat Max. Max is a hat cat!'],
  pic: ['sun', 'bed', 'cat', 'hat'],
  qs: [
    { k: 'yn', q: 'Max is a cat.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What did Max nap at?', opts: ['a van', 'a hat', 'a map'], a: 1, code: 'C1.1' },
    { k: 'draw', q: 'Draw Max at the hat.', a: 'Max the cat beside or on Dad\'s hat. Ask the child to tell you about the picture.', code: 'C1.4' }
  ],
  tip: 'Short a says /a/ as in apple. In a word like cat, the a sits between two consonants (a closed syllable), so it is short. Watch for b and d mixed up, and for guessing from the picture: point back to the letters.'
});
Atlas.decodable.add({
  id: 'short-i', band: 'K', name: 'Short i', focus: ['i'], key: 'itch', mark: 'i',
  heart: ['was', 'said', 'you'],
  words: ['big', 'pig', 'dig', 'sit', 'hit', 'lip', 'zip', 'win', 'pin', 'fin', 'wig', 'six', 'mix', 'lid', 'fig'],
  title: 'Pip Can Dig',
  text: ['Kim has a big pig. The pig is Pip. Pip can dig and dig.',
    'Dad had a map. Dad sat and had a nap. Pip hid the map in a pit!',
    '"Is it in the van?" said Dad. Kim and Jin had to dig in the pit. It is in the pit! Dad has his map. Pip has a fig.'],
  pic: ['sun', 'van', 'pig'],
  qs: [
    { k: 'yn', q: 'Pip is a big pig.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Where was the map?', opts: ['in a van', 'in a pit', 'in a bin'], a: 1, code: 'C1.1' },
    { k: 'draw', q: 'Draw Pip in the pit.', a: 'A pig in a hole in the ground. Ask the child what Pip did with the map.', code: 'C1.4' }
  ],
  tip: 'Short i says /i/ as in itch. Many children mix up short i and short e, so have the child say both and feel the small smile for /i/. If the child guesses, cover the picture and point to each letter.'
});
Atlas.decodable.add({
  id: 'short-o', band: 'K', name: 'Short o', focus: ['o'], key: 'otter', mark: 'o',
  heart: ['of', 'do', 'go', 'no'],
  words: ['hot', 'pot', 'dot', 'top', 'mop', 'hop', 'fox', 'box', 'log', 'dog', 'jog', 'cot', 'rod', 'job', 'sob'],
  title: 'A Fox in a Box',
  text: ['Tom has a big box. The box is on top of a log.',
    'A fox is in the box! The fox is not big. It sat in the box and had a nap.',
    'Tom ran to Mom. "Do not tap the box," said Mom. Tom and Mom sat and sat. Hop! The fox ran and hid. Tom has his box.'],
  pic: ['sun', 'fox', 'box', 'log'],
  qs: [
    { k: 'yn', q: 'The fox is big.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Where did the fox nap?', opts: ['in a box', 'on a mat', 'in a pot'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['A fox is in the box.', 'Tom ran to Mom.', 'The fox ran and hid.'], show: [2, 0, 1], code: 'C3.3' }
  ],
  tip: 'Short o says /o/ as in otter, with the mouth open and round. Watch for o and a mixed up (hot read as hat). The heart words of, do, go and no do not say /o/, so read them by sight.'
});
Atlas.decodable.add({
  id: 'short-u', band: 'K', name: 'Short u', focus: ['u'], key: 'up', mark: 'u',
  heart: ['put', 'he', 'she', 'we', 'me', 'be'],
  words: ['bug', 'hug', 'rug', 'mug', 'jug', 'cup', 'pup', 'sun', 'fun', 'run', 'bun', 'nut', 'cut', 'tub', 'gum'],
  title: 'Bud the Mud Pup',
  text: ['Gus has a pup. The pup is Bud. Bud is a fun pup.',
    'Bud ran in the sun. He dug in the mud. Bud is a mud pup!',
    'Gus put Bud in a tub. Rub, rub, rub! "Bud, you had fun in the mud!" said Gus. Bud got up and ran to the rug. He had a nap on the rug.'],
  pic: ['sun', 'dog', 'pond'],
  qs: [
    { k: 'choice', q: 'Where did Bud dig?', opts: ['in the mud', 'in a tub', 'on a rug'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why did Gus put Bud in the tub?', opts: ['Bud had mud on him.', 'Bud was hot.', 'Bud had a nap.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Bud in the tub.', a: 'A pup in a tub of water, perhaps with Gus rubbing him. Ask why Bud is in the tub.', code: 'C1.4' }
  ],
  tip: 'Short u says /u/ as in up. Children often read u as o (pup as pop), so ask them to check the middle letter. Put looks like it should rhyme with but, but it does not: it is a heart word.'
});
Atlas.decodable.add({
  id: 'short-e', band: 'K', name: 'Short e', focus: ['e'], key: 'egg', mark: 'e',
  heart: ['are', 'have', 'they'],
  words: ['bed', 'red', 'fed', 'wet', 'pet', 'net', 'ten', 'hen', 'pen', 'leg', 'beg', 'yes', 'web', 'jet', 'vet'],
  title: 'Peg the Red Hen',
  text: ['Meg has a red hen. The hen is Peg. Peg is in a pen.',
    'Peg is not in the pen! Meg and Ben run to get Peg. Is Peg in the den? No. Is Peg in the van? No.',
    'Peg is on the bed! "You are a bad hen," said Ben. They put Peg in the pen. They set a net on the pen.'],
  pic: ['hen', 'bed', 'van'],
  qs: [
    { k: 'choice', q: 'Where was Peg?', opts: ['in the van', 'on the bed', 'in the den'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Ben is mad at Peg.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw Peg in the pen.', a: 'A hen inside a pen or fence, perhaps with a net on top. Ask the child why the net is there.', code: 'C1.4' }
  ],
  tip: 'Short e says /e/ as in egg. It is the hardest short vowel to hear: children often mix it with short i (pen and pin). Say pairs like pen, pin and bed, bid, and ask which is which.'
});
Atlas.decodable.add({
  id: 'short-mix', band: 'K', name: 'All five short vowels', focus: ['a e i', 'o u'], key: 'cat, bed, pig, fox, sun', mark: '[aeiou]',
  heart: ['one', 'two', 'look', 'see'],
  words: ['cat', 'map', 'web', 'bed', 'lid', 'pig', 'fox', 'pot', 'sun', 'cub', 'quiz', 'quit'],
  title: 'The Cub and the Bun',
  text: ['Liz and Dad sit on a log. Dad has a big bun in a bag.',
    'Look! A cub ran to the log. The cub got the bag! It sat and had the bun.',
    '"Quit it, cub!" said Liz. "Let it be," said Dad. "We can get a bun at the hut." Liz and Dad see the cub run to a den.'],
  pic: ['spruce', 'bear', 'log', 'bag'],
  qs: [
    { k: 'choice', q: 'What did the cub get?', opts: ['a hat', 'the bag', 'a cup'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Dad is mad at the cub.', a: false, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Dad has a bun.', 'A cub got the bag.', 'The cub ran to a den.'], show: [1, 2, 0], code: 'C3.3' }
  ],
  tip: 'This page mixes all five short vowels, so the child must look at the middle letter of every word. Qu always go together and say /kw/ (quit, quiz). If a vowel is misread, point to it and ask for its sound before blending again.'
});
Atlas.decodable.add({
  id: 'sh', band: '1', name: 'Digraph sh', focus: ['sh'], key: 'ship', mark: 'sh',
  heart: ['what', 'who', 'there'],
  words: ['ship', 'shop', 'shed', 'shut', 'shin', 'shot', 'fish', 'dish', 'wish', 'rush', 'hush', 'cash', 'mash', 'dash', 'gush'],
  title: 'Josh Has a Wish',
  text: ['Josh and Mom go on a ship. Mom has a rod. Josh has a rod and a net. "I wish I had a fish," said Josh.',
    'Josh sat and sat. Tug! A fish is on his rod! It is a big red fish. Josh got it in his net.',
    '"Let it go, Josh," said Mom. Josh let the fish go. It shot to the mud and hid.',
    'At the fish shop, Mom got a hot dish of fish. Josh had his wish!'],
  pic: ['sun', 'ship', 'fish'],
  qs: [
    { k: 'choice', q: 'What did Josh wish for?', opts: ['a ship', 'a fish', 'a net'], a: 1, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Josh got a fish in his net.', 'Josh let the fish go.', 'Mom got a dish of fish.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'write', q: 'What do you wish for?', a: 'Any wish in a word or short sentence, for example: I wish I had a dog.', code: 'C2.5' }
  ],
  tip: 'Sh is two letters that make one sound, /sh/, as in ship (a digraph). Have the child tap it once, not twice: sh-i-p is three sounds. Watch for s and h read apart, as in s-h-ip.'
});
Atlas.decodable.add({
  id: 'ch', band: '1', name: 'Digraph ch', focus: ['ch'], key: 'chin', mark: 'ch',
  heart: ['where', 'were', 'come', 'some'],
  words: ['chin', 'chip', 'chop', 'chat', 'chug', 'chum', 'chap', 'rich', 'much', 'such'],
  title: 'Chip and the Fish',
  text: ['Chen has a pup. The pup is Chip. Chip has a red dot on his chin.',
    'Chen and Dad sit and chat at the hut. Dad has a hot dish of fish. "Can Chip have some?" said Chen. "No," said Dad. "A pup can not have fish."',
    'Dad got up to get a cup. Chip got up to the dish. Chip had much of the fish! "Where is the fish?" said Dad. Chip had fish on his chin.',
    '"Chip, you are such a pup!" said Dad.'],
  pic: ['hut', 'dog', 'fish'],
  qs: [
    { k: 'yn', q: 'Chip has a red dot on his chin.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Chip have fish on his chin?', opts: ['Chip had some of the fish.', 'Dad fed Chip.', 'Chen fed Chip.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Chip at the dish.', a: 'A pup with its nose in a dish of fish. Ask the child what Dad said.', code: 'C1.4' }
  ],
  tip: 'Ch is two letters that make one sound, /ch/, as in chin. Children may confuse /ch/ with /sh/ or with /j/: have them feel the short puff of air for /ch/. Tap ch once when sounding out (ch-i-n).'
});
Atlas.decodable.add({
  id: 'th', band: '1', name: 'Digraph th', focus: ['th'], key: 'thumb', mark: 'th',
  heart: ['your', 'from', 'my', 'by'],
  words: ['this', 'that', 'then', 'them', 'than', 'thin', 'with', 'path', 'bath', 'math', 'moth', 'thud'],
  title: 'A Moth in the Bath',
  text: ['Seth is in the bath. The bath is hot. Seth has a red ship in the tub.',
    'Then a moth got in. It sat on the tap. Then it sat on the mat. Then it sat on Seth! "Dad!" said Seth. "A moth is on my chin!"',
    'Dad ran in with a cup. "It is a thin moth," said Dad. "It is not bad." Dad got the moth in the cup.',
    'Dad let the moth go on the path. Then Seth sat in the bath, and that was that.'],
  pic: ['house', 'bug', 'cup'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['A moth sat on Seth.', 'Dad got the moth in the cup.', 'Dad let the moth go.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'choice', q: 'Where did Dad let the moth go?', opts: ['in the bath', 'on the path', 'in the cup'], a: 1, code: 'C1.1' },
    { k: 'draw', q: 'Draw the moth on Seth.', a: 'A child in a bath with a moth on his chin. Ask how Seth felt.', code: 'C1.4' }
  ],
  tip: 'Th is one sound with two forms: a buzzy /th/ in this and that, and a quiet /th/ in thin and bath. Both are made with the tongue between the teeth. Watch for th read as /f/ or /d/ (fin for thin, dat for that).'
});
Atlas.decodable.add({
  id: 'wh', band: '1', name: 'Digraph wh', focus: ['wh'], key: 'whale', mark: 'wh',
  heart: ['here', 'give', 'live'],
  words: ['when', 'which', 'whip', 'whim', 'whiz', 'wham', 'whish', 'whet'],
  title: 'Whiz Up, Jet',
  text: ['Jin has a red jet. It is from Nan.',
    'Jin and Nan go up to the top of the path. "When can I let it go?" said Jin. "You can let it go here," said Nan.',
    'Whish! Whiz! Up, up it shot. Then, wham! It hit a log.',
    'Jin ran to the jet. Which bit was hit? Jin had a look. It was not bad. "Let it go, Jin!" said Nan. Whish!'],
  pic: ['plane', 'spruce', 'log'],
  qs: [
    { k: 'choice', q: 'What did the jet hit?', opts: ['a log', 'a hut', 'Nan'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Jin had fun with the jet.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw Jin and Nan on the path.', a: 'Two people on a path, perhaps with a toy jet in the air. Ask where the jet went.', code: 'C1.4' }
  ],
  tip: 'Wh is two letters that make one sound, /w/, as in when (some people add a puff of air). It mostly starts question words: when, which, what. Watch for wh read as /h/ (hen for when).'
});
Atlas.decodable.add({
  id: 'ck', band: '1', name: 'ck at the end', focus: ['ck'], key: 'duck', mark: 'ck',
  heart: ['says', 'does', 'want'],
  words: ['duck', 'back', 'sack', 'rock', 'sock', 'kick', 'lick', 'pick', 'sick', 'luck', 'neck', 'deck', 'pack', 'dock', 'puck'],
  title: 'A Duck on the Dock',
  text: ['Nick sat on the dock with Dad. Nick had a sack with a bun in it.',
    'Quack! A duck got up on the dock. It had a look at the sack. Peck, peck! The duck had the bun!',
    'Then the duck ran to the back of the dock. It sat on a rock and had the bun.',
    '"That duck is quick!" said Dad. Nick did not get mad. "It does want a bun," said Nick. Dad got a bun from his pack. "Do not let the duck get this one!" said Dad.'],
  pic: ['sun', 'duck', 'rock', 'bag'],
  qs: [
    { k: 'choice', q: 'What did the duck get?', opts: ['a sock', 'the bun', 'a rock'], a: 1, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['A duck got up on the dock.', 'The duck had the bun.', 'Dad got a bun from his pack.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'yn', q: 'Nick was mad at the duck.', a: false, code: 'C3.2' }
  ],
  tip: 'Ck says /k/ and comes right after a short vowel at the end of a word (duck, rock). C and k are both there, but it is one sound, so tap it once. Watch for children writing just k (duk) or c (duc).'
});
Atlas.decodable.add({
  id: 'floss', band: '1', name: 'FLOSS: ff ll ss zz', focus: ['ff', 'll', 'ss', 'zz'], key: 'puff, bell, kiss, buzz', mark: 'ff|ll|ss|zz',
  heart: ['full', 'pull', 'push'],
  words: ['puff', 'off', 'cuff', 'huff', 'hill', 'bell', 'fill', 'tell', 'doll', 'kiss', 'mess', 'miss', 'buzz', 'fuzz', 'toss'],
  title: 'Jess and the Hill',
  text: ['Jess and Russ run up a big hill. Jess has a doll in a bag.',
    'At the top, Russ has to puff. "Let us sit," said Jess. Jess set the bag on the hill.',
    'Then the bag fell off the hill! It hit a log and a rock. "My doll!" said Jess. Russ ran to get it. He had to pull the bag up from the mud.',
    'The doll was a mess. Jess did not fuss. "Well, it will get a bath," said Jess.'],
  pic: ['sun', 'hill', 'bag', 'log'],
  qs: [
    { k: 'choice', q: 'What was in the bag?', opts: ['a doll', 'a bell', 'a cup'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Jess set the bag on the hill.', 'The bag fell off the hill.', 'Russ got the bag.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'draw', q: 'Draw the doll in the mud.', a: 'A doll or a bag in mud at the bottom of a hill. Ask the child what Jess will do.', code: 'C1.4' }
  ],
  tip: 'The FLOSS rule: in a short word with a short vowel, f, l, s and z at the end are doubled (puff, hill, mess, buzz). The two letters make one sound. Watch for spelling with one letter (hil, mes); common exceptions are bus, gas, if and yes.'
});
Atlas.decodable.add({
  id: 'all', band: '1', name: 'Glued sound all', focus: ['all'], key: 'ball', mark: 'all',
  heart: ['walk', 'talk', 'water'],
  words: ['all', 'ball', 'call', 'fall', 'hall', 'mall', 'tall', 'wall', 'shall'],
  title: 'The Ball and the Wall',
  text: ['Raj and Bell kick a red ball at a tall wall.',
    'Then Raj did a big kick. The ball shot up, up. It hit the top of the wall, and it did not fall back!',
    '"Where is the ball?" said Bell. Raj had to call, "Is the ball there?" Then a tall man got up on a box. It was Sam Hall, with his dog. Sam had the ball. "Is this your ball?" said Sam.',
    '"Yes!" said Raj. Sam let the ball fall. Bell got it. Then they all had a walk with Sam and his dog.'],
  pic: ['sun', 'house', 'ball', 'dog'],
  qs: [
    { k: 'choice', q: 'What did the ball hit?', opts: ['the top of the wall', 'a man', 'a dog'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Sam was mad at Raj.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw the ball on top of the wall.', a: 'A ball on or over the top of a tall wall. Ask the child who got the ball back.', code: 'C1.4' }
  ],
  tip: 'All is a glued sound: the three letters stick together and say /awl/ as in ball. Teach it as one chunk, not a-l-l. Watch for a read as short /a/ (bal to rhyme with pal).'
});
Atlas.decodable.add({
  "id": "ng",
  "band": "1",
  "name": "Glued sounds ang ing ong ung",
  "focus": [
    "ang",
    "ing",
    "ong",
    "ung"
  ],
  "key": "king",
  "mark": "ang|ing|ong|ung",
  "heart": [
    "only",
    "other"
  ],
  "words": [
    "king",
    "ring",
    "sing",
    "wing",
    "thing",
    "bang",
    "hang",
    "sang",
    "rang",
    "long",
    "song",
    "gong",
    "hung",
    "rung",
    "lung"
  ],
  "title": "Jin and the Gong",
  "text": [
    "Jin has a big gong. Bang! Bong! The gong rang and rang. Jin sang a long song with the gong.",
    "Mom was in bed. She had a nap. Bang! The gong rang. Mom sat up. \"What is that thing?\" said Mom.",
    "Jin hung up the gong. He sat on the bed with Mom. He sang a song to Mom with no gong. Mom had a nap, and Jin did not bang a thing."
  ],
  "pic": [
    "house",
    "bed",
    "gong"
  ],
  "qs": [
    {
      "k": "yn",
      "q": "Mom had a nap.",
      "a": true,
      "code": "C1.1"
    },
    {
      "k": "choice",
      "q": "Why did Mom sit up?",
      "opts": [
        "The gong rang.",
        "The dog ran."
      ],
      "a": 0,
      "code": "C3.2"
    },
    {
      "k": "draw",
      "q": "Draw Jin with the gong.",
      "a": "Jin hitting or holding a gong (a big round metal disc). Ask the child what sound it makes.",
      "code": "C1.4"
    }
  ],
  "tip": "The letters ang, ing, ong and ung are \"glued sounds\": the n and g glue to the vowel and make one nasal sound, so read them as one chunk (k-ing, not k-i-n-g). Watch for the child saying a hard /g/ at the end (sing-guh)."
});
Atlas.decodable.add({
  "id": "nk",
  "band": "1",
  "name": "Glued sounds ank ink onk unk",
  "focus": [
    "ank",
    "ink",
    "onk",
    "unk"
  ],
  "key": "pink",
  "mark": "ank|ink|onk|unk",
  "heart": [
    "friend",
    "many",
    "any"
  ],
  "words": [
    "pink",
    "sink",
    "wink",
    "think",
    "rink",
    "bank",
    "tank",
    "sank",
    "thank",
    "honk",
    "bunk",
    "junk",
    "sunk",
    "dunk",
    "mink"
  ],
  "title": "The Pink Ring",
  "text": [
    "Pam has a pink ring. She had it on at the sink. Pam put the tap on.",
    "The ring fell off. Dink! It sank in the sink. Pam did not yell. She had to think. \"Dad! My pink ring is in the sink!\"",
    "Dad shut the tap off. He got a long thin pin. Dad dug and dug with the pin. He got the ring back!",
    "Pam had a big hug with Dad. \"Thank you!\" she said with a wink."
  ],
  "pic": [
    "house",
    "cup",
    "pan"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "Where did the ring sink?",
      "opts": [
        "in the sink",
        "in the tub",
        "in the cup"
      ],
      "a": 0,
      "code": "C1.1"
    },
    {
      "k": "choice",
      "q": "Why did Pam call Dad?",
      "opts": [
        "The ring was in the sink.",
        "The tap was hot."
      ],
      "a": 0,
      "code": "C3.2"
    },
    {
      "k": "draw",
      "q": "Draw the pink ring in the sink.",
      "a": "A sink with a small ring (ideally coloured pink) in it.",
      "code": "C1.4"
    }
  ],
  "tip": "The letters ank, ink, onk and unk are glued sounds: read each as one chunk (p-ink). The n before k sounds like the ng in sing, not a plain /n/. Watch for the child dropping the n (pik for pink)."
});
Atlas.decodable.add({
  "id": "plural-s",
  "band": "1",
  "name": "Ending -s",
  "focus": [
    "-s"
  ],
  "key": "cats, dogs",
  "mark": "(?<=[a-z])s(?=\\W*$)",
  "heart": [
    "could",
    "would",
    "should"
  ],
  "words": [
    "cats",
    "dogs",
    "hens",
    "pigs",
    "bugs",
    "cups",
    "kids",
    "hats",
    "bells",
    "ducks",
    "logs",
    "pans",
    "sits",
    "runs",
    "nuts"
  ],
  "title": "The Hens and the Fox",
  "text": [
    "Raj has six hens. The hens peck at bugs in the pen. Then the hens nap in the hut.",
    "A fox sits on a hill. It licks its lips. \"Yum,\" the fox thinks. \"Hens!\"",
    "Raj has two dogs. The dogs see the fox. Ruff! Ruff! The fox runs and runs up the hill. It is not back.",
    "\"Thank you, pups!\" said Raj. He pats the dogs. The pups wag and wag, and the hens can nap."
  ],
  "pic": [
    "hill",
    "fox",
    "dog",
    "hen"
  ],
  "qs": [
    {
      "k": "yn",
      "q": "Raj has ten hens.",
      "a": false,
      "code": "C1.1"
    },
    {
      "k": "order",
      "q": "Put the story in order.",
      "items": [
        "The hens peck at bugs.",
        "A fox sits on a hill.",
        "The dogs see the fox."
      ],
      "show": [
        2,
        0,
        1
      ],
      "code": "C3.3"
    },
    {
      "k": "draw",
      "q": "Draw the fox on the hill.",
      "a": "A fox on top of a hill. Ask what the fox wants.",
      "code": "C1.4"
    }
  ],
  "tip": "Adding s means more than one (hens) or tells what one does (runs). Sometimes s sounds like /z/ (dogs, hens) and sometimes /s/ (cats, pups): both are right. Cover the s, read the base word, then add the s."
});
Atlas.decodable.add({
  "id": "blend-start",
  "band": "1",
  "name": "Blends at the start",
  "focus": [
    "bl",
    "st",
    "fr"
  ],
  "key": "frog",
  "mark": "^[^aeiouAEIOU\\W]{2}(?=[aeiou])",
  "heart": [
    "people",
    "again",
    "because"
  ],
  "words": [
    "frog",
    "stop",
    "flag",
    "sled",
    "spot",
    "step",
    "slip",
    "clap",
    "drum",
    "grin",
    "swim",
    "trip",
    "plum",
    "snap",
    "crab"
  ],
  "title": "Fran and the Sled",
  "text": [
    "Fran has a red sled. She drags it up a big hill. Fran is glad. It is a fun hill!",
    "Fran sits on the sled and grips it. Swish! Zip! The sled slips and spins.",
    "Then the sled stops at a big log. Flop! Fran is off the sled. She sits up and grins.",
    "Spot, the dog, trots up. Spot yips. Fran and Spot sit on the sled, and off they go!"
  ],
  "pic": [
    "hill",
    "sled",
    "dog",
    "log"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "What did the sled stop at?",
      "opts": [
        "a log",
        "a rock",
        "a dog"
      ],
      "a": 0,
      "code": "C1.1"
    },
    {
      "k": "yn",
      "q": "Fran had fun on the sled.",
      "a": true,
      "code": "C3.2"
    },
    {
      "k": "draw",
      "q": "Draw Fran and Spot on the sled.",
      "a": "A girl and a dog on a sled, maybe on a hill.",
      "code": "C1.4"
    }
  ],
  "tip": "A blend is two consonants side by side where you still hear both sounds (fr in frog, sl in sled). Have the child say the two sounds quickly, then slide into the vowel. Watch for a dropped sound (fog for frog) or an extra vowel (fuh-rog)."
});
Atlas.decodable.add({
  "id": "blend-end",
  "band": "1",
  "name": "Blends at the end",
  "focus": [
    "nd",
    "mp",
    "st"
  ],
  "key": "hand",
  "mark": "(?<=[aeiou])(nd|nt|mp|st|sk|sp|ft|lt|lk|lp|nch|pt|ct|xt|lf|ld)(?=\\W*$)",
  "heart": [
    "love",
    "done",
    "gone"
  ],
  "words": [
    "hand",
    "jump",
    "nest",
    "tent",
    "camp",
    "lamp",
    "desk",
    "best",
    "help",
    "milk",
    "gift",
    "belt",
    "pond",
    "lunch",
    "dusk"
  ],
  "title": "Camp at the Pond",
  "text": [
    "Deb and Dad camp at a pond. Dad sets up the tent. Deb gets the lamp and the milk.",
    "At dusk, they sit and munch on plums and nuts. Then they get in the tent.",
    "Thump! Bump! Deb grabs Dad's hand. \"What is that?\" Dad gets the lamp. It is an elk!",
    "The elk sniffs the tent. It stamps and huffs. Then it is gone. Deb and Dad grin. \"That was the best camp!\" said Deb."
  ],
  "pic": [
    "moon",
    "pond",
    "tent",
    "elk"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "What is at the tent?",
      "opts": [
        "a fox",
        "an elk",
        "a dog"
      ],
      "a": 1,
      "code": "C1.1"
    },
    {
      "k": "yn",
      "q": "Deb was glad at the end.",
      "a": true,
      "code": "C3.2"
    },
    {
      "k": "draw",
      "q": "Draw the elk at the tent.",
      "a": "A tent with a large animal (an elk) beside it, maybe at night.",
      "code": "C1.4"
    }
  ],
  "tip": "Now the blend is at the end of the word: two consonants where you hear both (nd in hand, mp in lamp). Watch for the last sound being dropped (han for hand, tet for tent)."
});
Atlas.decodable.add({
  "id": "blend-three",
  "band": "1",
  "name": "Three-letter blends",
  "focus": [
    "scr",
    "spl",
    "str"
  ],
  "key": "string",
  "mark": "^(scr|spl|spr|str|squ|thr|shr)",
  "heart": [
    "once",
    "both",
    "eye"
  ],
  "words": [
    "string",
    "strap",
    "split",
    "splash",
    "scrap",
    "scrub",
    "sprint",
    "spring",
    "strip",
    "struck",
    "strum",
    "splat",
    "strong",
    "scruff",
    "sprig"
  ],
  "title": "A Splash at the Dock",
  "text": [
    "Raj and Liz sit on the dock. Liz has a rod with a long string. Raj has a net.",
    "Splash! Liz has a fish on the string! It is a big fish, and it is strong. Liz grips the rod. Raj gets the net.",
    "Then, snap! The string splits. The fish is gone! Liz shrugs. \"That was a strong fish.\"",
    "Raj and Liz strap up the rod. They sprint up the hill to tell Mom. \"It was big!\" said Liz. \"We both felt it!\""
  ],
  "pic": [
    "sun",
    "pond",
    "fish",
    "net"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "What did Liz have on the string?",
      "opts": [
        "a fish",
        "a frog",
        "a cup"
      ],
      "a": 0,
      "code": "C1.1"
    },
    {
      "k": "order",
      "q": "Put the story in order.",
      "items": [
        "Liz has a fish on the string.",
        "The string splits.",
        "Raj and Liz sprint up the hill."
      ],
      "show": [
        1,
        2,
        0
      ],
      "code": "C3.3"
    },
    {
      "k": "yn",
      "q": "Raj and Liz got the fish.",
      "a": false,
      "code": "C3.2"
    }
  ],
  "tip": "Some words start with three consonants that blend (str in string, spl in splash, shr in shrug). Build it up: s-t-r, then str, then add the rest. Watch for a sound left out (sing for string, sash for splash)."
});
Atlas.decodable.add({
  "id": "suffix-ed",
  "band": "1",
  "name": "Ending -ed",
  "focus": [
    "-ed"
  ],
  "key": "jumped, hummed, landed",
  "mark": "ed(?=\\W*$)",
  "heart": [
    "work",
    "word",
    "world"
  ],
  "words": [
    "jumped",
    "hummed",
    "landed",
    "rested",
    "melted",
    "hopped",
    "planted",
    "filled",
    "yelled",
    "packed",
    "kicked",
    "dropped",
    "grabbed",
    "missed",
    "spilled"
  ],
  "title": "The Big Spill",
  "text": [
    "Tam and Mom packed a lunch. They trekked up a hill and stopped at a big rock.",
    "Tam lifted the lid of the jug. Mom handed him a cup. Tam filled it to the top with milk.",
    "Then a frog jumped up on the rock. Tam jumped as well. The cup tipped, and the milk spilled on Mom!",
    "Mom gasped. Then she grinned and dripped. Tam hugged Mom. The frog hopped off to the pond."
  ],
  "pic": [
    "hill",
    "rock",
    "frog",
    "cup"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "What jumped on the rock?",
      "opts": [
        "a frog",
        "a fox",
        "a duck"
      ],
      "a": 0,
      "code": "C1.1"
    },
    {
      "k": "order",
      "q": "Put the story in order.",
      "items": [
        "Tam and Mom packed a lunch.",
        "A frog jumped on the rock.",
        "The milk spilled on Mom."
      ],
      "show": [
        2,
        0,
        1
      ],
      "code": "C3.3"
    },
    {
      "k": "yn",
      "q": "Mom was mad at Tam.",
      "a": false,
      "code": "C3.2"
    }
  ],
  "tip": "The ending -ed means it already happened. It has three sounds: /t/ (jumped), /d/ (filled) and /id/ (landed, after t or d). When a short word ends in one consonant, it doubles before -ed (hop, hopped). Watch for the child reading every -ed as a separate \"ed\" syllable (jump-ed)."
});
Atlas.decodable.add({
  "id": "suffix-ing",
  "band": "1",
  "name": "Ending -ing",
  "focus": [
    "-ing"
  ],
  "key": "jumping",
  "mark": "ing(?=\\W*$)",
  "heart": [
    "mother",
    "brother",
    "father"
  ],
  "words": [
    "jumping",
    "running",
    "sitting",
    "hopping",
    "fishing",
    "resting",
    "helping",
    "digging",
    "swimming",
    "camping",
    "kicking",
    "missing",
    "yelling",
    "singing",
    "picking"
  ],
  "title": "Fishing with Father",
  "text": [
    "Jin and his father are sitting on the dock. They are fishing. Jin's brother is swimming in the pond.",
    "Jin is humming. Then the rod is jumping! \"I have a fish!\" Jin is yelling.",
    "Father is helping. Jin is tugging and tugging. Up pops a big fish... no! It is a wet cap.",
    "It is a swimming cap. His brother is grinning. \"That is my cap! I was missing it!\" Jin and Father are fishing again."
  ],
  "pic": [
    "sun",
    "pond",
    "fish",
    "hat"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "Who is swimming?",
      "opts": [
        "Jin",
        "his brother",
        "his father"
      ],
      "a": 1,
      "code": "C1.1"
    },
    {
      "k": "choice",
      "q": "Why is his brother grinning?",
      "opts": [
        "He got his cap back.",
        "He got a big fish."
      ],
      "a": 0,
      "code": "C3.2"
    },
    {
      "k": "draw",
      "q": "Draw Jin and the wet cap.",
      "a": "Jin with a fishing rod and a wet swimming cap on the line.",
      "code": "C1.4"
    }
  ],
  "tip": "The ending -ing means it is happening now. Cover -ing, read the base word, then add it back. When a short word ends in one consonant, it doubles before -ing (swim, swimming). Watch for the child reading a doubled letter as two sounds (swim-ming is right; swimm-ing is not a new sound)."
});
Atlas.decodable.add({
  "id": "suffix-es",
  "band": "1",
  "name": "Ending -es",
  "focus": [
    "-es"
  ],
  "key": "boxes",
  "mark": "(?<=(s|x|z|ch|sh))es(?=\\W*$)",
  "heart": [
    "goes",
    "shoe"
  ],
  "words": [
    "boxes",
    "foxes",
    "wishes",
    "dishes",
    "brushes",
    "benches",
    "lunches",
    "glasses",
    "kisses",
    "buzzes",
    "fixes",
    "mixes",
    "rushes",
    "inches",
    "dresses"
  ],
  "title": "Dishes and Wishes",
  "text": [
    "Gran has a big stack of dishes in the sink. Liz rushes in. \"I can help!\"",
    "Liz scrubs the dishes and the cups. She mixes in lots of suds. Then she brushes the pots and pans.",
    "A big dish slips. Crash! It smashes. Liz gasps. \"It is not a big thing,\" said Gran. She gets the bits up.",
    "Then Gran kisses Liz. \"You are a big help. You get a wish!\" Liz wishes to nap!"
  ],
  "pic": [
    "house",
    "pot",
    "pan",
    "cup"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "What did Liz brush?",
      "opts": [
        "the pots and pans",
        "the dog",
        "the bus"
      ],
      "a": 0,
      "code": "C1.1"
    },
    {
      "k": "yn",
      "q": "Gran was mad at Liz.",
      "a": false,
      "code": "C3.2"
    },
    {
      "k": "write",
      "q": "What is a job you can do to help?",
      "a": "Any real job, for example: I can set the plates. I can fill the dog dish.",
      "code": "C2.5"
    }
  ],
  "tip": "After s, x, z, ch and sh we add -es, not just -s, because you can hear an extra beat (box, box-es). Clap the beats with the child. Watch for the child reading -es as a long \"ees\"."
});
Atlas.decodable.add({
  "id": "tch",
  "band": "1",
  "name": "tch after a short vowel",
  "focus": [
    "tch"
  ],
  "key": "catch",
  "mark": "tch",
  "heart": [
    "watch",
    "wash"
  ],
  "words": [
    "catch",
    "match",
    "patch",
    "hatch",
    "pitch",
    "ditch",
    "switch",
    "stitch",
    "fetch",
    "sketch",
    "notch",
    "hutch",
    "clutch",
    "crutch",
    "itch"
  ],
  "title": "Fetch, Rex!",
  "text": [
    "Kim has a big dog, Rex. Kim pitches a stick. Rex can catch it. Then he fetches it back.",
    "Kim pitches the stick past the ditch. Rex dashes and jumps. Splash! He is in the ditch.",
    "Rex gets up with a big patch of mud on his back. He snatches the stick and runs to Kim. Then he flings mud on Kim! Splat!",
    "Kim has to wash Rex. \"Next, we can catch on the grass, not in the ditch,\" said Kim. Rex just wags."
  ],
  "pic": [
    "sun",
    "dog",
    "pond"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "Where did Rex land?",
      "opts": [
        "in a ditch",
        "in a tent",
        "in a bed"
      ],
      "a": 0,
      "code": "C1.1"
    },
    {
      "k": "yn",
      "q": "Rex had mud on his back.",
      "a": true,
      "code": "C1.1"
    },
    {
      "k": "draw",
      "q": "Draw Rex in the ditch.",
      "a": "A muddy dog in a ditch or water, maybe with a stick.",
      "code": "C1.4"
    }
  ],
  "tip": "Right after a short vowel, the /ch/ sound at the end is spelled tch (catch, ditch). The t is silent: it just protects the short vowel. Watch for the child saying a /t/ (cat-ch) or spelling it ch."
});
Atlas.decodable.add({
  "id": "dge",
  "band": "1",
  "name": "dge after a short vowel",
  "focus": [
    "dge"
  ],
  "key": "bridge",
  "mark": "dge",
  "heart": [
    "very",
    "every"
  ],
  "words": [
    "bridge",
    "edge",
    "ledge",
    "hedge",
    "badge",
    "fudge",
    "judge",
    "nudge",
    "smudge",
    "ridge",
    "lodge",
    "dodge",
    "budge",
    "wedge",
    "fridge"
  ],
  "title": "At the Lodge",
  "text": [
    "Meg and Gran stand on a bridge at the edge of a pond. Meg has a bag of fudge.",
    "\"Look!\" said Gran. A big hump of sticks and mud sits in the pond. \"That is a lodge. Kits live in it.\"",
    "Meg sits at the edge of the bridge. A wet kit swims up to a ledge. It has a smudge of mud on its chin. Meg is very still. She does not budge.",
    "Then the kit slips back in the lodge. Meg has a bit of fudge. \"That was the best!\" she said."
  ],
  "pic": [
    "bridge",
    "pond",
    "beaver"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "What is in the pond?",
      "opts": [
        "a lodge",
        "a bus",
        "a tent"
      ],
      "a": 0,
      "code": "C1.1"
    },
    {
      "k": "yn",
      "q": "Meg did not want the kit to swim off.",
      "a": true,
      "code": "C3.2"
    },
    {
      "k": "draw",
      "q": "Draw the kit and the lodge.",
      "a": "A small beaver near a mound of sticks and mud in water. (A kit is a baby beaver.)",
      "code": "C1.4"
    }
  ],
  "tip": "Right after a short vowel, the /j/ sound at the end is spelled dge (edge, fudge). The d and e are silent helpers. A beaver home is a lodge, and a baby beaver is a kit: tell the child before reading. Watch for the child saying a /d/ (fud-ge)."
});
Atlas.decodable.add({
  "id": "two-closed",
  "band": "1",
  "name": "Two closed syllables",
  "focus": [
    "VC/CV"
  ],
  "key": "nap-kin",
  "mark": "",
  "heart": [
    "great",
    "break"
  ],
  "words": [
    "napkin",
    "rabbit",
    "kitten",
    "mitten",
    "basket",
    "picnic",
    "sunset",
    "insect",
    "problem",
    "contest",
    "dentist",
    "puppet",
    "muffin",
    "cactus",
    "pumpkin"
  ],
  "title": "A Picnic at Sunset",
  "text": [
    "Tobin and his Kokum had a picnic at sunset. Kokum had a basket of bannock and muffins.",
    "They sat on a rug next to a pond. A rabbit hopped past. Tobin had a napkin on his lap.",
    "Then a big insect landed on the bannock! Tobin did not panic. Kokum let it sit. It had a bit, and then it was gone.",
    "The sunset was pink and red. Tobin had a muffin. \"This is a great picnic,\" he said."
  ],
  "pic": [
    "sun",
    "pond",
    "basket",
    "rabbit"
  ],
  "qs": [
    {
      "k": "choice",
      "q": "What did Kokum have in the basket?",
      "opts": [
        "bannock and muffins",
        "fish and chips"
      ],
      "a": 0,
      "code": "C1.1"
    },
    {
      "k": "yn",
      "q": "Tobin was upset with the insect.",
      "a": false,
      "code": "C3.2"
    },
    {
      "k": "draw",
      "q": "Draw the picnic at sunset.",
      "a": "Two people on a rug with a basket, a setting sun, perhaps a rabbit or a bug.",
      "code": "C1.4"
    }
  ],
  "tip": "A long word with two consonants in the middle splits between them (nap-kin, sun-set). Each part is a closed syllable with a short vowel. Have the child box each part, read them, then blend. Kokum is a Cree word for grandmother; bannock is a bread."
});
Atlas.decodable.add({
  id: 'a-e', band: '1', name: 'Silent e: a_e', focus: ['a_e'], key: 'cake',
  mark: 'a(?=[^aeiou\\W]e\\b)|(?<=a[^aeiou\\W])e\\b',
  heart: ['whole', 'move'],
  words: ['cake', 'bake', 'lake', 'gate', 'plate', 'name', 'made', 'game', 'tape', 'cape', 'wave', 'safe', 'shade', 'grape', 'snake'],
  title: 'Jake Bakes a Cake',
  text: ['Jake and his mom bake a cake. Jake mixes and Mom checks the pan. The cake is tan and fat. It has a red jam top.',
    'Then Jake and Mom take the cake to the lake. Gran is at the gate. Jake sets the cake on a plate.',
    'Rex the dog wags and sniffs. Rex wants a lick! Jake grabs the plate fast. "Not this cake, Rex!" he yells.',
    'Gran gets a big plate of cake. Jake gets a plate. Rex gets a snack in his dish. The cake is safe at last.'],
  pic: ['sun', 'pond', 'dog', 'cake'],
  qs: [
    { k: 'yn', q: 'Jake and Mom bake a cake.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Jake grab the plate?', opts: ['Rex wants a lick.', 'The plate is hot.', 'Gran is sad.'], a: 0, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Jake and Mom bake a cake.', 'Rex wants a lick.', 'Gran gets cake.'], show: [2, 0, 1], code: 'C3.3' }
  ],
  tip: 'A silent e at the end makes the a say its name, /ay/, as in cake. The e makes no sound. Write cap, then add an e to make cape, and let the child hear the change. Watch for cake read as "cak", or for the e being sounded out.'
});
Atlas.decodable.add({
  id: 'i-e', band: '1', name: 'Silent e: i_e', focus: ['i_e'], key: 'bike',
  mark: 'i(?=[^aeiou\\W]e\\b)|(?<=i[^aeiou\\W])e\\b',
  heart: ['buy', 'busy'],
  words: ['bike', 'kite', 'time', 'line', 'pine', 'ride', 'hide', 'five', 'dime', 'smile', 'slide', 'white', 'stripe', 'prize', 'wide'],
  title: 'Mike and the Kite',
  text: ['Mike has a fine white kite. It has a red stripe on the side. Mike and his dad ride bikes to the hill.',
    'Mike runs fast and lets the kite rise up on its line. It drifts up, up, up! Then the kite dips and lands in a pine.',
    'Mike is sad. Dad smiles. "It is fine. I can get it." Dad grabs a long stick and taps the kite. It drops in the grass.',
    'Mike grins. "Time to let it rise!"'],
  pic: ['bike', 'hill', 'spruce', 'kite'],
  qs: [
    { k: 'yn', q: 'The kite lands in a pine.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why is Mike sad?', opts: ['The kite is in a pine.', 'His bike is lost.', 'It is wet.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Mike and the white kite.', a: 'Mike holding the line of a white kite with a red stripe, on a hill. Ask the child to tell you what is happening.', code: 'C1.4' }
  ],
  tip: 'A silent e at the end makes the i say its name, /eye/, as in bike. Compare pin and pine, kit and kite. Watch for the short sound (kit for kite): have the child look at the end of the word before reading it.'
});
Atlas.decodable.add({
  id: 'o-e', band: '1', name: 'Silent e: o_e', focus: ['o_e'], key: 'rope',
  mark: 'o(?=[^aeiou\\W]e\\b)|(?<=o[^aeiou\\W])e\\b',
  heart: ['front', 'month'],
  words: ['bone', 'home', 'hole', 'rope', 'nose', 'hose', 'rose', 'joke', 'pole', 'stone', 'stove', 'note', 'robe', 'globe', 'smoke'],
  title: 'Dot and the Bone',
  text: ['Rose has a dog. The dog is Dot. Dot has a big bone. Dot will not let go of the bone.',
    'Dot digs a hole by the pond. She drops the bone in the hole. Then she runs home.',
    'At home, Dot is sad. She wants the bone back! Rose and Dot go back to the pond. Dot sniffs with a wet nose. She digs and digs.',
    'Dot gets the bone, and then she rolls in the mud. Rose has to hose Dot off at home. "You and your bone," Rose jokes.'],
  pic: ['dog', 'bone', 'pond', 'house'],
  qs: [
    { k: 'yn', q: 'Dot digs a hole.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Where did Dot drop the bone?', opts: ['in a hole', 'in a box', 'in the bed'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why did Rose hose Dot?', opts: ['Dot rolls in mud.', 'Dot is hot.', 'Dot is sad.'], a: 0, code: 'C3.2' }
  ],
  tip: 'A silent e at the end makes the o say its name, /oh/, as in rope. Compare hop and hope, not and note. Watch for the short sound (rop for rope), and for words like come, some and love, which look the same but are heart words.'
});
Atlas.decodable.add({
  id: 'u-e', band: '1', name: 'Silent e: u_e and e_e', focus: ['u_e', 'e_e'], key: 'cube, these',
  mark: '[ue](?=[^aeiou\\W]e\\b)|(?<=[ue][^aeiou\\W])e\\b',
  heart: ['sure', 'sugar'],
  words: ['cube', 'cute', 'mule', 'tube', 'fume', 'June', 'rule', 'flute', 'tune', 'use', 'dune', 'these', 'theme', 'complete'],
  title: 'June and the Flute',
  text: ['June has a flute. It is a cute, slim flute. June can use it to make a tune. Pete has a drum.',
    'These two kids are in a band at camp. At five, the band must fill the hall with tunes.',
    'But June huffs and puffs, and the flute is mute! June is upset. Pete checks the flute. A fat bug is stuck in it!',
    'Pete gets the bug and lets it go in the grass. June huffs. The tune is back, and it is a fine one.'],
  pic: ['tent', 'drum', 'bug'],
  qs: [
    { k: 'yn', q: 'A bug is stuck in the flute.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What was in the flute?', opts: ['a bug', 'a cube', 'a mule'], a: 0, code: 'C1.1' },
    { k: 'write', q: 'What can you make a tune on?', a: 'Any answer from the child\'s life: a drum, a pot and a spoon, a piano, singing. Help write one short sentence.', code: 'C2.5' }
  ],
  tip: 'A silent e makes the u say its name, as in cube (/yoo/) or June (/oo/), and makes the e say its name, as in these. Compare cub and cube, them and theme. Watch for the short sound (cub for cube): have the child look at the end of the word first.'
});
Atlas.decodable.add({
  id: 'open', band: '1', name: 'Open syllables', focus: ['go', 'me', 'hi'], key: 'go, ro-bot',
  mark: '',
  heart: ['over', 'open', 'even', 'most'],
  words: ['go', 'so', 'no', 'me', 'he', 'she', 'we', 'be', 'hi', 'tuba', 'sofa', 'panda', 'pasta', 'zebra', 'tuna'],
  title: 'Mila and the Panda',
  text: ['Mila has a stuffed panda. It is soft and black and white. Mila takes it to bed.',
    'At lunch, Mila sets the panda on the sofa. She has pasta and tuna. "Hi, Panda," she said.',
    'Then the panda is gone! Mila hunts in the den, on the bed and in the tub. No panda! She is so sad.',
    'Dad grins. "Go and check the sofa." Mila digs in the back of the sofa. The panda is stuck in it! "So that is where you went," Mila said. She hugs the panda, and the two of them nap on the sofa.'],
  pic: ['bear', 'pot', 'bed'],
  qs: [
    { k: 'yn', q: 'Mila has a panda.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Where was the panda?', opts: ['in the sofa', 'in the tub', 'on the bed'], a: 0, code: 'C1.1' },
    { k: 'write', q: 'What do you take to bed?', a: 'Any answer from the child\'s life: a stuffed toy, a blanket, a book. Help write one short sentence.', code: 'C2.5' }
  ],
  tip: 'An open syllable ends with a vowel, so nothing closes it in and the vowel says its name: go, me, hi, and the first part of ro-bot. At the end of a longer word, a often says a quiet /uh/, as in sofa and panda. Watch for go read as "got": point to the end of the word.'
});
Atlas.decodable.add({
  id: 'y-vowel', band: '1', name: 'y as a vowel', focus: ['y'], key: 'my, happy',
  mark: '(?<=[^aeiou\\W])y\\b',
  heart: ['pretty', 'ready'],
  words: ['my', 'fly', 'try', 'cry', 'dry', 'sky', 'shy', 'happy', 'funny', 'puppy', 'sunny', 'silly', 'bunny', 'jelly', 'candy'],
  title: 'The Silly Puppy',
  text: ['Andy has a puppy. The puppy is fluffy and silly. His name is Fudge.',
    'It is sunny and gusty. Andy and Fudge go up the hill. Andy has a red kite. "Let me try it," he said. The kite rises up in the sky.',
    'Fudge yips and jumps. He wants the kite! He tugs the line, and the kite drops in a muddy ditch.',
    'Andy is not happy. Fudge is very muddy. Then Andy has to smile. "You silly pup. Let us go home and get dry."'],
  pic: ['hill', 'dog', 'kite'],
  qs: [
    { k: 'yn', q: 'Fudge is a puppy.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why is Andy not happy?', opts: ['The kite is in a muddy ditch.', 'It is sunny.', 'Fudge is lost.'], a: 0, code: 'C3.2' },
    { k: 'choice', q: 'Which word ends like sky?', opts: ['dry', 'silly', 'sun'], a: 0, code: 'C3.1' }
  ],
  tip: 'At the end of a short word, y says /eye/ (my, sky). At the end of a longer word, it says /ee/ (happy, puppy). At the start of a word, y is still a consonant (yes, yell). Watch for happy read as "happ-eye".'
});
Atlas.decodable.add({
  id: 'soft-cg', band: '1', name: 'Soft c and soft g', focus: ['ce', 'ci', 'ge'], key: 'city, page',
  mark: 'c(?=[eiy])|g(?=e\\b)',
  heart: ['listen', 'often'],
  words: ['city', 'cent', 'face', 'ice', 'dance', 'fence', 'pencil', 'rice', 'race', 'spicy', 'page', 'cage', 'huge', 'stage', 'bulge'],
  title: 'Vince Can Dance',
  text: ['Vince is in a dance at the city hall. His pal Nancy is in it as well. She has a fancy red dress. They dance on a huge stage.',
    'Vince is upset. He cannot dance! His legs get mixed up, and he trips on Nancy\'s dress.',
    'Nancy grins. "Just have fun. Skip, spin and clap. That is a dance!" The drum thumps. Vince skips and spins. He claps and stamps.',
    'At the end, the hall is full of clapping. Vince has a big, silly grin. "I can dance!" he said. "Since when?" Nancy jokes.'],
  pic: ['moon', 'house', 'drum'],
  qs: [
    { k: 'yn', q: 'Vince trips on Nancy\'s dress.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What did Nancy tell Vince?', opts: ['Just have fun.', 'Go home.', 'Sit still.'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Vince is glad at the end.', a: true, code: 'C3.2' }
  ],
  tip: 'C says /s/ when e, i or y comes next (city, dance, fancy). G often says /j/ before e (page, huge, large). Before a, o and u they keep their hard sounds (cat, go). Watch for city read as "kitty": check the letter after the c.'
});
Atlas.decodable.add({
  id: 'ar', band: '1', name: 'r-controlled ar', focus: ['ar'], key: 'car', mark: 'ar',
  heart: ['warm', 'war'],
  words: ['car', 'star', 'jar', 'farm', 'barn', 'park', 'dark', 'shark', 'cart', 'yard', 'art', 'smart', 'hard', 'march', 'garden'],
  title: 'Star in the Dark',
  text: ['Marta lives on a big farm. In the barn, there is a cat named Star.',
    'It is dark, and Star is not in the barn. Marta gets a lamp and hunts in the yard. She checks the cart and the garden. No Star!',
    'Then Marta spots a box in the back of the car. Star is in the box with six tiny kits! Marta can not stop smiling.',
    'Marta is so glad. She sets a soft rug in the barn. Star and the kits will be safe and warm.'],
  pic: ['moon', 'house', 'van', 'cat'],
  qs: [
    { k: 'yn', q: 'Star is a dog.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Where is Star?', opts: ['in the car', 'in the barn', 'in the garden'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw Star and the kits in the box.', a: 'A cat with several small kittens in a box, perhaps in the back of a car. Ask the child to tell you about the picture.', code: 'C1.4' }
  ],
  tip: 'When r comes after a, the two letters make one new sound, /ar/, as in car. The r is "bossy": the a is not short any more. Watch for the a read as short (cat-r): have the child say /ar/ as one sound.'
});
Atlas.decodable.add({
  id: 'or', band: '1', name: 'r-controlled or', focus: ['or', 'ore'], key: 'corn, store', mark: 'ore?',
  heart: ['door', 'floor'],
  words: ['corn', 'fork', 'horn', 'north', 'storm', 'sport', 'short', 'fort', 'born', 'torn', 'store', 'more', 'shore', 'snore', 'core'],
  title: 'A Storm up North',
  text: ['Jordan and Gran go to a cabin up north. It is a short trip. They pack corn, a pot and a fork.',
    'At the shore, the sky gets dark. A storm is coming! Gran and Jordan run to the cabin and shut the door. The storm thumps on the cabin.',
    'Gran gets the corn and the pot. They munch hot corn and tell jokes. Then Gran snores on the cot! Jordan grins. The storm is not so bad.',
    'The next morning, the storm is gone. Jordan and Gran go back to the shore. It is still and calm.'],
  pic: ['cloud', 'rain', 'house', 'pot'],
  qs: [
    { k: 'yn', q: 'Gran snores on the cot.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['A storm is coming.', 'Jordan and Gran munch corn.', 'The storm is gone.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'write', q: 'What do you do in a storm?', a: 'Any answer from the child\'s life: stay inside, read, play a game, hug a grown-up. Help write one short sentence.', code: 'C2.5' }
  ],
  tip: 'When r comes after o, the two letters make one sound, /or/, as in corn. An e after or (store, more) is silent and does not change the sound. Watch for the o read as short (cot-r), and for or read as "ro" (from for for).'
});
Atlas.decodable.add({
  id: 'er-ir-ur', band: '1', name: 'r-controlled er ir ur', focus: ['er', 'ir', 'ur'], key: 'her, bird, fur', mark: 'er|ir|ur',
  heart: ['learn', 'early', 'earth', 'heard'],
  words: ['her', 'fern', 'bird', 'girl', 'first', 'shirt', 'dirt', 'fur', 'burn', 'turn', 'hurt', 'church', 'perch', 'curl', 'stir'],
  title: 'The Hurt Bird',
  text: ['Kirsten and her dad go on a walk in the park. Under a big fern, Kirsten spots a bird. It sits in the dirt. Its wing is hurt, and it cannot fly.',
    'Dad gets a box. Kirsten sets her soft shirt in it. They take the bird to the vet.',
    'The vet fixes the wing. In a month, the bird is better.',
    'Kirsten and Dad let it go in the park. First it chirps. Then it flaps, turns and lands on a birch. Kirsten is so happy.'],
  pic: ['maple', 'bird', 'box'],
  qs: [
    { k: 'yn', q: 'The bird has a hurt wing.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What did Kirsten put in the box?', opts: ['her shirt', 'a fern', 'a nut'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why did they let the bird go?', opts: ['It is better.', 'It is lost.', 'It bit Dad.'], a: 0, code: 'C3.2' }
  ],
  tip: 'Er, ir and ur all make the same sound, /er/, as in her, bird and fur. The child cannot hear which spelling to use, so for reading just say /er/ for all three. Watch for the vowel read as short (bi-r-d) instead of one /er/ sound.'
});
Atlas.decodable.add({
  id: 'ai-ay', band: '2', name: 'Vowel team ai ay', focus: ['ai', 'ay'], key: 'rain, day', mark: 'ai|ay',
  heart: ['their', 'eight'],
  words: ['rain', 'train', 'paint', 'snail', 'tail', 'mail', 'wait', 'sail', 'day', 'play', 'stay', 'tray', 'hay', 'clay', 'pay'],
  title: 'A Rainy Day',
  text: ['It is a rainy day. Raj and his sister Kayla want to sail on the lake, but rain drips on the deck.',
    '"We can not sail in this rain," said Kayla. "Let us stay in and paint," said Mom. She gets a tray of paints.',
    'Raj paints a train with a long red tail of cars. Kayla paints a snail on a big rock. Then Raj tips his cup, and water spills on the train. The paint runs! Raj is upset. He wants to toss it in the bin.',
    '"Wait!" said Kayla. "It is like a train in the rain." Raj grins. He adds rain to Kayla\'s snail as well.',
    'At the end of the day, the sun is back. But Raj and Kayla stay in. They are still painting.'],
  pic: ['cloud', 'rain', 'house', 'train'],
  qs: [
    { k: 'yn', q: 'Raj spills water on the train.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Rain drips.', 'Raj paints a train.', 'Water spills on the train.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'Which word ends like rain?', opts: ['train', 'tail', 'tray'], a: 0, code: 'C3.1' }
  ],
  tip: 'Ai and ay both say the name of a, /ay/. Ai comes in the middle of a word (rain), and ay comes at the end (day). When two vowels go together, the first one usually says its name. Watch for each letter sounded on its own (ra-in) instead of one sound.'
});
Atlas.decodable.add({
  id: 'ee-ea', band: '2', name: 'Vowel team ee ea ey', focus: ['ee', 'ea', 'ey'], key: 'tree, seal, key', mark: 'ee|ea|ey',
  heart: ['head', 'bread'],
  words: ['tree', 'bee', 'feet', 'green', 'sleep', 'sheep', 'seal', 'beach', 'team', 'leaf', 'eat', 'read', 'key', 'sea', 'week'],
  title: 'The Seal on the Beach',
  text: ['Lee and his gran go to the beach by the sea. It is a clear, sunny morning. They see green weeds and black rocks.',
    'On a big rock, Lee spots a seal. It is fast asleep in the heat. Its fur is wet and sleek.',
    'Lee wants to creep up and pet it. "Keep back," said Gran. "A seal needs space. This is its home. We can see it from here."',
    'So Lee and Gran sit on a log and eat a snack. They munch bread and jam and keep still.',
    'Then the seal lifts its head. It slips in the sea with a big splash. Lee waves. "See you, Seal!" The seal\'s sleek head pops up. Then it is gone.'],
  pic: ['sun', 'rock', 'log'],
  qs: [
    { k: 'yn', q: 'The seal is asleep on a rock.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Gran say, "Keep back"?', opts: ['The seal needs space.', 'The rock is hot.', 'It is late.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What can you see at a beach?', a: 'Any answer: sand, shells, waves, rocks, birds, boats. Help write one short sentence.', code: 'C2.5' }
  ],
  tip: 'Ee and ea usually say the name of e, /ee/, as in tree and seal. Ey at the end of a word often says /ee/ too, as in key. Watch for ea in heart words like head and bread, where it says /e/: tell the child these are the odd ones out.'
});
Atlas.decodable.add({
  id: 'oa-ow', band: '2', name: 'Vowel team oa ow oe', focus: ['oa', 'ow', 'oe'], key: 'boat, snow, toe', mark: 'oa|ow|oe',
  heart: ['four', 'pour'],
  words: ['boat', 'coat', 'goat', 'road', 'toad', 'soap', 'loaf', 'snow', 'grow', 'slow', 'blow', 'show', 'bowl', 'toe'],
  title: 'Joan and the Goat',
  text: ['Joan lives by a lake in the North. Snow fell all week. The lake froze, and the road was white with snow.',
    'Joan put on her coat and her toque. She got her sled and her goat, Flo. Flo can pull a sled! They went slow up the road, and the snow did blow.',
    'At the end of the road, they met Gran. Gran had a bowl of oats and a loaf of bannock. Flo ate the oats. Then Flo ate the soap by the sink!',
    '"Flo, soap is not a snack!" said Joan. Gran grinned. Then they all sat by the stove, and Joan got the snow off her toes.'],
  pic: ['snow', 'goat', 'sled', 'house'],
  qs: [
    { k: 'yn', q: 'Flo is a goat.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What did Flo eat by the sink?', opts: ['soap', 'a coat', 'a boat'], a: 0, code: 'C1.1' },
    { k: 'order', items: ['Joan put on her coat.', 'Joan and Flo went up the road.', 'Flo ate the soap.'], show: [2, 0, 1], q: 'Number the sentences in order.', code: 'C3.3' }
  ],
  tip: 'The letters oa, ow and oe all say the long o sound, as in boat, snow and toe. A vowel team is two letters that make one sound. Watch for ow read as in cow: in this story it always says long o, so ask "Does it make sense?"'
});
Atlas.decodable.add({
  id: 'igh-ie', band: '2', name: 'Vowel team igh ie', focus: ['igh', 'ie'], key: 'light, pie', mark: 'igh|ie',
  heart: ['through', 'though'],
  words: ['light', 'night', 'right', 'bright', 'high', 'sight', 'tight', 'flight', 'might', 'pie', 'tie', 'lie', 'sigh', 'thigh'],
  title: 'Lights in the Night',
  text: ['It was late at night. Ben could not sleep. He lay in bed for a long time, but he was not sleepy. So he got up to look at the sky.',
    'The sky was bright! Green and pink light swept high over the trees. It went this way and that way. Ben ran to Mom. "Mom, the sky is lit up!" he cried.',
    'Mom smiled. "That is the Northern Lights," she said. "My granny said the lights are a gift. We do not yell at them. We just sit and look."',
    'So they sat on the deck, tight in a quilt, with hot tea and a slice of pie. What a sight! At last the light got dim, and Ben got sleepy. "Night, night, lights," he said.'],
  pic: ['star', 'moon', 'spruce', 'house'],
  qs: [
    { k: 'choice', q: 'What did Ben see in the sky?', opts: ['bright lights', 'a kite', 'rain'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'How did Ben feel at the end?', opts: ['sleepy', 'mad', 'sad'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What is in the sky at night where you live?', a: 'Any true answer, such as the moon, stars, clouds or lights. Ask the child to read back what they wrote.', code: 'C2.5' }
  ],
  tip: 'The letters igh say the long i sound, as in light: the g and h are silent. At the end of a short word, ie also says long i, as in pie and tie. Watch for the child sounding out the g and h; teach igh as one chunk.'
});
Atlas.decodable.add({
  id: 'oo-moon', band: '2', name: 'oo as in moon', focus: ['oo'], key: 'moon', mark: 'oo',
  heart: ['soup', 'group'],
  words: ['moon', 'spoon', 'food', 'room', 'boot', 'cool', 'pool', 'zoo', 'too', 'broom', 'roof', 'tooth', 'noon', 'scoop', 'hoot'],
  title: 'The Loon at Noon',
  text: ['At noon, Zoe and her granny went to the dock by the lake. The sun was hot, but the water was cool.',
    'Zoe had soup in a cup and a spoon for lunch. Then a loon swam up to the dock. It had a black head and a white neck. It did not swim off. It just sat and looked at the soup.',
    '"Too bad, loon," said Zoe. "Soup is food for me. You can dive and get a fish!" The loon gave a long, low hoot, and then it was gone, down under the water.',
    'Soon it came up with a fish in its beak. Zoe grinned. "You see? Fish is food for you." That night, under the moon, the loon called from the lake, and Zoe smiled in her room.'],
  pic: ['sun', 'loon', 'fish', 'cup'],
  qs: [
    { k: 'yn', q: 'The loon ate the soup.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why did the loon dive?', opts: ['to get food', 'to see the moon', 'to swim to Zoe'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the loon with a fish.', a: 'A loon (a black bird with a white pattern) on the water with a fish in its beak. Ask the child to tell you what happened just before.', code: 'C1.4' }
  ],
  tip: 'The letters oo usually say /oo/ as in moon. A few common words (book, look, good) use a shorter oo sound, which comes on the next page. If the child reads a word with the wrong oo sound, have them try the other one and check which makes a real word.'
});
Atlas.decodable.add({
  id: 'oo-book', band: '2', name: 'oo as in book', focus: ['oo'], key: 'book', mark: 'oo',
  heart: ['blood', 'flood'],
  words: ['book', 'cook', 'look', 'took', 'hook', 'good', 'wood', 'foot', 'stood', 'shook', 'brook', 'hood', 'wool'],
  title: 'A Good Hike',
  text: ['Kofi and his granny went for a hike in the woods. Kofi had his good boots, his hood and a wool hat. Granny had a book in her bag.',
    'By a brook, they stopped at a big tree. "Look at the leaf," said Granny. Kofi took a look in the book. "It is a birch!" he said. "Good!" said Granny.',
    'Then Kofi\'s foot slipped on a wet rock, and he fell in the brook! Splash! Kofi stood up. His boots and socks were wet.',
    'Granny lit dry wood in a ring of rocks. She hung the wet socks by the flames. Then she cooked bannock on a stick. Kofi shook his feet dry and had a big bite. "Wet feet and good food," he said. "This is a good hike."'],
  pic: ['spruce', 'rock', 'fire', 'book'],
  qs: [
    { k: 'choice', q: 'What did Kofi slip on?', opts: ['a wet rock', 'a book', 'a log'], a: 0, code: 'C1.1' },
    { k: 'order', items: ['Kofi took a look in the book.', 'Kofi fell in the brook.', 'Granny cooked bannock.'], show: [1, 2, 0], q: 'Number the sentences in order.', code: 'C3.3' },
    { k: 'write', q: 'What would you cook on a stick?', a: 'Any sensible food, such as bannock, hot dogs or fish. Help with spelling of harder words.', code: 'C2.5' }
  ],
  tip: 'The letters oo can also say the short sound in book, as well as the long sound in moon. There is no rule for which one: the child tries one, and if it is not a real word, tries the other. Common short-oo words are book, look, took, good, wood, foot and stood.'
});
Atlas.decodable.add({
  id: 'ou-ow', band: '2', name: 'ou and ow as in cloud and cow', focus: ['ou', 'ow'], key: 'cloud, cow', mark: 'ou|ow',
  heart: ['our', 'hour'],
  words: ['cloud', 'loud', 'out', 'shout', 'round', 'ground', 'sound', 'found', 'mouth', 'south', 'proud', 'count', 'pouch', 'scout'],
  title: 'Cows and Clouds',
  text: ['Amir and his sister Nell live on a farm on the Prairies. One hot day, they went out to feed the cows.',
    'Then a big, dark cloud came up from the south. There was a loud sound. Boom! Thunder! "Get the cows in!" Amir shouted.',
    'Nell ran round the pond, and Amir ran down to the creek. They found the cows and got them to the barn. Then Amir counted them: one, two, three, four, five, six. All six cows were in, safe and sound.',
    'Just then the rain came down, and it hit the ground hard. Amir and Nell sat on the couch with Dad. Nell was proud. "We did it!" she said. Outside, the storm was loud, but the cows were dry.'],
  pic: ['cloud', 'rain', 'house'],
  qs: [
    { k: 'choice', q: 'Where did the dark cloud come from?', opts: ['the south', 'the barn', 'the pond'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Amir and Nell found the cows.', a: true, code: 'C1.1' },
    { k: 'write', q: 'How did Nell feel at the end? Why?', a: 'Proud, because they got all the cows into the barn before the rain.', code: 'C3.2' }
  ],
  tip: 'The letters ou and ow can both say /ow/, the sound you make when you are hurt, as in cloud and cow. Remember that ow can also say long o (snow), so the child may need to try both sounds. Watch for ou in words like soup and you, which are learned by heart.'
});
Atlas.decodable.add({
  id: 'oi-oy', band: '2', name: 'oi and oy', focus: ['oi', 'oy'], key: 'coin, boy', mark: 'oi|oy',
  heart: ['laugh'],
  words: ['coin', 'boy', 'toy', 'join', 'soil', 'oil', 'point', 'boil', 'joy', 'coil', 'foil', 'enjoy', 'spoil', 'moist'],
  title: 'Roy and the Coin',
  text: ['Roy is a boy who likes to dig. One day, he and his dad went to plant beans in the soil by the shed. His sister Joy came to join them.',
    'Roy dug and dug. Then his spade hit a thing with a clink. He pointed. "Dad, look! A coin!" The coin was small and dirty.',
    'Dad rubbed it with a bit of oil and some foil. Then they could see a loon on it. "It is a loonie!" said Dad. "It is a coin from Canada." Roy was full of joy.',
    'Roy did not spend it. He made a slot in a jar lid and dropped the loonie in. "My first coin," he said. Joy had to laugh. "Now go and plant the beans, boy!"'],
  pic: ['sun', 'coin', 'jar'],
  qs: [
    { k: 'choice', q: 'What did Roy dig up in the soil?', opts: ['a coin', 'a toy', 'a bean'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'How did Roy feel when he found the coin?', opts: ['glad', 'sad', 'mad'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Roy and the coin.', a: 'A boy digging in the soil, or holding up a coin. Ask the child what is on the coin (a loon).', code: 'C1.4' }
  ],
  tip: 'The letters oi and oy both say /oy/, as in coin and boy. Use oi in the middle of a word (coin, soil) and oy at the end (boy, toy). Watch for the child reading oi as two sounds; teach it as one chunk.'
});
Atlas.decodable.add({
  id: 'au-aw', band: '2', name: 'au and aw', focus: ['au', 'aw'], key: 'August, saw', mark: 'au|aw',
  heart: ['chalk'],
  words: ['saw', 'paw', 'claw', 'draw', 'straw', 'crawl', 'yawn', 'dawn', 'lawn', 'hawk', 'haul', 'launch', 'fault', 'sauce'],
  title: 'Paw Prints',
  text: ['At dawn, Paul got up with a big yawn. He took his box of chalk out to the drive.',
    'Paul likes to draw. He made a hawk in the sky with long wings and sharp claws. Then he made a green lawn and a red barn. It took him a long time.',
    'Then Paul\'s pup, Shawn, ran up. Shawn did not see the chalk. His paws went all over the hawk! Paul saw the mess. "Shawn! Look at my hawk!"',
    'Shawn sat down and held up a paw. It was green and red with chalk. Paul had to laugh. It was not Shawn\'s fault. So Paul made one more thing: a pup with chalk paws, next to the hawk.'],
  pic: ['sun', 'bird', 'dog', 'house'],
  qs: [
    { k: 'choice', q: 'What did Paul draw with?', opts: ['chalk', 'a pen', 'paint'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Paul was mad at Shawn at the end.', a: false, code: 'C3.2' },
    { k: 'write', q: 'What would you draw with chalk?', a: 'The child\'s own idea, such as a pet, a house or a game. Ask them to read it back to you.', code: 'C2.5' }
  ],
  tip: 'The letters au and aw both say /aw/, as in Paul and saw. Use au at the start or middle of a word (haul, fault) and aw at the end or before n or l (saw, yawn, crawl). Watch for the child reading the a as short a; teach the pair as one chunk.'
});
Atlas.decodable.add({
  id: 'ew-ue', band: '2', name: 'ew and ue', focus: ['ew', 'ue'], key: 'new, blue', mark: 'ew|ue',
  heart: ['whose', 'lose'],
  words: ['new', 'few', 'grew', 'chew', 'blew', 'flew', 'drew', 'stew', 'crew', 'threw', 'blue', 'glue', 'clue', 'true'],
  title: 'The Blue Mitt Clue',
  text: ['Sue had new blue mitts. Her granny made them, and they were soft and warm.',
    'One day, after skating at the rink, Sue had just one mitt. "No!" she said. "I lose things all the time." Her brother Drew said, "We need a clue."',
    'They went back to the rink. Snow blew over the ice. Drew found a few tracks in the snow. Then Sue saw a bit of blue by the bench. A dog had her mitt, and it was chewing on it!',
    'Sue threw a stick. The dog let go of the mitt and ran off with the stick. The mitt was wet, but it was still Sue\'s mitt. "Whose dog is that?" asked Drew. "I am not sure," said Sue, "but it likes new mitts!"'],
  pic: ['snow', 'mitt', 'dog'],
  qs: [
    { k: 'yn', q: 'Sue had new red mitts.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Who had the blue mitt?', opts: ['a dog', 'a cat', 'Drew'], a: 0, code: 'C1.1' },
    { k: 'order', items: ['Sue had just one mitt.', 'Sue and Drew went back to the rink.', 'Sue threw a stick.'], show: [2, 0, 1], q: 'Number the sentences in order.', code: 'C3.3' }
  ],
  tip: 'The letters ew and ue both say /oo/ as in moon (new, blue); in a few words they say /yoo/ (few). Both usually come at the end of a word. Watch for the child reading ew as e plus w; teach it as one chunk.'
});
Atlas.decodable.add({
  id: 'cle', band: '2', name: 'Consonant-le', focus: ['-ble', '-tle', '-dle'], key: 'ta-ble', mark: '[bcdfgkptz]le\\b',
  heart: ['double', 'trouble'],
  words: ['table', 'apple', 'little', 'puddle', 'candle', 'bubble', 'turtle', 'purple', 'simple', 'giggle', 'needle', 'eagle', 'maple', 'bottle'],
  title: 'The Little Turtle',
  text: ['After a big rain, Lucy and her little brother Sam went for a walk by the pond.',
    'In one puddle, Sam saw a little turtle. It had a dark shell with yellow lines on it. "It is in trouble," said Sam. "It is too far from the pond."',
    'Lucy did not grab it. She held the turtle by the sides of its shell. She set it down by the pond. The turtle sat. Then it gave a little wiggle and slid in.',
    'Sam began to giggle. A line of little bubbles came up, and then the pond was still. At home, Lucy and Sam sat at the table with apple slices and drew the little turtle.'],
  pic: ['cloud', 'pond', 'rock'],
  qs: [
    { k: 'choice', q: 'Where did Sam see the turtle?', opts: ['in a puddle', 'on a table', 'in a tree'], a: 0, code: 'C1.1' },
    { k: 'write', q: 'Why was the turtle in trouble?', a: 'It was in a puddle, too far from the pond.', code: 'C3.2' },
    { k: 'draw', q: 'Draw the turtle by the pond.', a: 'A turtle beside or going into a pond, perhaps with bubbles. Ask the child to tell you what the turtle did next.', code: 'C1.4' }
  ],
  tip: 'In a word that ends in a consonant plus le, those three letters make the last syllable, as in ta-ble and lit-tle. The e is silent: it says /bul/, /tul/, /dul/. Have the child cover the last three letters, read the first part, then add the le chunk.'
});
Atlas.decodable.add({
  id: 'kind-old', band: '2', name: 'Kind and old words', focus: ['ind', 'ild', 'old', 'olt'], key: 'kind, wild, cold', mark: 'ind|ild|old|olt',
  heart: ['post', 'ghost'],
  words: ['kind', 'find', 'mind', 'wild', 'child', 'cold', 'gold', 'old', 'told', 'hold', 'fold', 'colt', 'bolt', 'behind'],
  title: 'The Wild Colt',
  text: ['It was a cold day on the farm. Ella and her grandpa went out to the barn to feed the colt. But the gate was open, and the colt was not in the barn!',
    '"Never mind," Grandpa told her. "He is a wild one, but he will not go far in the cold. We will find him." They went behind the barn and up a hill.',
    'At the top of the hill stood the colt, by a spruce tree. Ella did not run at him. She held out a bit of apple and spoke in a soft, kind voice.',
    'The colt came to her. Grandpa put a rope on him, and they all went back down the hill. "You were bold and kind," Grandpa told Ella. "That is a good way to be with a wild thing."'],
  pic: ['snow', 'hill', 'spruce', 'rope'],
  qs: [
    { k: 'choice', q: 'What did Ella hold out to the colt?', opts: ['a bit of apple', 'a rope', 'a hat'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['finding a lost colt', 'a trip to the lake', 'a cold child in bed'], a: 0, code: 'C2.6' },
    { k: 'draw', q: 'Draw the colt on the hill.', a: 'A young horse on a snowy hill, perhaps by a tree, with Ella nearby. Ask the child how Ella got the colt to come.', code: 'C1.4' }
  ],
  tip: 'In ind, ild, old and olt, the vowel says its long sound even though a consonant follows, as in kind, wild, cold and colt. These words break the usual closed-syllable rule, so learn the chunks. Watch for kind read with a short i (to rhyme with tinned).'
});
Atlas.decodable.add({
  id: 'silent', band: '2', name: 'Silent letters kn wr gn mb', focus: ['kn', 'wr', 'gn', 'mb'], key: 'knot, wrap, lamb', mark: '\\bkn|\\bwr|\\bgn|mb\\b',
  heart: ['answer'],
  words: ['knot', 'knee', 'knock', 'knit', 'knife', 'know', 'wrap', 'write', 'wrist', 'wrong', 'gnat', 'lamb', 'thumb', 'climb', 'comb'],
  title: 'Granny Can Knit',
  text: ['Kim\'s granny can knit. She can make mitts, socks and toques. Kim likes to sit on the rug by her knee and watch.',
    'One day, Granny was knitting a red toque for Dad. Kim tried to help, but the yarn got in a big knot. Kim pulled at it with her thumb. That was the wrong thing to do! The knot got bigger. "I do not know what to do," said Kim.',
    'Granny smiled. "The answer is to go slow," she said. She held up the knot and pulled one bit at a time, and the yarn came free.',
    'When the toque was done, Kim wrapped it and wrote a card. Then, knock, knock! Dad was home. He put on the toque. It fell down over his nose. "I love it," said Dad, "but I cannot see!"'],
  pic: ['house', 'toque'],
  qs: [
    { k: 'yn', q: 'Granny can knit.', a: true, code: 'C1.1' },
    { k: 'order', items: ['The yarn got in a knot.', 'Kim wrapped the toque.', 'Dad put on the toque.'], show: [1, 2, 0], q: 'Number the sentences in order.', code: 'C3.3' },
    { k: 'write', q: 'What gift would you make for your family?', a: 'The child\'s own idea, such as a card, a drawing or a snack. Ask them to read it back to you.', code: 'C2.5' }
  ],
  tip: 'Some letter pairs have a silent letter: in kn and gn the first letter is silent (knot, gnat), in wr the w is silent (wrap), and in mb at the end the b is silent (lamb). Watch for the child sounding the k in knot or the b in thumb; point to the silent letter and say "this one is quiet."'
});
Atlas.decodable.add({
  id: 'prefix', band: '2', name: 'Prefixes un- and re-', focus: ['un-', 're-'], key: 'unpack, redo', mark: '^(un|re)(?=[a-z]{3})',
  heart: ['another', 'nothing'],
  words: ['unpack', 'unlock', 'unzip', 'unkind', 'unwrap', 'unhappy', 'repack', 'refill', 'retell', 'reread', 'reuse', 'replay', 'rewind', 'reopen'],
  title: 'Unwrap It Slowly',
  text: ['It was Raj\'s birthday, and it was raining at the cottage. Granny had sent a gift in red paper with a gold bow.',
    'Raj wanted to rip the paper, but Mom said, "Unwrap it slowly. Granny likes to reuse paper." So Raj unwrapped the gift bit by bit, and Mom folded the paper up.',
    'In the gift was a book about a fox and her kits. Mom read it to Raj. "Reread it!" said Raj. So Mom reread it, and then Raj read it to Mom.',
    'Then the sun came out, and they went down to the lake. Raj got mud on his boots, and Mom had to rewash them. That evening, Raj reopened the book and read it again, all on his own.'],
  pic: ['rain', 'house', 'book', 'fox'],
  qs: [
    { k: 'choice', q: 'What did Mom reread?', opts: ['the book', 'a card', 'a map'], a: 0, code: 'C1.1' },
    { k: 'order', items: ['Raj unwrapped the gift.', 'Mom reread the book.', 'Raj reopened the book.'], show: [2, 0, 1], q: 'Number the sentences in order.', code: 'C3.3' },
    { k: 'write', q: 'What gift would you like to unwrap?', a: 'The child\'s own idea, such as a book, a toy or a game. Ask them to read it back to you.', code: 'C2.5' }
  ],
  tip: 'A prefix is a small part added to the front of a word that changes its meaning: un- means not or the opposite (unwrap, unkind), and re- means again (reread, reuse). Have the child cover the prefix, read the base word, then add the prefix. Watch for words that only look like they have a prefix, such as uncle and ready.'
});
Atlas.decodable.add({
  id: 'suffix-more', band: '2', name: 'Suffixes -er -est -ful -less -ly', focus: ['-ful', '-less', '-ly'], key: 'helpful', mark: '(er|est|ful|less|ly)\\b',
  heart: ['women', 'country'],
  words: ['helpful', 'thankful', 'useful', 'spotless', 'endless', 'helpless', 'slowly', 'softly', 'sadly', 'kindly', 'taller', 'tallest', 'coldest', 'longer', 'strongest'],
  title: 'The Helpful Kid',
  text: ['Every winter, the people of a small town in the North make a hockey rink. The older kids help. This year, Tobin wanted to help too.',
    'Tobin was the smallest kid there, but he was the most helpful. He dragged the hose slowly over the ice, and the ice got smoother and smoother. The women and men worked till late. It was the coldest and longest night of the year, but the rink was spotless.',
    'In the morning, the kids skated. Tobin was not the fastest skater, but he was the happiest. He skated slowly and smiled.',
    '"Thank you," his granny said softly. "You were very helpful. You may be small, but you are stronger than you think." Tobin felt thankful for his town and the best little rink in the country.'],
  pic: ['moon', 'house', 'skate'],
  qs: [
    { k: 'yn', q: 'Tobin was the fastest skater.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'How did Tobin help?', opts: ['He dragged the hose.', 'He made a snowman.', 'He sold hot dogs.'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['a town that makes a rink', 'a lost dog', 'a trip to the lake'], a: 0, code: 'C2.6' }
  ],
  tip: 'A suffix is a small part added to the end of a word: -er and -est compare (fast, faster, fastest), -ful means full of, -less means without, and -ly tells how (slowly). Have the child cover the suffix, read the base word, then add the ending. Watch for spelling changes, such as happy to happiest.'
});
