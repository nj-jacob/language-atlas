/* Grade 8 answer checks: planning and research (grade8/chapters/planning.js). Own key lists, and rules for dates and citations. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const FORM = { 'persuade town council to fund a skate park': 'letter', 'teach Grade 4 students to build a birdhouse': 'instructions', 'share a family story with your relatives': 'narrative',
    'entertain teens with a spooky tale': 'short story', 'report the results of a science experiment': 'lab report', 'get the whole school to come to a bake sale': 'poster' };
  V['g8-form'] = (q, m) => mk(q).includes(FORM[m.p]) ? '' : 'expected the ' + FORM[m.p];
  V['g8-match-form'] = q => q.pairs.every(p => text(p[1]).includes(FORM[text(p[0])])) ? '' : 'a purpose is matched to the wrong form';
  V['g8-form-tf'] = (q, m) => text(m.said).includes(FORM[m.p]) === q.answer ? '' : 'true/false is wrong';
  const IDEAS = [[/see how they connect/, 'mind map'], [/affects your community/, 'Interview'], [/cannot start/, 'Freewrite'], [/own life/, 'memories']];
  V['g8-ideas'] = (q, m) => { const i = IDEAS.find(x => x[0].test(text(m.p))); return i && mk(q).includes(i[1]) ? '' : 'expected ' + (i && i[1]); };
  const RELIABLE = /official Ontario Parks|Health Canada|historian, with sources|Environment Canada/;
  V['g8-reliable'] = q => RELIABLE.test(mk(q)) && q.options.map(text).filter(o => RELIABLE.test(o)).length === 1 ? '' : 'expected the reliable source';
  const year = s => +(s.match(/\d{4}/) || [0])[0];
  V['g8-current'] = q => year(mk(q)) === Math.max(...q.options.map(o => year(text(o)))) ? '' : 'expected the newest source';
  V['g8-bias-source'] = q => /biased/.test(mk(q)) ? '' : 'expected the bias problem';
  const needsCite = s => /exact words|facts or numbers|image you found|idea from an article/.test(s);
  V['g8-when-cite'] = q => H.sameSet(q.options.map((o, i) => needsCite(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the times to cite are not the ones marked';
  /* complete: Surname, Initial. Title. Publisher, year. */
  const complete = s => /^[A-Z][a-z]+, [A-Z]\. [^.]+\. [^,]+, \d{4}\.$/.test(s);
  V['g8-citation'] = q => complete(mk(q)) && q.options.map(text).filter(complete).length === 1 ? '' : 'expected the complete citation';
  const HEAD = [[/ponds|lodges/, 'Habitat'], [/eat|food/, 'Diet'], [/tails|night/, 'Behaviour']];
  V['g8-classify'] = q => q.pairs.every(p => { const h = HEAD.find(x => x[0].test(text(p[0]))); return h && h[1] === text(p[1]); }) ? '' : 'a note is under the wrong heading';
  const ORDER = ['Hook', 'First reason', 'Second reason', 'Answer to the other side', 'Conclusion'];
  V['g8-outline'] = q => { const at = q.items.map(i => ORDER.findIndex(o => text(i).startsWith(o))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the parts are not in a persuasive order'; };
  const ORG = { 'compare two novels': 'Venn', 'explain what caused a flood': 'cause-and-effect', 'plan the events of a short story': 'story arc', 'order the events in a history report': 'timeline' };
  V['g8-organizer'] = (q, m) => mk(q).includes(ORG[m.p]) ? '' : 'expected ' + ORG[m.p];
  V['g8-match-org'] = q => q.pairs.every(p => text(p[1]).includes(ORG[text(p[0])])) ? '' : 'a plan is matched to the wrong organizer';
})();
