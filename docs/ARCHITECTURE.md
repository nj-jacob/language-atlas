# How Language Atlas is built

Plain web pages with no build step: what is in this repository is exactly what the browser loads. It is published as part of **Atlas** (one site for Math and Language) at https://ontario-math-atlas.web.app/language/. The math-atlas repository owns the Atlas home, Curriculum page, sign-in and family pages, and publishes the whole site; see "Inside Atlas" below and math-atlas `docs/ARCHITECTURE.md`.

## Folders

| Folder or file | What it is |
| --- | --- |
| `index.html` | Language home page: all grades. Atlas's Curriculum page reads its `href="gradeN/"` links to know which grades are ready, so link every ready grade that way |
| `grade1/` … `grade8/` | One site per grade (see below) |
| `assets/engine/` | **Shared by every grade**: the engine (see below) |
| `assets/atlas-theme.css` | The one look for every page, matching Math Atlas |
| `assets/atlas-header.js` | The shared header: "All grades", the grade's links, the Math Atlas link, text size, grown-up view. On phones and tablets these sit behind one "Menu" button; on a computer the header is one row and text size and grown-up view sit behind "Settings" |
| `assets/icon.svg` | The site icon in browser tabs and bookmarks |
| `tests/` | Automatic checks (see `CHECKS.md`) |
| `.github/workflows/` | `checks.yml` runs the checks on pull requests. `publish.yml` runs them again on `main`, then asks math-atlas to publish (needs the `ATLAS_TOKEN` secret, see `SETUP.md`). |

## The engine (`assets/engine/`)

| File | What it does |
| --- | --- |
| `atlas.js` | The `Atlas` object: saved progress, random helpers, the page router, the grade's home page, text size and grown-up view |
| `qkit.js` | The answer types (`Atlas.Q`): pick one, tap, pick all, put in order, build a word, match, true or false with a reason. Also question shapes. |
| `words.js` | Word pictures (`Atlas.W`): sentence strips, highlighted letters, coloured word-part tiles (prefix, base, suffix), picture cues and "Watch me" steps. Lessons show more and say less. |
| `lesson.js` | Lessons, one idea per screen in three steps (Watch me, Together, On your own), the end of a lesson, and My progress |
| `practice.js` | Adaptive practice, the chapter quiz and the check-up |
| `tasks.js` | Activities with a grown-up: speaking, reading aloud, drafting and more, marked with a four-level rubric in grown-up view |
| `engine.css` | Layout for all of the above. Colours and fonts come only from the theme. |

## One grade site

`gradeN/index.html` sets three `meta` tags for the header, loads `engine.css` then `atlas-theme.css`, then the scripts in this order:
1. `../assets/atlas-header.js` (first thing in `<body>`)
2. `../assets/engine/atlas.js`, `qkit.js`, `words.js`, `lesson.js`, `practice.js`, `tasks.js`
3. `grade.js`: `Atlas.setup({ grade, curriculum, chapters: [{ id, title, sub, strand, codes, desc }] })`. A chapter in the list without a file shows as "Coming soon".
4. `texts.js` (optional): reading passages shared by the grade's chapters (Grade 3 has seven, Grade 5 has nine)
5. `chapters/<id>.js`: one file per chapter, each calling `Atlas.register(id, chapter)` and `Atlas.Q.shapes(id, SHAPES)`
6. `<script>Atlas.start();</script>`

## A chapter

```
Atlas.register('sentences', {
  lessons: [ { id, title, sub, concepts: [ idea, ... ] } ],
  practice: [ { id, name, code: 'B3.3', gen: function (level) { return question; } } ],
  quiz: [ fixed questions ],       // optional; the chapter quiz is otherwise made fresh from the practice skills
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
| `#check-up`, `#check-up/all`, `#check-up/sentences` | Check-ups |
| `#sentences/tasks`, `#sentences/tasks/<id>` | Activities with a grown-up, and one activity |
| `#progress` | My progress |

## Saved progress

Kept in the browser (`localStorage`), every key starting `lang-gN:` (for example `lang-g1:`):

| Key | What |
| --- | --- |
| `cn:<g1-chapter-idea>` | One idea: seen, watched, done together, questions tried, "Got it" |
| `sk:<skill>` | One practice skill: level, streak, secure |
| `best:<chapter>` | Best chapter quiz score and date |
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
