# Automatic checks

The checks in `tests/run.js` stand in for a careful human tester. They run:
- on every pull request (workflow **Checks**);
- before every publish (workflow **Publish**). If any check fails, nothing is published and the live site stays as it was.

## What they check

1. **Repository rules.**
   - Every script is valid.
   - The shared engine exists only once, in `assets/engine/`. A copy (or part of one) anywhere else fails.
   - Every grade page loads the whole engine, the theme and the header.
   - No grade has its own style sheet, colours or fonts.
   - Canadian spelling: common US spellings fail (the list is in `tests/run.js`).
   - Every recorded sound listed in `words.js` has its file in `assets/sounds/`, and there are no extra files.
2. **Content rules.**
   - Every idea has an expectation code, "Watch me" steps, "Together" questions and "On your own" questions.
   - Every practice skill asks in at least 4 ways.
   - Say it once: no "Watch me" line or recap repeats the idea's title, and no line repeats an earlier one.
   - The codes a chapter lists are exactly the codes its ideas, skills and activities teach.
   - Every activity with a grown-up has a picture, one line for the child, steps for the grown-up, an expectation code and a rubric with exactly 4 levels.
   - A **full chapter** (`full: true`, see `QUESTIONS.md`) must be deep enough to study from: every idea has 4 or more "Watch me" steps (two worked examples), 3 or more "Together" and 5 or more "On your own" questions, and its own practice skill; every skill can make 30 or more different questions, so practice does not repeat.
3. **Every question.** Each practice skill is made 40 times at each level, every "Together" and "On your own" question 10 times, and every "Read and answer" set 4 times:
   - the question fits its type (for example, the right answer is one of the options, options do not repeat);
   - nothing says "undefined", "NaN" or "null";
   - the answer is worked out again by `tests/verify/` and must match.
4. **Every page**, on a phone-size screen (390 px wide), with grown-up view off and then on: it opens with no errors, nothing runs off the side, numbers of 5 or more digits have a space, and coaching notes are hidden unless grown-up view is on. Every sound button plays a file that exists and is never inside an answer choice; on each "Watch me", tapping a sound button gives no error. The Grown-up view button must show and hide them. The home page's links must all lead somewhere, including the link to Math Atlas.
5. **Answering like a child**, on the phone-size screen:
   - every idea is walked through: all "Watch me" steps; every "Together" question answered wrong first (it must be corrected and asked again), then right; "On your own" answered wrong then right, then right enough times (4, or 2 for a short idea), which must mark the idea "Got it";
   - practice questions at every level, sometimes wrong first, must be marked correctly;
   - every "Read and answer" set: the passage, then each question answered wrong first and then right; the set must reach its end and save the score;
   - every chapter quiz answered right must score full marks, and the score must be saved;
   - every check-up answered right must say full marks, save its result, and between them cover every expectation a computer can mark;
   - every activity with a grown-up is opened in grown-up view, written in (if it has a box), and marked; the writing and the mark must be kept, and the mark must reach the check-up map. After that, the map must show every expectation of the grade as checked.

## Running them yourself

```
cd tests
npm install                       # first time only
npx playwright install chromium   # first time only
npm test                          # everything
npm run quick                     # fewer tries, faster
node run.js --grade 1             # one grade
```

The last line says **ALL CHECKS PASSED** or lists each problem with the grade, chapter and skill it came from.
