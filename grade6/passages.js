/* Grade 6 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;

  /* small chart helpers for this grade's figures (line art in the house classes only; each figure is 300 wide) */
  function T(x, y, s, cls, anchor) { return '<text class="' + (cls || 'l') + '" x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + s + '</text>'; }
  function lines(x, y, a, cls, anchor, lh) { return [].concat(a).map(function (s, i) { return T(x, y + i * (lh || 13), s, cls, anchor); }).join(''); }
  var G = {
    T: T,
    /* horizontal bars: rows [[label, value, shown value]], max = the value of a full bar; o.x0 where bars start, o.hl the row to hatch */
    bars: function (rows, max, o) {
      o = o || {};
      var x0 = o.x0 || 110, w = 290 - x0 - (o.pad || 40), gap = o.gap || 24, y = o.top || 6;
      return rows.map(function (r, i) {
        var yy = y + i * gap, bw = Math.max(2, r[1] / max * w);
        return T(x0 - 6, yy + 12, r[0], 'l', 'end') + '<rect class="' + (o.hl === i ? 'h' : 'k') + '" x="' + x0 + '" y="' + yy + '" width="' + bw.toFixed(1) + '" height="' + (gap - 9) + '"/>' +
          T((x0 + bw + 5).toFixed(1), yy + 12, r[2] !== undefined ? r[2] : r[1], 'n');
      }).join('');
    },
    /* columns on a base line: rows [[label or [two lines], value, shown value]]; o.base the base line's y, o.h the tallest column */
    cols: function (rows, max, o) {
      o = o || {};
      var base = o.base || 120, h = o.h || 100, x0 = o.x0 || 14, cw = (296 - x0) / rows.length;
      return '<path class="t" d="M' + x0 + ' ' + base + ' H296"/>' + rows.map(function (r, i) {
        var bh = r[1] / max * h, x = x0 + i * cw + cw * 0.2, w = cw * 0.6, c = (x + w / 2).toFixed(1);
        return '<rect class="' + (o.hl === i ? 'h' : 'k') + '" x="' + x.toFixed(1) + '" y="' + (base - bh).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + bh.toFixed(1) + '"/>' +
          T(c, (base - bh - 4).toFixed(1), r[2] !== undefined ? r[2] : r[1], 'n', 'middle') + lines(c, base + 14, r[0], 'l', 'middle');
      }).join('');
    },
    /* a time line down the figure: rows [[date, text or [two lines]]] */
    time: function (rows, o) {
      o = o || {};
      var x = o.x || 56, y = o.top || 12, gap = o.gap || 32;
      return '<path class="t" d="M' + x + ' ' + (y - 8) + ' V' + (y + (rows.length - 1) * gap + 8) + '"/>' + rows.map(function (r, i) {
        var yy = y + i * gap;
        return '<circle class="' + (o.hl === i ? 'a' : 'k') + '" cx="' + x + '" cy="' + yy + '" r="4"/>' + T(x - 10, yy + 4, r[0], 'lb', 'end') + lines(x + 12, yy + 4, r[1]);
      }).join('');
    },
    /* boxes joined by arrows, top to bottom: rows [text or [two lines]] */
    flow: function (rows, o) {
      o = o || {};
      var x = o.x || 30, w = o.w || 240, bh = o.bh || 30, gap = o.gap || 14, y = o.top || 2;
      return rows.map(function (r, i) {
        var yy = y + i * (bh + gap), a = [].concat(r);
        return '<rect class="' + (o.hl === i ? 'a' : 'k') + '" x="' + x + '" y="' + yy + '" width="' + w + '" height="' + bh + '" rx="6"/>' + lines(x + w / 2, yy + bh / 2 + 4 - (a.length - 1) * 6.5, a, 'l', 'middle') +
          (i < rows.length - 1 ? D.arrow(x + w / 2, yy + bh + 1, x + w / 2, yy + bh + gap - 1, 't') : '');
      }).join('');
    },
    /* a light bulb symbol (circle with a cross) for circuit diagrams */
    bulb: function (x, y) { return '<circle class="k" cx="' + x + '" cy="' + y + '" r="9"/><path class="k" d="M' + (x - 6) + ' ' + (y - 6) + ' L' + (x + 6) + ' ' + (y + 6) + ' M' + (x + 6) + ' ' + (y - 6) + ' L' + (x - 6) + ' ' + (y + 6) + '"/>'; },
    /* a moon: an outline with its dark half hatched ('r' or 'l' side) */
    moon: function (x, y, side) { return '<circle class="k" cx="' + x + '" cy="' + y + '" r="10"/><path class="h" d="M' + x + ' ' + (y - 10) + ' A10 10 0 0 ' + (side === 'l' ? 0 : 1) + ' ' + x + ' ' + (y + 10) + ' Z"/>'; }
  };

  P.add({
    id: 'g6-wing', subject: 'science', form: 'Explanation',
    title: 'How a Wing Lifts',
    deck: 'The four forces that carry a plane, and the shape that makes it fly',
    hero: {
      photo: 'g6-floatplane.jpg', credit: 'Photo: D. Gordon E. Robertson, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 60%',
      side: { w: 330, view: '0 0 330 200' },
      tall: 200,
      cap: 'A bush plane on floats at Temagami, Ontario. Four forces act on a plane in flight: to stay up, lift must balance weight; to move forward, thrust must beat drag.',
      art: '<g transform="translate(165 100) scale(.62) translate(-367 -90)">' +
        '<path class="k" d="M262 96 Q252 96 252 90 Q252 82 268 80 L440 80 Q472 82 482 92 Q472 102 440 104 L276 104 Q264 104 262 96 Z"/>' +
        '<path class="k" d="M270 80 L254 46 L274 46 L298 80 M258 92 L230 88 L232 96 L262 98"/><path class="k" d="M326 98 Q370 92 420 98 Q370 108 326 104 Z"/>' +
        '<path class="t" d="M452 84 Q466 86 470 92 L452 92 Z"/></g>' +
        D.arrow(165, 82, 165, 18, 'a') + D.arrow(165, 118, 165, 182, 'a') + D.arrow(240, 101, 318, 101, 'a') + D.arrow(92, 101, 14, 101, 'a') +
        '<text class="lb" x="175" y="26">lift</text><text class="lb" x="175" y="180">weight</text><text class="lb" x="318" y="90" text-anchor="end">thrust</text><text class="lb" x="14" y="90">drag</text>'
    },
    body: [
      'A large passenger jet can weigh more than 300&nbsp;000 kilograms at take-off, yet it rises into the sky as smoothly as a gull. There is no magic in it. A plane flies because four forces push and pull on it all the time.',
      { h: 'Four forces' },
      '<b>Weight</b> is the pull of gravity toward the ground. <b>Lift</b> is the upward push that holds the plane up. <b>Thrust</b>, made by the engines or propellers, moves the plane forward, while <b>drag</b>, the push of the air against the plane, tries to slow it down. To climb, a plane needs more lift than weight. To speed up, it needs more thrust than drag.',
      { fig: '<path class="h" d="M40 88 Q64 56 140 54 Q222 56 272 92 Q200 94 140 96 Q74 98 40 88 Z"/>' +
          D.arrow(0, 52, 60, 40, 't') + '<path class="t" d="M60 40 Q150 22 240 50 Q270 60 300 66"/><path class="t" d="M0 72 Q30 66 50 64 M0 112 Q150 108 300 116"/>' +
          D.arrow(274, 96, 298, 124, 'a') + D.arrow(250, 98, 270, 130, 'a') + D.arrow(150, 50, 150, 6, 'a') +
          '<text class="lb" x="126" y="14">lift</text>' + '<text class="l" x="196" y="16">faster air,</text><text class="l" x="196" y="30">lower pressure</text>' + '<text class="l" x="4" y="136">slower air, higher pressure</text>' +
          '<text class="l" x="196" y="146">air pushed down</text>',
        tall: 150, cap: 'An airfoil from the side. The air moves faster over the curved top.' },
      { h: 'The secret is in the wing' },
      'Look at a wing from the side and you will see its special shape, called an <b>airfoil</b>. The top is curved and the bottom is flatter, and the front edge is tilted up slightly. As the plane moves, the wing splits the air. Air flowing over the curved top speeds up, and its pressure drops. Below the wing, the pressure stays higher. At the same time, the tilted wing pushes air downward, and the air pushes the wing up in return. Together, these effects create lift.',
      'The faster a plane moves, the more lift its wings make. That is why a jet races down a long runway before its nose lifts off.',
      { box: 'Try it', text: 'Hold a strip of paper just under your bottom lip so that it droops. Blow hard across the top. The paper rises, because the fast-moving air above it has lower pressure than the still air below.' },
      { h: 'Wings for every job' },
      'Engineers shape each wing for its job. A glider has long, thin wings that make plenty of lift at low speed, so it can soar for hours on rising warm air. Bush planes in northern Canada have wide wings that lift them off short gravel strips and small lakes. A fighter jet has short, swept-back wings that slice through the air at high speed.',
      'Birds solved the problem of flight long before people did. Watch a Canada goose take off from a pond: its wings change shape with every beat, adjusting lift and thrust in ways engineers still study today.',
      { box: 'A Canadian first', text: 'In the 1930s, Elsie MacGill became one of the first women in the world to work as an aircraft engineer. At a factory in Fort William, now part of Thunder Bay, she designed a training plane and led the team that built more than 1400 fighter planes during the Second World War.' }
    ],
    guide: { before: 'Ask: what keeps a plane up? Push your flat hand through the air, then tilt it up slightly: feel the push. Teach the four forces with the top picture, and the word <b>airfoil</b> (air + foil, a thin blade).',
      after: 'Do the “Try it” test together. Then talk about it: which wing would you choose for a plane that lands on a small northern lake, and why?' },
    words: [['airfoil', 'the curved shape of a wing that makes lift'], ['thrust', 'the force that moves a plane forward'], ['drag', 'the force of air that slows a plane down']],
    qs: [
      { k: 'table', code: 'C1.4', q: 'Use the picture at the top of the passage. Fill in the chart.', cols: ['Force', 'What it does'],
        rows: [['Lift', null], [null, 'Pulls the plane toward the ground'], ['Thrust', null], [null, 'Tries to slow the plane down']],
        a: [[null, 'Pushes the plane up'], ['Weight', null], [null, 'Moves the plane forward'], ['Drag', null]] },
      { k: 'choice', code: 'C3.3', half: true, q: 'What must be true for a plane to climb?',
        opts: ['more thrust than lift', 'more lift than weight', 'more drag than thrust', 'less lift than weight'], a: 1 },
      { k: 'choice', code: 'C2.4', half: true, q: 'What would help you understand <b>airfoil</b>?',
        opts: ['skip the paragraph', 'reread it and study the wing diagram', 'read faster', 'read only the title'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Use the text and the wing diagram. Explain two ways a wing makes lift.',
        a: 'The air over the curved top moves faster, so the pressure above the wing is lower than below it. The tilted wing also pushes air down, and the air pushes the wing up.', look: 'both ideas: lower pressure above the wing, and air pushed down pushing the wing up' },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which text pattern does the section “Wings for every job” use?',
        opts: ['compare and contrast', 'problem and solution', 'time order', 'question and answer'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Swept-back</b> wings …',
        opts: ['angle back toward the tail', 'are cleaned after each flight', 'fold up on the ground', 'point straight out'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does a jet need a long runway when a bush plane can take off from a small lake? Use details from the text.',
        a: 'Lift grows with speed. A jet is heavy and needs a lot of speed, so it needs a long runway. A bush plane has wide wings that make enough lift at a lower speed.', look: 'the link between speed and lift, and the bush plane’s wide wings' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The author begins with a gull and ends with a Canada goose. Why do you think the author mentions birds?',
        a: 'Birds are familiar, so they help readers picture flight. Ending with the goose shows that nature solved flight first and still teaches engineers.', look: 'a reason linked to the reader (a familiar picture) or to the message (nature as the first engineer)' }
    ]
  });

  P.add({
    id: 'g6-classify', subject: 'science', form: 'Explanation',
    title: 'Sorting the Living World',
    deck: 'How scientists group millions of living things, and why it matters',
    hero: {
      photo: 'g6-specimen-drawer.jpg', credit: 'Photo: Siobhan Leachman, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A drawer of butterfly and moth specimens in a science collection. Each one is labelled with its name and where it was found.'
    },
    body: [
      'Scientists have named about two million kinds of living things, and millions more are still waiting to be discovered. To make sense of so much <b>biodiversity</b>, the variety of life on Earth, scientists sort living things into groups. This sorting is called <b>classification</b>.',
      { h: 'From big groups to small' },
      'Classification works like the address on a letter. An address starts with a country, then a province, a city, a street and, finally, one house. In the same way, scientists start with very large groups called kingdoms, such as plants, animals and fungi. Each kingdom is split into smaller and smaller groups. The smallest group is a species: living things so alike that they can have young together.',
      { fig: '<rect class="k" x="10" y="2" width="280" height="24" rx="4"/><rect class="k" x="30" y="32" width="240" height="24" rx="4"/><rect class="k" x="50" y="62" width="200" height="24" rx="4"/>' +
          '<rect class="k" x="70" y="92" width="160" height="24" rx="4"/><rect class="a" x="90" y="122" width="120" height="24" rx="4"/>' +
          G.T(150, 18, '<tspan font-weight="700">Kingdom</tspan> animals', 'l', 'middle') + G.T(150, 48, '<tspan font-weight="700">Phylum</tspan> animals with backbones', 'l', 'middle') +
          G.T(150, 78, '<tspan font-weight="700">Class</tspan> mammals', 'l', 'middle') + G.T(150, 108, '<tspan font-weight="700">Order</tspan> meat eaters', 'l', 'middle') +
          G.T(150, 138, '<tspan font-weight="700">Species</tspan> grey wolf', 'l', 'middle'),
        tall: 150, cap: 'Where the grey wolf belongs. Each step down is a smaller group whose members share more features.' },
      'To decide where a living thing belongs, scientists study its features. Does it have a backbone? Animals with a backbone are vertebrates. Animals without one, such as insects, worms and snails, are <b>invertebrates</b>. In fact, more than nine out of ten animal species are invertebrates. Today, scientists also compare DNA, the instructions inside every cell, to find out which living things are closely related.',
      { h: 'Two names for every species' },
      'Every species has a scientific name made of two Latin words. The grey wolf is <i>Canis lupus</i>. The first word, <i>Canis</i>, names its close group, which it shares with the coyote, <i>Canis latrans</i>. Common names can be confusing: the bird Canadians call a robin is not the same bird as the robin in Britain. A scientific name means the same thing to scientists everywhere, whatever language they speak.',
      { box: 'Did you know?', text: 'The Swedish scientist Carl Linnaeus made the two-name system popular in the 1750s. Long before that, Indigenous peoples had detailed ways of naming and grouping plants and animals, based on how they look, where they live and how they can be used.' },
      'Classification helps scientists track which species are thriving and which are at risk. When a new species is found, sorting it tells us what it is related to and how it might live. A drawer of carefully labelled butterflies may look old-fashioned, but it is a record of life on Earth.'
    ],
    guide: { before: 'Sort a handful of objects (buttons, shells or kitchen items) by one feature, then split each group again. Teach <b>biodiversity</b>, <b>classification</b> and the prefix in- (not).',
      after: 'If you discovered a new insect, what features would you look at first to sort it? Which boxes in the diagram would it share with the grey wolf?' },
    words: [['biodiversity', 'the variety of living things in a place or on Earth'], ['classification', 'sorting things into groups by their features'], ['invertebrates', 'animals without a backbone']],
    qs: [
      { k: 'table', code: 'C1.4', q: 'Use the diagram. Fill in the chart.', cols: ['Level', 'Group for the grey wolf'],
        rows: [['Kingdom', null], [null, 'mammals'], ['Species', null]],
        a: [[null, 'animals'], ['Class', null], [null, 'grey wolf']] },
      { k: 'choice', code: 'B2.1', half: true, q: 'The prefix <b>in-</b> in <i>invertebrate</i> means …',
        opts: ['not', 'inside', 'again', 'many'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'In “which it shares with the coyote,” the word <b>it</b> means …',
        opts: ['the grey wolf', 'the coyote', 'Latin', 'the robin'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Which sentence best states the main idea?',
        opts: ['Scientists sort living things into groups to understand and protect life.', 'Wolves and coyotes are related.', 'Carl Linnaeus lived in Sweden.', 'Butterflies are kept in drawers.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Why does the author compare classification to the address on a letter?',
        a: 'An address goes from big (a country) to small (one house), just as classification goes from a kingdom down to one species. The comparison makes a hard idea easy to picture.', look: 'the big-to-small link, and that the comparison helps the reader' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why is a scientific name more useful than a common name? Use an example from the text.',
        a: 'It means the same thing everywhere. The name robin is used for different birds in Canada and Britain, but a scientific name names only one species.', look: 'one name everywhere, with the robin example' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the section “From big groups to small” in two sentences.',
        a: 'Scientists sort living things from very large groups, called kingdoms, down to smaller and smaller groups. The smallest group is a species, living things alike enough to have young together.', look: 'the big-to-small idea and what a species is, in the child’s own words' }
    ]
  });

  P.add({
    id: 'g6-garlic-mustard', subject: 'science', form: 'Report',
    title: 'A Plant Out of Place',
    deck: 'How garlic mustard spreads through Ontario woods, and how people fight back',
    hero: {
      photo: 'g6-garlic-mustard.jpg', credit: 'Photo: Robert Flogaus-Faust, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Garlic mustard on a forest floor in spring. One plant can make hundreds of seeds.'
    },
    body: [
      'Walk through an Ontario woodland in May and you might smell garlic. Look down and you may see a low plant with small white flowers. This is garlic mustard. It looks harmless, but it is one of the most serious threats to Ontario’s forests.',
      { h: 'An unwanted guest' },
      'Garlic mustard is an <b>invasive species</b>: a living thing brought from another part of the world that spreads quickly and harms its new home. European settlers brought it to North America in the 1800s to use as a cooking herb. In Europe, insects and diseases keep it in check. Here, almost nothing eats it, so it spreads with no natural limits.',
      'Each plant can produce hundreds of tiny seeds, and the seeds can survive in the soil for ten years or more. They stick to boots, bike tires and animal fur, travelling along trails into new parts of the forest.',
      { fig: G.flow([['Year 1: a low cluster of leaves', 'stays green all winter'], ['Year 2: a tall stalk with', 'white flowers, then seed pods'], ['Seeds fall and wait in the soil', 'for up to 10 years']], { x: 20, w: 236, bh: 34, gap: 14 }) +
          '<path class="d" d="M256 115 H280 V19 H262"/>' + D.arrow(268, 19, 258, 19, 't'),
        tall: 132, cap: 'The life cycle of garlic mustard. It lives for two years, but its seeds can wait much longer.' },
      { h: 'Crowding out the natives' },
      'Garlic mustard grows early in spring, before most other plants. It forms thick carpets that shade out <b>native</b> wildflowers, the plants that have always grown here, such as trillium and wild ginger. Its roots also release chemicals that harm the fungi trees need. With fewer native plants, there is less food for insects, and so for the birds and animals that eat them.',
      'Some insects are tricked, too. The West Virginia white, a rare Ontario butterfly, lays its eggs on garlic mustard by mistake, because the plant smells like the native plants it usually uses. Its caterpillars hatch on the wrong food and cannot survive.',
      { h: 'Pulling together' },
      'Because the seeds last so long, getting rid of garlic mustard takes patience. Volunteers in parks across Ontario hold “pull parties” each spring. They pull the plants out by the root before the seeds form, then bag them so the seeds cannot spread. Scientists are also testing tiny weevils from Europe that feed only on garlic mustard, to see whether they can be released safely.',
      { box: 'What you can do', text: 'Brush off your boots, bike and dog before you leave a trail. If you pull garlic mustard, put it in the garbage, not the compost.' }
    ],
    guide: { before: 'Show the photo. Teach <b>invasive species</b> and <b>native</b>. Ask: how could a plant from far away end up in a Canadian forest?',
      after: 'Is it fair to call a plant “bad”? Talk about how garlic mustard is a normal part of nature in Europe but a problem here.' },
    words: [['invasive species', 'a living thing from somewhere else that spreads fast and harms its new home'], ['native', 'living naturally in a place for a very long time']],
    qs: [
      { k: 'choice', code: 'C1.3', q: 'Which text pattern do the last two sections use together?',
        opts: ['problem and solution', 'compare and contrast', 'time order', 'question and answer'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Fact about garlic mustard', 'How it helps the plant spread'],
        rows: [['Almost nothing eats it here.', null], ['Its seeds stick to boots and fur.', null], ['It grows early in spring.', null]],
        a: [[null, 'Nothing keeps it in check, so it spreads with no limit.'], [null, 'The seeds travel along trails to new places.'], [null, 'It shades out native plants before they can grow.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'The diagram shows that garlic mustard …',
        opts: ['lives for two years', 'lives for ten years', 'flowers in its first year'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Which plant is <b>native</b> to Ontario?',
        opts: ['trillium', 'garlic mustard', 'a weed from Europe'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why do volunteers pull the plants before the seeds form?',
        opts: ['so no new seeds get into the soil', 'because the flowers smell of garlic', 'so the plants can be eaten', 'because roots are easier to pull in the fall'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why must scientists test the European weevils before releasing them? Use what you learned about invasive species.',
        a: 'The weevils come from another part of the world, so they could become an invasive species themselves and harm native plants. Scientists must be sure they eat only garlic mustard.', look: 'the risk that the weevils become invasive too' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How can one plant lower the biodiversity of a whole forest? Explain the chain of effects.',
        a: 'Garlic mustard shades out native wildflowers and harms the fungi that trees need. With fewer native plants, insects lose food, and so do the birds and animals that eat the insects.', look: 'at least two links in the chain' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Think of a park, trail or yard you know. What could you do there to help, and why would it help?',
        a: 'On the trail near my school, I could brush off my boots before leaving, so seeds do not travel to a new place.', look: 'a real place, an action from the text and a reason' }
    ]
  });

  P.add({
    id: 'g6-circuits', subject: 'science', form: 'Explanation',
    title: 'One Bulb Out, All Lights Out?',
    deck: 'Series and parallel circuits, and why a whole string of lights can go dark',
    hero: {
      photo: 'g6-holiday-lights.jpg', credit: 'Photo: Oast House Archive, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Strings of holiday lights. The way the bulbs are joined decides what happens when one of them fails.'
    },
    body: [
      'It is the first cold evening of December. You plug in an old string of holiday lights, and nothing happens. One burnt-out bulb has turned off the whole string. Why would a single tiny bulb matter so much? The answer is in the way the bulbs are connected.',
      { h: 'Electricity needs a loop' },
      'Electricity flows only when it has a complete path, called a <b>circuit</b>. In a simple circuit, current flows from a battery, through a wire, through a device such as a bulb, and back to the battery. If the path is broken anywhere, the current stops. A switch works by opening a gap in the path. Materials that let current pass easily, such as copper, are called conductors. Materials that block it, such as the plastic coating on a wire, are called insulators.',
      { fig: '<path class="k" d="M14 60 V20 H130 V110 H14 V70"/><path class="k" d="M4 60 H24 M8 70 H20"/>' + G.bulb(52, 20) + G.bulb(96, 20) + G.bulb(130, 65) +
          '<path class="k" d="M170 60 V20 H290 V110 H170 V70 M210 20 V110 M250 20 V110"/><path class="k" d="M160 60 H180 M164 70 H176"/>' + G.bulb(210, 65) + G.bulb(250, 65) + G.bulb(290, 65) +
          G.T(72, 132, 'series: one path', 'lb', 'middle') + G.T(230, 132, 'parallel: many paths', 'lb', 'middle'),
        tall: 140, cap: 'Circuit diagrams. Each circle with an X is a bulb. The long and short lines are a battery.' },
      { h: 'Series: one path' },
      'In a <b>series circuit</b>, the bulbs are joined one after another in a single loop, like beads on a necklace. The current must pass through every bulb in turn. If one bulb burns out, the loop is broken and every bulb goes dark. Adding more bulbs also makes each one dimmer, because they share the same push from the battery.',
      { h: 'Parallel: many paths' },
      'In a <b>parallel circuit</b>, each bulb sits on its own branch, like the rungs of a ladder. Current can reach each bulb by a separate path. If one bulb burns out, the others stay lit. The wiring in your home is parallel, which is why you can switch off the kitchen light without the fridge turning off too.',
      'Most new strings of lights are built to keep glowing when one bulb fails. Older strings were often wired in series, which is why one loose bulb could leave a family hunting for the culprit, bulb by bulb, in the cold.',
      { h: 'Staying safe' },
      'The electricity in a wall outlet is far stronger than a battery. Never poke anything into an outlet, and keep water away from plugs and cords. A circuit breaker in your home is an automatic switch: if too much current flows, it opens the path before the wires can overheat.',
      { box: 'Try it', text: 'With a battery, wires and two small bulbs, build a series circuit, then a parallel one. Unscrew one bulb each time. Predict what will happen before you look.' }
    ],
    guide: { before: 'Ask: what happens when one bulb in a string of lights burns out? Teach <b>circuit</b> (it shares a root with circle: a loop). Draw a loop with a battery and one bulb.',
      after: 'Do the “Try it” test if you have a kit. Which kind of circuit would you choose for the lights in a hospital, and why?' },
    words: [['circuit', 'a complete path that electricity flows around'], ['series circuit', 'a circuit with only one path through every part'], ['parallel circuit', 'a circuit with a separate branch for each part']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how many paths can the current take in the series circuit?',
        opts: ['one', 'two', 'three'], a: 0 },
      { k: 'choice', code: 'C2.3', half: true, q: 'Predict: in the parallel circuit, you unscrew the middle bulb. What happens?',
        opts: ['The other two stay lit.', 'All the bulbs go out.', 'The battery stops working.'], a: 0 },
      { k: 'choice', code: 'B3.2', q: 'Which sentence from the passage is in the passive voice?',
        opts: ['The bulbs are joined one after another.', 'The current stops.', 'A switch works by opening a gap.', 'You plug in an old string of lights.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the two kinds of circuit.', cols: ['', 'Series', 'Parallel'],
        rows: [['How the bulbs are joined', null, null], ['If one bulb burns out', null, null]],
        a: [[null, 'one after another in one loop', 'each on its own branch'], [null, 'all the bulbs go dark', 'the other bulbs stay lit']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why can you switch off the kitchen light without the fridge turning off? Use the words <i>parallel</i> and <i>path</i>.',
        a: 'Home wiring is a parallel circuit. Each device is on its own branch, so breaking one path does not stop the current from reaching the others.', look: 'parallel, and a separate path or branch for each device' },
      { k: 'choice', code: 'C2.4', half: true, q: 'What best helps you understand “like the rungs of a ladder”?',
        opts: ['picture a ladder, then match it to the diagram', 'skip the sentence', 'read the title again'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In the last paragraph, the <b>culprit</b> is …',
        opts: ['the bulb causing the problem', 'a thief', 'the battery'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The author starts with a story about holiday lights instead of a definition. Why?',
        a: 'It starts with a problem many readers know, which makes them curious to find out why it happens.', look: 'hooking the reader with a familiar problem' }
    ]
  });

  P.add({
    id: 'g6-moon', subject: 'science', form: 'Explanation',
    title: 'Why the Moon Changes Shape',
    deck: 'The phases of the Moon, from new moon to full moon and back again',
    hero: {
      photo: 'g6-moon-crescent.jpg', credit: 'Photo: Bruno Rijsman, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A waxing crescent moon. The bright curve is part of the side lit by the Sun.'
    },
    body: [
      'For thousands of years, people have watched the Moon grow from a thin sliver to a bright circle and shrink away again. Many calendars, including the moon calendars of the Anishinaabe and other Indigenous nations, count time by these changes. Yet the Moon never really changes shape at all.',
      { h: 'Always half lit' },
      'The Moon makes no light of its own. Like Earth, it is a ball of rock lit by the Sun, so one half of it is always bright and the other half is dark. What changes is how much of the lit half we can see from Earth. These changing views are called the <b>phases</b> of the Moon.',
      { fig: D.arrow(4, 50, 50, 50, 't') + D.arrow(4, 80, 50, 80, 't') + D.arrow(4, 110, 50, 110, 't') + G.T(4, 36, 'sunlight', 'n') +
          '<circle class="d" cx="170" cy="80" r="58"/><circle class="k" cx="170" cy="80" r="13"/>' + G.T(170, 84, 'Earth', 'n', 'middle') +
          G.moon(112, 80) + G.moon(170, 138) + G.moon(228, 80) + G.moon(170, 22) +
          G.T(112, 106, 'new', 'l', 'middle') + G.T(184, 152, 'first quarter', 'l') + G.T(242, 84, 'full', 'l') + G.T(184, 16, 'last quarter', 'l'),
        tall: 156, cap: 'The Moon’s orbit seen from above, not to scale. The hatched half of each moon faces away from the Sun.' },
      { h: 'A trip around Earth' },
      'The Moon <b>orbits</b>, or travels around, Earth about once every 29.5 days. At new moon, it sits between Earth and the Sun. Its lit side faces away from us, so we see almost nothing. As the Moon moves along its path, we see more and more of its lit side. First comes a thin crescent, then a half moon, called the first quarter. When the Moon is on the far side of Earth from the Sun, we see the whole lit side: a full moon.',
      { h: 'Waxing and waning' },
      'While the lit part we see is growing, the Moon is <b>waxing</b>. After full moon, it begins to shrink, or wane, through the last quarter and back to a thin crescent before the next new moon. A handy trick in Canada: if the right side is lit, the Moon is waxing. From one full moon to the next takes about 29.5 days, close to the length of a month. In fact, the word month comes from the word moon.',
      'Many nations also name each full moon. In many Anishinaabe communities, the full moon of early summer is the Strawberry Moon, when wild strawberries ripen, and a full moon near the end of summer is the Wild Rice Moon, the time to harvest manoomin. The names tie the sky to the seasons on the land.',
      { box: 'Try it', text: 'In a dark room, face a lamp and hold a ball at arm’s length. Turn slowly in a circle, keeping the ball in front of your face. Watch the lit part of the ball grow and shrink.' },
      'The cycle never stops, and the phase is the same for everyone on Earth on the same night. A full moon over Iqaluit is the same full moon rising over Windsor, Lagos and Lima.'
    ],
    guide: { before: 'Ask the child to draw the Moon as they last saw it. Teach <b>orbit</b> and <b>phase</b>. Do the lamp-and-ball test before reading if you can.',
      after: 'Look at the Moon tonight, or check a calendar. Is it waxing or waning? How do you know?' },
    words: [['phases', 'the changing shapes of the lit Moon that we see'], ['orbits', 'travels around another object in space'], ['waxing', 'growing larger, as the lit part of the Moon does']],
    qs: [
      { k: 'choice', code: 'C2.1', half: true, q: 'Which thing you may already know helps you understand why half the Moon is always lit?',
        opts: ['A ball lit by a lamp is bright on one side only.', 'Rocks are heavy.', 'The Moon is far away.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is the Moon at full moon?',
        opts: ['on the far side of Earth from the Sun', 'between Earth and the Sun', 'beside the Sun'], a: 0 },
      { k: 'order', code: 'C3.3', q: 'Number the phases in order, starting with new moon.',
        items: ['new moon', 'waxing crescent', 'first quarter', 'full moon', 'last quarter'], show: [3, 0, 4, 2, 1] },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Hemi-</i> means half. What is a <b>hemisphere</b>?',
        opts: ['half of a sphere', 'a whole planet', 'a kind of moon'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Tonight, only the left side of the Moon is lit. The Moon is …',
        opts: ['waning', 'waxing', 'new'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do we see almost nothing of the Moon at new moon, even though it is still lit?',
        a: 'At new moon, the Moon is between Earth and the Sun. Its lit side faces away from us, so we see only its dark side.', look: 'the Moon between Earth and Sun, and the lit side facing away' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The author says the Moon never really changes shape. Explain what really changes.',
        a: 'The Moon is always half lit. What changes is how much of the lit half we can see from Earth as the Moon travels around us.', look: 'always half lit, and our view changes' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Many calendars count time by the Moon. Where have you seen the Moon used to mark time or a celebration?',
        a: 'Ramadan begins with a new crescent moon. Lunar New Year and some Indigenous calendars also follow the Moon.', look: 'a real connection to their life, another text or the world' }
    ]
  });

  P.add({
    id: 'g6-railway', subject: 'history', form: 'Report',
    title: 'The Railway’s Hidden Builders',
    deck: 'Chinese workers, a deadly mountain route, and an apology that came 121 years later',
    hero: {
      photo: 'g6-railway-memorial.jpg', credit: 'Photo: Shaun Merritt, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A memorial in Toronto honours the Chinese workers who helped build the Canadian Pacific Railway.'
    },
    body: [
      'In 1885, a crowd gathered at Craigellachie, British Columbia, to watch a railway official hammer in the “last spike” of the Canadian Pacific Railway. The line now joined Montréal to the Pacific coast. In the famous photograph of that moment, every face is white. Missing from the picture are the thousands of Chinese workers who built some of the most dangerous parts of the line.',
      { h: 'The hardest stretch' },
      'The toughest section ran through the canyons of the Fraser River. Workers blasted tunnels through solid rock and built ledges on cliffs high above rushing water. In some places, men were lowered down cliff faces on ropes to drill holes for dynamite. In winter, they lived in tents and shacks in the snow and bitter cold. The builder could not find enough workers in British Columbia, so between 1880 and 1885 about 15&nbsp;000 men were hired from China and from Chinese communities in the United States.',
      { fig: G.time([['1880', 'Chinese workers hired for the B.C. section'], ['1885', ['Railway finished; a $50 head tax', 'on Chinese immigrants begins']], ['1903', 'Head tax raised to $500'], ['1923', ['New law shuts out almost all', 'Chinese immigrants']], ['1947', 'That law is ended'], ['2006', 'The Government of Canada apologizes']], { gap: 26, hl: 5 }),
        tall: 146, cap: 'Key dates for Chinese Canadians, from the railway to the apology.' },
      'The Chinese workers were paid about half of what white workers earned for the same job, and they had to buy their own food and gear from the company. They were given the most dangerous tasks, such as handling explosives. Many died from rock slides, explosions and disease. No one kept an exact count, but historians believe hundreds lost their lives.',
      { h: 'Thanks that never came' },
      'When the railway was finished, many workers had no money to go home. Instead of being thanked, they faced <b>discrimination</b>, unfair treatment because of who they were. In 1885, Canada began charging a <b>head tax</b> on every new immigrant from China. It started at $50 and rose to $500 by 1903, about two years’ pay. In 1923, a new law shut out almost all Chinese immigrants, and families were kept apart for decades.',
      'In 2006, the Government of Canada formally <b>apologized</b> for the head tax and the laws that followed. Today, memorials honour the workers, and their descendants share the stories their families kept alive. Many see the apology as a beginning, not an end: they want the full story taught in schools, so that no one forgets who helped build the country.',
      { box: 'Think about it', text: 'Who takes a photograph, and who is left out of it, can shape how history is remembered for a very long time.' }
    ],
    guide: { before: 'Find British Columbia and the Fraser River on a map. Teach <b>discrimination</b> and <b>head tax</b>. Ask: who builds a railway?',
      after: 'Why do you think people today build memorials for events that happened long ago? What could your class do to honour a story that has been left out?' },
    words: [['discrimination', 'unfair treatment of people because of who they are'], ['head tax', 'a fee charged on each person, here on each immigrant from China'], ['apologized', 'said sorry in a formal way']],
    qs: [
      { k: 'lines', code: 'C3.5', n: 3, q: 'The author points out that every face in the last-spike photo is white. What perspective does the photo leave out, and why does it matter?',
        a: 'It leaves out the Chinese workers who built the hardest parts of the line. People who see only that photo might think the railway was built without them.', look: 'the missing Chinese workers, and the effect on how history is remembered' },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. How many years passed between the start of the head tax and the apology?',
        opts: ['121', '62', '38'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'In “They were given the most dangerous tasks,” <b>They</b> means …',
        opts: ['the Chinese workers', 'the white workers', 'the historians'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Discrimination</b> means …',
        opts: ['unfair treatment because of who someone is', 'a kind of tax', 'a job on a railway'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why could many workers not go home when the railway was done?',
        opts: ['They had no money left.', 'The railway was closed.', 'The ships had stopped.'], a: 0 },
      { k: 'table', code: 'C2.6', q: 'Record the main idea and two supporting details of the section “Thanks that never came.”', cols: ['', 'From the text'],
        rows: [['Main idea', null], ['Detail', null], ['Detail', null]],
        a: [[null, 'Instead of thanks, Chinese Canadians faced unfair laws.'], [null, 'A head tax of $50, later $500, was charged on each immigrant from China.'], [null, 'In 1923, a law shut out almost all Chinese immigrants.']] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does this passage show why it matters to include everyone’s story in history?',
        a: 'The Chinese workers were left out of the photo and treated unfairly. Telling their story now gives a truer picture of how Canada was built and respects their families.', look: 'including everyone linked to a truer, fairer history' },
      { k: 'lines', code: 'C3.3', n: 2, q: 'Did the 2006 apology still matter, even though it came so late? Give a reason.',
        a: 'Yes. It admitted that the laws were wrong and showed respect to the families who were hurt.', look: 'a clear opinion with a reason' }
    ]
  });

  P.add({
    id: 'g6-red-river-cart', subject: 'social', form: 'Explanation',
    title: 'The Red River Cart',
    deck: 'A Métis invention of wood and rawhide that carried goods across the Prairies',
    hero: {
      photo: 'g6-red-river-cart.jpg', credit: 'Photo: Viola-Ness, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 60%',
      tall: 220,
      cap: 'A full-size model of a Red River cart. Every part is wood or rawhide: there is no metal at all.'
    },
    body: [
      'In the 1800s, long lines of two-wheeled carts creaked across the Prairies, sometimes hundreds at a time. Their squeal could be heard kilometres away. These were Red River carts, built by the <b>Métis</b>, a people who grew from the families of First Nations women and European fur traders, with their own language, Michif, and their own culture.',
      { h: 'Built from the land' },
      'There were few stores on the Prairies, so the cart was made from what was close at hand: wood, such as oak or ash, tied with <b>rawhide</b>, strips of untanned animal skin. Wet rawhide was wrapped around the joints. As it dried, it shrank and held the pieces tight. With no metal parts, a broken cart could be fixed with an axe and a few trees along the trail.',
      { fig: '<circle class="k" cx="104" cy="84" r="56"/><circle class="k" cx="104" cy="84" r="8"/>' +
          '<path class="t" d="M104 28 V140 M48 84 H160 M64 44 L144 124 M144 44 L64 124"/>' +
          '<rect class="k" x="34" y="40" width="160" height="30"/><path class="k" d="M194 56 L294 70 M194 64 L294 78"/>' +
          D.label(208, 112, 'wheel about 1.5 m', 160, 98) + D.label(208, 30, 'box holds 400 kg', 180, 44) + D.label(214, 98, 'shafts for an ox', 250, 70) + D.label(4, 16, 'rawhide bindings', 40, 40),
        tall: 146, cap: 'A Red River cart from the side. The big wheels rolled over mud, ruts and tall grass.' },
      'The wheels were huge, about one and a half metres across, so they rolled through mud and tall grass without getting stuck. They were also dished, or bent slightly outward like a shallow bowl, which made them stronger on rough ground. At a river, the wheels could be taken off and strapped under the cart, and the whole thing floated across like a raft.',
      { h: 'Trade on wheels' },
      'Pulled by a single ox or horse, one cart could carry about 400 kilograms, far more than a pack animal. Métis families used the carts for their great buffalo hunts and to haul furs and pemmican, a food of dried meat and fat, to trading posts. Trains of carts travelled hundreds of kilometres between the Red River Settlement, now Winnipeg, and St. Paul in the United States.',
      { box: 'A sound to remember', text: 'Grease would have picked up dust and worn down the wooden axles, so they were left dry. The result was a screech that travellers never forgot.' },
      'Today, the Red River cart is a proud symbol of Métis <b>ingenuity</b>, the skill of solving problems in clever ways. Along with the fiddle, the jig and the woven sash, it belongs to a culture that is very much alive.'
    ],
    guide: { before: 'Find the Red River and Winnipeg on a map. Teach <b>Métis</b>, <b>rawhide</b> and <b>ingenuity</b>. Ask: if you had no metal and no stores, how would you build a cart?',
      after: 'The cart, the fiddle and the sash are symbols of Métis culture. What objects are symbols of your family’s or community’s culture, and what do they say about it?' },
    words: [['Métis', 'a distinct people of mixed First Nations and European ancestry, with their own language and culture'], ['rawhide', 'animal skin that has been dried but not tanned'], ['ingenuity', 'skill at solving problems in clever ways']],
    qs: [
      { k: 'lines', code: 'C3.4', n: 3, q: 'The cart is a symbol of Métis culture. What does it show about Métis ways of life? Use details from the text.',
        a: 'It shows that the Métis used what the land gave them and solved problems cleverly. Families worked together on hunts and long trade journeys.', look: 'a value or way of life linked to a detail from the text' },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. About how wide is a wheel?',
        opts: ['1.5 m', '400 kg', '15 cm'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why could a broken cart be fixed on the trail?',
        opts: ['It was only wood and rawhide.', 'Stores sold parts on the way.', 'It never broke.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Each feature solved a problem. Fill in the chart.', cols: ['Feature', 'Problem it solved'],
        rows: [['Huge wheels', null], ['Wheels that come off', null], [null, 'Grease would gather dust and wear down the axles.']],
        a: [[null, 'Getting stuck in mud and tall grass'], [null, 'Crossing rivers: the cart floats like a raft'], ['Dry axles with no grease', null]] },
      { k: 'choice', code: 'B2.2', half: true, q: 'Wheels that are <b>dished</b> are …',
        opts: ['bent outward like a bowl', 'used for serving food', 'flat and thin'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'What makes this text an explanation?',
        opts: ['It tells how and why the cart worked.', 'It has a hero and a villain.', 'It rhymes.'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 2, q: 'Which part of the passage was hardest to picture? What did you do to understand it?',
        a: 'The dished wheels. I looked at the diagram and pictured a shallow bowl.', look: 'a named part and a strategy, such as rereading, using the diagram or visualizing' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might the carts have travelled in long trains instead of one at a time? Use clues from the text.',
        a: 'The trips were hundreds of kilometres long, so travelling together meant people could help fix broken carts, share the work and carry more goods to trade.', look: 'a sensible inference supported by a clue from the text' }
    ]
  });

  P.add({
    id: 'g6-united-nations', subject: 'social', form: 'Report',
    title: 'One Table for the World',
    deck: 'What the United Nations does, and the part Canada has played',
    hero: {
      photo: 'g6-un-assembly.jpg', credit: 'Photo: Basil D Soufi, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The General Assembly hall at United Nations headquarters in New York. Every member country has a seat.'
    },
    body: [
      'In 1945, the Second World War had just ended. Millions of people had died, and cities lay in ruins. Leaders from 50 countries met in San Francisco with one goal: to stop such a war from ever happening again. They signed a <b>charter</b>, a founding agreement, and created the United Nations, or UN. Canada was one of the first members.',
      { h: 'Who does what' },
      'Today, 193 countries belong to the UN. Each one has a seat and a vote in the General Assembly, where members discuss world problems, from climate change to hunger. The smaller Security Council deals with threats to peace. Special agencies take on other jobs: UNICEF helps children, and the World Health Organization fights disease.',
      { fig: '<rect class="a" x="60" y="2" width="180" height="26" rx="5"/>' + G.T(150, 19, 'United Nations: 193 countries', 'lb', 'middle') + '<path class="t" d="M150 28 V42 M49 42 H251 M49 42 V54 M150 42 V54 M251 42 V54"/>' +
          '<rect class="k" x="2" y="54" width="94" height="66" rx="5"/><rect class="k" x="103" y="54" width="94" height="66" rx="5"/><rect class="k" x="204" y="54" width="94" height="66" rx="5"/>' +
          G.T(49, 72, 'General', 'lb', 'middle') + G.T(49, 86, 'Assembly', 'lb', 'middle') + G.T(49, 102, 'every country,', 'n', 'middle') + G.T(49, 114, 'one vote', 'n', 'middle') +
          G.T(150, 72, 'Security', 'lb', 'middle') + G.T(150, 86, 'Council', 'lb', 'middle') + G.T(150, 102, '15 members,', 'n', 'middle') + G.T(150, 114, 'peace and safety', 'n', 'middle') +
          G.T(251, 72, 'Agencies', 'lb', 'middle') + G.T(251, 90, 'UNICEF, World', 'n', 'middle') + G.T(251, 102, 'Health Organization', 'n', 'middle') + G.T(251, 114, 'and more', 'n', 'middle'),
        tall: 124, cap: 'Three main parts of the United Nations.' },
      { h: 'Keeping the peace' },
      'In 1956, a crisis over the Suez Canal in Egypt threatened to become a wider war. Canada’s Lester B. Pearson, who later became prime minister, proposed sending a UN force to stand between the armies while leaders talked. It worked, and Pearson won the Nobel Peace Prize. Since then, Canadian <b>peacekeepers</b> have served in places such as Cyprus, Haiti and Mali, wearing the UN’s blue helmets. Canada also helps through UN agencies. The World Food Programme delivers food to people facing hunger after wars, droughts and floods, and Canada is one of its biggest supporters.',
      { h: 'Rights for everyone' },
      'In 1948, the UN adopted the Universal Declaration of Human Rights, a list of rights that belong to every person, such as the right to an education and the freedom to speak. A Canadian law professor, John Humphrey, wrote its first draft. Later, the UN agreed on rights for children, including the right to play, to be safe and to have a say in decisions that affect them.',
      { box: 'Not perfect', text: 'The UN cannot force countries to obey. Any one of the five permanent members of the Security Council can block a decision on its own, so the council sometimes fails to act.' },
      'Still, the UN gives the world one table where every country, large or small, can be heard, and where problems too big for any one nation can be shared.'
    ],
    guide: { before: 'Ask: if two countries disagree, how could they solve it without fighting? Teach <b>charter</b> and <b>peacekeepers</b>. Find New York and Egypt on a map.',
      after: 'Which right for children do you think matters most, and why? How is it protected in your life?' },
    words: [['charter', 'a written agreement that sets up a group and its rules'], ['peacekeepers', 'soldiers sent by the UN to keep peace between sides']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'How do the subheadings help the reader?',
        opts: ['They divide the report into topics.', 'They tell a story in time order.', 'They give the answers.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Which part of the UN gives every country one vote?',
        opts: ['the General Assembly', 'the Security Council', 'UNICEF'], a: 0 },
      { k: 'choice', code: 'C2.2', q: 'Which reader would find this report most useful?',
        opts: ['a student preparing a talk on how countries work together', 'someone looking for a bedtime story', 'a cook planning a meal', 'someone learning to skate'], a: 0 },
      { k: 'choice', code: 'B3.1', q: 'Which sentence has a relative clause (a part that begins with <i>who</i>, <i>which</i> or <i>that</i> and describes a noun)?',
        opts: ['Lester B. Pearson, who later became prime minister, proposed a UN force.', 'Canada was one of the first members.', 'It worked.', 'Today, 193 countries belong to the UN.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>charter</b> is …',
        opts: ['a founding agreement', 'a ship', 'a vote'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Who wrote the first draft of the Universal Declaration of Human Rights?',
        opts: ['John Humphrey', 'Lester B. Pearson', 'UNICEF'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think the UN was created right after the Second World War?',
        a: 'The war had killed millions and destroyed cities. Leaders wanted a place to solve problems by talking, so that another world war would not happen.', look: 'the link between the war and the goal of peace' },
      { k: 'lines', code: 'C3.5', n: 2, q: 'The author added a box called “Not perfect.” How does it make the report more balanced?',
        a: 'It shows the UN’s weaknesses as well as its strengths, so the report is not one-sided.', look: 'both sides are shown' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'One right is “to have a say in decisions that affect them.” How could a school respect this right?',
        a: 'Students could vote on how to use the playground, or join a student council.', look: 'a realistic example' }
    ]
  });

  P.add({
    id: 'g6-cereal-box', subject: 'health', form: 'Media article',
    title: 'What the Cereal Box Says',
    deck: 'How packaging sells food, and how to read past the bright colours',
    hero: {
      photo: 'g6-cereal-aisle.jpg', credit: 'Photo: Vauxford, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Cereal boxes on supermarket shelves. Each one competes for a shopper’s attention for only a few seconds.'
    },
    body: [
      'A supermarket cereal aisle can hold more than a hundred kinds of cereal. A shopper walks past in seconds, so each box has a single job: to catch your eye and make you choose it. Every part of the box is designed to <b>persuade</b>.',
      { h: 'Tricks on the front' },
      'Look at where the boxes sit. Sugary cereals with cartoon characters are often placed low, at a child’s eye level, while plainer cereals sit higher up. Bright colours, prizes and games make a box exciting. Words such as “natural” or “made with whole grains” sound healthy, but they can describe a cereal that is still mostly sugar. Some boxes show a bowl piled with fresh berries, even though there is no fruit inside. Look closely and you may find the tiny words “serving suggestion.”',
      { fig: '<rect class="k" x="10" y="2" width="176" height="136"/>' + G.T(18, 20, 'Nutrition Facts', 'lb') + G.T(18, 34, 'Per 1 cup (30 g)', 'n') + '<path class="k" d="M10 40 H186"/>' +
          G.T(18, 56, 'Calories 120', 'l') + G.T(178, 56, '% Daily Value', 'n', 'end') + '<path class="t" d="M10 62 H186 M10 82 H186 M10 102 H186"/>' +
          G.T(18, 76, 'Sugars 12 g', 'l') + G.T(178, 76, '12 %', 'lb', 'end') + G.T(18, 96, 'Fibre 1 g', 'l') + G.T(178, 96, '4 %', 'lb', 'end') + G.T(18, 116, 'Sodium 190 mg', 'l') + G.T(178, 116, '8 %', 'lb', 'end') +
          G.T(18, 132, 'Ingredients: sugar, corn flour …', 'n') +
          G.T(198, 70, '15 % or more', 'lb') + G.T(198, 84, 'is a lot', 'l') + G.T(198, 110, '5 % or less', 'lb') + G.T(198, 124, 'is a little', 'l'),
        tall: 142, cap: 'Part of a made-up Nutrition Facts table. Sugar is listed first, so there is more sugar than any other ingredient.' },
      { h: 'The truth on the side' },
      'To learn what is really inside, turn the box around. The Nutrition Facts table lists the amount of sugar, fibre, salt and other nutrients in one serving. The % Daily Value shows whether a serving has a little or a lot of something. The ingredient list is in order by weight, so the first ingredient is the one used most. When you compare two cereals, check that the servings are the same size. A “less sugar” claim means little if the serving is smaller.',
      { h: 'Who is the message for?' },
      'Every ad has a <b>target audience</b>, the group it is made for. A box with a cartoon tiger is aimed at children, who may then ask their parents to buy it. A box with a photo of a runner and the word “fibre” is aimed at adults who want to be healthy. Knowing who a message is for helps you notice what it wants you to think.',
      'Companies spend millions of dollars on packaging because it works. In one study, children said the same food tasted better when its package showed a cartoon character they knew. That is one reason Quebec limits advertising aimed at children under 13.',
      { box: 'Try it', text: 'Pick two cereal boxes at home or in a store. Who is each one made for? Which has less sugar per serving? Were you surprised?' }
    ],
    guide: { before: 'Bring a real cereal box. Teach <b>persuade</b> and <b>target audience</b>. Ask: what is the first thing you notice on this box, and why?',
      after: 'Design the front of a healthy cereal box for children. What would you show to persuade them without tricking them?' },
    words: [['persuade', 'to try to make someone believe or do something'], ['target audience', 'the group of people a message is made for']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Why are sugary cereals often placed low on the shelf?',
        opts: ['so children see them at eye level', 'because they are heavy', 'so adults can reach them', 'because they cost less'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the table. How much fibre is in one serving?',
        opts: ['1 g', '12 g', '4 g'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Is 12% Daily Value of sugar a little or a lot?',
        opts: ['in between the two', 'a little', 'a lot'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>persuade</b> means to …',
        opts: ['try to make someone think or do something', 'tell a joke', 'measure something'], a: 0 },
      { k: 'choice', code: 'A2.4', half: true, q: 'Who is the target audience for a box with a cartoon tiger?',
        opts: ['children', 'grandparents', 'athletes'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'A box says “made with whole grains.” Why might this claim mislead a shopper? What could you check?',
        a: 'The cereal could still be mostly sugar. You could check the sugar in the Nutrition Facts and see whether sugar is the first ingredient.', look: 'the gap between the claim and the facts, and a way to check' },
      { k: 'lines', code: 'C3.3', n: 2, q: 'Why should you compare serving sizes before comparing the sugar in two cereals?',
        a: 'A smaller serving makes the sugar look lower. Comparing the same amount is fair.', look: 'the same amount makes a fair comparison' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Which skill would help you most to see past a box’s tricks: asking who it is for, checking the facts, or comparing? Explain why.',
        a: 'Checking the facts, because the side of the box shows the real amount of sugar, whatever the front says.', look: 'names a skill and explains why it works' }
    ]
  });

  P.add({
    id: 'g6-percent', subject: 'math', form: 'Explanation',
    title: 'What Does 75% Off Mean?',
    deck: 'Percents, discounts and the price you really pay',
    hero: {
      photo: 'g6-sale-sign.jpg', credit: 'Photo: TheDigitel Beaufort from Beaufort, SC, USA, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A store window sign announces 75% off. A percent is a part out of 100.'
    },
    body: [
      'Signs in store windows shout numbers: 25% off! 50% off! 75% off! To be a smart shopper, you need to know what these numbers mean. The symbol % stands for <b>percent</b>, which comes from the Latin <i>per centum</i>, “for each hundred.” So 75% means 75 out of every 100.',
      { h: 'Picture it on a grid' },
      'Imagine a grid of 100 squares. If 25 squares are shaded, then 25% of the grid is shaded. That is the same as one quarter, because 25 out of 100 is one out of four. In the same way, 50% is one half, and 75% is three quarters. Knowing these <b>benchmarks</b> helps you estimate quickly.',
      { fig: '<rect class="h" x="10" y="10" width="110" height="22"/><rect class="h" x="10" y="32" width="55" height="11"/>' +
          '<path class="t" d="' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (i) { return 'M' + (10 + i * 11) + ' 10 V120 M10 ' + (10 + i * 11) + ' H120'; }).join(' ') + '"/>' +
          '<path class="k" d="M150 66 H290 M150 60 V72 M185 62 V70 M220 60 V72 M255 62 V70 M290 60 V72"/>' +
          G.T(150, 52, '0%', 'n', 'middle') + G.T(185, 52, '25%', 'lb', 'middle') + G.T(220, 52, '50%', 'lb', 'middle') + G.T(255, 52, '75%', 'lb', 'middle') + G.T(290, 52, '100%', 'n', 'end') +
          G.T(150, 88, '0', 'l', 'middle') + G.T(185, 88, '¼', 'l', 'middle') + G.T(220, 88, '½', 'l', 'middle') + G.T(255, 88, '¾', 'l', 'middle') + G.T(290, 88, '1', 'l', 'middle'),
        tall: 128, cap: 'Left: 25 of 100 squares, or 25%. Right: benchmark percents and the fractions they equal.' },
      { h: 'Finding the sale price' },
      'Suppose a winter coat costs $80 and is 25% off. One quarter of $80 is $20, so you save $20 and pay $60. You can also think about what you pay: if 25% is taken off, you pay the other 75%, which is three quarters of $80, or $60. Both methods give the same answer.',
      'Discounts can also stack. Suppose a store takes 50% off, then another 50% off the new price. Many people think that makes 100% off, so the coat would be free! But the second discount is taken from the lower price. Half of $80 is $40, and half of $40 is $20, so you still pay $20.',
      'At 75% off, the same coat would cost only $20. That sounds like a bargain, and it may be. But a smart shopper also asks: Do I need it? Was the price raised before the sale? Is the same coat cheaper somewhere else?',
      { box: 'Watch for tax', text: 'In Ontario, a 13% sales tax called HST is added to most things at the till. A $60 coat really costs $60 plus $7.80 in tax, or $67.80.' },
      { h: 'Percents everywhere' },
      'Percents are not only for shopping. A phone battery shows 20% left. A weather forecast gives a 60% chance of rain. A test score of 18 out of 20 is 90%. Because every percent is out of 100, percents make it easy to compare amounts of different sizes. About 20% of Canadians, for example, grew up speaking French first.'
    ],
    guide: { before: 'Shade 25 squares on a hundred grid together. Teach <b>percent</b> (per = for each, cent = hundred, as in century and cent) and <b>benchmarks</b>.',
      after: 'Find a flyer or an online sale. Work out the sale price of one item together, then add the HST.' },
    words: [['percent', 'a part out of 100, shown with the sign %'], ['benchmarks', 'well-known amounts used to estimate, such as 25%, 50% and 75%']],
    qs: [
      { k: 'choice', code: 'B2.1', half: true, q: 'The word <b>percent</b> comes from Latin words that mean …',
        opts: ['for each hundred', 'a small part', 'one thousand'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the grid, what fraction of the squares is shaded?',
        opts: ['one quarter', 'one half', 'three quarters'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart for the $80 coat.', cols: ['Discount', 'You save', 'You pay'],
        rows: [['25%', '$20', null], ['50%', null, '$40'], ['75%', null, null]],
        a: [[null, null, '$60'], [null, '$40', null], [null, '$60', '$20']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'A $40 game is 25% off. How much do you pay before tax? Show your thinking.',
        a: 'One quarter of $40 is $10, so you save $10 and pay $30.', look: 'the right price, $30, and a method' },
      { k: 'choice', code: 'C2.4', q: 'You do not understand the word <i>benchmarks</i>. What is the best thing to do?',
        opts: ['reread the sentence and study the number line', 'skip it and keep reading', 'read only the title', 'guess and move on'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The author says 75% off “may be” a bargain. What should a shopper ask before buying?',
        a: 'Do I need it? Was the price raised before the sale? Is it cheaper somewhere else?', look: 'at least two of the questions' },
      { k: 'lines', code: 'C2.1', n: 2, q: 'How did something you already knew about fractions help you understand percents?',
        a: 'I know a quarter is one of four equal parts, so I could see why 25% is a quarter.', look: 'names what they already knew and how it helped' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why is 50% off and then another 50% off not the same as 100% off?',
        a: 'The second 50% is taken from the new, lower price, not the first price. Half of $80 is $40, then half of $40 is $20, so the coat still costs $20.', look: 'the second discount comes off the lower price' }
    ]
  });

  P.add({
    id: 'g6-emily-carr', subject: 'arts', form: 'Biography',
    title: 'Emily Carr: Painting the Forest',
    deck: 'A British Columbia artist who painted the coast in bold new ways',
    hero: {
      photo: 'g6-carr-odds-and-ends.jpg', credit: 'Painting: Emily Carr, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: '<i>Odds and Ends</i> (1939) by Emily Carr. Stumps left by logging stand below a sweeping sky.'
    },
    body: [
      'Emily Carr was born in Victoria, British Columbia, in 1871, when the city was still a small town on the edge of a vast forest. As a girl, she escaped into the woods with her sketchbook whenever she could. She grew up to become one of Canada’s most famous painters, but for much of her life, hardly anyone wanted her work.',
      { h: 'Learning to see' },
      'Carr studied art in San Francisco, England and France. In Paris, around 1910, she discovered a bold new <b>style</b>: bright colours, strong outlines and simple shapes. When she came home and painted that way, many people in Victoria laughed at her pictures. They expected art to look calm and realistic.',
      { fig: G.time([['1871', 'Born in Victoria, B.C.'], ['1910', 'Studies art in France'], ['1912', 'Paints villages on the coast'], ['1913', 'Runs a boarding house; paints little'], ['1927', ['Shows her work in Ottawa;', 'meets the Group of Seven']], ['1945', 'Dies in Victoria']], { gap: 25, hl: 4 }),
        tall: 144, cap: 'Key moments in Emily Carr’s life.' },
      { h: 'Villages and carved poles' },
      'In 1912, Carr travelled by boat to First Nations villages along the coast and on Haida Gwaii. She painted houses, the people she met and carved poles, which tell the histories of families and clans. Some poles stood alone in empty villages, because disease and government rules had forced families to leave. Carr believed she was recording a way of life that was disappearing. Today, many people point out that the Haida, Kwakwaka’wakw and other nations were not disappearing at all: their artists still carve poles, and their cultures continue.',
      { h: 'A late success' },
      'For about fifteen years, Carr earned her living running a boarding house and raising dogs, and she had little time to paint. Then, in 1927, her work was shown in a national <b>exhibition</b> in Ottawa. There she met Lawren Harris of the Group of Seven, who told her that her work mattered. <b>Inspired</b>, she began to paint again with new energy. Her forests became swirling, living things, full of movement and light.',
      'Late in life, after a heart attack made painting hard, Carr turned to writing. Her book <i>Klee Wyck</i>, named for the nickname “Laughing One” that the Nuu-chah-nulth people gave her, won a Governor General’s Award in 1941.',
      { box: 'Look closely', text: 'In <i>Odds and Ends</i>, Carr shows stumps left by logging. What feeling do the stumps create beside the tall trees and wide sky?' }
    ],
    guide: { before: 'Look at the painting together for a full minute before reading. Teach <b>style</b> and <b>exhibition</b>. Find Victoria and Haida Gwaii on a map.',
      after: 'Answer the “Look closely” question together. Why do you think Carr kept painting even when people laughed at her work?' },
    words: [['style', 'a special way of doing something, such as painting'], ['exhibition', 'a public show of art or other objects'], ['inspired', 'filled with the wish and energy to create or do something']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What shows that this text is a biography?',
        opts: ['It tells a real person’s life in time order.', 'It gives steps to follow.', 'It is told by an imaginary character.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. How old was Carr when her work was shown in Ottawa?',
        opts: ['56', '41', '74'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Carr believed she was painting a way of life that was disappearing. How does the author show that this view was not the whole truth?',
        a: 'The author explains that the nations were not disappearing: their artists still carve poles and their cultures continue today.', look: 'the author’s correction and the evidence for it' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Carved poles tell the histories of families and clans. Why does it matter that West Coast artists still carve them today?',
        a: 'It shows that the culture is alive and that its histories are still being told and passed on to young people.', look: 'the link between carving today and a living culture' },
      { k: 'choice', code: 'C1.5', q: 'Carr’s forests became “swirling, living things.” What does this word choice suggest about her paintings?',
        opts: ['They feel full of energy and movement.', 'They show trees in a storm.', 'They are very small.', 'They show only animals.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did Carr paint so little for about fifteen years?',
        opts: ['She had to earn a living.', 'She lost her brushes.', 'She lived in France.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>exhibition</b> is …',
        opts: ['a public show of art', 'a long trip', 'a kind of paint'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize how Carr finally became successful.',
        a: 'In 1927, her work was shown in a national exhibition in Ottawa. Lawren Harris encouraged her, and she began to paint again with new energy.', look: 'the exhibition, the encouragement and her new paintings' }
    ]
  });

  P.add({
    id: 'g6-insulin', subject: 'science', form: 'Report',
    title: 'The Discovery of Insulin',
    deck: 'How a team in Toronto turned a deadly disease into one people can live with',
    hero: {
      photo: 'g6-banting-best.jpg', credit: 'Photo: Thomas Fisher Rare Book Library, CC BY 2.0, Wikimedia Commons', focus: '50% 30%',
      tall: 220,
      cap: 'Charles Best (left) and Frederick Banting with one of the dogs from their experiments, University of Toronto, 1921.'
    },
    body: [
      'In 1920, a child who developed type 1 diabetes was not expected to live long. Doctors could do almost nothing. Then, in a small laboratory at the University of Toronto, a team of researchers made a discovery that has since saved millions of lives.',
      { h: 'Sugar the body cannot use' },
      'Your body runs on a sugar called glucose, which comes from the food you eat. Glucose travels in the blood to every cell. To get inside a cell, it needs help from insulin, a <b>hormone</b>, or chemical messenger, made by the pancreas, an organ behind the stomach. In type 1 diabetes, the pancreas stops making insulin. Glucose builds up in the blood while the cells starve.',
      { fig: G.flow(['You eat food.', 'Glucose (sugar) enters the blood.', 'Insulin from the pancreas opens the cells.', 'Cells use the glucose for energy.'], { bh: 26, gap: 12, hl: 2 }),
        tall: 144, cap: 'How the body uses sugar. In type 1 diabetes, the third step is missing.' },
      { h: 'A summer in the lab' },
      'Frederick Banting, a young surgeon from Alliston, Ontario, had an idea: what if insulin could be taken from an animal’s pancreas and given to people? In the summer of 1921, Professor John Macleod gave him a lab, and a student, Charles Best, became his assistant. Through the hot months, they tested their <b>extract</b> on dogs. The lab was cramped, many experiments failed, and Banting even sold his car to pay for supplies. Later, the chemist James Collip found a way to make it pure enough to be safe.',
      { h: 'Leonard’s second chance' },
      'In January 1922, a 14-year-old boy named Leonard Thompson lay dying of diabetes in Toronto General Hospital. He was given the first injection of insulin. After a second, purer dose, his blood sugar dropped and his strength began to return. Word spread fast. Soon, desperate families from across North America were travelling to Toronto. Within a year, a drug company was making insulin in large amounts, and children who had been close to death were going back to school.',
      'In 1923, Banting and Macleod received the Nobel Prize. Banting shared his prize money with Best, and Macleod shared his with Collip. Banting, Best and Collip sold their <b>patent</b> to the University of Toronto for one dollar each, so that insulin could be made widely and cheaply. Insulin, Banting believed, belonged to the world.',
      { box: 'Still today', text: 'Insulin is not a cure. People with type 1 diabetes still need it every day, but with it, they can live long, full lives.' }
    ],
    guide: { before: 'Ask: what does your body do with the food you eat? Teach <b>hormone</b> (a chemical messenger) and <b>patent</b>. Find Toronto and Alliston on a map.',
      after: 'Banting chose not to get rich from insulin. Talk about other discoveries that should belong to everyone. Do you know anyone who lives with diabetes?' },
    words: [['hormone', 'a chemical messenger that the body makes to control how it works'], ['extract', 'a substance taken out of something, such as a plant or organ'], ['patent', 'the legal right to be the only one to make and sell an invention']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'Which text pattern does the whole report follow?',
        opts: ['problem and solution', 'compare and contrast', 'a list of steps'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which step is missing in type 1 diabetes?',
        opts: ['Insulin opens the cells.', 'You eat food.', 'Glucose enters the blood.'], a: 0 },
      { k: 'order', code: 'C2.6', q: 'Number the events in the order they happened.',
        items: ['Banting is given a lab and an assistant.', 'The team tests the extract on dogs.', 'Leonard Thompson receives insulin.', 'Banting and Macleod receive the Nobel Prize.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B3.2', q: 'A gerund is an -ing word used as a noun. Which sentence uses a gerund?',
        opts: ['Testing the extract took all summer.', 'The boy was dying.', 'Families were travelling to Toronto.', 'Best is helping Banting.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did Banting, Best and Collip sell their patent for one dollar each? What does this tell you about them?',
        a: 'They wanted insulin to be made cheaply, so everyone who needed it could get it. It shows they cared more about helping people than about money.', look: 'the reason, and a trait such as generous or caring' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'After reading “Sugar the body cannot use,” what did you predict the team would try to do? Were you right?',
        a: 'I predicted they would find a way to give people insulin. I was right: they took it from animals and made it pure.', look: 'a prediction based on the text, and a check of it' },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Desperate</b> families were …',
        opts: ['almost without hope', 'very rich', 'angry at doctors'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why does the author add the box “Still today”?',
        opts: ['to show insulin helps but is not a cure', 'to tell a joke', 'to name the prize'], a: 0 }
    ]
  });

  P.add({
    id: 'g6-big-snow', subject: 'story', form: 'Tall tale',
    title: 'The Winter of the Big Snow',
    deck: 'A grandfather, a record snowfall and a few small exaggerations',
    hero: {
      photo: 'g6-snow-removal.jpg', credit: 'Photo: Miguel Angel Omaña Rojas, CC0, Wikimedia Commons', focus: '50% 60%',
      tall: 200,
      cap: 'Snow removal in Montréal. In a tall tale, a snowfall like this would be called a light dusting.'
    },
    body: [
      'Everybody in Kapuskasing remembers the winter of the Big Snow, but nobody remembers it quite like my Grandpa Gilles. According to him, it started snowing on the first of November and did not stop until the robins came back in April, and some of the robins needed snowshoes.',
      'By December, the snow was so deep that the Tremblays next door had to climb out their chimney to get to work. Grandpa says he shovelled the driveway every morning, and every morning it filled back in before he could put the shovel away. “I shovelled that driveway a million times,” he told me. “I wore out eleven shovels and one very patient dog.”',
      { fig: '<path class="k" d="M14 120 V70 L42 22 L70 70 V120 M14 70 H70 M54 46 V30 H62 V58"/><rect class="k" x="34" y="94" width="14" height="26"/>' + D.arrow(78, 20, 78, 118, 't') + D.arrow(78, 118, 78, 20, 't') +
          G.cols([[['Grandpa’s', 'story'], 6, 'up to the roof, 6 m'], [['weather', 'record'], 0.6, '60 cm']], 6.5, { x0: 96, base: 120, h: 102, hl: 0 }),
        tall: 150, cap: 'How deep was the snow? Grandpa’s story and the weather record do not quite agree.' },
      'In January, it got so cold that words froze in the air. When Grandpa called the dog for supper, the words fell to the ground in a pile, and nobody heard them until they <b>thawed</b> in the spring. That is why, Grandpa says, our kitchen was so noisy in April.',
      'February was even worse. The snow was so high that the train from Cochrane had to tunnel under it like a mole. The mail carrier, Mrs. Lalonde, delivered letters by toboggan, sliding down the snowbanks so fast that the letters arrived before they were written. The dog, meanwhile, learned to walk on top of the snow wearing four of Grandma’s oven mitts.',
      { h: 'The tunnel' },
      'The best part of the story is the tunnel. When the snow reached the roof, Grandpa and his brothers dug a tunnel from the back door all the way to the school, eight blocks away. It took them three days and nine thermoses of hot chocolate. Theirs was the only school in Ontario with a snow subway. At recess, they played hockey on the icy tunnel floor, and Grandpa shot the puck so hard that it is still travelling somewhere under Hearst. “Kids lined up for a ride,” he says, “and the teachers were <b>tickled pink</b>.”',
      'Of course, I checked. I looked up the weather records, and that winter really did bring more snow than usual: enough to bury a car, if not a house. When I showed Grandpa, he just winked. “Records,” he said, “are written by people who stayed indoors.”',
      'I still do not know how much of his story is true. But every time it snows, I picture eleven worn-out shovels, a pile of frozen words and a tunnel full of laughing kids, and I grin from ear to ear.'
    ],
    guide: { before: 'Explain that a tall tale tells impossible things as if they were true. Teach <b>hyperbole</b> (exaggeration for effect) and the idiom <b>tickled pink</b>. Ask: what is the most snow you have ever seen?',
      after: 'Tell a tall tale together about a hot summer day. Take turns adding one exaggeration each.' },
    words: [['thawed', 'melted after being frozen'], ['tickled pink', 'very pleased (an idiom)']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'Which feature shows that this story is a tall tale?',
        opts: ['impossible exaggerations told as if they were true', 'a list of facts', 'steps to follow', 'a map of the town'], a: 0 },
      { k: 'table', code: 'C3.1', q: 'Hyperbole is exaggeration for effect. Fill in the chart.', cols: ['Hyperbole from the story', 'What probably really happened'],
        rows: [['Some of the robins needed snowshoes.', null], [null, 'Grandpa shovelled the driveway many times.'], ['The words froze in the air.', null]],
        a: [[null, 'There was still snow on the ground when the robins came back.'], ['“I shovelled that driveway a million times.”', null], [null, 'It was so cold that it felt as if sounds froze.']] },
      { k: 'choice', code: 'B2.2', half: true, q: 'The idiom <b>tickled pink</b> means …',
        opts: ['very pleased', 'very cold', 'covered in snow'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who tells this story?',
        opts: ['Grandpa’s grandchild, using “I”', 'Grandpa, using “I”', 'a narrator outside the story'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. How deep was the snow, according to the weather record?',
        opts: ['60 cm', '6 m', '1 cm'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Grandpa wink when he sees the records?',
        opts: ['He knows his story is exaggerated.', 'He has snow in his eye.', 'He did not see them.'], a: 0 },
      { k: 'lines', code: 'C1.6', n: 3, q: 'How would the story change if Grandpa told it himself, using “I”?',
        a: 'We would not see the grandchild checking the records, so the story might sound more like boasting, and readers might believe more of it.', look: 'a sensible change linked to who tells the story' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Does someone in your family or community tell stories with a little exaggeration? Why do you think people enjoy these stories?',
        a: 'My aunt says she walked to school in snow up to her chin. People enjoy these stories because they are funny and make ordinary days exciting.', look: 'a real connection and a reason' }
    ]
  });

  P.add({
    id: 'g6-blackout', subject: 'story', form: 'Script', plain: true,
    title: 'The Night the Lights Went Out',
    deck: 'A short play set in a Toronto apartment during the blackout of 2003',
    hero: {
      photo: 'g6-blackout.jpg', credit: 'Photo: Ashleystruan at en.wikipedia, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'Toronto during the blackout of August 14, 2003, when about 50 million people in Ontario and the United States lost power.'
    },
    body: [
      '<b>Cast</b> PRIYA, age 12 · AMMA, her mother · MR. OKAFOR, a neighbour',
      '<i>Thursday, August 14, 2003, 4:15 p.m. A hot apartment on the fourteenth floor. PRIYA is at the computer. Suddenly the fan stops, the screen goes black and the fridge falls silent.</i>',
      'PRIYA: (<i>staring at the blank screen</i>) No, no, no! I didn’t save my project!',
      'AMMA: (<i>calling from the kitchen</i>) Priya, did you trip the <b>breaker</b> again?',
      'PRIYA: I didn’t touch anything! (<i>She goes to the window.</i>) Amma, come and look. The traffic lights are off. The whole street is dark.',
      'AMMA: (<i>joining her, worried</i>) The whole city, maybe. Find the radio, the one with batteries. It’s in the hall closet.',
      { fig: '<path class="k" d="M20 8 H280 V50 M280 84 V108 H20 Z"/><path class="a" d="M112 8 H188"/>' + G.T(150, 22, 'window', 'n', 'middle') + G.T(274, 72, 'door', 'n', 'end') +
          '<rect class="d" x="26" y="40" width="64" height="62"/>' + G.T(58, 75, 'kitchen', 'n', 'middle') + '<circle class="k" cx="166" cy="70" r="16"/>' + G.T(166, 74, 'table', 'n', 'middle') +
          '<rect class="k" x="222" y="18" width="34" height="18"/>' + G.T(239, 48, 'computer', 'n', 'middle') +
          D.arrow(90, 136, 90, 116, 't') + D.arrow(210, 136, 210, 116, 't') + G.T(150, 134, 'AUDIENCE', 'lb', 'middle'),
        tall: 140, cap: 'The stage plan, seen from above. The audience sits in front of the stage.' },
      '<i>PRIYA returns with a small radio and turns the dial. <b>Static</b>, then a voice.</i>',
      'RADIO: … a massive power failure across Ontario and the northeastern United States. Please stay calm and check on your neighbours …',
      'AMMA: Our neighbours. Mr. Okafor! He lives alone, and the elevator won’t work.',
      '<i>A knock at the door. MR. OKAFOR stands there with his cane and a bag of ice cream bars.</i>',
      'MR. OKAFOR: (<i>cheerfully</i>) My freezer is dying, and these are melting. I need help. Serious help.',
      'PRIYA: (<i>grinning</i>) I think we can handle that.',
      '<i>Later. Candles on the table. The three sit by the open window. Below, people are directing traffic and sharing food on the sidewalk.</i>',
      'MR. OKAFOR: In 1965, the power went out across this whole region too. We met more neighbours that night than in the whole year before.',
      'AMMA: (<i>pointing up</i>) Look, Priya.',
      'PRIYA: (<i>gasping</i>) Stars! I’ve never seen so many in the city.',
      'MR. OKAFOR: The lights were always hiding them. (<i>He pauses.</i>) Sometimes you have to lose something to notice what you had.',
      { box: 'Reading a script', text: 'A colon follows each speaker’s name. Words in italics are stage directions: they tell the actors how to move and speak.' }
    ],
    guide: { before: 'Explain what a script is and how stage directions work. Teach <b>static</b> and <b>breaker</b>. Ask: what would you do first if the power went out?',
      after: 'Read the play aloud together, one part each, following the stage directions. How did your voices and faces change the meaning of the lines?' },
    words: [['breaker', 'a switch that cuts the power when too much electricity flows'], ['static', 'a crackling noise on a radio']],
    qs: [
      { k: 'choice', code: 'B3.3', half: true, q: 'In a script, what punctuation comes after a speaker’s name?',
        opts: ['a colon', 'a comma', 'a question mark'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature does a script have that a story usually does not?',
        opts: ['stage directions', 'paragraphs', 'a title'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the stage plan. Where does the audience sit?',
        opts: ['in front of the stage', 'behind the window', 'in the kitchen'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In the play, <b>static</b> is …',
        opts: ['a crackling sound', 'a radio station', 'a storm'], a: 0 },
      { k: 'lines', code: 'B1.4', n: 2, q: 'The stage direction says Amma joins Priya, “worried.” How could the actor show this without words?',
        a: 'She could frown, speak quietly, or put a hand on Priya’s shoulder while looking out of the window.', look: 'a facial expression, gesture or tone of voice that shows worry' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Mr. Okafor says he needs “serious help” with his melting ice cream. What is he really doing?',
        a: 'He is joking, so that they can share the food before it melts. He also lives alone, so he may want company on a strange night.', look: 'the joke, and a deeper reason such as company or sharing' },
      { k: 'choice', code: 'C2.3', q: 'At the start, Priya is upset. Which prediction does the ending prove wrong?',
        opts: ['The blackout will ruin her night.', 'The power will go off.', 'The neighbours will help each other.', 'The radio will work.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What is the message of the last line? Give an example from the play.',
        a: 'Losing something can help you see what matters. Without the power, Priya noticed the stars and the neighbours got to know each other.', look: 'the message, with the stars or the neighbours as the example' }
    ]
  });

  P.add({
    id: 'g6-dark-sky', subject: 'science', form: 'Report',
    title: 'Where Did the Stars Go?',
    deck: 'Light pollution, and the places in Ontario that protect the dark',
    hero: {
      photo: 'g6-dark-sky.jpg', credit: 'Photo: Mustang Joe, CC0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'The night sky over Torrance Barrens Dark-Sky Preserve, near Gravenhurst, Ontario.'
    },
    body: [
      'Two hundred years ago, anyone in Ontario could step outside on a clear night and see the Milky Way, a glowing band made of billions of stars. Today, most Canadians live where they cannot see it at all. The stars have not gone anywhere. They are hidden by our own lights. From a truly dark place, the Milky Way looks like a river of spilled milk, which is how it got its name.',
      { h: 'A glow in the sky' },
      '<b>Light pollution</b> is artificial light that shines where it is not needed: up into the sky, into bedroom windows, or far beyond a parking lot. Streetlights, signs and buildings send light upward, where it bounces off dust and water droplets in the air. This creates <b>skyglow</b>, a hazy dome of light over a city that can be seen from 100 kilometres away and washes out all but the brightest stars.',
      { fig: G.T(4, 10, 'Stars you can see on a clear night (rough estimates)', 'n') +
          G.bars([['Big city', 50, 'about 50'], ['Suburb', 300, 'about 300'], ['Countryside', 1500, 'about 1500'], ['Dark-sky preserve', 2500, 'about 2500']], 2500, { x0: 108, top: 20, gap: 26, pad: 56, hl: 3 }),
        tall: 124, cap: 'The more light pollution there is, the fewer stars can be seen.' },
      { h: 'Not just about stars' },
      'Light pollution affects living things, too. Many birds migrate at night and use the stars to find their way. Bright buildings confuse them, and every year many crash into lit windows in cities such as Toronto. Newly hatched sea turtles crawl toward the brightest horizon, which should be the moonlit ocean, but may be a beach road. People are affected as well: bright light at night can make it harder to fall asleep.',
      { h: 'Taking back the night' },
      'In 1999, Torrance Barrens, near Gravenhurst, became Canada’s first dark-sky <b>preserve</b>, a protected place where lighting is kept to a minimum. Others followed, from Point Pelee to Jasper. Some towns now use shielded streetlights that point all their light down, and warmer, dimmer bulbs. These changes save energy and money, too. Anyone can help: close the curtains at night, switch off outdoor lights that are not needed, and choose lights that point down.',
      { box: 'Try it', text: 'On a clear night, count the stars you can see inside a square made by your hands held at arm’s length. Count again in a darker place, or after nearby lights are turned off. Compare.' },
      'Unlike most kinds of pollution, light pollution can be cleaned up in an instant. Flip a switch, and the stars come back.'
    ],
    guide: { before: 'Ask: when did you last see a sky full of stars, and where were you? Teach <b>light pollution</b>, <b>skyglow</b> and <b>preserve</b> (pre = before, serve = keep).',
      after: 'Do the star count together on the next clear night. What lights near your home could be shielded or turned off?' },
    words: [['light pollution', 'artificial light that shines where it is not needed'], ['skyglow', 'the glow of light over a city at night'], ['preserve', 'a place where nature is protected']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the passage?',
        opts: ['Too much artificial light hides the stars and harms living things, but it can be fixed.', 'Birds migrate at night.', 'Torrance Barrens is near Gravenhurst.', 'Streetlights are bright.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. About how many more stars can be seen in a dark-sky preserve than in a big city?',
        opts: ['about 2450', 'about 50', 'about 300'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Pre-</i> means before, and <i>serve</i> means keep. To <b>preserve</b> something is to …',
        opts: ['keep it safe', 'throw it out', 'light it up'], a: 0 },
      { k: 'table', code: 'C2.6', q: 'Who is harmed by light pollution, and how? Fill in the chart.', cols: ['Who', 'How light pollution harms them'],
        rows: [['Migrating birds', null], ['Baby sea turtles', null], ['People', null]],
        a: [[null, 'Bright buildings confuse them, and they crash into windows.'], [null, 'They crawl toward lit roads instead of the ocean.'], [null, 'Bright light at night makes it harder to fall asleep.']] },
      { k: 'choice', code: 'C2.2', half: true, q: 'For which purpose would this text be most useful?',
        opts: ['planning a night of stargazing', 'fixing a bike', 'learning to bake'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Skyglow</b> is …',
        opts: ['a dome of light over a city', 'a kind of star', 'a sunset'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The author says light pollution “can be cleaned up in an instant.” How is it different from other kinds of pollution?',
        a: 'Other pollution, such as plastic or smoke, stays in the environment for a long time. Light stops the moment you turn it off.', look: 'light disappears at once, while other pollution lasts' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think about where you live. Name one source of light pollution, and explain how it could be fixed.',
        a: 'The lights in the plaza parking lot shine all night. They could be shielded to point down, or put on a timer.', look: 'a real source and a fix from the text' }
    ]
  });

  P.add({
    id: 'g6-concussion', subject: 'health', form: 'Explanation',
    title: 'Heads Up: Concussions',
    deck: 'What a concussion is, how to spot one, and Ontario’s Rowan’s Law',
    hero: {
      photo: 'g6-youth-hockey.jpg', credit: 'Photo: Christophe95, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Girls’ hockey at the 2020 Youth Olympic Games. A helmet protects the skull, but it cannot stop the brain from moving inside it.'
    },
    body: [
      'In 2013, Rowan Stringer, a 17-year-old rugby player from Ottawa, was hurt in a game. She had suffered a <b>concussion</b> days earlier, but she kept playing, not knowing how dangerous that could be. Another hit caused her brain to swell, and she died. Her story changed the law in Ontario.',
      { h: 'What is a concussion?' },
      'Your brain is soft, about as firm as gelatin, and it floats in fluid inside your skull. A hard bump or jolt to the head, neck or body can make the brain bounce or twist against the inside of the skull. This can change the way brain cells work for days or weeks. That injury is a concussion. You do not have to be knocked out to have one: most people with a concussion never lose consciousness.',
      { fig: '<ellipse class="k" cx="100" cy="72" rx="72" ry="56"/><ellipse class="h" cx="114" cy="72" rx="52" ry="40"/>' + D.arrow(2, 72, 24, 72, 'a') + G.T(2, 60, 'hit', 'lb') +
          D.arrow(104, 72, 150, 72, 'k') + D.label(196, 30, 'skull', 150, 32) + D.label(196, 72, 'brain', 132, 60) + D.label(196, 112, 'fluid', 160, 102),
        tall: 132, cap: 'A jolt makes the soft brain move and hit the inside of the skull.' },
      { h: 'Signs to watch for' },
      'After a hit, watch for headaches, dizziness, blurry vision, feeling sick to the stomach, trouble remembering, or feeling confused, cranky or unusually sleepy. Some signs appear right away; others show up hours later. If you notice any of them, stop playing and tell an adult. Sitting out one game is far better than risking a second injury before the brain has healed.',
      'A helmet still matters: it protects the skull from cracks and cuts. But no helmet can stop the brain from moving, so the best protection is safe play: no hits to the head, and respect for the rules of your sport.',
      { h: 'Rowan’s Law' },
      'In 2018, Ontario passed Rowan’s Law. It requires sports groups to teach athletes, parents and coaches about concussions every year. It also sets out a <b>protocol</b>, a set of steps to follow: any athlete who may have a concussion must be removed from play right away and cannot return until a doctor or nurse practitioner says it is safe.',
      { box: 'Back, step by step', text: 'Healing takes time. A return-to-sport plan starts with rest, then light activity such as walking, then sport drills, and only then full contact. Each step comes only if there are no symptoms.' },
      'Today, Rowan’s Law Day is held in Ontario every September. It reminds players, coaches and families everywhere: when in doubt, sit it out.'
    ],
    guide: { before: 'Ask: what does a helmet protect? Shake a container of gelatin gently to show how the brain can move. Teach <b>concussion</b> and <b>protocol</b>.',
      after: 'Make a plan: what would you say to a teammate who seems dizzy after a hit but wants to keep playing?' },
    words: [['concussion', 'a brain injury caused by a bump or jolt'], ['protocol', 'a set of steps to follow in a certain situation']],
    qs: [
      { k: 'order', code: 'C1.3', q: 'Number the steps of a return-to-sport plan in order.',
        items: ['rest', 'light activity, such as walking', 'sport drills', 'full contact'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is the hatched shape?',
        opts: ['the brain', 'the skull', 'a helmet'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>protocol</b> is …',
        opts: ['a set of steps to follow', 'a type of helmet', 'a sports team'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Which statement is true, according to the text?',
        opts: ['You can have a concussion without being knocked out.', 'Helmets prevent all concussions.', 'Signs of a concussion always appear right away.', 'A concussion heals in an hour.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Why does the author begin with Rowan Stringer’s story instead of a definition?',
        a: 'A real story makes readers care and shows how serious a concussion can be. It also explains where the law gets its name.', look: 'the effect on the reader, or how it explains the law’s name' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is a second hit before the brain heals so dangerous? Use evidence from the text.',
        a: 'The brain has not healed yet, so another hit can cause serious harm, like the swelling that killed Rowan Stringer.', look: 'the brain not yet healed, with Rowan’s story as evidence' },
      { k: 'choice', code: 'C2.2', half: true, q: 'Which reader needs this text most?',
        opts: ['a young athlete', 'a chef', 'a pilot'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'What should you do if you notice a sign after a hit?',
        opts: ['stop and tell an adult', 'keep playing', 'go home alone'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 2, q: 'What helped you understand how a concussion happens: the diagram, picturing gelatin, or something else? How did it help?',
        a: 'Picturing gelatin wobbling in a bowl helped me see how the brain moves, and the diagram showed it hitting the skull.', look: 'a named strategy and how it helped' }
    ]
  });

  P.add({
    id: 'g6-skatepark', subject: 'social', form: 'Letter to the editor', plain: true,
    title: 'A Skatepark for Everyone',
    deck: 'A student writes to the local newspaper about a plan for the old tennis courts',
    hero: {
      photo: 'g6-skatepark.jpg', credit: 'Photo: T.Newfeels, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A concrete skatepark in Shearwater, Nova Scotia, with ramps and bowls for riders of different skill levels.'
    },
    body: [
      'To the Editor:',
      'I am writing about the town council’s plan to turn the old tennis courts on Maple Street into a parking lot. I am in Grade 6 at Riverside Public School, I ride my skateboard almost every day, and I believe the space should become a skatepark instead.',
      'First, young people in our town have nowhere to ride. Right now, skateboarders and scooter riders use the library steps and the plaza parking lot. Shop owners complain, and riders get fined. A skatepark would give them a safe, legal place to practise. In a <b>survey</b> I did at my school, 112 of 160 students said they would use a skatepark at least once a week.',
      { fig: G.T(4, 10, 'Would you use a skatepark? (160 students)', 'n') +
          G.bars([['Every week', 112], ['Sometimes', 30], ['Never', 18]], 112, { x0: 82, top: 22, gap: 28 }),
        tall: 108, cap: 'Results of the writer’s survey at one school.' },
      'Second, a skatepark is good for our health. Skateboarding, scootering and BMX riding are hard exercise, and they build balance and courage. Many kids who do not enjoy team sports love riding. Our town has six soccer fields and three baseball diamonds, but nothing for them.',
      'Third, a skatepark can be for everyone. The design should include a smooth, gentle area for beginners and for riders who use wheelchairs. <b>Adaptive</b> skating, sometimes called WCMX, is a growing sport, and its riders need ramps that are wide enough. With benches and shade, parents and grandparents could come and watch too.',
      'Some people worry that skateparks bring noise and graffiti. But many Canadian towns have found that a well-lit park, with a mural wall painted by local artists, becomes a place young people are proud of and take care of.',
      'Others say a skatepark costs too much. Yet our parent council has already offered to raise $10&nbsp;000, and the courts are already paved, which lowers the cost. A skatepark also costs less to keep up than a parking lot that must be plowed, lit and repaired every year.',
      'The town already has plenty of parking. What it needs is a place where young people belong. Come and see the courts on any Saturday afternoon: you will find kids already riding there, on cracked pavement, because they have nowhere else to go. I <b>urge</b> council to vote for a skatepark at the Maple Street courts.',
      'Sincerely,<br>Amira Haddad<br>Riverside, Ontario'
    ],
    guide: { before: 'Explain what a letter to the editor is: an opinion that a newspaper prints for its readers. Teach <b>survey</b>, <b>adaptive</b> and <b>urge</b>. Ask: what would you change about a park near you?',
      after: 'Role-play a council meeting: one of you speaks for the skatepark, the other for the parking lot. Which arguments were strongest?' },
    words: [['survey', 'a set of questions asked to many people to learn what they think'], ['adaptive', 'changed to suit people with different needs or abilities'], ['urge', 'to strongly ask someone to do something']],
    qs: [
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is there a colon after “To the Editor”?',
        opts: ['It is the greeting of a formal letter.', 'It begins a list.', 'It shows a time.'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'What is the purpose of a letter to the editor?',
        opts: ['to share an opinion with newspaper readers', 'to tell a fairy tale', 'to give instructions'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. How many students said they would never use a skatepark?',
        opts: ['18', '30', '112'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'What percent of the 160 students said “every week”?',
        opts: ['70%', '50%', '112%'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'List the writer’s three reasons and the evidence for each.', cols: ['Reason', 'Evidence'],
        rows: [['Young people have nowhere to ride.', null], [null, 'Riding is hard exercise; many kids who skip team sports love it.'], ['A skatepark can be for everyone.', null]],
        a: [[null, 'Riders use the library steps and get fined; 112 of 160 students would ride weekly.'], ['A skatepark is good for health.', null], [null, 'A beginner area, wide ramps for wheelchair riders, and benches for families.']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose point of view is missing from the letter? How might that person see the plan differently?',
        a: 'Neighbours who live beside the courts, or people who need parking. They might worry about noise, crowds or losing parking spaces.', look: 'a missing group and how they might see it' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does the writer show that the skatepark should include everyone? Is her plan fair?',
        a: 'She asks for a beginner area, wide ramps for wheelchair riders and benches for families. Yes, because people of different ages and abilities could use it.', look: 'two features that include people, and an opinion with a reason' },
      { k: 'lines', code: 'C3.8', n: 2, q: 'What did you do to decide whether the writer’s argument was convincing?',
        a: 'I checked whether each reason had evidence, like the survey, and I thought about what people on the other side would say.', look: 'a thinking skill, such as checking evidence or looking for the other side' }
    ]
  });

  P.add({
    id: 'g6-two-row', subject: 'history', form: 'Report',
    title: 'Two Rows, One River',
    deck: 'The Two Row Wampum, a Haudenosaunee agreement of respect and equality',
    hero: {
      photo: 'g6-two-row-journey.jpg', credit: 'Photo: Gorgenkor, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Tom Porter and Hickory Edwards hold a Two Row Wampum belt during the 2013 renewal journey, when paddlers travelled side by side.'
    },
    body: [
      'Long before Canada and the United States existed, the Haudenosaunee, a confederacy of nations that includes the Mohawk, Oneida, Onondaga, Cayuga, Seneca and Tuscarora, had their own ways of making agreements. One of the most famous is remembered in a belt of beads called the Two Row Wampum.',
      { h: 'Beads that hold a promise' },
      '<b>Wampum</b> beads are made from white and purple shells. The Haudenosaunee weave them into belts to record important events and agreements. A wampum belt is not just a decoration: when it is read aloud by a knowledge keeper, it carries the words of an agreement from one generation to the next.',
      { fig: '<rect class="k" x="4" y="24" width="292" height="78"/><rect class="h" x="4" y="40" width="292" height="12"/><rect class="h" x="4" y="74" width="292" height="12"/>' +
          G.T(150, 66, 'white beads: peace, friendship and respect', 'n', 'middle') + G.T(4, 14, 'purple row: a Haudenosaunee canoe', 'l') + G.T(4, 120, 'purple row: a European ship', 'l'),
        tall: 126, cap: 'The design of the Two Row Wampum: two purple rows on a field of white beads.' },
      'According to Haudenosaunee history, the Two Row Wampum records an agreement made with Dutch traders in the early 1600s, in what is now New York State. The belt shows two purple rows separated by white beads. One purple row stands for a Haudenosaunee canoe, carrying their laws, customs and ways of life. The other stands for a European ship, carrying the newcomers’ laws and ways. The white beads stand for peace, friendship and respect.',
      { h: 'Side by side' },
      'The two vessels travel down the river of life side by side, as equals. Neither tries to steer the other’s boat. No one stands with one foot in each, because that person would fall in. The message is that two peoples can share the land and help each other while each keeps its own <b>sovereignty</b>, the right to govern itself.',
      'Haudenosaunee leaders see the Two Row as the basis of later agreements with the British and with Canada. Many say these promises were often broken, as governments tried to control their communities and their land.',
      { box: 'Renewing the promise', text: 'In 2013, to mark 400 years, hundreds of Haudenosaunee and non-Indigenous paddlers travelled down the Hudson River in two lines, side by side, as the belt shows.' },
      'Today, many people see the Two Row as a model for <b>reconciliation</b>: building a relationship of respect between Indigenous and non-Indigenous peoples.'
    ],
    guide: { before: 'Find the Six Nations of the Grand River (near Brantford) and New York State on a map. Teach <b>wampum</b>, <b>sovereignty</b> and <b>reconciliation</b>. Ask: how do people remember a promise?',
      after: 'Draw two boats side by side. What would each of you carry in your boat? What does it take to travel side by side without steering each other?' },
    words: [['wampum', 'beads made from shells, woven into belts that record agreements and events'], ['sovereignty', 'the right of a people to govern themselves'], ['reconciliation', 'repairing a relationship and building respect']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'In the diagram, what do the white beads between the rows stand for?',
        opts: ['peace, friendship and respect', 'the river', 'the Dutch ship', 'the Haudenosaunee canoe'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'A wampum belt is an important cultural object. How is it different from a treaty written on paper?',
        a: 'It is made of shell beads with symbols, and it is read aloud by a knowledge keeper, so its words are passed on by speaking from one generation to the next.', look: 'the beads and symbols, and that it is read aloud and passed down' },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Sovereignty</b> is …',
        opts: ['the right to govern yourself', 'a kind of boat', 'a shell bead'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'In “Neither tries to steer the other’s boat,” <b>Neither</b> means …',
        opts: ['neither of the two peoples', 'neither of the beads', 'neither of the rivers'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'What does the picture of a person with one foot in each boat mean? What message does it give?',
        a: 'It means you cannot be in both boats or control both at once. Each people should keep its own way and travel side by side.', look: 'the symbol explained as a message about equality or keeping separate ways' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How have events in history shaped the way Haudenosaunee people use the Two Row today?',
        a: 'Many promises were broken by governments, so leaders remind people of the belt’s message of respect and equality, and they renewed it with a journey in 2013.', look: 'broken promises linked to renewing or teaching the belt today' },
      { k: 'choice', code: 'C2.1', q: 'Which knowledge you may already have helps most with this passage?',
        opts: ['what a treaty or agreement is', 'how to bake bread', 'the rules of hockey', 'how to tie a shoe'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 2, q: 'Summarize the meaning of the Two Row Wampum in two sentences.',
        a: 'The two rows are a Haudenosaunee canoe and a European ship travelling side by side as equals. Neither steers the other, and they share peace, friendship and respect.', look: 'the two vessels, equality, and the white beads’ meaning' }
    ]
  });

  P.add({
    id: 'g6-exchange', subject: 'math', form: 'Explanation',
    title: 'Dollars Across the Border',
    deck: 'Exchange rates, and why a dollar is worth different amounts in different places',
    hero: {
      photo: 'g6-exchange-rates.jpg', credit: 'Photo: Dvortygirl, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'A digital board shows exchange rates: how much of one currency you get for another.'
    },
    body: [
      'Imagine you are going on a school trip from Windsor to Detroit, just across the river. You have saved $50 in Canadian money. In Detroit, though, prices are in American dollars. How much can you really spend?',
      { h: 'Money has a price, too' },
      'Every country, or group of countries, has its own <b>currency</b>: the dollar in Canada, the peso in Mexico, the euro in much of Europe. To spend money in another country, you trade one currency for another. The <b>exchange rate</b> tells you how much of one currency you get for one unit of another. It changes every day, as banks and businesses around the world buy and sell currencies.',
      { fig: '<path class="k" d="M40 40 H290 M40 92 H290 M40 34 V46 M140 34 V46 M240 34 V46 M290 34 V46 M40 86 V98 M140 86 V98 M240 86 V98 M290 86 V98"/><path class="d" d="M40 46 V86 M140 46 V86 M240 46 V86 M290 46 V86"/>' +
          G.T(4, 44, 'C$', 'lb') + G.T(4, 96, 'US$', 'lb') +
          G.T(40, 26, '0', 'l', 'middle') + G.T(140, 26, '20', 'l', 'middle') + G.T(240, 26, '40', 'l', 'middle') + G.T(290, 26, '50', 'l', 'end') +
          G.T(40, 114, '0', 'l', 'middle') + G.T(140, 114, '15', 'l', 'middle') + G.T(240, 114, '30', 'l', 'middle') + G.T(290, 114, '37.50', 'l', 'end'),
        tall: 120, cap: 'A double number line at an example rate of C$1 = US$0.75. Each pair of numbers is worth the same.' },
      'Suppose the rate is 1 Canadian dollar for 75 American cents. That is a <b>ratio</b>: C$1 to US$0.75, or 4 to 3. Your C$50 would become US$37.50. A T-shirt that costs US$15 would cost you C$20. Many travellers keep a simple rule in mind: take off one quarter to get American dollars.',
      'Banks and exchange offices usually charge a fee, or give a slightly worse rate than the one on the news, so you get a little less. Always check before you trade.',
      'Sometimes you do not need to trade at all. Many stores near the border accept Canadian money, but they set their own rate, which may not be a good one. Paying with a bank card is often easier: the bank changes the money for you and adds a small fee.',
      { h: 'Why rates change' },
      'A currency’s value goes up when many people want it. Canada sells a lot of oil, wood and wheat to other countries. When the world wants more of these goods, buyers need more Canadian dollars to pay for them, and the dollar’s value often rises. In 2007, the Canadian dollar was briefly worth more than the American dollar, and shoppers raced across the border to look for bargains. Rates also move with the news, so travellers often watch them for weeks before a trip.',
      { box: 'Try it', text: 'At C$1 = US$0.75, how many American dollars would you get for C$80? How many Canadian dollars would a US$30 book cost?' }
    ],
    guide: { before: 'Show any foreign coin or bill, or find a picture of one. Teach <b>currency</b>, <b>exchange rate</b> and <b>ratio</b>. Answers to “Try it”: US$60 and C$40.',
      after: 'Look up today’s exchange rate between the Canadian and American dollar. Is the Canadian dollar worth more or less than in the passage? What would C$50 buy today?' },
    words: [['currency', 'the kind of money used in a country'], ['exchange rate', 'how much of one currency you get for another'], ['ratio', 'a comparison of two amounts, such as 4 to 3']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the double number line. C$40 is worth …',
        opts: ['US$30', 'US$40', 'US$53'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>currency</b> is …',
        opts: ['the money used in a country', 'a bank', 'a border crossing'], a: 0 },
      { k: 'table', code: 'C3.2', q: 'Use the rate C$1 = US$0.75. Fill in the chart.', cols: ['Canadian dollars', 'American dollars'],
        rows: [['C$8', null], [null, 'US$45'], ['C$100', null]],
        a: [[null, 'US$6'], ['C$60', null], [null, 'US$75']] },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is complex: a main idea joined to a part that begins with <i>when</i> and cannot stand alone?',
        opts: ['When the world wants more of these goods, buyers need more Canadian dollars.', 'Always check before you trade.', 'The exchange rate changes every day.', 'Canada sells a lot of oil.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might the Canadian dollar rise when the world wants more Canadian wheat?',
        a: 'Buyers in other countries need Canadian dollars to pay for the wheat, so more people want our dollars, and their value goes up.', look: 'the need for dollars to pay for Canadian goods' },
      { k: 'choice', code: 'C3.3', q: 'Why did shoppers race across the border in 2007?',
        opts: ['Their dollars were worth more, so American goods seemed cheap.', 'Stores in Canada were closed.', 'American goods were free.', 'The rate was C$1 = US$0.50.'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Which part did you reread or check with the number line? What did it help you understand?',
        a: 'I reread the T-shirt example and checked it on the number line to see why US$15 is the same as C$20.', look: 'a part they reread and what became clear' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Have you or someone you know used another currency? Describe it, or say what you would want to know before a trip.',
        a: 'My cousin went to Mexico and paid in pesos. Before a trip, I would want to know the exchange rate and the fee.', look: 'a real connection or a sensible question' }
    ]
  });

  P.add({
    id: 'g6-beading', subject: 'story', form: 'Short story',
    title: 'One Bead at a Time',
    deck: 'A girl learns Métis beadwork from her grandmother over one long winter',
    hero: {
      photo: 'g6-beaded-bag.jpg', credit: 'Photo: Unknown, CC0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'A bag with beaded flowers, made by a Cree or Métis artist over a century ago. The Métis became known as the Flower Beadwork People.'
    },
    body: [
      'The first time Kokum let me use her beading needle, I lasted eleven minutes. I counted. The needle was as thin as a hair, the beads kept rolling off the table, and my flower looked more like a squashed potato. “Again,” Kokum said, and smiled.',
      'That was in November. Every Sunday after that, I went to her apartment in Saskatoon, and we sat at the kitchen table under the good lamp. She showed me how to draw a pattern on felt, how to string four beads, lay them along the line and stitch them down. It is called <b>couching</b>, and it makes the beads lie flat and smooth, like a road.',
      'Kokum kept her beads in old pill bottles and jam jars, sorted by colour: cranberry red, sky blue, dandelion yellow and a green she called “new leaf.” She let me choose my own colours. I picked pink and blue and a bright, bossy orange. Kokum raised her eyebrows at the orange but said nothing.',
      { fig: [0, 72, 144, 216, 288].map(function (r) { return '<ellipse class="d" cx="70" cy="44" rx="14" ry="26" transform="rotate(' + r + ' 70 72)"/>'; }).join('') + '<circle class="k" cx="70" cy="72" r="7"/>' +
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) { var t = i / 12 * Math.PI * 2; return '<circle class="k" cx="' + (70 + 14 * Math.cos(t)).toFixed(1) + '" cy="' + (44 + 26 * Math.sin(t)).toFixed(1) + '" r="3"/>'; }).join('') +
          G.flow(['1. Draw the pattern.', '2. String four beads.', ['3. Stitch down', 'between beads.']], { x: 168, w: 128, bh: 32, gap: 10, top: 14 }),
        tall: 140, cap: 'Left: a flower pattern, with beads along one petal. Right: the steps of couching.' },
      'At first, I wanted to finish fast. I rushed, and my rows wobbled. Kokum never got angry. She would just pick up her tiny scissors, snip my thread and say, “Your hands are in a hurry. Let your heart catch up.” Then I would do the whole row again.',
      'While we beaded, she told me stories. She told me about her own grandmother, who beaded flowers onto moccasins and jackets to trade at the Hudson’s Bay post, and about how the Métis became known as the Flower Beadwork People. Each colour meant something to her. The pink was for her sister. The blue was for the river near where she grew up. Some stories were funny, like the time her brother sat on a whole tray of beads. Some were sad, like the years when her family hid that they were Métis because people treated them badly. When she told those, her needle went slower.',
      'By March, my flower was finished. It took all winter, and it was not perfect: one petal leaned a little to the left. The orange, it turned out, was perfect for the centre. When I showed Kokum, she held it up to the lamp for a long time without saying anything. Then she said, “That leaning petal is yours. Nobody else could have made it.”',
      'Now I am beading a pair of moccasin <b>vamps</b> for my little brother. I am not in a hurry anymore.'
    ],
    guide: { before: 'Explain that Kokum is a Cree word for grandmother used in many Métis families. Teach <b>couching</b> and <b>vamps</b>. If you can, look at photos of Métis floral beadwork together.',
      after: 'Kokum says the leaning petal is special because it is the girl’s own. Talk about something you made that was not perfect but mattered to you.' },
    words: [['couching', 'a way of sewing strung beads down flat onto cloth or leather'], ['vamps', 'the top pieces of a moccasin, often beaded']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'From what point of view is this story told?',
        opts: ['first person, by the girl', 'third person', 'second person, using “you”'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“As thin as a hair” is …',
        opts: ['a simile', 'a fact', 'a question'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Beadwork is an important part of Métis culture. What does the story show about what beadwork means to Kokum’s family? Use details.',
        a: 'It connects the generations: Kokum’s grandmother beaded, Kokum beads, and now she teaches her granddaughter. Each colour holds a memory, such as pink for her sister.', look: 'a meaning (family, memory, history) with a detail' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What does Kokum mean when she says, “Your hands are in a hurry. Let your heart catch up”?',
        a: 'The girl is rushing to finish instead of taking care. Kokum wants her to slow down and put feeling into her work.', look: 'slowing down and caring about the work' },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, how many beads are strung before they are stitched down?',
        opts: ['four', 'one', 'twelve'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In beadwork, <b>couching</b> means …',
        opts: ['stitching strung beads down flat', 'sitting on a couch', 'cutting thread'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How does the girl change from November to March? Give evidence.',
        a: 'At first, she rushes and lasts only eleven minutes. By March, she has worked patiently all winter, and she says she is not in a hurry anymore.', look: 'impatient to patient, with evidence from the start and the end' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Have you learned a skill from an older family member? How was it like the girl’s experience?',
        a: 'My grandfather taught me to fish. Like the girl, I wanted to rush, and he taught me to be patient.', look: 'a real connection and a comparison' }
    ]
  });

  P.add({
    id: 'g6-lightning', subject: 'science', form: 'Explanation',
    title: 'Static, Sparks and Lightning',
    deck: 'Why the zap from a doorknob and a bolt of lightning are the same thing',
    hero: {
      photo: 'g6-cn-tower-lightning.jpg', credit: 'Photo: Raul Heinrich, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Lightning strikes the CN Tower in Toronto. The tower is hit dozens of times a year, and its lightning rods carry the charge safely to the ground.'
    },
    body: [
      'On a dry winter day, you shuffle across the carpet in your socks, reach for the doorknob and zap! A tiny spark jumps to your finger. Far away, a thunderstorm sends a bolt of lightning crashing into the ground. These two sparks are very different in size, but they have the same cause: <b>static electricity</b>.',
      { h: 'Charges on the move' },
      'Everything is made of tiny particles called atoms, and atoms contain even tinier particles with electric <b>charges</b>: protons are positive, and electrons are negative. Usually, the charges are balanced. But when two materials rub together, electrons can move from one to the other. The material that gains electrons becomes negative, and the one that loses them becomes positive. Opposite charges attract, while like charges <b>repel</b>, or push each other away.',
      { fig: '<ellipse class="k" cx="62" cy="48" rx="30" ry="38"/><path class="t" d="M62 86 L58 96"/>' + G.T(50, 40, '− −', 'lb') + G.T(50, 62, '− −', 'lb') +
          '<path class="k" d="M30 132 Q36 116 34 104 M48 132 Q52 116 50 104 M66 132 Q70 116 68 104 M84 132 Q88 116 86 104"/>' + G.T(28, 128, '+', 'lb') + G.T(76, 128, '+', 'lb') + D.arrow(110, 108, 110, 92, 't') + G.T(116, 104, 'hair', 'n') +
          '<ellipse class="k" cx="196" cy="48" rx="26" ry="34"/><ellipse class="k" cx="268" cy="48" rx="26" ry="34"/>' + G.T(186, 54, '− −', 'lb') + G.T(258, 54, '− −', 'lb') +
          D.arrow(218, 92, 202, 92, 't') + D.arrow(246, 92, 262, 92, 't') +
          G.T(62, 150, 'opposites attract', 'lb', 'middle') + G.T(232, 150, 'like charges repel', 'lb', 'middle'),
        tall: 156, cap: 'A rubbed balloon has extra negative charges. It pulls on positive charges and pushes away negative ones.' },
      'When charges build up and then jump all at once, you get a spark. Your socks rubbing on the carpet collect extra electrons. When your finger nears the metal doorknob, they leap across the gap in a flash. This happens more often in winter, because charges build up in dry air; in damp summer air, they leak away.',
      { h: 'The biggest spark of all' },
      'Inside a storm cloud, strong winds toss ice crystals and water drops up and down. As they bump together, charges separate: the bottom of the cloud becomes negative, and the ground below becomes positive. When the difference grows huge, the charge jumps through the air as lightning. The bolt heats the air to about 30&nbsp;000 °C, five times hotter than the surface of the Sun. The air expands so fast that it booms. That boom is thunder.',
      { box: 'Stay safe', text: 'When thunder roars, go indoors. If you can hear thunder, you are close enough to be struck. Wait 30 minutes after the last rumble before going back outside.' },
      'Tall buildings such as the CN Tower have lightning rods: metal rods joined by thick wires to the ground. The rod gives lightning an easy path, so the charge flows safely into the earth instead of through the building.'
    ],
    guide: { before: 'Rub a balloon on a sweater and hold it near hair or small bits of paper. Teach <b>static electricity</b>, <b>charges</b> and <b>repel</b>.',
      after: 'Make a family thunderstorm plan: where would you go if you were outside, at a park or on a beach?' },
    words: [['static electricity', 'electric charges that build up in one place'], ['charges', 'tiny amounts of electricity, either positive or negative'], ['repel', 'to push away']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Why does the balloon pull the hair toward it?',
        opts: ['Opposite charges attract.', 'Like charges repel.', 'The balloon is wet.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>repel</b> means to …',
        opts: ['push away', 'pull close', 'charge a battery'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Compare a doorknob spark with lightning.', cols: ['', 'Doorknob spark', 'Lightning'],
        rows: [['How the charges build up', null, null], ['Where the charge jumps', null, null]],
        a: [[null, 'socks rubbing on a carpet', 'ice and water bumping in a storm cloud'], [null, 'from a finger to the doorknob', 'from the cloud to the ground']] },
      { k: 'choice', code: 'B3.2', q: 'Which sentence is the active voice of “The building is protected by a lightning rod”?',
        opts: ['A lightning rod protects the building.', 'The building protects a lightning rod.', 'The building was protected.', 'A lightning rod is protected by the building.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why do people get more static shocks in winter?',
        opts: ['Dry air lets charges build up.', 'Doorknobs are colder.', 'There are more storms.', 'Socks are thicker.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why must a lightning rod be connected to the ground by a wire?',
        a: 'The charge needs a path into the earth. The wire carries it safely down, so it does not travel through the building.', look: 'a safe path to the ground' },
      { k: 'lines', code: 'C2.1', n: 2, q: 'What experience of your own helped you understand this passage?',
        a: 'I have rubbed a balloon on my hair and watched my hair stand up, so I understood how opposite charges attract.', look: 'a real experience linked to an idea in the text' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Explain what causes thunder.',
        a: 'Lightning heats the air so quickly that the air expands suddenly and makes a boom.', look: 'heated air expanding fast' }
    ]
  });

  P.add({
    id: 'g6-hydro', subject: 'tech', form: 'Explanation',
    title: 'Power from Falling Water',
    deck: 'How the Niagara River lights homes across Ontario',
    hero: {
      photo: 'g6-adam-beck.jpg', credit: 'Photo: Changku88, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The Sir Adam Beck generating station on the Niagara River makes electricity from water that would otherwise go over the falls.'
    },
    body: [
      'Every second, more than two million litres of water thunder over Niagara Falls. People have long dreamed of using that power. Today, much of the river’s water is turned aside before it reaches the falls and sent through huge tunnels to generating stations downstream. There, falling water becomes electricity for homes, schools and hospitals across Ontario.',
      { h: 'From water to wire' },
      'A hydroelectric station changes one form of energy into another. Water held high up has energy because of its height. As it rushes down a pipe called a penstock, it spins the blades of a <b>turbine</b>, the way wind spins a pinwheel. The turbine turns a <b>generator</b>, a machine in which magnets spin past coils of copper wire. The moving magnets push electrons along the wire, making an electric current.',
      { fig: D.ripple(4, 66, 30) + G.T(4, 18, 'reservoir', 'n') + '<rect class="k" x="68" y="22" width="14" height="104"/><path class="k" d="M82 40 L166 98 M82 54 L162 110"/>' + G.T(98, 96, 'penstock', 'n') +
          '<circle class="a" cx="178" cy="106" r="14"/><path class="a" d="M168 96 L188 116 M188 96 L168 116"/><path class="k" d="M178 92 V76"/><rect class="k" x="160" y="48" width="36" height="28"/>' +
          G.T(204, 66, 'generator', 'n') + G.T(198, 132, 'turbine', 'n') + '<path class="k" d="M196 56 L290 30"/>' + G.T(222, 26, 'to homes', 'n') + D.arrow(194, 112, 288, 122, 't') + D.ripple(220, 296, 138, 't'),
        tall: 144, cap: 'Inside a hydroelectric station. Falling water spins the turbine, and the turbine spins the generator.' },
      'The farther the water falls and the more water there is, the more electricity a station can make. That is why stations are built at waterfalls and dams. The Sir Adam Beck stations use the river’s drop of about 100 metres between Lake Erie and Lake Ontario.',
      'The stations are named after Adam Beck, a manufacturer and mayor of London, Ontario. In the early 1900s, he fought for electricity that would be owned by the public and sold at cost, so that ordinary families and farms, not only factories and the rich, could afford it.',
      { h: 'Clean, but not perfect' },
      'Hydroelectricity is <b>renewable</b>: rain and snow keep refilling the rivers, and a running station gives off no smoke. About a quarter of Ontario’s electricity comes from water power. But building a large dam floods the land behind it, which can destroy forests, change fish habitats and force people to move. In northern Canada, some First Nations communities lost hunting grounds, burial sites and homes when rivers were dammed. Today, many new projects are planned with First Nations as partners and owners.',
      { box: 'Niagara by night', text: 'To protect the view, a treaty between Canada and the United States says more water must flow over the falls during the day in tourist season. At night, more is sent to the power stations.' }
    ],
    guide: { before: 'Blow on a pinwheel, then pour water onto it. Teach <b>turbine</b>, <b>generator</b> and <b>renewable</b>. Find Niagara Falls, Lake Erie and Lake Ontario on a map.',
      after: 'Every way of making electricity has costs and benefits. Which would you build near your town, and what would you ask the people who live there first?' },
    words: [['turbine', 'a wheel with blades that is spun by moving water, steam or air'], ['generator', 'a machine that turns movement into electricity'], ['renewable', 'able to be replaced by nature, so it does not run out']],
    qs: [
      { k: 'order', code: 'C1.3', q: 'Number the steps in order, from water to wire.',
        items: ['Water is held behind a dam.', 'Water rushes down the penstock.', 'The water spins the turbine.', 'The turbine spins the generator.', 'Electricity flows to homes.'], show: [3, 1, 4, 0, 2] },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what is joined directly to the turbine?',
        opts: ['the generator', 'the reservoir', 'the river'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Energy that is <b>renewable</b> …',
        opts: ['is replaced by nature', 'runs out forever', 'always costs a lot'], a: 0 },
      { k: 'choice', code: 'B3.1', q: 'Which sentence has a clause that describes a noun?',
        opts: ['A generator is a machine in which magnets spin past coils of wire.', 'Hydroelectricity is renewable.', 'People have long dreamed of using that power.', 'The air booms.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The author says hydroelectricity is “clean, but not perfect.” Whose point of view is included to show this, and what did they lose?',
        a: 'First Nations communities in northern Canada. They lost hunting grounds, burial sites and homes when rivers were dammed.', look: 'First Nations communities and what they lost' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the treaty send more water to the power stations at night?',
        a: 'Fewer tourists are watching at night, so the falls do not need to look as full, and the water can make electricity instead.', look: 'the view for tourists by day, and power by night' },
      { k: 'choice', code: 'C2.6', q: 'Which sentence best sums up the passage?',
        opts: ['Falling water can make renewable electricity, but dams can harm land and communities.', 'Niagara Falls is very large.', 'Magnets are found in generators.', 'Treaties protect views.'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict: what might happen to the electricity from these stations in a very dry year? Explain.',
        a: 'With less rain and snow, there is less water in the river, so the stations would make less electricity.', look: 'less water, so less power' }
    ]
  });

  P.add({
    id: 'g6-balloons', subject: 'science', form: 'Explanation',
    title: 'Up, Up and Away',
    deck: 'How hot air lifts a balloon, and how pilots steer with the wind',
    hero: {
      photo: 'g6-balloons.jpg', credit: 'Photo: NoonIcarus, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Hot air balloons at the Gatineau Hot Air Balloon Festival in Quebec, one of the largest balloon festivals in Canada.'
    },
    body: [
      'In 1783, a crowd near Paris watched a sheep, a duck and a rooster rise into the sky in a basket under a giant bag of paper and cloth. The bag was filled with hot air, and the animals became the first passengers of a hot air balloon. A few weeks later, two people made the same trip. Humans had finally left the ground.',
      { h: 'Why hot air rises' },
      'Air is made of tiny particles that are always moving. When air is heated, its particles move faster and spread farther apart, so a litre of hot air holds fewer particles than a litre of cool air. That makes hot air less <b>dense</b>, or lighter for its size. The cooler, denser air around it pushes it upward, just as water pushes a beach ball back to the surface. This upward push is called <b>buoyancy</b>.',
      { fig: '<path class="k" d="M150 8 C214 8 232 62 200 100 L168 122 H132 L100 100 C68 62 86 8 150 8 Z"/><path class="t" d="M132 122 L138 134 M168 122 L162 134"/><rect class="k" x="134" y="134" width="32" height="16"/>' +
          '<path class="a" d="M150 128 Q144 120 150 112 Q156 120 150 128 Z"/>' + G.T(150, 56, 'hot air', 'lb', 'middle') +
          [[130, 34], [168, 30], [118, 76], [182, 74], [150, 90], [140, 46]].map(function (p) { return '<circle class="dot" cx="' + p[0] + '" cy="' + p[1] + '" r="1.6"/>'; }).join('') +
          [0, 1, 2, 3, 4, 5].map(function (r) { return [8, 22, 36, 50, 64].map(function (x) { return '<circle class="dot" cx="' + (x + (r % 2) * 7) + '" cy="' + (40 + r * 14) + '" r="1.6"/><circle class="dot" cx="' + (232 + x + (r % 2) * 7) + '" cy="' + (40 + r * 14) + '" r="1.6"/>'; }).join(''); }).join('') +
          G.T(8, 24, 'cool air', 'n') + G.T(240, 24, 'cool air', 'n') + D.arrow(150, 106, 150, 72, 'a') + D.label(196, 146, 'burner', 152, 124),
        tall: 154, cap: 'Hot air inside the balloon is less dense than the cool air around it, so the balloon is pushed up.' },
      'A pilot controls the balloon’s height with a propane burner. A blast of flame heats the air inside the <b>envelope</b>, the balloon’s fabric bag, and the balloon climbs. To come down, the pilot lets the air cool, or opens a vent at the top to let some hot air escape.',
      { h: 'Steering with no steering wheel' },
      'A hot air balloon has no engine to push it sideways. It simply drifts with the wind. So how do pilots steer? They use the fact that wind often blows in different directions at different heights. By rising or sinking into a layer of air that is moving the way they want to go, a skilled pilot can choose a direction, a little like changing lanes on a highway. Even so, pilots never know exactly where they will land. A chase crew follows in a truck, ready to meet the balloon in a farmer’s field.',
      'The first balloon was built by two brothers, Joseph and Étienne Montgolfier, who ran a paper factory in France. Joseph is said to have got the idea while watching laundry billow up over a fire. At first, the brothers thought smoke itself had a special lifting power. They were wrong: it was the heat.',
      { box: 'Still flying', text: 'Weather stations across Canada launch helium balloons twice a day. The balloons carry instruments high into the sky and send back the temperature and wind readings that forecasters need.' }
    ],
    guide: { before: 'Ask: why does a beach ball pop up when you push it underwater? Teach <b>dense</b> and <b>buoyancy</b>. Point out that <b>envelope</b> has a different meaning here.',
      after: 'If you could ride in a hot air balloon, where would you like to float, and what would you want to see?' },
    words: [['dense', 'having a lot of matter packed into a space'], ['buoyancy', 'the upward push of a liquid or gas on an object'], ['envelope', 'the fabric bag of a hot air balloon']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where are the air particles most spread out?',
        opts: ['inside the balloon', 'outside the balloon', 'in the basket'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In this passage, the <b>envelope</b> is …',
        opts: ['the balloon’s fabric bag', 'a paper cover for a letter', 'the basket'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why a hot air balloon rises. Use the words <i>dense</i> and <i>buoyancy</i>.',
        a: 'Heated air is less dense than the cool air around it. The cooler, denser air pushes it up, and this push is called buoyancy.', look: 'hot air less dense, and buoyancy as the upward push' },
      { k: 'choice', code: 'C3.2', q: 'A pilot wants to land. What should she do?',
        opts: ['let the air inside cool, or open the vent', 'turn up the burner', 'throw out the basket', 'wait for a stronger wind'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The author compares steering a balloon to “changing lanes on a highway.” How does this comparison help the reader?',
        a: 'Readers know how cars change lanes to go a different way, so they can picture the balloon moving into a different layer of wind.', look: 'a familiar picture that explains the idea' },
      { k: 'choice', code: 'B3.2', half: true, q: 'Which word is a gerund in “Steering a balloon takes skill”?',
        opts: ['Steering', 'balloon', 'takes'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Who were the first passengers of a hot air balloon?',
        opts: ['a sheep, a duck and a rooster', 'two pilots', 'scientists'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Which sentence did you need to read twice? What helped you understand it?',
        a: 'The sentence about hot air being less dense. The dots in the diagram helped me picture the particles spreading out.', look: 'a sentence named and a strategy that helped' }
    ]
  });

  P.add({
    id: 'g6-silver-dart', subject: 'history', form: 'Report',
    title: 'The Silver Dart',
    deck: 'Canada’s first powered flight, over the frozen bay at Baddeck in 1909',
    hero: {
      photo: 'g6-silver-dart.jpg', credit: 'Photo: Dennis G. Jarvis, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The Silver Dart. In 1909, it became the first powered airplane to fly in Canada.'
    },
    body: [
      'On February 23, 1909, about 150 people stood on the ice of Baddeck Bay, on Cape Breton Island in Nova Scotia. Some were scientists. Many were local people who had come with their horses and sleighs to see something they had never seen before. A strange craft of bamboo, wire and silver-coloured cloth sat on the ice. It was called the Silver Dart.',
      { h: 'The team behind it' },
      'The Silver Dart was built by the Aerial Experiment Association, a small team led by Alexander Graham Bell, the inventor of the telephone, who had a summer home at Baddeck. Bell had already spent years flying giant kites made of many small triangle-shaped cells, hoping one day to lift a person. His wife, Mabel Bell, who was deaf, paid for much of the work with her own money. The pilot was J.A.D. McCurdy, a young engineer who had grown up in Baddeck.',
      { fig: G.time([['1903', ['The Wright brothers fly in', 'the United States']], ['1907', ['The Bells set up the Aerial', 'Experiment Association']], ['Feb. 1909', 'The Silver Dart flies at Baddeck'], ['Mar. 1909', 'It flies more than 30 km'], ['Aug. 1909', 'It crashes during a test']], { x: 76, gap: 28, hl: 2 }),
        tall: 132, cap: 'The Silver Dart’s story in five dates.' },
      'McCurdy started the engine. The little aircraft raced across the ice, lifted about nine metres into the air and flew for nearly a kilometre at about 65 kilometres an hour. It was the first powered, controlled flight of an airplane anywhere in Canada, and in the whole British Empire. The crowd cheered and threw their hats in the air.',
      'It was a cold and risky test. If the engine had failed or a wing had snapped, McCurdy could have crashed onto the hard ice. But the team had prepared carefully, building and testing kites, gliders and earlier aircraft for two years and learning something from every failure.',
      { h: 'Ideas that lasted' },
      'The team tested daring ideas. The Silver Dart had <b>ailerons</b>, small flaps on the wings that tilt to help a plane bank and turn. Planes still use them today. In March, the Silver Dart flew more than 30 kilometres in loops around the bay, a long flight for the time. Later that year, it crashed during a test for the army and was never rebuilt.',
      { box: 'A long life', text: 'McCurdy kept flying. In 1910, he sent the first radio message from an airplane to the ground, and he later became the Lieutenant Governor of Nova Scotia.' },
      'In 2009, a <b>replica</b> of the Silver Dart flew over Baddeck Bay to mark 100 years of Canadian <b>aviation</b>.'
    ],
    guide: { before: 'Find Baddeck on Cape Breton Island. Teach <b>aviation</b>, <b>replica</b> and <b>ailerons</b> (tilt your flat hand to show a bank). Ask: what would it feel like to see a plane for the first time?',
      after: 'Mabel Bell’s money and ideas made the flight possible, but few people know her name. Whose work is often forgotten when we tell the story of an invention?' },
    words: [['aviation', 'the flying of airplanes'], ['ailerons', 'flaps on a wing that tilt to help a plane turn'], ['replica', 'an exact copy']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. How many years after the Wright brothers did the Silver Dart fly?',
        opts: ['6', '9', '3'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Ailerons</b> help a plane …',
        opts: ['bank and turn', 'land on ice', 'carry passengers'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'In “who had grown up in Baddeck,” <b>who</b> means …',
        opts: ['J.A.D. McCurdy', 'Alexander Graham Bell', 'Mabel Bell'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did many people come with horses and sleighs?',
        opts: ['It was winter, and sleighs were how people travelled on snow and ice.', 'They wanted to race the plane.', 'The plane had to be pulled.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'The author tells us that Mabel Bell, who was deaf, paid for much of the work. Why do you think the author included this detail?',
        a: 'To give credit to a woman whose part is often forgotten, and to show that people of all abilities help make discoveries.', look: 'credit to someone often left out, or a point about ability and inclusion' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize what happened on February 23, 1909.',
        a: 'In front of a crowd on the ice of Baddeck Bay, McCurdy flew the Silver Dart about nine metres high for nearly a kilometre. It was the first powered flight in Canada.', look: 'who, where, what happened and why it mattered' },
      { k: 'choice', code: 'C2.3', q: 'Before you read the section “Ideas that lasted,” what could you predict it would tell you?',
        opts: ['which of the team’s ideas are still used today', 'how Bell invented the telephone', 'what the crowd ate', 'how to build a sleigh'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 2, q: 'Why was the Silver Dart important? Give two reasons from the text.',
        a: 'It made the first powered, controlled flight in Canada and the British Empire, and its ailerons are still used on planes today.', look: 'two reasons from the text' }
    ]
  });

  P.add({
    id: 'g6-samaras', subject: 'science', form: 'Explanation',
    title: 'Seeds That Fly',
    deck: 'Maple keys, dandelion parachutes and the clever ways plants spread their seeds',
    hero: {
      photo: 'g6-samaras.jpg', credit: 'Photo: USFWSmidwest, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Silver maple samaras, often called keys or helicopters. Each wing carries one seed.'
    },
    body: [
      'In late spring, the sidewalks under silver maples are covered in little green wings. Toss one in the air and it spins down like a tiny helicopter. Children call them keys or helicopters; scientists call them <b>samaras</b>. Each one is a seed with a wing, and its spin is a brilliant piece of engineering. A single large silver maple can drop many thousands of keys in one spring.',
      { h: 'Why seeds travel' },
      'A plant cannot walk away to find a better place to grow. If all its seeds landed right underneath it, the young plants would compete with their parent and with each other for light, water and space. So plants have many ways to <b>disperse</b>, or spread out, their seeds. Some use animals, some use water, and some, like the maple, use the wind.',
      { fig: '<circle class="k" cx="52" cy="22" r="7"/><path class="k" d="M58 18 C84 4 116 6 128 16 C108 24 82 28 58 26"/>' +
          '<path class="d" d="M70 40 Q104 52 70 64 Q36 76 70 88 Q104 100 70 112"/>' + D.arrow(70, 112, 70, 134, 't') + G.T(108, 92, 'spins as', 'n') + G.T(108, 104, 'it falls', 'n') +
          '<path class="k" d="M226 136 V76"/><circle class="k" cx="226" cy="138" r="3"/>' +
          [-70, -50, -30, -10, 10, 30, 50, 70].map(function (a) { var r = a * Math.PI / 180; return '<path class="t" d="M226 76 L' + (226 + 44 * Math.sin(r)).toFixed(1) + ' ' + (76 - 40 * Math.cos(r)).toFixed(1) + '"/>'; }).join('') +
          G.T(226, 24, 'parachute', 'n', 'middle') + G.T(52, 150, 'maple samara', 'lb', 'middle') + G.T(226, 160, 'dandelion seed', 'lb', 'middle'),
        tall: 164, cap: 'Two ways to fly. A samara spins like a helicopter; a dandelion seed floats under a parachute of hairs.' },
      'When a samara falls, its wing makes it spin. The spinning creates a small swirl of air, called a <b>vortex</b>, above the wing, which gives the seed lift and slows its fall. The slower a seed falls, the longer the wind has to carry it. A maple key dropped from a tall tree on a windy day can land more than 100 metres away.',
      { h: 'Other flyers' },
      'Dandelion seeds use a different trick. Each seed hangs under a fluffy parachute of fine hairs. Air flowing through the hairs forms a ring-shaped swirl above it that keeps the seed floating, sometimes for kilometres. Cottonwood seeds drift on cotton-like fluff, and milkweed pods burst open in the fall to release silky seeds into the breeze.',
      'Not all seeds fly. Burdock seeds have hooks that grab onto fur and socks. Raspberry seeds ride inside birds and are dropped far away. Coconuts float across oceans for months. Each method solves the same problem: how to get away from the parent plant.',
      { box: 'Inspired by seeds', text: 'Engineers have studied samaras to design tiny drones and sensors that can be dropped from the air and float gently to the ground.' },
      'Next time a maple key spins past you, remember that it is on a journey. If it is lucky, it will land on bare, damp soil, put down a root and, in fifty years, drop its own helicopters onto the sidewalk.'
    ],
    guide: { before: 'If it is the season, collect maple keys and drop them from a height; otherwise make a paper helicopter. Teach <b>samaras</b>, <b>disperse</b> and <b>vortex</b>.',
      after: 'Go on a short seed hunt outside. Sort what you find by how each seed travels: wind, water, animals or people.' },
    words: [['samaras', 'seeds with a flat wing, such as maple keys'], ['disperse', 'to spread out over a wide area'], ['vortex', 'a swirl of air or water']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How does a dandelion seed fly?',
        opts: ['under a parachute', 'by spinning', 'with a wing'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'The prefix <i>dis-</i> can mean apart. To <b>disperse</b> seeds is to …',
        opts: ['spread them apart', 'gather them up', 'plant them in rows'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Compare how the seeds travel. Fill in the chart.', cols: ['Seed', 'How it travels'],
        rows: [['Maple samara', null], ['Dandelion seed', null], [null, 'Its pod bursts open and releases silky seeds into the breeze.']],
        a: [[null, 'Its wing makes it spin, which slows its fall.'], [null, 'It floats under a parachute of fine hairs.'], ['Milkweed', null]] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why is it helpful for a seed to fall slowly?',
        a: 'The wind has more time to carry it, so it lands farther from its parent and has less competition for light and water.', look: 'more time in the wind, and less competition far from the parent' },
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the section “Why seeds travel”?',
        opts: ['Plants spread their seeds so young plants are not crowded.', 'Maples grow quickly.', 'Seeds are green.', 'Animals eat seeds.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The author calls the samara’s spin “a brilliant piece of engineering.” Why is this an interesting choice of words for a seed?',
        a: 'Engineering is usually something people do. Using it for a seed shows that nature found a clever solution, the way an engineer would.', look: 'the idea that nature works like an engineer' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Where have you seen seeds travelling: on the wind, on water, on animals or on your clothes? Describe it.',
        a: 'Burrs stuck to my socks after a walk in a field, so I carried the seeds home.', look: 'a real observation linked to seed travel' },
      { k: 'lines', code: 'C3.8', n: 2, q: 'Which helped you more to understand how seeds fly: the words or the diagram? Explain why.',
        a: 'The diagram, because I could see the spinning path and the parachute instead of only imagining them.', look: 'a choice and a reason' }
    ]
  });

  P.add({
    id: 'g6-canadarm', subject: 'tech', form: 'Explanation',
    title: 'The Canadarm',
    deck: 'A Canadian robot arm that builds and repairs things in space',
    hero: {
      photo: 'g6-canadarm.jpg', credit: 'Photo: NASA, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The Canadarm on its first mission, aboard the space shuttle Columbia in 1981.'
    },
    body: [
      'Imagine trying to catch a satellite the size of a school bus while you are both flying around Earth at about 28&nbsp;000 kilometres an hour. Since 1981, astronauts have done just that, using a robot arm designed and built in Canada. Its official name was the Shuttle Remote Manipulator System, but everyone called it the Canadarm. It was built by engineers in Toronto, working with Canada’s National Research Council.',
      { h: 'An arm like yours' },
      'The Canadarm was built much like a human arm. It had a shoulder joint, an elbow joint and a wrist joint. At the end, instead of a hand, it had a gripper called an <b>end effector</b>: inside it, wires snapped closed around a pin on the object it was grabbing. The arm was 15 metres long, but it weighed only about 410 kilograms, because it never had to hold up its own weight.',
      { fig: '<rect class="k" x="4" y="118" width="292" height="16"/>' + G.T(150, 130, 'shuttle cargo bay', 'n', 'middle') +
          '<path class="k" d="M22 112 L138 38 L234 74"/><path class="k" d="M26 116 L140 44 L232 80"/>' +
          '<circle class="a" cx="24" cy="112" r="7"/><circle class="a" cx="139" cy="41" r="7"/><circle class="a" cx="233" cy="77" r="6"/><rect class="k" x="240" y="68" width="30" height="18"/>' +
          G.T(36, 106, 'shoulder', 'n') + G.T(139, 24, 'elbow', 'n', 'middle') + G.T(216, 100, 'wrist', 'n') + G.T(296, 60, 'end effector', 'n', 'end'),
        tall: 138, cap: 'The Canadarm’s joints work like a human arm. Astronauts moved it with hand controllers inside the shuttle.' },
      'On Earth, the arm could not even lift itself. In space, where everything is <b>weightless</b>, it could move objects as heavy as a loaded bus. Astronauts controlled it from inside the shuttle with two hand controllers, watching through windows and cameras. They had to move slowly and carefully, because a heavy object that starts moving in space keeps moving until something stops it.',
      { h: 'Fixing Hubble' },
      'The Canadarm flew on 90 shuttle missions. It launched and caught satellites, held astronauts on its end like a cherry picker, and helped repair the Hubble Space Telescope, whose blurry vision was fixed in 1993. In 2001, a bigger arm, Canadarm2, was installed on the International Space Station, where it still works today. It can move end over end along the station like an inchworm. It has a partner, too: Dextre, a two-armed Canadian robot that does delicate repair jobs so astronauts do not have to risk a spacewalk.',
      { box: 'On your money', text: 'Canadarm2 became a symbol of Canadian <b>innovation</b>. You can find it on the back of the Canadian five-dollar bill.' },
      'The original Canadarm now hangs in the Canada Aviation and Space Museum in Ottawa, where visitors can see the arm that changed how people work in space.'
    ],
    guide: { before: 'Ask the child to pick up a pencil and name the joints they used. Teach <b>end effector</b>, <b>weightless</b> and <b>innovation</b>.',
      after: 'If you could design a new robot arm for space, what job would it do, and what kind of “hand” would it need?' },
    words: [['end effector', 'the gripping tool at the end of a robot arm'], ['weightless', 'seeming to have no weight, as things do in orbit'], ['innovation', 'a new idea, method or invention']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, which joint is between the shoulder and the wrist?',
        opts: ['the elbow', 'the end effector', 'the cargo bay'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>In-</i> can mean into, and <i>nova</i> means new. <b>Innovation</b> means …',
        opts: ['bringing in new ideas', 'fixing old things', 'staying the same'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why could the arm not lift itself on Earth, yet move a bus-sized load in space?',
        a: 'Things are weightless in space, so the arm did not have to hold up its own weight or the weight of the load.', look: 'weightlessness in space' },
      { k: 'choice', code: 'C3.3', q: 'Why did astronauts have to move the arm slowly?',
        opts: ['An object moving in space keeps moving until something stops it.', 'The arm was made of glass.', 'The cameras were slow.', 'The shuttle was small.'], a: 0 },
      { k: 'choice', code: 'B3.2', q: 'Which sentence is in the passive voice?',
        opts: ['Canadarm2 was installed on the space station in 2001.', 'The arm caught satellites.', 'Astronauts controlled it.', 'It still works today.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Comparing Canadarm2 to an inchworm helps you picture …',
        opts: ['how it moves end over end', 'its colour', 'its weight'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'In “whose blurry vision was fixed,” <b>whose</b> refers to …',
        opts: ['the Hubble Space Telescope', 'the Canadarm', 'the astronauts'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize three jobs the Canadarm did in space.',
        a: 'It launched and caught satellites, held astronauts in place as they worked, and helped repair the Hubble Space Telescope.', look: 'three jobs from the text' },
      { k: 'lines', code: 'C2.2', n: 2, q: 'Why might someone who wants to be an engineer choose to read this passage?',
        a: 'It shows how engineers copied the human arm to solve a hard problem in space, which could give them ideas.', look: 'a purpose that fits the reader' }
    ]
  });

  P.add({
    id: 'g6-midnight-sun', subject: 'science', form: 'Explanation',
    title: 'The Sun at Midnight',
    deck: 'Why the Arctic has days without night, and why we have seasons',
    hero: {
      photo: 'g6-midnight-sun.jpg', credit: 'Photo: Daniel Case, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The midnight sun over Inuvik, Northwest Territories, where the Sun does not set for about eight weeks each summer.'
    },
    body: [
      'In Inuvik, in the Northwest Territories, children can play outside at midnight in June without a flashlight. From late May to late July, the Sun never sets. It simply circles the sky, dipping low toward the horizon at night and climbing again. In December, the opposite happens: for about a month, the Sun does not rise at all.',
      { h: 'A tilted planet' },
      'The reason is Earth’s <b>tilt</b>. Earth spins on an imaginary line through the North and South Poles, called its <b>axis</b>. The axis is not straight up and down; it leans about 23.5 degrees. As Earth travels around the Sun each year, the axis always points the same way in space. So for part of the year, the Northern Hemisphere leans toward the Sun, and for part of the year, it leans away.',
      { fig: '<ellipse class="d" cx="150" cy="66" rx="100" ry="38"/><circle class="a" cx="150" cy="66" r="16"/>' + G.T(150, 70, 'Sun', 'n', 'middle') +
          '<circle class="k" cx="50" cy="66" r="14"/><path class="k" d="M44 84 L56 48"/><circle class="k" cx="250" cy="66" r="14"/><path class="k" d="M244 84 L256 48"/>' +
          G.T(58, 44, 'N', 'lb') + G.T(258, 44, 'N', 'lb') + D.arrow(70, 66, 128, 66, 't') +
          G.T(50, 112, 'June', 'lb', 'middle') + G.T(50, 126, 'North leans in', 'n', 'middle') + G.T(250, 112, 'December', 'lb', 'middle') + G.T(250, 126, 'North leans away', 'n', 'middle'),
        tall: 132, cap: 'Earth in June and December, not to scale. The axis always leans the same way.' },
      'When your half of Earth leans toward the Sun, sunlight hits it more directly, and the Sun stays above the horizon longer. Days are long and warm: it is summer. When your half leans away, the sunlight arrives at a low slant and spreads out, like a flashlight beam shone on the floor at an angle. Days are short and cold: it is winter. The farther north you go, the bigger the difference. In Windsor, the longest summer day has about 15 hours of daylight; in Inuvik, it has 24.',
      { h: 'Equal day and night' },
      'Twice a year, around March 20 and September 22, Earth’s axis leans neither toward nor away from the Sun. These days are called <b>equinoxes</b>, from Latin words meaning “equal night.” On an equinox, almost every place on Earth has about twelve hours of daylight and twelve hours of darkness.',
      { h: 'Living with the light' },
      'Above the Arctic Circle, the difference is extreme. For Inuit and Inuvialuit families, summer’s endless daylight has long been a time for travelling, fishing and gathering, while the dark months were a time for storytelling, sewing and making tools. Today, northern towns hold festivals in January to welcome the Sun back. In Inuvik, people gather to greet the first sunrise after weeks of darkness.',
      { box: 'Not distance', text: 'Many people think summer comes when Earth is closest to the Sun. In fact, Earth is closest to the Sun in early January, during our winter! The tilt, not the distance, makes the seasons.' }
    ],
    guide: { before: 'Tilt a ball (or an orange with a pencil through it) and walk it around a lamp, keeping the tilt the same. Teach <b>axis</b> and <b>tilt</b>. Find Inuvik on a map.',
      after: 'What would you do differently if the Sun never set for eight weeks? What would you miss during weeks without sunrise?' },
    words: [['tilt', 'a lean to one side'], ['axis', 'the imaginary line that Earth spins around'], ['equinoxes', 'the two days a year when day and night are about the same length']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'Which mistaken idea does the box “Not distance” correct?',
        opts: ['Summer happens when Earth is closest to the Sun.', 'Earth is round.', 'The Sun is hot.', 'Earth spins.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, in which month does the North lean toward the Sun?',
        opts: ['June', 'December', 'both months'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Earth’s <b>axis</b> is …',
        opts: ['the line it spins around', 'its path around the Sun', 'its hottest point'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'Winter sunlight is compared to “a flashlight beam shone on the floor at an angle.” What does this help you understand?',
        a: 'Slanted light spreads over a bigger area, so each part gets less light and heat.', look: 'slanted light is spread out and weaker' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Inuvik have days without night in June, but Toronto does not?',
        a: 'Inuvik is much farther north, above the Arctic Circle. When the North leans toward the Sun, the Sun stays up all day and night there. Toronto is too far south.', look: 'farther north, so the tilt has a bigger effect' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How did the seasons of light and dark shape traditional ways of life in the North? Use details.',
        a: 'Summer daylight was for travelling, fishing and gathering. The dark months were for storytelling, sewing and making tools. Today, people celebrate the Sun’s return.', look: 'activities for both seasons, or the festival' },
      { k: 'choice', code: 'C2.1', q: 'Which experience could help you understand why direct sunlight feels warmer?',
        opts: ['Standing in the noon sun feels hotter than standing in early morning light.', 'Snow is white.', 'Fish live in water.', 'Clocks have hands.'], a: 0 }
    ]
  });

  P.add({
    id: 'g6-eclipse', subject: 'science', form: 'Report',
    title: 'When Day Turned to Night',
    deck: 'The total solar eclipse of April 8, 2024, and how the Moon blocks the Sun',
    hero: {
      photo: 'g6-eclipse.jpg', credit: 'Photo: Pcbeetle, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The total solar eclipse of April 8, 2024, seen from Hamilton, Ontario. The Sun’s glowing outer layer, the corona, appears around the dark Moon.'
    },
    body: [
      'At 3:18 p.m. on April 8, 2024, the sky over Niagara Falls went dark. Streetlights flickered on, birds fell silent, and the air turned cool. Thousands of people on both sides of the border looked up through special glasses and cheered. For about three and a half minutes, the Moon completely covered the Sun. It was a total <b>solar eclipse</b>.',
      { h: 'A perfect fit' },
      'An eclipse happens when the Moon passes directly between the Sun and Earth and casts its shadow on Earth. The Sun is about 400 times wider than the Moon, but it is also about 400 times farther away. This amazing coincidence makes them look almost the same size in our sky, so the Moon can cover the Sun exactly. Eclipses do not happen every month, because the Moon’s path is tipped slightly compared with Earth’s path. Usually, the Moon passes a little above or below the Sun in our sky.',
      { fig: '<path class="a" d="M4 14 A56 56 0 0 1 4 126"/>' + G.T(8, 74, 'Sun', 'lb') + '<path class="t" d="M4 14 L170 62 L262 74 M4 126 L170 78 L262 66"/>' +
          '<circle class="k" cx="170" cy="70" r="8"/>' + G.T(170, 52, 'Moon', 'n', 'middle') + '<path class="h" d="M170 62 L254 69 L254 71 L170 78 Z"/>' +
          '<path class="k" d="M296 10 A62 62 0 0 0 296 130"/>' + G.T(290, 140, 'Earth', 'n', 'end') + D.label(150, 120, 'total eclipse here', 252, 72),
        tall: 144, cap: 'Not to scale. Inside the Moon’s darkest shadow, the Sun is completely hidden.' },
      'Because the Moon is small, its darkest shadow is narrow. On April 8, the path of <b>totality</b>, the strip where the Sun was completely covered, was only about 180 kilometres wide. It crossed Mexico and the United States, then passed over Niagara Falls, Kingston, Montréal, Fredericton and Newfoundland. People outside that strip, including most of Toronto, saw a partial eclipse, with a bite taken out of the Sun.',
      { h: 'Protect your eyes' },
      'Looking straight at the Sun, even when most of it is covered, can permanently damage your <b>retina</b>, the part of your eye that senses light. That is why viewers wore eclipse glasses, which block almost all sunlight, or made pinhole viewers from cardboard boxes. Only during the brief minutes of totality is it safe to look with bare eyes. Some people watched the ground instead: gaps between leaves made hundreds of tiny crescent suns in the shade of the trees.',
      { box: 'Next time', text: 'Canada’s next total solar eclipse will cross parts of Alberta, Saskatchewan and the Northwest Territories in 2044.' },
      'Long before telescopes, people around the world told stories to explain eclipses, and many cultures still mark them with special teachings, songs or quiet reflection.'
    ],
    guide: { before: 'Hold a coin at arm’s length and close one eye: it can hide a far-off lamp or window. Teach <b>solar eclipse</b>, <b>totality</b> and <b>retina</b>. Stress: never look at the Sun.',
      after: 'If you saw the 2024 eclipse, describe it. If not, ask a family member what they remember. How would you prepare for the 2044 eclipse?' },
    words: [['solar eclipse', 'when the Moon blocks the Sun’s light from part of Earth'], ['totality', 'the time or place where the Sun is completely covered'], ['retina', 'the part at the back of the eye that senses light']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, where is the Moon during an eclipse?',
        opts: ['between the Sun and Earth', 'behind Earth', 'beside the Sun'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Your <b>retina</b> is …',
        opts: ['the part of your eye that senses light', 'a pair of glasses', 'a shadow'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How can the small Moon cover the huge Sun?',
        a: 'The Sun is about 400 times wider than the Moon, but also about 400 times farther away, so they look almost the same size.', look: 'both “400 times” facts' },
      { k: 'choice', code: 'C1.1', half: true, q: 'In “It crossed Mexico and the United States,” <b>It</b> means …',
        opts: ['the path of totality', 'the Sun', 'the crowd'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Why does the author begin with streetlights, silent birds and cool air?',
        opts: ['to help readers feel what it was like', 'to list facts about birds', 'to explain streetlights'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 2, q: 'Why did most people in Toronto see only a partial eclipse? Use the word <i>totality</i>.',
        a: 'Most of Toronto was outside the narrow path of totality, so the Moon covered only part of the Sun there.', look: 'outside the path of totality' },
      { k: 'choice', code: 'C2.2', q: 'Which reader would most want to read this passage?',
        opts: ['someone planning to watch the next eclipse safely', 'someone learning to swim', 'a baker', 'a soccer coach'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 2, q: 'Which strategy helped you most here: picturing the scene, studying the diagram or rereading? Why?',
        a: 'Studying the diagram, because I could see how the Moon’s shadow lands on only a small part of Earth.', look: 'a named strategy and why it worked' }
    ]
  });

  P.add({
    id: 'g6-pier-21', subject: 'history', form: 'Report',
    title: 'Gateway to Canada',
    deck: 'Pier 21 in Halifax, where nearly a million newcomers took their first steps into Canada',
    hero: {
      photo: 'g6-pier21.jpg', credit: 'Photo: E.A. Bollinger, Public domain, Wikimedia Commons', focus: '50% 35%',
      tall: 220,
      cap: 'A woman and her baby arrive at Pier 21 in Halifax, Nova Scotia, in 1948.'
    },
    body: [
      'After days or weeks at sea, the passengers crowded the rails as their ship slid into Halifax Harbour. Ahead stood a long building on the waterfront: Pier 21. From 1928 to 1971, nearly one million <b>immigrants</b> walked through its doors. For many, it was their very first step onto Canadian soil.',
      { fig: G.flow(['The ship arrives in Halifax Harbour.', 'Officers check each person’s papers.', 'Doctors check for illness.', 'Volunteers give food, clothes and help.', 'A train carries newcomers west.'], { bh: 22, gap: 8, hl: 4 }),
        tall: 144, cap: 'A newcomer’s journey through Pier 21.' },
      { h: 'A day at the pier' },
      'New arrivals carried everything they owned in a trunk or a few suitcases. Inside a huge hall, they lined up to show their papers to immigration officers, and doctors checked them for illness. Volunteers from the Red Cross and other groups gave out milk for babies, warm clothes and kind words, often in the newcomers’ own languages. Then most people walked to a train waiting beside the pier, ready to carry them west to Montréal, Toronto, Winnipeg and beyond.',
      'For some, the wait was long. Officers could send people back if their papers were not in order or if they were ill. Families sometimes stayed in the building for days, sleeping in rooms behind wire fences, unsure whether they would be allowed to stay.',
      'The people who arrived reflected the world’s troubles and hopes. During the Second World War, about 3000 “war guests,” British children sent away from the bombing in their country, came through Pier 21. After the war, tens of thousands of <b>refugees</b>, people forced to flee their homes, arrived from Europe, along with war brides, women who had married Canadian soldiers overseas, and their children. Later came newcomers from Hungary, Italy, the Netherlands, the Caribbean and many other places.',
      { h: 'Not always welcome' },
      'Not everyone found the doors open. For many years, Canada’s rules favoured newcomers from Britain and northern Europe and made it hard for others to come. In 1939, the ship MS <i>St. Louis</i>, carrying more than 900 Jewish refugees escaping Nazi Germany, asked to come to Canada and was turned away. Many of its passengers later died in the Holocaust. Today, a memorial at Pier 21 remembers them.',
      'Since 2011, Pier 21 has been home to the Canadian Museum of Immigration. Families visit to search for the names of their grandparents and great-grandparents on old ship lists, and many leave their own stories of arriving in Canada.'
    ],
    guide: { before: 'Find Halifax on a map and trace a ship’s route from Europe. Teach <b>immigrants</b> and <b>refugees</b>. Ask: what would you pack if you could bring only one suitcase?',
      after: 'Talk about how your family, or a family you know, came to live in Canada. What would make a newcomer feel welcome at your school?' },
    words: [['immigrants', 'people who move to a new country to live'], ['refugees', 'people forced to flee their homes because of war or danger']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What happened right after the health check?',
        opts: ['Volunteers gave help.', 'The ship arrived.', 'Papers were checked.'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'The prefix <i>im-</i> can mean into. An <b>immigrant</b> is someone who …',
        opts: ['moves into a new country', 'leaves on a holiday', 'works on a ship'], a: 0 },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart about people who came through Pier 21.', cols: ['Group', 'Why they came'],
        rows: [['War guests', null], ['Refugees', null], ['War brides', null]],
        a: [[null, 'They were British children sent away from the bombing.'], [null, 'They were forced to flee their homes in Europe.'], [null, 'They had married Canadian soldiers overseas.']] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does the section “Not always welcome” show that Canada’s rules were not fair to everyone?',
        a: 'The rules favoured people from Britain and northern Europe and made it hard for others to come. The St. Louis, full of Jewish refugees, was turned away.', look: 'the unfair rules, with the St. Louis as an example' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think volunteers spoke to newcomers in their own languages?',
        a: 'The newcomers were tired and nervous in a strange place. Hearing their own language would help them feel welcome and understand what to do.', look: 'comfort, and understanding what to do' },
      { k: 'choice', code: 'C3.5', q: 'Why does the author include the story of the <i>St. Louis</i> in a passage about welcoming newcomers?',
        opts: ['to show a darker side of the history', 'to describe a holiday cruise', 'to explain how ships float', 'to praise the rules of the time'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Think of someone you know or have read about who moved to Canada. How might their arrival be like or unlike arriving at Pier 21?',
        a: 'My neighbour arrived by plane at Pearson Airport. Like the people at Pier 21, she showed her papers, but she did not have to take a train west.', look: 'a real connection with a likeness or a difference' }
    ]
  });

  P.add({
    id: 'g6-henson', subject: 'history', form: 'Biography',
    title: 'Josiah Henson’s Journey',
    deck: 'From slavery in Maryland to building a free community in Ontario',
    hero: {
      photo: 'g6-henson-house.jpg', credit: 'Photo: Chris Woodrich, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'Josiah Henson’s house, now part of the Josiah Henson Museum of African-Canadian History in Dresden, Ontario.'
    },
    body: [
      'Josiah Henson was born into <b>slavery</b> in Maryland in 1789. As a child, he saw his father punished and sold away, and he never saw him again. Henson grew up working in tobacco fields, owned by men who treated him as property. Yet he became a preacher, a community builder and one of the best-known Black Canadians of his time. In Canada, he even learned to read as an adult, taught by his son.',
      { fig: G.time([['1789', 'Born into slavery in Maryland'], ['1830', 'Escapes with his family to Upper Canada'], ['1841', 'Helps found the Dawn Settlement'], ['1849', 'Publishes the story of his life'], ['1877', 'Meets Queen Victoria in England'], ['1883', 'Dies in Dresden, Ontario']], { gap: 24, hl: 1 }),
        tall: 134, cap: 'Key dates in Josiah Henson’s life.' },
      { h: 'Escape' },
      'Henson had saved money to buy his freedom, but his enslaver cheated him and planned to sell him far from his family. In 1830, Henson made a dangerous decision. With his wife, Nancy, and their four children, he escaped north. They travelled mostly at night, hiding in forests, sometimes going hungry, and Henson carried the two youngest children on his back. After six weeks, they crossed the Niagara River into Upper Canada, now Ontario, where slavery had been <b>abolished</b>. Henson knelt and kissed the ground.',
      'Henson knew that freedom needed more than escape. People also needed land, schools and skills. In 1841, he helped found the Dawn Settlement near Dresden, a community of people who had escaped slavery, with a school, a sawmill and farms. Henson returned to the United States many times to guide others along the <b>Underground Railroad</b>, a secret network of routes and safe houses that led people to freedom.',
      'Life at Dawn was not easy. Money was always short, and people argued about how the school should be run. Still, for many families, it was the first place where they could own land, earn wages and send their children to school.',
      { h: 'A famous story' },
      'In 1849, Henson published the story of his life. The American writer Harriet Beecher Stowe read it, and many believe it helped inspire her novel <i>Uncle Tom’s Cabin</i>, which turned many readers against slavery. Henson later travelled to England, where he spoke to large crowds and met Queen Victoria. He used his fame to raise money for the community and to speak out against slavery.',
      { box: 'Visit today', text: 'Henson’s home in Dresden is now a museum. Visitors can see his house, a church, and the cemetery where he is buried.' }
    ],
    guide: { before: 'Find Maryland, the Niagara River and Dresden, Ontario, on a map. Teach <b>slavery</b>, <b>abolished</b> and <b>Underground Railroad</b> (it was not a real railway). This topic can be upsetting: check in with the child as you read.',
      after: 'Henson believed freedom needed land, schools and skills. What do people need today to build a good life in a new place?' },
    words: [['slavery', 'a system in which people are owned and forced to work without pay or freedom'], ['abolished', 'ended by law'], ['Underground Railroad', 'a secret network of routes and safe houses that helped people escape slavery']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'How is most of this passage organized?',
        opts: ['in time order', 'compare and contrast', 'as a list of steps'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. How old was Henson when he escaped?',
        opts: ['41', '34', '52'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'If slavery was <b>abolished</b>, it was …',
        opts: ['ended by law', 'made larger', 'kept secret'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'In “carried the two youngest children on his back,” <b>his</b> means …',
        opts: ['Henson’s', 'the enslaver’s', 'the oldest child’s'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think Henson knelt and kissed the ground when he reached Upper Canada?',
        a: 'He was overjoyed and thankful to be free at last after a long, dangerous journey.', look: 'joy, relief or thanks at being free' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Henson “knew that freedom needed more than escape.” What else did people need, and what did he do about it?',
        a: 'They needed land, schools and skills. He helped found the Dawn Settlement, with a school, a sawmill and farms.', look: 'the needs, and his action' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Before reading, what did you predict from the title? How did your idea change as you read?',
        a: 'I thought it would be about a trip. It was about a brave escape to freedom and building a community.', look: 'a prediction and how it was checked or changed' },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Why is it important for Canadians to learn about Black Canadian history, such as Henson’s story?',
        a: 'It is part of Canada’s history that is often left out, and it shows the courage and work of Black Canadians who helped build this country.', look: 'a reason linked to inclusion or a fuller history' }
    ]
  });

  P.add({
    id: 'g6-tintamarre', subject: 'social', form: 'Report',
    title: 'A Joyful Noise',
    deck: 'The Acadian people, their hard history and the loud parade that celebrates them',
    hero: {
      photo: 'g6-tintamarre.jpg', credit: 'Photo: Quiet kiai, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A tintamarre in Fredericton, New Brunswick. On August 15, Acadians celebrate by making as much noise as they can.'
    },
    body: [
      'Every August 15, in towns across New Brunswick, Nova Scotia and Prince Edward Island, the streets fill with noise. People bang pots and pans, blow horns, shake rattles and ring bells. Many wear the blue, white and red of the Acadian flag with its gold star. This joyful racket is called a <b>tintamarre</b>, and it says: “We are still here!”',
      { fig: '<rect class="k" x="10" y="8" width="150" height="96"/><path class="k" d="M60 8 V104 M110 8 V104"/>' +
          '<path class="a" d="M35 22 L39 33 L50 33 L41 40 L44 51 L35 44 L26 51 L29 40 L20 33 L31 33 Z"/>' +
          G.T(35, 120, 'blue', 'n', 'middle') + G.T(85, 120, 'white', 'n', 'middle') + G.T(135, 120, 'red', 'n', 'middle') +
          G.T(176, 30, 'gold star:', 'lb') + G.T(176, 46, 'the Stella Maris,', 'l') + G.T(176, 60, '“star of the sea,”', 'l') + G.T(176, 74, 'a guide for a', 'l') + G.T(176, 88, 'seafaring people', 'l') + D.arrow(172, 34, 52, 36, 't'),
        tall: 126, cap: 'The Acadian flag, chosen in 1884. The colours are those of France; the star makes it Acadian.' },
      { h: 'A home by the sea' },
      'The Acadians are descendants of French settlers who arrived in the early 1600s in a land they called Acadie, now Nova Scotia, New Brunswick and Prince Edward Island. They learned from the Mi’kmaq, who had lived there for thousands of years, and they built dikes to turn salt marshes into rich farmland.',
      { h: 'The Deportation' },
      'In 1755, Britain controlled the region and was at war with France. British officials demanded that the Acadians swear loyalty to the British king and promise to fight against France if asked. Most Acadians wanted to stay neutral. In response, soldiers rounded them up, burned their homes and forced more than 10&nbsp;000 people onto ships. Families were split apart and scattered to other colonies, to France and beyond. Thousands died. Acadians call this event <b>le Grand Dérangement</b>, the Great Upheaval.',
      'Over the following years, some Acadians found their way back and built new communities along the coasts. Others made a new home in Louisiana, where their descendants are known as Cajuns.',
      { h: 'Still here' },
      'Today, there are hundreds of thousands of Acadians, and many still speak French with their own Acadian words and expressions. Many say the modern tintamarre grew from the 1955 celebrations marking 200 years since the deportation. It turns a sad memory into a loud celebration of survival: a people who were scattered did not disappear.',
      'On National Acadian Day, families dress in blue, white and red, paint gold stars on their cheeks. In many towns, the noise begins at exactly six o’clock.',
      { box: 'Language matters', text: 'New Brunswick is Canada’s only officially <b>bilingual</b> province: its laws and government services are in both English and French.' }
    ],
    guide: { before: 'Find New Brunswick, Nova Scotia, Prince Edward Island and Louisiana on a map. Teach <b>tintamarre</b>, <b>bilingual</b> and the word upheaval. This history includes loss: talk about how the families might have felt.',
      after: 'Make your own small tintamarre with pots and spoons. Then talk about it: why might a loud celebration be a good way to remember a sad event?' },
    words: [['tintamarre', 'a noisy parade held by Acadians on August 15'], ['le Grand Dérangement', 'the forced removal of the Acadians, starting in 1755'], ['bilingual', 'using two languages']],
    qs: [
      { k: 'lines', code: 'C3.4', n: 3, q: 'The tintamarre is a cultural celebration. What do its noise and colours mean to Acadians?',
        a: 'The noise says that Acadians are still here and proud, even after being scattered. The flag’s colours and star show who they are.', look: 'survival or pride, and the flag as a sign of identity' },
      { k: 'choice', code: 'C1.4', half: true, q: 'In the diagram, what does the gold star stand for?',
        opts: ['the star of the sea', 'a soldier', 'the Sun'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Bi-</i> means two. A <b>bilingual</b> province uses …',
        opts: ['two languages', 'two flags', 'two capitals'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'Which text pattern does the section “The Deportation” mostly use?',
        opts: ['cause and effect', 'compare and contrast', 'a list of steps', 'question and answer'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'British officials saw the Acadians as a danger. How did most Acadians see themselves? Use evidence.',
        a: 'They wanted to stay neutral and not fight for either side, so they did not see themselves as enemies.', look: 'their wish to stay neutral' },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why might the tintamarre have grown from the 200th anniversary?',
        opts: ['to turn a sad memory into a celebration', 'because it was a holiday in France', 'to scare away soldiers'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>upheaval</b> is …',
        opts: ['a huge, sudden change', 'a calm time', 'a kind of boat'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What celebration in your family or community remembers a part of its history? How is it like the tintamarre?',
        a: 'Remembrance Day remembers soldiers. Like the tintamarre, it keeps a hard part of history alive, but it is quiet instead of loud.', look: 'a real celebration and a likeness or difference' }
    ]
  });

  P.add({
    id: 'g6-komagata-maru', subject: 'history', form: 'Report',
    title: 'The Komagata Maru',
    deck: 'In 1914, a ship full of passengers from India was turned away from Canada',
    hero: {
      photo: 'g6-komagata-maru.jpg', credit: 'Photo: See description, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Passengers on the deck of the Komagata Maru in Vancouver Harbour, 1914. Most were Sikhs from Punjab, in India.'
    },
    body: [
      'On May 23, 1914, a steamship called the Komagata Maru sailed into Vancouver Harbour. On board were 376 passengers from Punjab, in India, most of them Sikh. Many had sold land or borrowed money to pay for the trip. They hoped to work in Canada and build better lives. Instead, they would spend two months trapped on the ship, within sight of the city.',
      { fig: G.time([['May 23', 'The ship arrives in Vancouver'], ['June', 'Food and water run low on board'], ['July 23', ['A navy ship escorts the', 'Komagata Maru out to sea']], ['Sept. 29', ['19 passengers are killed', 'at Budge Budge, India']], ['2016', 'Canada’s prime minister apologizes']], { x: 70, gap: 27, hl: 4 }),
        tall: 132, cap: 'What happened to the Komagata Maru and its passengers.' },
      { h: 'A rule made to keep them out' },
      'At the time, India and Canada were both part of the British Empire, and the passengers were British subjects. But Canada’s government wanted to stop people from India from coming. In 1908, it had made the “continuous journey” rule: newcomers could enter only if they came on one non-stop trip from their home country. There was no such trip from India, so the rule kept almost everyone out without naming India at all. Unfairness built into rules like this is called <b>systemic discrimination</b>.',
      { h: 'Trapped in the harbour' },
      'Officials would not let the passengers off the ship. Only about 20 returning residents, plus the ship’s doctor and his family, were allowed in. For two months, the others waited on board as food and water ran low. The Sikh community in Vancouver raised money and went to court for them, but the court sided with the government. On July 23, a navy warship escorted the Komagata Maru out of the harbour.',
      'When the ship reached India in September, British soldiers met it at a place called Budge Budge. A fight broke out, and 19 passengers were shot and killed.',
      'Back in Vancouver, local Sikh and South Asian residents had formed a group called the Shore Committee. They raised money to pay for the ship, sent food to the passengers and took the case to court. They lost, but they never stopped telling the story, and their efforts helped make sure it would not be forgotten.',
      { h: 'Saying sorry' },
      'In 2016, Prime Minister Justin Trudeau stood in the House of Commons and offered a full <b>apology</b>. Today, a memorial in Vancouver lists the passengers’ names, and the story is taught as a reminder of who has been welcomed in Canada, and who has not.'
    ],
    guide: { before: 'Find Punjab, India, and Vancouver on a map. Teach <b>systemic discrimination</b> with an example: a rule that sounds fair but shuts some people out. Teach <b>apology</b>.',
      after: 'Can a rule be unfair even if it treats everyone “the same” on paper? Think of a school or game rule and test it together.' },
    words: [['systemic discrimination', 'unfairness that is built into rules or systems'], ['apology', 'a statement saying sorry for a wrong']],
    qs: [
      { k: 'lines', code: 'C3.2', n: 3, q: 'How did the “continuous journey” rule keep people from India out without naming India?',
        a: 'There was no non-stop trip from India to Canada, so people from India could never meet the rule.', look: 'no direct trip was possible' },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. How long after arriving was the ship forced to leave?',
        opts: ['two months', 'two weeks', 'two years'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Systemic discrimination</b> is unfairness that …',
        opts: ['is built into rules', 'happens once by accident', 'happens only in sports'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'Whose point of view does the author mostly share?',
        opts: ['the passengers and their supporters', 'the government officials', 'the ship’s owner', 'the navy captain'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Which sentence uses a comma correctly after a transition word?',
        opts: ['Instead, they would spend two months trapped on the ship.', 'Instead they, would spend two months trapped on the ship.', 'Instead they would, spend two months trapped on the ship.', 'Instead they would spend two months, trapped, on the ship.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize what happened to the passengers in two or three sentences.',
        a: 'In 1914, the passengers were not allowed off the ship in Vancouver for two months. Then the ship was forced to leave, and in India, 19 passengers were killed.', look: 'the main events in order, in the child’s own words' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How does this story connect to the idea of including everyone in Canada today?',
        a: 'It shows a time when people were shut out because of where they came from. Remembering it reminds Canadians to treat newcomers fairly.', look: 'exclusion then, and fairness or inclusion now' }
    ]
  });

  P.add({
    id: 'g6-cocoa', subject: 'social', form: 'Report',
    title: 'From Bean to Bar',
    deck: 'Where chocolate comes from, who grows it and what fair trade means',
    hero: {
      photo: 'g6-cocoa.jpg', credit: 'Photo: Irene Scott/AusAID, CC BY 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'A cocoa farmer and his son with cocoa pods. Each pod holds about 30 to 50 beans.'
    },
    body: [
      'Canadians eat a lot of chocolate: several kilograms each, on average, every year. But no cocoa grows in Canada. Every chocolate bar starts its life thousands of kilometres away, as a bean inside a football-shaped pod on a tropical tree.',
      { fig: G.T(4, 10, 'Who gets the money from a chocolate bar? (rough estimate)', 'n') +
          G.bars([['Stores', 44, '44%'], ['Chocolate makers', 35, '35%'], ['Processors, shippers', 14, '14%'], ['Cocoa farmers', 7, '7%']], 44, { x0: 122, top: 22, gap: 26, pad: 36, hl: 3 }),
        tall: 128, cap: 'The farmers who grow the cocoa receive the smallest share of the price.' },
      { h: 'From pod to wrapper' },
      'Most of the world’s cocoa is grown on small family farms in West Africa, especially in Côte d’Ivoire and Ghana. Farmers cut the ripe pods from the trees with machetes, scoop out the beans and leave them to <b>ferment</b> under banana leaves for about a week, which brings out their chocolate flavour. Then the beans are dried in the sun, packed into sacks and shipped across the ocean. In factories in Europe and North America, they are roasted, ground and mixed with sugar and milk.',
      'The finished chocolate is stirred, cooled and poured into moulds, then wrapped and trucked to stores. By the time a bar reaches a shelf in Canada, its beans may have travelled more than 8&nbsp;000 kilometres. Many people handle it along the way: farmers, buyers, shippers, factory workers, companies and stores. Each one takes a share of the price you pay.',
      'Look at the chart. The farmers who do the hardest work receive the smallest share. Many cocoa farmers earn only a couple of dollars a day. Some families cannot afford to hire workers or send their children to school, and many children work on cocoa farms instead of studying.',
      { h: 'What is fair trade?' },
      '<b>Fair trade</b> is one attempt to change this. Companies that sell fair-trade chocolate promise to pay farmers at least a minimum price, plus extra money, called a <b>premium</b>, that the farming community can spend on schools, wells or clinics. Farms must also follow rules against child labour. Fair-trade products carry a special label so that shoppers can choose them.',
      'Fair trade is not a perfect solution. Fair-trade chocolate often costs more, only a small share of cocoa is sold this way, and checking every farm is difficult. Some people argue that big companies and governments must do much more. Still, each time a shopper reads a label, the long journey of a chocolate bar becomes a little easier to see.',
      { box: 'Think about it', text: 'Next time you buy a treat, look at the wrapper. Does it tell you where the cocoa was grown, or who grew it?' }
    ],
    guide: { before: 'Look at a chocolate wrapper together. Find Ghana and Côte d’Ivoire on a map. Teach <b>ferment</b>, <b>fair trade</b> and <b>premium</b>.',
      after: 'Would you pay more for a chocolate bar if you knew the farmer was paid fairly? Talk about why the choice is not always easy.' },
    words: [['ferment', 'to change slowly as tiny living things break food down'], ['fair trade', 'a system that pays farmers a fair price and follows rules about work'], ['premium', 'extra money paid on top of a price']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Who receives the smallest share?',
        opts: ['cocoa farmers', 'stores', 'chocolate makers'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'In fair trade, a <b>premium</b> is …',
        opts: ['extra money for the community', 'a kind of chocolate', 'a tax'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number the steps from tree to factory.',
        items: ['Pods are cut from the trees.', 'Beans ferment under banana leaves.', 'Beans dry in the sun.', 'Sacks of beans are shipped overseas.', 'Beans are roasted and ground.'], show: [2, 4, 0, 3, 1] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain two ways fair trade tries to help cocoa farmers.',
        a: 'It pays farmers at least a minimum price, and it gives a premium that the community can spend on schools, wells or clinics.', look: 'two ways from the text' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The author also lists problems with fair trade. Why does this make the text more balanced?',
        a: 'It shows both sides, so readers can make up their own minds instead of hearing only good news.', look: 'both sides are shown' },
      { k: 'choice', code: 'A2.3', q: 'A company says its chocolate is “fair.” Which question would best help you check that claim?',
        opts: ['Who checks that the farmers are paid fairly?', 'What colour is the wrapper?', 'How many flavours are there?', 'Is the bar large?'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What other things you use might come from far away? How could you find out who made them?',
        a: 'My bananas and my T-shirt. I could read the labels or look up the company online.', look: 'a product and a way to find out' }
    ]
  });

  P.add({
    id: 'g6-clean-water', subject: 'social', form: 'Report',
    title: 'Water for Everyone',
    deck: 'Why safe drinking water is a right, and how communities are working to get it',
    hero: {
      photo: 'g6-water-pump.jpg', credit: 'Photo: Kwameghana(Bright Kwame Ayisi), CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Children collect water at a hand pump in a village in Ghana. A well close to home can save hours of walking.'
    },
    body: [
      'In Canada, most people turn on a tap and get clean water without a second thought. But around the world, about two billion people do not have safe drinking water at home. For many families, getting water means a long walk, often by girls and women, carrying heavy containers that can weigh 20 kilograms when full.',
      { fig: G.T(4, 10, 'Litres of water used by one person in a day (rough estimates)', 'n') +
          G.bars([['Canadian at home', 220, 'about 220 L'], ['Basic needs', 50, 'about 50 L'], ['Walking to a well', 15, 'often 15 L or less']], 220, { x0: 108, top: 22, gap: 28, pad: 96 }),
        tall: 108, cap: 'People who must carry their water use far less of it.' },
      { h: 'Why clean water matters' },
      'Water from rivers, ponds or open wells can carry germs that cause diarrhea, cholera and other diseases. These illnesses are especially dangerous for young children. When water is far away, children, especially girls, may miss school to fetch it. A clean water source close to home means healthier families, more time for school and work, and a better chance for a whole community to <b>thrive</b>.',
      'Carrying water is heavy work. A full 20-litre container weighs 20 kilograms, about as much as a large bag of dog food. Some people carry one on their head or back for kilometres, several times a day. Even when the water reaches home, it may not be clean enough to drink safely.',
      { h: 'Not only far away' },
      'This is also a Canadian problem. For years, dozens of First Nations communities have lived under drinking water <b>advisories</b>, warnings that tap water is not safe to drink without boiling, or not safe at all. In Neskantaga First Nation in northern Ontario, people lived under a boil-water advisory for more than 25 years. Many advisories have been lifted, but some remain, and First Nations leaders continue to push for lasting solutions and control of their own water systems.',
      { h: 'Solutions' },
      'Solutions range from simple to high-tech: digging wells with hand pumps, collecting rainwater from roofs, building water treatment plants, and training local people to run and repair them. In 2010, the United Nations declared that safe water and <b>sanitation</b> are human rights.',
      { box: 'A water walker', text: 'Josephine Mandamin, an Anishinaabe grandmother from Ontario, walked around all five Great Lakes, more than 17&nbsp;000 kilometres in all, carrying a copper pail of water to honour and protect it.' }
    ],
    guide: { before: 'Fill a container with 20 litres of water (or count 20 one-litre bottles) and try to lift it. Teach <b>advisories</b>, <b>sanitation</b> and <b>thrive</b>. Find Neskantaga on a map of Ontario.',
      after: 'Keep a tally of every time you use water in one day. Which uses could you cut if you had to carry every litre?' },
    words: [['thrive', 'to grow and do well'], ['advisories', 'official warnings'], ['sanitation', 'safe ways to get rid of waste, such as toilets and sewers']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. About how many times more water does a Canadian use at home than the basic need?',
        opts: ['about 4 times', 'about 10 times', 'about the same'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A water <b>advisory</b> is …',
        opts: ['a warning that water may not be safe', 'a new pipe', 'a kind of pump'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How can a well close to home help children go to school?',
        a: 'Children, especially girls, would not have to spend hours walking to fetch water, so they would have time for school. They would also get sick less often.', look: 'time saved, or better health' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why does the author include First Nations communities in Canada in this passage? What does it show?',
        a: 'It shows that not everyone in Canada has safe water, so the problem is not only in faraway places. It is a question of fairness here too.', look: 'unequal access in Canada' },
      { k: 'choice', code: 'C3.4', q: 'Why did Josephine Mandamin carry a pail of water around the Great Lakes?',
        opts: ['to honour and protect the water', 'to sell the water', 'to win a race', 'to test the water for germs'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Match each problem with a solution from the text.', cols: ['Problem', 'Possible solution'],
        rows: [['The water source is far away.', null], ['No one nearby can fix the pump.', null], [null, 'Collect rainwater from roofs.']],
        a: [[null, 'Dig a well with a hand pump close to home.'], [null, 'Train local people to run and repair it.'], ['There is no well or river nearby.', null]] },
      { k: 'lines', code: 'C2.1', n: 2, q: 'What did you already know about water from science, health or your own life? How did it help you here?',
        a: 'In science, I learned that germs can live in water, so I understood why people get sick from unsafe water.', look: 'named prior knowledge and how it helped' }
    ]
  });

  P.add({
    id: 'g6-bannock', subject: 'math', form: 'Explanation',
    title: 'Bannock by the Batch',
    deck: 'Using ratios to make more, or less, of a recipe',
    hero: {
      photo: 'g6-bannock.jpg', credit: 'Photo: Sandra Cohen-Rose and Colin Rose from Montreal, Canada, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Bannock cooking on a stick over a fire. Many First Nations and Métis families make bannock at home, at camp and at gatherings.'
    },
    body: [
      'Bannock is a simple bread made from flour, baking powder, salt, water and a little fat. Scottish fur traders brought a version of it to Canada, and First Nations and Métis cooks made it their own, baking it in pans, frying it, or wrapping the dough around a stick over the fire. Many families have their own recipes, passed down through generations, and bannock is shared at powwows, feasts and camping trips.',
      { h: 'Ratios in the kitchen' },
      'Maya’s family recipe makes one pan of bannock: 3 cups of flour, 1 tablespoon of baking powder, 1 teaspoon of salt and 1 cup of water. Her school is holding a feast, and she needs to make three pans. How much of each ingredient does she need?',
      { fig: '<path class="k" d="M4 4 H296 V94 H4 Z M4 32 H296 M4 63 H296 M112 4 V94 M158 4 V94 M204 4 V94 M250 4 V94"/><rect class="a" x="250" y="4" width="46" height="90"/>' +
          G.T(10, 22, 'Pans', 'lb') + G.T(10, 52, 'Flour (cups)', 'l') + G.T(10, 83, 'Water (cups)', 'l') +
          [['½', '1½', '½'], ['1', '3', '1'], ['2', '6', '2'], ['3', '9', '3']].map(function (c, i) { var x = 135 + i * 46; return G.T(x, 22, c[0], 'lb', 'middle') + G.T(x, 52, c[1], 'l', 'middle') + G.T(x, 83, c[2], 'l', 'middle'); }).join(''),
        tall: 98, cap: 'A ratio table for Maya’s recipe. The ratio of flour to water is always 3 to 1.' },
      'A recipe is a set of <b>ratios</b>: comparisons between amounts. In Maya’s recipe, the ratio of flour to water is 3 cups to 1 cup, or 3 : 1. As long as this ratio stays the same, the bannock will turn out the same, whether she makes a small batch or a giant one. To make three pans, she multiplies every amount by 3: 9 cups of flour, 3 tablespoons of baking powder, 3 teaspoons of salt and 3 cups of water.',
      { h: 'Equivalent ratios' },
      'Ratios such as 3 : 1, 6 : 2 and 9 : 3 are <b>equivalent</b>: they compare the amounts in the same way. You can find equivalent ratios by multiplying or dividing both parts by the same number. If Maya wanted only half a pan, she would divide by 2: 1½ cups of flour to ½ cup of water.',
      { box: 'Watch out', text: 'Not everything scales perfectly. A bigger batch may need a bigger pan or a longer baking time, so cooks still check the bannock until it is golden brown.' },
      'Ratios are everywhere: mixing paint colours, building a scale model, or comparing the number of players on two teams. Whenever two amounts must stay in balance, a ratio is at work.',
      'Today, bannock is served at powwows, family dinners and community feasts across Canada. Some cooks fry it, some bake it, and some wrap the dough around a stick and cook it over a campfire. Every family seems to have its own recipe, but each one depends on the same idea: the amounts must stay in proportion.'
    ],
    guide: { before: 'Ask: if a recipe serves 4 and 8 people are coming, what do you do? Teach <b>ratio</b> and <b>equivalent</b> (equi = equal). Use measuring cups if you have them.',
      after: 'Make (or plan) a batch of bannock or another family recipe together. Double or halve it, and write the new amounts in a ratio table.' },
    words: [['ratios', 'comparisons of two amounts, such as 3 to 1'], ['equivalent', 'equal in value or meaning']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the ratio table. How much water is needed for 2 pans?',
        opts: ['2 cups', '6 cups', '1 cup'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'How much flour would 4 pans need?',
        opts: ['12 cups', '7 cups', '4 cups'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Maya decides to make 5 pans. Fill in the chart.', cols: ['Ingredient', 'For 1 pan', 'For 5 pans'],
        rows: [['Flour', '3 cups', null], ['Baking powder', '1 tbsp', null], ['Water', null, '5 cups']],
        a: [[null, null, '15 cups'], [null, null, '5 tbsp'], [null, '1 cup', null]] },
      { k: 'choice', code: 'B2.1', q: 'The prefix <i>equi-</i> means equal. Equivalent ratios are ratios that …',
        opts: ['compare amounts in the same way', 'are always bigger', 'have no numbers', 'use only the number 1'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Is 6 : 3 equivalent to Maya’s 3 : 1 ratio of flour to water? Explain.',
        a: 'No. Doubling 3 : 1 gives 6 : 2, not 6 : 3. A 6 : 3 mix would have too much water.', look: 'no, with a reason' },
      { k: 'lines', code: 'C3.4', n: 2, q: 'Why might a family bannock recipe be important to a family? Use clues from the text.',
        a: 'Recipes are passed down through generations and shared at feasts and gatherings, so they connect the family to its history and culture.', look: 'tradition, sharing or family history' },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Which part of the passage did you check with the ratio table? How did it help?',
        a: 'I checked the half-pan amounts in the table, and I could see the numbers were divided by 2.', look: 'a part checked and what became clear' }
    ]
  });

  P.add({
    id: 'g6-descartes', subject: 'math', form: 'Explanation',
    title: 'A Fly on the Ceiling',
    deck: 'How a curious thinker found a way to name every point on a flat surface',
    hero: {
      photo: 'g6-descartes.jpg', credit: 'Photo: Frans Hals, Public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 220,
      cap: 'René Descartes, a French thinker of the 1600s, in a portrait based on a painting by Frans Hals.'
    },
    body: [
      'A famous story says that René Descartes was lying in bed one morning, watching a fly crawl across the ceiling. He wondered: how could he describe exactly where the fly was at any moment? Whether or not the story is true, the idea he wrote about in 1637 changed mathematics forever.',
      'Before Descartes, mathematicians often treated shapes and numbers as two separate subjects. Shapes were drawn with rulers and compasses; numbers were added and multiplied. His grid joined them. Suddenly a line or a curve could be described with numbers, and numbers could be turned into a picture. Mathematicians still build on this idea today.',
      { fig: '<path class="d" d="M40 20 H280 M40 40 H280 M40 60 H280 M40 80 H280 M40 100 H280 M80 10 V120 M120 10 V120 M160 10 V120 M200 10 V120 M240 10 V120 M280 10 V120"/>' +
          D.arrow(40, 120, 290, 120, 't') + D.arrow(40, 120, 40, 4, 't') +
          [1, 2, 3, 4, 5, 6].map(function (n) { return G.T(40 + n * 40, 134, n, 'n', 'middle'); }).join('') +
          [1, 2, 3, 4, 5].map(function (n) { return G.T(32, 124 - n * 20, n, 'n', 'end'); }).join('') +
          '<circle class="a" cx="200" cy="60" r="5"/><path class="d" d="M200 60 V120 M200 60 H40"/>' + G.T(208, 52, '(4, 3)', 'lb') +
          '<circle class="k" cx="80" cy="20" r="4"/>' + G.T(88, 16, '(1, 5)', 'l') +
          G.T(12, 136, '0', 'n') + G.T(292, 134, 'x', 'lb') + G.T(48, 10, 'y', 'lb'),
        tall: 142, cap: 'To reach (4, 3), start at the origin, move 4 across, then 3 up.' },
      { h: 'Two number lines' },
      'Descartes’ idea was to draw two number lines that cross at right angles. The line that runs across is called the <b>x-axis</b>. The line that runs up and down is called the y-axis. The point where they meet, at zero on both lines, is called the <b>origin</b>. Together, the two lines make a grid called the Cartesian plane, named after Descartes.',
      { h: 'An address for every point' },
      'Any point on the plane can be named with two numbers in brackets, called an <b>ordered pair</b>. The first number tells how far to move across, along the x-axis. The second tells how far to move up, along the y-axis. The point (4, 3) is 4 across and 3 up. The order matters: (3, 4) is a completely different point.',
      'If the axes are extended past zero, to the left and down, they divide the plane into four parts called quadrants. Points to the left of the origin have a negative first number, and points below it have a negative second number.',
      { box: 'Remember the order', text: 'Across first, then up: walk along the hall before you take the stairs.' },
      { h: 'Grids all around us' },
      'Coordinates are everywhere. Maps use a grid of letters and numbers to help you find a street. Video screens locate each tiny dot of colour by its column and row. Pilots and sailors use latitude and longitude, a grid that wraps around the whole globe. Artists use grids to copy and enlarge a drawing, square by square. Each one uses the same simple idea Descartes had while watching a fly.'
    ],
    guide: { before: 'Draw a grid on paper. Ask: how would you tell a friend exactly where to put a dot? Teach <b>x-axis</b>, <b>origin</b> and <b>ordered pair</b>.',
      after: 'Play a quick game: one person says an ordered pair, the other plots it. Then swap the numbers and see where the point moves.' },
    words: [['x-axis', 'the number line that runs across a grid'], ['origin', 'the point (0, 0) where the two axes meet'], ['ordered pair', 'two numbers that name a point, across first, then up']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Which point is 1 across and 5 up?',
        opts: ['(1, 5)', '(5, 1)', '(4, 3)'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The <b>origin</b> is …',
        opts: ['the point (0, 0)', 'the first number', 'the top of the grid'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why does the order of the two numbers in an ordered pair matter?',
        a: 'The first number means across and the second means up, so swapping them, as in (4, 3) and (3, 4), names a different point.', look: 'across first, up second; an example' },
      { k: 'choice', code: 'C3.2', q: 'Why does the author say “whether or not the story is true”?',
        opts: ['No one can prove the fly story happened.', 'The author thinks Descartes lied.', 'Flies cannot walk on ceilings.', 'The story is about a different person.'], a: 0 },
      { k: 'order', code: 'C2.6', q: 'Number the steps for plotting the point (2, 4).',
        items: ['Start at the origin.', 'Move 2 across along the x-axis.', 'Move 4 up.', 'Mark the point.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C1.3', n: 3, q: 'The last section lists examples of grids. Name two and tell how each one uses the same idea.',
        a: 'A street map uses letters and numbers to name a square; a video screen names each dot by its column and row. Both use two numbers or labels to find one place.', look: 'two examples and the link' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Where have you used a grid or coordinates before? Explain.',
        a: 'On a map of the zoo, I found the gift shop in square C4.', look: 'a real grid and how it was used' }
    ]
  });

  P.add({
    id: 'g6-throat-singing', subject: 'arts', form: 'Report',
    title: 'Singing Face to Face',
    deck: 'Katajjaq, the Inuit art of throat singing, and the women who kept it alive',
    hero: {
      photo: 'g6-throat-singing.jpg', credit: 'Photo: Rudolf H. Boettcher, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 35%',
      tall: 220,
      cap: 'Two Inuit throat singers perform face to face.'
    },
    body: [
      'Two women stand face to face, so close that they can almost touch. Sometimes they hold each other’s arms. One begins a short, rhythmic sound, deep in her throat. The other answers with a different sound, fitting it into the spaces. Back and forth they go, faster and faster, breathing in and out, until one of them laughs or runs out of breath.',
      { fig: '<path class="t" d="M70 26 H290 M70 70 H290 M70 114 H290"/>' + G.T(62, 30, 'Singer 1', 'lb', 'end') + G.T(62, 74, 'Singer 2', 'lb', 'end') + G.T(62, 118, 'Together', 'lb', 'end') +
          [0, 1, 2, 3, 4, 5].map(function (i) { var x = 78 + i * 36; return '<rect class="k" x="' + x + '" y="12" width="14" height="14"/><rect class="h" x="' + (x + 18) + '" y="56" width="14" height="14"/><rect class="k" x="' + x + '" y="100" width="14" height="14"/><rect class="h" x="' + (x + 18) + '" y="100" width="14" height="14"/>'; }).join(''),
        tall: 124, cap: 'Each singer fills the gaps the other leaves, so the two parts weave into one pulsing sound.' },
      'This is <b>katajjaq</b>, Inuit throat singing. It is both music and a friendly contest. Each pair has many different songs, and many of them imitate sounds from the land: geese, the wind, a dog team, a saw cutting through wood, or the water of a river.',
      'The songs are hard to master. A singer must keep a steady beat, switch quickly between breathing in and breathing out, and match her partner without missing a pulse. When one singer finally breaks the rhythm, both often burst out laughing, and then they begin again.',
      { h: 'Songs from the land' },
      'For generations, Inuit women sang katajjaq in the long winters of the Arctic, often while the men were away hunting. The songs entertained children, passed the time and kept friendships strong. Girls learned by listening and by trying, with an older singer as their partner.',
      { h: 'Silenced and brought back' },
      'When Christian missionaries arrived in the North, many of them disapproved of throat singing, and in some communities it was discouraged or forbidden. By the middle of the 1900s, it had almost disappeared in some places. Elders who still knew the songs began teaching them again, and young singers took them up with pride.',
      'Today, throat singing is heard in schools, community halls and concert halls around the world. Some artists blend it with rock, electronic or classical music to create something new. In 2014, Quebec recognized katajjaq as an important part of its cultural <b>heritage</b>, the first time it had given that honour to a living tradition.',
      { box: 'Listen closely', text: 'Throat singing uses the voice in two ways at once: sounds made while breathing out and sounds made while breathing in.' },
      'For many Inuit, the revival of katajjaq means more than music. It is a sign that a culture which was pushed aside is strong, and that its knowledge belongs to the next generation.'
    ],
    guide: { before: 'If you can, listen together to a recording of Inuit throat singers shared by an Inuit organization or artist. Find Nunavut and Nunavik on a map. Teach <b>katajjaq</b> and <b>heritage</b>.',
      after: 'Talk about why a culture might lose a tradition, and what it takes to bring one back. Treat the songs with respect: they belong to Inuit.' },
    words: [['katajjaq', 'Inuit throat singing, done in pairs'], ['heritage', 'traditions and knowledge handed down from earlier generations']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What does each singer do?',
        opts: ['fills the gaps the other leaves', 'sings the same sound at the same time', 'stays silent'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Heritage</b> means …',
        opts: ['traditions handed down', 'a kind of prize', 'a new song'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does this text tell you about the values of Inuit communities? Use details.',
        a: 'Friendship and learning from Elders matter: women sang together to keep friendships strong, and Elders taught the songs to young people.', look: 'a value and a detail' },
      { k: 'table', code: 'C1.3', q: 'Fill in the cause and effect chart.', cols: ['Cause', 'Effect'],
        rows: [['Missionaries disapproved of throat singing.', null], [null, 'Young singers took up the songs with pride.']],
        a: [[null, 'It was discouraged or forbidden, and it almost disappeared in some places.'], ['Elders began teaching the songs again.', null]] },
      { k: 'choice', code: 'C1.5', q: 'The opening says the singers go “back and forth … faster and faster.” Why does the author begin this way?',
        opts: ['to help readers hear and picture the singing', 'to explain the history', 'to give a definition', 'to list facts'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why does the author say the revival means “more than music”?',
        a: 'Bringing back katajjaq shows that Inuit culture is strong even after it was pushed aside, and that it will be passed on.', look: 'culture survived; passed on' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Is there a song, game or tradition your family passes down? How is it taught?',
        a: 'My grandmother teaches us a lullaby by singing it to the baby until we know it.', look: 'a tradition and how it is learned' }
    ]
  });

  P.add({
    id: 'g6-mclaren', subject: 'arts', form: 'Biography',
    title: 'Drawing on Film',
    deck: 'Norman McLaren, the animator who scratched, painted and moved one frame at a time',
    hero: {
      photo: 'g6-mclaren.jpg', credit: 'Photo: Jack Long/National Film Board of Canada, Public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Norman McLaren drawing directly on film at the National Film Board, 1944.'
    },
    body: [
      'Most animators draw on paper. Norman McLaren drew on the film itself. With pens, brushes and even needles, he painted and scratched pictures straight onto the thin strip that runs through a projector. When the film played, his tiny drawings danced across the screen.',
      { fig: '<rect class="k" x="10" y="20" width="280" height="70"/><path class="k" d="M66 20 V90 M122 20 V90 M178 20 V90 M234 20 V90"/>' +
          [0, 1, 2, 3, 4].map(function (i) { var x = 10 + i * 56; return '<rect class="t" x="' + (x + 6) + '" y="24" width="8" height="6"/><rect class="t" x="' + (x + 40) + '" y="24" width="8" height="6"/><rect class="t" x="' + (x + 6) + '" y="80" width="8" height="6"/><rect class="t" x="' + (x + 40) + '" y="80" width="8" height="6"/><circle class="' + (i === 4 ? 'a' : 'k') + '" cx="' + (x + 28) + '" cy="' + (72 - i * 7) + '" r="7"/>'; }).join('') +
          G.T(10, 12, 'frame 1', 'n') + G.T(290, 12, 'frame 5', 'n', 'end') + D.arrow(70, 106, 230, 106, 't') + G.T(150, 120, 'the ball seems to rise', 'l', 'middle'),
        tall: 124, cap: 'Five frames of film. Shown quickly, one after another, the ball seems to move.' },
      { h: 'From Scotland to Canada' },
      'McLaren was born in Stirling, Scotland, in 1914. As an art student, he found an old film, washed the pictures off and began painting on the clear strip. In 1941, he was invited to join the new National Film Board of Canada, or NFB, in Ottawa. He stayed for more than 40 years and started its animation studio, training young Canadian artists.',
      'During the Second World War, he made short films for the NFB that encouraged Canadians to buy war savings stamps. Even with a tiny budget, he found ways to make them bright and lively. He often worked without a camera at all, drawing <b>frame</b> after frame directly onto the film with a ruler and a steady hand.',
      { h: 'How animation works' },
      'Every film is a series of still pictures called <b>frames</b>. A projector shows 24 frames every second. Your eyes and brain blend them together, so small changes from one frame to the next look like smooth movement. Animators plan these changes very carefully. For one second of film, McLaren might make 24 separate drawings.',
      'He also tried <b>stop-motion</b>. In his film Neighbours (1952), he filmed real actors one frame at a time, moving them a little between shots, so they seem to slide and float across a lawn. The film, about two neighbours who fight over a flower, won an Academy Award.',
      { box: 'Try it', text: 'Draw a stick figure in the corner of each page of a notepad, changing it slightly each time. Flip the pages fast to make a flipbook.' },
      'McLaren believed that animation is not the art of drawings that move, but the art of movements that are drawn. What happens between the frames, he said, matters most. His playful experiments with sound, colour and motion still inspire animators in Canada and around the world.'
    ],
    guide: { before: 'Make a quick flipbook with three or four pages. Teach <b>frame</b>, <b>stop-motion</b> and the word animation (from the Latin for “breath” or “life”).',
      after: 'Watch a short McLaren film on the NFB website together and ask: how do you think he made it?' },
    words: [['frame', 'one still picture in a film'], ['stop-motion', 'filming objects or people one frame at a time, moving them a little between shots']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What changes from frame to frame?',
        opts: ['the ball’s height', 'the size of the frame', 'the colour of the ball'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'What makes this text a biography?',
        opts: ['It tells about a real person’s life and work.', 'It has rhymes.', 'It gives steps for a recipe.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How does animation make still pictures seem to move?',
        a: 'Many frames, each a little different, are shown quickly, 24 a second, and our eyes and brain blend them into movement.', look: 'many frames, small changes, shown quickly' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart about McLaren’s life.', cols: ['Year', 'Event'],
        rows: [['1914', null], ['1941', null], ['1952', null]],
        a: [[null, 'He was born in Stirling, Scotland.'], [null, 'He joined the National Film Board of Canada.'], [null, 'He made Neighbours, which won an Academy Award.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'McLaren said animation is “the art of movements that are drawn.” What do you think he meant?',
        a: 'The important part is how things move from one frame to the next, not just how each picture looks.', look: 'movement between frames matters most' },
      { k: 'choice', code: 'C3.5', q: 'Why might the author include the detail that McLaren trained young Canadian artists?',
        opts: ['to show his influence on others', 'to explain how film works', 'to describe Scotland', 'to give a flipbook idea'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 2, q: 'What helped you understand frames best: the diagram, the words or the flipbook idea? Why?',
        a: 'The diagram, because I could see the ball move up one step in each frame.', look: 'a choice and a reason' }
    ]
  });

  P.add({
    id: 'g6-first-winter', subject: 'story', form: 'Diary',
    title: 'My First Winter',
    deck: 'The diary of a girl from Syria, in her first months in Winnipeg',
    hero: {
      photo: 'g6-winnipeg-forks.jpg', credit: 'Photo: Robert Linsdell from St. Andrews, Canada, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The Forks, in Winnipeg, where the Red and Assiniboine rivers meet.'
    },
    body: [
      { h: 'Monday, November 14' },
      'We have been in Winnipeg for one week. Our apartment is on the fourth floor, and from the window I can see a long row of bare trees. Mama says they are not dead, only sleeping. In Damascus, our street smelled of bread and jasmine. Here the air smells of nothing at all, just cold.',
      { fig: '<rect class="k" x="70" y="10" width="20" height="104" rx="10"/><circle class="k" cx="80" cy="120" r="14"/><rect class="h" x="74" y="46" width="12" height="74"/>' +
          '<rect class="k" x="210" y="10" width="20" height="104" rx="10"/><circle class="k" cx="220" cy="120" r="14"/><rect class="a" x="214" y="92" width="12" height="28"/>' +
          '<path class="d" d="M60 62 H240"/>' + G.T(150, 58, '0 °C', 'n', 'middle') +
          G.T(80, 150, 'Damascus', 'lb', 'middle') + G.T(80, 163, 'about 7 °C', 'l', 'middle') + G.T(220, 150, 'Winnipeg', 'lb', 'middle') + G.T(220, 163, 'about −16 °C', 'l', 'middle'),
        tall: 168, cap: 'The usual temperature on a January day in each city.' },
      'At my new school, there are kids from the Philippines, Eritrea, Ukraine and right here in Manitoba. My teacher, Ms. Fontaine, wrote my name on the board in English and asked me to write it in Arabic beside it. Everyone watched my hand move from right to left, and nobody laughed.',
      { h: 'Friday, December 2' },
      'Today, the snow came. I pressed my face to the window like a little child. Big, slow flakes, then millions of them, until the cars were white lumps. My brother Sami ran outside in his slippers and came back with his toes stinging. Our neighbour, Mrs. Kowalski, brought us boots and mittens that her grandchildren have <b>outgrown</b>. I said thank you in English, and she said it back in Arabic. She had practised.',
      'Sami asked why the snow squeaks under our boots. Mrs. Kowalski laughed and said that is how you know it is really cold. She showed us how to walk like a penguin on the icy sidewalk, with small steps and our weight forward. We practised all the way to the bus stop, giggling.',
      { h: 'Saturday, January 21' },
      'Minus 32 this morning with the wind. Baba says the cold here has teeth. But today was the best day since we came. Our sponsor family took us to The Forks, where two rivers meet, and we skated on the frozen river itself. I fell eleven times. On the twelfth try, I glided for three whole seconds.',
      'I still miss my grandmother, and our courtyard, and the sound of my own language everywhere. But tonight, sitting by the heater with hot cocoa, I felt something new. Not quite at home yet. But <b>welcome</b>.',
      { box: 'From the author', text: 'Thousands of refugee families from Syria arrived in Canada in 2015 and 2016, many helped by community groups who sponsored them.' }
    ],
    guide: { before: 'Find Syria and Winnipeg on a map. Explain that a refugee is someone forced to leave home to stay safe. Teach <b>outgrown</b> and <b>welcome</b>, and remind the child that this story is fiction based on real events.',
      after: 'Ask: what made the writer feel welcome? What could you do to help a new student feel welcome?' },
    words: [['outgrown', 'grown too big to wear or use'], ['welcome', 'glad to be somewhere because others are glad you came']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this text is a diary?',
        opts: ['dated entries written with “I”', 'a list of steps', 'a table of contents'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How much colder is Winnipeg than Damascus in January?',
        opts: ['about 23 degrees', 'about 9 degrees', 'about 16 degrees'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 2, q: 'Baba says “the cold here has teeth.” What does he mean?',
        a: 'The cold is so sharp that it hurts your skin, like a bite.', look: 'cold that bites or hurts' },
      { k: 'table', code: 'C3.2', q: 'How does the writer feel? Fill in the chart.', cols: ['Entry', 'Feeling', 'Clue'],
        rows: [['November 14', null, null], ['January 21', null, null]],
        a: [[null, 'homesick, a little sad', 'She remembers the smell of bread and jasmine.'], [null, 'happy, welcome', 'She skated and felt “welcome.”']] },
      { k: 'lines', code: 'C1.6', n: 3, q: 'The story is told by the girl herself. How would it be different if Mrs. Kowalski told it?',
        a: 'We would learn how Mrs. Kowalski felt and why she practised Arabic, but not the girl’s private thoughts about missing home.', look: 'what we would and would not learn' },
      { k: 'choice', code: 'C3.6', q: 'What is the main message of the diary?',
        opts: ['Small acts of kindness help newcomers feel welcome.', 'Winter in Winnipeg is too cold.', 'Skating is easy.', 'Diaries should be short.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The diary ends with a very short sentence: “But welcome.” Why might the writer end this way?',
        a: 'A short sentence makes the word stand out, so readers notice how important that new feeling is for her.', look: 'short sentence, emphasis' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Write about a time you were new somewhere. What helped you?',
        a: 'When I joined a swim class, a girl showed me where to put my things.', look: 'a time and what helped' }
    ]
  });

  P.add({
    id: 'g6-before-you-post', subject: 'health', form: 'Advice article',
    title: 'Before You Post',
    deck: 'What a photo can tell strangers, and how to keep your private life private',
    hero: {
      photo: 'g6-phone-cameras.jpg', credit: 'Photo: U.S. Fish and Wildlife Service Headquarters, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Taking a photo takes a second. Deciding whether to share it deserves a little longer.'
    },
    body: [
      'You snap a photo of your friends in front of your house, wearing your team jerseys, and share it online. It takes five seconds. But look again. What could a stranger learn from that one picture?',
      { fig: '<rect class="k" x="70" y="6" width="160" height="110" rx="4"/><path class="k" d="M100 116 V70 L130 46 L160 70 V116 M118 116 V92 H142 V116"/><rect class="t" x="146" y="76" width="10" height="8"/>' +
          '<circle class="k" cx="196" cy="84" r="8"/><path class="k" d="M188 116 V96 H204 V116"/>' +
          G.T(2, 24, 'location tag') + D.arrow(64, 20, 92, 20, 't') + '<path class="a" d="M100 12 L104 22 L96 22 Z"/>' +
          G.T(2, 82, 'house number') + D.arrow(84, 78, 144, 80, 't') +
          G.T(240, 104, 'team jersey', 'l') + D.arrow(238, 100, 206, 102, 't') +
          G.T(240, 24, 'time posted', 'l') + D.arrow(238, 20, 224, 20, 't'),
        tall: 122, cap: 'Clues hidden in an ordinary photo.' },
      { h: 'Clues in plain sight' },
      'A house number or street sign shows where you live. A school logo or team jersey shows where you spend your days. Many phones also add a hidden <b>geotag</b> to each photo: a tag that records the exact place where it was taken. Put a few posts together, and a stranger could work out where you are and when.',
      'Information you share online creates a <b>digital footprint</b>, a trail that can last for years. Posts can be copied, saved in screenshots and shared again, even after you delete them.',
      'Some of the people who see your posts may not be who they say they are. A profile photo and a friendly message are easy to fake. That is why it is wise to accept friend requests only from people you know in real life, and to tell a trusted adult if someone online makes you feel uncomfortable or asks for personal information.',
      { h: 'Think before you share' },
      'This does not mean you should never post anything. It means you should stop and think first. Ask yourself four questions:',
      { box: 'Four questions', text: 'Who can see this? What does it show about where I live or go? Would I be fine with a stranger seeing it? Did everyone in the photo agree to share it?' },
      'The last question matters too. Other people have a right to <b>privacy</b>, just as you do. Before you post a picture of a friend, ask them. Before you post a picture of your little sister, ask a parent.',
      { h: 'Simple settings that help' },
      'Most apps let you choose who can see your posts. Setting your account to private means only people you approve can see it. You can also turn off location tagging in your phone’s settings. Some families agree on a simple rule: share the moment, but not the address.',
      'Being careful online is not about being afraid. It is about being in charge of your own story, and helping your friends stay in charge of theirs.'
    ],
    guide: { before: 'Look together at an ordinary photo and ask: what could a stranger learn from it? Teach <b>geotag</b>, <b>digital footprint</b> and <b>privacy</b>.',
      after: 'Check the privacy and location settings on a family device together. Agree on two or three family rules for sharing photos.' },
    words: [['geotag', 'hidden information that records where a photo was taken'], ['digital footprint', 'the trail of information you leave online'], ['privacy', 'the right to keep things about yourself to yourself']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Which clue shows where you spend your days?',
        opts: ['the team jersey', 'the time posted', 'the sky'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>digital footprint</b> is …',
        opts: ['a trail of information online', 'a shoe size', 'a kind of password'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how a stranger could learn where someone lives from photos they post.',
        a: 'A house number, street sign or a hidden geotag can show the exact place, and several posts together can show when the person is there.', look: 'one or two clues' },
      { k: 'choice', code: 'A2.2', q: 'Your friend wants to post a photo of you. What is the best thing to do?',
        opts: ['Say whether you agree, and check what it shows.', 'Let them post anything.', 'Delete their account.', 'Post a photo of them first.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The author begins by speaking to “you.” Why might the author write this way?',
        a: 'It makes readers imagine it is their own photo, so the advice feels real and personal.', look: 'speaks to the reader; makes it personal' },
      { k: 'choice', code: 'C3.6', q: 'What is the author’s main message?',
        opts: ['Think before you share, and stay in charge of your story.', 'Never use a phone.', 'Always post your address.', 'Photos are always dangerous.'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 2, q: 'Which of the four questions will you most likely use? Why?',
        a: '“Would I be fine with a stranger seeing it?” because it makes me think about who is really looking.', look: 'a question and a reason' }
    ]
  });

  P.add({
    id: 'g6-pollinators', subject: 'science', form: 'Report',
    title: 'Busy, Fuzzy and Needed',
    deck: 'Why bees and other pollinators matter, and why many of them are in trouble',
    hero: {
      photo: 'g6-bumblebee.jpg', credit: 'Photo: U.S. Fish and Wildlife Service - Midwest Region, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A bumblebee dusted with pollen. Every hair on its body can carry pollen to the next flower.'
    },
    body: [
      'Think about your lunch: an apple, some cucumber slices, a few blueberries. Every one of those foods exists because an animal carried pollen from one flower to another. Scientists estimate that about one out of every three bites of food we eat depends on these animals, called <b>pollinators</b>.',
      { fig: G.flow(['A bee drinks a flower’s nectar.', 'Pollen sticks to its hairy body.', 'It visits a flower of the same kind.', 'Pollen rubs off: seeds can form.'], { top: 2, bh: 26, gap: 12, hl: 3 }),
        tall: 152, cap: 'How a bee pollinates a flower, without even trying.' },
      { h: 'How pollination works' },
      'Flowers make a sweet liquid called nectar, and bees feed on it. As a bee pushes into a flower, a fine yellow powder called pollen sticks to its fuzzy body. When it visits the next flower, some of that pollen rubs off. Once a flower has received pollen from another flower of the same kind, it can make seeds, and often fruit around them.',
      'Bees are not the only pollinators. Butterflies, moths, beetles, flies and hummingbirds pollinate too. But bees do the most work. Canada has more than 800 kinds of wild bees, and most of them live alone, not in hives. Bumblebees can even shake pollen loose by buzzing their flight muscles, which helps tomatoes and blueberries grow.',
      'Each kind of pollinator has its favourite flowers. Hummingbirds visit red, tube-shaped blossoms that fit their long beaks. Moths visit pale flowers that open at night and smell sweet in the dark. Some plants depend on just one kind of insect, so if that insect disappears, the plant may disappear too.',
      { h: 'Pollinators in trouble' },
      'In many places, the number of wild bees is falling. They are losing the meadows and wildflowers they need for food and nesting. Some pesticides, chemicals sprayed to kill insects, also harm bees. Diseases and a changing climate add to the danger. The rusty-patched bumblebee was once common in southern Ontario. It has not been seen in Canada since 2009, and it is now listed as <b>endangered</b>.',
      { box: 'Did you know?', text: 'Most wild bees in Canada are gentle and rarely sting. Many are smaller than a grain of rice.' },
      { h: 'How people can help' },
      'Anyone can help pollinators. Plant native flowers, such as milkweed, wild bergamot and goldenrod, that bloom at different times from spring to fall. Leave a patch of bare ground or a few hollow stems where bees can nest. Avoid spraying pesticides. Even a small balcony garden can be a stopping place for a hungry bee.'
    ],
    guide: { before: 'Look closely at a flower together and find the pollen. Teach <b>pollinator</b> (one who pollinates) and <b>endangered</b>.',
      after: 'Make a list of foods in your kitchen that need pollinators. Talk about one thing your family could plant or do.' },
    words: [['pollinators', 'animals that carry pollen from flower to flower'], ['endangered', 'in danger of disappearing forever']],
    qs: [
      { k: 'order', code: 'C1.3', q: 'Number the steps of pollination in order.',
        items: ['A bee visits a flower for nectar.', 'Pollen sticks to the bee’s body.', 'Pollen rubs off on another flower.', 'The flower can make seeds and fruit.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.1', half: true, q: 'The suffix <i>-or</i> means “one who.” A <b>pollinator</b> is …',
        opts: ['one who pollinates', 'a kind of pollen', 'a flower part'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Which is NOT a reason wild bees are in trouble?',
        opts: ['too many wildflowers', 'pesticides', 'loss of meadows'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author begin with your lunch instead of with bees?',
        a: 'To show that pollinators matter to the reader’s own life, so the reader cares about the problem.', look: 'connects to the reader’s life' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart.', cols: ['Problem for bees', 'One way to help'],
        rows: [['Loss of wildflowers', null], ['Pesticides', null], ['No place to nest', null]],
        a: [[null, 'Plant native flowers.'], [null, 'Avoid spraying pesticides.'], [null, 'Leave bare ground or hollow stems.']] },
      { k: 'choice', code: 'B3.2', q: 'In “Bumblebees can even shake pollen loose,” which word is a verb?',
        opts: ['shake', 'pollen', 'loose', 'even'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Write the main idea of the passage in one sentence.',
        a: 'Pollinators like bees are needed for much of our food, they are in trouble, and people can help them.', look: 'needed, in trouble, we can help' }
    ]
  });

  P.add({
    id: 'g6-spirit-bear', subject: 'science', form: 'Report',
    title: 'The Spirit Bear’s Forest',
    deck: 'A rare white bear, a rainforest fed by salmon, and the Nations who protect it',
    hero: {
      photo: 'g6-spirit-bear.jpg', credit: 'Photo: Maximilian Helm from Dresden, Deutschland, CC BY 2.0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'A spirit bear in the Great Bear Rainforest, near Klemtu, British Columbia.'
    },
    body: [
      'Along the coast of British Columbia lies one of the largest temperate rainforests left on Earth: the Great Bear Rainforest. Cedar and spruce trees there can live for more than 1&nbsp;000 years. And in its misty valleys walks one of the rarest animals in Canada, a black bear with creamy white fur.',
      { fig: '<circle class="k" cx="150" cy="78" r="58"/>' +
          G.T(150, 16, 'Salmon swim up the river', 'l', 'middle') + G.T(262, 74, 'Bears catch', 'l', 'middle') + G.T(262, 88, 'and carry them', 'l', 'middle') +
          G.T(150, 152, 'Leftovers feed the soil', 'l', 'middle') + G.T(38, 74, 'Trees grow and', 'l', 'middle') + G.T(38, 88, 'shade the river', 'l', 'middle') +
          D.arrow(196, 42, 206, 54, 'a') + D.arrow(204, 118, 192, 126, 'a') + D.arrow(104, 126, 94, 116, 'a') + D.arrow(94, 42, 104, 34, 'a') +
          G.T(150, 82, 'a cycle', 'lb', 'middle'),
        tall: 158, cap: 'Salmon, bears and trees depend on one another.' },
      { h: 'A white black bear' },
      'This is the spirit bear, also called the Kermode bear. It is not a polar bear or an albino. It is a black bear that carries a rare form of a <b>gene</b>, a tiny instruction inside its cells. When a cub gets this gene from both its mother and its father, it is born white. On a few islands, as many as one bear in ten is white. The Kitasoo/Xai’xais people call it moksgm’ol.',
      'For generations, the Coastal First Nations did not speak of the white bears to outsiders, to keep them safe from hunters.',
      'Today, Indigenous guides from Klemtu lead small groups of visitors to watch the bears from a respectful distance. The money from these visits supports the community, and it gives people a reason to protect the bears rather than hunt them. A living spirit bear, the guides say, is worth far more than one that is gone.',
      { h: 'A forest fed by fish' },
      'Every fall, millions of salmon swim up the rivers to lay their eggs. Bears catch them and often carry them into the forest to eat. The leftovers rot and feed the soil, and scientists have found ocean nutrients from salmon inside the trees themselves. The trees, in turn, shade the rivers and keep them cool for the next generation of salmon. Each part of the <b>ecosystem</b> depends on the others.',
      { h: 'Protecting it together' },
      'In the 1990s, logging companies planned to cut large parts of the forest. First Nations, environmental groups, companies and the government of British Columbia argued for years. Finally, in 2016, they reached an agreement: most of the forest, about 85 percent, is now protected from logging. First Nations guardians patrol the land and waters and share in deciding its future.',
      { box: 'Think about it', text: 'Removing one part of an ecosystem, such as the salmon, can change everything else.' }
    ],
    guide: { before: 'Find the central and northern coast of British Columbia on a map. Teach <b>gene</b> and <b>ecosystem</b>.',
      after: 'Draw another cycle in nature you know about. Talk about why the First Nations kept the white bears secret.' },
    words: [['gene', 'a tiny instruction inside a living thing’s cells that passes from parents to young'], ['ecosystem', 'living things and their surroundings, all depending on one another']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What do the leftover salmon do?',
        opts: ['feed the soil', 'cool the river', 'catch the bears'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'A cub is born white when it …',
        opts: ['gets the gene from both parents', 'lives in snow', 'eats only salmon'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how salmon help the trees grow.',
        a: 'Bears carry salmon into the forest, and the leftovers rot and feed the soil, so the trees get ocean nutrients.', look: 'bears carry, leftovers feed soil' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why did the Coastal First Nations keep the white bears secret? What does this tell you about their values?',
        a: 'To protect the bears from hunters; it shows they care about and protect the animals and land.', look: 'protect bears; caring for the land' },
      { k: 'choice', code: 'C3.5', q: 'Which groups had a say in the 2016 agreement?',
        opts: ['First Nations, environmental groups, companies and the province', 'only logging companies', 'only tourists', 'only scientists'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Why is there a colon in “they reached an agreement: most of the forest … is now protected”?',
        opts: ['It introduces what the agreement was.', 'It ends a question.', 'It shows a list of names.', 'It joins two titles.'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'The text says the spirit bear is “not a polar bear or an albino.” Why might a reader need that sentence?',
        a: 'Because readers might think a white bear is a polar bear or an albino, so it clears up a confusion.', look: 'fixes a likely mistake' }
    ]
  });

  P.add({
    id: 'g6-static', subject: 'science', form: 'Explanation',
    title: 'Shocking Science',
    deck: 'Why a balloon sticks to the wall and a doorknob bites back in winter',
    hero: {
      photo: 'g6-static.jpg', credit: 'Photo: MikeRun, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'After a balloon is rubbed on hair, the hair reaches toward it.'
    },
    body: [
      'Rub a balloon on your hair and hold it up. Strands of hair rise to meet it. Press the balloon against a wall, and it may stay there. You have just made <b>static electricity</b>: electric charge that builds up in one place instead of flowing.',
      { fig: '<ellipse class="k" cx="80" cy="60" rx="46" ry="52"/><path class="k" d="M80 112 L74 122 H86 Z"/>' +
          [[60, 40], [92, 36], [70, 66], [100, 70], [76, 92]].map(function (p) { return G.T(p[0], p[1], '−', 'lb', 'middle'); }).join('') +
          '<path class="k" d="M180 120 Q200 30 240 20 Q260 30 280 120"/>' +
          [[204, 70], [228, 46], [256, 60], [266, 96], [216, 100]].map(function (p) { return G.T(p[0], p[1], '+', 'lb', 'middle'); }).join('') +
          D.arrow(176, 64, 132, 64, 'a') + G.T(80, 138, 'extra electrons', 'l', 'middle') + G.T(230, 138, 'lost electrons', 'l', 'middle'),
        tall: 144, cap: 'Rubbing moves electrons from hair to balloon. Opposite charges pull together.' },
      { h: 'Tiny charges' },
      'Everything is made of tiny particles called atoms. Atoms contain even tinier particles with electric charges. <b>Electrons</b> have a negative charge, and protons have a positive charge. Usually the two balance out. But when two materials rub together, electrons can be pulled from one to the other.',
      'When you rub a balloon on your hair, electrons move from your hair onto the balloon. Now the balloon has extra electrons, so it has a negative charge. Your hair has lost some, so it has a positive charge. Opposite charges <b>attract</b>, or pull toward each other, so your hair reaches for the balloon. Charges that are the same repel, or push away. That is why each strand of charged hair tries to move away from the others and stands on end.',
      'You can test this yourself. Rub two balloons on your hair and hang them side by side on strings. Both have extra electrons now, so both are negative. Watch what happens as they swing close together. Then hold a rubbed balloon near a thin stream of water from a tap, and watch the water bend toward it.',
      { h: 'Winter shocks' },
      'Static is strongest when the air is dry, as it is indoors during a Canadian winter. Shuffle across a carpet in socks and you collect extra electrons. Touch a metal doorknob, and they jump across in a tiny spark with a snap you can feel. In humid summer air, the charge leaks away into the water in the air before it can build up.',
      { box: 'Big static', text: 'Lightning is static electricity on a giant scale. Charges build up inside a storm cloud until they leap to the ground.' },
      'Static is not just a nuisance. Photocopiers and laser printers use it to make toner powder stick to paper. Some air filters use it to trap dust. Painters of cars use it to help paint cling evenly to the metal.'
    ],
    guide: { before: 'Try it: rub a balloon on hair or a wool sweater and hold it near small bits of paper. Teach <b>electrons</b>, <b>attract</b> and the word static (staying still).',
      after: 'Ask: why do you get more shocks in winter? Find something at home that uses static on purpose.' },
    words: [['static electricity', 'electric charge that builds up instead of flowing'], ['electrons', 'tiny particles with a negative charge'], ['attract', 'pull toward']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. After rubbing, the balloon has …',
        opts: ['extra electrons', 'no charge', 'lost electrons'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The opposite of <b>attract</b> in this passage is …',
        opts: ['repel', 'rub', 'charge'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why your hair rises toward a rubbed balloon.',
        a: 'Electrons move from the hair to the balloon, so the balloon is negative and the hair is positive. Opposite charges attract.', look: 'electrons move; opposite charges attract' },
      { k: 'choice', code: 'C2.3', q: 'Predict: two balloons are both rubbed on hair and hung side by side. What will they do?',
        opts: ['push away from each other', 'pull together', 'pop', 'nothing'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 2, q: 'Why do people get more shocks in winter than in summer?',
        a: 'Winter air indoors is dry, so charge builds up; in humid summer air, it leaks away.', look: 'dry air vs humid air' },
      { k: 'choice', code: 'C1.3', q: 'The section “Winter shocks” is organized mainly as …',
        opts: ['cause and effect', 'a list of dates', 'a story with characters', 'a comparison of two animals'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Describe a time you felt or saw static electricity. What caused it?',
        a: 'I got a shock from a car door after sliding across the seat in winter.', look: 'a real example and a cause' }
    ]
  });

  P.add({
    id: 'g6-solar', subject: 'science', form: 'Report',
    title: 'Power from the Sun',
    deck: 'How solar panels make electricity, and what they can and cannot do',
    hero: {
      photo: 'g6-solar-farm.jpg', credit: 'Photo: Dave Lauretti from Burlington, Canada, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Solar panels on a farm field in Grimsby, Ontario.'
    },
    body: [
      'In fields across Ontario, rows of dark blue panels tilt toward the sky. They make no noise, burn no fuel and have no moving parts. Yet together they make enough electricity for thousands of homes. These are solar farms, and they turn sunlight straight into electricity.',
      { fig: G.flow(['Sunlight hits the solar cells.', 'The cells make direct current (DC).', 'An inverter changes DC to AC.', 'Power lines carry it to homes.'], { top: 2, bh: 26, gap: 12, hl: 0 }),
        tall: 146, cap: 'From sunshine to your light switch.' },
      { h: 'How a panel works' },
      'Each panel is made of many small solar cells, usually built from a material called silicon. When light strikes a cell, it knocks electrons loose, and the moving electrons form an electric current. Panels make direct current, which flows in one direction. A machine called an inverter changes it into alternating current, the kind used in Canadian homes.',
      { h: 'Renewable energy' },
      'Sunlight is a <b>renewable</b> energy source: it will not run out, and using it does not use it up. Coal, oil and natural gas are non-renewable. They took millions of years to form, and burning them releases gases that trap heat and warm the planet. Solar panels release no such gases while they work.',
      { h: 'The trade-offs' },
      'Solar power has limits too. Panels make electricity only when the sun is up, and much less on cloudy days and in winter, when days are short. To have power at night, the energy must be stored in batteries or come from other sources. Large solar farms also need a lot of land, and making the panels uses energy and materials. When panels wear out after 25 years or more, they must be recycled properly.',
      'People also disagree about where solar farms should go. Some farmers welcome the extra income from renting a field. Others worry that good farmland, which is needed to grow food, is being covered with panels. One answer is to put panels on rooftops, parking lots and old industrial land instead.',
      { box: 'Check the angle', text: 'In Ontario, panels tilt toward the south to catch the most sun. The farther north you go, the steeper the tilt.' },
      'Most experts agree that no single source can power everything. Many communities now use a <b>mix</b>: solar, wind and water power working together, each covering for the others. Some remote northern communities that once relied only on diesel fuel now add solar panels to cut costs and pollution.'
    ],
    guide: { before: 'Ask: where does the electricity in our home come from? Teach <b>renewable</b> (re- means again) and <b>mix</b>.',
      after: 'Make a two-column list of the good points and limits of solar power. Which matters most for your community?' },
    words: [['renewable', 'able to be replaced naturally; it will not run out'], ['mix', 'a combination of different things working together']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the steps in order.',
        items: ['Sunlight hits the solar cells.', 'The cells make direct current.', 'An inverter changes DC to AC.', 'Power lines carry electricity to homes.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Non-</i> means not. A <b>non-renewable</b> source …',
        opts: ['can run out', 'never runs out', 'is the sun'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why do panels make less power in winter?',
        opts: ['The days are shorter.', 'Panels freeze solid.', 'There is no silicon.'], a: 0 },
      { k: 'table', code: 'C3.5', q: 'Fill in the chart with details from the text.', cols: ['Good points of solar power', 'Limits of solar power'],
        rows: [[null, null], [null, null]],
        a: [['It will not run out.', 'It works only when the sun is up.'], ['It releases no heat-trapping gases while working.', 'Large farms need a lot of land.']] },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Why do many communities use a mix of energy sources instead of solar alone?',
        a: 'Because solar does not work at night or on cloudy days, other sources like wind and water can cover for it.', look: 'solar has gaps; others cover' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is complex: a main idea plus a part that begins with <i>when</i> and cannot stand alone?',
        opts: ['When light strikes a cell, it knocks electrons loose.', 'Solar power has limits too.', 'They make no noise.', 'Sunlight is renewable.'], a: 0 },
      { k: 'lines', code: 'A2.3', n: 2, q: 'An ad says, “Solar panels solve all our energy problems!” Is this claim fair? Use the text.',
        a: 'No. The text shows solar has limits, like not working at night, so it cannot solve every problem.', look: 'not fair; a limit as evidence' }
    ]
  });

  P.add({
    id: 'g6-bondar', subject: 'science', form: 'Biography',
    title: 'Roberta Bondar in Orbit',
    deck: 'Canada’s first woman in space, a doctor who studied the body without gravity',
    hero: {
      photo: 'g6-bondar.jpg', credit: 'Photo: JSC/NASA, Public domain, Wikimedia Commons', focus: '50% 25%',
      tall: 220,
      cap: 'Roberta Bondar in her orange launch suit before her space flight.'
    },
    body: [
      'On January 22, 1992, the space shuttle Discovery roared off its launch pad in Florida. Strapped inside was Roberta Bondar, a doctor and scientist from Sault Ste. Marie, Ontario. Minutes later, she became the first Canadian woman in space.',
      { fig: G.time([['1945', 'Born in Sault Ste. Marie, Ontario'], ['1977', 'Becomes a doctor'], ['1983', 'Chosen as one of the first six astronauts'], ['1992', 'Eight days in space on Discovery'], ['Later', 'Photographs Canada’s national parks']], { x: 50, top: 12, gap: 26, hl: 3 }),
        tall: 122, cap: 'Key moments in Roberta Bondar’s life.' },
      { h: 'A curious child' },
      'As a girl, Bondar built model rockets, collected insects and set up a laboratory in her basement. She loved science and dreamed of space at a time when almost all astronauts were men. She studied zoology, then medicine, and became a <b>neurologist</b>, a doctor who treats the brain and nerves.',
      'In 1983, Canada chose its first six astronauts from more than 4&nbsp;000 people who applied. Bondar was one of them. She then trained for nine years before her chance to fly came.',
      'Training was hard work. Astronauts practise every task again and again until it becomes automatic. They float in special aircraft that dive to create a few seconds of weightlessness, and they rehearse emergencies, such as fire or a leak, in full-size models of the shuttle. Bondar also had to plan her experiments down to the minute.',
      { h: 'Experiments in orbit' },
      'For eight days, Discovery circled Earth about every 90 minutes. Bondar and the crew ran dozens of experiments. Many looked at how the body changes in <b>microgravity</b>, where everything floats. Without gravity, the inner ear, which helps people balance, gets confused. Fluids in the body shift up toward the head, so astronauts’ faces look puffy. Bondar studied these changes, and her work helped doctors understand problems that patients on Earth face too.',
      { box: 'In her words', text: 'Bondar has said that seeing Earth from space made her feel how fragile and precious the planet is.' },
      { h: 'A new view' },
      'After her flight, Bondar led research teams for years. She also became a photographer, travelling to every national park in Canada to capture its landscapes. Seeing Earth from space, she says, changed how she looked at the ground beneath her feet. Today, schools and a park in Sault Ste. Marie carry her name, and young scientists, especially girls, see in her story that the sky is not the limit.'
    ],
    guide: { before: 'Find Sault Ste. Marie on a map. Teach <b>neurologist</b> (neuro = nerve) and <b>microgravity</b> (micro = very small).',
      after: 'Ask: what did Bondar do as a child that helped her later? What could you start now?' },
    words: [['neurologist', 'a doctor who treats the brain and nerves'], ['microgravity', 'a state where gravity feels very weak, so things float']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. How many years passed between being chosen and flying?',
        opts: ['9', '6', '15'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Micro-</i> means very small. <b>Microgravity</b> is …',
        opts: ['very weak gravity', 'very strong gravity', 'a tiny planet'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Name two ways the body changes in microgravity.',
        a: 'The inner ear gets confused, so balance is hard, and fluids shift up toward the head, so faces look puffy.', look: 'two changes from the text' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What qualities helped Bondar become an astronaut? Use details as evidence.',
        a: 'Curiosity, because she built rockets and collected insects as a child, and patience, because she trained for nine years.', look: 'two qualities with evidence' },
      { k: 'choice', code: 'C1.2', q: 'What makes this text a biography?',
        opts: ['It tells the true story of a real person’s life.', 'It gives steps to follow.', 'It argues for an opinion.', 'It is told by an animal.'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'What does the author mean by “the sky is not the limit”?',
        opts: ['People can reach farther than they think.', 'The sky is very low.', 'Space is closed to visitors.', 'Clouds block rockets.'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 2, q: 'Which helped you more to follow Bondar’s life: the time line or the paragraphs? Why?',
        a: 'The time line, because I could see all the dates in order at a glance.', look: 'a choice and a reason' }
    ]
  });

  P.add({
    id: 'g6-aurora', subject: 'science', form: 'Explanation',
    title: 'Lights in the Night Sky',
    deck: 'What makes the northern lights glow, dance and change colour',
    hero: {
      photo: 'g6-aurora.jpg', credit: 'Photo: raymond22112376, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The northern lights over Yellowknife, Northwest Territories.'
    },
    body: [
      'On a clear winter night in Yellowknife, a pale green ribbon appears above the trees. It brightens, ripples like a curtain in the wind, then splits into waves of green and purple that sweep across the whole sky. These are the northern lights, or <b>aurora</b> borealis, and they are one of the most beautiful sights on Earth.',
      { fig: '<circle class="h" cx="34" cy="74" r="28"/>' + G.T(34, 120, 'Sun', 'lb', 'middle') +
          [50, 64, 78, 92].map(function (y) { return D.arrow(70, y + 2, 168, y + 2, 't'); }).join('') + G.T(118, 46, 'solar wind', 'l', 'middle') +
          '<circle class="k" cx="236" cy="74" r="30"/><path class="d" d="M236 44 C176 10 176 138 236 104 M236 44 C296 10 296 138 236 104"/>' +
          '<path class="a" d="M222 46 Q236 38 250 46 L246 52 Q236 46 226 52 Z"/>' + G.T(236, 30, 'aurora', 'lb', 'middle') + G.T(236, 128, 'Earth', 'lb', 'middle'),
        tall: 136, cap: 'Earth’s magnetic field guides particles from the Sun toward the poles.' },
      { h: 'A wind from the Sun' },
      'The Sun does not only give off light and heat. It also throws out a steady stream of tiny charged particles, called the solar wind. Most of these particles never reach us, because Earth is surrounded by an invisible magnetic field that pushes them aside. But near the North and South poles, the field curves down toward the ground, and some particles slip in.',
      'About 100 to 300 kilometres above the ground, the particles crash into gases in the <b>atmosphere</b>, the layer of air around Earth. Each crash gives the gas a burst of energy, and the gas lets that energy out as light. Billions of these tiny flashes together make the glowing curtains we see.',
      { h: 'Why the colours change' },
      'Different gases glow in different colours. Oxygen gives off the common green light, and, very high up, a deep red. Nitrogen glows blue and purple, often along the lower edges of the curtains. When the Sun is especially active, more particles arrive, and the lights can spread far south, sometimes all the way to Toronto.',
      { box: 'At the other end', text: 'Near the South Pole, the same thing happens. Those lights are called the aurora australis, or southern lights.' },
      { h: 'Stories and names' },
      'People of the North watched the lights for thousands of years before scientists explained them. Many Indigenous Peoples have their own names and stories for them. In Inuktitut, the lights are called aqsarniit. Some families still teach children to treat the lights with respect and quiet.',
      'Today, visitors travel from around the world to Yellowknife, which sits under a band where the lights appear on most clear nights from late August to April. Scientists there and across Canada use cameras and satellites to <b>predict</b> when the next big display will come.'
    ],
    guide: { before: 'Ask: have you ever seen the northern lights, or photos of them? Teach <b>aurora</b>, <b>atmosphere</b> and <b>predict</b>.',
      after: 'Use a magnet and iron filings, or a picture of them, to show how a magnetic field curves toward its poles.' },
    words: [['aurora', 'glowing light in the sky near the poles'], ['atmosphere', 'the layer of air around Earth'], ['predict', 'to say what will happen before it does']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where does the aurora appear?',
        opts: ['near Earth’s poles', 'at the equator', 'on the Sun'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The <b>atmosphere</b> is …',
        opts: ['the layer of air around Earth', 'a magnet', 'the solar wind'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number the events in order.',
        items: ['The Sun sends out charged particles.', 'Near the poles, some particles slip past the magnetic field.', 'Particles crash into gases in the atmosphere.', 'The gas lets out energy as light.'], show: [2, 0, 3, 1] },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Gas', 'Colour of light'],
        rows: [['Oxygen', null], ['Nitrogen', null]],
        a: [[null, 'green, and red very high up'], [null, 'blue and purple']] },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Find a comparison the author uses to describe the lights in the first paragraph. Why is it helpful?',
        a: '“Like a curtain in the wind.” It helps readers picture how the lights ripple and move.', look: 'the simile and what it helps you picture' },
      { k: 'lines', code: 'C3.4', n: 2, q: 'What does the section “Stories and names” add to the scientific explanation?',
        a: 'It shows that Indigenous Peoples knew and respected the lights long before scientists explained them.', look: 'Indigenous knowledge and respect' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'In two or three sentences, summarize what causes the northern lights.',
        a: 'Charged particles from the Sun are guided by Earth’s magnetic field toward the poles. They hit gases high in the air, and the gases glow.', look: 'particles, magnetic field, gases glow' }
    ]
  });

  P.add({
    id: 'g6-paper-plane', subject: 'science', form: 'Procedure',
    title: 'Build a Better Glider',
    deck: 'Fold a paper airplane, then run a fair test to make it fly farther',
    hero: {
      photo: 'g6-paper-plane.jpg', credit: 'Photo: Arthurfan828, CC BY 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A simple paper airplane. Small changes to its shape can make a big difference.'
    },
    body: [
      'A paper airplane is a <b>glider</b>: it has no engine, so once it leaves your hand, it slowly loses height as it moves forward. The same forces that act on a real plane act on it: lift, weight, thrust and drag. Follow these steps to build one, then test it like a scientist.',
      { fig: '<rect class="k" x="6" y="10" width="80" height="104"/><path class="d" d="M46 10 V114"/><path class="h" d="M6 10 L46 50 L86 10 Z"/>' + G.T(46, 132, '1', 'lb', 'middle') +
          '<path class="k" d="M106 114 V50 L146 10 L186 50 V114 Z"/><path class="d" d="M146 10 V114"/><path class="h" d="M146 10 L106 74 V50 Z M146 10 L186 74 V50 Z"/>' + G.T(146, 132, '2', 'lb', 'middle') +
          '<path class="k" d="M206 70 L292 60 L206 50 Z"/><path class="a" d="M206 70 L292 60 L230 86 Z"/>' + G.T(250, 132, '3', 'lb', 'middle'),
        tall: 138, cap: 'Fold the top corners to the centre, fold again, then fold in half and fold down the wings.' },
      { h: 'What you need' },
      'One sheet of letter-size paper, a ruler, a measuring tape and a clear space, such as a gym or a hallway.',
      { h: 'Steps' },
      '1. Fold the paper in half the long way, crease it firmly, then open it again. 2. Fold the two top corners in so they meet at the centre crease, making a point. 3. Fold the new slanted edges in to the centre crease again. 4. Fold the whole plane in half along the first crease, with the folds on the outside. 5. Fold each side down to make a wing, lining up the wing edge with the bottom of the body. 6. Hold the plane underneath, near the front, and throw it gently and level.',
      { h: 'Test it fairly' },
      'Now ask a question: does adding a paper clip to the nose make the plane fly farther? To find out, you need a <b>fair test</b>. Change only one thing, the <b>variable</b> you are testing, and keep everything else the same: the same plane, the same thrower, the same spot and the same strength of throw.',
      'Throw the plane five times without the clip and measure each distance. Then add the clip and throw five more times. Find the average of each set. Repeating the throws matters, because one lucky or unlucky throw could fool you.',
      { box: 'Safety', text: 'Never throw a plane toward a person’s face. Collect your planes after testing.' },
      { h: 'What to look for' },
      'A small weight at the front often keeps the plane from tipping up and stalling, so it glides farther. But too much weight makes it dive. Record your results in a table and decide: was your prediction right? What would you test next: wing size, paper type or the angle of the wing tips?',
      'Engineers who design real aircraft work the same way. They build a model, test it in a wind tunnel, change one thing and test again. Each small change teaches them something. Your hallway may not be a wind tunnel, but your method can be just as careful.'
    ],
    guide: { before: 'Gather paper, paper clips and a measuring tape. Teach <b>glider</b>, <b>fair test</b> and <b>variable</b>.',
      after: 'Do the test together and record the results in a table. Talk about what to change next, one thing at a time.' },
    words: [['glider', 'an aircraft with no engine'], ['fair test', 'an experiment where only one thing changes'], ['variable', 'the one thing that is changed in a test']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What tells you this text is a procedure?',
        opts: ['numbered steps and a list of things you need', 'characters and a problem', 'rhyming lines'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: 'Most steps begin with a command verb. Which is one?',
        opts: ['Fold', 'Paper', 'Clear'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number the steps for the fair test in order.',
        items: ['Throw five times without the clip and measure.', 'Add the paper clip and throw five more times.', 'Find the average of each set.', 'Decide if your prediction was right.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why must you keep the thrower, the spot and the strength of the throw the same?',
        a: 'So that only the paper clip changes, and you know the clip caused any difference in distance.', look: 'only one variable changes' },
      { k: 'choice', code: 'C3.2', q: 'Why does the author say to throw five times instead of once?',
        opts: ['One lucky or unlucky throw could fool you.', 'Paper planes break after one throw.', 'It is more fun.', 'The ruler is short.'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict: what will happen if you add five paper clips to the nose? Use the text.',
        a: 'It will probably dive, because the text says too much weight makes the plane dive.', look: 'dives; reason from text' },
      { k: 'lines', code: 'C1.4', n: 2, q: 'How does the diagram help you follow the steps?',
        a: 'It shows what the folds look like, so I can check my plane matches.', look: 'shows the shape of folds' }
    ]
  });

  P.add({
    id: 'g6-peacekeeping', subject: 'social', form: 'Report',
    title: 'Keeping the Peace',
    deck: 'How a Canadian idea sent soldiers in blue helmets to calm conflicts',
    hero: {
      photo: 'g6-peacekeeping.jpg', credit: 'Photo: Pierre André Leclercq, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Reconciliation: The Peacekeeping Monument in Ottawa honours Canadians who served on peacekeeping missions.'
    },
    body: [
      'In 1956, a crisis broke out in Egypt over the Suez Canal, a waterway that ships use to travel between Europe and Asia. Britain, France and Israel sent forces into Egypt. The Soviet Union threatened to step in. Many people feared a much larger war.',
      { fig: G.time([['1956', 'Suez Crisis; Pearson proposes a UN force'], ['1957', 'Pearson wins the Nobel Peace Prize'], ['1964', 'Peacekeepers go to Cyprus for 29 years'], ['1988', 'All UN peacekeepers win the Nobel Prize'], ['1992', 'The Peacekeeping Monument opens']], { x: 50, top: 12, gap: 27, hl: 0 }),
        tall: 128, cap: 'Key moments for Canada and peacekeeping.' },
      { h: 'Pearson’s idea' },
      'Lester B. Pearson, a Canadian <b>diplomat</b> who would later become prime minister, came up with a plan. At the United Nations, he proposed sending an international force to stand between the armies. Its soldiers would not fight to win. They would keep the two sides apart while leaders talked. The United Nations agreed, and the first large peacekeeping force was born. In 1957, Pearson won the Nobel Peace Prize.',
      { h: 'Blue helmets' },
      '<b>Peacekeepers</b> wear blue helmets or blue berets so that everyone can see they belong to the United Nations and are not on either side. Their jobs include watching ceasefire lines, clearing land mines, protecting people who are fleeing and helping to hold fair elections. They go only where the countries involved agree to let them in.',
      'Since 1956, more than 125&nbsp;000 Canadians have served on peacekeeping missions in places such as Cyprus, the Middle East, Africa and the Balkans. The work is often dangerous, and more than 120 Canadian peacekeepers have died while serving.',
      { box: 'A long mission', text: 'Canadian peacekeepers served in Cyprus for 29 years, keeping two communities on the island apart.' },
      { h: 'Peacekeeping today' },
      'Many Canadians see peacekeeping as part of their country’s identity. Yet today, Canada sends far fewer peacekeepers than it once did. Some people argue that Canada should return to its role as a leading peacekeeper. Others say modern conflicts are more complicated and need different kinds of help, such as aid, training and diplomacy, the work of solving problems by talking.',
      'Whatever their view, most people agree that the goal Pearson set is still worth pursuing: when a conflict starts, give people a chance to stop fighting and start talking.'
    ],
    guide: { before: 'Find Egypt, the Suez Canal and Cyprus on a map. Teach <b>peacekeepers</b> and <b>diplomat</b>.',
      after: 'Talk about how people at school or at home “keep the peace” in a disagreement. How is that like peacekeeping?' },
    words: [['peacekeepers', 'soldiers from many countries who keep two sides in a conflict apart'], ['diplomat', 'a person who represents a country and works out problems with other countries']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When did Pearson win the Nobel Peace Prize?',
        opts: ['1957', '1956', '1988'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why do peacekeepers wear blue?',
        opts: ['to show they belong to the UN', 'to hide at sea', 'to look like the sky'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How was a peacekeeping force different from an ordinary army?',
        a: 'It did not fight to win; it stood between the two sides to keep them apart while leaders talked.', look: 'keeps sides apart, does not fight to win' },
      { k: 'table', code: 'C3.5', q: 'Fill in the chart with the two views in the text.', cols: ['View', 'Reason'],
        rows: [['Canada should return to leading peacekeeping.', null], [null, 'Modern conflicts are more complicated.']],
        a: [[null, 'Peacekeeping is part of Canada’s identity.'], ['Canada should give other kinds of help.', null]] },
      { k: 'choice', code: 'B3.1', q: 'Which sentence has a relative clause (a part beginning with <i>who</i> that describes a noun)?',
        opts: ['Lester B. Pearson, a diplomat who would later become prime minister, came up with a plan.', 'The United Nations agreed.', 'Many people feared a war.', 'The work is dangerous.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What lesson from Pearson’s idea does the author think still matters today?',
        a: 'When a conflict starts, people should get a chance to stop fighting and start talking.', look: 'stop fighting, start talking' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Have you ever helped two people stop arguing? How was it like peacekeeping?',
        a: 'I stood between my brothers and asked each to explain, so they talked instead of fighting.', look: 'an event and a link' }
    ]
  });

  P.add({
    id: 'g6-desmond', subject: 'history', form: 'Biography',
    title: 'Viola Desmond Takes a Seat',
    deck: 'A businesswoman who refused to move, and the long road to justice',
    hero: {
      photo: 'g6-desmond.jpg', credit: 'Photo: Unknown authorUnknown author, Public domain, Wikimedia Commons', focus: '50% 25%',
      tall: 220,
      cap: 'Viola Desmond in Halifax, Nova Scotia.'
    },
    body: [
      'On the evening of November 8, 1946, Viola Desmond’s car broke down in New Glasgow, Nova Scotia. While she waited for it to be repaired, she decided to see a movie at the Roseland Theatre. She bought a ticket and took a seat on the main floor, near the screen, because she could not see well from far away.',
      { fig: '<rect class="k" x="40" y="6" width="220" height="16"/>' + G.T(150, 18, 'screen', 'n', 'middle') +
          '<rect class="h" x="40" y="34" width="220" height="62"/>' + G.T(150, 70, 'main floor: white people only', 'lb', 'middle') +
          '<rect class="k" x="40" y="104" width="220" height="30"/>' + G.T(150, 123, 'balcony: Black people', 'l', 'middle') +
          '<circle class="a" cx="80" cy="50" r="6"/>' + G.T(92, 54, 'Viola’s seat', 'n'),
        tall: 140, cap: 'How the Roseland Theatre was segregated in 1946 (simplified).' },
      'The theatre staff told her to move. Black customers, they said, had to sit in the balcony. Desmond, who was Black, offered to pay the difference in price, but they refused to take it. She stayed in her seat. A police officer dragged her out, injuring her, and she spent the night in jail.',
      { h: 'A one-cent crime' },
      'In court the next morning, Desmond was not charged with breaking a rule about seats. Instead, she was charged with not paying a one-cent tax: the difference between the tax on a balcony ticket and a main-floor ticket. She was found guilty and fined. No lawyer was there to help her. The real reason, everyone knew, was the colour of her skin.',
      { h: 'Speaking up' },
      'Desmond was a successful businesswoman. She ran a beauty salon and a school that trained Black women to become beauticians, at a time when other schools would not accept them. With the support of her church and the Nova Scotia Association for the Advancement of Coloured People, she <b>appealed</b> her case to a higher court. She lost, but her story spread and helped push Nova Scotia to end <b>segregation</b> laws in 1954.',
      { box: 'Long overdue', text: 'In 2010, Nova Scotia granted Desmond a free pardon, saying she had done nothing wrong. The government also apologized.' },
      { h: 'Remembered' },
      'Desmond died in 1965, long before her pardon. Her younger sister, Wanda Robson, spent years telling her story in schools. In 2018, Viola Desmond’s face appeared on Canada’s ten-dollar bill. She was the first Canadian woman to appear alone on a regularly circulating bank note. Her quiet act of refusing to move is now taught as a key moment in Canada’s fight for civil rights.'
    ],
    guide: { before: 'Find New Glasgow and Halifax on a map. Teach <b>segregation</b> and <b>appealed</b>. Look at a ten-dollar bill if you have one.',
      after: 'Talk about why the one-cent charge was unfair. Ask: why do you think it took so long for the government to say she did nothing wrong?' },
    words: [['segregation', 'keeping people apart because of their race'], ['appealed', 'asked a higher court to change a decision']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where did Viola sit?',
        opts: ['on the main floor', 'in the balcony', 'by the door'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>appeal</b> a case is to …',
        opts: ['ask a higher court to change it', 'pay a fine', 'buy a ticket'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author say the charge was a “one-cent crime”? What was the real reason she was charged?',
        a: 'The charge was about one cent of tax, which was tiny; the real reason was that she was Black and sat in the white section.', look: 'tiny charge; real reason racism' },
      { k: 'table', code: 'C1.3', q: 'Fill in the cause and effect chart.', cols: ['Cause', 'Effect'],
        rows: [['Desmond would not move to the balcony.', null], [null, 'Nova Scotia ended segregation laws in 1954.']],
        a: [[null, 'She was dragged out and jailed overnight.'], ['Her story spread after her appeal.', null]] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does Desmond’s beauty school tell you about her as a person?',
        a: 'She helped other Black women succeed when others would not accept them, so she cared about her community.', look: 'a quality with evidence' },
      { k: 'choice', code: 'C1.6', q: 'Whose point of view is missing from this text?',
        opts: ['the theatre staff', 'Viola Desmond', 'the author', 'her sister'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Viola Desmond is often compared with Rosa Parks in the United States. What do you know that connects them?',
        a: 'Both refused to give up a seat because of segregation, and both became symbols of civil rights.', look: 'a connection' }
    ]
  });

  P.add({
    id: 'g6-africville', subject: 'history', form: 'Report',
    title: 'Remembering Africville',
    deck: 'A Black community in Halifax, its loss and the fight to be remembered',
    hero: {
      photo: 'g6-africville.jpg', credit: 'Photo: Dennis G. Jarvis, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A copy of Africville’s Seaview church, rebuilt in 2011, now a museum.'
    },
    body: [
      'On the shore of the Bedford Basin, at the north end of Halifax, a small white church stands on a green hill above the water. It is a copy of a church that once stood at the heart of a community called Africville. For more than a century, Black families lived, worked, worshipped and raised children there.',
      { fig: G.time([['1840s', 'Black families settle on the Bedford Basin'], ['1849', 'The first church is founded'], ['1960s', 'The city moves residents out'], ['1967', 'The church is torn down at night'], ['2010', 'The City of Halifax apologizes'], ['2011', 'The church is rebuilt as a museum']], { x: 50, top: 12, gap: 24, hl: 4 }),
        tall: 138, cap: 'The story of Africville.' },
      { h: 'A close community' },
      'Many of the first families were descendants of Black Loyalists and of refugees who escaped slavery in the United States. They fished, farmed, worked on the docks and in the city. The church was the centre of community life, with Sunday services, weddings, choirs and picnics. Neighbours helped one another, and children played on the shore.',
      { h: 'Left out' },
      'Africville residents paid taxes to the city, but they did not get the same services as other Halifax neighbourhoods. There was no running water, no sewers and no paved roads. Instead, the city placed things that no other neighbourhood wanted nearby: a prison, a hospital for contagious diseases and, later, the city dump. This was <b>racism</b>: treating people unfairly because of their race.',
      { h: 'Moved out' },
      'In the 1960s, the city decided to tear Africville down, saying it would clear a slum. About 400 residents were moved out. Some received little money for their homes; some had their belongings moved in city garbage trucks. Their homes were bulldozed. In 1967, the church was torn down in the middle of the night. People lost not only houses, but a whole community.',
      { box: 'Never forgotten', text: 'Former residents and their families hold a reunion at the site every summer, keeping the community’s memory alive.' },
      { h: 'An apology' },
      'For decades, former residents and their children protested and asked for justice. In 2010, the City of Halifax made a formal apology. The church was rebuilt as a museum on the site, which had already been named a national historic site in 1996. The story of Africville is now taught so that Canadians can understand the harm done and work toward a fairer future. Remembering is a way to <b>honour</b> the people who lived there.'
    ],
    guide: { before: 'Find Halifax and the Bedford Basin on a map. Teach <b>racism</b>, <b>honour</b> and the word Loyalist. This is a hard history; talk about it calmly and answer questions honestly.',
      after: 'Ask: why do you think former residents kept holding reunions? Why does an apology matter?' },
    words: [['racism', 'treating people unfairly because of their race'], ['honour', 'to show great respect for']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When did Halifax apologize?',
        opts: ['2010', '1967', '1849'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Which service did Africville NOT have?',
        opts: ['running water', 'a church', 'neighbours'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The author says people lost “not only houses, but a whole community.” What does this mean?',
        a: 'They lost their neighbours, their church and the life they shared, not just buildings.', look: 'community life was lost' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Give two examples of how Africville was treated unfairly.',
        a: 'Residents paid taxes but had no running water or sewers, and the city put a dump and a prison nearby.', look: 'two examples' },
      { k: 'choice', code: 'C1.3', q: 'How is most of this text organized?',
        opts: ['in time order, from the past to today', 'as steps to follow', 'as a list of animals', 'as a set of questions'], a: 0 },
      { k: 'choice', code: 'C2.2', q: 'Why would a teacher choose this text for a unit on communities in Canada?',
        opts: ['It shows how a community was built, harmed and remembered.', 'It explains how to build a church.', 'It lists Halifax restaurants.', 'It is a funny story.'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 2, q: 'How did reading this text change what you know about Canada’s history?',
        a: 'I did not know Black communities in Canada were treated this way. It shows Canada has unfair parts in its history too.', look: 'a change in thinking' }
    ]
  });

  P.add({
    id: 'g6-prairie-domes', subject: 'history', form: 'Report',
    title: 'Domes on the Prairies',
    deck: 'How Ukrainian settlers built homes, farms and churches on the Canadian Prairies',
    hero: {
      photo: 'g6-vegreville-church.jpg', credit: 'Photo: TobyEditor, CC0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'A Ukrainian Orthodox church in Vegreville, Alberta. Its domes rise above the flat land around it.'
    },
    body: [
      'Drive across the Prairies of Alberta, Saskatchewan or Manitoba, and you may see a surprising sight: a small church topped with shining, onion-shaped domes, standing alone among the wheat fields. These churches were built by Ukrainian settlers, who began arriving in Canada more than 130 years ago.',
      { fig: G.time([['1891', 'The first two Ukrainian settlers arrive'], ['1896', 'Canada advertises free farmland in Europe'], ['1914', 'Wartime: thousands are interned in camps'], ['1975', 'A giant pysanka is built in Vegreville'], ['Today', 'About 1.3 million Ukrainian Canadians']], { x: 50, top: 12, gap: 26, hl: 1 }),
        tall: 124, cap: 'Key moments for Ukrainian Canadians.' },
      { h: 'Free land' },
      'In the 1890s, Canada wanted farmers to settle the West. The government sent advertisements to Europe offering 160 acres of land, called a <b>homestead</b>, for a fee of just ten dollars. To many poor farmers in western Ukraine, where land was scarce, this sounded like a dream. Between 1891 and 1914, about 170&nbsp;000 Ukrainians came to Canada.',
      { h: 'A hard start' },
      'Settlers often arrived with little more than a trunk of clothes, seeds and tools. Many chose land with trees, like the farms they had left behind. Their first homes were often a burdei, a shelter dug partly into the ground and roofed with sod. Later, they built cottages of logs plastered with clay and painted white. Families cleared trees and stones by hand and planted their first crops. Winters were long, and some years, early frost destroyed the harvest.',
      'Life was also hard in other ways. Some Canadians treated the newcomers with suspicion because of their language and customs. During the First World War, about 8&nbsp;500 people, most of them Ukrainian, were labelled “enemy aliens” and held in <b>internment</b> camps, even though they had done nothing wrong. Canada officially recognized this injustice in 2005.',
      { h: 'Keeping traditions' },
      'Ukrainian settlers held on to their language, songs, dances and food. They built churches in the style of home, with domes and painted icons inside. Families decorated pysanky, eggs covered with fine patterns made with wax and dye. Today, perogies, or varenyky, are served across Canada, and Ukrainian dance groups perform in cities from Winnipeg to Edmonton.',
      { box: 'A giant egg', text: 'Vegreville, Alberta, built a giant pysanka in 1975. It is more than nine metres tall and made of more than 2&nbsp;000 aluminum tiles.' },
      'The story of Ukrainian settlers is one of many that make up Canada’s <b>multicultural</b> identity: people from many places, each adding their own traditions to a shared country.'
    ],
    guide: { before: 'Find Ukraine, Alberta and Manitoba on a map. Teach <b>homestead</b>, <b>internment</b> and <b>multicultural</b>.',
      after: 'Ask: what traditions has your family kept from another place, or started here? How do they show up in your home?' },
    words: [['homestead', 'land given to a settler to farm and live on'], ['internment', 'holding people in camps, often during a war'], ['multicultural', 'made up of many cultures']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When did Canada advertise free land in Europe?',
        opts: ['1896', '1891', '1914'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Multi-</i> means many. <b>Multicultural</b> means …',
        opts: ['made up of many cultures', 'made of one culture', 'very old'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why did so many Ukrainian farmers decide to come to Canada?',
        a: 'Land was scarce in western Ukraine, and Canada offered 160 acres for only ten dollars.', look: 'land scarce at home; cheap land here' },
      { k: 'table', code: 'C3.4', q: 'Fill in the chart.', cols: ['Challenge settlers faced', 'Detail from the text'],
        rows: [['Hard work on the land', null], ['Unfair treatment', null]],
        a: [[null, 'They cleared trees and stones by hand; early frost destroyed crops.'], [null, 'During the war, about 8 500 people were held in internment camps.']] },
      { k: 'choice', code: 'B3.3', q: 'Why are commas used in “perogies, or varenyky, are served across Canada”?',
        opts: ['to set off another name for perogies', 'to separate items in a list', 'to end the sentence', 'to show a question'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Why does the author include the internment camps in a story about settlers?',
        a: 'To show the whole story, including the unfair parts, so readers understand what settlers really faced.', look: 'whole truth, not just good parts' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What tradition from your family or community would you keep if you moved to a new country? Why?',
        a: 'Making tamales at New Year, because it brings everyone together.', look: 'a tradition and a reason' }
    ]
  });

  P.add({
    id: 'g6-orange-shirt', subject: 'history', form: 'Report',
    title: 'Why We Wear Orange',
    deck: 'Phyllis Webstad’s orange shirt, residential schools and the work of reconciliation',
    hero: {
      photo: 'g6-every-child.jpg', credit: 'Photo: Taymaz Valley, CC BY 2.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'An Every Child Matters sign. On September 30, many Canadians wear orange.'
    },
    body: [
      'In 1973, a six-year-old girl named Phyllis Webstad was getting ready for her first day of school. Her grandmother, who did not have much money, bought her a shiny new orange shirt. Phyllis loved it. She wore it proudly to St. Joseph Mission, a residential school near Williams Lake, British Columbia.',
      { fig: G.time([['1800s', 'The first residential schools open'], ['1973', 'Phyllis’s shirt is taken away'], ['1996', 'The last residential school closes'], ['2013', 'The first Orange Shirt Day'], ['2015', 'Truth and Reconciliation report'], ['2021', 'The first national day, September 30']], { x: 50, top: 12, gap: 24, hl: 1 }),
        tall: 138, cap: 'Residential schools and Orange Shirt Day.' },
      'When she arrived, the staff took her clothes away, including her new orange shirt. She never got it back. For Phyllis, the colour orange came to mean the feeling that no one cared and that she did not matter.',
      { h: 'Residential schools' },
      'For more than 100 years, the Canadian government and churches ran <b>residential schools</b> for First Nations, Inuit and Métis children. More than 150&nbsp;000 children were taken from their families and sent to these schools, often far from home. Many were punished for speaking their own languages. Many were hungry, lonely or hurt, and thousands of children died. The goal was to make the children give up their cultures. The last school closed in 1996.',
      'The harm did not end when the schools closed. Many <b>survivors</b> struggled for years, and the loss of language and family connection affected their children and grandchildren too.',
      { h: 'An orange shirt becomes a symbol' },
      'In 2013, Phyllis Webstad, now a grown woman, shared her story at a gathering in Williams Lake. People there decided to wear orange every September 30, the time of year when children were taken to the schools. The idea spread across the country. Since 2021, September 30 has also been the National Day for Truth and Reconciliation.',
      { box: 'Every Child Matters', text: 'The words on orange shirts remind everyone that every child, everywhere, deserves to be cared for and respected.' },
      { h: 'Truth, then reconciliation' },
      '<b>Reconciliation</b> means repairing a relationship that has been damaged. It begins with truth: learning what happened and listening to survivors. In 2015, the Truth and Reconciliation Commission published 94 Calls to Action, steps that governments, schools and all Canadians can take. Wearing orange is one small step. Learning, listening and acting are the rest.'
    ],
    guide: { before: 'This is a serious topic. Read it together and go slowly. Teach <b>residential school</b>, <b>survivor</b> and <b>reconciliation</b>. Let the child ask questions and answer honestly and simply.',
      after: 'Ask: why do you think Phyllis chose to share her story? Talk about one thing your family could do to learn more, such as reading a book by an Indigenous author.' },
    words: [['residential schools', 'boarding schools that took Indigenous children away from their families'], ['survivors', 'people who lived through something terrible'], ['reconciliation', 'repairing a relationship that has been damaged']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When did the last residential school close?',
        opts: ['1996', '1973', '2013'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Reconciliation</b> means …',
        opts: ['repairing a damaged relationship', 'buying a new shirt', 'closing a school'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did the colour orange come to mean “no one cared” for Phyllis?',
        a: 'Her orange shirt, a gift from her grandmother, was taken away and never given back, which made her feel she did not matter.', look: 'shirt taken; felt she did not matter' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What harm did residential schools do? Give two examples from the text.',
        a: 'Children were taken from their families and punished for speaking their languages; many were hungry or hurt.', look: 'two examples' },
      { k: 'choice', code: 'C3.1', q: 'In this text, the orange shirt is a symbol. What does it stand for today?',
        opts: ['remembering children who were harmed and caring for every child', 'a sports team', 'the start of fall', 'a school uniform'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'The last section says reconciliation “begins with truth.” What comes first?',
        opts: ['learning what happened and listening to survivors', 'wearing orange only', 'building new schools', 'forgetting the past'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 2, q: 'How did reading this passage change your understanding of September 30?',
        a: 'I learned that orange shirts honour children who were taken from their families, not just a colour for fall.', look: 'a change in understanding' }
    ]
  });

  P.add({
    id: 'g6-handwashing', subject: 'health', form: 'Explanation',
    title: 'Twenty Seconds of Soap',
    deck: 'How a doctor’s discovery and a clever molecule keep germs away',
    hero: {
      photo: 'g6-handwashing.jpg', credit: 'Photo: Sgt. Grace L. Waladkewics, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Washing with soap and running water for 20 seconds removes most germs from your hands.'
    },
    body: [
      'Your hands touch hundreds of things every day: doorknobs, phones, pencils, pets and food. Along the way, they pick up <b>microbes</b>, tiny living things too small to see. Most are harmless, but some can make you sick. Washing your hands with soap is one of the simplest and most powerful ways to stay healthy.',
      { fig: '<circle class="a" cx="60" cy="40" r="10"/><path class="k" d="M70 40 H140"/>' + G.T(60, 22, 'head: loves water', 'n', 'middle') + G.T(140, 30, 'tail: loves oil', 'n', 'middle') +
          '<circle class="h" cx="230" cy="68" r="24"/>' + G.T(230, 72, 'germ', 'lb', 'middle') +
          [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i * Math.PI / 4, x1 = 230 + Math.cos(a) * 28, y1 = 68 + Math.sin(a) * 28, x2 = 230 + Math.cos(a) * 50, y2 = 68 + Math.sin(a) * 50;
            return '<path class="k" d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '"/><circle class="a" cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="5"/>'; }).join('') +
          G.T(60, 80, 'one soap', 'l', 'middle') + G.T(60, 94, 'molecule', 'l', 'middle') + G.T(150, 144, 'Tails grab the germ; heads let water rinse it away.', 'n', 'middle'),
        tall: 152, cap: 'Soap molecules surround a germ and lift it off the skin.' },
      { h: 'A doctor nobody believed' },
      'In the 1840s, many mothers in a Vienna hospital were dying of a fever soon after giving birth. A doctor named Ignaz Semmelweis noticed that doctors often went straight from working with sick patients to helping mothers, without washing. He ordered everyone to wash their hands in a cleaning solution, and the number of deaths dropped sharply. Yet many doctors refused to believe him. It took years before scientists proved that germs spread disease and handwashing became normal.',
      { h: 'How soap works' },
      'Many germs are wrapped in a thin, oily layer, and water alone slides right off oil. Soap is made of tiny particles called <b>molecules</b> that have two ends. One end is attracted to water, and the other end is attracted to oil. When you scrub, the oily ends dig into germs and dirt and break them apart. Then the water-loving ends let the running water carry everything away.',
      { h: 'Doing it right' },
      'Wet your hands, add soap and scrub every part: palms, backs, between your fingers, under your nails and around your thumbs. Keep scrubbing for at least 20 seconds, about as long as it takes to hum “Happy Birthday” twice. Rinse under running water and dry with a clean towel. Wash before eating, after using the washroom, after blowing your nose and after touching animals.',
      { box: 'Try this', text: 'Rub a little cooking oil and cinnamon on your hands. Rinse with water only, then with soap. Which removes more?' },
      'Hand sanitizer can help when there is no sink nearby, but it does not work well on dirty or greasy hands. When you can, soap and water are still the best <b>defence</b>.'
    ],
    guide: { before: 'Try the oil and cinnamon test together. Teach <b>microbes</b> (micro = small, bio = life), <b>molecules</b> and <b>defence</b>.',
      after: 'Time a 20-second wash together. Ask: why were doctors slow to believe Semmelweis?' },
    words: [['microbes', 'tiny living things too small to see'], ['molecules', 'the tiny particles that a substance is made of'], ['defence', 'protection against attack or harm']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Which end of soap grabs the germ?',
        opts: ['the oil-loving tail', 'the water-loving head', 'neither end'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Micro-</i> means small. <b>Microbes</b> are …',
        opts: ['tiny living things', 'large animals', 'kinds of soap'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why soap removes germs better than water alone.',
        a: 'Germs have an oily layer that water slides off. Soap’s oil-loving ends break them apart, and its water-loving ends let water rinse them away.', look: 'oily layer; two ends of soap' },
      { k: 'order', code: 'C1.3', q: 'Number the steps of a good handwash.',
        items: ['Wet your hands and add soap.', 'Scrub every part for 20 seconds.', 'Rinse under running water.', 'Dry with a clean towel.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think many doctors refused to believe Semmelweis?',
        a: 'Germs are too small to see, and scientists had not yet proved they spread disease, so his idea seemed strange.', look: 'germs unseen; not yet proved' },
      { k: 'choice', code: 'B3.2', q: 'In “Scrub every part,” the word <b>scrub</b> is …',
        opts: ['a verb giving a command', 'a noun', 'an adjective', 'a pronoun'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Which part of the passage did you need to reread? What helped you understand it?',
        a: 'How soap works; the diagram helped me see the two ends.', look: 'a part and a strategy' }
    ]
  });

  P.add({
    id: 'g6-dice', subject: 'math', form: 'Explanation',
    title: 'Is the Game Fair?',
    deck: 'Two dice, eleven sums and the math of probability',
    hero: {
      photo: 'g6-dice.jpg', credit: 'Photo: JonRichfield, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A roll of two dice. There are 36 different ways the two dice can land.'
    },
    body: [
      'Amira and Jonah invent a game with two dice. They roll both and add the numbers. If the sum is 6, 7 or 8, Amira scores a point. If the sum is anything else, Jonah does. Jonah grins: he has eight sums, and Amira has only three. Surely he will win. But after 30 rolls, Amira is far ahead. What happened?',
      { fig: G.T(4, 10, 'Number of ways to roll each sum with two dice', 'n') +
          G.cols([['2', 1], ['3', 2], ['4', 3], ['5', 4], ['6', 5], ['7', 6], ['8', 5], ['9', 4], ['10', 3], ['11', 2], ['12', 1]], 6, { base: 124, h: 92, x0: 4, hl: 5 }),
        tall: 142, cap: 'The sum 7 can be made 6 ways; 2 and 12 only 1 way each.' },
      { h: 'Counting the ways' },
      'The answer is <b>probability</b>: how likely something is to happen. Each die has six faces, so two dice can land in 6 × 6 = 36 different ways. But the sums are not equally likely. There is only one way to roll a sum of 2: a 1 and a 1. There are six ways to roll a 7: 1 and 6, 2 and 5, 3 and 4, 4 and 3, 5 and 2, and 6 and 1.',
      'Look at the chart. Amira’s sums, 6, 7 and 8, can be made 5 + 6 + 5 = 16 ways. Jonah’s eight sums together can be made only 36 − 16 = 20 ways. So Jonah should win slightly more often, 20 out of 36, but not nearly as much as he thought.',
      { h: 'Expected and actual' },
      'The probability of an <b>outcome</b> can be written as a fraction: the number of ways it can happen, out of all possible ways. The chance of rolling 7 is 6 out of 36, or 1 out of 6. This is the theoretical probability, what should happen in the long run.',
      'But 30 rolls is not the long run. In a short game, luck plays a big part, and results can be far from what the math predicts. That is why Amira won, even though the odds were slightly against her. If they rolled 3&nbsp;600 times, Jonah would almost certainly come out ahead.',
      { box: 'Fair or not?', text: 'A game is fair when each player has the same probability of winning. Is Amira and Jonah’s game fair? How could you change it?' },
      'Probability helps people make decisions every day. Weather forecasters give the chance of rain. Doctors weigh the chances that a treatment will work. Game designers use it to make games fun and fair.',
      'You can test probability yourself. Roll two dice 36 times and tally each sum. Then do it again, and again. Each set of 36 rolls will look a little different. But add all your tallies together, and the shape of your results will slowly grow more like the chart: low at the ends and tallest in the middle, at 7. The more you roll, the closer you get to the math.'
    ],
    guide: { before: 'Roll two dice 20 times together and tally the sums. Teach <b>probability</b> and <b>outcome</b>.',
      after: 'Change the rules to make the game fair, then test it with 36 rolls.' },
    words: [['probability', 'how likely something is to happen'], ['outcome', 'a possible result']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Which sum can be rolled the most ways?',
        opts: ['7', '12', '2'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'How many different ways can two dice land?',
        opts: ['36', '12', '11'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why was Jonah wrong to think he would win easily?',
        a: 'The sums are not equally likely. Amira’s three sums can be made 16 ways, and Jonah’s eight sums only 20 ways.', look: 'sums not equally likely; 16 vs 20' },
      { k: 'table', code: 'C1.4', q: 'Use the chart. Fill in the probability of each sum.', cols: ['Sum', 'Ways', 'Probability'],
        rows: [['2', null, null], ['7', null, null], ['10', null, null]],
        a: [[null, '1', '1 out of 36'], [null, '6', '6 out of 36'], [null, '3', '3 out of 36']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Amira won the game even though the odds were slightly against her. How can that be?',
        a: 'In a short game of 30 rolls, luck plays a big part, so results can be different from what the math predicts.', look: 'short game; luck' },
      { k: 'choice', code: 'C1.3', q: 'How does the author organize the passage?',
        opts: ['a puzzle at the start, then an explanation', 'a list of dates', 'a set of instructions', 'a poem'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 2, q: 'Summarize what theoretical probability means.',
        a: 'It is how often something should happen in the long run: the ways it can happen out of all possible ways.', look: 'ways out of all ways; in the long run' }
    ]
  });

  P.add({
    id: 'g6-drifting-canoe', subject: 'story', form: 'Mystery story',
    title: 'The Drifting Canoe',
    deck: 'A canoe vanishes from the dock at dawn, and Ines follows the clues',
    hero: {
      photo: 'g6-canoe-lake.jpg', credit: 'Photo: Markabq, Public domain, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'The dock at Canoe Lake in Algonquin Park, Ontario.'
    },
    body: [
      'The scream came from the dock just after sunrise. Ines tumbled out of the cabin in her pyjamas and found her cousin Leo pointing at the water. The red canoe, which had been tied to the dock the night before, was gone.',
      '“Someone stole it!” Leo cried. “Probably those campers across the bay.”',
      'Ines was not so sure. She crouched beside the dock post. A short end of rope still hung from it, and the rope was not cut. Its end was smooth and loose, as if a knot had simply slipped undone.',
      { fig: '<path class="k" d="M10 120 Q60 112 110 124 Q160 136 200 120 V150 H10 Z"/>' + G.T(40, 142, 'shore', 'n') +
          '<rect class="k" x="80" y="100" width="14" height="22"/>' + G.T(98, 96, 'dock', 'l') +
          '<path class="d" d="M88 100 Q150 60 238 30"/><path class="a" d="M230 26 L260 22 L254 34 Z"/>' + G.T(236, 50, 'canoe found', 'l') +
          D.arrow(30, 96, 30, 20, 't') + G.T(38, 60, 'wind', 'lb') + G.T(270, 14, 'N ↑', 'lb'),
        tall: 156, cap: 'Where the canoe was tied and where it was found.' },
      'She looked at the lake. All night, a strong wind had blown from the south, from the dock toward the far shore. The campers’ site was to the west. If someone had paddled the canoe away, they would have needed the paddles. Ines checked the shed. Both paddles hung on their hooks, dry.',
      '“A thief without paddles?” she said. “That would be a strange thief.”',
      'Leo’s face went a little pink. “Maybe they brought their own.”',
      { h: 'The far shore' },
      'Ines grabbed binoculars and scanned the bay. There, wedged against the rocks on the north shore, exactly where the wind would push it, sat a small red shape. The canoe was not stolen. It had <b>drifted</b>.',
      'Uncle Rafi drove them around the bay in the motorboat. The canoe was scratched but fine. On the ride back, Leo stared at the water for a long time.',
      '“I tied it last night,” he finally said. “I was in a hurry to get to the campfire. I think I just wrapped the rope around the post a few times.” He swallowed. “I’m sorry I blamed the campers.”',
      { box: 'A sailor’s knot', text: 'A cleat hitch or a bowline holds tight in wind and waves. A few loose wraps do not.' },
      'Uncle Rafi nodded. “Thank you for telling the truth. That takes more courage than tying a good knot.” That afternoon, he taught both of them a bowline. Leo practised it until he could tie it with his eyes closed. Ines watched the <b>evidence</b> of the morning, a tidy knot on the post, and smiled.'
    ],
    guide: { before: 'Ask: what does a detective do? Teach <b>drifted</b> and <b>evidence</b>. Tell the child to watch for clues as they read.',
      after: 'Talk about why Leo first blamed the campers. Practise tying a knot together.' },
    words: [['drifted', 'was carried slowly by wind or water'], ['evidence', 'facts or clues that show what is true']],
    qs: [
      { k: 'table', code: 'C3.2', q: 'Fill in the chart with Ines’s clues.', cols: ['Clue', 'What it tells Ines'],
        rows: [['The rope is not cut.', null], ['The paddles are still in the shed.', null], ['The wind blew toward the north shore.', null]],
        a: [[null, 'The knot slipped; no one cut it.'], [null, 'No one paddled it away.'], [null, 'The wind pushed the canoe there.']] },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Where was the canoe found?',
        opts: ['across the bay, downwind', 'at the dock', 'at the campers’ site'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'What makes this story a mystery?',
        opts: ['A puzzle is solved using clues.', 'It has a recipe.', 'It gives facts about lakes.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why does Leo’s face go “a little pink” when Ines talks about the paddles?',
        a: 'He is starting to realize the canoe drifted because of his knot, and he feels embarrassed.', look: 'he guesses it was his fault' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What lesson does Uncle Rafi teach? Do you agree with him? Why?',
        a: 'Telling the truth takes courage. I agree, because admitting a mistake is harder than hiding it.', look: 'the lesson and an opinion with a reason' },
      { k: 'choice', code: 'B3.3', q: 'Why are there quotation marks around “A thief without paddles?”',
        opts: ['They show the exact words Ines says.', 'They show a title.', 'They show a list.', 'They show a heading.'], a: 0 },
      { k: 'lines', code: 'C1.6', n: 3, q: 'The story follows Ines. How might it be different if Leo told it?',
        a: 'We would know from the start that he worried about his knot, so the mystery would be less of a surprise.', look: 'his secret worry; less mystery' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'When did you first guess what really happened? Which clue helped?',
        a: 'When the paddles were still in the shed, because no thief would leave them.', look: 'a moment and a clue' }
    ]
  });

  P.add({
    id: 'g6-haida-poles', subject: 'arts', form: 'Report',
    title: 'Stories in Cedar',
    deck: 'Haida poles, the families they honour and the artists who brought them back',
    hero: {
      photo: 'g6-haida-poles.jpg', credit: 'Photo: Karen Neoh, CC BY 2.0, Wikimedia Commons', focus: '50% 35%',
      tall: 220,
      cap: 'Poles stand in front of the Haida Heritage Centre at Kay Llnagaay, Skidegate, Haida Gwaii.'
    },
    body: [
      'On the islands of Haida Gwaii, off the north coast of British Columbia, tall carved poles stand facing the sea. Each one is carved from a single giant cedar tree. Each one tells a story, and none of them is just a decoration. For the Haida Nation, these poles are a way of recording history, honouring people and showing who a family is.',
      { fig: '<rect class="k" x="120" y="4" width="60" height="140"/><path class="k" d="M120 50 H180 M120 98 H180"/>' +
          '<path class="h" d="M134 16 L150 36 L166 16 Z"/><circle class="k" cx="150" cy="70" r="12"/><path class="k" d="M136 110 Q150 132 164 110"/>' +
          G.T(196, 28, 'top crest: often a', 'l') + G.T(196, 42, 'family’s guardian', 'l') + G.T(196, 76, 'a figure from', 'l') + G.T(196, 90, 'a family story', 'l') +
          G.T(196, 118, 'base: often the', 'l') + G.T(196, 132, 'most important crest', 'l') +
          G.T(104, 74, 'read from', 'l', 'end') + G.T(104, 88, 'the bottom up', 'l', 'end'),
        tall: 148, cap: 'A simple diagram of how figures are stacked on a pole. Every pole is different.' },
      { h: 'Crests and stories' },
      'The figures on a pole are called <b>crests</b>. A crest is an animal or being, such as Raven, Eagle, Bear, Killer Whale or Frog, that belongs to a family and is passed down through generations. Crests show a family’s history and its rights. A pole may tell how an ancestor met a supernatural being, or record an important event. Only the family and the carver know the full meaning of every figure.',
      'There are different kinds of poles. House frontal poles stand at the front of a family’s home, sometimes with a doorway carved through the base. Memorial poles honour a chief or a respected person who has died. Raising a new pole is marked with a potlatch, a great feast where guests witness the event, share food and receive gifts.',
      { h: 'Silenced and revived' },
      'In 1884, the Canadian government banned the potlatch. Without potlatches, poles could not be raised in the proper way. Disease had also killed most of the Haida people, and many villages were left empty. Collectors took poles to museums around the world. For decades, few new poles were carved.',
      'Then, in 1969, a young Haida artist named Robert Davidson carved a pole and raised it in Old Massett, his home village. It was the first pole raised there in almost 90 years. Elders sang songs they had not sung in decades. Davidson and the artist Bill Reid helped spark a <b>revival</b> of Haida art that continues today.',
      { box: 'Respect', text: 'Poles are not meant to last forever. When an old pole falls, some families let it return to the forest floor.' },
      'Today, Haida carvers train apprentices, and new poles are raised with feasts and songs. In 2013, hundreds of people gathered at a remote island to raise the Gwaii Haanas Legacy Pole, the first pole raised there in 130 years.'
    ],
    guide: { before: 'Find Haida Gwaii on a map. Teach <b>crests</b>, <b>revival</b> and potlatch. Explain that the stories on poles belong to Haida families.',
      after: 'Ask: why might carving and raising a pole matter so much after the ban? Look at photos of Haida art from the Haida Heritage Centre website.' },
    words: [['crests', 'animals or beings that belong to a family and show its history'], ['revival', 'bringing something back into use or life']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Which way is a pole often read?',
        opts: ['from the bottom up', 'from left to right', 'from the top down'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>crest</b> on a pole is …',
        opts: ['a figure that belongs to a family', 'a kind of tree', 'a feast'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Fill in the cause and effect chart.', cols: ['Cause', 'Effect'],
        rows: [['The potlatch was banned in 1884.', null], ['Robert Davidson raised a pole in 1969.', null]],
        a: [[null, 'Poles could not be raised in the proper way, and few were carved.'], [null, 'It helped spark a revival of Haida art.']] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What do Haida poles show about what is important to Haida families?',
        a: 'Family history, ancestors and honouring people matter, because poles record crests, stories and people who have died.', look: 'family, history, honour' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why do you think Elders sang songs they had not sung in decades when the 1969 pole was raised?',
        a: 'The pole brought back a tradition they thought was lost, so they could finally celebrate it again.', look: 'tradition returned; joy' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence has a part beginning with <i>where</i> that tells more about a noun?',
        opts: ['Raising a pole is marked with a potlatch, a great feast where guests witness the event.', 'Each one tells a story.', 'Disease killed many people.', 'Poles are not meant to last forever.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'The author says “none of them is just a decoration.” What is the author’s message?',
        a: 'Haida poles carry history and meaning, so they should be respected, not seen as decorations.', look: 'meaning and respect' }
    ]
  });

  P.add({
    id: 'g6-monarch', subject: 'science', form: 'Report',
    title: 'The Great Monarch Journey',
    deck: 'How a butterfly that weighs less than a paper clip flies to Mexico and back',
    hero: {
      photo: 'g6-monarch.jpg', credit: 'Photo: Thomas Bresson, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A monarch butterfly. Its bright orange wings warn birds that it tastes bad.'
    },
    body: [
      'Every fall, monarch butterflies leave southern Canada and begin one of the most amazing journeys in the animal world. They fly as far as 4&nbsp;000 kilometres to a few mountain forests in central Mexico. Each butterfly weighs about half a gram, less than a paper clip, and it has never made the trip before.',
      { fig: G.flow(['Egg, laid on a milkweed leaf', 'Caterpillar eats milkweed and grows', 'Chrysalis: the body is rebuilt', 'Adult butterfly'], { top: 2, bh: 26, gap: 12, hl: 3 }),
        tall: 146, cap: 'A monarch’s life cycle takes about a month.' },
      { h: 'A journey across generations' },
      'In spring, monarchs leave Mexico and fly north. But no single butterfly makes the whole round trip. Most monarchs live only two to six weeks. They lay eggs on the way, and their children continue north. Over the summer, three or four <b>generations</b> are born, each moving a little farther, until monarchs reach Ontario, Quebec and the Prairies.',
      'The last generation of summer is different. These butterflies do not lay eggs right away. Instead, they live up to eight months, long enough to fly all the way south, spend the winter in Mexico and begin the trip north again in spring. Scientists believe they find their way using the position of the Sun and Earth’s magnetic field.',
      { h: 'Milkweed and poison' },
      'Monarch caterpillars eat only one kind of plant: milkweed. Milkweed contains a poison that does not hurt the caterpillar but stays in its body as it becomes a butterfly. A bird that eats a monarch gets sick and learns to avoid that bright orange pattern. The colour is a warning, a kind of <b>adaptation</b> that helps the butterfly survive.',
      { h: 'In danger' },
      'The number of monarchs reaching Mexico has dropped sharply since the 1990s. Milkweed has been cleared from farm fields and roadsides. Some forests where they spend the winter have been cut. Storms and droughts, which are becoming more common as the climate changes, kill many on the journey. In 2023, Canada listed the monarch as <b>endangered</b>.',
      { box: 'Tagging', text: 'Volunteers put tiny stickers on monarchs’ wings. When tagged butterflies are found in Mexico, scientists learn more about their routes.' },
      'People are helping. Families, schools and towns plant milkweed and wildflowers to create waystations, places where monarchs can feed and lay eggs. Every patch of milkweed is a stepping stone on the long road south.'
    ],
    guide: { before: 'Find southern Ontario and central Mexico on a map and estimate the distance. Teach <b>generations</b>, <b>adaptation</b> and <b>endangered</b>.',
      after: 'Look for milkweed in a park or field. Talk about where a monarch waystation could go near you.' },
    words: [['generations', 'parents, then children, then grandchildren, and so on'], ['adaptation', 'a feature that helps a living thing survive'], ['endangered', 'in danger of disappearing forever']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the stages of the life cycle.',
        items: ['Egg', 'Caterpillar', 'Chrysalis', 'Adult butterfly'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why do birds avoid monarchs?',
        opts: ['Monarchs taste bad and make birds sick.', 'Monarchs are too fast.', 'Monarchs bite.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>adaptation</b> is …',
        opts: ['a feature that helps a living thing survive', 'a long trip', 'a kind of tag'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How is the last generation of summer different from the others?',
        a: 'It does not lay eggs right away and lives up to eight months, long enough to fly to Mexico and back north.', look: 'lives longer; makes the journey' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart.', cols: ['Threat to monarchs', 'What people do to help'],
        rows: [['Milkweed is cleared.', null], ['Scientists need to learn the routes.', null]],
        a: [[null, 'Plant milkweed and wildflowers as waystations.'], [null, 'Volunteers tag butterflies’ wings.']] },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The author calls each patch of milkweed “a stepping stone on the long road south.” What does this mean?',
        a: 'Each patch is a place to stop and feed along the way, helping monarchs get across the long journey.', look: 'stopping places along the way' },
      { k: 'lines', code: 'C2.1', n: 2, q: 'What did you already know about butterflies or migration? How did it help you?',
        a: 'I knew geese fly south, so I understood that monarchs also go somewhere warm for winter.', look: 'prior knowledge and how it helped' }
    ]
  });

  P.add({
    id: 'g6-point-pelee', subject: 'science', form: 'Report',
    title: 'Nature’s Sponges',
    deck: 'Why wetlands like the marsh at Point Pelee are among the most valuable places on Earth',
    hero: {
      photo: 'g6-point-pelee.jpg', credit: 'Photo: Ken Lund from Reno, Nevada, USA, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The marsh boardwalk at Point Pelee National Park, at the southern tip of mainland Canada.'
    },
    body: [
      'At the southern tip of Ontario, a long point of land reaches into Lake Erie. Most of Point Pelee National Park is not forest or beach, but marsh: shallow water filled with cattails, water lilies, turtles, frogs and birds. A wooden boardwalk lets visitors walk right through it. To some people, a marsh looks like a soggy waste of space. Scientists see one of the most valuable <b>habitats</b> on Earth.',
      { fig: G.T(4, 10, 'Southern Ontario wetlands since settlement (estimate)', 'n') +
          G.bars([['Lost', 72, '72%'], ['Remaining', 28, '28%']], 72, { x0: 82, top: 24, gap: 34, pad: 40, hl: 0 }) +
          G.T(4, 112, 'Most were drained for farms, roads and towns.', 'l'),
        tall: 118, cap: 'About seven out of ten wetlands in southern Ontario have been lost.' },
      { h: 'What a wetland does' },
      'Wetlands act like giant sponges. When heavy rain falls or snow melts, they soak up water and release it slowly, which helps prevent floods downstream. In dry summers, the water they stored slowly feeds streams and wells.',
      'Wetlands also clean water. As water moves slowly through the plants, mud settles out, and plants and tiny living things take up extra nutrients and some pollution. Water that leaves a healthy marsh is often cleaner than the water that entered it.',
      'Most of all, wetlands are full of life. Fish lay eggs among the reeds. Ducks, herons and red-winged blackbirds nest there. Turtles bask on logs. Many species that are at risk in Ontario depend on wetlands. Point Pelee is also a resting stop for migrating birds and monarch butterflies, which gather there before crossing the lake.',
      { h: 'Disappearing wetlands' },
      'For many years, people saw wetlands as useless land. They drained them to make farm fields, roads and towns. In southern Ontario, about 72 percent of the wetlands that existed before European settlement are gone. When a wetland is drained, the flooding gets worse, the water gets dirtier and the animals that lived there lose their homes.',
      { box: 'Did you know?', text: 'Wetlands store large amounts of carbon in their wet soil, which helps slow climate change.' },
      { h: 'Protecting what is left' },
      'Today, Ontario has rules to protect many important wetlands, and groups work to <b>restore</b> drained ones by blocking ditches and replanting native plants. Visitors can help too: stay on boardwalks and trails, never release pets or aquarium plants into the wild, and support parks that protect these watery worlds.'
    ],
    guide: { before: 'Soak a sponge, then squeeze it slowly to show how a wetland stores and releases water. Teach <b>habitat</b> and <b>restore</b>.',
      after: 'Find the nearest wetland, conservation area or marsh to your home on a map. Plan a visit if you can.' },
    words: [['habitats', 'places where plants and animals naturally live'], ['restore', 'to bring back to how it was before']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. What share of southern Ontario’s wetlands remain?',
        opts: ['about 28%', 'about 72%', 'all of them'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Re-</i> means again. To <b>restore</b> a wetland is to …',
        opts: ['bring it back again', 'drain it', 'build a road on it'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['What a wetland does', 'How it helps'],
        rows: [['Soaks up water like a sponge', null], ['Slows water down', null], ['Gives animals a home', null]],
        a: [[null, 'It helps prevent floods.'], [null, 'Mud settles out and the water gets cleaner.'], [null, 'Fish, birds and turtles can live and nest there.']] },
      { k: 'lines', code: 'C1.5', n: 2, q: 'Why does the author compare wetlands to sponges?',
        a: 'Because like a sponge, a wetland soaks up water and lets it out slowly. The comparison makes the idea easy to picture.', look: 'soaks up, releases slowly' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The author says some people see a marsh as “a soggy waste of space.” Why does the author include this view?',
        a: 'To show the opposite view, then prove it wrong with facts about how valuable wetlands are.', look: 'shows a view, then argues against it' },
      { k: 'choice', code: 'C2.3', q: 'Predict: a town drains a large wetland to build houses. What will most likely happen?',
        opts: ['Floods downstream get worse.', 'More ducks will nest.', 'The water gets cleaner.', 'Nothing will change.'], a: 0 },
      { k: 'lines', code: 'A2.6', n: 2, q: 'Write one short message for a park sign that would persuade visitors to stay on the boardwalk.',
        a: 'Stay on the boardwalk: one step off can crush a turtle nest.', look: 'short, clear, persuasive' }
    ]
  });

  P.add({
    id: 'g6-webb', subject: 'science', form: 'Report',
    title: 'A Golden Eye in Space',
    deck: 'The James Webb Space Telescope, and the Canadian tools that help it see',
    hero: {
      photo: 'g6-webb-mirror.jpg', credit: 'Photo: NASA/MSFC/David Higginbotham, Public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'An engineer looks over gold-coated mirror segments of the James Webb Space Telescope before launch.'
    },
    body: [
      'On December 25, 2021, a rocket blasted off from French Guiana, in South America, carrying the largest and most powerful space telescope ever built. The James Webb Space Telescope was a joint project of space agencies from the United States, Europe and Canada. Its job: to look farther into space, and further back in time, than any telescope before it.',
      { fig: G.T(4, 10, 'Width of the main mirror (metres)', 'n') +
          G.cols([['Hubble', 2.4, '2.4 m'], ['Webb', 6.5, '6.5 m'], [['a Grade 6', 'student'], 1.5, '1.5 m']], 6.5, { base: 118, h: 90, x0: 20, hl: 1 }),
        tall: 146, cap: 'A larger mirror collects more light, so the telescope can see fainter objects.' },
      { h: 'A mirror made of gold' },
      'A telescope collects light with a mirror, and a bigger mirror collects more light. Webb’s main mirror is 6.5 metres wide, almost three times as wide as the famous Hubble Space Telescope. It was too big to fit inside a rocket, so engineers built it from 18 six-sided pieces that folded up like a flower bud for launch and opened in space. Each piece is coated with a thin layer of gold, which reflects <b>infrared</b> light especially well.',
      { h: 'Seeing heat' },
      'Infrared light is invisible to our eyes, but we can feel it as heat. Light from the most distant galaxies has been travelling for more than 13 billion years. On the way, it has been stretched into infrared. To catch this faint heat, Webb must be extremely cold. A sunshield as big as a tennis court, made of five thin layers, blocks the heat from the Sun, Earth and Moon. Webb works about 1.5 million kilometres from Earth, four times farther than the Moon.',
      { h: 'Canada’s part' },
      'Canada built two important parts of Webb. The Fine Guidance Sensor helps the telescope point at a target and hold perfectly steady, like a photographer keeping a camera still. A science <b>instrument</b> called NIRISS studies the light from planets around other stars, looking for clues about their air. In return, Canadian astronomers receive a share of the telescope’s observing time.',
      { box: 'Looking back', text: 'Because light takes time to travel, when Webb looks at a distant galaxy, it sees the galaxy as it was billions of years ago.' },
      'Webb has already sent back sharp images of glowing star nurseries, colliding galaxies and planets far from our solar system. Each picture raises new questions, which is exactly what a great telescope should do.'
    ],
    guide: { before: 'Ask: why do you think a telescope is sent into space instead of kept on the ground? Teach <b>infrared</b> (infra = below), <b>instrument</b> and the word galaxy.',
      after: 'Look at some of Webb’s images on the Canadian Space Agency website together. Pick one and describe it.' },
    words: [['infrared', 'light we cannot see but can feel as heat'], ['instrument', 'a tool for measuring or studying something']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. About how many times wider is Webb’s mirror than Hubble’s?',
        opts: ['almost 3 times', '10 times', 'the same'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Infrared</b> light is light we …',
        opts: ['cannot see but feel as heat', 'see as red', 'hear'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How did engineers fit such a large mirror inside a rocket?',
        a: 'They built it from 18 pieces that folded up like a flower bud and opened once in space.', look: '18 pieces, folded, opened in space' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why does Webb need a huge sunshield?',
        a: 'Webb must be very cold to catch faint infrared heat, so the shield blocks heat from the Sun, Earth and Moon.', look: 'stay cold to see faint heat' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart about Canada’s part.', cols: ['Canadian part', 'What it does'],
        rows: [['Fine Guidance Sensor', null], ['NIRISS', null]],
        a: [[null, 'Points the telescope and holds it steady.'], [null, 'Studies light from planets around other stars.']] },
      { k: 'choice', code: 'C3.2', q: 'What does the author mean by “further back in time”?',
        opts: ['Webb sees distant things as they were long ago.', 'Webb travels into the past.', 'Webb is an old telescope.', 'Webb shows dinosaurs.'], a: 0 },
      { k: 'lines', code: 'C2.2', n: 2, q: 'Who might want to read this report, and why?',
        a: 'A student interested in space, because it explains how Webb works and Canada’s part in it.', look: 'a reader and a reason' }
    ]
  });

  P.add({
    id: 'g6-e-waste', subject: 'tech', form: 'Opinion essay',
    title: 'Fix It First',
    deck: 'An opinion: what to do with old phones, tablets and laptops',
    plain: true,
    hero: {
      photo: 'g6-e-waste.jpg', credit: 'Photo: Tom Worthington, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Old computers collected for recycling. Each one holds metals that can be used again.'
    },
    body: [
      'Open a kitchen drawer in almost any Canadian home, and you may find a tangle of old phones, chargers and earbuds. We replace our devices often, sometimes every two or three years. I believe that before we throw out or replace an electronic device, we should try to fix it, and when it truly cannot be used, we should recycle it properly.',
      { fig: G.flow(['Old device dropped off at a depot', 'Taken apart by hand and machine', 'Metals and plastics sorted', 'Materials used to make new things'], { top: 2, bh: 26, gap: 12, hl: 3 }),
        tall: 146, cap: 'What happens to a device at a proper recycling centre.' },
      { h: 'Treasure in the trash' },
      'My first reason is that old electronics contain valuable materials. A phone holds small amounts of gold, silver and copper, along with rare metals that are hard to dig out of the ground. Mining these metals uses huge amounts of energy and water and can damage forests and rivers. When devices are recycled, these metals can be recovered and used again.',
      { h: 'Danger in the dump' },
      'My second reason is safety. <b>Electronic waste</b>, or e-waste, also contains harmful substances such as lead and mercury. In a landfill, these can leak into soil and water. Batteries thrown in the garbage can even start fires in garbage trucks. Sadly, a lot of e-waste around the world is not recycled properly. Some is shipped to poorer countries, where people, including children, burn it to collect the metals, breathing toxic smoke.',
      'In Canada, every province has places where people can drop off old electronics for free. Yet many devices never get there. They sit forgotten in drawers or end up in the garbage because people do not know where to take them, or simply do not bother.',
      { h: 'The best device is the one you have' },
      'My third reason is that fixing a device is even better than recycling it. Replacing a cracked screen or a worn-out battery can give a phone years more life. Some people argue that repairs cost too much and new devices work better. That can be true. But many repairs are cheaper than buying new, and some companies now sell parts and guides so people can fix their own devices. Many people are calling for a “right to repair” so that this becomes easier everywhere.',
      { box: 'What you can do', text: 'Keep a box for old devices and batteries. Take them to an electronics recycling depot, not the garbage.' },
      'In conclusion, our devices are not really garbage. They are full of treasure and risk. If we fix first and recycle last, we protect people and the planet and save money too. Next time a screen cracks, ask: can this be <b>repaired</b>?'
    ],
    guide: { before: 'Look for old devices or batteries at home. Teach <b>electronic waste</b> and <b>repaired</b>. Point out that this is an opinion essay: watch for the writer’s reasons.',
      after: 'Find your nearest electronics recycling depot. Ask: do you agree with the writer? What is your strongest reason?' },
    words: [['electronic waste', 'old or broken devices such as phones, computers and batteries'], ['repaired', 'fixed so it works again']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'What makes this text an opinion essay?',
        opts: ['The writer states a belief and gives reasons.', 'It tells a made-up story.', 'It gives a recipe.'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What happens right after a device is taken apart?',
        opts: ['Metals and plastics are sorted.', 'It is thrown out.', 'It is sold again.'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Fill in the writer’s three reasons.', cols: ['Reason', 'One detail that supports it'],
        rows: [[null, null], [null, null], [null, null]],
        a: [['Devices hold valuable materials.', 'A phone holds gold, silver and copper.'], ['E-waste is dangerous.', 'Lead and mercury can leak into soil and water.'], ['Fixing is better than replacing.', 'A new battery can give a phone years more life.']] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The writer mentions people who say repairs cost too much. Why include the other side?',
        a: 'To show the writer has thought about it and to answer it, which makes the argument stronger.', look: 'answers the other side; stronger argument' },
      { k: 'choice', code: 'A2.3', q: 'Which question would best help you check the writer’s claim that “many repairs are cheaper than buying new”?',
        opts: ['How much does a repair cost compared with a new device?', 'What colour is the phone?', 'Who invented phones?', 'How old is the writer?'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Why does “right to repair” have quotation marks?',
        opts: ['It is a special phrase people use.', 'It is a title of a book.', 'Someone is shouting.', 'It is a question.'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 2, q: 'Did the writer persuade you? Which reason was strongest for you, and why?',
        a: 'Yes. The safety reason, because I did not know children burn e-waste and breathe toxic smoke.', look: 'opinion and a reason' }
    ]
  });

  P.add({
    id: 'g6-ash-borer', subject: 'science', form: 'Report',
    title: 'A Small Green Invader',
    deck: 'How a beetle the size of a grain of rice killed millions of trees',
    hero: {
      photo: 'g6-emerald-ash-borer.jpg', credit: 'Photo: ShenandoahNPS, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'An emerald ash borer. The adult beetle is about as long as a grain of rice.'
    },
    body: [
      'In 2002, people in Windsor, Ontario, and Detroit, Michigan, noticed that their ash trees were dying. The leaves at the tops thinned out. Long cracks opened in the bark. Within a few years, whole streets of trees were dead. The cause was a shiny green beetle that no one in North America had ever seen before: the emerald ash borer.',
      { fig: G.flow(['Adult lays eggs in cracks in the bark.', 'Larvae tunnel just under the bark.', 'Tunnels cut off the tree’s water and food.', 'New adults chew out of D-shaped holes.'], { top: 2, bh: 26, gap: 12, hl: 2 }),
        tall: 146, cap: 'The life cycle of the emerald ash borer, and how it kills a tree.' },
      { h: 'A stowaway from Asia' },
      'The emerald ash borer is native to eastern Asia. Scientists think it arrived hidden in wooden packing crates on cargo ships. In Asia, ash trees have defences against it, and birds, wasps and diseases keep it in check. In North America, none of those controls existed. It was an <b>invasive species</b> with nothing to stop it.',
      { h: 'How it kills' },
      'The adult beetle does little harm. The danger is its <b>larvae</b>, the young that hatch from its eggs. They tunnel through the thin layer just under the bark, eating as they go. This layer carries water up from the roots and food down from the leaves. When enough tunnels cross it, the tree starves. Most infested trees die within a few years.',
      'The beetle can fly only a few kilometres on its own. People spread it much farther by moving firewood from place to place. Today, it has killed hundreds of millions of ash trees across North America.',
      { box: 'Buy it where you burn it', text: 'Moving firewood can carry hidden pests. Buy firewood near where you will use it.' },
      { h: 'More than trees' },
      'The loss reaches beyond forests. Ash trees shaded city streets and gave homes to birds and insects. For the Haudenosaunee, Anishinaabe and other Indigenous Peoples, black ash wood has been used for generations to weave baskets. Basket makers now worry that the trees, and the knowledge of how to use them, could disappear.',
      'People are fighting back. Some valuable trees are protected with an injection made from the seeds of the neem tree, developed in part by Canadian scientists. Researchers have released tiny wasps from Asia that attack the beetle’s eggs and larvae. Seed banks are saving ash seeds so that forests can be <b>replanted</b> one day.'
    ],
    guide: { before: 'Find Windsor, Ontario, on a map. Look for ash trees in your neighbourhood if you can. Teach <b>invasive species</b>, <b>larvae</b> and <b>replanted</b>.',
      after: 'Ask: why did the beetle spread so quickly in North America but not in Asia? Talk about how moving firewood can spread pests.' },
    words: [['invasive species', 'a living thing from somewhere else that spreads and causes harm'], ['larvae', 'the young of some insects, which look like worms'], ['replanted', 'planted again']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the stages in order.',
        items: ['Adult lays eggs in the bark.', 'Larvae tunnel under the bark.', 'Tunnels cut off the tree’s water.', 'New adults chew out of the tree.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Larvae</b> are …',
        opts: ['the young of some insects', 'kinds of trees', 'adult beetles'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'How do people spread the beetle?',
        opts: ['by moving firewood', 'by planting ash', 'by watering trees'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why does the beetle cause much more harm in North America than in Asia?',
        a: 'In Asia, ash trees have defences, and birds, wasps and diseases control it. In North America, nothing stopped it.', look: 'controls in Asia; none here' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why do Indigenous basket makers worry about the emerald ash borer?',
        a: 'They use black ash to weave baskets, so if the trees die, the tradition and knowledge could be lost.', look: 'baskets; tradition could be lost' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart.', cols: ['Way people fight back', 'How it helps'],
        rows: [['Injection from neem seeds', null], ['Tiny wasps from Asia', null], ['Seed banks', null]],
        a: [[null, 'Protects valuable trees.'], [null, 'Attack the beetle’s eggs and larvae.'], [null, 'Save seeds so forests can be replanted.']] },
      { k: 'lines', code: 'A2.6', n: 2, q: 'Write a short sign for a campground that would persuade people not to bring firewood from home.',
        a: 'Stop the bug! Buy firewood here: wood from home can hide beetles that kill trees.', look: 'short, clear, gives a reason' }
    ]
  });

  P.add({
    id: 'g6-batteries', subject: 'science', form: 'Explanation',
    title: 'Power in Your Pocket',
    deck: 'How a battery turns chemicals into electricity',
    hero: {
      photo: 'g6-batteries.jpg', credit: 'Photo: Multicherry, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'AA batteries. Each one stores chemical energy until it is placed in a circuit.'
    },
    body: [
      'Flashlights, remote controls, phones, watches and toys all run on batteries. A battery is a small, portable store of energy. But it does not hold electricity the way a bottle holds water. Instead, it holds chemicals that can make electricity when the battery is connected into a <b>circuit</b>.',
      { fig: '<rect class="k" x="20" y="50" width="70" height="34" rx="4"/><rect class="k" x="90" y="60" width="8" height="14"/>' + G.T(40, 72, '−', 'lb', 'middle') + G.T(76, 72, '+', 'lb', 'middle') +
          '<path class="k" d="M98 67 H191 M209 67 H240 V130 H10 V67 H20"/>' + G.bulb(200, 67) + G.T(200, 52, 'bulb', 'l', 'middle') +
          D.arrow(80, 130, 120, 130, 'a') + G.T(100, 146, 'electrons flow', 'n', 'middle') + G.T(55, 44, 'battery', 'l', 'middle'),
        tall: 150, cap: 'A simple circuit. Electrons leave the negative end, pass through the bulb and return to the positive end.' },
      { h: 'A pile of metal' },
      'In 1800, an Italian scientist named Alessandro Volta built the first battery. He stacked discs of zinc and copper, separated by pieces of cardboard soaked in salt water. When he touched wires to the top and bottom of the pile, he felt a small shock. Chemical reactions between the metals and the salt water were pushing electrons through the wire. The unit of electrical push, the volt, is named after him.',
      { h: 'How a battery works' },
      'Every battery has two ends, called terminals: a negative end, marked with a minus sign, and a positive end, marked with a plus sign. Inside, chemicals react and build up extra electrons at the negative end. When a wire connects the two ends through a bulb or a motor, the electrons flow through the wire toward the positive end. Along the way, they do work: lighting the bulb or turning the motor. The battery has changed <b>chemical energy</b> into electrical energy.',
      'As the chemicals are used up, the battery runs down. In a rechargeable battery, electricity from a charger pushes the reaction backward, storing energy again. The batteries in phones and electric cars can be recharged hundreds of times.',
      { box: 'Try it', text: 'Push a copper coin and a galvanized nail into a lemon. Connect several lemons with wires and you can light a tiny LED.' },
      { h: 'Using batteries wisely' },
      'Batteries contain metals and chemicals that can harm soil and water, and some can start fires if they are crushed. Never throw them in the garbage. Take them to a battery drop-off box, often found at hardware stores and libraries, so their materials can be <b>recovered</b> and used again.'
    ],
    guide: { before: 'Look at a battery and find the + and − ends. Teach <b>circuit</b>, <b>chemical energy</b> and <b>recovered</b>.',
      after: 'Try the lemon battery if you can. Count the battery-powered things in your home.' },
    words: [['circuit', 'a complete path that electricity flows around'], ['chemical energy', 'energy stored in substances, released when they react'], ['recovered', 'taken back to be used again']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where do electrons leave the battery?',
        opts: ['the negative end', 'the positive end', 'the bulb'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>circuit</b> is …',
        opts: ['a complete path for electricity', 'a kind of battery', 'a metal disc'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain what happens when a wire connects the two ends of a battery through a bulb.',
        a: 'Electrons flow from the negative end through the wire and the bulb to the positive end, and the bulb lights.', look: 'flow from − to +, bulb lights' },
      { k: 'choice', code: 'C3.3', q: 'What energy change happens in a battery?',
        opts: ['chemical energy to electrical energy', 'heat to sound', 'light to chemical', 'sound to light'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict: what would happen to the bulb if you cut the wire? Why?',
        a: 'The bulb would go out, because the circuit would not be complete and electrons could not flow.', look: 'goes out; path broken' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is compound: two complete ideas joined by <i>and</i>?',
        opts: ['As the chemicals are used up, the battery runs down.', 'He felt a small shock.', 'Batteries contain metals and chemicals that can harm soil and water, and some can start fires if they are crushed.', 'Never throw them in the garbage.'], a: 2 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Name a device you use that runs on a battery. Is it rechargeable? How do you know?',
        a: 'My tablet. Yes, because I plug it into a charger at night.', look: 'device and evidence' }
    ]
  });

  P.add({
    id: 'g6-geese', subject: 'science', form: 'Explanation',
    title: 'Why Geese Fly in a V',
    deck: 'How a flock shares the work of flying',
    hero: {
      photo: 'g6-geese-v.jpg', credit: 'Photo: John Benson, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Canada geese flying in a V. Each bird flies slightly behind and to the side of the one ahead.'
    },
    body: [
      'Every spring and fall, you may hear honking high overhead and look up to see a long, wavering V of Canada geese. They are migrating, flying hundreds or even thousands of kilometres between their nesting grounds and the places where they spend the winter. Why do they fly in that shape?',
      { fig: [[150, 26], [120, 50], [180, 50], [90, 74], [210, 74], [60, 98], [240, 98]].map(function (p, i) {
            return '<path class="' + (i === 0 ? 'a' : 'k') + '" d="M' + (p[0] - 14) + ' ' + (p[1] + 4) + ' L' + p[0] + ' ' + (p[1] - 6) + ' L' + (p[0] + 14) + ' ' + (p[1] + 4) + ' L' + p[0] + ' ' + p[1] + ' Z"/>'; }).join('') +
          '<path class="d" d="M136 30 Q128 40 120 42 M164 30 Q172 40 180 42"/>' + G.T(150, 10, 'leader', 'l', 'middle') +
          G.T(54, 40, 'rising air', 'n', 'end') + D.arrow(56, 36, 110, 44, 't') + G.T(150, 126, 'direction of flight ↑', 'n', 'middle'),
        tall: 132, cap: 'Behind each wingtip, air swirls upward. The bird behind rides on that rising air.' },
      { h: 'Riding the swirl' },
      'When a bird flaps its wings, it pushes air down. That creates lift and holds the bird up. But at the tip of each wing, some air swirls around and rises upward just behind and beside the bird. A goose flying in the right spot behind another can catch that rising air, called <b>upwash</b>. The upwash gives it a little free lift, so it needs to flap less hard.',
      'Scientists have tested this idea. When they fitted birds with tiny tracking devices, they found that the birds placed themselves exactly where the rising air was strongest. They even timed their wing beats to match the bird in front, like rowers pulling oars together. Flying this way can save a lot of energy on a long journey.',
      'Young geese learn the routes by flying with their parents. A family stays together through its first migration, stopping at the same lakes and fields to rest and feed. By the time a young goose is grown, it knows the way and can lead others.',
      { h: 'Taking turns' },
      'The bird at the front of the V has the hardest job, because there is no rising air in front of it to help. So geese take turns. When the leader tires, it drops back into the line, and another goose moves up to take its place. In this way, the work is shared across the whole flock. The V also lets each bird see the others clearly, which helps them stay together and avoid collisions.',
      { box: 'Honking', text: 'Scientists think geese honk in flight to stay in contact and to keep the flock together.' },
      { h: 'Learning from birds' },
      'Engineers have studied geese to save fuel. In tests, airplanes flying in a careful V-shape, one behind and to the side of another, have used less fuel. Cyclists in a race do something similar, taking turns at the front of a group. Nature often finds clever ways to work together, and people can <b>imitate</b> them. Teamwork, it turns out, is good <b>physics</b> too.'
    ],
    guide: { before: 'Ask: have you ever seen geese flying in a V? Teach <b>upwash</b>, <b>imitate</b> and <b>physics</b> (the science of forces and motion).',
      after: 'Watch a flock in the fall if you can. Talk about other places where people take turns to share hard work.' },
    words: [['upwash', 'air that swirls upward behind a bird’s wingtip'], ['imitate', 'to copy'], ['physics', 'the science of forces, energy and motion']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where does each goose fly?',
        opts: ['behind and to the side of the one ahead', 'directly behind the leader', 'in front of the leader'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>imitate</b> is to …',
        opts: ['copy', 'fly', 'honk'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how flying in a V saves energy for geese.',
        a: 'Air swirls upward behind each wingtip. A goose behind rides on that rising air, so it does not have to flap as hard.', look: 'rising air; less flapping' },
      { k: 'lines', code: 'C3.3', n: 2, q: 'Why do geese take turns at the front?',
        a: 'The leader works hardest because it has no rising air to help, so taking turns shares the work.', look: 'leader works hardest; share' },
      { k: 'choice', code: 'C1.5', q: 'The author compares geese timing their wing beats to …',
        opts: ['rowers pulling oars together', 'cars on a highway', 'a clock ticking', 'children on a slide'], a: 0 },
      { k: 'choice', code: 'B3.2', q: 'In “Engineers have studied geese,” what is the verb?',
        opts: ['have studied', 'Engineers', 'geese', 'studied geese'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What does the author mean by “Teamwork … is good physics too”?',
        a: 'Working together, like geese in a V, uses the laws of air and motion to save energy.', look: 'teamwork uses science to save energy' }
    ]
  });

  P.add({
    id: 'g6-curiosity', subject: 'science', form: 'Report',
    title: 'A Robot Geologist on Mars',
    deck: 'How the Curiosity rover landed, and what it found',
    hero: {
      photo: 'g6-curiosity.jpg', credit: 'Photo: semeion.photo, Public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'The Curiosity rover on Mars, in a self-portrait made from many photos taken by its robotic arm.'
    },
    body: [
      'On August 6, 2012, scientists at NASA held their breath. A robot the size of a small car was plunging through the thin air of Mars at more than 20&nbsp;000 kilometres an hour. Radio signals take several minutes to travel between Mars and Earth, so no one could steer it. Everything had to happen on its own, in about seven minutes.',
      { fig: G.flow(['A heat shield slows the capsule in the air.', 'A huge parachute opens.', 'Rockets slow the descent.', 'A “sky crane” lowers the rover on cables.'], { top: 2, bh: 26, gap: 12, hl: 3 }),
        tall: 146, cap: 'The landing steps, from the top of the Martian atmosphere to the ground.' },
      { h: 'Seven minutes' },
      'First, a heat shield took the blazing heat of entering the atmosphere. Then a parachute burst open. Next, rockets fired to slow the fall. Finally, a rocket-powered “sky crane” hovered above the ground and lowered the rover gently on cables. When the message “touchdown confirmed” reached Earth, the control room erupted in cheers. Curiosity was safe in Gale Crater.',
      { h: 'A laboratory on wheels' },
      'Curiosity is a <b>rover</b>: a robot vehicle that drives across another world. It has six wheels, 17 cameras, a robotic arm with a drill and a laser that can zap rocks to study what they are made of. Instead of solar panels, it is powered by heat from a small nuclear power source, so it can work through dusty seasons. One of its tools, a spectrometer that measures the chemicals in rocks, was built in Canada.',
      { h: 'Clues to the past' },
      'Mars today is cold and dry. But Curiosity found rounded pebbles like those in a riverbed, and layers of mud that formed at the bottom of an ancient lake. It drilled into rocks and found the <b>elements</b> that living things need, such as carbon, nitrogen and oxygen. Billions of years ago, Gale Crater could have been a place where tiny life might have survived. Curiosity has not found life, but it showed that Mars was once more like Earth.',
      { box: 'Still rolling', text: 'Curiosity was built to work for two years. More than a decade later, it is still exploring.' },
      'The rover has climbed partway up a mountain in the middle of the crater, reading the mountain’s rock layers like the pages of a history book. Each layer tells scientists more about how Mars changed from a wetter world to the dusty planet we see today.'
    ],
    guide: { before: 'Find Mars in a picture of the solar system. Teach <b>rover</b> and <b>elements</b>, and the word geologist (a scientist who studies rocks).',
      after: 'Ask: why couldn’t scientists steer Curiosity during landing? Look at real photos from Curiosity on NASA’s website.' },
    words: [['rover', 'a robot vehicle that drives across another world'], ['elements', 'the basic substances that everything is made of, such as carbon and oxygen']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the landing steps.',
        items: ['A heat shield slows the capsule.', 'A parachute opens.', 'Rockets slow the descent.', 'A sky crane lowers the rover.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why could no one steer Curiosity during landing?',
        opts: ['Signals take minutes to reach Mars.', 'It had no wheels.', 'It was too dark.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>rover</b> is …',
        opts: ['a robot vehicle on another world', 'a kind of rocket', 'a crater'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What evidence shows that Mars once had water? Give two details.',
        a: 'Rounded pebbles like those in a riverbed, and layers of mud from an ancient lake.', look: 'pebbles; lake mud' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The rover reads rock layers “like the pages of a history book.” What does this comparison mean?',
        a: 'Each layer shows a different time in the past, so reading them in order tells the story of Mars.', look: 'layers show time, in order' },
      { k: 'choice', code: 'C1.1', q: 'In “so it can work through dusty seasons,” what does “it” refer to?',
        opts: ['Curiosity', 'the nuclear power source', 'Canada', 'the laser'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 2, q: 'Which helped you most to picture the landing: the diagram or the paragraph? Why?',
        a: 'The diagram, because it shows each step in a box in order.', look: 'a choice and a reason' }
    ]
  });

  P.add({
    id: 'g6-tomatosphere', subject: 'science', form: 'Report',
    title: 'Seeds from Space',
    deck: 'How Canadian students tested seeds that travelled to space',
    hero: {
      photo: 'g6-tomato-seedlings.jpg', credit: 'Photo: Dwight Sipler from Stow, MA, USA, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'Tomato seedlings. Students compare how many seeds sprout, and how quickly.'
    },
    body: [
      'One day, astronauts travelling to Mars will need to grow their own food. A trip there and back could take more than two years, far too long to carry every meal. But would seeds still grow after a long journey through space? Since 2001, Canadian students have helped scientists find out.',
      { fig: G.T(4, 10, 'One class’s results: seeds that sprouted (out of 50)', 'n') +
          G.bars([['Packet A', 41, '41'], ['Packet B', 39, '39']], 50, { x0: 72, top: 24, gap: 32, pad: 30 }) +
          G.T(4, 102, 'Later, they learned which packet went to space.', 'l'),
        tall: 108, cap: 'An example of results from one class. The two packets grew about the same.' },
      { h: 'A blind test' },
      'In a program called Tomatosphere, classes across Canada receive two packets of tomato seeds, labelled only with letters. One packet has travelled to space, or has been kept in conditions like those in space. The other has stayed on Earth. The students do not know which is which. This is called a <b>blind test</b>. It keeps their expectations from affecting the results, even by accident.',
      { h: 'Running the experiment' },
      'Students plant the seeds in trays of soil and keep both trays in the same place, with the same light, water and temperature. Every day, they check and count how many seeds have <b>germinated</b>, or sprouted. They record their data in a table. After a few weeks, they send their results to the scientists, who combine data from thousands of classrooms.',
      'Students also measure how tall the seedlings grow and notice whether the leaves look healthy. Some classes take photos every day to compare the trays. Careful records matter: if a student forgets to water one tray, the test is no longer fair, and the results cannot be trusted.',
      'Only then are the students told which packet went to space. Some classes find that the space seeds sprouted a little faster. Others find the opposite. When thousands of results are combined, the differences mostly disappear: the seeds from space grow about as well as seeds from Earth.',
      { box: 'Why so many classes?', text: 'One class might get unusual results by chance. Data from thousands of classes gives a much more reliable answer.' },
      { h: 'Real science' },
      'The program teaches the same steps that real scientists use: ask a question, make a prediction, run a fair test, collect data, and share the results. More than three million Canadian students have taken part. Their careful counting has helped plan how future astronauts might farm on the Moon or Mars. Not bad for a few packets of tomato seeds and a sunny classroom window.'
    ],
    guide: { before: 'If possible, sprout a few seeds in a damp paper towel. Teach <b>germinated</b> and <b>blind test</b>.',
      after: 'Ask: why did the students not know which packet went to space? Plan a small fair test of your own with seeds.' },
    words: [['blind test', 'a test where people do not know which item is which'], ['germinated', 'began to sprout and grow']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. How many seeds from packet A sprouted?',
        opts: ['41', '39', '50'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A seed that has <b>germinated</b> has …',
        opts: ['sprouted', 'gone to space', 'dried up'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why don’t students know which packet went to space?',
        a: 'It is a blind test, so their expectations cannot affect how they treat the seeds or count them.', look: 'blind test; expectations' },
      { k: 'order', code: 'C1.3', q: 'Number the steps of the experiment in order.',
        items: ['Plant both packets in trays.', 'Count the sprouts every day.', 'Send the results to scientists.', 'Learn which packet went to space.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do scientists combine data from thousands of classes instead of trusting one?',
        a: 'One class might get unusual results by chance; many results together give a more reliable answer.', look: 'chance; more reliable' },
      { k: 'choice', code: 'C2.2', q: 'Who would find this text most useful?',
        opts: ['a class planning a seed experiment', 'someone buying a car', 'a person learning to swim', 'a chef baking bread'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 2, q: 'What did this passage teach you about how scientists make sure results are fair?',
        a: 'They keep everything the same, use blind tests and collect lots of data.', look: 'fair test ideas' }
    ]
  });

  P.add({
    id: 'g6-dinosaur-park', subject: 'science', form: 'Report',
    title: 'Where Dinosaurs Lie',
    deck: 'Alberta’s badlands, and how bones become fossils',
    hero: {
      photo: 'g6-dinosaur-park.jpg', credit: 'Photo: Hirgax, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The badlands of Dinosaur Provincial Park, Alberta. Rain and wind keep uncovering fossils in the soft rock.'
    },
    body: [
      'In southeastern Alberta, the flat prairie suddenly drops away into a maze of bare, striped hills and deep gullies. These are the badlands of Dinosaur Provincial Park. Hardly anything grows on the steep slopes. Yet this dry, rocky place holds one of the richest collections of dinosaur <b>fossils</b> in the world.',
      { fig: G.flow(['A dinosaur dies near a river.', 'Mud and sand quickly bury the bones.', ['Over millions of years, minerals', 'slowly replace the bone.']], { top: 2, bh: 30, gap: 12, hl: 2 }) +
          G.flow(['Erosion uncovers the fossil.'], { top: 128, bh: 26 }),
        tall: 156, cap: 'How a bone becomes a fossil. Only a tiny fraction of animals are ever preserved.' },
      { h: 'A warm, green world' },
      'About 76 million years ago, this land looked nothing like it does today. It was a warm, swampy coastal plain beside a shallow sea that stretched across the middle of North America. Rivers wound through forests of ferns and tall trees. Duck-billed dinosaurs grazed in herds, horned dinosaurs browsed the plants, and fierce tyrannosaurs hunted them. Turtles, crocodiles, fish and small mammals lived there too. It was an area of great <b>biodiversity</b>.',
      { h: 'From bone to stone' },
      'When animals died near the rivers, floods sometimes buried their bodies quickly in mud and sand. Over millions of years, more layers piled on top and pressed the mud into rock. Water seeping through the ground carried minerals into the bones, which slowly hardened into stone. That is a fossil: the remains or traces of a living thing, preserved in rock.',
      { h: 'Uncovered by ice and water' },
      'For a long time, the fossils were hidden deep underground. Then, at the end of the last ice age, about 13&nbsp;000 years ago, rushing meltwater from melting glaciers carved deep valleys into the soft rock. Rain, wind and frost still wear the hills away a little each year. This <b>erosion</b> keeps exposing new bones, so scientists return every summer to search.',
      { box: 'World Heritage', text: 'Fossils of more than 50 kinds of dinosaurs have been found in the park. It became a UNESCO World Heritage Site in 1979.' },
      'Hundreds of skeletons from the park are now in museums around the world, including the Royal Tyrrell Museum in nearby Drumheller. Each new find helps scientists understand how ancient ecosystems worked, and how life on Earth has changed over time. Visitors are welcome to look, but collecting fossils without permission is against the law.'
    ],
    guide: { before: 'Find Drumheller and Brooks, Alberta, on a map. Teach <b>fossils</b>, <b>biodiversity</b> and <b>erosion</b>.',
      after: 'Make a quick “fossil” by pressing a shell or leaf into clay. Ask: why are fossils so rare?' },
    words: [['fossils', 'remains or traces of ancient living things, preserved in rock'], ['biodiversity', 'the variety of living things in a place'], ['erosion', 'the slow wearing away of rock and soil by water, wind or ice']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the steps from dinosaur to fossil.',
        items: ['A dinosaur dies near a river.', 'Mud and sand bury the bones.', 'Minerals replace the bone.', 'Erosion uncovers the fossil.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Erosion</b> is …',
        opts: ['the wearing away of rock', 'a kind of dinosaur', 'a museum'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'What carved the valleys of the badlands?',
        opts: ['meltwater from glaciers', 'dinosaurs', 'farmers'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Compare the land then and now.', cols: ['Feature', '76 million years ago', 'Today'],
        rows: [['Climate', null, null], ['Plants', null, null]],
        a: [[null, 'warm and swampy', 'dry'], [null, 'ferns and tall trees', 'hardly anything on the slopes']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do scientists return to the park every summer?',
        a: 'Erosion keeps wearing the hills away and exposing new bones, so there are new fossils to find each year.', look: 'erosion exposes new fossils' },
      { k: 'choice', code: 'C1.3', q: 'How is the section “From bone to stone” organized?',
        opts: ['as a sequence of steps', 'as a comparison of two animals', 'as a problem and solution', 'as a list of museums'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Have you seen a fossil or a dinosaur skeleton? What did it help you understand?',
        a: 'At the museum I saw a huge skeleton, and it showed me how big dinosaurs really were.', look: 'an experience and what it showed' }
    ]
  });

  P.add({
    id: 'g6-malala', subject: 'social', form: 'Biography',
    title: 'One Girl, One Pen',
    deck: 'Malala Yousafzai and the right of every girl to go to school',
    hero: {
      photo: 'g6-malala.jpg', credit: 'Photo: DFID - UK Department for International Development, CC BY 2.0, Wikimedia Commons', focus: '50% 30%',
      tall: 220,
      cap: 'Malala Yousafzai in 2015. She was made an honorary Canadian citizen in 2017.'
    },
    body: [
      'Malala Yousafzai grew up in the Swat Valley of Pakistan, a green region of mountains and rivers. Her father ran a school, and Malala loved learning. But when she was 11 years old, an armed group called the Taliban took control of the valley. They began closing and destroying schools for girls.',
      { fig: G.time([['1997', 'Born in the Swat Valley, Pakistan'], ['2009', 'Writes an online diary about school'], ['2012', 'Attacked on her school bus'], ['2014', 'Nobel Peace Prize, at age 17'], ['2017', 'Honorary Canadian citizen']], { x: 50, top: 12, gap: 26, hl: 3 }),
        tall: 124, cap: 'Key moments in Malala’s life.' },
      { h: 'Speaking up' },
      'Malala refused to stay silent. Using a pen name to stay safe, she wrote an online diary describing what it was like to be a girl who might lose the chance to learn. Later, she spoke on television and in interviews, saying that girls had a <b>right</b> to education. Her voice became known across Pakistan.',
      'This made her a target. In October 2012, when she was 15, a gunman stopped her school bus and shot her. She was badly hurt and flown to a hospital in England. Many people feared she would not survive.',
      'Messages of support poured in from around the world. Children sent cards. Leaders spoke out against the attack. In Pakistan, people marched in the streets carrying signs with her name. After months of operations and therapy, Malala slowly learned to walk and speak clearly again.',
      { h: 'A louder voice' },
      'Malala recovered. Instead of making her quiet, the attack made her voice heard around the world. On her 16th birthday, she spoke at the United Nations. “One child, one teacher, one book and one pen can change the world,” she said. With her father, she started a fund that supports girls’ education in many countries.',
      'In 2014, at age 17, she became the youngest person ever to win the Nobel Peace Prize. In 2017, Canada made her an honorary citizen, and she spoke to Parliament in Ottawa.',
      { box: 'Still a problem', text: 'Around the world, millions of girls are still out of school because of poverty, war or rules that keep them home.' },
      { h: 'Why it matters' },
      'When girls go to school, they usually earn more as adults, stay healthier and raise healthier children. Whole communities benefit. That is why the United Nations lists education as a human right for every child. Malala’s story shows that one young person can help <b>advocate</b> for change, speaking up for others who cannot always speak for themselves.'
    ],
    guide: { before: 'Find Pakistan on a map. Teach <b>right</b> (something every person should have), <b>advocate</b> and the word honorary.',
      after: 'Ask: what does Malala’s quote mean to you? Talk about why education is a right, not a privilege.' },
    words: [['right', 'something every person should be able to have or do'], ['advocate', 'to speak up publicly for a cause or for others']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. How old was Malala when she won the Nobel Peace Prize?',
        opts: ['17', '15', '11'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>advocate</b> is to …',
        opts: ['speak up for a cause', 'stay silent', 'travel far'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did Malala use a pen name for her diary?',
        a: 'To stay safe, because speaking up for girls’ education was dangerous where the Taliban had control.', look: 'safety; danger' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Explain Malala’s words: “One child, one teacher, one book and one pen can change the world.”',
        a: 'Education is powerful; even one person who learns can make a big difference.', look: 'education and one person’s power' },
      { k: 'choice', code: 'C3.3', q: 'According to the text, how do communities benefit when girls go to school?',
        opts: ['Girls earn more and families are healthier.', 'Schools close sooner.', 'Fewer teachers are needed.', 'Books become cheaper.'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Why are quotation marks used around Malala’s words at the UN?',
        opts: ['They show her exact words.', 'They show a title.', 'They show a list.', 'They show a question.'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What is one thing you could speak up about at your school or in your community?',
        a: 'More books in our library in different languages.', look: 'a cause' }
    ]
  });

  P.add({
    id: 'g6-lemon-creek', subject: 'history', form: 'Report',
    title: 'Taken from the Coast',
    deck: 'Japanese Canadians in the Second World War, and the long road to an apology',
    hero: {
      photo: 'g6-lemon-creek.jpg', credit: 'Photo: Unknown, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The Lemon Creek internment camp in the interior of British Columbia, where Japanese Canadian families were sent.'
    },
    body: [
      'In 1941, about 22&nbsp;000 people of Japanese ancestry lived in British Columbia, most of them along the coast. They ran fishing boats, farms and shops. Most were born in Canada or had become Canadian citizens. Then, on December 7, 1941, Japan attacked the United States at Pearl Harbor, and Canada went to war with Japan. Within weeks, their lives were turned upside down.',
      { fig: G.time([['1941', 'Japan attacks Pearl Harbor'], ['1942', 'Families removed from the coast'], ['1943', 'Their property is sold'], ['1949', 'Right to vote; may return to coast'], ['1988', 'Apology and redress']], { x: 50, top: 12, gap: 26, hl: 1 }),
        tall: 124, cap: 'The removal of Japanese Canadians, and the redress that came decades later.' },
      { h: 'Forced to leave' },
      'The Canadian government said, without evidence, that Japanese Canadians might help the enemy. In 1942, it ordered all of them to leave the coast. Fishing boats were taken away. Families were given little warning and could bring only what they could carry. Many were first held in barns at a fairground in Vancouver. Then they were sent to crowded camps in remote mountain towns, or to work on sugar beet farms on the Prairies.',
      'The camps were not prisons with walls, but people could not leave. Some families lived in tents or in thin wooden shacks through cold mountain winters. Fathers were often separated from their families. No Japanese Canadian was ever charged with helping the enemy.',
      { h: 'Losing everything' },
      'In 1943, the government sold the homes, farms, boats and belongings that families had left behind, without their permission. The money was used to pay for the camps. After the war ended, Japanese Canadians were told to move east of the Rocky Mountains or go to Japan, a country many had never seen. Only in 1949 were they allowed to vote and to return to the coast.',
      { box: 'A child in the camps', text: 'Raymond Moriyama was a boy in the camps. He grew up to be a famous architect who designed the Ontario Science Centre.' },
      { h: 'Redress' },
      'Japanese Canadians spent decades asking the government to admit that it had done wrong. In 1988, Prime Minister Brian Mulroney made a formal apology in the House of Commons. The government also offered <b>redress</b>: money for each survivor and funds for the community. The story is now taught as a warning about what can happen when fear and <b>prejudice</b> take away people’s rights.'
    ],
    guide: { before: 'Find Vancouver and the interior of British Columbia on a map. Teach <b>prejudice</b> and <b>redress</b>. This is a hard history; read it calmly.',
      after: 'Ask: why do you think it took so long for the government to apologize? How can people stand up against prejudice today?' },
    words: [['prejudice', 'an unfair opinion about people formed without knowing them, often because of their race'], ['redress', 'making up for a wrong, often with an apology and payment']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When were Japanese Canadians allowed to vote?',
        opts: ['1949', '1942', '1988'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Redress</b> means …',
        opts: ['making up for a wrong', 'getting dressed again', 'moving to the coast'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Give two examples of how Japanese Canadians were treated unfairly.',
        a: 'They were forced to leave the coast and live in camps, and their homes and boats were sold without permission.', look: 'two examples' },
      { k: 'choice', code: 'C3.2', q: 'Why does the author include “No Japanese Canadian was ever charged with helping the enemy”?',
        opts: ['to show the government’s fears were not based on evidence', 'to describe the camps', 'to explain Pearl Harbor', 'to list jobs'], a: 0 },
      { k: 'table', code: 'C1.3', q: 'Fill in the cause and effect chart.', cols: ['Cause', 'Effect'],
        rows: [['Japan attacked Pearl Harbor.', null], [null, 'In 1988, the government apologized and offered redress.']],
        a: [[null, 'Japanese Canadians were ordered to leave the coast.'], ['Japanese Canadians asked for justice for decades.', null]] },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What warning does the author say this story gives?',
        a: 'Fear and prejudice can take away people’s rights.', look: 'fear, prejudice, rights' },
      { k: 'lines', code: 'C3.8', n: 2, q: 'How has this text changed what you think about how Canada treated people during wars?',
        a: 'I thought Canada always treated people fairly, but this shows citizens lost their rights because of fear.', look: 'a change in thinking' }
    ]
  });

  P.add({
    id: 'g6-birchtown', subject: 'history', form: 'Report',
    title: 'The Promise of Birchtown',
    deck: 'Black Loyalists who came to Nova Scotia looking for freedom and land',
    hero: {
      photo: 'g6-birchtown.jpg', credit: 'Photo: Madereugeneandrew, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A heritage trail sign at Birchtown, Nova Scotia, once the largest free Black community in North America.'
    },
    body: [
      'In 1783, the American Revolution ended. The thirteen colonies had won independence from Britain. Among the thousands of people who left the new United States were about 3&nbsp;000 Black <b>Loyalists</b>. Many had escaped slavery and fought for the British, who had promised them freedom and land in return. Now British ships carried them north to Nova Scotia.',
      { fig: '<path class="k" d="M20 20 H120 V110 H20 Z"/>' + G.T(70, 60, 'New York', 'lb', 'middle') + G.T(70, 76, '1783', 'n', 'middle') +
          D.arrow(124, 64, 176, 64, 'a') + '<path class="k" d="M180 20 H280 V110 H180 Z"/>' + G.T(230, 52, 'Birchtown,', 'lb', 'middle') + G.T(230, 68, 'Nova Scotia', 'lb', 'middle') + G.T(230, 84, '1783–1784', 'n', 'middle') +
          D.arrow(230, 114, 230, 136, 'a') + G.T(230, 150, 'Some leave for Sierra Leone, 1792', 'l', 'middle'),
        tall: 156, cap: 'The Black Loyalists’ journeys.' },
      { h: 'A hard beginning' },
      'About 1&nbsp;500 Black Loyalists settled at Birchtown, near the town of Shelburne. For a short time, it was the largest community of free Black people in North America. But the promise of land was only partly kept. White Loyalists received their land first, and the best of it. Many Black families waited years for land, received small, rocky lots, or got none at all.',
      'The first winter was brutal. Some families survived by building pit houses: holes dug into the ground and covered with a roof of logs and branches. To earn money, many worked for low wages in Shelburne, building roads and houses. In 1784, white soldiers angry about losing jobs attacked Black residents and destroyed their homes. It was one of the first race riots in North America.',
      { h: 'A new journey' },
      'Life stayed hard. In 1792, a Black Loyalist named Thomas Peters travelled to London to complain about the broken promises. As a result, nearly 1&nbsp;200 Black Loyalists left Nova Scotia on 15 ships for Sierra Leone, in West Africa. There, they helped found the city of Freetown.',
      { box: 'A record of names', text: 'British officers kept a ledger listing each Black Loyalist who sailed from New York. Today, families use it to trace their ancestors.' },
      { h: 'Remembered' },
      'Others stayed in Nova Scotia, and their descendants still live there today. In 2015, the Black Loyalist Heritage Centre opened at Birchtown. Its museum tells the story of people who were promised freedom, faced <b>discrimination</b> and still built communities, churches and schools. Their <b>resilience</b> is an important part of Canada’s history.'
    ],
    guide: { before: 'Find New York, Nova Scotia and Sierra Leone on a map. Teach <b>Loyalists</b>, <b>discrimination</b> and <b>resilience</b>.',
      after: 'Ask: how were the promises to Black Loyalists broken? Why is it important to remember stories like this?' },
    words: [['Loyalists', 'people who stayed loyal to Britain during the American Revolution'], ['discrimination', 'unfair treatment of people because of who they are'], ['resilience', 'the strength to keep going after hard times']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Where did some Black Loyalists go in 1792?',
        opts: ['Sierra Leone', 'New York', 'London'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Resilience</b> is …',
        opts: ['the strength to keep going', 'a type of house', 'a ship'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Explain how the promise of land was broken.',
        a: 'White Loyalists got land first and the best of it; many Black families waited years, got rocky lots or none at all.', look: 'waited; poor land; none' },
      { k: 'lines', code: 'C3.3', n: 2, q: 'What was a pit house, and why did families build them?',
        a: 'A hole dug into the ground with a roof of logs and branches; they needed shelter to survive the first winter.', look: 'what it was and why' },
      { k: 'choice', code: 'C1.3', q: 'Which cause led to the 1792 journey to Sierra Leone?',
        opts: ['Thomas Peters complained in London about broken promises.', 'A storm destroyed Birchtown.', 'The museum opened.', 'Soldiers found gold.'], a: 0 },
      { k: 'choice', code: 'C2.2', q: 'Why might a Black Nova Scotian family visit the Heritage Centre?',
        opts: ['to learn about and trace their ancestors', 'to buy a ship', 'to fish', 'to see dinosaurs'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What does the author want readers to understand about the Black Loyalists?',
        a: 'They faced broken promises and discrimination but still built communities, and their story matters.', look: 'hardship and resilience' }
    ]
  });

  P.add({
    id: 'g6-nunavut', subject: 'social', form: 'Report',
    title: 'Our Land: Nunavut',
    deck: 'How Canada’s newest territory was created, and how it governs',
    hero: {
      photo: 'g6-nunavut-assembly.jpg', credit: 'Photo: ADialla, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The Legislative Assembly of Nunavut in Iqaluit, where the territory’s laws are made.'
    },
    body: [
      'On April 1, 1999, the map of Canada changed. A huge area of the Northwest Territories became a new territory called Nunavut, which means “our land” in Inuktitut. It was the first major change to Canada’s map since Newfoundland joined in 1949.',
      { fig: G.T(4, 10, 'Area in square kilometres', 'n') +
          G.bars([['Nunavut', 2093, '2 093 190'], ['Quebec', 1542, '1 542 056'], ['Ontario', 1076, '1 076 395']], 2093, { x0: 70, top: 22, gap: 28, pad: 66, hl: 0 }),
        tall: 104, cap: 'Nunavut is Canada’s largest province or territory, about one-fifth of the country.' },
      { h: 'A long negotiation' },
      'Inuit have lived in the Arctic for thousands of years. But for most of Canada’s history, decisions about their land were made in faraway capitals. Starting in the 1970s, Inuit leaders began <b>negotiating</b> with the Canadian government for the right to own and manage their land. After about 20 years of talks, they signed the Nunavut Land Claims Agreement in 1993. It gave Inuit ownership of a large part of the land and created the new territory six years later.',
      { h: 'A different kind of government' },
      'About 40&nbsp;000 people live in Nunavut, and most of them are Inuit. The capital is Iqaluit, on Baffin Island. Nunavut’s government works differently from most others in Canada. There are no political parties. Instead, members are elected as individuals and make decisions by <b>consensus</b>: they discuss an issue until most can agree, rather than voting along party lines. This reflects the Inuit tradition of working things out together.',
      'Meetings of the Legislative Assembly are held in Inuktitut, English and other languages, with interpreters so everyone can follow. Inside the building, the members sit in a circle rather than facing each other in two rows, as they do in Ottawa. The seats are covered in sealskin.',
      'Inuit knowledge and values, called Inuit Qaujimajatuqangit, guide the government’s work. These include respecting others, serving the community, making decisions through discussion, and caring for the land, animals and environment.',
      { box: 'Three languages', text: 'Nunavut’s official languages are Inuktut (Inuktitut and Inuinnaqtun), English and French.' },
      { h: 'Challenges and strengths' },
      'Nunavut faces real challenges. There are no roads linking most of its 25 communities, so food and supplies arrive by plane or by ship in summer, and prices are very high. Housing is scarce. But the territory also has a young, growing population, strong traditions and a government that speaks its people’s language. For many Inuit, Nunavut means having a real voice in their own future.'
    ],
    guide: { before: 'Find Nunavut, Iqaluit and Baffin Island on a map. Teach <b>negotiating</b> and <b>consensus</b>.',
      after: 'Try making a family decision by consensus. Ask: how is it different from voting?' },
    words: [['negotiating', 'discussing to reach an agreement'], ['consensus', 'agreement reached by most people after discussion']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Which is largest?',
        opts: ['Nunavut', 'Quebec', 'Ontario'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A decision by <b>consensus</b> is made …',
        opts: ['by discussing until most agree', 'by one leader alone', 'by flipping a coin'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How is Nunavut’s government different from most others in Canada?',
        a: 'There are no political parties; members make decisions by consensus after discussion.', look: 'no parties; consensus' },
      { k: 'order', code: 'C1.3', q: 'Number the events in order.',
        items: ['Inuit leaders begin negotiating.', 'The Land Claims Agreement is signed.', 'Nunavut becomes a territory.'], show: [2, 0, 1] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two Inuit values that guide Nunavut’s government.',
        a: 'Respecting others and caring for the land, animals and environment.', look: 'two values from the text' },
      { k: 'choice', code: 'C3.2', q: 'Why are prices so high in most Nunavut communities?',
        opts: ['Supplies must come by plane or ship.', 'There are too many stores.', 'People do not like shopping.', 'There are many roads.'], a: 0 },
      { k: 'lines', code: 'C1.1', n: 2, q: 'In the last sentence, what does “their own future” refer to? Explain.',
        a: 'The future of Inuit, because Nunavut lets them make decisions about their land and lives.', look: 'Inuit’s future' }
    ]
  });

  P.add({
    id: 'g6-kenojuak', subject: 'arts', form: 'Biography',
    title: 'The Artist of Kinngait',
    deck: 'Kenojuak Ashevak, the Inuit artist whose owl flew around the world',
    hero: {
      photo: 'g6-kenojuak.jpg', credit: 'Photo: Judith Eglington, CC BY 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Kenojuak Ashevak with some of her prints.'
    },
    body: [
      'Kenojuak Ashevak was born in 1927 in a camp on the south coast of Baffin Island. She grew up living on the land, travelling by dog team and sleeping in igloos in winter and sealskin tents in summer. Her grandmother taught her to sew and to work with sealskin. No one guessed that this girl would one day become one of Canada’s most famous artists.',
      { fig: G.flow(['The artist draws a design on paper.', 'A printmaker carves it into a flat stone.', 'Ink is rolled onto the raised parts.', 'Paper is pressed on, then peeled away.'], { top: 2, bh: 26, gap: 12, hl: 3 }),
        tall: 146, cap: 'How a stonecut print is made at Kinngait.' },
      { h: 'Drawing a new life' },
      'In the 1950s, Kenojuak spent three years in a hospital in Quebec City, far from home, being treated for tuberculosis. There she made beadwork and crafts to pass the time. When she returned north, she settled with her family in Kinngait, also called Cape Dorset. A new art co-operative there was experimenting with printmaking, and Kenojuak began to draw.',
      'Her drawings were bold and joyful. She drew birds, owls, fish, seals and people, often with long, flowing shapes that seemed to grow out of one another. She once said she did not try to show animals exactly as they looked. She wanted to make something beautiful.',
      { h: 'The Enchanted Owl' },
      'In 1960, Kenojuak created a print called The Enchanted Owl. It shows an owl with tail feathers that fan out in bright red and black, like a burst of flame. The print became famous across Canada and was later shown on a postage stamp. Copies have sold for many thousands of dollars.',
      { box: 'A co-operative', text: 'In a co-operative, members share the work and the profits. The Kinngait studio is owned by the community.' },
      { h: 'A lasting legacy' },
      'Kenojuak made thousands of drawings and hundreds of prints over more than 50 years. She designed a stained-glass window for a chapel in Oakville, Ontario, and her work hangs in galleries around the world. She received the Order of Canada, the country’s highest honour for its citizens.',
      'Kenojuak died in 2013, but her <b>legacy</b> lives on. Kinngait is now known as one of the most important centres of art in Canada, and new generations of Inuit artists, including members of her own family, continue to draw and make <b>prints</b>. Her work showed the world the beauty of Inuit life and imagination.'
    ],
    guide: { before: 'Find Baffin Island and Kinngait (Cape Dorset) on a map. Teach <b>prints</b>, <b>legacy</b> and co-operative. If you can, look at The Enchanted Owl online together.',
      after: 'Try a simple print: draw on a foam tray with a pencil, roll on paint and press paper on top.' },
    words: [['prints', 'pictures made by pressing paper onto an inked surface, so many copies can be made'], ['legacy', 'something a person leaves behind for future generations']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the steps for making a stonecut print.',
        items: ['The artist draws a design.', 'A printmaker carves the stone.', 'Ink is rolled onto the stone.', 'Paper is pressed on and peeled away.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: 'An artist’s <b>legacy</b> is …',
        opts: ['what they leave for the future', 'their first drawing', 'a kind of ink'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The owl’s feathers fan out “like a burst of flame.” This is a …',
        opts: ['simile', 'list', 'question'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How did Kenojuak’s time in the hospital help lead her to art?',
        a: 'She made beadwork and crafts there, which helped her develop skills she used when she began to draw.', look: 'crafts in hospital; skills' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What did Kenojuak’s art show the world about Inuit life?',
        a: 'It showed the beauty of Inuit life and imagination, with animals and people from the North.', look: 'beauty; animals; imagination' },
      { k: 'choice', code: 'C1.2', q: 'What makes this text a biography?',
        opts: ['It tells a real person’s life in time order.', 'It gives steps to follow.', 'It argues an opinion.', 'It is a poem.'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Kenojuak drew animals in her own way, not exactly as they looked. How would you draw your favourite animal?',
        a: 'I would draw a fox with a tail made of swirling leaves.', look: 'a creative idea' }
    ]
  });

  P.add({
    id: 'g6-oscar-peterson', subject: 'arts', form: 'Biography',
    title: 'The Maharaja of the Keyboard',
    deck: 'Oscar Peterson, the Montreal pianist who amazed the jazz world',
    hero: {
      photo: 'g6-oscar-peterson.jpg', credit: 'Photo: Jeangagnon, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'A statue of Oscar Peterson outside the National Arts Centre in Ottawa. Visitors can sit beside him at the piano.'
    },
    body: [
      'In the 1930s, in a Montreal neighbourhood called Little Burgundy, a boy named Oscar Peterson practised the piano for hours every day. His father, a railway porter, insisted that all five of his children learn music. Oscar had first played the trumpet, but after a serious illness damaged his lungs, he switched to the piano. It was a lucky change for music lovers everywhere.',
      { fig: G.time([['1925', 'Born in Montreal'], ['1949', 'Plays at Carnegie Hall, New York'], ['1962', 'Composes “Hymn to Freedom”'], ['1993', 'Has a stroke, then returns to play'], ['2010', 'Statue unveiled in Ottawa']], { x: 50, top: 12, gap: 26, hl: 1 }),
        tall: 124, cap: 'Key moments in Oscar Peterson’s life.' },
      { h: 'Speed and swing' },
      'Oscar studied classical piano, but he fell in love with jazz, a kind of music that grew from African American communities and that leaves room for players to <b>improvise</b>, or make up music on the spot. As a teenager, he won a national talent contest and began playing on the radio. By his twenties, he was known across Canada.',
      'In 1949, he was invited to play at Carnegie Hall in New York, one of the most famous concert halls in the world. The audience was stunned by his speed, his power and the way his music seemed to swing. Soon he was touring the world with his trio, a group of three musicians. Another musician gave him a nickname: the Maharaja of the Keyboard, meaning a king of the piano.',
      { h: 'A hymn for freedom' },
      'As a Black musician, Oscar faced racism, especially when touring in the United States, where he was sometimes refused service in hotels and restaurants. In 1962, he wrote a piece called “Hymn to Freedom.” Its calm, hopeful melody became an <b>anthem</b> for the civil rights movement, which fought for equal rights for Black Americans.',
      { box: 'Eight Grammy Awards', text: 'Oscar Peterson won eight Grammy Awards and recorded more than 200 albums.' },
      { h: 'Never giving up' },
      'In 1993, Oscar had a stroke that weakened his left hand. Many people, including his doctors, thought his career was over. But he worked hard, learned to play mostly with his right hand, and returned to the stage. He also taught young musicians and helped start a jazz school in Toronto. Today his music, and his story of talent, practice and courage, still inspires players around the world.'
    ],
    guide: { before: 'Find Montreal on a map. If possible, listen to a short clip of “Hymn to Freedom.” Teach <b>improvise</b> and <b>anthem</b>.',
      after: 'Clap a simple rhythm, then try to improvise a new one in answer. Ask: what did Oscar do when things got hard?' },
    words: [['improvise', 'to make up music or words on the spot'], ['anthem', 'a song that stands for a group or a cause']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When did Oscar play at Carnegie Hall?',
        opts: ['1949', '1925', '1962'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>improvise</b> is to …',
        opts: ['make up music on the spot', 'read music', 'stop playing'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author call Oscar’s switch to the piano “a lucky change”?',
        a: 'He became one of the greatest jazz pianists, so the world gained wonderful music.', look: 'became a great pianist' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How did Oscar’s experience of racism connect to “Hymn to Freedom”?',
        a: 'He faced racism on tour, and he wrote a hopeful song that became an anthem for equal rights.', look: 'racism; song for equal rights' },
      { k: 'choice', code: 'C3.3', q: 'What did Oscar do after his stroke?',
        opts: ['He learned to play mostly with his right hand and returned to the stage.', 'He stopped music forever.', 'He switched to trumpet.', 'He moved to Carnegie Hall.'], a: 0 },
      { k: 'choice', code: 'B3.3', q: 'Why is “Hymn to Freedom” in quotation marks?',
        opts: ['It is the title of a piece of music.', 'Someone is speaking.', 'It is a list.', 'It is a heading.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What lesson can readers learn from Oscar Peterson’s life?',
        a: 'Talent grows with practice, and courage helps you keep going after setbacks.', look: 'practice and courage' }
    ]
  });

  P.add({
    id: 'g6-mean-median', subject: 'math', form: 'Explanation',
    title: 'What Was a Typical Day?',
    deck: 'Using mean, median and mode to describe a week of weather',
    hero: {
      photo: 'g6-thermometer.jpg', credit: 'Photo: Naoag, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'An outdoor thermometer. Readings taken every day can be turned into data.'
    },
    body: [
      'Priya’s class recorded the high temperature outside their school every day for a week in May. At the end of the week, their teacher asked: “What was a typical temperature this week?” That sounds like a simple question, but there is more than one way to answer it.',
      { fig: G.T(4, 10, 'Daily high temperature (°C)', 'n') +
          G.cols([['Mon', 14], ['Tue', 17], ['Wed', 11], ['Thu', 20], ['Fri', 17], ['Sat', 23], ['Sun', 10]], 23, { base: 118, h: 88, x0: 4, hl: 5 }),
        tall: 136, cap: 'Priya’s class’s data for one week.' },
      { h: 'The mean' },
      'The <b>mean</b> is what most people call the average. To find it, add all the values and divide by how many there are. The seven temperatures add up to 14 + 17 + 11 + 20 + 17 + 23 + 10 = 112. Then 112 ÷ 7 = 16. The mean high temperature was 16 °C. You can think of the mean as sharing the total equally, as if every day had the same temperature.',
      { h: 'The median' },
      'The <b>median</b> is the middle value when the data is put in order. Priya ordered the temperatures from lowest to highest: 10, 11, 14, 17, 17, 20, 23. With seven values, the middle one is the fourth: 17. So the median is 17 °C. If there were an even number of values, the median would be halfway between the two middle ones.',
      { h: 'The mode and the range' },
      'The <b>mode</b> is the value that appears most often. Here, 17 appears twice, so the mode is 17 °C. The range tells how spread out the data is: the highest value minus the lowest. The range is 23 − 10 = 13 degrees.',
      { box: 'Which is best?', text: 'One very unusual value can pull the mean up or down. The median is not affected as much.' },
      { h: 'Choosing a measure' },
      'Each measure tells a slightly different story. Suppose a freak heat wave made Sunday 45 °C instead of 10 °C. The mean would jump to 21 °C, warmer than five of the seven days. But the median would still be 17 °C. When data has an extreme value, the median often gives a better picture of a typical day. Weather reporters, sports writers and scientists all choose their measure carefully, and good readers ask which one they are using.',
      'Priya’s class decided to report all three measures on their class weather board. Over the next month, they noticed something interesting: as the weather warmed up, the mean, the median and the mode all crept higher, week by week. The numbers told the story of spring arriving, one degree at a time.'
    ],
    guide: { before: 'Record the temperature for a few days, or use a weather app. Teach <b>mean</b>, <b>median</b> and <b>mode</b>.',
      after: 'Find the mean, median and mode of your own data. Ask: which one best describes a typical day?' },
    words: [['mean', 'the total shared equally: add the values and divide by how many'], ['median', 'the middle value when data is in order'], ['mode', 'the value that appears most often']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Which day was warmest?',
        opts: ['Saturday', 'Thursday', 'Monday'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The <b>median</b> is …',
        opts: ['the middle value in order', 'the most common value', 'the total'], a: 0 },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart for Priya’s data.', cols: ['Measure', 'How to find it', 'Value'],
        rows: [['Mean', null, '16 °C'], ['Median', 'the middle value in order', null], ['Range', null, null]],
        a: [[null, 'add the values and divide by 7', null], [null, null, '17 °C'], [null, 'highest minus lowest', '13 degrees']] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why would the median give a better picture than the mean if Sunday were 45 °C?',
        a: 'One extreme value pulls the mean up to 21 °C, but the median stays 17 °C, closer to most days.', look: 'extreme value affects mean, not median' },
      { k: 'choice', code: 'C3.3', q: 'Five test scores are 6, 7, 7, 8, 9. What is the mode?',
        opts: ['7', '8', '6', '9'], a: 0 },
      { k: 'lines', code: 'C1.3', n: 2, q: 'How do the headings help you use this explanation?',
        a: 'Each heading names one measure, so I can find the part I need quickly.', look: 'each heading = one measure' },
      { k: 'lines', code: 'A2.3', n: 2, q: 'An ad says “Our town has an average of 20 sunny days a month!” What question should you ask?',
        a: 'Which average is it: the mean or the median? Is there an extreme month changing it?', look: 'which measure; extreme values' }
    ]
  });

  P.add({
    id: 'g6-trip-budget', subject: 'math', form: 'Explanation',
    title: 'Paying for the Class Trip',
    deck: 'How a Grade 6 class planned a budget, raised money and made choices',
    hero: {
      photo: 'g6-school-bus.jpg', credit: 'Photo: QUOI Media Group, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A yellow school bus. Renting one for a day was the biggest cost of the trip.'
    },
    body: [
      'Mr. Okafor’s Grade 6 class of 24 students wanted to visit a science centre. Their teacher agreed, on one condition: the class had to plan the <b>budget</b> themselves. A budget is a plan for how money will be earned and spent. The class soon learned that planning a trip takes more than choosing where to go.',
      { fig: G.T(4, 10, 'Planned costs for the trip', 'n') +
          G.bars([['Bus', 480, '$480'], ['Admission', 288, '$288'], ['Snacks', 72, '$72']], 480, { x0: 72, top: 22, gap: 28, pad: 46, hl: 0 }) +
          G.T(4, 116, 'Total: $840', 'lb'),
        tall: 124, cap: 'The class’s list of expenses.' },
      { h: 'Listing the costs' },
      'First, the students listed every <b>expense</b>, or cost. A school bus for the day cost $480. Admission was $12 for each student, so 24 × $12 = $288. They also wanted a snack for each person, at $3 each: 24 × $3 = $72. In total, the trip would cost $480 + $288 + $72 = $840.',
      'Some costs, like the bus, are fixed: the bus costs $480 whether 10 students go or 24. Other costs, like admission and snacks, change with the number of people. Dividing the total by 24, each student would need to pay $35.',
      { h: 'Raising money' },
      'Not every family could afford $35, and the class wanted everyone to go. So they planned a bake sale. They borrowed baking pans, asked families for donations of ingredients and made posters. The sale raised $312. Subtracting from the total, $840 − $312 = $528 was still needed. That worked out to $22 per student.',
      { box: 'Needs and wants', text: 'A need is something you must have. A want is something nice to have. The bus was a need. Were the snacks?' },
      { h: 'Making trade-offs' },
      'The class still hoped to bring the cost down. They discussed choices, called <b>trade-offs</b>: giving up one thing to get another. One group suggested packing snacks from home instead of buying them. That would save $72. Another suggested a closer museum with a cheaper bus, but most students really wanted the science centre. In the end, they voted to bring their own snacks. The new cost per student was $456 ÷ 24 = $19.',
      'On the day of the trip, all 24 students climbed onto the bus. The trip was a success, and so was the budget. As one student said, “Now I know why my parents always talk about money at the grocery store.”'
    ],
    guide: { before: 'Ask: what is the difference between a need and a want? Teach <b>budget</b>, <b>expense</b> and <b>trade-off</b>. Have a calculator ready to check the math.',
      after: 'Plan a small budget for a family outing together. List the costs and one trade-off you could make.' },
    words: [['budget', 'a plan for earning and spending money'], ['expense', 'money spent on something'], ['trade-offs', 'giving up one thing to get another']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. What was the largest expense?',
        opts: ['the bus', 'admission', 'snacks'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>trade-off</b> is …',
        opts: ['giving up one thing to get another', 'a kind of bus', 'a bake sale'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the difference between a fixed cost and a cost that changes. Use an example from the text.',
        a: 'A fixed cost stays the same, like the $480 bus. Admission changes with the number of students.', look: 'fixed vs changing, with examples' },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Step', 'Amount'],
        rows: [['Total cost of trip', null], ['Money from bake sale', null], ['Still needed', null]],
        a: [[null, '$840'], [null, '$312'], [null, '$528']] },
      { k: 'choice', code: 'C3.2', q: 'Why did the class hold a bake sale?',
        opts: ['so every student could afford to go', 'to buy a bus', 'because the teacher was hungry', 'to visit a closer museum'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The class chose to pack snacks instead of going to a closer museum. Do you agree? Why?',
        a: 'Yes, because it saved money without giving up the trip most students wanted.', look: 'opinion with a reason' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Describe a time you had to make a trade-off with money or time.',
        a: 'I skipped buying a snack so I could save for a new book.', look: 'a real trade-off' }
    ]
  });

  P.add({
    id: 'g6-autumn-poems', subject: 'story', form: 'Poems',
    title: 'Three Poems for Fall',
    deck: 'A haiku, a cinquain and a free-verse poem, and how each one works',
    hero: {
      photo: 'g6-maple-leaves.jpg', credit: 'Photo: Vincent Pham, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'Red maple leaves in Algonquin Park, Ontario.'
    },
    body: [
      'Poets choose a form the way builders choose a frame. Some forms have strict rules about lines and syllables. Others have no rules at all. Here are three short poems about fall, each written in a different form.',
      { h: 'Haiku' },
      '<i>Red leaf lets go now. / It spins once, then twice, then rests / on the cold, dark pond.</i>',
      { fig: G.T(4, 12, 'Haiku: count the syllables', 'n') +
          [['Red / leaf / lets / go / now', '5'], ['It / spins / once / then / twice / then / rests', '7'], ['on / the / cold / dark / pond', '5']].map(function (r, i) { return G.T(10, 38 + i * 28, r[0], 'l') + G.T(286, 38 + i * 28, r[1], 'lb', 'end'); }).join('') +
          '<path class="d" d="M10 112 H290"/>' + G.T(286, 128, '17 syllables', 'n', 'end'),
        tall: 134, cap: 'A haiku has three lines of 5, 7 and 5 syllables.' },
      'A haiku is a very old form from Japan. It has three lines of five, seven and five <b>syllables</b>. Haiku usually describe one small moment in nature. They do not explain; they show, and let the reader feel the rest.',
      { h: 'Cinquain' },
      '<i>Geese / Loud, restless / Calling, rising, leaving / They stitch the grey sky / South</i>',
      'A cinquain has five lines. This kind uses a pattern of words: a one-word subject, two describing words, three action words, a short phrase, and a final word that sums it up. The geese “stitch the grey sky,” as if they were a needle and thread. Giving geese the action of a person sewing is a kind of <b>imagery</b> that helps readers picture the line of birds.',
      { h: 'Free verse' },
      '<i>On the last warm day / Grandma and I rake the yard / into one giant, crackling hill. / She says she is too old for jumping. / Then she jumps. / For a moment we are both / lost in the leaves, / laughing, / the same age.</i>',
      'Free verse has no fixed rhyme, rhythm or line length. The poet decides where each line breaks. Here, “Then she jumps.” sits alone on its own line to surprise the reader, and the short line “laughing,” slows us down.',
      { box: 'Try it', text: 'Write a haiku about something you see out a window right now. Count the syllables on your fingers.' },
      'Each form fits a different purpose. A haiku captures a single image. A cinquain builds to one strong word. Free verse can tell a small story. Which form would you choose for your own fall poem?',
      'Whatever the form, good poems share some things. They use exact words: “crackling hill” instead of “big pile.” They appeal to the senses, so readers can see, hear and feel the moment. And they leave something unsaid, trusting the reader to fill in the feeling.'
    ],
    guide: { before: 'Clap the syllables of a few words together. Teach <b>syllables</b>, <b>imagery</b> and the word form. Read each poem aloud slowly.',
      after: 'Write a haiku or cinquain together about the season outside your window.' },
    words: [['syllables', 'the beats in a word; “maple” has two'], ['imagery', 'words that help the reader see, hear or feel something']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How many syllables are in a haiku?',
        opts: ['17', '15', '5'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which form has no fixed rhyme or line length?',
        opts: ['free verse', 'haiku', 'cinquain'], a: 0 },
      { k: 'table', code: 'C1.2', q: 'Fill in the chart.', cols: ['Form', 'Its pattern'],
        rows: [['Haiku', null], ['Cinquain', null], ['Free verse', null]],
        a: [[null, 'three lines of 5, 7 and 5 syllables'], [null, 'five lines: subject, two describing words, three action words, a phrase, one word'], [null, 'no fixed rhyme, rhythm or line length']] },
      { k: 'lines', code: 'C3.1', n: 2, q: 'What does “They stitch the grey sky” help you picture?',
        a: 'A long line of geese moving across the sky like a thread being sewn.', look: 'line of geese like thread' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Why does the poet put “Then she jumps.” on its own line?',
        a: 'To surprise the reader and make that moment stand out, since Grandma said she was too old.', look: 'surprise; emphasis' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What does the free-verse poem mean by “the same age”?',
        a: 'For a moment, Grandma and the child play like children together, so age does not matter.', look: 'they feel young together' },
      { k: 'lines', code: 'C3.8', n: 2, q: 'Which poem did you like best? What made it work for you?',
        a: 'The free verse, because it told a funny, warm story about Grandma.', look: 'a choice and a reason' }
    ]
  });

  P.add({
    id: 'g6-cupola', subject: 'story', form: 'Science fiction',
    title: 'Sixteen Sunrises',
    deck: 'A girl growing up on a space station, and the one place she wants to see',
    hero: {
      photo: 'g6-cupola.jpg', credit: 'Photo: NASA, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'An astronaut looks down at Earth from the cupola, the window room of the International Space Station.'
    },
    body: [
      'The year was 2085, and Mira was the only twelve-year-old in orbit. She lived with her parents on Halcyon Station, 400 kilometres above Earth, where they studied how plants grow without gravity. Every morning, Mira floated through three modules and pulled herself into the cupola: a round room with seven windows, facing the planet below.',
      { fig: '<circle class="h" cx="150" cy="66" r="38"/><circle class="d" cx="150" cy="66" r="56"/>' +
          '<rect class="a" x="201" y="42" width="14" height="10"/>' + G.T(222, 40, 'Halcyon', 'l') +
          G.T(40, 20, 'sunlight', 'lb', 'middle') + D.arrow(60, 24, 96, 40, 't') +
          G.T(150, 70, 'Earth', 'lb', 'middle') + G.T(150, 136, 'One orbit: about 90 minutes', 'n', 'middle'),
        tall: 140, cap: 'The station circles Earth about 16 times a day, so Mira sees 16 sunrises.' },
      '“Sunrise number four,” she whispered, as a thin blue line glowed along the curve of the Earth. Up here, the station circled the planet every 90 minutes. That meant sixteen sunrises and sixteen sunsets every day.',
      'Below, the coast of British Columbia slid past, then the jagged Rockies, then the flat Prairies like a quilt of brown and gold. Mira knew this map by heart. Every day it passed, beautiful and unreachable.',
      { h: 'The Great Lakes' },
      'Her grandmother lived in a small town on the shore of Lake Huron. Mira had been born on the station and had never set foot on the ground. She had never felt rain, or wind, or grass under her feet. On video calls, Grandma described the smell of the lake in summer and the crunch of snow under boots. Mira tried to imagine it. She couldn’t.',
      '“Look for my porch light tonight,” Grandma had joked. Mira laughed then. Now, as the station crossed into darkness, she searched anyway. The Great Lakes were black shapes outlined by golden threads of cities. Somewhere along that dark shore, one tiny light was Grandma’s.',
      { h: 'A promise' },
      'Mira’s mother drifted into the cupola holding a small pot. Inside, a pea plant had finally sprouted, its curly tendrils reaching in every direction, confused about which way was up.',
      '“Next year,” her mother said quietly, “we’re going down. All of us. Your body will feel heavy, and the air will feel strange.”',
      'Mira looked at the pea shoot, then at the glittering lakes. Her heart <b>soared</b>. Sixteen sunrises a day were wonderful. But she would trade every one of them for a single <b>ordinary</b> morning on the shore of Lake Huron, with her feet on the ground and Grandma beside her.'
    ],
    guide: { before: 'Look at a photo of Earth from space together. Teach <b>soared</b> and <b>ordinary</b>. Explain that science fiction mixes real science with an imagined future.',
      after: 'Ask: what does Mira want most? What ordinary thing in your life would you miss if you lived in space?' },
    words: [['soared', 'rose high; here, felt very happy'], ['ordinary', 'normal, everyday']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How long does one orbit take?',
        opts: ['about 90 minutes', 'one day', 'one week'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'What makes this story science fiction?',
        opts: ['It is set in an imagined future with real science.', 'It is a true report.', 'It has rhymes.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Mira search for Grandma’s light, even though she laughed at the joke?',
        a: 'She misses Grandma and wants to feel close to her, even if she knows she cannot really see one light.', look: 'misses Grandma; wants closeness' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The Prairies look “like a quilt of brown and gold.” What does this simile help you picture?',
        a: 'Square fields of different colours side by side, like patches on a quilt.', look: 'patches of fields' },
      { k: 'choice', code: 'C3.1', q: 'Why are the pea tendrils “confused about which way was up”?',
        opts: ['There is no gravity to show plants which way is up.', 'The plant is sick.', 'It is dark.', 'Mira turned the pot.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'What is the theme, or big idea, of the story?',
        a: 'Home and family matter more than amazing sights; ordinary things can be precious.', look: 'home, family, ordinary is precious' },
      { k: 'choice', code: 'B3.3', q: 'Why does a colon come before “a round room with seven windows”?',
        opts: ['It introduces an explanation of the cupola.', 'It ends the story.', 'It starts a list of names.', 'It shows a question.'], a: 0 }
    ]
  });

  P.add({
    id: 'g6-home-child', subject: 'history', form: 'Letter (historical fiction)',
    title: 'Dear Nellie',
    deck: 'A letter from a British Home Child on an Ontario farm, 1910',
    plain: true,
    hero: {
      photo: 'g6-home-children.jpg', credit: 'Photo: ΙΣΧΣΝΙΚΑ-888, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A plaque in Ottawa remembers the British Home Children sent to Canada.'
    },
    body: [
      'Near Owen Sound, Ontario. March 3, 1910.',
      'Dear Nellie,',
      'I hope this letter finds you well at the Home in London, and that Matron lets you read it yourself. It has taken me four months to save the stamp, so I will write small to fit everything.',
      'The ship took eleven days to cross the ocean. Most of the boys were sick the whole way, but I was not, and I watched the waves for hours. From Quebec, we rode a train for two days. Then we were sent out one by one. A farmer named Mr. Cole met me at the station and took me to his farm in a sleigh.',
      { fig: G.T(4, 12, 'My day on the farm', 'n') +
          [['5:00', 'Milk the cows'], ['6:30', 'Breakfast, feed the pigs'], ['8:00', 'School (only in winter)'], ['4:00', 'Chop wood, carry water'], ['7:00', 'Supper, then bed in the loft']].map(function (r, i) { return G.T(56, 36 + i * 22, r[0], 'lb', 'end') + G.T(68, 36 + i * 22, r[1], 'l'); }).join(''),
        tall: 138, cap: 'Thomas’s daily schedule, as he described it.' },
      'I will not tell you a fib, Nell. The work is hard. My hands are cracked from the cold, and I sleep in the <b>loft</b> over the kitchen, where frost grows on the nails in the roof. Mr. Cole does not say much, and I am not allowed to eat with the family on Sundays when visitors come. Some days I feel like a hired tool, not a boy. I cried the first week, though I would not admit it to anyone but you.',
      'But it is not all bad. Mrs. Cole knits me socks, and she lets me go to school in winter. I am learning fractions and the names of all the provinces. There is a horse named Duke who is gentle with me, and when I brush him I talk to him about home. The snow here is deeper than any I ever saw, and the stars are so bright they look close enough to touch. On Sundays, I am allowed to walk to church in the village, where the minister’s wife gives me a biscuit and asks after my family.',
      { box: 'From history', text: 'From 1869 to 1948, about 100&nbsp;000 children, like Thomas, were sent from Britain to work on Canadian farms and in homes.' },
      'Nellie, I have been promised wages when I turn 18, and I will save every penny. When I have enough, I will send for you, and we will have a farm of our own, with a horse like Duke. That is my <b>vow</b>, and I will not break it.',
      'Be brave. Keep this letter. Write to me if Matron allows it, care of Mr. A. Cole, R.R. 2, Owen Sound, Ontario, Canada.',
      'Your loving brother,',
      'Thomas'
    ],
    guide: { before: 'Find London, England, and Owen Sound, Ontario, on a map. Explain that many British Home Children were orphans or from poor families, and that this letter is fiction based on real experiences. Teach <b>vow</b> and the word Matron (the woman in charge of a children’s home).',
      after: 'Ask: how do you think Thomas really feels? What clues show it? Some Canadian families can trace their ancestors to Home Children.' },
    words: [['vow', 'a serious promise'], ['loft', 'a space under a roof, often used for storage or sleeping']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the schedule. What does Thomas do at 5:00?',
        opts: ['milks the cows', 'goes to school', 'eats supper'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows this is a letter?',
        opts: ['a greeting and a closing with a name', 'numbered steps', 'a chart of data'], a: 0 },
      { k: 'table', code: 'C3.2', q: 'Fill in the chart.', cols: ['Hard parts of Thomas’s life', 'Good parts of Thomas’s life'],
        rows: [[null, null], [null, null]],
        a: [['His hands crack from the cold.', 'Mrs. Cole knits him socks.'], ['He cannot eat with the family when visitors come.', 'He goes to school and has Duke the horse.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What does “Some days I feel like a hired tool, not a boy” tell you about Thomas’s feelings?',
        a: 'He feels used for work and not cared for as a child, which makes him sad.', look: 'used, not cared for' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'Why do you think Thomas says he would not admit crying to anyone but Nellie?',
        a: 'He wants to seem brave, but he trusts his sister and can be honest with her.', look: 'wants to seem brave; trusts her' },
      { k: 'choice', code: 'B3.3', q: 'Why is there a comma after “Dear Nellie”?',
        opts: ['It follows the greeting in a letter.', 'It joins two sentences.', 'It shows a list.', 'It ends a question.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Based on this letter, how were many Home Children treated? What do you think of it?',
        a: 'Many worked hard and were treated like workers, not family. I think it was unfair because they were children.', look: 'how treated; an opinion' }
    ]
  });

  P.add({
    id: 'g6-calm', subject: 'health', form: 'Explanation',
    title: 'Calm in the Storm',
    deck: 'What stress does to your body, and simple ways to settle it',
    hero: {
      photo: 'g6-forest-trail.jpg', credit: 'Photo: Thomas Metaxas, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A forest trail. Time in nature is one of the ways people calm their bodies and minds.'
    },
    body: [
      'Your heart pounds. Your hands feel sweaty. Your breathing is quick and shallow, and your stomach feels tight. Maybe you are about to give a speech, or you had an argument with a friend. These are signs of <b>stress</b>, your body’s reaction to a challenge or a threat. Everyone feels it sometimes.',
      { fig: '<rect class="k" x="90" y="16" width="120" height="120"/>' +
          G.T(150, 10, 'Breathe in: 4', 'l', 'middle') + G.T(218, 80, 'Hold: 4', 'l') + G.T(150, 152, 'Breathe out: 4', 'l', 'middle') + G.T(82, 80, 'Hold: 4', 'l', 'end') +
          D.arrow(96, 16, 204, 16, 'a') + D.arrow(210, 22, 210, 130, 'a') + D.arrow(204, 136, 96, 136, 'a') + D.arrow(90, 130, 90, 22, 'a') + G.T(150, 80, 'box', 'lb', 'middle') + G.T(150, 94, 'breathing', 'lb', 'middle'),
        tall: 158, cap: 'Box breathing: trace the sides of a square, counting to four on each side.' },
      { h: 'An ancient alarm' },
      'Stress begins in your brain. When it senses danger, it sends out chemical messengers called hormones. They make your heart beat faster and your muscles get ready to act. Long ago, this “fight or flight” response helped people escape from wild animals. Today, the same alarm can go off before a test or a game, even though there is no real danger.',
      'A little stress can be helpful: it can sharpen your focus and give you energy. But stress that lasts a long time can make it hard to sleep, eat or concentrate. That is why it helps to have <b>strategies</b>, ways to calm your body when the alarm keeps ringing.',
      { h: 'Strategies that work' },
      'Slow breathing is one of the fastest. Breathing deeply and slowly sends a message to your brain that you are safe, which slows your heart. Try box breathing: breathe in for four counts, hold for four, breathe out for four, hold for four, and repeat.',
      'Moving your body helps too. A walk, a bike ride or a game of tag uses up the energy that stress creates. Time in nature is especially good. Studies show that spending time among trees and green spaces can lower stress. Some Canadian doctors even write “prescriptions” for patients to spend time in parks.',
      { box: 'Talk it out', text: 'Telling a trusted adult or friend how you feel can make a problem feel smaller. You do not have to handle hard feelings alone.' },
      'Other strategies include getting enough sleep, writing your worries in a journal, listening to calm music, or naming five things you can see and hear right now. Different strategies work for different people, so try a few and notice which ones help you. Being <b>resilient</b> does not mean never feeling stressed. It means knowing how to bounce back.'
    ],
    guide: { before: 'Ask: where in your body do you feel it when you are nervous? Teach <b>stress</b>, <b>strategies</b> and <b>resilient</b>. Try box breathing together.',
      after: 'Make a list of three calming strategies the child could use. If stress or worry ever feels too big, talk to a doctor or school counsellor.' },
    words: [['stress', 'the body’s reaction to a challenge or threat'], ['strategies', 'plans or ways of doing something'], ['resilient', 'able to recover after hard times']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. In box breathing, how long do you hold?',
        opts: ['four counts', 'one count', 'ten counts'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Being <b>resilient</b> means …',
        opts: ['able to bounce back', 'never feeling stress', 'very fast'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What happens in your body during “fight or flight”?',
        a: 'The brain sends hormones; your heart beats faster and your muscles get ready to act.', look: 'hormones; heart; muscles' },
      { k: 'lines', code: 'C3.3', n: 2, q: 'How can a little stress be helpful?',
        a: 'It can sharpen your focus and give you energy.', look: 'focus and energy' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart.', cols: ['Strategy', 'Why it helps'],
        rows: [['Slow breathing', null], ['Moving your body', null], ['Talking it out', null]],
        a: [[null, 'Tells your brain you are safe and slows your heart.'], [null, 'Uses up the energy stress creates.'], [null, 'Makes a problem feel smaller.']] },
      { k: 'choice', code: 'C1.5', q: 'The author calls stress an “alarm.” Why?',
        opts: ['It warns the body and gets it ready to act.', 'It makes a ringing sound.', 'It wakes you every morning.', 'It is loud.'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 2, q: 'Which strategy will you try first? Why do you think it will work for you?',
        a: 'Box breathing, because I can do it anywhere, even in class.', look: 'a strategy and a reason' }
    ]
  });

  P.add({
    id: 'g6-port', subject: 'social', form: 'Report',
    title: 'Canada’s Gateway to Asia',
    deck: 'How the Port of Vancouver connects Canada to the world',
    hero: {
      photo: 'g6-vancouver-port.jpg', credit: 'Photo: Dietmar Rabich, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Container cranes at the Port of Vancouver, Canada’s largest port.'
    },
    body: [
      'Look at the labels on your shoes, your phone or your favourite toy. Many say “Made in China,” “Made in Vietnam” or “Made in Korea.” How did they get from a factory across the Pacific Ocean to a store near you? Many of them came through the Port of Vancouver, Canada’s busiest port.',
      { fig: G.flow(['A factory in Asia fills a container.', 'A ship crosses the Pacific (2 weeks).', 'Cranes in Vancouver unload it.', 'A train carries it east to stores.'], { top: 2, bh: 26, gap: 12, hl: 2 }),
        tall: 146, cap: 'The journey of a shipping container.' },
      { h: 'Boxes that changed the world' },
      'Most goods today travel in steel shipping containers, giant boxes about the size of a school bus. Because every container is built to the same standard size, it can be lifted from a ship onto a train or a truck without ever being unpacked. Giant cranes at the port can move a container in about two minutes. A large ship can carry thousands of them.',
      { h: 'Trade goes both ways' },
      'Trade is the buying and selling of goods between countries. Goods that come into Canada are called <b>imports</b>; goods that Canada sells to other countries are called <b>exports</b>. Through Vancouver, Canada imports electronics, clothing, furniture and toys. It exports grain from the Prairies, potash used to make fertilizer, wood products, and coal. Ships that arrive full of televisions may leave full of wheat.',
      'Each year, the port handles goods worth hundreds of billions of dollars. Thousands of people work there: crane operators, truck drivers, ship pilots, customs officers and many more. Farmers on the Prairies and factory workers in Ontario depend on the port to reach customers overseas.',
      { box: 'Interdependent', text: 'Countries depend on one another for goods they cannot easily make or grow themselves.' },
      { h: 'Challenges' },
      'A busy port has costs as well as benefits. Ships and trucks burn fuel that pollutes the air and water. The port sits on the traditional territory of the Musqueam, Squamish and Tsleil-Waututh Nations, who have raised concerns about its effects on fish, wildlife and their lands. When a strike, a flood or a storm closes the port, store shelves across Canada can empty within weeks. Canadians are working to make trade <b>sustainable</b>: good for the economy, for people and for the environment.'
    ],
    guide: { before: 'Read the “Made in” labels on a few things at home. Find Vancouver and China on a map. Teach <b>imports</b>, <b>exports</b> and <b>sustainable</b>.',
      after: 'Make a two-column list of things your family buys that are imports and things Canada exports.' },
    words: [['imports', 'goods brought into a country to sell'], ['exports', 'goods sent out of a country to sell'], ['sustainable', 'able to continue without harming people or the environment']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the steps of a container’s journey.',
        items: ['A factory packs goods into a container.', 'A ship crosses the Pacific.', 'Cranes lift the container off the ship.', 'A train carries it east.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Ex-</i> means out. <b>Exports</b> are goods that …',
        opts: ['go out of a country', 'come into a country', 'stay in one city'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why can containers move without being unpacked?',
        opts: ['They are all a standard size.', 'They are made of wood.', 'They float.'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart with examples from the text.', cols: ['Imports through Vancouver', 'Exports through Vancouver'],
        rows: [[null, null], [null, null]],
        a: [['electronics', 'grain'], ['clothing', 'potash']] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why have the Musqueam, Squamish and Tsleil-Waututh Nations raised concerns about the port?',
        a: 'The port is on their traditional territory, and it affects fish, wildlife and their lands.', look: 'their territory; effects on nature' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Does the author show only the benefits of the port? Explain.',
        a: 'No. The author shows benefits like jobs and trade, and also costs like pollution and effects on First Nations.', look: 'both benefits and costs' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Name something you own that was probably imported. How do you know?',
        a: 'My headphones; the label says Made in China.', look: 'an item and evidence' }
    ]
  });

  P.add({
    id: 'g6-shadd', subject: 'history', form: 'Biography',
    title: 'Mary Ann Shadd’s Newspaper',
    deck: 'The teacher and journalist who urged Black Americans to find freedom in Canada',
    hero: {
      photo: 'g6-shadd.jpg', credit: 'Photo: BiblioArchives / LibraryArchives, CC BY 2.0, Wikimedia Commons', focus: '50% 30%',
      tall: 220,
      cap: 'Mary Ann Shadd Cary, teacher, newspaper publisher and lawyer.'
    },
    body: [
      'In 1850, the United States passed a harsh new law. Under the Fugitive Slave Act, people who had escaped slavery could be captured anywhere in the country, even in states where slavery was banned, and sent back to their enslavers. Free Black people were in danger too, because some were kidnapped and falsely claimed as escaped. Thousands fled north to Canada.',
      { fig: G.time([['1823', 'Born to a free Black family in Delaware'], ['1851', 'Moves to Windsor, Canada West'], ['1853', 'Starts The Provincial Freeman'], ['1863', 'Recruits soldiers in the US Civil War'], ['1883', 'Earns a law degree, age 60']], { x: 50, top: 12, gap: 26, hl: 2 }),
        tall: 124, cap: 'Key moments in Mary Ann Shadd’s life.' },
      { h: 'A teacher in Canada West' },
      'One of those who came was Mary Ann Shadd. She had been born free in Delaware in 1823, into a family that helped people escape slavery. In 1851, she moved to Windsor, in what is now Ontario, then called Canada West. There she opened a school that welcomed all children, Black and white. She believed that education was the key to freedom and equality.',
      'Shadd also wrote a booklet urging Black Americans to move to Canada. It described the land, the weather, the jobs and the laws, which did not allow slavery. She wanted people to know they could build good lives there.',
      { h: 'The Provincial Freeman' },
      'In 1853, Shadd started a newspaper called The Provincial Freeman. She became one of the first women in North America to publish and edit a newspaper. In its pages, she spoke out against slavery and <b>segregation</b>, encouraged Black settlers to be independent, and argued that women deserved equal rights. Some readers objected to a woman running a newspaper. Shadd answered with a famous motto: “Self-reliance is the true road to independence.”',
      { box: 'A bold voice', text: 'To avoid criticism, Shadd sometimes listed men as editors. But everyone knew whose voice was in the paper.' },
      { h: 'A lifetime of firsts' },
      'Later, Shadd returned to the United States. During the Civil War, she recruited Black soldiers to fight against slavery. At age 60, she earned a law degree, becoming one of the first Black women lawyers in the country. She also fought for women’s right to vote. In 1994, Canada named her a Person of National Historic Significance. Her <b>courage</b> and her words helped build a stronger Black community in Canada.'
    ],
    guide: { before: 'Find Windsor and Chatham, Ontario, and Delaware on a map. Explain what slavery was, simply and honestly. Teach <b>segregation</b>, <b>courage</b> and the word motto.',
      after: 'Ask: what does “Self-reliance is the true road to independence” mean? Why was a newspaper a powerful tool in the 1850s?' },
    words: [['segregation', 'keeping people apart because of their race'], ['courage', 'bravery to do what is right even when it is hard']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When did Shadd start her newspaper?',
        opts: ['1853', '1851', '1883'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Courage</b> is …',
        opts: ['bravery to do what is right', 'a kind of newspaper', 'a law'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why did thousands of Black people flee to Canada after 1850?',
        a: 'The Fugitive Slave Act let people who escaped slavery be captured anywhere in the US, and free Black people were kidnapped.', look: 'the new law; danger' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What does Shadd’s school, which welcomed all children, show about her beliefs?',
        a: 'She believed in equality and that education was the key to freedom for everyone.', look: 'equality; education' },
      { k: 'choice', code: 'C3.6', q: 'What does “Self-reliance is the true road to independence” mean?',
        opts: ['Depending on yourself leads to freedom.', 'Roads lead to cities.', 'Newspapers are expensive.', 'Travel is dangerous.'], a: 0 },
      { k: 'choice', code: 'B3.1', q: 'Which sentence has a relative clause (a part that begins with <i>who</i>, <i>which</i> or <i>that</i>)?',
        opts: ['She was born into a family that helped people escape slavery.', 'Thousands fled north.', 'She also fought for women’s right to vote.', 'In 1853, Shadd started a newspaper.'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'How did Shadd stand up for more than one group of people? Give two examples.',
        a: 'She spoke against slavery for Black people, and she argued for women’s equal rights and the vote.', look: 'Black people and women' }
    ]
  });

  P.add({
    id: 'g6-bats', subject: 'science', form: 'Report',
    title: 'Silent Caves',
    deck: 'How a fungus endangered Canada’s most common bat',
    hero: {
      photo: 'g6-little-brown-bat.jpg', credit: 'Photo: Moriarty Marvin, U.S. Fish and Wildlife Service, Public domain, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'A little brown bat in a cave. It weighs less than two loonies.'
    },
    body: [
      'On a summer evening, as the sun goes down, small dark shapes swoop and flutter over ponds and fields. They are bats, and they are hunting. A single little brown bat can catch hundreds of insects in one night, including mosquitoes and moths that damage crops. For years, the little brown bat was the most common bat in Canada. Then, suddenly, the caves went quiet.',
      { fig: G.flow(['The fungus grows on a sleeping bat’s skin.', 'The bat wakes up again and again.', 'Each waking burns its stored fat.', 'The bat starves before spring.'], { top: 2, bh: 26, gap: 12, hl: 3 }),
        tall: 146, cap: 'How white-nose syndrome kills hibernating bats.' },
      { h: 'A white fuzz' },
      'In 2006, cave explorers in New York State noticed bats with a strange white fuzz on their noses and wings. Many were dead. Scientists discovered that the fuzz was a <b>fungus</b> that grows in cold, damp places. It had probably been carried from Europe on a visitor’s boots or gear. The disease it causes was named white-nose syndrome. By 2010, it had reached Ontario and Quebec.',
      { h: 'Why it is deadly' },
      'In winter, bats <b>hibernate</b>: they hang in caves and old mines in a deep sleep, their heartbeat slowing almost to a stop. They live on fat they stored up in the fall, and they have just enough to last until spring. The fungus irritates their skin and wakes them up again and again. Every time a bat wakes, it burns precious fat. Many run out of energy and starve before the insects return.',
      'In some caves, more than nine out of ten bats died. In 2014, the little brown bat was listed as endangered in Canada.',
      { box: 'Echolocation', text: 'Bats find insects in the dark by making high sounds and listening for the echoes that bounce back.' },
      { h: 'Helping bats recover' },
      'Scientists are searching for treatments, such as helpful bacteria that slow the fungus. Many caves are now closed to visitors in winter, and cavers clean their gear carefully to avoid spreading spores. Some bats in a few places have survived the disease, and scientists are studying why.',
      'People can help too. A bat house mounted on a sunny wall gives mothers a warm, safe place to raise their pups in summer. Leaving old trees standing and avoiding insect sprays helps bats find food and shelter. Bats are not scary pests; they are valuable neighbours, and they need our help to make a comeback.'
    ],
    guide: { before: 'Ask: what do you know about bats? Teach <b>fungus</b>, <b>hibernate</b> and the word syndrome (a set of signs of a disease).',
      after: 'Look up plans for a simple bat house. Talk about why one disease could change a whole ecosystem.' },
    words: [['fungus', 'a living thing such as mould or a mushroom that grows on other things'], ['hibernate', 'to spend the winter in a deep sleep']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the steps.',
        items: ['The fungus grows on the bat’s skin.', 'The bat wakes up again and again.', 'Each waking burns its fat.', 'The bat starves before spring.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>hibernate</b> is to …',
        opts: ['spend winter in a deep sleep', 'hunt at night', 'fly south'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'How did the fungus probably reach North America?',
        opts: ['on a visitor’s boots or gear', 'on birds', 'in the rain'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why waking up in winter is so dangerous for a bat.',
        a: 'A bat has only enough stored fat to last until spring. Each waking burns fat, so it can starve.', look: 'limited fat; waking burns it' },
      { k: 'lines', code: 'C2.3', n: 2, q: 'Predict: what might happen to insects in an area where most bats have died?',
        a: 'There may be more mosquitoes and moths, because fewer bats are eating them.', look: 'more insects; fewer predators' },
      { k: 'choice', code: 'C3.5', q: 'Which sentence shows the author’s opinion about bats?',
        opts: ['Bats are not scary pests; they are valuable neighbours.', 'In 2006, cave explorers noticed bats.', 'By 2010, it reached Ontario.', 'Bats hang in caves.'], a: 0 },
      { k: 'lines', code: 'C2.1', n: 2, q: 'What did you already know about bats before reading? Did this passage change your view?',
        a: 'I thought bats were scary, but now I know they eat insects and need help.', look: 'prior idea and change' }
    ]
  });

  P.add({
    id: 'g6-coral', subject: 'science', form: 'Report',
    title: 'Cities Under the Sea',
    deck: 'Why coral reefs are full of life, and why they turn white',
    hero: {
      photo: 'g6-coral-reef.jpg', credit: 'Photo: Jerry Reid, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A coral reef off the coast of Florida.'
    },
    body: [
      'Coral reefs cover less than one percent of the ocean floor. Yet about a quarter of all the kinds of animals that live in the sea depend on them. Fish, crabs, sea turtles, sharks, sponges and octopuses all find food and shelter among the reef’s branches and caves. Scientists sometimes call reefs the rainforests of the sea.',
      { fig: '<circle class="k" cx="80" cy="56" r="40"/>' + [0, 1, 2, 3, 4, 5].map(function (i) { var a = i * Math.PI / 3; return '<circle class="h" cx="' + (80 + Math.cos(a) * 20).toFixed(1) + '" cy="' + (56 + Math.sin(a) * 20).toFixed(1) + '" r="6"/>'; }).join('') +
          G.T(80, 112, 'healthy coral:', 'lb', 'middle') + G.T(80, 126, 'algae inside', 'l', 'middle') +
          D.arrow(128, 56, 176, 56, 'a') + G.T(152, 46, 'too warm', 'n', 'middle') +
          '<circle class="k" cx="224" cy="56" r="40"/>' + G.T(224, 112, 'bleached coral:', 'lb', 'middle') + G.T(224, 126, 'algae gone', 'l', 'middle'),
        tall: 132, cap: 'When water gets too warm, coral pushes out the algae that feed it, and turns white.' },
      { h: 'Animals, not rocks' },
      'Coral may look like rock or plants, but a coral reef is built by animals. Each coral is a colony of tiny animals called polyps, each one smaller than a pencil eraser. Polyps build hard skeletons of limestone around themselves. Over hundreds or thousands of years, millions of these skeletons pile up into a reef.',
      'Inside the polyps live tiny <b>algae</b>, plant-like living things that make food from sunlight. The algae share their food with the coral and give it its bright colours. In return, the coral gives the algae a safe home. This kind of partnership, where both living things benefit, is called <b>symbiosis</b>.',
      { h: 'Bleaching' },
      'Corals are very sensitive to temperature. When ocean water stays even a degree or two warmer than usual for several weeks, the stressed coral pushes out its algae. Without them, the coral turns ghostly white. This is called bleaching. Bleached coral is not dead yet, but it is starving. If the water cools soon, the algae can return. If not, the coral dies.',
      { box: 'Canada’s reefs', text: 'Canada has cold-water corals off Nova Scotia and rare glass sponge reefs off British Columbia, found nowhere else on Earth.' },
      { h: 'Reefs at risk' },
      'As the climate warms, bleaching is happening more often. Pollution, overfishing and damage from boat anchors add to the harm. Many countries are protecting reefs as marine parks, where fishing and anchoring are limited, and scientists are growing young corals in nurseries and planting them on damaged reefs. Cutting the gases that warm the planet is the most important way to help. What happens to reefs affects millions of people who depend on them for food, jobs and protection from storms.'
    ],
    guide: { before: 'Look at photos of a coral reef together. Teach <b>algae</b>, <b>symbiosis</b> (sym = together, bio = life) and the word colony.',
      after: 'Ask: why is a reef like a city? Talk about another partnership in nature where both sides benefit.' },
    words: [['algae', 'tiny plant-like living things that make food from sunlight'], ['symbiosis', 'a partnership where two living things help each other']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What causes coral to bleach?',
        opts: ['water that is too warm', 'too many fish', 'cold water'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Sym-</i> means together and <i>bio</i> means life. <b>Symbiosis</b> means …',
        opts: ['living together and helping each other', 'living alone', 'a kind of rock'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart about the partnership.', cols: ['Partner', 'What it gives the other'],
        rows: [['Algae', null], ['Coral', null]],
        a: [[null, 'food and colour'], [null, 'a safe home']] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Is bleached coral dead? Explain.',
        a: 'Not yet. It is starving without its algae. If the water cools soon the algae can return; if not, it dies.', look: 'not yet; can recover if water cools' },
      { k: 'choice', code: 'C3.1', q: 'Reefs are called “the rainforests of the sea.” This means reefs …',
        opts: ['are full of many kinds of life', 'have trees', 'get lots of rain', 'are on land'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'The text says coral “may look like rock or plants.” How did the next sentences help you understand what coral really is?',
        a: 'They explained that coral is a colony of tiny animals called polyps that build skeletons.', look: 'animals; polyps' },
      { k: 'lines', code: 'C3.6', n: 2, q: 'According to the author, what is the most important way to help reefs?',
        a: 'Cutting the gases that warm the planet.', look: 'reduce warming gases' }
    ]
  });

  P.add({
    id: 'g6-manicouagan', subject: 'science', form: 'Report',
    title: 'The Eye of Quebec',
    deck: 'A giant ring of water left by a rock from space',
    hero: {
      photo: 'g6-manicouagan.jpg', credit: 'Photo: Copernicus Sentinel-2, ESA, CC BY-SA 3.0 igo, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The Manicouagan Reservoir in Quebec, seen by a satellite. The ring is about 70 kilometres across.'
    },
    body: [
      'Astronauts passing over northern Quebec often take photos of a strange shape below: a perfect ring of water, about 70 kilometres across, with a large island in the middle. It looks like a giant eye staring up into space. This is the Manicouagan Reservoir, and its shape is the scar of a disaster that happened long before the dinosaurs ruled the Earth.',
      { fig: G.flow(['An asteroid about 5 km wide strikes.', 'The blast digs a crater and melts rock.', 'Glaciers grind the land for millions of years.', 'A dam floods the ring, making a lake.'], { top: 2, bh: 26, gap: 12, hl: 0 }),
        tall: 146, cap: 'How the Manicouagan ring formed, from impact to reservoir.' },
      { h: 'A rock from space' },
      'About 214 million years ago, an <b>asteroid</b> about five kilometres wide slammed into the area at tremendous speed. The impact released more energy than all the bombs ever made by humans. It blasted out a crater about 100 kilometres wide and melted the rock beneath it. The ground in the centre rebounded upward, like the splash in the middle when a drop hits water.',
      { h: 'Shaped by ice and people' },
      'Over millions of years, the crater changed. Thick glaciers moved across it during the ice ages, grinding away the land. The hard, melted rock in the centre wore away more slowly than the rock around it, leaving a high central area and a low ring around it. Water filled parts of the ring, creating two curved lakes.',
      'Then, in the 1960s, Hydro-Québec built the huge Daniel-Johnson Dam nearby to produce electricity. The dam flooded the ring, joining the lakes into one circular reservoir. The centre became René-Levasseur Island, one of the largest lake islands in the world.',
      { box: 'Impact craters', text: 'Earth has about 200 known impact craters. Many are hidden by erosion, forests or water. The Moon’s craters are easy to see because it has no wind or rain.' },
      'Visitors to the area can still find clues to the impact. Some rocks near the centre are made of shattered pieces of older rock that were melted and welded together by the blast. Geologists collect these rocks to measure their age and to learn how hot and how powerful the impact was.',
      { h: 'A record in rock' },
      'Scientists study craters like Manicouagan to learn how often large rocks from space hit Earth and what they do to life. Today, space agencies track <b>asteroids</b> that pass near our planet. In 2022, a NASA spacecraft deliberately crashed into a small asteroid to test whether its path could be changed. It worked. One day, that knowledge could <b>protect</b> our planet from another impact.'
    ],
    guide: { before: 'Drop a marble into a tray of flour and look at the crater. Teach <b>asteroid</b>, <b>protect</b> and the word reservoir (a lake that stores water, often made by a dam).',
      after: 'Find Manicouagan on a map of Quebec. Look at a satellite photo together and find the island.' },
    words: [['asteroid', 'a rocky object that travels around the Sun'], ['protect', 'to keep safe from harm']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the events in order.',
        items: ['Glaciers grind the land.', 'An asteroid strikes.', 'A dam floods the ring.', 'The blast digs a crater.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why does the centre stand higher than the ring?',
        opts: ['Its hard rock wore away more slowly.', 'People built it up.', 'It is a volcano.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'An <b>asteroid</b> is …',
        opts: ['a rocky object that travels around the Sun', 'a dam', 'a glacier'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How did people help shape the reservoir we see today?',
        a: 'Hydro-Québec built a dam that flooded the ring, joining two lakes into one circle.', look: 'dam flooded the ring' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The author compares the centre rebounding to “the splash in the middle when a drop hits water.” Why is this helpful?',
        a: 'It helps readers picture how the ground bounced up in the middle after the hit.', look: 'helps picture the bounce' },
      { k: 'choice', code: 'C2.2', q: 'Why might a reader choose this passage?',
        opts: ['to learn how a crater on Earth formed', 'to learn to fish', 'to plan a garden', 'to read a poem'], a: 0 },
      { k: 'lines', code: 'C2.7', n: 2, q: 'What helped you most to understand how the ring formed: the diagram, the photo or the text? Why?',
        a: 'The diagram, because it showed the four steps in order.', look: 'a choice and a reason' }
    ]
  });

  P.add({
    id: 'g6-drones', subject: 'tech', form: 'Explanation',
    title: 'Four Rotors, One Drone',
    deck: 'How a quadcopter flies, and the rules for flying one safely',
    hero: {
      photo: 'g6-drone.jpg', credit: 'Photo: Josh Sorenson, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A quadcopter drone in flight. Its four rotors work together to lift, turn and steer it.'
    },
    body: [
      'A drone hovers in the air, perfectly still, then zips sideways, climbs, spins and lands gently on a patio. It has no wings and no pilot on board. How does it do it? Most small drones are <b>quadcopters</b>: aircraft with four spinning rotors.',
      { fig: '<rect class="k" x="130" y="50" width="40" height="40" rx="6"/><path class="k" d="M130 50 L90 20 M170 50 L210 20 M130 90 L90 120 M170 90 L210 120"/>' +
          [[90, 20, '↻'], [210, 20, '↺'], [90, 120, '↺'], [210, 120, '↻']].map(function (r) { return '<circle class="t" cx="' + r[0] + '" cy="' + r[1] + '" r="18"/>' + G.T(r[0], r[1] + 6, r[2], 'lb', 'middle'); }).join('') +
          G.T(150, 74, 'body', 'n', 'middle') + G.T(20, 74, 'front ↑', 'n') + G.T(150, 152, 'Opposite rotors spin the same way.', 'n', 'middle'),
        tall: 158, cap: 'Two rotors spin clockwise and two spin counter-clockwise, so the drone does not twist.' },
      { h: 'Lift and balance' },
      'Each rotor is a small propeller. As it spins, its angled blades push air downward, and the air pushes the drone up. This upward force is called thrust. When the four rotors together push up with more force than the drone’s weight, it climbs. When they push with exactly the same force as its weight, it hovers.',
      'But a spinning rotor also tries to twist the drone in the opposite direction. That is why two rotors spin clockwise and two spin counter-clockwise. Their twists cancel each other out, and the drone stays steady.',
      { h: 'Steering without a steering wheel' },
      'To move, the drone changes the speed of its rotors. To fly forward, the back rotors speed up and the front rotors slow down. The drone tilts forward, and some of its thrust now pushes it ahead. To turn, it speeds up one pair of rotors that spin the same way, and the drone rotates. A tiny computer inside makes hundreds of adjustments every second, using <b>sensors</b> that feel tilt and speed.',
      { box: 'Know the rules', text: 'In Canada, drones over 250 grams must be registered, and pilots need a certificate. Fly below 122 metres, keep the drone in sight and stay far from airports.' },
      { h: 'Useful flyers' },
      'Drones are more than toys. Search-and-rescue teams use drones with heat cameras to find lost hikers at night. Farmers fly them over fields to spot thirsty crops. In some remote northern communities, drones have been tested for delivering medical supplies. Scientists use them to count whales, check bridges and map forests after fires.',
      'With these benefits come responsibilities. Drones can invade people’s <b>privacy</b>, disturb wildlife or get in the way of aircraft. A good pilot always asks: is it safe, is it legal and is it respectful?'
    ],
    guide: { before: 'Spin a toy propeller or a paper helicopter. Teach <b>quadcopter</b> (quad = four), <b>sensors</b> and <b>privacy</b>.',
      after: 'Ask: which use of drones surprised you most? Talk about why drone rules exist.' },
    words: [['quadcopters', 'aircraft lifted by four spinning rotors'], ['sensors', 'devices that detect things such as tilt, speed or heat'], ['privacy', 'the right to keep things about yourself to yourself']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How many rotors spin clockwise?',
        opts: ['two', 'four', 'one'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Quad-</i> means four. A <b>quadcopter</b> has …',
        opts: ['four rotors', 'four wings', 'four pilots'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why do two rotors spin one way and two the other way?',
        a: 'A spinning rotor tries to twist the drone. Opposite spins cancel the twists, so the drone stays steady.', look: 'twists cancel; steady' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how a drone flies forward.',
        a: 'The back rotors speed up and the front ones slow down, so it tilts forward and some thrust pushes it ahead.', look: 'back faster; tilts; thrust forward' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart with uses from the text.', cols: ['Who uses drones', 'What for'],
        rows: [['Search-and-rescue teams', null], ['Farmers', null], ['Scientists', null]],
        a: [[null, 'to find lost hikers with heat cameras'], [null, 'to spot thirsty crops'], [null, 'to count whales or map forests']] },
      { k: 'choice', code: 'B3.2', q: 'In “the drone tilts forward,” the word <b>forward</b> tells …',
        opts: ['which way the drone tilts', 'who tilts', 'when it tilts', 'what colour it is'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why does the author end with three questions a good pilot asks?',
        a: 'To show that drones have benefits but also responsibilities, and to make readers think about flying safely and respectfully.', look: 'responsibilities; makes reader think' }
    ]
  });

  P.add({
    id: 'g6-tardigrades', subject: 'science', form: 'Report',
    title: 'The Toughest Animal on Earth',
    deck: 'Tiny water bears that can survive being dried out, frozen and sent to space',
    hero: {
      photo: 'g6-tardigrade.jpg', credit: 'Photo: DSparrow14, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A tardigrade seen under a microscope. In real life, it is smaller than the dot on this i.'
    },
    body: [
      'Scoop up a clump of damp moss from a tree trunk or a sidewalk crack, soak it in water and look at it under a microscope. You might see a plump little creature with eight stubby legs, lumbering along like a tiny bear. This is a tardigrade, also called a water bear. It may be the toughest animal on Earth.',
      { fig: G.T(4, 10, 'What tardigrades have survived in experiments', 'n') +
          [['Drying out', 'for about 10 years'], ['Freezing', 'close to −272 °C'], ['Heating', 'up to about 150 °C, briefly'], ['Outer space', 'about 10 days']].map(function (r, i) { return G.T(10, 34 + i * 24, r[0], 'lb') + G.T(110, 34 + i * 24, r[1], 'l'); }).join(''),
        tall: 116, cap: 'Tardigrades can survive these conditions only in their dried-up, tun state.' },
      { h: 'Small but everywhere' },
      'Tardigrades are <b>microscopic</b>: most are less than half a millimetre long, too small to see without a microscope. Scientists have described more than 1&nbsp;000 kinds. They live in moss, leaf litter, soil, lakes and the deep ocean, from the tops of mountains to Antarctic ice. They eat by piercing plant cells or tiny animals with sharp mouthparts and sucking out the insides.',
      { h: 'The tun trick' },
      'When their home dries out, tardigrades do something amazing. They pull in their legs and head, curl into a dry little ball called a tun, and replace much of the water in their bodies with special sugars and proteins. Their <b>metabolism</b>, the chemical activity that keeps them alive, slows to almost nothing. In this state, they can wait for years. Add water, and within hours they uncurl and walk away.',
      'In the tun state, tardigrades have survived temperatures colder than anywhere on Earth and hotter than boiling water. In 2007, scientists sent dried tardigrades into space on a satellite. They spent ten days exposed to the vacuum and radiation of space. When they came back to Earth and were given water, some revived and even laid eggs.',
      { box: 'Not invincible', text: 'Active tardigrades are fragile. Their super-survival works only when they are dried out, and only for limited times.' },
      { h: 'What we can learn' },
      'Scientists study tardigrades to find out how cells can survive without water. One day, their tricks might help store vaccines without refrigeration, protect astronauts from radiation or keep crops alive in droughts. Not bad for a creature you could fit hundreds of on a fingernail.',
      'You do not need a laboratory to find one. Many students have found tardigrades in moss from their own schoolyards, using an inexpensive microscope, a little patience and a dish of water. Look for a slow, chubby shape climbing over the bits of plant. Once you spot your first water bear, you may never look at moss the same way again.'
    ],
    guide: { before: 'If you have a microscope or magnifier, look at damp moss. Teach <b>microscopic</b>, <b>metabolism</b> and the word revive.',
      after: 'Ask: which of the tardigrade’s survival records surprised you most? Why might scientists want to copy their tricks?' },
    words: [['microscopic', 'so small it can only be seen with a microscope'], ['metabolism', 'the chemical activity in a living thing that keeps it alive']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. How long have tardigrades survived in space?',
        opts: ['about 10 days', 'about 10 years', 'one hour'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: '<i>Micro-</i> means very small. <b>Microscopic</b> means …',
        opts: ['too small to see without a microscope', 'very large', 'very old'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number the steps of the tun trick.',
        items: ['Its home dries out.', 'It curls into a tun.', 'Water returns.', 'The tardigrade uncurls and walks away.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How does the tun state help tardigrades survive?',
        a: 'They replace water with sugars and proteins and slow their metabolism almost to nothing, so they can wait for years.', look: 'replace water; slow metabolism' },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why does the author include the box “Not invincible”?',
        a: 'To show that tardigrades are only super-tough when dried out, so readers do not think they can survive anything.', look: 'limits of survival' },
      { k: 'choice', code: 'C3.3', q: 'How might tardigrades help people one day?',
        opts: ['by helping store vaccines without refrigeration', 'by pulling sleds', 'by making honey', 'by cleaning moss'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What is another animal you know that survives harsh conditions? How?',
        a: 'Wood frogs freeze solid in winter and thaw in spring.', look: 'an animal and a strategy' }
    ]
  });

  P.add({
    id: 'g6-new-france', subject: 'history', form: 'Report',
    title: 'Life in New France',
    deck: 'Long, narrow farms, a river highway and a French colony that shaped Canada',
    hero: {
      photo: 'g6-place-royale.jpg', credit: 'Photo: Wilfredor, CC0, Wikimedia Commons', focus: '50% 55%',
      tall: 220,
      cap: 'Place Royale in Quebec City, near where Samuel de Champlain built his first trading post in 1608.'
    },
    body: [
      'In 1608, the French explorer Samuel de Champlain built a wooden fort and trading post on the shore of the St. Lawrence River, at a place the Indigenous people called Kebec, meaning “where the river narrows.” It became Quebec City, the heart of a French colony called New France. For the next 150 years, French settlers farmed, traded and built communities along the river.',
      { fig: '<path class="t" d="M4 128 Q150 112 296 128"/>' + G.T(150, 146, 'St. Lawrence River', 'lb', 'middle') +
          [0, 1, 2, 3, 4, 5].map(function (i) { var x = 14 + i * 46; return '<rect class="' + (i === 2 ? 'h' : 'k') + '" x="' + x + '" y="12" width="40" height="104"/>'; }).join('') +
          G.T(126, 8, 'one habitant’s farm', 'n') + D.arrow(140, 12, 140, 28, 't'),
        tall: 152, cap: 'Farms were long and narrow so that every family had a piece of the river.' },
      { h: 'A river highway' },
      'In New France, there were almost no roads. The St. Lawrence River was the highway. People travelled by canoe and boat in summer, and by sleigh on the ice in winter. Fur traders paddled far inland to trade with First Nations, especially the Wendat and the Anishinaabe, who supplied beaver furs in exchange for metal tools, kettles and cloth.',
      { h: 'Long, narrow farms' },
      'The king of France granted large pieces of land, called seigneuries, to landowners called seigneurs. The seigneurs divided the land among farming families, called <b>habitants</b>. The farms were long and narrow, stretching back from the river. That way, every family had a small piece of riverbank for travel, fishing and water, as well as fields and forest behind. Seen from above, the land looked like a row of ribbons. You can still see this pattern along the St. Lawrence today.',
      'Habitants worked hard. They cleared forests, grew wheat, peas and vegetables, and raised cows and pigs. They paid the seigneur a small rent, often in grain or chickens, and used his mill to grind their flour. Most families were large, with many children to help on the farm.',
      { box: 'The King’s Daughters', text: 'Between 1663 and 1673, about 800 young women came from France to settle and start families. Millions of people today descend from them.' },
      { h: 'A lasting legacy' },
      'In 1763, after a war between Britain and France, New France came under British rule. But the habitants did not disappear. In 1774, Britain passed a law allowing them to keep their language, their religion and their system of laws. Today, the French language and culture of Quebec, and of francophone communities across Canada, carry on the <b>heritage</b> of New France.'
    ],
    guide: { before: 'Find Quebec City and the St. Lawrence River on a map. Teach <b>habitants</b>, <b>heritage</b> and the word seigneur.',
      after: 'Ask: why were farms long and narrow? Find francophone communities in Ontario on a map.' },
    words: [['habitants', 'farming families in New France'], ['heritage', 'traditions passed down from the past']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What did every farm touch?',
        opts: ['the river', 'a road', 'a city'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Habitants</b> were …',
        opts: ['farming families', 'kings', 'fur traders from Britain'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why were the farms in New France long and narrow?',
        a: 'So every family had a piece of riverbank for travel, fishing and water, plus fields and forest behind.', look: 'river access for every family' },
      { k: 'lines', code: 'C3.3', n: 2, q: 'Why was the river called a highway?',
        a: 'There were almost no roads, so people travelled on it by canoe, boat or sleigh.', look: 'no roads; travelled on river' },
      { k: 'choice', code: 'C3.4', q: 'What did First Nations traders receive in exchange for furs?',
        opts: ['metal tools, kettles and cloth', 'land', 'farms', 'horses'], a: 0 },
      { k: 'choice', code: 'C1.5', q: 'The land looked “like a row of ribbons.” This comparison helps you picture …',
        opts: ['long, thin strips side by side', 'round fields', 'mountains', 'a city'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 2, q: 'What French words or places do you know in Canada? How might they connect to New France?',
        a: 'Detroit and Sault Ste. Marie have French names because French explorers and traders went there.', look: 'a French name and a link' }
    ]
  });

  P.add({
    id: 'g6-treaty-9', subject: 'history', form: 'Report',
    title: 'Two Views of One Treaty',
    deck: 'Treaty 9 in northern Ontario, and why the spoken promises matter',
    hero: {
      photo: 'g6-treaty-9.jpg', credit: 'Photo: Government of Canada, Public domain, Wikimedia Commons', focus: '50% 30%',
      tall: 220,
      cap: 'The written text of the James Bay Treaty, also called Treaty 9.'
    },
    body: [
      'In the summer of 1905, a group of officials set out by canoe from northern Ontario. They paddled for weeks, from one Cree and Anishinaabe community to the next, along rivers flowing toward James Bay. They carried a written document and money to pay at each stop. Their task was to sign a <b>treaty</b>, an agreement between nations, with the people who had lived on this land for thousands of years.',
      { fig: '<rect class="k" x="6" y="6" width="138" height="128" rx="6"/><rect class="k" x="156" y="6" width="138" height="128" rx="6"/>' +
          G.T(75, 24, 'The written text', 'lb', 'middle') + G.T(225, 24, 'What many', 'lb', 'middle') + G.T(225, 38, 'Elders remember', 'lb', 'middle') +
          [['land given up', 'forever'], ['hunting may be limited', 'by government'], ['$8, then $4 a year']].map(function (r, i) { return G.T(16, 50 + i * 32, '• ' + r[0], 'l') + (r[1] ? G.T(24, 63 + i * 32, r[1], 'l') : ''); }).join('') +
          [['land would be shared'], ['hunting and fishing', 'would never change'], ['a lasting friendship']].map(function (r, i) { return G.T(166, 58 + i * 26, '• ' + r[0], 'l') + (r[1] ? G.T(174, 71 + i * 26, r[1], 'l') : ''); }).join(''),
        tall: 140, cap: 'The written treaty and the spoken promises did not match.' },
      { h: 'What the paper said' },
      'The written treaty said that the First Nations would “cede, release, surrender and yield up” a huge area of northern Ontario to the government. In return, each person would receive eight dollars at signing and four dollars every year after. Communities would get reserves, small areas of land set aside for them, as well as schools. The paper also said that hunting and fishing could be limited by future government rules.',
      { h: 'What people heard' },
      'But the treaty was written in English, and few of the people signing could read it. It was explained to them out loud, through interpreters. Many First Nations Elders say that what their ancestors heard was very different. They understood that they would share the land, not give it away, and that their way of life on the land would never be taken from them. One commissioner’s own diary suggests that promises were made that were not in the written text.',
      { box: 'Oral history', text: 'Many First Nations keep their history through stories passed carefully from Elders to young people. This oral history is an important record of the treaties.' },
      { h: 'Why it matters today' },
      'Today, Treaty 9 covers about two-thirds of Ontario’s land. When governments or companies want to build mines, roads or dams in the North, the meaning of the treaty becomes very important. Courts in Canada have ruled that treaties must be read the way the First Nations would have understood them, and that governments must keep their promises honourably.',
      'Treaties are not just old documents. They are living agreements that set out how people should share the land. As many people say, “We are all treaty people,” and each of us has a part in the <b>relationship</b>.'
    ],
    guide: { before: 'Find James Bay and northern Ontario on a map. Teach <b>treaty</b>, <b>relationship</b>, cede and oral history. Ask: whose land do you live on?',
      after: 'Find out which treaty covers the land where you live. Talk about why it matters when a written agreement and a spoken one do not match.' },
    words: [['treaty', 'a formal agreement between nations'], ['relationship', 'the way people or groups are connected and treat each other']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What did many Elders say about the land?',
        opts: ['It would be shared.', 'It was given up forever.', 'It was sold for $8.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>treaty</b> is …',
        opts: ['a formal agreement between nations', 'a canoe trip', 'a kind of map'], a: 0 },
      { k: 'table', code: 'C3.5', q: 'Compare the two views.', cols: ['Topic', 'Written text', 'Many Elders’ memory'],
        rows: [['Land', null, null], ['Hunting and fishing', null, null]],
        a: [[null, 'given up forever', 'shared'], [null, 'could be limited by government', 'would never change']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why might the people signing have understood the treaty differently from the written words?',
        a: 'It was written in English, few could read it, and it was explained out loud through interpreters.', look: 'English; could not read; interpreters' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why does oral history matter in understanding Treaty 9?',
        a: 'Elders’ stories record what the First Nations heard and agreed to, which may not be in the written text.', look: 'records what people understood' },
      { k: 'choice', code: 'C3.6', q: 'What does “We are all treaty people” mean?',
        opts: ['Everyone living on treaty land shares in the agreement.', 'Only lawyers read treaties.', 'Treaties are old and forgotten.', 'Only First Nations need treaties.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'The title is “Two Views of One Treaty.” Whose voices does the author include? Whose might still be missing?',
        a: 'The written treaty, Elders’ memories and the courts; the voices of the officials themselves are mostly missing.', look: 'voices included and missing' }
    ]
  });

  P.add({
    id: 'g6-winter-road', subject: 'social', form: 'Report',
    title: 'Roads Made of Ice',
    deck: 'How winter roads connect northern Ontario communities, and why they are in trouble',
    hero: {
      photo: 'g6-winter-road.jpg', credit: 'Photo: Rev40, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Vehicles crossing the frozen Albany River on a winter road in northern Ontario.'
    },
    body: [
      'For most of the year, more than 30 First Nations communities in Ontario’s Far North cannot be reached by road. Everything they need, from food to fuel to building supplies, must arrive by plane, which is very expensive. But for a few weeks each winter, something remarkable happens. Frozen lakes, rivers and swamps become a network of roads made of ice and packed snow.',
      { fig: G.T(4, 10, 'Clear ice needed (approximate safety guide)', 'n') +
          G.bars([['Person walking', 15, '15 cm'], ['Snowmobile', 20, '20 cm'], ['Car', 30, '30 cm'], ['Loaded truck', 100, 'about 1 m']], 100, { x0: 98, top: 22, gap: 24, pad: 54, hl: 3 }),
        tall: 120, cap: 'Heavier loads need much thicker ice. Never go on ice without checking with local experts.' },
      { h: 'Building a road of ice' },
      'Building a winter road takes skill. In December, crews from the communities plow the snow off lakes and swamps so the cold can reach the ice and thicken it. Sometimes they pump water onto the surface to build it up layer by layer. They drill holes to measure the thickness. Only when the ice is thick enough can trucks carrying heavy loads cross safely. The roads usually open in late January and close by late March.',
      { h: 'A lifeline' },
      'Ontario has more than 3&nbsp;000 kilometres of winter roads. During their short season, trucks deliver a whole year’s worth of fuel, building materials for new houses, and bulky goods such as furniture and vehicles. Families drive out to visit relatives, shop in bigger towns and attend sports tournaments. For many communities, the winter road is a <b>lifeline</b>.',
      { box: 'Slow and steady', text: 'Trucks on ice roads drive slowly. Speeding creates waves under the ice that can crack it.' },
      { h: 'A shrinking season' },
      'As the climate warms, winters in the North are getting shorter and milder. Some years, the ice is too thin to open the roads until February, and they must close early when warm spells arrive. Trucks have broken through the ice. When a road cannot open, communities must fly in supplies at a much higher cost, and building projects are delayed.',
      'Many First Nations leaders are calling for all-season roads, built on solid land, that would connect their communities year-round. Others worry about the effects of new roads on the land and animals. Communities are working with governments to decide how to stay <b>connected</b> in a changing climate.'
    ],
    guide: { before: 'Find the Far North of Ontario and the Albany River on a map. Teach <b>lifeline</b> and <b>connected</b>. Stress that ice safety must be checked by experts.',
      after: 'Ask: how would your life change if your town could be reached by road for only two months a year?' },
    words: [['lifeline', 'something people depend on to survive'], ['connected', 'joined or linked to other places or people']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. About how thick must ice be for a loaded truck?',
        opts: ['about 1 m', '15 cm', '30 cm'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>lifeline</b> is …',
        opts: ['something people depend on', 'a fishing line', 'a road sign'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why do crews plow snow off the ice before building a road?',
        a: 'So the cold can reach the ice and make it thicker.', look: 'cold reaches ice; thickens' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain how a warming climate affects winter roads.',
        a: 'Shorter, milder winters mean thinner ice, so roads open later and close earlier, and supplies must be flown in at higher cost.', look: 'thinner ice; shorter season; higher cost' },
      { k: 'table', code: 'C3.5', q: 'Fill in the chart.', cols: ['View about all-season roads', 'Reason'],
        rows: [['Some want them.', null], ['Some worry about them.', null]],
        a: [[null, 'They would connect communities year-round.'], [null, 'They could harm the land and animals.']] },
      { k: 'choice', code: 'B3.1', q: 'Which sentence is complex: a main idea plus a part beginning with <i>when</i> that cannot stand alone?',
        opts: ['When a road cannot open, communities must fly in supplies.', 'Trucks drive slowly.', 'Ontario has many roads.', 'Building a road takes skill.'], a: 0 },
      { k: 'lines', code: 'C2.1', n: 2, q: 'What did you already know about ice safety? How did it help you understand this passage?',
        a: 'I knew thin ice can crack, so I understood why trucks need thick ice.', look: 'prior knowledge and how it helped' }
    ]
  });

  P.add({
    id: 'g6-tessellations', subject: 'math', form: 'Explanation',
    title: 'Tiles That Never End',
    deck: 'Which shapes fit together with no gaps, and why',
    hero: {
      photo: 'g6-tessellation.jpg', credit: 'Photo: Basile Morin, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 210,
      cap: 'A tessellation made from one shape, the word “Yes,” turned and repeated with no gaps.'
    },
    body: [
      'Look at a tiled floor, a brick wall or a honeycomb. Each one is made of shapes that fit together perfectly, with no gaps and no overlaps, and could go on forever in every direction. A pattern like this is called a <b>tessellation</b>.',
      { fig: '<path class="k" d="M10 20 H50 V60 H10 Z M50 20 H90 V60 H50 Z M10 60 H50 V100 H10 Z M50 60 H90 V100 H50 Z"/><circle class="a" cx="50" cy="60" r="4"/>' + G.T(50, 120, '4 × 90° = 360°', 'n', 'middle') +
          '<path class="k" d="M150 60 L170 25 L190 60 L170 95 Z M150 60 L130 25 L170 25 M150 60 L130 95 L170 95 M150 60 L110 60 L130 25 M110 60 L130 95"/><circle class="a" cx="150" cy="60" r="4"/>' + G.T(150, 120, '6 × 60° = 360°', 'n', 'middle') +
          '<path class="k" d="M230 30 L255 22 L270 45 L255 66 L230 58 Z M230 58 L255 66 L250 92 L222 96 L210 72 Z"/>' + G.T(250, 120, '3 × 108° = 324°', 'n', 'middle') + G.T(250, 134, 'gap!', 'lb', 'middle'),
        tall: 140, cap: 'At each corner, the angles must add up to exactly 360°. Squares and triangles do; regular pentagons do not.' },
      { h: 'The 360° rule' },
      'Why do some shapes tessellate and others do not? Look at any point where corners meet. The angles around that point must add up to exactly 360 degrees, a full turn. A square has 90° angles, and four squares fit around a point: 4 × 90° = 360°. An equilateral triangle has 60° angles, and six fit: 6 × 60° = 360°. A regular hexagon has 120° angles, and three fit: 3 × 120° = 360°.',
      'A regular pentagon has angles of 108°. Three pentagons make 324°, leaving a gap. Four would make 432°, too much to fit. So regular pentagons cannot tessellate on their own.',
      { h: 'Moving shapes' },
      'Tessellations are built using <b>transformations</b>, ways of moving a shape without changing its size or shape. A translation slides a shape. A reflection flips it over a line, like a mirror image. A rotation turns it around a point. The word tessellation in the photo uses rotations: each copy of the word is turned to fit snugly against its neighbours.',
      { box: 'Nature’s choice', text: 'Bees build hexagon cells. Hexagons tessellate and use the least wax to hold the most honey.' },
      { h: 'Artists and tiles' },
      'People have made tessellations for thousands of years. Builders in ancient Rome made floors from tiny tiles. Artists in the Islamic world created breathtaking patterns of stars and polygons on palaces and mosques. Quilt makers sew squares and triangles into repeating designs. In the 1900s, the Dutch artist M. C. Escher turned tessellations into birds, fish and lizards that interlock like puzzle pieces.',
      'You can make your own. Start with a square of card. Cut a shape out of one side and tape it to the opposite side. Trace it again and again, sliding it each time, and watch your new shape tile the page.'
    ],
    guide: { before: 'Gather pattern blocks or paper shapes. Teach <b>tessellation</b>, <b>transformations</b> and the words translation, reflection and rotation.',
      after: 'Make a tessellation using the cut-and-tape method. Check the 360° rule at a corner.' },
    words: [['tessellation', 'a pattern of shapes that fit together with no gaps or overlaps'], ['transformations', 'ways of moving a shape: sliding, flipping or turning']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Why don’t regular pentagons tessellate?',
        opts: ['Their angles leave a gap.', 'They are too big.', 'They have no corners.'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'How many regular hexagons fit around one point?',
        opts: ['3', '4', '6'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart.', cols: ['Shape', 'Angle', 'How many fit around a point'],
        rows: [['Square', '90°', null], ['Equilateral triangle', null, '6'], ['Regular hexagon', '120°', null]],
        a: [[null, null, '4'], [null, '60°', null], [null, null, '3']] },
      { k: 'choice', code: 'B2.2', q: 'A <b>reflection</b> moves a shape by …',
        opts: ['flipping it over a line', 'sliding it', 'turning it around a point', 'making it bigger'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think bees build hexagons instead of circles?',
        a: 'Hexagons tessellate with no gaps and use the least wax, but circles would leave gaps.', look: 'no gaps; less wax' },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Which part of the 360° rule did you find hardest? What did you do to understand it?',
        a: 'Why pentagons do not fit; I looked at the diagram and added the angles.', look: 'a part and a strategy' },
      { k: 'lines', code: 'C2.5', n: 2, q: 'Where have you seen a tessellation in your home or community?',
        a: 'The bathroom floor has hexagon tiles.', look: 'a real example' }
    ]
  });

  P.add({
    id: 'g6-sugar', subject: 'health', form: 'Media article',
    title: 'How Much Sugar Is in That?',
    deck: 'Reading labels to find the sugar hidden in drinks',
    hero: {
      photo: 'g6-soft-drink-sugar.jpg', credit: 'Photo: SSgt Nathanel Callon, Public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'Sugar pouring out of a soft-drink can shows how much sugar one drink can hold.'
    },
    body: [
      'It is a hot afternoon, and you are thirsty. In the store fridge, the choices glow in bright colours: cola, iced tea, sports drinks, juice, chocolate milk, water. The ads promise energy, fun or a “natural” taste. But how much sugar is really inside? The answer is printed on every bottle, if you know where to look.',
      { fig: G.T(4, 10, 'Sugar in some drinks (approximate, grams)', 'n') +
          G.bars([['Cola, 355 mL', 39, '39 g'], ['Iced tea, 500 mL', 40, '40 g'], ['Juice, 250 mL', 22, '22 g'], ['Water', 0, '0 g']], 40, { x0: 112, top: 22, gap: 24, pad: 36, hl: 0 }),
        tall: 120, cap: 'Amounts vary by brand. Always check the label.' },
      { h: 'Reading the label' },
      'Every packaged drink in Canada has a Nutrition Facts table. Near the bottom, it lists sugars in grams. To picture what that means, divide by four, because a teaspoon of sugar weighs about four grams. A can of cola with 39 grams of sugar holds about ten teaspoons. Imagine spooning ten teaspoons of sugar into a glass of water and drinking it.',
      'The label also shows the % Daily Value. This tells you how much of a whole day’s suggested limit is in one serving. Five percent or less is a little; 15 percent or more is a lot. Many soft drinks have 40 percent or more of a day’s sugar in one can.',
      { h: 'Why it matters' },
      'Your body uses sugar for energy, but too much added sugar can lead to tooth decay and other health problems over time. Sugary drinks are especially easy to overdo, because liquid sugar does not make you feel full. Canada’s food guide says to make water your drink of choice.',
      { box: 'Read the fine print', text: 'Words such as glucose, fructose, syrup and dextrose on an ingredient list are all kinds of sugar.' },
      { h: 'The ads and the facts' },
      'Drink companies spend huge amounts on advertising. Ads may show athletes, bright fruit or smiling friends. A label may say “made with real fruit” or “vitamin-enhanced.” These messages are designed to make a drink seem healthy or exciting. They are not lies, but they may not tell the whole story. A <b>critical</b> reader looks past the picture and checks the numbers.',
      'Next time you choose a drink, flip the bottle and read the label. You may find that plain water, milk, or water with a slice of lemon is the smartest choice of all. Making an <b>informed</b> choice means you decide, not the advertisement.'
    ],
    guide: { before: 'Bring two or three drink containers and find the Nutrition Facts table together. Teach <b>critical</b>, <b>informed</b> and the phrase % Daily Value.',
      after: 'Measure out the teaspoons of sugar in one drink using real sugar. Ask: what did the ad want you to believe?' },
    words: [['critical', 'thinking carefully and questioning, not just accepting'], ['informed', 'having the facts you need']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. Which drink has no sugar?',
        opts: ['water', 'orange juice', 'cola'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'About how many grams are in one teaspoon of sugar?',
        opts: ['4', '10', '39'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'An iced tea has 40 grams of sugar. About how many teaspoons is that? Show your thinking.',
        a: '40 ÷ 4 = 10, so about 10 teaspoons.', look: 'divide by 4; about 10' },
      { k: 'choice', code: 'A2.4', q: 'A drink label says “made with real fruit.” What should a critical reader do?',
        opts: ['check the sugar in the Nutrition Facts table', 'believe it is healthy', 'buy two', 'ignore the label'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Why might a drink company show athletes in its ads?',
        a: 'To make the drink seem healthy and exciting, so people want to buy it.', look: 'seem healthy; sell more' },
      { k: 'choice', code: 'C1.2', q: 'This text helps readers understand advertising and labels. It is mainly a …',
        opts: ['media article', 'poem', 'story', 'letter'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 2, q: 'Will this passage change how you choose a drink? Explain.',
        a: 'Yes. I will check the sugar on the label before I buy.', look: 'a change and a reason' }
    ]
  });

  P.add({
    id: 'g6-red-fox', subject: 'story', form: 'Fable',
    title: 'The Fox and the Frozen Pond',
    deck: 'An original fable about pride, patience and listening to others',
    hero: {
      photo: 'g6-red-fox.jpg', credit: 'Photo: In india travel, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'A red fox hunting in deep snow.'
    },
    body: [
      'At the edge of a northern forest, where the spruce trees leaned under their coats of snow, lived a red fox named Ember. She was the quickest hunter in the valley, and she knew it. Her tail flashed like a flame across the white fields, and the other animals stepped aside when she passed.',
      { fig: G.flow(['Ember boasts', 'Ember ignores the warnings', 'The ice cracks', 'Ember learns to listen'], { top: 6, bh: 24, gap: 10, hl: 2 }),
        tall: 140, cap: 'The fable’s plot, from beginning to lesson.' },
      { h: 'A warning' },
      'One grey morning in late March, Ember spotted a fat hare on the far side of the pond. The quickest path was straight across the ice. A raven perched on a dead pine called down to her. “The ice is soft, little fire. The sun has been warm for three days. Go around.”',
      'Ember laughed. “Around? That would take all morning. I have crossed this pond a hundred times.”',
      'An old muskrat poked his head from a hole near the shore. “The raven is right,” he said quietly. “Listen. You can hear the ice groaning.”',
      'But Ember did not listen. She was too <b>proud</b> to take advice from a bird and a muskrat. She trotted onto the pond with her head held high.',
      { h: 'The crack' },
      'Halfway across, the ice gave a loud crack, like a branch snapping. Ember froze. Dark water seeped up around her paws. Very slowly, she lay flat on her belly to spread out her weight, just as her mother had once taught her, and crept back the way she had come. When she reached the shore, she was shivering, wet and humbled. The hare, of course, was long gone.',
      'The raven said nothing. The muskrat simply nodded. Ember sat in the snow for a long time, watching the dark patch of water where she had nearly gone through.',
      { box: 'What is a fable?', text: 'A fable is a short story, often with animal characters, that teaches a lesson called a moral.' },
      'From that day on, Ember still hunted with speed, but she learned to pause. She listened to the creaks of the ice and the calls of the raven. Many springs later, when a young fox boasted about racing across the thawing river, Ember was the one who said, “Wait. Listen first.” And the young fox, seeing the grey in her <b>wise</b> old face, listened.'
    ],
    guide: { before: 'Teach <b>proud</b>, <b>wise</b> and the word moral. Ask: what do you know about fables?',
      after: 'Ask: what is the moral? Have the reader write a one-sentence moral of their own.' },
    words: [['proud', 'thinking very highly of yourself'], ['wise', 'having good sense from experience']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'This story is a fable because it …',
        opts: ['uses animals to teach a lesson', 'gives facts about foxes', 'is a poem'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>proud</b> fox thinks …',
        opts: ['very highly of herself', 'she is slow', 'she is lost'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The raven calls Ember “little fire.” Why?',
        opts: ['Her red tail looks like a flame.', 'She is warm.', 'She started a fire.', 'She is very small.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why did Ember not listen to the raven and the muskrat?',
        a: 'She was too proud to take advice from smaller animals and believed she knew best.', look: 'pride' },
      { k: 'lines', code: 'C3.3', n: 2, q: 'What did Ember do to get back to shore safely?',
        a: 'She lay flat on her belly to spread out her weight and crept back.', look: 'lay flat; crept back' },
      { k: 'lines', code: 'C3.6', n: 2, q: 'What is the moral of this fable? Write it in one sentence.',
        a: 'Listen to the advice of others before you act.', look: 'a lesson about listening' },
      { k: 'choice', code: 'C1.5', q: 'Why does the author end with Ember warning a young fox?',
        opts: ['to show she has truly changed', 'to start a new story', 'to describe the river', 'to make the story funny'], a: 0 }
    ]
  });

  P.add({
    id: 'g6-beekeeper', subject: 'science', form: 'Interview',
    title: 'Talking with a Beekeeper',
    deck: 'An imagined interview about honeybees, hives and why pollinators need our help',
    hero: {
      photo: 'g6-beekeeper.jpg', credit: 'Photo: Ich, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'A beekeeper lifts a frame from a hive to check on the bees.'
    },
    body: [
      'Rosa Martel keeps 40 hives of honeybees on a farm near Peterborough, Ontario. She is an imagined character, but the facts she shares are real. We asked her what it is like to work with more than a million bees.',
      { fig: G.cols([['Queen', 1, '1'], ['Drones', 3, 'hundreds'], ['Workers', 100, 'tens of thousands']], 100, { base: 112, h: 92, x0: 30, hl: 2 }),
        tall: 132, cap: 'In a summer hive, almost every bee is a female worker.' },
      { h: 'How did you become a beekeeper?' },
      '“When I was your age, my neighbour had two hives. He let me help, wearing a big white suit. The first time I held a frame full of buzzing bees, I was terrified. By the end of the summer, I was hooked.”',
      { h: 'Who lives in a hive?' },
      '“Each hive is a <b>colony</b>, a big family working together. There is one queen, who lays up to 2&nbsp;000 eggs a day. There are a few hundred drones, the males. And there are tens of thousands of workers, all female. Workers do everything else: they clean, guard the door, build wax comb, feed the young and fly out to collect nectar and pollen.”',
      { h: 'Why are bees important?' },
      '“As bees move from flower to flower, they carry pollen. That helps plants make fruit and seeds. In Ontario, apples, blueberries, cherries and pumpkins all depend on pollinators. Without bees, our grocery stores would look very different.”',
      { box: 'Did you know?', text: 'Honeybees are not native to Canada. Settlers brought them from Europe. Canada also has more than 800 kinds of wild, native bees.' },
      { h: 'What problems do bees face?' },
      '“Some winters, I lose many hives. Bees face tiny mites that spread disease, some pesticides, and a loss of wildflowers. When fields are all one crop, bees do not get a <b>varied</b> diet, and that weakens them.”',
      { h: 'What can young people do?' },
      '“Plant native flowers, like goldenrod and wild bergamot. Leave a corner of the yard a little wild. And when a bee lands near you, stay calm. She is just working.”',
      'Rosa also checks her hives every week in summer. She looks for eggs to make sure the queen is healthy, and for signs of disease. In autumn, she leaves plenty of honey in each hive so the bees can eat through the long Ontario winter.',
      'We thanked Rosa and left with a jar of golden honey and a new respect for the busy insects in the hive.'
    ],
    guide: { before: 'Teach <b>colony</b>, <b>varied</b> and pollinator. Point out that the speaker is imagined but the facts are real.',
      after: 'Ask: what question would you add to this interview? Plant or find a native flower.' },
    words: [['colony', 'a group of animals living and working together'], ['varied', 'of many different kinds']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'How can you tell this is an interview?',
        opts: ['questions as headings, answers in quotes', 'a list of steps', 'rhyming lines'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A <b>colony</b> is …',
        opts: ['a group living together', 'one bee', 'a kind of flower'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Use the chart. Which bees are there the most of?',
        opts: ['workers', 'drones', 'the queen', 'all the same'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Name three jobs that worker bees do.',
        a: 'Clean, guard the door, build comb, feed the young, collect nectar and pollen (any three).', look: 'any three jobs' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why would a field of only one crop be bad for bees?',
        a: 'Bees would not get a varied diet, so they would be weaker and less healthy.', look: 'no varied diet; weaker' },
      { k: 'choice', code: 'B3.3', q: 'Why are Rosa’s answers inside quotation marks?',
        opts: ['They are her exact spoken words.', 'They are titles.', 'They are questions.', 'They are not true.'], a: 0 },
      { k: 'lines', code: 'C2.2', n: 2, q: 'Why does the writer say Rosa is imagined? Why might a reader need to know that?',
        a: 'So readers know the person is invented, even though the facts are real, and do not think she is a real beekeeper.', look: 'honesty about the source' }
    ]
  });

  P.add({
    id: 'g6-petitclerc', subject: 'health', form: 'Biography',
    title: 'Chantal Petitclerc',
    deck: 'From a farm accident to 14 Paralympic gold medals and the Senate of Canada',
    hero: {
      photo: 'g6-petitclerc.jpg', credit: 'Photo: Lëa-Kim Châteauneuf, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 30%',
      tall: 220,
      cap: 'Chantal Petitclerc in 2017, the year after she was named to the Senate of Canada.'
    },
    body: [
      'Chantal Petitclerc was born in 1969 in Saint-Marc-des-Carrières, a small town in Quebec. When she was 13, a heavy barn door fell on her, injuring her spine. She would never walk again. Many people expected her life to become smaller. Instead, it became much bigger.',
      { fig: G.time([['1982', 'Spinal injury at 13'], ['1992', 'First Paralympic medals'], ['2004', 'Five gold in Athens'], ['2008', 'Five gold in Beijing'], ['2016', 'Named to the Senate']], { x: 60, top: 12, gap: 24, hl: 2 }),
        tall: 128, cap: 'Some key moments in Chantal Petitclerc’s life.' },
      { h: 'Finding the pool, then the track' },
      'At first, a teacher encouraged Chantal to try swimming. It made her stronger and showed her what her body could do. A few years later, a coach saw her and suggested wheelchair racing. Her first racing chair was homemade and heavy, and she lost her early races badly. But she loved the speed, and she trained hard.',
      'Training was not easy. Chantal pushed her chair for hours in all kinds of weather, lifted weights and studied videos of her races to find tiny ways to go faster. She also had to travel far from home to compete, often with little money. Each small improvement kept her going.',
      { h: 'A champion' },
      'Wheelchair racers push the rims of their wheels with gloved hands, reaching speeds of over 30 kilometres per hour. It takes huge strength, careful <b>technique</b> and years of practice. Chantal mastered all three. Over five Paralympic Games, she won 21 medals, 14 of them gold. At the 2004 Athens Games and again in Beijing in 2008, she won every race she entered.',
      { box: 'Paralympics', text: 'The Paralympic Games are top international games for athletes with disabilities, held right after the Olympics.' },
      { h: 'A voice for others' },
      'After retiring from racing, Chantal coached young athletes, including Canada’s Paralympic team as its chef de mission. She spoke at schools about setting goals and working through setbacks. In 2016, she was appointed to the Senate of Canada, where she helps review the country’s laws. She became the first Paralympian to serve there.',
      'Chantal has often said that her wheelchair is not a limit but a tool. She believes sport can help everyone, with or without a disability, feel strong and capable. Her story shows the power of <b>determination</b>, and of people who believe in you when you are just starting out.'
    ],
    guide: { before: 'Teach <b>technique</b>, <b>determination</b> and the word Paralympic. Ask: what does it take to become a champion?',
      after: 'Ask: who encouraged Chantal? Who encourages you? Talk about ways to make sport open to everyone.' },
    words: [['technique', 'a skilled way of doing something'], ['determination', 'refusing to give up on a goal']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When did she join the Senate?',
        opts: ['2016', '2004', '1992'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>Para</b>lympic, “para” here means …',
        opts: ['beside or alongside', 'under', 'against'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 2, q: 'Which sport did Chantal try first, and who encouraged her?',
        a: 'Swimming, encouraged by a teacher.', look: 'swimming; a teacher' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'She lost her early races badly. What does it tell you about her that she kept going?',
        a: 'She was determined and loved the sport, so she did not give up when it was hard.', look: 'determined; did not give up' },
      { k: 'choice', code: 'C1.3', q: 'How is most of this biography organized?',
        opts: ['in time order', 'problem and solution', 'compare and contrast', 'as a list of steps'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“Her wheelchair is not a limit but a tool” means …',
        opts: ['it helps her do things', 'it is broken', 'she uses it to fix things', 'she does not need it'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'What did you learn from Chantal’s story that you could use when something is hard for you?',
        a: 'Keep practising after a loss, and accept help from people who believe in you.', look: 'a personal lesson' }
    ]
  });

  P.add({
    id: 'g6-ev-charging', subject: 'science', form: 'Explanation',
    title: 'Plugging In a Car',
    deck: 'How electric vehicles store and use energy, and where that energy comes from',
    hero: {
      photo: 'g6-ev-charging.jpg', credit: 'Photo: Dillan Payne, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'A public charging station for electric vehicles in Bowmanville, Ontario.'
    },
    body: [
      'Most cars on Canadian roads burn gasoline. But more and more, you will see cars plugged into posts in parking lots, like phones on a charger. These are electric vehicles, or EVs. Instead of a gas tank, they carry a large battery, and instead of an engine, they use an electric motor.',
      { fig: G.flow(['Power station', 'Power lines', 'Charger and battery', 'Electric motor turns wheels'], { top: 6, bh: 24, gap: 10, hl: 2 }),
        tall: 140, cap: 'Energy travels from a power station to the wheels.' },
      { h: 'Changing energy from one form to another' },
      'Energy cannot be made or destroyed, but it can change form. In a power station, energy from falling water, wind, sunlight or a nuclear reaction is changed into electrical energy. Wires carry it to the charger. In the car, the battery stores the energy as chemical energy. When you press the pedal, the battery sends electricity to the motor, which changes it into motion, called mechanical energy.',
      'A gas engine wastes a lot of energy as heat. Only about a quarter of the energy in gasoline actually moves the car. An electric motor is far more <b>efficient</b>: most of the energy from the battery turns the wheels.',
      { box: 'Braking to charge', text: 'When an EV slows down, its motor can work backward like a generator, sending some energy back into the battery.' },
      { h: 'Where does the electricity come from?' },
      'An EV is only as clean as the electricity that charges it. In Ontario, most electricity comes from nuclear and water power, which give off very little carbon dioxide. In places that burn coal or natural gas to make electricity, charging an EV still causes pollution, just at the power station instead of the tailpipe.',
      { h: 'Challenges' },
      'EVs have challenges too. Batteries need minerals such as lithium and nickel, which must be mined, and mining affects the land. In cold Canadian winters, batteries hold less charge, so drivers cannot go as far. Charging takes longer than filling a tank, and in some rural and northern areas, chargers are still far apart.',
      'Engineers are working on batteries that charge faster and last longer, and on ways to recycle old ones. Choosing how we move is part of a much bigger question: how can we use energy in ways that are <b>sustainable</b>, so that future generations have what they need?'
    ],
    guide: { before: 'Teach <b>efficient</b>, <b>sustainable</b>, chemical energy and mechanical energy.',
      after: 'Ask: what forms of energy can you name? Trace the energy that powers a light in your home.' },
    words: [['efficient', 'wasting little energy, time or effort'], ['sustainable', 'able to continue without using up what future people need']],
    qs: [
      { k: 'order', code: 'C1.4', q: 'Use the diagram. Number the steps from 1 to 4.',
        items: ['power station', 'power lines', 'battery', 'motor turns the wheels'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'B2.2', q: 'An <b>efficient</b> motor …',
        opts: ['wastes little energy', 'is very loud', 'uses gasoline', 'is very old'], a: 0 },
      { k: 'table', code: 'C3.3', q: 'Name the form of energy at each point.', cols: ['Where', 'Form of energy'],
        rows: [['In the charger and wires', null], ['Stored in the battery', null], ['The turning wheels', null]],
        a: [[null, 'electrical'], [null, 'chemical'], [null, 'mechanical (motion)']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author say an EV is “only as clean as the electricity that charges it”?',
        a: 'If the electricity comes from burning coal or gas, there is still pollution, just at the power station.', look: 'pollution at power station' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Is this passage balanced? Give one benefit and one challenge of EVs from the text.',
        a: 'Yes. Benefit: more efficient. Challenge: mining for battery minerals or shorter range in cold.', look: 'one benefit and one challenge' },
      { k: 'choice', code: 'B3.2', q: 'In “the battery sends electricity to the motor,” what is the verb?',
        opts: ['sends', 'battery', 'motor', 'electricity'], a: 0 }
    ]
  });

  P.add({
    id: 'g6-sea-ice', subject: 'geography', form: 'Report',
    title: 'Where the Ice Meets the Sea',
    deck: 'Why Arctic sea ice matters to Inuit, animals and the whole planet',
    hero: {
      photo: 'g6-sea-ice-edge.jpg', credit: 'Photo: Doc Searls from Santa Barbara, USA, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'The edge of the sea ice, called the floe edge, in Nunavut.'
    },
    body: [
      'Every winter, the ocean around Canada’s Arctic freezes into a vast white plain. In spring, the ice breaks up, and in late summer it reaches its smallest size. This yearly rhythm has shaped life in the North for thousands of years. But the rhythm is changing.',
      { fig: G.cols([['1980s', 7, 'about 7'], ['2000s', 5.5, 'about 5.5'], ['2010s', 4.5, 'about 4.5']], 8, { base: 112, h: 92, x0: 40, hl: 2 }),
        tall: 132, cap: 'Average area of Arctic sea ice each September, in millions of square kilometres (rounded).' },
      { h: 'Ice as a highway and a home' },
      'For Inuit, sea ice is not empty. It is land to travel on, by snowmobile or dog team, from one community to another. It is where hunters wait by breathing holes for seals and where families camp in spring. Inuit have a rich vocabulary for ice, with words for new ice, thin ice, ice that is safe and ice that is dangerous. This knowledge is passed from Elders to young people.',
      'Animals depend on the ice too. Polar bears hunt seals from it. Ringed seals raise their pups in snow dens on top of it. Tiny algae grow on its underside, feeding small animals that feed fish, seals and whales.',
      { box: 'The floe edge', text: 'Where the ice meets open water, the floe edge, is one of the richest places in the Arctic for wildlife.' },
      { h: 'A warming Arctic' },
      'The Arctic is warming about three to four times faster than the planet as a whole. As the chart shows, there is much less ice in late summer than there was 40 years ago. Ice forms later in autumn and breaks up earlier in spring. It is also thinner.',
      'This has serious effects. Hunters fall through ice that was safe in their grandparents’ time. Polar bears must swim farther and go hungry longer. There is also a <b>feedback</b> loop: white ice reflects sunlight, but dark ocean water absorbs it, so less ice means more warming, which means even less ice.',
      { h: 'Watching and adapting' },
      'Inuit communities are leading the way in tracking these changes. In some places, hunters use GPS devices and share ice reports online, combining modern tools with traditional knowledge. Scientists now work alongside Inuit experts, because no one understands the ice better than those who live with it. Their <b>observations</b> help the whole world understand a changing planet.'
    ],
    guide: { before: 'Find Nunavut and the Arctic Ocean on a map. Teach <b>feedback</b>, <b>observations</b> and floe edge.',
      after: 'Ask: why are Inuit observations important to scientists? Talk about ways your family can save energy.' },
    words: [['feedback', 'when a result causes more of the same thing'], ['observations', 'things noticed by watching carefully']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. What happened to sea ice from the 1980s to the 2010s?',
        opts: ['It shrank.', 'It grew.', 'It stayed the same.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Observations</b> are things …',
        opts: ['noticed by watching', 'invented', 'forgotten'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two ways sea ice is important to Inuit.',
        a: 'Travelling between communities; hunting seals; camping in spring (any two).', look: 'any two uses' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the feedback loop in your own words.',
        a: 'Less white ice means dark water absorbs more sunlight, which warms the Arctic and melts more ice.', look: 'less ice → more warming → less ice' },
      { k: 'choice', code: 'C3.2', q: 'Inuit have many words for different kinds of ice. This suggests …',
        opts: ['ice knowledge is very important to them', 'they do not use ice', 'all ice is the same', 'ice is only for fun'], a: 0 },
      { k: 'choice', code: 'C2.3', q: 'If the Arctic keeps warming, what will most likely happen to polar bears?',
        opts: ['They will have a harder time hunting.', 'They will have more food.', 'They will move south to cities.', 'Nothing will change.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the passage in two sentences.',
        a: 'Sea ice is vital to Inuit and Arctic animals. It is shrinking fast as the Arctic warms, and Inuit and scientists are tracking the change together.', look: 'importance + shrinking + response' }
    ]
  });

  P.add({
    id: 'g6-snowshoes', subject: 'tech', form: 'Explanation',
    title: 'Walking on Top of Snow',
    deck: 'How Indigenous snowshoe designs solve a winter problem with science',
    hero: {
      photo: 'g6-snowshoes.jpg', credit: 'Photo: Daderot, CC0, Wikimedia Commons', focus: '50% 22%',
      tall: 220,
      cap: 'Snowshoes made in Canada between 1840 and 1870, now at the Bata Shoe Museum in Toronto.'
    },
    body: [
      'Try walking through deep, fresh snow in ordinary boots. With every step, you sink to your knees, and soon you are exhausted. For thousands of years, Indigenous peoples across northern North America solved this problem with a brilliant <b>invention</b>: the snowshoe.',
      { fig: '<rect class="k" x="20" y="40" width="40" height="20" rx="4"/>' + D.arrow(40, 70, 40, 112, 't') + G.T(40, 30, 'boot', 'lb', 'middle') + G.T(40, 128, 'sinks deep', 'n', 'middle') +
          '<ellipse class="h" cx="200" cy="50" rx="80" ry="22"/>' + D.arrow(150, 76, 150, 92, 't') + D.arrow(200, 76, 200, 92, 't') + D.arrow(250, 76, 250, 92, 't') +
          G.T(200, 30, 'snowshoe', 'lb', 'middle') + G.T(200, 112, 'weight spread out: stays on top', 'n', 'middle'),
        tall: 136, cap: 'The same weight, spread over a bigger area, presses less on each part of the snow.' },
      { h: 'The science of spreading out' },
      'A snowshoe works because of <b>pressure</b>, which is how much force pushes on each part of a surface. Your weight stays the same whether you wear boots or snowshoes. But a boot pushes all that weight onto a small area, so it presses hard and sinks. A snowshoe spreads the same weight over an area several times larger. Each bit of snow carries less weight, so you stay near the top.',
      { h: 'Frames, webbing and shape' },
      'Traditional snowshoes are made from a bent wooden frame, often ash or birch, steamed so it can curve without breaking. The inside is woven with strips of rawhide, called babiche, in a tight web. The web holds the snow up while letting loose powder fall through, so snow does not pile on top and make the shoe heavy.',
      'Different nations designed different shapes for different conditions. In open, flat country with deep powder, long, narrow snowshoes with an upturned toe glide well. In thick forests, short, round “bear paw” snowshoes turn easily between trees. The shape is matched to the land.',
      { box: 'A family skill', text: 'Making snowshoes takes many days. In many communities, the skill is still taught from Elders to young people.' },
      { h: 'From survival to sport' },
      'Snowshoes made winter travel and hunting possible. Without them, following caribou or moose across deep snow would have been nearly impossible. European fur traders quickly learned to use and value them. Without Indigenous snowshoes, and the people who taught their use, the fur trade could not have reached so far into the North.',
      'Today, many snowshoes have aluminum frames and plastic decks, but they still use the same idea. People snowshoe for fun, for exercise and to explore quiet winter forests. Each time they do, they are using knowledge that Indigenous designers developed long ago.'
    ],
    guide: { before: 'Teach <b>invention</b>, <b>pressure</b> and the word babiche. Ask: why is it hard to walk in deep snow?',
      after: 'Test it: press a pencil point and then a flat eraser into modelling clay with the same push. Which sinks deeper?' },
    words: [['invention', 'a new thing someone designs and makes'], ['pressure', 'how much force pushes on each part of a surface']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Why does the boot sink?',
        opts: ['Its weight is on a small area.', 'It is heavier.', 'The snow is wet.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Pressure</b> is …',
        opts: ['force on each part of a surface', 'a kind of snow', 'a type of wood'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain in your own words how a snowshoe keeps you on top of the snow.',
        a: 'It spreads your weight over a bigger area, so each part of the snow carries less and you do not sink.', look: 'spreads weight; less pressure' },
      { k: 'table', code: 'C1.3', q: 'Compare the two snowshoe shapes.', cols: ['Shape', 'Best place to use it'],
        rows: [['Long and narrow', null], ['Short and round (bear paw)', null]],
        a: [[null, 'open, flat country with deep powder'], [null, 'thick forests']] },
      { k: 'choice', code: 'C1.1', q: 'In “The web holds the snow up,” what does <i>web</i> refer to?',
        opts: ['the woven rawhide strips', 'a spider’s web', 'the wooden frame', 'the internet'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does the passage show about Indigenous knowledge?',
        a: 'Indigenous designers understood science and the land, and their designs are still used today.', look: 'skill; science; still used' },
      { k: 'lines', code: 'C2.7', n: 2, q: 'Which strategy helped you most to understand the science part? Explain.',
        a: 'Looking at the diagram helped me see how the weight spreads out.', look: 'a strategy and how it helped' }
    ]
  });

  P.add({
    id: 'g6-halifax-explosion', subject: 'history', form: 'Report',
    title: 'The Halifax Explosion',
    deck: 'December 6, 1917: a disaster, a rescue and a gift that still travels south every year',
    hero: {
      photo: 'g6-halifax-explosion.jpg', credit: 'Photo: Unknown authorUnknown author, Public domain, Wikimedia Commons', focus: '50% 40%',
      tall: 220,
      cap: 'The cloud from the Halifax Explosion, photographed from about 20 kilometres away.'
    },
    body: [
      'On the morning of December 6, 1917, Halifax, Nova Scotia, was a busy wartime port. Ships carrying soldiers and supplies to the First World War crowded its harbour. Just before 9 a.m., two ships collided in a narrow channel called the Narrows. One of them, the <i>Mont-Blanc</i>, was secretly loaded with explosives.',
      { fig: G.time([['8:45', 'Ships collide'], ['8:50', 'Fire on the Mont-Blanc'], ['9:04', 'The explosion'], ['Afternoon', 'Rescue trains arrive'], ['Next day', 'Blizzard hits']], { x: 70, top: 12, gap: 24, hl: 2 }),
        tall: 128, cap: 'The first day of the disaster (times approximate).' },
      { h: 'The blast' },
      'The collision started a fire on the <i>Mont-Blanc</i>. Crowds gathered on the shore to watch the smoke. At 9:04, the ship exploded. It was the largest human-made explosion the world had ever seen. A huge wave swept the shore, and the blast flattened much of the north end of the city. Windows shattered kilometres away. About 2&nbsp;000 people were killed and 9&nbsp;000 were injured. Thousands were left homeless.',
      { h: 'A hero’s warning' },
      'Vince Coleman, a railway dispatcher, learned that the burning ship carried explosives. He could have run. Instead, he stayed at his post and tapped out a telegraph message warning an incoming passenger train to stop. He died in the blast, but the train and its passengers were saved. His <b>courage</b> is still honoured today.',
      { h: 'Help pours in' },
      'The disaster was made worse the next day, when a blizzard buried the ruined city in snow. But help arrived quickly. Trains came from across Nova Scotia and New Brunswick. The city of Boston, in the United States, sent a relief train full of doctors, nurses and supplies, pushing through the storm.',
      'The Mi’kmaw community at Turtle Grove, on the Dartmouth shore, was destroyed in the blast. Its story was left out of many early histories and is now being told more fully.',
      { box: 'A yearly thank-you', text: 'Every year since 1971, Nova Scotia has sent Boston a giant Christmas tree to thank the city for its help.' },
      { h: 'Lessons learned' },
      'The explosion changed how Canada handled disasters. Doctors learned new ways to treat eye injuries, and the city was rebuilt with safer homes. More than 100 years later, Halifax remembers the day with a ceremony each December 6, a reminder of loss, <b>resilience</b> and kindness between neighbours.'
    ],
    guide: { before: 'Find Halifax and Boston on a map. Teach <b>courage</b>, <b>resilience</b> and dispatcher.',
      after: 'Ask: why does Nova Scotia still send a tree? Whose story was left out of early accounts, and why does that matter?' },
    words: [['courage', 'bravery when facing danger'], ['resilience', 'the ability to recover after hard times']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the time line. When did the explosion happen?',
        opts: ['9:04', '8:45', 'the next day'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Resilience</b> means …',
        opts: ['recovering after hard times', 'giving up', 'an explosion'], a: 0 },
      { k: 'order', code: 'C1.3', q: 'Number the events from 1 to 4.',
        items: ['Two ships collide.', 'A fire starts.', 'The ship explodes.', 'A blizzard hits the city.'], show: [2, 0, 3, 1] },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What did Vince Coleman do, and why was it brave?',
        a: 'He stayed to send a telegraph warning to stop a train instead of running, and he died saving the passengers.', look: 'stayed; warned the train' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Whose story was left out of many early histories? Why is it important to tell it now?',
        a: 'The Mi’kmaw community at Turtle Grove. Telling it gives a fuller, fairer picture of who was affected.', look: 'Turtle Grove; fuller picture' },
      { k: 'choice', code: 'B3.3', q: 'Why is <i>Mont-Blanc</i> written in italics?',
        opts: ['It is the name of a ship.', 'It is a French word for snow.', 'It is a question.', 'It is a quotation.'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 2, q: 'Why does Nova Scotia still send Boston a tree every year?',
        a: 'To thank Boston for sending help after the explosion.', look: 'thank-you for help' }
    ]
  });

  P.add({
    id: 'g6-kanienkeha', subject: 'social', form: 'Report',
    title: 'Bringing a Language Home',
    deck: 'How Mohawk communities are reviving Kanien’kéha, one speaker at a time',
    hero: {
      photo: 'g6-mohawk-sign.jpg', credit: 'Photo: Moxy, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 45%',
      tall: 220,
      cap: 'A stop sign in Kanien’kéha, Tyendinaga Mohawk Territory, Ontario.'
    },
    body: [
      'At the end of a road in Tyendinaga, near Belleville, Ontario, a red stop sign does not say STOP. Its word is written in Kanien’kéha, the language of the Kanien’kehá:ka, or Mohawk, people. The sign is small, but it shows something big: a language that was nearly lost is being spoken again.',
      { fig: G.flow(['Elders who speak the language', 'Adult learners in immersion', 'Children in language schools', 'Families speaking at home'], { top: 6, bh: 24, gap: 10, hl: 3 }),
        tall: 140, cap: 'How a language passes from one generation to the next.' },
      { h: 'How a language was taken' },
      'For more than a hundred years, the Canadian government ran residential schools for Indigenous children. Children were taken from their families and punished for speaking their own languages. Many grew up afraid to speak them, and did not teach them to their own children. By the late 1900s, only a few hundred fluent speakers of Kanien’kéha remained, most of them Elders.',
      'A language is more than words. It holds a people’s stories, ceremonies, humour and ways of seeing the world. Many Kanien’kéha words describe relationships, with family, with the land and with the Creator. When a language disappears, that knowledge can disappear too.',
      { h: 'Learning again' },
      'Communities decided to act. In Tyendinaga, Akwesasne, Kahnawà:ke and Six Nations of the Grand River, people created <b>immersion</b> programs, where all learning happens in Kanien’kéha. Adults study full-time for two years to become fluent. Young children attend language nests and schools where they hear only Kanien’kéha all day.',
      'It is hard work. Adults learning a new language must practise every day. But each new speaker can teach others, and the number of speakers is growing.',
      { box: 'A living language', text: 'New words are created for modern things, such as computers and phones, so the language can describe today’s world.' },
      { h: 'Signs of hope' },
      'Today, you can see Kanien’kéha on road signs, hear it on community radio, and find it in apps and online lessons. Some children who learned it at school now speak it with their parents and grandparents at home. That is the real goal: a language that lives in families every day.',
      'Language <b>revitalization</b> is about more than the past. It is about young people knowing who they are, and passing that knowledge to their own children one day.'
    ],
    guide: { before: 'Teach <b>immersion</b> and <b>revitalization</b>. Talk gently and briefly about residential schools. Ask: what languages are spoken in your family?',
      after: 'Find Tyendinaga and Six Nations on a map. Look up how to say hello in an Indigenous language spoken near you.' },
    words: [['immersion', 'learning by using only the new language all day'], ['revitalization', 'bringing something back to life and strength']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. What is the final goal?',
        opts: ['families speaking at home', 'more signs', 'more apps'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In <b>re</b>vitalization, the prefix “re-” means …',
        opts: ['again', 'not', 'before'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why did the number of Kanien’kéha speakers become so small?',
        a: 'Residential schools punished children for speaking it, so many did not teach it to their own children.', look: 'residential schools; not passed on' },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Why does the author say “a language is more than words”?',
        a: 'It holds a people’s stories, ceremonies, humour and ways of seeing the world.', look: 'stories, culture, worldview' },
      { k: 'choice', code: 'C3.3', q: 'In an immersion program, learners …',
        opts: ['use only the new language', 'read about the language in English', 'learn only on weekends', 'study only grammar'], a: 0 },
      { k: 'choice', code: 'C1.6', q: 'From what point of view is this passage written?',
        opts: ['third person, by an outside writer', 'first person, by an Elder', 'second person, telling you what to do', 'first person, by a student'], a: 0 },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Connect this passage to a language you speak or would like to learn. Why does it matter to you?',
        a: 'My grandmother speaks Tagalog, and learning it would help me talk with her and know my family’s stories.', look: 'a personal connection' }
    ]
  });

  P.add({
    id: 'g6-steelpan', subject: 'arts', form: 'Report',
    title: 'Music from an Oil Drum',
    deck: 'How the steelpan was invented in Trinidad and found a home in Canada',
    hero: {
      photo: 'g6-steelpan.jpg', credit: 'Photo: Shanel, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 82%',
      tall: 220,
      cap: 'A steelpan player in Trinidad and Tobago.'
    },
    body: [
      'Picture a large metal drum, the kind used to ship oil. Now picture someone tapping its top with rubber-tipped sticks and filling the air with bright, ringing melodies. That is the steelpan, an instrument invented in Trinidad and Tobago in the 1930s and 1940s, and one of the few new acoustic instruments created in the last hundred years.',
      { fig: '<circle class="k" cx="90" cy="70" r="62"/>' +
          [[90, 26], [128, 44], [140, 82], [114, 112], [66, 112], [40, 82], [52, 44]].map(function (c) { return '<ellipse class="k" cx="' + c[0] + '" cy="' + c[1] + '" rx="15" ry="11"/>'; }).join('') +
          '<ellipse class="h" cx="90" cy="70" rx="16" ry="12"/>' +
          G.T(170, 40, 'each dent is', 'l') + G.T(170, 54, 'one note', 'l') + D.arrow(166, 50, 150, 70, 't') +
          G.T(170, 100, 'smaller dents:', 'l') + G.T(170, 114, 'higher notes', 'l'),
        tall: 140, cap: 'The top of a tenor pan, seen from above.' },
      { h: 'Born from resistance' },
      'In the 1800s, the British rulers of Trinidad banned the hand drums that people of African descent played during Carnival. Musicians did not give up. They made rhythms by beating bamboo tubes, then pots, pans and biscuit tins. In the 1930s and 1940s, they discovered that hammering dents into a metal container could produce different musical notes.',
      'When the Second World War ended, the island had many empty oil drums. Inventive musicians cut them, hammered their tops into bowls and shaped dents for each note. They heated the metal to harden it, then tuned each note by ear with small taps.',
      { h: 'How it makes sound' },
      'Each dent on a pan is shaped to <b>vibrate</b> at a particular speed when struck. Faster vibrations make higher pitches, and slower vibrations make lower ones. Small dents near the centre play high notes; large dents near the edge play low ones. Bass pans use whole drums and have only a few big notes.',
      { box: 'Steel orchestras', text: 'Steel bands can have more than 100 players, from high tenor pans to deep bass pans.' },
      { h: 'A Canadian beat' },
      'In the 1960s, many people from Trinidad and Tobago and other Caribbean countries moved to Canada. They brought the steelpan with them. In 1967, Caribbean Canadians in Toronto started a summer festival now called the Toronto Caribbean Carnival. Today, it is one of the largest festivals of its kind in North America, with steel bands, costumes and a huge parade.',
      'Many Canadian schools now have steel bands, and students of every background learn to play. The steelpan is a reminder that creativity can grow from hardship, and that newcomers <b>enrich</b> the cultures they join.'
    ],
    guide: { before: 'Find Trinidad and Tobago on a map. Teach <b>vibrate</b>, <b>enrich</b> and pitch. Listen to a steel band recording if possible.',
      after: 'Ask: how did a ban lead to a new instrument? Try tapping glasses with different amounts of water and compare the pitches.' },
    words: [['vibrate', 'to move back and forth very quickly'], ['enrich', 'to add to and make better']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Smaller dents play …',
        opts: ['higher notes', 'lower notes', 'no notes'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To <b>vibrate</b> is to …',
        opts: ['move back and forth quickly', 'stay still', 'melt'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What problem led musicians to invent new instruments?',
        a: 'The British rulers banned the hand drums they played during Carnival.', look: 'drums were banned' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does the author call the steelpan “born from resistance”?',
        a: 'Musicians refused to stop making music when their drums were banned, and invented a new instrument instead.', look: 'did not give up; found a new way' },
      { k: 'choice', code: 'B3.1', q: 'Which sentence uses a compound subject (two subjects joined by “and”)?',
        opts: ['Costumes and steel bands fill the parade.', 'They brought the steelpan with them.', 'Each dent is shaped.', 'The island had many drums.'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'What is the main message of the last paragraph?',
        opts: ['Creativity can grow from hardship, and newcomers enrich culture.', 'Steel bands are loud.', 'Toronto is big.', 'Oil drums are useful.'], a: 0 },
      { k: 'lines', code: 'C2.4', n: 2, q: 'Which part was hardest to understand? What did you do to fix it?',
        a: 'The part about vibrations; I reread it and looked at the diagram.', look: 'a hard part and a fix-up strategy' }
    ]
  });

  P.add({
    id: 'g6-habitat-67', subject: 'math', form: 'Report',
    title: 'Habitat 67',
    deck: 'A building made of stacked boxes, and the geometry that holds it together',
    hero: {
      photo: 'g6-habitat-67.jpg', credit: 'Photo: Dllu, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Habitat 67 in Montreal, built from 354 concrete boxes.'
    },
    body: [
      'Beside the St. Lawrence River in Montreal stands one of the most unusual buildings in the world. It looks like a giant pile of building blocks, stacked at odd angles, with gardens on the rooftops. It is called Habitat 67, and it was designed by a young architect named Moshe Safdie for the world’s fair, Expo 67.',
      { fig: G.T(4, 12, 'one module: a rectangular prism', 'n') +
          '<path class="k" d="M40 50 L160 50 L160 110 L40 110 Z"/><path class="k" d="M40 50 L70 30 L190 30 L160 50"/><path class="k" d="M160 110 L190 90 L190 30"/>' +
          G.T(100, 128, 'about 12 m long', 'n', 'middle') + G.T(196, 74, '3 m tall', 'n') + G.T(184, 22, '5 m wide', 'n'),
        tall: 136, cap: 'Each box has 6 faces, 12 edges and 8 vertices. Sizes are rounded.' },
      { h: 'A big idea' },
      'Safdie was a student at McGill University when he dreamed up the idea. He wanted to show that city apartments could feel like houses, each with its own garden, fresh air and sunlight. Instead of one tall tower, he stacked homes so that the roof of one became the garden of the next.',
      { h: 'Built from boxes' },
      'Habitat is made from 354 concrete <b>modules</b>. Each one is a rectangular prism, a 3D shape with six rectangular faces. The modules were cast in a factory next to the site, then lifted into place by a giant crane. One apartment might use one, two or even three modules joined together.',
      'Because the boxes are offset, not lined up, the building has many different views and spaces. Its shape changes as you walk around it. Steel cables and rods hold the modules together so they can carry the weight above.',
      'Building with identical modules has advantages. Workers can make many copies of the same shape quickly and check each one for quality before it leaves the factory. The same idea is used today for some schools, hotels and homes.',
      { box: 'Faces, edges, vertices', text: 'A face is a flat surface. An edge is where two faces meet. A vertex is a corner where edges meet.' },
      { h: 'Volume and space' },
      'Architects think about <b>volume</b>, the amount of space inside a 3D shape. You find the volume of a rectangular prism by multiplying its length, width and height. A Habitat module measures about 12 m by 5 m by 3 m, so its volume is about 180 cubic metres. That is enough room for a living room and kitchen, or two bedrooms.',
      'Habitat 67 was expensive to build, and Safdie’s plan for thousands more homes like it never happened. But it inspired architects around the world to rethink how people live together in cities. Today, it is a protected heritage site, and people still live in its stacked homes.'
    ],
    guide: { before: 'Teach <b>modules</b>, <b>volume</b>, face, edge and vertex. Have a cereal box nearby to count faces, edges and vertices.',
      after: 'Build a mini Habitat with sugar cubes or blocks. Ask: how many cubes did you use? What is the volume of one box in cubic centimetres?' },
    words: [['modules', 'separate units joined to make something larger'], ['volume', 'the amount of space inside a 3D shape']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. How many vertices does a module have?',
        opts: ['8', '6', '12'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Volume</b> is …',
        opts: ['the space inside a 3D shape', 'how loud it is', 'the colour of a shape'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Show how the passage finds the volume of one module.',
        a: '12 m × 5 m × 3 m = 180 cubic metres.', look: 'multiply l × w × h = 180' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What did Safdie want city apartments to feel like? How did his design do this?',
        a: 'Like houses; the roof of one home became the garden of the next, giving each fresh air, sun and a garden.', look: 'like houses; rooftop gardens' },
      { k: 'choice', code: 'C3.2', q: 'Why might the offset boxes give each home a different view?',
        opts: ['They face different ways and heights.', 'All windows face one wall.', 'The boxes are round.', 'There are no windows.'], a: 0 },
      { k: 'choice', code: 'C2.2', q: 'What is the main purpose of this report?',
        opts: ['to explain a building and the geometry in it', 'to sell an apartment', 'to tell a made-up story', 'to give directions'], a: 0 },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Would you like to live in Habitat 67? Give two reasons.',
        a: 'Yes, because of the rooftop garden and the river views.', look: 'opinion with two reasons' }
    ]
  });

  /* ---------- reading-test style (guided by the CAT): line numbers, stories, poems, scripts, interviews, journals, posters,
     letters and cartoons, a little longer and harder than Grade 5 ---------- */
  /* a letter in a ring, to mark a place on a map or diagram */
  function spot(x, y, s) { return '<circle class="k" cx="' + x + '" cy="' + y + '" r="8"/>' + T(x, y + 4, s, 'lb', 'middle'); }

  P.add({
    id: 'g6-arena-night', subject: 'story', form: 'Humorous story', lines: true,
    title: 'The Night Shift at Arena Two',
    deck: 'Priya finally gets her ride on the ice resurfacer. One small lever changes the plan.',
    hero: {
      photo: 'g4-zamboni.jpg', credit: 'Photo: Gogerr, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 255,
      cap: 'An ice resurfacer smooths the ice between games at an arena in Guelph, Ontario.'
    },
    body: [
      'For three winters, Priya Raman had watched her father steer the ice <b>resurfacer</b> around Arena Two, and for three winters she had begged for a ride. Her father always gave the same answer: “When you are tall enough to see over the dashboard, and not one centimetre before.”',
      'On the first Friday in February, she measured herself against the kitchen doorframe, marked the spot with a pencil and announced that she had grown. Her father squinted at the mark, then at her, and let out the long sigh of a man who knows he has lost an argument.',
      'That night, after the last minor hockey game, the arena was nearly empty. The scoreboard glowed with zeros, and the only sound was the hum of the lights high above the rink. Priya climbed into the passenger seat of the big machine, which smelled of diesel and wet rubber, and gripped the rail with both mittens.',
      '“Rule one,” said her father. “We go slowly. Rule two, we drive in ovals, never straight across. Rule three, you do not touch anything.”',
      'The machine rumbled through the open gate. Behind them, a thin layer of hot water spread over the scratched ice, and the surface began to shine like a freshly washed window. Priya held her breath, because it was even more beautiful than she had imagined.',
      'Halfway around the second oval, her father’s phone buzzed in his pocket, and he glanced at it for one second. In that second, Priya noticed a small yellow lever beside her knee, and in that same second she remembered rule three. She touched the lever anyway, very gently, the way you might pat a sleeping dog.',
      'For a moment nothing happened; then a great <b>gush</b> of water poured from the back of the machine, far more than the thin, careful layer that was supposed to come out. Her father lunged for the lever and pushed it back, but a shallow lake was already spreading across centre ice.',
      'They sat in silence and watched the water settle into an enormous, glittering puddle. Up in the stands, a cleaner leaned on her mop and began, slowly, to clap.',
      '“Well,” said her father at last, “the good news is that it will freeze. The bad news is that it will take about two hours, and somebody has to stay and check it.”',
      'Priya looked up at the clock. It was already past ten. “Somebody,” she repeated <b>meekly</b>.',
      'They waited together on the players’ bench, sharing a thermos of hot chocolate, while the lake turned slowly into glass. Before they left, her father took the pencil from his pocket and handed it to her.',
      '“Next Friday,” he said, “we measure again.”'
    ],
    guide: { before: 'Ask if the child has seen an ice resurfacer at work. Explain that it shaves the ice and lays down a thin layer of hot water that freezes smooth. Show how to find a line number in the margin. Teach <b>resurfacer</b>, <b>gush</b> and <b>meekly</b>.',
      after: 'Was Priya’s father fair to her? What would you have said if you were him?' },
    words: [['resurfacer', 'a machine that smooths the ice of a rink'], ['gush', 'a sudden, strong flow'], ['meekly', 'quietly, without arguing']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Her father lets out “the long sigh of a man who knows he has lost an argument” ({line:sigh}). What does this suggest?',
        opts: ['He is tired after a long day at work.', 'He doubts the pencil mark but decides to give her the ride anyway.', 'He is upset that she drew on the doorframe.', 'He wants to measure her again in the morning.'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The word “lunged” ({line:lunged}) means',
        opts: ['moved forward suddenly', 'called out loudly', 'looked away', 'laughed quietly'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'This story is told by',
        opts: ['Priya', 'her father', 'a narrator outside the story', 'the cleaner'], a: 2 },
      { k: 'choice', code: 'C3.1', q: 'The ice began “to shine like a freshly washed window” ({line:window}). This simile helps the reader',
        opts: ['hear the noise of the machine', 'see how smooth and bright the new ice looked', 'feel how cold the arena was', 'know how big the rink is'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does the cleaner begin “slowly, to clap” ({line:clap})?',
        opts: ['She is cheering for a goal.', 'She is teasing them about the mess in a friendly way.', 'She is trying to warm her hands.', 'She wants them to leave.'], a: 1 },
      { k: 'choice', code: 'C1.5', q: 'Priya touches the lever “the way you might pat a sleeping dog” ({line:pat}). This shows that she',
        opts: ['was careful, even though she knew she should not touch it', 'was afraid of dogs', 'wanted to wake her father', 'pressed as hard as she could'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'At the end, her father hands Priya the pencil and says, “Next Friday, we measure again.” What does he mean, and what does it show about him?',
        a: 'He means she will get another chance once she has really grown, so he is not too angry. It shows he is patient and has a sense of humour.', look: 'the meaning (another try, another ride) and a trait of the father with evidence' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What lesson might Priya learn from this night? Support your answer with two details from the story.',
        a: 'Rules are there for a reason. She was told not to touch anything, she touched the lever, and the flood kept them at the rink until late.', look: 'a lesson stated as a general idea, backed by two details' }
    ]
  });

  P.add({
    id: 'g6-overdue', subject: 'story', form: 'Short story', lines: true,
    title: 'Forty-One Years Overdue',
    deck: 'Marisol finds a library book hidden in her grandfather’s cedar chest.',
    hero: {
      photo: 'g5-library.jpg', credit: 'Photo: Gogerr, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 270,
      cap: 'Inside the Welland Public Library, Welland, Ontario.'
    },
    body: [
      'The book had been hiding in Grandpa Tomas’s cedar chest since 1984, under a folded wool blanket and a box of letters nobody had read in years. Marisol found it on a rainy Sunday while she was looking for old photos for a school project. It was a thin blue hardcover called <i>Stars of the Northern Sky</i>, and stamped inside the front cover, in faded purple ink, were the words PROPERTY OF WELLAND PUBLIC LIBRARY.',
      'Tucked into a paper pocket at the back was a small card. The last date stamped on it was March 14, 1984.',
      '“Grandpa,” said Marisol, holding up the book, “I think you are a criminal.”',
      'Grandpa Tomas put on his reading glasses and peered at the card for a long time, and to her surprise, he did not laugh. Instead, he turned the pages slowly, stopping at a chart of the <b>constellations</b> that someone had shaded carefully with a pencil.',
      '“I was eleven,” he said quietly. “We had just arrived in Canada, and I did not speak much English yet. The librarian, Mrs. Doucette, let me sit at the big table every day after school. She never asked me to be quiet, even though I read out loud to practise. When I found this book, she told me the stars here were the same as at home, only turned around a little.” He paused. “That made me feel less far away.”',
      '“So why didn’t you return it?”',
      '“We moved to Hamilton that spring, very quickly, when my father found work. I meant to mail it back. Then it got packed, and then it got forgotten, and then I got old.”',
      'The next Saturday, they drove to Welland together. The library had been <b>renovated</b>, with glass walls and rows of computers where the card catalogue used to stand, but the big wooden table was still there. At the front desk, a young librarian listened to the whole story with her eyebrows rising higher and higher.',
      '“How much is the fine?” Grandpa asked <b>solemnly</b>, reaching for his wallet.',
      'The librarian laughed. “We stopped charging fines a few years ago,” she said. “But I have a better idea.” She asked Grandpa to write a short note about Mrs. Doucette. That afternoon, the note and the blue book went into a glass case near the entrance, under a small sign that read RETURNED WITH THANKS.',
      'On the drive home, Grandpa was quiet again, but this time it was a different kind of quiet. Marisol could tell, because he was humming.'
    ],
    guide: { before: 'Explain that library books once had a card in a pocket at the back, stamped with the date due. Ask what a library offers someone new to a country. Teach <b>constellations</b>, <b>renovated</b> and <b>solemnly</b>.',
      after: 'The librarian turned a late book into a thank-you. What else could she have done? Was her choice a good one?' },
    words: [['constellations', 'groups of stars that form a pattern'], ['renovated', 'repaired and made like new'], ['solemnly', 'in a serious way']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'When Marisol calls Grandpa “a criminal” ({line:criminal}), she is',
        opts: ['angry with him', 'worried about the police', 'teasing him', 'reading from the card'], a: 2 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In the word “renovated,” the prefix re- means',
        opts: ['again', 'not', 'before', 'under'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did the book mean so much to Grandpa?',
        opts: ['It was very expensive.', 'It helped him feel less far from home when he was new to Canada.', 'His father had written it.', 'It was the only book he could read.'], a: 1 },
      { k: 'choice', code: 'C1.1', half: true, q: '“Then it got packed” ({line:packed}). What does “it” refer to?',
        opts: ['the library card', 'the book', 'the cedar chest', 'the house'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Grandpa says “and then” three times in a row. This makes his answer sound like',
        opts: ['he is rushed and angry', 'small excuses that piled up over many years', 'a poem', 'he has forgotten the dates'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Which sentence best sums up the story?',
        opts: ['A girl finds an old book and learns about the stars.', 'A grandfather returns a very late library book and honours the librarian who welcomed him to Canada.', 'A library stops charging fines and gets new computers.', 'A family moves from Welland to Hamilton for work.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'At the end, Grandpa is quiet, “but this time it was a different kind of quiet” ({line:different}). How are his two quiet moments different? Use details.',
        a: 'The first time, he is quiet because he is remembering being new and lonely. At the end, he is quiet because he feels happy and at peace. We know because he is humming.', look: 'both moments described, with a feeling for each and the humming as evidence' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Mrs. Doucette made the library a welcoming place for a newcomer. Describe a person or place that made you feel welcome, and explain how.',
        a: 'Example: When I joined my swim club, the coach paired me with a buddy who showed me where everything was, so I did not feel lost.', look: 'a real connection with a specific action that made them feel welcome' }
    ]
  });

  P.add({
    id: 'g6-long-portage', subject: 'story', form: 'Story excerpt', lines: true,
    title: 'The Long Portage',
    deck: 'Lena thinks a 1 450-metre carry will be easy. Her younger sister tells what happened.',
    hero: {
      photo: 'g8-portage.jpg', credit: 'Photo: Cornellier, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 170,
      cap: 'A canoeist carries a canoe over a portage trail between two lakes.'
    },
    body: [
      'The <b>portage</b> sign said 1 450 m, and my sister Lena read it out loud as if it were a joke.',
      '“That’s nothing,” she said. “Fourteen soccer fields. We’ll be at Heron Lake before lunch.”',
      'I was twelve, and it was my first real canoe trip. Lena was sixteen and had been to camp in Algonquin Park three summers in a row, so she believed she knew everything. Mom, who was pulling the second canoe up onto the rocks behind us, said nothing at all, which should have warned me.',
      'The first portage that morning, between Kettle Lake and Fox Pond, had been short, and I had carried the food pack without complaining. This one was entirely different, because the trail climbed straight up from the water over roots that looked like the knuckles of giant hands. Lena flipped the canoe onto her shoulders, settled the <b>yoke</b> against her neck and marched off up the hill. From behind, she looked like a huge red beetle with legs.',
      'I followed with the pack, which grew heavier with every step, as if someone were quietly adding stones to it. Mosquitoes found the backs of my knees, sweat stung my eyes, and somewhere around the halfway point I stopped counting steps and started counting breaths instead.',
      'At the top of the ridge, the trail flattened out under tall white pines, and I found the canoe lying upside down in the ferns. Lena was sitting beside it with her head between her knees.',
      '“Fourteen soccer fields,” I said.',
      '“Don’t,” she groaned.',
      'For a few minutes we simply sat there, and the forest was so still that I could hear a woodpecker tapping somewhere far away. Then Lena did something I did not expect: she stood up, lifted the food pack and swung it onto her own back.',
      '“Your turn with the canoe,” she said. “I’ll show you how. It’s mostly balance, not muscle.”',
      'She raised the front while I crouched underneath, and the whole canoe settled onto my shoulders. It was awkward and heavy, but she walked beside me the entire way down, calling out each root and rock before I reached it. When the trees finally opened and Heron Lake flashed silver below us, I was the one carrying the canoe.',
      'Mom was already waiting on the shore. She looked at me, then at Lena, and raised one eyebrow.',
      '“Teamwork,” said Lena, a little too <b>casually</b>.',
      { fig: '<ellipse class="k" cx="42" cy="88" rx="36" ry="30"/><ellipse class="k" cx="135" cy="96" rx="24" ry="16"/><ellipse class="k" cx="256" cy="92" rx="40" ry="36"/>' +
          D.ripple(22, 64, 92, 't') + D.ripple(240, 282, 106, 't') +
          '<path class="d" d="M78 92 L111 96"/><path class="d" d="M159 92 C172 30 204 24 222 70"/>' +
          '<path class="t" d="M176 40 l6 -8 l6 8 M190 36 l6 -8 l6 8"/>' +
          T(42, 132, 'Kettle Lake', 'l', 'middle') + T(135, 128, 'Fox Pond', 'l', 'middle') + T(256, 142, 'Heron Lake', 'l', 'middle') +
          T(94, 84, '340 m', 'n', 'middle') + T(200, 18, '1 450 m', 'n', 'middle') + T(196, 50, 'ridge', 'n', 'middle') +
          spot(42, 74, 'A') + spot(152, 82, 'B') + spot(192, 64, 'C') + spot(232, 84, 'D') +
          D.arrow(286, 12, 286, 0, 'k') + T(286, 26, 'N', 'lb', 'middle'),
        tall: 146, cap: 'The route that day. Dashed lines are portage trails.' }
    ],
    guide: { before: 'Explain that a portage is a trail where you carry your canoe and gear between two lakes. Look at the map together before reading. Teach <b>portage</b>, <b>yoke</b> and <b>casually</b>.',
      after: 'Lena never admits she could not finish the carry. Why not? Have you ever covered up a mistake with a joke?' },
    words: [['portage', 'a trail where you carry a canoe between lakes'], ['yoke', 'the bar across a canoe that rests on your shoulders'], ['casually', 'as if it is no big deal']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the map. Which letter shows where Lena gave her sister the canoe?',
        opts: ['A', 'B', 'C', 'D'], a: 2 },
      { k: 'choice', code: 'C1.6', half: true, q: 'Who is the narrator?',
        opts: ['Lena', 'Mom', 'Lena’s younger sister', 'a camp counsellor'], a: 2 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The pack grew heavier “as if someone were quietly adding stones to it” ({line:stones}). This shows the narrator was',
        opts: ['carrying rocks', 'getting more and more tired', 'being tricked', 'walking downhill'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Mom “said nothing at all, which should have warned me” ({line:warned}). Mom most likely',
        opts: ['did not hear Lena', 'knew the portage was harder than Lena thought', 'wanted to start lunch early', 'was angry with both girls'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Lena says “Teamwork” “a little too casually” ({line:Teamwork}) because she',
        opts: ['is hiding that she could not finish', 'is too tired to talk', 'wants Mom to carry the packs', 'carried the canoe alone'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Which is another good title?',
        opts: ['Fourteen Soccer Fields', 'How to Paddle a Canoe', 'Mosquito Season', 'Mom’s Map'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How does Lena change during the portage? Use one detail from the beginning and one from the end.',
        a: 'At the start she brags that the portage is nothing. By the end she has learned it is hard, and she helps her sister carry the canoe instead of showing off.', look: 'a detail from each part and the change between them' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'How would this story be different if Lena told it?',
        a: 'Lena might leave out the part where she sat with her head between her knees, or she might explain that she was hurting and too proud to say so.', look: 'a change in what is told or how it feels, tied to Lena’s point of view' }
    ]
  });

  P.add({
    id: 'g6-fog-signal', subject: 'story', form: 'Historical fiction', lines: true,
    title: 'The Fog Signal',
    deck: 'The keeper is sick, the boats are out and the fog is rolling in.',
    hero: {
      photo: 'g4-lighthouse.jpg', credit: 'Photo: Michel Rathwell, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 140,
      cap: 'The lighthouse at Peggys Cove, Nova Scotia, on the rocks above St. Margarets Bay.'
    },
    body: [
      'By four o’clock, the fog had swallowed St. Margarets Bay. From the kitchen window of the keeper’s house, Annie MacLeod could no longer see the rocks below, or the fishing boats that had gone out at dawn, or even the white tower of the lighthouse thirty steps away. She could only hear the sea, grumbling somewhere beneath the grey.',
      'Her father lay upstairs with a fever, his face as pale as his pillow. “The lamp,” he had whispered when she brought him tea. “Sunset is early tonight. You know what to do.”',
      'She did know, because she had watched him a hundred times; still, as she climbed the spiral stairs of the tower with a can of kerosene and a box of matches, her hands were trembling so badly that the matches rattled like seeds in a dry pod.',
      'At the top, in the glass room called the lantern, stood the great <b>lens</b>. It was taller than Annie, built from rings of polished glass that curved around the lamp like the layers of an onion. Her father said a French scientist named Fresnel had designed it, and that its rings could gather one small flame and bend it into a beam that sailors could see far out at sea.',
      'She trimmed the wick the way her father did, filled the lamp, struck a match and held her breath while the flame caught, wavered and finally stood up straight. Light poured through the glass rings and leapt out into the fog. She wound the clockwork that turned the lens, and the beam began its slow sweep across the bay: flash, darkness, flash.',
      'But the fog was thick, and Annie knew that light alone might not be enough. Out on the point, in a small shed, hung the fog bell. Every two minutes, all night if necessary, someone had to strike it. She pulled on her father’s <b>oilskin</b> coat, which reached past her knees, and went out into the wet dark.',
      'She rang the bell until her arms ached. Sometime after nine, a different sound answered from the water: the slow creak of oars, then voices. One by one, three <b>dories</b> slid out of the fog and bumped against the landing. The last one belonged to Mr. Boutilier, who had told her father only last week that a lighthouse was no place for a girl.',
      'He climbed out, looked up at the turning beam, then at Annie standing in the doorway of the bell shed in her enormous coat. For a long moment he said nothing at all, and then, slowly and deliberately, he took off his cap.',
      '“Evening, Keeper,” he said.',
      { img: 'g6-fresnel-lens.png', credit: 'Diagram: Adolphe Ganot, public domain, Wikimedia Commons', tall: 210, cap: 'How a Fresnel lens works: rings of glass bend the light of one lamp (L) into a straight, strong beam.' }
    ],
    guide: { before: 'Explain that before electric lights and radio, lighthouse keepers lit a lamp each night and rang a bell or blew a horn in fog. Look at the diagram: the lines are rays of light. Teach <b>lens</b>, <b>oilskin</b> and <b>dories</b>.',
      after: 'Mr. Boutilier changed his mind. What changed it? Can you think of a job people once said was not for girls, or not for boys?' },
    words: [['lens', 'curved glass that bends light'], ['oilskin', 'cloth made waterproof with oil'], ['dories', 'small, flat-bottomed fishing boats']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Why were Annie’s hands trembling ({line:trembling})?',
        opts: ['She was cold from the fog.', 'She was nervous about doing her father’s job alone.', 'She had burned them on the lamp.', 'She was afraid of the dark stairs.'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: '“The fog had swallowed St. Margarets Bay” ({line:swallowed}) means the fog',
        opts: ['hid the bay completely', 'drank the water', 'made the bay smaller', 'moved very fast'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'The diagram shows that the lens',
        opts: ['bends light from the lamp into a beam', 'rings the fog bell', 'holds the kerosene', 'turns the tower'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why did Annie ring the fog bell as well as light the lamp?',
        opts: ['Her father had asked her to.', 'The beam might not be seen through such thick fog.', 'The lamp had gone out.', 'She wanted to wake Mr. Boutilier.'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The writer describes the beam as “flash, darkness, flash.” This pattern',
        opts: ['copies the rhythm of the turning light', 'shows Annie is sleepy', 'lists three colours', 'shows the lamp is broken'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Mr. Boutilier takes off his cap and calls Annie “Keeper” ({line:Evening}). This shows he',
        opts: ['is tired', 'now respects her', 'is looking for her father', 'wants the coat'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'What kind of person is Annie? Give two character traits and a detail that shows each one.',
        a: 'She is brave: she goes up the tower alone even though her hands shake. She is responsible: she rings the bell until her arms ache so the boats get home.', look: 'two traits, each backed by a detail from the story' },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Mr. Boutilier believed “a lighthouse was no place for a girl.” What was unfair about this belief, and how does the story prove it wrong?',
        a: 'It judged Annie by being a girl, not by what she could do. She kept the light and the bell going all night and brought the boats home safely.', look: 'names the bias (judging by gender) and uses an event from the story to challenge it' }
    ]
  });

  P.add({
    id: 'g6-corn-maze', subject: 'story', form: 'Humorous story', lines: true,
    title: 'The Maze at Miller’s Farm',
    deck: 'Dev has his phone. Amira has a paper map. Guess which one runs out first.',
    hero: {
      photo: 'g4-corn-maze.jpg', credit: 'Photo: Hugho226, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 160,
      cap: 'A path between walls of tall corn in a corn maze.'
    },
    body: [
      'The sign at the entrance to the corn maze at Miller’s Farm said ALLOW 45 MINUTES. Underneath, someone had added in black marker: OR FOREVER.',
      '“That’s just to scare little kids,” said Dev, who was eleven and three-quarters. He held up his phone. “Besides, I have satellite maps.”',
      'Amira had a different kind of map: a paper one the farmer’s son had handed them at the gate. It showed the maze from above, with six numbered posts hidden along its paths. At each post hung a hole punch, and anyone who punched all six holes in their card won a bag of kettle corn. Amira folded the map into a neat square, put it in her pocket and said nothing. Theo, the third member of the team, was already eating his snack.',
      'For twenty minutes, Dev led the way, staring at the glowing blue dot on his screen, which, unfortunately, could see the farm but not the paths. They found Post 1 and Post 2 easily. Then the paths began to curve and split and double back on themselves, and every wall of corn, three metres tall and rustling, looked exactly like every other wall.',
      'At a dead end beside a scarecrow in a hockey jersey, Dev’s screen flickered and went black.',
      '“It was at eight percent,” he said, in the voice of someone announcing a death in the family.',
      'Theo looked up at the sky, where the afternoon sun hung low over the corn to their right. “It’s afternoon,” he said, “so the sun is in the west.”',
      'Amira unfolded her map at last. “The posts go around the maze like the numbers on a clock,” she said, tracing the route with her finger. “Post 3 is at the bottom, by the south exit. If the sun is on our right, we are already facing south. We just have to stop turning around.”',
      'Dev opened his mouth to argue, then closed it again, and for the next half-hour he followed without complaint. Amira chose each turn, Theo checked the sun, and Dev carried the card and punched each hole with great <b>ceremony</b>, as if he had planned the whole thing.',
      'They came out of the maze at ten past five, with six holes in the card and corn silk in their hair. The farmer’s son handed over the kettle corn and asked who had been the <b>navigator</b>.',
      'Theo and Amira both pointed at Dev. Dev, to his credit, pointed at Amira.',
      { fig: '<rect class="k" x="40" y="14" width="220" height="150" rx="34"/><path class="t" d="M136 14 V4 M164 14 V4"/><path class="t" d="M150 164 V180"/>' +
          '<path class="d" d="M150 14 V40 H220 V96 H240 M220 96 V140 H150 V164 M150 140 H70 V96 H52 M70 96 V40 H150"/>' +
          '<path class="t" d="M96 64 H204 M96 64 V118 M204 64 V118 M96 118 H130"/>' +
          spot(214, 30, '1') + spot(246, 88, '2') + spot(150, 152, '3') + spot(62, 134, '4') + spot(54, 82, '5') + spot(94, 28, '6') +
          '<circle class="a" cx="230" cy="122" r="9"/>' + T(230, 126, 'A', 'lb', 'middle') + '<circle class="a" cx="150" cy="92" r="9"/>' + T(150, 96, 'B', 'lb', 'middle') +
          '<circle class="a" cx="80" cy="64" r="9"/>' + T(80, 68, 'C', 'lb', 'middle') + '<circle class="a" cx="186" cy="28" r="9"/>' + T(186, 32, 'D', 'lb', 'middle') +
          T(150, 196, 'south exit', 'n', 'middle') + T(108, 8, 'entrance', 'n', 'end') + D.arrow(18, 40, 18, 18, 'k') + T(18, 54, 'N', 'lb', 'middle'),
        tall: 200, cap: 'A simple version of the paper map. Numbers are the posts; dashed lines are the main paths.' }
    ],
    guide: { before: 'Look at the map first: find the entrance, the six posts and the south exit. Remind the child that the sun sets in the west. Teach <b>ceremony</b> and <b>navigator</b>.',
      after: 'When is a paper map better than a phone? When is a phone better?' },
    words: [['ceremony', 'a formal, serious action done for show'], ['navigator', 'the person who finds the way']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the map. The friends had found Posts 1 and 2 but not Post 3 when the phone died. Which letter shows where they most likely were?',
        opts: ['A', 'B', 'C', 'D'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Dev speaks “in the voice of someone announcing a death in the family” ({line:death}). This is',
        opts: ['hyperbole, to be funny', 'a fact about his family', 'a simile about phones', 'a warning'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A “navigator” ({line:navigator}) is someone who',
        opts: ['finds the way', 'tells jokes', 'grows corn', 'carries the food'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Amira folds the map and keeps it ({line:neat}). This suggests she',
        opts: ['does not care about it', 'is ready if the phone fails', 'will throw it away', 'is angry with Theo'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The dot “could see the farm but not the paths” ({line:unfortunately}). This means',
        opts: ['the satellite map did not show the paths', 'Dev’s eyes were tired', 'the phone was broken', 'the paths were underground'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What is the main problem in the story?',
        opts: ['The kettle corn is sold out.', 'The friends get lost after trusting a phone that dies.', 'Theo eats all the snacks.', 'The farmer’s son gives them the wrong map.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Theo and Amira point at Dev, but Dev points at Amira. What does this ending show about each of them?',
        a: 'Theo and Amira are generous: they let Dev take the credit. Dev is honest in the end: he admits Amira was the real navigator.', look: 'what the ending shows about both sides (generous, and honest), with the detail' },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Name two clues early in the story that could help a reader predict that Dev’s phone plan would fail.',
        a: 'The sign says OR FOREVER, and the blue dot can see the farm but not the paths. Amira also keeps the paper map just in case.', look: 'two clues from before the phone dies' }
    ]
  });

  P.add({
    id: 'g6-quinzhee', subject: 'story', form: 'Story excerpt', lines: true,
    title: 'Inside the Quinzhee',
    deck: 'Uncle Ray’s three steps: make a mountain, wait, then make a cave.',
    hero: {
      photo: 'g7-quinzhee.jpg', credit: 'Photo: NASA ICE, public domain', focus: '50% 55%',
      tall: 150,
      cap: 'A quinzhee: a snow shelter made by hollowing out a big pile of snow.'
    },
    body: [
      'Uncle Ray’s rule for building a <b>quinzhee</b> was simple: “First you make a mountain. Then you wait. Then you make a cave.”',
      'The mountain took Jesse and his cousin Callie the whole morning. They shovelled snow from every corner of the yard into a heap taller than Uncle Ray, until their faces were red and their mittens were soaked. Just as Jesse reached for the shovel to start digging, his uncle took it gently out of his hands.',
      '“Now we wait,” he said. When snow is piled and stirred up, he explained, its tiny crystals break and then slowly freeze together again, the way sugar cubes fuse in a damp cupboard. If they dug too soon, the roof would come down on their heads.',
      'While they waited, Uncle Ray cut about thirty sticks, each as long as his hand from wrist to fingertip, and the cousins pushed them deep into the mound all over, like candles on a cake. Jesse thought this was a strange decoration until he started digging.',
      'Digging a quinzhee, it turned out, is mostly lying on your stomach and scraping snow backward between your legs like a dog. Jesse hollowed out the inside, and Callie hauled the loose snow away on a sled. Whenever his shovel touched the end of a stick, he stopped, because that meant the wall was thick enough there. By late afternoon, the inside was a smooth, round room with a bench of snow along the back wall, higher than the doorway.',
      '“Why is the bench up high?” Callie asked.',
      '“Cold air is heavy,” said Uncle Ray. “It sinks and slides out the door. Warm air rises. You want to sleep where the warm air is.” He pushed a ski pole through the roof to make a hole as wide as a broom handle. “And that is so you can breathe.”',
      'That night it was minus twenty-two. Jesse lay in his sleeping bag on the snow bench, with a candle flickering in a shelf they had carved, and watched his breath drift toward the <b>vent</b>. He had expected to freeze. Instead, the thick walls held the warmth of their bodies and the candle, and the air stayed close to zero. It was so quiet that he could hear Callie’s watch ticking.',
      '“My grandmother made shelters like this when she went trapping with her father, near Île-à-la-Crosse,” Uncle Ray said from the dark by the door. “She used to say snow is cold, but it is also a blanket. It depends on how you use it.”',
      'Jesse thought about that for a long time before he fell asleep.',
      { fig: '<path class="t" d="M4 150 H296"/><path class="k" d="M30 150 Q150 -30 270 150"/><path class="k" d="M64 150 Q150 26 236 150"/>' +
          '<path class="d" d="M150 60 V88"/><rect class="h" x="150" y="126" width="62" height="24"/>' +
          '<path class="a" d="M58 104 L76 112 M98 66 L110 82 M150 44 V58 M202 66 L190 82 M242 104 L224 112"/>' +
          D.arrow(110, 140, 40, 150, 'k') + D.arrow(160, 122, 160, 98, 'a') +
          T(150, 18, 'vent', 'l', 'middle') + D.arrow(150, 22, 150, 54, 't') +
          T(294, 172, 'snow bench (high): warm air', 'l', 'end') + T(6, 172, 'door (low): cold air sinks out', 'l') + T(6, 24, 'short sticks show', 'n') + T(6, 36, 'where the wall is', 'n') + T(6, 48, 'thick enough', 'n'),
        tall: 178, cap: 'Inside a quinzhee, seen from the side.' }
    ],
    guide: { before: 'Ask what the child knows about snow as an insulator (it traps air). Look at the diagram: find the vent, the bench and the door. Teach <b>quinzhee</b> (KWIN-zee) and <b>vent</b>. Île-à-la-Crosse is a Métis community in northern Saskatchewan.',
      after: 'Uncle Ray learned from his grandmother. What have you learned from an older person that you could not have learned from a book?' },
    words: [['quinzhee', 'a snow shelter made by hollowing out a pile of snow'], ['vent', 'a hole that lets air in or out']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. Why is the snow bench higher than the door?',
        opts: ['Warm air stays up near the sleepers while cold air sinks out the door.', 'It keeps snow from falling in.', 'It makes digging easier.', 'It lets the candle be seen from outside.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Sugar cubes “fuse” ({line:fuse}). Fuse means',
        opts: ['join together', 'melt away', 'break apart', 'turn brown'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Why did Uncle Ray take the shovel away?',
        opts: ['The snow needed time to harden.', 'It was lunchtime.', 'He wanted to dig.', 'It was broken.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'The sticks are “a strange decoration” only until Jesse digs ({line:decoration}), because they',
        opts: ['show how thick the walls are', 'fall over', 'hold candles', 'mark the door'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Snow is cold, but it is also a blanket” means snow',
        opts: ['can keep you warm if used well', 'can be sewn into blankets', 'is soft to sleep on', 'should be avoided'], a: 0 },
      { k: 'order', code: 'C2.6', q: 'Number the steps for building a quinzhee in order.',
        items: ['Pile up a mountain of snow.', 'Wait two or three hours.', 'Push sticks into the mound.', 'Dig until you reach the sticks.', 'Poke a vent through the roof.'], show: [3, 0, 4, 2, 1] },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Uncle Ray shares what his grandmother knew. Why does this kind of knowledge matter, and how is it passed on in the story?',
        a: 'It is knowledge for surviving on the land. It is passed on by doing it together and by telling stories, from grandmother to Uncle Ray to Jesse.', look: 'why it matters and how it is passed on (showing, telling, family)' },
      { k: 'lines', code: 'C2.1', n: 3, q: 'What do you already know, from science class or your own life, that helps explain why the quinzhee stays warm inside?',
        a: 'I learned that warm air rises and that snow has air trapped in it, so it slows heat from escaping, like the insulation in a house.', look: 'a piece of prior knowledge linked to the quinzhee' }
    ]
  });

  P.add({
    id: 'g6-second-chair', subject: 'story', form: 'Short story', lines: true,
    title: 'Second Chair',
    deck: 'Two violinists, one audition and one broken string.',
    hero: {
      photo: 'g4-orchestra.jpg', credit: 'Photo: Reg Natarajan, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'An orchestra on stage. The violins sit at the front, at the conductor’s left.'
    },
    body: [
      'Only two violinists were left on the bench outside the music room, and both were pretending not to listen to the other one breathe.',
      'Hana Sato had been playing since she was five. She had a teacher who drove in from Mississauga every Tuesday, a violin that had once belonged to her grandfather and a seat in first chair of the Westview Junior Strings that she had held for two years. Gabriela Ruiz had moved from Winnipeg in January. Nobody knew much about her yet, except that she practised in the stairwell at lunch, where the echo made her sound like three people.',
      'Through the door, Mr. Achebe was tuning the piano. In ten minutes, he would hear them each play the same piece for the <b>audition</b>, and then he would decide who sat in first chair for the spring concert.',
      'Gabriela was warming up her fingers on her closed case when there was a sharp <b>twang</b>, like a rubber band snapping. She stared at her violin in disbelief. The E string, the thinnest one, had broken and was curling away from the bridge like a question mark.',
      '“Do you have a spare?” Hana asked before she could stop herself.',
      'Gabriela shook her head, and her face had gone very still, the way faces do when someone is trying hard not to cry in a school hallway.',
      'Hana looked down at her own violin, resting in its velvet case. She thought about her grandfather, who used to say that music was the only thing in the world that grew when you gave it away. She also thought, very clearly, that if Gabriela could not play, first chair was hers.',
      'The door opened. “Gabriela?” said Mr. Achebe.',
      'Hana held out her violin.',
      'Afterward, she could not remember deciding to do it; she remembered only sitting on the bench with her hands empty and strangely light, listening through the door. The stairwell echo had not been lying. Gabriela played the piece the way a river runs downhill: easily, as if there were no other way for it to go.',
      'When it was Hana’s turn, she played well, even beautifully in places. She played <b>accurately</b>, with every note exactly where it belonged, but she knew, even before Mr. Achebe posted the list on Friday, what it would say.',
      'Gabriela found her at her locker after school. “I’m sorry,” she said. “It was your grandfather’s violin. It was your chair.”',
      'Hana closed her locker and considered the question seriously before, to her own surprise, she smiled. “Second chair turns the pages,” she said. “Somebody has to show you where the good parts are.”'
    ],
    guide: { before: 'Explain that in an orchestra the best player in a section sits in “first chair” and leads it. Ask: is it harder to share something when you might lose because of it? Teach <b>audition</b>, <b>twang</b> and <b>accurately</b>.',
      after: 'Would you have lent the violin? Be honest. What would make it easier or harder?' },
    words: [['audition', 'a short performance to try out for a part'], ['twang', 'a sharp, ringing sound from a string'], ['accurately', 'with no mistakes']],
    qs: [
      { k: 'choice', code: 'C3.2', q: 'Why were both girls “pretending not to listen to the other one breathe” ({line:pretending})?',
        opts: ['They were nervous and very aware of each other as rivals.', 'The hallway was too noisy to hear.', 'They were practising breathing.', 'They were angry about the piano.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Curling away from the bridge like a question mark” ({line:mark}) is',
        opts: ['a simile', 'hyperbole', 'an idiom', 'a rhyme'], a: 0 },
      { k: 'choice', code: 'B2.1', half: true, q: 'Adding -ly to accurate makes “accurately,” a word that tells',
        opts: ['how she played', 'what she played', 'where she played', 'who played'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Hana thinks “very clearly” that first chair would be hers. Why does the writer include this thought?',
        opts: ['to show that lending the violin was not an easy choice', 'to show that Hana wanted Gabriela to fail', 'to show that Hana did not care about first chair', 'to show that she had already won'], a: 0 },
      { k: 'choice', code: 'C1.5', q: 'Gabriela played “the way a river runs downhill” ({line:river}). This comparison shows her playing was',
        opts: ['loud and dangerous', 'natural and flowing', 'slow and careful', 'cold and sad'], a: 1 },
      { k: 'choice', code: 'C3.3', q: 'Which sentence best states the theme of the story?',
        opts: ['Practice matters more than talent.', 'Being generous can matter more than winning.', 'Old violins sound the best.', 'Never lend your things to anyone.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What did Hana know “even before Mr. Achebe posted the list” ({line:posted})? How did she know?',
        a: 'She knew Gabriela had won first chair, because Gabriela played naturally and beautifully, while Hana only played accurately.', look: 'the inference (Gabriela won) and the clue (the difference in how they played)' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Hana’s grandfather said music “grew when you gave it away.” How does the story show this? Use two details.',
        a: 'Hana gave away her chance by lending the violin, and Gabriela’s music filled the room. At the end, Hana offers to help Gabriela, so now they will make music together.', look: 'the meaning of the saying linked to two events' }
    ]
  });

  P.add({
    id: 'g6-opening-night', subject: 'story', form: 'Script', lines: true, plain: true,
    title: 'Opening Night',
    deck: 'Ten minutes to curtain, and the lead cannot remember her first line',
    hero: {
      photo: 'g8-theatre.jpg', credit: 'Photo: Harrison Keely, CC BY 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 240,
      cap: 'Two actors rehearse a scene from a play.'
    },
    body: [
      '<i>Backstage at Lakeshore Public School, ten minutes before the Grade 6 play. Costumes hang on a rolling rack. Through the curtain comes the noise of a full gym. KAI, the <b>stage manager</b>, holds a clipboard and wears a headset. ZARA, who plays the queen, sits on an upside-down bucket, very still.</i>',
      '<b class="ps-who">KAI:</b> <i>(into the headset)</i> Lights, this is backstage. Ten minutes. Rob, do you copy?',
      '<b class="ps-who">ROB:</b> <i>(offstage, crackling)</i> Copy. The spotlight is making a noise like a sick cat, but it works.',
      '<b class="ps-who">KAI:</b> Great. Perfect. <i>(He notices Zara.)</i> Zara? You should be in your crown by now.',
      '<b class="ps-who">ZARA:</b> I can’t do it.',
      '<b class="ps-who">KAI:</b> You can’t find the crown? It’s on the rack, between the dragon’s tail and—',
      '<b class="ps-who">ZARA:</b> No. I can’t do the play. There are three hundred people out there, Kai. My aunt drove from Sudbury. And I can’t remember my first line.',
      '<b class="ps-who">KAI:</b> <i>(lowering the clipboard)</i> Your first line is “Who dares to wake the queen?”',
      '<b class="ps-who">ZARA:</b> See? You know it and I don’t.',
      '<b class="ps-who">KAI:</b> I know everybody’s lines. I’ve heard them forty times. That isn’t the same as saying them in front of people. <i>(He sits on the floor beside her.)</i> Can I tell you a secret? In Grade 4, I was a tree in the spring concert. No lines. I just had to stand there and wave my branches. And I was so <b>terrified</b> that I hid in the washroom until it was over.',
      '<b class="ps-who">ZARA:</b> <i>(almost smiling)</i> You skipped being a tree?',
      '<b class="ps-who">KAI:</b> The whole forest had a gap in it. Mrs. Pelletier still brings it up. <i>(pause)</i> But here is the thing. Being scared didn’t mean I couldn’t do it. It just meant it mattered to me.',
      '<b class="ps-who">MS. LINDQVIST:</b> <i>(rushing in)</i> Places, everyone! Five minutes! Zara, crown, please.',
      '<i>ZARA stands, takes a deep breath and lifts a gold paper crown from the rack. She puts it on, a little crooked. KAI straightens it.</i>',
      '<b class="ps-who">ZARA:</b> What if I freeze?',
      '<b class="ps-who">KAI:</b> Then look at stage left. I’ll be right there with the script, and I’ll mouth the line. You won’t be alone out there.',
      '<b class="ps-who">ROB:</b> <i>(crackling)</i> Backstage, the sick cat says it’s ready.',
      '<b class="ps-who">ZARA:</b> <i>(to herself, in a big royal voice)</i> “Who dares to wake the queen?” <i>(to Kai, in her own voice)</i> Okay. Okay. I remembered it.',
      '<i>The house lights dim. The crowd fades to a hush. ZARA walks toward the curtain. <b>Blackout</b>.</i>'
    ],
    guide: { before: 'Show how a script works: the speaker’s name, a colon, then the words; stage directions in italics tell actors what to do. Read it together, each taking parts. Teach <b>stage manager</b>, <b>terrified</b> and <b>blackout</b>.',
      after: 'Kai helps Zara without telling her she is wrong to be scared. Why does that work better than saying “Don’t be scared”?' },
    words: [['stage manager', 'the person who runs everything backstage'], ['terrified', 'extremely afraid'], ['blackout', 'in a play, all the stage lights going off at once']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'How can you tell that this text is a script?',
        opts: ['It has a photo at the top.', 'It shows each speaker’s name with a colon, and stage directions in italics.', 'Every line rhymes.', 'It has a table of contents.'], a: 1 },
      { k: 'choice', code: 'B3.3', half: true, q: 'In a script, the colon after a name (KAI:) shows',
        opts: ['who speaks next', 'that a list follows', 'the time', 'the end of a scene'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Who is Rob?',
        opts: ['the actor playing a king', 'the student running the lights', 'Zara’s uncle', 'the teacher'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does Kai tell Zara about being a tree in Grade 4?',
        opts: ['to show her that even he got scared, so she feels less alone', 'to prove he is a better actor', 'to change the subject to trees', 'to make her late'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Rob says the spotlight sounds “like a sick cat” ({line:sick}). This is meant to be',
        opts: ['scary', 'funny', 'sad', 'scientific'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Why does Zara say her line “in a big royal voice”?',
        opts: ['to prove to herself she can', 'because she is angry', 'because Rob asked her', 'to make fun of queens'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Kai says, “Being scared didn’t mean I couldn’t do it. It just meant it mattered to me.” Explain what he means in your own words.',
        a: 'Feeling nervous is normal when something is important to you. It does not mean you will fail; it means you care.', look: 'a clear restatement in own words, not a copy of the line' },
      { k: 'lines', code: 'C1.3', n: 3, q: 'Choose one stage direction (in italics). Explain what it tells you about a character’s feelings.',
        a: '“ZARA ... sits on an upside-down bucket, very still” shows she is frozen with fear before the show.', look: 'a quoted stage direction and the feeling it shows' }
    ]
  });

  P.add({
    id: 'g6-smoke-highway', subject: 'story', form: 'Historical fiction', lines: true,
    title: 'Smoke on Highway 63',
    deck: 'May 2016: a whole city leaves Fort McMurray, Alberta, ahead of a wildfire.',
    hero: {
      photo: 'g5-forest-fire.jpg', credit: 'Photo: DarrenRD, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 150,
      cap: 'The wildfire beside Highway 63 near Fort McMurray, May 2016.'
    },
    body: [
      'On the third of May, the sky over Fort McMurray turned the colour of a bruise.',
      'I noticed it first from the window of my Grade 6 classroom at lunch. All week the radio had talked about a wildfire southwest of the city, but it had always sounded far away, like weather happening to someone else. Now a wall of smoke stood above the trees, brown at the bottom and strangely orange at the top, and the sun behind it was a flat red coin you could look at without squinting.',
      'At half past one, the principal’s voice came over the speakers, calm and deliberately slow, announcing that parents were on their way to collect us. By evening, the whole city had been told to <b>evacuate</b>. Nobody cheered about leaving early.',
      'Mom arrived in our van with my little brother, Yusuf, buckled in the back, our cat in a carrier on his lap and three garbage bags of clothes behind him. “Just what we could grab,” she said. Her voice was too bright, the way it gets when she is trying to keep us from worrying.',
      'The highway south was <b>crawling</b>. Every lane was full of cars and pickups and campers creeping forward a few metres at a time, and on both sides of the road the forest was burning. I had always imagined fire as something that stayed politely in one place, like a campfire, but this fire travelled. It leapt from treetop to treetop with a roar like a strong wind, and burning flakes of bark floated past the windows like orange snow.',
      'When Yusuf asked whether our house would be okay, Mom admitted that she did not know. That was the worst moment, I think: realizing that grown-ups do not always know.',
      'It took us eleven hours to make a drive that usually takes four. But here is the part I want to remember. Along the highway, people we had never met had set up tables by the road. A man in a cowboy hat filled our gas tank and would not take any money. Two teenagers handed sandwiches through the window. At a community hall, a woman gave Yusuf a stuffed moose and told him it was a very brave moose that would look after him.',
      'Our house did not burn, although many of our neighbours’ houses did. We moved back in June, to streets where whole blocks were gone and new green shoots were already pushing up through the black ground.',
      'Yusuf still sleeps with the moose. He named it Highway.',
      { img: 'g6-mcmurray-smoke.jpg', credit: 'Image: NASA, public domain, Wikimedia Commons', tall: 170, cap: 'Smoke from the Fort McMurray wildfire, seen from space in May 2016.' }
    ],
    guide: { before: 'Tell the child that in May 2016 about 88 000 people left Fort McMurray, Alberta, because of a wildfire; everyone got out safely, but many homes burned. The family in the story is made up; the events around them are real. Teach <b>evacuate</b> and <b>crawling</b>.',
      after: 'Why do you think strangers helped so much? What could people in your town do in an emergency like this?' },
    words: [['evacuate', 'leave a dangerous place to be safe'], ['crawling', 'moving very slowly']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'The sky “turned the colour of a bruise” ({line:bruise}). This description suggests the sky was',
        opts: ['dark purple and frightening', 'pale blue', 'bright and sunny', 'full of stars'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why was Mom’s voice “too bright” ({line:bright})?',
        opts: ['She was trying to hide her worry from the children.', 'She was excited about a trip.', 'She had good news about the house.', 'She was angry with the principal.'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'The story is told in the first person by',
        opts: ['a Grade 6 student', 'Mom', 'Yusuf', 'the principal'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'Here, “crawling” ({line:crawling}) means',
        opts: ['moving very slowly', 'on hands and knees', 'covered in bugs', 'racing'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'What does the photo from space add to the story?',
        opts: ['It shows how huge the smoke cloud was.', 'It shows the family’s van.', 'It shows the inside of the hall.', 'It shows the moose.'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What does the narrator most want to remember about that day?',
        opts: ['how long the drive took', 'the kindness of strangers', 'the colour of the sky', 'the names of the towns'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why do you think Yusuf named the moose “Highway”?',
        a: 'The moose was given to him on the highway during the scariest day of his life. The name reminds him that he was safe and that people were kind.', look: 'a reason linked to the events, going beyond the words' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'The narrator says the worst moment was “realizing that grown-ups do not always know.” Connect this idea to your own life, another story or the news.',
        a: 'Example: During a big storm, my dad did not know when the power would come back. I felt scared, but he stayed calm, like the mom in this story.', look: 'a clear connection explained, not just named' }
    ]
  });

  P.add({
    id: 'g6-creek-ice', subject: 'story', form: 'Short story', lines: true,
    title: 'Where the Creek Runs In',
    deck: 'Jonah’s mother has one rule about the pond. Today he learns why.',
    hero: {
      photo: 'g4-thin-ice.jpg', credit: 'Photo: Nolabob, CC0, Wikimedia Commons', focus: '50% 55%',
      tall: 185,
      cap: 'A thin ice warning sign beside a frozen pond.'
    },
    body: [
      'Every winter, the pond behind the community centre in Sackville froze, and every winter, Jonah’s mother told him the same thing: “Stay away from where the creek runs in.”',
      'Jonah had never really understood why, since the ice near the creek looked like the rest of the pond, only darker, as if someone had spilled tea on it. But on the second Saturday in January, he found out.',
      'He and his friend Mateo were walking along the shore with Mateo’s dog, Biscuit, a young golden retriever with more energy than sense. Mateo’s uncle, who fished through the ice every winter, had lent them a hand drill and a tape measure and shown them how to test the ice. Near the boathouse they drilled a hole: 17 cm of clear blue ice.',
      'Then Biscuit saw a duck.',
      'The dog shot across the pond in a blur of fur and flying snow, straight toward the dark patch where the creek flowed in. The duck, standing calmly on open water, did not seem worried at all.',
      'The retriever was almost there when the ice gave a long, low groan and then a crack like a rifle shot. One back leg broke through. The dog scrambled and <b>whimpered</b>, half on the ice and half in the black water.',
      'Mateo started to run. Jonah grabbed his jacket and held on.',
      '“No! If it can’t hold him, it can’t hold you!”',
      'For one horrible second, Mateo pulled against him; then he stopped struggling, and Jonah could see him remembering what his uncle had told them: never run toward a hole in the ice; spread your weight; reach, don’t go.',
      'Jonah dialled 911 while Mateo lay flat on his stomach and slid forward like a seal, pushing a long fallen branch ahead of him. He stopped well short of the dark ice. “Biscuit! Here, buddy!” The dog clawed at the edge, caught the branch in his teeth and, with one great <b>heave</b>, scrambled onto the thick ice and raced, shaking, back to shore.',
      'By the time the fire truck arrived, all three of them were huddled on a bench, wrapped in the boathouse’s emergency blanket. One firefighter checked Biscuit’s paws. The other walked to the shore, studied the dark patch and then looked at the boys.',
      '“Moving water,” she said. “The creek wears the ice thin from underneath. Whoever taught you two to stay back taught you well.”',
      'Jonah thought of his mother, and his ears went hot.',
      { fig: G.bars([['10 cm', 10, 'stay off'], ['15 cm', 15, 'one person walking'], ['20 cm', 20, 'group skating, games'], ['25 cm', 25, 'snowmobile']], 25, { x0: 50, pad: 118, gap: 26, top: 8, hl: 0 }) +
          T(150, 118, 'Clear, hard ice only. Moving water makes ice thinner.', 'n', 'middle'),
        tall: 124, cap: 'How thick ice must be to be safe: guidelines like these are given by safety groups such as the Canadian Red Cross.' }
    ],
    guide: { before: 'Ask what the child knows about ice safety. Read the chart together before the story. Teach <b>whimpered</b> and <b>heave</b>. Practise the rule: reach, throw, don’t go.',
      after: 'Mateo wanted to run to his dog. Why is that such a natural thing to do? Why was it the wrong choice?' },
    words: [['whimpered', 'made small crying sounds'], ['heave', 'a strong pull or lift']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'Look at the chart. The boys measured 17 cm of ice near the boathouse. What was that ice safe for?',
        opts: ['nothing', 'one person walking', 'a group skating', 'a snowmobile'], a: 1 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Biscuit has “more energy than sense” ({line:sense}). This warns that the dog',
        opts: ['may do something foolish', 'is very old', 'is well trained', 'is tired'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Whimpered” ({line:whimpered}) means',
        opts: ['made small crying sounds', 'barked loudly', 'swam fast', 'shook off water'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why was the ice near the creek dangerous?',
        opts: ['Moving water wore it thin from underneath.', 'Ducks had broken it.', 'It had tea spilled on it.', 'The boathouse heated it.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Mateo slides “like a seal” ({line:seal}) because he is',
        opts: ['flat on his stomach', 'swimming', 'barking', 'wearing a black coat'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Jonah’s ears go hot ({line:ears}) because he feels',
        opts: ['embarrassed', 'frostbitten', 'angry', 'too warm'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Name two safety rules the boys followed. Explain how each one helped.',
        a: 'They did not run onto the thin ice, so nobody else fell in. Mateo lay flat and reached with a branch, which spread his weight and let him stay back from the hole.', look: 'two rules, each with how it helped' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'The writer uses very short sentences, such as “Then Biscuit saw a duck.” and “Mateo started to run.” Why use short sentences at these moments?',
        a: 'Short sentences make the action feel sudden and tense. They make the reader read faster, like the events are happening quickly.', look: 'the effect of sentence length on pace or tension' }
    ]
  });

  P.add({
    id: 'g6-sugar-bush', subject: 'story', form: 'Short story', lines: true,
    title: 'Forty to One',
    deck: 'Maya’s first spring helping with the boiling at her grandmother’s sugar bush.',
    hero: {
      photo: 'g8-sap-buckets.jpg', credit: 'Photo: United States Department of Agriculture, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 150,
      cap: 'Metal buckets collect sap from maple trees in early spring.'
    },
    body: [
      'Every spring, when the nights were still cold enough to freeze the puddles but the afternoons were warm enough to soften the snow, Maya’s family drove to her grandmother’s <b>sugar bush</b> on Manitoulin Island. Nookomis, as Maya called her grandmother, said that the maples could feel the change before people could. “The trees wake up first,” she would say. “We just follow.”',
      'This year Maya was twelve, and for the first time she was allowed to help with the boiling instead of only hauling buckets. She had imagined something thrilling, like stirring a potion in a cauldron, but the job turned out to be mostly waiting. The sap that dripped from the taps was as thin and clear as water and tasted only faintly sweet, like water that had been whispered to by sugar. To turn it into syrup, you had to boil away nearly all of it.',
      '“How much sap makes one jar?” Maya asked on the first morning, watching steam <b>billow</b> from the long, shallow pan over the fire.',
      '“About forty litres for one litre of syrup,” said Nookomis.',
      'Maya did the arithmetic and groaned. At this rate, she calculated, they would be standing in the snow until she was in high school.',
      'Before the boiling began, Nookomis had done something that Maya had seen every year but had never really thought about. She had walked to the oldest maple at the edge of the clearing, placed a small pinch of tobacco at its roots and spoken quietly in Anishinaabemowin. Now, as the hours dragged on, Maya asked her why.',
      '“Because the tree is giving us something,” Nookomis said. “When someone gives you a gift, you say thank you. You do not just take.”',
      'By the third afternoon, the sap in the pan had darkened to the colour of weak tea and then of honey, and the bubbles had changed from small and quick to large and lazy. Nookomis went to the cabin to fetch the jars and left Maya in charge. “Watch the bubbles,” she said. “When they start to climb, call me.”',
      'Maya watched. Then a pair of chickadees landed on the woodpile, and she watched them instead. When she looked back, a golden foam was rising toward the rim of the pan.',
      '“Nookomis!”',
      'Her grandmother was there in seconds. She dropped a lump of butter into the pan, and the foam <b>collapsed</b> at once, as if someone had let the air out of it. The syrup was dark, but it was not burned.',
      'Maya waited to be scolded. Instead, Nookomis dipped a wooden spoon into the syrup, blew on it and handed it to her. “Tell me,” she said, “was it worth the wait?”',
      'It was the best thing Maya had ever tasted. She did not take her eyes off the pan again.',
      { fig: G.cols([['sap', 40, '40 L'], ['syrup', 1, '1 L']], 40, { base: 104, h: 86, x0: 70, hl: 1 }) + T(10, 20, 'boil', 'lb') + T(10, 34, 'down', 'lb') + D.arrow(30, 46, 30, 92, 'a'),
        tall: 124, cap: 'About 40 litres of sap boil down to 1 litre of maple syrup.' }
    ],
    guide: { before: 'Explain that maple sap runs in early spring, when nights freeze and days thaw, and that it is boiled down to make syrup. Nookomis is the Anishinaabemowin word for grandmother; many Anishinaabe families offer tobacco to give thanks. Teach <b>sugar bush</b>, <b>billow</b> and <b>collapsed</b>.',
      after: 'Nookomis says you do not just take. What do you take from nature, and how could you give thanks for it?' },
    words: [['sugar bush', 'a forest of maple trees used for making syrup'], ['billow', 'rise and roll in big clouds'], ['collapsed', 'fell in or went flat suddenly']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the chart. To make 2 L of syrup, you would need about',
        opts: ['20 L of sap', '40 L of sap', '80 L of sap', '42 L of sap'], a: 2 },
      { k: 'choice', code: 'B2.2', half: true, q: 'To “billow” ({line:billow}) means to',
        opts: ['rise in big clouds', 'drip slowly', 'freeze hard', 'spill over'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Sap tasted like water “whispered to by sugar” ({line:whispered}). So it was',
        opts: ['very sweet', 'only a little sweet', 'salty', 'thick'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Standing in the snow until she was in high school” is',
        opts: ['hyperbole', 'a simile', 'a fact', 'an idiom'], a: 0 },
      { k: 'choice', code: 'C3.4', q: 'Why does Nookomis place tobacco at the roots of the oldest maple?',
        opts: ['to help the tree grow faster', 'to give thanks for the tree’s gift', 'to keep insects away', 'to mark the path'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why did the foam rise while Maya was in charge?',
        opts: ['The butter had melted.', 'She was watching the chickadees instead of the bubbles.', 'The fire went out.', 'Nookomis added more sap.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Maya expects to be scolded, but Nookomis hands her a spoonful of syrup instead. Why might Nookomis choose not to scold her?',
        a: 'Maya called for help in time and already knew she had made a mistake. Tasting the syrup shows her what careful waiting is for, which teaches more than scolding.', look: 'an inference about Nookomis’s reasons, supported by what happened' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'At the end, Maya “did not take her eyes off the pan again.” What has she learned? Use two details.',
        a: 'She learned that making syrup takes patience and attention. She almost burned it when she looked away, and the taste showed her the wait was worth it.', look: 'a lesson (patience, attention) with two details' }
    ]
  });

  P.add({
    id: 'g6-drum-seat', subject: 'story', form: 'Short story', lines: true,
    title: 'The Drum Seat',
    deck: 'Kevin wanted to paddle. The coach gave him a drum instead.',
    hero: {
      photo: 'g5-dragon-boat.jpg', credit: 'Photo: John Vetterli, CC BY-SA 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 215,
      cap: 'Dragon boat racers in Toronto. The drummer sits at the front, facing the crew.'
    },
    body: [
      'When Coach Ling posted the crew list for the Toronto dragon boat festival, Kevin Tran read it three times, hoping the letters might rearrange themselves. They did not. Nineteen names were listed under PADDLERS, and his own name sat alone at the very top, under a single word: DRUM.',
      '“Drummer isn’t a real job,” he complained to his older cousin, Bao, that evening. “You just sit at the front and bang a drum while everybody else does the actual work.”',
      'Bao, who had paddled for six summers, only laughed. “Try telling that to a crew with a bad drummer.”',
      'At the first practice on the harbour, Kevin climbed onto the little seat at the <b>bow</b>, facing backward toward the twenty paddlers, with a wooden drum shaped like a barrel between his knees. The long boat had a dragon’s head carved at the front and a curling tail at the back, and Kevin felt less like a crew member than like a decoration.',
      'He beat the drum lazily, in no particular rhythm, while gazing across the water at the CN Tower. Within a minute, the boat was lurching like a shopping cart with a broken wheel. Paddles clacked against one another, and someone in row six got splashed in the face and said a word that Coach Ling pretended not to hear.',
      '“Kevin!” called the coach from the steering oar at the back. “The paddlers in row eight can’t see the front of the boat. They follow you. If you wander, they wander.”',
      'That night, Kevin practised with two wooden spoons on an overturned laundry basket, matching every beat to a <b>metronome</b> on his phone, until his mother asked, with great politeness, whether he planned to stop before midnight.',
      'By race day in June, something had shifted. Kevin had learned to watch the two lead paddlers, called the <b>strokers</b>, and to strike the drum exactly as their blades entered the water. He had learned to call the start, to quicken the beat for the final push and to shout “Hold!” at the finish. Most of all, he had learned to keep his eyes on the crew, never on the skyline.',
      'When the horn sounded, he drummed as if the boat’s heart were beating inside the barrel. Twenty paddles rose and fell so evenly that, from the shore, they looked like the legs of a single enormous creature. They crossed the line in second place, only half a boat length behind the winners.',
      'On the dock, a paddler from row eight, a woman old enough to be Kevin’s grandmother, clapped him on the shoulder. “Best drummer we’ve had,” she said. “I never had to look up once.”',
      'Kevin found Bao in the crowd and did not say a word. He did not need to. Bao was grinning.'
    ],
    guide: { before: 'Show the photo: a dragon boat has about 20 paddlers, a drummer at the front and a steerer at the back. Dragon boat racing began in China more than 2 000 years ago. Teach <b>bow</b>, <b>metronome</b> and <b>strokers</b>.',
      after: 'Kevin thought his job did not matter. Have you ever had a job on a team that seemed small but turned out to be important?' },
    words: [['bow', 'the front of a boat'], ['metronome', 'a device that clicks a steady beat'], ['strokers', 'the front paddlers, who set the pace']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Kevin reads the list “three times, hoping the letters might rearrange themselves” ({line:rearrange}). He is',
        opts: ['pleased', 'disappointed', 'confused by spelling', 'bored'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: 'The bow ({line:bow}) of a boat is',
        opts: ['the front', 'the back', 'the oar', 'a seat'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The boat was “lurching like a shopping cart with a broken wheel” ({line:lurching}). This simile shows that the boat was',
        opts: ['gliding smoothly', 'jerking unevenly', 'going very fast', 'sinking slowly'], a: 1 },
      { k: 'choice', code: 'C3.2', q: 'Why does the paddler from row eight say, “I never had to look up once”?',
        opts: ['She trusted Kevin’s beat, so she could focus on paddling.', 'She was too tired to look up.', 'She could not see the drum.', 'She wanted to watch the skyline.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'Paddles “like the legs of a single enormous creature” shows the crew was',
        opts: ['moving perfectly together', 'frightened', 'slow', 'tired'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'The story is mostly about',
        opts: ['how dragon boats are built', 'a boy learning his job matters', 'Toronto’s harbour', 'a strict coach'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'How does Kevin’s opinion of the drummer’s job change? Use evidence from the beginning and the end.',
        a: 'At first he says drumming isn’t a real job. By the end he practises hard and sees that the whole crew depends on his beat, and he is proud.', look: 'a beginning detail, an ending detail and the change between them' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Which strategy helped you most to understand this story: picturing the boat, asking questions or connecting to a team you know? Explain how it helped.',
        a: 'Picturing the boat helped: I imagined Kevin facing backward and the paddlers in rows, so I understood why row eight could not see the front.', look: 'one strategy named and a specific example of how it helped' }
    ]
  });

  P.add({
    id: 'g6-volcano', subject: 'story', form: 'Humorous story', lines: true,
    title: 'The Eruption at 11:15',
    deck: 'A science fair volcano, a real geologist and one missing ingredient',
    hero: {
      photo: 'g4-science-fair.jpg', credit: 'Photo: U.S. Navy, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 120,
      cap: 'Students show their projects at a school science fair.'
    },
    body: [
      'My science fair volcano was supposed to be the greatest eruption in the history of Glenview Public School. I had planned it for three weeks. I had built the cone out of papier-mâché around a plastic bottle, painted it in four shades of brown and added a little cardboard village at the bottom, complete with tiny trees and a church with a steeple. I had even made a poster about stratovolcanoes, the tall, steep kind that grow from layers of ash and hardened lava, like Mount Garibaldi in British Columbia.',
      'The eruption depended on a famous recipe: baking soda in the bottle, then vinegar mixed with red food colouring and a squirt of dish soap, which according to every website would make the foam thicker and more dramatic. I had tested it twice at home, in the bathtub, and both times red foam had poured magnificently down the mountain and swallowed the village, which my little sister found extremely upsetting.',
      'On the day of the fair, the judges reached my table at exactly 11:15. There were three of them: the principal, a parent volunteer and a <b>geologist</b> from the university, who had a beard and a lanyard and looked as though he had seen real volcanoes and would not be easily impressed.',
      '“Whenever you’re ready,” he said.',
      'I poured the vinegar. Nothing happened.',
      'I stared into the crater. The geologist stared at me. Somewhere behind us, a Grade 2 student’s potato battery made a faint, sad buzz. Then I remembered, with a horrible sinking feeling, that the baking soda was still in my backpack, in a sandwich bag, underneath my lunch.',
      'There are moments when a person must decide what kind of scientist to be. I could have announced that my volcano was <b>dormant</b> and hoped the judges would move on. Instead, I explained exactly what had gone wrong, why it mattered and what should have happened. Then I asked if I could try again.',
      'The geologist raised his eyebrows. “Go ahead,” he said.',
      'This time I added the baking soda first. The eruption was instant and enormous. Red foam surged out of the crater, <b>cascaded</b> over the village, poured off the edge of the table and spread across the gym floor toward the potato battery, whose owner shrieked.',
      'I did not win first prize. I won an honourable mention for what the judges called “excellent reflection on experimental error,” which I later learned means admitting your mistakes out loud and learning from them. The geologist even shook my hand. “Real volcanoes don’t always erupt on schedule either,” he said.',
      'My sister still has not forgiven me for the village.',
      { fig: '<path class="t" d="M4 120 H296"/><path class="k" d="M30 120 L128 34 Q150 24 172 34 L270 120"/><path class="d" d="M60 94 L240 94 M88 70 L212 70 M114 48 L186 48"/>' +
          '<path class="a" d="M146 120 V30 M154 120 V30"/><ellipse class="a" cx="150" cy="140" rx="50" ry="12"/><path class="a" d="M146 128 V120 M154 128 V120"/>' +
          T(236, 34, 'layers of ash', 'l') + D.label(236, 48, 'and lava', 200, 62) + D.label(40, 26, 'crater', 140, 30) + D.label(40, 60, 'vent', 148, 80) + T(150, 162, 'magma chamber', 'n', 'middle'),
        tall: 168, cap: 'Inside a stratovolcano. Magma rises through the vent; each eruption adds a layer.' }
    ],
    guide: { before: 'Ask if the child has made a baking soda volcano, and why it foams (a reaction makes a gas). Look at the diagram of a real stratovolcano. Teach <b>geologist</b>, <b>dormant</b> and <b>cascaded</b>.',
      after: 'Was it braver to explain the mistake or to pretend? Why do scientists share their mistakes?' },
    words: [['geologist', 'a scientist who studies rocks and the Earth'], ['dormant', 'not active for now, as if sleeping'], ['cascaded', 'poured down like a waterfall']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Why did nothing happen when the vinegar was poured?',
        opts: ['The vinegar was old.', 'The baking soda was in the backpack.', 'The soap was missing.', 'The judges came early.'], a: 1 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In “geologist,” the suffix -ist means',
        opts: ['a person who studies or does something', 'more than one', 'full of', 'not'], a: 0 },
      { k: 'choice', code: 'C3.1', q: '“There are moments when a person must decide what kind of scientist to be” ({line:moments}). This sentence is',
        opts: ['completely serious', 'a little funny, because it makes a small moment sound huge', 'a fact from a textbook', 'a question for the judges'], a: 1 },
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. What does it show that the model volcano did not?',
        opts: ['the layers inside a real volcano and where magma comes from', 'how to mix vinegar and soap', 'the village at the bottom', 'the judges’ table'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'When the geologist arrives, the narrator most likely feels',
        opts: ['nervous', 'bored', 'angry', 'sleepy'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'The story is told by',
        opts: ['the student who made the volcano', 'the geologist', 'the sister', 'a narrator outside the story'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The judges praised “excellent reflection on experimental error.” What did the narrator do to earn this, and why do scientists value it?',
        a: 'The narrator explained honestly what went wrong and why, then tried again. Scientists value this because mistakes teach you how to do the experiment right.', look: 'what the narrator did (explained, tried again) and why it matters in science' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'Why does the writer end with the sister and the village?',
        a: 'It is a funny callback to the bathtub tests, and it ends the story on a light note.', look: 'links back to the earlier detail and names the effect (humour)' }
    ]
  });

  P.add({
    id: 'g6-blue-suitcase', subject: 'story', form: 'Historical fiction', lines: true,
    title: 'The Blue Suitcase',
    deck: 'Halifax, 1948. Anneke has practised one English sentence all the way across the ocean.',
    hero: {
      photo: 'g6-pier21.jpg', credit: 'Photo: E.A. Bollinger, Public domain, Wikimedia Commons', focus: '50% 35%',
      tall: 200,
      cap: 'A newcomer and her baby at Pier 21 in Halifax, 1948.'
    },
    body: [
      'Anneke Visser had practised the sentence for eleven days, all the way across the Atlantic Ocean, while the ship rolled and creaked and her mother lay seasick in their narrow cabin. <i>Good morning. I am pleased to meet you.</i> She practised it to the gulls that followed the ship, to the grey waves and, mostly, to her little brother, Pieter, who was five and refused to say anything in English except “cowboy.”',
      'The ship docked in Halifax on a raw April morning in 1948. From the deck, Anneke could see a long brick building beside the water with PIER 21 painted on it, and beyond it a town of wooden houses climbing a hill. It did not look like the Canada in the magazines, with its snowy mountains. It looked cold, and ordinary, and very far from home.',
      'Inside the <b>immigration</b> hall, hundreds of people waited on long wooden benches, holding papers and children. Anneke heard Dutch and Polish and Italian and languages she could not name, all echoing under the high ceiling like the clatter of an enormous kitchen. She gripped the handle of the blue suitcase so tightly that her fingers ached. Inside it was everything she owned that was not on her back: two dresses, a coat that had belonged to her cousin, her school reader and a small wooden shoe her grandfather had carved before they left.',
      'When their turn came, the <b>official</b> behind the desk had a moustache like a scrubbing brush and a rubber stamp in his hand. He examined their papers for a long time, and Anneke’s carefully practised sentence vanished from her head, as if the sea had washed it away.',
      'Then Pieter stepped forward, looked the official in the eye and said, very loudly, “Cowboy.”',
      'For one terrible second, nobody moved. Then the official began to laugh, a big, surprised laugh that made people on the nearest benches turn around. He stamped the papers and slid them back across the desk.',
      '“Welcome to Canada, partner,” he said to Pieter. And then, to Anneke, slowly and kindly: “Good morning.”',
      'The sentence came back. “Good morning,” said Anneke. “I am pleased to meet you.”',
      'Later, at a long table run by volunteers, a woman wearing a Red Cross <b>armband</b> gave each of them a sandwich and a small paper bag. Inside Anneke’s bag were a toothbrush, a bar of soap and an orange, as bright as a lamp. She had not seen an orange since before the war.',
      'That evening, the family boarded a train for a farm near Chatham, Ontario, where her father had found work. Anneke sat by the window with the suitcase on her knees and the orange in her pocket. She did not eat it for three days. She only held it, now and then, to feel how real it was.'
    ],
    guide: { before: 'Explain that from 1928 to 1971 about a million newcomers entered Canada through Pier 21 in Halifax, many after the Second World War. Anneke’s family is made up, but the hall, the volunteers and the train west were real. Teach <b>immigration</b>, <b>official</b> and <b>armband</b>.',
      after: 'If a new student joined your class today without much English, what could you do on the first morning to welcome them?' },
    words: [['immigration', 'coming to live in a new country'], ['official', 'a person with authority in a government office'], ['armband', 'a band of cloth worn around the arm']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Anneke practised the sentence for eleven days because she',
        opts: ['had a test on the ship', 'wanted to be ready to speak English', 'was teaching Pieter', 'was bored'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The hall echoed “like the clatter of an enormous kitchen” ({line:clatter}). It was',
        opts: ['busy and noisy', 'silent', 'warm and cozy', 'smoky'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Why did Halifax “not look like the Canada in the magazines” ({line:magazines})?',
        opts: ['It looked plain and cold instead of grand.', 'It was hot and sunny.', 'It had no buildings at all.', 'It was full of horses.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did the official laugh?',
        opts: ['Pieter’s one English word was a surprise that broke the tension.', 'The papers were wrong.', 'He knew the family.', 'Pieter was being rude.'], a: 0 },
      { k: 'choice', code: 'C3.4', half: true, q: 'The volunteers’ sandwich, soap and orange show the value of',
        opts: ['welcoming newcomers', 'saving money', 'learning English', 'following rules'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Anneke does not eat the orange for three days because',
        opts: ['she dislikes oranges', 'it feels precious', 'it is for Pieter', 'she is not hungry'], a: 1 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'How might Anneke’s first day have been different if the official had not been kind? What does the story suggest about how newcomers should be welcomed?',
        a: 'She might have felt frightened and unwanted. The story suggests that small kindnesses, like patience and a smile, help newcomers feel they belong.', look: 'a contrast (unkind official) and the message about welcoming people' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Why is the blue suitcase important in the story? Use two details.',
        a: 'It holds everything Anneke owns, including her grandfather’s carved shoe, so it is all she has left of home. She grips it tightly when she is nervous.', look: 'what the suitcase stands for (home, everything she has) with two details' }
    ]
  });

  P.add({
    id: 'g6-take-47', subject: 'story', form: 'Humorous story', lines: true,
    title: 'Take Forty-Seven',
    deck: 'Sami wants a kickflip on video before school starts. His sister is the camera crew.',
    hero: {
      photo: 'g6-skatepark.jpg', credit: 'Photo: T.Newfeels, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 250,
      cap: 'A skatepark in Shearwater, Nova Scotia.'
    },
    body: [
      'The first forty-six attempts are still on my phone. I have watched every one of them, mostly to remind myself how stubborn my brother can be.',
      'Sami was thirteen that summer, and he had decided that he would land a kickflip off the low ledge at the Shearwater skatepark before school started in September. A kickflip, in case you have never tried one, means jumping with your board and flicking it with the side of your foot so that it spins all the way around beneath you, then landing on it again. It looks <b>effortless</b> when good skaters do it. It is not effortless. It is, as Sami explained to me many times, mostly physics and bruises.',
      'My job was to film. I was ten, and I was paid in freezies.',
      'Take one: Sami fell backward and sat down hard on the concrete. Take seven: the board flipped beautifully and kept going, all the way into the bushes. Take nineteen: he landed with one foot, wobbled for an amazing second and then toppled onto the grass, where he lay with his arms spread out like a starfish and announced to the sky that he was retiring forever.',
      'He did not retire. He got up, brushed the gravel off his elbows and climbed back to the top of the ledge.',
      'By take forty, a small crowd had gathered. There was an older skater with a grey beard who offered advice about where to put his back foot, two teenagers sharing a box of fries and a little boy of about five in a dinosaur helmet who had abandoned his scooter to watch with total <b>concentration</b>. Every time Sami fell, the little boy said, “Ohhhh,” and every time Sami stood up again, he clapped.',
      'Take forty-six was a near miss. Sami’s knee was bleeding a little, and the sun was getting low.',
      '“Last one,” he said. For once I believed him, so I lowered the phone to check how much battery was left.',
      'That was when he landed it.',
      'I heard it more than I saw it: the crack of the board, the clean slap of wheels on concrete and then a roar from the boy in the dinosaur helmet, who leapt off the bench and ran in circles, shrieking, as if Sami had just won the Stanley Cup. The teenagers cheered. The older skater nodded once, slowly, which from him seemed to count as a standing <b>ovation</b>.',
      'I looked down at my phone. I had recorded eleven seconds of my own sneakers.',
      'I expected Sami to be furious. Instead, he took the phone, scrolled back through the clips and stopped on one I had not even meant to film: the little boy, clapping, after take nineteen.',
      '“Keep that one,” he said. “I can land it again tomorrow.”'
    ],
    guide: { before: 'Ask if the child has kept trying at something many times. Explain a kickflip if needed (the photo helps). Teach <b>effortless</b>, <b>concentration</b> and <b>ovation</b>.',
      after: 'Which moment would you have kept: the trick or the little boy clapping? Why?' },
    words: [['effortless', 'looking very easy'], ['concentration', 'close, careful attention'], ['ovation', 'loud, long applause']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'The narrator is',
        opts: ['Sami', 'Sami’s younger sister', 'the older skater', 'the boy in the helmet'], a: 1 },
      { k: 'choice', code: 'B2.1', half: true, q: 'In “effortless,” the suffix -less means',
        opts: ['without', 'full of', 'again', 'before'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'Sami lies “like a starfish” and announces he is “retiring forever” ({line:starfish}). This is funny because',
        opts: ['he is exaggerating; he is not really going to quit', 'starfish cannot skate', 'he is very old', 'he means it seriously'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'The older skater nodded once, “which from him seemed to count as a standing ovation” ({line:nodded}). This tells you he',
        opts: ['rarely shows excitement, so a nod is big praise', 'was angry', 'did not see the trick', 'was falling asleep'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'The narrator missed filming the trick because she',
        opts: ['checked the battery', 'ate a freezie', 'watched the boy', 'tripped'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Which is another good title?',
        opts: ['Forty-Seven Tries', 'Fixing a Skateboard', 'Dinosaur Helmets', 'Freezies for Sale'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Sami want to keep the clip of the little boy instead of being angry about the missed trick?',
        a: 'The boy’s cheering showed that someone believed in him even when he kept falling. Sami knows he can land the trick again, but that moment cannot be repeated.', look: 'an inference about what the clip means to Sami, with a reason' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Sami keeps trying after many falls. Describe something you kept working on until you got it. What kept you going?',
        a: 'Example: I practised a piano piece every day for a month. My teacher’s encouragement kept me going, like the little boy cheering for Sami.', look: 'a personal example, what kept them going and a link to Sami' }
    ]
  });

  P.add({
    id: 'g6-fox-portable', subject: 'story', form: 'Short story', lines: true,
    title: 'The Fox Under the Portable',
    deck: 'A fox moves in at school. Everyone has an opinion. Ines goes looking for facts.',
    hero: {
      photo: 'g6-red-fox.jpg', credit: 'Photo: In india travel, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 45%',
      tall: 200,
      cap: 'A red fox. Many foxes live in Canadian towns and cities.'
    },
    body: [
      'In the last week of April, a red fox moved in under the <b>portable</b> classroom at Maple Grove Public School, and for a while nobody could talk about anything else.',
      'Ines saw her first. She was standing at the window during silent reading, pretending to read, when a slim, rust-coloured animal trotted across the soccer field with something limp in its mouth and slipped into the dark gap beneath the portable. The tip of its tail was as white as if it had been dipped in paint.',
      'By lunchtime, the whole school knew. By the next morning, so did every parent.',
      'The principal, Mr. Okoro, put orange fences around the portable and moved Ms. Kaur’s class into the library. Then the emails began. Some parents worried that the fox might bite someone or carry a disease, and one father wanted it trapped and removed immediately. Others wrote that a wild animal raising its family in a schoolyard was an extraordinary chance for children to learn, and that removing it would be cruel.',
      'Ines heard the arguments at the dinner table and in the hallways. Everyone seemed certain they were right, yet nobody seemed to know very much about foxes.',
      'So she went to the library and found out. Red foxes, she learned, often dig dens under sheds, porches and decks in towns, because those places are dry and <b>sheltered</b>. A mother fox gives birth in spring and usually moves her young away by early summer. Healthy foxes are shy around people and rarely cause trouble, as long as nobody feeds them or corners them. They also eat a remarkable number of mice and rats.',
      'She wrote it all on a single page, with a list of the books and websites she had used, and asked Mr. Okoro whether she could read it at the Friday assembly. He looked at her for a long moment, then nodded.',
      'Her hands shook when she stood in front of four hundred people, but her voice did not. She did not tell anybody they were wrong. She simply told them what she had found, and she finished with a suggestion: keep the fences up, never feed the foxes, and wait.',
      'In the end, that is what the school decided, after a wildlife officer from the city visited and said almost exactly the same thing. For six weeks, students watched from a respectful distance as four fuzzy <b>kits</b> tumbled and wrestled in the sunshine beside the portable.',
      'Then, one morning in early June, the den was empty. Ms. Kaur’s class moved back into the portable, and the orange fences came down.',
      'On the last day of school, Ines found a card on her desk with no name on it. It held a single drawing: a fox with a white-tipped tail, and four small shapes following it into the trees.'
    ],
    guide: { before: 'Ask what the child would do if a wild animal made a home at school. Talk about the difference between an opinion and a fact. Teach <b>portable</b>, <b>sheltered</b> and <b>kits</b>.',
      after: 'Ines checked facts before she spoke. Where would you look to check a fact about an animal? How would you know a source is reliable?' },
    words: [['portable', 'a separate classroom building in a schoolyard'], ['sheltered', 'protected from wind and rain'], ['kits', 'baby foxes']],
    qs: [
      { k: 'choice', code: 'C3.5', q: 'Why did people at the school disagree about the fox?',
        opts: ['Some feared it was dangerous, while others saw a chance to learn and protect it.', 'Nobody liked foxes.', 'The fox stole lunches.', 'The principal wanted to keep it as a pet.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Sheltered” ({line:sheltered}) means',
        opts: ['protected', 'crowded', 'cold', 'hidden in water'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: '“Nobody seemed to know very much about foxes” ({line:yet}) suggests people',
        opts: ['argued without facts', 'were experts', 'did not care', 'stayed quiet'], a: 0 },
      { k: 'choice', code: 'C2.4', half: true, q: 'To understand foxes, Ines',
        opts: ['consulted books and websites', 'made a prediction', 'asked the fox', 'reread her notes'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Who most likely left the card?',
        opts: ['someone grateful for her help', 'the wildlife officer', 'an angry parent', 'the fox'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'What did Ines do that the others had not done?',
        opts: ['She found facts from reliable sources before deciding.', 'She fed the fox.', 'She trapped the fox.', 'She wrote an angry email.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Ines “did not tell anybody they were wrong.” Why was this a wise choice?',
        a: 'People listen better when they do not feel attacked. By sharing facts instead of blaming, she helped both sides agree on a plan.', look: 'why avoiding blame helps people listen or agree' },
      { k: 'lines', code: 'C3.8', n: 3, q: 'Which thinking skill helped you most in this story: finding evidence, inferring or comparing points of view? Explain how.',
        a: 'Comparing points of view helped me understand why the parents disagreed, and why Ines’s facts helped both groups.', look: 'one skill named and how it helped with this text' }
    ]
  });

  P.add({
    id: 'g6-ice-storm-week', subject: 'story', form: 'Historical fiction', lines: true,
    title: 'Six Days at Mr. Lalonde’s',
    deck: 'January 1998: the ice storm takes the power away. A neighbour knocks on the door.',
    hero: {
      photo: 'g4-ice-storm.jpg', credit: 'Photo: J. Jensenius, NOAA, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 280,
      cap: 'Trees and power lines coated in ice after the 1998 ice storm.'
    },
    body: [
      'The first night of the ice storm, I woke to a sound like gunshots in the woods behind our house. Crack. Then a long, splintering crash. Then silence, and another crack.',
      '“Branches,” said Dad from the doorway, holding a flashlight. “The ice is too heavy for them. Go back to sleep.” I did not go back to sleep.',
      'It was January 1998, and for days freezing rain had been falling on eastern Ontario and southern Quebec without stopping. At first it did not look dangerous; it looked beautiful. Every twig, fence wire and blade of grass was coated in clear ice, so that in the grey morning light our whole street glittered as though it had been dipped in glass. But ice is heavy. Coated in ice, a power line can weigh many times its normal weight, and the lines began to sag and snap, while the steel towers that carried electricity across the countryside <b>crumpled</b> like folded paper.',
      'Our power went out at ten past four on Thursday morning. The furnace stopped, the fridge went silent and by noon the house was so cold that we could see our breath in the kitchen.',
      'Across the road lived Mr. Lalonde, who was eighty-one and had grown up through what he called “real winters” on a farm near Casselman. He had a woodstove. On Thursday afternoon, he crossed the road on the ice, very slowly, with a cane in each hand, and knocked on our door.',
      '“I have heat and I have a big pot,” he said. “You have three children and, I think, a lot of soup in your freezer that is going to spoil. This is a good trade.”',
      'For six days, three families lived mostly in Mr. Lalonde’s living room. The grown-ups took turns splitting wood and checking on other neighbours. We slept on the floor in a row of sleeping bags, packed like sardines in a tin, and played endless games of <b>crokinole</b> by the light of oil lamps. Mr. Lalonde taught us a card game called Kaiser and cheated at it cheerfully. At night, after the lamps were out, we could still hear the trees cracking in the woods.',
      'On the seventh day, a <b>convoy</b> of hydro trucks rumbled down our street, and a crew from New Brunswick spent the whole afternoon up a pole in the bitter wind. When the lights came on, everybody cheered, and then, a little strangely, everybody went quiet.',
      'Later, I asked Mom why she had looked almost sad.',
      '“It’s a funny thing,” she said. “We needed the power back. But I’ll miss being that close to everyone.”'
    ],
    guide: { before: 'Explain that in January 1998 an ice storm left more than a million homes in Ontario and Quebec without power, some for weeks, and crews came from across Canada and the United States to help. The family is made up. Teach <b>crumpled</b>, <b>crokinole</b> and <b>convoy</b>.',
      after: 'Mom says she will miss being close to everyone. Why can a hard time bring people closer?' },
    words: [['crumpled', 'bent and collapsed'], ['crokinole', 'a Canadian board game of flicking wooden discs'], ['convoy', 'a group of vehicles travelling together']],
    qs: [
      { k: 'choice', code: 'C1.5', half: true, q: 'The story begins with “Crack.” to',
        opts: ['grab attention with a sudden sound', 'name a card game', 'describe the house', 'show it is morning'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Towers “crumpled like folded paper” ({line:crumpled}). This shows they',
        opts: ['collapsed easily', 'were made of paper', 'were folded on purpose', 'were very small'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why did the power lines snap?',
        opts: ['The ice made them much heavier.', 'A tornado hit them.', 'Trees grew into them.', 'They were too old.'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Mr. Lalonde calls his offer “a good trade” ({line:trade}). What is he really doing?',
        opts: ['offering help in a way that lets the family accept it easily', 'trying to buy soup', 'asking to be paid', 'selling firewood'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did everybody go quiet after the lights came on?',
        opts: ['They realized their time together was ending.', 'They were tired of cheering.', 'The power went out again.', 'They were afraid of the hydro crew.'], a: 0 },
      { k: 'choice', code: 'B3.2', q: 'A gerund is an -ing verb used as a noun. Which sentence uses a gerund?',
        opts: ['Splitting wood kept the grown-ups busy.', 'The trees were cracking in the woods.', 'We were playing crokinole.', 'The trucks were rumbling down the street.'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The ice was beautiful and also dangerous. Find one detail that shows each.',
        a: 'Beautiful: the street glittered as if it had been dipped in glass. Dangerous: the ice was so heavy that power lines snapped and towers crumpled.', look: 'one detail for beautiful and one for dangerous' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Have you, or someone you know, been through a hard time that also brought people together? Explain.',
        a: 'Example: When our street flooded, neighbours brought pumps and food to each other. We met people we had never talked to before.', look: 'a real connection with how people came together' }
    ]
  });

  P.add({
    id: 'g6-geese-leaving', subject: 'story', form: 'Poem', lines: true,
    title: 'Geese, Leaving',
    deck: 'A poem about a morning in late October',
    hero: {
      photo: 'g6-geese-v.jpg', credit: 'Photo: John Benson, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'Canada geese flying in a V.'
    },
    body: [
      { poem: ['They gather on the soccer field', 'for a week in late October,', 'a hundred grey coats', '<b>muttering</b> in the cold like a crowd', 'waiting for a bus that is late.', '',
        'Then one morning, with no signal I can see,', 'they lift together,', 'a sound like a hundred umbrellas', 'opening at once,', '',
        'and <b>stitch</b> themselves', 'into a crooked V', 'that pulls and loosens and pulls again', 'as the leader drops back', 'and another takes the hard place at the front.', '',
        'I stand with my backpack', 'and the mittens I did not want to wear', 'and watch them sew their way south', 'across the whole wide sky.', '',
        'Nobody told them which way to go.', 'Nobody had to.', '',
        'And somewhere below them, a girl', 'is watching, already learning', 'the shape of coming back.'] }
    ],
    guide: { before: 'Explain that Canada geese fly in a V, taking turns at the front, where flying is hardest. Read the poem aloud once, then have the child read it. Teach <b>muttering</b> and <b>stitch</b>.',
      after: 'The geese leave and come back every year. What in your life leaves and comes back each year?' },
    words: [['muttering', 'talking quietly and unclearly'], ['stitch', 'join with a needle and thread']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'The speaker of the poem is',
        opts: ['a goose', 'a girl watching', 'a bus driver', 'a coach'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Geese muttering “like a crowd waiting for a bus” ({line:waiting}) is',
        opts: ['a simile', 'hyperbole', 'an idiom', 'a rhyme'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The geese “stitch themselves into a crooked V” and “sew their way south.” Why does the poet use sewing words?',
        opts: ['to show the geese joining together in a line, like thread across cloth', 'because the girl likes sewing', 'because geese use their beaks like needles', 'to describe their feathers'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'The lines about the leader ({line:leader}) show that geese',
        opts: ['take turns at the front', 'fight to lead', 'never change places', 'fly alone'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: '“Nobody” starts two lines in a row ({line:Nobody}) to',
        opts: ['stress that the geese know the way', 'show they are lost', 'show the girl is lonely', 'make a rhyme'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'The mittens she “did not want to wear” suggest',
        opts: ['winter is coming', 'she lost them', 'they are too big', 'they are new'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What does the girl mean when she says she is “already learning the shape of coming back”?',
        a: 'The geese always return in spring, so their leaving teaches her that goodbyes can be followed by returns. She is learning to look forward to it.', look: 'an interpretation of the last lines linked to the geese returning' },
      { k: 'lines', code: 'C1.2', n: 2, q: 'This poem does not rhyme. How can you tell it is still a poem? Give two features.',
        a: 'It is written in short lines grouped into verses, and it uses images and comparisons instead of plain sentences.', look: 'two features of poetry (line breaks, verses, imagery, repetition)' }
    ]
  });

  P.add({
    id: 'g6-night-plow', subject: 'story', form: 'Poem', lines: true,
    title: 'Night Plow',
    deck: 'A poem about a snowplow at three in the morning',
    hero: {
      photo: 'g6-snow-removal.jpg', credit: 'Photo: Miguel Angel Omaña Rojas, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 150,
      cap: 'Snow removal at night in Montréal.'
    },
    body: [
      { poem: ['At three in the morning,', 'when the whole city is a held breath,', 'the plow comes growling up our street,', 'orange light spinning', 'across my ceiling', 'like a slow lighthouse.', '',
        'I kneel at the window.', 'The blade is taller than my father.', 'It folds the snow aside', 'the way you fold back a blanket', 'for someone who is tired,', 'and leaves a long, clean road behind it,', 'black and shining.', '',
        'Somewhere inside the <b>cab</b>', 'a person in a <b>toque</b>', 'is drinking cold coffee', 'and listening to the radio,', 'awake so the rest of us', 'can sleep.', '',
        'Tomorrow the buses will run.', 'The nurses will get to work.', 'Nobody will think about it.', '',
        'But tonight, I do.', 'I lift one hand', 'against the cold glass', 'and wave.'] }
    ],
    guide: { before: 'Ask who keeps a city running at night (plow drivers, nurses, bakers). Read the poem aloud, slowly, then have the child read it. Teach <b>cab</b> and <b>toque</b>.',
      after: 'Who works while you sleep? How could you thank them?' },
    words: [['cab', 'the part of a truck where the driver sits'], ['toque', 'a knitted winter hat']],
    qs: [
      { k: 'choice', code: 'C1.1', half: true, q: 'When does the poem take place?',
        opts: ['in the middle of the night', 'at noon', 'after school', 'at sunset'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“The whole city is a held breath” ({line:held}) means the city is',
        opts: ['silent and still', 'sick', 'windy', 'noisy'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The plow folds snow “the way you fold back a blanket for someone who is tired” ({line:blanket}). This makes the plow seem',
        opts: ['gentle and caring', 'dangerous', 'loud and angry', 'slow and broken'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does the speaker picture the driver “awake so the rest of us can sleep”?',
        opts: ['to show the driver works hard for others without being noticed', 'because the driver is lonely', 'because the plow is too loud', 'to complain about the noise'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The fourth verse lists',
        opts: ['what the plow makes possible', 'the driver’s family', 'what the speaker ate', 'kinds of snow'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'The poem is mainly about',
        opts: ['noticing a worker people forget', 'how plows are built', 'a snowball fight', 'a storm warning'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The driver probably cannot see the speaker. Why does the speaker wave anyway?',
        a: 'The wave is a thank-you. The speaker wants to show they noticed the work, even if no one else does.', look: 'the wave as thanks or noticing, linked to “Nobody will think about it”' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Name another job that people do while most of us are asleep. Why might people not notice it?',
        a: 'Bakers make bread at night. People only see the bread on the shelf, not the work that made it.', look: 'a real job and a reason it goes unnoticed' }
    ]
  });

  P.add({
    id: 'g6-grandmothers-hands', subject: 'story', form: 'Poem', lines: true,
    title: 'My Grandmother’s Hands',
    deck: 'A poem about learning at the potter’s wheel',
    hero: {
      photo: 'g4-pottery-wheel.jpg', credit: 'Photo: Drbones1950, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 110,
      cap: 'Hands shaping clay on a potter’s wheel.'
    },
    body: [
      { poem: ['My grandmother’s hands', 'are maps of everywhere she has been:', 'a white scar from a tin roof in Accra,', 'a burn from a Toronto bakery oven,', '<b>knuckles</b> round as river stones.', '',
        'At the wheel, they go quiet.', 'Wet clay spins between them', 'and rises like bread,', 'like a question, like a small grey tower', 'that wants to fall', 'and is not allowed to.', '',
        '“Slowly,” she tells me,', 'and her hands close over mine,', 'warm and rough as bark.', '“Clay remembers everything.', 'Push too hard', 'and it tells everyone.”', '',
        'My bowl leans to one side.', 'Hers are perfect.', 'She keeps mine on the kitchen shelf', 'between her best ones', 'and says it is the most <b>honest</b>', 'bowl in the house.', '',
        'When I am old,', 'I want hands like hers,', 'hands that hold on', 'and know when to let go.'] }
    ],
    guide: { before: 'Look at the photo of hands on a potter’s wheel. Accra is the capital of Ghana. Read the poem aloud, then have the child read it. Teach <b>knuckles</b> and <b>honest</b>.',
      after: 'Whose hands in your family tell a story? What would they tell?' },
    words: [['knuckles', 'the joints where fingers bend'], ['honest', 'truthful; showing what really happened']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Her hands are “maps of everywhere she has been” ({line:maps}) because',
        opts: ['the marks on them come from places and work in her life', 'she likes to draw maps', 'she travels with a map', 'her hands are flat'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Knuckles round as river stones” is',
        opts: ['a simile', 'hyperbole', 'an idiom', 'a fact'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Where has the grandmother lived?',
        opts: ['Accra and Toronto', 'Paris and Ottawa', 'only Toronto', 'Montréal'], a: 0 },
      { k: 'choice', code: 'C3.2', q: '“Clay remembers everything. Push too hard and it tells everyone.” She means that',
        opts: ['every mistake shows in the finished piece, so be gentle and patient', 'clay can talk', 'clay is alive', 'you should push hard'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does the grandmother call the leaning bowl “the most honest bowl in the house” ({line:honest})?',
        opts: ['It truly shows that her grandchild made it while learning.', 'It was the most expensive.', 'It is perfect.', 'It holds the most food.'], a: 0 },
      { k: 'choice', code: 'C1.5', q: 'The last line, “and know when to let go,” is about',
        opts: ['knowing when to stop pushing the clay, and a bigger lesson about life', 'dropping bowls', 'leaving the house', 'a game'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'What does the poem show about the grandmother’s life and what she values? Use two details.',
        a: 'She has worked hard in two countries (the tin roof in Accra, the bakery oven in Toronto). She values patience and effort more than perfection, because she keeps the leaning bowl.', look: 'something about her life and something she values, each with a detail' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'The speaker is the grandchild. How might the poem change if the grandmother were the speaker?',
        a: 'She might describe the grandchild’s small hands and how proud she feels, instead of describing her own scars.', look: 'a specific change that comes from the other point of view' }
    ]
  });

  /* a sock hanging from a clothesline at (x, y), for the sock poem */
  function sock(x, y, cls) {
    return '<path class="t" d="M' + (x + 4) + ' ' + (y - 6) + ' v10 M' + (x + 16) + ' ' + (y - 6) + ' v10"/>' +
      '<path class="' + (cls || 'k') + '" d="M' + x + ' ' + y + ' h20 v46 q0 6 6 8 l18 5 q9 3 6 13 q-3 8 -12 6 l-30 -8 q-8 -2 -8 -12 z"/>' +
      '<path class="t" d="M' + x + ' ' + (y + 8) + ' h20 M' + x + ' ' + (y + 14) + ' h20"/>';
  }

  P.add({
    id: 'g6-missing-sock', subject: 'story', form: 'Poem (ode)', lines: true,
    title: 'Ode to the Missing Sock',
    deck: 'A funny poem that speaks to something lost',
    hero: {
      art: '<path class="t" d="M10 26 Q350 52 690 26"/>' + sock(70, 32) + sock(170, 38) + sock(270, 42) + '<path class="d" d="M370 44 h20 v46 q0 6 6 8 l18 5 q9 3 6 13 q-3 8 -12 6 l-30 -8 q-8 -2 -8 -12 z"/>' +
        T(395, 136, '?', 'lb', 'middle') + sock(470, 41) + sock(570, 37, 'a'),
      tall: 150,
      cap: 'A clothesline with one sock missing.'
    },
    body: [
      { poem: ['O sock, my sock, my <b>faithful</b> striped <b>companion</b>,', 'where did you go?', '',
        'Last Tuesday you went into the washer', 'holding hands with your twin.', 'Only one of you came out.', '',
        'I have searched the dryer’s drum,', 'the dark gap behind the machine,', 'the dog’s bed (twice)', 'and the pocket of my brother’s hoodie,', 'where I found a crayon, three cents', 'and something I will not describe.', '',
        'Your twin waits in my drawer,', 'flat and lonely as a pancake,', 'refusing to match with anyone.', 'I tried pairing it with a red sock.', 'They did not get along.', '',
        'Maybe you ran away to join the circus.', 'Maybe you are living a better life', 'in the land of lost mittens and single earrings', 'and the lids of plastic containers.', '',
        'If you ever come back,', 'I promise I will not ask questions.', 'I will just put you on', 'and walk.'] }
    ],
    guide: { before: 'Explain that an ode is a poem that speaks to something and praises it, usually something grand. Ask: what is funny about writing an ode to a sock? Read it aloud with expression. Teach <b>faithful</b> and <b>companion</b>.',
      after: 'What ordinary object would you write an ode to? What would you say to it?' },
    words: [['faithful', 'loyal; always there for you'], ['companion', 'a friend who goes everywhere with you']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'An ode speaks to something and praises it. This ode speaks to',
        opts: ['a missing sock', 'a dog', 'a brother', 'a washing machine'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“Flat and lonely as a pancake” ({line:pancake}) is',
        opts: ['a simile', 'a fact', 'an idiom', 'a question'], a: 0 },
      { k: 'choice', code: 'C1.5', q: 'Why is the poem funny?',
        opts: ['It treats a lost sock as seriously as a lost friend.', 'Every line rhymes.', 'It gives real facts about laundry.', 'It is about a circus.'], a: 0 },
      { k: 'choice', code: 'C3.1', q: 'The two socks “did not get along” ({line:along}). Giving socks human feelings is called',
        opts: ['personification', 'a simile', 'alliteration', 'a fact'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'The “land of lost mittens and single earrings” ({line:mittens}) is',
        opts: ['an imaginary place for lost things', 'where socks are made', 'the brother’s room', 'a real circus'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'The list in the third verse shows that the speaker',
        opts: ['searched everywhere', 'has a messy house', 'blames the dog', 'hid the sock'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'What does the speaker mean in the last verse: “I will not ask questions. I will just put you on and walk”?',
        a: 'The speaker will forgive the sock and be happy to have it back, like welcoming home a friend who ran away. It is a funny, warm ending.', look: 'an interpretation (forgive, welcome back) and the tone' },
      { k: 'lines', code: 'C3.1', n: 3, q: 'Find one example of exaggeration (hyperbole) in the poem. Explain why the poet used it.',
        a: '“Maybe you ran away to join the circus.” The poet exaggerates to make a small problem sound like a dramatic mystery, which is funny.', look: 'a quoted exaggeration and its effect (humour, drama)' }
    ]
  });

  P.add({
    id: 'g6-rink-remembers', subject: 'story', form: 'Poem', lines: true,
    title: 'What the Rink Remembers',
    deck: 'A poem told by an arena’s ice',
    hero: {
      photo: 'g7-hockey.jpg', credit: 'Photo: Robert Taylor, CC BY 2.0, Wikimedia Commons', focus: '50% 50%',
      tall: 160,
      cap: 'Minor hockey players on the ice in Stirling, Ontario.'
    },
    body: [
      { poem: ['I remember every blade.', '',
        'The first-timer at six in the morning,', 'ankles bending like wet noodles,', 'gripping the boards as if they were a <b>lifeboat</b>.', '',
        'The goalie who sang to herself', 'between <b>periods</b>, off-key,', 'so no one would hear her nerves.', '',
        'The father who drove four hours', 'through snow from Kapuskasing', 'to watch his son sit on the bench', 'the whole third period,', 'and cheered anyway.', '',
        'The boy who scored on his own net', 'and laughed, at last,', 'when his team laughed with him.', '',
        'I hold their scratches', 'until the machine comes at night', 'and smooths me over like a page turned clean.', '',
        'They think I forget.', 'I do not forget.', 'I am made of water,', 'and water remembers', 'the shape of everything', 'that crosses it.'] }
    ],
    guide: { before: 'Explain personification: giving human qualities to something that is not human. Here, the ice itself is speaking. Kapuskasing is a town in northern Ontario. Teach <b>lifeboat</b> and <b>periods</b>.',
      after: 'If your school could remember, what moment of yours would it remember?' },
    words: [['lifeboat', 'a small boat kept ready to save people'], ['periods', 'the parts a hockey game is divided into']],
    qs: [
      { k: 'choice', code: 'C1.6', half: true, q: 'The speaker of the poem is',
        opts: ['a hockey player', 'the rink', 'a coach', 'the ice machine'], a: 1 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Ankles “bending like wet noodles” ({line:noodles}) are',
        opts: ['weak and wobbly', 'strong', 'cold', 'fast'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why did the goalie sing “so no one would hear her nerves” ({line:nerves})?',
        opts: ['to calm herself and hide that she was nervous', 'to entertain her team', 'because she was bored', 'to practise for a concert'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'What does the verse about the father ({line:Kapuskasing}) show?',
        opts: ['His support does not depend on how much his son plays.', 'He enjoys long drives.', 'He is the team’s coach.', 'His son is the star player.'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The middle verses each describe',
        opts: ['a different person', 'a different rink', 'a game score', 'the weather'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'The main message is that',
        opts: ['ordinary moments leave a mark', 'hockey is dangerous', 'rinks melt', 'only winning matters'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 3, q: 'The poem gives the rink a voice and a memory (personification). Why might the poet tell the poem from the rink’s point of view?',
        a: 'The rink has seen every player over many years, so it can notice small moments that people forget, like the goalie singing or the father cheering.', look: 'a reason linked to what only the rink could know or see' },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The rink says “water remembers the shape of everything that crosses it.” What do you think this means?',
        a: 'Even after the ice is smoothed, the moments that happened there still matter. Places hold the memories of the people who used them.', look: 'an interpretation that goes beyond ice and water to people and memory' }
    ]
  });

  P.add({
    id: 'g6-route-52', subject: 'story', form: 'Poem', lines: true,
    title: 'Route 52, 7:15',
    deck: 'A poem about a morning bus ride',
    hero: {
      photo: 'g5-city-bus.jpg', credit: 'Photo: Transportfan70, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 130,
      cap: 'A city bus in Toronto.'
    },
    body: [
      { poem: ['The bus kneels at the curb', 'with a sigh', 'and lets us climb into its warm belly:', '',
        'a nurse in green <b>scrubs</b>, eyes closed,', 'still smelling of hospital soap;', 'two boys from my school', 'arguing about a video game in Tagalog and English,', 'switching back and forth without noticing;', 'an old man with a cane and a newspaper', 'he does not read, only holds;', 'a woman in a hijab', 'singing very softly to a baby', 'who is falling asleep against her shoulder.', '',
        'Nobody talks to anybody.', 'Everybody makes room.', '',
        'When the man with the cane stands,', 'three hands reach out at once', 'to <b>steady</b> him.', '',
        'At my stop I step down', 'into the cold blue morning,', 'and the bus kneels again,', 'and sighs, and carries them all', 'away from me, toward the city,', 'like a big, slow heart', 'that is still, somehow, beating.'] }
    ],
    guide: { before: 'Explain that many city buses lower themselves at the curb (“kneel”) so that people with wheelchairs, walkers or strollers can get on easily. Tagalog is a language of the Philippines. Teach <b>scrubs</b> and <b>steady</b>.',
      after: 'Think of a place where people who do not know each other share space. How do they look after each other?' },
    words: [['scrubs', 'loose clothes worn by nurses and doctors'], ['steady', 'hold up so they do not fall']],
    qs: [
      { k: 'choice', code: 'C3.1', half: true, q: 'The bus “kneels” and “sighs.” These words are',
        opts: ['personification', 'similes', 'hyperbole', 'facts only'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Who is most likely coming home from a night shift?',
        opts: ['the nurse', 'the two boys', 'the baby', 'the speaker'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why does the bus “kneel at the curb” ({line:kneels})?',
        opts: ['It lowers itself so people can step on more easily.', 'It has broken down.', 'The driver is tired.', 'The road is icy.'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'What does the poem suggest about the people on the bus?',
        opts: ['They are very different from each other but look after one another.', 'They are all the same.', 'They are unfriendly.', 'They all know each other well.'], a: 0 },
      { k: 'choice', code: 'C1.5', q: '“Nobody talks to anybody. / Everybody makes room.” These two short lines side by side',
        opts: ['contrast silence with quiet kindness', 'show the bus is empty', 'make a rhyme', 'show people are angry'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Steady” ({line:steady}) here means',
        opts: ['hold up', 'push away', 'pay', 'wake up'], a: 0 },
      { k: 'choice', code: 'C1.6', half: true, q: 'The speaker is',
        opts: ['a student riding the bus', 'the driver', 'the nurse', 'the bus'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The bus is “like a big, slow heart that is still, somehow, beating.” Explain this comparison.',
        a: 'A heart pumps blood around the body; the bus carries people around the city every morning. Even when people are tired or silent, the city keeps going.', look: 'how the bus is like a heart (carries, keeps going), with a detail' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Three hands reach out to steady the man. What does this moment say about community?',
        a: 'Strangers care about each other even without speaking. People of different backgrounds share space and help without being asked.', look: 'a message about community or inclusion linked to the moment' }
    ]
  });

  P.add({
    id: 'g6-seed-and-tree', subject: 'story', form: 'Poem for two voices', lines: true,
    title: 'Seed and Tree',
    deck: 'A poem for two voices: read it with a partner',
    hero: {
      photo: 'g6-samaras.jpg', credit: 'Photo: USFWSmidwest, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'Silver maple samaras: seeds with papery wings.'
    },
    body: [
      { poem: ['<b class="ps-who">Tree:</b> I have stood here one hundred years.', '<b class="ps-who">Seed:</b> I have been alive for one week.', '',
        '<b class="ps-who">Tree:</b> My roots hold the <b>riverbank</b> together.', '<b class="ps-who">Seed:</b> I am a <b>samara</b>. I have one wing.', '',
        '<b class="ps-who">Tree:</b> Squirrels sleep in my arms. Children carve their names in me.', '<b class="ps-who">Seed:</b> The wind is calling my name right now.', '',
        '<b class="ps-who">Tree:</b> Storms have taken half my branches.', '<b class="ps-who">Seed:</b> I will spin like a helicopter, all the way down.', '',
        '<b class="ps-who">Tree:</b> Stay a little longer.', '<b class="ps-who">Seed:</b> You are the one who let me go.', '',
        '<b class="ps-who">Tree:</b> I let a thousand of you go every spring.', '<b class="ps-who">Seed:</b> How many of us grow?', '',
        '<b class="ps-who">Tree:</b> Not many. Maybe one.', '<b class="ps-who">Seed:</b> Then why do you keep letting go?', '',
        '<b class="ps-who">Tree:</b> Find a place with sun and a little rain.', '<b class="ps-who">Seed:</b> Will I remember you?', '',
        '<b class="ps-who">Tree:</b> You are made of me. You cannot forget.', '',
        '<b class="ps-who">Both:</b> One is enough to begin a forest.'] }
    ],
    guide: { before: 'A poem for two voices is read by two people. Decide who reads Tree and who reads Seed, and read “Both” together. Look at the photo of samaras (many children call them helicopters). Teach <b>riverbank</b> and <b>samara</b>.',
      after: 'The tree lets go of its seeds, and parents let go of children as they grow. When has letting go been hard for you?' },
    words: [['riverbank', 'the land along the side of a river'], ['samara', 'a seed with a papery wing']],
    qs: [
      { k: 'choice', code: 'C1.2', q: 'This is a poem for two voices. How can you tell who is speaking?',
        opts: ['Each line starts with the speaker’s name.', 'The lines rhyme.', 'Each verse has a title.', 'It uses quotation marks.'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: '“I will spin like a helicopter” ({line:helicopter}) is',
        opts: ['a simile', 'hyperbole', 'an idiom', 'a fact'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Who says “You are the one who let me go”?',
        opts: ['the seed', 'the tree', 'both', 'the wind'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does the tree keep letting a thousand seeds go when only one might grow?',
        opts: ['Even one seed growing is enough to continue the forest.', 'The tree does not care about its seeds.', 'The seeds are too heavy to hold.', 'The wind forces the tree.'], a: 0 },
      { k: 'choice', code: 'C1.5', q: 'At the end, both voices speak together. This shows that',
        opts: ['they finally agree and share one hope', 'they are still arguing', 'the poem is about to start again', 'a new character arrives'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'The poem is mostly about',
        opts: ['letting go and new beginnings', 'how to plant a tree', 'storm damage in a forest', 'squirrels and their nests'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'The tree says, “You are made of me. You cannot forget.” What could this mean for people as well as trees?',
        a: 'Children carry parts of their family with them, like habits, stories and looks, even when they grow up and move away.', look: 'an interpretation that connects the tree and seed to people' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the conversation between Seed and Tree in two or three sentences.',
        a: 'An old tree and a young seed talk before the seed flies away. The seed asks why the tree lets go when so few seeds grow. They agree that one seed is enough to begin a forest.', look: 'a short summary with the beginning, the question and the ending' }
    ]
  });

  P.add({
    id: 'g6-storm-coming', subject: 'story', form: 'Poem', lines: true,
    title: 'Storm Coming',
    deck: 'A poem about a summer thunderstorm in Toronto, told with a lot of exaggeration',
    hero: {
      photo: 'g6-cn-tower-lightning.jpg', credit: 'Photo: Raul Heinrich, CC BY-SA 3.0, Wikimedia Commons', focus: '50% 40%',
      tall: 150,
      cap: 'Lightning strikes the CN Tower in Toronto.'
    },
    body: [
      { poem: ['The sky over Lake Ontario', 'turned the green of an old pond,', 'and every dog in Toronto', 'crawled under every bed at once.', '',
        'The wind arrived first,', 'slamming doors in houses it had never visited,', 'flipping umbrellas inside out', 'like a <b>magician</b> showing off.', '',
        'Then the thunder: a sound', 'so huge that my grandmother in Halifax', 'phoned to ask if I was all right.', '',
        'Lightning struck the CN Tower', 'seven times in one minute,', 'as if the sky were trying to take its picture', 'and the camera kept flashing.', '',
        'The rain came down so hard', 'that the fish in the lake looked up', 'and asked to borrow umbrellas.', '',
        'And then, just like that,', 'it was over.', 'The street <b>steamed</b>.', 'A robin hopped out,', 'shook its feathers', 'and acted as if nothing had happened at all.'] }
    ],
    guide: { before: 'Explain hyperbole: exaggeration on purpose, for effect or fun (“I’ve told you a million times”). The CN Tower really is struck by lightning dozens of times a year, but not seven times a minute. Teach <b>magician</b> and <b>steamed</b>.',
      after: 'Which exaggeration made you smile most? Try writing one line of hyperbole about snow.' },
    words: [['magician', 'a performer who does tricks'], ['steamed', 'gave off steam or mist']],
    qs: [
      { k: 'choice', code: 'C3.1', q: 'Which line is hyperbole (exaggeration)?',
        opts: ['“every dog in Toronto / crawled under every bed at once”', '“The wind arrived first”', '“The street steamed”', '“A robin hopped out”'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Umbrellas flip “like a magician showing off” ({line:magician}). This is',
        opts: ['a simile', 'hyperbole', 'a fact', 'an idiom'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Grandmother phoning from Halifax shows',
        opts: ['how loud the thunder was', 'she worries a lot', 'it stormed in Halifax', 'phones work in storms'], a: 0 },
      { k: 'lines', code: 'C3.1', n: 2, q: 'The sky turns “the green of an old pond” ({line:pond}). What feeling does this create at the start of the poem?',
        a: 'An uneasy, gloomy feeling, as if something strange or bad is about to happen.', look: 'a feeling (uneasy, worried, gloomy) linked to the colour' },
      { k: 'choice', code: 'C1.5', q: 'Why does the poet end with a calm robin?',
        opts: ['to contrast the huge storm with how quickly calm returns', 'to start a second storm', 'to describe spring migration', 'to show the robin was hurt'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Where does the poem take place?',
        opts: ['Toronto', 'Halifax', 'on a ship', 'Ottawa'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'In “Then the thunder: a sound,” the colon',
        opts: ['introduces a description', 'starts a list of names', 'shows a speaker', 'ends the poem'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Is this poem mainly meant to inform readers about storms or to entertain them? Explain using two details.',
        a: 'To entertain. It uses funny exaggerations, like fish asking to borrow umbrellas and lightning taking pictures, instead of real facts about storms.', look: 'the purpose (entertain) with two details' }
    ]
  });

  P.add({
    id: 'g6-bird-bander', subject: 'science', form: 'Interview', lines: true, plain: true,
    title: 'Ten Grams of Courage',
    deck: 'A student reporter interviews a teenage volunteer at a bird banding station on Lake Erie',
    hero: {
      photo: 'g6-bird-banding.jpg', credit: 'Photo: Lorie Shaull, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 40%',
      tall: 130,
      cap: 'A researcher holds a magnolia warbler at a bird banding station.'
    },
    body: [
      '<i>Long Point, a narrow sandspit that stretches into Lake Erie, is one of the best places in Canada to watch birds <b>migrate</b>. Every spring and fall, volunteers there catch small birds, fit each one with a tiny numbered band and release it. Leo Moreau of the Lakeview Middle School newspaper interviewed Amara Mensah, 16, who has volunteered at the banding station for three seasons.</i>',
      '<b class="ps-who">Leo:</b> How do you catch a bird without hurting it?',
      '<b class="ps-who">Amara:</b> We use mist nets, made of very fine black mesh stretched between poles, a bit like a volleyball net. Birds cannot see them against the trees, so they fly in and become gently tangled. We check every net each half hour, and trained banders remove the birds carefully and carry them to the banding table in small cloth bags, because the darkness inside the bag keeps them calm.',
      '<b class="ps-who">Leo:</b> What happens at the table?',
      '<b class="ps-who">Amara:</b> First, we close a band of the right size around the bird’s leg with special pliers. Every band carries its own number, like a licence plate. Then we identify the <b>species</b>, measure the length of one wing, check how much fat the bird is carrying and weigh it. Small birds slide head-first into a plastic cone on the scale so that they stay still. A yellow warbler weighs about ten grams, which is less than two loonies.',
      '<b class="ps-who">Leo:</b> Why does fat matter?',
      '<b class="ps-who">Amara:</b> Fat is fuel. Some of these birds travel thousands of kilometres, from northern Canada to Central or South America. A bird with plenty of fat can keep going, while a thin one probably needs to rest and feed here for a few days before it crosses the lake.',
      '<b class="ps-who">Leo:</b> What do you do with all those numbers?',
      '<b class="ps-who">Amara:</b> Everything is sent to Canada’s Bird Banding Office. If someone anywhere in the world finds or catches a banded bird, they report its number, and scientists can trace where it travelled and how long it lived. One of our songbirds was caught again in Colombia, which still amazes me.',
      '<b class="ps-who">Leo:</b> What is the hardest part?',
      '<b class="ps-who">Amara:</b> The early mornings, because we open the nets half an hour before sunrise. Honestly, though, holding a bird that weighs less than a pencil, knowing it is about to fly to another continent, is the best feeling in the world.',
      '<b class="ps-who">Leo:</b> What would you tell a student who wants to try it?',
      '<b class="ps-who">Amara:</b> Start by learning ten common birds in your own neighbourhood. At the beginning, patience matters more than knowledge. The birds will teach you the rest.',
      { img: 'g6-flyways.jpg', credit: 'Map: U.S. Fish and Wildlife Service, public domain, Wikimedia Commons', tall: 190, cap: 'The four main flyways, or routes, that birds follow across North America when they migrate.' }
    ],
    guide: { before: 'Find Long Point on a map of Ontario (it reaches into Lake Erie). Explain that banding helps scientists track where birds go. Look at the flyways map first. Teach <b>migrate</b> and <b>species</b>.',
      after: 'Why do you think volunteers give up early mornings to do this work? Would you?' },
    words: [['migrate', 'move to another region as the seasons change'], ['species', 'one kind of living thing']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'This text is',
        opts: ['an interview', 'a diary', 'a poem', 'a letter'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A “species” ({line:species}) is',
        opts: ['one kind of living thing', 'a bird’s band', 'a kind of net', 'a nest'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'Which statement is an opinion, not a fact?',
        opts: ['“A yellow warbler weighs about ten grams.”', '“Every band carries its own number.”', '“[It] is the best feeling in the world.”', '“We open the nets half an hour before sunrise.”'], a: 2 },
      { k: 'choice', code: 'C1.4', q: 'What does the flyways map add to the interview?',
        opts: ['It shows the main routes birds follow when they migrate.', 'It shows how mist nets are built.', 'It shows where Leo goes to school.', 'It shows how much a warbler weighs.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why would it amaze Amara that one of the station’s songbirds was caught again in Colombia?',
        a: 'The bird weighs only a few grams but flew thousands of kilometres, and it is very rare for the same tiny bird to be caught again.', look: 'the bird’s small size or the huge distance, and how rare a recapture is' },
      { k: 'table', code: 'C2.6', q: 'Fill in the chart about what happens to a bird at the station.', cols: ['Step', 'What happens'],
        rows: [['Catch', null], ['Band', null], ['Measure', null]],
        a: [[null, 'It flies into a mist net and is carried to the table in a cloth bag.'], [null, 'A numbered band is closed around its leg.'], [null, 'Its wing, fat and weight are checked.']] },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Amara says that at first “patience matters more than knowledge.” Why might patience matter so much in bird banding?',
        a: 'You have to wait for birds to fly into the nets, check them again and again, and handle tiny birds slowly and carefully. Knowledge comes over time.', look: 'a reason linked to the work described (waiting, careful handling)' }
    ]
  });

  P.add({
    id: 'g6-wheelchair-racer', subject: 'health', form: 'Interview', lines: true, plain: true,
    title: 'Faster Than the Hill',
    deck: 'A class podcast talks with a young wheelchair racer from Peterborough',
    hero: {
      photo: 'g5-wheelchair-racer.jpg', credit: 'Photo: Pierre-Yves Beaudouin, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 42%',
      tall: 110,
      cap: 'A wheelchair racer on a track. Racing chairs have three wheels and are built for speed.'
    },
    body: [
      '<i>Ms. Bianchi’s Grade 6 class in Peterborough records a podcast about people in their community. This episode, students Hamza and Lily spoke with Daniel Côté, 14, who races in a wheelchair and hopes to compete for Canada one day.</i>',
      '<b class="ps-who">Hamza:</b> How is a racing chair different from the chair you use every day?',
      '<b class="ps-who">Daniel:</b> They are completely different machines. My everyday chair is built for comfort and for turning in small spaces. My racing chair is long and low, with two big back wheels and one small wheel out in front, so it looks a bit like a rocket lying on its side. The back wheels lean in at the top, which makes the chair much more <b>stable</b> at high speed. I kneel in a seat called a cage, and I push the rims with special gloves.',
      { fig: '<circle class="k" cx="78" cy="70" r="48"/><circle class="d" cx="78" cy="70" r="40"/><circle class="k" cx="78" cy="70" r="4"/>' +
          '<path class="k" d="M78 70 L126 92 L254 104"/><circle class="k" cx="256" cy="104" r="13"/><circle class="k" cx="256" cy="104" r="3"/>' +
          '<rect class="h" x="60" y="48" width="66" height="30" rx="10"/><path class="k" d="M196 100 L204 82 L222 82"/>' +
          '<path class="t" d="M136 18 L108 40 M148 48 L124 58"/>' +
          T(140, 20, 'push rim', 'l') + T(152, 52, 'cage (kneeling seat)', 'l') + T(226, 86, 'steering', 'n') +
          T(78, 136, 'big back wheel', 'l', 'middle') + T(296, 136, 'small front wheel', 'l', 'end'),
        tall: 140, cap: 'A racing chair seen from the side: long and low, with one small wheel out in front.' },
      '<b class="ps-who">Lily:</b> How fast can you go?',
      '<b class="ps-who">Daniel:</b> On a flat track, about thirty kilometres an hour when I am sprinting. Downhill on a road race, faster than that, which is when the steering really matters.',
      '<b class="ps-who">Hamza:</b> What does your training look like?',
      '<b class="ps-who">Daniel:</b> I train five days a week. Two days are long, steady pushes on the trail beside the canal, two are short sprints on the track, and one day is in the gym, mostly strengthening my shoulders and core. People assume that wheelchair racing is all arms. In fact, your stomach and back muscles do a lot of the work, because they keep you balanced while you push.',
      '<b class="ps-who">Lily:</b> Who inspired you?',
      '<b class="ps-who">Daniel:</b> Chantal Petitclerc, without question. She won fourteen gold medals at the Paralympic Games and later became a senator. When I was eight, my coach showed me a video of her finishing a race, and I watched it a hundred times.',
      '<b class="ps-who">Hamza:</b> Is there anything you wish people understood?',
      '<b class="ps-who">Daniel:</b> Mostly, I wish more places were built so that everyone could get in. I can push a kilometre in under three minutes, but I still cannot get into the front door of my favourite pizza place, because it has two steps and no ramp. That is not a problem with my legs. It is a problem with the building. The <b>barrier</b> is the steps, not me.',
      '<b class="ps-who">Hamza:</b> How are races organized so that they are fair?',
      '<b class="ps-who">Daniel:</b> Athletes are grouped into classes according to how their disability affects their movement, so that people with similar abilities compete against one another. I race in the T54 class, which includes athletes with full use of their arms and trunk. The goal is straightforward: the result should depend on training, strategy and effort, not on the particular disability someone happens to have.',
      '<b class="ps-who">Lily:</b> Last question. What do you think about when you race?',
      '<b class="ps-who">Daniel:</b> Nothing. That is the best part. My mind goes completely quiet, and it is just the wheels and the wind and the line.'
    ],
    guide: { before: 'Look at the photo of a racing chair and point out the three wheels and the tilted back wheels. Chantal Petitclerc is a real Canadian athlete; Daniel is made up for this site. Ask: what is a barrier? Teach <b>stable</b> and <b>barrier</b>.',
      after: 'Daniel says “the barrier is the steps, not me.” Look around your school or street: what barriers do you notice? How could they be fixed?' },
    words: [['stable', 'steady and not likely to tip'], ['barrier', 'something that blocks the way']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'Why do the back wheels lean in at the top?',
        opts: ['to make the chair stable', 'to look like a rocket', 'to fit through doors', 'to be lighter'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The chair “looks a bit like a rocket lying on its side” ({line:rocket}). This is',
        opts: ['a simile', 'hyperbole', 'an idiom', 'personification'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'Which idea from the interview does Daniel want to correct?',
        opts: ['that wheelchair racing is all arms', 'that racing chairs have wheels', 'that training takes time', 'that Peterborough has a canal'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'What does Daniel mean when he says “The barrier is the steps, not me” ({line:barrier})?',
        opts: ['Buildings, not people with disabilities, should change so everyone can get in.', 'He does not like pizza.', 'Steps are good exercise.', 'He needs stronger legs.'], a: 0 },
      { k: 'choice', code: 'C1.1', half: true, q: 'Who is Chantal Petitclerc?',
        opts: ['a Paralympic champion', 'Daniel’s coach', 'a student', 'a podcast host'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Stable” ({line:stable}) means',
        opts: ['steady', 'fast', 'heavy', 'shiny'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Using details from the interview, explain why wheelchair racing takes more than strong arms.',
        a: 'Daniel trains his core in the gym because stomach and back muscles keep him balanced while he pushes. He also needs skill to steer downhill.', look: 'two details (core muscles, balance, steering, endurance training)' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Daniel cannot get into his favourite pizza place. Suggest a change the owner could make, and explain why it would matter to more people than just Daniel.',
        a: 'The owner could add a ramp. It would also help people with strollers, walkers or delivery carts, so more customers could get in.', look: 'a practical change and who else benefits' }
    ]
  });

  P.add({
    id: 'g6-costume-shop', subject: 'arts', form: 'Interview', lines: true, plain: true,
    title: 'The Wardrobe Behind the Stage',
    deck: 'An interview with a costume maker at a large Ontario theatre festival',
    hero: {
      photo: 'g7-stratford.jpg', credit: 'Photo: Chris Woodrich, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 140,
      cap: 'The Festival Theatre in Stratford, Ontario.'
    },
    body: [
      '<i>Every season, theatres in Stratford, Ontario, stage plays for audiences from around the world. Behind each performance is a workshop full of people who design and build what the actors wear. Ruby Tanaka, a Grade 6 student, interviewed Grace Mutua, a costume cutter who has worked in theatre wardrobes for twenty years. (Grace is a character created for this site.)</i>',
      '<b class="ps-who">Ruby:</b> What does a costume cutter do?',
      '<b class="ps-who">Grace:</b> A designer draws what a costume should look like. My job is to turn that drawing into a real garment that fits a real person. I take the actor’s measurements, draft a paper pattern, cut the fabric and supervise the people who sew it. A complicated gown can take more than two hundred hours.',
      '<b class="ps-who">Ruby:</b> Why does it take so long? Couldn’t you just buy clothes?',
      '<b class="ps-who">Grace:</b> Sometimes we do, for a modern play. But if a play is set in 1890, nobody sells those clothes anymore. We study old photographs and paintings so the shapes are <b>authentic</b>. Stage costumes also need to survive more than a hundred performances, quick changes in the dark and actors who sweat under hot lights. A store-bought shirt would fall apart in a week.',
      '<b class="ps-who">Ruby:</b> What is a quick change?',
      '<b class="ps-who">Grace:</b> It is when an actor leaves the stage in one costume and has to come back, sometimes thirty seconds later, in a different one. We hide magnets, snaps and long zippers inside costumes so that two dressers can strip one off and fasten the next almost instantly. The audience never notices, which is exactly the point.',
      '<b class="ps-who">Ruby:</b> What is the strangest thing you have ever done to a costume?',
      '<b class="ps-who">Grace:</b> We often make new costumes look old on purpose. It is called breaking down. For a play about miners, we rubbed brand-new jackets with sandpaper and cheese graters, soaked them in tea, and painted dust onto the knees. One actor said his jacket smelled like a campfire for the entire season.',
      '<b class="ps-who">Ruby:</b> What happens to costumes after a play closes?',
      '<b class="ps-who">Grace:</b> Very little is thrown away. Costumes are cleaned, repaired, labelled and stored in an enormous warehouse, organized by period and size, so that designers can borrow and alter them for future productions. Some festivals even rent costumes to schools and community theatres. Reusing a well-made jacket is more economical and more environmentally responsible than building a new one, and occasionally the same coat appears in three different plays over a decade, wearing three completely different personalities.',
      { fig: G.flow(['1. A designer draws the costume.', '2. The cutter measures and drafts a pattern.', '3. Fabric is cut, sewn and fitted.', '4. After the run: cleaned, stored, reused.'], { x: 20, w: 260, bh: 26, gap: 12, hl: 1 }),
        tall: 144, cap: 'The life of a stage costume. Grace’s job is step 2.' },
      '<b class="ps-who">Ruby:</b> What advice would you give a student who loves fashion?',
      '<b class="ps-who">Grace:</b> Learn to sew by hand first, even if it is slow. Then study how real clothes are built: turn your own clothes inside out and look at the seams. Every <b>garment</b> is a puzzle that someone already solved.'
    ],
    guide: { before: 'Ask what the child knows about plays and costumes. Explain that a wardrobe department makes the clothes for a theatre. Teach <b>authentic</b> and <b>garment</b>.',
      after: 'Grace says the audience should never notice a quick change. Why is good work in theatre often invisible?' },
    words: [['authentic', 'true to the real thing'], ['garment', 'a piece of clothing']],
    qs: [
      { k: 'choice', code: 'C3.3', half: true, q: 'A costume cutter mainly',
        opts: ['turns drawings into costumes that fit', 'acts on stage', 'sells tickets', 'designs sets'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Authentic” ({line:authentic}) means',
        opts: ['true to the real thing', 'very old', 'expensive', 'colourful'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Why can’t the theatre simply buy clothes for a play set in 1890?',
        opts: ['Nobody sells clothes like that now, and store clothes would not last.', 'Stores are too far away.', 'Actors prefer handmade clothes.', 'Designers do not like stores.'], a: 0 },
      { k: 'choice', code: 'C1.1', q: 'Why are magnets, snaps and long zippers hidden inside costumes?',
        opts: ['so dressers can change an actor’s costume very quickly', 'to make costumes heavier', 'to decorate them', 'to keep actors warm'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: '“The audience never notices, which is exactly the point” suggests that good costume work',
        opts: ['is hidden', 'is loud', 'is cheap', 'is rushed'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'The words in italics at the start',
        opts: ['introduce the people and topic', 'are Grace’s answers', 'list the plays', 'are stage directions'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'In your own words, explain what “breaking down” a costume means and why theatres do it.',
        a: 'It means making a new costume look old and worn, with sandpaper, tea and paint, so that characters like miners look believable on stage.', look: 'a definition in own words and the reason (to look real or believable)' },
      { k: 'lines', code: 'C2.2', n: 3, q: 'If you wanted to learn more about theatre costumes, what kind of text or source would you choose next, and why?',
        a: 'I would watch a video tour of a costume workshop, because I could see quick changes and the tools Grace describes.', look: 'a suitable source and a reason linked to the purpose' }
    ]
  });

  P.add({
    id: 'g6-food-bank', subject: 'social', form: 'Interview', lines: true, plain: true,
    title: 'More Than Cans',
    deck: 'Two students interview the volunteer coordinator at their local food bank',
    hero: {
      photo: 'g5-food-bank.jpg', credit: 'Photo: U.S. Department of Agriculture, Public domain, Wikimedia Commons', focus: '50% 82%',
      tall: 140,
      cap: 'Shelves of food at a food bank.'
    },
    body: [
      '<i>Students from Riverside Public School in Brampton collected food for their local food bank. Before the drive, Sofia and Nate interviewed Harjit Gill, the food bank’s volunteer coordinator, to learn how it works. (Harjit is a character created for this site.)</i>',
      '<b class="ps-who">Sofia:</b> Who uses a food bank?',
      '<b class="ps-who">Harjit:</b> All kinds of people, and many would surprise you. Some of our clients have jobs, but their rent has risen faster than their pay. Some are students, seniors on a small pension, newcomers waiting for work permits, or parents who suddenly lost a job. Across Canada, about one in three people who use food banks are children. Hunger is not always visible, and it is rarely anyone’s fault.',
      { fig: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) { var x = 18 + i * 24, c = i % 3 === 1;
            return c ? '<circle class="a" cx="' + x + '" cy="32" r="4.5"/><rect class="a" x="' + (x - 5) + '" y="39" width="10" height="17" rx="4"/>'
              : '<circle class="k" cx="' + x + '" cy="18" r="5.5"/><rect class="k" x="' + (x - 6.5) + '" y="27" width="13" height="29" rx="5"/>'; }).join('') +
          '<path class="t" d="M6 60 H294"/>' + T(150, 78, 'about 1 in every 3 people helped is a child', 'l', 'middle'),
        tall: 86, cap: 'Who uses food banks in Canada. Each shaded figure is a child.' },
      '<b class="ps-who">Nate:</b> What happens when someone comes in?',
      '<b class="ps-who">Harjit:</b> We used to hand everyone the same box. Now we run our food bank like a small grocery store. Clients walk through with a cart and choose what they need, up to a set amount. A family that eats halal food, someone with a nut allergy, a person who does not have a stove: everyone’s needs are different. Choosing your own food also protects people’s <b>dignity</b>, which matters as much as the food itself.',
      '<b class="ps-who">Nate:</b> Where does most of your food come from?',
      '<b class="ps-who">Harjit:</b> Approximately half comes from community food drives and individual donations. The rest arrives from grocery stores, farms and food companies that donate surplus products, such as vegetables with small blemishes or cereal in discontinued packaging, which would otherwise be thrown away. Every delivery is inspected, sorted into categories and recorded in a database, so that we always know exactly what is available and what we urgently need.',
      '<b class="ps-who">Sofia:</b> What should we collect in our food drive?',
      '<b class="ps-who">Harjit:</b> Think about what you would want in your own kitchen. Peanut butter, canned fish, whole-grain cereal, rice, lentils and baby formula are always needed. Please check the dates, and skip anything in glass, because it breaks. Cash donations help too, because we can buy fresh milk, eggs and vegetables in bulk at a lower price than you can.',
      '<b class="ps-who">Nate:</b> Can kids volunteer?',
      '<b class="ps-who">Harjit:</b> Students aged twelve and up can help sort donations with a parent, and high school students often earn their volunteer hours here. Younger students help most by organizing drives, like you are doing, and by speaking up when they hear people repeat <b>myths</b> about who needs help.',
      '<b class="ps-who">Sofia:</b> What is one myth you would like to end?',
      '<b class="ps-who">Harjit:</b> That a food bank is a permanent solution. We are an emergency service. The long-term answer is making sure that housing, wages and benefits allow every family to buy its own groceries. Until then, we will be here, and we are grateful for every can.'
    ],
    guide: { before: 'Ask what the child knows about food banks. Prepare for the topic gently: some children in any class may use a food bank. Teach <b>dignity</b> and <b>myths</b>.',
      after: 'Harjit says hunger is “rarely anyone’s fault.” Why is it important to believe this when we talk about people who need help?' },
    words: [['dignity', 'the feeling of being respected and valued'], ['myths', 'common beliefs that are not true']],
    qs: [
      { k: 'choice', code: 'C3.5', q: 'Which belief does Harjit want to correct?',
        opts: ['that only people without jobs use food banks', 'that food banks need volunteers', 'that peanut butter is useful', 'that Brampton has a food bank'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Dignity” ({line:dignity}) is the feeling of being',
        opts: ['respected', 'hungry', 'rich', 'busy'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'Why should donors skip glass jars?',
        opts: ['They break.', 'They are heavy.', 'They are expensive.', 'They are too small.'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'Why did the food bank change from handing out the same box to letting clients choose?',
        opts: ['People have different needs, and choosing protects their dignity.', 'Boxes cost too much.', 'Volunteers were too slow.', 'The building was too small.'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: '“Hunger is not always visible” suggests that',
        opts: ['people may need help without others knowing', 'hungry people hide', 'food is invisible', 'nobody is hungry'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'The sentence in brackets at the start tells readers that',
        opts: ['Harjit is not a real person', 'the interview was long', 'Brampton is a city', 'Sofia is the writer'], a: 0 },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Harjit says a food bank is “an emergency service,” not a permanent solution. What does he think the long-term solution is? Do you agree?',
        a: 'He thinks housing, wages and benefits should let every family buy its own groceries. I agree, because then families would not need emergency help.', look: 'the long-term solution from the text and a supported opinion' },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Write two tips for a successful school food drive, based on the interview.',
        a: 'Collect healthy food people use every day, like peanut butter, rice and canned fish. Check the dates and do not collect glass.', look: 'two tips taken from the interview, in own words' }
    ]
  });

  P.add({
    id: 'g6-cloud-journal', subject: 'science', form: 'Observation journal', lines: true, plain: true,
    title: 'Five Days of Sky',
    deck: 'A Grade 6 student in Sudbury records the clouds and tries to predict the weather',
    hero: {
      photo: 'g4-clouds.jpg', credit: 'Photo: Lance Vanlewen, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 120,
      cap: 'Cumulus clouds in a blue sky.'
    },
    body: [
      '<i>For a science project, Ana Ferreira kept a weather journal. Each morning at 8:00, she recorded the temperature, the clouds she could see and a prediction for the afternoon. Each evening, she checked whether she had been right.</i>',
      '<b class="ps-who">Why clouds form:</b> Clouds form when moist air rises and cools. Cooler air cannot hold as much water vapour, so some of the vapour condenses into tiny droplets or ice crystals around specks of dust. The height at which this happens, and how rapidly the air is rising, determines what kind of cloud appears: slowly rising air produces flat, layered clouds, while air that rises rapidly on a hot afternoon builds towering cumulonimbus.',
      '<b class="ps-who">Monday, May 5:</b> 9 °C, blue sky with a few puffy white clouds that looked like heaps of cotton. These are cumulus, which usually mean fair weather. <i>Prediction:</i> sunny and dry. <i>Evening:</i> Correct. The clouds grew a little in the afternoon and then melted away by supper.',
      '<b class="ps-who">Tuesday, May 6:</b> 11 °C, very high, thin, wispy streaks, like someone had brushed white paint across the sky. My book says these are cirrus clouds, made of ice crystals, and that they can mean a change in the weather within a day or two. <i>Prediction:</i> still dry today, rain possible tomorrow. <i>Evening:</i> Correct so far. The streaks thickened into a pale sheet that made a ring around the sun.',
      '<b class="ps-who">Wednesday, May 7:</b> 8 °C, the whole sky is one flat grey layer, low and heavy, like a lid on a pot. These are stratus or nimbostratus clouds. <i>Prediction:</i> steady rain. <i>Evening:</i> Correct. It drizzled all day, and our soccer practice was cancelled, which I did not predict but should have.',
      '<b class="ps-who">Thursday, May 8:</b> 16 °C, warm and sticky by noon, with cumulus clouds piling up into towers with flat, anvil-shaped tops. These are cumulonimbus, the tallest clouds, which bring thunderstorms. <i>Prediction:</i> storm after school. <i>Evening:</i> Partly right. The storm arrived at 2:30, an hour earlier than I guessed, with hail the size of peas.',
      '<b class="ps-who">Friday, May 9:</b> 7 °C, clear, cool and windy. <i>Prediction:</i> sunny all day. <i>Evening:</i> Correct.',
      '<b class="ps-who">What I learned:</b> I predicted the general weather correctly on all five days, but I was wrong about timing once. Clouds give clues, but a single <b>observation</b> is not enough. Real forecasters combine cloud observations with air pressure, wind and satellite images. Next time, I would add a <b>barometer</b> reading, because falling air pressure often warns that a storm is approaching.',
      { img: 'g6-cloud-types.png', credit: 'Diagram: Valentin de Bruyn / Coton, CC BY-SA 3.0, Wikimedia Commons', tall: 200, cap: 'Cloud types arranged by height. High clouds are made of ice crystals; the tallest, cumulonimbus, can reach from low to high.' }
    ],
    guide: { before: 'Look at the cloud diagram first and say the names together (cumulus, cirrus, stratus, cumulonimbus). Explain that a prediction is a guess based on evidence. Teach <b>observation</b> and <b>barometer</b>.',
      after: 'Look outside right now. What clouds do you see, and what would you predict for this afternoon?' },
    words: [['observation', 'something you notice by watching carefully'], ['barometer', 'a tool that measures air pressure']],
    qs: [
      { k: 'choice', code: 'C1.3', q: 'Why does each entry include a prediction and then an evening check?',
        opts: ['to test whether the cloud clues led to correct predictions', 'to make the journal longer', 'to record what Ana ate', 'to list the temperatures in order'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the diagram. Which clouds are highest?',
        opts: ['cirrus', 'stratus', 'cumulus', 'nimbostratus'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Clouds “like a lid on a pot” ({line:lid}) are',
        opts: ['flat and covering the sky', 'tall and stormy', 'thin and wispy', 'small and puffy'], a: 0 },
      { k: 'choice', code: 'C2.3', q: 'On Tuesday, which clue led Ana to predict rain the next day?',
        opts: ['high, thin cirrus clouds', 'puffy cumulus clouds', 'a cold temperature', 'hail'], a: 0 },
      { k: 'choice', code: 'C3.3', half: true, q: 'On which day was Ana only partly right?',
        opts: ['Thursday', 'Monday', 'Wednesday', 'Friday'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'An “anvil-shaped” top ({line:anvil}) is',
        opts: ['flat and spreading', 'round', 'pointed', 'ragged'], a: 0 },
      { k: 'lines', code: 'C2.3', n: 3, q: 'Ana says “a single observation is not enough.” Explain what she means, using her Thursday entry.',
        a: 'She knew a storm was coming from the cumulonimbus clouds, but not exactly when. Other information, like air pressure, would have helped her predict the time.', look: 'the Thursday detail (right about the storm, wrong about the time) and why more evidence helps' },
      { k: 'lines', code: 'C2.7', n: 3, q: 'Making predictions and checking them helped Ana understand the weather. How did making a prediction help you while reading this journal?',
        a: 'After Tuesday’s cirrus clouds, I predicted rain was coming, and then I read on to check. It made me pay attention to the clues.', look: 'a specific prediction they made and how checking it helped' }
    ]
  });

  /* cartoon helpers: a person seen from the front, sitting behind a table (head at cx, y) or standing (feet at y) */
  function sitter(cx, y, phone) {
    return '<circle class="k" cx="' + cx + '" cy="' + y + '" r="16"/><path class="k" d="M' + (cx - 24) + ' ' + (y + 58) + ' Q' + (cx - 22) + ' ' + (y + 22) + ' ' + cx + ' ' + (y + 22) + ' Q' + (cx + 22) + ' ' + (y + 22) + ' ' + (cx + 24) + ' ' + (y + 58) + '"/>' +
      (phone ? '<path class="t" d="M' + (cx - 5) + ' ' + (y + 5) + ' h3 M' + (cx + 3) + ' ' + (y + 5) + ' h3"/><rect class="a" x="' + (cx - 7) + '" y="' + (y + 30) + '" width="14" height="20" rx="2"/>' +
        '<path class="k" d="M' + (cx - 20) + ' ' + (y + 50) + ' L' + (cx - 7) + ' ' + (y + 44) + ' M' + (cx + 20) + ' ' + (y + 50) + ' L' + (cx + 7) + ' ' + (y + 44) + '"/>' : '');
  }
  function stander(cx, y, s) {
    s = s || 1;
    var h = function (v) { return (v * s).toFixed(1); };
    return '<circle class="k" cx="' + cx + '" cy="' + h(y / s - 112) + '" r="' + h(14) + '"/>' +
      '<path class="k" d="M' + cx + ' ' + h(y / s - 98) + ' V' + h(y / s - 46) + ' M' + cx + ' ' + h(y / s - 46) + ' L' + (cx - 14 * s) + ' ' + y + ' M' + cx + ' ' + h(y / s - 46) + ' L' + (cx + 14 * s) + ' ' + y + '"/>';
  }
  /* a speech bubble with its tail pointing to (tx, ty) */
  function bubble(x, y, w, h, tx, ty, lines) {
    return '<rect class="k" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12"/><path class="k" d="M' + (tx - 8) + ' ' + (y + h) + ' L' + tx + ' ' + ty + ' L' + (tx + 8) + ' ' + (y + h) + '"/>' +
      [].concat(lines).map(function (l, i) { return T(x + w / 2, y + 18 + i * 15, l, 'l', 'middle'); }).join('');
  }

  P.add({
    id: 'g6-iqaluit-journal', subject: 'geography', form: 'Class journal', lines: true, plain: true,
    title: 'Five Days in Iqaluit',
    deck: 'A class from Kingston keeps a journal during a youth exchange to the capital of Nunavut',
    hero: {
      photo: 'g4-iqaluit.jpg', credit: 'Photo: Quintin Soloviev, CC BY 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 220,
      cap: 'Iqaluit, Nunavut, on the shore of Frobisher Bay.'
    },
    body: [
      '<i>In April, a Grade 6 class from Kingston, Ontario, travelled to Iqaluit, the capital of Nunavut, as part of a youth exchange. Students took turns writing in the class journal. In June, their partners from Iqaluit will visit Kingston.</i>',
      '<b class="ps-who">April 14, Owen:</b> No road connects Iqaluit to the rest of Canada, so we flew for more than three hours north from Ottawa, mostly over ice and rock. The first thing I noticed after landing was the light: at half past eight in the evening, it was still bright enough to read outside. Our exchange partners met us at the airport holding a sign that said WELCOME in English and in Inuktitut <b>syllabics</b>, the writing system used for Inuktitut in much of Nunavut.',
      '<b class="ps-who">April 15, Priya:</b> My host sister, Annie, taught me to say <i>ullaakkut</i> (good morning) and <i>qujannamiik</i> (thank you). Street signs, the bank and even the stop signs are written in both languages. Annie explained that Iqaluit means “place of many fish,” and that most people in Nunavut are Inuit, whose ancestors have lived in the Arctic for thousands of years.',
      '<b class="ps-who">April 16, Marcus:</b> We visited a grocery store, and our teacher asked us to compare prices with Kingston. Four litres of milk cost about three times as much, because almost everything must arrive by plane or, during the short summer, by ship. Annie’s family eats a lot of country food, which means food harvested from the land and sea, such as caribou, seal and Arctic char. Sharing it with relatives and elders is an important tradition.',
      '<b class="ps-who">April 18, Hana:</b> The best day so far. Annie’s uncle drove us onto the frozen bay by snowmobile, towing a long wooden sled called a <b>qamutik</b>. He drilled through ice more than a metre thick, and we jigged for Arctic char. I caught nothing, but I learned that patience is a real skill out there, and that the land is not empty at all once someone shows you how to read it: the tracks, the wind direction, the colour of the ice.',
      '<b class="ps-who">April 19, Owen:</b> Last day. We gave our hosts a jar of maple syrup and a book about Kingston, and Annie gave each of us a small soapstone carving of a char. In June, we will show them Lake Ontario, which Annie says she imagines as an enormous, very warm bathtub.',
      { img: 'g6-nunavut-map.png', credit: 'Map: Flappiefh, CC BY-SA 4.0, Wikimedia Commons', tall: 200, cap: 'Nunavut (yellow) is Canada’s largest territory. Iqaluit is on Baffin Island, the largest island, near its southeast end.' }
    ],
    guide: { before: 'Find Nunavut and Iqaluit on the map. Explain that Inuktitut is written in syllabics, symbols that each stand for a syllable. Teach <b>syllabics</b> and <b>qamutik</b> (ka-MOO-tik).',
      after: 'What did the students learn that they could not have learned from a book? What would you most want to learn on a trip like this?' },
    words: [['syllabics', 'a writing system in which each symbol stands for a syllable'], ['qamutik', 'a long sled pulled by a snowmobile or dogs']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'Each entry begins with a date and a name to show',
        opts: ['when it was written and by whom', 'how long it is', 'who is the best writer', 'the weather'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'The map helps readers understand',
        opts: ['where Nunavut and Iqaluit are', 'the price of milk', 'how to drive there', 'where Kingston is'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Why does food cost more in Iqaluit than in Kingston?',
        opts: ['Almost everything must arrive by plane or ship.', 'People in Iqaluit eat more.', 'Stores in Iqaluit are bigger.', 'Milk is made differently there.'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Country food” ({line:country}) means',
        opts: ['food from the land and sea', 'food from other countries', 'farm vegetables', 'fast food'], a: 0 },
      { k: 'choice', code: 'C3.4', half: true, q: 'Signs are in English and Inuktitut because',
        opts: ['Inuktitut is a main language there', 'tourists need them', 'English is new there', 'Ontario requires it'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Hana says “the land is not empty at all once someone shows you how to read it” ({line:empty}). She means that',
        opts: ['the land is full of information for people who know how to look', 'there are many books on the land', 'the land has many road signs', 'there are many buildings outside town'], a: 0 },
      { k: 'lines', code: 'C3.4', n: 3, q: 'Name two cultural elements the students learned about (for example language, food or traditions). Explain why one of them matters to people in Iqaluit.',
        a: 'Inuktitut on signs and sharing country food. Sharing country food with relatives and elders matters because it keeps families and traditions strong.', look: 'two cultural elements from the journal and why one matters' },
      { k: 'lines', code: 'C2.5', n: 3, q: 'Annie will visit Kingston in June. What would you show a visitor from Iqaluit in your community, and why?',
        a: 'I would show them the farmers’ market, because they could taste fresh fruit that is expensive in Iqaluit.', look: 'a place in their community and a reason linked to the journal' }
    ]
  });

  P.add({
    id: 'g6-three-sisters-log', subject: 'science', form: 'Garden log', lines: true, plain: true,
    title: 'The Three Sisters Garden',
    deck: 'A school garden log, from planting in May to the harvest in September',
    hero: {
      photo: 'g4-three-sisters.jpg', credit: 'Photo: U.S. National Park Service, public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'A Three Sisters garden: corn, beans and squash growing together.'
    },
    body: [
      '<i>Students at Grand River Public School in Brantford planted a Three Sisters garden beside their portable. Before planting, Mrs. Hill, a <b>knowledge keeper</b> from Six Nations of the Grand River, visited the class. These are entries from the class garden log.</i>',
      '<b class="ps-who">May 22:</b> Mrs. Hill explained that the Haudenosaunee have grown corn, beans and squash together for many centuries, and call them the Three Sisters because they help one another the way family members do. She showed us how to build low mounds of soil about a metre apart, so that rainwater collects around the roots instead of washing them away. We planted four corn seeds in the centre of each mound.',
      '<b class="ps-who">June 12:</b> The corn is about fifteen centimetres tall, so today we planted bean seeds in a ring around each stalk. Mrs. Hill said that if we planted the beans too early, they would grow faster than the corn and have nothing to climb. Timing matters as much as the seeds themselves.',
      '<b class="ps-who">June 19:</b> We planted squash between the mounds. Its huge, prickly leaves will spread across the ground like umbrellas, shading the soil so it stays damp and blocking sunlight from weeds. The prickles also discourage raccoons, who apparently dislike walking on scratchy leaves.',
      '<b class="ps-who">July 24:</b> The bean vines have wound themselves around the corn stalks, using them as poles. We learned in science that beans have tiny lumps on their roots called nodules, where bacteria take <b>nitrogen</b> from the air and turn it into a form that plants can use. That means the beans feed the soil, and the soil feeds the hungry corn.',
      '<b class="ps-who">September 15:</b> Harvest day. We picked eleven kilograms of squash, a large bowl of beans and dozens of cobs of white corn. Mrs. Hill showed us how to braid the husks so that the corn could hang and dry, and she reminded us to save the best seeds for next spring. Each sister gives something, she said, and each one receives something. That is how a garden, and a community, keeps going.',
      { fig: '<circle class="d" cx="150" cy="78" r="66"/><circle class="k" cx="150" cy="78" r="12"/>' +
          [0, 1, 2, 3].map(function (i) { var a = i * Math.PI / 2 + 0.6; return '<circle class="a" cx="' + (150 + 6 * Math.cos(a)).toFixed(1) + '" cy="' + (78 + 6 * Math.sin(a)).toFixed(1) + '" r="2.4"/>'; }).join('') +
          [0, 1, 2, 3, 4, 5].map(function (i) { var a = i * Math.PI / 3; return '<ellipse class="k" cx="' + (150 + 34 * Math.cos(a)).toFixed(1) + '" cy="' + (78 + 34 * Math.sin(a)).toFixed(1) + '" rx="5" ry="3"/>'; }).join('') +
          '<path class="h" d="M250 40 q18 -14 32 4 q8 18 -10 26 q-20 4 -22 -30 z M18 112 q18 -14 32 4 q8 18 -10 26 q-20 4 -22 -30 z"/>' +
          D.label(10, 18, 'corn (planted first)', 146, 72) + D.label(10, 156, 'beans (in a ring)', 120, 95) + D.label(294, 156, 'squash (between mounds)', 268, 72, 'end') + T(294, 18, 'edge of mound', 'n', 'end'),
        tall: 164, cap: 'One mound, seen from above.' }
    ],
    guide: { before: 'Look at the diagram: corn in the middle, beans in a ring, squash between mounds. Explain that the Three Sisters are central to Haudenosaunee agriculture and teachings. Teach <b>nitrogen</b> and <b>knowledge keeper</b> (a person trusted to hold and share a community’s traditional knowledge).',
      after: 'Mrs. Hill says each sister gives something and receives something. Where do you see that kind of give and take in your family or class?' },
    words: [['knowledge keeper', 'a person trusted to hold and share a community’s traditional knowledge'], ['nitrogen', 'a gas in the air that plants need to grow']],
    qs: [
      { k: 'table', code: 'C2.6', q: 'Complete the chart: how does each sister help the garden?', cols: ['Plant', 'How it helps'],
        rows: [['Corn', null], ['Beans', null], ['Squash', null]],
        a: [[null, 'gives the beans a pole to climb'], [null, 'add nitrogen that feeds the soil'], [null, 'shades the soil, keeps it damp and blocks weeds']] },
      { k: 'choice', code: 'C3.3', half: true, q: 'Beans were planted after the corn because',
        opts: ['they need the corn to climb', 'they grow slowly', 'it was too cold', 'raccoons eat them'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'Squash leaves spread “like umbrellas” ({line:umbrellas}). This shows they',
        opts: ['cover and shade the soil', 'are waterproof', 'can be folded', 'are colourful'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Look at the diagram. Where are the beans planted?',
        opts: ['in a ring around the corn', 'in the very centre', 'between the mounds', 'outside the garden'], a: 0 },
      { k: 'choice', code: 'B3.1', q: 'Which sentence from the log contains a relative clause (a clause beginning with who, which or that) that describes a noun?',
        opts: ['“We planted squash between the mounds.”', '“The prickles also discourage raccoons, who apparently dislike walking on scratchy leaves.”', '“Harvest day.”', '“Timing matters as much as the seeds themselves.”'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'The prickly squash leaves “discourage raccoons” ({line:raccoons}). What can you infer raccoons would do in the garden without them?',
        a: 'They would walk through the garden and eat or damage the corn and other plants.', look: 'a sensible inference (eat, trample or damage the crops)' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain the last idea in the log: “Each sister gives something … and each one receives something. That is how a garden, and a community, keeps going.”',
        a: 'In the garden, each plant helps the others and is helped in return. A community works the same way when people share and support each other.', look: 'the garden meaning and the community meaning, linked' }
    ]
  });

  P.add({
    id: 'g6-cleanup-poster', subject: 'geography', form: 'Poster', lines: true, plain: true,
    title: 'Every Piece Counts: Shoreline Cleanup',
    deck: 'A poster made by a school eco club',
    hero: {
      photo: 'g5-plastic-beach.jpg', credit: 'Photo: Partonez, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 55%',
      tall: 190,
      cap: 'Plastic litter washed up on a shore.'
    },
    body: [
      '<b>Saturday, September 20 · 9:00 a.m. to noon · Sunnyside Beach, Toronto (meet at the lifeguard station)</b>',
      'Every year, volunteers across Canada remove tonnes of litter from the shores of lakes, rivers and oceans. Researchers have found that most of the litter on Great Lakes beaches is plastic, and most of it is small: bottle caps, straws, food wrappers and, above all, cigarette butts, which contain plastic fibres. Plastic does not rot. Instead, sunlight and waves break it into tiny pieces called <b>microplastics</b>, which fish and birds swallow by mistake. Some of those pieces end up in the water we drink.',
      'Last year, our club and 64 volunteers collected 2 920 pieces of litter in three hours. This year, we want to double the number of volunteers. You do not need any experience, only a willingness to bend down, again and again.',
      { h: 'Why it matters' },
      'The Great Lakes hold about one fifth of all the fresh surface water on Earth and supply drinking water to more than forty million people in Canada and the United States. They are also home to fish, turtles and migrating birds that cannot tell the difference between food and a floating scrap of plastic. Litter removed from the sand today cannot drift back into the water tomorrow.',
      { h: 'Schedule' },
      '9:00 sign-in and a short safety talk; 9:20 teams spread out along the beach; 11:30 we weigh our bags and add up the tallies; 11:45 we announce this year’s results.',
      { h: 'What to bring' },
      'A refillable water bottle, sunscreen, a hat and shoes you do not mind getting sandy. Wear layers: the wind off the lake is cooler than you expect.',
      { h: 'What we provide' },
      'Gloves, bags, buckets, tally sheets and a snack. Every volunteer gets a tally sheet, because we record what we find and send the <b>data</b> to a national shoreline cleanup program. Scientists use these records to track where litter comes from and which rules would reduce it.',
      { h: 'Who can come' },
      'Everyone! Students under 14 must come with an adult. Families, neighbours and grandparents are especially welcome.',
      { fig: G.bars([['cigarette butts', 1240, '1 240'], ['plastic pieces', 860, '860'], ['food wrappers', 410, '410'], ['bottle caps', 260, '260'], ['straws', 150, '150']], 1240, { x0: 104, pad: 40, gap: 22, top: 6, hl: 0 }),
        tall: 118, cap: 'What we found last year (number of pieces).' },
      { box: 'Organized by', text: 'the Grade 6 Eco Club of Parkdale Public School, with Toronto Parks. Questions? Ask Ms. Ortiz in Room 14.' }
    ],
    guide: { before: 'Ask where litter on a beach comes from. Point out the parts of a poster: a big title, key facts first, headings, a chart and who made it. Teach <b>microplastics</b> and <b>data</b>.',
      after: 'Would this poster convince you to come? What would you change to persuade more people?' },
    words: [['microplastics', 'tiny pieces of broken-down plastic'], ['data', 'facts and numbers collected to study something']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'The main purpose of the poster is to',
        opts: ['persuade people to volunteer', 'tell a story', 'sell water bottles', 'review a beach'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why are there headings such as “What to bring”?',
        opts: ['to help readers find information quickly', 'to make it longer', 'to list prizes', 'to name the writers'], a: 0 },
      { k: 'choice', code: 'C1.4', q: 'Use the chart. About how many more cigarette butts than plastic pieces were found?',
        opts: ['380', '1 240', '860', '2 100'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Why does every volunteer get a tally sheet?',
        opts: ['so the litter found can be recorded and studied by scientists', 'so volunteers can win prizes', 'to keep score between teams', 'to take attendance'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Who most likely put up this poster?',
        opts: ['the school eco club', 'a beach store', 'a bottle company', 'a lifeguard'], a: 0 },
      { k: 'choice', code: 'C1.5', half: true, q: 'The tone of the poster is',
        opts: ['friendly and encouraging', 'angry', 'sad', 'scientific only'], a: 0 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Explain why the poster’s title says “Every Piece Counts.” Use a fact from the poster.',
        a: 'Most litter is small, like caps and butts, and plastic breaks into microplastics that animals swallow. So picking up even one small piece helps.', look: 'the meaning of the title and a supporting fact' },
      { k: 'lines', code: 'C2.2', n: 2, q: 'If you wanted to find out more about microplastics for a school report, what kind of source would you choose? Why?',
        a: 'A science website from a government or university, because it would have reliable, up-to-date research.', look: 'a suitable, reliable source and why' }
    ]
  });

  P.add({
    id: 'g6-star-party', subject: 'science', form: 'Poster', lines: true, plain: true,
    title: 'Star Party at the Dark Sky Preserve',
    deck: 'A poster from an astronomy club in Muskoka',
    hero: {
      photo: 'g6-dark-sky.jpg', credit: 'Photo: Mustang Joe, CC0, Wikimedia Commons', focus: '50% 50%',
      tall: 230,
      cap: 'The night sky over Torrance Barrens Dark Sky Preserve, Ontario.'
    },
    body: [
      '<b>Saturday, October 18 · 8:00 p.m. to 11:00 p.m. · Torrance Barrens Dark Sky Preserve, near Gravenhurst · Free</b>',
      'Away from city lights, a clear night sky holds thousands of stars, the pale band of the Milky Way and sometimes the shimmering curtains of the northern lights. Torrance Barrens was one of the first places in Canada protected as a <b>dark sky preserve</b>, which means that outdoor lighting nearby is controlled so that the stars stay visible. Join the Muskoka Astronomy Club for an evening of stargazing. Members will bring telescopes, and no experience is needed.',
      { h: 'Find the Big Dipper and the North Star' },
      'Start with the Big Dipper, seven bright stars shaped like a ladle with a long, bent handle. It is part of a larger <b>constellation</b> called Ursa Major, the Great Bear. Find the two stars at the end of the Dipper’s bowl, Dubhe and Merak. Draw an imaginary line from Merak through Dubhe and keep going about five times that distance. You will reach Polaris, the North Star, which barely moves all night. Face Polaris, and you are facing north.',
      { h: 'What you will see' },
      'On a clear night, the Milky Way stretches across the sky like a faint cloud; it is actually the light of billions of distant stars in our own galaxy. Through the club’s telescopes, you can look at the rings of Saturn and the craters along the edge of the Moon. With binoculars, or even with your eyes alone if the sky is very dark, look for the Andromeda Galaxy, a fuzzy smudge about two and a half million light-years away. It is the most distant object most people can see without a telescope. In mid-October, the Orionid meteor shower is also under way, so be patient: you may spot a shooting star.',
      { h: 'Please remember' },
      'Use only red flashlights. Your eyes need about twenty minutes to adjust to the dark, but a single flash of white light ruins that in a second; red light does not. Dress more warmly than you think you need to, because temperatures drop quickly after sunset. Bring a blanket or a lawn chair. Drones and pets must stay home.',
      { img: 'g6-big-dipper.png', credit: 'Map: Torsten Bronger, CC BY-SA 3.0, Wikimedia Commons', tall: 140, cap: 'The Big Dipper (green lines). β is the star Merak.' },
      { box: 'If it is cloudy', text: 'The star party moves to Sunday, October 19. Check the club’s website after 4:00 p.m. on Saturday.' }
    ],
    guide: { before: 'Look at the star map: trace the Big Dipper’s seven stars and its handle. Practise the pointer stars with a finger. Teach <b>dark sky preserve</b> and <b>constellation</b>.',
      after: 'Go outside on a clear night and try to find the Big Dipper. What made it easier or harder than on paper?' },
    words: [['dark sky preserve', 'an area where outdoor lights are limited so stars stay visible'], ['constellation', 'a group of stars that forms a pattern']],
    qs: [
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Which star is at the end of the Dipper’s handle?',
        opts: ['Alkaid', 'Dubhe', 'Alioth', 'Merak'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: 'A “constellation” ({line:constellation}) is',
        opts: ['a group of stars in a pattern', 'a telescope', 'a planet', 'a club'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why might people need to dress “more warmly than you think you need to” at a star party?',
        a: 'It gets cold quickly after sunset, and people sit or stand still for hours in an open field at night.', look: 'the temperature drop and staying still outdoors for a long time' },
      { k: 'order', code: 'C2.6', q: 'Number the steps for finding the North Star.',
        items: ['Find the Big Dipper.', 'Find Dubhe and Merak at the end of the bowl.', 'Draw a line from Merak through Dubhe.', 'Go about five times that distance to Polaris.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.3', half: true, q: 'The box at the bottom tells readers',
        opts: ['what happens if it is cloudy', 'what to bring', 'who the club is', 'how to use a telescope'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Drones must stay home most likely because they',
        opts: ['have lights and make noise', 'are expensive', 'need charging', 'are too small'], a: 0 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'How do the map and the written instructions work together to help a reader find Polaris?',
        a: 'The words explain the steps, and the map shows where Dubhe and Merak are in the Dipper, so you can see which stars to use.', look: 'what the words give, what the map gives and how they help together' }
    ]
  });

  P.add({
    id: 'g6-rink-letters', subject: 'social', form: 'Letters to the editor', lines: true, plain: true,
    title: 'Should the Town Keep the Outdoor Rink?',
    deck: 'Two letters to a local newspaper, with two different views',
    hero: {
      photo: 'g4-outdoor-rink.jpg', credit: 'Photo: Fort Simpson Chamber of Commerce, CC BY 2.0, Wikimedia Commons', focus: '50% 60%',
      tall: 250,
      cap: 'An outdoor rink lit up at night.'
    },
    body: [
      '<i>The town council of Elmvale is deciding whether to close the outdoor rink in Memorial Park, which volunteers have flooded every winter since 1971, and spend the money on a splash pad. The <i>Elmvale Courier</i> printed these two letters.</i>',
      { h: 'Keep the rink: it is the heart of our winter' },
      'To the <b>Editor</b>: Closing the Memorial Park rink would be a terrible mistake. For more than fifty years, this rink has been the one place in town where anyone can skate for free, at any hour, without a schedule or an expensive registration fee. On a cold Saturday, I have counted more than eighty people on the ice: toddlers on double-bladed skates, teenagers playing shinny, grandparents gliding hand in hand. A splash pad is fine, but it cannot replace a tradition. I have lived across the street from this rink for thirty years, and I would be heartbroken to watch it disappear. <i>Margaret Kowalski</i>',
      { h: 'Time to face the facts' },
      'To the Editor: I love skating as much as anyone, but our winters have changed. According to the volunteer log, the rink was open for 72 days in the winter of 2004, but only 31 days last winter, because thaws kept melting the ice. Meanwhile, the volunteers who flood it are getting older, and only four came out regularly last year. A splash pad would be used every summer day from June to September, by many of the same families. Spending money on a facility that works with our new climate is not giving up on tradition; it is planning <b>responsibly</b>. As a member of the parks committee, I will vote to close the rink. <i>David Huang</i>',
      { h: 'Could there be another way?' },
      'To the Editor: I am twelve, and I skate at Memorial Park almost every day the ice is good. I read both letters, and I think each writer is partly right. The rink matters, but so do the warmer winters and the tired volunteers. Why not move the rink to the north side of the park, where the arena blocks the afternoon sun, and ask students to volunteer for their community service hours? The splash pad could be built in the sunny south corner. That way, both winter and summer would have something for families. <i>Aiden Moreau</i>',
      { fig: G.cols([['2004', 72], ['2010', 61], ['2016', 48], ['2022', 39], ['last', 31]], 80, { base: 104, h: 84, x0: 20, hl: 4 }) + T(150, 124, 'days the rink was open each winter', 'n', 'middle'),
        tall: 128, cap: 'From the volunteers’ log, as quoted by Mr. Huang.' }
    ],
    guide: { before: 'Explain that a letter to the editor is a reader’s opinion printed in a newspaper. Read the two letters separately, and list each writer’s reasons. Teach <b>responsibly</b> and <b>editor</b>.',
      after: 'Which letter persuaded you more, and why? Is there a solution that might please both writers?' },
    words: [['editor', 'the person who decides what goes in a newspaper'], ['responsibly', 'carefully, thinking about results']],
    qs: [
      { k: 'choice', code: 'C3.5', q: 'Which detail suggests that Ms. Kowalski may have a personal reason for her view?',
        opts: ['She has lived across the street from the rink for thirty years.', 'She counted eighty skaters.', 'She mentions a splash pad.', 'She says skating is free.'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'Which statement is a fact that can be checked?',
        opts: ['“Closing the rink would be a terrible mistake.”', '“The rink was open for 72 days in the winter of 2004.”', '“A splash pad … cannot replace a tradition.”', '“It is planning responsibly.”'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'The chart shows that the number of rink days has',
        opts: ['gone down', 'gone up', 'stayed the same', 'gone up, then down'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: '“To the Editor:” ends with a colon because it is',
        opts: ['a formal greeting', 'a list', 'a title', 'a question'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Which reason does Mr. Huang give that Ms. Kowalski does not address?',
        opts: ['There are fewer volunteers to flood the rink.', 'Skating is free.', 'Many people use the rink.', 'The rink is a tradition.'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Each writer has a perspective. Explain one possible bias in each letter.',
        a: 'Ms. Kowalski lives next to the rink and loves it, so she may not consider the warmer winters. Mr. Huang is on the parks committee and wants the splash pad, so he may focus only on facts that support closing the rink.', look: 'one possible bias for each writer, with evidence' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Which letter uses stronger evidence? Give a reason from the text.',
        a: 'Mr. Huang’s letter, because he uses numbers from the volunteer log to show the rink is open fewer days. Ms. Kowalski mostly uses feelings and one observation.', look: 'a choice backed by the kind of evidence each writer uses' }
    ]
  });

  P.add({
    id: 'g6-playground-letter', subject: 'social', form: 'Formal letter', lines: true, plain: true,
    title: 'A Playground for Everyone',
    deck: 'A Grade 6 student writes to a city councillor',
    hero: {
      photo: 'g5-ramp.jpg', credit: 'Photo: Hullian111, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 190,
      cap: 'A ramp beside steps at a building entrance.'
    },
    body: [
      '<i>4 Willow Court, London, Ontario · March 3</i>',
      'Dear Councillor Abebe:',
      'My name is Noor Haddad, and I am in Grade 6 at Westmount Public School. I am writing to ask you to make sure that the new playground planned for Thames Park can be used by every child in our neighbourhood, including children who use wheelchairs, walkers or other <b>mobility</b> devices.',
      'Our current playground has a surface of loose wood chips, which a wheelchair cannot roll across. Its only entrance to the climbing structure is a ladder. As a result, my younger brother, Sami, who uses a wheelchair, watches from the path while the rest of us play. He is not the only one. When our class surveyed 120 students at our school, 14 said that they, a sibling or a friend could not use the playground easily.',
      'An <b>accessible</b> playground does not have to cost much more. Communities across Ontario have built playgrounds with a firm rubber surface, a gently sloping ramp up to the main platform, swings with high backs and supportive seats, and ground-level activities such as music panels and sand tables that can be reached from a wheelchair. These features are not only for children with disabilities. Parents with strollers, grandparents with canes and toddlers who cannot yet climb use them too.',
      { fig: '<rect class="d" x="4" y="4" width="292" height="126" rx="10"/>' +
          '<rect class="k" x="18" y="18" width="50" height="28" rx="4"/>' + T(43, 60, 'sand table', 'n', 'middle') +
          '<rect class="h" x="130" y="24" width="72" height="46" rx="4"/>' + T(166, 18, 'main platform', 'n', 'middle') +
          '<path class="k" d="M30 108 L130 58 L130 70 L38 118 Z"/>' + T(86, 112, 'gentle ramp', 'l') +
          '<path class="k" d="M226 22 H286 M230 22 V70 M282 22 V70"/><rect class="a" x="240" y="56" width="14" height="10" rx="2"/><rect class="a" x="260" y="56" width="14" height="10" rx="2"/>' + T(256, 80, 'high-back', 'n', 'middle') + T(256, 91, 'swings', 'n', 'middle') +
          '<rect class="k" x="240" y="104" width="10" height="18" rx="2"/><rect class="k" x="256" y="104" width="10" height="18" rx="2"/><rect class="k" x="272" y="104" width="10" height="18" rx="2"/>' + T(234, 118, 'music panels', 'n', 'end') +
          T(150, 146, 'firm rubber surface everywhere', 'l', 'middle'),
        tall: 152, cap: 'Noor’s plan for the new playground, seen from above.' },
      'Sami’s words, when I asked him what he wanted, were simple: “I just want to get to the top with everybody else.” He is seven. He knows every rule of every game we play, because he has spent so much time watching them.',
      'Ontario’s accessibility law sets standards for new outdoor play spaces, and I believe our city should meet them proudly, not reluctantly. Every child deserves the chance to play beside their friends, not watch them from the path.',
      'I have also learned that a poured rubber surface costs more to install than wood chips, but it lasts much longer and does not need to be topped up every spring, so over the years the difference becomes far smaller. A ramp and a few ground-level activities would add only a small part to the total cost of the project.',
      'Our class would be honoured to present our survey results at the next meeting of the parks committee. Thank you for considering this request. I look forward to your reply.',
      'Sincerely,',
      '<i>Noor Haddad</i>'
    ],
    guide: { before: 'Look at the parts of a formal letter: address and date, greeting with a colon, paragraphs (who I am and why I am writing, the problem, the solution, the request), closing and signature. Teach <b>accessible</b> and <b>mobility</b>.',
      after: 'Is there a place in your neighbourhood that some people cannot use? Who could you write to about it?' },
    words: [['accessible', 'easy for everyone to reach and use'], ['mobility', 'the ability to move around']],
    qs: [
      { k: 'choice', code: 'B3.3', half: true, q: 'Why is there a colon after “Dear Councillor Abebe”?',
        opts: ['It is a formal letter.', 'A list follows.', 'It is a question.', 'It shows a speaker.'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'The main purpose of the letter is to',
        opts: ['ask for an accessible playground', 'thank the councillor', 'describe Thames Park', 'complain about wood chips only'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'Which detail best supports Noor’s argument that the problem affects many people?',
        opts: ['In a survey of 120 students, 14 said they, a sibling or a friend could not use the playground easily.', 'Her brother is named Sami.', 'She is in Grade 6.', 'The park is in London, Ontario.'], a: 0 },
      { k: 'choice', code: 'C3.6', q: 'According to Noor, who else benefits from accessible features?',
        opts: ['parents with strollers, grandparents with canes and toddlers', 'only children who use wheelchairs', 'only the councillor', 'nobody else'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'Which sentence would be the best new opening sentence for the fourth paragraph?',
        opts: ['There are simple, proven ways to solve this problem.', 'Wood chips come from trees.', 'My favourite game is tag.', 'The park has a parking lot.'], a: 0 },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Noor writes that the city should meet the standards “proudly, not reluctantly.” Why might she choose these words? What effect do they have?',
        a: 'She wants the city to see accessibility as something to be proud of, not a rule to follow grudgingly. The contrast makes her point strong and memorable.', look: 'the meaning of the contrast and its persuasive effect' },
      { k: 'lines', code: 'C3.6', n: 3, q: 'Explain the message of the sentence “Every child deserves the chance to play beside their friends, not watch them from the path.”',
        a: 'Inclusion means being part of the group, not left out. A playground that some children cannot use separates them from their friends.', look: 'the idea of inclusion and a link to Sami watching from the path' }
    ]
  });

  P.add({
    id: 'g6-camp-letter', subject: 'story', form: 'Friendly letter', lines: true, plain: true,
    title: 'Letter from Camp Kawartha',
    deck: 'Miguel writes to his grandmother from his first week at summer camp',
    hero: {
      photo: 'g5-calm-lake.jpg', credit: 'Photo: DocHolliday2018, CC BY-SA 4.0, Wikimedia Commons', focus: '50% 50%',
      tall: 320,
      cap: 'A calm lake on an Ontario morning.'
    },
    body: [
      '<i>Camp Kawartha · Cabin 7 · July 9</i>',
      'Dear Lola,',
      'You told me to write every day. This is my first letter, and it is day six, so I will have to fit six days into one letter. I hope you have time.',
      'Day 1: Mom drove away and I cried a little, but only behind my sunglasses, so it does not count. My cabin has seven boys and one counsellor named Tobias, who plays the ukulele badly but with enormous confidence.',
      'Day 2: Swim test. The lake was so cold that my whole body shouted at me. I passed anyway, so now I am allowed to take out a canoe.',
      'Day 3: I took out a canoe. I would rather not discuss it.',
      'Day 4: Okay, I will discuss it. My partner, Jonah, stood up to wave at his sister, and we both went into the lake. The canoe floated upside down beside us like a big embarrassed turtle. The lifeguard said we did everything right after that, which is the most <b>reassuring</b> thing anyone has said to me this week. We held on to the canoe and kicked it to shore, just like in the safety lesson.',
      'Day 5: We had a talent show. Our cabin did a skit about the canoe. Everyone laughed, and for once I did not mind, because it was my idea.',
      'Day 6: Today I realized I had not thought about home since breakfast. Then I felt guilty and thought about you, so I am writing this.',
      'The food is fine but nothing like your adobo. Please tell Mom I am eating vegetables. That is <b>technically</b> true, because there is lettuce on the burgers.',
      'I miss you, but not as much as on Day 1. I hope that is all right. I think it means camp is working.',
      'Love,',
      'Miguel',
      'P.S. Please do not tell Mom about the canoe until I am home.'
    ],
    guide: { before: 'Point out the parts of a friendly letter: place and date, greeting with a comma, body, closing, signature and P.S. (a note added after the signature). Lola is a word for grandmother in Tagalog, a language of the Philippines. Teach <b>reassuring</b> and <b>technically</b>.',
      after: 'Miguel’s feelings change from Day 1 to Day 6. Have you ever felt homesick? What helped?' },
    words: [['reassuring', 'making you feel less worried'], ['technically', 'true by the exact facts, though not in spirit']],
    qs: [
      { k: 'choice', code: 'C3.2', half: true, q: 'Miguel cried “behind my sunglasses, so it does not count” because he',
        opts: ['did not want others to see', 'had sand in his eyes', 'was joking about the sun', 'was very happy'], a: 0 },
      { k: 'choice', code: 'C3.1', half: true, q: 'The lake was so cold “my whole body shouted at me” ({line:shouted}). This is',
        opts: ['personification and hyperbole', 'a simile', 'a fact', 'an idiom'], a: 0 },
      { k: 'choice', code: 'C3.2', q: 'Why does Miguel write “I would rather not discuss it” on Day 3 ({line:discuss})?',
        opts: ['He is embarrassed about tipping the canoe.', 'He did not go canoeing.', 'He is angry at Jonah.', 'He forgot what happened.'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'Which part of a friendly letter comes after the signature?',
        opts: ['the P.S.', 'the greeting', 'the date', 'the body'], a: 0 },
      { k: 'choice', code: 'B3.3', half: true, q: 'In a friendly letter, the greeting “Dear Lola” is followed by',
        opts: ['a comma', 'a colon', 'a period', 'nothing'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'How do Miguel’s feelings change over the six days?',
        opts: ['He goes from homesick and nervous to comfortable and happy.', 'He goes from happy to homesick.', 'He stays homesick all week.', 'He becomes angry at the camp.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does Miguel write, “I miss you, but not as much as on Day 1. I hope that is all right”? What does it show about him?',
        a: 'He is starting to enjoy camp and feels a little guilty about it. It shows he is honest and cares about his grandmother’s feelings.', look: 'an inference about his feelings and a trait shown' },
      { k: 'lines', code: 'C1.5', n: 3, q: 'Miguel’s letter is funny. Find one sentence that is meant to be funny and explain how the humour works.',
        a: '“That is technically true, because there is lettuce on the burgers.” It is funny because he is barely eating vegetables but finds a loophole.', look: 'a quoted funny line and how the humour works' }
    ]
  });

  P.add({
    id: 'g6-dinner-cartoon', subject: 'health', form: 'Cartoon and article', lines: true,
    title: 'Who Is at the Table?',
    deck: 'A cartoon and a short article about screens at mealtime',
    hero: {
      art: '<rect class="k" x="270" y="8" width="160" height="26" rx="4"/>' + T(350, 26, 'FAMILY DINNER NIGHT', 'lb', 'middle') + '<path class="t" d="M300 8 L320 0 M400 8 L380 0"/>' +
        sitter(210, 98, true) + sitter(300, 92, true) + sitter(400, 92, true) + sitter(490, 98, true) +
        '<path class="k" d="M150 156 H550 M170 156 V196 M530 156 V196"/>' +
        '<ellipse class="t" cx="236" cy="150" rx="22" ry="5"/><ellipse class="t" cx="326" cy="150" rx="22" ry="5"/><ellipse class="t" cx="376" cy="150" rx="22" ry="5"/><ellipse class="t" cx="466" cy="150" rx="22" ry="5"/>' +
        bubble(20, 34, 150, 44, 192, 92, ['So… how was', 'everyone’s day?']) +
        '<path class="k" d="M584 196 q-4 -26 16 -30 q14 -3 22 8 l14 -6 l-2 14 q8 16 -6 22 z"/><circle class="a" cx="612" cy="176" r="2"/>' + T(612, 140, '?', 'lb', 'middle'),
      tall: 250,
      cap: 'Cartoon drawn for this site.'
    },
    body: [
      'Ask a group of Canadian families when they last ate a meal together without a single screen at the table, and many will need a long time to remember. Researchers who study family life have found that regular shared meals are linked to better moods, healthier eating and stronger vocabularies in children, partly because meals are one of the few times when family members talk to one another without rushing. Those benefits seem to shrink, however, when everyone is looking at a different <b>device</b>.',
      'The habit is easy to understand. Phones are designed to capture attention, with alerts, bright colours and endless feeds, and a buzz in your pocket can feel urgent even when the message is not. Many adults admit that they check their phones automatically, sometimes without noticing they are doing it.',
      'Some families have responded with simple rules. The Mahmoud family in Mississauga keeps a basket by the kitchen door, and every phone, including the parents’ phones, goes into it before dinner. “The first week was awkward,” admits Leila Mahmoud, who is eleven. “Nobody knew what to say. Now my dad tells terrible jokes, and my brother and I rate them out of ten.” Other families allow screens at breakfast, when everyone is in a hurry, but not at supper.',
      'Schools have also taken action. Since 2024, Ontario has limited cellphones in classrooms, with phones in younger grades put away for the whole school day unless a teacher allows them, or they are needed for health or accessibility reasons. Supporters say the rule reduces distraction; <b>critics</b> argue that students need to learn to manage devices themselves rather than simply having them taken away.',
      'If your family wants to try, experts suggest starting small rather than banning every device at once. Choose one meal each week, agree on the rule together so that it feels fair, and keep a few conversation starters ready for the first awkward silence: What was the best part of your day? What is something you changed your mind about recently? Families who try the experiment often report that the conversations become easier, and longer, each week.',
      { fig: G.flow(['1. Choose one screen-free meal each week.', '2. Agree on the rule together.', '3. Have conversation starters ready.'], { x: 20, w: 260, bh: 26, gap: 12 }),
        tall: 106, cap: 'How to start, according to the experts.' },
      'Not every screen at the table is a problem. Looking up the answer to a dinner-table argument, or video-calling a grandparent who lives far away, can bring people closer together. What matters, many experts suggest, is whether the device is helping the conversation or replacing it.'
    ],
    guide: { before: 'Look at the cartoon first and ask: what is funny here? Explain that cartoons often use humour to make a serious point. Then read the article. Teach <b>device</b> and <b>critics</b>.',
      after: 'Would a phone basket work in your home? What rule about screens would you suggest, and why?' },
    words: [['device', 'a machine or tool, such as a phone or tablet'], ['critics', 'people who point out problems with an idea']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'The joke in the cartoon is that',
        opts: ['the parent asks about everyone’s day while also staring at a phone', 'the family is eating outside', 'the sign is spelled wrong', 'the dog is cooking dinner'], a: 0 },
      { k: 'choice', code: 'C1.4', half: true, q: 'The dog with a question mark seems to',
        opts: ['wonder why nobody is talking', 'want a phone', 'be asleep', 'be hiding'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Critics” ({line:critics}) are people who',
        opts: ['point out problems', 'make laws', 'write cartoons', 'sell phones'], a: 0 },
      { k: 'choice', code: 'C3.5', q: 'Which two views about Ontario’s classroom phone rule does the article describe?',
        opts: ['It reduces distraction, but students should learn to manage devices themselves.', 'It is too expensive, and it is too strict.', 'It helps teachers, and it helps parents.', 'It is new, and it is old.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why do experts suggest that the family agree on the rule together?',
        a: 'If everyone helps decide, the rule feels fair, so people, including parents, are more likely to follow it.', look: 'fairness and people being more likely to follow it' },
      { k: 'choice', code: 'B3.3', half: true, q: 'In “including the parents’ phones,” the apostrophe shows',
        opts: ['the phones belong to the parents', 'a missing letter', 'one parent', 'a quotation'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Leila says the first week was “awkward” because',
        opts: ['people were not used to talking', 'the food was bad', 'the basket broke', 'her dad was away'], a: 0 },
      { k: 'lines', code: 'C1.4', n: 3, q: 'How does the cartoon support the article’s main idea? Explain.',
        a: 'The article says screens can replace conversation at meals. The cartoon shows exactly that: a family at “dinner night” where nobody is really talking, even the parent who asks a question.', look: 'the article’s main idea and how the cartoon shows it' }
    ]
  });

  P.add({
    id: 'g6-packaging-cartoon', subject: 'tech', form: 'Cartoon and article', lines: true,
    title: 'The Box Inside the Box',
    deck: 'A cartoon and an article about the packaging from online orders',
    hero: {
      art: '<path class="k" d="M250 80 H450 V196 H250 Z M250 80 L220 52 M450 80 L480 52 M250 80 L290 42 M450 80 L410 42"/>' +
        '<path class="t" d="M270 100 q6 -6 12 0 M300 120 q6 -6 12 0 M340 104 q6 -6 12 0 M380 126 q6 -6 12 0 M410 100 q6 -6 12 0 M290 150 q6 -6 12 0 M360 160 q6 -6 12 0 M400 150 q6 -6 12 0 M320 176 q6 -6 12 0"/>' +
        stander(560, 196, 1) + '<path class="k" d="M560 120 L590 96"/><rect class="a" x="588" y="88" width="12" height="8" rx="1"/>' +
        bubble(500, 6, 170, 44, 572, 74, ['It’s here!', 'My new eraser!']) +
        '<path class="k" d="M140 196 V120 H200 V196 M150 120 V100 H190 V120"/>' + T(170, 160, 'RECYCLING', 'n', 'middle') + D.arrow(206, 150, 244, 150, 't'),
      tall: 170,
      cap: 'Cartoon drawn for this site.'
    },
    body: [
      'Online shopping has made it possible to order almost anything from almost anywhere, and to have it delivered within days. It has also produced a mountain of cardboard, plastic air pillows, foam and tape. Some of that packaging is necessary, because products must survive being tossed between trucks, conveyor belts and doorsteps. But much of it is not. Shoppers regularly post photos of a single pencil sharpener in a box large enough for a pair of boots, or a small box packed inside a larger box, with the gap filled by plastic.',
      'Why does this happen? Warehouses often use only a few standard box sizes, because it is faster and cheaper for machines and workers. Packing a small item in an oversized box takes seconds, while finding a perfect fit takes time. The extra material is a hidden cost: it must be manufactured, shipped, collected and, if we are lucky, recycled. Plastic air pillows and foam are especially troublesome, because many local recycling programs cannot process them.',
      'Size is not the only issue. Many products arrive wrapped in several layers: a plastic bag inside a printed box, inside a padded envelope, inside a shipping carton. Each layer may have a purpose in the store or the warehouse, but by the time the package reaches a kitchen table, most of it is simply garbage.',
      { fig: G.flow(['Warehouse: packed in a standard-size box', 'Trucks, belts and doorsteps', 'Kitchen table: most of it is garbage', 'Recycling, if the program can take it'], { x: 20, w: 260, bh: 26, gap: 12, hl: 2 }),
        tall: 144, cap: 'The trip a package makes.' },
      'Some companies are changing their habits. A number of <b>retailers</b> now let customers choose minimal packaging or group several items into one delivery. Some warehouses use machines that measure each order and cut a box to fit. Several countries, and some Canadian provinces, have introduced rules that make companies responsible for collecting and recycling the packaging they create, so that wasting material costs them money.',
      'Students at one Ontario middle school decided to measure the problem themselves. For a month, they collected the packaging from twenty online orders delivered to their families, weighed it and compared it with the weight of the products inside. In several orders, the packaging weighed more than the item it protected. Their most surprising find was a single pair of earbuds shipped in a box nearly the size of a microwave oven.',
      'Shoppers can help too, by ordering several items at once instead of one at a time, choosing the slower delivery option, which often allows fuller trucks, and telling companies when packaging is <b>excessive</b>. As one environmental educator put it, the greenest box is the one that never had to be made.'
    ],
    guide: { before: 'Look at the cartoon: what is funny about it? Talk about the last delivery your family received and how it was packed. Teach <b>excessive</b> and <b>retailers</b>.',
      after: 'Which of the solutions in the article would make the biggest difference? Why?' },
    words: [['excessive', 'more than is needed'], ['retailers', 'businesses that sell things to the public']],
    qs: [
      { k: 'choice', code: 'C1.4', q: 'The joke in the cartoon is that',
        opts: ['a tiny eraser came in an enormous box full of packing', 'the child is angry about the eraser', 'the box is empty', 'the recycling bin is too small'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'The cartoonist’s main purpose is to',
        opts: ['criticize wasteful packaging', 'sell erasers', 'teach drawing', 'explain recycling bins'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '“Excessive” ({line:excessive}) means',
        opts: ['more than is needed', 'too small', 'very cheap', 'safe'], a: 0 },
      { k: 'choice', code: 'C3.3', q: 'According to the article, why do warehouses often use boxes that are too big?',
        opts: ['They use only a few standard sizes because it is faster and cheaper.', 'Customers ask for big boxes.', 'Big boxes are safer for every item.', 'Small boxes are against the law.'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why was the box for the earbuds the students’ “most surprising find”?',
        a: 'Earbuds are tiny, so a box almost the size of a microwave was the most extreme waste they saw.', look: 'the contrast between a tiny item and a huge box' },
      { k: 'choice', code: 'C3.2', half: true, q: '“The greenest box is the one that never had to be made” means the best choice is',
        opts: ['to avoid making packaging', 'to paint boxes green', 'to buy more boxes', 'to recycle twice'], a: 0 },
      { k: 'choice', code: 'B3.2', half: true, q: 'In “The extra material is a hidden cost,” the subject is',
        opts: ['material', 'hidden', 'cost', 'is'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 3, q: 'Summarize the problem and two solutions from the article.',
        a: 'Online orders often come with far more packaging than needed. Companies can cut boxes to fit, and shoppers can order items together.', look: 'the problem and two solutions in own words' }
    ]
  });

  P.add({
    id: 'g6-book-preview', subject: 'tech', form: 'Book preview', lines: true, plain: true,
    title: 'Made in Canada: Inventions That Changed the World',
    deck: 'The back cover, the table of contents and part of the index of a book',
    hero: {
      photo: 'g6-canadarm.jpg', credit: 'Photo: NASA, Public domain, Wikimedia Commons', focus: '50% 50%',
      tall: 200,
      cap: 'The Canadarm on its first mission in space, 1981.'
    },
    body: [
      { h: 'From the back cover' },
      'What do a snowmobile, a garbage bag and a robotic arm in space have in common? Each one began with a Canadian who noticed a problem and refused to ignore it. In this lively, illustrated book, science writer Priya Sandhu introduces the inventors behind some of the most useful ideas of the last hundred years, from a mechanic in rural Quebec who wanted to reach a sick child through deep snow, to the medical team in Toronto whose discovery has saved millions of lives. Along the way, readers will learn how inventors test, fail and try again, and why the best inventions often look obvious only after someone has thought of them. Each chapter ends with a hands-on challenge, such as designing a better snow shovel or testing which tool paints a wall fastest. A <b>glossary</b> explains special words, and an <b>index</b> helps readers find every inventor and invention.',
      '<i>Written by Priya Sandhu · Illustrated by Marc-André Leblanc · Maple Leaf Books, Toronto</i>',
      { h: 'From Chapter 2: Over the Snow' },
      'In the winter of 1934, Joseph-Armand Bombardier, a young mechanic in Valcourt, Quebec, faced every parent’s worst fear. His two-year-old son became seriously ill, and the snow-choked roads made it impossible to reach the hospital in time. Bombardier had been building experimental snow vehicles since he was a teenager, and after his son’s death, he worked with new determination. In 1937, he patented a closed vehicle on tracks that could carry seven passengers across deep snow. Doctors, mail carriers and school buses in rural Quebec soon depended on it. More than twenty years later, his lightweight one-person version, the Ski-Doo, changed winter travel and recreation across the North.',
      { fig: '<text class="lb" x="6" y="14">Contents</text>' +
          [['1', 'A Country of Problem Solvers', '4'], ['2', 'Over the Snow: the Snowmobile', '8'], ['3', 'A Race Against Time: Insulin', '16'], ['4', 'Keeping Hearts in Rhythm: the Pacemaker', '24'],
            ['5', 'Paint Rollers and Garbage Bags', '30'], ['6', 'Peach Baskets and Jump Balls: Basketball', '36'], ['7', 'The Big Screen: IMAX', '42'], ['8', 'An Arm in Space: the Canadarm', '48'], ['', 'Glossary', '56'], ['', 'Index', '58']]
            .map(function (r, i) { var y = 32 + i * 15; return T(6, y, r[0]) + T(22, y, r[1]) + T(294, y, r[2], 'l', 'end'); }).join(''),
        tall: 182, cap: 'The table of contents.' },
      { box: 'From the index', text: 'Banting, Frederick, 16–21 · Best, Charles, 17–20 · Bombardier, Joseph-Armand, 9–14 · Canadarm, 48–55 · garbage bag, 33–35 · Hopps, John, 25–28 · insulin, 16–23 · Naismith, James, 36–41 · pacemaker, 24–29 · snowmobile, 8–15' }
    ],
    guide: { before: 'Show a real non-fiction book: the back cover, the table of contents, the glossary and the index. Explain how each helps a reader find information. Teach <b>glossary</b> and <b>index</b>.',
      after: 'If you could write one chapter of this book, which Canadian invention would you choose? Where would you look to research it?' },
    words: [['glossary', 'a list of special words and their meanings, near the end of a book'], ['index', 'an alphabetical list of topics and the pages where they appear']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'On which page does the chapter about basketball begin?',
        opts: ['36', '42', '30', '48'], a: 0 },
      { k: 'choice', code: 'C1.3', half: true, q: 'Who illustrated the book?',
        opts: ['Marc-André Leblanc', 'Priya Sandhu', 'Maple Leaf Books', 'Joseph-Armand Bombardier'], a: 0 },
      { k: 'choice', code: 'C1.3', q: 'You want to read about Charles Best. Which pages should you turn to?',
        opts: ['17 to 20', '8 to 15', '24 to 29', '48 to 55'], a: 0 },
      { k: 'choice', code: 'C2.4', q: 'You read the word “prototype” in Chapter 2 and do not know what it means. Where in this book should you look first?',
        opts: ['the glossary, on page 56', 'the table of contents', 'the back cover', 'Chapter 8'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'The “mechanic in rural Quebec” ({line:mechanic}) is most likely',
        opts: ['Bombardier', 'Banting', 'Naismith', 'Hopps'], a: 0 },
      { k: 'choice', code: 'C1.2', half: true, q: 'The back cover is written mainly to',
        opts: ['make people want to read the book', 'list every inventor', 'explain the index', 'review another book'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 2, q: 'Why do you think Bombardier worked “with new determination” after his son died?',
        a: 'He did not want other families to lose someone because they could not get through the snow.', look: 'a link between his loss and helping others reach help in winter' },
      { k: 'lines', code: 'C3.3', n: 3, q: 'The back cover says the best inventions “look obvious only after someone has thought of them.” Explain this idea with an example from the book.',
        a: 'A paint roller seems simple now, but before it was invented, people painted walls with brushes. Someone had to think of it first.', look: 'the meaning of the idea and an example from the contents' }
    ]
  });
})();
