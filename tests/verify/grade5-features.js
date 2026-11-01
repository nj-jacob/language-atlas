/* Grade 5 answer checks: how texts work (grade5/chapters/features.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const JOB = { preface: 'before it begins', glossary: 'explains key words', index: 'topics and their pages', 'table of contents': 'lists the chapters', caption: 'about a picture', sidebar: 'extra facts in a box' };
  V['g5-feature'] = (q, m) => mk(q).includes(JOB[m.f]) ? '' : 'expected the job of a ' + m.f;
  const WHERE = { 'what the word bog means': 'glossary', 'which page tells about turtles': 'index', 'why the author wrote the book': 'preface', 'what chapter 3 is called': 'table of contents', 'what a photo shows': 'caption' };
  V['g5-where'] = (q, m) => mk(q) === WHERE[text(m.want)] ? '' : 'expected ' + WHERE[text(m.want)];
  const EFFECT = { 'Every light on Birch Street went dark.': 'Daniel found a flashlight.', 'The arena went black.': 'The coach led the team slowly to the exit.', 'Wetlands soak up rain.': 'They help stop floods.',
    'Wetlands clean the water and give shelter.': 'Frogs, ducks and turtles have homes.', 'Some grains fall back into the water.': 'New plants grow the next year.', 'The grains are knocked gently.': 'The plants are not harmed.',
    'The truck goes too fast.': 'A wave under the ice can crack it.', 'The lake freezes thick.': 'Trucks can drive across it.',
    'There are few trees or hills on the tundra.': 'Travellers use inuksuit to find their way.', 'Each inuksuk was built for a reason.': 'People are taught not to knock one down.',
    'The water turns to steam.': 'The sap becomes thicker and sweeter.', 'Nights are cold and days are warm.': 'Sap flows inside the trees.',
    'Extra vinegar was poured in.': 'The foam overflowed onto the next table.', 'There is no crosswalk, and cars drive fast.': 'A driver had to stop suddenly.',
    'A crosswalk has flashing lights.': 'Drivers slow down and watch for children.', 'Monarch caterpillars eat only milkweed.': 'Planting milkweed helps monarchs grow.',
    'The butterflies stay close together.': 'They keep warm all winter.', 'Her father hurt his ankle.': 'Ada had to light the lamp.', 'The lamp blazed to life.': 'The captain steered away from the rocks.' };
  V['g5-cause'] = q => q.pairs.every(p => EFFECT[text(p[0])] === text(p[1])) ? '' : 'a cause is matched to the wrong effect';
  V['g5-persuade-cause'] = q => /quit clubs/.test(mk(q)) && /If the late bus is cut/.test(text(q.fig)) ? '' : 'expected the effect the letter warns about';
  const SHOW = { 'how many students rode the bus each month': 'a bar graph', 'where the wetlands are in Ontario': 'a map', 'the parts of a canoe': 'a labelled diagram', 'the steps to harvest manoomin, in order': 'a numbered flow chart', 'what a marsh looks like': 'a photo with a caption' };
  V['g5-visual'] = (q, m) => mk(q) === SHOW[m.show] ? '' : 'expected ' + SHOW[m.show];
  const SENSE = { 'The sky turns the colour of a bruise.': 'sight', 'Thunder rolls like boulders down a hill.': 'hearing', 'Then, silence. The air smells clean and green.': 'smell', 'The cocoa warmed my frozen fingers.': 'touch',
    'The bannock tasted sweet and buttery.': 'taste', 'Gravel crunched under our boots.': 'hearing', 'The lake glittered like broken glass.': 'sight', 'Wood smoke drifted from the cabin.': 'smell', 'The ice was smooth and cold under my hand.': 'touch' };
  V['g5-sense'] = (q, m) => mk(q) === SENSE[m.line] ? '' : 'expected ' + SENSE[m.line];
  V['g5-match-senses'] = q => q.pairs.every(p => SENSE[text(p[0])] === text(p[1])) ? '' : 'a line is matched to the wrong sense';
  const TRICK = { 'Ten minutes later, there was batter on the ceiling.': 'exaggeration', 'The smoke alarm sang us its loudest song.': 'a thing acting like a person', 'Biscuit had the best breakfast of all.': 'a surprise ending',
    'My little brother is so loud that people in Vancouver can hear him.': 'exaggeration', 'The toaster coughed out a black slice of bread.': 'a thing acting like a person', 'We searched the whole house for my glasses. They were on my head.': 'a surprise ending' };
  V['g5-funny'] = (q, m) => mk(q) === TRICK[m.line] ? '' : 'expected ' + TRICK[m.line];
  const WHY = { 'Then, silence.': 'dramatic', 'Snow on the roof, snow on the road, snow on my nose.': 'rhythm', 'I could not believe it. I made the team. Me!': 'narrator feels', 'Wetlands soak up rain like a sponge.': 'understand a fact', 'The crowd roared, stomped and cheered.': 'how loud' };
  V['g5-style'] = (q, m) => mk(q).includes(WHY[m.ex]) ? '' : 'expected the reason with "' + WHY[m.ex] + '"';
})();
