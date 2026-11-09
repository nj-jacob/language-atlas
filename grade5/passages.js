/* Grade 5 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  function level(y, w, name, jobs) {
    var x = (284 - w) / 2;
    return '<rect class="a" x="' + x + '" y="' + y + '" width="' + w + '" height="50" rx="6"/><text class="lb" x="142" y="' + (y + 21) + '" text-anchor="middle">' + name + '</text>' +
      '<text class="n" x="142" y="' + (y + 38) + '" text-anchor="middle">' + jobs + '</text>';
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
})();
