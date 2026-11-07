/* Language Atlas sound bank for the tool box, shared by every grade: what the Sound board knows about the 44 sounds.
   Needs atlas.js. Sets Atlas.soundbank = { places, manners, cons, vowels, valley, slides, rvowels, decks, move }.
     places    where the mouth makes a consonant, lips to throat: [id, name]. Each has a side-view picture (soundboard.js).
     manners   how the air comes out: [id, name], one row of the consonant wall each.
     cons      one consonant sound per entry: 'clip place manner voiced keyword | spelling word grade | ...'.
               clip is the recorded sound (assets/sounds/<clip>.mp3); voiced is 1 when the voice is on (b), 0 when quiet (p);
               keyword is the key-word picture (words.js). Each spelling shows from the grade it starts in; in its word, the
               spelling is marked with [ ] ('du[ck]'). A silent-e spelling marks both parts: 'c[a]k[e]'.
     vowels    the same for vowels: 'clip keyword | spelling word grade | ...' (every vowel has the voice on).
     valley    the vowel valley, smile to open mouth to round lips: [clip, left %, top %].
     slides, rvowels   the vowels that slide (igh, ow, oy, ue) and the vowels with r, in rows under the valley.
     decks     the Cards view's decks, in teaching order: [name, 'spelling spelling ...']. Each spelling is one of the spellings
               above; its card plays that sound and shows its first word.
     move      words for "Move it", each a picture in words.js split into its sounds: 'f i sh'. Each sound is a spelling above.
   A check builds every list again: every clip is recorded, every picture exists, every spelling is marked in its word, every
   deck card and Move it sound is a spelling above, and every Move it word is spelled by its sounds (tests/run.js). */
(function () {
  'use strict';
  var A = window.Atlas;
  A.soundbank = {
    places: [['lips', 'Lips'], ['teeth', 'Lip and teeth'], ['tongue', 'Tongue and teeth'], ['ridge', 'Behind top teeth'], ['roof', 'Roof of mouth'], ['back', 'Back of mouth'], ['throat', 'Throat']],
    manners: [['pop', 'Pop'], ['hum', 'Hum'], ['hiss', 'Hiss'], ['pophiss', 'Pop-hiss'], ['glide', 'Glide'], ['flow', 'Flow']],
    cons: [
      'p lips pop 0 pig | p [p]ig 1',
      'b lips pop 1 bat | b [b]at 1',
      't ridge pop 0 top | t [t]op 1',
      'd ridge pop 1 dog | d [d]og 1',
      'k back pop 0 kite | c [c]at 1 | k [k]ite 1 | ck du[ck] 1 | ch s[ch]ool 3',
      'g back pop 1 goat | g [g]oat 1',
      'm lips hum 1 map | m [m]ap 1',
      'n ridge hum 1 net | n [n]et 1 | kn [kn]ot 2',
      'ng back hum 1 ring | ng ri[ng] 1',
      'f teeth hiss 0 fish | f [f]ish 1 | ff o[ff] 1 | ph [ph]one 2',
      'v teeth hiss 1 van | v [v]an 1 | ve ha[ve] 2',
      'th tongue hiss 0 thumb | th [th]umb 1',
      'th-voiced tongue hiss 1 this | th [th]is 1',
      's ridge hiss 0 sun | s [s]un 1 | ss me[ss] 1 | c [c]ity 2 | ce ri[ce] 3',
      'z ridge hiss 1 zip | z [z]ip 1 | s ha[s] 1 | zz bu[zz] 2',
      'sh roof hiss 0 ship | sh [sh]ip 1 | ti ac[ti]on 4 | ci spe[ci]al 5',
      'zh roof hiss 1 treasure | s trea[s]ure 3 | si vi[si]on 4',
      'h throat hiss 0 hat | h [h]at 1',
      'ch roof pophiss 0 chin | ch [ch]in 1 | tch ca[tch] 2',
      'j roof pophiss 1 jet | j [j]et 1 | g [g]em 2 | dge bri[dge] 2',
      'wh lips glide 0 whale | wh [wh]ale 1',
      'w lips glide 1 web | w [w]eb 1',
      'y roof glide 1 yoyo | y [y]o-yo 1',
      'l ridge flow 1 lion | l [l]ion 1 | ll be[ll] 1',
      'r roof flow 1 red | r [r]ed 1 | wr [wr]ite 2'
    ],
    vowels: [
      'ee bee | ee b[ee] 1 | e m[e] 1 | ea s[ea] 1 | e_e th[e]m[e] 2 | y happ[y] 2',
      'i igloo | i [i]gloo 1 | y g[y]m 3',
      'ai rain | ai r[ai]n 1 | ay pl[ay] 1 | a_e c[a]k[e] 1 | eigh [eigh]t 3',
      'e egg | e [e]gg 1 | ea h[ea]d 3',
      'a apple | a [a]pple 1',
      'u up | u [u]p 1',
      'o octopus | o [o]ctopus 1',
      'oa boat | oa b[oa]t 1 | o_e h[o]m[e] 1 | ow sn[ow] 1 | o g[o] 1',
      'oo-short book | oo b[oo]k 1 | u p[u]t 2',
      'oo moon | oo m[oo]n 1 | ue bl[ue] 2 | ew gr[ew] 2 | u_e fl[u]t[e] 2',
      'igh kite | igh n[igh]t 1 | i_e k[i]t[e] 1 | y m[y] 1 | ie p[ie] 2',
      'ow cow | ow c[ow] 1 | ou h[ou]se 1',
      'oy boy | oy b[oy] 1 | oi c[oi]n 1',
      'ue cube | u_e c[u]b[e] 1 | ew f[ew] 2',
      'ar car | ar c[ar] 1',
      'or fork | or f[or]k 1 | aw s[aw] 2 | ore m[ore] 2',
      'er her | er h[er] 1 | ir b[ir]d 1 | ur f[ur] 1',
      'air chair | air ch[air] 1 | are c[are] 2 | ear b[ear] 3',
      'ear ear | ear [ear] 1 | eer d[eer] 3'
    ],
    valley: [['ee', 7, 4], ['i', 17, 22], ['ai', 27, 39], ['e', 37, 53], ['a', 47, 62], ['u', 58, 62], ['o', 68, 53], ['oa', 78, 39], ['oo-short', 87, 22], ['oo', 94, 4]],
    slides: ['igh', 'ow', 'oy', 'ue'],
    rvowels: ['ar', 'or', 'er', 'air', 'ear'],
    decks: [
      ['Short vowels', 'a e i o u'],
      ['Consonants', 'm s t p n c f b d g h l r v w j k y z'],
      ['Two letters, one sound', 'sh ch th wh ck ng ll ss ff'],
      ['Silent e', 'a_e i_e o_e u_e e_e'],
      ['Vowel teams', 'ai ay ee ea oa ow igh oo ou oy oi ue ew'],
      ['With r', 'ar or er ir ur air are ear'],
      ['Tricky spellings', 'ph kn wr tch dge ce ti ci si eigh']
    ],
    move: ['c a t', 'd o g', 'p i g', 'f i sh', 's u n', 'b u s', 'm a p', 'j e t', 'h a t', 'b e d', 'c u p', 'w e b', 'n e t', 'b a t', 't o p',
      'sh i p', 'ch i n', 'd u ck', 'r i ng', 'b ee', 'b oa t', 'm oo n', 'c ow', 'b oy', 'c ar', 'f or k', 'k i_e t', 'c u_e b', 'g oa t',
      'r ai n', 't r ee', 'b oo k', 'z i p', 'v a n', 'n e s t']
  };
})();
