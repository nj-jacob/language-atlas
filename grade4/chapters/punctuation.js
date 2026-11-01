/* Grade 4: capitals and punctuation.
   Ontario 2023 Language, Grade 4, B3.3 "use their understanding of the meaning and function of capitalization and punctuation to
   communicate meaning clearly and coherently, including the use of capital letters for proper adjectives, commas to set off nouns
   of direct address, and quotation marks to indicate the title of a short work".
   All sentences and titles are written for this site. Answer checks: tests/verify/grade4-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, OQ = '“', CQ = '”';
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- proper adjectives: [sentence, the word that needs a capital] ---------- */
  var PROPER = [['We waved the canadian flag.', 'canadian'], ['Grandma bakes italian bread.', 'italian'], ['My class visited an inuit art show.', 'inuit'],
    ['We drove past ontario farms.', 'ontario'], ['Hana is learning japanese words.', 'japanese'], ['We tried ethiopian food on Friday.', 'ethiopian'],
    ['The french words were hard to say.', 'french'], ['Arjun sang punjabi songs.', 'punjabi'], ['Leila wore a mexican hat.', 'mexican'],
    ['We bought some greek yogurt.', 'greek'], ['My uncle cooks jamaican patties.', 'jamaican'], ['The chinese lanterns glowed.', 'chinese'], ['We learned some cree words.', 'cree']];
  var FROM = [['Canada', 'Canadian'], ['Italy', 'Italian'], ['Japan', 'Japanese'], ['Mexico', 'Mexican'], ['Ethiopia', 'Ethiopian'], ['Greece', 'Greek'], ['Jamaica', 'Jamaican'], ['China', 'Chinese']];
  var PLAIN = ['happy', 'tall', 'fresh', 'quiet', 'warm', 'shiny'];
  function fixed(p) { return p[0].replace(p[1], cap(p[1])); }
  function tapCap() {
    var p = R.pick(PROPER), words = p[0].replace('.', '').split(' ').slice(1);
    return { q: 'One word needs a capital letter. Tap it.', fig: W.sent(p[0]), type: 'tap', tiles: words, answer: words.indexOf(p[1]),
      prompt: 'Which describing word comes from the name of a place or people?', hint: 'Canada &rarr; Canadian. Italy &rarr; Italian.', explain: W.sent(fixed(p)), meta: { k: 'g4-tap-cap', s: p[0] } };
  }
  function capRight(lv) {
    var p = R.pick(PROPER);
    return Q.one('Which is written correctly?', fixed(p), [p[0]].concat(lv > 1 ? [fixed(p).replace(/ (\w)/, function (m, c) { return ' ' + c.toUpperCase(); })] : []), {
      hint: 'A describing word made from a name needs a capital.', explain: W.sent(fixed(p)), meta: { k: 'g4-cap-right', s: p[0] } });
  }
  function capPick() {
    return Q.all('Pick every word that needs a capital letter.', R.some(PROPER, 2).map(function (p) { return p[1]; }), R.some(PLAIN, 2), {
      hint: 'Does it come from the name of a place or people?', explain: 'Words made from names need capitals: Canadian, Inuit, Italian.', meta: { k: 'g4-cap-pick' } });
  }
  function capTf() {
    var p = R.pick(PROPER), right = R.int(0, 1) === 1, sh = right ? fixed(p) : p[0];
    return { q: 'True or false? This is written correctly.', fig: W.sent(sh), type: 'tf', answer: right,
      why: { options: ['A describing word made from a name needs a capital.', 'Only the first word of a sentence needs a capital.'], answer: 0 },
      hint: 'Look at <b>' + p[1] + '</b>. Does it come from a name?', explain: W.sent(fixed(p)), meta: { k: 'g4-cap-tf', s: sh } };
  }
  function capMatch() {
    return { q: 'Match each place or people to its describing word.', type: 'match', pairs: R.some(FROM, 3),
      hint: 'Both start with the same capital letter.', explain: 'The describing word keeps the capital.', meta: { k: 'g4-cap-match' } };
  }

  /* ---------- commas for the person you speak to: [the sentence, the name, the word after which the comma goes] ---------- */
  var ADDR = [['Kai, please pass the salt.', 'Kai'], ['Thank you, Ms. Lee.', 'Ms. Lee'], ['Can you help me, Omar?', 'Omar'], ['Grandma, look at the moon!', 'Grandma'],
    ['Mateo, your bus is here.', 'Mateo'], ['Hurry up, Zara!', 'Zara'], ['Do you know the way, Mr. Singh?', 'Mr. Singh'],
    ['Ayesha, are you ready?', 'Ayesha'], ['Good morning, Coach!', 'Coach'], ['Liam, don' + '’' + 't forget your mitts.', 'Liam'], ['Look out, Noah!', 'Noah']];
  /* a name in a sentence that is not spoken to: no comma */
  var NOTADDR = ['Kai passed the salt.', 'Grandma looked at the moon.', 'Mateo caught his bus.', 'Zara hurried home.', 'Ayesha is ready.', 'Coach blew the whistle.',
    'Noah looked out the window.', 'Liam forgot his mitts.'];
  function noComma(s) { return s.replace(', ', ' '); }
  function addrRight(lv) {
    var a = R.pick(ADDR), wrongPlace = a[0].indexOf(a[1]) === 0 ? a[1] + ' ' + a[0].slice(a[1].length + 2).replace(' ', ', ') : a[0].replace(', ', ' ').replace(a[1], ', ' + a[1]).replace(' ,', ',');
    return Q.one('Which is punctuated correctly?', a[0], [noComma(a[0])].concat(lv > 1 ? [wrongPlace] : []), {
      prompt: 'Who is being spoken to?', hint: 'Use a comma to set off the name of the person you speak to.', explain: W.sent(a[0]), meta: { k: 'g4-addr-right', name: a[1] } });
  }
  function addrTap() {
    var a = R.pick(ADDR.filter(function (x) { return x[1].indexOf('.') < 0; })), words = noComma(a[0]).replace(/[.!?]$/, '').split(' ');
    var at = a[0].indexOf(a[1]) === 0 ? words.indexOf(a[1]) : words.indexOf(a[1]) - 1;
    return { q: 'Where does the comma go? Tap the word that comes just before it.', fig: W.sent(noComma(a[0])), type: 'tap', tiles: words, answer: at,
      hint: 'The comma separates the name from the rest.', explain: W.sent(a[0]), meta: { k: 'g4-addr-tap', name: a[1], s: a[0] } };
  }
  function addrTf() {
    var spoken = R.int(0, 1) === 1, s = spoken ? noComma(R.pick(ADDR)[0]) : R.pick(NOTADDR);
    return { q: 'Does this sentence need a comma?', fig: W.sent(s), type: 'tf', answer: spoken,
      why: { options: ['Someone is being spoken to, so the name is set off with a comma.', 'The name is only part of the sentence, so no comma is needed.'], answer: spoken ? 0 : 1 },
      hint: 'Is someone being spoken to?', explain: spoken ? 'Someone is being spoken to: use a comma.' : 'Nobody is spoken to: no comma.', meta: { k: 'g4-addr-tf', s: s } };
  }
  function addrWho() {
    var spoken = R.int(0, 1) === 1, a = R.pick(ADDR), s = spoken ? a[0] : R.pick(NOTADDR), name = spoken ? a[1] : s.split(' ')[0];
    return { q: 'Who is being spoken to?', fig: W.sent(s), type: 'tap', tiles: [name, 'nobody'], answer: spoken ? 0 : 1,
      prompt: 'Is someone being called by name?', hint: 'A name set off with a comma is the person spoken to.', explain: spoken ? 'We are talking to <b>' + name + '</b>.' : 'The sentence is only about ' + name + '.', meta: { k: 'g4-addr-who', s: s } };
  }
  function addrPick() {
    var right = R.some(ADDR, 2).map(function (a) { return noComma(a[0]); }), wrong = R.some(NOTADDR, 2);
    return Q.all('Pick every sentence that needs a comma.', right, wrong, { hint: 'Is the person being spoken to?', explain: 'Only names of people being spoken to are set off with commas.', meta: { k: 'g4-addr-pick' } });
  }

  /* ---------- titles of short works: [before, title, after, kind] ---------- */
  var TITLE = [['We sang', 'Paddle Song', 'at the campfire.', 'song'], ['Priya read the poem', 'Snow Day', 'to the class.', 'poem'],
    ['The article', 'How Bees Make Honey', 'has great photos.', 'article'], ['Our teacher read the short story', 'The Lost Mitten', 'aloud.', 'short story'],
    ['The chapter', 'A Long Walk Home', 'made me think.', 'chapter'], ['Owen wrote a poem called', 'My Grandpa' + '’' + 's Boat', 'for Father' + '’' + 's Day.', 'poem'],
    ['Mom played the song', 'Northern Lights', 'in the car.', 'song'], ['I read the article', 'Saving the Monarchs', 'online.', 'article'],
    ['Tala wrote the short story', 'The Night Owl', 'for school.', 'short story'], ['The chapter', 'Into the Woods', 'is my favourite.', 'chapter']];
  var NOTITLE = ['We sang around the campfire.', 'Priya read a poem to the class.', 'The article has great photos.', 'Owen wrote a poem for his grandpa.',
    'Mom played a song in the car.', 'Tala wrote a story for school.'];
  function quoted(t) { return t[0] + ' ' + OQ + t[1] + CQ + ' ' + t[2]; }
  function titleRight(lv) {
    var t = R.pick(TITLE), wrong = [t[0] + ' ' + t[1] + ' ' + t[2], OQ + t[0] + ' ' + t[1] + CQ + ' ' + t[2], t[0] + ' ' + OQ + t[1].toLowerCase() + CQ + ' ' + t[2]];
    return Q.one('Which is written correctly?', quoted(t), wrong.slice(0, lv > 1 ? 3 : 1), {
      hint: 'Put quotation marks around the title of a short work. Capitals on the important words.', explain: W.sent(quoted(t)), meta: { k: 'g4-title-right', title: t[1] } });
  }
  function titleTap() {
    var t = R.pick(TITLE), tiles = [t[0], t[1], t[2]];
    return { q: 'Which part needs quotation marks?', fig: W.sent(t.slice(0, 3).join(' ')), type: 'tap', tiles: tiles, answer: 1,
      hint: 'Find the title.', explain: W.sent(quoted(t)), meta: { k: 'g4-title-tap', title: t[1] } };
  }
  function titleTf() {
    var t = R.pick(TITLE), right = R.int(0, 1) === 1, s = right ? quoted(t) : t.slice(0, 3).join(' ');
    return { q: 'Is the title punctuated correctly?', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['The title of a short work goes in quotation marks.', 'Titles never need any marks.'], answer: 0 },
      hint: 'Look at the title of the ' + t[3] + '.', explain: W.sent(quoted(t)), meta: { k: 'g4-title-tf', title: t[1], s: s } };
  }
  function titleKind() {
    var t = R.pick(TITLE), kinds = ['song', 'poem', 'short story', 'article', 'chapter'];
    return Q.tiles('What is ' + OQ + t[1] + CQ + '?', t[3], R.some(kinds.filter(function (k) { return k !== t[3]; }), 2), { fig: W.sent(quoted(t)),
      hint: 'The sentence tells you.', explain: OQ + t[1] + CQ + ' is a ' + t[3] + '. Short works go in quotation marks.', meta: { k: 'g4-title-kind', title: t[1] } });
  }
  function titlePick() {
    return Q.all('Pick every sentence that has a title in it.', R.some(TITLE, 2).map(function (t) { return t.slice(0, 3).join(' '); }), R.some(NOTITLE, 2), {
      hint: 'A title names a song, poem, story, article or chapter.', explain: 'Those titles go in quotation marks.', meta: { k: 'g4-title-pick' } });
  }

  Atlas.register('punctuation', {
    full: true,
    lessons: [{
      id: 'capitals-commas', title: 'Capitals and commas', sub: 'Names of places and people, and the person you speak to.',
      concepts: [
        { slug: 'proper-adjectives', title: 'Describing words made from names get a capital', exp: ['B3.3'], skill: 'capitals',
          model: [
            step(W.sent('<b>C</b>anada'), 'A name: a capital.'),
            step(W.sent('the <b>C</b>anadian flag'), 'Made from the name: keep the capital.'),
            step(W.sent('We bought some greek yogurt.'), 'Another one. Find the word from a name.'),
            step(W.sent('<b>G</b>reece &rarr; <b>G</b>reek'), 'It comes from a country.'),
            step(W.sent('We bought some <b>G</b>reek yogurt.'), 'Now it is right.')
          ],
          guided: [tapCap, function () { return capRight(1); }, capMatch],
          check: [tapCap, function () { return capRight(2); }, capTf, capPick, capMatch],
          coach: '<p>Look at food labels together: "Ontario apples", "Greek yogurt". Point to the capital each time.</p>',
          mistake: '<p>Writing "canadian" or "french". Ask: "Is it made from the name of a place or people?"</p>' },
        { slug: 'direct-address', title: 'A comma sets off the person you speak to', exp: ['B3.3'], skill: 'address',
          model: [
            step(W.sent('<b>Kai</b><mark class="hl">,</mark> please pass the salt.'), 'Speaking to Kai.'),
            step(W.sent('Kai passed the salt.'), 'Only about Kai: no comma.'),
            step(W.sent('Thank you Ms. Lee.'), 'Who is spoken to?'),
            step(W.sent('Thank you<mark class="hl">,</mark> <b>Ms. Lee</b>.'), 'The name can come at the end.'),
            step(W.means('talk', 'You pause before a name you call out.'), 'The comma shows the pause.')
          ],
          guided: [function () { return addrRight(1); }, addrWho, addrTap],
          check: [function () { return addrRight(2); }, addrTf, addrTap, addrPick, addrWho],
          coach: '<p>Read the sentence aloud. You pause after a name you call out, and the comma shows that pause.</p>',
          mistake: '<p>Adding a comma after every name. Only when the person is being spoken to.</p>' }
      ]
    }, {
      id: 'titles', title: 'Titles', sub: 'Songs, poems, stories, articles and chapters.',
      concepts: [
        { slug: 'titles', title: 'Quotation marks go around a short title', exp: ['B3.3'], skill: 'titles',
          model: [
            step(W.sent('We sang Paddle Song at the campfire.'), 'A song title, lost in the sentence.'),
            step(W.sent('We sang ' + OQ + 'Paddle Song' + CQ + ' at the campfire.'), 'Now it stands out.'),
            step(W.sent('I read the article Saving the Monarchs online.'), 'Find the title.'),
            step(W.sent('I read the article ' + OQ + 'Saving the Monarchs' + CQ + ' online.'), 'Only the title goes inside.'),
            step(W.sent('poem &middot; song &middot; short story &middot; article &middot; chapter'), 'Short works like these.')
          ],
          guided: [function () { return titleRight(1); }, titleTap, titleKind],
          check: [function () { return titleRight(2); }, titleTf, titleTap, titlePick, titleKind],
          coach: '<p>When the child writes about a song or a poem, ask: "Is that a title? Then it gets quotation marks."</p>',
          mistake: '<p>Putting the quotation marks around the whole sentence. Only the title goes inside.</p>' }
      ]
    }],
    practice: [
      { id: 'capitals', name: 'Capitals for words made from names', code: 'B3.3', gen: tapCap },
      { id: 'address', name: 'Commas for the person you speak to', code: 'B3.3', gen: addrRight },
      { id: 'titles', name: 'Quotation marks for titles', code: 'B3.3', gen: titleRight }
    ]
  });

  Q.shapes('punctuation', {
    capitals: [[1, 'which', capRight], [1, 'match', capMatch], [2, 'true-false', capTf], [2, 'pick', capPick]],
    address: [[1, 'tap', addrTap], [1, 'who', addrWho], [1, 'true-false', addrTf], [2, 'pick', addrPick]],
    titles: [[1, 'tap', titleTap], [1, 'kind', titleKind], [1, 'true-false', titleTf], [2, 'pick', titlePick]]
  });
})();
