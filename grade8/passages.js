/* Grade 8 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  /* number with a space in 5 or more digits (12 500) */
  function num(v) { var s = String(v); return /^\d{5,}$/.test(s) ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s; }
  function tx(x, y, cls, t, anchor) { return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + t + '</text>'; }
  /* a bar chart, 300 wide and about 172 tall: rows [[value, 'label', 'second line'], ...], o { max, step, unit, pre } */
  function bars(rows, o) {
    var top = 26, bot = 136, x0 = 46, w = 250 / rows.length, s = (bot - top) / o.max, u = o.unit || '', pre = o.pre || '';
    var out = '<path class="k" d="M' + x0 + ' ' + (top - 8) + ' V' + bot + ' H298"/>';
    for (var v = 0; v <= o.max; v += o.step) out += '<path class="t" d="M' + (x0 - 4) + ' ' + (bot - v * s) + ' H298"/>' + tx(x0 - 7, bot - v * s + 4, 'n', pre + num(v) + u, 'end');
    rows.forEach(function (r, i) {
      var bw = Math.min(40, w * 0.6), x = x0 + w * i + (w - bw) / 2, h = r[0] * s, c = x + bw / 2;
      out += '<rect class="h" x="' + x + '" y="' + (bot - h) + '" width="' + bw + '" height="' + h + '"/>' + tx(c, bot - h - 6, 'lb', pre + num(r[0]) + u, 'middle') +
        tx(c, bot + 15, 'n', r[1], 'middle') + (r[2] ? tx(c, bot + 27, 'n', r[2], 'middle') : '');
    });
    return out;
  }
  /* a timeline, 300 wide and 128 tall: items [[year, 'line 1', 'line 2'], ...] placed between the years from and to; labels take turns above and below */
  function timeline(items, from, to) {
    var y = 64, out = '<path class="k" d="M10 ' + y + ' H292"/>';
    items.forEach(function (e, i) {
      var x = 22 + (e[0] - from) * 256 / (to - from), up = i % 2 === 0, an = x < 50 ? 'start' : x > 250 ? 'end' : 'middle', lx = an === 'start' ? x - 6 : an === 'end' ? x + 6 : x;
      out += '<path class="t" d="M' + x + ' ' + y + ' V' + (up ? y - 14 : y + 14) + '"/><circle class="dot" cx="' + x + '" cy="' + y + '" r="4"/>' +
        tx(lx, up ? y - 46 : y + 30, 'lb', e[3] || e[0], an) + tx(lx, up ? y - 32 : y + 43, 'n', e[1], an) + (e[2] ? tx(lx, up ? y - 20 : y + 55, 'n', e[2], an) : '');
    });
    return out;
  }
  /* steps in boxes joined by arrows, top to bottom, 300 wide and 38 tall for each step: steps ['text', ...] */
  function flow(steps) {
    return steps.map(function (t, i) {
      var y = 6 + i * 38;
      return '<rect class="' + (i ? 'k' : 'a') + '" x="30" y="' + y + '" width="240" height="26" rx="6"/>' + tx(150, y + 17, 'l', t, 'middle') + (i < steps.length - 1 ? D.arrow(150, y + 26, 150, y + 38) : '');
    }).join('');
  }

  P.add({
    id: 'g8-phones', subject: 'health', form: 'Letter to the editor', plain: true,
    title: 'Lock Up the Phones',
    deck: 'A Grade 8 student makes her case before families vote',
    hero: {
      photo: 'g8-lockers.jpg', credit: 'Photo: ChinaFlag, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Lockers in a school hallway in Markham, Ontario. Should phones stay in them from the first bell to the last?'
    },
    body: [
      '<i>To the Editor:</i>',
      'Last week, our school council voted on whether phones should stay in lockers for the whole school day. The vote was tied, so the question goes to families next month. As a Grade 8 student at Northwood Public School, I am asking every parent and guardian to vote yes.',
      { h: 'The problem' },
      'Phones are pulling our attention away from learning and from each other. Our school already asks us to put phones away during lessons, but many students still check them under their desks. In a <b>survey</b> our student council ran in October, 61 <b>percent</b> of 214 students said they check their phones during class at least once a day. At lunch, the cafeteria is strangely quiet: instead of talking, many of us scroll.',
      { fig: bars([[18, 'never'], [21, 'once a', 'week'], [27, 'once a', 'day'], [34, 'several', 'times a day']], { max: 40, step: 20, unit: '%' }),
        tall: 172, cap: 'How often do you check your phone during class? Northwood student council survey, October.' },
      { box: 'About the survey', text: 'The student council wrote the questions. 214 students in Grades 6 to 8 answered on paper, and each chose one answer. Students in Grades 4 and 5 were not asked.' },
      { h: 'A solution that works' },
      'The solution is simple: phones stay in lockers from the first bell to the last. Schools that have tried this report calmer classes and more conversation at lunch. Students who need a phone for a medical reason or a disability would keep theirs. Families could call the office in an emergency, just as they did for <b>generations</b>. Ms. Okafor, who teaches Grade 7 science, told me that when phones were put away for a week during tests last spring, “students asked more questions and finished more work.”',
      { h: 'Answering the worries' },
      'Some students say a locker rule treats us like little kids. I understand, but learning to put a phone away is a grown-up skill. Others worry about emergencies. Yet in an emergency, the safest thing is to listen to teachers, not to scroll through rumours.',
      'Six hours a day without a screen is not a punishment. It is a chance to think, to talk and to notice the people around us. Please vote yes.',
      '<i>Priya Ramanathan, Grade 8, Northwood Public School</i>'
    ],
    guide: { before: 'Ask: what is a letter to the editor, and who reads one? Teach <b>claim</b> (the main point), <b>evidence</b> (facts that support it) and <b>counterargument</b> (an answer to the other side), and the Words to know. As you read, the child underlines the claim once and each piece of evidence twice.',
      after: 'Priya’s student council wrote the survey and also wants the rule. Does that matter? How could a fairer survey be run?' },
    words: [['survey', 'the same questions asked to many people, to learn what they think or do'], ['percent', 'out of every 100'], ['generations', 'the steps from grandparents to parents to children, about 25 to 30 years each']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'Which text pattern organizes this letter?',
        opts: ['problem and solution', 'time order', 'description', 'compare and contrast'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Who is Priya mainly trying to persuade?',
        opts: ['students', 'teachers', 'parents and guardians', 'the school council'], a: 2 },
      { k: 'lines', code: 'C1.4', n: 2, q: 'Look at the bar graph. Does it support Priya’s claim that 61 percent check their phones at least once a day? Show how you know.',
        a: 'Yes. 27% check once a day and 34% several times a day: 27 + 34 = 61%.', look: 'adds the two bars (27% and 34%) to reach 61%' },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart with each worry and Priya’s answer to it.', cols: ['Worry', 'Priya’s answer'],
        rows: [['A locker rule treats students like little kids.', null], ['Students need phones in an emergency.', null], [null, 'Those students would keep their phones.']],
        a: [[null, 'Putting a phone away is a grown-up skill.'], [null, 'Families can call the office; students should listen to teachers.'], ['Some students need a phone for a medical reason or a disability.', null]] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Read “About the survey.” Give two reasons the survey might not tell the whole story.',
        a: 'The student council wrote the questions and wants the rule, so the questions might lean one way. Grades 4 and 5 were not asked, and students may not remember exactly how often they check.', look: 'two reasons, such as who wrote it, who was left out, or answers based on memory' },
      { k: 'choice', code: 'C1.5', q: '“At lunch, the cafeteria is strangely quiet.” Why is this detail persuasive?',
        opts: ['It paints a picture of students not talking to each other.', 'It proves that phones are dangerous.', 'It gives an exact number.', 'It shows the food is not good.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 4, q: 'Do you agree with Priya? Write your own short reply. State your opinion and give two reasons, one of which answers her argument.',
        a: 'Answers will differ. For example: I disagree. Phones can help us look things up for projects, and Priya’s own survey shows 39% check their phones less than once a day, so most students already manage them.', look: 'a clear opinion, two reasons, and one reason that responds directly to a point in Priya’s letter' }
    ]
  });

  P.add({
    id: 'g8-cells', subject: 'science', form: 'Report',
    title: 'Rooms Too Small to See',
    deck: 'How two hundred years of looking closely led to the cell theory',
    hero: {
      photo: 'g8-hooke-cork.jpg', credit: 'Drawing: Robert Hooke, 1665, public domain, Wikimedia Commons', focus: '50% 18%',
      tall: 200,
      cap: 'Robert Hooke’s drawing of a thin slice of cork, printed in his book <i>Micrographia</i> in 1665. The tiny boxes reminded him of small rooms, or cells.'
    },
    body: [
      'In 1665, an English scientist named Robert Hooke sliced a piece of cork as thin as he could and placed it under his microscope. He saw rows of tiny, empty boxes packed together like a honeycomb. They reminded him of the small rooms where monks slept, so he called them <b>cells</b>. Hooke had no idea that he was looking at the walls of dead plant cells, or that every living thing is built from them.',
      { fig: timeline([[1665, 'Hooke names', '“cells”'], [1674, 'Leeuwenhoek sees', 'living cells'], [1839, 'Schleiden and Schwann:', 'plants and animals'], [1855, 'Virchow: cells', 'come from cells']], 1660, 1860),
        tall: 128, cap: 'Two centuries of discoveries built the cell theory.' },
      { box: 'The cell theory', text: '1. All living things are made of one or more cells. 2. The cell is the basic unit of structure and function in living things. 3. All cells come from cells that already exist.' },
      { h: 'Tiny animals in a drop of water' },
      'A few years later, Antonie van Leeuwenhoek, a cloth merchant in the Netherlands, began grinding his own lenses. His simple microscopes could magnify objects more than 200 times. In pond water and in scrapings from his own teeth, he saw creatures swimming and spinning. He called them “animalcules,” or little animals. Today we know he was the first person to see bacteria and other single-celled organisms.',
      { h: 'Putting the pieces together' },
      'For more than 150 years, these discoveries stayed scattered. Then, in the 1830s, better microscopes let scientists compare many living things. In 1838, the botanist Matthias Schleiden concluded that all plants are made of cells. A year later, Theodor Schwann showed that the same was true of animals. In 1855, the doctor Rudolf Virchow added a final idea: new cells form only when existing cells divide.',
      'Notice how slowly the idea grew. Each scientist could see only as far as his own lenses allowed, and each one built on careful records left by others. This <b>theory</b> changed medicine. Doctors began to understand that disease often starts when cells are damaged or invaded. Doctors learned to look for unusual cells under the microscope, and they began to see bacteria as living things that could be fought. Washing hands, boiling water and, later, vaccines all grew from this new understanding. Today, scientists use electron microscopes that magnify more than a million times, and they can watch a single cell divide in real time. Yet every discovery still rests on a simple habit that Hooke and Leeuwenhoek shared: looking closely, and recording exactly what they saw.'
    ],
    guide: { before: 'Ask what a microscope does and why scientists needed one to discover cells. Teach <b>cell</b>, <b>theory</b> and <b>organism</b>. Read the three parts of the cell theory aloud together before reading the whole text.',
      after: 'Hooke’s cells were empty and dead, yet the name stuck. Why do you think scientists keep old names even after they learn more?' },
    words: [['cells', 'the tiny units that all living things are made of'], ['theory', 'a well-tested explanation that is supported by a great deal of evidence']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the discoveries in the order they happened.',
        items: ['Hooke sees the walls of cork cells.', 'Leeuwenhoek sees single-celled organisms.', 'Schleiden and Schwann say plants and animals are made of cells.', 'Virchow says all cells come from cells.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which text feature best shows how long it took to build the cell theory?',
        opts: ['the timeline', 'the photo caption', 'the subheadings', 'the Words to know'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'Single-<b>celled</b> and multi<b>cellular</b> share a base. <b>Multi-</b> means …',
        opts: ['one', 'many', 'small', 'inside'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think the discoveries “stayed scattered” for more than 150 years? Use evidence from the text.',
        a: 'Microscopes were not good enough to compare many living things, and scientists worked separately. Only in the 1830s did better microscopes let them see that all living things share cells.', look: 'an inference (weak microscopes, scientists working apart) supported by the detail about better microscopes in the 1830s' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart.', cols: ['Scientist', 'What he added to the cell theory'],
        rows: [['Schleiden', null], ['Schwann', null], [null, 'All cells come from cells that already exist.']],
        a: [[null, 'All plants are made of cells.'], [null, 'Animals are made of cells too.'], ['Virchow', null]] },
      { k: 'choice', code: 'B3.2', q: '“Hooke had no idea that he was looking at the walls of dead plant cells.” The word <b>dead</b> is …',
        opts: ['a noun naming a thing', 'an adjective describing the cells', 'a verb showing an action', 'an adverb describing how he looked'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The last sentence says every discovery rests on “looking closely, and recording exactly what they saw.” Is this a good conclusion? Explain using two scientists from the text.',
        a: 'Yes. Hooke drew exactly what he saw in cork, and Leeuwenhoek recorded the tiny creatures he found in pond water. Their careful records let later scientists build the cell theory.', look: 'an opinion about the conclusion, supported by details about two scientists' }
    ]
  });

  P.add({
    id: 'g8-red-river', subject: 'history', form: 'Report',
    title: 'The Red River Resistance',
    deck: 'In 1869, the Métis of Red River refused to be handed over without a say',
    hero: {
      photo: 'g8-red-river-cart.jpg', credit: 'Photo: 1800s, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A Red River ox cart and its driver in the 1800s. Métis traders built these all-wooden carts and drove them in long trains across the Prairies.'
    },
    body: [
      'In 1869, about 12 000 people lived in the Red River Settlement, where the city of Winnipeg stands today. Most were Métis, people of mixed First Nations and European ancestry with their own language, Michif, and a way of life built on farming, trade and the buffalo hunt. That year, the Hudson’s Bay Company agreed to sell its vast territory, Rupert’s Land, to the new country of Canada. Nobody asked the people who lived there.',
      { fig: '<path class="a" d="M10 30 Q80 50 150 30 T290 30"/>' + tx(12, 18, 'n', 'Red River') +
          [40, 70, 100, 130].map(function (x) { return '<path class="k" d="M' + x + ' ' + (x === 70 || x === 130 ? 38 : 42) + ' V150"/>'; }).join('') + '<path class="k" d="M30 150 H140"/>' +
          tx(85, 166, 'n', 'Métis river lots', 'middle') +
          '<path class="k" d="M170 60 H290 V150 H170 Z M230 60 V150 M170 105 H290"/>' + tx(230, 166, 'n', 'square survey', 'middle') +
          D.label(186, 88, 'no river', 200, 78),
        tall: 172, cap: 'Long river lots gave every family river frontage. The square survey did not.' },
      { h: 'Surveyors arrive' },
      'Before the transfer was even complete, Canadian surveyors arrived to divide the land into large squares. The Métis farmed long, narrow river lots, so each family had a share of the river, the rich soil near it and the woods behind. The square <b>survey</b> ignored those lots completely. On October 11, 1869, a group of Métis men led by 25-year-old Louis Riel stood on the surveyors’ chain and told them to stop.',
      { h: 'A government of their own' },
      'Riel and his supporters formed a <b>provisional government</b> to speak for the settlement. They wrote a list of rights, including protection for their land, their religion and the French language. When Canada sent representatives, the provisional government <b>negotiated</b> with them. The result was the Manitoba Act of 1870, which created Canada’s fifth province.',
      { box: 'A heavy cost', text: 'In March 1870, the provisional government executed Thomas Scott, an Ontario man who had fought against it. Anger in Ontario forced Riel to flee, and he lived in exile for years.' },
      'The Manitoba Act promised 1.4 million acres of land to Métis children. Yet the land was handed out slowly, and many Métis families moved west. Fifteen years later, Riel would return to lead another resistance in what is now Saskatchewan, and he was hanged for treason in 1885. His trial divided the country, with many French Canadians seeing him as a hero and many in Ontario seeing him as a traitor. Today, Riel is honoured as the founder of Manitoba, and Louis Riel Day is a holiday in that province each February.'
    ],
    guide: { before: 'Locate Red River (Winnipeg) on a map of Canada. Explain that Rupert’s Land was the huge Hudson’s Bay Company territory. Teach <b>survey</b>, <b>provisional</b> and <b>negotiate</b>. Look at the river-lot diagram together first.',
      after: 'The Métis were not asked before their land was sold. How might history have changed if Canada had talked with them first?' },
    words: [['survey', 'measuring and mapping land to divide it into pieces'], ['provisional government', 'a temporary government set up until a permanent one is formed'], ['negotiated', 'talked with the other side to reach an agreement']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'Which text pattern does the writer mainly use?',
        opts: ['problem and solution', 'compare and contrast', 'description', 'question and answer'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the Métis stand on the surveyors’ chain?',
        opts: ['to measure the land themselves', 'to show they would not accept a survey that ignored their lots', 'to help the surveyors', 'because they had lost the chain'], a: 1 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Use the diagram. Explain why the square survey worried Métis families.',
        a: 'The river lots gave each family a strip touching the river. The square survey left some squares with no river at all, so families could lose water, soil and transport.', look: 'a detail from the diagram (river frontage, a square with no river) linked to a reason it mattered' },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart of causes and effects.', cols: ['Cause', 'Effect'],
        rows: [['The Hudson’s Bay Company sold Rupert’s Land without asking the people there.', null], ['The provisional government negotiated with Canada.', null], [null, 'Riel had to flee into exile.']],
        a: [[null, 'The Métis feared for their land and organized a resistance.'], [null, 'The Manitoba Act created the province of Manitoba.'], ['Thomas Scott was executed and Ontario was angry.', null]] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The writer calls these events a “resistance.” Some older books called them a “rebellion.” How does each word show a different perspective?',
        a: '“Resistance” suggests the Métis were defending their rights against something unfair. “Rebellion” suggests they were rising up against a rightful government, which takes Canada’s side.', look: 'explains that each word judges the Métis differently and names whose side each takes' },
      { k: 'choice', code: 'B3.3', q: 'In “Métis, people of mixed First Nations and European ancestry,” what does the comma do?',
        opts: ['It joins two sentences.', 'It introduces an explanation of the word Métis.', 'It separates items in a list.', 'It shows that someone is speaking.'], a: 1 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two parts of Métis culture from the text. Explain why the writer included them.',
        a: 'Their language, Michif, and their river-lot farming. They show that the Métis were a distinct people with a settled way of life worth protecting.', look: 'two cultural elements (Michif, river lots, buffalo hunt, trade, Red River carts) and a reason they matter to the text' }
    ]
  });

  P.add({
    id: 'g8-buoyancy', subject: 'science', form: 'Explanation',
    title: 'Why a Steel Ship Floats',
    deck: 'A freighter weighs thousands of tonnes. The water pushes back harder.',
    hero: {
      photo: 'g8-lake-freighter.jpg', credit: 'Photo: William Davies, CC0, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'The deck of the bulk freighter <i>Isolda</i> as it nears Cleveland on Lake Erie. Under the long row of hatches are holds for grain, iron ore or salt.'
    },
    body: [
      'Drop a steel bolt into a lake and it sinks at once. Yet a lake freighter, made of thousands of tonnes of steel, glides across Lake Superior carrying a load of iron ore. The secret is not the steel. It is the water that the ship pushes out of the way.',
      { fig: '<path class="a" d="M10 70 H290"/>' + D.ripple(10, 60, 62) + D.ripple(240, 290, 62) +
          '<path class="k" d="M70 40 H230 L214 104 H86 Z"/><path class="h" d="M78 70 H222 L214 104 H86 Z"/>' +
          D.arrow(150, 150, 150, 112, 'a') + D.arrow(150, 0, 150, 34, 'k') +
          tx(160, 14, 'n', 'weight of the ship') + tx(160, 146, 'n', 'buoyant force') + D.label(232, 96, 'water pushed aside', 210, 90) + D.label(6, 92, 'water line', 74, 70),
        tall: 156, cap: 'The ship sinks until the water it pushes aside weighs as much as the ship.' },
      { box: 'Fresh water or salt?', text: 'Salt water is denser than fresh water, so it pushes up harder. A ship floats a little higher in the ocean than in Lake Ontario. Lines painted on the hull show how deeply it can safely be loaded in each.' },
      { h: 'The push from below' },
      'More than 2000 years ago, the Greek thinker Archimedes noticed that an object placed in water pushes some of the water aside. He realized that the water pushes back up on the object with a force equal to the weight of the water it <b>displaced</b>. This upward push is called the <b>buoyant force</b>. If the buoyant force is as large as the object’s weight, the object floats.',
      { h: 'Shape and density' },
      'A solid lump of steel is very dense: a cube of it 10 centimetres on each side has a mass of almost 8 kilograms, while the same cube of water has a mass of just 1 kilogram. Shape that steel into a wide, hollow hull, though, and it encloses a huge volume of air. The whole ship, steel and air together, is less dense than the water, so it pushes aside enough water to hold itself up.',
      { h: 'Loading up' },
      'As cargo pours into the hold, the ship settles lower and pushes aside more water. A loaded freighter may sit eight metres deep. Captains on the Great Lakes watch this closely, because shallow channels and locks can ground a ship that rides too low. In dry years, when lake levels drop, freighters must leave port partly empty, and every centimetre of draft can mean dozens of tonnes of cargo left behind.',
      { h: 'The same idea in the air' },
      'Archimedes’ principle works in any fluid, including air. A hot-air balloon rises because the warm air inside it is less dense than the cooler air around it. The balloon displaces a large volume of cool air, and that air pushes it upward, just as water pushes up on a ship.'
    ],
    guide: { before: 'Float an empty plastic container in water, then add coins until it sinks. Teach <b>displace</b>, <b>buoyant force</b> and <b>density</b>. Trace the two arrows in the diagram before reading.',
      after: 'A ship loaded in Lake Superior travels to the Atlantic Ocean. Will it float higher or lower when it reaches salt water? Why?' },
    words: [['displaced', 'pushed out of its place'], ['buoyant force', 'the upward push of a liquid or gas on an object in it']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Archimedes lived in ancient Greece.', 'A ship floats because the water it pushes aside weighs as much as the ship.', 'Steel always sinks in water.', 'Ships carry iron ore on the Great Lakes.'], a: 1 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the diagram. What do the two arrows show, and why are they drawn the same length?',
        a: 'The top arrow shows the weight of the ship pushing down and the bottom arrow shows the buoyant force pushing up. They are the same length because the forces are equal when a ship floats.', look: 'names both forces and explains that equal length means equal forces (floating)' },
      { k: 'choice', code: 'B2.2', half: true, q: '“Steel is very <b>dense</b>.” Dense means …',
        opts: ['a lot of mass packed into a small space', 'very hot', 'easy to bend', 'full of air'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'A freighter that rides too low might …',
        opts: ['float away', 'hit the bottom of a shallow channel', 'turn into a submarine', 'go faster'], a: 1 },
      { k: 'table', code: 'C2.6', q: 'Complete the chart.', cols: ['Object', 'Floats or sinks?', 'Why?'],
        rows: [['a steel bolt', 'sinks', null], ['a steel freighter', null, 'Its hull holds a lot of air, so the whole ship is less dense than water.'], ['a ship in salt water', 'floats higher', null]],
        a: [[null, null, 'It is denser than water.'], [null, 'floats', null], [null, null, 'Salt water is denser and pushes up harder.']] },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is complex: it joins an idea with a word such as <i>if</i> or <i>because</i>?',
        opts: ['It is the water that the ship pushes out of the way.', 'If the buoyant force is as large as the object’s weight, the object floats.', 'The secret is not the steel.', 'Drop a steel bolt into a lake.'], a: 1 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Before reading the box, predict: will a ship float higher in Lake Ontario or in the Atlantic Ocean? Then read the box. Was your prediction confirmed?',
        a: 'I predicted it would float the same. The box says salt water pushes up harder, so the ship floats higher in the ocean. I changed my thinking.', look: 'a prediction, then a clear statement of whether the text confirmed or changed it' },
    ]
  });

  P.add({
    id: 'g8-megacities', subject: 'geography', form: 'Report',
    title: 'Cities of Ten Million',
    deck: 'More than half of all people now live in cities. Some cities have grown beyond imagining.',
    hero: {
      photo: 'g8-shibuya.jpg', credit: 'Photo: David Kernan, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The Shibuya district of Tokyo, seen from above. Greater Tokyo, the largest urban area in the world, is home to about 37 million people.'
    },
    body: [
      'In 1950, only two cities on Earth, New York and Tokyo, had more than ten million people. Geographers call a city that size a <b>megacity</b>. Today there are more than thirty, and most of them are in Asia, Africa and South America. Lagos in Nigeria, Delhi in India, Dhaka in Bangladesh and São Paulo in Brazil have all grown so fast that no one can count their people exactly.',
      { fig: bars([[30, '1950'], [55, '2018'], [68, '2050', '(expected)']], { max: 80, step: 20, unit: '%' }),
        tall: 172, cap: 'Share of the world’s people living in urban areas. Source: United Nations estimates.' },
      { h: 'Why cities grow' },
      'Cities grow in two ways. Some growth is natural increase: more babies are born than people die. The rest comes from <b>migration</b>. Families move from the countryside to the city because farming no longer earns enough, or because the city offers jobs, schools and hospitals. Geographers call these reasons push factors and pull factors. A drought pushes people off the land; a factory job pulls them toward the city.',
      { box: 'Closer to home', text: 'Canada has no megacity. The Toronto area, the largest in the country, has about 6 million people. Like megacities, it struggles with traffic and housing costs.' },
      { h: 'Growing pains' },
      'When a city grows faster than it can build, problems follow. In Lagos, Nigeria, millions of people ride crowded minibuses through traffic jams that can last hours. Many newcomers cannot afford a house, so they build homes from whatever they can find in <b>informal settlements</b> on the edges of the city. These neighbourhoods may have no clean water, no sewers and no electricity.',
      { h: 'Building better cities' },
      'Yet megacities are also places of energy and invention. Because so many people live close together, a single subway line or water pipe can serve millions. Cities such as Bogotá in Colombia have built fast bus lanes that move people quickly for a low fare. Residents of informal settlements often organize to bring in water taps and paths. City planners argue that the real question is not whether cities will grow, but whether they will grow in ways that are fair and <b>sustainable</b>.'
    ],
    guide: { before: 'Ask the child to name the largest city they have visited and guess its population. Teach <b>megacity</b>, <b>migration</b> and <b>sustainable</b>. Read the bar graph together: what does each bar show?',
      after: 'Would you rather live in a megacity or a small town? What would you gain and what would you give up?' },
    words: [['megacity', 'a city area with more than 10 million people'], ['migration', 'moving from one place to live in another'], ['informal settlements', 'neighbourhoods built by residents without permits, often without services']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the bar graph show?',
        opts: ['the number of megacities', 'the share of people living in cities over time', 'the population of Tokyo', 'how fast cities build roads'], a: 1 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>These</b> neighbourhoods may have no clean water.” <b>These</b> refers to …',
        opts: ['all neighbourhoods in Lagos', 'informal settlements', 'neighbourhoods in Canada', 'subway lines'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Sort each reason into the chart.', cols: ['Reason to move', 'Push or pull factor?'],
        rows: [['A drought ruins the crops.', null], ['The city has a new hospital.', null], ['A factory is hiring workers.', null], ['Farming no longer earns enough.', null]],
        a: [[null, 'push'], [null, 'pull'], [null, 'pull'], [null, 'push']] },
      { k: 'lines', code: 'C2.5', n: 3, q: 'How is the Toronto area like a megacity, and how is it different? Use the box and one thing you know about a Canadian city.',
        a: 'Like a megacity, Toronto has traffic and expensive housing. It is different because it has about 6 million people, not 10 million, and most homes have clean water and sewers.', look: 'one similarity and one difference, using the box and their own knowledge' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The last section begins with “Yet.” What does the writer want you to understand about megacities? Use evidence.',
        a: 'The writer wants us to see that megacities are not only problems. They are full of energy and invention, such as Bogotá’s bus lanes and residents bringing in water taps.', look: 'the turn from problems to strengths, with one example' },
      { k: 'choice', code: 'B2.1', q: 'The word <b>urban</b> means about cities. Which word means “spreading the city outward into the countryside”?',
        opts: ['urbanize', 'suburban sprawl', 'rural', 'urbane'], a: 1 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The text uses United Nations numbers. Why might a city’s exact population be hard to count? How should a reader treat these numbers?',
        a: 'People in informal settlements may not be registered, and people move in and out all the time. A reader should treat the numbers as estimates, not exact counts.', look: 'a reason counts are uncertain and a sensible way to read estimates' }
    ]
  });

  P.add({
    id: 'g8-rowans-law', subject: 'health', form: 'Feature article',
    title: 'When in Doubt, Sit Them Out',
    deck: 'An Ottawa rugby player’s story changed how Ontario treats concussions',
    hero: {
      photo: 'g8-heading-ball.jpg', credit: 'Photo: Newfoundlandguy, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 25%',
      tall: 200,
      cap: 'A soccer player heads the ball. A concussion can happen in any sport, from a hit to the head, face, neck or body.'
    },
    body: [
      'Rowan Stringer loved rugby. In the spring of 2013, the 17-year-old from Ottawa was the captain of her high-school team. During one week she took several hard hits, and she had headaches afterward. She did not tell her coach, and she kept playing. In her next game, after another tackle, she collapsed. She died a few days later.',
      { fig: '<ellipse class="k" cx="130" cy="80" rx="96" ry="68"/><ellipse class="h" cx="138" cy="82" rx="74" ry="50"/>' +
          D.arrow(300, 80, 238, 80, 'a') + D.arrow(150, 82, 100, 82, 'k') + tx(244, 72, 'n', 'hit') +
          D.label(8, 160, 'skull', 60, 136) + D.label(176, 160, 'brain moves inside', 120, 128) + D.label(8, 14, 'cushion of fluid', 58, 36),
        tall: 168, cap: 'A hit from one side moves the brain inside the skull, so it can be injured on the other side too.' },
      { box: 'Rowan’s Law Day', text: 'On the last Wednesday of September, Ontario schools and teams learn about concussions in Rowan’s memory.' },
      { h: 'An injury you cannot see' },
      'A <b>concussion</b> is a brain injury. The brain floats inside the skull, cushioned by fluid. A blow to the head, or even a hard hit to the body, can whip the head back and forth so fast that the brain strikes the inside of the skull. There is often no bruise or cut. Many people with a concussion never lose consciousness, so they may not realize they are hurt.',
      'Signs include headaches, dizziness, blurred vision, feeling sick to the stomach, and trouble remembering or concentrating. A second concussion before the first has healed can cause dangerous swelling. Doctors believe that is what happened to Rowan. Most young people recover from a concussion within a few weeks, but only if they rest their brain as well as their body. That can mean less screen time, shorter school days and no sports until the symptoms are gone.',
      { h: 'Rowan’s Law' },
      'Rowan’s parents worked with a committee to make sure no other family would lose a child this way. In 2018, Ontario passed Rowan’s Law. Sports organizations for young people must now have a plan to remove any player who might have a concussion, and a <b>protocol</b> that brings players back only step by step, with a doctor’s approval. Every player, parent and coach must review concussion information each year.',
      'The message is simple: if you think you might have a concussion, speak up. If you see a teammate hurt, tell an adult. It is never weak to sit out. When in doubt, sit them out.'
    ],
    guide: { before: 'This text describes a young athlete’s death. Prepare the child and check in afterward. Teach <b>concussion</b> and <b>protocol</b>. Look at the diagram and talk about why a hit on one side can hurt the other.',
      after: 'Why might a player hide an injury? What could teammates and coaches do to make it easier to speak up?' },
    words: [['concussion', 'a brain injury caused by a hit that shakes the brain inside the skull'], ['protocol', 'an official set of steps to follow']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does the writer begin with Rowan’s story instead of facts?',
        opts: ['to make readers care before learning the facts', 'because the facts are not important', 'to make the text funnier', 'because it is a fairy tale'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might a person with a concussion keep playing?',
        opts: ['They feel no pain at all.', 'There is often no cut or bruise, so they may not realize they are hurt.', 'The rules say they must.', 'Concussions heal in one minute.'], a: 1 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Use the diagram to explain how a hit on one side of the head can injure the other side of the brain.',
        a: 'The hit pushes the head one way, and the brain, floating in fluid, slides and strikes the inside of the skull on the other side.', look: 'refers to the arrows or fluid in the diagram and explains the brain moving inside the skull' },
      { k: 'order', code: 'C3.3', q: 'Number the events in order.',
        items: ['Rowan takes several hard hits in one week.', 'She plays again without telling her coach.', 'She dies after another tackle.', 'Ontario passes Rowan’s Law.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'B3.2', q: '“If you see a teammate hurt, <b>tell</b> an adult.” This sentence gives a command. The verb <b>tell</b> is in the …',
        opts: ['past tense', 'imperative (command) form', 'future tense', 'passive voice'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Rowan’s Law applies to every young athlete. Why is it important that a safety law includes all players, not only the best ones or the ones who ask?',
        a: 'Every player’s brain can be hurt the same way. If only some players were checked, others would keep playing injured, and a quiet player who does not ask for help would be at risk.', look: 'an idea about fairness or safety for all, linked to the text' },
      { k: 'lines', code: 'D2.3', n: 4, q: 'Write a short message (3 or 4 sentences) for your team’s locker room that persuades players to report concussion signs. Use your own voice.',
        a: 'Answers will differ. For example: Headache after a hit? Tell the coach. A concussion does not show on the outside, and playing hurt can make it much worse. Sitting out one game is better than missing a whole season. Speak up for yourself and your teammates.', look: 'a clear purpose, a confident voice, and at least one fact from the text' }
    ]
  });

  P.add({
    id: 'g8-cottingley', subject: 'social', form: 'Feature article',
    title: 'The Fairies at the Bottom of the Garden',
    deck: 'In 1917, two girls took five photos that fooled a famous author. What can they teach us about what we see online?',
    hero: {
      photo: 'g8-cottingley.jpg', credit: 'Photo: Elsie Wright, 1920, public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 200,
      cap: '“Frances and the Leaping Fairy,” the third Cottingley photo, taken in 1920. For more than sixty years, many people believed it showed a real fairy.'
    },
    body: [
      'In the summer of 1917, sixteen-year-old Elsie Wright and her nine-year-old cousin Frances Griffiths came in from the stream behind their house in Cottingley, England, with a strange story. They said they had been playing with fairies. To prove it, Elsie borrowed her father’s camera. When the photo was developed, it showed Frances surrounded by tiny dancing figures with wings.',
      { fig: flow(['See a surprising photo or claim', 'Stop: how does it make me feel?', 'Who made it, and what do they gain?', 'What do other reliable sources say?', 'Decide, or keep an open question']),
        tall: 190, cap: 'Steps to check a claim before you believe or share it.' },
      { h: 'A famous believer' },
      'Elsie’s father thought the fairies were cardboard. Her mother was not so sure. By 1920, the photos had reached Sir Arthur Conan Doyle, the author of the Sherlock Holmes stories. Doyle believed in spirits, and he published the photos in a popular magazine as proof that fairies were real. Experts who examined the prints said they showed no sign of double exposure. Thousands of readers were convinced.',
      { box: 'A word for it', text: '<b>Confirmation bias</b> is our habit of noticing and trusting information that matches what we already believe, and ignoring what does not. Everyone has it, so everyone needs to check.' },
      { h: 'The truth comes out' },
      'In 1983, the cousins, now elderly women, finally admitted the truth. Elsie had copied fairies from a children’s book, cut them out of cardboard and held them in place with hatpins. She said they had kept the secret because a famous man had believed them, and they felt foolish. Frances insisted to the end that the fifth photo was real.',
      { h: 'Why it still matters' },
      'It is easy to laugh at the people who were fooled. But Doyle made the same mistakes we can make today. He wanted the photos to be true, so he looked for experts who agreed with him. He trusted a picture because it seemed like hard evidence. Today, anyone can edit a photo or create a fake one with a few taps. Before you believe or share an image, ask who made it, why, and what other <b>credible</b> sources say. Your strong feelings about a picture are a signal to slow down, not to speed up.'
    ],
    guide: { before: 'Show the photo and ask: is it real? How could you tell? Teach <b>credible</b> and <b>confirmation bias</b>. Read the five steps in the flow chart together.',
      after: 'Find a viral photo or video you have seen recently. Walk through the five steps. What would you check first?' },
    words: [['credible', 'able to be trusted or believed'], ['confirmation bias', 'trusting information that matches what you already believe']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Doyle believe the photos?',
        opts: ['He took them himself.', 'He already believed in spirits and wanted them to be real.', 'Elsie’s father told him to.', 'He had seen fairies before.'], a: 1 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> felt foolish.” <b>They</b> refers to …',
        opts: ['the experts', 'the readers', 'Elsie and Frances', 'the fairies'], a: 2 },
      { k: 'lines', code: 'A2.3', n: 3, q: 'Use the flow chart. Which step would have helped Doyle most? Explain.',
        a: 'Asking what other reliable sources say. Doyle only listened to experts who agreed with him. Asking a photographer or Elsie’s father would have shown the fairies were cut-outs.', look: 'names one step from the chart and links it to Doyle’s mistake' },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Year', 'What happened'],
        rows: [['1917', null], ['1920', null], ['1983', null]],
        a: [[null, 'Elsie and Frances took the first fairy photos.'], [null, 'Doyle published the photos as proof fairies were real.'], [null, 'The cousins admitted the fairies were cardboard.']] },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Doyle wrote the Sherlock Holmes stories, about a detective who notices every clue. Why is it ironic that Doyle was fooled?',
        a: 'It is ironic because he invented a detective famous for spotting tricks, yet he missed the obvious clue that the fairies were cardboard.', look: 'explains the gap between what we would expect (a clever detective writer) and what happened (he was fooled)' },
      { k: 'choice', code: 'B3.3', q: 'Why is <i>Sherlock Holmes</i> written with capital letters?',
        opts: ['It starts a sentence.', 'It is the name of a character.', 'It is a title of a magazine.', 'It is an important idea.'], a: 1 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Think about the last time you saw a surprising post online. Which of the five steps did you use? Which one will you try next time, and why?',
        a: 'I usually just look at who posted it. Next time I will also check other sources, because a post can look real even when it is not.', look: 'honest reflection on their own thinking and a specific goal' }
    ]
  });

  P.add({
    id: 'g8-chinese-railway', subject: 'history', form: 'Report',
    title: 'Who Built the Railway?',
    deck: 'The photo of the last spike shows a crowd of men in hats. It leaves out the workers who built the hardest part.',
    hero: {
      photo: 'g8-last-spike.jpg', credit: 'Photo: Alexander Ross, 1885, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 210,
      cap: 'Donald Smith drives the last spike of the Canadian Pacific Railway at Craigellachie, British Columbia, on November 7, 1885.'
    },
    body: [
      'On a cold November morning in 1885, a crowd gathered in the mountains of British Columbia. A railway director named Donald Smith picked up a hammer and drove an iron spike into the last tie of the Canadian Pacific Railway. The line now stretched from Montréal to the Pacific. A photographer captured the moment, and the photo became one of the most famous images in Canadian history.',
      { fig: bars([[50, '1885'], [100, '1900'], [500, '1903']], { max: 500, step: 100, pre: '$' }),
        tall: 172, cap: 'The head tax each Chinese immigrant had to pay to enter Canada.' },
      { h: 'Missing from the picture' },
      'Look closely, and you will notice who is not there. About 15 000 Chinese workers helped build the railway through British Columbia, the most dangerous part of the route. They blasted tunnels with explosives, carved ledges into cliffs and laid track through canyons. Chinese labourers were paid about one dollar a day, roughly half what other workers earned, and they had to buy their own food and gear. At least 600 died from accidents, disease and cold. Their names were rarely recorded.',
      { h: 'Thanks, then a tax' },
      'Once the railway was finished, the government no longer wanted Chinese workers. In 1885, the same year the last spike was driven, it passed a law forcing every Chinese immigrant to pay a <b>head tax</b> of $50 to enter Canada. No other group had to pay. The tax rose to $500 by 1903, about two years of a worker’s wages. In 1923, a new law banned almost all Chinese immigration until 1947. Many men who had built the railway could not afford to bring their wives and children to Canada.',
      { box: 'An apology', text: 'In 2006, the Prime Minister apologized in the House of Commons for the head tax and the laws that kept Chinese families apart.' },
      'The head tax was a clear case of <b>discrimination</b>, written into law. Chinese Canadian families paid about 23 million dollars in head taxes. Today, historians try to tell the whole story. A photograph records one moment, but it also reflects the choices of the people who arranged it.'
    ],
    guide: { before: 'Show a map of the railway route from Montréal to Vancouver and point to the mountains of British Columbia. Teach <b>head tax</b> and <b>discrimination</b>. Look at the photo: who do you see?',
      after: 'If you could add one image to a textbook page about the railway, what would it show, and why?' },
    words: [['head tax', 'a fee charged to each person; Canada charged it only to Chinese immigrants'], ['discrimination', 'treating a group of people unfairly because of who they are']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What point does the bar graph make most clearly?',
        opts: ['The head tax went up ten times in 18 years.', 'Many workers died.', 'The railway was long.', 'Workers earned a dollar a day.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the government create the head tax right after the railway was finished?',
        opts: ['to pay for more railways', 'because it no longer wanted Chinese workers to come', 'to thank Chinese workers', 'because all immigrants paid it'], a: 1 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The famous photo shows only one group of people. Whose perspective does it leave out, and how could the photo give a biased view of history?',
        a: 'It leaves out the Chinese workers who built the hardest part. It could make people think the railway was built only by the men in the photo.', look: 'names the missing group and explains how leaving them out shapes what viewers believe' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart.', cols: ['Year', 'What happened to Chinese Canadians'],
        rows: [['1885', null], ['1923', null], ['2006', null]],
        a: [[null, 'A $50 head tax was charged to every Chinese immigrant.'], [null, 'A law banned almost all Chinese immigration.'], [null, 'The Prime Minister apologized.']] },
      { k: 'choice', code: 'B2.2', q: 'Which word from the text means the same as <b>workers</b>?',
        opts: ['labourers', 'directors', 'immigrants', 'historians'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does the text show that the head tax was unfair? Give two pieces of evidence.',
        a: 'No other group had to pay it, and it rose to $500, about two years of wages. It also kept families apart.', look: 'two facts from the text that show unequal treatment' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Why might someone choose to read this text instead of a short encyclopedia entry about the railway? Give two reasons.',
        a: 'It tells a part of the story often left out, and it explains why the photo does not show everyone. It would help someone research Chinese Canadian history.', look: 'two purposes for reading that fit this text' }
    ]
  });

  P.add({
    id: 'g8-maple-ratio', subject: 'math', form: 'Explanation',
    title: 'Forty Buckets for One',
    deck: 'Making maple syrup is a lesson in ratios, patience and boiling',
    hero: {
      photo: 'g8-sap-buckets.jpg', credit: 'Photo: United States Department of Agriculture, public domain, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'Metal sap buckets hang from taps in maple trees in early spring. Each tap may drip 40 litres of sap in a good season.'
    },
    body: [
      'Taste the sap that drips from a sugar maple in March and you might be disappointed. It looks like water and tastes only faintly sweet. That is because sap is about 98 percent water and only about 2 percent sugar. To turn it into syrup, producers must boil away almost all of that water, and the amount of sap they need follows a simple <b>ratio</b>.',
      { fig: '<path class="k" d="M20 50 H290 M20 116 H290"/>' + [0, 1, 2, 3, 4].map(function (i) { var x = 20 + i * 67.5; return '<path class="t" d="M' + x + ' 44 V56 M' + x + ' 110 V122"/>' + tx(x, 38, 'lb', num(i * 40), 'middle') + tx(x, 140, 'lb', i, 'middle'); }).join('') +
          tx(20, 16, 'n', 'litres of sap') + tx(20, 160, 'n', 'litres of syrup') + D.arrow(87.5, 60, 87.5, 104, 'a'),
        tall: 166, cap: 'A double number line for a 40 to 1 ratio of sap to syrup.' },
      { box: 'Freeze, then thaw', text: 'Sap flows best when nights fall below 0°C and days rise above it. The changing temperature builds up pressure inside the tree that pushes the sap out through the tap.' },
      { h: 'Forty to one' },
      'For sap that is 2 percent sugar, it takes about 40 litres of sap to make 1 litre of syrup. We can write this ratio as 40:1. Because the ratio stays the same, we can use it to plan. If a family collects 200 litres of sap, they divide by 40 and expect about 5 litres of syrup. If they want 12 litres of syrup for gifts, they multiply: 12 × 40 = 480 litres of sap. A large sugarbush with 1000 taps might collect 40 000 litres in a season, enough for about 1000 litres of syrup. The two amounts grow together in <b>proportion</b>.',
      { h: 'When the sugar changes' },
      'Sap is not always 2 percent sugar. Trees in a sunny spot, or a cold early spring, can give sweeter sap. Producers use a shortcut called the Rule of 86: divide 86 by the percent of sugar to find how many litres of sap make one litre of syrup. For sap that is 2 percent sugar, 86 ÷ 2 = 43, close to our 40. For sweeter, 3 percent sap, 86 ÷ 3 is less than 29. Sweeter sap saves fuel and hours of boiling.',
      { h: 'An old knowledge' },
      'Long before Europeans arrived, Anishinaabe and Haudenosaunee peoples collected maple sap in birchbark containers and boiled it down into sugar, a food that lasted all year. Some communities made a cut in the bark and guided the sap into a container with a wooden spout. The sugarbush season remains an important time for many First Nations families, a time for gathering, teaching and sharing food. Today, Canada produces about 70 percent of the world’s maple syrup, most of it in Quebec.'
    ],
    guide: { before: 'Review ratio language (“for every 40 litres of sap, 1 litre of syrup”). Teach <b>ratio</b> and <b>proportion</b>. Fill in the double number line together before reading the second section.',
      after: 'Would you rather tap trees with 2 percent sap or 3 percent sap? Use the Rule of 86 to explain the difference in work.' },
    words: [['ratio', 'a comparison of two amounts, such as 40 to 1'], ['proportion', 'two amounts that change together so their ratio stays the same']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Use the 40:1 ratio to complete the chart.', cols: ['Litres of sap', 'Litres of syrup'],
        rows: [['200', null], [null, '12'], ['1000', null]],
        a: [[null, '5'], ['480', null], [null, '25']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'On the double number line, the arrow joins …',
        opts: ['40 litres of sap and 1 litre of syrup', '0 and 0', '160 and 4', 'two kinds of trees'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Sap is about 98 percent water and only <b>faintly</b> sweet.” Faintly means …',
        opts: ['very', 'slightly', 'never', 'quickly'], a: 1 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The Rule of 86 paragraph has many numbers. What strategy would help you understand it? Try it, then explain the rule in your own words.',
        a: 'I would reread slowly and work out each division myself. The rule says to divide 86 by the sap’s sugar percent to find how many litres of sap make one litre of syrup.', look: 'a strategy (reread, calculate, make a table) and a correct explanation of the rule' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is complex: it has a main idea and a part that begins with <i>if</i>, <i>because</i> or <i>when</i>?',
        opts: ['Sap is not always 2 percent sugar.', 'Sap flows best when nights fall below 0°C.', 'We can write this ratio as 40:1.', 'Taste the sap that drips from a sugar maple.'], a: 1 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why do you think the writer included the section “An old knowledge” in a math text?',
        a: 'To show that First Nations peoples created maple sugar long before Europeans, and that the sugarbush is still an important part of their culture. The math has a history.', look: 'a reason linked to culture and history, not only to math' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize how a producer uses ratios to plan a maple season.',
        a: 'The producer measures the sugar in the sap and uses the ratio (such as 40:1, or the Rule of 86) to work out how much sap is needed for the syrup they want.', look: 'mentions the ratio, measuring sugar, and planning sap or syrup amounts' }
    ]
  });

  P.add({
    id: 'g8-the-save', subject: 'story', form: 'Short story', plain: true,
    title: 'The Save Nobody Saw',
    deck: 'A goalie tells you exactly what happened in the championship game. Or does he?',
    hero: {
      photo: 'g8-goalie.jpg', credit: 'Photo: The AHL, CC BY 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'A goalie drops to his knees to block a low shot.'
    },
    body: [
      'Let me tell you what really happened, because the newspaper got it wrong.',
      { fig: '<path class="k" d="M10 20 H290 M10 20 V140 M290 20 V140"/><path class="d" d="M10 120 H290"/><path class="a" d="M120 20 V8 H180 V20"/><path class="k" d="M118 20 A32 32 0 0 0 182 20"/>' +
          D.arrow(70, 100, 132, 40, 'k') + D.arrow(136, 38, 214, 38, 'a') + '<circle class="dot" cx="70" cy="104" r="4"/><circle class="dot" cx="218" cy="38" r="4"/>' +
          tx(20, 112, 'n', 'Tariq carries the puck') + tx(222, 56, 'n', 'number 9') + tx(150, 72, 'n', 'crease', 'middle') + tx(220, 134, 'n', 'blue line'),
        tall: 150, cap: 'The play that tied the game. Each arrow shows where the puck went.' },
      'We were up 2–1 with three minutes left in the city final. I had made thirty-one saves. Coach Reyes said later it was the best game of my life, and I am not one to <b>brag</b>, but he was right. My defence, on the other hand, was having a nap.',
      'With two minutes left, Tariq Hassan from the Westside Wolves carried the puck over our blue line. Our defenceman, Owen, fell over his own skates. I told him afterward that I could not do everybody’s job, and he said nothing, which shows you he knew it was his fault.',
      'Tariq moved to my left. I was ready for the shot. Then he passed it across to number 9, who was all alone at the right side of the net. I slid over, and I swear I had my pad on that puck. The referee was <b>out of position</b>. If you were watching from the stands, you could not have seen it either, so ignore anyone who says otherwise.',
      'The game went to overtime. I will not bore you with the details, except that the winning goal took a strange bounce off Owen’s stick and went in past me. Nobody could have stopped it.',
      'Afterward, people kept coming up to Owen to tell him it was not his fault, which was strange, since nobody came up to me. His dad even hugged him. I guess some people need more help with their feelings.',
      'In the dressing room, everyone was quiet. Owen sat beside me and said, “Good game, Dev. You kept us in it.” I told him thanks. I did not mention that he had cost us the championship twice, because I am a good teammate.',
      'On the bus home, I sat at the back and listened to music with my eyes closed so nobody would bother me. Coach Reyes sat down beside me anyway. He said a goalie’s job is to stop the puck, not to count other people’s mistakes. I nodded so he would leave.',
      'The next morning, the paper said I had “left the far side open” on the tying goal. My little sister cut the article out and stuck it on the fridge. I have not looked at it. I do not need to. I was there.',
      'Next year I will make sure we have a better defence. Mom says I should start by watching the video of the game with Owen. Maybe I will. Maybe.'
    ],
    guide: { before: 'Explain that a narrator can be <b>unreliable</b>: the reader cannot fully trust their version of events. Ask the child to underline every sentence where Dev blames someone else.',
      after: 'Why does Dev refuse to look at the article or watch the video? What would you say to him?' },
    words: [['brag', 'to talk proudly about yourself to impress others'], ['out of position', 'not in the right place to see or to act']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'What point of view is this story told from?',
        opts: ['first person, by Dev', 'third person, all-knowing', 'second person', 'first person, by Owen'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Owen say nothing when Dev blamed him?',
        opts: ['He knew it was his fault.', 'He may have been upset or chose not to argue.', 'He did not hear Dev.', 'He was angry at the referee.'], a: 1 },
      { k: 'lines', code: 'C1.6', n: 3, q: 'Dev is an unreliable narrator. Give two clues from the story that show we cannot fully trust him.',
        a: 'He says “I am not one to brag” and then brags. He says the newspaper is wrong but refuses to read it, and he claims nobody in the stands could have seen the goal.', look: 'two specific clues where his words contradict his actions or the evidence' },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the diagram. Which side of the net was open on the tying goal? Does the diagram support Dev or the newspaper?',
        a: 'The right side was open, where number 9 was alone. It supports the newspaper, because Dev was on the left side when the pass went across.', look: 'reads the diagram correctly and connects it to the newspaper’s claim' },
      { k: 'choice', code: 'C3.1', q: '“I did not mention that he had cost us the championship twice, because I am a good teammate.” Why is this sentence ironic?',
        opts: ['Dev is blaming Owen while claiming to be kind.', 'Dev really is a good teammate.', 'Owen scored twice.', 'Dev is joking with Owen.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The story ends with “Maybe I will. Maybe.” What do these short sentences show about Dev?',
        a: 'They show Dev is starting to doubt himself. The repeated “maybe” shows he is unsure and might be ready to admit his mistake.', look: 'links the short, repeated sentence to a change or doubt in Dev' },
      { k: 'lines', code: 'D2.4', n: 4, q: 'Rewrite the moment of the tying goal from Owen’s point of view, in 3 or 4 sentences.',
        a: 'Answers will differ. For example: I lost an edge at the blue line and went down hard. By the time I got up, Tariq had passed across. Dev was hugging the left post, and number 9 had the whole right side. I felt sick.', look: 'first person as Owen, consistent with the events and the diagram, with Owen’s feelings' }
    ]
  });

  P.add({
    id: 'g8-water-treatment', subject: 'science', form: 'Explanation',
    title: 'From Lake to Tap',
    deck: 'Turning lake water into drinking water takes five careful steps',
    hero: {
      photo: 'g8-rc-harris.jpg', credit: 'Photo: Richard Kang, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The R. C. Harris Water Treatment Plant in Toronto opened in 1941 on the shore of Lake Ontario. It is so grand that people call it the Palace of Purification.'
    },
    body: [
      'Turn on a tap in Toronto and the water you drink was in Lake Ontario a day or two earlier. Lake water looks clear, but it carries mud, algae, bacteria and viruses that can make people sick. Before it reaches your glass, it travels through a treatment plant that removes them in a series of steps.',
      { fig: flow(['Intake pipe and screens', 'Coagulation: particles clump into floc', 'Settling: floc sinks to the bottom', 'Filters of sand and gravel', 'Chlorine kills germs', 'Clean water pumped to homes']),
        tall: 228, cap: 'The main steps in a water treatment plant.' },
      { h: 'Catching the dirt' },
      'Water enters through a long pipe far out in the lake, where it is cleaner. Screens stop fish, weeds and garbage. Next, workers add a chemical called a <b>coagulant</b>. It makes tiny particles of mud and algae stick together in larger clumps, called floc. In big, calm tanks, the heavy floc slowly sinks to the bottom and is removed.',
      { h: 'Filtering and disinfecting' },
      'The water then trickles down through deep beds of sand and gravel, which trap smaller particles. It is now very clear, but it may still carry germs too small to see. To kill them, the plant adds a carefully measured dose of chlorine. A little chlorine stays in the water as it travels through kilometres of pipes, protecting it until it reaches your tap. Scientists test samples every day. If a test fails, the plant can stop sending water out until the problem is fixed.',
      { box: 'Walkerton, 2000', text: 'In May 2000, E. coli bacteria from farm runoff got into the drinking water of Walkerton, Ontario. Seven people died and about 2300 became ill. The water had not been properly treated or tested. Ontario now has much stricter rules for drinking water.' },
      'Clean water from the tap is one of the most important health inventions in history. Diseases such as cholera and typhoid, once common in Canadian cities, almost disappeared once cities began to filter and <b>disinfect</b> their water. Yet safe tap water is not shared equally. Some First Nations communities in Canada have lived under boil-water advisories for years, because their treatment plants were too small, broken or never built. Clean water depends on good science, and also on fair decisions about who gets it.'
    ],
    guide: { before: 'Ask where the child’s tap water comes from. Teach <b>coagulant</b> and <b>disinfect</b>. Trace the flow chart from top to bottom, then read.',
      after: 'Why do you think some communities in Canada still have boil-water advisories? What would it be like to live with one?' },
    words: [['coagulant', 'a chemical that makes small particles clump together'], ['disinfect', 'to kill germs']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps in the order they happen at the plant.',
        items: ['Screens catch fish and weeds.', 'A coagulant makes particles clump.', 'Floc settles to the bottom.', 'Sand and gravel filter the water.', 'Chlorine kills germs.'], show: [3, 0, 4, 2, 1] },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why does the writer use a flow chart?',
        opts: ['to show steps in order', 'to compare two plants', 'to show a timeline of history', 'to give a definition'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>dis</b>infect, the prefix <b>dis-</b> means …',
        opts: ['remove or undo', 'again', 'before', 'very'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the plant leave a little chlorine in the water after it leaves? Use evidence from the text.',
        a: 'The water travels through kilometres of pipes, and germs could get in on the way. The leftover chlorine keeps protecting it until it reaches the tap.', look: 'the reason (long trip through pipes) and the protective effect' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Connect the Walkerton box to the rest of the text. What does it show about why each step matters?',
        a: 'It shows what happens when water is not properly treated and tested. People died, so steps like disinfecting and daily testing save lives.', look: 'a clear link between the box and the importance of treatment steps' },
      { k: 'choice', code: 'B3.2', q: '“The heavy floc <b>slowly</b> sinks to the bottom.” The word <b>slowly</b> is …',
        opts: ['an adverb telling how it sinks', 'an adjective describing the floc', 'a noun', 'a verb'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which helped you more to understand this text: the flow chart or the paragraphs? Explain, and name one thing you will do next time you read a science text.',
        a: 'The flow chart helped more because I could see all the steps at once. Next time I will look at diagrams first to get the big picture before reading.', look: 'a reflection on which strategy or feature helped, and a goal for next time' }
    ]
  });

  P.add({
    id: 'g8-water-walkers', subject: 'social', form: 'Profile',
    title: 'Walking for the Water',
    deck: 'An Anishinaabe grandmother carried a copper pail of water around all five Great Lakes',
    hero: {
      photo: 'g8-lake-superior.jpg', credit: 'Photo: U.S. Fish and Wildlife Service, CC BY 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'The shore of Lake Superior. In 2003, Josephine Mandamin and a group of women walked all the way around this lake, the largest of the Great Lakes.'
    },
    body: [
      'In the spring of 2003, Josephine Mandamin set out from the shore of Lake Superior carrying a copper pail full of water. She was a grandmother from Wiikwemkoong, an Anishinaabe community on Manitoulin Island. Behind her walked a small group of women. They planned to walk all the way around the lake, and Josephine would not set the pail down until they were finished.',
      { fig: timeline([[2003, 'Lake', 'Superior'], [2004, 'Lake', 'Michigan'], [2005, 'Lake', 'Huron'], [2006, 'Lake', 'Ontario'], [2007, 'Lake', 'Erie']], 2002.6, 2007.4),
        tall: 128, cap: 'Josephine Mandamin’s walks around the Great Lakes, one lake each spring.' },
      { box: 'Water is life', text: 'Water walkers often carry this message: <i>Nibi</i>, the Anishinaabemowin word for water, gives life to every living thing, and everyone shares the duty to <b>protect</b> it.' },
      { h: 'A responsibility to the water' },
      'In the Anishinaabe teachings that Josephine shared, water is alive and <b>sacred</b>, and women carry a special responsibility to protect it. She had become worried about the pollution in the Great Lakes, which hold about one fifth of the fresh surface water on Earth. An Elder had asked her what she was going to do about it. Her answer was to walk, and to pray for the water with every step.',
      { h: 'Thousands of kilometres' },
      'The walk around Lake Superior took weeks. The women walked in turns, passing the pail and an eagle staff from hand to hand, rising before dawn and walking in rain, heat and black-fly season. Over the next four springs, they circled Lake Michigan, Lake Huron, Lake Ontario and Lake Erie. Along the way, people from many nations joined them for a day or a week. By the end of her life, Josephine had walked more than 17 000 kilometres for the water.',
      { h: 'Passing it on' },
      'Josephine died in 2019, but the walks did not stop. Her grandniece, Autumn Peltier, began speaking about clean water when she was eight years old. At thirteen, Autumn addressed world leaders at the United Nations, reminding them that many First Nations communities in Canada cannot safely drink their own tap water. In 2019, she was named Chief Water Commissioner for the Anishinabek Nation.',
      'Today, Water Walks take place across Turtle Island. Walkers say the most important step is the first one: deciding that the water is worth the effort.'
    ],
    guide: { before: 'Locate Manitoulin Island and the five Great Lakes on a map. Explain that Turtle Island is a name many Indigenous peoples use for North America. Teach <b>sacred</b> and <b>protect</b>. This text shares teachings respectfully as Josephine described them; it is not a sacred story.',
      after: 'Josephine chose walking as her answer. What makes an action like this powerful, even though it does not clean the water directly?' },
    words: [['sacred', 'deeply respected and treated with care because it is holy or precious'], ['protect', 'to keep safe from harm']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Josephine never set down the pail of water?',
        opts: ['It was too heavy to lift again.', 'It showed her constant care and respect for the water.', 'Someone might steal it.', 'The rules of the race said so.'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the timeline show?',
        opts: ['how long each walk took', 'the order in which the five lakes were walked', 'how far she walked', 'when Autumn spoke at the UN'], a: 1 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two Anishinaabe cultural elements described in the text. Why are they important to the meaning of the walks?',
        a: 'The copper pail of water and the eagle staff carried from hand to hand. They show that the walk is a prayer and a ceremony, not just exercise.', look: 'two cultural elements (pail, eagle staff, teachings about women and water, the word Nibi) and their meaning' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize Josephine Mandamin’s work and how it continues today.',
        a: 'Josephine walked around all five Great Lakes carrying water to pray for it and raise awareness of pollution. After she died, her grandniece Autumn Peltier and other water walkers carried on her work.', look: 'her action, her purpose, and how it continues' },
      { k: 'choice', code: 'C1.1', q: '“The women walked in turns, passing the pail and an eagle staff from hand to hand.” Why did they walk “in turns”?',
        opts: ['so that the walk could keep going all day while each person rested', 'because they disagreed', 'to make the walk a race', 'because the pail was empty'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'How does Autumn Peltier’s work connect to Josephine’s? How are they different?',
        a: 'Both work to protect water and share the same teachings. Josephine walked and prayed, while Autumn speaks to leaders, such as at the United Nations.', look: 'one connection and one difference, with details' },
      { k: 'lines', code: 'A3.3', n: 3, q: 'What does this text teach about the relationship between Anishinaabe people and water?',
        a: 'It teaches that water is seen as alive and sacred, and that people, especially women, have a responsibility to care for it, not just use it.', look: 'the idea of relationship and responsibility, not only use' }
    ]
  });

  P.add({
    id: 'g8-clean-water', subject: 'geography', form: 'Report',
    title: 'The Long Walk for Water',
    deck: 'Billions of people still cannot turn on a tap for safe water. Who carries the load?',
    hero: {
      photo: 'g8-water-pump.jpg', credit: 'Photo: Ferdinand Reus, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 42%',
      tall: 210,
      cap: 'A girl pumps water at a well in Mali, in West Africa. A well like this can serve hundreds of families.'
    },
    body: [
      'For most Canadians, safe water is as close as the kitchen sink. Yet around the world, about 2.2 billion people do not have safely managed drinking water at home. That is more than one person in four. Many of them must walk to a well, a river or a pump every day and carry the water home.',
      { h: 'Who carries the water?' },
      'In homes without a water supply, women and girls do most of the collecting. A full 20-litre container weighs 20 kilograms. Some girls make the trip several times a day, which can take hours. That is time they cannot spend in school, and the heavy loads can damage their backs and necks. Water that is collected from an open source, such as a river or a pond, may also carry diseases such as cholera. Families who cannot afford fuel to boil it have little choice but to drink it as it is.',
      { h: 'What changes when water is close' },
      'When a community gets a protected well or a tap nearby, life changes quickly. Fewer children get sick, so they miss less school. Girls who no longer spend hours collecting water are more likely to stay in class. Families can water a garden, keep animals and start small businesses. Mothers who once spent hours walking can take paid work. Even the village school can open a washroom with running water, which helps older girls attend all year. Geographers use measures like these to compare <b>quality of life</b> between countries.',
      'Clean water is one of the United Nations’ Sustainable Development Goals: safe water for everyone by 2030. Reaching that goal takes money, engineers and pumps, but also local people who know how to repair them. A well that breaks and cannot be fixed helps no one. That is why many projects now train a local committee, often led by women, to collect a small fee from each family and keep spare parts on hand.',
      { fig: (function () { var s = ''; for (var i = 0; i < 10; i++) { var x = 22 + i * 27, c = i < 3 ? 'h' : 'k'; s += '<circle class="' + c + '" cx="' + x + '" cy="40" r="8"/><path class="' + c + '" d="M' + (x - 10) + ' 96 V64 Q' + x + ' 50 ' + (x + 10) + ' 64 V96 Z"/>'; } return s; })() +
          tx(22, 124, 'n', '3 out of 10 people: no safe water at home') + tx(22, 140, 'n', '7 out of 10 people: safe water at home'),
        tall: 148, cap: 'About 3 in 10 people worldwide (hatched) do not have safe drinking water at home.' },
      { box: 'Here at home', text: 'Water <b>inequality</b> exists in Canada too. Since 2015, more than 140 long-term drinking water advisories on First Nations reserves have been lifted, but some communities are still waiting for safe tap water.' }
    ],
    guide: { before: 'Fill a 4-litre jug and let the child carry it across the room, then imagine five of them. Teach <b>quality of life</b> and <b>inequality</b>. Count the figures in the pictograph.',
      after: 'Why do you think long-term water advisories still exist in a wealthy country like Canada? Who should be responsible for fixing them?' },
    words: [['quality of life', 'how healthy, safe and comfortable people’s lives are'], ['inequality', 'an unfair difference between groups of people']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'The pictograph shows that …',
        opts: ['3 in 10 people have no safe water at home', 'everyone has safe water', 'girls carry 3 litres', 'there are 10 wells'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might a girl who collects water miss school?',
        opts: ['Collecting water can take hours each day.', 'Schools do not allow girls.', 'She does not like school.', 'Water makes her tired of reading.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart of effects.', cols: ['When water is close …', 'Effect'],
        rows: [['Fewer children get sick.', null], ['Girls spend less time carrying water.', null], ['Families have extra water.', null]],
        a: [[null, 'They miss less school.'], [null, 'They are more likely to stay in class.'], [null, 'They can grow gardens, keep animals or start businesses.']] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The text says women and girls do most of the collecting. How does this make water access a question of fairness? Use evidence.',
        a: 'Because girls lose hours of school time and hurt their bodies carrying water, the lack of water affects them more than boys, which is unfair.', look: 'links gender, time, school and health to fairness' },
      { k: 'choice', code: 'B3.3', q: 'Why does the writer use a colon in “one of the United Nations’ Sustainable Development Goals: safe water for everyone by 2030”?',
        opts: ['to introduce an explanation of the goal', 'to separate two lists', 'to show a quotation', 'to end the sentence'], a: 0 },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What do you already know about drinking water in Canada, from school or your own life, that helps you understand the box?',
        a: 'I learned that some First Nations communities have to boil their water for years. That helped me understand that “long-term advisories” means people could not safely drink tap water.', look: 'specific prior knowledge linked to the box' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'The last paragraph says “A well that breaks and cannot be fixed helps no one.” Predict what a successful water project would need. Does the text support your prediction?',
        a: 'It would need local people trained to repair the pump. Yes, the text says reaching the goal takes local people who know how to repair the pumps.', look: 'a reasonable prediction confirmed or adjusted using the final paragraph' }
    ]
  });

  P.add({
    id: 'g8-klondike', subject: 'history', form: 'Diary (historical fiction)', plain: true,
    title: 'Up the Golden Stairs',
    deck: 'The diary of a young stampeder on the way to the Klondike, 1898. The writer is invented; the facts are real.',
    hero: {
      photo: 'g8-chilkoot.jpg', credit: 'Photo: 1898, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'Stampeders and their supplies at the Scales, below the summit of the Chilkoot Pass, in 1898. The line of climbers on the right is the “Golden Stairs.”'
    },
    body: [
      '<i>March 3, 1898. Dyea, Alaska.</i> Uncle Will and I landed this morning from Seattle with two thousand others, every one of them talking gold. Last summer a steamship arrived in Seattle carrying a ton of it from the Klondike River in Canada, and half the country seems to have quit work to follow. The gold was found by Skookum Jim, a Tagish man, with his nephew Dawson Charlie and George Carmack. Everyone here wants to be next.',
      { fig: '<path class="k" d="M10 140 L80 120 L130 96 L160 60 L176 30 L190 34 L230 70 L290 90"/>' +
          '<circle class="dot" cx="10" cy="140" r="4"/><circle class="dot" cx="160" cy="60" r="4"/><circle class="dot" cx="176" cy="30" r="4"/><circle class="dot" cx="290" cy="90" r="4"/>' +
          tx(14, 158, 'n', 'Dyea, sea level') + tx(150, 78, 'n', 'the Scales', 'end') + tx(182, 22, 'lb', 'Summit, 1067 m') + tx(286, 110, 'n', 'Lake Bennett', 'end') +
          D.label(60, 70, 'Golden Stairs', 168, 46),
        tall: 166, cap: 'The Chilkoot Trail climbs from the sea to the summit in about 26 kilometres.' },
      '<i>March 19. Sheep Camp.</i> The North-West Mounted Police will not let anyone into Canada without a year’s food and gear, about a <b>tonne</b> of supplies each. We cannot carry it all at once, so we carry a load ahead, leave it in a <b>cache</b> and walk back for more. Uncle Will counts thirty trips to move our pile to the top.',
      '<i>March 26. The Scales.</i> Today I climbed the Golden Stairs: fifteen hundred steps cut into the ice, so steep my nose nearly touched the boots of the man above. If you step out of line to rest, it can take hours to find a gap to get back in. At the summit, the Mounties weighed our goods and collected duty. I have never been so cold or so proud.',
      '<i>March 30. The summit.</i> Our whole outfit is finally at the top. Some men here have given up and are selling their supplies for whatever they can get. Others pay Tlingit packers to carry their loads. The packers know this trail better than anyone, and they charge by the pound. Uncle Will says they are the only people getting rich on the Chilkoot. I believe him.',
      '<i>April 3.</i> A great avalanche buried the trail near Sheep Camp. Men dug for hours. Many were lost. Nobody talks of gold tonight.',
      '<i>May 29. Lake Bennett.</i> The ice is breaking up, and thousands of us have built boats from green lumber. Tomorrow we race 900 kilometres down the Yukon River to Dawson City. Uncle Will says most of the good claims were staked a year ago. I think I came for the adventure, not the gold. Still, when I close my eyes I see that line of men on the ice, black against the snow, and I know I will tell my children I was one of them.'
    ],
    guide: { before: 'Explain historical fiction: an invented narrator in a real setting. Show Dyea, the Chilkoot Pass and Dawson City on a map. Teach <b>cache</b> and <b>tonne</b>. Trace the trail profile with a finger.',
      after: 'The Klondike Gold Rush changed the lives of the Hän and Tagish peoples who already lived there. Whose diary is missing from this story, and what might it say?' },
    words: [['cache', 'a hidden store of supplies'], ['tonne', '1000 kilograms']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Why is this text called historical fiction?',
        opts: ['It is set in a real time and place but the writer is invented.', 'Everything in it is made up.', 'It was written in 1898.', 'It is a science report.'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'How is the diary organized?',
        opts: ['by dates and places', 'by problem and solution', 'by compare and contrast', 'alphabetically'], a: 0 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Use the trail profile. Why did the climb from the Scales to the summit take so long?',
        a: 'The line rises very steeply between the Scales and the summit, which is 1067 metres high, so climbers had to go slowly up icy steps with heavy loads.', look: 'uses the steep part of the drawing and a detail from the diary' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How do the narrator’s feelings change between March 3 and May 29? Use evidence.',
        a: 'At first he is excited about gold like everyone else. By the end, after the hard climb and the avalanche, he says he came for the adventure, not the gold.', look: 'a change from one feeling to another, with dates or quotations' },
      { k: 'choice', code: 'C1.5', q: '“So steep my nose nearly touched the boots of the man above.” This detail mainly helps the reader …',
        opts: ['picture how steep and crowded the climb was', 'learn the man’s name', 'understand the price of boots', 'know the date'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Some words in this diary may be unfamiliar, such as <i>duty</i> or <i>claims</i>. Choose one. How could you work out its meaning?',
        a: 'Claims: I would reread the sentence. “Good claims were staked” suggests a claim is a piece of land a miner marks as their own. I could check a dictionary to confirm.', look: 'a word, a strategy (context, reread, dictionary) and a sensible meaning' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'This diary is written by a stampeder from the south. Whose perspective is missing, and why does it matter?',
        a: 'The perspective of the Tagish and Hän peoples who lived there is missing. The rush brought thousands of strangers onto their land, which changed their lives.', look: 'names an Indigenous perspective and explains why it matters' }
    ]
  });

  P.add({
    id: 'g8-throat-singing', subject: 'arts', form: 'Report',
    title: 'A Game of Breath',
    deck: 'Inuit throat singing began as a contest between friends. Today it fills concert halls.',
    hero: {
      photo: 'g8-throat-singing.jpg', credit: 'Photo: Rudolf H. Boettcher, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 30%',
      tall: 210,
      cap: 'Two Inuit throat singers perform face to face, as the tradition requires, holding each other’s arms.'
    },
    body: [
      'Two women stand face to face, so close their noses almost touch. One begins a low, rhythmic sound, half breath and half voice. The other answers, filling the gaps in the first singer’s pattern. The sounds weave together so tightly that it is hard to tell which singer is making which. This is <b>katajjaq</b>, Inuit throat singing.',
      { fig: '<path class="k" d="M40 40 H290 M40 100 H290"/>' + tx(36, 44, 'n', 'singer 1', 'end') + tx(36, 104, 'n', 'singer 2', 'end') +
          [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var x = 52 + i * 30; return (i % 2 ? '<path class="h" d="M' + x + ' 100 v-20 h18 v20"/>' : '<path class="h" d="M' + x + ' 40 v-20 h18 v20"/>') + (i % 2 ? '<path class="t" d="M' + x + ' 40 h18"/>' : '<path class="t" d="M' + x + ' 100 h18"/>'); }).join('') +
          tx(165, 130, 'n', 'Each singer sounds in the other’s silence.', 'middle'),
        tall: 140, cap: 'The pattern of sounds in katajjaq. The singers take turns so fast they seem to sing as one.' },
      { box: 'Who sings?', text: 'Katajjaq is traditionally performed by women. In some communities today, men also throat sing, but many singers stress that respecting the tradition matters.' },
      { h: 'A contest of skill' },
      'Throat singing was traditionally a game, often played by women while men were away hunting. Each pair chose a pattern, sometimes imitating the sounds of geese, the wind or a saw cutting wood. The singers repeated the pattern faster and faster. The first to run out of breath, lose the rhythm or burst out laughing lost the round. Laughter was part of the fun, and a good game could leave both singers and listeners in tears.',
      { h: 'A tradition interrupted' },
      'In the 1900s, many Christian missionaries in the Arctic discouraged or banned throat singing, along with drum dancing and other <b>customs</b> they did not understand. In some communities, the practice almost disappeared. Elders who remembered the songs kept them alive, and in the 1980s and 1990s, young Inuit women began learning from them. Today, throat singing is taught in schools in Nunavut and Nunavik.',
      { h: 'New sounds' },
      'Some artists now carry the tradition into new music. Tanya Tagaq, from Ikaluktutiak (Cambridge Bay) in Nunavut, performs throat singing alone, mixing it with rock and electronic music. Her albums have won major Canadian music awards. Other performers stay close to the traditional form, singing in pairs at festivals around the world. Some teach workshops in southern cities, where many young Inuit now live far from the Arctic and want to stay connected to their culture.',
      'For many Inuit, throat singing is more than music. It is a link to <b>ancestors</b>, to the land and to a language of sound that survived years of being silenced.'
    ],
    guide: { before: 'If possible, listen to a short recording of katajjaq performed by Inuit singers. Teach <b>katajjaq</b>, <b>customs</b> and <b>ancestors</b>. Look at the sound diagram: what do the blocks show?',
      after: 'Throat singing was nearly lost. Why do you think it matters that it was revived by Inuit themselves, and not by outsiders?' },
    words: [['katajjaq', 'Inuit throat singing, a game of sound between two singers'], ['customs', 'traditional ways of doing things in a culture'], ['ancestors', 'family members who lived long ago']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['The singers sing at the same time.', 'Each singer makes a sound in the other’s silence.', 'Singer 1 is louder.', 'The song gets slower.'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Many Christian missionaries <b>discouraged</b> throat singing.” Discouraged means …',
        opts: ['tried to stop', 'paid for', 'recorded', 'invented'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two cultural elements of katajjaq from the text, and explain what each shows about Inuit life.',
        a: 'It was a game played by women while men were away hunting, which shows how life was organized around hunting. Singers imitated geese and wind, which shows a close connection to the land.', look: 'two elements (contest, women’s tradition, imitating nature, laughter) and what each shows' },
      { k: 'order', code: 'C3.3', q: 'Number these events in order.',
        items: ['Throat singing is a common game among Inuit women.', 'Missionaries discourage or ban it.', 'Young women learn from Elders and revive it.', 'Artists mix it with new music around the world.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The box says some men throat sing today, but respect for tradition matters. Describe two different positions people might hold on this question.',
        a: 'Some people think anyone who learns respectfully should be able to throat sing, so the art can grow. Others think it should remain a women’s tradition, as it has been for generations.', look: 'two clearly different positions, fairly described' },
      { k: 'choice', code: 'C1.5', q: 'The last sentence calls throat singing “a language of sound that survived years of being silenced.” Why is <i>silenced</i> a powerful word choice?',
        opts: ['It contrasts sound with silence and reminds readers it was banned.', 'It means the songs are quiet.', 'It shows the singers whispered.', 'It is a scientific word.'], a: 0 },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Imagine you are planning a presentation on Canadian music. Explain why this text would or would not be useful, and what else you would read.',
        a: 'It would be useful because it explains the history and meaning of throat singing. I would also listen to recordings and read interviews with Inuit performers.', look: 'a purpose, a judgment about this text, and another suitable source' }
    ]
  });

  P.add({
    id: 'g8-glacier', subject: 'science', form: 'Report',
    title: 'The Shrinking Glacier',
    deck: 'Signposts beside the Athabasca Glacier show where the ice once reached',
    hero: {
      photo: 'g8-athabasca-glacier.jpg', credit: 'Photo: Ethan Sahagun, CC BY 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'The Athabasca Glacier, in Jasper National Park, Alberta, flows down from the Columbia Icefield.'
    },
    body: [
      'Visitors to the Athabasca Glacier park beside the highway and walk up a rocky path toward the ice. Along the way, they pass small signs with dates on them: 1908, 1925, 1942. Each sign marks where the edge of the glacier, called the <b>toe</b>, once stood. The walk to today’s ice takes about twenty minutes. A century ago, the visitors would have been standing on the glacier when they stepped out of their cars.',
      { h: 'How a glacier works' },
      'A glacier forms where more snow falls in winter than melts in summer. Year after year, the snow piles up and is pressed into ice. The ice becomes so heavy that it slowly flows downhill, like very thick syrup. At its lower end, the toe, the ice melts. If snowfall and melting are in balance, the toe stays in place. If melting is greater, the glacier <b>retreats</b>, even though the ice is still flowing forward.',
      { h: 'Losing ground' },
      'Since the late 1800s, the Athabasca Glacier has retreated about 1.5 kilometres and lost about half its volume. Scientists measure it with GPS, photographs and drones. Warmer summers are the main cause. Less snow in winter adds to the problem, and dust and soot that land on the ice make it darker, so it soaks up more of the sun’s heat. As Earth’s climate warms, glaciers in the Rocky Mountains are shrinking faster than at any time in recorded history.',
      'Why does this matter to people far from the mountains? Glaciers act like water towers. They store winter snow and release it slowly during the hottest, driest part of summer. Rivers fed by meltwater supply farms, towns and fish in Alberta and Saskatchewan. Cold meltwater also keeps rivers cool enough for trout. As the glaciers shrink, summer river flows may drop, just when water is needed most.',
      { fig: '<path class="k" d="M10 30 Q60 34 100 52 Q150 78 200 104 L290 120"/><path class="h" d="M10 30 Q60 34 100 52 Q130 66 150 80 L10 80 Z"/>' +
          '<path class="d" d="M150 80 Q200 104 280 120"/>' + [[150, 'today'], [200, '1950s'], [270, '1890s']].map(function (m) { return '<path class="k" d="M' + m[0] + ' 140 V128"/>' + tx(m[0], 154, 'n', m[1], 'middle'); }).join('') +
          tx(30, 70, 'n', 'ice') + D.label(200, 70, 'ice has melted', 186, 98) + tx(150, 170, 'n', 'about 1.5 km of retreat since the 1890s (not to scale)', 'middle'),
        tall: 176, cap: 'Side view of the glacier. The dashed line shows ice that has melted away.' },
      { box: 'Water for three oceans', text: 'Meltwater from the Columbia Icefield feeds rivers that flow to the Pacific, the Arctic and, through Hudson Bay, the Atlantic.' }
    ],
    guide: { before: 'Find Jasper National Park and the Columbia Icefield on a map. Teach <b>toe</b> and <b>retreat</b>. Point to the dashed line in the diagram and ask what it shows.',
      after: 'If you visited the glacier and saw the dated signs, how would you feel? What could people in Alberta do to prepare for lower summer river flows?' },
    words: [['toe', 'the lowest edge of a glacier, where it melts'], ['retreats', 'moves back; a glacier retreats when its toe melts faster than the ice flows forward']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Glaciers are made of snow.', 'The Athabasca Glacier is shrinking because of warmer summers, and this affects water supplies.', 'Visitors enjoy walking to the glacier.', 'Scientists use drones.'], a: 1 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> store winter snow.” <b>They</b> refers to …',
        opts: ['glaciers', 'water towers', 'farms', 'scientists'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the writer compare glaciers to <i>water towers</i>?',
        opts: ['to show that they store water and release it when needed', 'because both are tall', 'because both are made of metal', 'to describe their colour'], a: 0 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'How do the dated signs and the diagram work together to help readers understand the glacier’s retreat?',
        a: 'The signs show where the toe stood in different years, and the diagram shows the melted ice as a dashed line, so readers can see how far it has moved back.', look: 'connects the signs in the text with the markers and dashed line in the diagram' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How can a glacier retreat “even though the ice is still flowing forward”? Explain in your own words.',
        a: 'The ice keeps moving downhill, but the toe melts faster than new ice arrives, so the edge moves back up the valley.', look: 'the balance between flow and melting, in their own words' },
      { k: 'choice', code: 'B3.2', q: 'In “the ice becomes so heavy that it <b>slowly</b> flows downhill,” which word describes how the ice flows?',
        opts: ['heavy', 'slowly', 'downhill', 'ice'], a: 1 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Connect this text to your own life or community. Where does your water come from, and could changes like this affect it?',
        a: 'My water comes from Lake Ontario, not a glacier, but warmer weather can still change lake levels and cause algae, so climate change could affect my water too.', look: 'a specific connection to their own water source and a reasoned link to the text' }
    ]
  });

  P.add({
    id: 'g8-hydraulics', subject: 'tech', form: 'Explanation',
    title: 'Liquid Muscle',
    deck: 'How a little push on a fluid lets an excavator lift a tonne of rock',
    hero: {
      photo: 'g8-excavator.jpg', credit: 'Photo: Oto Zapletal, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A hydraulic excavator. The shiny rods on its arm are pistons, pushed in and out by oil under pressure.'
    },
    body: [
      'An excavator can scoop up a bucket of rock heavier than a car, yet the operator moves it with small levers and a light touch. The power travels through hoses filled with oil. Machines like this are <b>hydraulic</b>: they use a liquid under pressure to push and lift.',
      { fig: '<path class="k" d="M20 30 V120 H280 V60 M60 30 V96 H200 V60 M280 60 H200"/><path class="h" d="M22 96 H58 V118 H22 Z M62 98 H278 V118 H62 Z M202 62 H278 V96 H202 Z"/>' +
          '<rect class="a" x="20" y="64" width="40" height="8"/><rect class="a" x="200" y="50" width="80" height="10"/>' +
          D.arrow(40, 20, 40, 60, 'k') + D.arrow(240, 46, 240, 10, 'k') + tx(46, 16, 'n', '10 N in') + tx(246, 18, 'n', '80 N out') +
          tx(40, 144, 'n', 'small piston', 'middle') + tx(240, 144, 'n', 'large piston (8 × the area)', 'middle') + tx(150, 112, 'n', 'oil', 'middle'),
        tall: 152, cap: 'The same pressure acts on both pistons. A piston with 8 times the area pushes with 8 times the force.' },
      { h: 'Pressure spreads everywhere' },
      'In the 1600s, the French scientist Blaise Pascal discovered that when you push on a fluid in a closed container, the <b>pressure</b> spreads equally to every part of the fluid. Liquids such as oil cannot easily be squeezed into a smaller space, so a push at one end is felt instantly at the other.',
      'This is the key to hydraulics. Pressure is force divided by area. Imagine two pistons joined by a tube of oil. A small piston has an area of 1 square centimetre, and a large piston has an area of 8 square centimetres. Push on the small piston with a force of 10 newtons, and the pressure spreads through the oil. The large piston feels the same pressure on 8 times the area, so it pushes up with 80 newtons.',
      { h: 'Nothing for free' },
      'Hydraulics multiplies force, but it does not create energy. To raise the large piston by 1 centimetre, you must push the small piston down 8 centimetres. This trade, a small force over a long distance for a large force over a short distance, is called <b>mechanical advantage</b>.',
      { box: 'All around you', text: 'Car brakes, barber chairs, dentist chairs, garbage trucks and the wing flaps on airplanes all use hydraulics.' },
      'In an excavator, a diesel engine runs a pump that pushes oil into the cylinders on the arm. When the operator moves a lever, valves open, oil flows in, and the pistons slide out with enormous force. If a hose bursts, oil sprays out and the arm stops, so operators inspect the hoses before each shift.',
      'Hydraulics has another advantage: the pump and the pistons do not have to sit side by side. Flexible hoses can carry pressure around corners and along a moving arm, so a single engine can power every part of the machine, from the bucket to the tracks. That is why hydraulic machines are found on almost every construction site and farm in Canada.'
    ],
    guide: { before: 'Push the plungers of two syringes of different sizes joined by a tube of water, if you have them. Teach <b>pressure</b>, <b>hydraulic</b> and <b>mechanical advantage</b>. Trace the forces in the diagram.',
      after: 'Why might engineers use hydraulics instead of electric motors in a large digger? What could go wrong?' },
    words: [['hydraulic', 'using a liquid under pressure to move things'], ['pressure', 'the force pushing on each unit of area'], ['mechanical advantage', 'how many times a machine multiplies the force you put in']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Use the text to complete the chart.', cols: ['Small piston', 'Large piston'],
        rows: [['area 1 cm²', null], ['force in: 10 N', null], ['moves down 8 cm', null]],
        a: [[null, 'area 8 cm²'], [null, 'force out: 80 N'], [null, 'moves up 1 cm']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, why is the right arrow longer?',
        opts: ['The large piston pushes with more force.', 'The large piston moves faster.', 'Oil flows to the right.', 'It is closer to the engine.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do operators inspect the hoses before each shift?',
        opts: ['A burst hose stops the arm and sprays oil.', 'Hoses change colour.', 'The law says hoses must be new.', 'Hoses help the engine start.'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The paragraph about the two pistons has several numbers. What did you do to make sense of it?',
        a: 'I looked at the diagram while I reread the paragraph and matched each number to a label. Then I checked that 10 times 8 equals 80.', look: 'a named strategy (reread, use the diagram, calculate, visualize) and how it helped' },
      { k: 'choice', code: 'B2.1', q: 'The word <b>hydraulic</b> comes from the Greek <i>hydro</i>, meaning water. Which other word shares this base?',
        opts: ['hydrant', 'hybrid', 'hyphen', 'hyena'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The section heading says “Nothing for free.” What does the writer mean? Use details.',
        a: 'Hydraulics gives you more force, but you have to push a longer distance: 8 cm down to lift 1 cm up. You trade distance for force.', look: 'explains the trade-off with the 8 cm and 1 cm example' },
      { k: 'lines', code: 'B1.5', n: 3, q: 'Explain how car brakes might use hydraulics. Use the words <i>pressure</i> and <i>piston</i> correctly.',
        a: 'When the driver pushes the brake pedal, it pushes a small piston. The pressure travels through the brake fluid to larger pistons at the wheels, which squeeze the brakes hard.', look: 'a reasonable explanation using both words correctly' }
    ]
  });

  P.add({
    id: 'g8-teen-sleep', subject: 'health', form: 'Question and answer',
    title: 'Why Can’t I Fall Asleep?',
    deck: 'A sleep scientist answers questions from Grade 8 students about their body clocks',
    hero: {
      photo: 'g8-alarm-clock.jpg', credit: 'Photo: Santeri Viinamäki, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'For many teenagers, the alarm rings in the middle of the night, as far as their body clock is concerned.'
    },
    body: [
      'Our class asked Dr. Amira Haddad, who studies sleep at a university in Ontario, about the problems we have falling asleep and waking up. Here are her answers, shortened.',
      { fig: '<path class="k" d="M20 40 H290 M20 100 H290"/>' + [0, 1, 2, 3, 4, 5, 6].map(function (i) { var x = 20 + i * 45; return '<path class="t" d="M' + x + ' 34 V46 M' + x + ' 94 V106"/>' + tx(x, 130, 'n', ['8 pm', '10 pm', '12 am', '2 am', '4 am', '6 am', '8 am'][i], 'middle'); }).join('') +
          '<rect class="h" x="42" y="28" width="225" height="24"/><rect class="h" x="110" y="88" width="180" height="24"/>' +
          tx(20, 20, 'n', 'age 9: sleepy at about 8:30 pm') + tx(20, 80, 'n', 'age 14: sleepy at about 11 pm') + '<path class="d" d="M245 20 V120"/>' + tx(245, 148, 'lb', 'school alarm', 'middle'),
        tall: 154, cap: 'When the body clock says “sleep.” The dashed line shows a 7 am alarm.' },
      { h: 'Why am I wide awake at 11 at night?' },
      '“Your body has an internal clock, called your <b>circadian rhythm</b>, that tells you when to feel sleepy. In the evening, your brain releases a hormone called <b>melatonin</b> that makes you drowsy. During the teenage years, that release shifts later, by up to two hours. So it is not laziness. Your body is truly not ready for sleep at the time it was when you were nine.”',
      { h: 'How much sleep do I need?' },
      '“Teenagers need eight to ten hours a night. Many Canadian teens get closer to seven on school nights. If you fall asleep at 11:30 and your alarm rings at 6:30, you lose two hours every night. By Friday, that is like missing a whole night of sleep.”',
      { box: 'Tips from Dr. Haddad', text: 'Wake up at about the same time every day, even on weekends. Get bright daylight in the morning. Keep your bedroom cool, dark and quiet.' },
      { h: 'Does my phone make it worse?' },
      '“Yes, in two ways. Bright screens, especially their blue light, can delay melatonin even more. And videos and messages keep your brain alert. Try putting your phone in another room thirty minutes before bed. Read a paper book or listen to quiet music instead.”',
      { h: 'What happens if I don’t sleep enough?' },
      '“Sleep is when your brain stores what you learned that day. Without enough of it, memory, mood and concentration suffer. You are also more likely to get sick or injured. <b>Chronic</b> lack of sleep, night after night, is linked to anxiety and depression.”',
      { h: 'Should school start later?' },
      '“Many sleep scientists think so. Some schools that moved their start time later found students slept more and were late less often. But a later start also changes bus routes, sports and parents’ schedules. Communities have to weigh those costs.”'
    ],
    guide: { before: 'Ask what time the child falls asleep and wakes up, and work out the hours together. Teach <b>circadian rhythm</b>, <b>melatonin</b> and <b>chronic</b>. Read the sleep chart before reading.',
      after: 'Should Ontario schools start later? List one benefit and one cost, then decide.' },
    words: [['circadian rhythm', 'the body’s 24-hour clock that controls sleep and waking'], ['melatonin', 'a hormone that makes you feel sleepy'], ['chronic', 'lasting a long time or happening again and again']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Why does the writer use a question-and-answer form?',
        opts: ['It lets readers find the answers to the questions they care about.', 'It tells a story in time order.', 'It persuades readers to buy something.', 'It compares two scientists.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the chart, how long after a 14-year-old feels sleepy does a 7 am alarm ring?',
        opts: ['about 8 hours', 'about 10 hours', 'about 6 hours', 'about 12 hours'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Dr. Haddad says, “So it is not laziness.” What belief is she answering, and how does she use science to answer it?',
        a: 'She is answering the belief that teens stay up late because they are lazy. She explains that melatonin is released up to two hours later during the teenage years.', look: 'identifies the belief and the scientific evidence (melatonin shift)' },
      { k: 'table', code: 'C2.6', q: 'Complete the chart.', cols: ['Problem', 'Advice from Dr. Haddad'],
        rows: [['Screens delay melatonin.', null], ['Your sleep time changes on weekends.', null], ['Your room is bright and noisy.', null]],
        a: [[null, 'Put your phone in another room 30 minutes before bed.'], [null, 'Wake up at about the same time every day.'], [null, 'Keep your bedroom cool, dark and quiet.']] },
      { k: 'choice', code: 'B3.3', q: 'Why are Dr. Haddad’s answers inside quotation marks?',
        opts: ['They are her exact words.', 'They are the titles of books.', 'They are the most important ideas.', 'They are questions.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Is Dr. Haddad’s answer about later school start times balanced? Explain using the text.',
        a: 'Yes. She says scientists think it helps and gives evidence, but she also lists costs: bus routes, sports and parents’ schedules.', look: 'notes that both benefits and costs are presented, with details' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which strategy helped you most with this text: using the questions as headings, reading the chart or connecting it to your own sleep? Explain, and set one goal for your next reading.',
        a: 'Connecting it to my own sleep helped most because I could check the numbers against my bedtime. Next time I will look at charts before I read.', look: 'names a strategy, explains how it helped, sets a goal' }
    ]
  });

  P.add({
    id: 'g8-womens-parliament', subject: 'history', form: 'Report',
    title: 'The Night the Women Ran Parliament',
    deck: 'In 1914, Nellie McClung used laughter to win the vote for women in Manitoba',
    hero: {
      photo: 'g8-nellie-mcclung.jpg', credit: 'Photo: Cyril Jessop, public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 210,
      cap: 'Nellie McClung, writer, teacher and campaigner for women’s rights, in about 1910.'
    },
    body: [
      'On January 27, 1914, a group of Manitoba women visited the provincial legislature to ask for the right to vote. Premier Rodmond Roblin listened, then refused. Nice women did not want the vote, he told them. Giving it to them would break up the home. One of the women in the room was a teacher and best-selling author named Nellie McClung. She had an idea.',
      { h: 'A parliament turned upside down' },
      'The next evening, at the Walker Theatre in Winnipeg, the Political Equality League staged a play called the Women’s Parliament. In this imaginary world, women held all the power, and a group of men came to beg for the vote. McClung played the premier. She used Roblin’s own words, almost exactly, to turn the men down. Men were too emotional to vote, she explained. If they started voting, they might neglect their families. Besides, nice men did not want the vote.',
      'The audience roared with laughter. The play was a brilliant piece of <b>satire</b>: by flipping the situation, it showed how silly Roblin’s arguments sounded. Newspapers reported on it across the country, and the play was performed again to raise money for the campaign.',
      { h: 'Winning the vote' },
      'Two years later, after Roblin’s government fell in a scandal, Manitoba became the first province to give women the vote. Other provinces followed, and in 1918 most women won the right to vote in federal elections. McClung went on to be elected to the Alberta legislature, and in 1929 she was one of the Famous Five, who won the case that declared women were “persons” under Canadian law.',
      { fig: timeline([[0, 'Manitoba, Sask.,', 'Alberta', '1916'], [1, 'B.C., Ontario', '', '1917'], [2, 'federal', '(most women)', '1918'], [3, 'Quebec', '', '1940'], [4, 'First Nations', 'people, federal', '1960']], 0, 4),
        tall: 128, cap: 'When women, and some groups left out at first, won the right to vote (not to scale).' },
      { box: 'Not for everyone', text: 'The <b>suffrage</b> won in 1916 and 1918 did not include everyone. Many Asian Canadians could not vote until the late 1940s, and First Nations people with status could not vote federally without giving up their status until 1960.' },
      'McClung’s legacy is complicated. Like some other reformers of her time, she supported ideas that are now seen as unjust to people with disabilities and to immigrants. Historians today ask us to remember both her courage and her blind spots.'
    ],
    guide: { before: 'Explain that before 1916, no woman in Canada could vote in a provincial election. Teach <b>suffrage</b> and <b>satire</b>. Read the timeline together and notice the gaps between dates.',
      after: 'Why might laughter persuade people better than anger sometimes? Can you think of a modern example of satire?' },
    words: [['satire', 'humour that makes fun of a person or idea to show it is foolish or wrong'], ['suffrage', 'the right to vote in elections']],
    qs: [
      { k: 'lines', code: 'C3.1', n: 3, q: 'Explain how the Women’s Parliament was satire. What did it make fun of, and how?',
        a: 'It made fun of Premier Roblin’s arguments against women voting. By flipping the roles and using his words against men, it showed how foolish his reasons were.', look: 'names the target (Roblin’s arguments) and the technique (role reversal, his own words)' },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did McClung use Roblin’s words “almost exactly”?',
        opts: ['so the audience would recognize them and see how silly they sounded', 'because she forgot her lines', 'to praise Roblin', 'because the law required it'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the timeline show that the paragraphs do not?',
        opts: ['that some groups waited decades longer to vote', 'that Manitoba was first', 'McClung’s birthday', 'the name of the theatre'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Read the box. Why is it important to say who was left out when women “won the vote”?',
        a: 'Because saying “women won the vote in 1918” hides the fact that Asian Canadian and First Nations women still could not vote. It gives a more honest picture.', look: 'explains how leaving groups out gives an incomplete picture, with a detail from the box' },
      { k: 'choice', code: 'B3.3', q: 'In “women were ‘persons’ under Canadian law,” why is <i>persons</i> in quotation marks?',
        opts: ['It is the exact word the court case was about.', 'It is a question.', 'It is the name of a book.', 'It is being shouted.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The last paragraph says McClung’s legacy is “complicated.” Why do you think the writer included this?',
        a: 'To be fair and avoid bias. The writer praises her courage but also admits she held unjust views, so readers get a balanced picture.', look: 'recognizes the writer’s effort at balance and names both sides' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Did your opinion of McClung change as you read the last paragraph? Explain how you weighed the new information.',
        a: 'Yes. At first I admired her completely. The last paragraph made me see that a person can do important good things and still be wrong about others.', look: 'honest reflection on how their thinking changed and why' }
    ]
  });

  P.add({
    id: 'g8-jack-pine', subject: 'arts', form: 'Art analysis',
    title: 'Reading a Painting: <i>The Jack Pine</i>',
    deck: 'One tree, one lake, and a famous argument about what a painting leaves out',
    hero: {
      photo: 'g8-jack-pine.jpg', credit: 'Painting: Tom Thomson, 1916–17, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'Tom Thomson, <i>The Jack Pine</i>, 1916–17, oil on canvas. National Gallery of Canada, Ottawa.'
    },
    body: [
      'In 1916, Tom Thomson camped beside Grand Lake in Algonquin Park, Ontario, and made a small oil sketch of a jack pine leaning over the water. Back in his Toronto studio that winter, he turned the sketch into a large canvas. A few months later, Thomson drowned in Canoe Lake. He was 39. <i>The Jack Pine</i> became one of the most famous paintings in Canada.',
      { h: 'How it is built' },
      'Look at the painting as a set of shapes. Thomson divided the background into flat, horizontal bands: a sky of glowing yellow and pink, a dark line of hills, and a lake of purple and blue. Across these calm bands he set one strong <b>vertical</b> line, the dark trunk of the pine. Its branches reach out like arms. The tree is not perfect; it bends and leans. Many viewers feel it stands for strength in a harsh place.',
      'Thomson painted with thick strokes and outlined shapes in dark colour, almost like stained glass. The result is not a photograph of a lake. It is a <b>composition</b>, arranged to create a feeling of stillness and quiet power.',
      { h: 'The Group of Seven' },
      'Thomson’s friends in Toronto shared his love of the northern landscape. In 1920, seven of them, including Lawren Harris and A. Y. Jackson, held their first exhibition as the Group of Seven. They wanted to create a new style of art that was distinctly Canadian, and for decades their paintings shaped how Canadians pictured their country.',
      { fig: '<rect class="k" x="20" y="10" width="260" height="150"/><path class="d" d="M20 74 H280 M20 104 H280"/><path class="k" d="M150 160 C146 120 156 80 148 22"/>' +
          '<path class="t" d="M148 40 Q110 30 80 44 M150 60 Q190 48 220 62 M149 84 Q120 78 96 90"/>' +
          tx(286, 44, 'n', 'sky') + tx(286, 92, 'n', 'hills') + tx(286, 134, 'n', 'water') + D.label(176, 150, 'tree', 152, 124),
        tall: 168, cap: 'The composition: flat bands of sky, hills and water, crossed by one vertical tree.' },
      { h: 'What is missing?' },
      'Today, some critics point out that these paintings almost never show people. The lands Thomson and the Group painted were the homelands of Anishinaabe and other First Nations peoples, who had lived, travelled and harvested there for thousands of years. Showing the north as empty wilderness, these critics argue, supported the idea that the land was waiting to be claimed.',
      { box: 'Look closely', text: 'Count the colours in the sky. Find where the lightest part of the painting is. Why might Thomson have placed it behind the tree?' }
    ],
    guide: { before: 'Look at the painting together for a full minute before reading. Ask what the child notices first. Teach <b>composition</b> and <b>vertical</b>. Then compare the painting with the composition diagram.',
      after: 'If you were painting the place where you live, what would you include so that it tells the whole story?' },
    words: [['composition', 'the way shapes, lines and colours are arranged in an artwork'], ['vertical', 'going straight up and down']],
    qs: [
      { k: 'lines', code: 'C1.4', n: 3, q: 'Use the diagram and the text. How does the contrast between the horizontal bands and the vertical tree create a feeling in the painting?',
        a: 'The flat bands are calm and still, and the dark vertical tree stands out against them, which makes the tree look strong and important.', look: 'connects the composition (horizontal versus vertical) to a feeling or meaning' },
      { k: 'choice', code: 'C1.5', half: true, q: 'The branches “reach out like arms.” This is a …',
        opts: ['simile', 'metaphor', 'fact', 'question'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do you think the writer mentions that Thomson drowned soon after?',
        opts: ['It helps explain why the painting became so famous.', 'It is the main idea.', 'It shows the lake was dangerous.', 'It explains the colours.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Part of the painting', 'What Thomson did'],
        rows: [['background', null], ['tree', null], ['brushwork', null]],
        a: [[null, 'flat horizontal bands of sky, hills and water'], [null, 'one dark vertical trunk that bends and leans'], [null, 'thick strokes and dark outlines, like stained glass']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose perspective do the critics in “What is missing?” say the paintings leave out? Do you think this is a fair criticism?',
        a: 'They say the paintings leave out First Nations peoples who lived on the land. I think it is fair, because showing the land as empty tells only part of the story.', look: 'names the missing perspective and gives a reasoned opinion' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence combines two ideas with a semicolon?',
        opts: ['The tree is not perfect; it bends and leans.', 'He was 39.', 'Its branches reach out like arms.', 'Look at the painting as a set of shapes.'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of another image of Canada you have seen, such as a photo, an ad or a postcard. Compare it with <i>The Jack Pine</i>: what does each show, and what does each leave out?',
        a: 'A postcard of Toronto shows the CN Tower and busy streets but leaves out nature. <i>The Jack Pine</i> shows wild nature but leaves out people. Each shows only part of Canada.', look: 'a specific comparison: what each image includes and leaves out' }
    ]
  });
})();
