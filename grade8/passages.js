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

  P.add({
    id: 'g8-microscope', subject: 'science', form: 'Procedure',
    title: 'Focusing on a Cell',
    deck: 'Step-by-step instructions for using a compound light microscope without breaking a slide',
    hero: {
      photo: 'g8-microscope.jpg', credit: 'Photo: Chad Anderson, SFO Museum, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'A compound microscope made by Carl Zeiss in Jena, Germany, in 1914. Modern school microscopes work the same way.'
    },
    body: [
      'A compound light microscope uses two sets of lenses to magnify an object. The eyepiece usually magnifies ten times, and each objective lens magnifies four, ten or forty times. To find the total <b>magnification</b>, multiply the two. A 10× eyepiece with a 40× objective magnifies 400 times, enough to see the nucleus of a cheek cell.',
      { fig: '<path class="k" d="M150 10 V40 M140 10 H160"/><rect class="k" x="138" y="40" width="24" height="44" rx="3"/><path class="k" d="M130 84 H170 L164 100 H136 Z"/><path class="k" d="M146 100 V114 M154 100 V116"/>' +
          '<rect class="h" x="90" y="120" width="120" height="8"/><path class="k" d="M100 140 H200 M150 128 V140 M150 140 V160 M110 160 H190"/><circle class="k" cx="226" cy="76" r="9"/><circle class="k" cx="226" cy="104" r="6"/><path class="k" d="M170 76 H217 M170 104 H220"/>' +
          D.label(8, 14, 'eyepiece', 140, 18) + D.label(8, 64, 'body tube', 138, 62) + D.label(8, 104, 'objective lenses', 146, 108) + D.label(8, 134, 'stage and slide', 100, 124) +
          D.label(240, 60, 'coarse focus', 232, 72) + D.label(240, 130, 'fine focus', 230, 108) + D.label(196, 168, 'light', 150, 150),
        tall: 172, cap: 'The main parts of a compound light microscope.' },
      { box: 'Why look from the side?', text: 'At high power, the lens sits less than a millimetre above the slide. Watching from the side in step 3 stops you from crashing the lens into the glass and cracking the slide.' },
      { h: 'Before you begin' },
      'Carry the microscope with two hands: one on the arm and one under the base. Set it on a flat table away from the edge. Clean the lenses only with lens paper, because tissue can scratch the glass. Check that the slide is clean and that the cover slip lies flat, with no air bubbles hiding the <b>specimen</b>.',
      { h: 'Steps' },
      '<b>1.</b> Turn on the light and rotate the lowest-power objective (4×) into place. You should hear it click. <b>2.</b> Place the slide on the stage and hold it with the clips, with the specimen over the hole. <b>3.</b> Looking from the side, use the coarse focus knob to raise the stage as close to the lens as it will go. <b>4.</b> Now look through the eyepiece and turn the coarse knob slowly to lower the stage until the image appears. <b>5.</b> Sharpen the image with the fine focus knob. <b>6.</b> Move the part you want to study to the centre, then click the 10× objective into place and refocus with the fine knob only. <b>7.</b> Repeat for the 40× objective. Never use the coarse knob at high power.',
      { h: 'When you finish' },
      'Return the lowest-power objective to place, remove the slide, turn off the light and wrap the cord loosely. Write down what you saw and the magnification you used. A drawing is only useful as evidence if another scientist knows how much it was enlarged. Label the parts you can see, and note anything you are unsure about.'
    ],
    guide: { before: 'If you have a microscope or a hand lens, set it out. Teach <b>magnification</b> and <b>specimen</b>. Point to each part on the diagram, then have the child find the same part in the steps.',
      after: 'Which step would be most dangerous to skip? Why do scientists record the magnification of every drawing?' },
    words: [['magnification', 'how many times bigger an object looks than it really is'], ['specimen', 'a sample that a scientist studies']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature tells you this text is a procedure?',
        opts: ['numbered steps in order', 'a narrator', 'rhyming lines', 'an opinion'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'A 10× eyepiece and a 4× objective give a total magnification of …',
        opts: ['14×', '40×', '400×', '6×'], a: 1 },
      { k: 'order', code: 'C3.3', q: 'Number these steps in the right order.',
        items: ['Click the 4× objective into place.', 'Clip the slide onto the stage.', 'Raise the stage while looking from the side.', 'Lower the stage while looking through the eyepiece.', 'Sharpen the image with the fine focus.'], show: [3, 1, 4, 0, 2] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the procedure say “Never use the coarse knob at high power”? Use the box to explain.',
        a: 'At high power, the lens is less than a millimetre above the slide. The coarse knob moves the stage a lot, so it could crash the lens into the slide and crack it.', look: 'connects the tiny gap in the box to the large movement of the coarse knob' },
      { k: 'lines', code: 'C1.4', n: 3, q: 'How does the diagram help a reader follow the steps?',
        a: 'It labels the parts named in the steps, such as the coarse focus knob and the stage, so a reader can find each part on a real microscope.', look: 'explains that labels match words used in the steps' },
      { k: 'choice', code: 'B3.2', q: '“<b>Turn</b> on the light and <b>rotate</b> the lowest-power objective.” Why do so many sentences in a procedure begin with verbs?',
        opts: ['They are commands telling the reader what to do.', 'They describe the past.', 'They are questions.', 'They name people.'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Before you read the steps, what did you predict would be the first step? Was your prediction confirmed or did you change it?',
        a: 'I predicted the first step would be putting the slide on. It was actually turning on the light and choosing the lowest objective, so I changed my thinking.', look: 'a prediction and a clear statement of whether it was confirmed or revised' }
    ]
  });

  P.add({
    id: 'g8-osmosis', subject: 'science', form: 'Explanation',
    title: 'Why Salt Wilts a Salad',
    deck: 'Water moves in and out of every cell. Salt can pull it out.',
    hero: {
      photo: 'g8-onion-cells.jpg', credit: 'Photo: Trương Minh Khải, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Red onion cells under a microscope after salt water was added. The coloured contents have shrunk away from the cell walls.'
    },
    body: [
      'Sprinkle salt on cucumber slices and wait ten minutes. A puddle forms on the plate, and the slices turn limp and bendy. The salt has not cooked the cucumber. It has pulled water out of millions of its cells by a process called <b>osmosis</b>.',
      { fig: '<rect class="k" x="10" y="20" width="280" height="110" rx="6"/><path class="d" d="M150 20 V130"/>' +
          [[40, 50], [70, 80], [100, 46], [52, 104], [92, 110], [124, 74], [180, 60], [240, 96]].map(function (p) { return '<circle class="k" cx="' + p[0] + '" cy="' + p[1] + '" r="5"/>'; }).join('') +
          [[30, 70], [118, 100], [60, 120], [200, 40], [230, 60], [260, 44], [190, 110], [220, 120], [270, 100], [250, 76], [176, 90], [210, 86]].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="3"/>'; }).join('') +
          D.arrow(196, 140, 104, 140, 'a') + tx(150, 158, 'n', 'water moves to the saltier side', 'middle') + tx(80, 14, 'n', 'inside the cell: salty water', 'middle') + tx(220, 14, 'n', 'outside: fresher water', 'middle') + D.label(156, 176, 'membrane', 150, 130),
        tall: 182, cap: 'Big circles are salt particles; dots are water. Water crosses the membrane toward the side with more salt.' },
      { box: 'Plant cells and walls', text: 'A plant cell has a stiff cell wall outside its membrane. When water rushes in, the wall stops the cell from bursting. The pressure inside is what keeps leaves and stems firm.' },
      { h: 'Moving from crowded to less crowded' },
      'Particles in liquids and gases are always moving. Over time, they spread from places where they are crowded to places where there are fewer of them. This spreading is called <b>diffusion</b>. It is why the smell of popcorn fills a house and why a drop of food colouring slowly tints a whole glass of water.',
      { h: 'A special kind of diffusion' },
      'Every cell is wrapped in a thin cell <b>membrane</b>. The membrane lets water pass through easily, but it blocks many larger particles, such as salt. Osmosis is the diffusion of water across a membrane like this. Water moves toward the side where it is less concentrated, which is the side with more salt or sugar dissolved in it.',
      'When you salt a cucumber, the outside of each cell becomes saltier than the inside. Water flows out of the cells to even things up, and the cells go soft. If you put a limp stalk of celery in fresh water, the opposite happens. Water flows in, the cells swell, and the celery becomes crisp again. Grocery stores mist their vegetables with fresh water for the same reason.',
      { h: 'Osmosis in your body' },
      'Your own cells depend on osmosis too. That is why hospitals never put pure water into a patient’s veins. Instead, they use a salt solution that matches the concentration inside blood cells. If the outside were much fresher, water would rush into the cells until they burst.'
    ],
    guide: { before: 'Salt a few cucumber slices before reading, then look at them after. Teach <b>diffusion</b>, <b>osmosis</b> and <b>membrane</b>. Read the diagram key together: big circles and small dots.',
      after: 'Fish that live in the ocean and fish that live in lakes must deal with osmosis in opposite ways. Which one is losing water to its surroundings?' },
    words: [['diffusion', 'particles spreading from where they are crowded to where they are less crowded'], ['osmosis', 'the diffusion of water across a membrane'], ['membrane', 'a thin layer that lets some things pass through but not others']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Cucumbers taste better with salt.', 'Water moves across cell membranes toward the saltier side, which changes cells.', 'Popcorn smells good.', 'Hospitals use salt water.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart.', cols: ['What happens', 'Water moves …', 'Result'],
        rows: [['Salt is sprinkled on cucumber.', null, null], ['Limp celery is put in fresh water.', 'into the cells', null]],
        a: [[null, 'out of the cells', 'The cucumber goes limp.'], [null, null, 'The celery becomes crisp.']] },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the photo and the diagram. Explain what has happened to the onion cells in the photo.',
        a: 'Salt water was added outside the cells, so water moved out of them by osmosis. The cell contents shrank away from the walls.', look: 'links the salt water and the direction of water movement to the shrunken cells' },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>It</b> blocks many larger particles.” <b>It</b> refers to …',
        opts: ['the membrane', 'water', 'salt', 'the cucumber'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In this text, <b>concentrated</b> means …',
        opts: ['packed closely together in a space', 'thinking hard', 'very cold', 'easy to see'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do hospitals use salt water instead of pure water in a patient’s veins?',
        a: 'Pure water outside the blood cells would be fresher than inside, so water would rush into the cells by osmosis until they burst.', look: 'explains the direction of water movement and the danger of bursting' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Describe a time you have seen osmosis or diffusion at home. Explain it using an idea from the text.',
        a: 'When I put raisins in water, they swelled up. Water moved into the raisins because they had more sugar inside, so water flowed toward the sugary side.', look: 'a real experience correctly explained with osmosis or diffusion' }
    ]
  });

  P.add({
    id: 'g8-viscosity', subject: 'science', form: 'Explanation',
    title: 'Slow as Honey',
    deck: 'Why some liquids pour like water and others crawl out of the jar',
    hero: {
      photo: 'g8-honey.jpg', credit: 'Photo: Alabama Extension, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Honey pours in a thick, slow ribbon because it has a high viscosity.'
    },
    body: [
      'Tip a jar of water and the water rushes out. Tip a jar of honey and you will wait. Both are liquids, but they flow very differently. Scientists describe a fluid’s resistance to flowing as its <b>viscosity</b>. Honey has a high viscosity. Water has a low one. Viscosity is not the same as density. Cooking oil floats on water because it is less dense, yet it is far more viscous: it pours more slowly than the water it floats on.',
      { fig: bars([[1, 'water'], [50, 'cooking', 'oil'], [100, 'maple', 'syrup'], [250, 'liquid', 'honey', '']], { max: 250, step: 50 }) + tx(150, 12, 'n', 'how many seconds to drain a funnel (made-up test)', 'middle'),
        tall: 172, cap: 'Results of a class test: the more viscous the liquid, the longer it takes to drain.' },
      { box: 'A liquid that acts like a solid', text: 'Mix cornstarch and water to make oobleck. Stir it slowly and it flows like a liquid. Punch it quickly and it turns hard, because the <b>particles</b> jam together. Its viscosity changes with force.' },
      { h: 'Particles that cling' },
      'Why the difference? The particles in every liquid slide past one another. In water, the particles are small and slip by easily. In honey, the sugar particles are large and pull strongly on their neighbours, like a crowd of people holding hands trying to walk through a narrow door. The stronger the pull between particles, the higher the viscosity.',
      { h: 'Heat makes a difference' },
      'Warm honey pours much faster than cold honey. Heating a liquid gives its particles more energy, so they move faster and break free from one another more easily. That is why maple syrup producers bottle syrup while it is hot, and why engine oil flows more slowly on a frosty Canadian morning. Oil companies sell special winter oils with a lower viscosity, so engines can start in the cold.',
      { h: 'Viscosity at work' },
      'Engineers choose liquids for their viscosity all the time. Paint must be thick enough not to drip down a wall but thin enough to spread with a brush. Ketchup is designed to stay in the bottle until you shake or squeeze it. Doctors even measure the viscosity of blood, because blood that is too thick makes the heart work harder. Lava with low viscosity runs in rivers, like the lava in Hawaii; lava with high viscosity traps gas and can explode, as at Mount St. Helens in 1980.'
    ],
    guide: { before: 'Pour water, then a thick liquid (honey, syrup or dish soap), and compare. Teach <b>viscosity</b> and <b>particle</b>. Read the bar graph and note the made-up label.',
      after: 'Design a fair test to compare the viscosity of three liquids. What would you keep the same?' },
    words: [['viscosity', 'how much a fluid resists flowing'], ['particles', 'the tiny pieces that all matter is made of']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, which liquid has the highest viscosity?',
        opts: ['water', 'cooking oil', 'maple syrup', 'honey'], a: 3 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The writer compares honey particles to “a crowd of people holding hands.” This helps you …',
        opts: ['picture why the particles move slowly', 'learn the price of honey', 'see that honey is alive', 'count particles'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the cause-and-effect chart.', cols: ['Cause', 'Effect on viscosity'],
        rows: [['Honey is heated.', null], ['It is a frosty morning.', null], ['Oobleck is punched quickly.', null]],
        a: [[null, 'It goes down; honey pours faster.'], [null, 'Engine oil gets thicker and flows more slowly.'], [null, 'It goes up; oobleck turns hard.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why would a car owner in Yellowknife choose winter oil? Use evidence from the text.',
        a: 'Cold makes oil more viscous, so it flows slowly and the engine may not start. Winter oil has a lower viscosity, so it still flows in the cold.', look: 'links cold, higher viscosity and the purpose of winter oil' },
      { k: 'choice', code: 'B3.3', q: 'In “lava with low viscosity runs in rivers, like the lava in Hawaii; lava with high viscosity traps gas,” what does the semicolon do?',
        opts: ['joins two closely related sentences', 'introduces a list', 'shows a quotation', 'ends a question'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'The graph says “made-up test.” Why is it important to notice labels like this, and what could you do to check the real values?',
        a: 'It tells me the numbers are an example, not real measurements. I could look up the viscosity of each liquid in a science reference or do the test myself.', look: 'notices the limit of the data and names a way to confirm it' },
      { k: 'lines', code: 'B1.5', n: 3, q: 'Explain to a younger student why warm honey pours faster, using the words <i>particles</i> and <i>energy</i>.',
        a: 'Heating honey gives its particles more energy. They move faster and let go of each other more easily, so the honey flows faster.', look: 'both words used correctly in a clear explanation' }
    ]
  });

  P.add({
    id: 'g8-groundwater', subject: 'science', form: 'Report',
    title: 'The Water Beneath Our Feet',
    deck: 'Millions of Ontarians drink water that fell as rain decades ago and soaked into the ground',
    hero: {
      photo: 'g8-artesian-well.jpg', credit: 'Photo: Michael Gäbler, CC BY 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A flowing artesian well. Pressure in the aquifer below pushes groundwater up and out of the pipe without a pump.'
    },
    body: [
      'When rain falls on a field, some of it runs off into streams and some evaporates. The rest soaks into the soil and keeps sinking, through sand, gravel and cracks in rock, until it reaches a layer where every space is already filled with water. This is <b>groundwater</b>, and in Canada there is far more of it underground than in all our lakes and rivers.',
      { fig: '<path class="k" d="M10 40 Q80 20 150 34 T290 30"/>' + D.arrow(60, 6, 60, 28, 'a') + D.arrow(100, 4, 100, 26, 'a') +
          '<path class="d" d="M10 70 Q150 62 290 74"/><path class="h" d="M10 90 H290 V120 H10 Z"/><path class="k" d="M10 132 H290"/>' +
          '<path class="k" d="M220 24 V104 M228 24 V104"/>' + D.arrow(40, 52, 40, 84, 'k') +
          tx(124, 82, 'n', 'water table') + tx(150, 110, 'lb', 'aquifer (water-filled gravel)', 'middle') + tx(150, 148, 'n', 'solid rock or clay that water cannot pass through', 'middle') + D.label(240, 16, 'well', 224, 30) + tx(48, 70, 'n', 'rain soaks in'),
        tall: 154, cap: 'Rain soaks down to the water table. A well taps the aquifer below.' },
      { box: 'The Oak Ridges Moraine', text: 'This ridge of sand and gravel, left by glaciers north of Toronto, soaks up rain like a giant sponge. It feeds the streams and wells of more than 250 000 people. Since 2001, Ontario law has limited building on it.' },
      { h: 'Rock that holds water' },
      'Groundwater does not sit in underground lakes. It fills the tiny spaces between grains of sand and gravel, the way water fills a sponge. A layer of rock or sediment that holds enough water to supply a well is called an <b>aquifer</b>. The top of the water-filled layer is the water table. In a wet spring, the water table rises; in a dry summer, it falls, and shallow wells can run dry.',
      { h: 'A slow journey' },
      'Groundwater moves, but slowly, sometimes only a few centimetres a day. Water drawn from a deep well may have fallen as rain fifty or even a thousand years ago. Some of it slowly seeps into rivers and lakes, keeping streams flowing during droughts, when no rain has fallen for weeks.',
      { h: 'Easy to pollute, hard to clean' },
      'About one in three Canadians, and most rural families, rely on groundwater. Because it is hidden, it is easy to forget. Fuel leaking from an old tank, salt from winter roads or too much fertilizer on a field can seep down into an aquifer. Once there, the pollution can spread underground for years, and cleaning it is slow and expensive. Protecting the land above an aquifer is the best way to protect the water below. Many townships now map their aquifers and limit gas stations, dumps and factories in the areas that recharge them. Homeowners with wells can help too, by testing their water each year and never pouring paint, oil or chemicals down a drain or onto the ground.'
    ],
    guide: { before: 'Pour water onto a cup of gravel or sand and watch it fill the spaces. Teach <b>groundwater</b>, <b>aquifer</b> and <b>water table</b>. Trace the rain’s path in the diagram.',
      after: 'Should towns be allowed to build houses on top of an aquifer? What rules would you make?' },
    words: [['groundwater', 'water held underground in soil and rock'], ['aquifer', 'a layer of rock or sediment that holds water and lets it flow to wells']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the text?',
        opts: ['Rain makes puddles.', 'Groundwater is a large, slow, hidden water supply that must be protected.', 'Wells are deep holes.', 'Toronto has many lakes.'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The writer says groundwater fills spaces “the way water fills a sponge.” This comparison shows that …',
        opts: ['groundwater is in tiny spaces, not in a big lake', 'aquifers are soft', 'sponges come from underground', 'groundwater is dirty'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, why does the well reach down into the hatched layer?',
        opts: ['That is where the water is.', 'The rock is softer there.', 'The water table is above the ground.', 'Rain falls there.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why can shallow wells run dry in summer? Use two details from the text.',
        a: 'In a dry summer, the water table falls. If a well is shallow, its bottom ends up above the water table, so it cannot reach the water.', look: 'connects falling water table with well depth' },
      { k: 'table', code: 'C2.6', q: 'Complete the chart.', cols: ['Source of pollution', 'How it reaches groundwater'],
        rows: [['an old fuel tank', null], [null, 'It is spread on roads in winter and soaks into the ground.'], ['fertilizer', null]],
        a: [[null, 'It leaks and seeps down into the aquifer.'], ['road salt', null], [null, 'Too much is put on a field and seeps down.']] },
      { k: 'lines', code: 'C2.5', n: 3, q: 'How is groundwater like a bank account, where money goes in and comes out? Use ideas from the text.',
        a: 'Rain is like deposits that slowly soak in, and wells are like withdrawals. If people take out more than the rain puts in, the water table drops, like an account running low.', look: 'a sensible comparison using recharge and withdrawal' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Before reading, did you think groundwater sat in underground lakes? How did the text change or confirm your thinking?',
        a: 'I thought there were big lakes underground. The text showed me water is held in the spaces between grains of sand and gravel, like a sponge.', look: 'honest reflection naming an earlier idea and how it changed' }
    ]
  });

  P.add({
    id: 'g8-charlottetown', subject: 'history', form: 'Report',
    title: 'The Party That Built a Country',
    deck: 'In 1864, delegates came to Charlottetown to talk about uniting three colonies. They left with a bigger plan.',
    hero: {
      photo: 'g8-charlottetown.jpg', credit: 'Photo: George P. Roberts, 1864, public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 210,
      cap: 'Delegates to the Charlottetown Conference on the steps of Government House, Prince Edward Island, September 1864.'
    },
    body: [
      'In September 1864, a circus was in town in Charlottetown, Prince Edward Island, and every hotel room was taken. That made it awkward when a steamer arrived from the Province of Canada carrying eight politicians, including John A. Macdonald and George-Étienne Cartier. They had not been invited to the meeting that was about to begin. They had come to change its purpose.',
      { fig: '<path class="k" d="M10 120 H290"/>' + [[30, 'Province', 'of Canada'], [95, 'Nova', 'Scotia'], [160, 'New', 'Brunswick'], [225, 'P.E.I.', ''], [276, 'Nfld.', '']].map(function (c, i) { return '<circle class="' + (i < 3 ? 'h' : 'k') + '" cx="' + c[0] + '" cy="60" r="' + (i ? 16 : 22) + '"/>' + tx(c[0], 100, 'n', c[1], 'middle') + tx(c[0], 112, 'n', c[2], 'middle'); }).join('') +
          tx(10, 140, 'n', 'Hatched: joined in 1867. P.E.I. joined in 1873;') + tx(10, 154, 'n', 'Newfoundland and Labrador in 1949.'),
        tall: 160, cap: 'The colonies at the conferences of 1864, and when each joined Canada.' },
      { box: 'Who was not at the table?', text: 'No women and no First Nations, Métis or Inuit leaders were invited to Charlottetown or Quebec, though the new country would claim their lands.' },
      { h: 'A meeting about the Maritimes' },
      'The conference had been called so that Nova Scotia, New Brunswick and Prince Edward Island could discuss joining together in a Maritime union. The Canadians asked to speak. They proposed something far larger: a <b>confederation</b> of all the British colonies in North America, stretching from the Atlantic toward the Pacific.',
      { h: 'Why unite?' },
      'Each colony had its own reasons. The Province of Canada was stuck: its English-speaking and French-speaking halves had so many arguments that the government kept collapsing. The colonies also feared the United States, which had just built a huge army during its Civil War. A railway linking the colonies would help trade, but no colony could afford to build it alone.',
      { h: 'Champagne and persuasion' },
      'The Canadians had brought crates of champagne, and they hosted lavish dinners on their steamer. Over a week of speeches, dinners and dances, the Maritime <b>delegates</b> were won over. A month later, the delegates met again at Quebec City and wrote the Seventy-Two Resolutions, the plan that became the British North America Act. On July 1, 1867, Canada was born, with four provinces: Ontario, Quebec, Nova Scotia and New Brunswick.',
      'Ironically, Prince Edward Island, the host, did not join in 1867. Islanders worried they would have little say in a large country. It took a railway debt, which Canada agreed to pay, to bring the island in six years later.'
    ],
    guide: { before: 'Show a map of the colonies in 1864. Teach <b>confederation</b> and <b>delegate</b>. Explain that the Province of Canada was today’s southern Ontario and Quebec.',
      after: 'The box asks who was not at the table. How might Canada be different if they had been invited?' },
    words: [['confederation', 'a union of provinces or states under one central government'], ['delegates', 'people chosen to speak and vote for a group']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the Canadians arrive uninvited?',
        opts: ['to persuade the Maritimes to join a larger union', 'to see the circus', 'to buy land', 'to start a war'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Why does the writer call it ironic that P.E.I. did not join in 1867?',
        opts: ['It hosted the meeting that started Confederation but stayed out.', 'It was the largest colony.', 'It had no railway.', 'It joined first.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'List each reason for Confederation from the text.', cols: ['Problem', 'How union could help'],
        rows: [['The Province of Canada’s government kept collapsing.', null], [null, 'Together the colonies could defend themselves.'], ['No colony could afford a railway alone.', null]],
        a: [[null, 'A new system could give each part its own government.'], ['The colonies feared the large American army.', null], [null, 'Together they could build and pay for it.']] },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the photo. What does it suggest about who made decisions in 1864? Use the box too.',
        a: 'The photo shows only men in suits, which suggests that wealthy men made the decisions. The box confirms that no women or Indigenous leaders were invited.', look: 'an inference from the photo supported by the box' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is complex: it has a part starting with <i>which</i> that adds information?',
        opts: ['It took a railway debt, which Canada agreed to pay, to bring the island in.', 'Canada was born.', 'The Canadians asked to speak.', 'They had come to change its purpose.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Answer the question in the box: who was not at the table, and why does it matter today?',
        a: 'Women and First Nations, Métis and Inuit leaders were left out. It matters because decisions about their lands and rights were made without them, and some of those problems still affect Canada.', look: 'names the excluded groups and explains a lasting effect' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Give two different reasons someone might read this text.',
        a: 'To learn how Canada began for a history project, and to understand why some groups say Confederation was unfair to them.', look: 'two different, realistic purposes' }
    ]
  });

  P.add({
    id: 'g8-komagata-maru', subject: 'history', form: 'Report',
    title: 'Turned Away in Vancouver Harbour',
    deck: 'In 1914, 376 passengers sailed to Canada. Canada would not let them land.',
    hero: {
      photo: 'g8-komagata-maru.jpg', credit: 'Photo: 1914, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 210,
      cap: 'Sikh passengers on board the <i>Komagata Maru</i> in Vancouver Harbour, 1914.'
    },
    body: [
      'On May 23, 1914, a Japanese steamship called the <i>Komagata Maru</i> dropped anchor in Vancouver Harbour. On board were 376 passengers from Punjab, in British India, who had boarded in Hong Kong, Shanghai and Japan. Most were Sikh, and the rest Muslim and Hindu. Like Canada, India was part of the British Empire, so the passengers were British subjects. They had every reason to believe they could enter another part of the Empire.',
      { fig: '<path class="k" d="M20 110 Q90 30 150 70 T282 60"/><circle class="dot" cx="20" cy="110" r="4"/><circle class="dot" cx="150" cy="70" r="4"/><circle class="dot" cx="282" cy="60" r="4"/>' +
          tx(20, 130, 'n', 'Hong Kong', 'start') + tx(150, 92, 'n', 'Shanghai, then Japan', 'middle') + tx(282, 82, 'n', 'Vancouver', 'end') +
          tx(150, 20, 'n', 'about seven weeks at sea, with stops', 'middle') + tx(150, 156, 'n', 'Not a “continuous journey”: the ship stopped on the way.', 'middle'),
        tall: 160, cap: 'The route of the <i>Komagata Maru</i> (not to scale).' },
      { h: 'A law designed to keep them out' },
      'Canada’s government did not want immigrants from India. Instead of banning them by name, it passed a rule in 1908: immigrants had to arrive by a <b>continuous journey</b> from their home country, on a single ticket. There were no steamships that sailed directly from India to Canada. The rule looked fair on paper, but it was written so that almost no one from India could meet it.',
      { h: 'Two months at anchor' },
      'Gurdit Singh, a businessman, had chartered the ship to challenge the rule. When it arrived, officials refused to let the passengers ashore, except for twenty returning residents and the ship’s doctor. For two months, the ship sat in the harbour. Food and fresh water ran low. People of South Asian origin in Vancouver raised money and hired a lawyer, but the court ruled against the passengers.',
      { box: 'An apology', text: 'In 2016, the Prime Minister apologized in the House of Commons for Canada’s role. A memorial now stands near the spot in Vancouver where the ship was anchored.' },
      'On July 19, police tried to board the ship and were driven back by passengers throwing coal and bricks. The government then sent a navy cruiser, HMCS <i>Rainbow</i>, to escort the ship out. On July 23, the <i>Komagata Maru</i> sailed away. When it reached India, British soldiers opened fire on the passengers, and about twenty were killed.',
      'The continuous journey rule stayed in place until 1947. Historians say the <i>Komagata Maru</i> shows how a law can <b>discriminate</b> without ever naming the people it targets.'
    ],
    guide: { before: 'Locate Punjab, Hong Kong and Vancouver on a world map. Explain that in 1914 Canada and India were both in the British Empire. Teach <b>continuous journey</b> and <b>discriminate</b>.',
      after: 'Can you think of a rule today that looks equal for everyone but affects some people far more than others?' },
    words: [['continuous journey', 'a trip straight from one country to another with no stops, on one ticket'], ['discriminate', 'to treat a group of people unfairly because of who they are']],
    qs: [
      { k: 'lines', code: 'C3.2', n: 3, q: 'The text says the rule “looked fair on paper.” Explain why it was not fair in practice.',
        a: 'It did not name Indians, but no ships sailed directly from India to Canada, so almost no one from India could meet it. It was designed to keep them out.', look: 'the gap between what the rule said and its real effect' },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the map show about the journey?',
        opts: ['The ship stopped on the way, so it was not continuous.', 'The ship sailed straight to Vancouver.', 'The trip took two days.', 'The ship sank.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Dis</b>criminate, <b>dis</b>agree and <b>dis</b>respect share a prefix. Which word does NOT have the prefix dis-?',
        opts: ['distance', 'dishonest', 'disappear', 'dislike'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the events in order.',
        items: ['Canada passes the continuous journey rule.', 'The ship arrives in Vancouver Harbour.', 'Police try to board the ship.', 'The ship is escorted out of the harbour.', 'Canada apologizes.'], show: [2, 4, 0, 3, 1] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose perspective is told most fully in this text? Whose would you want to hear more from, and why?',
        a: 'The passengers’ side is told most fully. I would want to hear from a passenger in their own words, such as Gurdit Singh’s account, to understand how it felt.', look: 'identifies a perspective and suggests a missing voice with a reason' },
      { k: 'choice', code: 'B3.3', q: 'Why is <i>Komagata Maru</i> written in italics?',
        opts: ['It is the name of a ship.', 'It is a foreign word.', 'It is a quotation.', 'It is very important.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How did people of South Asian origin in Vancouver respond? What does this show about community?',
        a: 'They raised money and hired a lawyer to help the passengers. It shows that the community supported people who were being treated unfairly, even strangers.', look: 'the action taken and an insight about community' }
    ]
  });

  P.add({
    id: 'g8-last-best-west', subject: 'history', form: 'Media analysis',
    title: 'Selling the Last Best West',
    deck: 'Around 1900, Canada advertised the Prairies to the world. What did the posters promise, and what did they leave out?',
    hero: {
      photo: 'g8-last-best-west.jpg', credit: 'Poster: Government of Canada, about 1910, public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 180,
      cap: 'A Canadian government poster from the early 1900s inviting settlers to “The Last Best West.”'
    },
    body: [
      'In 1896, Clifford Sifton became the federal minister in charge of the Interior. His goal was to fill the Prairies with farmers. The railway to the Pacific was finished, but few people were settling along it. Sifton’s department launched one of the largest advertising campaigns the world had seen.',
      { fig: bars([[17, '1896'], [56, '1901'], [139, '1903'], [272, '1907'], [331, '1911'], [401, '1913']], { max: 400, step: 100 }) + tx(46, 10, 'n', 'immigrants arriving, in thousands'),
        tall: 172, cap: 'Immigration to Canada, 1896 to 1913, in thousands of people per year (rounded).' },
      { h: 'The campaign' },
      'Millions of pamphlets and posters were printed in English, French, German, Ukrainian, Swedish and other languages. They showed golden wheat, sturdy farmhouses and smiling families. The slogan called Canada “The Last Best West,” suggesting that the American frontier was full and Canada was the last great chance for free land. Under the Dominion Lands Act, a settler could claim a <b>homestead</b> of 160 acres for a ten-dollar fee, if they built a home and farmed the land for three years.',
      { h: 'What the posters did not show' },
      'Advertising is a <b>persuasive</b> media text, and every poster was carefully chosen. The pictures showed summer, not winters of minus 40°C. They showed fields already cleared, not the years of back-breaking work to break the tough prairie sod. They rarely showed the sod houses that many families lived in at first. Most of all, they showed the land as empty and waiting.',
      { box: 'Not everyone was welcome', text: 'The campaign targeted farmers from Britain, the United States and Europe. Black farmers from Oklahoma who moved to Alberta around 1910 were discouraged by officials, and Asian immigrants faced head taxes and other barriers.' },
      'The land was not empty. It was the home of Cree, Saulteaux, Blackfoot, Dakota, Métis and other peoples. Under the numbered treaties, many First Nations had been moved onto reserves, and the government controlled where they could go. The pass system, introduced after 1885, required many First Nations people to get permission from a government agent to leave their own reserve.',
      'The campaign worked. Between 1896 and 1914, about three million people arrived in Canada, and Saskatchewan and Alberta became provinces in 1905.'
    ],
    guide: { before: 'Look at the poster together for a minute: what feelings does it give? Teach <b>homestead</b> and <b>persuasive</b>. Read the bar graph’s title and units.',
      after: 'Find an ad today that sells a place, such as a tourism ad. What does it show, and what might it leave out?' },
    words: [['homestead', 'a piece of land given to a settler who builds a home and farms it'], ['persuasive', 'trying to make someone believe or do something']],
    qs: [
      { k: 'lines', code: 'A2.4', n: 3, q: 'Name two techniques the posters used to persuade people, and explain why each worked.',
        a: 'They showed golden wheat and smiling families, so people imagined success. The slogan “The Last Best West” made people feel they had to hurry before the chance was gone.', look: 'two techniques (images, slogan, many languages, free land) and the effect of each' },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the bar graph show?',
        opts: ['Immigration grew greatly after 1896.', 'Immigration fell after 1896.', 'Wheat prices rose.', 'The number of posters printed.'], a: 0 },
      { k: 'choice', code: 'A2.5', half: true, q: 'Who was the intended audience of the posters?',
        opts: ['farmers in Britain, the U.S. and Europe', 'First Nations communities', 'people already living on the Prairies', 'children in Canadian schools'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The posters showed the land as “empty and waiting.” Whose perspective does this leave out, and what was the effect?',
        a: 'It left out the Cree, Blackfoot, Métis and other peoples who lived there. Showing the land as empty made it seem fair to give it away to settlers.', look: 'names the missing peoples and the effect of erasing them' },
      { k: 'table', code: 'C2.6', q: 'Complete the chart.', cols: ['The posters showed …', 'The reality was …'],
        rows: [['summer and golden wheat', null], ['cleared fields', null], ['farmhouses', null]],
        a: [[null, 'winters of minus 40°C'], [null, 'years of work to break the sod'], [null, 'sod houses at first']] },
      { k: 'choice', code: 'B3.2', q: 'In “sturdy farmhouses and smiling families,” the words <b>sturdy</b> and <b>smiling</b> are …',
        opts: ['adjectives', 'verbs', 'adverbs', 'nouns'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Read the box. How does it change the idea that Canada welcomed “everyone” to the West?',
        a: 'It shows that only some groups were welcome. Black farmers and Asian immigrants were discouraged or charged extra, so the invitation was not open to all.', look: 'explains the exclusion of specific groups with evidence' }
    ]
  });

  P.add({
    id: 'g8-treaty-six', subject: 'history', form: 'Report',
    title: 'Treaty 6 and the Medicine Chest',
    deck: 'In 1876, Cree leaders and the Crown made a treaty. The two sides understood it differently.',
    hero: {
      photo: 'g8-treaty6.jpg', credit: 'Image: 1876, public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 200,
      cap: 'A page from the written text of Treaty 6, signed at Fort Carlton and Fort Pitt in 1876.'
    },
    body: [
      'In August 1876, thousands of Plains and Woodland Cree gathered near Fort Carlton, in what is now Saskatchewan, to meet with Alexander Morris, who spoke for Queen Victoria. The buffalo, on which Cree life depended, were disappearing fast. Smallpox had swept through the Prairies a few years before. Settlers were coming. Cree leaders wanted to secure a future for their children.',
      { fig: '<rect class="k" x="10" y="14" width="130" height="130" rx="6"/><rect class="k" x="160" y="14" width="130" height="130" rx="6"/>' +
          tx(75, 34, 'lb', 'the Crown', 'middle') + tx(225, 34, 'lb', 'Cree leaders', 'middle') +
          ['written English text', 'signatures', 'land given up'].map(function (t, i) { return tx(20, 62 + i * 26, 'n', '• ' + t); }).join('') +
          ['pipe ceremony', 'spoken promises', 'land shared'].map(function (t, i) { return tx(170, 62 + i * 26, 'n', '• ' + t); }).join(''),
        tall: 150, cap: 'Two different understandings of the same treaty.' },
      { box: 'Who did not sign', text: 'Mistahimaskwa (Big Bear) refused to sign at first. He feared the treaty would take away his people’s freedom, and said he did not want a rope around his neck. He signed in 1882, when his people were starving.' },
      { h: 'Two ways of making an agreement' },
      'For the Crown, a <b>treaty</b> was a written legal document. The English text said that the First Nations would “cede, release, surrender and yield up” their rights to a huge area of land, more than 300 000 square kilometres, in exchange for reserves, cash payments, tools and farming help. For the Cree, an agreement was made through ceremony, especially the pipe ceremony, and through spoken promises. Many Elders have explained that their ancestors agreed to share the land, not to give it up.',
      { h: 'The medicine chest' },
      'Chiefs such as Mistawasis and Ahtahkakoop led the negotiations. They asked for protection in times of famine and for help with disease. Their requests led to two promises found in no earlier numbered treaty: help in case of famine, and a “medicine chest” to be kept at the house of each Indian agent. The Cree negotiators were planning for a future they could already see coming. Many First Nations and many courts today understand the <b>medicine chest clause</b> as a promise of health care.',
      { h: 'Treaties today' },
      'Treaties are not only history. They are living agreements that still bind Canada and First Nations. Ontario and Canada include treaty lands that are covered by many treaties, and Treaties Recognition Week, in early November, asks all Ontarians to learn whose treaty land they live on. As people often say, we are all treaty people.'
    ],
    guide: { before: 'Locate Fort Carlton and the Treaty 6 area on a map of Saskatchewan and Alberta. Teach <b>treaty</b> and <b>clause</b>. Explain that both written and oral records matter in understanding treaties.',
      after: 'Which treaty covers the land where you live? Find out together, and talk about what the phrase “we are all treaty people” means.' },
    words: [['treaty', 'a formal agreement between nations'], ['medicine chest clause', 'the part of Treaty 6 promising medical help to First Nations']],
    qs: [
      { k: 'lines', code: 'C1.4', n: 3, q: 'Use the chart. How did the Crown and the Cree understand the treaty differently?',
        a: 'The Crown saw a written document in which the land was given up. The Cree made the agreement through the pipe ceremony and spoken promises, and understood it as sharing the land.', look: 'two differences drawn from both boxes of the chart' },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Cree leaders ask for help with famine and disease?',
        opts: ['The buffalo were disappearing and smallpox had struck.', 'They wanted to become farmers right away.', 'The Crown asked them to.', 'They had too much food.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Cede, release, surrender and yield up” all mean …',
        opts: ['give up', 'share', 'protect', 'measure'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why was the pipe ceremony important to the Cree understanding of the treaty?',
        a: 'For the Cree, a ceremony made a promise sacred and binding. The spoken promises made during it were as important as, or more important than, the written words.', look: 'explains the cultural meaning of ceremony in making agreements' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The written treaty was in English and written by the Crown. Why might relying only on the written text give a biased picture?',
        a: 'The Cree did not write it and many could not read English, so it records only the Crown’s view. The oral promises the Cree remember are left out.', look: 'who wrote the text and whose understanding it leaves out' },
      { k: 'choice', code: 'B3.3', q: 'Why are the words <i>cede, release, surrender and yield up</i> in quotation marks?',
        opts: ['They are copied exactly from the treaty.', 'They are a song title.', 'They are said loudly.', 'They are made up.'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Big Bear refused to sign at first. Compare his choice with the chiefs who signed in 1876. What did each side hope for?',
        a: 'The signing chiefs hoped to protect their people from famine and disease. Big Bear hoped to keep his people free and independent, but starvation forced him to sign later.', look: 'a fair comparison of both choices and their reasons' }
    ]
  });

  P.add({
    id: 'g8-child-labour', subject: 'history', form: 'Report',
    title: 'Children of the Mills',
    deck: 'In 1900, thousands of Canadian children worked long days in factories. How did that change?',
    hero: {
      photo: 'g8-mill-spinner.jpg', credit: 'Photo: Lewis Hine, 1910, CC0, Wikimedia Commons', focus: '50% 30%',
      tall: 190,
      cap: 'Addie Card, age 12, a spinner in a cotton mill in Vermont, photographed by Lewis Hine in 1910. Mills in Ontario and Quebec employed children like her.'
    },
    body: [
      'In 1900, a twelve-year-old in Montréal or Cornwall might start work at six in the morning and finish at six at night, six days a week. Many children worked in textile mills, where they changed spools of thread on spinning machines, or in cigar factories, glassworks and mines. Their families were poor, often new to the city, and needed every wage.',
      { fig: bars([[100, 'adult', 'man'], [50, 'woman'], [30, 'child']], { max: 125, step: 25, unit: '¢' }) + tx(46, 10, 'n', 'typical pay for a day in a mill, around 1900'),
        tall: 172, cap: 'Approximate daily pay in a textile mill around 1900. Children earned least.' },
      { box: 'Photographs as evidence', text: 'The American photographer Lewis Hine pretended to be a salesman or a fire inspector so he could photograph children in mills. His images shocked readers and helped change laws.' },
      { h: 'The new industrial cities' },
      'Between 1890 and 1914, Canada became an industrial country. Factories powered by steam and electricity sprang up in Toronto, Hamilton and Montréal, and families left farms to find work. City wages were low and housing was crowded. A child could earn perhaps two dollars a week, far less than an adult man, which is exactly why some employers preferred to hire children.',
      { h: 'Dangerous work' },
      'Mills were hot, noisy and full of cotton dust that damaged the lungs. Machines had no guards, and a child who reached in to fix a broken thread could lose a finger or a hand. Tired children made mistakes, and accidents were most common late in the day, when everyone was exhausted. In 1889, a <b>Royal Commission</b> on the Relations of Labour and Capital heard workers describe children being beaten or fined for being late or talking.',
      { h: 'Pushing for change' },
      'Labour unions, church groups and women’s organizations campaigned against child labour. Ontario passed factory acts that set a minimum age, first 12 for boys and 14 for girls, and later raised it. Laws that made school <b>compulsory</b> also kept children in classrooms. But laws were often ignored, and there were few inspectors to check. Real change came slowly, as wages rose and families could afford to keep children in school. By the 1920s, most Canadian children under fourteen spent their days in classrooms, not factories.'
    ],
    guide: { before: 'Ask the child to imagine working twelve hours a day at age 12. Teach <b>Royal Commission</b> and <b>compulsory</b>. Explain that the photo is from the United States, but conditions in Canadian mills were similar.',
      after: 'Child labour still exists in some parts of the world today. How could a shopper in Canada find out whether a product was made by children?' },
    words: [['Royal Commission', 'a group appointed by the government to investigate a problem and report'], ['compulsory', 'required by law']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did some employers prefer to hire children?',
        opts: ['Children could be paid much less.', 'Children were stronger.', 'The law required it.', 'Children had more experience.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the bar graph show?',
        opts: ['A child earned less than a third of a man’s pay.', 'Women earned the most.', 'Everyone earned the same.', 'Pay went up each year.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart of changes.', cols: ['Group or action', 'How it helped end child labour'],
        rows: [['labour unions and women’s groups', null], ['factory acts', null], [null, 'kept children in classrooms']],
        a: [[null, 'campaigned against child labour'], [null, 'set a minimum age for factory work'], ['compulsory school laws', null]] },
      { k: 'lines', code: 'C1.4', n: 3, q: 'The box says Lewis Hine’s photos “shocked readers.” Look at the hero photo. What details in it might shock a reader?',
        a: 'The girl is very young, she is standing beside large machines with no guards, and she is barefoot. It makes readers see that a real child is doing dangerous adult work.', look: 'specific details from the photo and why they would affect readers' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is complex: it has a part beginning with <i>as</i> that explains why?',
        opts: ['Real change came slowly, as wages rose and families could afford to keep children in school.', 'Tired children made mistakes.', 'Mills were hot.', 'Their families were poor.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The writer says laws “were often ignored.” Why might a law not be enough to end child labour? Use evidence.',
        a: 'There were few inspectors, and poor families still needed the money. Only when wages rose could families afford to keep children in school.', look: 'two reasons from the text (few inspectors, family need, low wages)' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What do you already know about work, school or rights for young people today that helps you understand this text?',
        a: 'I know that in Ontario, students must go to school until 18 and there are rules about how young you can be to work. That helped me see how much has changed since 1900.', look: 'a specific piece of prior knowledge connected to the text' }
    ]
  });

  P.add({
    id: 'g8-montreal-site', subject: 'geography', form: 'Report',
    title: 'Why Montréal Is Where It Is',
    deck: 'A set of rapids, an island and a river explain the location of one of Canada’s oldest cities',
    hero: {
      photo: 'g8-lachine-rapids.jpg', credit: 'Photo: Richard Mc Neil, CC BY 3.0, Wikimedia Commons', focus: '50% 55%',
      tall: 200,
      cap: 'The Lachine Rapids on the St. Lawrence River, beside the island of Montréal. For centuries, boats could not pass them.'
    },
    body: [
      'Every city stands where it does for a reason. Geographers explain a city’s location with two ideas. Its <b>site</b> is the land it is built on: its soil, water, hills and shelter. Its <b>situation</b> is its position compared with the places around it: the rivers, roads and other towns that connect it to the world. Montréal is a perfect example of both.',
      { fig: '<path class="a" d="M10 120 Q80 110 130 86 Q180 62 290 40"/><path class="a" d="M10 60 Q60 66 120 76"/>' +
          '<path class="h" d="M120 70 Q150 50 190 54 Q210 66 186 82 Q150 96 126 88 Z"/><path class="k" d="M150 98 l6 -6 l6 6 l6 -6 l6 6"/>' +
          tx(14, 52, 'n', 'Ottawa River') + tx(14, 138, 'n', 'St. Lawrence (from Great Lakes)') + tx(240, 32, 'n', 'to the Atlantic', 'middle') + D.label(186, 118, 'Lachine Rapids', 162, 96) + tx(158, 72, 'lb', 'island', 'middle'),
        tall: 150, cap: 'Montréal sits on an island where rivers meet, just below the rapids (simplified).' },
      { box: 'A canal changes everything', text: 'The Lachine Canal opened in 1825 so boats could bypass the rapids. Factories lined its banks, and Montréal became Canada’s first great industrial city.' },
      { h: 'The site: an island with a mountain' },
      'Montréal is built on an island in the St. Lawrence River. The island had good soil for farming and a mountain, Mount Royal, that gave a view of the river. Long before Europeans arrived, the Haudenosaunee village of Hochelaga stood near the mountain, surrounded by cornfields. The island was also a meeting place for Anishinaabe and other nations who travelled the rivers to trade. When the French founded Ville-Marie there in 1642, they chose the spot for many of the same reasons.',
      { h: 'The situation: the end of the line' },
      'Just upstream from the island, the river drops through the Lachine Rapids, a stretch of white water too dangerous for large boats. Ships sailing up the St. Lawrence from the Atlantic Ocean could go no farther. Their cargo had to be unloaded at Montréal and carried around the rapids or loaded into canoes. Montréal also sits near the mouth of the Ottawa River, a route deep into the continent. The fur trade made the city rich, because furs from the West came down the rivers to Montréal, and trade goods from Europe went up.',
      { h: 'Site and situation today' },
      'Today, the St. Lawrence Seaway lets ocean ships sail past Montréal into the Great Lakes, so the city is no longer the end of the line. Yet it remains one of Canada’s busiest ports, a railway hub and a centre for business and culture. Its first advantages, a safe island where rivers meet, shaped a city of more than four million people.'
    ],
    guide: { before: 'Find Montréal on a map of Canada and trace the St. Lawrence and Ottawa rivers. Teach <b>site</b> and <b>situation</b>, and give an example from your own town.',
      after: 'Use site and situation to explain why your own town or city grew where it did.' },
    words: [['site', 'the land a settlement is built on'], ['situation', 'where a settlement is compared with the places, rivers and routes around it']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Sort each fact into site or situation.', cols: ['Fact about Montréal', 'Site or situation?'],
        rows: [['It is on an island with good soil.', null], ['Ships from the Atlantic had to stop there.', null], ['It is near the mouth of the Ottawa River.', null], ['Mount Royal gives a view of the river.', null]],
        a: [[null, 'site'], [null, 'situation'], [null, 'situation'], [null, 'site']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'The map shows that Montréal is …',
        opts: ['where two rivers meet, just below rapids', 'on the Atlantic coast', 'far from any river', 'on the Great Lakes'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'How does the writer organize the main part of the text?',
        opts: ['into site, then situation, then today', 'as a story with characters', 'as a list of questions', 'from newest to oldest'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did the fur trade make Montréal rich? Use details about its situation.',
        a: 'Furs from the West came down the Ottawa and St. Lawrence rivers to Montréal, and ships from Europe could go no farther than the rapids, so all the trade passed through the city.', look: 'links the rivers and the rapids to trade passing through Montréal' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why do you think the writer mentions Hochelaga and the nations who travelled the rivers?',
        a: 'To show that Indigenous peoples chose this place first, for the same reasons: good land and river routes. Montréal’s history did not begin with Europeans.', look: 'recognizes the Indigenous history of the site and why it matters' },
      { k: 'choice', code: 'B3.2', q: 'In “Ships sailing up the St. Lawrence <b>could go</b> no farther,” the verb <b>could go</b> is in the …',
        opts: ['past tense', 'future tense', 'present tense', 'command form'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Which was harder for you to understand, site or situation? What helped you figure it out?',
        a: 'Situation was harder, because it is about connections, not the land itself. The map helped, because I could see how the rivers lead to Montréal.', look: 'names the harder idea and a specific strategy or feature that helped' }
    ]
  });

  P.add({
    id: 'g8-cocoa', subject: 'geography', form: 'Report',
    title: 'Who Earns from a Chocolate Bar?',
    deck: 'Most of the world’s cocoa is grown on small farms in West Africa. Most of the money ends up elsewhere.',
    hero: {
      photo: 'g8-cocoa-pods.jpg', credit: 'Photo: Milequem Diarassouba, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Cocoa pods growing on the trunk of a cacao tree in Soubré, Côte d’Ivoire. Each pod holds 30 to 50 beans.'
    },
    body: [
      'A chocolate bar begins on the trunk of a tree. Cacao trees grow only in hot, wet places near the equator. Their large pods, the size of a football, sprout straight from the trunk. Inside are beans wrapped in a sweet white pulp. Farmers cut the pods by hand with machetes, scoop out the beans, ferment them under banana leaves for about a week and dry them in the sun.',
      { fig: bars([[44, 'shops'], [35, 'chocolate', 'companies'], [14, 'traders,', 'grinders'], [7, 'cocoa', 'farmers']], { max: 50, step: 10, unit: '%' }),
        tall: 172, cap: 'Where the money from a chocolate bar goes, roughly. Estimates vary.' },
      { h: 'Small farms, big business' },
      'About two thirds of the world’s cocoa is grown in West Africa, mostly in Côte d’Ivoire and Ghana. Most of it comes from small family farms of a few hectares. Yet very little of the price of a chocolate bar returns to the farmer. Many cocoa farmers earn less than two dollars a day, and some cannot afford to send their children to school. Children are sometimes put to work on farms, using machetes and carrying heavy loads.',
      { box: 'Fair trade', text: 'A <b>fair trade</b> label means that farmers were paid at least a set minimum price, plus an extra amount for community projects such as schools and wells. It does not solve every problem, but it gives shoppers a choice.' },
      { h: 'Why so little?' },
      'Farmers sell their beans to traders, who sell them to companies that grind and process them, who sell to chocolate makers, who sell to shops. Each step in this <b>supply chain</b> takes a share. The price of cocoa beans also rises and falls on world markets, so a farmer’s income can drop sharply in a single year. Most of the value is added far from the farms, in factories in Europe and North America.',
      { h: 'Closing the gap' },
      'Some countries are trying to keep more of the value at home. Ghana and Côte d’Ivoire now charge buyers an extra fee per tonne to raise farmers’ pay, and both are building more factories to make cocoa products themselves. Farmers’ co-operatives join together to sell their beans at better prices. Shoppers, too, can ask where their chocolate comes from.'
    ],
    guide: { before: 'Unwrap a chocolate bar and ask who might have earned money from it. Teach <b>supply chain</b> and <b>fair trade</b>. Read the bar graph and note that the numbers are estimates.',
      after: 'Would you pay more for chocolate if you knew the farmer earned more? What else could make the system fairer?' },
    words: [['supply chain', 'all the steps and businesses that move a product from where it is made to the buyer'], ['fair trade', 'trade that pays producers a fair, set minimum price']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, who gets the smallest share?',
        opts: ['shops', 'chocolate companies', 'traders', 'cocoa farmers'], a: 3 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>Their</b> large pods sprout straight from the trunk.” <b>Their</b> refers to …',
        opts: ['cacao trees', 'farmers', 'chocolate bars', 'shops'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps in the cocoa supply chain.',
        items: ['Farmers harvest, ferment and dry the beans.', 'Traders buy the beans.', 'Companies grind and process them.', 'Chocolate makers make bars.', 'Shops sell the bars.'], show: [3, 0, 4, 2, 1] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do farmers earn so little even though the world loves chocolate? Give two reasons from the text.',
        a: 'Each step in the supply chain takes a share, and most value is added in factories far away. Cocoa prices also rise and fall, so farmers’ income is unstable.', look: 'two reasons (supply chain shares, value added elsewhere, price swings)' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Connect this text to something you buy. Do you know where it comes from and who made it? How could you find out?',
        a: 'I buy bananas but I do not know who grew them. I could read the label for the country and look for a fair trade logo, or look up the company online.', look: 'a real product and a practical way to learn its origin' },
      { k: 'choice', code: 'B2.2', q: 'A <b>co-operative</b> is a group of farmers who …',
        opts: ['work together and share the benefits', 'compete against each other', 'own a chocolate shop', 'work for the government'], a: 0 },
      { k: 'lines', code: 'D2.3', n: 4, q: 'Write a short message (3 or 4 sentences) to a chocolate company asking a question about its farmers. Use a polite but firm voice.',
        a: 'Answers will differ. For example: I enjoy your chocolate and want to keep buying it. Could you tell me how much your cocoa farmers are paid? Do you check that children are not working on the farms? Customers like me care about the answer.', look: 'a clear purpose, a polite and firm voice, and a question based on the text' }
    ]
  });

  P.add({
    id: 'g8-vaping', subject: 'health', form: 'Fact sheet',
    title: 'Vaping: Myths and Facts',
    deck: 'E-cigarettes are marketed as harmless. The evidence says otherwise.',
    hero: {
      photo: 'g8-vape.jpg', credit: 'Photo: Lindsay Fox, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A vape pen, or e-cigarette. It heats a liquid into an aerosol that the user breathes in.'
    },
    body: [
      'An e-cigarette, or vape, is a battery-powered device that heats a liquid until it becomes an <b>aerosol</b>, a mist of tiny droplets that the user breathes into the lungs. The liquids come in flavours such as mango and mint, and the devices can look like pens or USB sticks. Many young people believe vaping is safe. Here are some common beliefs, and what health researchers have found.',
      { fig: '<rect class="k" x="20" y="60" width="200" height="24" rx="12"/><rect class="h" x="30" y="64" width="80" height="16"/><path class="k" d="M220 66 H260 V78 H220"/><path class="t" d="M130 60 V84 M170 60 V84"/>' +
          D.label(20, 30, 'battery', 70, 64) + D.label(110, 120, 'heating coil', 150, 78) + D.label(170, 30, 'liquid (nicotine,', 190, 64) + tx(170, 44, 'n', 'flavour, chemicals)') + D.label(220, 120, 'mouthpiece', 252, 78) +
          '<path class="d" d="M266 72 Q280 60 290 70 Q296 80 286 88"/>' + tx(286, 104, 'n', 'aerosol', 'end'),
        tall: 132, cap: 'Inside a typical vape.' },
      { box: 'Who is the target?', text: 'Canada limits vape advertising that could appeal to young people, and some provinces, such as Nova Scotia and Quebec, have banned most flavoured vapes. Ask yourself: why would a company make a product taste like candy?' },
      { h: 'Myth: “It’s just water vapour.”' },
      'Fact: The aerosol is not steam. It contains tiny particles, flavouring chemicals and often metals from the heating coil. Some of these can irritate and damage the lungs. Scientists are still studying the long-term effects, because vapes have only been common for about fifteen years.',
      { h: 'Myth: “There’s no nicotine in mine.”' },
      'Fact: Most vapes sold in Canada contain nicotine, and some contain as much as a pack of cigarettes in a single pod. Even products labelled nicotine-free have sometimes been found to contain it. Nicotine is highly <b>addictive</b>, and teenage brains, which are still developing until about age 25, become hooked faster than adult brains. Nicotine can also affect memory, attention and mood.',
      { h: 'Myth: “I can quit any time.”' },
      'Fact: Many teens who vape say they want to quit and find it hard. Signs of addiction include cravings, feeling anxious or irritable without vaping, and vaping first thing in the morning. Help is available from doctors, school counsellors and free services such as quit-lines. Quitting usually takes more than one try, and that is normal. Many people find it easier with a plan: choose a quit date, tell a friend, and avoid the places and people that trigger cravings.',
      'Vaping is probably less harmful than smoking cigarettes for adults who switch completely. But for young people who have never smoked, health experts agree: the safest choice is not to start.'
    ],
    guide: { before: 'Ask what the child has heard about vaping, without judgment. Teach <b>aerosol</b> and <b>addictive</b>. Point out the myth-and-fact pattern before reading.',
      after: 'If a friend said, “It’s just water vapour,” what would you say? How could you say it without lecturing?' },
    words: [['aerosol', 'a mist of tiny droplets or particles in the air'], ['addictive', 'causing a strong need to keep using something, even when it causes harm']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'How is this fact sheet organized?',
        opts: ['myths followed by facts', 'time order', 'a story with a plot', 'compare two countries'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, what turns the liquid into an aerosol?',
        opts: ['the heating coil', 'the mouthpiece', 'the label', 'the user’s breath alone'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The box asks why a company would make a product taste like candy. What is the box suggesting about the companies’ purpose?',
        a: 'It suggests the companies want to attract young people, because candy flavours appeal to kids. Their goal is to sell more, not to protect health.', look: 'an inference about the companies’ target audience and purpose' },
      { k: 'table', code: 'C2.6', q: 'Complete the chart.', cols: ['Myth', 'Fact'],
        rows: [['It’s just water vapour.', null], ['There’s no nicotine in mine.', null], ['I can quit any time.', null]],
        a: [[null, 'The aerosol has particles, chemicals and metals.'], [null, 'Most vapes have nicotine, even some labelled nicotine-free.'], [null, 'Many teens find it hard to quit.']] },
      { k: 'choice', code: 'B2.1', q: 'The suffix <b>-ive</b> in add<b>ictive</b> turns a word into an adjective. Which word also uses <b>-ive</b> this way?',
        opts: ['persuasive', 'drive', 'olive', 'five'], a: 0 },
      { k: 'lines', code: 'A2.4', n: 3, q: 'Think about an ad you have seen for a product aimed at teenagers. What technique did it use, and how is it like the vape marketing described here?',
        a: 'An energy drink ad used bright colours and extreme sports to look exciting. Like candy-flavoured vapes, it makes the product seem fun and cool to young people.', look: 'a real ad, a named technique and a clear comparison' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The last paragraph says vaping is “probably less harmful than smoking” but warns teens not to start. Is this conclusion consistent? Explain.',
        a: 'Yes. It compares vaping only with smoking, for adults who already smoke. For teens who never smoked, vaping adds risk and addiction, so not starting is the safest choice.', look: 'explains the two different comparisons and why the conclusion holds' }
    ]
  });

  P.add({
    id: 'g8-jade-canoe', subject: 'arts', form: 'Report',
    title: 'Everyone in the Same Boat',
    deck: 'Bill Reid’s great bronze canoe carries thirteen passengers who do not always get along',
    hero: {
      photo: 'g8-haida-gwaii.jpg', credit: 'Photo: shankar s., CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'The full-size plaster model of Bill Reid’s <i>The Spirit of Haida Gwaii</i>, at the Canadian Museum of History in Gatineau, Quebec. The bronze Jade Canoe was cast from it.'
    },
    body: [
      'In the departures hall of Vancouver’s airport, travellers rushing to their gates often stop and stare. In front of them is a canoe six metres long, made of bronze turned a deep jade green. It is crowded with creatures, human and animal, paddling, pulling and arguing. This is <i>The Spirit of Haida Gwaii</i>, the most famous work of the Haida artist Bill Reid.',
      { fig: '<path class="k" d="M10 90 Q30 120 150 122 Q270 120 290 90 L270 96 Q150 106 30 96 Z"/><path class="k" d="M10 90 Q4 74 14 66 M290 90 Q298 74 286 64"/>' +
          [[40, 'Raven'], [80, 'Bear'], [120, 'Mouse Woman'], [160, 'Chief'], [200, 'Frog'], [240, 'Eagle']].map(function (c, i) { return '<circle class="t" cx="' + c[0] + '" cy="76" r="9"/>' + tx(c[0], i % 2 ? 50 : 38, 'n', c[1], 'middle') + '<path class="t" d="M' + c[0] + ' 67 V' + (i % 2 ? 54 : 42) + '"/>'; }).join('') +
          tx(150, 144, 'n', 'Raven steers; the Chief stands in the middle.', 'middle'),
        tall: 150, cap: 'Some of the thirteen passengers in the canoe (simplified).' },
      { box: 'From clay to bronze', text: 'Reid first made the figures in clay with a team of assistants. Moulds were taken, and the final sculpture was cast in bronze. Two castings exist: a black one in Washington, D.C., and the green one in Vancouver.' },
      { h: 'The artist' },
      'Bill Reid was born in Victoria in 1920 to a Haida mother and a father of Scottish and German ancestry. He grew up knowing little about his Haida heritage. As a young man working in radio, he began to study the carvings of his grandfather’s generation and trained as a jeweller. Over time, he became one of the artists who led a <b>revival</b> of Northwest Coast art, which had been suppressed for decades.',
      { h: 'A crowded canoe' },
      'The canoe carries thirteen figures from Haida stories. Raven, the trickster, holds the steering paddle, so no one can be sure where the boat is going. Bear and Bear Mother, their cubs, Beaver, Dogfish Woman, Frog, Eagle, Wolf and tiny Mouse Woman squeeze in beside a human paddler. In the centre stands the Chief, wrapped in a cloak and holding a tall staff. Some figures bite or push one another. Yet all of them paddle together.',
      { h: 'What does it mean?' },
      'Reid did not give one meaning for the sculpture, and viewers find many. Some see a picture of Canada itself: many peoples, often disagreeing, all in the same boat. Others see a reminder that people and animals share one world and depend on each other. Reid himself left the question open, and the sculpture keeps starting arguments, just as its passengers do.',
      'Reid died in 1998. From 2004, his work appeared on the back of the Canadian twenty-dollar bill, and today it inspires a new generation of Haida artists who carve, paint and weave the <b>formline</b> designs of their ancestors.'
    ],
    guide: { before: 'Find Haida Gwaii on a map of British Columbia. Teach <b>revival</b> and <b>formline</b> (the flowing outlines of Northwest Coast art). Look at the photo for a full minute before reading.',
      after: 'Who would be in a canoe that stood for your school or community? Who would steer?' },
    words: [['revival', 'bringing something back into use after it had almost disappeared'], ['formline', 'the flowing, curved outlines used in Northwest Coast Indigenous art']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might it matter that Raven, the trickster, steers the canoe?',
        opts: ['It suggests no one can be sure where the boat is going.', 'Raven is the strongest paddler.', 'Raven is the Chief.', 'It shows the canoe is sinking.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the drawing help readers do?',
        opts: ['find where some figures sit in the canoe', 'learn the price of bronze', 'see the airport map', 'read Haida words'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two Haida cultural elements in the sculpture, and explain why they matter to its meaning.',
        a: 'Figures from Haida stories, such as Raven and Mouse Woman, and the canoe itself, which was central to Haida travel and life. They show the sculpture comes from Haida culture and stories.', look: 'two cultural elements and their importance' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Some viewers see the canoe as a picture of Canada. Explain this idea, and say whether you agree.',
        a: 'Canada has many peoples who often disagree but must work together, like the figures who argue but all paddle. I agree, because a country only moves forward if everyone works together.', look: 'explains the metaphor of diversity and a reasoned opinion' },
      { k: 'choice', code: 'B3.2', q: 'In “Some figures <b>bite</b> or <b>push</b> one another,” the words in bold are …',
        opts: ['verbs', 'nouns', 'adjectives', 'adverbs'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think Reid refused to give one meaning for the sculpture?',
        a: 'He wanted viewers to think for themselves, and a big artwork can hold many meanings. Giving one answer would limit what people see in it.', look: 'a thoughtful inference supported by the text' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Did looking at the photo before reading help you understand this text? Explain, and set a goal for reading about art next time.',
        a: 'Yes. I had already noticed the crowd of figures, so the descriptions made sense. Next time I will look closely at the artwork and list what I notice before reading.', look: 'reflects on a strategy and sets a specific goal' }
    ]
  });

  P.add({
    id: 'g8-3d-printing', subject: 'tech', form: 'Explanation',
    title: 'Building Things Layer by Layer',
    deck: 'A 3D printer turns a computer drawing into a solid object, one thin slice at a time',
    hero: {
      photo: 'g8-3d-printer.jpg', credit: 'Photo: MukhtaromST, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A 3D printer at work. The nozzle moves back and forth, laying down melted plastic one layer at a time.'
    },
    body: [
      'Most factories make things by cutting material away, the way a sculptor carves stone, or by pouring it into a mould. A 3D printer works the opposite way. It builds an object by adding material, one thin layer on top of another. Engineers call this <b>additive manufacturing</b>.',
      { fig: '<rect class="k" x="40" y="130" width="220" height="10"/>' + [0, 1, 2, 3, 4, 5].map(function (i) { return '<rect class="' + (i === 5 ? 'a' : 'h') + '" x="' + (90 + i * 4) + '" y="' + (120 - i * 10) + '" width="' + (120 - i * 8) + '" height="10"/>'; }).join('') +
          '<path class="k" d="M150 20 V48 L144 56 H156 L150 48"/><path class="k" d="M30 16 H270"/>' + D.arrow(170, 30, 210, 30, 'k') +
          D.label(200, 72, 'hot nozzle', 152, 52) + D.label(10, 104, 'layers', 92, 108) + D.label(200, 156, 'build plate', 230, 138) + D.label(214, 48, 'moves left, right,', 200, 30) + tx(214, 62, 'n', 'forward and back'),
        tall: 160, cap: 'A printer melts plastic and adds one layer at a time.' },
      { h: 'From idea to object' },
      'First, a designer draws the object in 3D modelling software, or downloads a design. Next, a program called a slicer cuts the design into hundreds of horizontal layers, each perhaps 0.2 millimetres thick, and writes instructions for the printer. The most common home printers feed a thin plastic thread, called filament, into a hot nozzle that reaches about 200°C. The nozzle moves back and forth, drawing each layer like a hot-glue gun, and the plastic cools and hardens in seconds. A small object can take an hour; a large one can take a whole day.',
      { box: 'Not magic', text: 'Printed objects can be weaker along their layers, and printing many copies is slower than using a mould. For one or a few objects, though, printing is hard to beat.' },
      { h: 'What people print' },
      'Because a printer can build almost any shape, it is perfect for <b>prototypes</b>, the first test versions of a new design. Engineers can print a part, test it, change the drawing and print it again the same day. Doctors print models of a patient’s heart to plan a surgery. Volunteers print low-cost prosthetic hands for children. Some companies even print houses, squeezing concrete out of a huge nozzle. Astronauts on the International Space Station have printed tools, so they do not have to wait months for a delivery from Earth. In some schools, students print parts for robots they design and build themselves.',
      { h: 'Think before you print' },
      'Most home printers use plastic, so failed prints and unwanted objects add to waste. Many makers now use plant-based plastic, recycle their scraps and print only what they need. As the old rule of engineers says: measure twice, print once.'
    ],
    guide: { before: 'Hold up a plastic object and ask how it was made. Teach <b>additive</b>, <b>prototype</b> and <b>filament</b>. Follow the layers in the diagram from the bottom up.',
      after: 'If you had a 3D printer, what problem in your home or school would you design something to solve?' },
    words: [['additive manufacturing', 'making an object by adding material layer by layer'], ['prototypes', 'first test versions of a new design']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps from idea to object.',
        items: ['Draw the object in 3D software.', 'A slicer cuts the design into layers.', 'Filament is fed into the hot nozzle.', 'The nozzle draws each layer.', 'The plastic cools and hardens.'], show: [2, 4, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Why is the top layer in the diagram drawn differently?',
        opts: ['It is the layer being added now.', 'It is a different colour of plastic.', 'It is the build plate.', 'It is broken.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The nozzle draws each layer “like a hot-glue gun.” This comparison helps readers …',
        opts: ['picture how melted plastic is laid down', 'learn the price', 'know the temperature', 'see that it is dangerous'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Compare additive manufacturing with how a sculptor carves stone. How are they opposite?',
        a: 'A sculptor removes material until the shape is left. A 3D printer adds material, layer by layer, until the shape is built.', look: 'a clear contrast between removing and adding material' },
      { k: 'choice', code: 'B3.3', q: 'In “A small object can take an hour; a large one can take a whole day,” why is a semicolon used?',
        opts: ['to join two closely related sentences', 'to start a list', 'to show a quotation', 'to end a question'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why are 3D printers so useful for prototypes? Use evidence from the text.',
        a: 'Engineers can print a part, test it, change the design and print it again the same day, so they can improve a design quickly without making a mould.', look: 'speed of testing and changing designs, with a detail' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Does the writer present 3D printing in a balanced way? Find one positive and one negative point in the text.',
        a: 'Yes. A positive point is that doctors print heart models to plan surgery. A negative point is that plastic prints add to waste and can be weak along their layers.', look: 'one benefit and one drawback, and a judgment about balance' }
    ]
  });

  P.add({
    id: 'g8-pythagoras', subject: 'math', form: 'Explanation',
    title: 'The Carpenter’s Secret Triangle',
    deck: 'How builders use the numbers 3, 4 and 5 to make perfect square corners',
    hero: {
      photo: 'g8-house-frame.jpg', credit: 'Photo: Sebastian Wallroth, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A timber frame under construction. Every corner must be square, or the walls, floors and roof will not fit together.'
    },
    body: [
      'When builders lay out the walls of a house, they need perfect square corners: angles of exactly 90 degrees. A corner that is off by even one degree can leave a gap of several centimetres at the far end of a long wall. Builders cannot carry a giant protractor. Instead, they use a measuring tape and a triangle with sides of 3, 4 and 5.',
      { fig: '<path class="k" d="M40 140 H220 V5 Z"/><rect class="t" x="206" y="126" width="14" height="14"/>' +
          tx(130, 158, 'lb', '4 m', 'middle') + tx(232, 76, 'lb', '3 m') + tx(122, 66, 'lb', '5 m', 'end') +
          tx(10, 110, 'n', '3² + 4² = 5²') + tx(10, 126, 'n', '9 + 16 = 25'),
        tall: 164, cap: 'A 3-4-5 triangle always has a right angle opposite the longest side.' },
      { box: 'Older than Pythagoras', text: 'Babylonian clay tablets from about 3800 years ago list sets of numbers that fit this pattern, more than a thousand years before Pythagoras was born. Builders in ancient Egypt and China also used the idea.' },
      { h: 'The 3-4-5 rule' },
      'Here is how it works. From the corner, measure 4 metres along one wall and make a mark. Measure 3 metres along the other wall and make a second mark. Now measure the diagonal between the two marks. If it is exactly 5 metres, the corner is square. If it is longer, the angle is too wide; if it is shorter, the angle is too narrow. Builders call this “squaring” a corner.',
      { h: 'Why it works' },
      'The rule is a special case of the <b>Pythagorean theorem</b>, named after the Greek thinker Pythagoras. In any right triangle, if you square the two shorter sides and add them, you get the square of the longest side, the <b>hypotenuse</b>. For the 3-4-5 triangle: 3 × 3 = 9, 4 × 4 = 16, and 9 + 16 = 25, which is 5 × 5. The rule also works in reverse: if the sides fit the pattern, the angle must be a right angle.',
      { h: 'Bigger and smaller' },
      'Any multiple of 3-4-5 works too. For a large building, a crew might use 6, 8 and 10 metres, or even 9, 12 and 15, because a bigger triangle gives a more accurate result. For a small bookshelf, 30, 40 and 50 centimetres will do. Carpenters, bricklayers and even people marking out a soccer field use the same trick, because a tape measure is easier to carry than a giant square. A rule discovered thousands of years ago is still in every builder’s toolbox.'
    ],
    guide: { before: 'Mark a 3-4-5 triangle on the floor with tape and check the corner with a book. Teach <b>hypotenuse</b> and <b>Pythagorean theorem</b>. Read the equation in the diagram aloud.',
      after: 'Does 5, 12, 13 also make a right triangle? Check it with the theorem.' },
    words: [['Pythagorean theorem', 'in a right triangle, the squares of the two shorter sides add up to the square of the longest side'], ['hypotenuse', 'the longest side of a right triangle, opposite the right angle']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps for squaring a corner.',
        items: ['Measure 4 m along one wall and mark it.', 'Measure 3 m along the other wall and mark it.', 'Measure the diagonal between the marks.', 'Adjust the walls until the diagonal is 5 m.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C2.6', q: 'Complete the chart of triangles that make a square corner.', cols: ['Short side', 'Other short side', 'Longest side'],
        rows: [['3 m', '4 m', null], ['6 m', null, '10 m'], [null, '40 cm', '50 cm']],
        a: [[null, null, '5 m'], [null, '8 m', null], ['30 cm', null, null]] },
      { k: 'choice', code: 'C3.2', half: true, q: 'If the diagonal measures 5.2 m, the corner is …',
        opts: ['too wide', 'too narrow', 'perfectly square', 'impossible to tell'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the small square in the corner of the diagram show?',
        opts: ['a right angle', 'a window', 'the hypotenuse', '5 metres'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might a crew use 9, 12 and 15 metres instead of 3, 4 and 5 for a large building?',
        a: 'A bigger triangle gives a more accurate result. A tiny error in a small triangle becomes a big gap over a long wall.', look: 'explains accuracy over a long distance' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence uses <i>if</i> to show a condition and its result?',
        opts: ['If it is exactly 5 metres, the corner is square.', 'Builders cannot carry a giant protractor.', 'Here is how it works.', 'Any multiple of 3-4-5 works too.'], a: 0 },
      { k: 'lines', code: 'C1.2', n: 3, q: 'This math text includes history, building and an equation. How does mixing these help readers understand the theorem?',
        a: 'The building example shows why the theorem is useful, the equation shows how it works, and the history shows people have trusted it for thousands of years.', look: 'explains how at least two of the parts help understanding' }
    ]
  });

  P.add({
    id: 'g8-time-capsule', subject: 'story', form: 'Short story',
    title: 'Letter from 2001',
    deck: 'When the school opens its time capsule, one letter is addressed to a student who has not been born yet',
    hero: {
      photo: 'g8-time-capsule.jpg', credit: 'Photo: Dudley Council, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'An old newspaper found inside a library time capsule when it was opened.'
    },
    body: [
      'The <b>time capsule</b> came out of the wall on a grey Thursday in October. Mr. Ferreira, the caretaker, chiselled around the stone that said <i>Riverside Public School, 2001</i>, and the whole school watched from the field as he lifted out a dented metal box.',
      'Inside, wrapped in plastic, were a newspaper, a floppy disk nobody could open, a class photo of kids in baggy jeans, and a bundle of letters. Ms. Banerjee, our principal, read the envelopes aloud. Most were addressed “To a student in the future.” One was different. It said: <i>For whoever sits in the third seat of the second row in Room 12.</i>',
      'Room 12 is my classroom. The third seat of the second row is mine.',
      'Everyone stared at me. I am not someone people usually stare at. I opened the envelope with shaking fingers.',
      '<i>Dear Future Person,</i> it began. <i>I am twelve years old and today I got in trouble for passing a note in class, so now I am writing to you instead. I bet in your time there are flying cars and robots that do homework. I bet nobody gets in trouble for anything. I bet you are reading this on a computer the size of a fingernail.</i>',
      'The class laughed. I kept reading.',
      '<i>Here is my advice. Do not worry so much about what people think. I worry all the time, and it has never helped once. Also, the radiator under your window makes a noise like a cat. It is not a cat. I checked.</i>',
      { fig: '<rect class="k" x="20" y="10" width="260" height="140" rx="4"/><path class="k" d="M20 20 H280"/>' + [0, 1, 2, 3].map(function (r) { return [0, 1, 2, 3, 4].map(function (c) { var hit = r === 1 && c === 2; return '<rect class="' + (hit ? 'h' : 't') + '" x="' + (44 + c * 46) + '" y="' + (40 + r * 26) + '" width="30" height="16"/>'; }).join(''); }).join('') +
          tx(150, 32, 'n', 'front of Room 12', 'middle') + D.label(200, 146, 'third seat, second row', 152, 80),
        tall: 156, cap: 'The seating plan of Room 12. The hatched desk is Amaya’s.' },
      'I looked over. The radiator under our window made that noise every morning. I had always thought it sounded like a cat.',
      '<i>Your friend from the past, Leah Okonkwo, Grade 7.</i>',
      'Ms. Banerjee was very quiet. Then she said, “Leah Okonkwo. I think that’s Dr. Okonkwo. She runs the children’s hospital downtown.”',
      'That night I wrote Dr. Okonkwo an email. I told her there were no flying cars, that we still got in trouble for passing notes, and that the radiator still sounded like a cat. Then I told her that her advice had been <b>timely</b>, because lately I had been worrying a lot.',
      'She wrote back the next morning. <i>Dear Amaya, I am still working on that advice myself. — Leah.</i>'
    ],
    guide: { before: 'Ask what the child would put in a time capsule. Teach <b>timely</b> and discuss what letters from the past can show us. Point out the italic text and talk about why it is used.',
      after: 'What advice would you write to a student who sits in your seat in 25 years?' },
    words: [['timely', 'coming at just the right moment'], ['time capsule', 'a container of objects and letters sealed away for people to open in the future']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'Who is the narrator of the story?',
        opts: ['Amaya, a student in Room 12', 'Leah, who wrote the letter', 'Ms. Banerjee', 'an all-knowing narrator'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why are the words of Leah’s letter in italics?',
        opts: ['to show they are a different text inside the story', 'because they are shouted', 'because they are a title', 'to show they are not important'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Leah predicted flying cars and homework robots. Why is it ironic that the radiator is the thing that has not changed?',
        a: 'She expected huge changes, but the biggest thing she got right was a tiny, ordinary detail: the radiator still sounds like a cat. The future is less different than she imagined.', look: 'the gap between Leah’s expectations and what actually stayed the same' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Amaya say her advice was “timely”? What can you infer about Amaya?',
        a: 'Because Amaya had been worrying a lot lately. We can infer she is shy or anxious, since she says people do not usually stare at her.', look: 'an inference about Amaya, supported by two details' },
      { k: 'choice', code: 'C1.5', q: 'The story ends with Leah’s short reply. What is the effect of ending this way?',
        opts: ['It shows that adults still struggle with the same worries.', 'It explains the time capsule.', 'It tells us what happens next year.', 'It makes the story funny.'], a: 0 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'How does the seating plan help the reader understand an important moment in the story?',
        a: 'It shows exactly which desk the letter was for, so the reader sees that Leah’s letter really was meant for Amaya’s seat.', look: 'links the hatched desk to the letter’s address' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'When Amaya opened the envelope, what did you predict the letter would say? How did the story confirm or change your prediction?',
        a: 'I predicted it would be a mystery or a secret message. Instead, it was ordinary advice and a joke about the radiator, which made it more personal than I expected.', look: 'a prediction and how the story confirmed or changed it' }
    ]
  });

  P.add({
    id: 'g8-big-numbers', subject: 'math', form: 'Explanation',
    title: 'Writing the Universe Small',
    deck: 'How scientists write numbers too big and too small to say out loud',
    hero: {
      photo: 'g8-night-sky.jpg', credit: 'Photo: Grempz, CC BY 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'Stars over Thunder Lake, Alberta. On a dark night you can see about 2500 stars with your eyes alone.'
    },
    body: [
      'Light travels at about 300 000 000 metres per second. The Sun is about 150 000 000 000 metres from Earth. A human red blood cell is about 0.000 008 metres wide. Numbers like these are hard to read, easy to copy wrongly, and almost impossible to compare at a glance. Scientists solve the problem with <b>scientific notation</b>.',
      { h: 'Moving the decimal point' },
      'A number in scientific notation has two parts. The first is a number from 1 up to (but not including) 10. The second is a power of 10, which tells you how many places to move the decimal point. To write 300 000 000, put the decimal after the 3 and count the places to the end: 8. So the speed of light is 3 × 10<sup>8</sup> metres per second. The distance to the Sun is 1.5 × 10<sup>11</sup> metres.',
      'For tiny numbers, the <b>exponent</b> is negative. To write 0.000 008, move the decimal point 6 places to the right to reach 8. The red blood cell is 8 × 10<sup>−6</sup> metres wide. A negative exponent means the number is smaller than 1. It does not mean the number is below zero. A virus, at about 1 × 10<sup>−7</sup> metres, is smaller still: you could line up about eighty of them across one red blood cell.',
      { h: 'Why scientists love it' },
      'Scientific notation makes comparing easy. Is the Sun or the Moon farther from Earth? The Moon is about 3.8 × 10<sup>8</sup> metres away, and the Sun 1.5 × 10<sup>11</sup>. Compare the exponents, 8 and 11, and you know at once that the Sun is roughly a thousand times farther. Calculators and spreadsheets use a version of it too: when a number is too long for the screen, you might see <i>1.5E11</i>, which means the same thing. Astronomers, chemists and doctors all use the same notation, so a number written in Canada can be read without confusion in Japan or Brazil. It is one of the few languages that every scientist on Earth shares.',
      { fig: '<path class="k" d="M10 70 H290"/>' + [['10⁻⁶', 'a cell', 30], ['10⁰', 'a metre', 90], ['10⁶', 'Toronto to Montréal (about)', 150], ['10¹¹', 'Earth to Sun', 200], ['10¹⁶', 'nearest star', 250]].map(function (p, i) { return '<path class="k" d="M' + p[2] + ' 64 V76"/>' + tx(p[2], i % 2 ? 98 : 52, 'lb', p[0], i === 4 ? 'end' : 'middle') + tx(p[2], i % 2 ? 112 : 38, 'n', p[1], i === 4 ? 'end' : i === 0 ? 'start' : 'middle'); }).join(''),
        tall: 124, cap: 'Sizes and distances in metres, on a scale where each step is a power of 10 (rounded).' },
      { box: 'Quick check', text: 'A bigger exponent means a bigger number. 2 × 10<sup>9</sup> is a thousand times bigger than 2 × 10<sup>6</sup>, because 9 − 6 = 3, and 10 × 10 × 10 = 1000.' }
    ],
    guide: { before: 'Write 1 000 000 and count the zeros together. Teach <b>exponent</b> and <b>scientific notation</b>. Read each number on the scale line aloud.',
      after: 'Find a very large or very small number in a news story or science book. Write it in scientific notation.' },
    words: [['scientific notation', 'a way to write a number as a number from 1 to 10 times a power of 10'], ['exponent', 'the small raised number that shows how many times to multiply by 10']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Complete the chart.', cols: ['Standard form', 'Scientific notation'],
        rows: [['300 000 000', null], [null, '1.5 × 10¹¹'], ['0.000 008', null]],
        a: [[null, '3 × 10⁸'], ['150 000 000 000', null], [null, '8 × 10⁻⁶']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'On the scale line, why is a cell at the far left?',
        opts: ['It is the smallest size shown.', 'It is the farthest away.', 'It is the most important.', 'It was found first.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'What does a negative exponent tell you?',
        opts: ['The number is smaller than 1.', 'The number is below zero.', 'The answer is wrong.', 'The number is very large.'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which part of this text was hardest to follow? What did you do to understand it?',
        a: 'Moving the decimal for tiny numbers was hard. I reread the example and counted the places on paper, then checked with the box.', look: 'names a hard part and a fix-up strategy that fits it' },
      { k: 'choice', code: 'B2.2', q: 'In this text, <b>notation</b> means …',
        opts: ['a system of writing using symbols', 'a short letter', 'a musical note', 'a bank note'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Explain how comparing exponents shows that the Sun is about a thousand times farther away than the Moon.',
        a: 'The Moon is 3.8 × 10⁸ m and the Sun 1.5 × 10¹¹ m. The exponents differ by 3, and 10 × 10 × 10 = 1000, so the Sun is roughly a thousand times farther.', look: 'uses the difference in exponents (3) and 10³ = 1000' },
      { k: 'lines', code: 'B1.5', n: 3, q: 'Explain to a partner how to write 4 500 000 in scientific notation. Use the words <i>decimal point</i> and <i>exponent</i>.',
        a: 'Put the decimal point after the 4 to get 4.5. Count how many places you moved it: 6. The exponent is 6, so it is 4.5 × 10⁶.', look: 'correct answer and both terms used correctly' }
    ]
  });

  P.add({
    id: 'g8-privacy', subject: 'social', form: 'Opinion article',
    title: 'Read the Fine Print',
    deck: 'A Grade 8 columnist asks why we click “I agree” without reading, and what we are really agreeing to',
    hero: {
      photo: 'g8-smartphone.jpg', credit: 'Photo: Beth Kanter, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A smartphone. The apps on a typical phone may collect location, contacts, photos and more.'
    },
    body: [
      'Be honest. When you downloaded your last app, did you read the terms of service before you tapped “I agree”? Neither did I. Neither did almost anyone. One study found that most people spend less than a minute on agreements that would take half an hour to read. I decided to find out what I had been agreeing to. The answer worried me.',
      { fig: flow(['You use a free app', 'The app collects your data', 'Data goes to advertisers', 'They build a profile of you', 'You see ads made for you']),
        tall: 190, cap: 'How a free app can earn money from your data.' },
      { h: 'What apps collect' },
      'Many free apps collect your <b>personal data</b>: your name and birthday, but also your location, your contacts, the photos on your phone, what you search for and how long you look at each post. Some sell or share that data with advertisers, who use it to build a profile of you. That is why an ad for running shoes follows you around the internet after you search for them once. In the world of free apps, there is an old saying: if you are not paying for the product, you are the product.',
      { h: 'Your digital footprint' },
      'Everything you post, like, share or search leaves a trace, called your <b>digital footprint</b>. A photo you post at thirteen could still be found when you apply for a job at twenty-three. Even a deleted post may have been copied, screenshotted or stored on a company’s servers.',
      { h: 'What I am doing now' },
      'I am not deleting all my apps. But I have changed some habits, and I think you should too. I turned off location for every app that does not need it: why does a flashlight app need to know where I am? I set my accounts to private. Before I post a photo of a friend, I ask them first. And when an agreement is too long, I search for a summary written by a trusted source, such as a privacy commissioner.',
      { box: 'Know your rights', text: 'Canada has privacy laws that say companies must tell you why they collect your personal information and must get your consent. You can ask a company what information it holds about you.' },
      'Our data is valuable. Companies know it. It is time we knew it too.'
    ],
    guide: { before: 'Open the settings on a phone or tablet together and look at the location permissions. Teach <b>personal data</b>, <b>consent</b> and <b>digital footprint</b>.',
      after: 'Which app on your device collects the most data? Is the app worth it to you? Why?' },
    words: [['personal data', 'information about you, such as your name, location or what you search for'], ['digital footprint', 'the trail of information you leave online']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What tells you this is an opinion article?',
        opts: ['The writer uses “I” and tries to persuade readers.', 'It has numbered steps.', 'It tells a made-up story.', 'It is a list of facts with no opinions.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the flow chart show?',
        opts: ['how a free app can make money from your data', 'how to download an app', 'how to delete a post', 'how phones are built'], a: 0 },
      { k: 'lines', code: 'A2.2', n: 3, q: 'List two privacy habits the writer now uses. Explain how each protects them.',
        a: 'Turning off location for apps that do not need it stops companies from tracking where they go. Setting accounts to private means only people they choose can see their posts.', look: 'two habits from the text and how each protects privacy' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Explain the saying “if you are not paying for the product, you are the product.”',
        a: 'Free apps earn money by collecting your data and selling it to advertisers, so your information is what is really being sold.', look: 'connects the saying to data being sold to advertisers' },
      { k: 'choice', code: 'B3.2', q: '“Neither did I.” In this sentence, the word <b>I</b> is a …',
        opts: ['pronoun', 'verb', 'adjective', 'preposition'], a: 0 },
      { k: 'lines', code: 'A2.1', n: 3, q: 'The writer asks friends before posting their photos. Why is this a responsibility, not just good manners?',
        a: 'A photo becomes part of the friend’s digital footprint too, and it might be found years later. Each person has the right to decide what is posted about them.', look: 'connects consent and another person’s digital footprint or rights' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the writer’s argument in two sentences.',
        a: 'Most people agree to app terms without reading them, and many free apps collect and share their personal data. We should take simple steps, like limiting permissions and posting carefully, to protect our privacy.', look: 'the problem and the call to action, in their own words' }
    ]
  });

  P.add({
    id: 'g8-jingle-dress', subject: 'arts', form: 'Report',
    title: 'The Dress That Heals',
    deck: 'The jingle dress dance began in an Ojibwe community about a hundred years ago. Today it is danced across Turtle Island.',
    hero: {
      photo: 'g8-jingle-dress.jpg', credit: 'Photo: Daderot, CC0, Wikimedia Commons', focus: '50% 30%',
      tall: 190,
      cap: 'A jingle dress from the Day Star First Nation in Saskatchewan, made in the mid-1900s, at the Glenbow Museum in Calgary.'
    },
    body: [
      'Listen before you look. At a <b>powwow</b>, a jingle dress dancer makes a sound like falling rain. Her dress is covered in hundreds of metal cones, called jingles, sewn in rows. As she dances, light, quick steps close to the ground, the cones strike one another and shimmer.',
      { fig: '<path class="k" d="M150 10 Q130 12 128 34 L100 140 H200 L172 34 Q170 12 150 10 Z"/>' +
          [60, 84, 108, 132].map(function (y) { var w = (y - 34) * 0.27 + 22; var s = ''; for (var x = 150 - w; x <= 150 + w; x += 10) s += '<path class="a" d="M' + x + ' ' + y + ' l-3 8 h6 Z"/>'; return s; }).join('') +
          D.label(220, 70, 'rows of metal cones', 178, 82) + D.label(220, 120, '365 jingles is', 192, 128) + tx(220, 134, 'n', 'a common number') + D.label(10, 40, 'lightweight cloth', 132, 40),
        tall: 150, cap: 'A jingle dress. Many dancers sew one jingle for each day of the year.' },
      { box: 'At a powwow', text: 'Listen to the emcee. Stand during the Grand Entry and honour songs. Ask before taking photos of dancers. A dancer’s outfit is called <b>regalia</b>, not a costume: many pieces are gifts with personal meaning.' },
      { h: 'A dream and a healing' },
      'The jingle dress is usually traced to Ojibwe communities near Lake of the Woods, in the border region between northwestern Ontario and Minnesota, around the time of the 1918 influenza pandemic. Different communities tell the story in different ways. In one widely shared version, a man’s granddaughter was very sick. In a dream, he was shown how to make a dress that rang as the wearer moved, and how to dance in it. The family made the dress, the girl danced, and she grew stronger with every step. The dance spread from community to community as a healing dance.',
      { h: 'Banned, then reborn' },
      'For decades, Canadian and American laws restricted Indigenous dances and ceremonies, and government agents discouraged powwows. Families kept the jingle dress dance alive, often quietly. When the bans were lifted, the dance spread widely. Today, jingle dress is one of the most popular categories at powwows across North America, from Manitoulin Island to Montana.',
      { h: 'Healing for today' },
      'In 2020, during another pandemic, jingle dress dancers posted videos of themselves dancing alone, in their yards and kitchens, offering prayers for the sick. A tradition born in one pandemic had come full circle in another. Many dancers say that when they dance, they do not dance for themselves, but for someone who needs healing. Young girls often receive their first jingle dress from a relative, who sews every cone on by hand, with care.'
    ],
    guide: { before: 'If possible, watch a short video of jingle dress dancing shared by an Indigenous creator or nation. Teach <b>regalia</b> and <b>powwow</b>. This text shares a widely told origin story; explain that versions differ between communities.',
      after: 'The text says dancers dance for someone who needs healing. How is this purpose different from dancing in a competition or a show?' },
    words: [['regalia', 'the clothing and items worn by a dancer for ceremony or powwow'], ['powwow', 'a gathering of Indigenous peoples with dancing, singing, drumming and community']],
    qs: [
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why is it important to say <i>regalia</i>, not <i>costume</i>? Use the text.',
        a: 'A costume is something you dress up in for fun. Regalia has personal and spiritual meaning, and many pieces are gifts, so calling it a costume is disrespectful.', look: 'explains the cultural meaning behind the word choice' },
      { k: 'choice', code: 'C1.5', half: true, q: 'The writer compares the sound of the dress to “falling rain.” This helps readers …',
        opts: ['imagine the soft, shimmering sound', 'know the weather at a powwow', 'learn the number of jingles', 'see the colour of the dress'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show that the text does not?',
        opts: ['that 365 jingles is a common number', 'that the dance began in 1918', 'where Montana is', 'how the girl got sick'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number these events in order.',
        items: ['A grandfather dreams of the dress.', 'The girl dances and grows stronger.', 'Laws restrict Indigenous dances.', 'The dance spreads widely after the bans are lifted.', 'Dancers share videos during the 2020 pandemic.'], show: [3, 0, 4, 2, 1] },
      { k: 'lines', code: 'A3.3', n: 3, q: 'What does the jingle dress tradition show about how First Nations communities think about healing?',
        a: 'Healing is not only medicine. It also includes prayer, dance, community and helping others, since dancers dance for someone who needs healing.', look: 'a way of knowing about healing drawn from the text' },
      { k: 'choice', code: 'C1.1', q: '“A tradition born in one pandemic had come full circle in another.” The two pandemics are …',
        opts: ['the 1918 influenza and the 2020 pandemic', 'two powwows', 'Ontario and Minnesota', 'two kinds of dance'], a: 0 },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Have you attended or seen a powwow or another cultural celebration? What did you already know that helped you understand this text?',
        a: 'I went to a powwow at a park. I remembered the Grand Entry and the drumming, so I could picture the dancers and understand why people stand for honour songs.', look: 'a specific experience or prior knowledge linked to the text' }
    ]
  });

  P.add({
    id: 'g8-winter-road', subject: 'story', form: 'Poem', plain: true,
    title: 'The Winter Road',
    deck: 'A poem about the roads made of ice that connect northern communities for a few weeks each year',
    hero: {
      photo: 'g8-ice-road.jpg', credit: 'Photo: Ian Mackenzie, CC BY 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 170,
      cap: 'Thick, clear lake ice in the Northwest Territories. When lakes and rivers freeze deep enough, trucks can drive across them.'
    },
    body: [
      '<i>In many northern communities in Canada, there is no road to the rest of the country for most of the year. Supplies come by plane, which is expensive. But for a few weeks each winter, when lakes and muskeg freeze hard, crews plough and flood a <b>winter road</b> across the ice. This poem is spoken by a girl who lives in one of those communities.</i>',
      '<b>I.</b> In summer we are an island with no sea around it,<br>only lakes and black spruce and the hum of the small plane<br>that brings the mail on Tuesdays,<br>and milk that costs as much as a pair of new mitts.',
      '<b>II.</b> In January my uncle drills the ice and reads it like a page:<br>thirty centimetres, forty, fifty.<br>When it is thick enough to hold a truck, the ploughs come,<br>scraping a long white sentence across the lake.',
      { fig: '<path class="k" d="M10 30 H290"/><path class="h" d="M10 30 H290 V62 H10 Z"/>' + D.ripple(10, 290, 84, 't') +
          '<rect class="k" x="110" y="8" width="60" height="18" rx="3"/><circle class="k" cx="122" cy="27" r="4"/><circle class="k" cx="158" cy="27" r="4"/>' +
          D.label(200, 46, 'ice, about 1 m thick', 240, 48) + tx(150, 104, 'n', 'lake water below', 'middle') + D.label(196, 12, 'loaded truck', 170, 16),
        tall: 110, cap: 'A loaded truck needs thick ice. Crews measure it often.' },
      '<b>III.</b> Then the trucks arrive at night,<br>headlights in a line like a string of beads,<br>carrying lumber, fuel, a new washing machine,<br>a whole winter of groceries, my cousin home from college.<br>My grandmother says the road is a guest:<br>you welcome it, you feed it, you know it will not stay.',
      '<b>IV.</b> Each year the guest arrives later. Each year it leaves sooner.<br>The ice thinks harder about holding us.<br>The men and women in the band office talk about a real road,<br>gravel, all-season, open in July,<br>and I want it, I do. Cheaper milk. A doctor who can drive in.<br>But I will miss the night the lake becomes a highway,<br>the whole north holding its breath,<br>listening to the ice <b>sing</b>.',
      '<b>V.</b> In April the guest packs up quietly.<br>The ploughed line goes soft and grey, then disappears,<br>and we are an island again, waiting for Tuesday,<br>for the plane, for the hum,<br>for the long white sentence to be written one more time.',
      { box: 'A note on the poem', text: 'Warmer winters are shortening the ice road season in parts of northern Canada. Some communities, working with governments, are building all-season roads, which cost millions of dollars for each kilometre.' }
    ],
    guide: { before: 'Find northern Manitoba or northwestern Ontario on a map and explain that some First Nations have no year-round road. Teach <b>winter road</b> and <b>muskeg</b>. Read the poem aloud together, pausing at each line break.',
      after: 'The speaker wants an all-season road but will miss the ice road. Have you ever wanted a change but felt you would miss something too?' },
    words: [['winter road', 'a seasonal road built over frozen lakes, rivers and land'], ['sing', 'here, the cracking and booming sounds that thick lake ice makes']],
    qs: [
      { k: 'lines', code: 'C1.5', n: 3, q: 'The poet calls the ploughed road “a long white sentence across the lake.” Explain this metaphor.',
        a: 'The road is long, thin and white on the ice, like a line of writing on a page. It also connects with the uncle “reading” the ice like a page.', look: 'explains the comparison and notices the reading or page connection' },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who is the speaker of the poem?',
        opts: ['a girl in a northern community', 'a truck driver', 'the uncle', 'a scientist'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: '“Milk that costs as much as a pair of new mitts” shows that …',
        opts: ['food is very expensive when it arrives by plane', 'milk is not sold there', 'mitts are free', 'the speaker does not like milk'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Find an example of personification (a non-human thing given human actions) in part IV. What does it suggest?',
        a: '“The ice thinks harder about holding us.” It suggests the ice is becoming less reliable, as if it is unsure whether to hold the trucks, because winters are getting warmer.', look: 'a correct example and what it suggests about change' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The grandmother says the road is “a guest.” What does she mean? How does part IV develop this idea?',
        a: 'The road comes for a short time and must be welcomed and cared for, but it always leaves. In part IV, the guest arrives later and leaves sooner, showing climate change.', look: 'explains the metaphor and links it to the change in part IV' },
      { k: 'choice', code: 'B3.3', q: 'Why does the poem have no full stop at the end of most lines?',
        opts: ['Lines in poems often break in the middle of sentences.', 'The writer forgot.', 'Each line is a separate question.', 'Poems never use punctuation.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The speaker says “I want it, I do. But I will miss …” What two positions about an all-season road does the poem show?',
        a: 'An all-season road would make supplies cheaper and the community less isolated. But the ice road is a special, shared experience and part of the community’s way of life.', look: 'two positions fairly described, with evidence from the poem' }
    ]
  });


})();
