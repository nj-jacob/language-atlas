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
      is opened, written in and marked, and the mark reaches the check-up map. */
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const { chromium } = require('playwright');
const startServer = require('./server');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const QUICK = args.includes('--quick');
const ALL_GRADES = fs.readdirSync(ROOT).filter(d => /^grade\d$/.test(d)).map(d => +d.slice(5)).sort();
const GRADES = args.includes('--grade') ? [+args[args.indexOf('--grade') + 1]] : ALL_GRADES;
const TRIES = QUICK ? 12 : 40;
const ENGINE = ['atlas.js', 'qkit.js', 'words.js', 'lesson.js', 'practice.js', 'tasks.js', 'engine.css'];
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
      for (let i = 0; i < 2; i++) { box.querySelector('.ytn .btn').click(); box = await one(false); if (!/\bok\b/.test(box.querySelector('.fb').className)) return { err: 'a right answer was marked wrong' }; }
      const c = Atlas.lessons.flat(cid).find(c => c.slug === slug);
      return { got: Atlas.lessons.status(c) >= 2, off: __page.runsOff() };
    }, [cid, slug]);
    if (s3.err) fail(w, 'On your own: ' + s3.err); else if (!s3.got) fail(w, 'two right on the first try did not mark the idea "Got it"');
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
