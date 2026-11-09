# Writing lessons and questions

`grade3/chapters/word-parts.js` is the worked example. Every chapter in `grade3/chapters/` follows the same pattern.

**Show, don't tell.** The child should read very little. Each "Watch me" step is one picture and one short line (`Atlas.W.step`). Use word tiles, sentence strips, highlights and picture cues from `Atlas.W` (see `assets/engine/words.js`) rather than paragraphs. For words a child names by sound, use the line-art pictures: `Atlas.W.pic('sun')` (the list is `Atlas.W.pics`: sun, cat, dog, pig, fish, hat, bed, cup, bus, map, jet, fox, egg, bee, kite, moon, tree, apple, ball, box, key, nest, van, and for passages canoe, snow, leaf, book, house, rain, ferry, hockey, goose, moose, plant, sky, letter, angel, science). An unknown name stops the page with an error, so the checks catch it.

**Letter sounds (phonics only).** `Atlas.W.sound('sh')` is a small button that plays the recorded sound and shows /sh/; give other text with `Atlas.W.sound('ee', '/ē/')`. `Atlas.W.soundRow(['f', 'r', 'o', 'g'])` shows a word as its sounds, one button per tile, for blending and counting. The 44 recorded sounds are `Atlas.W.soundNames` (files in `assets/sounds/`); c and ck play k, and ay plays ai. Put sound buttons in a "Watch me" line, a question's picture (`fig`), its `prompt` or its `steps`, never in an answer choice: a choice is a button already, and the checks fail if a sound button is inside one. No other read-aloud.

## A full chapter: deep enough to study from

Coverage is not enough: a child needs worked examples, lots of practice and questions that do not repeat. A chapter that meets this standard sets `full: true`, and the checks then hold it to it. `grade3/chapters/reading.js` is the worked example.

- **Every idea:** two worked examples in "Watch me" (4 to 6 steps, each a picture and one line), 3 "Together" questions, 5 "On your own" questions. "Got it" needs 4 right on the first try.
- **Every idea has its own practice skill**, asked in 4 or more ways, with levels that really step up (more choices, longer texts, harder shapes).
- **Big question banks:** each skill can make 30 or more different questions. Practice never asks the one the child has just seen.
- **Visual first:** pictures carry the idea. Passages have a picture band, the main idea is drawn as a roof over its details (`Atlas.W.web`), order as a story map (`Atlas.W.chain`), and the child taps the sentence in the text (a `tap` question whose `pic` is `Atlas.W.passage(title, lines, { tap: true })`).
- **Reading chapters** add "Read and answer" sets and passages at grade length (see below).

## Read and answer

A reading chapter can add `read: { texts: [passage, ...], show: function (t) -> html, ask: function (t) -> [question, ...] }`. The child picks a passage, reads it on its own screen, then answers its questions one at a time (a hint after a miss, then a second try) and sees a score. Keep sets to about 5 questions, mixing facts, a tap-the-sentence question and one or two others (main idea, order, kind of text).

Passages live in `gradeN/texts.js`, which calls `Atlas.passages({ key: passage, ... }, { short: 100 })` once (in `words.js`). That sets `Atlas.texts` and adds the shared helpers: `show(t, upTo, { tap })`, `body(t)`, `words(t)` and `list(need, level)`, where level 1 gives passages under `short` words and level 3 the longer ones. Never copy these helpers into a grade. Write passages at grade length (Grade 3: 100 to 150 words for the long ones), in paragraphs: an empty line `''` starts a new paragraph, `'# '` a heading. Give each one `pics` (picture names for its band) and the facts, events, main idea and prediction its questions need; for thinking questions, add clues to infer (`infer`), causes and effects (`cause`) and, for letters, the writer's view (`view`). The fields are listed at the top of `grade3/texts.js`.

## An idea (one screen)

| Field | Meaning |
| --- | --- |
| `slug` | Short name used in the address, like `capital` |
| `title` | One plain sentence, like "A sentence starts with a capital letter". This is the rule, said **once**. |
| `exp` | The expectation codes it teaches, like `['B3.3']` (fetch the curriculum first) |
| `skill` | The practice skill that makes it "Mastered" |
| `intro` | Optional: one short line before the example. Usually leave it out. |
| `model` | **Watch me** (I do): the worked example as a list of steps, each `Atlas.W.step(picture, line)`. One step shows at a time, with Back and Next on one row. The line adds something the picture does not show ("Cover re. Read paint."), or is left out: `Atlas.W.step(picture)`. Never repeat the title. |
| `key` | Optional: a one-line recap shown on the end-of-lesson page. Leave it out if it would only repeat the title. |
| `guided` | **Together** (we do): a list of functions that each make a question. Give each a `prompt`, a cue to think about. |
| `check` | **On your own** (you do): a list of functions that each make a question. No cue. |
| `coach` | For grown-ups: how to coach this idea. Grown-up view only. |
| `mistake` | For grown-ups: a common mistake and what to do. Grown-up view only. |

How the steps behave:
- **Together:** a wrong answer is corrected at once (the answer and why), then the **same** question is asked again, so the child ends on a right answer.
- **On your own:** a wrong answer gets a hint and a second try; a second miss shows the answer and the steps. Right on the first try 4 times marks the idea "Got it" (2 for a short idea with fewer "On your own" questions). The screen shows the count.

## The question object

| Field | Meaning |
| --- | --- |
| `q` | The question (HTML allowed) |
| `type` | The answer type (below) |
| `fig` | Optional picture or sentence shown under the question |
| `prompt` | A thinking cue, shown in "Together" |
| `hint` | Shown after a first wrong answer |
| `steps` | A list of steps, shown after a miss |
| `explain` | Shown after the answer |
| `meta` | `{ k: 'check-key', ... }`: the key of its answer check and any facts the check needs. **Required.** |
| `shape` | Set automatically by `Atlas.Q.vary` |

## Answer types

| type | The child… | Fields |
| --- | --- | --- |
| `mc` | picks one answer | `options`, `answer` (index) |
| `tap` | taps one tile or part of a picture | `tiles` (list of HTML) and `answer` (index), **or** `pic` (SVG with `data-hit="key"` parts) and `answer` (key); optional `answerText` |
| `pick` | picks every answer that fits | `options`, `answer` (list of indexes; never all of them) |
| `order` | taps cards into order | `items` **in the right order** (shown mixed up), optional `first` / `last` labels |
| `build` | taps word parts into boxes to build a word | `parts` (list of HTML, including at least one that is not needed), `answer` (indexes of the parts, in order) |
| `match` | matches pairs | `pairs: [[left, right], ...]` (right side shown mixed up) |
| `tf` | says true or false, then picks why | `answer` (true or false), optional `why: { options, answer }` |

More language types (tap a word in a sentence, sort, letter tiles, cloze, highlight evidence, written answers for the grown-up to mark) come next. Each new type needs: its maker in `qkit.js`, a structure check in `tests/validate.js`, a way to answer it in `tests/answer.js`, and a row here.

## Question shapes: 4 or more ways to ask

A practice skill keeps one idea but asks it in different ways. In the chapter file:

```
Atlas.Q.shapes('sentences', {
  'cap-end': [[1, 'end-mark', endMark], [2, 'fix-tf', fixTf], [2, 'build', build], [3, 'pick', pickAll]]
});
```

Each entry is `[lowest level, name, function (level) -> question]`. The skill's own `gen` counts as the first way (`plain`). Keep level 1 gentle. A check fails if a skill has fewer than 4 ways. This call also turns on the fresh chapter quiz.

## Writing the sentences

- Write every sentence, passage and word list fresh. Never copy from books, websites or worksheets.
- Short sentences, everyday words, a range of names (`Atlas.Q.name()`), and Canadian and Indigenous places and things, used respectfully.
- Canadian spelling.

## Answer checks (required)

Every question sets `meta.k`. Add a check with the same key to `tests/verify/gradeN.js` (or a file per chapter, like `tests/verify/grade3-sounds.js`). Keys must be unique across all grades: a check fails if two share one.

```
V['g1-pick'] = q => {
  const good = q.options.map((o, i) => (H.sentenceOk(text(o)) ? i : -1)).filter(i => i >= 0);
  return H.sameSet(good, q.answer) ? '' : 'marked ' + q.answer + ' but right ones are ' + good;
};
```

The check works the answer out again **in its own way**, from what the child sees, without calling the site's code. It returns `''` when the marked answer is right, or a short message when it is wrong. Shared helpers are in `tests/validate.js` (`H.strip`, `H.sentenceOk`, `H.askWords`, `H.sameSet`, `H.marked` for the text of the marked option, `H.has`).

For reading passages the answer is authored, so the check keeps its **own answer key** (a second marker) and works out everything it can from the passage itself, such as where events come in the text or who is telling it. See `tests/verify/grade3-reading.js`.

Open-ended writing is never auto-marked. It goes to the grown-up with a simple rubric.

## Quick question makers

`Atlas.Q.one(q, right, [wrong...], more)` makes a pick-one question, `Atlas.Q.tiles(...)` a tap-a-tile question, `Atlas.Q.all(q, [right...], [wrong...], more)` a pick-every-answer question, and `Atlas.Q.tf(q, right, whyTrue, whyFalse, more)` a true-or-false question with its two reasons (the first is why it is true). `more` holds the other fields (`fig`, `hint`, `explain`, `steps`, `prompt`, `meta`).

## Worksheets

Every question here also prints on a worksheet (see "Printable worksheets" in `ARCHITECTURE.md`), so write questions that make sense on paper too: say "Tap" or "Pick" (paper says "Circle"), and keep a question's passage in its `fig` or `pic` (`Atlas.texts.show`), so a sheet can print it once at the top. A grade's `gradeN/sheets/<chapter>.js` adds each idea's "I can" line (`goal`) and its Think questions: questions from this kit (with `meta.k` and an answer check), or open questions `{ q, fig, lines: 3, key: 'a good answer' }` for the grown-up to mark.

## Activities with a grown-up

Some expectations cannot be marked by a computer: speaking, listening, reading aloud, drafting, handwriting, presenting, and talking about identity and culture. Add them to the chapter as `tasks`:

| Field | Meaning |
| --- | --- |
| `id`, `title` | Short name for the address, and a plain title |
| `code` | The expectation code, like `'B1.3'` |
| `pic`, `say` | A picture cue (`Atlas.W.icon('talk')`) and one short line for the child |
| `text` | Optional: a passage or prompt to work from |
| `write` | `true` gives the child a box to write in (kept on this device) |
| `run` | Steps for the grown-up (grown-up view only) |
| `rubric` | Exactly 4 short descriptions: Not yet, Getting there, Yes, Strong |
| `coach` | Optional extra note for the grown-up |

The grown-up taps a level in grown-up view. "Yes" or "Strong" counts the expectation as met on the check-up map.

For First Nations, Métis and Inuit content, point to real books by creators from those communities rather than writing about cultures on their behalf.
