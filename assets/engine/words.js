/* Language Atlas word pictures, shared by every grade: ways to SHOW words and sentences with as little text as possible.
   Needs atlas.js. Returns HTML strings for lessons and questions.
     Atlas.W.sent('We went home.')               a sentence on a strip
     Atlas.W.hl('We went home.', 0, 1)            the same text with letters from..to marked (here the W)
     Atlas.W.tile('un', 'prefix')                 one word part: 'prefix', 'base', 'suffix' or 'word' (each has its own colour)
     Atlas.W.sum([['un', 'prefix'], ['happy', 'base']])   un + happy = unhappy, as tiles
     Atlas.W.syl(['rab', 'bit'])                  a word split into syllables (beats)
     Atlas.W.gap()                                a blank to fill in a sentence
     Atlas.W.passage('Title', ['Line one.', ...], opts) a reading passage on a card. '# Heading' lines show as headings; an empty
                                                  line '' starts a new paragraph (sentences in a paragraph flow together).
                                                  opts.pics: picture names for a band at the top; opts.tap: every sentence can be
                                                  tapped (data-hit = its place in lines), for "tap the sentence that tells you".
     Atlas.W.web('main idea', ['detail', ...])    the main idea as a roof over its details
     Atlas.W.chain(['event', ...], ['First', ...]) a story map: numbered cards in order, with optional labels
     Atlas.passages(texts, { short: 100 })         a grade's passages and their helpers (show, body, words, list): see below
     Atlas.W.icon('not')                          a small picture cue: not, again, full, without, before, wrong, listen, talk, read, write, lock, screen, people, think, star
     Atlas.W.means(icon, html)                    a meaning card: picture cue and a few words
     Atlas.W.pic('sun')                           a picture cue for a word (Atlas.W.pics lists them all)
     Atlas.W.step(picture, line)                  one "Watch me" step: a picture, then one short line (leave the line out when the picture says it)
     Atlas.W.sound('sh')                          a button that plays a recorded letter sound, shown as /sh/ (Atlas.W.sound('ee', '/ē/') to show other text)
     Atlas.W.soundRow(['f', 'r', 'o', 'g'])       a word as its sounds: one sound button per tile (soundRow(list, labels) to show other text)
     Atlas.W.soundNames                           the recorded sounds (assets/sounds/<name>.mp3). c and ck play k; ay plays ai (SAME below)
     Atlas.W.clip('ay')                           the recorded sound a spelling plays ('ai')
     Atlas.W.playAll(['sh', 'i', 'p'], each, done) play sounds one after another (blending in Word builder)
   Sound buttons are for phonics only. Never put one inside an answer choice: a choice is a button already. */
(function () {
  'use strict';
  var A = window.Atlas;
  var ICONS = {
    /* a circle with a line through it */
    not: '<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="3"/><path d="M8.5 23.5l15-15" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
    /* a curved arrow that comes back round */
    again: '<path d="M24.5 12.5A9.5 9.5 0 1 0 25 19" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M25.5 5.5v7.5H18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    /* a cup filled to the top */
    full: '<path d="M8 8h16l-2 18H10z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M9.2 12h13.6l-1.4 13H10.6z" fill="currentColor" opacity=".55"/>',
    /* an empty cup */
    without: '<path d="M8 8h16l-2 18H10z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 17h8" stroke="currentColor" stroke-width="2" stroke-dasharray="2 2"/>',
    /* an ear */
    listen: '<path d="M10 13a7 7 0 0 1 14 0c0 4-4 5-4 9a4 4 0 0 1-7 2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M14 13a3 3 0 0 1 6 0c0 2-2 2.5-2 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    /* a speech bubble */
    talk: '<path d="M6 8h20v13H14l-6 5v-5H6z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><path d="M11 13h10M11 17h6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    /* an open book */
    read: '<path d="M16 9c-3-2-7-2-10-1v16c3-1 7-1 10 1 3-2 7-2 10-1V8c-3-1-7-1-10 1zM16 9v16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>',
    /* a pencil */
    write: '<path d="M7 25l2-6L21 7l4 4-12 12z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M18 10l4 4" stroke="currentColor" stroke-width="2.4"/>',
    /* a padlock */
    lock: '<rect x="8" y="14" width="16" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M11.5 14v-3a4.5 4.5 0 0 1 9 0v3" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="16" cy="20" r="1.8" fill="currentColor"/>',
    /* a screen */
    screen: '<rect x="5" y="7" width="22" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M12 26h8M16 22v4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    /* two people */
    people: '<circle cx="11.5" cy="11" r="3.6" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="21.5" cy="11" r="3.6" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M5 25c0-4 3-7 6.5-7s6.5 3 6.5 7M15 25c0-4 3-7 6.5-7s6.5 3 6.5 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    /* a thought cloud */
    think: '<path d="M10 20a5 5 0 0 1 1-10 6 6 0 0 1 11 1 4.5 4.5 0 0 1 0 9z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="10" cy="24.5" r="1.8" fill="currentColor"/><circle cx="7" cy="27.5" r="1.2" fill="currentColor"/>',
    /* a clock with its hand turned back */
    before: '<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M16 10v6l-4 3" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    /* a cross in a circle */
    wrong: '<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M11.5 11.5l9 9M20.5 11.5l-9 9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    /* a star */
    star: '<path d="M16 5l3.3 7 7.7.9-5.7 5.2 1.6 7.6L16 21.9l-6.9 3.8 1.6-7.6L5 12.9l7.7-.9z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/>'
  };
  /* picture cues for words a child names by sound (sun, cat ...): plain line art, 48 x 48 */
  var PICS = {
    sun: '<circle cx="24" cy="24" r="8"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6M11.3 11.3l4.2 4.2M32.5 32.5l4.2 4.2M11.3 36.7l4.2-4.2M32.5 15.5l4.2-4.2"/>',
    cat: '<path d="M14 20l-2-10 7 5h10l7-5-2 10"/><path d="M14 20c-2 9 3 15 10 15s12-6 10-15"/><circle cx="19.5" cy="23" r="1.2" fill="currentColor"/><circle cx="28.5" cy="23" r="1.2" fill="currentColor"/><path d="M22.5 27h3l-1.5 1.8z"/><path d="M8 26l7 1M8 30l7-1M40 26l-7 1M40 30l-7-1"/>',
    dog: '<path d="M15 16c-5-1-7 4-6 9l4 1M33 16c5-1 7 4 6 9l-4 1"/><path d="M15 16c2-3 5-4 9-4s7 1 9 4c2 5 2 12-1 16-2 3-5 4-8 4s-6-1-8-4c-3-4-3-11-1-16z"/><circle cx="20" cy="22" r="1.2" fill="currentColor"/><circle cx="28" cy="22" r="1.2" fill="currentColor"/><path d="M21.5 28c1-1 4-1 5 0-1 1.5-4 1.5-5 0z" fill="currentColor"/><path d="M24 30v2"/>',
    pig: '<circle cx="24" cy="25" r="13"/><path d="M14 15l-2-5 7 3M34 15l2-5-7 3"/><ellipse cx="24" cy="29" rx="5.5" ry="4"/><circle cx="22" cy="29" r=".9" fill="currentColor"/><circle cx="26" cy="29" r=".9" fill="currentColor"/><circle cx="19" cy="21" r="1.2" fill="currentColor"/><circle cx="29" cy="21" r="1.2" fill="currentColor"/>',
    fish: '<path d="M8 24c5-8 15-10 23-5l9-6v22l-9-6c-8 5-18 3-23-5z"/><circle cx="15" cy="22" r="1.3" fill="currentColor"/><path d="M21 19c2 3 2 7 0 10"/>',
    hat: '<path d="M6 33c6 3 30 3 36 0"/><path d="M13 32V17c0-3 22-3 22 0v15"/><path d="M13 25c6 2 16 2 22 0"/>',
    bed: '<path d="M6 14v24M42 26v12M6 30h36M6 26h36"/><path d="M10 26v-5c0-1.5 1-2 2.5-2h6c1.5 0 2.5.5 2.5 2v5"/><path d="M21 22h17c2 0 4 2 4 4"/>',
    cup: '<path d="M10 14h22v14c0 6-4 9-11 9s-11-3-11-9z"/><path d="M32 18h3c3 0 5 2 5 5s-2 5-5 5h-3"/><path d="M8 41h26"/>',
    bus: '<rect x="8" y="9" width="32" height="27" rx="4"/><path d="M8 24h32M24 9v15"/><circle cx="15" cy="38" r="3"/><circle cx="33" cy="38" r="3"/><path d="M13 30h3M32 30h3"/>',
    map: '<path d="M6 12l11-4 14 4 11-4v28l-11 4-14-4-11 4z"/><path d="M17 8v28M31 12v28"/><path d="M21 22l3 3m0-3l-3 3" />',
    jet: '<path d="M6 25l6-1 22-1c4 0 8 1 8 1s-4 2-8 2l-22-1z"/><path d="M20 23l-6-13h4l11 13M20 26l-6 12h4l11-12M10 24l-4-7h3l5 7"/>',
    fox: '<path d="M10 9l5 11M38 9l-5 11"/><path d="M10 9l14 12 14-12-2 13c-1 7-7 13-12 15-5-2-11-8-12-15z"/><circle cx="19" cy="24" r="1.2" fill="currentColor"/><circle cx="29" cy="24" r="1.2" fill="currentColor"/><circle cx="24" cy="33" r="1.5" fill="currentColor"/>',
    egg: '<path d="M24 7c7 0 13 12 13 21 0 8-6 13-13 13s-13-5-13-13c0-9 6-21 13-21z"/>',
    bee: '<ellipse cx="25" cy="27" rx="12" ry="8"/><path d="M21 19.5v15M27 19.3v15.4M33 21v12"/><path d="M13 26l-4 1"/><path d="M20 19c-4-7 3-10 5-3M27 19c2-7 9-5 5 1"/><circle cx="16" cy="25" r="1" fill="currentColor"/>',
    kite: '<path d="M24 5l11 14-11 16-11-16z"/><path d="M13 19h22M24 5v30"/><path d="M24 35c-2 3 2 4 0 7M22 38l4 1M22 41l4 1"/>',
    moon: '<path d="M30 7a17 17 0 1 0 11 24A14 14 0 0 1 30 7z"/>',
    tree: '<path d="M17 31c-6 0-9-4-8-8 0-3 2-5 4-6 0-5 4-9 9-9 4 0 7 2 8 5 4 0 8 3 8 8 0 3-1 5-3 6 0 3-3 4-6 4z"/><path d="M24 31v11M20 42h8M24 35l-4-3M24 34l4-4"/>',
    apple: '<path d="M24 16c-4-3-14-3-14 9 0 9 6 16 10 16 2 0 3-1 4-1s2 1 4 1c4 0 10-7 10-16 0-12-10-12-14-9z"/><path d="M24 16c0-4 1-7 4-9"/><path d="M26 11c3-2 7-1 8 1-3 2-6 2-8-1z"/>',
    ball: '<circle cx="24" cy="24" r="16"/><path d="M9 19c10 4 20 4 30 0M9 29c10-4 20-4 30 0"/>',
    box: '<path d="M8 16l16-7 16 7v18l-16 7-16-7z"/><path d="M8 16l16 7 16-7M24 23v18"/>',
    key: '<circle cx="14" cy="24" r="7"/><circle cx="14" cy="24" r="2.5"/><path d="M21 24h20M35 24v6M40 24v5"/>',
    nest: '<path d="M7 26c0 8 8 13 17 13s17-5 17-13"/><path d="M7 26h34"/><path d="M10 31c5-2 9 1 14-1s9 1 14-1M13 36c4-1 8 1 11 0s7 1 11 0"/><ellipse cx="19" cy="22" rx="4" ry="5"/><ellipse cx="29" cy="22" rx="4" ry="5"/>',
    van: '<path d="M5 33V15c0-2 1-3 3-3h22l8 8h3c1.5 0 2 1 2 2v11z"/><path d="M30 12v8h8M18 12v21"/><circle cx="14" cy="35" r="3.5"/><circle cx="34" cy="35" r="3.5"/>',
    canoe: '<path d="M4 25h40c-4 8-12 11-20 11S8 33 4 25z"/><path d="M33 7L21 33"/><path d="M21 33l-3 6 4 2 3-6"/>',
    snow: '<path d="M24 5v38M7.5 14.5l33 19M7.5 33.5l33-19"/><path d="M19 8l5 5 5-5M19 40l5-5 5 5M7 21l7-2-2-7M41 27l-7 2 2 7M7 27l7 2-2 7M41 21l-7-2 2-7"/>',
    leaf: '<path d="M24 5l3.5 8.5 6-3-1.5 9 7.5-1.5-3.5 6.5 5 3-11.5 3 1.5 6.5-7-3-7 3 1.5-6.5L7 27l5-3-3.5-6.5L16 19l-1.5-9 6 3z"/><path d="M24 33v11"/>',
    book: '<path d="M24 13c-5-3-12-3-18-1v25c6-2 13-2 18 1 5-3 12-3 18-1V12c-6-2-13-2-18 1zM24 13v25"/><path d="M11 18c3-.7 6-.7 9 .5M11 24c3-.7 6-.7 9 .5M28 18.5c3-1.2 6-1.2 9-.5M28 24.5c3-1.2 6-1.2 9-.5"/>',
    house: '<path d="M7 23L24 9l17 14"/><path d="M11 20v20h26V20"/><path d="M20 40V29h8v11"/><path d="M33 15V8h4v10"/>',
    rain: '<path d="M14 30h21a7 7 0 0 0 1-14 10 10 0 0 0-19-2 8 8 0 0 0-3 16z"/><path d="M16 35l-2 5M24 35l-2 5M32 35l-2 5"/>',
    ferry: '<path d="M5 29h38l-6 9H11z"/><path d="M12 29v-8h22v8M20 21v-6h7v6"/><path d="M16 25h2M22 25h2M28 25h2"/><path d="M3 43c4-2 6 2 10 0s6 2 10 0 6 2 10 0 6 2 10 0"/>',
    hockey: '<path d="M31 5L19 36H8v4h14l13-34"/><ellipse cx="36" cy="38" rx="6" ry="2.6"/>',
    goose: '<path d="M30 9c3-2 7-1 7 3l4 2-4 1c-1 3-3 5-3 9 0 7-6 13-15 13-6 0-11-3-12-8 6 1 11-1 14-5 3-4 5-9 9-15z"/><path d="M16 30c3 1 7 0 9-3M22 37v5M18 37v5"/>',
    moose: '<path d="M14 8c0 6 4 9 10 9s10-3 10-9M10 10c0 3 2 5 4 5M38 10c0 3-2 5-4 5"/><path d="M20 17v9c0 5 2 9 4 9s4-4 4-9v-9"/><path d="M22 35v4h4v-4"/><circle cx="21.5" cy="22" r=".8" fill="currentColor"/><circle cx="26.5" cy="22" r=".8" fill="currentColor"/>',
    plant: '<path d="M24 40V20"/><path d="M24 26c-8 0-12-5-12-11 7 0 12 4 12 11zM24 22c0-7 5-11 12-11 0 6-4 11-12 11z"/><path d="M14 40h20l-2 6H16z"/>',
    sky: '<path d="M4 30c6-10 12-14 20-6s14 4 20-6"/><path d="M4 38c6-8 12-11 20-4s14 3 20-5"/><path d="M10 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1zM36 30l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/>',
    letter: '<rect x="6" y="12" width="36" height="25" rx="2"/><path d="M6 14l18 13 18-13"/>',
    angel: '<path d="M24 8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"/><path d="M24 17c-10-3-16 2-17 9 6-2 10-2 13 1-2 5-5 9-9 14h26c-4-5-7-9-9-14 3-3 7-3 13-1-1-7-7-12-17-9z"/>',
    science: '<path d="M19 6h10M21 6v12L10 38c-1 2 0 4 3 4h22c3 0 4-2 3-4L27 18V6"/><path d="M15 30h18"/><circle cx="21" cy="35" r="1.4" fill="currentColor"/><circle cx="27" cy="33" r="1" fill="currentColor"/>',
  };
  /* the 44 recorded sounds, and spellings that share a clip */
  var SOUNDS = 'b d f g h j k l m n p r s t v w wh y z sh ch th th-voiced ng zh a e i o u ai ee igh oa ue oo-short oo ow oy ar or er air ear'.split(' ');
  /* spellings that play another sound's clip (the usual sound; a word can name another, see wordbank.js) */
  var SAME = { c: 'k', ck: 'k', ay: 'ai', ll: 'l', ss: 's', ff: 'f', tch: 'ch', ea: 'ee', ie: 'igh', ew: 'ue', ou: 'ow', oi: 'oy', ir: 'er', ur: 'er', aw: 'or',
    a_e: 'ai', e_e: 'ee', i_e: 'igh', o_e: 'oa', u_e: 'ue' };
  var me = document.currentScript, SOUND_DIR = me ? me.src.replace(/engine\/words\.js(\?.*)?$/, 'sounds/') : '../assets/sounds/';
  var SPEAKER = '<svg class="wsnd-i" viewBox="0 0 32 32" aria-hidden="true"><path d="M6 12h5l7-6v20l-7-6H6z" fill="currentColor"/><path d="M22 11c2 3 2 7 0 10M25.5 8c4 4.5 4 11.5 0 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  function clip(name) {
    var n = SAME[name] || name;
    if (SOUNDS.indexOf(n) < 0) throw new Error('Atlas.W.sound: no recorded sound called "' + name + '"');
    return n;
  }
  function soundButton(name, label, cls) {
    var n = clip(name);
    return '<button type="button" class="wsnd' + (cls ? ' ' + cls : '') + '" data-snd="' + n + '" aria-label="Play the sound ' + label.replace(/<[^>]*>/g, '') + '">' + SPEAKER + '<span>' + label + '</span></button>';
  }
  /* one player for every sound: a new sound stops the one before. The button that started it glows while it plays. */
  var player = null, playing = null, after = null;
  function stop() { if (playing) playing.classList.remove('wsnd-on'); playing = null; after = null; }
  function play(name, b, done) {
    if (!player) {
      player = new Audio();
      player.addEventListener('ended', function () { var d = after; stop(); if (d) d(); });
    }
    stop();
    player.pause();
    player.src = SOUND_DIR + clip(name) + '.mp3';
    playing = b || null; after = done || null;
    if (b) b.classList.add('wsnd-on');
    var p = player.play();
    if (p && p.catch) p.catch(function () { var d = after; stop(); if (d) d(); });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.wsnd');
    if (!b) return;
    e.preventDefault();
    play(b.getAttribute('data-snd'), b);
  });

  var W = (A.W = {
    sent: function (s) { return '<span class="sent">' + s + '</span>'; },
    hl: function (s, from, to) { return s.slice(0, from) + '<mark class="hl">' + s.slice(from, to) + '</mark>' + s.slice(to); },
    tile: function (text, kind) { return '<span class="wt wt-' + (kind || 'word') + '">' + text + '</span>'; },
    sum: function (parts) {
      return '<span class="wsum">' + parts.map(function (p) { return W.tile(p[0], p[1]); }).join('<span class="wop" aria-hidden="true">+</span>') +
        '<span class="wop" aria-hidden="true">=</span>' + W.tile(parts.map(function (p) { return p[0]; }).join(''), 'word') + '</span>';
    },
    syl: function (parts) { return '<span class="wsyl">' + parts.map(function (p) { return W.tile(p, 'syl'); }).join('<span class="wop" aria-hidden="true">&middot;</span>') + '</span>'; },
    gap: function () { return '<span class="wgap" aria-label="blank"></span>'; },
    passage: function (title, lines, opts) {
      opts = opts || {};
      var paras = lines.indexOf('') >= 0, out = '', open = false;
      function sent(l, i) { return '<span class="ps"' + (opts.tap ? ' data-hit="' + i + '"' : '') + '>' + l + '</span>'; }
      lines.forEach(function (l, i) {
        if (l.charAt(0) === '#' || l === '') { if (open) { out += '</p>'; open = false; } if (l) out += '<b class="psh">' + l.slice(2) + '</b>'; return; }
        if (!paras) { out += '<p>' + sent(l, i) + '</p>'; return; }
        out += (open ? ' ' : '<p>') + sent(l, i); open = true;
      });
      if (open) out += '</p>';
      var band = opts.pics && opts.pics.length ? '<div class="pband" aria-hidden="true">' + opts.pics.map(W.pic).join('') + '</div>' : '';
      return '<div class="psg' + (opts.tap ? ' psg-tap' : '') + '">' + band + (title ? '<b class="pt">' + title + '</b>' : '') + out + '</div>';
    },
    web: function (main, details) {
      return '<div class="wweb"><div class="ww-top">' + main + '</div><div class="ww-legs">' + details.map(function (d) { return '<span>' + d + '</span>'; }).join('') + '</div></div>';
    },
    chain: function (items, labels) {
      return '<ol class="wchain">' + items.map(function (t, i) { return '<li>' + (labels && labels[i] ? '<b>' + labels[i] + '</b>' : '') + '<span>' + t + '</span></li>'; }).join('') + '</ol>';
    },
    icon: function (name) { return '<svg class="wicon" viewBox="0 0 32 32" aria-hidden="true">' + ICONS[name] + '</svg>'; },
    pic: function (name) {
      if (!PICS[name]) throw new Error('Atlas.W.pic: no picture called "' + name + '"');
      return '<svg class="wpic" viewBox="0 0 48 48" role="img" aria-label="' + name + '"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + PICS[name] + '</g></svg>';
    },
    pics: Object.keys(PICS),
    means: function (icon, html) { return '<span class="wmeans">' + W.icon(icon) + '<span>' + html + '</span></span>'; },
    sound: function (name, label) { return soundButton(name, label || '/' + name + '/'); },
    soundRow: function (names, labels) {
      return '<span class="wsyl">' + names.map(function (n, i) { return soundButton(n, labels ? labels[i] : n, 'wt wt-syl'); }).join('') + '</span>';
    },
    soundNames: SOUNDS.slice(),
    clip: clip,
    /* play sounds one after another: each(i) runs as sound i starts, done() after the last */
    playAll: function (names, each, done) {
      var i = 0;
      (function next() {
        if (i >= names.length) { if (done) done(); return; }
        if (each) each(i);
        play(names[i++], null, next);
      })();
    },
    step: function (pic, line) { return '<div class="wsum">' + pic + '</div>' + (line ? '<p>' + line + '</p>' : ''); }
  });
  /* a grade's reading passages, with the helpers every reading chapter uses. Call once in gradeN/texts.js:
       Atlas.passages({ key: passage, ... }, { short: 100 })   sets Atlas.texts to the passages and adds:
     Atlas.texts.show(t, upTo, opts)  the passage on a card (W.passage, with its pics band). upTo: a number of lines, or words
                                      from the last sentence to show; opts.tap lets the child tap each sentence
     Atlas.texts.body(t)              its sentences (no headings or paragraph breaks)
     Atlas.texts.words(t)             how many words it has
     Atlas.texts.list(need, lv)       passages that have what a question needs; lv 1 gives short ones (under opts.short words),
                                      lv 3 long ones, lv 2 any (any at all, if none fit) */
  A.passages = function (texts, opts) {
    var short = (opts && opts.short) || 100, T = (A.texts = texts);
    T.show = function (t, upTo, o) {
      var lines = t.lines;
      if (typeof upTo === 'number') lines = lines.slice(0, upTo);
      else if (upTo) lines = lines.slice(0, lines.findIndex(function (l) { return l.indexOf(upTo) >= 0; }) + 1);
      return W.passage(t.title, lines, { pics: t.pics, tap: o && o.tap });
    };
    T.body = function (t) { return t.lines.filter(function (l) { return l && l.charAt(0) !== '#'; }); };
    T.words = function (t) { return T.body(t).join(' ').split(/\s+/).length; };
    T.list = function (need, lv) {
      var all = Object.keys(T).map(function (k) { return T[k]; }).filter(function (t) { return t && t.lines && t[need]; });
      var fit = all.filter(function (t) { return lv === 1 ? T.words(t) < short : lv === 3 ? T.words(t) >= short : true; });
      return fit.length ? fit : all;
    };
    return T;
  };
})();
