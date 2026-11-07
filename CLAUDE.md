# Rules for working on Language Atlas

Read this before changing anything. The owner, Noel, is not a developer, so these rules stand in for a human code reviewer. Follow them on every change, however small.

## How a change goes live
1. Work on a branch, never directly on `main`. Pushing to `main` publishes to the live site, where a child uses it.
2. Run the checks before you push: `cd tests && npm install && npm test`. For a quicker pass, `npm run quick` or `node run.js --grade 1`.
3. Open a pull request. The **Checks** workflow runs on it. Merge only when Checks is green and Noel has OK'd the change.
4. The **Publish** workflow runs the checks again and, only if they pass, asks math-atlas to publish Atlas with the new Language pages (under `/language/`).
5. Add a line to `CHANGELOG.md` under today's date. On parallel pull requests, CHANGELOG conflicts are normal: merge `main` in and keep both sides.

## Where things live
See `docs/ARCHITECTURE.md`. In short:
- `assets/engine/` holds the **one shared copy** of the engine: `atlas.js` (core and pages), `qkit.js` (answer types), `words.js` (word pictures), `lesson.js` (lessons and progress), `practice.js` (practice, quiz, check-up), `tasks.js` (activities marked by a grown-up), `tools.js`, `soundboard.js`, `soundbank.js`, `wordbank.js`, `cardbank.js` and `reader.js` (the tool box: Sound board and its sounds, Word builder and its words, Sentence builder and its cards, Reading window) and `engine.css`. Never copy any of it into a grade folder. A check fails if you do.
- `assets/atlas-theme.css` is the one look, matching Math Atlas. No grade adds colours, fonts or style sheets. A check fails if one does.
- `assets/atlas-header.js` draws the same header on every page ("All grades", the Math Atlas link, text size, grown-up view).
- `gradeN/grade.js` lists the grade's chapters. `gradeN/chapters/<id>.js` holds one chapter: lessons, practice skills, question shapes, activities. `gradeN/texts.js` (optional) holds reading passages shared by that grade's chapters.
- If two grades need the same thing, put it in `assets/engine/` once.

## Writing content
- **Fetch the curriculum first.** Before writing any lesson, read the official 2023 Ontario Language curriculum for that grade (dcp.edu.gov.on.ca). Do not rely on memory. Every idea (`exp`) and practice skill (`code`) names its expectation codes, for example `B3.3`.
- **Show, don't tell.** Very little text for the child: each "Watch me" step is one picture and one short line. Use the word pictures in `words.js`.
- **Say it once.** Screen space is precious. The idea's title is the rule; a step's line adds something new or is left out. Nothing on a screen repeats something else on it. A check fails if a line repeats the title.
- **One idea per screen**, taught in three steps (Direct Instruction): Watch me (I do), Together (we do, with a thinking cue and quick correction), On your own (you do). See `docs/QUESTIONS.md`.
- **4 or more ways of asking** for every practice skill (`Atlas.Q.shapes`). A check fails with fewer.
- **Every auto-marked question** sets `meta.k`, and `tests/verify/gradeN*.js` has a check with that key that works the answer out independently. Open-ended writing, speaking, reading aloud and handwriting are never auto-marked: they are activities (`tasks`) the grown-up marks with a four-level rubric.
- **Check-ups** must cover every expectation of the grade and be pitched at the grade.
- **Grown-up only:** coaching notes (`coach`) and common mistakes (`mistake`) show only in grown-up view, never to the child.
- **Original text only.** Every passage, sentence and word list is written fresh for this site. Never copy published texts. Include Canadian and Indigenous contexts respectfully, and a range of names and places.
- **Canadian conventions:** Canadian spelling (colour, centre, neighbour, travelled), metric units, CAD, and a space in numbers of 5 or more digits (12 500). A check looks for common US spellings.
- **Sound:** short recorded sound clips are allowed for phonics only (letter sounds). No read-aloud of lessons.
- Calm, mature and premium. Nothing gamified: no points, badges, cartoons or confetti. Short, plain sentences for the child.

## Before saying a change is done
Open every changed page at phone size (390 px wide), answer every question, and confirm there are no console errors and nothing is cut off. The checks do most of this; look at the pages too. Tell Noel what is not covered and what to check.

## Keep it tidy
- One goal per pull request.
- No dead code, debug logs or commented-out blocks.
- If you change how something works, update the doc that describes it in the same pull request.
- Explain things to Noel in plain English, in short bullets, and explain any jargon.
