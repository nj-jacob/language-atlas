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
      { k: 'lines', code: 'C3.7', n: 3, q: 'How have events in history shaped the way Haudenosaunee people use the Two Row today?',
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
})();
