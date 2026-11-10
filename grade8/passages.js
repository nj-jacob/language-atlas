/* Grade 8 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  /* number with a space in 5 or more digits (12 500) */
  function num(v) { var s = String(v); return /^\d{5,}$/.test(s) ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s; }
  function tx(x, y, cls, t, anchor) { return '<text class="' + cls + '" x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + t + '</text>'; }
  /* a bar chart, 300 wide and about 172 tall: rows [[value, 'label', 'second line'], ...], o { max, step, unit, pre } */
  function bars(rows, o) {
    var top = 26, bot = 136, x0 = o.x0 || 46, w = (296 - x0) / rows.length, s = (bot - top) / o.max, u = o.unit || '', pre = o.pre || '';
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
          tx(160, 14, 'n', 'weight of the ship') + tx(160, 146, 'n', 'buoyant force') + D.label(196, 126, 'water pushed aside', 204, 100) + D.label(6, 92, 'water line', 74, 70),
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
      { fig: '<path class="k" d="M20 50 H290 M20 116 H290"/>' + [0, 1, 2, 3, 4].map(function (i) { var x = 20 + i * 65; return '<path class="t" d="M' + x + ' 44 V56 M' + x + ' 110 V122"/>' + tx(x, 38, 'lb', num(i * 40), 'middle') + tx(x, 140, 'lb', i, 'middle'); }).join('') +
          tx(20, 16, 'n', 'litres of sap') + tx(20, 160, 'n', 'litres of syrup') + D.arrow(85, 60, 85, 104, 'a'),
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
          D.label(40, 50, 'Golden Stairs', 168, 46),
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
      { fig: '<path class="k" d="M56 40 H290 M56 100 H290"/>' + tx(50, 44, 'n', 'singer 1', 'end') + tx(50, 104, 'n', 'singer 2', 'end') +
          [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var x = 64 + i * 28; return (i % 2 ? '<path class="h" d="M' + x + ' 100 v-20 h18 v20"/>' : '<path class="h" d="M' + x + ' 40 v-20 h18 v20"/>') + (i % 2 ? '<path class="t" d="M' + x + ' 40 h18"/>' : '<path class="t" d="M' + x + ' 100 h18"/>'); }).join('') +
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
          tx(40, 144, 'n', 'small piston', 'middle') + tx(296, 144, 'n', 'large piston (8 × the area)', 'end') + tx(150, 112, 'n', 'oil', 'middle'),
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
      { fig: '<path class="k" d="M20 40 H290 M20 100 H290"/>' + [0, 1, 2, 3, 4, 5, 6].map(function (i) { var x = 20 + i * 45; return '<path class="t" d="M' + x + ' 34 V46 M' + x + ' 94 V106"/>' + tx(x, 130, 'n', ['8 pm', '10 pm', '12 am', '2 am', '4 am', '6 am', '8 am'][i], i === 6 ? 'end' : 'middle'); }).join('') +
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
      { fig: '<rect class="k" x="20" y="10" width="236" height="150"/><path class="d" d="M20 74 H256 M20 104 H256"/><path class="k" d="M150 160 C146 120 156 80 148 22"/>' +
          '<path class="t" d="M148 40 Q110 30 80 44 M150 60 Q190 48 220 62 M149 84 Q120 78 96 90"/>' +
          tx(262, 44, 'n', 'sky') + tx(262, 92, 'n', 'hills') + tx(262, 134, 'n', 'water') + D.label(176, 150, 'tree', 152, 124),
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
          D.label(196, 30, 'coarse focus', 222, 68) + D.label(240, 130, 'fine focus', 230, 108) + D.label(196, 168, 'light', 150, 150),
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
      { fig: bars([[1, 'water'], [50, 'cooking', 'oil'], [100, 'maple', 'syrup'], [250, 'liquid', 'honey', '']], { max: 250, step: 50 }),
        tall: 172, cap: 'Seconds to drain a funnel in a made-up class test: the more viscous the liquid, the longer it takes to drain.' },
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
          D.label(200, 72, 'hot nozzle', 152, 52) + D.label(10, 104, 'layers', 92, 108) + D.label(200, 156, 'build plate', 230, 138) + tx(216, 34, 'n', 'moves'),
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
          tx(150, 32, 'n', 'front of Room 12', 'middle') + D.label(160, 146, 'third seat, second row', 152, 82),
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
      { fig: '<path class="k" d="M10 70 H290"/>' + [['10⁻⁶', 'a cell', 30], ['10⁰', 'a metre', 85], ['10⁶', 'Toronto to Montréal', 140], ['10¹¹', 'Earth to Sun', 200], ['10¹⁶', 'nearest star', 270]].map(function (p, i) { return '<path class="k" d="M' + p[2] + ' 64 V76"/>' + tx(p[2], i % 2 ? 98 : 52, 'lb', p[0], i === 4 ? 'end' : 'middle') + tx(p[2], i % 2 ? 112 : 38, 'n', p[1], i === 4 ? 'end' : i === 0 ? 'start' : 'middle'); }).join(''),
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
          D.label(212, 70, 'metal cones', 178, 82) + D.label(212, 120, 'often 365', 192, 128) + tx(212, 134, 'n', 'of them') + D.label(10, 40, 'lightweight cloth', 132, 40),
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
      { fig: '<path class="k" d="M10 30 H290"/><path class="h" d="M10 30 H290 V62 H10 Z"/>' + D.ripple(10, 290, 94, 't') +
          '<rect class="k" x="110" y="8" width="60" height="18" rx="3"/><circle class="k" cx="122" cy="27" r="4"/><circle class="k" cx="158" cy="27" r="4"/>' +
          D.label(186, 82, 'ice, about 1 m thick', 220, 58) + tx(150, 114, 'n', 'lake water below', 'middle') + D.label(196, 12, 'loaded truck', 170, 16),
        tall: 120, cap: 'A loaded truck needs thick ice. Crews measure it often.' },
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

  P.add({
    id: 'g8-immune-cells', subject: 'science', form: 'Explanation',
    title: 'The Cells That Fight Back',
    deck: 'Every day, white blood cells hunt down invaders you never knew were there',
    hero: {
      photo: 'g8-neutrophil.jpg', credit: 'Image: NIAID, National Institutes of Health, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A white blood cell called a neutrophil (large, purple) attacking bacteria (small, yellow), seen with an electron microscope and coloured to show the parts.'
    },
    body: [
      'Right now, bacteria are landing on your skin, drifting into your nose and riding on your food. Most never make you sick. Your skin, the mucus in your nose and the acid in your stomach stop many of them at the door. The rest meet a second line of defence. That is because your body has an army of cells that recognizes invaders and destroys them. Together, these cells and organs make up your <b>immune system</b>.',
      { h: 'The first responders' },
      'If bacteria get through a cut in your skin, the first cells to arrive are usually neutrophils, a kind of white blood cell. They squeeze out of tiny blood vessels and crawl toward the invaders, following chemical signals. When a neutrophil reaches a bacterium, it wraps around it and swallows it whole, then breaks it down inside. This is why a cut becomes red, warm and swollen: blood rushes to the area, carrying more fighters.',
      { h: 'The specialists' },
      'Other white blood cells are slower but smarter. Some make <b>antibodies</b>, Y-shaped proteins that lock onto one particular germ, like a key fitting a single lock. Antibodies mark the germ so that other cells can destroy it. The first time your body meets a new germ, making the right antibodies can take a week or more, which is why you feel sick for a while. A fever during an infection is not a mistake: a higher temperature can slow some germs down and speed up the body’s defenders.',
      { h: 'Remembering the enemy' },
      'After the infection is over, some of these cells stay behind as memory cells. If the same germ returns, they recognize it at once and make antibodies quickly, often before you feel sick at all. This is called <b>immunity</b>.',
      { fig: '<circle class="k" cx="60" cy="80" r="40"/><circle class="h" cx="60" cy="80" r="14"/>' + [[120, 60], [128, 96], [150, 76]].map(function (p) { return '<ellipse class="a" cx="' + p[0] + '" cy="' + p[1] + '" rx="9" ry="5"/>'; }).join('') +
          D.arrow(104, 80, 112, 76, 'k') + '<circle class="k" cx="236" cy="80" r="42"/><ellipse class="a" cx="236" cy="80" rx="9" ry="5"/><circle class="t" cx="236" cy="80" r="16"/>' + D.arrow(170, 80, 188, 80, 'k') +
          tx(60, 140, 'n', '1. finds bacteria', 'middle') + tx(236, 140, 'n', '2. swallows and digests', 'middle') + D.label(8, 20, 'white blood cell', 40, 46) + D.label(140, 30, 'bacteria', 124, 54),
        tall: 150, cap: 'A white blood cell swallows bacteria and breaks them down.' },
      { box: 'How vaccines help', text: 'A vaccine shows the immune system a harmless piece or copy of a germ. The body makes memory cells without getting the disease, so it is ready if the real germ arrives.' },
      'Your immune system is a system in the true sense: many kinds of cells, each with a job, working together and passing signals. When one part fails, as in some illnesses, the whole body becomes easier to infect. When it works, you never notice the battle at all.'
    ],
    guide: { before: 'Ask what happens when a cut gets red and swollen. Teach <b>immune system</b>, <b>antibodies</b> and <b>immunity</b>. Explain that the photo is coloured by scientists to show the parts.',
      after: 'Why do you think scientists call the immune system a “system”? What other systems in your body work together?' },
    words: [['immune system', 'the cells and organs that protect the body from germs'], ['antibodies', 'proteins that lock onto a particular germ so it can be destroyed'], ['immunity', 'the body’s ability to resist a germ it has met before']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Complete the chart.', cols: ['Cell or protein', 'Its job'],
        rows: [['neutrophil', null], [null, 'locks onto one particular germ'], ['memory cell', null]],
        a: [[null, 'finds and swallows bacteria'], ['antibody', null], [null, 'recognizes a returning germ and makes antibodies quickly']] },
      { k: 'choice', code: 'C1.5', half: true, q: 'The writer says antibodies fit a germ “like a key fitting a single lock.” This means each antibody …',
        opts: ['matches only one kind of germ', 'opens doors in cells', 'is made of metal', 'works on every germ'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> squeeze out of tiny blood vessels.” <b>They</b> refers to …',
        opts: ['neutrophils', 'bacteria', 'antibodies', 'cuts'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does a cut become red, warm and swollen? Explain using the text.',
        a: 'Blood rushes to the area, carrying more white blood cells to fight the bacteria. The extra blood makes the cut red, warm and swollen.', look: 'connects blood flow to the fighting cells and the symptoms' },
      { k: 'lines', code: 'C1.4', n: 3, q: 'The photo has been coloured. Why might scientists add colour to an electron microscope image?',
        a: 'Electron microscopes make black-and-white images. Adding colour helps viewers tell the white blood cell apart from the bacteria.', look: 'explains that colour helps viewers see the different parts' },
      { k: 'choice', code: 'B2.1', q: 'The prefix <b>anti-</b> in <b>anti</b>body means “against.” Which word also uses anti- this way?',
        opts: ['antibiotic', 'antelope', 'antenna', 'anticipate'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize how the body becomes immune to a germ.',
        a: 'The first time a germ arrives, white blood cells make antibodies, which takes time. Afterward, memory cells stay behind, so the next time they make antibodies quickly and the person may not get sick.', look: 'first infection, antibodies, memory cells, faster response' }
    ]
  });

  P.add({
    id: 'g8-paramecium', subject: 'science', form: 'Report',
    title: 'A Whole Life in One Cell',
    deck: 'A paramecium has no brain, no mouth and no legs. It swims, eats and escapes danger anyway.',
    hero: {
      photo: 'g8-paramecium.jpg', credit: 'Photo: Fritzmann2002, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A paramecium seen through a light microscope. It is about a quarter of a millimetre long, just visible as a speck to the naked eye.'
    },
    body: [
      'Put a drop of pond water under a microscope and you may see a tiny slipper-shaped creature racing across the slide. It spins, reverses and changes direction. This is a paramecium, and its entire body is a single cell. Organisms like it are called <b>unicellular</b>. Everything a large animal does with organs, a paramecium does inside one cell, using tiny structures called <b>organelles</b>.',
      { fig: '<path class="k" d="M30 80 Q40 30 150 34 Q270 40 276 80 Q270 122 150 126 Q40 130 30 80 Z"/>' +
          (function () { var s = ''; for (var x = 40; x < 270; x += 12) s += '<path class="t" d="M' + x + ' ' + (x < 150 ? 36 + (150 - x) * 0.05 : 36 + (x - 150) * 0.04) + ' l-2 -7"/>'; return s; })() +
          '<ellipse class="h" cx="160" cy="78" rx="26" ry="16"/><circle class="k" cx="80" cy="70" r="9"/><circle class="k" cx="240" cy="74" r="9"/><path class="k" d="M118 108 Q130 90 146 104"/><circle class="t" cx="200" cy="96" r="6"/>' +
          D.label(8, 16, 'cilia (tiny hairs)', 60, 32) + D.label(130, 150, 'oral groove', 132, 102) + D.label(146, 14, 'nucleus', 160, 64) + D.label(220, 150, 'food vacuole', 202, 100) + D.label(296, 30, 'contractile vacuole', 240, 66, 'end'),
        tall: 156, cap: 'Some of the organelles inside a paramecium.' },
      { box: 'Copying itself', text: 'A paramecium usually reproduces by splitting in two. In good conditions, one cell can become thousands in a week, a living example of the cell theory: every cell comes from a cell.' },
      { h: 'Moving and eating' },
      'Its surface is covered with thousands of hair-like cilia. They beat together in waves, like oars on a long rowing boat, pushing the cell through the water. Cilia also sweep bacteria and bits of food into a channel called the oral groove. Food is wrapped in a bubble of membrane, a food vacuole, where it is digested as the vacuole drifts through the cell.',
      { h: 'Staying in balance' },
      'Pond water is fresher than the inside of the cell, so water keeps leaking in by osmosis. If nothing stopped it, the paramecium would swell and burst. Star-shaped contractile vacuoles collect the extra water and squeeze it out every few seconds, like a pump bailing out a leaky boat.',
      { h: 'Sensing and escaping' },
      'A paramecium has no eyes or nerves, yet it responds to its surroundings. When it bumps into an obstacle or a harmful chemical, it reverses its cilia, backs up, turns and tries a new direction. Scientists call this the avoiding reaction. It is a simple behaviour, but it keeps the cell alive. Paramecia also swim toward places with the right amount of oxygen and away from water that is too hot or too cold. In a crowded drop of pond water, they gather where conditions are best.',
      'Studying organisms like the paramecium helps scientists understand how all cells work, including our own. The same kinds of membranes, vacuoles and signals are found in the cells of your body, working together in tissues and organs instead of alone.'
    ],
    guide: { before: 'Review the cell theory and organelles from earlier science lessons. Teach <b>unicellular</b> and <b>organelle</b>. Match each label on the diagram to a heading in the text.',
      after: 'Which organelles in a paramecium do the same jobs as organs in your body? Make a list together.' },
    words: [['unicellular', 'made of only one cell'], ['organelles', 'tiny structures inside a cell that each do a job']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Match each organelle with its job.', cols: ['Organelle', 'Job'],
        rows: [['cilia', null], ['food vacuole', null], ['contractile vacuole', null]],
        a: [[null, 'move the cell and sweep in food'], [null, 'digests food'], [null, 'pumps out extra water']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Where is the oral groove in the diagram?',
        opts: ['near the bottom edge', 'at the very top', 'outside the cell', 'inside the nucleus'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Cilia beat “like oars on a long rowing boat.” This comparison shows that cilia …',
        opts: ['work together in rhythm to push the cell', 'are made of wood', 'are very large', 'move only once'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Connect this text to the passage about osmosis, or to what you know about osmosis. Why does a paramecium need contractile vacuoles?',
        a: 'Pond water is fresher than the inside of the cell, so water moves in by osmosis. Without contractile vacuoles pumping it out, the cell would swell and burst.', look: 'applies osmosis correctly to the paramecium' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The paramecium has no brain. How can it still avoid danger? Use evidence.',
        a: 'When it bumps into something harmful, it reverses its cilia, backs up and turns. This simple avoiding reaction works without a brain.', look: 'describes the avoiding reaction' },
      { k: 'choice', code: 'B3.2', q: 'In “it reverses its cilia, backs up, turns and tries a new direction,” the words <b>reverses, backs up, turns</b> and <b>tries</b> are …',
        opts: ['verbs in a series', 'nouns', 'adjectives', 'prepositions'], a: 0 },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Your class is about to look at pond water under microscopes. Why would reading this text first be useful?',
        a: 'It tells me what a paramecium looks like and how it moves, so I could recognize one and know which organelles to look for.', look: 'a practical purpose connected to the activity' }
    ]
  });

  P.add({
    id: 'g8-submarine', subject: 'science', form: 'Explanation',
    title: 'How a Submarine Dives',
    deck: 'A submarine sinks and rises by changing one thing: its density',
    hero: {
      photo: 'g8-submarine.jpg', credit: 'Photo: U.S. Navy, public domain, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'The Royal Canadian Navy submarine HMCS <i>Victoria</i> on the surface near Bangor, Washington.'
    },
    body: [
      'A ship is built to float. A submarine is built to float, to sink and to hover at any depth in between. It does all three by controlling its <b>density</b>, using the same principle that keeps a freighter afloat.',
      { fig: [0, 1, 2].map(function (i) { var x = 14 + i * 96, y = [30, 64, 98][i]; return '<path class="a" d="M' + (x - 4) + ' 46 H' + (x + 86) + '"/><rect class="k" x="' + x + '" y="' + y + '" width="78" height="26" rx="13"/><rect class="' + (i ? 'h' : 't') + '" x="' + (x + 6) + '" y="' + (y + (i === 1 ? 4 : i === 2 ? 2 : 18)) + '" width="66" height="' + (i === 1 ? 18 : i === 2 ? 22 : 4) + '"/>'; }).join('') +
          tx(53, 150, 'n', 'tanks full of air:', 'middle') + tx(53, 162, 'n', 'floats', 'middle') + tx(149, 150, 'n', 'tanks part full:', 'middle') + tx(149, 162, 'n', 'hovers', 'middle') + tx(245, 150, 'n', 'tanks full of water:', 'middle') + tx(245, 162, 'n', 'sinks', 'middle') + tx(4, 40, 'n', 'surface'),
        tall: 168, cap: 'Hatching shows sea water in the ballast tanks.' },
      { h: 'Ballast tanks' },
      'Between the inner hull, where the crew lives, and the outer hull are large spaces called <b>ballast tanks</b>. On the surface, the tanks are full of air, and the submarine floats like any ship. To dive, the crew opens vents at the top of the tanks. Air rushes out, sea water rushes in, and the submarine becomes heavier for its size. When its density is greater than the water around it, it sinks.',
      { h: 'Neutral buoyancy' },
      'Sinking forever would be a disaster, so the crew adjusts the amount of water in smaller tanks until the submarine’s density exactly matches the sea water. The buoyant force then equals the submarine’s weight, and it hovers, neither rising nor sinking. Sailors call this neutral buoyancy. Small fins called diving planes, like the wings of an airplane, steer the submarine up or down as it moves forward.',
      { h: 'Coming back up' },
      'To surface, the crew blows compressed air from high-pressure bottles into the ballast tanks. The air forces the water out through openings at the bottom. The submarine becomes less dense than the water and rises. In an emergency, all the tanks can be blown at once, and the boat shoots to the surface.',
      { box: 'Fish did it first', text: 'Many fish have a swim bladder, a gas-filled sac that works like a ballast tank. By adding or removing gas, a fish can hover at any depth without swimming.' },
      'Water pressure increases with depth, so a submarine’s hull must be very strong. HMCS <i>Victoria</i> can dive deeper than 200 metres, where every square metre of hull feels the weight of more than 200 tonnes of water.',
      'Life on board is crowded. About fifty sailors share a space not much wider than a city bus, for weeks at a time, with no windows and no sunlight. Fresh air comes in only when the boat raises a snorkel pipe near the surface, and fresh water is carefully rationed. Submarine crews say the hardest part is not the danger but the silence: when the boat is hiding, everyone must move and speak quietly.'
    ],
    guide: { before: 'Review buoyancy and density from the freighter passage. Teach <b>ballast</b> and <b>neutral buoyancy</b>. Trace the three submarines in the diagram from left to right.',
      after: 'A diver uses a vest that can be filled with air. How is it like a submarine’s ballast tank?' },
    words: [['density', 'how much mass is packed into a certain volume'], ['ballast tanks', 'tanks that are filled with water to sink or with air to rise']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps for diving and surfacing.',
        items: ['The crew opens vents at the top of the tanks.', 'Sea water fills the ballast tanks.', 'The submarine sinks.', 'Compressed air is blown into the tanks.', 'Water is forced out and the submarine rises.'], show: [3, 0, 4, 1, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which submarine is hovering?',
        opts: ['the middle one, with tanks part full', 'the left one', 'the right one', 'none of them'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why must a submarine’s hull be very strong?',
        opts: ['Water pressure increases with depth.', 'It carries a lot of food.', 'It hits icebergs often.', 'Fish bite it.'], a: 0 },
      { k: 'lines', code: 'C1.1', n: 3, q: 'Reread the paragraph under “Neutral buoyancy.” Explain the term in your own words, using <i>density</i>.',
        a: 'Neutral buoyancy is when the submarine’s density matches the water’s, so the push up equals its weight and it stays at the same depth.', look: 'correct explanation using density and balanced forces' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Compare a submarine’s ballast tanks with a fish’s swim bladder. How are they alike?',
        a: 'Both add or remove gas to change density. That lets the submarine or the fish rise, sink or hover without using much energy.', look: 'a clear similarity, using density or gas' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence shows a cause and its effect joined by <i>when</i>?',
        opts: ['When its density is greater than the water around it, it sinks.', 'The air forces the water out.', 'A ship is built to float.', 'Sailors call this neutral buoyancy.'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 3, q: 'How did reading the freighter passage (or what you know about buoyancy) help you understand this one? What will you do the next time a text builds on an earlier one?',
        a: 'I already knew that a ship floats when the water pushed aside weighs as much as the ship, so ballast tanks made sense. Next time I will look back at the earlier text first.', look: 'reflects on using prior reading and sets a goal' }
    ]
  });

  P.add({
    id: 'g8-lake-effect', subject: 'science', form: 'Explanation',
    title: 'Snow Made by a Lake',
    deck: 'Why towns east of the Great Lakes can be buried in snow while others nearby stay clear',
    hero: {
      photo: 'g8-lake-effect.jpg', credit: 'Image: NOAA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'A satellite image of lake-effect snow over the Great Lakes. The white streaks are long bands of cloud forming over the open water.'
    },
    body: [
      'In early winter, a town on the eastern shore of Lake Huron can get half a metre of snow in a day, while a town forty kilometres inland sees only flurries. The difference is the lake. Drivers on Highway 21 or Highway 26 can go from clear skies into a whiteout in a few minutes, as they pass under a single band of cloud. The snow is called <b>lake-effect snow</b>, and it shows how water and air work together as one system.',
      { fig: '<path class="a" d="M10 130 H180"/>' + D.ripple(10, 180, 124) + '<path class="k" d="M180 130 L290 120"/>' +
          D.arrow(10, 60, 60, 60, 'k') + tx(10, 50, 'n', 'cold, dry wind') + [40, 80, 120].map(function (x) { return D.arrow(x, 116, x, 92, 'a'); }).join('') + tx(60, 84, 'n', 'heat and moisture rise', 'middle') +
          '<path class="k" d="M150 60 Q170 30 200 40 Q230 20 250 44 Q276 46 270 66 H156 Q140 66 150 60 Z"/>' + [190, 210, 230, 250].map(function (x) { return '<path class="t" d="M' + x + ' 74 l-6 30"/>'; }).join('') +
          tx(232, 140, 'n', 'snow falls on the shore', 'middle') + tx(100, 148, 'n', 'open lake (still warm)', 'middle'),
        tall: 154, cap: 'Cold air crosses warm open water, picks up moisture and drops it as snow on the far shore.' },
      { box: 'Ontario’s snow belts', text: 'Places such as Owen Sound, Wiarton, London and Barrie, downwind of Lake Huron and Georgian Bay, often get far more snow than Toronto.' },
      { h: 'Warm water, cold air' },
      'Water heats up and cools down much more slowly than land. All summer, the Great Lakes soak up heat. By December, the land is frozen, but the lakes are still open and relatively warm. When a blast of Arctic air blows across a lake, the bottom layer of air is heated by the water and picks up water vapour through <b>evaporation</b>. Warm, moist air rises, cools, and its water vapour condenses into clouds.',
      { h: 'Long bands of snow' },
      'As the wind keeps blowing, the clouds grow into long, narrow bands lined up with the wind. When the air reaches the shore, it is pushed up over the rising land and cools even more. The clouds drop their moisture as heavy snow. The longer the stretch of open water the wind crosses, called the <b>fetch</b>, the more moisture it gathers and the heavier the snow. That is why the snow belts lie on the eastern and southeastern shores: the usual winter winds blow from the west and northwest.',
      { h: 'When it stops' },
      'Lake-effect snow usually fades by late winter. Once a lake freezes over, the air can no longer pick up heat and moisture from the water, and the snow machine shuts down. Lake Erie, the shallowest of the Great Lakes, often freezes first, so towns near it get relief sooner than towns near deep Lake Ontario or Lake Huron. As winters warm and the lakes freeze later, some scientists expect more lake-effect snow in early winter, at least for a while.'
    ],
    guide: { before: 'Recall the water cycle: evaporation, condensation, precipitation. Teach <b>evaporation</b> and <b>fetch</b>. Find Lake Huron, Georgian Bay and Owen Sound on a map, then read the diagram.',
      after: 'If the wind blew from the east instead, where would the snow fall? Explain using the diagram.' },
    words: [['lake-effect snow', 'snow made when cold air picks up moisture from a warmer lake'], ['evaporation', 'water changing into a gas (water vapour)'], ['fetch', 'the distance wind travels over open water']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps in making lake-effect snow.',
        items: ['Cold, dry wind blows over the lake.', 'The air picks up heat and water vapour.', 'Warm, moist air rises and forms clouds.', 'The air is pushed up over the shore.', 'Snow falls on the shore.'], show: [2, 4, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where does the snow fall?',
        opts: ['on the shore, downwind of the lake', 'in the middle of the lake', 'where the wind starts', 'nowhere'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does lake-effect snow usually stop by late winter?',
        opts: ['The lake freezes over.', 'The wind stops blowing.', 'The sun is too hot.', 'People shovel it all.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why are the snow belts on the eastern shores of the lakes, not the western shores?',
        a: 'Winter winds usually blow from the west and northwest. They pick up moisture crossing the lake and drop it as snow on the eastern side.', look: 'connects wind direction to the side that gets snow' },
      { k: 'choice', code: 'B2.2', q: 'The word <b>fetch</b> usually means “to go and get.” What does it mean in this text?',
        opts: ['the distance wind travels over open water', 'a dog’s game', 'a kind of snow', 'the height of a cloud'], a: 0 },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What do you know about the water cycle from science class that helps you understand lake-effect snow?',
        a: 'I know water evaporates, rises, condenses into clouds and falls as precipitation. Lake-effect snow is the water cycle happening quickly over one lake.', look: 'names water cycle steps and links them to the text' },
      { k: 'lines', code: 'C1.3', n: 3, q: 'How do the subheadings help a reader follow this explanation?',
        a: 'They break the process into parts: why it starts, how the bands form, and when it stops. A reader can find each part quickly and follow the order.', look: 'explains how headings organize the steps or ideas' }
    ]
  });

  P.add({
    id: 'g8-rubber-ducks', subject: 'science', form: 'Report',
    title: 'The Great Rubber Duck Voyage',
    deck: 'In 1992, thousands of bath toys fell into the Pacific. Scientists followed them for years.',
    hero: {
      photo: 'g8-rubber-ducks.jpg', credit: 'Photo: frielp, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Yellow rubber ducks. In 1992, plastic ducks, beavers, frogs and turtles fell from a ship and began a journey across the oceans.'
    },
    body: [
      'In January 1992, a container ship crossing the North Pacific from Hong Kong to the United States ran into a storm. Several shipping containers broke loose and fell overboard. One held 28 800 plastic bath toys: yellow ducks, blue turtles, red beavers and green frogs. The containers burst open, and the toys floated free. They became the most famous accidental science experiment in the ocean.',
      { h: 'Following the ducks' },
      'Ten months later, toys began washing up on beaches in Alaska. An oceanographer named Curtis Ebbesmeyer, who studied ocean <b>currents</b>, asked beachcombers to report every toy they found, with the place and date. Because scientists knew exactly where and when the toys had fallen, each sighting showed how fast and in which direction the ocean was moving. Ebbesmeyer and a colleague fed the reports into a computer model of the Pacific. The model, built to track ocean currents for fishing fleets, could now be tested against real objects.',
      { h: 'Rivers in the sea' },
      'The results showed that the toys were riding a <b>gyre</b>, a huge loop of currents that circles the North Pacific. Some toys went round the loop more than once, taking about three years for each lap. Others were carried south toward Hawaii, and some came ashore in Washington State and British Columbia. Others escaped. A few drifted north through the Bering Strait, became frozen into Arctic sea ice, and travelled slowly across the top of the world. Years later, toys were reported on beaches as far away as Scotland and the east coast of North America.',
      { fig: '<path class="k" d="M20 30 Q150 6 280 30 Q290 80 270 120 Q150 146 30 120 Q10 80 20 30 Z"/><path class="a" d="M60 40 Q150 22 240 44 Q264 70 244 100 Q150 120 64 104 Q40 74 60 40 Z"/>' +
          D.arrow(150, 22, 170, 23, 'a') + D.arrow(150, 120, 130, 120, 'a') + '<circle class="dot" cx="110" cy="40" r="4"/>' +
          D.label(80, 64, 'spill, 1992', 110, 42) + tx(10, 140, 'n', 'Asia') + tx(290, 140, 'n', 'North America', 'end') + D.label(200, 80, 'Alaska', 268, 36),
        tall: 150, cap: 'The toys circled the North Pacific with a great loop of ocean currents called a gyre (simplified).' },
      { box: 'Bleached by the sun', text: 'After years at sea, many of the ducks turned white. Collectors still prize the faded survivors.' },
      { h: 'A serious lesson' },
      'The toys taught scientists about currents, but they also showed something troubling. Anything that floats, including plastic waste, can travel thousands of kilometres and gather in the centre of a gyre. The Great Pacific Garbage Patch, a vast area of floating plastic, lies in the same system of currents the ducks once rode.'
    ],
    guide: { before: 'Ask how scientists might study ocean currents. Teach <b>current</b> and <b>gyre</b>. Trace the loop on the map with a finger, starting at the spill.',
      after: 'The ducks were an accident that became useful. How could scientists track currents on purpose today?' },
    words: [['currents', 'steady flows of water in one direction in the ocean'], ['gyre', 'a huge loop of ocean currents that circles an ocean basin']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were the toys useful to scientists?',
        opts: ['Scientists knew exactly where and when they fell.', 'They were brightly coloured.', 'They could swim.', 'They were very expensive.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the map show?',
        opts: ['a loop of currents circling the North Pacific', 'the route of the ship to China', 'the ocean floor', 'the Arctic sea ice'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how beachcombers helped scientists learn about ocean currents.',
        a: 'They reported each toy they found, with the place and date. Scientists compared these with where the toys fell to work out how fast and which way the water moved.', look: 'reports with place and date, and how scientists used them' },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Why is it ironic that bath toys became a famous science experiment?',
        a: 'Bath toys are made for fun in a tub, not for science. Yet by accident they taught scientists about the biggest ocean currents on Earth.', look: 'contrast between the toys’ purpose and what they ended up doing' },
      { k: 'choice', code: 'B3.3', q: 'In “yellow ducks, blue turtles, red beavers and green frogs,” the commas …',
        opts: ['separate items in a list', 'join two sentences', 'show a quotation', 'introduce a question'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'The last section turns from ducks to plastic waste. Summarize the lesson it draws.',
        a: 'Because floating things travel so far on currents, plastic waste can spread thousands of kilometres and pile up in gyres like the Great Pacific Garbage Patch.', look: 'the connection between the ducks and plastic pollution' },
      { k: 'lines', code: 'D1.1', n: 3, q: 'You want to tell younger students about ocean currents using this story. What form would you choose (for example, a comic, a video or a map), and why?',
        a: 'A comic, because it could show the ducks’ journey step by step with pictures, which would hold younger students’ attention and make the route easy to follow.', look: 'a suitable form with a reason linked to audience and purpose' }
    ]
  });

  P.add({
    id: 'g8-assembly-line', subject: 'tech', form: 'Report',
    title: 'The Line That Changed Work',
    deck: 'In 1913, a car factory found a way to build a car in about 90 minutes. Workers paid a price.',
    hero: {
      photo: 'g8-ford-line.jpg', credit: 'Photo: 1913, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Workers on Ford’s first moving assembly line at Highland Park, Michigan, in 1913, putting together engine parts. Each worker repeated the same task.'
    },
    body: [
      'In 1908, building one Ford Model T took a team of skilled workers about twelve hours. They gathered the parts and built each car where it stood. By 1914, the same car rolled out of the factory roughly every ninety minutes of work, and its price had dropped by more than half. The change was a new kind of <b>system</b>: the moving assembly line.',
      { fig: '<path class="k" d="M10 100 H290 M10 112 H290"/>' + [0, 1, 2, 3].map(function (i) { var x = 26 + i * 70; return '<rect class="' + (i === 3 ? 'h' : 'k') + '" x="' + x + '" y="' + (78 - i * 4) + '" width="' + (36 + i * 6) + '" height="' + (22 + i * 4) + '" rx="3"/><circle class="k" cx="' + (x + 16) + '" cy="50" r="6"/><path class="k" d="M' + (x + 16) + ' 56 V70"/>' + tx(x + 18, 134, 'n', ['frame', 'engine', 'body', 'wheels'][i], 'middle'); }).join('') +
          D.arrow(30, 150, 270, 150, 'a') + tx(150, 166, 'n', 'the car moves; each worker stays in place', 'middle'),
        tall: 170, cap: 'On an assembly line, the work comes to the worker.' },
      { box: 'The five-dollar day', text: 'The work was so boring and tiring that many workers quit. In 1914, Ford doubled pay to about five dollars a day, partly to keep workers from leaving.' },
      { h: 'Bringing the work to the worker' },
      'Henry Ford and his engineers broke the job of building a car into 84 small steps. Each worker did one step, again and again, as the car was pulled past on a rope, and later on a moving chain. One worker might tighten the same few bolts hundreds of times a day. Parts were made in identical, <b>interchangeable</b> sizes, so any bolt fit any car. Nobody had to walk to fetch parts or wait for another team to finish. Supervisors timed each motion with a stopwatch and looked for ways to save even a few seconds.',
      { h: 'Inputs, outputs and efficiency' },
      'Engineers describe a system by its inputs, such as materials, energy and labour, and its outputs, such as finished cars. A system is more <b>efficient</b> when it turns the same inputs into more output, or wastes less along the way. The assembly line was dramatically more efficient. Factories around the world copied it, including the Ford plant in Windsor, Ontario, and later the auto plants of Oshawa, Oakville and Alliston.',
      { h: 'The cost to workers' },
      'Not everyone welcomed the change. Skilled craftsmen who had once built a whole car now repeated one small motion all day. The pace was set by the machine, not by the worker. Workers suffered injuries from repeating the same movement. Critics said people were being treated like parts of the machine. These worries helped workers form unions to bargain for shorter hours, safer conditions and breaks.'
    ],
    guide: { before: 'Make three paper airplanes one at a time, then with two people on an “assembly line”, and compare the times. Teach <b>system</b>, <b>efficient</b> and <b>interchangeable</b>.',
      after: 'Was the assembly line good or bad overall? Who gained the most and who lost the most?' },
    words: [['system', 'a set of parts that work together to do a job'], ['interchangeable', 'made exactly alike, so one can replace another'], ['efficient', 'producing a lot without wasting time, energy or materials']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the arrow under the diagram show?',
        opts: ['The car moves past workers who stay in place.', 'Workers walk to the car.', 'The factory is getting bigger.', 'Time is running out.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Ford raise pay to five dollars a day?',
        opts: ['Many workers were quitting because the work was boring.', 'Cars became more expensive.', 'A new law required it.', 'Workers built cars at home.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart about the factory as a system.', cols: ['Part of the system', 'Example'],
        rows: [['inputs', null], ['process', null], ['outputs', null]],
        a: [[null, 'materials, energy, labour'], [null, 'the moving assembly line with 84 steps'], [null, 'finished Model T cars']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The first sections praise the assembly line. The last section criticizes it. Why do you think the writer included both?',
        a: 'To give a balanced view. The line made cars cheap and fast, but it made work boring and harmful, so readers can judge for themselves.', look: 'recognizes balance and names one positive and one negative' },
      { k: 'choice', code: 'B2.1', q: '<b>Inter</b>changeable, <b>inter</b>national and <b>inter</b>act share a prefix. <b>Inter-</b> means …',
        opts: ['between or among', 'not', 'before', 'too much'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of a system you see every day, such as a cafeteria line or a school bus route. How is it like an assembly line?',
        a: 'In the cafeteria, each worker serves one food as students move along the line. Like an assembly line, the work is divided into small steps and people stay in one place.', look: 'a real example with at least one clear similarity' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Critics said workers were treated “like parts of the machine.” What does this mean, and do you agree?',
        a: 'It means workers were valued only for doing one task quickly, not as skilled people. I agree, because they had no control over the pace and their bodies were hurt.', look: 'explains the criticism and gives a reasoned opinion' }
    ]
  });

  P.add({
    id: 'g8-robots', subject: 'tech', form: 'Feature article',
    title: 'Robots on the Line',
    deck: 'In Ontario car plants, robots now do much of the welding. What jobs are left for people?',
    hero: {
      photo: 'g8-car-robots.jpg', credit: 'Photo: BMW Werk Leipzig, CC BY-SA 2.0 DE, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Robot arms build car bodies at a factory in Leipzig, Germany. Industrial robots can repeat the same weld thousands of times without tiring.'
    },
    body: [
      'Walk through a modern car plant in Ontario and you will see showers of sparks but very few people near them. Rows of orange robotic arms swing, twist and weld car bodies together, each one guided by a computer program. This is <b>automation</b>: using machines and computers to do work that people once did.',
      { fig: '<path class="k" d="M40 150 H120 M80 150 V130"/><rect class="k" x="60" y="118" width="40" height="12" rx="3"/><circle class="k" cx="80" cy="112" r="8"/><path class="k" d="M80 112 L140 60 L220 80"/><circle class="k" cx="140" cy="60" r="6"/><circle class="k" cx="220" cy="80" r="5"/><path class="a" d="M220 80 L236 100"/>' +
          D.label(4, 104, 'base joint', 72, 112) + D.label(120, 30, 'elbow joint', 140, 54) + D.label(232, 60, 'wrist', 222, 76) + D.label(230, 128, 'welding tool', 234, 100) + tx(296, 156, 'n', 'sensors and a computer guide it', 'end'),
        tall: 160, cap: 'Like a human arm, a robot arm moves at joints.' },
      { box: 'Different points of view', text: 'A plant manager: “Robots help us compete with factories around the world.” A retired welder: “My job went to a machine.” A robotics technician, age 24: “I learned to fix robots at college. It is a good job.”' },
      { h: 'What robots do well' },
      'An industrial robot is a machine with a jointed arm, a tool at its end, and a controller that tells it exactly how to move. It can place a weld in the same spot, to within a fraction of a millimetre, every minute of every shift. It does not get tired, bored or hurt. Robots are especially useful for jobs that are dangerous, dirty or dull: welding, painting with toxic fumes, or lifting heavy parts.',
      { h: 'What people still do' },
      'Robots are good at doing exactly what they are told. They are not good at noticing that something is a little wrong, solving a new problem, or fitting a tricky wire behind a dashboard. A robot cannot tell when a part looks wrong unless someone has programmed it to check. People still do much of the final assembly, inspect quality and fix problems. New jobs have also appeared: technicians who maintain robots, programmers who write their instructions, and engineers who design whole automated systems.',
      { h: 'Who benefits?' },
      'Automation has made cars safer to build and better built. It has also changed who can find work. Fewer workers are needed for each car, and the new jobs often require training after high school. Communities that depend on one factory can be hit hard when it automates or closes. Many people argue that companies, colleges and governments share a <b>responsibility</b> to help workers learn new skills, so that the benefits of automation are shared fairly.'
    ],
    guide: { before: 'Ask the child to name a job a robot could do and one it could not. Teach <b>automation</b> and <b>responsibility</b>. Read the three quotations in the box aloud in different voices.',
      after: 'Which of the three people in the box would you most like to talk to? What would you ask them?' },
    words: [['automation', 'using machines and computers to do work that people once did'], ['responsibility', 'a duty to deal with something or take care of someone']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Complete the chart.', cols: ['Robots do well', 'People still do well'],
        rows: [['repeating the same weld exactly', null], [null, 'solving a new problem'], ['dangerous jobs with toxic fumes', null]],
        a: [[null, 'noticing something is a little wrong'], ['working without getting tired', null], [null, 'fitting tricky wires; inspecting quality']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'The diagram compares a robot arm to …',
        opts: ['a human arm with joints', 'a car', 'a crane', 'a computer'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>It</b> does not get tired, bored or hurt.” <b>It</b> refers to …',
        opts: ['an industrial robot', 'a weld', 'a shift', 'a car plant'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Read the box. Explain how each person’s position affects their view of automation.',
        a: 'The manager cares about competing, so robots look good. The retired welder lost his job, so he sees a loss. The young technician got a job from automation, so he sees opportunity.', look: 'links each view to the person’s situation' },
      { k: 'choice', code: 'B3.3', q: 'Why are the speakers’ words in the box inside quotation marks?',
        opts: ['They are the people’s exact words.', 'They are titles.', 'They are questions.', 'They are made-up words.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The last paragraph says benefits should be “shared fairly.” What could make automation fairer for workers?',
        a: 'Companies and colleges could offer free training so workers can learn to maintain robots, and governments could support communities when a factory closes.', look: 'a concrete idea for fairness, linked to the text' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict how automation might change one job in your community in the next ten years. What evidence from the text supports your prediction?',
        a: 'Grocery checkouts may become fully automated. The text says machines take over repetitive jobs, but people will still be needed to help customers and fix machines.', look: 'a reasonable prediction supported by an idea from the text' }
    ]
  });

  P.add({
    id: 'g8-batoche', subject: 'history', form: 'Report',
    title: 'The Stand at Batoche',
    deck: 'In 1885, Métis families on the South Saskatchewan River fought to keep their land. How should we name what happened?',
    hero: {
      photo: 'g8-batoche.jpg', credit: 'Photo: Dave Bonser, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'The church and rectory at Batoche, Saskatchewan, seen from the cemetery. Bullet holes from 1885 can still be seen in the rectory.'
    },
    body: [
      'In the spring of 1885, the small Métis village of Batoche, on the South Saskatchewan River, became a battlefield. For four days, a few hundred Métis and First Nations fighters held off about 800 soldiers. The fighting ended a struggle that had been building for years, and its meaning is still argued about today.',
      { h: 'Long, narrow farms' },
      'The Métis are a people whose roots go back to First Nations women and French and Scottish fur traders. By the 1870s, many Métis families had moved west from Red River and settled along the South Saskatchewan. They farmed in the style they knew: <b>river lots</b>, long narrow strips of land that each touched the water. Every family could reach the river for water and transport.',
      'The Canadian government planned to <b>survey</b> the prairies into square blocks. The Métis feared they would lose the farms they had built, because they had no official papers proving they owned them. For years they sent petitions to Ottawa asking for title to their land. Most went unanswered.',
      { h: 'Four days in May' },
      'In 1884, the Métis invited Louis Riel, who had led them at Red River in 1870, to return from the United States. In March 1885, they formed a provisional government. Ottawa sent troops west on the new railway. At Batoche, the Métis, led in battle by Gabriel Dumont, dug rifle pits along the ridges. They ran so low on ammunition that some fired nails and stones. On May 12, the soldiers broke through. Riel surrendered, was tried in Regina, and was hanged that November. Dumont escaped to the United States.',
      { fig: [0, 1, 2, 3, 4, 5, 6].map(function (i) { return '<rect class="' + (i === 3 ? 'h' : 't') + '" x="34" y="' + (12 + i * 20) + '" width="106" height="20"/>'; }).join('') + '<path class="a" d="M24 6 Q34 80 24 156"/>' +
          [0, 1, 2].map(function (r) { return [0, 1, 2].map(function (c) { return '<rect class="t" x="' + (170 + c * 40) + '" y="' + (24 + r * 40) + '" width="40" height="40"/>'; }).join(''); }).join('') +
          tx(87, 174, 'n', 'Métis river lots', 'middle') + tx(230, 174, 'n', 'government square survey', 'middle') + D.label(150, 14, 'one family’s farm', 120, 74),
        tall: 180, cap: 'River lots (left) gave every farm a share of the riverbank. The government’s survey (right) divided land into squares.' },
      { box: 'One event, two names', text: 'For many years, Canadian textbooks called 1885 the “North-West Rebellion,” which suggests an attack on lawful government. Many Métis today call it the “North-West <b>Resistance</b>,” which suggests defending their homes and rights.' },
      'Today, Batoche is a national historic site. Each summer, Métis people gather there for Back to Batoche Days, with fiddle music, jigging and the Michif language, to remember and to celebrate a living culture.'
    ],
    guide: { before: 'Find Batoche and the South Saskatchewan River on a map of Saskatchewan. Teach <b>survey</b>, <b>river lots</b> and <b>resistance</b>. Compare the two shapes of farm in the diagram.',
      after: 'Which name would you use for the events of 1885, and why? Does the name we choose change how people remember an event?' },
    words: [['river lots', 'long, narrow farms that each reach a river'], ['survey', 'to measure and mark out land into sections'], ['resistance', 'standing up against something to defend yourself or your rights']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show about river lots?',
        opts: ['Every farm touched the river.', 'The farms were square.', 'Only one family lived by the river.', 'The farms were far from water.'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“Most went unanswered.” <b>Most</b> refers to most of the …',
        opts: ['petitions sent to Ottawa', 'river lots', 'Métis families', 'soldiers'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the events in the order they happened.',
        items: ['The Métis send petitions about their land.', 'Riel is invited to return.', 'The Métis form a provisional government.', 'Soldiers break through at Batoche.', 'Riel is tried in Regina.'], show: [3, 0, 4, 2, 1] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Read the box. Explain how each name for the events of 1885 shows a different perspective.',
        a: '“Rebellion” is the government’s view: the Métis broke the law. “Resistance” is the Métis view: they were defending their land and rights from a government that ignored them.', look: 'explains whose view each name reflects' },
      { k: 'choice', code: 'B2.2', q: 'In this text, <b>title</b> to land means …',
        opts: ['legal proof that you own it', 'the name of a book', 'a sports championship', 'a heading'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two Métis cultural elements in the text. Why do you think the writer ends with them?',
        a: 'River lots and Back to Batoche Days with fiddling, jigging and Michif. Ending with them shows the Métis are a living culture today, not only a story of defeat.', look: 'two elements and a reason linked to the ending' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which part of this text was hardest for you: the background, the diagram or the battle? What did you do to understand it?',
        a: 'The background on who the Métis are was new to me. I reread it slowly and looked back at the diagram, which made the land problem clear.', look: 'names a hard part and a strategy that fits it' }
    ]
  });

  P.add({
    id: 'g8-orange-shirt', subject: 'history', form: 'Speech', plain: true,
    title: 'Why We Wear Orange',
    deck: 'A Grade 8 student speaks to the school before the National Day for Truth and Reconciliation',
    hero: {
      photo: 'g8-orange-shirt.jpg', credit: 'Photo: Maksim Sokolov, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'People in Huntsville, Ontario, mark the National Day for Truth and Reconciliation on September 30.'
    },
    body: [
      'Good morning, everyone. My name is Jordan, and I am in Ms. Lavoie’s Grade 8 class. On Friday, many of us will wear orange shirts. I want to tell you why, because a shirt is only a shirt unless we know the story behind it.',
      'In 1973, a six-year-old girl named Phyllis Webstad was sent to St. Joseph Mission, a <b>residential school</b> near Williams Lake, British Columbia. Her grandmother had bought her a brand-new shirt for her first day. It was bright orange, and it was shiny. When Phyllis arrived, the shirt was taken away, and she never wore it again. For many years, she said, the colour orange reminded her that her feelings did not matter to anyone.',
      { fig: timeline([[0, 'first schools', 'open', '1830s'], [1, 'last school', 'closes', '1996'], [2, 'first Orange', 'Shirt Day', '2013'], [3, '94 Calls', 'to Action', '2015'], [4, 'national day', 'begins', '2021']], -0.4, 4.4),
        tall: 128, cap: 'Some key dates (not to scale).' },
      'Phyllis was one of more than 150 000 First Nations, Inuit and Métis children who were sent to residential schools in Canada. The schools were run by churches and paid for by the government. Their purpose was to <b>assimilate</b> children: to make them give up their languages, families and cultures. Many children were punished for speaking their own language. Many were hurt. Thousands never came home. The last school closed in 1996, which means that many survivors are the parents and grandparents of students in schools like ours today. Some of them may even be our neighbours.',
      'In 2013, Phyllis shared her story at an event in Williams Lake, and the first Orange Shirt Day began. It is held on September 30, the time of year when children were taken from their homes. In 2015, the Truth and Reconciliation Commission listened to thousands of survivors and called on all of Canada to act. Since 2021, September 30 has been the National Day for Truth and Reconciliation.',
      { box: 'Every Child Matters', text: 'These words are printed on many orange shirts. They remind us of the children who went to the schools, the survivors who are still with us, and their families.' },
      'So, here is what I am asking. Wear orange on Friday, but do not stop there. Read a book by an Indigenous author. Learn whose land our school stands on. Listen when survivors share their stories, and believe them. <b>Reconciliation</b> is not one day. It is something we do together, all year. Thank you.'
    ],
    guide: { before: 'This is a serious topic: read it together and allow time to talk. Teach <b>residential school</b>, <b>assimilate</b> and <b>reconciliation</b>. Point out that this is a speech: notice how Jordan speaks to the audience.',
      after: 'Jordan asks the audience to do three things. Which one could you do this month? Find out whose traditional land you live on.' },
    words: [['residential school', 'a boarding school that First Nations, Inuit and Métis children were forced to attend'], ['assimilate', 'to make a group give up its own culture and take on another'], ['reconciliation', 'repairing a relationship after harm, with truth and action']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows that this text is a speech?',
        opts: ['Jordan speaks directly to the audience.', 'It has a glossary.', 'It has a table of contents.', 'It is written in the past tense.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the colour orange upset Phyllis for many years?',
        opts: ['It reminded her that her feelings had not mattered.', 'She did not like bright colours.', 'Her grandmother chose it.', 'It was the school’s colour.'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Jordan says, “a shirt is only a shirt unless we know the story behind it.” What does Jordan mean?',
        a: 'An orange shirt has meaning only when you understand Phyllis’s story and the residential schools. Without the story, wearing it is empty.', look: 'explains that the symbol depends on knowing the story' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is a command (an imperative sentence)?',
        opts: ['Wear orange on Friday, but do not stop there.', 'My name is Jordan.', 'Many were hurt.', 'It was bright orange, and it was shiny.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Whose voices does the speech include? Why is it important that the Commission listened to survivors?',
        a: 'It includes Phyllis’s own story and the survivors who spoke to the Commission. Their voices matter because they lived it, and the truth must come from them.', look: 'names the voices included and why first-hand voices matter' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Jordan ends with three short actions and “Reconciliation is not one day.” Why is this a strong ending?',
        a: 'It turns the history into things the audience can do, and the short sentence sticks in their minds, so they remember to act all year.', look: 'links the ending to the speaker’s purpose' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about residential schools or Orange Shirt Day? How did this speech add to it?',
        a: 'I knew we wear orange on September 30. I did not know the story of Phyllis’s shirt or that the last school closed in 1996.', look: 'prior knowledge and one new idea from the text' }
    ]
  });

  P.add({
    id: 'g8-mary-ann-shadd', subject: 'history', form: 'Biography',
    title: 'The Editor Who Would Not Be Silenced',
    deck: 'Mary Ann Shadd was the first Black woman in North America to publish a newspaper. She did it in Canada West.',
    hero: {
      photo: 'g8-mary-ann-shadd.jpg', credit: 'Photo: Library and Archives Canada, CC BY 2.0, Wikimedia Commons', focus: '50% 30%',
      tall: 200,
      cap: 'Mary Ann Shadd, teacher, writer, newspaper publisher and, later, lawyer.'
    },
    body: [
      'In 1853, a new weekly newspaper appeared in Windsor, Canada West, which is now Ontario. Its motto was “Self-Reliance Is the True Road to Independence.” Its founder was Mary Ann Shadd, and she became the first Black woman in North America to publish a newspaper.',
      { fig: timeline([[1823, 'born free', 'in Delaware'], [1851, 'moves to', 'Windsor'], [1853, 'founds the', 'newspaper'], [1883, 'earns a', 'law degree']], 1815, 1890),
        tall: 128, cap: 'Mary Ann Shadd’s life (selected events).' },
      { box: 'Honoured today', text: 'Mary Ann Shadd has been named a Person of National Historic Significance in Canada, and Canada Post put her portrait on a stamp in 2009.' },
      { h: 'A family of activists' },
      'Mary Ann Shadd was born free in Delaware in 1823, at a time when slavery was still legal in much of the United States. Her parents helped people escaping slavery on the Underground Railroad, a secret network of routes and safe houses. Mary Ann became a teacher. In 1850, the United States passed the Fugitive Slave Act, which allowed people who had escaped slavery to be captured in free states and sent back. Even free Black people were in danger. The next year, Mary Ann moved north to Windsor.',
      { h: 'A voice in print' },
      'In Windsor, she opened a school that welcomed all children, Black and white. She also wrote a booklet urging Black Americans to move to Canada, describing its farmland, its climate and its laws. Then she started <i>The Provincial Freeman</i>. The paper reported news, argued against slavery and called for equal rights for women. Mary Ann was <b>outspoken</b>. She criticized anyone, even other Black leaders, whom she thought was doing harm to the cause of freedom. Some readers objected to a woman running a newspaper, so for a time she listed men as its editors, while she kept doing much of the work.',
      { h: 'Never finished' },
      'After the American Civil War, she returned to the United States. She recruited soldiers, taught, and, at age sixty, earned a law degree. Throughout her life, she spoke up for <b>equality</b>, believing that people should be judged by what they do, not by their race or whether they are a man or a woman.'
    ],
    guide: { before: 'Explain the Underground Railroad briefly and find Windsor and Chatham on a map. Teach <b>outspoken</b> and <b>equality</b>. Read the timeline first to preview her life.',
      after: 'Why do you think Mary Ann Shadd chose a newspaper to share her ideas? What would she use today?' },
    words: [['outspoken', 'saying what you think openly, even when others disagree'], ['equality', 'being treated the same, with the same rights']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'How is this biography mainly organized?',
        opts: ['in time order', 'by problem and solution', 'by comparing two people', 'as a list of facts'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Mary Ann Shadd move to Windsor in 1851?',
        opts: ['A new law put Black people in danger in the U.S.', 'She wanted to study law.', 'Her newspaper closed.', 'She was asked to teach there.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Find two pieces of evidence that Mary Ann Shadd was outspoken.',
        a: 'She criticized anyone, even other Black leaders, whom she thought was doing harm. She argued in print against slavery and for women’s rights.', look: 'two pieces of evidence from the text' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Some readers objected to a woman running a newspaper. What does this show about the time, and how did she respond?',
        a: 'It shows women were not treated as equals. She listed men as editors for a while but kept doing the work, so her voice still reached readers.', look: 'barrier for women and her response' },
      { k: 'choice', code: 'B3.3', q: 'Why is <i>The Provincial Freeman</i> in italics?',
        opts: ['It is the title of a newspaper.', 'It is a quotation.', 'It is a foreign word.', 'It is shouted.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize Mary Ann Shadd’s life and importance in two or three sentences.',
        a: 'Mary Ann Shadd moved to Canada West to escape danger and started a newspaper in 1853. She fought for an end to slavery and for equal rights, and later became a lawyer.', look: 'key events and why she matters, in few words' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of someone today who speaks up for equality. How are they like Mary Ann Shadd?',
        a: 'A student activist who speaks at rallies is like her, because both use their voices in public to call for fair treatment, even when people disagree.', look: 'a real example and a clear similarity' }
    ]
  });

  P.add({
    id: 'g8-longboat', subject: 'health', form: 'Profile',
    title: 'Ahead of His Time',
    deck: 'Tom Longboat won the Boston Marathon in record time. His coaches said he trained the wrong way. He was right.',
    hero: {
      photo: 'g8-longboat.jpg', credit: 'Photo: 1907, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'Tom Longboat running, in the early 1900s. He was one of the most famous athletes in the world.'
    },
    body: [
      'On April 19, 1907, a nineteen-year-old runner from the Six Nations of the Grand River crossed the finish line of the Boston Marathon. Tom Longboat had won in a record time, through cold rain and slush. Back home, crowds filled the streets of Toronto to welcome him.',
      { h: 'A runner from Six Nations' },
      'Tom Longboat, whose Onondaga name was Cogwagee, was born in 1887. As a boy, he was sent to the Mohawk Institute, a residential school in Brantford. He ran away twice. By his late teens, he was winning road races across Ontario with a long, smooth stride. Newspapers praised him one day and insulted him the next, often with <b>stereotypes</b> about Indigenous people.',
      { h: 'Hard days and easy days' },
      'Longboat’s managers wanted him to train hard every day. Longboat disagreed. Between hard runs, he took easy days: long walks, light jogs and complete rest. His managers called him lazy. Today, coaches know he was right. Hard training breaks down muscle fibres slightly. During <b>recovery</b>, the body repairs them and becomes stronger. Without rest, an athlete grows tired, slow and more likely to be injured. Sleep, water and good food all help the body recover. Many top runners today follow a pattern very like Longboat’s, with only two or three hard sessions a week.',
      'In 1908, he raced at the Olympics in London but collapsed in the heat. Later, he turned professional and beat some of the best runners in the world in races watched by huge crowds.',
      { fig: bars([[3, 'hard', 'Mon'], [1, 'easy', 'Tue'], [3, 'hard', 'Wed'], [0, 'rest', 'Thu'], [3, 'hard', 'Fri'], [1, 'easy', 'Sat']], { max: 3, step: 1 }),
        tall: 176, cap: 'Effort from 0 (rest) to 3 (hard) in a training week that mixes hard days, easy days and rest, much like Longboat’s plan.' },
      { box: 'At war', text: 'In the First World War, Longboat served as a dispatch runner in France, carrying messages between units. He was wounded twice and once was wrongly reported dead.' },
      'Longboat died in 1949. Two years later, the Tom Longboat Awards began. They still honour outstanding Indigenous athletes in Canada every year. His story shows how an athlete who listened to his own body was more than half a century ahead of the experts.'
    ],
    guide: { before: 'Ask what the child knows about how muscles get stronger. Teach <b>recovery</b> and <b>stereotypes</b>. Read the effort chart together: count the hard days and rest days.',
      after: 'Plan your own active week with hard, easy and rest days. Why does rest matter?' },
    words: [['recovery', 'the time when the body rests and repairs itself'], ['stereotypes', 'unfair ideas that all people in a group are the same']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the chart, how many rest days are in the week?',
        opts: ['one', 'two', 'three', 'none'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Longboat’s managers call him lazy?',
        opts: ['He took easy days and rest days.', 'He lost the Boston Marathon.', 'He refused to race.', 'He ran too slowly.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain, using the text, why rest days make an athlete stronger.',
        a: 'Hard training slightly damages muscle fibres. During recovery, the body repairs them and they become stronger. Without rest, athletes get tired and injured.', look: 'damage, repair, stronger, in that order' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How was Longboat treated unfairly? Give two examples from the text.',
        a: 'He was sent to a residential school. Newspapers insulted him with stereotypes about Indigenous people, and his managers called him lazy.', look: 'two examples of unfair treatment' },
      { k: 'choice', code: 'B2.1', q: '<b>Dis</b>agreed, <b>dis</b>like and <b>dis</b>honest share a prefix. <b>Dis-</b> means …',
        opts: ['not, or the opposite of', 'again', 'before', 'very'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Why do you think the writer chose the title “Ahead of His Time”?',
        a: 'Because Longboat trained with hard and easy days long before experts agreed it worked. His ideas were decades ahead of the coaches of his day.', look: 'links the title to his training ideas' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Connect this text to your own sport, music or other practice. When have you needed rest to improve?',
        a: 'In hockey, I play better after a rest day. When I practised every day without rest, my legs felt heavy and I got slower.', look: 'a personal connection linked to recovery' }
    ]
  });

  P.add({
    id: 'g8-titanic', subject: 'history', form: 'Report',
    title: 'The City That Answered the Titanic',
    deck: 'When the largest ship in the world sank in 1912, Halifax took on the hardest work of all',
    hero: {
      photo: 'g8-titanic.jpg', credit: 'Photo: 1912, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'RMS Titanic in 1912. It was called the largest moving object people had ever built.'
    },
    body: [
      'Just before midnight on April 14, 1912, the RMS <i>Titanic</i> struck an iceberg in the North Atlantic, about 600 kilometres off the coast of Newfoundland. Less than three hours later, the giant ship broke apart and sank. More than 1500 people died in the freezing water. About 700 survivors were rescued by the ship <i>Carpathia</i> and taken to New York. The ship had been called unsinkable. Its loss shocked the world, and the story is still retold in books, films and museums more than a century later.',
      { fig: bars([[2200, 'people', 'on board'], [1178, 'lifeboat', 'seats'], [710, 'survivors']], { max: 2400, step: 800 }),
        tall: 172, cap: 'There were seats in the lifeboats for only about half the people on board (numbers rounded).' },
      { h: 'Messages through the air' },
      'The <i>Titanic</i> carried a new invention: a <b>wireless</b> radio that sent messages in Morse code. Its operators called for help again and again. A station at Cape Race, Newfoundland, picked up the signals and passed the news to the world. Some ships nearby never heard the calls, because their only radio operator had gone to bed. The <i>Carpathia</i> raced through the dark for more than three hours to reach the lifeboats.',
      { box: 'A deck chair', text: 'Halifax’s Maritime Museum of the Atlantic displays a wooden deck chair recovered from the sea after the sinking.' },
      { h: 'Halifax’s grim task' },
      'Halifax, Nova Scotia, was the nearest large port with a railway. The shipping company, the White Star Line, hired a Halifax cable ship, the <i>Mackay-Bennett</i>, to search the sea. Its crew found 306 victims. Back in Halifax, workers prepared bodies for families, and the city held funerals for strangers. Today, 150 <i>Titanic</i> victims lie in three Halifax cemeteries, many under small grey stones marked only with a number and the date.',
      { h: 'Lessons learned' },
      'The disaster led to new <b>regulations</b> for ships. A 1914 agreement among many countries required lifeboat seats for every person on board and lifeboat drills on every voyage. Ships had to keep a radio watch all day and all night. An International Ice Patrol began tracking icebergs in the North Atlantic. Because of these rules, the <i>Titanic</i> left a <b>legacy</b> of safety that protects travellers at sea today.'
    ],
    guide: { before: 'Find Halifax, Cape Race and the North Atlantic on a map. Teach <b>wireless</b>, <b>regulations</b> and <b>legacy</b>. Read the bar graph: compare the first two bars.',
      after: 'Why did it take a disaster to change the rules? Can you think of another safety rule that came from an accident?' },
    words: [['wireless', 'sending messages through the air by radio waves, without wires'], ['regulations', 'official rules'], ['legacy', 'something left behind for people who come later']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the bar graph show?',
        opts: ['There were not enough lifeboat seats.', 'Most people survived.', 'Every seat was used.', 'The ship was half empty.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why was Halifax given the task of recovering the victims?',
        opts: ['It was the nearest large port with a railway.', 'The ship was built there.', 'The survivors lived there.', 'It was the ship’s last stop.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart: what went wrong, and what changed.', cols: ['Problem in 1912', 'New rule'],
        rows: [['too few lifeboat seats', null], ['radio operators went to bed', null], [null, 'an ice patrol tracks icebergs']],
        a: [[null, 'a seat for every person, and drills'], [null, 'a radio watch day and night'], ['the ship hit an iceberg', null]] },
      { k: 'choice', code: 'C1.3', q: 'Which text pattern does the last section use?',
        opts: ['cause and effect', 'compare and contrast', 'a list of steps', 'a description of a place'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Why are <i>Titanic</i>, <i>Carpathia</i> and <i>Mackay-Bennett</i> in italics?',
        opts: ['They are the names of ships.', 'They are foreign words.', 'They are quotations.', 'They are new vocabulary.'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Some graves are marked “only with a number and the date.” What does this detail make you feel or understand?',
        a: 'It is sad, because these people were never identified. It shows how huge and confusing the disaster was, and that families never found out what happened.', look: 'a feeling or idea linked to the detail' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which section did you have to read slowly or reread? What helped you understand it?',
        a: 'I reread “Messages through the air” because I did not know Morse code. The sentence about Cape Race passing on the news helped me understand.', look: 'names a section and a fix-up strategy' }
    ]
  });

  P.add({
    id: 'g8-night-lights', subject: 'geography', form: 'Explanation',
    title: 'A Map Made of Light',
    deck: 'A photo of Earth at night shows where people live, and where they do not',
    hero: {
      photo: 'g8-night-lights.jpg', credit: 'Image: NASA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Western North America at night, seen by a satellite. Bright clusters are cities; dark areas have few people.'
    },
    body: [
      'Look at a satellite picture of North America at night, and you are looking at a map of people. Cities glow like spilled sugar. Highways show up as thin strings of light that link one city to the next. Huge areas of the North are almost completely dark. Geographers use pictures like this to study <b>population distribution</b>: the pattern of where people live.',
      { h: 'Clustered and sparse' },
      'People are not spread evenly across the land. In some places they are <b>clustered</b>, or crowded together, in cities and towns. In other places they are sparse, or thinly scattered. Canada is the second-largest country in the world, but most Canadians live in a narrow band in the south, within a few hundred kilometres of the border with the United States. The lights show it clearly: a long chain of bright spots from Vancouver to Montréal, then darkness to the north.',
      { fig: [[0, 'sparse', 6], [1, 'clustered', 40]].map(function (b) { var x0 = 20 + b[0] * 150, out = '<rect class="k" x="' + x0 + '" y="10" width="110" height="110"/>'; for (var i = 0; i < b[2]; i++) { var x = x0 + 8 + ((i * 37) % 94), y = 18 + ((i * 53) % 94); if (b[0]) { x = x0 + 30 + ((i * 17) % 50); y = 30 + ((i * 29) % 50); } out += '<circle class="dot" cx="' + x + '" cy="' + y + '" r="3"/>'; } return out + tx(x0 + 55, 140, 'lb', b[1], 'middle'); }).join(''),
        tall: 150, cap: 'Each dot is a family. On the left, families are spread out; on the right, they crowd together.' },
      { h: 'Why people live where they do' },
      'Many <b>factors</b> help explain the pattern. Climate matters: few people choose to live where winters are long and the growing season is short. Landforms matter too: flat plains and river valleys are easier to farm and build on than mountains or muskeg. Water draws people, for drinking, farming and transport, which is why so many cities grow beside lakes, rivers and coasts. Jobs matter most of all today, because people move to where the work is. Many small towns have shrunk as young people leave for jobs in the cities.',
      { box: 'Density', text: 'Population <b>density</b> is the number of people per square kilometre. Canada has only about 4 people per square kilometre. The City of Toronto has more than 4000.' },
      { h: 'What the dark hides' },
      'A night-light map has limits. Small communities, including many First Nations and Inuit communities in the North, use little outdoor lighting and barely show up. A dark area is not an empty area. To understand where people live, geographers combine these pictures with census counts, maps and the knowledge of the people who live there.'
    ],
    guide: { before: 'Look at the photo together first and point out cities you know. Teach <b>population distribution</b>, <b>clustered</b>, <b>factors</b> and <b>density</b>.',
      after: 'Where do most people in your province live? Which factors from the text explain it?' },
    words: [['population distribution', 'the pattern of where people live in an area'], ['clustered', 'crowded together in groups'], ['density', 'how many people live in each square kilometre']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which square shows a clustered pattern?',
        opts: ['the right square', 'the left square', 'both squares', 'neither square'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In this text, <b>sparse</b> means …',
        opts: ['thinly scattered', 'very bright', 'crowded', 'near water'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart of factors that affect where people live.', cols: ['Factor', 'How it affects where people live'],
        rows: [['climate', null], [null, 'flat plains and valleys are easier to farm and build on'], ['water', null]],
        a: [[null, 'few people live where winters are long'], ['landforms', null], [null, 'cities grow beside lakes, rivers and coasts']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might a dark area on the map not be empty?',
        a: 'Small communities, such as many in the North, use little outdoor lighting, so people live there even though the satellite barely sees them.', look: 'small communities with little lighting' },
      { k: 'choice', code: 'C1.1', q: '“The lights show <b>it</b> clearly.” <b>It</b> refers to …',
        opts: ['most Canadians living in a narrow band in the south', 'the border with the United States', 'the second-largest country', 'the North'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The writer warns that a night-light map has limits. Why is it important to include this warning?',
        a: 'Without it, readers might think the North is empty and forget the communities there. It shows that one source can be incomplete.', look: 'recognizes the risk of a misleading source' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think about your own town or city. Is its population clustered or sparse? Use one factor from the text to explain why.',
        a: 'My city is clustered along the lake. Water explains it, because the lake gave early settlers transport and drinking water.', look: 'applies a term and a factor to a real place' }
    ]
  });

  P.add({
    id: 'g8-garment-factory', subject: 'geography', form: 'Feature article',
    title: 'Who Made Your Shirt?',
    deck: 'Many clothes sold in Canada are sewn in Bangladesh. A disaster in 2013 made the world look closer.',
    hero: {
      photo: 'g8-garment-factory.jpg', credit: 'Photo: Fahad Faisal, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Workers sew dress shirts in a garment factory in Bangladesh.'
    },
    body: [
      'Check the label inside your shirt. There is a good chance it says <i>Made in Bangladesh</i>. This small country in South Asia, with about 170 million people, is one of the largest clothing makers in the world. Millions of its workers, most of them women, sew garments that end up in stores in Canada, the United States and Europe.',
      { fig: flow(['cotton is grown and spun', 'cloth is sewn in Bangladesh', 'clothes are shipped overseas', 'shoppers buy them in Canada']),
        tall: 150, cap: 'A simple supply chain for a shirt.' },
      { h: 'A global supply chain' },
      'A shirt travels a long way. Cotton may be grown in one country, spun and woven in another, and sewn in a third. This path is called a <b>supply chain</b>. Companies in wealthy countries choose factories where wages are low, so clothes can be sold cheaply. For Bangladesh, the work has brought jobs and money. Clothing makes up more than three quarters of what the country sells to the world, and many young women earn their own wages for the first time. Some of those wages pay for younger brothers and sisters to stay in school.',
      { h: 'The collapse' },
      'On April 24, 2013, an eight-storey building called Rana Plaza collapsed near the capital, Dhaka. It held five clothing factories. The day before, workers had seen cracks in the walls, but they were told to return to work. More than 1100 people were killed. In the rubble, rescuers found labels from well-known brands, including one sold in Canadian stores.',
      { box: 'After Rana Plaza', text: 'More than 200 clothing companies signed an agreement to pay for independent safety inspections of the factories they used. Thousands of buildings were checked, and many cracked walls, blocked exits and unsafe wires were repaired.' },
      { h: 'Whose responsibility?' },
      'The disaster raised hard questions about <b>economic development</b>. Should shoppers stop buying clothes from Bangladesh? Most workers’ groups said no, because millions of families depend on those jobs. Instead, they asked companies to pay fair wages, allow workers to form unions and keep buildings safe. Some shoppers now ask, before they buy, who made their clothes and how those workers are treated. A few brands now publish lists of the factories they use, so anyone can check.'
    ],
    guide: { before: 'Look at the labels on a few clothes at home and find the countries on a map. Teach <b>supply chain</b> and <b>economic development</b>. Follow the flow chart from top to bottom.',
      after: 'Would you pay more for a shirt if you knew the workers were paid fairly and safe? Why or why not?' },
    words: [['supply chain', 'all the steps and places a product passes through before it is sold'], ['economic development', 'the growth of a country’s wealth, jobs and quality of life']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Number the steps in the supply chain.',
        items: ['Cotton is grown and spun.', 'Cloth is sewn in Bangladesh.', 'Clothes are shipped overseas.', 'Shoppers buy them in Canada.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do companies choose factories in Bangladesh?',
        opts: ['Wages are low, so clothes can be sold cheaply.', 'Cotton grows best there.', 'The factories are the safest.', 'Canada requires it.'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: '“Workers <b>had seen</b> cracks in the walls.” This verb shows an action that …',
        opts: ['happened before another past event', 'is happening now', 'will happen later', 'happens every day'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why did workers’ groups say shoppers should not stop buying clothes from Bangladesh? Do you agree?',
        a: 'Because millions of families depend on the jobs. I agree: better rules and fair wages help workers more than losing their jobs would.', look: 'the workers’ groups’ reason and a supported opinion' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Whose voices are heard in this article, and whose are missing? What would a garment worker add?',
        a: 'We hear about companies, shoppers and workers’ groups, but no worker speaks. A worker could tell us what a day in the factory is really like.', look: 'notices a missing voice and what it would add' },
      { k: 'choice', code: 'C1.5', q: 'Why does the writer begin by asking readers to check the label in their shirt?',
        opts: ['to connect a faraway issue to the reader’s own life', 'to sell more shirts', 'to explain how to read a label', 'to show where cotton grows'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the two sides of clothing factories for Bangladesh.',
        a: 'Factories bring jobs and wages, especially for women. But wages are low and some buildings were unsafe, as the Rana Plaza collapse showed.', look: 'one benefit and one harm, briefly' }
    ]
  });

  P.add({
    id: 'g8-microfinance', subject: 'social', form: 'Explanation',
    title: 'A Small Loan, a Big Idea',
    deck: 'Can lending a few dollars to people with no money help end poverty?',
    hero: {
      photo: 'g8-microfinance.jpg', credit: 'Photo: Jaimoen87, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Members of a women’s savings and loan group meet in Kerala, India.'
    },
    body: [
      'In 1976, an economics professor named Muhammad Yunus walked through a village near his university in Bangladesh. He met women who made bamboo stools. They had to borrow money to buy bamboo from a trader, who then paid them almost nothing for the stools. Yunus lent 42 women a total of about 27 American dollars from his own pocket. They paid him back, and he began to wonder how far the idea could go. With a fair loan, the women could buy their own bamboo, sell their stools at a fair price and keep the profit.',
      { h: 'How a group loan works' },
      'Banks usually lend only to people who own something valuable, such as land or a house, which the bank can take if the loan is not repaid. This is called <b>collateral</b>. The poorest people have none. Yunus’s solution was to lend tiny amounts to small groups, mostly women. Members meet every week, encourage each other and repay a little at a time. If one member falls behind, the others notice and help, because the next loans in the group depend on everyone repaying. Most loans are used to start or grow a small business, such as raising goats, selling vegetables or sewing clothes.',
      'In 1983, Yunus started the Grameen Bank, which means “village bank.” Borrowers pay <b>interest</b>, an extra charge for using the money, which helps the bank lend to others. In 2006, Yunus and the Grameen Bank won the Nobel Peace Prize. The idea, now called <b>microfinance</b>, spread around the world, including to self-help groups in India and programs in Canada.',
      { fig: flow(['a group of five women meets weekly', 'two members receive small loans', 'they repay a little each week', 'then the next members can borrow']),
        tall: 150, cap: 'One common way that group loans are shared.' },
      { box: 'Not a magic answer', text: 'In 2015, researchers published six careful studies from different countries. Small loans helped some families start or grow businesses, but on average they did not lift most borrowers out of poverty.' },
      { h: 'What we have learned' },
      'Microfinance has given millions of people, especially women, a way to save, borrow and plan. It works best when it comes with training, savings and fair interest rates. When lenders charge too much, some borrowers fall deeper into debt. Most experts now see small loans as one useful tool against poverty, alongside schools, health care and decent jobs.'
    ],
    guide: { before: 'Talk about what a bank does. Teach <b>collateral</b>, <b>interest</b> and <b>microfinance</b>. Follow the steps of the group loan in the flow chart.',
      after: 'Why do you think group loans were given mostly to women? What else besides a loan might a family need to escape poverty?' },
    words: [['collateral', 'something valuable a borrower promises to give up if a loan is not repaid'], ['interest', 'an extra charge paid for borrowing money'], ['microfinance', 'small loans and savings services for people with little money']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why could the poorest people not borrow from banks?',
        opts: ['They had no collateral.', 'Banks were closed.', 'They did not want loans.', 'Loans were illegal.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the flow chart, when can the next members borrow?',
        opts: ['after the first two repay', 'right away', 'after one year', 'never'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how the group helps make sure loans are repaid.',
        a: 'Members meet every week, encourage each other and repay a little at a time. If one falls behind, the others notice and the next members cannot borrow until loans are repaid.', look: 'weekly meetings, encouragement and the group noticing' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Before you read the box, did you think microfinance would end poverty? How did the evidence change your thinking?',
        a: 'At first I thought it was a perfect solution. The studies showed it helps some families but not most, so now I see it as one tool among many.', look: 'describes a change in thinking based on evidence' },
      { k: 'choice', code: 'B2.1', q: 'In <b>micro</b>finance, <b>micro</b>scope and <b>micro</b>wave, <b>micro-</b> means …',
        opts: ['very small', 'very large', 'money', 'far away'], a: 0 },
      { k: 'lines', code: 'C1.3', n: 3, q: 'The text moves from a story, to how loans work, to what studies found. Why is this a good way to organize it?',
        a: 'The story makes us interested, the middle explains the idea, and the end tests whether it works, so readers can judge it fairly.', look: 'explains the purpose of each part of the structure' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Using the last section, summarize when microfinance works best and when it can cause harm.',
        a: 'It works best with training, savings and fair interest. It can harm people when lenders charge too much and borrowers fall into debt.', look: 'conditions for success and for harm' }
    ]
  });

  P.add({
    id: 'g8-energy-drinks', subject: 'health', form: 'Fact sheet',
    title: 'Energy Drinks: Know the Facts',
    deck: 'Bright cans promise power and focus. Here is what is really inside.',
    hero: {
      photo: 'g8-energy-drinks.jpg', credit: 'Photo: Coolgurl5555, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Energy drinks on display in a store in Alberta. Bold colours and names are part of how they are sold.'
    },
    body: [
      'Energy drinks are sold beside the pop in almost every corner store. Their cans show lightning bolts, extreme sports and words like <i>blast</i> and <i>charge</i>. Many teens drink them before games, tests or late nights. But what do they actually do to a growing body? And are they as harmless as the advertising suggests? This fact sheet looks at the ingredients, the safe limits and the better choices.',
      { h: 'What is in the can?' },
      'The main active ingredient is <b>caffeine</b>, a stimulant that speeds up the brain and nervous system. A large can of energy drink can contain about as much caffeine as a strong cup of coffee, and much more than a can of cola. Many energy drinks also contain a lot of sugar: a 473 mL can may hold about 13 teaspoons. Some drinks add other ingredients, such as taurine or guarana, a plant that contains even more caffeine.',
      { fig: bars([[40, 'cola', '355 mL'], [50, 'black tea', '237 mL'], [135, 'coffee', '237 mL'], [160, 'energy drink', '473 mL']], { max: 180, step: 60, unit: ' mg' }),
        tall: 172, cap: 'Approximate caffeine in common drinks, in milligrams (mg). Amounts vary by brand.' },
      { h: 'How much is too much?' },
      'Health Canada says teens aged 13 and older should have no more than 2.5 mg of caffeine for each kilogram of body weight per day. For a 50 kg teen, that is 125 mg, less than one large can. Too much caffeine can cause a racing heart, headaches, an upset stomach, nervousness and trouble sleeping. Caffeine affects young people more strongly because their bodies are smaller. Because caffeine stays in the body for many hours, a can after school can still keep you awake at bedtime.',
      { box: 'Read the label', text: 'In Canada, energy drink cans must say they are not recommended for children, and they may not contain more than 180 mg of caffeine per can.' },
      { h: 'Not a sports drink' },
      'Energy drinks are not the same as sports drinks, and they are not a good way to stay <b>hydrated</b> during exercise. Mixed with heavy activity, caffeine can make the heart work even harder. Sports drinks replace water and salts lost in sweat; energy drinks do not. For real energy, health experts recommend the basics: enough sleep, regular meals and water. They are less exciting than a can with a lightning bolt, but they work every time.'
    ],
    guide: { before: 'Look at a drink label together and find the caffeine and sugar. Teach <b>caffeine</b> and <b>hydrated</b>. Read the bar graph and compare the bars.',
      after: 'Design a more honest label for an energy drink. What would it say?' },
    words: [['caffeine', 'a substance in coffee, tea and energy drinks that speeds up the body'], ['hydrated', 'having enough water in your body']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, which drink has the least caffeine?',
        opts: ['cola', 'black tea', 'coffee', 'energy drink'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this is a fact sheet?',
        opts: ['headings that organize facts on one topic', 'a story with characters', 'rhyming lines', 'a letter greeting'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Use the text to complete the chart for a teen.', cols: ['Body weight', 'Daily caffeine limit'],
        rows: [['40 kg', null], ['50 kg', '125 mg'], ['60 kg', null]],
        a: [[null, '100 mg'], [null, null], [null, '150 mg']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Energy drink cans show lightning bolts and extreme sports. What message are the companies sending, and what do they leave out?',
        a: 'They suggest the drink makes you powerful and exciting. They leave out the side effects, such as a racing heart and trouble sleeping.', look: 'the advertising message and what is missing' },
      { k: 'choice', code: 'B3.3', q: 'In “a racing heart, headaches, an upset stomach, nervousness and trouble sleeping,” the commas …',
        opts: ['separate items in a list', 'show a quotation', 'join two sentences', 'show a pause for effect'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might a can of energy drink after school affect a teen’s sleep?',
        a: 'Caffeine stays in the body for many hours, so it can still be working at bedtime and make it hard to fall asleep.', look: 'caffeine lasts for hours' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict what might happen to a student who drinks two energy drinks before a hockey game. Use facts from the text.',
        a: 'They would have more caffeine than the safe limit and their heart would work harder during the game. They might feel shaky, sick or unable to sleep later.', look: 'a prediction using at least two facts' }
    ]
  });

  P.add({
    id: 'g8-ski-race', subject: 'health', form: 'Explanation',
    title: 'The Engine Inside',
    deck: 'Cross-country skiers have some of the strongest hearts and lungs in sport. What can they teach the rest of us?',
    hero: {
      photo: 'g8-ski-race.jpg', credit: 'Photo: Denali National Park and Preserve, CC BY 2.0, Wikimedia Commons', focus: '50% 45%',
      tall: 190,
      cap: 'Young skiers in a cross-country race. The sport uses the arms, legs and core at the same time.'
    },
    body: [
      'A cross-country ski race looks peaceful from a distance: skiers gliding through snowy trees. Up close, it is one of the hardest events in sport. Skiers push with their legs and pull with their arms up steep hills, often for more than an hour. Scientists who test athletes’ fitness have found that top cross-country skiers have some of the strongest hearts and lungs ever measured.',
      { fig: bars([[70, 'resting'], [110, 'walking'], [150, 'easy ski'], [190, 'race', 'sprint']], { max: 210, step: 70 }) + tx(46, 12, 'n', 'heart rate (beats per minute)'),
        tall: 172, cap: 'Approximate heart rates for a fit teenager at different levels of effort.' },
      { h: 'Aerobic fitness' },
      'Your muscles need oxygen to keep working for a long time. Your lungs take in the oxygen, and your heart pumps it to your muscles in the blood. Exercise that makes your heart and lungs work harder for many minutes is called <b>aerobic</b> exercise. Over weeks of training, the heart grows stronger and pumps more blood with each beat. That is why a fit person often has a lower resting heart rate.',
      { box: 'A Canadian champion', text: 'In 2002, Beckie Scott of Vermilion, Alberta, became the first North American woman to win an Olympic medal in cross-country skiing. She later spoke out strongly against athletes who cheat by taking drugs.' },
      { h: 'Measuring your effort' },
      'You can check your effort by measuring your heart rate: count your pulse at your wrist or neck for 15 seconds, then multiply by 4. A rough estimate of your maximum heart rate is 220 minus your age. During <b>moderate</b> activity, such as a brisk walk, your heart beats at roughly 60 to 75 percent of its maximum. You can still talk, but not sing. During <b>vigorous</b> activity, such as a ski race, it beats faster, and you can say only a few words at a time.',
      { h: 'How much do you need?' },
      'Canada’s movement guidelines for young people say to get at least 60 minutes of moderate to vigorous activity every day, with vigorous activity on at least three days a week. You do not need skis. Running, swimming, dancing, cycling and shovelling snow all count. The best activity is one you enjoy enough to keep doing all year.'
    ],
    guide: { before: 'Take your pulse together for 15 seconds and multiply by 4. Teach <b>aerobic</b>, <b>moderate</b> and <b>vigorous</b>. Read the bar graph aloud.',
      after: 'Keep a three-day activity log. Which activities were moderate, and which were vigorous?' },
    words: [['aerobic', 'exercise that makes the heart and lungs work harder for a long time'], ['moderate', 'medium in amount or effort'], ['vigorous', 'hard and energetic']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, about how much faster does the heart beat in a race sprint than at rest?',
        opts: ['about 120 more beats', 'about 20 more beats', 'about 70 more beats', 'about the same'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does a fit person often have a lower resting heart rate?',
        opts: ['The heart pumps more blood with each beat.', 'They breathe less.', 'Their muscles need no oxygen.', 'They sleep more.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Use the text to estimate each maximum heart rate (220 minus age).', cols: ['Age', 'Estimated maximum heart rate'],
        rows: [['13', null], ['14', null], ['40', null]],
        a: [[null, '207 beats per minute'], [null, '206 beats per minute'], [null, '180 beats per minute']] },
      { k: 'choice', code: 'B3.2', q: '“Skiers push with their legs and <b>pull</b> with their arms.” The word <b>pull</b> is …',
        opts: ['a verb', 'a noun', 'an adjective', 'an adverb'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How can you tell the difference between moderate and vigorous activity without counting your pulse?',
        a: 'In moderate activity you can talk but not sing. In vigorous activity you can say only a few words at a time.', look: 'the talk test for both levels' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Give two different reasons someone might read this text, and say which section would help each reader most.',
        a: 'A coach might read it to plan training, using “Measuring your effort.” A parent might want to know how much activity a child needs, using the last section.', look: 'two purposes matched to sections' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'The text says the best activity is one you enjoy. Which activity would you choose to meet the guidelines, and why?',
        a: 'I would choose basketball, because I enjoy it with friends and it makes me breathe hard, so it counts as vigorous activity.', look: 'a personal choice linked to the guidelines' }
    ]
  });

  P.add({
    id: 'g8-film-editing', subject: 'arts', form: 'Feature article',
    title: 'The Invisible Art',
    deck: 'Film editors decide what you see and in what order. If they do their job well, you never notice them.',
    hero: {
      photo: 'g8-moviola.jpg', credit: 'Photo: Biswarup Ganguly, CC BY 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A Moviola film-editing machine. For decades, editors watched film through its small viewer, then cut and taped the strips together by hand.'
    },
    body: [
      'A movie is not filmed in the order you watch it. A director may shoot the last scene on the first day and record the same moment twenty times from different angles. Weeks later, in a dark room, a film <b>editor</b> chooses which pieces to use and joins them together. Editing is sometimes called the invisible art, because when it is done well, viewers never notice it.',
      { h: 'Shots and cuts' },
      'Each continuous piece of film, from the moment the camera starts until it stops, is called a <b>shot</b>. The point where one shot changes to the next is a cut. For most of film history, a cut was a real cut. Editors used machines like the Moviola to find the right frame, sliced the film with a blade and joined the pieces with tape. Today, editors work on computers, but they still use the same words.',
      { h: 'An experiment with a face' },
      'In the 1920s, a Russian filmmaker named Lev Kuleshov tried an experiment. He took one shot of an actor with a calm, blank face. He joined it to a shot of a bowl of soup, then to a shot of a coffin, then to a shot of a child playing. Audiences praised the actor’s performance. They said he looked hungry, then sad, then full of love. But the face was exactly the same each time.',
      'This is now called the Kuleshov effect. It shows that meaning in film comes not only from each shot, but from the way shots are <b>juxtaposed</b>, or placed side by side. Viewers fill in the connection themselves.',
      { fig: [['a bowl of soup', 'hunger'], ['a coffin', 'grief'], ['a child playing', 'love']].map(function (r, i) { var y = 6 + i * 46; return '<rect class="k" x="10" y="' + y + '" width="56" height="38" rx="3"/><circle class="k" cx="38" cy="' + (y + 19) + '" r="11"/>' + tx(80, y + 24, 'lb', '+', 'middle') + '<rect class="k" x="94" y="' + y + '" width="56" height="38" rx="3"/>' + tx(122, y + 23, 'n', 'shot ' + (i + 2), 'middle') + tx(164, y + 24, 'lb', '→', 'middle') + tx(180, y + 18, 'n', r[0]) + tx(180, y + 32, 'lb', 'viewers see ' + r[1]); }).join(''),
        tall: 144, cap: 'The Kuleshov effect: the same face seems to show different feelings, depending on the shot that follows it.' },
      { box: 'Pacing', text: 'Editors also control pacing. Many quick cuts make a chase scene feel fast and tense. Long shots with few cuts make a quiet scene feel calm.' },
      { h: 'Editing everywhere' },
      'The same techniques are used in news reports, advertisements and the short videos on your phone. An editor can make a crowd look huge or small, make a speaker seem nervous or confident, and make a product look exciting. Knowing how editing works helps you ask what was left out.'
    ],
    guide: { before: 'Watch a short movie trailer together and count the cuts. Teach <b>shot</b>, <b>editor</b> and <b>juxtaposed</b>. Read the diagram row by row.',
      after: 'Film a short scene with a phone in two different orders. How does the order change the meaning?' },
    words: [['editor', 'a person who chooses and arranges the parts of a film or text'], ['shot', 'one continuous piece of film, from when the camera starts until it stops'], ['juxtaposed', 'placed side by side to compare or contrast']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What stays the same in all three rows of the diagram?',
        opts: ['the actor’s face', 'the second shot', 'what viewers see', 'nothing'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is editing called “the invisible art”?',
        opts: ['When it is done well, viewers do not notice it.', 'Editors work in the dark.', 'It is never shown on screen.', 'Nobody knows who the editors are.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain what the Kuleshov effect shows about how viewers understand film.',
        a: 'Viewers get meaning from how shots are placed together. The same blank face seemed hungry, sad or loving depending on the next shot.', look: 'meaning comes from juxtaposition, with the example' },
      { k: 'lines', code: 'A2.4', n: 3, q: 'Choose one editing technique from the text. Explain how a news report or ad could use it to influence viewers.',
        a: 'Quick cuts can make an ad feel exciting, so the product seems thrilling even if it is ordinary.', look: 'names a technique and its effect on viewers' },
      { k: 'choice', code: 'B2.2', q: 'In this text, the word <b>cut</b> means …',
        opts: ['the change from one shot to the next', 'an injury', 'a smaller share', 'a haircut'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Did you understand the Kuleshov experiment from the paragraph alone, or did you need the diagram? Explain.',
        a: 'I was confused about which shot came first. The diagram showed the face, then the second shot, and what viewers saw, so it made sense.', look: 'monitors understanding and names what helped' },
      { k: 'lines', code: 'A2.5', n: 3, q: 'The last section says knowing about editing helps you “ask what was left out.” Why is this important for viewers?',
        a: 'Because editors choose what to show, a video may give only one side. Asking what was left out helps you think for yourself.', look: 'links editing choices to critical viewing' }
    ]
  });

  P.add({
    id: 'g8-carr-church', subject: 'arts', form: 'Art analysis',
    title: 'A Small Church, a Giant Forest',
    deck: 'Emily Carr painted a tiny white church against a towering dark forest. What was she trying to say?',
    hero: {
      photo: 'g8-carr-church.jpg', credit: 'Painting: Emily Carr, 1929, public domain, Wikimedia Commons', focus: '50% 78%',
      tall: 210,
      cap: 'Emily Carr, Church at Yuquot Village, 1929, oil on canvas, Art Gallery of Ontario.'
    },
    body: [
      'At first glance, the painting seems simple. A small white church with a pointed steeple stands in the middle of the canvas. Behind it rises a forest so dark and massive that it seems to swallow the sky. The church is the brightest thing in the painting, yet it looks tiny, almost fragile. In the foreground, a low fence and a few small crosses mark a graveyard.',
      { fig: '<path class="k" d="M10 150 Q20 40 60 30 Q90 10 120 40 Q150 6 190 30 Q230 10 260 40 Q290 60 290 150"/><path class="t" d="M50 150 Q60 70 90 60 M200 150 Q220 60 250 70"/>' +
          '<rect class="a" x="130" y="98" width="40" height="44"/><path class="a" d="M130 98 L150 76 L170 98 M150 76 V58"/><path class="k" d="M20 150 H290"/>' +
          D.label(186, 16, 'dark forest', 160, 40) + D.label(192, 100, 'white church', 170, 110) + tx(150, 166, 'n', 'foreground', 'middle'),
        tall: 172, cap: 'A sketch of the painting’s composition. The forest fills most of the space.' },
      { h: 'The artist' },
      'Emily Carr was born in Victoria, British Columbia, in 1871. For many years, she travelled to the coast and islands of British Columbia to paint the villages of First Nations peoples, including totem poles and big houses. Few people bought her work, and for a time she nearly gave up painting. In 1927, she met members of the Group of Seven in Toronto, who encouraged her. Her paintings grew bolder and more confident. Two years later, she painted this church at Yuquot, a village of the Mowachaht/Muchalaht First Nation on the west coast of Vancouver Island.',
      { h: 'Reading the painting' },
      'Carr used strong <b>contrast</b> between light and dark. The pale church glows against the green-black trees. She also used <b>scale</b>: the trees are so large compared with the church that the forest seems alive and powerful. The trees are painted as smooth, rounded shapes, almost like sculpture, and they seem to lean in around the clearing. Some viewers see the painting as a sign of the power of the land. Others see the small church as a sign of how newcomers’ beliefs were placed on an ancient place and its peoples.',
      { box: 'A new title', text: 'Carr called the painting <i>Indian Church</i>. In 2018, the Art Gallery of Ontario renamed it <i>Church at Yuquot Village</i>, to replace an outdated term and name the place and its people.' },
      'Carr’s work is admired today, but it also raises questions. She painted Indigenous villages with respect, yet she often described their peoples as vanishing, when in fact they and their cultures were very much alive.'
    ],
    guide: { before: 'Look closely at the painting for one quiet minute before reading. Teach <b>contrast</b> and <b>scale</b>. Find Vancouver Island and Yuquot on a map.',
      after: 'If you renamed one artwork or place in your community, which would it be, and why does a name matter?' },
    words: [['contrast', 'a strong difference, such as light against dark'], ['scale', 'the size of one thing compared with another']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the sketch show about the painting?',
        opts: ['The forest fills most of the space.', 'The church is the largest shape.', 'There is no background.', 'People fill the foreground.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In this text, <b>fragile</b> means …',
        opts: ['easily broken or harmed', 'very old', 'brightly painted', 'very tall'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain two ways Carr makes the forest seem powerful.',
        a: 'She makes the trees huge compared with the church (scale), and she paints them dark against the bright church (contrast), so they seem to swallow the sky.', look: 'scale and contrast, each explained' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The text gives two ways viewers read the painting. Explain each one. Which do you find more convincing?',
        a: 'One says the painting shows the power of the land. The other says the church shows newcomers’ beliefs placed on Indigenous land. I find the second more convincing because the church is so out of place.', look: 'both readings and a reasoned choice' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why did the gallery rename the painting? Why does a name matter?',
        a: 'To replace an outdated term and name the real place and people. A name shows respect and tells viewers whose land it is.', look: 'the reason for renaming and why names matter' },
      { k: 'choice', code: 'B3.3', q: 'Why is <i>Church at Yuquot Village</i> in italics?',
        opts: ['It is the title of an artwork.', 'It is a quotation.', 'It is a place on a map.', 'It is a new word.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'The last paragraph says Carr described Indigenous peoples as “vanishing.” Why does the writer point out that this was wrong?',
        a: 'Because the peoples and cultures she painted were alive then and are alive now. The writer wants readers to admire Carr’s art without accepting that false idea.', look: 'explains the error and why it matters' }
    ]
  });

  P.add({
    id: 'g8-lottery', subject: 'math', form: 'Opinion article',
    title: 'Why I Will Never Buy a Lottery Ticket',
    deck: 'A math teacher explains what the numbers say about winning the jackpot',
    hero: {
      photo: 'g8-lottery.jpg', credit: 'Photo: Santeri Viinamäki, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Filling in a lottery ticket in Finland. Lotteries are run in countries all over the world.'
    },
    body: [
      'Every week, millions of Canadians buy a lottery ticket and dream about what they would do with the jackpot. I understand the dream. But I teach math, and I have done the calculations. That is why I will never buy a ticket. Let me show you the numbers, and you can decide for yourself whether a ticket is worth it.',
      { h: 'Counting the chances' },
      'In Lotto 6/49, you choose 6 numbers from 1 to 49. To win the jackpot, all six must match the numbers drawn. The <b>probability</b> of an event is the number of ways it can happen divided by the number of possible outcomes. There are 13 983 816 different ways to choose six numbers from 49, and only one of them wins. Choosing birthdays, lucky numbers or a random computer pick makes no difference at all. So the probability of winning the jackpot with one ticket is 1 in 13 983 816.',
      { fig: '<path class="k" d="M20 70 H280"/>' + [[20, '0', 'impossible'], [150, '1/2', 'even chance'], [280, '1', 'certain']].map(function (p) { return '<path class="k" d="M' + p[0] + ' 62 V78"/>' + tx(p[0], 96, 'lb', p[1], p[0] < 30 ? 'start' : p[0] > 270 ? 'end' : 'middle') + tx(p[0], 110, 'n', p[2], p[0] < 30 ? 'start' : p[0] > 270 ? 'end' : 'middle'); }).join('') +
          '<circle class="dot" cx="20" cy="70" r="4"/><circle class="dot" cx="150" cy="70" r="4"/><circle class="dot" cx="237" cy="70" r="4"/>' +
          D.label(30, 22, 'jackpot (almost 0)', 22, 66) + D.label(110, 40, 'coin lands heads', 150, 64) + D.label(292, 22, 'die does not show 6', 237, 64, 'end'),
        tall: 120, cap: 'A probability scale from 0 (impossible) to 1 (certain).' },
      { h: 'How small is that?' },
      'Numbers that large are hard to imagine, so try this. If you bought one ticket every week, you would expect to wait about 270 000 years to win once. Or picture 14 million people lined up across Canada, with one prize-winner hidden among them, and you get one guess. You are far more likely to be struck by lightning in your lifetime than to win the jackpot with a single ticket.',
      { box: 'The gambler’s mistake', text: 'Some players avoid numbers that won last week, or choose numbers that have not come up in a while. But each draw is <b>independent</b>: the balls do not remember the past.' },
      { h: 'Where the money goes' },
      'A ticket costs about three dollars. Only about half of all ticket money is paid back as prizes. The rest goes to running the lottery and to government programs. In other words, on average, players lose about half of every dollar they spend. A habit of two tickets a week costs more than 300 dollars a year. Put into a savings account instead, that money would grow, slowly but surely, every single year.',
      'Some people say a ticket buys a few days of hope, and that is worth three dollars. That is their choice. My choice is to keep the money and enjoy dreaming for free.'
    ],
    guide: { before: 'Flip a coin and roll a die together; talk about the chance of each outcome. Teach <b>probability</b> and <b>independent</b>. Place events on the probability scale.',
      after: 'The writer respects people who buy tickets for hope. Is that a fair point? Would you buy a ticket? Why or why not?' },
    words: [['probability', 'how likely something is to happen, from 0 (impossible) to 1 (certain)'], ['independent', 'not affected by what happened before']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'On the scale, why is the jackpot placed almost at 0?',
        opts: ['It is almost impossible.', 'It costs almost nothing.', 'It is certain.', 'It happens every week.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does avoiding last week’s winning numbers not help?',
        opts: ['Each draw is independent.', 'Those numbers are banned.', 'Machines remember the past.', 'Only new numbers can win.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart of probabilities.', cols: ['Event', 'Probability'],
        rows: [['a coin lands heads', null], ['a die shows 6', null], ['one ticket wins the Lotto 6/49 jackpot', null]],
        a: [[null, '1/2'], [null, '1/6'], [null, '1 in 13 983 816']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'This is an opinion article. How does the writer try to persuade readers? Give two techniques.',
        a: 'The writer uses facts and calculations, such as 1 in 13 983 816, and vivid comparisons, such as waiting 270 000 years.', look: 'two persuasive techniques with examples' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is a compound sentence (two complete ideas joined by <i>and</i>, <i>but</i> or <i>so</i>)?',
        opts: ['I understand the dream, but I teach math.', 'A ticket costs about three dollars.', 'That is their choice.', 'Every week, millions of Canadians buy a ticket.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Why does the writer admit that some people buy a ticket for hope? Does it make the argument weaker or stronger?',
        a: 'It shows the writer is fair to the other side. It makes the argument stronger, because readers trust a writer who is not one-sided.', look: 'recognizes a counterargument and judges its effect' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Before reading, what did you predict a math teacher would say about lotteries? Was your prediction confirmed?',
        a: 'I predicted the teacher would say the chances are bad. That was confirmed, but I did not expect the point about where the money goes.', look: 'states a prediction and checks it against the text' }
    ]
  });

  P.add({
    id: 'g8-sickle-cell', subject: 'science', form: 'Explanation',
    title: 'When a Cell Changes Shape',
    deck: 'A red blood cell’s shape is perfect for its job. In sickle cell disease, that shape goes wrong.',
    hero: {
      photo: 'g8-blood-cells.jpg', credit: 'Image: National Cancer Institute, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Human blood seen through an electron microscope. The round, dimpled discs are red blood cells.'
    },
    body: [
      'A single drop of your blood holds millions of red blood cells. Each one is a tiny disc, thinner in the middle than at the edges, like a doughnut that was pressed instead of punched through. This odd shape is no accident. In living things, a cell’s <b>structure</b> is closely matched to its <b>function</b>, the job it does.',
      { h: 'Built for carrying oxygen' },
      'The job of a red blood cell is to carry oxygen from the lungs to every other cell in the body. It is packed with a protein called hemoglobin, which grabs oxygen in the lungs and lets it go where it is needed. Unlike most cells, a mature red blood cell has no nucleus, which leaves more room for hemoglobin. Its flat, dimpled shape gives it a large surface for oxygen to pass through, and it is soft and flexible, so it can fold to squeeze through the narrowest blood vessels.',
      { fig: '<ellipse class="k" cx="70" cy="56" rx="40" ry="40"/><ellipse class="t" cx="70" cy="56" rx="16" ry="16"/><path class="a" d="M190 30 Q250 30 260 80 Q236 54 196 60 Q178 46 190 30 Z"/>' +
          '<path class="k" d="M20 130 H290 M20 150 H290"/><ellipse class="k" cx="70" cy="140" rx="14" ry="6"/><path class="a" d="M214 134 Q236 134 240 146 Q230 140 216 142 Z"/><path class="t" d="M244 134 L262 146 M262 134 L244 146"/>' +
          tx(70, 112, 'n', 'healthy: round and soft', 'middle') + tx(226, 112, 'n', 'sickle: curved and stiff', 'middle') + tx(155, 168, 'n', 'a tiny blood vessel', 'middle'),
        tall: 172, cap: 'A healthy red blood cell bends to pass through a tiny vessel. A sickle cell can get stuck.' },
      { h: 'A change in one gene' },
      '<b>Sickle cell disease</b> is an inherited condition. A small change in the gene for hemoglobin causes the protein to clump together when it gives up oxygen. The red blood cells become stiff and curved like a crescent moon or a farm tool called a sickle. Sickle cells can jam in small blood vessels, blocking blood flow and causing sudden, severe pain. They also break apart after a few weeks instead of the usual four months, so people with the disease often have too few red blood cells and feel very tired.',
      { box: 'Who is affected?', text: 'Sickle cell disease is most common in people whose families come from Africa, the Caribbean, the Middle East, India and the Mediterranean. In Canada, newborns in several provinces, including Ontario, are tested for it at birth.' },
      { h: 'Treating it today' },
      'Medicines, blood transfusions and careful care help many people with sickle cell disease live long, active lives. Some patients have been cured with a transplant of healthy bone marrow, where blood cells are made. Scientists are now testing ways to repair the gene itself.'
    ],
    guide: { before: 'Review the parts of a cell (nucleus, membrane). Teach <b>structure</b>, <b>function</b> and <b>sickle cell disease</b>. Compare the two cell shapes in the diagram.',
      after: 'Find one other cell in the body whose shape suits its job, such as a nerve cell. How does its shape help?' },
    words: [['structure', 'the shape and parts of something'], ['function', 'the job that something does'], ['sickle cell disease', 'an inherited condition in which red blood cells become stiff and curved']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show about sickle cells?',
        opts: ['They can get stuck in tiny vessels.', 'They are larger than vessels.', 'They carry more oxygen.', 'They have a nucleus.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does a mature red blood cell have no nucleus?',
        opts: ['It leaves more room for hemoglobin.', 'It makes the cell stiff.', 'The nucleus is in the lungs.', 'It helps the cell divide.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the two kinds of red blood cell.', cols: ['Healthy red blood cell', 'Sickle cell'],
        rows: [['round, dimpled disc', null], ['soft and flexible', null], [null, 'breaks apart after a few weeks']],
        a: [[null, 'curved like a crescent'], [null, 'stiff, and can jam in vessels'], ['lasts about four months', null]] },
      { k: 'choice', code: 'C1.3', q: 'Which text pattern does the writer mainly use in this explanation?',
        opts: ['compare and contrast, then cause and effect', 'a story in time order', 'a list of steps to follow', 'question and answer'], a: 0 },
      { k: 'choice', code: 'B2.1', q: 'The Greek word <i>haima</i> means blood. Which word comes from it?',
        opts: ['hemoglobin', 'hexagon', 'helmet', 'harvest'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how a change in one protein leads to severe pain.',
        a: 'The changed hemoglobin clumps together, so red blood cells become stiff and curved. They jam in small blood vessels and block blood flow, which causes pain.', look: 'protein, cell shape, blocked vessels, pain, in order' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about cells from science class that helped you understand this text?',
        a: 'I knew most cells have a nucleus and a membrane. That helped me see why it is unusual that red blood cells have no nucleus.', look: 'prior knowledge linked to a detail in the text' }
    ]
  });

  P.add({
    id: 'g8-insulin', subject: 'health', form: 'Report',
    title: 'The Discovery That Belonged to the World',
    deck: 'In 1922, a dying boy in Toronto received an injection that changed medicine forever',
    hero: {
      photo: 'g8-banting-best.jpg', credit: 'Photo: Thomas Fisher Rare Book Library, University of Toronto, CC BY 2.0, Wikimedia Commons', focus: '50% 5%',
      side: { w: 400, view: '0 0 300 150' },
      tall: 200,
      cap: 'Charles Best (left) and Frederick Banting on the roof of the medical building at the University of Toronto, 1921. Beside them: how insulin helps cells use glucose. In type 1 diabetes, the third step is missing.',
      art: flow(['food is digested into glucose', 'glucose travels in the blood', 'insulin unlocks the body’s cells', 'cells use glucose for energy'])
    },
    body: [
      'In January 1922, fourteen-year-old Leonard Thompson lay in a bed at Toronto General Hospital. He weighed less than 30 kilograms. Like everyone at that time with type 1 <b>diabetes</b>, he was expected to die. Then doctors gave him an injection of a new substance made at the University of Toronto. Within weeks, he was gaining weight and strength. He lived for thirteen more years. News of the treatment spread quickly, and desperate families travelled to Toronto from across North America.',
      { h: 'A missing key' },
      'Our cells get energy from glucose, a sugar that comes from the food we eat. After a meal, glucose travels in the blood. To get into most cells, it needs help from <b>insulin</b>, a hormone made by small clusters of cells in the pancreas. Insulin works like a key that unlocks cells so glucose can enter. In type 1 diabetes, the body attacks the cells that make insulin. Glucose builds up in the blood while the body’s cells starve.',
      { h: 'A summer in the lab' },
      'In 1921, a young surgeon named Frederick Banting had an idea for removing insulin from the pancreas. Professor John Macleod gave him a laboratory for the summer and a student assistant, Charles Best. Their early results were rough, and the first injection given to Leonard caused a bad reaction. A chemist, James Collip, found a way to <b>purify</b> the extract. The cleaner insulin worked, and soon children across North America were being saved.',
      { fig: '<circle class="a" cx="150" cy="70" r="30"/>' + tx(150, 74, 'lb', 'insulin', 'middle') + '<path class="t" d="M96 40 L124 56 M204 40 L176 56 M96 104 L124 86 M204 104 L176 86"/>' +
          tx(10, 30, 'lb', 'Banting') + tx(10, 44, 'n', 'had the idea') + tx(290, 30, 'lb', 'Best', 'end') + tx(290, 44, 'n', 'student assistant', 'end') +
          tx(10, 106, 'lb', 'Collip') + tx(10, 120, 'n', 'purified the extract') + tx(290, 106, 'lb', 'Macleod', 'end') + tx(290, 120, 'n', 'lent the lab', 'end'),
        tall: 130, cap: 'Four people, four different jobs in the discovery of insulin.' },
      { box: 'One dollar', text: 'Banting, Best and Collip sold their rights to insulin to the University of Toronto for one dollar each, so that it could be made widely and cheaply.' },
      { h: 'A Nobel Prize, shared' },
      'In 1923, Banting and Macleod won the Nobel Prize in Medicine. Banting was angry that Best had been left out, so he shared his prize money with him. Macleod shared his with Collip. Today, millions of people with diabetes use insulin every day. Many still struggle to afford it, a reminder that a discovery helps only the people who can get it.'
    ],
    guide: { before: 'Ask what the child knows about diabetes. Teach <b>diabetes</b>, <b>insulin</b> and <b>purify</b>. Follow the flow chart and point to the missing step.',
      after: 'The discoverers sold their rights for one dollar. Should life-saving medicines always be cheap? Who should pay?' },
    words: [['diabetes', 'a condition in which the body cannot control the sugar in the blood'], ['insulin', 'a hormone that lets glucose enter the body’s cells'], ['purify', 'to make clean by removing unwanted parts']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the events in the order they happened.',
        items: ['Banting gets a lab for the summer.', 'Leonard has a bad reaction to the first injection.', 'Collip purifies the extract.', 'Banting and Macleod win the Nobel Prize.'], show: [3, 1, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the flow chart, what does insulin do?',
        opts: ['unlocks cells so glucose can enter', 'digests food', 'makes glucose', 'carries oxygen'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“Macleod shared <b>his</b> with Collip.” <b>His</b> refers to Macleod’s …',
        opts: ['prize money', 'laboratory', 'insulin', 'student'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The writer compares insulin to a key. Explain why this comparison fits.',
        a: 'A key opens a lock. Insulin opens the body’s cells so glucose can get in. Without the key, the glucose stays locked out.', look: 'explains what is locked and what is unlocked' },
      { k: 'choice', code: 'B3.2', q: '“Banting was <b>angry</b> that Best had been left out.” The word <b>angry</b> is …',
        opts: ['an adjective', 'a verb', 'a noun', 'an adverb'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The last sentence says “a discovery helps only the people who can get it.” What does this mean? Why might the writer end this way?',
        a: 'A medicine saves no one if people cannot afford it. The writer ends this way to remind us that fairness and access still matter today.', look: 'explains access and the purpose of the ending' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the discovery of insulin in two or three sentences, naming the four people involved.',
        a: 'In 1921, Banting and Best, working in Macleod’s lab, removed insulin from the pancreas. Collip purified it, and in 1922 it saved Leonard Thompson and many others.', look: 'all four people and the main result, briefly' }
    ]
  });

  P.add({
    id: 'g8-welland-canal', subject: 'geography', form: 'Explanation',
    title: 'A Staircase for Ships',
    deck: 'Lake Erie is about 100 metres higher than Lake Ontario. Here is how giant ships climb between them.',
    hero: {
      photo: 'g8-welland-lock.jpg', credit: 'Photo: bgilliard, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A ship in Lock 7 of the Welland Canal in St. Catharines, Ontario.'
    },
    body: [
      'Between Lake Erie and Lake Ontario, the land drops sharply at the Niagara Escarpment. The Niagara River tumbles over this cliff at Niagara Falls. Ships cannot sail over a waterfall, so in 1829 workers dug the first Welland Canal to go around it. Today’s canal, opened in 1932, is 43 kilometres long. It carries ships about 100 metres up or down using eight huge <b>locks</b>.',
      { fig: [0, 1, 2].map(function (i) { var x = 10 + i * 100, lvl = [96, 72, 48][i]; return '<path class="k" d="M' + x + ' 40 V120 H' + (x + 80) + ' V40"/><path class="a" d="M' + (x + 2) + ' ' + lvl + ' H' + (x + 78) + '"/><path class="k" d="M' + (x + 22) + ' ' + (lvl - 12) + ' H' + (x + 58) + ' L' + (x + 52) + ' ' + lvl + ' H' + (x + 28) + ' Z"/>' + tx(x + 40, 140, 'n', ['1. ship enters', '2. chamber fills', '3. ship leaves'][i], 'middle'); }).join('') + tx(150, 20, 'n', 'water flows in from the higher level', 'middle'),
        tall: 148, cap: 'Raising a ship in a lock: the water level rises and lifts the ship.' },
      { h: 'How a lock works' },
      'A lock is a concrete chamber with watertight gates at each end. It works like a water elevator, and it uses no pumps at all. The trick is <b>gravity</b>: water always flows downhill until the water levels are equal. To raise a ship, workers close the gates behind it and open valves that let water from the higher level flow into the chamber. As the chamber fills, the ship floats upward. When the water inside matches the level ahead, the front gates open, and the ship sails out. To lower a ship, the steps run in reverse, and the water drains out to the lower level.',
      { box: 'What do the ships carry?', text: 'Ships called lakers carry iron ore, grain, coal and salt through the canal. One laker can carry as much as hundreds of train cars.' },
      'Filling one lock takes about ten minutes, even though the chamber holds millions of litres of water. Going through the whole canal takes a ship about eleven hours. Locks 4, 5 and 6 are built side by side in pairs and joined end to end like steps, so that ships going up and ships coming down can pass at the same time. This is the staircase that gives the canal its nickname.',
      { h: 'A link in a waterway' },
      'The Welland Canal is part of the St. Lawrence Seaway, a <b>waterway</b> that links the Great Lakes to the Atlantic Ocean. Ships can travel more than 3000 kilometres from the ocean into the heart of North America. Grain from the Prairies can be loaded at Thunder Bay and shipped all the way to the sea. In winter, when ice covers the lakes, the canal closes for repairs. Each spring, the first ship through is greeted with a small ceremony, a sign that the shipping season has begun again.'
    ],
    guide: { before: 'Find Lake Erie, Lake Ontario and Niagara Falls on a map. Teach <b>lock</b>, <b>gravity</b> and <b>waterway</b>. Read the three diagram panels left to right.',
      after: 'How would you explain a lock to a younger child using a bathtub and a toy boat?' },
    words: [['locks', 'chambers with gates that raise or lower ships between water levels'], ['gravity', 'the force that pulls things down toward Earth'], ['waterway', 'a river, canal or lake that ships can travel on']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps for raising a ship in a lock.',
        items: ['The ship enters the lock.', 'The gates behind it close.', 'Valves let water flow in from the higher level.', 'The ship floats upward.', 'The front gates open and the ship sails out.'], show: [3, 0, 4, 2, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what changes from panel 1 to panel 3?',
        opts: ['The water level rises.', 'The ship gets bigger.', 'The gates disappear.', 'The water drains.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does a lock need no pumps?',
        opts: ['Water flows downhill by gravity.', 'Ships push the water.', 'The lake pumps it.', 'Workers carry the water.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why was the Welland Canal needed? Use the first paragraph.',
        a: 'The land drops about 100 metres at the Niagara Escarpment, and ships cannot go over Niagara Falls, so the canal lets them go around it.', look: 'the escarpment or falls as the obstacle' },
      { k: 'choice', code: 'C1.2', q: 'The writer says a lock “works like a water elevator.” Why compare it to an elevator?',
        opts: ['Both move things up and down between levels.', 'Both use electricity.', 'Both are in tall buildings.', 'Both are very fast.'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which was easier to understand: the paragraph about how a lock works, or the diagram? How did using both help?',
        a: 'The diagram was easier because I could see the water rising. The paragraph explained why the water flows in, so together they made sense.', look: 'compares the two and explains how both helped' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'The St. Lawrence Seaway links Thunder Bay to the Atlantic. Why might this matter to a grain farmer in Saskatchewan?',
        a: 'The farmer’s grain can travel by train to Thunder Bay and then by ship to the ocean and other countries, so it can be sold around the world.', look: 'connects the waterway to trade' }
    ]
  });

  P.add({
    id: 'g8-plimsoll', subject: 'science', form: 'Report',
    title: 'The Line That Saved Sailors',
    deck: 'Look closely at the side of a cargo ship and you will find a strange mark. It is about density.',
    hero: {
      photo: 'g8-plimsoll.jpg', credit: 'Photo: David Wright, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A load line mark painted on the side of a ship. The ship may be loaded only until the water reaches the right line.'
    },
    body: [
      'In the 1800s, some shipowners in Britain loaded their ships so heavily that they rode dangerously low in the water. Many of these ships sank in storms, and thousands of sailors drowned. Some owners did not care, because their ships and cargo were insured. Sailors called them coffin ships. A sailor who refused to board an unsafe ship could even be sent to prison.',
      { h: 'A member of Parliament takes on the owners' },
      'Samuel Plimsoll, a member of the British Parliament, campaigned for years to stop the practice. He wrote a book about the dangers, gave angry speeches and was nearly thrown out of Parliament. In 1876, a law finally required every British cargo ship to carry a mark showing how deeply it could safely be loaded. The mark is still called the Plimsoll line. Today, ships around the world must carry a <b>load line</b>.',
      { h: 'Why there are several lines' },
      'A ship floats because the water pushes up on it with a force equal to the weight of the water it moves aside. But not all water is the same. Salt water has a greater <b>density</b> than fresh water: a litre of it has more mass. Denser water pushes up harder, so a ship floats higher in the ocean than in a river. Cold water is also slightly denser than warm water.',
      'So a load line is really a set of lines. A ship loaded to the summer line in the ocean will sink a little deeper when it sails into a freshwater river, and that is allowed. In winter seas, where storms are worse, the ship must carry less and float higher.',
      { fig: '<path class="k" d="M60 20 V140"/>' + [['TF', 32, 'tropical fresh water'], ['F', 54, 'fresh water'], ['T', 76, 'tropical sea'], ['S', 98, 'summer sea'], ['W', 120, 'winter sea']].map(function (r) { return '<path class="' + (r[0] === 'S' ? 'a' : 'k') + '" d="M60 ' + r[1] + ' H110"/>' + tx(116, r[1] + 4, 'lb', r[0]) + tx(146, r[1] + 4, 'n', r[2]); }).join(''),
        tall: 150, cap: 'Load lines (simplified). A ship may sink deepest in warm fresh water and least deep in the winter sea.' },
      { box: 'On the Great Lakes', text: 'Ships on the Great Lakes, which are fresh water, use their own load lines, and the limits change with the seasons.' },
      'Plimsoll’s mark is one of the simplest safety rules ever invented, and it has saved countless lives. It works because of a scientific <b>principle</b> that is more than 2000 years old. The ancient Greek thinker Archimedes first described it, and every ship that floats still obeys it.'
    ],
    guide: { before: 'Float an egg in fresh water, then add salt until it floats. Teach <b>density</b>, <b>load line</b> and <b>principle</b>. Read the load lines from top to bottom.',
      after: 'Why did it take a law, and not just science, to protect sailors?' },
    words: [['load line', 'a mark on a ship that shows how deeply it may be loaded'], ['density', 'how much mass is packed into a certain space'], ['principle', 'a basic rule or law of science']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, where may a ship sink deepest?',
        opts: ['in tropical fresh water', 'in the winter sea', 'in the summer sea', 'in the tropical sea'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did some owners not care if their ships sank?',
        opts: ['Their ships and cargo were insured.', 'They did not own the ships.', 'Ships were cheap to build.', 'The sailors were insured.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why a ship floats higher in the ocean than in a river.',
        a: 'Salt water is denser than fresh water, so it pushes up harder on the ship. The ship does not need to sink as deep to be held up.', look: 'denser salt water pushes up harder' },
      { k: 'choice', code: 'B2.2', q: 'Sailors called overloaded ships “coffin ships.” What does this name suggest?',
        opts: ['They were likely to kill the sailors.', 'They carried coffins.', 'They were made of wood.', 'They were very slow.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How might a shipowner in the 1870s have felt about Plimsoll’s law? How would a sailor have felt?',
        a: 'An owner might be angry because he could carry less cargo and earn less money. A sailor would be grateful because the law made the ships safer.', look: 'two perspectives, each with a reason' },
      { k: 'lines', code: 'C3.1', n: 3, q: 'The last sentence says the mark works because of a principle that is more than 2000 years old. Which principle is it? Use the text.',
        a: 'It is the idea that water pushes up on an object with a force equal to the weight of the water it moves aside, which explains why ships float.', look: 'identifies the buoyancy principle described in the text' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Plimsoll fought for a safety rule. Name another safety rule that protects people today. How is it like the load line?',
        a: 'Seatbelt laws. Like the load line, they are simple rules that save lives, even though some people first said they were not needed.', look: 'a real safety rule and a clear similarity' }
    ]
  });

  P.add({
    id: 'g8-moraine', subject: 'geography', form: 'Report',
    title: 'The Sponge Under the Hills',
    deck: 'North of Toronto, a ridge of sand and gravel left by glaciers stores water for hundreds of thousands of people',
    hero: {
      photo: 'g8-moraine.jpg', credit: 'Photo: Rick Harris, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'Rolling hills and fields on the Oak Ridges Moraine, north of Toronto.'
    },
    body: [
      'Drive north from Toronto and the land begins to rise into rolling hills, kettle ponds and patches of forest. You are crossing the Oak Ridges Moraine, a ridge about 160 kilometres long that stretches from the Niagara Escarpment east to Rice Lake. It looks like ordinary countryside, but underground it is doing an important job for millions of people who live downstream.',
      { h: 'Left by the ice' },
      'About 12 000 years ago, the last great ice sheet was melting. Rivers of meltwater poured out of the ice and dropped huge amounts of sand and gravel between two lobes of the glacier. When the ice was gone, the sand and gravel were left behind as a long, hilly ridge. A ridge of material left by a glacier is called a <b>moraine</b>. Today, gravel pits on the moraine dig up the same sand and gravel to build roads.',
      { fig: '<path class="k" d="M10 70 Q60 70 90 50 Q150 20 210 50 Q240 70 290 70"/><path class="d" d="M30 96 H270"/><path class="t" d="M10 130 H290"/>' + [60, 120, 180, 240].map(function (x) { return D.arrow(x, 18, x, 50, 'a'); }).join('') + D.arrow(230, 100, 286, 104, 'k') + D.arrow(70, 100, 14, 104, 'k') +
          tx(150, 12, 'n', 'rain and snowmelt soak in', 'middle') + tx(150, 88, 'n', 'sand and gravel hold water', 'middle') + tx(150, 122, 'n', 'aquifer', 'middle') + tx(150, 148, 'n', 'water flows out to springs and streams', 'middle'),
        tall: 154, cap: 'A cross-section of the moraine (simplified). Water soaks in at the top and slowly flows out at the sides.' },
      { h: 'A giant sponge' },
      'Sand and gravel have many spaces between their grains. When rain and melting snow fall on the moraine, the water soaks in quickly instead of running off. It collects underground in layers called <b>aquifers</b>. Slowly, over years, the water seeps out of the sides of the moraine into springs, wetlands and the headwaters of about 65 rivers and streams. Many towns pump their drinking water straight from the moraine’s aquifers. The moraine also gives shelter to forests, wetlands and rare animals, such as the Jefferson salamander.',
      { box: 'Paving the sponge', text: 'Roads, parking lots and buildings are <b>impermeable</b>: water cannot soak through them. When they cover the moraine, rain runs off into storm drains instead of filling the aquifers.' },
      { h: 'A fight over the hills' },
      'In the 1990s, the land on the moraine was being bought for new housing. Developers said the growing region needed homes. Residents and environmental groups said that building on the moraine would endanger the water supply. After years of debate, Ontario passed the Oak Ridges Moraine Conservation Act in 2001. It protects most of the moraine from new building, although some development still goes ahead in its towns.'
    ],
    guide: { before: 'Pour water onto sand and onto a plate and compare. Teach <b>moraine</b>, <b>aquifers</b> and <b>impermeable</b>. Find the moraine on a map of southern Ontario.',
      after: 'Should new homes ever be built on the moraine? Give one reason for each side.' },
    words: [['moraine', 'a ridge of sand, gravel and rock left behind by a glacier'], ['aquifers', 'underground layers of rock, sand or gravel that hold water'], ['impermeable', 'not letting water pass through']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the cross-section, where does water leave the moraine?',
        opts: ['at the sides, into springs and streams', 'at the very top', 'into the air', 'nowhere'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>im</b>permeable, the prefix <b>im-</b> means …',
        opts: ['not', 'again', 'under', 'very'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps in how the moraine formed and how it works.',
        items: ['Meltwater drops sand and gravel between lobes of ice.', 'The ice melts, leaving a ridge.', 'Rain and snowmelt soak into the sand and gravel.', 'Water collects in aquifers.', 'Water seeps out into springs and streams.'], show: [2, 4, 0, 3, 1] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is the moraine called a giant sponge?',
        a: 'Like a sponge, its sand and gravel have many spaces that soak up water quickly and hold it, then let it out slowly.', look: 'soaks up, holds and slowly releases water' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Explain the developers’ view and the residents’ view of building on the moraine. Does the writer favour one side?',
        a: 'Developers said the region needed homes. Residents said building would endanger the water. The writer explains both, but the facts about water suggest protection matters.', look: 'both views and a judgment about the writer’s balance' },
      { k: 'choice', code: 'C1.1', q: '“When <b>they</b> cover the moraine, rain runs off.” <b>They</b> refers to …',
        opts: ['roads, parking lots and buildings', 'rivers and streams', 'aquifers', 'storm drains'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'What questions did you ask yourself while reading this text? Which one did the text answer, and which is still unanswered?',
        a: 'I asked how water gets underground and whether it is still safe to build there. The text answered the first, but I still wonder how much building is allowed.', look: 'names own questions and checks them against the text' }
    ]
  });

  P.add({
    id: 'g8-sea-ice', subject: 'science', form: 'Explanation',
    title: 'Why Melting Ice Speeds Up Melting',
    deck: 'Arctic sea ice is shrinking. A simple idea about light explains why the change keeps growing.',
    hero: {
      photo: 'g8-sea-ice.jpg', credit: 'Photo: Kathryn Hansen / NASA, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Melt ponds on Arctic sea ice in summer. The dark blue pools absorb more sunlight than the white ice around them.'
    },
    body: [
      'Every winter, the Arctic Ocean freezes over, and the ice spreads across millions of square kilometres. Every summer, some of it melts. Since satellites began measuring it in 1979, the ice left at the end of summer has shrunk dramatically. The ice is also thinner, because less of it survives from one year to the next. Scientists expect that, within a few decades, the Arctic Ocean may be almost free of ice in some Septembers.',
      { h: 'Bright surfaces and dark ones' },
      'Why does the melting keep speeding up? Part of the answer is a property called <b>albedo</b>, the share of sunlight that a surface reflects. White snow and ice have a high albedo. They bounce most of the Sun’s energy back into space, so they stay cool. Dark ocean water has a low albedo. It absorbs most of the sunlight that hits it and warms up.',
      { fig: bars([[85, 'fresh', 'snow'], [60, 'bare', 'sea ice'], [30, 'melt', 'pond'], [7, 'open', 'ocean']], { max: 100, step: 50, unit: '%' }),
        tall: 172, cap: 'Approximate share of sunlight reflected by different surfaces (albedo).' },
      { h: 'A loop that feeds itself' },
      'When some ice melts, it uncovers dark water. The water absorbs more heat, which melts more ice, which uncovers more water. This is called a <b>feedback loop</b>: a change that causes more of the same change. Melt ponds on top of the ice work the same way. Their dark blue surfaces soak up heat and help the ice beneath them thin and break.',
      { box: 'Does sea level rise?', text: 'Melting sea ice does not raise sea level much, because the ice was already floating. Melting ice on land, such as glaciers and the Greenland ice sheet, does raise it.' },
      { h: 'Who depends on the ice?' },
      'Sea ice is a habitat. Polar bears hunt seals from it, and walruses rest on it between dives. For Inuit communities, sea ice is also a highway and a hunting ground, travelled for thousands of years. As the ice forms later and breaks up sooner, travel becomes more dangerous, and hunters must rely on knowledge of ice that is changing faster than ever. Inuit observations are now helping scientists track those changes, and Inuit organizations are calling for a say in decisions about the Arctic.'
    ],
    guide: { before: 'Put a black cloth and a white cloth in the sun and feel them after ten minutes. Teach <b>albedo</b> and <b>feedback loop</b>. Read the bar graph from left to right.',
      after: 'Can you think of another feedback loop, in nature or in your own life?' },
    words: [['albedo', 'how much sunlight a surface reflects'], ['feedback loop', 'a change that causes more of the same change']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, which surface reflects the least sunlight?',
        opts: ['open ocean', 'fresh snow', 'bare sea ice', 'melt pond'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does melting sea ice not raise sea level much?',
        opts: ['The ice was already floating.', 'The water freezes again.', 'It evaporates.', 'There is very little of it.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps in the feedback loop.',
        items: ['Some ice melts.', 'Dark water is uncovered.', 'The water absorbs more heat.', 'More ice melts.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why white ice stays cool but dark water warms up.',
        a: 'White ice has a high albedo, so it reflects most sunlight back to space. Dark water has a low albedo and absorbs most of the sunlight, so it warms.', look: 'uses albedo to contrast the two surfaces' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence uses a colon to introduce an explanation?',
        opts: ['This is called a feedback loop: a change that causes more of the same change.', 'Sea ice is a habitat.', 'Every summer, some of it melts.', 'Why does the melting keep speeding up?'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does the text tell us about the importance of sea ice to Inuit communities? Why do you think the writer included it?',
        a: 'For Inuit, sea ice is a highway and a hunting ground used for thousands of years. The writer includes it to show that melting ice affects people and cultures, not only animals.', look: 'Inuit uses of the ice and the writer’s purpose' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize, in two sentences, why Arctic sea ice is melting faster and faster.',
        a: 'When ice melts, it uncovers dark water that absorbs more heat. That heat melts more ice, so the change keeps feeding itself.', look: 'the feedback loop, in brief' }
    ]
  });

  P.add({
    id: 'g8-fundy-tides', subject: 'geography', form: 'Explanation',
    title: 'The Highest Tides on Earth',
    deck: 'Twice a day, the Bay of Fundy fills and empties. At low tide, you can walk on the ocean floor.',
    hero: {
      photo: 'g8-fundy.jpg', credit: 'Photo: Moneira Salic, CC BY 3.0, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'Visitors walk on the sea floor at low tide at the Hopewell Rocks, New Brunswick. Six hours later, the water will be over their heads.'
    },
    body: [
      'At the Hopewell Rocks in New Brunswick, visitors stroll across the muddy ocean floor between tall stone pillars. Six hours later, they come back and paddle kayaks over the same spot. The water has risen higher than a four-storey building. The Bay of Fundy, between New Brunswick and Nova Scotia, has the highest <b>tides</b> in the world. In the Minas Basin, the difference between high and low tide can reach 16 metres.',
      { h: 'Pulled by the Moon' },
      'Tides happen everywhere on the ocean. The Moon’s <b>gravity</b> pulls on Earth’s water, making the ocean bulge slightly on the side facing the Moon and on the opposite side. As Earth spins, coasts pass through these bulges, and most places get two high tides and two low tides about every 25 hours. In the open ocean, the rise is less than a metre. So why is Fundy so extreme?',
      { fig: '<path class="k" d="M20 150 H280"/><path class="k" d="M110 150 V80 Q100 60 120 46 Q150 36 180 46 Q200 60 190 80 V150"/><path class="a" d="M20 64 H90 M210 64 H280"/><path class="d" d="M20 136 H90 M210 136 H280"/>' +
          tx(24, 58, 'n', 'high tide') + tx(24, 130, 'n', 'low tide') + D.arrow(250, 132, 250, 70, 'k') + tx(244, 104, 'n', 'up to 16 m', 'end'),
        tall: 156, cap: 'A rock pillar at high and low tide (simplified, not to scale).' },
      { h: 'A bay that sloshes' },
      'The answer is the shape of the bay. Fundy is long, and it gets narrower and shallower toward its head. Water squeezed into a narrowing channel rises higher. Also, the time it takes water to slosh from the mouth of the bay to its head and back is about 13 hours, very close to the time between high tides. The bay works like water in a bathtub that someone pushes at just the right moment: each push makes the waves higher. Scientists call this <b>resonance</b>.',
      { box: 'Carving the flowerpots', text: 'Twice a day, the tides wash against the Hopewell Rocks. Over thousands of years, the water has worn away their bases, leaving tall pillars shaped like flowerpots.' },
      { h: 'Power from the sea' },
      'Each tide carries billions of tonnes of water in and out of the bay. Engineers have long tried to turn that motion into electricity. A tidal power station at Annapolis Royal, Nova Scotia, ran for more than 30 years, and new underwater turbines are being tested in the Minas Passage. The challenge is building machines strong enough to survive such powerful currents, without harming the fish and whales that swim through them.'
    ],
    guide: { before: 'Find the Bay of Fundy on a map. Teach <b>tides</b>, <b>gravity</b> and <b>resonance</b>. Push water in a tub at the right rhythm and watch it rise.',
      after: 'Would you rather visit Hopewell Rocks at low tide or high tide? What would you see?' },
    words: [['tides', 'the regular rise and fall of the sea'], ['gravity', 'the force that pulls objects toward each other'], ['resonance', 'when pushes at just the right rhythm make a movement grow bigger']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['how far the water rises around a rock pillar', 'the Moon pulling the ocean', 'a map of the bay', 'a tidal power station'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'What causes tides everywhere?',
        opts: ['the Moon’s gravity', 'strong winds', 'rivers', 'earthquakes'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart: why are Fundy’s tides so high?', cols: ['Cause', 'How it raises the tide'],
        rows: [['the bay narrows and gets shallower', null], ['resonance', null]],
        a: [[null, 'water squeezed into a narrowing channel rises higher'], [null, 'the water sloshes in rhythm with the tides, so each push builds higher']] },
      { k: 'lines', code: 'C1.2', n: 3, q: 'The writer compares the bay to a bathtub. How does this comparison help readers understand resonance?',
        a: 'Most readers have pushed water in a tub and seen it slosh higher. This makes the hard idea of resonance easy to picture.', look: 'links the familiar example to the new idea' },
      { k: 'choice', code: 'B2.2', q: 'In “the head of the bay,” <b>head</b> means …',
        opts: ['the far, inner end', 'the leader', 'the top of a person', 'the start of a river'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'The text says new turbines are being tested in the Minas Passage. Predict one problem they might face. Use the text.',
        a: 'The currents are so strong that the turbines might break. The text says the challenge is building machines strong enough to survive.', look: 'a prediction supported by the final paragraph' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which part of this explanation did you find hardest? What strategy helped, such as rereading, using the diagram or picturing it?',
        a: 'Resonance was hardest. Picturing the bathtub and rereading the sentence about 13 hours helped me understand it.', look: 'names a hard part and a fitting strategy' }
    ]
  });

  P.add({
    id: 'g8-emily-stowe', subject: 'history', form: 'Biography',
    title: 'The Doctor Who Would Not Take No',
    deck: 'In the 1860s, no medical school in Canada would accept a woman. Emily Stowe became a doctor anyway.',
    hero: {
      photo: 'g8-emily-stowe.jpg', credit: 'Photo: public domain, Wikimedia Commons', focus: '50% 25%',
      side: { w: 469, view: '0 0 300 128' },
      tall: 200,
      cap: 'Dr. Emily Stowe, one of the first women to practise medicine in Canada, and her path to becoming a doctor (selected events).',
      art: timeline([[1831, 'born near', 'Norwich'], [1867, 'graduates', 'in New York'], [1880, 'licensed', 'in Ontario'], [1883, 'daughter', 'graduates']], 1822, 1892)
    },
    body: [
      'In 1865, a teacher named Emily Stowe applied to study medicine at the Toronto School of Medicine. Her husband was ill with tuberculosis, and she wanted to learn how to heal people. The school turned her down. The reason was simple: she was a woman, and the university was not open to women.',
      { h: 'A teacher first' },
      'Emily Howard Jennings was born in 1831 near Norwich, in what is now Ontario. Her family were Quakers, who believed that girls should be educated as well as boys. Her mother taught her at home. When she was refused entry to Victoria College because she was female, she trained as a teacher instead. In 1852, she became the principal of a public school in Brantford, one of the first women in Upper Canada to hold such a job.',
      { h: 'The long way around' },
      'Since no Canadian school would accept her, Stowe went to the United States. She graduated from the New York Medical College for Women in 1867 and opened a practice in Toronto. But Ontario law said that doctors trained outside the province had to attend lectures there before they could get a <b>licence</b>. In 1870, after much pressure, the Toronto School of Medicine let her and another woman, Jennie Kidd Trout, attend. Some male students and teachers made the lectures so unpleasant that the women had to fight to stay. Stowe finally received her licence in 1880.',
      { fig: tx(70, 14, 'lb', 'barrier', 'middle') + tx(230, 14, 'lb', 'what she did', 'middle') + [['no Canadian school', 'would take her', 'studied in', 'New York'], ['Ontario required', 'local lectures', 'fought to attend', 'in Toronto'], ['women could', 'not vote', 'started a', 'suffrage club']].map(function (r, i) { var y = 24 + i * 40; return '<rect class="k" x="6" y="' + y + '" width="128" height="34" rx="4"/><rect class="a" x="166" y="' + y + '" width="128" height="34" rx="4"/>' + D.arrow(138, y + 17, 162, y + 17) + tx(70, y + 14, 'n', r[0], 'middle') + tx(70, y + 28, 'n', r[1], 'middle') + tx(230, y + 14, 'n', r[2], 'middle') + tx(230, y + 28, 'n', r[3], 'middle'); }).join(''),
        tall: 148, cap: 'Each barrier Emily Stowe met, and how she got past it.' },
      { box: 'Like mother, like daughter', text: 'In 1883, Stowe’s daughter, Augusta Stowe-Gullen, became the first woman to earn a medical degree from a Canadian school.' },
      { h: 'Fighting for the vote' },
      'Stowe knew that women would not get equal chances in medicine, or anywhere else, without a voice in government. In 1876, she started the Toronto Women’s Literary Club. Its name was careful, because many people objected to women talking about politics. In fact, members discussed women’s rights and the right to vote. The club grew into the Canadian Woman Suffrage Association in 1883. Stowe did not live to see women vote, but she helped <b>pave the way</b> for the doctors, lawyers and voters who followed.'
    ],
    guide: { before: 'Talk about jobs that were once closed to women. Teach <b>licence</b> and the expression <b>pave the way</b>. Read the timeline first.',
      after: 'Why did the club choose a careful name? Can you think of another time people had to hide what they were really doing?' },
    words: [['licence', 'official permission to do a job, such as practise medicine'], ['pave the way', 'to make something possible or easier for people who come later']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the timeline, how many years passed between Stowe’s graduation and her licence?',
        opts: ['13', '3', '16', '49'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Stowe study in the United States?',
        opts: ['No Canadian medical school would accept a woman.', 'It was cheaper.', 'Her husband lived there.', 'She wanted to see New York.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Name two barriers Stowe faced because she was a woman.',
        a: 'Victoria College and the Toronto School of Medicine refused her. When she was allowed to attend lectures, some students and teachers made them unpleasant.', look: 'two barriers from the text' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did the club call itself a “Literary Club” instead of a women’s rights club?',
        a: 'Many people objected to women talking about politics, so a safe-sounding name let them meet without being stopped or attacked.', look: 'links the name to public disapproval' },
      { k: 'choice', code: 'B2.2', q: 'What does the expression “pave the way” mean in the last sentence?',
        opts: ['make it easier for others who come later', 'build a road', 'walk in front of someone', 'stop others from following'], a: 0 },
      { k: 'lines', code: 'C1.3', n: 3, q: 'How do the headings help organize this biography?',
        a: 'They divide her life into parts: her early career, becoming a doctor and fighting for the vote, so a reader can follow her story step by step.', look: 'explains how the headings divide the life story' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Can you think of a person today who has broken a barrier in their field? How are they like Emily Stowe?',
        a: 'A woman who became one of the first female astronauts. Like Stowe, she entered a field that was mostly closed to women and made it easier for others.', look: 'a real example and a clear similarity' }
    ]
  });

  P.add({
    id: 'g8-nwmp', subject: 'history', form: 'Report',
    title: 'The March West',
    deck: 'In 1874, a new police force rode across the Prairies. Its story looks different depending on who tells it.',
    hero: {
      photo: 'g8-fort-macleod.jpg', credit: 'Image: public domain, Wikimedia Commons', focus: '50% 0%',
      side: { w: 370, view: '0 0 300 154' },
      tall: 190,
      cap: 'A North-West Mounted Police officer, from a drawing published in 1875, and the route of the March West in 1874 (simplified). The lower line is the border with the United States.',
      art: '<path class="k" d="M20 110 Q150 130 280 90"/><path class="a" d="M276 92 Q200 100 140 90 Q80 80 40 96"/>' + D.arrow(60, 92, 40, 96, 'a') + '<circle class="dot" cx="276" cy="92" r="4"/><circle class="dot" cx="40" cy="96" r="4"/><circle class="dot" cx="120" cy="86" r="4"/>' +
          tx(276, 76, 'n', 'Dufferin, Manitoba', 'end') + tx(40, 132, 'n', 'Fort Macleod', 'start') + tx(120, 72, 'n', 'Cypress Hills', 'middle') + tx(150, 148, 'n', 'about 1300 km on horseback', 'middle')
    },
    body: [
      'In the early 1870s, the Prairies were part of Canada on paper, but the government in Ottawa had almost no presence there. American traders had built forts in what is now southern Alberta. They sold cheap, dangerous whisky to First Nations people in exchange for furs and horses, causing illness, violence and death. The most famous of these posts was nicknamed Fort Whoop-Up. First Nations leaders asked for the trade to be stopped.',
      { h: 'The Cypress Hills Massacre' },
      'In 1873, a group of American wolf hunters attacked a camp of Nakoda people in the Cypress Hills, after accusing them, without proof, of stealing horses. More than 20 Nakoda men, women and children were killed. News of the <b>massacre</b> shocked Ottawa. That year, Parliament created the North-West Mounted Police, a force of officers on horseback, to bring Canadian law to the West.',
      { box: 'Two points of view', text: 'Many settlers saw the police as heroes who made the West safe. Many First Nations saw them first as protectors from the whisky trade, but later as enforcers of laws that controlled their lives.' },
      { h: 'A hard journey' },
      'In July 1874, about 275 officers and men set out from Dufferin, Manitoba. They wore red jackets so they would be recognized as Canadian, not American. The march was a struggle: horses and oxen died of hunger and thirst, and the men were often lost. In the fall, they built Fort Macleod near the whisky forts, and the traders soon left. Other posts followed, including Fort Calgary in 1875.',
      { fig: timeline([[1873, 'Cypress Hills', 'Massacre'], [1874, 'March', 'West'], [1920, 'becomes', 'the RCMP'], [1885, 'passes', 'needed']], 1866, 1928),
        tall: 128, cap: 'The North-West Mounted Police, 1873 to 1920 (selected events).' },
      { h: 'A changing role' },
      'At first, many First Nations leaders, such as the Siksika chief Crowfoot, welcomed the end of the whisky trade. But the police also enforced government rules that harmed First Nations, especially after 1885, when people needed a pass from an Indian agent to leave their reserve. In 1920, the force became the Royal Canadian Mounted Police. Today, the RCMP has apologized for parts of its <b>role</b> in the history of Indigenous peoples.'
    ],
    guide: { before: 'Find Manitoba, the Cypress Hills and southern Alberta on a map. Teach <b>massacre</b> and <b>role</b>. Read the box on two points of view aloud.',
      after: 'How can the same group be seen as heroes by some people and as a threat by others? Can both views be true?' },
    words: [['massacre', 'the killing of many people who cannot defend themselves'], ['role', 'the job or part someone plays']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the map, in which direction did the police march?',
        opts: ['west', 'east', 'north', 'south'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did the police wear red jackets?',
        opts: ['to be recognized as Canadian, not American', 'to stay warm', 'to scare the traders', 'because red was cheap'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the cause-and-effect chart.', cols: ['Cause', 'Effect'],
        rows: [['the Cypress Hills Massacre', null], [null, 'the whisky traders left'], ['the pass system after 1885', null]],
        a: [[null, 'Parliament created the North-West Mounted Police'], ['the police built Fort Macleod near the whisky forts', null], [null, 'the police enforced rules that harmed First Nations']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Read the box. Explain why First Nations’ view of the police changed over time.',
        a: 'At first the police protected them from the whisky trade. Later the police enforced government rules, such as the pass system, that controlled their lives.', look: 'both stages of the view, with reasons' },
      { k: 'choice', code: 'B3.2', q: '“The march <b>was</b> a struggle.” <b>Was</b> is …',
        opts: ['a past tense verb', 'a noun', 'a future tense verb', 'an adjective'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the story of the March West in three sentences: why, what happened and what came after.',
        a: 'After the Cypress Hills Massacre, Canada created the NWMP. In 1874, they marched west and built Fort Macleod, ending the whisky trade. Later they enforced rules that harmed First Nations and became the RCMP.', look: 'cause, event and later results, briefly' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Did this text change what you thought about the Mounties? Explain what new information changed or confirmed your view.',
        a: 'I thought of Mounties only as heroes. Learning about the pass system showed me that their history is more complicated.', look: 'reflects on a change in thinking, linked to the text' }
    ]
  });

  P.add({
    id: 'g8-pauline-johnson', subject: 'arts', form: 'Biography',
    title: 'The Poet with Two Costumes',
    deck: 'E. Pauline Johnson, Tekahionwake, filled theatres across Canada more than a hundred years ago',
    hero: {
      photo: 'g8-pauline-johnson.jpg', credit: 'Photo: Cochran, about 1895, public domain, Wikimedia Commons', focus: '50% 25%',
      side: { w: 469, view: '0 0 300 128' },
      tall: 200,
      cap: 'E. Pauline Johnson, Tekahionwake, about 1895, and her life and legacy (selected events).',
      art: timeline([[1861, 'born at', 'Chiefswood'], [1892, 'first', 'recital'], [1895, 'first book', 'of poems'], [1913, 'dies in', 'Vancouver'], [1961, 'on a Canada', 'Post stamp']], 1856, 1972)
    },
    body: [
      'In January 1892, a young woman stepped onto a stage in Toronto to recite a poem. Her name was Emily Pauline Johnson, and she was also known by her great-grandfather’s Mohawk name, Tekahionwake. Her poem, spoken in the voice of an Indigenous woman during the fighting of 1885, was angry and powerful. The audience was stunned. That night began a career that would make her one of the most famous Canadians of her time.',
      { h: 'Between two worlds' },
      'Pauline Johnson was born in 1861 at Chiefswood, her family’s home on the Six Nations of the Grand River. Her father, George Johnson, was a Mohawk chief. Her mother, Emily Howells, had been born in England. Pauline grew up speaking English, reading poetry and hearing the stories of her father’s people. All her life, she was proud of her Mohawk <b>heritage</b> and spoke up for Indigenous peoples at a time when most Canadians ignored them.',
      { h: 'On stage' },
      'For about fifteen years, Johnson toured Canada, the United States and England, travelling by train, stagecoach and canoe to reach small towns and big cities. She performed her poems from memory. In the first half of a show, she often wore a dress she had designed to suggest Indigenous clothing. After the break, she returned in an elegant evening gown. The change of <b>costume</b> made audiences think about the two parts of her identity, and about their own ideas of who Indigenous women were. Reviewers praised her voice and her stage presence, and crowds often asked for more.',
      { fig: tx(72, 16, 'lb', 'first half', 'middle') + tx(228, 16, 'lb', 'after the break', 'middle') + '<rect class="k" x="10" y="26" width="124" height="62" rx="4"/><rect class="k" x="166" y="26" width="124" height="62" rx="4"/>' + D.arrow(138, 57, 162, 57) +
          tx(72, 48, 'n', 'a dress she designed', 'middle') + tx(72, 62, 'n', 'to suggest Indigenous', 'middle') + tx(72, 76, 'n', 'clothing', 'middle') + tx(228, 55, 'n', 'an elegant', 'middle') + tx(228, 69, 'n', 'evening gown', 'middle'),
        tall: 96, cap: 'The two costumes in one of Pauline Johnson’s shows.' },
      { box: 'A first', text: 'In 1961, Pauline Johnson became the first woman, other than the Queen, the first author and the first Indigenous person to appear on a Canadian postage stamp.' },
      'Her best-known poem describes paddling a canoe through rapids, and many Canadian children have learned it by heart. Late in life, she wrote down stories told to her by Joe Capilano, a Squamish chief, and published them in 1911 as <i>Legends of Vancouver</i>. She died in Vancouver in 1913 and is buried in Stanley Park.'
    ],
    guide: { before: 'Find the Six Nations of the Grand River (near Brantford) on a map. Teach <b>heritage</b> and <b>costume</b>. Read the timeline together first.',
      after: 'Why do you think Johnson chose to wear two costumes? How do people show different parts of who they are today?' },
    words: [['heritage', 'the traditions, culture and history passed down in a family or people'], ['costume', 'clothes worn to play a part or perform']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the timeline, how old was Johnson at her first recital?',
        opts: ['about 31', 'about 21', 'about 41', 'about 51'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why was the audience stunned in 1892?',
        opts: ['Her poem was angry and powerful.', 'She forgot the words.', 'She sang instead of reciting.', 'The theatre was empty.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two ways Johnson’s Mohawk heritage shaped her life and work.',
        a: 'She used her great-grandfather’s Mohawk name, Tekahionwake, and she spoke up for Indigenous peoples in her poems and performances.', look: 'two connections to her heritage from the text' },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Why do you think Johnson changed costumes during her shows? What was she trying to make audiences think about?',
        a: 'She wanted to show she was both Mohawk and English. It made audiences question their narrow ideas of who Indigenous women were.', look: 'interprets the purpose of the costume change' },
      { k: 'choice', code: 'B3.3', q: 'Why is <i>Legends of Vancouver</i> in italics?',
        opts: ['It is the title of a book.', 'It is a place name.', 'It is a quotation.', 'It is in another language.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The writer begins with Johnson’s first recital instead of her birth. Why might the writer have made that choice?',
        a: 'Starting on stage grabs the reader’s attention with a dramatic moment, then the writer goes back to explain her background.', look: 'explains the effect of the opening' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Have you seen a performer, artist or athlete who represents their culture? How are they like Johnson?',
        a: 'A Métis fiddler at our school shared his music and stories. Like Johnson, he performed to show pride in his culture and teach others.', look: 'a real example and a clear similarity' }
    ]
  });

  P.add({
    id: 'g8-marconi', subject: 'tech', form: 'Report',
    title: 'Three Dots Across the Ocean',
    deck: 'In 1901, on a windy hill in St. John’s, a young inventor listened for a signal from across the Atlantic',
    hero: {
      photo: 'g8-marconi.jpg', credit: 'Photo: James Vey, 1901, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Marconi and his assistants at Signal Hill, St. John’s, in December 1901.'
    },
    body: [
      'On December 12, 1901, a cold wind roared across Signal Hill, high above the harbour of St. John’s. Inside a small room, a 27-year-old Italian inventor named Guglielmo Marconi pressed a telephone earpiece to his ear. Outside, his assistants struggled to hold a kite on a long wire in the gale. He had chosen the hill because it was one of the closest points in North America to Europe. Marconi was listening for three short clicks, the letter S in Morse code, sent from Cornwall, England, about 3500 kilometres away.',
      { fig: '<path class="k" d="M10 130 Q150 100 290 130"/><path class="a" d="M30 110 Q150 10 270 110"/><path class="k" d="M30 110 V128 M270 110 V128"/><path class="t" d="M270 110 L250 70"/><path class="k" d="M244 62 L256 62 L250 74 Z"/>' +
          tx(30, 148, 'n', 'Cornwall, England', 'start') + tx(270, 148, 'n', 'Signal Hill', 'end') + tx(150, 50, 'n', 'about 3500 km', 'middle') + D.label(170, 82, 'kite holds the antenna', 246, 66),
        tall: 154, cap: 'The signal travelled about 3500 km across the curve of the Earth (not to scale).' },
      { h: 'Messages without wires' },
      'At the time, messages crossed the ocean through telegraph cables laid on the sea floor. Marconi believed he could send them through the air using <b>radio waves</b>, invisible waves of energy that travel at the speed of light. He had already sent signals across the English Channel. Many scientists said the Atlantic was impossible: radio waves travel in straight lines, and the Earth is curved, so the signal would shoot off into space.',
      { box: 'From dots to phones', text: 'Radio waves now carry radio and TV broadcasts, GPS signals and the calls and messages on your phone.' },
      { h: 'Did he really hear it?' },
      'Around noon, Marconi heard faint clicks. He said he heard them again several times that day. No machine had recorded the signal, so the only proof was his word and that of his assistant. Some scientists were <b>skeptical</b>. Others were thrilled. Years later, scientists discovered why the signal could have crossed the ocean: a layer of the upper atmosphere, the ionosphere, reflects some radio waves back toward Earth, so they can follow its curve.',
      { h: 'Canada’s part' },
      'After the telegraph company that owned the undersea cables threatened to sue, Marconi left Newfoundland. The Canadian government invited him to Nova Scotia and helped pay for a station at Glace Bay. In 1902, Glace Bay sent some of the first full messages across the Atlantic by radio. Within a few years, ships carried radios, and lives at sea were being saved.'
    ],
    guide: { before: 'Find St. John’s and Cornwall on a world map. Tap out S (three dots) in Morse code. Teach <b>radio waves</b> and <b>skeptical</b>.',
      after: 'Marconi had no recording to prove his claim. How do scientists today make sure a discovery is real?' },
    words: [['radio waves', 'invisible waves of energy that can carry signals through the air'], ['skeptical', 'doubting that something is true']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the kite for?',
        opts: ['holding the antenna up high', 'measuring the wind', 'sending a message by flag', 'lighting the hill'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did many scientists think the Atlantic was impossible?',
        opts: ['Radio waves travel straight, but Earth is curved.', 'The ocean was too deep.', 'Radio waves are too slow.', 'Cables already worked.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how the signal could cross the ocean even though Earth is curved.',
        a: 'A layer of the upper atmosphere, the ionosphere, reflects some radio waves back toward Earth, so they can follow its curve.', look: 'ionosphere reflects the waves back' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why were some scientists skeptical of Marconi’s claim? Were they being fair?',
        a: 'No machine recorded the signal, so the only proof was Marconi’s word. Their doubt was fair, because science needs evidence others can check.', look: 'lack of evidence, and a judgment with a reason' },
      { k: 'choice', code: 'B2.1', q: 'The prefix <b>trans-</b> in <b>trans</b>atlantic means …',
        opts: ['across', 'under', 'before', 'against'], a: 0 },
      { k: 'lines', code: 'C1.3', n: 3, q: 'The writer uses the heading “Did he really hear it?” How does a question as a heading help the reader?',
        a: 'It tells the reader what the section will discuss and makes them curious to find the answer.', look: 'the heading sets up the section’s focus' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Radio waves now carry the messages on your phone. How is texting a friend like Marconi’s experiment?',
        a: 'Both send a coded message through the air on radio waves. My phone does in a second what Marconi struggled to do with a kite.', look: 'a clear connection to radio waves' }
    ]
  });

  P.add({
    id: 'g8-adam-beck', subject: 'tech', form: 'Report',
    title: 'Power for the People',
    deck: 'Niagara Falls could light all of southern Ontario. In the early 1900s, Ontarians argued over who should own that power.',
    hero: {
      photo: 'g8-adam-beck.jpg', credit: 'Photo: Changku88, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'The Sir Adam Beck generating stations beside the Niagara River, in Niagara Falls, Ontario.'
    },
    body: [
      'Every second, thousands of tonnes of water pour over Niagara Falls. In the 1890s, engineers realized that the falling water held enormous energy, and that new machines could turn it into electricity. Whoever controlled that power would control the future of Ontario’s homes, farms and factories.',
      { h: 'From falling water to electricity' },
      'A <b>hydro-electric</b> station is a system that changes the energy of moving water into electrical energy. Water is taken from the river above the falls and sent through tunnels or canals. It drops down a steep pipe and spins the blades of a turbine, like wind spinning a pinwheel. The turbine turns a <b>generator</b>, where magnets spinning past coils of wire produce an electric current. Power lines carry the electricity to cities far away.',
      { fig: flow(['water is taken from the upper river', 'it falls through a steep pipe', 'the water spins a turbine', 'the turbine turns a generator', 'power lines carry electricity away']),
        tall: 190, cap: 'Inside a hydro-electric station (simplified).' },
      { h: 'Private or public?' },
      'At first, private companies built the stations at Niagara and sold the electricity to make a profit. Many people in small towns worried that companies would charge high prices or ignore places where they could not earn much. A businessman and mayor from London, Ontario, named Adam Beck led a campaign for <b>public ownership</b>: power stations owned by the people of Ontario through their government, selling electricity at cost.',
      { box: 'Power Day', text: 'On October 11, 1910, crowds in Berlin, Ontario (now Kitchener) cheered as Beck switched on the first electricity delivered by the new public system.' },
      'Owners of private companies argued that government should not run a business. Beck’s supporters answered that electricity was too important to be left to profit. In 1906, Ontario created the Hydro-Electric Power Commission, with Beck as its chair. It grew into Ontario Hydro, one of the largest public power systems in the world.',
      { h: 'Sharing the falls' },
      'Today, much of the Niagara River flows through tunnels to the Sir Adam Beck stations instead of over the falls. By an agreement between Canada and the United States, enough water must flow over the falls during the day for visitors to enjoy them. At night, more water is sent to the generators.'
    ],
    guide: { before: 'Spin a pinwheel under a running tap. Teach <b>hydro-electric</b>, <b>generator</b> and <b>public ownership</b>. Follow the flow chart from top to bottom.',
      after: 'Should important services such as electricity or water be owned by the public or by companies? Give a reason for each side.' },
    words: [['hydro-electric', 'making electricity from moving water'], ['generator', 'a machine that turns motion into electricity'], ['public ownership', 'owned by the people through their government']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps in making hydro-electric power.',
        items: ['Water is taken from the upper river.', 'It falls through a steep pipe.', 'The water spins a turbine.', 'The turbine turns a generator.', 'Power lines carry electricity away.'], show: [2, 4, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the flow chart, what turns the generator?',
        opts: ['the turbine', 'the power lines', 'the river', 'the pipe'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do the stations get more water at night?',
        opts: ['Visitors do not need to see the falls then.', 'Water flows faster at night.', 'People use no power by day.', 'The river freezes at night.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Explain the two sides in the argument over Niagara power. Which side does the text seem to favour?',
        a: 'Private companies said government should not run a business. Beck’s side said electricity was too important to leave to profit. The text seems to favour Beck, calling the public system one of the largest in the world.', look: 'both sides and evidence of the writer’s leaning' },
      { k: 'choice', code: 'B3.3', q: 'In “Berlin, Ontario (now Kitchener),” why are the words in brackets?',
        opts: ['They add extra information.', 'They are a quotation.', 'They are a title.', 'They are not important.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'A hydro-electric station is a system. Name its input, its main parts and its output.',
        a: 'The input is falling water. The main parts are the tunnel, the pipe, the turbine and the generator. The output is electricity.', look: 'input, parts and output' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Where does the electricity in your home come from? How does this text help you think about it?',
        a: 'In Ontario, some of it comes from Niagara. The text helped me see that flipping a switch depends on water, turbines and a long history.', look: 'connects own experience to the text' }
    ]
  });

  P.add({
    id: 'g8-green-roof', subject: 'geography', form: 'Proposal', plain: true,
    title: 'A Garden on Our Roof',
    deck: 'A Grade 8 class asks its school board to turn a hot, flat roof into a living one',
    hero: {
      photo: 'g8-green-roof.jpg', credit: 'Photo: GreenRoofGardener, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'The green roof on the podium of Toronto City Hall, planted with low, hardy plants.'
    },
    body: [
      'To the trustees of our school board: we are the Grade 8 class at Maple Grove Public School. This proposal asks you to replace part of our school’s flat black roof with a green roof, a roof covered with soil and living plants.',
      { h: 'The problem: a hot city' },
      'Cities are often several degrees warmer than the countryside around them, especially on summer evenings. This is called the <b>urban heat island</b> effect. Dark roofs, roads and parking lots soak up the Sun’s energy all day and give it off as heat. On a sunny July afternoon, we measured our school’s roof with a borrowed infrared thermometer. It was 68 °C. The grass on the field was 31 °C.',
      { fig: bars([[68, 'black', 'roof'], [52, 'parking', 'lot'], [34, 'green', 'roof*'], [31, 'grass', 'field']], { max: 80, step: 20, unit: ' °C' }),
        tall: 172, cap: 'Surface temperatures we measured on July 8 at 2 p.m. *Green roof measured at Toronto City Hall.' },
      { h: 'Our proposal' },
      'A green roof has layers: a waterproof barrier, a layer that drains water away, a thin layer of light soil and hardy plants such as sedum, which need little water. The plants shade the roof and cool the air as water evaporates from their leaves. In 2009, Toronto became the first city in North America to require green roofs on many large new buildings. We think schools should lead too, because students can see, measure and learn from the results every day.',
      { h: 'Benefits and costs' },
      'A green roof would keep our top-floor classrooms cooler in June, so less air conditioning would be needed. It would soak up rain that now rushes into storm drains during heavy storms. It would give bees and birds a place to feed. It could also be an outdoor classroom for science. We know a green roof costs more to build than a regular roof, and it needs to be weeded and checked. However, it can protect the roof underneath from sun damage and help it last longer, which saves money over time.',
      { box: 'What we ask', text: 'Please send an engineer to check whether our roof can carry the weight of soil and plants. If it can, we will help plan, plant and care for it.' },
      'Thank you for considering our proposal. We hope our school can become a cooler, greener and more <b>sustainable</b> place.'
    ],
    guide: { before: 'Touch a dark surface and a light one on a sunny day. Teach <b>urban heat island</b> and <b>sustainable</b>. Notice how the proposal is organized under headings.',
      after: 'What problem in your school or neighbourhood would you write a proposal about? Who would you send it to?' },
    words: [['urban heat island', 'a city area that is warmer than the countryside around it'], ['sustainable', 'able to continue for a long time without harming the environment']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, which surface was hottest?',
        opts: ['the black roof', 'the parking lot', 'the green roof', 'the grass field'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Who is the audience for this proposal?',
        opts: ['the school board trustees', 'the students’ parents', 'Toronto City Council', 'the bees and birds'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the chart.', cols: ['Benefits of a green roof', 'Costs or challenges'],
        rows: [['cooler classrooms', null], [null, 'needs weeding and checking'], ['habitat for bees and birds', null]],
        a: [[null, 'costs more to build'], ['soaks up rain from storms', null], [null, 'the roof must carry the weight']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The students admit that a green roof costs more. Why is it smart to include this in a proposal?',
        a: 'It shows they have thought about both sides, so the trustees trust them more. Then they answer the cost with the savings over time.', look: 'recognizes a counterargument and how it is answered' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence begins with a transition word that signals a contrast?',
        opts: ['However, it can protect the roof underneath from sun damage.', 'It was 68 °C.', 'We think schools should lead too.', 'Thank you for considering our proposal.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how plants on a roof help cool the air.',
        a: 'The plants shade the roof so it absorbs less heat, and water evaporating from their leaves cools the air around them.', look: 'shade and evaporation' },
      { k: 'lines', code: 'D1.1', n: 3, q: 'If the students wanted to share this idea with younger students, what form would they use, and how would they change it?',
        a: 'A poster with pictures of a hot roof and a green roof, short labels and one big question, because younger students need fewer words.', look: 'a suitable form adjusted for audience' }
    ]
  });

  P.add({
    id: 'g8-dharavi', subject: 'geography', form: 'Feature article',
    title: 'A City Within a City',
    deck: 'In the middle of Mumbai, one of the largest informal settlements in Asia is also one of the busiest places to work',
    hero: {
      photo: 'g8-dharavi.jpg', credit: 'Photo: Goodtrance, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Homes and workshops packed closely together in Dharavi, Mumbai, India.'
    },
    body: [
      'From the window of a train crossing Mumbai, Dharavi looks like a sea of tin roofs. Narrow lanes, some barely wide enough for one person, wind between homes built of brick, metal sheets and tarpaulin. On just over two square kilometres of land, smaller than many Ontario farms, live somewhere between 600 000 and a million people. No one knows exactly how many.',
      { fig: bars([[4, 'Canada'], [4400, 'City of', 'Toronto'], [20000, 'Mumbai'], [300000, 'Dharavi', '(estimate)']], { max: 300000, step: 100000, x0: 58 }) + tx(46, 12, 'n', 'people per square kilometre'),
        tall: 172, cap: 'Rough population density. Canada’s bar and Toronto’s are too small to see.' },
      { h: 'An informal settlement' },
      'Dharavi is an <b>informal settlement</b>: an area where people have built homes without official permission or ownership of the land. Many cities in fast-growing countries have them. As people move from villages to cities to find work, a process called <b>urbanization</b>, there is often not enough affordable housing. Families build their own. Over a century, Dharavi grew from a fishing village on a swamp into one of the most crowded places on Earth.',
      { box: 'Daily challenges', text: 'Many homes have no toilet. Dozens of families may share one public toilet block, and clean water may flow from a tap for only a few hours a day.' },
      { h: 'A working city' },
      'Dharavi is also a place of hard work. Thousands of small workshops recycle plastic, metal and paper collected from across Mumbai. Potters fire clay in kilns. Tailors stitch clothes, and leather workers make bags and belts that are sold around the world. Some estimates say Dharavi’s businesses earn hundreds of millions of dollars a year. Many families have lived there for generations, and neighbours depend on each other.',
      { h: 'Who decides the future?' },
      'For decades, governments have planned to <b>redevelop</b> Dharavi by tearing down old buildings and building apartment towers. Supporters say residents would finally get clean, safe homes. Many residents worry that they would lose their workshops, their neighbours and their right to stay, and that the valuable land would go to developers. They want a say in the plans. Their question is one that cities around the world must answer: how can a city improve people’s lives without pushing them out?'
    ],
    guide: { before: 'Find Mumbai on a map of India. Teach <b>informal settlement</b>, <b>urbanization</b> and <b>redevelop</b>. Compare the numbers above the bars.',
      after: 'If you lived in Dharavi, what would you want planners to keep, and what would you want them to change?' },
    words: [['informal settlement', 'an area where homes are built without official permission'], ['urbanization', 'the movement of people from the countryside to cities'], ['redevelop', 'to tear down and rebuild an area']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, which place is the most crowded?',
        opts: ['Dharavi', 'Mumbai', 'Toronto', 'Canada'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do informal settlements grow?',
        opts: ['There is not enough affordable housing for new arrivals.', 'People prefer small homes.', 'The government builds them.', 'Land is free everywhere.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why do many residents want a say in the plans to redevelop Dharavi?',
        a: 'They could lose their workshops, neighbours and right to stay. The people most affected should help decide, so the plans meet their needs.', look: 'what residents could lose and why their voice matters' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Does the writer present Dharavi only as a problem? Give evidence.',
        a: 'No. The writer describes hard challenges, such as shared toilets, but also shows the busy workshops and strong community, so readers see both sides.', look: 'evidence of both the challenges and the strengths' },
      { k: 'choice', code: 'B2.1', q: 'In <b>urban</b>ization, the suffix <b>-ization</b> turns the word into …',
        opts: ['a process', 'a person', 'a place', 'a describing word'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The writer ends with a question. Why is this an effective ending?',
        a: 'It leaves the reader thinking about a hard problem with no easy answer, and connects Dharavi to cities around the world.', look: 'explains the effect of ending with a question' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Is there a neighbourhood in your city or a city you know that is changing? How is it like Dharavi?',
        a: 'An old neighbourhood near downtown is being replaced by condos. Like in Dharavi, some longtime residents worry they cannot afford to stay.', look: 'a real example and a clear similarity' }
    ]
  });

  P.add({
    id: 'g8-portage', subject: 'story', form: 'Short story',
    title: 'The Long Portage',
    deck: 'The map said 1450 metres. Nobody mentioned the hill.',
    hero: {
      photo: 'g8-portage.jpg', credit: 'Photo: Cornellier, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A canoeist carries a canoe over a portage trail between two lakes.'
    },
    body: [
      'The map said the portage was 1450 metres long. It did not say anything about the hill.',
      'I stood at the end of the trail with the canoe on my shoulders, the yoke pressing into my neck, and stared up at a wall of roots and rocks. My grandmother, Nokomis, had already disappeared around the first bend with the big pack. She was seventy-one. I was thirteen. This did not seem fair.',
      '“You can rest the canoe on a tree if you need to,” she had told me before she set off. “There are canoe rests along the trail. Old ones.”',
      'I had not wanted to come on this trip. My friends were at the mall, and I was in Algonquin Park, covered in mosquito bites, carrying a boat over a mountain. At least, it felt like a mountain. A loon called somewhere behind me, as if it were laughing.',
      { fig: '<path class="k" d="M10 140 H40 Q70 140 90 100 Q110 40 140 36 Q170 34 190 70 Q220 120 260 130 H290"/><path class="a" d="M10 150 H40 M260 150 H290"/>' + tx(25, 166, 'n', 'Lake 1', 'middle') + tx(275, 166, 'n', 'Lake 2', 'middle') + D.label(150, 18, 'the hill', 140, 34) + D.label(200, 46, 'canoe rest', 172, 50) + tx(150, 166, 'n', '1450 m', 'middle'),
        tall: 172, cap: 'The portage trail between two lakes, seen from the side.' },
      'I started up. Halfway, my legs were shaking. The canoe seemed to grow heavier with every step, as if someone were quietly loading rocks into it. I thought about dropping it and walking back. Then I saw it: a wooden crosspiece nailed between two trees at exactly the right height, grey with age. A canoe rest.',
      'I tipped the bow onto it and ducked out from under the yoke. For a minute I just breathed. Someone had built this, maybe fifty years ago, maybe more, so that people like me could stop halfway and keep going. I wondered who they were. I wondered how many people had leaned their canoes here, tired and complaining, and then picked them up again.',
      'When I reached the top, Nokomis was sitting on the pack, eating an apple and looking out over the second lake. The water was <b>luminous</b>, gold in the late afternoon light.',
      '“You stopped at the old rest,” she said. It was not a question.',
      '“How did you know?”',
      'She smiled. “Your grandfather built it. The summer I was your age.”',
      'I looked back down the trail. It did not seem as long anymore. I think that was the moment I stopped feeling sorry for myself, and started to feel something more like <b>gratitude</b>.'
    ],
    guide: { before: 'Explain what a portage is: carrying a canoe between lakes. Teach <b>luminous</b> and <b>gratitude</b>. Look at the trail diagram and find the canoe rest.',
      after: 'Who has left something behind that makes your life easier? How could you do the same for someone in the future?' },
    words: [['luminous', 'glowing with light'], ['gratitude', 'a feeling of being thankful']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'From whose point of view is the story told?',
        opts: ['the thirteen-year-old narrator', 'Nokomis', 'the grandfather', 'an all-knowing narrator'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, where is the canoe rest?',
        opts: ['partway up the hill', 'at Lake 1', 'at Lake 2', 'at the very top'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How does the narrator feel at the start of the story? Give two clues.',
        a: 'Annoyed and sorry for themselves. The narrator says “this did not seem fair” and had not wanted to come, because friends were at the mall.', look: 'a feeling supported by two details' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'What does the canoe rest symbolize in the story?',
        a: 'It stands for the help people leave for those who come after them. It also connects the narrator to a grandfather they never knew well and to the family’s past.', look: 'a symbolic meaning supported by the story' },
      { k: 'choice', code: 'B3.3', q: '“You stopped at the old rest,” she said. Why is there a comma before the closing quotation mark?',
        opts: ['The spoken words are followed by a speaker tag.', 'It ends the story.', 'It shows a list.', 'It shows a question.'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'What is the theme of the story? Explain how the ending shows it.',
        a: 'We are helped by people who came before us, and should be grateful. The ending reveals that the narrator’s grandfather built the rest, and the narrator feels gratitude.', look: 'a theme stated as an idea, linked to the ending' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'When the narrator saw the canoe rest, what did you predict? Was your prediction confirmed?',
        a: 'I predicted she would rest and then finish the portage. That was confirmed, but I did not predict that the narrator’s grandfather had built it.', look: 'a prediction and how the story confirmed or changed it' }
    ]
  });

  P.add({
    id: 'g8-habitat-67', subject: 'arts', form: 'Explanation',
    title: 'A Village of Stacked Boxes',
    deck: 'For Expo 67, a young architect stacked concrete boxes into homes with gardens in the sky',
    hero: {
      photo: 'g8-habitat-67.jpg', credit: 'Photo: Dllu, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Habitat 67 on the St. Lawrence River in Montréal. Each grey box is one piece of a home.'
    },
    body: [
      'In 1967, Canada turned 100 and threw a party for the world. Montréal hosted Expo 67, a world’s fair that drew more than 50 million visits. Among the pavilions stood a strange new building that looked like a pile of children’s blocks tumbled beside the St. Lawrence River. It was called Habitat 67, and it was meant to answer a big question: how can people live close together in a city and still have privacy, light and a garden?',
      { h: 'A student’s idea' },
      'The architect, Moshe Safdie, had first sketched the idea for his university thesis at McGill. He was only in his twenties when Expo asked him to build it. Safdie wanted to combine the best of a house in the suburbs with the best of an apartment building downtown.',
      { fig: [[0, 0], [1, 0], [2, 0], [3, 0], [0.5, 1], [1.8, 1], [2.9, 1], [1.2, 2], [2.4, 2], [1.8, 3]].map(function (b, i) { var x = 30 + b[0] * 56, y = 126 - b[1] * 30; return '<rect class="' + (i === 7 ? 'h' : 'k') + '" x="' + x + '" y="' + y + '" width="52" height="26"/>'; }).join('') +
          '<path class="a" d="M42 96 h20 M178 96 h18"/>' + D.label(6, 20, 'one module', 98, 66) + D.label(220, 28, 'roof garden', 190, 94) + tx(150, 168, 'n', 'modules stacked and offset', 'middle'),
        tall: 172, cap: 'Modules are stacked at offsets, so the roof of one becomes the garden of the home above.' },
      { h: 'Building with boxes' },
      'Habitat was built from 354 concrete boxes called <b>modules</b>. Each module was <b>prefabricated</b>: cast in a factory set up on the site, fitted with windows and kitchens, then lifted into place by a giant crane. One to eight modules joined together form a single home. Because the boxes are stacked at offsets, like a staircase in three directions, the roof of one home becomes the private garden of the home above. Nearly every home gets sunlight from several sides and a view of the river.',
      { box: 'By the numbers', text: 'Today, Habitat 67 has 146 homes. Each module is about 11.7 metres long, 5.3 metres wide and 3 metres high, a rectangular prism.' },
      { h: 'A dream that changed' },
      'Safdie hoped that factory-made modules would make homes cheap enough for ordinary families, and that cities around the world would copy the idea. That did not happen. Building Habitat cost far more than planned, and few copies were made. Ironically, the experiment in affordable housing became one of the most sought-after and expensive places to live in Montréal. Still, architects around the world study it. Its ideas, such as gardens on rooftops and homes stacked to let in light, appear in many new buildings today, including towers Safdie later designed in Asia.'
    ],
    guide: { before: 'Build a stack with boxes or blocks so that each roof is open. Teach <b>modules</b> and <b>prefabricated</b>. Find the hatched module in the diagram.',
      after: 'Design your own home from three modules. Where would the garden and windows be?' },
    words: [['modules', 'separate units that join together to make something larger'], ['prefabricated', 'made in parts in a factory, then put together on site']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, why does each home have a garden?',
        opts: ['The modules are offset, so a roof below becomes a garden.', 'The gardens are on the ground.', 'Each module has a yard.', 'The roof is made of soil.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>pre</b>fabricated, the prefix <b>pre-</b> means …',
        opts: ['before', 'after', 'not', 'again'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'The writer says Habitat’s story is ironic. Explain the irony.',
        a: 'Habitat was meant to make homes affordable for ordinary families, but it became one of the most expensive places to live in Montréal.', look: 'the gap between the goal and the result' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What problem was Safdie trying to solve, and how did his design solve it?',
        a: 'He wanted city homes with privacy, light and gardens. Stacking modules at offsets gave each home a rooftop garden and sunlight from several sides.', look: 'the problem and how the design answers it' },
      { k: 'choice', code: 'C3.2', q: 'Why were few copies of Habitat built?',
        opts: ['It cost far more than planned.', 'People disliked the river.', 'The modules fell apart.', 'Expo 67 forbade it.'], a: 0 },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Who might read this text, and for what purpose? Give two different readers.',
        a: 'An architecture student might read it to learn design ideas. A tourist might read it before visiting Montréal to understand the building.', look: 'two readers with different purposes' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize in two sentences what Habitat 67 is and why it still matters.',
        a: 'Habitat 67 is a housing complex of stacked concrete modules built for Expo 67. Its ideas of rooftop gardens and stacked homes still influence buildings today.', look: 'what it is and its lasting influence' }
    ]
  });

  P.add({
    id: 'g8-bike-gears', subject: 'tech', form: 'Explanation',
    title: 'Why Bikes Have Gears',
    deck: 'Climbing a hill or racing down a flat road needs very different help from your bike. Gears make the trade.',
    hero: {
      photo: 'g8-bike-gears.jpg', credit: 'Photo: Cjp24, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'The rear gears of a bicycle. The chain can move between sprockets of different sizes.'
    },
    body: [
      'Ride a bike up a steep hill in the wrong gear and your legs will burn while the bike barely moves. Shift to a different gear and, suddenly, you can climb. Nothing about the hill has changed. What changed is how the bike shares the work between your legs and the wheels.',
      { h: 'Teeth and turns' },
      'A bike’s chain links two toothed wheels, called sprockets. The front one is turned by the pedals. The back one turns the rear wheel. Suppose the front sprocket has 48 teeth and the back one has 12. Each time you turn the pedals once, the chain pulls 48 teeth past the back sprocket. The back sprocket has only 12 teeth, so it must turn 4 times. The <b>gear ratio</b> is 48 to 12, or 4 to 1.',
      { fig: '<circle class="k" cx="80" cy="76" r="50"/><circle class="k" cx="230" cy="76" r="14"/><path class="a" d="M80 26 L230 62 M80 126 L230 90"/>' + tx(80, 80, 'lb', '48 teeth', 'middle') + tx(230, 120, 'lb', '12 teeth', 'middle') + tx(80, 150, 'n', 'front: turned by pedals', 'middle') + tx(230, 150, 'n', 'back: turns the wheel', 'middle') + tx(155, 20, 'n', 'chain', 'middle'),
        tall: 160, cap: 'A large front sprocket and a small back one: one turn of the pedals turns the wheel 4 times.' },
      { h: 'The trade-off' },
      'In a high gear like 4 to 1, the wheel spins quickly and you travel far with each push. But each push takes a lot of <b>force</b>, because your legs are doing the work of four wheel turns at once. That is great on a flat road or going downhill. On a steep hill, it is exhausting. In a low gear, such as 32 teeth in front and 32 at the back, the ratio is 1 to 1. Each pedal turn moves the wheel only once, so you go slowly, but each push is much easier. This is called <b>mechanical advantage</b>: a machine lets you use less force by moving a greater distance.',
      { box: 'How far per pedal turn?', text: 'A road bike wheel travels about 2.1 metres each time it turns. In a 4 to 1 gear, one pedal turn moves you about 4 × 2.1 = 8.4 metres.' },
      { h: 'Choosing well' },
      'Many bikes have two or three front sprockets and up to twelve at the back, giving riders dozens of combinations. Good cyclists shift before they need to, keeping their legs turning at a steady, comfortable speed. The same idea is used in cars, wind turbines and electric drills: gears let a machine trade speed for force, or force for speed.'
    ],
    guide: { before: 'Turn a bike upside down and count the teeth on two sprockets together. Teach <b>gear ratio</b>, <b>force</b> and <b>mechanical advantage</b>.',
      after: 'Which gear would you choose for a steep hill, a flat road and a downhill? Explain using the gear ratio.' },
    words: [['gear ratio', 'how many times the back sprocket turns for each turn of the front one'], ['force', 'a push or a pull'], ['mechanical advantage', 'how much a machine multiplies the force you use']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Complete the chart. Use a wheel that travels 2.1 metres per turn.', cols: ['Front teeth : back teeth', 'Gear ratio', 'Distance per pedal turn'],
        rows: [['48 : 12', '4 to 1', null], ['36 : 18', null, null], ['32 : 32', null, '2.1 m']],
        a: [[null, null, '8.4 m'], [null, '2 to 1', '4.2 m'], [null, '1 to 1', null]] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, why does the back sprocket turn 4 times?',
        opts: ['It has a quarter as many teeth.', 'It is closer to the wheel.', 'The chain is longer.', 'It is heavier.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is a low gear better for a steep hill?',
        opts: ['Each push needs less force.', 'The bike goes faster.', 'The chain is shorter.', 'The wheel turns more.'], a: 0 },
      { k: 'choice', code: 'B2.2', q: 'In “gears let a machine <b>trade</b> speed for force,” <b>trade</b> means …',
        opts: ['give up one thing to get another', 'a job or skill', 'sell in a store', 'a kind of wind'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the trade-off between a high gear and a low gear.',
        a: 'A high gear moves you far with each push but needs a lot of force. A low gear needs less force but moves you a shorter distance.', look: 'force and distance contrasted for both gears' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which part of this text did you need to reread? How did the box or the diagram help you check your understanding?',
        a: 'I reread the part about 48 and 12 teeth. The diagram showed the big and small sprockets, and the box’s calculation helped me check the ratio.', look: 'names a reread part and how a feature helped' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'The last paragraph says gears are used in other machines. Choose one and explain why it might need gears.',
        a: 'An electric drill needs gears so it can turn slowly with a lot of force to drive a screw, or quickly with less force to drill a small hole.', look: 'a real machine and the trade it makes' }
    ]
  });

  P.add({
    id: 'g8-iqaluit-food', subject: 'geography', form: 'Report',
    title: 'The Price of Groceries in the North',
    deck: 'In Nunavut, a cart of groceries can cost two or three times as much as in southern Canada. Why?',
    hero: {
      photo: 'g8-iqaluit.jpg', credit: 'Photo: OhanaUnited, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A shopping centre with a grocery store in Iqaluit, the capital of Nunavut. Most of the food sold here arrives by air or by sea.'
    },
    body: [
      'In a grocery store in Iqaluit, the capital of Nunavut, a bag of apples, a jug of milk and a box of cereal can cost two or three times what they cost in Toronto. In smaller communities farther north, prices are often even higher, because supplies must be flown on again from Iqaluit in smaller planes. For many families, this makes it hard to put healthy food on the table every day, even when parents work full time.',
      { h: 'No roads in' },
      'There are no roads or railways linking Nunavut’s 25 communities to the rest of Canada. Almost everything must come by air or by sea. Each summer, when the ice clears, ships called the <b>sealift</b> bring a year’s supply of things that keep, such as canned food, building materials, fuel and even cars. Fresh food, such as fruit, vegetables and milk, cannot wait a year. It must be flown in, and air freight is very expensive.',
      { fig: '<rect class="k" x="10" y="20" width="80" height="36" rx="5"/><rect class="k" x="210" y="20" width="80" height="36" rx="5"/><rect class="k" x="210" y="100" width="80" height="36" rx="5"/><rect class="k" x="10" y="100" width="80" height="36" rx="5"/>' +
          D.arrow(90, 38, 210, 38, 'a') + D.arrow(90, 118, 210, 118, 'k') + tx(50, 42, 'n', 'fresh food', 'middle') + tx(250, 42, 'n', 'store', 'middle') + tx(50, 122, 'n', 'canned food', 'middle') + tx(250, 122, 'n', 'warehouse', 'middle') +
          tx(150, 30, 'n', 'plane: all year, costly', 'middle') + tx(150, 110, 'n', 'ship: once a year', 'middle') + tx(150, 156, 'n', 'two ways food reaches Nunavut', 'middle'),
        tall: 160, cap: 'Fresh food is flown in all year. Food that keeps arrives by ship once a year.' },
      { h: 'Food security' },
      '<b>Food security</b> means that everyone has reliable access to enough safe, healthy food. By that measure, Nunavut faces one of the most serious challenges in Canada: surveys have found that about half of households have struggled to afford enough food. The cost of food is not the only reason. Many jobs pay less than the high cost of living, and housing is crowded and expensive.',
      { box: 'Country food', text: 'Inuit have always lived on <b>country food</b>: caribou, Arctic char, seal and whale, hunted and shared. It is healthy and culturally important, but hunting now requires costly gas, snowmobiles and equipment.' },
      { h: 'Working on solutions' },
      'The federal government gives a subsidy, called Nutrition North Canada, to lower the price of healthy foods flown to the North. Some communities run freezers where hunters share country food with families who need it. Others are trying greenhouses that grow vegetables, even in the long Arctic winter. Many Inuit leaders say lasting solutions must come from the communities themselves, with more good jobs and support for hunting and sharing.'
    ],
    guide: { before: 'Find Iqaluit and Nunavut on a map of Canada; notice there are no roads. Teach <b>sealift</b>, <b>food security</b> and <b>country food</b>.',
      after: 'Compare the price of one food in your store with prices reported online for Iqaluit. What surprised you?' },
    words: [['sealift', 'the yearly delivery of supplies by ship to northern communities'], ['food security', 'reliable access to enough safe, healthy food'], ['country food', 'food that Inuit hunt, fish and gather from the land and sea']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, how does fresh food reach Nunavut?',
        opts: ['by plane, all year', 'by ship, once a year', 'by truck', 'by train'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why can fresh food not come by sealift?',
        opts: ['It would spoil before the next ship.', 'Ships are too slow to carry it.', 'It is too heavy.', 'Ships carry only cars.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the cause-and-effect chart.', cols: ['Cause', 'Effect'],
        rows: [['no roads to Nunavut', null], [null, 'fresh food is very expensive'], ['hunting needs gas and equipment', null]],
        a: [[null, 'supplies come by air or sea'], ['fresh food must be flown in', null], [null, 'country food is costly to get']] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why is country food important to Inuit, beyond its price? Use the box.',
        a: 'It is healthy and culturally important. Hunting and sharing food are traditions that connect families and communities.', look: 'health and cultural meaning' },
      { k: 'choice', code: 'B3.3', q: 'In the box, why is there a colon after <b>country food</b>?',
        opts: ['to introduce a list of examples', 'to end a sentence', 'to show a quotation', 'to join two names'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The last sentence says solutions must come from the communities themselves. Why might this be important?',
        a: 'People who live in the North understand their needs best. Solutions designed far away may not fit their culture or way of life.', look: 'the value of local voices and decisions' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the main reasons food costs so much in Nunavut, in two sentences.',
        a: 'There are no roads, so fresh food must be flown in, which is very expensive. Low wages and high living costs make it even harder to afford.', look: 'transport and income reasons' }
    ]
  });

  P.add({
    id: 'g8-hot-air-balloon', subject: 'science', form: 'Explanation',
    title: 'Floating on Warm Air',
    deck: 'A hot air balloon has no engine and no wings. It rises because of a simple fact about air.',
    hero: {
      photo: 'g8-balloon.jpg', credit: 'Photo: Sunridin, CC BY 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A pilot fires the burner to heat the air inside a hot air balloon.'
    },
    body: [
      'On a September morning in 1783, a crowd at the palace of Versailles, near Paris, watched a huge paper-and-cloth bag rise into the sky. Hanging beneath it in a basket were a sheep, a duck and a rooster, the first passengers ever carried by a balloon. The brothers Joseph and Étienne Montgolfier had built it. Two months later, two men rode a Montgolfier balloon over Paris for about 25 minutes. Human flight had begun.',
      { fig: '<path class="k" d="M150 10 Q220 10 220 70 Q220 110 168 130 H132 Q80 110 80 70 Q80 10 150 10 Z"/><rect class="k" x="136" y="146" width="28" height="18"/><path class="t" d="M134 130 L138 146 M166 130 L162 146"/>' +
          [110, 150, 190].map(function (x) { return '<circle class="t" cx="' + x + '" cy="62" r="2"/>'; }).join('') + [30, 50, 250, 270].map(function (x) { return '<circle class="dot" cx="' + x + '" cy="60" r="2"/><circle class="dot" cx="' + (x + 8) + '" cy="76" r="2"/><circle class="dot" cx="' + (x - 6) + '" cy="92" r="2"/>'; }).join('') +
          D.arrow(150, 120, 150, 30, 'a') + tx(150, 92, 'n', 'hot air', 'middle') + tx(40, 116, 'n', 'cool air', 'middle') + tx(260, 116, 'n', 'cool air', 'middle'),
        tall: 168, cap: 'Particles of hot air are spread out; particles of cool air are packed closer. The balloon is pushed up.' },
      { h: 'Air is a fluid' },
      'Air is a <b>fluid</b>, just like water: it flows and takes the shape of its container. And like water, it pushes up on anything inside it. When air is heated, its particles move faster and spread farther apart. A cubic metre of hot air contains fewer particles, so it has less mass. In other words, hot air is less <b>dense</b> than cool air. Just as a block of wood floats on water, a balloon full of hot air floats in the cooler, denser air around it.',
      { h: 'How a pilot steers' },
      'Modern balloons use a propane burner to heat the air inside the envelope, the fabric bag, to about 100 °C. To climb, the pilot fires the burner. To sink, the pilot lets the air cool or opens a vent at the top to let some hot air escape. A balloon has no way to steer left or right. Instead, pilots use the fact that wind often blows in different directions at different heights. By rising or sinking, they catch the wind that is going their way.',
      { box: 'Lots of lift', text: 'Each cubic metre of hot air weighs about a quarter of a kilogram less than the cool air it replaces. A balloon holding 2800 cubic metres can lift about 700 kilograms: the balloon, the basket and several passengers.' },
      'Every August, hundreds of thousands of visitors come to Saint-Jean-sur-Richelieu, Quebec, for the largest hot air balloon festival in Canada. As dozens of balloons drift over the river at sunset, they are a beautiful demonstration of <b>buoyancy</b>, the same force that lifts a swimmer or a ship.'
    ],
    guide: { before: 'Put a balloon over the mouth of an empty bottle and stand the bottle in hot water. Teach <b>fluid</b>, <b>dense</b> and <b>buoyancy</b>. Compare the particles inside and outside the balloon in the diagram.',
      after: 'Why do you think balloon flights usually happen in the early morning or evening, when the air is cool?' },
    words: [['fluid', 'a substance that flows, such as a liquid or a gas'], ['dense', 'having a lot of mass packed into a space'], ['buoyancy', 'the upward push of a fluid on an object in it']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show about the particles inside the balloon?',
        opts: ['They are farther apart than outside.', 'They are packed closer.', 'There are none.', 'They are the same as outside.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How does a pilot change direction?',
        opts: ['by rising or sinking to catch a different wind', 'with a steering wheel', 'with a propeller', 'by firing the burner sideways'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain, step by step, why heating the air makes the balloon rise.',
        a: 'Heating makes the particles move faster and spread apart. The hot air becomes less dense than the cool air outside. The denser cool air pushes the balloon up.', look: 'particles spread, less dense, pushed up' },
      { k: 'choice', code: 'B3.2', q: '“The pilot <b>fires</b> the burner.” In this sentence, <b>fires</b> is …',
        opts: ['a verb', 'a noun', 'an adjective', 'an adverb'], a: 0 },
      { k: 'lines', code: 'C1.2', n: 3, q: 'The writer compares a balloon in air to a block of wood on water. How does this comparison help?',
        a: 'Most people know wood floats on water. It helps readers see that hot air floats in cool air for the same reason: it is less dense.', look: 'links the familiar example to density' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Use the box. If one cubic metre of hot air lifts a quarter of a kilogram, how much could 400 cubic metres lift? Show your thinking.',
        a: '400 × 0.25 = 100 kilograms.', look: 'correct calculation: 100 kg' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Where else have you seen hot air rise, at home or outdoors? Explain using the text.',
        a: 'Above a campfire, sparks and smoke rise. The air heated by the fire is less dense, so the cooler air around it pushes it up.', look: 'a real example explained with density' }
    ]
  });

  P.add({
    id: 'g8-compound-interest', subject: 'math', form: 'Explanation',
    title: 'Money That Grows Itself',
    deck: 'Why starting to save early can matter more than saving a lot',
    hero: {
      photo: 'g8-coins.jpg', credit: 'Photo: KMR Photography, CC BY 2.0, Wikimedia Commons', focus: '50% 75%',
      tall: 180,
      cap: 'Stacks of Canadian coins. Small amounts, saved and left to grow, can add up over time.'
    },
    body: [
      'Imagine you put $1000 in a savings account at the bank. The bank uses your money to make loans, and in return it pays you a little extra each year. That extra money is called <b>interest</b>. The amount you start with is the <b>principal</b>. If the bank pays 5% interest per year, how much will you have after ten years?',
      { fig: bars([[1000, 'start'], [1276, 'after', '5 years'], [1629, 'after', '10 years'], [2653, 'after', '20 years']], { max: 3000, step: 1000, pre: '$' }),
        tall: 172, cap: '$1000 earning 5% compound interest each year (rounded to the nearest dollar).' },
      { h: 'Simple interest' },
      'With simple interest, you earn interest only on your original $1000. Five percent of $1000 is $50, so you earn $50 every year. After ten years, you have $1000 + 10 × $50 = $1500. The amount you earn never changes, no matter how long you wait.',
      { h: 'Compound interest' },
      'Most savings accounts pay <b>compound interest</b>, which means you earn interest on your interest. In the first year, you earn $50, so you have $1050. In the second year, you earn 5% of $1050, which is $52.50, so you have $1102.50. Each year, the amount you earn interest on gets bigger, so the money grows faster and faster. By year ten, you are earning about $78 a year instead of $50.',
      { h: 'Time is the secret' },
      'Look at the graph. In the first ten years, the money grows by about $629. In the next ten, it grows by more than $1000, even though no new money was added. That is the power of compounding: the longer money is left to grow, the faster it grows. This is why financial advisers say that starting to save young matters even more than saving large amounts.',
      { box: 'It works against you too', text: 'Credit cards charge compound interest on money you owe, often about 20% per year. A debt that is not paid off can grow quickly, in the same way that savings do.' },
      'Real accounts pay different rates, and rates change over time. Prices also rise, a change called inflation, so money must grow just to keep its value. Still, the rule holds: interest on interest adds up. A good habit is to save a small part of any money you receive, such as birthday gifts or wages from a part-time job, before you spend the rest.'
    ],
    guide: { before: 'Calculate 5% of 1000 together. Teach <b>interest</b>, <b>principal</b> and <b>compound interest</b>. Read the bars on the graph from left to right.',
      after: 'If you saved $5 a week from now until you are 18, about how much would you put in? How could interest help it grow?' },
    words: [['interest', 'money paid for the use of money that is saved or borrowed'], ['principal', 'the amount of money you start with'], ['compound interest', 'interest earned on the principal and on earlier interest']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Complete the chart for $1000 at 5% compound interest.', cols: ['Year', 'Interest earned', 'Total at end of year'],
        rows: [['1', '$50', null], ['2', null, '$1102.50'], ['3', null, null]],
        a: [[null, null, '$1050'], [null, '$52.50', null], [null, '$55.13', '$1157.63']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, about how much is there after 20 years?',
        opts: ['$2653', '$1629', '$1500', '$3000'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In this text, <b>interest</b> means …',
        opts: ['money paid for the use of money', 'a feeling of curiosity', 'a hobby', 'a share in a business'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the difference between simple and compound interest, using the $1000 example.',
        a: 'Simple interest pays $50 a year only on the $1000, giving $1500 after ten years. Compound interest pays interest on the interest too, giving about $1629.', look: 'both kinds with the example amounts' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do advisers say starting young matters more than saving a lot?',
        a: 'Because compound interest grows faster the longer money is left. Money saved early has more years to grow on its own interest.', look: 'links time to compounding' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why do you think the writer included the box about credit cards?',
        a: 'To show the other side: compound interest can also make debt grow quickly, so readers understand it can help or harm them.', look: 'recognizes the warning and its purpose' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which helped you more to understand compounding: the worked example, the graph or the box? Explain, and say what you would do differently next time.',
        a: 'The worked example helped most because I could follow each year. Next time I would try the calculation myself before reading the answer.', look: 'names what helped and a goal for next time' }
    ]
  });

  P.add({
    id: 'g8-tardigrade', subject: 'science', form: 'Feature article',
    title: 'The Toughest Animal on Earth',
    deck: 'It is smaller than a grain of sand, lives in moss and can survive a trip into space',
    hero: {
      photo: 'g8-tardigrade.jpg', credit: 'Photo: Bob Goldstein and Vicky Madden, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A tardigrade, or water bear, seen through a scanning electron microscope. It is less than half a millimetre long.'
    },
    body: [
      'Scrape a little damp moss from a rock or a tree, shake it into a dish of water and look through a microscope. With luck, you will see a chubby creature with eight stubby legs, each tipped with tiny claws, lumbering through the water like a bear. It is a tardigrade, often called a water bear. Most are less than half a millimetre long. They live almost everywhere on Earth: in moss, in soil, in hot springs, on mountaintops and at the bottom of the ocean.',
      { h: 'A tiny animal made of cells' },
      'Unlike bacteria or a paramecium, a tardigrade is not a single cell. It is a true animal, made of many cells that work together in tissues and organs. It has a brain, a mouth with sharp stylets for piercing plant cells, a gut and muscles. Some species have only about a thousand cells in their whole body.',
      { fig: '<path class="k" d="M10 120 H290"/>' + [[30, 2, 'grain of salt', '0.3 mm'], [100, 3, 'tardigrade', '0.5 mm'], [180, 6, 'ant', '3 mm'], [255, 10, 'ladybug', '6 mm']].map(function (o) { return '<circle class="' + (o[2] === 'tardigrade' ? 'a' : 'k') + '" cx="' + o[0] + '" cy="' + (120 - o[1] * 4) + '" r="' + o[1] * 4 + '"/>' + tx(o[0], 140, 'n', o[2], 'middle') + tx(o[0], 154, 'lb', o[3], 'middle'); }).join(''),
        tall: 160, cap: 'Approximate sizes, drawn enlarged (not exactly to scale).' },
      { h: 'Life on pause' },
      'The tardigrade’s secret is a state called <b>cryptobiosis</b>, which means “hidden life.” When its home dries out, a tardigrade pulls in its legs, loses almost all the water in its body and curls into a dry little barrel called a tun. Its <b>metabolism</b>, the chemical activity that keeps it alive, slows to almost nothing. In this state, it can wait for years. Add water, and within hours it uncurls and walks away.',
      { box: 'Tested to the limit', text: 'In experiments, tun-state tardigrades have survived being frozen to almost −273 °C, heated past 100 °C for a short time and exposed to the airless vacuum of space on a satellite in 2007.' },
      { h: 'Why scientists care' },
      'Tardigrades are not indestructible: they can be crushed, and active ones die easily in harsh conditions. But they fascinate scientists. Researchers have found special proteins that protect their cells as they dry out, and another that helps shield their genetic material from radiation. One day, ideas borrowed from water bears might help keep vaccines safe without a fridge, or protect astronauts on long journeys.'
    ],
    guide: { before: 'If possible, soak some moss and look for tardigrades with a magnifier or microscope. Teach <b>cryptobiosis</b> and <b>metabolism</b>. Compare the sizes in the diagram.',
      after: 'If humans could enter a tun state, how might that change space travel? Would you want to try it?' },
    words: [['cryptobiosis', 'a state in which an animal’s life processes almost stop until conditions improve'], ['metabolism', 'all the chemical activity in a living thing that keeps it alive']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, which is closest in size to a tardigrade?',
        opts: ['a grain of salt', 'an ant', 'a ladybug', 'a human hair'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<b>Crypto</b>biosis comes from Greek. If <i>bios</i> means life, <i>crypto</i> means …',
        opts: ['hidden', 'long', 'cold', 'small'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps of cryptobiosis.',
        items: ['The tardigrade’s home dries out.', 'It pulls in its legs and loses its water.', 'It curls into a tun.', 'Its metabolism almost stops.', 'Water returns and it uncurls.'], show: [3, 0, 4, 1, 2] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How is a tardigrade different from a paramecium? Use the text.',
        a: 'A paramecium is a single cell, but a tardigrade is an animal made of many cells working together in tissues and organs, with a brain, gut and muscles.', look: 'single cell versus many cells, with detail' },
      { k: 'choice', code: 'C1.1', q: '“Add water, and within hours <b>it</b> uncurls and walks away.” <b>It</b> refers to …',
        opts: ['the tardigrade', 'the water', 'the tun’s shell', 'the moss'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The title calls the tardigrade the toughest animal on Earth. Does the last section agree completely? Explain.',
        a: 'Not completely. It says tardigrades are not indestructible: they can be crushed, and active ones die easily. They are tough mainly in the tun state.', look: 'notices the qualification in the last section' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Why might a medical researcher and a space scientist both want to read this article?',
        a: 'A medical researcher might want ideas for keeping vaccines safe without a fridge. A space scientist might want ways to protect astronauts from radiation.', look: 'two purposes linked to the last section' }
    ]
  });

  P.add({
    id: 'g8-canadarm', subject: 'tech', form: 'Report',
    title: 'Canada’s Arm in Space',
    deck: 'A robotic arm built in Canada has helped build and run the International Space Station for more than twenty years',
    hero: {
      photo: 'g8-canadarm.jpg', credit: 'Photo: NASA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 170,
      cap: 'Astronaut Steve Robinson rides on the end of Canadarm2 during a spacewalk outside the International Space Station in 2005.'
    },
    body: [
      'In November 1981, the space shuttle <i>Columbia</i> unfolded a long, white robotic arm in orbit for the first time. It had been designed and built in Canada. The arm, nicknamed Canadarm, became one of the most famous pieces of Canadian technology, and it began a tradition that continues today. Canadian engineers have been building robot arms for space ever since.',
      { fig: '<rect class="k" x="10" y="130" width="40" height="20"/><path class="k" d="M30 130 L110 60 L200 90 L250 50"/><circle class="k" cx="30" cy="130" r="6"/><circle class="k" cx="110" cy="60" r="6"/><circle class="k" cx="200" cy="90" r="6"/><path class="a" d="M250 50 l14 -6 M250 50 l10 12"/>' +
          D.label(56, 150, 'shoulder joints', 34, 132) + D.label(90, 28, 'elbow', 110, 54) + D.label(180, 124, 'wrist joints', 200, 96) + D.label(230, 20, 'end effector', 254, 44),
        tall: 160, cap: 'A robotic arm’s main joints (simplified). Canadarm2 has seven joints in all.' },
      { h: 'An arm like yours' },
      'Like a human arm, Canadarm had a shoulder, an elbow and a wrist. Each <b>joint</b> could bend or rotate, controlled by electric motors. On the end was a special hand, called an end effector, which closed three wire snares around a metal pin on whatever the arm needed to grab. Astronauts trained for months to operate it from inside the shuttle, watching through windows and cameras. Over 30 years, Canadarm launched and caught satellites, repaired the Hubble Space Telescope and moved astronauts during spacewalks.',
      { box: 'On your money', text: 'Canadarm2 and its robot helper, Dextre, appear on the back of the Canadian five-dollar bill.' },
      { h: 'Canadarm2' },
      'In 2001, Canadian astronaut Chris Hadfield helped install a bigger, smarter arm on the International Space Station: Canadarm2. It is about 17 metres long and has seven joints, more than a human arm, which gives it great <b>flexibility</b>. It has a hand at each end, so it can move end over end around the outside of the station, like an inchworm. It has caught visiting cargo spacecraft and helped assemble the station piece by piece. Its joints can be replaced in orbit if they wear out.',
      { h: 'Controlled from the ground' },
      'Today, much of Canadarm2’s work is controlled by teams on Earth, including at the Canadian Space Agency near Montréal. This lets astronauts spend their time on science. Canadian engineers are now building Canadarm3, an even smarter arm that will be able to do some jobs on its own using artificial intelligence. It is planned for a space station that will orbit the Moon.'
    ],
    guide: { before: 'Move your own arm and name your joints: shoulder, elbow, wrist. Teach <b>joint</b> and <b>flexibility</b>. Find a five-dollar bill and look at the back.',
      after: 'What job would you design a robot arm to do on Earth? How many joints would it need?' },
    words: [['joint', 'a place where two parts meet and can move'], ['flexibility', 'the ability to bend or move in many ways']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is the end effector?',
        opts: ['at the end of the arm', 'at the shoulder', 'at the elbow', 'on the base'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why can Canadarm2 move around the station like an inchworm?',
        opts: ['It has a hand at each end.', 'It has wheels.', 'It floats freely.', 'Astronauts carry it.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the two arms.', cols: ['Canadarm', 'Canadarm2'],
        rows: [['first used in 1981', null], ['worked from the space shuttle', null], [null, 'seven joints']],
        a: [[null, 'installed in 2001'], [null, 'works on the International Space Station'], ['shoulder, elbow and wrist joints', null]] },
      { k: 'choice', code: 'B3.3', q: 'Why is <i>Columbia</i> written in italics?',
        opts: ['It is the name of a spacecraft.', 'It is a foreign word.', 'It is a quotation.', 'It is a new term.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'A robot arm is a system. Name one input, one part and one output of Canadarm2.',
        a: 'Input: commands from a team on Earth. Part: the joints and their motors. Output: a spacecraft is caught and moved.', look: 'input, part and output that fit the text' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why do you think Canadarm is shown on the five-dollar bill? What does it say about how Canadians see this technology?',
        a: 'It is a source of national pride. Putting it on money shows Canadians see it as an important achievement that represents the country.', look: 'national pride or identity, with a reason' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Canadarm3 will do some jobs on its own. Predict one job it might do, and one risk.',
        a: 'It might repair the station while astronauts sleep. A risk is that it could make a mistake that no one notices in time.', look: 'a reasonable job and risk' }
    ]
  });

  P.add({
    id: 'g8-wind-turbine', subject: 'science', form: 'Explanation',
    title: 'Catching the Wind',
    deck: 'A wind turbine is a tower-sized system for turning moving air into electricity. Why does wind speed matter so much?',
    hero: {
      photo: 'g8-wind-turbines.jpg', credit: 'Photo: Boris Kasimov, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Wind turbines turning in a field in southern Ontario.'
    },
    body: [
      'Drive along the shores of Lake Huron or Lake Erie and you may see them: white towers taller than a 30-storey building, each topped with three slowly turning blades. Each <b>wind turbine</b> is a system with one job, to turn the energy of moving air into electricity.',
      { h: 'Inside a turbine' },
      'Wind pushes on the long blades and makes the rotor spin. The blades are shaped like airplane wings, so the wind creates lift that pulls them around. The rotor turns a shaft inside the box at the top, called the nacelle. A gearbox speeds up the slow turning of the blades, and a generator changes that motion into electricity. Sensors measure the wind, and motors turn the whole nacelle to face it. If the wind gets dangerously strong, the blades are angled so the turbine stops.',
      { fig: bars([[1, '5 m/s'], [8, '10 m/s'], [27, '15 m/s']], { max: 30, step: 10 }) + tx(46, 12, 'n', 'power (compared with 5 m/s wind)'),
        tall: 172, cap: 'When wind speed doubles, the power available goes up about eight times (simplified).' },
      { h: 'Why wind speed matters' },
      'The power in the wind depends on its speed multiplied by itself three times. If the wind blows twice as fast, it carries about 2 × 2 × 2 = 8 times as much power. That is why turbines are built where winds are strong and steady: on hilltops, along shorelines and out at sea. It is also why taller towers help, because winds are stronger higher above the ground.',
      { box: 'Efficiency', text: 'No turbine can capture all of the wind’s energy, because some air must keep moving past the blades. Modern turbines turn roughly 40 percent of the wind’s energy into electricity at their best, which makes them quite <b>efficient</b>.' },
      { h: 'Benefits and concerns' },
      'Wind turbines make electricity without burning fuel or releasing carbon dioxide while they run, and the wind is free and <b>renewable</b>. But the wind does not always blow, so other sources must fill the gaps. Some neighbours dislike the noise and the change to the view. Turbines can kill birds and bats, so builders study migration routes before choosing a site. In some places, communities and First Nations own wind farms themselves and share in the money they earn.'
    ],
    guide: { before: 'Make a paper pinwheel and blow on it gently, then hard. Teach <b>wind turbine</b>, <b>efficient</b> and <b>renewable</b>. Read the bar graph together.',
      after: 'Would you want a wind farm near your home? Weigh one benefit and one concern.' },
    words: [['wind turbine', 'a machine that uses wind to make electricity'], ['efficient', 'producing a lot without wasting energy'], ['renewable', 'able to be replaced naturally, so it does not run out']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, how much more power is there at 15 m/s than at 5 m/s?',
        opts: ['about 27 times', 'about 3 times', 'about 8 times', 'the same'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do taller towers help?',
        opts: ['Winds are stronger higher up.', 'They are easier to build.', 'Birds fly lower.', 'They are quieter.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the steps in how a turbine makes electricity.',
        items: ['Wind pushes on the blades.', 'The rotor spins a shaft.', 'A gearbox speeds up the turning.', 'A generator makes electricity.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Use the text to explain why doubling the wind speed gives about eight times the power.',
        a: 'Power depends on speed multiplied by itself three times. Doubling the speed gives 2 × 2 × 2 = 8 times the power.', look: 'speed cubed and the calculation' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence begins with a dependent clause?',
        opts: ['If the wind gets dangerously strong, the blades are angled so the turbine stops.', 'Wind pushes on the long blades.', 'The wind is free.', 'Some neighbours dislike the noise.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Is the last section balanced? Give evidence for your answer.',
        a: 'Yes. It gives benefits, such as no fuel and renewable wind, and concerns, such as noise, birds and bats, and the wind not always blowing.', look: 'evidence of both benefits and concerns' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'What questions did you have about wind turbines before reading? Which were answered, and which do you still have?',
        a: 'I wondered why they turn so slowly. The text explained the gearbox. I still wonder how long a turbine lasts.', look: 'own questions checked against the text' }
    ]
  });

  P.add({
    id: 'g8-iceberg-alley', subject: 'geography', form: 'Report',
    title: 'Iceberg Alley',
    deck: 'Every spring, icebergs from Greenland drift past the coast of Newfoundland and Labrador. Their journey takes years.',
    hero: {
      photo: 'g8-iceberg.jpg', credit: 'Photo: Eduard47, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'An iceberg near Twillingate, Newfoundland and Labrador. Most of its ice is hidden below the water.'
    },
    body: [
      'In late spring, people in towns such as Twillingate and St. Anthony climb the hills above the sea and look out at a parade of ice. Giant white icebergs, some as tall as a 15-storey building, drift slowly past the coast. This stretch of the Atlantic is known as Iceberg Alley.',
      { fig: '<path class="k" d="M10 60 H290"/><path class="a" d="M110 60 L126 30 L150 22 L170 36 L184 60"/><path class="k" d="M110 60 L80 90 L84 130 L130 150 L200 140 L230 100 L184 60"/>' +
          tx(200, 30, 'n', 'above water:') + tx(200, 44, 'n', 'about 1/10') + tx(236, 120, 'n', 'below water:') + tx(236, 134, 'n', 'about 9/10') + tx(20, 54, 'n', 'sea level'),
        tall: 156, cap: 'An iceberg floats with most of its ice below the surface (simplified).' },
      { h: 'Born in Greenland' },
      'Most of these icebergs began as snow that fell on Greenland thousands of years ago. Over centuries, the snow was pressed into thick glacier ice that slowly flowed toward the sea. When a glacier reaches the ocean, huge pieces break off and fall into the water, a process called <b>calving</b>. Icebergs from western Greenland are carried north, then west and south by ocean currents. The cold Labrador Current carries them down the coast of Labrador and Newfoundland. The trip can take two or three years, and most icebergs melt long before they reach the end.',
      { box: 'Ancient water', text: 'Iceberg ice is frozen fresh water, often more than 10 000 years old. Some companies in Newfoundland harvest small pieces of icebergs to make bottled water.' },
      { h: 'The hidden part' },
      'Ice is less <b>dense</b> than sea water, so an iceberg floats. But it is only a little less dense, so it floats very low. About nine tenths of an iceberg is underwater. That is where the phrase “the tip of the iceberg” comes from: what we see is only a small part of what is there. The hidden ice can stretch far out to the sides, which is why ships give icebergs a wide berth.',
      { h: 'Watching the ice' },
      'Icebergs are still a danger to shipping and to the oil platforms off Newfoundland. Since the <i>Titanic</i> sank in 1912, the International Ice Patrol has tracked icebergs in the North Atlantic, now using aircraft, satellites and radar. Some years, more than a thousand icebergs drift south of Newfoundland; in other years, almost none do. Scientists study the counts to understand how winds, currents and a warming climate affect Greenland’s ice.'
    ],
    guide: { before: 'Float an ice cube in a glass of water and look at how much is below the surface. Teach <b>calving</b> and <b>dense</b>. Trace the route from Greenland to Newfoundland on a map.',
      after: 'The phrase “the tip of the iceberg” is used for many problems. Use it in a sentence about something in your life.' },
    words: [['calving', 'when a large piece of ice breaks off a glacier into the water'], ['dense', 'having a lot of mass packed into a space']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, how much of an iceberg is above water?',
        opts: ['about one tenth', 'about half', 'about nine tenths', 'all of it'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do ships give icebergs a wide berth?',
        opts: ['The hidden ice can stretch far to the sides.', 'Icebergs move very fast.', 'Icebergs are magnetic.', 'Icebergs make loud noises.'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the stages of an iceberg’s life.',
        items: ['Snow falls on Greenland.', 'The snow is pressed into glacier ice.', 'The glacier flows to the sea.', 'A piece breaks off: calving.', 'The Labrador Current carries it south.'], show: [4, 1, 3, 0, 2] },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Explain the phrase “the tip of the iceberg” and how it connects to the science in the text.',
        a: 'It means you see only a small part of a bigger problem. It comes from the fact that only about one tenth of an iceberg shows above the water.', look: 'figurative meaning linked to the nine tenths below' },
      { k: 'choice', code: 'B2.2', q: 'To give something a “wide <b>berth</b>” means to …',
        opts: ['keep well away from it', 'sleep near it', 'measure it', 'tie up beside it'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think the number of icebergs passing Newfoundland changes so much from year to year? Use the text.',
        a: 'It depends on how many break off Greenland’s glaciers and on winds and currents, which change each year. Many melt before they arrive.', look: 'an inference using calving, currents or melting' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which text feature helped you most: the diagram, the box or the headings? How will you use features like it the next time you read a science text?',
        a: 'The diagram helped most because I could see the hidden ice. Next time, I will look at diagrams first to preview the main idea.', look: 'names a helpful feature and a plan for next time' }
    ]
  });

  P.add({
    id: 'g8-buxton', subject: 'history', form: 'Report',
    title: 'The Bell of Buxton',
    deck: 'In the 1850s, a settlement in Canada West rang its bell each time another freedom seeker arrived',
    hero: {
      photo: 'g8-buxton.jpg', credit: 'Photo: Ken Lund, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'The Buxton National Historic Site and Museum in South Buxton, Ontario, near Chatham.'
    },
    body: [
      'In the 1850s, a bell hung in the tower of a church in the woods near Chatham, Canada West. Whenever a freedom seeker who had escaped slavery in the United States arrived in the community, the bell was rung. People came out of their homes and fields to welcome the newcomer. The bell had been a gift from the Black citizens of Pittsburgh, and it became a symbol of <b>liberty</b>. It still hangs at Buxton today.',
      { h: 'A different kind of settlement' },
      'Buxton began in 1849 as the Elgin Settlement. Its founder was William King, a minister born in Ireland. While living in Louisiana, King had come to own enslaved people through his wife’s family. He freed them and travelled north with fifteen of them to Canada, where slavery had been abolished. There, he helped buy land for a settlement where Black families could own farms.',
      'Settlers bought 50-acre lots and paid for them over ten years. They cleared the forest, drained the swampy land and built houses that had to meet a standard: a certain size, set back from the road, with a fence and a garden. The rules were strict, but the goal was clear. King and the settlers wanted Buxton to prove that free Black families could build a prosperous community, at a time when many people claimed they could not.',
      { fig: timeline([[1834, 'slavery ends', 'in Canada'], [1849, 'Elgin Settlement', 'founded'], [1850, 'U.S. Fugitive', 'Slave Act'], [1865, 'slavery ends', 'in the U.S.']], 1828, 1872),
        tall: 128, cap: 'Key dates in the story of Buxton.' },
      { h: 'A school so good, everyone came' },
      'The Buxton Mission School taught Latin, Greek and mathematics as well as reading and writing. It was so good that white families nearby closed their own school and sent their children to Buxton instead. Students from Buxton went on to become teachers, doctors and leaders. By the 1860s, the settlement had grown to well over a thousand people, with a sawmill, a brickyard, a store and a hotel.',
      { box: 'After the war', text: 'When slavery ended in the United States in 1865, many Buxton families went south to find relatives or help newly freed people. Others stayed, and their <b>descendants</b> still live in the area.' },
      'Today, the Buxton National Historic Site and Museum tells the settlement’s story. Each Labour Day weekend, descendants gather for a homecoming that has continued for more than a century.'
    ],
    guide: { before: 'Review the Underground Railroad and find Chatham on a map. Teach <b>liberty</b> and <b>descendants</b>. Read the timeline first.',
      after: 'Why do you think the settlers kept ringing the bell for each newcomer? What does a symbol like that mean to a community?' },
    words: [['liberty', 'freedom'], ['descendants', 'children, grandchildren and later generations of a person']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the timeline, how many years after Buxton began did slavery end in the U.S.?',
        opts: ['16', '6', '31', '1'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: '“<b>They</b> cleared the forest.” <b>They</b> refers to …',
        opts: ['the settlers', 'the white families', 'the Black citizens of Pittsburgh', 'the teachers'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did King and the settlers want Buxton to be prosperous?',
        a: 'To prove that free Black families could build a successful community, at a time when many people claimed they could not.', look: 'the goal of proving a point against prejudice' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What did the bell mean to the people of Buxton? Why do you think it still hangs there?',
        a: 'It was a symbol of liberty and of welcome. It still hangs there to remember the freedom seekers and the community’s history.', look: 'the bell’s meaning and why it is kept' },
      { k: 'choice', code: 'B3.2', q: '“It was <b>so</b> good that white families sent their children to Buxton.” <b>So</b> …',
        opts: ['tells how good the school was', 'joins two names', 'names a place', 'shows a question'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The Buxton school welcomed both Black and white students. Why was this unusual for the 1850s? Why does it matter?',
        a: 'Many schools then were separated by race. Buxton showed that students could learn together, and its excellence challenged prejudice.', look: 'the unusual inclusion and its significance' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the history of Buxton in three sentences.',
        a: 'Buxton was founded in 1849 for Black families who had escaped slavery. Settlers built farms, homes and an excellent school. Many left after 1865, but descendants still gather there today.', look: 'founding, growth and later history, briefly' }
    ]
  });

  P.add({
    id: 'g8-cariboo', subject: 'history', form: 'Report',
    title: 'Gold in the Cariboo',
    deck: 'In 1862, a strike of gold in the mountains of British Columbia built a boom town, a road and a colony',
    hero: {
      photo: 'g8-barkerville.jpg', credit: 'Photo: Bubblenymph, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'The main street of Barkerville, British Columbia, now a historic town where visitors can see what life was like during the gold rush.'
    },
    body: [
      'In August 1862, an English sailor named Billy Barker dug a deep shaft beside Williams Creek, in the Cariboo Mountains of British Columbia. Other miners laughed at him for digging so far down. At about 15 metres, he struck gravel full of gold. Within months, thousands of people rushed to the creek. A town of wooden stores, hotels and saloons grew up almost overnight, and it was named after him: Barkerville.',
      { h: 'A rush for riches' },
      'Gold had already brought thousands of miners to the Fraser River in 1858. To keep order and to claim the land for Britain, the British government quickly made the mainland a new colony: British Columbia. When the Cariboo strike came, miners pushed farther north. Most never got rich. Food was so hard to bring in that prices soared: a single egg could cost a dollar, more than many workers elsewhere earned in half a day.',
      { h: 'Building the Cariboo Road' },
      'The colony’s governor, James Douglas, ordered a wagon road built from Yale, on the Fraser River, to the goldfields. Royal Engineers and hired crews blasted ledges into canyon walls and built bridges over rushing rivers. The Cariboo Road, about 600 kilometres long, was finished to Barkerville by 1865. Freight wagons, stagecoaches and even a herd of camels, which turned out to be a failure, carried supplies up the road.',
      { fig: '<path class="k" d="M40 150 Q60 120 90 110 Q130 96 150 70 Q170 40 230 30"/>' + [[40, 150, 'Yale', 'start'], [150, 70, 'roadhouses', 'end'], [230, 30, 'Barkerville', 'middle']].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="4"/>' + tx(p[0] + (p[3] === 'end' ? -8 : 8), p[1] + 4, 'n', p[2], p[3]); }).join('') + tx(200, 140, 'n', 'about 600 km of wagon road', 'middle'),
        tall: 160, cap: 'The Cariboo Road ran north from Yale to the goldfields (simplified).' },
      { box: 'Many peoples', text: 'Barkerville was home to miners from Britain, the United States, Europe and China. Its Chinese community was one of the largest in Canada, and Chinese merchants kept many miners supplied.' },
      { h: 'The cost to First Nations' },
      'The gold rush brought great <b>prosperity</b> to some and great harm to others. The road and the mines cut through the lands of the Secwépemc, Dakelh, Tsilhqot’in and other First Nations, without treaties or permission. In 1862, a smallpox <b>epidemic</b> spread through the region, and thousands of First Nations people died. In 1864, Tsilhqot’in warriors fought road builders who had entered their territory. In 2018, the Government of Canada <b>exonerated</b> the six Tsilhqot’in chiefs who had been hanged after the conflict, saying they had been defending their land.'
    ],
    guide: { before: 'Find Yale, the Fraser River and Barkerville on a map of British Columbia. Teach <b>prosperity</b>, <b>epidemic</b> and <b>exonerated</b>.',
      after: 'Was the gold rush good for British Columbia? Answer from two points of view.' },
    words: [['prosperity', 'wealth and success'], ['epidemic', 'a disease that spreads quickly to many people'], ['exonerated', 'officially declared not guilty']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the map, where did the Cariboo Road begin?',
        opts: ['Yale', 'Barkerville', 'Victoria', 'Vancouver'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did food cost so much in Barkerville?',
        opts: ['It was very hard to bring supplies in.', 'Miners ate too much.', 'Gold was cheap.', 'Food was taxed.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the cause-and-effect chart.', cols: ['Cause', 'Effect'],
        rows: [['the Fraser River gold rush of 1858', null], ['Billy Barker struck gold in 1862', null], [null, 'the Cariboo Road was built']],
        a: [[null, 'Britain made British Columbia a colony'], [null, 'thousands rushed to Williams Creek and Barkerville grew'], ['supplies were needed in the goldfields', null]] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How would a miner and a Tsilhqot’in person have seen the Cariboo Road differently?',
        a: 'A miner saw a way to reach the gold and get supplies. A Tsilhqot’in person saw strangers entering their land without permission and bringing harm.', look: 'two perspectives, each with a reason' },
      { k: 'choice', code: 'B2.1', q: 'In <b>ex</b>onerated, the prefix <b>ex-</b> means …',
        opts: ['out of or away from', 'again', 'not', 'before'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The writer ends with the chiefs being exonerated in 2018. Why might the writer end with this?',
        a: 'To show that the story is not over: Canada has recognized that the chiefs were defending their land, and history is being looked at again.', look: 'explains the effect of the ending' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What did you already know about gold rushes, such as the Klondike? How was the Cariboo rush similar?',
        a: 'I knew the Klondike rush brought crowds and high prices. The Cariboo was similar: a boom town grew quickly and most miners did not get rich.', look: 'prior knowledge and a similarity' }
    ]
  });

  P.add({
    id: 'g8-sod-house', subject: 'history', form: 'Letter (historical fiction)', plain: true,
    title: 'A House Made of Prairie',
    deck: 'A girl writes to her grandmother in Ukraine about her family’s first year on a homestead in 1898',
    hero: {
      photo: 'g8-sod-house.jpg', credit: 'Photo: Mpirie, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A rebuilt sod house at the Ukrainian Cultural Heritage Village, east of Edmonton, Alberta.'
    },
    body: [
      '<i>Near Edna, District of Alberta, November 20, 1898</i>',
      'Dear Baba,',
      'We have a house! Papa says I must tell you everything, so here it is. When we stepped off the train in Strathcona in May, there was nothing but grass, sky and wind. Papa paid ten dollars for our <b>homestead</b>, 160 acres of land. If we live on it for three years, break the land and build a house, it will be ours forever. In the old village, Papa could never have dreamed of so much land. The journey took almost a month: a train to the port, a ship across the ocean, then the long train across Canada.',
      'But there were no trees to build with, only a few thin poplars by the slough. So we built our house from the prairie itself. Papa ploughed long strips of <b>sod</b>, the thick top layer of soil held together by grass roots. Stepan and I cut them into bricks with a spade. We stacked them grass side down, like bricks, until the walls were thicker than my arm is long.',
      'The roof is poplar poles covered with more sod. Inside, Mama plastered the walls with clay and whitewashed them, so it is bright, like our house at home. The floor is earth. We have one window, which Papa carried all the way from Winnipeg wrapped in his coat.',
      'A sod house is warm in winter and cool in summer, because the earth walls are so thick. But when it rains hard, the roof drips mud for a whole day after the rain stops. Mice live in the walls, and once a garter snake fell onto the table at supper. Mama screamed louder than I did. Stepan laughed so hard that he fell off his stool.',
      { fig: '<path class="k" d="M40 150 V80 H260 V150 Z"/><path class="k" d="M30 80 L150 30 L270 80"/>' + [0, 1, 2, 3, 4].map(function (r) { return [0, 1, 2, 3, 4, 5, 6].map(function (c) { return '<rect class="t" x="' + (40 + c * 31.4 + (r % 2 ? 15 : 0)) + '" y="' + (80 + r * 14) + '" width="' + (r % 2 && c === 6 ? 16 : 31) + '" height="14"/>'; }).join(''); }).join('') + '<rect class="k" x="134" y="110" width="30" height="40"/><rect class="k" x="64" y="98" width="24" height="18"/>' +
          D.label(296, 20, 'roof: poles, sod and grass', 200, 50, 'end') + D.label(200, 168, 'sod bricks', 230, 140),
        tall: 172, cap: 'A sod house: walls of stacked sod bricks and a roof of poles covered with sod.' },
      'There are other Ukrainian families nearby, so we hear our own language at church. Mama planted a garden with the seeds you sewed into the hem of her coat. The poppies came up red, just like yours. When I see them, I am a little less <b>homesick</b>.',
      'Winter is coming now, and the wind blows snow across the prairie like smoke. Please write soon. Papa says that next year, maybe, there will be enough money for a ticket for you.',
      'Your loving granddaughter, Olena'
    ],
    guide: { before: 'Find Alberta on a map and the region east of Edmonton. Teach <b>homestead</b>, <b>sod</b> and <b>homesick</b>. Notice that this is a letter: point out the date line, greeting and closing.',
      after: 'If you moved to a new country, what one object would you want to bring from home, and why?' },
    words: [['homestead', 'land given to settlers who lived on it and farmed it'], ['sod', 'the top layer of soil held together by grass roots'], ['homesick', 'sad because you miss your home']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is a letter?',
        opts: ['a date line, greeting and closing', 'a glossary', 'headings', 'a list of steps'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, what was the roof made of?',
        opts: ['poles, sod and grass', 'shingles', 'stone', 'logs only'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did Olena’s family build a house of sod instead of wood?',
        a: 'There were no trees to build with on the prairie, only a few thin poplars, so they used the sod from the land itself.', look: 'lack of trees, with a detail' },
      { k: 'table', code: 'C3.3', q: 'Complete the chart about the sod house.', cols: ['Good things', 'Problems'],
        rows: [['warm in winter', null], [null, 'mice live in the walls'], ['bright, whitewashed walls', null]],
        a: [[null, 'the roof drips mud after rain'], ['cool in summer', null], [null, 'a snake fell onto the table']] },
      { k: 'lines', code: 'C1.5', n: 3, q: 'What do the poppies from Baba’s seeds symbolize for Olena?',
        a: 'They stand for home and her grandmother. Seeing them makes her feel connected to Ukraine, so she is less homesick.', look: 'symbolic meaning linked to homesickness' },
      { k: 'choice', code: 'B3.3', q: 'Why is there a comma after “Dear Baba”?',
        opts: ['It follows the greeting of a letter.', 'It ends the letter.', 'It separates a list.', 'It shows a question.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two ways Olena’s family keeps their Ukrainian culture in their new home.',
        a: 'They hear their own language at church with other Ukrainian families, and Mama planted a garden with seeds from Ukraine.', look: 'two cultural connections from the letter' }
    ]
  });

  P.add({
    id: 'g8-telephone', subject: 'tech', form: 'Report',
    title: 'The Voice on the Wire',
    deck: 'The idea for the telephone came to a young teacher in Brantford, Ontario. Turning it into a working machine took two more years.',
    hero: {
      photo: 'g8-bell.jpg', credit: 'Photo: 1892, Library of Congress, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'Alexander Graham Bell speaks into a telephone at the opening of the line between New York and Chicago in 1892.'
    },
    body: [
      'In the summer of 1874, a young Scottish-born teacher sat thinking on the bluff above the Grand River, near his parents’ home in Brantford, Ontario. Alexander Graham Bell taught deaf students to speak, and he knew a great deal about how sound works. That summer, he worked out an idea: if sound could make a current of electricity rise and fall in the same pattern, then a voice could travel along a wire.',
      { fig: flow(['voice makes the air vibrate', 'a diaphragm vibrates', 'the electric current changes', 'the current travels along the wire', 'a second diaphragm makes sound']),
        tall: 190, cap: 'How an early telephone carried a voice (simplified).' },
      { h: 'Sound into electricity' },
      'Sound is a <b>vibration</b>. When you speak, your voice makes the air vibrate in waves. In Bell’s telephone, these waves struck a thin sheet called a diaphragm and made it vibrate too. The moving diaphragm changed an electric current flowing through the circuit, making it stronger and weaker in the same pattern as the voice. At the other end of the wire, the changing current made a second diaphragm vibrate, which recreated the sound.',
      { box: 'A race to the patent office', text: 'On the very day Bell’s lawyer filed his <b>patent</b>, another American inventor filed papers for a similar idea. Lawsuits over who really invented the telephone first went on for many years.' },
      { h: '“Come here”' },
      'Bell and his assistant, Thomas Watson, worked for months in Boston. On March 10, 1876, Bell spoke into his transmitter: “Mr. Watson, come here. I want to see you.” Watson, in another room, heard the words clearly through the receiver. It was the first time a sentence had been sent by telephone.',
      { h: 'Back to Brantford' },
      'That August, Bell made one of the first long-distance calls in the world, from Brantford to the town of Paris, Ontario, about 13 kilometres away, over telegraph wire. Within a few years, telephone companies were stringing wires on poles across North America. Bell remained proud of his work with deaf people all his life. He later said he wanted to be remembered as a teacher of the deaf more than as the inventor of the telephone.'
    ],
    guide: { before: 'Make a cup-and-string phone and feel the string vibrate. Teach <b>vibration</b> and <b>patent</b>. Follow the flow chart from top to bottom.',
      after: 'Bell got his idea in Brantford but built the phone in Boston. Which place do you think should get the credit? Why?' },
    words: [['vibration', 'a quick back-and-forth movement'], ['patent', 'a legal right that says only the inventor can make or sell an invention for a time']],
    qs: [
      { k: 'order', code: 'C3.3', q: 'Number the steps in how an early telephone carried a voice.',
        items: ['A voice makes the air vibrate.', 'A diaphragm vibrates.', 'The electric current changes.', 'The current travels along the wire.', 'A second diaphragm makes sound.'], show: [2, 4, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the flow chart, what turns the electric signal back into sound?',
        opts: ['a second diaphragm', 'the wire', 'the voice', 'the air'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why are Bell’s words to Watson in quotation marks?',
        opts: ['They are his exact words.', 'They are a title.', 'They are a new term.', 'They are a list.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How did Bell’s work as a teacher of the deaf help him invent the telephone?',
        a: 'Teaching deaf students to speak meant he knew a great deal about how sound and vibration work, which he needed to send a voice along a wire.', look: 'links his knowledge of sound to the invention' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Read the box. Why might the other inventor’s supporters say the telephone was not only Bell’s invention?',
        a: 'The other inventor filed papers for a similar idea on the same day, so his supporters could say he had the idea at the same time and deserved credit too.', look: 'the rival claim from the box' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'Which part of the explanation of sound and electricity was hardest to follow? What did you do to understand it?',
        a: 'How the current matched the voice was hard. I used the flow chart and the cup-and-string idea to picture the vibrations.', look: 'names a hard part and a strategy' },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Bell wanted to be remembered as a teacher of the deaf. What does this tell you about him?',
        a: 'It shows he valued helping people more than being famous. His teaching mattered more to him than his most famous invention.', look: 'an inference about his values' }
    ]
  });

  P.add({
    id: 'g8-mobile-money', subject: 'geography', form: 'Report',
    title: 'A Bank in Your Pocket',
    deck: 'In Kenya, millions of people who never had a bank account now send money by text message',
    hero: {
      photo: 'g8-mpesa.jpg', credit: 'Photo: Fiona Graham, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A mobile-money agent’s shop in Nairobi, Kenya. Agents turn cash into digital money on a phone, and back again.'
    },
    body: [
      'Imagine you work in a city and want to send money to your family in a village 300 kilometres away. There is no bank in the village. In Kenya, not long ago, people sent cash with a bus driver or carried it home themselves, hoping it would not be lost or stolen. Today, they tap a few buttons on a phone, and the money arrives in seconds.',
      { h: 'Money by text message' },
      'In 2007, a Kenyan phone company launched a service called M-Pesa. (<i>Pesa</i> means money in Swahili.) It lets people store money on their phone and send it to anyone else by text message. To put money in or take it out, they visit an agent: a small shop, often selling phone credit or groceries, that trades cash for digital money. Each <b>transaction</b> costs a small fee. The service works even on simple phones without internet.',
      { fig: flow(['you give cash to an agent in the city', 'the agent adds it to your phone account', 'you text it to your mother’s phone', 'she cashes out at an agent in her village']),
        tall: 150, cap: 'Sending money home with mobile money.' },
      { h: 'Leapfrogging the banks' },
      'Banks are expensive to build in rural areas, so many Kenyans never had an account. But by the 2000s, many owned a mobile phone. Mobile money let them <b>leapfrog</b> the old system, jumping straight to a new technology without going through the stage before it. Today, most adults in Kenya use mobile money, and similar services have spread to dozens of countries.',
      { box: 'What the research found', text: 'A study published in 2016 estimated that mobile money helped about 2 percent of Kenyan households, roughly 194 000 families, rise out of extreme poverty. Households led by women benefited most.' },
      { h: 'Why it helps' },
      'Mobile money makes it safer and cheaper to save, and easier to get help in a crisis. When a harvest fails or someone is sick, relatives far away can send money within minutes. Some women started small businesses instead of farming, because they could buy supplies and get paid by phone. There are risks too: fees add up, especially for people who send small amounts often, scams spread by text, and people without a phone or signal can be left out. Still, mobile money is often described as one of the most important tools for <b>economic development</b> of the past twenty years.'
    ],
    guide: { before: 'Find Kenya and Nairobi on a map of Africa. Teach <b>transaction</b>, <b>leapfrog</b> and <b>economic development</b>. Follow the flow chart from top to bottom.',
      after: 'How do people in your family send or receive money? How is it like M-Pesa?' },
    words: [['transaction', 'one exchange of money, such as a payment or transfer'], ['leapfrog', 'to skip over a stage and jump ahead'], ['economic development', 'the growth of a country’s wealth, jobs and quality of life']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Number the steps for sending money home.',
        items: ['Give cash to an agent in the city.', 'The agent adds it to your phone account.', 'Text it to your mother’s phone.', 'She cashes out at an agent in her village.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did many Kenyans never have a bank account?',
        opts: ['Banks are costly to build in rural areas.', 'Kenyans did not use money.', 'Banks were illegal.', 'Phones were cheaper than accounts.'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is “(<i>Pesa</i> means money in Swahili.)” in brackets?',
        opts: ['It adds a helpful extra fact.', 'It is a quotation.', 'It is the title.', 'It is a question.'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'The writer says Kenya “leapfrogged” the banks. Explain this metaphor.',
        a: 'In leapfrog, you jump over someone. Kenya jumped over the stage of building banks everywhere and went straight to phone banking.', look: 'explains the comparison to the game' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Give two ways mobile money helps families, and one risk.',
        a: 'It makes saving safer and lets relatives send help quickly in a crisis. A risk is that scams spread by text.', look: 'two benefits and one risk from the text' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'How does the box make the writer’s argument stronger?',
        a: 'It gives evidence from a study with a number, about 194 000 families, so readers can trust that mobile money really helped.', look: 'research evidence supports the claim' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize what M-Pesa is and why it matters, in two sentences.',
        a: 'M-Pesa lets Kenyans store and send money by text message using agents for cash. It helped many people without banks save, get help and rise out of poverty.', look: 'what it is and its impact' }
    ]
  });

  P.add({
    id: 'g8-kakuma', subject: 'social', form: 'Feature article',
    title: 'School in a Refugee Camp',
    deck: 'In Kakuma, Kenya, more than 100 students may share one teacher. Some of them end up studying in Canada.',
    hero: {
      photo: 'g8-kakuma.jpg', credit: 'Photo: D. Willetts, CC BY-SA 3.0 IGO, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'Students in a classroom in Kakuma refugee camp, Kenya.'
    },
    body: [
      'The classroom has a tin roof, a chalkboard and more than a hundred students. Some sit three to a desk; others sit on the floor. It is hot, and there are only a few textbooks to share. Still, when the teacher asks a question, dozens of hands shoot up. For these students in Kakuma, a refugee camp in northwestern Kenya, school is a chance at a different future.',
      { fig: bars([[25, 'Ontario', 'class'], [60, 'Kakuma', 'average'], [120, 'Kakuma', 'large class']], { max: 140, step: 35 }) + tx(46, 12, 'n', 'students per teacher (approximate)'),
        tall: 172, cap: 'Approximate number of students per teacher (rounded).' },
      { h: 'Forced from home' },
      'A <b>refugee</b> is a person who has been forced to flee their country because of war, violence or persecution, and who cannot safely return. Kakuma opened in 1992 to shelter thousands of children and young people escaping war in Sudan. Today, it is home to more than 200 000 people from South Sudan, Somalia, the Democratic Republic of the Congo, Burundi and other countries. Some families have lived there for more than twenty years. Many children were born in the camp and have never seen the country their parents fled.',
      { box: 'From Kakuma to Canada', text: 'Since 1978, a program run by the World University Service of Canada has helped young refugees come to Canada to attend university, with student groups on Canadian campuses raising money to <b>sponsor</b> them. Many students have come from Kakuma.' },
      { h: 'Learning against the odds' },
      'Education is a human right, but in a camp it is hard to provide. There are not enough classrooms or trained teachers, and many teachers are refugees themselves. Girls are more likely than boys to leave school early, often to help at home. Lessons may be in English or Swahili, which may not be a student’s first language. Yet many students study by lamplight and dream of becoming doctors, engineers and teachers.',
      { h: 'A place to belong' },
      'Students who arrive in Canada through the program face new challenges: snow, a new school system and missing family far away. But they also bring <b>resilience</b> and a deep belief in the value of education. Many go on to work in health care, business and teaching. Some return to East Africa to help others, and a few have gone back to Kakuma as teachers.'
    ],
    guide: { before: 'This topic can raise strong feelings; allow time to talk. Teach <b>refugee</b>, <b>sponsor</b> and <b>resilience</b>. Find Kenya and South Sudan on a map.',
      after: 'If a student from Kakuma joined your class, what could you do to help them feel they belong?' },
    words: [['refugee', 'a person forced to flee their country who cannot safely return'], ['sponsor', 'to support someone, often with money and help'], ['resilience', 'the ability to recover and keep going after hard times']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, about how many students share one teacher in a large Kakuma class?',
        opts: ['120', '25', '60', '35'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why have many children in Kakuma never seen their parents’ country?',
        opts: ['They were born in the camp.', 'They are too young to travel.', 'The camp is far from Kenya.', 'Their country is in Canada.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Name three challenges students in Kakuma face at school.',
        a: 'Classes are very crowded, there are few textbooks and trained teachers, and lessons may not be in their first language.', look: 'three challenges from the text' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why are girls more likely to leave school early? What could help them stay?',
        a: 'They are often needed to help at home. Programs that support families, or safe schools close by, could help girls stay.', look: 'the reason and a reasonable solution' },
      { k: 'choice', code: 'B2.2', q: 'In “student groups … raising money to <b>sponsor</b> them,” <b>sponsor</b> means …',
        opts: ['support with money and help', 'compete against', 'teach a lesson', 'send away'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The article begins inside a crowded classroom instead of with facts about refugees. Why?',
        a: 'Starting with a vivid scene makes readers picture the students as real people, so they care before they learn the facts.', look: 'explains the effect of the opening' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'How is your school experience different from the one described in Kakuma? What does this make you think about?',
        a: 'My class has about 25 students and everyone has a desk. It makes me think about how lucky I am and how hard those students work.', look: 'a real comparison and a reflection' }
    ]
  });

  P.add({
    id: 'g8-hoop-dance', subject: 'arts', form: 'Explanation',
    title: 'Circles in Motion',
    deck: 'A hoop dancer can turn a handful of hoops into an eagle, a butterfly and the whole world',
    hero: {
      photo: 'g8-hoop-dance.jpg', credit: 'Photo: Smithsonian Institution, public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 200,
      cap: 'A dancer performs with hoops at a powwow. The hoops are linked and moved to form shapes.'
    },
    body: [
      'The drum begins, and a dancer steps into the centre of the circle holding a single hoop. Within minutes, there are five, ten, twenty hoops, spinning around arms and legs, locking together and opening apart. Suddenly the hoops form wings, and the dancer becomes an eagle. A moment later, they become a globe. The audience leans forward, because the shapes seem to appear out of nowhere.',
      { h: 'An art of many nations' },
      'The hoop dance is performed by many First Nations and Native American peoples across North America. Different nations and families tell different stories about where it began. Some describe it as a healing dance. In many teachings, the hoop is a circle with no beginning and no end, a symbol of the <b>cycle</b> of life: birth, growing, death and renewal. Because the meanings belong to the communities who carry them, dancers often explain their own teachings to the audience.',
      { fig: '<circle class="k" cx="50" cy="70" r="26"/>' + tx(50, 120, 'n', 'one hoop', 'middle') +
          '<circle class="k" cx="130" cy="70" r="18"/><circle class="k" cx="160" cy="70" r="18"/><circle class="k" cx="145" cy="44" r="18"/>' + tx(150, 120, 'n', 'linked hoops', 'middle') +
          '<circle class="a" cx="250" cy="70" r="30"/><ellipse class="k" cx="250" cy="70" rx="12" ry="30"/><ellipse class="k" cx="250" cy="70" rx="30" ry="12"/>' + tx(250, 120, 'n', 'a globe', 'middle'),
        tall: 132, cap: 'Hoops can be linked to build larger shapes, such as a globe (simplified).' },
      { h: 'Skill and storytelling' },
      'A hoop dancer must keep perfect time with the drum while moving hoops faster than the eye can follow. Each shape tells part of a story. A dancer might show a flower opening, a snake crossing the ground, an eagle soaring, and finally the whole Earth, all in one dance. Judges in competitions look for <b>precision</b>, speed, creativity and how well the dancer stays on the beat. Many dancers train for years, and some begin as small children learning from relatives.',
      { box: 'Making the hoops', text: 'Traditional hoops were made of willow or other bendable wood. Many dancers today use plastic tubing wrapped with coloured tape, which is lighter and more durable.' },
      { h: 'A living tradition' },
      'Hoop dancing is performed at powwows, in schools and on stages around the world. Each year, dancers from across Canada and the United States travel to the World Championship Hoop Dance Contest in Phoenix, Arizona. Young dancers keep adding new moves and shapes, while honouring the teachings of their elders. In this way, the hoop dance shows how a tradition can stay strong by continuing to grow.'
    ],
    guide: { before: 'Talk about why a circle might be a symbol (it has no beginning or end). Teach <b>cycle</b> and <b>precision</b>. Look at how the hoops link in the diagram.',
      after: 'Find a video of a hoop dancer with a grown-up. Which shapes did you recognize?' },
    words: [['cycle', 'a series of events that repeats in the same order'], ['precision', 'being exact and accurate']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['how hoops link to build shapes', 'how to make a hoop', 'the steps of a dance', 'a powwow circle'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why do dancers often explain their own teachings?',
        opts: ['The meanings belong to their own communities.', 'The audience asks them to.', 'Judges require it.', 'There is only one meaning.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does the hoop symbolize in many teachings? Why does this fit its shape?',
        a: 'It stands for the cycle of life. A circle has no beginning or end, just as life goes on through birth, growing, death and renewal.', look: 'the symbol and why the circle fits' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The first paragraph uses vivid verbs such as <i>spinning</i>, <i>locking</i> and <i>leans</i>. What effect do they have?',
        a: 'They make the reader picture fast movement and feel the excitement, as if watching the dance.', look: 'explains the effect of the word choice' },
      { k: 'choice', code: 'B3.2', q: '“Dancers move hoops <b>faster</b> than the eye can follow.” <b>Faster</b> is …',
        opts: ['a comparative word', 'a noun', 'a past tense verb', 'a title'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why does the writer say “many First Nations and Native American peoples” instead of naming just one?',
        a: 'Because the hoop dance belongs to many peoples with different stories. Naming only one would leave others out and be inaccurate.', look: 'respect for many nations and accuracy' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'Do you know a dance, song or tradition that changes over time but keeps its meaning? How is it like the hoop dance?',
        a: 'My family’s holiday songs get new versions each year, but we still sing them together. Like the hoop dance, the tradition grows but stays meaningful.', look: 'a personal connection about tradition and change' }
    ]
  });

  P.add({
    id: 'g8-chemainus', subject: 'arts', form: 'Report',
    title: 'The Town That Painted Itself',
    deck: 'When its sawmill closed, a small town on Vancouver Island turned its walls into a history book',
    hero: {
      photo: 'g8-chemainus.jpg', credit: 'Photo: Blake Handley, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A street in Chemainus, British Columbia, with a large mural of a face painted on a building.'
    },
    body: [
      'For more than a century, the town of Chemainus, on the east coast of Vancouver Island, depended on its sawmill. In the early 1980s, the old mill closed, and hundreds of workers lost their jobs. Stores emptied. Many people worried that the town would simply fade away, like other mill towns across the province.',
      { h: 'An idea on the walls' },
      'A group of residents had an unusual idea. What if the town’s walls told the town’s story? In 1982, artists painted the first five large <b>murals</b> on the sides of buildings. They showed scenes from local history: loggers felling giant trees, the steam trains that hauled the logs, the ships in the harbour and the people who built the community. Visitors began to stop. Then they came on purpose, by the busload, to walk from one painted wall to the next.',
      { fig: '<rect class="k" x="20" y="30" width="260" height="110"/><path class="t" d="M20 120 H280"/><path class="k" d="M40 120 V60 L60 40 L80 60 V120"/><path class="k" d="M110 120 V80 H180 V120"/><circle class="k" cx="125" cy="124" r="6"/><circle class="k" cx="165" cy="124" r="6"/><path class="k" d="M200 120 Q240 90 270 120"/>' +
          D.label(60, 18, 'tall trees', 60, 44) + D.label(130, 18, 'steam train', 145, 78) + D.label(210, 18, 'harbour', 236, 104) + tx(150, 158, 'n', 'the wall becomes a scene from the past', 'middle'),
        tall: 164, cap: 'A mural turns a plain wall into a picture of local history (simplified).' },
      { h: 'A gallery without walls' },
      'Today, Chemainus has more than 40 murals, along with sculptures and a theatre. Footprints painted on the sidewalks lead visitors on a walking tour. Some murals honour the Stz’uminus and other Coast Salish peoples, on whose lands the town stands. Others remember the Chinese, Japanese and South Asian workers who helped build the town. Together they form a public history book that anyone can read for free.',
      { box: 'A new economy', text: 'The murals drew tourists, and tourists brought new businesses: cafés, shops, galleries and inns. The town’s <b>economy</b> shifted from cutting trees to welcoming visitors.' },
      { h: 'Art that belongs to everyone' },
      '<b>Public art</b> is art made for shared spaces, where anyone can see it. Unlike a painting in a gallery, it reaches people on their way to school, work or the grocery store. The Chemainus murals show how public art can do more than decorate. It can help a community remember its past, bring people together and even give a town a new future. Towns across Canada and around the world have since visited Chemainus to learn from its example.'
    ],
    guide: { before: 'Find Vancouver Island on a map. Teach <b>murals</b>, <b>economy</b> and <b>public art</b>. Talk about any murals in your own community.',
      after: 'If your community painted a mural about its history, what scene should it show? Why?' },
    words: [['murals', 'large paintings made directly on walls'], ['economy', 'the way a place makes and spends money'], ['public art', 'art made for shared spaces where anyone can see it']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show?',
        opts: ['scenes from the town’s past painted on a wall', 'a map of the town', 'how to mix paint', 'a sawmill'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did people worry the town would fade away?',
        opts: ['The sawmill closed and jobs were lost.', 'There were too many tourists.', 'The murals faded.', 'The harbour froze.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the cause-and-effect chart.', cols: ['Cause', 'Effect'],
        rows: [['the sawmill closed', null], ['artists painted murals', null], [null, 'new cafés, shops and inns opened']],
        a: [[null, 'hundreds lost their jobs and stores emptied'], [null, 'visitors began to come'], ['tourists came to see the murals', null]] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Whose stories do the murals include? Why is it important that they include more than the loggers?',
        a: 'They include Coast Salish peoples and Chinese, Japanese and South Asian workers. Including them tells a more complete and fair history of the town.', look: 'names groups and explains why inclusion matters' },
      { k: 'choice', code: 'B3.1', q: 'Which of these is a question the residents asked themselves?',
        opts: ['What if the town’s walls told the town’s story?', 'Stores emptied.', 'Visitors began to stop.', 'Then they came on purpose.'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'The writer calls the murals “a public history book.” What does this comparison mean?',
        a: 'Like a book, the murals tell the story of the past, but they are on walls where anyone can read them for free.', look: 'explains the comparison to a book' },
      { k: 'lines', code: 'A2.4', n: 3, q: 'Public art reaches people on their way to school or work. How is this different from art in a gallery, and why might it have a stronger effect?',
        a: 'Gallery art is seen only by people who choose to visit. Public art is seen by everyone every day, so it can shape how a whole community sees itself.', look: 'compares audiences and explains the effect' }
    ]
  });

  P.add({
    id: 'g8-food-labels', subject: 'health', form: 'Procedure',
    title: 'How to Read a Food Label',
    deck: 'The front of the box is advertising. The facts are on the back. Here is how to read them in five steps.',
    hero: {
      photo: 'g8-nutrition-label.jpg', credit: 'Image: Cindyy28, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The Nutrition Facts table on a bag of tortilla chips sold in Canada. Packaged foods must have one.'
    },
    body: [
      'The front of a cereal box might say <i>Made with whole grains!</i> or <i>Good source of energy!</i> in big, bright letters. Those words are chosen to sell the cereal. To find out what is really inside, turn the box over and find the Nutrition Facts table. Almost every packaged food in Canada must have one, and they all follow the same layout. Here is how to read it.',
      { fig: '<rect class="k" x="40" y="6" width="180" height="150"/><path class="k" d="M40 34 H220 M40 56 H220"/><path class="t" d="M40 80 H220 M40 100 H220 M40 120 H220 M40 140 H220"/>' +
          tx(48, 24, 'lb', 'Nutrition Facts') + tx(48, 48, 'n', 'Per 1 cup (30 g)') + tx(48, 72, 'lb', 'Calories 120') + tx(212, 72, 'n', '% DV', 'end') + tx(48, 94, 'n', 'Fat 2 g') + tx(212, 94, 'n', '3 %', 'end') + tx(48, 114, 'n', 'Sodium 200 mg') + tx(212, 114, 'n', '9 %', 'end') + tx(48, 134, 'n', 'Sugars 12 g') + tx(212, 134, 'lb', '12 %', 'end') + tx(48, 152, 'n', 'Fibre 4 g') + tx(212, 152, 'lb', '14 %', 'end') +
          D.label(228, 22, 'serving size', 180, 46) + D.label(228, 90, '% Daily', 214, 80) + tx(228, 104, 'l', 'Value'),
        tall: 162, cap: 'A simplified Nutrition Facts table for a cereal.' },
      { box: 'A new symbol', text: 'Since 2026, foods high in sodium, sugars or saturated fat must also show a black-and-white symbol with a magnifying glass on the front of the package.' },
      { h: 'Step 1: Check the serving size' },
      'At the top, the table tells you the <b>serving size</b>, such as 1 cup (30 g). Every number below is for that amount. If you eat two cups, double everything. Many people eat more than one serving without noticing, so this step matters. A small bag of chips may contain two or three servings.',
      { h: 'Step 2: Look at the calories' },
      'Calories measure how much energy the food gives you. Compare foods with the same serving size. Teenagers need plenty of energy to grow, but the calories should come mostly from foods that also give nutrients.',
      { h: 'Step 3: Use the % Daily Value' },
      'On the right is the <b>% Daily Value</b>, or % DV. It shows how much of a day’s worth of a nutrient is in one serving. Health Canada gives a simple rule: 5% or less is a little, and 15% or more is a lot.',
      { h: 'Step 4: Choose more of some, less of others' },
      'Aim for more fibre, calcium, iron and potassium. Aim for less sodium, sugars and saturated fat, which many Canadians eat too much of. Fibre helps digestion, calcium builds strong bones, and iron carries oxygen in the blood.',
      { h: 'Step 5: Read the ingredients' },
      'Ingredients are listed from the most to the least by weight. If sugar is one of the first ingredients, the food contains a lot of it. Sugar can hide under other names, such as glucose, syrup or honey. A short ingredient list of foods you recognize is usually a good sign.'
    ],
    guide: { before: 'Bring two cereal boxes to the table and find the Nutrition Facts tables. Teach <b>serving size</b> and <b>% Daily Value</b>. Read the sample table together.',
      after: 'Compare two snacks at home using the 5% and 15% rule. Which would you choose, and why?' },
    words: [['serving size', 'the amount of food that the nutrition numbers are based on'], ['% Daily Value', 'how much of a day’s worth of a nutrient is in one serving']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is a procedure?',
        opts: ['numbered steps in order', 'a story with characters', 'a rhyme', 'a letter greeting'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the sample table, which nutrient has the highest % DV?',
        opts: ['fibre', 'fat', 'sodium', 'sugars'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Use the 5% and 15% rule to complete the chart.', cols: ['% DV', 'A little or a lot?'],
        rows: [['3%', null], ['20%', null], ['5%', null]],
        a: [[null, 'a little'], [null, 'a lot'], [null, 'a little']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why does the writer say the front of the box is “advertising”? How is the back different?',
        a: 'The front uses words chosen to sell the food. The back gives facts in the same layout for every food, so you can compare honestly.', look: 'contrasts persuasion with facts' },
      { k: 'choice', code: 'B2.2', q: 'In “Sugar can <b>hide</b> under other names,” the writer means sugar …',
        opts: ['is listed with different words', 'is kept in a secret place', 'is invisible', 'is not in the food'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'If you eat two cups of the cereal in the diagram, how many grams of sugars do you eat? Explain how you know.',
        a: '24 grams. The table is for one cup, which has 12 g, so two cups has double: 24 g.', look: 'correct answer and use of the serving size' },
      { k: 'lines', code: 'C2.4', n: 3, q: 'While reading, did you look back at the diagram to check a step? Which one, and did it help?',
        a: 'Yes, for step 3. I found the % DV column in the diagram, which helped me see where the numbers are on a real label.', look: 'describes checking understanding with the diagram' }
    ]
  });

  P.add({
    id: 'g8-stress', subject: 'health', form: 'Advice column', plain: true,
    title: 'Ask the Counsellor: My Heart Races Before Tests',
    deck: 'A Grade 8 student asks for help with test stress. A school counsellor answers.',
    hero: {
      photo: 'g8-stress.jpg', credit: 'Photo: University of Illinois Library, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 180,
      cap: 'A student studying alone in a library. Some stress before a test is normal, and it can even help.'
    },
    body: [
      '<i>Dear Counsellor, before every test my heart pounds, my hands get sweaty and my mind goes blank, even when I studied. Last week I forgot answers I knew the night before. Is something wrong with me? — Blank in Brampton</i>',
      'Dear Blank,',
      'Nothing is wrong with you. What you are feeling is your body’s <b>stress response</b>, and almost everyone has it. It is an ancient alarm system. When your brain senses a threat, it signals your body to release hormones such as adrenaline. Your heart beats faster to send more blood to your muscles. You breathe quickly to take in more oxygen. Your muscles tighten, ready to move. This is sometimes called “fight or flight,” and it was very useful for our ancestors when the threat was a bear.',
      { fig: '<circle class="k" cx="150" cy="40" r="20"/><path class="k" d="M150 60 V120 M150 76 L118 104 M150 76 L182 104 M150 120 L128 156 M150 120 L172 156"/>' +
          D.label(178, 14, 'brain senses a threat', 166, 30) + D.label(200, 78, 'heart beats faster', 154, 82) + D.label(6, 70, 'breathing speeds up', 144, 72) + D.label(4, 130, 'muscles tighten', 136, 140) + D.label(206, 134, 'hands sweat', 182, 104),
        tall: 164, cap: 'Some of the changes in the stress response.' },
      'The trouble is that a test is not a bear. A little stress can help you focus, but too much makes it hard to think clearly and remember. The good news is that you can turn the alarm down. Here are four strategies that work for many students.',
      '<b>1. Breathe in a box.</b> Breathe in slowly for four counts, hold for four, breathe out for four and hold for four. Repeat a few times. Slow breathing tells your body the danger has passed.',
      '<b>2. Prepare in small pieces.</b> Studying a little each day for a week is calmer, and works better, than cramming the night before.',
      '<b>3. Look after your body.</b> Sleep, exercise and a good breakfast give your brain what it needs to <b>cope</b> with pressure.',
      '<b>4. Talk back to the worry.</b> Replace “I am going to fail” with “I studied, and I can do my best.”',
      { box: 'When to ask for more help', text: 'If worry stops you from sleeping, eating or enjoying things for weeks, talk to a parent, a teacher, a counsellor or a doctor. Help is available, and asking for it is a sign of strength.' },
      'Try one strategy before your next test, and let me know how it goes. — Ms. Okafor, School Counsellor'
    ],
    guide: { before: 'Talk about a time each of you felt nervous. Teach <b>stress response</b> and <b>cope</b>. Practise box breathing together before reading.',
      after: 'Which of the four strategies would help you most? Plan when you will try it.' },
    words: [['stress response', 'the body’s automatic reaction to a threat or pressure'], ['cope', 'to deal with something difficult successfully']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'How is this text organized?',
        opts: ['a letter asking for advice, then a reply', 'a story told in order', 'a list of facts', 'a poem'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, what happens to breathing?',
        opts: ['It speeds up.', 'It stops.', 'It slows down.', 'Nothing changes.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the counsellor say “a test is not a bear”?',
        a: 'The stress response evolved for real dangers like a bear. A test is not a physical danger, so the strong alarm does not help and can make it hard to think.', look: 'explains the contrast between real danger and a test' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Choose one strategy and explain how it calms the stress response.',
        a: 'Box breathing slows your breathing, which tells your body the danger has passed, so your heart and mind calm down.', look: 'a strategy and how it works' },
      { k: 'choice', code: 'B3.3', q: 'Why is the student’s letter in italics?',
        opts: ['to show it is a different writer’s words', 'because it is shouted', 'because it is a title', 'to show it is not important'], a: 0 },
      { k: 'lines', code: 'C1.6', n: 3, q: 'The column has two voices: the student and the counsellor. How do their voices sound different? Give an example of each.',
        a: 'The student sounds worried and unsure: “Is something wrong with me?” The counsellor sounds calm and confident: “Nothing is wrong with you.”', look: 'contrasts two voices with examples' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Describe a time you felt stressed, other than a test. Which strategy from the column could have helped?',
        a: 'Before a piano recital my hands shook. Box breathing could have helped me calm down before I played.', look: 'a personal example matched to a strategy' }
    ]
  });

  P.add({
    id: 'g8-sales-tax', subject: 'math', form: 'Explanation',
    title: 'What Will I Really Pay?',
    deck: 'The price tag says one thing. The receipt says another. Here is how discounts and tax change the total.',
    hero: {
      photo: 'g8-receipt.jpg', credit: 'Photo: Grandmaster Huon, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A grocery store receipt. In Canada, sales tax is usually added at the checkout.'
    },
    body: [
      'You find a hoodie you love. The tag says $80, and a sign says <i>25% off today!</i> You have $65 in your pocket. Is it enough? Many shoppers would guess yes, but they would be wrong. To find out, you need two kinds of <b>percent</b> calculation: one for the discount and one for the tax.',
      { fig: bars([[80, 'tag', 'price'], [60, 'after', '25% off'], [67.8, 'after', '13% HST']], { max: 90, step: 30, pre: '$' }),
        tall: 172, cap: 'How the price of the hoodie changes.' },
      { h: 'Taking off the discount' },
      'Percent means “out of 100.” A <b>discount</b> of 25% means you save 25 dollars for every 100 dollars of the price. To find 25% of $80, multiply: 0.25 × 80 = 20. You save $20, so the sale price is $80 − $20 = $60. You can also think of it this way: if you save 25%, you pay the other 75%. 0.75 × 80 = 60.',
      { h: 'Adding the tax' },
      'In most of Canada, the price on the tag does not include sales tax. It is added at the checkout. In Ontario, the Harmonized Sales Tax, or HST, is 13%. It combines a 5% federal tax and an 8% provincial tax. Thirteen percent of $60 is 0.13 × 60 = $7.80. So the total is $60 + $7.80 = $67.80. You are $2.80 short. You will need to wait for a bigger sale, or save a little more.',
      { h: 'Does the order matter?' },
      'Some people wonder whether a store should take off the discount first or add the tax first. Try both. Discount first: 0.75 × 80 = 60, then 1.13 × 60 = 67.80. Tax first: 1.13 × 80 = 90.40, then 0.75 × 90.40 = 67.80. The answer is the same, because multiplying in a different order gives the same product.',
      { box: 'Different provinces', text: 'Sales tax is not the same across Canada. In Alberta, shoppers pay only the 5% federal GST, so the same $60 hoodie would cost $63.' },
      'Knowing how to do these calculations helps you make smart choices. Before you reach the checkout, multiply by 1.13 in Ontario to estimate the real cost, and you will never be surprised by the total. A quick estimate: 13% is a little more than one tenth, so add about a tenth of the price, plus a bit.'
    ],
    guide: { before: 'Review changing a percent to a decimal (25% = 0.25). Teach <b>percent</b> and <b>discount</b>. Do the hoodie calculation together with a calculator.',
      after: 'Find a flyer or a website with a sale. Pick an item and work out the real price after tax.' },
    words: [['percent', 'out of 100'], ['discount', 'an amount taken off the regular price']],
    qs: [
      { k: 'table', code: 'C3.3', q: 'Complete the chart for an item with a $40 tag price in Ontario.', cols: ['Step', 'Amount'],
        rows: [['25% discount', null], ['sale price', null], ['13% HST on the sale price', null], ['total', null]],
        a: [[null, '$10'], [null, '$30'], [null, '$3.90'], [null, '$33.90']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, what is the final price of the hoodie?',
        opts: ['$67.80', '$60', '$80', '$90.40'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is the hoodie cheaper in Alberta?',
        opts: ['Alberta has only the 5% GST.', 'Alberta has bigger discounts.', 'Hoodies are made there.', 'There is no tax at all.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why taking off the discount first or adding the tax first gives the same total.',
        a: 'Both ways multiply 80 by 0.75 and by 1.13. Multiplying in a different order gives the same product, so both give $67.80.', look: 'uses the order of multiplication' },
      { k: 'choice', code: 'B2.1', q: 'The word <b>percent</b> comes from Latin <i>per centum</i>. What does <i>centum</i> mean?',
        opts: ['one hundred', 'one thousand', 'money', 'part'], a: 0 },
      { k: 'lines', code: 'C1.3', n: 3, q: 'How does the writer use the hoodie example to organize the whole text?',
        a: 'The text starts with a problem (is $65 enough?), then works through each step with the hoodie, and gives the answer: you are $2.80 short.', look: 'problem, steps and solution structure' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'Who might find this text useful, and why? Name two different readers.',
        a: 'A student shopping for clothes could check if they have enough money. A new Canadian might want to learn why prices go up at the checkout.', look: 'two readers with reasons' }
    ]
  });

  P.add({
    id: 'g8-passwords', subject: 'tech', form: 'Explanation',
    title: 'Why Long Beats Clever',
    deck: 'The math behind a strong password, and why a long passphrase often wins',
    hero: {
      photo: 'g8-padlock.jpg', credit: 'Photo: Trougnouf, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 180,
      cap: 'A padlock and its keys. A password is the lock on your online accounts.'
    },
    body: [
      'Every day, criminals use computer programs that try to break into accounts by guessing passwords, millions or even billions of guesses every second. A strong password is one that would take such a program so long to guess that it is not worth trying. Math can tell us what makes one password stronger than another.',
      { h: 'Counting the possibilities' },
      'A bike lock with four dials, each numbered 0 to 9, has 10 × 10 × 10 × 10 = 10 000 possible codes. A computer could try them all in a fraction of a second. Now think of a password made of 8 lowercase letters. Each position has 26 possibilities, so there are 26 multiplied by itself 8 times, about 209 billion possible passwords. That sounds like a lot, but a fast computer could try them all in minutes.',
      { fig: bars([[4, '4-digit', 'code'], [11, '8 small', 'letters'], [16, '8 mixed', 'characters'], [19, '5 random', 'words']], { max: 24, step: 8 }) + tx(46, 12, 'n', 'possibilities: about 10 to the power of …'),
        tall: 172, cap: 'The bigger the power of 10, the more possibilities. Each step of 1 means 10 times more (approximate).' },
      { h: 'Length matters most' },
      'Every extra character multiplies the number of possibilities. Adding capital letters, numbers and symbols helps too, because each position then has about 95 choices instead of 26. But people often make passwords “clever” in predictable ways, like <i>Password1!</i> or swapping <i>a</i> for <i>@</i>. Guessing programs know these tricks. A better idea is a <b>passphrase</b>: five or more unrelated words chosen at random, such as <i>tulip–canoe–orbit–pickle</i>. It is long, hard to guess and easy to remember.',
      { box: 'Two locks are better than one', text: '<b>Two-step verification</b> asks for a second proof, such as a code sent to your phone. Even if someone steals your password, they cannot get in without it.' },
      { h: 'Habits that protect you' },
      'Use a different password for every important account, so that one leak does not unlock them all. Never share passwords with friends, even close ones. Be suspicious of messages that ask you to “confirm your password” by clicking a link: this trick, called phishing, is one of the most common ways accounts are stolen. A password manager, an app that remembers strong passwords for you, can make all of this easier. Ask a grown-up to help you set one up.'
    ],
    guide: { before: 'Count the codes on a bike lock together. Teach <b>passphrase</b> and <b>two-step verification</b>. Explain powers of 10: 10 to the power of 4 is 10 000.',
      after: 'Make up a five-word passphrase you would remember (do not use it for a real account). Why is it hard to guess?' },
    words: [['passphrase', 'a password made of several random words'], ['two-step verification', 'a second proof of who you are, as well as a password']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, which has the most possibilities?',
        opts: ['5 random words', '8 mixed characters', '8 small letters', 'a 4-digit code'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why is <i>Password1!</i> a weak password?',
        opts: ['Guessing programs know such tricks.', 'It is too long.', 'It has no letters.', 'It uses a symbol.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how the bike lock has 10 000 possible codes.',
        a: 'Each of the four dials has 10 choices, so there are 10 × 10 × 10 × 10 = 10 000 combinations.', look: 'multiplies the choices for each dial' },
      { k: 'lines', code: 'A2.2', n: 3, q: 'Name three habits from the text that protect your accounts. Explain one.',
        a: 'Use a different password for each account, never share passwords, and use two-step verification. Different passwords mean one leak does not unlock everything.', look: 'three habits and one explained' },
      { k: 'choice', code: 'B3.3', q: '“This trick, called phishing, is one of the most common ways accounts are stolen.” The commas around <b>called phishing</b> …',
        opts: ['set off extra information about the trick', 'separate items in a list', 'introduce a quotation', 'join two sentences'], a: 0 },
      { k: 'lines', code: 'A2.1', n: 3, q: 'Why is sharing a password with a close friend still a risk?',
        a: 'Friendships can change, and the friend might accidentally share it or log in somewhere unsafe. You lose control over who can get into your account.', look: 'a reasonable risk explained' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Before reading, what did you think made a password strong? How has your thinking changed?',
        a: 'I thought symbols made it strong. Now I know length matters most, and a long passphrase can be stronger and easier to remember.', look: 'describes a change in thinking based on the text' }
    ]
  });

  P.add({
    id: 'g8-understudy', subject: 'story', form: 'Play script', plain: true,
    title: 'The Understudy',
    deck: 'Ten minutes before the curtain rises, the lead actor cannot go on. A short play in one scene.',
    hero: {
      photo: 'g8-theatre.jpg', credit: 'Photo: Harrison Keely, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 170,
      cap: 'Two actors rehearse a scene from a play.'
    },
    body: [
      '<b>CHARACTERS:</b> PRIYA, 13, the <b>understudy</b>. MARCUS, 13, the lead actor. MS. DUBÉ, the drama teacher.',
      '<i>(Backstage at a school theatre. Ten minutes to <b>curtain</b>. PRIYA sits on a box, mouthing lines from a script. MARCUS paces, holding his stomach.)</i>',
      '<b>MARCUS:</b> I can’t do it. I really can’t. Not tonight.',
      '<b>PRIYA:</b> <i>(not looking up)</i> You say that every night. And every night you go out there and the audience loves you.',
      '<b>MARCUS:</b> No, I mean it. I think I’m going to be sick. Actually sick. My head is pounding.',
      '<b>PRIYA:</b> <i>(looks up, alarmed)</i> Marcus. Sit down. Breathe.',
      '<i>(MS. DUBÉ hurries in, carrying a clipboard.)</i>',
      '<b>MS. DUBÉ:</b> Marcus, you’re green. <i>(She feels his forehead.)</i> You have a fever. You’re going home. <i>(She turns to PRIYA.)</i> Priya, you’re on.',
      '<b>PRIYA:</b> Me? But I’ve only rehearsed with the cast twice. I don’t know where to stand in Act Two. I don’t —',
      '<b>MS. DUBÉ:</b> Priya, look at me. You know every line. I’ve heard you saying them in the hallway for six weeks. <i>(She hands PRIYA a costume.)</i> Seven minutes.',
      '<i>(MS. DUBÉ leads MARCUS off. PRIYA stands alone, holding the costume. MARCUS pauses at the door.)</i>',
      '<b>MARCUS:</b> Priya. In Act Two, when the lights go blue, walk to the tape mark in the centre and wait for the music. That’s it. That’s the whole secret.',
      '<b>PRIYA:</b> What if I freeze? What if I open my mouth and nothing comes out?',
      '<b>MARCUS:</b> Then freeze in the middle of the stage. The audience will think it’s acting. <i>(He grins weakly.)</i> And don’t look at the front row. My little brother makes faces. You’re better than me, you know. Everybody knows it.',
      { fig: '<rect class="k" x="20" y="20" width="260" height="110"/><path class="d" d="M20 130 H280"/>' + tx(150, 150, 'n', 'audience', 'middle') + tx(150, 14, 'n', 'back of stage', 'middle') +
          '<rect class="h" x="30" y="30" width="50" height="90"/>' + tx(55, 80, 'n', 'wings', 'middle') + '<circle class="a" cx="160" cy="96" r="8"/>' + D.label(196, 60, 'centre stage', 166, 92) + D.arrow(84, 96, 148, 96, 'a'),
        tall: 156, cap: 'A stage seen from above. Priya waits in the wings, then walks to centre stage.' },
      '<i>(He exits. PRIYA looks at the costume, then at the curtain. The sound of the audience grows louder. She takes a slow breath, steps forward and pulls on the costume jacket.)</i>',
      '<b>PRIYA:</b> <i>(quietly, to herself)</i> Blue lights. Tape mark. Wait for the music.',
      '<i>(The house lights dim. A single spotlight finds her. She lifts her chin.)</i>',
      '<i>(Blackout.)</i>'
    ],
    guide: { before: 'Explain that a script has character names, lines and stage directions. Teach <b>understudy</b> and <b>curtain</b>, and the stage words in the diagram: wings, centre stage. Read it aloud together, taking parts.',
      after: 'Write the next scene: what happens when Priya walks on stage? Remember to include stage directions.' },
    words: [['understudy', 'an actor who learns a part in order to replace the lead if needed'], ['curtain', 'the start of a performance, when the stage curtain opens']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'In a play script, what do the words in italics and brackets show?',
        opts: ['stage directions: actions and setting', 'the characters’ thoughts', 'words to shout', 'the title'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the diagram, where does Priya wait before she goes on?',
        opts: ['in the wings', 'centre stage', 'in the audience', 'behind the curtain at the back'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How do we know Priya is better prepared than she thinks? Give two clues.',
        a: 'Ms. Dubé says Priya knows every line and has been saying them in the hallway for six weeks. Marcus says everybody knows she is better than him.', look: 'two clues from the dialogue' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'A play has no narrator. How do we learn what Priya is feeling at the end?',
        a: 'Through stage directions and her actions: she takes a slow breath, speaks quietly to herself and lifts her chin, which shows she is nervous but brave.', look: 'stage directions and actions reveal feelings' },
      { k: 'choice', code: 'B3.3', q: 'Why does Priya’s line “I don’t —” end with a dash?',
        opts: ['She is interrupted or stops mid-sentence.', 'It is a list.', 'It is a question.', 'It is the end of the play.'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'What is the theme of the play? Use the ending to support your answer.',
        a: 'Being ready matters more than feeling ready. Priya is scared, but she steps forward and lifts her chin, because she has prepared.', look: 'a theme stated as an idea, linked to the ending' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Predict what happens when the spotlight finds Priya. Use clues from the script.',
        a: 'She will remember Marcus’s advice and perform well, because she knows every line and she lifts her chin with confidence.', look: 'a prediction supported by clues' }
    ]
  });

  P.add({
    id: 'g8-aurora', subject: 'story', form: 'Poem',
    title: 'Night Shift, Yellowknife',
    deck: 'A poem about watching the northern lights on a winter night',
    hero: {
      photo: 'g8-aurora.jpg', credit: 'Photo: TravelingOtter, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'The northern lights, or aurora borealis, over Yellowknife, Northwest Territories.'
    },
    body: [
      '<b>I.</b> Minus thirty-eight, and the snow<br>creaks under our boots like an old floor.<br>My breath hangs in the air, a small ghost<br>that will not follow me home.',
      '<b>II.</b> Dad says, <i>Wait.</i><br>We have been waiting an hour.<br>The sky is a black lake, still,<br>and the stars are fish asleep in it.',
      '<b>III.</b> Then, low over the trees, a green thread<br>pulls loose from nowhere.<br>It ripples, unravels, becomes a ribbon,<br>becomes a river poured across the dark.',
      { fig: '<path class="k" d="M10 150 Q60 140 80 150 Q120 130 150 150 Q190 136 220 150 Q260 140 290 150"/><path class="a" d="M20 110 Q60 60 110 90 Q160 120 200 60 Q240 20 280 50"/><path class="t" d="M30 100 Q70 50 120 80 Q170 110 210 50 Q250 14 280 36"/>' +
          D.label(4, 36, 'curtain of light', 70, 72) + D.label(200, 120, 'treeline', 220, 146),
        tall: 160, cap: 'The aurora often moves like a curtain or ribbon above the horizon.' },
      '<b>IV.</b> It folds like laundry on a windy line.<br>It dances, then forgets it is dancing<br>and simply <b>shimmers</b>, pink at the hem,<br>as if the sky were blushing.',
      '<b>V.</b> Grandma told Dad, when he was small,<br>never to whistle at the lights,<br>or they might swoop down for a closer look.<br>He still does not whistle. Neither do I.',
      '<b>VI.</b> In science class I learned the cause:<br>tiny particles from the Sun<br>crash into the air a hundred kilometres up<br>and make it glow.',
      '<b>VII.</b> I know that. I believe that.<br>But tonight, standing on the frozen lake,<br>my eyelashes stiff with frost,<br>it feels like the sky is breathing.',
      '<b>VIII.</b> Somewhere a dog barks, once,<br>and the sound travels for kilometres<br>across the ice, as if the whole lake<br>were listening with us.',
      '<b>IX.</b> Dad does not say anything.<br>Neither do I.<br>Some things are too big for words,<br>so we just stand there, <b>awestruck</b>, and watch<br>until our toes go numb and the green fades to grey.',
      { box: 'What is an aurora?', text: 'Auroras happen when charged particles from the Sun are pulled toward Earth’s magnetic poles. When they strike gases high in the atmosphere, the gases give off light. Oxygen glows green or red, and nitrogen can glow blue or purple. Yellowknife, in the Northwest Territories, is one of the best places in the world to see them, and visitors travel from around the world each winter for the chance.' }
    ],
    guide: { before: 'Look at the photo together and describe the colours and shapes. Teach <b>shimmers</b> and <b>awestruck</b>. Read the poem aloud slowly, pausing at each line break.',
      after: 'Write three lines about something in nature that made you feel awestruck. Use one comparison.' },
    words: [['shimmers', 'shines with a soft, wavering light'], ['awestruck', 'filled with wonder and amazement']],
    qs: [
      { k: 'choice', code: 'C1.5', half: true, q: '“My breath hangs in the air, a small ghost.” This is an example of …',
        opts: ['a metaphor', 'a fact', 'a rhyme', 'a question'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'What does the diagram show about the aurora?',
        opts: ['It moves like a curtain above the trees.', 'It touches the ground.', 'It is shaped like a circle.', 'It is below the trees.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Find one simile in stanza IV and explain what it helps you picture.',
        a: '“It folds like laundry on a windy line.” It helps me picture the light flapping and folding in waves, the way sheets move in the wind.', look: 'a simile from stanza IV and its picture' },
      { k: 'lines', code: 'C3.1', n: 3, q: 'In stanza VII, the speaker says, “I know that. I believe that. But …” What idea is the poet exploring?',
        a: 'That you can understand the science of something and still feel amazed by it. Knowing the cause does not take away the wonder.', look: 'science and wonder can exist together' },
      { k: 'choice', code: 'B2.2', q: 'In stanza IV, “pink at the <b>hem</b>” means pink …',
        opts: ['at the bottom edge', 'in the middle', 'at the top', 'all over'], a: 0 },
      { k: 'lines', code: 'C1.2', n: 3, q: 'How is this poem different from the box, even though both explain the aurora?',
        a: 'The box gives scientific facts in plain sentences. The poem uses comparisons, feelings and line breaks to show what it is like to see the aurora.', look: 'contrasts the purposes and features of the two forms' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Did reading the poem aloud, or slowly, help you understand it? Explain, and name one thing you will do the next time you read a poem.',
        a: 'Reading slowly helped me notice the comparisons. Next time I will read the poem twice: once for the story and once for the images.', look: 'reflects on a strategy and sets a goal' }
    ]
  });

  P.add({
    id: 'g8-yeast', subject: 'science', form: 'Lab report',
    title: 'Can Yeast Blow Up a Balloon?',
    deck: 'A Grade 8 student tests how temperature affects living yeast cells',
    hero: {
      photo: 'g8-bread-dough.jpg', credit: 'Photo: Ruth Hartnup, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 180,
      cap: 'Bread dough rises because yeast cells inside it release a gas.'
    },
    body: [
      '<b>Background.</b> Yeast is a tiny living thing made of a single <b>cell</b>. It is a kind of fungus, and a spoonful of baker’s yeast holds billions of cells. When yeast cells have sugar, water and warmth, they break the sugar down for energy. This process, called <b>fermentation</b>, releases carbon dioxide gas. In bread dough, the bubbles of gas get trapped, and the dough rises.',
      '<b>Question.</b> How does the temperature of the water affect how much gas the yeast makes?',
      '<b>Hypothesis.</b> I predicted that warm water would make the most gas, because yeast is alive and many living things work best when they are warm but not hot.',
      '<b>Materials.</b> Three identical plastic bottles, three balloons, three packets of yeast (7 g each), sugar, measuring cups, cold water (about 5 °C), warm water (about 35 °C), hot water (about 70 °C) and a measuring tape.',
      '<b>Method.</b> I put one packet of yeast and one tablespoon of sugar into each bottle. I added 250 mL of cold water to the first bottle, warm water to the second and hot water to the third. I quickly stretched a balloon over each bottle’s mouth. After 30 minutes, I measured the distance around the widest part of each balloon. To make it a fair test, I changed only one <b>variable</b>, the water temperature, and kept everything else the same.',
      { fig: [[60, 'cold', 0], [150, 'warm', 1], [240, 'hot', 2]].map(function (b) { var r = [8, 30, 5][b[2]]; return '<rect class="k" x="' + (b[0] - 20) + '" y="96" width="40" height="56" rx="6"/><path class="k" d="M' + (b[0] - 8) + ' 96 V86 M' + (b[0] + 8) + ' 96 V86"/><circle class="' + (b[2] === 1 ? 'a' : 'k') + '" cx="' + b[0] + '" cy="' + (84 - r) + '" r="' + r + '"/>' + tx(b[0], 168, 'n', b[1] + ' water', 'middle'); }).join(''),
        tall: 172, cap: 'The three balloons after 30 minutes (sketch).' },
      '<b>Results.</b> The balloon on the cold-water bottle had barely started to fill, at 6 cm around. The balloon on the warm-water bottle was the biggest, at 58 cm around. The balloon on the hot-water bottle was almost flat, at 3 cm around.',
      '<b>Conclusion.</b> My hypothesis was supported. Warm water produced by far the most carbon dioxide. Cold water slowed the yeast down. The hot water probably killed most of the yeast cells, because their parts are damaged by high heat. This is why bread recipes say to use warm water, not hot. Next, I would like to test whether more sugar makes more gas, and repeat each test three times to check that my results are reliable.'
    ],
    guide: { before: 'If you can, do the experiment together before reading. Teach <b>cell</b>, <b>fermentation</b> and <b>variable</b>. Notice the headings of a lab report.',
      after: 'Design your own fair test with yeast. What one variable would you change?' },
    words: [['cell', 'the smallest unit of a living thing'], ['fermentation', 'when yeast or bacteria break down sugar and release gas'], ['variable', 'a thing that can change in an experiment']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which section of a lab report gives the prediction?',
        opts: ['Hypothesis', 'Materials', 'Results', 'Method'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the sketch, which bottle made the most gas?',
        opts: ['warm water', 'cold water', 'hot water', 'all the same'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Complete the results chart.', cols: ['Water', 'Balloon size after 30 minutes'],
        rows: [['cold (about 5 °C)', null], ['warm (about 35 °C)', null], ['hot (about 70 °C)', null]],
        a: [[null, '6 cm around'], [null, '58 cm around'], [null, '3 cm around']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did the hot-water balloon barely fill?',
        a: 'The hot water probably killed most of the yeast cells, so they could not ferment the sugar and make gas.', look: 'heat damaged or killed the yeast' },
      { k: 'choice', code: 'B3.2', q: '“I <b>quickly</b> stretched a balloon over each bottle’s mouth.” <b>Quickly</b> is …',
        opts: ['an adverb', 'a verb', 'a noun', 'an adjective'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What made this a fair test? Name the one variable that changed and two things that stayed the same.',
        a: 'Only the water temperature changed. The amount of yeast and sugar, and the amount of water, stayed the same.', look: 'the changed variable and two controlled ones' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the experiment and what it showed, in two sentences.',
        a: 'The student mixed yeast and sugar with cold, warm and hot water and measured balloons. Warm water made the most gas, showing yeast works best when warm but not hot.', look: 'method and result, briefly' }
    ]
  });

  P.add({
    id: 'g8-polls', subject: 'math', form: 'Explanation',
    title: 'The Poll That Got It Wrong',
    deck: 'In 1936, a magazine asked over two million people how they would vote, and still predicted the wrong winner',
    hero: {
      photo: 'g8-ballot-box.jpg', credit: 'Photo: W.carter, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 180,
      cap: 'A ballot box at a polling station in Sweden. Polls try to predict what voters will decide before the votes are counted.'
    },
    body: [
      'In 1936, Americans were choosing a president: Franklin Roosevelt or Alf Landon. A popular magazine, the <i>Literary Digest</i>, mailed out about ten million questionnaires and got back more than two million answers. Its prediction was confident: Landon would win easily. On election day, Roosevelt won in one of the biggest landslides in American history.',
      { fig: bars([[57, 'Digest', 'predicted'], [37, 'actual', 'result']], { max: 70, step: 35, unit: '%' }) + tx(46, 12, 'n', 'Landon’s share of the vote (rounded)'),
        tall: 172, cap: 'The Literary Digest predicted Landon would win most of the vote. He won far less.' },
      { box: '19 times out of 20', text: 'Canadian news reports often say a poll is “accurate within 3 percentage points, 19 times out of 20.” This means that if the poll were repeated many times, about 95% of the results would land within 3 points of the true value.' },
      { h: 'Samples and populations' },
      'A poll cannot ask everyone, so it asks a <b>sample</b>, a smaller group chosen from the whole <b>population</b>. The idea is that if the sample is like the population, its answers will be like the population’s answers. The <i>Literary Digest</i> sample was huge. But it was not like the population.',
      { h: 'What went wrong' },
      'The magazine got its list of names mainly from telephone directories, car registrations and its own subscribers. In 1936, during the Great Depression, many people could not afford a telephone or a car. The people on the list were wealthier than average, and many wealthier voters favoured Landon. On top of that, only about a quarter of the people mailed a questionnaire sent it back, and those who did were more likely to be unhappy with the president. The sample was <b>biased</b>: it leaned toward one kind of person.',
      { h: 'Small but fair beats big but biased' },
      'That same year, a young pollster named George Gallup surveyed a much smaller sample, chosen carefully to include people of different incomes, ages and regions. He correctly predicted that Roosevelt would win. The lesson changed polling forever: a fair, <b>random sample</b> of about a thousand people can be more accurate than a biased sample of millions.',
      'Today, pollsters still work hard to avoid bias, but it is not easy. Many people do not answer calls from unknown numbers, and online polls may reach only certain groups. A good reader always asks: who was asked, and how were they chosen?'
    ],
    guide: { before: 'Ask: if you surveyed only the basketball team about favourite sports, would the results be fair? Teach <b>sample</b>, <b>population</b>, <b>biased</b> and <b>random sample</b>.',
      after: 'Find a poll in the news. Who was asked, and how many? Could the sample be biased?' },
    words: [['sample', 'a smaller group chosen from a larger group to be studied'], ['population', 'the whole group you want to learn about'], ['biased', 'leaning unfairly toward one side']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'According to the graph, how far off was the Digest’s prediction for Landon?',
        opts: ['about 20 percentage points', 'about 5 points', 'about 57 points', 'it was exactly right'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why were the people on the Digest’s list wealthier than average?',
        opts: ['Names came from phone books and car records.', 'Only rich people voted.', 'The magazine was free.', 'Gallup chose them.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain two reasons the Literary Digest sample was biased.',
        a: 'The list came from phone books, car records and subscribers, who were wealthier. Also, only about a quarter answered, and those who did were more likely to be unhappy with the president.', look: 'the list and the low response rate' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The heading says “Small but fair beats big but biased.” Explain this idea using the text.',
        a: 'Gallup’s small but carefully chosen sample predicted correctly, while the Digest’s huge but biased sample was wrong. Fairness matters more than size.', look: 'compares the two polls to explain the heading' },
      { k: 'choice', code: 'B2.2', q: 'In this text, a <b>poll</b> is …',
        opts: ['a survey of people’s opinions', 'a long pole', 'the top of the head', 'a place to swim'], a: 0 },
      { k: 'lines', code: 'C1.3', n: 3, q: 'How does the writer organize this text? Name the pattern and explain why it suits the topic.',
        a: 'Problem and solution, or cause and effect: a poll fails, the writer explains why, and then shows how Gallup fixed it. It helps readers understand what went wrong and the lesson.', look: 'names a pattern and links it to the content' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Before reading, did you think a bigger poll was always better? How has your thinking changed?',
        a: 'Yes, I thought more people meant more accurate. Now I know a fair, random sample matters more than a huge one.', look: 'reflects on a change in thinking' }
    ]
  });
})();
