/* Language Atlas tool box: the Decodable readers' stories (decodable.js loads this when the tool opens), 3 for each phonics step, in teaching order (Kindergarten to Grade 3).
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
  id: 'cons-b', band: 'K', name: 'Consonant b', focus: ['b'], key: 'bat', mark: 'b',
  heart: [],
  words: ['bat', 'tab', 'cub', 'bib', 'bed', 'bug', 'big', 'bun', 'rib', 'job', 'web', 'tub', 'cab', 'sob'],
  title: 'Ben and the Big Bug',
  text: ['Ben got in bed. A big bug sat on the bed. Ben did not sob. He had a job to do.',
    'Ben got a tub. He put the tub on the bug. The bug is in the tub!',
    'Dad and Ben set the bug on a bud. Ben got in bed. The bug did not!'],
  pic: ['bed', 'bug', 'flower'],
  qs: [
    { k: 'yn', q: 'Ben was mad at the bug.', a: false, code: 'C3.2' },
    { k: 'choice', q: 'What did Ben put on the bug?', opts: ['a tub', 'a bag', 'a bun'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['A bug sat on the bed.', 'Ben put the tub on the bug.', 'The bug sat on a bud.'], show: [2, 0, 1], code: 'C3.3' }
  ],
  tip: '/b/ is a quick pop of the lips with the voice on: keep it short, not "buh". b and d are often mixed up: make a "bed" with two fists, thumbs up, and the left hand is the b. In a mirror, the child can watch the lips press together and pop open.'
});
Atlas.decodable.more('cons-b', {
  words: ['bus', 'bag', 'bet', 'bin', 'rub', 'bat', 'tab', 'cab', 'bud', 'but', 'bit'],
  title: 'Bev and the Bun',
  text: ['Bev and Deb got on a big bus. Bev had a bag. In the bag was a bat and a bun.',
    'Deb had a bag, but it had no bun in it. Deb was sad.',
    'Bev got the bun. She cut it in two. "You can have a bit," said Bev. Deb and Bev sat on the bus and had the bun.'],
  pic: ['sun', 'bus', 'bag'],
  qs: [
    { k: 'choice', q: 'What was in the bag?', opts: ['a bat and a bun', 'a cat and a cup', 'a bed'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why was Deb sad?', opts: ['Deb had no bun.', 'The bus was big.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Bev and Deb on the bus.', a: 'Two girls sitting on a bus, sharing a bun. Ask the child what Bev did with the bun.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('cons-b', {
  words: ['cub', 'bed', 'big', 'bob', 'rub', 'bit', 'but', 'web', 'sob', 'bug', 'tub'],
  title: 'Bob the Big Cub',
  text: ['Bob is a cub. Mom and Bob had a bed in a den. Mom had a nap, but Bob did not.',
    'Bob got up. He dug at the den. Bob got a big bug, but it bit him! Bob did not sob.',
    'Bob ran to his bed in the den. Mom and Bob had a hug. Bob had a big, big nap.'],
  pic: ['hill', 'bear', 'bug'],
  qs: [
    { k: 'choice', q: 'What bit Bob?', opts: ['a bug', 'a cub', 'a dog'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'The bug was not fun for Bob.', a: true, code: 'C3.2' },
    { k: 'write', q: 'Who do you hug?', a: 'Any person or pet, for example: I hug Mom.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'cons-c', band: 'K', name: 'Consonant c /k/', focus: ['c'], key: 'cat', mark: 'c',
  heart: [],
  words: ['cat', 'cap', 'can', 'cab', 'cot', 'cob', 'cod', 'cop', 'cut', 'cup', 'cub', 'cog'],
  title: 'Cub in the Cap',
  text: ['Cam had a red cap. He set it on his cot. Cam got his cup and ran to the bus.',
    'Cal sat on the bus. "Cam, you have no cap!" said Cal. Cam ran to get it.',
    'The cap was on the cot. Cub the cat was in it! Cub had a nap in the cap. "Cub can have it," said Cam.'],
  pic: ['bus', 'bed', 'cat', 'hat'],
  qs: [
    { k: 'yn', q: 'Cam put the cap on his cot.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Who had a nap in the cap?', opts: ['Cal', 'Cub the cat', 'Cam'], a: 1, code: 'C1.1' },
    { k: 'draw', q: 'Draw Cub in the cap.', a: 'A cat curled up in a red cap on a cot. Ask the child who Cub is.', code: 'C1.4' }
  ],
  tip: 'Here c says /k/: a quiet puff of air from the back of the mouth, voice off, not "kuh". It sounds the same as k, so spelling cat as kat is a good sound guess, not a reading error (c says /k/ before a, o and u; c before e and i comes later). Hold a hand in front of the mouth to feel the puff.'
});
Atlas.decodable.more('cons-c', {
  words: ['cod', 'cup', 'can', 'cut', 'cot', 'cap', 'cob', 'cub', 'cat', 'cop'],
  title: 'Cal and the Cod',
  text: ['Pop and Cal sat in the sun. Cal had a rod and a cap. Pop had a cup.',
    'Tug, tug! Cal got a cod! It was big and wet. Pop and Cal got it in.',
    'Pop cut up the cod. Cub the cat sat up. Pop and Cal had hot cod. Cub got a bit!'],
  pic: ['sun', 'fish', 'cat', 'pot'],
  qs: [
    { k: 'choice', q: 'What did Cal get?', opts: ['a cod', 'a cup', 'a cat'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Cub the cat got no cod.', a: false, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Pop and Cal sat in the sun.', 'Cal got a cod.', 'Pop cut up the cod.'], show: [1, 2, 0], code: 'C3.3' }
  ]
});
Atlas.decodable.more('cons-c', {
  words: ['cub', 'can', 'cob', 'cap', 'cup', 'cot', 'cut', 'cat', 'cab', 'cod', 'cop'],
  title: 'A Cub at the Can',
  text: ['It was hot. Mac sat on a cot in the sun. Mac had a cap on. Dad had a cup.',
    'Mac sat up. A cub was in the big can! It dug and dug. It got a cob and a bit of cod.',
    'Dad and Mac sat in the van. The cub had the cob and ran. Dad put a big lid on the can.'],
  pic: ['sun', 'bear', 'van'],
  qs: [
    { k: 'choice', q: 'What did the cub get?', opts: ['a cob', 'a cap', 'a cup'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Dad did not run at the cub.', a: true, code: 'C1.1' },
    { k: 'write', q: 'Why did Dad put a lid on the can?', a: 'So the cub (or a bear) can not get in again.', code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'cons-d', band: 'K', name: 'Consonant d', focus: ['d'], key: 'dog', mark: 'd',
  heart: [],
  words: ['dad', 'dog', 'dig', 'dug', 'den', 'dot', 'mud', 'red', 'lid', 'kid', 'hid', 'sad', 'bed', 'nod', 'dip'],
  title: 'Dot the Mud Dog',
  text: ['Dan had a red dog. The dog was Dot. Dot dug and dug in the mud.',
    'Dot ran in and hid on the bed. Mud got on the bed, the rug and Dad!',
    'Dad did not get mad. Dan and Dad got a tub. Dot had a dip in the tub. Dot is a red dog, not a mud dog!'],
  pic: ['dog', 'bed'],
  qs: [
    { k: 'yn', q: 'Dot dug in the mud.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Dot get a dip in the tub?', opts: ['Dot was a mud dog.', 'Dot was hot.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Dot in the tub.', a: 'A red dog in a tub of water. Ask the child why Dot needed a bath.', code: 'C1.4' }
  ],
  tip: '/d/ is a quick tap of the tongue just behind the top teeth, voice on: keep it short, not "duh". b and d are the classic mix-up: d starts with a c, then the tall stick. With a hand on the throat, d buzzes and t does not.'
});
Atlas.decodable.more('cons-d', {
  words: ['bud', 'dig', 'pod', 'red', 'mud', 'did', 'sad', 'dot', 'pad', 'fed', 'den'],
  title: 'Ted and the Red Bud',
  text: ['Ted and Dad dug in the mud. Ted put a pod in the pit. Ted did a pat on the mud.',
    'Ted got the mud wet. He sat and sat. No bud. Ted was sad.',
    'Ted got up at six. He ran to the mud. It had a red bud! "Look, Dad!" said Ted.'],
  pic: ['sun', 'flower'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Ted put a pod in the mud.', 'Ted was sad.', 'Ted had a red bud.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'Ted did not get a bud.', a: false, code: 'C1.1' },
    { k: 'write', q: 'What can you put in the mud?', a: 'Any sensible answer, for example: a seed, a bulb, a pod.', code: 'C2.5' }
  ]
});
Atlas.decodable.more('cons-d', {
  words: ['den', 'dim', 'bed', 'fed', 'dog', 'dug', 'rod', 'did', 'lid', 'kid', 'mad'],
  title: 'The Dim Den',
  text: ['Dev and Ned had a rug. Dev put the rug on the bed and a box. It was a den!',
    'Dev and Ned got in the den. It was dim. Nan fed Dev and Ned a bun.',
    'Bud the dog dug at the rug. Bud ran in, and the rug sat on Dev, Ned and Bud! Dev and Ned did not get mad.'],
  pic: ['bed', 'box', 'dog'],
  qs: [
    { k: 'choice', q: 'Who fed Dev and Ned?', opts: ['Nan', 'Bud', 'Dad'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Dev and Ned had fun in the den.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw Dev and Ned in the den.', a: 'Two boys under a rug draped over a bed and a box, maybe with Bud the dog. Ask the child what the den was made of.', code: 'C1.4' }
  ]
});
Atlas.decodable.add({
  id: 'cons-f', band: 'K', name: 'Consonant f', focus: ['f'], key: 'fox', mark: 'f',
  heart: [],
  words: ['fox', 'fan', 'fig', 'fun', 'fed', 'fog', 'fit', 'fat', 'fin', 'fix', 'fib', 'if'],
  title: 'Fin and the Fox',
  text: ['Fin and Dad sit on a log in the fog. Fin has a big fig in a bag.',
    'Look! A red fox is in the fog. It is not fat.',
    'Fin put the fig on the log. The fox got the fig and ran to a den. "If the fox is fed, it can nap," said Dad.'],
  pic: ['log', 'fox', 'bag'],
  qs: [
    { k: 'yn', q: 'The fox is fat.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What did the fox get?', opts: ['a hat', 'a fig', 'a bag'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Fin is mad at the fox.', a: false, code: 'C3.2' }
  ],
  tip: '/f/ is a soft stream of air: top teeth rest on the bottom lip and the air blows out. Hold it ("fff") and do not add "uh". F and v are made the same way, but v buzzes: put a hand on the throat to feel the difference.'
});
Atlas.decodable.more('cons-f', {
  words: ['fan', 'fix', 'fat', 'fed', 'fun', 'fin', 'fit', 'fig', 'fog', 'if'],
  title: 'Fix the Fan',
  text: ['It is hot. Fen and Mom sit in the hut. The fat cat is hot. The fan is not on.',
    '"I can fix it," said Mom. Mom got a pin and a rag. Fen fed the cat.',
    'Mom hit the fan. It is on! Fen, Mom and the fat cat sit at the fan. It is fun.'],
  pic: ['hut', 'cat'],
  qs: [
    { k: 'yn', q: 'The cat is hot.', a: true, code: 'C3.2' },
    { k: 'choice', q: 'Who can fix the fan?', opts: ['Fen', 'Mom', 'the cat'], a: 1, code: 'C1.1' },
    { k: 'draw', q: 'Draw the cat at the fan.', a: 'A fat cat sitting by a fan, maybe with Fen and Mom. Ask the child why the cat is happy now.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('cons-f', {
  words: ['fog', 'fun', 'fed', 'fat', 'fox', 'fit', 'fig', 'fix', 'fan', 'fin', 'if'],
  title: 'A Fox in the Fog',
  text: ['Raf and Mom sit at the hut. Mom has a pot of fig jam.',
    'In the fog, a fox got to the hut. It dug in the bag and got the fig jam! "Fox! You can not have the jam!" said Raf.',
    'The fox hid in the fog. Mom got a lid to fit the pot. "It is a fat, fed fox!" said Mom.'],
  pic: ['hut', 'fox', 'pot'],
  qs: [
    { k: 'choice', q: 'What did the fox get?', opts: ['fig jam', 'a fan', 'a hat'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Mom got a lid to fit the pot.', a: true, code: 'C1.1' },
    { k: 'write', q: 'Did you see a fox? Where?', a: 'Any answer about the child\'s own life, e.g. "I did. It ran in the park." Write it for the child if needed.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'cons-g', band: 'K', name: 'Consonant g /g/', focus: ['g'], key: 'gum', mark: 'g',
  heart: [],
  words: ['gum', 'got', 'gap', 'gas', 'get', 'gut', 'dog', 'big', 'bug', 'leg', 'rag', 'tug', 'dig', 'log'],
  title: 'Peg Dug in the Mud',
  text: ['Gus has a big dog. The dog is Peg. Peg can dig and dig.',
    'Peg dug in the mud at the log. Peg got a rag and a big bug. Peg is a mud dog!',
    'Gus got a tub. Peg did not get in. Gus had to tug and tug. Peg is in the tub! Gus got wet, but Peg got a hug.'],
  pic: ['dog', 'log', 'bug'],
  qs: [
    { k: 'choice', q: 'What did Peg get in the mud?', opts: ['a cup and a hat', 'a rag and a bug', 'a pot'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Peg had fun in the mud.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw Peg in the mud.', a: 'A big dog digging in mud by a log, maybe with a rag or a bug. Ask the child what Gus did next.', code: 'C1.4' }
  ],
  tip: '/g/ is a quick, short sound from the back of the throat: say "g", not "guh". G and k are made in the same spot, but g buzzes: put a hand on the throat to feel it. In these words g always says /g/ as in gum, never /j/.'
});
Atlas.decodable.more('cons-g', {
  words: ['jog', 'fog', 'tug', 'wag', 'hug', 'leg', 'big', 'gap', 'got', 'get', 'mug'],
  title: 'Meg and Bug Jog',
  text: ['Meg and Bug jog in the fog. Bug is a big dog. Bug can tug and tug.',
    'Bug ran to a log. Meg hit the log and sat in the mud. Bug ran to Meg. Wag, wag, wag!',
    'Meg got up. "I am not mad, Bug," said Meg. Meg and Bug had a big hug.'],
  pic: ['dog', 'log', 'cloud'],
  qs: [
    { k: 'yn', q: 'Bug is a cat.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Where did Meg sit?', opts: ['in the mud', 'on a bed', 'in a van'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Meg and Bug jog.', 'Meg sat in the mud.', 'Meg had a hug for Bug.'], show: [1, 2, 0], code: 'C3.3' }
  ]
});
Atlas.decodable.more('cons-g', {
  words: ['pig', 'dug', 'gap', 'bog', 'fig', 'got', 'hug', 'gas', 'big', 'peg', 'rug', 'gum'],
  title: 'Gil and the Big Pig',
  text: ['Gil and his dad have a big pig. The pig is in a pen.',
    'The pig dug a big gap in the pen. Look! It is in the bog!',
    'Gil got a fig. "Pig, pig! Get the fig!" said Gil. The pig ran to Gil and got the fig. Dad put the pig in the pen and a log in the gap.'],
  pic: ['pig', 'log', 'pond'],
  qs: [
    { k: 'yn', q: 'The pig dug a gap in the pen.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the pig run to Gil?', opts: ['to get a nap', 'to get the fig', 'to dig'], a: 1, code: 'C3.2' },
    { k: 'choice', q: 'What did Dad put in the gap?', opts: ['a log', 'a rug', 'a mug'], a: 0, code: 'C1.1' }
  ]
});
Atlas.decodable.add({
  id: 'cons-h', band: 'K', name: 'Consonant h', focus: ['h'], key: 'hat', mark: 'h',
  heart: [],
  words: ['hat', 'hen', 'hot', 'hut', 'had', 'him', 'hop', 'hug', 'hid', 'hum', 'hip', 'ham'],
  title: 'Hal and the Hen',
  text: ['Hal has a red hen. It is hot. The hen is not in the hut.',
    'Hal had a look. Is the hen in the pen? No. Is the hen at the tub? No.',
    'Mom has a big hat on a peg. Hal had a look in the hat. The hen is in it! "The hen can have the hat," said Mom.'],
  pic: ['hut', 'hat', 'hen'],
  qs: [
    { k: 'yn', q: 'The hen is in the hut.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Where did the hen sit?', opts: ['in a hat', 'in a tub', 'in a pen'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw the hen in the hat.', a: 'A hen sitting inside a big hat. Ask the child why the hen hid there (it was hot, the hat is a shady spot).', code: 'C1.4' }
  ],
  tip: '/h/ is just a puff of breath with an open mouth, like fogging up a mirror. Keep it quiet and short: "h", not "huh". Hold a hand in front of the mouth to feel the puff; children sometimes drop it, so check that hat is not read as at.'
});
Atlas.decodable.more('cons-h', {
  words: ['hot', 'hid', 'hat', 'hum', 'him', 'hit', 'hut', 'had', 'hop', 'hen', 'hug'],
  title: 'Hot, Hot, Hot!',
  text: ['Pam hid a red hat in the den. "Get the hat, Jin!" said Pam.',
    'Jin had a look in the tub. "Not hot," said Pam. Jin got to the box. He hit his hip! "Hot, hot, hot!"',
    'The hat is on the cat! The cat had a nap in the hat.'],
  pic: ['box', 'cat', 'hat'],
  qs: [
    { k: 'yn', q: 'Pam hid a hat.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Where is the hat?', opts: ['in the tub', 'on the cat', 'on Jin'], a: 1, code: 'C1.1' },
    { k: 'write', q: 'Where can you put a hat?', a: 'Any place in the child\'s own home, e.g. "in my bed". Write it for the child if needed.', code: 'C2.5' }
  ]
});
Atlas.decodable.more('cons-h', {
  words: ['hut', 'hat', 'hop', 'hum', 'hit', 'had', 'his', 'hot', 'him', 'hip', 'hen', 'hug'],
  title: 'The Hat on the Hut',
  text: ['Ben and his mom have a hut. Ben has a red hat. It is a hot hat.',
    'Ben had fun. He hit the hat up, up, up. It is on the hut! Ben can not get it.',
    'Mom got a big net. Mom had to hum and tug. The net hit the hat. Ben had his hat! "Have a hot bun," said Mom.'],
  pic: ['hut', 'hat', 'sun'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Ben hit the hat up.', 'Mom got a net.', 'Ben had his hat.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'yn', q: 'Ben can get the hat.', a: false, code: 'C1.1' },
    { k: 'yn', q: 'Mom is mad at Ben.', a: false, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'cons-j', band: 'K', name: 'Consonant j', focus: ['j'], key: 'jam', mark: 'j',
  heart: [],
  words: ['jam', 'jet', 'jog', 'jug', 'jig', 'job', 'jab', 'jot', 'jut', 'Jen', 'Jim'],
  title: 'Jen and the Jam Jug',
  text: ['Jen and Jim jog to the hut. Jen has a job. Jen can get the big jug of jam.',
    'Jen got a bun. Jen put jam on it. Jim had a bun and jam. Yum! Jim did a jig.',
    'Look! A jet is up in the sun. Jen and Jim sit to see it. Jim has jam on his lip!'],
  pic: ['sun', 'plane', 'hut', 'jar'],
  qs: [
    { k: 'choice', q: 'What is in the jug?', opts: ['jam', 'mud', 'a bug'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Jim had fun.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw Jim and the jam on his lip.', a: 'A boy with a smear of jam on his lip, maybe a bun or the jug. Ask the child what Jim did after his bun (a jig).', code: 'C1.4' }
  ],
  tip: '/j/ is a quick, crisp sound: say it short, not "juh". In these words j only comes at the start. Put a hand on the throat: /j/ buzzes and /ch/ (later) does not, which helps if the child mixes them up.'
});
Atlas.decodable.more('cons-j', {
  words: ['jog', 'jet', 'jab', 'job', 'jug', 'jot', 'jut', 'jam', 'Jan', 'Jon'],
  title: 'Jet Got the Jam',
  text: ['Jan and Jon have a pup. The pup is Jet. Jet can run and jog.',
    'Dad set a jug of jam on a rug. Jet got in the jam!',
    '"Jet! Quit it!" said Jan. Jet did not quit. Jon got a tub. A pup in a tub is a big job! Jet did a jig in the tub.'],
  pic: ['dog', 'jar', 'house'],
  qs: [
    { k: 'yn', q: 'Jet is a pup.', a: true, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Dad set the jam on a rug.', 'Jet had the jam.', 'Jet got in a tub.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'Why did Jet get in a tub?', opts: ['Jet had jam on him.', 'Jet was hot.', 'Jet had a nap.'], a: 0, code: 'C3.2' }
  ]
});
Atlas.decodable.more('cons-j', {
  words: ['jab', 'jig', 'Jed', 'jot', 'jet', 'jog', 'Jin', 'jam', 'job', 'jug'],
  title: 'Jin and Jed Jet Up',
  text: ['It was wet. Jin and Jed sat in the den. Jed got a big box. "It can be a jet!" said Jin.',
    'Jin cut a lid. Jed got a pen to jot a map. It is a big job!',
    'Mom got a bun and a jug of jam. Jin, Jed and Mom sat in the jet. "Up!" said Jed. Jin did a jig!'],
  pic: ['house', 'box', 'map', 'jar'],
  qs: [
    { k: 'choice', q: 'What is the jet?', opts: ['a big box', 'a bus', 'a hut'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Jin and Jed had fun.', a: true, code: 'C3.2' },
    { k: 'write', q: 'What can a box be? Write it.', a: 'Any idea: a jet, a bus, a den, a bed. Help the child sound out the word.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'cons-k', band: 'K', name: 'Consonant k', focus: ['k'], key: 'kit', mark: 'k',
  heart: [],
  words: ['kit', 'kid', 'kin', 'keg', 'yak', 'Kim', 'Ken', 'Kip', 'Kat', 'Kev'],
  title: 'Kim and the Kit',
  text: ['Kim, Kip and Kat sit on a log. The sun is hot.',
    'Look! A fox kit is at a den. "A kit is a kid fox," said Kip.',
    'The kit has kin in the den. Kim can see the kit and the kin nap. Kat and Kip did not yap. Ken, the man at the hut, said, "Let the kit nap."'],
  pic: ['sun', 'log', 'fox', 'hut'],
  qs: [
    { k: 'yn', q: 'A kit is a kid fox.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Kat and Kip not yap?', opts: ['The kit had a nap.', 'Kat and Kip had a nap.', 'It was wet.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the fox kit in the den.', a: 'A small red and tan fox curled up in a hole or den. Ask the child who else was in the den (its kin).', code: 'C1.4' }
  ],
  tip: '/k/ is made at the back of the mouth with a quick puff of air: say it short, not "kuh". The letter k and the letter c (cat) can make the same sound; here every word uses k. If the child says /g/ (gut for kit), have them hold a hand in front of the mouth to feel the puff that /k/ has.'
});
Atlas.decodable.more('cons-k', {
  words: ['Kip', 'kid', 'Kat', 'yak', 'kit', 'Ken', 'kin', 'Kim', 'keg', 'Kev'],
  title: 'Kat and the Yak',
  text: ['Kat, Kip and Kim got on a bus to see a yak. Kip had a kit: a pen, a pad and a map.',
    'Ken is the man at the yak pen. The big red yak sat in the mud.',
    'Kip did a yak on the pad. "It is a yak, not a pig!" said Kat. Kim had a nap on the bus.'],
  pic: ['bus', 'bag', 'pen'],
  qs: [
    { k: 'choice', q: 'What did Kip have in the kit?', opts: ['a pen, a pad and a map', 'a cup and a bun', 'a hat'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'The yak is big and red.', a: true, code: 'C1.1' },
    { k: 'write', q: 'Kat, Kip and Kim see a yak. What can you see? Write it.', a: 'Any animal the child has seen: a cat, a dog, a hen, a fox. Help the child sound out the word.', code: 'C2.5' }
  ]
});
Atlas.decodable.more('cons-k', {
  words: ['kid', 'kit', 'Kev', 'Kim', 'Ken', 'kin', 'Kip', 'Kat', 'yak', 'keg'],
  title: 'Kev and the Red Kit',
  text: ['Kev and Kim sat on a log at the hut. Kip and Kat sat in the sun.',
    'Kev got up on the log and hit his leg. It had a cut! "Get the red kit!" said Kim. Kim ran to Ken.',
    'Ken got the kit and put a pad on the cut. "You are a big kid," said Ken. Kev did not sob.'],
  pic: ['sun', 'hut', 'log', 'bag'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Kev hit his leg.', 'Kim ran to Ken.', 'Ken put a pad on the cut.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'Kev had a cut on his leg.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Kim run to Ken?', opts: ['Ken had the kit.', 'Ken had a bun.', 'Kim was mad.'], a: 0, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'cons-l', band: 'K', name: 'Consonant l', focus: ['l'], key: 'log', mark: 'l',
  heart: [],
  words: ['log', 'lid', 'lip', 'lot', 'lap', 'leg', 'let', 'lug', 'lit', 'pal', 'gel', 'Mel', 'Lin'],
  title: 'Lin and Len Lug a Pot',
  text: ['Lin and Len lug a big pot to a log. The pot has a lid.',
    'Len got the lid up. It is dal! Mom had a lot of dal in the pot. Lin and Len sat on the log and had dal. Yum!',
    'Len set the lid on the pot. Lin and Len sat in the sun. Len had dal on his lip!'],
  pic: ['sun', 'pot', 'log'],
  qs: [
    { k: 'choice', q: 'What is in the pot?', opts: ['dal', 'jam', 'mud'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'The pot is not big.', a: false, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Lin and Len lug a pot.', 'Len got the lid up.', 'Len set the lid on the pot.'], show: [2, 0, 1], code: 'C3.3' }
  ],
  tip: '/l/ is a sound you can hold: the tongue tip rests behind the top teeth (lllog). Hold it, then say the rest of the word. Some children say /w/ or /y/ for /l/ (wog for log); let the child watch your tongue in a mirror and copy it. Dal is a lentil stew.'
});
Atlas.decodable.more('cons-l', {
  words: ['lap', 'leg', 'lid', 'Mel', 'lot', 'pal', 'let', 'log', 'gel', 'Val', 'lug'],
  title: 'Mel, Val and the Bug',
  text: ['Mel has a pal, Val. Val has a pet bug in a tub. The tub has a lid.',
    'Mel did not put the lid on. The bug ran up a log!',
    '"Get it!" said Val. The bug sat on the leg of Val. Val got the bug, and Mel put the lid on. Mel and Val had a lot of fun.'],
  pic: ['log', 'bug', 'cup'],
  qs: [
    { k: 'yn', q: 'Mel put the lid on the tub.', a: false, code: 'C3.2' },
    { k: 'choice', q: 'Where did the bug sit?', opts: ['on the leg of Val', 'on a hat', 'in a pot'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw the bug on the log.', a: 'A small bug on a log, maybe with a tub nearby. Ask the child what the bug did next.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('cons-l', {
  words: ['lit', 'lap', 'Hal', 'led', 'lug', 'pal', 'lip', 'lab', 'Sal', 'leg'],
  title: 'Hal and Sal the Lab',
  text: ['Hal has a pal. It is Sal, a big tan lab.',
    'Hal and Sal go up to the bog. Sal led Hal. Sal got in the mud! Sal had mud on a leg and a lip.',
    'Hal got Sal up. Mom let Hal and Sal in. Hal sat in the den. Sal got up on his lap. A big lab on a lap!'],
  pic: ['dog', 'house', 'bed'],
  qs: [
    { k: 'choice', q: 'What is Sal?', opts: ['a lab', 'a cat', 'a hen'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Sal is a big dog.', a: true, code: 'C3.2' },
    { k: 'choice', q: 'Hal, Sal and ...', opts: ['pal', 'log', 'lid'], a: 0, code: 'C3.1' }
  ]
});
Atlas.decodable.add({
  id: 'cons-m', band: 'K', name: 'Consonant m', focus: ['m'], key: 'map', mark: 'm',
  heart: [],
  words: ['map', 'mat', 'mix', 'mop', 'mug', 'met', 'mud', 'ham', 'jam', 'dim', 'hum', 'gum'],
  title: 'Max in the Mud',
  text: ['Mom and Max go on a run. Mom has a map. Max has a red mug.',
    'Max sat in the mud. Mud is on his leg. Mud is on the map! Is Mom mad? Mom is not mad.',
    'Mom and Max sit on a mat in the sun. "Mud is fun!" said Max. Mom and Max hum.'],
  pic: ['sun', 'map', 'cup'],
  qs: [
    { k: 'choice', q: 'What is on the map?', opts: ['mud', 'jam', 'a bug'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Mom is mad at Max.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw Max in the mud.', a: 'Max sitting in mud, perhaps with mud on his leg and the map. Ask the child what Mom did.', code: 'C1.4' }
  ],
  tip: '/m/ is a hum you can hold: lips closed, sound through the nose (mmm, not "muh"). It is often mixed up with n (map read as nap). Have the child put a finger on closed lips and hum, or sky-write m with its two humps.'
});
Atlas.decodable.more('cons-m', {
  words: ['man', 'mix', 'mom', 'ram', 'ham', 'dam', 'met', 'him', 'mop', 'rim', 'sum'],
  title: 'Mop and the Ham',
  text: ['Mom and Min get a ham. Mom set the ham in a pan on a mat.',
    'Mop the dog met the ham. Mop sat and had the ham! Min and Mom did not see him.',
    '"Mop!" said Mom. Mom is mad. Min and Mom had jam on a bun. Mop had a nap on the mat.'],
  pic: ['pan', 'dog'],
  qs: [
    { k: 'choice', q: 'Who had the ham?', opts: ['Mop', 'Min', 'Mom'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Mom is mad at Mop.', a: true, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Mom set the ham in a pan.', 'Mop had the ham.', 'Mop had a nap.'], show: [2, 0, 1], code: 'C3.3' }
  ]
});
Atlas.decodable.more('cons-m', {
  words: ['gum', 'hum', 'dim', 'sum', 'mud', 'mug', 'mat', 'rim', 'jam', 'met', 'mad'],
  title: 'Tim, Mom and a Fox',
  text: ['It is dim in the hut. Mom and Tim sit on a mat and hum.',
    'Yip, yip! Tim got up. Is it a man? It is not a man. It is a big red fox!',
    '"Mom, a fox!" said Tim. Mom got up, and the fox ran. Mom and Tim sat on the mat. Tim had his bun and jam. Yum!'],
  pic: ['hut', 'fox'],
  qs: [
    { k: 'choice', q: 'What is at the hut?', opts: ['a man', 'a fox', 'a pup'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Tim and Mom got mad at the fox.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw the fox at the hut.', a: 'A red fox outside a small hut or cabin. Ask the child what the fox did when Mom got up.', code: 'C1.4' }
  ]
});
Atlas.decodable.add({
  id: 'cons-n', band: 'K', name: 'Consonant n', focus: ['n'], key: 'net', mark: 'n',
  heart: [],
  words: ['net', 'nap', 'nut', 'nod', 'nip', 'not', 'can', 'ten', 'pin', 'sun', 'van', 'hen', 'fun', 'den'],
  title: 'Nan and the Net',
  text: ['Nan and Ben go to the bog. It is hot. Nan has a net.',
    'Nan can dip the net in. Is it a bug? It is not a bug. Nan got a tin can in the net!',
    'Ben got a lid in his net. Nan and Ben put the can and the lid in a bin. "It is a fun bog!" said Ben.'],
  pic: ['sun', 'pond', 'net'],
  qs: [
    { k: 'choice', q: 'What did Nan get in the net?', opts: ['a bug', 'a tin can', 'a hen'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Ben got a lid.', a: true, code: 'C1.1' },
    { k: 'draw', q: 'Draw Nan and the net.', a: 'Nan holding a net with a tin can in it, perhaps with Ben and a bin. Ask the child where the can went.', code: 'C1.4' }
  ],
  tip: '/n/ is a hum through the nose with the tongue tip up behind the top teeth (nnn, not "nuh"). It is often mixed up with m (net and met). Have the child touch the side of the nose to feel the buzz, then say n and m in a mirror: lips open for n, closed for m.'
});
Atlas.decodable.more('cons-n', {
  words: ['nut', 'nod', 'nip', 'hen', 'pen', 'win', 'bun', 'ran', 'den', 'tan', 'pin'],
  title: 'Ned and the Hen',
  text: ['Ned has a tan hen in a pen. The hen is not big.',
    'The hen ran! It ran to the den, and it ran to the bin. Ned ran and ran.',
    'Ned got a bun. Ned set a bit of bun in the pen. The hen ran in! The hen had a nap in the sun.'],
  pic: ['sun', 'house', 'hen'],
  qs: [
    { k: 'choice', q: 'What did Ned set in the pen?', opts: ['a bun', 'a net', 'a nut'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'The hen is big.', a: false, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['The hen ran.', 'Ned got a bun.', 'The hen had a nap.'], show: [1, 2, 0], code: 'C3.3' }
  ]
});
Atlas.decodable.more('cons-n', {
  words: ['nap', 'nod', 'not', 'net', 'man', 'pen', 'sun', 'van', 'run', 'can', 'tan', 'ten'],
  title: 'Jin and the Tan Pup',
  text: ['Nan and Jin get in the tan van. "Can we get a pup?" said Jin. Nan did a big nod.',
    'A man had a pen. A big pup ran in the pen. A tan pup sat and did not run. It had a nap.',
    '"Can I get the tan pup?" said Jin. "Yes," said Nan. Jin and the pup had a nap in the van.'],
  pic: ['van', 'dog'],
  qs: [
    { k: 'yn', q: 'Jin got the big pup.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Where did Jin and the pup nap?', opts: ['in the van', 'in the pen', 'in a box'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw a pet.', a: 'Any pet the child has or would like. Ask the child to tell you its name and how to care for it.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'cons-p', band: 'K', name: 'Consonant p', focus: ['p'], key: 'pig', mark: 'p',
  heart: [],
  words: ['pig', 'pan', 'pen', 'pot', 'pup', 'pat', 'pin', 'pet', 'cap', 'map', 'tip', 'hop', 'cup', 'top'],
  title: 'Pip the Pig',
  text: ['Pam has a pet pig. The pig is Pip. Pip is big, and Pip can hop.',
    'Pip got in a pit of mud. Pip got mud on Pam, and Pip got mud on Pop. Pop is not mad.',
    'Pam and Pop put Pip in a tub. Pam and Pop pat and rub Pip. Pip is a pig in a tub!'],
  pic: ['sun', 'pig'],
  qs: [
    { k: 'yn', q: 'Pop is mad at Pip.', a: false, code: 'C3.2' },
    { k: 'choice', q: 'What did Pip get in?', opts: ['a pot', 'a pit of mud', 'a pan'], a: 1, code: 'C1.1' },
    { k: 'draw', q: 'Draw Pip in the tub.', a: 'A pig in a tub, perhaps with Pam and Pop beside it. Ask the child why Pip needed a tub.', code: 'C1.4' }
  ],
  tip: '/p/ is a quiet puff of air from closed lips, with no voice (p, not "puh"). It is often mixed up with b (same lips, but b uses the voice) and, in print, with q and d. Hold a hand or a tissue in front of the mouth: p makes it move.'
});
Atlas.decodable.more('cons-p', {
  words: ['pan', 'pen', 'pit', 'pet', 'pop', 'pup', 'cap', 'lap', 'sip', 'top', 'cup'],
  title: 'The Pup and the Pop',
  text: ['Peg has a cup of pop. Peg had a sip and set it on the bed.',
    'The pup got up on the bed. It hit the cup! The pop is on the bed, and the pup can lap it up.',
    '"Pup!" said Peg, but Peg did not get mad. Peg got a rag. The pup had a nap on the mat.'],
  pic: ['bed', 'dog', 'cup'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Peg had a sip.', 'The pup hit the cup.', 'Peg got a rag.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'What did the pup hit?', opts: ['the cup', 'the bed', 'a pan'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Peg is mad at the pup.', a: false, code: 'C3.2' }
  ]
});
Atlas.decodable.more('cons-p', {
  words: ['pop', 'pin', 'pad', 'pet', 'pal', 'up', 'sip', 'tap', 'map', 'nap', 'hop', 'top'],
  title: 'Pat, Pop and the Pup',
  text: ['Pat and Pop sit on a mat. Pop has a bun and a pot of jam.',
    'A pup ran up to the mat. The pup put a pad up on Pat.',
    '"Can the pup have a bit of bun?" said Pat. "Yes," said Pop. A man ran up. "Pip, you bad pup!" said the man. Pip got a bit of bun and a pat.'],
  pic: ['dog', 'pot'],
  qs: [
    { k: 'choice', q: 'What did the pup put up on Pat?', opts: ['a pad', 'a cup', 'a pot'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Pop said the pup can have a bit of bun.', a: true, code: 'C1.1' },
    { k: 'draw', q: 'Draw a pet you can pat.', a: 'Any pet or friendly animal. Ask the child how to pat a dog gently and to ask the owner first.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'cons-r', band: 'K', name: 'Consonant r', focus: ['r'], key: 'red', mark: 'r',
  heart: [],
  words: ['red', 'rug', 'rat', 'rip', 'rob', 'run', 'rag', 'rib', 'rod', 'rub', 'ram', 'rim'],
  title: 'Rex and the Red Rug',
  text: ['Ron has a red rug. Rex the dog can nap on it. Rex is a big dog.',
    'Rap, rap! A rat ran in. Rex got up and ran at the rat. Rip! The rug got a rip.',
    'The rat hid in a log. Mom got a red rag and can fix the rip. Rex had a nap on the red rug.'],
  pic: ['dog', 'log'],
  qs: [
    { k: 'choice', q: 'What ran in?', opts: ['a pig', 'a rat', 'a fox'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Rex is a cat.', a: false, code: 'C1.1' },
    { k: 'draw', q: 'Draw Rex on the red rug.', a: 'A big dog lying on a red rug, maybe with a rip in it. Ask the child where the rat went.', code: 'C1.4' }
  ],
  tip: 'The letter r says /r/ as in red: round the lips a little and growl softly, without adding "uh" (not "ruh"). Children often say /w/ for /r/, which is normal at this age; just model it again. Try a growly dog sound in front of a mirror to see the lips.'
});
Atlas.decodable.more('cons-r', {
  words: ['ram', 'rub', 'rot', 'run', 'rib', 'red', 'rid', 'rim', 'rap', 'rut', 'Ros'],
  title: 'Ros and the Ram',
  text: ['Ros and Dad go to see a ram. Ros can rub the big ram.',
    'Dad has a red hat on. The ram got the hat and ran! "Run, ram, run!" said Ros.',
    'The ram let go of the hat. The rim had a rip. "The ram can have it," said Dad. Ros and Dad sat and had a bun.'],
  pic: ['hat', 'log'],
  qs: [
    { k: 'yn', q: 'The ram got the hat.', a: true, code: 'C1.1' },
    { k: 'yn', q: 'Dad is mad at the ram.', a: false, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Ros can rub the ram.', 'The ram ran.', 'Ros and Dad had a bun.'], show: [2, 0, 1], code: 'C3.3' }
  ]
});
Atlas.decodable.more('cons-r', {
  words: ['rag', 'rap', 'rot', 'rub', 'ram', 'rim', 'rug', 'red', 'rat', 'run', 'Raj'],
  title: 'Raj and the Red Tin',
  text: ['Raj and Kim dig in red mud. Rap! Raj hit the rim of a tin.',
    'Raj and Kim tug at the lid. Pop! In the tin is a rag. In the rag is a red gem.',
    'Raj can rub the gem. "Can we have it?" said Kim. "No. A kid can get it," said Raj. Raj and Kim ran to dig it in.'],
  pic: ['box', 'rock'],
  qs: [
    { k: 'choice', q: 'What is in the rag?', opts: ['a red gem', 'a bun', 'a rat'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Raj and Kim dig the gem in the mud.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw the red gem in the rag.', a: 'A red gem on a rag, maybe in a red tin. Ask the child why Raj put it back.', code: 'C1.4' }
  ]
});
Atlas.decodable.add({
  id: 'cons-s', band: 'K', name: 'Consonant s', focus: ['s'], key: 'sun', mark: 's',
  heart: [],
  words: ['sun', 'sat', 'sip', 'bus', 'sob', 'set', 'yes', 'sad', 'gas', 'sub', 'six', 'us'],
  title: 'Sam on the Bus',
  text: ['Sam and Mom sit on a bus. The sun is hot. Sam has a sip of pop.',
    'Sam can not see the red bag! Is it on the bus? No. Sam is sad and has a sob.',
    'A man has a red bag on his lap. "Is it the bag you had?" said the man. "Yes!" said Sam. Sam is not sad.'],
  pic: ['sun', 'bus', 'bag'],
  qs: [
    { k: 'choice', q: 'What is the bag?', opts: ['red', 'tan', 'big'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'The man is mad at Sam.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw Sam and Mom on the bus.', a: 'Sam and Mom sitting on a bus, with the sun and a red bag. Ask the child how Sam felt at the start and at the end.', code: 'C1.4' }
  ],
  tip: 'The letter s says /s/ as in sun: a long snake hiss you can hold, with teeth close together (not "suh"). Watch for s written backwards, and note that in is, has and his the s says /z/; that is fine to point out but not to teach yet. Let the child trace a big s in the air while hissing.'
});
Atlas.decodable.more('cons-s', {
  words: ['sub', 'sit', 'sad', 'set', 'Sid', 'sun', 'bus', 'sob', 'yes', 'sum', 'Gus'],
  title: 'Sid and the Sub',
  text: ['Sid has a big sub. Sid sat on a log in the sun.',
    'A pup sat at the log. The pup had a sad look. It did not quit.',
    '"Sit," said Sid. The pup sat. "Yes, you can have a bit." Sid set a bit of the sub on the log. Sid and the pup sat in the sun.'],
  pic: ['sun', 'dog', 'log'],
  qs: [
    { k: 'yn', q: 'Sid has a big sub.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the pup sit at the log?', opts: ['to get a nap', 'to get a bit of the sub', 'to dig'], a: 1, code: 'C3.2' },
    { k: 'draw', q: 'Draw you and a pet in the sun.', a: 'The child with a pet, real or wished for, in the sun. Ask what they would share with it.', code: 'C2.5' }
  ]
});
Atlas.decodable.more('cons-s', {
  words: ['sat', 'sun', 'sip', 'Sal', 'six', 'set', 'yes', 'sad', 'us', 'sub', 'Gus'],
  title: 'Sal, Gus and the Bug',
  text: ['Sal, Gus and Mom sit on a rug in the sun. Mom has a bun, a fig and a jug of pop.',
    'A big bug sat on the bun. Sal is sad. "Get it, Gus!" said Sal. Gus set a cup on the bug.',
    '"Let it go," said Mom. Gus let the bug go. Sal, Gus and Mom had a sip and a bun. Yes!'],
  pic: ['sun', 'bug', 'cup'],
  qs: [
    { k: 'choice', q: 'What sat on the bun?', opts: ['a cat', 'a bug', 'a hen'], a: 1, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['A bug sat on the bun.', 'Gus set a cup on the bug.', 'Gus let the bug go.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'yn', q: 'Mom is mad at the bug.', a: false, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'cons-t', band: 'K', name: 'Consonant t', focus: ['t'], key: 'top', mark: 't',
  heart: [],
  words: ['top', 'tub', 'ten', 'tin', 'tap', 'tug', 'cat', 'wet', 'pit', 'hot', 'nut', 'set', 'Tom'],
  title: 'Tip in the Tub',
  text: ['Tom has a pup, Tip. Tip got in the mud. Tip is a mud pup!',
    'Tom set a tub in the sun. Tip got in the tub. Tom got a rag. Rub, rub, rub!',
    'Tip did not sit. Tip hit the tub, got up and ran. Tip ran to the mud pit! Tom is wet, and Tip is a mud pup.'],
  pic: ['sun', 'dog', 'pot'],
  qs: [
    { k: 'choice', q: 'Tip is a...', opts: ['pup', 'cat', 'pig'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Tip got in the mud.', 'Tip got in the tub.', 'Tip ran to the mud pit.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'Tip is a mud pup at the last.', a: true, code: 'C3.2' }
  ],
  tip: 'The letter t says /t/ as in top: a quick tap of the tongue behind the top teeth, with a puff of air and no voice (not "tuh"). Watch for t mixed up with d, which is made the same way but with the voice on. Hold a tissue in front of the mouth: /t/ makes it flutter.'
});
Atlas.decodable.more('cons-t', {
  words: ['tap', 'top', 'Tam', 'pot', 'mat', 'hit', 'Kit', 'tot', 'got', 'tip', 'sat'],
  title: 'Tam and the Top',
  text: ['Tam and Kit sit on a mat. Tam has a red top. It can go and go.',
    'Tut the cat sat at the mat. Tap! Tut hit the top. It hit a pot and got in it.',
    'Look! Tut is in the pot, on top of the top. "Tut, get up," said Kit. Tut did not get up. It is a cat pot!'],
  pic: ['cat', 'pot'],
  qs: [
    { k: 'yn', q: 'Tut is a dog.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What did Tut hit?', opts: ['the top', 'the pot', 'Kit'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw Tut in the pot.', a: 'A cat curled up in a pot, maybe with a red top. Ask the child why Tut did not get up.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('cons-t', {
  words: ['top', 'tin', 'cot', 'hut', 'hot', 'set', 'tub', 'sat', 'Tim', 'ten', 'lit', 'bit'],
  title: 'Tim and Tam at the Top',
  text: ['Tim, Tam and Dad go up, up, up. It is hot. Tim has a tin cup of pop.',
    'At the top is a hut. Tam and Dad set up a cot in it. Tim got a hot bun.',
    'Tim, Tam and Dad sit and see the red sun set. "It is fun at the top," said Tam. Tim had a nap on the cot.'],
  pic: ['sun', 'hill', 'hut', 'cup'],
  qs: [
    { k: 'choice', q: 'What is at the top?', opts: ['a hut', 'a bus', 'a van'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Tam is sad at the top.', a: false, code: 'C3.2' },
    { k: 'choice', q: 'What did Tim have a nap on?', opts: ['a rug', 'a log', 'the cot'], a: 2, code: 'C1.1' }
  ]
});
Atlas.decodable.add({
  id: 'cons-v', band: 'K', name: 'Consonant v', focus: ['v'], key: 'van', mark: 'v',
  heart: [],
  words: ['van', 'vet', 'vat', 'vim', 'rev', 'vex', 'Viv', 'Val', 'Vic', 'Vin'],
  title: 'Viv the Vet',
  text: ['Viv is a vet. She has a big red van. Rev, rev! Viv can get to a sad pet.',
    'Val had a pup, Vic. Vic had a cut on his leg. Val ran to get Viv.',
    'Viv and the van got to Val. Viv put a pad on the cut. Vic got up and ran to Val!'],
  pic: ['house', 'van', 'dog'],
  qs: [
    { k: 'yn', q: 'Viv is a vet.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What did Vic have on his leg?', opts: ['a cut', 'a bug', 'a hat'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Viv can fix a pet.', a: true, code: 'C3.2' }
  ],
  tip: '/v/ is a buzz you can hold (vvv): the top teeth rest on the bottom lip and the voice hums. It is often mixed up with f, the same mouth shape with the voice off: a hand on the throat feels v buzz and f stay quiet. Short words almost never end in v (have needs an e), so v usually comes first.'
});
Atlas.decodable.more('cons-v', {
  words: ['vat', 'van', 'Val', 'Vin', 'vet', 'Dev', 'Bev', 'rev', 'vim', 'Viv'],
  title: 'Sap in a Vat',
  text: ['Val, Vin and Dad got in the van. Rev, rev! The van got to a big hut.',
    'In the hut, Dev had a big vat. The vat had hot sap in it. Dev let Val and Vin mix it.',
    'The hot sap got tan. Dev let Val have a bit. "Yum!" said Val. "Can I have a vat of it?"'],
  pic: ['van', 'hut', 'maple'],
  qs: [
    { k: 'choice', q: 'What was in the vat?', opts: ['hot sap', 'mud', 'a cup'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Val had fun at the hut.', a: true, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Val and Vin got in the van.', 'Val and Vin mix the sap.', 'Val had a bit of sap.'], show: [2, 0, 1], code: 'C3.3' }
  ]
});
Atlas.decodable.more('cons-v', {
  words: ['vet', 'van', 'Liv', 'Kev', 'vat', 'Bev', 'vim', 'rev', 'Vic', 'Val'],
  title: 'The Vet Van',
  text: ['Bev and Kev had a hen. It was sad. Kev ran to get the vet.',
    'Liv the vet had a red van. The van got in the mud. Rev, rev! The van sat in the mud.',
    'Liv ran to the hen. She fed the hen a bit of mix. The hen got up! "The van can sit in the mud," said Liv.'],
  pic: ['house', 'hen', 'van'],
  qs: [
    { k: 'yn', q: 'The van got in the mud.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Kev run to get the vet?', opts: ['The hen was sad.', 'The van was in the mud.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'Do you have a pet? What is it?', a: 'Any answer, for example: I have a cat.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'cons-w', band: 'K', name: 'Consonant w', focus: ['w'], key: 'web', mark: 'w',
  heart: [],
  words: ['web', 'wet', 'wag', 'win', 'wig', 'wax', 'wok', 'wed', 'wit'],
  title: 'Wiz and the Wet Web',
  text: ['It was wet. Wes and his dog, Wiz, sat in the hut. Wes had a nap, and Wiz did not.',
    'Wiz ran to the pen. A big wet web was on the pen. A bug sat in the web.',
    'Wiz had a yap. "We can look at the web, but do not get it, Wiz," said Wes. Wiz sat and did a big wag.'],
  pic: ['hut', 'dog', 'web', 'bug'],
  qs: [
    { k: 'yn', q: 'Wiz is a dog.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What is in the web?', opts: ['a cat', 'a bug', 'a hat'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Wes is mad at Wiz.', a: false, code: 'C3.2' }
  ],
  tip: '/w/ starts with the lips pushed into a small round circle, then they open fast: say "w", not "wuh" or "double-u". It can be mixed up with r (wed and red) and v. Use a mirror so the child can see round lips for w.'
});
Atlas.decodable.more('cons-w', {
  words: ['wig', 'wet', 'win', 'web', 'wag', 'wok', 'wax', 'wed', 'wit', 'Win'],
  title: 'A Wet Wig',
  text: ['Win and Wil have a big red wig. Win put on the wig. Win had fun!',
    'Bud the dog got the wig. Bud ran to the tub. The wig got wet! Win and Wil are sad.',
    'Mom got a fan. The wig is not wet. Win put on the wig, and Bud did a big wag.'],
  pic: ['dog', 'hat'],
  qs: [
    { k: 'choice', q: 'What did Win have?', opts: ['a red wig', 'a red hat', 'a red cup'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Bud got the wig wet.', a: true, code: 'C1.1' },
    { k: 'draw', q: 'Draw Win in the wig.', a: 'A child in a big red wig. Ask the child how Mom fixed the wet wig.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('cons-w', {
  words: ['wok', 'wet', 'wag', 'web', 'win', 'wig', 'wax', 'wed', 'wit'],
  title: 'Wen and the Wok',
  text: ['Wen and Dad sit at the hut. Dad has a big wok. Wen put ham in the wok.',
    'A wet dog ran up and sat at the wok. "Can the dog have a bit?" said Wen. "Yes," said Dad.',
    'The dog got a bit of ham. It did a big wag. "You are Wim," said Wen. Wim had a nap at the hut.'],
  pic: ['hut', 'pot', 'dog'],
  qs: [
    { k: 'choice', q: 'What is in the wok?', opts: ['ham', 'jam', 'a bug'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Dad is mad at the dog.', a: false, code: 'C3.2' },
    { k: 'write', q: 'What do you have in a wok?', a: 'Any food from the child\'s own life, e.g. "rice" or "egg". Write it for the child if needed.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'cons-x', band: 'K', name: 'Consonant x /ks/', focus: ['x'], key: 'box', mark: 'x',
  heart: [],
  words: ['box', 'fox', 'ox', 'six', 'fix', 'mix', 'wax', 'sax', 'tux', 'Max', 'Rex'],
  title: 'A Fox in a Box',
  text: ['Rex is six. Rex and Max have a big box. The box has a rip. Max can fix it.',
    'Look! A red fox sat in the box. "Is it an ox?" said Rex. "No, it is a fox!" said Max. "A fox in a box!"',
    'The fox had a nap in the box. It got up and ran to a den.'],
  pic: ['box', 'fox', 'spruce'],
  qs: [
    { k: 'yn', q: 'Rex is six.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What sat in the box?', opts: ['an ox', 'a fox', 'a cat'], a: 1, code: 'C1.1' },
    { k: 'draw', q: 'Draw the fox in the box.', a: 'A red fox curled up in a big box. Ask the child why Rex said ox (fox and ox sound alike).', code: 'C1.4' }
  ],
  tip: 'The letter x says two sounds together, /ks/, like the end of box. In short words x comes at the end, so the child reads the vowel and then /ks/: b-o-ks. Watch for x read as its letter name ("ex") or as /z/; have the child tap two fingers for the two sounds.'
});
Atlas.decodable.more('cons-x', {
  words: ['fix', 'box', 'ox', 'sax', 'six', 'Dex', 'wax', 'fox', 'mix', 'tux'],
  title: 'Dex and His Sax',
  text: ['Dex is six. Dex has a red sax. Dex and Dad have a gig at the hut.',
    'Dad put on a tux. Dex put a tux on his pup, Rex. Rex got a rip in it. Dad can fix it.',
    'Dex sat on a box and had a go on the sax. Rex did a yip. It is a fun mix!'],
  pic: ['hut', 'box', 'dog'],
  qs: [
    { k: 'choice', q: 'What did Dex sit on?', opts: ['a box', 'a log', 'a bed'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Rex is a cat.', a: false, code: 'C1.1' },
    { k: 'draw', q: 'Draw Rex in a tux.', a: 'A pup dressed in a little suit (a tux), maybe sitting up next to Dex and his sax.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('cons-x', {
  words: ['wax', 'box', 'six', 'fix', 'mix', 'fox', 'tux', 'ox', 'Max', 'Rex'],
  title: 'Tex the Ox',
  text: ['Nan has a big red ox. The ox is Tex. Max is six. Max and Nan fed Tex in the pen.',
    'Tex got in the mud. "Get up, Tex!" said Max. Tex sat and sat. Rex, the dog, did a yap.',
    'Nan had a fix: a yam in a box. Up got Tex! Tex had the yam, and Max had mud up to his hip.'],
  pic: ['house', 'box', 'dog'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Tex got in the mud.', 'Nan got a box.', 'Tex got up.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'Why did Tex get up?', opts: ['Tex can get the yam.', 'Tex was hot.', 'Rex did a yap.'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'Max got mud on him.', a: true, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'cons-y', band: 'K', name: 'Consonant y /y/', focus: ['y'], key: 'yes', mark: 'y',
  heart: [],
  words: ['yes', 'yet', 'yak', 'yam', 'yap', 'yip', 'yum', 'yup'],
  title: 'Yip, Yap, Yum',
  text: ['Yan has a pup. The pup can yip and yap. Yip! Yap! Yip!',
    'Mom has a hot yam in a pan. "Yum!" said Yan. "Can the pup have a bit?" "Not yet," said Mom. "It is hot."',
    'The pup sat, and it did not yap. "Yes," said Mom. "Yup!" said Yan. The pup had a bit of yam. Yum!'],
  pic: ['dog', 'pan'],
  qs: [
    { k: 'yn', q: 'The pup can yap.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What did Mom have in the pan?', opts: ['a yam', 'a bun', 'a nut'], a: 0, code: 'C1.1' },
    { k: 'draw', q: 'Draw the pup and the yam.', a: 'A small dog with a yam, perhaps sitting nicely. Ask the child why Mom said not yet.', code: 'C1.4' }
  ],
  tip: '/y/ is a quick glide with the middle of the tongue pressed high, as at the start of yes (not "yuh"). Here y only starts words; later it also says /ee/ and /i/ (happy, my), so keep to /y/ for now. Children often swap y with j or w: say yet and jet in a mirror and feel where the tongue goes.'
});
Atlas.decodable.more('cons-y', {
  words: ['yak', 'yes', 'yip', 'yum', 'yet', 'yam', 'yap', 'yup'],
  title: 'Yaz and the Yak',
  text: ['Yaz and Dad go to see a yak. The yak is in a pen at a hut.',
    '"Can I pet the yak?" said Yaz. "Not yet," said Dad. The yak got up and ran to Yaz.',
    '"Yes, you can pet it," said Dad. Yaz can pat the yak. It did not yip. It did not yap. "Yup, a yak is fun!" said Yaz.'],
  pic: ['sun', 'hut'],
  qs: [
    { k: 'choice', q: 'Where is the yak?', opts: ['in a pen', 'in a bed', 'in a van'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'The yak is mad at Yaz.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw Yaz and the yak.', a: 'A child beside a big shaggy animal in a pen. Ask the child what Dad said first.', code: 'C1.4' }
  ]
});
Atlas.decodable.more('cons-y', {
  words: ['yum', 'yap', 'yes', 'yip', 'yet', 'yam', 'yak', 'yup'],
  title: 'Not Yet, Yin',
  text: ['Yin is in bed. Yin is hot and sad. The pup sat on the bed.',
    '"Can you get up yet?" said Mom. "Not yet," said Yin. Mom got Yin a cup of hot yam. "Yum," said Yin.',
    'Yin had a nap. The pup did not yip. "Can you run yet?" said Mom. "Yes! Yup!" said Yin. Yin and the pup ran in the sun.'],
  pic: ['bed', 'dog', 'cup'],
  qs: [
    { k: 'order', q: 'Number the story in order.', items: ['Yin is in bed.', 'Yin had a hot yam.', 'Yin and the pup ran.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'yn', q: 'Yin is hot and sad.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Who got Yin a cup of yam?', opts: ['Mom', 'the pup', 'Dad'], a: 0, code: 'C1.1' }
  ]
});
Atlas.decodable.add({
  id: 'cons-z', band: 'K', name: 'Consonant z', focus: ['z'], key: 'zip', mark: 'z',
  heart: [],
  words: ['zip', 'zap', 'zig', 'zag', 'zed', 'fez', 'quiz', 'Liz', 'Zak', 'Roz'],
  title: 'Zak and the Zip',
  text: ['Zak has a big red bag. It has a zed on it and a zip. Zip, zip!',
    'Zak has a quiz. Zak set a pen in the bag. Zak had a tug, but the zip did not zip up.',
    'Liz can fix it. Liz got the zip to go zig and zag, and zip! "Yes!" said Zak. Zak and Liz ran to the bus.'],
  pic: ['bag', 'pen', 'bus'],
  qs: [
    { k: 'yn', q: 'The zip did not zip up.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Who got the zip to go?', opts: ['Zak', 'Liz', 'Mom'], a: 1, code: 'C1.1' },
    { k: 'draw', q: 'Draw the bag of Zak.', a: 'A big red bag with a zipper and a Z on it. Ask the child how Liz helped.', code: 'C1.4' }
  ],
  tip: 'The letter z says /z/ as in zip: a buzzing bee sound you can hold, made like /s/ but with the voice on (not "zuh"). Watch for z mixed up with s. Put a hand on the throat: /z/ buzzes and /s/ does not. In Canada the letter is called zed.'
});
Atlas.decodable.more('cons-z', {
  words: ['zig', 'zag', 'zip', 'zap', 'fez', 'Zed', 'Roz', 'quiz', 'Liz', 'zed'],
  title: 'Zed and the Zig Zag Bug',
  text: ['Roz and Zed sit on a log in the sun. Zed has a red fez on.',
    'A bug can zig and zag. Zip! It sat on the fez. Zed did not see it.',
    '"Zed, a bug is on the fez!" said Roz. Zed got up. Zap! The bug can zig and zag, up to the sun. Zed and Roz sat and had fun.'],
  pic: ['sun', 'bug', 'hat', 'log'],
  qs: [
    { k: 'yn', q: 'Zed has a red hat on.', a: true, code: 'C1.4' },
    { k: 'choice', q: 'What did the bug sit on?', opts: ['the log', 'the fez', 'Roz'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Roz is mad at Zed.', a: false, code: 'C3.2' }
  ]
});
Atlas.decodable.more('cons-z', {
  words: ['quiz', 'zip', 'zag', 'zed', 'zig', 'Zak', 'Liz', 'zap', 'Zeb', 'fez'],
  title: 'A Quiz in the Van',
  text: ['Liz and Zak sit in the van. Zeb the dog can nap in it. Mom has a quiz.',
    '"It can zip," said Mom. "A bag!" said Zak. "It can zig and zag." "A bug!" said Liz.',
    '"It has a zig and a zag. It is in Liz and Zak." "A zed!" said Liz and Zak. "Yes! Ten of ten!" said Mom. Zeb had a yap.'],
  pic: ['van', 'dog', 'bag', 'bug'],
  qs: [
    { k: 'choice', q: 'What can zig and zag?', opts: ['a bag', 'a bug', 'a van'], a: 1, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Mom has a quiz.', 'Zak said a bag can zip.', 'Liz and Zak got ten of ten.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'yn', q: 'Mom is mad.', a: false, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'sh', band: 'K', name: 'Digraph sh', focus: ['sh'], key: 'ship', mark: 'sh',
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
  id: 'ch', band: 'K', name: 'Digraph ch', focus: ['ch'], key: 'chin', mark: 'ch',
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
  id: 'th', band: 'K', name: 'Digraph th', focus: ['th'], key: 'thumb', mark: 'th',
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
  id: 'wh', band: 'K', name: 'Digraph wh', focus: ['wh'], key: 'whale', mark: 'wh',
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
  id: 'ck', band: 'K', name: 'ck at the end', focus: ['ck'], key: 'duck', mark: 'ck',
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
    { k: 'yn', q: 'The duck had a fall.', a: true, code: 'C1.1' }
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
    { k: 'yn', q: 'The pigs nap in the sun.', a: true, code: 'C1.1' }
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
/* step 19x */
Atlas.decodable.add({
  id: 'oll-ull', band: '1', name: 'oll and ull', focus: ['oll', 'ull'], key: 'roll, full', mark: 'oll|ull',
  hunt: 'Underline every word with oll or ull, like roll and full.',
  heart: [],
  words: ['roll', 'toll', 'poll', 'troll', 'stroll', 'scroll', 'full', 'pull', 'bull', 'rolls', 'pulls', 'bulls', 'trolls', 'scrolls'],
  title: 'The Bull and the Plums',
  text: ['Gran and Rick stroll up a hill. Gran has a bag full of plums. At the top of the hill is a pen with a big bull in it.',
    'The bull is black, with a big neck. It huffs and stamps.',
    'Then the bag tips, and a plum rolls off. It rolls and rolls, and it ends up in the bull\'s pen!',
    'Rick wants to get it back, but Gran pulls him back. The bull sniffs the plum. Then munch, munch! It gulps it up.',
    '"That bull has my plum!" says Rick. Gran grins. "We still have a bag full of them."'],
  pic: ['sun', 'hill', 'bag'],
  qs: [
    { k: 'choice', q: 'What rolls in the pen?', opts: ['a plum', 'a bag', 'a hat'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Gran is cross with the bull.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw the bull and the plum in the pen.', a: 'A big bull in a pen with a plum, maybe Rick and Gran on the hill.', code: 'C1.4' }
  ],
  tip: 'In a few words, o before ll says its long name, as in roll, troll and stroll (not the short o in doll). In full, pull and bull, u says the sound in book (not the u in gull). These are small word families, so practise them as a set and watch for roll read to rhyme with doll.'
});
/* step 19x, story 2 */
Atlas.decodable.more('oll-ull', {
  words: ['poll', 'polls', 'pull', 'scroll', 'pulls', 'roll', 'troll', 'rolls', 'full', 'toll'],
  title: 'The Class Poll',
  text: ['Miss Fong\'s class wants a pet. "Let us have a poll," says Miss Fong. "Do we want a fish? Do we want a frog?"',
    'The kids drop slips in a box. Miss Fong pulls the slips from the box, one by one. Jin adds them up on a list. Then he rolls the list up. It is a scroll!',
    'Ten kids want a fish, and ten kids want a frog! Then Jin spots one last slip. It has a troll on it!',
    'The class is full of grins. "We can get a fish and a frog," says Miss Fong. "But no troll!"'],
  pic: ['fish', 'frog', 'box'],
  qs: [
    { k: 'yn', q: 'The last slip has a frog on it.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why is the class full of grins?', opts: ['A slip has a troll on it.', 'The fish is big.', 'Miss Fong is sad.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What pet do you want for your class?', a: 'Any sensible answer, such as: a fish, a frog, a rabbit.', code: 'C2.5' }
  ]
});
/* step 19x, story 3 */
Atlas.decodable.more('oll-ull', {
  words: ['troll', 'toll', 'stroll', 'scroll', 'tolls', 'roll', 'full', 'trolls', 'bull', 'strolls'],
  title: 'The Troll and the Toll',
  text: ['Liz and Jin stroll on a path up a hill. At the top is a big log, and on the log sits a troll!',
    'The troll has a long scroll. "Stop!" he yells. "This is my path. If you want to pass, you must give me a toll."',
    '"What is the toll?" asks Liz. The troll rolls up his scroll. "A bag full of gems. A bull. Ten plums," he says.',
    'Liz and Jin have no gems. They have no bull. "Can we sing you a song?" asks Jin.',
    'The troll nods. Liz and Jin sing a long song. The troll claps and stomps. "That is the best toll!" he yells. "You can pass."'],
  pic: ['sun', 'hill', 'log'],
  qs: [
    { k: 'order', q: 'Put the story in order.', items: ['Liz and Jin stroll up the hill.', 'The troll asks for a toll.', 'Liz and Jin sing a song.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'Where does the troll sit?', opts: ['on a log', 'in a pond', 'on a bull'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'The troll is glad at the end.', a: true, code: 'C3.2' }
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
    { k: 'yn', q: 'Deb pets a fox kit.', a: false, code: 'C1.1' }
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
/* step 32x */
Atlas.decodable.add({
  id: 'ph', band: '1', name: 'ph', focus: ['ph'], key: 'phone', mark: 'ph',
  heart: [],
  words: ['phone', 'graph', 'Phil', 'Ralph', 'dolphin', 'photo', 'trophy', 'alphabet', 'elephant', 'phase', 'Steph', 'phonics'],
  title: 'Phil and the Dolphins',
  text: ['Phil and his mom ride a big ship on the Pacific. Phil has Mom\'s phone. He wants to get a photo of a dolphin.',
    'Then Phil spots a fin. Splash! A dolphin jumps up. Phil lifts the phone, but the dolphin dives back in.',
    'Splash! Splash! Six dolphins jump and dive. Phil gets six photos of splashes. He gets one of a gull. He gets one of his hand.',
    'Phil sits on a bench. He is glum. Then Mom taps him. "Look!" A dolphin swims up next to the ship. It jumps up close. Click! Phil gets his photo at last. "That is the best photo," he says.'],
  pic: ['sun', 'ship', 'fish'],
  qs: [
    { k: 'choice', q: 'What does Phil want a photo of?', opts: ['a dolphin', 'a gull', 'a ship'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Phil is glad at the end.', a: true, code: 'C3.2' },
    { k: 'draw', q: 'Draw the dolphin next to the ship.', a: 'A dolphin jumping up out of the water beside a ship, maybe Phil with a phone.', code: 'C1.4' }
  ],
  tip: 'The two letters ph work as a team and say /f/, as in phone, graph and dolphin. You do not hear a p or an h. Watch for ph read as /p/ (pone for phone), and point out that ph can come at the start, middle or end of a word.'
});
/* step 32x, story 2 */
Atlas.decodable.more('ph', {
  words: ['Ralph', 'trophy', 'photo', 'Steph', 'Joseph', 'phone', 'dolphin', 'graph', 'phase', 'Phil'],
  title: 'Ralph and the Trophy',
  text: ['Ralph is in a big race at Pine Hill Camp. The kid who wins gets a trophy. Ralph wants that trophy!',
    'Bang! The kids dash off. Ralph is fast. He is close to the end. Then Steph trips and falls next to him.',
    'Ralph stops. He helps Steph up, and they run to the end side by side. They are the last two kids.',
    'Ralph did not get the trophy. But then Miss Joseph hands him a big photo. It is Ralph and Steph, side by side at the end of the race. "This is a trophy as well," she says. Ralph grins.'],
  pic: ['sun', 'tent', 'spruce'],
  qs: [
    { k: 'yn', q: 'Ralph gets the trophy.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why does Ralph stop?', opts: ['Steph falls.', 'He is sad.', 'He wins.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'When did you help a pal?', a: 'Any sensible answer, such as: I helped my pal get up. I gave my pal a pencil.', code: 'C2.5' }
  ]
});
/* step 32x, story 3 */
Atlas.decodable.more('ph', {
  words: ['alphabet', 'phone', 'elephant', 'Philip', 'photo', 'phones', 'graph', 'Steph', 'dolphins', 'trophy', 'elephants'],
  title: 'The Alphabet Game',
  text: ['Philip and Steph are on a long drive to a lake with Mom and Dad. Philip has Dad\'s phone. Then the phone stops. Philip is fed up.',
    '"Let us do the alphabet game," says Mom. "Spot things, and begin with A."',
    '"Ant!" says Philip. It is on the van mat. "Bike!" says Steph. A man on a bike zips past. "Cat!" "Dish!" They go on and on.',
    'Then it is E. Steph thinks and thinks. "Elephant!" she says. Philip grins. "There is no elephant on this drive!"',
    'Then Dad stops the van. "Here we are," he says. "Elephant Lake!" "Elephant Lake! That is my E!" says Steph. Philip gets a photo of it on the phone.'],
  pic: ['sun', 'van', 'spruce', 'pond'],
  qs: [
    { k: 'order', q: 'Put the story in order.', items: ['The phone stops.', 'They do the alphabet game.', 'Dad stops the van at the lake.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'choice', q: 'What is the name of the lake?', opts: ['Elephant Lake', 'Dolphin Lake', 'Big Lake'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Philip and Steph have fun on the drive.', a: true, code: 'C3.2' }
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
/* step 35x */
Atlas.decodable.add({
  id: 'air-are', band: '1', name: 'air, are and ear', focus: ['air', 'are', 'ear'], key: 'chair, care, bear', mark: 'air|are\\b|ear',
  hunt: 'Underline every word with air, are or ear that sounds like chair.',
  heart: [],
  words: ['hair', 'fair', 'chair', 'stairs', 'pair', 'care', 'share', 'scare', 'square', 'stare', 'bear', 'pear', 'wear', 'swear'],
  title: 'The Fall Fair',
  text: ['Clare and Gramps go to the fall fair. Clare wears a red hat. Gramps wears a pair of big glasses.',
    'First they stop at the hens and the pigs. Then they see a big black mare with long hair. The mare stares at Clare. Clare stares back.',
    'Next is a big ride. It spins and dips and zips. "I do not dare," says Clare. "It is a scare!" Gramps nods. "We can just look, then."',
    'Then Clare spots a stand with pears. Gramps gets a bag of pears. They sit on a bench and share them. "This is the best part of the fair," says Clare.'],
  pic: ['sun', 'tent', 'hen', 'pig'],
  qs: [
    { k: 'choice', q: 'What do Clare and Gramps share?', opts: ['pears', 'a hat', 'glasses'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Clare wants to go on the big ride.', a: false, code: 'C3.2' },
    { k: 'draw', q: 'Draw the mare with long hair.', a: 'A horse with a long mane, maybe Clare in a red hat looking at it.', code: 'C1.4' }
  ],
  tip: 'Air says the sound in chair. Are at the end of a word says the same sound (care, share), and so does ear in a few words: bear, pear, wear and swear. Watch for care read like car, and for bear read with the ear in hear; point out that one sound has three spellings here.'
});
/* step 35x, story 2 */
Atlas.decodable.more('air-are', {
  words: ['bear', 'scare', 'stare', 'hair', 'hare', 'dare', 'chair', 'bare', 'spare', 'fair'],
  title: 'A Bear Scare',
  text: ['Blair and her mom camp by a lake in the North. It is dark. Blair is in bed in the tent.',
    'Then, thump, thump! Blair sits up. The hair on her neck stands up. "Mom, is it a bear?"',
    'Mom gets the lamp. She and Blair look past the tent flap. A big hare sits on the grass. It stares at them. Then it hops off.',
    '"It was just a hare," says Mom. "Not a bear!" Blair grins. "That was a big scare from a hare." Then she curls up in bed.'],
  pic: ['moon', 'star', 'tent', 'rabbit'],
  qs: [
    { k: 'yn', q: 'It was a bear.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why does Blair sit up?', opts: ['There is a thump.', 'It is time to go.', 'Mom yells.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What is a big scare for you?', a: 'Any sensible answer, such as: a big dog, the dark, a storm.', code: 'C2.5' }
  ]
});
/* step 35x, story 3 */
Atlas.decodable.more('air-are', {
  words: ['chair', 'spare', 'stairs', 'square', 'share', 'chairs', 'pear', 'care', 'hair', 'pears', 'wear'],
  title: 'The Spare Chair',
  text: ['Gran is coming for supper. Kamal and his dad set the plates and forks.',
    'Then Kamal stops. There are six chairs, but there are seven people for supper! "Is there a spare chair?" asks Dad.',
    'Kamal runs up the stairs. There is no chair. Then he checks the shed. There is no chair there as well.',
    'Then Kamal has a plan. He gets a big square box and sets a soft rug on it. "Here is a spare chair," he says.',
    'Gran comes in. She has long white hair, and she has a pear cake to share. "I will sit on the square chair," she says. "It is the best chair here!"'],
  pic: ['box', 'cake'],
  qs: [
    { k: 'order', q: 'Put the story in order.', items: ['Kamal sets the forks.', 'Kamal runs up the stairs.', 'Gran sits on the box.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'What does Gran bring to share?', opts: ['a pear cake', 'a chair', 'a rug'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Gran is glad to sit on the box.', a: true, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'ai-ay', band: '1', name: 'Vowel team ai ay', focus: ['ai', 'ay'], key: 'rain, day', mark: 'ai|ay',
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
  words: ['trail', 'way', 'chain', 'may', 'pail', 'sway', 'brain', 'spray', 'stain', 'plain', 'snail'],
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
  words: ['bay', 'mail', 'today', 'raisin', 'claim', 'paid', 'sprain', 'delay', 'fail', 'railway'],
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
  id: 'ee-ea', band: '1', name: 'Vowel team ee ea ey', focus: ['ee', 'ea', 'ey'], key: 'tree, seal, key', mark: 'ee|ea|ey',
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
/* step 37x */
Atlas.decodable.add({
  id: 'ea-bread', hunt: 'Underline every word where ea says /e/ as in bread or /ay/ as in great.', band: '1', name: 'ea as in bread and great', focus: ['ea'], key: 'bread, great', mark: 'ea',
  heart: [],
  words: ['head', 'bread', 'ready', 'heavy', 'weather', 'feather', 'sweater', 'breakfast', 'instead', 'spread', 'thread', 'breath', 'great', 'break', 'steak'],
  title: 'Bannock for Breakfast',
  text: ['The weather was wet and chilly. Ben and his dad wanted to make bannock for breakfast.',
    'Dad set a heavy pan on the stove. Ben mixed the bannock in a big dish. Then he pressed it flat with his hands, and Dad slid it in the pan.',
    '"Is it ready?" Ben asked. His tummy was rumbling. "Not yet," said Dad. "Bannock needs time. Let us get the jam instead."',
    'At last, the bannock was ready. It was hot and crisp. Ben spread jam on a big slice. He ate one slice, then a second.',
    'Dad gave Mom a slice in bed. "This is great bread," said Mom. Ben grinned. "It is great weather for bannock," he said.'],
  pic: ['rain', 'house', 'pan'],
  qs: [
    { k: 'yn', q: 'Ben and Dad made bannock for breakfast.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Ben have to wait?', opts: ['Bannock needs time.', 'Dad was asleep.', 'The jam was lost.'], a: 0, code: 'C3.2' },
    { k: 'choice', q: 'Which word ends like bread?', opts: ['head', 'bead', 'break'], a: 0, code: 'C3.1' }
  ],
  tip: 'Ea has three sounds. Most often it says /ee/ as in seal, but in some words it says short /e/, as in bread, head and weather, and in a few words it says /ay/, as in great, break and steak. If the child reads bread as "breed", have them try the other sounds of ea and pick the one that makes a real word.'
});
/* step 37x, story 2 */
Atlas.decodable.more('ea-bread', {
  words: ['sweater', 'thread', 'feather', 'breath', 'head', 'spread', 'instead', 'bread', 'great', 'leather', 'heavy'],
  title: 'The Feather on the Sweater',
  text: ['Lena has a red sweater. It is her best sweater. She likes it so much that she wants to sleep in it.',
    'One day, Lena was playing tag at the park. She ran past a fence, and her sweater got stuck on a nail. Rip! Lena held her breath. Then she began to sob.',
    'At home, her kokum said, "Do not be sad. Get my thread and my beads." Kokum is Cree, and she makes the best beadwork in the family.',
    'Kokum spread the sweater on her lap. She stitched up the rip with red thread. Then she added tiny white beads in the shape of a feather.',
    'Lena put the sweater on. Instead of a rip, there was a feather. "It is not just mended," said Lena. "It is great!"'],
  pic: ['spruce', 'house', 'flower'],
  qs: [
    { k: 'yn', q: 'Lena got a rip in her sweater.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'How did Lena feel at the end?', opts: ['glad', 'sad', 'cross'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw the feather on the sweater.', a: 'A red sweater with a feather shape made of small dots or beads where the rip was. Ask the child how Kokum fixed it.', code: 'C1.4' }
  ]
});
/* step 37x, story 3 */
Atlas.decodable.more('ea-bread', {
  words: ['weather', 'heavy', 'steak', 'breath', 'instead', 'sweat', 'great', 'spread', 'ready', 'break', 'headed'],
  title: 'Heavy Weather',
  text: ['Deb and Sam live on a big farm in Alberta. It was a hot day in July, and they had a plan: a picnic by the pond, with steak and bread.',
    'But at lunch, the sky got dark. Dad checked the weather on his phone. "A big storm is on the way," he said. "It will be a heavy one."',
    'Deb and Sam rushed to get the hens in the barn. At last, the hens were in, and Deb had to stop and catch her breath.',
    'Then the rain came in sheets. The family got in just in time.',
    'Instead of a picnic by the pond, they had a picnic on the rug. Dad made steak on the stove, and Sam spread jam on the bread. "This is a great picnic," said Sam. "The best one," said Deb.'],
  pic: ['cloud', 'rain', 'house', 'hen'],
  qs: [
    { k: 'yn', q: 'They had the picnic by the pond.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Which is the best name for this story?', opts: ['A Picnic in a Storm', 'The Lost Hen', 'A Trip to the Beach'], a: 0, code: 'C2.6' },
    { k: 'write', q: 'What do you do on a day with heavy rain?', a: 'The child\'s own idea, such as read, paint, play a game or bake. Help write one short sentence.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'oa-ow', band: '1', name: 'Vowel team oa ow oe', focus: ['oa', 'ow', 'oe'], key: 'boat, snow, toe', mark: 'oa|ow|oe',
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
  id: 'igh-ie', band: '1', name: 'Vowel team igh ie', focus: ['igh', 'ie'], key: 'light, pie', mark: 'igh|ie',
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
  id: 'oo-moon', band: '1', name: 'oo as in moon', focus: ['oo'], key: 'moon', mark: 'oo',
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
  id: 'oo-book', band: '1', name: 'oo as in book', focus: ['oo'], key: 'book', mark: 'oo',
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
  id: 'ou-ow', band: '1', name: 'ou and ow as in cloud and cow', focus: ['ou', 'ow'], key: 'cloud, cow', mark: 'ou|ow',
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
  id: 'oi-oy', band: '1', name: 'oi and oy', focus: ['oi', 'oy'], key: 'coin, boy', mark: 'oi|oy',
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
    { k: 'yn', q: 'Noor enjoyed the taffy.', a: true, code: 'C3.2' },
    { k: 'write', q: 'What sweet treat do you enjoy?', a: 'The child\'s own idea, such as taffy, ice cream or fruit. Ask them to read it back to you.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'au-aw', band: '1', name: 'au, aw and augh', focus: ['au', 'aw', 'augh'], key: 'August, saw', mark: 'augh|au|aw',
  heart: ['chalk'],
  words: ['saw', 'paw', 'claw', 'draw', 'straw', 'crawl', 'yawn', 'dawn', 'caught', 'hawk', 'haul', 'launch', 'fault', 'taught'],
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
  tip: 'The letters au and aw both say /aw/, as in Paul and saw. Use au at the start or middle of a word (haul, fault) and aw at the end or before n or l (saw, yawn, crawl). In a few words, augh says /aw/ too (caught, taught). Watch for the child reading the a as short a; teach each spelling as one chunk.'
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
    { k: 'yn', q: 'Paula saw a hawk with a fish.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['taking a dock out of a lake', 'a trip to the zoo', 'a lost dog'], a: 0, code: 'C2.6' }
  ]
});
Atlas.decodable.add({
  id: 'ew-ue', band: '1', name: 'ew, ue and ui', focus: ['ew', 'ue', 'ui'], key: 'new, blue, fruit', mark: 'ew|ue|ui',
  heart: ['whose', 'lose'],
  words: ['new', 'few', 'grew', 'chew', 'blew', 'flew', 'drew', 'stew', 'fruit', 'threw', 'blue', 'glue', 'clue', 'suit'],
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
    { k: 'yn', q: 'The crew had stew.', a: true, code: 'C1.1' },
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
  id: 'cle', hunt: 'Underline every word that ends in -le.', band: '1', name: 'Consonant-le', focus: ['-ble', '-tle', '-dle'], key: 'ta-ble', mark: '[bcdfgkptz]le\\b',
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
  id: 'kind-old', band: '1', name: 'Kind and old words', focus: ['ind', 'ild', 'old', 'olt', 'ost'], key: 'kind, wild, cold', mark: 'ind|ild|old|olt|ost',
  heart: ['post', 'ghost'],
  words: ['kind', 'find', 'mind', 'wild', 'child', 'cold', 'gold', 'old', 'told', 'hold', 'fold', 'colt', 'bolt', 'most', 'post'],
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
  tip: 'In ind, ild, old, olt and ost (most, post), the vowel says its long sound even though a consonant follows, as in kind, wild, cold and colt. These words break the usual closed-syllable rule, so learn the chunks. Watch for kind read with a short i (to rhyme with tinned).'
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
    { k: 'yn', q: 'Jack was a bold boy.', a: true, code: 'C3.2' },
    { k: 'write', q: 'What do you do in a storm?', a: 'The child\'s own idea, such as reading, playing a game or sitting with family. Ask them to read it back to you.', code: 'C2.5' }
  ]
});
Atlas.decodable.add({
  id: 'silent', band: '1', name: 'Silent letters kn wr gn mb', focus: ['kn', 'wr', 'gn', 'mb'], key: 'knot, wrap, lamb', mark: '\\bkn|\\bwr|\\bgn|mb\\b',
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
  id: 'prefix', hunt: 'Underline every word that starts with un-, re- or dis-.', band: '1', name: 'Prefixes un-, re- and dis-', focus: ['un-', 're-', 'dis-'], key: 'unpack, redo, dislike', mark: '^(un|re|dis)(?=[a-z]{3})',
  heart: ['another', 'nothing'],
  words: ['unpack', 'unlock', 'unzip', 'unkind', 'unwrap', 'unhappy', 'repack', 'refill', 'retell', 'reread', 'reuse', 'replay', 'rewind', 'reopen', 'dislike', 'distrust'],
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
  tip: 'A prefix is a small part added to the front of a word that changes its meaning: un- means not or the opposite (unwrap, unkind), re- means again (reread, reuse), and dis- means not or the opposite (dislike). In- can also mean not (incorrect). Have the child cover the prefix, read the base word, then add the prefix. Watch for words that only look like they have a prefix, such as uncle and ready.'
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
  id: 'suffix-more', hunt: 'Underline every word that ends in -er, -est, -ful, -less or -ly.', band: '1', name: 'Suffixes -er -est -ful -less -ly', focus: ['-ful', '-less', '-ly'], key: 'helpful', mark: '(er|est|ful|less|ly)\\b',
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
    { k: 'yn', q: 'Jonah was careful.', a: false, code: 'C3.2' }
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
/* step 50x */
Atlas.decodable.add({
  id: 'y-to-i', hunt: 'Underline every word where y changed to i before an ending, like cries.', band: '1', name: 'Change y to i', focus: ['y → i'], key: 'cry, cries', mark: 'i(?=(es|ed|er|est|ly)\\b)',
  heart: [],
  words: ['cries', 'cried', 'tried', 'babies', 'puppies', 'ponies', 'dried', 'spied', 'carried', 'happier', 'happily', 'flies'],
  title: 'The Smallest Puppy',
  text: ['Mila\'s dog, Penny, had six puppies in the barn. The puppies were tiny. They cried for milk and slept in a heap.',
    'Each day, Mila hurried to the barn. She tidied the puppies\' bed and dried them with a soft rag.',
    'One puppy was the smallest. He tried and tried to get to the milk, but the bigger puppies pushed him back. Mila spied him in the hay, all alone and crying.',
    'Mila picked him up and set him next to Penny. Then he drank and drank, and his belly got round and fat.',
    'By the next week, he was bigger and happier. He wagged his tail happily. "You are the funniest puppy," said Mila. She named him Lucky.'],
  pic: ['house', 'dog'],
  qs: [
    { k: 'yn', q: 'Penny had six puppies.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the smallest puppy cry?', opts: ['He did not get milk.', 'He was wet.', 'He was lost in the snow.'], a: 0, code: 'C3.2' },
    { k: 'draw', q: 'Draw Mila with Lucky.', a: 'A girl holding or sitting with a small puppy, maybe in a barn. Ask the child why the puppy was named Lucky.', code: 'C1.4' }
  ],
  tip: 'When a word ends in a consonant and y, the y changes to i before most endings: cry, cries, cried; happy, happier, happily. The y stays before -ing (crying), so the word never gets two i\'s in a row. Have the child cover the ending, change the i back to y, read the base word, then add the ending.'
});
/* step 50x, story 2 */
Atlas.decodable.more('y-to-i', {
  words: ['berries', 'flies', 'sunniest', 'carried', 'cherries', 'tastiest', 'hurried', 'stories', 'happiest', 'tried', 'fries'],
  title: 'Saskatoon Berries',
  text: ['In July, Jin and his grandpa went to pick saskatoon berries. The bushes were full of them.',
    'It was the sunniest day of the summer. Flies buzzed by. Jin carried two pails. Grandpa carried a big pail.',
    'Grandpa picked fast. Jin picked one berry and ate it. He picked the next one and ate it as well. "These are the tastiest berries in the world," he said. His lips were purple.',
    'At the end of the day, Grandpa\'s pail was full. Jin\'s pails had six berries in them. Grandpa laughed and laughed.',
    'At home, Grandpa made a saskatoon pie. Jin hurried to get a slice. He was the happiest kid at the table. "Next time," he said, "I will pick and not eat." Grandpa smiled. "We will see."'],
  pic: ['sun', 'house', 'flower', 'cake'],
  qs: [
    { k: 'yn', q: 'Jin ate the berries he picked.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Jin have six berries at the end?', opts: ['He ate them.', 'He lost his pails.', 'The bushes were bare.'], a: 0, code: 'C3.2' },
    { k: 'write', q: 'What is the tastiest thing you have had?', a: 'The child\'s own idea, such as a fruit, a pie or a snack. Help write one short sentence, such as "Pie is the tastiest."', code: 'C2.5' }
  ]
});
/* step 50x, story 3 */
Atlas.decodable.more('y-to-i', {
  words: ['babies', 'stories', 'families', 'cried', 'worried', 'rainiest', 'funnier', 'tried', 'happily', 'crankier', 'ponies'],
  title: 'The Rainiest Week',
  text: ['The Shaw and Patel families went to a cottage by a lake for a week. There were six kids and two babies.',
    'But it was the rainiest week of the summer. It rained on Monday. It rained on Tuesday. The kids got crankier and crankier. The babies cried. The moms and dads were worried.',
    'Then Grandma Patel had a plan. "Let us tell stories," she said. She began a story about a moose that tried to ride in a canoe. The kids giggled. The babies stopped crying.',
    'Then each kid tried to tell a funnier story than the last. Ava told a story about a beaver with a toque.',
    'By Friday, the sun was back, but the kids did not want to go out. They sat happily by the fire. "One more story!" they said.'],
  pic: ['rain', 'house', 'moose', 'canoe'],
  qs: [
    { k: 'choice', q: 'Why did the babies stop crying?', opts: ['The stories were funny.', 'The sun came out.', 'They had a nap.'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'It was sunny all week.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What is the story mostly about?', opts: ['telling stories on rainy days', 'a moose in a canoe', 'a trip on a plane'], a: 0, code: 'C2.6' }
  ]
});
Atlas.decodable.add({
  id: 'er-spellings', hunt: 'Underline every word where ar, or or our says /er/, as in dollar, doctor and colour.', band: '2', name: 'ar, or and our saying /er/', focus: ['ar', 'or', 'our'], key: 'dollar, doctor, colour', mark: '(ar|our|or)(?=(s|ful)?\\b)',
  heart: [],
  words: ['dollar', 'collar', 'polar', 'cedar', 'doctor', 'actor', 'sailor', 'visitor', 'motor', 'inventor', 'colour', 'harbour', 'flavour', 'humour', 'armour'],
  title: 'A Visitor at the Harbour',
  text: ['Abby lives in a little town by a harbour on the East Coast. Her grandpa was a sailor for fifty years. Now he fixes boats.',
    'One foggy morning, a visitor came in on a little red boat. He tied it to the dock, but he looked upset. "My motor is stuck," he said. "Can you help?"',
    'Grandpa is a bit of an inventor. He looked at the motor. Then he fixed it with a bent nail and a scrap of wire. The motor started up with a roar.',
    'The visitor was so thankful that he gave Abby a dollar and a jar of maple syrup. The syrup was a rich gold colour, and it had a sweet, smoky flavour.',
    '"Come back next summer," said Grandpa. "And bring your motor," said Abby. "Grandpa can fix it again."'],
  pic: ['cloud', 'house', 'ship', 'jar'],
  qs: [
    { k: 'yn', q: 'The visitor\'s motor was stuck.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the visitor give Abby a dollar?', opts: ['He was thankful for the help.', 'He wanted a boat.', 'He was lost.'], a: 0, code: 'C3.2' },
    { k: 'choice', q: 'Which word ends like sailor?', opts: ['visitor', 'storm', 'corn'], a: 0, code: 'C3.1' }
  ],
  tip: 'At the end of a longer word, ar, or and our often say /er/, the same sound as in her: dollar, doctor, colour. Canadian spelling keeps the u in words like colour, harbour and flavour (in the United States these words drop it), so the child will see our in Canadian books and signs. If the child reads doc-TOR with a strong /or/, say the word the way we talk and ask which sound they hear at the end.'
});
/* step 51, story 2 */
Atlas.decodable.more('er-spellings', {
  words: ['actor', 'cellar', 'armour', 'doctor', 'mirror', 'humour', 'colour', 'visitor', 'collar', 'editor', 'favour'],
  title: 'Actors in the Cellar',
  text: ['It was a snowy day in Winnipeg. Omar and Ava wanted to put on a play. They would be the actors, and the cellar would be the stage.',
    'Ava made a suit of armour from a box and foil. She painted it a silver colour. Omar was a doctor with a black bag. He looked in the mirror and drew a big beard on his chin.',
    'Then they asked the family to come down. Mom, Dad and Baba sat on the steps. The play was about a knight who was sick, and the doctor who came to help.',
    'But the knight\'s armour fell off, and the doctor\'s beard was on his nose. The visitors laughed and laughed. "It is not funny!" said Ava. Then she laughed too.',
    '"What a lot of humour," said Baba. "Five stars."'],
  pic: ['snow', 'house', 'star'],
  qs: [
    { k: 'yn', q: 'Omar was the knight in the play.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Which word ends like doctor?', opts: ['mirror', 'door', 'corn'], a: 0, code: 'C3.1' },
    { k: 'choice', q: 'How did Baba feel at the end of the play?', opts: ['She liked it a lot.', 'She was cross.', 'She was sleepy.'], a: 0, code: 'C3.2' }
  ]
});
/* step 51, story 3 */
Atlas.decodable.more('er-spellings', {
  words: ['tractor', 'mirrors', 'motor', 'visitor', 'colour', 'flavour', 'sailor', 'solar', 'dollar', 'labour', 'harbour'],
  title: 'The Tractor and the Fox',
  text: ['It is harvest time in Alberta. Jada\'s family grows wheat, and the wheat is a rich gold colour. This year, Jada can ride in the big tractor with her mom.',
    'The tractor has a cab with a high seat and two big mirrors. The wheat moves like waves, and Jada feels like a sailor at sea.',
    'Then Jada looks in the mirror. Something red is running in the wheat behind them. "Stop!" she yells. Mom stops the motor. A fox and three kits dash out of the wheat and hide in the ditch. "We had a visitor," says Mom. "Good job, Jada."',
    'At sunset, they drive home. Dad has made bread from last year\'s wheat. It has a nutty flavour. "This is the best bread," says Jada. "And we helped the foxes too."'],
  pic: ['sun', 'house', 'truck', 'fox'],
  qs: [
    { k: 'order', items: ['Jada looks in the mirror.', 'Mom stops the motor.', 'The foxes hide in the ditch.'], show: [2, 0, 1], q: 'Number the sentences in order.', code: 'C3.3' },
    { k: 'yn', q: 'Jada saw a moose in the wheat.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What is the story mostly about?', opts: ['a girl who helps a fox family', 'a sailor at sea', 'a lost tractor'], a: 0, code: 'C2.6' }
  ]
});
Atlas.decodable.add({
  id: 'ei-eigh', band: '2', name: 'ei, eigh and ey saying long a', focus: ['eigh', 'ei', 'ey'], key: 'eight, vein, grey', mark: 'eigh|ei|ey',
  heart: [],
  words: ['eight', 'weigh', 'sleigh', 'neigh', 'freight', 'weight', 'neighbour', 'vein', 'rein', 'reindeer', 'veil', 'grey', 'prey', 'they', 'obey'],
  title: 'The Grey Sleigh',
  text: ['Every winter, our neighbour Ray hitches his two horses to his grey sleigh. Then he takes the kids on our street for a ride in the snow.',
    'This year, eight kids came. They piled in with thick blankets on their laps. "Can the horses pull this much weight?" asked Tess. "Hey, they are strong," said Ray. "They could pull a freight train!"',
    'Ray held the reins, and the sleigh slid off. But at the top of a hill, the horses stopped. One horse gave a loud neigh. A deer stood on the trail, as still as a rock.',
    'Ray waited. The deer looked at them, and then it hopped off to the trees. "Off we go," said Ray, and the sleigh bells rang all the way home.'],
  pic: ['snow', 'spruce', 'sled', 'bell', 'house'],
  hunt: 'Underline every word with eigh, ei or ey saying /ay/.',
  qs: [
    { k: 'yn', q: 'Eight kids went on the sleigh ride.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did the horses stop?', opts: ['A deer was on the trail.', 'The sleigh was too heavy.', 'It began to rain.'], a: 0, code: 'C3.2' },
    { k: 'choice', q: 'Which word rhymes with sleigh?', opts: ['sleep', 'weigh', 'slid'], a: 1, code: 'C3.1' }
  ],
  tip: 'Eigh, ei and ey can all say long a, /ay/, as in eight, vein and grey. Eigh is the most common one, and its gh is silent. Watch for the child reading ei or ey as long e, as in key, or sounding the g in eight.'
});
/* step 52, story 2 */
Atlas.decodable.more('ei-eigh', {
  words: ['survey', 'reindeer', 'eighty', 'grey', 'prey', 'eighteen', 'they', 'weigh', 'rein', 'beige', 'hey', 'convey'],
  title: 'The Reindeer Survey',
  text: ['In spring, Ada and her Uncle Jim went out on the land near Inuvik to do a survey of the reindeer. They had to count the herd and check on the little calves.',
    'From the top of a hill, they could see the herd. Some reindeer were brown, and some were grey. "Eighty, eighty-one, eighty-two," Ada said as she counted.',
    'Then Uncle Jim pointed. A big bear was on the ridge. "The calves are its prey," he said. But the herd bunched up with the calves in the middle, and the bear trotted off.',
    'When they were done, Ada had a stiff neck. "Three hundred and eighteen," she said, and Uncle Jim wrote it down.'],
  pic: ['sun', 'hill', 'moose', 'tent'],
  qs: [
    { k: 'yn', q: 'All of the reindeer were grey.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['counting a reindeer herd', 'a trip to the lake', 'a lost bear'], a: 0, code: 'C2.6' },
    { k: 'write', q: 'Why did the herd bunch up?', a: 'To keep the calves safe from the bear, in the middle of the herd.', code: 'C3.2' }
  ]
});
/* step 52, story 3 */
Atlas.decodable.more('ei-eigh', {
  words: ['neighbour', 'weigh', 'beige', 'eight', 'freight', 'weighed', 'eighty', 'eighteen', 'grey', 'they', 'hey', 'weight'],
  title: 'The Big Weigh In',
  text: ['Every fall, the town of Morden has a fair, and the best part is the pumpkin weigh-off. This year, Owen and his neighbour Bev grew a pumpkin as big as a bathtub. It was not orange. It was pale beige with grey spots.',
    'But Bev\'s pumpkin was much too big to lift. Eight people came to help. They slid it on a tarp and lifted it up on Bev\'s truck.',
    'At the fair, a man rolled it on a big freight scale. Owen held his breath as the scale beeped. "Three hundred and eighty kilograms!" said the man. Everyone clapped.',
    'Then the last pumpkin came in. It weighed eighteen kilograms more. Owen was a bit sad, but Bev just grinned. "Hey, there is next year," she said. "And I have kept the seeds."'],
  pic: ['sun', 'truck', 'house'],
  qs: [
    { k: 'choice', q: 'What colour was the pumpkin?', opts: ['orange', 'beige with grey spots', 'green'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'Bev and Owen had the biggest pumpkin at the fair.', a: false, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Eight people lifted the pumpkin.', 'The scale beeped.', 'The last pumpkin came in.'], show: [2, 0, 1], code: 'C3.3' }
  ]
});
Atlas.decodable.add({
  id: 'ou-ough', band: '2', name: 'ou as in soup, ough as in bought', focus: ['ou', 'ough'], key: 'soup, bought', mark: 'ough|ou',
  heart: [],
  words: ['soup', 'group', 'youth', 'coupon', 'caribou', 'toucan', 'bought', 'thought', 'brought', 'fought', 'ought', 'sought'],
  title: 'The Soup Group',
  text: ['On Saturday, the youth group at the hall made soup for a lunch for the neighbours. Kai thought they ought to make corn soup, just like his Kokum makes.',
    'Lena brought a big bag of corn. Kai brought beans. Tam had a coupon, and she bought carrots at the shop.',
    'The group chopped and stirred for an hour. But when Kai tasted the soup, he made a face. "It needs something," he thought.',
    'Just then, Kokum came in. She tasted the soup and added some wild sage. "Now that is good soup," she said. Twenty people came for lunch, and not one bowl was left.'],
  pic: ['house', 'pot', 'cup'],
  hunt: 'Underline every word with ou as in soup or ough as in bought.',
  qs: [
    { k: 'yn', q: 'Tam bought carrots with a coupon.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Who added wild sage to the soup?', opts: ['Lena', 'Kokum', 'Tam'], a: 1, code: 'C1.1' },
    { k: 'write', q: 'What soup do you like? Who makes it?', a: 'The child\'s own answer, such as "I like corn soup. My dad makes it." Ask them to read it back to you.', code: 'C2.5' }
  ],
  tip: 'Ou can say /oo/ as in soup, group and youth, and ough before a t says /aw/ as in bought and thought (the gh is silent). These are less common sounds, so they come only in some words. Watch for the child reading soup to rhyme with out, or sounding the gh in bought.'
});
/* step 53, story 2 */
Atlas.decodable.more('ou-ough', {
  words: ['group', 'toucan', 'caribou', 'thought', 'brought', 'soup', 'bought', 'ought', 'groups', 'youth', 'coupons'],
  title: 'The Toucan at the Zoo',
  text: ['Our class went to the zoo in Toronto in one big group. Miss Hall thought we ought to see the caribou first. They had thick coats and big antlers.',
    'Next, we went in a hot, damp room full of plants. A toucan sat on a branch. Its long bill was orange, green and red. "It looks like it is wearing a funny mask," said Jin.',
    'At lunch, Jin had brought soup in a thermos. I had brought a sandwich. We sat by the caribou to eat.',
    'At the gift shop, Jin bought a little toucan. Then we got back on the bus with the rest of the group.'],
  pic: ['bird', 'moose', 'bus'],
  qs: [
    { k: 'choice', q: 'What did Jin buy at the gift shop?', opts: ['a caribou', 'a toucan', 'a mask'], a: 1, code: 'C1.1' },
    { k: 'yn', q: 'The toucan was in a hot, damp room.', a: true, code: 'C1.1' },
    { k: 'draw', q: 'Draw the toucan on its branch.', a: 'A bird with a long bill in orange, green and red, on a branch.', code: 'C1.4' }
  ]
});
/* step 53, story 3 */
Atlas.decodable.more('ou-ough', {
  words: ['caribou', 'brought', 'soup', 'thought', 'fought', 'group', 'youth', 'ought', 'bought', 'sought', 'thoughts'],
  title: 'Waiting for the Caribou',
  text: ['Every fall, the caribou cross the river near Baker Lake. This year, Lucy\'s grandpa brought her to see them. They brought a tent, a stove and a pot of fish soup.',
    'They waited on the hill for a long time. Lucy thought the caribou ought to be there by now. "They will come," said Grandpa. "My dad sat on this hill with me, the same way."',
    'At last, a small group came over the hill. Then a big one came, and the whole hill was full of caribou. Two big bulls fought with their antlers, and then trotted off.',
    'The caribou swam the river, one after the next. Lucy was still for a long time. Then she thought of her own kids one day, sitting on this hill with her.'],
  pic: ['sun', 'hill', 'moose', 'tent', 'pot'],
  qs: [
    { k: 'yn', q: 'Lucy and Grandpa saw the caribou cross the river.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Who sat on this hill with Grandpa when he was little?', opts: ['his dad', 'his bulls', 'his group'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'What did Lucy think of at the end?', opts: ['a pot of fish soup', 'her own kids one day', 'a trip to the zoo'], a: 1, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'ch-gh', band: '2', name: 'ch as in chef and school, gh as in ghost', focus: ['ch', 'gh'], key: 'chef, school, ghost', mark: 'ch|gh',
  heart: [],
  words: ['chef', 'machine', 'parachute', 'chalet', 'school', 'chorus', 'echo', 'stomach', 'ache', 'anchor', 'mechanic', 'ghost', 'spaghetti'],
  title: 'The Chef at School',
  text: ['Ravi\'s mom is a chef. One Monday, she came to Ravi\'s school to cook spaghetti for the whole school.',
    'She had a machine that makes long strands of pasta. But when she switched it on, it went clunk, and then it stopped. "Oh no," said Mom. "Three hundred kids will have empty stomachs!"',
    'Ravi had a plan. His friend Zack\'s dad is a mechanic, and his shop is next to the school. Ravi and Zack ran to get him. He looked at the machine and tightened one bolt. Whirr! It ran again.',
    'At lunch, the kids ate every bit of the spaghetti. Then the school chorus sang a thank-you song for the chef. It was so loud that it echoed down the hall.'],
  pic: ['house', 'pot', 'clock'],
  hunt: 'Underline every word where ch says /sh/ or /k/, or gh says /g/.',
  qs: [
    { k: 'yn', q: 'Ravi\'s mom is a mechanic.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Who fixed the machine?', opts: ['Zack\'s dad', 'the chorus', 'Ravi'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'Why did the chorus sing for the chef?', opts: ['to thank her for lunch', 'to fix the machine', 'to get more pasta'], a: 0, code: 'C3.2' }
  ],
  tip: 'Ch usually says /ch/ as in chip, but in some words it says /sh/ (chef, machine) or /k/ (school, echo). Gh at the start of a word says /g/ (ghost). If the child reads chef with /ch/, say "good try, now try /sh/", and keep a short list of these words to read again.'
});
/* step 54, story 2 */
Atlas.decodable.more('ch-gh', {
  words: ['chalet', 'ghost', 'ghoul', 'echo', 'school', 'anchor', 'stomach', 'chef', 'ache', 'chute', 'ghosts'],
  title: 'The Ghost at the Chalet',
  text: ['Over the school break, Rosa and her family stayed in a chalet by a lake in Quebec. Dad was the chef, and he cooked big pots of chili.',
    'On the first night, Rosa woke up. "Hoo-hoo-hoo!" Then the sound came back from across the lake: "Hoo-hoo-hoo!" Her stomach did a flip.',
    'Her brother Sami sat up in bed. "It is a ghost," he said. "Or a ghoul!"',
    'In the morning, they ran down to the dock, past the boat and its anchor. An owl sat on a branch in a tall pine. "Hoo-hoo-hoo," it said, and the echo came back from across the lake. "There is your ghost," said Rosa.'],
  pic: ['moon', 'house', 'spruce', 'bird', 'pond'],
  qs: [
    { k: 'yn', q: 'A ghost was in the chalet.', a: false, code: 'C3.2' },
    { k: 'order', q: 'Number the story in order.', items: ['Rosa woke up.', 'Sami said, "It is a ghost."', 'They saw an owl.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'choice', q: 'What made the sound come back from across the lake?', opts: ['an echo', 'a ghoul', 'the anchor'], a: 0, code: 'C1.1' }
  ]
});
/* step 54, story 3 */
Atlas.decodable.more('ch-gh', {
  words: ['orchestra', 'school', 'chord', 'stomach', 'ache', 'character', 'brochure', 'echo', 'chorus', 'scheme', 'chemist', 'anchor'],
  title: 'The First Chord',
  text: ['Lily plays the harp in the school orchestra. On the night of the winter concert, she had a stomach ache. "What if I play the wrong chord?" she said to Mom.',
    'Mom held up the brochure for the concert. It had all the kids\' names in it, and Lily\'s name was at the top. "You play the first chord," said Mom. "The rest of the orchestra will follow you."',
    'Lily thought of Kit, the brave character in her bedtime book. Kit was scared too, but she did it anyway.',
    'On the stage, Lily lifted her hands. The gym was still. Then she played the first chord, deep and strong, and it rang like an echo off the walls. The orchestra came in with her. Her stomach ache was gone.'],
  pic: ['star', 'house', 'drum', 'bell'],
  qs: [
    { k: 'yn', q: 'Lily had a stomach ache before the concert.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['a girl who is brave at a concert', 'a chef who cooks spaghetti', 'a lost harp'], a: 0, code: 'C2.6' },
    { k: 'choice', q: 'Why did Lily think of Kit?', opts: ['Kit was scared but brave.', 'Kit played the harp.', 'Kit had the brochure.'], a: 0, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'tion', band: '2', name: '-tion and -sion', focus: ['tion', 'sion'], key: 'station, mission', mark: 'tion|sion',
  heart: [],
  words: ['station', 'nation', 'lotion', 'motion', 'action', 'fiction', 'vacation', 'question', 'section', 'direction', 'mission', 'session', 'tension', 'vision'],
  title: 'The Train Station',
  text: ['On the first day of summer vacation, Omar and his dad went to the train station. They were going to visit Granny in Winnipeg.',
    'The station was busy. People rushed in all directions. Omar had a question. "Which train is ours?" Dad looked up at the big screen. "It is in the back section," he said. "It is the long train at the end."',
    'Omar sat by the window. The motion of the train made him sleepy. He opened his fiction book about a mission to the moon, but soon his head was on Dad\'s arm.',
    'When he woke up, the train was at the last station, and Granny was waving on the platform. "Here is my sleepy traveller," she said. Omar grinned. This was going to be a good vacation.'],
  pic: ['train', 'house', 'book'],
  qs: [
    { k: 'choice', q: 'Who did Omar and Dad visit?', opts: ['Granny', 'a friend', 'a doctor'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Omar fell asleep on the train.', a: true, code: 'C3.2' },
    { k: 'choice', q: 'Which word ends like station?', opts: ['motion', 'stamp', 'stack'], a: 0, code: 'C3.1' }
  ],
  tip: 'The chunks tion and sion at the end of a word both say /shun/ (station, mission); in a few words, such as vision, sion says /zhun/. Teach the chunk as one unit, then read the word part by part: sta-tion, mis-sion. Watch for the child sounding out every letter (t-i-o-n) instead of saying /shun/.'
});
/* step 55, story 2 */
Atlas.decodable.more('tion', {
  words: ['invention', 'action', 'solution', 'position', 'nation', 'attention', 'collection', 'station', 'mission', 'fraction', 'addition'],
  title: 'The Bird Station',
  text: ['Kai and Lena had a class mission: make an invention that helps nature. "Let us make a feeding station for birds," said Lena.',
    'They cut a hole in a big milk jug and filled it with seeds. Then they hung it from a branch in Kai\'s yard. The next morning, the jug was empty. A fat grey squirrel was sitting in it!',
    '"We need a solution," said Kai. They thought hard. Then Lena had a plan. They hung the jug on a long string from a thin branch, in a new position, far from the trunk.',
    'The squirrel tried and tried, but it did not get to the seeds. Soon, chickadees came to eat. Kai and Lena showed their invention to the class, and it got a lot of attention.'],
  pic: ['bird', 'maple', 'jar'],
  qs: [
    { k: 'order', q: 'Number the sentences in order.', items: ['They filled a jug with seeds.', 'A squirrel sat in the jug.', 'They hung the jug on a string.'], show: [1, 2, 0], code: 'C3.3' },
    { k: 'yn', q: 'The squirrel got the seeds in the end.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What is the story about?', opts: ['an invention for birds', 'a trip to the lake', 'a lost cat'], a: 0, code: 'C2.6' }
  ]
});
/* step 55, story 3 */
Atlas.decodable.more('tion', {
  words: ['celebration', 'motion', 'emotion', 'session', 'lotion', 'permission', 'tension', 'mission', 'television', 'expansion', 'portion'],
  title: 'The Winter Celebration',
  text: ['Tess and her grandpa play the fiddle. This year, they were asked to play at the big winter celebration at the hall in Saskatoon.',
    'Each week, they had a practice session in Grandpa\'s kitchen. Tess learned the tunes, the motions of the bow and when to tap her foot.',
    'On the night of the celebration, the hall was packed. Tess felt the tension in her tummy. "I can not do it," she said. "Do not think about all the people. Just feel the motion of the bow, like in the kitchen."',
    'So Tess shut out the noise and played. The tunes rang out, and people got up to dance. When the last note ended, the whole hall clapped. Tess felt a rush of emotion. "Can we play again next year?" she asked. Grandpa laughed. "You have my permission."'],
  pic: ['snow', 'house', 'star'],
  qs: [
    { k: 'choice', q: 'Where did Tess and Grandpa have a practice session?', opts: ['in the kitchen', 'at the rink', 'at school'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Tess was calm at the start of the show.', a: false, code: 'C3.2' },
    { k: 'choice', q: 'How did Tess feel at the end?', opts: ['happy', 'sad', 'cross'], a: 0, code: 'C3.2' }
  ]
});
Atlas.decodable.add({
  id: 'affix-more', hunt: 'Underline words with mis-, pre-, -ness, -ish or -able.', band: '2', name: 'More prefixes and suffixes', focus: ['mis-', 'pre-', '-ness', '-ish', '-able'], key: 'misplace, preheat, kindness', mark: '^(mis|pre)(?=[a-z]{3})|(ness|ish|able)\\b',
  heart: [],
  words: ['misplace', 'mislead', 'misspell', 'misread', 'preheat', 'pretest', 'prepay', 'kindness', 'sadness', 'darkness', 'greenish', 'childish', 'foolish', 'washable', 'breakable'],
  title: 'The Misplaced Mitts',
  text: ['Jin had new mitts. They were a greenish colour. "Do not misplace them," said Mom. After hockey at the rink, Jin looked for his mitts, but they were not in his pocket! In the darkness, he did not see a thing. Jin felt a wave of sadness. "That was foolish of me," he said.',
    'A girl named Ruby came over. "I have a spare pair," she said. Jin was thankful for her kindness, and he wore them home.',
    'The next day, Jin found his mitts in his hockey bag. He had misplaced them! He washed Ruby\'s mitts, since they were washable, and gave them back with a note.'],
  pic: ['moon', 'snow', 'mitt', 'bag'],
  qs: [
    { k: 'choice', q: 'Where were the mitts in the end?', opts: ['in his bag', 'in the snow', 'at home'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Ruby was kind to Jin.', a: true, code: 'C3.2' },
    { k: 'write', q: 'When was a friend kind to you?', a: 'The child\'s own idea, such as a friend sharing a snack or helping them up. Ask them to read it back to you.', code: 'C2.5' }
  ],
  tip: 'Mis- means wrongly (misplace, misread) and pre- means before (preheat, pretest); -ness makes a word for a feeling or thing (kind, kindness), -ish means a bit or sort of (greenish, childish), and -able means it can be done (washable). Have the child cover the prefix or suffix, read the base word, put it back together and say what the whole word means. Watch for words that only look like they have one, such as fish, dish and table.'
});
/* step 56, story 2 */
Atlas.decodable.more('affix-more', {
  words: ['preheat', 'misread', 'sweetness', 'fixable', 'reddish', 'misspell', 'likeable', 'sadness', 'pretest', 'foolish', 'readable'],
  title: 'Bannock with Kokum',
  text: ['One cold day in Thunder Bay, Kokum was teaching Mason to make bannock. "First, we preheat the stove," she said. "Then we mix the flour and the baking powder."',
    'Mason read the recipe card. He misread one line and put in a cup of sugar, not a spoonful! The mix looked sticky and a bit yellowish.',
    'Kokum laughed. "That is a sweet mistake. But it is fixable. We can make two pans, one sweet and one plain."',
    'The bannock came out puffy and golden brown. Mason\'s dad liked the sweetness so much that he ate three big chunks. "Next time, I will not misread the card," said Mason. "Next time, you can make it sweet on purpose."'],
  pic: ['house', 'pan', 'cup'],
  qs: [
    { k: 'choice', q: 'What did Mason misread?', opts: ['the card', 'a book', 'a map'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Kokum was cross with Mason.', a: false, code: 'C3.2' },
    { k: 'choice', q: 'Which word ends like sweetness?', opts: ['sadness', 'sweeter', 'sweetly'], a: 0, code: 'C3.1' }
  ]
});
/* step 56, story 3 */
Atlas.decodable.more('affix-more', {
  words: ['darkness', 'foolish', 'preheated', 'greenish', 'pinkish', 'softness', 'stillness', 'kindness', 'mislead', 'bendable', 'misplace'],
  title: 'Lights in the Darkness',
  text: ['Ella was at her uncle\'s cabin near Yellowknife. "Tonight we will stay up late to see the northern lights," said Uncle Ben.',
    'At midnight, Ella put on her snow pants, her toque and mitts. Uncle Ben had preheated the truck, so it was warm inside. They drove to a hill far from town. In the darkness, the stars were bright. Ella felt sleepy and a bit grumpy. "This is foolish," she said.',
    'Then the sky began to glow. A greenish light swept across the sky, then a pinkish one. The lights danced. The stillness was so deep that Ella heard her own breath.',
    '"I take it back," she said softly. "It was not foolish at all." Ella will never forget that night.'],
  pic: ['star', 'hill', 'truck'],
  qs: [
    { k: 'choice', q: 'What colour was the first light?', opts: ['greenish', 'pinkish', 'reddish'], a: 0, code: 'C1.1' },
    { k: 'yn', q: 'Ella was glad she went in the end.', a: true, code: 'C3.2' },
    { k: 'yn', q: 'Uncle Ben preheated the truck.', a: true, code: 'C1.1' }
  ]
});
Atlas.decodable.add({
  id: 'schwa', band: '3', name: 'The schwa sound', focus: ['a', 'o', 'e'], key: 'about, sofa, lemon', mark: '^a(?=[a-z]{2})|a(?=,?$)|o(?=n$)',
  heart: [],
  hunt: 'Underline every word with a lazy "uh" sound, as in about and sofa.',
  words: ['about', 'ago', 'alone', 'along', 'around', 'away', 'awake', 'asleep', 'ahead', 'across', 'afraid', 'banana', 'sofa', 'Canada', 'camera'],
  title: 'Across the Lake',
  text: ['It was the end of August in Ontario. Lena and her dad got up before the sun was awake. They packed pasta, bananas and a camera, and they slid the red canoe off the dock.',
    'The lake was as still as glass. They paddled across it, away from the cabin, and a loon swam along beside them. Then, far ahead, Lena spotted something black on a rock. "Dad, is that a bear?" she asked. She felt a little afraid.',
    'Dad held up the camera and zoomed in. Then he began to laugh. "It is a stump," he said. "It is just a big black stump with moss on it."',
    'On the way back, Lena fell asleep on her life jacket. When she woke up, they were at the dock, and Mom was waiting. "Did you see a bear?" Mom asked. Lena grinned. "Just a stump," she said. "But I got a picture of the loon."'],
  pic: ['sun', 'canoe', 'loon', 'rock', 'house'],
  qs: [
    { k: 'yn', q: 'Lena and Dad saw a bear on the rock.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why did Dad laugh?', opts: ['The bear was a stump.', 'Lena fell in the lake.', 'The loon quacked.'], a: 0, code: 'C3.2' },
    { k: 'choice', q: 'What is the story mostly about?', opts: ['a canoe trip with a big mistake', 'a picnic at the cabin', 'how to catch a fish'], a: 0, code: 'C2.6' }
  ],
  tip: 'In a word of two or more syllables, the vowel in the syllable that is not stressed is often lazy and says "uh": the a in about and sofa, the o in lemon. This lazy sound is called the schwa. Teach the child to read the word the regular way first, then, if it does not sound like a real word, to flex the vowel to "uh" (a-bout becomes uh-bout). Watch for words read with a strong short a (ab-out) and left that way.'
});
/* step 57, story 2 */
Atlas.decodable.more('schwa', {
  words: ['zebra', 'panda', 'gorilla', 'koala', 'camera', 'extra', 'away', 'around', 'ago', 'awake', 'alone'],
  title: 'A Day at the Zoo',
  text: ['On Saturday, Jin and his class went on a trip to the zoo in Toronto. Jin had a camera around his neck. He wanted a picture of a red panda.',
    'First, they saw the zebras. Then they went to see the gorillas. A big gorilla sat alone on a log, munching on a stick. A little one was asleep on its back. Next, Jin spotted a koala, but it was asleep in a tree, so he did not get a good shot.',
    'At last, they got to the red pandas. Jin looked and looked, but the pandas were not there. "They hide away when it is hot," said the zookeeper. "Wait a bit."',
    'So Jin waited. After a long time, a red panda came down a branch, wide awake. Jin got his picture. "That was worth the wait," he said.'],
  pic: ['sun', 'bus', 'spruce', 'log'],
  qs: [
    { k: 'write', q: 'What animal would you like to see at the zoo? Why?', a: 'The child\'s own answer, such as "I want to see a gorilla because it is big." Ask them to read it back to you.', code: 'C2.5' },
    { k: 'choice', q: 'Why were the red pandas not there at first?', opts: ['They hide away when it is hot.', 'They went to the vet.', 'Jin was at the wrong zoo.'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'What does "wide awake" tell you?', opts: ['The panda was not sleepy at all.', 'The panda was very big.', 'The panda was sad.'], a: 0, code: 'C3.2' }
  ]
});
/* step 57, story 3 */
Atlas.decodable.more('schwa', {
  words: ['tundra', 'parka', 'Canada', 'Manitoba', 'across', 'ahead', 'afraid', 'about', 'along', 'asleep', 'canoe', 'Alberta'],
  title: 'Bears on the Tundra',
  text: ['Hana lives in Winnipeg, Manitoba. Each fall, she and her aunt take the train north to the town of Churchill. People come from across Canada to see the polar bears there.',
    'This year, Hana had a new red parka, and the wind was so cold that she needed it. They set off across the tundra in a big bus with huge tires. The land was flat and white. Hana held her camera and looked ahead.',
    '"Polar bears can run fast," said the driver. "But you will be safe in this bus. Do not be afraid." Hana was not afraid. She was excited.',
    'For a long time, they saw nothing but snow. Hana was about to give up. Then her aunt pointed. A mother bear and two cubs were walking along the shore. The cubs rolled around and swatted at each other in the snow.',
    'Hana took a picture. That night, she fell asleep and dreamed about the cubs.'],
  pic: ['snow', 'bus', 'bear', 'bear'],
  qs: [
    { k: 'choice', q: 'Why do people come to Churchill from across Canada?', opts: ['to see the polar bears', 'to swim in the lake', 'to visit a zoo'], a: 0, code: 'C2.6' },
    { k: 'yn', q: 'Hana was afraid of the bears.', a: false, code: 'C3.2' },
    { k: 'choice', q: 'What did Hana see along the shore?', opts: ['a mother bear and two cubs', 'a moose and a fox', 'a red panda'], a: 0, code: 'C1.1' }
  ]
});
Atlas.decodable.add({
  id: 'long-words', band: '3', name: 'Long words: three syllables and more', focus: ['syl·la·ble'], key: 'fan·tas·tic', mark: '[aeiouy]+',
  heart: [],
  hunt: 'Underline every word with three or more syllables.',
  words: ['fantastic', 'dinosaur', 'important', 'remember', 'skeleton', 'gigantic', 'animal', 'Atlantic', 'hospital', 'volcano', 'together', 'September', 'wonderful', 'understand'],
  title: 'A Fantastic Find',
  text: ['In September, Omar and his family went on a trip to Alberta. They wanted to see the land of the dinosaurs, in the badlands by the Red Deer River.',
    'In the fossil hall, Omar stood under a gigantic skeleton. "This animal was as long as a bus," said his mom. "I am glad it is not alive," said Omar.',
    'The next day, the family went on a dig with a fossil hunter named Kim. She gave Omar a little brush. "Go slowly," she said. "It is important to be careful."',
    'Omar brushed and brushed. Then he saw something brown in the rock. It was a tiny bone! Kim looked at it with a lens. "This is fantastic," she said. "It is part of a dinosaur tail." Omar will remember that day for the rest of his life.'],
  pic: ['sun', 'hill', 'rock', 'bone'],
  qs: [
    { k: 'yn', q: 'Omar found a tiny bone in the rock.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'Why did Kim tell Omar to go slowly?', opts: ['A bone can break.', 'It was time for lunch.', 'The sun was hot.'], a: 0, code: 'C3.2' },
    { k: 'choice', q: 'Which word has three syllables?', opts: ['skeleton', 'river', 'brush'], a: 0, code: 'C3.1' }
  ],
  tip: 'To read a long word, find the vowels first: each vowel sound makes one syllable. Split the word into syllables (fan-tas-tic), read each one, then blend them into the whole word and check that it makes sense. Watch for the child guessing a word from its first part; cover the word and show one syllable at a time if needed.'
});
/* step 58, story 2 */
Atlas.decodable.more('long-words', {
  words: ['basketball', 'Saturday', 'tournament', 'volunteer', 'excited', 'eleven', 'everybody', 'determined', 'yesterday', 'fantastic', 'unlucky'],
  title: 'The Basketball Tournament',
  text: ['On Saturday, there was a basketball tournament at the community hall in Regina. Priya was excited. Her team had practised every day after school.',
    'In the first game, the team played well and beat the Moose Jaw team. In the second game, Priya missed three shots in a row. "I am so unlucky," she said. Coach Bell, a volunteer, just smiled. "Look at the basket, not at the crowd," he said.',
    'The last game was a close one. With eleven seconds left, the score was tied. The ball came to Priya. Everybody was yelling. She was determined. She looked at the basket, and she let the ball go.',
    'It went in! The tournament was over, and the team was on top. "That was fantastic," said Coach Bell. Priya grinned all the way home.'],
  pic: ['house', 'ball'],
  qs: [
    { k: 'choice', q: 'Who was the coach?', opts: ['Coach Bell', 'Priya', 'Mom'], a: 0, code: 'C1.1' },
    { k: 'order', q: 'Number the story in order.', items: ['Priya missed three shots.', 'The score was tied.', 'The ball went in.'], show: [2, 0, 1], code: 'C3.3' },
    { k: 'choice', q: 'What does "determined" mean in this story?', opts: ['She wanted it a lot and did not give up.', 'She was very sleepy.', 'She was cross with her team.'], a: 0, code: 'C3.2' }
  ]
});
/* step 58, story 3 */
Atlas.decodable.more('long-words', {
  words: ['caterpillar', 'butterfly', 'September', 'October', 'Mexico', 'afternoon', 'interesting', 'carefully', 'magnificent', 'together', 'celebrate', 'remember'],
  title: 'The Caterpillar Project',
  text: ['In September, the class in Room 12 found a little caterpillar on a milkweed plant by the school fence. "It is a monarch caterpillar," said Miss Akiwenzie. "Let us keep it and see what happens."',
    'The class set up a tank with fresh milkweed. Every afternoon, Ben checked on the caterpillar. It ate and ate and got bigger and bigger. Then one day, it hung upside down and made a green case around itself.',
    'For ten days, nothing happened. "Is it alive?" asked Ben. "Yes," said Miss Akiwenzie. "It is changing inside."',
    'At last, the case split open. Out came a magnificent orange and black butterfly. The next afternoon, the class took the tank outside and let the butterfly go. It flapped its wings and went up over the trees. "It will fly all the way to Mexico," said Ben.'],
  pic: ['sun', 'flower', 'house', 'book'],
  qs: [
    { k: 'choice', q: 'Why did Ben ask if the caterpillar was alive?', opts: ['For ten days, nothing happened.', 'It ate all the milkweed.', 'It went up over the trees.'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'The class let the butterfly go.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What is the main idea of the story?', opts: ['A caterpillar can change and grow wings.', 'Ben likes to play basketball.', 'The class goes to Mexico.'], a: 0, code: 'C2.6' }
  ]
});
Atlas.decodable.add({
  id: 'prefix-g3', hunt: 'Underline every word that starts with over-, under-, sub-, mid-, non-, trans- or post-.', band: '3', name: 'Prefixes over-, under-, sub-, mid- and more', focus: ['over-', 'under-', 'sub-', 'mid-'], key: 'overflow, submarine', mark: '^(over|under|sub|mid|non|trans|inter|anti|post)(?=[a-z]{3})',
  heart: [],
  words: ['overflow', 'overcoat', 'overnight', 'overcast', 'underground', 'underline', 'subway', 'submarine', 'midnight', 'midday', 'nonstop', 'transport'],
  title: 'The Subway Trip',
  text: ['On a grey, overcast Saturday, Amir and his grandpa took the subway to the lake. Grandpa had on his long overcoat. Amir held a map of the subway lines.',
    'The train went underground with a rush of wind. "This train is nonstop for the next three stations," said Grandpa. Amir used his finger to underline each stop on the map.',
    'At midday, the train was warm, and Grandpa fell asleep. When he woke up, they had gone two stops too far! "We overshot our stop," said Grandpa with a grin.',
    'They got off, crossed the platform and rode back. When they came up from underground, the sun was out. They sat by the lake and watched the ships. "Next time, I will stay awake," said Grandpa. "And next time, I will keep the map," said Amir.'],
  pic: ['sun', 'train', 'map', 'ship'],
  qs: [
    { k: 'choice', q: 'Why did they go past their stop?', opts: ['Grandpa fell asleep.', 'The map was wrong.', 'The train broke.'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'The train went underground.', a: true, code: 'C1.1' },
    { k: 'choice', q: 'What does overcast tell you about the sky?', opts: ['full of clouds', 'bright and clear', 'dark'], a: 0, code: 'C3.2' }
  ],
  tip: 'A prefix is a word part at the start that changes the meaning: over- means above or too much (overflow, overcoat), under- means below (underground), sub- means under (subway, submarine), mid- means in the middle (midnight), non- means not (nonstop), trans- means across (transport) and post- means after (postpone). Have the child cover the prefix, read the base word, then read the whole word and say what it means. Watch for words that only look like they start with a prefix, such as middle, post and subject: check that the part left over is a real word.'
});
/* step 59, story 2 */
Atlas.decodable.more('prefix-g3', {
  words: ['overhead', 'midnight', 'overjoyed', 'overcast', 'midway', 'nonstop', 'overgrown', 'midsummer', 'overlook', 'underline', 'subzero'],
  title: 'Lights at Midnight',
  text: ['Lena and her family were camping overnight on Uncle Remi\'s farm on the Prairies. Uncle Remi said the northern lights might come out at midnight.',
    'But the sky was overcast. Thick clouds hung overhead, and Lena felt sad. "Do not give up yet," said Mom. "Clouds can move fast out here."',
    'Lena tried hard to stay up. She drank hot cocoa. Midway through the night, a cold wind came up. The clouds slid off to the east, and the stars came out.',
    'Then, at midnight, green and pink lights rippled overhead. They swirled and danced nonstop. Lena was overjoyed. Uncle Remi said that his grandmother taught him to be calm and still under the lights, and not to whistle at them. So Lena sat still in her sleeping bag, watching, until she fell asleep.'],
  pic: ['star', 'moon', 'tent', 'cup'],
  qs: [
    { k: 'yn', q: 'The sky was clear all night.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What made the clouds go away?', opts: ['a cold wind', 'the fire', 'the rain'], a: 0, code: 'C1.1' },
    { k: 'write', q: 'Why did Lena sit still under the lights?', a: 'Uncle Remi\'s grandmother taught him to be calm and still under the lights, so Lena did too.', code: 'C3.2' }
  ]
});
/* step 59, story 3 */
Atlas.decodable.more('prefix-g3', {
  words: ['submarine', 'underwater', 'transport', 'overflow', 'postpone', 'midweek', 'nonstick', 'underpass', 'subtract', 'overtime'],
  title: 'The Submarine Test',
  text: ['Miss Patel\'s Grade 3 class was learning about transport. Each group had to make a model that could move. Kai, Hana and Ben chose a submarine.',
    'They made it from a plastic bottle. Holes in the bottom let water in, so it could sink underwater. A tube let them blow air in to make it float.',
    'On test day, Ben dropped the submarine in a full tub. Water spilled over the edge in an overflow, but the submarine did not sink. "We can postpone your test until midweek," said Miss Patel. Kai had an idea. They taped coins to the bottom of the bottle.',
    'On Wednesday, the submarine sank to the bottom of the tub. Hana blew air in the tube, and it rose up again. Hana underlined the plan in her notebook: test it, fix it, and test it again.'],
  pic: ['coin', 'book'],
  qs: [
    { k: 'yn', q: 'The submarine sank on the first test.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'Why did the group tape coins to the bottle?', opts: ['to make it sink', 'to pay for it', 'to make it float'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'The story shows that it is good to try again.', a: true, code: 'C2.6' }
  ]
});
Atlas.decodable.add({
  id: 'suffix-g3', hunt: 'Underline every describing word that ends in -ic, -al, -ous or -ive.', band: '3', name: 'Suffixes -ic, -al, -ous and -ive', focus: ['-ic', '-al', '-ous', '-ive'], key: 'magnetic, famous', mark: '(ic|al|ous|ive)\\b',
  heart: [],
  words: ['magnetic', 'metallic', 'artistic', 'athletic', 'magical', 'musical', 'national', 'coastal', 'famous', 'joyous', 'nervous', 'poisonous', 'active', 'festive', 'massive'],
  title: 'The Magnetic Rock',
  text: ['On a hike near Sudbury, Tomas found a dark, heavy rock. It had a metallic shine. He put it in his pocket to show his class.',
    'At school, his teacher, Miss Grant, held a paper clip next to the rock. Click! The clip jumped to the rock and stuck. "Your rock is magnetic," she said. "It must have a lot of iron in it." Tomas was amazed. It felt a bit magical.',
    'Miss Grant told the class that Sudbury is famous for its rocks. Long ago, a massive rock from space hit the land there. Now people dig deep mines to get metals like nickel and copper.',
    'The class made a list of things the rock could pick up: pins, nails and a key. It did not pick up coins or a plastic spoon. Tomas was curious. Why not? "That can be our next lesson," said Miss Grant.'],
  pic: ['rock', 'hill', 'book'],
  qs: [
    { k: 'choice', q: 'What did the rock pick up?', opts: ['pins, nails and a key', 'coins and a spoon', 'paper and a book'], a: 0, code: 'C1.1' },
    { k: 'choice', q: 'What does magnetic mean in this story?', opts: ['It can pull things made of iron.', 'It is very heavy.', 'It is shiny.'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'Tomas wanted to find out more about his rock.', a: true, code: 'C2.6' }
  ],
  tip: 'These suffixes turn a word into a describing word: -ic (magnet, magnetic), -al (nation, national), -ous (fame, famous) and -ive (act, active). The ending is said quickly: -ous sounds like "us" and -ive like "iv", not like "five". Have the child cover the suffix, read the base word, then read the whole word; point out that the e drops off before -ous and -ive (fame, famous), and watch for words such as music and metal, which only look like they have one.'
});
/* step 60, story 2 */
Atlas.decodable.more('suffix-g3', {
  words: ['festive', 'nervous', 'joyous', 'musical', 'generous', 'seasonal', 'traditional', 'comical', 'dramatic', 'thunderous', 'attractive'],
  title: 'The Festive Drum',
  text: ['It was Lunar New Year, and Chinatown in Vancouver looked festive. Red lanterns hung over the streets, and the shops were packed with people. The shop owners were generous and handed out sweet buns.',
    'Lin was in a dragon dance group. She did not dance; she played the big drum. Lin felt nervous. What if she lost the beat?',
    'Then the musical parade began. Boom, boom, boom went Lin\'s drum. The long dragon bobbed and swirled to the beat, and its jaw snapped in a comical way. The crowd clapped and cheered. It was a joyous sound.',
    'At the end, Grandma Wu gave Lin a red envelope and a hug. "You did not look nervous at all," she said. Lin grinned. "I was," she said, "but the drum was louder than my nerves."'],
  pic: ['drum', 'house', 'cake'],
  qs: [
    { k: 'yn', q: 'Lin danced in the dragon.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'How did Lin feel at the start?', opts: ['nervous', 'sleepy', 'cross'], a: 0, code: 'C1.1' },
    { k: 'write', q: 'When did you feel nervous? What did you do?', a: 'The child\'s own idea, such as a first day at school or a game. Ask them to read it back to you.', code: 'C2.5' }
  ]
});
/* step 60, story 3 */
Atlas.decodable.more('suffix-g3', {
  words: ['national', 'natural', 'massive', 'protective', 'dangerous', 'enormous', 'historic', 'attentive', 'mountainous', 'scenic', 'active', 'arrival'],
  title: 'Bears on the Trail',
  text: ['Ines and her dad went to Banff National Park in Alberta. The land was mountainous and scenic. Massive peaks rose up to the clouds, and the lakes were blue-green.',
    'One day, they hiked up a trail. Ines was the first to see them: a grizzly bear and two cubs in a patch of berries, far up the hill. The bear was enormous.',
    'A park ranger was on the trail. "Bears are most active in the summer," she said. "A mother bear is very protective of her cubs. It is dangerous to get close." She asked them to back away slowly and stay attentive.',
    'Ines and her dad stepped back, and they watched with binoculars from a long way off. Then the bears went off in the trees. That night, Ines wrote in her trip book: "We saw bears in their natural home, and we kept them safe by keeping our distance."'],
  pic: ['bear', 'hill', 'spruce', 'book'],
  qs: [
    { k: 'choice', q: 'Why did the ranger say to back away?', opts: ['to keep the cubs safe', 'the trail was closed', 'it was going to rain'], a: 0, code: 'C3.2' },
    { k: 'yn', q: 'Ines and her dad went up close to the cubs.', a: false, code: 'C1.1' },
    { k: 'choice', q: 'What is the story mostly about?', opts: ['keeping safe near bears', 'a trip in a car', 'picking berries'], a: 0, code: 'C2.6' }
  ]
});
