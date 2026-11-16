/* Language Atlas tool box: the Decodable readers' full-colour pictures (decodable.js loads this with the stories).
   A story's picture is a scene: a setting drawn at a time of day and a season, with people, animals and things standing on its ground.
     art: { set: 'forest', time: 'dusk', season: 'autumn', items: [['bear', 190, { s: 1.2 }], ['kid', 420, { skin: 3, hair: 'puffs' }], ['bug', 520]] }
   set     one of ART.sets (meadow, forest, lake, snow, town, farm, den, yard, shore, park, kitchen, bedroom, classroom, shop ...).
   time    'day' (the default), 'dusk', 'night' or 'grey' (a cloudy, rainy or snowy day).  season: 'summer' (the default), 'spring', 'autumn', 'winter'.
   items   [part, x, options], drawn back to front in the order given; x is the middle of the part, from 0 to 700.
           options: s (size, 1 is normal), flip (face the other way), y (how far up from the ground line: a positive y is further back),
           and the part's own options (a person's skin, hair and clothes ...). Sky parts (ART.sky) are placed by y from the top.
   Every part is drawn in its own box: the middle of its foot at 0,0, up is negative y, about life size against a child 100 high.
   One calm storybook look: flat fills with soft light and shade, no outlines, colours from the palette below. */
(function () {
  'use strict';
  var A = window.Atlas;
  if (!A || !A.decodable) return;
  var D = A.decodable;
  var W = 700, H = 230, GY = 206;
  var ART = (D.art = { sets: {}, parts: {}, sky: ['sun', 'moon', 'cloud', 'star', 'stars', 'bird', 'birds', 'plane', 'kite', 'rainfall', 'snowfall', 'aurora'] });
  var n = 0;

  /* ---------- drawing helpers (shared by every part) ---------- */
  function num(v) { return Math.round(v * 10) / 10; }
  function attrs(o) { return Object.keys(o || {}).map(function (k) { return ' ' + k + '="' + o[k] + '"'; }).join(''); }
  var H_ = (ART.h = {
    p: function (d, fill, x) { return '<path d="' + d + '" fill="' + fill + '"' + attrs(x) + '/>'; },
    e: function (cx, cy, rx, ry, fill, x) { return '<ellipse cx="' + num(cx) + '" cy="' + num(cy) + '" rx="' + num(rx) + '" ry="' + num(ry) + '" fill="' + fill + '"' + attrs(x) + '/>'; },
    c: function (cx, cy, r, fill, x) { return '<circle cx="' + num(cx) + '" cy="' + num(cy) + '" r="' + num(r) + '" fill="' + fill + '"' + attrs(x) + '/>'; },
    r: function (x0, y0, w, h, rx, fill, x) { return '<rect x="' + num(x0) + '" y="' + num(y0) + '" width="' + num(w) + '" height="' + num(h) + '" rx="' + num(rx) + '" fill="' + fill + '"' + attrs(x) + '/>'; },
    l: function (d, stroke, w, x) { return '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + attrs(x) + '/>'; },
    g: function (inner, tf, x) { return '<g' + (tf ? ' transform="' + tf + '"' : '') + attrs(x) + '>' + inner + '</g>'; },
    /* a colour made lighter (amt > 0) or darker (amt < 0), amt from -1 to 1 */
    tint: function (hex, amt) {
      var c = parseInt(hex.slice(1), 16), r = c >> 16, g = (c >> 8) & 255, b = c & 255;
      function f(v) { return Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt); }
      return '#' + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
    },
    /* a soft shadow on the ground under a part */
    shadow: function (w) { return '<ellipse cx="0" cy="1" rx="' + num(w / 2) + '" ry="' + num(Math.max(3, w / 9)) + '" fill="#26301c" opacity=".2"/>'; },
    /* an eye with a spark of light */
    eye: function (x, y, r) { r = r || 2.6; return H_.c(x, y, r, '#1d140d') + H_.c(x + r * 0.35, y - r * 0.35, r * 0.34, '#fff'); }
  });
  var h = H_;

  /* ---------- the palette: skies by time, land by season ---------- */
  var SKY = {
    day: ['#a9d2ec', '#d9ebf2', '#f1f3ea'], dusk: ['#f2c89a', '#f4e1c2', '#ece9d6'],
    night: ['#18223f', '#2b3a66', '#45507a'], grey: ['#b7c0c8', '#d3d8dc', '#e6e7e4']
  };
  var LAND = {
    summer: { far: '#a7bb8c', mid: '#86a364', near: '#6f914f', ground: '#86a660', grass: '#5b7c3f', tree: '#4c7a4f', leaf: '#5f9446', flower: ['#f2c94c', '#f6f1e6', '#e9a3b4'] },
    spring: { far: '#b9d09c', mid: '#9cc072', near: '#84ad5c', ground: '#97bd6c', grass: '#6a9446', tree: '#4f8152', leaf: '#7cb354', flower: ['#f4b8c8', '#f6f1e6', '#b9a6e8'] },
    autumn: { far: '#c9b98d', mid: '#b79a5e', near: '#a2894e', ground: '#a99b5e', grass: '#7f7139', tree: '#4c6e4c', leaf: '#d0813b', flower: ['#e0a83a', '#c8553d', '#f2c94c'] },
    winter: { far: '#dfe6ee', mid: '#cfd9e3', near: '#e3eaf1', ground: '#eef3f7', grass: '#c3cfdb', tree: '#3f6650', leaf: '#3f6650', flower: [] }
  };
  ART.land = LAND;

  /* ---------- the sky and the far land, shared by the outdoor settings ---------- */
  function sky(c) {
    var s = SKY[c.time] || SKY.day;
    return '<linearGradient id="' + c.id + 'sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + s[0] + '"/><stop offset=".6" stop-color="' + s[1] + '"/><stop offset="1" stop-color="' + s[2] + '"/></linearGradient>';
  }
  function hills(c, y, col, amp, seed) {
    var d = 'M0 ' + y, k = seed || 1;
    for (var x = 0; x <= W; x += 140) d += ' Q' + (x + 70) + ' ' + (y - amp * (((x / 140 + k) % 3) - 0.6)) + ' ' + (x + 140) + ' ' + y;
    return h.p(d + ' V' + H + ' H0 Z', col);
  }
  function spruce(x, y, s, col) {
    var t = h.tint(col, 0.18);
    return h.g(h.r(-3, -12, 6, 14, 1, '#6b4c35') +
      h.p('M0 -100 L-16 -62 H-8 L-26 -34 H-14 L-34 -6 H34 L14 -34 H26 L8 -62 H16 Z', col) +
      h.p('M0 -100 L-8 -80 L0 -82 Z M0 -70 L-14 -48 L0 -52 Z M0 -40 L-20 -16 L0 -22 Z', t, { opacity: '.7' }), 'translate(' + num(x) + ' ' + num(y) + ') scale(' + s + ')');
  }
  function leafy(x, y, s, col, trunk) {
    if (col === LAND.winter.leaf) return h.g(h.p('M-5 0 L-3 -50 Q0 -56 3 -50 L5 0 Z', '#6b5442') + h.l('M0 -40 L-22 -66 M-12 -54 L-20 -78 M0 -50 L18 -78 M10 -64 L26 -70 M0 -54 L2 -88', '#6b5442', 3.2) + h.l('M-24 -67 l6 -1 M16 -79 l7 0 M0 -89 l5 1', '#fff', 3, { opacity: '.9' }), 'translate(' + num(x) + ' ' + num(y) + ') scale(' + s + ')');
    return h.g(h.p('M-5 0 L-4 -40 Q0 -46 4 -40 L5 0 Z', trunk || '#7a5a3e') +
      h.c(0, -62, 28, col) + h.c(-20, -48, 20, h.tint(col, -0.12)) + h.c(20, -50, 21, h.tint(col, -0.06)) + h.c(-8, -76, 16, h.tint(col, 0.15)) + h.c(10, -70, 12, h.tint(col, 0.22), { opacity: '.8' }),
      'translate(' + num(x) + ' ' + num(y) + ') scale(' + s + ')');
  }
  ART.spruce = spruce;
  ART.leafy = leafy;
  function farSpruces(c, y, col, xs) { return xs.map(function (x, i) { return spruce(x, y, 0.32 + (i % 3) * 0.06, col); }).join(''); }
  function groundFront(c, L) {
    var d = 'M0 ' + (GY - 2) + ' Q175 ' + (GY - 8) + ' 350 ' + (GY - 3) + ' T700 ' + (GY - 5) + ' V' + H + ' H0 Z';
    var out = '<linearGradient id="' + c.id + 'gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + h.tint(L.ground, 0.06) + '"/><stop offset="1" stop-color="' + h.tint(L.ground, -0.14) + '"/></linearGradient>';
    out += h.p(d, 'url(#' + c.id + 'gr)');
    if (c.season !== 'winter') {
      for (var i = 0; i < 9; i++) {
        var gx = 30 + i * 80 + (i % 2) * 23, gy = GY + 10 + (i % 3) * 5;
        out += h.l('M' + gx + ' ' + gy + ' l-3 -8 M' + (gx + 4) + ' ' + gy + ' l1 -10 M' + (gx + 8) + ' ' + gy + ' l4 -7', L.grass, 1.6, { opacity: '.7' });
      }
    } else {
      out += h.p('M0 ' + (GY + 8) + ' Q200 ' + (GY + 2) + ' 420 ' + (GY + 10) + ' T700 ' + (GY + 6), 'none', { stroke: '#fff', 'stroke-width': '3', opacity: '.7' });
    }
    return out;
  }
  function flowers(L, xs) {
    if (!L.flower.length) return '';
    return xs.map(function (x, i) { var col = L.flower[i % L.flower.length], y = GY + 12 + (i % 3) * 4; return h.c(x, y, 3.6, col) + h.c(x, y, 1.4, '#b5772b'); }).join('');
  }

  /* ---------- the settings: each gives what is behind the parts (back) and, sometimes, what is in front (front) ---------- */
  var SETS = ART.sets;
  function outdoor(extra) {
    return function (c) {
      var L = LAND[c.season] || LAND.summer;
      var back = h.r(0, 0, W, H, 0, 'url(#' + c.id + 'sky)') + extra(c, L);
      return { defs: sky(c), back: back + groundFront(c, L) + (c.flowers === false ? '' : flowers(L, c.flowerX || [64, 318, 606, 640])) };
    };
  }
  SETS.meadow = outdoor(function (c, L) {
    return hills(c, 122, L.far, 22, 1) + farSpruces(c, 126, h.tint(L.tree, 0.2), [470, 488, 590, 606]) + hills(c, 160, L.mid, 16, 2) + leafy(620, 172, 0.9, L.leaf);
  });
  SETS.forest = outdoor(function (c, L) {
    return hills(c, 116, L.far, 18, 2) + farSpruces(c, 118, h.tint(L.tree, 0.25), [40, 58, 120, 300, 318, 470, 488, 560, 650, 668]) +
      hills(c, 156, L.mid, 14, 1) + spruce(60, 186, 1.35, L.tree) + spruce(140, 176, 0.95, h.tint(L.tree, 0.08)) + leafy(560, 186, 1.1, L.leaf) + spruce(650, 190, 1.5, L.tree);
  });
  SETS.den = outdoor(function (c, L) {
    var rock = '#8f8070';
    return hills(c, 118, L.far, 20, 3) + farSpruces(c, 120, h.tint(L.tree, 0.22), [380, 398, 455, 474, 610]) + hills(c, 158, L.mid, 12, 2) +
      spruce(642, 190, 1.45, L.tree) +
      h.p('M40 ' + GY + ' Q50 108 150 88 Q232 74 296 120 Q338 152 346 ' + GY + ' Z', rock) +
      h.p('M70 140 Q96 112 136 104 M226 96 Q262 104 288 126', 'none', { stroke: h.tint(rock, 0.3), 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.6' }) +
      h.p('M112 ' + GY + ' Q118 130 192 124 Q262 128 272 ' + GY + ' Z', '#2e2119') +
      (c.season === 'winter' ? h.p('M52 150 Q80 96 150 88 Q232 74 296 120 Q310 132 318 146 Q260 110 200 104 Q120 100 52 150 Z', '#f4f7fa') :
        h.p('M58 150 Q80 124 112 118 Q90 132 80 152 Z M230 88 Q270 92 300 120 Q268 104 236 100 Z', L.leaf, { opacity: '.8' }));
  });
  SETS.lake = outdoor(function (c, L) {
    var water = c.time === 'night' ? '#2c3d63' : c.time === 'dusk' ? '#9fb7c0' : c.season === 'winter' ? '#cfdde8' : '#6fa3c0';
    return hills(c, 110, L.far, 16, 1) + farSpruces(c, 114, h.tint(L.tree, 0.2), [30, 48, 66, 200, 218, 520, 538, 556, 640, 660]) +
      h.r(0, 128, W, 70, 0, water) + h.r(0, 128, W, 4, 0, h.tint(water, 0.25)) +
      h.l('M80 150 h60 M240 162 h90 M430 146 h70 M560 170 h80 M150 180 h50', h.tint(water, 0.35), 2, { opacity: '.7' }) +
      (c.season === 'winter' ? '' : h.l('M380 156 h40', '#fff', 1.5, { opacity: '.5' }));
  });
  SETS.shore = function (c) {
    var r = shoreBase(c);
    r.back = r.back.replace(/<linearGradient id="[^"]*gr"[\s\S]*$/, '') + h.p('M0 ' + (GY - 4) + ' Q240 ' + (GY - 10) + ' 460 ' + (GY - 2) + ' T700 ' + (GY - 6) + ' V' + H + ' H0 Z', '#dcc48f') +
      [60, 210, 380, 540, 650].map(function (x, i) { return h.e(x, GY + 12 + (i % 2) * 6, 5, 2.4, '#b9a173'); }).join('');
    return r;
  };
  var shoreBase = outdoor(function (c, L) {
    var sea = c.time === 'night' ? '#2c3d63' : '#5f9fbf';
    return h.r(0, 118, W, 60, 0, sea) + h.r(0, 118, W, 3, 0, h.tint(sea, 0.3)) + h.l('M40 140 q20 -6 40 0 M300 132 q20 -6 40 0 M520 150 q20 -6 40 0', '#fff', 2, { opacity: '.55' }) +
      h.p('M0 172 Q200 160 420 170 T700 164 V' + H + ' H0 Z', '#e6d3a4') + h.p('M0 178 Q240 170 460 178 T700 172', 'none', { stroke: '#fff', 'stroke-width': '4', opacity: '.6' });
  });
  SETS.snow = function (c) { c.season = 'winter'; return SETS.forest(c); };
  SETS.town = outdoor(function (c, L) {
    var cols = ['#c9845f', '#8fa9b9', '#d8b46a', '#b5776b', '#9fb38a', '#c7a07f'], out = hills(c, 118, L.far, 12, 2);
    for (var i = 0; i < 6; i++) {
      var x = i * 120 - 10, w = 104, top = 96 + (i % 3) * 12, col = cols[(i + (c.seed || 0)) % cols.length];
      out += h.r(x, top, w, GY - top, 3, col) + h.p('M' + (x - 6) + ' ' + top + ' L' + (x + w / 2) + ' ' + (top - 28) + ' L' + (x + w + 6) + ' ' + top + ' Z', h.tint(col, -0.35));
      out += h.r(x + 14, top + 18, 22, 22, 2, '#f3e8c8') + h.r(x + 66, top + 18, 22, 22, 2, '#f3e8c8') + h.r(x + 40, GY - 40, 24, 40, 2, h.tint(col, -0.3));
    }
    return out + h.r(0, GY - 10, W, 12, 0, '#b9b2a6');
  });
  SETS.farm = outdoor(function (c, L) {
    return hills(c, 120, L.far, 18, 1) + hills(c, 156, L.mid, 12, 3) +
      h.r(430, 98, 150, 104, 3, '#b2493a') + h.p('M420 100 L505 54 L590 100 Z', '#7d2f27') + h.r(486, 140, 38, 62, 2, '#7d2f27') + h.l('M486 140 l38 62 M524 140 l-38 62', '#f2e6d0', 3) +
      h.r(450, 112, 22, 18, 2, '#f2e6d0') + h.r(538, 112, 22, 18, 2, '#f2e6d0') +
      h.l('M0 186 H700 M0 172 H700', '#e8dcc4', 3) + [20, 100, 180, 260, 340, 620, 690].map(function (x) { return h.r(x, 164, 6, 34, 1, '#e8dcc4'); }).join('');
  });
  SETS.yard = outdoor(function (c, L) {
    var out = hills(c, 120, L.far, 14, 2) + h.r(380, 70, 300, 134, 3, '#e6d6b8') + h.p('M366 74 L530 18 L694 74 Z', '#7c5a48') +
      h.r(420, 102, 44, 40, 3, '#f5ecd0') + h.r(560, 102, 44, 40, 3, '#f5ecd0') + h.r(486, 132, 40, 72, 3, '#5d7f8c') + h.c(518, 170, 2.5, '#e8c76a');
    for (var x = 0; x < 380; x += 26) out += h.p('M' + x + ' 204 V164 l9 -10 l9 10 V204 Z', '#f1ebdf');
    return out + h.r(0, 176, 380, 6, 0, '#e2d9c8');
  });
  SETS.park = outdoor(function (c, L) {
    return hills(c, 118, L.far, 16, 3) + leafy(90, 176, 1.25, L.leaf) + leafy(600, 178, 1.15, L.leaf) + hills(c, 166, L.mid, 8, 1) +
      h.p('M250 ' + H + ' Q330 190 470 178 L520 178 Q400 196 360 ' + H + ' Z', '#d9c9a3', { opacity: '.9' });
  });
  function indoor(wall, floor, extra) {
    return function (c) {
      var view = (SKY[c.time] || SKY.day)[1];
      var back = h.r(0, 0, W, H, 0, wall) + h.r(0, 0, W, 8, 0, h.tint(wall, -0.08)) +
        h.r(0, GY - 6, W, H - GY + 6, 0, floor) + h.r(0, GY - 8, W, 4, 0, h.tint(floor, -0.25)) + extra(c, view);
      return { defs: '', back: back };
    };
  }
  function windowAt(x, y, w, hh, view, c) {
    var L = LAND[c.season] || LAND.summer;
    return h.r(x - 6, y - 6, w + 12, hh + 12, 4, '#f4efe6') + h.r(x, y, w, hh, 2, view) + h.p('M' + x + ' ' + (y + hh) + ' Q' + (x + w / 2) + ' ' + (y + hh - 26) + ' ' + (x + w) + ' ' + (y + hh) + ' Z', L.mid) +
      (c.time === 'night' ? h.c(x + w * 0.7, y + 18, 7, '#f5ecc8') : h.c(x + w * 0.72, y + 20, 8, '#fff2c6')) +
      h.r(x + w / 2 - 2, y, 4, hh, 0, '#f4efe6') + h.r(x, y + hh / 2 - 2, w, 4, 0, '#f4efe6') + h.r(x - 10, y + hh + 6, w + 20, 6, 2, '#e3d8c6');
  }
  SETS.kitchen = indoor('#efe2c9', '#c79a6b', function (c, view) {
    return windowAt(300, 34, 110, 80, view, c) + h.r(0, 134, 250, 72, 3, '#7f9fa8') + h.r(0, 128, 256, 8, 2, '#e9e1d2') + h.r(16, 146, 100, 50, 3, h.tint('#7f9fa8', -0.12)) + h.r(130, 146, 100, 50, 3, h.tint('#7f9fa8', -0.12)) +
      h.c(66, 170, 3, '#d9c27a') + h.c(180, 170, 3, '#d9c27a') + h.r(30, 40, 180, 50, 3, '#d8c4a4') + h.r(36, 46, 80, 38, 2, h.tint('#d8c4a4', -0.1)) + h.r(124, 46, 80, 38, 2, h.tint('#d8c4a4', -0.1));
  });
  SETS.bedroom = indoor('#dfe6ea', '#b88d63', function (c, view) {
    return windowAt(470, 30, 120, 86, view, c) + h.e(300, 216, 150, 14, '#c9767a', { opacity: '.55' }) + h.r(40, 60, 60, 70, 4, '#f3eadb') + h.r(46, 66, 48, 58, 3, '#c9b48e') +
      h.r(620, 92, 60, 112, 3, '#9a7656') + h.r(626, 98, 48, 30, 2, h.tint('#9a7656', -0.15)) + h.r(626, 134, 48, 30, 2, h.tint('#9a7656', -0.15)) + h.r(626, 170, 48, 30, 2, h.tint('#9a7656', -0.15));
  });
  SETS.classroom = indoor('#e9e4d4', '#a9895f', function (c, view) {
    return h.r(60, 30, 300, 110, 4, '#3f5a4e') + h.r(54, 24, 312, 122, 6, 'none', { stroke: '#a8865d', 'stroke-width': '6' }) +
      h.l('M90 60 h70 M90 80 h120 M90 100 h90', '#e9efe9', 3, { opacity: '.8' }) + windowAt(470, 32, 120, 86, view, c) +
      h.r(400, 150, 40, 10, 2, '#c69a5c') + h.r(404, 160, 4, 46, 1, '#6d5a43') + h.r(432, 160, 4, 46, 1, '#6d5a43');
  });
  SETS.shop = indoor('#f1e7d3', '#b6a184', function (c, view) {
    var out = '';
    [36, 82].forEach(function (y) {
      out += h.r(20, y + 30, 420, 6, 1, '#9a7656');
      for (var i = 0; i < 12; i++) out += h.r(30 + i * 34, y + (i % 3) * 3, 24, 30 - (i % 3) * 3, 3, ['#d9774b', '#e2b84f', '#7aa5c4', '#8fb36a', '#c96a7a'][(i + y) % 5]);
    });
    return out + windowAt(500, 30, 130, 90, view, c) + h.r(0, 150, 700, 8, 0, '#9a7656');
  });

  /* ---------- the sky parts ---------- */
  var P = ART.parts;
  P.sun = function (o, c) {
    var col = c.time === 'dusk' ? '#ffe2a6' : '#fff1bf';
    return '<radialGradient id="' + c.id + 'glow' + o.i + '"><stop offset="0" stop-color="' + col + '" stop-opacity=".9"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></radialGradient>' +
      h.c(0, 0, 70, 'url(#' + c.id + 'glow' + o.i + ')') + h.c(0, 0, 21, c.time === 'dusk' ? '#ffd88f' : '#fff4cf');
  };
  P.moon = function () { return h.c(0, 0, 40, '#fdf6d8', { opacity: '.12' }) + h.c(0, 0, 18, '#f7eecb') + h.c(7, -4, 16, '#2b3a66', { opacity: '.0' }) + h.c(-5, -4, 3, '#e6dcb4') + h.c(4, 5, 2.4, '#e6dcb4'); };
  P.star = function () { return h.p('M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z', '#fff6cf'); };
  P.stars = function () {
    var out = '';
    for (var i = 0; i < 26; i++) out += h.c((i * 97) % 680 - 340, (i * 53) % 90 - 40, 0.8 + (i % 3) * 0.5, '#fff8dc', { opacity: String(0.5 + (i % 4) * 0.12) });
    return out;
  };
  P.cloud = function (o, c) {
    var col = c.time === 'night' ? '#55628a' : c.time === 'grey' ? '#c3cad0' : c.time === 'dusk' ? '#fbe9d2' : '#ffffff';
    return h.e(0, 6, 46, 10, h.tint(col, -0.06)) + h.c(-22, 0, 16, col) + h.c(0, -10, 22, col) + h.c(24, -2, 17, col) + h.e(-4, -14, 14, 6, '#fff', { opacity: '.5' });
  };
  P.bird = function () { return h.l('M-9 0 Q-4 -6 0 0 Q4 -6 9 0', '#4a4a4a', 2); };
  P.birds = function () { return [[-30, 6], [0, 0], [26, 10]].map(function (b) { return h.g(P.bird(), 'translate(' + b[0] + ' ' + b[1] + ') scale(' + (1 - Math.abs(b[0]) / 100) + ')'); }).join(''); };
  P.plane = function () { return h.e(0, 0, 30, 6, '#f2f4f6') + h.p('M-4 0 L-14 18 L-6 18 L8 0 Z M-4 0 L-14 -14 L-6 -14 L8 0 Z', '#c9d3dc') + h.p('M-26 -1 L-32 -12 L-24 -12 L-18 -2 Z', '#d9774b') + h.r(6, -3, 14, 3, 1.5, '#7aa5c4'); };
  P.kite = function () { return h.p('M0 -24 L16 0 L0 26 L-16 0 Z', '#d9774b') + h.p('M0 -24 L16 0 L0 0 Z', '#e9a46b') + h.l('M0 26 Q10 46 -4 62 Q-14 76 2 92', '#5a4a3a', 1.2); };
  P.rainfall = function () { var out = ''; for (var i = 0; i < 40; i++) out += h.l('M' + ((i * 71) % 700 - 350) + ' ' + ((i * 37) % 160 - 20) + ' l-3 9', '#7d98b3', 1.4, { opacity: '.7' }); return out; };
  P.snowfall = function () { var out = ''; for (var i = 0; i < 50; i++) out += h.c((i * 71) % 700 - 350, (i * 41) % 190 - 20, 1.4 + (i % 3) * 0.6, '#fff', { opacity: '.9' }); return out; };
  P.aurora = function () { return h.p('M-260 20 Q-150 -40 -40 10 T180 0 T300 -10 V30 Q160 30 60 40 T-260 50 Z', '#8fe3b8', { opacity: '.35' }) + h.p('M-200 10 Q-100 -30 0 0 T220 -6 V14 Q100 20 0 24 T-200 30 Z', '#b9f0d2', { opacity: '.3' }); };

  /* ---------- people: a child (kid) or a grown-up (adult), with skin, hair and clothes ---------- */
  var SKIN = ART.skin = ['#f3d5bd', '#e8bb93', '#d09a6e', '#ae7650', '#8a5636', '#6a3f27'];
  var HAIR = ART.hair = { black: '#231812', brown: '#5b3a24', auburn: '#8a3f22', blond: '#d6aa5a', grey: '#b9b4ad', red: '#b3542b' };
  function person(o, adult) {
    var sk = typeof o.skin === 'string' ? o.skin : SKIN[(o.skin || 0) % SKIN.length];
    var hair = HAIR[o.hairc] || o.hairc || HAIR.black, top = o.top || '#d9774b', bot = o.bottom || '#4f6d8a', shoe = o.shoes || '#3b2f2a';
    var leg = adult ? 50 : 30, torso = adult ? 46 : 34, hr = adult ? 14.5 : 16;
    var hip = -leg, sh = hip - torso, hy = sh - hr + 3;
    var out = h.shadow(adult ? 46 : 38);
    /* long hair and braids hang behind the body */
    if (o.hair === 'long') out += h.p('M' + (-hr - 1) + ' ' + hy + ' Q' + (-hr - 3) + ' ' + (hy + hr + 16) + ' ' + (-hr + 2) + ' ' + (hy + hr + 20) + ' H' + (hr - 2) + ' Q' + (hr + 3) + ' ' + (hy + hr + 16) + ' ' + (hr + 1) + ' ' + hy + ' Z', hair);
    if (o.hair === 'braids') out += h.r(-hr - 2, hy + 2, 6, hr + 20, 3, hair) + h.r(hr - 4, hy + 2, 6, hr + 20, 3, hair) + h.c(-hr + 1, hy + hr + 22, 3, o.ties || '#c0573e') + h.c(hr - 1, hy + hr + 22, 3, o.ties || '#c0573e');
    /* legs (a skirt or dress if asked) */
    out += h.r(-11, hip, 9, leg - 3, 4, bot) + h.r(2, hip, 9, leg - 3, 4, h.tint(bot, -0.08));
    out += h.e(-7, -3, 7, 4, shoe) + h.e(7, -3, 7, 4, shoe);
    if (o.dress) out += h.p('M-14 ' + (sh + 4) + ' L-20 ' + (hip + 10) + ' Q0 ' + (hip + 16) + ' 20 ' + (hip + 10) + ' L14 ' + (sh + 4) + ' Z', top);
    /* body */
    out += h.p('M-15 ' + (sh + 6) + ' Q-15 ' + sh + ' -8 ' + sh + ' H8 Q15 ' + sh + ' 15 ' + (sh + 6) + ' V' + (hip + 2) + ' H-15 Z', top);
    out += h.p('M4 ' + sh + ' H8 Q15 ' + sh + ' 15 ' + (sh + 6) + ' V' + (hip + 2) + ' H6 Z', h.tint(top, -0.12));
    if (o.coat) out += h.r(-16, sh + 2, 32, torso + 8, 6, o.coat) + h.l('M0 ' + (sh + 4) + ' V' + (hip + 8), h.tint(o.coat, -0.25), 1.4);
    /* arms: down, or one up to wave, or both forward to hold */
    var arm = o.coat || top;
    if (o.pose === 'wave') out += h.l('M-13 ' + (sh + 5) + ' Q-20 ' + (sh + 18) + ' -16 ' + (hip + 2), arm, 7) + h.c(-16, hip + 4, 4, sk) + h.l('M13 ' + (sh + 5) + ' Q24 ' + (sh - 4) + ' 22 ' + (sh - 20), arm, 7) + h.c(22, sh - 23, 4.5, sk);
    else if (o.pose === 'hold') out += h.l('M-13 ' + (sh + 5) + ' Q-12 ' + (sh + 20) + ' 4 ' + (sh + 22), arm, 7) + h.l('M13 ' + (sh + 5) + ' Q20 ' + (sh + 18) + ' 14 ' + (sh + 24), arm, 7) + h.c(8, sh + 22, 4.2, sk);
    else out += h.l('M-13 ' + (sh + 5) + ' Q-19 ' + (sh + 18) + ' -17 ' + (hip + 2), arm, 7) + h.c(-17, hip + 4, 4, sk) + h.l('M13 ' + (sh + 5) + ' Q19 ' + (sh + 18) + ' 17 ' + (hip + 2), arm, 7) + h.c(17, hip + 4, 4, sk);
    /* head */
    var head = '';
    if (o.hair === 'puffs') head += h.c(-hr + 1, hy - hr + 2, 9, hair) + h.c(hr - 1, hy - hr + 2, 9, hair);
    if (o.hair === 'bun') head += h.c(0, hy - hr - 4, 8, hair);
    if (o.hair === 'scarf') head += h.p('M' + (-hr - 3) + ' ' + (hy + 2) + ' Q' + (-hr - 4) + ' ' + (hy - hr - 6) + ' 0 ' + (hy - hr - 6) + ' Q' + (hr + 4) + ' ' + (hy - hr - 6) + ' ' + (hr + 3) + ' ' + (hy + 2) + ' Q' + (hr + 4) + ' ' + (hy + hr + 6) + ' ' + (hr - 2) + ' ' + (hy + hr + 12) + ' H' + (-hr + 2) + ' Q' + (-hr - 4) + ' ' + (hy + hr + 6) + ' ' + (-hr - 3) + ' ' + (hy + 2) + ' Z', o.scarf || '#7a5c8c');
    head += h.c(-hr + 1, hy + 2, 3.4, h.tint(sk, -0.08)) + h.c(hr - 1, hy + 2, 3.4, h.tint(sk, -0.08));
    head += h.c(0, hy, hr - 1, sk);
    if (o.hair !== 'scarf' && o.hair !== 'bald') {
      var cap = o.hair === 'curly' ? h.c(-9, hy - 9, 8, hair) + h.c(0, hy - 13, 9, hair) + h.c(9, hy - 9, 8, hair) + h.c(-13, hy - 2, 5, hair) + h.c(13, hy - 2, 5, hair)
        : h.p('M' + (-hr + 0.5) + ' ' + (hy + 1) + ' Q' + (-hr) + ' ' + (hy - hr - 2) + ' 0 ' + (hy - hr - 1) + ' Q' + hr + ' ' + (hy - hr - 2) + ' ' + (hr - 0.5) + ' ' + (hy + 1) + ' Q' + (hr * 0.4) + ' ' + (hy - hr * 0.5) + ' ' + (-hr * 0.2) + ' ' + (hy - hr * 0.45) + ' Q' + (-hr * 0.7) + ' ' + (hy - hr * 0.3) + ' ' + (-hr + 0.5) + ' ' + (hy + 1) + ' Z', hair);
      head += cap;
    }
    if (o.hat === 'toque') head += h.p('M' + (-hr) + ' ' + (hy - 3) + ' Q' + (-hr) + ' ' + (hy - hr - 8) + ' 0 ' + (hy - hr - 8) + ' Q' + hr + ' ' + (hy - hr - 8) + ' ' + hr + ' ' + (hy - 3) + ' Z', o.hatc || '#c0573e') + h.r(-hr - 1, hy - 6, 2 * hr + 2, 6, 3, h.tint(o.hatc || '#c0573e', 0.3)) + h.c(0, hy - hr - 9, 4.5, '#f4efe6');
    if (o.hat === 'cap') head += h.p('M' + (-hr) + ' ' + (hy - 3) + ' Q' + (-hr) + ' ' + (hy - hr - 4) + ' 0 ' + (hy - hr - 4) + ' Q' + hr + ' ' + (hy - hr - 4) + ' ' + hr + ' ' + (hy - 3) + ' Z', o.hatc || '#4f6d8a') + h.p('M' + (hr - 4) + ' ' + (hy - 4) + ' h' + (hr * 0.9) + ' q2 3 -2 4 h-' + (hr * 0.9) + ' Z', h.tint(o.hatc || '#4f6d8a', -0.2));
    if (o.beard) head += h.p('M' + (-hr + 2) + ' ' + (hy + 3) + ' Q' + (-hr + 2) + ' ' + (hy + hr + 4) + ' 0 ' + (hy + hr + 5) + ' Q' + (hr - 2) + ' ' + (hy + hr + 4) + ' ' + (hr - 2) + ' ' + (hy + 3) + ' Q' + (hr * 0.4) + ' ' + (hy + 8) + ' 1 ' + (hy + 7) + ' Q' + (-hr * 0.4) + ' ' + (hy + 8) + ' ' + (-hr + 2) + ' ' + (hy + 3) + ' Z', hair);
    if (o.glasses) head += h.c(-5.5, hy + 1, 4.2, 'none', { stroke: '#3b2f2a', 'stroke-width': '1.3' }) + h.c(5.5, hy + 1, 4.2, 'none', { stroke: '#3b2f2a', 'stroke-width': '1.3' }) + h.l('M-1.3 ' + (hy + 1) + ' h2.6', '#3b2f2a', 1.3);
    /* face: looking to its right (the scene's right unless flipped) */
    head += h.eye(-4, hy + 1, 1.9 * (adult ? 0.95 : 1.05)) + h.eye(6, hy + 1, 1.9 * (adult ? 0.95 : 1.05));
    head += h.c(-8, hy + 6, 2.6, '#e88b7a', { opacity: '.35' }) + h.c(10, hy + 6, 2.6, '#e88b7a', { opacity: '.35' });
    head += o.mood === 'sad' ? h.l('M-1 ' + (hy + 10) + ' q3 -3 6 0', h.tint(sk, -0.5), 1.4) : o.mood === 'oh' ? h.e(2.5, hy + 9, 1.8, 2.2, h.tint(sk, -0.55)) : h.l('M-1 ' + (hy + 8) + ' q3.5 3 7 0', h.tint(sk, -0.5), 1.4);
    out += head;
    return out;
  }
  P.kid = function (o) { return person(o, false); };
  P.adult = function (o) { return person(o, true); };
  P.baby = function (o) { return h.g(person(Object.assign({ hair: 'short' }, o), false), 'scale(.62)'); };

  /* ---------- two animals and a bug from the sample page (more parts are added by artbank files) ---------- */
  function bearBody(fur, s) {
    var dk = h.tint(fur, -0.22), lt = h.tint(fur, 0.25), mz = '#d7b48a';
    return h.shadow(96) +
      h.r(-40, -34, 16, 34, 8, dk) + h.r(-22, -30, 16, 30, 8, fur) + h.r(14, -34, 16, 34, 8, dk) + h.r(30, -30, 16, 30, 8, fur) +
      h.p('M-48 -24 Q-54 -66 -14 -74 Q26 -80 44 -58 Q56 -44 50 -22 Q20 -12 -48 -24 Z', fur) +
      h.p('M-34 -62 Q-8 -72 18 -70', 'none', { stroke: lt, 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.55' }) +
      h.c(-52, -50, 7, dk) +
      h.c(56, -76, 27, fur) + h.c(40, -98, 10, dk) + h.c(40, -98, 5, lt) + h.c(70, -98, 10, dk) + h.c(70, -98, 5, lt) +
      h.e(74, -66, 14, 11, mz) + h.e(84, -71, 5, 4, '#2b1a10') + h.eye(52, -80, 3.2) + h.eye(68, -82, 3.2) + h.l('M72 -58 q5 3 10 -1', dk, 1.6);
  }
  P.bear = function (o) { return bearBody(o.fur || '#5e3d26') + (o.asleep ? h.r(44, -88, 34, 12, 4, o.fur || '#5e3d26') + h.l('M46 -82 q4 3 8 0 M62 -84 q4 3 8 0', '#2b1a10', 1.8) : ''); };
  P.cub = function (o) { return h.g(P.bear(Object.assign({ fur: '#7a4f31' }, o)), 'scale(.62)'); };
  P.bug = function (o) {
    var sh = o.colour || '#2f8f7c';
    return h.shadow(26) + h.l('M-8 -6 l-8 6 M-6 -2 l-9 8 M8 -6 l8 6 M7 -2 l9 8 M-12 -20 q-6 -10 -2 -16 M-4 -22 q2 -11 8 -14', '#1b2b28', 2) +
      h.e(0, -10, 15, 12, sh) + h.e(0, -10, 15, 12, '#000', { opacity: '.0' }) + h.l('M0 -22 V2', h.tint(sh, -0.45), 1.4) +
      h.e(-10, -23, 8, 6, h.tint(sh, -0.55)) + h.e(-5, -16, 5, 3, '#ffffff', { opacity: '.5' });
  };

  /* ---------- the scene ---------- */
  D.paint = function (sc) {
    n += 1;
    var c = { id: 'da' + n + '-', time: sc.time || 'day', season: sc.season || (sc.set === 'snow' ? 'winter' : 'summer'), seed: sc.seed || 0, flowers: sc.flowers, flowerX: sc.flowerX };
    var set = (SETS[sc.set] || SETS.meadow)(c), defs = set.defs || '', body = set.back;
    /* night: the land is dimmed before the parts go on, the parts a little (so lit windows and fires still glow) */
    if (c.time === 'night') body += h.r(0, 0, W, H, 0, '#141c38', { opacity: '.24' });
    (sc.items || []).forEach(function (it, i) {
      var name = it[0], x = it[1], o = Object.assign({ i: i }, it[2] || {}), part = P[name];
      if (!part) return;
      var s = o.s || 1, inner = part(o, c);
      var sky = ART.sky.indexOf(name) >= 0, y = sky ? (o.y === undefined ? 50 : o.y) : GY - (o.y || 0);
      body += h.g(inner, 'translate(' + num(x) + ' ' + num(y) + ') scale(' + (o.flip ? -s : s) + ' ' + s + ')');
    });
    if (set.front) body += set.front;
    return '<svg class="dc-art dc-colour" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs>' + defs + '<clipPath id="' + c.id + 'f"><rect width="' + W + '" height="' + H + '" rx="14"/></clipPath></defs><g clip-path="url(#' + c.id + 'f)">' + body + '</g></svg>';
  };
})();
