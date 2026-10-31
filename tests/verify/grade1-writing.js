/* Grade 1 answer checks: writing and sharing (grade1/chapters/writing.js).
   Spacing and first person are worked out from the words; edits are checked against the checker's own spelling list and the
   rules for capitals and end marks. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const WORDS = new Set('i like my cat we can run fast the sun is hot mom has a red hat dog sit see big bus play in snow went to park said hello nurse go now was hungry and sam played they have boat ran home'.split(' '));
  const spelled = s => s.replace(/[.?!]/g, '').split(' ').every(w => WORDS.has(w.toLowerCase()));
  const spaced = s => / /.test(s) && s.split(' ').every(w => w.length > 1 || /^[Ia]$/.test(w)) && spelled(s);
  const asks = s => H.askWords.includes(s.split(' ')[0]);
  const right = s => H.sentenceOk(s) && !/\bi\b/.test(s) && spelled(s) && (asks(s) ? /\?$/.test(s) : /\.$/.test(s));
  const VOICE = /\b(love|think|felt|favourite|nervous)\b/;
  const FIRST = /\b(I|my|We|we|me)\b/;
  const wrongKind = s => !/^[A-Z]/.test(s) || /\bi\b/.test(s) ? 'capital' : !spelled(s) ? 'spelling' : 'mark';
  const LINE = { capital: /capital/, mark: /end mark/, spelling: /spelled wrong/ };
  V['g1-spacing'] = (q, m) => { const ok = q.options.map(text).filter(spaced); return ok.length === 1 && mk(q) === ok[0] && ok[0] === m.s ? '' : 'expected the sentence with spaces between words'; };
  V['g1-voice'] = q => { const ok = q.options.map(text).filter(o => VOICE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with a thought or feeling'; };
  V['g1-pick-voice'] = q => H.sameSet(q.options.map((o, i) => VOICE.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the voice sentences are not the ones marked';
  V['g1-first-person'] = q => { const ok = q.options.map(text).filter(o => FIRST.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the first-person sentence'; };
  V['g1-fix-it'] = (q, m) => { const ok = q.options.map(text).filter(right); return !right(m.shown) && ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one sentence written right'; };
  V['g1-tap-mistake'] = (q, m) => {
    const t = q.tiles.map(text), k = wrongKind(m.shown), want = k === 'capital' ? t.findIndex((w, i) => i === 0 ? !/^[A-Z]/.test(w) : w === 'i') : k === 'spelling' ? t.findIndex(w => !WORDS.has(w.replace(/[.?!]/g, '').toLowerCase())) : t.length - 1;
    return q.answer === want ? '' : 'expected the word "' + t[want] + '"';
  };
  V['g1-what-wrong'] = (q, m) => LINE[wrongKind(m.shown)].test(mk(q)) ? '' : 'expected: ' + wrongKind(m.shown);
  V['g1-edit-tf'] = (q, m) => { const ok = right(m.shown), why = text(q.why.options[q.why.answer]); return q.answer === ok && (ok ? /capital, an end mark/.test(why) : LINE[wrongKind(m.shown)].test(why)) ? '' : 'true/false or the reason is wrong for "' + m.shown + '"'; };
})();
