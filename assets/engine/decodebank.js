/* Language Atlas tool box: the Decodable readers' stories (decodable.js loads this when the tool opens), 3 for each phonics step, in teaching order.
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
Atlas.decodable.more('short-a', {
  words: ['ham', 'jam', 'yam', 'dam', 'sad', 'mad', 'zap', 'tan', 'pat', 'bag', 'ran'],
  title: 'The Cat and the Ham',
  text: ['Pam and Dad sat at the dam. Pam had a bag. The bag had ham, jam and a yam.',
    'A tan cat ran to the bag. Zap! The cat had the ham. Pam is mad. Dad is sad.',
    'Pam had to pat the cat. Pam and Dad had the jam and the yam. The cat had a nap.'],
  pic: ['sun', 'cat', 'bag'],
  qs: [
    { k: 'yn', q: 'Pam and Dad sat at a van.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why is Pam mad?', opts: ['The cat had the ham.', 'Dad had a nap.', 'The bag is tan.'], a: 0, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Pam had a bag.', 'The cat had the ham.', 'The cat had a nap.'], show: [1, 2, 0], code: 'C3.3' }
  ]
});
Atlas.decodable.more('short-a', {
  words: ['tap', 'map', 'cap', 'rat', 'bat', 'lap', 'van', 'fan', 'gap', 'wag', 'pan'],
  title: 'Tap, Tap, Tap!',
  text: ['Jan and Dad had a van. Jan had a map. Dad had a cap and a bag.',
    'Tap, tap, tap! Is a rat at the bag? Is a bat at the bag?',
    'A tan cat sat at the bag. The cat is Max! Max had a tap at the bag.',
    'Jan and Dad pat Max. Max sat at Jan and had a nap.'],
  pic: ['van', 'cat', 'bag'],
  qs: [
    { k: 'choice', q: 'What sat at the bag?', opts: ['a rat', 'a cat', 'a bat'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Dad is mad at Max.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw Max at the bag.', a: 'A cat beside a bag, perhaps with a paw up to tap it. Ask the child what Jan and Dad thought was at the bag.', code: 'C1.4' }
  ]
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
Atlas.decodable.more('short-i', {
  words: ['hid', 'bin', 'lid', 'tip', 'win', 'kit', 'pit', 'him', 'rip', 'zip', 'did'],
  title: 'Tim Hid',
  text: ['Liz is it. Tim ran and hid. "I can win!" said Tim.',
    'Is Tim in the van? It is Dad, and Dad had a nap. Is Tim in the pit? It is Kit, the cat.',
    'Liz sat at a big bin. Tap, tap! Is it Kit? Liz did tip the lid. It is Tim! "I win!" said Liz. "You did," said Tim.'],
  pic: ['sun', 'van', 'cat'],
  qs: [
    { k: 'yn', q: 'Tim hid in the van.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Who was in the van?', opts: ['Dad', 'Kit', 'Liz'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Tim ran and hid.', 'Kit was in the pit.', 'Tim was in the bin.'], show: [2, 0, 1], code: 'C3.3' }
  ]
});
Atlas.decodable.more('short-i', {
  words: ['six', 'wig', 'jig', 'fit', 'tin', 'dig', 'bit', 'hid', 'kid', 'rib', 'bib', 'mix'],
  title: 'Kim Is Six',
  text: ['Kim is six. Nan and Dad had a big bag. "Kim, dig in," said Nan.',
    'In the bag was a tin. In the tin was a big tan wig! It did fit Kim.',
    'Kit the cat had the wig! Kit hid in a bin. Kim and Dad had to dig in the bin.',
    'Kim had the wig. Kim did a jig in the big wig!'],
  pic: ['bag', 'cat', 'box'],
  qs: [
    { k: 'choice', q: 'What was in the tin?', opts: ['a fig', 'a wig', 'a pin'], a: 1, code: 'C1.1' },
    { k: 'choice', q: 'Why did Kim and Dad dig in the bin?', opts: ['Kit hid in it.', 'Kim had a nap.', 'Dad had a fig.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Kim in the big wig.', a: 'A child in a big wig, perhaps dancing. Ask the child where Kit hid with the wig.', code: 'C1.4' }
  ]
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
Atlas.decodable.more('short-o', {
  words: ['cot', 'dog', 'jog', 'hop', 'got', 'not', 'top', 'hog', 'nod', 'lot', 'fog'],
  title: 'Bob and the Cot',
  text: ['Don has a dog. The dog is Bob. Bob is big. Bob can jog and hop.',
    'Don has a cot. Bob got on the cot! "Bob, no!" said Don. "It is not a dog cot!"',
    'Bob sat on the cot. Don sat on the cot. Bob and Don had a nap. It was a dog cot!'],
  pic: ['sun', 'bed', 'dog'],
  qs: [
    { k: 'choice', q: 'Where did Bob nap?', opts: ['on the cot', 'in a box', 'on a log'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Don said, "Bob, no!" Why?', opts: ['Bob got on the cot.', 'Bob ran to a log.', 'Bob had a hot dog.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Bob and Don on the cot.', a: 'A big dog and a child on a small bed, perhaps asleep. Ask the child why it was a dog cot at the end.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('short-o', {
  words: ['jog', 'log', 'top', 'pop', 'rod', 'hot', 'mob', 'job', 'dot', 'cob', 'fox'],
  title: 'A Dog at the Log',
  text: ['Mom and Dot jog to a log. Dot can hop on top of it.',
    'A dog ran to the log. It had a tag. "It is Rob," said Mom.',
    'A man ran to the log. "Rob! Rob!" said the man. Rob ran to the man.',
    '"Rob is a bad dog," said the man. "Rob is not bad," said Dot. "Rob is a top dog!"'],
  pic: ['spruce', 'log', 'dog'],
  qs: [
    { k: 'yn', q: 'The dog is Rob.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Who ran to the log?', opts: ['a man', 'a fox', 'Dad'], a: 0, code: 'C1.1' },
    { k: 'write', q: 'Where do you jog?', a: 'Any place in a word or short sentence, for example: I jog to the park.', code: 'C2.5' }
  ]
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
Atlas.decodable.more('short-u', {
  words: ['bus', 'bug', 'bun', 'cup', 'hut', 'sun', 'run', 'jug', 'hum', 'but', 'tug'],
  title: 'A Bug on the Bus',
  text: ['Jun and Mom got on the bus. Jun had a bun in a bag. Mom had a cup.',
    'A bug got on the bus. It sat on the bun! "Do not hit it," said Mom.',
    'Jun put the cup on the bug. The bus got to the hut. Jun ran up and put the bug in the sun. "Run, bug, run!" said Jun.'],
  pic: ['sun', 'bus', 'bug'],
  qs: [
    { k: 'yn', q: 'The bug sat on the bun.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Where did Jun put the bug?', opts: ['in the sun', 'on the bus', 'on a rug'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['A bug got on the bus.', 'Jun put the cup on the bug.', 'Jun put the bug in the sun.'], show: [1, 2, 0], code: 'C3.3' }
  ]
});
Atlas.decodable.more('short-u', {
  words: ['tum', 'gum', 'mug', 'rug', 'cut', 'hug', 'pup', 'bud', 'nut', 'dug', 'sum'],
  title: 'Gum on the Pup',
  text: ['Tam has gum. "No gum on the rug!" said Mom. But the gum is on the rug.',
    'Nut the pup ran in and sat on the rug. Nut got up. The gum is on his tum!',
    'Nut ran and ran. Mom had to cut the gum. "No gum on the rug, and no gum on the pup!" said Mom. Tam had to hug Nut.'],
  pic: ['house', 'dog'],
  qs: [
    { k: 'choice', q: 'Where did the gum go?', opts: ['on the pup', 'in a cup', 'on Mom'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why did Mom cut the gum?', opts: ['It was on the pup.', 'It was on the bus.', 'Tam had a cut.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What is fun for you?', a: 'Any fun thing in a word or short sentence, for example: I run.', code: 'C2.5' }
  ]
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
Atlas.decodable.more('short-e', {
  words: ['vet', 'leg', 'pet', 'get', 'let', 'set', 'yes', 'den', 'men', 'beg', 'wet'],
  title: 'Rex and the Vet',
  text: ['Deb has a pet. The pet is Rex. Rex has a bad leg.',
    'Deb and Mom get Rex in the van. They go to the vet. The vet set his leg. "Let Rex nap in his bed," said the vet.',
    'Rex had a big nap in his bed. Rex got up and ran to Deb. Yes!'],
  pic: ['van', 'dog', 'bed'],
  qs: [
    { k: 'choice', q: 'What was bad?', opts: ['his leg', 'his bed', 'his van'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Rex had a bad leg.', 'The vet set his leg.', 'Rex got up and ran.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'write', q: 'Do you have a pet? What is it?', a: 'Any pet, or a pet the child would like, in a word or short sentence, for example: I have a cat.', code: 'C2.5' }
  ]
});
Atlas.decodable.more('short-e', {
  words: ['pen', 'red', 'ten', 'fed', 'pet', 'jet', 'met', 'yet', 'bet', 'hen', 'men'],
  title: 'Yes, Ben!',
  text: ['Ben has no pet. "Can I have a pet?" said Ben. "Yes," said Mom.',
    'They go to Jen. Jen has a red pup in a pen. It ran to Ben.',
    'Ben fed the red pup. It had a nap in his lap. "Can I have him?" said Ben. "Yes," said Jen.',
    'The pup is Jet, and Ben has a pet!'],
  pic: ['house', 'dog', 'van'],
  qs: [
    { k: 'yn', q: 'The red pup ran to Ben.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Ben and Mom go to Jen?', opts: ['to get a pet', 'to get a hen', 'to get a van'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Ben and Jet.', a: 'A child with a red pup, perhaps asleep on his lap. Ask the child how Ben felt at the end.', code: 'C1.4' }
  ]
});
Atlas.decodable.add({
  id: 'short-mix', hunt: 'Underline one word for each short vowel: a, e, i, o, u.', band: 'K', name: 'All five short vowels', focus: ['a e i', 'o u'], key: 'cat, bed, pig, fox, sun', mark: '[aeiou]',
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
Atlas.decodable.more('short-mix', {
  words: ['hat', 'peg', 'rip', 'box', 'nap', 'fat', 'not', 'sit', 'bed', 'dot', 'tug', 'quit'],
  title: 'A Bed in a Hat',
  text: ['Tip is a big cat, and Dot is not. Tip and Dot nap in a box.',
    'Mom has a red hat on a peg. Tip got the hat. Dot got the hat. Rip! The hat has a big rip.',
    'Mom is not mad. "Look," said Mom. "It is a cat bed!" Tip and Dot nap in the hat.'],
  pic: ['hat', 'cat', 'box'],
  qs: [
    { k: 'choice', q: 'What did Tip and Dot get?', opts: ['a red hat', 'a big box', 'a cup'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Mom is mad at Tip and Dot.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw Tip and Dot in the hat.', a: 'Two cats, one big and one small, curled up in a red hat. Ask the child what Mom said.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('short-mix', {
  words: ['quiz', 'sum', 'quit', 'sad', 'yes', 'big', 'got', 'pen', 'ten', 'kid', 'fun'],
  title: 'Kim and the Quiz',
  text: ['Kim has a big quiz. Kim is sad. "I can not do it," said Kim.',
    '"Do not quit," said Mom. "We can do it." Mom and Kim sat. Kim did one sum. Kim got it! Kim did two.',
    'At the quiz, Kim did not quit. Kim ran to Mom. "I did it!" said Kim. "Yes, you did!" said Mom.'],
  pic: ['house', 'book', 'pen'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Kim is sad.', 'Kim did a sum.', 'Kim ran to Mom.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'At the quiz, Kim did not ...', opts: ['quit', 'sit', 'run'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Kim is sad at the quiz.', a: false, code: 'C3.2' }
  ]
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
Atlas.decodable.more('sh', {
  words: ['shed', 'shut', 'hush', 'rush', 'wish', 'dash', 'shop', 'mash', 'shin', 'gosh', 'sash'],
  title: 'A Fox in the Shed',
  text: ['Ash and Dad go to the shed to get a big pot. "Hush!" said Dad. "Look. What is in the shed?"',
    'Ash had a look. There, on a big rag, is a fox. The fox has a kit! The kit is tan. It had a nap on the fox.',
    '"Can we get the pot?" said Ash. "No," said Dad. "We do not have to rush. Let the fox and the kit be."',
    'Dad and Ash shut the shed. Ash had a wish: to see the kit get big.'],
  pic: ['hut', 'fox', 'pot'],
  qs: [
    { k: 'yn', q: 'The fox had a kit.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Dad and Ash shut the shed?', opts: ['to let the fox and kit be', 'to get the pot', 'to get the fox'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the fox and the kit in the shed.', a: 'A fox and a small kit on a rag inside a shed. Ask the child why Dad said hush.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('sh', {
  words: ['mash', 'dish', 'bash', 'shot', 'shop', 'hush', 'gush', 'shed', 'cash', 'rash', 'shut'],
  title: 'Hush, Shep!',
  text: ['Nan has a nap. Ash and his dog, Shep, sit on the rug. "Hush, Shep," said Ash. "Nan is in bed."',
    'Shep can see a cat at the shed. Yap, yap! Shep is in a rush to get it. Bash! Shep hit a dish of mash.',
    'Mash is on the rug. Mash is on Shep. Mash is on Ash! Nan got up. "What is the rush?" said Nan.',
    'Ash had to mop up the mash. Shep had to sit in the shed. "Hush," said Nan. Shep had a nap in the shed, and Nan had a nap in bed.'],
  pic: ['house', 'dog', 'cat'],
  qs: [
    { k: 'choice', q: 'What did Shep hit?', opts: ['a dish of mash', 'a cat', 'Nan'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why did Shep yap?', opts: ['Shep can see a cat.', 'Shep had mash.', 'Nan got up.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Shep and the mash.', a: 'A dog with mashed food on the rug and on its fur. Ask the child what Ash had to do.', code: 'C1.4' }
  ]
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
Atlas.decodable.more('ch', {
  words: ['chop', 'chum', 'chin', 'chat', 'rich', 'much', 'chug', 'chip', 'such', 'chap'],
  title: 'Chop, Chop',
  text: ['Chad and Dad are at the hut. Dad has a big log to chop. "Can I chop it?" said Chad.',
    '"You can chop a bit," said Dad. Chop! Chop! Chad hit the log. A chip shot up and hit his chin.',
    '"Such a big chip!" said Chad. He had a red dot on his chin. Dad had a look. "It is not much," said Dad.',
    'Dad and Chad sit on the log and chat. "You did a big job, chum," said Dad.'],
  pic: ['spruce', 'hut', 'log'],
  qs: [
    { k: 'choice', q: 'What hit Chad on the chin?', opts: ['a chip', 'a log', 'a cup'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Chad got to chop.', 'A chip hit his chin.', 'Dad and Chad sit and chat.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'write', q: 'What job do you do?', a: 'Any job at home in a word or short sentence, for example: I set the table.', code: 'C2.5' }
  ]
});
Atlas.decodable.more('ch', {
  words: ['chum', 'chat', 'chin', 'such', 'much', 'chip', 'chop', 'rich', 'chap', 'chug'],
  title: 'Chet Has a Chum',
  text: ['Chet sat on a log. He had no chum. Chet was sad.',
    'A kid ran up to the log. "I am Rich," said the kid. "Can I sit?" "Yes," said Chet. Rich had a big bun. He cut it in two. "Have some," said Rich.',
    'Chet and Rich had the bun and had a chat. Rich has a pup, and Chet has a pup. Rich can do a chin up. Chet can do six!',
    'Chet was not sad. He had a chum, and Rich had a chum. Such fun!'],
  pic: ['sun', 'spruce', 'log'],
  qs: [
    { k: 'yn', q: 'Rich is a chum to Chet.', a: true, code: 'C3.2' },
    { k: 'choice', q: 'What did Rich cut in two?', opts: ['a bun', 'a log', 'a chip'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw Chet and Rich on the log.', a: 'Two children on a log sharing a bun. Ask the child how Chet felt at the start and at the end.', code: 'C1.4' }
  ]
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
Atlas.decodable.more('th', {
  words: ['path', 'then', 'thin', 'with', 'this', 'thud', 'moth', 'them', 'bath', 'math'],
  title: 'The Hat on the Path',
  text: ['Beth and Mom go up the path to the hut.',
    'On the path is a red hat. "Is this your hat?" said Mom. "No," said Beth. "My hat is in my bag."',
    'Then they met Thad. Thad was sad. "I had a red hat," said Thad. "Is this it?" said Beth. "Yes! That is my hat!" said Thad.',
    'Beth put the hat on Thad. Then Beth, Thad and Mom go up the path to the hut.'],
  pic: ['spruce', 'hat', 'hut'],
  qs: [
    { k: 'yn', q: 'Beth has a hat in a bag.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why was Thad sad?', opts: ['He had no hat.', 'He had no bun.', 'He was hot.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What do you see on a path?', a: 'Any answer in a word or short sentence, for example: I see a rock.', code: 'C2.5' }
  ]
});
Atlas.decodable.more('th', {
  words: ['thud', 'moth', 'that', 'path', 'then', 'with', 'them', 'thin', 'this', 'math', 'bath'],
  title: 'What Was That?',
  text: ['Raj and Nan are at the hut. The sun is set. Raj is in bed, and Nan is in bed.',
    'Thud! "What was that?" said Raj. Thud, thud! "Is it a moth?" said Nan. "A moth can not thud," said Raj.',
    'Nan and Raj got up and had a look on the path. There was a big pup with a red tag. The tag said Thud.',
    '"Thud is the pup from the hut up the path," said Nan. Raj and Nan let him in, and Thud had a nap on the rug with them.'],
  pic: ['moon', 'hut', 'dog'],
  qs: [
    { k: 'choice', q: 'What was the thud?', opts: ['a pup', 'a moth', 'Nan'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Raj and Nan are mad at Thud.', a: false, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Raj got up.', 'Raj and Nan see a pup.', 'Thud had a nap on the rug.'], show: [2, 0, 1], code: 'C3.3' }
  ]
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
Atlas.decodable.more('wh', {
  words: ['whim', 'when', 'whiz', 'whet', 'which', 'whish', 'wham', 'whip'],
  title: 'Which One Is It?',
  text: ['Nan has a cup, a mug and a pot. She hid a nut in one of them. Whish, whiz, whish! Nan did a mix of them. "Which one is it in?" said Nan.',
    '"It is in the mug!" said Ben. No nut! "Then it is in the pot." No nut! "It is in the cup!" No nut!',
    '"Which is it, Nan?" said Ben. "Look here," said Nan. She got the hat. Wham! The nut was in it!',
    '"When can I do it?" said Ben. Then Ben hid the nut.'],
  pic: ['cup', 'pot', 'hat'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Nan hid a nut.', 'Ben had a look in the mug.', 'The nut was in the hat.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'choice', q: 'Where was the nut?', opts: ['in the mug', 'in the hat', 'in the pot'], a: 1, code: 'C1.1' },
    { k: 'write', q: 'What fun can you have with your mom and dad?', a: 'Any game or activity in a word or short sentence, for example: We run.', code: 'C2.5' }
  ]
});
Atlas.decodable.more('wh', {
  words: ['when', 'whip', 'which', 'whiz', 'wham', 'whim', 'whish', 'whet'],
  title: 'Whiz and the Rag',
  text: ['Liz and Raj have a pup. The pup is Whiz.',
    'Raj has a red rag. "Which pup can get it?" said Raj. He let it go. Whish! Whiz shot up the path. Wham! Whiz hit a log. He had the rag.',
    'Whiz did not give the rag to Raj. He hid it. "Where is it, Whiz?" said Liz. Liz and Raj had a look in the shed. No rag!',
    'When Liz and Raj go to bed, Whiz is in his bed. The rag is in it with him. Whiz has a nap on the rag.'],
  pic: ['spruce', 'dog', 'log'],
  qs: [
    { k: 'yn', q: 'Whiz hit a log.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Liz and Raj look for the rag?', opts: ['Whiz hid it.', 'Raj had a nap.', 'It was wet.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Whiz on the rag.', a: 'A pup asleep in its bed on a red rag. Ask the child where Liz and Raj looked for the rag.', code: 'C1.4' }
  ]
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
/* step 11, story 2 */
Atlas.decodable.more('ck', {
  words: ['chick', 'neck', 'quack', 'tuck', 'lock', 'thick', 'shack', 'peck', 'check', 'muck', 'shock'],
  title: 'Where Is the Chick?',
  text: ['Kim and Mack have a hen in a pen by the shed. The hen has a chick. The chick is quick.',
    'Then the chick is not in the pen! Kim and Mack look and look. Is it on the deck? No. Is it by the rock? No.',
    'Then a sack on the deck did a kick. Kim and Mack had a look in the sack.',
    'It was the chick! "You are a quick chick," said Kim. "Back you go!" Kim put the chick back in the pen with the hen.'],
  pic: ['hut', 'hen', 'bag'],
  qs: [
    { k: 'yn', q: 'The chick hid in the sack.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Kim and Mack look and look?', opts: ['The chick was not in the pen.', 'The hen was sick.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the chick in the sack.', a: 'A small chick in or peeking out of a sack. Ask the child where the chick went at the end.', code: 'C1.4' }
  ]
});
/* step 11, story 3 */
Atlas.decodable.more('ck', {
  words: ['shack', 'pick', 'rack', 'muck', 'duck', 'kick', 'tack', 'back', 'lick', 'buck'],
  title: 'The Fox and the Sock',
  text: ['Meg had a wet sock. She put it on a rock by the shack.',
    'Then a red fox ran up. It had a look at the sock. The fox got the sock and ran!',
    'Meg and Mom ran up the path to the back of the shack. The fox was in a pit. It had the sock, a cap and a bib.',
    '"That fox is a pack rat!" said Mom. Mom got the sock, the cap and the bib back. The fox did not look sad. Meg put on the sock. It was a bit wet, but it was back!'],
  pic: ['sun', 'house', 'fox', 'rock'],
  qs: [
    { k: 'choice', q: 'What was in the pit?', opts: ['a sock, a cap and a bib', 'a hen and a chick', 'a big rock'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Meg put the sock on a rock.', 'A fox got the sock.', 'Mom got the sock back.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'write', q: 'What do you do if a fox has your sock?', a: 'Any sensible answer, such as: I tell a grown-up, or I let the fox have it.', code: 'C2.5' }
  ]
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
/* step 12, story 2 */
Atlas.decodable.more('floss', {
  words: ['shell', 'gull', 'fell', 'moss', 'will', 'pass', 'sell', 'well', 'fizz', 'cuff', 'dull'],
  title: 'Nell and the Gull',
  text: ['Nell sat on a big rock with Dad. She had a bun and a red shell.',
    'A gull sat on a log. Then it did a hop, hop, hop up to the rock.',
    'Nell did not fuss. She hid the bun in the bag. "You will not get my bun," she said. Peck! The gull got the shell, and it was off!',
    'Then the gull let go of the shell. It fell in the moss. Nell got it back. "You can have a bit of bun," said Nell. "Not my shell!"'],
  pic: ['bird', 'rock', 'log'],
  qs: [
    { k: 'yn', q: 'The gull got the bun.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why did Nell put the bun in the bag?', opts: ['The gull did want it.', 'It was wet.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What do you put in your bag?', a: 'Any sensible answer, such as: a bun, my hat, a book.', code: 'C2.5' }
  ]
});
/* step 12, story 3 */
Atlas.decodable.more('floss', {
  words: ['buzz', 'doll', 'fuzz', 'huff', 'yell', 'toss', 'off', 'bell', 'fuss', 'tell', 'fill'],
  title: 'A Buzz in the Hut',
  text: ['Will and his mom sat in the hut. Will had a doll. Mom had a big mug.',
    'Buzz! A big bug was in the hut. It got on the doll. Then it got on the mug!',
    'Will did not yell, and he did not fuss. "Let us not hit it," said Mom. "It is not a bad bug. It does want to get back to the sun."',
    'Will put a cup on the bug, and Mom set a lid on it. Will ran up the hill and let the bug go. Buzz! Off it shot. "You did well," said Mom.'],
  pic: ['sun', 'hut', 'bug', 'cup', 'hill'],
  qs: [
    { k: 'yn', q: 'The bug got on the mug.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['A bug got on the mug.', 'Will put a cup on the bug.', 'Will let the bug go.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'Why did Will and Mom not hit the bug?', opts: ['It was not a bad bug.', 'It was in the mug.'], a: 0, code: 'C3.2' }
  ]
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
/* step 13, story 2 */
Atlas.decodable.more('all', {
  words: ['ball', 'tall', 'hall', 'call', 'wall', 'shall', 'mall', 'fall', 'all'],
  title: 'Where Is Tab?',
  text: ['It was fall. Kim and Mom got back from a walk. "Tab! Tab!" Kim had to call. Tab, the cat, did not run up.',
    'Was Tab in the hall? No. Was Tab on the wall? No. Kim and Mom had to call and call.',
    'Then Kim had a look at a tall box in the hall. The lid was up a bit.',
    'It was Tab! She sat in a ball on top of a red hat. "You had us all in a fuss," said Kim. Tab did not talk. She had a nap.'],
  pic: ['house', 'box', 'cat', 'hat'],
  qs: [
    { k: 'yn', q: 'Tab was in a box.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Kim and Mom call and call?', opts: ['They did not see Tab.', 'Tab was sick.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'Where can a cat nap?', a: 'Any sensible answer, such as: in a box, on a bed, in the sun.', code: 'C2.5' }
  ]
});
/* step 13, story 3 */
Atlas.decodable.more('all', {
  words: ['all', 'call', 'hall', 'wall', 'fall', 'mall', 'shall', 'ball', 'tall'],
  title: 'The Duck Call',
  text: ['Ben and his dad had a walk to the water. They sat on a tall wall with a bun in a bag.',
    'Dad did a duck call. "Quack, quack!" Then a duck got up on the wall. It had a look at the bag.',
    'Ben did a call as well. But it was not a quack. It was a big yell! The duck had a fall, back in the water.',
    '"Not a yell," said Dad. "Be a duck!" Ben did the call well. The duck got back up on the wall, and Ben fed it all of the bun.'],
  pic: ['sun', 'duck', 'pond'],
  qs: [
    { k: 'choice', q: 'What did Ben give the duck?', opts: ['a bun', 'a ball', 'a cup'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Dad did a duck call.', 'The duck had a fall.', 'Ben fed the duck.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'draw', q: 'Draw the duck on the wall.', a: 'A duck sitting on top of a wall, maybe with water beside it. Ask the child why the duck fell.', code: 'C1.4' }
  ]
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
/* step 14, story 2 */
Atlas.decodable.more('ng', {
  words: ['ding', 'song', 'fang', 'sung', 'king', 'gang', 'dong', 'long', 'bang', 'sing'],
  title: 'The King of the Hill',
  text: ['Ming and Tung ran up a big hill. Tung got to the top. "I am the king of the hill!" he sang.',
    'Ming ran up. "I want to be king!" said Ming. But Tung did not let Ming up. Ming had a fall.',
    'Then Tung sang: "Ming is king! Ming is king!" He got Ming up to the top. "I do not want to be the only king," he said.',
    'They sang the king song as one. It was a long, long song!'],
  pic: ['sun', 'hill'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Tung got to the top.', 'Ming had a fall.', 'Ming and Tung sang as one.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'yn', q: 'Tung let Ming be king.', a: true, code: 'C3.2' },
    { k: 'yn', q: 'Ming had a fall.', a: true, code: 'C1.1' }
  ]
});
/* step 14, story 3 */
Atlas.decodable.more('ng', {
  words: ['wing', 'ring', 'hung', 'thing', 'sang', 'gong', 'bang', 'long', 'lung', 'king'],
  title: 'A Gull With a Bad Wing',
  text: ['Ling and Mom had a walk by the water. A gull sat on a rock. It had a bad wing.',
    'The wing hung, and the gull did not get up. "The gull has to get to the vet," said Mom.',
    'Mom put the gull in a box, and Ling hung on to the box in the van.',
    'The vet had a look. "The wing will get well," she said. Ling sang a song: "Get well, get well!"',
    'Then the vet rang Mom. "The gull is well!" Ling and Mom ran to the water, and the gull was off, up, up!'],
  pic: ['bird', 'rock', 'van', 'box'],
  qs: [
    { k: 'choice', q: 'What was bad on the gull?', opts: ['the wing', 'the leg', 'the neck'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Ling did want the gull to get well.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw the gull with a bad wing.', a: 'A seabird with one wing hanging down, maybe on a rock or in a box.', code: 'C1.4' }
  ]
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
/* step 15, story 2 */
Atlas.decodable.more('nk', {
  words: ['junk', 'bunk', 'tank', 'thank', 'sink', 'honk', 'pink', 'wink', 'dunk', 'link', 'bonk'],
  title: 'The Junk in the Shed',
  text: ['Hank and his friend Jen had a look in the shed. It was full of junk.',
    'There was a tank, a bunk bed and a pink sink. "What can we do with a sink?" said Jen. Hank had to think.',
    'Then Hank got a bag of mud. Hank and Jen put the mud and a bit of moss in the sink. Then a big red bug got in!',
    'Mom had a look. "Did you think of that?" she said. "Yes," said Jen with a wink. "It is a bug sink!"'],
  pic: ['hut', 'bed', 'bug'],
  qs: [
    { k: 'yn', q: 'The sink was pink.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Hank get mud?', opts: ['to fill the sink', 'to fill the tank'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What can you do with junk?', a: 'Any sensible idea, such as: make a bug house, fix it, give it to a friend.', code: 'C2.5' }
  ]
});
/* step 15, story 3 */
Atlas.decodable.more('nk', {
  words: ['mink', 'bank', 'sank', 'dunk', 'think', 'thank', 'sunk', 'rink', 'tank', 'link', 'chunk'],
  title: 'The Mink on the Bank',
  text: ['Nan and Jun sat on the bank with a rod. Jun got a fish! He put it in a tub.',
    'Then a mink ran up the bank. It was long and thin. Dunk! The mink was in the tub with the fish!',
    'Jun did not yell. The mink got the fish. Then it sank in the water, and it did not come back.',
    '"That mink was quick," said Jun. "I think it has a den with a kit in it." "Then the kit can have the fish," said Nan with a wink.'],
  pic: ['sun', 'pond', 'fish'],
  qs: [
    { k: 'choice', q: 'Where did Jun put the fish?', opts: ['in a tub', 'in a box', 'in a bag'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Jun got a fish.', 'A mink got in the tub.', 'The mink sank in the water.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'Jun was mad at the mink.', a: false, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  "id": "plural-s", "hunt": "Underline every word that ends in -s.",
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
/* step 16, story 2 */
Atlas.decodable.more('plural-s', {
  words: ['bins', 'nets', 'bags', 'legs', 'pens', 'hugs', 'tubs', 'pots', 'rugs', 'fins', 'gets'],
  title: 'Bugs in the Logs',
  text: ['Tam and Kim have six cups with lids and two nets. They go up the hill to look at bugs.',
    'Kim tips up a log. Bugs! Big bugs, red bugs and bugs with long legs. The bugs run and hop.',
    'Tam gets the nets, and Kim gets the cups. They fill six cups with bugs. Then Tam thinks. "The bugs should live in the logs," he says.',
    'Kim tips the cups, and the bugs run back in the logs. Then Tam and Kim go back to the hut.'],
  pic: ['hill', 'log', 'bug', 'net', 'cup'],
  qs: [
    { k: 'choice', q: 'What did Tam and Kim put in the cups?', opts: ['bugs', 'nuts', 'rocks'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Tam and Kim let the bugs go.', a: true, code: 'C3.2' },
    { k: 'write', q: 'Where do bugs live?', a: 'Any sensible answer from the story or the child\'s life, such as: in logs, in the grass, under rocks.', code: 'C2.5' }
  ]
});
/* step 16, story 3 */
Atlas.decodable.more('plural-s', {
  words: ['pigs', 'figs', 'digs', 'rocks', 'yells', 'naps', 'bins', 'fills', 'tips', 'pens'],
  title: 'The Pigs Run Off',
  text: ['Gus has six pigs. The pigs live in a pen. The pigs dig and dig in the mud.',
    'Then the pigs dig a big pit, and the pit gets to the back of the pen. Six pigs run off!',
    'Gus yells, "Dad! The pigs!" The pigs run to the hens. The hens peck at the pigs. Then the pigs get to the bins and tip them. Yum! Buns, nuts and figs!',
    'Dad and Gus get the pigs back in the pen. Gus fills the pit with logs and rocks. The six pigs nap in the sun, full of buns.'],
  pic: ['sun', 'hut', 'pig', 'hen'],
  qs: [
    { k: 'order', q: 'Put the story in order.', items: ['The pigs dig a pit.', 'The pigs run to the hens.', 'Gus fills the pit.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'choice', q: 'Why did the pigs nap?', opts: ['They were full of buns.', 'They were sick.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the pigs at the bins.', a: 'Pigs with tipped-over bins and food spilling out.', code: 'C1.4' }
  ]
});
Atlas.decodable.add({
  id: 'blend-start', band: '1', name: 'Blends at the start', blend: 'l',
  focus: ['bl', 'fl', 'sl'], key: 'flag', mark: '^[bcfgps]l',
  hunt: 'Underline every word that starts with an l blend.',
  heart: ['people', 'again', 'because'],
  words: ['flag', 'flap', 'flip', 'black', 'block', 'clap', 'clock', 'glad', 'glass', 'plum', 'plug', 'sled', 'slip', 'slug', 'slush'],
  title: 'The Black Sled',
  text: ['Glen and his dog, Flick, go up a big hill with a black sled. Glen is glad. The hill is fun!',
    'Glen sits on the sled. Flick sits on it as well. Zip! The sled slips, and it is quick!',
    'Then the sled hits a log. Flop! Glen and Flick fall off in the slush. Plop!',
    'Flick licks Glen. Glen claps and gets up. He is a mess of slush, but he is glad. "Again!" he yells. Flick yips.'],
  pic: ['hill', 'sled', 'dog', 'log'],
  qs: [
    { k: 'choice', q: 'What did the sled hit?', opts: ['a log', 'a rock', 'a dog'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Glen had fun on the sled.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw Glen and Flick on the sled.', a: 'A child and a dog on a sled, maybe on a snowy hill.', code: 'C1.4' }
  ],
  tip: 'An l blend is a consonant and then l at the start of a word (bl, cl, fl, gl, pl, sl), as in flag and sled. You hear both sounds, so say the first sound and slide straight into the l. Watch for the l being dropped (fag for flag) or an extra vowel slipped in (fuh-lag).'
});
/* step 17, story 2: r blends */
Atlas.decodable.more('blend-start', {
  blend: 'r', focus: ['br', 'fr', 'tr'], key: 'frog', mark: '^[bcdfgpt]r',
  hunt: 'Underline every word that starts with an r blend.',
  tip: 'An r blend is a consonant and then r at the start of a word (br, cr, dr, fr, gr, pr, tr), as in frog and truck. Say both sounds quickly, then the vowel. Watch for the r being dropped (fog for frog) or a vowel slipped in (fuh-rog); many children say tr as chr and dr as jr, which is fine when reading, but point to the letters when spelling.',
  words: ['frog', 'drum', 'truck', 'grab', 'brick', 'crab', 'trip', 'grin', 'press', 'drip', 'grass', 'trap'],
  title: 'A Frog in the Truck',
  text: ['Fred and his dad have a red truck. Fred grabs his drum and gets in the truck. They go to the dock.',
    'At the dock, Fred hits the drum. Brum, brum! Then a frog hops up on the drum and grins at Fred.',
    'Fred grabs the frog. "Can I bring the frog back with us?" Dad says, "No. The frog has to be in the wet grass."',
    'Fred sets the frog in the grass. Hop! It is off. On the trip back, Fred hits his drum. "That is a frog song," he says with a grin.'],
  pic: ['sun', 'truck', 'frog', 'drum'],
  qs: [
    { k: 'choice', q: 'What hops up on the drum?', opts: ['a frog', 'a crab', 'a duck'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Dad says the frog can go in the truck.', a: false, code: 'C3.2' },
    { k: 'write', q: 'What do you bring on a trip?', a: 'Any sensible answer, such as: a drum, a snack, my hat.', code: 'C2.5' }
  ]
});
/* step 17, story 3: s blends */
Atlas.decodable.more('blend-start', {
  blend: 's', focus: ['sp', 'st', 'sw'], key: 'stop', mark: '^s[ckmnptw]',
  hunt: 'Underline every word that starts with an s blend.',
  tip: 'An s blend is s and then another consonant at the start of a word (sc, sk, sm, sn, sp, st, sw), as in stop and swim. Let the s hiss for a moment, then add the next sound without a stop. Watch for the s being dropped (top for stop) or an extra vowel (suh-top).',
  words: ['stop', 'snack', 'skunk', 'spin', 'step', 'sniff', 'swim', 'still', 'smell', 'spot', 'stack', 'swish'],
  title: 'A Skunk on the Deck',
  text: ['Stan and Liz sit on the deck. They have a big snack: buns, nuts and plums.',
    'Then Liz spots a skunk by the steps. It sniffs and sniffs. The skunk can smell the snack!',
    '"Stop," says Stan. "Do not run. Sit still." Stan and Liz sit as still as a rock. The skunk steps up on the deck. It sniffs the plums. Then it has a snack of nuts!',
    'Then the skunk is full. It spins and trots back to the grass. "Well," says Liz, "that skunk had a big snack, and we did not get a smell!"'],
  pic: ['moon', 'house', 'cup'],
  qs: [
    { k: 'order', q: 'Put the story in order.', items: ['Liz spots a skunk.', 'The skunk sniffs the plums.', 'The skunk trots back to the grass.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'Why did Stan and Liz sit still?', opts: ['The skunk could get mad.', 'They had a nap.'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'Stan and Liz ran from the skunk.', a: false, code: 'C1.1' }
  ]
});
Atlas.decodable.add({
  "id": "blend-end", "hunt": "Underline every word that ends with a blend.",
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
/* step 18, story 2 */
Atlas.decodable.more('blend-end', {
  words: ['nest', 'felt', 'band', 'finch', 'must', 'left', 'went', 'mend', 'bunch', 'sent', 'held'],
  title: 'A Nest in a Hat',
  text: ['Dad left his felt hat on the steps of the shack. Then he went to get it.',
    '"Stop!" said Jess. "Look in it!" A finch was in the hat! It had a nest in it, and in the nest were six eggs.',
    '"I must have a hat," said Dad. "But the finch can have this one." Jess and Dad went to the shop. Dad got a black hat with a red band.',
    'Then the eggs had chicks. Jess and Dad sat on the steps and felt glad. Six chicks in a felt hat!'],
  pic: ['house', 'hat', 'nest'],
  qs: [
    { k: 'order', q: 'Put the story in order.', items: ['Dad left his hat on the steps.', 'Jess and Dad went to the shop.', 'The eggs had chicks.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'yn', q: 'Dad was mad at the finch.', a: false, code: 'C3.2' },
    { k: 'write', q: 'What would you do with the hat?', a: 'Any sensible answer, such as: let the finch have it, or get a hat at the shop.', code: 'C2.5' }
  ]
});
/* step 18, story 3 */
Atlas.decodable.more('blend-end', {
  words: ['raft', 'pond', 'task', 'stump', 'last', 'bent', 'drift', 'mast', 'help', 'held', 'gust'],
  title: 'The Raft',
  text: ['Max and Kit had a plan: a raft to get to the big rock in the pond.',
    'Max got six planks, and Dad had to help with the drill. At last, the raft was done!',
    'Max and Kit set the raft on the pond and got on. The raft went to the big rock.',
    'Then a gust sent the raft back. Bump! It hit a stump, and Max and Kit fell in with a plop!',
    'They swam to the bank. "That is the best raft," said Dad, "but not in a gust!" "Next, we must get a mast!" said Kit.'],
  pic: ['sun', 'pond', 'rock'],
  qs: [
    { k: 'yn', q: 'Max and Kit fell in the pond.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the raft hit the stump?', opts: ['A gust sent it back.', 'Max had a nap.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Max and Kit on the raft.', a: 'Two children on a flat raft of planks on a pond, maybe with a stick. Ask what made them fall in.', code: 'C1.4' }
  ]
});
Atlas.decodable.add({
  "id": "blend-three", "hunt": "Underline every word that starts with three consonants.",
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
/* step 19, story 2 */
Atlas.decodable.more('blend-three', {
  words: ['scrub', 'strong', 'splat', 'sprint', 'squish', 'shred', 'throb', 'shrug', 'split', 'strap'],
  title: 'Scrub, Scrub, Scrub!',
  text: ['Ash has a pup, Scruff. Scruff is a strong pup, and he can sprint.',
    'Then Scruff ran in the mud. Squish! Splat! Scruff was a big mud blob.',
    'Ash got the tub and a brush. He had to scrub and scrub. Scruff did not want a bath. He did a big shrug, and the water went splash, on Ash!',
    'Then Ash was a mess as well. Mom had a look. "I think it is Ash that has to get a scrub!" she said.'],
  pic: ['house', 'dog', 'pot'],
  qs: [
    { k: 'yn', q: 'Scruff ran in the mud.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Ash get wet?', opts: ['Scruff did a shrug.', 'Ash fell in the pond.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What do you do in the tub?', a: 'Any sensible answer, such as: scrub, splash, get a bath.', code: 'C2.5' }
  ]
});
/* step 19, story 3 */
Atlas.decodable.more('blend-three', {
  words: ['shrimp', 'string', 'squid', 'thrill', 'splash', 'sprang', 'strip', 'shrank', 'scrap', 'splint', 'struck'],
  title: 'The Shrimp Trap',
  text: ['Lin and Gramps sat on the dock in the mist. Gramps had a shrimp trap on a long string.',
    'Gramps let the trap sink in the water. "Once the sun is up, we can lift it," he said.',
    'Lin had to be strong to pull up the string. Up, up! The trap was full of shrimp! And in with the shrimp was a red squid.',
    '"The squid has to go back," said Gramps. Lin let it slip back in the water. Squish! It shot off.',
    '"That was a thrill," said Lin. "Can we come back and do it again?"'],
  pic: ['sun', 'net', 'fish'],
  qs: [
    { k: 'choice', q: 'What was in with the shrimp?', opts: ['a squid', 'a crab', 'a frog'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Lin had fun with Gramps.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw the trap full of shrimp.', a: 'A trap or cage (a box of net) with many small shrimp, maybe a squid too.', code: 'C1.4' }
  ]
});
Atlas.decodable.add({
  "id": "suffix-ed", "hunt": "Underline every word that ends in -ed.",
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
/* step 20, story 2 */
Atlas.decodable.more('suffix-ed', {
  words: ['skipped', 'lifted', 'landed', 'hugged', 'tugged', 'rushed', 'huffed', 'tapped', 'puffed', 'spotted'],
  title: 'The Hat on the Branch',
  text: ['Meg and Jin skipped up the hill to the rink. Gusts huffed and puffed.',
    'Then a gust lifted the hat off Meg. It spun, and it landed up on a branch.',
    'Meg jumped and jumped, but she missed. Then Jin grabbed a long stick. He tapped the hat, and it dropped. Meg grabbed it.',
    'Meg hugged Jin. Then she tugged the hat on, snug, and the two of them rushed off to the rink.'],
  pic: ['cloud', 'hill', 'hat'],
  qs: [
    { k: 'yn', q: 'The hat landed on a branch.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Meg hug Jin?', opts: ['Jin got the hat back.', 'Jin had a snack.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the hat up on the branch.', a: 'A hat caught in a tree branch, maybe with a child reaching up.', code: 'C1.4' }
  ]
});
/* step 20, story 3 */
Atlas.decodable.more('suffix-ed', {
  words: ['checked', 'spotted', 'yelled', 'called', 'napped', 'grinned', 'picked', 'blinked', 'hunted', 'rested'],
  title: 'Where Is Rex?',
  text: ['Kim and Dad got back from the shop. "Rex!" Kim yelled. Rex is a pup, but he did not run up.',
    'Kim checked the shed and the van. Dad called, "Rex! Rex!" He checked the bed and the tub. No Rex. Kim felt sad.',
    'Then Kim spotted a lump in the big bag of mitts and hats. The lump jumped. Yip!',
    'It was Rex! He had crept in the bag, and he had napped there with the cat, Tab. Kim hugged Rex, and Dad grinned. "Well," said Dad, "that pup picked the best bed." Tab just blinked.'],
  pic: ['house', 'bag', 'dog', 'cat'],
  qs: [
    { k: 'choice', q: 'Who was in the bag with Rex?', opts: ['Tab, the cat', 'a hen', 'Dad'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['Kim checked the shed.', 'Kim spotted a lump in the bag.', 'Kim hugged Rex.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'write', q: 'Where do you nap?', a: 'Any sensible answer, such as: in my bed, on the couch.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  "id": "suffix-ing", "hunt": "Underline every word that ends in -ing.",
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
/* step 21, story 2 */
Atlas.decodable.more('suffix-ing', {
  words: ['sledding', 'tugging', 'zipping', 'spinning', 'bumping', 'clinging', 'standing', 'panting', 'grinning', 'nipping', 'spitting', 'dragging'],
  title: 'The Sledding Hill',
  text: ['Tess and Gus are dragging a sled up a big hill. Frost is nipping at them. At the top, Gus is panting. Tess is grinning. "Hop on!" she said.',
    'Then the sled is zipping past the rocks. Tess is yelling. Gus is clinging to the sled.',
    'Bump! The sled hits a lump and tips. Tess and Gus land in a drift. Gus sits up. He is spitting frost and grinning.',
    '"Can we go again?" said Gus. Mother is standing at the top with hot milk in a jug.'],
  pic: ['hill', 'sled', 'rock'],
  qs: [
    { k: 'choice', q: 'What did the sled hit?', opts: ['a log', 'a lump', 'a dog'], a: 1, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['Tess and Gus drag the sled up the hill.', 'The sled tips.', 'Gus wants to go again.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'Gus is mad at the sled.', a: false, code: 'C3.2' }
  ]
});
/* step 21, story 3 */
Atlas.decodable.more('suffix-ing', {
  words: ['camping', 'flapping', 'snapping', 'gusting', 'banging', 'gripping', 'lifting', 'flipping', 'running', 'puffing', 'standing', 'munching'],
  title: 'The Flapping Tent',
  text: ['Raj and his father are camping on a hill next to a pond. It is gusting. Raj is helping with the tent.',
    'Dad is banging in the pegs. Raj is gripping the flap. The tent is flapping and snapping.',
    'Then a big gust hits. The pegs pop up, and the tent is flipping past the rocks! Raj and Dad are running. Raj grabs a strap. "Got it!" Raj is grinning.',
    'Then they set lots of rocks on the pegs. At dusk, Raj and Dad munch on a snack in the tent. It is still gusting, but the tent is standing.'],
  pic: ['hill', 'tent', 'rock', 'pond'],
  qs: [
    { k: 'yn', q: 'The tent was flipping past the rocks.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did they set rocks on the pegs?', opts: ['It was gusting.', 'Raj was napping.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'Have you gone camping? Write what you did.', a: 'Any answer from the child\'s life, for example: I went camping at a lake. Help write one short sentence.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  "id": "suffix-es", "hunt": "Underline every word that ends in -es.",
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
/* step 22, story 2 */
Atlas.decodable.more('suffix-es', {
  words: ['foxes', 'lunches', 'glasses', 'rushes', 'tosses', 'splashes', 'hushes', 'kisses', 'benches', 'boxes', 'wishes', 'dashes'],
  title: 'Six Fox Kits',
  text: ['Deb and Gramps sit on a bench by the pond. Gramps has his glasses and two lunches in a bag.',
    'Then a red fox rushes past the bench. Six fox kits dash up the hill. "Look at all the foxes!" Deb gasps.',
    'The kits romp in the grass. One kit tosses a stick. One kit splashes in the pond and then rushes back. Deb wishes she can pet one.',
    'Gramps hushes Deb. The mother fox sniffs. Then the foxes dash to a den. Deb kisses Gramps. "That was the best lunch!"'],
  pic: ['hill', 'fox', 'fox', 'pond'],
  qs: [
    { k: 'choice', q: 'How many fox kits did Deb see?', opts: ['two', 'six', 'ten'], a: 1, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['Deb and Gramps sit on a bench.', 'The kits romp in the grass.', 'The foxes dash to a den.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'draw', q: 'Draw the fox kits on the hill.', a: 'Small foxes on a hill or in grass, maybe one splashing in a pond, with two people on a bench.', code: 'C1.4' }
  ]
});
/* step 22, story 3 */
Atlas.decodable.more('suffix-es', {
  words: ['boxes', 'dresses', 'glasses', 'dishes', 'brushes', 'rushes', 'wishes', 'fixes', 'passes', 'kisses', 'messes', 'buses'],
  title: 'Boxes in the Shed',
  text: ['Pam and Tom help Gran in the shed. Gran has lots of stuff in boxes to sell.',
    'In the boxes are dresses, glasses, dishes and brushes. Pam rushes to set the boxes on the grass.',
    'Then Tom digs in a box and gasps. In it is a red truck with a dent. "That was my truck when I was six!" Tom wishes he can have it back.',
    'A man stops and picks up the truck. Tom is sad. Gran fixes it. "That truck is not to sell," she says, and she passes it to Tom. Tom kisses Gran.'],
  pic: ['house', 'box', 'truck'],
  qs: [
    { k: 'choice', q: 'What did Tom get in the box?', opts: ['a bell', 'a red truck', 'a lamp'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Gran lets the man have the truck.', a: false, code: 'C3.2' },
    { k: 'choice', q: 'What is the big thing in this story?', opts: ['Tom gets his truck back.', 'Pam gets a dress.'], a: 0, code: 'C2.6' }
  ]
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
/* step 23, story 2 */
Atlas.decodable.more('tch', {
  words: ['hatch', 'hutch', 'batch', 'scratch', 'notch', 'fetch', 'twitch', 'sketch', 'latch', 'match', 'patch', 'itch'],
  title: 'The Eggs Hatch',
  text: ['Lin and Dad have six hens in a hutch. One hen sits on a batch of eggs. Lin checks the eggs and watches.',
    'Then one egg twitches. Scratch, scratch! The egg has a crack and a notch in it.',
    'Lin runs to fetch Dad. "The eggs will hatch!" Dad and Lin sit by the hutch to watch. A wet chick pops up. Then the next egg hatches, and the next.',
    'At last, six chicks sit in the hutch. Lin sketches the chicks and pins the sketch up in the shed.'],
  pic: ['house', 'hen', 'nest'],
  qs: [
    { k: 'yn', q: 'One egg twitches.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['The hen sits on the eggs.', 'Lin runs to get Dad.', 'Six chicks sit in the hutch.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'choice', q: 'Why did Lin run to Dad?', opts: ['The eggs will hatch.', 'The hens ran off.'], a: 0, code: 'C3.2' }
  ]
});
/* step 23, story 3 */
Atlas.decodable.more('tch', {
  words: ['catch', 'patch', 'stitch', 'match', 'pitch', 'stretch', 'snatch', 'ditch', 'scratch', 'switch', 'clutch', 'batch'],
  title: 'The Patch on the Mitt',
  text: ['Nell has a ball mitt. At a ball match, she can catch and pitch. But the mitt has a big rip in it.',
    'Gran stitches a red patch on the mitt. Stitch, stitch, stitch. "This will do," said Gran.',
    'At the next match, a kid hits the ball. Smack! It zips up and up. Nell runs and runs. She stretches up the mitt. Snap! It is in the mitt! It is a big catch!',
    'The kids yell and clap. Nell grins at Gran. Gran taps the red patch. "That patch can catch!" she said.'],
  pic: ['sun', 'ball', 'mitt'],
  qs: [
    { k: 'choice', q: 'What did Gran stitch on the mitt?', opts: ['a red patch', 'a big bell', 'a pink hat'], a: 0, code: 'C1.1' },
    { k: 'write', q: 'Who can help you fix things? Write what they fixed.', a: 'Any answer from the child\'s life, for example: Dad fixed my bike. Help write one short sentence.', code: 'C2.5' },
    { k: 'draw', q: 'Draw Nell and the big catch.', a: 'A child stretching up with a mitt, catching a ball. The mitt may have a red patch.', code: 'C1.4' }
  ]
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
/* step 24, story 2 */
Atlas.decodable.more('dge', {
  words: ['fudge', 'fridge', 'nudge', 'budge', 'wedge', 'edge', 'dodge', 'smudge', 'badge', 'judge', 'ledge', 'ridge'],
  title: 'Fudge in the Fridge',
  text: ['Ted and Mom mix a pot of fudge. Mom sets the pan of fudge in the fridge.',
    'Ted has a pup, Midge. Midge sniffs at the fridge and nudges it. The fridge will not budge.',
    'Then Ted gets a wedge of fudge. A bit of it drops at the edge of the rug. Midge dodges past Ted, but Mom snatches it up. "Fudge is not a snack a pup can have," said Mom.',
    'Ted gets Midge a dog snack. Midge is glad. Ted has a smudge of fudge on his chin.'],
  pic: ['dog', 'pot', 'pan'],
  qs: [
    { k: 'yn', q: 'Midge gets the bit of fudge.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why did Mom snatch the fudge?', opts: ['A pup can not have fudge.', 'Mom wants a snack.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What snack do you want to have?', a: 'Any answer from the child\'s life, for example: I like apples. Help write one short sentence.', code: 'C2.5' }
  ]
});
/* step 24, story 3 */
Atlas.decodable.more('dge', {
  words: ['ridge', 'badge', 'bridge', 'trudge', 'nudge', 'edge', 'ledge', 'hedge', 'budge', 'fudge', 'lodge', 'smudge'],
  title: 'Up on the Ridge',
  text: ['Pam and Rob are at camp in the hills. To get a camp badge, they must trek to the top of the ridge.',
    'They cross a log bridge and trudge up the rocks. Pam nudges him on.',
    'At the edge of a ledge, Pam stops. Past a hedge, an elk is standing very still. Rob and Pam do not budge. Then the elk trots off.',
    'At the top, Pam and Rob can see the camp, the pond and the bridge. They get a badge and a hunk of fudge. "Every bit of that trek was the best," said Rob.'],
  pic: ['hill', 'bridge', 'moose', 'tent'],
  qs: [
    { k: 'order', q: 'Put the story in order.', items: ['Pam and Rob cross a bridge.', 'They spot an elk.', 'They get a badge.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'What did Pam and Rob get at camp?', opts: ['a badge and fudge', 'a hat and a bag', 'a sled'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Rob and Pam did not want the elk to run off.', a: true, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  "id": "two-closed", "hunt": "Underline every word with two syllables.",
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
/* step 25, story 2 */
Atlas.decodable.more('two-closed', {
  words: ['chipmunk', 'cabin', 'muffin', 'bathtub', 'attic', 'bandit', 'fantastic', 'upset', 'hotdog', 'until', 'laptop', 'hiccup'],
  title: 'The Muffin Bandit',
  text: ['Kevin and his dad went to a cabin in the hills. It was a fantastic cabin.',
    'At lunch, Kevin had a muffin on a napkin. Then he went to get his mitten. When he got back, the muffin was gone!',
    'Kevin had a problem. Dad and Kevin hunted on the rug and in the basket. Then they spotted a chipmunk on the bathtub. It had muffin bits on its chin!',
    'Kevin did not get upset. "Dad, it is a muffin bandit!" he said. The chipmunk dashed up to the attic.'],
  pic: ['house', 'basket'],
  qs: [
    { k: 'choice', q: 'What had the muffin?', opts: ['a chipmunk', 'a kitten', 'a rabbit'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Kevin was mad at the chipmunk.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw the muffin bandit.', a: 'A chipmunk with a muffin or crumbs, maybe on a bathtub.', code: 'C1.4' }
  ]
});
/* step 25, story 3 */
Atlas.decodable.more('two-closed', {
  words: ['inuksuk', 'inlet', 'sandbank', 'problem', 'bottom', 'splendid', 'sunset', 'until', 'upset', 'Calvin', 'contest', 'tablet'],
  title: 'The Big Inuksuk',
  text: ['Calvin and his mom went on a trip to Nunavut. At the edge of an inlet sat a big inuksuk, a stack of rocks as big as a man.',
    '"People set up an inuksuk to help on a long trek," said Mom. Calvin went to stack one on the sandbank.',
    'Calvin had a problem. His rocks did not sit flat. Thud! The stack fell. Then Mom held up a flat rock. "Set this at the bottom."',
    'Rock by rock, the stack got big. At sunset, Calvin had a splendid inuksuk. He sat with Mom until the sun was gone.'],
  pic: ['sun', 'inuksuk', 'rock', 'pond'],
  qs: [
    { k: 'choice', q: 'What is an inuksuk?', opts: ['a stack of rocks', 'a big fish', 'a cabin'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['Calvin spots a big inuksuk.', 'His stack fell.', 'Calvin had an inuksuk at sunset.'], show: [1, 0, 2], code: 'C3.3' },
    { k: 'choice', q: 'What is the big thing in this story?', opts: ['Calvin did not quit.', 'Calvin had a nap.'], a: 0, code: 'C2.6' }
  ]
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
/* step 26, story 2 */
Atlas.decodable.more('a-e', {
  words: ['skate', 'lake', 'shape', 'brave', 'rake', 'spade', 'scrape', 'game', 'came', 'wave', 'take', 'safe'],
  title: 'Skates on the Lake',
  text: ['Kate and Nate take skates to the lake. Dad came as well. Dad has a rake and a spade to scrape the lake.',
    'Nate skates fast. Kate skates in a big zigzag. Then Kate trips and lands flat. Thump!',
    'Kate is safe, but she is mad. "I hate this game!" Nate skates up. "You are brave," he said. "Let us skate in a snake shape." They skate in a long snake.',
    'Dad waves at them. Then Dad trips! "You are safe, Dad!" said Kate. "Get up and skate!"'],
  pic: ['sun', 'skate', 'pond'],
  qs: [
    { k: 'choice', q: 'What did Dad have to scrape the lake?', opts: ['a rake and a spade', 'a cake and a plate'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Nate helps Kate.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw Kate and Nate in a snake shape.', a: 'Two children holding hands, skating on a lake in a wavy line.', code: 'C1.4' }
  ]
});
/* step 26, story 3 */
Atlas.decodable.more('a-e', {
  words: ['whale', 'wave', 'shape', 'cape', 'shade', 'made', 'take', 'Jade', 'late', 'lane', 'gate', 'name'],
  title: 'Jade and the Whale',
  text: ['Jade and Gran take a ship to see the whales. The ship rocks on the waves. Jade has a red cape.',
    'They stand and stand. No whales. Jade is sad. "Is it late? Are the whales gone?"',
    'Then a big black shape lifts up from the waves. It is a whale! It blasts a jet of mist. The whale flaps its fin and slaps the waves. Splash! Jade and Gran get wet.',
    'Jade waves at the whale. Gran grins. "That was a whale of a trip," she said. On the trip back, Jade naps in the shade.'],
  pic: ['sun', 'ship', 'fish'],
  qs: [
    { k: 'yn', q: 'Jade and Gran get wet.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'How was Jade at the end?', opts: ['glad', 'mad'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What big animal do you want to see?', a: 'Any answer from the child\'s life, for example: I want to see a moose. Help write one short sentence.', code: 'C2.5' }
  ]
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
/* step 27, story 2 */
Atlas.decodable.more('i-e', {
  words: ['hike', 'stripe', 'pine', 'side', 'while', 'white', 'miles', 'wide', 'smile', 'time', 'spine', 'like'],
  title: 'The White Stripes',
  text: ['Clive and his mom hike up a hill. The path twists past big pines.',
    'Then the path splits. Clive and Mom stop. Which side? Mom has no map.',
    'Then Clive spots a white stripe on a pine. "Mom, look! That stripe tells us the path!" On the next pine is a white stripe, and on the next.',
    'Clive and Mom hike on. In a while, they get to the top. They can see miles of pines and a wide lake. Clive smiles. "Next time, I will spot the stripes," he said.'],
  pic: ['spruce', 'spruce', 'hill', 'pond'],
  qs: [
    { k: 'choice', q: 'What did Clive spot on the pine?', opts: ['a white stripe', 'a red kite', 'a bike'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['The path splits.', 'Clive spots a stripe.', 'They get to the top.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'yn', q: 'The stripes help them get to the top.', a: true, code: 'C3.2' }
  ]
});
/* step 27, story 3 */
Atlas.decodable.more('i-e', {
  words: ['dive', 'time', 'wide', 'smile', 'fine', 'five', 'side', 'like', 'glide', 'white', 'tide', 'mile'],
  title: 'Time to Dive',
  text: ['Lin and Nan swim at the lake. Nan likes to dive off the dock. Splash! Then she bobs up and smiles.',
    'Lin stands at the end of the dock. Lin is stiff. "I will dive next time," he said.',
    'Nan swims up. "Take your time. Just bend and tip in," she said. Lin bends. He tips. Splash! He swims to Nan with a wide smile.',
    '"That was fine!" said Lin. He dives five times. At the end, Nan and Lin sit on the dock in the sun. A white gull glides past. "I like to dive," said Lin.'],
  pic: ['sun', 'bird', 'pond'],
  qs: [
    { k: 'choice', q: 'Who dives off the dock and smiles?', opts: ['Nan', 'Lin', 'a gull'], a: 0, code: 'C1.1' },
    { k: 'write', q: 'What is a thing you did when you felt brave?', a: 'Any answer from the child\'s life, for example: I swam in the deep end. Help write one short sentence.', code: 'C2.5' },
    { k: 'draw', q: 'Draw Lin on the dock.', a: 'A child on a dock over water, maybe diving, with Nan in the lake.', code: 'C1.4' }
  ]
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
/* step 28, story 2 */
Atlas.decodable.more('o-e', {
  words: ['slope', 'drove', 'rode', 'stone', 'froze', 'hope', 'woke', 'Cole', 'broke', 'spoke', 'those', 'cone'],
  title: 'Cole on the Slope',
  text: ['Cole and Dad drove to the big slope. Cole had a sled and a rope.',
    'Cole rode the sled from the top. Zip! He went fast. Then the sled hit a stone and spun. Cole fell in a drift with frost on his nose.',
    'Dad ran up. "Cole! Is all well?" Cole sat up and froze. Then he got a big smile. "I hope I can do that again!" he said.',
    'Cole rode the slope six times. On the drive home, he had a nap with his nose in his hat.'],
  pic: ['hill', 'sled', 'rock'],
  qs: [
    { k: 'yn', q: 'The sled hit a stone.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'How was Cole at the end?', opts: ['sad', 'glad', 'mad'], a: 1, code: 'C3.2' },
    { k: 'draw', q: 'Draw Cole in the drift.', a: 'A child in a pile of snow beside a sled on a hill, with frost on his nose.', code: 'C1.4' }
  ]
});
/* step 28, story 3 */
Atlas.decodable.more('o-e', {
  words: ['mole', 'hole', 'those', 'hope', 'poke', 'stone', 'home', 'nose', 'close', 'woke', 'rode', 'note'],
  title: 'The Mole and the Hole',
  text: ['Tess and Gramps have a big plot of plants. They have kale, mint and plums.',
    'Then Gramps spots a hole. Then a hole next to it! "What dug all those holes?" said Gramps.',
    'Tess sits still by a hole and hopes. A small black nose pokes up. Then a mole pops up! It blinks at Tess and hides in the hole.',
    '"A mole munches on bugs and grubs, not on plants," said Gramps. Tess sets a stone by the hole. "This is the mole\'s home," she said. Gramps smiles. "Then the mole can live here as well."'],
  pic: ['sun', 'flower', 'rock', 'bug'],
  qs: [
    { k: 'choice', q: 'What dug the holes?', opts: ['a dog', 'a mole', 'a fox'], a: 1, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['Gramps spots a hole.', 'A mole pops up.', 'Tess sets a stone by the hole.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'The mole munches on the plants.', a: false, code: 'C1.1' }
  ]
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
/* step 29, story 2 */
Atlas.decodable.more('u-e', {
  words: ['tube', 'cute', 'tune', 'dune', 'rule', 'use', 'Luke', 'mute', 'flute', 'cube', 'June', 'these'],
  title: 'Luke and the Tube',
  text: ['It is hot. Luke and his mom take tubes to the lake. Luke has a cute red tube.',
    'Luke sits in his tube and drifts. He hums a tune. Then he has a nap.',
    'Luke sits up. The dock is not close! A gust has pushed his tube past the dunes. Luke is not sure what to do.',
    'Then Mom kicks up to him on a tube. "Rule one," she said. "Use a rope." She hands Luke a rope and tugs his tube back. "Next time, I will use the rope," said Luke.'],
  pic: ['sun', 'pond', 'rope'],
  qs: [
    { k: 'choice', q: 'What did Mom use to get Luke back?', opts: ['a rope', 'a flute', 'a net'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Luke was upset when he sat up.', a: true, code: 'C3.2' },
    { k: 'write', q: 'What is a rule you use at a lake?', a: 'Any sensible water rule, for example: Swim with a grown-up. Help write one short sentence.', code: 'C2.5' }
  ]
});
/* step 29, story 3 */
Atlas.decodable.more('u-e', {
  words: ['mule', 'cube', 'rule', 'cute', 'tune', 'use', 'Prune', 'Steve', 'Eve', 'Jude', 'these', 'flute'],
  title: 'Prune the Mule',
  text: ['Steve and Eve are at camp. They get to ride a mule, Prune. She is a cute mule with a tan nose.',
    '"Up the hill!" said Steve. Prune stands still. She will not budge. Steve tugs the rope. No use.',
    'Then Jude, a man at the camp, has a tip. "Prune likes sugar cubes. It is the rule. No sugar, no trip." Eve has a sugar cube. Prune munches it and trots up the hill!',
    'At the top, the kids can see the whole camp. "Prune is a mule with rules," said Eve. Steve gave Prune one last cube.'],
  pic: ['hill', 'tent', 'rope'],
  qs: [
    { k: 'yn', q: 'Prune will not budge when Steve tugs.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['Prune will not budge.', 'Eve has a sugar cube.', 'Prune trots up the hill.'], show: [2, 1, 0], code: 'C3.3' },
    { k: 'choice', q: 'What is the big thing in this story?', opts: ['a mule with a rule', 'a mule that is lost'], a: 0, code: 'C2.6' }
  ]
});
Atlas.decodable.add({
  id: 'open', hunt: 'Underline every word that ends with a vowel.', band: '1', name: 'Open syllables', focus: ['go', 'me', 'hi'], key: 'go, ro-bot',
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
/* step 30, story 2 */
Atlas.decodable.more('open', {
  words: ['taco', 'salsa', 'mango', 'tofu', 'soda', 'banjo', 'hi', 'so', 'Hana', 'Kofi', 'menu', 'extra'],
  title: 'Hana and the Tacos',
  text: ['Hana and Kofi help Dad with tacos. Hana chops a mango. Kofi mixes the salsa. Dad cuts up tofu.',
    '"Hi!" said Gran at the back step. She has lemon soda and a banjo.',
    'Then the salsa slips! It lands on the rug in a red splat. Kofi is upset. "No! The salsa!" Hana grins. "We have a mango. We can make a fresh salsa."',
    'So the kids mix a fresh salsa, and they all sit and have tacos. Then Gran strums the banjo. What a fun time!'],
  pic: ['house', 'pot', 'pan'],
  qs: [
    { k: 'choice', q: 'What did Hana chop?', opts: ['a mango', 'a tofu', 'a lemon'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw the salsa on the rug.', a: 'A red splat on a rug, maybe with the children nearby.', code: 'C1.4' },
    { k: 'choice', q: 'Why did they mix a fresh salsa?', opts: ['The salsa slips on the rug.', 'Gran did not like it.'], a: 0, code: 'C3.2' }
  ]
});
/* step 30, story 3 */
Atlas.decodable.more('open', {
  words: ['Canada', 'tuna', 'umbrella', 'tuba', 'Nana', 'Ada', 'soda', 'hi', 'so', 'go', 'extra', 'panda'],
  title: 'Tulips and a Tuba',
  text: ['Ada and Nana go on a bus to see the tulips. Nana has a red umbrella.',
    'The tulips are open. Ada spots red, pink and white tulips. "This is the best spot in Canada!" said Ada.',
    'Then a big gust grabs Nana\'s umbrella. It flips and spins over the tulips! A man with a tuba runs and grabs it. "Hi! Is this your umbrella?" he said.',
    '"Yes! Thank you so much," said Nana. Then the man puffs a tune on his tuba. Ada and Nana sit and sip a mango soda. "That was so much fun," said Ada.'],
  pic: ['sun', 'flower', 'flower', 'bus'],
  qs: [
    { k: 'yn', q: 'A gust grabs the umbrella.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Put the story in order.', items: ['Ada and Nana go to see the tulips.', 'A gust grabs the umbrella.', 'A man puffs a tune on his tuba.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'write', q: 'What spot in Canada would you like to go to?', a: 'Any place, near or far, for example: I want to go to the Rocky Mountains. Help write one short sentence.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'y-vowel', hunt: 'Underline every word with y at the end.', band: '1', name: 'y as a vowel', focus: ['y'], key: 'my, happy',
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
/* step 31, story 2 */
Atlas.decodable.more('y-vowel', {
  words: ['sky', 'try', 'frosty', 'shy', 'sticky', 'fluffy', 'dry', 'lucky', 'bumpy', 'cry', 'sandy'],
  title: 'A Bumpy Ride',
  text: ['It is frosty and sunny. Penny and Dad take the sled to a big, bumpy hill.',
    '"Let me try it by myself," said Penny. She sits on the sled and pushes off. Bump, bump, bump! The sled zips and hops. Penny can fly!',
    'Then the sled tips. Penny lands in a fluffy drift. Penny is white with frost, but she is grinning.',
    '"That was fun," she said. "Can you ride with me this time?" So Dad and Penny ride the sled. What a happy, bumpy trip!'],
  pic: ['sun', 'hill', 'sled'],
  qs: [
    { k: 'choice', q: 'Where did Penny land?', opts: ['in a fluffy drift', 'in a pond', 'on Dad'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Penny sits on the sled.', 'The sled tips.', 'Dad and Penny ride the sled.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'Penny is sad at the end.', a: false, code: 'C3.2' }
  ]
});
/* step 31, story 3 */
Atlas.decodable.more('y-vowel', {
  words: ['my', 'baby', 'tiny', 'shiny', 'fussy', 'misty', 'jolly', 'messy', 'fifty', 'by', 'why', 'navy'],
  title: 'Benny and the Tiny Fish',
  text: ['Benny and his granny fish from the dock by the lake. It is misty and still.',
    '"When will I get a fish?" Benny asks. "Sit still," said Granny. "Fish do not like a fussy kid." Benny sits so still that a dragonfly lands on his hat.',
    'Then his rod bends. Benny tugs. Up comes a fish! It is a tiny, shiny fish. It fits in his hand!',
    '"It is my fish!" Benny yells. "It is a baby," said Granny. "Let it go, and it can get big." Benny drops it in the lake. "Get big," he said.'],
  pic: ['sun', 'hat', 'fish'],
  qs: [
    { k: 'yn', q: 'The fish is big.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why did Benny let the fish go?', opts: ['It is a baby.', 'It bit him.', 'Granny is mad.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What do you like to do with your family?', a: 'Any answer from the child\'s life, such as fishing, baking or a walk. Help write one short sentence.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'soft-cg', hunt: 'Underline every word with a soft c or soft g.', band: '1', name: 'Soft c and soft g', focus: ['ce', 'ci', 'ge'], key: 'city, page',
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
/* step 32, story 2 */
Atlas.decodable.more('soft-cg', {
  words: ['ace', 'place', 'mice', 'lace', 'space', 'dice', 'pace', 'slice', 'twice', 'nice', 'fence'],
  title: 'Grace on the Ice',
  text: ['Grace and Dad go to the city rink. The ice is slick and shiny. Kids race past. Grace hangs on the fence. She will not let go.',
    '"Just slide one skate, then the next," said Dad. "Slide, slide. Take it at a nice pace."',
    'Grace lets go of the fence. Slide, slide. She is skating! Then she slips and lands on the ice. Bump!',
    'Grace gets up and brushes off the ice. She is grinning. "Dad, let us race to the fence!" And Grace wins the race.'],
  pic: ['sun', 'spruce', 'skate'],
  qs: [
    { k: 'choice', q: 'What did Grace hang on to?', opts: ['the fence', 'a pole', 'a dog'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Grace hangs on the fence.', 'Grace slips on the ice.', 'Grace wins the race.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'write', q: 'What can you do on ice?', a: 'Any true answer, such as skate, slide or play hockey. Help write one short sentence.', code: 'C2.5' }
  ]
});
/* step 32, story 3 */
Atlas.decodable.more('soft-cg', {
  words: ['cage', 'prince', 'price', 'slice', 'cell', 'space', 'wince', 'page', 'spice', 'mince', 'huge'],
  title: 'Where Is Prince?',
  text: ['In Miss Price\'s class, a gecko named Prince lives in a cage. Prince has spots on his back.',
    'At lunch, Lucy lifts the lid to give Prince a snack. The cage is empty! The class is upset.',
    '"Do not panic," said Miss Price. "Let us check this place and that place." The class checks the bins, the desks and the pencil cups. No Prince.',
    'Then Vince spots a tiny face in his lunch box. Prince is on top of his rice! "Prince, that is my lunch!" said Vince. Miss Price sets Prince back in his huge cage.'],
  pic: ['house', 'box'],
  qs: [
    { k: 'choice', q: 'Why is the class upset?', opts: ['The cage is empty.', 'It is lunch.', 'Prince bit Vince.'], a: 0, code: 'C3.2' },
    { k: 'choice', q: 'Where was Prince?', opts: ['in a lunch box', 'in a desk', 'in a pencil cup'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw Prince in the lunch box.', a: 'A small lizard (gecko) sitting on rice in a lunch box. Ask the child how Vince felt.', code: 'C1.4' }
  ]
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
/* step 33, story 2 */
Atlas.decodable.more('ar', {
  words: ['arm', 'card', 'scarf', 'part', 'sharp', 'harp', 'charm', 'start', 'tarp', 'lark', 'yarn'],
  title: 'Arlo Makes a Card',
  text: ['Arlo\'s gran is sick in bed. Arlo wants to make Gran smile.',
    'He gets a big card and his art box. He sketches a garden with lots of stars in a dark sky.',
    'Then his twin, Carly, spills jam on the card! Arlo is upset. "It is a mess!" Then Arlo has a plan. He adds a jar to the jam spot. "It is a jam jar," he said.',
    'Gran gets the card. She has to smile. "This is the best card," she said. "And it is a bit sticky!"'],
  pic: ['bed', 'jar', 'star'],
  qs: [
    { k: 'yn', q: 'Carly spills jam on the card.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Arlo make a card?', opts: ['Gran is sick.', 'The cat is lost.', 'It is dark.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'Who can you make a card for?', a: 'Any name or person from the child\'s life (Gran, a friend, a teacher). Help write one short sentence.', code: 'C2.5' }
  ]
});
/* step 33, story 3 */
Atlas.decodable.more('ar', {
  words: ['bark', 'spark', 'far', 'mark', 'dart', 'marsh', 'tar', 'harm', 'chart', 'starch'],
  title: 'Barking in the Dark',
  text: ['Marcus and Dad camp at a big park. They set up a tent. Marcus has a dog named Sparky. Sparky is smart, but he barks a lot.',
    'It gets dark. Marcus and Dad sit at the camp stove and munch hot dogs. Then Sparky starts to bark and bark. There is a black and white animal by the tent!',
    '"Sparky, hush!" said Dad. "It is a skunk." The skunk sniffs the hot dog buns. Then it trots off in the dark.',
    '"That was close," said Dad. "Sparky, you are a smart dog, but do not bark at a skunk!"'],
  pic: ['moon', 'tent', 'pot', 'dog'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['They set up a tent.', 'Sparky barks.', 'The skunk trots off.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'The animal is a skunk.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Which word ends like bark?', opts: ['park', 'barn', 'bike'], a: 0, code: 'C3.1' }
  ]
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
/* step 34, story 2 */
Atlas.decodable.more('or', {
  words: ['for', 'torch', 'cord', 'sort', 'porch', 'thorn', 'score', 'sore', 'stork', 'forest', 'acorn'],
  title: 'A Fort in the Forest',
  text: ['Nora and Cory go on a hike in the forest. They want to make a fort.',
    'They drag logs and sticks and prop them on a big rock. The fort is short, but it has a door.',
    'Then Nora spots a chipmunk. It runs in the fort and munches an acorn.',
    '"The chipmunk likes it," said Cory. "Let him have it." So Nora and Cory make one more fort next to it. Then the kids sit in the big fort, and the chipmunk sits in the short one.'],
  pic: ['spruce', 'log', 'rock'],
  qs: [
    { k: 'yn', q: 'The chipmunk runs in the fort.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What did the chipmunk have?', opts: ['an acorn', 'a fork', 'a rock'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Which word ends like fort?', opts: ['short', 'for', 'corn'], a: 0, code: 'C3.1' }
  ]
});
/* step 34, story 3 */
Atlas.decodable.more('or', {
  words: ['pork', 'chore', 'snort', 'tore', 'morning', 'scorch', 'bore', 'cork', 'forth', 'stork'],
  title: 'Who Snores?',
  text: ['Tori and Morgan camp in the den at Gran\'s home. They have quilts on the floor and a lamp.',
    'At ten, Gran shuts off the lamp. Then there is a snore. "Morgan, is that you?" Tori asks. "No," said Morgan. "I think it is you."',
    'Snore! Snort! Is it Gran? Tori gets the lamp and shines it on the floor. There, on the rug, is Porky the pug. He is on his back, snoring.',
    '"Porky, hush!" said Morgan. Porky just snores more. In the morning, Gran asks, "Did you rest?" "Not a lot," said Tori. "Porky snored and snored!"'],
  pic: ['moon', 'house', 'lamp', 'dog'],
  qs: [
    { k: 'choice', q: 'Who is snoring?', opts: ['Porky', 'Gran', 'Tori'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Tori and Morgan had a lot of rest.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw Porky on the rug.', a: 'A small dog (a pug) on its back on a rug, maybe with snore lines. Ask the child why Tori and Morgan did not rest.', code: 'C1.4' }
  ]
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
/* step 35, story 2 */
Atlas.decodable.more('er-ir-ur', {
  words: ['herd', 'third', 'term', 'skirt', 'surf', 'firm', 'churn', 'burst', 'curb', 'twirl', 'jerk'],
  title: 'Shirin Curls',
  text: ['Shirin and her grandpa Herb go to the curling rink. It is her first time. "Curling is a sport on ice," said Herb.',
    'Shirin sets her hand on the stone and slides. She lets go. The stone turns and slips past the rings. It stops at the back.',
    '"Turn it a bit," said Herb. "And push less hard."',
    'Shirin has a third turn. The stone curls, slides and stops in the red ring. Herb claps. "That is a perfect shot!" Shirin grins. She wants to curl next winter.'],
  pic: ['snow', 'house'],
  qs: [
    { k: 'yn', q: 'It is Shirin\'s first time at curling.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['The stone stops at the back.', 'Herb tells Shirin what to do.', 'The stone stops in the red ring.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'write', q: 'What sport do you like?', a: 'Any sport or game the child likes, such as hockey, soccer or swimming. Help write one short sentence.', code: 'C2.5' }
  ]
});
/* step 35, story 3 */
Atlas.decodable.more('er-ir-ur', {
  words: ['under', 'sister', 'river', 'burger', 'after', 'litter', 'dirty', 'thirsty', 'perky', 'blur', 'spur', 'whirl'],
  title: 'Litter by the River',
  text: ['Bert and his sister Fern go to the river with Dad. They have big bags. It is time to pick up litter.',
    'Fern spots a burger box in the dirt. Bert gets a cup and a torn shirt. Fern picks up a sock under a fern.',
    'Then Bert slips in the mud. Splat! His pants are dirty. "I am a litter bug!" he said.',
    'At the end, the bags are full. Then Fern spots a fish in the water. It is a perch! "That fish is glad," said Bert. "Its river is not a mess."'],
  pic: ['bag', 'cup', 'fish'],
  qs: [
    { k: 'choice', q: 'What did Fern spot in the dirt?', opts: ['a burger box', 'a shirt', 'a sock'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why is the fish glad?', opts: ['Its river is not a mess.', 'It has a burger.', 'Bert slips.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the perch in the river.', a: 'A fish in clean water, maybe with Bert and Fern and full bags on the bank. Ask the child why picking up litter helps.', code: 'C1.4' }
  ]
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
/* step 36, story 2 */
Atlas.decodable.more('ai-ay', {
  words: ['trail', 'way', 'chain', 'may', 'pail', 'sway', 'brain', 'spray', 'stain', 'plain', 'fair'],
  title: 'Gail and the Snail',
  text: ['After the rain, Gail and her dad go for a walk on the trail by the lake. The trail is wet.',
    'Gail stops. On a rock by the trail, there is a snail. It slides on the rock and makes a shiny trail.',
    '"Can I take it home?" asks Gail. "It can live in a tray." Dad is not sure. "A snail is happy here. It has rain, plants and shade. In a tray, it may be sad."',
    'Gail sets the snail on a wet fern by the trail. "Stay here, Snail. This is your home." On the way back, Gail spots six more snails. "Hi, snails!" she said. "I hope you have a nice day."'],
  pic: ['cloud', 'spruce', 'rock'],
  qs: [
    { k: 'yn', q: 'Gail takes the snail home.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why is the snail happy by the trail?', opts: ['It has rain, plants and shade.', 'It has a tray.', 'It has clay.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the snail on the trail.', a: 'A snail with a swirl on its shell, on a rock or fern by a path. Ask the child why Gail let it stay.', code: 'C1.4' }
  ]
});
/* step 36, story 3 */
Atlas.decodable.more('ai-ay', {
  words: ['bay', 'stairs', 'today', 'raisin', 'claim', 'paid', 'sprain', 'delay', 'fail', 'railway'],
  title: 'Jay Waits for Mail',
  text: ['Jay has a pen pal named Tayla. Tayla is Inuk. She lives up North, in a small place by a bay.',
    'Jay makes Tayla a letter. He tells her that he has a cat named Daisy. He adds a painting of Daisy on the stairs. Then he mails it.',
    'Jay waits. Day one, no mail. Day two, no mail. He waits eight days. "It is a long way North," said Mom. "The mail may have to go on a plane."',
    'On day nine, there is a fat letter in the mail. It is from Tayla! She sent a painting of her sled dogs on the ice.',
    'Jay sets the painting on his wall. Then he gets his paints and makes Tayla a painting back. "Mail takes a long time," said Jay, "but it is the best."'],
  pic: ['plane', 'house', 'dog', 'sled'],
  qs: [
    { k: 'yn', q: 'Jay waits eight days.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the mail take a long time?', opts: ['Tayla lives far from Jay.', 'Jay lost it.', 'Daisy ate it.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What can you tell a pen pal?', a: 'Any true detail from the child\'s life: a pet, a game, a food, the weather. Help write one short sentence.', code: 'C2.5' }
  ]
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
/* step 37, story 2 */
Atlas.decodable.more('ee-ea', {
  words: ['sweet', 'heat', 'peek', 'clean', 'steam', 'need', 'leak', 'treat', 'cheek', 'deep', 'meat'],
  title: 'Sweet Sap',
  text: ['It is early spring. Dean and his grandpa go to the sugar bush. Dean\'s grandpa is Cree. "My family has made syrup from sap for a long, long time," he said.',
    'Each tree has a pail on it. The sap leaks in the pails. Dean peeks in a pail. The sap is clear, like water. "It is not sweet!" he said.',
    '"Not yet," said Grandpa. "We need to heat it." They heat the sap in a big pan for a long time. At last, the sap is thick, sweet syrup.',
    'Grandpa drips hot syrup on a tray of clean, crushed ice. Dean twists it on a stick and eats it. "That is a sweet treat," said Dean.'],
  pic: ['maple', 'house', 'pot'],
  qs: [
    { k: 'yn', q: 'The sap is sweet when it drips from the tree.', a: false, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Dean peeks in a pail.', 'They heat the sap.', 'Dean eats the sweet treat.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'choice', q: 'Why did they heat the sap?', opts: ['to make it sweet', 'to make ice', 'to clean the pails'], a: 0, code: 'C3.2' }
  ]
});
/* step 37, story 3 */
Atlas.decodable.more('ee-ea', {
  words: ['free', 'cheer', 'three', 'keep', 'creek', 'dream', 'beam', 'speed', 'hockey', 'valley', 'jeans'],
  title: 'Reena and the Team',
  text: ['Reena is on a hockey team. Each week, the team meets at the rink by the creek.',
    'Reena likes the team, but she is not fast. Her feet slip, and she cannot keep up. Neal and Jean zip past her. "I will never get the puck," she said.',
    'Then there is a big game. At the end, the teams are even. Neal has the puck, but three big kids block him. He cannot get free. Reena is in an open spot by the net.',
    '"Neal, pass it to me!" she yells. He passes the puck. Reena keeps it on her stick and slaps it. It hits the back of the net!',
    'The team cheers. Reena beams. "You did not need to be fast," said Neal. "You just needed to be in the best spot."'],
  pic: ['spruce', 'skate', 'net'],
  qs: [
    { k: 'yn', q: 'Reena is fast.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why did Neal pass to Reena?', opts: ['She is in an open spot.', 'She is fast.', 'She has a hat.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What did Reena learn?', a: 'You do not need to be the fastest to help the team; being in the best spot matters too. Accept any answer close to this.', code: 'C2.6' }
  ]
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
/* step 38, story 2 */
Atlas.decodable.more('oa-ow', {
  words: ['oak', 'croak', 'soak', 'float', 'low', 'foam', 'glow', 'toast', 'own', 'throw', 'load'],
  title: 'Toads on the Road',
  text: ['It is a wet spring evening. Rain is soaking the road by the pond. Rowan and Mom go slow on the road home.',
    '"Stop!" said Rowan. "Toads!" There are toads on the road. Lots of toads! They hop from the grass to the pond to lay eggs.',
    'Mom stops the car. She puts on her coat, and Rowan gets a pail. They pick up the toads one by one and carry them in the pail. The toads are bumpy and wet. One toad is so big it fills Rowan\'s hand. "Hello, Toad," he said.',
    'They let the toads go by the pond. Croak, croak! Then Mom and Rowan go home. They go slow and look for toads all the way.'],
  pic: ['cloud', 'rain', 'frog', 'pond'],
  qs: [
    { k: 'yn', q: 'Rowan and Mom help the toads.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Mom stop the car?', opts: ['Toads are on the road.', 'It is late.', 'Rowan is sad.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw a toad in the pail.', a: 'A bumpy toad (or several) in a pail, maybe with rain. Ask the child where the toads were going.', code: 'C1.4' }
  ]
});
/* step 38, story 3 */
Atlas.decodable.more('oa-ow', {
  words: ['row', 'oar', 'coast', 'groan', 'moan', 'shadow', 'roam', 'pillow', 'elbow', 'tow', 'goal'],
  title: 'The Lost Oar',
  text: ['Owen and his gran row a boat on the lake. It is a still, warm morning.',
    'Then Gran lets go of an oar to show Owen a heron on a log. Splash! The oar slips off the boat. It floats off, slow and low on the water.',
    '"Oh no!" said Owen. Gran has one oar. She rows, but the boat just spins. A gust starts to blow. The boat drifts. Gran groans.',
    'Then Owen spots the oar. It is stuck in the reeds by the shore. "Gran, row on this side, then on that side," he said. The boat creeps up to the reeds. Owen grabs the oar.',
    'At last they float back to the dock, where Mom waits. "What a show!" she jokes. Gran grins. "Owen is the captain of this boat."'],
  pic: ['sun', 'canoe', 'bird', 'log'],
  qs: [
    { k: 'yn', q: 'Gran drops an oar.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the boat spin?', opts: ['Gran has one oar.', 'Owen tips it.', 'A heron bumps it.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What can you do in a boat?', a: 'Any answer: row, fish, look at birds, swim off the side with a grown-up. Help write one short sentence.', code: 'C2.5' }
  ]
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
/* step 39, story 2 */
Atlas.decodable.more('igh-ie', {
  words: ['tied', 'fright', 'pies', 'sunlight', 'highway', 'lights', 'mighty', 'delight', 'skylight', 'spied', 'dried'],
  title: 'A Light in the Fog',
  text: ['Ivy lives by the sea, and her mom fishes in a boat. Each day, Ivy waits on the dock, and Mom sails home at five.',
    'This day, a thick fog rolls in. Ivy cannot see the sea. "How will Mom see the dock?" she asks Grandpa.',
    '"We need a light," said Grandpa, "and it must be bright." They go to the shed by the dock. In it is a big lamp on a high pole. Grandpa sets it up, and Ivy flips the switch. A bright light shines in the fog.',
    'They wait. Ivy sighs. A boat glides up to the dock. It is Mom! "I spotted your light," Mom said. "It was the right sight on a foggy day." Ivy hugs her tight.'],
  pic: ['cloud', 'lamp', 'ship'],
  qs: [
    { k: 'yn', q: 'Mom fishes in a boat.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Ivy and Grandpa need a light?', opts: ['so Mom can see the dock', 'to read', 'to get warm'], a: 0, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['A fog rolls in.', 'Ivy flips the switch.', 'A boat glides up to the dock.'], show: [2, 0, 1], code: 'C3.3' }
  ]
});
/* step 39, story 3 */
Atlas.decodable.more('igh-ie', {
  words: ['tonight', 'tight', 'midnight', 'flashlight', 'high', 'spotlight', 'nightfall', 'light', 'brightly', 'tie', 'pie'],
  title: 'Hari Takes a Flight',
  text: ['Hari and his dad fly from Calgary to Halifax to see Nani. It is Hari\'s first flight. He has a seat by the wing.',
    'The plane speeds up. It lifts off and goes up high. Hari grips his seat tight. "Will we be all right?" he asks. Dad smiles. "We will. Just look at the sky."',
    'Hari peeks. The sky is bright, and the plane is high over the land. The farms look like tiny green boxes. Hari is not afraid. What a sight!',
    'The flight is long. Hari naps. When he wakes up, it is night. Halifax is a sea of tiny lights.',
    'Nani is at the gate. She hugs Hari tight. "I made a pie for you, my brave pilot," she said. Hari grins. "Flights are fun," he said. "But pie is the best."'],
  pic: ['plane', 'star', 'house'],
  qs: [
    { k: 'choice', q: 'How did Hari feel when the plane went up?', opts: ['afraid', 'sleepy', 'mad'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'Nani made a pie.', a: true, code: 'C1.1' },
    { k: 'draw', q: 'Draw what Hari can see from the plane.', a: 'Fields like little squares, lakes, the sky, or the city lights at night. Ask the child to tell you about it.', code: 'C1.4' }
  ]
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
/* step 40, story 2 */
Atlas.decodable.more('oo-moon', {
  words: ['tool', 'loop', 'igloo', 'stool', 'soon', 'bloom', 'zoom', 'shoot', 'troop', 'goofy', 'roost'],
  title: 'An Igloo on the Ice',
  text: ['It is a still, bright day up North. Ruby and her grandpa go to the ice by the bay. Grandpa is Inuk. He will teach Ruby to make an igloo.',
    'Grandpa has a long tool with a sharp blade. He cuts big blocks of hard snow. Ruby helps him set the blocks in a loop. Soon there is a roof.',
    'Ruby fills the cracks with soft snow. She creeps in. It is cool, but the gusts cannot get in. "It is like a snug room!" she said.',
    'Grandpa brings a pot of soup and two spoons. They sit and sip soup in the igloo. "My grandpa made igloos with me, just like this," said Grandpa. "Soon you can make one too."'],
  pic: ['sun', 'snow', 'pot'],
  qs: [
    { k: 'yn', q: 'Ruby makes an igloo with Grandpa.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Grandpa cuts blocks of snow.', 'Ruby fills the cracks.', 'They sip soup in the igloo.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'Which word ends like soon?', opts: ['spoon', 'soap', 'sun'], a: 0, code: 'C3.1' }
  ]
});
/* step 40, story 3 */
Atlas.decodable.more('oo-moon', {
  words: ['baboon', 'groom', 'raccoon', 'booth', 'smooth', 'bamboo', 'kangaroo', 'droop', 'shampoo', 'proof', 'gloom'],
  title: 'Noor at the Zoo',
  text: ['Noor\'s class takes a trip to the zoo. Each kid is in a group with a grown-up. Noor is in a group with June, Hugo, Sami and Miss Rooney.',
    'First, they see a kangaroo. It hops in a big loop. At noon, they sit by a pool and eat lunch.',
    'Then they go to see the baboons. A baboon mom is grooming her baby. Noor looks and looks. When she turns, her group is not there!',
    'Noor\'s tummy feels tight. She thinks of the zoo rule: stay put and ask a zoo keeper. She spots a keeper with a broom. "I am lost," Noor said. "I am in Miss Rooney\'s group."',
    'The keeper makes a call. Soon, Miss Rooney and the group come running. Then the baby baboon hoots, as if to say, "See you soon!"'],
  pic: ['sun', 'spruce', 'pond'],
  qs: [
    { k: 'choice', q: 'What did Noor do when she got lost?', opts: ['She asks a zoo keeper.', 'She runs to the bus.', 'She sits and cries.'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Noor is glad at the end.', a: true, code: 'C3.2' },
    { k: 'write', q: 'What can you do if you get lost?', a: 'Stay put, and ask a safe grown-up for help, such as a worker or a parent with children. Help write one short sentence.', code: 'C2.5' }
  ]
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
/* step 41, story 2 */
Atlas.decodable.more('oo-book', {
  words: ['hook', 'book', 'took', 'look', 'good', 'stood', 'shook', 'foot', 'wool', 'brook', 'cook'],
  title: 'Look in the Brook',
  text: ['Jin and his grandpa went fishing at the brook. Jin took his rod and a hook. Grandpa took a wool blanket and a good book.',
    'Jin stood on a rock and cast his line. He looked and looked at the water, but no fish came. Grandpa sat on the grass with his book.',
    'Then the rod shook! Jin pulled and pulled, but the line was stuck on a log. "Look, Grandpa!" he said. "I got a log, not a fish!"',
    'Grandpa put his foot on the log and got the hook free. Jin cast his line one more time, and this time he got a fish. "Good job," said Grandpa. "We can cook it for lunch."'],
  pic: ['sun', 'fish', 'log', 'book'],
  qs: [
    { k: 'choice', q: 'What did Jin get on the hook first?', opts: ['a log', 'a fish', 'a book'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Jin and Grandpa had fish for lunch.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw Jin at the brook.', a: 'A child on a rock by a stream with a fishing rod, perhaps with a log or a fish on the line. Ask the child what Jin got first.', code: 'C1.4' }
  ]
});
/* step 41, story 3 */
Atlas.decodable.more('oo-book', {
  words: ['cook', 'took', 'look', 'good', 'stood', 'wood', 'shook', 'hook', 'cookbook', 'woof', 'nook', 'crook'],
  title: 'Dad\'s Cookbook',
  text: ['It was a snowy day in Winnipeg, so Nora and her dad stayed in. Dad took a big cookbook down from the shelf.',
    'Nora looked at the pages. "Can we cook this?" she asked. It was a pot pie with chicken and carrots. "Good pick," said Dad.',
    'Nora put on an apron and stood on a stool by the stove. She mixed the crust and pressed it in the pan. Dad cut up the chicken and the carrots. Then he put wood in the stove.',
    'Then they waited. The kitchen smelled so good! At last, Dad took the pie from the stove. Nora took a look. The top was crisp and brown. "This is the best pie in the book," said Nora. Dad shook his head. "No," he said. "It is the best pie in Winnipeg."'],
  pic: ['snow', 'book', 'pot'],
  qs: [
    { k: 'choice', q: 'Which is the best name for the story?', opts: ['Cooking with Dad', 'A Trip to the Farm', 'The Lost Book'], a: 0, code: 'C2.6' },
    { k: 'yn', q: 'Nora stood on a stool.', a: true, code: 'C1.1' },
    { k: 'write', q: 'What would you like to cook?', a: 'The child\'s own idea, such as pancakes, soup or a pie. Ask them to read it back to you.', code: 'C2.5' }
  ]
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
/* step 42, story 2 */
Atlas.decodable.more('ou-ow', {
  words: ['sound', 'loud', 'out', 'found', 'ground', 'shout', 'outside', 'count', 'round', 'mouth', 'cloud'],
  title: 'A Sound in the Night',
  text: ['Mina and her mom went camping in Algonquin Park. They set up the tent on soft ground.',
    'That night, Mina heard a loud sound outside. Crunch, crunch! "Mom!" she said. "What is that?" "Let us go and look."',
    'Mom got the flashlight, and they crept out of the tent. Mom shone the light on the ground. A round, furry face looked back at them. It was a raccoon! It had found the bag of snacks!',
    '"Shoo!" Mom shouted. The raccoon ran back to the trees. Mina counted the crackers that were left. "Next time," said Mom, "the snacks go in the car."'],
  pic: ['moon', 'star', 'tent', 'spruce'],
  qs: [
    { k: 'order', items: ['Mina heard a loud sound.', 'Mom shone the light.', 'Mina counted the crackers.'], show: [2, 0, 1], q: 'Number the sentences in order.', code: 'C3.3' },
    { k: 'choice', q: 'Why did the raccoon come to the tent?', opts: ['to get food', 'to sleep', 'to swim'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'Mina and her mom went camping.', a: true, code: 'C1.1' }
  ]
});
/* step 42, story 3 */
Atlas.decodable.more('ou-ow', {
  words: ['out', 'south', 'around', 'about', 'proud', 'cloud', 'ground', 'shout', 'found', 'sound', 'mount'],
  title: 'Out on the Land',
  text: ['In the spring, Leah went out on the land with her grandpa. They rode a snowmobile far out of town.',
    'Grandpa showed her an inuksuk on a hill. It was made of big, flat rocks. "People made it long ago," he said. "It tells us which way to go."',
    'In the afternoon, a thick cloud came down all around them. Leah could not see the town. All the ground was white. "Do not shout, and do not run," said Grandpa. "We wait."',
    'Soon the cloud lifted a bit. Leah spotted a dark shape on a hill. "The inuksuk!" They went to it, and from there Grandpa found the trail back to town. That night, Leah made a small inuksuk out of stones by the door. Grandpa was proud of her. "You found the way," he said.'],
  pic: ['cloud', 'snow', 'inuksuk', 'hill'],
  qs: [
    { k: 'yn', q: 'Leah and Grandpa ran in the cloud.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['getting back to town', 'a trip to the zoo', 'a lost dog'], a: 0, code: 'C2.6' },
    { k: 'write', q: 'How did the inuksuk help Leah and Grandpa?', a: 'It showed them where they were, so Grandpa could find the trail back to town.', code: 'C3.2' }
  ]
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
/* step 43, story 2 */
Atlas.decodable.more('oi-oy', {
  words: ['toy', 'boy', 'joy', 'foil', 'point', 'enjoy', 'join', 'coin', 'oil', 'soil', 'Troy'],
  title: 'Troy and the Toy Boat',
  text: ['Troy made a toy boat. He used a milk box, a stick and some foil for a sail. His sister Joyce helped him with the tape.',
    'They went down to the creek to test it. Troy set the boat on the water, and it went! "It floats!" he said with joy. Joyce pointed. "Look, it is going fast!"',
    'The boat went faster and faster. Then it hit a rock and tipped. Troy let out a yell. "Oh no! My toy!"',
    'Just then their dog, Roy, jumped in. He swam to the boat and came back with it in his mouth. The foil sail was a bit bent, but the boat was fine. Troy hugged the wet dog. "Good boy, Roy!" he said. "You can be the captain."'],
  pic: ['sun', 'dog', 'ship', 'rock'],
  qs: [
    { k: 'yn', q: 'The sail was made of foil.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'How did Troy feel when the boat tipped?', opts: ['upset', 'glad', 'sleepy'], a: 0, code: 'C3.2' },
    { k: 'order', items: ['Troy made a toy boat.', 'The boat hit a rock.', 'Roy got the boat.'], show: [1, 2, 0], q: 'Number the sentences in order.', code: 'C3.3' }
  ]
});
/* step 43, story 3 */
Atlas.decodable.more('oi-oy', {
  words: ['boil', 'join', 'joy', 'point', 'enjoy', 'noisy', 'spoil', 'soil', 'toil', 'moist', 'joint'],
  title: 'Boil It Down',
  text: ['In March, Noor and her class went to a sugar bush in Quebec. The sugar shack was full and noisy. Out in the woods, the trees dripped sap in pails.',
    'A man named Benoit pointed to a big pan on a fire. "We boil the sap for hours and hours," he said. "It boils down to syrup."',
    'Then Benoit poured hot syrup on clean snow. It made a soft, sticky strip. The kids rolled it up on sticks. Noor joined the line. She had to wait and wait.',
    'At last it was her turn. The taffy was sweet and soft, and Noor enjoyed every bit. "Do not spoil your lunch!" said her teacher. Noor just smiled. "Taffy on snow is the best lunch," she said, and her teacher had to laugh.'],
  pic: ['snow', 'maple', 'fire', 'pot'],
  qs: [
    { k: 'choice', q: 'What is the story about?', opts: ['making taffy from sap', 'a trip to the beach', 'a lost coin'], a: 0, code: 'C2.6' },
    { k: 'draw', q: 'Draw the taffy on the snow.', a: 'Strips of syrup on snow, perhaps with a stick rolling one up. Ask the child how the sap turns into syrup (it is boiled).', code: 'C1.4' },
    { k: 'write', q: 'What sweet treat do you enjoy?', a: 'The child\'s own idea, such as taffy, ice cream or fruit. Ask them to read it back to you.', code: 'C2.5' }
  ]
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
/* step 44, story 2 */
Atlas.decodable.more('au-aw', {
  words: ['fawn', 'lawn', 'dawn', 'yawn', 'saw', 'August', 'paw', 'draw', 'crawl', 'straw', 'hawk'],
  title: 'A Fawn on the Lawn',
  text: ['One morning in August, Maddie got up at dawn. She gave a big yawn and looked out at the lawn.',
    'There was a fawn on the lawn! It had long legs and white spots on its back. Its mom was by the trees, eating the grass.',
    'Maddie wanted to go out and pet it, but Dad said, "No. We stay in and watch. If we go out, the doe will run." So Maddie sat still by the glass and did a drawing of the fawn in her book.',
    'Then a crow cawed in a tree. The doe and the fawn ran off to the woods. Maddie was sad, but she still had her drawing. "You saw them," said Dad, "and you did not scare them."'],
  pic: ['sun', 'spruce', 'house'],
  qs: [
    { k: 'choice', q: 'When did Maddie get up?', opts: ['at dawn', 'at lunch', 'at night'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Dad wanted to scare the fawn.', a: false, code: 'C3.2' },
    { k: 'order', items: ['Maddie saw a fawn on the lawn.', 'Maddie did a drawing.', 'A crow cawed.'], show: [2, 0, 1], q: 'Number the sentences in order.', code: 'C3.3' }
  ]
});
/* step 44, story 3 */
Atlas.decodable.more('au-aw', {
  words: ['haul', 'autumn', 'launch', 'fault', 'hawk', 'claw', 'yawn', 'saw', 'draw', 'Paula', 'raw', 'straw'],
  title: 'Haul Out the Dock',
  text: ['It was the last weekend of autumn at the cottage. The air was crisp, and the trees were red and yellow.',
    'Paula and her grandpa had a big job. They had to haul the dock out of the lake before the ice came. Grandpa pulled on the rope, and Paula pushed. It was hard work.',
    'Halfway, they stopped to rest. Paula saw a hawk up in the sky. It dived down to the lake and came up with a fish in its claws! "Awesome," said Paula.',
    'Then they got back to work. At last, the dock was up on the grass, and the job was done. Paula\'s arms were sore, and she gave a big yawn. Grandpa put a hot drink in her hands. "Next spring, we launch the dock again," he said. "And we will look for that hawk."'],
  pic: ['bird', 'maple', 'pond', 'rope'],
  qs: [
    { k: 'write', q: 'Why did Paula and Grandpa haul out the dock?', a: 'So the ice would not hurt it in the winter (the ice was coming).', code: 'C3.2' },
    { k: 'draw', q: 'Draw the hawk with a fish.', a: 'A large bird over the lake with a fish in its claws. Ask the child what Paula said when she saw it.', code: 'C1.4' },
    { k: 'choice', q: 'What is the story about?', opts: ['taking a dock out of a lake', 'a trip to the zoo', 'a lost dog'], a: 0, code: 'C2.6' }
  ]
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
/* step 45, story 2 */
Atlas.decodable.more('ew-ue', {
  words: ['stew', 'crew', 'blew', 'few', 'threw', 'chew', 'true', 'new', 'Tuesday', 'grew', 'blue'],
  title: 'Stew for the Crew',
  text: ['On Tuesday, a big storm blew in. By the next morning, the snow was as high as the cars on our street.',
    'Lew from next door got his shovel. So did Mom, and so did Andrew and his sister Hana. They made a crew. They threw the snow to the side, one scoop at a time.',
    'Andrew\'s hands were wet and stiff. A few times he fell in the snow. But the crew kept going, and soon the street was clear.',
    'Then Granny opened her door. "Who wants stew?" she called. The whole crew went in. They sat by the fire and had hot stew with bread. "This is the best stew," said Andrew as he chewed. "It is true," said Granny with a smile. "Hard work makes stew even better."'],
  pic: ['snow', 'house', 'pot'],
  qs: [
    { k: 'choice', q: 'What did Granny make for the crew?', opts: ['stew', 'soup', 'cake'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw the crew in the snow.', a: 'People with shovels moving snow on a street. Ask the child who was in the crew.', code: 'C1.4' },
    { k: 'write', q: 'How do you help when it snows?', a: 'The child\'s own idea, such as shovelling, getting the mail or making hot drinks. Ask them to read it back to you.', code: 'C2.5' }
  ]
});
/* step 45, story 3 */
Atlas.decodable.more('ew-ue', {
  words: ['clue', 'new', 'few', 'blue', 'dew', 'true', 'flew', 'chew', 'glue', 'drew', 'Matthew', 'stew'],
  title: 'A Clue in the Dew',
  text: ['Matthew has a new bird feeder on the deck. Every morning he fills it with seeds. But for a few days, the seeds were gone by lunch.',
    'Who was eating them? "We need a clue," said his mom. The next morning, Matthew went out early. The grass was wet with dew, and there were small tracks in the dew under the feeder.',
    'Then he found a blue feather on the deck. "A blue jay! That is one clue," he said. But the tracks were not bird tracks. They had five toes.',
    'Matthew sat by the glass door and waited. A blue jay flew in and ate a few seeds. Then a squirrel ran up the pole and chewed and chewed. It was true: there were two seed robbers! Matthew grinned. "Now I need a feeder a squirrel cannot get to!"'],
  pic: ['bird', 'spruce', 'house'],
  qs: [
    { k: 'yn', q: 'Matthew found a red feather.', a: false, code: 'C1.1' },
    { k: 'write', q: 'Who was eating the seeds?', a: 'A blue jay and a squirrel.', code: 'C3.2' },
    { k: 'choice', q: 'What is the story about?', opts: ['who ate the seeds', 'a trip to the rink', 'a new pet'], a: 0, code: 'C2.6' }
  ]
});
Atlas.decodable.add({
  id: 'cle', hunt: 'Underline every word that ends in -le.', band: '2', name: 'Consonant-le', focus: ['-ble', '-tle', '-dle'], key: 'ta-ble', mark: '[bcdfgkptz]le\\b',
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
/* step 46, story 2 */
Atlas.decodable.more('cle', {
  words: ['puzzle', 'table', 'middle', 'purple', 'simple', 'little', 'candle', 'bottle', 'jungle', 'tickle', 'giggle'],
  title: 'The Last Puzzle Bit',
  text: ['It was a rainy day, so Mabel and her uncle did a puzzle at the table. It was a purple jungle with a big turtle in the middle.',
    'The sides were simple. The trees took a long time. At last there was just one little gap, in the middle of the turtle.',
    'But the last bit was not in the box. Mabel looked under the table. Her uncle looked by the candle. No puzzle bit!',
    'Then the cat, Pickle, got up from her nap on a chair. There was the little bit, stuck to her fur! Mabel began to giggle. She put it in the middle, and the puzzle was done.'],
  pic: ['rain', 'cat', 'box'],
  qs: [
    { k: 'yn', q: 'The last bit was in the box.', a: false, code: 'C1.1' },
    { k: 'order', items: ['Mabel and her uncle did the sides.', 'Mabel looked under the table.', 'Pickle got up from her nap.'], show: [2, 0, 1], q: 'Number the sentences in order.', code: 'C3.3' },
    { k: 'choice', q: 'How did Mabel feel at the end?', opts: ['happy', 'sad', 'mad'], a: 0, code: 'C3.2' }
  ]
});
/* step 46, story 3 */
Atlas.decodable.more('cle', {
  words: ['paddle', 'eagle', 'little', 'ripple', 'maple', 'wobble', 'giggle', 'gentle', 'nibble', 'kettle', 'handle'],
  title: 'The Eagle and the Paddle',
  text: ['At the cottage, Zara and her big sister Ruby took the little boat out on the lake. Each girl had a paddle. The lake was still, with just a few ripples.',
    'Then Zara saw an eagle up in a maple tree. It had a white head and a yellow beak. "Be still," said Ruby in a low voice. They held the paddles up and let the boat drift.',
    'The eagle opened its wings. It came down to the lake, and with one splash it had a fish! Then it went up with a flap of its big wings.',
    'The boat began to wobble, and Zara had to grab the side. She began to giggle. "That eagle fishes better than we do," said Ruby. They paddled back to the dock.'],
  pic: ['bird', 'maple', 'fish'],
  qs: [
    { k: 'choice', q: 'What did the eagle get?', opts: ['a fish', 'a paddle', 'a frog'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['seeing an eagle catch a fish', 'a trip to the shop', 'a lost paddle'], a: 0, code: 'C2.6' },
    { k: 'write', q: 'Where would you like to paddle a boat?', a: 'The child\'s own idea, such as a lake, a river or a pond. Ask them to read it back to you.', code: 'C2.5' }
  ]
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
/* step 47, story 2 */
Atlas.decodable.more('kind-old', {
  words: ['gold', 'cold', 'old', 'told', 'hold', 'fold', 'kind', 'find', 'mind', 'child', 'behind'],
  title: 'The Gold Ring',
  text: ['It was a cold day in Ottawa. Malik and his granny went out to fill the bird feeder. Then Granny held up her hand. "My gold ring is gone!" she said.',
    'It was an old ring. Granny\'s mom gave it to her when she was a child. Malik told her, "Do not worry. We will find it."',
    'They went back out behind the shed. Malik looked in the snow by the feeder. Then he saw a little bit of gold in the snow. He dug it out with his mitts.',
    'Malik held up the ring. "I found it!" Granny gave him a big hug. "You are a kind child," she said. "Now let us go in. My hands are cold, and I do not mind a cup of hot cocoa."'],
  pic: ['snow', 'bird', 'mitt', 'cup'],
  qs: [
    { k: 'yn', q: 'Granny lost her gold ring.', a: true, code: 'C1.1' },
    { k: 'order', items: ['Granny lost her ring.', 'Malik looked by the feeder.', 'Granny gave Malik a hug.'], show: [1, 2, 0], q: 'Number the sentences in order.', code: 'C3.3' },
    { k: 'write', q: 'Why did Granny say Malik was a kind child?', a: 'He helped her look for her ring and found it in the snow.', code: 'C3.2' }
  ]
});
/* step 47, story 3 */
Atlas.decodable.more('kind-old', {
  words: ['wild', 'bolt', 'bold', 'mild', 'blind', 'child', 'folded', 'blindfold', 'remind', 'grind', 'scold', 'jolt'],
  title: 'A Bolt in the Night',
  text: ['One summer night on the Prairies, a wild storm came in. Thunder shook the walls. Then there was a bolt of light and a big boom. All the lights went off!',
    'Emma\'s little brother Jack began to cry. Jack is just a small child, and he does not like storms. "Never mind," Emma told him. "I have a good game."',
    'Emma found a candle, and Mom lit it. Emma folded a scarf and put it on Jack as a blindfold. "Now hold out your hand," she said. "What is this?" Jack felt it. "A spoon!" "Yes! And this?" "An old sock!"',
    'They played the blindfold game till the storm was over. Then the lights came back on. "Emma, you are so kind," he said. "And you are a bold boy," she told him with a smile.'],
  pic: ['cloud', 'rain', 'house'],
  qs: [
    { k: 'choice', q: 'What went off in the storm?', opts: ['the lights', 'the rain', 'the game'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw Jack in the blindfold game.', a: 'A small child with a scarf over his eyes holding an object such as a spoon or a sock, perhaps with a candle. Ask the child why Emma made up the game.', code: 'C1.4' },
    { k: 'write', q: 'What do you do in a storm?', a: 'The child\'s own idea, such as reading, playing a game or sitting with family. Ask them to read it back to you.', code: 'C2.5' }
  ]
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
/* step 48, story 2 */
Atlas.decodable.more('silent', {
  words: ['lamb', 'knee', 'kneel', 'knot', 'wrap', 'wrist', 'climb', 'knock', 'thumb', 'wrong', 'knelt'],
  title: 'The Little Lamb',
  text: ['In the spring, Rosa went to help at her aunt\'s farm. There were six new lambs in the barn. One little lamb was black, with a white spot on its knee.',
    'One day, the black lamb was not with the rest. Rosa went to look. She found it by the fence. Its leg was stuck in a knot of wire.',
    'Rosa knelt down in the mud. She knew the lamb was scared, so she did not rush. She held the lamb still with one hand. With the other, she pulled the wire off its leg, bit by bit.',
    'The lamb was free! It ran back to its mom. Rosa wiped the mud off her knees and her wrists. "You did the right thing," said her aunt. "You were calm and gentle."'],
  pic: ['sun', 'house', 'rope'],
  qs: [
    { k: 'choice', q: 'Where was the lamb stuck?', opts: ['by the fence', 'in the barn', 'in a tree'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why did Rosa not rush?', opts: ['The lamb was scared.', 'She was sleepy.', 'It was raining.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Rosa and the lamb.', a: 'A girl kneeling by a fence with a small black lamb. Ask the child how Rosa got the lamb free.', code: 'C1.4' }
  ]
});
/* step 48, story 3 */
Atlas.decodable.more('silent', {
  words: ['wren', 'write', 'wrote', 'climb', 'know', 'knew', 'thumb', 'wrong', 'knob', 'kneel', 'comb', 'gnat'],
  title: 'The Wren in the Boot',
  text: ['Dad left his old boots on the back step. One spring morning, Nina heard a little peep from a boot. She looked in, and there was a nest, with a wren on it!',
    'Nina ran in. "Dad, you cannot put on your boot! A wren is in it!" Dad knelt down to look. "You are not wrong," he said. "I know just what to do."',
    'Dad climbed up to the attic and got his other boots. Then Nina wrote a sign: DO NOT MOVE THIS BOOT. She stuck it by the step.',
    'Every day, Nina checked on the wren with her thumb on her lips, as still as she could be. In a few weeks, little wrens sat on the boot. Then they flew off, one by one. "You were a good friend to that wren," he said.'],
  pic: ['sun', 'bird', 'house', 'nest'],
  qs: [
    { k: 'yn', q: 'The wren made a nest in a hat.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['a wren with a nest in a boot', 'a trip to the lake', 'a lost lamb'], a: 0, code: 'C2.6' },
    { k: 'write', q: 'Why did Nina write a sign?', a: 'So no one would move the boot and upset the wren and its nest.', code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'prefix', hunt: 'Underline every word that starts with un- or re-.', band: '2', name: 'Prefixes un- and re-', focus: ['un-', 're-'], key: 'unpack, redo', mark: '^(un|re)(?=[a-z]{3})',
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
/* step 49, story 2 */
Atlas.decodable.more('prefix', {
  words: ['unpack', 'unzip', 'unroll', 'unlock', 'refill', 'repack', 'retell', 'unhook', 'reuse', 'untie', 'restart'],
  title: 'Unpack the Van',
  text: ['Lin and her family drove to a camp by a lake in the Rockies. They had to unpack the van and set up the tent before dark.',
    'Lin unzipped the tent bag and unrolled the tent. Her brother Max unlocked the box with the pots and pans. Dad refilled the water jug at the tap.',
    'Then it began to rain, hard. The tent was not up yet! "Repack it all!" said Mom. They put the tent back in the bag and ran to the van.',
    'They sat in the van and waited. Max retold the story of the fox and the berry patch for the tenth time. At last the rain stopped, and the sun came out. "Let us unpack again," said Dad, "and this time, fast!"'],
  pic: ['rain', 'van', 'tent', 'pot'],
  qs: [
    { k: 'yn', q: 'The tent was up when the rain came.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why did they repack the tent?', opts: ['It began to rain.', 'They had to go home.', 'A fox came.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the family in the van in the rain.', a: 'A van with people in it and rain coming down, perhaps a tent bag nearby. Ask the child what they did next.', code: 'C1.4' }
  ]
});
/* step 49, story 3 */
Atlas.decodable.more('prefix', {
  words: ['unhappy', 'unfair', 'remake', 'unlucky', 'refill', 'reshape', 'unsafe', 'repack', 'unkind', 'replay', 'rerun'],
  title: 'The Unlucky Snow Fort',
  text: ['After a big snowfall in Thunder Bay, Ayla and Ben made a snow fort in the yard. It had thick walls and a little door.',
    'But the next day, the sun came out. By lunch, the fort had sunk, and one wall fell in. Ben was unhappy. "It is so unfair," he said. "We did all that work for nothing."',
    'Ayla was not upset. "We can remake it," she said. "This time we pack the snow hard." They refilled the pail with snow, again and again, and repacked every wall.',
    'That night it got cold, and the walls froze hard. The next morning, Ben ran out to look. The fort was still there, as strong as a rock. "Not so unlucky now," said Ayla. Ben grinned and crawled in. "Let us add a roof," he said.'],
  pic: ['sun', 'snow', 'snowman', 'house'],
  qs: [
    { k: 'yn', q: 'Ben was unhappy when the wall fell in.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the fort fall in?', opts: ['The sun came out.', 'A dog sat on it.', 'Ben kicked it.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What would you make with snow?', a: 'The child\'s own idea, such as a fort, a snowman or a slide. Ask them to read it back to you.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'suffix-more', hunt: 'Underline every word that ends in -er, -est, -ful, -less or -ly.', band: '2', name: 'Suffixes -er -est -ful -less -ly', focus: ['-ful', '-less', '-ly'], key: 'helpful', mark: '(er|est|ful|less|ly)\\b',
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
/* step 50, story 2 */
Atlas.decodable.more('suffix-more', {
  words: ['faster', 'slowly', 'careful', 'steepest', 'safely', 'bigger', 'coldest', 'helpful', 'softly', 'thankful', 'harmless'],
  title: 'The Steepest Hill',
  text: ['On the coldest day of the year, Jonah and his friend Ruth took their sleds to the park.',
    'There were two hills. One was small. The other was the steepest hill in town. "Let us go on the bigger one!" said Jonah. Ruth was careful. "It is too steep. Let us go slowly first."',
    'Jonah did not listen. He zoomed down the steep hill. He went faster and faster. Then he hit a bump and landed in a snowbank, sled and all!',
    'Ruth came down slowly and safely. She helped Jonah up. He had snow in his ears and in his boots. "You were right," he said sadly. "Slower is smarter." Then they both went back up the small hill, again and again.'],
  pic: ['snow', 'hill', 'sled'],
  qs: [
    { k: 'order', items: ['Jonah went down the steep hill.', 'Jonah landed in the snow.', 'Ruth helped Jonah up.'], show: [2, 0, 1], q: 'Number the sentences in order.', code: 'C3.3' },
    { k: 'write', q: 'Why did Jonah say slower is smarter?', a: 'Because he went too fast down the steep hill and crashed into a snowbank, but Ruth went slowly and was safe.', code: 'C3.2' },
    { k: 'draw', q: 'Draw Jonah in the snowbank.', a: 'A child stuck in a pile of snow at the bottom of a hill, with a sled. Ask the child what Ruth did.', code: 'C1.4' }
  ]
});
/* step 50, story 3 */
Atlas.decodable.more('suffix-more', {
  words: ['gently', 'careful', 'thankful', 'biggest', 'longer', 'sweetest', 'daily', 'helpful', 'bigger', 'quickly', 'useless', 'sweeter'],
  title: 'The Biggest Pumpkin',
  text: ['Every spring, the women and men on Dana\'s street plant a garden in an empty lot in Halifax. Dana helps her grandma, who grew up in another country.',
    'Grandma made holes in the soil, and Dana gently set the pumpkin seeds in them. "Water them daily," said Grandma. "And be careful with the little plants."',
    'All summer, Dana watered the pumpkins. One vine grew longer and longer. On it was one pumpkin that got bigger and bigger. By fall, it was the biggest pumpkin in the garden!',
    'Dana was proud, but she did not keep it. They cut it up, and Grandma made pumpkin soup for the whole street. "This is the sweetest soup," said a man from next door. Dana felt thankful for her grandma, for the garden and for the helpful people on her street.'],
  pic: ['sun', 'flower', 'pot'],
  qs: [
    { k: 'choice', q: 'What did Grandma make with the pumpkin?', opts: ['soup', 'pie', 'bread'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Dana kept the pumpkin for her own lunch.', a: false, code: 'C3.2' },
    { k: 'write', q: 'What would you like to grow in a garden?', a: 'The child\'s own idea, such as carrots, beans or flowers. Ask them to read it back to you.', code: 'C2.5' }
  ]
});
