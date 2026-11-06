/* Language Atlas card bank for the tool box, shared by every grade: the word cards Sentence builder knows, written fresh
   for this site. Needs atlas.js. Sets Atlas.cardbank = { jobs, cards, examples }.
     jobs      each job a card can do in a sentence: [id, the name on its tab, what the job is]. The card's colour shows its job.
     cards     by job, one string of cards split by '|': 'text:first grade it shows in'. A third part adds something:
                 who    pl    more than one (the kids), so a passive sentence says "were"
                 does   the form after "was" (fed in "was fed"); only these can turn passive
                 join   co    joins two sentences that could each stand alone (and, but, so)
                        sub   starts a part that cannot stand alone (because, when, although)
               Every past-tense does card fits every who card, so any sentence a child builds agrees.
     examples  ready sentences for "New sentence", by the first grade they show in. Cards are split by '|'; each must be a card
               of that grade or before, and each sentence must pass every tick (who or what, does, stands alone, mark at the end).
               A check fails otherwise (tests/run.js). */
(function () {
  'use strict';
  var A = window.Atlas;
  A.cardbank = {
    jobs: [['who', 'Who', 'who or what'], ['does', 'Does', 'does'], ['where', 'Where', 'where or when'], ['how', 'How', 'how'], ['join', 'Join', 'joins'], ['mark', 'Marks', 'marks']],
    cards: {
      who: 'my dog:1 | a frog:1 | the bus:1 | Leo:1 | Mei:1 | the kids:1:pl | a beaver:1 | the ball:1 | ' +
        'Amira:2 | a loon:2 | my cousin:2 | the puppies:2:pl | Kai:2 | the snow:2 | ' +
        'the wind:3 | the canoe:3 | the moose:3 | my grandparents:3:pl | Jonah:3 | ' +
        'the crew:4 | Priya:4 | the ferry:4 | the hikers:4:pl | Nadia:4 | the fire:4 | ' +
        'the mayor:6 | the bridge:6 | the volunteers:6:pl | ' +
        'the council:7 | Tobermory:7 | the elders:7:pl',
      does: 'ran:1 | sat:1 | jumped:1 | hid:1 | slept:1 | fed:1:fed | found:1:found | chased:1:chased | kicked:1:kicked | ' +
        'swam:2 | laughed:2 | called:2 | stopped:2 | pulled:2:pulled | carried:2:carried | painted:2:painted | helped:2:helped | ' +
        'paddled:3 | built:3:built | watched:3:watched | cleaned:3:cleaned | ' +
        'had dropped:4 | was late:4 | loaded:4:loaded | fixed:4:fixed | followed:4:followed | ' +
        'reached:6:reached | opened:6:opened | rescued:6:rescued | ' +
        'launched:7:launched | had planned:7 | welcomed:7:welcomed',
      where: 'in the snow:1 | on a log:1 | at night:1 | at the park:1 | by the pond:1 | today:1 | ' +
        'after lunch:2 | under the bed:2 | in the morning:2 | ' +
        'across the lake:3 | at dawn:3 | near the dock:3 | ' +
        'before the storm:4 | during recess:4 | beside the trail:4 | ' +
        'in Iqaluit:6 | at the end of the day:6 | ' +
        'along the shore:7 | by midnight:7',
      how: 'fast:1 | slowly:1 | quickly:2 | happily:2 | quietly:2 | carefully:3 | loudly:3 | suddenly:4 | gently:4 | bravely:4 | eventually:7',
      join: 'and:1:co | but:2:co | so:2:co | or:3:co | because:3:sub | when:3:sub | after:4:sub | before:4:sub | if:4:sub | ' +
        'although:6:sub | while:6:sub | unless:7:sub | since:7:sub',
      mark: '.:1 | ?:1 | !:1 | ,:3 | ;:7'
    },
    examples: {
      1: ['my dog | ran | in the snow | .', 'Leo | fed | my dog | .', 'a frog | sat | on a log | . | Mei | jumped | .', 'the kids | kicked | the ball | at the park | !'],
      2: ['Amira | swam | quickly | . | a loon | called | .', 'the puppies | hid | under the bed | .', 'Kai | painted | the bus | after lunch | .'],
      3: ['Amira | paddled | across the lake | at dawn | .', 'when | the snow | stopped | , | the kids | ran | .', 'my grandparents | built | the canoe | .'],
      4: ['Amira | paddled | across the lake | because | the wind | had dropped | .', 'at dawn | , | a loon | called | .', 'Nadia | fixed | the canoe | during recess | .'],
      6: ['the volunteers | rescued | a beaver | .', 'the mayor | opened | the bridge | in Iqaluit | .', 'the hikers | followed | Nadia | .'],
      7: ['although | the ferry | was late | , | Priya | reached | Tobermory | .', 'the crew | loaded | the ferry | by midnight | .', 'the elders | welcomed | the hikers | ; | the volunteers | cleaned | the canoe | .']
    }
  };
})();
