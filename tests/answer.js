/* Runs inside the page: answers question q in its answer area (root) the way a child would: right, or wrong when bad is true.
   It clicks the same buttons a child taps. Add a case here for every new answer type. */
window.__answer = function (q, root, api, bad) {
  const $ = s => root.querySelector(s), $$ = s => [...root.querySelectorAll(s)];
  const click = el => { if (!el) throw new Error('missing element for ' + q.type); el.dispatchEvent(new MouseEvent('click', { bubbles: true })); };
  switch (q.type) {
    case 'mc': click($$('.qkbox .opt:not(:disabled)').find(b => (+b.getAttribute('data-j') === q.answer) !== bad)); break;
    case 'tap': { const want = String(q.answer); click($$('[data-hit]').find(h => (h.getAttribute('data-hit') === want) !== bad && !h.disabled)); break; }
    case 'pick': { const want = bad ? [q.answer[0] === 0 ? 1 : 0].concat(q.answer.slice(1)) : q.answer; $$('.qk-tg').forEach((b, j) => { if ((b.getAttribute('aria-pressed') === 'true') !== want.includes(j)) b.click(); }); click($('.qk-go')); break; }
    case 'order': { let g = 0; while ($('.qk-slots .qk-card') && g++ < 30) click($('.qk-slots .qk-card')); const seq = q.items.map((x, i) => i); if (bad) { const t = seq[0]; seq[0] = seq[1]; seq[1] = t; } seq.forEach(k => click($('.qk-pool [data-k="' + k + '"]'))); click($('.qk-go')); break; }
    case 'match': { for (let i = 0; i < q.pairs.length; i++) { click($('[data-l="' + i + '"]')); click($('[data-r="' + (bad && i < 2 ? 1 - i : i) + '"]')); } click($('.qk-go')); break; }
    case 'tf': { const v = bad ? !q.answer : q.answer; click($$('[data-tf="' + (v ? 1 : 0) + '"]').find(b => !b.disabled)); if (!bad && q.why) click($('[data-j="' + q.why.answer + '"]')); break; }
    default: throw new Error('no answerer for ' + q.type);
  }
};
