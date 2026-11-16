/* Decodable readers: the picture kit's parts (animals, home things, places and vehicles, wild animals and nature), added to
   Atlas.decodable.art.parts after decodeart.js. Each part faces right with its base centre at 0,0; see decodeart.js for the scene format. */
/* Decodable pictures: farm and pet animals (cat, kitten, dog, pup, fox, pig, hen, chick, duck, goat, rabbit, frog, fish, mouse, yak, ox, ram, horse).
   Each faces right with the middle of its feet at 0,0. Options: colour (the main coat), asleep (where easy), and a few of each animal's own. */
(function () {
  var D = Atlas.decodable, h = D.art.h, P = D.art.parts;
  var T = h.tint, CREAM = '#f3e8d6', NOSE = '#2b1a10', PINK = '#e3a29b', HOOF = '#3a2c24', HORN = '#e2d4b8';
  function grow(inner, x, y, k) { return k === 1 ? inner : h.g(inner, 'translate(' + x + ' ' + y + ') scale(' + k + ') translate(' + (-x) + ' ' + (-y) + ')'); }
  function shut(x, y, w, col) { return h.l('M' + (x - w) + ' ' + y + ' q' + w + ' ' + (w * 0.8) + ' ' + (2 * w) + ' 0', col, 1.2); }
  /* a soft, uneven patch of colour centred on x, y */
  function blob(x, y, rx, ry, col) { return h.p('M' + (x - rx) + ' ' + y + ' Q' + (x - rx) + ' ' + (y - ry) + ' ' + (x - rx * 0.2) + ' ' + (y - ry * 0.9) + ' Q' + (x + rx * 0.5) + ' ' + (y - ry * 1.2) + ' ' + (x + rx) + ' ' + (y - ry * 0.3) + ' Q' + (x + rx * 1.1) + ' ' + (y + ry * 0.8) + ' ' + (x + rx * 0.2) + ' ' + (y + ry) + ' Q' + (x - rx * 0.9) + ' ' + (y + ry * 1.1) + ' ' + (x - rx) + ' ' + y + ' Z', col); }
  function iris(x, y, r, col) { return h.c(x, y, r * 1.35, col) + h.eye(x + r * 0.1, y, r); }
  /* a hoofed leg: wide at the top, a knee, narrow at the hoof; sock: a white lower leg */
  function limb(x, top, w, col, sock) {
    var k = top * 0.42, n = w * 0.16;
    return h.p('M' + x + ' ' + top + ' H' + (x + w) + ' L' + (x + w - n) + ' ' + k + ' Q' + (x + w - n * 0.4) + ' ' + (k + 4) + ' ' + (x + w - n * 1.5) + ' ' + (k + 8) + ' L' + (x + w - n * 1.5) + ' -4 H' + (x + n * 1.5) + ' L' + (x + n * 1.2) + ' ' + k + ' Z', col) +
      (sock ? h.r(x + n * 1.3, -13, w - n * 2.8, 10, 2, '#f1ebe0') : '') + h.r(x + n, -5.5, w - n * 1.8, 5.5, 1.6, HOOF);
  }

  /* ---------- cat and kitten ---------- */
  function cat(o, k) {
    var col = o.colour || '#d48c52', dk = T(col, -0.24), lt = T(col, 0.3), tabby = o.stripes !== false, out = '';
    if (o.asleep) {
      out += h.shadow(50) + h.e(-2, -11, 22, 11, col) + h.l('M-18 -18 Q-6 -23 8 -20', lt, 2.4, { opacity: '.6' }) +
        (tabby ? h.l('M-14 -21 q2 4 0 8 M-7 -22 q2 4 0 8 M0 -22 q2 4 0 8', dk, 1.8, { opacity: '.6' }) : '') +
        h.l('M-22 -6 Q-12 2 6 -1 Q16 -2 20 -6', col, 5.5) + h.l('M14 -4 Q18 -5 20 -6', dk, 5.5) +
        grow(h.p('M8 -20 L9 -29 L14 -22 Z M16 -22 L22 -28 L22 -18 Z', col) + h.p('M9.5 -22 L10 -26.5 L13 -22.5 Z', PINK) + h.c(15, -15, 8.5, col) + h.e(18, -12, 5, 3.2, CREAM) +
          shut(12, -16, 2, dk) + shut(19, -16.5, 2, dk) + h.p('M19.6 -14 l2.6 0 l-1.3 1.6 Z', '#c7746e'), 15, -15, k);
      return out;
    }
    out += h.shadow(46);
    out += h.l('M-19 -20 Q-31 -19 -31 -31 Q-31 -40 -25 -43', col, 5) + h.l('M-29 -37 Q-29 -41 -25 -43', dk, 5);
    out += h.r(-17, -17, 5, 17, 2.5, dk) + h.r(8, -17, 5, 17, 2.5, dk);
    out += h.p('M-22 -20 Q-23 -31 -10 -31 Q6 -32 15 -30 Q22 -27 20 -16 Q8 -11 -6 -12 Q-20 -12 -22 -20 Z', col);
    out += h.p('M-18 -14 Q-2 -10 18 -17 Q14 -11 -4 -11 Q-14 -11 -18 -14 Z', CREAM, { opacity: '.85' });
    out += h.l('M-17 -28 Q-3 -32 11 -30', lt, 2.2, { opacity: '.6' });
    if (tabby) out += h.l('M-14 -30 q2 5 0 9 M-7 -31 q2 5 0 9 M0 -31 q2 5 0 8 M-20 -22 q4 0 6 3', dk, 1.8, { opacity: '.55' });
    out += h.r(-13, -17, 5.5, 17, 2.7, col) + h.r(12, -18, 5.5, 18, 2.7, col) + h.e(-10, -1.4, 4, 1.8, lt) + h.e(15, -1.4, 4, 1.8, lt);
    var head = h.p('M10 -36 L11 -47 L18 -40 Z', col) + h.p('M20 -40 L27 -47 L28 -35 Z', dk) + h.p('M11.8 -38.5 L12.3 -44.5 L16.3 -40 Z', PINK) +
      h.c(19, -33, 9.5, col) + h.e(21.5, -27.6, 6.5, 4.6, CREAM) + h.c(12, -29, 3.6, lt, { opacity: '.5' }) +
      (tabby ? h.l('M17 -42 v3 M20.5 -42.4 v3.4 M13 -32 h-3 M13 -29.5 h-3', dk, 1.2, { opacity: '.6' }) : '') +
      iris(15.8, -34.5, 1.6, '#a6b24a') + iris(23.6, -34.5, 1.6, '#a6b24a') +
      h.p('M20.4 -31 l3 0 l-1.5 1.8 Z', '#c7746e') + h.l('M21.9 -29.2 q-1.4 1.9 -3 0.9 M21.9 -29.2 q1.4 1.9 3 0.9', dk, 0.8) +
      h.l('M26 -29 h8 M26 -28 l7 2.4', '#fbf6ee', 0.6, { opacity: '.9' });
    return out + grow(head, 19, -31, k);
  }
  P.cat = function (o) { return cat(o, 1); };
  P.kitten = function (o) { return h.g(cat(Object.assign({ colour: '#a39a90' }, o), 1.3), 'scale(.6)'); };

  /* ---------- dog and pup ---------- */
  function dog(o, k) {
    var col = o.colour || '#b97a43', dk = T(col, -0.24), lt = T(col, 0.28), chest = o.chest || CREAM, ear = o.ear || T(col, -0.3), out = '';
    if (o.asleep) {
      out += h.shadow(72) + h.l('M-28 -6 Q-40 -2 -34 2 Q-20 4 -8 2', col, 5.5) + h.l('M-30 0.4 Q-22 3 -14 2.6', lt, 5.5) +
        h.p('M-30 -12 Q-30 -28 -10 -28 Q14 -29 22 -16 Q24 -2 12 0 L-22 0 Q-30 -2 -30 -12 Z', col) +
        h.e(-16, -11, 11, 10, T(col, -0.08)) + h.p('M-24 -24 Q-6 -30 12 -25', 'none', { stroke: lt, 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.55' }) +
        (o.spot ? blob(-2, -19, 9, 6, o.spot === true ? dk : o.spot) : '') +
        h.e(30, -2.6, 11, 3.2, lt) + h.e(28, -5, 9, 3, col) +
        grow(h.c(22, -14, 10, col) + h.p('M26 -18 Q38 -17 39 -10 Q37 -6 26 -7 Z', col) + h.e(32, -8, 6, 2.8, chest) + h.e(38.8, -13, 2.4, 2, NOSE) +
          h.p('M15 -22 Q11 -20 11 -12 Q12 -4 17 -4 Q21 -8 21 -18 Z', ear) + shut(24.5, -16, 2.4, NOSE), 22, -12, k);
      return out;
    }
    out += h.shadow(64);
    out += h.l('M-27 -42 Q-36 -46 -37 -58', col, 6) + h.l('M-36 -54 L-37 -58', lt, 6);
    out += h.r(-25, -30, 7, 30, 3.5, dk) + h.r(11, -30, 7, 30, 3.5, dk);
    out += h.p('M-30 -38 Q-30 -50 -16 -50 L12 -50 Q26 -50 28 -38 Q28 -26 18 -24 L-20 -24 Q-30 -26 -30 -38 Z', col);
    out += h.p('M-18 -25 Q0 -21 18 -26 Q20 -29 14 -29 Q0 -27 -18 -29 Z', lt, { opacity: '.8' });
    out += h.p('M-24 -47 Q-4 -52 16 -49', 'none', { stroke: lt, 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.5' });
    if (o.spot) out += blob(-8, -42, 10, 6.5, o.spot === true ? dk : o.spot);
    out += h.r(-20, -30, 7.5, 30, 3.7, col) + h.r(17, -30, 7.5, 30, 3.7, col) + h.e(-16, -1.6, 5, 2.2, lt) + h.e(21, -1.6, 5, 2.2, lt);
    var head = h.p('M12 -48 L26 -64 L38 -54 L28 -36 Z', col) + h.p('M21 -50 Q32 -48 31 -37 Q28 -30 21 -32 Q24 -40 21 -50 Z', chest) +
      (o.collar ? h.l('M21 -51 L31 -45', o.collar, 3.4) + h.c(28, -43, 2, '#e2b84f') : '') +
      h.c(31, -60, 10.5, col) + h.p('M35 -65 Q48 -63 48 -55 Q46 -50 36 -51 Z', col) + h.e(41, -52.5, 6.5, 3.6, chest) +
      h.e(47.5, -59.6, 2.8, 2.3, NOSE) + h.c(47, -60.3, 0.8, '#fff', { opacity: '.5' }) + h.l('M38 -51 q4 2.4 9 -0.6', dk, 1.2) +
      h.eye(35.5, -63, 2.2) + h.l('M33 -67 q2.5 -1.5 5 0', dk, 1, { opacity: '.6' }) +
      h.p('M25 -69 Q20 -68 19 -60 Q18 -50 23 -47 Q28 -51 30 -63 Z', ear);
    return out + grow(head, 31, -56, k);
  }
  P.dog = function (o) { return dog(o, 1); };
  P.pup = function (o) { return h.g(dog(Object.assign({ colour: '#d6ad78' }, o), 1.3), 'scale(.55)'); };

  /* ---------- fox ---------- */
  P.fox = function (o) {
    var col = o.colour || '#c8642e', dk = T(col, -0.22), lt = T(col, 0.25), sock = '#3b2a20', wh = '#f4ede2', out = '';
    if (o.asleep) {
      return h.shadow(56) + h.e(0, -10, 22, 10, col) + h.l('M-18 -16 Q-6 -22 10 -19', lt, 2.6, { opacity: '.6' }) +
        h.p('M-20 -4 Q-18 6 4 3 Q22 0 26 -8 Q14 -4 -2 -3 Q-14 -2 -20 -4 Z', col) + h.p('M14 -3 Q22 -2 26 -8 Q20 -2 12 0 Z', wh) +
        h.c(14, -14, 8, col) + h.p('M8 -18 L9 -28 L14 -20 Z M14 -20 L19 -28 L20 -18 Z', col) + h.p('M8.7 -24 L9 -28 L11 -25 Z M17 -25 L19 -28 L19.4 -24 Z', sock) +
        h.p('M14 -12 Q20 -12 26 -9 Q20 -6 14 -8 Z', wh) + shut(13, -15, 2, sock) + h.c(26, -9.4, 1.4, sock);
    }
    out += h.shadow(70);
    out += h.p('M-22 -32 Q-40 -38 -54 -26 Q-62 -16 -56 -12 Q-44 -12 -24 -24 Z', col) + h.p('M-50 -28 Q-46 -22 -40 -22', 'none', { stroke: dk, 'stroke-width': '2', opacity: '.5', 'stroke-linecap': 'round' }) +
      h.p('M-54 -26 Q-62 -16 -56 -12 Q-50 -12 -46 -15 Q-52 -18 -54 -26 Z', wh);
    out += h.r(-22, -26, 6, 26, 3, T(sock, 0.1)) + h.r(10, -26, 6, 26, 3, T(sock, 0.1));
    out += h.p('M-26 -30 Q-26 -40 -12 -40 L10 -41 Q22 -41 24 -32 Q24 -22 14 -21 L-18 -21 Q-26 -22 -26 -30 Z', col);
    out += h.l('M-20 -38 Q-4 -42 12 -40', lt, 2.6, { opacity: '.55' }) + h.p('M-16 -22 Q0 -19 14 -22 Q8 -20 -4 -20 Z', wh, { opacity: '.6' });
    out += h.p('M14 -38 Q26 -36 26 -24 Q20 -22 16 -24 Z', wh);
    out += h.r(-16, -27, 6.5, 27, 3.2, col) + h.r(-16, -13, 6.5, 13, 3.2, sock) + h.r(16, -27, 6.5, 27, 3.2, col) + h.r(16, -13, 6.5, 13, 3.2, sock);
    out += h.p('M16 -38 L26 -48 L34 -44 L24 -30 Z', col);
    out += h.p('M26 -51 L31 -63 L35 -50 Z', dk) + h.p('M20 -50 L22 -63 L29 -52 Z', col) + h.p('M21.5 -56 L22 -63 L25 -57.5 Z', sock) +
      h.c(28, -45, 8.5, col) + h.p('M30 -50 L47 -43 Q46 -39 33 -38 Z', col) + h.p('M24 -41 Q34 -37 46 -40.5 Q38 -34 27 -36 Z', wh) +
      h.c(46.5, -42.4, 1.9, sock) + h.eye(33, -47, 1.9) + h.l('M30.6 -50 q2.6 -1.2 4.6 0.4', dk, 0.9);
    return out;
  };

  /* ---------- pig ---------- */
  P.pig = function (o) {
    var col = o.colour || '#eba59b', dk = T(col, -0.18), lt = T(col, 0.3), out = h.shadow(68);
    if (o.asleep) {
      return out + h.e(0, -14, 32, 14, col) + h.p('M-26 -20 Q0 -32 26 -20', 'none', { stroke: lt, 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.6' }) +
        h.c(28, -12, 12, col) + h.e(39, -9, 5, 5, dk) + h.c(38, -10, 1, T(col, -0.5)) + h.c(40.5, -9, 1, T(col, -0.5)) +
        h.p('M22 -20 L32 -26 L33 -16 Z', dk) + shut(30, -14, 2.4, T(col, -0.5)) + h.l('M-31 -16 q-6 -3 -4 -7 q3 -2 4 1', dk, 1.8);
    }
    out += h.r(-21, -16, 8, 16, 3, dk) + h.r(13, -16, 8, 16, 3, dk);
    out += h.l('M-31 -34 q-7 -3 -5 -8 q3 -3 4.5 0.5 q0.5 3.5 -4 4', dk, 1.8);
    out += h.e(0, -30, 32, 19, col) + h.p('M-26 -20 Q0 -8 26 -20 Q24 -12 0 -11 Q-22 -12 -26 -20 Z', dk, { opacity: '.35' });
    out += h.p('M-24 -40 Q-4 -50 18 -44', 'none', { stroke: lt, 'stroke-width': '3.5', 'stroke-linecap': 'round', opacity: '.6' });
    if (o.mud) out += h.e(-14, -24, 7, 5, '#7a5a3e', { opacity: '.75' }) + h.e(6, -18, 5, 3.5, '#7a5a3e', { opacity: '.75' }) + h.e(-18, -4, 6, 3, '#7a5a3e', { opacity: '.6' });
    out += h.r(-16, -17, 8.5, 17, 4, col) + h.r(18, -17, 8.5, 17, 4, col) + h.r(-16, -4, 8.5, 4, 1.5, T(col, -0.45)) + h.r(18, -4, 8.5, 4, 1.5, T(col, -0.45));
    out += h.c(29, -36, 13, col) + h.e(41.5, -33, 5.5, 6, T(col, -0.08)) + h.e(43, -33, 3.4, 4.6, T(col, 0.1)) +
      h.c(42, -34.5, 1, T(col, -0.5)) + h.c(44.2, -32.5, 1, T(col, -0.5)) +
      h.p('M22 -46 L31 -56 L36 -44 Z', dk) + h.p('M24 -46 L31 -53 L33 -46 Z', T(col, -0.08)) +
      h.eye(34, -40, 2) + h.c(33, -32, 3, '#e07e78', { opacity: '.35' }) + h.l('M35 -28 q3 2 6 0', T(col, -0.5), 1.1);
    return out;
  };

  /* ---------- hen and chick ---------- */
  P.hen = function (o) {
    var col = o.colour || '#a65a36', dk = T(col, -0.25), lt = T(col, 0.25), red = '#c8423a', leg = '#d9a441', out = h.shadow(30);
    out += h.l('M-2 -12 V-0.5 M4 -12 V-0.5 M-2 -0.5 l-3 0.5 M-2 -0.5 l4 0 M4 -0.5 l4 0 M4 -0.5 l-3 0.5', leg, 1.8);
    out += h.p('M-10 -20 Q-20 -32 -17 -40 Q-10 -36 -6 -26 Z', dk) + h.p('M-12 -22 Q-24 -30 -23 -37 Q-14 -32 -8 -24 Z', T(col, -0.12));
    out += h.p('M-15 -22 Q-16 -10 -2 -10 Q12 -10 15 -20 Q16 -29 11 -33 Q4 -30 -2 -26 Q-10 -28 -15 -22 Z', col);
    out += h.p('M-9 -21 Q1 -27 7 -19 Q2 -12 -8 -15 Z', dk) + h.l('M-6 -19 Q0 -22 4 -18 M-6 -16 Q-1 -18 3 -15', lt, 1, { opacity: '.6' });
    out += h.p('M2 -11 Q12 -11 15 -19', 'none', { stroke: lt, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.5' });
    out += h.c(10, -31, 6.2, col) + h.c(7.5, -37.4, 2.4, red) + h.c(10.5, -38.3, 2.6, red) + h.c(13.4, -36.7, 2.2, red) +
      h.p('M15.5 -32.4 L20.5 -30.8 L15.5 -29 Z', '#e2a83e') + h.e(15, -27.3, 1.7, 2.6, red) + h.eye(12, -32.4, 1.35);
    return out;
  };
  P.chick = function (o) {
    var col = o.colour || '#f2c94c', dk = T(col, -0.18), out = h.shadow(14);
    out += h.l('M-1 -3 V-0.4 M2 -3 V-0.4 M-1 -0.4 l-1.6 0.3 M-1 -0.4 l2 0 M2 -0.4 l2 0', '#e0953a', 1.1);
    out += h.e(0, -7, 6.5, 5.2, col) + h.p('M-6 -8 L-9 -10 L-6.5 -5 Z', col) + h.p('M-3 -8 Q1 -10 3 -6 Q0 -4 -3 -6 Z', dk);
    out += h.c(4, -13, 4.2, col) + h.c(3, -14.5, 1.6, T(col, 0.35), { opacity: '.7' }) + h.p('M7.8 -13.6 L10.8 -12.6 L7.8 -11.6 Z', '#e0953a') + h.eye(5.6, -13.8, 0.95);
    return out;
  };

  /* ---------- duck (a mallard; colour gives a plain duck; swim: on water) ---------- */
  P.duck = function (o) {
    var plain = !!o.colour, body = o.colour || '#c9c1b2', head = plain ? o.colour : '#2f6b4f', chest = plain ? T(o.colour, -0.05) : '#7d4a33', bill = plain ? '#e59a3c' : '#e3c048', out = '';
    if (o.swim) out += h.e(0, -1, 22, 3, '#ffffff', { opacity: '.35' }) + h.l('M-24 1 h8 M16 1 h10', '#ffffff', 1.4, { opacity: '.5' });
    else out += h.shadow(34) + h.l('M-2 -8 V-0.5 M3 -8 V-0.5 M-2 -0.5 l-3 0.4 M-2 -0.5 l4 0 M3 -0.5 l4 0', '#e08a3a', 1.8);
    var y0 = o.swim ? 6 : 0;
    var d = h.p('M-24 -21 L-15 -18 L-17 -13 Z', T(body, -0.45)) +
      h.p('M-17 -15 Q-20 -24 -10 -24 L6 -24 Q16 -24 16 -14 Q12 -6 0 -6 Q-12 -6 -17 -15 Z', body) +
      h.p('M6 -24 Q16 -24 16 -14 Q14 -8 8 -7 Q10 -16 6 -24 Z', chest) +
      h.p('M-12 -19 Q-2 -24 6 -17 Q0 -11 -10 -13 Z', T(body, -0.18)) + (plain ? '' : h.p('M-6 -14 L2 -14 L1 -12 L-5 -12 Z', '#4a5fa8')) +
      h.l('M-12 -9 Q0 -6 12 -10', T(body, 0.3), 1.4, { opacity: '.6' }) +
      h.p('M7 -21 Q5 -27 8 -31 L14 -30 Q12 -26 13 -21 Z', head) + (plain ? '' : h.l('M7 -22.5 Q10 -21 13 -22.5', '#f4efe6', 1.4)) +
      h.c(11.5, -28, 6, head) + h.c(10, -30, 2.2, T(head, 0.25), { opacity: '.6' }) +
      h.p('M16 -29.5 Q23.5 -29 23 -25.6 Q20 -24.6 15.6 -26 Z', bill) + h.eye(13, -29.4, 1.4);
    return out + h.g(d, 'translate(0 ' + y0 + ')');
  };

  /* ---------- goat (patch: a patch of another colour) ---------- */
  P.goat = function (o) {
    var col = o.colour || '#ece3d2', dk = T(col, -0.18), lt = T(col, 0.35), horn = '#a8957a', out = h.shadow(60);
    out += limb(-24, -40, 6.5, dk) + limb(10, -40, 6.5, dk);
    out += h.p('M-24 -53 L-31 -62 L-27 -50 Z', col);
    out += h.p('M-27 -47 Q-27 -59 -12 -58 Q0 -57 12 -60 Q25 -61 27 -48 Q28 -36 18 -32 Q0 -28 -18 -33 Q-27 -36 -27 -47 Z', col);
    out += h.p('M-20 -34 Q0 -28 18 -33 Q20 -38 12 -37 Q0 -34 -20 -38 Z', dk, { opacity: '.45' }) + h.l('M-21 -56 Q-2 -58 14 -58', lt, 2.6, { opacity: '.7' });
    out += h.e(-18, -45, 8, 10, T(col, -0.05), { opacity: '.7' });
    if (o.patch) out += blob(-4, -47, 10, 7, o.patch === true ? '#8a6a4e' : o.patch);
    out += limb(-18, -40, 7, col) + limb(17, -40, 7, col);
    out += h.p('M14 -56 L24 -72 L33 -66 L26 -40 Z', col) + h.e(22, -47, 5, 9, T(col, -0.04));
    out += h.l('M25 -74 Q22 -82 15 -84', horn, 3.6) + h.l('M28 -74 Q26 -82 20 -85', T(horn, -0.15), 3);
    out += h.p('M22 -72 Q28 -79 34 -72 L43 -61 Q44 -56 39 -55 L29 -59 Q22 -64 22 -72 Z', col) + h.e(40, -58, 3.6, 3, T(col, -0.08));
    out += h.p('M23 -70 L12 -66 L14 -64 L24 -66 Z', dk) + h.p('M35 -57 L36 -47 L32 -56 Z', T(col, -0.3)) + h.c(42, -59, 0.9, '#6b5444');
    out += h.c(32, -69, 2.1, '#c9a54a') + h.r(30.6, -69.6, 3, 1.2, 0.5, '#1d140d') + h.c(32.6, -69.8, 0.5, '#fff');
    return out;
  };

  /* ---------- rabbit (sitting) ---------- */
  P.rabbit = function (o) {
    var col = o.colour || '#a88a6c', dk = T(col, -0.2), lt = T(col, 0.3), out = h.shadow(36);
    out += h.p('M3 -28 Q4 -44 9 -45 Q12 -42 8 -28 Z', dk);
    out += h.c(-15, -9, 4.6, '#f6f1e8');
    out += h.p('M-16 -8 Q-18 -24 -3 -26 Q9 -27 11 -14 Q11 -2 1 0 L-12 0 Q-16 -2 -16 -8 Z', col);
    out += h.e(-6, -8, 8.5, 7.5, T(col, -0.07)) + h.p('M-12 -21 Q-4 -26 4 -24', 'none', { stroke: lt, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '.6' });
    out += h.e(-1, -1.6, 8.5, 2.3, T(col, 0.12)) + h.e(7, -15, 4.2, 6.5, CREAM, { opacity: '.85' }) + h.r(6, -9, 3.6, 9, 1.8, col) + h.e(8.6, -0.8, 2.6, 1.4, lt);
    out += h.c(9, -24, 7.5, col) + h.e(13.5, -21.5, 3.8, 3, CREAM) + h.c(16, -23.4, 1.1, '#d98a8a') + h.eye(11, -26, 1.7) +
      h.l('M17 -22 h5 M17 -21 l4 1.6', '#fbf6ee', 0.5);
    out += h.p('M1 -29 Q-5 -44 -1 -47 Q4 -45 7 -30 Z', col) + h.p('M1.5 -31 Q-2 -42 -0.6 -44 Q2.5 -41 4.6 -31 Z', PINK, { opacity: '.8' });
    return out;
  };

  /* ---------- frog ---------- */
  P.frog = function (o) {
    var col = o.colour || '#6f9b4a', dk = T(col, -0.22), lt = T(col, 0.3), out = h.shadow(28);
    out += h.e(-7, -5, 8.5, 5, dk) + h.p('M-6 -1 L6 -1 L8 0.4 L-8 0.4 Z', dk);
    out += h.p('M-12 -6 Q-14 -17 0 -18 Q12 -18 14 -10 Q14 -3 6 -2 L-8 -2 Q-12 -3 -12 -6 Z', col);
    out += h.e(7, -6, 6, 3.6, '#e4dca8') + h.c(-6, -12, 1.8, dk, { opacity: '.6' }) + h.c(-1, -9, 1.3, dk, { opacity: '.6' }) + h.c(-9, -8, 1.2, dk, { opacity: '.6' });
    out += h.e(-6, -6, 6, 4, col) + h.e(-4, -1, 6, 1.4, col);
    out += h.r(8, -7, 2.8, 7, 1.4, col) + h.l('M8.5 -0.4 l-1.6 0.5 M10 -0.4 l0 0.6 M11 -0.4 l1.6 0.5', col, 1);
    out += h.c(4, -18, 4.4, col) + h.c(10.5, -17, 4.1, col) + h.c(3.6, -19, 2.2, lt, { opacity: '.5' });
    out += h.c(4.4, -18.6, 2.7, '#dcc75a') + h.eye(4.8, -18.6, 1.6) + h.c(10.8, -17.6, 2.5, '#dcc75a') + h.eye(11.2, -17.6, 1.5);
    out += h.l('M8 -11 Q11.5 -9.6 14.6 -11.4', dk, 0.9);
    return out;
  };

  /* ---------- fish (26 long; jump: leaping out of water) ---------- */
  function fishBody(col) {
    var dk = T(col, -0.25), lt = T(col, 0.35);
    return h.p('M-11 0 L-17 -7 Q-15 0 -17 7 Z', dk) + h.p('M-4 -6 Q0 -11 6 -7 Z', dk) + h.p('M-2 5 Q1 9 4 6 Z', dk) +
      h.p('M-12 0 Q-2 -9 8 -5 Q13 -3 13 0 Q13 3 8 5 Q-2 9 -12 0 Z', col) + h.p('M-8 1.5 Q0 6 10 3 Q2 7 -8 1.5 Z', lt, { opacity: '.8' }) +
      h.l('M-6 -3.6 Q0 -6 6 -4.4', lt, 1, { opacity: '.6' }) + h.l('M5 -4 Q3.6 0 5 4', dk, 0.9, { opacity: '.7' }) + h.eye(8.6, -1, 1.3) + h.l('M12 1.4 q-1 0.8 -2 0.4', dk, 0.7);
  }
  P.fish = function (o) {
    var col = o.colour || '#e08a3c';
    if (!o.jump) return h.g(fishBody(col), 'translate(0 -10)');
    return h.e(0, 0, 16, 3, '#e7f3f7', { opacity: '.7' }) + h.l('M-20 0 q4 -2 8 0 M12 0 q4 -2 8 0', '#ffffff', 1.2, { opacity: '.7' }) +
      h.c(-8, -7, 1.4, '#e7f3f7') + h.c(-4, -11, 1.1, '#e7f3f7') + h.c(-12, -10, 0.9, '#e7f3f7') +
      h.l('M-6 -3 Q-6 -20 4 -28', '#ffffff', 1.2, { opacity: '.45', 'stroke-dasharray': '2 3' }) + h.g(fishBody(col), 'translate(10 -32) rotate(-25)');
  };

  /* ---------- mouse ---------- */
  P.mouse = function (o) {
    var col = o.colour || '#9b928a', dk = T(col, -0.2), lt = T(col, 0.3), out = h.shadow(18);
    out += h.l('M-8 -3 Q-18 -1 -20 -7 Q-21 -12 -17 -12', '#d6a19c', 1.1);
    out += h.e(-1, -6.5, 9, 6.5, col) + h.p('M-7 -10 Q-1 -13.6 5 -11.4', 'none', { stroke: lt, 'stroke-width': '1.4', 'stroke-linecap': 'round', opacity: '.6' });
    out += h.p('M3 -11.6 Q11 -10 15 -5.4 Q11 -3.4 4 -2 Z', col) + h.e(-2, -1.4, 5, 1.4, T(col, 0.2)) + h.e(7, -0.6, 2.2, 1, '#e2aaa5');
    out += h.c(4, -13, 4, col) + h.c(4.2, -13, 2.5, '#e6b0ab') + h.eye(9.2, -8.4, 1.15) + h.c(15, -5.3, 1, '#d38783') +
      h.l('M14 -5 h5 M14 -4.4 l4 1.4', dk, 0.4);
    return out;
  };

  /* ---------- yak (shaggy, with a long fringe) ---------- */
  P.yak = function (o) {
    var col = o.colour || '#4a3426', dk = T(col, -0.25), lt = T(col, 0.25), horn = HORN, out = h.shadow(110);
    out += h.r(-34, -34, 10, 34, 4, dk) + h.r(22, -34, 10, 34, 4, dk);
    out += h.p('M-48 -64 Q-58 -60 -56 -40 Q-52 -48 -48 -52 Z', col) + h.p('M-56 -44 Q-60 -34 -54 -30 Q-52 -38 -52 -44 Z', dk);
    out += h.p('M-50 -48 Q-54 -72 -30 -76 Q-4 -79 14 -88 Q34 -96 46 -80 Q55 -62 48 -42 L-44 -40 Q-52 -42 -50 -48 Z', col);
    out += h.p('M-48 -48 L-46 -24 L-41 -31 L-37 -23 L-31 -31 L-26 -22 L-20 -30 L-14 -23 L-8 -30 L-2 -23 L4 -30 L10 -22 L16 -30 L22 -23 L28 -30 L34 -22 L40 -30 L46 -24 L48 -46 Z', T(col, -0.06));
    out += h.l('M-38 -66 q4 8 2 16 M-24 -70 q4 8 2 16 M-10 -72 q4 8 2 16 M6 -80 q4 8 2 16 M22 -86 q4 8 2 16 M34 -82 q4 8 2 16', lt, 1.6, { opacity: '.45' });
    out += h.p('M-40 -72 Q-6 -78 20 -90', 'none', { stroke: lt, 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.45' });
    out += h.r(-28, -28, 11, 28, 4.5, col) + h.r(30, -28, 11, 28, 4.5, col) + h.r(-28, -5, 11, 5, 2, HOOF) + h.r(30, -5, 11, 5, 2, HOOF);
    out += h.l('M50 -78 Q42 -88 46 -98', T(horn, -0.12), 4.4) + h.l('M58 -78 Q68 -88 64 -100', horn, 5);
    out += h.p('M42 -76 Q58 -88 66 -70 L70 -54 Q69 -46 60 -47 L46 -54 Q40 -64 42 -76 Z', col) + h.e(64, -51, 6.5, 5, T(col, 0.2));
    out += h.p('M44 -72 L36 -68 L44 -66 Z', dk) + h.c(67, -52, 1.2, NOSE) + h.eye(58, -68, 2.3) + h.p('M48 -54 L52 -40 L56 -48 L58 -38 L62 -47 Z', T(col, 0.06));
    return out;
  };

  /* ---------- ox (patch: a white patch, or its colour) ---------- */
  P.ox = function (o) {
    var col = o.colour || '#8b5a38', dk = T(col, -0.24), lt = T(col, 0.25), out = h.shadow(124);
    out += limb(-52, -60, 12, dk) + limb(22, -60, 12, dk);
    out += h.l('M-56 -88 Q-66 -76 -64 -48', col, 3.2) + h.e(-64, -46, 3.6, 6.5, dk);
    out += h.p('M-58 -64 Q-62 -92 -40 -94 Q-12 -92 8 -98 Q36 -105 50 -88 Q60 -72 54 -56 Q50 -46 38 -46 Q-6 -42 -48 -48 Q-58 -52 -58 -64 Z', col);
    out += h.p('M-48 -48 Q-6 -42 38 -46 Q46 -50 40 -54 Q-4 -48 -48 -54 Z', dk, { opacity: '.4' }) + h.p('M-50 -90 Q-20 -94 8 -98 Q30 -103 42 -96', 'none', { stroke: lt, 'stroke-width': '4', 'stroke-linecap': 'round', opacity: '.5' });
    out += h.e(-42, -70, 14, 18, T(col, -0.07), { opacity: '.7' });
    if (o.patch) out += blob(-6, -76, 15, 11, o.patch === true ? '#efe4d2' : o.patch) + blob(-40, -64, 8, 7, o.patch === true ? '#efe4d2' : o.patch);
    out += limb(-42, -60, 13, col) + limb(34, -60, 13, col);
    out += h.p('M42 -66 Q48 -42 60 -54 L60 -72 Z', T(col, -0.08));
    out += h.l('M56 -92 Q46 -98 46 -110', T(HORN, -0.14), 4.6);
    out += h.p('M48 -90 Q64 -98 72 -84 L78 -66 Q78 -57 68 -57 Q58 -59 54 -69 Z', col) + h.e(72, -61.5, 8, 6.4, '#c4a088') + h.p('M52 -90 Q62 -94 68 -88', 'none', { stroke: lt, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '.5' });
    out += h.l('M62 -92 Q72 -98 72 -112', HORN, 5) + h.p('M54 -86 L41 -84 L52 -79 Z', dk);
    out += h.c(76, -62, 1.4, '#5e463a') + h.eye(64, -82, 2.6) + h.l('M61 -86 q3 -1.6 6 0', dk, 1.1, { opacity: '.6' });
    return out;
  };

  /* ---------- ram (a sheep with curled horns; colour: the wool) ---------- */
  P.ram = function (o) {
    var col = o.colour || '#ece4d2', dk = T(col, -0.12), lt = T(col, 0.45), face = o.face || '#4a3a30', horn = '#cdb68e', out = h.shadow(70);
    out += h.r(-20, -30, 5, 30, 2.4, T(face, -0.15)) + h.r(12, -30, 5, 30, 2.4, T(face, -0.15));
    var wool = [[-24, -36, 11], [-14, -46, 12], [0, -50, 12], [13, -46, 11], [21, -36, 10], [-20, -28, 10], [-4, -27, 12], [12, -28, 10], [-2, -38, 16]];
    out += wool.map(function (w) { return h.c(w[0], w[1] + 2, w[2], dk); }).join('') + wool.map(function (w) { return h.c(w[0], w[1], w[2], col); }).join('');
    out += [[-15, -51, 5], [-1, -55, 5.5], [12, -50, 4.4], [-24, -41, 4]].map(function (w) { return h.c(w[0], w[1], w[2], lt, { opacity: '.35' }); }).join('');
    out += h.r(-15, -30, 5.4, 30, 2.6, face) + h.r(16, -30, 5.4, 30, 2.6, face);
    out += h.p('M17 -50 Q30 -60 40 -48 L46 -38 Q45 -32 40 -33 L26 -37 Q17 -42 17 -50 Z', face) + h.c(24, -54, 7, col) + h.c(25, -56.4, 2.6, lt, { opacity: '.7' });
    out += h.p('M15 -44 L7 -41 L15 -39 Z', T(face, -0.2)) + h.c(44, -37, 0.9, '#1d140d') + h.eye(34, -46, 1.8) + h.l('M40 -33.6 q2 1 4 -0.4', T(face, 0.3), 0.8);
    out += h.l('M17 -56 Q27 -58 27 -48 Q26 -40 19 -40 Q13 -41 14 -46 Q15 -50 19 -49', horn, 4.4) + h.l('M19 -56.6 Q25 -57 26 -51', T(horn, 0.35), 1.2, { opacity: '.7' });
    return out;
  };

  /* ---------- horse (mane: its colour; socks: white lower legs; blaze: a white stripe on the face) ---------- */
  P.horse = function (o) {
    var col = o.colour || '#8b5a36', dk = T(col, -0.22), lt = T(col, 0.25), mane = o.mane || '#2e2119', out = h.shadow(100);
    out += limb(-38, -66, 10, dk) + limb(24, -66, 10, dk);
    out += h.p('M-46 -90 Q-64 -84 -62 -52 Q-58 -46 -54 -56 Q-52 -70 -46 -78 Z', mane) + h.p('M-58 -76 Q-60 -62 -58 -54', 'none', { stroke: T(mane, 0.25), 'stroke-width': '1.6', opacity: '.6', 'stroke-linecap': 'round' });
    out += h.p('M-47 -76 Q-50 -98 -28 -97 Q0 -94 24 -98 Q44 -101 50 -84 Q52 -66 40 -59 Q0 -53 -36 -57 Q-47 -61 -47 -76 Z', col);
    out += h.p('M-36 -57 Q0 -53 40 -59 Q42 -63 34 -63 Q0 -58 -36 -62 Z', dk, { opacity: '.4' }) + h.p('M-40 -92 Q-6 -96 24 -97', 'none', { stroke: lt, 'stroke-width': '3.4', 'stroke-linecap': 'round', opacity: '.5' });
    out += h.p('M-46 -78 Q-44 -94 -30 -94 Q-18 -90 -20 -74 Q-22 -62 -34 -58 Q-44 -64 -46 -78 Z', T(col, -0.05), { opacity: '.6' });
    out += limb(-30, -66, 11, col, o.socks) + limb(32, -66, 11, col, o.socks);
    var head = h.p('M26 -92 Q36 -120 52 -128 L64 -118 Q52 -104 48 -76 Z', col) +
      h.p('M48 -130 Q60 -136 67 -126 L80 -105 Q83 -97 75 -96 Q69 -97 62 -106 L50 -116 Z', col) + h.p('M70 -108 L80 -105 Q83 -97 75 -96 Q69 -97 66 -102 Z', T(col, -0.12)) +
      (o.blaze ? h.p('M60 -128 L65 -126 L77 -104 L73 -100 Z', '#f1ebe0') : '') +
      h.p('M52 -128 L54 -140 L59 -129 Z', col) + h.p('M56 -128 L60 -139 L62 -127 Z', dk) +
      h.p('M28 -92 Q32 -118 50 -130 L56 -128 Q46 -122 40 -108 Q36 -98 36 -90 Z', mane) + h.p('M52 -130 Q58 -128 60 -122 Q55 -124 52 -126 Z', mane) +
      h.eye(62, -118, 2.4) + h.l('M59.4 -121.6 q3 -1.4 5.6 0.4', dk, 1, { opacity: '.6' }) + h.e(77, -101, 1.6, 1.2, '#2a1a12') + h.l('M74 -97 q2 1 4 0', T(col, -0.4), 0.9);
    out += h.g(head, 'translate(40 -96) scale(1.1) translate(-40 96)');
    return out;
  };
})();

/* Things at home and about: furniture, food, toys and small objects for the Decodable readers' pictures.
   Every part: the middle of its base at 0,0, up is negative y, facing right. Things that sit on a table take o.y (a table top is 55 up). */
(function () {
  var D = Atlas.decodable, h = D.art.h, P = D.art.parts, T = h.tint;
  var WOOD = '#9a6b48', METAL = '#6f7a80', CREAM = '#f3ecdf';
  function ink(col) { return T(col, -0.45); }
  /* a soft glint: a small rounded light shape */
  function glint(x, y, w, hh, op) { return h.r(x, y, w, hh, Math.min(w, hh) / 2, '#fff', { opacity: op || '.45' }); }

  /* ---------- furniture ---------- */
  function quilt(bl) {
    var out = '';
    for (var x = -4, k = 0; x < 56; x += 12, k++) for (var y = -38, r = 0; y < -16; y += 9, r++) if ((k + r) % 2) out += h.r(x, y, 12, 9, 1, T(bl, 0.16), { opacity: '.85' });
    return out + h.l('M-4 -29 H56 M-4 -20 H56', T(bl, -0.12), 0.8, { opacity: '.6' });
  }
  P.bed = function (o) {
    var w = o.colour || WOOD, bl = o.blanket || '#6f8bab', dk = T(w, -0.22), lt = T(w, 0.18);
    return h.shadow(150) +
      h.r(-64, -12, 6, 12, 2, dk) + h.r(58, -12, 6, 12, 2, dk) +
      h.r(-70, -62, 13, 62, 5, w) + h.r(-68, -60, 4, 54, 2, lt, { opacity: '.7' }) + h.e(-63.5, -63, 8, 3.5, lt) +
      h.r(-60, -22, 124, 10, 3, dk) + h.r(-60, -22, 124, 3, 1.5, w) +
      h.r(-58, -33, 118, 13, 5, CREAM) + h.r(-58, -24, 118, 4, 2, T(CREAM, -0.08)) +
      h.p('M-56 -34 Q-58 -46 -46 -46 Q-36 -48 -28 -44 Q-24 -40 -26 -34 Z', '#fbf8f1') + h.p('M-38 -45 Q-28 -46 -27 -36 L-34 -35 Z', T(CREAM, -0.08)) +
      h.p('M-22 -38 Q-22 -41 -18 -41 H60 Q64 -41 64 -37 V-14 Q58 -10 52 -13 Q44 -10 36 -13 Q28 -10 20 -13 Q12 -10 4 -13 Q-4 -10 -12 -13 Q-18 -10 -22 -13 Z', bl) +
      quilt(bl) +
      h.p('M-22 -38 Q-22 -41 -18 -41 H-6 V-12 Q-14 -10 -22 -13 Z', '#f7f2e8') + h.r(-7, -41, 3, 29, 1.5, T(bl, 0.45)) +
      h.r(-4, -41, 66, 2.4, 1.2, T(bl, 0.3), { opacity: '.9' }) +
      h.p('M56 -41 Q64 -41 64 -36 V-12 Q60 -10 56 -13 Z', T(bl, -0.2)) +
      h.r(60, -42, 11, 42, 4, w) + h.r(62, -40, 3, 36, 1.5, lt, { opacity: '.6' }) + h.e(65.5, -42, 6.5, 3, lt);
  };
  P.table = function (o) {
    var w = o.colour || '#a87a52', dk = T(w, -0.25), lt = T(w, 0.2);
    var out = h.shadow(100) + h.r(-32, -47, 5, 43, 2, T(w, -0.38)) + h.r(27, -47, 5, 43, 2, T(w, -0.38)) +
      h.r(-42, -48, 7, 48, 2.5, dk) + h.r(35, -48, 7, 48, 2.5, w) + h.r(36.5, -46, 2, 42, 1, lt, { opacity: '.6' }) +
      h.r(-42, -50, 84, 6, 1.5, dk);
    if (o.cloth) {
      var cl = o.cloth === true ? '#e9e1cf' : o.cloth;
      out += h.p('M-50 -56 H50 L52 -34 Q46 -30 40 -34 Q34 -30 28 -34 Q20 -38 14 -40 H-14 Q-20 -38 -28 -34 Q-34 -30 -40 -34 Q-46 -30 -52 -34 Z', cl) +
        h.l('M-30 -55 V-40 M0 -55 V-40 M30 -55 V-40', T(cl, -0.12), 2) + h.l('M-50 -48 H50', T(cl, -0.12), 2) + h.r(-50, -57, 100, 3, 1.5, T(cl, 0.3));
    } else {
      out += h.r(-50, -56, 100, 7, 2.5, w) + h.r(-48, -56, 96, 2.2, 1.1, lt) + h.r(-50, -51, 100, 2, 1, dk, { opacity: '.5' });
    }
    return out;
  };
  P.chair = function (o) {
    var w = o.colour || '#8f6443', dk = T(w, -0.25), far = T(w, -0.38), lt = T(w, 0.2), cush = o.cushion;
    return h.shadow(44) +
      h.r(-12, -28, 4, 28, 1.5, far) + h.r(15, -28, 4, 28, 1.5, far) +
      h.r(-12, -62, 4, 34, 1.5, far) +
      h.r(-17, -42, 8, 2.4, 1, dk) + h.r(-17, -49, 8, 2.4, 1, dk) +
      h.r(-18, -60, 5, 60, 2.2, dk) + h.r(-17.2, -58, 1.6, 54, 0.8, lt, { opacity: '.5' }) +
      h.p('M-20 -64 Q-14 -67 -6 -64 L-6 -57 Q-14 -60 -20 -57 Z', w) + h.p('M-19 -63.5 Q-14 -66 -8 -63.8', 'none', { stroke: lt, 'stroke-width': '1.2', 'stroke-linecap': 'round' }) +
      h.r(-19, -31, 40, 6, 2, w) + h.r(-19, -31, 40, 2, 1, lt) +
      (cush ? h.r(-15, -36, 34, 6, 3, cush) + h.r(-13, -36, 28, 2, 1, T(cush, 0.3)) : '') +
      h.r(15, -27, 5, 27, 2, w) + h.r(-16, -27, 5, 27, 2, w) + h.r(-12, -12, 30, 3, 1.5, dk, { opacity: '.8' });
  };
  P.shelf = function (o) {
    var w = o.colour || '#9a7050', dk = T(w, -0.3), lt = T(w, 0.18), cols = ['#b2493a', '#4f6d8a', '#d8b46a', '#5f8a5a', '#8a5f7a', '#c9845f', '#3f5a6a', '#e0c9a0'];
    var out = h.shadow(70) + h.r(-34, -70, 68, 70, 3, w) + h.r(-30, -66, 60, 62, 2, dk);
    var rows = [-48, -26, -4], i = 0;
    rows.forEach(function (y, r) {
      out += h.r(-34, y, 68, 4, 1, w) + h.r(-34, y, 68, 1.5, 0.7, lt);
      if (r === 0) {
        var x = -28;
        for (var k = 0; k < 6; k++) { var bw = 4 + (k % 3), bh = 14 + (k * 5 % 5), col = cols[(i++) % cols.length]; out += h.r(x, y - bh, bw, bh, 0.8, col) + h.r(x + 0.8, y - bh + 3, bw - 1.6, 1.2, 0.5, T(col, 0.4)); x += bw + 0.6; }
        out += h.p('M10 ' + y + ' l2 -10 h10 l2 10 Z', '#c47a52') + h.c(13, y - 14, 4.5, '#6f914f') + h.c(19, y - 15, 5, '#5f8a4a') + h.c(16, y - 19, 4, '#86a664');
      } else if (r === 1) {
        out += h.r(-28, y - 9, 22, 4, 1, cols[3]) + h.r(-27, y - 13, 20, 4, 1, cols[1]) + h.r(-28, y - 17, 21, 4, 1, cols[0]) +
          h.r(6, y - 16, 10, 16, 3, '#cfe0e3', { opacity: '.85' }) + h.r(7, y - 10, 8, 9, 2, '#d99a3a') + h.r(5.5, y - 18, 11, 3, 1, '#8a5f3a') +
          h.c(24, y - 6, 6, '#c96a5a') + h.c(22, y - 8, 1.6, '#fff', { opacity: '.4' });
      } else {
        out += h.r(-28, y - 14, 24, 14, 2, '#c79a62') + h.r(-28, y - 14, 24, 3, 1, T('#c79a62', 0.2)) + h.r(0, y - 16, 4, 16, 0.8, cols[5]) + h.r(4.6, y - 18, 5, 18, 0.8, cols[6]) + h.r(10.2, y - 15, 4, 15, 0.8, cols[7]) +
          h.p('M15 ' + y + ' l12 -15 l2 1.4 l-11 13.6 Z', cols[4]);
      }
    });
    return out + h.r(-36, -72, 72, 4, 1.5, lt) + h.r(-34, -70, 4, 70, 1, w) + h.r(30, -70, 4, 70, 1, T(w, -0.12));
  };
  P.sink = function (o) {
    var cab = o.colour || '#7f9fa8', dk = T(cab, -0.18), top = '#e9e1d2';
    return h.shadow(70) + h.r(-34, -42, 68, 42, 3, cab) + h.r(-34, -4, 68, 4, 1, T(cab, -0.3)) +
      h.r(-30, -36, 28, 30, 2.5, dk) + h.r(2, -36, 28, 30, 2.5, dk) + h.r(-27, -33, 22, 24, 2, T(cab, -0.06)) + h.r(5, -33, 22, 24, 2, T(cab, -0.06)) +
      h.c(-6, -22, 1.8, '#d9c27a') + h.c(6, -22, 1.8, '#d9c27a') +
      h.r(-37, -46, 74, 6, 2, top) + h.r(-37, -46, 74, 2, 1, '#fbf8f2') + h.p('M-22 -46 Q-20 -40 -14 -40 H14 Q20 -40 22 -46 Z', T(top, -0.18)) +
      h.r(-3, -52, 6, 6, 1.5, '#a9b4ba') + h.l('M0 -52 V-62 Q0 -66 -4 -66 Q-9 -66 -9 -60', '#a9b4ba', 3.2) + h.l('M-1 -64 Q-4 -66 -7 -63', '#e6ecef', 1, { opacity: '.9' }) +
      h.r(5, -51, 6, 3, 1.5, '#8f9aa1') + h.r(-11, -51, 6, 3, 1.5, '#8f9aa1') +
      (o.running ? h.r(-10, -59, 2, 13, 1, '#a9cfe0', { opacity: '.8' }) : '');
  };
  P.stove = function (o, c) {
    var b = o.colour || '#e8e0d0', dk = T(b, -0.16), black = '#3a3632';
    var win = o.lit ? '#f0b45a' : '#4a4540';
    return h.shadow(76) +
      h.r(-36, -86, 72, 18, 3, dk) + h.r(-30, -82, 60, 8, 3, T(b, 0.3)) + [-18, -6, 6, 18].map(function (x) { return h.c(x, -78, 2.6, black) + h.c(x - 0.7, -78.7, 0.8, '#fff', { opacity: '.5' }); }).join('') +
      h.r(-38, -70, 76, 70, 4, b) + h.r(28, -68, 8, 66, 3, dk, { opacity: '.6' }) + h.r(-36, -68, 3, 62, 1.5, '#fff', { opacity: '.5' }) +
      h.r(-38, -71, 76, 5, 2, black) + h.e(-18, -71, 11, 2, '#5a554f') + h.e(16, -71, 11, 2, '#5a554f') +
      h.r(-28, -56, 56, 3, 1.5, '#b9b4ad') +
      h.r(-28, -50, 56, 38, 4, dk) + h.r(-20, -42, 40, 22, 3, win) +
      (o.lit ? h.r(-20, -42, 40, 22, 3, '#ffe0a0', { opacity: '.35' }) + h.e(0, -26, 14, 3, '#d9774b', { opacity: '.7' }) : h.r(-18, -40, 14, 5, 2, '#fff', { opacity: '.12' })) +
      h.r(-34, -8, 68, 6, 2, T(b, -0.3));
  };
  P.tub = function (o) {
    var b = o.colour || '#f1ece3', dk = T(b, -0.12), ft = '#c9a24a';
    return h.shadow(124) +
      h.p('M-52 -2 q-2 -8 4 -10 l3 2 q-2 4 -3 8 Z M52 -2 q2 -8 -4 -10 l-3 2 q2 4 3 8 Z', ft) + h.p('M-40 -2 q-1 -8 4 -10 l3 2 q-2 4 -3 8 Z M40 -2 q1 -8 -4 -10 l-3 2 q2 4 3 8 Z', T(ft, -0.25)) +
      h.p('M-58 -46 H58 Q58 -12 30 -10 H-30 Q-58 -12 -58 -46 Z', b) +
      h.p('M30 -46 H58 Q58 -12 30 -10 Q46 -20 30 -46 Z', dk) +
      h.p('M-50 -42 Q-48 -22 -30 -16', 'none', { stroke: '#fff', 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.7' }) +
      h.r(-61, -50, 122, 6, 3, T(b, 0.3)) + h.r(-61, -46, 122, 2, 1, dk) +
      h.r(-56, -64, 4, 16, 1.5, '#b9a06a') + h.l('M-54 -63 Q-54 -70 -46 -70', '#b9a06a', 3) +
      (o.bubbles === false ? '' : [[-34, 0], [-22, -3], [-8, -1], [8, -4], [22, -1], [36, -2], [-14, -6], [14, -7]].map(function (p, i) { return h.c(p[0], -52 + p[1], 6 + (i % 3), '#fbfdff') + h.c(p[0] - 2, -54 + p[1], 2, '#dfe9f0'); }).join(''));
  };
  P.hammock = function (o) {
    var f = o.colour || '#c96a5a', post = '#7a5a3e', st = T(f, 0.4);
    return h.shadow(150) +
      h.r(-76, -62, 7, 62, 2, post) + h.r(69, -62, 7, 62, 2, T(post, -0.15)) + h.r(-75, -60, 2, 56, 1, T(post, 0.25)) +
      h.l('M-70 -56 L-50 -40 M-70 -56 L-50 -34 M70 -56 L50 -40 M70 -56 L50 -34', '#d9c7a4', 1.2) +
      h.p('M-52 -42 Q0 -10 52 -42 L50 -34 Q0 -2 -50 -34 Z', f) +
      h.p('M-52 -42 Q0 -10 52 -42 Q0 -16 -52 -42 Z', T(f, -0.22)) +
      h.l('M-40 -31 Q0 -6 40 -31', st, 2, { opacity: '.85' }) + h.l('M-46 -35 Q0 -10 46 -35', T(f, -0.15), 1.4) +
      h.l('M-50 -34 l-1 6 M-40 -27 l-1 6 M-30 -22 l-1 6 M-20 -18 l0 6 M-10 -16 l0 6 M0 -15 l0 6 M10 -16 l0 6 M20 -18 l0 6 M30 -22 l1 6 M40 -27 l1 6 M50 -34 l1 6', '#e8dcc4', 1);
  };
  P.rug = function (o) {
    var col = o.colour || '#b5776b', b = T(col, -0.2), w = o.w || 170, r = w / 2;
    if (o.round) return h.e(0, -3, r, 9, b) + h.e(0, -3.5, r - 7, 7, col) + h.e(0, -4, r - 18, 4.2, T(col, 0.25)) + h.e(0, -4, r - 30, 2, b, { opacity: '.7' });
    return h.p('M' + (-r + 10) + ' -9 H' + (r - 10) + ' L' + r + ' 0 H' + (-r) + ' Z', b) +
      h.p('M' + (-r + 15) + ' -7.5 H' + (r - 15) + ' L' + (r - 8) + ' -1.5 H' + (-r + 8) + ' Z', col) +
      h.p('M' + (-r + 26) + ' -6 H' + (r - 26) + ' L' + (r - 20) + ' -3 H' + (-r + 20) + ' Z', T(col, 0.28)) +
      h.l('M' + (-r - 4) + ' -1 h4 M' + (-r - 2) + ' -5 h4 M' + (r) + ' -1 h4 M' + (r - 2) + ' -5 h4', '#efe4cf', 1.2);
  };
  P.pillow = function (o) {
    var col = o.colour || '#e3cfbd', lt = T(col, 0.35), dk = T(col, -0.16);
    return h.shadow(42) + h.p('M-19 -1 Q-22 -1 -22 -5 L-21 -16 Q-21 -21 -17 -20 Q0 -17 17 -20 Q21 -21 21 -16 L22 -5 Q22 -1 19 -1 Q0 -3 -19 -1 Z', col) +
      h.p('M8 -18.6 Q17 -20 19 -20 Q21 -21 21 -16 L22 -5 Q22 -1 19 -1 Q12 -2 8 -2 Q14 -10 8 -18.6 Z', dk) +
      h.p('M-16 -16 Q-4 -14 8 -16', 'none', { stroke: lt, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '.9' }) +
      h.l('M-18 -4 Q0 -6 18 -4', dk, 0.8, { opacity: '.7' }) + h.c(0, -10, 1.3, dk);
  };

  /* ---------- in the kitchen ---------- */
  P.cup = function (o) {
    var col = o.colour || '#d9774b', dk = T(col, -0.2);
    return h.shadow(16) + h.l('M5 -11 Q11 -11 11 -7 Q11 -3 5 -3', dk, 2.2) +
      h.p('M-6 -14 H6 V-3 Q6 0 3 0 H-3 Q-6 0 -6 -3 Z', col) + h.p('M3 -14 H6 V-3 Q6 0 3 0 Z', dk) + h.e(0, -14, 6, 1.6, T(col, -0.4)) + h.e(0, -13.6, 5, 1, '#6b4632') +
      glint(-4.5, -12, 1.4, 8) + (o.hot ? h.l('M-2 -17 q-2 -3 0 -5 q2 -2 0 -5 M2 -18 q-2 -3 0 -5', '#ffffff', 1, { opacity: '.6' }) : '');
  };
  P.pot = function (o) {
    var col = o.colour || '#5f6b73', lt = T(col, 0.25), dk = T(col, -0.25);
    return h.shadow(36) + h.r(-21, -16, 6, 3, 1.5, dk) + h.r(15, -16, 6, 3, 1.5, dk) +
      h.p('M-16 -18 H16 V-4 Q16 0 12 0 H-12 Q-16 0 -16 -4 Z', col) + h.p('M8 -18 H16 V-4 Q16 0 12 0 H8 Z', dk) + glint(-13, -15, 3, 12, '.35') +
      h.e(0, -18, 17, 3, lt) + h.p('M-17 -18 Q0 -26 17 -18 Z', T(col, 0.12)) + h.r(-3, -25, 6, 3, 1.5, '#3b2f2a') +
      (o.steam ? h.l('M-6 -28 q-3 -4 0 -7 q3 -3 0 -7 M4 -30 q-3 -4 0 -7 q3 -3 0 -7', '#ffffff', 1.4, { opacity: '.6' }) : '');
  };
  P.pan = function (o) {
    var col = o.colour || '#3d3a37';
    return h.shadow(34) + h.l('M14 -8 L40 -12', '#7a5a3e', 4) + h.l('M14 -8 L22 -9', T(col, 0.1), 3.4) + h.c(38, -11.7, 1, '#d9c7a4') +
      h.p('M-18 -10 H16 L13 -2 Q12 0 9 0 H-11 Q-14 0 -15 -2 Z', col) + h.e(-1, -10, 17, 2.4, T(col, 0.25)) + h.e(-1, -10, 14.5, 1.6, T(col, -0.2)) +
      (o.egg ? h.e(-2, -11, 8, 1.8, '#fbf8f0') + h.e(-1, -11.6, 3, 1.4, '#f2b53a') : '') + glint(-14, -8, 10, 1.6, '.25');
  };
  P.jar = function (o) {
    var fill = o.fill || '#d99a3a', lid = o.lid || '#8a5f3a';
    return h.shadow(24) + h.r(-11, -22, 22, 22, 5, '#d8e6e8', { opacity: '.75' }) + h.r(-10, -15, 20, 14, 4, fill) + h.r(4, -15, 6, 14, 3, T(fill, -0.2)) +
      h.e(0, -15, 10, 1.6, T(fill, 0.25)) + h.r(-9, -24, 18, 4, 1.5, '#d8e6e8', { opacity: '.9' }) +
      h.r(-10, -27, 20, 5, 1.6, lid) + h.r(-10, -27, 20, 1.6, 0.8, T(lid, 0.3)) + glint(-8, -20, 2.2, 15, '.6');
  };
  P.jam = function (o) {
    var jam = o.colour || '#9e2f3a', cloth = o.cloth || '#c0573e';
    return h.shadow(20) + h.r(-8, -17, 16, 17, 4, '#d8e6e8', { opacity: '.8' }) + h.r(-7, -14, 14, 13, 3.5, jam) + h.r(3, -14, 4, 13, 2, T(jam, -0.25)) +
      h.r(-5, -10, 10, 6, 1, '#f3ecdf') + h.l('M-3 -7 h6', '#9a7656', 0.8) +
      h.p('M-10 -15 Q-10 -21 0 -21 Q10 -21 10 -15 L11 -13 Q8 -14.5 6 -13 Q3 -14.5 0 -13 Q-3 -14.5 -6 -13 Q-8 -14.5 -11 -13 Z', cloth) +
      h.l('M-6 -20.5 V-14 M0 -21 V-13.5 M6 -20.5 V-14 M-10 -17 H10', '#f6efe3', 1, { opacity: '.75' }) + h.l('M-9 -15.5 H9', '#e8dcc4', 1) + glint(-6.5, -12, 1.6, 9, '.55');
  };
  P.cake = function (o) {
    var ic = o.icing || '#f6efe3', sp = o.colour || '#c9845f', berry = '#b23a48';
    var out = h.shadow(52) + h.r(-24, -4, 48, 4, 2, '#d9d2c6') + h.r(-3, -10, 6, 7, 1, '#cbc3b5') +
      h.r(-20, -34, 40, 24, 4, sp) + h.r(-20, -24, 40, 4, 0, T(sp, 0.35)) + h.r(10, -34, 10, 24, 3, T(sp, -0.18)) +
      h.p('M-21 -34 Q-21 -38 -17 -38 H17 Q21 -38 21 -34 V-30 Q18 -27 16 -30 Q14 -24 11 -30 Q8 -28 5 -30 Q2 -25 -1 -30 Q-4 -28 -7 -30 Q-10 -23 -13 -30 Q-16 -27 -19 -30 Q-21 -28 -21 -30 Z', ic) +
      h.e(0, -37, 20, 2.4, T(ic, 0.4));
    [-12, -4, 4, 12].forEach(function (x) { out += h.c(x, -39.5, 2.6, berry) + h.c(x - 0.8, -40.4, 0.8, '#fff', { opacity: '.6' }); });
    for (var i = 0; i < (o.candles || 0); i++) { var cx = (i - (o.candles - 1) / 2) * 7; out += h.r(cx - 1.3, -50, 2.6, 10, 1, '#e8dcc4') + h.e(cx, -53, 1.6, 2.8, '#f2b53a') + h.e(cx, -52.5, 0.7, 1.4, '#fff4cf'); }
    return out;
  };
  P.bun = function (o) {
    var col = o.colour || '#c98a48';
    return h.shadow(22) + h.p('M-11 0 Q-12 -10 0 -11 Q12 -10 11 0 Z', col) + h.p('M4 -10 Q12 -8 11 0 H4 Q8 -5 4 -10 Z', T(col, -0.2)) +
      h.p('M-8 -4 Q-8 -9 -1 -9.6', 'none', { stroke: T(col, 0.35), 'stroke-width': '1.6', 'stroke-linecap': 'round' }) +
      h.l('M-4 -9.5 q2 2 2 4 M1 -10 q2 2 2 4', T(col, -0.25), 1) + h.c(-6, -6, 0.5, '#f3e8c8') + h.c(-2, -7, 0.5, '#f3e8c8') + h.c(5, -7, 0.5, '#f3e8c8');
  };
  P.fishbowl = function (o) {
    var water = '#9cc8da';
    return h.shadow(36) + h.e(0, -2, 13, 2.4, '#b9d6df') +
      h.c(0, -15, 16, '#e3eff2', { opacity: '.55' }) + h.p('M-14.3 -21 Q-16 -10 -10 -3 Q0 1 10 -3 Q16 -10 14.3 -21 Z', water, { opacity: '.85' }) +
      h.e(0, -21, 14.3, 2.2, T(water, 0.35)) + h.p('M-9 -3 Q0 1 9 -3 Q6 -6 0 -6 Q-6 -6 -9 -3 Z', '#c9a77a') +
      h.c(-4, -4.5, 1.2, '#9a7656') + h.c(3, -5, 1, '#8a8f7a') +
      h.l('M-6 -5 q-3 -6 0 -10 q3 -4 0 -8 M-4 -5 q2 -5 0 -9', '#5f8a4a', 1.6) +
      h.g(h.e(0, 0, 4.6, 3.2, '#e8833a') + h.p('M-4 0 l-4 -3 v6 Z', '#d0702c') + h.p('M-1 -3 q2 -3 4 -1 Z', '#d0702c') + h.eye(2.4, -0.6, 0.8), 'translate(4 -13)') +
      h.c(9, -20, 0.9, '#fff', { opacity: '.8' }) + h.c(10, -23, 0.6, '#fff', { opacity: '.8' }) +
      h.e(0, -31, 8, 1.6, '#c8dde3') + h.p('M-10 -24 Q-13 -14 -8 -7', 'none', { stroke: '#fff', 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.7' });
  };

  /* ---------- bags, boxes and gifts ---------- */
  P.box = function (o) {
    var col = o.colour || '#c79a62', side = T(col, -0.2), top = T(col, 0.18);
    var out = h.shadow(54) + h.r(-26, -36, 40, 36, 1.5, col) + h.p('M14 0 V-36 L26 -42 V-6 Z', side);
    if (o.open) {
      out += h.p('M-26 -36 L-14 -42 H26 L14 -36 Z', T(col, -0.5)) + h.p('M-26 -36 L-36 -46 L-26 -48 L-14 -42 Z', top) + h.p('M14 -36 L22 -52 L32 -50 L26 -42 Z', T(col, 0.1)) +
        h.p('M-14 -42 L-12 -52 H26 L26 -42 Z', side, { opacity: '.85' });
    } else {
      out += h.p('M-26 -36 L-14 -42 H26 L14 -36 Z', top) + h.p('M-6 -36 L5 -42 H10 L-1 -36 Z', '#d9c39a') + h.r(-6, -36, 5, 10, 0.5, '#d9c39a');
    }
    return out + h.l('M-22 -6 h8 M-22 -3 h5', T(col, -0.3), 1, { opacity: '.6' });
  };
  P.gift = function (o) {
    var col = o.colour || '#4f7a6b', rib = o.ribbon || '#e2b84f', side = T(col, -0.22);
    return h.shadow(40) + h.r(-16, -24, 28, 24, 1.5, col) + h.p('M12 0 V-24 L20 -28 V-4 Z', side) + h.p('M-16 -24 L-8 -28 H20 L12 -24 Z', T(col, 0.18)) +
      h.r(-5, -24, 6, 24, 0, rib) + h.p('M12 -14 L20 -18 V-15 L12 -11 Z', T(rib, -0.2)) + h.p('M-5 -24 L3 -28 H9 L1 -24 Z', T(rib, 0.15)) +
      h.p('M-14 -24 L-6 -28 H-2 L-10 -24 Z', T(rib, 0.15)) +
      h.p('M2 -27 Q-8 -38 -9 -31 Q-8 -27 2 -27 Z', rib) + h.p('M2 -27 Q12 -38 13 -31 Q12 -27 2 -27 Z', T(rib, -0.12)) + h.c(2, -27, 2.4, T(rib, -0.25)) +
      glint(-14, -21, 1.8, 16, '.3');
  };
  P.bag = function (o) {
    var col = o.colour || '#c9a77a', dk = T(col, -0.2), lt = T(col, 0.2);
    var out = h.shadow(38);
    if (o.full !== false) out += h.p('M-6 -26 Q-12 -40 -8 -46 Q-4 -40 -2 -26 Z', '#6f9a4a') + h.p('M-4 -26 Q0 -44 2 -46 Q4 -40 2 -26 Z', '#86b25a') + h.r(4, -46, 6, 22, 3, '#d8a35a') + h.l('M5 -42 l4 -2 M5 -37 l4 -2', T('#d8a35a', -0.3), 1) + h.c(-10, -27, 4, '#c0573e');
    out += h.p('M-15 -28 H15 L16 -2 Q16 0 14 0 H-14 Q-16 0 -16 -2 Z', col) + h.p('M8 -28 H15 L16 -2 Q16 0 14 0 H8 Z', dk) +
      h.r(-15, -29, 30, 3, 1, lt) + h.l('M-8 -28 Q-8 -40 0 -40 Q8 -40 8 -28', dk, 2) + h.r(-9, -20, 13, 10, 2, T(col, 0.3), { opacity: '.6' });
    return out;
  };
  P.basket = function (o) {
    var col = o.colour || '#b98a52', dk = T(col, -0.25), lt = T(col, 0.18);
    var out = h.shadow(44) + h.l('M-17 -18 Q-17 -42 0 -42 Q17 -42 17 -18', dk, 3.4) + h.l('M-16 -20 Q-16 -40 0 -40', lt, 1.2, { opacity: '.6' });
    if (o.full !== false) {
      var f = o.fill || '#c0453a';
      out += h.c(-9, -19, 6, f) + h.c(3, -20, 6.5, T(f, 0.08)) + h.c(11, -18, 5.5, T(f, -0.1)) + h.c(-3, -24, 5.5, T(f, 0.12)) +
        h.c(-10, -21, 1.6, '#fff', { opacity: '.4' }) + h.c(2, -23, 1.8, '#fff', { opacity: '.4' }) + h.l('M3 -26 l1 -3 M-3 -29 l1 -3', '#5b4030', 1.2) + h.e(6, -29, 2.4, 1.2, '#6f9a4a');
    }
    out += h.p('M-20 -18 H20 L16 -2 Q15 0 12 0 H-12 Q-15 0 -16 -2 Z', col) + h.p('M8 -18 H20 L16 -2 Q15 0 12 0 H6 Z', dk, { opacity: '.6' }) +
      h.l('M-19 -13 H19 M-18 -8 H18 M-17 -3 H16', dk, 1.2, { opacity: '.7' }) +
      h.l('M-12 -18 V0 M-4 -18 V0 M4 -18 V0 M12 -18 V0', lt, 1, { opacity: '.5' }) + h.r(-21, -20, 42, 4, 2, lt);
    return out;
  };

  /* ---------- books, maps, pens, clock, lamp ---------- */
  P.book = function (o) {
    var col = o.colour || '#4f6d8a';
    if (o.open) {
      return h.shadow(40) + h.p('M-19 -3 Q-10 -6 0 -2 Q10 -6 19 -3 L20 0 H-20 Z', T(col, -0.15)) +
        h.p('M0 -3 Q-8 -16 -18 -13 L-19 -3 Q-10 -6 0 -2 Z', '#f6f1e6') + h.p('M0 -3 Q8 -16 18 -13 L19 -3 Q10 -6 0 -2 Z', '#ebe3d4') +
        h.l('M-15 -11 q6 -1 11 2 M-15 -8 q6 -1 11 2 M4 -9 q5 -3 11 -2 M4 -6 q5 -3 11 -2', '#a99f8f', 0.8) + h.l('M0 -3 V-2', '#a99f8f', 1);
    }
    return h.shadow(30) + h.r(-14, -10, 28, 10, 1.5, col) + h.r(-12, -8, 25, 6, 0.8, '#f3ecdf') + h.l('M-11 -6 H12 M-11 -4 H12', '#d6cdbd', 0.6) +
      h.r(-14, -10, 28, 2.4, 1, T(col, 0.2)) + h.r(-14, -2, 28, 2, 1, T(col, -0.2)) + h.r(-15, -10, 3, 10, 1.4, T(col, -0.15)) + h.r(6, -10, 2, 4, 0.4, '#e2b84f');
  };
  P.map = function (o) {
    var paper = '#efe3c4', land = '#b9c98f', water = '#8fb6c9';
    var xs = [-24, -12, 0, 12, 24], out = h.shadow(52);
    for (var i = 0; i < 4; i++) {
      var x0 = xs[i], x1 = xs[i + 1], up = i % 2 ? 2 : 0, dn = i % 2 ? 0 : 2;
      out += h.p('M' + x0 + ' ' + (-30 - up) + ' L' + x1 + ' ' + (-30 - dn) + ' L' + x1 + ' ' + (-dn) + ' L' + x0 + ' ' + (-up) + ' Z', i % 2 ? T(paper, -0.08) : paper);
    }
    out += h.p('M-21 -26 Q-10 -30 -2 -24 Q8 -18 20 -24 L21 -6 Q10 -2 0 -8 Q-12 -12 -21 -4 Z', land, { opacity: '.85' }) +
      h.e(6, -15, 6, 4, water) + h.p('M-24 -14 Q-18 -16 -14 -10 L-12 -3 L-24 -2 Z', water) +
      h.c(-9, -21, 2.4, '#5f8a4a') + h.c(-5, -23, 2, '#5f8a4a') + h.c(15, -21, 2.2, '#5f8a4a') +
      h.l('M-14 -8 q4 -6 8 -4 q4 2 2 -6 q-1 -4 4 -6', '#b2493a', 1, { 'stroke-dasharray': '1.6 1.8' }) + h.l('M10 -26 l3 3 M13 -26 l-3 3', '#b2493a', 1.3) +
      h.l('M-12 -30 V0 M12 -30 V0', '#000', 0.6, { opacity: '.15' });
    return out;
  };
  P.pen = function (o) {
    var col = o.colour || '#3f5a7a';
    return h.shadow(24) + h.p('M-12 -3.6 H8 L12 -2 L8 -0.4 H-12 Q-13 -2 -12 -3.6 Z', col) + h.p('M8 -3.6 L12 -2 L8 -0.4 Z', '#d9c7a4') + h.c(11.6, -2, 0.5, '#2a2a2a') +
      h.r(-12, -4, 8, 4, 1.5, T(col, -0.25)) + h.r(-9, -5.2, 7, 1.2, 0.5, '#c9a24a') + h.r(-11, -3.4, 18, 0.8, 0.4, '#fff', { opacity: '.4' });
  };
  P.clock = function (o) {
    var rim = o.colour || '#8a5e3f', face = '#f8f3e8', ticks = '';
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6, r1 = i % 3 ? 10.5 : 9.5; ticks += h.l('M' + (Math.sin(a) * r1).toFixed(1) + ' ' + (-15 - Math.cos(a) * r1).toFixed(1) + ' L' + (Math.sin(a) * 11.6).toFixed(1) + ' ' + (-15 - Math.cos(a) * 11.6).toFixed(1), '#5a4a3a', i % 3 ? 0.7 : 1.3); }
    var hr = o.hour === undefined ? 3 : o.hour, ha = hr * Math.PI / 6, ma = (o.min || 0) * Math.PI / 30;
    return h.c(1.6, -13.6, 15, '#26301c', { opacity: '.15' }) +
      h.c(0, -15, 15, rim) + h.p('M-12 -24 A15 15 0 0 1 10 -26', 'none', { stroke: T(rim, 0.3), 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.8' }) +
      h.c(0, -15, 12.5, face) + ticks +
      h.l('M0 -15 L' + (Math.sin(ha) * 6).toFixed(1) + ' ' + (-15 - Math.cos(ha) * 6).toFixed(1), '#2b231c', 1.8) +
      h.l('M0 -15 L' + (Math.sin(ma) * 9.5).toFixed(1) + ' ' + (-15 - Math.cos(ma) * 9.5).toFixed(1), '#2b231c', 1.1) + h.c(0, -15, 1.3, '#b2493a');
  };
  P.lamp = function (o, c) {
    var sh = o.colour || '#e6cf9a', base = '#5a4a3e', lit = o.lit;
    var g = c.id + 'lamp' + o.i, out = '';
    if (lit) out += '<radialGradient id="' + g + '"><stop offset="0" stop-color="#ffe9b0" stop-opacity=".75"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/></radialGradient>' + h.c(0, -58, 46, 'url(#' + g + ')');
    out += h.shadow(30) + h.e(0, -2, 12, 3.5, base) + h.e(0, -3.5, 9, 2, T(base, 0.25)) + h.r(-1.6, -60, 3.2, 58, 1.5, '#7a6656') + h.r(-1, -60, 1, 56, 0.5, '#b9a594') + h.e(0, -30, 2.6, 1.6, '#8f7a68') +
      h.p('M-11 -86 H11 L18 -60 H-18 Z', sh) + h.p('M4 -86 H11 L18 -60 H9 Z', T(sh, -0.14)) + h.r(-18, -61, 36, 2.4, 1, T(sh, -0.25)) + h.r(-11, -87, 22, 2, 1, T(sh, -0.25));
    if (lit) out += h.p('M-11 -86 H11 L18 -60 H-18 Z', '#fff4cf', { opacity: '.45' }) + h.e(0, -60, 16, 2.4, '#fff4cf', { opacity: '.9' });
    return out;
  };

  /* ---------- toys and play ---------- */
  P.ball = function (o) {
    var col = o.colour || '#c0573e', band = o.band || '#f2e6d0';
    return h.shadow(22) + h.c(0, -10, 10, col) + h.p('M-9.9 -11.5 Q0 -6 9.9 -11.5 L9.7 -7.6 Q0 -1.6 -9.7 -7.6 Z', band) +
      h.p('M4 -19.2 A10 10 0 0 1 -6 -2 A11 11 0 0 0 4 -19.2 Z', '#000', { opacity: '.16' }) + h.e(-4.4, -15, 3.2, 2, '#fff', { opacity: '.5' });
  };
  P.blocks = function (o) {
    var cols = o.colours || ['#c0573e', '#4f6d8a', '#d8a35a'], letters = o.letters || ['a', 'b', 'c'];
    function blk(x, y, col, ch) {
      return h.r(x, y, 16, 16, 1.5, col) + h.p('M' + (x + 16) + ' ' + y + ' l4 -3 v16 l-4 3 Z', T(col, -0.25)) + h.p('M' + x + ' ' + y + ' l4 -3 h16 l-4 3 Z', T(col, 0.25)) +
        h.r(x + 2.5, y + 2.5, 11, 11, 1.5, T(col, 0.75)) +
        '<text x="' + (x + 8) + '" y="' + (y + 12) + '" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="10" fill="' + T(col, -0.2) + '">' + ch + '</text>';
    }
    return h.shadow(46) + blk(-19, -16, cols[0], letters[0]) + blk(-1, -16, cols[1], letters[1]) + blk(-10, -35, cols[2], letters[2]);
  };
  P.drum = function (o) {
    var col = o.colour || '#b2493a', rim = '#e8dcc4', dk = T(col, -0.25);
    var zz = 'M-15 -24 L-10 -5 L-5 -24 L0 -5 L5 -24 L10 -5 L15 -24';
    return h.shadow(40) + h.p('M-17 -26 H17 V-4 Q17 0 0 0 Q-17 0 -17 -4 Z', col) + h.p('M8 -26 H17 V-4 Q16 -1 8 -0.5 Z', dk) + h.p('M-14 -22 V-6', 'none', { stroke: T(col, 0.3), 'stroke-width': '2.5', 'stroke-linecap': 'round', opacity: '.7' }) +
      h.l(zz, '#f2e6d0', 1, { opacity: '.9' }) + h.r(-17.5, -7, 35, 3.4, 1.7, rim) + h.r(-17.5, -27.5, 35, 3.4, 1.7, rim) +
      h.e(0, -28, 17, 3.6, '#efe6d2') + h.e(-3, -28.6, 9, 1.4, '#fffaf0') +
      h.l('M6 -30 L22 -42', '#9a7656', 2) + h.c(22.5, -42.5, 2, '#d8c4a4') + h.l('M-8 -30 L-22 -40', '#8a6646', 2) + h.c(-22.5, -40.5, 2, '#c9b28e');
  };
  P.bell = function (o) {
    var col = o.colour || '#c9a24a', lt = T(col, 0.35), dk = T(col, -0.25);
    return h.shadow(30) + h.r(-3, -30, 6, 10, 2.5, '#6b4a33') + h.e(0, -30, 4.2, 2.6, '#7d5a40') + h.r(-1.4, -29, 1.4, 8, 0.7, '#9a7656') +
      h.p('M-4 -21 Q-10 -20 -10 -12 Q-10 -6 -13 -3 Q-14 0 -10 0 H10 Q14 0 13 -3 Q10 -6 10 -12 Q10 -20 4 -21 Z', col) +
      h.p('M3 -21 Q10 -20 10 -12 Q10 -6 13 -3 Q14 0 10 0 H5 Q8 -6 7 -12 Q6 -18 3 -21 Z', dk) +
      h.p('M-6 -17 Q-8 -10 -9 -5', 'none', { stroke: lt, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.9' }) + h.r(-13, -3, 26, 3, 1.5, dk) + h.c(0, 0.6, 2.2, '#5a4a3a');
  };

  /* ---------- clothes ---------- */
  P.mitt = function (o) {
    var col = o.colour || '#b2493a', cuff = o.cuff || '#f2e6d0', dk = T(col, -0.2), lt = T(col, 0.3);
    return h.shadow(22) + h.p('M4 -9 Q6 -15 10 -14 Q13 -13 11 -8 L7 -5 Z', dk) +
      h.p('M-7 -5 V-15 Q-7 -22 0 -22 Q7 -22 7 -15 V-5 Z', col) + h.p('M2 -21.6 Q7 -21 7 -15 V-5 H3 Q5 -14 2 -21.6 Z', dk) +
      h.r(-6, -14, 12, 3, 1, lt, { opacity: '.85' }) + h.l('M-4 -12.5 h1 M0 -12.5 h1 M4 -12.5 h0.6', col, 1) +
      h.p('M-5 -19 Q-5 -20.6 -3 -20.8', 'none', { stroke: lt, 'stroke-width': '1.2', 'stroke-linecap': 'round' }) +
      h.r(-8, -6, 16, 6, 2, cuff) + h.l('M-5.5 -5.5 V-0.5 M-2 -5.5 V-0.5 M1.5 -5.5 V-0.5 M5 -5.5 V-0.5', T(cuff, -0.15), 0.8);
  };
  P.hat = function (o) {
    var col = o.colour || '#7a5c48', band = o.band || '#c96a5a', dk = T(col, -0.22), lt = T(col, 0.2);
    return h.shadow(32) + h.e(0, -3, 16, 3.6, dk) + h.e(0, -3.6, 15, 2.6, col) +
      h.p('M-9 -4 Q-10 -15 -7 -17 Q0 -20 7 -17 Q10 -15 9 -4 Z', col) + h.p('M3 -18.5 Q8 -17 9 -12 Q10 -8 9 -4 H4 Q6 -12 3 -18.5 Z', dk) +
      h.p('M-3 -18.6 Q0 -16 3 -18.6', 'none', { stroke: dk, 'stroke-width': '1.2' }) + h.p('M-9 -9 Q0 -7.5 9 -9 L9 -5.5 Q0 -4 -9 -5.5 Z', band) +
      h.p('M-7 -15 Q-8 -10 -7 -9', 'none', { stroke: lt, 'stroke-width': '1.6', 'stroke-linecap': 'round', opacity: '.8' });
  };
  P.toque = function (o) {
    var col = o.colour || '#c0573e', cuff = T(col, 0.28), pom = o.pom || '#f4efe6';
    return h.shadow(26) + h.p('M-11 -4 Q-12 -18 0 -19 Q12 -18 11 -4 Z', col) + h.p('M4 -18 Q12 -16 11 -4 H5 Q8 -12 4 -18 Z', T(col, -0.2)) +
      h.l('M-6 -16 V-6 M-2 -18 V-6 M2 -18 V-6 M6 -16 V-6', T(col, -0.12), 0.9) +
      h.r(-12, -7, 24, 7, 3, cuff) + h.l('M-9 -6 V-1 M-5 -6 V-1 M-1 -6 V-1 M3 -6 V-1 M7 -6 V-1', T(cuff, -0.12), 0.9) +
      h.c(0, -21, 4.6, pom) + h.c(1.4, -20, 3, T(pom, -0.08)) + h.c(-1.4, -22.4, 1.4, '#fff');
  };

  /* ---------- odds and ends ---------- */
  P.coin = function (o) {
    var col = o.colour || '#d1a93f', dk = T(col, -0.25);
    return h.shadow(10) + h.e(0.8, -4, 3.4, 4, dk) + h.c(0, -4, 4, col) + h.c(0, -4, 3, T(col, -0.08)) +
      h.p('M-1.8 -3.4 Q0 -5.2 1.4 -4.3 l0.9 -0.5 l-0.2 0.9 Q0 -2.6 -1.8 -3.4 Z', dk) + h.p('M-3 -5.6 Q-2 -7.2 0 -7.4', 'none', { stroke: '#fff3c4', 'stroke-width': '0.8', 'stroke-linecap': 'round' });
  };
  P.bone = function (o) {
    var col = o.colour || '#efe6d2', dk = T(col, -0.14);
    return h.shadow(22) + h.r(-8, -6, 16, 4, 2, col) + h.c(-9, -6.5, 2.6, col) + h.c(-9.5, -2.6, 2.6, dk) + h.c(9, -6.5, 2.6, col) + h.c(9.5, -2.6, 2.6, dk) +
      h.r(-7, -5.4, 14, 1, 0.5, '#fff', { opacity: '.7' }) + h.r(-8, -3, 16, 1.4, 0.7, dk, { opacity: '.6' });
  };
  P.rope = function (o) {
    var col = o.colour || '#c9a874', dk = T(col, -0.25), lt = T(col, 0.25), out = h.shadow(34) + h.l('M10 -2 Q18 0 22 -2 Q25 -3 26 -1', col, 2.6);
    [[-2, 0, 14], [-5, 0, 13], [-8, 0, 12], [-11, 0, 10]].forEach(function (r) {
      out += h.e(0, r[0], r[2], 3, dk) + h.e(0, r[0] - 0.8, r[2] - 0.4, 2.2, col) + h.p('M' + (-r[2] + 2) + ' ' + (r[0] - 1.6) + ' Q0 ' + (r[0] - 4.2) + ' ' + (r[2] - 3) + ' ' + (r[0] - 1.8), 'none', { stroke: lt, 'stroke-width': '0.9', opacity: '.8' });
    });
    return out + h.e(0, -11, 5, 1.4, T(col, -0.45)) + h.l('M-10 -3 l1 1.5 M-4 -4.2 l1 1.5 M4 -4.2 l1 1.5 M10 -3 l1 1.5 M-8 -9 l1 1.5 M0 -10.6 l1 1.5 M7 -9.4 l1 1.5', dk, 0.7);
  };
  P.net = function (o) {
    var frame = '#8a6646', mesh = o.colour || '#e8dcc4';
    var lines = 'M2 -54 Q4 -36 14 -26 M9 -56 Q10 -38 16 -24 M16 -57 Q17 -40 18 -24 M23 -56 Q22 -40 20 -26 M29 -53 Q28 -40 22 -28 M3 -48 Q14 -44 30 -48 M5 -40 Q14 -36 27 -40 M8 -33 Q15 -30 24 -33 M12 -27 Q17 -25 21 -27';
    return h.shadow(40) + h.l('M-14 0 L4 -46', frame, 3.2) + h.l('M-13 -3 L3 -43', T(frame, 0.3), 1, { opacity: '.7' }) +
      h.p('M2 -54 Q16 -60 30 -52 Q30 -38 18 -24 Q14 -26 6 -40 Z', mesh, { opacity: '.18' }) + h.l(lines, mesh, 0.9, { opacity: '.9' }) +
      h.e(16, -54.5, 14.5, 4, 'none', { stroke: '#6b4f38', 'stroke-width': '2.2' }) + h.p('M2 -54 Q16 -50 30 -53', 'none', { stroke: T('#6b4f38', 0.3), 'stroke-width': '1', opacity: '.8' });
  };
})();

/* Decodable readers' pictures: buildings, vehicles, boats, play things and places to stand on. */
(function () {
  var D = Atlas.decodable, h = D.art.h, P = D.art.parts;
  var TYRE = '#2f2a28', CHROME = '#d9d3c8', CREAM = '#f4ecd9', WOOD = '#9a7656', SNOW = '#f4f7fa';

  function night(c) { return c.time === 'night'; }
  function winter(c) { return c.season === 'winter'; }
  /* a pane of glass with a soft diagonal shine (warm light at night when lit) */
  function glass(x, y, w, hh, rx, c, lit) {
    var g = lit && (c.time === 'night' || c.time === 'dusk') ? '#f3d58c' : night(c) ? '#5d6f8c' : '#bcd3de';
    return h.r(x, y, w, hh, rx, g) + h.p('M' + (x + w * 0.12) + ' ' + (y + hh) + ' L' + (x + w * 0.5) + ' ' + y + ' H' + (x + w * 0.72) + ' L' + (x + w * 0.34) + ' ' + (y + hh) + ' Z', '#fff', { opacity: '.28' });
  }
  /* a house window: frame, glass, cross bars, sill */
  function win(x, y, w, hh, c, trim, extra) {
    return h.r(x - 3, y - 3, w + 6, hh + 6, 2, trim) + glass(x, y, w, hh, 1, c, true) + h.r(x + w / 2 - 1.2, y, 2.4, hh, 0, trim) + h.r(x, y + hh / 2 - 1.2, w, 2.4, 0, trim) +
      h.r(x - 5, y + hh + 2, w + 10, 4, 1.5, h.tint(trim, -0.12)) + (extra || '');
  }
  function flowerBox(x, y, w, c) {
    if (winter(c)) return '';
    var out = h.r(x, y, w, 6, 2, '#8a5a3e');
    for (var i = 0; i < 5; i++) out += h.c(x + 3 + i * (w - 6) / 4, y - 1, 2.8, i % 2 ? '#5f9446' : ['#e9a3b4', '#f2c94c', '#c8553d'][i % 3]);
    return out;
  }
  function wheel(x, y, r, rim) {
    return h.c(x, y, r, TYRE) + h.c(x, y, r * 0.58, rim || '#cfc9bf') + h.c(x, y, r * 0.42, h.tint(rim || '#cfc9bf', -0.18)) + h.c(x, y, r * 0.18, '#4a443f') +
      h.p('M' + (x - r * 0.7) + ' ' + (y - r * 0.45) + ' Q' + x + ' ' + (y - r * 1.05) + ' ' + (x + r * 0.7) + ' ' + (y - r * 0.45), 'none', { stroke: '#5a524c', 'stroke-width': String(num(r * 0.12)), 'stroke-linecap': 'round', opacity: '.8' });
  }
  function arch(x, y, r) { return h.p('M' + (x - r) + ' ' + y + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + y + ' Z', '#2a2420'); }
  function num(v) { return Math.round(v * 10) / 10; }
  function ripples(w, y) {
    return h.e(0, y + 2, w * 0.55, 4, '#24384f', { opacity: '.16' }) + h.l('M' + (-w * 0.5) + ' ' + (y + 2) + ' h' + (w * 0.22) + ' M' + (w * 0.05) + ' ' + (y + 4) + ' h' + (w * 0.3) + ' M' + (-w * 0.2) + ' ' + (y + 7) + ' h' + (w * 0.2), '#fff', 1.6, { opacity: '.6' });
  }
  function smoke(x, y, k) {
    k = k || 1;
    return h.c(x, y, 6 * k, '#e9e6e0', { opacity: '.75' }) + h.c(x + 7 * k, y - 11 * k, 8 * k, '#eeebe6', { opacity: '.6' }) + h.c(x + 18 * k, y - 22 * k, 10 * k, '#f2f0ec', { opacity: '.45' });
  }

  /* ---------- buildings ---------- */
  P.house = function (o, c) {
    var col = o.colour || '#c9845f', roof = o.roof || '#6e4a3d', trim = '#f4efe6', door = o.door || '#4f6d8a', dk = h.tint(col, -0.12);
    function rx(y, side) { return side * (92 - (-104 - y) / 66 * 30); }
    var out = h.shadow(200);
    out += h.r(36, -186, 16, 40, 1, '#8a5a4a') + h.r(33, -190, 22, 6, 1, '#6e4a3d') + (winter(c) ? h.r(33, -194, 22, 5, 2.5, SNOW) + smoke(46, -202) : '');
    out += h.r(-80, -110, 160, 104, 0, col);
    for (var y = -100; y < -10; y += 9) out += h.l('M-78 ' + y + ' H78', dk, 1, { opacity: '.55' });
    out += h.r(58, -110, 22, 104, 0, '#000', { opacity: '.07' }) + h.r(-82, -110, 5, 104, 0, trim) + h.r(77, -110, 5, 104, 0, trim);
    out += h.r(-84, -8, 168, 8, 1, '#8f8579') + h.r(-84, -8, 168, 2, 0, '#a59b8e');
    out += h.p('M-94 -104 L-62 -172 H62 L94 -104 Z', roof);
    for (var r = -115; r > -170; r -= 11) out += h.l('M' + num(rx(r, -1)) + ' ' + r + ' H' + num(rx(r, 1)), h.tint(roof, -0.2), 1.2, { opacity: '.7' });
    out += h.p('M-62 -172 H62 L66 -164 H-66 Z', h.tint(roof, 0.12)) + h.r(-96, -106, 192, 5, 2, h.tint(roof, -0.25)) + h.r(-80, -101, 160, 5, 0, '#000', { opacity: '.12' });
    /* a dormer with a round window */
    out += h.r(-14, -150, 28, 28, 1, col) + h.p('M-19 -148 L0 -164 L19 -148 Z', h.tint(roof, -0.1)) + h.c(0, -137, 7, trim) + h.c(0, -137, 5.2, night(c) || c.time === 'dusk' ? '#f3d58c' : '#bcd3de') + h.r(-0.8, -142, 1.6, 10, 0, trim);
    if (winter(c)) out += h.p('M-66 -166 L-62 -175 H62 L66 -166 Q44 -160 22 -166 Q0 -160 -24 -166 Q-46 -160 -66 -166 Z', SNOW) + h.p('M-21 -148 L0 -167 L21 -148 L16 -148 L0 -161 L-16 -148 Z', SNOW) +
      h.p('M-96 -104 Q-60 -100 -30 -104 Q10 -99 50 -104 Q76 -100 96 -104 V-100 H-96 Z', SNOW);
    [-62, -14, 34].forEach(function (x) { out += win(x, -96, 26, 24, c, trim, h.r(x - 10, -96, 6, 24, 1, h.tint(col, -0.38)) + h.r(x + 30, -96, 6, 24, 1, h.tint(col, -0.38))); });
    [-62, -22].forEach(function (x) { out += win(x, -54, 26, 26, c, trim, flowerBox(x - 3, -22, 32, c)); });
    out += h.r(19, -58, 32, 50, 2, trim) + h.r(23, -54, 24, 46, 2, door) + h.r(26, -51, 8, 18, 1, h.tint(door, -0.15)) + h.r(36, -51, 8, 18, 1, h.tint(door, -0.15)) +
      h.r(26, -29, 8, 16, 1, h.tint(door, -0.15)) + h.r(36, -29, 8, 16, 1, h.tint(door, -0.15)) + h.c(43, -32, 1.8, '#e2c26a');
    out += h.r(14, -6, 42, 6, 1, '#b5aa9b') + h.r(58, -48, 4, 7, 1.5, '#3b3632') + h.c(60, -40, 3, night(c) || c.time === 'dusk' ? '#f6dc94' : '#e9e1cf');
    return out;
  };

  P.hut = function (o, c) {
    var wood = o.colour || '#8a5a3a', roof = o.roof || '#4f4236', lit = night(c) || c.time === 'dusk';
    var out = h.shadow(190);
    out += h.r(34, -146, 18, 40, 1, '#8f8579') + h.r(36, -140, 6, 4, 1, '#a59b8e') + h.r(44, -128, 6, 4, 1, '#7a7066') + h.r(31, -150, 24, 6, 1, '#7a7066');
    if (o.smoke !== false && (winter(c) || o.smoke || lit)) out += smoke(46, -158);
    if (winter(c)) out += h.r(31, -154, 24, 5, 2.5, SNOW);
    for (var i = 0; i < 8; i++) {
      var y = -10 - (i + 1) * 9.6, t = i % 2 ? h.tint(wood, -0.08) : wood;
      out += h.r(-72, y, 144, 10, 5, t) + h.l('M-66 ' + num(y + 2.5) + ' H66', h.tint(wood, 0.22), 1.2, { opacity: '.6' }) + h.l('M-60 ' + num(y + 8) + ' H60', h.tint(wood, -0.3), 0.8, { opacity: '.5' });
      out += h.c(-74, y + 5, 5.4, '#c99c6e') + h.c(-74, y + 5, 2.4, '#a8784e') + h.c(74, y + 5, 5.4, '#c99c6e') + h.c(74, y + 5, 2.4, '#a8784e');
    }
    out += h.r(-76, -10, 152, 10, 2, '#7a7066') + h.r(-76, -10, 152, 3, 1, '#8f8579');
    out += h.p('M-92 -82 L-58 -132 H58 L92 -82 Z', roof);
    for (var r = -92; r > -130; r -= 9) out += h.l('M' + num(-92 + (-82 - r) / 50 * 34) + ' ' + r + ' H' + num(92 - (-82 - r) / 50 * 34), h.tint(roof, 0.14), 1.2, { opacity: '.6' });
    out += h.r(-94, -84, 188, 5, 2, h.tint(roof, -0.3)) + h.r(-72, -79, 144, 6, 0, '#000', { opacity: '.16' });
    if (winter(c)) out += h.p('M-62 -126 L-58 -136 H58 L62 -126 Q36 -118 10 -126 Q-20 -118 -62 -126 Z', SNOW) + h.p('M-94 -82 Q-50 -76 -10 -82 Q40 -76 94 -82 V-78 H-94 Z', SNOW);
    out += h.r(-48, -62, 32, 26, 1, '#6b4a30') + glass(-45, -59, 26, 20, 1, c, true) + h.r(-33, -59, 2, 20, 0, '#6b4a30') + h.r(-45, -50, 26, 2, 0, '#6b4a30') + h.r(-51, -36, 38, 4, 1, '#6b4a30');
    out += h.r(10, -62, 30, 52, 2, '#6b4a30') + h.r(13, -59, 24, 49, 1, '#83603f') + h.l('M19 -58 V-11 M25 -58 V-11 M31 -58 V-11', '#6b4a30', 0.9) + h.l('M15 -50 H35 M15 -22 H35', '#5d4029', 2.2) + h.c(33, -34, 1.6, '#e2c26a');
    out += h.r(4, -6, 42, 6, 2, h.tint(wood, -0.15));
    /* a woodpile at the side */
    var pile = '';
    [[-104, -6], [-94, -6], [-84, -6], [-99, -15], [-89, -15], [-94, -24]].forEach(function (p) { pile += h.c(p[0], p[1], 5, '#c99c6e') + h.c(p[0], p[1], 2, '#a8784e'); });
    return out + (o.pile === false ? '' : pile + (winter(c) ? h.e(-94, -29, 10, 3, SNOW) : ''));
  };

  P.tent = function (o, c) {
    var col = o.colour || '#c9733e', dk = h.tint(col, -0.15), lt = h.tint(col, 0.14);
    var out = h.shadow(140);
    out += h.l('M-40 -74 L-92 2 M22 -78 L74 2', '#e6dcc6', 0.9, { opacity: '.9' }) + h.r(-94, -2, 3, 5, 1, '#6b4f38') + h.r(72, -2, 3, 5, 1, '#6b4f38');
    out += h.p('M-72 0 L-40 -74 L22 -78 L-10 0 Z', col);
    out += h.p('M-62 -6 L-37 -66 M-48 -4 L-28 -60 M-34 -2 L-14 -66 M-22 -2 L4 -72', 'none', { stroke: lt, 'stroke-width': '1.3', opacity: '.5' });
    out += h.p('M-40 -74 L22 -78 L18 -72 L-38 -68 Z', lt);
    out += h.p('M-10 0 L22 -78 L56 0 Z', dk);
    out += h.p('M4 0 L22 -54 L40 0 Z', o.lit || night(c) ? '#e9b765' : '#3a2a22') + (o.lit || night(c) ? h.c(22, -12, 16, '#f6dc94', { opacity: '.35' }) : '');
    out += h.p('M22 -54 L4 0 L-2 0 Q8 -26 20 -58 Z', h.tint(col, -0.3)) + h.p('M22 -56 Q30 -30 40 -12 Q44 -6 46 0 L56 0 Z', h.tint(col, -0.05)) + h.r(40, -20, 7, 2.4, 1, '#e6dcc6');
    out += h.r(21, -84, 2.4, 8, 1, '#6b4f38');
    if (winter(c)) out += h.p('M-40 -76 L22 -80 L28 -66 Q22 -70 18 -70 Q0 -68 -36 -66 Q-40 -70 -40 -76 Z', SNOW) + h.p('M22 -80 L30 -62 L27 -60 L22 -70 L16 -60 L14 -62 Z', SNOW);
    return out;
  };

  P.shed = function (o, c) {
    var col = o.colour || '#a54b3c', roof = o.roof || '#4f4236', trim = '#f2e6d0', dk = h.tint(col, -0.14);
    var out = h.shadow(120);
    out += h.r(-50, -64, 100, 64, 0, col) + h.p('M-50 -64 L0 -94 L50 -64 Z', col);
    for (var x = -42; x < 50; x += 8) out += h.l('M' + x + ' -' + (x < 0 ? num(66 + (50 + x) * 0.58) : num(66 + (50 - x) * 0.58)) + ' V-2', dk, 1, { opacity: '.6' });
    out += h.r(30, -64, 20, 64, 0, '#000', { opacity: '.07' });
    out += h.p('M-62 -60 L0 -100 L62 -60 L54 -60 L0 -92 L-54 -60 Z', roof) + h.p('M-54 -60 L0 -92 L54 -60 L50 -57 L0 -88 L-50 -57 Z', '#000', { opacity: '.15' });
    if (winter(c)) out += h.p('M-64 -60 L0 -102 L64 -60 L56 -57 Q30 -78 0 -94 Q-30 -78 -56 -57 Z', SNOW);
    out += h.c(0, -72, 7, trim) + h.c(0, -72, 5.2, night(c) ? '#f3d58c' : '#bcd3de') + h.r(-0.8, -77, 1.6, 10, 0, trim);
    out += h.r(-28, -56, 56, 56, 1, trim) + h.r(-25, -53, 24, 53, 1, dk) + h.r(1, -53, 24, 53, 1, dk);
    out += h.l('M-24 -51 L-3 -2 M24 -51 L3 -2 M-24 -51 H-3 M-24 -2 H-3 M3 -51 H24 M3 -2 H24 M-24 -27 H-3 M3 -27 H24', trim, 2.4);
    out += h.r(-4, -32, 2, 8, 1, '#3b3632') + h.r(2, -32, 2, 8, 1, '#3b3632');
    if (!winter(c)) out += h.e(-58, -6, 10, 8, '#5f8a4a') + h.e(-50, -4, 8, 6, '#6f9a52') + h.c(-60, -10, 2.4, '#f2c94c') + h.c(-53, -7, 2.4, '#e9a3b4');
    return out;
  };

  P.stall = function (o, c) {
    var col = o.colour || '#c0573e', wood = '#a07a52', dk = h.tint(wood, -0.2);
    var out = h.shadow(170);
    out += h.r(-78, -138, 6, 138, 1, dk) + h.r(72, -138, 6, 138, 1, dk);
    out += h.r(-74, -56, 148, 52, 1, wood);
    for (var x = -62; x < 74; x += 12) out += h.l('M' + x + ' -54 V-6', dk, 1, { opacity: '.6' });
    out += h.r(-82, -62, 164, 8, 2, h.tint(wood, 0.15)) + h.r(-82, -55, 164, 3, 0, '#000', { opacity: '.15' }) + h.r(-76, -6, 152, 6, 1, dk);
    var fruit = [['#c0453a', '#d8695b'], ['#e8923a', '#f2b062'], ['#a8b84f', '#c4d06c']];
    [-50, 0, 50].forEach(function (cx, k) {
      var f = fruit[k], crate = h.tint(wood, 0.08);
      for (var row = 0; row < 3; row++) for (var j = 0; j < 5 - row; j++) {
        var fx = cx - 16 + row * 4 + j * 8, fy = -74 - row * 6;
        out += h.c(fx, fy, 5, f[0]) + h.c(fx - 1.6, fy - 1.6, 1.6, f[1]);
      }
      out += h.p('M' + (cx - 22) + ' -76 H' + (cx + 22) + ' L' + (cx + 20) + ' -62 H' + (cx - 20) + ' Z', crate) + h.l('M' + (cx - 21) + ' -70 H' + (cx + 21), h.tint(crate, -0.2), 1);
      if (k === 0) out += h.l('M' + (cx - 6) + ' -95 l1 -4', '#5b3a24', 1.2);
    });
    /* awning: stripes and a scalloped hem */
    var aw = '<clipPath id="' + c.id + 'stall' + o.i + '"><path d="M-80 -150 H80 L92 -118 H-92 Z"/></clipPath>', st = '';
    for (var i = -6; i < 6; i++) st += h.p('M' + (i * 16) + ' -152 H' + (i * 16 + 8) + ' L' + (i * 16 + 8 * 1.18) + ' -116 H' + (i * 16 * 1.15) + ' Z', CREAM);
    out += aw + h.p('M-80 -150 H80 L92 -118 H-92 Z', col) + h.g(st, '', { 'clip-path': 'url(#' + c.id + 'stall' + o.i + ')' });
    for (var k2 = 0; k2 < 11; k2++) { var sx = -92 + k2 * 16.7 + 8.3; out += h.p('M' + num(sx - 8.3) + ' -118 A8.3 7 0 0 0 ' + num(sx + 8.3) + ' -118 Z', k2 % 2 ? CREAM : col); }
    out += h.r(-82, -154, 164, 6, 2, h.tint(col, -0.3)) + h.p('M-92 -118 H92 L90 -114 H-90 Z', '#000', { opacity: '.08' });
    if (winter(c)) out += h.r(-83, -158, 166, 6, 3, SNOW);
    out += h.p('M60 -4 L56 -26 H82 L78 -4 Z', '#c69a5c') + h.l('M58 -18 H80 M59 -11 H79', '#a27a44', 1) + h.c(64, -30, 5, '#c0453a') + h.c(73, -30, 5, '#d8695b');
    return out;
  };

  P.mailbox = function (o, c) {
    var col = o.colour || '#5d6b75';
    var out = h.shadow(30);
    out += h.r(-4, -46, 8, 46, 1, '#8a6a4a') + h.r(2, -46, 2, 46, 0, '#6b4f38') + h.r(-14, -48, 32, 5, 1, '#7a5a3e');
    out += h.p('M-20 -48 V-60 Q-20 -68 -12 -68 H16 Q22 -68 22 -60 V-48 Z', col) + h.p('M-18 -64 Q-14 -66 14 -66', 'none', { stroke: h.tint(col, 0.35), 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.8' });
    out += h.r(-20, -51, 42, 3, 0, h.tint(col, -0.2)) + h.p('M20 -48 V-62 Q20 -68 24 -68 V-48 Z', h.tint(col, -0.25)) + h.r(23, -60, 3, 4, 1, CHROME);
    out += o.flag === false ? h.r(-14, -56, 22, 3, 1, '#c0453a') : h.r(-12, -78, 3, 24, 1, '#a33a30') + h.r(-12, -78, 13, 8, 1, '#c0453a');
    if (winter(c)) out += h.p('M-22 -64 Q-18 -72 -10 -72 H16 Q24 -72 24 -62 Q14 -68 0 -66 Q-14 -68 -22 -64 Z', SNOW);
    else out += h.l('M-8 0 l-3 -7 M-4 0 l1 -9 M5 0 l3 -8', '#5b7c3f', 1.6) + h.c(-10, -8, 2.4, '#f2c94c') + h.c(7, -9, 2.4, '#e9a3b4');
    return out;
  };

  /* ---------- vehicles ---------- */
  P.car = function (o) {
    var col = o.colour || '#b2493a', dk = h.tint(col, -0.2), lt = h.tint(col, 0.22);
    var out = h.shadow(140);
    out += h.p('M-68 -18 V-36 Q-68 -45 -58 -46 L-40 -48 L-24 -66 Q-20 -70 -12 -70 H22 Q30 -70 36 -64 L50 -48 L62 -46 Q70 -44 70 -34 V-18 Z', col);
    out += h.p('M-68 -30 H70 V-20 Q70 -16 66 -16 H-64 Q-68 -16 -68 -20 Z', dk);
    out += h.p('M-60 -44 L-40 -46 L50 -46 L60 -44', 'none', { stroke: lt, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.7' });
    out += h.p('M-34 -49 L-20 -64 H4 V-49 Z', '#bcd3de') + h.p('M9 -49 V-64 H22 Q27 -64 31 -60 L43 -49 Z', '#bcd3de') + h.p('M-26 -49 L-14 -64 H-6 L-18 -49 Z M14 -49 L20 -64 H25 L19 -49 Z', '#fff', { opacity: '.3' });
    out += h.r(4, -64, 5, 46, 0, h.tint(col, -0.08)) + h.r(-8, -42, 7, 2, 1, h.tint(col, -0.35)) + h.r(30, -42, 7, 2, 1, h.tint(col, -0.35));
    out += h.e(66, -38, 3.5, 4, '#f6e7b4') + h.r(-70, -40, 4, 7, 1.5, '#c94a3a') + h.r(-72, -24, 12, 5, 2, CHROME) + h.r(62, -24, 11, 5, 2, CHROME);
    out += arch(-40, -15, 17) + arch(44, -15, 17) + wheel(-40, -13, 13) + wheel(44, -13, 13);
    return out;
  };

  P.van = function (o) {
    var col = o.colour || '#7aa5c4', top = o.top || CREAM, dk = h.tint(col, -0.2);
    var out = h.shadow(150);
    out += h.p('M-74 -16 V-66 Q-74 -80 -60 -80 H38 Q56 -80 64 -62 L74 -40 V-16 Z', col);
    out += h.p('M-74 -48 V-66 Q-74 -80 -60 -80 H38 Q56 -80 64 -62 L71 -48 Z', top);
    out += h.r(-74, -50, 146, 4, 0, h.tint(top, -0.12)) + h.p('M-74 -24 H74 V-18 Q74 -16 72 -16 H-72 Q-74 -16 -74 -18 Z', dk);
    [-66, -40, -14].forEach(function (x) { out += h.r(x, -73, 22, 18, 3, '#bcd3de') + h.p('M' + (x + 4) + ' -55 L' + (x + 12) + ' -73 H' + (x + 17) + ' L' + (x + 9) + ' -55 Z', '#fff', { opacity: '.3' }); });
    out += h.p('M16 -73 H40 Q52 -73 58 -60 L62 -55 H16 Z', '#bcd3de') + h.p('M28 -55 L36 -73 H41 L33 -55 Z', '#fff', { opacity: '.3' });
    out += h.l('M12 -44 V-20 M-20 -44 V-20', h.tint(col, -0.3), 1) + h.r(4, -40, 6, 2, 1, h.tint(col, -0.4));
    out += h.e(70, -34, 3.5, 4.5, '#f6e7b4') + h.r(-76, -24, 10, 6, 2, CHROME) + h.r(68, -24, 10, 6, 2, CHROME) + h.r(-72, -42, 3, 7, 1, '#c94a3a');
    out += h.r(-64, -84, 92, 4, 2, '#6b6560') + (o.load ? h.r(-58, -94, 70, 10, 3, o.load === true ? '#c9733e' : o.load) : '');
    out += arch(-44, -16, 17) + arch(46, -16, 17) + wheel(-44, -14, 14) + wheel(46, -14, 14);
    return out;
  };

  P.bus = function (o, c) {
    var city = !!o.city, col = o.colour || (city ? '#3f7f86' : '#e3a72f'), dk = h.tint(col, -0.18), out = h.shadow(250);
    if (city) {
      out += h.p('M-128 -18 V-100 Q-128 -108 -120 -108 H116 Q126 -108 126 -98 V-18 Z', col) + h.r(-128, -108, 254, 22, 0, CREAM) + h.p('M-120 -108 H116 Q126 -108 126 -98 V-86 H-128 V-100 Q-128 -108 -120 -108 Z', CREAM);
      out += h.r(-70, -114, 80, 7, 3, '#cfc9bf');
      out += h.p('M-128 -32 H126 V-20 Q126 -16 122 -16 H-124 Q-128 -16 -128 -20 Z', dk);
      [-120, -84, -48, 26].forEach(function (x) { out += glass(x, -82, 30, 28, 2, c); });
      out += h.r(-16, -82, 30, 64, 2, '#5a6b72') + glass(-13, -80, 11, 58, 1, c) + h.r(1, -80, 11, 58, 1, '#bcd3de') + glass(1, -80, 11, 58, 1, c);
      out += h.r(66, -82, 30, 64, 2, '#5a6b72') + glass(69, -80, 11, 58, 1, c) + glass(83, -80, 11, 58, 1, c);
      out += h.p('M104 -84 H126 V-40 H110 Q104 -40 104 -46 Z', '#bcd3de') + h.r(98, -104, 26, 10, 2, '#2f2a28') + h.r(102, -101, 18, 4, 1, '#e8b85a');
      out += h.e(122, -28, 3.5, 3, '#f6e7b4') + h.r(-130, -50, 3, 8, 1, '#c94a3a');
      out += arch(-82, -18, 19) + arch(80, -18, 19) + wheel(-82, -16, 16) + wheel(80, -16, 16);
      return out;
    }
    out += h.p('M-128 -18 V-100 Q-128 -110 -118 -110 H72 Q82 -110 82 -100 V-18 Z', col);
    out += h.p('M78 -64 H104 Q120 -62 122 -48 V-18 H78 Z', col) + h.r(118, -50, 6, 22, 2, '#3b3632') + h.e(110, -54, 4, 3, '#f6e7b4');
    out += h.r(-128, -110, 210, 4, 2, h.tint(col, 0.25)) + h.r(-122, -114, 8, 5, 2, '#d9774b') + h.r(66, -114, 8, 5, 2, '#d9774b');
    for (var x = -120; x < 40; x += 27) out += glass(x, -96, 22, 22, 2, c);
    out += h.r(-128, -66, 210, 3, 0, '#2f2a28') + h.r(-128, -54, 210, 3, 0, '#2f2a28') + h.r(-128, -42, 250, 3, 0, '#2f2a28');
    out += h.r(48, -98, 28, 78, 2, '#3b3632') + glass(51, -95, 10, 72, 1, c) + glass(63, -95, 10, 72, 1, c);
    out += h.p('M78 -96 H82 V-66 H78 Z', '#bcd3de') + h.r(82, -86, 6, 3, 1, '#3b3632') + h.r(86, -92, 4, 10, 1.5, '#3b3632');
    out += h.p('M-128 -30 H124 V-20 Q124 -16 120 -16 H-124 Q-128 -16 -128 -20 Z', dk) + h.r(-130, -26, 12, 6, 2, '#3b3632') + h.r(116, -26, 10, 6, 2, '#3b3632') + h.r(-130, -60, 3, 8, 1, '#c94a3a');
    out += arch(-88, -18, 19) + arch(98, -18, 19) + wheel(-88, -16, 16) + wheel(98, -16, 16);
    return out;
  };

  P.truck = function (o, c) {
    var col = o.colour || '#3f6f8a', dk = h.tint(col, -0.2), lt = h.tint(col, 0.2), out = h.shadow(190);
    out += h.r(-94, -64, 92, 40, 3, col) + h.r(-94, -66, 92, 5, 2, lt) + h.r(-94, -32, 92, 8, 0, dk) + h.l('M-48 -60 V-34', dk, 1.2, { opacity: '.7' });
    var load = o.load;
    if (load === 'hay') out += h.r(-88, -84, 38, 22, 3, '#d9b45a') + h.r(-48, -84, 38, 22, 3, '#cfa94f') + h.r(-70, -102, 38, 20, 3, '#dcbb66') + h.l('M-80 -84 v22 M-60 -84 v22 M-40 -84 v22 M-20 -84 v22 M-62 -102 v20 M-42 -102 v20', '#b8913c', 1.2);
    if (load === 'boxes') out += h.r(-88, -88, 30, 26, 2, '#c69a5c') + h.r(-54, -82, 26, 20, 2, '#b88a4e') + h.r(-80, -106, 24, 18, 2, '#d0a66a') + h.l('M-73 -88 v26 M-41 -82 v20', '#9a7240', 1.2);
    if (load === 'pumpkins') [[-80, -70], [-62, -70], [-44, -70], [-26, -70], [-70, -82], [-50, -82]].forEach(function (p) { out += h.e(p[0], p[1], 9, 8, '#d9772e') + h.e(p[0] - 3, p[1], 3, 7, '#e8924a') + h.r(p[0] - 1, p[1] - 11, 2, 4, 1, '#5b6b2f'); });
    if (load === 'tree') out += h.p('M-90 -66 L-30 -96 L-10 -66 Z', '#3f6650') + h.p('M-80 -66 L-30 -88 L-20 -70 Z', '#4f7a5a') + h.r(-14, -70, 8, 6, 1, '#6b4c35');
    out += h.p('M-4 -24 V-86 Q-4 -96 6 -96 H34 Q44 -96 48 -86 L56 -60 H86 Q98 -60 98 -46 V-24 Z', col);
    out += h.p('M4 -88 H32 Q38 -88 40 -82 L46 -62 H4 Z', '#bcd3de') + h.p('M12 -62 L22 -88 H28 L18 -62 Z', '#fff', { opacity: '.3' });
    out += h.p('M-4 -92 Q16 -96 38 -94', 'none', { stroke: lt, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.7' }) + h.r(30, -54, 7, 2, 1, h.tint(col, -0.4));
    out += h.r(94, -54, 6, 24, 2, CHROME) + h.c(88, -52, 5, '#f6e7b4') + h.c(88, -52, 6.5, CHROME, { opacity: '.5' });
    out += h.p('M-4 -36 H98 V-26 Q98 -22 94 -22 H-4 Z', dk) + h.r(-98, -28, 12, 6, 2, CHROME) + h.r(92, -28, 12, 6, 2, CHROME) + h.r(-96, -60, 3, 8, 1, '#c94a3a');
    out += h.p('M-80 -24 Q-80 -50 -56 -50 Q-32 -50 -32 -24 Z', dk) + h.p('M40 -24 Q40 -50 64 -50 Q88 -50 88 -24 Z', dk);
    out += wheel(-56, -17, 17) + wheel(64, -17, 17);
    return out;
  };

  P.tractor = function (o, c) {
    var col = o.colour || '#b2493a', dk = h.tint(col, -0.2), lt = h.tint(col, 0.2), rim = o.rim || '#e8d9b0', out = h.shadow(170);
    if (o.cab !== false) out += h.r(-58, -104, 5, 50, 1, '#3b3632') + h.r(-14, -104, 5, 50, 1, '#3b3632') + h.r(-66, -110, 62, 8, 3, col) + h.r(-66, -110, 62, 3, 1.5, lt) + (winter(c) ? h.r(-66, -114, 62, 5, 2.5, SNOW) : '');
    out += h.r(58, -92, 5, 34, 1.5, '#3b3632') + h.r(56, -95, 9, 4, 1, '#3b3632');
    out += h.p('M-14 -36 V-60 Q-14 -66 -8 -66 H70 Q84 -66 86 -52 L88 -36 Z', col) + h.p('M-10 -62 H70 Q80 -62 82 -54', 'none', { stroke: lt, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.7' });
    for (var g = 0; g < 4; g++) out += h.r(79, -58 + g * 5, 8, 2.4, 1, dk);
    out += h.l('M10 -64 V-38 M30 -64 V-38 M50 -64 V-38', dk, 1, { opacity: '.6' }) + h.r(-14, -40, 102, 6, 1, dk);
    out += h.r(-50, -78, 18, 6, 3, '#3b3632') + h.r(-36, -78, 5, 22, 2, '#3b3632') + h.l('M-12 -66 L-20 -82', '#3b3632', 2.4) + h.e(-21, -83, 7, 2, '#3b3632');
    /* big back wheel with tread */
    var tread = '';
    for (var t = 0; t < 16; t++) { var a = t / 16 * Math.PI * 2; tread += h.r(-3, -38, 6, 6, 1, TYRE, { transform: 'translate(-42 -36) rotate(' + num(a * 180 / Math.PI) + ')' }); }
    out += h.r(-20, -42, 92, 18, 3, '#4a443f') + h.r(40, -30, 30, 8, 2, '#3b3632') + h.r(-20, -42, 92, 3, 1, '#5a524c');
    out += tread + h.c(-42, -36, 34, TYRE) + h.c(-42, -36, 19, rim) + h.c(-42, -36, 15, h.tint(rim, -0.15)) + h.c(-42, -36, 6, '#4a443f') + h.c(-42, -36, 3, rim);
    out += h.p('M-84 -40 Q-84 -80 -42 -80 Q0 -80 0 -40 H-6 Q-6 -73 -42 -73 Q-78 -73 -78 -40 Z', col) + h.p('M-80 -50 Q-76 -76 -42 -77', 'none', { stroke: lt, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.7' });
    out += h.c(60, -17, 17, TYRE) + h.c(60, -17, 10, rim) + h.c(60, -17, 7, h.tint(rim, -0.15)) + h.c(60, -17, 3, '#4a443f');
    return out;
  };

  P.bike = function (o) {
    var col = o.colour || '#3f7f86', dk = h.tint(col, -0.2), out = h.shadow(90);
    function wh(x) {
      var sp = '';
      for (var i = 0; i < 6; i++) { var a = i / 6 * Math.PI; sp += 'M' + num(x + Math.cos(a) * 17) + ' ' + num(-19 + Math.sin(a) * 17) + ' L' + num(x - Math.cos(a) * 17) + ' ' + num(-19 - Math.sin(a) * 17) + ' '; }
      return h.c(x, -19, 18, 'none', { stroke: TYRE, 'stroke-width': '3.6' }) + h.c(x, -19, 15.5, 'none', { stroke: '#bdb6aa', 'stroke-width': '1.2' }) + h.l(sp, '#bdb6aa', 0.6) + h.c(x, -19, 2.4, '#8a847c');
    }
    out += wh(-32) + wh(34);
    out += h.l('M-32 -19 L0 -18 L-7 -44 M-32 -19 L-7 -42 M0 -18 L24 -42 M-6 -40 L24 -42', col, 3.4);
    out += h.l('M24 -44 L34 -19', dk, 3) + h.l('M24 -44 L21 -54 L30 -55', '#4a443f', 2.6) + h.l('M-7 -44 L-8 -48', '#4a443f', 2.4) + h.p('M-18 -51 Q-8 -54 0 -50 Q-6 -47 -18 -48 Z', '#3b3632');
    out += h.c(0, -18, 5, '#8a847c') + h.l('M0 -18 L4 -10', '#4a443f', 1.8) + h.r(1, -11, 7, 2.4, 1, '#3b3632') + h.l('M-32 -19 L0 -18', '#6b6560', 1, { opacity: '.6' });
    out += h.p('M-50 -26 Q-44 -38 -30 -38 Q-18 -38 -14 -30', 'none', { stroke: dk, 'stroke-width': '2.2', 'stroke-linecap': 'round' });
    if (o.basket) out += h.p('M30 -60 H46 L44 -48 H32 Z', '#c69a5c') + h.l('M31 -56 H45 M32 -52 H44', '#a27a44', 1) + (o.basket === true ? '' : h.c(36, -62, 3.5, '#c0453a') + h.c(41, -62, 3.5, '#e8923a'));
    return out;
  };

  P.wagon = function (o) {
    var col = o.colour || '#b2493a', dk = h.tint(col, -0.2), out = h.shadow(90);
    if (o.load === 'apples') [[-26, -36], [-16, -37], [-6, -36], [4, -37], [14, -36], [24, -36], [-20, -43], [-10, -44], [0, -43], [10, -44], [18, -42]].forEach(function (p) { out += h.c(p[0], p[1], 5, '#c0453a') + h.c(p[0] - 1.6, p[1] - 1.6, 1.5, '#d8695b'); });
    if (o.load === 'pumpkins') [[-20, -38], [4, -39], [24, -38]].forEach(function (p) { out += h.e(p[0], p[1], 11, 9, '#d9772e') + h.e(p[0] - 3, p[1], 3.5, 8, '#e8924a') + h.r(p[0] - 1, p[1] - 12, 2, 4, 1, '#5b6b2f'); });
    if (o.load === 'logs') [[-14, -36], [0, -36], [14, -36], [-7, -45], [7, -45]].forEach(function (p) { out += h.c(p[0], p[1], 6, '#c99c6e') + h.c(p[0], p[1], 2.4, '#a8784e'); });
    out += h.c(-30, -11, 9, h.tint(TYRE, 0.2)) + h.c(32, -11, 9, h.tint(TYRE, 0.2));
    out += h.r(-40, -34, 76, 18, 2, col) + h.r(-40, -36, 76, 4, 1.5, h.tint(col, 0.25)) + h.r(-40, -22, 76, 6, 0, dk) + h.l('M-14 -32 V-20 M10 -32 V-20', dk, 1, { opacity: '.6' });
    out += h.r(-34, -16, 66, 4, 1, '#3b3632');
    out += h.l('M36 -20 L58 -38', '#3b3632', 2.6) + h.r(54, -44, 4, 12, 2, '#3b3632', { transform: 'rotate(-50 56 -38)' });
    out += wheel(-26, -9, 9, '#cfc9bf') + wheel(28, -9, 9, '#cfc9bf');
    return out;
  };

  P.train = function (o, c) {
    var eng = o.colour || '#2f4a5a', car = o.car || '#b2493a', red = '#b2493a', out = '';
    out += h.r(-164, -4, 336, 3, 1, '#7b746b');
    for (var x = -160; x < 172; x += 14) out += h.r(x, -2, 8, 3, 0.5, '#6b4f38');
    out += h.e(0, 2, 168, 4, '#26301c', { opacity: '.18' });
    /* the car */
    out += h.r(-152, -24, 146, 8, 2, '#2f2a28') + h.r(-150, -76, 142, 54, 5, car) + h.p('M-154 -76 Q-79 -90 -4 -76 V-72 H-154 Z', h.tint(car, -0.3));
    out += h.r(-150, -38, 142, 6, 0, h.tint(car, -0.18)) + h.r(-150, -72, 142, 3, 0, h.tint(car, 0.2));
    for (var w = -140; w < -20; w += 26) out += glass(w, -66, 18, 20, 2, c, true);
    out += h.r(-6, -22, 12, 4, 1, '#3b3632');
    [-130, -110, -46, -26].forEach(function (x) { out += h.c(x, -13, 9, TYRE) + h.c(x, -13, 5, '#8a847c') + h.c(x, -13, 2, '#3b3632'); });
    /* the engine */
    out += h.r(6, -28, 146, 8, 2, '#2f2a28');
    out += h.r(8, -92, 44, 64, 3, eng) + h.r(4, -98, 52, 8, 3, h.tint(eng, -0.25)) + glass(14, -84, 18, 20, 2, c, true) + h.r(8, -54, 44, 4, 0, red);
    out += h.r(48, -66, 86, 38, 14, eng) + h.r(52, -62, 78, 5, 2.5, h.tint(eng, 0.2)) + h.r(124, -68, 16, 42, 4, h.tint(eng, -0.3));
    out += h.l('M72 -66 V-28 M98 -66 V-28', '#c9a24a', 2) + h.p('M76 -66 Q76 -78 86 -78 Q96 -78 96 -66 Z', h.tint(eng, 0.1)) + h.r(84, -82, 4, 5, 1, '#c9a24a');
    out += h.p('M114 -66 L110 -88 H130 L126 -66 Z', h.tint(eng, -0.3)) + h.r(108, -92, 24, 6, 2, h.tint(eng, -0.4));
    out += h.r(132, -78, 10, 10, 2, '#3b3632') + h.c(142, -73, 4, '#f6e7b4');
    out += h.p('M140 -26 L162 -4 H140 Z', red) + h.l('M144 -22 L150 -5 M150 -20 L156 -5', h.tint(red, -0.3), 1);
    [[30, -16, 12], [70, -18, 15], [104, -18, 15], [134, -11, 8]].forEach(function (wv) { out += h.c(wv[0], wv[1], wv[2], TYRE) + h.c(wv[0], wv[1], wv[2] * 0.72, red) + h.c(wv[0], wv[1], wv[2] * 0.28, '#3b3632'); });
    out += h.r(66, -22, 42, 4, 2, CHROME);
    if (o.smoke !== false) out += h.c(122, -100, 8, '#ebe8e3', { opacity: '.8' }) + h.c(108, -110, 11, '#efede9', { opacity: '.65' }) + h.c(88, -116, 13, '#f3f1ee', { opacity: '.5' }) + h.c(62, -118, 13, '#f6f4f1', { opacity: '.35' });
    return out;
  };

  /* ---------- on the water ---------- */
  P.canoe = function (o, c) {
    var col = o.colour || '#b2493a', dk = h.tint(col, -0.22), out = o.water ? ripples(160, -2) : h.shadow(150);
    out += h.p('M-72 -30 Q-50 -19 0 -17 Q50 -19 72 -30 Q40 -13 0 -12 Q-40 -13 -72 -30 Z', '#c79a6b');
    out += h.l('M-30 -18 V-14 M30 -18 V-14', '#a27a44', 2);
    if (o.paddle !== false) out += h.l('M-38 -34 L30 -12', '#b8915e', 2.4) + h.e(36, -10, 9, 4, '#a27a44', { transform: 'rotate(18 36 -10)' });
    out += h.p('M-76 -33 Q-72 -12 -50 -4 Q0 2 50 -4 Q72 -12 76 -33 Q60 -16 0 -12 Q-60 -16 -76 -33 Z', col);
    out += h.p('M-50 -4 Q0 2 50 -4 Q64 -8 70 -16 Q40 -6 0 -5 Q-40 -6 -70 -16 Q-64 -8 -50 -4 Z', dk);
    out += h.p('M-76 -33 Q-60 -16 0 -12 Q60 -16 76 -33', 'none', { stroke: '#e2c79a', 'stroke-width': '2.4', 'stroke-linecap': 'round' });
    out += h.p('M-60 -16 Q-30 -9 0 -8', 'none', { stroke: h.tint(col, 0.3), 'stroke-width': '1.6', 'stroke-linecap': 'round', opacity: '.6' });
    if (o.water) out += h.p('M-62 -3 Q0 3 62 -3 L66 0 Q0 6 -66 0 Z', '#5f8fae', { opacity: '.55' }) + h.l('M-70 0 q8 -3 16 0 M40 1 q10 -3 20 0', '#fff', 1.5, { opacity: '.7' });
    return out;
  };

  P.ship = function (o, c) {
    var col = o.colour || '#3f5a7a', sail = o.sail || CREAM, out = ripples(130, 0);
    out += h.r(2, -140, 3.4, 124, 1, '#7a5a3e') + h.p('M5 -140 L18 -136 L5 -132 Z', o.flag || '#c0573e');
    out += h.p('M1 -134 Q-22 -80 -48 -28 H1 Z', sail) + h.p('M1 -134 Q-10 -84 -14 -28 H1 Z', h.tint(sail, -0.06)) + h.l('M-6 -104 L1 -104 M-20 -78 L1 -78 M-34 -52 L1 -52', h.tint(sail, -0.15), 0.8);
    out += h.p('M8 -128 Q34 -76 56 -30 H8 Z', h.tint(sail, -0.04)) + h.p('M8 -128 Q22 -76 28 -30 H8 Z', h.tint(sail, 0.4), { opacity: '.6' }) + h.l('M8 -128 L58 -24', '#8a7a66', 0.7);
    out += h.l('M-50 -26 H4', '#7a5a3e', 2.4);
    out += h.r(-22, -28, 26, 9, 2, '#efe6d4') + h.c(-14, -24, 2, '#5d6f8c') + h.c(-5, -24, 2, '#5d6f8c');
    out += h.p('M-58 -20 H64 Q58 -4 42 2 H-44 Q-56 -4 -58 -20 Z', col) + h.p('M-58 -20 H64 L63 -15 H-57 Z', CREAM) + h.p('M-44 2 H42 Q52 -1 58 -8 H-54 Q-50 -1 -44 2 Z', h.tint(col, -0.25));
    out += h.p('M-50 0 Q0 6 50 0 L56 4 Q0 10 -56 4 Z', '#5f8fae', { opacity: '.5' });
    return out;
  };

  P.dock = function (o, c) {
    var wood = o.colour || '#a07a52', post = h.tint(wood, -0.32), out = '';
    out += h.l('M-80 4 h20 M-20 6 h30 M40 4 h24 M84 7 h20', '#fff', 1.5, { opacity: '.55' });
    [-104, -50, 4, 58, 104].forEach(function (x) { out += h.r(x - 4, -24, 8, 30, 1.5, post) + h.r(x - 4, -24, 3, 30, 1, h.tint(post, 0.18)) + h.e(x, 5, 8, 2, '#24384f', { opacity: '.25' }); });
    out += h.l('M-100 -10 L-54 -20 M-46 -10 L0 -20 M8 -10 L54 -20 M62 -10 L100 -20', post, 2);
    out += h.p('M-112 -30 H112 L110 -24 H-112 Z', h.tint(wood, 0.16)) + h.r(-112, -24, 224, 6, 0, wood);
    for (var x = -104; x < 112; x += 9) out += h.l('M' + x + ' -24 V-18', h.tint(wood, -0.25), 0.9);
    out += h.r(-112, -30, 224, 1.4, 0, h.tint(wood, 0.35)) + h.r(100, -36, 8, 18, 2, post) + h.r(100, -38, 8, 4, 2, h.tint(post, 0.2));
    out += h.l('M88 -18 V6 M96 -18 V6 M88 -10 H96 M88 -2 H96', '#8a847c', 1.4);
    if (o.rope !== false) out += h.e(-70, -30, 8, 2.6, 'none', { stroke: '#d6c08e', 'stroke-width': '2' }) + h.e(-70, -30, 4, 1.4, 'none', { stroke: '#c4ac78', 'stroke-width': '1.6' });
    if (winter(c)) out += h.p('M-112 -30 Q-60 -34 0 -31 Q60 -34 112 -30 V-28 H-112 Z', SNOW);
    return out;
  };

  P.bridge = function (o, c) {
    var out = '';
    if (o.water !== false) out += h.p('M-112 2 Q-90 -8 0 -9 Q90 -8 112 2 Q60 6 0 6 Q-60 6 -112 2 Z', night(c) ? '#2c3d63' : winter(c) ? '#cfdde8' : '#6fa3c0') + h.l('M-50 -2 h24 M10 0 h34 M-20 3 h16', '#fff', 1.4, { opacity: '.55' });
    if (o.wood) {
      var wd = o.colour || '#9a7656', dk = h.tint(wd, -0.28);
      out += h.r(-104, -26, 8, 28, 1, dk) + h.r(96, -26, 8, 28, 1, dk);
      out += h.p('M-150 -2 Q0 -62 150 -2 L150 6 Q0 -52 -150 6 Z', wd) + h.p('M-150 -2 Q0 -62 150 -2 L150 1 Q0 -58 -150 1 Z', h.tint(wd, 0.2));
      for (var i = -5; i <= 5; i++) { var px = i * 26, py = -32 + Math.pow(px / 150, 2) * 30 + (i === 0 ? 0 : 0); out += h.r(px - 2.2, py - 40, 4.4, 40, 1, dk); }
      out += h.p('M-134 -40 Q0 -100 134 -40', 'none', { stroke: dk, 'stroke-width': '4', 'stroke-linecap': 'round' }) + h.p('M-134 -22 Q0 -82 134 -22', 'none', { stroke: dk, 'stroke-width': '2.4', 'stroke-linecap': 'round' });
      if (winter(c)) out += h.p('M-150 -3 Q0 -64 150 -3 L150 -1 Q0 -60 -150 -1 Z', SNOW);
      return out;
    }
    var st = o.colour || '#a39484', id = c.id + 'bridge' + o.i;
    var body = 'M-150 2 V-36 Q0 -60 150 -36 V2 H96 Q94 -42 0 -44 Q-94 -42 -96 2 Z';
    out += '<clipPath id="' + id + '"><path d="' + body + '"/></clipPath>' + h.p(body, st);
    var stones = '';
    for (var r = 0; r < 7; r++) for (var k = 0; k < 16; k++) {
      var sx = -150 + k * 20 + (r % 2) * 10 - 10, sy = -60 + r * 9;
      stones += h.r(sx + 1, sy + 1, 18, 7, 2, h.tint(st, ((k * 7 + r * 3) % 5 - 2) * 0.05));
    }
    out += h.g(stones, '', { 'clip-path': 'url(#' + id + ')' });
    out += h.p('M-96 2 Q-94 -42 0 -44 Q94 -42 96 2 H88 Q86 -34 0 -36 Q-86 -34 -88 2 Z', h.tint(st, -0.18));
    out += h.p('M-88 2 Q-86 -34 0 -36 Q86 -34 88 2 H76 Q70 -26 0 -28 Q-70 -26 -76 2 Z', '#2a2420', { opacity: '.25' });
    out += h.p('M-152 -34 Q0 -58 152 -34 V-44 Q0 -70 -152 -44 Z', h.tint(st, 0.1)) + h.p('M-154 -44 Q0 -70 154 -44 V-48 Q0 -74 -154 -48 Z', h.tint(st, 0.28));
    out += h.p('M-152 -34 Q0 -58 152 -34 V-31 Q0 -55 -152 -31 Z', '#000', { opacity: '.12' });
    if (winter(c)) out += h.p('M-155 -47 Q0 -74 155 -47 V-51 Q0 -78 -155 -51 Z', SNOW);
    else out += h.l('M-146 2 l-3 -7 M-140 2 l1 -9 M140 2 l3 -8 M134 2 l-1 -7', '#5b7c3f', 1.6);
    return out;
  };

  /* ---------- winter things ---------- */
  P.sled = function (o) {
    var run = o.colour || '#b2493a', wd = '#c79a6b', out = h.shadow(70);
    if (o.toboggan) {
      out += h.p('M-36 -2 H18 Q34 -2 36 -14 Q37 -24 28 -24 Q22 -24 22 -18 Q24 -10 18 -8 H-36 Z', wd) + h.l('M-36 -5 H18 Q30 -5 32 -14', h.tint(wd, -0.2), 1) + h.l('M-30 -9 H18', '#b2493a', 1.6);
      return out + h.l('M30 -22 Q46 -26 44 -10 Q42 0 52 0', '#d6c08e', 1.4);
    }
    out += h.l('M-32 -4 H24 Q36 -4 36 -14 Q36 -20 30 -19', h.tint(run, -0.25), 2.4, { transform: 'translate(-4 -3)' });
    out += h.l('M-26 -6 V-14 M-6 -6 V-14 M14 -6 V-14', '#4a443f', 2.4);
    out += h.r(-36, -19, 58, 6, 2, wd) + h.r(-36, -19, 58, 2, 1, h.tint(wd, 0.25)) + h.l('M-22 -19 V-13 M-8 -19 V-13 M6 -19 V-13', h.tint(wd, -0.25), 0.9);
    out += h.l('M-32 -3 H24 Q36 -3 36 -13 Q36 -19 30 -18', run, 3);
    out += h.l('M22 -16 Q40 -20 42 -8 Q44 0 56 0', '#d6c08e', 1.4);
    return out;
  };

  P.skates = function (o) {
    var col = o.colour || '#f2ece2', dk = h.tint(col, -0.18), out = h.shadow(54);
    function skate(x, y, tone) {
      var boot = 'M-12 -6 V-20 Q-12 -23 -8 -23 H-1 Q2 -23 2 -19 L3 -13 Q13 -12 16 -9 Q17 -6 15 -6 Z';
      return h.g(h.l('M-14 -1 H14 Q17 -1 17 -4', '#bfc6cc', 1.6) + h.l('M-10 -1 V-6 M10 -1 V-6', '#8a8f94', 1.4) + h.p(boot, tone) + h.r(-13, -8, 28, 2.4, 1, '#6b4f38') +
        h.r(-12, -23, 9, 3, 1.5, h.tint(tone, -0.12)) + h.l('M0 -20 l3 2 M0 -16 l4 2 M2 -12 l5 2', '#b5ad9f', 1) + h.p('M-10 -20 Q-9 -12 -10 -9', 'none', { stroke: '#fff', 'stroke-width': '1.4', opacity: '.6' }), 'translate(' + x + ' ' + y + ')');
    }
    return out + skate(10, -3, dk) + skate(-8, 0, col) + h.l('M-6 -21 Q4 -32 14 -24', '#d6c08e', 1);
  };

  P.rink = function (o, c) {
    var ice = night(c) ? '#bccbe0' : '#e4eef4', board = '#f2f0ea', cap = o.colour || '#4f6d8a', out = '';
    out += h.p('M-162 -50 Q0 -56 162 -50 V-28 H-162 Z', SNOW, { opacity: '.6' });
    out += h.p('M-160 -36 H160 L178 -4 H-178 Z', ice);
    out += h.l('M-120 -26 h60 M-20 -18 h90 M60 -30 h50 M-150 -10 h40 M100 -12 h50', '#fff', 1.6, { opacity: '.85' }) + h.l('M-90 -14 q20 -8 40 0 M20 -28 q30 -6 50 2', '#c3d5e2', 1.2, { opacity: '.9' });
    out += h.l('M0 -36 V-4', '#c94f3f', 1.4, { opacity: '.35' });
    out += h.r(-160, -50, 320, 15, 1.5, board) + h.r(-160, -52, 320, 3, 1.5, cap) + h.r(-160, -38, 320, 3, 0, h.tint(cap, -0.1), { opacity: '.6' });
    for (var x = -140; x < 160; x += 40) out += h.l('M' + x + ' -49 V-38', '#d6d3cb', 1);
    out += h.p('M-160 -52 L-182 -20 V-6 L-160 -36 Z', h.tint(board, -0.06)) + h.p('M-160 -52 L-182 -20 V-23 L-160 -55 Z', cap);
    out += h.p('M160 -52 L182 -20 V-6 L160 -36 Z', h.tint(board, -0.12)) + h.p('M160 -52 L182 -20 V-23 L160 -55 Z', cap);
    if (o.nets !== false) [[-140, 1], [140, -1]].forEach(function (n) {
      var nx = n[0], d = n[1];
      out += h.p('M' + (nx - 8) + ' -22 V-34 H' + (nx + 8) + ' V-22 Z', '#fff', { opacity: '.7' }) + h.l('M' + (nx - 4) + ' -34 V-22 M' + nx + ' -34 V-22 M' + (nx + 4) + ' -34 V-22 M' + (nx - 8) + ' -28 H' + (nx + 8), '#c9c6c0', 0.6) +
        h.l('M' + (nx - 8) + ' -22 V-34 H' + (nx + 8) + ' V-22', '#c94f3f', 1.8) + h.l('M' + (nx - 8 * d) + ' -22 L' + (nx - 12 * d) + ' -27', '#c94f3f', 1.2);
    });
    out += h.p('M-186 -4 Q-140 -10 -90 -6 Q-40 -10 0 -5 Q50 -10 100 -6 Q150 -10 186 -4 Q188 2 180 3 H-180 Q-188 2 -186 -4 Z', SNOW) + h.p('M-180 0 Q0 -4 180 0 V3 H-180 Z', '#c3cfdb', { opacity: '.6' });
    return out;
  };

  /* ---------- the playground and the park ---------- */
  P.slide = function (o) {
    var frame = o.frame || '#4f6d8a', chute = o.colour || '#e2b84f', out = h.shadow(140);
    out += h.r(-58, -100, 5, 100, 1.5, h.tint(frame, -0.15)) + h.r(-28, -100, 5, 100, 1.5, h.tint(frame, -0.15));
    out += h.r(44, -40, 4, 40, 1.5, h.tint(frame, -0.15));
    out += h.p('M-24 -86 Q14 -84 34 -40 Q46 -12 74 -12 V-4 Q42 -4 28 -32 Q10 -74 -24 -76 Z', chute);
    out += h.p('M-24 -86 Q14 -84 34 -40 Q46 -12 74 -12 V-9 Q44 -9 31 -38 Q12 -80 -24 -82 Z', h.tint(chute, 0.3));
    out += h.p('M-24 -76 Q10 -74 28 -32 Q42 -4 74 -4 V-1 Q40 -1 26 -29 Q8 -70 -24 -72 Z', h.tint(chute, -0.25));
    out += h.r(-62, -82, 44, 6, 2, h.tint(frame, 0.1)) + h.r(-62, -100, 4, 18, 1.5, frame) + h.r(-24, -100, 4, 18, 1.5, frame) + h.r(-62, -102, 42, 4, 2, frame);
    out += h.r(-70, -84, 4, 84, 1.5, frame) + h.r(-50, -84, 4, 84, 1.5, frame);
    for (var y = -74; y < 0; y += 13) out += h.r(-68, y, 20, 3, 1, h.tint(frame, 0.25));
    return out;
  };

  P.swing = function (o) {
    var frame = o.colour || '#4f7a6b', lt = h.tint(frame, 0.18), out = h.shadow(160);
    out += h.p('M-62 -112 L-80 0 H-74 L-58 -106 Z M-62 -112 L-48 0 H-42 L-56 -106 Z', h.tint(frame, -0.1));
    out += h.p('M62 -112 L44 0 H50 L66 -106 Z M62 -112 L76 0 H82 L66 -106 Z', h.tint(frame, -0.1));
    out += h.r(-68, -114, 136, 7, 3.5, frame) + h.r(-68, -114, 136, 2.4, 1.2, lt);
    [[-26, -30], [24, -30]].forEach(function (s) {
      out += h.l('M' + (s[0] - 10) + ' -107 V' + s[1] + ' M' + (s[0] + 10) + ' -107 V' + s[1], '#8a847c', 1.2);
      out += h.r(s[0] - 13, s[1], 26, 5, 2, '#3b3632') + h.r(s[0] - 13, s[1], 26, 1.6, 1, '#5a524c');
    });
    return out;
  };

  P.bench = function (o, c) {
    var wd = o.colour || '#a07a52', iron = '#3b3632', out = h.shadow(110);
    out += h.p('M-46 0 Q-44 -12 -40 -22 M-40 -22 L-44 -50 M46 0 Q44 -12 40 -22 M40 -22 L44 -50', 'none', { stroke: iron, 'stroke-width': '4', 'stroke-linecap': 'round' });
    out += h.r(-54, -52, 108, 7, 2.5, h.tint(wd, -0.08)) + h.r(-54, -42, 108, 7, 2.5, h.tint(wd, -0.08)) + h.r(-54, -52, 108, 2, 1, h.tint(wd, 0.2), { opacity: '.7' });
    out += h.r(-56, -26, 112, 5, 2, h.tint(wd, 0.12)) + h.r(-56, -21, 112, 5, 1.5, wd) + h.r(-56, -16, 112, 2, 1, h.tint(wd, -0.3));
    out += h.p('M-58 -30 Q-58 -36 -50 -34 L-40 -30', 'none', { stroke: iron, 'stroke-width': '3', 'stroke-linecap': 'round' }) + h.p('M58 -30 Q58 -36 50 -34 L40 -30', 'none', { stroke: iron, 'stroke-width': '3', 'stroke-linecap': 'round' });
    if (winter(c)) out += h.r(-57, -30, 114, 5, 2.5, SNOW) + h.r(-55, -56, 110, 4, 2, SNOW);
    return out;
  };

  /* a kite: flying in the sky (the default), lying on the grass (ground: true) or held up beside a child (held: true) */
  var KITE = ['#d9774b', '#e9a46b', '#4f6d8a', '#7aa5c4'];
  function kiteFace(col) {
    var a = col || KITE[0], b = h.tint(a, 0.25), d = h.tint(a, -0.15), e = col ? h.tint(a, -0.3) : KITE[2];
    return h.p('M0 -24 L16 0 L0 0 Z', b) + h.p('M0 -24 L-16 0 L0 0 Z', a) + h.p('M0 26 L-16 0 L0 0 Z', e) + h.p('M0 26 L16 0 L0 0 Z', col ? d : KITE[3]) +
      h.l('M0 -24 V26 M-16 0 H16', '#5a4a3a', 0.8, { opacity: '.6' });
  }
  function bows(d) { return d.map(function (p, i) { return h.p('M' + (p[0] - 4) + ' ' + (p[1] - 3) + ' L' + p[0] + ' ' + p[1] + ' L' + (p[0] - 4) + ' ' + (p[1] + 3) + ' Z M' + (p[0] + 4) + ' ' + (p[1] - 3) + ' L' + p[0] + ' ' + p[1] + ' L' + (p[0] + 4) + ' ' + (p[1] + 3) + ' Z', i % 2 ? '#e2b84f' : '#7aa5c4'); }).join(''); }
  P.kite = function (o, c) {
    var face = kiteFace(o.colour);
    if (o.ground || o.held) {
      var s = o.s || 1, down = (206 - (o.y === undefined ? 50 : o.y)) / s, inner;
      if (o.held) inner = h.l('M3 -28 Q-6 -16 2 -8 Q8 0 -2 2', '#5a4a3a', 1.2) + bows([[-2, -18], [4, -6]]) + h.g(face, 'translate(8 -48) rotate(-12) scale(.8)');
      else inner = h.e(0, 1, 34, 6, '#26301c', { opacity: '.18' }) + h.l('M-14 -2 Q-26 4 -34 -1 Q-42 -6 -48 0', '#5a4a3a', 1.2) + bows([[-26, 2], [-40, -3]]) + h.g(face, 'translate(4 -4) scale(1 .3) rotate(90)') +
        h.l('M20 -3 Q28 -10 32 -4', '#e6dcc6', 0.9) + h.r(30, -8, 8, 8, 2, '#a07a52') + h.r(31, -6, 6, 4, 1, '#e6dcc6');
      return h.g(inner, 'translate(0 ' + num(down) + ')');
    }
    return face + h.l('M0 26 Q10 46 -4 62 Q-14 76 2 92', '#5a4a3a', 1.2) + bows([[4, 42], [-8, 66], [0, 86]]);
  };
})();

(function () {
  var D = Atlas.decodable, h = D.art.h, P = D.art.parts, ART = D.art;
  function n(v) { return Math.round(v * 10) / 10; }
  function rot(a, x, y) { return { transform: 'rotate(' + a + ' ' + x + ' ' + y + ')' }; }
  /* a limb from a list of [x, y, width] points, top to bottom, with a rounded foot */
  function limb(pts, col) {
    var L = pts.map(function (p) { return n(p[0] - p[2] / 2) + ' ' + n(p[1]); });
    var R = pts.slice().reverse().map(function (p) { return n(p[0] + p[2] / 2) + ' ' + n(p[1]); });
    var b = pts[pts.length - 1];
    return h.p('M' + L.join(' L') + ' Q' + n(b[0]) + ' ' + n(b[1] + b[2] * 0.6) + ' ' + R.join(' L') + ' Z', col);
  }
  function hoof(x, y, w, col) { return h.p('M' + n(x - w / 2) + ' ' + n(y - 4) + ' H' + n(x + w / 2) + ' L' + n(x + w / 2 + 1) + ' ' + y + ' H' + n(x - w / 2 - 0.5) + ' Z', col || '#2c221b'); }
  function closedEye(x, y, r, col) { return h.l('M' + n(x - r) + ' ' + n(y) + ' q' + n(r) + ' ' + n(r * 0.9) + ' ' + n(2 * r) + ' 0', col || '#1d140d', Math.max(1.1, r * 0.55)); }
  function eye(o, x, y, r) { return o.asleep ? closedEye(x, y, r) : h.eye(x, y, r); }
  function season(c) { return (c && c.season) || 'summer'; }
  var SNOW = '#f6f9fc', SNOWS = '#d9e4ee';

  /* ---------------- big animals ---------------- */
  /* a four-legged body: hind thigh and shoulder blend into the body, slim lower legs; far legs darker */
  P.moose = function (o) {
    var f = o.colour || '#4f3826', dk = h.tint(f, -0.32), lt = h.tint(f, 0.2), lg = '#86735f', ant = '#dccaa6';
    var out = h.shadow(150);
    function hind(dx, col, low) { return limb([[-50 + dx, -84, 28], [-54 + dx, -58, 15], [-60 + dx, -40, 9], [-55 + dx, -4, 7]], col) + limb([[-60 + dx, -40, 9], [-55 + dx, -4, 7]], low) + hoof(-55 + dx, 0, 9); }
    function fore(dx, col, low) { return limb([[38 + dx, -80, 24], [40 + dx, -54, 12], [38 + dx, -34, 8.5], [41 + dx, -4, 7]], col) + limb([[38 + dx, -34, 8.5], [41 + dx, -4, 7]], low) + hoof(41 + dx, 0, 9); }
    out += hind(14, dk, h.tint(lg, -0.3)) + fore(-12, dk, h.tint(lg, -0.3));
    /* body: high shoulder hump, sloping back, deep chest */
    out += h.p('M-60 -104 Q-24 -110 8 -114 Q26 -132 46 -120 Q62 -106 58 -84 Q54 -64 36 -62 Q0 -60 -34 -64 Q-64 -66 -70 -84 Q-74 -100 -60 -104 Z', f);
    out += h.p('M-66 -76 Q-56 -64 -34 -64 Q0 -60 36 -62 Q50 -64 56 -76 Q44 -68 20 -68 Q-20 -68 -44 -70 Q-58 -72 -66 -76 Z', dk, { opacity: '.55' });
    out += h.p('M-58 -102 Q-24 -108 8 -112 Q24 -128 42 -122 Q24 -120 10 -108 Q-24 -102 -56 -98 Z', lt, { opacity: '.5' });
    out += h.p('M-70 -94 Q-80 -90 -76 -80 Q-72 -86 -69 -90 Z', dk);
    out += hind(0, f, lg) + fore(0, f, lg);
    out += h.p('M-62 -92 Q-48 -96 -40 -84 Q-40 -72 -48 -64', 'none', { stroke: dk, 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.5' });
    /* the far antler */
    var palm = 'M0 0 Q-10 -8 -22 -12 Q-31 -16 -32 -27 L-26 -23 L-25 -33 L-19 -25 L-15 -35 L-10 -26 L-5 -35 L-2 -25 L4 -31 L6 -20 Q8 -10 5 -3 Z';
    if (o.antlers !== false) out += h.g(h.p(palm, h.tint(ant, -0.28)), 'translate(66 -114) rotate(-26) scale(.95)');
    /* neck, bell and long head with the big drooping nose */
    out += h.p('M30 -122 Q58 -126 72 -110 L76 -92 Q60 -82 44 -86 Z', f);
    out += h.p('M60 -90 Q68 -72 63 -60 Q56 -68 55 -88 Z', dk);
    out += h.p('M62 -112 Q76 -120 88 -110 Q100 -100 108 -88 Q114 -78 108 -71 Q100 -66 92 -72 Q82 -80 70 -84 Q60 -88 58 -98 Z', f);
    out += h.e(104, -79, 9, 8, h.tint(f, 0.1)) + h.p('M98 -86 Q108 -84 110 -76', 'none', { stroke: lt, 'stroke-width': '2.4', 'stroke-linecap': 'round', opacity: '.7' });
    out += h.e(108, -77, 2, 1.5, '#1d140d') + h.l('M96 -70 q5 2 10 -1', dk, 1.3);
    out += h.g(h.p('M-4 0 Q-6 -10 2 -18 Q8 -8 5 0 Z', dk) + h.p('M-1 -2 Q-2 -9 2 -14 Q5 -8 3 -2 Z', h.tint(f, 0.3)), 'translate(64 -110) rotate(-55)');
    if (o.antlers !== false) out += h.g(h.p(palm, ant) + h.p('M0 0 Q-8 -10 -20 -14 L-18 -18 Q-6 -12 2 -3 Z', h.tint(ant, -0.15)) + h.p('M-22 -12 Q-30 -16 -31 -24 Q-24 -18 -12 -14 Z', '#fff', { opacity: '.22' }), 'translate(72 -114) rotate(20) scale(1)');
    out += eye(o, 80, -102, 2.7);
    return out;
  };

  P.deer = function (o) {
    var f = o.colour || '#b57d4c', dk = h.tint(f, -0.25), lt = '#efe0c6', ant = '#dccaa4';
    var out = h.shadow(90);
    function hind(dx, col) { return limb([[-28 + dx, -72, 22], [-31 + dx, -50, 11], [-35 + dx, -34, 6], [-30 + dx, -3, 4.5]], col) + hoof(-30 + dx, 0, 6); }
    function fore(dx, col) { return limb([[26 + dx, -68, 17], [28 + dx, -46, 8], [27 + dx, -28, 5.5], [30 + dx, -3, 4.5]], col) + hoof(30 + dx, 0, 6); }
    out += hind(10, dk) + fore(-9, dk);
    out += h.p('M-38 -80 Q-50 -80 -48 -68 Q-42 -71 -36 -74 Z', f) + h.p('M-40 -76 Q-48 -74 -46 -68 Q-42 -70 -38 -72 Z', '#fbf6ec');
    out += h.p('M-40 -70 Q-44 -84 -28 -86 Q0 -86 26 -86 Q42 -86 42 -72 Q40 -56 26 -52 Q-8 -50 -32 -54 Q-42 -58 -40 -70 Z', f);
    out += h.p('M-32 -55 Q-8 -51 26 -53 Q36 -57 38 -64 Q24 -60 0 -60 Q-20 -60 -32 -59 Z', lt, { opacity: '.9' });
    out += h.p('M-34 -82 Q0 -86 30 -84', 'none', { stroke: h.tint(f, 0.25), 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.6' });
    if (o.fawn) out += [[-24, -74], [-12, -78], [0, -75], [12, -78], [-18, -66], [-4, -68], [8, -68], [20, -72]].map(function (p) { return h.c(p[0], p[1], 1.8, '#fbf3e4', { opacity: '.9' }); }).join('');
    out += hind(0, f) + fore(0, f);
    out += h.p('M-38 -76 Q-26 -80 -20 -70 Q-20 -60 -26 -56', 'none', { stroke: dk, 'stroke-width': '1.6', 'stroke-linecap': 'round', opacity: '.45' });
    /* neck and head */
    out += h.p('M18 -84 Q28 -102 40 -110 Q54 -112 54 -100 Q46 -86 40 -66 Z', f);
    out += h.p('M42 -86 Q46 -96 52 -100 Q50 -88 44 -76 Z', lt, { opacity: '.85' });
    out += h.p('M40 -110 Q50 -118 58 -112 Q66 -106 71 -99 Q73 -94 67 -93 Q58 -94 50 -96 Q41 -100 40 -110 Z', f);
    out += h.e(69.5, -96.5, 2.2, 1.8, '#1d140d') + h.p('M56 -96 Q62 -94 66 -94 Q62 -91 56 -93 Z', lt, { opacity: '.8' });
    out += h.e(39, -115, 4, 9, dk, rot(-60, 39, -115)) + h.e(46, -117, 4, 9, f, rot(-35, 46, -117)) + h.e(46, -117, 2, 6, '#e8c9a8', rot(-35, 46, -117));
    if (o.antlers && !o.fawn) out += h.l('M46 -113 Q40 -126 32 -132 M40 -124 L45 -133 M36 -129 L35 -138', h.tint(ant, -0.2), 2.6) +
      h.l('M51 -113 Q55 -126 49 -137 M53 -122 L60 -128 M52 -131 L57 -139', ant, 2.8);
    out += eye(o, 54, -105, 2.4);
    return o.fawn ? h.g(out, 'scale(.62)') : out;
  };

  P.wolf = function (o) {
    var f = o.colour || '#8b8a85', dk = h.tint(f, -0.3), lt = '#ebe7df', ml = h.tint(f, 0.25);
    var out = h.shadow(90);
    function hind(dx, col) { return limb([[-30 + dx, -50, 20], [-32 + dx, -32, 10], [-36 + dx, -20, 6.5], [-31 + dx, -3, 6]], col) + h.e(-29 + dx, -2, 5, 2.6, col); }
    function fore(dx, col) { return limb([[26 + dx, -48, 15], [28 + dx, -30, 8], [27 + dx, -16, 6], [29 + dx, -3, 6]], col) + h.e(31 + dx, -2, 5, 2.6, col); }
    out += hind(9, dk) + fore(-8, dk);
    out += h.p('M-38 -52 Q-56 -46 -60 -26 Q-58 -18 -52 -20 Q-48 -34 -36 -42 Z', f) + h.p('M-60 -26 Q-58 -18 -52 -20 Q-54 -26 -56 -30 Z', '#2e2a26');
    out += h.p('M-40 -46 Q-42 -62 -26 -64 Q0 -66 22 -68 Q40 -70 42 -54 Q40 -40 26 -36 Q-6 -34 -30 -36 Q-40 -40 -40 -46 Z', f);
    out += h.p('M-26 -62 Q0 -66 28 -68 Q18 -60 0 -60 Q-16 -58 -26 -62 Z', h.tint(f, -0.18));
    out += h.p('M-28 -37 Q-4 -34 24 -38 Q32 -42 34 -48 Q20 -44 0 -43 Q-18 -42 -28 -41 Z', lt, { opacity: '.8' });
    out += hind(0, f) + fore(0, f);
    out += h.p('M26 -70 Q40 -80 52 -74 Q58 -60 50 -48 Q38 -42 30 -50 Z', ml);
    out += h.p('M40 -76 Q52 -84 62 -78 Q70 -72 78 -70 Q82 -68 78 -64 Q66 -60 56 -60 Q44 -62 40 -76 Z', f);
    out += h.p('M56 -66 Q66 -66 78 -66 Q74 -61 60 -60 Q50 -60 48 -66 Z', lt);
    out += h.e(79, -68, 2.4, 1.8, '#1d140d') + h.l('M66 -61 q5 2 9 -1', dk, 1.2);
    out += h.p('M44 -78 L46 -92 L54 -80 Z', dk) + h.p('M50 -80 L54 -93 L60 -79 Z', f) + h.p('M53 -82 L54.5 -89 L57 -81 Z', '#d8b9a4');
    out += eye(o, 62, -73, 2.3);
    return out;
  };
  /* ---------------- small animals ---------------- */
  P.beaver = function (o) {
    var f = o.colour || '#6e4528', dk = h.tint(f, -0.3), lt = h.tint(f, 0.25);
    var out = h.shadow(66);
    /* flat, scaly tail */
    out += h.p('M-14 -6 Q-30 -4 -46 -6 Q-56 -4 -54 2 Q-40 4 -14 0 Z', '#3b302c') + h.l('M-48 -3 h4 M-40 -4 h4 M-32 -4 h4 M-44 0 h4 M-36 0 h4', '#5d514b', 1);
    out += h.e(-6, -4, 7, 4, dk);
    /* body */
    out += h.p('M-22 -6 Q-28 -30 -4 -34 Q18 -36 26 -22 Q30 -8 18 -2 Q-6 2 -22 -6 Z', f);
    out += h.p('M-20 -24 Q-10 -34 6 -33', 'none', { stroke: lt, 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.5' });
    out += h.p('M8 -6 Q20 -6 24 -16 Q26 -6 18 -2 Z', dk, { opacity: '.5' });
    /* head */
    out += h.c(26, -24, 10, f) + h.e(34, -21, 6, 5, h.tint(f, 0.12)) + h.e(39, -22, 2, 1.6, '#1d140d');
    out += h.r(33.5, -17, 3.4, 4, 0.8, '#e9a64a');
    out += h.c(20, -32, 3.2, dk) + eye(o, 29, -27, 2);
    out += h.e(22, -4, 5, 3, dk) + h.e(30, -12, 3.5, 2.2, dk);
    return out;
  };

  P.loon = function (o) {
    var bk = '#1f2427', hd = '#1d2b28';
    var out = '';
    out += h.e(0, 0, 40, 4, '#21323c', { opacity: '.25' });
    out += h.p('M-34 -6 Q-36 -14 -26 -18 Q0 -22 20 -16 Q30 -12 28 -4 Q24 1 0 1 Q-26 1 -34 -6 Z', bk);
    var dots = '';
    for (var r = 0; r < 4; r++) for (var i = 0; i < 8 - r; i++) dots += h.c(-26 + i * 6 + (r % 2) * 3 + r * 2, -16 + r * 3, 1 - r * 0.12, '#eef1f2', { opacity: String(0.9 - r * 0.15) });
    out += dots + h.p('M-30 -16 Q-6 -22 18 -16', 'none', { stroke: '#4a5458', 'stroke-width': '2', 'stroke-linecap': 'round', opacity: '.6' });
    /* neck and head */
    out += h.p('M14 -14 Q14 -26 20 -30 Q28 -30 28 -22 Q26 -14 24 -10 Z', hd);
    out += h.l('M16 -20 l3 0 M17 -22 l3 0 M22 -21 l3 0 M23 -19 l3 0', '#e8ecee', 1.2);
    out += h.c(22, -32, 7, hd) + h.p('M27 -34 L42 -31 L27 -29 Z', '#23282b');
    out += h.c(24, -33, 1.9, '#b8322a') + h.c(24.6, -33.6, 0.6, '#fff');
    out += h.l('M-38 1 q8 -3 16 0 M18 2 q10 -3 22 0', '#ffffff', 1.5, { opacity: '.6' });
    return out;
  };

  P.owl = function (o) {
    var f = o.colour || '#8a6a4b', dk = h.tint(f, -0.28), lt = h.tint(f, 0.35), disc = h.tint(f, 0.5);
    var out = o.perch ? h.r(-26, -2, 52, 6, 3, '#6b4c35') + h.r(-26, -2, 52, 2, 1, h.tint('#6b4c35', 0.2)) : h.shadow(30);
    /* body */
    out += h.p('M-14 -2 Q-18 -24 -12 -34 Q0 -40 12 -34 Q18 -24 14 -2 Q0 2 -14 -2 Z', f);
    out += h.e(0, -14, 9, 11, lt);
    out += h.l('M-4 -20 l2 2 l2 -2 M2 -16 l2 2 l2 -2 M-6 -12 l2 2 l2 -2 M-1 -8 l2 2 l2 -2', dk, 1, { opacity: '.6' });
    out += h.p('M-14 -30 Q-20 -16 -14 -2 Q-10 -12 -10 -26 Z', dk) + h.p('M14 -30 Q20 -16 14 -2 Q10 -12 10 -26 Z', dk);
    /* head with tufts */
    out += h.p('M-13 -38 L-15 -50 L-6 -44 Z', dk) + h.p('M13 -38 L15 -50 L6 -44 Z', dk);
    out += h.e(0, -38, 14, 11, f);
    out += h.e(-6, -38, 6.5, 6.5, disc) + h.e(6, -38, 6.5, 6.5, disc);
    if (o.asleep) out += closedEye(-6, -38, 3) + closedEye(6, -38, 3);
    else out += h.c(-6, -38, 4, '#e8b23a') + h.c(6, -38, 4, '#e8b23a') + h.eye(-6, -38, 2.4) + h.eye(6, -38, 2.4);
    out += h.p('M-2 -34 L2 -34 L0 -30 Z', '#4a3a2a');
    out += h.l('M-5 0 v-3 M-3 0 v-3 M3 0 v-3 M5 0 v-3', '#c99a4a', 1.4);
    return out;
  };

  function robin(o) {
    var back = '#5d554e', head = '#3a3431', breast = o.colour || '#d6743d';
    var out = o.perch ? h.r(-16, 0, 32, 3.6, 1.8, '#6b4c35') : h.shadow(14);
    out += h.l('M-1 0 l-1 -6 M3 0 l1 -6', '#a07c55', 1.2);
    out += h.p('M-12 -12 L-19 -9 L-18 -6 L-8 -9 Z', h.tint(back, -0.2));
    out += h.e(0, -10, 9, 6.4, back, rot(-15, 0, -10));
    out += h.e(3, -8, 6, 4.6, breast, rot(-25, 3, -8)) + h.e(1, -5.5, 3.5, 1.8, '#f1e2cf', { opacity: '.85' });
    out += h.p('M-6 -14 Q0 -15 4 -10 Q-2 -9 -7 -11 Z', h.tint(back, -0.2));
    out += h.c(6, -16, 4.6, head) + h.p('M10 -17 L14.5 -16 L10 -14.5 Z', '#e2b23f');
    out += h.eye(7.4, -17, 1.2) + h.l('M6 -18.6 a1.6 1.6 0 0 1 2.8 0', '#f4efe6', 0.6);
    return out;
  }
  var skyBird = P.bird;
  /* bird: the flying sky mark by default; o.perch (sitting on a twig, placed by y from the top like a sky part) or o.stand (on the ground) draw a robin */
  P.bird = function (o, c) {
    o = o || {};
    if (o.perch) return robin(o);
    if (o.stand) return h.g(robin(o), 'translate(0 ' + n((206 - (o.y === undefined ? 50 : o.y)) / (o.s || 1)) + ')');
    return skyBird(o, c);
  };
  P.robin = function (o) { return robin(o); };

  P.snail = function (o) {
    var sh = o.colour || '#c08550', body = '#c9b49a';
    var out = h.shadow(26);
    out += h.p('M-14 0 Q-12 -6 0 -6 L10 -6 Q12 -14 15 -16 Q19 -14 18 -6 Q18 0 14 0 Z', body);
    out += h.l('M12 -10 L10 -19 M15 -11 L16 -20', body, 1.4) + h.c(10, -19.5, 1.3, '#4a3a2c') + h.c(16, -20.5, 1.3, '#4a3a2c');
    out += h.c(-1, -10, 9, sh) + h.c(1, -12, 6, h.tint(sh, 0.15));
    out += h.p('M-1 -10 m-1 0 a2 2 0 1 1 4 0 a4 4 0 1 1 -8 0 a6 6 0 1 1 12 0 a8 8 0 0 1 -6 7.5', 'none', { stroke: h.tint(sh, -0.35), 'stroke-width': '1.2', 'stroke-linecap': 'round' });
    out += h.e(-4, -15, 2.4, 1.3, '#fff', { opacity: '.5' });
    return out;
  };

  P.turtle = function (o) {
    var sh = o.colour || '#6b7a45', skin = '#8c9a6a', dk = h.tint(sh, -0.3);
    var out = h.shadow(52);
    out += h.e(-16, -3, 5, 3.5, h.tint(skin, -0.2)) + h.e(12, -3, 5, 3.5, h.tint(skin, -0.2));
    out += h.p('M18 -8 Q26 -16 32 -14 Q38 -12 36 -7 Q32 -4 24 -5 Z', skin) + h.l('M-24 -5 l-6 1', skin, 3);
    out += eye(o, 31, -12, 1.5);
    out += h.p('M-24 -6 Q-22 -24 0 -25 Q22 -24 24 -6 Z', sh);
    out += h.r(-25, -7, 50, 4, 2, dk);
    out += h.p('M-7 -22 L7 -22 L10 -14 L0 -9 L-10 -14 Z', h.tint(sh, 0.15)) + h.p('M-20 -9 Q-18 -18 -11 -21 L-10 -14 L-14 -8 Z', h.tint(sh, 0.08)) + h.p('M20 -9 Q18 -18 11 -21 L10 -14 L14 -8 Z', h.tint(sh, -0.05));
    out += h.e(-6, -20, 6, 2, '#fff', { opacity: '.3' });
    out += h.e(-8, -2, 5, 3, skin) + h.e(18, -2, 5, 3, skin);
    return out;
  };

  P.skunk = function (o) {
    var f = '#26231f', w = '#f3f0ea';
    var out = h.shadow(56);
    /* big plumed tail */
    out += h.p('M-16 -14 Q-36 -14 -38 -34 Q-38 -50 -24 -50 Q-12 -48 -14 -38 Q-18 -30 -10 -22 Z', f);
    out += h.p('M-30 -46 Q-22 -50 -18 -44 Q-24 -40 -24 -30 Q-28 -22 -20 -16 Q-32 -18 -32 -32 Q-34 -42 -30 -46 Z', w, { opacity: '.9' });
    out += h.e(-10, -3, 4, 3, f) + h.e(14, -3, 4, 3, f);
    out += h.p('M-20 -10 Q-22 -26 -4 -28 Q16 -28 22 -16 Q24 -4 14 -4 Q-8 -2 -20 -10 Z', f);
    out += h.p('M-18 -16 Q-12 -28 4 -28 Q14 -28 20 -20 Q8 -24 -4 -22 Q-12 -20 -18 -16 Z', w);
    out += h.c(22, -16, 8, f) + h.e(29, -13, 5, 3.5, f) + h.e(33, -13, 1.6, 1.3, '#4a3f3a');
    out += h.p('M16 -24 Q24 -22 30 -14 Q26 -14 20 -20 Z', w);
    out += h.c(18, -23, 2.6, h.tint(f, 0.15)) + eye(o, 24, -18, 1.7);
    out += h.e(-4, -3, 4, 3, f) + h.e(18, -3, 4, 3, f);
    return out;
  };

  P.squirrel = function (o) {
    var f = o.colour || '#b0643a', dk = h.tint(f, -0.25), lt = '#f2e2c8';
    var out = h.shadow(30);
    /* tail curled up behind */
    out += h.p('M-6 -4 Q-24 -4 -24 -20 Q-24 -36 -12 -40 Q-2 -42 0 -34 Q-6 -36 -10 -32 Q-14 -24 -8 -16 Q-4 -10 -2 -6 Z', f);
    out += h.p('M-20 -22 Q-20 -34 -12 -38', 'none', { stroke: h.tint(f, 0.3), 'stroke-width': '3', 'stroke-linecap': 'round', opacity: '.6' });
    out += h.p('M-8 -2 Q-12 -14 -4 -20 Q4 -24 8 -16 Q12 -6 8 -2 Z', f);
    out += h.e(3, -10, 3.5, 6, lt);
    out += h.e(-2, -2, 6, 2.6, dk) + h.e(8, -1.5, 3.5, 2, dk);
    out += h.c(5, -23, 6, f) + h.e(10, -21, 3.6, 3, f) + h.c(13, -21.4, 1, '#2b1a10');
    out += h.p('M1 -27 L1.5 -33 L5 -28 Z', dk) + eye(o, 7, -24, 1.6) + h.e(6, -19, 3, 2, lt, { opacity: '.8' });
    if (o.nut !== false) out += h.e(10, -14, 3, 3.4, '#9a6a3a') + h.p('M7 -16 Q10 -19 13 -16 Z', '#6b4a2a');
    out += h.e(7, -14, 2.2, 1.6, dk);
    return out;
  };

  /* ---------------- small things in nature ---------------- */
  P.nest = function (o) {
    var tw = '#8a6744', dk = h.tint(tw, -0.3), eggC = o.colour || '#9fd0d8';
    var out = h.shadow(44);
    out += h.e(0, -9, 20, 5, dk);
    var k = o.eggs === undefined ? 3 : o.eggs;
    for (var i = 0; i < k; i++) { var x = -9 + i * (18 / Math.max(1, k - 1 || 1)); out += h.e(x, -12, 4.2, 5, eggC, rot(-10 + i * 8, x, -12)) + h.e(x - 1.2, -14, 1.2, 1.8, '#fff', { opacity: '.6' }); }
    if (o.chicks) out += [-6, 6].map(function (x) { return h.c(x, -14, 4.5, '#b9a27e') + h.p('M' + (x + 3) + ' -16 l6 -2 l-5 3 Z', '#e6b33f') + h.eye(x + 1.4, -15.5, 1); }).join('');
    out += h.p('M-21 -10 Q-20 2 0 3 Q20 2 21 -10 Q10 -6 0 -6 Q-10 -6 -21 -10 Z', tw);
    out += h.l('M-18 -6 q8 3 16 1 M-2 -3 q10 2 18 -3 M-15 -1 q10 2 22 -1 M-20 -9 l6 2 M14 -8 l6 -2', h.tint(tw, 0.3), 1, { opacity: '.8' });
    out += h.l('M-12 -9 q6 3 14 2 M6 -9 q4 2 10 0', dk, 1, { opacity: '.7' });
    return out;
  };

  P.web = function (o, c) {
    var st = c.time === 'night' ? '#e6ebf2' : '#ffffff', stem = '#7a6a4a';
    var cx = 0, cy = -48, R = 30, out = '';
    out += h.l('M-38 0 Q-40 -40 -34 -84 M38 0 Q42 -40 36 -82', stem, 2.2) + h.l('M-34 -84 l-6 -6 M-36 -64 l-6 -2 M36 -82 l5 -5 M38 -60 l6 -2', stem, 1.6);
    var spokes = '', spiral = '';
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; spokes += 'M' + cx + ' ' + cy + ' L' + n(cx + Math.cos(a) * R) + ' ' + n(cy + Math.sin(a) * R) + ' '; }
    for (var r = 6; r <= R; r += 5) {
      var d = '';
      for (var j = 0; j <= 12; j++) { var b = j * Math.PI / 6; d += (j ? ' L' : 'M') + n(cx + Math.cos(b) * r) + ' ' + n(cy + Math.sin(b) * r); }
      spiral += d + ' ';
    }
    var webPaths = spokes + spiral + 'M-36 -78 L' + n(-R * 0.86) + ' ' + n(cy - R / 2) + ' M36 -76 L' + n(R * 0.86) + ' ' + n(cy - R / 2) + ' M-38 -20 L' + n(-R * 0.86) + ' ' + n(cy + R / 2) + ' M39 -22 L' + n(R * 0.86) + ' ' + n(cy + R / 2);
    out += h.l(webPaths, '#5a6a72', 1.6, { opacity: '.18' }) + h.l(webPaths, st, 0.9, { opacity: '.9' });
    out += h.e(-14, -54, 1.2, 1.2, '#fff') + h.e(12, -38, 1, 1, '#fff') + h.e(4, -70, 1, 1, '#fff');
    var sp = o.colour || '#2b2420';
    out += h.l('M' + (cx + 4) + ' ' + (cy + 6) + ' l-6 -4 l-3 -5 M' + (cx + 4) + ' ' + (cy + 7) + ' l-7 1 l-3 4 M' + (cx + 6) + ' ' + (cy + 4) + ' l6 -4 l3 -5 M' + (cx + 6) + ' ' + (cy + 7) + ' l7 1 l3 4', sp, 1);
    out += h.e(cx + 5, cy + 6, 3, 2.6, sp) + h.e(cx + 5, cy + 11, 3.8, 4.4, sp) + h.e(cx + 4, cy + 10, 1.2, 1.6, '#c87a3a', { opacity: '.8' });
    return out;
  };

  P.flower = function (o, c) {
    var col = o.colour || '#e9a3b4', kind = o.kind || 'daisy', st = '#5b7c3f';
    var out = h.shadow(16) + h.l('M0 0 Q-2 -16 0 -30', st, 2.6);
    out += h.p('M-1 -10 Q-12 -16 -14 -10 Q-8 -6 -1 -8 Z', st) + h.p('M0 -16 Q12 -24 15 -18 Q10 -13 0 -14 Z', h.tint(st, 0.15));
    if (kind === 'sunflower') {
      var p = '';
      for (var i = 0; i < 14; i++) p += h.e(0, -42, 2.6, 6.5, i % 2 ? '#e6b22f' : '#f2c94c', { transform: 'rotate(' + n(i * 360 / 14) + ' 0 -32)' });
      out += p + h.c(0, -32, 6, '#6b4524') + h.c(-1.5, -33.5, 2.5, '#8a5c34');
    } else if (kind === 'tulip') {
      out += h.p('M-7 -32 Q-8 -42 -6 -46 L-2 -40 L0 -46 L2 -40 L6 -46 Q8 -42 7 -32 Q0 -27 -7 -32 Z', col) + h.p('M0 -46 L2 -40 L6 -46 Q8 -42 7 -32 Q4 -30 2 -30 Z', h.tint(col, -0.15)) + h.e(-3.5, -38, 1.2, 4, '#fff', { opacity: '.35' });
    } else {
      var q = '';
      for (var k = 0; k < 10; k++) q += h.e(0, -39, 2.6, 6.5, k % 2 ? h.tint(col, -0.08) : col, { transform: 'rotate(' + k * 36 + ' 0 -32)' });
      out += q + h.c(0, -32, 3.6, '#e2a53a') + h.c(-1, -33, 1.4, '#f6d07a');
    }
    return out;
  };

  P.plant = function (o) {
    var pot = o.colour || '#c4704a', lf = '#5f8f46';
    var out = h.shadow(28);
    var leaves = [[-14, -26, -40], [14, -26, 40], [-8, -34, -15], [8, -34, 15], [0, -38, 0], [-16, -20, -65], [16, -20, 65]];
    leaves.forEach(function (L, i) { out += h.e(L[0], L[1], 4.6, 10, i % 2 ? h.tint(lf, -0.1) : lf, { transform: 'rotate(' + L[2] + ' ' + L[0] + ' ' + L[1] + ')' }); });
    leaves.slice(0, 5).forEach(function (L) { out += h.l('M' + n(L[0] * 0.4) + ' ' + n(-18) + ' L' + L[0] + ' ' + L[1], h.tint(lf, -0.25), 1); });
    if (o.flowers) out += [[-10, -38], [8, -42], [0, -46]].map(function (p) { return h.c(p[0], p[1], 3, o.flowers === true ? '#e9a3b4' : o.flowers) + h.c(p[0], p[1], 1.1, '#f2c94c'); }).join('');
    out += h.p('M-12 -16 L12 -16 L9 0 L-9 0 Z', pot) + h.p('M3 -16 L12 -16 L9 0 L2 0 Z', h.tint(pot, -0.15));
    out += h.r(-14, -19, 28, 5, 1.5, h.tint(pot, 0.12)) + h.r(-12, -18, 6, 2, 1, '#fff', { opacity: '.3' });
    return out;
  };

  /* ---------------- ground and plants ---------------- */
  function leafCol(c, o) {
    if (o.colour) return o.colour;
    var s = season(c);
    return s === 'autumn' ? '#c8743a' : s === 'spring' ? '#7cae52' : s === 'winter' ? '#566a58' : '#5d8c42';
  }
  /* a crown of overlapping round masses, shaded from the light (upper right) */
  function crown(blobs, col) {
    var dk = h.tint(col, -0.22), lt = h.tint(col, 0.14), out = '';
    blobs.slice().sort(function (p, q) { return p[1] - q[1]; }).forEach(function (b) {
      var r = b[2], cc = b[3] || col;
      if (b[3]) { dk = h.tint(cc, -0.22); lt = h.tint(cc, 0.14); }
      out += h.c(b[0], b[1], r, dk) + h.c(b[0] + r * 0.1, b[1] - r * 0.12, r * 0.88, cc) +
        h.p('M' + n(b[0] - r * 0.2) + ' ' + n(b[1] - r * 0.8) + ' A' + n(r * 0.86) + ' ' + n(r * 0.86) + ' 0 0 1 ' + n(b[0] + r * 0.9) + ' ' + n(b[1] + r * 0.05) + ' Q' + n(b[0] + r * 0.4) + ' ' + n(b[1] - r * 0.5) + ' ' + n(b[0] - r * 0.2) + ' ' + n(b[1] - r * 0.8) + ' Z', lt, { opacity: '.85' });
    });
    return out;
  }
  P.bush = function (o, c) {
    var col = leafCol(c, o), out = h.shadow(70);
    if (season(c) === 'winter' && !o.colour) {
      out += h.l('M0 0 L-14 -26 M0 0 L2 -34 M0 0 L16 -24 M-8 -14 L-22 -20 M8 -12 L24 -14', '#6b5a48', 2.4);
      return out + h.e(0, -6, 30, 7, SNOW) + h.e(-6, -8, 18, 4, '#fff');
    }
    out += crown([[-22, -16, 14], [20, -16, 15], [-6, -26, 16], [10, -24, 15], [0, -12, 16]], col);
    if (o.berries || (o.berries === undefined && season(c) === 'autumn')) out += [[-20, -18], [-10, -28], [6, -20], [16, -30], [24, -14], [-2, -10], [12, -10]].map(function (p) { return h.c(p[0], p[1], 2.2, o.berries === true || o.berries === undefined ? '#b8323c' : o.berries) + h.c(p[0] + 0.6, p[1] - 0.7, 0.7, '#fff', { opacity: '.6' }); }).join('');
    return out;
  };

  P.log = function (o, c) {
    var bark = o.colour || '#7a5a3e', dk = h.tint(bark, -0.3), end = '#d8b88a';
    var out = h.shadow(110);
    out += h.r(-50, -24, 96, 24, 12, bark);
    out += h.r(-50, -10, 96, 10, 5, dk, { opacity: '.45' });
    out += h.l('M-40 -18 h22 M-10 -20 h30 M-34 -8 h16 M2 -10 h24 M-46 -14 h6', h.tint(bark, -0.35), 1.4, { opacity: '.7' });
    out += h.l('M-38 -21 h50', h.tint(bark, 0.25), 2, { opacity: '.6' });
    out += h.e(46, -12, 8, 12, end) + h.e(46, -12, 5.4, 8, h.tint(end, -0.12)) + h.e(46, -12, 3, 4.6, end) + h.e(46, -12, 1, 1.6, h.tint(end, -0.25));
    out += h.p('M-30 -22 L-36 -32 L-32 -32 L-26 -23 Z', bark);
    if (season(c) === 'winter') out += h.p('M-48 -20 Q-40 -30 0 -29 Q36 -30 46 -24 Q20 -22 -10 -21 Q-36 -20 -48 -20 Z', SNOW);
    else if (o.moss !== false) out += h.p('M-44 -21 Q-36 -27 -24 -25 Q-28 -21 -36 -20 Z M8 -24 Q16 -28 26 -24 Q18 -22 10 -22 Z', '#7f9a4a', { opacity: '.9' });
    if (o.mushrooms) out += h.r(-20, -30, 2, 6, 1, '#efe2c8') + h.p('M-25 -29 Q-19 -36 -13 -29 Z', '#c0573e') + h.r(-12, -28, 1.6, 4, 0.8, '#efe2c8') + h.p('M-15.5 -27 Q-11 -32 -7 -27 Z', '#c0573e');
    return out;
  };

  P.rock = function (o, c) {
    var col = o.colour || '#8f8a80', lt = h.tint(col, 0.22), dk = h.tint(col, -0.22);
    var out = h.shadow(54);
    out += h.p('M-26 0 Q-30 -16 -18 -26 Q-4 -32 10 -30 Q24 -26 28 -12 Q30 -2 24 0 Z', col);
    out += h.p('M-18 -26 Q-4 -32 10 -30 Q4 -22 -6 -18 Q-16 -18 -22 -20 Z', lt);
    out += h.p('M10 -30 Q24 -26 28 -12 Q30 -2 24 0 L8 0 Q16 -14 10 -30 Z', dk);
    out += h.l('M-8 -10 l5 -3 l4 2', dk, 1, { opacity: '.6' });
    if (season(c) === 'winter') out += h.p('M-22 -22 Q-10 -34 10 -32 Q22 -28 26 -18 Q14 -24 0 -24 Q-12 -22 -22 -22 Z', SNOW);
    else if (o.moss) out += h.p('M-24 -4 Q-24 -12 -16 -10 Q-12 -4 -10 0 H-24 Z', '#7f9a4a');
    return out;
  };

  P.pond = function (o, c) {
    var t = c.time, winter = season(c) === 'winter' || o.ice;
    var water = winter ? '#cfe0ec' : t === 'night' ? '#2c3d63' : t === 'dusk' ? '#a6bcc2' : t === 'grey' ? '#8ea6b4' : '#6aa0bf';
    var out = '';
    out += h.e(0, -4, 104, 17, '#7a6a4a', { opacity: '.5' });
    out += h.e(0, -4, 100, 15, h.tint(water, -0.2));
    out += h.e(0, -3, 96, 13, water);
    out += h.e(8, -2, 70, 6, h.tint(water, 0.18), { opacity: '.6' });
    out += h.l('M-60 -6 h26 M10 -10 h34 M-20 2 h24', h.tint(water, 0.45), 1.6, { opacity: '.8' });
    if (winter) out += h.l('M-70 -2 l40 -6 M20 0 l36 -8', '#ffffff', 2, { opacity: '.8' }) + h.e(-84, -6, 18, 5, SNOW) + h.e(86, -4, 16, 4, SNOW);
    else {
      out += [[-50, -4, 9], [-34, 1, 7], [40, -6, 8]].map(function (p) { return h.e(p[0], p[1], p[2], p[2] * 0.36, '#5f8f46') + h.p('M' + p[0] + ' ' + p[1] + ' l' + n(p[2]) + ' -2 l0 3 Z', water); }).join('');
      if (o.lily !== false) out += h.c(-36, 0, 2.6, '#f4ece4') + h.c(-36, 0, 1, '#f2c94c');
      /* reeds and cattails at the right end */
      out += h.l('M78 -4 Q76 -26 72 -38 M84 -4 Q86 -24 90 -34 M90 -4 Q92 -18 98 -24 M72 -4 Q66 -20 62 -26', '#5b7c3f', 1.8);
      out += h.r(70.5, -40, 3.4, 10, 1.7, '#7a4f30') + h.r(87.5, -36, 3.4, 10, 1.7, '#7a4f30');
      out += h.e(90, -2, 14, 3, '#5b7c3f', { opacity: '.7' });
    }
    return out;
  };

  /* ---------------- trees ---------------- */
  /* a bare winter tree: a tapering trunk, limbs, twigs, and snow along the tops of the limbs */
  function bare(c, bark, H, sp) {
    function Y(f) { return n(-H * f); }
    function X(v) { return n(v * sp); }
    var out = h.p('M-8 0 Q-5 -10 -5 -24 L-2 ' + Y(0.92) + ' H2 L5 -24 Q5 -10 8 0 Z', bark) + h.p('M2 0 L5 -24 L2 ' + Y(0.92) + ' H1 L1 0 Z', h.tint(bark, -0.25), { opacity: '.6' });
    var limbs = [['M-2 ' + Y(0.42) + ' Q' + X(-18) + ' ' + Y(0.55) + ' ' + X(-36) + ' ' + Y(0.78), 5], ['M2 ' + Y(0.48) + ' Q' + X(20) + ' ' + Y(0.58) + ' ' + X(38) + ' ' + Y(0.82), 5],
      ['M-1 ' + Y(0.66) + ' Q' + X(-8) + ' ' + Y(0.84) + ' ' + X(-16) + ' ' + Y(0.98), 3.6], ['M1 ' + Y(0.7) + ' Q' + X(10) + ' ' + Y(0.86) + ' ' + X(18) + ' ' + Y(1), 3.6]];
    limbs.forEach(function (l) { out += h.l(l[0], bark, l[1]); });
    out += h.l('M' + X(-36) + ' ' + Y(0.78) + ' l' + X(-8) + ' -10 M' + X(-36) + ' ' + Y(0.78) + ' l' + X(3) + ' -12 M' + X(38) + ' ' + Y(0.82) + ' l' + X(8) + ' -10 M' + X(38) + ' ' + Y(0.82) + ' l' + X(-3) + ' -12' +
      ' M' + X(-16) + ' ' + Y(0.98) + ' l' + X(-5) + ' -9 M' + X(-16) + ' ' + Y(0.98) + ' l' + X(4) + ' -9 M' + X(18) + ' ' + Y(1) + ' l' + X(5) + ' -8 M' + X(18) + ' ' + Y(1) + ' l' + X(-4) + ' -9' +
      ' M' + X(-20) + ' ' + Y(0.6) + ' l' + X(-12) + ' -1 M' + X(22) + ' ' + Y(0.63) + ' l' + X(12) + ' -2 M' + X(-9) + ' ' + Y(0.86) + ' l' + X(-10) + ' -3 M' + X(10) + ' ' + Y(0.88) + ' l' + X(10) + ' -3 M0 ' + Y(0.9) + ' l1 -14', bark, 2);
    if (season(c) === 'winter') out += h.l('M' + X(-14) + ' ' + n(-H * 0.52 - 3) + ' Q' + X(-24) + ' ' + n(-H * 0.62 - 3) + ' ' + X(-34) + ' ' + n(-H * 0.76 - 3) + ' M' + X(16) + ' ' + n(-H * 0.56 - 3) + ' Q' + X(26) + ' ' + n(-H * 0.66 - 3) + ' ' + X(36) + ' ' + n(-H * 0.8 - 3) + ' M' + X(-6) + ' ' + n(-H * 0.84 - 2.4) + ' l' + X(-8) + ' -10 M' + X(8) + ' ' + n(-H * 0.86 - 2.4) + ' l' + X(8) + ' -10', SNOW, 2.6);
    return out;
  }
  function trunk(w, hgt, bark) {
    return h.p('M' + (-w / 2 - 3) + ' 0 Q' + (-w / 2) + ' -6 ' + (-w / 2) + ' -12 L' + (-w / 2 + 1.5) + ' ' + (-hgt) + ' H' + (w / 2 - 1.5) + ' L' + (w / 2) + ' -12 Q' + (w / 2) + ' -6 ' + (w / 2 + 3) + ' 0 Z', bark) +
      h.p('M' + (w / 6) + ' 0 L' + (w / 6) + ' ' + (-hgt) + ' H' + (w / 2 - 1.5) + ' L' + (w / 2) + ' -12 Q' + (w / 2) + ' -6 ' + (w / 2 + 3) + ' 0 Z', h.tint(bark, -0.25), { opacity: '.6' });
  }
  P.maple = function (o, c) {
    var s = season(c), bark = '#6b4f3a';
    var col = o.colour || (s === 'autumn' ? '#c9502f' : s === 'spring' ? '#78ad4f' : '#4f8a3c');
    var out = h.shadow(110) + trunk(14, 80, bark) + h.l('M0 -60 L-22 -86 M2 -66 L24 -92', bark, 4);
    if (s === 'winter' && !o.colour) return h.shadow(80) + bare(c, bark, 160, 1.3);
    var mix = s === 'autumn' && !o.colour ? ['#c9502f', '#d9773f', '#b8432c', '#e0963a'] : null;
    var blobs = [[-36, -102, 26], [36, -104, 26], [0, -120, 34], [-20, -136, 24], [22, -138, 24], [0, -154, 18], [-44, -122, 18], [44, -124, 18], [0, -96, 26]];
    out += crown(mix ? blobs.map(function (b, i) { return b.concat(mix[i % 4]); }) : blobs, col);
    if (s === 'autumn' && !o.colour) {
      out += [[-60, -8], [-40, -4], [30, -6], [52, -3], [70, -7]].map(function (p, i) { return h.e(p[0], p[1], 4, 2, i % 2 ? '#d9773f' : '#c9502f', rot(i * 30, p[0], p[1])); }).join('');
    }
    return out;
  };

  P.birch = function (o, c) {
    var s = season(c), bark = '#eeeae2', mk = '#3a3632';
    var col = o.colour || (s === 'autumn' ? '#e0b13a' : s === 'spring' ? '#9cc66a' : '#7fae54');
    function stem(x, top, w, lean) {
      var d = 'M' + (x - w / 2) + ' 0 L' + (x + lean - w / 2 + 1) + ' ' + top + ' H' + (x + lean + w / 2 - 1) + ' L' + (x + w / 2) + ' 0 Z';
      var marks = '';
      for (var y = -14; y > top + 8; y -= 17) { var fx = x + lean * (y / top); marks += h.p('M' + n(fx - w / 2) + ' ' + y + ' q' + n(w * 0.4) + ' -2 ' + n(w * 0.6) + ' 1 q' + n(-w * 0.2) + ' 2 ' + n(-w * 0.6) + ' 1.6 Z', mk, { opacity: '.85' }); marks += h.r(fx + w * 0.05, y - 8, w * 0.4, 1.4, 0.7, mk, { opacity: '.55' }); }
      return h.p(d, bark) + h.p('M' + (x + w / 6) + ' 0 L' + (x + lean + w / 6) + ' ' + top + ' H' + (x + lean + w / 2 - 1) + ' L' + (x + w / 2) + ' 0 Z', '#cfc9be') + marks;
    }
    var out = h.shadow(80);
    if (s === 'winter' && !o.colour) return out + stem(-6, -150, 10, -6) + stem(10, -120, 8, 8) + h.l('M-12 -110 L-28 -134 M-10 -90 L4 -112 M14 -96 L28 -116', '#4a403a', 2) + h.l('M-29 -135 l5 -1 M27 -117 l5 0', SNOW, 2.4);
    out += stem(-6, -128, 10, -6) + stem(10, -100, 8, 8);
    var blobs = [[-20, -124, 18], [12, -128, 20], [-6, -150, 20], [-30, -146, 14], [22, -150, 14], [0, -170, 14], [26, -110, 14], [-34, -112, 12]];
    out += crown(blobs, col);
    out += h.p('M-8 -118 L-6 -128 L-4 -118 Z', bark);
    return out;
  };

  P.apple = function (o, c) {
    var s = season(c), bark = '#6f5240';
    var col = o.colour || (s === 'autumn' ? '#8a9a3e' : s === 'spring' ? '#86b25a' : '#5e8f3f');
    var out = h.shadow(120) + trunk(13, 64, bark) + h.l('M0 -56 Q-14 -66 -28 -82 M0 -58 Q14 -70 28 -84', bark, 4);
    if (s === 'winter' && !o.colour) return h.shadow(90) + bare(c, bark, 130, 1.6);
    out += crown([[-42, -96, 26], [42, -98, 26], [0, -112, 36], [-22, -130, 26], [24, -130, 26], [-52, -116, 18], [52, -118, 18], [0, -90, 24]], col);
    if (s === 'spring' && !o.apples) {
      out += [[-44, -104], [-30, -124], [-12, -138], [6, -120], [24, -136], [40, -110], [52, -122], [-20, -100], [14, -98], [-52, -120], [30, -98], [0, -146]].map(function (p) { return h.c(p[0], p[1], 3.2, '#f6d6de') + h.c(p[0], p[1], 1.1, '#e7a3b4'); }).join('');
    } else if (o.apples !== false) {
      var ap = [[-44, -100], [-26, -124], [-6, -104], [14, -126], [34, -104], [50, -116], [-50, -118], [4, -140], [24, -92], [-18, -88]];
      out += ap.map(function (p) { return h.c(p[0], p[1], 4.2, '#c0392b') + h.c(p[0] + 1.6, p[1] + 1.6, 2.6, '#9b2b22', { opacity: '.6' }) + h.c(p[0] - 1.4, p[1] - 1.4, 1.2, '#fff', { opacity: '.55' }); }).join('');
      if (s === 'autumn') out += h.c(-40, -5, 4.2, '#c0392b') + h.c(-41.4, -6.4, 1.2, '#fff', { opacity: '.5' }) + h.c(30, -4, 4.2, '#b5352a');
    }
    return out;
  };

  P.applefruit = function (o) {
    var col = o.colour || '#c0392b';
    return h.shadow(10) + h.p('M0 -8 Q-6 -11 -8 -6 Q-9 0 -3 1 Q0 0 0 0 Q0 0 3 1 Q9 0 8 -6 Q6 -11 0 -8 Z', col) +
      h.p('M0 -8 Q6 -11 8 -6 Q9 0 3 1 Q6 -4 2 -8 Z', h.tint(col, -0.22)) + h.e(-4, -6, 1.4, 2.2, '#fff', { opacity: '.45' }) +
      h.l('M0 -8 q0 -3 1.5 -4', '#5a3e2a', 1.1) + h.p('M1.5 -11 q4 -3 6 0 q-3 2 -6 0 Z', '#6f9a42');
  };

  P.spruce = function (o, c) {
    var col = o.colour || (season(c) === 'winter' ? '#3f6650' : '#456f4a'), dk = h.tint(col, -0.24), lt = h.tint(col, 0.16);
    var inner = ART.spruce(0, 0, 1, col);
    inner += h.p('M0 -100 L16 -62 H8 L26 -34 H14 L34 -6 H0 Z', dk, { opacity: '.5' });
    inner += h.p('M-8 -62 H8 L4 -57 H-4 Z M-14 -34 H14 L9 -28 H-9 Z', dk, { opacity: '.75' });
    /* needle tufts along each tier's lower edge, and light on the left slopes */
    var tufts = '';
    [[-62, 16], [-34, 26], [-6, 34]].forEach(function (t) {
      for (var x = -t[1] + 4; x < t[1] - 2; x += 6) tufts += 'M' + n(x) + ' ' + t[0] + ' l3 -4 l3 4 ';
    });
    inner += h.p(tufts, dk, { opacity: '.45' });
    inner += h.p('M0 -100 L-14 -66 L-9 -67 Z M-8 -62 L-23 -37 L-17 -38 Z M-14 -34 L-31 -9 L-24 -10 Z', lt, { opacity: '.55' });
    if (season(c) === 'winter') {
      var snow = '';
      [[[0, -100], [-16, -62]], [[-8, -62], [-26, -34]], [[-14, -34], [-34, -6]]].forEach(function (e, i) {
        var t = e[0], b = e[1], m = [t[0] + (b[0] - t[0]) * 0.4, t[1] + (b[1] - t[1]) * 0.4];
        snow += h.p('M' + n(m[0]) + ' ' + n(m[1]) + ' L' + b[0] + ' ' + b[1] + ' Q' + (b[0] + 2) + ' ' + (b[1] + 2.4) + ' ' + (b[0] + 4) + ' ' + (b[1] + 0.6) + ' L' + (b[0] + 6) + ' ' + b[1] + ' Q' + n((m[0] + b[0]) / 2 + 3.4) + ' ' + n((m[1] + b[1]) / 2 + 0.6) + ' ' + n(m[0]) + ' ' + n(m[1]) + ' Z', SNOW);
        if (i) snow += h.p('M' + (-b[0] - 8) + ' ' + b[1] + ' L' + (-b[0]) + ' ' + b[1] + ' L' + (-b[0] - 2) + ' ' + (b[1] - 3) + ' Q' + (-b[0] - 6) + ' ' + (b[1] - 2) + ' ' + (-b[0] - 8) + ' ' + b[1] + ' Z', SNOWS);
      });
      inner += snow + h.p('M0 -100 L-4 -92 Q0 -94 4 -92 Z', SNOW);
    }
    return h.shadow(70) + h.g(inner, 'scale(1.8)');
  };

  /* ---------------- campfire, stones and snow ---------------- */
  P.campfire = function (o, c) {
    var lit = o.lit !== false, out = '';
    if (lit) out += '<radialGradient id="' + c.id + 'fire' + o.i + '"><stop offset="0" stop-color="#ffcf6b" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf6b" stop-opacity="0"/></radialGradient>' + h.e(0, -14, 60, 40, 'url(#' + c.id + 'fire' + o.i + ')');
    out += h.shadow(60);
    out += h.r(-24, -10, 48, 8, 4, '#6b4c35', rot(-16, 0, -6)) + h.r(-24, -10, 48, 8, 4, '#7d5a3e', rot(16, 0, -6));
    out += h.e(-20, -10, 3, 3.6, '#d8b88a', rot(-16, -20, -10)) + h.e(20, -10, 3, 3.6, '#d8b88a', rot(16, 20, -10));
    if (lit) {
      out += h.p('M-14 -10 Q-18 -26 -6 -36 Q-8 -26 0 -24 Q-2 -34 4 -42 Q8 -30 12 -26 Q16 -18 14 -10 Z', '#e0672f');
      out += h.p('M-9 -10 Q-12 -22 -3 -28 Q-2 -20 2 -20 Q2 -28 6 -32 Q10 -22 10 -12 Z', '#f2a53a');
      out += h.p('M-4 -10 Q-6 -18 0 -22 Q2 -16 4 -18 Q6 -14 4 -10 Z', '#fde3a0');
      out += h.c(10, -46, 1.2, '#ffd27a') + h.c(-6, -50, 1, '#ffd27a') + h.c(3, -56, 0.9, '#ffe2a0');
    } else out += h.l('M0 -12 q-6 -10 2 -18 q6 -8 0 -16', '#b7b2aa', 2.2, { opacity: '.6' });
    [[-26, -3, 6], [-14, 0, 6.5], [0, 1, 6], [14, 0, 6.5], [26, -3, 6]].forEach(function (s, i) {
      var g = ['#8f8a80', '#a29d93', '#7f7a70'][i % 3];
      out += h.e(s[0], s[1] - 2, s[2], s[2] * 0.7, g) + h.e(s[0] - 1, s[1] - 4, s[2] * 0.6, s[2] * 0.3, h.tint(g, 0.25));
    });
    return out;
  };

  P.inuksuk = function (o, c) {
    var g = o.colour || '#8d8a84', out = h.shadow(80);
    function stone(x, y, w, hh, col, tilt) {
      var lt = h.tint(col, 0.22), dk = h.tint(col, -0.22);
      return h.g(h.r(-w / 2, -hh, w, hh, Math.min(5, hh / 3), col) + h.r(-w / 2 + 2, -hh, w - 4, Math.max(2.5, hh * 0.28), 2, lt, { opacity: '.8' }) +
        h.r(w / 2 - w * 0.28, -hh + 2, w * 0.28, hh - 2, Math.min(4, hh / 3), dk, { opacity: '.6' }), 'translate(' + x + ' ' + y + ') rotate(' + (tilt || 0) + ')');
    }
    out += stone(-12, 0, 14, 30, h.tint(g, -0.05), -2) + stone(12, 0, 14, 30, g, 2);
    out += stone(0, -30, 44, 10, h.tint(g, 0.05), 0);
    out += stone(0, -40, 26, 20, h.tint(g, -0.08), 1);
    out += stone(0, -60, 64, 9, g, -1);
    out += stone(0, -69, 16, 18, h.tint(g, 0.06), 0);
    if (season(c) === 'winter') out += h.p('M-32 -69 Q0 -73 32 -69 L30 -66 Q0 -69 -30 -66 Z M-8 -87 Q0 -90 8 -87 L8 -84 Q0 -86 -8 -84 Z', SNOW) + h.e(0, -1, 30, 4, SNOW);
    return out;
  };

  P.snowman = function (o) {
    var sn = '#f7f9fb', sh = '#d4dfea', out = h.shadow(56);
    function ball(y, r) { return h.c(0, y, r, sh) + h.c(-r * 0.12, y - r * 0.1, r * 0.9, sn) + h.c(-r * 0.4, y - r * 0.42, r * 0.28, '#fff'); }
    out += h.l('M10 -50 L32 -66 M26 -62 L32 -58 M-10 -50 L-30 -64 M-24 -60 L-30 -56 M30 -64 l2 -6', '#6b4c35', 2.4);
    out += ball(-22, 24) + ball(-56, 17) + ball(-80, 12.5);
    out += h.c(-1, -64, 1.8, '#2b2420') + h.c(0, -54, 1.8, '#2b2420') + h.c(1, -44, 1.8, '#2b2420');
    var sc = o.scarf === false ? '' : (o.scarf || '#c0573e');
    if (sc) out += h.r(-14, -72, 28, 6, 3, sc) + h.p('M6 -70 L12 -54 L5 -54 L1 -68 Z', h.tint(sc, -0.12)) + h.l('M-10 -71 v4 M-4 -71 v4 M2 -71 v4 M8 -71 v4', h.tint(sc, 0.25), 1.2, { opacity: '.8' });
    out += h.p('M5 -80 L20 -77 L5 -76 Z', '#e07a35') + h.eye(-1, -84, 1.7) + h.eye(7, -84, 1.7);
    out += h.c(-2, -76, 0.9, '#2b2420') + h.c(2, -75, 0.9, '#2b2420') + h.c(6, -76, 0.9, '#2b2420');
    if (o.hat !== false) {
      var hc = o.hatc || '#3a3f4a';
      out += h.r(-13, -94, 26, 4, 2, hc) + h.r(-9, -110, 18, 17, 2, hc) + h.r(-9, -98, 18, 3, 0, '#b2493a') + h.r(-7, -109, 3, 12, 1.5, '#fff', { opacity: '.18' });
    }
    return out;
  };

  P.igloo = function (o, c) {
    var sn = '#f3f7fa', sh = '#cfdbe7', ln = '#b8c7d6', out = h.shadow(150);
    out += h.p('M-72 0 Q-72 -70 0 -70 Q72 -70 72 0 Z', sn);
    out += h.p('M20 -68 Q72 -60 72 0 L36 0 Q50 -40 20 -68 Z', sh, { opacity: '.85' });
    out += h.p('M-50 -48 Q-30 -64 -6 -66', 'none', { stroke: '#fff', 'stroke-width': '5', 'stroke-linecap': 'round', opacity: '.9' });
    var rows = [-14, -28, -42, -55, -64], lines = '';
    rows.forEach(function (y, i) {
      var half = 72 * Math.sqrt(1 - Math.pow(y / 70, 2));
      lines += 'M' + n(-half) + ' ' + y + ' Q0 ' + (y - 3) + ' ' + n(half) + ' ' + y + ' ';
      var prev = i ? rows[i - 1] : 0, step = 22 + i * 4;
      for (var x = -half + (i % 2 ? step / 2 : step); x < half - 6; x += step) lines += 'M' + n(x) + ' ' + prev + ' L' + n(x) + ' ' + y + ' ';
    });
    out += h.l(lines, ln, 1.2, { opacity: '.9' });
    /* the entrance tunnel, facing out to the right front */
    out += h.p('M2 0 Q2 -38 32 -39 Q50 -38 58 -26 L58 0 Z', ln, { opacity: '.55' }) + h.p('M8 0 Q8 -34 34 -34 Q60 -34 60 0 Z', sn) + h.p('M40 -33 Q60 -30 60 0 L48 0 Q52 -22 40 -33 Z', sh);
    out += h.l('M10 -14 H58 M12 -26 H54 M24 0 V-14 M44 0 V-14 M34 -14 V-26', ln, 1.1, { opacity: '.9' });
    out += h.p('M22 0 Q22 -22 34 -22 Q46 -22 46 0 Z', o.lit ? '#f0c06a' : '#3c4a5a');
    if (o.lit) out += h.p('M26 0 Q26 -18 34 -18 Q42 -18 42 0 Z', '#ffd98a');
    out += h.e(0, 0, 80, 4, SNOW, { opacity: '.9' });
    return out;
  };
})();

