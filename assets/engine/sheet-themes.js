/* Language Atlas worksheet themes, shared by every grade. Needs sheets.js first.
   Every sheet has the same Editorial layout (sheets.js, sheets.css). A theme gives it its own character inside that layout:
   the face of the title and question numbers (loaded in sheets.css), one accent colour, a small line-art mark beside the
   chapter name, and a light ornament kept to the page's edges. The questions stay the same, so no theme is harder.
   House style (Noel): the paper is always white and colour is light: thin outlines in one accent colour, never filled areas.
   id: two letters, used in the sheet number. mark: line art in a 56 by 56 box. frame(): line art on the 816 by 1056 page. */
(function () {
  'use strict';
  var S = window.Atlas && Atlas.sheets;
  if (!S) return;
  function line(d, c, w) { return '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function star(cx, cy, r, c) {
    var p = [];
    for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; p.push((cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1)); }
    return line('M' + p.join(' L') + ' Z', c, 1.2);
  }
  function pine(x, y, s, c) { return line('M' + x + ' ' + y + ' l' + (-7 * s) + ' ' + (12 * s) + ' h' + (4 * s) + ' l' + (-6 * s) + ' ' + (10 * s) + ' h' + (18 * s) + ' l' + (-6 * s) + ' ' + (-10 * s) + ' h' + (4 * s) + ' Z M' + x + ' ' + (y + 22 * s) + ' v' + (6 * s), c, 1.2); }
  function flake(cx, cy, r, c) {
    var d = '';
    for (var i = 0; i < 3; i++) { var a = i * Math.PI / 3; d += 'M' + (cx - Math.cos(a) * r).toFixed(1) + ' ' + (cy - Math.sin(a) * r).toFixed(1) + ' L' + (cx + Math.cos(a) * r).toFixed(1) + ' ' + (cy + Math.sin(a) * r).toFixed(1) + ' '; }
    return line(d, c, 1.2);
  }
  function wave(y, c, from, to) { var d = 'M' + from + ' ' + y; for (var x = from; x < to; x += 24) d += ' q6 -5 12 0 t12 0'; return line(d, c, 1); }

  /* At the lake: a canoe, and ripples along the foot of the page */
  var LK = '#2f62c4';
  S.theme({ id: 'LK', name: 'At the lake', acc: LK, font: "'Fraunces', Georgia, serif",
    mark: line('M8 30 Q28 42 48 30 Q28 34 8 30 Z', LK) + line('M22 14 L34 40 M30 12 L28 18', LK),
    frame: function () { return wave(1046, LK, 52, 300) + wave(1040, LK, 516, 764); } });

  /* In the forest: a pine, and a few pines at the corner */
  var FO = '#1d7a4c';
  S.theme({ id: 'FO', name: 'In the forest', acc: FO, font: "'Roboto Slab', Georgia, serif",
    mark: line('M28 6 L16 26 H22 L12 42 H44 L34 26 H40 Z M28 42 V50', FO),
    frame: function () { return pine(782, 984, 1, FO) + pine(796, 1000, 0.7, FO); } });

  /* Under the stars: a moon, and stars in the top corner */
  var SK = '#4b45a1';
  S.theme({ id: 'SK', name: 'Under the stars', acc: SK, font: "'Exo 2', 'Trebuchet MS', sans-serif",
    mark: line('M31 8 A20 20 0 1 0 48 36 A16 16 0 1 1 31 8 Z', SK) + star(42, 15, 5, SK),
    frame: function () { return [[560, 18, 4], [620, 14, 5], [690, 20, 4], [790, 40, 5], [794, 96, 4]].map(function (s) { return star(s[0], s[1], s[2], SK); }).join(''); } });

  /* At the library: an open book, and a thin double rule down the left edge */
  var LB = '#b4531a';
  S.theme({ id: 'LB', name: 'At the library', acc: LB, font: "'Playfair Display', Georgia, serif",
    mark: line('M28 16 C22 11 13 11 7 13 V44 C13 42 22 42 28 46 C34 42 43 42 49 44 V13 C43 11 34 11 28 16 Z M28 16 V46', LB),
    frame: function () { return line('M22 60 V996', LB, 1) + line('M27 60 V996', LB, 0.6); } });

  /* In the snow: a snowflake, and flakes in the top corners */
  var SN = '#0b6e78';
  S.theme({ id: 'SN', name: 'In the snow', acc: SN, font: "'Quicksand', 'Trebuchet MS', sans-serif",
    mark: flake(28, 28, 20, SN) + line('M24 10 L28 14 L32 10 M24 46 L28 42 L32 46', SN),
    frame: function () { return flake(24, 24, 9, SN) + flake(792, 22, 8, SN) + flake(774, 40, 5, SN); } });

  /* In the garden: a sprout, and leaves at the foot of the page */
  var GD = '#5b7f12';
  function leafAt(x, y, r) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ')">' + line('M0 0 C6 -10 18 -10 24 0 C18 10 6 10 0 0 Z M0 0 H20', GD, 1.1) + '</g>'; }
  S.theme({ id: 'GD', name: 'In the garden', acc: GD, font: "'Josefin Sans', 'Trebuchet MS', sans-serif",
    mark: line('M28 50 V26 M28 30 C20 30 12 24 12 14 C22 14 28 20 28 30 M28 26 C28 16 36 10 46 10 C46 20 38 26 28 26', GD),
    frame: function () { return leafAt(30, 1040, -20) + leafAt(56, 1046, 10) + leafAt(762, 1042, 200); } });
})();
