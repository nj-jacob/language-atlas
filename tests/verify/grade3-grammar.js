/* Grade 3 answer checks: grammar (grade3/chapters/grammar.js). The checker has its own rules for one and more than one, its own
   list of words that tell where, its own way of telling what an answer asks for, and its own feeling words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'");
  /* words that mean more than one, even without an s */
  const MANY = w => /s$/.test(w) || ['geese', 'children', 'people', 'mice'].includes(w);
  const many = who => MANY(who.split(' ').pop());
  const link = (who, past) => past ? (many(who) ? 'were' : 'was') : (many(who) ? 'are' : 'is');
  /* what an answer gives, so which question word asks for it */
  const DAYS = /^(On (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)|In (January|February|March|April|May|June|July|August|September|October|November|December)|At \w+ o'clock|After |Before )/;
  const wordFor = a => /^Because /.test(a) ? 'Why' : /'s\.$/.test(a) ? 'Whose' : /^The \w+ one\.$|^[A-Z][a-z]+\.$/.test(a) ? 'Which'
    : DAYS.test(a) ? 'When' : /^(Next to|On|Under|In|At|Behind|Beside) the /.test(a) ? 'Where' : /^(By|With) /.test(a) ? 'How' : null;
  const ASKS = { When: 'a time', Where: 'a place', Whose: 'an owner', How: 'a way', Which: 'a choice', Why: 'a reason' };
  const WHERE = new Set('under above behind across through between beside over by below around near inside up onto on into in'.split(' '));
  const SAY = { 'You drop your cup.': 'Oops!', 'You spill your juice.': 'Oops!', 'You bump your knee.': 'Ouch!', 'You stub your toe.': 'Ouch!', 'Your team wins.': 'Hooray!',
    'It is a snow day.': 'Hooray!', 'You see a giant rainbow.': 'Wow!', 'A whale jumps out of the water.': 'Wow!', 'You want quiet.': 'Shh!', 'The baby is sleeping.': 'Shh!',
    'You taste sour milk.': 'Yuck!', 'You step in cold mud.': 'Yuck!', 'You jump into an icy lake.': 'Brr!', 'A freezing wind blows.': 'Brr!', 'You just catch the bus.': 'Phew!', 'You find your lost key.': 'Phew!' };
  const FEELING = new Set(Object.values(SAY).map(w => w.replace(/!$/, '')));
  const mk = q => text((q.options || q.tiles)[q.answer]);
  const onlyOne = (q, fits) => (q.options || q.tiles).map(text).filter(fits).length === 1;
  const ownedRight = (s, o, t) => s.toLowerCase() === (o + "'s " + t).toLowerCase();
  /* where the ball is in the picture, from the drawing itself */
  const whereIs = fig => {
    const d = document.createElement('div'); d.innerHTML = fig;
    const c = d.querySelector('circle'), r = d.querySelector('rect'), n = (e, a) => +e.getAttribute(a);
    const cx = n(c, 'cx'), cy = n(c, 'cy'), cr = n(c, 'r'), x = n(r, 'x'), y = n(r, 'y'), w = n(r, 'width'), h = n(r, 'height');
    return cx - cr >= x + w ? 'beside' : cy + cr < y - 4 ? 'above' : cy + cr <= y ? 'on' : cy - cr >= y + h ? 'under' : cx > x && cx < x + w && cy > y && cy < y + h ? 'in' : '?';
  };

  V['g3-possessive'] = (q, m) => mk(q) === m.owner + "'s " + m.thing && onlyOne(q, t => ownedRight(t, m.owner, m.thing)) ? '' : 'expected ' + m.owner + "'s " + m.thing;
  V['g3-fix-possessive'] = (q, m) => mk(q) === m.owner + 's' ? '' : 'expected the word ' + m.owner + 's';
  V['g3-poss-gap'] = (q, m) => mk(q) === m.owner + "'s" && onlyOne(q, t => t.endsWith("'s")) ? '' : 'expected ' + m.owner + "'s";
  V['g3-poss-tf'] = (q, m) => H.has(q.fig.replace(/’/g, "'"), text(m.said).slice(1)) && ownedRight(text(m.said), m.owner, m.thing) === q.answer ? '' : 'true/false is wrong for ' + m.said;
  V['g3-pick-poss'] = q => { const want = q.options.map((o, i) => /^[\w ]+'s [\w ]+$/.test(text(o)) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the right ones are not marked'; };
  V['g3-linking'] = (q, m) => mk(q) === link(m.who, m.past) ? '' : 'expected ' + link(m.who, m.past);
  V['g3-match-linking'] = q => q.pairs.every(p => link(text(p[0]), false) === text(p[1])) ? '' : 'a start is matched to the wrong word';
  V['g3-link-pick'] = (q, m) => { const ok = q.options.map(text).filter(o => [link(m.who, false), link(m.who, true)].includes(o.slice(m.who.length + 1).split(' ')[0])); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with ' + link(m.who, false) + ' or ' + link(m.who, true); };
  V['g3-link-tf'] = (q, m) => {
    if (!H.has(q.fig, m.who + ' ' + m.said)) return 'the sentence is not shown';
    if ([link(m.who, false), link(m.who, true)].includes(m.said) !== q.answer) return 'true/false is wrong for ' + m.who + ' ' + m.said;
    return text(q.why.options[q.why.answer]).includes(many(m.who) ? 'more than one' : 'about one') ? '' : 'the reason does not fit';
  };
  V['g3-progressive'] = (q, m) => { const re = new RegExp('^' + m.who + (m.now ? ' is ' : ' was ') + '\\w+ing\\.$'), ok = q.options.map(text).filter(o => re.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected "' + m.who + (m.now ? ' is' : ' was') + ' ...ing"'; };
  V['g3-helper'] = (q, m) => { const f = text(q.fig), now = /^Right now/.test(f); return now === m.now && mk(q) === link(m.who, !now) ? '' : 'expected ' + link(m.who, !now); };
  V['g3-ing-missing'] = q => /right now/.test(text(q.fig)) && mk(q) === 'is' ? '' : 'expected is';
  V['g3-ing-tf'] = (q, m) => text(q.fig) === m.said && new RegExp('^' + m.who + ' is \\w+ing\\.$').test(m.said) === q.answer ? '' : 'true/false is wrong for ' + m.said;
  V['g3-place'] = q => mk(q) === whereIs(q.fig) + ' the box' ? '' : 'the picture shows the ball ' + whereIs(q.fig) + ' the box';
  V['g3-place-tf'] = (q, m) => (whereIs(q.fig) === m.said) === q.answer ? '' : 'true/false is wrong: the ball is ' + whereIs(q.fig) + ' the box';
  V['g3-place-sentence'] = q => mk(q) === 'The ball is ' + whereIs(q.fig) + ' the box.' ? '' : 'expected the ball ' + whereIs(q.fig) + ' the box';
  V['g3-where-word'] = q => { const t = q.tiles.map(text), w = t.filter(x => WHERE.has(x)); return w.length === 1 && t[q.answer] === w[0] ? '' : 'the word that tells where is not marked'; };
  V['g3-ask-word'] = (q, m) => { const want = wordFor(text(m.a)); return want && mk(q) === want ? '' : 'expected ' + want + ' for the answer "' + m.a + '"'; };
  V['g3-match-ask'] = q => q.pairs.every(p => ASKS[text(p[0])] === text(p[1])) ? '' : 'a question word is matched to the wrong thing';
  V['g3-answer-for'] = (q, m) => { const ok = q.options.map(text).filter(a => wordFor(a) === m.w); return H.has(q.fig, m.w) && ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the answer that fits ' + m.w; };
  V['g3-ask-tf'] = (q, m) => H.has(q.fig, m.w) && (wordFor(text(m.a)) === m.w) === q.answer ? '' : 'true/false is wrong for ' + m.w + ' / ' + m.a;
  V['g3-wow'] = (q, m) => mk(q) === SAY[m.s] && H.has(q.fig, m.s) ? '' : 'expected ' + SAY[m.s];
  V['g3-match-wow'] = q => q.pairs.every(p => SAY[text(p[0])] === text(p[1])) ? '' : 'a moment is matched to the wrong word';
  V['g3-tap-wow'] = q => { const t = q.tiles.map(x => text(x).replace(/[,!]$/, '')), f = t.filter(x => FEELING.has(x)); return f.length === 1 && t[q.answer] === f[0] ? '' : 'the feeling word is not marked'; };
  V['g3-wow-tf'] = (q, m) => H.has(q.q, m.s) && (SAY[m.s] === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.s;
})();
