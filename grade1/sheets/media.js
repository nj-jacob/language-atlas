/* Grade 1 Media and Online Life: printable worksheets. Learn and Practise 1 to 3 are made from chapters/media.js; this file adds
   each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, A2.1 to A2.7.
   Think questions marked by a computer are checked in tests/verify/grade1-media.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function TF(q, fig, right, whyTrue, whyFalse, meta) {
    return { q: q, fig: fig, type: 'tf', answer: right, why: { options: [whyTrue, whyFalse], answer: right ? 0 : 1 }, meta: meta };
  }

  S.register('media', { code: 'ME', ideas: {
    ask: { goal: 'I can stay safe online and ask a grown-up first.', think: [
      TF('Is this a safe habit?', W.sent('I can share where I live with anyone.'), false, 'It keeps me safe.', 'Where I live is private. I keep it to myself.',
        { k: 'g1-ask-tf', said: 'I can share where I live with anyone.' }),
      { q: 'A game asks for your password. What do you do? Why?', fig: W.icon('lock'), lines: 2, key: 'Do not type it. Ask a grown-up first, because a password is private.' },
      { q: 'Write one rule for using a tablet at home.', fig: W.icon('screen'), lines: 2, key: 'For example: I ask a grown-up before I go online.' }] },
    kind: { goal: 'I can be kind online.', think: [
      TF('A friend shares a drawing. Is this comment kind?', W.sent('You cannot draw.'), false, 'It is kind.', 'It could hurt. A kind comment: Great drawing!',
        { k: 'g1-kind-comment-tf', c: 'You cannot draw.' }),
      { q: 'Write a kind comment for a friend’s video of a song.', lines: 1, key: 'For example: Nice job on the song!' },
      { q: 'Someone posts a mean comment about your friend. What should you do?', lines: 2, key: 'Tell a grown-up and do not join in.' }] },
    trust: { goal: 'I can find facts I can trust.', think: [
      TF('You want facts about bears. Can you trust a joke video about bears?', W.icon('screen'), false, 'You can trust it for facts.', 'A joke video is made to be funny. Use a library book about bears.',
        { k: 'g1-trust-tf', w: 'a joke video about bears' }),
      { q: 'Name two people or places you could ask for true facts about birds.', lines: 2, key: 'A teacher, a library book, a nature centre, a park ranger, an Elder who knows the land.' },
      { q: 'Why are some sources better than others for facts?', lines: 2, key: 'Some are made by people who know and check facts; others are made to be funny or to sell things.' }] },
    kinds: { goal: 'I can name kinds of media and what they want.', think: [
      { q: 'Which kind of media wants you to buy something?', type: 'mc', options: ['a song', 'an ad', 'a book cover'], answer: 1, meta: { k: 'g1-form-of', what: 'wants you to buy something' } },
      { q: 'An ad shows happy kids drinking juice. Who is the ad for? What does it want?', lines: 2, key: 'For kids; it wants them to get the juice.' },
      { q: 'Draw a sign for your bedroom door. Use a few words.', lines: 1, key: 'A short, clear sign, such as: Knock first!' }] },
    design: { goal: 'I can plan, make, show and fix.', think: [
      TF('"Jun fixes a spelling on his sign." Is Jun at the Make step?', W.icon('write'), false, 'He is making his sign.', 'He is fixing it: that is the Fix step.',
        { k: 'g1-design-tf', s: 'Jun fixes a spelling on his sign.', said: 'make' }),
      { q: 'You showed your poster and a friend said the words are too small. What is your next step?', lines: 2, key: 'Fix: make the words bigger.' },
      { q: 'Why do we show our work to someone before it is finished?', lines: 2, key: 'They can tell us what is not clear, so we can fix it.' }] }
  } });
})();
