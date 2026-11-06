/* Language Atlas automatic checks. Run from this folder:  npm test   (or  node run.js --quick  for a faster pass)
   Options: --grade 1 (one grade only), --quick (fewer random tries).
   It fails (exit code 1) if anything below finds a problem, and the publish step on GitHub will not run.
   docs/CHECKS.md explains each check in plain English.

   1. Repository rules: every script parses; the shared engine has exactly one copy (assets/engine/) and every grade page loads it;
      no grade adds its own colours or fonts; Canadian spelling.
   2. Content rules: every idea has its three steps and an expectation code; every practice skill asks in at least 4 ways;
      the codes a chapter lists are the codes it teaches; a "Watch me" line or recap never repeats the idea's title.
   3. Questions: every practice skill at every level, and every "Together" and "On your own" question, is made many times and
      checked: the right shape for its type, nothing says "undefined", and the answer is worked out again by verify/*.js.
   4. Pages: every page opens on a phone-size screen (390 px) with no errors, nothing runs off the side, big numbers have a space,
      grown-up notes stay hidden unless grown-up view is on, and sound buttons play files that exist (never inside an answer choice).
   5. Answering like a child: on the phone screen, every lesson is walked through, practice questions of every kind are answered
      right and sometimes wrong first, every chapter quiz scores full marks when answered right, every check-up is finished,
      and the results are saved where the progress page (and later the family page) reads them. Every activity with a grown-up
      is opened, written in and marked, and the mark reaches the check-up map.
   6. The placement check: every grade has questions in every area, and children at made-up levels are placed at exactly
      those levels, with a lesson to start each part, on a phone screen with no errors. Reading aloud: two timed readings,
      marked like a grown-up would, give the right words correct per minute. Writing sample: the writing and the grown-up's mark
      are kept and shown, and nothing is marked until the grown-up marks it.
   7. The tool box: every word in Word builder's word bank can be built from the letter tiles and sounded out, and every word made
      of parts is spelled right by the spelling rules. On a phone, a child builds a word in each view, swaps a sound, blends and
      undoes; then each view opens on an iPad and a laptop with no errors and nothing off the side. */
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const { chromium } = require('playwright');
const startServer = require('./server');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const QUICK = args.includes('--quick');
const ALL_GRADES = fs.readdirSync(ROOT).filter(d => /^grade\d$/.test(d)).map(d => +d.slice(5)).sort();
const GRADES = args.includes('--grade') ? [+args[args.indexOf('--grade') + 1]] : ALL_GRADES;
const TRIES = QUICK ? 12 : 40;
const ENGINE = ['atlas.js', 'qkit.js', 'words.js', 'lesson.js', 'practice.js', 'tasks.js', 'wordbank.js', 'tools.js', 'engine.css'];
const US_SPELLING = /\b(colors?|colored|colorful|favorite|favor|neighbor|neighbors|neighborhood|center|centers|centered|theater|honor|labor|behavior|flavor|humor|traveled|traveling|traveler|canceled|jewelry|gray|catalog)\b/i;
const problems = [];
function fail(where, what) { problems.push(where + ': ' + what); }
function log(s) { process.stdout.write(s + '\n'); }
function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
    if (['node_modules', '.git', '.firebase', '.preview', 'shots'].includes(e.name)) return [];
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const rel = f => path.relative(ROOT, f);

/* ---------- 1. repository rules ---------- */
function repoRules() {
  const files = walk(ROOT).filter(f => !rel(f).startsWith('tests' + path.sep));
  const hash = f => crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex');
  const engineHash = {}, engineHead = {};
  for (const e of ENGINE) {
    const f = path.join(ROOT, 'assets', 'engine', e);
    if (!fs.existsSync(f)) { fail('assets/engine', e + ' is missing'); continue; }
    engineHash[hash(f)] = e;
    engineHead[e] = fs.readFileSync(f, 'utf8').split('\n')[0].trim(); /* each engine file starts with its own one-line description */
  }
  for (const f of files) {
    const r = rel(f), inEngine = r.startsWith(path.join('assets', 'engine') + path.sep), src = fs.readFileSync(f, 'utf8');
    if (f.endsWith('.js')) { try { new vm.Script(src, { filename: r }); } catch (e) { fail(r, 'does not parse: ' + e.message); } }
    if (inEngine) continue;
    if (ENGINE.includes(path.basename(f)) || engineHash[hash(f)]) fail(r, 'is a copy of the shared engine. The one shared copy lives in assets/engine/.');
    for (const [e, head] of Object.entries(engineHead)) if (head.length > 30 && src.includes(head)) fail(r, 'contains a copy of assets/engine/' + e + '. Load the shared file instead.');
  }
  for (const f of walk(path.join(ROOT, 'placement'))) {
    const r = rel(f), src = fs.readFileSync(f, 'utf8');
    if (f.endsWith('.css') || /<style|font-family|#[0-9a-f]{3,8}\b(?![-\w])|rgba?\(|hsla?\(/i.test(src.replace(/href="#[\w/-]*"|content="#[^"]*"|'#\w+'/g, ''))) fail(r, 'sets its own colours, fonts or styles. Use the shared theme and engine.css.');
  }
  for (const g of ALL_GRADES) {
    const dir = path.join(ROOT, 'grade' + g), gfiles = walk(dir);
    const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    for (const e of ENGINE) if (!html.includes('../assets/engine/' + e)) fail('grade' + g + '/index.html', 'does not load ../assets/engine/' + e);
    for (const need of ['../assets/atlas-theme.css', '../assets/atlas-header.js', 'Atlas.start()']) if (!html.includes(need)) fail('grade' + g + '/index.html', 'does not load ' + need);
    for (const f of gfiles) {
      const r = rel(f), src = fs.readFileSync(f, 'utf8');
      if (f.endsWith('.css')) fail(r, 'a grade may not have its own style sheet. The one look is assets/atlas-theme.css.');
      if (/<style|font-family|#[0-9a-f]{3,8}\b(?![-\w])|rgba?\(|hsla?\(/i.test(src.replace(/href="#[\w/-]*"/g, ''))) fail(r, 'sets its own colours or fonts. Use the shared theme (assets/atlas-theme.css).');
    }
  }
  /* the recorded sounds: the list in words.js and the files in assets/sounds/ match */
  const listed = (fs.readFileSync(path.join(ROOT, 'assets', 'engine', 'words.js'), 'utf8').match(/var SOUNDS = '([^']+)'/) || [, ''])[1].split(' ').filter(Boolean);
  const clips = fs.existsSync(path.join(ROOT, 'assets', 'sounds')) ? fs.readdirSync(path.join(ROOT, 'assets', 'sounds')) : [];
  for (const n of listed) if (!clips.includes(n + '.mp3')) fail('assets/sounds', n + '.mp3 is missing (words.js lists it)');
  for (const f of clips) if (!listed.includes(f.replace(/\.mp3$/, ''))) fail('assets/sounds/' + f, 'is not in the list of sounds in assets/engine/words.js');
  /* Canadian spelling in everything a child or parent reads */
  for (const f of files.filter(f => /\.(html|js|md)$/.test(f))) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    lines.forEach((ln, i) => { const m = ln.match(US_SPELLING); if (m && !/\bcolor-scheme\b|\bcolor-mix\b|aria-|role=/.test(ln)) fail(rel(f) + ':' + (i + 1), 'uses US spelling "' + m[0] + '". Use Canadian spelling (colour, centre, neighbour, favourite, travelled, grey).'); });
  }
}

/* ---------- browser helpers ---------- */
async function newPage(browser, base) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await ctx.route('**/*', r => (r.request().url().startsWith(base) ? r.continue() : r.abort())); /* no outside requests (web fonts fall back) */
  for (const f of ['validate.js', 'page.js', 'answer.js'].concat(fs.readdirSync(path.join(__dirname, 'verify')).map(f => 'verify/' + f))) {
    await ctx.addInitScript({ content: fs.readFileSync(path.join(__dirname, f), 'utf8') });
  }
  const page = await ctx.newPage(), errs = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_FAILED|net::/.test(m.text())) errs.push(m.text()); });
  return { ctx, page, errs };
}
async function screenCheck(page, where, label) {
  const r = await page.evaluate(() => ({ off: __page.runsOff(), big: __page.bigNumbers(), adult: __page.adultLeak(), snd: __page.sounds() }));
  for (const n of r.snd.names) if (!fs.existsSync(path.join(ROOT, 'assets', 'sounds', n + '.mp3'))) fail(where, label + ' plays the sound "' + n + '", but assets/sounds/' + n + '.mp3 is missing');
  if (r.snd.inside) fail(where, label + ' has a sound button (' + r.snd.inside + ') inside an answer choice. Put it in the question or the picture instead.');
  if (r.off) fail(where, label + ' runs off the side of a phone screen (' + r.off + ')');
  if (r.big) fail(where, label + ' shows a big number without a space: ' + r.big + ' (write 12 500)');
  if (r.adult) fail(where, label + ': ' + r.adult);
}

/* ---------- the home page ---------- */
async function checkHome(browser, base) {
  const { ctx, page, errs } = await newPage(browser, base);
  await page.goto(base + '/index.html');
  await screenCheck(page, 'home page', 'the home page');
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')));
  for (const h of links) if (!/^(https?:|#|mailto:)/.test(h) && !fs.existsSync(path.join(ROOT, h, h.endsWith('/') ? 'index.html' : ''))) fail('home page', 'link to ' + h + ' goes nowhere');
  if (!links.some(h => h.startsWith('https://ontario-math-atlas.web.app'))) fail('home page', 'has no link to Math Atlas');
  if (errs.length) fail('home page', 'errors: ' + errs.join(' / '));
  await ctx.close();
}

/* ---------- one grade ---------- */
async function checkGrade(browser, base, g) {
  const { ctx, page, errs } = await newPage(browser, base);
  const where = 'grade ' + g;
  await page.goto(base + '/grade' + g + '/index.html#home');
  await page.waitForFunction(() => window.Atlas && Object.keys(Atlas.chapters).length > 0, null, { timeout: 15000 });
  await page.evaluate(() => localStorage.clear());

  /* 2. content rules */
  (await page.evaluate(() => {
    const out = [], CODE = /^[A-D]\d\.\d+$/;
    const STOP = new Set('a an the is it to of and in on for with this that you your we i be are was what how do does means mean not it’s its'.split(' '));
    const expand = s => s.split(/,\s*/).flatMap(p => { const m = p.match(/^([A-D]\d)\.(\d+) to \1\.(\d+)$/); if (!m) return [p]; const r = []; for (let i = +m[2]; i <= +m[3]; i++) r.push(m[1] + '.' + i); return r; });
    for (const m of Atlas.meta) {
      const ch = Atlas.chapters[m.id];
      if (!ch) continue;
      const listed = expand(m.codes), taught = new Set();
      if (!ch.lessons || !ch.lessons.length) out.push(m.id + ': has no lessons');
      (ch.lessons || []).forEach(ls => ls.concepts.forEach(c => {
        const w = m.id + ' idea ' + c.slug;
        if (!c.title || !Array.isArray(c.exp) || !c.exp.length) out.push(w + ': needs a title and its expectation codes (exp)');
        (c.exp || []).forEach(x => { if (!CODE.test(x)) out.push(w + ': "' + x + '" is not an expectation code like B3.3'); taught.add(x); });
        if (!Array.isArray(c.model) || !c.model.length) out.push(w + ': needs "Watch me" steps (model)');
        /* say it once: the title is the rule, so a step line or the recap must add something new */
        const txt = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d.textContent; };
        const words = t => (t.toLowerCase().match(/[a-z0-9’'-]+/g) || []).filter(x => !STOP.has(x));
        const tw = new Set(words(c.title)), echo = t => { const lw = words(t); return lw.length >= 2 && lw.filter(x => tw.has(x)).length / lw.length >= 0.8; }, lines = [];
        (c.model || []).forEach((m, k) => {
          const d = document.createElement('div'); d.innerHTML = m; const p = d.querySelector(':scope > p'), line = p ? p.textContent.trim() : '';
          if (!line) return;
          if (echo(line)) out.push(w + ': "Watch me" step ' + (k + 1) + ' repeats the title ("' + line + '"). Show it, or say something new.');
          if (lines.includes(line)) out.push(w + ': "Watch me" step ' + (k + 1) + ' repeats an earlier line ("' + line + '")');
          lines.push(line);
        });
        if (c.key && echo(txt(c.key))) out.push(w + ': its recap (key) repeats the title. Leave it out, or say something new.');
        if (!Array.isArray(c.guided) || !c.guided.length) out.push(w + ': needs "Together" questions (guided)');
        if (!Array.isArray(c.check) || !c.check.length) out.push(w + ': needs "On your own" questions (check)');
        if (c.skill && !(ch.practice || []).some(s => s.id === c.skill)) out.push(w + ': its skill "' + c.skill + '" is not in the chapter');
      }));
      (ch.practice || []).forEach(sk => {
        sk.code.split(/,\s*/).forEach(x => { if (!CODE.test(x)) out.push(m.id + ' skill ' + sk.id + ': "' + x + '" is not an expectation code'); taught.add(x); });
        if (!sk.shapes || sk.shapes.length < 4) out.push(m.id + ' skill ' + sk.id + ': asks in only ' + (sk.shapes || [1]).length + ' way(s). Every skill needs at least 4 (Atlas.Q.shapes).');
      });
      (ch.tasks || []).forEach(t => {
        const w = m.id + ' activity ' + t.id;
        if (!t.id || !t.title || !t.say || !t.pic) out.push(w + ': needs an id, a title, a picture (pic) and one line for the child (say)');
        if (!CODE.test(t.code || '')) out.push(w + ': "' + t.code + '" is not an expectation code like B1.3');
        if (!Array.isArray(t.run) || !t.run.length) out.push(w + ': needs steps for the grown-up (run)');
        if (!Array.isArray(t.rubric) || t.rubric.length !== 4 || t.rubric.some(r => !r)) out.push(w + ': needs a rubric with exactly 4 levels');
        taught.add(t.code);
      });
      /* a full chapter (full: true) is deep enough to study from: two worked examples, more practice, a skill per idea, few repeats */
      if (ch.full) {
        const used = {};
        (ch.lessons || []).forEach(ls => ls.concepts.forEach(c => {
          const w = m.id + ' idea ' + c.slug + ' (full chapter)';
          if ((c.model || []).length < 4) out.push(w + ': "Watch me" needs two worked examples (4 or more steps)');
          if ((c.guided || []).length < 3) out.push(w + ': needs 3 or more "Together" questions');
          if ((c.check || []).length < 5) out.push(w + ': needs 5 or more "On your own" questions');
          if (used[c.skill]) out.push(w + ': shares its practice skill with ' + used[c.skill] + '. Give each idea its own skill.');
          used[c.skill] = c.slug;
        }));
        (ch.practice || []).forEach(sk => {
          const seen = new Set();
          for (let i = 0; i < 600; i++) { const q = sk.gen(1 + i % 3); seen.add([q.q, q.fig || q.pic || '', Atlas.Q.text(q)].join('|')); }
          if (seen.size < 30) out.push(m.id + ' skill ' + sk.id + ' (full chapter): can make only ' + seen.size + ' different questions. A full skill needs 30 or more, so practice does not repeat.');
        });
      }
      listed.forEach(x => { if (!taught.has(x)) out.push(m.id + ': lists ' + x + ' but no idea or skill teaches it'); });
      taught.forEach(x => { if (!listed.includes(x)) out.push(m.id + ': teaches ' + x + ' but does not list it in its codes'); });
    }
    return out;
  })).forEach(p => fail(where, p));

  /* 3. questions */
  const gen = await page.evaluate(TRIES => {
    const out = { problems: [], made: 0, types: {} }, seen = new Set();
    function check(q, label) {
      out.made++;
      out.types[q && q.type] = (out.types[q && q.type] || 0) + 1;
      window.__validate(q).forEach(b => { const key = label + ' ' + b; if (!seen.has(key) && seen.size < 300) { seen.add(key); out.problems.push(key + ' | ' + __H.strip(q && q.q || '').slice(0, 80)); } });
    }
    function run(f, n, label) { for (let i = 0; i < n; i++) { let q; try { q = f(); } catch (e) { out.problems.push(label + ' crashed: ' + e.message); return; } check(q, label); } }
    for (const [id, ch] of Object.entries(Atlas.chapters)) {
      (ch.practice || []).forEach(sk => { for (let lv = 1; lv <= 3; lv++) run(() => sk.gen(lv), TRIES, id + ' skill ' + sk.id + ' L' + lv); });
      (ch.quiz || []).forEach((q, i) => run(() => q, 1, id + ' quiz #' + (i + 1)));
      if (ch.read) ch.read.texts.forEach(t => { for (let i = 0; i < 4; i++) { let qs; try { qs = ch.read.ask(t); } catch (e) { out.problems.push(id + ' read "' + t.title + '" crashed: ' + e.message); break; } qs.forEach(q => check(q, id + ' read "' + t.title + '"')); } });
      (ch.lessons || []).forEach(ls => ls.concepts.forEach(c => {
        (c.guided || []).forEach((f, k) => run(f, Math.ceil(TRIES / 4), id + ' together ' + c.slug + '#' + (k + 1)));
        (c.check || []).forEach((f, k) => run(f, Math.ceil(TRIES / 4), id + ' on-your-own ' + c.slug + '#' + (k + 1)));
      }));
    }
    return out;
  }, TRIES);
  gen.problems.forEach(p => fail(where, p));

  /* 4. pages */
  const routes = await page.evaluate(() => {
    const r = ['home', 'check-up', 'check-up/all', 'progress'];
    for (const [id, ch] of Object.entries(Atlas.chapters)) {
      r.push(id, id + '/practice', id + '/quiz', 'check-up/' + id);
      if (ch.tasks) { r.push(id + '/tasks'); ch.tasks.forEach(t => r.push(id + '/tasks/' + t.id)); }
      if (ch.read) { r.push(id + '/read'); ch.read.texts.forEach((t, i) => r.push(id + '/read/' + i)); }
      ch.lessons.forEach(ls => { ls.concepts.forEach(c => r.push(id + '/learn/' + c.slug, id + '/learn/' + c.slug + '/2', id + '/learn/' + c.slug + '/3')); r.push(id + '/done/' + ls.id); });
    }
    return r;
  });
  const go = h => page.evaluate(h => { location.hash = '#' + h; }, h).then(() => page.waitForTimeout(40));
  for (const adult of [false, true]) {
    await page.evaluate(on => Atlas.adult(on), adult);
    for (const r of routes) {
      const before = errs.length;
      await go(r);
      if (errs.length > before) fail(where, 'page #' + r + ' has an error: ' + errs.slice(before).join(' / '));
      if (!adult) await screenCheck(page, where, 'page #' + r);
    }
  }
  /* grown-up view: the button turns the notes on and off */
  const firstIdea = routes.find(r => r.includes('/learn/'));
  await page.evaluate(() => Atlas.adult(false));
  await go(firstIdea);
  const gv = await page.evaluate(() => { const b = document.querySelector('#adultb'), n = () => [...document.querySelectorAll('.adult-only')].filter(e => e.getClientRects().length).length; b.click(); const on = n(); b.click(); return { on, off: n(), any: document.querySelectorAll('.adult-only').length }; });
  if (gv.any && !(gv.on === gv.any && gv.off === 0)) fail(where, 'the Grown-up view button does not show and hide the coaching notes (' + JSON.stringify(gv) + ')');

  /* 5a. walk every lesson the way a child would */
  const ideas = await page.evaluate(() => Object.entries(Atlas.chapters).flatMap(([id, ch]) => ch.lessons.flatMap(ls => ls.concepts.map(c => [id, c.slug]))));
  for (const [cid, slug] of ideas) {
    const w = where + ' ' + cid + ' idea ' + slug;
    await go(cid + '/learn/' + slug);
    const s1 = await page.evaluate(() => { let n = 0; while (document.querySelector('.di-step') && n++ < 30) document.querySelector('.di-step').click(); return { go: !!document.querySelector('.di-go .btn')}; });
    if (!s1.go) fail(w, '"Watch me" never reaches the button to go on');
    await screenCheck(page, w, '"Watch me" with every step showing');
    const beforeSnd = errs.length;
    const tapped = await page.evaluate(() => { const b = document.querySelector('.wsnd'); if (b) b.click(); return !!b; });
    if (tapped) { await page.waitForTimeout(30); if (errs.length > beforeSnd) fail(w, 'tapping a sound button gives an error: ' + errs.slice(beforeSnd).join(' / ')); }
    await go(cid + '/learn/' + slug + '/2');
    const s2 = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        const box = document.querySelector('.di-guided');
        if (!box) return { err: 'no Together question' };
        const first = box._q;
        await __answer(first, box, box._qk, true); /* wrong first: corrected, then the same question again */
        if (!/\bbad\b/.test(box.querySelector('.fb').className)) return { err: 'a wrong answer was not corrected' };
        box.querySelector('.ytn .btn').click();
        const again = document.querySelector('.di-guided');
        if (again._q !== first) return { err: 'after a correction, the same question was not asked again' };
        await __answer(again._q, again, again._qk, false);
        if (!/\bok\b/.test(again.querySelector('.fb').className)) return { err: 'a right answer was marked wrong' };
        const link = document.querySelector('.di-go .btn');
        if (link) return { ok: true, off: __page.runsOff() };
        again.querySelector('.ytn .btn').click();
      }
      return { err: 'Together never ends' };
    });
    if (s2.err) fail(w, 'Together: ' + s2.err); else if (s2.off) fail(w, 'Together runs off the side of a phone screen (' + s2.off + ')');
    await go(cid + '/learn/' + slug + '/3');
    const s3 = await page.evaluate(async ([cid, slug]) => {
      const one = async bad => { const box = document.querySelector('.ls-check'); await __answer(box._q, box, box._qk, bad); return box; };
      let box = await one(true); /* a miss gives a hint and another try */
      if (!/Not yet/.test(box.querySelector('.fb').textContent)) return { err: 'a wrong answer did not get a hint' };
      await __answer(box._q, box, box._qk, false);
      if (!/fixed it/.test(box.querySelector('.fb').textContent)) return { err: 'a right second try was not accepted' };
      const c = Atlas.lessons.flat(cid).find(c => c.slug === slug);
      for (let i = 0; i < Atlas.lessons.need(c); i++) { box.querySelector('.ytn .btn').click(); box = await one(false); if (!/\bok\b/.test(box.querySelector('.fb').className)) return { err: 'a right answer was marked wrong' }; }
      return { got: Atlas.lessons.status(c) >= 2, off: __page.runsOff() };
    }, [cid, slug]);
    if (s3.err) fail(w, 'On your own: ' + s3.err); else if (!s3.got) fail(w, 'enough right on the first try did not mark the idea "Got it"');
    else if (s3.off) fail(w, 'On your own runs off the side of a phone screen (' + s3.off + ')');
  }

  /* 5b. practice on a phone-size screen */
  const skills = await page.evaluate(() => Object.entries(Atlas.chapters).flatMap(([id, ch]) => (ch.practice || []).map(sk => [id, sk.id])));
  let answered = 0;
  for (const [cid, sid] of skills) {
    for (const lv of QUICK ? [1, 3] : [1, 2, 3]) {
      await page.evaluate(([sid, lv]) => Atlas.save('sk:' + sid, { lv, streak: 0, miss: 0, n: 1, ok: 0, secure: false }), [sid, lv]);
      await go('home'); await go(cid + '/practice/' + sid);
      for (let i = 0; i < (QUICK ? 4 : 8); i++) {
        const r = await page.evaluate(async bad => {
          const q = Atlas._q, root = document.querySelector('.pq');
          if (!q || !root || !root.querySelector('.pcard')) return { err: 'practice question did not appear' };
          const t = q.type + ':' + q.shape, fb = () => root.querySelector('.fb');
          try {
            await __answer(q, root, Atlas._qk, bad);
            if (bad) {
              if (!/\bbad\b/.test(fb().className) || root.querySelector('.pnext .btn')) return { t, err: 'a wrong answer was not caught' };
              await __answer(q, root, Atlas._qk, false);
            }
          } catch (e) { return { t, err: 'could not answer: ' + e.message }; }
          if (!/\bok\b/.test(fb().className)) return { t, err: 'a right answer was marked wrong: ' + fb().textContent.slice(0, 80) };
          const off = __page.runsOff();
          root.querySelector('.pnext .btn').click();
          return { t, off };
        }, i % 3 === 1);
        answered++;
        if (r.err) { fail(where, cid + ' / ' + sid + ' L' + lv + ' ' + (r.t || '') + ': ' + r.err); break; }
        if (r.off) fail(where, cid + ' / ' + sid + ' L' + lv + ' ' + r.t + ': runs off the side of a phone screen (' + r.off + ')');
      }
    }
  }

  /* 5f. read and answer: read the passage, answer every question (one wrong first), and the score is saved */
  const sets = await page.evaluate(() => Object.entries(Atlas.chapters).flatMap(([id, ch]) => ch.read ? ch.read.texts.map((t, i) => [id, i]) : []));
  for (const [cid, n] of sets) {
    await go(cid + '/read/' + n);
    const r = await page.evaluate(async ([cid, n]) => {
      const b = document.querySelector('.rd-read .btn'); if (!b) return { err: 'the passage screen has no button to go on' };
      b.click();
      let off = '';
      for (let i = 0; i < 12; i++) {
        const root = document.querySelector('.rd-q'); if (!root) break;
        const q = Atlas._q;
        await __answer(q, root, Atlas._qk, true);
        if (!/\bbad\b/.test(root.querySelector('.fb').className)) return { err: 'a wrong answer was not caught' };
        await __answer(q, root, Atlas._qk, false);
        if (!/\bok\b/.test(root.querySelector('.fb').className)) return { err: 'a right second try was marked wrong' };
        off = off || __page.runsOff();
        root.querySelector('.pnext .btn').click();
      }
      const end = document.querySelector('.rd-end'), best = Atlas.load('rd:' + cid + ':' + n, null);
      return end ? { off, saved: !!best } : { err: 'the set never reaches its end screen' };
    }, [cid, n]);
    const w = where + ' ' + cid + ' read ' + n;
    if (r.err) fail(w, r.err); else { if (!r.saved) fail(w, 'the score was not saved'); if (r.off) fail(w, 'runs off the side of a phone screen (' + r.off + ')'); }
  }

  /* 5c. chapter quizzes: answered all right, full marks, and the result is saved */
  for (const id of await page.evaluate(() => Object.keys(Atlas.chapters))) {
    await go(id + '/quiz');
    const r = await page.evaluate(async id => {
      const qs = [...document.querySelectorAll('#quiz .q')];
      for (const d of qs) await __answer(d._q, d, d._qk, false);
      return { n: qs.length, score: document.querySelector('#quiz .qscore').textContent, saved: Atlas.load('best:' + id, null), off: __page.runsOff() };
    }, id);
    if (!r.score.startsWith(r.n + ' of ' + r.n)) fail(where, id + ' quiz: answered all right but scored "' + r.score + '"');
    if (!r.saved || r.saved.s !== r.n) fail(where, id + ' quiz: the result was not saved for the progress and family pages');
    if (r.off) fail(where, id + ' quiz runs off the side of a phone screen (' + r.off + ')');
  }

  /* 5d. check-ups: finish each one answering right; results, coverage and the plan are saved */
  for (const scope of await page.evaluate(() => Object.keys(Atlas.chapters).concat('all'))) {
    await go('home'); await go('check-up/' + scope);
    const r = await page.evaluate(async () => {
      for (let i = 0; i < 60; i++) {
        const root = document.querySelector('.cu');
        if (!root || !root.querySelector('.qkbox')) break;
        const off = __page.runsOff();
        if (off) return { off };
        await __answer(Atlas._q, root, Atlas._qk, false);
      }
      const h1 = document.querySelector('h1').textContent, m = h1.match(/^(\d+) of (\d+)$/);
      return { h1, full: !!m && m[1] === m[2], hist: Atlas.load('checkups', []).length, cov: Object.keys(Atlas.load('cov', {})) };
    });
    if (r.off) fail(where, 'check-up ' + scope + ' runs off the side of a phone screen (' + r.off + ')');
    else if (!r.full) fail(where, 'check-up ' + scope + ': answered all right but the result says "' + r.h1 + '"');
    if (!r.hist) fail(where, 'check-up ' + scope + ': the result was not saved');
  }
  const cov = await page.evaluate(() => { const c = Atlas.load('cov', {}), all = Atlas.allSkills().flatMap(p => p.sk.code.split(/,\s*/)); return all.filter(x => !c[x]); });
  if (cov.length) fail(where, 'chapter check-ups did not cover these expectations: ' + cov.join(', '));

  /* 5e. activities with a grown-up: the child can write and it is kept; the grown-up marks a level; the mark reaches the map */
  const tasks = await page.evaluate(() => Atlas.allTasks().map(p => [p.ch.id, p.t.id, p.t.code, !!p.t.write]));
  await page.evaluate(() => Atlas.adult(true));
  for (const [cid, tid, code, write] of tasks) {
    const w = where + ' ' + cid + ' activity ' + tid;
    await go(cid + '/tasks/' + tid);
    const r = await page.evaluate(write => {
      const box = document.querySelector('#tkw');
      if (write && !box) return { err: 'has no box to write in' };
      if (box) { box.value = 'My draft.'; box.dispatchEvent(new Event('input')); }
      const b = [...document.querySelectorAll('.tk-b')];
      if (b.length !== 4) return { err: 'does not show 4 rubric levels in grown-up view' };
      b[2].click();
      return { off: __page.runsOff(), pressed: b[2].getAttribute('aria-pressed') };
    }, write);
    if (r.err) { fail(w, r.err); continue; }
    if (r.off) fail(w, 'runs off the side of a phone screen (' + r.off + ')');
    if (r.pressed !== 'true') fail(w, 'the grown-up\'s mark does not show as chosen');
    await go('home'); await go(cid + '/tasks/' + tid);
    const kept = await page.evaluate(([tid, code]) => ({ text: (document.querySelector('#tkw') || {}).value, saved: Atlas.load('task:' + tid, null), cov: Atlas.load('cov', {})[code] }), [tid, code]);
    if (write && kept.text !== 'My draft.') fail(w, 'what the child wrote was not kept');
    if (!kept.saved || kept.saved.lv !== 3) fail(w, 'the grown-up\'s mark was not saved');
    if (!kept.cov || !kept.cov.ok) fail(w, 'the mark did not reach the check-up map for ' + code);
  }
  await page.evaluate(() => Atlas.adult(false));
  if (tasks.length) {
    await go('check-up');
    const map = await page.evaluate(() => [...document.querySelectorAll('.pg-cov span')].filter(s => !s.className).map(s => s.textContent));
    if (map.length) fail(where, 'after every check-up and activity, the map still shows these expectations as not checked: ' + map.join(', '));
  }

  if (errs.length) fail(where, 'errors while answering: ' + [...new Set(errs)].slice(0, 5).join(' / '));
  await ctx.close();
  return { made: gen.made, routes: routes.length, ideas: ideas.length, answered, tasks: tasks.length, types: gen.types };
}

/* ---------- 6. the placement check ---------- */
const AREAS = ['words', 'vocab', 'sentences', 'punct', 'reading', 'thinking', 'writing'];
async function checkPlacement(browser, base) {
  const { ctx, page, errs } = await newPage(browser, base);
  const where = 'placement check';
  await page.goto(base + '/placement/index.html');
  await page.waitForSelector('.pl-g');
  await screenCheck(page, where, 'the start screen');
  /* every grade has at least one computer-marked skill in every area, or the check could not test that grade */
  for (const g of ALL_GRADES) {
    const have = await page.evaluate(g => Atlas.placementGrade(g).then(G => [...new Set(G.skills.map(x => x.a))]), g);
    for (const a of AREAS) if (!have.includes(a)) fail(where, 'Grade ' + g + ' has no practice skill in the "' + a + '" area (see areaOf in placement/placement.js)');
  }
  /* children at made-up levels: right when the question's grade is at or below their level in that area, else wrong */
  const kids = QUICK ? [[4, [2, 5, 3, 0, 4, 6, 8]]] : [[4, [2, 5, 3, 0, 4, 6, 8]], [1, [0, 1, 2, 3, 0, 1, 2]], [7, [8, 7, 6, 5, 4, 8, 3]]];
  let asked = 0;
  for (const [grade, lv] of kids) {
    const want = {}; AREAS.forEach((a, i) => { want[a] = Math.min(lv[i], Math.min(8, grade + 2)); });
    const w = where + ' (Grade ' + grade + ' child)';
    await page.evaluate(() => localStorage.clear());
    await page.goto(base + '/placement/index.html#home'); await page.reload();
    await page.waitForSelector('.pl-g');
    await page.click('.pl-g[data-g="' + grade + '"]'); await page.click('#plgo');
    let n = 0, pauses = 0;
    for (;;) {
      await page.waitForFunction(() => document.querySelector('.qkbox, #plnext, .pl-start, #plagain'), null, { timeout: 15000 });
      if (await page.$('.pl-start')) break;
      if (await page.$('#plagain')) { fail(w, 'a question could not be made: "' + (await page.textContent('#app')).slice(0, 80) + '"'); break; }
      if (await page.$('#plnext')) { if (!pauses++) await screenCheck(page, w, 'the screen between parts'); await page.click('#plnext'); continue; }
      if (++n > 120) { fail(w, 'asked more than 120 questions'); break; }
      if (n === 1) await screenCheck(page, w, 'a question');
      const bad = await page.evaluate(want => Atlas._q.at.g > want[Atlas._q.at.a], want);
      if (n % 9 === 0 && bad) await page.click('#plskip');
      else await page.evaluate(bad => __answer(Atlas._q, document.querySelector('#app'), Atlas._qk, bad), bad);
    }
    asked += n;
    const got = await page.evaluate(() => (JSON.parse(localStorage.getItem('lang-place:state')) || {}).levels);
    for (const a of AREAS) if (!got || got[a] !== want[a]) fail(w, a + ' was placed at ' + (got ? got[a] : 'nothing') + ', not ' + want[a]);
    const links = await page.evaluate(() => [...document.querySelectorAll('.pl-go')].map(a => a.getAttribute('href')));
    if (links.length !== AREAS.length) fail(w, 'the results show ' + links.length + ' starting lessons, not ' + AREAS.length);
    for (const h of links) {
      const m = /^\.\.\/grade(\d)\/#([\w-]+)$/.exec(h);
      if (!m || !fs.existsSync(path.join(ROOT, 'grade' + m[1], 'chapters', m[2] + '.js'))) fail(w, 'the starting lesson link ' + h + ' goes nowhere');
    }
    /* the same starting lessons are kept for the Atlas parent page */
    const kept = await page.evaluate(() => (JSON.parse(localStorage.getItem('lang-place:state')) || {}).starts || []);
    if (kept.map(s => s && '../grade' + s.g + '/#' + s.ch).join() !== links.join()) fail(w, 'the starting lessons kept for the parent page differ from the ones shown');
    await screenCheck(page, w, 'the results');
    await page.evaluate(() => Atlas.adult(true));
    await screenCheck(page, w, 'the results in grown-up view');
    await page.evaluate(() => Atlas.adult(false));
  }
  /* reading aloud: two timed readings marked by the grown-up (the clock is fast-forwarded) */
  const passages = await page.evaluate(() => Object.keys(window.ALOUD_PASSAGES).map(g => [+g, window.ALOUD_PASSAGES[g].map(p => p.text.split(/\s+/).length)]));
  for (const g of ALL_GRADES) {
    const p = passages.find(x => x[0] === g);
    if (!p || p[1].length !== 2 || p[1].some(n => n < 100)) fail(where, 'Grade ' + g + ' needs two reading-aloud passages of at least 100 words');
    if (!(await page.evaluate(g => !!Atlas.aloudNorms[g], g))) fail(where, 'Grade ' + g + ' has no reading-aloud norms');
  }
  const w = where + ' (reading aloud)';
  await page.clock.install();
  await page.goto(base + '/placement/index.html#aloud'); await page.reload();
  await page.waitForSelector('#algo');
  await screenCheck(page, w, 'the start');
  await page.click('#algo');
  await page.click('.al-w[data-i="3"]'); await page.click('.al-w[data-i="5"]');
  await page.clock.fastForward(61000);
  await page.waitForFunction(() => /last word/.test(document.querySelector('.al-say').textContent));
  await page.click('.al-w[data-i="89"]');
  await screenCheck(page, w, 'a marked reading');
  await page.click('#alnext'); await page.click('#algo');
  await page.clock.fastForward(30000);
  await page.click('#alstop');
  await page.click('.al-w[data-i="44"]');
  await page.click('#alnext');
  const al = await page.evaluate(() => (JSON.parse(localStorage.getItem('lang-place:state')) || {}).aloud);
  /* reading 1: 90 words, 2 marked, 60 s = 88 a minute; reading 2: 45 words in 30 s = 90 a minute; average 89 */
  if (!al || al.wcpm !== 89 || al.acc !== 99) fail(w, 'expected 89 words correct per minute and 99% correct, got ' + JSON.stringify(al && { wcpm: al.wcpm, acc: al.acc }));
  await screenCheck(page, w, 'the result');
  await page.goto(base + '/placement/index.html#results');
  await page.waitForSelector('.pl-start');
  if (!(await page.evaluate(() => /89 words correct per minute/.test(document.querySelector('#app').textContent)))) fail(w, 'the result does not show on the starting points page');
  /* writing sample: the child writes, the grown-up marks; nothing is marked by the computer */
  const ws = where + ' (writing sample)';
  for (const g of ALL_GRADES) {
    const ok = await page.evaluate(g => !!Atlas.writingPrompts[g] && Atlas.writingRubric(g).length === 4, g);
    if (!ok) fail(ws, 'Grade ' + g + ' needs a prompt and a rubric with exactly 4 levels');
  }
  await page.goto(base + '/placement/index.html#writing');
  await page.waitForSelector('#plw');
  await screenCheck(page, ws, 'the writing screen');
  await page.fill('#plw', 'My writing sample.');
  if (await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('lang-place:state')).writing; return s && s.lv; })) fail(ws, 'the writing was marked before a grown-up marked it');
  await page.evaluate(() => Atlas.adult(true));
  await screenCheck(page, ws, 'the writing screen in grown-up view');
  await page.click('.tk-b[data-lv="2"]');
  await page.evaluate(() => Atlas.adult(false));
  const wr = await page.evaluate(() => JSON.parse(localStorage.getItem('lang-place:state')).writing);
  if (!wr || wr.text !== 'My writing sample.' || wr.lv !== 2) fail(ws, 'the writing and the grown-up\'s mark were not both saved');
  await page.goto(base + '/placement/index.html#results');
  await page.waitForSelector('.pl-start');
  if (!(await page.evaluate(() => /Marked Getting there/.test(document.querySelector('#app').textContent)))) fail(ws, 'the mark does not show on the starting points page');
  if (errs.length) fail(where, 'errors: ' + [...new Set(errs)].slice(0, 5).join(' / '));
  await ctx.close();
  return asked;
}

/* ---------- 7. the tool box (Word builder) ---------- */
async function checkTools(browser, base, g) {
  const { ctx, page, errs } = await newPage(browser, base);
  const where = 'grade ' + g + ' tool box';
  await page.goto(base + '/grade' + g + '/index.html#tools/words');
  await page.waitForSelector('.wb-body');
  /* the word bank: every word can be built and sounded out, and every word made of parts is spelled right by the rules */
  for (const p of await page.evaluate(() => {
    const out = [], B = Atlas.wordbank, tiles = B.tiles.map(t => t[0]), K = Atlas.toolkit;
    for (const s of B.sounds) for (const x of s.split(' ')) {
      const [t, c] = x.split(':');
      if (!tiles.includes(t)) out.push('"' + s + '": "' + t + '" is not a letter tile');
      try { Atlas.W.clip(c || t); } catch (e) { out.push('"' + s + '": ' + e.message); }
    }
    for (const b of Object.values(B.beats).join(' ').split(' ')) if (!/^[a-z]+(-[a-z]+)+$/.test(b)) out.push('beats: "' + b + '" is not a word cut into 2 or more beats');
    for (const e of B.parts) {
      const [ids, word] = e.split('='), parts = ids.split('+');
      for (const id of parts) if (/^-|-$/.test(id) && !B.means[id]) out.push('"' + e + '": "' + id + '" has no meaning');
      const j = K.join(parts).word;
      if (j !== word) out.push('"' + e + '": the spelling rules make "' + j + '"');
    }
    const k = K.bank();
    if (k.sounds.length < 20 || k.beats.length < 10 || k.parts.length < 10 || !k.suffixes.length) out.push('too few words for this grade');
    return out;
  })) fail(where, p);
  await screenCheck(page, where, 'Word builder');
  /* Sounds: build a word the bank knows, swap one sound, blend, undo */
  await page.click('[data-v="sounds"]');
  await page.click('[data-do="clear"]');
  const sw = await page.evaluate(() => Atlas.R.pick(Atlas.toolkit.bank().sounds.filter(w => w.tiles.length > 2)));
  for (const t of sw.tiles) {
    const tab = /[aeiou]/.test(t) ? 'vow' : 'cons';
    await page.click('[data-tab="' + tab + '"]');
    await page.click('.wb-tray [data-add="' + t + '"]');
  }
  if ((await page.textContent('.wb-w')) !== sw.word || !/real word/.test(await page.textContent('.wb-is'))) fail(where, 'building ' + sw.tiles.join(' ') + ' does not show "' + sw.word + '" as a real word');
  await page.click('[data-do="blend"]');
  await page.click('[data-pick="0"]');
  await page.click('[data-tab="cons"]');
  await page.click('.wb-tray [data-add="' + (sw.tiles[0] === 'b' ? 'd' : 'b') + '"]');
  if ((await page.textContent('.wb-w')).charAt(0) !== (sw.tiles[0] === 'b' ? 'd' : 'b')) fail(where, 'tapping a box and then a tile does not swap that sound');
  await page.click('[data-a="undo"]');
  if ((await page.textContent('.wb-w')) !== sw.word) fail(where, 'Undo does not bring back "' + sw.word + '"');
  await screenCheck(page, where, 'Sounds');
  /* Beats: cut, then show where the beats go */
  await page.click('[data-v="beats"]');
  await page.click('.wb-gap[data-gap="2"]');
  if ((await page.locator('.wb-cut').count()) !== 1) fail(where, 'tapping between two letters does not cut the word');
  await page.click('[data-do="show"]');
  const beat = await page.evaluate(() => [document.querySelectorAll('.wb-here').length, document.querySelectorAll('.wb-beats span').length]);
  if (beat[0] !== beat[1] - 1 || beat[1] < 2) fail(where, '"Show the beats" marks ' + beat[0] + ' cuts for ' + beat[1] + ' beats');
  await screenCheck(page, where, 'Beats');
  /* Parts: build a word from its parts, then open one from its family */
  await page.click('[data-v="parts"]');
  await page.click('[data-do="clear"]');
  const pe = await page.evaluate(() => Atlas.R.pick(Atlas.toolkit.bank().parts.filter(e => e.ids.length > 1)));
  for (const id of pe.ids) {
    const tab = /-$/.test(id) ? 'pre' : /^-/.test(id) ? 'suf' : await page.evaluate(id => Atlas.wordbank.means[id] ? 'root' : 'base', id);
    await page.click('[data-ptab="' + tab + '"]');
    await page.click('.wb-tray [data-part="' + id + '"]');
  }
  if ((await page.textContent('.wb-w')) !== pe.word || !/real word/.test(await page.textContent('.wb-is'))) fail(where, 'building ' + pe.ids.join(' + ') + ' does not show "' + pe.word + '" as a real word');
  await screenCheck(page, where, 'Parts');
  await page.click('.wb-fam .wb-chip:not([aria-pressed])');
  if (!/real word/.test(await page.textContent('.wb-is'))) fail(where, 'a word from the word family does not open as a real word');
  /* the Tools menu, and the tool on an iPad and a laptop */
  await page.click('[data-a="menu"]');
  await page.click('.tb-x');
  for (const vp of [{ width: 820, height: 1180 }, { width: 1180, height: 820 }, { width: 1366, height: 768 }]) {
    await page.setViewportSize(vp);
    for (const v of ['sounds', 'beats', 'parts']) { await page.click('[data-v="' + v + '"]'); await screenCheck(page, where, v + ' at ' + vp.width + ' px'); }
  }
  if (errs.length) fail(where, 'errors: ' + [...new Set(errs)].slice(0, 5).join(' / '));
  await ctx.close();
}

(async () => {
  const t0 = Date.now();
  repoRules();
  const { srv, url } = await startServer();
  const browser = await chromium.launch();
  try { await checkHome(browser, url); log('Home page checked.'); } catch (e) { fail('home page', 'the check itself stopped: ' + e.message.split('\n')[0]); }
  for (const g of GRADES) {
    const before = problems.length;
    try {
      const s = await checkGrade(browser, url, g);
      log('Grade ' + g + ': ' + s.made + ' questions made and checked, ' + s.routes + ' pages opened twice (grown-up view off and on), ' + s.ideas + ' ideas walked through, ' +
        s.answered + ' practice questions answered on a phone screen, ' + s.tasks + ' activities marked. Types: ' + Object.entries(s.types).map(([k, v]) => k + ' ' + v).join(', ') + '. ' +
        (problems.length - before ? (problems.length - before) + ' problems.' : 'All good.'));
    } catch (e) { fail('grade ' + g, 'the check itself stopped: ' + e.message.split('\n')[0]); }
    try { await checkTools(browser, url, g); log('Grade ' + g + ' tool box: Word builder checked on phone, iPad and laptop.'); } catch (e) { fail('grade ' + g + ' tool box', 'the check itself stopped: ' + e.message.split('\n')[0]); }
  }
  if (GRADES.length === ALL_GRADES.length) {
    try { const n = await checkPlacement(browser, url); log('Placement check: ' + n + ' questions answered by made-up children, each placed where expected.'); } catch (e) { fail('placement check', 'the check itself stopped: ' + e.message.split('\n')[0]); }
  }
  await browser.close(); srv.close();
  log('');
  if (problems.length) {
    log(problems.length + ' problem(s):');
    problems.slice(0, 200).forEach(p => log(' - ' + p));
    if (problems.length > 200) log(' ... and ' + (problems.length - 200) + ' more');
    log('\nFAILED in ' + Math.round((Date.now() - t0) / 1000) + 's');
    process.exit(1);
  }
  log('ALL CHECKS PASSED in ' + Math.round((Date.now() - t0) / 1000) + 's');
})();
