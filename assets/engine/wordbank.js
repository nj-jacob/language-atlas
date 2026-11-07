/* Language Atlas word bank for the tool box, shared by every grade: the words Word builder knows, written fresh for this site.
   Needs atlas.js. Sets Atlas.wordbank = { tiles, sounds, beats, parts, means }.
     tiles   the letter tiles for the Sounds view: [spelling, first grade it shows in]. Each tile plays its sound (words.js names
             the recorded clip; ay plays ai, and so on).
     sounds  words split into sound tiles, one string per word: 'sh i p'. A tile written 'oo:oo-short' plays another clip in this
             word (book), so the word sounds right when it is blended. A silent-e tile such as 'a_e' is one sound in two places:
             'c a_e k' spells cake (the e goes after the next tile). A word shows in a grade when all its tiles do.
     beats   words split into syllables (beats), by the first grade they show in: { 1: 'RAB-bit ...', ... }. '-' cuts a word into
             beats; '+' joins two words (sun+set). The strong beat is in capitals (ba-NA-na). Each beat's vowel plays the sound its
             syllable type gives (tools.js); where the word says another, name it after '=': 'RAIN+bow=bow:oa'.
     parts   words made of parts with '+', and the word they spell after '='. A part is a prefix (ends in -), a suffix (starts with
             -), or a base or root (neither). Write 'er.more' to pick one meaning of a part. The checks build each word again
             from its parts with Word builder's spelling rules, so the two must agree.
     means   what each prefix, suffix and root means, and the first grade its tile shows in.
   Every grapheme in sounds must be a tile; every part must have a meaning. A check fails otherwise (tests/run.js). */
(function () {
  'use strict';
  var A = window.Atlas;
  function list(s) { return s.trim().split(/\s*\n\s*/); }
  A.wordbank = {
    tiles: [
      ['b', 1], ['c', 1], ['d', 1], ['f', 1], ['g', 1], ['h', 1], ['j', 1], ['k', 1], ['l', 1], ['m', 1], ['n', 1], ['p', 1], ['r', 1],
      ['s', 1], ['t', 1], ['v', 1], ['w', 1], ['y', 1], ['z', 1], ['ck', 1], ['ll', 1], ['ss', 1], ['ff', 1],
      ['sh', 1], ['ch', 1], ['th', 1], ['wh', 1], ['ng', 1], ['tch', 2],
      ['a', 1], ['e', 1], ['i', 1], ['o', 1], ['u', 1], ['ee', 1], ['oo', 1], ['ai', 1], ['oa', 1], ['igh', 1], ['a_e', 1], ['i_e', 1], ['o_e', 1], ['u_e', 1], ['e_e', 2],
      ['ay', 2], ['ea', 2], ['ie', 2], ['ue', 2], ['ew', 2], ['ow', 2], ['ou', 2], ['oy', 2], ['oi', 2],
      ['ar', 2], ['or', 2], ['er', 2], ['ir', 2], ['ur', 2], ['aw', 2], ['air', 2], ['ear', 2]
    ],
    sounds: list(
      'c a t\n h a t\n m a p\n c a p\n b a g\n j a m\n b e d\n j e t\n h e n\n p e n\n w e b\n p i g\n b i n\n l i d\n s i t\n d o g\n p o t\n m o p\n h o p\n s u n\n c u p\n b u s\n r u g\n m u d\n' +
      'f i sh\n sh i p\n sh o p\n ch o p\n ch i p\n ch i n\n th i n\n th:th-voiced i s\n th:th-voiced a t\n th:th-voiced e n\n wh e n\n wh i p\n' +
      'r i ng\n s i ng\n k i ng\n s o ng\n l o ng\n d u ck\n b a ck\n s o ck\n r o ck\n b e ll\n h i ll\n d o ll\n k i ss\n m e ss\n c l i ff\n' +
      'f r o g\n f l a g\n d r u m\n s t o p\n s p o t\n s w i m\n c r a b\n p l u m\n p l a n\n p l a n t\n n e s t\n d e s k\n h a n d\n j u m p\n t e n t\n m i l k\n p o n d\n l u n ch\n b e n ch\n' +
      'p i n:ng k\n th a n:ng k\n b a n:ng k\n' +
      't r ee\n b ee\n s ee\n f ee t\n s ee d\n g r ee n\n sh ee p\n s l ee p\n m oo n\n s p oo n\n f oo d\n z oo\n b oo:oo-short k\n l oo:oo-short k\n f oo:oo-short t\n g oo:oo-short d\n w oo:oo-short d\n' +
      'r ai n\n t ai l\n t r ai n\n s n ai l\n p ai n t\n b oa t\n c oa t\n r oa d\n s oa p\n g oa t\n t oa s t\n n igh t\n l igh t\n b r igh t\n h igh\n r igh t\n' +
      'p l ay\n d ay\n t r ay\n s t ay\n l ea f\n r ea d\n b ea ch\n t ie\n p ie\n b l ue\n g l ue\n n ew\n g r ew\n s n ow:oa\n g r ow:oa\n c ow\n n ow\n ow l\n t ow n\n ou t\n c l ou d\n sh ou t\n' +
      'b oy\n t oy\n c oi n\n s oi l\n oi l\n c ar\n s t ar\n p ar k\n f ar m\n sh ar k\n c or n\n f or k\n s t or m\n n or th\n f er n\n h er\n b ir d\n g ir l\n sh ir t\n t ur n\n b ur n\n f ur\n h ur t\n' +
      'c a_e k\n m a_e k\n l a_e k\n g a_e t\n n a_e m\n s n a_e k\n p l a_e t\n b i_e k\n t i_e m\n k i_e t\n s l i_e d\n s m i_e l\n f i_e v\n' +
      'h o_e m\n b o_e n\n r o_e p\n n o_e t\n s t o_e n\n c u_e b\n t u_e b\n f l u_e t\n m u_e l\n th e_e m\n' +
      's aw\n p aw\n d r aw\n h air\n ch air\n p air\n f air\n ear\n h ear\n n ear\n d ear\n c l ear\n m a tch\n c a tch\n s k y:igh\n f l y:igh\n m y:igh'
    ),
    beats: {
      1: 'RAB-bit KIT-ten MIT-ten PIC-nic SUN+set NAP-kin IN-sect PUMP-kin BAS-ket MUF-fin POP+corn CUP+cake RAIN+bow=bow:oa GAR-den ' +
        'WIN-ter SUM-mer RO-bot TI-ger PA-per SPI-der HOT+dog BATH+tub LAP+top LIP+stick BED+bug CAT+fish HAND+bag DUST+pan TEN-nis ' +
        'PUP-pet GOB-lin MAG-net TRUM-pet PLAS-tic CAC-tus VEL-vet HEL-met MAS-cot BOT-tom HAP-pen DIN-ner LET-ter BUT-ton COT-ton ' +
        'RIB-bon CAB-in WAG-on LEM-on SEV-en BA-by LA-dy PI-lot MU-sic SI-lent BA-con TU-lip ZE-ro PO-ny TI-ny CRA-zy LA-zy NA-vy ' +
        'CO-zy E-ven O-pen MO-ment LI-on SUN+shine PAN+cake IN+side BED+time PINE+cone SNOW+flake=snow:oa DRIVE+way RAIN+coat MAIL+box ' +
        'TEA+pot SEA+shell PEA+nut RAIN+drop SAIL+boat OAT+meal MON-key=mon:u SEE+saw TOOTH+brush CAR-pet FOR-est MAR-ket PAR-ty ' +
        'PEP-per SIS-ter DOC-tor TUR-key BIRTH+day FARM-er COR-ner STAR+fish HAR-bour LIT-tle BUB-ble PUZ-zle CAN-dle',
      2: 'HAM-ster DEN-tist DOL-phin MON-ster PEN-cil AP-ple TUR-tle TA-ble EA-gle PUR-ple ca-NOE=noe:oo KA-yak HOCK-ey to-MA-to ' +
        'ba-NAN-a BUT-ter-fly=fly:igh OC-to-pus kan-ga-ROO BOT-tle SIM-ple NEE-dle BEE-tle MAR-ble CIR-cle TI-tle CRA-dle BU-gle ' +
        'NOO-dle PUD-dle GIG-gle TWIN-kle SPAR-kle PEB-ble WAF-fle MID-dle PAD-dle RAT-tle STA-ple MA-ple TEA-cher SEA+weed ROAD+side ' +
        'PLAY+ground OUT+side MOUN-tain FOUN-tain COW+boy AU-tumn STRAW+ber-ry JEW-el SNOW+board=snow:oa SNOW+man=snow:oa ' +
        'WIN-dow=dow:oa YEL-low=low:oa PIL-low=low:oa SHAD-ow=ow:oa AL-pha-bet DIN-o-saur=saur:or AN-i-mal CAM-er-a va-CA-tion ' +
        'fan-TAS-tic BI-cy-cle TEL-e-phone HAM-bur-ger GI-ant QUI-et DU-et PO-em DI-et',
      3: 'EL-e-phant um-BREL-la to-BOG-gan POR-cu-pine CAR-i-bou=car:air,bou:oo CAL-en-dar com-PU-ter HEL-i-cop-ter mos-QUI-to=qui:ee ' +
        'GRAND+moth-er=moth:u HOS-pi-tal FAM-i-ly CAR-pen-ter SKEL-e-ton pep-per-O-ni=ni:ee spa-GHET-ti=ti:ee BLUE+ber-ry ' +
        'WOOD+peck-er=wood:oo-short SAT-ur-day no-VEM-ber oc-TO-ber sep-TEM-ber de-CEM-ber sas-KATCH-e-wan man-i-TO-ba ' +
        'on-TAR-i-o=tar:air CAN-a-da al-BER-ta PIN+wheel CHIP-munk rac-COON BEA-ver LOB-ster OT-ter MUSK+rat BLUE+jay cre-ATE vi-o-LIN ' +
        'RA-di-o',
      4: 'WA-ter-mel-on=wa:o CAT-er-pil-lar AL-li-ga-tor ad-VEN-ture cel-e-BRA-tion in-for-MA-tion TEL-e-vi-sion hip-po-POT-a-mus ' +
        'AC-tion NA-tion STA-tion MO-tion LO-tion FRAC-tion MIS-sion MAN-sion PIC-ture NA-ture FU-ture CAP-ture MIX-ture ' +
        'de-CI-sion=ci:i ex-PLO-sion con-ver-SA-tion ed-u-CA-tion trans-por-TA-tion ad-DI-tion=di:i sub-TRAC-tion mul-ti-pli-CA-tion ' +
        'AS-tro-naut ther-MOM-e-ter RE-cy-cle EN-er-gy HIS-to-ry CAL-cu-la-tor vol-CA-no tor-NA-do BLIZ-zard HUR-ri-cane mag-NET-ic',
      5: 'ex-PER-i-ment CON-ti-nent pop-u-LA-tion vo-CAB-u-lar-y ge-OG-ra-phy ma-TE-ri-al TEM-per-a-ture im-mi-GRA-tion in-VES-ti-gate ' +
        'de-MOC-ra-cy GOV-ern-ment=gov:u com-MU-ni-ty PHO-to-graph e-lec-TRIC-i-ty MI-cro-scope TEL-e-scope con-stel-LA-tion',
      6: 'ex-tra-OR-di-nar-y re-spon-si-BIL-i-ty en-VI-ron-ment com-mu-ni-CA-tion op-por-TU-ni-ty per-son-AL-i-ty im-ag-i-NA-tion ' +
        'or-gan-i-ZA-tion in-ter-NA-tion-al CAT-e-gor-y en-thu-si-AS-tic',
      7: 'pho-to-SYN-the-sis bi-o-di-VER-si-ty=di:i in-fra-STRUC-ture e-co-SYS-tem',
      8: 'sus-tain-a-BIL-i-ty con-sti-TU-tion-al ac-count-a-BIL-i-ty'
    },
    parts: list(
      'cat+-s=cats\n dog+-s=dogs\n hat+-s=hats\n box+-s=boxes\n bus+-s=buses\n fox+-s=foxes\n wish+-s=wishes\n' +
      'help+-ed=helped\n help+-ing=helping\n help+-er.one=helper\n help+-ful=helpful\n help+-less=helpless\n un-+help+-ful=unhelpful\n help+-ful+-ly=helpfully\n help+-ful+-ness=helpfulness\n help+-less+-ness=helplessness\n' +
      'jump+-ed=jumped\n jump+-ing=jumping\n jump+-er.one=jumper\n' +
      'play+-ed=played\n play+-ing=playing\n play+-er.one=player\n play+-ful=playful\n re-+play=replay\n play+-ful+-ly=playfully\n' +
      'fast+-er.more=faster\n fast+-est=fastest\n tall+-er.more=taller\n tall+-est=tallest\n kind+-ness=kindness\n kind+-ly=kindly\n un-+kind=unkind\n un-+kind+-ly=unkindly\n' +
      'care+-ful=careful\n care+-less=careless\n care+-ing=caring\n care+-ed=cared\n care+-ful+-ly=carefully\n care+-less+-ness=carelessness\n' +
      'hope+-ful=hopeful\n hope+-less=hopeless\n hope+-ing=hoping\n hope+-ed=hoped\n' +
      'hop+-ing=hopping\n hop+-ed=hopped\n run+-er.one=runner\n run+-ing=running\n big+-er.more=bigger\n big+-est=biggest\n swim+-er.one=swimmer\n swim+-ing=swimming\n' +
      'happy+-ness=happiness\n happy+-ly=happily\n un-+happy=unhappy\n happy+-er.more=happier\n happy+-est=happiest\n try+-ed=tried\n try+-ing=trying\n' +
      'rain+-y=rainy\n snow+-y=snowy\n wind+-y=windy\n sun+-y=sunny\n' +
      'pack+-ed=packed\n un-+pack=unpack\n re-+pack=repack\n un-+pack+-ed=unpacked\n' +
      'fill+-ed=filled\n re-+fill=refill\n re-+fill+-ed=refilled\n tell+-ing=telling\n re-+tell=retell\n' +
      'agree+-ment=agreement\n dis-+agree=disagree\n dis-+agree+-ment=disagreement\n agree+-able=agreeable\n' +
      'like+-ed=liked\n dis-+like=dislike\n un-+like+-ly=unlikely\n' +
      'fair+-ness=fairness\n un-+fair=unfair\n fair+-ly=fairly\n un-+fair+-ness=unfairness\n' +
      'heat+-ed=heated\n pre-+heat=preheat\n pre-+heat+-ed=preheated\n view+-er.one=viewer\n pre-+view=preview\n re-+view=review\n' +
      'spell+-ing=spelling\n mis-+spell=misspell\n mis-+spell+-ed=misspelled\n read+-er.one=reader\n read+-able=readable\n re-+read=reread\n mis-+read=misread\n' +
      'move+-ment=movement\n move+-able=movable\n move+-ing=moving\n re-+move=remove\n' +
      'enjoy+-able=enjoyable\n enjoy+-ment=enjoyment\n enjoy+-ed=enjoyed\n' +
      'stop+-able=stoppable\n un-+stop+-able=unstoppable\n non-+stop=nonstop\n non-+fiction=nonfiction\n' +
      'sense+-less=senseless\n non-+sense=nonsense\n' +
      'use+-ful=useful\n use+-less=useless\n re-+use=reuse\n mis-+use=misuse\n use+-ing=using\n use+-er.one=user\n' +
      'bio+graph+-y.thing=biography\n auto+bio+graph+-y.thing=autobiography\n auto+graph=autograph\n photo+graph=photograph\n para+graph=paragraph\n graph+-ic=graphic\n tele+graph=telegraph\n' +
      'tele+phone=telephone\n micro+phone=microphone\n phone+-ic=phonic\n tele+scope=telescope\n micro+scope=microscope\n peri+scope=periscope\n' +
      'geo+graph+-y.thing=geography\n geo+logy=geology\n bio+logy=biology\n thermo+meter=thermometer\n baro+meter=barometer\n' +
      'trans+port=transport\n port+-able=portable\n ex-+port=export\n im-+port=import\n inter-+rupt=interrupt\n e-+rupt=erupt\n bank+rupt=bankrupt\n' +
      'con-+struct=construct\n de-+struct+-ion=destruction\n struct+-ure=structure\n pre-+dict=predict\n dict+-ion+-ary=dictionary\n contra-+dict=contradict\n' +
      'in-+spect=inspect\n spect+-ator=spectator\n re-+spect=respect\n re-+spect+-ful=respectful'
    ),
    means: {
      'un-': ['not', 1], 're-': ['again', 2], 'dis-': ['not, or the opposite', 3], 'pre-': ['before', 3], 'mis-': ['wrongly', 4], 'non-': ['not', 4],
      'ex-': ['out', 7], 'im-': ['in', 7], 'inter-': ['between', 7], 'e-': ['out', 7], 'con-': ['together', 7], 'de-': ['down, undo', 7], 'in-': ['into', 7], 'contra-': ['against', 7],
      '-s': ['more than one', 1], '-ed': ['in the past', 1], '-ing': ['happening now', 1], '-er.more': ['more', 2], '-est': ['the most', 2],
      '-er.one': ['a person or thing that does it', 2], '-ful': ['full of', 2], '-less': ['without', 2], '-ly': ['in a way that is', 2], '-y': ['full of, or like', 2], '-y.thing': ['a thing or subject', 7],
      '-ness': ['being', 3], '-able': ['can be', 4], '-ment': ['the act or result of', 4],
      '-ic': ['about, or like', 7], '-ion': ['the act or result of', 7], '-ary': ['a place or book for', 7], '-ure': ['the thing made by', 7], '-ator': ['a person who', 7],
      bio: ['life', 7], graph: ['write or draw', 7], auto: ['self', 7], photo: ['light', 7], para: ['beside', 7], tele: ['far', 7], phone: ['sound', 7],
      micro: ['small', 7], scope: ['look at', 7], peri: ['around', 7], geo: ['earth', 7], logy: ['study of', 7], thermo: ['heat', 7], meter: ['measure', 7],
      baro: ['weight, pressure', 7], trans: ['across', 7], port: ['carry', 7], rupt: ['break', 7], struct: ['build', 7], dict: ['say', 7], spect: ['look', 7]
    }
  };
})();
