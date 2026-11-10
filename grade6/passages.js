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
})();
