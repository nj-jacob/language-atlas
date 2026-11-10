/* Language Atlas tool box: Decodable readers (#tools/decodable), one printable page for each phonics step, Kindergarten to Grade 2.
   Needs atlas.js and tools.js; drawing a page also needs sheets.js (the worksheets' themes, fonts and printing; sheets.css). It adds itself to the tool box.
   The steps follow a structured literacy (Orton-Gillingham) order: short vowels, digraphs, FLOSS, glued sounds, endings, blends,
   silent e, syllable types, r-controlled vowels, vowel teams, then prefixes and suffixes. Each page has the step's sound,
   warm-up words, heart words, a short story the child can sound out with only what has been taught, a picture and 3 questions.
   A grown-up page (grown-up view) has the answers, the Ontario expectations and how to teach the page.
   Nothing is marked on screen: the child reads and answers on paper.

   The pages are in assets/engine/decodebank.js, loaded when the tool first opens:
     Atlas.decodable.add({ id, band, name, focus, key, mark, heart, words, title, text, pic, qs, tip })
   id     the step: tests/decodable.js lists the steps in order and works out again that every word can be sounded out at it.
   band   'K', '1' or '2': where the step is usually taught (Kindergarten, Grade 1, Grade 2).
   name   the step's name ('Digraph sh'). focus: the spellings shown large (['sh']). key: a key word for the sound ('ship').
   mark   a regular expression (text) for the letters to show in the accent colour in the warm-up and the story ('sh').
   heart  the new heart words (read by heart, not sounded out) for this step; earlier steps' heart words can be used too.
   words  8 to 15 warm-up words, each using the step's new spelling.
   title, text  the story's title and its paragraphs (plain text).
   pic    the picture: a list of PICS names below, drawn left to right on the ground (sky ones up in the sky).
   qs     3 questions, each with its Ontario code (Grade 1 code; the Grade 2 code is worked out from CODES):
            { k: 'yn', q: 'a sentence to circle yes or no for', a: true, code }
            { k: 'choice', q, opts: [...], a: 1, code }          circle one (a from 0)
            { k: 'order', q, items: [... in the right order], show: [indexes in the order printed], code }
            { k: 'draw', q, a: 'what to look for', code }       draw in a box
            { k: 'write', q, a: 'an answer', code }             write a word or a short sentence
   tip    for the grown-up: the rule in plain words, and what to watch for. */
(function () {
  'use strict';
  var A = window.Atlas;
  if (!A || !A.toolkit) return;
  /* the sheets' look is needed only to draw a page (the site's Toolbox page loads this file just for its shelf card) */
  var $ = A.$, $$ = A.$$, S = function () { return A.sheets; };
  var D = (A.decodable = { list: [] });
  var BANDS = (D.bands = [['K', 'Kindergarten'], ['1', 'Grade 1'], ['2', 'Grade 2']]);
  /* the same expectation in Grade 1 and in Grade 2 (the numbers changed between grades) */
  var CODES = { 'B2.4': 'B2.1', 'B2.5': 'B2.2', 'B2.6': 'B2.3', 'B2.8': 'B2.5' };
  var LETTERS = 'ABCD';

  /* ---------- the pictures: line art in a 100 by 100 box, the ground at 96 ---------- */
  function k(d) { return '<path class="k" d="' + d + '"/>'; }
  function a(d) { return '<path class="a" d="' + d + '"/>'; }
  function t(d) { return '<path class="t" d="' + d + '"/>'; }
  function c(x, y, r, cls) { return '<circle class="' + (cls || 'k') + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/>'; }
  function eye(x, y) { return '<circle class="dot" cx="' + x + '" cy="' + y + '" r="1.6"/>'; }
  var PICS = D.pics = {
    cat: k('M24 96 Q20 70 34 62 Q48 56 60 64 Q72 74 70 96 Z M60 64 L58 46 L66 54 L74 46 L76 58 Q78 66 70 70') + k('M24 92 Q8 90 10 76') + eye(66, 58) + eye(72, 58) + t('M62 62 L52 60 M62 64 L52 66'),
    dog: k('M18 96 V72 Q20 62 34 62 H62 L66 50 Q72 44 80 48 L86 56 Q86 64 78 64 L72 64 V96 M30 96 V80 M60 96 V80 M18 72 Q8 64 12 56') + a('M70 48 Q66 58 72 62') + eye(78, 54),
    fox: k('M14 96 Q14 74 30 68 H62 L66 52 L72 58 L80 50 L82 64 Q82 70 74 72 L70 96 M30 96 V80 M58 96 V80') + a('M30 68 Q10 66 6 84 Q4 94 14 90') + eye(74, 62),
    pig: k('M20 90 Q16 66 40 62 H62 Q82 64 80 84 Q78 92 70 92 M24 90 V96 M38 92 V96 M58 92 V96 M72 92 V96 M20 80 Q12 80 14 72') + a('M78 74 h8 v8 h-8') + eye(70, 70) + k('M64 62 L68 54 L72 62'),
    hen: k('M30 96 L34 84 M46 96 L42 84 M22 70 Q20 86 40 86 Q62 86 64 70 L64 54 Q64 44 56 44 Q48 44 50 56 Q36 54 22 70 Z M22 70 L12 56 L26 62') + a('M64 54 L72 57 L64 60 M56 44 Q58 38 62 42') + eye(58, 50),
    duck: k('M20 80 Q20 92 44 92 Q70 92 72 76 Q72 68 60 70 L58 56 Q58 46 50 46 Q42 46 44 58 Q46 66 36 70 Q24 70 20 80 Z') + a('M58 52 L68 54 L58 58') + eye(52, 52) + t('M30 82 Q42 78 52 82'),
    fish: k('M18 60 Q40 38 66 56 Q72 60 66 64 Q40 82 18 60 Z M66 60 L84 48 V72 Z') + eye(30, 58) + t('M44 50 Q48 60 44 70'),
    frog: k('M20 96 Q18 78 32 72 Q30 60 40 60 Q46 60 48 66 H56 Q58 60 64 60 Q74 60 72 72 Q86 78 82 96 Z M28 96 Q24 88 32 86 M74 96 Q78 88 70 86') + eye(40, 66) + eye(64, 66) + a('M40 80 Q52 88 64 80'),
    bug: k('M30 80 Q30 58 50 58 Q70 58 70 80 Q70 92 50 92 Q30 92 30 80 Z M50 58 V92 M42 58 Q40 48 50 48 Q60 48 58 58 M44 48 L38 40 M56 48 L62 40 M30 74 L20 70 M30 84 L20 88 M70 74 L80 70 M70 84 L80 88') + c(40, 72, 3, 'a') + c(60, 80, 3, 'a'),
    bird: k('M20 50 Q36 36 50 46 Q64 36 80 50') + a('M50 46 V50'),
    moose: k('M16 96 V64 Q18 54 34 54 H58 L64 42 Q70 36 76 42 L86 60 Q86 66 78 64 L72 58 V96 M28 96 V76 M58 96 V76') + a('M62 40 Q54 30 56 22 M58 30 L50 26 M70 38 Q78 28 76 20 M74 30 L82 26') + eye(72, 46),
    bear: k('M14 96 V70 Q16 56 36 54 H60 Q70 52 76 58 Q86 60 86 68 Q86 74 78 74 L74 72 V96 M28 96 V78 M58 96 V80 M70 54 Q70 48 74 50') + eye(78, 62) + t('M20 60 Q30 50 46 54'),
    beaver: k('M30 96 Q22 80 32 68 Q44 58 62 64 Q72 68 72 78 Q72 90 60 92 Z M72 76 L80 74') + a('M30 88 Q10 86 8 96 H30 Z') + eye(66, 70),
    loon: k('M14 80 Q20 90 50 90 Q80 90 84 76 Q86 66 78 64 L76 54 Q74 46 68 48 Q62 50 64 60 Q50 70 14 80 Z') + a('M76 52 L88 54 L76 57') + eye(70, 53) + t('M30 82 h6 M40 82 h6 M50 82 h6'),
    elk: k('M16 96 V66 Q18 56 34 56 H60 L66 44 Q70 38 76 42 L84 54 Q84 60 78 60 L72 56 V96 M28 96 V76 M60 96 V76') + a('M68 40 L62 24 L56 18 M62 24 L68 16 M65 32 L58 30 M74 40 L80 24 L86 18 M80 24 L76 16 M78 32 L86 30') + eye(74, 48),
    gong: k('M20 96 V30 M80 96 V30 M14 30 H86 M50 30 V40') + c(50, 62, 20, 'a') + c(50, 62, 8, 't') + k('M74 88 L88 74'),
    basket: k('M18 62 H82 L74 94 H26 Z M30 62 Q30 36 50 36 Q70 36 70 62') + t('M22 74 H78 M24 84 H76 M38 62 L40 94 M50 62 V94 M62 62 L60 94'),
    goat: k('M18 96 V70 Q20 60 34 60 H62 L66 48 Q70 42 76 46 L84 56 Q84 62 78 62 L72 60 V96 M30 96 V78 M60 96 V78 M18 70 L12 62') + a('M68 46 Q64 34 56 32 M74 44 Q74 32 82 28 M80 62 Q80 70 76 72') + eye(74, 52),
    rabbit: k('M28 96 Q20 78 34 70 Q46 62 60 68 Q70 62 72 72 Q74 80 66 82 L64 96 M60 68 L56 44 Q58 40 62 44 L64 66 M66 66 L70 42 Q73 38 75 43 L70 66') + c(26, 86, 4, 'a') + eye(68, 74),
    hat: k('M22 80 Q50 72 78 80 Q76 86 50 86 Q24 86 22 80 Z M32 78 Q30 54 50 52 Q70 54 68 78') + a('M32 70 Q50 66 68 70'),
    toque: k('M28 84 Q26 52 50 50 Q74 52 72 84 Z M26 84 H74 V92 H26 Z') + c(50, 46, 5, 'a') + t('M30 70 H70'),
    mitt: k('M34 92 V58 Q34 44 46 44 Q56 44 56 58 V60 Q62 52 68 58 Q70 62 62 72 L60 92 Z') + a('M32 84 H62'),
    bag: k('M26 92 V56 H74 V92 Z M38 56 Q38 40 50 40 Q62 40 62 56') + a('M26 66 H74'),
    cup: k('M30 56 H66 L62 92 H34 Z M66 64 Q78 64 76 74 Q74 82 64 80') + a('M40 48 Q44 42 40 36 M52 48 Q56 42 52 36'),
    pot: k('M22 60 H78 M28 60 V84 Q28 92 36 92 H64 Q72 92 72 84 V60 M22 64 H28 M72 64 H78 M44 60 Q44 52 50 52 Q56 52 56 60') + a('M36 72 H64'),
    pan: k('M18 74 H64 Q64 84 54 84 H28 Q18 84 18 74 Z M64 76 L90 70') + a('M30 70 Q34 66 38 70 M44 70 Q48 66 52 70'),
    bed: k('M10 96 V58 M10 76 H90 V96 M10 84 H90 M90 76 V66') + a('M16 70 Q16 64 24 64 H34 Q38 64 38 70 V76 H16 Z') + t('M40 76 Q60 70 88 76'),
    box: k('M24 56 H76 V92 H24 Z M24 56 L34 44 H86 L76 56 M86 44 V82 L76 92') + a('M50 56 V72'),
    jar: k('M34 52 H66 V46 H34 Z M32 52 Q26 56 26 64 V88 Q26 94 34 94 H66 Q74 94 74 88 V64 Q74 56 68 52') + a('M28 70 H72'),
    bus: k('M8 52 H88 Q94 52 94 60 V86 H8 Z M8 60 H94') + a('M14 62 H30 V72 H14 Z M36 62 H52 V72 H36 Z M58 62 H74 V72 H58 Z M80 62 H90 V76 H80 Z') + c(24, 88, 7) + c(74, 88, 7),
    van: k('M10 86 V56 Q10 48 20 48 H66 L84 64 H90 V86 Z') + a('M20 54 H44 V64 H20 Z M50 54 H64 L74 64 H50 Z') + c(26, 88, 7) + c(74, 88, 7),
    truck: k('M6 86 V52 H58 V86 Z M58 62 H78 L90 74 V86 H58') + a('M64 66 H76 L84 74 H64 Z') + c(22, 88, 7) + c(76, 88, 7),
    bike: c(24, 82, 13) + c(76, 82, 13) + k('M24 82 L40 58 H66 L76 82 M40 58 L52 82 L66 58 M36 52 H46 M66 58 L64 48 H72') + a('M52 82 L24 82'),
    ship: k('M10 76 H90 L80 92 H20 Z M50 76 V24 M50 28 L76 66 H50 M50 34 L28 66 H50') + a('M50 24 L62 28 L50 32'),
    canoe: k('M6 80 Q50 98 94 80 Q50 88 6 80 Z M40 82 L64 54 M60 58 L66 50') + a('M10 82 Q50 94 90 82'),
    sled: k('M16 78 H78 M22 78 V70 M70 78 V70 M18 70 H74 M8 86 H80 Q90 86 90 76') + a('M30 70 V62 H62 V70'),
    tent: k('M10 92 L50 36 L90 92 Z M50 36 V92 M42 92 L50 62 L58 92') + a('M50 36 L46 28 M50 36 L56 28'),
    hut: k('M16 92 V60 H84 V92 Z M10 62 L50 32 L90 62 M42 92 V72 H58 V92') + a('M24 68 H36 V80 H24 Z M64 68 H76 V80 H64 Z'),
    house: k('M14 92 V58 L50 30 L86 58 V92 Z M42 92 V70 H58 V92 M66 44 V30 H74 V50') + a('M22 64 H36 V78 H22 Z M64 64 H78 V78 H64 Z'),
    spruce: k('M50 96 V84 M30 84 L50 58 L70 84 Z M34 66 L50 40 L66 66 M38 48 L50 24 L62 48') + a('M50 24 V18'),
    maple: k('M48 96 V64 Q48 60 44 56 M52 64 Q54 58 60 56') + a('M50 60 Q24 62 24 44 Q24 26 42 24 Q50 12 62 22 Q80 22 78 40 Q80 60 50 60 Z'),
    hill: k('M0 96 Q30 50 60 70 Q80 56 100 96') + t('M24 80 l4 -4 M64 82 l4 -4 M44 86 l4 -4'),
    rock: k('M18 96 Q16 74 34 70 Q42 58 58 64 Q78 64 80 96') + t('M40 80 Q48 76 56 80'),
    log: k('M14 92 V70 H78 V92 Z') + c(80, 81, 11, 'a') + c(80, 81, 4, 't') + t('M24 76 H60 M30 86 H66'),
    pond: a('M6 90 Q50 74 94 90') + t('M14 96 q6 -3 12 0 t12 0 M50 96 q6 -3 12 0 t12 0') + k('M80 86 V64 M80 64 q-4 -6 0 -12 q4 6 0 12 M86 88 V70'),
    fire: k('M24 92 L76 80 M24 80 L76 92') + a('M50 80 Q36 66 46 52 Q48 62 54 60 Q50 48 58 40 Q60 54 66 62 Q70 74 50 80 Z'),
    inuksuk: k('M30 96 V76 H44 V96 M56 96 V76 H70 V96 M24 76 H76 V66 H24 Z M10 66 V58 H90 V66 M36 58 V46 H64 V58 M40 46 V34 H60 V46') + t('M24 71 H76'),
    snowman: c(50, 76, 18) + c(50, 46, 12) + eye(46, 44) + eye(54, 44) + a('M50 48 L58 50 M32 60 L18 50 M68 60 L82 50'),
    kite: k('M60 10 L78 30 L60 56 L42 30 Z M60 10 V56 M42 30 H78') + a('M60 56 Q50 70 58 80 Q66 90 54 96'),
    ball: c(50, 76, 18) + a('M34 68 Q50 76 66 68 M36 86 Q50 80 64 86'),
    bell: k('M30 84 Q34 76 34 62 Q34 44 50 44 Q66 44 66 62 Q66 76 70 84 Z M50 44 V38') + c(50, 90, 4, 'a'),
    drum: k('M24 60 V86 Q50 96 76 86 V60 M24 60 Q50 70 76 60 Q50 50 24 60 Z') + a('M24 72 L36 86 L50 72 L64 86 L76 72 M60 40 L74 54 M80 38 L66 54'),
    cake: k('M20 92 V66 H80 V92 Z M20 76 Q30 82 40 76 Q50 82 60 76 Q70 82 80 76') + a('M36 66 V54 M50 66 V54 M64 66 V54') + t('M36 52 v-4 M50 52 v-4 M64 52 v-4'),
    nest: k('M16 82 Q50 100 84 82 Q50 90 16 82 Z M20 84 Q50 76 80 84') + c(40, 76, 6, 'a') + c(54, 74, 6, 'a'),
    flower: k('M50 96 V56 M50 80 Q40 70 30 76 M50 74 Q62 64 70 70') + c(50, 46, 6, 'a') + a('M50 40 Q44 26 50 22 Q56 26 50 40 M56 46 Q70 40 74 46 Q70 52 56 46 M44 46 Q30 40 26 46 Q30 52 44 46 M50 52 Q44 66 50 70 Q56 66 50 52'),
    book: k('M14 86 V52 Q32 46 50 54 Q68 46 86 52 V86 Q68 80 50 88 Q32 80 14 86 Z M50 54 V88') + t('M22 62 H42 M22 70 H42 M58 62 H78 M58 70 H78'),
    map: k('M14 88 V52 L36 46 L62 54 L86 48 V84 L62 90 L36 82 Z M36 46 V82 M62 54 V90') + a('M22 74 Q32 60 44 70 T74 64'),
    clock: c(50, 64, 26) + k('M50 64 V48 M50 64 L62 70') + t('M50 40 v3 M50 85 v3 M26 64 h3 M71 64 h3'),
    lamp: k('M36 92 H64 M50 92 V60 M34 60 H66 L58 38 H42 Z') + a('M40 66 L34 76 M60 66 L66 76'),
    bridge: k('M4 70 H96 M4 70 Q50 30 96 70 M20 70 V58 M35 70 V48 M50 70 V44 M65 70 V48 M80 70 V58 M10 96 V70 M90 96 V70') + a('M10 92 Q50 84 90 92'),
    train: k('M8 84 V54 H44 V84 Z M44 64 H80 Q90 64 90 74 V84 H44 M16 54 V42 H30 V54') + a('M14 60 H38 V70 H14 Z') + c(20, 88, 6) + c(40, 88, 6) + c(70, 88, 6),
    plane: k('M10 60 Q10 54 20 54 H80 Q92 56 92 60 Q92 64 80 66 H20 Q10 66 10 60 Z M44 56 L30 36 H40 L60 56 M44 64 L30 84 H40 L60 64 M14 56 L10 44 H18 L26 54') + a('M64 58 h4 M72 58 h4'),
    net: k('M18 34 Q50 26 82 34 L74 76 Q50 86 26 76 Z M38 30 L44 80 M62 30 L56 80 M22 50 H78 M24 64 H76') + a('M82 34 L96 96'),
    web: k('M50 20 V96 M14 34 L86 82 M86 34 L14 82') + a('M50 34 L70 44 L72 70 L50 82 L28 70 L30 44 Z M50 48 L60 54 L60 64 L50 70 L40 64 L40 54 Z'),
    pen: k('M28 88 L72 36 L80 44 L36 96 Z M28 88 L24 98 L36 96') + a('M66 42 L74 50'),
    skate: k('M24 66 V44 H44 V58 Q64 58 72 66 V74 H24 Z M18 86 H80 Q86 86 86 80 M34 74 V86 M64 74 V86') + a('M44 50 H34'),
    coin: c(50, 70, 22) + c(50, 70, 16, 'a') + t('M44 64 Q50 58 56 64 Q50 70 56 76 Q50 82 44 76'),
    bone: k('M28 70 H72 M28 70 Q18 60 24 56 Q32 54 30 62 M28 70 Q18 80 24 84 Q32 86 30 78 M72 70 Q82 60 76 56 Q68 54 70 62 M72 70 Q82 80 76 84 Q68 86 70 78'),
    rope: a('M14 80 Q30 60 46 80 T78 80 Q90 80 90 70'),
    hammock: k('M10 96 V40 M90 96 V40 M10 50 Q50 92 90 50') + a('M18 60 Q50 84 82 60'),
    sun: c(50, 50, 14, 'a') + t('M50 26 v-8 M50 74 v8 M26 50 h-8 M74 50 h8 M33 33 l-6 -6 M67 67 l6 6 M67 33 l6 -6 M33 67 l-6 6'),
    moon: a('M58 24 A26 26 0 1 0 74 66 A20 20 0 1 1 58 24 Z'),
    star: a('M50 22 L57 42 L78 42 L61 54 L68 74 L50 62 L32 74 L39 54 L22 42 L43 42 Z'),
    cloud: k('M20 66 Q10 66 12 56 Q14 46 26 48 Q30 34 46 36 Q58 26 70 40 Q86 38 86 52 Q90 66 76 66 Z'),
    rain: k('M20 50 Q10 50 12 40 Q14 30 26 32 Q30 18 46 20 Q58 10 70 24 Q86 22 86 36 Q90 50 76 50 Z') + a('M30 60 l-4 10 M50 60 l-4 10 M70 60 l-4 10 M40 76 l-4 10 M60 76 l-4 10'),
    snow: a('M50 26 V74 M29 38 L71 62 M71 38 L29 62') + t('M44 30 L50 36 L56 30 M44 70 L50 64 L56 70')
  };
  var SKY = ['bird', 'sun', 'moon', 'star', 'cloud', 'rain', 'snow', 'kite', 'plane'];
  D.scene = function (names) {
    var n = names.length, w = 700, step = Math.min(160, w / n), x0 = (w - step * n) / 2;
    var out = names.map(function (nm, i) {
      var sky = SKY.indexOf(nm) >= 0, s = sky ? 0.9 : 1.45, x = x0 + i * step + (step - 100 * s) / 2, y = sky ? -6 : 150 - 96 * s - 4;
      return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + s + ')">' + (PICS[nm] || '') + '</g>';
    }).join('');
    return '<svg class="dc-art" viewBox="0 0 700 150" aria-hidden="true"><path class="t" d="M0 146 H700"/>' + out + '</svg>';
  };

  D.add = function (p) { p.n = D.list.length + 1; D.list.push(p); };
  D.code = function (p) { return 'DR-' + (p.n < 10 ? '0' : '') + p.n; };
  D.band = function (p) { return BANDS.filter(function (b) { return b[0] === p.band; })[0]; };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  /* the letters of the step's spelling, in the accent colour (warm-up words and key word only: the story is plain, so the child decodes it) */
  function marked(text, p) {
    if (!p.mark) return esc(text);
    var re = new RegExp(p.mark, 'g');
    return String(text).split(/(\s+)/).map(function (w) { return /\s/.test(w) ? w : esc(w).replace(re, function (m) { return '<b class="dc-hl">' + m + '</b>'; }); }).join('');
  }
  D.count = function (p) { return p.text.join(' ').split(/\s+/).filter(function (w) { return /[A-Za-z]/.test(w); }).length; };
  /* the heart words this page's story uses: this step's new ones and those from the last 10 steps (older ones are known by now) */
  function hearts(p) {
    var all = [];
    D.list.slice(Math.max(0, p.n - 11), p.n).forEach(function (x) { (x.heart || []).forEach(function (h) { all.push(h); }); });
    var used = {};
    p.text.join(' ').toLowerCase().split(/[^a-z']+/).forEach(function (w) { used[w] = 1; });
    return all.filter(function (h) { return used[h.toLowerCase()]; }).map(function (h) { return { w: h, fresh: (p.heart || []).indexOf(h) >= 0 }; });
  }
  D.codes = function (p) {
    var g1 = ['B2.4', 'B2.8'].concat(p.qs.map(function (q) { return q.code; }));
    if (/suffix|prefix|plural/.test(p.id)) g1.push('B2.6');
    if (!/^short-/.test(p.id)) g1.push('B2.5');
    g1 = g1.filter(function (x, i) { return g1.indexOf(x) === i; }).sort();
    return { g1: g1, g2: g1.map(function (x) { return CODES[x] || x; }).sort() };
  };
  var LOAD = null;
  D.load = function () {
    LOAD = LOAD || new Promise(function (ok) {
      var s = document.createElement('script');
      s.src = '../assets/engine/decodebank.js';
      s.onload = ok;
      s.onerror = ok;
      document.head.appendChild(s);
    });
    return LOAD;
  };

  /* ---------- the page ---------- */
  var HEART = '<svg class="dc-heart" viewBox="0 0 20 18" aria-hidden="true"><path d="M10 16 C4 11 1 8 1 5 C1 2 3 1 5 1 C7 1 9 2 10 4 C11 2 13 1 15 1 C17 1 19 2 19 5 C19 8 16 11 10 16 Z"/></svg>';
  function head(p, th, kind) {
    var b = D.band(p);
    return '<header class="dc-head"><p class="ws-kick"><svg viewBox="0 0 56 56" aria-hidden="true">' + th.mark + '</svg>Decodable reader · ' + esc(p.name) + (kind ? ' · ' + kind : '') + '</p>' +
      (kind ? '' : '<div class="ws-name dc-name"><span>Name</span><i></i><span>Date</span><i></i></div>') +
      '<h2 class="dc-title">' + esc(p.title) + '</h2></header>';
  }
  function foot(p, left) { return '<p class="ws-line dc-line"><span>' + left + '</span><span>' + D.code(p) + '</span></p>'; }
  function question(q, i) {
    var h = '<p class="ws-qt">' + esc(q.q) + '</p>';
    if (q.k === 'yn') h += '<div class="ws-opts dc-opts"><span class="ws-opt">yes</span><span class="ws-opt">no</span></div>';
    if (q.k === 'choice') h += '<div class="ws-opts dc-opts">' + q.opts.map(function (o) { return '<span class="ws-opt">' + esc(o) + '</span>'; }).join('') + '</div>';
    if (q.k === 'order') h += '<ol class="ws-order dc-order">' + q.show.map(function (j) { return '<li><span class="ws-blank ws-box"></span><span>' + esc(q.items[j]) + '</span></li>'; }).join('') + '</ol>';
    if (q.k === 'draw') h += '<div class="dc-draw"></div>';
    if (q.k === 'write') h += '<div class="ws-lines dc-write" style="--n:1"></div>';
    return '<div class="ws-q dc-q dc-q-' + q.k + '"><span class="ws-n">' + (i + 1) + '</span>' + h + '</div>';
  }
  function page(p, th) {
    var hs = hearts(p);
    return '<div class="ws-page dc-page dc-b' + p.band + '">' + head(p, th) +
      '<section class="dc-top"><div class="dc-sound"><p class="ws-label">Sound</p><p class="dc-focus' + (p.focus.length > 2 ? ' dc-many' : '') + '">' + p.focus.map(esc).join(' ') + '</p><p class="dc-key">' + marked(p.key, p) + '</p></div>' +
      '<div class="dc-warm"><p class="ws-label">Warm up · tap and blend</p><ul class="dc-words">' + p.words.map(function (w) { return '<li>' + marked(w, p) + '</li>'; }).join('') + '</ul></div></section>' +
      (hs.length ? '<p class="dc-hearts"><span class="ws-label">Heart words</span>' + hs.map(function (h) { return '<span class="dc-hw' + (h.fresh ? ' dc-new' : '') + '">' + HEART + esc(h.w) + '</span>'; }).join('') + '</p>' : '') +
      '<figure class="dc-pic">' + D.scene(p.pic) + '</figure>' +
      '<div class="dc-text">' + p.text.map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('') + '</div>' +
      '<div class="dc-qs ws-grid">' + p.qs.map(question).join('') + '</div>' +
      '<footer class="dc-foot"><p class="dc-reads"><b>Read it three times</b><i></i><i></i><i></i></p>' + foot(p, 'Language Atlas · ' + D.band(p)[1] + ' · ' + D.count(p) + ' words') + '</footer></div>';
  }
  function answer(q) {
    if (q.k === 'yn') return '<b>' + (q.a ? 'yes' : 'no') + '</b>';
    if (q.k === 'choice') return '<b>' + esc(q.opts[q.a]) + '</b>';
    if (q.k === 'order') return 'From the top: ' + q.show.map(function (j) { return '<b>' + (j + 1) + '</b>'; }).join(', ');
    return esc(q.a);
  }
  var STEPS = ['<b>Sound.</b> Point to the spelling. The child says its sound three times while writing it in the air, then on the table with a finger.',
    '<b>Warm up.</b> The child taps one finger for each sound, then blends: read across the rows, then down. Mix the order for a second go.',
    '<b>Heart words.</b> Say the word, spell it aloud, then say it again. Show the part that does not follow the rule (that part is learned by heart).',
    '<b>Read.</b> The child points under each word. If they guess, cover the word and say "Tap it": sound, blend, read the sentence again.',
    '<b>Read it again.</b> Read the story three times over a few days (tick a circle each time). Then ask the questions.',
    '<b>Spell it.</b> Finish with the dictation below: hearing the sounds and writing them makes the reading stick.'];
  function key(p, th) {
    var cs = D.codes(p);
    return '<div class="ws-page dc-page dc-keyp ws-key">' + head(p, th, 'For the grown-up') +
      '<section class="dc-kblock"><p class="ws-label">The rule</p><p>' + p.tip + '</p></section>' +
      '<section class="dc-kblock"><p class="ws-label">Teach the page (about 15 minutes)</p><ol class="dc-steps">' + STEPS.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol></section>' +
      '<section class="dc-kblock"><p class="ws-label">Answers</p><ol class="dc-ans">' + p.qs.map(function (q) {
        return '<li><p class="dc-kq">' + esc(q.q) + '</p><p class="ws-ans">' + answer(q) + '</p><p class="dc-code">' + q.code + '</p></li>';
      }).join('') + '</ol></section>' +
      '<section class="dc-kblock"><p class="ws-label">Spell it (dictation)</p><p>Say each word. The child says it back, taps one finger for each sound, then writes it: <b>' +
      [p.words[1], p.words[4], p.words[7]].map(esc).join('</b>, <b>') + '</b>. Then say this sentence for them to write: <b>' + esc(p.text[0].split(/(?<=[.!?])\s/)[0]) + '</b></p></section>' +
      '<section class="dc-kblock"><p class="ws-label">Every word can be sounded out</p><p>Only the spellings taught up to this step are used, plus the heart words. A check works this out for every word on the page. ' +
      'If the child is stuck on the warm-up words, go back a page before reading the story.</p></section>' +
      '<footer class="dc-foot">' + foot(p, 'Ontario Grade 1: ' + cs.g1.join(', ') + ' · Grade 2: ' + cs.g2.join(', ')) + '</footer></div>';
  }
  /* one plain, calm look for every page (Noel): the site's own accent and face, an open book, no ornaments at the edges */
  var PLAIN = { acc: 'var(--accent)', font: 'var(--display)', mark: '<path d="M8 16 Q18 12 28 17 Q38 12 48 16 V44 Q38 40 28 45 Q18 40 8 44 Z M28 17 V45" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>' };
  function themeOf() { return PLAIN; }
  /* Draw the page ('page' or 'key') into el, a .ws-sheet box. A long story is set a little smaller, down to 80%.
     Returns whether anything still runs off the page. */
  var ZOOM = [1, 0.96, 0.92, 0.89, 0.86, 0.83, 0.8];
  D.render = function (el, p, side) {
    var th = themeOf(p);
    el.innerHTML = (side === 'key' ? key : page)(p, th);
    var pg = el.firstChild, over;
    pg.style.setProperty('--acc', th.acc);
    pg.style.setProperty('--face', th.font);
    for (var i = 0; i < ZOOM.length; i++) {
      pg.style.setProperty('--z', ZOOM[i]);
      over = $$('.dc-text, .dc-qs, .dc-kblock', pg).some(function (b) { return b.scrollHeight > b.clientHeight + 1 || b.scrollWidth > b.clientWidth + 1; }) ||
        pg.scrollHeight > pg.clientHeight + 1;
      if (!over) break;
    }
    return { over: over, z: ZOOM[Math.min(i, ZOOM.length - 1)] };
  };

  /* ---------- the tool: every step, and one page ---------- */
  function card(p) {
    return '<a class="dc-card" href="#tools/decodable/' + p.id + '" style="--acc:' + themeOf(p).acc + '"><span class="dc-cn">' + p.n + '</span>' +
      '<span class="dc-cf">' + p.focus.map(esc).join(' ') + '</span><span class="dc-cm"><b>' + esc(p.name) + '</b><span>' + esc(p.title) + '</span></span></a>';
  }
  function steps(root) {
    root.innerHTML = '<div class="dc-lib"><p class="dc-lede">' + D.list.length + ' short stories, one for each phonics step, in teaching order. Every word can be sounded out with the steps before it, ' +
      'plus a few heart words. Each prints on one page; turn on grown-up view for the answers and how to teach it.</p>' +
      BANDS.map(function (b) {
        var here = D.list.filter(function (p) { return p.band === b[0]; });
        return here.length ? '<section class="dc-band"><h2>' + b[1] + '</h2><div class="dc-cards">' + here.map(card).join('') + '</div></section>' : '';
      }).join('') + '</div>';
  }
  function one(root, p) {
    var i = D.list.indexOf(p), prev = D.list[i - 1], next = D.list[i + 1];
    root.innerHTML = '<div class="dc-one"><div class="dc-bar"><a class="dc-all" href="#tools/decodable">All steps</a><span class="tb-sp"></span>' +
      (prev ? '<a class="ws-k" href="#tools/decodable/' + prev.id + '" aria-label="Previous step">&lsaquo; Back</a>' : '') +
      (next ? '<a class="ws-k" href="#tools/decodable/' + next.id + '" aria-label="Next step">Next &rsaquo;</a>' : '') + '</div>' +
      '<div class="dc-do"><button type="button" class="btn" data-print="page">Print the story</button>' +
      '<button type="button" class="btn alt ws-adult" data-print="key">Print the grown-up page</button>' +
      '<p class="ws-hint">On an iPad, tap Print, then Share, then Save to Files to keep a PDF.</p></div>' +
      '<div class="ws-pages"><div class="ws-sheet" data-side="page"></div><div class="ws-sheet ws-adult" data-side="key"></div></div></div>';
    document.documentElement.classList.add('ws-print');
    $$('[data-print]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        document.documentElement.setAttribute('data-dc-print', b.getAttribute('data-print'));
        window.print();
      });
    });
    return S().fonts().then(function () {
      $$('.ws-sheet', root).forEach(function (el) { D.render(el, p, el.getAttribute('data-side')); });
      S().fit();
    });
  }
  window.addEventListener('afterprint', function () { document.documentElement.removeAttribute('data-dc-print'); });
  function tool(root, canUndo, rest) {
    root.innerHTML = '<p class="loading">Loading the stories…</p>';
    D.load().then(function () {
      var p = D.list.filter(function (x) { return x.id === rest; })[0];
      if (p) return one(root, p);
      steps(root);
    });
    return {};
  }

  var ICON = '<rect x="6" y="6" width="30" height="38" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><path d="M12 15h8" style="stroke:var(--accent);stroke-width:3.5;stroke-linecap:round"/>' +
    '<path d="M12 24h18M12 30h18M12 36h12" style="stroke:var(--ink3);stroke-width:2.5;stroke-linecap:round"/><path d="M34 32l8 -8 3 3 -8 8 -4 1z" style="fill:var(--card);stroke:var(--ink);stroke-width:2;stroke-linejoin:round"/>';
  A.toolkit.tools.push({ id: 'decodable', shelf: 'read', name: 'Decodable readers', icon: ICON, make: tool, undo: false });
})();
