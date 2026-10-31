/* Language Atlas word pictures, shared by every grade: ways to SHOW words and sentences with as little text as possible.
   Needs atlas.js. Returns HTML strings for lessons and questions.
     Atlas.W.sent('We went home.')               a sentence on a strip
     Atlas.W.hl('We went home.', 0, 1)            the same text with letters from..to marked (here the W)
     Atlas.W.tile('un', 'prefix')                 one word part: 'prefix', 'base', 'suffix' or 'word' (each has its own colour)
     Atlas.W.sum([['un', 'prefix'], ['happy', 'base']])   un + happy = unhappy, as tiles
     Atlas.W.icon('not')                          a small picture cue: 'not', 'again'
     Atlas.W.means(icon, html)                    a meaning card: picture cue and a few words
     Atlas.W.step(picture, line)                  one "Watch me" step: a picture, then one short line */
(function () {
  'use strict';
  var A = window.Atlas;
  var ICONS = {
    /* a circle with a line through it */
    not: '<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="3"/><path d="M8.5 23.5l15-15" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
    /* a curved arrow that comes back round */
    again: '<path d="M24.5 12.5A9.5 9.5 0 1 0 25 19" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M25.5 5.5v7.5H18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  var W = (A.W = {
    sent: function (s) { return '<span class="sent">' + s + '</span>'; },
    hl: function (s, from, to) { return s.slice(0, from) + '<mark class="hl">' + s.slice(from, to) + '</mark>' + s.slice(to); },
    tile: function (text, kind) { return '<span class="wt wt-' + (kind || 'word') + '">' + text + '</span>'; },
    sum: function (parts) {
      return '<span class="wsum">' + parts.map(function (p) { return W.tile(p[0], p[1]); }).join('<span class="wop" aria-hidden="true">+</span>') +
        '<span class="wop" aria-hidden="true">=</span>' + W.tile(parts.map(function (p) { return p[0]; }).join(''), 'word') + '</span>';
    },
    icon: function (name) { return '<svg class="wicon" viewBox="0 0 32 32" aria-hidden="true">' + ICONS[name] + '</svg>'; },
    means: function (icon, html) { return '<span class="wmeans">' + W.icon(icon) + '<span>' + html + '</span></span>'; },
    step: function (pic, line) { return '<div class="wsum">' + pic + '</div><p>' + line + '</p>'; }
  });
})();
