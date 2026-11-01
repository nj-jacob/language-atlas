/* Grade 5 answer checks: how texts work (grade5/chapters/features.js). The checker keeps its own key, like a second marker. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  /* cause and effect: each cause and the effect it leads to */
  const EFFECT = { 'Every light on Birch Street went dark.': 'Daniel found a flashlight.', 'The arena went black.': 'The coach led the team slowly to the exit.', 'Wetlands soak up rain.': 'They help stop floods.',
    'Wetlands clean the water and give shelter.': 'Frogs, ducks and turtles have homes.', 'Some grains fall back into the water.': 'New plants grow the next year.', 'The grains are knocked gently.': 'The plants are not harmed.',
    'The late bus is cut.': 'Students quit clubs and teams.', 'The playground has smooth ramps.': 'Kids who use wheelchairs can reach the top.',
    'The truck goes too fast.': 'A wave under the ice can crack it.', 'The lake freezes thick.': 'Trucks can drive across it.',
    'There are few trees or hills on the tundra.': 'Travellers use inuksuit to find their way.', 'Each inuksuk was built for a reason.': 'People are taught not to knock one down.',
    'The water turns to steam.': 'The sap becomes thicker and sweeter.', 'Nights are cold and days are warm.': 'Sap flows inside the trees.',
    'Extra vinegar was poured in.': 'The foam overflowed onto the next table.', 'There is no crosswalk, and cars drive fast.': 'A driver had to stop suddenly.',
    'A crosswalk has flashing lights.': 'Drivers slow down and watch for children.', 'Monarch caterpillars eat only milkweed.': 'Planting milkweed helps monarchs grow.',
    'The butterflies stay close together.': 'They keep warm all winter.', 'Her father hurt his ankle.': 'Ada had to light the lamp.', 'The lamp blazed to life.': 'The captain steered away from the rocks.' };
  const CAUSE = Object.fromEntries(Object.entries(EFFECT).map(e => [e[1], e[0]]));
  V['g5-effect'] = (q, m) => mk(q) === EFFECT[text(m.c)] ? '' : 'expected ' + EFFECT[text(m.c)];
  V['g5-cause-of'] = (q, m) => mk(q) === CAUSE[text(m.e)] ? '' : 'expected ' + CAUSE[text(m.e)];
  V['g5-cause'] = q => q.pairs.every(p => EFFECT[text(p[0])] === text(p[1])) ? '' : 'a cause is matched to the wrong effect';
  V['g5-cause-tf'] = (q, m) => { const right = EFFECT[text(m.c)] === text(m.e); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* a signal word joins a cause to its effect */
  V['g5-signal'] = q => { const sig = w => /^(so|if|because|as|since)$/i.test(w), ok = q.tiles.map(text).filter(sig); return ok.length === 1 && mk(q) === ok[0] && text(q.fig).includes(ok[0]) ? '' : 'expected the signal word'; };
  const PREDICTS = { 'Save the Late Bus': 'quit clubs', 'A Crosswalk for Elm Street': 'slow down' };
  V['g5-persuade-cause'] = (q, m) => mk(q).includes(PREDICTS[m.t]) && q.options.filter(o => text(o).includes(PREDICTS[m.t])).length === 1 ? '' : 'expected the effect the letter predicts';
  /* text features and their jobs */
  const JOB = { preface: 'before it begins', glossary: 'explains key words', index: 'topics and their pages', 'table of contents': 'lists the chapters', caption: 'about a picture', sidebar: 'extra facts in a box',
    heading: 'next part', 'bold word': 'key word' };
  const jobOf = s => Object.keys(JOB).find(f => s.includes(JOB[f]));
  V['g5-feature'] = (q, m) => mk(q).includes(JOB[m.f]) ? '' : 'expected the job of a ' + m.f;
  V['g5-feature-tf'] = (q, m) => { const right = jobOf(text(m.job)) === m.f; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-match-features'] = q => q.pairs.every(p => jobOf(text(p[1])) === text(p[0])) ? '' : 'a feature is matched to the wrong job';
  const WHERE = { 'what the word bog means': 'glossary', 'which page tells about turtles': 'index', 'why the author wrote the book': 'preface', 'what chapter 3 is called': 'table of contents', 'what a photo shows': 'caption',
    'what the next section is about': 'heading', 'the meaning of the word evaporator': 'glossary', 'which pages talk about maple syrup': 'index', 'how many chapters the book has': 'table of contents', 'who the book was written for': 'preface' };
  V['g5-where'] = (q, m) => mk(q) === WHERE[text(m.want)] ? '' : 'expected ' + WHERE[text(m.want)];
  /* visuals: amounts in a bar graph, places on a map, parts on a diagram, steps in a flow chart, looks in a photo, dates on a timeline */
  const SHOW = { 'how many students rode the bus each month': 'a bar graph', 'which sport the class likes best': 'a bar graph', 'where the wetlands are in Ontario': 'a map', 'the route of the monarchs to Mexico': 'a map',
    'the parts of a canoe': 'a labelled diagram', 'the parts of a butterfly': 'a labelled diagram', 'the steps to make maple syrup, in order': 'a flow chart', 'the steps to harvest manoomin, in order': 'a flow chart',
    'what a marsh looks like': 'a photo with a caption', 'what an inuksuk looks like': 'a photo with a caption', 'the dates of each part of a long journey': 'a timeline', 'the years each province joined Canada': 'a timeline' };
  const FOR = { 'a bar graph': 'amounts', 'a map': 'places', 'a labelled diagram': 'parts', 'a flow chart': 'steps', 'a photo with a caption': 'looks like', 'a timeline': 'when' };
  V['g5-visual'] = (q, m) => mk(q) === SHOW[m.show] ? '' : 'expected ' + SHOW[m.show];
  V['g5-visual-job'] = (q, m) => mk(q).includes(FOR[m.v]) ? '' : 'expected what ' + m.v + ' is for';
  V['g5-visual-tf'] = (q, m) => { const right = SHOW[m.show] === m.use; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-match-visual'] = q => q.pairs.every(p => text(p[1]).includes(FOR[text(p[0])])) ? '' : 'a visual is matched wrong';
  /* style: each example, what the writer did, and words from the reason */
  const STYLE = { 'Then, silence.': ['short sentence', 'dramatic'], 'Snow on the roof, snow on the road, snow on my nose.': ['repeated', 'rhythm'], 'I could not believe it. I made the team. Me!': ['excited voice', 'narrator feels'],
    'Wetlands soak up rain like a sponge.': ['comparison', 'understand a fact'], 'The crowd roared, stomped and cheered.': ['action words', 'how loud'], 'Thwack!': ['sound word', 'hear the moment'],
    'Please vote to add a crosswalk on Elm Street this year.': ['request', 'exactly what to do'], 'Her legs burned, and the wind howled through the cracks.': ['strong verbs', 'hard and scary'],
    'First, drill a hole. Next, collect the sap. Then boil it.': ['order words', 'easy to follow'], 'Inuit have built inuksuit across the Arctic for hundreds of years.': ['factual', 'teach facts'] };
  V['g5-style'] = (q, m) => mk(q).includes(STYLE[m.ex][1]) ? '' : 'expected the reason with "' + STYLE[m.ex][1] + '"';
  V['g5-style-what'] = (q, m) => mk(q).includes(STYLE[m.ex][0]) ? '' : 'expected "' + STYLE[m.ex][0] + '"';
  V['g5-match-style'] = q => q.pairs.every(p => text(p[1]).includes(STYLE[text(p[0])][0])) ? '' : 'an example is matched wrong';
  V['g5-style-tf'] = (q, m) => { const right = text(m.said).includes(STYLE[m.ex][1]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const FIT = { 'a letter to the mayor': 'I am writing to ask', 'an information text about monarchs': 'more than 4000', 'a scary story': 'Something moved in the dark', 'a funny story': 'burped proudly',
    'a poem about rain': 'drums softly', 'a how-to guide': 'First, drill' };
  V['g5-style-fit'] = (q, m) => mk(q).includes(FIT[m.form]) ? '' : 'expected the sentence that suits ' + m.form;
  /* imagery: each line and the sense that notices it */
  const SENSE = { 'The sky turns the colour of a bruise.': 'sight', 'Thunder rolls like boulders down a hill.': 'hearing', 'Then, silence. The air smells clean and green.': 'smell', 'The cocoa warmed my frozen fingers.': 'touch',
    'The bannock tasted sweet and buttery.': 'taste', 'Gravel crunched under our boots.': 'hearing', 'The lake glittered like broken glass.': 'sight', 'Wood smoke drifted from the cabin.': 'smell', 'The ice was smooth and cold under my hand.': 'touch',
    'The ice stretched ahead like a white highway.': 'sight', 'Halfway across, they heard a long, low boom.': 'hearing', 'The puck stings your hand.': 'touch', 'The kitchen smelled of warm maple syrup.': 'smell',
    'The wild rice tasted nutty and smoky.': 'taste', 'The snow squeaked under my boots.': 'hearing', 'The sour apple made my mouth pucker.': 'taste', 'Pink foam shot up like a fountain.': 'sight', 'The pine needles smelled sharp and fresh.': 'smell' };
  const VERB = { see: 'sight', hear: 'hearing', smell: 'smell', taste: 'taste', feel: 'touch' };
  V['g5-sense'] = (q, m) => mk(q) === SENSE[m.line] ? '' : 'expected ' + SENSE[m.line];
  V['g5-match-senses'] = q => q.pairs.every(p => SENSE[text(p[0])] === text(p[1])) ? '' : 'a line is matched to the wrong sense';
  V['g5-sense-line'] = q => { const s = VERB[text(q.q).match(/helps you (\w+) it/)[1]], ok = q.options.map(text).filter(o => SENSE[o] === s); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the line for ' + s; };
  V['g5-sense-tf'] = (q, m) => { const right = SENSE[m.line] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* humour: each line and its trick */
  const TRICK = { 'Ten minutes later, there was batter on the ceiling.': 'exaggeration', 'The smoke alarm sang us its loudest song.': 'a thing acting like a person', 'Biscuit had the best breakfast of all.': 'a surprise ending',
    'Just as she turned to leave, my volcano gave a loud burp.': 'a thing acting like a person', 'Always measure your vinegar.': 'a surprise ending',
    'My little brother is so loud that people in Vancouver can hear him.': 'exaggeration', 'The toaster coughed out a black slice of bread.': 'a thing acting like a person', 'We searched the whole house for my glasses. They were on my head.': 'a surprise ending',
    'I was so hungry I could have eaten a moose.': 'exaggeration', 'Our old car groaned and grumbled up the hill.': 'a thing acting like a person', 'Grandpa said he would fix the roof in a jiffy. That was three summers ago.': 'a surprise ending',
    'The line for the water slide was a hundred kilometres long.': 'exaggeration', 'My alarm clock yelled at me to get up.': 'a thing acting like a person' };
  V['g5-funny'] = (q, m) => mk(q) === TRICK[m.line] ? '' : 'expected ' + TRICK[m.line];
  V['g5-funny-line'] = (q, m) => { const ok = q.options.map(text).filter(o => TRICK[o] === m.trick); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the line with ' + m.trick; };
  V['g5-funny-tf'] = (q, m) => { const right = TRICK[m.line] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-match-funny'] = q => q.pairs.every(p => TRICK[text(p[0])] === text(p[1])) ? '' : 'a line is matched to the wrong trick';
})();
