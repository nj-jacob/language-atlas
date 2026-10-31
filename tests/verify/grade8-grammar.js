/* Grade 8 answer checks: grammar (grade8/chapters/grammar.js). Each check reads the sentence with the checker's own rules:
   passive voice is was or were with a past participle; the doer follows "by"; the job of an -ing word comes from the word before it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const passive = s => /\b(was|were) (\w+ed|built|written)\b/.test(s);
  const pass = s => { const m = s.replace(/\.$/, '').match(/^(.*) (?:was|were) \w+ by (.*)$/); return m && { thing: m[1].toLowerCase(), doer: m[2].toLowerCase() }; };
  const ACT = /^(.*?) (built|planted|opened|damaged|wrote|prepared|cleaned|stopped) (.*)\.$/;
  const act = s => { const m = s.match(ACT); return m && { doer: m[1].toLowerCase(), thing: m[3].toLowerCase() }; };
  V['g8-voice'] = (q, m) => mk(q) === (passive(text(m.s)) ? 'passive' : 'active') ? '' : 'wrong voice';
  V['g8-doer'] = (q, m) => pass(text(m.s)) && mk(q).toLowerCase() === pass(text(m.s)).doer ? '' : 'the doer comes after by';
  V['g8-to-active'] = (q, m) => { const p = pass(text(m.s)), a = act(mk(q)), ok = o => { const x = act(o); return !passive(o) && x && x.doer === p.doer && x.thing === p.thing; };
    return a && ok(mk(q)) && q.options.map(text).filter(ok).length === 1 ? '' : 'the active sentence marked does not keep the meaning'; };
  V['g8-to-passive'] = (q, m) => { const a = act(text(m.s)), ok = o => { const x = pass(o); return passive(o) && x && x.doer === a.doer && x.thing === a.thing; };
    return ok(mk(q)) && q.options.map(text).filter(ok).length === 1 ? '' : 'the passive sentence marked does not keep the meaning'; };
  V['g8-pick-passive'] = q => H.sameSet(q.options.map((o, i) => passive(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the passive sentences are not the ones marked';

  const BE = new Set('is are was were am'.split(' ')), LIKE = new Set('enjoys loves likes finished started avoids'.split(' '));
  const ingJob = (s, w) => { const t = s.replace(/[.,]/g, '').split(' '), i = t.indexOf(w), prev = (t[i - 1] || '').toLowerCase();
    return BE.has(prev) ? 'verb' : i === 0 || LIKE.has(prev) ? 'gerund' : 'participle'; };
  const LABEL = { gerund: 'noun', participle: 'describe', verb: 'part of the verb' };
  V['g8-ing'] = (q, m) => mk(q).includes(LABEL[ingJob(text(m.s), m.w)]) ? '' : m.w + ' is a ' + ingJob(text(m.s), m.w);
  V['g8-tap-gerund'] = (q, m) => ingJob(text(m.s), mk(q)) === 'gerund' && /ing$/.test(mk(q)) ? '' : 'the gerund is not the word marked';
  V['g8-match-ing'] = q => q.pairs.every(p => { const d = document.createElement('div'); d.innerHTML = p[0]; const w = d.querySelector('b').textContent; return text(p[1]).includes(LABEL[ingJob(text(p[0]), w)]); }) ? '' : 'a sentence is matched wrong';
  V['g8-gerund-tf'] = (q, m) => ((ingJob(text(m.s), m.w) === 'gerund' ? 'a gerund' : 'not a gerund') === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.w;

  const GIVE = new Set('gave told sent showed offered bought'.split(' ')), DET = new Set('a an the my her his our their'.split(' '));
  V['g8-object'] = (q, m) => { const t = text(m.s).replace(/\.$/, '').split(' '), v = t.findIndex(w => GIVE.has(w)), after = t.slice(v + 1).filter(w => !DET.has(w) && w !== 'new');
    const want = m.want === 'direct' ? after[after.length - 1] : after[0]; return mk(q) === want ? '' : 'expected ' + want; };
  V['g8-predicate'] = (q, m) => { const t = text(m.s).replace(/[.]/g, '').split(' '), i = t.indexOf(m.w), prev = t[i - 1], noun = DET.has(prev) || /^[A-Z]/.test(m.w);
    return mk(q) === (noun ? 'noun' : 'adjective') ? '' : 'expected ' + (noun ? 'noun' : 'adjective'); };
  const WHERE = new Set('along under beside across behind in on'.split(' ')), WHEN = new Set('after during until before'.split(' '));
  const tells = ph => { const f = ph.split(' ')[0].toLowerCase(); return f === 'very' ? 'how' : WHERE.has(f) ? 'where' : WHEN.has(f) ? 'when' : ''; };
  V['g8-phrase'] = (q, m) => { const ok = o => tells(o) === m.tells && text(m.s).includes(o) && o.split(' ').length >= 2; return ok(mk(q)) && q.options.map(text).filter(ok).length === 1 ? '' : 'the phrase marked is not right'; };
  V['g8-phrase-tells'] = (q, m) => mk(q) === tells(m.ph) ? '' : 'it tells ' + tells(m.ph);
  const ACTS = new Set('bought taught prepared washed'.split(' '));
  V['g8-self'] = (q, m) => { const t = text(m.s).split(' '), prev = t[t.indexOf(m.w) - 1]; return mk(q) === (ACTS.has(prev) ? 'reflexive' : 'intensive') ? '' : 'wrong kind for ' + m.w; };
})();
