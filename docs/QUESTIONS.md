# Writing lessons and questions

`grade3/chapters/prefixes.js` is the worked example (`grade1/chapters/sentences.js` is a second one).

**Show, don't tell.** The child should read very little. Each "Watch me" step is one picture and one short line (`Atlas.W.step`). Use word tiles, sentence strips, highlights and picture cues from `Atlas.W` (see `assets/engine/words.js`) rather than paragraphs.

## An idea (one screen)

| Field | Meaning |
| --- | --- |
| `slug` | Short name used in the address, like `capital` |
| `title` | One plain sentence, like "A sentence starts with a capital letter" |
| `exp` | The expectation codes it teaches, like `['B3.3']` (fetch the curriculum first) |
| `skill` | The practice skill that makes it "Mastered" |
| `intro` | Optional: one short line before the example. Usually leave it out. |
| `model` | **Watch me** (I do): the worked example as a list of steps, each `Atlas.W.step(picture, line)`. One step shows at a time, with Back and Next. |
| `key` | The key idea, shown after the last step |
| `guided` | **Together** (we do): a list of functions that each make a question. Give each a `prompt`, a cue to think about. |
| `check` | **On your own** (you do): a list of functions that each make a question. No cue. |
| `coach` | For grown-ups: how to coach this idea. Grown-up view only. |
| `mistake` | For grown-ups: a common mistake and what to do. Grown-up view only. |

How the steps behave:
- **Together:** a wrong answer is corrected at once (the answer and why), then the **same** question is asked again, so the child ends on a right answer.
- **On your own:** a wrong answer gets a hint and a second try; a second miss shows the answer and the steps. Two right on the first try marks the idea "Got it".

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

Every question sets `meta.k`. Add a check with the same key to `tests/verify/gradeN.js`:

```
V['g1-pick'] = q => {
  const good = q.options.map((o, i) => (H.sentenceOk(text(o)) ? i : -1)).filter(i => i >= 0);
  return H.sameSet(good, q.answer) ? '' : 'marked ' + q.answer + ' but right ones are ' + good;
};
```

The check works the answer out again **in its own way**, from what the child sees, without calling the site's code. It returns `''` when the marked answer is right, or a short message when it is wrong. Shared helpers are in `tests/validate.js` (`H.strip`, `H.sentenceOk`, `H.askWords`, `H.sameSet`).

Open-ended writing is never auto-marked. It goes to the grown-up with a simple rubric.
