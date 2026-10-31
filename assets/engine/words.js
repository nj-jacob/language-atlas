/* Language Atlas word pictures, shared by every grade: ways to SHOW words and sentences with as little text as possible.
   Needs atlas.js. Returns HTML strings for lessons and questions.
     Atlas.W.sent('We went home.')               a sentence on a strip
     Atlas.W.hl('We went home.', 0, 1)            the same text with letters from..to marked (here the W)
     Atlas.W.tile('un', 'prefix')                 one word part: 'prefix', 'base', 'suffix' or 'word' (each has its own colour)
     Atlas.W.sum([['un', 'prefix'], ['happy', 'base']])   un + happy = unhappy, as tiles
     Atlas.W.syl(['rab', 'bit'])                  a word split into syllables (beats)
     Atlas.W.gap()                                a blank to fill in a sentence
     Atlas.W.passage('Title', ['Line one.', ...]) a short reading passage on a card ('# Heading' lines show as headings)
     Atlas.W.icon('not')                          a small picture cue: not, again, full, without, before, wrong, listen, talk, read, write, lock, screen, people, think, star
     Atlas.W.means(icon, html)                    a meaning card: picture cue and a few words
     Atlas.W.pic('sun')                           a picture cue for a word (Atlas.W.pics lists them all)
     Atlas.W.step(picture, line)                  one "Watch me" step: a picture, then one short line (leave the line out when the picture says it) */
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
    van: '<path d="M5 33V15c0-2 1-3 3-3h22l8 8h3c1.5 0 2 1 2 2v11z"/><path d="M30 12v8h8M18 12v21"/><circle cx="14" cy="35" r="3.5"/><circle cx="34" cy="35" r="3.5"/>'
  };
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
    passage: function (title, lines) {
      return '<div class="psg">' + (title ? '<b class="pt">' + title + '</b>' : '') + lines.map(function (l) { return l.charAt(0) === '#' ? '<b class="psh">' + l.slice(2) + '</b>' : '<p>' + l + '</p>'; }).join('') + '</div>';
    },
    icon: function (name) { return '<svg class="wicon" viewBox="0 0 32 32" aria-hidden="true">' + ICONS[name] + '</svg>'; },
    pic: function (name) {
      if (!PICS[name]) throw new Error('Atlas.W.pic: no picture called "' + name + '"');
      return '<svg class="wpic" viewBox="0 0 48 48" role="img" aria-label="' + name + '"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + PICS[name] + '</g></svg>';
    },
    pics: Object.keys(PICS),
    means: function (icon, html) { return '<span class="wmeans">' + W.icon(icon) + '<span>' + html + '</span></span>'; },
    step: function (pic, line) { return '<div class="wsum">' + pic + '</div>' + (line ? '<p>' + line + '</p>' : ''); }
  });
})();
