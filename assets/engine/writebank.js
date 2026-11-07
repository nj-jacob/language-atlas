/* Language Atlas tool box: what Paragraph builder and Letter pad use (writetools.js). Shared by every grade. Original text.
   Atlas.writebank = { paras, joins, kernels, starters, letters }
     paras     paragraphs to build: { g, to, title, topic, details: [3 sentences], close, off: a sentence that does not belong }.
               A detail never starts with a name, so a joining word can go in front of it (First, the ...).
     joins     joining (transition) words by the grade they start: [[grade, 'First'], ...]
     kernels   short sentences to stretch with because, but and so, each with an example ending for each
     starters  sentence starters for writing your own paragraph, by part
     letters   Letter pad: each set is { name, from, to, groups: [[label, 'a c d']], cues, list: { letter: { w, s: [strokes] } } }.
               A stroke is an SVG path in letter space: the sky line is y 10, the plane line y 55, the grass line y 100 and the
               ground line y 145. x runs from 0 to w. Strokes are in the order they are written; each starts where the pen goes down. */
(function () {
  'use strict';
  var paras = [
    { g: 1, to: 3, title: 'Winter', topic: 'Winter is my favourite season.', details: ['I can build a snow fort.', 'I like to skate on the rink.', 'We drink hot chocolate after.'], close: 'That is why I love winter.', off: 'My cousin has a red bike.' },
    { g: 1, to: 3, title: 'Dogs', topic: 'Dogs make good pets.', details: ['They like to play fetch.', 'They keep you company.', 'They help you get outside.'], close: 'A dog can be a great friend.', off: 'My lunch was a sandwich.' },
    { g: 1, to: 3, title: 'Our park', topic: 'Our park has lots to do.', details: ['There is a tall slide.', 'We can feed the ducks at the pond.', 'In winter, the hill is good for sledding.'], close: 'I am glad we have a park nearby.', off: 'My sister is six.' },
    { g: 2, to: 4, title: 'Bees', topic: 'Bees are important.', details: ['They carry pollen from flower to flower.', 'This helps plants make fruit and seeds.', 'They also make honey.'], close: 'We should protect bees.', off: 'Spiders have eight legs.' },
    { g: 4, to: 6, title: 'Canoes', topic: 'Canoes have a long history in Canada.', details: ['Long ago, Indigenous peoples built birchbark canoes that were light and strong.', 'Fur traders later used large canoes to carry goods across the country.', 'Today, people paddle canoes for fun on lakes and rivers.'], close: 'The canoe is still a symbol of Canada.', off: 'Hockey is played on ice.' },
    { g: 4, to: 6, title: 'A school garden', topic: 'Our school should have a garden.', details: ['Students could learn how food grows.', 'Working outside is good exercise.', 'The vegetables could be shared with families.'], close: 'A school garden would help everyone.', off: 'The gym was painted last year.' },
    { g: 4, to: 6, title: 'Recycling', topic: 'Recycling helps the planet.', details: ['It keeps waste out of landfills.', 'It saves trees and other resources.', 'It uses less energy than making new things.'], close: 'Small actions like recycling add up.', off: 'Plastic toys are fun to play with.' },
    { g: 7, to: 8, title: 'Reading for fun', topic: 'Reading for fun is worth the time.', details: ['Readers build their vocabulary without trying.', 'Stories let us see the world through other people’s eyes.', 'Quiet reading can lower stress after a busy day.'], close: 'For these reasons, everyone should make time to read.', off: 'Many movies are based on video games.' },
    { g: 7, to: 8, title: 'Food in the North', topic: 'Northern communities face high food costs.', details: ['Most food must be flown in, because there are few roads.', 'Flying is expensive, so stores must charge more.', 'A jug of milk can cost three times as much as it does in the south.'], close: 'Programs that support local hunting, fishing and greenhouses can help.', off: 'Toronto has a large public library.' },
    { g: 7, to: 8, title: 'Sleep', topic: 'Teens need more sleep than they often get.', details: ['Experts say teens need about 8 to 10 hours a night.', 'Phones and homework keep many teens up late.', 'Tired students find it harder to focus and remember.'], close: 'Going to bed earlier is a simple way to do better at school.', off: 'Breakfast cereals come in many flavours.' }
  ];
  var joins = [[1, 'First'], [1, 'Next'], [1, 'Also'], [1, 'Then'], [1, 'Last'], [4, 'For example'], [4, 'In addition'], [4, 'Another reason is that'], [4, 'Finally'], [4, 'As a result'],
    [7, 'Furthermore'], [7, 'Moreover'], [7, 'However'], [7, 'Consequently'], [7, 'In contrast']];
  var kernels = [
    { g: 1, to: 4, k: 'Bears sleep through the winter', because: 'food is hard to find', but: 'they can wake up on warm days', so: 'they eat a lot in the fall' },
    { g: 1, to: 4, k: 'Our class planted a garden', because: 'we wanted to grow vegetables', but: 'rabbits ate the lettuce', so: 'we built a small fence' },
    { g: 1, to: 4, k: 'Maya wore her boots', because: 'it was snowing', but: 'her feet still got cold', so: 'she wore two pairs of socks the next day' },
    { g: 4, to: 6, k: 'The town built a new skatepark', because: 'teens asked for a safe place to ride', but: 'some neighbours worried about noise', so: 'the park closes at nine in the evening' },
    { g: 4, to: 6, k: 'Monarch butterflies fly to Mexico each fall', because: 'they cannot survive a Canadian winter', but: 'no single butterfly makes the whole round trip', so: 'it takes several generations to return north' },
    { g: 4, to: 6, k: 'The library stays open late on Thursdays', because: 'many families are busy during the day', but: 'it closes early on Sundays', so: 'we go after soccer practice' },
    { g: 7, to: 8, k: 'Many cities are planting more trees', because: 'trees cool the streets in summer', but: 'young trees need years of care', so: 'volunteers water them in dry weeks' },
    { g: 7, to: 8, k: 'Some schools keep phones out of class', because: 'phones can distract students', but: 'phones can also be useful tools', so: 'some teachers plan set times to use them' },
    { g: 7, to: 8, k: 'The Trans Canada Trail is one of the longest trail networks in the world', because: 'it links every province and territory', but: 'some parts still run along roads', so: 'groups keep building new sections' }
  ];
  var starters = {
    topic: [[1, 'I think'], [1, 'There are many'], [4, 'One of the best'], [7, 'Although many people believe']],
    detail: [[1, 'One reason is'], [1, 'Also,'], [4, 'For example,'], [4, 'In addition,'], [7, 'Furthermore,']],
    close: [[1, 'That is why'], [4, 'In conclusion,'], [7, 'For these reasons,']]
  };

  /* ---------- Letter pad: printing (lowercase, capitals, numbers) and cursive ---------- */
  var C = 'M46,63 A22.5,22.5 0 1 0 46,92';
  var print = {
    a: { w: 56, s: [C, 'M50,55 L50,100'] }, b: { w: 56, s: ['M10,10 L10,100 L10,77.5 A21,22.5 0 1 1 10,78.5'] }, c: { w: 52, s: [C] },
    d: { w: 56, s: [C, 'M50,10 L50,100'] }, e: { w: 54, s: ['M5,78 L49.5,78 A22.5,22.5 0 1 0 44,92.3'] }, f: { w: 46, s: ['M42,18 C36,8 20,10 20,26 L20,100', 'M6,55 L36,55'] },
    g: { w: 56, s: [C, 'M50,55 L50,135 Q50,148 34,148 Q20,148 14,138'] }, h: { w: 56, s: ['M10,10 L10,100 L10,72 Q10,55 28,55 Q46,55 46,72 L46,100'] }, i: { w: 40, s: ['M20,55 L20,100', 'M20,37 L20,37.5'] },
    j: { w: 42, s: ['M30,55 L30,135 Q30,148 16,148 Q6,148 2,140', 'M30,37 L30,37.5'] }, k: { w: 50, s: ['M10,10 L10,100', 'M42,55 L10,80 L44,100'] }, l: { w: 40, s: ['M20,10 L20,100'] },
    m: { w: 68, s: ['M8,55 L8,100 L8,70 Q8,55 21,55 Q34,55 34,70 L34,100 L34,70 Q34,55 47,55 Q60,55 60,70 L60,100'] }, n: { w: 56, s: ['M10,55 L10,100 L10,72 Q10,55 28,55 Q46,55 46,72 L46,100'] },
    o: { w: 54, s: ['M27,55 A22.5,22.5 0 0 0 27,100 A22.5,22.5 0 0 0 27,55'] }, p: { w: 56, s: ['M10,55 L10,145 L10,77.5 A21,22.5 0 1 1 10,78.5'] }, q: { w: 56, s: [C, 'M50,55 L50,145'] },
    r: { w: 46, s: ['M10,55 L10,100 L10,72 Q12,55 32,55 Q40,55 44,60'] }, s: { w: 50, s: ['M44,62 C38,52 12,52 13,66 C14,78 42,75 44,88 C46,102 14,104 7,92'] },
    t: { w: 44, s: ['M22,25 L22,100', 'M8,55 L38,55'] }, u: { w: 56, s: ['M10,55 L10,80 Q10,100 28,100 Q46,100 46,80 L46,55 L46,100'] }, v: { w: 54, s: ['M6,55 L27,100 L48,55'] },
    w: { w: 66, s: ['M4,55 L18,100 L32,62 L46,100 L60,55'] }, x: { w: 52, s: ['M8,55 L44,100', 'M44,55 L8,100'] }, y: { w: 54, s: ['M8,55 L28,100', 'M48,55 L20,145'] },
    z: { w: 52, s: ['M8,55 L44,55 L8,100 L44,100'] }
  };
  var caps = {
    A: { w: 60, s: ['M30,10 L6,100', 'M30,10 L54,100', 'M16,66 L44,66'] }, B: { w: 58, s: ['M10,10 L10,100', 'M10,10 L32,10 Q50,10 50,32 Q50,54 32,54 L10,54', 'M10,54 L35,54 Q54,54 54,77 Q54,100 35,100 L10,100'] },
    C: { w: 58, s: ['M52,24 A25,45 0 1 0 52,86'] }, D: { w: 60, s: ['M10,10 L10,100', 'M10,10 L26,10 Q54,10 54,55 Q54,100 26,100 L10,100'] },
    E: { w: 54, s: ['M10,10 L10,100', 'M10,10 L48,10', 'M10,55 L42,55', 'M10,100 L48,100'] }, F: { w: 52, s: ['M10,10 L10,100', 'M10,10 L48,10', 'M10,55 L42,55'] },
    G: { w: 62, s: ['M52,24 C46,12 38,10 30,10 C14,10 6,32 6,55 C6,80 16,100 30,100 C44,100 54,88 54,70 L54,62 L36,62'] }, H: { w: 60, s: ['M10,10 L10,100', 'M50,10 L50,100', 'M10,55 L50,55'] },
    I: { w: 50, s: ['M25,10 L25,100', 'M9,10 L41,10', 'M9,100 L41,100'] }, J: { w: 52, s: ['M42,10 L42,78 Q42,100 24,100 Q8,100 6,84'] },
    K: { w: 56, s: ['M10,10 L10,100', 'M50,10 L10,62', 'M24,46 L52,100'] }, L: { w: 50, s: ['M10,10 L10,100 L46,100'] },
    M: { w: 66, s: ['M8,100 L8,10 L33,64 L58,10 L58,100'] }, N: { w: 60, s: ['M10,100 L10,10 L50,100 L50,10'] },
    O: { w: 60, s: ['M30,10 A25,45 0 0 0 30,100 A25,45 0 0 0 30,10'] }, P: { w: 56, s: ['M10,10 L10,100', 'M10,10 L32,10 Q52,10 52,33 Q52,56 32,56 L10,56'] },
    Q: { w: 62, s: ['M30,10 A25,45 0 0 0 30,100 A25,45 0 0 0 30,10', 'M36,76 L58,104'] }, R: { w: 58, s: ['M10,10 L10,100', 'M10,10 L32,10 Q52,10 52,33 Q52,56 32,56 L10,56 L50,100'] },
    S: { w: 56, s: ['M50,24 C44,6 10,6 10,30 C10,52 50,50 50,76 C50,104 12,104 6,84'] }, T: { w: 58, s: ['M5,10 L53,10', 'M29,10 L29,100'] },
    U: { w: 60, s: ['M10,10 L10,72 Q10,100 30,100 Q50,100 50,72 L50,10'] }, V: { w: 60, s: ['M6,10 L30,100 L54,10'] },
    W: { w: 70, s: ['M4,10 L18,100 L35,32 L52,100 L66,10'] }, X: { w: 58, s: ['M8,10 L50,100', 'M50,10 L8,100'] },
    Y: { w: 58, s: ['M8,10 L29,55', 'M50,10 L29,55 L29,100'] }, Z: { w: 58, s: ['M8,10 L50,10 L8,100 L50,100'] }
  };
  var nums = {
    0: { w: 54, s: ['M27,10 A22,45 0 0 0 27,100 A22,45 0 0 0 27,10'] }, 1: { w: 44, s: ['M12,26 L28,10 L28,100'] }, 2: { w: 56, s: ['M8,30 C8,4 52,4 50,32 C48,52 20,74 6,100 L52,100'] },
    3: { w: 56, s: ['M8,22 C20,4 50,8 48,30 C46,50 26,54 22,54 C40,54 52,64 50,80 C48,104 14,104 6,88'] }, 4: { w: 58, s: ['M38,10 L6,70 L54,70', 'M40,40 L40,100'] },
    5: { w: 56, s: ['M46,10 L14,10 L10,50 C24,40 50,44 50,70 C50,100 16,104 6,88'] }, 6: { w: 58, s: ['M44,14 C30,6 8,22 8,64 C8,92 24,100 30,100 C44,100 52,90 52,76 C52,60 40,52 30,52 C18,52 10,62 8,70'] },
    7: { w: 56, s: ['M6,10 L52,10 L22,100'] }, 8: { w: 56, s: ['M46,22 C40,6 14,6 13,25 C12,44 48,52 48,76 C48,108 10,108 10,76 C10,52 46,44 46,25 C46,20 46,21 46,22'] },
    9: { w: 56, s: ['M48,30 C44,14 32,10 27,10 C14,10 8,20 8,30 C8,44 18,50 28,50 C40,50 48,42 48,30 L48,100'] }
  };
  /* cursive: each letter starts on the grass line with an up-stroke and ends with an exit stroke, ready to join */
  var cur = {
    a: { w: 66, s: ['M2,100 C8,78 18,58 34,56 C18,56 10,70 10,80 C10,94 20,100 30,100 C42,100 50,90 50,72 L50,56 L50,90 C50,98 56,101 64,94'] },
    b: { w: 60, s: ['M2,100 C14,86 34,50 34,26 C34,8 18,8 18,28 L18,86 C18,104 46,104 44,76 C43,62 34,58 30,62 C38,64 48,62 58,58'] },
    c: { w: 58, s: ['M2,100 C8,78 18,58 34,56 C42,56 46,60 44,64 C40,58 32,56 26,58 C14,62 10,72 10,80 C10,94 20,100 30,100 C40,100 48,96 56,88'] },
    d: { w: 66, s: ['M2,100 C8,78 18,58 34,56 C18,56 10,70 10,80 C10,94 20,100 30,100 C42,100 50,90 50,72 L51,10 L50,90 C50,98 56,101 64,94'] },
    e: { w: 58, s: ['M2,100 C14,92 36,80 38,66 C38,54 22,54 18,66 C12,84 20,100 34,100 C44,100 52,94 56,88'] },
    f: { w: 50, s: ['M2,100 C14,86 32,50 32,26 C32,8 16,8 16,30 L18,140 C18,152 34,148 30,126 C28,112 34,104 48,94'] },
    g: { w: 68, s: ['M2,100 C8,78 18,58 34,56 C18,56 10,70 10,80 C10,94 20,100 30,100 C42,100 50,90 50,72 L50,56 L50,128 C50,150 24,150 24,136 C24,122 46,110 66,98'] },
    h: { w: 64, s: ['M2,100 C14,86 34,50 34,26 C34,8 18,8 18,28 L18,100 L18,74 C24,58 44,52 46,70 L46,90 C46,100 54,102 62,92'] },
    i: { w: 42, s: ['M2,100 C10,88 20,72 24,55 L22,90 C22,100 30,102 40,92', 'M24,38 L24,38.5'] },
    j: { w: 48, s: ['M2,100 C10,88 20,72 24,55 L24,130 C24,150 4,150 6,136 C8,122 30,110 46,98', 'M24,38 L24,38.5'] },
    k: { w: 60, s: ['M2,100 C14,86 34,50 34,26 C34,8 18,8 18,28 L18,100 L18,76 C26,58 50,56 46,70 C44,80 30,82 24,80 C34,84 40,100 56,94'] },
    l: { w: 42, s: ['M2,100 C14,86 34,50 34,26 C34,8 18,8 18,28 L18,88 C18,100 28,102 40,92'] },
    m: { w: 88, s: ['M2,100 C6,80 12,58 18,56 C24,55 24,70 24,100 C28,66 36,55 42,56 C48,57 48,70 48,100 C52,66 60,55 66,56 C72,57 72,74 70,90 C70,100 78,102 86,92'] },
    n: { w: 70, s: ['M2,100 C6,80 12,58 20,56 C26,55 26,70 26,100 C32,66 42,55 50,56 C58,57 56,74 54,90 C54,100 62,102 68,92'] },
    o: { w: 64, s: ['M2,100 C8,78 18,58 32,56 C18,56 10,70 10,80 C10,94 20,100 30,100 C44,100 50,88 50,78 C50,66 42,56 32,56 C42,62 52,62 62,58'] },
    p: { w: 60, s: ['M2,100 C10,88 18,72 20,55 L20,145 L20,80 C26,60 48,56 48,78 C48,98 30,104 22,92 C32,100 46,100 56,92'] },
    q: { w: 68, s: ['M2,100 C8,78 18,58 34,56 C18,56 10,70 10,80 C10,94 20,100 30,100 C42,100 50,90 50,72 L50,56 L50,142 C50,128 56,110 66,96'] },
    r: { w: 56, s: ['M2,100 C10,86 18,70 20,55 C26,60 32,62 38,58 L38,90 C38,100 46,102 54,92'] },
    s: { w: 50, s: ['M2,100 C10,86 20,68 24,55 C34,70 42,82 38,94 C34,102 18,102 14,94 C20,100 34,100 48,92'] },
    t: { w: 46, s: ['M2,100 C10,86 20,50 24,22 L22,90 C22,100 30,102 42,92', 'M10,55 L38,55'] },
    u: { w: 62, s: ['M2,100 C8,88 16,72 18,55 L16,86 C16,102 36,102 42,82 L44,55 L42,90 C42,100 50,102 60,92'] },
    v: { w: 68, s: ['M2,100 C8,82 14,62 20,56 C24,62 30,90 34,100 C40,90 46,66 48,56 C52,62 60,62 66,58'] },
    w: { w: 80, s: ['M2,100 C8,88 16,72 18,55 L16,86 C16,102 34,102 38,80 L40,55 L38,86 C38,102 58,102 62,80 L62,55 C62,62 70,62 78,58'] },
    x: { w: 62, s: ['M2,100 C10,86 20,60 28,56 C34,56 38,70 44,100 C48,104 56,100 60,94', 'M18,100 L50,56'] },
    y: { w: 64, s: ['M2,100 C8,88 16,72 18,55 L16,86 C16,102 36,102 42,82 L44,55 L44,130 C44,150 20,150 20,136 C20,122 42,110 62,98'] },
    z: { w: 60, s: ['M2,100 C8,86 14,62 22,56 C30,52 44,54 44,62 C44,72 30,80 24,82 C40,84 44,96 40,120 C36,148 14,148 16,134 C18,120 40,110 58,100'] }
  };
  var cues = {
    a: 'Curve back around, up, and down.', b: 'Down from the sky, up, and around.', c: 'Curve back and around.', d: 'Curve back around, up to the sky, and down.',
    e: 'Across, then curve back around.', f: 'Curve back, down to the grass, then cross.', g: 'Curve back around, up, down into the ground, and hook.',
    h: 'Down from the sky, up, over the hump, and down.', i: 'Down, then a dot.', j: 'Down into the ground and hook, then a dot.', k: 'Down from the sky; then in, and out.',
    l: 'Down from the sky.', m: 'Down, up, over, down; up, over, down.', n: 'Down, up, over the hump, and down.', o: 'Curve back all the way around, and close.',
    p: 'Down into the ground, up, and around.', q: 'Curve back around, up, and down into the ground.', r: 'Down, up, and over.', s: 'Curve back, then curve the other way.',
    t: 'Down from near the sky, then cross.', u: 'Down, around, up, and down.', v: 'Slant down, slant up.', w: 'Slant down, up, down, up.',
    x: 'Slant down one way, then the other way.', y: 'Slant down a little, then a long slant into the ground.', z: 'Across, slant down, across.'
  };
  var letters = [
    { id: 'abc', name: 'abc', from: 1, to: 8, list: print, cues: cues, groups: [['Curve back', 'c a d g o q e s'], ['Straight down', 'l i t j f'], ['Humps', 'r n m h b p u'], ['Slants', 'v w x y z k']] },
    { id: 'ABC', name: 'ABC', from: 1, to: 8, list: caps, cues: {}, groups: [['Straight lines', 'L E F H T I'], ['Curves', 'P B R D C O Q G S J U'], ['Slants', 'V W X Y Z A K M N']] },
    { id: '123', name: '123', from: 1, to: 8, list: nums, cues: {}, groups: [['Numbers', '0 1 2 3 4 5 6 7 8 9']] },
    { id: 'cursive', name: 'Cursive', from: 3, to: 8, list: cur, cues: {}, groups: [['Curve back', 'c a d g o q'], ['Up and down', 'i t u w j p r s'], ['Loops', 'e l h k b f'], ['Humps', 'n m v x y z']] }
  ];
  window.Atlas.writebank = { paras: paras, joins: joins, kernels: kernels, starters: starters, letters: letters };
})();
