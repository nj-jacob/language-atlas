/* Grade 8 answer checks: grammar (grade8/chapters/grammar.js). Each check reads the sentence with the checker's own rules:
   passive voice is was or were with a past participle; the doer follows "by"; the job of an -ing word comes from the word before it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const why = (q, good) => q.why && q.why.answer === (good ? 0 : 1);
  const onlyOne = (list, ok) => list.filter(ok).length === 1;
  const words = s => s.replace(/[.,]/g, '').split(' ');

  /* voice */
  const passive = s => /\b(was|were) (\w+ed|built|written|won|caught|struck)\b/.test(s);
  const pass = s => { const m = s.replace(/\.$/, '').match(/^(.*) (?:was|were) \w+ by (.*)$/); return m && { thing: m[1].toLowerCase(), doer: m[2].toLowerCase() }; };
  const ACT = /^(.*?) (built|planted|opened|damaged|wrote|prepared|cleaned|stopped|won|graded|flattened|painted|caught|carved|approved|struck) (.*)\.$/;
  const act = s => { const m = s.match(ACT); return m && { doer: m[1].toLowerCase(), thing: m[3].toLowerCase() }; };
  /* a rewrite keeps the meaning when the same doer acts on the same thing */
  const same = (a, b) => !!a && !!b && a.doer === b.doer && a.thing === b.thing;
  const meaningOf = s => passive(s) ? pass(s) : act(s);
  V['g8-voice'] = (q, m) => mk(q) === (passive(text(m.s)) ? 'passive' : 'active') ? '' : 'wrong voice';
  V['g8-which-active'] = q => !passive(mk(q)) && onlyOne(q.options.map(text), o => !passive(o)) ? '' : 'the active sentence is not the one marked';
  V['g8-pick-active'] = q => H.sameSet(q.options.map((o, i) => passive(text(o)) ? -1 : i).filter(i => i >= 0), q.answer) ? '' : 'the active sentences are not the ones marked';
  V['g8-active-tf'] = (q, m) => q.answer === ((passive(text(m.s)) ? 'passive' : 'active') === m.said) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  V['g8-doer'] = (q, m) => { const p = pass(text(m.s)); return p && mk(q).toLowerCase() === p[m.want === 'doer' ? 'doer' : 'thing'] ? '' : 'expected the ' + m.want; };
  V['g8-which-passive'] = q => passive(mk(q)) && onlyOne(q.options.map(text), passive) ? '' : 'the passive sentence is not the one marked';
  V['g8-pick-passive'] = q => H.sameSet(q.options.map((o, i) => passive(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the passive sentences are not the ones marked';
  V['g8-passive-tf'] = (q, m) => { const right = pass(text(m.s)).doer === text(m.said).toLowerCase(); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-switch-voice'] = (q, m) => { const from = text(m.s), ok = o => passive(o) !== passive(from) && same(meaningOf(o), meaningOf(from));
    return ok(mk(q)) && onlyOne(q.options.map(text), ok) ? '' : 'the rewrite marked does not keep the meaning'; };
  V['g8-build-active'] = (q, m) => { const s = q.answer.map(i => text(q.parts[i])).join(' ') + '.'; return !passive(s) && same(act(s), pass(text(m.s))) ? '' : 'built "' + s + '"'; };
  V['g8-change-tf'] = (q, m) => { const right = same(act(text(m.shown)), pass(text(m.s))); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-spot-swap'] = (q, m) => { const p = pass(text(m.s)), bad = o => !same(act(o), p) && !!act(o) && act(o).thing === p.doer;
    return bad(mk(q)) && onlyOne(q.options.map(text), bad) ? '' : 'the swapped rewrite is not the one marked'; };

  /* -ing words: the word before decides */
  const BE = new Set('is are was were am'.split(' ')), LIKE = new Set('enjoys loves likes finished started avoids'.split(' '));
  const ingJob = (s, w) => { const t = words(s), i = t.indexOf(w), prev = (t[i - 1] || '').toLowerCase();
    return BE.has(prev) ? 'verb' : i === 0 || LIKE.has(prev) ? 'gerund' : 'participle'; };
  const ingIn = s => words(s).find(x => /ing$/.test(x));
  const LABEL = { gerund: 'noun', participle: 'describe', verb: 'part of the verb' };
  const DETS = new Set('the a an'.split(' '));
  V['g8-gerund'] = (q, m) => mk(q).startsWith(ingJob(text(m.s), m.w) === 'gerund' ? 'yes' : 'no') ? '' : m.w + ' is a ' + ingJob(text(m.s), m.w);
  V['g8-ing'] = (q, m) => mk(q).includes(LABEL[ingJob(text(m.s), m.w)]) ? '' : m.w + ' is a ' + ingJob(text(m.s), m.w);
  V['g8-tap-gerund'] = (q, m) => ingJob(text(m.s), mk(q)) === 'gerund' && /ing$/.test(mk(q)) ? '' : 'the gerund is not the word marked';
  V['g8-tap-participle'] = (q, m) => ingJob(text(m.s), mk(q)) === 'participle' && /ing$/.test(mk(q)) ? '' : 'the participle is not the word marked';
  /* a participle describes the noun right after it (after the or a) or right before it */
  V['g8-participle-noun'] = (q, m) => { const t = words(text(m.s)), i = t.indexOf(m.w), n = DETS.has((t[i - 1] || '').toLowerCase()) ? t[i + 1] : t[i - 1]; return mk(q) === n ? '' : 'expected ' + n; };
  V['g8-match-ing'] = q => q.pairs.every(p => text(p[1]).includes(LABEL[ingJob(text(p[0]), ingIn(text(p[0])))])) ? '' : 'a sentence is matched wrong';
  V['g8-gerund-tf'] = (q, m) => ((ingJob(text(m.s), m.w) === 'gerund' ? 'a gerund' : 'not a gerund') === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.w;
  V['g8-pick-gerunds'] = q => H.sameSet(q.options.map((o, i) => ingJob(text(o), ingIn(text(o))) === 'gerund' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the gerund sentences are not the ones marked';

  /* objects: after a giving verb, the indirect object comes first and the direct object last */
  const GIVE = new Set('gave told sent showed offered bought made found lent handed baked read threw wrote brought'.split(' ')), DET = new Set('a an the my her his our their each new'.split(' '));
  const FOR = new Set('bought made found baked'.split(' '));
  const objs = s => { const t = words(s), v = t.findIndex(w => GIVE.has(w)), after = t.slice(v + 1).filter(w => !DET.has(w)); return { verb: t[v], io: after[0], dobj: after[after.length - 1] }; };
  V['g8-object'] = (q, m) => { const o = objs(text(m.s)), want = m.want === 'direct' ? o.dobj : o.io; return mk(q) === want ? '' : 'expected ' + want; };
  V['g8-object-kind'] = (q, m) => { const o = objs(text(m.s)), k = m.w === o.dobj ? 'direct object' : m.w === o.io ? 'indirect object' : ''; return mk(q) === k ? '' : 'expected ' + k; };
  V['g8-object-to'] = (q, m) => { const o = objs(text(m.s)), w = FOR.has(o.verb) ? 'for' : 'to', ok = s => new RegExp('\\b' + o.dobj + ' ' + w + ' (\\w+ )?' + o.io + '\\.$').test(s);
    return ok(mk(q)) && onlyOne(q.options.map(text), ok) ? '' : 'expected the sentence ending "' + w + ' ' + o.io + '"'; };
  V['g8-object-tf'] = (q, m) => { const o = objs(text(m.s)), k = m.w === o.dobj ? 'direct object' : 'indirect object'; return q.answer === (k === m.said) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.w; };

  /* predicates: a noun after the linking verb has a determiner or a capital; otherwise it is an adjective */
  const LINK = new Set('is was became seems seemed looks looked sounds tastes smells feels felt grew remains'.split(' '));
  const predKind = (s, w) => { const t = words(s), prev = t[t.indexOf(w) - 1]; return DET.has(prev) || /^[A-Z]/.test(w) ? 'noun' : 'adjective'; };
  const predWord = s => { const t = words(s), i = t.findIndex(w => LINK.has(w)), rest = t.slice(i + 1).filter(w => !DET.has(w)); return rest[0]; };
  V['g8-predicate'] = (q, m) => mk(q) === predKind(text(m.s), m.w) ? '' : 'expected ' + predKind(text(m.s), m.w);
  V['g8-predicate-word'] = (q, m) => mk(q) === predWord(text(m.s)) ? '' : 'expected ' + predWord(text(m.s));
  V['g8-linking'] = q => LINK.has(mk(q)) && onlyOne(q.tiles.map(text), t => LINK.has(t)) ? '' : 'the linking verb is not the word marked';
  V['g8-predicate-tf'] = (q, m) => q.answer === (predKind(text(m.s), m.w) === m.said) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.w;
  V['g8-pick-pred-adj'] = q => H.sameSet(q.options.map((o, i) => predKind(text(o), predWord(text(o))) === 'adjective' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the predicate adjectives are not the ones marked';

  /* phrases: the first word tells where, when or how */
  const WHERE = new Set('along under beside across behind in on through'.split(' ')), WHEN = new Set('after during until before since'.split(' ')), HOW = new Set('very with quite'.split(' '));
  const tells = ph => { const f = ph.split(' ')[0].toLowerCase(); return HOW.has(f) ? 'how' : WHERE.has(f) ? 'where' : WHEN.has(f) ? 'when' : ''; };
  V['g8-phrase'] = (q, m) => { const ok = o => tells(o) === m.tells && text(m.s).includes(o) && o.split(' ').length >= 2; return ok(mk(q)) && onlyOne(q.options.map(text), ok) ? '' : 'the phrase marked is not right'; };
  V['g8-phrase-tells'] = (q, m) => mk(q) === tells(m.ph) ? '' : 'it tells ' + tells(m.ph);
  V['g8-which-phrase'] = (q, m) => tells(mk(q)) === m.tells && onlyOne(q.options.map(text), o => tells(o) === m.tells) ? '' : 'the phrase marked does not tell ' + m.tells;
  V['g8-phrase-match'] = q => q.pairs.every(p => tells(text(p[0])) === text(p[1])) ? '' : 'a phrase is matched wrong';
  V['g8-phrase-tells-tf'] = (q, m) => q.answer === (tells(m.ph) === m.said) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.ph;

  /* -self words: right after an action verb, the action comes back (reflexive); anywhere else it adds emphasis (intensive) */
  const ACTS = new Set('bought taught prepared washed made trust hurt scratched'.split(' '));
  const selfKind = (s, w) => { const t = words(s); return ACTS.has(t[t.indexOf(w) - 1]) ? 'reflexive' : 'intensive'; };
  const misuse = s => /\b(and|or) (myself|ourselves)\b|^(Myself|Ourselves) and/.test(s);
  V['g8-self'] = (q, m) => mk(q) === selfKind(text(m.s), m.w) ? '' : 'wrong kind for ' + m.w;
  V['g8-self-remove'] = (q, m) => mk(q).startsWith(selfKind(text(m.s), m.w) === 'intensive' ? 'yes' : 'no') ? '' : 'wrong answer for ' + m.w;
  V['g8-self-tf'] = (q, m) => q.answer === (selfKind(text(m.s), m.w) === m.said) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.w;
  V['g8-self-right'] = q => !misuse(mk(q)) && onlyOne(q.options.map(text), o => !misuse(o)) ? '' : 'the sentence marked misuses a -self word';
  const selfIn = s => s.split(' ').map(w => w.replace(/[.,]/g, '')).find(w => /self$|selves$/.test(w));
  V['g8-pick-intensive'] = q => H.sameSet(q.options.map((o, i) => selfKind(text(o), selfIn(text(o))) === 'intensive' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the intensive pronouns are not the ones marked';
})();
