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
| `tools.js` | The tool box (`#tools`): hands-on tools for free play, alone or with a grown-up, on shelves like Math's tool box. Today: **Sound board** (`soundboard.js`, below), **Word builder**, one word in three linked views: Sounds (letter tiles in sound boxes, including silent-e tiles such as a-e for cake; swap one sound, blend with the recorded clips), Beats (cut a word into syllables; each beat shows its syllable type, closed, open, silent e, vowel team, with r or consonant-le, and plays the vowel sound that type gives; Mark vowels; Find a type; from Grade 2 the split pattern at each cut, VC/CV and so on, and the strong beat) and Parts (prefixes, bases, roots from Grade 7, suffixes, with what each part means, the spelling rules and the word family). **Sentence builder**: word cards coloured by their job (who or what, does, where or when, how, joins, marks); move, swap, Join two, Split, To the front, Make it passive (Grade 6+), and Clauses, with ticks for a complete sentence. Nothing is marked. |
| `reader.js` | The **Reading window** (`#tools/read`, shelf Reading): reading fluency with the grade's own passages (`gradeN/texts.js`). Page, Line (one sentence lit, the rest faded) or Phrase (one phrase at a time, with a scoop under each; the phrases are cut by rule: after a comma, before a joining or place word, 2 to 5 words, never ending on a little word such as the); Music marks for expression; tap a word to mark it tricky; Read again counts rereads; text size and spacing. In grown-up view, a one-minute read gives words correct per minute and accuracy and saves it (`fluency`), shown on My progress in grown-up view. It adds itself to `tools.js`'s tool list. |
| `meaning.js`, `meaningbank.js` | Shelf Words and meaning. **Word shades** (`#tools/shades`): word cards for one idea placed on a paint strip from weaker to stronger (Grades 7 and 8 add sets with the same meaning and a different feeling: sounds negative to sounds positive), with a sentence to try each word in; Show the order, Mix up. **Word web** (`#tools/web`): one word with what it means, words like it, opposites, its word family and an example; from Grade 7 its Greek or Latin roots and other words with the same root; Cover hides each part until tapped. `meaningbank.js` holds the sets and words, each with the grades that see it (`g` to `to`). |
| `textmaps.js`, `mapbank.js` | Shelf Reading. **Text maps** (`#tools/maps`): graphic organizers (Beginning, middle, end; Sequence; Story map; Main idea; Story mountain; Cause and effect; Compare; Fact or opinion; Argument). Read a short text, then tap its cards into the map's boxes; Show the map, Mix up; Blank keeps typed notes for any book (`maps:<map>`). A grade sees a map when `mapbank.js` has a text for it. |
| `writetools.js`, `writebank.js` | Shelf Writing. **Paragraph builder** (`#tools/paragraph`): Build (sentence cards into topic sentence, three details and closing sentence, joining words in front of details, ticks, and one card that does not belong), Stretch (finish a sentence with because, but and so; `stretch`), Write (your own paragraph with starters; `para-own`). **Letter pad** (`#tools/letters`): printing (abc, ABC, 123) and cursive from Grade 3 on sky, plane, grass and ground lines; Trace, Copy and Remember; Show me draws the strokes in order; draw with a finger or pencil, Undo and Clear. `writebank.js` holds the paragraphs, joining words, sentences to stretch, starters and every letter's strokes (SVG paths on the four lines). |
| `soundboard.js` | The **Sound board** (`#tools/sounds`, the first tool on the list): the 44 sounds on a wall by where the mouth makes them (and the vowel valley), each with its recording, a side-view mouth picture, every way to spell it up to the grade and a key word; Move it (one chip per sound, then letters, then change one sound); and Cards (the Orton-Gillingham sound drill, with Hear it first and My deck). It adds itself to `tools.js`'s tool list. |
| `soundbank.js` | The Sound board's sounds: place and manner, voiced or quiet, key word, spellings by grade, the vowel valley, the card decks and the Move it words. A check builds it all again (see `CHECKS.md`). |
| `cardbank.js` | Sentence builder's word cards, written for this site, by job and by the grade they start in, and ready sentences for "New sentence". A check builds every example and tries every move both ways (see `CHECKS.md`). |
| `wordbank.js` | Word builder's words, written for this site: letter tiles, words split into sounds, words cut into beats (with the strong beat and any vowel sound that breaks the rule), and words made of parts, each with the grade it starts in. A check builds every word again (see `CHECKS.md`). |
| `sheets.js`, `sheet-themes.js`, `sheets.css` | **Printable worksheets** (see below): the Worksheets tab, made from a chapter's own lessons, practice and activities; 6 themes; the sheet's look and printing. Only `sheets.css` and the themes add their own display faces and accent colours, for paper. |
| `engine.css` | Layout for all of the above. Colours and fonts come only from the theme. |

## One grade site

`gradeN/index.html` sets three `meta` tags for the header, loads `engine.css` then `atlas-theme.css`, then the scripts in this order:
1. `../assets/atlas-header.js` (first thing in `<body>`)
2. `../assets/engine/atlas.js`, `qkit.js`, `words.js`, `lesson.js`, `practice.js`, `tasks.js`, `wordbank.js`, `cardbank.js`, `tools.js`, `soundbank.js`, `soundboard.js`, `reader.js`, `meaningbank.js`, `meaning.js`, `mapbank.js`, `textmaps.js`, `writebank.js`, `writetools.js`, `sheets.js`, `sheet-themes.js` (and `sheets.css` after `engine.css`)
3. `grade.js`: `Atlas.setup({ grade, curriculum, chapters: [{ id, title, sub, strand, codes, desc }] })`. A chapter in the list without a file shows as "Coming soon".
4. `texts.js` (optional): reading passages shared by the grade's chapters
5. `chapters/<id>.js`: one file per chapter, each calling `Atlas.register(id, chapter)` and `Atlas.Q.shapes(id, SHAPES)`
6. `sheets/<id>.js` (optional): the chapter's worksheets, `Atlas.sheets.register(id, { code, ideas })` (see below)
7. `<script>Atlas.start();</script>`

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
| `#sentences/sheets`, `#sentences/sheets/kinds/p2`, `/task/<id>`, `/read/<n>` | Worksheets (grown-up view): the list, then one sheet with its answer key and Print |
| `#check-up`, `#check-up/all`, `#check-up/sentences` | Check-ups |
| `#sentences/tasks`, `#sentences/tasks/<id>` | Activities with a grown-up, and one activity |
| `#progress` | My progress |
| `#tools`, `#tools/words` | The tool box: `#tools` lists every tool on its shelves; `#tools/words` and the like fill the screen with one tool under a slim bar (back to all tools, the tool's name, Undo, Tools menu). A tool opened from the site's own Toolbox page (`tools.html` in Math Atlas) goes back there. Each grade gets the tiles and words for its grade and the grades before |

## Printable worksheets

Grown-ups (grown-up view only) get a **Worksheets** tab on a chapter whose grade has `gradeN/sheets/<chapter>.js`. Each idea has five sheets, from most help to least: **Learn** (its "Watch me" steps, its "Together" questions with their thinking cue, its "On your own" questions), **Practise 1, 2 and 3** (its practice skill at levels 1, 2 and 3, in every way it asks) and **Think** (questions written for paper). Each activity with a grown-up prints as an **Activity** sheet (picture, line for the child, the text, lines to write on; its key has the steps to run it and the four-level rubric), and each "Read and answer" passage as a **Read** sheet. Each sheet prints in 6 themes, with or without its answer key as page 2.
- **Nothing is written twice.** The sheets ask the site's own questions, made with a fixed seed for each sheet (`Q.resetShapes` and a seeded `Math.random` while a sheet is made), so a sheet always prints the same. Change a chapter's questions and its sheets change with it.
- **On paper**: pick one, tap and pick all become "circle", put in order "number them in order", match "write the letter", build a word "write the word", true or false "circle True or False" (and Why?). A sheet keeps to one passage when 3 or more of its questions are about it: it is printed once at the top, in two columns, with its sentences numbered, and "tap the sentence" becomes "write its number". Other passages stay with their question. Sound buttons print as their /sh/ label.
- **Filling the page**: a sheet is drawn at full size (816 by 1056, US Letter) as HTML, and questions are added in order until the page is full; a question that does not fit is left out (the next may fit). The answer key draws exactly the same questions (`S.render(..., key, at)`). On screen the page is scaled to fit; printing gives one page per sheet.
- **The look** is Math's Editorial look (Noel's choice): the chapter and kind in small spaced capitals with the theme's mark, a large title in the theme's face, the "I can" line, Name and Date, questions in two columns with their numbers in the margin and hairlines between rows, short lines to write on, and a "How did it feel?" check-in. The key puts the answers in red, the idea's common mistake (Watch for), the Ontario codes and a score line at the foot. Themes (`sheet-themes.js`) change only the face, one accent colour, the mark and a light ornament at the page edge; the paper is always white.
- **A grade's sheets file** (`gradeN/sheets/<chapter>.js`) adds only what paper needs: `Atlas.sheets.register('sentences', { code: 'SE', ideas: { kinds: { goal: 'I can ...', think: [question, ...] } } })`. `code` is two letters for the sheet number (G3-SE-01-P2-LK: grade, chapter, idea, kind, theme). Every idea needs a `goal` and 2 or more Think questions: a question from `qkit.js` (with `meta.k` and an answer check, as on the site) or an open question `{ q, fig, lines: 3, key: 'a good answer' }` that the grown-up marks. `grade3/sheets/` (every Grade 3 chapter) is the worked example. An idea can also set `steps: 3` to print only its first 3 "Watch me" steps, when the later ones are about a text the sheet does not show. The steps stop on their own before a second text, and the last steps are left off until a question fits under them.
- The chosen theme and key switch are kept in this browser (`atlas:sheet-theme`, `atlas:sheet-key`). The checks draw every sheet (see `CHECKS.md`).

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
