/* Language Atlas Spelling path: the rule cards, loaded with the steps (assets/engine/spellbank.js) when the tool first opens.
   Atlas.spelling.rule({ id, name, rule, why, ex, not, steps, stress }): one card.
     rule   the rule in one short line, for the child;  why: the grown-up note (grown-up view only).
     ex     examples; not: words that break the rule or do not use it (optional). An example is a word or a word sum
            ('hop + ing = hop[p]ing', 'in- + legal = [il]legal'); [ ] marks the part the rule works on, shown in colour.
            tests/spelling.js works every word sum out again with the spelling rules (stress lists the bases whose last beat is stressed).
     steps  the steps that practise the rule; each of those steps links to the card. */
(function () {
  var rule = Atlas.spelling.rule;
  rule({ id: 'floss', name: 'FLOSS', rule: 'After one short vowel at the end of a one-beat word, double f, l, s or z.',
    why: 'FLOSS names the four letters. The word must have one beat and one short vowel, and the sound must come right after the vowel: off, hill, mess, buzz. A handful of small words break it (if, of, bus, yes, gas); learn those by heart.',
    ex: ['o[ff]', 'stu[ff]', 'hi[ll]', 'be[ll]', 'me[ss]', 'gra[ss]', 'bu[zz]', 'ja[zz]'], not: ['i[f]', 'bu[s]', 'ye[s]', 'ga[s]'], steps: ['floss', 'oll-ull'] });
  rule({ id: 'ck', name: 'ck after a short vowel', rule: 'Right after one short vowel, /k/ is spelled ck.',
    why: 'Listen for what comes just before /k/. A short vowel right before it: ck (duck, stick). A consonant or a long vowel before it: k (milk, book, bake).',
    ex: ['du[ck]', 'ro[ck]', 'sti[ck]', 'ba[ck]', 'ne[ck]'], not: ['mil[k]', 'boo[k]', 'pin[k]', 'cloa[k]'], steps: ['ck'] });
  rule({ id: 'c-or-k', name: 'c or k at the start', rule: 'Use c before a, o and u. Use k before e, i and y.',
    why: 'At the start of a word or beat, look at the next letter. c before a, o, u and before a consonant (cat, cot, cup, clap); k before e, i, y (kept, kid, key), because c there would say /s/.',
    ex: ['[c]at', '[c]ot', '[c]up', '[k]id', '[k]ey', '[k]ettle'], steps: ['ck', 'blend-start'] });
  rule({ id: 'tch', name: 'tch after a short vowel', rule: 'Right after one short vowel, /ch/ is spelled tch.',
    why: 'Same idea as ck: a short vowel right before /ch/ takes tch (catch, fetch). After a consonant or a long vowel, use ch (lunch, teach). The exceptions to learn: much, such, rich, which.',
    ex: ['ca[tch]', 'fe[tch]', 'pi[tch]', 'no[tch]', 'hu[tch]'], not: ['mu[ch]', 'su[ch]', 'ri[ch]', 'whi[ch]', 'lun[ch]'], steps: ['tch'] });
  rule({ id: 'dge', name: 'dge after a short vowel', rule: 'Right after one short vowel, /j/ at the end is spelled dge.',
    why: 'A short vowel right before /j/ takes dge (badge, bridge). After a consonant or a long vowel, use ge (hinge, page). No English word ends in j.',
    ex: ['ba[dge]', 'e[dge]', 'bri[dge]', 'lo[dge]', 'fu[dge]'], not: ['hu[ge]', 'pa[ge]', 'hin[ge]', 'chan[ge]'], steps: ['dge', 'g4-age'] });
  rule({ id: 'silent-e', name: 'Silent e', rule: 'A silent e at the end makes the vowel say its name.',
    why: 'The e is not said; it reaches back over one consonant and makes the vowel long. Show the pair: cap and cape, kit and kite. The vowel and the e work together, so a sound box holds them as one tile (a–e).',
    ex: ['cap → cap[e]', 'kit → kit[e]', 'hop → hop[e]', 'cub → cub[e]', 'tub → tub[e]'], steps: ['a-e', 'i-e', 'o-e', 'u-e'] });
  rule({ id: 'no-v', name: 'No word ends in v', rule: 'English words do not end in v. Add an e.',
    why: 'This e does not make the vowel long, which is why have, give and love sound short. It is there only because a word cannot end in v (or in j, u or i, in most words).',
    ex: ['hav[e]', 'giv[e]', 'liv[e]', 'lov[e]', 'glov[e]', 'sleev[e]'], steps: ['i-e', 'u-e'] });
  rule({ id: 'soft-cg', name: 'Soft c and soft g', rule: 'c says /s/ and g says /j/ before e, i or y.',
    why: 'Before e, i or y, c is soft (city, face) and g is usually soft (gem, gym, page). Before a, o, u they are hard. A few common g words stay hard: get, give, girl, gift.',
    ex: ['[c]ity', '[c]ent', 'fa[c]e', '[g]em', '[g]ym', 'pa[g]e'], not: ['[g]et', '[g]ive', '[g]irl', '[g]ift'], steps: ['soft-cg', 'g5-keep-e'] });
  rule({ id: 'plural', name: 'Plurals: s or es', rule: 'Add es after s, x, z, ch and sh. Add s to the rest.',
    why: 'Say the plural: if it adds a beat (boxes, wishes), the ending is es. Words ending in f or fe often change to ves (knife, knives), and some o words take es (heroes).',
    ex: ['cat + s = cat[s]', 'box + es = box[es]', 'wish + es = wish[es]', 'lunch + es = lunch[es]', 'kiss + es = kiss[es]'], not: ['kni[ves]', 'her[oes]'], steps: ['plural-s', 'suffix-es', 'g6-plurals-ves'] });
  rule({ id: 'ed', name: 'Ending -ed', rule: '-ed can say /t/, /d/ or /id/, but it is always spelled ed.',
    why: 'Have the child say the word and listen: jumped ends /t/, played ends /d/, wanted adds a beat /id/. Whatever it sounds like, the past ending is written ed.',
    ex: ['jump[ed]', 'play[ed]', 'want[ed]', 'fill[ed]', 'hunt[ed]'], steps: ['suffix-ed'] });
  rule({ id: 'doubling', name: 'Doubling: 1-1-1', rule: 'One beat, one short vowel, one last consonant: double it before a vowel ending.',
    why: 'Check all three: one beat (hop), one short vowel (o), one consonant after it (p). Then a vowel ending (-ing, -ed, -er, -est) doubles the consonant: hopping. The double letter keeps the vowel short; hoping, with one p, is a different word.',
    ex: ['hop + ing = hop[p]ing', 'run + er = run[n]er', 'sad + est = sad[d]est', 'stop + ed = stop[p]ed'], not: ['jump + ing = jumping', 'rain + ing = raining', 'sad + ly = sadly'], steps: ['suffix-ing', 'suffix-more', 'g7-doubling'] });
  rule({ id: 'drop-e', name: 'Drop the e', rule: 'Drop the silent e before an ending that starts with a vowel.',
    why: 'The vowel ending does the e\'s job, so the e goes: hope, hoping. A consonant ending (-ful, -ly, -ment) keeps the e: hopeful. After soft c or g, the e stays before -able and -ous (noticeable, courageous).',
    ex: ['hope + ing = hop[ing]', 'bake + ed = bak[ed]', 'make + er = mak[er]', 'nice + est = nic[est]'], not: ['hope + ful = hope[ful]', 'safe + ly = safe[ly]'], steps: ['suffix-ing', 'suffix-more', 'g4-ate-ation'] });
  rule({ id: 'y-to-i', name: 'Change y to i', rule: 'After a consonant, y changes to i before an ending, except -ing.',
    why: 'happy, happiness. Keep the y when a vowel is before it (play, played) and before -ing, so two i do not sit together (crying).',
    ex: ['happy + ness = happ[i]ness', 'cry + ed = cr[i]ed', 'beauty + ful = beaut[i]ful', 'busy + ly = bus[i]ly'], not: ['cry + ing = cr[y]ing', 'play + ed = pla[y]ed'], steps: ['y-to-i', 'g4-ly-ful-less'] });
  rule({ id: 'stress', name: 'Doubling in longer words', rule: 'In a longer word, double the last letter only if the last beat is stressed.',
    why: 'Say the word and find the strong beat: be-GIN, pre-FER: double (beginning, preferred). VIS-it, O-pen: no double (visiting, opened). It is the 1-1-1 rule, checked on the last beat.',
    stress: ['begin', 'prefer', 'forget', 'admit'],
    ex: ['begin + ing = begin[n]ing', 'prefer + ed = prefer[r]ed', 'forget + ing = forget[t]ing', 'admit + ed = admit[t]ed'], not: ['visit + ing = visiting', 'open + ed = opened', 'garden + er = gardener'], steps: ['g7-doubling'] });
  rule({ id: 'prefix', name: 'Prefixes keep every letter', rule: 'A prefix never changes the word. Keep every letter of both.',
    why: 'Add the prefix to the whole word: mis + spell keeps both s (misspell); un + natural keeps both n. A double letter where they meet is right.',
    ex: ['mis- + spell = [mis]spell', 'un- + natural = [un]natural', 'dis- + appear = [dis]appear', 'un- + necessary = [un]necessary'], steps: ['prefix', 'g4-prefix', 'g4-inter-trans-anti'] });
  rule({ id: 'in-changes', name: 'in- that changes', rule: 'in- (not) becomes im- before b, m, p; il- before l; ir- before r.',
    why: 'The prefix bends to make the word easier to say. That is why illegal has two l and irregular two r: one from the prefix, one from the word.',
    ex: ['in- + possible = [im]possible', 'in- + mature = [im]mature', 'in- + legal = [il]legal', 'in- + regular = [ir]regular', 'in- + active = [in]active'], steps: ['g6-in-not'] });
  rule({ id: 'ie-ei', name: 'ie or ei', rule: 'i before e, except after c, or when it says /ay/.',
    why: 'For long /ee/: ie (believe, field), but ei after c (receive, ceiling). For /ay/: ei (neighbour, weight). Learn the odd ones by heart: weird, seize, their, either.',
    ex: ['bel[ie]ve', 'f[ie]ld', 'rec[ei]ve', 'c[ei]ling', 'n[ei]ghbour', 'w[ei]ght'], not: ['w[ei]rd', 's[ei]ze', 'th[ei]r'], steps: ['g7-ie-ei', 'ei-eigh'] });
  rule({ id: 'able-ible', name: '-able or -ible', rule: 'Use -able after a whole word. Use -ible after a part that is not a word.',
    why: 'Cover the ending: if a whole word is left (accept, read), write able. If only a part is left (vis, terr, poss), write ible. It works for most words.',
    ex: ['accept[able]', 'read[able]', 'depend[able]', 'vis[ible]', 'terr[ible]', 'poss[ible]'], steps: ['g5-able-ible'] });
  rule({ id: 'shun', name: 'tion, sion or cian', rule: '/shun/ is usually tion. Use sion after l or s, or for /zhun/. Use cian for a person.',
    why: 'Most /shun/ words end in tion (action). Base words ending in ss keep them (discuss, discussion); /zhun/ is sion (vision); a person who does a skill is cian (musician, from music).',
    ex: ['ac[tion]', 'na[tion]', 'discus[sion]', 'expan[sion]', 'vi[sion]', 'musi[cian]'], steps: ['tion', 'g5-cian-sion', 'g6-ssion'] });
  rule({ id: 'relative', name: 'Find a relative', rule: 'An unclear vowel is clear in a word from the same family.',
    why: 'In longer words a vowel often sounds like /uh/ (the schwa). Say a relative where it is stressed: define shows the i in definition; distance shows the a in distant.',
    ex: ['def[i]ne → def[i]nition', 'comp[e]te → comp[e]tition', 'dist[a]nce → dist[a]nt', 'differ[e]nce → differ[e]nt'], steps: ['schwa', 'g4-schwa', 'g4-ant-ent', 'g6-ance-ence'] });
  rule({ id: 'keep-e', name: 'Keep the e after soft c and g', rule: 'Keep the e after c or g before -able and -ous.',
    why: 'The e keeps c saying /s/ and g saying /j/. Without it, noticable would say /k/ and couragous /g/. Other words still drop the e (lovable).',
    ex: ['notic[e]able', 'chang[e]able', 'manag[e]able', 'courag[e]ous', 'outrag[e]ous'], not: ['love + able = lov[able]'], steps: ['g5-keep-e'] });
  rule({ id: 'ally', name: 'ic adds -ally', rule: 'A word ending in ic adds -ally, not -ly.',
    why: 'You often do not hear the al, so remember the pattern: basic, basically. Publicly is the one common word that breaks it.',
    ex: ['basic + ally = basic[ally]', 'tragic + ally = tragic[ally]', 'logic + ally = logic[ally]', 'magic + ally = magic[ally]'], not: ['public + ly = public[ly]'], steps: ['g7-ally', 'suffix-g3'] });
  rule({ id: 'canadian', name: 'Canadian spelling', rule: 'Canada writes our, re and ize, and doubles l before -ed.',
    why: 'Canadian spelling keeps the u in our and writes centre and metre, but uses ize like most Canadian publishers. Set spell-checkers to English (Canada).',
    ex: ['col[our]', 'neighb[our]', 'cent[re]', 'met[re]', 'organ[ize]', 'trave[ll]ed', 'cance[ll]ed'], steps: ['g6-canadian', 'er-spellings'] });
  rule({ id: 'ph', name: 'ph says /f/', rule: 'In words from Greek, /f/ is often spelled ph.',
    why: 'Greek words came into English with ph for /f/: photo, graph, phone. If a word sounds like science or a long word part (graph, phone, photo), try ph.',
    ex: ['[ph]oto', '[ph]one', 'gra[ph]', 'tro[ph]y', 'al[ph]abet'], steps: ['ph', 'g6-graph-phon', 'g8-gh-ph'] });
  rule({ id: 'silent', name: 'Silent letters', rule: 'Some letters are written but not said. Say the word the spelling way.',
    why: 'Long ago these letters were said. Saying the spelling way (k-nee, lam-b) and finding a relative where the letter is heard (sign, signal) both help.',
    ex: ['[k]nee', '[w]rite', 'lam[b]', 'si[g]n', 'de[b]t', 'cas[t]le'], steps: ['silent', 'g4-silent', 'g7-greek-silent'] });
})();
