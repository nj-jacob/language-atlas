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
      photo: 'g5-solar-roof.jpg', credit: 'Photo: Gray Watson, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
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
      'Another solution is to let the building ride the shaking. Some buildings sit on base isolators, thick pads made of layers of rubber and steel. When the ground moves, the pads bend, and the building above moves much less, like a person standing on a bouncy bridge.',
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
      '“Tomorrow: cloudy, with a 40% chance of rain.” Malik heard the forecast and groaned. The class trip to the conservation area was tomorrow. Would it rain or not? His sister, Hana, shrugged. “The forecast can’t tell you that,” she said. “It tells you how likely it is.”',
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
      'An <b>angle</b> is the amount of turn between two lines that meet at a point. Angles are measured in degrees with a tool called a protractor. When a puck hits the boards, it bounces off at the same angle as it came in. This is true for a ball bouncing off a wall and for light bouncing off a mirror, too.',
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
      'Many sails are triangles. Here is the trick: draw a rectangle around a triangle with the same base and height, and the triangle covers exactly half of it. So the area of a triangle is the base times the height, divided by 2. Grace’s sail has a base of 4 m and a height of 3 m. Its area is 4 × 3 ÷ 2 = 6 m².',
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
})();
