# How Language Atlas is built

Plain web pages with no build step: what is in this repository is exactly what the browser loads. It is published as part of **Atlas** (one site for Math and Language) at https://ontario-math-atlas.web.app/language/. The math-atlas repository owns the Atlas home, Curriculum page, sign-in and family pages, and publishes the whole site; see "Inside Atlas" below and math-atlas `docs/ARCHITECTURE.md`.

## Folders

| Folder or file | What it is |
| --- | --- |
| `index.html` | Language home page: all grades. Atlas's Curriculum page reads its `href="gradeN/"` links to know which grades are ready, so link every ready grade that way |
| `grade1/` … `grade8/` | One site per grade (see below) |
| `placement/` | The placement check: finds where a student is in each part of Language, Grades 1 to 8 (see below) |
| `assets/engine/` | **Shared by every grade**: the engine (see below) |
| `assets/atlas-theme.css` | The one look for every page, matching Math Atlas |
| `assets/atlas-header.js` | The shared header: "All grades", the grade's links (or the page's own, from an `atlas-nav` tag), the Math Atlas link, text size, grown-up view. On phones and tablets these sit behind one "Menu" button; on a computer the header is one row and text size and grown-up view sit behind "Settings" |
| `assets/icon.svg` | The site icon in browser tabs and bookmarks |
| `assets/sounds/` | The 44 recorded letter sounds (one short mp3 each), played by the sound buttons in Grades 1 and 2 |
| `tests/` | Automatic checks (see `CHECKS.md`) |
| `.github/workflows/` | `checks.yml` runs the checks on pull requests. `publish.yml` runs them again on `main`, then asks math-atlas to publish (needs the `ATLAS_TOKEN` secret, see `SETUP.md`). |

## The engine (`assets/engine/`)

| File | What it does |
| --- | --- |
| `atlas.js` | The `Atlas` object: saved progress, random helpers, the page router, the grade's home page, text size and grown-up view |
| `qkit.js` | The answer types (`Atlas.Q`): pick one, tap, pick all, put in order, build a word, match, true or false with a reason. Also question shapes. |
| `words.js` | Word pictures (`Atlas.W`): sentence strips, highlighted letters, coloured word-part tiles (prefix, base, suffix), picture cues, "Watch me" steps and letter-sound buttons that play the recorded clips in `assets/sounds/`. Lessons show more and say less. |
| `lesson.js` | Lessons, one idea per screen in three steps (Watch me, Together, On your own), the end of a lesson, and My progress |
| `practice.js` | Adaptive practice (never the same question twice in a row), "Read and answer" sets, the chapter quiz and the check-up |
| `tasks.js` | Activities with a grown-up: speaking, reading aloud, drafting and more, marked with a four-level rubric in grown-up view |
| `tools.js` | The tool box (`#tools`): hands-on tools for free play, alone or with a grown-up, on shelves like Math's tool box. Today: **Word builder**, one word in three linked views: Sounds (letter tiles in sound boxes, including silent-e tiles such as a-e for cake; swap one sound, blend with the recorded clips), Beats (cut a word into syllables) and Parts (prefixes, bases, roots from Grade 7, suffixes, with what each part means, the spelling rules and the word family). **Sentence builder**: word cards coloured by their job (who or what, does, where or when, how, joins, marks); move, swap, Join two, Split, To the front, Make it passive (Grade 6+), and Clauses, with ticks for a complete sentence. Nothing is marked. |
| `cardbank.js` | Sentence builder's word cards, written for this site, by job and by the grade they start in, and ready sentences for "New sentence". A check builds every example and tries every move both ways (see `CHECKS.md`). |
| `wordbank.js` | Word builder's words, written for this site: letter tiles, words split into sounds, words cut into beats, and words made of parts, each with the grade it starts in. A check builds every word again (see `CHECKS.md`). |
| `engine.css` | Layout for all of the above. Colours and fonts come only from the theme. |

## One grade site

`gradeN/index.html` sets three `meta` tags for the header, loads `engine.css` then `atlas-theme.css`, then the scripts in this order:
1. `../assets/atlas-header.js` (first thing in `<body>`)
2. `../assets/engine/atlas.js`, `qkit.js`, `words.js`, `lesson.js`, `practice.js`, `tasks.js`, `wordbank.js`, `cardbank.js`, `tools.js`
3. `grade.js`: `Atlas.setup({ grade, curriculum, chapters: [{ id, title, sub, strand, codes, desc }] })`. A chapter in the list without a file shows as "Coming soon".
4. `texts.js` (optional): reading passages shared by the grade's chapters
5. `chapters/<id>.js`: one file per chapter, each calling `Atlas.register(id, chapter)` and `Atlas.Q.shapes(id, SHAPES)`
6. `<script>Atlas.start();</script>`

## A chapter

```
Atlas.register('sentences', {
  lessons: [ { id, title, sub, concepts: [ idea, ... ] } ],
  practice: [ { id, name, code: 'B3.3', gen: function (level) { return question; } } ],
  quiz: [ fixed questions ],       // optional; the chapter quiz is otherwise made fresh from the practice skills
  full: true,                      // optional; the chapter meets the full standard, and the checks hold it to it (QUESTIONS.md)
  read: { texts, show, ask },      // optional; "Read and answer" sets (QUESTIONS.md)
  tasks: [ activities ]            // optional; marked by a grown-up (see QUESTIONS.md)
});
Atlas.Q.shapes('sentences', { skillId: [[minLevel, 'shape-name', fn], ...] });
```

An idea is `{ slug, title, exp, skill, intro, model, key, guided, check, coach, mistake }`. See `QUESTIONS.md`.

## Pages (the part after `#` in the address)

Learning screens (an idea, or practising one skill) are calm on purpose: no chapter header, tabs or settings on screen, so the question, its picture and its answers fit on a phone without scrolling.

| Address | Page |
| --- | --- |
| `#home` | The grade's chapters |
| `#sentences` | A chapter: its lessons |
| `#sentences/learn/capital`, `/2`, `/3` | One idea: Watch me (one step on screen at a time), Together, On your own. Focus screen: a link back to the chapter, the progress dots, the idea and one small line such as "Together · 1 of 2". Expectation codes show only in grown-up view |
| `#sentences/done/start-end` | End of a lesson: where each idea stands, what to practise |
| `#sentences/practice` | Practice: pick a skill |
| `#sentences/practice/cap-end` | Practising one skill: the question gets the screen, with one link back to the skills |
| `#sentences/quiz` | Chapter quiz |
| `#reading/read`, `#reading/read/3` | Read and answer (a chapter with `read`): the list of passages, shortest first; one passage on its own screen, then its questions one at a time, then the score |
| `#check-up`, `#check-up/all`, `#check-up/sentences` | Check-ups |
| `#sentences/tasks`, `#sentences/tasks/<id>` | Activities with a grown-up, and one activity |
| `#progress` | My progress |
| `#tools`, `#tools/words` | The tool box: one tool fills the screen under a slim bar (back, the tool's name, Undo, Tools menu). Each grade gets the tiles and words for its grade and the grades before |

## The placement check (`placement/`)

`placement/index.html` loads `atlas.js`, `qkit.js` and `words.js` from the engine, then `placement.js` (the check), `passages.js` and `aloud.js` (reading aloud), and `writing.js` (the writing sample). It works like Math Atlas's placement check:
- **7 parts** (areas): sounds, spelling and word parts; word meanings; sentences and grammar; capitals and punctuation; reading for meaning; thinking about texts and media; planning and improving writing. A practice skill belongs to a part by its first expectation code (`areaOf` in `placement.js`). Speaking (B1), A1, A3 and open-ended writing are not in it: a computer does not mark them.
- **The questions are the grades' own practice skills**, at level 2. Nothing is copied: when the check reaches a grade, it reads that grade's `index.html` for its scripts, runs them, keeps the chapters, and puts `Atlas.chapters` back. A grade's passages (`Atlas.texts`) are swapped in only while one of its questions is made. So keep each grade's chapters listed as `<script src>` tags, and a valid code on every skill.
- **How it adapts**, in each part: start one grade below the school grade (never above Grade 8 or two grades above the school grade). Three right out of four at a grade means secure there: go up a grade (asking for three, not two, means a lucky guess on a 4-choice question rarely counts). Two "not yet" (wrong, or "I'm not sure yet") means go down a grade. It stops at the highest secure grade whose next grade is not secure, or after 16 questions.
- **Results**: a ladder of secure grades for each part, and a link to the lesson to start with: in the next grade up, the chapter of the first skill missed there. Grown-up view adds the skills missed at grades that are otherwise secure, and every question with its answer.
- **Reading aloud** (`aloud.js`, page `#aloud`): the standard one-minute oral reading fluency check. The child reads two unpractised passages at their school grade (`passages.js`, written for this site) for one minute each; the grown-up taps words read wrong or skipped, then the last word read. The result is words correct per minute (the average of the two) and the percent read correctly. Grown-up view compares it with the 50th percentile for the grade and season (Hasbrouck and Tindal 2017 for Grades 1 to 6, their 2006 table for Grades 7 and 8); 10 or more below means fluency practice will help, and under 95% correct points to decoding first.
- **Writing sample** (`writing.js`, page `#writing`): the child writes on their own for 10 to 15 minutes to a prompt for their school grade. In grown-up view, the grown-up taps one of four levels (Not yet, Getting there, Yes, Strong) on a rubric for Grades 1 and 2, 3 to 5, or 6 to 8. A computer never marks it. Levels 1 and 2 point to the grade's writing lessons.
- Saved as `lang-place:state`. Inside Atlas the header loads Atlas's `sync.js` for this page too (`atlas-site` is `lplace`), so the result saves to the student's account. The results page also keeps the lesson to start with in each part (`starts`), so the Atlas parent page can show the starting points and link to the same lessons.

## Saved progress

Kept in the browser (`localStorage`), every key starting `lang-gN:` (for example `lang-g1:`):

| Key | What |
| --- | --- |
| `cn:<g1-chapter-idea>` | One idea: seen, watched, done together, questions tried, "Got it" |
| `sk:<skill>` | One practice skill: level, streak, secure |
| `best:<chapter>` | Best chapter quiz score and date |
| `rd:<chapter>:<n>` | Best "Read and answer" score for passage n, and date |
| `checkups`, `cov`, `plan` | Check-up history, which expectations were checked (by check-ups and by grown-up marks), and the practice plan |
| `task:<id>` | The grown-up's mark for an activity (level 1 to 4) and date |
| `tw:<id>` | What the child wrote in an activity |
| `big` | Larger text on or off |

Grown-up view is kept separately (`atlas:adult`), so it is never copied to the child's account. Inside Atlas, the family sign-in copies these keys to the student's account (as `students/{id}/progress/lN`), so quiz and check-up results reach the parent page.

## Inside Atlas

The math-atlas publish step copies this repository into `language/` on the Atlas site. `assets/atlas-header.js` notices that (the address contains `/language/`) and then:
- points "All grades" to the Atlas Curriculum page (Language tab) and the Math link to the Math pages on the same site;
- on a grade page, loads Atlas's `assets/sync.js` and `family.css` with the tags `atlas-site` (`l3` for Grade 3), `atlas-prefix` (`lang-g3:`) and `atlas-hub` (the path to the Atlas home). That adds the Sign in / account link to the header and saves progress to the family account.

Run on its own (the checks, or a local copy) none of this happens and the pages work with progress in the browser only.

Keep `gradeN/grade.js` calling `Atlas.setup({ grade, chapters: [{ id, title, sub, strand, ... }] })`: the Atlas Curriculum page reads it to list each grade's chapters, and links to them as `language/gradeN/#<chapter id>`.
