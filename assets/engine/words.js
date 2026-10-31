/* Language Atlas word pictures, shared by every grade: ways to SHOW words and sentences with as little text as possible.
   Needs atlas.js. Returns HTML strings for lessons and questions.
     Atlas.W.sent('We went home.')               a sentence on a strip
     Atlas.W.hl('We went home.', 0, 1)            the same text with letters from..to marked (here the W)
     Atlas.W.tile('un', 'prefix')                 one word part: 'prefix', 'base', 'suffix' or 'word' (each has its own colour)
     Atlas.W.sum([['un', 'prefix'], ['happy', 'base']])   un + happy = unhappy, as tiles
     Atlas.W.syl(['rab', 'bit'])                  a word split into syllables (beats)
     Atlas.W.gap()                                a blank to fill in a sentence
     Atlas.W.passage('Title', ['Line one.', ...]) a short reading passage on a card
     Atlas.W.icon('not')                          a small picture cue: not, again, full, without, listen, talk, read, write, lock, screen, people, think, star
     Atlas.W.means(icon, html)                    a meaning card: picture cue and a few words
     Atlas.W.step(picture, line)                  one "Watch me" step: a picture, then one short line */
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
    /* a star */
    star: '<path d="M16 5l3.3 7 7.7.9-5.7 5.2 1.6 7.6L16 21.9l-6.9 3.8 1.6-7.6L5 12.9l7.7-.9z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/>'
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
    passage: function (title, lines) { return '<div class="psg">' + (title ? '<b class="pt">' + title + '</b>' : '') + lines.map(function (l) { return '<p>' + l + '</p>'; }).join('') + '</div>'; },
    icon: function (name) { return '<svg class="wicon" viewBox="0 0 32 32" aria-hidden="true">' + ICONS[name] + '</svg>'; },
    means: function (icon, html) { return '<span class="wmeans">' + W.icon(icon) + '<span>' + html + '</span></span>'; },
    step: function (pic, line) { return '<div class="wsum">' + pic + '</div><p>' + line + '</p>'; }
  });
})();
