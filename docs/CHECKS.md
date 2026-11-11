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

6. **The placement check** (in a full run, not with `--grade`):
   - every grade has at least one computer-marked practice skill in each of the 7 parts;
   - made-up children with known levels in each part (for example, secure up to Grade 2 in spelling but Grade 5 in word meanings) take the whole check on a phone screen, sometimes pressing "I'm not sure yet". Each must be placed at exactly their level, every part must link to a starting lesson that exists, and no screen may show an error, run off the side or show grown-up notes to the child.
   - reading aloud: every grade has two passages of at least 100 words and its norms; two readings are marked like a grown-up would (with the clock fast-forwarded) and must give exactly the expected words correct per minute, shown on the starting points page;
   - writing sample: every grade has a prompt and a 4-level rubric; what the child writes is kept, nothing is marked until the grown-up taps a level, and the mark shows on the starting points page;
   - the placement page sets no colours or fonts of its own.
7. **The tool box**, in every grade:
   - every word in Word builder's word bank (`assets/engine/wordbank.js`) uses only letter tiles that exist and sounds that were recorded; silent-e tiles spell words right (c, a-e, k is cake); every word cut into beats has 2 or more beats and one strong beat, each beat has one vowel sound, its syllable type is worked out a second, separate way and must agree, and its vowel sound is a recorded clip; the split patterns and types of a set of known examples (rab-bit, ti-ger, ta-ble, cake, rain ...) come out right; every word made of parts is spelled exactly right when Word builder joins its parts with its spelling rules, and every prefix and suffix says what it means;
   - the Sound board's sound bank (`assets/engine/soundbank.js`): each of the 44 recorded sounds is on the board once, with a key-word picture, a place and manner (consonants) or a spot in the valley or rows (vowels), and a spelling by Grade 3; every spelling is marked in its word; every deck card and Move it sound is a spelling of a sound; every Move it word has a picture; then the Sound board is used like a child would (tap sounds, push chips, change one sound, undo, flip cards, my deck) on a phone, iPad and laptop;
   - every card in Sentence builder's card bank (`assets/engine/cardbank.js`) is there once; every example sentence uses only cards of its grade and passes every tick; moving a part to the front and back, making a sentence passive and back, and joining two sentences and splitting them again all give the sentence back; passive sentences say "was" or "were" correctly;
   - on a phone screen, a child builds a word from its sound tiles (it must show as a real word), swaps one sound, blends, and undoes; picks a syllable type (every word listed has it), marks the vowels, cuts a word into its beats (each beat card shows, and from Grade 2 one strong beat and a pattern at each cut), shows where the beats go and joins it up again; builds a word from its parts and opens another from its word family; opens and closes the Tools menu; goes back to the Toolbox page, which lists every tool on a phone, iPad and laptop, and opens a tool from it (its back button returns to the Toolbox page, or to the site's Toolbox page when opened from there);
   - the Reading window: every sentence of every passage cut into phrases keeps all its words, and no phrase is longer than 7 words or ends on a little word (the, of, to); on a phone the Line and Phrase windows move with Next, a tapped word becomes a tricky word, Read again counts, and Music marks show and hide; a grown-up one-minute read gives the right words correct per minute and accuracy, saves it, and shows it on My progress;
   - Word shades and Word web (`assets/engine/meaningbank.js`): every set has 3 to 5 different words and a sentence with one blank (feeling sets have 3 words, from Grade 7); every word's example uses the word, its family words share its start, no word is both like it and its opposite, and every same-root word has one of its roots; on a phone the strip fills in order, Undo, Show the order and Mix up work, every web word shows its parts and Cover hides them; on an iPad and a laptop the parts of a web never overlap;
   - Text maps (`assets/engine/mapbank.js`): every card goes in a box its map has, every box gets a card, and Compare names its two things; on a phone every card of every map is sorted into its box, Show the map fills it, and a blank map keeps what was typed;
   - Paragraph builder and Letter pad (`assets/engine/writebank.js`): every paragraph has three details and full sentences, every sentence to stretch has an ending for because, but and so; Show me builds the paragraph with all three ticks, a joining word goes in front of a detail, the card that does not belong loses a tick; Stretch and Write keep what was typed. Every letter is measured on the lines: tall letters reach up, letters with tails go down to the ground line, the rest sit on the grass line, capitals and numbers go from the sky line to the grass line, and every cursive letter starts on the grass line ready to join; a drawn stroke can be undone and cleared, and Trace, Copy, Remember and Show me show the right things;
   - each view opens again on an iPad (both ways round) and a laptop with no errors and nothing off the side.
8. **Worksheets**, in every grade with worksheets (`gradeN/sheets/`):
   - every sheet of every chapter (Learn, Practise 1 to 3, Think, each Activity and each Read sheet) and its answer key are drawn at full size, taking the themes in turn: nothing runs off the page, the key has the same questions, nothing says undefined, and every question sheet fits 2 or more questions (1 or more on a Learn sheet, as its Watch me steps teach too, or on a sheet with two texts to compare; a Learn sheet whose questions all need two whole texts may print its steps only);
   - every printed question that is marked right or wrong passes the same answer check (`verify/*.js`) as on the site, and every open question has a good answer for the grown-up;
   - every idea has its "I can" line and 2 or more Think questions, every idea named in the sheets file is in the chapter, each chapter has its own two-letter code, and every expectation the chapter lists is on one of its sheets;
   - in grown-up view the Worksheets tab and a sheet with its key open on a phone, an iPad and a laptop with no errors and nothing off the side; with grown-up view off, no sheet shows.

9. **Reading passages**, in Grades 4 to 8 (`gradeN/passages.js`):
   - every passage has a photo or drawing across the top (a photo has a credit, its file and small copy are in `assets/photos/`, and it is listed in `CREDITS.md`), a diagram, map or chart with a caption, 2 or 3 Words to know that are bold in the text, and a guide for the grown-up;
   - its length suits the grade (Grade 4: 250 to 420 words, rising to 320 to 560 in Grade 8);
   - it has 6 to 9 questions, 2 or more of them written answers, on 4 or more different expectations, each a real expectation of the grade; every choice question has its answer among 3 or 4 different choices, every "number them" list is printed out of order, every blank in a chart has an answer, and every written answer has a good answer and what to look for;
   - the front, the back and the answer key each fit on one page, measured with the site's real fonts (`tests/fonts`, served in place of Google Fonts, so the result is the same on every computer);
   - once a grade has 100 passages, their questions together reach every reading expectation: B2.1, B2.2, B3.1 to B3.3, C1.1 to C1.6, C2.1 to C2.7, C3.1 to C3.6 and C3.8 (B2.3, reading aloud, is on every answer key; C1.7 and C3.7 need texts by First Nations, Métis and Inuit creators, so they are taught with real books, not these passages);
   - the list and a passage open on a phone, an iPad and a laptop with no errors and nothing off the side; the answer key shows only in grown-up view. In Grades 1 to 3 the tool is not on the Toolbox page.
10. **Decodable readers** (the tool box's printable phonics stories, checked once, in Grade 1):
   - every word of every title, story and question can be sounded out with the phonics steps taught up to that page, or is a heart word taught by then. `tests/decodable.js` works this out again on its own: it splits each word into its spelling units (sh, ck, a_e, igh ...) and endings (-s, -ed, -ing ...) and finds the first step that teaches all of them. Words that look regular but are not (was, of, said, come) always count as heart words. Words with a less common reading (bread, roll, school, colour) are in its SPECIAL lists and count only from the step that teaches that reading; words with a schwa (about, Canada) are in its SCHWA list. A step about long words looks for words of 3 or more syllables. To try a word: `node decodable.js x --word cake`;
   - the steps are in teaching order, with up to 3 stories each (checked the same way); a blends story marked l, r or s uses only that kind of blend in its warm-up and target words, and no kind taught after it; each story has 8 or more warm-up words that all use its new spelling, a story with 5 or more different words that use it, and 3 questions with an Ontario code and an answer;
   - every page and its grown-up page fit on the paper; the tool opens on a phone, an iPad and a laptop with no errors, and the grown-up page stays hidden with grown-up view off.
11. **Spelling path** (the tool box's spelling steps, checked once, in Grade 1). `tests/spelling.js` works the answers out again on its own (alone: `node spelling.js`):
   - each step is a decodable reader step, in the same order; it has its name, rule, grown-up tip, common mistake, a heart word, 8 to 10 words, 2 review words (none on the first step) and a dictation sentence;
   - each word's sounds spell the word, each sound is a spelling a sound box can hold, and the word uses the step's new spelling (a step with beat boxes: 2 or more beats, each with a vowel, that spell the word; 3 or more on the long words step); each clue has one blank and does not give the word away;
   - every word, sort word, ending word, review word and sentence word can be sounded out by that step (the decodable readers' own checker), or is a heart word taught by then; review words come from earlier steps;
   - each sort word is in the bin the checker finds in it (its spelling; open or closed; y as /eye/ in one beat or /ee/ in two; soft or hard c; the prefix it starts with or the suffix it ends with);
   - each ending makes the word that its own copy of the spelling rules gives (y to i, drop the e, double the last letter; a prefix changes nothing), and the tool's word matches it; the tile tray always holds every sound of the word;
   - every step's key word is one of its words, and a grade's groups of steps are not split (the spelling check uses both);
   - Grades 4 to 8 steps (not reader steps) instead: each word's parts join to make it, in small letters, and one part is a focus part of the step; each step has 3 or more extra tray tiles; every word in a word family is a front from its list, the root and an end from its list, and every front and end is used; proofreading has 3 or more real mistakes, each fixed with a word from this step, an earlier one or its heart words; review words come from earlier steps; sort words go in the bin whose part they start with, end with or contain; endings follow the same rules, plus in- turning to im-, il- or ir- and doubling in a longer word whose last beat is stressed;
   - on a phone, every part of every step is used: a word is spelled in Sound boxes and marked right, every sort word is put in its bin, an ending is written and marked right, a word grows on each Word family tree, a mistake is fixed in each Proofread, the spelling check (right, then 3 not yet) names and saves the step the checker works out, and a dictation with one sound marked wrong saves the right score; every printed page and grown-up page fits on the paper; the list and each part open on a phone, an iPad and a laptop with no errors, nothing off the side and no grown-up notes showing to the child.
12. **Heart words** (the tool box's tricky words, checked once, in Grade 1). `tests/hearts.js` (alone: `node hearts.js`) checks that the sets go Kindergarten to Grade 3 with 1 to 10 words each and no word twice; that each word is letters only with its heart part marked in [ ]; and that every heart word of the decodable readers is in a set no later than the reader's grade. In a browser: every set's printed page and grown-up page fits on the paper; on a phone, the first word of every set is looked at, traced and written, the word stays hidden until Show it, and Got it is saved; the list, a set and its print page open on a phone, an iPad and a laptop with no errors and nothing off the side.

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
