/* Grade 5 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  function level(y, w, name, jobs) {
    var x = (284 - w) / 2;
    return '<rect class="a" x="' + x + '" y="' + y + '" width="' + w + '" height="50" rx="6"/><text class="lb" x="142" y="' + (y + 21) + '" text-anchor="middle">' + name + '</text>' +
      '<text class="n" x="142" y="' + (y + 38) + '" text-anchor="middle">' + jobs + '</text>';
  }
  /* a row of boxes joined by arrows, for steps in a process: steps [[line1, line2], ...] */
  function steps(y, list, w) {
    var gap = (300 - list.length * w) / (list.length - 1), out = '';
    list.forEach(function (s, i) {
      var x = i * (w + gap);
      out += '<rect class="k" x="' + x + '" y="' + y + '" width="' + w + '" height="44" rx="5"/>' +
        '<text class="lb" x="' + (x + w / 2) + '" y="' + (y + 19) + '" text-anchor="middle">' + s[0] + '</text>' +
        (s[1] ? '<text class="n" x="' + (x + w / 2) + '" y="' + (y + 34) + '" text-anchor="middle">' + s[1] + '</text>' : '');
      if (i < list.length - 1) out += D.arrow(x + w + 2, y + 22, x + w + gap - 2, y + 22, 'a');
    });
    return out;
  }

  P.add({
    id: 'g5-pothole', subject: 'social', form: 'Explanation',
    title: 'Who Fixes the Pothole?',
    deck: 'How three levels of government share the work of running Canada',
    hero: {
      photo: 'g5-pothole.jpg', credit: 'Photo: Miguel Tremblay, public domain, Wikimedia Commons', focus: '50% 56%',
      tall: 215,
      cap: 'A pothole in a Montréal street, with a glove for size. Whose job is it to fix?'
    },
    body: [
      'Thwump! Amara’s front wheel drops into a hole in the road, and she nearly tumbles over the handlebars. “Somebody should fix that,” she says. But who, exactly, is somebody?',
      { h: 'Three levels, three sets of jobs' },
      'In Canada, the work of running the country is shared. The <b>federal</b> government in Ottawa looks after things that affect the whole country, such as money, the armed forces and passports. Each <b>provincial</b> government, like Ontario’s at Queen’s Park in Toronto, runs schools, hospitals and highways. A <b>municipal</b> government, led by a mayor and council, takes care of a town or city: local roads, water pipes, parks, libraries and garbage pickup.',
      'Many First Nations also have their own governments. A band council or a self-governing nation makes decisions for its community, such as housing, schools and how its lands are cared for.',
      { fig: level(4, 280, 'Federal: all of Canada', 'money · passports · armed forces') + level(66, 244, 'Provincial: Ontario', 'schools · hospitals · highways') +
          level(128, 208, 'Municipal: your town or city', 'local roads · parks · libraries · garbage') +
          D.arrow(292, 160, 292, 30, 't') + '<text class="n" x="296" y="96" transform="rotate(90 296 96)" text-anchor="middle">wider area</text>',
        tall: 184, cap: 'The three levels of government and some of their jobs.' },
      { h: 'Following the pothole' },
      'Amara’s pothole is on a city street, so it is a municipal job. Her dad helps her report it by calling 311, the city’s information line. The report goes to the roads department. A work crew checks the hole, fills it with hot asphalt and presses it flat with a heavy roller. In Amara’s city, the goal is to fix a pothole within a week.',
      { box: 'Did you know?', text: 'Potholes form when water seeps into a crack, freezes and expands, then melts. In Ontario, this freeze and thaw can happen dozens of times in one winter.' },
      { h: 'Why it matters' },
      'Knowing which government does which job helps citizens get things done. If Amara had written to the prime minister, her letter would have been passed along, and the hole might have waited much longer.',
      'Citizens also choose the people who lead each level. Adults vote in federal, provincial and municipal elections, and First Nations hold their own elections. Young people can have a say, too, by writing to a city councillor or speaking at a council meeting.',
      'Two weeks later, Amara rides down the same street. The road is smooth. “Somebody fixed it,” she says, “and I helped.”'
    ],
    guide: { before: 'Ask: who do you think fixes the roads, runs the hospitals and prints our money? Use the diagram to teach <b>federal</b>, <b>provincial</b> and <b>municipal</b>. Find your own town or First Nation, province and country on a map.',
      after: 'What is one thing in your community you would like to change? Which government would you contact, and how would you do it?' },
    words: [['federal', 'for the whole country'], ['provincial', 'for one province, such as Ontario'], ['municipal', 'for one town or city']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'Why does the author begin with Amara’s bike wheel dropping into a hole?',
        opts: ['To hook the reader with a real problem that the text will explain', 'To show that bikes are not safe', 'To describe how potholes form', 'To tell the reader about Amara’s family'], a: 0 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram and the text. Which level of government does each job?', cols: ['Job', 'Level of government'],
        rows: [['Making passports', null], ['Running hospitals', null], ['Running the library', null]], a: [[null, 'Federal'], [null, 'Provincial'], [null, 'Municipal']] },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in fixing Amara’s pothole.',
        items: ['Amara reports it by calling 311.', 'The report goes to the roads department.', 'A crew fills the hole with asphalt.', 'A roller presses the patch flat.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Municipal</b> comes from a Latin word for a town. Which is a municipal job?',
        opts: ['printing money', 'fixing a city street', 'running a hospital', 'making passports'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why would a letter to the prime minister make the pothole wait longer?',
        opts: ['The prime minister does not read letters.', 'City roads are not a federal job, so the letter would be passed along.', 'The prime minister lives in Ottawa.', 'Potholes cannot be fixed in winter.'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Use the “Did you know?” box. Explain how a pothole forms.',
        a: 'Water gets into a crack, freezes and expands, then melts. This happens again and again until the road breaks.', look: 'the cause (water freezing and expanding in a crack) and the effect (the road breaks apart)' },
      { k: 'lines', code: 'C2.6', n: 4, q: 'Summarize the text in two or three sentences. Give the main idea and two important details.',
        a: 'Canada has three levels of government, and each one has its own jobs. City roads are a municipal job, so Amara reported the pothole to her city and a crew fixed it.', look: 'the main idea (three levels share the work) and two details in their own words' }
    ]
  });

  P.add({
    id: 'g5-heart', subject: 'science', form: 'Explanation',
    title: 'The Pump That Never Rests',
    deck: 'How your heart and blood vessels carry oxygen to every part of you',
    hero: {
      photo: 'g5-heart-model.jpg', credit: 'Photo: Alaa Najjar, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 45%',
      tall: 230,
      cap: 'A model of the human heart, the size of a large fist. The thick tubes at the top are the biggest blood vessels in the body.'
    },
    body: [
      'Press two fingers gently against the side of your neck. That steady thump you feel is your heart at work. It beats about 100 000 times a day, and it never takes a day off, not even while you sleep.',
      { h: 'Four rooms and two loops' },
      'Your heart is a muscle about the size of your fist. Inside, it has four hollow spaces called <b>chambers</b>. The two top chambers collect blood, and the two bottom chambers squeeze it out. Small flaps called valves let blood flow only one way. When they snap shut, they make the “lub-dub” sound a doctor hears through a stethoscope.',
      { fig: '<rect class="k" x="104" y="62" width="92" height="56" rx="10"/><path class="t" d="M150 62 V118"/>' +
          '<text class="lb" x="127" y="94" text-anchor="middle">right</text><text class="lb" x="173" y="94" text-anchor="middle">left</text>' +
          '<rect class="d" x="104" y="6" width="92" height="28" rx="14"/><text class="lb" x="150" y="25" text-anchor="middle">lungs</text>' +
          '<rect class="d" x="70" y="146" width="160" height="28" rx="14"/><text class="lb" x="150" y="165" text-anchor="middle">body</text>' +
          D.arrow(118, 62, 118, 36, 'a') + D.arrow(182, 36, 182, 62, 'a') + D.arrow(186, 118, 186, 144, 'a') + D.arrow(114, 144, 114, 120, 'a') +
          '<text class="n" x="10" y="52">to the lungs</text><text class="n" x="210" y="52">back with oxygen</text>' +
          '<text class="n" x="200" y="134">to the body</text><text class="n" x="10" y="134">back to the heart</text>',
        tall: 180, cap: 'Blood travels in two loops: to the lungs and back, then to the body and back.' },
      'The heart sends blood around two loops. The right side pumps blood to the lungs, where it picks up oxygen from the air you breathe. The left side pumps that fresh blood to the rest of your body. Your cells use the oxygen for energy, and then the blood returns to the heart to start again.',
      { h: 'A road map of tubes' },
      'Blood travels through tubes called blood vessels. <b>Arteries</b> carry blood away from the heart, and <b>veins</b> carry it back. The tiniest vessels, thinner than a hair, connect the two. If you could lay all of an adult’s blood vessels end to end, they would wrap around Earth more than twice.',
      { box: 'Try it', text: 'Find your pulse and count the beats for 15 seconds. Multiply by 4 to get beats per minute. Now jog on the spot for one minute and count again. What changed, and why?' },
      { h: 'Working as a team' },
      'The heart cannot do its job alone. It works with the lungs, which add oxygen, and with the digestive system, which adds energy from food. When you exercise, your muscles need more oxygen, so your heart beats faster and you breathe harder. Regular exercise makes the heart muscle stronger, just like any other muscle.'
    ],
    guide: { before: 'Have the child find their pulse first. Teach <b>chamber</b>, <b>artery</b> and <b>vein</b> (a for away). Trace the two loops in the diagram with a finger, saying where the blood goes next.',
      after: 'Which other body systems does the heart depend on? What are two things you could do this week to keep your heart healthy?' },
    words: [['chambers', 'the four hollow spaces inside the heart'], ['arteries', 'tubes that carry blood away from the heart'], ['veins', 'tubes that carry blood back to the heart']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The heart has valves that make a sound.', 'The heart pumps blood in two loops to carry oxygen to the body, working with other systems.', 'Blood vessels are thinner than a hair.', 'Exercise makes you breathe harder.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in the path of the blood, starting at the right side of the heart.',
        items: ['The right side pumps blood to the lungs.', 'Blood picks up oxygen.', 'The left side pumps it to the body.', 'Cells use the oxygen.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.1', half: true, q: '“When <b>they</b> snap shut, they make the ‘lub-dub’ sound.” What does <b>they</b> mean?',
        opts: ['the chambers', 'the valves', 'the doctors', 'the lungs'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram. Where does the blood go next?', cols: ['Blood leaves …', 'It goes to …'],
        rows: [['the right side of the heart', null], ['the lungs', null], ['the left side of the heart', null]], a: [[null, 'the lungs'], [null, 'the left side of the heart'], [null, 'the body']] },
      { k: 'choice', code: 'B2.1', half: true, q: 'A <b>cardio</b>logist is a heart doctor. What does the word part <b>cardio</b> mean?',
        opts: ['blood', 'heart', 'lung', 'doctor'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does your heart beat faster when you run?',
        opts: ['Your muscles need more oxygen.', 'The valves are louder.', 'Your veins get longer.', 'You are scared.'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The two loops can be hard to picture. What did you do, or what could you do, to understand them?',
        a: 'I looked at the diagram and traced the arrows with my finger. I reread the paragraph slowly and pictured the blood going to the lungs, then the body.', look: 'a named strategy (use the diagram, reread, visualize, ask a question) and how it helps' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the section “Working as a team” in one or two sentences.',
        a: 'The heart works with the lungs and digestive system to bring oxygen and energy to the body. Exercise makes it beat faster and grow stronger.', look: 'the main idea of the section and one supporting detail, in their own words' }
    ]
  });

  P.add({
    id: 'g5-wendat', subject: 'history', form: 'Report',
    title: 'Life in a Wendat Village',
    deck: 'How the Wendat Nation farmed, traded and lived together around 1600',
    hero: {
      photo: 'g5-palisade.jpg', credit: 'Photo: Laslovarga, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'A rebuilt wall of upright posts, called a palisade, at the site of a 15th-century village in Ontario. Wendat villages were protected by walls like this one.'
    },
    body: [
      'Four hundred years ago, between Lake Simcoe and Georgian Bay, smoke rose from busy villages. This was Wendake, the homeland of the Wendat Nation. About 20 000 to 30 000 people lived there, in more villages than in any other part of what is now Ontario.',
      { h: 'Behind the palisade' },
      'Many Wendat villages were surrounded by a <b>palisade</b>, a tall wall of wooden posts set close together. Inside stood rows of longhouses made of poles and bark. Each longhouse was home to several related families, who shared fires down the middle. Families belonged to clans, and a family belonged to the clan of its mother. Clan mothers had an important say in decisions.',
      { fig: '<circle class="k" cx="150" cy="80" r="70"/><circle class="t" cx="150" cy="80" r="66"/>' +
          '<rect class="h" x="104" y="44" width="56" height="12" rx="6"/><rect class="h" x="96" y="66" width="62" height="12" rx="6"/><rect class="h" x="110" y="88" width="56" height="12" rx="6"/>' +
          '<rect class="h" x="168" y="52" width="12" height="44" rx="6"/><rect class="h" x="104" y="110" width="50" height="12" rx="6"/>' +
          '<path class="d" d="M8 160 Q60 140 74 110 M228 30 H292 M232 60 H292 M236 90 H292 M232 120 H292"/>' +
          D.label(4, 20, 'palisade', 96, 34) + D.label(188, 140, 'longhouses', 160, 116) + D.label(234, 20, 'fields', 260, 30) + D.label(6, 176, 'path to the river', 40, 152),
        tall: 182, cap: 'A plan of a Wendat village. Corn fields stretched out around the palisade.' },
      { h: 'The Three Sisters' },
      'The Wendat were skilled farmers. Outside the walls, they planted corn, beans and squash together. These crops are called the Three Sisters because they help one another grow. Corn was so plentiful that the Wendat traded it to their Anishinaabe neighbours for furs, fish and copper.',
      { box: 'Did you know?', text: 'The name “Huron” was given to the Wendat by French traders. The people call themselves Wendat, and their descendants include the Huron-Wendat Nation at Wendake, near Québec City.' },
      { h: 'Moving the village' },
      'Every 10 to 20 years, a village moved. By then, the soil in the fields was tired and the nearby firewood was used up. Everyone helped to build a new village a few kilometres away. Men cleared the new fields and cut poles, and women planted the first crops. The old fields could then rest, and the forest slowly grew back.',
      'Wendat <b>traditions</b> are still alive today. People speak and teach the Wendat language, tell the old stories and gather for ceremonies, keeping their culture strong. Many Wendat people also live in cities and towns across Canada and the United States.'
    ],
    guide: { before: 'Find Lake Simcoe and Georgian Bay on a map of Ontario. Teach <b>palisade</b> and <b>clan</b>. Explain that a nation can have its own name for itself that is different from the name outsiders gave it.',
      after: 'Why might it matter to a people that others use the name they call themselves? How does moving the village show care for the land?' },
    words: [['palisade', 'a tall fence of wooden posts around a village'], ['traditions', 'ways of doing things passed down over many years']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Wendat lived in large farming villages, shared longhouses and traded corn, and their culture continues today.', 'Corn, beans and squash grow well together.', 'French traders named the Wendat.', 'Longhouses were made of bark.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart of causes and effects.', cols: ['Cause', 'Effect'],
        rows: [['The soil was tired and firewood was used up.', null], ['The Wendat grew more corn than they needed.', null], [null, 'The village was protected.']],
        a: [[null, 'The village moved to a new place.'], [null, 'They traded corn for furs, fish and copper.'], ['A palisade surrounded the village.', null]] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the plan, where are the fields?',
        opts: ['inside the palisade', 'outside the palisade', 'inside the longhouses', 'in the river'], a: 1 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which detail shows a Wendat cultural value?',
        opts: ['Clan mothers had an important say.', 'The walls were made of posts.', 'The villages were near lakes.', 'Corn is a crop.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>descendant</b> is …',
        opts: ['a person who lived before you', 'a person in a later generation of a family or people', 'a visitor', 'a farmer'], a: 1 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which feature helps you picture how a village was laid out?',
        opts: ['the heading “The Three Sisters”', 'the plan of the village', 'Words to know', 'the title'], a: 1 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Read the “Did you know?” box. Why does the author use the name Wendat instead of Huron?',
        a: 'Wendat is the name the people call themselves. Huron was a name given by French traders, so using Wendat shows respect.', look: 'the idea that Wendat is the people’s own name and that using it shows respect' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'The Wendat moved their village so the land could rest. What is one way people in your community care for the land today?',
        a: 'People in my community plant trees in the park and compost food scraps so the soil stays healthy.', look: 'a real example from their own community linked to caring for the land' }
    ]
  });

  P.add({
    id: 'g5-cn-tower', subject: 'tech', form: 'Explanation',
    title: 'Standing Tall in the Wind',
    deck: 'The forces that push and pull on the CN Tower, and how it stays up',
    hero: {
      photo: 'g5-cn-tower.jpg', credit: 'Photo: Scott Webb, CC0, Wikimedia Commons', focus: '50% 30%',
      tall: 240,
      cap: 'The CN Tower in Toronto is 553 metres tall. For more than 30 years it was the tallest free-standing structure in the world.'
    },
    body: [
      'Ride the glass elevator up the CN Tower on a windy day and you might wonder: how does something so tall and thin stay standing? The answer is in how its builders planned for every <b>force</b> that would act on it.',
      { fig: '<path class="k" d="M150 10 V40 M140 40 L132 168 M160 40 L168 168 M112 168 H188 M136 110 H164"/><ellipse class="k" cx="150" cy="70" rx="22" ry="8"/>' +
          '<path class="a" d="M120 170 L106 174 L194 174 L180 170"/>' +
          D.arrow(36, 70, 102, 70, 'a') + D.arrow(36, 90, 102, 90, 'a') + D.arrow(234, 120, 234, 160, 'k') +
          D.label(10, 58, 'wind pushes') + D.label(222, 116, 'gravity') +
          D.label(4, 150, 'stretched', 135, 128) + '<text class="n" x="4" y="164">(tension)</text>' + D.label(196, 96, 'squeezed', 165, 104) + D.label(200, 22, 'antenna', 152, 22) + D.label(196, 182, 'wide, deep base', 186, 174),
        tall: 186, cap: 'Wind pushes on one side and gravity pulls down. Builders planned for both.' },
      { h: 'Pushes and pulls' },
      'A force is a push or a pull. The biggest force on any structure is gravity, which pulls it toward the ground. The tower is made mostly of concrete, and it weighs about 118 000 tonnes. All of that weight presses down on the lower parts of the tower. This squeezing force is called <b>compression</b>. Concrete is very strong in compression, so it can carry the load.',
      'Wind is another force. When strong wind pushes on one side of the tower, the tower bends very slightly. The side facing the wind is stretched, and the other side is squeezed. A stretching force is called <b>tension</b>. Concrete is weak in tension, so builders placed steel cables inside it. The steel holds the concrete together, just as a belt holds up your pants.',
      { h: 'A strong shape' },
      'The tower has three legs that spread out at the bottom, like a camera tripod. A wide base is harder to tip over than a narrow one. The heavy foundation sits more than 15 metres underground. The tower gets thinner as it rises, so the top is light and catches less wind.',
      { box: 'Did you know?', text: 'Lightning strikes the CN Tower many times each year. Copper strips run down the tower and carry the electricity safely into the ground.' },
      'On the windiest days, the top of the tower sways about a metre. That small movement is planned. A structure that can bend a little is less likely to crack. Engineers say a good structure is not the one that never moves. It is the one that moves just enough and then returns to its place.'
    ],
    guide: { before: 'Push gently on the top of a ruler standing on a table, then on one held in a heavy base. Teach <b>force</b>, <b>compression</b> and <b>tension</b> with a sponge: squeeze it, then stretch it.',
      after: 'If you were designing a tower for a very windy place, what three features would you include? Why?' },
    words: [['force', 'a push or a pull'], ['compression', 'a force that squeezes or presses'], ['tension', 'a force that stretches or pulls apart']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The CN Tower is in Toronto.', 'The CN Tower was designed to handle the forces of gravity and wind.', 'Lightning often strikes tall buildings.', 'Concrete is heavy.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Problem', 'How the builders solved it'],
        rows: [['Concrete is weak in tension.', null], ['A narrow tower tips over easily.', null], ['Lightning strikes the tower.', null]],
        a: [[null, 'They put steel cables inside the concrete.'], [null, 'They gave it three legs that spread out and a deep foundation.'], [null, 'Copper strips carry the electricity into the ground.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which side of the tower is stretched?',
        opts: ['the side facing the wind', 'the side away from the wind', 'the top', 'the base'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: '“Just as a belt holds up your pants.” Why does the author use this comparison?',
        opts: ['To make a hard idea easy to picture', 'To tell a joke about clothes', 'To describe the tower’s colour', 'To give a fact about steel'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Which word in the text means the opposite of <b>compression</b>?',
        opts: ['gravity', 'tension', 'foundation', 'force'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the author say the swaying is “planned”?',
        opts: ['The builders were careless.', 'Bending a little stops the tower from cracking.', 'Visitors enjoy the ride.', 'The wind is never strong.'], a: 1 },
      { k: 'lines', code: 'B3.1', n: 3, q: '“When strong wind pushes on one side of the tower, the tower bends very slightly.” Which part of this sentence could not stand alone? Rewrite the idea as two sentences.',
        a: '“When strong wind pushes on one side of the tower” cannot stand alone. Two sentences: Strong wind pushes on one side of the tower. The tower bends very slightly.', look: 'names the dependent clause (starting with When) and writes two complete sentences' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Before reading, what did you predict about how the tower stays up? Was your prediction right? Use a detail from the text.',
        a: 'I predicted it was held by cables. I was partly right: it has steel cables inside, but its wide legs and deep foundation also keep it up.', look: 'a prediction and a check against a detail in the text' }
    ]
  });

  P.add({
    id: 'g5-rust', subject: 'science', form: 'Explanation',
    title: 'Why Does Metal Rust?',
    deck: 'Physical changes, chemical changes, and the slow work of oxygen and water',
    hero: {
      photo: 'g5-rusty-chain.jpg', credit: 'Photo: W.carter, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'An old iron chain left outside for years. The orange-brown flakes are rust, a new substance that formed on the metal.'
    },
    body: [
      'Leave a shiny steel bike out in the rain all spring, and by summer you may see orange spots on the chain. The bike has started to rust. But what is rust, and why can’t you simply wipe it off and have shiny metal again?',
      { h: 'Two kinds of change' },
      'Scientists sort changes in matter into two groups. In a <b>physical change</b>, a material changes its size, shape or state, but it is still the same substance. When ice melts, it is still water. When you cut paper into strips, it is still paper. Many physical changes can be reversed. You can freeze the water again.',
      'In a <b>chemical change</b>, the particles of a substance join with others to make something completely new. Baking a cake is a chemical change. You cannot turn a cake back into eggs, flour and sugar.',
      { fig: '<text class="lb" x="75" y="16" text-anchor="middle">Physical change</text><text class="lb" x="225" y="16" text-anchor="middle">Chemical change</text><path class="t" d="M150 4 V160"/>' +
          '<rect class="k" x="20" y="34" width="34" height="34" rx="4"/><path class="k" d="M96 64 Q112 52 128 64 Q120 72 112 70 Q100 72 96 64"/>' + D.arrow(60, 52, 90, 52, 'a') +
          '<text class="n" x="37" y="84" text-anchor="middle">ice</text><text class="n" x="112" y="84" text-anchor="middle">water</text>' +
          '<text class="n" x="75" y="112" text-anchor="middle">same substance</text><text class="n" x="75" y="128" text-anchor="middle">can often be reversed</text>' +
          '<path class="k" d="M170 40 H210 M170 36 V44 M172 52 H212"/><path class="h" d="M238 46 H278 V56 H238 Z"/>' + D.arrow(214, 48, 234, 48, 'a') +
          '<text class="n" x="190" y="84" text-anchor="middle">iron</text><text class="n" x="258" y="84" text-anchor="middle">rust</text>' +
          '<text class="n" x="225" y="112" text-anchor="middle">new substance</text><text class="n" x="225" y="128" text-anchor="middle">hard to reverse</text>',
        tall: 140, cap: 'Melting ice is a physical change. Rusting iron is a chemical change.' },
      { h: 'How rust forms' },
      'Iron, the main metal in steel, is a chemical change waiting to happen. When iron touches both <b>oxygen</b> from the air and water, they slowly combine to make a new substance called iron oxide. That is rust. Rust is crumbly and weak, so a rusty chain can snap.',
      'Salt speeds rust up. That is why cars in Ontario, which drive on salted winter roads, often rust around the wheels.',
      { box: 'Signs of a chemical change', text: 'Look for a new colour, bubbles of gas, a new smell, heat or light, or a change that cannot easily be undone.' },
      { h: 'Stopping rust' },
      'People protect iron by keeping air and water away from it. They paint fences and bridges, oil bike chains, or coat steel with a thin layer of zinc, which does not rust as easily. Stainless steel, used for sinks and spoons, has a metal called chromium mixed in. The chromium forms a thin, clear skin that keeps oxygen out, so the steel stays shiny for years. So the next time you ride, wipe your chain dry and give it a drop of oil. A little care stops a slow chemical change before it starts.'
    ],
    guide: { before: 'Show something melting and something cooked or burnt. Ask which one can be changed back. Teach <b>physical change</b> and <b>chemical change</b>, then read the “Signs” box together.',
      after: 'Where have you seen rust at home or in your neighbourhood? What could be done to protect that object?' },
    words: [['physical change', 'a change in size, shape or state; still the same substance'], ['chemical change', 'a change that makes a new substance'], ['oxygen', 'a gas in the air that living things need']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Bikes should be kept indoors.', 'Rust is a chemical change that happens when iron meets oxygen and water, and it can be prevented.', 'Ice melts in spring.', 'Cakes cannot be unbaked.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Sort each change. Write physical or chemical.', cols: ['Change', 'Physical or chemical?'],
        rows: [['Ice melts into water.', null], ['A nail rusts.', null], ['Paper is cut into strips.', null], ['A cake bakes.', null]],
        a: [[null, 'physical'], [null, 'chemical'], [null, 'physical'], [null, 'chemical']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what does the line down the middle do?',
        opts: ['It shows a wire.', 'It separates the two kinds of change.', 'It shows the water level.', 'It is a nail.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do cars in Ontario often rust around the wheels?',
        opts: ['Salt from winter roads speeds up rust.', 'The wheels get hot.', 'They are painted badly.', 'Rain falls only there.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Look for a new colour, bubbles of gas, a new smell, heat or light.” Why are there commas?',
        opts: ['To separate items in a list', 'To show someone speaking', 'To join two sentences', 'To end a question'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Reversed</b> means …',
        opts: ['made bigger', 'changed back', 'painted', 'melted'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why oiling a bike chain stops it from rusting. Use the words cause and effect, or because.',
        a: 'Oil keeps air and water away from the iron. Because the iron cannot touch oxygen and water, rust cannot form.', look: 'the cause (oil blocks air and water) and the effect (no rust)' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about rust or changes in matter before reading? How did it help you understand the text?',
        a: 'I knew that old nails turn orange outside. That helped me picture what the text meant when it said iron mixes with water and air.', look: 'a piece of prior knowledge and how it connected to the text' }
    ]
  });
  P.add({
    id: 'g5-food-labels', subject: 'health', form: 'Procedure',
    title: 'Reading the Label',
    deck: 'How to use the Nutrition Facts table to compare two foods',
    hero: {
      photo: 'g5-cereal-aisle.jpg', credit: 'Photo: Wolfmann, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A supermarket shelf full of cereal boxes. The front of a box is designed to sell. The label on the side tells you what is inside.'
    },
    body: [
      'Two cereal boxes sit side by side. One has a cartoon tiger and the words “Now with whole grains!” The other has a plain photo of a bowl. Which one is the healthier choice? The front of the box will not tell you. For that, you need to turn the box around.',
      { h: 'Step 1: Check the serving size' },
      'Every packaged food in Canada has a <b>Nutrition Facts table</b>. At the top is the serving size, such as 3/4 cup (30 g). All the numbers below are for that amount. If you usually eat twice as much, double the numbers.',
      { fig: '<rect class="k" x="40" y="4" width="220" height="168"/><text class="lb" x="50" y="24">Nutrition Facts</text><text class="n" x="50" y="40">Per 3/4 cup (30 g)</text><path class="k" d="M48 48 H252"/>' +
          '<text class="l" x="50" y="64">Calories 120</text><text class="n" x="250" y="64" text-anchor="end">% Daily Value</text><path class="t" d="M48 72 H252"/>' +
          '<text class="l" x="50" y="88">Fat 1.5 g</text><text class="l" x="250" y="88" text-anchor="end">2 %</text><path class="t" d="M48 96 H252"/>' +
          '<text class="l" x="50" y="112">Fibre 1 g</text><text class="l" x="250" y="112" text-anchor="end">4 %</text><path class="t" d="M48 120 H252"/>' +
          '<text class="l" x="50" y="136">Sugars 12 g</text><text class="l" x="250" y="136" text-anchor="end">12 %</text><path class="t" d="M48 144 H252"/>' +
          '<text class="l" x="50" y="160">Sodium 210 mg</text><text class="l" x="250" y="160" text-anchor="end">9 %</text>' +
          D.label(268, 24, 'serving', 252, 40) + D.label(4, 194, 'a little or a lot?', 236, 112),
        tall: 200, cap: 'Part of the Nutrition Facts table for Cereal A.' },
      { h: 'Step 2: Look at the % Daily Value' },
      'On the right side of the table is the % Daily Value, or % DV. It tells you whether a serving has a little or a lot of a <b>nutrient</b>. Here is a quick rule: 5% or less is a little, and 15% or more is a lot.',
      { box: 'The 5–15 rule', text: '5% DV or less is a little. 15% DV or more is a lot. Look for a lot of fibre and a little sugar and sodium.' },
      { h: 'Step 3: Compare the two foods' },
      'Cereal A, with the tiger, has 12% DV for sugars and only 4% for fibre. Cereal B, with the bowl, has 2% for sugars and 16% for fibre. Even though Cereal A says “whole grains,” Cereal B is the better everyday choice.',
      { h: 'Step 4: Read the ingredients' },
      'Below the table is the list of ingredients. They are listed from most to least by weight. If sugar is one of the first three, the food has a lot of it. Since 2026, many foods that are high in sugar, salt or fat must also show a magnifying glass symbol on the front of the package.',
      'Companies spend a lot of money designing the front of a box. Bright colours, cartoon characters and words such as “natural” or “made with real fruit” are chosen to catch your eye. None of those words has to tell the whole story. The label is a tool. Once you know how to use it, you can make choices for yourself.'
    ],
    guide: { before: 'Bring two real boxes or cans to the table. Find the Nutrition Facts table on each. Teach <b>nutrient</b> and <b>% Daily Value</b>, and practise the 5–15 rule with a few numbers.',
      after: 'Why do you think the front of a box and the label on the side give such different information? Who is each one written for?' },
    words: [['Nutrition Facts table', 'the chart on a package that lists what is in the food'], ['nutrient', 'something in food that the body needs, such as fibre or protein']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This text is a procedure. Which feature shows that?',
        opts: ['It tells a story about a tiger.', 'It has numbered steps that tell you how to do something.', 'It has a poem.', 'It gives the writer’s opinion only.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Use the text to compare the two cereals.', cols: ['', 'Cereal A', 'Cereal B'],
        rows: [['Sugars (% DV)', null, null], ['Fibre (% DV)', null, null]], a: [[null, '12%', '2%'], [null, '4%', '16%']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Look at the label. How much sodium is in one serving?',
        opts: ['1.5 g', '210 mg', '12 g', '120'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Using the 5–15 rule, the fibre in Cereal B (16%) is …',
        opts: ['a little', 'a lot', 'none', 'too much'], a: 1 },
      { k: 'choice', code: 'B3.2', half: true, q: '“<b>Either</b> read the label <b>or</b> guess.” Words like either and or that work as a pair are called …',
        opts: ['correlative conjunctions', 'proper nouns', 'adverbs', 'pronouns'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Which of these is a <b>nutrient</b>?',
        opts: ['a cartoon', 'fibre', 'a box', 'a price'], a: 1 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The front of Cereal A says “Now with whole grains!” Why might this be misleading? Who wrote it, and what do they want?',
        a: 'The company that sells the cereal wrote it to make people buy it. It makes the cereal sound healthy, but it has a lot of sugar and little fibre.', look: 'identifies the seller’s purpose (to sell) and uses label facts to show the bias' },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Name a food you eat often. Explain how you could use what you learned to choose a healthier version of it.',
        a: 'I eat granola bars. I could compare labels and choose the one with less sugar and more fibre, using the 5–15 rule.', look: 'applies the label steps or the 5–15 rule to a real food in their life' }
    ]
  });

  P.add({
    id: 'g5-skating', subject: 'math', form: 'Explanation',
    title: 'Racing by Hundredths',
    deck: 'Why speed skaters are timed to a hundredth of a second, and how to compare their times',
    hero: {
      photo: 'g5-speed-skating.jpg', credit: 'Photo: Suzanne Schroeter, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'Speed skaters on an outdoor oval. In a long track race, two skaters race at a time, each in their own lane.'
    },
    body: [
      'At the end of a 500 m speed skating race, the crowd looks up at the scoreboard. The skaters are so close that no one could tell who won by watching. Only the clock can say, and it measures time in tiny parts of a second.',
      { h: 'Parts of a second' },
      'A time like 38.47 seconds is a <b>decimal</b> number. The digits after the decimal point show parts of a second. The 4 is in the tenths place, so it means 4 tenths of a second. The 7 is in the hundredths place, so it means 7 hundredths. A <b>hundredth</b> of a second is shorter than a blink. In a race, it can be the difference between first and second place.',
      { fig: '<path class="k" d="M16 70 H284"/>' + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { var x = 20 + i * 32.5; return '<path class="k" d="M' + x + ' 62 V78"/><text class="n" x="' + x + '" y="94" text-anchor="middle">38.' + i + '</text>'; }).join('') +
          '<circle class="a" cx="72" cy="70" r="5"/><circle class="a" cx="172.8" cy="70" r="5"/><circle class="a" cx="232.6" cy="70" r="5"/>' +
          '<text class="lb" x="72" y="44" text-anchor="middle">Ella</text><text class="n" x="72" y="30" text-anchor="middle">38.16</text>' +
          '<text class="lb" x="172.8" y="44" text-anchor="middle">Tomas</text><text class="n" x="172.8" y="30" text-anchor="middle">38.47</text>' +
          '<text class="lb" x="232.6" y="44" text-anchor="middle">Kiri</text><text class="n" x="232.6" y="30" text-anchor="middle">38.65</text>' +
          D.arrow(150, 122, 40, 122, 'a') + '<text class="n" x="150" y="138" text-anchor="middle">faster: less time</text>',
        tall: 144, cap: 'Three race times on a number line. The lowest time is the fastest.' },
      { h: 'Comparing times' },
      'Here are the results from a club race in Ontario: Tomas 38.47, Ella 38.16 and Kiri 38.65. To find the winner, compare the digits from left to right. All three start with 38, so look at the tenths. Ella has 1 tenth, Tomas has 4 and Kiri has 6. Ella’s time is the lowest, so she wins. In a race, the smallest number is the best.',
      'How much faster was Ella than Tomas? Subtract: 38.47 − 38.16 = 0.31. Ella won by 31 hundredths of a second.',
      { box: 'Did you know?', text: 'Electronic timing starts with the starter’s gun and stops when a skate blade crosses a beam of light at the finish. It can measure thousandths of a second.' },
      { h: 'Why so exact?' },
      'A long track skater can go faster than 50 km/h. At that speed, one hundredth of a second is about 14 centimetres of ice. Measuring only whole seconds would make many races ties, so decimals keep the results fair.',
      'Decimals are useful off the ice, too. Prices in a store, the length of a long jump and the amount of rain that fell overnight are all measured with decimals. Each time, the digits after the decimal point tell you how many parts of a whole there are. Reading them from left to right, tenths and then hundredths, lets you compare amounts that are very close together.',
      'The next time you watch a race, look at the clock. The difference between a gold medal and fourth place may be smaller than you can see.'
    ],
    guide: { before: 'Review place value with money: $0.47 is 4 dimes and 7 pennies’ worth. Teach <b>decimal</b>, <b>tenths</b> and <b>hundredths</b>. Use a stopwatch to time a few quick tasks.',
      after: 'In which other sports or jobs do exact measurements matter? Why is it important for results to be fair?' },
    words: [['decimal', 'a number with a decimal point that shows parts of a whole'], ['hundredth', 'one part out of 100 equal parts']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Ella is the best skater in Ontario.', 'Race times are measured in decimals so close races can be compared fairly.', 'Speed skaters are fast.', 'Timing uses a beam of light.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the skaters from first place to third place.',
        items: ['Ella, 38.16', 'Tomas, 38.47', 'Kiri, 38.65'], show: [1, 2, 0] },
      { k: 'choice', code: 'C1.4', half: true, q: 'On the number line, why is Ella’s dot farthest to the left?',
        opts: ['She had the lowest time.', 'She skated last.', 'She is the tallest.', 'Her lane was on the left.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the place value chart.', cols: ['Time', 'Tenths digit', 'Hundredths digit'],
        rows: [['38.47', null, null], ['38.65', null, null]], a: [[null, '4', '7'], [null, '6', '5']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'How much faster was Tomas than Kiri?',
        opts: ['0.18 seconds', '0.81 seconds', '1.8 seconds', '0.28 seconds'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>It</b> can measure thousandths of a second.” What does <b>it</b> mean?',
        opts: ['the starter’s gun', 'electronic timing', 'the skate blade', 'the race'], a: 1 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Use the section “Why so exact?” to draw a conclusion. Why would whole seconds not be fair?',
        a: 'Skaters can finish only a few hundredths apart. With whole seconds, many of them would tie, so we would not know who was really fastest.', look: 'a conclusion supported by a detail (speed, centimetres, ties)' },
      { k: 'lines', code: 'C2.2', n: 2, q: 'Why might a person choose to read this text? Give two purposes.',
        a: 'To learn how to compare decimals, and to find out how speed skating races are timed.', look: 'two different, sensible purposes for reading' }
    ]
  });

  P.add({
    id: 'g5-champlain', subject: 'history', form: 'Biography',
    title: 'Samuel de Champlain',
    deck: 'The mapmaker who founded Québec, and the First Nations who made his work possible',
    hero: {
      photo: 'g5-champlain-map.jpg', credit: 'Map: Samuel de Champlain, 1612, public domain, Wikimedia Commons', focus: '45% 45%',
      tall: 220,
      cap: 'Part of Champlain’s map of New France, drawn in 1612. He made it from his own travels and from what First Nations guides told him.'
    },
    body: [
      'In 1603, a French sailor named Samuel de Champlain stood on a ship sailing up the wide St. Lawrence River. He was there to explore, to draw maps and to find places where France could trade for furs. Over the next 30 years, he would cross the ocean more than 20 times.',
      { h: 'Founding Québec' },
      'In 1608, Champlain and his men built a wooden fort, which he called the Habitation, where the river narrows. This place became Québec, the first lasting French settlement in North America. The first winter was terrible. Of the 28 men, only 8 were alive by spring. Many died of <b>scurvy</b>, a disease caused by a lack of fresh food.',
      { fig: '<path class="k" d="M10 40 H290"/>' + [[20, '1603', 'first trip up the St. Lawrence'], [90, '1608', 'founds Québec'], [150, '1609', 'joins allies in battle'], [212, '1615', 'winters in Wendake'], [280, '1635', 'dies at Québec']].map(function (t, i) {
            return '<circle class="a" cx="' + t[0] + '" cy="40" r="5"/><text class="lb" x="' + t[0] + '" y="' + (i % 2 ? 66 : 24) + '" text-anchor="middle">' + t[1] + '</text>' +
              '<text class="n" x="' + (t[0] < 40 ? 4 : t[0] > 260 ? 296 : t[0]) + '" y="' + (i % 2 ? 82 : 98) + '" text-anchor="' + (t[0] < 40 ? 'start' : t[0] > 260 ? 'end' : 'middle') + '">' + t[2] + '</text>';
          }).join('') + '<path class="t" d="M20 46 V86 M150 46 V86 M280 46 V86"/>',
        tall: 104, cap: 'A timeline of Champlain’s life in North America.' },
      { h: 'Allies and guides' },
      'Champlain could not have survived without First Nations <b>allies</b>. The Innu, Algonquin and Wendat traded furs with the French. In return, the French agreed to help them against their enemies, the Haudenosaunee. In 1609, Champlain joined his allies in a battle near the lake that now carries his name. The Haudenosaunee remembered this, and the conflict lasted for many years.',
      'First Nations guides showed Champlain their canoe routes, portages and villages. In 1615, he travelled to Wendake and spent the winter with the Wendat. Much of what he put on his maps, he learned from them.',
      { box: 'Did you know?', text: 'Champlain wrote books about his travels, with drawings and maps. They are some of the oldest written records of this land by a European.' },
      { h: 'Remembering Champlain' },
      'Champlain died in Québec in 1635. He is often called the Father of New France. But history looks different depending on who tells it, and First Nations have their own stories about these years.',
      'For the Innu, Algonquin and Wendat, the French were trading partners who brought metal tools, kettles and cloth. They were also newcomers who brought diseases that later killed many people. For the Haudenosaunee, Champlain was an enemy from the start. Reading many sources, including the knowledge kept by First Nations, gives a fuller picture of the past.'
    ],
    guide: { before: 'Trace the St. Lawrence River from the ocean to Québec on a map. Teach <b>ally</b> and <b>settlement</b>. Explain that a biography tells the true story of a real person’s life.',
      after: 'Who do you think deserves credit for Champlain’s maps? How might a Wendat or Haudenosaunee storyteller tell this story differently?' },
    words: [['allies', 'people or nations who agree to help each other'], ['scurvy', 'an illness caused by not eating enough fresh fruit and vegetables']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This text is a biography. Which feature shows that?',
        opts: ['It tells the true story of a real person’s life in time order.', 'It has talking animals.', 'It gives steps to follow.', 'It is a poem.'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Use the timeline. Number the events in order.',
        items: ['First trip up the St. Lawrence', 'Founds Québec', 'Winters in Wendake', 'Dies at Québec'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'On the timeline, how many years after founding Québec did Champlain die?',
        opts: ['17', '27', '32', '7'], a: 1 },
      { k: 'table', code: 'C3.2', q: 'What did each side gain from the alliance?', cols: ['Group', 'What they gained'],
        rows: [['The French', null], ['The Innu, Algonquin and Wendat', null]],
        a: [[null, 'Furs, guides, routes and knowledge to survive'], [null, 'Trade goods and help against their enemies']] },
      { k: 'choice', code: 'C3.3', half: true, q: 'What caused most deaths in the first winter?',
        opts: ['battles', 'scurvy', 'the cold ocean', 'wild animals'], a: 1 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Samuel de Champlain, a French sailor, stood on a ship.” Why are there commas around “a French sailor”?',
        opts: ['They set off extra words that tell who he was.', 'They separate a list.', 'They show speaking.', 'They end the sentence.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The last sentence says “history looks different depending on who tells it.” Explain what this means, using the battle of 1609.',
        a: 'To the French and their allies, the battle helped their friends. To the Haudenosaunee, Champlain was an enemy who attacked them, and the conflict lasted for years.', look: 'two perspectives on the same event, with evidence from the text' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Write a conclusion about Champlain’s success. Support it with two details.',
        a: 'Champlain succeeded because of First Nations help. Guides showed him canoe routes, and he learned much of his maps from the Wendat.', look: 'a clear conclusion supported by two details from the text' }
    ]
  });

  P.add({
    id: 'g5-two-row', subject: 'social', form: 'Explanation',
    title: 'Two Rows on the River',
    deck: 'The Two Row Wampum, a Haudenosaunee agreement from 1613 that is still renewed today',
    hero: {
      photo: 'g5-two-row.jpg', credit: 'Photo: Gorgenkor, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'Paddlers on the Two Row Wampum Renewal journey in 2013, 400 years after the agreement was first made.'
    },
    body: [
      'In 1613, Haudenosaunee leaders met with Dutch traders who had sailed up a river in what is now New York State. The two peoples needed a way to live and trade side by side. Their agreement was recorded in a belt of shell beads called <b>wampum</b>.',
      { h: 'Reading the belt' },
      'Wampum is not decoration. For the Haudenosaunee, a wampum belt is a record, and people who are trained to read it can tell its meaning. The Two Row Wampum has a white background with two long rows of purple beads running from end to end.',
      { fig: '<rect class="k" x="6" y="30" width="288" height="86" rx="4"/>' +
          '<path class="a" d="M6 56 H294 M6 60 H294 M6 86 H294 M6 90 H294"/>' +
          '<path class="t" d="M6 44 H294 M6 73 H294 M6 103 H294"/>' +
          D.label(4, 18, 'white rows: peace, friendship and respect', 150, 44) +
          D.label(4, 140, 'one purple row: a canoe', 60, 88) + D.label(170, 140, 'one purple row: a ship', 230, 58),
        tall: 146, cap: 'The pattern of the Two Row Wampum belt.' },
      'Each purple row stands for a vessel travelling down the same river. One is a Haudenosaunee canoe, carrying their laws, beliefs and ways of life. The other is a European ship, carrying its own. The white rows between them stand for peace, friendship and respect.',
      { h: 'Side by side' },
      'The message is that the two vessels travel side by side, but neither one tries to steer the other. Each people keeps its own way of life. If someone stood with one foot in the canoe and one in the ship, they would fall into the river when the boats drifted apart.',
      { box: 'Did you know?', text: 'Wampum beads are made from shells. The white beads come from whelk shells, and the purple beads come from the shell of a clam called the quahog.' },
      { h: 'Still paddling' },
      'In 2013, for the 400th anniversary, hundreds of people paddled down the Hudson River for 13 days. Haudenosaunee paddlers travelled in one line, and their non-Indigenous partners travelled in a parallel line beside them. The journey showed that the belt’s <b>promise</b> still matters. Today, the Two Row Wampum is used to talk about how Indigenous nations and Canada can share the land with respect.',
      'A belt like this is meant to be brought out, read aloud and talked about again and again. Each time, the people who hear it are reminded of their responsibilities. In this way, a promise made more than 400 years ago is still alive.'
    ],
    guide: { before: 'Explain that wampum is a Haudenosaunee way of recording agreements and history, read by trained people. Teach <b>wampum</b> and <b>vessel</b>. Look at the diagram together before reading.',
      after: 'What would it look like for two groups to “travel side by side” in your school or community? Why is respect for the other group’s way of life important?' },
    words: [['wampum', 'beads made from shells, used by the Haudenosaunee to record agreements'], ['promise', 'something a person or group agrees to do']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Wampum beads come from shells.', 'The Two Row Wampum records an agreement to live side by side with respect, and it still matters today.', 'People paddled the Hudson River in 2013.', 'The Dutch sailed to New York.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram and text. What does each part of the belt stand for?', cols: ['Part of the belt', 'What it stands for'],
        rows: [['one purple row', null], ['the other purple row', null], ['the white rows', null]],
        a: [[null, 'a Haudenosaunee canoe'], [null, 'a European ship'], [null, 'peace, friendship and respect']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'What does the story of the person with one foot in each boat teach?',
        opts: ['Boats are dangerous.', 'You cannot steer both ways of life at once; each people keeps its own.', 'Rivers are cold.', 'Canoes are faster.'], a: 1 },
      { k: 'choice', code: 'C1.7', half: true, q: 'The belt was made by Haudenosaunee people. How does it communicate its message?',
        opts: ['with written words', 'with the pattern and colours of the beads', 'with a song recording', 'with a map'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The two lines of paddlers were <b>parallel</b>. This means they …',
        opts: ['crossed each other', 'travelled side by side, the same distance apart', 'went in circles', 'raced each other'], a: 1 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which of these is a cultural artifact in the text?',
        opts: ['the Hudson River', 'the wampum belt', 'New York State', 'the year 1613'], a: 1 },
      { k: 'lines', code: 'C3.7', n: 3, q: 'The belt was made in 1613. Why did people paddle the river in 2013? How does the belt connect to life today?',
        a: 'They paddled to renew the promise for its 400th anniversary. Today the belt is used to talk about how Indigenous nations and Canada can share the land with respect.', look: 'links the 1613 agreement to the 2013 journey and to present-day relationships' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of a time two groups you know had to share something. How is it like the message of the Two Row Wampum?',
        a: 'Two classes share the gym. Each class plays its own game on its own side and respects the other, like the canoe and the ship.', look: 'a personal connection that matches the idea of sharing with respect' }
    ]
  });

  P.add({
    id: 'g5-solar', subject: 'science', form: 'Explanation',
    title: 'Power from the Sun',
    deck: 'How solar panels change sunlight into electricity, and what they can and cannot do',
    hero: {
      photo: 'g5-solar-roof.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'Solar panels on the roof of a house. They face the sun for as many hours of the day as possible.'
    },
    body: [
      'Every hour, the sun sends more energy to Earth than all the people on the planet use in a year. For a long time, we could use only a tiny part of it. Today, solar panels on roofs and in fields are catching more of that energy than ever before.',
      { h: 'Light becomes electricity' },
      'A solar panel is made of many small <b>solar cells</b>. Each cell has thin layers of silicon, a material made from sand. When sunlight strikes the silicon, it knocks tiny particles called electrons loose. The moving electrons flow through wires as electricity. This is an energy <b>transformation</b>: light energy becomes electrical energy.',
      { fig: steps(30, [['sun', 'light energy'], ['panel', 'makes electricity'], ['inverter', 'changes the current'], ['home', 'lights, fridge']], 64) +
          '<path class="d" d="M260 74 V110 H190"/><rect class="k" x="120" y="96" width="70" height="32" rx="5"/><text class="lb" x="155" y="116" text-anchor="middle">grid</text>' +
          '<text class="n" x="196" y="140">extra power goes to the grid</text>',
        tall: 146, cap: 'The path of energy from the sun to a home.' },
      'The electricity from the panel flows in one direction, but homes use electricity that switches direction many times a second. A box called an inverter changes it so lights and appliances can use it. Any extra electricity can flow into the power lines, called the grid, for others to use.',
      { h: 'A renewable resource' },
      'Sunlight is a <b>renewable</b> resource. It will not run out, and using it does not pollute the air. Coal, oil and natural gas are non-renewable. They took millions of years to form, and burning them releases gases that warm the planet.',
      { box: 'Did you know?', text: 'Solar panels work better when they are cold. A bright, frosty day in Ontario can be a very good day for solar power, as long as snow is not covering the panels.' },
      { h: 'Limits of the sun' },
      'Solar power has limits. Panels make no electricity at night and less on cloudy days. In Canada, winter days are short. That is why many homes and towns use solar power together with other sources, such as wind and water, and store energy in batteries.',
      'Making panels also uses energy and materials, and old panels must be recycled with care. Still, a panel can make clean electricity for 25 years or more. As panels become cheaper and better, more schools, farms and families in Ontario are putting the sun to work.'
    ],
    guide: { before: 'Ask where the electricity in your home comes from. Teach <b>renewable</b> and <b>transformation</b>. Follow the arrows in the diagram from left to right.',
      after: 'Would solar panels be a good choice for your home or school? What would you need to find out first?' },
    words: [['solar cells', 'the small parts of a panel that turn light into electricity'], ['transformation', 'a change from one form to another'], ['renewable', 'able to be replaced naturally; will not run out']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Silicon comes from sand.', 'Solar panels turn sunlight, a renewable resource, into electricity, but they have limits.', 'Coal is non-renewable.', 'Inverters are boxes.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the path of the energy.',
        items: ['the sun', 'the panel', 'the inverter', 'the home'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>It</b> will not run out.” What does <b>it</b> mean?',
        opts: ['the grid', 'sunlight', 'coal', 'the battery'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Sort the energy sources.', cols: ['Source', 'Renewable or non-renewable?'],
        rows: [['sunlight', null], ['coal', null], ['wind', null], ['natural gas', null]],
        a: [[null, 'renewable'], [null, 'non-renewable'], [null, 'renewable'], [null, 'non-renewable']] },
      { k: 'choice', code: 'B2.1', half: true, q: 'The prefix <b>non-</b> in non-renewable means …',
        opts: ['again', 'not', 'very', 'before'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might a frosty, sunny day be good for solar power?',
        opts: ['Panels work better when cold.', 'Frost makes light.', 'Days are longer in winter.', 'Snow helps panels.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain one limit of solar power and how people solve it.',
        a: 'Panels make no electricity at night. People store energy in batteries or use other sources, such as wind and water.', look: 'a limit from the text and a matching solution' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'The heading “Limits of the sun” comes near the end. What did you predict that section would be about? Were you right?',
        a: 'I predicted it would say that the sun does not shine all the time. I was right: it says panels do not work at night and make less on cloudy days.', look: 'a prediction based on the heading and a check against the text' }
    ]
  });

  P.add({
    id: 'g5-online-kindness', subject: 'health', form: 'Advice column',
    title: 'When Words Hurt Online',
    deck: 'What to do if you, or someone you know, is being bullied on a screen',
    hero: {
      photo: 'g5-tablets.jpg', credit: 'Photo: Intel Free Press, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 210,
      cap: 'Screens connect us to friends, games and schoolwork. They can also be used to hurt people.'
    },
    body: [
      'You open a group chat and see it: a photo of you with a mean caption, and three laughing faces underneath. Your stomach drops. You want to type something back, fast. Stop. Take a breath. You have more power here than you think.',
      { h: 'What it is' },
      '<b>Cyberbullying</b> is using phones, games or the internet to hurt, scare or embarrass someone again and again. It can be mean messages, rumours, leaving someone out of a group on purpose, or sharing a photo without permission. Because a screen can be with you all day, cyberbullying can feel as if there is nowhere to escape.',
      { fig: steps(8, [['Stop', 'don’t reply'], ['Save', 'take a screenshot']], 120) + steps(84, [['Block', 'the sender'], ['Tell', 'a trusted adult']], 120) +
          D.arrow(240, 52, 240, 62, 'a') + '<path class="a" d="M240 62 Q240 72 150 72 Q60 72 60 80"/>',
        tall: 132, cap: 'Four steps if you are being bullied online.' },
      { h: 'If it is happening to you' },
      'First, do not reply. A reply often makes things worse, because the bully wants a reaction. Next, save the proof. Take a screenshot of the messages before they disappear. Then block the person and report them in the app or game. Most important, tell an adult you trust, such as a parent, a teacher or a coach. You do not have to handle this alone.',
      { box: 'Need to talk?', text: 'Kids Help Phone is free and open all day and night. Call 1-800-668-6868 or text CONNECT to 686868.' },
      { h: 'If you see it happening' },
      'Maybe it is not you. Maybe you are the one watching. Someone who sees bullying and does nothing is a <b>bystander</b>. Someone who helps is an <b>upstander</b>. You can be an upstander without being brave in front of everyone. Send the person a kind private message. Refuse to share or “like” the hurtful post. Tell an adult what you saw.',
      'Some people think that what happens online is not real, or that it does not matter as much as what happens face to face. It does. The person reading a mean message feels it just as much as if the words were spoken aloud. Because posts can be shared and saved, the hurt can also last longer.',
      'Words on a screen are still words, and you get to choose yours. Before you post, ask: would I say this to the person’s face? Would I want someone to say it to me? Choose the kind ones.'
    ],
    guide: { before: 'Ask the child what they already know about online safety, without pressing for personal stories. Teach <b>bystander</b> and <b>upstander</b>. Make sure they know which adults they could tell.',
      after: 'Which step do you think is hardest, and why? Role-play sending a kind private message to someone who has been left out.' },
    words: [['cyberbullying', 'bullying with phones, games or the internet'], ['bystander', 'someone who sees bullying and does nothing'], ['upstander', 'someone who sees bullying and helps']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'The writer uses “you” all through the text. This is called second-person point of view. What is one advantage?',
        opts: ['It makes the reader feel spoken to directly, as if the advice is for them.', 'It tells the writer’s own life story.', 'It makes the text a poem.', 'It hides who the bully is.'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the four steps in order.',
        items: ['Stop: do not reply.', 'Save: take a screenshot.', 'Block and report.', 'Tell a trusted adult.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the writer say not to reply?',
        opts: ['Replies cost money.', 'The bully wants a reaction, so a reply can make it worse.', 'Screens break.', 'Adults will be angry.'], a: 1 },
      { k: 'table', code: 'B2.2', q: 'Fill in the chart.', cols: ['Word', 'What the person does'],
        rows: [['bystander', null], ['upstander', null]], a: [[null, 'sees bullying and does nothing'], [null, 'sees bullying and helps']] },
      { k: 'choice', code: 'C1.5', half: true, q: '“Your stomach drops.” Why does the writer begin this way?',
        opts: ['To help the reader feel the moment', 'To talk about food', 'To give a fact', 'To make a joke'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“Stop.” is a complete sentence. What kind?',
        opts: ['a command (imperative)', 'a question', 'a fragment', 'a run-on'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Leaving someone out of a group on purpose is named as cyberbullying. Why does including others matter online and in person?',
        a: 'Being left out on purpose makes people feel alone and hurt. Including others helps everyone feel they belong.', look: 'a reason that connects inclusion to how people feel' },
      { k: 'lines', code: 'D2.4', n: 3, q: 'Write a kind private message an upstander could send to the person in the photo.',
        a: 'Hey, I saw that post and it wasn’t okay. I’m sorry. Do you want to hang out at recess tomorrow?', look: 'a kind, supportive message that fits the situation' }
    ]
  });

  P.add({
    id: 'g5-emily-carr', subject: 'arts', form: 'Art study',
    title: 'Stumps and Sky',
    deck: 'Looking closely at Emily Carr’s painting Odds and Ends',
    hero: {
      photo: 'g5-carr-odds-and-ends.jpg', credit: 'Painting: Emily Carr, 1939, public domain, Wikimedia Commons', focus: '50% 60%',
      tall: 230,
      cap: 'Odds and Ends, painted by Emily Carr in 1939. Oil paint on canvas.'
    },
    body: [
      'At first glance, the painting looks almost empty. A few stumps stand on a hillside. Some thin young trees reach upward. Above them, a huge sky swirls and glows. Why would an artist choose to paint a place where a forest used to be?',
      { h: 'The artist' },
      'Emily Carr was born in Victoria, British Columbia, in 1871. She painted the forests, beaches and skies of the West Coast for most of her life. Her early work was not popular, and for years she ran a boarding house to earn money. Later in life, she met members of the Group of Seven, who admired her work, and her paintings became famous across Canada. She was also a writer, and one of her books won a major Canadian award.',
      { fig: '<rect class="k" x="10" y="6" width="280" height="150"/><path class="t" d="M10 108 Q110 96 290 104"/>' +
          '<path class="k" d="M60 108 V92 H72 V108 M150 104 V86 H164 V104 M226 104 V94 H236 V104"/><path class="k" d="M110 106 V40 M196 104 V52"/>' +
          '<path class="a" d="M30 70 Q90 20 160 40 Q230 60 270 24"/><path class="a" d="M40 40 Q120 4 250 50"/>' +
          D.label(196, 176, 'swirling lines in the sky', 230, 40) + D.label(6, 176, 'stumps: what is gone', 66, 98) + D.label(120, 192, 'young trees: new growth', 112, 70),
        tall: 196, cap: 'A sketch of the painting’s main shapes and lines.' },
      { h: 'Reading the painting' },
      'Look at the bottom of the painting. The cut stumps are short, heavy and still. They show what was lost when the trees were <b>logged</b>. Now look up. The thin young trees are tall and light. They show that the forest is growing back. Carr painted the sky with long, curving brush strokes. These lines make the sky seem alive and moving, as if it is full of energy.',
      { box: 'Look closer', text: 'An artist’s choices of shape, line and colour are called the elements of design. Ask: where does my eye go first? What feeling do the lines give me?' },
      { h: 'A message?' },
      'Carr loved the forests. Some people see this painting as sad, because the old trees are gone. Others see it as hopeful, because new life is reaching for the light. Both <b>interpretations</b> can be supported by what is in the painting.',
      'Carr once wrote that the forest was full of movement and life, even when it looked still. In this painting, she seems to find that life even in a cleared hillside. That is one reason people still stop and look at her work today. A good painting does not tell you what to think. It gives you something to think about.'
    ],
    guide: { before: 'Look at the photo of the painting together for a full minute before reading. Ask: what do you notice? What do you wonder? Teach <b>interpretation</b> and <b>brush stroke</b>.',
      after: 'Is the painting sad or hopeful to you? What in the painting makes you think so? Try a quick sketch of a place near you, using lines to show a feeling.' },
    words: [['logged', 'cut down for wood'], ['interpretations', 'different ways of understanding the meaning of something']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'According to the text, what do the long, curving lines in the sky do?',
        opts: ['They show rain falling.', 'They make the sky seem alive and moving.', 'They show the stumps.', 'They make the painting look empty.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the sketch and the text. What does each part of the painting show?', cols: ['Part of the painting', 'What it shows'],
        rows: [['the stumps', null], ['the young trees', null], ['the swirling sky', null]],
        a: [[null, 'what was lost when the trees were logged'], [null, 'the forest growing back'], [null, 'energy and movement']] },
      { k: 'choice', code: 'C1.3', half: true, q: 'The text has a section called “The artist.” What does it tell you?',
        opts: ['how to paint', 'facts about Emily Carr’s life', 'what the painting is worth', 'how logging works'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>interpretation</b> is …',
        opts: ['a way of understanding the meaning', 'a kind of paint', 'a frame', 'a forest'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> show what was lost.” What does <b>they</b> mean?',
        opts: ['the young trees', 'the stumps', 'the lines', 'the people'], a: 1 },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “Her early work was not popular,” which word is an adjective?',
        opts: ['work', 'was', 'popular', 'not'], a: 2 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Is the painting sad or hopeful? Give your interpretation and support it with evidence from the painting or the text.',
        a: 'I think it is hopeful, because the young trees are tall and reaching for the bright sky, so the forest is coming back.', look: 'a clear interpretation supported by a detail from the painting or text' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'What did you do to understand the painting? Name one thinking skill and how it helped.',
        a: 'I looked at each part separately: first the stumps, then the trees, then the sky. That helped me see that the painting shows both loss and new growth.', look: 'a named skill (look closely, compare parts, ask questions, use evidence) and how it helped' }
    ]
  });
  P.add({
    id: 'g5-red-river-jig', subject: 'story', form: 'Short story',
    title: 'The Fancy Step',
    deck: 'Mireille’s Mushum is teaching her the Red River Jig, one stubborn step at a time',
    hero: {
      photo: 'g5-metis-sash.jpg', credit: 'Photo: Fungus Guy, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A Métis beaded sash (left) and a finger-woven sash, called a ceinture fléchée (right), in a museum in Sault Ste. Marie, Ontario.'
    },
    body: [
      'The <b>fiddle</b> started before I was ready. It always does. Mushum, my grandfather, tapped his boot twice on the kitchen floor, and the bow flew across the strings like a swallow over the bay.',
      '“Now!” he called. My feet tangled. I stopped.',
      '“Again,” said Mushum. He did not sound angry. He never does. He sounds like the waves at Penetanguishene, patient and certain that they will get where they are going.',
      { h: 'Two parts' },
      'The Red River Jig is the most important dance of the Métis people, and it has two parts. In the first part, you do the basic step, quick and light. Then the music changes to a different tune, and you do a fancy step, a step you choose yourself. Then the music switches back. Your feet have to listen, Mushum says, not your head.',
      { fig: '<path class="k" d="M6 60 H294"/>' + [[6, 'basic step'], [76, 'fancy step'], [146, 'basic step'], [216, 'fancy step']].map(function (s, i) {
            return '<rect class="' + (i % 2 ? 'h' : 'k') + '" x="' + (s[0] + 2) + '" y="40" width="66" height="40" rx="5"/><text class="n" x="' + (s[0] + 35) + '" y="100" text-anchor="middle">' + s[1] + '</text>';
          }).join('') + D.arrow(276, 60, 294, 60, 'a') + '<text class="lb" x="6" y="22">The music changes, and so do your feet.</text>' +
          '<text class="n" x="294" y="124" text-anchor="end">and on, until the fiddler stops</text>',
        tall: 130, cap: 'The pattern of the Red River Jig.' },
      'My problem was the fancy step. I kept thinking about it, and while I thought, the music left without me.',
      { h: 'The sash' },
      'On the night of the gathering, the community hall smelled of bannock and woodsmoke. Mushum tied his <b>sash</b> around my waist. It was red and blue, with arrows woven into it, and the fringe hung almost to my knees. “Your great-grandmother wove this,” he said. “Each thread holds another thread. That is how we hold together, too.”',
      { box: 'Did you know?', text: 'The Métis are a distinct Indigenous people whose culture blends First Nations and European roots. The finger-woven sash is a proud symbol of Métis identity.' },
      'The fiddler began. I did the basic step, quick and light. The tune changed, and this time I did not think. My boots clicked, heel and toe, a step I had never practised. People clapped. The music switched back, and my feet found it.',
      'Afterward, Mushum’s eyes were shining. “That fancy step,” he said, “where did you learn it?”',
      'I grinned. “My feet made it up.”',
      'Mushum laughed so hard he had to sit down. Then he picked up his fiddle again. “Good,” he said. “That is how every fancy step began. Now teach it to your little cousin.”'
    ],
    guide: { before: 'Explain that the Métis are one of the three Indigenous peoples recognized in Canada, with their own culture, language (Michif) and music. Teach <b>fiddle</b> and <b>sash</b>. If you can, listen to a recording of the Red River Jig together.',
      after: 'What object or tradition in your family holds a story? Who taught it to you, and how did you learn it?' },
    words: [['fiddle', 'a violin, often used to play dance music'], ['sash', 'a long woven belt tied around the waist']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'This story is told in the first person by Mireille. What is one advantage of this?',
        opts: ['We know what every character is thinking.', 'We hear Mireille’s own thoughts and feelings as she learns.', 'It sounds like a news report.', 'We learn the history of the Métis Nation.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['Mireille stops when her feet tangle.', 'Mushum ties the sash on her.', 'She makes up a fancy step.', 'Mushum asks where she learned it.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['how to tie a sash', 'how the jig switches between basic and fancy steps', 'a map of the hall', 'how a fiddle is made'], a: 1 },
      { k: 'choice', code: 'C3.1', q: '“The bow flew across the strings like a swallow over the bay.” What does this comparison help you imagine?',
        opts: ['The fiddle was broken.', 'Mushum played quickly and smoothly.', 'Birds were in the kitchen.', 'The music was very quiet.'], a: 1 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which is a Métis cultural element in the story?',
        opts: ['the finger-woven sash', 'the kitchen floor', 'the waves', 'a swallow'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Mireille succeed at the end?',
        opts: ['She stopped thinking and let her feet listen.', 'Mushum danced for her.', 'The music was slower.', 'She wore new boots.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Mushum says, “Each thread holds another thread. That is how we hold together, too.” What does he mean?',
        a: 'He means that people in a family and community support each other, just as the threads in the sash are woven together and make it strong.', look: 'explains the comparison between the threads and people supporting each other' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Mireille learns by trying again and again. Describe something you learned the same way.',
        a: 'I learned to ride a bike. I fell many times, but my dad kept saying “again,” and one day I stopped thinking about it and just rode.', look: 'a personal connection to learning through practice, linked to the story' }
    ]
  });

  P.add({
    id: 'g5-new-law', subject: 'social', form: 'Explanation',
    title: 'From Idea to Law',
    deck: 'How a bill becomes a law at Queen’s Park, Ontario’s legislature',
    hero: {
      photo: 'g5-queens-park.jpg', credit: 'Photo: Spudgun67, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'The Ontario Legislative Building at Queen’s Park in Toronto. Ontario’s laws are debated and voted on inside.'
    },
    body: [
      'A group of students in Sudbury noticed that many crosswalks near schools had faded paint. They wrote to their Member of Provincial Parliament, or MPP, with an idea: paint every school crosswalk in Ontario brightly each spring. Could an idea like theirs become a law? It could, but first it would have to go through several steps.',
      { h: 'Who makes Ontario’s laws?' },
      'Ontario is divided into 124 areas called ridings. The people in each riding elect one MPP. The MPPs meet in the <b>legislature</b> at Queen’s Park in Toronto. There, they discuss problems, debate ideas and vote on new laws. The MPPs whose party has the most seats form the government, and their leader becomes the premier.',
      { fig: steps(4, [['1st reading', 'bill shared'], ['2nd reading', 'MPPs debate']], 118) + steps(66, [['committee', 'public can speak'], ['3rd reading', 'final vote']], 118) +
          '<path class="a" d="M236 50 V58 Q236 62 150 62 Q60 62 60 64"/>' +
          '<rect class="a" x="60" y="128" width="180" height="40" rx="6"/><text class="lb" x="150" y="146" text-anchor="middle">Royal Assent</text><text class="n" x="150" y="161" text-anchor="middle">signed by the Lieutenant Governor</text>' +
          D.arrow(236, 110, 236, 126, 'a'),
        tall: 172, cap: 'The steps a bill takes to become a law in Ontario.' },
      { h: 'The steps of a bill' },
      'A proposed law is called a <b>bill</b>. An MPP introduces it in the legislature, which is called first reading. At second reading, MPPs debate whether it is a good idea. Next, a small group of MPPs called a committee studies the bill closely. Members of the public, even students, can ask to speak to the committee. At third reading, all the MPPs vote. If most vote yes, the bill passes.',
      'There is one last step. The Lieutenant Governor, who represents the King in Ontario, signs the bill. This is called Royal Assent, and it turns the bill into a law.',
      { box: 'Did you know?', text: 'Queen’s Park opened in 1893. It is built of pink sandstone, and its main hall, where MPPs debate, is called the chamber.' },
      { h: 'Your voice counts' },
      'Most bills take months, and many never become law. But citizens of any age can share ideas with their MPP. Every law in Ontario began as somebody’s idea. The students in Sudbury are still waiting to hear whether their MPP will introduce a bill. In the meantime, their city council agreed to repaint the crosswalks near their school. Sometimes speaking up gets results in more than one way.'
    ],
    guide: { before: 'Look up your own riding and MPP together on the Legislative Assembly of Ontario website. Teach <b>bill</b>, <b>legislature</b> and <b>debate</b>. Follow the flow chart with a finger.',
      after: 'What law would you like Ontario to have? Who would it help? Draft a short letter to your MPP about it.' },
    words: [['legislature', 'the group of elected people who make a province’s laws'], ['bill', 'a proposed law that has not been passed yet']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Queen’s Park is made of sandstone.', 'In Ontario, a bill goes through several steps before it becomes a law, and citizens can share ideas.', 'Sudbury has faded crosswalks.', 'The premier makes all the laws alone.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the flow chart. Number the steps.',
        items: ['First reading', 'Second reading', 'Committee', 'Third reading', 'Royal Assent'], show: [3, 0, 4, 2, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'At which step could the Sudbury students speak about their idea?',
        opts: ['first reading', 'committee', 'Royal Assent', 'third reading'], a: 1 },
      { k: 'choice', code: 'C1.3', q: 'The text begins with the story of students in Sudbury. How does this help the reader?',
        opts: ['It gives a real example to follow through the steps.', 'It lists all of Ontario’s laws.', 'It explains how crosswalks are painted.', 'It tells the history of Queen’s Park.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “The MPPs debate the bill,” which word is the direct object (what is debated)?',
        opts: ['MPPs', 'debate', 'bill', 'the'], a: 2 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Ontario has 124 ridings. A <b>riding</b> is …',
        opts: ['a horse trail', 'an area whose people elect one MPP', 'a kind of law', 'a city'], a: 1 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize how a bill becomes a law in two or three sentences, in order.',
        a: 'An MPP introduces a bill and MPPs debate it. A committee studies it, then all MPPs vote at third reading. The Lieutenant Governor signs it and it becomes a law.', look: 'the main steps in the right order, in their own words' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Who might want to read this text, and for what purpose?',
        a: 'A student who wants to change something in Ontario could read it to learn how to share an idea with an MPP and how laws are made.', look: 'a likely reader and a matching purpose' }
    ]
  });

  P.add({
    id: 'g5-skeleton', subject: 'science', form: 'Report',
    title: 'The Body’s Frame',
    deck: 'Your skeleton supports you, protects you and helps you move',
    hero: {
      photo: 'g5-skeleton.jpg', credit: 'Photo: Sam Nabi, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 30%',
      tall: 220,
      cap: 'A model of the human skeleton. An adult skeleton has 206 bones.'
    },
    body: [
      'Imagine trying to stand up without any bones. You would flop onto the floor like a jellyfish on a beach. Your skeleton is the frame that holds you up, and it does much more than that.',
      { h: 'Three big jobs' },
      'First, the skeleton gives your body its shape and support. Second, it protects soft organs. Your skull covers your brain like a helmet, and your ribs form a cage around your heart and lungs. Third, it helps you move. Muscles are attached to bones by strong cords called tendons. When a muscle shortens, it pulls on a bone, and the bone moves.',
      'Bones are alive. They are made of living cells, and they grow, heal when they break and store minerals such as <b>calcium</b>. The soft centre of many bones, called marrow, makes new blood cells every day.',
      { fig: '<circle class="k" cx="50" cy="40" r="14"/><path class="k" d="M50 26 V4 M50 54 V100"/><path class="d" d="M30 40 A20 20 0 0 1 70 40"/>' +
          '<path class="k" d="M150 20 V64 M150 64 L188 92"/><path class="k" d="M142 64 A8 8 0 0 0 158 64"/><path class="d" d="M150 84 A20 20 0 0 0 166 76"/>' +
          '<path class="k" d="M250 20 V48 M250 62 V100"/><circle class="k" cx="250" cy="55" r="7"/><path class="d" d="M232 55 A18 8 0 0 0 268 55"/>' +
          '<text class="lb" x="50" y="124" text-anchor="middle">ball and socket</text><text class="n" x="50" y="140" text-anchor="middle">shoulder, hip</text>' +
          '<text class="lb" x="160" y="124" text-anchor="middle">hinge</text><text class="n" x="160" y="140" text-anchor="middle">elbow, knee</text>' +
          '<text class="lb" x="250" y="124" text-anchor="middle">pivot</text><text class="n" x="250" y="140" text-anchor="middle">neck</text>',
        tall: 146, cap: 'Three kinds of joints. The dashed lines show how each one moves.' },
      { h: 'Where bones meet' },
      'The place where two bones meet is called a <b>joint</b>. Different joints move in different ways. Your elbow and knee are hinge joints. Like a door, they bend back and forth in one direction. Your shoulder and hip are ball-and-socket joints. The round end of one bone fits into a cup in another, so your arm can swing in a full circle. A pivot joint in your neck lets you turn your head from side to side.',
      { box: 'Did you know?', text: 'A baby is born with about 300 bones. As the child grows, some of them join together, so an adult has 206. The smallest bone is in the ear and is about the size of a grain of rice.' },
      { h: 'Keeping bones strong' },
      'Bones need calcium and vitamin D, found in foods such as milk, yogurt, canned salmon, tofu and leafy greens. They also need exercise. Running, jumping and dancing put healthy stress on bones, which makes them grow thicker and stronger.',
      'Bones keep building until people are in their twenties, so the habits you form now matter for the rest of your life. Wearing a helmet and pads when you ride or skate also protects your bones from breaks. Your skeleton looks after you every day. It is worth looking after it, too.'
    ],
    guide: { before: 'Have the child bend an elbow, swing an arm in a circle and turn their head. Ask how each move is different. Teach <b>joint</b>, <b>tendon</b> and <b>calcium</b>.',
      after: 'How does the skeleton work with the muscles and with the circulatory system? Plan one day of meals and activity that would help build strong bones.' },
    words: [['calcium', 'a mineral that makes bones and teeth hard'], ['joint', 'a place where two bones meet']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Babies have 300 bones.', 'The skeleton supports, protects and moves the body, and it needs care to stay strong.', 'Milk has calcium.', 'Elbows are hinge joints.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram. Name the kind of joint.', cols: ['Body part', 'Kind of joint'],
        rows: [['knee', null], ['hip', null], ['neck', null]], a: [[null, 'hinge'], [null, 'ball and socket'], [null, 'pivot']] },
      { k: 'choice', code: 'C3.1', half: true, q: '“Like a jellyfish on a beach.” What does this image help you picture?',
        opts: ['a body with no support', 'a trip to the beach', 'a strong swimmer', 'a sunny day'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is a skull compared to a helmet?',
        opts: ['It is hard and protects the brain.', 'It is round.', 'You wear it on a bike.', 'It comes off.'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> also need exercise.” What does <b>they</b> mean?',
        opts: ['muscles', 'bones', 'foods', 'babies'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Muscles attach to bones with <b>tendons</b>. A tendon is …',
        opts: ['a strong cord', 'a kind of joint', 'a mineral', 'a blood cell'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how a muscle makes a bone move. Use the words muscle, tendon and bone.',
        a: 'A muscle is attached to a bone by a tendon. When the muscle shortens, it pulls on the tendon, and the bone moves.', look: 'the sequence muscle shortens, pulls tendon, bone moves' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Did picturing your own body help you understand this text? Explain what you pictured and how it helped.',
        a: 'I pictured bending my elbow like a door. It helped me understand what a hinge joint is and why it only moves one way.', look: 'describes a visualizing strategy and how it helped understanding' }
    ]
  });

  P.add({
    id: 'g5-confederation-bridge', subject: 'tech', form: 'Report',
    title: 'A Bridge Built for Ice',
    deck: 'How the Confederation Bridge stands up to wind, waves and moving ice',
    hero: {
      photo: 'g5-confederation-pier.jpg', credit: 'Photo: Wladyslaw, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 60%',
      tall: 220,
      cap: 'A pier of the Confederation Bridge. The wide cone at the waterline is an ice shield.'
    },
    body: [
      'For more than a hundred years, the only way to drive a car to Prince Edward Island was to wait for a ferry. In winter, the ferries pushed through thick ice in the Northumberland Strait, and crossings could be slow. In 1997, that changed. The Confederation Bridge opened, linking the island to New Brunswick.',
      { h: 'A record bridge' },
      'The bridge is 12.9 kilometres long. It is the longest bridge in the world over water that freezes. Driving across takes about 12 minutes. Near the middle, the road rises 60 metres above the water so that tall ships can pass underneath.',
      'Building it was a huge job. Workers made the giant concrete pieces on land, then a floating crane lifted each one into place. Some pieces weighed as much as 8000 tonnes, more than 50 blue whales.',
      { fig: '<path class="k" d="M110 10 H190 M128 10 V96 M172 10 V96"/>' + D.ripple(6, 300, 112) +
          '<path class="a" d="M128 96 L96 128 H204 L172 96"/><path class="h" d="M30 106 L70 100 L96 118 L60 126 Z"/>' +
          D.arrow(10, 140, 60, 140, 'k') + D.arrow(70, 112, 98, 100, 'a') +
          D.label(198, 30, 'pier', 172, 40) + D.label(214, 146, 'ice shield (cone)', 190, 118) + D.label(4, 92, 'ice sheet', 46, 104) +
          '<text class="n" x="66" y="154">moving ice rides up the cone and snaps</text>',
        tall: 160, cap: 'The cone pushes the ice up so it bends and breaks.' },
      { h: 'Beating the ice' },
      'Every spring, huge sheets of sea ice drift through the strait, pushed by wind and <b>currents</b>. Ice pushing on a straight pier would act like a battering ram. To solve this problem, <b>engineers</b> gave each <b>pier</b> a cone-shaped ice shield at the waterline. When the moving ice hits the cone, it slides up the slope, bends and snaps into pieces. Ice is much weaker when it bends than when it is squeezed, so the bridge takes less force.',
      { box: 'Did you know?', text: 'The bridge was designed to last 100 years. Sensors on the bridge measure ice, wind and movement so engineers can check its health.' },
      { h: 'Not everyone agreed' },
      'Before it was built, Islanders voted on the idea. Some were excited to drive to the mainland at any time. Others worried that ferry workers would lose their jobs and that the quiet island life would change. In the end, more than half voted yes. The bridge is now part of everyday life, but people still debate its effects. Trucks carry potatoes and seafood off the island in a few minutes, and more tourists visit each summer. Some Islanders say the island has become busier and less quiet. Both things can be true at once.'
    ],
    guide: { before: 'Find Prince Edward Island, New Brunswick and the Northumberland Strait on a map. Snap a thin ice sheet or a cracker by bending it, then try squeezing one. Teach <b>pier</b> and <b>engineer</b>.',
      after: 'Was the bridge a good idea? Look at it from the point of view of a ferry worker and of a farmer shipping potatoes.' },
    words: [['pier', 'a tall post that holds up a bridge'], ['currents', 'steady flows of water in one direction'], ['engineers', 'people who design and build structures and machines']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Confederation Bridge is long, was hard to build and was designed to beat the ice, though people disagreed about it.', 'Ferries crossed to Prince Edward Island.', 'Ice is weak when it bends.', 'Blue whales are heavy.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart of causes and effects.', cols: ['Cause', 'Effect'],
        rows: [['Tall ships need to pass.', null], ['Moving ice hits the cone.', null], [null, 'Ferry workers might lose their jobs.']],
        a: [[null, 'The road rises 60 metres in the middle.'], [null, 'It slides up, bends and snaps.'], ['The bridge replaces the ferries.', null]] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is the ice shield?',
        opts: ['at the top of the pier', 'at the waterline', 'on the road', 'under the sea floor'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the engineers make the ice bend instead of pushing straight?',
        opts: ['Ice is weaker when it bends.', 'Bending ice is quieter.', 'Cones are cheaper.', 'It looks nicer.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: '“Would act like a battering ram.” This comparison shows that the ice …',
        opts: ['hits with great force', 'is very cold', 'moves slowly', 'is thin'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“Some were excited, but others worried.” What kind of sentence is this?',
        opts: ['compound', 'a fragment', 'a run-on', 'a question'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Describe two different points of view about the bridge. Use details from the text.',
        a: 'Some Islanders were excited because they could drive to the mainland at any time. Others worried that ferry workers would lose jobs and island life would change.', look: 'two clear points of view, each with a detail from the text' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion can you draw about how engineers solve problems? Use the ice shield as evidence.',
        a: 'Engineers study how nature behaves and use it. They knew ice breaks easily when it bends, so they shaped the piers to make it bend.', look: 'a conclusion supported by the ice-shield example' }
    ]
  });

  P.add({
    id: 'g5-savings-goal', subject: 'math', form: 'Explanation',
    title: 'Saving for Something Big',
    deck: 'How Noor made a budget and reached her goal',
    hero: {
      photo: 'g5-savings-jar.jpg', credit: 'Photo: stevepb, CC0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'A jar of coins. Saving a little at a time adds up.'
    },
    body: [
      'Noor wanted a pair of hockey skates that cost $96. She earned $12 a week for walking her neighbour’s dog after school. “I’ll have them in eight weeks!” she said. Her aunt smiled. “Only if you don’t spend a cent of it. Let’s make a <b>budget</b>.”',
      { h: 'Needs and wants' },
      'A budget is a plan for your money. It shows how much money comes in, called <b>income</b>, and how you will use it. First, Noor and her aunt sorted her spending. A need is something you must have, such as a bus pass to get to practice. A want is something nice but not necessary, such as a snack after school. Noor’s family paid for her needs, so her money was for wants and saving.',
      { fig: '<text class="lb" x="6" y="18">Noor’s weekly budget: $12</text>' +
          '<rect class="k" x="6" y="30" width="288" height="34" rx="4"/><path class="k" d="M198 30 V64 M246 30 V64"/>' +
          '<text class="lb" x="102" y="52" text-anchor="middle">save $8</text><text class="lb" x="222" y="52" text-anchor="middle">$2</text><text class="lb" x="270" y="52" text-anchor="middle">$2</text>' +
          '<text class="n" x="102" y="82" text-anchor="middle">skates jar</text><text class="n" x="222" y="82" text-anchor="middle">spend</text><text class="n" x="270" y="82" text-anchor="middle">share</text>' +
          '<path class="k" d="M6 150 H294 M6 150 V96"/>' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (w) { var h = w * 4; return '<rect class="a" x="' + (w * 23 - 8) + '" y="' + (150 - h) + '" width="14" height="' + h + '"/>'; }).join('') +
          '<path class="d" d="M6 102 H294"/><text class="n" x="292" y="98" text-anchor="end">$96 goal</text><text class="n" x="150" y="166" text-anchor="middle">weeks 1 to 12</text>',
        tall: 172, cap: 'Top: how Noor splits $12 each week. Bottom: her savings growing each week.' },
      { h: 'The plan' },
      'Noor decided to split her $12 three ways each week: $8 into a skates jar, $2 to spend and $2 to share with the food bank. Now, how long would it take? She divided $96 by $8 and got 12 weeks. That was four weeks longer than she first thought, but it was a plan she could keep.',
      { box: 'Did you know?', text: 'Canada stopped making pennies in 2013. When you pay with cash, the total is rounded to the nearest 5 cents. When you pay by card, it is not.' },
      { h: 'Trade-offs' },
      'In week 5, Noor’s friends went to the movies. A ticket and popcorn would cost $14. Going meant almost two weeks of saving would disappear. Choosing one thing means giving up another, and that is called a <b>trade-off</b>. Noor stayed home and watched a movie with her cousins instead.',
      'In week 9, Noor’s grandmother gave her $10 for her birthday. Noor put it straight into the jar, so she would have some money left over at the end. Unexpected money can help a budget, but it is risky to count on it.',
      'At the end of week 12, Noor counted her jar: $106. She bought the skates and still had $10 left over to start saving for a helmet. She laced up her new skates and glided onto the ice.'
    ],
    guide: { before: 'Talk about one thing the child would like to save for. Teach <b>budget</b>, <b>income</b> and <b>trade-off</b>. Read the bar graph together and find week 12.',
      after: 'Make a simple budget for an imaginary $10 a week. What would you save for, and how many weeks would it take?' },
    words: [['budget', 'a plan for how to use money'], ['income', 'money that comes in'], ['trade-off', 'giving up one thing to get another']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Hockey skates are expensive.', 'Noor used a budget and made trade-offs to save for her skates.', 'Canada has no pennies.', 'Movies cost $14.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram. How does Noor split her $12 each week?', cols: ['Jar', 'Amount'],
        rows: [['save', null], ['spend', null], ['share', null]], a: [[null, '$8'], [null, '$2'], [null, '$2']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why was Noor wrong when she said, “I’ll have them in eight weeks”?',
        opts: ['She did not plan to spend or share any money.', 'She can’t divide.', 'The skates cost more.', 'She lost her job.'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'How much would Noor save in 6 weeks?',
        opts: ['$48', '$72', '$36', '$60'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Which is a <b>need</b> for Noor?',
        opts: ['a movie ticket', 'a bus pass to practice', 'popcorn', 'a poster'], a: 1 },
      { k: 'choice', code: 'B3.3', half: true, q: '“She split it three ways: save, spend and share.” What does the colon do?',
        opts: ['It introduces a list.', 'It ends the sentence.', 'It shows someone speaking.', 'It joins two names.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Describe the trade-off Noor made in week 5. Was it a good choice? Explain.',
        a: 'She gave up a movie with friends to keep saving. It was a good choice because the movie would have cost almost two weeks of savings.', look: 'names what she gave up and what she gained, with a reason' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Have you ever saved up for something? Compare what you did with what Noor did.',
        a: 'I saved birthday money for a book. Like Noor, I had a goal, but I did not make a plan, so it took longer.', look: 'a personal connection with a clear comparison to Noor' }
    ]
  });

  P.add({
    id: 'g5-dragon-boats', subject: 'social', form: 'Report',
    title: 'Paddling Together',
    deck: 'An ancient Chinese tradition becomes a Canadian summer festival',
    hero: {
      photo: 'g5-dragon-boat.jpg', credit: 'Photo: John Vetterli, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Racers at the Toronto International Dragon Boat Race Festival on Toronto Island.'
    },
    body: [
      'Boom, boom, boom. The drum beats like a heart, and twenty paddles hit the water at once. The long, narrow boat shoots forward, a carved dragon’s head at its bow. This is dragon boat racing, a sport that is more than 2000 years old.',
      { h: 'An ancient story' },
      'Dragon boat racing began in southern China. It is linked to the story of Qu Yuan, a poet who loved his country. When he was sent away by the king, he was so heartbroken that he walked into a river. The people raced out in their boats to save him. They beat drums and splashed their paddles to scare away fish. Today, the Dragon Boat Festival is held in early summer, and families eat zongzi, sticky rice wrapped in leaves, to <b>honour</b> him.',
      { fig: '<path class="k" d="M30 40 Q20 60 30 80 L270 80 Q290 60 270 40 Z"/><path class="t" d="M50 60 H250"/>' +
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { var x = 60 + i * 20; return '<circle class="a" cx="' + x + '" cy="50" r="4"/><circle class="a" cx="' + x + '" cy="70" r="4"/>'; }).join('') +
          '<path class="k" d="M270 40 Q296 44 296 60 Q296 76 270 80"/><circle class="k" cx="38" cy="60" r="5"/><path class="k" d="M12 60 H24"/>' +
          D.label(150, 120, '20 paddlers in pairs', 150, 74, 'middle') + D.label(220, 22, 'drummer and dragon head', 282, 58) + D.label(4, 22, 'steerer', 30, 58),
        tall: 128, cap: 'A dragon boat seen from above. The drummer faces the paddlers.' },
      { h: 'Everyone has a job' },
      'A dragon boat crew has about 22 people. The drummer sits at the front and sets the pace. The steerer stands at the back and guides the boat with a long oar. The paddlers sit in pairs and must move as one. If even one paddler is out of time, the boat slows down. That is why dragon boating is all about <b>teamwork</b>.',
      { box: 'Did you know?', text: 'In 1996, a doctor in Vancouver formed a dragon boat team of women who had survived breast cancer, to show that exercise could help them heal. Today there are teams like it around the world.' },
      { h: 'A Canadian festival' },
      'Chinese Canadians brought the tradition to Canada. Since 1989, the Toronto International Dragon Boat Race Festival has filled Toronto Island with music, food and racing every June. Now people of every background paddle together: school teams, office teams, seniors and Para athletes. A sport from far away has become a Canadian summer tradition.',
      'Paddlers often say that the best part is not winning. It is the moment when every paddle enters the water at the same instant and the boat seems to lift and fly. Nobody can make that happen alone. It takes twenty people, a drummer and a steerer, all listening to one another.',
      'That may be why the sport has spread so far. It brings together people who might never have met, and for a few minutes, it turns them into one crew.'
    ],
    guide: { before: 'Find southern China and Toronto on a map. Teach <b>tradition</b> and <b>honour</b>. Clap a steady beat and have the child “paddle” in time to show why the drummer matters.',
      after: 'What traditions from other places are part of life in your community? How do they bring people together?' },
    words: [['honour', 'to show respect for someone'], ['teamwork', 'people working together toward one goal']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Zongzi is made of rice.', 'Dragon boat racing is an ancient Chinese tradition built on teamwork that is now part of Canadian summers.', 'Toronto Island has a festival.', 'Drummers sit at the front.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram and the text. What does each person do?', cols: ['Crew member', 'Job'],
        rows: [['drummer', null], ['steerer', null], ['paddlers', null]],
        a: [[null, 'sets the pace from the front'], [null, 'guides the boat with a long oar at the back'], [null, 'paddle in pairs, in time']] },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which food is part of the Dragon Boat Festival?',
        opts: ['bannock', 'zongzi', 'poutine', 'maple taffy'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The text begins “Boom, boom, boom.” Why?',
        opts: ['To let the reader hear the drum', 'To scare the reader', 'To show a mistake', 'To list facts'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the boat slow down if one paddler is out of time?',
        opts: ['The paddles bump and the pushes are not together.', 'The drum stops.', 'The dragon head falls off.', 'The steerer gets tired.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Heartbroken</b> is made of two words. What does it mean?',
        opts: ['very sad', 'very angry', 'ill', 'brave'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does the text show that dragon boating includes many kinds of people? Give two examples.',
        a: 'Teams of breast cancer survivors paddle, and school teams, seniors and Para athletes all race at the Toronto festival.', look: 'two examples of inclusion from the text' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of a team or group you belong to. How is it like a dragon boat crew?',
        a: 'In my choir, we all have to sing in time and follow the conductor, like paddlers following the drummer.', look: 'a personal connection with a clear link to teamwork or roles' }
    ]
  });

  P.add({
    id: 'g5-port-royal', subject: 'history', form: 'Diary',
    title: 'A Winter at Port-Royal',
    deck: 'The imagined diary of a young carpenter in the first French settlement in Acadia, 1606 to 1607',
    plain: true,
    hero: {
      photo: 'g5-port-royal.jpg', credit: 'Photo: Dlanglois, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'A rebuilt copy of the Habitation at Port-Royal National Historic Site, Nova Scotia, the French settlement founded in 1605.'
    },
    body: [
      '<b>14 November 1606.</b> The days grow short. Our leaders remember the winter on Île Sainte-Croix two years ago, when almost half the men died of scurvy. Tonight, Monsieur de Champlain announced a plan to keep our spirits and our bodies strong this winter. He calls it the Order of Good Cheer.',
      '<b>20 November.</b> Here is how the Order works. Each man at the head table takes a turn as Chief Steward. On his day, he must hunt or fish or trade for food, so the whole company has a fine supper. Today it was Pierre’s turn. He brought ducks and a basket of mussels. He wore a chain around his neck and carried a staff, and we followed him into the hall like a parade.',
      { fig: '<path class="k" d="M30 20 Q60 40 52 80 Q40 120 70 150 M190 10 Q200 40 230 60 Q260 90 250 150"/>' + D.ripple(80, 180, 120) +
          '<circle class="a" cx="92" cy="86" r="5"/><circle class="a" cx="176" cy="40" r="5"/>' +
          D.label(102, 82, 'Port-Royal') + D.label(186, 36, 'Île Sainte-Croix') + D.label(90, 140, 'Bay of Fundy') + D.label(8, 166, 'not to scale') +
          '<text class="n" x="10" y="20">Acadia</text>',
        tall: 172, cap: 'A simple map of the two French settlements on the Bay of Fundy.' },
      '<b>3 December.</b> Snow. The Mi’kmaw <b>sakmow</b>, or chief, Membertou often sits with us at supper. He is very old and very wise, and the men listen when he speaks. His people know where the moose and the beaver can be found in winter, and they share food with us. I think we would be hungry without them.',
      { box: 'Did you know?', text: 'Port-Royal was in Mi’kma’ki, the homeland of the Mi’kmaq. Membertou became a close ally of the French and was baptized in 1610.' },
      '<b>15 January 1607.</b> The cold bites my fingers when I work, but the mood in the Habitation is good. We sing. We tell stories. Last autumn, the lawyer Lescarbot even wrote a play, the first ever performed in this land, and acted it out on the water in boats.',
      '<b>2 March.</b> Spring is coming. Only a few men have died this winter, far fewer than at Sainte-Croix. Fresh meat, good company and the help of our <b>hosts</b> have kept us alive.',
      '<b>20 March.</b> Today the ice began to break up on the river. I carved a small wooden spoon and gave it to Membertou’s grandson, who has been teaching me words in his language. He laughed at the way I say them. When the ships come from France this summer, I hope I will not have to leave. This place is beginning to feel like home.'
    ],
    guide: { before: 'Explain that this is historical fiction: the writer is imagined, but the events and people are real. Find the Bay of Fundy on a map. Teach <b>diary</b>, <b>scurvy</b> and <b>sakmow</b> (a Mi’kmaw chief).',
      after: 'Why did fewer men die at Port-Royal than at Sainte-Croix? How might Membertou have described these winters in his own words?' },
    words: [['sakmow', 'a Mi’kmaw chief'], ['hosts', 'people who welcome guests and share with them']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'What is one feature of a diary that you see in this text?',
        opts: ['It has dated entries written in the first person.', 'It has a glossary.', 'It has numbered steps.', 'It rhymes.'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the entries’ events in order.',
        items: ['Champlain announces the Order.', 'Pierre leads the supper parade.', 'Membertou sits at supper.', 'The writer sees spring coming.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Where is Port-Royal?',
        opts: ['on the Bay of Fundy', 'on the Pacific Ocean', 'in the Arctic', 'on Lake Ontario'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Why did more men survive this winter? Fill in the chart.', cols: ['Cause', 'Effect'],
        rows: [['The Order of Good Cheer', null], ['The Mi’kmaq shared food and knowledge.', null]],
        a: [[null, 'The men ate fresh food and stayed cheerful.'], [null, 'The French had enough to eat in winter.']] },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “The cold bites my fingers,” which word is the direct object?',
        opts: ['cold', 'bites', 'fingers', 'my'], a: 2 },
      { k: 'choice', code: 'C1.6', half: true, q: 'The diary is in the first person. What is one disadvantage?',
        opts: ['We only learn what the writer saw and thought.', 'It is too long.', 'It has no dates.', 'It tells everyone’s thoughts.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose voice is missing from this diary? How might the story change if that person told it?',
        a: 'Membertou’s voice is missing. He might tell how his people helped the French survive and what they thought of these newcomers on their land.', look: 'names a missing perspective (Membertou or the Mi’kmaq) and how the story could change' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The writer says, “I think we would be hungry without them.” What does this tell you about the French and the Mi’kmaq?',
        a: 'It shows that the French depended on the Mi’kmaq, who knew the land and how to find food in winter.', look: 'an inference about dependence or the relationship, supported by the text' }
    ]
  });

  P.add({
    id: 'g5-clean-water', subject: 'social', form: 'Explanation',
    title: 'Water You Can Trust',
    deck: 'How water is cleaned for drinking, and why some communities still wait for it',
    hero: {
      photo: 'g5-water-treatment.jpg', credit: 'Photo: U.S. Environmental Protection Agency, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'Tanks at a water treatment plant. Here, dirt is removed from the water before it reaches people’s taps.'
    },
    body: [
      'Turn on a tap in most Canadian homes and clean water pours out. It is so easy that we hardly think about it. But that water has been on a long journey, and in some communities, it is still not safe to drink.',
      { h: 'From lake to tap' },
      'Most towns take their water from a lake, a river or a well. At a <b>treatment</b> plant, the water is cleaned in steps. First, a screen catches sticks and fish. Next, a chemical is added that makes tiny bits of dirt stick together into clumps. The clumps are heavy, so they sink to the bottom of a tank. Then the water flows through layers of sand and gravel that filter out smaller bits. Last, a small amount of chlorine is added to kill germs. The clean water is stored in tanks and towers, then pumped through pipes to homes.',
      { fig: steps(10, [['screen', 'sticks, fish'], ['clumping', 'dirt sticks'], ['settling', 'clumps sink']], 82) +
          steps(86, [['filtering', 'sand, gravel'], ['disinfecting', 'kills germs'], ['to your tap', 'through pipes']], 82) +
          '<path class="a" d="M258 54 V66 Q258 70 150 70 Q41 70 41 82"/>',
        tall: 136, cap: 'The steps in cleaning water for drinking.' },
      { h: 'When water is not safe' },
      'If a treatment plant breaks down or is too old to work well, people are told to boil their water before they drink it. This warning is called a <b>boil water advisory</b>. In most cities, an advisory lasts a few days. But some First Nations communities have lived with advisories for years. In Neskantaga First Nation, in northern Ontario, an advisory began in 1995. Many families had to use bottled water for drinking, cooking and even bathing babies.',
      { box: 'A young voice', text: 'Autumn Peltier, from Wiikwemkoong First Nation on Manitoulin Island, spoke about clean water at the United Nations in 2018, when she was 13. She calls herself a water protector.' },
      { h: 'Working toward change' },
      'Since 2015, many long-term advisories have been lifted as new plants were built and workers were trained. But some communities are still waiting. Clean water is a basic need, and many people believe that every community in Canada should have it. First Nations leaders say it is also important that communities run and look after their own water systems, with the training and money they need.'
    ],
    guide: { before: 'Ask: where does your tap water come from? Teach <b>treatment</b> and <b>advisory</b>. Find Manitoulin Island and northern Ontario on a map. Be ready to talk about fairness in a calm, factual way.',
      after: 'Why do you think some communities waited so long for clean water? What could young people do to help, as Autumn Peltier did?' },
    words: [['treatment', 'a process that cleans or improves something'], ['boil water advisory', 'a warning to boil tap water before using it']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Chlorine kills germs.', 'Water is cleaned in steps before it reaches our taps, but some First Nations have waited years for safe water.', 'Autumn Peltier spoke at the United Nations.', 'Lakes have fish.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in cleaning water.',
        items: ['A screen catches sticks.', 'Dirt clumps and sinks.', 'Sand and gravel filter it.', 'Chlorine kills germs.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what comes right after filtering?',
        opts: ['settling', 'disinfecting', 'the screen', 'clumping'], a: 1 },
      { k: 'choice', code: 'C1.1', q: '“<b>They</b> are heavy, so they sink to the bottom of a tank.” What does <b>they</b> mean?',
        opts: ['the sticks and fish', 'the clumps of dirt', 'the germs', 'the pipes'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why would families in Neskantaga use bottled water to bathe babies?',
        opts: ['The tap water was not safe.', 'Bottled water is warmer.', 'They had no taps.', 'It was cheaper.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A water <b>protector</b> is someone who …',
        opts: ['sells water', 'works to keep water safe and clean', 'swims well', 'fixes pipes'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What message about fairness does the text give? Use a detail to support your answer.',
        a: 'The text shows it is unfair that some First Nations waited years for safe water while most Canadians just turn on a tap. Neskantaga has had an advisory since 1995.', look: 'states the message about fairness or equity and supports it with a detail' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which strategy helped you most with the long paragraph about cleaning water: the diagram, rereading, or picturing it? Explain.',
        a: 'The diagram helped most. I followed the boxes in order while I reread the paragraph, so I could keep the steps straight.', look: 'names a strategy and explains how it helped them understand' }
    ]
  });
  P.add({
    id: 'g5-lungs', subject: 'science', form: 'Explanation',
    title: 'The Air Exchange',
    deck: 'How your lungs trade old air for new about 20 000 times a day',
    hero: {
      photo: 'g5-lungs-model.jpg', credit: 'CREDIT', focus: '50% 45%',
      tall: 220,
      cap: 'A model of the human lungs. The windpipe at the top splits into two branches, one for each lung.'
    },
    body: [
      'Take a deep breath and hold it. Now let it out slowly. You just did something you do about 20 000 times a day, usually without noticing. Each breath is part of a trade. Your body takes in a gas it needs and gets rid of a gas it does not.',
      { h: 'The path of the air' },
      'Air enters through your nose or mouth. Tiny hairs and sticky mucus in your nose trap dust and germs. The air then travels down your windpipe, which splits into two tubes, one for each lung. Inside the lungs, the tubes branch again and again, like the branches of an upside-down tree. At the very ends of the smallest branches are millions of tiny air sacs.',
      { fig: '<path class="k" d="M150 6 V50 M150 50 L110 72 M150 50 L190 72 M110 72 L92 98 M110 72 L118 104 M190 72 L208 98 M190 72 L182 104"/>' +
          '<path class="t" d="M118 50 Q60 60 56 120 Q60 160 120 158 Q136 150 136 120 V62 M182 50 Q240 60 244 120 Q240 160 180 158 Q164 150 164 120 V62"/>' +
          '<path class="a" d="M60 170 Q150 196 240 170"/>' +
          [[92, 102], [118, 108], [208, 102], [182, 108]].map(function (c) { return '<circle class="k" cx="' + c[0] + '" cy="' + c[1] + '" r="4"/>'; }).join('') +
          D.label(166, 14, 'windpipe', 152, 24) + D.label(4, 30, 'left and right lung', 70, 70) + D.label(214, 136, 'air sacs', 208, 104) + D.label(10, 192, 'diaphragm', 90, 182),
        tall: 198, cap: 'The air passages branch like an upside-down tree. The diaphragm is a muscle below the lungs.' },
      { h: 'The great trade' },
      'Each air sac is wrapped in tiny blood vessels. Here, <b>oxygen</b> from the air passes through the thin walls into the blood. At the same time, a waste gas called <b>carbon dioxide</b> passes out of the blood and into the air sac. When you breathe out, the carbon dioxide leaves your body. The heart then pumps the oxygen-rich blood to every cell.',
      { box: 'Try it', text: 'Put your hands on your ribs and breathe in deeply. Feel your chest get bigger? Your <b>diaphragm</b> has pulled down, making room for air to rush in.' },
      { h: 'The muscle that does the work' },
      'Lungs have no muscles of their own. The work is done by the diaphragm, a dome-shaped muscle under the lungs. When it tightens and flattens, the space in your chest grows, and air is pulled in. When it relaxes, the space shrinks, and air is pushed out.',
      'Smoke, vaping and polluted air can damage the air sacs, making it harder to breathe. Exercise, on the other hand, trains the diaphragm and the muscles between your ribs, so each breath works better. Your lungs are a lifelong partner. Treat them well.'
    ],
    guide: { before: 'Breathe in and out together with hands on the ribs. Teach <b>oxygen</b>, <b>carbon dioxide</b> and <b>diaphragm</b>. Point out how the diagram looks like an upside-down tree.',
      after: 'How do the respiratory system and the circulatory system depend on each other? What could you do to protect your lungs?' },
    words: [['oxygen', 'a gas in the air that the body needs'], ['carbon dioxide', 'a waste gas the body breathes out'], ['diaphragm', 'a dome-shaped muscle under the lungs']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Noses have hairs.', 'The lungs trade carbon dioxide for oxygen, with the diaphragm doing the work of breathing.', 'Smoke is harmful.', 'The windpipe splits in two.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the path of the air.',
        items: ['nose or mouth', 'windpipe', 'smaller tubes', 'air sacs'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the diaphragm below?',
        opts: ['the lungs', 'the nose', 'the heart', 'the stomach'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['When the diaphragm …', 'The chest space …', 'Air is …'],
        rows: [['tightens and flattens', null, null], ['relaxes', null, null]], a: [[null, 'grows', 'pulled in'], [null, 'shrinks', 'pushed out']] },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author compare the tubes to an upside-down tree?',
        opts: ['to help you picture how they branch', 'because lungs are green', 'to talk about forests', 'to make a joke'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Which gas does the body breathe out as waste?',
        opts: ['oxygen', 'carbon dioxide', 'steam', 'helium'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The title is “The Air Exchange.” Why is exchange a good word for what happens in the lungs?',
        a: 'An exchange is a trade. In the air sacs, the body takes in oxygen and gives away carbon dioxide at the same time.', look: 'explains exchange as a two-way trade of gases, with a detail' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about the heart that helped you understand this text?',
        a: 'I knew the heart pumps blood to the lungs to get oxygen. This text showed me what happens once the blood gets there.', look: 'a piece of prior knowledge linked to this text' }
    ]
  });

  P.add({
    id: 'g5-beaver-hats', subject: 'history', form: 'Report',
    title: 'A Hat That Changed a Continent',
    deck: 'Why Europeans wanted beaver fur, and what the fur trade meant for the people of this land',
    hero: {
      photo: 'g5-beaver-hat.jpg', credit: 'Photo: Themightyquill, CC BY 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A copy of a felt hat at Fort Langley National Historic Site, British Columbia. Hats like this were made from beaver fur.'
    },
    body: [
      'In the 1600s, a gentleman in Paris or London was not properly dressed without a tall felt hat. The finest hats were made from beaver fur. That fashion helped shape the history of North America.',
      { h: 'Why beaver?' },
      'Beaver fur has two layers. The long outer hairs are called guard hairs. Underneath is a thick layer of soft underfur. Each tiny underfur hair has small barbs, like hooks. When hatmakers pressed and heated the fur, the barbs locked together into a smooth, strong cloth called <b>felt</b>. Beaver felt kept its shape in the rain. By 1600, beavers had almost disappeared from much of Europe, so hatmakers looked across the ocean.',
      { fig: steps(6, [['trapped', 'by First Nations'], ['traded', 'at a post'], ['shipped', 'to Europe']], 86) +
          steps(84, [['made', 'into felt'], ['sold', 'as hats'], ['paid', 'in goods']], 86) +
          '<path class="a" d="M257 50 V62 Q257 68 150 68 Q43 68 43 80"/>',
        tall: 132, cap: 'The journey of a beaver pelt in the fur trade.' },
      { h: 'Partners in trade' },
      'The fur trade depended on First Nations. Wendat, Innu, Anishinaabe, Cree and many other nations trapped beavers and prepared the <b>pelts</b>. Some, such as the Wendat, also acted as middlemen, bringing furs from distant nations to French traders. In return, they received goods such as metal kettles, knives, axes, needles, cloth and glass beads. A metal kettle did not crack over a fire, and a steel axe cut faster than a stone one, so these goods were useful.',
      { box: 'Did you know?', text: 'The most valuable pelts were called castor gras, or greasy beaver. They had been worn as robes for a year or more, which wore away the guard hairs and left the soft underfur ready to use.' },
      { h: 'The other side of the trade' },
      'The fur trade also brought great harm. Traders brought diseases such as smallpox, which killed many First Nations people. As nations competed for furs and trading partners, wars grew worse. In many places, beavers were trapped until few were left.',
      'When silk hats became the fashion in the 1840s, the demand for beaver fell. By then, the fur trade had changed the land and its peoples forever. Many places in Canada still carry names from that time, and many First Nations and Métis families remember ancestors who were trappers, guides and traders. The beaver itself became a symbol of Canada, and it appears on the five-cent coin.'
    ],
    guide: { before: 'Show a felt object if you have one. Teach <b>pelt</b>, <b>felt</b> and <b>trade</b>. Ask: why would people trade? What makes a trade fair?',
      after: 'Was the fur trade good or bad for First Nations? Can it be both? Use evidence from the text.' },
    words: [['felt', 'thick cloth made by pressing fibres together'], ['pelts', 'animal skins with the fur still on']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Hats were fashionable in Paris.', 'European demand for beaver felt hats drove a fur trade that depended on First Nations and changed the land and its peoples.', 'Beaver fur has two layers.', 'Silk hats replaced beaver hats.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the journey of a pelt.',
        items: ['trapped', 'traded at a post', 'shipped to Europe', 'made into felt'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did hatmakers look across the ocean for beaver?',
        opts: ['Beavers had almost disappeared from Europe.', 'They liked to travel.', 'Felt was cheaper there.', 'It rained in Europe.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Good from Europe', 'Why it was useful'],
        rows: [['a metal kettle', null], ['a steel axe', null]], a: [[null, 'It did not crack over a fire.'], [null, 'It cut faster than a stone axe.']] },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>middleman</b> is someone who …',
        opts: ['buys from one group and sells to another', 'makes hats', 'lives in the middle of a town', 'traps beavers only'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'What does the heading “The other side of the trade” tell you the section will be about?',
        opts: ['the harm the trade caused', 'the other side of the ocean', 'how hats are sewn', 'beaver homes'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Was the fur trade good or bad for First Nations? Give evidence for both sides.',
        a: 'It brought useful goods such as kettles and axes. But it also brought diseases like smallpox, worse wars and fewer beavers.', look: 'evidence on both sides, from the text' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize why Europeans wanted beaver fur, in two sentences.',
        a: 'Beaver underfur has tiny barbs that lock together into strong felt for fashionable hats. Beavers were nearly gone in Europe, so traders came to North America.', look: 'the main reasons in their own words' }
    ]
  });

  P.add({
    id: 'g5-hudsons-bay', subject: 'history', form: 'Report',
    title: 'The Company of the Bay',
    deck: 'How two French traders, a small ship and Cree knowledge led to the Hudson’s Bay Company in 1670',
    hero: {
      photo: 'g5-nonsuch.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 220,
      cap: 'A full-size copy of the Nonsuch, the small ship that sailed into Hudson Bay in 1668.'
    },
    body: [
      'In the 1650s, two French traders named Pierre-Esprit Radisson and Médard Chouart des Groseilliers travelled west of the Great Lakes. Cree people there told them about a great salt sea to the north, where the beaver were thick-furred because of the cold. The traders had a bold idea. Instead of paddling furs thousands of kilometres to Montréal, why not sail ships straight into that northern bay?',
      { h: 'Looking for a partner' },
      'The governor of New France was not interested, and he fined the two men for trading without permission. So they crossed the ocean to England, where they found investors who would pay for the trip. In 1668, a small ship called the Nonsuch sailed into Hudson Bay. It returned the next year full of fine furs.',
      { fig: '<path class="k" d="M40 30 Q80 10 120 30 Q150 70 130 110 Q110 140 70 130 Q40 110 50 80 Q30 50 40 30"/><text class="lb" x="88" y="74" text-anchor="middle">Hudson</text><text class="lb" x="88" y="90" text-anchor="middle">Bay</text>' +
          '<path class="d" d="M140 20 Q200 60 290 40"/><circle class="a" cx="236" cy="130" r="5"/><circle class="a" cx="150" cy="150" r="5"/>' +
          D.label(244, 126, 'Montréal') + D.label(70, 168, 'Great Lakes', 150, 150) + D.label(170, 16, 'sea route to England') +
          D.arrow(236, 124, 140, 104, 'a') + '<text class="n" x="166" y="104">long canoe route</text>',
        tall: 176, cap: 'Ships could sail into Hudson Bay instead of using the long canoe routes. Not to scale.' },
      { h: 'A company is born' },
      'On 2 May 1670, King Charles II of England signed a <b>charter</b> that created the Hudson’s Bay Company. The charter gave the company control over the trade in all the lands whose rivers drained into Hudson Bay. The English called this huge area Rupert’s Land. It covered about a third of what is now Canada.',
      'Of course, the land was not empty. It was home to the Cree, Dene, Anishinaabe, Inuit and many other peoples, who had never been asked. The king’s charter did not change the fact that it was their land.',
      { box: 'Did you know?', text: 'The Hudson’s Bay Company became one of the oldest companies in the world. For more than 350 years, its stores sold goods across Canada.' },
      { h: 'Trading at the posts' },
      'The company built trading <b>posts</b> on the shores of the bay. Cree trappers and traders brought furs to the posts in canoes, and they bargained hard for good prices. Cree women made moccasins, snowshoes and food that the traders needed to survive. Without them, the company could not have lasted a single winter. Over time, many company workers married Cree women, and their children were among the ancestors of today’s Métis people.'
    ],
    guide: { before: 'Find Hudson Bay, the Great Lakes and Montréal on a map of Canada. Teach <b>charter</b> and <b>trading post</b>. Ask: who owned this land before the charter?',
      after: 'Why do you think the king believed he could give away land he had never seen? How might the Cree have seen the charter?' },
    words: [['charter', 'an official paper that gives a group rights or powers'], ['posts', 'forts or stores where furs and goods were traded']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Nonsuch was a small ship.', 'With Cree knowledge and English money, two traders started a fur trade by sea that became the Hudson’s Bay Company.', 'Montréal is far from Hudson Bay.', 'Charles II was a king.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['Cree people tell of a northern sea.', 'The governor fines the traders.', 'The Nonsuch sails into Hudson Bay.', 'The king signs the charter.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the map show?',
        opts: ['why sailing to Hudson Bay was shorter than canoeing to Montréal', 'where England is', 'how to build a ship', 'the weather in the north'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>It</b> returned the next year full of fine furs.” What does <b>it</b> mean?',
        opts: ['the company', 'the Nonsuch', 'the bay', 'the charter'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the traders go to England?',
        opts: ['New France would not support their idea.', 'They were English.', 'The king invited them.', 'Furs were cheaper there.'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'In “Cree women made moccasins, snowshoes and food,” why are commas used?',
        opts: ['to separate items in a list', 'to show a pause before speaking', 'to join two sentences', 'to show who is talking'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'What does the author mean by “Of course, the land was not empty”? Whose point of view does this add?',
        a: 'The author is pointing out that First Nations and Inuit already lived there. It adds the point of view of the people whose land the king gave away.', look: 'identifies the Indigenous perspective and the bias in the charter' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Draw a conclusion: could the company have succeeded without the Cree? Use two details.',
        a: 'No. The Cree told the traders about the bay, and Cree women made moccasins, snowshoes and food the traders needed to survive.', look: 'a conclusion supported by two details' }
    ]
  });

  P.add({
    id: 'g5-ice-cream', subject: 'science', form: 'Procedure',
    title: 'Ice Cream in a Bag',
    deck: 'A tasty experiment with states of matter, salt and ice',
    hero: {
      photo: 'g5-ice-cream.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Homemade ice cream. A liquid turns into a solid when enough heat is taken away.'
    },
    body: [
      'Can you make ice cream with no freezer, in about ten minutes? You can, with two bags, some ice and a surprising helper: salt. Along the way, you will see how matter changes from one state to another.',
      { h: 'You will need' },
      'A small zip-top bag, a large zip-top bag, 125 mL of milk or cream, 15 mL of sugar, a few drops of vanilla, about 4 cups of ice, 75 mL of coarse salt, and a pair of mittens.',
      { fig: '<rect class="k" x="70" y="20" width="160" height="140" rx="12"/><rect class="a" x="110" y="64" width="80" height="60" rx="8"/>' +
          [[86, 40], [200, 44], [84, 140], [210, 140], [150, 146], [96, 92], [206, 96]].map(function (c) { return '<rect class="t" x="' + c[0] + '" y="' + c[1] + '" width="12" height="12" rx="2"/>'; }).join('') +
          D.arrow(160, 64, 160, 10, 'k') + D.arrow(110, 94, 92, 94, 'k') + D.label(240, 30, 'ice and salt', 214, 50) + D.label(236, 92, 'milk mixture', 190, 96) +
          '<text class="n" x="168" y="14">heat moves out</text>',
        tall: 166, cap: 'Heat moves from the warm milk into the colder salty ice.' },
      { h: 'Steps' },
      '1. Pour the milk, sugar and vanilla into the small bag. Squeeze out the air and seal it tightly.<br>2. Put the ice and salt into the large bag.<br>3. Place the small bag inside the large bag and seal the large bag.<br>4. Put on your mittens and shake the bag for 5 to 10 minutes.<br>5. Take out the small bag, wipe the salty water off, and enjoy.',
      { h: 'What is happening?' },
      'The milk mixture starts as a liquid. To become a solid, it has to lose heat. The ice is cold, so heat moves from the milk into the ice. But plain ice is only 0°C, and that is not cold enough to freeze milk with sugar in it.',
      'That is where the salt helps. Salt lowers the temperature at which ice melts. As the salty ice melts, it takes in a lot of heat from everything around it, and the mixture in the big bag can drop to about −10°C. Now the milk loses heat fast enough to <b>freeze</b>.',
      { box: 'Physical or chemical?', text: 'Freezing is a physical change. The ice cream is still milk, sugar and vanilla, only in a new state. Leave it on the counter and it will <b>melt</b> back into a liquid.' },
      'Shaking matters, too. It keeps the mixture moving, so tiny ice crystals form instead of big, crunchy ones. Small crystals make ice cream smooth. Ice cream factories use the same idea. Big machines stir the mixture constantly while it freezes, and they whip in tiny bubbles of air to make it light and soft.',
      'Try the experiment again with different amounts of salt, or with no salt at all. Keep everything else the same so the test is fair. Which bag freezes fastest?'
    ],
    guide: { before: 'Review the three states of matter (solid, liquid, gas). Teach <b>freeze</b>, <b>melt</b> and <b>state</b>. If you try the experiment, have a grown-up help, and use mittens: the salty ice gets cold enough to hurt skin.',
      after: 'Why do you think cities put salt on icy roads? How is that like the ice cream bag?' },
    words: [['freeze', 'to change from a liquid to a solid by losing heat'], ['melt', 'to change from a solid to a liquid by gaining heat']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This text is a procedure. Which features help you follow it?',
        opts: ['a list of materials and numbered steps', 'rhyming lines', 'a story with characters', 'an opinion and reasons'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps.',
        items: ['Fill the small bag and seal it.', 'Put ice and salt in the large bag.', 'Put the small bag inside.', 'Shake for 5 to 10 minutes.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which way does the heat move?',
        opts: ['from the ice into the milk', 'from the milk into the ice', 'from the mittens into the bag', 'it does not move'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Material', 'State at the start', 'State at the end'],
        rows: [['the milk mixture', null, null], ['the ice in the big bag', null, null]], a: [[null, 'liquid', 'solid'], [null, 'solid', 'liquid (melts)']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do you need mittens?',
        opts: ['The salty ice can drop to about −10°C.', 'The bag is sharp.', 'To keep the bag clean.', 'To make it shake faster.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'The suffix <b>-er</b> can mean “something that does.” Which word means “something that freezes”?',
        opts: ['freezer', 'freezing', 'frozen', 'froze'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why the salt is needed. Use the words because and so.',
        a: 'Plain ice is only 0°C, so it is not cold enough. Salt makes the ice melt and take in heat, so the mixture gets colder because the melting pulls heat away.', look: 'cause and effect: salt makes the mixture colder, so the milk freezes' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict: what would happen if you did not shake the bag? Use a detail from the text.',
        a: 'It would still freeze, but big crystals would form, so the ice cream would be crunchy, because the text says shaking makes tiny crystals.', look: 'a prediction based on evidence from the text' }
    ]
  });

  P.add({
    id: 'g5-earthquake', subject: 'tech', form: 'Explanation',
    title: 'Buildings That Bend',
    deck: 'How engineers design schools and towers to survive an earthquake',
    hero: {
      photo: 'g5-earthquake.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'A building damaged by an earthquake. Engineers study damage like this to design safer structures.'
    },
    body: [
      'The floor starts to roll like a boat on a wave. Pencils slide off the desk. In British Columbia, students practise for this moment with an earthquake drill: drop, cover and hold on. But the most important protection is one they cannot see. It is built into the walls.',
      { h: 'Why buildings fall' },
      'During an earthquake, the ground shakes back and forth. A building’s base moves with the ground, but the upper floors tend to stay where they are, because of their weight. The building is pulled one way at the bottom and another way at the top. These sideways forces are called <b>shear</b> forces. A stiff, brittle wall can crack, and floors can collapse.',
      { fig: '<path class="k" d="M30 150 H130 M40 150 V50 H120 V150 M40 100 H120 M40 50 L120 100 M120 50 L40 100 M40 100 L120 150 M120 100 L40 150"/>' +
          '<path class="k" d="M170 150 H280 M180 140 V50 H270 V140 M180 95 H270"/>' + [190, 210, 230, 250].map(function (x) { return '<rect class="a" x="' + x + '" y="140" width="14" height="10" rx="3"/>'; }).join('') +
          D.ripple(10, 290, 162) +
          '<text class="lb" x="80" y="30" text-anchor="middle">cross-bracing</text><text class="lb" x="225" y="30" text-anchor="middle">base isolators</text>' +
          D.label(196, 186, 'rubber pads soak up shaking', 214, 150),
        tall: 192, cap: 'Two ways to protect a building: cross-bracing (left) and base isolators (right).' },
      { h: 'Bracing for it' },
      'One solution is cross-bracing. Steel beams are placed in an X shape inside the walls. When the building is pushed sideways, one beam of the X is stretched and the other is squeezed, and together they hold the frame square. Triangles are strong shapes, and an X makes four of them.',
      { h: 'Floating on pads' },
      'Another solution is to let the building ride the shaking. Some buildings sit on base <b>isolators</b>, thick pads made of layers of rubber and steel. When the ground moves, the pads bend, and the building above moves much less, like a person standing on a bouncy bridge.',
      { box: 'Did you know?', text: 'British Columbia has spent many years making its schools safer. Hundreds of older schools have been strengthened or rebuilt so they can stay standing in a strong earthquake.' },
      'Engineers test their designs on shake tables, platforms that copy the motion of real earthquakes. They also study buildings that were damaged, so the next ones can be stronger. A building does not have to stay perfectly still to be safe. It just has to bend without breaking.'
    ],
    guide: { before: 'Build a square from four straws and pins, then push its side: it squashes. Add a diagonal straw and push again. Teach <b>shear</b> and <b>brace</b>. Locate British Columbia on a map.',
      after: 'If you designed a school for an earthquake zone, which idea would you use, and why? What would you test first?' },
    words: [['shear', 'a force that pushes parts of an object in opposite directions'], ['isolators', 'pads that keep shaking from reaching a building']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Students practise drills.', 'Engineers use designs such as cross-bracing and base isolators so buildings can bend without breaking in earthquakes.', 'Rubber is bouncy.', 'Pencils slide in earthquakes.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram and text. How does each design protect a building?', cols: ['Design', 'How it helps'],
        rows: [['cross-bracing', null], ['base isolators', null]], a: [[null, 'An X of steel beams holds the frame square.'], [null, 'Rubber pads bend so the building moves less.']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do the upper floors “stay where they are” when the ground moves?',
        opts: ['Their weight keeps them from moving right away.', 'They are glued.', 'They are lighter.', 'The wind holds them.'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“Drop, cover and hold on.” What kind of sentence is this?',
        opts: ['a command', 'a question', 'a fragment', 'an exclamation about a feeling'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: '“The floor starts to roll like a boat on a wave.” This opening …',
        opts: ['puts the reader inside the moment', 'gives a statistic', 'describes a boat', 'explains bracing'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“Together <b>they</b> hold the frame square.” What does <b>they</b> mean?',
        opts: ['the two beams of the X', 'the students', 'the floors', 'the pads'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion does the author reach in the last paragraph? Do you agree? Why?',
        a: 'A building does not have to stay still to be safe; it has to bend without breaking. I agree, because bracing and isolators both let buildings move a little safely.', look: 'restates the conclusion and supports agreement or disagreement with evidence' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which part of the text did you have to read slowly or reread? What helped you?',
        a: 'I reread the part about shear forces. Looking at the diagram and picturing the bottom and top moving different ways helped me.', look: 'names a hard part and a fix-up strategy that helped' }
    ]
  });

  P.add({
    id: 'g5-forecast', subject: 'math', form: 'Explanation',
    title: 'A 40% Chance of Rain',
    deck: 'What a weather forecast really means, and how probability helps us decide',
    hero: {
      photo: 'g5-weather-radar.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A weather radar. It sends out radio waves that bounce off raindrops and snowflakes, showing where they are falling.'
    },
    body: [
      '“Tomorrow: cloudy, with a 40% chance of rain.” Malik heard the <b>forecast</b> and groaned. The class trip to the conservation area was tomorrow. Would it rain or not? His sister, Hana, shrugged. “The forecast can’t tell you that,” she said. “It tells you how likely it is.”',
      { h: 'The language of chance' },
      '<b>Probability</b> is a way of describing how likely something is to happen. We can use words: impossible, unlikely, equally likely, likely and certain. We can also use numbers. An event that is impossible has a probability of 0%. An event that is certain has a probability of 100%. A coin landing heads is equally likely as tails, so each has a probability of 50%.',
      { fig: '<path class="k" d="M10 60 H290"/>' + [[10, '0%', 'impossible'], [80, '25%', 'unlikely'], [150, '50%', 'equally likely'], [220, '75%', 'likely'], [290, '100%', 'certain']].map(function (t) {
            return '<path class="k" d="M' + t[0] + ' 52 V68"/><text class="lb" x="' + t[0] + '" y="44" text-anchor="' + (t[0] < 20 ? 'start' : t[0] > 280 ? 'end' : 'middle') + '">' + t[1] + '</text><text class="n" x="' + t[0] + '" y="86" text-anchor="' + (t[0] < 20 ? 'start' : t[0] > 280 ? 'end' : 'middle') + '">' + t[2] + '</text>';
          }).join('') + '<circle class="a" cx="122" cy="60" r="6"/>' + D.label(100, 124, '40% chance of rain', 122, 66),
        tall: 130, cap: 'A probability line. A 40% chance is a little less likely than not.' },
      { h: 'What does 40% mean?' },
      'Forecasters look at days in the past when the air, wind and clouds were very much like tomorrow’s. A 40% chance of rain means that on 4 out of 10 days like that, it rained somewhere in the area. On the other 6, it stayed dry. So rain is possible, but a little less likely than no rain.',
      { box: 'Did you know?', text: 'Environment and Climate Change Canada uses the abbreviation POP, for probability of precipitation, in its forecasts. Precipitation means rain, snow or hail.' },
      { h: 'Deciding what to do' },
      'Probability does not tell you exactly what will happen, but it helps you plan. Malik’s teacher said the trip would go ahead. With a 40% chance, it made sense to pack a rain jacket, not to cancel the trip.',
      'The next day, the morning was grey and dry. At lunch, a light shower passed over the trail. Malik pulled up his hood and kept eating his sandwich. “Forty percent,” he said. “I’ll take those odds.”',
      'Probability is everywhere once you start looking. Doctors use it to explain how well a medicine is likely to work. Sports announcers use it to describe how likely a team is to win. Game designers use it to decide how often a rare prize should appear. Each time, the numbers do not promise what will happen. A team with a 90% chance of winning can still lose, and a 10% chance of snow can still bring a snowstorm. They help people make better guesses, and better guesses lead to better plans.'
    ],
    guide: { before: 'Toss a coin ten times and record the results. Teach <b>probability</b>, <b>likely</b> and <b>forecast</b>. Look at today’s forecast together and find the POP.',
      after: 'What chance of rain would make you cancel an outdoor event? 20%? 60%? 90%? Explain your thinking.' },
    words: [['probability', 'how likely it is that something will happen'], ['forecast', 'a statement about what is likely to happen, especially with the weather']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Malik went on a class trip.', 'A forecast like 40% describes how likely rain is, which helps people plan.', 'Radar finds rain.', 'Coins land on heads.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'On the probability line, where is 40%?',
        opts: ['between unlikely and equally likely', 'at certain', 'between likely and certain', 'at impossible'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'A 40% chance of rain means a … chance it stays dry.',
        opts: ['40%', '60%', '100%', '4%'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Write the probability word for each event.', cols: ['Event', 'Word'],
        rows: [['A coin lands on heads.', null], ['The sun rises tomorrow.', null], ['It snows in Ontario in July.', null]],
        a: [[null, 'equally likely'], [null, 'certain'], [null, 'impossible or very unlikely']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Precipitation</b> means …',
        opts: ['rain, snow or hail', 'wind', 'sunshine', 'cloud'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who tells this story?',
        opts: ['Malik, in the first person', 'a narrator outside the story, in the third person', 'Hana, in the first person', 'the teacher'], a: 1 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'At the end, Malik says, “I’ll take those odds.” Why is this a funny, fitting ending?',
        a: 'It did rain a little, but Malik doesn’t mind. He uses a math word, odds, to joke that the chance was worth it, which ties back to the forecast.', look: 'explains the humour and how it connects to probability' },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Describe a decision in your life where you could use probability. What would you do?',
        a: 'Choosing whether to bring a jacket to a soccer game. If the chance of rain is high, I would bring it, and if it is low, I might leave it home.', look: 'a real decision linked to likelihood and a sensible choice' }
    ]
  });

  P.add({
    id: 'g5-student-vote', subject: 'social', form: 'Explanation',
    title: 'Your First Vote',
    deck: 'How elections work in Canada, and how students practise voting',
    hero: {
      photo: 'g5-polling-station.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Voters at a polling station. Each voter marks a ballot behind a screen, so no one can see their choice.'
    },
    body: [
      'Behind a cardboard screen in the school gym, Ji-woo holds a pencil over a paper ballot. Four names are printed on it. She thinks about what each candidate promised, takes a breath and marks an X. Then she folds the ballot and drops it in a box. Ji-woo is 11, so her vote will not decide the election. But it is good practice for the real thing.',
      { h: 'Choosing our leaders' },
      'Canada is a <b>democracy</b>, which means citizens choose the people who govern them. In a federal election, Canada is divided into 343 areas called ridings. Each riding elects one Member of Parliament. People who want the job are called <b>candidates</b>. Most belong to a political party, a group with shared ideas about what the government should do.',
      { fig: steps(10, [['register', 'get on the list'], ['learn', 'about candidates'], ['vote', 'mark a ballot']], 86) +
          steps(86, [['count', 'all the ballots'], ['win', 'most votes'], ['serve', 'the riding']], 86) +
          '<path class="a" d="M257 54 V66 Q257 70 150 70 Q43 70 43 82"/>',
        tall: 136, cap: 'How an election works, from voter to Member of Parliament.' },
      { h: 'Rules that keep it fair' },
      'To vote in a federal election, you must be a Canadian citizen and at least 18 years old. Every vote is secret. No one can make you show your ballot or tell how you voted. Elections Canada, which does not belong to any party, runs the election and counts the votes. In each riding, the candidate with the most votes wins. The party that wins the most ridings usually forms the government, and its leader becomes prime minister.',
      { box: 'Did you know?', text: 'Before 1960, most First Nations people could not vote in federal elections unless they gave up their legal status. Many women won the federal vote in 1918. The right to vote was won step by step.' },
      { h: 'Students vote too' },
      'In many Canadian schools, students take part in a practice election at the same time as the real one. They learn about the candidates, hold debates and vote with real-looking ballots. The results are shared after the official polls close.',
      'Ji-woo’s school counted its ballots the next day. Her candidate lost, but she did not mind. “Next time,” she said, “I’ll ask the candidates my own questions.”',
      'Voting is not the only way to take part. Citizens of any age can write to their representatives, join a community group, speak at a public meeting or volunteer. Ji-woo already has a plan. She wants to start a club at her school to talk about local issues, so that when she turns 18, she will be ready to cast her first real vote.'
    ],
    guide: { before: 'Ask what the child knows about elections. Teach <b>democracy</b>, <b>candidate</b> and <b>ballot</b>. Hold a quick family vote on something small, using secret ballots.',
      after: 'Why is it important that votes are secret? Why do you think it took so long for everyone to win the right to vote?' },
    words: [['democracy', 'a system in which citizens choose their government'], ['candidates', 'people who want to be elected']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Ji-woo is 11.', 'In Canada’s democracy, citizens elect their leaders by secret ballot, and students practise voting at school.', 'Elections Canada counts votes.', 'There are 343 ridings.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps of an election.',
        items: ['register', 'learn about candidates', 'vote', 'count the ballots'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Elections Canada not belong to any party?',
        opts: ['So the counting is fair to every candidate.', 'Parties are too busy.', 'It is too small.', 'It runs only school votes.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Rule', 'Why it matters'],
        rows: [['Every vote is secret.', null], ['The candidate with the most votes wins.', null]],
        a: [[null, 'No one can pressure you or punish you for your choice.'], [null, 'The winner is the person most voters chose.']] },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Demo</b>cracy comes from Greek. What does <b>demo</b> mean?',
        opts: ['people', 'money', 'king', 'land'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'What does the “Did you know?” box add to the text?',
        opts: ['history about who was allowed to vote', 'a list of parties', 'the steps of counting', 'a map of ridings'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What message does the text give about fairness and the right to vote? Use the “Did you know?” box.',
        a: 'Not everyone always had the right to vote. First Nations people and women had to win it, so the message is that fair voting for all took time and effort.', look: 'states the message about inclusion or fairness, supported by the box' },
      { k: 'lines', code: 'B1.3', n: 3, q: 'Ji-woo wants to ask candidates her own questions. Write one question she could ask, and say who she is speaking to and why.',
        a: 'To a candidate at a school visit: “What will you do to make parks in our riding safer for kids?” She wants to know how the candidate will help young people.', look: 'a clear, polite question that fits the audience and purpose' }
    ]
  });
  P.add({
    id: 'g5-food-bank', subject: 'social', form: 'Report',
    title: 'Behind the Food Bank Door',
    deck: 'Why more families need food banks, and how communities respond',
    hero: {
      photo: 'g5-food-bank.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Shelves of donated food at a food bank, sorted and ready for families.'
    },
    body: [
      'On a Tuesday morning, a line forms outside a church basement in Hamilton. A grandmother holds a shopping bag. A man in work boots checks his phone. A mother pushes a stroller. Inside, volunteers stand ready behind shelves of cans, pasta, cereal and fresh vegetables. This is a <b>food bank</b>, and it is busier than ever.',
      { h: 'Who uses a food bank?' },
      'Some people imagine that only people without jobs use food banks. That is not true. Many visitors have jobs, but their pay does not stretch far enough. When rent goes up, families often cut back on food, because rent must be paid first. Children, seniors, students and people with disabilities are all among those who visit. About one in three people who use food banks in Canada is a child.',
      { fig: '<text class="lb" x="6" y="16">Where a family’s money goes (one example)</text>' +
          '<rect class="k" x="6" y="30" width="288" height="34"/><path class="k" d="M150 30 V64 M202 30 V64 M244 30 V64 M272 30 V64"/>' +
          '<text class="lb" x="78" y="52" text-anchor="middle">rent 50%</text><text class="n" x="176" y="52" text-anchor="middle">food 18%</text><text class="n" x="223" y="52" text-anchor="middle">travel</text><text class="n" x="258" y="52" text-anchor="middle">bills</text><text class="n" x="283" y="52" text-anchor="middle">…</text>' +
          D.arrow(78, 100, 78, 70, 'a') + '<text class="n" x="20" y="116">when rent rises, this grows …</text>' + D.arrow(176, 100, 176, 70, 'k') + '<text class="n" x="150" y="134">… and food often shrinks</text>',
        tall: 140, cap: 'An example budget. When rent takes more, less is left for food.' },
      { h: 'How a food bank works' },
      'Food banks collect donations from people, farms, grocery stores and food companies. Volunteers check dates, sort the food and pack it. Many food banks now let visitors walk through and choose their own food, like a small grocery store. This gives people <b>dignity</b>, the feeling of being respected, and it means less food is wasted, because people take what they will eat.',
      { box: 'Did you know?', text: 'Canada’s first food bank opened in Edmonton in 1981. It was meant to be a short-term fix. Today, there are thousands of food banks and meal programs across the country.' },
      { h: 'More than a short-term fix' },
      'Food banks help people get through hard weeks, but many workers there say they cannot solve the problem alone. They point to bigger causes, such as high rent and low pay. Some community groups are trying other ideas: school breakfast programs, community gardens and low-cost markets that sell fresh fruit and vegetables.',
      'Students can help, too. A class can run a food drive, but it can also learn about the causes of hunger and write to leaders about them. Helping today and asking why tomorrow are both part of being a responsible citizen. Volunteers say the most important thing anyone can bring to a food bank is not a can of soup. It is respect.'
    ],
    guide: { before: 'Talk calmly about how some families have trouble affording food, without singling anyone out. Teach <b>donation</b>, <b>dignity</b> and <b>volunteer</b>. Read the budget bar together.',
      after: 'What is the difference between helping someone today and fixing the reason they need help? Which would you like to work on, and how?' },
    words: [['food bank', 'a place that collects donated food and gives it to people who need it'], ['dignity', 'the feeling of being respected and valued']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Food banks have shelves of cans.', 'Many kinds of people need food banks because of costs like rent, and communities help in short-term and long-term ways.', 'The first food bank was in Edmonton.', 'Volunteers check dates.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the budget bar show?',
        opts: ['When rent takes more money, less is left for food.', 'Food costs more than rent.', 'Bills are the biggest cost.', 'Travel is free.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the text describe a grandmother, a worker and a mother in the line?',
        opts: ['To show that many kinds of people use food banks', 'To describe their clothes', 'To tell a funny story', 'To show the line is short'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Idea', 'How it helps'],
        rows: [['letting visitors choose their food', null], ['school breakfast programs', null]], a: [[null, 'gives dignity and wastes less food'], [null, 'children get food at school']] },
      { k: 'choice', code: 'C3.5', half: true, q: 'Which statement does the author say is NOT true?',
        opts: ['Only people without jobs use food banks.', 'Children use food banks.', 'Rent affects food budgets.', 'Volunteers sort food.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>donation</b> is …',
        opts: ['something given for free to help', 'something sold', 'a kind of food', 'a bill'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does the text show respect for people who use food banks? Give an example.',
        a: 'It explains that many hard-working people use them and describes food banks that let people choose their own food, which gives them dignity.', look: 'an example of respect or dignity from the text' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'The text ends with “Helping today and asking why tomorrow.” What conclusion does the author want you to reach?',
        a: 'Giving food helps right away, but we should also learn about the causes of hunger, like high rent, and work to change them.', look: 'a conclusion about short-term help and long-term causes' }
    ]
  });

  P.add({
    id: 'g5-concussion', subject: 'health', form: 'Explanation',
    title: 'When in Doubt, Sit Out',
    deck: 'What a concussion is, how to spot one, and the Ontario law named after Rowan Stringer',
    hero: {
      photo: 'g5-hockey-helmet.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A hockey helmet. Helmets protect the skull, but a hard hit can still shake the brain inside.'
    },
    body: [
      'Ethan collided with another player and fell hard onto the ice. He got up, shook his head and said, “I’m fine.” But a few minutes later, the lights in the arena seemed too bright, and he could not remember the score. Ethan had a <b>concussion</b>.',
      { h: 'What happens in a concussion' },
      'Your brain floats in fluid inside your skull. A hard bump or jolt to the head, neck or body can make the brain move quickly and hit the inside of the skull. This can change how the brain works for a while. A concussion is a brain injury, even though you cannot see it on the outside. Most people do not get knocked out.',
      { fig: '<ellipse class="k" cx="90" cy="80" rx="60" ry="64"/><ellipse class="t" cx="96" cy="80" rx="46" ry="50"/>' + D.arrow(4, 80, 28, 80, 'a') +
          '<path class="a" d="M142 66 Q148 80 142 94"/>' + D.label(8, 162, 'a hit or jolt', 14, 82) + D.label(150, 20, 'skull', 128, 40) + D.label(170, 80, 'brain bumps the skull', 142, 80) + D.label(150, 140, 'fluid around the brain', 118, 120),
        tall: 166, cap: 'A hit makes the brain move inside the skull.' },
      { h: 'Signs to watch for' },
      'Signs of a concussion can show up right away or hours later. They include a headache, dizziness, feeling sick to the stomach, blurry vision, trouble remembering, feeling confused, being bothered by light or noise, and feeling more emotional than usual.',
      { box: 'The rule', text: 'If you think someone might have a concussion, they should stop playing right away and see a doctor. When in doubt, sit them out.' },
      { h: 'Rowan’s Law' },
      'In 2013, a 17-year-old rugby player from Ottawa named Rowan Stringer died after playing with a concussion and then getting hit again. To prevent this from happening to others, Ontario passed Rowan’s Law in 2018. Coaches, players and parents in school and community sports must learn about concussions. Teams must have a plan for removing a player who may be hurt and for deciding when it is safe to <b>return</b>.',
      { h: 'Healing takes time' },
      'Most people get better in a few weeks. The brain needs rest at first, then a slow return to school and activity, step by step. Going back too soon can make things worse. Ethan sat out for three weeks. It was hard to watch his team without him, but when he returned, he felt like himself again. His coach had a new rule for the team, too: anyone who sees a teammate take a hard hit must speak up. Looking out for each other is part of playing the game.'
    ],
    guide: { before: 'Ask what sports or activities the child does and what protective gear they use. Teach <b>concussion</b> and <b>symptom</b>. Practise the rule: when in doubt, sit out.',
      after: 'Why might a player say “I’m fine” when they are not? What would you say to a friend who wanted to keep playing after a hard hit?' },
    words: [['concussion', 'a brain injury caused by a hit or jolt'], ['return', 'to come back, for example to a sport after an injury']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Hockey is dangerous.', 'A concussion is a brain injury with signs to watch for, and players must stop and heal before returning.', 'Rowan played rugby.', 'Helmets are hard.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['the brain moving inside the skull after a hit', 'how to put on a helmet', 'a hockey rink', 'a broken bone'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why was Ethan’s “I’m fine” not true?',
        opts: ['Signs of a concussion can show up later.', 'He was joking.', 'He had a cold.', 'He fell on purpose.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Cause', 'Effect'],
        rows: [['A player keeps playing with a concussion and is hit again.', null], ['Rowan Stringer died in 2013.', null]], a: [[null, 'The injury can become much worse.'], [null, 'Ontario passed Rowan’s Law in 2018.']] },
      { k: 'choice', code: 'B3.3', half: true, q: '“Rowan Stringer, a 17-year-old rugby player, …” The words between the commas …',
        opts: ['tell who Rowan was', 'are a list', 'are a question', 'are spoken words'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which heading would you look under to learn about the law?',
        opts: ['Signs to watch for', 'Rowan’s Law', 'Healing takes time', 'What happens in a concussion'], a: 1 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize what someone should do if they might have a concussion, in order.',
        a: 'They should stop playing right away and see a doctor. Then they rest and slowly return to school and sports, step by step.', look: 'the steps in order: stop, see a doctor, rest, return slowly' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'How does this text connect to a sport or activity you do?',
        a: 'I play soccer and sometimes head the ball. Now I know to tell my coach if I get a headache or feel dizzy after a hit.', look: 'a personal connection that applies the text to their own life' }
    ]
  });

  P.add({
    id: 'g5-energy-drinks', subject: 'health', form: 'Explanation',
    title: 'The Buzz About Caffeine',
    deck: 'Why energy drinks are not made for kids',
    hero: {
      photo: 'g5-energy-drinks.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Energy drink cans. In Canada, their labels must say they are not recommended for children.'
    },
    body: [
      'The can is bright and shiny, with a lightning bolt on the side. The ads show snowboarders flying through the air. It is easy to think an energy drink would make you faster or stronger. But read the small print on the can: “Not recommended for children.” Why?',
      { h: 'What is caffeine?' },
      '<b>Caffeine</b> is a drug found in coffee, tea, some soft drinks, chocolate and energy drinks. It is a <b>stimulant</b>, which means it speeds up the messages travelling through your brain and body. That can make a person feel more awake for a while. Many adults drink coffee or tea every day.',
      { fig: '<text class="lb" x="6" y="16">Caffeine in some drinks (about)</text>' + [['energy drink (473 mL can)', 160], ['coffee (250 mL)', 140], ['cola (355 mL can)', 36], ['green tea (250 mL)', 30], ['milk', 0]].map(function (r, i) {
            var y = 32 + i * 26; return '<text class="n" x="6" y="' + (y + 12) + '">' + r[0] + '</text>' + (r[1] ? '<rect class="a" x="150" y="' + y + '" width="' + (r[1] * 0.85) + '" height="14"/>' : '') + '<text class="n" x="' + (156 + r[1] * 0.85) + '" y="' + (y + 12) + '">' + r[1] + ' mg</text>';
          }).join('') + '<path class="d" d="M222 28 V160"/><text class="n" x="226" y="174">85 mg: a 10 to 12 year old’s daily limit</text>',
        tall: 180, cap: 'Approximate amounts of caffeine. The dashed line shows Health Canada’s limit for children aged 10 to 12.' },
      { h: 'Why it matters for kids' },
      'Children’s bodies are smaller, so the same amount of caffeine has a bigger effect. Health Canada says that children aged 10 to 12 should have no more than 85 mg of caffeine in a whole day. One large energy drink can have nearly twice that. Too much caffeine can cause a racing heart, shaky hands, an upset stomach, headaches and trouble sleeping. Many energy drinks are also full of sugar.',
      { box: 'Not the same thing', text: 'Sports drinks and energy drinks are different. Sports drinks have water, sugar and salts. Energy drinks have caffeine. For most kids playing sports, water is the best choice.' },
      { h: 'Real energy' },
      'The energy your body really needs comes from food, sleep and water. A good night’s sleep, a breakfast with protein and whole grains, and a full water bottle will help you skate, run and think better than any can. The next time you see a lightning bolt on a drink, remember: the real power is already in you.',
      'It also helps to know where caffeine hides. Iced teas, some sodas and even some chocolate bars contain it. Reading the label is the best way to find out. If a drink says “high caffeine content” or “not recommended for children,” it is a signal to choose something else. Cold water, milk or water with a slice of orange can quench your thirst without the jitters. Your heart, your stomach and your sleep will thank you.'
    ],
    guide: { before: 'Look at a drink label together and find the caffeine warning if there is one. Teach <b>caffeine</b> and <b>stimulant</b>. Read the bar graph and compare each bar with the dashed line.',
      after: 'Why do you think energy drink ads show extreme sports? Who are the ads trying to reach, and what do they want you to believe?' },
    words: [['caffeine', 'a drug in coffee, tea and energy drinks that makes people feel more awake'], ['stimulant', 'something that speeds up the body and brain']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Energy drinks have lightning bolts.', 'Energy drinks have a lot of caffeine, which can harm children, so real energy should come from food, sleep and water.', 'Coffee is popular.', 'Milk has no caffeine.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. Which drinks are above the 85 mg line?',
        opts: ['energy drink and coffee', 'cola and green tea', 'milk only', 'all of them'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does caffeine have a bigger effect on children?',
        opts: ['Their bodies are smaller.', 'They drink faster.', 'They play more sports.', 'Their cans are bigger.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the two kinds of drinks.', cols: ['', 'Sports drink', 'Energy drink'],
        rows: [['Main ingredients', null, null]], a: [[null, 'water, sugar and salts', 'caffeine (and often sugar)']] },
      { k: 'choice', code: 'A2.4', half: true, q: 'Energy drink ads show snowboarders flying. What do the ads want you to believe?',
        opts: ['The drink will make you strong and exciting.', 'Snowboarding is safe.', 'The drink is for children.', 'Water is better.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>stimulant</b> …',
        opts: ['speeds up the brain and body', 'helps you sleep', 'is a kind of vitamin', 'cools you down'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The company that sells energy drinks and Health Canada give different messages. Explain each one and why they differ.',
        a: 'The company’s ads say the drink gives power and excitement, because they want to sell it. Health Canada says it is not for children, because it wants to keep them healthy.', look: 'both messages, with each source’s purpose' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The last sentence says, “the real power is already in you.” Why is this a strong way to end?',
        a: 'It turns the ad’s idea of power around and reminds the reader that sleep, food and water give real energy, so it leaves you with a positive message.', look: 'explains the effect of the ending, linking it to the ad and the main idea' }
    ]
  });

  P.add({
    id: 'g5-calm-breath', subject: 'health', form: 'Explanation',
    title: 'Four Counts to Calm',
    deck: 'What stress does to your body, and a breathing tool you can use anywhere',
    hero: {
      photo: 'g5-calm-lake.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A calm lake in the morning. Picturing a peaceful place is one way to help your body settle.'
    },
    body: [
      'Your name is next on the list for the class presentation. Your heart pounds. Your hands feel sweaty, and your mouth is dry. Your thoughts start racing: what if I forget everything? This feeling is <b>stress</b>, and everybody has it sometimes.',
      { h: 'Your body’s alarm' },
      'Stress begins in the brain. When it senses a challenge or a danger, it sounds an alarm. Your body gets ready to act: your heart beats faster, your breathing speeds up, and your muscles tighten. Long ago, this helped people run from danger. Today, the same alarm can go off before a test, a game or a difficult talk with a friend.',
      'A little stress can help. It can make you focus and try your best. But when the alarm rings too loudly or for too long, it can make it hard to think, sleep or enjoy things.',
      { fig: '<rect class="k" x="90" y="20" width="120" height="120"/>' + D.arrow(90, 140, 90, 24, 'a') + D.arrow(90, 20, 206, 20, 'a') + D.arrow(210, 20, 210, 136, 'a') + D.arrow(210, 140, 94, 140, 'a') +
          '<text class="lb" x="80" y="84" text-anchor="end">breathe in 4</text><text class="lb" x="150" y="12" text-anchor="middle">hold 4</text><text class="lb" x="220" y="84">breathe out 4</text><text class="lb" x="150" y="160" text-anchor="middle">hold 4</text>' +
          '<text class="n" x="150" y="84" text-anchor="middle">repeat 4 times</text>',
        tall: 166, cap: 'Box breathing: trace the sides of a square as you count.' },
      { h: 'Turning down the alarm' },
      'One of the fastest ways to calm your body is to change how you breathe. Slow, deep breaths send a message to your brain that you are safe. Try box breathing. Breathe in through your nose for a count of four. Hold for four. Breathe out slowly through your mouth for four. Hold for four. Picture tracing the sides of a square. Repeat four times.',
      { box: 'Other tools', text: 'Name five things you can see. Squeeze and relax your fists. Picture a calm place. Talk to someone you trust.' },
      { h: 'Practise when you are calm' },
      'Breathing tools work best when you practise them before you need them, like a fire drill. Try box breathing at bedtime or before school for a week. Then, when the alarm rings, your body will already know what to do.',
      'If stress or worry is with you most days, it is important to tell a parent, teacher or doctor. Asking for help is a <b>strategy</b>, too, and a strong one.',
      'Remember that everyone’s alarm is a little different. Some people feel stress in their stomach, and others feel it in their shoulders or as a headache. Noticing where you feel it is the first step. Once you know your own signals, you can reach for a tool before the alarm gets too loud.'
    ],
    guide: { before: 'Do one round of box breathing together before reading. Teach <b>stress</b> and <b>strategy</b>. Keep the tone light: stress is normal and manageable.',
      after: 'When do you feel stress? Which tool from the text will you try this week, and when?' },
    words: [['stress', 'the body’s reaction to a challenge or a worry'], ['strategy', 'a plan or tool for doing something']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Presentations are scary.', 'Stress is the body’s alarm, and tools like box breathing can calm it.', 'Hearts beat fast.', 'Lakes are calm.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps of box breathing.',
        items: ['breathe in for 4', 'hold for 4', 'breathe out for 4', 'hold for 4 again'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.6', half: true, q: 'The first paragraph uses “you” and “your.” Why?',
        opts: ['to put the reader in the situation', 'to tell the writer’s story', 'to describe a character named You', 'to sound like a news report'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['When the alarm rings, your …', 'It …'],
        rows: [['heart', null], ['breathing', null], ['muscles', null]], a: [[null, 'beats faster'], [null, 'speeds up'], [null, 'tighten']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the author compare practising to a fire drill?',
        opts: ['You practise so you know what to do when it matters.', 'Stress is like a fire.', 'Schools have alarms.', 'Breathing is loud.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “Breathe out slowly,” the word <b>slowly</b> is an adverb. What does it tell?',
        opts: ['how to breathe out', 'where to breathe', 'when to breathe', 'who breathes'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Did picturing the square help you understand box breathing? Explain how.',
        a: 'Yes. Picturing my finger moving around the square helped me remember the four steps and that each one is the same length.', look: 'explains how visualizing (or another strategy) helped understanding' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Describe a time you felt stress. Which tool from the text could have helped, and how?',
        a: 'I felt stress before a swimming race. Box breathing could have slowed my heart and helped me focus on the start.', look: 'a personal example matched to a tool from the text' }
    ]
  });

  P.add({
    id: 'g5-bank-shot', subject: 'math', form: 'Explanation',
    title: 'The Angle off the Boards',
    deck: 'How hockey players use angles to pass the puck around a defender',
    hero: {
      photo: 'g5-hockey-rink.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Hockey players on a rink. The boards around the edge can be used to bounce the puck.'
    },
    body: [
      'Priya has the puck near the boards. Her teammate, Lucas, is open up the ice, but a defender stands right between them. A straight pass will be stopped. So Priya does something clever. She shoots the puck at the boards, and it bounces off and slides right onto Lucas’s stick. How did she know where to aim?',
      { h: 'Angles in, angles out' },
      'An <b>angle</b> is the amount of turn between two lines that meet at a point. Angles are measured in <b>degrees</b> with a tool called a protractor. When a puck hits the boards, it bounces off at the same angle as it came in. This is true for a ball bouncing off a wall and for light bouncing off a mirror, too.',
      { fig: '<path class="k" d="M6 20 H294"/><path class="t" d="M150 20 V100"/>' +
          '<circle class="k" cx="40" cy="130" r="8"/><circle class="k" cx="260" cy="130" r="8"/><rect class="h" x="140" y="100" width="20" height="40"/>' +
          '<path class="a" d="M46 124 L150 22 L254 124"/>' + D.arrow(100, 72, 120, 52, 'a') + D.arrow(180, 52, 200, 72, 'a') +
          '<path class="t" d="M130 40 A28 28 0 0 1 150 48 M170 40 A28 28 0 0 0 150 48"/>' +
          '<text class="n" x="104" y="48">45°</text><text class="n" x="178" y="48">45°</text>' +
          D.label(4, 160, 'Priya', 40, 138) + D.label(240, 160, 'Lucas', 260, 138) + D.label(150, 168, 'defender', 150, 140, 'middle') + D.label(200, 14, 'boards'),
        tall: 172, cap: 'The puck hits the boards at 45° and leaves at 45°, going around the defender.' },
      { h: 'Finding the spot' },
      'To aim, Priya pictures a point on the boards halfway between herself and Lucas. If they are the same distance from the boards, the puck must hit that middle point. The angle going in matches the angle going out, so the puck travels around the defender in a shape like a wide letter V.',
      { box: 'Kinds of angles', text: 'An acute angle is less than 90°. A right angle is exactly 90°, like the corner of a page. An obtuse angle is between 90° and 180°. A straight angle is 180°.' },
      { h: 'Angles everywhere' },
      'Players in many sports think about angles without saying the word. A curling skip reads the angle to knock a stone out of the house. A basketball player banks a shot off the backboard. A pool player calls the angle before tapping the cue ball.',
      'Back on the ice, Lucas takes Priya’s pass and scores. On the bench, the coach grins. “Nice geometry,” she says.',
      'Players practise bank passes again and again until they can feel the right angle without thinking. But the idea underneath is simple and always the same. Wherever the puck, the ball or the beam of light comes from, it leaves the surface at the same angle it arrived. Once you know that, a wall stops being a problem and becomes a teammate.'
    ],
    guide: { before: 'Roll a ball against a wall at different angles and watch how it bounces. Teach <b>angle</b>, <b>degree</b> and <b>protractor</b>. Find right angles around the room.',
      after: 'Where else do you see angles that bounce, such as light in a mirror? Try to bounce a ball to a partner around a chair.' },
    words: [['angle', 'the amount of turn between two lines that meet'], ['degrees', 'units used to measure angles (°)']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Lucas scored a goal.', 'A puck bounces off the boards at the same angle it hits them, and players use this to pass.', 'Protractors measure angles.', 'Coaches like geometry.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the angle as the puck leaves the boards?',
        opts: ['45°', '90°', '180°', '30°'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Priya not pass straight to Lucas?',
        opts: ['A defender was between them.', 'She wanted to score.', 'The ice was wet.', 'Lucas was behind her.'], a: 0 },
      { k: 'table', code: 'B2.2', q: 'Name each angle.', cols: ['Size of the angle', 'Kind of angle'],
        rows: [['30°', null], ['90°', null], ['120°', null]], a: [[null, 'acute'], [null, 'right'], [null, 'obtuse']] },
      { k: 'choice', code: 'C3.1', half: true, q: '“Nice geometry,” the coach says. Why is this funny?',
        opts: ['She praises a hockey pass with a math word.', 'She does not like hockey.', 'Geometry is a player’s name.', 'She is angry.'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“She shoots the puck at the boards, and it bounces off.” This sentence is …',
        opts: ['compound', 'a fragment', 'a question', 'a run-on'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how Priya knew where to aim. Use the words angle and halfway.',
        a: 'She aimed halfway between herself and Lucas, because the angle going in matches the angle going out, so the puck bounces to him.', look: 'uses the rule (angle in equals angle out) and the halfway point' },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Describe another game or activity where you could use this rule about angles.',
        a: 'In four square, I could bounce the ball off the wall at an angle so it lands in the corner where the other player is not standing.', look: 'a new situation where the angle rule applies' }
    ]
  });

  P.add({
    id: 'g5-sails', subject: 'math', form: 'Explanation',
    title: 'Measuring a Sail',
    deck: 'How sailmakers find the area of triangles',
    hero: {
      photo: 'g5-sailboat.jpg', credit: 'CREDIT', focus: '50% 45%',
      tall: 220,
      cap: 'A sailboat with triangular sails. The bigger the sail, the more wind it can catch.'
    },
    body: [
      'At a sail loft in Kingston, Ontario, a sailmaker named Grace spreads a huge piece of white cloth across the floor. A customer has ordered a new sail for a small boat. Before Grace cuts anything, she needs to know how much cloth she will need. She needs to find the sail’s <b>area</b>.',
      { h: 'Squares and rectangles first' },
      'Area is the amount of surface a flat shape covers. It is measured in square units, such as square metres (m²). To find the area of a rectangle, multiply its length by its width. A rectangle 4 m long and 3 m wide has an area of 4 × 3 = 12 m².',
      { fig: '<rect class="t" x="40" y="20" width="160" height="120"/><path class="a" d="M40 140 L40 20 L200 140 Z"/><path class="h" d="M40 20 L200 20 L200 140 Z"/>' +
          '<text class="n" x="120" y="158" text-anchor="middle">base 4 m</text><text class="n" x="30" y="84" text-anchor="end">height 3 m</text>' +
          '<text class="lb" x="80" y="112">sail</text><text class="n" x="160" y="56">other half</text>' +
          '<text class="lb" x="212" y="60">rectangle: 4 × 3 = 12 m²</text><text class="lb" x="212" y="84">sail: 12 ÷ 2 = 6 m²</text>',
        tall: 164, cap: 'A right-angled triangle is exactly half of a rectangle.' },
      { h: 'Half a rectangle' },
      'Many sails are triangles. Here is the trick: draw a rectangle around a triangle with the same <b>base</b> and height, and the triangle covers exactly half of it. So the area of a triangle is the base times the height, divided by 2. Grace’s sail has a base of 4 m and a height of 3 m. Its area is 4 × 3 ÷ 2 = 6 m².',
      'The height must be measured straight up from the base, at a right angle. It is not the length of the slanted edge. Measuring the slanted edge by mistake would give Grace too much cloth.',
      { box: 'Check it', text: 'Cut a paper rectangle in half along its diagonal. Place the two triangles on top of each other. They match, so each one is half the rectangle.' },
      { h: 'More than cloth' },
      'Sail area matters on the water, too. A bigger sail catches more wind and pushes the boat faster, but it is harder to control in a storm. Sailors choose a smaller sail when the wind is strong. Grace adds a little extra cloth around the edges for the hems, cuts the sail, and stitches it with heavy thread. A week later, the little boat skims across Lake Ontario.',
      'Not every sail is a right-angled triangle. Some lean or have a slanted top. The rule still works, as long as Grace measures the height straight up from the base to the highest corner. For the strange shapes on large racing boats, sailmakers split the sail into several triangles, find the area of each one and add them together.'
    ],
    guide: { before: 'Cut a paper rectangle along its diagonal and match the two triangles. Teach <b>area</b>, <b>base</b> and <b>height</b>. Remind the child that area is measured in square units.',
      after: 'Find a triangle at home or outside. Measure its base and height and find its area. Why does height have to be measured straight up?' },
    words: [['area', 'the amount of surface a flat shape covers'], ['base', 'the bottom side of a shape, used to measure height']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Grace lives in Kingston.', 'The area of a triangle is half of a rectangle with the same base and height, and sailmakers use this.', 'Sails are white.', 'Big sails go fast.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['The sail is half of a rectangle.', 'The sail is a square.', 'The sail is twice the rectangle.', 'The boat’s length.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'A sail has a base of 6 m and a height of 4 m. What is its area?',
        opts: ['12 m²', '24 m²', '10 m²', '20 m²'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps Grace follows.',
        items: ['Find the area of the sail.', 'Add a little extra cloth for the hems.', 'Cut the sail.', 'Stitch it with heavy thread.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>It</b> is not the length of the slanted edge.” What does <b>it</b> mean?',
        opts: ['the height', 'the base', 'the sail', 'the rectangle'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Area is measured in …',
        opts: ['square units, such as m²', 'degrees', 'kilograms', 'litres'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why a bigger sail is not always better. Use cause and effect.',
        a: 'A bigger sail catches more wind, so the boat goes faster. But in a storm, the strong wind makes it hard to control, so sailors use a smaller sail.', look: 'a cause-and-effect explanation with both sides' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'What could you do if you did not understand why a triangle is half a rectangle?',
        a: 'I could try the “Check it” box: cut a rectangle along the diagonal and match the two triangles. I could also look at the diagram again.', look: 'a sensible strategy (try it, use the diagram, reread, ask)' }
    ]
  });
  P.add({
    id: 'g5-fair-game', subject: 'math', form: 'Explanation',
    title: 'Is This Game Fair?',
    deck: 'Using probability to test a game at the school fun fair',
    hero: {
      photo: 'g5-dice.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Number cubes, also called dice. Each face of a fair number cube is equally likely to land on top.'
    },
    body: [
      'For the school fun fair, Sofia’s class invented a game called Odds and Evens. Two players each roll a number cube. Player A wins if the two numbers add up to an even total. Player B wins if the total is odd. Sofia wondered: is this game <b>fair</b>? In a fair game, every player has the same chance of winning.',
      { h: 'Listing every outcome' },
      'To find out, the class listed every possible result, or <b>outcome</b>. Each cube has 6 faces, so there are 6 × 6 = 36 ways the two cubes can land. They made a chart with one cube’s numbers across the top and the other cube’s numbers down the side, and wrote each sum in the boxes.',
      { fig: '<text class="lb" x="12" y="14">+</text>' + [1, 2, 3, 4, 5, 6].map(function (n, i) { return '<text class="lb" x="' + (48 + i * 40) + '" y="14" text-anchor="middle">' + n + '</text><text class="lb" x="12" y="' + (36 + i * 22) + '">' + n + '</text>'; }).join('') +
          [1, 2, 3, 4, 5, 6].map(function (r, i) { return [1, 2, 3, 4, 5, 6].map(function (c, j) { var s = r + c, x = 30 + j * 40, y = 22 + i * 22; return (s % 2 ? '' : '<rect class="h" x="' + x + '" y="' + y + '" width="36" height="18"/>') + '<rect class="t" x="' + x + '" y="' + y + '" width="36" height="18"/><text class="n" x="' + (x + 18) + '" y="' + (y + 13) + '" text-anchor="middle">' + s + '</text>'; }).join(''); }).join(''),
        tall: 158, cap: 'All 36 sums. Even sums are shaded.' },
      { h: 'Counting the chances' },
      'When they counted, they found 18 even sums and 18 odd sums. Player A has 18 chances out of 36, and so does Player B. Each player’s <b>probability</b> of winning is 18 out of 36, or one half. The game is fair.',
      { h: 'Testing it for real' },
      'Next, the class played the game 50 times. Even won 27 times and odd won 23 times. Was the chart wrong? No. In a small number of games, results can be uneven, just as a coin can land on heads three times in a row. When the class combined everyone’s results, 400 games in all, even won 203 times and odd won 197 times, very close to half and half.',
      { box: 'Make it unfair', text: 'Change the rule: Player A wins if the total is 7 or more. Count the boxes in the chart. Does Player A now have a better chance than Player B?' },
      'The class kept Odds and Evens for the fun fair. A sign beside it said, “A fair game: we checked the math.”',
      'Many games and contests use probability, even when players do not notice. A raffle with 100 tickets gives each ticket a 1 in 100 chance. A spinner with four equal parts gives each colour a 1 in 4 chance. Before you play a game at a fair or online, you can ask the same question Sofia asked: does everyone have the same chance? If the answer is no, someone designed it that way, and it is worth knowing who benefits.',
      'Sofia’s class learned that a chart can show what should happen, and an experiment can show what does happen. When the two agree, you can be confident in your answer.'
    ],
    guide: { before: 'Roll two number cubes a few times and add the numbers. Teach <b>outcome</b>, <b>probability</b> and <b>fair</b>. Look at the chart and find a few sums together.',
      after: 'Try the “Make it unfair” rule with the chart. Then invent a new rule that is fair. How can you prove it?' },
    words: [['fair', 'giving every player the same chance'], ['outcome', 'one possible result'], ['probability', 'how likely something is']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Number cubes have 6 faces.', 'By listing all outcomes and testing, the class showed that Odds and Evens is a fair game.', 'Sofia likes fun fairs.', 'Even numbers are better.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. What is the sum when both cubes show 4?',
        opts: ['8', '6', '16', '10'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did even win 27 of the first 50 games?',
        opts: ['Small numbers of games can be uneven by chance.', 'The chart was wrong.', 'The cubes were unfair.', 'Even always wins.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Record the results from the text.', cols: ['Games played', 'Even won', 'Odd won'],
        rows: [['50', null, null], ['400', null, null]], a: [[null, '27', '23'], [null, '203', '197']] },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>outcome</b> is …',
        opts: ['one possible result', 'a winner', 'a rule', 'a prize'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“Was the chart wrong? No.” The word “No.” is …',
        opts: ['a short answer used for effect', 'a run-on', 'a compound sentence', 'a list'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion did the class reach? Give two pieces of evidence.',
        a: 'The game is fair. The chart had 18 even and 18 odd sums, and in 400 games the results were very close to half and half.', look: 'the conclusion supported by the chart and the test results' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'The class did not trust only the first 50 games. What thinking skill did they use, and why was it a good idea?',
        a: 'They tested with more data before deciding. A small test can be misleading, so collecting 400 results gave a more trustworthy answer.', look: 'names a thinking skill (checking evidence, using more data) and explains why it helps' }
    ]
  });

  P.add({
    id: 'g5-vanishing-point', subject: 'arts', form: 'Procedure',
    title: 'Drawing Distance',
    deck: 'How artists use a vanishing point to make a flat page look deep',
    hero: {
      photo: 'g5-railway-tracks.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 220,
      cap: 'Railway tracks seem to come together far away, even though the rails are always the same distance apart.'
    },
    body: [
      'Stand between two railway tracks, or look down a long, straight road. The rails are always the same distance apart, but far away, they seem to come together at one point. Artists noticed this long ago, and they turned it into a tool. It is called <b>linear perspective</b>.',
      { h: 'An old idea' },
      'About 600 years ago in Florence, Italy, an Italian architect named Filippo Brunelleschi worked out the rules of linear perspective. Painters began using them to make flat walls and canvases look like windows into real space. Today, artists, comic creators, video game designers and architects still use the same rules.',
      { fig: '<path class="t" d="M6 70 H294"/><circle class="a" cx="150" cy="70" r="4"/>' +
          '<path class="d" d="M20 160 L150 70 M280 160 L150 70 M20 10 L150 70 M280 10 L150 70"/>' +
          '<path class="k" d="M40 146 V40 M64 129 V52 M88 113 V60 M260 146 V40 M236 129 V52 M212 113 V60"/>' +
          D.label(158, 62, 'vanishing point') + D.label(200, 88, 'horizon line', 240, 70) + '<text class="n" x="20" y="174">things get smaller as they go back</text>',
        tall: 178, cap: 'Lines that go into the distance all meet at the vanishing point.' },
      { h: 'Try it' },
      '1. Draw a <b>horizon line</b> across your page. This is where the sky meets the land, at the height of your eyes.<br>2. Put a dot on the line. This is the <b>vanishing point</b>.<br>3. Use a ruler to draw lines from the corners of your page to the dot. These are guidelines for a road, a hallway or a row of trees.<br>4. Draw fence posts or trees along the guidelines. Make them shorter and closer together as they get near the dot.<br>5. Erase the guidelines you do not need.',
      { box: 'Look closer', text: 'Objects that are far away also look paler and less detailed. Artists call this atmospheric perspective. Use lighter lines for the distance.' },
      { h: 'Why it works' },
      'Our brains use clues to judge distance. Things that are far away look smaller, and parallel lines seem to meet. When a drawing uses the same clues, the brain is fooled, and the flat page seems to have depth. The rules do not make a drawing good on their own, but they give it a strong sense of space. Then it is up to you to fill that space with your ideas.',
      'Once you have practised with one vanishing point, try two. Put two dots far apart on the horizon line and draw the corner of a building between them. The walls will seem to stretch away in two directions. Artists who draw cities, and the designers who build video game worlds, use this method every day.'
    ],
    guide: { before: 'Look down a hallway or a long road together and notice how lines seem to meet. Teach <b>horizon line</b> and <b>vanishing point</b>. Have a ruler, pencil and eraser ready.',
      after: 'Draw your own street or hallway using the steps. What clues make it look deep? What could you add to make it more interesting?' },
    words: [['linear perspective', 'a way of drawing that uses lines to show distance'], ['horizon line', 'where the sky seems to meet the land, at eye level'], ['vanishing point', 'the point where lines going into the distance meet']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'Part of this text is a procedure. How can you tell?',
        opts: ['It has numbered steps to follow.', 'It rhymes.', 'It has characters and a problem.', 'It is a letter.'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in order.',
        items: ['Draw a horizon line.', 'Put a dot on the line.', 'Draw guidelines to the dot.', 'Erase guidelines you do not need.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what happens to the posts as they get closer to the dot?',
        opts: ['They get shorter.', 'They get taller.', 'They disappear.', 'They get darker.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why do railway tracks seem to meet far away?',
        opts: ['Things that are far away look smaller.', 'The rails really do meet.', 'Trains push them together.', 'The ground is curved.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “an Italian architect,” <b>Italian</b> is a proper adjective, made from the name of a country. Which is also a proper adjective?',
        opts: ['Canadian', 'tall', 'drawing', 'quickly'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Parallel</b> lines …',
        opts: ['stay the same distance apart', 'cross in an X', 'make a circle', 'are always short'], a: 0 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Explain how the diagram helps you understand the steps better than words alone.',
        a: 'The diagram shows where the dot goes and how the lines meet it, and I can see the posts getting shorter, which is hard to picture from words.', look: 'a specific way the diagram adds to the words' },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Where else could linear perspective be useful besides art class?',
        a: 'An architect could use it to show what a new building will look like, and a video game designer could use it to make a road look long.', look: 'a sensible use in another subject or job' }
    ]
  });

  P.add({
    id: 'g5-throat-singing', subject: 'arts', form: 'Report',
    title: 'A Song Between Two Voices',
    deck: 'Inuit throat singing, a game of breath and rhythm that is being sung again',
    hero: {
      photo: 'g5-throat-singers.jpg', credit: 'CREDIT', focus: '50% 40%',
      tall: 220,
      cap: 'Inuit throat singers perform face to face, so each one can hear and follow the other.'
    },
    body: [
      'Two women stand face to face, so close that they can almost touch. One begins a low, rhythmic sound, breathing in and out. The other answers with a different sound that fits into the gaps. Their voices weave together faster and faster, like two people skipping one rope. Then one of them laughs, and the song is over. She has lost the game.',
      { h: 'A game and a song' },
      'This is <b>katajjaq</b>, Inuit throat singing. It is often described as both a song and a contest. The two singers repeat short patterns of sounds, some using the voice and some using only breath. The first one to run out of breath, stumble or laugh loses. Many patterns copy sounds from the land, such as geese, the wind, a river or a saw cutting through snow.',
      { fig: '<text class="lb" x="6" y="16">Two voices taking turns (pattern)</text>' +
          [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var x = 10 + i * 36; return '<rect class="' + (i % 2 ? 'h' : 'k') + '" x="' + x + '" y="' + (i % 2 ? 66 : 34) + '" width="30" height="22" rx="4"/>'; }).join('') +
          '<text class="n" x="6" y="114">singer 1: low sounds on the beat</text><text class="n" x="6" y="130">singer 2 (shaded): sounds in the gaps</text>',
        tall: 136, cap: 'Each singer fills the other’s gaps, so the sound never stops.' },
      { h: 'Where it comes from' },
      'Throat singing was traditionally done by women. It could pass the time in the long winter while the men were away hunting, and it was sometimes used to soothe babies. Girls learned it from their mothers, grandmothers and aunts by listening and copying.',
      'In the 1900s, many missionaries discouraged throat singing, and in some communities it was almost lost. Elders who still knew the songs kept them alive. Since the 1980s, a <b>revival</b> has grown. Young Inuit women have learned from Elders, and some now perform on stages around the world, mixing throat singing with other kinds of music.',
      { box: 'Did you know?', text: 'In 2014, Québec named katajjaq a part of its cultural heritage, the first heritage designation of its kind in the province. It was requested by Inuit throat singers in Nunavik.' },
      { h: 'Listening closely' },
      'Throat singing teaches the singers to listen to each other with great care. Each one must hear the other’s rhythm and fit her sounds into it. For many Inuit, it is also a way to feel connected to the land, to family and to the women who sang before them. When two singers laugh at the end of a song, the laughter is part of the music, too. It shows the joy of a game shared between friends.'
    ],
    guide: { before: 'If possible, find and listen to a short recording of Inuit throat singing made by Inuit performers. Teach <b>katajjaq</b> (ka-TA-jak) and <b>revival</b>. Find Nunavik and Nunavut on a map.',
      after: 'Why might it matter so much that young Inuit learned throat singing from Elders? What tradition in your family would you want to keep alive?' },
    words: [['katajjaq', 'Inuit throat singing, often done by two women as a game'], ['revival', 'bringing something back into use']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Geese make sounds.', 'Katajjaq is an Inuit singing game that was almost lost and is now being revived.', 'Missionaries came north.', 'Women sang lullabies.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['how the two singers take turns and fill the gaps', 'the notes of a piano', 'where Nunavik is', 'how loud the singing is'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Like two people skipping one rope.” What does this comparison help you picture?',
        opts: ['two singers moving in perfect rhythm together', 'a playground game', 'a rope', 'a race'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the events in the history of throat singing.',
        items: ['Women sing katajjaq in winter camps.', 'Missionaries discourage it.', 'Elders keep the songs alive.', 'A revival grows and young women perform.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which is a cultural value shown in the text?',
        opts: ['learning from Elders', 'winning at all costs', 'singing alone', 'staying silent'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Re</b>vival has the prefix re-. What does re- mean?',
        opts: ['again', 'not', 'before', 'small'], a: 0 },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How did events in the 1900s affect throat singing, and how is it connected to life today?',
        a: 'Missionaries discouraged it and it was almost lost. Today, young Inuit women learn it from Elders and perform it, which keeps the culture strong.', look: 'connects the historical event to present-day practice' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'What is one reason you might choose to read or listen to more about throat singing? Where could you find texts by Inuit creators?',
        a: 'I want to hear what it sounds like. I could look for recordings and interviews by Inuit throat singers or books by Inuit authors at the library.', look: 'a purpose for reading and a sensible source by Inuit creators' }
    ]
  });

  P.add({
    id: 'g5-tryout', subject: 'story', form: 'Short story',
    title: 'The Worst Tryout Ever',
    deck: 'Dev has one chance to make the basketball team. Nothing goes to plan.',
    hero: {
      photo: 'g5-basketball.jpg', credit: 'CREDIT', focus: '50% 45%',
      tall: 210,
      cap: 'A basketball hoop in a school gym.'
    },
    body: [
      'Dev had practised for weeks. He had dribbled in the driveway until the streetlights came on. He had watched videos of famous players until his mother took his tablet away. He was ready. At least, he thought he was ready.',
      'The tryout began badly. On the first drill, Dev bent down to tie his shoe, and the ball he had tucked under his arm rolled across the gym and knocked over the coach’s coffee. Coach Abara looked at the brown puddle spreading toward her clipboard. “Interesting start,” she said.',
      { fig: '<path class="k" d="M10 150 Q80 30 150 40 Q220 50 290 20"/>' + [[30, 128, 'coffee spill'], [90, 66, 'missed shot'], [150, 40, 'the fall'], [210, 46, 'helps a player'], [270, 26, 'the list']].map(function (t) { return '<circle class="a" cx="' + t[0] + '" cy="' + t[1] + '" r="5"/><text class="n" x="' + t[0] + '" y="' + (t[1] + 22) + '" text-anchor="middle">' + t[2] + '</text>'; }).join('') +
          '<text class="lb" x="10" y="176">Dev’s tryout: things get worse, then better</text>',
        tall: 182, cap: 'A plot line of the story’s main events.' },
      'Things did not improve. During the shooting drill, Dev’s first shot missed the basket, the backboard and very nearly the gym. His second shot hit the scoreboard. Someone in the bleachers giggled. Dev felt his ears turn bright red, the way they always did when he wanted to vanish.',
      'Then came the <b>scrimmage</b>. Dev raced for a loose ball, slipped on the last drop of coffee and slid on his stomach all the way to the baseline. He lay there for a moment, staring at the ceiling lights, and wondered whether it was too late to join the chess club.',
      'But as he got up, he saw that a smaller player named Rosa had been knocked down, too. She was holding her ankle. Dev forgot about his own embarrassment. He helped her up, walked her to the bench and found her an ice pack. Then he went back on the court and passed the ball every time he had a chance, because his passes, at least, went where he wanted them to.',
      'The next morning, the team list was taped to the gym door. Dev read it three times. His name was at the bottom. Beside it, Coach Abara had written: <b>Teamwork</b>. We can fix the shooting.',
      'Dev grinned. Then he went home and practised his shots, well away from anyone’s coffee.',
      'At the first practice, Rosa sat on the bench with her ankle wrapped. “Nice slide yesterday,” she said. Dev laughed, for the first time since the tryout. “Thanks,” he said. “I’ve been practising.”'
    ],
    guide: { before: 'Ask about a time something went wrong in front of others. Point out that this story is meant to be funny. Teach <b>scrimmage</b> (a practice game) and <b>bleachers</b>.',
      after: 'Why did Dev make the team even though he played badly? What does the coach value? Do you agree?' },
    words: [['scrimmage', 'a practice game'], ['teamwork', 'working well with others toward one goal']],
    qs: [
      { k: 'choice', code: 'C1.6', q: 'This story is told in the third person. What is one advantage?',
        opts: ['The narrator can describe Dev from the outside, which adds to the humour.', 'Dev speaks directly to the reader.', 'It is a true story.', 'We never learn Dev’s feelings.'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['The ball knocks over the coffee.', 'Dev’s shot hits the scoreboard.', 'Dev helps Rosa.', 'Dev reads the team list.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'On the plot line, where does the story turn better?',
        opts: ['when Dev helps a player', 'at the coffee spill', 'at the missed shot', 'it never does'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“His first shot missed the basket, the backboard and very nearly the gym.” How does the author make this funny?',
        opts: ['by exaggerating how bad the shot was', 'by using a rhyme', 'by giving a fact', 'by asking a question'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Dev’s ears turn red?',
        opts: ['He was embarrassed.', 'The gym was hot.', 'He was sick.', 'He was angry at Rosa.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>scrimmage</b> is …',
        opts: ['a practice game', 'a kind of shoe', 'a coffee cup', 'a team list'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did Coach Abara put Dev on the team? Use evidence from the story.',
        a: 'She saw him help Rosa and pass the ball to teammates. She wrote “Teamwork,” so she values that more than shooting, which can be fixed.', look: 'an inference supported by the coach’s note and Dev’s actions' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'When Dev slid across the floor, what did you predict would happen? What clues made you think so?',
        a: 'I predicted he would not make the team, because everything was going wrong. I was surprised when he helped Rosa and made it.', look: 'a prediction with clues, and whether it was right' }
    ]
  });

  P.add({
    id: 'g5-winter-poems', subject: 'arts', form: 'Poems',
    title: 'Two Winter Poems',
    deck: 'How poets use imagery and comparisons to help us see, hear and feel',
    plain: true,
    hero: {
      photo: 'g5-snowy-forest.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A forest after a snowfall. Poets often try to capture a moment like this in a few words.'
    },
    body: [
      'Poems often use few words, so each one matters. Poets use <b>imagery</b>, words that help you see, hear, smell, taste or feel something. They also use comparisons. A simile compares two things using like or as. A metaphor says one thing is another. Read these two original poems about the same season.',
      { h: 'First Snow' },
      'Overnight the street went quiet,<br>as if someone had pressed mute.<br>The cars wear white hats.<br>The fence posts wear white hats.<br>Even the mailbox, that grumpy box,<br>has a soft white hat pulled low.<br>I step outside and the snow squeaks<br>like a brand-new pair of shoes.',
      { fig: '<text class="lb" x="6" y="16">Kinds of imagery</text>' + [['see', 'white hats'], ['hear', 'snow squeaks'], ['feel', 'the cold bites'], ['compare', 'like new shoes']].map(function (r, i) {
            var y = 30 + i * 30; return '<rect class="k" x="6" y="' + y + '" width="80" height="24" rx="4"/><text class="lb" x="46" y="' + (y + 16) + '" text-anchor="middle">' + r[0] + '</text><text class="n" x="96" y="' + (y + 16) + '">' + r[1] + '</text>';
          }).join(''),
        tall: 152, cap: 'Examples of imagery from the poems.' },
      { h: 'February' },
      'February is a long grey hallway<br>with no windows and no doors.<br>The cold bites at my fingers.<br>The wind talks in a whisper<br>that I cannot understand.<br>But at the very end of the hallway,<br>under the ice on the creek,<br>water is moving, moving,<br>practising the word <i>spring</i>.',
      { h: 'Reading the poems' },
      'Both poems are about winter, but they create different moods. “First Snow” is playful. The snow gives everything a hat, which is a funny picture, and the poet uses <b>personification</b> when the mailbox becomes “grumpy.” “February” feels heavier. The metaphor of a long grey hallway makes winter seem endless. The ending brings hope: the moving water is getting ready for spring.',
      { box: 'Try it', text: 'Choose a season or a kind of weather. Write four lines using one simile, one sound and one thing that acts like a person.' },
      'Notice, too, how the poets use line breaks. A new line makes the reader pause for a moment, so the most important words often come at the end of a line or stand alone. When you read a poem aloud, let those pauses happen. Read each poem twice: once to understand it, and once to enjoy how it sounds.'
    ],
    guide: { before: 'Read each poem aloud slowly, twice. Teach <b>imagery</b>, <b>simile</b>, <b>metaphor</b> and <b>personification</b>, using one example from each poem.',
      after: 'Which poem matches how you feel about winter? Write your own short poem about one moment in winter.' },
    words: [['imagery', 'words that help you see, hear, feel, smell or taste'], ['personification', 'giving human qualities to something that is not human']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'How are these poems different from a report?',
        opts: ['They use short lines and imagery to create a feeling.', 'They give numbered steps.', 'They have a glossary.', 'They give facts about weather.'], a: 0 },
      { k: 'table', code: 'C3.1', q: 'Name the device used in each line.', cols: ['Line', 'Simile, metaphor or personification?'],
        rows: [['the snow squeaks like a brand-new pair of shoes', null], ['February is a long grey hallway', null], ['the wind talks in a whisper', null]],
        a: [[null, 'simile'], [null, 'metaphor'], [null, 'personification']] },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does “First Snow” repeat “wear white hats”?',
        opts: ['to build a playful pattern', 'because the poet forgot', 'to give a fact', 'to show a sad mood'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the chart of imagery, “snow squeaks” appeals to which sense?',
        opts: ['hearing', 'sight', 'taste', 'smell'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'In “February,” what does “practising the word spring” suggest?',
        opts: ['Spring is coming soon.', 'The water is frozen.', 'Someone is singing.', 'It is summer.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The <b>mood</b> of a poem is …',
        opts: ['the feeling it creates', 'its title', 'its length', 'its rhyme'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Compare the moods of the two poems. Give one word from each poem that creates its mood.',
        a: '“First Snow” is playful; “grumpy” and “white hats” make it funny. “February” is heavy and sad; “grey hallway” makes winter feel endless.', look: 'names each mood and supports it with words from each poem' },
      { k: 'lines', code: 'D2.3', n: 4, q: 'Write four lines about a season. Use one simile and one example of personification.',
        a: 'The autumn leaves fall like tired kites.\nThe wind grabs them and runs.\nThe pumpkins grin on the steps.\nThe sky pulls on its grey sweater.', look: 'four lines with a simile (like or as) and personification, in the child’s own voice' }
    ]
  });

  P.add({
    id: 'g5-accessible', subject: 'social', form: 'Explanation',
    title: 'A School for Everyone',
    deck: 'How accessible design removes barriers, and why it helps more people than you might think',
    hero: {
      photo: 'g5-ramp.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 210,
      cap: 'A ramp beside stairs at a building entrance. A ramp lets people who use wheelchairs, walkers or strollers get in.'
    },
    body: [
      'Matteo uses a wheelchair. At his old school, the library was up a flight of stairs, so he had to wait for someone to bring him books. At his new school, he rolls up a gentle ramp, presses a large button to open the door and picks out his own books. Matteo has not changed. The building has.',
      { h: 'Barriers and access' },
      'A <b>barrier</b> is anything that makes it hard for someone to take part. Some barriers are physical, such as stairs, narrow doorways or high counters. Some are about information, such as signs that are hard to read or videos with no captions. Some are about attitudes, such as when people assume someone cannot do something. <b>Accessibility</b> means removing these barriers so that everyone can take part.',
      { fig: '<path class="k" d="M10 130 H90 V110 H110 V90 H130 V70 H150 V50 H290"/><path class="a" d="M10 136 L290 56"/>' +
          D.label(20, 100, 'stairs', 100, 110) + D.label(170, 120, 'ramp: a gentle slope', 200, 82) +
          '<text class="n" x="10" y="166">A ramp rises slowly: about 1 cm for every 12 cm forward.</text>',
        tall: 172, cap: 'Stairs and a ramp reach the same height in different ways.' },
      { h: 'Help for many' },
      'In Ontario, a law passed in 2005 set out to make the province accessible. Since then, many schools and public buildings have added ramps, elevators, automatic doors, accessible washrooms and signs in braille.',
      'Something surprising happens when barriers are removed: many people benefit, not just the ones the change was made for. This is sometimes called the curb-cut effect. Curb cuts, the small ramps where a sidewalk meets the street, were made for wheelchair users. But they also help people pushing strollers, pulling suitcases, riding bikes or using walkers. Captions on videos help people who are Deaf or hard of hearing, and also people learning English and anyone watching in a noisy room.',
      { box: 'Universal design', text: 'Universal design means planning a space or a tool from the start so that as many people as possible can use it, without needing changes later.' },
      { h: 'Students can notice' },
      'Students can be accessibility checkers. Walk through your school and look for barriers. Is there a way into every room without stairs? Can a short person reach the water fountain? Are signs clear and easy to read? Sharing what you notice with your principal can help make your school a place where everyone belongs.'
    ],
    guide: { before: 'Ask the child to think about how they would enter the school if they could not use stairs. Teach <b>barrier</b>, <b>accessibility</b> and <b>universal design</b>. Use people-first, respectful language.',
      after: 'Do an accessibility walk around your home or school. What barriers do you notice? Which change would help the most people?' },
    words: [['barrier', 'something that blocks or makes it hard to take part'], ['accessibility', 'removing barriers so everyone can take part']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Matteo likes books.', 'Removing barriers makes places accessible, and this helps many people.', 'Stairs are hard to climb.', 'Captions are useful.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Sort the barriers.', cols: ['Barrier', 'Physical, information or attitude?'],
        rows: [['a narrow doorway', null], ['a video with no captions', null], ['assuming someone cannot do something', null]], a: [[null, 'physical'], [null, 'information'], [null, 'attitude']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram compare?',
        opts: ['stairs and a ramp that reach the same height', 'two kinds of wheelchairs', 'a curb and a road', 'two schools'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: '“Matteo has not changed. The building has.” What does this mean?',
        opts: ['The problem was the building, not Matteo.', 'Matteo got a new wheelchair.', 'The library moved.', 'Matteo grew taller.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Curb cuts, the small ramps where a sidewalk meets the street, were made for wheelchair users.” The commas set off …',
        opts: ['words that explain what curb cuts are', 'a list', 'a question', 'a quotation'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Access</b>ible and <b>access</b>ibility share a base word. What does <b>-ible</b> mean?',
        opts: ['able to be', 'without', 'again', 'the study of'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What is the curb-cut effect? Explain it with an example from the text.',
        a: 'When a barrier is removed for one group, many people benefit. Curb cuts were made for wheelchairs but also help people with strollers and suitcases.', look: 'defines the effect and gives an example' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'The text asks you to be an accessibility checker. What thinking skills would you use to check your school?',
        a: 'I would look closely at each space, imagine using it in a wheelchair or with poor eyesight, and ask questions about what might be hard.', look: 'names thinking skills (observe, imagine another perspective, question) applied to the task' }
    ]
  });

  P.add({
    id: 'g5-digestion', subject: 'science', form: 'Explanation',
    title: 'The Journey of a Sandwich',
    deck: 'Follow your lunch through the digestive system, from first bite to last stop',
    hero: {
      photo: 'g5-sandwich.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A sandwich. Over the next day or so, your body will break it down into parts small enough to use.'
    },
    body: [
      'You take a bite of a cheese and lettuce sandwich. For you, lunch is over in a few minutes. For your body, the work has just begun. Your <b>digestive system</b> will spend the next day or more breaking that sandwich into tiny pieces that your cells can use.',
      { h: 'Mouth and throat' },
      'Digestion starts in your mouth. Your teeth cut and grind the food, and saliva, or spit, softens it and starts breaking down the bread. Your tongue pushes the soft lump to the back of your throat, and you swallow. Muscles in a tube called the esophagus squeeze the food down to your stomach, a bit like squeezing toothpaste along a tube.',
      { fig: '<path class="k" d="M150 6 V50"/><path class="k" d="M140 50 Q120 54 124 72 Q130 96 166 92 Q190 86 186 66 Q182 52 160 52"/>' +
          '<path class="t" d="M166 92 Q200 104 180 116 Q120 120 140 132 Q200 140 170 150 Q120 154 140 162"/><path class="a" d="M100 104 V164 H210 V104 Q210 96 200 96"/>' +
          D.label(166, 14, 'esophagus', 152, 30) + D.label(196, 56, 'stomach', 184, 66) + D.label(6, 96, 'large intestine', 100, 120) + D.label(214, 148, 'small intestine', 176, 140),
        tall: 170, cap: 'The main parts of the digestive system.' },
      { h: 'The stomach' },
      'Your stomach is a stretchy bag of muscle. It churns the food and mixes it with strong juices that break it down further. After a few hours, the sandwich has become a thick liquid.',
      { h: 'The small intestine' },
      'Next, the liquid moves into the small intestine. It is narrow but very long, about 6 metres in an adult. Here, most of the <b>nutrients</b> from the food pass through the walls into the blood. The blood then carries them to every part of the body, where they are used for energy, growth and repair.',
      { box: 'Did you know?', text: 'The walls of the small intestine are covered in tiny finger-shaped bumps. They give it a huge surface for taking in nutrients.' },
      { h: 'The last stop' },
      'What is left moves into the large intestine. It takes back water and forms the waste into solid stool, which leaves the body when you go to the bathroom. Fibre from vegetables and whole grains helps keep everything moving. The digestive system works with the circulatory system, which carries the nutrients away, and with the muscles that keep the food moving. Your body is a team, and every lunch puts it to work. Chewing slowly, drinking water and eating plenty of fruit, vegetables and whole grains all help the team do its job well, from the first bite to the last stop.'
    ],
    guide: { before: 'Trace the path on the diagram with a finger, saying each part. Teach <b>digestion</b>, <b>esophagus</b> and <b>nutrient</b>. Squeeze a tube of toothpaste to show how muscles push food.',
      after: 'Which body systems work with the digestive system? What foods help your digestive system do its job?' },
    words: [['digestive system', 'the organs that break down food'], ['nutrients', 'the parts of food the body uses for energy, growth and repair']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Sandwiches are healthy.', 'The digestive system breaks food down in steps so the body can use its nutrients.', 'The stomach is a bag.', 'Saliva is spit.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the path of the sandwich.',
        items: ['mouth', 'esophagus', 'stomach', 'small intestine', 'large intestine'], show: [2, 0, 4, 1, 3] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which part is right after the esophagus?',
        opts: ['the stomach', 'the large intestine', 'the mouth', 'the small intestine'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'What happens in each part?', cols: ['Part', 'What happens there'],
        rows: [['mouth', null], ['small intestine', null], ['large intestine', null]],
        a: [[null, 'Teeth grind food and saliva softens it.'], [null, 'Nutrients pass into the blood.'], [null, 'Water is taken back and waste is formed.']] },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author compare the esophagus to a tube of toothpaste?',
        opts: ['to help you picture muscles squeezing food along', 'to talk about brushing teeth', 'to describe the colour', 'to make you hungry'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> give it a huge surface.” What does <b>they</b> mean?',
        opts: ['the finger-shaped bumps', 'the nutrients', 'the teeth', 'the muscles'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the journey of the sandwich in two or three sentences.',
        a: 'The mouth grinds the sandwich, and the esophagus pushes it to the stomach, which turns it to liquid. Nutrients go into the blood in the small intestine, and the large intestine takes back water and forms waste.', look: 'the main steps in order, in their own words' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about eating or the body that helped you read this text?',
        a: 'I knew that food goes to the stomach and that we need nutrients to grow. That helped me follow what happens next in the intestines.', look: 'names prior knowledge and how it helped' }
    ]
  });
  P.add({
    id: 'g5-reflexes', subject: 'science', form: 'Explanation',
    title: 'Faster Than Thinking',
    deck: 'How your nervous system sends messages, and why some actions happen before you decide',
    hero: {
      photo: 'g5-reflex.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A doctor tests a reflex by tapping just below the knee. The leg kicks before the person decides to move it.'
    },
    body: [
      'You touch a hot pan and your hand jerks away before you even feel the pain. A ball flies at your face and you blink. How can your body act so fast? The answer is a team of messengers called the <b>nervous system</b>.',
      { h: 'The body’s messengers' },
      'Your nervous system is made of your brain, your spinal cord and billions of nerve cells that reach into every part of your body. Nerve cells carry messages as tiny electrical signals. Some messages travel from your senses to your brain: this is hot, this is loud, this is soft. Other messages travel from your brain to your muscles: lift your arm, kick the ball, smile.',
      { fig: '<circle class="k" cx="60" cy="30" r="22"/><path class="k" d="M60 52 V150"/><path class="t" d="M60 120 H200 V150 M60 100 H230"/>' +
          '<rect class="k" x="196" y="150" width="60" height="20" rx="4"/>' + D.arrow(230, 100, 150, 100, 'a') + D.arrow(70, 120, 180, 120, 'a') +
          D.label(90, 24, 'brain') + D.label(4, 180, 'spinal cord', 60, 150) + D.label(214, 92, '1 “hot!”') + D.label(100, 140, '2 “pull away!”') + D.label(200, 186, 'hand on hot pan', 226, 170),
        tall: 190, cap: 'In a reflex, the message goes to the spinal cord and straight back to the muscle.' },
      { h: 'The shortcut' },
      'Most of the time, messages go all the way to the brain, where you decide what to do. But when there is danger, waiting could hurt you. So your body uses a shortcut called a <b>reflex</b>. The message from your hand travels only as far as your spinal cord, which sends a message straight back to your arm muscles: pull away! Only afterward does a message reach your brain, and then you feel the pain and say, “Ouch!”',
      { box: 'Try it', text: 'Ask a partner to hold a ruler just above your open fingers and drop it without warning. Catch it as fast as you can. The number where you catch it shows your reaction time. Catching is not a reflex: your brain has to decide.' },
      { h: 'Speed and protection' },
      'Some nerve signals travel faster than 100 metres per second, faster than a race car. Reflexes protect you many times a day. You blink when dust flies toward your eye, you sneeze when something tickles your nose, and you catch your balance when you trip.',
      'Because the brain and spinal cord are so important, they are well protected. Your skull covers your brain, and the bones of your spine surround your spinal cord. A helmet adds even more protection when you ride, skate or ski. Look after your nervous system, and it will keep looking after you.'
    ],
    guide: { before: 'Try the ruler-drop test together. Teach <b>nervous system</b>, <b>nerve</b> and <b>reflex</b>. Trace the arrows in the diagram, saying “message in, message out.”',
      after: 'Why is it helpful that some actions skip the brain? How does the nervous system work with the muscles and the skeleton?' },
    words: [['nervous system', 'the brain, spinal cord and nerves, which carry messages'], ['reflex', 'an action the body does automatically, without deciding']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Pans can be hot.', 'The nervous system carries messages, and reflexes use a shortcut to protect us quickly.', 'Helmets protect the brain.', 'Rulers measure reaction time.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps of a reflex.',
        items: ['The hand touches the hot pan.', 'A message goes to the spinal cord.', 'A message goes back to the arm.', 'The brain feels the pain.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do you feel the pain after you pull away?',
        opts: ['The message reaches the brain after the reflex.', 'The pan cools down.', 'Your hand is numb.', 'Pain is slow to start.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Reflex or decision? Fill in the chart.', cols: ['Action', 'Reflex or decision?'],
        rows: [['blinking when dust flies at you', null], ['catching a dropped ruler', null], ['sneezing', null]], a: [[null, 'reflex'], [null, 'decision'], [null, 'reflex']] },
      { k: 'choice', code: 'C1.5', half: true, q: '“Faster than a race car.” Why does the author use this comparison?',
        opts: ['to help you imagine the speed', 'to talk about cars', 'to give a rule', 'to describe pain'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Your <b>reaction</b> time is how fast you …',
        opts: ['respond to something', 'grow', 'think about a story', 'run a race'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the difference between a reflex and a decision. Use an example of each.',
        a: 'A reflex happens without thinking, like pulling away from a hot pan. A decision goes through the brain first, like catching a ruler.', look: 'a clear difference with one example of each' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Did the “Try it” box help you understand the text? How?',
        a: 'Yes. Doing the ruler test showed me that catching takes time because my brain has to decide, which helped me understand why reflexes are faster.', look: 'explains how an activity or strategy confirmed their understanding' }
    ]
  });

  P.add({
    id: 'g5-microplastics', subject: 'geography', form: 'Report',
    title: 'Tiny Plastic, Big Lakes',
    deck: 'How small pieces of plastic end up in the Great Lakes, and what people are doing about it',
    hero: {
      photo: 'g5-plastic-beach.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 210,
      cap: 'Plastic litter on a shoreline. Over time, sun and waves break plastic into smaller and smaller pieces.'
    },
    body: [
      'The Great Lakes hold about one fifth of all the fresh surface water on Earth. More than 30 million people in Canada and the United States get their drinking water from them. But scientists who skim the lakes with fine nets have found something worrying: billions of tiny bits of plastic.',
      { h: 'What are microplastics?' },
      '<b>Microplastics</b> are pieces of plastic smaller than five millimetres, about the size of a grain of rice or smaller. Some are made small on purpose, such as the tiny beads once used in face washes. Most come from bigger plastic objects, such as bottles, bags and food wrappers, that break into pieces in the sun and waves. Plastic does not rot away like a leaf. It just breaks into smaller and smaller bits.',
      { fig: steps(10, [['litter', 'bags, bottles'], ['wash', 'rain, storm drains'], ['break', 'sun and waves']], 86) +
          steps(86, [['float', 'tiny pieces'], ['eaten', 'by fish, birds'], ['spread', 'through the lake']], 86) +
          '<path class="a" d="M257 54 V66 Q257 70 150 70 Q43 70 43 82"/>',
        tall: 136, cap: 'How plastic litter becomes microplastics in a lake.' },
      { h: 'Hidden sources' },
      'Some microplastics come from places you might not expect. Clothes made of fleece and polyester shed tiny threads, called microfibres, every time they are washed. The threads flow down the drain, and many are too small for treatment plants to catch. Car tires wear down on roads and leave rubbery dust that rain washes into storm drains, then into rivers and lakes.',
      { box: 'Did you know?', text: 'Canada banned microbeads in toiletries such as face scrubs and toothpaste in 2018, and it has banned some single-use plastics, such as checkout bags and straws.' },
      { h: 'Why it matters' },
      'Fish, birds and other animals can mistake microplastics for food. The plastic can fill their stomachs without giving them any <b>nutrition</b>. Scientists are still studying how microplastics affect people and wildlife over many years.',
      { h: 'What can be done' },
      'People are trying many solutions. Some communities hold shoreline cleanups to pick up litter before it breaks down. Inventors have designed filters that catch microfibres in washing machines, and small floating bins that skim plastic from marinas. You can help, too, by carrying a reusable bottle, choosing fewer plastic packages and putting litter in the right bin. Every piece of plastic that stays out of the lake is one that will never become a thousand tiny ones.'
    ],
    guide: { before: 'Find the five Great Lakes on a map. Teach <b>microplastic</b> (micro = very small). Look at the label on a fleece jacket to see what it is made of.',
      after: 'Which source of microplastics surprised you most? Make a plan for one change your family could make this month.' },
    words: [['microplastics', 'pieces of plastic smaller than five millimetres'], ['nutrition', 'the good things in food that the body needs']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Great Lakes are big.', 'Microplastics from many sources are polluting the Great Lakes, and people are working on solutions.', 'Fleece is warm.', 'Canada banned straws.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps.',
        items: ['Litter is dropped.', 'Rain washes it into drains.', 'Sun and waves break it.', 'Fish and birds eat it.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.1', half: true, q: 'The prefix <b>micro-</b> in microplastic means …',
        opts: ['very small', 'very large', 'many', 'under water'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Match each source with a solution from the text.', cols: ['Source', 'Solution'],
        rows: [['fleece clothes in the wash', null], ['litter on the shore', null], ['plastic bottles', null]],
        a: [[null, 'washing machine filters'], [null, 'shoreline cleanups'], [null, 'reusable bottles']] },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>It</b> just breaks into smaller and smaller bits.” What does <b>it</b> mean?',
        opts: ['plastic', 'a leaf', 'the lake', 'a net'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are microfibres hard to stop?',
        opts: ['They are too small for treatment plants to catch.', 'They float in the air.', 'They are made of leaves.', 'They are banned.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'The last sentence says one piece kept out of the lake “will never become a thousand tiny ones.” What conclusion does this support?',
        a: 'It is best to stop plastic before it reaches the lake, because each piece breaks into many tiny pieces that are much harder to clean up.', look: 'a conclusion about prevention supported by the idea of breaking down' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Name one thing in your home that could add microplastics to the water. What could you do about it?',
        a: 'My fleece sweater sheds fibres in the wash. I could wash it less often or ask my family about a filter for the washing machine.', look: 'a real item from their life and a sensible action' }
    ]
  });

  P.add({
    id: 'g5-green-bin', subject: 'science', form: 'Explanation',
    title: 'From Scraps to Soil',
    deck: 'What happens to the food scraps in a green bin, and why it matters',
    hero: {
      photo: 'g5-compost.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Compost: food scraps and leaves breaking down into dark, crumbly soil.'
    },
    body: [
      'Banana peels, apple cores, coffee grounds and eggshells: in many Ontario towns, these go into a green bin instead of the garbage. Once a week, a truck takes them away. But where do they go, and why does it matter?',
      { h: 'A problem in the landfill' },
      'When food is buried in a <b>landfill</b>, it is packed so tightly that there is almost no air. Without air, it rots slowly and gives off methane, a gas that traps heat in the atmosphere and adds to climate change. Food also takes up space. In many Canadian homes, food scraps make up a large part of what is thrown away.',
      { fig: '<path class="k" d="M150 20 A60 60 0 1 1 149 20"/>' + D.arrow(204, 52, 210, 66, 'a') + D.arrow(206, 128, 194, 140, 'a') + D.arrow(96, 140, 90, 126, 'a') + D.arrow(94, 54, 106, 42, 'a') +
          '<text class="lb" x="150" y="12" text-anchor="middle">food scraps</text><text class="lb" x="222" y="100">tiny living things</text><text class="n" x="222" y="114">break them down</text>' +
          '<text class="lb" x="150" y="196" text-anchor="middle">compost</text><text class="lb" x="78" y="100" text-anchor="end">plants grow</text><text class="n" x="78" y="114" text-anchor="end">and make food</text>',
        tall: 200, cap: 'Composting returns nutrients from food to the soil in a cycle.' },
      { h: 'The work of decomposers' },
      'At a composting site, the scraps are mixed with leaves and wood chips and turned often to let air in. Billions of tiny living things go to work: bacteria, fungi, worms and insects. These <b>decomposers</b> eat the scraps and break them into simpler materials. As they work, the pile heats up, sometimes to more than 60°C, hot enough to kill weed seeds and germs.',
      'After a few months, the scraps have become <b>compost</b>, a dark, crumbly material that smells like a forest floor. Farmers and gardeners add it to soil. It returns nutrients that plants need, and it helps soil hold water.',
      { box: 'Did you know?', text: 'Some cities also capture the gas made by food scraps in sealed tanks and use it to make electricity or fuel for trucks.' },
      { h: 'Using less, wasting less' },
      'Composting is better than burying food, but wasting less food is better still. Planning meals, storing food well and eating leftovers all mean fewer scraps in the first place. Then whatever is left can go back to the soil, ready to grow next year’s apples and bananas.',
      'You can also compost at home. A backyard bin needs a mix of “greens,” such as fruit and vegetable scraps and grass, and “browns,” such as dry leaves and shredded paper. Keep it damp like a wrung-out sponge and turn it every week or two. Meat, dairy and oily foods should stay out of a backyard bin, because they smell and attract animals, but many city green bins can take them.'
    ],
    guide: { before: 'Look in your kitchen for food scraps that could be composted. Teach <b>decomposer</b>, <b>compost</b> and <b>landfill</b>. Follow the cycle diagram around with a finger.',
      after: 'What does your family do with food scraps now? What is one way you could waste less food this week?' },
    words: [['landfill', 'a place where garbage is buried'], ['decomposers', 'living things that break down dead plants and animals'], ['compost', 'rotted plant and food material used to enrich soil']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Green bins are green.', 'Composting turns food scraps into soil instead of harmful landfill waste, though wasting less food is even better.', 'Worms live in soil.', 'Trucks pick up bins.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Why is the diagram drawn as a circle?',
        opts: ['It shows a cycle that repeats.', 'Bins are round.', 'It shows the Earth.', 'It is a clock.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does a compost pile get hot?',
        opts: ['The decomposers are working.', 'The sun heats it.', 'Trucks drive over it.', 'It is on fire.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare.', cols: ['', 'In a landfill', 'In compost'],
        rows: [['Is there air?', null, null], ['What does it make?', null, null]], a: [[null, 'almost none', 'yes, it is turned often'], [null, 'methane gas', 'rich soil (compost)']] },
      { k: 'choice', code: 'B3.3', half: true, q: '“Banana peels, apple cores, coffee grounds and eggshells: …” What does the colon do here?',
        opts: ['It comes after a list and leads into the main idea.', 'It ends the sentence.', 'It shows speaking.', 'It joins two names.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Decomposers</b> …',
        opts: ['break things down', 'build houses', 'grow seeds', 'collect garbage'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why food in a landfill is a problem. Give a cause and an effect.',
        a: 'Food in a landfill has no air, so it rots slowly and makes methane. Methane traps heat and adds to climate change.', look: 'cause (no air) and effect (methane, climate change)' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'The author says wasting less is “better still.” Why? Draw a conclusion.',
        a: 'If less food is wasted, fewer scraps need to be collected, trucked and composted, and the food we paid for gets eaten.', look: 'a supported conclusion about reducing waste' }
    ]
  });

  P.add({
    id: 'g5-sir-adam-beck', subject: 'science', form: 'Explanation',
    title: 'Falling Water, Glowing Lights',
    deck: 'How the Niagara River makes electricity for Ontario homes',
    hero: {
      photo: 'g5-hydro-station.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A hydroelectric generating station on the Niagara River. Water from above the falls is used to make electricity.'
    },
    body: [
      'Every second, huge amounts of water pour over Niagara Falls. But at night and in the winter, much less water goes over the edge than you might think. Where does the rest go? Some of it travels through enormous tunnels under the city of Niagara Falls to make electricity.',
      { h: 'Energy in moving water' },
      'Water high above the falls has stored energy because of its height. As it falls, that stored energy becomes the energy of motion. A hydroelectric station captures some of that motion and turns it into electricity. The word <b>hydroelectric</b> comes from hydro, meaning water, and electric.',
      { fig: '<path class="k" d="M6 30 H90 L120 150 H294"/><path class="t" d="M90 34 Q100 90 150 120"/>' + D.ripple(10, 80, 26) +
          '<circle class="a" cx="170" cy="130" r="18"/><path class="a" d="M170 112 V148 M152 130 H188"/><rect class="k" x="196" y="104" width="40" height="30" rx="4"/>' +
          D.arrow(236, 118, 290, 90, 'a') +
          D.label(6, 14, 'water stored up high') + D.label(140, 172, 'turbine spins', 170, 148) + D.label(200, 96, 'generator', 216, 104) + D.label(240, 76, 'to homes') + D.label(4, 92, 'tunnel', 100, 80),
        tall: 176, cap: 'Falling water spins a turbine, which turns a generator.' },
      { h: 'Inside the station' },
      'Water from the river flows down through the tunnels to the generating station, which sits much lower, at the bottom of the gorge. The rushing water strikes the blades of a <b>turbine</b>, a giant wheel, and makes it spin. The turbine is joined to a generator. Inside the generator, magnets spin past coils of wire, and this makes electricity. The electricity flows through power lines to cities and towns.',
      'This is a chain of energy transformations: stored energy in high water becomes motion, motion becomes electrical energy, and in your home, electrical energy becomes light, heat and sound.',
      { box: 'Did you know?', text: 'Canada and the United States share the Niagara River. A treaty sets how much water must flow over the falls during the day in the tourist season, so visitors can still enjoy the view.' },
      { h: 'Clean, but not perfect' },
      'Hydroelectricity is <b>renewable</b>, because rain and snow keep filling the rivers, and it makes almost no air pollution. But dams and reservoirs can flood land, change rivers and affect fish and the people who depend on them. Some large dams in Canada were built on First Nations lands without their agreement. Today, many new projects are planned in partnership with First Nations. Every energy source has costs and benefits, and choosing well means weighing both.'
    ],
    guide: { before: 'Pour water from a jug onto a small toy pinwheel or water wheel, if you have one. Teach <b>turbine</b>, <b>generator</b> and <b>hydroelectric</b>. Find Niagara Falls on a map.',
      after: 'Every energy source has costs and benefits. Make a two-column list for hydroelectricity. What would you want to know before building a new dam?' },
    words: [['hydroelectric', 'making electricity from moving water'], ['turbine', 'a wheel with blades turned by moving water or air'], ['renewable', 'able to be replaced by nature']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Niagara Falls is beautiful.', 'Hydroelectric stations change the energy of falling water into electricity, which has benefits and costs.', 'Magnets are strong.', 'Tourists visit in summer.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps.',
        items: ['Water flows down a tunnel.', 'It spins a turbine.', 'The generator makes electricity.', 'Power lines carry it to homes.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Hydro</b>electric: what does <b>hydro</b> mean?',
        opts: ['water', 'fire', 'light', 'wind'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the energy chain.', cols: ['From', 'To'],
        rows: [['stored energy in high water', null], ['motion of the turbine', null], ['electricity in your lamp', null]], a: [[null, 'motion'], [null, 'electrical energy'], [null, 'light (and heat)']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is less water going over the falls at night?',
        opts: ['More is sent through tunnels to make electricity.', 'The river freezes.', 'It rains less at night.', 'The falls close.'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“Hydroelectricity is renewable, because rain and snow keep filling the rivers.” This is a …',
        opts: ['complex sentence', 'fragment', 'question', 'command'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why might a First Nation and a power company see a new dam differently? Use the text.',
        a: 'The company may see clean, renewable electricity. A First Nation may see flooded land, changed rivers and fewer fish, especially if they were not asked.', look: 'two perspectives, each linked to a detail in the text' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion does the author reach in the last paragraph? Do you agree?',
        a: 'Every energy source has costs and benefits, so we must weigh both. I agree, because hydro is clean but can harm rivers and communities.', look: 'restates the conclusion and gives a supported opinion' }
    ]
  });

  P.add({
    id: 'g5-ice-road', subject: 'geography', form: 'Report',
    title: 'Roads Made of Ice',
    deck: 'How winter roads connect northern Ontario communities, and why they are in trouble',
    hero: {
      photo: 'g5-ice-road.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 210,
      cap: 'A winter road across a frozen lake. For a few weeks each year, trucks can drive where there is no permanent road.'
    },
    body: [
      'Many communities in the far north of Ontario have no road that connects them to the rest of the province all year. In summer, people and supplies arrive by plane, which is expensive. But for a few weeks each winter, something remarkable happens. Lakes, rivers and swamps freeze hard enough to drive on, and a network of <b>winter roads</b> opens.',
      { h: 'Building a road of ice' },
      'Crews begin when the cold is steady. They clear snow from the ice so the cold air can reach it and make it thicker. Snow acts like a blanket, so cleared ice freezes faster. Some crews pump water onto the ice to build it up layer by layer. They drill holes to check the thickness again and again. A loaded fuel truck needs ice about a metre thick to cross safely.',
      { fig: '<text class="lb" x="6" y="16">How thick must the ice be? (about)</text>' + [['person walking', 15], ['snowmobile', 25], ['car', 40], ['heavy truck', 100]].map(function (r, i) {
            var y = 30 + i * 30; return '<text class="n" x="6" y="' + (y + 14) + '">' + r[0] + '</text><rect class="a" x="110" y="' + y + '" width="' + r[1] * 1.6 + '" height="18"/><text class="n" x="' + (116 + r[1] * 1.6) + '" y="' + (y + 14) + '">' + r[1] + ' cm</text>';
          }).join(''),
        tall: 152, cap: 'Heavier loads need thicker ice. These are rough guides, not safety rules.' },
      { h: 'A lifeline' },
      'When the roads open, trucks carry a whole year of supplies: fuel, building materials, food and heavy machines. Families drive to visit relatives in other communities. Because trucking is much cheaper than flying, the winter road season is busy, day and night. Driving is slow and careful. Trucks keep their speed low, because a fast, heavy vehicle can push a wave under the ice that can crack it.',
      { box: 'Did you know?', text: 'Ontario has thousands of kilometres of winter roads, many of them built and run by First Nations communities.' },
      { h: 'Shorter winters' },
      'As the <b>climate</b> warms, winters in the north are becoming shorter and milder. Some winter roads open late and close early, and some years they are not safe at all. When the road season fails, supplies must be flown in at a much higher cost, or communities go without. Some First Nations and governments are planning permanent all-season roads. Others worry about how those roads would change the land and wildlife. Communities are weighing what is best for their future. Whatever they decide, people who live in the north say the choice should be made by the communities themselves.'
    ],
    guide: { before: 'Find northern Ontario and Hudson Bay on a map, and notice how few roads there are. Teach <b>winter road</b> and <b>climate</b>. Remind the child never to go onto ice without an adult who has checked it.',
      after: 'How would your life be different if your town had a road for only six weeks a year? What should be considered before building a permanent road?' },
    words: [['winter roads', 'roads built on frozen ground, lakes and rivers that are used only in winter'], ['climate', 'the usual weather of a place over many years']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Ice is cold.', 'Winter roads are a lifeline for northern communities, but warmer winters are making them less reliable.', 'Planes are expensive.', 'Trucks drive slowly.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the bar graph. About how thick must ice be for a car?',
        opts: ['40 cm', '15 cm', '100 cm', '25 cm'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do crews clear snow off the ice?',
        opts: ['Snow acts like a blanket and slows freezing.', 'Snow is slippery.', 'To see fish.', 'To make it look nice.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Cause', 'Effect'],
        rows: [['Winters are shorter and milder.', null], ['The road season fails.', null], [null, 'A wave under the ice can crack it.']],
        a: [[null, 'Winter roads open late and close early.'], [null, 'Supplies must be flown in at a higher cost.'], ['A heavy truck drives too fast.', null]] },
      { k: 'choice', code: 'C1.3', half: true, q: 'The caption under the graph says “rough guides, not safety rules.” Why include this?',
        opts: ['to warn readers not to use it to decide if ice is safe', 'to make the graph longer', 'to show the graph is wrong', 'to sell trucks'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>lifeline</b> is something that …',
        opts: ['people depend on to get what they need', 'is a rope for fishing', 'is a kind of ice', 'is a road sign'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Some want an all-season road, and others worry about it. Explain both perspectives.',
        a: 'An all-season road would bring cheaper supplies all year. But some worry it would change the land and harm wildlife.', look: 'both perspectives, each with a reason' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about ice or winter that helped you understand this text?',
        a: 'I knew ice on a pond can crack if it is thin. That helped me understand why crews check the thickness again and again.', look: 'prior knowledge connected to a part of the text' }
    ]
  });

  P.add({
    id: 'g5-sainte-marie', subject: 'history', form: 'Report',
    title: 'A Mission in Wendake',
    deck: 'Sainte-Marie among the Hurons, 1639 to 1649, and how the Wendat and the Jesuits saw each other',
    hero: {
      photo: 'g5-sainte-marie.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 210,
      cap: 'The rebuilt mission of Sainte-Marie among the Hurons, near Midland, Ontario.'
    },
    body: [
      'In 1639, a group of French Jesuit priests, workers and soldiers began building a fortified mission beside the Wye River, near Georgian Bay. They called it Sainte-Marie. It was the first European community in what is now Ontario, and it stood in the heart of Wendake, the homeland of the Wendat.',
      { h: 'Why were they there?' },
      'The Jesuits were <b>missionaries</b>. They had come to teach the Christian religion and to convince the Wendat to change their beliefs. The French also wanted to keep the Wendat as partners in the fur trade. Sainte-Marie had a chapel, a hospital, workshops, farm fields and a separate area for Wendat visitors. At its busiest, about 60 French people lived there.',
      { fig: '<path class="k" d="M20 40 H280 V160 H20 Z"/><path class="t" d="M150 40 V160"/>' +
          '<rect class="h" x="40" y="60" width="40" height="24"/><rect class="h" x="96" y="60" width="40" height="24"/><rect class="k" x="40" y="104" width="96" height="30"/>' +
          '<rect class="h" x="172" y="70" width="90" height="16" rx="8"/><rect class="h" x="172" y="104" width="90" height="16" rx="8"/>' +
          '<text class="lb" x="85" y="30" text-anchor="middle">French area</text><text class="lb" x="215" y="30" text-anchor="middle">Wendat area</text>' +
          D.label(40, 180, 'chapel and workshops', 88, 134) + D.label(186, 180, 'longhouses', 216, 120),
        tall: 186, cap: 'A simple plan of Sainte-Marie. The mission had separate areas for the French and for Wendat visitors.' },
      { h: 'Two ways of seeing' },
      'The Jesuits wrote long letters to France every year, describing everything they saw. These letters, called the Jesuit Relations, are an important <b>source</b> for historians today. But they show only the Jesuits’ point of view. The priests often described Wendat beliefs as wrong, even though those beliefs had guided Wendat life for generations.',
      'Some Wendat accepted the new religion. Many others did not, and this divided families and villages. At the same time, diseases that the Europeans had brought, such as smallpox, killed about half of all the Wendat in only a few years. Some Wendat blamed the missionaries.',
      { box: 'Did you know?', text: 'In 1649, after attacks by the Haudenosaunee, the Jesuits burned Sainte-Marie themselves rather than let it be captured. They moved with Wendat survivors to an island in Georgian Bay.' },
      { h: 'Remembering' },
      'Today, Sainte-Marie has been rebuilt as a museum. Visitors can see the chapel, the workshops and a longhouse. Historians now try to include Wendat voices, using Wendat oral history and the work of Wendat scholars, so that the story is told from more than one side.'
    ],
    guide: { before: 'Review what the child learned about Wendat villages. Teach <b>missionary</b> and <b>source</b>. Explain that historians compare many sources to find out what really happened.',
      after: 'Why is it a problem if we learn history from only one group’s letters? How can we find other voices?' },
    words: [['missionaries', 'people sent to spread a religion'], ['source', 'where information comes from, such as a letter or a book']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Jesuits wrote letters.', 'Sainte-Marie was a French mission in Wendake whose history must be understood from both French and Wendat points of view.', 'Smallpox is a disease.', 'Midland has a museum.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the plan show about the mission?',
        opts: ['It had separate areas for the French and the Wendat.', 'It was round.', 'It had no buildings.', 'It was on an island.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did some Wendat blame the missionaries?',
        opts: ['Diseases spread when the Europeans came.', 'The mission was noisy.', 'The French did not trade.', 'The priests were lost.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the events in order.',
        items: ['The Jesuits start building Sainte-Marie.', 'Disease kills about half of the Wendat.', 'The Jesuits burn the mission.', 'Sainte-Marie is rebuilt as a museum.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>These</b> letters … are an important source.” What letters?',
        opts: ['the Jesuit Relations', 'Wendat stories', 'letters from soldiers', 'museum signs'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Historians use a <b>source</b> to …',
        opts: ['find information about the past', 'build missions', 'grow crops', 'cure diseases'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'What bias might the Jesuit Relations contain? How could it affect a reader?',
        a: 'They show only the Jesuits’ view and call Wendat beliefs wrong. A reader might think the Wendat way of life was bad if they read only these letters.', look: 'names the bias and how it could influence a reader' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'How do historians today try to get a fuller picture? Why is this good critical thinking?',
        a: 'They include Wendat oral history and Wendat scholars. Comparing more than one source helps you see what one side left out.', look: 'names the method and explains why comparing sources helps' }
    ]
  });

  P.add({
    id: 'g5-filles-du-roi', subject: 'history', form: 'Report',
    title: 'The King’s Daughters',
    deck: 'Why about 800 young women sailed to New France between 1663 and 1673',
    hero: {
      photo: 'g5-filles-du-roi.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'An artist’s picture of young women arriving in New France. Pictures like this were made long after the events.'
    },
    body: [
      'In 1663, New France had a problem. The <b>colony</b> along the St. Lawrence River had only about 3000 French settlers, and most of them were men. Without more families, the colony could not grow. King Louis XIV of France decided to act.',
      { h: 'A plan to grow the colony' },
      'Between 1663 and 1673, the king paid for about 800 young women to sail to New France. They were called the <b>filles du roi</b>, the King’s Daughters, because the king acted as their sponsor, almost like a father. Many were poor or orphans from Paris and nearby towns. The king paid for their voyage and gave each one a small amount of money and supplies, called a dowry, to start a new life.',
      { fig: '<text class="lb" x="6" y="16">French population of New France (about)</text><path class="k" d="M30 150 H290 M30 150 V30"/>' +
          [[1663, 3000], [1673, 7000], [1681, 10000], [1700, 15000]].map(function (d, i) { var x = 60 + i * 64, h = d[1] / 15000 * 108; return '<rect class="a" x="' + x + '" y="' + (150 - h) + '" width="34" height="' + h + '"/><text class="n" x="' + (x + 17) + '" y="166" text-anchor="middle">' + d[0] + '</text><text class="n" x="' + (x + 17) + '" y="' + (144 - h) + '" text-anchor="middle">' + d[1] + '</text>'; }).join(''),
        tall: 172, cap: 'The French population of New France grew quickly after the filles du roi arrived.' },
      { h: 'A hard new life' },
      'The crossing took two months or more in crowded, damp ships, and some women did not survive it. When they arrived in Québec, Trois-Rivières or Montréal, most married within a few months, usually to farmers or soldiers. They had to learn quickly how to survive long, cold winters, clear land, grow food and raise large families, often far from any neighbour.',
      { box: 'Did you know?', text: 'Millions of people in Québec and across North America today can trace their family trees back to at least one fille du roi.' },
      { h: 'Whose land?' },
      'The king’s plan worked. The French population grew quickly as families had many children. But the colony was growing on land that was already home to the Innu, Wendat, Algonquin, Haudenosaunee and other nations. As more farms were cleared along the river, those nations’ lands and ways of life were affected. The story of the filles du roi is a story of courage, and it is also part of a larger story of who the land belonged to. Historians today try to tell both parts, using records such as marriage contracts and letters, and the oral histories of the First Nations who lived along the river.'
    ],
    guide: { before: 'Find Québec, Trois-Rivières and Montréal on a map of the St. Lawrence River. Teach <b>colony</b>, <b>sponsor</b> and <b>dowry</b>. Explain that “filles du roi” is French for “daughters of the king.”',
      after: 'What qualities would a person need to make that journey and start over? How might the First Nations living along the river have seen the new farms?' },
    words: [['filles du roi', 'French for “the King’s Daughters,” young women sent to New France'], ['colony', 'a place settled and ruled by a faraway country']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Ships were crowded.', 'The king sent about 800 young women to grow New France, which changed the colony and affected First Nations.', 'Louis XIV was a king.', 'Winters are cold.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. About how many French people lived in New France in 1681?',
        opts: ['10 000', '3000', '15 000', '7000'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the king want more women in New France?',
        opts: ['So more families would make the colony grow.', 'To fight wars.', 'To trade furs.', 'To build ships.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Problem', 'What the king did'],
        rows: [['Too few French families', null], ['The women were poor.', null]], a: [[null, 'He sent about 800 young women.'], [null, 'He paid their voyage and gave a dowry.']] },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why does the caption say the picture was made long after the events?',
        opts: ['So readers know it is an artist’s idea, not a photo or eyewitness picture', 'Because it is blurry', 'To tell the artist’s name', 'Because it is in colour'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “King Louis XIV of France decided to act,” <b>King Louis XIV</b> is a …',
        opts: ['proper noun', 'verb', 'adjective', 'pronoun'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The last section is called “Whose land?” What perspective does it add to the story?',
        a: 'It adds the perspective of the First Nations who already lived along the river, whose lands and ways of life were affected by the new farms.', look: 'identifies the First Nations perspective and its effect' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Was the king’s plan successful? Draw a conclusion and support it with the graph.',
        a: 'Yes. The French population grew from about 3000 in 1663 to about 15 000 by 1700.', look: 'a conclusion supported by numbers from the graph' }
    ]
  });

  P.add({
    id: 'g5-great-law', subject: 'social', form: 'Report',
    title: 'The Great Law of Peace',
    deck: 'How the Haudenosaunee Confederacy united nations under one law',
    hero: {
      photo: 'g5-hiawatha-flag.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 200,
      cap: 'The Haudenosaunee flag is based on the Hiawatha Belt, a wampum belt that records the union of the nations.'
    },
    body: [
      'Long before Europeans arrived, the Mohawk, Oneida, Onondaga, Cayuga and Seneca nations lived south of Lake Ontario and along the St. Lawrence River. Haudenosaunee oral history tells of a time of great conflict between them. Then a messenger known as the Peacemaker came with a message of peace, power and righteousness.',
      { h: 'Five nations, one longhouse' },
      'With the help of a leader named Hiawatha, the Peacemaker brought the nations together into one <b>confederacy</b>. They agreed to follow the Great Law of Peace. The nations described themselves as living together in one great longhouse, each with its own fire. The Mohawk guarded the eastern door, the Seneca guarded the western door, and the Onondaga kept the central fire, where the leaders met.',
      { fig: '<rect class="k" x="10" y="40" width="280" height="70" rx="35"/>' + [[40, 'Seneca'], [95, 'Cayuga'], [150, 'Onondaga'], [205, 'Oneida'], [260, 'Mohawk']].map(function (n) { return '<circle class="a" cx="' + n[0] + '" cy="75" r="9"/><text class="n" x="' + n[0] + '" y="130" text-anchor="middle">' + n[1] + '</text>'; }).join('') +
          D.label(4, 24, 'western door') + D.label(206, 24, 'eastern door') + D.label(108, 160, 'the central fire', 150, 84),
        tall: 166, cap: 'The nations as one longhouse, from west to east. In about 1722, the Tuscarora joined as the sixth nation.' },
      { h: 'How decisions were made' },
      'Under the Great Law, chiefs from each nation met in a council to discuss matters that affected everyone. They talked until they reached <b>consensus</b>, which means agreement by all, rather than a simple majority vote. Clan mothers played a powerful role. They chose the chiefs, advised them and could remove a chief who did not serve the people well.',
      { box: 'Did you know?', text: 'The Great Tree of Peace, a white pine, is a symbol of the Great Law. Its roots spread in four directions so other nations could follow them and find shelter under it.' },
      { h: 'Still living' },
      'The Haudenosaunee Confederacy is one of the oldest continuing democracies in the world. Today, Haudenosaunee people live in communities in Ontario, Québec and New York State, including Six Nations of the Grand River, the largest First Nation in Canada by population. The Great Law is still recited and taught, and the Haudenosaunee issue their own passports for travel. Their ideas about peace, shared decision making and the voices of women continue to guide them. Some historians believe that the Great Law also gave ideas to the people who wrote the constitution of the United States, though they still debate how much.'
    ],
    guide: { before: 'Explain that this history comes from Haudenosaunee oral tradition, passed down by trained speakers. Teach <b>confederacy</b> and <b>consensus</b>. Find Lake Ontario and Six Nations of the Grand River on a map.',
      after: 'Try making a family decision by consensus instead of a vote. What is harder? What is better? Why might clan mothers choosing leaders matter?' },
    words: [['confederacy', 'a union of nations or groups that agree to work together'], ['consensus', 'agreement by everyone in a group']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Seneca guarded the western door.', 'The Great Law of Peace united Haudenosaunee nations into a confederacy that still guides them today.', 'White pines are tall.', 'Hiawatha was a leader.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which nation kept the central fire?',
        opts: ['Onondaga', 'Mohawk', 'Seneca', 'Cayuga'], a: 0 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which shows a Haudenosaunee cultural value?',
        opts: ['Clan mothers chose the chiefs.', 'One person made every decision.', 'Leaders were chosen by lottery.', 'Women had no say.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Symbol', 'What it stands for'],
        rows: [['one great longhouse', null], ['the Great Tree of Peace', null]], a: [[null, 'the nations living together as one'], [null, 'the Great Law; peace and shelter for other nations']] },
      { k: 'choice', code: 'B2.2', half: true, q: 'Deciding by <b>consensus</b> means …',
        opts: ['everyone agrees', 'most people vote yes', 'the leader decides', 'nobody decides'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“<b>Not only</b> the chiefs <b>but also</b> the clan mothers had power.” These paired words are …',
        opts: ['correlative conjunctions', 'adverbs', 'proper adjectives', 'pronouns'], a: 0 },
      { k: 'lines', code: 'C3.7', n: 3, q: 'The Great Law began long ago. How is it connected to Haudenosaunee life today?',
        a: 'It is still recited and taught, and the Haudenosaunee still make decisions and issue their own passports, so the Great Law continues to guide them.', look: 'links the historical law to present-day practice' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Compare deciding by consensus with deciding by a vote in your class. Which would you prefer for a big decision? Why?',
        a: 'Consensus takes longer but everyone agrees, so no one feels left out. For a big decision like a class trip, I would prefer consensus.', look: 'a comparison with a reasoned preference' }
    ]
  });
  P.add({
    id: 'g5-quillwork', subject: 'arts', form: 'Report',
    title: 'Art from Porcupine Quills',
    deck: 'How Mi’kmaw artists decorated birchbark with quills, and why the art is still made today',
    hero: {
      photo: 'g5-quillwork.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A birchbark box decorated with dyed porcupine quills, made by a Mi’kmaw artist.'
    },
    body: [
      'A porcupine has about 30 000 sharp quills to protect itself. To most animals, they are a warning: stay away. To Mi’kmaw artists in what is now Nova Scotia, New Brunswick and Prince Edward Island, they were also a beautiful art material.',
      { h: 'From porcupine to box' },
      'Artists gathered quills carefully, sometimes by throwing a blanket over a porcupine so the quills stuck to the cloth. They washed the quills and sorted them by size. Then they dyed them with colours made from plants, roots and berries. Later, artists also used dyes brought by traders.',
      { fig: '<rect class="k" x="40" y="20" width="220" height="130" rx="6"/>' + [0, 1, 2, 3].map(function (i) { var x = 60 + i * 50; return '<path class="a" d="M' + x + ' 60 L' + (x + 20) + ' 40 L' + (x + 40) + ' 60 L' + (x + 20) + ' 80 Z"/>'; }).join('') +
          '<path class="t" d="M50 100 H250 M50 106 H250 M50 112 H250 M50 118 H250 M50 124 H250 M50 130 H250"/>' +
          D.label(196, 176, 'rows of quills, side by side', 200, 124) + D.label(4, 176, 'geometric pattern', 80, 78),
        tall: 182, cap: 'A sketch of a quilled box lid. Patterns were made of shapes such as diamonds, stars and zigzags.' },
      'The base of the art was birchbark, which is light, waterproof and easy to shape. The artist punched tiny holes in the bark with an awl, a pointed tool. Then the quills were softened in the mouth or in water, and their ends were pushed into the holes. As the quills dried, they tightened and held firmly in place. Row by row, the quills covered the bark in bright, tightly packed patterns.',
      { h: 'Patterns with meaning' },
      'Many designs were <b>geometric</b>, made of shapes such as triangles, diamonds, stars and zigzag lines. An eight-pointed star is a well-known Mi’kmaw symbol. Some patterns showed things from nature, and some were passed down in families.',
      { box: 'Did you know?', text: 'In the 1800s, many Mi’kmaw artists sold quilled boxes, chair seats and cases to visitors. This art helped families earn a living during hard times.' },
      { h: 'A living art' },
      'For a time, fewer people learned quillwork. It takes great patience: a small box can take many weeks. Today, Mi’kmaw artists are teaching young people the <b>techniques</b> again, and quillwork is shown in museums and galleries and sold at art markets. Some artists follow old patterns exactly, and others create new designs. Both ways keep the knowledge alive and connect each new piece to the artists who came before. When you look closely at a quilled box, you are seeing hundreds of hours of patient work and many generations of knowledge.'
    ],
    guide: { before: 'Find the Maritime provinces on a map. Teach <b>geometric</b>, <b>technique</b> and <b>awl</b>. If you can, look at museum photos of Mi’kmaw quillwork together.',
      after: 'Why do you think it matters that young Mi’kmaq are learning quillwork from Elders and artists? Design a geometric pattern of your own on paper.' },
    words: [['geometric', 'made of shapes such as lines, triangles and diamonds'], ['techniques', 'special ways of doing a skill']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Porcupines have quills.', 'Mi’kmaw artists make detailed quillwork on birchbark, and the art is being taught again today.', 'Birchbark is light.', 'Stars have eight points.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps in making quillwork.',
        items: ['Gather the quills.', 'Dye them.', 'Punch holes in the bark.', 'Push the softened quills into the holes.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the sketch show about the patterns?',
        opts: ['They use repeated shapes and rows.', 'They are drawn with paint.', 'They show people.', 'They have no pattern.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did the quills stay in place?',
        opts: ['They tightened as they dried.', 'They were glued.', 'They were tied with string.', 'They were nailed.'], a: 0 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which is a Mi’kmaw cultural element in the text?',
        opts: ['the eight-pointed star', 'a metal kettle', 'a paintbrush', 'a computer'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>awl</b> is …',
        opts: ['a pointed tool for making holes', 'a kind of dye', 'a box', 'a quill'], a: 0 },
      { k: 'lines', code: 'C3.7', n: 3, q: 'How did life in the 1800s affect quillwork, and how is it connected to the present?',
        a: 'In the 1800s, artists sold quillwork to earn a living during hard times. Today, artists teach young people so the art and knowledge continue.', look: 'connects a historical influence to present-day practice' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which strategy helped you picture how quillwork is made: the sketch, the photo or rereading the steps? Explain.',
        a: 'The steps helped most. I reread them and pictured each one, then looked at the photo to see how the rows looked when they were finished.', look: 'names a strategy and explains how it helped comprehension' }
    ]
  });

  P.add({
    id: 'g5-seigneury', subject: 'history', form: 'Report',
    title: 'Long, Narrow Farms',
    deck: 'Why the farms of New France were shaped like ribbons along the St. Lawrence River',
    hero: {
      photo: 'g5-long-lots.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Long, narrow fields stretching back from a river in Québec. Their shape comes from the way land was divided in New France.'
    },
    body: [
      'Fly over the St. Lawrence River in Québec today and look down. You will see something unusual: fields shaped like long, thin ribbons, side by side, all running back from the river. This pattern was created more than 300 years ago by the <b>seigneurial system</b>, the way land was shared out in New France.',
      { h: 'Seigneurs and habitants' },
      'The king of France gave large pieces of land, called seigneuries, to important people, such as military officers and religious groups. The owner of a seigneury was called the seigneur. The seigneur divided the land into farms and gave them to settlers, called <b>habitants</b>. In return, the habitants paid a small yearly rent, often in grain, chickens or money, and worked a few days a year for the seigneur. The seigneur had to build a mill where the habitants could grind their grain into flour.',
      { fig: '<path class="k" d="M6 150 Q150 136 294 152"/>' + D.ripple(10, 290, 164) + [0, 1, 2, 3, 4, 5, 6].map(function (i) { var x = 20 + i * 40; return '<path class="t" d="M' + x + ' 147 L' + (x - 10) + ' 20"/>'; }).join('') +
          '<rect class="k" x="44" y="124" width="12" height="10"/><rect class="k" x="124" y="122" width="12" height="10"/><rect class="k" x="204" y="124" width="12" height="10"/>' +
          D.label(80, 14, 'woods at the back') + D.label(150, 188, 'the river: the main road', 150, 164, 'middle') + D.label(230, 104, 'farmhouse near the water', 214, 124),
        tall: 192, cap: 'Each farm had a narrow front on the river and stretched far back.' },
      { h: 'Why this shape?' },
      'In the 1600s, there were few roads. The river was the main highway. Everyone wanted a piece of the shore so they could travel and ship goods by boat or, in winter, by sleigh on the ice. Dividing the land into narrow strips gave every family a share of the river. A typical farm was about 200 metres wide but up to 2 kilometres long.',
      'The shape had other benefits. Houses stood close together along the river, so neighbours could help one another and stay safe. Each farm also had a mix of land: good soil near the river for crops, meadows for animals and woods at the back for firewood.',
      { box: 'Did you know?', text: 'The seigneurial system lasted in Québec until 1854, but the long, narrow fields can still be seen from the air today.' },
      { h: 'Whose land?' },
      'The seigneuries were laid out on lands where the Innu, Wendat, Algonquin, Abenaki, Haudenosaunee and other peoples had lived, hunted and travelled. The French king gave the land away without their <b>consent</b>, and this shaped the history of the region for centuries. Today, some First Nations in Québec are still working to have their rights to these lands recognized. Looking at a map of long, narrow fields is a reminder that every landscape has more than one story.'
    ],
    guide: { before: 'Look at a satellite map of the St. Lawrence River near Québec City to find the long fields. Teach <b>seigneur</b>, <b>habitant</b> and <b>consent</b>. Explain that seigneur and habitant are French words.',
      after: 'Why was being near the river so important? How does the shape of your own town or neighbourhood show how people travelled when it was built?' },
    words: [['seigneurial system', 'the way land was divided and managed in New France'], ['habitants', 'farmers who settled the land in New France'], ['consent', 'permission or agreement']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Québec has a river.', 'Under the seigneurial system, New France was divided into long, narrow farms so each family had a share of the river.', 'Mills grind grain.', 'Farms had woods.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where are the farmhouses?',
        opts: ['near the river', 'in the woods', 'in the middle of the river', 'far from each other'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did everyone want land on the river?',
        opts: ['The river was the main way to travel and ship goods.', 'The water was warm.', 'There were no fish elsewhere.', 'The king lived there.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'What did each person give or get?', cols: ['Person', 'Gave', 'Got'],
        rows: [['habitant', null, null], ['seigneur', null, null]],
        a: [[null, 'rent and a few days of work', 'a farm'], [null, 'land and a mill', 'rent and work']] },
      { k: 'choice', code: 'C1.1', half: true, q: '“Everyone wanted a piece of the shore so <b>they</b> could travel.” Who are <b>they</b>?',
        opts: ['the settlers', 'the fish', 'the kings', 'the mills'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Each farm had a mix of land: good soil, meadows and woods.” The colon …',
        opts: ['introduces a list', 'ends a question', 'shows speech', 'joins two names'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize three reasons the farms were long and narrow.',
        a: 'Every family got a piece of the river for travel. Houses were close together for help and safety. Each farm had good soil, meadows and woods.', look: 'three reasons from the text, in their own words' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The text ends with “Whose land?” Why do you think the author included this section?',
        a: 'To remind readers that the land already belonged to First Nations, and that the king gave it away without their consent, which is an important part of the story.', look: 'explains the purpose: adding an Indigenous perspective that might otherwise be left out' }
    ]
  });

  P.add({
    id: 'g5-red-bay', subject: 'history', form: 'Report',
    title: 'Whalers at Red Bay',
    deck: 'How Basque sailors from Europe came to Labrador in the 1500s',
    hero: {
      photo: 'g5-red-bay.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 210,
      cap: 'Red Bay, Labrador. In the 1500s, this quiet harbour was one of the busiest whaling ports in the world.'
    },
    body: [
      'Today, Red Bay in Labrador is a small, quiet village beside a rocky harbour. But more than 450 years ago, it was crowded with ships, smoke and hundreds of sailors. They had crossed the Atlantic Ocean from the Basque Country, a region on the border of Spain and France, to hunt whales.',
      { h: 'Oil for Europe' },
      'In the 1500s, Europe needed oil for lamps, soap and many other things. Whale <b>blubber</b>, the thick layer of fat under a whale’s skin, could be melted into high-quality oil. Each summer, Basque ships sailed to the Strait of Belle Isle, between Labrador and Newfoundland, where bowhead and right whales passed on their journey.',
      { fig: steps(10, [['spot', 'from a lookout'], ['chase', 'in small boats'], ['tow', 'to shore']], 86) +
          steps(86, [['cut', 'the blubber'], ['melt', 'in big pots'], ['ship', 'barrels home']], 86) +
          '<path class="a" d="M257 54 V66 Q257 70 150 70 Q43 70 43 82"/>',
        tall: 136, cap: 'The steps of the whale hunt and oil making at Red Bay.' },
      { h: 'A busy summer' },
      'Lookouts watched from the hills. When a whale was spotted, crews rowed out in small boats called chalupas and hunted it with harpoons. The whale was towed to shore, and the blubber was cut away and melted in huge copper pots over fires. The oil was poured into wooden barrels and loaded onto the ships. A single ship could carry home about 1000 barrels of oil. At its busiest, Red Bay may have had about 600 workers each summer.',
      { box: 'Did you know?', text: 'In 1978, archaeologists found the wreck of a Basque ship, the San Juan, at the bottom of Red Bay. It sank in 1565. Red Bay is now a UNESCO World Heritage Site.' },
      { h: 'Neighbours and changes' },
      'The Innu and Inuit already lived along these coasts. Records suggest that some Indigenous people traded with the Basques and even worked with them. By the early 1600s, the whale hunt had faded, partly because so many whales had been killed. Bowhead whales are still rare in this area today.',
      'The whalers left behind barrels, tools, ovens, the bones of whales and the <b>shipwrecks</b> in the harbour. These clues let archaeologists piece together a story that was almost forgotten.',
      'Divers spent years carefully mapping the San Juan, timber by timber, before bringing pieces to the surface to study. Then the pieces were returned to the bottom of the harbour and covered to protect them. The cold, dark water had kept the wood from rotting for more than 400 years. Today, visitors to Red Bay can see a whaling boat that was found there and rebuilt, along with tools and pottery the whalers used.'
    ],
    guide: { before: 'Find the Basque Country in Europe and Red Bay in Labrador on a map, and trace the ocean route. Teach <b>blubber</b>, <b>harpoon</b> and <b>archaeologist</b>.',
      after: 'Why do you think the whale hunt faded? What lesson might it teach about using natural resources today?' },
    words: [['blubber', 'the thick fat under a whale’s skin'], ['shipwrecks', 'ships that have sunk or been destroyed']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Red Bay is quiet.', 'In the 1500s, Basque whalers came to Red Bay to make whale oil, and archaeologists have uncovered their story.', 'Whales are big.', 'Copper pots melt fat.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the diagram. Number the steps.',
        items: ['Spot a whale.', 'Chase it in small boats.', 'Melt the blubber.', 'Ship the barrels home.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Europe want whale oil?',
        opts: ['For lamps, soap and other uses', 'To drink', 'To paint ships', 'To feed animals'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Clue found', 'What it tells archaeologists'],
        rows: [['the wreck of the San Juan', null], ['ovens and whale bones', null]], a: [[null, 'Basque ships came and some sank here.'], [null, 'Blubber was melted into oil here.']] },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why did the whale hunt fade?',
        opts: ['So many whales had been killed.', 'The ships were too big.', 'Oil was banned.', 'The harbour froze.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Whale <b>blubber</b>, the thick layer of fat under a whale’s skin, could be melted.” The commas set off …',
        opts: ['a phrase that explains blubber', 'a list', 'spoken words', 'a question'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion can you draw about the effect of the whale hunt on the whales? Use evidence.',
        a: 'The hunt killed so many whales that it faded, and bowhead whales are still rare there today, so the hunt harmed the whale population for a long time.', look: 'a conclusion supported by two pieces of evidence' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Why might someone want to read this text? Name two different purposes.',
        a: 'To learn about early European visitors to Canada, and to find out how archaeologists use clues to learn about the past.', look: 'two different, reasonable purposes for reading' }
    ]
  });

  P.add({
    id: 'g5-taxes', subject: 'social', form: 'Explanation',
    title: 'Where Do Taxes Go?',
    deck: 'How governments collect money and use it for services we share',
    hero: {
      photo: 'g5-fire-truck.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A fire truck. Fire services are paid for with taxes, so help comes no matter who you are.'
    },
    body: [
      'Aisha bought a $10 book at a store in Ontario. At the counter, the cashier said, “That will be $11.30.” Aisha frowned. Where did the extra $1.30 come from? “That’s the tax,” the cashier explained. Aisha wondered where it would go.',
      { h: 'What is a tax?' },
      'A <b>tax</b> is money that people and businesses pay to the government. Governments use taxes to pay for <b>services</b> that people share, things that would be hard or impossible for one family to buy alone. Think of a road, a fire department or a public library. Everyone uses them, so everyone helps to pay.',
      { fig: '<text class="lb" x="6" y="16">Some services paid for by taxes</text>' + [['Federal', 'passports, armed forces, payments to seniors'], ['Provincial', 'schools, hospitals, highways'], ['Municipal', 'fire, police, parks, libraries, garbage']].map(function (r, i) {
            var y = 30 + i * 42; return '<rect class="k" x="6" y="' + y + '" width="90" height="34" rx="4"/><text class="lb" x="51" y="' + (y + 22) + '" text-anchor="middle">' + r[0] + '</text><text class="n" x="104" y="' + (y + 22) + '">' + r[1] + '</text>';
          }).join(''),
        tall: 160, cap: 'Each level of government uses taxes for different services.' },
      { h: 'Kinds of taxes' },
      'There are several kinds of taxes. A sales tax is added when you buy many things. In Ontario, it is called the HST, and it is 13%. That is the $1.30 on Aisha’s $10 book. Income tax is taken from the money people earn at their jobs. People who earn more pay a bigger share. Property tax is paid by people who own homes and buildings, and it goes mostly to the city or town.',
      { box: 'Do the math', text: 'In Ontario, the HST is 13%, which is 13 cents on every dollar. On a $20 item, the tax is $2.60, so the total is $22.60.' },
      { h: 'Deciding how to spend' },
      'Elected governments decide how to spend tax money. They make a plan called a budget each year. Should more money go to hospitals or to roads? Should there be a new arena or a new library? People often disagree, and that is why elections, debates and public meetings matter.',
      'Aisha did some reading. She learned that part of her $1.30 helped pay for schools and hospitals in Ontario. The next week, she visited the library, borrowed three books for free and thought, “I guess I already paid a little bit for these.”',
      'Taxes can be a topic people argue about. Some people think taxes are too high, and others think the government should spend more on services. Most people agree on one thing, though: when a fire truck races to a burning house, nobody asks whether the family paid enough tax that year. Shared services are there for everyone.'
    ],
    guide: { before: 'Look at a store receipt together and find the HST. Teach <b>tax</b>, <b>service</b> and <b>budget</b>. Review the three levels of government.',
      after: 'If you were the mayor, which service would you spend more tax money on, and why? What would you have to spend less on?' },
    words: [['tax', 'money paid to the government to pay for shared services'], ['services', 'work done for the public, such as schools or fire protection']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Books cost $10.', 'Taxes are money people pay to governments for shared services, and governments decide how to spend them.', 'The HST is 13%.', 'Libraries lend books.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram. Which level of government pays for each service?', cols: ['Service', 'Level'],
        rows: [['a hospital', null], ['a fire department', null], ['passports', null]], a: [[null, 'provincial'], [null, 'municipal'], [null, 'federal']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'How much HST would you pay on a $30 item in Ontario?',
        opts: ['$3.90', '$3.00', '$1.30', '$13.00'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Aisha say she “already paid a little bit” for the library books?',
        opts: ['Part of her tax helps pay for public services.', 'She bought the books.', 'She paid a late fee.', 'The library charged her.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Which is a <b>service</b> paid for by taxes?',
        opts: ['a public library', 'a video game', 'a candy bar', 'a private party'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'This explanation begins with a short story about Aisha. Why?',
        opts: ['to connect a big idea to a real-life moment', 'to give a fact', 'to list services', 'to show a map'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the difference between sales tax and income tax.',
        a: 'Sales tax is added when you buy things, like the HST. Income tax is taken from the money people earn at their jobs.', look: 'a clear difference between the two taxes' },
      { k: 'lines', code: 'B1.4', n: 3, q: 'You will speak to your town council about spending more on parks. Name two speaking strategies you would use and why.',
        a: 'I would make eye contact and speak clearly so they listen. I would give a reason with a fact, like how many kids use the park.', look: 'two oral strategies (voice, eye contact, gestures, facts) with reasons' }
    ]
  });

  P.add({
    id: 'g5-skatepark-letter', subject: 'social', form: 'Letter',
    title: 'A Skate Park for Everyone',
    deck: 'A student writes to town council to make the case for a new skate park',
    plain: true,
    hero: {
      photo: 'g5-skatepark.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A public skate park. Many towns in Canada have built them as places for young people to be active.'
    },
    body: [
      'Dear Mayor Tremblay and Members of Council,',
      'My name is Oliver Mensah, and I am a Grade 5 student at Riverside Public School. I am writing to ask council to build a public skate park in Centennial Park. I believe a skate park would make our town healthier, safer and more welcoming for young people.',
      'First, a skate park would help young people stay active. Skateboarding, scootering and BMX riding are great exercise, and they are fun. Doctors say children should be active for at least 60 minutes a day. Many of my friends do not play team sports, but they love to skate.',
      { fig: '<text class="lb" x="6" y="16">Class survey: Would you use a skate park?</text><path class="k" d="M40 150 H290 M40 150 V30"/>' +
          [['every week', 14], ['sometimes', 8], ['never', 4]].map(function (r, i) { var x = 70 + i * 74, h = r[1] * 7; return '<rect class="a" x="' + x + '" y="' + (150 - h) + '" width="40" height="' + h + '"/><text class="n" x="' + (x + 20) + '" y="166" text-anchor="middle">' + r[0] + '</text><text class="n" x="' + (x + 20) + '" y="' + (144 - h) + '" text-anchor="middle">' + r[1] + '</text>'; }).join(''),
        tall: 172, cap: 'Oliver surveyed his class of 26 students.' },
      'Second, a skate park would be safer. Right now, skaters use the library parking lot and the sidewalks downtown. This is dangerous for skaters, drivers and people walking. A skate park would give us a safe place, away from traffic.',
      'Third, a skate park would bring people together. In our class survey, 22 out of 26 students said they would use a skate park at least sometimes. Skate parks are free, so families who cannot pay for sports teams could use it too. It could also be built so that wheelchair users can enjoy it.',
      'Some people worry that skate parks are noisy or attract litter. I think these problems can be solved. The park could be placed away from houses, and students from my school would volunteer to help keep it clean.',
      'Thank you for reading my <b>letter</b>. I hope I have helped to <b>persuade</b> you to vote for a skate park. I would be glad to speak at a council meeting.',
      'Sincerely,<br>Oliver Mensah',
      { h: 'What happened next' },
      'Oliver’s letter was read aloud at the next council meeting. Two councillors asked him to come and speak. He brought his survey, photos of skaters in the parking lot and a list of classmates who promised to help clean up. Council voted to study the idea and asked young people to help design the park. Oliver says the best part was learning that a student’s letter can start a real conversation in town.'
    ],
    guide: { before: 'Explain that this is a persuasive letter: the writer wants to convince the reader. Teach <b>persuade</b> and <b>counter-argument</b>. Talk about who the audience is (the mayor and council).',
      after: 'Which reason is the strongest? Which is the weakest? Write a short reply from a council member, either agreeing or raising a concern.' },
    words: [['persuade', 'to try to make someone agree with you'], ['letter', 'a written message to a person or group']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'What is the purpose of this text?',
        opts: ['to persuade council to build a skate park', 'to tell a story about skating', 'to explain how to skate', 'to describe Centennial Park'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'List Oliver’s three reasons.', cols: ['Reason', 'Evidence he gives'],
        rows: [['It would help young people stay active.', null], ['It would be safer.', null], ['It would bring people together.', null]],
        a: [[null, 'Children should be active 60 minutes a day; friends love to skate.'], [null, 'Skaters now use parking lots and sidewalks.'], [null, '22 of 26 students would use it; it is free.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. How many students would use the park every week?',
        opts: ['14', '8', '4', '22'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which words show Oliver is moving to a new reason?',
        opts: ['First, Second, Third', 'Dear, Sincerely', 'I think', 'Thank you'], a: 0 },
      { k: 'choice', code: 'C3.5', half: true, q: 'Which group’s worries does Oliver answer?',
        opts: ['people who think skate parks are noisy or attract litter', 'skaters', 'his teacher', 'doctors'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>persuade</b> means to …',
        opts: ['try to make someone agree', 'tell a joke', 'describe a place', 'ask a question'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does Oliver show that the skate park would be for everyone?',
        a: 'He says it would be free for families who cannot pay for teams, and that it could be built so wheelchair users can enjoy it.', look: 'two details about inclusion or accessibility' },
      { k: 'lines', code: 'D2.5', n: 3, q: 'Suggest one way Oliver could make his letter even more convincing.',
        a: 'He could add a fact about how many skaters have been hurt on the sidewalks, or a quote from a parent who supports the park.', look: 'a specific, sensible revision that strengthens the argument' }
    ]
  });

  P.add({
    id: 'g5-time-zones', subject: 'geography', form: 'Explanation',
    title: 'What Time Is It There?',
    deck: 'How Sandford Fleming’s idea of time zones brought order to a wide country',
    hero: {
      photo: 'g5-sandford-fleming.jpg', credit: 'CREDIT', focus: '50% 30%',
      tall: 210,
      cap: 'Sir Sandford Fleming, the Canadian engineer who promoted standard time zones in the 1870s and 1880s.'
    },
    body: [
      'When it is noon in Toronto, it is 9 o’clock in the morning in Vancouver and 1:30 in the afternoon in St. John’s. Canada is so wide that the sun rises over Newfoundland hours before it rises over British Columbia. To keep track, we use <b>time zones</b>. But it was not always this way.',
      { h: 'A missed train' },
      'Before the 1880s, every town set its clocks by the sun. When the sun was highest in the sky, it was noon. That meant noon in Montréal was a few minutes different from noon in Toronto. This worked when people travelled by horse, but it was very confusing for railways. Train timetables had to list dozens of local times.',
      'In 1876, a Scottish-born Canadian engineer named Sandford Fleming missed a train in Ireland, because the timetable was confusing. He began working on a better system.',
      { fig: '<path class="k" d="M6 30 H294 V140 H6 Z"/>' + [56, 106, 156, 196, 246].map(function (x) { return '<path class="d" d="M' + x + ' 30 V140"/>'; }).join('') +
          [[31, '9:00', 'Pacific'], [81, '10:00', 'Mountain'], [131, '11:00', 'Central'], [176, '12:00', 'Eastern'], [221, '1:00', 'Atlantic'], [270, '1:30', 'Nfld.']].map(function (z) {
            return '<text class="lb" x="' + z[0] + '" y="82" text-anchor="middle">' + z[1] + '</text><text class="n" x="' + z[0] + '" y="104" text-anchor="middle">' + z[2] + '</text>';
          }).join('') + '<text class="n" x="6" y="18">west</text><text class="n" x="294" y="18" text-anchor="end">east</text>',
        tall: 146, cap: 'Canada’s six time zones when it is noon in Eastern time. Not to scale.' },
      { h: 'Slicing the world' },
      'Fleming’s idea was to divide the world into 24 time zones, one for each hour of the day. Inside each zone, every clock would show the same time. As you travel east, you move ahead one hour for each zone, and as you travel west, you move back. In 1884, at a conference in Washington, countries agreed on a starting line, the <b>prime meridian</b>, running through Greenwich, England. Over the following years, most of the world adopted standard time.',
      { box: 'Did you know?', text: 'Newfoundland’s time zone is a half hour different from its neighbour’s. It is one of only a few places in the world with a half-hour time zone.' },
      { h: 'Using time zones' },
      'Today, time zones matter when you call a grandparent in another province, watch a hockey game that starts at 7 p.m. Eastern, or travel by plane. Remember: in Canada, the farther east you go, the later it is.',
      'Fleming had other big ideas, too. He led the survey of the route for the Canadian Pacific Railway, and he designed Canada’s first postage stamp, the Threepenny Beaver, in 1851. But his time zones may be his greatest gift. Every time you check a clock, you are using a system that a frustrated traveller helped to invent.'
    ],
    guide: { before: 'Look at a map of Canada’s time zones. Teach <b>time zone</b> and <b>prime meridian</b>. Ask: if a hockey game starts at 7 p.m. in Toronto, what time is it in Vancouver?',
      after: 'Find out what time it is right now in three other provinces or territories. Who do you know who lives in a different time zone?' },
    words: [['time zones', 'areas of the world that all use the same time'], ['prime meridian', 'the starting line for time zones, through Greenwich, England']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Fleming missed a train.', 'Sandford Fleming’s idea of time zones replaced confusing local times and is still used today.', 'Newfoundland is in the east.', 'Trains have timetables.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. When it is noon Eastern time, what time is it in the Mountain zone?',
        opts: ['10:00', '11:00', '1:00', '9:00'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were local times a problem for railways?',
        opts: ['Timetables had to list many different times.', 'Trains had no clocks.', 'The sun was too bright.', 'Tracks were too short.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the events in order.',
        items: ['Towns set clocks by the sun.', 'Fleming misses a train.', 'Countries agree on the prime meridian.', 'Most of the world uses standard time.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C3.2', half: true, q: 'A game starts at 7 p.m. in Toronto. What time is it in Vancouver?',
        opts: ['4 p.m.', '10 p.m.', '7 p.m.', '6 p.m.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “a Scottish-born Canadian engineer,” which word is a proper adjective?',
        opts: ['Canadian', 'engineer', 'born', 'a'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the cause and effect that led to time zones.',
        a: 'Every town had its own time, so train timetables were confusing. Because of this, Fleming came up with 24 time zones.', look: 'cause (confusing local times) and effect (time zones)' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Use what you learned to predict: if you flew from Halifax to Calgary, would you set your watch earlier or later? Explain.',
        a: 'Earlier, because Calgary is west of Halifax, and you move back one hour for each zone as you travel west.', look: 'a correct prediction using the east-west rule from the text' }
    ]
  });

  P.add({
    id: 'g5-permafrost', subject: 'geography', form: 'Report',
    title: 'Ground That Never Thaws',
    deck: 'What permafrost is, and what happens in the North when it starts to melt',
    hero: {
      photo: 'g5-tundra.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 210,
      cap: 'Arctic tundra in summer. Under the thin layer of plants and soil, the ground stays frozen all year.'
    },
    body: [
      'In much of northern Canada, if you dig down in the middle of summer, you will hit something hard: frozen ground. This is <b>permafrost</b>, ground that has stayed frozen for at least two years in a row. Some of it has been frozen for thousands of years. Permafrost lies under about half of Canada’s land.',
      { h: 'Layers of the North' },
      'Permafrost is not just frozen dirt. It is a mix of soil, rock, sand and ice, sometimes with large chunks of pure ice inside. On top of it sits the active layer, a thin layer of ground that thaws each summer and freezes again each winter. Plants of the <b>tundra</b>, such as mosses, lichens and low shrubs, grow in this thin layer. Trees cannot grow there, because their roots cannot reach down into the frozen ground.',
      { fig: '<path class="k" d="M6 40 H294"/>' + D.ripple(10, 290, 34, 't') +
          '<path class="d" d="M6 76 H294"/><path class="h" d="M6 80 H294 V160 H6 Z"/>' +
          '<rect class="k" x="180" y="100" width="50" height="26" rx="10"/>' +
          D.label(8, 20, 'plants: mosses, lichens, shrubs') + D.label(20, 64, 'active layer: thaws each summer') + D.label(20, 178, 'permafrost: frozen all year', 60, 150) + D.label(206, 178, 'chunk of ice', 205, 126),
        tall: 184, cap: 'The active layer sits on top of the permafrost.' },
      { h: 'A warming North' },
      'The Arctic is warming about three to four times faster than the world as a whole. As it warms, the active layer gets deeper, and the top of the permafrost begins to thaw. When the ice inside the ground melts, the ground can sink and slump. Roads crack, buildings tilt and airport runways buckle. In some places, whole hillsides slide away.',
      { box: 'Did you know?', text: 'Permafrost holds the remains of plants and animals that froze long ago. When it thaws, they rot and release gases that warm the planet even more, which thaws more permafrost.' },
      { h: 'Building on ice' },
      'People in northern communities such as Inuvik and Iqaluit have learned to build carefully. Many buildings stand on posts called piles, with an air space underneath, so the warmth of the building does not melt the ground. Some roads are built on thick layers of gravel to keep the ground below cold. Engineers and communities now watch the permafrost closely, measuring how it changes each year. Inuit and other Northern peoples, who know the land well, notice changes in the snow, ice and ground and share their <b>observations</b> with scientists.'
    ],
    guide: { before: 'Find the Arctic, Inuvik and Iqaluit on a map. Teach <b>permafrost</b> (permanent + frost), <b>tundra</b> and <b>active layer</b>. Look at the diagram layer by layer.',
      after: 'Why might Inuit observations be important to scientists? How would your life change if the ground under your home started to sink?' },
    words: [['permafrost', 'ground that stays frozen for two or more years'], ['tundra', 'cold, treeless land in the far North'], ['observations', 'things noticed by watching carefully']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Mosses grow in the Arctic.', 'Permafrost lies under much of the North, and warming is making it thaw, which damages land and buildings.', 'Iqaluit has an airport.', 'Ice is cold.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which layer thaws each summer?',
        opts: ['the active layer', 'the permafrost', 'the chunk of ice', 'none of them'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'Permafrost is a short form of two words. Which?',
        opts: ['permanent frost', 'perfect frost', 'permit frost', 'person frost'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Cause', 'Effect'],
        rows: [['The ice in the ground melts.', null], ['Thawing permafrost releases gases.', null], [null, 'Trees cannot grow on the tundra.']],
        a: [[null, 'The ground sinks, and roads and buildings crack.'], [null, 'The planet warms more, thawing more permafrost.'], ['Roots cannot reach into the frozen ground.', null]] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are many northern buildings built on posts?',
        opts: ['So their warmth does not melt the ground', 'To see over the snow', 'To keep animals out', 'Because posts are cheap'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“Some of <b>it</b> has been frozen for thousands of years.” What does <b>it</b> mean?',
        opts: ['permafrost', 'the summer', 'Canada', 'a building'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'The “Did you know?” box describes a cycle. Explain it and draw a conclusion.',
        a: 'Thawing permafrost releases gases that warm the planet, which thaws more permafrost. So once it starts, the thawing can speed itself up, which is a serious problem.', look: 'explains the cycle and draws a conclusion about it' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose knowledge does the text say is important besides scientists? Why?',
        a: 'Inuit and other Northern peoples. They live on the land and notice changes in the snow, ice and ground that scientists might miss.', look: 'names Northern peoples’ knowledge and explains its value' }
    ]
  });

  P.add({
    id: 'g5-sun-safety', subject: 'health', form: 'Explanation',
    title: 'Sunny Days, Smart Choices',
    deck: 'What the UV index tells you, and how to protect your skin and eyes',
    hero: {
      photo: 'g5-sunscreen.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Sunscreen, a hat and sunglasses: three simple ways to protect yourself from the sun.'
    },
    body: [
      'The sun gives us light, warmth and vitamin D. But sunlight also carries invisible rays called ultraviolet rays, or <b>UV rays</b>. You cannot see them or feel them, but they can burn your skin in less than half an hour on a summer day. Over many years, too much UV can damage your skin and eyes.',
      { h: 'The UV index' },
      'In Canada, weather forecasts often include the <b>UV index</b>. It is a number that tells you how strong the sun’s UV rays will be that day. The higher the number, the faster your skin can burn. In much of Canada, the UV index can reach 8 or more on a clear summer afternoon.',
      { fig: [['0–2', 'low', 'little protection needed'], ['3–5', 'moderate', 'hat, sunscreen'], ['6–7', 'high', 'shade at midday'], ['8–10', 'very high', 'extra care'], ['11+', 'extreme', 'stay in shade']].map(function (r, i) {
            var y = 6 + i * 32; return '<rect class="' + (i > 1 ? 'a' : 'k') + '" x="6" y="' + y + '" width="' + (40 + i * 22) + '" height="24" rx="4"/><text class="lb" x="12" y="' + (y + 17) + '">' + r[0] + '</text><text class="lb" x="' + (56 + i * 22) + '" y="' + (y + 17) + '">' + r[1] + '</text><text class="n" x="' + (130 + i * 22) + '" y="' + (y + 17) + '">' + r[2] + '</text>';
          }).join(''),
        tall: 166, cap: 'The UV index scale and what to do at each level.' },
      { h: 'When and where' },
      'UV rays are strongest between 11 a.m. and 3 p.m., when the sun is highest. They can pass through thin clouds, so you can burn even on a cloudy day. Water, sand and snow reflect UV rays, so skiers and swimmers get a double dose. A good rule: if your shadow is shorter than you are, the UV rays are strong.',
      { box: 'Slip, slop, slap, slide', text: 'Slip on a shirt. Slop on sunscreen (SPF 30 or more). Slap on a wide-brimmed hat. Slide on sunglasses.' },
      { h: 'Protecting yourself' },
      'Sunscreen works by blocking or soaking up UV rays before they reach your skin. Put it on 15 minutes before going outside, and put on more every two hours and after swimming. Do not forget your ears, the back of your neck and the tops of your feet. Clothing, hats and shade work even better, because they block the rays completely.',
      'Sunburn is not the only danger. Each burn harms the cells in your skin, and the harm adds up over the years. That is why doctors say it is better to prevent a burn than to treat one. A cool shower and aloe gel can make a burn feel better, but they cannot undo the damage. Children’s skin is thin and burns easily, so habits that start now protect you for life.',
      'Your eyes need protection, too. Sunglasses that block UV rays protect your eyes now and help keep them healthy as you get older. Being sun-smart does not mean staying inside. It means enjoying the outdoors and coming home without a burn.'
    ],
    guide: { before: 'Check today’s UV index in a weather app or forecast. Teach <b>UV rays</b>, <b>UV index</b> and <b>SPF</b>. Try the shadow rule outside at different times of day.',
      after: 'Plan a sun-smart day at the beach. What will you pack, and at what times will you look for shade?' },
    words: [['UV rays', 'invisible rays from the sun that can burn skin'], ['UV index', 'a number that tells how strong the sun’s UV rays are']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The sun is warm.', 'UV rays can harm skin and eyes, and the UV index and simple habits help us stay safe.', 'Snow reflects light.', 'Sunglasses are cool.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the scale. A UV index of 7 is …',
        opts: ['high', 'low', 'moderate', 'extreme'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why can skiers get a “double dose” of UV?',
        opts: ['Snow reflects UV rays.', 'Mountains are hot.', 'Skis attract the sun.', 'They ski at night.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart from the “Slip, slop, slap, slide” box.', cols: ['Word', 'What to do'],
        rows: [['Slip', null], ['Slop', null], ['Slap', null], ['Slide', null]], a: [[null, 'on a shirt'], [null, 'on sunscreen'], [null, 'on a hat'], [null, 'on sunglasses']] },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why use slip, slop, slap and slide?',
        opts: ['The sounds are easy to remember.', 'They are science words.', 'They describe a beach.'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“If your shadow is shorter than you are, the UV rays are strong.” Which part is the dependent clause?',
        opts: ['If your shadow is shorter than you are', 'the UV rays are strong', 'are strong', 'your shadow'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 2, q: 'Summarize the advice in the text in two sentences.',
        a: 'Check the UV index and protect yourself most between 11 a.m. and 3 p.m. Use sunscreen, clothing, a hat, shade and sunglasses.', look: 'the main pieces of advice in their own words' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of a sunny day you spent outside. Which advice would have helped you?',
        a: 'At the lake, I burned my shoulders. I should have put on more sunscreen after swimming and worn a shirt in the afternoon.', look: 'a personal connection matched to specific advice' }
    ]
  });

  P.add({
    id: 'g5-storm-paddle', subject: 'story', form: 'Short story',
    title: 'Paddling Into the Wind',
    deck: 'On a canoe trip in Algonquin Park, Nadia and her uncle race a storm across the lake',
    hero: {
      photo: 'g5-canoe-lake.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A canoe on a lake in Ontario. On big lakes, the weather can change quickly.'
    },
    body: [
      'The morning had been made of glass. The lake lay perfectly still, and the canoe slid across it as quietly as a loon. Nadia trailed her fingers in the cold water and watched the reflections of the pines ripple and mend behind them.',
      'By noon, everything had changed. Uncle Sami stopped paddling and pointed west with his chin. A dark wall of cloud was rolling over the hills, swallowing the blue sky like ink spreading through water. The wind arrived first. It slapped the surface into small grey waves.',
      '“We need to get to that island,” Uncle Sami said calmly. “Paddle hard, but stay low and steady.”',
      { fig: '<path class="k" d="M10 120 Q60 60 110 90 Q160 120 210 50 Q250 20 290 40"/>' + [[30, 100, 'calm lake'], [100, 88, 'clouds appear'], [170, 88, 'wind and waves'], [214, 48, 'race to island'], [282, 40, 'safe']].map(function (t) { return '<circle class="a" cx="' + t[0] + '" cy="' + t[1] + '" r="5"/><text class="n" x="' + t[0] + '" y="' + (t[1] + 22) + '" text-anchor="middle">' + t[2] + '</text>'; }).join('') +
          '<text class="lb" x="10" y="160">The rising action builds to the climax.</text>',
        tall: 166, cap: 'A plot line of the story.' },
      'Nadia dug her paddle into the water. Her shoulders burned. Each wave lifted the bow and dropped it again with a smack, and cold spray stung her face. The island looked close, then far, then close again. Thunder grumbled somewhere behind the hills, low and long, like a bear waking up in a cave.',
      '“Count your strokes,” Uncle Sami called. “One, two, three, four. Don’t look at the island. Look at the next wave.”',
      'So she counted. One wave, then the next, then the next. She stopped thinking about the storm and thought only about her paddle and the water right in front of her.',
      'The canoe scraped onto the pebbles of the island just as the first fat raindrops hit. They hauled the boat up the beach, flipped it over and crawled underneath. Rain drummed on the <b>hull</b> like a hundred fingers tapping a table. Nadia was soaked, shaking and grinning.',
      '“You did well,” Uncle Sami said. “The lake taught you something today.”',
      '“What?” Nadia asked.',
      'Uncle Sami tapped the overturned canoe. “When I was your age, my grandmother told me the same thing. She paddled these lakes long before there were maps with campsites on them. She said you cannot fight a lake. You can only listen to it and be patient.”',
      'He smiled. “That a big job is just a lot of small strokes.”',
      'An hour later, the storm had passed. The lake was calm again, as if nothing had happened. But Nadia knew it had. She felt <b>stronger</b>, and she would never look at a dark cloud the same way again.'
    ],
    guide: { before: 'Ask if the child has been in a canoe or a boat. Explain rising action and climax. Teach <b>bow</b> (the front of a canoe) and <b>hull</b> (the body of a boat).',
      after: 'What did Uncle Sami mean by “a big job is just a lot of small strokes”? When could you use that advice?' },
    words: [['stronger', 'having more strength or courage'], ['hull', 'the main body of a boat']],
    qs: [
      { k: 'choice', code: 'C3.1', q: '“The morning had been made of glass.” What does this image show?',
        opts: ['The lake was perfectly still and smooth.', 'The canoe was made of glass.', 'It was very cold.', 'The windows broke.'], a: 0 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the events in order.',
        items: ['The lake is calm.', 'Dark clouds appear.', 'Nadia counts her strokes.', 'They hide under the canoe.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'On the plot line, which event is the climax?',
        opts: ['the race to the island', 'the calm lake', 'the end of the storm', 'eating lunch'], a: 0 },
      { k: 'table', code: 'C3.1', q: 'Find the comparison and say what it helps you imagine.', cols: ['Comparison', 'What it helps you imagine'],
        rows: [['like ink spreading through water', null], ['like a bear waking up in a cave', null]],
        a: [[null, 'the dark clouds spreading quickly across the sky'], [null, 'the low, deep rumble of thunder']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Uncle Sami tell Nadia to look at the next wave?',
        opts: ['To keep her focused on one small step', 'To find fish', 'To steer away', 'To scare her'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who tells the story?',
        opts: ['a third-person narrator', 'Nadia, using “I”', 'Uncle Sami, using “I”', 'the lake'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Nadia ends up “soaked, shaking and grinning.” Why is she grinning? Use evidence.',
        a: 'She is proud and relieved because she paddled hard through the storm and they reached the island safely.', look: 'an inference about her feelings, supported by events in the story' },
      { k: 'lines', code: 'C2.5', n: 3, q: '“A big job is just a lot of small strokes.” Describe a big job in your life you could break into small steps.',
        a: 'Writing a long report feels big. I could do one paragraph a day, like counting one stroke at a time.', look: 'a personal connection that applies the lesson' }
    ]
  });

  P.add({
    id: 'g5-contour-lines', subject: 'geography', form: 'Explanation',
    title: 'Reading the Hills',
    deck: 'How contour lines on a map show the shape of the land',
    hero: {
      photo: 'g5-topo-map.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A topographic map. The thin wavy lines are contour lines. They show hills and valleys on a flat sheet of paper.'
    },
    body: [
      'A map is flat, but the land is not. How can a flat sheet of paper show a mountain, a valley or a steep cliff? Mapmakers use a clever tool: the <b>contour line</b>.',
      { h: 'Lines of equal height' },
      'A contour line joins places that are at the same height above sea level, called the <b>elevation</b>. Imagine walking around a hill without ever going up or down. The path you followed would be a contour line. A map with contour lines is called a topographic map.',
      'Each contour line is a set height apart from the next, such as 10 metres. That difference is called the contour interval. If you start at the bottom of a hill and cross five lines to reach the top, and the interval is 10 metres, the hill is about 50 metres high.',
      { fig: '<ellipse class="k" cx="80" cy="80" rx="70" ry="60"/><ellipse class="k" cx="86" cy="80" rx="48" ry="40"/><ellipse class="k" cx="92" cy="80" rx="26" ry="20"/><circle class="a" cx="96" cy="80" r="3"/>' +
          '<ellipse class="k" cx="226" cy="80" rx="64" ry="60"/><ellipse class="k" cx="250" cy="80" rx="38" ry="40"/><ellipse class="k" cx="268" cy="80" rx="14" ry="20"/>' +
          '<text class="n" x="10" y="150">100 m</text><text class="n" x="40" y="62">110 m</text><text class="n" x="74" y="76">120 m</text>' +
          D.label(4, 14, 'a round hill') + D.label(180, 14, 'steep on the right side') + D.label(260, 162, 'lines close: steep', 284, 90) + D.label(150, 172, 'lines far apart: gentle', 172, 100),
        tall: 176, cap: 'Two hills seen from above. Where the lines are close together, the slope is steep.' },
      { h: 'Reading the shape' },
      'The spacing of the lines tells you how steep the land is. Where contour lines are close together, the land rises quickly, so the slope is steep. Where they are far apart, the land rises slowly, so the slope is gentle. A set of small circles inside one another shows a hill or the top of a mountain. Lines that bend into a V shape often show a valley with a stream running through it.',
      { box: 'Try it', text: 'Make a fist and draw around each knuckle with a washable marker at the same heights. Then look down from above. You have made contour lines.' },
      { h: 'Who uses them?' },
      'Contour lines can also show a valley. In a valley, the lines bend into a V shape, and the point of the V aims uphill. A stream often runs along the bottom of the V. A flat area, like a plain or a wide marsh, has hardly any contour lines at all, because the height barely changes. A cliff shows up as lines so close that they almost touch.',
      'Hikers use topographic maps to choose trails and avoid cliffs. Canoeists use them to find the easiest portage between lakes. Engineers use them to plan roads and rail lines that do not climb too steeply. Cities use them to see where water will flow and where flooding might happen. Learning to read contour lines lets you see the hills before you even leave home.'
    ],
    guide: { before: 'Try the fist activity in the “Try it” box. Teach <b>contour line</b>, <b>elevation</b> and <b>contour interval</b>. Find the steep side of the second hill together.',
      after: 'Look at a topographic map of a park near you, online or on paper. Where would you plan an easy hike? Where is it steep?' },
    words: [['contour line', 'a line on a map joining places at the same height'], ['elevation', 'height above sea level']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Hikers like maps.', 'Contour lines show the height and shape of the land on a flat map.', 'Hills are round.', 'Maps are flat.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, why is one side of the second hill steep?',
        opts: ['The lines are close together there.', 'It is labelled red.', 'It is bigger.', 'It has a dot.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'A hill has 4 lines from bottom to top, 20 m apart. About how high is it?',
        opts: ['80 m', '20 m', '24 m', '40 m'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['What you see on the map', 'What the land is like'],
        rows: [['lines close together', null], ['lines far apart', null], ['small circles inside each other', null]], a: [[null, 'steep'], [null, 'gentle slope'], [null, 'a hill or mountain top']] },
      { k: 'choice', code: 'C1.3', half: true, q: 'What is the purpose of the caption under the photo?',
        opts: ['to explain what the wavy lines on the map are', 'to name the photographer', 'to give a direction', 'to list hikers'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Elevation</b> means …',
        opts: ['height above sea level', 'a kind of map', 'a valley', 'a lift'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The idea of contour lines can be hard to picture. Which strategy helped you most? Explain.',
        a: 'Imagining walking around a hill without going up or down helped me. Then I looked at the diagram and could see each line as one of those paths.', look: 'names a strategy (visualize, use the diagram, try it, reread) and how it helped' },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Give one example of how contour lines could be useful in another subject or job.',
        a: 'In science, contour lines could show where rainwater will flow on a hill, so you could predict where a stream might form.', look: 'a sensible use in another subject or career' }
    ]
  });

  P.add({
    id: 'g5-sea-ice', subject: 'geography', form: 'Report',
    title: 'The Highway of Ice',
    deck: 'Why sea ice matters to Inuit communities, polar bears and the whole planet',
    hero: {
      photo: 'g5-sea-ice.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Sea ice in the Arctic Ocean. In winter, it covers much of the ocean around Canada’s northern islands.'
    },
    body: [
      'For much of the year, the ocean around Canada’s Arctic islands is covered with a thick layer of frozen sea water. This <b>sea ice</b> is not just a frozen surface. For Inuit, it has been a highway, a hunting ground and a meeting place for thousands of years.',
      { h: 'Life on the ice' },
      'Inuit hunters travel across the sea ice by dog team or snowmobile to hunt seals, walrus and polar bears, and to visit other communities. Knowing the ice is a matter of life and death. Elders teach young people how to read its colour, its sounds and the way the snow lies on it. Darker ice is often thinner. Ice that has been worn by currents may look solid but be dangerously weak.',
      { fig: '<text class="lb" x="6" y="16">Arctic sea ice in September (lowest each year)</text><path class="k" d="M40 150 H290 M40 150 V30"/>' +
          [[1980, 7.8], [1990, 6.2], [2000, 6.3], [2010, 4.9], [2020, 4.0]].map(function (d, i) { var x = 60 + i * 46, h = d[1] * 13; return '<rect class="a" x="' + x + '" y="' + (150 - h) + '" width="28" height="' + h + '"/><text class="n" x="' + (x + 14) + '" y="166" text-anchor="middle">' + d[0] + '</text><text class="n" x="' + (x + 14) + '" y="' + (144 - h) + '" text-anchor="middle">' + d[1] + '</text>'; }).join('') +
          '<text class="n" x="34" y="34" text-anchor="end">million</text><text class="n" x="34" y="46" text-anchor="end">km²</text>',
        tall: 172, cap: 'The area of Arctic sea ice in September has shrunk over 40 years (rounded numbers).' },
      { h: 'A shrinking cover' },
      'Each year, sea ice grows in winter and melts back in summer. But over the past 40 years, scientists measuring from satellites have found that there is much less ice at the end of summer than there used to be. The ice that remains is also thinner. In many places, it forms later in the fall and breaks up earlier in the spring.',
      'Why is the ice melting? Earth’s climate is getting warmer, and the Arctic is warming about three times faster than the rest of the planet. White ice reflects most of the sunlight that hits it. When the ice melts, the dark ocean underneath soaks up that heat instead. The warmer water then melts even more ice, so the change speeds itself up.',
      'This makes travel more dangerous for hunters, and some routes are no longer safe. Polar bears, which hunt seals from the ice, must swim farther and wait longer on land with little food.',
      { box: 'Did you know?', text: 'White ice reflects most sunlight back into space, which helps keep Earth cool. Dark ocean water absorbs sunlight and warms up. So as ice melts, the water warms, and more ice melts.' },
      { h: 'Watching together' },
      'Inuit communities and scientists now work side by side. Hunters record ice thickness and conditions with GPS and share them online, so others can travel more safely. This <b>partnership</b> combines satellite science with knowledge passed down for generations.'
    ],
    guide: { before: 'Find the Canadian Arctic Archipelago on a map. Teach <b>sea ice</b> and <b>partnership</b>. Read the bar graph together and describe the trend.',
      after: 'Why is it valuable for Inuit hunters and scientists to share what they know? What does the graph make you wonder?' },
    words: [['sea ice', 'frozen ocean water'], ['partnership', 'working together toward a shared goal']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Polar bears hunt seals.', 'Sea ice is vital to Inuit life and the planet, and it is shrinking, so communities and scientists are working together.', 'Satellites measure ice.', 'Dark ice is thin.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What trend does the bar graph show?',
        opts: ['September sea ice has mostly decreased.', 'Sea ice has grown.', 'Sea ice stays the same.', 'There is no ice in 2020.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do polar bears wait longer on land with little food?',
        opts: ['The ice they hunt from forms later and melts earlier.', 'They like the land.', 'There are no seals.', 'It is too cold.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Cause', 'Effect'],
        rows: [['Ice melts and dark water is exposed.', null], ['Ice is thinner and breaks up earlier.', null]], a: [[null, 'The water absorbs sunlight and warms, melting more ice.'], [null, 'Travel is more dangerous for hunters.']] },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which detail shows how Inuit knowledge is passed on?',
        opts: ['Elders teach young people how to read the ice.', 'Satellites take photos.', 'Ice is white.', 'Seals swim.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “Hunters record ice thickness,” which word is the direct object?',
        opts: ['thickness', 'hunters', 'record', 'ice'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What conclusion can you draw from the graph and the text together?',
        a: 'The Arctic is warming, so there is less sea ice each September than 40 years ago, which affects Inuit hunters and polar bears.', look: 'a conclusion that uses both the graph and the text' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'How did reading the graph help you think critically about the text’s claims?',
        a: 'The text says there is much less ice now. The graph gave me numbers that show it, so I could check the claim myself.', look: 'explains using the graph as evidence to check a claim' }
    ]
  });

  P.add({
    id: 'g5-cartier', subject: 'history', form: 'Report',
    title: 'Cartier and Donnacona',
    deck: 'When a French explorer met the people of Stadacona, 1534 to 1536',
    hero: {
      photo: 'g5-cartier.jpg', credit: 'CREDIT', focus: '50% 40%',
      tall: 210,
      cap: 'A painting of Jacques Cartier, made long after his death. No one knows exactly what he looked like.'
    },
    body: [
      'In 1534, a French sailor named Jacques Cartier crossed the Atlantic Ocean with two ships. The king of France had sent him to look for gold and a sea route to Asia. Instead, he found a land where people had lived for thousands of years.',
      { h: 'A cross at Gaspé' },
      'At Gaspé, Cartier met a group of Stadaconans, St. Lawrence Iroquoians who had come to fish. Their leader was Donnacona. Cartier’s men put up a tall wooden cross with the words “Long live the King of France.” Donnacona understood what this meant. He pointed to the land around them and made it clear, with signs, that the land was theirs. Cartier claimed that the cross was only a landmark.',
      'When Cartier sailed home, he took two of Donnacona’s sons, Domagaya and Taignoagny, with him to France. Historians still debate whether they went willingly.',
      { fig: '<path class="k" d="M10 40 H290"/>' + [[20, '1534', 'Gaspé: the cross'], [110, '1535', 'up the river to Stadacona'], [200, '1535–36', 'winter; Stadaconans help'], [280, '1536', 'Donnacona taken to France']].map(function (t, i) {
            return '<circle class="a" cx="' + t[0] + '" cy="40" r="5"/><text class="lb" x="' + t[0] + '" y="' + (i % 2 ? 66 : 24) + '" text-anchor="' + (t[0] < 40 ? 'start' : t[0] > 260 ? 'end' : 'middle') + '">' + t[1] + '</text><text class="n" x="' + t[0] + '" y="' + (i % 2 ? 82 : 98) + '" text-anchor="' + (t[0] < 40 ? 'start' : t[0] > 260 ? 'end' : 'middle') + '">' + t[2] + '</text>';
          }).join(''),
        tall: 104, cap: 'A timeline of Cartier’s first two voyages.' },
      { h: 'Up the river' },
      'In 1535, Cartier returned. Domagaya and Taignoagny guided him up the St. Lawrence River to their home village, Stadacona, where Québec City is today. They also told him the word <b>kanata</b>, which means village or settlement. Cartier used it to name the whole region, and it became the name Canada.',
      { box: 'A gift of knowledge', text: 'That winter, many of Cartier’s men fell sick with scurvy. Domagaya showed them how to make a tea from the bark and needles of a tree, probably eastern white cedar. The tea cured them.' },
      { h: 'A broken trust' },
      'In the spring of 1536, Cartier kidnapped Donnacona, his sons and several others and took them to France. He wanted Donnacona to tell the king about a rich kingdom called Saguenay. Donnacona never came home. He died in France a few years later. By the time Europeans returned decades later, the people of Stadacona had disappeared, and historians are still not sure why.',
      'Cartier made a third voyage in 1541, but by then the Stadaconans no longer trusted him. His men tried to build a settlement, but it failed. The rocks he carried home as “diamonds” and “gold” turned out to be quartz and a shiny mineral called pyrite.',
      'Cartier is often called an explorer who “discovered” Canada. But the story of Donnacona shows that this land was already home to <b>nations</b> with leaders, villages and knowledge, and that their trust was broken.'
    ],
    guide: { before: 'Find Gaspé and Québec City on a map. Teach <b>claim</b>, <b>kanata</b> and <b>nation</b>. Explain that the St. Lawrence Iroquoians were a people who lived along the river at that time.',
      after: 'Why do many people today question the word “discovered”? How might Donnacona have told this story?' },
    words: [['kanata', 'an Iroquoian word for village or settlement, the root of “Canada”'], ['nations', 'peoples with their own lands, leaders and ways of life']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Cartier looked for gold.', 'Cartier’s voyages depended on Donnacona’s people, but he broke their trust.', 'Cedar tea cures scurvy.', 'Gaspé is in Québec.'], a: 1 },
      { k: 'order', code: 'C1.4', half: true, q: 'Use the timeline. Number the events.',
        items: ['The cross at Gaspé', 'Cartier reaches Stadacona.', 'Domagaya shares the cure.', 'Donnacona is taken to France.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Donnacona point to the land around the cross?',
        opts: ['To show that the land belonged to his people', 'To show where to fish', 'To welcome the king', 'To ask for gold'], a: 0 },
      { k: 'choice', code: 'B2.2', q: 'Where does the name <b>Canada</b> come from?',
        opts: ['an Iroquoian word, kanata, meaning village', 'the name of a French king', 'a Latin word for river', 'Cartier’s ship'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> also told him the word kanata.” Who are <b>they</b>?',
        opts: ['Domagaya and Taignoagny', 'Cartier’s sailors', 'the king and queen', 'the historians'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'What saved Cartier’s men from scurvy?',
        opts: ['a tea made from a tree, shared by Domagaya', 'food from France', 'warm clothes', 'fishing'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The author puts “discovered” in quotation marks. Why? What perspective does this show?',
        a: 'Because Canada was already home to nations like Donnacona’s. The author shows that the word leaves out the Indigenous point of view.', look: 'explains the quotation marks as questioning the word, from an Indigenous perspective' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Draw a conclusion about how Cartier treated Donnacona’s people. Support it with two details.',
        a: 'He took their help but did not treat them fairly. Domagaya cured his men, yet Cartier kidnapped Donnacona and his sons.', look: 'a conclusion supported by two details from the text' }
    ]
  });

  P.add({
    id: 'g5-insulin', subject: 'science', form: 'Report',
    title: 'The Toronto Discovery',
    deck: 'How a team in Toronto found a way to treat diabetes, and why it still matters today',
    hero: {
      photo: 'g5-banting-best.jpg', credit: 'CREDIT', focus: '50% 40%',
      tall: 220,
      cap: 'Frederick Banting (right) and Charles Best on the roof of the medical building at the University of Toronto, 1921.'
    },
    body: [
      'Before 1922, a child who was told they had type 1 diabetes had very little hope. Doctors could only put them on a strict diet that made them weak and thin. Most lived for only a year or two. Then a team at the University of Toronto made a discovery that changed medicine around the world.',
      { h: 'Sugar and the body' },
      'Your body runs on a sugar called glucose. It comes from the food you eat and travels in your blood to every cell. But glucose cannot get into most cells on its own. It needs a helper called <b>insulin</b>, which is made by an organ behind your stomach called the <b>pancreas</b>.',
      { fig: steps(10, [['food', 'eaten'], ['glucose', 'in the blood'], ['insulin', 'opens the cell'], ['energy', 'for the cell']], 64) +
          '<text class="n" x="150" y="90" text-anchor="middle">Without insulin, glucose stays in the blood and the cells starve.</text>',
        tall: 100, cap: 'How insulin helps the body use food for energy.' },
      'In type 1 diabetes, the pancreas stops making insulin. Glucose builds up in the blood, while the cells go hungry.',
      { h: 'The experiment' },
      'In 1921, a young doctor named Frederick Banting had an idea. Maybe he could take insulin from the pancreas of an animal and give it to a person. Professor John Macleod gave him a laboratory, and a student named Charles Best became his assistant. They worked through a hot summer, testing their extract on dogs. Later, a chemist named James Collip found a way to make the extract pure and safe.',
      'In January 1922, they gave insulin to Leonard Thompson, a 14-year-old boy who was very ill at Toronto General Hospital. Within days, the sugar in his blood dropped, and he grew stronger. News spread quickly. Soon, parents from far away were bringing their children to Toronto.',
      { box: 'A gift to the world', text: 'Banting, Best and Collip sold the rights to insulin to the University of Toronto for one dollar each. They wanted it to be cheap enough for everyone who needed it.' },
      'Not everyone believed in the work at first. Some scientists had tried similar experiments and failed. The team faced long nights, failed tests and arguments about who deserved credit. But they kept careful notes, learned from each mistake and tried again.',
      'In 1923, Banting and Macleod won the Nobel Prize in medicine. Banting shared his prize money with Best, and Macleod shared his with Collip. Insulin does not cure diabetes, but today millions of people around the world use it every day to live long, healthy lives.'
    ],
    guide: { before: 'Find Toronto on a map. Explain that the pancreas is an organ, and that diabetes means the body cannot use sugar properly. Teach <b>insulin</b>, <b>pancreas</b> and <b>extract</b>.',
      after: 'Why do you think the team sold insulin for one dollar? What does that tell you about them?' },
    words: [['insulin', 'a substance that helps cells take in sugar'], ['pancreas', 'an organ that makes insulin']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Dogs helped with science.', 'A Toronto team discovered how to use insulin to treat diabetes, saving millions of lives.', 'Diabetes is caused by sugar.', 'The Nobel Prize is important.'], a: 1 },
      { k: 'order', code: 'C1.4', q: 'Number the steps in the diagram from 1 to 4.',
        items: ['You eat food.', 'Glucose travels in the blood.', 'Insulin opens the cell.', 'The cell gets energy.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did children with type 1 diabetes become ill?',
        opts: ['Their pancreas stopped making insulin.', 'They ate too much.', 'They had a cold.', 'Their blood had no sugar.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Insulin does not cure diabetes, <b>but</b> millions use it.” What does <b>but</b> show?',
        opts: ['a contrast', 'a time order', 'a reason', 'an example'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in what each person did.', cols: ['Person', 'What they did'],
        rows: [['Frederick Banting', null], ['Charles Best', null], ['James Collip', null]],
        a: [[null, 'had the idea to take insulin from an animal’s pancreas'], [null, 'was Banting’s student assistant'], [null, 'made the extract pure and safe']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'What do the actions in the “A gift to the world” box tell you about the team’s values? Use evidence.',
        a: 'They cared more about helping people than about getting rich. They sold insulin for one dollar each so everyone could afford it.', look: 'names a value and supports it with the one-dollar sale' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about diabetes, medicine or the body? How did it help you read?',
        a: 'I knew my grandmother checks her blood sugar. That helped me understand why glucose in the blood matters.', look: 'names prior knowledge and how it helped' }
    ]
  });

  P.add({
    id: 'g5-aluminum', subject: 'science', form: 'Explanation',
    title: 'The Can That Comes Back',
    deck: 'Why an aluminum can can be recycled again and again, and what changes when it melts',
    hero: {
      photo: 'g5-crushed-cans.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'Crushed aluminum cans pressed into a block, ready to be melted down.'
    },
    body: [
      'Think about the last drink can you held. It was light, thin and strong enough to hold a fizzy drink under pressure. That can is made of <b>aluminum</b>, a metal that can be recycled over and over without wearing out. The can you toss in the blue bin today could be back on a store shelf in about two months.',
      { h: 'From bin to block' },
      'At a recycling plant, cans are sorted from other materials. Magnets pull out steel cans. Aluminum is not magnetic, so a different machine pushes it off the belt. The cans are crushed into blocks, then shredded into small pieces and cleaned.',
      { fig: steps(6, [['sort', 'by metal'], ['crush', 'into blocks'], ['melt', '660 °C'], ['roll', 'into sheets'], ['new can', '']], 50),
        tall: 60, cap: 'The journey of a recycled can.' },
      { h: 'A physical change' },
      'Next, the pieces go into a furnace. Aluminum melts at about 660 °C. The solid metal becomes a shiny liquid. This is a <b>physical change</b>: the aluminum changes state, but it is still aluminum. When it cools, it turns back into a solid. Workers pour it into moulds to make large bars, which are rolled into thin sheets. The sheets are cut and pressed into new cans.',
      'A chemical change is different. When wood burns, it turns into ash, smoke and gases. You cannot turn ash back into wood. Because melting aluminum is a physical change, the metal can be melted and shaped again and again.',
      { box: 'Did you know?', text: 'Making a can from recycled aluminum uses about 95% less energy than making one from new metal dug out of the ground.' },
      { h: 'Why it matters' },
      'New aluminum comes from a rock called bauxite. Digging it up and turning it into metal takes huge amounts of energy and leaves scars on the land. Recycling saves that energy and protects the land. Quebec and British Columbia have large aluminum plants that use electricity from rivers. Still, the cleanest can is one made from a can that already exists.',
      'Not every can makes it back. Cans that end up in the garbage are buried in landfills, where the metal is wasted. That is why many provinces pay a small deposit on drink cans. You pay a few cents extra when you buy the drink, and you get the money back when you return the empty can.',
      'So the next time you finish a drink, rinse the can and put it in the right bin. It is not garbage. It is a can waiting to come back.'
    ],
    guide: { before: 'Show an aluminum can and a steel can and test them with a fridge magnet. Review solids and liquids. Teach <b>physical change</b> and <b>chemical change</b>.',
      after: 'Name another physical change you have seen at home. Can it be reversed?' },
    words: [['aluminum', 'a light, strong metal'], ['physical change', 'a change in form or state that does not make a new substance']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Cans are light.', 'Aluminum cans can be recycled again and again because melting is a physical change, which saves energy.', 'Quebec makes aluminum.', 'Wood burns.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How are aluminum cans separated from steel cans?',
        opts: ['Magnets pull out the steel.', 'By colour', 'By weight', 'By hand only'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what happens right after the cans are melted?',
        opts: ['They are rolled into sheets.', 'They are sorted.', 'They are crushed.', 'They are sold.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Sort each change.', cols: ['Change', 'Physical or chemical?'],
        rows: [['Aluminum melts.', null], ['Wood burns.', null], ['Liquid metal cools into a bar.', null]],
        a: [[null, 'physical'], [null, 'chemical'], [null, 'physical']] },
      { k: 'choice', code: 'C1.6', half: true, q: 'The last line says the can is “waiting to come back.” This is …',
        opts: ['personification', 'a fact', 'a heading', 'a list'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“Aluminum melts at about 660 °C.” What does °C mean?',
        opts: ['degrees Celsius', 'centimetres', 'cans', 'cups'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Explain why aluminum can be recycled “over and over.” Use the words physical change.',
        a: 'Melting is a physical change, so the aluminum stays aluminum. It can be melted and shaped into new cans again and again.', look: 'links physical change to endless recycling' },
      { k: 'lines', code: 'A3.1', n: 3, q: 'How could your class or family use what you learned? Give one action and a reason.',
        a: 'We could set up a bin just for cans in our classroom. Recycling them saves energy and keeps them out of the garbage.', look: 'a realistic action with a reason from the text' }
    ]
  });

  P.add({
    id: 'g5-hadfield', subject: 'tech', form: 'Biography',
    title: 'A Farm Boy in Space',
    deck: 'Chris Hadfield dreamed of space as a boy in Ontario, and the Canadarm helped get him there',
    hero: {
      photo: 'g5-hadfield.jpg', credit: 'CREDIT', focus: '50% 35%',
      tall: 230,
      cap: 'Chris Hadfield on board the International Space Station in 2013.'
    },
    body: [
      'In July 1969, a nine-year-old boy named Chris Hadfield sat in front of a small black-and-white television on a farm near Milton, Ontario. He watched two astronauts walk on the Moon. That night, he decided that he would become an astronaut too. At the time, Canada did not even have astronauts. That did not stop him.',
      { h: 'Building a dream' },
      'Chris knew that a dream needs a plan. He studied hard, learned to fly gliders as a teenager, and joined the Canadian air force. He became an engineer and a test pilot, flying new jets to see how they behaved. In 1992, the Canadian Space Agency chose him as one of four new astronauts out of more than 5000 people who applied.',
      { fig: '<path class="k" d="M20 150 H280"/><rect class="k" x="40" y="140" width="40" height="10"/>' +
          '<path class="a" d="M60 140 L110 70 L190 50 L240 90"/><circle class="k" cx="110" cy="70" r="6"/><circle class="k" cx="190" cy="50" r="6"/>' +
          '<path class="k" d="M240 90 l-8 12 M240 90 l10 10"/>' +
          D.label(20, 175, 'base', 60, 150) + D.label(85, 40, 'shoulder joint', 110, 64) + D.label(180, 25, 'elbow joint', 190, 44) + D.label(236, 128, 'hand', 242, 100),
        tall: 180, cap: 'The Canadarm moves like a human arm, with joints that bend and turn.' },
      { h: 'Canada’s arm' },
      'Canada had become famous in space for a robot arm. The first <b>Canadarm</b> flew on the American space shuttle in 1981. Astronauts used it to grab satellites and move heavy cargo. In 2001, Chris helped install a larger arm, Canadarm2, on the International Space Station. During that mission, he became the first Canadian to walk in space.',
      { h: 'Commander Hadfield' },
      'In 2013, Chris became the first Canadian to command the space station. For five months, he led the crew, ran experiments and fixed equipment. He also shared his life in space with millions of people on Earth. He posted photographs of Canadian cities at night, showed how to wash your hands when water floats, and sang a song while drifting in the station.',
      'Living in space is not easy. Without gravity, muscles and bones grow weaker, so astronauts exercise for about two hours every day. Food floats away if you are not careful, and you sleep in a bag tied to the wall.',
      'Today, Chris visits schools and talks about <b>perseverance</b>: keeping going even when a goal seems far away. He likes to say that a big dream is reached one small step at a time, by doing the next thing well.'
    ],
    guide: { before: 'Explain that the International Space Station circles Earth with astronauts from many countries. Teach <b>Canadarm</b>, <b>commander</b> and <b>perseverance</b>.',
      after: 'What is one goal you have? What is the next small step you could take toward it?' },
    words: [['Canadarm', 'a robot arm built in Canada for use in space'], ['perseverance', 'keeping on even when something is hard']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Space is dark.', 'Chris Hadfield planned and worked for years to become a Canadian astronaut and commander.', 'Gliders are fun.', 'Milton is a farm town.'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number these events in time order.',
        items: ['Chris watches the Moon landing.', 'Chris becomes an astronaut.', 'Chris walks in space.', 'Chris commands the space station.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram compare the Canadarm to?',
        opts: ['a human arm', 'a crane', 'a bird', 'a ladder'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does the author mention that Canada had no astronauts in 1969?',
        opts: ['to show how big Chris’s dream was', 'to blame Canada', 'to explain the Moon', 'to describe the farm'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Commander</b> comes from <i>command</i>. What does a commander do?',
        opts: ['leads', 'cooks', 'cleans', 'builds'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does the author start with a boy watching TV?',
        opts: ['to show where the dream began', 'to describe old TVs', 'to talk about farms', 'to list astronauts'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Find two pieces of evidence that Chris showed perseverance.',
        a: 'He studied hard and became a pilot and engineer even though Canada had no astronauts. He was picked out of more than 5000 people.', look: 'two specific details linked to perseverance' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'From the title, what did you predict? How did your prediction change as you read?',
        a: 'I thought it would be about a farmer who flew a rocket. Then I learned he became an astronaut through years of work.', look: 'states a prediction and how it was confirmed or changed' }
    ]
  });

  P.add({
    id: 'g5-tricky-graphs', subject: 'math', form: 'Explanation',
    title: 'Graphs That Fool You',
    deck: 'The same numbers can tell different stories. Here is how to spot a graph that is trying to trick you',
    hero: {
      photo: 'g5-bar-graph.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Graphs are everywhere: in news stories, ads and reports. Not all of them are fair.'
    },
    body: [
      'Graphs help us see numbers at a glance. A tall bar means more, a short bar means less. But because we read graphs so quickly, a graph can also fool us. Some graphs are made to mislead on purpose, and some are just made carelessly. A smart reader checks before believing.',
      { h: 'Look at the scale' },
      'Two juice companies, Sunny and Zest, ask 100 people which juice they like best. Sunny gets 52 votes and Zest gets 48. That is almost a tie. Now look at Sunny’s ad.',
      { fig: '<path class="k" d="M30 10 V140 H140"/><rect class="a" x="50" y="20" width="30" height="120"/><rect class="k" x="95" y="110" width="30" height="30"/>' +
          '<text class="n" x="26" y="24" text-anchor="end">52</text><text class="n" x="26" y="140" text-anchor="end">47</text>' +
          '<text class="n" x="65" y="156" text-anchor="middle">Sunny</text><text class="n" x="110" y="156" text-anchor="middle">Zest</text>' +
          '<path class="k" d="M180 10 V140 H290"/><rect class="a" x="200" y="73" width="30" height="67"/><rect class="k" x="245" y="78" width="30" height="62"/>' +
          '<text class="n" x="176" y="24" text-anchor="end">100</text><text class="n" x="176" y="140" text-anchor="end">0</text>' +
          '<text class="n" x="215" y="156" text-anchor="middle">Sunny</text><text class="n" x="260" y="156" text-anchor="middle">Zest</text>' +
          '<text class="lb" x="85" y="176" text-anchor="middle">Sunny’s ad</text><text class="lb" x="235" y="176" text-anchor="middle">a fair graph</text>',
        tall: 182, cap: 'The same votes, shown two ways.' },
      'In the ad, Sunny’s bar looks four times as tall as Zest’s. The trick is the <b>scale</b>, the numbers along the side. The ad’s scale starts at 47 instead of 0, so a small difference looks huge. In the fair graph, the scale starts at 0, and you can see the votes are nearly equal.',
      { h: 'Other tricks to watch for' },
      'Why does this work? Our eyes compare the heights of the bars, not the numbers beside them. Most people never look at the scale at all. Sunny’s ad does not lie about the votes. Every number on it is true. It simply shows the numbers in a way that makes your eyes believe something false. That is what makes a misleading graph so tricky to catch.',
      'Missing labels: if a graph has no numbers on the side, you cannot tell how big the differences really are.',
      'Picture graphs: if one bottle picture is twice as tall and also twice as wide, it looks four times bigger, even though the number only doubled.',
      'Cherry-picking: a graph might show only the three best months of sales and leave out the rest of the year.',
      { box: 'Check a graph', text: 'Read the title. Read the labels. Find where the scale starts. Ask who made the graph and why.' },
      'Before you share a graph with others, ask a friend to read it. If they get the wrong idea, fix it. Graphs are powerful tools. When you make your own, start the scale at zero, label everything and show all the <b>data</b>. That way, your graph tells the truth.'
    ],
    guide: { before: 'Review bar graphs, scale and axis. Draw two bars with a scale starting at 0. Teach <b>scale</b>, <b>data</b> and <b>mislead</b>.',
      after: 'Look for a graph in a flyer or news story. Is it fair? How can you tell?' },
    words: [['scale', 'the numbers along the side of a graph'], ['data', 'facts and numbers collected to learn something']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Juice is healthy.', 'Graphs can mislead, so readers should check scales, labels and who made them.', 'Sunny is the best juice.', 'Graphs are always fair.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In Sunny’s ad, where does the scale start?',
        opts: ['47', '0', '52', '100'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How many more votes did Sunny get than Zest?',
        opts: ['4', '52', '48', '100'], a: 0 },
      { k: 'choice', code: 'A2.4', half: true, q: 'Why does Sunny’s ad start the scale at 47?',
        opts: ['to make Sunny look more popular', 'to save space', 'to be fair to Zest'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why is the advice in a box?',
        opts: ['to make the checklist easy to find and use', 'because it is a story', 'to hide it', 'because it is less important'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Name each trick.', cols: ['What the graph does', 'Trick'],
        rows: [['Shows only the best months', null], ['Has no numbers on the side', null], ['Starts the scale above zero', null]],
        a: [[null, 'cherry-picking'], [null, 'missing labels'], [null, 'changing the scale']] },
      { k: 'lines', code: 'C2.6', n: 3, q: 'A graph shows Team A with a bar twice as tall as Team B’s. What should you check before you believe it, and why?',
        a: 'I should check where the scale starts. If it does not start at zero, the difference could be much smaller than it looks.', look: 'applies the scale check with a reason' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'What did you do to understand the two graphs? How did it help?',
        a: 'I read the numbers on the side of each graph and compared them. That showed me why the bars looked so different.', look: 'names a strategy and how it helped' }
    ]
  });

  P.add({
    id: 'g5-ad-tricks', subject: 'arts', form: 'Media text',
    title: 'What the Ad Wants',
    deck: 'Ads are made to make you want things. Learn the tricks, and you get to decide',
    hero: {
      photo: 'g5-billboards.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'Signs and screens in a busy city. Each one was designed to catch your eye.'
    },
    body: [
      'You see hundreds of advertisements every week: on the bus, on cereal boxes, before videos and inside games. Every ad has one job. It wants you to do something, usually to buy something. Ads are made by skilled people who know how to grab attention. Knowing their tricks helps you think for yourself.',
      { h: 'Five common techniques' },
      { fig: [['Bandwagon', '“Everyone has one!”'], ['Famous face', 'a star uses it'], ['Big promise', '“the best ever”'], ['Hurry!', '“only today”'], ['Happy scene', 'smiles and fun']].map(function (t, i) {
          var y = 6 + i * 34; return '<rect class="k" x="10" y="' + y + '" width="110" height="26" rx="4"/><text class="lb" x="65" y="' + (y + 17) + '" text-anchor="middle">' + t[0] + '</text><text class="n" x="132" y="' + (y + 17) + '">' + t[1] + '</text>'; }).join(''),
        tall: 176, cap: 'Five common advertising techniques.' },
      'The bandwagon <b>technique</b> makes you feel left out if you do not join in. A famous face, such as an athlete or a singer, makes you think the product will make you more like them. A big promise uses words like “best” and “amazing” that cannot be proved. A hurry message tells you to buy now before it is too late. A happy scene shows people laughing and having fun, so you link the product with feeling good.',
      { h: 'Look at the details' },
      'Ad makers choose every detail with care: bright colours, upbeat music, close-up shots of food that has been styled to look perfect. Sometimes the toy in the ad looks bigger than it really is, or the batteries are sold separately. Small print at the bottom of the screen may hold important facts.',
      { box: 'Ask yourself', text: 'Who made this ad? What do they want me to do? What are they not telling me? Do I really need this?' },
      { h: 'You decide' },
      'Some ads do not even look like ads. A video star might open a new toy and seem surprised, but the company may have paid for the video. In Canada, paid posts are supposed to be labelled with words such as “ad” or “sponsored.” Look for those words, because they tell you someone is being paid to show you the product.',
      'Ads are not all bad. They can tell us about new books, events or ways to stay safe. A public service ad might remind people to wear seatbelts. The goal is not to ignore ads, but to be a <b>critical</b> viewer, someone who notices the techniques and thinks before acting. When you know how an ad works, you are the one in charge.'
    ],
    guide: { before: 'Look at a real ad together. Teach <b>technique</b>, <b>bandwagon</b> and <b>critical</b>. Explain that “media” means ways of sharing messages with many people.',
      after: 'Find an ad at home. Which technique does it use? Who is its audience?' },
    words: [['technique', 'a way of doing something'], ['critical', 'thinking carefully before believing or acting']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Ads are always lies.', 'Ads use techniques to persuade, and knowing them helps you decide for yourself.', 'Famous people are rich.', 'Toys are small.'], a: 1 },
      { k: 'table', code: 'A2.4', q: 'Name the technique each ad uses.', cols: ['Ad', 'Technique'],
        rows: [['“Sale ends tonight!”', null], ['A hockey star drinks the juice.', null], ['“All the kids in your class have one!”', null]],
        a: [[null, 'hurry'], [null, 'famous face'], [null, 'bandwagon']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might a toy in an ad look bigger than it is?',
        opts: ['The ad makers want it to seem more exciting.', 'The camera is broken.', 'Toys grow.', 'It is a mistake.'], a: 0 },
      { k: 'choice', code: 'A2.3', half: true, q: 'Who is the main audience for an ad shown during a cartoon?',
        opts: ['children', 'farmers', 'grandparents', 'doctors'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The word <b>critical</b> in this text means …',
        opts: ['thinking carefully', 'being mean', 'very sick', 'very loud'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'What does the “Ask yourself” box give the reader?',
        opts: ['questions to use on any ad', 'a story', 'prices', 'a map'], a: 0 },
      { k: 'lines', code: 'A2.5', n: 3, q: 'Plan your own short ad for a public library. Name the technique you would use and why.',
        a: 'I would use a happy scene of a family reading together, so people link the library with feeling good and calm.', look: 'chooses a technique and explains why it suits the purpose' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Ads often show only some kinds of people. Why does it matter who is shown in ads?',
        a: 'If ads only show some people, others may feel left out. Showing many kinds of people tells everyone they belong.', look: 'connects who is shown to inclusion' }
    ]
  });

  P.add({
    id: 'g5-stop-motion', subject: 'arts', form: 'How-to',
    title: 'Making Clay Come Alive',
    deck: 'Stop-motion animation turns tiny movements into a moving film. You can make one at home',
    hero: {
      photo: 'g5-stop-motion.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'An animator moves a model a tiny bit between photographs.'
    },
    body: [
      'Have you ever watched a clay character walk, blink and wave, and wondered how it was made? The answer is patience. In <b>stop-motion animation</b>, an artist takes a photo, moves the model a tiny bit, takes another photo, and repeats this hundreds of times. When the photos are played quickly, one after another, your brain sees smooth movement.',
      { h: 'A Canadian tradition' },
      'Canada has a proud history of animation. The National Film Board of Canada, or NFB, has made animated films since the 1940s. One of its artists, Norman McLaren, made a famous short film called <i>Neighbours</i> in 1952. He filmed real actors one frame at a time, so they seemed to slide and fly. It won an Academy Award. Animators across Canada still experiment with clay, paper, sand and even pinheads.',
      { fig: [0, 1, 2, 3].map(function (i) {
          var x = 8 + i * 74; return '<rect class="k" x="' + x + '" y="10" width="64" height="64" rx="4"/><circle class="a" cx="' + (x + 14 + i * 12) + '" cy="52" r="10"/>' +
            '<text class="n" x="' + (x + 32) + '" y="92" text-anchor="middle">frame ' + (i + 1) + '</text>'; }).join('') +
          '<text class="n" x="150" y="114" text-anchor="middle">The ball moves a little in each frame.</text>',
        tall: 120, cap: 'Four frames of a rolling ball.' },
      { h: 'Make your own' },
      'Before you start, think small. A professional film can take months, with a team of artists moving puppets for just a few seconds of film each day. Your first film should be only a few seconds long. You need a phone or tablet, a free stop-motion app, modelling clay and a steady surface, such as a table pushed against a wall.',
      '1. Plan a short story with a beginning, middle and end. Keep it simple: a ball rolls, bumps a block and stops.',
      '2. Fix your camera in place. If it moves, your film will jump.',
      '3. Take one photo, called a <b>frame</b>. Move the clay a few millimetres. Take another photo. Small moves make smooth motion. Big moves make fast, jerky motion.',
      '4. Keep going. Most stop-motion films show about 12 frames each second, so a 10-second film needs about 120 photos.',
      '5. Play it back. Add sound, such as a bump or a whoosh, to bring it to life.',
      { box: 'Tip', text: 'Use a small piece of tape to mark where your camera and set go. Then nothing moves by accident.' },
      'Your first film might be short and a little shaky. That is fine. Every animator started with a first frame.'
    ],
    guide: { before: 'If you can, watch a short NFB animation together (nfb.ca). Teach <b>frame</b>, <b>animation</b> and <b>animator</b>.',
      after: 'Plan a five-second film. What will move, and how many frames will you need?' },
    words: [['stop-motion animation', 'a film made from many photos of objects moved a little at a time'], ['frame', 'one picture in a film']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Clay is fun.', 'Stop-motion films are made from many photos of small moves, and you can make one yourself.', 'The NFB is in Canada.', 'Tape is useful.'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number the steps from 1 to 4.',
        items: ['Plan a short story.', 'Fix the camera in place.', 'Take a photo and move the clay.', 'Play the film back.'], show: [2, 3, 0, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why must the camera stay still?',
        opts: ['so the film does not jump', 'so the clay stays warm', 'to save battery', 'to make sound'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['a ball moving a little in each frame', 'four different balls', 'a camera', 'a clay person'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why does the author number the steps?',
        opts: ['so you can follow them in order', 'to count pages', 'to show prices', 'because they are a list of facts'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“Take another photo.” What kind of sentence is this?',
        opts: ['a command', 'a question', 'an exclamation', 'a statement of fact'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'You want a 5-second film at 12 frames a second. How many photos do you need? Show how you know.',
        a: '60 photos, because 12 × 5 = 60.', look: 'uses the 12 frames a second fact to calculate 60' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Was any part of the text hard to understand? What did you do to fix it?',
        a: 'I did not understand how photos become movement. I looked at the diagram and reread the first paragraph.', look: 'names a confusing part and a fix-up strategy' }
    ]
  });

  P.add({
    id: 'g5-jingle-dress', subject: 'arts', form: 'Report',
    title: 'The Healing Sound',
    deck: 'The jingle dress dance began with the Anishinaabe and is now danced at powwows across North America',
    hero: {
      photo: 'g5-jingle-dress.jpg', credit: 'CREDIT', focus: '50% 40%',
      tall: 230,
      cap: 'A jingle dress dancer at a powwow. The cones on her dress ring with each step.'
    },
    body: [
      'At a powwow, the drum begins and a group of dancers steps into the circle. Their dresses are covered in rows of small metal cones. With every light step, the cones touch and ring, making a sound like gentle rain. This is the <b>jingle dress</b> dance, and for many Anishinaabe people, it is a dance of healing and prayer.',
      { h: 'How it began' },
      'Anishinaabe (Ojibwe) communities in what is now northern Ontario and Minnesota share stories about how the dance began, about a hundred years ago. In one story, a young girl was very sick. Her father, or in some tellings her grandfather, had a dream. In the dream, he was shown how to make a special dress, how the dance should be done and what songs to sing. The family made the dress, the girl danced, and she became well. Different communities tell the story in their own ways, and each version is respected.',
      { fig: '<path class="k" d="M90 6 L70 26 L60 116 H120 L110 26 Z"/>' +
          [40, 60, 80, 100].map(function (y, r) { var out = ''; for (var x = 70 - r * 2; x < 112 + r * 2; x += 9) out += '<path class="a" d="M' + x + ' ' + y + ' l4 11 h-8 z"/>'; return out; }).join('') +
          D.label(150, 46, 'rows of cones', 118, 46) + D.label(150, 96, 'they ring as she steps', 124, 104),
        tall: 122, cap: 'A jingle dress has rows of metal cones sewn on.' },
      { h: 'The dress and the dance' },
      'The cones were first made by rolling up the lids of tobacco tins. Many dancers today still roll their own. A dress may have hundreds of cones, and some makers sew on 365, one for each day of the year. Making a dress takes many weeks, and families often help.',
      'The steps are light and close to the ground. Dancers never cross their feet or turn in a full circle backward. The movements stay smooth so that the cones ring together. Many dancers say that when they dance, they are praying for someone who is ill or going through a hard time.',
      { box: 'Respect at a powwow', text: 'Listen to the announcer. Ask before taking photos. Never touch a dancer’s regalia, the special clothing they wear to dance.' },
      'Jingle dress dancing is now one of the main dance styles at powwows. Dancers of all ages, from small girls to grandmothers, enter the circle together. Young dancers learn the steps, songs and teachings from older women in their families and communities.',
      'In 2020, when the world faced a pandemic, many jingle dress dancers shared their dances online to send healing to people everywhere. A <b>tradition</b> that began with one family’s hope still reaches out to others.'
    ],
    guide: { before: 'Explain that a powwow is a gathering of First Nations people with dancing, drumming and visiting, and that many are open to visitors. Teach <b>regalia</b>, <b>tradition</b> and <b>Anishinaabe</b> (ah-nish-ih-NAH-bay).',
      after: 'Why do you think stories about how the dance began are told in more than one way? Why does that matter?' },
    words: [['jingle dress', 'a dress with metal cones that ring when the dancer moves'], ['tradition', 'a belief or way of doing things passed down over time']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Powwows are loud.', 'The jingle dress dance is an Anishinaabe tradition of healing that is still danced today.', 'Cones are made of tin.', 'Dresses take weeks to make.'], a: 1 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which detail shows that the dance has a spiritual purpose?',
        opts: ['Dancers pray for people who are ill.', 'The cones are metal.', 'It happens at powwows.', 'Families help make dresses.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The cones make “a sound like gentle rain.” This is …',
        opts: ['a simile', 'a heading', 'a fact', 'a question'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do some makers sew on 365 cones?',
        opts: ['one for each day of the year', 'because cones are cheap', 'to make it heavy', 'to make it quiet'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>regalia</b> mean in the box?',
        opts: ['special clothing worn to dance', 'a kind of drum', 'a song', 'a powwow'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Question', 'Answer from the text'],
        rows: [['Who began the dance?', null], ['What were the first cones made from?', null], ['Why did dancers share dances online in 2020?', null]],
        a: [[null, 'Anishinaabe (Ojibwe) people'], [null, 'rolled-up lids of tobacco tins'], [null, 'to send healing during the pandemic']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The author says “each version is respected.” Why do you think the author included this?',
        a: 'To show that communities tell the story differently and that no one version is the only right one. It shows respect for each community.', look: 'explains the author’s respect for different community versions' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of a tradition in your family or community. How is it like or unlike the jingle dress dance?',
        a: 'My family lights candles for people we miss. Like the dance, it is a way to care for others and is passed down.', look: 'a personal connection with a clear comparison' }
    ]
  });

  P.add({
    id: 'g5-lacrosse', subject: 'history', form: 'Report',
    title: 'The Creator’s Game',
    deck: 'Long before hockey, lacrosse was played across this land. Its story begins with First Nations',
    hero: {
      photo: 'g5-lacrosse.jpg', credit: 'CREDIT', focus: '50% 45%',
      tall: 220,
      cap: 'Players race for the ball in a lacrosse game.'
    },
    body: [
      'Lacrosse is one of the oldest team sports in North America. Players use a stick with a net at one end to catch, carry and throw a small ball, trying to score in the other team’s goal. Today it is Canada’s national summer sport. But the game was played here for hundreds of years before Canada existed.',
      { fig: '<path class="k" d="M40 150 L200 30"/><path class="k" d="M200 30 Q240 0 260 30 Q270 60 230 70 L200 30"/>' +
          '<path class="t" d="M210 38 L250 30 M214 48 L256 44 M220 58 L248 58 M222 34 L232 64 M236 28 L240 66"/>' +
          D.label(150, 140, 'handle: hickory') + D.label(196, 96, 'pocket: woven hide') + D.label(112, 24, 'bent hook'),
        tall: 150, cap: 'A traditional wooden lacrosse stick.' },
      { h: 'A game with meaning' },
      'Many First Nations played versions of the game, including the Haudenosaunee, the Anishinaabe and the Wendat. The Haudenosaunee call it the Creator’s Game. For them, it was not only a sport. It was played to give thanks, to heal the sick and to settle disagreements between communities. Games could have hundreds of players and last for days, on fields that stretched for kilometres.',
      'Sticks were carved from hickory wood. The wood was steamed and bent into a hook, and the pocket was woven from strips of deer hide. A skilled stick maker was greatly respected. Some families in Haudenosaunee communities still make sticks by hand today.',
      { h: 'A new name' },
      'When French settlers saw the game in the 1600s, they named it after the curved stick, which reminded them of a bishop’s staff, called a crosse. The name stuck. In the 1800s, a Montreal dentist named William George Beers wrote rules for the game, and clubs spread across Canada. Haudenosaunee teams played and toured, and people came to watch. In 1876, a team of Kanien’kehá:ka (Mohawk) players from Kahnawà:ke sailed to Britain with a Montreal club and played in front of Queen Victoria.',
      { box: 'Canada’s two national sports', text: 'In 1994, a law named lacrosse Canada’s national summer sport and hockey its national winter sport.' },
      { h: 'Still playing' },
      'Lacrosse is played in two main ways. Field lacrosse is played outdoors on a large grass field. Box lacrosse, which was invented in Canada in the 1930s, is played inside hockey rinks in summer, when the ice is gone.',
      'Today, the Haudenosaunee Nationals compete against countries from around the world, travelling on their own <b>Haudenosaunee</b> passports. When they play, they carry on a game their <b>ancestors</b> gave to the world.'
    ],
    guide: { before: 'Find the Six Nations of the Grand River and Akwesasne on a map. Teach <b>Haudenosaunee</b> (ho-deh-no-SHOW-nee), <b>ancestors</b> and <b>national</b>.',
      after: 'Why might it matter to the Haudenosaunee to play as their own nation?' },
    words: [['Haudenosaunee', 'a confederacy of six First Nations, also called the Six Nations'], ['ancestors', 'family members who lived long ago']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Hockey is popular.', 'Lacrosse began with First Nations, had deep meaning, and is still played today.', 'Sticks are made of wood.', 'Beers was a dentist.'], a: 1 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which detail shows the game’s cultural meaning?',
        opts: ['It was played to give thanks and heal.', 'It uses a ball.', 'Clubs spread across Canada.', 'It is played in summer.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the French call the game la crosse?',
        opts: ['The stick looked like a bishop’s staff.', 'It was played in France.', 'The ball was a cross.', 'The players were cross.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the pocket made of?',
        opts: ['woven hide', 'hickory', 'metal', 'plastic'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is <i>Creator’s Game</i> written with capital letters?',
        opts: ['It is a proper name.', 'It starts a sentence.', 'It is a question.', 'It is a heading.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the game then and now.', cols: ['', 'Long ago', 'Today'],
        rows: [['Players', 'hundreds', null], ['Sticks', null, 'many made in factories, some by hand']],
        a: [[null, null, 'ten a side on the field'], [null, 'hand-carved hickory and hide', null]] },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Why do you think lacrosse became a national sport of Canada? Use details.',
        a: 'It was played here for hundreds of years by First Nations and spread across the country in the 1800s, so it is part of Canada’s history.', look: 'a conclusion supported by details about its long history' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which part of this text did you picture most clearly? What helped you picture it?',
        a: 'I pictured the game with hundreds of players across a huge field. The numbers and the word kilometres helped me imagine it.', look: 'names an image and the words that helped' }
    ]
  });

  P.add({
    id: 'g5-snowshoes', subject: 'tech', form: 'Explanation',
    title: 'Walking on Top of the Snow',
    deck: 'Snowshoes were designed by First Nations and Inuit long ago. The science behind them is all about pressure',
    hero: {
      photo: 'g5-snowshoes.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 220,
      cap: 'Traditional snowshoes with wooden frames and woven webbing.'
    },
    body: [
      'Try walking through deep, fresh snow in your boots. With every step, you sink up to your knees. You tire quickly. Now strap on a pair of snowshoes. Suddenly, you float on top of the snow. How can a wider shoe make such a difference?',
      { h: 'Spreading the force' },
      'Your body pushes down on the ground with a force called your weight. When you stand in boots, all that force presses on a small area, the bottom of your boots. The snow cannot hold it up, so you sink. A snowshoe spreads the same force over a much larger area. Each part of the snow carries less of the push. Scientists call the push on each part of an area <b>pressure</b>. Bigger area, less pressure.',
      { fig: '<path class="d" d="M10 120 H290"/><rect class="k" x="40" y="96" width="30" height="40"/><path class="a" d="M55 40 V90"/><path class="a" d="M48 80 L55 92 L62 80"/>' +
          '<ellipse class="k" cx="200" cy="114" rx="70" ry="10"/><path class="a" d="M200 40 V96"/><path class="a" d="M193 86 L200 98 L207 86"/>' +
          D.label(20, 156, 'boot: small area, sinks') + D.label(150, 156, 'snowshoe: large area, floats') + D.label(80, 30, 'same weight'),
        tall: 162, cap: 'The same weight on a small area and on a large area.' },
      { h: 'Designs for different land' },
      'Indigenous peoples across the North have made snowshoes for thousands of years, and they designed them to fit the land. In thick forest, round “bear paw” snowshoes turn easily between trees. On open land and frozen lakes, long, narrow snowshoes with a tail glide in a straight line and keep the walker on top of deep, powdery snow. The front is often turned up so it does not dig into the snow.',
      'Frames were made from ash or birch wood, steamed and bent into shape. The webbing was woven from thin strips of rawhide called babiche. The pattern of the weave let snow fall through, so it did not pile up on top.',
      { box: 'Did you know?', text: 'Snowshoes let people hunt, trap and travel all winter. Early French traders learned to make and use them from First Nations.' },
      'Modern snowshoes often use aluminum frames and plastic decks, but the idea has not changed. The same science also explains why tractors have wide tires and why a skier does not sink. Long ago, Indigenous <b>engineers</b> solved a hard problem with a simple, brilliant design.'
    ],
    guide: { before: 'Press a pencil point and then a pencil’s flat end into play dough. Which sinks more? Teach <b>force</b>, <b>area</b> and <b>pressure</b>.',
      after: 'Where else do people spread out force so they do not sink or break something?' },
    words: [['pressure', 'how much force pushes on each part of an area'], ['engineers', 'people who design ways to solve problems']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Snow is cold.', 'Snowshoes spread weight over a large area to lower pressure, a design created by Indigenous peoples.', 'Bear paws are round.', 'Tractors have wide tires.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what stays the same for the boot and the snowshoe?',
        opts: ['the weight', 'the area', 'how far they sink', 'the shape'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why would a hunter in thick forest choose bear paw snowshoes?',
        opts: ['They turn easily between trees.', 'They are longest.', 'They glide on lakes.', 'They are made of plastic.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Part', 'Traditional material'],
        rows: [['Frame', null], ['Webbing', null]], a: [[null, 'ash or birch wood'], [null, 'babiche (rawhide strips)']] },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which text feature explains why the boot sinks most clearly?',
        opts: ['the diagram', 'the title', 'the box', 'the caption of the photo'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Bigger area, less pressure.” What is missing that makes this a fragment?',
        opts: ['a verb', 'a noun', 'a comma', 'a capital'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Use the idea of pressure to explain why a knife cuts better when it is sharp.',
        a: 'A sharp edge is a very small area, so the same push makes a lot of pressure, and it cuts easily.', look: 'applies area and pressure to a new example' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The author calls Indigenous snowshoe makers “engineers.” Do you agree? Give evidence.',
        a: 'Yes. They designed different snowshoes for forest and open land and solved the problem of snow piling up with the weave.', look: 'takes a position and supports it with design details' }
    ]
  });

  P.add({
    id: 'g5-forest-fire', subject: 'geography', form: 'Report',
    title: 'Fire in the Forest',
    deck: 'Wildfires are part of the boreal forest’s life cycle, but bigger and more frequent fires bring new challenges',
    hero: {
      photo: 'g5-forest-fire.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'A wildfire burning in a Canadian forest. Smoke can travel hundreds of kilometres.'
    },
    body: [
      'Canada’s <b>boreal forest</b> is a huge band of evergreen trees that stretches from Yukon to Newfoundland and Labrador. It is home to moose, caribou, lynx and billions of birds. It is also a forest that has burned and regrown for thousands of years.',
      { h: 'Fire as part of the cycle' },
      'Some fire is natural and even helpful. Jack pine trees have cones sealed shut with a sticky resin. Only the heat of a fire melts the resin and lets the seeds fall out. After a fire, sunlight reaches the ground, ashes add nutrients to the soil, and new plants spring up. Within a few years, fireweed covers the burned land in pink flowers, and young trees begin to grow.',
      { fig: '<circle class="t" cx="150" cy="90" r="62"/>' + D.arrow(206, 64, 206, 70, 'a') + D.arrow(94, 116, 94, 110, 'a') +
          [[150, 20, 'old forest'], [244, 94, 'fire'], [150, 172, 'seeds and fireweed'], [56, 94, 'young trees']].map(function (t) { return '<text class="lb" x="' + t[0] + '" y="' + t[1] + '" text-anchor="middle">' + t[2] + '</text>'; }).join(''),
        tall: 180, cap: 'A natural fire cycle in the boreal forest.' },
      { h: 'A changing pattern' },
      'Lightning starts about half of Canada’s wildfires. People start the rest, often by accident, with campfires, cigarettes or sparks from machines. In recent years, hotter summers and longer dry spells have made fires larger and more frequent. In 2023, Canada had its worst fire season on record. More than 15 million hectares burned, and smoke drifted as far as Europe.',
      'Fires now threaten towns as well as trees. In 2016, a fire forced about 88 000 people to leave Fort McMurray, Alberta. In 2023, the entire city of Yellowknife was <b>evacuated</b>. Many First Nations communities have had to leave their homes again and again.',
      { box: 'Firesmart at the cottage', text: 'Keep campfires small and drown them with water. Clear dry leaves away from buildings. Check for fire bans before you light any fire.' },
      { h: 'Working together' },
      'Firefighters from across Canada and other countries fight large fires from the ground and the air. Some First Nations are bringing back cultural burning: setting small, careful fires in cool seasons to clear dry brush, a practice their ancestors used for generations. Combined with science, this knowledge can help the forest stay healthy and keep communities safer. Fire will always be part of the boreal forest. The goal is not to stop every fire, but to live with fire wisely.'
    ],
    guide: { before: 'Find the boreal forest, Fort McMurray and Yellowknife on a map. Teach <b>boreal</b>, <b>evacuate</b> and <b>resin</b>.',
      after: 'How can a fire be both helpful and harmful? What could your family do to be firesmart?' },
    words: [['boreal forest', 'the large northern forest of evergreen trees'], ['evacuated', 'moved people away from danger']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Moose live in forests.', 'Fire is a natural part of the boreal forest, but bigger fires now bring new dangers.', 'Fireweed is pink.', 'Lightning is bright.'], a: 1 },
      { k: 'order', code: 'C1.4', q: 'Number the stages of the fire cycle in the diagram, starting with old forest.',
        items: ['old forest', 'fire', 'seeds and fireweed', 'young trees'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'How does fire help jack pines?',
        opts: ['It melts resin so seeds fall out.', 'It kills insects.', 'It makes the trees taller.', 'It waters the soil.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>firefighter</b>, what does the suffix <b>-er</b> mean?',
        opts: ['a person who', 'more', 'not', 'again'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the causes and effects.', cols: ['Cause', 'Effect'],
        rows: [['hotter summers and dry spells', null], [null, 'Yellowknife was evacuated.']],
        a: [[null, 'larger and more frequent fires'], ['a wildfire came close to the city', null]] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How does the author show that Indigenous knowledge can help? Give evidence.',
        a: 'The author explains cultural burning, small careful fires their ancestors used, and says that with science it can keep forests healthy.', look: 'names cultural burning and the author’s point about it' },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Write one way you or your family could prevent a forest fire. Why does it work?',
        a: 'Drown our campfire with water before we leave, so no hot coals can start a fire later.', look: 'a realistic prevention step with a reason' }
    ]
  });

  P.add({
    id: 'g5-blood', subject: 'health', form: 'Explanation',
    title: 'A Gift That Flows',
    deck: 'What your blood does every second, and how donated blood saves lives',
    hero: {
      photo: 'g5-blood-bags.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'Bags of donated blood, labelled and ready for hospitals.'
    },
    body: [
      'Right now, about three litres of blood are racing through your body. An adult has about five litres. The heart pumps blood through tubes called blood vessels. If you laid all of an adult’s blood vessels end to end, they would stretch about 100 000 kilometres. That is more than twice around the Earth.',
      { h: 'What is in blood?' },
      'Blood looks like a simple red liquid, but it is made of several parts, each with its own job.',
      { fig: [['red blood cells', 'carry oxygen'], ['white blood cells', 'fight germs'], ['platelets', 'stop bleeding'], ['plasma', 'carries it all']].map(function (p, i) {
          var y = 8 + i * 34; return '<circle class="' + (i === 0 ? 'a' : 'k') + '" cx="22" cy="' + (y + 12) + '" r="' + (i === 2 ? 5 : 10) + '"/><text class="lb" x="44" y="' + (y + 16) + '">' + p[0] + '</text><text class="n" x="170" y="' + (y + 16) + '">' + p[1] + '</text>'; }).join(''),
        tall: 142, cap: 'The four main parts of blood.' },
      '<b>Plasma</b> is the yellowish liquid part. It carries food, water and the blood cells. Red blood cells pick up oxygen in your lungs and drop it off everywhere else. White blood cells hunt down germs. Platelets are tiny pieces of cells that stick together to plug a cut and stop the bleeding.',
      { h: 'When the body needs help' },
      'Sometimes people lose a lot of blood in an accident or during an operation. People with some illnesses, such as certain cancers, need blood often. Blood cannot be made in a factory. The only place it comes from is other people.',
      'In Canada, healthy people aged 17 and older can <b>donate</b> blood. A donor sits in a comfortable chair while a nurse collects about half a litre from a vein in the arm. It takes about 10 minutes. The donor’s body makes new plasma within a day or two and new red blood cells within a few weeks.',
      { box: 'Did you know?', text: 'Donated blood is split into its parts. Red cells, plasma and platelets can go to different patients, so one donation can help more than one person.' },
      { h: 'Matching blood' },
      'Not all blood is the same. There are different blood types, named with letters: A, B, AB and O. A patient must receive a type that matches, or their body will attack the new blood. Type O negative can be given to almost anyone, so it is always in high demand.',
      'You are too young to donate now, but you can still help. You can encourage the adults in your life to give. You can also take care of your own blood by eating foods rich in iron, such as beans, spinach and meat, which help your body build healthy red blood cells. One hour of someone’s time could mean another family gets more time together.'
    ],
    guide: { before: 'Look at the veins on the inside of your wrist. Teach <b>plasma</b>, <b>donate</b> and <b>oxygen</b>. Remind the child that the heart and lungs work together.',
      after: 'Why is blood donation sometimes called “the gift of life”? Who do you know who could donate?' },
    words: [['plasma', 'the liquid part of blood'], ['donate', 'to give something to help others']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Blood is red.', 'Blood has parts with important jobs, and donated blood saves lives.', 'Nurses are kind.', 'The heart is a pump.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram to fill in the chart.', cols: ['Part of blood', 'Job'],
        rows: [['red blood cells', null], [null, 'fight germs'], ['platelets', null]],
        a: [[null, 'carry oxygen'], ['white blood cells', null], [null, 'stop bleeding']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is type O negative always needed?',
        opts: ['It can be given to almost anyone.', 'It is the rarest.', 'It is the reddest.', 'It lasts forever.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why must people donate blood?',
        opts: ['Blood cannot be made in a factory.', 'Hospitals sell it.', 'It is too cold.', 'It helps the donor.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is there a space in 100 000?',
        opts: ['Canadian style groups big numbers in threes.', 'It is two numbers.', 'It is a mistake.', 'It shows money.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Which comparison helps you picture the length of the blood vessels?',
        opts: ['more than twice around the Earth', 'about 10 minutes', 'half a litre', 'a comfortable chair'], a: 0 },
      { k: 'lines', code: 'A2.2', n: 3, q: 'Write a short message to an adult encouraging them to donate. Use one fact from the text.',
        a: 'Please think about donating blood. It only takes about 10 minutes, and your one donation can help more than one patient.', look: 'a persuasive message that uses an accurate fact' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'What new question do you have about blood after reading? Where could you find the answer?',
        a: 'How do they know which blood type a person has? I could ask a nurse or look on the Canadian Blood Services website.', look: 'a genuine question and a sensible source' }
    ]
  });

  P.add({
    id: 'g5-bus-route', subject: 'social', form: 'Story',
    title: 'Route 12',
    deck: 'When the city plans to cut her grandmother’s bus route, Leila learns how local government works',
    hero: {
      photo: 'g5-city-bus.jpg', credit: 'CREDIT', focus: '50% 55%',
      tall: 220,
      cap: 'A city bus at a stop. Local governments plan and pay for most public transit.'
    },
    body: [
      'Every Saturday, Leila and her grandmother, Teta, took the Route 12 bus to the market. Teta did not drive. The bus stopped right outside her apartment, and the driver always waited while she climbed the steps with her cane.',
      'One Saturday, a notice was taped to the bus shelter. <i>The city is reviewing Route 12. It may be cancelled next year because few riders use it. Share your views at City Hall on March 3.</i>',
      '“Cancelled?” Teta said quietly. “How will I get to the doctor?”',
      { h: 'Who decides?' },
      'At school, Leila asked her teacher, Mr. Okafor, who makes decisions about buses. He drew a chart on the board.',
      { fig: level(4, 284, 'Federal government', 'passports, the army, money') + level(62, 230, 'Provincial government', 'schools, hospitals, highways') + level(120, 176, 'Municipal government', 'buses, parks, garbage, libraries'),
        tall: 176, cap: 'Mr. Okafor’s chart: three levels of government.' },
      '“Buses belong to the <b>municipal</b> government, the city,” he explained. “The mayor and city councillors make those choices. Each <b>councillor</b> represents one area of the city, called a ward. Their job is to listen to the people who live there.”',
      { h: 'Getting ready' },
      'Leila got to work. She counted how many people got on at Teta’s stop each morning for a week. She talked to neighbours: a man who used a wheelchair, a teenager who rode to her job, a family without a car. She wrote down their stories. She looked up her ward councillor, Councillor Tremblay, and sent her an email.',
      'On March 3, Leila and Teta sat in the big council room. When it was her turn, Leila’s hands shook, but her voice was steady. She shared her numbers and her neighbours’ stories. “Fewer people ride Route 12,” she said, “but the people who do have no other way to get around.”',
      { h: 'The vote' },
      'Two weeks later, the council voted. Route 12 would stay, but buses would come every 40 minutes instead of every 20. It was not everything Leila wanted. But Teta squeezed her hand.',
      '“You spoke up,” Teta said. “And they listened. That is how a city should work.”'
    ],
    guide: { before: 'Explain the three levels of government with examples from your own area. Find your own city councillor online. Teach <b>municipal</b>, <b>councillor</b> and <b>ward</b>.',
      after: 'Was the council’s decision fair? What else could Leila do next?' },
    words: [['municipal', 'having to do with a city or town'], ['councillor', 'a person elected to a city or town council']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the story?',
        opts: ['Buses are slow.', 'Leila uses facts and stories to speak to her city council and helps save a bus route.', 'Teta likes the market.', 'Mr. Okafor draws charts.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Which level of government runs hospitals?',
        opts: ['provincial', 'municipal', 'federal', 'none'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the city want to cancel Route 12?',
        opts: ['Few riders used it.', 'The bus broke.', 'Teta complained.', 'It was too fast.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Leila used the word <b>councillor</b> correctly. Its root word is …',
        opts: ['council', 'counsel', 'count', 'cell'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does the author include the notice in italics?',
        opts: ['to show the exact words on the sign', 'to show Teta speaking', 'because it is a title', 'to make it funny'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in what Leila did to prepare.', cols: ['Step', 'What Leila did'],
        rows: [['1', null], ['2', null], ['3', null]],
        a: [[null, 'counted riders at Teta’s stop'], [null, 'talked to neighbours and wrote their stories'], [null, 'emailed her ward councillor']] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Leila says the riders “have no other way to get around.” Why does this matter when a city makes decisions?',
        a: 'A city should serve everyone, including people who cannot drive, like Teta and the man in a wheelchair. Cutting the route would leave them out.', look: 'connects the decision to fairness and inclusion' },
      { k: 'lines', code: 'B1.4', n: 3, q: 'Leila’s hands shook, but her voice was steady. What advice would you give someone speaking to a council?',
        a: 'Practise your speech, bring facts and stories, look at the councillors and speak slowly and clearly.', look: 'two or more realistic speaking strategies' }
    ]
  });

  P.add({
    id: 'g5-lunch-table', subject: 'story', form: 'Short story',
    title: 'The Empty Seat',
    deck: 'Ethan and Mateo have been best friends forever. Then a new kid joins the lunch table',
    hero: {
      photo: 'g5-cafeteria.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A school lunch room. Where you sit can feel like a big deal.'
    },
    body: [
      'Ethan and Mateo had sat together at lunch every day since Grade 1. Same table, same end, same two seats by the window. They traded crackers, argued about hockey and laughed so hard that once milk came out of Mateo’s nose.',
      'Then Priya arrived in October. She had moved from Brampton and knew no one. On her third day, Mateo waved her over to their table.',
      '“She likes hockey too,” Mateo told Ethan. “She plays goalie.”',
      'Ethan said nothing. He watched Priya sit in the seat by the window, his seat, and felt something hot and tight in his chest.',
      { h: 'The silent week' },
      'For a week, Ethan sat at the far end of the table and ate in silence. Mateo and Priya talked about saves and slapshots. When Mateo asked if Ethan was okay, Ethan shrugged. “Fine,” he said, though he was not.',
      { fig: '<path class="k" d="M20 110 Q80 110 110 70 Q130 30 150 22 Q170 30 190 70 Q220 110 280 110"/>' +
          [[30, 110, 'new kid', 'middle', 0, 18], [104, 80, 'silence', 'end', -10, 4], [150, 22, 'argument', 'middle', 0, -8], [196, 80, 'apology', 'start', 10, 4], [270, 110, 'three friends', 'middle', 0, 18]].map(function (t) { return '<circle class="a" cx="' + t[0] + '" cy="' + t[1] + '" r="4"/><text class="n" x="' + (t[0] + t[4]) + '" y="' + (t[1] + t[5]) + '" text-anchor="' + t[3] + '">' + t[2] + '</text>'; }).join(''),
        tall: 134, cap: 'The plot of the story rises to a turning point.' },
      'On Friday, Mateo found him by the bike racks. “What is going on with you?”',
      '“You <b>replaced</b> me,” Ethan said. The words came out louder than he meant.',
      'Mateo stared. “Replaced you? I wanted you to like her too. She was alone. Remember how you felt at hockey camp, when you didn’t know anyone?”',
      'Ethan did remember. He remembered eating alone on the first day, until a boy with a gap in his teeth sat down beside him. That boy had been Mateo.',
      { h: 'Making room' },
      'On Monday, Ethan walked into the lunch room and sat across from Priya. He took a deep breath. “Sorry I’ve been weird,” he said. “I guess I was <b>jealous</b>.”',
      'Priya shrugged and smiled. “I get it. I miss my old friends too.” She slid a cracker across the table. “Want one?”',
      'At practice that week, Priya showed Ethan how a goalie watches the shooter’s eyes, not the stick. Ethan showed her the trick shot he and Mateo had invented in Grade 3. Mateo just grinned and said, “See? I told you.”',
      'After that, they took turns sitting by the window. A friendship, Ethan decided, was not like a seat. There was always room for one more.'
    ],
    guide: { before: 'Talk about a time someone felt left out. Teach <b>jealous</b>, <b>turning point</b> and <b>apology</b>.',
      after: 'What could Ethan have done differently in the first week? What makes an apology a good one?' },
    words: [['jealous', 'upset because you fear losing someone or something to another person'], ['replaced', 'put someone or something in the place of another']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the story?',
        opts: ['Hockey is fun.', 'Ethan learns that a friendship can make room for a new friend.', 'Priya plays goalie.', 'Lunch is noisy.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the plot line, which event is the turning point?',
        opts: ['the argument', 'the new kid', 'the silence', 'three friends'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Something hot and tight in his chest” shows that Ethan feels …',
        opts: ['jealous and upset', 'hungry', 'sick with a cold', 'excited'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Mateo invite Priya to sit with them?',
        opts: ['She was alone.', 'Ethan asked him to.', 'She had crackers.', 'The teacher told him.'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'The story is told by a narrator outside the story who knows Ethan’s feelings. This is …',
        opts: ['third person', 'first person', 'a letter', 'a diary'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'What is the theme or lesson of the story? Use the last line as evidence.',
        a: 'Friendship can grow to include new people. The last line says “there was always room for one more.”', look: 'states a theme and uses the last line' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Have you ever felt like Ethan, or like Priya? How does your experience help you understand the story?',
        a: 'I was the new kid once and felt alone like Priya. It helped me see why Mateo invited her.', look: 'a personal connection that deepens understanding of a character' },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What could you do at your school to help a new student feel included?',
        a: 'Invite them to sit with my group and show them around the school.', look: 'a kind, realistic action' }
    ]
  });

  P.add({
    id: 'g5-wheelchair-race', subject: 'story', form: 'Short story',
    title: 'Faster Than Yesterday',
    deck: 'Amira trains all spring for her first wheelchair race. Winning is not her only goal',
    hero: {
      photo: 'g5-wheelchair-racer.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'A racing wheelchair has three wheels and is built for speed.'
    },
    body: [
      'The racing chair was not like Amira’s everyday wheelchair. It was long and low, with two big back wheels tilted inward and a small wheel out front. When she first sat in it, crouched forward with her knees tucked under her, it felt like sitting in a rocket.',
      '“Push on the rims like you’re punching,” said Coach Julien. “Short and sharp. Then let your hands swing back.”',
      'Her first try, she wobbled and nearly tipped into the grass. Her second try, she bumped the curb. On her third try, she flew down the track so fast that the wind made her eyes water. She laughed out loud.',
      { h: 'Training' },
      'All spring, Amira trained three times a week. Her arms ached. Her hands <b>blistered</b>, so she learned to wear padded gloves. She kept a notebook of her times for 400 metres, one lap of the track.',
      { fig: '<path class="k" d="M30 10 V130 H290"/>' + [[1, 150], [2, 141], [3, 143], [4, 132], [5, 126], [6, 119]].map(function (p, i) {
          var x = 30 + p[0] * 40, y = 130 - (160 - p[1]) * 3; return '<rect class="' + (i === 5 ? 'a' : 'k') + '" x="' + (x - 12) + '" y="' + y + '" width="24" height="' + (130 - y) + '"/><text class="n" x="' + x + '" y="' + (y - 4) + '" text-anchor="middle">' + p[1] + '</text><text class="n" x="' + x + '" y="146" text-anchor="middle">wk ' + p[0] + '</text>'; }).join('') +
          '<text class="n" x="26" y="20" text-anchor="end">sec</text>',
        tall: 152, cap: 'Amira’s 400 m times, in seconds, over six weeks.' },
      'Some weeks her time got worse. Week 3 was slower than week 2, and she nearly quit. But Coach Julien pointed at her notebook. “Look at the whole page, not one line,” he said. “You are getting faster.”',
      { h: 'Race day' },
      'The provincial meet was in June. Amira lined up beside five other racers. One of them, a girl named Jo, had won last year. Amira’s heart thumped.',
      'The starter fired. Amira pushed hard and short, hard and short. Jo pulled ahead at the curve. Amira dug in on the straightaway, arms burning, and crossed the line in second place.',
      'She checked the board. 1:56. One hundred sixteen seconds, three faster than her best.',
      'Jo rolled over and held out a fist. “Nice finish,” she said. “Next year, you’ll catch me.”',
      'Her mother ran down from the stands, waving the notebook over her head. Coach Julien was right behind her. “Week one, 150 seconds,” he said. “Today, 116. Do you know how far you have come?”',
      'Amira bumped her fist. She was not disappointed. She had not come to beat Jo. She had come to beat the girl in her notebook, and she had. She was <b>determined</b> to keep going.'
    ],
    guide: { before: 'Explain that wheelchair racing is a Paralympic sport. Teach <b>determined</b>, <b>rim</b> and <b>provincial</b>.',
      after: 'Why was Amira not disappointed with second place? What goal could you track over time?' },
    words: [['blistered', 'got sore bubbles of skin from rubbing'], ['determined', 'having made a firm decision to keep trying']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the story?',
        opts: ['Racing chairs have three wheels.', 'Amira trains hard and races to beat her own best time.', 'Jo always wins.', 'Gloves prevent blisters.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. In which week was Amira slower than the week before?',
        opts: ['week 3', 'week 2', 'week 5', 'week 6'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: '“It felt like sitting in a rocket.” This simile shows the chair is …',
        opts: ['fast and exciting', 'heavy', 'old', 'broken'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'What did the coach mean by “Look at the whole page, not one line”?',
        opts: ['Look at the overall trend.', 'Read more books.', 'Write neater.', 'Turn the page.'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“Short and sharp.” Why is this a sentence fragment?',
        opts: ['It has no subject or verb.', 'It is too long.', 'It has no capital.', 'It is a question.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'How much faster was Amira on race day than in week 1? Show your thinking.',
        a: 'In week 1 she took 150 seconds. On race day she took 116 seconds. 150 − 116 = 34 seconds faster.', look: 'uses the graph and the race time to subtract correctly' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Jo says, “Next year, you’ll catch me.” What does this show about Jo’s character?',
        a: 'Jo is a good sport. She is kind and respects Amira as a racer.', look: 'names a trait and links it to Jo’s words' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Before the race, did you predict Amira would win? What clue made you think so?',
        a: 'I predicted she would come second because Jo had won last year and seemed strong.', look: 'a prediction with a clue from the story' }
    ]
  });

  P.add({
    id: 'g5-heron-fable', subject: 'story', form: 'Fable',
    title: 'The Heron and the Muskrat',
    deck: 'A proud heron and a patient muskrat learn who is really wise in this original fable',
    hero: {
      photo: 'g5-heron.jpg', credit: 'CREDIT', focus: '50% 40%',
      tall: 220,
      cap: 'A great blue heron stands still in a marsh, waiting for a fish.'
    },
    body: [
      'At the edge of a wide marsh lived a great blue heron who believed he was the wisest creature in the world. He stood on one leg for hours, perfectly still, and the other animals assumed he was thinking deep thoughts. The heron did nothing to correct them.',
      'In the same marsh lived a muskrat, small and brown and always busy. All summer, she gathered reeds and cattails and mud. Bit by bit, she built a round <b>lodge</b> in the shallow water.',
      '“Why do you work so hard?” the heron asked one day, looking down his long beak. “Look at me. I stand still, and food comes to me. That is wisdom.”',
      '“Winter is coming,” said the muskrat, and kept working.',
      { fig: '<path class="d" d="M10 120 H290"/>' + D.ripple(14, 286, 128, 't') +
          '<path class="k" d="M160 120 Q200 50 240 120"/><path class="t" d="M170 110 L230 110 M176 96 L224 96 M186 82 L214 82"/>' +
          '<path class="k" d="M60 120 V70 M60 70 L70 40 M70 40 Q78 30 92 36"/>' +
          D.label(20, 30, 'heron') + D.label(150, 30, 'muskrat lodge: reeds and mud'),
        tall: 140, cap: 'A muskrat lodge rises above the water of the marsh.' },
      { h: 'The first frost' },
      'The heron laughed. “Winter is a long way off. Besides, I am too clever to be caught by the cold.”',
      'Autumn came. The leaves turned red and gold and fell into the water. The other herons flew south, calling to him to join them. But the heron was enjoying the quiet. “I will leave when I decide,” he said.',
      'One morning, he woke to find the marsh edged with ice. The fish had gone deep. His feet were stiff and cold. Snow began to fall, thick and fast, and the wind swept across the frozen reeds.',
      'From inside her warm lodge, the muskrat heard him shivering. She poked her head out of the snow. “There is room for you to rest out of the wind tonight,” she said. “Tomorrow, fly south while you still can.”',
      { h: 'The lesson' },
      'All night the wind howled, and the snow piled higher. The heron listened to it from the shelter of the lodge, feeling small for the first time in his life. He thought about all the hours he had spent standing still, admiring himself, while the muskrat worked.',
      'The heron, <b>humbled</b>, crouched in the shelter of the lodge. In the morning, he spread his great wings and flew south. He never again mistook standing still for being wise.',
      { box: 'Moral', text: 'Looking wise is not the same as being wise. Prepare today for tomorrow.' }
    ],
    guide: { before: 'Explain that a fable is a short story, usually with animals, that teaches a lesson called a moral. Teach <b>humbled</b>, <b>lodge</b> and <b>moral</b>.',
      after: 'Which other stories you know have a similar lesson? How is this fable like or unlike them?' },
    words: [['lodge', 'a muskrat’s or beaver’s home of sticks, reeds and mud'], ['humbled', 'made to feel less proud']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the moral of the fable?',
        opts: ['Herons are tall.', 'Looking wise is not the same as being wise; prepare for the future.', 'Muskrats like mud.', 'Winter is cold.'], a: 1 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which features show this text is a fable?',
        opts: ['animal characters and a moral', 'headings and a chart', 'a date and a greeting', 'rhyme and rhythm'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the other animals think the heron was wise?',
        opts: ['He stood still for hours.', 'He read books.', 'He built a lodge.', 'He gave advice.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the two characters.', cols: ['', 'Heron', 'Muskrat'],
        rows: [['What they did all summer', null, null], ['One word to describe them', null, null]],
        a: [[null, 'stood still and boasted', 'built a lodge'], [null, 'proud', 'hard-working (or kind)']] },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>humbled</b>, what does the ending <b>-ed</b> tell you?',
        opts: ['It already happened.', 'It will happen.', 'It means more than one.', 'It means not.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: '“Looking down his long beak” suggests the heron feels …',
        opts: ['better than the muskrat', 'scared', 'sleepy', 'lost'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Was the muskrat kind to help the heron after he laughed at her? Explain.',
        a: 'Yes. She could have ignored him, but she gave him shelter and good advice, which shows kindness and forgiveness.', look: 'a judgment supported by the muskrat’s actions' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Why do you think people have told fables for thousands of years?',
        a: 'Fables teach lessons in a short, memorable way, so people of all ages can remember and share them.', look: 'a thoughtful purpose for fables' }
    ]
  });

  P.add({
    id: 'g5-library-letter', subject: 'social', form: 'Letter to the editor',
    title: 'Keep Our Library Open',
    deck: 'A Grade 5 student writes to the local newspaper about a plan to cut library hours',
    plain: true,
    hero: {
      photo: 'g5-library.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A public library reading room. Libraries are run by local governments.'
    },
    body: [
      'To the <b>Editor</b>,',
      'My name is Kiran Dhillon, and I am in Grade 5 at Maple Ridge Public School. Last week, I read in your newspaper that the town council wants to close the Elm Street library branch on Saturdays and Sundays to save money. I am writing to ask the council to change its mind.',
      'First, weekends are the only time many families can visit. My parents both work during the week. On Saturdays, we walk to the library together. My little brother goes to story time, my mother uses the computers to look for a better job, and I borrow a stack of books. If the library closes on weekends, all of that stops.',
      { fig: '<path class="k" d="M30 10 V130 H290"/>' + [['Mon', 40], ['Tue', 46], ['Wed', 52], ['Thu', 48], ['Fri', 60], ['Sat', 120], ['Sun', 96]].map(function (d, i) {
          var x = 50 + i * 36, h = d[1] * 0.9; return '<rect class="' + (i > 4 ? 'a' : 'k') + '" x="' + (x - 11) + '" y="' + (130 - h) + '" width="22" height="' + h + '"/><text class="n" x="' + x + '" y="' + (126 - h) + '" text-anchor="middle">' + d[1] + '</text><text class="n" x="' + x + '" y="146" text-anchor="middle">' + d[0] + '</text>'; }).join(''),
        tall: 152, cap: 'Average visitors each hour at the Elm Street branch (town report).' },
      'Second, the town’s own report shows that weekends are the busiest days. The graph above shows that more than twice as many people visit each hour on Saturday as on Monday. Closing on the busiest days does not make sense.',
      'Third, the library is more than books. It is a warm, safe place where anyone can go for free. Seniors read the newspaper there. Teenagers do homework. Newcomers to Canada practise English in conversation groups. Not everyone has a computer or internet at home, but everyone can use the library.',
      'Some people say the town must save money, and I understand that. But there are other ways. The library could close earlier on Mondays, when it is quietest. Volunteers could help with some jobs. Families could also hold a fundraiser.',
      'I asked the librarian, Ms. Ferreira, what she thinks. She told me that on Saturday mornings there is often a line at the door before the library even opens. She said people come for books, but they also come to see each other. For some seniors who live alone, it is the only place they visit all week.',
      'A library is one of the few places that is open to everyone, rich or poor, young or old. Please keep the Elm Street branch open on weekends. I hope the council will listen to the people it <b>represents</b>.',
      'Sincerely,<br>Kiran Dhillon, age 10'
    ],
    guide: { before: 'Explain that a letter to the editor is an opinion sent to a newspaper for others to read. Teach <b>editor</b>, <b>represents</b> and <b>opinion</b>.',
      after: 'Which of Kiran’s reasons is strongest? What would you write about in a letter to the editor?' },
    words: [['editor', 'the person in charge of what goes into a newspaper'], ['represents', 'speaks or acts for other people']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is Kiran’s main opinion?',
        opts: ['Libraries are old.', 'The Elm Street library should stay open on weekends.', 'The council should save money.', 'Kiran likes story time.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'List Kiran’s three reasons.', cols: ['Reason', 'In your own words'],
        rows: [['First', null], ['Second', null], ['Third', null]],
        a: [[null, 'Weekends are the only time many families can go.'], [null, 'Weekends are the busiest days.'], [null, 'The library is a free, safe place for everyone.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. Which day is the quietest?',
        opts: ['Monday', 'Saturday', 'Friday', 'Sunday'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why does Kiran use the words First, Second and Third?',
        opts: ['to make the reasons easy to follow', 'to count books', 'to show the days', 'to end the letter'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does Kiran mention the people who say the town must save money?',
        opts: ['to answer the other side fairly', 'to agree with the council', 'to change the topic', 'to make a joke'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'In a letter, which part comes right before the writer’s name?',
        opts: ['the closing, Sincerely', 'the greeting', 'the date', 'the first reason'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Kiran says the library is “open to everyone.” Which groups of people does Kiran name? Why does this matter?',
        a: 'Seniors, teenagers, newcomers and people without computers. It shows the library helps people who might be left out otherwise.', look: 'names groups and links them to fairness or inclusion' },
      { k: 'lines', code: 'A2.6', n: 3, q: 'Is Kiran’s letter convincing? Explain what makes it strong or weak.',
        a: 'Yes. Kiran uses a personal story, numbers from the town’s report and offers other ways to save money.', look: 'evaluates the letter with specific features' }
    ]
  });

  P.add({
    id: 'g5-sugar-bush', subject: 'science', form: 'Interview',
    title: 'Sweet Science in the Sugar Bush',
    deck: 'A maple syrup maker explains how sap becomes syrup, and why spring weather matters',
    hero: {
      photo: 'g5-maple-taps.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'Sap drips from a tap into a bucket on a maple tree in early spring.'
    },
    body: [
      'Every March, Rose Peltier taps 600 maple trees on her family’s land near Wiikwemkoong on Manitoulin Island. We talked with her in her sugar shack, where steam rose from a long metal pan.',
      { h: 'When does sap start to run?' },
      '“It all depends on the weather. You need nights below freezing and days above freezing. When it warms up in the day, pressure builds inside the tree and pushes the <b>sap</b> out through the tap. At night, the tree pulls water up from the roots. That freeze and thaw is what makes it run. The season only lasts four to six weeks.”',
      { h: 'What does sap taste like?' },
      '“Like water with a hint of sugar. It is about 98% water. That’s why it takes about 40 litres of sap to make just one litre of syrup.”',
      { fig: '<rect class="k" x="20" y="20" width="110" height="110" rx="4"/>' + [0, 1, 2, 3].map(function (r) { var o = ''; for (var c = 0; c < 10; c++) o += '<circle class="t" cx="' + (31 + c * 10) + '" cy="' + (36 + r * 26) + '" r="4"/>'; return o; }).join('') +
          D.arrow(144, 75, 196, 75, 'a') + '<rect class="a" x="210" y="62" width="26" height="26" rx="3"/>' +
          D.label(20, 150, '40 L of sap') + D.label(200, 110, '1 L of syrup') + D.label(150, 64, 'boil'),
        tall: 156, cap: 'Most of the sap boils away as steam.' },
      { h: 'How do you turn it into syrup?' },
      '“We boil it. As the sap boils, the water <b>evaporates</b> and turns into steam, and the sugar stays behind. The sap gets thicker and darker and sweeter. When it reaches 104 °C, about 4 degrees above boiling water, it’s syrup. If you keep boiling, you can make maple taffy or sugar.”',
      { h: 'Who first made maple syrup?' },
      '“Our people did. The Anishinaabe and other First Nations were making maple sugar long before Europeans came. They cut the bark, caught the sap in birchbark containers and boiled it with hot stones. Maple sugar was an important food that could be stored all year. My grandmother taught me the teachings and the songs that go with the sugar bush. I teach them to my grandchildren now.”',
      { h: 'Is the season changing?' },
      '“Yes. Springs are unpredictable now. Some years the sap runs early, in February. Some years a warm spell ends the season fast. We pay close attention to the trees. They tell us when it’s time.”',
      { h: 'What do you love most about it?' },
      '“The smell of the steam, and the first taste of the year. Everyone in the family comes to help, from the little ones carrying buckets to the elders at the fire. It brings us together after a long winter.”'
    ],
    guide: { before: 'Explain that an interview is a conversation where one person asks questions and another answers. Review evaporation. Teach <b>sap</b>, <b>evaporates</b> and <b>sugar bush</b>.',
      after: 'If you could ask Rose one more question, what would it be?' },
    words: [['sap', 'the watery liquid inside a tree'], ['evaporates', 'changes from a liquid into a gas']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the interview mostly about?',
        opts: ['Manitoulin Island', 'how maple syrup is made, its history and how weather affects it', 'buckets', 'steam engines'], a: 1 },
      { k: 'choice', code: 'C1.3', half: true, q: 'In this interview, what are the headings?',
        opts: ['the interviewer’s questions', 'Rose’s answers', 'captions', 'the title'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does sap need freezing nights and warm days?',
        opts: ['The freeze and thaw make it flow.', 'Cold sap is sweeter.', 'The tree sleeps at night.', 'Warm days melt the buckets.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How much sap makes 2 L of syrup?',
        opts: ['80 L', '40 L', '20 L', '42 L'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Unpredictable</b> means not predictable. What does <b>un-</b> mean?',
        opts: ['not', 'again', 'before', 'very'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps from sap to syrup.',
        items: ['Tap the tree.', 'Collect the sap.', 'Boil the sap so water evaporates.', 'Stop at 104 °C.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How does Rose keep her family’s traditions alive? Use details.',
        a: 'She learned teachings and songs of the sugar bush from her grandmother and now teaches them to her grandchildren.', look: 'names passing down teachings and songs' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Is evaporation a physical or chemical change? Explain using the interview.',
        a: 'Physical. Water changes from a liquid to steam, and the sugar stays sugar. Nothing new is made.', look: 'identifies physical change and explains with the text' }
    ]
  });

  P.add({
    id: 'g5-water-body', subject: 'health', form: 'Explanation',
    title: 'Your Body Runs on Water',
    deck: 'Why water matters to every part of you, and how to tell when you need more',
    hero: {
      photo: 'g5-water-bottle.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'A refillable water bottle. Water is the best drink when you are thirsty.'
    },
    body: [
      'More than half of your body is water. It is in your blood, your muscles, your brain and even your bones. You could live for weeks without food, but only a few days without water. Every system in your body needs it to work.',
      { h: 'What water does' },
      'Water carries <b>nutrients</b> and oxygen in your blood to every cell. It helps your stomach and intestines digest food. It cushions your joints and protects your brain and spinal cord. It also keeps you cool. When you get hot, you sweat. As the sweat evaporates from your skin, it carries heat away.',
      { fig: '<path class="k" d="M150 10 Q120 50 120 70 A30 30 0 0 0 180 70 Q180 50 150 10 Z"/>' +
          [[20, 30, 'carries nutrients'], [20, 80, 'helps digestion'], [20, 130, 'cushions joints'], [200, 30, 'cools by sweating'], [200, 80, 'protects the brain'], [200, 130, 'removes waste']].map(function (l) { return '<text class="n" x="' + l[0] + '" y="' + l[1] + '">' + l[2] + '</text>'; }).join(''),
        tall: 140, cap: 'Six jobs water does in your body.' },
      'Water also helps remove waste. Your kidneys filter your blood and send the waste out of your body in urine.',
      { h: 'Losing water' },
      'Your body loses water all day long: when you sweat, when you go to the bathroom and even when you breathe out. You need to replace it. If you do not, you can become <b>dehydrated</b>. You may feel tired, grumpy or dizzy, or get a headache. It becomes harder to think clearly and to play sports well.',
      { box: 'Check your colour', text: 'Pale yellow urine usually means you are drinking enough. Dark yellow means your body needs more water.' },
      { h: 'How much is enough?' },
      'Children your age need about six to eight cups of fluid a day. You need more on hot days and when you are active. Some of your water comes from food. Watermelon, cucumbers, oranges and soup are full of it. Plain tap water is safe in most of Canada, costs almost nothing and makes no garbage.',
      'The best drinks are water and milk. Juice, pop and sports drinks often contain lots of sugar. Drinks with caffeine, such as energy drinks, are not recommended for children.',
      'An easy habit: carry a refillable water bottle. Drink before you feel very thirsty, because thirst is a sign that your body is already a little low. Have a drink with each meal and snack, and before, during and after exercise. Your brain and body will thank you.'
    ],
    guide: { before: 'Explain that systems in the body work together. Teach <b>dehydrated</b>, <b>nutrients</b> and <b>kidneys</b>.',
      after: 'How much water did you drink yesterday? What is one habit that would help you drink more?' },
    words: [['nutrients', 'parts of food the body needs to grow and stay healthy'], ['dehydrated', 'not having enough water in the body']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Juice is sweet.', 'Water has many jobs in the body, so we need to drink enough every day.', 'Cucumbers are green.', 'Sweat is wet.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How does sweating cool you down?',
        opts: ['Sweat evaporates and carries heat away.', 'Sweat is cold.', 'It makes you rest.', 'It opens your eyes.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Which job in the diagram is also explained in the paragraph right after it?',
        opts: ['removes waste', 'cushions joints', 'helps digestion', 'carries nutrients'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Sign', 'What it means'],
        rows: [['Dark yellow urine', null], ['Feeling dizzy and grumpy', null], ['Pale yellow urine', null]],
        a: [[null, 'need more water'], [null, 'may be dehydrated'], [null, 'drinking enough']] },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>dehydrated</b>, the prefix <b>de-</b> means …',
        opts: ['remove or take away', 'again', 'before', 'with'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'The author writes “Your brain and body will thank you.” This is …',
        opts: ['personification', 'a fact', 'a list', 'a question'], a: 0 },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Plan one change to help you drink enough water on a hockey or soccer day.',
        a: 'I will fill my bottle before I leave and drink before, during and after the game.', look: 'a specific plan linked to advice in the text' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Why do you think energy drinks are not recommended for children? Use the text and what you know.',
        a: 'They have caffeine and often sugar, which are not healthy for children, and water hydrates better.', look: 'a reasoned conclusion that combines the text and prior knowledge' }
    ]
  });

  P.add({
    id: 'g5-suspension-bridge', subject: 'tech', form: 'Explanation',
    title: 'Hanging by a Thread',
    deck: 'How a suspension bridge holds up a road with cables, towers and a balance of forces',
    hero: {
      photo: 'g5-lions-gate.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'The Lions Gate Bridge in Vancouver, opened in 1938, crosses the entrance to the harbour.'
    },
    body: [
      'How do you cross a wide, deep river where ships need to pass underneath? You cannot build pillars in the middle of the water every few metres. For long spans, engineers often choose a <b>suspension bridge</b>, a bridge whose road hangs from cables.',
      { h: 'The parts' },
      'A suspension bridge has two tall towers. Huge main cables are draped over the tops of the towers, from one shore to the other. The ends of the cables are buried deep in giant blocks of concrete on land, called anchorages. Thinner cables, called hangers, drop straight down from the main cables and hold up the road, which is called the deck.',
      { fig: '<path class="d" d="M0 140 H300"/>' + D.ripple(70, 230, 146, 't') +
          '<path class="k" d="M80 30 V140 M220 30 V140"/><path class="a" d="M10 110 L80 30 Q150 110 220 30 L290 110"/><path class="k" d="M10 104 H290"/>' +
          [95, 115, 185, 205].map(function (x) { var y = 30 + 40 * (1 - Math.pow((x - 150) / 70, 2)); return '<path class="t" d="M' + x + ' ' + y + ' V104"/>'; }).join('') +
          '<rect class="k" x="0" y="108" width="20" height="16"/><rect class="k" x="280" y="108" width="20" height="16"/>' +
          D.label(84, 18, 'tower') + D.label(122, 50, 'main cable') + D.label(130, 98, 'deck') + D.label(0, 136, 'anchorage'),
        tall: 152, cap: 'The parts of a suspension bridge.' },
      { h: 'Pushes and pulls' },
      'Every structure must handle forces. The weight of the deck and the cars pulls down on the hangers. The hangers pull down on the main cables. This stretching force is called <b>tension</b>. Steel cables are very strong in tension, like a rope in a tug of war.',
      'The main cables press down hard on the tops of the towers. This squeezing force is called compression. The towers are built of steel or concrete, which are strong in compression. Finally, the ends of the cables pull inward on the anchorages, which are heavy enough to hold them in place.',
      { box: 'Try it', text: 'Hold a string between two chairs and hang a small bag from the middle. Feel how the string pulls on the chairs. That pull is tension.' },
      { h: 'Learning from mistakes' },
      'Engineers also have to think about wind. In 1940, a suspension bridge in the United States twisted in strong wind until it fell into the water. Since then, engineers test models in wind tunnels and design decks that let wind pass through. In Canada, bridges must also handle ice, snow and very cold temperatures, which make steel shrink. In summer, the same steel grows a little longer in the heat. Special joints in the deck, with metal teeth that fit together like fingers, let the bridge stretch and shrink safely.'
    ],
    guide: { before: 'Pull on a rope (tension) and squeeze a sponge (compression). Teach <b>suspension</b>, <b>tension</b> and <b>compression</b>.',
      after: 'Name another structure that uses tension or compression. How does it stay up?' },
    words: [['suspension bridge', 'a bridge whose road hangs from cables'], ['tension', 'a pulling or stretching force']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Vancouver has bridges.', 'A suspension bridge hangs its deck from cables and balances tension and compression.', 'Wind is strong.', 'Steel is shiny.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram and text to fill in the chart.', cols: ['Part', 'Job'],
        rows: [['tower', null], [null, 'holds up the deck'], ['anchorage', null]],
        a: [[null, 'holds up the main cables'], ['hangers', null], [null, 'holds the ends of the main cables']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Which force squeezes the towers?',
        opts: ['compression', 'tension', 'friction', 'magnetism'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why choose a suspension bridge for a wide river?',
        opts: ['It needs no pillars in the middle.', 'It is cheapest.', 'It is shortest.', 'It floats.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Cables are “like a rope in a tug of war.” What does this help you understand?',
        opts: ['tension', 'colour', 'weight', 'height'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“The ends of the cables are buried deep.” Who or what is the subject?',
        opts: ['The ends of the cables', 'buried', 'deep', 'are'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'What did engineers learn from the 1940 bridge collapse? How did it change bridges?',
        a: 'They learned wind can twist a bridge. Now they test models in wind tunnels and design decks that let wind through.', look: 'the lesson learned and the change in design' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which part of the text was hardest to picture? What helped you understand it?',
        a: 'I could not picture the anchorages. The diagram and the “Try it” box helped me see how the cables pull.', look: 'names a hard part and a helpful strategy or feature' }
    ]
  });

  P.add({
    id: 'g5-cod', subject: 'history', form: 'Report',
    title: 'The Fish That Built a Nation',
    deck: 'Cod drew Europeans across the Atlantic for 500 years, until the fish almost disappeared',
    hero: {
      photo: 'g5-cod-drying.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 200,
      cap: 'Salted cod drying on wooden racks called flakes, in Newfoundland.'
    },
    body: [
      'In 1497, an Italian sailor working for England, Giovanni Caboto, known in English as John Cabot, sailed west across the Atlantic. He landed somewhere on the coast of what is now Newfoundland or Cape Breton. When his crew returned to England, they told an amazing story. The sea was so full of fish that they could catch them by lowering baskets over the side of the ship.',
      'The fish was cod, and it would shape the history of the east coast for the next 500 years.',
      { h: 'The Grand Banks' },
      'Off the coast of Newfoundland lie the Grand Banks, a huge area where the ocean is shallow. Cold water from the Arctic meets warm water from the south, which helps tiny sea life grow. Small fish feed on it, and cod feed on the small fish. For centuries, it was one of the richest fishing grounds on Earth.',
      { fig: '<path class="k" d="M20 30 Q60 20 80 50 Q90 90 70 120 Q50 140 30 130"/>' + '<ellipse class="h" cx="190" cy="90" rx="70" ry="38"/>' +
          D.arrow(280, 20, 220, 60, 'a') + D.arrow(280, 150, 230, 116, 'a') +
          D.label(18, 152, 'Newfoundland') + D.label(150, 94, 'Grand Banks') + D.label(208, 16, 'cold current') + D.label(196, 166, 'warm current'),
        tall: 170, cap: 'Cold and warm currents meet over the shallow Grand Banks.' },
      { h: 'Salt and sun' },
      'Fishing crews from Portugal, Spain, France and England crossed the ocean each summer. Many dried their catch on shore. They split the cod, salted it and laid it on wooden racks to dry in the sun and wind. Dried salt cod lasted for months and was shipped around the world. Settlements grew up in coves along the coast where families fished, salted and dried cod. Children helped too, turning the fish on the flakes and covering them when it rained.',
      { h: 'The collapse' },
      'In the 1900s, giant factory ships with huge nets arrived. They caught more fish in an hour than an old fishing boat caught in a season. Cod were taken faster than they could reproduce. By 1992, the cod had almost vanished, and the Government of Canada closed the <b>fishery</b>. About 30 000 people lost their jobs overnight.',
      { box: 'A slow recovery', text: 'More than 30 years later, cod numbers are growing again, but slowly. Scientists still watch them closely.' },
      'The story of the cod is a warning. Even something that seems endless can run out if we take too much. Today, fisheries try to be <b>sustainable</b>, catching only as many fish as nature can replace.'
    ],
    guide: { before: 'Find Newfoundland and the Grand Banks on a map. Teach <b>fishery</b>, <b>reproduce</b> and <b>sustainable</b>.',
      after: 'What other resources could run out if people take too much? What can be done?' },
    words: [['fishery', 'a place or business where fish are caught'], ['sustainable', 'able to continue without using up a resource']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Cabot was Italian.', 'Cod shaped the east coast for centuries, until overfishing nearly wiped them out.', 'Salt is useful.', 'Ships are big.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Why are the Grand Banks good for fish?',
        opts: ['Cold and warm currents meet there.', 'They are deep.', 'They are on land.', 'There are no currents.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did fishers salt and dry the cod?',
        opts: ['so it would last for months', 'to make it taste sweet', 'to make it heavy', 'to sell it fresh'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the causes and effects.', cols: ['Cause', 'Effect'],
        rows: [['Factory ships caught huge numbers of cod.', null], ['The fishery closed in 1992.', null]],
        a: [[null, 'Cod were taken faster than they could reproduce and almost vanished.'], [null, 'About 30 000 people lost their jobs.']] },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does the author begin with the baskets story?',
        opts: ['to show how many cod there once were', 'to describe baskets', 'to talk about England', 'to explain salt'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The word <b>fishery</b> is built from …',
        opts: ['fish + -ery (a place or business)', 'fish + -er (a person)', 'fi + shery', 'fishy + ry'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'The author calls the cod story “a warning.” What is the warning?',
        a: 'Even resources that seem endless can run out if we take too much, so we must use them in a sustainable way.', look: 'states the warning in their own words' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'How did you keep track of the events over 500 years? What strategy did you use?',
        a: 'I used the headings and looked for dates like 1497 and 1992 to make a timeline in my head.', look: 'names a strategy for following time order' }
    ]
  });

  P.add({
    id: 'g5-fireworks', subject: 'science', form: 'Explanation',
    title: 'The Chemistry of Fireworks',
    deck: 'Every burst of colour in the sky is a chemical change you can see and hear',
    hero: {
      photo: 'g5-fireworks.jpg', credit: 'CREDIT', focus: '50% 45%',
      tall: 220,
      cap: 'Fireworks light up the sky on Canada Day.'
    },
    body: [
      'On Canada Day, crowds gather in the dark and wait. Then, with a whoosh and a bang, the sky bursts into gold, red, green and blue. Those beautiful patterns are science in action. Every firework is a carefully planned set of <b>chemical changes</b>.',
      { h: 'Inside a firework' },
      'A firework shell is a paper tube with three main parts. At the bottom is a lift charge of black powder. In the middle is a <b>fuse</b> that burns slowly, like a timer. At the top are small pellets called stars, which hold the chemicals that make colour.',
      { fig: '<rect class="k" x="110" y="10" width="80" height="140" rx="8"/><path class="d" d="M110 110 H190 M110 60 H190"/>' +
          [[130, 30], [150, 30], [170, 30], [140, 45], [160, 45]].map(function (p) { return '<circle class="a" cx="' + p[0] + '" cy="' + p[1] + '" r="6"/>'; }).join('') +
          '<path class="t" d="M150 62 Q140 80 150 90 Q160 100 150 108"/>' +
          D.label(200, 36, 'stars: make colour') + D.label(200, 88, 'fuse: timer') + D.label(200, 134, 'lift charge'),
        tall: 156, cap: 'Inside a firework shell.' },
      { h: 'Up, then out' },
      'When the lift charge is lit, it burns in a flash. Hot gases push the shell high into the air, the same way air pushes a cork out of a bottle. While the shell rises, the fuse burns. At the top, the fuse reaches a second charge, which bursts the shell open and lights the stars. The stars fly outward in a ball of light.',
      { h: 'Where the colour comes from' },
      'Each colour comes from a different metal in the stars. When a metal gets very hot, it gives off light of a certain colour.',
      { box: 'Colour chart', text: 'strontium: red · barium: green · copper: blue · sodium: yellow · mixed red and blue: purple' },
      'Blue is the hardest colour to make, because the copper must be hot enough to glow but not so hot that the colour disappears.',
      { h: 'A change you cannot undo' },
      'When a firework burns, new substances form: smoke, ash and gases. You cannot turn the smoke back into a firework. That is a sign of a chemical change. Other signs are light, heat, sound and a new smell. Fireworks show them all at once.',
      'Fireworks makers are part chemist and part artist. They plan each show to music, timing every burst to the second. Some shells hold stars inside stars, so one colour bursts and then changes into another.',
      'Fireworks are beautiful, but they are also dangerous. Only trained adults should light them, and everyone else should watch from a safe distance.'
    ],
    guide: { before: 'Review the signs of a chemical change (new colour, gas, heat, light, smell). Teach <b>chemical change</b>, <b>fuse</b> and <b>shell</b>.',
      after: 'What other chemical changes have you seen? Can any of them be undone?' },
    words: [['chemical changes', 'changes that make new substances and cannot easily be undone'], ['fuse', 'a cord that burns slowly to set off a charge']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Canada Day is fun.', 'Fireworks use chemical changes and metals to make light, colour and sound.', 'Copper is blue.', 'Fireworks are paper.'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number the events from 1 to 4.',
        items: ['The lift charge burns.', 'The shell rises as the fuse burns.', 'The burst charge opens the shell.', 'The stars fly out in colour.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which part works like a timer?',
        opts: ['the fuse', 'the stars', 'the lift charge', 'the paper'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Use the colour chart. Which metal makes green?',
        opts: ['barium', 'copper', 'sodium', 'strontium'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author compare the lift charge to a cork in a bottle?',
        opts: ['to help you picture gas pushing something up', 'to talk about drinks', 'to make a joke', 'to describe colour'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'In the colour chart, what do the colons ( : ) do?',
        opts: ['link each metal to its colour', 'end sentences', 'show a question', 'join two names'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'How do you know a firework burning is a chemical change? Give two signs.',
        a: 'New substances such as smoke and ash form and cannot be turned back. It also gives off light, heat and sound.', look: 'two signs of chemical change from the text' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about fireworks? How did it help you understand the text?',
        a: 'I knew fireworks are loud and colourful. That helped me connect the bang and light to signs of a chemical change.', look: 'names prior knowledge and how it helped' }
    ]
  });

  P.add({
    id: 'g5-phantom-power', subject: 'science', form: 'Report',
    title: 'The Energy Vampires',
    deck: 'Your home may be using electricity even when everything is turned off',
    hero: {
      photo: 'g5-power-bar.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A power bar with many plugs. Some devices draw power even when they are off.'
    },
    body: [
      'It is late at night. Everyone is asleep, and the lights are off. But look around: a tiny red light glows on the TV, a clock shines on the microwave, and a phone charger is warm in the wall. Your home is still using <b>electricity</b>. Some people call these devices energy vampires, because they quietly drain power while no one is looking.',
      { h: 'Standby power' },
      'Many devices never turn all the way off. They stay in standby mode, ready to wake up the moment you press a button on the remote. Game consoles, cable boxes, computers, printers and chargers left in the wall all use small amounts of power around the clock.',
      { fig: '<path class="k" d="M40 10 V130 H290"/>' + [['TV box', 70], ['console', 50], ['computer', 40], ['microwave', 18], ['charger', 6]].map(function (d, i) {
          var x = 66 + i * 50, h = d[1] * 1.4; return '<rect class="' + (i === 0 ? 'a' : 'k') + '" x="' + (x - 14) + '" y="' + (130 - h) + '" width="28" height="' + h + '"/><text class="n" x="' + x + '" y="' + (124 - h) + '" text-anchor="middle">' + d[1] + '</text><text class="n" x="' + x + '" y="146" text-anchor="middle">' + d[0] + '</text>'; }).join('') +
          '<text class="n" x="36" y="20" text-anchor="end">kWh</text>',
        tall: 152, cap: 'Electricity used in a year on standby by some devices in one home (example values, in kilowatt-hours).' },
      'One device does not use much. But a typical Canadian home has dozens of them. Added together, standby power can be about 5 to 10% of a family’s electricity use.',
      { h: 'Why it matters' },
      'Electricity has to be made somewhere. In Ontario, much of it comes from nuclear power plants and dams on rivers. In some places, it comes from burning natural gas or coal, which adds pollution to the air. Wasting electricity means more of it must be made, and it costs families money.',
      { h: 'Stop the vampires' },
      'Unplug chargers when you are not using them. Plug several devices into one power bar, then switch the bar off at night. Turn off game consoles completely instead of leaving them in rest mode. When buying new devices, look for the ENERGY STAR symbol, which means the device uses less energy.',
      { box: 'Be an energy detective', text: 'Walk through your home at night. Count the glowing lights and clocks. Each one is using power.' },
      'Small actions add up. If every home in Canada cut its standby power, it would save enough electricity to power a whole city. <b>Conserving</b> energy starts with a flick of a switch. Ask your family to make it a habit, and check the electricity bill each month to see whether it makes a difference.'
    ],
    guide: { before: 'Explain that a kilowatt-hour (kWh) measures how much electricity is used. Look at your family’s electricity bill if you can. Teach <b>standby</b>, <b>conserve</b> and <b>electricity</b>.',
      after: 'How many energy vampires can you find at home? Which could you unplug?' },
    words: [['electricity', 'a form of energy that powers lights and machines'], ['conserving', 'saving something by using less of it']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['TVs have red lights.', 'Devices use power on standby, and simple actions can save energy and money.', 'Ontario has dams.', 'Vampires are scary.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. Which device uses the most standby power?',
        opts: ['TV box', 'console', 'microwave', 'charger'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'About how many more kWh does the console use than the microwave?',
        opts: ['32', '18', '50', '68'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author call the devices “energy vampires”?',
        opts: ['They quietly drain power.', 'They come out at night only.', 'They are scary to touch.', 'They are red.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>standby</b> mean in this text?',
        opts: ['waiting, ready to turn on', 'standing up', 'broken', 'brand new'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the problem and solution.', cols: ['Problem', 'Solution'],
        rows: [['Chargers left in the wall', null], ['Many devices on standby at night', null], [null, 'Look for the ENERGY STAR symbol.']],
        a: [[null, 'Unplug them.'], [null, 'Switch off the power bar.'], ['Buying a device that wastes energy', null]] },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Plan an energy detective walk at home. What will you look for, and what will you do?',
        a: 'I will count glowing lights and clocks at night. Then I will unplug chargers and ask to use a power bar for the TV.', look: 'a realistic plan using strategies from the text' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Does the author think small actions matter? Give evidence.',
        a: 'Yes. The author says small actions add up and that cutting standby power could power a whole city.', look: 'identifies the author’s view with evidence' }
    ]
  });

  P.add({
    id: 'g5-coding', subject: 'tech', form: 'How-to',
    title: 'Talking to a Computer',
    deck: 'Computers only do exactly what you tell them. Coding is the art of telling them clearly',
    hero: {
      photo: 'g5-coding.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Students building a program with blocks of code.'
    },
    body: [
      'Imagine you ask a friend to make you a peanut-free sandwich. You say, “Put the jam on the bread.” Your friend knows what you mean. A computer would not. It might put the whole jar on top of the loaf. Computers are fast, but they only follow instructions exactly. Writing those instructions is called <b>coding</b>.',
      { h: 'Algorithms' },
      'A set of clear steps for solving a problem is called an <b>algorithm</b>. You use algorithms every day: a recipe, the steps to tie your shoes, the route you take to school. In coding, each step must be small, exact and in the right order.',
      { fig: steps(4, [['start', ''], ['move 2', 'squares'], ['turn', 'left'], ['move 1', 'square'], ['end', '']], 46) +
          '<rect class="t" x="60" y="70" width="180" height="70"/>' + [0, 1, 2, 3].map(function (i) { return '<path class="t" d="M' + (60 + i * 45) + ' 70 V140"/>'; }).join('') + '<path class="t" d="M60 105 H240"/>' +
          '<circle class="k" cx="82" cy="122" r="7"/><path class="a" d="M82 122 H172 V88"/><path class="a" d="M166 96 L172 86 L178 96"/>',
        tall: 146, cap: 'An algorithm for a robot on a grid, and the path it takes.' },
      { h: 'Loops and ifs' },
      'Coders use tools to make their instructions shorter and smarter. A loop repeats steps. Instead of writing “move” ten times, you write “repeat 10 times: move.” A conditional, or if statement, makes a choice. “If the robot touches a wall, turn left.” With loops and ifs, a program can handle many situations.',
      { h: 'Bugs' },
      'When a program does not work as planned, it has a bug. Finding and fixing bugs is called debugging. Every coder makes mistakes, even experts. Good coders test their code one step at a time, find exactly where it goes wrong, and fix it. Then they test again.',
      { box: 'Try it with a partner', text: 'Write an algorithm to walk from your desk to the door. Your partner follows it exactly, word for word. Did it work? Debug it.' },
      'Many people helped invent coding. In the 1840s, a mathematician named Ada Lovelace wrote what many call the first computer program, for a machine that was never finished. In the 1950s, Grace Hopper helped create languages that let people write code using words instead of numbers. Today, millions of people around the world write code, and many of them started as kids.',
      'Coding is used to build games, run traffic lights, fly drones and help doctors read scans. You do not need a computer to start thinking like a coder. You just need to break a problem into small, clear steps.'
    ],
    guide: { before: 'If you can, try a free block-coding site together. Teach <b>algorithm</b>, <b>loop</b>, <b>conditional</b> and <b>debug</b>.',
      after: 'Write an algorithm for brushing your teeth. Did you leave out any steps?' },
    words: [['coding', 'writing instructions for a computer'], ['algorithm', 'a set of steps for solving a problem']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Sandwiches need jam.', 'Coding means giving computers clear, exact steps, using tools like loops and ifs.', 'Robots move on grids.', 'Bugs are insects.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what does the robot do after moving 2 squares?',
        opts: ['turns left', 'stops', 'turns right', 'moves back'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why would a computer put the whole jar on the bread?',
        opts: ['It follows instructions exactly.', 'It is hungry.', 'It likes jam.', 'It is broken.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Match each coding word to its meaning.', cols: ['Word', 'Meaning'],
        rows: [['loop', null], ['conditional', null], ['debugging', null]],
        a: [[null, 'repeats steps'], [null, 'makes a choice with if'], [null, 'finding and fixing mistakes']] },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>debugging</b>, the prefix <b>de-</b> means …',
        opts: ['remove', 'add', 'again', 'before'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does the author start with the sandwich example?',
        opts: ['to show why exact steps matter', 'to give a recipe', 'to talk about lunch', 'to describe a robot'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Write a loop for a robot that must move 4 squares and then stop.',
        a: 'Repeat 4 times: move 1 square. Then stop.', look: 'uses a repeat with the right count' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'If a part of this text confused you, what did you do? If not, what would you do?',
        a: 'I did not understand conditionals, so I reread the example about the wall and thought of my own if statement.', look: 'names a fix-up strategy' }
    ]
  });

  P.add({
    id: 'g5-music-fractions', subject: 'math', form: 'Explanation',
    title: 'Fractions You Can Hear',
    deck: 'Musicians use fractions every time they read a beat. Here is how notes divide time',
    hero: {
      photo: 'g5-sheet-music.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Sheet music. Each note shows a pitch and how long to hold it.'
    },
    body: [
      'Clap a steady beat: one, two, three, four. Now clap twice as fast. You just split each beat into halves. Music is full of fractions. Every note tells a musician not only which sound to play, but how long to hold it compared with the others.',
      { h: 'Notes as fractions' },
      'In most music, a bar or measure has four beats. A whole note lasts all four beats, the whole bar. A half note lasts two beats, half the bar. A quarter note lasts one beat, a quarter of the bar. An eighth note lasts half a beat.',
      { fig: [['whole note', '1', 1], ['half notes', '1/2 + 1/2', 2], ['quarter notes', '4 × 1/4', 4], ['eighth notes', '8 × 1/8', 8]].map(function (r, i) {
          var y = 6 + i * 34, w = 200 / r[2], out = '<text class="lb" x="0" y="' + (y + 16) + '">' + r[0] + '</text>';
          for (var k = 0; k < r[2]; k++) out += '<rect class="' + (i % 2 ? 'a' : 'k') + '" x="' + (96 + k * w) + '" y="' + y + '" width="' + (w - 2) + '" height="22"/>';
          return out; }).join(''),
        tall: 146, cap: 'Each row fills one bar of four beats.' },
      'Look at the rows. Two half notes fill the same time as one whole note. Four quarter notes fill it too. So do eight eighth notes. These are <b>equivalent</b> amounts of time, just as 2/4 and 1/2 are equivalent fractions.',
      { h: 'Filling a bar' },
      'Composers build each bar like a puzzle. The notes must add up to exactly four beats. A half note, a quarter note and two eighth notes work: 2 + 1 + 1/2 + 1/2 = 4. If the notes add up to more or less, the bar is wrong, and the music will stumble.',
      { box: 'Try it', text: 'Clap a bar of two quarter notes and one half note. Say “ta, ta, ta-a.” Does it fill four beats?' },
      { h: 'Rests count too' },
      'Silence is part of music. A <b>rest</b> is a symbol that tells the musician not to play for a certain time. There are whole rests, half rests and quarter rests, and they count as fractions of the bar, just like notes.',
      'Time signatures tell musicians how to count. The two numbers at the start of a piece look like a fraction. The top number says how many beats are in each bar. A waltz, for example, has three beats in each bar: ONE, two, three, ONE, two, three. Musicians feel these patterns in their bodies, and dancers move to them.',
      'Fractions also explain speed. If a song gets twice as fast, every note lasts half as long. Drummers practise with a metronome, a tool that clicks a steady beat, so they can keep perfect time.',
      'Next time you hear a drummer or a fiddler, listen for the beat. The music you love is built on the same fractions you learn in math class.'
    ],
    guide: { before: 'Review fractions of a whole and equivalent fractions. Clap a steady beat together. Teach <b>beat</b>, <b>bar</b> and <b>equivalent</b>.',
      after: 'Make up your own bar of four beats with different notes. Clap it and check that it adds up.' },
    words: [['equivalent', 'equal in value or amount'], ['rest', 'a symbol for silence in music']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Drums are loud.', 'Music notes are fractions of a bar, and they must add up to fill it.', 'Clapping is fun.', 'Silence is boring.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how many eighth notes fill one bar?',
        opts: ['8', '4', '2', '1'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How many beats does a half note last?',
        opts: ['2', '1', '4', '1/2'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the beats.', cols: ['Note', 'Beats', 'Fraction of the bar'],
        rows: [['whole', '4', null], ['half', null, '1/2'], ['quarter', '1', null]],
        a: [[null, null, '1'], [null, '2', null], [null, null, '1/4']] },
      { k: 'choice', code: 'C1.5', half: true, q: 'The author says composers build a bar “like a puzzle.” This means …',
        opts: ['the pieces must fit exactly', 'music is a game', 'bars have pictures', 'music is hard'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Two half notes fill the same time as one whole note.” The subject is …',
        opts: ['Two half notes', 'the same time', 'one whole note', 'fill'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Does this bar fill four beats? half note + quarter note + quarter note + quarter note. Show your work.',
        a: 'No. 2 + 1 + 1 + 1 = 5 beats, which is one beat too many.', look: 'adds the beats correctly and judges the bar' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of a song you know. How could knowing about beats help you play or dance to it?',
        a: 'In my favourite song I can clap four beats in each bar, so I know when to step in my dance.', look: 'a personal connection to beats in real music' }
    ]
  });

  P.add({
    id: 'g5-quilt-patterns', subject: 'math', form: 'Explanation',
    title: 'Patterns in a Quilt',
    deck: 'Quilters slide, flip and turn shapes to make beautiful designs, using the same moves as mathematicians',
    hero: {
      photo: 'g5-quilt.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A patchwork quilt made of triangles and squares.'
    },
    body: [
      'A patchwork quilt starts as a pile of fabric scraps. A quilter cuts them into shapes such as squares and triangles, then sews them into blocks. When the blocks are joined, a pattern appears. The secret to many quilt patterns is a set of moves that mathematicians call <b>transformations</b>.',
      { h: 'Three moves' },
      'A translation slides a shape to a new place without turning or flipping it. A reflection flips a shape over a line, like a mirror image. A rotation turns a shape around a point, like the hands of a clock.',
      { fig: '<path class="k" d="M10 60 L50 20 L50 60 Z"/><path class="a" d="M60 60 L100 20 L100 60 Z"/>' + D.arrow(52, 74, 92, 74, 'a') +
          '<path class="k" d="M120 60 L160 20 L160 60 Z"/><path class="d" d="M164 10 V70"/><path class="a" d="M208 60 L168 20 L168 60 Z"/>' +
          '<path class="k" d="M236 60 L276 20 L276 60 Z"/><path class="a" d="M276 60 L236 60 L236 100 Z"/><circle class="k" cx="236" cy="60" r="3"/>' +
          D.label(30, 106, 'translation') + D.label(140, 106, 'reflection') + D.label(232, 122, 'rotation'),
        tall: 128, cap: 'A triangle slid, flipped and turned. The outlined shape is the start.' },
      'Each move keeps the shape the same size. Only its position changes. A triangle that is translated, reflected or rotated is still exactly the same triangle.',
      { h: 'Building a block' },
      'Imagine a square cut into two triangles, one dark and one light. Rotate the square a quarter turn, and the dark triangle moves to a new corner. Put four of these squares together, each turned a quarter turn more than the last, and you get a <b>pinwheel</b>. Reflect the pinwheel block, and it spins the other way.',
      { box: 'Quilts in Canadian history', text: 'Settler families and Mennonite communities in Ontario made quilts from worn clothing and flour sacks. Nothing was wasted. Many quilts were made together at gatherings called quilting bees.' },
      'Quilters often plan their designs on grid paper first. They count squares, measure and use coordinates to place each piece. Mathematicians use the same grids and the same moves to describe how shapes travel across a plane.',
      'Some quilt patterns have special names passed down through families: Log Cabin, Flying Geese, Bear’s Paw and Churn Dash. Each one uses the same few shapes, moved in different ways. Two quilters can start with the same block and make completely different quilts just by changing how they rotate and reflect it, or by choosing different colours for the light and dark pieces.',
      'Look at floor tiles, wallpaper, carpets or the star blankets made by many Plains First Nations. You will find slides, flips and turns everywhere. Pattern is where art and math meet.'
    ],
    guide: { before: 'Cut out a paper triangle and slide, flip and turn it on grid paper. Teach <b>translation</b>, <b>reflection</b> and <b>rotation</b>.',
      after: 'Design your own quilt block on grid paper using at least two transformations.' },
    words: [['transformations', 'moves that change where a shape is but not its size'], ['pinwheel', 'a design with parts that seem to spin around a centre']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Quilts are warm.', 'Quilters use slides, flips and turns to make patterns, the same transformations used in math.', 'Triangles have three sides.', 'Fabric is soft.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Transformation', 'What it does'],
        rows: [['translation', null], ['reflection', null], ['rotation', null]],
        a: [[null, 'slides a shape'], [null, 'flips a shape over a line'], [null, 'turns a shape around a point']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what does the dashed line show?',
        opts: ['the line of reflection', 'a slide', 'the centre of a turn', 'a fold in fabric'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'After a rotation, a shape is …',
        opts: ['the same size, in a new position', 'bigger', 'smaller', 'a new shape'], a: 0 },
      { k: 'choice', code: 'C3.4', half: true, q: 'What does the box tell you about settler and Mennonite values?',
        opts: ['They did not waste things.', 'They liked bright colours.', 'They bought new fabric.', 'They worked alone.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'What does <b>bee</b> mean in <b>quilting bee</b>?',
        opts: ['a gathering to work together', 'an insect', 'a letter', 'a sting'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'How is a pinwheel block made? Use the word rotation.',
        a: 'Four squares are placed together, each rotated a quarter turn more than the last, so the triangles spin around the centre.', look: 'explains quarter-turn rotations' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'What did you picture or do to understand the moves? Did it help?',
        a: 'I imagined turning a piece of toast on a plate for rotation. It helped me see the shape stays the same.', look: 'names a strategy and its effect' }
    ]
  });

  P.add({
    id: 'g5-breaking', subject: 'arts', form: 'Report',
    title: 'From the Street to the Olympics',
    deck: 'Breaking began at block parties in New York. In 2024, a Canadian won the first Olympic gold',
    hero: {
      photo: 'g5-breakdancer.jpg', credit: 'CREDIT', focus: '50% 45%',
      tall: 220,
      cap: 'A breaker balances on one hand in a freeze.'
    },
    body: [
      'In the 1970s, in the Bronx, a neighbourhood in New York City, young people gathered at outdoor parties called block parties. A DJ played records on two turntables. During the instrumental part of a song, called the break, the DJ played the same few seconds over and over. Dancers jumped into a circle and showed off their moves. They became known as b-boys and b-girls, and their dance became known as <b>breaking</b>.',
      { h: 'Four kinds of moves' },
      { fig: [['toprock', 'dancing on your feet'], ['footwork', 'quick steps close to the floor'], ['power moves', 'spins and flips'], ['freeze', 'a sudden, frozen pose']].map(function (m, i) {
          var x = (i % 2) * 150, y = Math.floor(i / 2) * 50; return '<rect class="k" x="' + x + '" y="' + y + '" width="140" height="42" rx="5"/><text class="lb" x="' + (x + 70) + '" y="' + (y + 18) + '" text-anchor="middle">' + m[0] + '</text><text class="n" x="' + (x + 70) + '" y="' + (y + 34) + '" text-anchor="middle">' + m[1] + '</text>'; }).join(''),
        tall: 96, cap: 'The four main kinds of breaking moves.' },
      'A breaker usually starts with toprock, dancing upright to the beat. Then they drop to the floor for footwork, moving their legs in fast circles while their hands support them. Power moves, such as windmills and head spins, take great strength. Most sets end with a freeze, holding a difficult pose perfectly still, often right on the last beat of the music.',
      { h: 'Battles' },
      'Breakers compete in battles. Two dancers or two crews take turns, each answering the other’s moves. Judges look at technique, creativity, musicality and personality. Breaking is not only about tricks. A good breaker listens to the music and tells a story with their body. Respect is important too. Dancers often shake hands or hug after a battle.',
      { h: 'An Olympic first' },
      'Breaking spread around the world, from Seoul to São Paulo to Montreal. In 2024, it appeared at the Olympic Games in Paris for the first time. Philip Kim, a breaker from Vancouver known as Phil Wizard, won the gold medal in the men’s event. He had started dancing as a teenager, practising for hours in community centres.',
      { box: 'Breaking and hip hop', text: 'Breaking is one of the four elements of hip hop culture, along with DJing, rapping (MCing) and graffiti art.' },
      'Canada has a strong breaking scene. Crews from Montreal, Toronto, Winnipeg and Vancouver travel to battles around the world, and some Indigenous breakers mix in moves and music from their own cultures, such as hoop dance and powwow drums.',
      'Today, kids learn breaking in studios, schools and parks across Canada. It needs no special equipment, just music, a smooth floor and the courage to step into the circle. As many breakers say, there are no wrong moves, only your own <b>style</b>.'
    ],
    guide: { before: 'If possible, watch a short clip of a breaking battle together. Teach <b>breaking</b>, <b>freeze</b>, <b>battle</b> and <b>crew</b>.',
      after: 'How is a breaking battle like or unlike a sports game? What does “style” mean in dance?' },
    words: [['breaking', 'a style of street dance that began in the Bronx'], ['style', 'a person’s own way of doing something']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Paris hosted the Olympics.', 'Breaking grew from New York block parties into a worldwide dance and Olympic sport.', 'DJs use turntables.', 'Freezes are hard.'], a: 1 },
      { k: 'table', code: 'C1.4', q: 'Use the diagram to match each move.', cols: ['Move', 'What it is'],
        rows: [['toprock', null], [null, 'spins and flips'], ['freeze', null]],
        a: [[null, 'dancing on your feet'], ['power moves', null], [null, 'a sudden, frozen pose']] },
      { k: 'choice', code: 'B2.2', half: true, q: 'Why is the dance called breaking?',
        opts: ['Dancers danced during the break in the music.', 'Dancers break things.', 'It breaks rules.', 'It is short.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'What do judges look for besides tricks?',
        opts: ['musicality and creativity', 'expensive clothes', 'height', 'speed only'], a: 0 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which detail shows a value in breaking culture?',
        opts: ['Dancers shake hands or hug after a battle.', 'It began in the 1970s.', 'It uses records.', 'It was in Paris.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'How is the text organized?',
        opts: ['from its beginning to today', 'as a list of rules', 'as a story with a problem', 'as a debate'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'How is breaking like an activity you enjoy? Explain.',
        a: 'Like playing piano, breaking takes practice and lets you show your own style to the music.', look: 'a clear comparison with a personal activity' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The text says breaking “needs no special equipment.” Why might that help it spread to so many people?',
        a: 'Anyone can try it, even if they cannot afford gear or lessons, so people of all backgrounds can join in.', look: 'connects low cost to access and inclusion' }
    ]
  });

  P.add({
    id: 'g5-masks', subject: 'arts', form: 'Report',
    title: 'Faces That Tell Stories',
    deck: 'Around the world, performers have used masks to become someone, or something, else',
    hero: {
      photo: 'g5-theatre-masks.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'Masks of comedy and tragedy, symbols of theatre since ancient Greece.'
    },
    body: [
      'Put on a mask, and something strange happens. People stop seeing you and start seeing the character. Your face disappears, so your body must do the talking. For thousands of years, performers have used masks to tell stories, to honour <b>ancestors</b> and to show what words cannot.',
      { h: 'Ancient Greece' },
      'About 2500 years ago, the ancient Greeks performed plays in huge outdoor theatres that held thousands of people. Actors wore masks with large, clear expressions so that even people in the back rows could tell whether a character was happy or sad. One actor could play several characters just by changing masks. Today, the smiling and frowning masks of comedy and tragedy are still symbols of theatre.',
      { fig: '<circle class="k" cx="70" cy="60" r="44"/><circle class="k" cx="54" cy="48" r="6"/><circle class="k" cx="86" cy="48" r="6"/><path class="a" d="M48 74 Q70 96 92 74"/>' +
          '<circle class="k" cx="220" cy="60" r="44"/><circle class="k" cx="204" cy="48" r="6"/><circle class="k" cx="236" cy="48" r="6"/><path class="a" d="M198 86 Q220 66 242 86"/>' +
          D.label(40, 124, 'comedy') + D.label(194, 124, 'tragedy'),
        tall: 130, cap: 'The two masks of theatre.' },
      { h: 'Masks of the Northwest Coast' },
      'On the Pacific coast of what is now British Columbia, First Nations such as the Kwakwaka’wakw carve masks from cedar for ceremonies called potlatches. Some are <b>transformation</b> masks. At a key moment in the dance, strings are pulled and the outer face of an animal, such as a raven or an eagle, opens to reveal a human face inside. The mask shows that animals and people are connected. These masks belong to families and are used with permission and great respect.',
      { h: 'Making your own' },
      'You can explore character with a simple mask made from paper or cardboard. Choose one strong feeling, such as surprise, and exaggerate it: wide eyes, raised eyebrows, open mouth. Then try moving as that character. Does a surprised character walk fast or slow? Do they jump back or lean in?',
      { box: 'Mask rule', text: 'Actors often say: when you wear a mask, face the audience. A mask seen from the side loses its expression.' },
      'Masks remind us that drama is about more than words. A tilt of the head, a slow step or a sudden freeze can say as much as a whole speech. Next time you watch a play, a dance or even a cartoon, notice how much the characters say with their bodies.'
    ],
    guide: { before: 'Explain that drama uses voice, body and expression to show a character. Teach <b>transformation</b>, <b>potlatch</b> and <b>exaggerate</b>.',
      after: 'Make a paper mask showing one strong feeling. Act out a short entrance without words.' },
    words: [['ancestors', 'family members who lived long ago'], ['transformation', 'a complete change in form']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Masks are made of paper.', 'People around the world use masks to tell stories and show characters.', 'Greek theatres were big.', 'Cedar is a tree.'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Greek masks have large expressions?',
        opts: ['so people far away could see them', 'to scare children', 'to keep actors warm', 'because they were heavy'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how can you tell which mask is tragedy?',
        opts: ['The mouth turns down.', 'It is bigger.', 'It has no eyes.', 'It is on the left.'], a: 0 },
      { k: 'choice', code: 'C3.4', half: true, q: 'What does a transformation mask show?',
        opts: ['that animals and people are connected', 'that ravens are scary', 'how to carve wood', 'a Greek play'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“Put on a mask, and something strange happens.” The first part of this sentence is a …',
        opts: ['command', 'question', 'name', 'list'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the masks.', cols: ['', 'Ancient Greece', 'Northwest Coast'],
        rows: [['Made for', 'plays in theatres', null], ['Special feature', null, 'open to show a face inside']],
        a: [[null, null, 'ceremonies such as potlatches'], [null, 'large, clear expressions', null]] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why do you think the author says these masks “are used with permission and great respect”?',
        a: 'The masks belong to families and are part of ceremonies, so the author wants readers to respect them and not copy them.', look: 'recognizes the author’s respect for cultural ownership' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Picture a surprised character. Describe how they would move. What helped you imagine it?',
        a: 'They would jump back with wide eyes and hands up. The description of exaggerating one feeling helped me picture it.', look: 'a clear image linked to the text' }
    ]
  });

  P.add({
    id: 'g5-fake-news', subject: 'tech', form: 'Explanation',
    title: 'Is It True?',
    deck: 'Not everything online is real. Four quick checks can help you spot false information',
    hero: {
      photo: 'g5-phone-news.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Many people now get news on their phones, from friends, apps and videos.'
    },
    body: [
      'After a big storm, a photo spreads online. It shows a shark swimming down a flooded highway. Thousands of people share it. It looks real. But it is not. The same fake photo has been shared after storms for years, each time with a new city’s name. Someone made it by pasting a shark into a picture of a flood.',
      'Why do fakes like this spread so easily? People share things quickly, often without reading past the headline. Apps show us more of what we click on, so a shocking post can reach millions of people in a few hours. Fixing a false story usually takes much longer than spreading it.',
      'Information that is false but presented as true is called <b>misinformation</b>. Some is spread by accident, by people who believe it. Some is made on purpose, to trick people, sell something or make them angry. Either way, it can spread faster than the truth.',
      { h: 'Four quick checks' },
      { fig: steps(4, [['Stop', 'before sharing'], ['Source', 'who made it?'], ['Search', 'other sites'], ['Look', 'for clues']], 66),
        tall: 52, cap: 'Four checks before you believe or share.' },
      'Stop. If a post makes you feel shocked, angry or excited, pause. Strong feelings are exactly what fake posts are designed to cause.',
      'Source. Who made this? Is it a real news organization, a scientist, a government website, or an account you have never heard of? Can you find out who is behind it?',
      'Search. Look for the same story on other trusted websites. If a big event really happened, many news sources will report it. If only one strange site has it, be careful.',
      'Look for clues. Check the date: is it an old story being shared again? Look closely at photos. Are there blurry edges, odd shadows or strange hands? An image search can show where a photo first appeared.',
      { box: 'Remember', text: 'Ask a trusted adult when you are not sure. It is always okay to not share.' },
      { h: 'Why it matters' },
      'False information can hurt people. It can spread unkind rumours, make people afraid for no reason, or lead them to make unsafe choices about their health. When you check before you share, you protect your friends and family. Being careful online is part of being a good digital <b>citizen</b>. And if you find out that you shared something false, the right thing to do is simple: delete it and tell the people you shared it with.'
    ],
    guide: { before: 'Look at a news website together and talk about how you know it is trustworthy. Teach <b>misinformation</b>, <b>source</b> and <b>citizen</b>.',
      after: 'Have you ever seen something online that turned out not to be true? How could the four checks have helped?' },
    words: [['misinformation', 'false information presented as true'], ['citizen', 'a member of a community']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Sharks can swim on highways.', 'Some information online is false, so check it before believing or sharing it.', 'Phones are useful.', 'Storms cause floods.'], a: 1 },
      { k: 'order', code: 'C1.4', q: 'Number the four checks in the order the diagram shows.',
        items: ['Stop', 'Source', 'Search', 'Look for clues'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'A2.6', half: true, q: 'Why are fake posts often designed to make you angry or shocked?',
        opts: ['Strong feelings make people share quickly.', 'Anger is healthy.', 'It makes them true.', 'It makes them shorter.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How did people know the shark photo was fake?',
        opts: ['The same photo appeared after many storms.', 'Sharks are small.', 'It was blurry.', 'No one shared it.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>misinformation</b>, the prefix <b>mis-</b> means …',
        opts: ['wrong or false', 'more', 'again', 'before'], a: 0 },
      { k: 'choice', code: 'A2.1', half: true, q: 'Which source is most likely to be trustworthy about health?',
        opts: ['a government health website', 'an unknown account with no name', 'a joke video', 'an ad for vitamins'], a: 0 },
      { k: 'lines', code: 'A2.6', n: 3, q: 'A friend sends you a post saying school is cancelled forever. Which checks would you use? Explain.',
        a: 'I would stop and not share it, then check the school’s website or ask my parent. If only one post says it, it is probably false.', look: 'applies at least two checks to the example' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Why do you think the author wrote this text? Who is it for?',
        a: 'To teach young people to check information online, because they use phones and might share fake posts.', look: 'names purpose and audience' }
    ]
  });

  P.add({
    id: 'g5-morrisseau', subject: 'arts', form: 'Biography',
    title: 'Copper Thunderbird',
    deck: 'Norval Morrisseau painted Anishinaabe stories in bold lines and bright colours and changed Canadian art',
    hero: {
      photo: 'g5-morrisseau.jpg', credit: 'CREDIT', focus: '50% 40%',
      tall: 220,
      cap: 'Norval Morrisseau’s paintings use thick black outlines and bright, flat colours.'
    },
    body: [
      'Norval Morrisseau was born in 1932 in northwestern Ontario and grew up near Beardmore, north of Lake Superior. He was raised mostly by his grandparents. His grandfather, a medicine man, taught him the stories, legends and teachings of the Anishinaabe. His grandmother, a Catholic, taught him about her beliefs too. Both shaped the art he would make.',
      { h: 'A new way of painting' },
      'As a young man, Morrisseau began to paint the stories his grandfather had told him: thunderbirds, bears, fish and the spirits of the land and water. At that time, many Anishinaabe teachings were shared only by speaking or in sacred birchbark scrolls. Some Elders did not approve of painting them for others to see. Morrisseau believed that sharing the stories could help keep the culture alive and proud.',
      { fig: '<path class="k" d="M40 90 Q80 40 140 60 Q200 40 250 80 Q200 110 140 100 Q80 120 40 90 Z"/><circle class="k" cx="220" cy="72" r="6"/>' +
          '<path class="a" d="M80 82 Q110 70 140 80 Q170 70 200 82"/><path class="a" d="M140 80 V100"/><circle class="a" cx="140" cy="74" r="10"/>' +
          D.label(16, 140, 'thick black outline') + D.label(150, 140, 'x-ray lines show the inside'),
        tall: 148, cap: 'Woodland style: a fish drawn with an outline and lines showing its inner life.' },
      'His style was new. He outlined his figures with thick black lines and filled them with bright, flat colours. He drew lines inside animals and people to show their organs and their spirits, as if you could see right through them. Some people call this x-ray style. It showed that every living thing has an inner life and is connected to others.',
      { h: 'Success and influence' },
      'In 1962, Morrisseau’s first exhibition in Toronto sold out on the first day. People had never seen anything like it. Other Indigenous artists, such as Daphne Odjig and Carl Ray, created their own work in related styles. Together, their art became known as the <b>Woodland</b> school. They helped open the doors of Canadian galleries to Indigenous artists.',
      { box: 'His name', text: 'Morrisseau signed his paintings with his Anishinaabe name, Copper Thunderbird, written in syllabics.' },
      'Morrisseau died in 2007. His paintings hang in the National Gallery of Canada and in galleries around the world. His life’s work showed that <b>Indigenous</b> art is not only something from the past. It is alive, powerful and always growing.'
    ],
    guide: { before: 'Look at Woodland-style art online together (search the National Gallery of Canada). Teach <b>Anishinaabe</b>, <b>Woodland</b>, <b>exhibition</b> and <b>syllabics</b>.',
      after: 'Why did Morrisseau believe sharing the stories was important? Do you agree?' },
    words: [['Woodland', 'a style of art started by Anishinaabe painters'], ['Indigenous', 'First Nations, Métis and Inuit peoples, the first peoples of a land']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Morrisseau lived in Ontario.', 'Norval Morrisseau created a new style that shared Anishinaabe stories and opened doors for Indigenous artists.', 'Fish are colourful.', 'Galleries are in Toronto.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what do the lines inside the fish show?',
        opts: ['its inner life', 'water', 'its scales', 'the sun'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did some Elders not approve of Morrisseau’s paintings?',
        opts: ['Some teachings were sacred and shared only in certain ways.', 'They did not like colour.', 'He sold too many.', 'They lived far away.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Feature of his style', 'What it shows'],
        rows: [['thick black outlines', null], ['x-ray lines', null]],
        a: [[null, 'strong, clear shapes'], [null, 'the inner life and spirit of living things']] },
      { k: 'choice', code: 'C3.4', half: true, q: 'Which detail shows how Morrisseau honoured his culture?',
        opts: ['He signed with his Anishinaabe name in syllabics.', 'He lived in Toronto.', 'He used paint.', 'He sold paintings.'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does the author start with Morrisseau’s grandparents?',
        opts: ['They shaped the stories and beliefs in his art.', 'They were painters.', 'They lived in Toronto.', 'They named the Woodland school.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'What does the author mean by “Indigenous art is not only something from the past”?',
        a: 'Indigenous artists today are still creating new, living art, like Morrisseau did. It keeps changing and growing.', look: 'explains the author’s message about living culture' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'What did you do to understand x-ray style? How did it help?',
        a: 'I looked at the fish diagram while I read the paragraph, so I could see what the lines inside meant.', look: 'names a strategy and its effect' }
    ]
  });

  P.add({
    id: 'g5-niagara', subject: 'geography', form: 'Report',
    title: 'The Falls Are Moving',
    deck: 'Niagara Falls has crept backward about 11 kilometres since the last ice age. Here is how water carves rock',
    hero: {
      photo: 'g5-horseshoe-falls.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'The Horseshoe Falls, the Canadian side of Niagara Falls.'
    },
    body: [
      'Every second, more water than an Olympic swimming pool holds pours over Niagara Falls. The roar can be heard from far away, and the mist rises higher than the falls themselves. But the falls are not standing still. Very slowly, they are moving upstream.',
      { h: 'Born from ice' },
      'About 12 000 years ago, at the end of the last ice age, huge sheets of ice melted across what is now Ontario. The meltwater filled the Great Lakes. Water from Lake Erie began to flow north toward Lake Ontario, and where it dropped over a steep cliff called the Niagara Escarpment, a waterfall was born. At that time, the falls stood near what is now Queenston, about 11 kilometres downstream from where they are today.',
      { fig: '<path class="k" d="M10 40 H200 L200 60"/><rect class="h" x="10" y="40" width="190" height="20"/><path class="k" d="M10 60 H180 L180 140 H290"/>' +
          '<path class="t" d="M180 60 Q170 90 176 140"/>' + D.arrow(150, 30, 210, 30, 'a') + '<path class="a" d="M205 46 Q220 90 230 130"/>' +
          D.label(16, 30, 'hard rock (caprock)') + D.label(30, 100, 'soft rock (shale)') + D.label(220, 150, 'plunge pool') + D.label(208, 24, 'river'),
        tall: 158, cap: 'Soft rock wears away under the hard caprock.' },
      { h: 'How a waterfall moves' },
      'The secret is in the layers of rock. The top layer is hard rock called dolostone. Underneath are layers of soft rock called shale. The falling water and the swirling spray wear away the soft shale faster than the hard rock on top. This wearing away is called <b>erosion</b>. Over time, the hard top layer is left hanging with nothing underneath. Finally, it cracks and crashes into the river below. The edge of the falls has moved back.',
      'This happened again and again for thousands of years, and the falls carved a deep, narrow valley called the Niagara Gorge. Today, the gorge is about 11 kilometres long, with walls as tall as a 20-storey building. Hikers on its trails can see the layers of rock in the cliffs, like the pages of a giant book.',
      { box: 'Slowing down', text: 'Today, much of the river’s water is sent through tunnels to power stations. With less water, the falls erode much more slowly than they once did.' },
      { h: 'The future' },
      'Scientists predict that, in thousands of years, the falls could wear back to Lake Erie. Of course, no one alive today will see that. But the story of Niagara shows that the land around us is always changing, even when it seems solid and still. Water is one of nature’s most powerful <b>sculptors</b>.'
    ],
    guide: { before: 'Find Niagara Falls, Lake Erie and Lake Ontario on a map. Teach <b>erosion</b>, <b>escarpment</b> and <b>gorge</b>.',
      after: 'Where else have you seen erosion, such as on a beach or a hill? What caused it?' },
    words: [['erosion', 'the slow wearing away of rock or soil by water, wind or ice'], ['sculptors', 'artists who carve or shape materials']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Niagara Falls is loud.', 'Erosion of soft rock under hard rock makes Niagara Falls move slowly upstream.', 'The Great Lakes are big.', 'Power stations use water.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which layer wears away faster?',
        opts: ['soft shale', 'hard caprock', 'the river', 'the plunge pool'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do the falls erode more slowly today?',
        opts: ['Water is sent to power stations.', 'The rock got harder.', 'There is less rain.', 'The falls are frozen.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps of how the falls move back.',
        items: ['Water wears away the soft shale.', 'The hard caprock is left hanging.', 'The caprock cracks and falls.', 'The edge of the falls has moved back.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.5', half: true, q: 'Water is called a “sculptor.” What does this metaphor mean?',
        opts: ['Water slowly shapes the land.', 'Water makes statues.', 'Water is an artist’s tool.', 'Water is cold.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is there a space in 12 000?',
        opts: ['Big numbers are grouped in threes.', 'It is two numbers.', 'It shows money.', 'It is a typo.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'The falls moved 11 km in about 12 000 years. About how far is that each year? Explain.',
        a: 'About 1 metre a year, because 11 000 metres ÷ 12 000 years is a little less than 1 metre.', look: 'estimates about 1 m a year with reasoning' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'What did you predict from the title “The Falls Are Moving”? Was your prediction confirmed?',
        a: 'I thought it meant the water moves. Then I learned the whole edge of the falls moves back over time.', look: 'a prediction and how the text confirmed or changed it' }
    ]
  });

  P.add({
    id: 'g5-charter', subject: 'social', form: 'Explanation',
    title: 'Rights Come With Responsibilities',
    deck: 'The Canadian Charter of Rights and Freedoms protects everyone in Canada. Here is what it says, and what it asks of us',
    hero: {
      photo: 'g5-parliament.jpg', credit: 'CREDIT', focus: '50% 45%',
      tall: 220,
      cap: 'The Parliament buildings in Ottawa, where Canada’s federal laws are made.'
    },
    body: [
      'In 1982, Canada added an important document to its constitution, the highest law of the country. It is called the Canadian <b>Charter</b> of Rights and Freedoms. It lists rights and freedoms that every government in Canada must respect, whether it is federal, provincial or municipal.',
      { h: 'What the Charter protects' },
      { fig: [['Fundamental freedoms', 'to believe, speak and gather peacefully'], ['Democratic rights', 'citizens 18 and over can vote'], ['Mobility rights', 'to live and work anywhere in Canada'], ['Legal rights', 'to a fair trial'], ['Equality rights', 'equal treatment for all'], ['Language rights', 'English and French services']].map(function (r, i) {
          var y = 4 + i * 28; return '<rect class="' + (i % 2 ? 'k' : 'a') + '" x="0" y="' + y + '" width="8" height="22"/><text class="lb" x="16" y="' + (y + 15) + '">' + r[0] + '</text><text class="n" x="150" y="' + (y + 15) + '">' + r[1] + '</text>'; }).join(''),
        tall: 172, cap: 'Six groups of rights in the Charter.' },
      'Fundamental freedoms mean you can practise any religion or none, share your opinions and meet with others peacefully. Equality rights mean that governments cannot treat people unfairly because of their race, religion, sex, age or disability. The Charter also recognizes the rights of Indigenous peoples that come from treaties and their history on this land.',
      { h: 'Limits' },
      'The Charter can be used in court. If someone believes a government law or action breaks their Charter rights, they can challenge it. Judges then decide whether the right was broken and whether the limit was fair.',
      'Rights are not unlimited. Freedom of expression does not mean you can spread hate or tell lies that hurt someone. Rights can be limited when that is reasonable and fair in a free society. One person’s rights end where they would harm the rights of others.',
      { h: 'Responsibilities' },
      'With rights come <b>responsibilities</b>. Citizens are expected to obey the law, respect the rights of others, vote in elections, help their communities and care for the environment. A right to vote means little if no one votes. Freedom of speech works best when people also listen.',
      { box: 'A class charter', text: 'Many classes make their own charter. Students agree on rights, such as “to learn without interruption,” and matching responsibilities, such as “to let others learn.”' },
      'The Charter is not just for adults or lawyers. It is a promise about the kind of country Canadians want: one where everyone is treated with fairness and dignity. Keeping that promise is up to all of us.'
    ],
    guide: { before: 'Explain that a constitution is a country’s most important set of rules. Teach <b>charter</b>, <b>right</b>, <b>freedom</b> and <b>responsibility</b>.',
      after: 'Make a short class or family charter: three rights and the responsibilities that go with them.' },
    words: [['Charter', 'an official document that lists rights'], ['responsibilities', 'things you are expected to do']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Ottawa is the capital.', 'The Charter protects rights in Canada, and those rights come with responsibilities.', 'Everyone must vote.', 'Laws are long.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Which group of rights includes voting?',
        opts: ['democratic rights', 'legal rights', 'mobility rights', 'language rights'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why can freedom of expression be limited?',
        opts: ['It cannot be used to harm others.', 'People talk too much.', 'Governments dislike it.', 'It is not in the Charter.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Match each right with a responsibility.', cols: ['Right', 'Responsibility'],
        rows: [['to vote', null], ['to speak freely', null], ['to learn without interruption', null]],
        a: [[null, 'to vote in elections'], [null, 'to listen to others and not spread hate'], [null, 'to let others learn']] },
      { k: 'choice', code: 'B3.2', half: true, q: '“A right to vote means little if no one votes.” What does <b>if</b> introduce?',
        opts: ['a condition', 'a time', 'a place', 'a list'], a: 0 },
      { k: 'choice', code: 'C3.6', half: true, q: 'Which right most directly protects people from unfair treatment?',
        opts: ['equality rights', 'mobility rights', 'language rights', 'legal rights'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Explain “one person’s rights end where they would harm the rights of others” with an example.',
        a: 'I can play music, but not so loud at night that my neighbours cannot sleep, because they have rights too.', look: 'a clear example of balancing rights' },
      { k: 'lines', code: 'B1.3', n: 3, q: 'You will explain one Charter right to a younger student. Which right, and how would you explain it?',
        a: 'Equality rights. I would say everyone must be treated fairly, no matter what they look like or what they believe.', look: 'chooses a right and adapts the explanation for a younger audience' }
    ]
  });

  P.add({
    id: 'g5-voyageurs', subject: 'history', form: 'Report',
    title: 'Paddling for Furs',
    deck: 'Coureurs des bois and voyageurs travelled thousands of kilometres by canoe, relying on Indigenous knowledge',
    hero: {
      photo: 'g5-voyageurs.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'A painting of voyageurs paddling a large canoe through a misty lake.'
    },
    body: [
      'In the 1600s, Europeans wanted beaver fur to make fashionable felt hats. The best furs came from the North, where First Nations trapped beavers and prepared the pelts. To trade for those furs, young Frenchmen began to leave the towns of New France and paddle into the interior. They were called <b>coureurs des bois</b>, runners of the woods.',
      { h: 'Learning to survive' },
      'The coureurs des bois could not have survived without First Nations partners. Wendat, Anishinaabe, Cree and other peoples taught them how to paddle and repair birchbark canoes, how to wear snowshoes, which plants were safe to eat and how to find their way along rivers. Many coureurs des bois learned Indigenous languages and lived for months in Indigenous communities. Many married Indigenous women, and their children and grandchildren became part of the Métis Nation.',
      { fig: '<path class="k" d="M10 70 Q150 110 290 70 Q150 90 10 70 Z"/>' + [50, 80, 110, 140, 170, 200, 230, 260].map(function (x) { return '<circle class="k" cx="' + x + '" cy="72" r="5"/><path class="a" d="M' + x + ' 77 L' + (x - 10) + ' 104"/>'; }).join('') +
          '<rect class="t" x="100" y="80" width="90" height="10"/>' + D.label(110, 30, 'canot du maître: about 11 m long') + D.label(10, 130, '8 to 12 paddlers') + D.label(170, 130, 'cargo up to 2 tonnes'),
        tall: 138, cap: 'A large voyageur canoe.' },
      { h: 'The voyageurs' },
      'Later, the fur trade became a big business. Companies hired paddlers called voyageurs to carry trade goods west and furs east. Their giant canoes, called canots du maître, were up to 11 metres long and could carry eight to twelve paddlers and two tonnes of cargo.',
      'A voyageur’s day began before dawn and ended after dark. Crews paddled about 50 strokes a minute for up to 14 hours, singing French songs to keep the rhythm. At waterfalls and rapids, they had to portage, carrying the canoe and cargo over land. Each man carried two packs of about 40 kilograms each, often at a trot.',
      { box: 'Did you know?', text: 'Voyageurs ate pemmican, a food made by First Nations and Métis from dried meat, fat and berries. It was light to carry and did not spoil.' },
      { h: 'A lasting mark' },
      'The fur trade routes followed rivers and lakes that Indigenous peoples had travelled for thousands of years. Many of Canada’s cities, such as Winnipeg, Thunder Bay and Edmonton, began as trading posts on those routes. The trade brought new goods and new families, but it also brought disease and conflict, and changed Indigenous ways of life forever.'
    ],
    guide: { before: 'Find the St. Lawrence River, the Great Lakes and Winnipeg on a map. Teach <b>coureurs des bois</b> (koo-RUR day BWAH), <b>voyageur</b>, <b>portage</b> and <b>pemmican</b>.',
      after: 'Why did the French depend on First Nations? How did the fur trade help some people and harm others?' },
    words: [['coureurs des bois', 'French traders who travelled into the woods to trade for furs'], ['portage', 'to carry a canoe and goods over land']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Beaver hats were popular.', 'French traders and voyageurs relied on Indigenous knowledge to travel and trade for furs.', 'Canoes are long.', 'Winnipeg is a city.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How long was a canot du maître?',
        opts: ['about 11 m', 'about 2 m', 'about 50 m', 'about 40 m'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did voyageurs sing while paddling?',
        opts: ['to keep the rhythm', 'to scare animals', 'to stay awake at night', 'to call for help'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in what First Nations taught the French.', cols: ['Skill', 'Why it mattered'],
        rows: [['paddling and repairing canoes', null], ['wearing snowshoes', null], ['which plants were safe to eat', null]],
        a: [[null, 'to travel the rivers'], [null, 'to travel in winter snow'], [null, 'to find food and not get sick']] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Voyageur</b> is related to the word <b>voyage</b>. A voyage is a …',
        opts: ['long journey', 'song', 'canoe', 'beaver'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>Their</b> giant canoes were up to 11 metres long.” <b>Their</b> refers to …',
        opts: ['the voyageurs', 'the beavers', 'the companies', 'the First Nations'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Does the author show only the good side of the fur trade? Use evidence.',
        a: 'No. The author says it brought new goods and families but also disease and conflict and changed Indigenous ways of life.', look: 'recognizes both sides with evidence' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'A voyageur carried two 40 kg packs. How much was that? Compare it to something you know.',
        a: '80 kilograms. That is more than two Grade 5 students put together.', look: 'calculates 80 kg and makes a sensible comparison' }
    ]
  });

  P.add({
    id: 'g5-epidemics', subject: 'history', form: 'Report',
    title: 'An Invisible Enemy',
    deck: 'In the 1600s, new diseases from Europe devastated First Nations communities. The Wendat were among those hit hardest',
    hero: {
      photo: 'g5-wendat-village.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 196,
      cap: 'A reconstructed longhouse village. In the 1630s, many Wendat villages were struck by disease.'
    },
    body: [
      'In the early 1600s, Wendake, the homeland of the Wendat, was a busy, well-fed land between Georgian Bay and Lake Simcoe. About 20 000 to 30 000 people lived in more than a dozen villages. They grew large fields of corn, beans and squash and were at the centre of a trade network that stretched across the Great Lakes.',
      'Then, within just a few years, more than half of the Wendat people died. They were not killed in battle. They were killed by an enemy no one could see.',
      { h: 'New diseases' },
      'Europeans brought diseases such as smallpox, measles and influenza. These diseases had spread in Europe for hundreds of years, so many Europeans had some <b>immunity</b>: their bodies had learned to fight them. The peoples of the Americas had never met these germs. Their bodies had no defence.',
      { fig: '<path class="k" d="M40 10 V130 H290"/>' + [['1630', 25], ['1640', 10]].map(function (d, i) {
          var x = 100 + i * 120, h = d[1] * 4; return '<rect class="' + (i ? 'a' : 'k') + '" x="' + (x - 30) + '" y="' + (130 - h) + '" width="60" height="' + h + '"/><text class="n" x="' + x + '" y="' + (124 - h) + '" text-anchor="middle">about ' + d[1] + ' 000</text><text class="n" x="' + x + '" y="146" text-anchor="middle">' + d[0] + '</text>'; }).join(''),
        tall: 152, cap: 'An estimate of the Wendat population before and after the epidemics. Historians’ numbers vary.' },
      'Between 1634 and 1640, wave after wave of <b>epidemics</b> swept through Wendake. Diseases travelled along the same trade routes that had made the Wendat strong. Whole families fell ill at once, so there was no one healthy to care for the sick, hunt or harvest the crops. Elders, who held the nation’s knowledge and stories, died in great numbers.',
      { h: 'Grief and change' },
      'People struggled to understand why this was happening. Some blamed the French missionaries, who lived among them and seemed not to get sick. The loss of so many people also left the Wendat weaker when conflict with other nations grew. By 1650, many survivors had left their homeland.',
      { box: 'The Wendat today', text: 'The Wendat Nation lives on. Its people live in Wendake, near Québec City, and in other communities. They continue their language, culture and government.' },
      'Historians today see the epidemics as one of the greatest tragedies in the history of the Americas. Remembering it helps us understand how much First Nations lost, and how strong they were to survive and rebuild.'
    ],
    guide: { before: 'Find Georgian Bay and Lake Simcoe on a map. Explain gently that this is a sad part of history. Teach <b>epidemic</b>, <b>immunity</b> and <b>missionary</b>.',
      after: 'Why is it important to learn about hard parts of history? How did the Wendat show strength?' },
    words: [['immunity', 'the body’s ability to fight a disease'], ['epidemics', 'outbreaks of disease that spread to many people quickly']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['The Wendat grew corn.', 'European diseases killed many Wendat in the 1630s, changing their nation, but they survived.', 'Smallpox is a germ.', 'Missionaries lived in Wendake.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. About how many fewer Wendat were there in 1640?',
        opts: ['15 000', '10 000', '25 000', '5 000'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the diseases harm First Nations more than Europeans?',
        opts: ['First Nations had no immunity to them.', 'Europeans had medicine.', 'The Wendat ate less.', 'It was colder.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the causes and effects.', cols: ['Cause', 'Effect'],
        rows: [['Diseases travelled along trade routes.', null], ['Whole families fell ill at once.', null], ['Many Elders died.', null]],
        a: [[null, 'They reached many villages quickly.'], [null, 'No one was healthy to care for the sick or harvest.'], [null, 'Knowledge and stories were lost.']] },
      { k: 'choice', code: 'C1.6', half: true, q: 'Why does the caption say “Historians’ numbers vary”?',
        opts: ['The numbers are estimates.', 'The graph is wrong.', 'No one lived there.', 'It is a story.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'In “immunity: their bodies had learned,” what does the colon do?',
        opts: ['introduces an explanation', 'ends the sentence', 'shows a question', 'lists names'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does the box tell you about the Wendat today? Why might the author include it?',
        a: 'The Wendat still live in Wendake and keep their language and culture. The author wants readers to know they survived and are not only in the past.', look: 'notes survival today and the author’s purpose' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Why was losing Elders such a great loss? Draw a conclusion.',
        a: 'Elders held the nation’s knowledge and stories, so when they died, much of that knowledge could not be passed on.', look: 'a conclusion based on the role of Elders' }
    ]
  });

  P.add({
    id: 'g5-sleep', subject: 'health', form: 'Explanation',
    title: 'What Happens While You Sleep',
    deck: 'Sleep is not wasted time. While you rest, your brain and body are hard at work',
    hero: {
      photo: 'g5-sleeping.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A dark, quiet, cool room helps the body fall asleep.'
    },
    body: [
      'You will spend about one third of your life asleep. It might seem like nothing is happening while your eyes are closed, but your body is busier than you think. Sleep is when you grow, heal and sort out everything you learned during the day.',
      { h: 'A night of cycles' },
      'Sleep is not the same all night. Your brain moves through cycles that each last about 90 minutes. In light sleep, you can wake easily. In deep sleep, your breathing slows and your body repairs muscles and releases growth hormone. Then comes dream sleep, also called REM sleep, when your eyes dart back and forth under your eyelids.',
      { fig: '<path class="k" d="M30 10 V120 H290"/><path class="a" d="M30 30 L50 60 L70 100 L90 60 L100 30 L120 60 L140 100 L160 60 L170 30 L190 60 L205 85 L220 60 L230 30 L250 60 L265 70 L280 30"/>' +
          '<text class="n" x="26" y="34" text-anchor="end">dream</text><text class="n" x="26" y="64" text-anchor="end">light</text><text class="n" x="26" y="104" text-anchor="end">deep</text>' +
          '<text class="n" x="40" y="136">bedtime</text><text class="n" x="290" y="136" text-anchor="end">morning</text>',
        tall: 142, cap: 'Sleep cycles through one night. Deep sleep comes earlier, and dream sleep grows longer toward morning.' },
      { h: 'Your brain at night' },
      'During sleep, your brain replays what you learned and files it away as <b>memories</b>. If you study spelling words or practise a piece of music, sleeping afterward helps you remember it. Sleep also clears away waste that builds up in the brain during the day.',
      { h: 'How much?' },
      'Children aged 5 to 13 need about 9 to 11 hours of sleep each night. Many get less. Without enough sleep, it is harder to pay attention, control your temper and fight off colds. You may also feel hungrier and crave sugary snacks.',
      { box: 'Better sleep habits', text: 'Go to bed at the same time each night. Turn off screens an hour before bed. Keep your room dark and cool. Read a book to wind down.' },
      'Screens make sleep harder in two ways. Games and videos keep your brain excited. And the light from screens can trick your brain into thinking it is still daytime, so it holds back <b>melatonin</b>, the chemical that makes you sleepy.',
      'Animals sleep too, in surprising ways. Dolphins rest one half of their brain at a time, so they can keep swimming and come up to breathe. Bears in Canada sleep through much of the winter in their dens. Every animal with a brain seems to need some kind of sleep.',
      'Getting enough sleep is one of the simplest things you can do for your health. Tonight, think of bedtime not as the end of the day, but as the start of tomorrow.'
    ],
    guide: { before: 'Ask what time the child usually falls asleep and wakes up, and work out the hours together. Teach <b>cycle</b>, <b>memories</b> and <b>melatonin</b>.',
      after: 'Which habit from the box would be easiest for you to try this week?' },
    words: [['memories', 'things your brain stores and remembers'], ['melatonin', 'a chemical in the body that makes you sleepy']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Dreams are strange.', 'Sleep is when the body and brain grow, heal and store learning, so children need enough of it.', 'Screens are bright.', 'Beds are soft.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the graph. When does the deepest sleep happen?',
        opts: ['earlier in the night', 'just before morning', 'only at bedtime', 'never'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How do screens make it harder to sleep?',
        opts: ['They excite the brain and hold back melatonin.', 'They are loud.', 'They make you hungry.', 'They are too cold.'], a: 0 },
      { k: 'choice', code: 'C2.6', half: true, q: 'Liam goes to bed at 9 p.m. and wakes at 7 a.m. Is he getting enough sleep?',
        opts: ['Yes, 10 hours', 'No, 7 hours', 'No, 2 hours', 'Yes, 12 hours'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Many get less.” What is understood after <b>less</b>?',
        opts: ['sleep', 'homework', 'food', 'screens'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Without enough sleep…', 'Effect'],
        rows: [['your attention', null], ['your temper', null], ['your body’s defences', null]],
        a: [[null, 'harder to focus'], [null, 'harder to control'], [null, 'weaker against colds']] },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Make a bedtime plan for a school night using at least two habits from the text.',
        a: 'At 8 p.m. I will turn off screens and read a book. At 8:45 p.m. I will be in bed with the lights off.', look: 'a realistic plan using two habits' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about sleep? What new fact surprised you?',
        a: 'I knew sleep helps you grow. I was surprised that the brain replays and stores what you learned.', look: 'names prior knowledge and a new fact' }
    ]
  });

  P.add({
    id: 'g5-allergy', subject: 'health', form: 'Personal narrative',
    title: 'My Allergy, My Plan',
    deck: 'A Grade 5 student explains life with a severe peanut allergy, and how classmates can help',
    hero: {
      photo: 'g5-auto-injector.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'An epinephrine auto-injector. It can stop a severe allergic reaction long enough to get to a hospital.'
    },
    body: [
      'My name is Sophie, and I am allergic to peanuts. Not a little allergic. Very allergic. If I eat even a crumb of peanut, my body could have a reaction called <b>anaphylaxis</b>. My throat could swell, I could have trouble breathing, and my blood pressure could drop. Without help, it could be life-threatening.',
      'I found out when I was two. I tasted a cookie at a party, and within minutes my face swelled up and I started to cough. My parents rushed me to the hospital. I do not remember it, but my mom says it was the scariest day of her life.',
      { h: 'What I carry' },
      'Everywhere I go, I carry an <b>epinephrine</b> auto-injector in a pouch on my belt. It is a pen with medicine inside. If I have a reaction, someone presses it hard against the outside of my thigh. It works quickly. Then someone calls 911, because I still need to go to the hospital.',
      { fig: steps(4, [['Notice', 'signs'], ['Inject', 'epinephrine'], ['Call', '911'], ['Stay', 'with me']], 66) +
          '<text class="n" x="150" y="78" text-anchor="middle">Signs: hives, swelling, trouble breathing, feeling faint</text>',
        tall: 88, cap: 'My emergency plan, posted in my classroom.' },
      { h: 'How my school helps' },
      'In Ontario, a law called Sabrina’s Law says every school must have a plan for students with severe allergies. It is named after Sabrina Shannon, a teenager who died after a reaction at school. At my school, every teacher knows my plan, and there is an extra auto-injector in the office.',
      'My classmates help too. We do not share food. We wash our hands after lunch. When someone brings treats for the class, they check with my teacher first.',
      { box: 'How you can help a friend', text: 'Learn the signs of a reaction. Never tease someone about an allergy. Do not share food. If something seems wrong, tell an adult right away.' },
      { h: 'Just me' },
      'Allergies are becoming more common. Doctors are not completely sure why, but they are studying it. Today, some babies are given tiny amounts of peanut early in life, with a doctor’s guidance, to help their bodies learn that peanuts are safe. Scientists are also testing treatments that could one day make allergies less dangerous. I hope that by the time I am grown up, a crumb of peanut will not be such a big deal.',
      'Some kids used to think I was being fussy. Now they understand. My allergy is something I live with, but it does not define me. I play soccer, I draw comics and I am really good at chess. With a plan and good friends, I can do almost anything.'
    ],
    guide: { before: 'Ask if anyone in the child’s class has an allergy. Teach <b>allergy</b>, <b>anaphylaxis</b> (an-uh-fuh-LAK-sis) and <b>epinephrine</b> (ep-ih-NEF-rin).',
      after: 'How can you make a friend with an allergy feel safe and included?' },
    words: [['anaphylaxis', 'a severe, sudden allergic reaction'], ['epinephrine', 'a medicine that stops a severe allergic reaction']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Peanuts are tasty.', 'Sophie lives safely with a severe allergy through a plan, school rules and caring friends.', 'Hospitals are busy.', 'Chess is fun.'], a: 1 },
      { k: 'order', code: 'C1.4', q: 'Number the steps of Sophie’s emergency plan.',
        items: ['Notice the signs.', 'Inject epinephrine.', 'Call 911.', 'Stay with Sophie.'], show: [1, 3, 0, 2] },
      { k: 'choice', code: 'C1.6', half: true, q: 'This text is written in the first person. How can you tell?',
        opts: ['Sophie uses I and my.', 'It has headings.', 'It has a box.', 'It is about health.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why must Sophie still go to hospital after the injection?',
        opts: ['She still needs medical care.', 'To get a new pen.', 'To meet the doctor.', 'To buy food.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is the law called Sabrina’s Law?',
        opts: ['It is named after a teen who died after a reaction at school.', 'Sabrina wrote it.', 'Sabrina was a doctor.', 'It is Sophie’s middle name.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“It does not <b>define</b> me.” Here, define means …',
        opts: ['decide who I am', 'explain a word', 'draw a line', 'make me sick'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Sophie says “it does not define me.” What does she want readers to understand about people with allergies?',
        a: 'People with allergies are more than their allergy. They have talents and interests and should be included, not teased.', look: 'explains the message about seeing the whole person' },
      { k: 'lines', code: 'A3.1', n: 3, q: 'Name two things you could do this week to help keep a classmate with an allergy safe.',
        a: 'I could wash my hands after lunch and not share my snacks. I could learn the signs of a reaction.', look: 'two realistic actions from the text' }
    ]
  });

  P.add({
    id: 'g5-cookie-mystery', subject: 'story', form: 'Mystery story',
    title: 'The Case of the Vanishing Cookies',
    deck: 'Someone is stealing cookies from the Lam family kitchen. Detective Vivian follows the clues',
    hero: {
      photo: 'g5-cookies.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A plate of fresh cookies: the scene of the crime.'
    },
    body: [
      'On Saturday morning, Grandpa Lam baked two dozen oatmeal cookies and set them on the counter to cool. By lunch, there were only nineteen. By dinner, there were eleven. By Sunday morning, the plate held nothing but crumbs.',
      '“This,” said Vivian, pushing her glasses up her nose, “is a case for a detective.”',
      { h: 'The suspects' },
      'Vivian took out her notebook. There were four suspects in the house: her older brother Daniel, who was always hungry; her baby sister Mei, who could now climb onto chairs; Grandpa Lam himself, who claimed he did not even like oatmeal; and Biscuit, the family’s large and very innocent-looking dog.',
      { fig: [['Daniel', 'always hungry'], ['Mei', 'climbs chairs'], ['Grandpa', 'baked them'], ['Biscuit', 'tall dog']].map(function (s, i) {
          var x = i * 76; return '<rect class="k" x="' + x + '" y="4" width="68" height="60" rx="4"/><circle class="t" cx="' + (x + 34) + '" cy="24" r="10"/><text class="lb" x="' + (x + 34) + '" y="48" text-anchor="middle">' + s[0] + '</text><text class="n" x="' + (x + 34) + '" y="80" text-anchor="middle">' + s[1] + '</text>'; }).join(''),
        tall: 88, cap: 'Vivian’s list of suspects.' },
      { h: 'The clues' },
      'First, Vivian examined the counter. She found a trail of crumbs leading toward the back door. Second, she noticed that the plate had been pushed to the very edge, where something tall could reach it. Third, she found a small, damp smudge on the cupboard door, about as high as her waist.',
      'Daniel had an <b>alibi</b>. He had been at hockey practice all Saturday afternoon. Mei was too short to reach the counter, even from a chair, because the chair was across the room. Grandpa had been napping in front of a curling game, snoring loudly.',
      'Vivian tapped her pencil against her chin. A good detective, she knew, does not guess. A good detective looks at every clue and asks what it means. The crumbs led to the back door. The cookies had been reached from the edge of the counter. And the smudge was damp, and exactly the height of a certain nose.',
      'That left one suspect.',
      { h: 'The solution' },
      'Vivian found Biscuit asleep on his bed by the back door. She knelt down and examined him closely. There, stuck in the fur of his chin, was one golden oat flake.',
      '“Biscuit,” Vivian said gravely, “the evidence is against you.”',
      'Biscuit opened one eye, thumped his tail twice and went back to sleep. He did not seem the least bit sorry.',
      'That afternoon, Grandpa baked a new batch. This time, he put them on the top of the fridge. Vivian wrote one last line in her notebook: <i>Case closed. Suspect too fluffy to punish.</i> Then she <b>deduced</b> that one cookie was hers, as payment for her excellent detective work.'
    ],
    guide: { before: 'Explain that a mystery has a problem, suspects, clues and a solution. Teach <b>suspect</b>, <b>alibi</b>, <b>evidence</b> and <b>deduce</b>.',
      after: 'Which clue was most important? Could the story have a different solution?' },
    words: [['alibi', 'proof that someone was somewhere else when something happened'], ['deduced', 'figured out by thinking about the clues']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main problem in the story?',
        opts: ['The dog is sleepy.', 'Someone is taking the cookies, and Vivian must find out who.', 'Daniel is late for hockey.', 'Grandpa cannot bake.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in why each suspect is ruled out.', cols: ['Suspect', 'Why it was not them'],
        rows: [['Daniel', null], ['Mei', null], ['Grandpa', null]],
        a: [[null, 'He was at hockey practice.'], [null, 'She was too short to reach the counter.'], [null, 'He was napping and snoring.']] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Which clue proves it was Biscuit?',
        opts: ['an oat flake in his fur', 'the crumbs on the counter', 'the snoring', 'the hockey game'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which features show this is a mystery?',
        opts: ['suspects, clues and a solution', 'headings and a graph', 'a moral', 'rhyme'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Suspect too fluffy to punish.” What makes this line funny?',
        opts: ['It sounds serious but is about a dog.', 'It is sad.', 'It has a number.', 'It is a question.'], a: 0 },
      { k: 'choice', code: 'B3.1', half: true, q: '“That left one suspect.” This short sentence is used to …',
        opts: ['build suspense', 'list clues', 'ask a question', 'describe a room'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'How many cookies disappeared between lunch and dinner? Show how you know.',
        a: '8 cookies, because there were 19 at lunch and 11 at dinner. 19 − 11 = 8.', look: 'subtracts 19 − 11 correctly using the text' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Who did you think the thief was at first? What clue changed or confirmed your thinking?',
        a: 'I first thought it was Daniel because he is always hungry. His alibi made me change my mind, and the smudge made me think of the dog.', look: 'a prediction and the clue that changed or confirmed it' }
    ]
  });

  P.add({
    id: 'g5-ice-storm', subject: 'story', form: 'Diary',
    title: 'Five Days of Ice',
    deck: 'In January 1998, an ice storm left millions of people without power. Here is one family’s week',
    hero: {
      photo: 'g5-ice-storm.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'Trees and power lines coated in thick ice after a freezing rain storm.'
    },
    body: [
      '<b>Tuesday, January 6, 1998.</b> It is raining, but the rain freezes the moment it touches anything. Every branch, car and fence is covered in a shiny glass coat. Dad says this is called <b>freezing rain</b>. It is beautiful. School is cancelled!',
      '<b>Wednesday, January 7.</b> Last night I heard cracks like gunshots. It was tree branches snapping under the weight of the ice. At 2 a.m., the power went out. Now the furnace does not work, and the house is getting colder. We are wearing hats and coats inside.',
      { fig: '<path class="k" d="M10 40 H290"/><path class="t" d="M10 26 H290"/>' + D.arrow(150, 6, 150, 22, 'a') +
          '<path class="d" d="M10 70 H290"/><text class="n" x="150" y="64" text-anchor="middle">0 °C</text>' +
          '<rect class="h" x="10" y="110" width="280" height="10"/>' + D.arrow(150, 76, 150, 104, 'a') +
          D.label(16, 20, 'snow falls from high clouds') + D.label(16, 54, 'warm layer: snow melts into rain') + D.label(16, 96, 'cold layer near the ground') + D.label(16, 138, 'rain freezes on contact'),
        tall: 144, cap: 'How freezing rain forms: snow melts in a warm layer, then the rain freezes when it lands on cold surfaces.' },
      '<b>Thursday, January 8.</b> Still no power. Mom heated soup on the camp stove in the garage. The radio says more than a million homes in Ontario and Quebec are dark. Hydro poles have fallen over like dominoes. Huge steel towers that carry power lines have crumpled. Our neighbour, Mrs. Diallo, lives alone, so we brought her over. We all sleep in the living room by the fireplace.',
      '<b>Friday, January 9.</b> The army has come to help! Soldiers are clearing trees and checking on older people. Our town opened the high school as a warming centre with cots, food and showers. Mrs. Diallo says she has not seen people help each other like this in years. Some farmers have no power to milk their cows, so neighbours with <b>generators</b> are sharing.',
      '<b>Friday night.</b> We played cards by candlelight, and Mrs. Diallo taught us a game from Senegal, where she grew up. Dad told stories about winters when he was a kid. My little brother, Noah, fell asleep on the couch under three blankets and the dog. It was the coldest night so far, but it was also one of the nicest. Without the TV or computer, we actually talked to each other all evening.',
      '<b>Saturday, January 10.</b> The rain has finally stopped. The ice is still everywhere, sparkling in the sun. Our street sounds like a chainsaw factory. Dad says some places will not have power for weeks.',
      '<b>Sunday, January 11.</b> The lights came on at 4:15 this afternoon! Everyone cheered. I never knew how much we depend on electricity. I also learned that when something goes wrong, people show their best side. I am keeping this diary so I never forget. Tomorrow, we are going to help Mrs. Diallo clear the broken branches from her yard.'
    ],
    guide: { before: 'Explain that a diary records events and feelings day by day. Find Ottawa, Montreal and Kingston on a map. Teach <b>freezing rain</b>, <b>generator</b> and <b>warming centre</b>.',
      after: 'How would your family manage without power for five days? What would you need?' },
    words: [['freezing rain', 'rain that freezes when it touches cold surfaces'], ['generator', 'a machine that makes electricity']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the diary?',
        opts: ['School was cancelled.', 'During the 1998 ice storm, a family lived without power, and people helped each other.', 'Ice is shiny.', 'Soldiers clear trees.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where does the snow melt into rain?',
        opts: ['in the warm layer', 'near the ground', 'in the high clouds', 'on the trees'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why are the dates in bold?',
        opts: ['to show each new diary entry', 'because they are important words', 'to show a title', 'to show a question'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Poles fell “like dominoes.” This simile means they …',
        opts: ['fell one after another', 'were small', 'were spotted', 'were games'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the family bring Mrs. Diallo to their house?',
        opts: ['She lived alone in the cold.', 'She had a generator.', 'She was a soldier.', 'She had soup.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the events in order.',
        items: ['Freezing rain starts.', 'The power goes out.', 'The army arrives.', 'The lights come back on.'], show: [3, 1, 0, 2] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'What did the writer learn? Use evidence from the last entry.',
        a: 'The writer learned how much people depend on electricity and that people show their best side in hard times.', look: 'two lessons supported by the last entry' },
      { k: 'lines', code: 'B1.4', n: 3, q: 'You will read one diary entry aloud to the class. How would you use your voice to show the writer’s feelings?',
        a: 'For Sunday, I would read faster and louder at “Everyone cheered” to show excitement, then slow down at the end.', look: 'specific voice choices linked to feelings in the text' }
    ]
  });

  P.add({
    id: 'g5-printed-hand', subject: 'tech', form: 'Report',
    title: 'A Hand From a Printer',
    deck: 'Volunteers with 3D printers make helper hands for children, using strings that work like tendons',
    hero: {
      photo: 'g5-3d-hand.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'A 3D-printed hand. Its fingers close when the wearer bends their wrist.'
    },
    body: [
      'Some children are born without fingers on one hand, or lose them in an accident. A <b>prosthetic</b> hand can help them hold a ball, ride a bike or carry a lunch tray. But many prosthetic hands cost thousands of dollars, and children outgrow them quickly. A group of inventors found a creative solution: print the hands.',
      { h: 'How 3D printing works' },
      'A 3D printer builds an object one thin layer at a time. It melts a plastic thread and squeezes it through a tiny nozzle, like icing on a cake. The nozzle moves back and forth, drawing one layer, then rises a little and draws the next. Layer by layer, a solid object grows. A hand can be printed in about a day.',
      { fig: '<path class="k" d="M40 120 L60 60 L110 50 L120 120 Z"/>' + [64, 80, 96, 110].map(function (x, i) { return '<rect class="k" x="' + (x - 6) + '" y="' + (14 + i * 4) + '" width="12" height="' + (40 - i * 4) + '" rx="5"/><path class="a" d="M' + x + ' ' + (20 + i * 4) + ' V112"/>'; }).join('') +
          '<path class="k" d="M120 100 L170 90 L170 130 L120 125"/>' +
          D.label(190, 36, 'strings act like tendons') + D.label(190, 90, 'wrist hinge') + D.label(190, 130, 'bend wrist: fingers close'),
        tall: 140, cap: 'Inside a printed hand. Bending the wrist pulls the strings tight.' },
      { h: 'Strings for tendons' },
      'In your own hand, muscles in your arm pull on cords called <b>tendons</b>, which bend your fingers. A printed hand copies this idea. Strings run from each finger to the wrist. When the child bends their wrist down, the strings tighten and the fingers curl closed. When they straighten their wrist, elastic bands pull the fingers open again. There are no batteries and no motors.',
      { h: 'A world of volunteers' },
      'The designs are shared online for free. Volunteers around the world, including students, teachers and engineers, print hands and give them away. Families send measurements and photos, and a volunteer prints a hand in the right size. Many children pick their own colours. Some choose superhero designs.',
      { box: 'Design thinking', text: 'Inventors test, ask users what works, improve the design and test again. Children who wear the hands help make them better.' },
      'One boy in Ontario used his new hand to hold a hockey stick for the first time. Another girl learned to ride a bike with both hands on the handlebars. Because the hands are cheap to print, a child who grows can simply get a bigger one next year, instead of waiting and saving for months.',
      'A printed hand cannot do everything a real hand can. But it gives children a new tool and lets them take part in more activities. It also shows how technology and kindness together can solve real problems.'
    ],
    guide: { before: 'Wiggle your fingers and feel the tendons move on the back of your hand. Teach <b>prosthetic</b>, <b>tendon</b> and <b>3D printer</b>.',
      after: 'What other problem could volunteers with 3D printers help solve?' },
    words: [['prosthetic', 'an artificial body part'], ['tendons', 'strong cords that connect muscles to bones']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Printers are slow.', 'Volunteers 3D-print low-cost hands for children that use strings like tendons.', 'Plastic melts.', 'Superheroes have gloves.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what makes the fingers close?',
        opts: ['bending the wrist', 'a battery', 'a motor', 'pressing a button'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why are printed hands useful for children?',
        opts: ['They are cheaper, and kids outgrow hands quickly.', 'They are heavy.', 'They need batteries.', 'They are made of metal.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The printer squeezes plastic “like icing on a cake.” This helps you picture …',
        opts: ['how the plastic comes out', 'what it tastes like', 'a birthday', 'colour'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“There are no batteries and no motors.” What does <b>and</b> join?',
        opts: ['two things that are missing', 'two actions', 'two times', 'two places'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare a real hand and a printed hand.', cols: ['', 'Real hand', 'Printed hand'],
        rows: [['What bends the fingers', 'tendons pulled by muscles', null], ['What opens the fingers', null, 'elastic bands']],
        a: [[null, null, 'strings pulled by bending the wrist'], [null, 'muscles and tendons', null]] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does a printed hand help a child take part in more activities? Why does that matter?',
        a: 'It helps them hold things like a ball or tray, so they can join games and daily life with others.', look: 'links the tool to participation and inclusion' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Who might want to read this text, and why?',
        a: 'A student interested in robots or inventing, or a family looking for a helper hand for their child.', look: 'names a reader and a reason' }
    ]
  });

  P.add({
    id: 'g5-wetlands', subject: 'science', form: 'Report',
    title: 'Nature’s Sponges',
    deck: 'Marshes, swamps and bogs soak up floods, clean water and shelter wildlife. Why are they disappearing?',
    hero: {
      photo: 'g5-marsh.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 220,
      cap: 'A marsh in Ontario, with cattails and open water.'
    },
    body: [
      'Squish. If you have ever walked through a soggy marsh, you know how wet the ground can be. Land that is covered by shallow water for at least part of the year is called a <b>wetland</b>. To some people, wetlands look like wasted land. In fact, they are among the most useful places in nature.',
      { h: 'Four kinds of wetlands' },
      'Canada has about one quarter of all the wetlands on Earth. They come in four main types. Marshes have grasses and cattails growing in shallow water. Swamps have trees and shrubs. Bogs are covered with thick, spongy moss. Fens are fed by groundwater and have grasses and sedges.',
      { fig: '<path class="k" d="M10 80 Q80 60 150 80 Q220 100 290 80"/><path class="t" d="M10 92 Q80 72 150 92 Q220 112 290 92"/>' +
          D.arrow(60, 20, 60, 60, 'a') + D.arrow(150, 100, 150, 130, 'a') + D.arrow(240, 50, 280, 50, 'a') +
          D.label(12, 14, 'rain and floodwater soak in') + D.label(156, 126, 'water filters down, cleaner') + D.label(180, 40, 'released slowly'),
        tall: 140, cap: 'A wetland soaks up water like a sponge and releases it slowly.' },
      { h: 'Why wetlands matter' },
      'Wetlands act like giant sponges. During heavy rain or spring melt, they soak up water and release it slowly, which helps prevent floods in towns downstream. As water moves through wetland plants and soil, mud and pollution settle out, so the water that flows on is cleaner.',
      'Wetlands are also full of life. Frogs, turtles, ducks, herons, muskrats and many fish depend on them. Many of Ontario’s species at risk, such as the Blanding’s turtle, need wetland <b>habitat</b> to survive. Wetland plants and soils also store large amounts of carbon, which helps slow climate change.',
      { h: 'Disappearing wetlands' },
      'In southern Ontario, about two thirds of the wetlands that existed before European settlement have been drained or filled in. Farmers drained them to grow crops. Cities filled them to build roads and houses. When wetlands disappear, floods can become worse, water becomes dirtier and animals lose their homes.',
      { box: 'What helps', text: 'Protect wetlands near your community. Never dump anything into them. Volunteer for a cleanup. Learn about local conservation groups.' },
      'Today, many communities, First Nations and conservation groups are working to protect and restore wetlands. Some are even building new ones. It turns out that soggy, squishy land is worth a lot.'
    ],
    guide: { before: 'If possible, visit a local marsh or look at photos. Teach <b>wetland</b>, <b>habitat</b> and <b>species at risk</b>.',
      after: 'What would happen to a town downstream if a large wetland were filled in? Explain.' },
    words: [['wetland', 'land covered by shallow water for part of the year'], ['habitat', 'the natural home of a plant or animal']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Marshes are wet.', 'Wetlands prevent floods, clean water and shelter wildlife, but many have been lost.', 'Frogs live in ponds.', 'Moss is spongy.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the four kinds of wetlands.', cols: ['Wetland', 'What grows there'],
        rows: [['marsh', null], ['swamp', null], ['bog', null], ['fen', null]],
        a: [[null, 'grasses and cattails'], [null, 'trees and shrubs'], [null, 'thick, spongy moss'], [null, 'grasses and sedges']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What happens to water as it filters down?',
        opts: ['It becomes cleaner.', 'It turns to ice.', 'It disappears.', 'It gets saltier.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author compare wetlands to sponges?',
        opts: ['They soak up and slowly release water.', 'They are yellow.', 'They are used for cleaning dishes.', 'They are small.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were many wetlands drained?',
        opts: ['for crops, roads and houses', 'to save frogs', 'to make lakes', 'to stop rain'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The opposite of <b>drained</b> in this text is …',
        opts: ['filled with water', 'dried', 'emptied', 'built'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Explain how filling in a wetland could cause flooding downstream.',
        a: 'Without the wetland to soak up rain and melting snow, the water runs off quickly into rivers and floods towns.', look: 'explains the sponge effect and its loss' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How does the author feel about wetlands? Use the last line as evidence.',
        a: 'The author thinks they are valuable. The last line says “soggy, squishy land is worth a lot.”', look: 'identifies the author’s view using the last line' }
    ]
  });

  P.add({
    id: 'g5-citizenship', subject: 'social', form: 'Story',
    title: 'The Day We Became Canadian',
    deck: 'After five years in Canada, Hamza’s family takes the oath of citizenship',
    hero: {
      photo: 'g5-citizenship.jpg', credit: 'CREDIT', focus: '50% 50%',
      tall: 210,
      cap: 'New citizens hold small flags at a citizenship ceremony.'
    },
    body: [
      'Hamza had never seen his father wear a tie on a Tuesday. But this was no ordinary Tuesday. Today, Hamza, his parents and his little sister, Noor, were going to become Canadian <b>citizens</b>.',
      'Five years earlier, they had arrived at Pearson Airport in Toronto with four suitcases and a lot of hope. Hamza had been five. He remembered the snow, and how he had never felt cold like that before.',
      { h: 'Getting ready' },
      'To become a citizen, an adult must have lived in Canada for at least three of the last five years. Adults aged 18 to 54 must also pass a test about Canada’s history, geography, government and the rights and responsibilities of citizens. For weeks, Hamza had quizzed his parents at dinner.',
      { fig: steps(4, [['Arrive', 'in Canada'], ['Live here', '3 of 5 years'], ['Apply', 'and study'], ['Pass', 'the test'], ['Oath', 'ceremony']], 52),
        tall: 52, cap: 'The steps to becoming a Canadian citizen.' },
      '“Who is the head of the government of Canada?” he would ask.',
      '“The prime minister,” his mother would answer.',
      '“What are the three levels of government?”',
      '“Federal, provincial and municipal,” said his father. “Now pass the rice.”',
      { h: 'The ceremony' },
      'The ceremony was held in a community centre. About 60 people from 25 countries filled the rows of chairs. A citizenship judge welcomed them. An Elder from a nearby First Nation spoke about the land they were standing on and the treaties that are part of Canada’s story.',
      'Then everyone stood and raised their right hand to take the <b>oath</b>. They promised to be faithful to Canada, to obey its laws and to respect the rights and treaties of Indigenous peoples. Hamza said the words too, even though children do not have to. He wanted to.',
      'Afterward, they all sang “O Canada.” Hamza’s mother cried, and his father pretended he had something in his eye. A woman from the Philippines took a photo of them holding their certificates and little red and white flags.',
      { box: 'Did you know?', text: 'Hundreds of thousands of people become Canadian citizens every year.' },
      'On the bus home, Noor asked if she was a different person now. Hamza laughed. “You’re still you,” he said. “You just have one more thing to be proud of.”',
      'That night, Hamza wrote in his journal: <i>We were already home. Today, it became official.</i>'
    ],
    guide: { before: 'Talk about where your family comes from. Teach <b>citizen</b>, <b>oath</b>, <b>ceremony</b> and <b>treaty</b>.',
      after: 'What does it mean to belong to a country? What responsibilities come with being a citizen?' },
    words: [['citizens', 'official members of a country'], ['oath', 'a serious promise']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the story?',
        opts: ['Hamza likes rice.', 'Hamza’s family prepares for and takes part in their Canadian citizenship ceremony.', 'Toronto has an airport.', 'Noor is little.'], a: 1 },
      { k: 'order', code: 'C1.4', q: 'Number the steps to citizenship shown in the diagram.',
        items: ['Arrive in Canada.', 'Live here 3 of 5 years.', 'Apply and study.', 'Pass the test.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Hamza quiz his parents?',
        opts: ['to help them study for the test', 'to make them laugh', 'for homework', 'to learn French'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'His father “pretended he had something in his eye.” What does this show?',
        opts: ['He was moved to tears.', 'He was sick.', 'He was bored.', 'He had dust in his eye.'], a: 0 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Why did an Elder speak at the ceremony?',
        opts: ['to share the story of the land and the treaties', 'to give out flags', 'to take photos', 'to sing'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is “O Canada” in quotation marks?',
        opts: ['It is the title of a song.', 'Someone is speaking.', 'It is a question.', 'It is a city.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'What does Hamza’s journal line mean: “We were already home. Today, it became official”?',
        a: 'Canada already felt like home to the family. The ceremony made it legal and official that they belong.', look: 'explains the difference between feeling at home and becoming official' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of an important day for your family. How was it like or unlike Hamza’s day?',
        a: 'My sister’s graduation was also full of happy tears and photos, but it was about school, not a country.', look: 'a personal connection with a clear comparison' }
    ]
  });

})();
