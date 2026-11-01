/* Grade 3 answer checks: planning writing (grade3/chapters/planning.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const FORM = { 'to tell how to make something': 'instructions', 'to explain how to play a game': 'instructions', 'to show how to plant a seed': 'instructions',
    'to share your opinion with the mayor': 'a letter', 'to thank your coach': 'a letter', 'to ask the principal for a bike rack': 'a letter',
    'to tell a made-up adventure': 'a story', 'to entertain with a tale about a talking moose': 'a story', 'to give facts about an animal': 'a report',
    'to teach facts about the northern lights': 'a report', 'to share a feeling in a few lines': 'a poem', 'to describe the first snow in a few short lines': 'a poem',
    'to tell what really happened on your class trip': 'a recount', 'to tell about your first hockey practice': 'a recount' };
  const LOOKS = { instructions: 'numbered steps', 'a letter': 'greeting', 'a story': 'characters', 'a report': 'headings', 'a poem': 'short lines', 'a recount': 'what I did' };
  const AUD = { 'a kindergarten class': 'short sentences and big pictures', 'the principal': 'polite, careful sentences', 'your best friend': 'a friendly, chatty voice',
    'your grandma far away': 'news about your week and a warm hello', 'a scientist': 'exact facts and the right science words', 'a new student who is learning English': 'simple words and pictures that explain',
    'the mayor': 'polite words and strong reasons', 'your soccer team': 'lively words that cheer them on', 'someone who has never played the game': 'clear steps that explain every rule' };
  /* who gets a polite greeting (Dear and a title), and who a friendly one */
  const FORMAL = new Set(['the principal', 'the mayor', 'a scientist', 'a councillor']);
  const politeHello = s => /^Dear (Principal|Mayor|Dr\.|Councillor) [A-Z]\w+,$/.test(s);
  const FITS = { 'My favourite season: winter': /snow fort|skating|cocoa|snowflakes/, 'A report on beavers': /beavers/, 'A day at the farm': /goats|eggs|tractor|cow/,
    'My family celebration': /^the (food|music|people|special clothes)/, 'How to care for a pet': /fresh water|feeding it|brushing|walks/,
    'Our class trip to the museum': /dinosaur|bus ride|gift shop|guide/, 'Water in our community': /water|lakes/, 'Ways to stay healthy': /fruits|sleep|playing outside|drinking water/ };
  const GOODSRC = /^(a library book|an encyclopedia page|a website from a nature centre|an expert who studies|a video from a science museum|a magazine article)/;
  const HEAD = { 'eats leaves and bark': 'Food', 'chews on twigs': 'Food', 'stores branches to eat in winter': 'Food', 'lives in a lodge': 'Home', 'builds a dam on the creek': 'Home',
    'makes a door under the water': 'Home', 'has a flat tail': 'Body', 'has orange front teeth': 'Body', 'has webbed back feet': 'Body',
    'eats water plants': 'Food', 'nibbles on bark': 'Food', 'eats leaves in summer': 'Food', 'has long legs': 'Body', 'grows big antlers': 'Body', 'has a thick winter coat': 'Body',
    'calves can walk in a day': 'Babies', 'calves stay with their mother': 'Babies', 'a mother has one or two calves': 'Babies',
    'has a long black neck': 'Looks', 'has a white chin strap': 'Looks', 'has grey-brown feathers': 'Looks', 'flies south in the fall': 'Travel', 'flies in a V': 'Travel',
    'comes back in the spring': 'Travel', 'goslings swim right away': 'Babies', 'the mother lays four to seven eggs': 'Babies', 'the nest is on the ground': 'Babies' };
  const ORDERS = [['Pick a topic.', 'Write down ideas.', 'Put the ideas in order.', 'Write the first draft.'], ['Wash the apple.', 'Cut it into slices.', 'Put the slices on a plate.', 'Share them with a friend.'],
    ['Fill the pot with soil.', 'Poke a hole with your finger.', 'Drop in the seed.', 'Water it gently.'], ['Get out of bed.', 'Eat breakfast.', 'Ride the bus to school.', 'Hang up your coat.'],
    ['Lace up your skates.', 'Step onto the ice.', 'Glide around the rink.', 'Take off your skates.'], ['Pour the flour into a bowl.', 'Add the milk and eggs.', 'Stir the batter.', 'Cook the pancakes.'],
    ['Pack the canoe.', 'Push off from the dock.', 'Paddle across the lake.', 'Set up the tent.'], ['Write the letter.', 'Fold it.', 'Put it in the envelope.', 'Mail it.']];
  const PLAN = { 'a report': 'headings', instructions: 'steps in order', 'a story': 'beginning, middle and end', 'a recount': 'first to last', 'a letter': 'greeting, the reasons' };
  const picks = (q, fits) => H.sameSet(q.options.map((o, i) => fits(text(o)) ? i : -1).filter(i => i >= 0), q.answer);
  const one = (q, ok) => { const good = q.options.map(text).filter(ok); return good.length === 1 && mk(q) === good[0]; };
  /* where a step comes in its sequence */
  const placeOf = s => { for (const o of ORDERS) { const i = o.indexOf(s); if (i >= 0) return [o, i]; } return [null, -1]; };

  V['g3-form-for'] = (q, m) => mk(q) === FORM[m.why] && q.tiles.map(text).filter(t => t === FORM[m.why]).length === 1 ? '' : 'expected ' + FORM[m.why];
  V['g3-purpose-of'] = (q, m) => one(q, o => FORM[o] === m.form) && text(q.q).includes(m.form) ? '' : 'expected a purpose for ' + m.form;
  V['g3-match-purpose'] = q => q.pairs.every(p => FORM[text(p[0])] === text(p[1])) ? '' : 'a purpose is matched to the wrong form';
  V['g3-form-tf'] = (q, m) => (FORM[m.why] === m.said) === q.answer ? '' : 'true/false is wrong';
  V['g3-form-looks'] = (q, m) => one(q, o => o.includes(LOOKS[m.form])) ? '' : 'expected what ' + m.form + ' looks like';
  V['g3-audience'] = (q, m) => one(q, o => o === AUD[m.who]) ? '' : 'expected ' + AUD[m.who];
  V['g3-match-audience'] = q => q.pairs.every(p => AUD[text(p[0])] === text(p[1])) ? '' : 'a reader is matched to the wrong help';
  V['g3-greeting'] = (q, m) => one(q, o => politeHello(o) === FORMAL.has(m.who)) ? '' : 'expected a ' + (FORMAL.has(m.who) ? 'polite' : 'friendly') + ' greeting for ' + m.who;
  V['g3-audience-tf'] = (q, m) => (AUD[m.who] === text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.who;
  V['g3-fit-topic'] = (q, m) => picks(q, o => FITS[m.topic].test(o)) ? '' : 'the ideas that fit are not the ones marked';
  V['g3-off-topic'] = (q, m) => one(q, o => !FITS[m.topic].test(o)) ? '' : 'expected the idea that does not fit';
  V['g3-add-web'] = (q, m) => H.has(q.fig, m.topic) && one(q, o => FITS[m.topic].test(o)) ? '' : 'expected the idea that fits';
  V['g3-idea-tf'] = (q, m) => H.has(q.fig, m.idea) && FITS[m.topic].test(text(m.idea)) === q.answer ? '' : 'true/false is wrong for ' + m.idea;
  V['g3-sources'] = q => picks(q, o => GOODSRC.test(o)) ? '' : 'the good sources are not the ones marked';
  V['g3-bad-source'] = q => one(q, o => !GOODSRC.test(o)) ? '' : 'expected the source that is not good';
  V['g3-source-tf'] = (q, m) => GOODSRC.test(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-need-more'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const n = d.querySelectorAll('.sent').length; return n >= 1 && mk(q) === String(Math.max(0, 3 - n)) ? '' : 'expected ' + (3 - n); };
  V['g3-order-steps'] = q => { const s = q.items.map(text), [o, i] = placeOf(s[0]); return o && s.every((x, j) => o[i + j] === x) ? '' : 'the steps are not in a known right order'; };
  V['g3-first-step'] = q => { const [o] = placeOf(text(q.options[0])), at = q.options.map(x => o ? o.indexOf(text(x)) : -1); return o && at.every(i => i >= 0) && mk(q) === o[Math.min(...at)] ? '' : 'expected the step that comes first'; };
  V['g3-sort-ideas'] = q => q.pairs.every(p => HEAD[text(p[0])] === text(p[1])) ? '' : 'an idea is under the wrong heading';
  V['g3-which-group'] = (q, m) => mk(q) === HEAD[text(m.idea)] ? '' : 'expected ' + HEAD[text(m.idea)];
  V['g3-plan-type'] = (q, m) => one(q, o => o.includes(PLAN[m.form])) ? '' : 'expected the plan for ' + m.form;
})();
