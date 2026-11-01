/* Grade 8 answer checks: forms, features and style (grade8/chapters/forms.js).
   Forms are worked out from the text on screen with the checker's own rules, signal words from the paragraph, and graphs from
   their numbers. Voices, techniques, narrators and other points of view are authored, so the checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const div = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d; };
  const card = q => { const p = div(q.fig).querySelector('.psg'); if (!p) return { title: '', heads: 0, lines: [] };
    return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', heads: p.querySelectorAll('.psh').length, lines: [...p.querySelectorAll('.ps')].map(x => text(x.innerHTML)) }; };
  const why = (q, good) => q.why && q.why.answer === (good ? 0 : 1);

  /* forms, from what the text looks like */
  const DAYS = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), /;
  const formOf = c => { const l = c.lines[0] || '', all = c.lines.join(' ');
    return /^[A-Z ]+ — /.test(l) ? 'news report' : /^[A-Z]+: \(/.test(l) ? 'play script' : /^Q: /.test(l) ? 'interview' : DAYS.test(l) ? 'diary entry' : /★/.test(all) ? 'review'
      : /^You will need/.test(l) ? 'procedure' : /^Dear /.test(l) ? 'letter to the editor' : /^Opinion:/.test(c.title) ? 'opinion piece' : c.title === 'Introducing the SmartSpoon' ? 'satire'
      : c.title === 'Portage' ? 'poem' : c.heads ? 'information text' : 'short story'; };
  const FEAT = { 'short story': 'characters', 'information text': 'headings', 'letter to the editor': 'greeting', 'opinion piece': 'claim', satire: 'exaggeration', poem: 'short lines',
    'news report': 'dateline', 'play script': 'stage directions', interview: 'questions and answers', 'diary entry': 'private thoughts', review: 'rating', procedure: 'numbered steps' };
  V['g8-genre'] = q => mk(q) === formOf(card(q)) ? '' : 'it is a ' + formOf(card(q));
  V['g8-genre-clue'] = q => { const f = FEAT[formOf(card(q))]; return mk(q).includes(f) && q.options.map(text).filter(o => o.includes(f)).length === 1 ? '' : 'expected the features of a ' + formOf(card(q)); };
  V['g8-genre-match'] = q => q.pairs.every(p => text(p[1]).includes(FEAT[text(p[0])])) ? '' : 'a form is matched to the wrong features';
  V['g8-genre-tf'] = (q, m) => { const right = formOf(card(q)) === m.said; return q.answer === right && why(q, right) ? '' : 'expected ' + right; };

  /* patterns, from their signal words */
  const patternOf = s => /solution|To fix this|The answer was/.test(s) ? 'problem and solution' : /Because|As a result|, so /.test(s) ? 'cause and effect'
    : /on the other hand|However|Unlike/.test(s) ? 'compare and contrast' : /First|Later|Then|Finally/.test(s) ? 'time order' : 'description';
  const SIGNALS = ['One solution', 'To fix this', 'The answer was', 'Because', 'As a result', 'so', 'on the other hand', 'However', 'Unlike', 'Finally', 'Later', 'Then'];
  V['g8-pattern'] = (q, m) => mk(q) === patternOf(text(m.s)) ? '' : 'expected ' + patternOf(text(m.s));
  V['g8-signal'] = (q, m) => SIGNALS.includes(mk(q)) && text(m.s).includes(mk(q)) && q.tiles.map(text).filter(t => SIGNALS.includes(t)).length === 1 ? '' : 'the signal words are not the ones marked';
  V['g8-pattern-tf'] = (q, m) => { const right = patternOf(text(m.s)) === m.said; return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  const WHOLE = { 'A Garden on the Roof': 'problem and solution', 'Letter to the Editor: Keep the Library Open': 'problem and solution', 'Winter Roads': 'cause and effect',
    'The Return of the Lake Sturgeon': 'problem and solution', 'The Highest Tides on Earth': 'cause and effect', 'Opinion: Lakeview Needs a Skate Park': 'problem and solution', "Fix It, Don't Toss It": 'description' };
  V['g8-passage-pattern'] = q => { const w = WHOLE[card(q).title]; return w && mk(q) === w ? '' : 'expected ' + w; };

  /* features */
  const JOB = { glossary: 'key words', infographic: 'pictures and numbers', sidebar: 'beside', caption: 'image', timeline: 'time order', heading: 'section', index: 'page numbers',
    'table of contents': 'chapters', legend: 'symbols' };
  const USE = { 'bold word': 'glossary', 'at a glance': 'infographic', 'fun fact': 'sidebar', photo: 'caption', 'came first': 'timeline', 'section you need': 'heading',
    'every page': 'index', organized: 'table of contents', 'map symbol': 'legend' };
  const LOOKS = { Glossary: 'glossary', Index: 'index', Contents: 'table of contents', Legend: 'legend', 'Did you know?': 'sidebar' };
  const lookOf = q => { const c = card(q), d = div(q.fig); return LOOKS[c.title] || (d.querySelector('.wchain') ? 'timeline' : /students take/.test(d.textContent) ? 'infographic' : d.querySelector('i') ? 'caption' : ''); };
  V['g8-feature'] = (q, m) => mk(q).includes(JOB[m.f]) ? '' : 'expected the job of a ' + m.f;
  V['g8-which-feature'] = (q, m) => { const k = Object.keys(USE).find(k => m.want.includes(k)); return k && mk(q) === USE[k] ? '' : 'expected ' + (k && USE[k]); };
  V['g8-feature-look'] = q => mk(q) === lookOf(q) ? '' : 'it is a ' + lookOf(q);
  V['g8-feature-match'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a feature is matched to the wrong job';

  /* graphs, read from the bars on screen */
  const bars = q => { const s = div(q.fig); return [...s.querySelectorAll('.val')].map((v, i) => [s.querySelectorAll('.lab')[i].textContent, +v.textContent]); };
  const val = (q, l) => (bars(q).find(b => b[0] === l) || [])[1];
  V['g8-graph-most'] = (q, m) => { const b = bars(q), top = b.reduce((a, x) => (m.most ? x[1] > a[1] : x[1] < a[1]) ? x : a); return mk(q) === top[0] ? '' : 'expected ' + top[0]; };
  V['g8-misleading'] = q => { const lo = Math.min(...[...div(q.fig).querySelectorAll('.axis')].map(a => +a.textContent)); return mk(q).startsWith(lo === 0 ? 'No' : 'Yes') ? '' : 'the scale starts at ' + lo; };
  V['g8-graph-diff'] = (q, m) => +mk(q) === val(q, m.a) - val(q, m.b) ? '' : 'expected ' + (val(q, m.a) - val(q, m.b));
  V['g8-graph-tf'] = (q, m) => { const right = val(q, m.a) > val(q, m.b); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };

  /* voice: each line, by its first words, with its voice and the words that create it */
  const VOICE = { Honestly: ['boastful', 'ever seen'], Introducing: ['mock-serious', 'too much work'], Council: ['formal and urgent', 'act now'], Kokum: ['warm and longing', 'I miss it'],
    'Oh, great': ['sarcastic', 'Just what I wanted'], 'The tide': ['calm and factual', '16 metres'], 'We won': ['excited', 'actually won'], Um: ['nervous and unsure', 'never mind'],
    'Who left': ['angry and frustrated', 'Every single time'], 'The puddle': ['playful', 'daring me'] };
  const voiceOf = s => VOICE[Object.keys(VOICE).find(k => text(s).startsWith(k))] || [];
  V['g8-voice-style'] = (q, m) => mk(q) === voiceOf(m.s)[0] ? '' : 'expected ' + voiceOf(m.s)[0];
  V['g8-voice-words'] = (q, m) => mk(q).includes(voiceOf(m.s)[1]) && text(m.s).includes(mk(q)) ? '' : 'expected the words with "' + voiceOf(m.s)[1] + '"';
  V['g8-voice-tf'] = (q, m) => { const right = voiceOf(m.s)[0] === m.said; return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-voice-match'] = q => q.pairs.every(p => Object.values(VOICE).some(v => text(p[0]).includes(v[1]) && text(p[1]) === v[0])) ? '' : 'words are matched to the wrong voice';

  /* sentence style, worked out from the sentences: short ones, one long one, repeated starts, questions, first sounds, a list of three */
  const techOf = s => { const ss = s.split(/(?<=[.?!]) /), words = s.replace(/[.,?!]/g, '').split(' '), starts = ss.map(x => x.split(' ')[0]);
    return ss.filter(x => x.endsWith('?')).length >= 2 ? 'questions to the reader' : new Set(starts).size < ss.length ? 'repetition'
      : ss.length >= 3 && ss.every(x => x.split(' ').length <= 5) ? 'short sentences' : ss.length === 1 && words.length >= 20 ? 'one long sentence'
      : words.filter(w => w[0].toLowerCase() === words[0][0].toLowerCase()).length >= 4 ? 'alliteration' : ss.length === 1 && /\w+, \w+ and/.test(s) ? 'a list of three' : ''; };
  const EFF = { 'short sentences': 'tension', 'one long sentence': 'calm', repetition: 'force', 'questions to the reader': 'think', alliteration: 'memorable', 'a list of three': 'rhythm' };
  V['g8-sentence-technique'] = (q, m) => mk(q) === techOf(text(m.s)) ? '' : 'expected ' + techOf(text(m.s));
  V['g8-shape'] = (q, m) => { const e = EFF[techOf(text(m.s))]; return e && mk(q).includes(e) ? '' : 'expected the effect "' + e + '"'; };
  V['g8-shape-tf'] = (q, m) => { const right = techOf(text(m.s)) === m.said; return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-repeat'] = q => { const all = card(q).lines.join(' '), n = s => all.split(s).length - 1; return n(mk(q)) >= 2 && q.tiles.map(text).filter(t => n(t) >= 2).length === 1 ? '' : 'the words that repeat are not the ones marked'; };

  /* narrators: the words that show each kind */
  const SHOWS = { limited: ['She pictured', 'hands shook', 'He was sure', 'She only knew'], omniscient: ['Neither of them knew', 'Neither of them noticed', 'Neither guessed', 'unaware'],
    unreliable: ["I can't imagine why", 'like to travel', 'every light on'] };
  const povOf = c => { const all = c.lines.join(' '); return Object.keys(SHOWS).find(k => SHOWS[k].some(s => all.includes(s))); };
  V['g8-narrator'] = q => mk(q) === povOf(card(q)) ? '' : 'expected ' + povOf(card(q));
  V['g8-narrator-line'] = q => { const p = povOf(card(q)), ok = q.options.map(text).filter(o => SHOWS[p].some(s => o.includes(s))); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the line that shows a ' + p + ' narrator'; };
  V['g8-narrator-tf'] = (q, m) => { const right = povOf(card(q)) === m.said; return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  const ALT = { 'The Last Ferry': 'why he decided', 'The Calmest Player on the Team': 'why the narrator was benched', Breakup: 'only her thoughts', 'Storm Hours': 'cold stove',
    Tryout: 'clipboard', 'Frost Night': 'no longer know' };
  V['g8-alt-pov'] = (q, m) => mk(q).includes(ALT[text(m.t)]) ? '' : 'expected what the new narrator would change';
})();
